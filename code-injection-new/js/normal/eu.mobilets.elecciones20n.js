
mobl.provides('mobl');
mobl.mergeStyles = function(styles) {
   var __this = this;
  var styleString = styles.join(" ");
  
  return styleString;
};

(function(__ns) {
__ns.LocalStorage = {
                      setItem: function(key, value) {
                                 window.localStorage.setItem(key, JSON.stringify(value));
                               },
                      getItem: function(key, defaultValue) {
                                 var val = JSON.parse(window.localStorage.getItem(key) || "null") || defaultValue;
                                 if(val && typeof val === 'object' && !val.addEventListener)
                                 {
                                   return new mobl.ObservableObject(val);
                                 }
                                 else
                                 {
                                   return val;
                                 }
                               },
                      getNum: function(key, defaultValue) {
                                return this.get(key, defaultValue);
                              },
                      getString: function(key, defaultValue) {
                                   return this.get(key, defaultValue);
                                 },
                      getBool: function(key, defaultValue) {
                                 return this.get(key, defaultValue);
                               }
                    };
}(mobl));(function(__ns) {
__ns.isIphone = function() {
                  return !!navigator.userAgent.match(/iPhone/i) || !!navigator.userAgent.match(/iPod/i);
                };
__ns.isIpad = function() {
                return !!navigator.userAgent.match(/iPad/i);
              };
__ns.isAndroid = function() {
                   return !!navigator.userAgent.match(/Android/i);
                 };
__ns.isLandscape = function() {
                     return window.innerHeight < window.innerWidth;
                   };
__ns.isPortrait = function() {
                    return window.innerHeight >= window.innerWidth;
                  };
__ns.isTouchDevice = function() {
                       return 'ontouchstart' in document.documentElement;
                     };
__ns.isOnline = function(callback) {
                  var i = new Image();
                  i.onload = function() {
                               callback(true);
                             };
                  i.onerror = function() {
                                callback(false);
                              };
                  i.src = 'http://gfx2.hotmail.com/mail/uxp/w4/m4/pr014/h/s7.png?d=' + escape(Date());
                };
}(mobl));
mobl.label = function(s, style, onclick, elements, callback) {
  var root0 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node0 = $("<span>");
  
  var ref0 = s;
  node0.text(""+ref0.get());
  var ignore0 = false;
  subs__.addSub(ref0.addEventListener('change', function(_, ref, val) {
    if(ignore0) return;
    node0.text(""+val);
  }));
  subs__.addSub(ref0.rebind());
  
  
  var ref1 = style;
  if(ref1.get() !== null) {
    node0.attr('class', ref1.get());
    subs__.addSub(ref1.addEventListener('change', function(_, ref, val) {
      node0.attr('class', val);
    }));
    
  }
  subs__.addSub(ref1.rebind());
  
  var val0 = onclick.get();
  if(val0 !== null) {
    subs__.addSub(mobl.domBind(node0, 'tap', val0));
  }
  
  root0.append(node0);
  callback(root0); return subs__;
  
  return subs__;
};

mobl.block = function(cssClass, id, onclick, onswipe, elements, callback) {
  var root1 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node1 = $("<div>");
  
  var ref2 = id;
  if(ref2.get() !== null) {
    node1.attr('id', ref2.get());
    subs__.addSub(ref2.addEventListener('change', function(_, ref, val) {
      node1.attr('id', val);
    }));
    
  }
  subs__.addSub(ref2.rebind());
  
  var ref3 = cssClass;
  if(ref3.get() !== null) {
    node1.attr('class', ref3.get());
    subs__.addSub(ref3.addEventListener('change', function(_, ref, val) {
      node1.attr('class', val);
    }));
    
  }
  subs__.addSub(ref3.rebind());
  
  var val1 = onclick.get();
  if(val1 !== null) {
    subs__.addSub(mobl.domBind(node1, 'tap', val1));
  }
  
  var val2 = onswipe.get();
  if(val2 !== null) {
    subs__.addSub(mobl.domBind(node1, 'swipe', val2));
  }
  
  var nodes0 = $("<span>");
  node1.append(nodes0);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl0();
  }));
  
  function renderControl0() {
    subs__.addSub((elements)(function(elements, callback) {
      var root2 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root2); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes0;
      nodes0 = node.contents();
      oldNodes.replaceWith(nodes0);
    }));
  }
  renderControl0();
  root1.append(node1);
  callback(root1); return subs__;
  
  
  return subs__;
};

mobl.span = function(cssClass, id, onclick, onswipe, elements, callback) {
  var root3 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node2 = $("<span>");
  
  var ref4 = id;
  if(ref4.get() !== null) {
    node2.attr('id', ref4.get());
    subs__.addSub(ref4.addEventListener('change', function(_, ref, val) {
      node2.attr('id', val);
    }));
    
  }
  subs__.addSub(ref4.rebind());
  
  var ref5 = cssClass;
  if(ref5.get() !== null) {
    node2.attr('class', ref5.get());
    subs__.addSub(ref5.addEventListener('change', function(_, ref, val) {
      node2.attr('class', val);
    }));
    
  }
  subs__.addSub(ref5.rebind());
  
  var val3 = onclick.get();
  if(val3 !== null) {
    subs__.addSub(mobl.domBind(node2, 'tap', val3));
  }
  
  var val4 = onswipe.get();
  if(val4 !== null) {
    subs__.addSub(mobl.domBind(node2, 'swipe', val4));
  }
  
  var nodes1 = $("<span>");
  node2.append(nodes1);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl1();
  }));
  
  function renderControl1() {
    subs__.addSub((elements)(function(elements, callback) {
      var root4 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root4); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes1;
      nodes1 = node.contents();
      oldNodes.replaceWith(nodes1);
    }));
  }
  renderControl1();
  root3.append(node2);
  callback(root3); return subs__;
  
  
  return subs__;
};

mobl.link = function(url, target, elements, callback) {
  var root5 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var l = $("<a>");
  
  var ref6 = url;
  if(ref6.get() !== null) {
    l.attr('href', ref6.get());
    subs__.addSub(ref6.addEventListener('change', function(_, ref, val) {
      l.attr('href', val);
    }));
    
  }
  subs__.addSub(ref6.rebind());
  
  var ref7 = target;
  if(ref7.get() !== null) {
    l.attr('target', ref7.get());
    subs__.addSub(ref7.addEventListener('change', function(_, ref, val) {
      l.attr('target', val);
    }));
    
  }
  subs__.addSub(ref7.rebind());
  
  var nodes2 = $("<span>");
  l.append(nodes2);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl2();
  }));
  
  function renderControl2() {
    subs__.addSub((elements)(function(elements, callback) {
      var root6 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root6); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes2;
      nodes2 = node.contents();
      oldNodes.replaceWith(nodes2);
    }));
  }
  renderControl2();
  root5.append(l);
  var result__ = l.contents().length == 0;
  if(result__) {
    var result__ = l.text(url.get());
    callback(root5); return subs__;
  } else {
    {
      callback(root5); return subs__;
    }
  }
  
  
  return subs__;
};

mobl.nl = function(elements, callback) {
  var root7 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node3 = $("<br>");
  
  root7.append(node3);
  callback(root7); return subs__;
  
  return subs__;
};

mobl.screenContext = function(elements, callback) {
  var root8 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node4 = $("<div>");
  node4.attr('class', "screenContext");
  node4.attr('style', "position: relative;");
  
  
  var node5 = $("<div>");
  node5.attr('class', "initialElements");
  
  var nodes3 = $("<span>");
  node5.append(nodes3);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl3();
  }));
  
  function renderControl3() {
    subs__.addSub((elements)(function(elements, callback) {
      var root9 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root9); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes3;
      nodes3 = node.contents();
      oldNodes.replaceWith(nodes3);
    }));
  }
  renderControl3();
  node4.append(node5);
  root8.append(node4);
  callback(root8); return subs__;
  
  
  
  return subs__;
};
(function(__ns) {
var bundle = {
             };
__ns.fetchLanguageBundle = function(path, callback) {
                             $.getJSON(path, function(json) {
                                               bundle = json;
                                               callback();
                                             });
                           };
__ns._ = function(key, placeholders) {
           var s = bundle[key] || key;
           var parts = s.split('%%');
           s = parts[0];
           for(var i = 0; i < placeholders.length; i++)
           {
             s += placeholders[i];
             if(parts[i + 1])
             {
               s += parts[i + 1];
             }
           }
           return s;
         };
}(mobl));(function(__ns) {
__ns.httpRequest = function(url, method, encoding, data, mapper, callback) {
                     $.ajax({
                              url: url,
                              dataType: encoding,
                              type: method,
                              data: data,
                              error: function(_, message, error) {
                                       console.error(message);
                                       console.error(error);
                                       callback(null);
                                     },
                              success: function(data) {
                                         var result = mapper(data, callback);
                                         if(result !== undefined)
                                         {
                                           callback(result);
                                         }
                                       }
                            });
                   };
}(mobl));(function(__ns) {
var argspec = persistence.argspec;
__ns.$ = jQuery;
__ns.sleep = function(time, callback) {
               setTimeout(callback, time);
             };
__ns.Dynamic = function(props) {
                 for(var p in props)
                 {
                   if(props.hasOwnProperty(p))
                   {
                     this[p] = props[p];
                   }
                 }
               };
__ns.repeat = function(time, callback) {
                setInterval(callback, time);
              };
mobl.alert = function(s) {
               alert(s);
             };
mobl.log = function(s, _, callback) {
             console.log(s);
             if(callback)
             callback();
           };
__ns.parseNum = function(s) {
                  return parseInt(s, 10);
                };
__ns.escape = function(s) {
                return escape(s);
              };
__ns.add = function(e) {
             var allEnt = persistence.define(e._type).all();
             allEnt.add(e);
           };
mobl.now = function() {
             return new Date();
           };
mobl.remove = function(e) {
                persistence.remove(e);
                var allEnt = persistence.define(e._type).all();
                allEnt.triggerEvent('remove', allEnt, e);
                allEnt.triggerEvent('change', allEnt, e);
              };
mobl.flushDatabase = function(callback) {
                       persistence.flush(callback);
                     };
mobl.resetDatabase = function(callback) {
                       persistence.reset(function() {
                                           persistence.schemaSync(callback);
                                         });
                     };
mobl.reload = function() {
                persistence.flush(function() {
                                    window.location.reload();
                                  });
              };
mobl.openUrl = function(url) {
                 location = url;
               };
mobl.random = function(max) {
                return Math.round(Math.random() * max);
              };
persistence.QueryCollection.prototype.updates = function() {
                                                  this.triggerEvent('change', this);
                                                };
mobl.DateTime = {
                  parse: function(s) {
                           return new Date(Date.parse(s));
                         },
                  fromTimestamp: function(timestamp) {
                                   return new Date(timestamp);
                                 },
                  create: function(year, month, day, hour, minute, second, ms) {
                            return new Date(year,month,day,hour,minute,second,ms);
                          }
                };
Date.prototype.toDateString = function() {
                                return "" + ( this.getMonth() + 1 ) + "/" + this.getDate() + "/" + this.getFullYear();
                              };
mobl.Math = Math;
mobl.Math.pi = function() {
                 return Math.PI;
               };
mobl.Math.isNaN = function(n) {
                    return isNaN(n);
                  };
mobl.JSON = JSON;
mobl.formatDate = function(date) {
                    var diff = (( (new Date()).getTime() - date.getTime() ) / 1000);
                    var day_diff = Math.floor(diff / 86400);
                    if(isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
                    return;
                    return day_diff === 0 && ( diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && Math.floor(diff / 3600) + " hours ago" ) || day_diff === 1 && "Yesterday" || day_diff < 7 && day_diff + " days ago" || day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago";
                  };
mobl.range = function(from, to) {
               var ar = [];
               for(var i = from; i < to; i++)
               {
                 ar.push(i);
               }
               return ar;
             };
mobl.html = function(html, elements, callback) {
              var root192 = $("<span>");
              var node180 = $("<span >");
              var ref108 = html;
              node180.html(html.get().toString());
              var ignore51 = false;
              ref108.addEventListener('change', function(_, ref, val) {
                                                  if(ignore51)
                                                  return;
                                                  if(ref === ref108)
                                                  {
                                                    node180.html(val.toString());
                                                  }
                                                });
              ref108.rebind();
              root192.append(node180);
              callback(root192);
              return;
            };
mobl.defineType = function(qid, SuperType, fields) {
                    function Type ( obj ) {
                      this._data = {
                                   };
                      if(this.initialize)
                      {
                        this.initialize();
                      }
                      for(var p in obj)
                      {
                        if(obj.hasOwnProperty(p))
                        {
                          this[p] = obj[p];
                        }
                      }
                    }
                    for(var prop in fields)
                    {
                      if(fields.hasOwnProperty(prop))
                      {
                        (function() {
                           var p = prop;
                           if(fields[p] === null)
                           {
                             Type.prototype.__defineGetter__(p, function() {
                                                                  return this._data[p];
                                                                });
                             Type.prototype.__defineSetter__(p, function(val) {
                                                                  this._data[p] = val;
                                                                  this.triggerEvent('change', this, p, val);
                                                                });
                           }
                           else
                           if(fields[p][0] === '[')
                           {
                           }
                         }());
                      }
                    }
                    Type.prototype = SuperType ? new SuperType ( ) : new persistence.Observable ( );
                    Type.fromJSON = function(json) {
                                      return new Type(json);
                                    };
                    return Type;
                  };
persistence.entityDecoratorHooks.push(function(Entity) {
                                        Entity.searchPrefix = function(query) {
                                                                return Entity.search(query, true);
                                                              };
                                      });
Array.prototype.list = function(tx, callback) {
                         var args = argspec.getArgs(arguments, [{
                                                                  name: 'tx',
                                                                  optional: true,
                                                                  check: function(obj) {
                                                                           return tx.executeSql;
                                                                         }
                                                                },{
                                                                    name: 'callback',
                                                                    optional: false,
                                                                    check: argspec.isCallback()
                                                                  }]);
                         tx = args.tx;
                         callback = args.callback;
                         var valueCopy = [];
                         for(var i = 0; i < this.length; i++)
                         {
                           valueCopy[i] = this[i];
                         }
                         callback(valueCopy);
                       };
Array.prototype.insert = function(idx, item) {
                           this.splice(idx, 0, item);
                         };
Array.prototype.get = function(idx) {
                        return this[idx];
                      };
Array.prototype.one = function(callback) {
                        if(this.length === 0)
                        {
                          callback(null);
                        }
                        else
                        {
                          callback(this[0]);
                        }
                      };
Array.prototype.contains = function(el) {
                             for(var i = 0; i < this.length; i++)
                             {
                               if(this[i] === el)
                               {
                                 return true;
                               }
                             }
                             return false;
                           };
Array.prototype.remove = function(el) {
                           for(var i = 0; i < this.length; i++)
                           {
                             if(this[i] === el)
                             {
                               this.splice(i, 1);
                               return;
                             }
                           }
                         };
Array.prototype.addEventListener = function() {
                                   };
mobl.dummyMapper = function(data, callback) {
                     callback(data);
                   };
mobl.Map = function() {
             this.data = {
                         };
           };
mobl.Map.prototype.set = function(k, v) {
                           this.data[k] = v;
                         };
mobl.Map.prototype.get = function(k) {
                           return this.data[k];
                         };
mobl.Map.prototype.keys = function() {
                            var keys = [];
                            for(var p in this.data)
                            {
                              if(this.data.hasOwnProperty(p))
                              {
                                keys.push(p);
                              }
                            }
                            return keys;
                          };
mobl.screenStack = [ ];
mobl.innerHeight = false;
setTimeout(function() {
             if(mobl.isAndroid)
             {
               mobl.innerHeight = window.innerHeight;
             }
           }, 200);
function updateScrollers ( ) {
  var scrollwrappers = $("div#scrollwrapper");
  if(scrollwrappers.length > 0)
  {
    var height = mobl.innerHeight?mobl.innerHeight:window.innerHeight;
    height -= $("#footer:visible").height();
    height -= $("#tabbar:visible").height();
    scrollwrappers.height(height);
  }
  var scrollers = $("div#scrollwrapper div#content");
  for(var i = 0; i < scrollers.length; i++)
  {
    var scroller = scrollers.eq(i).data("scroller");
    if(scroller)
    {
      scroller.refresh();
    }
    else
    {
    }
  }
}
mobl.delayedUpdateScrollers = function() {
                                setTimeout(updateScrollers, 200);
                              };
if(!mobl.isAndroid)
{
  $(window).resize(updateScrollers);
}
$(function() {
    setInterval(function() {
                  persistence.flush();
                  if(persistence.saveToLocalStorage)
                  {
                    persistence.saveToLocalStorage();
                  }
                }, 2500);
  });
mobl.postCallHooks = [ ];
mobl.contextStack = [ ];
if(mobl.contextStack.length === 0)
{
  mobl.contextStack.push([{
                            screens: [],
                            dom: null
                          }]);
}
mobl.findDeepestVisibleContext = function() {
                                   var idx = mobl.contextStack.length - 1;
                                   while ( idx >= 0 )
                                   {
                                     var top = mobl.contextStack[idx];
                                     for(var i = 0; i < top.length; i++)
                                     {
                                       if(!top[i].dom)
                                       {
                                         top[i].dom = $("body");
                                       }
                                       if(top[i].dom.is(':visible'))
                                       {
                                         return top[i];
                                       }
                                     }
                                     idx--;
                                   }
                                 };
var TRANSITION_SPEED = 150;
__ns.animations = {
                  };
__ns.animations.slide = function(prevNode, nextNode, forward, callback) {
                          nextNode.show('slide', {
                                                   direction: forward?'right':'left'
                                                 }, TRANSITION_SPEED);
                          prevNode.hide('slide', {
                                                   direction: forward?'left':'right'
                                                 }, TRANSITION_SPEED, callback);
                        };
__ns.animations.fade = function(prevNode, nextNode, forward, callback) {
                         nextNode.fadeIn(300);
                         prevNode.fadeOut(300, callback);
                       };
__ns.animations.none = function(prevNode, nextNode, forward, callback) {
                         nextNode.show();
                         prevNode.hide();
                         callback();
                       };
__ns.getCurrentScreen = function() {
                          var screenContext = mobl.findDeepestVisibleContext();
                          for(var i = 0; i < screenContext.screens.length; i++)
                          {
                            if(screenContext.screens[i].dom.is(':visible'))
                            {
                              return screenContext.screens[i];
                            }
                          }
                          return null;
                        };
var oldHash = null;
setInterval(function() {
              if(location.hash !== oldHash)
              {
                oldHash = location.hash;
                var screenContext = mobl.findDeepestVisibleContext();
                if(screenContext && screenContext.initialElements)
                {
                  var screens = screenContext.screens;
                  if(screens.length > 1 || ( screenContext.initialElements.length > 0 && screens.length > 0 ))
                  {
                    screens[screens.length - 1].callbackFn(null);
                  }
                }
              }
            }, 250);
__ns.call = function(screenName, args, callback) {
              var replace = args[args.length - 2].get();
              var animate = args[args.length - 1].get();
              args.splice(args.length - 2, 2);
              var screenFrame = {
                                  name: screenName,
                                  args: args,
                                  callback: callback,
                                  div: screenName.replace(/\./g, '__'),
                                  dom: null
                                };
              if(!screenName.match(/\.root$/))
              {
                location.hash = "" + Math.round(Math.random() * 99999);
              }
              oldHash = location.hash;
              var screenContext = mobl.findDeepestVisibleContext();
              screenContext.screens.push(screenFrame);
              var callbackFn = function() {
                                 screenFrame.subs.unsubscribe();
                                 screenContext.screens.pop();
                                 if(screenFrame.dom.find("div.screenContext").length > 0)
                                 {
                                   mobl.contextStack.pop();
                                 }
                                 mobl.delayedUpdateScrollers();
                                 var domNode;
                                 if(screenContext.screens.length > 0)
                                 {
                                   var previousScreen = screenContext.screens[screenContext.screens.length - 1];
                                   domNode = previousScreen.dom;
                                   scrollTo(0, previousScreen.pageYOffset);
                                 }
                                 else
                                 {
                                   domNode = screenContext.initialElements;
                                   scrollTo(0, 0);
                                 }
                                 __ns.animations[animate](screenFrame.dom, domNode, false, function() {
                                                                                             screenFrame.dom.remove();
                                                                                           });
                                 if(callback)
                                 {
                                   callback.apply(null, arguments);
                                 }
                               };
              screenFrame.callbackFn = callbackFn;
              var parts = screenName.split('.');
              var current = window;
              for(var i = 0; i < parts.length; i++)
              {
                current = current[parts[i]];
              }
              var screenTemplate = current;
              screenFrame.subs = screenTemplate.apply(null, args.concat([function(node) {
                                                                           node.attr('id', screenFrame.div);
                                                                           node.css('position', 'absolute').css('top', '0').css('left', '0').css('width', '100%');
                                                                           screenFrame.dom = node;
                                                                           if(screenContext.screens.length > 1)
                                                                           {
                                                                             var previousScreen = screenContext.screens[screenContext.screens.length - 2];
                                                                             previousScreen.pageYOffset = window.pageYOffset;
                                                                             node.hide();
                                                                             node.prependTo(screenContext.dom);
                                                                             __ns.animations[animate](previousScreen.dom, node, true, function() {
                                                                                                                                      });
                                                                             scrollTo(0, 0);
                                                                           }
                                                                           else
                                                                           {
                                                                             if(screenContext.dom.selector === 'body')
                                                                             {
                                                                               screenContext.initialElements = screenContext.dom.find("div.initialElements");
                                                                               node.prependTo(screenContext.dom);
                                                                               node.show();
                                                                               screenContext.initialElements.hide();
                                                                             }
                                                                             else
                                                                             {
                                                                               screenContext.initialElements = screenContext.dom.find("div.initialElements");
                                                                               node.hide();
                                                                               node.prependTo(screenContext.dom);
                                                                               __ns.animations[animate](screenContext.initialElements, node, true, function() {
                                                                                                                                                   });
                                                                               scrollTo(0, 0);
                                                                             }
                                                                           }
                                                                           var localScreenContexts = node.find("div.screenContext");
                                                                           if(localScreenContexts.length > 0)
                                                                           {
                                                                             var ar = [];
                                                                             for(var i = 0; i < localScreenContexts.length; i++)
                                                                             {
                                                                               ar.push({
                                                                                         screens: [],
                                                                                         dom: localScreenContexts.eq(i)
                                                                                       });
                                                                             }
                                                                             mobl.contextStack.push(ar);
                                                                           }
                                                                           mobl.postCallHooks.forEach(function(fn) {
                                                                                                        fn(node);
                                                                                                      });
                                                                           if(replace)
                                                                           {
                                                                             var screenToRemove = screenContext.screens[screenContext.screens.length - 2];
                                                                             screenToRemove.dom.remove();
                                                                             screenContext.screens.splice(screenContext.screens.length - 2, 1);
                                                                           }
                                                                           $(function() {
                                                                               var scrollers = $("div#scrollwrapper div#content");
                                                                               var i = 0;
                                                                               if(scrollers.length > 0)
                                                                               {
                                                                                 for(i = 0; i < scrollers.length; i++)
                                                                                 {
                                                                                   if(!scrollers.eq(i).data("scroller"))
                                                                                   {
                                                                                     scrollers.eq(i).data("scroller", new iScroll(scrollers.get(i),'y'));
                                                                                   }
                                                                                 }
                                                                                 mobl.delayedUpdateScrollers();
                                                                               }
                                                                             });
                                                                         },callbackFn]));
            };
mobl.ref = function(r, prop) {
             if(prop)
             {
               for(var i = 0; i < r.childRefs.length; i++)
               {
                 if(r.childRefs[i].prop === prop)
                 {
                   return r.childRefs[i];
                 }
               }
             }
             return new mobl.Reference(r,prop);
           };
function fromScope ( that , prop ) {
  if(prop)
  {
    return $(that).scope().get(prop);
  }
  else
  {
    return $(that).scope();
  }
}
mobl.stringTomobl__Num = function(s) {
                           return parseFloat(s, 10);
                         };
mobl.stringTomobl__String = function(s) {
                              return s;
                            };
mobl.conditionalDef = function(oldDef, condFn, newDef) {
                        return function() {
                                 if(condFn())
                                 {
                                   return newDef.apply(null, arguments);
                                 }
                                 else
                                 {
                                   return oldDef.apply(null, arguments);
                                 }
                               };
                      };
mobl.stringTomobl__DateTime = function(s) {
                                return new Date(s);
                              };
mobl.encodeUrlObj = function(obj) {
                      var parts = [];
                      for(var k in obj)
                      {
                        if(obj.hasOwnProperty(k))
                        {
                          parts.push(encodeURI(k) + "=" + encodeURI(obj[k]));
                        }
                      }
                      return "?" + parts.join("&");
                    };
function op ( operator , e1 , e2 , callback ) {
  switch(operator) {
    case '+':
      callback(e1 + e2);
      break;
    case '-':
      callback(e1 - e2);
      break;
    case '*':
      callback(e1 * e2);
      break;
    case '/':
      callback(e1 / e2);
      break;
    case '%':
      callback(e1 % e2);
      break;
    }
}
mobl.proxyUrl = function(url, user, password) {
                  if(user && password)
                  {
                    return '/proxy.php?user=' + user + '&pwd=' + password + '&proxy_url=' + encodeURIComponent(url);
                  }
                  else
                  {
                    return '/proxy.php?proxy_url=' + encodeURIComponent(url);
                  }
                };
mobl.remoteCollection = function(uri, datatype, processor) {
                          return {
                                   addEventListener: function() {
                                                     },
                                   list: function(_, callback) {
                                           $.ajax({
                                                    url: mobl.proxyUrl(uri),
                                                    datatype: datatype,
                                                    error: function(_, message, error) {
                                                             console.log(message);
                                                             console.log(error);
                                                             callback([]);
                                                           },
                                                    success: function(data) {
                                                               callback(processor(data));
                                                             }
                                                  });
                                         }
                                 };
                        };
mobl.ObservableObject = function(props) {
                          this._data = props;
                          this.subscribers = {
                                             };
                          var that = this;
                          for(var property in props)
                          {
                            if(props.hasOwnProperty(property))
                            {
                              (function() {
                                 var p = property;
                                 that.__defineGetter__(p, function() {
                                                            return this._data[p];
                                                          });
                                 that.__defineSetter__(p, function(val) {
                                                            this._data[p] = val;
                                                            this.triggerEvent('change', this, p, val);
                                                          });
                               }());
                            }
                          }
                        };
mobl.ObservableObject.prototype = new persistence.Observable ( );
mobl.ObservableObject.prototype.toJSON = function() {
                                           var obj = {
                                                     };
                                           for(var p in this._data)
                                           {
                                             if(this._data.hasOwnProperty(p))
                                             {
                                               obj[p] = this._data[p];
                                             }
                                           }
                                           return obj;
                                         };
function log ( s ) {
  console.log(s);
}
mobl.implementInterface = function(sourceModule, targetModule, items) {
                            for(var i = 0; i < items.length; i++)
                            {
                              targetModule[items[i]] = sourceModule[items[i]];
                            }
                          };
(function() {
   function Tuple ( ) {
     for(var i = 0; i < arguments.length; i++)
     {
       this['_' + ( i + 1 )] = arguments[i];
     }
     this.subscribers = {
                        };
     this.length = arguments.length;
   }
   Tuple.prototype = new persistence.Observable ( );
   Tuple.prototype.toJSON = function() {
                              var obj = {
                                        };
                              for(var i = 0; i < this.length; i++)
                              {
                                obj['_' + ( i + 1 )] = this['_' + ( i + 1 )];
                              }
                              return obj;
                            };
   function CompSubscription ( name ) {
     this.subscriptions = [ ];
     this.name = name;
   }
   CompSubscription.prototype.addSub = function(sub) {
                                         if(sub)
                                         {
                                           this.subscriptions.push(sub);
                                         }
                                       };
   CompSubscription.prototype.unsubscribe = function() {
                                              this.subscriptions.forEach(function(sub) {
                                                                           sub.unsubscribe();
                                                                         });
                                              this.subscriptions = [ ];
                                            };
   function DomSubscription ( node , eventType , fn ) {
     this.node = node;
     this.eventType = eventType;
     this.fn = fn;
   }
   DomSubscription.prototype.unsubscribe = function() {
                                             this.node.unbind(this.eventType, this.fn);
                                           };
   mobl.domBind = function(node, eventType, fn) {
                    node.bind(eventType, fn);
                    return new DomSubscription(node,eventType,fn);
                  };
   function Reference ( ref , prop ) {
     this.ref = ref;
     this.prop = prop;
     this.childRefs = [ ];
     if(prop)
     {
       ref.childRefs.push(this);
     }
     this.subscribers = {
                        };
   }
   Reference.prototype = new persistence.Observable ( );
   Reference.prototype.oldAddListener = Reference.prototype.addEventListener;
   Reference.prototype.addEventListener = function(eventType, callback) {
                                            if(eventType === 'change' && this.prop !== undefined && this.ref.get() && this.ref.get().addEventListener)
                                            {
                                              var that = this;
                                              var subs = new CompSubscription();
                                              subs.addSub(this.ref.get().addEventListener('change', function(_, _, prop, value) {
                                                                                                      if(prop === that.prop)
                                                                                                      {
                                                                                                        callback(eventType, that, value);
                                                                                                      }
                                                                                                    }));
                                              subs.addSub(this.oldAddListener(eventType, callback));
                                              return subs;
                                            }
                                            else
                                            {
                                              return this.oldAddListener(eventType, callback);
                                            }
                                          };
   Reference.prototype.addSetListener = function(callback) {
                                          var that = this;
                                          if(this.ref.addEventListener)
                                          {
                                            return this.ref.addEventListener('change', function(_, _, prop, value) {
                                                                                         if(prop === that.prop)
                                                                                         {
                                                                                           callback(eventType, that, value);
                                                                                         }
                                                                                       });
                                          }
                                        };
   Reference.prototype.get = function() {
                               if(this.prop === undefined)
                               {
                                 return this.ref;
                               }
                               if(this.ref.get)
                               {
                                 return this.ref.get()[this.prop];
                               }
                             };
   Reference.prototype.set = function(value) {
                               if(this.prop === undefined)
                               {
                                 this.ref = value;
                                 this.triggerEvent('change', this, value);
                               }
                               else
                               {
                                 this.ref.get()[this.prop] = value;
                                 this.triggerEvent('change', this, value);
                               }
                               var childRefs = this.childRefs.slice(0);
                               for(var i = 0; i < childRefs.length; i++)
                               {
                                 var childRef = childRefs[i];
                                 childRef.rebind();
                                 childRef.triggerEvent('change', childRef, childRef.get());
                               }
                             };
   Reference.prototype.rebind = function() {
                                  var that = this;
                                  var subs = new mobl.CompSubscription();
                                  if(this.prop !== undefined)
                                  {
                                    if(this.ref.get().addEventListener)
                                    {
                                      subs.addSub(this.ref.get().addEventListener('change', function(_, _, prop, value) {
                                                                                              if(prop === that.prop)
                                                                                              {
                                                                                                that.triggerEvent('change', that, value);
                                                                                              }
                                                                                            }));
                                    }
                                  }
                                  var childRefs = this.childRefs.slice(0);
                                  for(var i = 0; i < childRefs.length; i++)
                                  {
                                    subs.addSub(childRefs[i].rebind());
                                  }
                                  return subs;
                                };
   mobl.Tuple = Tuple;
   mobl.Reference = Reference;
   mobl.CompSubscription = CompSubscription;
 }());
}(mobl));mobl.Window = mobl.defineType('mobl.Window', null, {innerWidth: null,innerHeight: null});

mobl.window = mobl.ref(new mobl.Window({}));
(function(__ns) {
__ns.window.get().innerWidth = window.innerWidth;
__ns.window.get().innerHeight = window.innerHeight;
window.onresize = function() {
                    mobl.window.get().innerWidth = window.innerWidth;
                    mobl.window.get().innerHeight = window.innerHeight;
                  };
}(mobl));mobl.emailValidator = function(s) {
   var __this = this;
  return /^[A-Z0-9_%+.\-]+@[A-Z0-9.\-]+\.[A-Z]{2,4}$/i.test(s) ? "" : "Invalid e-mail address";
};

mobl.allInputValid = mobl.ref(true);
(function(__ns) {
__ns.setValidationError = function(id, ok) {
                            var screen = mobl.getCurrentScreen();
                            screen.validations = screen.validations || {
                                                                       };
                            screen.validations[id] = ok;
                            var isValid = true;
                            for(var p in screen.validations)
                            {
                              if(screen.validations.hasOwnProperty(p))
                              {
                                if(!screen.validations[p])
                                {
                                  isValid = false;
                                }
                              }
                            }
                            __ns.allInputValid.set(isValid);
                          };
}(mobl));

mobl.provides('EleccionES20N');
mobl.provides('mobl.ui');
persistence.debug = false;EleccionES20N.bannerStyle = 'EleccionES20N__bannerStyle';
EleccionES20N.textStyle = 'EleccionES20N__textStyle';
EleccionES20N.photoStyle = 'EleccionES20N__photoStyle';

EleccionES20N.banner = function(elements, callback) {
  var root442 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1425 = mobl.ref(null);
  
  
  var tmp1424 = mobl.ref(null);
  
  
  var tmp1423 = mobl.ref(null);
  
  var nodes374 = $("<span>");
  root442.append(nodes374);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.bannerStyle), tmp1423, tmp1424, tmp1425, function(_, callback) {
    var root443 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var node2 = $("<div>");
    node2.attr('id', "banner");
    
    
    var tmp1422 = mobl.ref("_BLANK");
    
    
    var tmp1421 = mobl.ref("http://www.mobilets.eu");
    
    var nodes375 = $("<span>");
    node2.append(nodes375);
    subs__.addSub((mobl.link)(tmp1421, tmp1422, function(_, callback) {
      var root444 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root444); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes375;
      nodes375 = node.contents();
      oldNodes.replaceWith(nodes375);
    }));
    root443.append(node2);
    callback(root443); return subs__;
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes374;
    nodes374 = node.contents();
    oldNodes.replaceWith(nodes374);
  }));
  callback(root442); return subs__;
  
  return subs__;
};

EleccionES20N.inicio = function(elements, callback) {
  var root445 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1426 = mobl.ref("Inicio");
  
  
  var tmp1427 = mobl.ref(null);
  
  var nodes376 = $("<span>");
  root445.append(nodes376);
  subs__.addSub((mobl.ui.generic.header)(tmp1426, tmp1427, function(_, callback) {
    var root446 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root446); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes376;
    nodes376 = node.contents();
    oldNodes.replaceWith(nodes376);
  }));
  
  var tmp1432 = mobl.ref(null);
  
  
  var tmp1431 = mobl.ref(null);
  
  
  var tmp1430 = mobl.ref(null);
  
  var nodes377 = $("<span>");
  root445.append(nodes377);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1430, tmp1431, tmp1432, function(_, callback) {
    var root447 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root447.append("EleccionES20N contiene la información más importante ");
    
    root447.append("para decidir tu voto el 20 de Noviembre en las ");
    
    root447.append("elecciones generales al Congreso y el Senado de España. ");
    
    root447.append("Ese día además podrás ver un esquema de los resultados de las votaciones<br/><br/> ");
    
    var tmp1429 = mobl.ref("_BLANK");
    
    
    var tmp1428 = mobl.ref("http://www.mobilets.eu");
    
    var nodes378 = $("<span>");
    root447.append(nodes378);
    subs__.addSub((mobl.link)(tmp1428, tmp1429, function(_, callback) {
      var root448 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root448); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes378;
      nodes378 = node.contents();
      oldNodes.replaceWith(nodes378);
    }));
    callback(root447); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes377;
    nodes377 = node.contents();
    oldNodes.replaceWith(nodes377);
  }));
  callback(root445); return subs__;
  
  
  return subs__;
};

EleccionES20N.partidoPSOE = function(callback, screenCallback) {
  var root449 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1435 = mobl.ref("PSOE");
  
  
  var tmp1436 = mobl.ref(null);
  
  var nodes379 = $("<span>");
  root449.append(nodes379);
  subs__.addSub((mobl.ui.generic.header)(tmp1435, tmp1436, function(_, callback) {
    var root450 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1433 = mobl.ref("Volver");
    
    
    var tmp1434 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes380 = $("<span>");
    root450.append(nodes380);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1433, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1434, function(_, callback) {
      var root451 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root451); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes380;
      nodes380 = node.contents();
      oldNodes.replaceWith(nodes380);
    }));
    callback(root450); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes379;
    nodes379 = node.contents();
    oldNodes.replaceWith(nodes379);
  }));
  
  var tmp1439 = mobl.ref(null);
  
  
  var tmp1438 = mobl.ref(null);
  
  
  var tmp1437 = mobl.ref(null);
  
  var nodes381 = $("<span>");
  root449.append(nodes381);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1437, tmp1438, tmp1439, function(_, callback) {
    var root452 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root452.append("El Partido Socialista Obrero Español (PSOE) es un partido político de España de ideología socialdemócrata. ");
    
    root452.append("Fue fundado en 1879 por Pablo Iglesias, en un principio como partido marxista de la clase obrera, socialista revolucionario. ");
    
    root452.append("Y evoluciona, más adelante, hacia tendencias reformistas, que se harán predominantes dentro de la socialdemocracia. ");
    
    root452.append("Finalmente, con Felipe González, en el 28º Congreso del partido, en 1979, se termina aceptando la economía de mercado, renunciando a toda relación con el marxismo, incluidas las teorías revisionistas de Eduard Bernstein, ");
    
    root452.append("que predominaron en el seno de la socialdemocracia durante la mayor parte del siglo XX. ");
    
    root452.append("Al tiempo que se lograba la universalización de servicios sociales básicos, como la sanidad, la educación y las pensiones, ");
    
    root452.append("adoptaba una política económica que fue calificada por algunos autores como socioliberal ");
    
    root452.append("iniciando el proceso de privatización de sectores públicos económicos del Estado, tanto sectores primarios, como secundarios, como de servicios, y de diferentes ramas, tales como energéticas, telecomunicaciones, bancos, etc");
    callback(root452); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes381;
    nodes381 = node.contents();
    oldNodes.replaceWith(nodes381);
  }));
  callback(root449); return subs__;
  
  
  return subs__;
};

EleccionES20N.partidoPP = function(callback, screenCallback) {
  var root453 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1442 = mobl.ref("PP");
  
  
  var tmp1443 = mobl.ref(null);
  
  var nodes382 = $("<span>");
  root453.append(nodes382);
  subs__.addSub((mobl.ui.generic.header)(tmp1442, tmp1443, function(_, callback) {
    var root454 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1440 = mobl.ref("Volver");
    
    
    var tmp1441 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes383 = $("<span>");
    root454.append(nodes383);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1440, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1441, function(_, callback) {
      var root455 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root455); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes383;
      nodes383 = node.contents();
      oldNodes.replaceWith(nodes383);
    }));
    callback(root454); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes382;
    nodes382 = node.contents();
    oldNodes.replaceWith(nodes382);
  }));
  
  var tmp1446 = mobl.ref(null);
  
  
  var tmp1445 = mobl.ref(null);
  
  
  var tmp1444 = mobl.ref(null);
  
  var nodes384 = $("<span>");
  root453.append(nodes384);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1444, tmp1445, tmp1446, function(_, callback) {
    var root456 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root456.append("El Partido Popular (PP) es un partido político conservador y de centroderecha de España que en 1989 adoptó su denominación actual, sustituyendo a la de Alianza Popular. Definido en sus estatutos como de «centro reformista», cuenta, según sus propias estimaciones, con más de 800.000 afiliados, siendo el partido político con más militantes de España. ");
    
    root456.append("Tiene delegaciones regionales en cada comunidad autónoma y en varios países, integradas en la comunidad española de estos, que proporcionan su apoyo en las cuestiones políticas españolas e internas (vía actividades independientes y el Consejo de residentes españoles). En el PP se le denomina «PP Exterior». ");
    
    root456.append("Forma parte del Partido Popular Europeo (PPE), de la Internacional Demócrata de Centro (IDC), y de la Unión Internacional Demócrata (IDU). Su organización juvenil son las Nuevas Generaciones del Partido Popular (NNGG). ");
    callback(root456); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes384;
    nodes384 = node.contents();
    oldNodes.replaceWith(nodes384);
  }));
  callback(root453); return subs__;
  
  
  return subs__;
};

EleccionES20N.partidoIU = function(callback, screenCallback) {
  var root457 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1449 = mobl.ref("IU");
  
  
  var tmp1450 = mobl.ref(null);
  
  var nodes385 = $("<span>");
  root457.append(nodes385);
  subs__.addSub((mobl.ui.generic.header)(tmp1449, tmp1450, function(_, callback) {
    var root458 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1447 = mobl.ref("Volver");
    
    
    var tmp1448 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes386 = $("<span>");
    root458.append(nodes386);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1447, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1448, function(_, callback) {
      var root459 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root459); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes386;
      nodes386 = node.contents();
      oldNodes.replaceWith(nodes386);
    }));
    callback(root458); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes385;
    nodes385 = node.contents();
    oldNodes.replaceWith(nodes385);
  }));
  
  var tmp1453 = mobl.ref(null);
  
  
  var tmp1452 = mobl.ref(null);
  
  
  var tmp1451 = mobl.ref(null);
  
  var nodes387 = $("<span>");
  root457.append(nodes387);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1451, tmp1452, tmp1453, function(_, callback) {
    var root460 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root460.append("Izquierda Unida (IU) es un movimiento político y social español formado en 1986, cuyo objetivo es la transformación social hacia un sistema socialista, democrático, fundamentado en los principios de justicia, igualdad y solidaridad, y organizado conforme a un Estado federal y republicano. ");
    
    root460.append("Es unitario en la línea política general y en el programa, organizativamente federal e ideológicamente plural, y en él participan diversas organizaciones, colectivos y personas que adscriban, acepten y practiquen la política de la organización, aprobada en sus Asambleas Federales. Se define como movimiento político y social, y está inscrita en el Registro de Partidos Políticos desde noviembre de 1992. ");
    callback(root460); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes387;
    nodes387 = node.contents();
    oldNodes.replaceWith(nodes387);
  }));
  callback(root457); return subs__;
  
  
  return subs__;
};

EleccionES20N.partidoCIU = function(callback, screenCallback) {
  var root461 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1456 = mobl.ref("CIU");
  
  
  var tmp1457 = mobl.ref(null);
  
  var nodes388 = $("<span>");
  root461.append(nodes388);
  subs__.addSub((mobl.ui.generic.header)(tmp1456, tmp1457, function(_, callback) {
    var root462 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1454 = mobl.ref("Volver");
    
    
    var tmp1455 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes389 = $("<span>");
    root462.append(nodes389);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1454, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1455, function(_, callback) {
      var root463 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root463); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes389;
      nodes389 = node.contents();
      oldNodes.replaceWith(nodes389);
    }));
    callback(root462); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes388;
    nodes388 = node.contents();
    oldNodes.replaceWith(nodes388);
  }));
  
  var tmp1460 = mobl.ref(null);
  
  
  var tmp1459 = mobl.ref(null);
  
  
  var tmp1458 = mobl.ref(null);
  
  var nodes390 = $("<span>");
  root461.append(nodes390);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1458, tmp1459, tmp1460, function(_, callback) {
    var root464 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root464.append("Convergència i Unió (CiU), Convergencia y Unión en castellano, es una federación de dos partidos políticos nacionalistas catalanes, de Cataluña. Está integrada por Convergència Democràtica de Catalunya, de ideología liberal y de centro, y Unió Democràtica de Catalunya, de ideología democristiana. ");
    
    root464.append("Convergència i Unió gobernó Cataluña desde 1980 hasta 2003, bajo la presidencia de Jordi Pujol, que fue presidente de la Generalidad de Cataluña hasta el 18 de diciembre de 2003. Desde enero de 2001, cuando Artur Mas asumió el cargo de conseller en cap de la Generalidad, se fue produciendo un relevo paulatino en el liderazgo de la federación. ");
    callback(root464); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes390;
    nodes390 = node.contents();
    oldNodes.replaceWith(nodes390);
  }));
  callback(root461); return subs__;
  
  
  return subs__;
};

EleccionES20N.partidoPNV = function(callback, screenCallback) {
  var root465 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1463 = mobl.ref("PNV");
  
  
  var tmp1464 = mobl.ref(null);
  
  var nodes391 = $("<span>");
  root465.append(nodes391);
  subs__.addSub((mobl.ui.generic.header)(tmp1463, tmp1464, function(_, callback) {
    var root466 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1461 = mobl.ref("Volver");
    
    
    var tmp1462 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes392 = $("<span>");
    root466.append(nodes392);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1461, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1462, function(_, callback) {
      var root467 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root467); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes392;
      nodes392 = node.contents();
      oldNodes.replaceWith(nodes392);
    }));
    callback(root466); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes391;
    nodes391 = node.contents();
    oldNodes.replaceWith(nodes391);
  }));
  
  var tmp1467 = mobl.ref(null);
  
  
  var tmp1466 = mobl.ref(null);
  
  
  var tmp1465 = mobl.ref(null);
  
  var nodes393 = $("<span>");
  root465.append(nodes393);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1465, tmp1466, tmp1467, function(_, callback) {
    var root468 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root468.append("El Euzko Alderdi Jeltzalea-Partido Nacionalista Vasco (EAJ-PNV) es un partido político creado en España en 1895. Su ideología es nacionalista vasca y cuyo ámbito principal de actuación reside en los territorios forales del País Vasco y Navarra, así como en el País Vasco francés. Cuenta también con delegaciones en otros países, fundamentalmente aquellos con presencia de inmigración vasca. Está representado con grupo parlamentario propio en el Congreso y en el Senado españoles, así como en el Parlamento Vasco. En Navarra forma parte de la coalición Nafarroa Bai, la segunda fuerza política en el Parlamento de Navarra. Su presencia en el País Vasco francés es pequeña, aunque en algunas elecciones ha sido la primera fuerza en el espectro nacionalista vasco. Cuenta también con un representante en el Parlamento Europeo. Se encuentra adscrito al Partido Demócrata Europeo. ");
    callback(root468); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes393;
    nodes393 = node.contents();
    oldNodes.replaceWith(nodes393);
  }));
  callback(root465); return subs__;
  
  
  return subs__;
};

EleccionES20N.partidoUPYD = function(callback, screenCallback) {
  var root469 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1470 = mobl.ref("UPyD");
  
  
  var tmp1471 = mobl.ref(null);
  
  var nodes394 = $("<span>");
  root469.append(nodes394);
  subs__.addSub((mobl.ui.generic.header)(tmp1470, tmp1471, function(_, callback) {
    var root470 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1468 = mobl.ref("Volver");
    
    
    var tmp1469 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes395 = $("<span>");
    root470.append(nodes395);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1468, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1469, function(_, callback) {
      var root471 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root471); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes395;
      nodes395 = node.contents();
      oldNodes.replaceWith(nodes395);
    }));
    callback(root470); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes394;
    nodes394 = node.contents();
    oldNodes.replaceWith(nodes394);
  }));
  
  var tmp1474 = mobl.ref(null);
  
  
  var tmp1473 = mobl.ref(null);
  
  
  var tmp1472 = mobl.ref(null);
  
  var nodes396 = $("<span>");
  root469.append(nodes396);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1472, tmp1473, tmp1474, function(_, callback) {
    var root472 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root472.append("Fundado en 2007. Ideológicamente se declara como no nacionalista, transversal, laico, progresista y defensor de un modelo federalista en España y en Europa.");
    callback(root472); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes396;
    nodes396 = node.contents();
    oldNodes.replaceWith(nodes396);
  }));
  callback(root469); return subs__;
  
  
  return subs__;
};

EleccionES20N.partidoERC = function(callback, screenCallback) {
  var root473 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1477 = mobl.ref("ERC");
  
  
  var tmp1478 = mobl.ref(null);
  
  var nodes397 = $("<span>");
  root473.append(nodes397);
  subs__.addSub((mobl.ui.generic.header)(tmp1477, tmp1478, function(_, callback) {
    var root474 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1475 = mobl.ref("Volver");
    
    
    var tmp1476 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes398 = $("<span>");
    root474.append(nodes398);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1475, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1476, function(_, callback) {
      var root475 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root475); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes398;
      nodes398 = node.contents();
      oldNodes.replaceWith(nodes398);
    }));
    callback(root474); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes397;
    nodes397 = node.contents();
    oldNodes.replaceWith(nodes397);
  }));
  
  var tmp1481 = mobl.ref(null);
  
  
  var tmp1480 = mobl.ref(null);
  
  
  var tmp1479 = mobl.ref(null);
  
  var nodes399 = $("<span>");
  root473.append(nodes399);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1479, tmp1480, tmp1481, function(_, callback) {
    var root476 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root476.append("Esquerra Republicana de Catalunya (abreviado tradicionalmente ERC y de forma oficial Esquerra) (Izquierda Republicana de Cataluña en castellano), es un partido político fundado en Barcelona en 1931 con presencia en Cataluña y actualmente también con presencia, minoritaria, en la Comunidad Valenciana (como Esquerra Republicana del País Valencià) e Islas Baleares y en el Rosellón francés. De ideología independentista catalana, aunque originariamente federalista, apuesta por la independencia de los territorios de lengua catalana, los Países Catalanes. ");
    callback(root476); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes399;
    nodes399 = node.contents();
    oldNodes.replaceWith(nodes399);
  }));
  callback(root473); return subs__;
  
  
  return subs__;
};

EleccionES20N.partidoBNG = function(callback, screenCallback) {
  var root477 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1484 = mobl.ref("BNG");
  
  
  var tmp1485 = mobl.ref(null);
  
  var nodes400 = $("<span>");
  root477.append(nodes400);
  subs__.addSub((mobl.ui.generic.header)(tmp1484, tmp1485, function(_, callback) {
    var root478 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1482 = mobl.ref("Volver");
    
    
    var tmp1483 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes401 = $("<span>");
    root478.append(nodes401);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1482, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1483, function(_, callback) {
      var root479 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root479); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes401;
      nodes401 = node.contents();
      oldNodes.replaceWith(nodes401);
    }));
    callback(root478); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes400;
    nodes400 = node.contents();
    oldNodes.replaceWith(nodes400);
  }));
  
  var tmp1488 = mobl.ref(null);
  
  
  var tmp1487 = mobl.ref(null);
  
  
  var tmp1486 = mobl.ref(null);
  
  var nodes402 = $("<span>");
  root477.append(nodes402);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1486, tmp1487, tmp1488, function(_, callback) {
    var root480 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root480.append("El Bloque Nacionalista Galego (en castellano Bloque Nacionalista Gallego) es un partido político español de carácter nacionalista gallego de izquierdas cuyo ámbito territorial se circunscribe a la comunidad autónoma de Galicia (España). Adopta el enfoque de frente y está formado por militantes individuales (no es una coalición de partidos). Sin embargo, coexisten dentro del BNG varios grupos y partidos organizados y reconocidos como tales por el propio BNG y en los cuales pueden militar los militantes del BNG. No obstante, la mayor parte de la militancia (70%) sólo pertenece al BNG. A estos militantes se les llama independientes. El independentismo también tiene cierto calado entre su militancia, especialmente en sus sectores más juveniles. ");
    callback(root480); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes402;
    nodes402 = node.contents();
    oldNodes.replaceWith(nodes402);
  }));
  callback(root477); return subs__;
  
  
  return subs__;
};

EleccionES20N.partidoCC = function(callback, screenCallback) {
  var root481 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1491 = mobl.ref("CC");
  
  
  var tmp1492 = mobl.ref(null);
  
  var nodes403 = $("<span>");
  root481.append(nodes403);
  subs__.addSub((mobl.ui.generic.header)(tmp1491, tmp1492, function(_, callback) {
    var root482 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1489 = mobl.ref("Volver");
    
    
    var tmp1490 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes404 = $("<span>");
    root482.append(nodes404);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1489, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1490, function(_, callback) {
      var root483 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root483); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes404;
      nodes404 = node.contents();
      oldNodes.replaceWith(nodes404);
    }));
    callback(root482); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes403;
    nodes403 = node.contents();
    oldNodes.replaceWith(nodes403);
  }));
  
  var tmp1495 = mobl.ref(null);
  
  
  var tmp1494 = mobl.ref(null);
  
  
  var tmp1493 = mobl.ref(null);
  
  var nodes405 = $("<span>");
  root481.append(nodes405);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1493, tmp1494, tmp1495, function(_, callback) {
    var root484 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root484.append("Coalición Canaria (CC) es una coalición política canaria formada en 1993 que agrupaba varios partidos nacionalistas, ex comunistas, insularistas y conservadores canarios. Gobierna la Comunidad Autónoma de Canarias desde 1993, cuando accedió al gobierno autonómico a través de una moción de censura. También gobierna en los cabildos de Tenerife, La Palma, Fuerteventura, Lanzarote y co-gobierna en el Cabildo de Gran Canaria. Tiene la mayoría en muchos ayuntamientos de las islas. CC está integrada en el Grupo Mixto tanto en el Congreso de los Diputados como en el Senado. ");
    callback(root484); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes405;
    nodes405 = node.contents();
    oldNodes.replaceWith(nodes405);
  }));
  callback(root481); return subs__;
  
  
  return subs__;
};

EleccionES20N.partidos = function(elements, callback) {
  var root485 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1496 = mobl.ref("Partidos");
  
  
  var tmp1497 = mobl.ref(null);
  
  var nodes406 = $("<span>");
  root485.append(nodes406);
  subs__.addSub((mobl.ui.generic.header)(tmp1496, tmp1497, function(_, callback) {
    var root486 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root486); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes406;
    nodes406 = node.contents();
    oldNodes.replaceWith(nodes406);
  }));
  var nodes407 = $("<span>");
  root485.append(nodes407);
  subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
    var root487 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1509 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.partidoPSOE', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2071 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1511 = mobl.ref(false);
    
    
    var tmp1510 = mobl.ref(null);
    
    var nodes408 = $("<span>");
    root487.append(nodes408);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1509, tmp1510, tmp1511, function(_, callback) {
      var root488 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1505 = mobl.ref(15);
      
      
      var tmp1508 = mobl.ref(null);
      
      
      var tmp1507 = mobl.ref(null);
      
      
      var tmp1506 = mobl.ref(null);
      
      var nodes409 = $("<span>");
      root488.append(nodes409);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1506, tmp1505, tmp1507, tmp1508, function(_, callback) {
        var root489 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1499 = mobl.ref(24);
        
        
        var tmp1498 = mobl.ref("img/LogoPSOE.gif");
        
        
        var tmp1504 = mobl.ref(null);
        
        
        var tmp1503 = mobl.ref(null);
        
        
        var tmp1502 = mobl.ref(null);
        
        
        var tmp1501 = mobl.ref(null);
        
        
        var tmp1500 = mobl.ref(null);
        
        var nodes410 = $("<span>");
        root489.append(nodes410);
        subs__.addSub((mobl.ui.generic.image)(tmp1498, tmp1500, tmp1499, tmp1501, tmp1502, tmp1503, tmp1504, function(_, callback) {
          var root490 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root490); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes410;
          nodes410 = node.contents();
          oldNodes.replaceWith(nodes410);
        }));
        callback(root489); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes409;
        nodes409 = node.contents();
        oldNodes.replaceWith(nodes409);
      }));
      
      root488.append("Partido Socialista");
      callback(root488); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes408;
      nodes408 = node.contents();
      oldNodes.replaceWith(nodes408);
    }));
    
    var tmp1523 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.partidoPP', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2072 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1525 = mobl.ref(false);
    
    
    var tmp1524 = mobl.ref(null);
    
    var nodes411 = $("<span>");
    root487.append(nodes411);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1523, tmp1524, tmp1525, function(_, callback) {
      var root491 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1519 = mobl.ref(15);
      
      
      var tmp1522 = mobl.ref(null);
      
      
      var tmp1521 = mobl.ref(null);
      
      
      var tmp1520 = mobl.ref(null);
      
      var nodes412 = $("<span>");
      root491.append(nodes412);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1520, tmp1519, tmp1521, tmp1522, function(_, callback) {
        var root492 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1513 = mobl.ref(24);
        
        
        var tmp1512 = mobl.ref("img/LogoPP.gif");
        
        
        var tmp1518 = mobl.ref(null);
        
        
        var tmp1517 = mobl.ref(null);
        
        
        var tmp1516 = mobl.ref(null);
        
        
        var tmp1515 = mobl.ref(null);
        
        
        var tmp1514 = mobl.ref(null);
        
        var nodes413 = $("<span>");
        root492.append(nodes413);
        subs__.addSub((mobl.ui.generic.image)(tmp1512, tmp1514, tmp1513, tmp1515, tmp1516, tmp1517, tmp1518, function(_, callback) {
          var root493 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root493); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes413;
          nodes413 = node.contents();
          oldNodes.replaceWith(nodes413);
        }));
        callback(root492); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes412;
        nodes412 = node.contents();
        oldNodes.replaceWith(nodes412);
      }));
      
      root491.append("Partido Popular");
      callback(root491); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes411;
      nodes411 = node.contents();
      oldNodes.replaceWith(nodes411);
    }));
    
    var tmp1537 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.partidoIU', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2073 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1539 = mobl.ref(false);
    
    
    var tmp1538 = mobl.ref(null);
    
    var nodes414 = $("<span>");
    root487.append(nodes414);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1537, tmp1538, tmp1539, function(_, callback) {
      var root494 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1533 = mobl.ref(15);
      
      
      var tmp1536 = mobl.ref(null);
      
      
      var tmp1535 = mobl.ref(null);
      
      
      var tmp1534 = mobl.ref(null);
      
      var nodes415 = $("<span>");
      root494.append(nodes415);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1534, tmp1533, tmp1535, tmp1536, function(_, callback) {
        var root495 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1527 = mobl.ref(24);
        
        
        var tmp1526 = mobl.ref("img/LogoIU.gif");
        
        
        var tmp1532 = mobl.ref(null);
        
        
        var tmp1531 = mobl.ref(null);
        
        
        var tmp1530 = mobl.ref(null);
        
        
        var tmp1529 = mobl.ref(null);
        
        
        var tmp1528 = mobl.ref(null);
        
        var nodes416 = $("<span>");
        root495.append(nodes416);
        subs__.addSub((mobl.ui.generic.image)(tmp1526, tmp1528, tmp1527, tmp1529, tmp1530, tmp1531, tmp1532, function(_, callback) {
          var root496 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root496); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes416;
          nodes416 = node.contents();
          oldNodes.replaceWith(nodes416);
        }));
        callback(root495); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes415;
        nodes415 = node.contents();
        oldNodes.replaceWith(nodes415);
      }));
      
      root494.append("Izquierda Unida");
      callback(root494); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes414;
      nodes414 = node.contents();
      oldNodes.replaceWith(nodes414);
    }));
    
    var tmp1551 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.partidoCIU', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2074 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1553 = mobl.ref(false);
    
    
    var tmp1552 = mobl.ref(null);
    
    var nodes417 = $("<span>");
    root487.append(nodes417);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1551, tmp1552, tmp1553, function(_, callback) {
      var root497 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1547 = mobl.ref(15);
      
      
      var tmp1550 = mobl.ref(null);
      
      
      var tmp1549 = mobl.ref(null);
      
      
      var tmp1548 = mobl.ref(null);
      
      var nodes418 = $("<span>");
      root497.append(nodes418);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1548, tmp1547, tmp1549, tmp1550, function(_, callback) {
        var root498 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1541 = mobl.ref(24);
        
        
        var tmp1540 = mobl.ref("img/LogoCIU.gif");
        
        
        var tmp1546 = mobl.ref(null);
        
        
        var tmp1545 = mobl.ref(null);
        
        
        var tmp1544 = mobl.ref(null);
        
        
        var tmp1543 = mobl.ref(null);
        
        
        var tmp1542 = mobl.ref(null);
        
        var nodes419 = $("<span>");
        root498.append(nodes419);
        subs__.addSub((mobl.ui.generic.image)(tmp1540, tmp1542, tmp1541, tmp1543, tmp1544, tmp1545, tmp1546, function(_, callback) {
          var root499 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root499); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes419;
          nodes419 = node.contents();
          oldNodes.replaceWith(nodes419);
        }));
        callback(root498); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes418;
        nodes418 = node.contents();
        oldNodes.replaceWith(nodes418);
      }));
      
      root497.append("Convergència i Unió");
      callback(root497); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes417;
      nodes417 = node.contents();
      oldNodes.replaceWith(nodes417);
    }));
    
    var tmp1565 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.partidoPNV', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2075 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1567 = mobl.ref(false);
    
    
    var tmp1566 = mobl.ref(null);
    
    var nodes420 = $("<span>");
    root487.append(nodes420);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1565, tmp1566, tmp1567, function(_, callback) {
      var root500 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1561 = mobl.ref(15);
      
      
      var tmp1564 = mobl.ref(null);
      
      
      var tmp1563 = mobl.ref(null);
      
      
      var tmp1562 = mobl.ref(null);
      
      var nodes421 = $("<span>");
      root500.append(nodes421);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1562, tmp1561, tmp1563, tmp1564, function(_, callback) {
        var root501 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1555 = mobl.ref(24);
        
        
        var tmp1554 = mobl.ref("img/LogoPNV.gif");
        
        
        var tmp1560 = mobl.ref(null);
        
        
        var tmp1559 = mobl.ref(null);
        
        
        var tmp1558 = mobl.ref(null);
        
        
        var tmp1557 = mobl.ref(null);
        
        
        var tmp1556 = mobl.ref(null);
        
        var nodes422 = $("<span>");
        root501.append(nodes422);
        subs__.addSub((mobl.ui.generic.image)(tmp1554, tmp1556, tmp1555, tmp1557, tmp1558, tmp1559, tmp1560, function(_, callback) {
          var root502 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root502); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes422;
          nodes422 = node.contents();
          oldNodes.replaceWith(nodes422);
        }));
        callback(root501); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes421;
        nodes421 = node.contents();
        oldNodes.replaceWith(nodes421);
      }));
      
      root500.append("Nacionalista Vasco");
      callback(root500); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes420;
      nodes420 = node.contents();
      oldNodes.replaceWith(nodes420);
    }));
    
    var tmp1579 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.partidoUPYD', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2076 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1581 = mobl.ref(false);
    
    
    var tmp1580 = mobl.ref(null);
    
    var nodes423 = $("<span>");
    root487.append(nodes423);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1579, tmp1580, tmp1581, function(_, callback) {
      var root503 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1575 = mobl.ref(15);
      
      
      var tmp1578 = mobl.ref(null);
      
      
      var tmp1577 = mobl.ref(null);
      
      
      var tmp1576 = mobl.ref(null);
      
      var nodes424 = $("<span>");
      root503.append(nodes424);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1576, tmp1575, tmp1577, tmp1578, function(_, callback) {
        var root504 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1569 = mobl.ref(24);
        
        
        var tmp1568 = mobl.ref("img/LogoUPyD.gif");
        
        
        var tmp1574 = mobl.ref(null);
        
        
        var tmp1573 = mobl.ref(null);
        
        
        var tmp1572 = mobl.ref(null);
        
        
        var tmp1571 = mobl.ref(null);
        
        
        var tmp1570 = mobl.ref(null);
        
        var nodes425 = $("<span>");
        root504.append(nodes425);
        subs__.addSub((mobl.ui.generic.image)(tmp1568, tmp1570, tmp1569, tmp1571, tmp1572, tmp1573, tmp1574, function(_, callback) {
          var root505 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root505); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes425;
          nodes425 = node.contents();
          oldNodes.replaceWith(nodes425);
        }));
        callback(root504); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes424;
        nodes424 = node.contents();
        oldNodes.replaceWith(nodes424);
      }));
      
      root503.append("Progreso y Democracia");
      callback(root503); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes423;
      nodes423 = node.contents();
      oldNodes.replaceWith(nodes423);
    }));
    
    var tmp1593 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.partidoERC', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2077 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1595 = mobl.ref(false);
    
    
    var tmp1594 = mobl.ref(null);
    
    var nodes426 = $("<span>");
    root487.append(nodes426);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1593, tmp1594, tmp1595, function(_, callback) {
      var root506 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1589 = mobl.ref(15);
      
      
      var tmp1592 = mobl.ref(null);
      
      
      var tmp1591 = mobl.ref(null);
      
      
      var tmp1590 = mobl.ref(null);
      
      var nodes427 = $("<span>");
      root506.append(nodes427);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1590, tmp1589, tmp1591, tmp1592, function(_, callback) {
        var root507 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1583 = mobl.ref(24);
        
        
        var tmp1582 = mobl.ref("img/LogoERC.gif");
        
        
        var tmp1588 = mobl.ref(null);
        
        
        var tmp1587 = mobl.ref(null);
        
        
        var tmp1586 = mobl.ref(null);
        
        
        var tmp1585 = mobl.ref(null);
        
        
        var tmp1584 = mobl.ref(null);
        
        var nodes428 = $("<span>");
        root507.append(nodes428);
        subs__.addSub((mobl.ui.generic.image)(tmp1582, tmp1584, tmp1583, tmp1585, tmp1586, tmp1587, tmp1588, function(_, callback) {
          var root508 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root508); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes428;
          nodes428 = node.contents();
          oldNodes.replaceWith(nodes428);
        }));
        callback(root507); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes427;
        nodes427 = node.contents();
        oldNodes.replaceWith(nodes427);
      }));
      
      root506.append("Esquerra Republicana");
      callback(root506); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes426;
      nodes426 = node.contents();
      oldNodes.replaceWith(nodes426);
    }));
    
    var tmp1607 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.partidoBNG', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2078 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1609 = mobl.ref(false);
    
    
    var tmp1608 = mobl.ref(null);
    
    var nodes429 = $("<span>");
    root487.append(nodes429);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1607, tmp1608, tmp1609, function(_, callback) {
      var root509 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1603 = mobl.ref(15);
      
      
      var tmp1606 = mobl.ref(null);
      
      
      var tmp1605 = mobl.ref(null);
      
      
      var tmp1604 = mobl.ref(null);
      
      var nodes430 = $("<span>");
      root509.append(nodes430);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1604, tmp1603, tmp1605, tmp1606, function(_, callback) {
        var root510 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1597 = mobl.ref(24);
        
        
        var tmp1596 = mobl.ref("img/LogoBNG.gif");
        
        
        var tmp1602 = mobl.ref(null);
        
        
        var tmp1601 = mobl.ref(null);
        
        
        var tmp1600 = mobl.ref(null);
        
        
        var tmp1599 = mobl.ref(null);
        
        
        var tmp1598 = mobl.ref(null);
        
        var nodes431 = $("<span>");
        root510.append(nodes431);
        subs__.addSub((mobl.ui.generic.image)(tmp1596, tmp1598, tmp1597, tmp1599, tmp1600, tmp1601, tmp1602, function(_, callback) {
          var root511 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root511); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes431;
          nodes431 = node.contents();
          oldNodes.replaceWith(nodes431);
        }));
        callback(root510); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes430;
        nodes430 = node.contents();
        oldNodes.replaceWith(nodes430);
      }));
      
      root509.append("El Bloque Galego");
      callback(root509); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes429;
      nodes429 = node.contents();
      oldNodes.replaceWith(nodes429);
    }));
    
    var tmp1621 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.partidoCC', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2079 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1623 = mobl.ref(false);
    
    
    var tmp1622 = mobl.ref(null);
    
    var nodes432 = $("<span>");
    root487.append(nodes432);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1621, tmp1622, tmp1623, function(_, callback) {
      var root512 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1617 = mobl.ref(15);
      
      
      var tmp1620 = mobl.ref(null);
      
      
      var tmp1619 = mobl.ref(null);
      
      
      var tmp1618 = mobl.ref(null);
      
      var nodes433 = $("<span>");
      root512.append(nodes433);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1618, tmp1617, tmp1619, tmp1620, function(_, callback) {
        var root513 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1611 = mobl.ref(24);
        
        
        var tmp1610 = mobl.ref("img/LogoCC.gif");
        
        
        var tmp1616 = mobl.ref(null);
        
        
        var tmp1615 = mobl.ref(null);
        
        
        var tmp1614 = mobl.ref(null);
        
        
        var tmp1613 = mobl.ref(null);
        
        
        var tmp1612 = mobl.ref(null);
        
        var nodes434 = $("<span>");
        root513.append(nodes434);
        subs__.addSub((mobl.ui.generic.image)(tmp1610, tmp1612, tmp1611, tmp1613, tmp1614, tmp1615, tmp1616, function(_, callback) {
          var root514 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root514); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes434;
          nodes434 = node.contents();
          oldNodes.replaceWith(nodes434);
        }));
        callback(root513); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes433;
        nodes433 = node.contents();
        oldNodes.replaceWith(nodes433);
      }));
      
      root512.append("Coalición Canaria");
      callback(root512); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes432;
      nodes432 = node.contents();
      oldNodes.replaceWith(nodes432);
    }));
    callback(root487); return subs__;
    
    
    
    
    
    
    
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes407;
    nodes407 = node.contents();
    oldNodes.replaceWith(nodes407);
  }));
  callback(root485); return subs__;
  
  
  return subs__;
};

EleccionES20N.candidatoPSOE = function(callback, screenCallback) {
  var root515 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1626 = mobl.ref("Rubalcaba");
  
  
  var tmp1627 = mobl.ref(null);
  
  var nodes435 = $("<span>");
  root515.append(nodes435);
  subs__.addSub((mobl.ui.generic.header)(tmp1626, tmp1627, function(_, callback) {
    var root516 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1624 = mobl.ref("Volver");
    
    
    var tmp1625 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes436 = $("<span>");
    root516.append(nodes436);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1624, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1625, function(_, callback) {
      var root517 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root517); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes436;
      nodes436 = node.contents();
      oldNodes.replaceWith(nodes436);
    }));
    callback(root516); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes435;
    nodes435 = node.contents();
    oldNodes.replaceWith(nodes435);
  }));
  
  var tmp1636 = mobl.ref(null);
  
  
  var tmp1635 = mobl.ref(null);
  
  
  var tmp1634 = mobl.ref(null);
  
  var nodes437 = $("<span>");
  root515.append(nodes437);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1634, tmp1635, tmp1636, function(_, callback) {
    var root518 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1628 = mobl.ref("img/CandidatoPSOE.jpg");
    
    
    var tmp1633 = mobl.ref(null);
    
    
    var tmp1632 = mobl.ref(null);
    
    
    var tmp1631 = mobl.ref(null);
    
    
    var tmp1630 = mobl.ref(null);
    
    
    var tmp1629 = mobl.ref(null);
    
    var nodes438 = $("<span>");
    root518.append(nodes438);
    subs__.addSub((mobl.ui.generic.image)(tmp1628, tmp1629, tmp1630, tmp1631, mobl.ref(EleccionES20N.photoStyle), tmp1632, tmp1633, function(_, callback) {
      var root519 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root519); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes438;
      nodes438 = node.contents();
      oldNodes.replaceWith(nodes438);
    }));
    
    root518.append("Nacido el 28 de julio de 1951 en Solares (Cantabria) .<br/>");
    
    root518.append("Diputado de la V ,  VI ,  VII ,  VIII y  IX legislaturas.<br/> ");
    
    root518.append("Doctor en Ciencias Químicas. <br/>");
    
    root518.append("Ha sido Ministro de Educación y Ciencia (1992-1993), Ministro de la Presidencia (1993-1996), <br/>");
    
    root518.append("Portavoz del Grupo Parlamentario Socialista (marzo 2004-abril 2006). <br/>");
    
    root518.append("Vicepresidente Primero del Gobierno y Portavoz (2011-2011) y Ministro del Interior (2006-2011).");
    callback(root518); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes437;
    nodes437 = node.contents();
    oldNodes.replaceWith(nodes437);
  }));
  callback(root515); return subs__;
  
  
  return subs__;
};

EleccionES20N.candidatoPP = function(callback, screenCallback) {
  var root520 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1639 = mobl.ref("Rajoy");
  
  
  var tmp1640 = mobl.ref(null);
  
  var nodes439 = $("<span>");
  root520.append(nodes439);
  subs__.addSub((mobl.ui.generic.header)(tmp1639, tmp1640, function(_, callback) {
    var root521 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1637 = mobl.ref("Volver");
    
    
    var tmp1638 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes440 = $("<span>");
    root521.append(nodes440);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1637, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1638, function(_, callback) {
      var root522 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root522); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes440;
      nodes440 = node.contents();
      oldNodes.replaceWith(nodes440);
    }));
    callback(root521); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes439;
    nodes439 = node.contents();
    oldNodes.replaceWith(nodes439);
  }));
  
  var tmp1649 = mobl.ref(null);
  
  
  var tmp1648 = mobl.ref(null);
  
  
  var tmp1647 = mobl.ref(null);
  
  var nodes441 = $("<span>");
  root520.append(nodes441);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1647, tmp1648, tmp1649, function(_, callback) {
    var root523 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1641 = mobl.ref("img/CandidatoPP.jpg");
    
    
    var tmp1646 = mobl.ref(null);
    
    
    var tmp1645 = mobl.ref(null);
    
    
    var tmp1644 = mobl.ref(null);
    
    
    var tmp1643 = mobl.ref(null);
    
    
    var tmp1642 = mobl.ref(null);
    
    var nodes442 = $("<span>");
    root523.append(nodes442);
    subs__.addSub((mobl.ui.generic.image)(tmp1641, tmp1642, tmp1643, tmp1644, mobl.ref(EleccionES20N.photoStyle), tmp1645, tmp1646, function(_, callback) {
      var root524 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root524); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes442;
      nodes442 = node.contents();
      oldNodes.replaceWith(nodes442);
    }));
    
    root523.append("Nacido el 27 de marzo de 1955 en Santiago de Compostela.<br/>");
    
    root523.append("Diputado de la III ,  IV ,  V ,  VI ,  VII ,  VIII y  IX legislaturas.<br/> ");
    
    root523.append("Casado. Dos hijos. <br/>");
    
    root523.append("Presidente del Partido Popular. <br/>");
    callback(root523); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes441;
    nodes441 = node.contents();
    oldNodes.replaceWith(nodes441);
  }));
  callback(root520); return subs__;
  
  
  return subs__;
};

EleccionES20N.candidatoIU = function(callback, screenCallback) {
  var root525 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1652 = mobl.ref("Lara");
  
  
  var tmp1653 = mobl.ref(null);
  
  var nodes443 = $("<span>");
  root525.append(nodes443);
  subs__.addSub((mobl.ui.generic.header)(tmp1652, tmp1653, function(_, callback) {
    var root526 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1650 = mobl.ref("Volver");
    
    
    var tmp1651 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes444 = $("<span>");
    root526.append(nodes444);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1650, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1651, function(_, callback) {
      var root527 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root527); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes444;
      nodes444 = node.contents();
      oldNodes.replaceWith(nodes444);
    }));
    callback(root526); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes443;
    nodes443 = node.contents();
    oldNodes.replaceWith(nodes443);
  }));
  
  var tmp1662 = mobl.ref(null);
  
  
  var tmp1661 = mobl.ref(null);
  
  
  var tmp1660 = mobl.ref(null);
  
  var nodes445 = $("<span>");
  root525.append(nodes445);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1660, tmp1661, tmp1662, function(_, callback) {
    var root528 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1654 = mobl.ref("img/CandidatoIU.jpg");
    
    
    var tmp1659 = mobl.ref(null);
    
    
    var tmp1658 = mobl.ref(null);
    
    
    var tmp1657 = mobl.ref(null);
    
    
    var tmp1656 = mobl.ref(null);
    
    
    var tmp1655 = mobl.ref(null);
    
    var nodes446 = $("<span>");
    root528.append(nodes446);
    subs__.addSub((mobl.ui.generic.image)(tmp1654, tmp1655, tmp1656, tmp1657, mobl.ref(EleccionES20N.photoStyle), tmp1658, tmp1659, function(_, callback) {
      var root529 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root529); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes446;
      nodes446 = node.contents();
      oldNodes.replaceWith(nodes446);
    }));
    
    root528.append("Nacido el 29 de enero de 1952, Argamasilla de Alba, Ciudad Real.<br/>");
    
    root528.append("miembro del Partido Comunista de España (PCE).<br/> ");
    
    root528.append("4º coordinador general de Izquierda Unida (IU).<br/>");
    
    root528.append("Agricultor y político. <br/>");
    callback(root528); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes445;
    nodes445 = node.contents();
    oldNodes.replaceWith(nodes445);
  }));
  callback(root525); return subs__;
  
  
  return subs__;
};

EleccionES20N.candidatoCIU = function(callback, screenCallback) {
  var root530 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1665 = mobl.ref("Duran i Lleida");
  
  
  var tmp1666 = mobl.ref(null);
  
  var nodes447 = $("<span>");
  root530.append(nodes447);
  subs__.addSub((mobl.ui.generic.header)(tmp1665, tmp1666, function(_, callback) {
    var root531 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1663 = mobl.ref("Volver");
    
    
    var tmp1664 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes448 = $("<span>");
    root531.append(nodes448);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1663, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1664, function(_, callback) {
      var root532 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root532); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes448;
      nodes448 = node.contents();
      oldNodes.replaceWith(nodes448);
    }));
    callback(root531); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes447;
    nodes447 = node.contents();
    oldNodes.replaceWith(nodes447);
  }));
  
  var tmp1675 = mobl.ref(null);
  
  
  var tmp1674 = mobl.ref(null);
  
  
  var tmp1673 = mobl.ref(null);
  
  var nodes449 = $("<span>");
  root530.append(nodes449);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1673, tmp1674, tmp1675, function(_, callback) {
    var root533 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1667 = mobl.ref("img/CandidatoCIU.jpg");
    
    
    var tmp1672 = mobl.ref(null);
    
    
    var tmp1671 = mobl.ref(null);
    
    
    var tmp1670 = mobl.ref(null);
    
    
    var tmp1669 = mobl.ref(null);
    
    
    var tmp1668 = mobl.ref(null);
    
    var nodes450 = $("<span>");
    root533.append(nodes450);
    subs__.addSub((mobl.ui.generic.image)(tmp1667, tmp1668, tmp1669, tmp1670, mobl.ref(EleccionES20N.photoStyle), tmp1671, tmp1672, function(_, callback) {
      var root534 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root534); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes450;
      nodes450 = node.contents();
      oldNodes.replaceWith(nodes450);
    }));
    
    root533.append("Nacido el 27 de marzo de 1952 en Alcampell (Huesca).<br/>");
    
    root533.append("Casado. Tres hijas. Abogado. Diplomado en las CEE.<br/> ");
    
    root533.append("Presidente-Portavoz del Grupo Parlamentario CiU en el Congreso de los Diputados en la VIII Legislatura. Presidente de la Comisión de Asuntos Exteriores en la VIII Legislatura. Presidente del Comitè de Govern de Unió Democràtica de Catalunya. Secretario General de la Federación CiU. Parlamentario Europeo (1986-1987). Consejero de Gobernación de la Generalitat de Catalunya (1999-2001). Diputado del Parlament de Catalunya (1999-2004). Vicepresidente de la Internacional DC (1982-1984 y 1987). <br/>");
    
    root533.append("Presidente de Honor de la Cámara de Comercio Hispano-Chilena. <br/>");
    callback(root533); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes449;
    nodes449 = node.contents();
    oldNodes.replaceWith(nodes449);
  }));
  callback(root530); return subs__;
  
  
  return subs__;
};

EleccionES20N.candidatoPNV = function(callback, screenCallback) {
  var root535 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1678 = mobl.ref("Erkoreka");
  
  
  var tmp1679 = mobl.ref(null);
  
  var nodes451 = $("<span>");
  root535.append(nodes451);
  subs__.addSub((mobl.ui.generic.header)(tmp1678, tmp1679, function(_, callback) {
    var root536 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1676 = mobl.ref("Volver");
    
    
    var tmp1677 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes452 = $("<span>");
    root536.append(nodes452);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1676, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1677, function(_, callback) {
      var root537 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root537); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes452;
      nodes452 = node.contents();
      oldNodes.replaceWith(nodes452);
    }));
    callback(root536); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes451;
    nodes451 = node.contents();
    oldNodes.replaceWith(nodes451);
  }));
  
  var tmp1688 = mobl.ref(null);
  
  
  var tmp1687 = mobl.ref(null);
  
  
  var tmp1686 = mobl.ref(null);
  
  var nodes453 = $("<span>");
  root535.append(nodes453);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1686, tmp1687, tmp1688, function(_, callback) {
    var root538 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1680 = mobl.ref("img/CandidatoPNV.jpg");
    
    
    var tmp1685 = mobl.ref(null);
    
    
    var tmp1684 = mobl.ref(null);
    
    
    var tmp1683 = mobl.ref(null);
    
    
    var tmp1682 = mobl.ref(null);
    
    
    var tmp1681 = mobl.ref(null);
    
    var nodes454 = $("<span>");
    root538.append(nodes454);
    subs__.addSub((mobl.ui.generic.image)(tmp1680, tmp1681, tmp1682, tmp1683, mobl.ref(EleccionES20N.photoStyle), tmp1684, tmp1685, function(_, callback) {
      var root539 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root539); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes454;
      nodes454 = node.contents();
      oldNodes.replaceWith(nodes454);
    }));
    
    root538.append("Nacido el 3 de julio de 1960 en Bermeo (Bizkaia).<br/>");
    
    root538.append("Diputado de la VII ,  VIII y  IX legislaturas.<br/> ");
    
    root538.append("Casado. Dos hijos.<br/>");
    
    root538.append("Letrado de los Servicios Jurídicos Centrales del Gobierno Vasco (Servicios Especiales). Profesor de Derecho Administrativo. Universidad de Deusto. (Excedencia). Director del Instituto Vasco de Administración Pública. <br/>");
    
    root538.append("Portavoz de la Comisión Constitucional. Portavoz del Grupo Parlamentario Vasco (EAJ-PNV). <br/>");
    callback(root538); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes453;
    nodes453 = node.contents();
    oldNodes.replaceWith(nodes453);
  }));
  callback(root535); return subs__;
  
  
  return subs__;
};

EleccionES20N.candidatoUPYD = function(callback, screenCallback) {
  var root540 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1691 = mobl.ref("Díez");
  
  
  var tmp1692 = mobl.ref(null);
  
  var nodes455 = $("<span>");
  root540.append(nodes455);
  subs__.addSub((mobl.ui.generic.header)(tmp1691, tmp1692, function(_, callback) {
    var root541 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1689 = mobl.ref("Volver");
    
    
    var tmp1690 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes456 = $("<span>");
    root541.append(nodes456);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1689, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1690, function(_, callback) {
      var root542 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root542); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes456;
      nodes456 = node.contents();
      oldNodes.replaceWith(nodes456);
    }));
    callback(root541); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes455;
    nodes455 = node.contents();
    oldNodes.replaceWith(nodes455);
  }));
  
  var tmp1701 = mobl.ref(null);
  
  
  var tmp1700 = mobl.ref(null);
  
  
  var tmp1699 = mobl.ref(null);
  
  var nodes457 = $("<span>");
  root540.append(nodes457);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1699, tmp1700, tmp1701, function(_, callback) {
    var root543 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1693 = mobl.ref("img/CandidatoUPyD.jpg");
    
    
    var tmp1698 = mobl.ref(null);
    
    
    var tmp1697 = mobl.ref(null);
    
    
    var tmp1696 = mobl.ref(null);
    
    
    var tmp1695 = mobl.ref(null);
    
    
    var tmp1694 = mobl.ref(null);
    
    var nodes458 = $("<span>");
    root543.append(nodes458);
    subs__.addSub((mobl.ui.generic.image)(tmp1693, tmp1694, tmp1695, tmp1696, mobl.ref(EleccionES20N.photoStyle), tmp1697, tmp1698, function(_, callback) {
      var root544 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root544); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes458;
      nodes458 = node.contents();
      oldNodes.replaceWith(nodes458);
    }));
    
    root543.append("Nacida el 27 de mayo de 1952.<br/>");
    
    root543.append("Diputada de la IX legislatura.<br/> ");
    
    root543.append("Casada. Dos hijos.<br/>");
    
    root543.append("Funcionaria de la Administración Pública en situación de servicios especiales.<br/>");
    
    root543.append("Diputada Foral de Bizkaia (Primera Dip. Democrática). Vicepresidenta de las Juntas Generales de Bizkaia. Concejal del Ayuntamiento de Güeñes. Parlamentaria en el Parlamento Vasco.<br/>");
    
    root543.append("Consejera del Gobierno Vasco.<br/>");
    
    root543.append("Parlamentaria en el Parlamento Europeo.<br/>");
    callback(root543); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes457;
    nodes457 = node.contents();
    oldNodes.replaceWith(nodes457);
  }));
  callback(root540); return subs__;
  
  
  return subs__;
};

EleccionES20N.candidatoERC = function(callback, screenCallback) {
  var root545 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1704 = mobl.ref("Bosch");
  
  
  var tmp1705 = mobl.ref(null);
  
  var nodes459 = $("<span>");
  root545.append(nodes459);
  subs__.addSub((mobl.ui.generic.header)(tmp1704, tmp1705, function(_, callback) {
    var root546 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1702 = mobl.ref("Volver");
    
    
    var tmp1703 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes460 = $("<span>");
    root546.append(nodes460);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1702, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1703, function(_, callback) {
      var root547 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root547); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes460;
      nodes460 = node.contents();
      oldNodes.replaceWith(nodes460);
    }));
    callback(root546); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes459;
    nodes459 = node.contents();
    oldNodes.replaceWith(nodes459);
  }));
  
  var tmp1714 = mobl.ref(null);
  
  
  var tmp1713 = mobl.ref(null);
  
  
  var tmp1712 = mobl.ref(null);
  
  var nodes461 = $("<span>");
  root545.append(nodes461);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1712, tmp1713, tmp1714, function(_, callback) {
    var root548 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1706 = mobl.ref("img/CandidatoERC.jpg");
    
    
    var tmp1711 = mobl.ref(null);
    
    
    var tmp1710 = mobl.ref(null);
    
    
    var tmp1709 = mobl.ref(null);
    
    
    var tmp1708 = mobl.ref(null);
    
    
    var tmp1707 = mobl.ref(null);
    
    var nodes462 = $("<span>");
    root548.append(nodes462);
    subs__.addSub((mobl.ui.generic.image)(tmp1706, tmp1707, tmp1708, tmp1709, mobl.ref(EleccionES20N.photoStyle), tmp1710, tmp1711, function(_, callback) {
      var root549 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root549); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes462;
      nodes462 = node.contents();
      oldNodes.replaceWith(nodes462);
    }));
    
    root548.append("Nacido en Barcelona el 17 de abril de 1961.<br/>");
    
    root548.append("Profesor universitario, novelista, ensayista y político.<br/> ");
    
    root548.append("Es uno de los autores más premiados y con más éxito de la literatura catalana.<br/>");
    
    root548.append("El 17 de septiembre de 2011 fue designado por la militancia de Esquerra Republicana de Catalunya (ERC).<br/>");
    callback(root548); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes461;
    nodes461 = node.contents();
    oldNodes.replaceWith(nodes461);
  }));
  callback(root545); return subs__;
  
  
  return subs__;
};

EleccionES20N.candidatoBNG = function(callback, screenCallback) {
  var root550 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1717 = mobl.ref("Jorquera");
  
  
  var tmp1718 = mobl.ref(null);
  
  var nodes463 = $("<span>");
  root550.append(nodes463);
  subs__.addSub((mobl.ui.generic.header)(tmp1717, tmp1718, function(_, callback) {
    var root551 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1715 = mobl.ref("Volver");
    
    
    var tmp1716 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes464 = $("<span>");
    root551.append(nodes464);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1715, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1716, function(_, callback) {
      var root552 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root552); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes464;
      nodes464 = node.contents();
      oldNodes.replaceWith(nodes464);
    }));
    callback(root551); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes463;
    nodes463 = node.contents();
    oldNodes.replaceWith(nodes463);
  }));
  
  var tmp1727 = mobl.ref(null);
  
  
  var tmp1726 = mobl.ref(null);
  
  
  var tmp1725 = mobl.ref(null);
  
  var nodes465 = $("<span>");
  root550.append(nodes465);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1725, tmp1726, tmp1727, function(_, callback) {
    var root553 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1719 = mobl.ref("img/CandidatoBNG.jpg");
    
    
    var tmp1724 = mobl.ref(null);
    
    
    var tmp1723 = mobl.ref(null);
    
    
    var tmp1722 = mobl.ref(null);
    
    
    var tmp1721 = mobl.ref(null);
    
    
    var tmp1720 = mobl.ref(null);
    
    var nodes466 = $("<span>");
    root553.append(nodes466);
    subs__.addSub((mobl.ui.generic.image)(tmp1719, tmp1720, tmp1721, tmp1722, mobl.ref(EleccionES20N.photoStyle), tmp1723, tmp1724, function(_, callback) {
      var root554 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root554); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes466;
      nodes466 = node.contents();
      oldNodes.replaceWith(nodes466);
    }));
    
    root553.append("Nacido el 31 de agosto de 1961 en Ferrol.<br/>");
    
    root553.append("Diputado de la IX legislatura.<br/> ");
    
    root553.append("Licenciado en Geografía e Historia por la Universidad de Santiago de Compostela.<br/>");
    
    root553.append("Participó en la fundación de los CAF (Comités Abertos de Facultade) y fue miembro del Claustro de la USC y de la Junta de Facultad de Geografía e Historia.<br/>");
    
    root553.append("Es Portavoz del BNG en el Congreso de los Diputados y Secretario de Acción Institucional en las Cortes de la Ejecutiva Nacional del Bloque Nacionalista Galego.<br/>");
    callback(root553); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes465;
    nodes465 = node.contents();
    oldNodes.replaceWith(nodes465);
  }));
  callback(root550); return subs__;
  
  
  return subs__;
};

EleccionES20N.candidatoCC = function(callback, screenCallback) {
  var root555 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1730 = mobl.ref("Oramas");
  
  
  var tmp1731 = mobl.ref(null);
  
  var nodes467 = $("<span>");
  root555.append(nodes467);
  subs__.addSub((mobl.ui.generic.header)(tmp1730, tmp1731, function(_, callback) {
    var root556 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1728 = mobl.ref("Volver");
    
    
    var tmp1729 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes468 = $("<span>");
    root556.append(nodes468);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1728, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1729, function(_, callback) {
      var root557 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root557); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes468;
      nodes468 = node.contents();
      oldNodes.replaceWith(nodes468);
    }));
    callback(root556); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes467;
    nodes467 = node.contents();
    oldNodes.replaceWith(nodes467);
  }));
  
  var tmp1740 = mobl.ref(null);
  
  
  var tmp1739 = mobl.ref(null);
  
  
  var tmp1738 = mobl.ref(null);
  
  var nodes469 = $("<span>");
  root555.append(nodes469);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1738, tmp1739, tmp1740, function(_, callback) {
    var root558 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1732 = mobl.ref("img/CandidatoCC.jpg");
    
    
    var tmp1737 = mobl.ref(null);
    
    
    var tmp1736 = mobl.ref(null);
    
    
    var tmp1735 = mobl.ref(null);
    
    
    var tmp1734 = mobl.ref(null);
    
    
    var tmp1733 = mobl.ref(null);
    
    var nodes470 = $("<span>");
    root558.append(nodes470);
    subs__.addSub((mobl.ui.generic.image)(tmp1732, tmp1733, tmp1734, tmp1735, mobl.ref(EleccionES20N.photoStyle), tmp1736, tmp1737, function(_, callback) {
      var root559 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root559); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes470;
      nodes470 = node.contents();
      oldNodes.replaceWith(nodes470);
    }));
    
    root558.append("Nacida el 17 de julio de 1959 en Santa Cruz de Tenerife.<br/>");
    
    root558.append("Diputada de la VIII y  IX legislaturas.<br/> ");
    
    root558.append("Casada. Una hija.<br/>");
    
    root558.append("Licenciada en Ciencias Económicas por la Universidad de La Laguna.<br/>");
    
    root558.append("Directora de la Sociedad de Garantías Recíprocas de Tenerife.<br/>");
    
    root558.append("Alcaldesa de San Cristóbal de La Laguna.<br/>");
    
    root558.append("Diputada Autonómica del Parlamento de Canarias. <br/>");
    
    root558.append("Viceconsejera de Administración Pública del Gobierno de Canarias.<br/>");
    callback(root558); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes469;
    nodes469 = node.contents();
    oldNodes.replaceWith(nodes469);
  }));
  callback(root555); return subs__;
  
  
  return subs__;
};

EleccionES20N.candidatos = function(elements, callback) {
  var root560 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1741 = mobl.ref("Candidatos");
  
  
  var tmp1742 = mobl.ref(null);
  
  var nodes471 = $("<span>");
  root560.append(nodes471);
  subs__.addSub((mobl.ui.generic.header)(tmp1741, tmp1742, function(_, callback) {
    var root561 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root561); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes471;
    nodes471 = node.contents();
    oldNodes.replaceWith(nodes471);
  }));
  var nodes472 = $("<span>");
  root560.append(nodes472);
  subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
    var root562 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1754 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.candidatoPSOE', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2080 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1756 = mobl.ref(false);
    
    
    var tmp1755 = mobl.ref(null);
    
    var nodes473 = $("<span>");
    root562.append(nodes473);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1754, tmp1755, tmp1756, function(_, callback) {
      var root563 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1750 = mobl.ref(15);
      
      
      var tmp1753 = mobl.ref(null);
      
      
      var tmp1752 = mobl.ref(null);
      
      
      var tmp1751 = mobl.ref(null);
      
      var nodes474 = $("<span>");
      root563.append(nodes474);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1751, tmp1750, tmp1752, tmp1753, function(_, callback) {
        var root564 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1744 = mobl.ref(24);
        
        
        var tmp1743 = mobl.ref("img/LogoPSOE.gif");
        
        
        var tmp1749 = mobl.ref(null);
        
        
        var tmp1748 = mobl.ref(null);
        
        
        var tmp1747 = mobl.ref(null);
        
        
        var tmp1746 = mobl.ref(null);
        
        
        var tmp1745 = mobl.ref(null);
        
        var nodes475 = $("<span>");
        root564.append(nodes475);
        subs__.addSub((mobl.ui.generic.image)(tmp1743, tmp1745, tmp1744, tmp1746, tmp1747, tmp1748, tmp1749, function(_, callback) {
          var root565 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root565); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes475;
          nodes475 = node.contents();
          oldNodes.replaceWith(nodes475);
        }));
        callback(root564); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes474;
        nodes474 = node.contents();
        oldNodes.replaceWith(nodes474);
      }));
      
      root563.append("Alfredo Pérez Rubalcaba");
      callback(root563); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes473;
      nodes473 = node.contents();
      oldNodes.replaceWith(nodes473);
    }));
    
    var tmp1768 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.candidatoPP', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2081 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1770 = mobl.ref(false);
    
    
    var tmp1769 = mobl.ref(null);
    
    var nodes476 = $("<span>");
    root562.append(nodes476);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1768, tmp1769, tmp1770, function(_, callback) {
      var root566 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1764 = mobl.ref(15);
      
      
      var tmp1767 = mobl.ref(null);
      
      
      var tmp1766 = mobl.ref(null);
      
      
      var tmp1765 = mobl.ref(null);
      
      var nodes477 = $("<span>");
      root566.append(nodes477);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1765, tmp1764, tmp1766, tmp1767, function(_, callback) {
        var root567 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1758 = mobl.ref(24);
        
        
        var tmp1757 = mobl.ref("img/LogoPP.gif");
        
        
        var tmp1763 = mobl.ref(null);
        
        
        var tmp1762 = mobl.ref(null);
        
        
        var tmp1761 = mobl.ref(null);
        
        
        var tmp1760 = mobl.ref(null);
        
        
        var tmp1759 = mobl.ref(null);
        
        var nodes478 = $("<span>");
        root567.append(nodes478);
        subs__.addSub((mobl.ui.generic.image)(tmp1757, tmp1759, tmp1758, tmp1760, tmp1761, tmp1762, tmp1763, function(_, callback) {
          var root568 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root568); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes478;
          nodes478 = node.contents();
          oldNodes.replaceWith(nodes478);
        }));
        callback(root567); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes477;
        nodes477 = node.contents();
        oldNodes.replaceWith(nodes477);
      }));
      
      root566.append("Mariano Rajoy");
      callback(root566); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes476;
      nodes476 = node.contents();
      oldNodes.replaceWith(nodes476);
    }));
    
    var tmp1782 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.candidatoIU', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2082 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1784 = mobl.ref(false);
    
    
    var tmp1783 = mobl.ref(null);
    
    var nodes479 = $("<span>");
    root562.append(nodes479);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1782, tmp1783, tmp1784, function(_, callback) {
      var root569 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1778 = mobl.ref(15);
      
      
      var tmp1781 = mobl.ref(null);
      
      
      var tmp1780 = mobl.ref(null);
      
      
      var tmp1779 = mobl.ref(null);
      
      var nodes480 = $("<span>");
      root569.append(nodes480);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1779, tmp1778, tmp1780, tmp1781, function(_, callback) {
        var root570 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1772 = mobl.ref(24);
        
        
        var tmp1771 = mobl.ref("img/LogoIU.gif");
        
        
        var tmp1777 = mobl.ref(null);
        
        
        var tmp1776 = mobl.ref(null);
        
        
        var tmp1775 = mobl.ref(null);
        
        
        var tmp1774 = mobl.ref(null);
        
        
        var tmp1773 = mobl.ref(null);
        
        var nodes481 = $("<span>");
        root570.append(nodes481);
        subs__.addSub((mobl.ui.generic.image)(tmp1771, tmp1773, tmp1772, tmp1774, tmp1775, tmp1776, tmp1777, function(_, callback) {
          var root571 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root571); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes481;
          nodes481 = node.contents();
          oldNodes.replaceWith(nodes481);
        }));
        callback(root570); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes480;
        nodes480 = node.contents();
        oldNodes.replaceWith(nodes480);
      }));
      
      root569.append("Cayo Lara");
      callback(root569); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes479;
      nodes479 = node.contents();
      oldNodes.replaceWith(nodes479);
    }));
    
    var tmp1796 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.candidatoCIU', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2083 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1798 = mobl.ref(false);
    
    
    var tmp1797 = mobl.ref(null);
    
    var nodes482 = $("<span>");
    root562.append(nodes482);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1796, tmp1797, tmp1798, function(_, callback) {
      var root572 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1792 = mobl.ref(15);
      
      
      var tmp1795 = mobl.ref(null);
      
      
      var tmp1794 = mobl.ref(null);
      
      
      var tmp1793 = mobl.ref(null);
      
      var nodes483 = $("<span>");
      root572.append(nodes483);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1793, tmp1792, tmp1794, tmp1795, function(_, callback) {
        var root573 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1786 = mobl.ref(24);
        
        
        var tmp1785 = mobl.ref("img/LogoCIU.gif");
        
        
        var tmp1791 = mobl.ref(null);
        
        
        var tmp1790 = mobl.ref(null);
        
        
        var tmp1789 = mobl.ref(null);
        
        
        var tmp1788 = mobl.ref(null);
        
        
        var tmp1787 = mobl.ref(null);
        
        var nodes484 = $("<span>");
        root573.append(nodes484);
        subs__.addSub((mobl.ui.generic.image)(tmp1785, tmp1787, tmp1786, tmp1788, tmp1789, tmp1790, tmp1791, function(_, callback) {
          var root574 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root574); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes484;
          nodes484 = node.contents();
          oldNodes.replaceWith(nodes484);
        }));
        callback(root573); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes483;
        nodes483 = node.contents();
        oldNodes.replaceWith(nodes483);
      }));
      
      root572.append("Josep Antoni Duran i Lleida");
      callback(root572); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes482;
      nodes482 = node.contents();
      oldNodes.replaceWith(nodes482);
    }));
    
    var tmp1810 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.candidatoPNV', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2084 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1812 = mobl.ref(false);
    
    
    var tmp1811 = mobl.ref(null);
    
    var nodes485 = $("<span>");
    root562.append(nodes485);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1810, tmp1811, tmp1812, function(_, callback) {
      var root575 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1806 = mobl.ref(15);
      
      
      var tmp1809 = mobl.ref(null);
      
      
      var tmp1808 = mobl.ref(null);
      
      
      var tmp1807 = mobl.ref(null);
      
      var nodes486 = $("<span>");
      root575.append(nodes486);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1807, tmp1806, tmp1808, tmp1809, function(_, callback) {
        var root576 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1800 = mobl.ref(24);
        
        
        var tmp1799 = mobl.ref("img/LogoPNV.gif");
        
        
        var tmp1805 = mobl.ref(null);
        
        
        var tmp1804 = mobl.ref(null);
        
        
        var tmp1803 = mobl.ref(null);
        
        
        var tmp1802 = mobl.ref(null);
        
        
        var tmp1801 = mobl.ref(null);
        
        var nodes487 = $("<span>");
        root576.append(nodes487);
        subs__.addSub((mobl.ui.generic.image)(tmp1799, tmp1801, tmp1800, tmp1802, tmp1803, tmp1804, tmp1805, function(_, callback) {
          var root577 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root577); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes487;
          nodes487 = node.contents();
          oldNodes.replaceWith(nodes487);
        }));
        callback(root576); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes486;
        nodes486 = node.contents();
        oldNodes.replaceWith(nodes486);
      }));
      
      root575.append("Josu Erkoreka");
      callback(root575); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes485;
      nodes485 = node.contents();
      oldNodes.replaceWith(nodes485);
    }));
    
    var tmp1824 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.candidatoUPYD', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2085 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1826 = mobl.ref(false);
    
    
    var tmp1825 = mobl.ref(null);
    
    var nodes488 = $("<span>");
    root562.append(nodes488);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1824, tmp1825, tmp1826, function(_, callback) {
      var root578 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1820 = mobl.ref(15);
      
      
      var tmp1823 = mobl.ref(null);
      
      
      var tmp1822 = mobl.ref(null);
      
      
      var tmp1821 = mobl.ref(null);
      
      var nodes489 = $("<span>");
      root578.append(nodes489);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1821, tmp1820, tmp1822, tmp1823, function(_, callback) {
        var root579 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1814 = mobl.ref(24);
        
        
        var tmp1813 = mobl.ref("img/LogoUPyD.gif");
        
        
        var tmp1819 = mobl.ref(null);
        
        
        var tmp1818 = mobl.ref(null);
        
        
        var tmp1817 = mobl.ref(null);
        
        
        var tmp1816 = mobl.ref(null);
        
        
        var tmp1815 = mobl.ref(null);
        
        var nodes490 = $("<span>");
        root579.append(nodes490);
        subs__.addSub((mobl.ui.generic.image)(tmp1813, tmp1815, tmp1814, tmp1816, tmp1817, tmp1818, tmp1819, function(_, callback) {
          var root580 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root580); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes490;
          nodes490 = node.contents();
          oldNodes.replaceWith(nodes490);
        }));
        callback(root579); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes489;
        nodes489 = node.contents();
        oldNodes.replaceWith(nodes489);
      }));
      
      root578.append("Rosa Díez");
      callback(root578); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes488;
      nodes488 = node.contents();
      oldNodes.replaceWith(nodes488);
    }));
    
    var tmp1838 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.candidatoERC', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2086 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1840 = mobl.ref(false);
    
    
    var tmp1839 = mobl.ref(null);
    
    var nodes491 = $("<span>");
    root562.append(nodes491);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1838, tmp1839, tmp1840, function(_, callback) {
      var root581 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1834 = mobl.ref(15);
      
      
      var tmp1837 = mobl.ref(null);
      
      
      var tmp1836 = mobl.ref(null);
      
      
      var tmp1835 = mobl.ref(null);
      
      var nodes492 = $("<span>");
      root581.append(nodes492);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1835, tmp1834, tmp1836, tmp1837, function(_, callback) {
        var root582 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1828 = mobl.ref(24);
        
        
        var tmp1827 = mobl.ref("img/LogoERC.gif");
        
        
        var tmp1833 = mobl.ref(null);
        
        
        var tmp1832 = mobl.ref(null);
        
        
        var tmp1831 = mobl.ref(null);
        
        
        var tmp1830 = mobl.ref(null);
        
        
        var tmp1829 = mobl.ref(null);
        
        var nodes493 = $("<span>");
        root582.append(nodes493);
        subs__.addSub((mobl.ui.generic.image)(tmp1827, tmp1829, tmp1828, tmp1830, tmp1831, tmp1832, tmp1833, function(_, callback) {
          var root583 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root583); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes493;
          nodes493 = node.contents();
          oldNodes.replaceWith(nodes493);
        }));
        callback(root582); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes492;
        nodes492 = node.contents();
        oldNodes.replaceWith(nodes492);
      }));
      
      root581.append("Alfred Bosch");
      callback(root581); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes491;
      nodes491 = node.contents();
      oldNodes.replaceWith(nodes491);
    }));
    
    var tmp1852 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.candidatoBNG', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2087 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1854 = mobl.ref(false);
    
    
    var tmp1853 = mobl.ref(null);
    
    var nodes494 = $("<span>");
    root562.append(nodes494);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1852, tmp1853, tmp1854, function(_, callback) {
      var root584 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1848 = mobl.ref(15);
      
      
      var tmp1851 = mobl.ref(null);
      
      
      var tmp1850 = mobl.ref(null);
      
      
      var tmp1849 = mobl.ref(null);
      
      var nodes495 = $("<span>");
      root584.append(nodes495);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1849, tmp1848, tmp1850, tmp1851, function(_, callback) {
        var root585 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1842 = mobl.ref(24);
        
        
        var tmp1841 = mobl.ref("img/LogoBNG.gif");
        
        
        var tmp1847 = mobl.ref(null);
        
        
        var tmp1846 = mobl.ref(null);
        
        
        var tmp1845 = mobl.ref(null);
        
        
        var tmp1844 = mobl.ref(null);
        
        
        var tmp1843 = mobl.ref(null);
        
        var nodes496 = $("<span>");
        root585.append(nodes496);
        subs__.addSub((mobl.ui.generic.image)(tmp1841, tmp1843, tmp1842, tmp1844, tmp1845, tmp1846, tmp1847, function(_, callback) {
          var root586 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root586); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes496;
          nodes496 = node.contents();
          oldNodes.replaceWith(nodes496);
        }));
        callback(root585); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes495;
        nodes495 = node.contents();
        oldNodes.replaceWith(nodes495);
      }));
      
      root584.append("Francisco Jorquera");
      callback(root584); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes494;
      nodes494 = node.contents();
      oldNodes.replaceWith(nodes494);
    }));
    
    var tmp1866 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.candidatoCC', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2088 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1868 = mobl.ref(false);
    
    
    var tmp1867 = mobl.ref(null);
    
    var nodes497 = $("<span>");
    root562.append(nodes497);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1866, tmp1867, tmp1868, function(_, callback) {
      var root587 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1862 = mobl.ref(15);
      
      
      var tmp1865 = mobl.ref(null);
      
      
      var tmp1864 = mobl.ref(null);
      
      
      var tmp1863 = mobl.ref(null);
      
      var nodes498 = $("<span>");
      root587.append(nodes498);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1863, tmp1862, tmp1864, tmp1865, function(_, callback) {
        var root588 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1856 = mobl.ref(24);
        
        
        var tmp1855 = mobl.ref("img/LogoCC.gif");
        
        
        var tmp1861 = mobl.ref(null);
        
        
        var tmp1860 = mobl.ref(null);
        
        
        var tmp1859 = mobl.ref(null);
        
        
        var tmp1858 = mobl.ref(null);
        
        
        var tmp1857 = mobl.ref(null);
        
        var nodes499 = $("<span>");
        root588.append(nodes499);
        subs__.addSub((mobl.ui.generic.image)(tmp1855, tmp1857, tmp1856, tmp1858, tmp1859, tmp1860, tmp1861, function(_, callback) {
          var root589 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root589); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes499;
          nodes499 = node.contents();
          oldNodes.replaceWith(nodes499);
        }));
        callback(root588); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes498;
        nodes498 = node.contents();
        oldNodes.replaceWith(nodes498);
      }));
      
      root587.append("Ana Oramas");
      callback(root587); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes497;
      nodes497 = node.contents();
      oldNodes.replaceWith(nodes497);
    }));
    callback(root562); return subs__;
    
    
    
    
    
    
    
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes472;
    nodes472 = node.contents();
    oldNodes.replaceWith(nodes472);
  }));
  callback(root560); return subs__;
  
  
  return subs__;
};

EleccionES20N.programaPSOE = function(callback, screenCallback) {
  var root590 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1871 = mobl.ref("PSOE");
  
  
  var tmp1872 = mobl.ref(null);
  
  var nodes500 = $("<span>");
  root590.append(nodes500);
  subs__.addSub((mobl.ui.generic.header)(tmp1871, tmp1872, function(_, callback) {
    var root591 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1869 = mobl.ref("Volver");
    
    
    var tmp1870 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes501 = $("<span>");
    root591.append(nodes501);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1869, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1870, function(_, callback) {
      var root592 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root592); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes501;
      nodes501 = node.contents();
      oldNodes.replaceWith(nodes501);
    }));
    callback(root591); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes500;
    nodes500 = node.contents();
    oldNodes.replaceWith(nodes500);
  }));
  
  var tmp1875 = mobl.ref(null);
  
  
  var tmp1874 = mobl.ref(null);
  
  
  var tmp1873 = mobl.ref(null);
  
  var nodes502 = $("<span>");
  root590.append(nodes502);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1873, tmp1874, tmp1875, function(_, callback) {
    var root593 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root593.append("- Redistribuir los recursos públicos orientados a promover la I+D+I  <br/>");
    
    root593.append("- Acuerdo para el Empleo entre todas las fuerzas políticas, comunidades autónomas, sindicatos y empresarios <br/>");
    
    root593.append("- Crear una Oficina de Lucha contra el Fraude especializada para combatir el fraude fiscal y el blanqueo de capitales <br/>");
    
    root593.append("- Nuevos sistema de acceso para los profesores similar al del MIR en sanidad. </br> ");
    
    root593.append("- Lograr el equilibrio presupuestario en sanidad sin recortes y sin copago mediante más impuestos al alcohol y tabaco <br/> ");
    
    root593.append("- Implantar un sistema de cuotas obligatorias en los consejos de administración de las grandes empresas para lograr el equilibrio entre géneros <br/> ");
    
    root593.append("- Modificar el Código Civil para que no se pueda contraer matrimonio con menos de 16 años. <br/>");
    
    root593.append("- Fomentar el alquiler para reducir el stock de vivienda existente <br/> ");
    
    root593.append("- Reducir la exclusión residencial (chabolismo y asentamientos temporeros agrícolas) <br/>");
    
    root593.append("- Se potenciará la inteligencia en la lucha contra el crimen organizado <br/>");
    
    root593.append("- El proceso de implantación de las TIC en los juzgados y tribunales <br/>");
    
    root593.append("- Facilitar y mejorar la Iniciativa Legislativa Popular ofreciendo la posibilidad de que un diputado 351 intervenga a lo largo del proceso legislativo con voz pero sin voto<br/>");
    
    root593.append("- Tasa sobre las transacciones financieras internacionales para reducir la especulación <br/>");
    
    root593.append("- Introducir mayores criterios medioambientales en la fiscalidad <br/>");
    
    root593.append("- Fortalecer las sinergias entre turismo y cultura <br/>");
    callback(root593); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes502;
    nodes502 = node.contents();
    oldNodes.replaceWith(nodes502);
  }));
  callback(root590); return subs__;
  
  
  return subs__;
};

EleccionES20N.programaPP = function(callback, screenCallback) {
  var root594 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1878 = mobl.ref("PP");
  
  
  var tmp1879 = mobl.ref(null);
  
  var nodes503 = $("<span>");
  root594.append(nodes503);
  subs__.addSub((mobl.ui.generic.header)(tmp1878, tmp1879, function(_, callback) {
    var root595 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1876 = mobl.ref("Volver");
    
    
    var tmp1877 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes504 = $("<span>");
    root595.append(nodes504);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1876, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1877, function(_, callback) {
      var root596 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root596); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes504;
      nodes504 = node.contents();
      oldNodes.replaceWith(nodes504);
    }));
    callback(root595); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes503;
    nodes503 = node.contents();
    oldNodes.replaceWith(nodes503);
  }));
  
  var tmp1882 = mobl.ref(null);
  
  
  var tmp1881 = mobl.ref(null);
  
  
  var tmp1880 = mobl.ref(null);
  
  var nodes505 = $("<span>");
  root594.append(nodes505);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1880, tmp1881, tmp1882, function(_, callback) {
    var root597 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root597.append("- Reformas estructurales para sanear el sistema financiero, la liberalización de la economía y el impulso de la competitividad <br/>");
    
    root597.append("- Reforma laboral integral que simplifique la tipología de contratos <br/>");
    
    root597.append("- Apoyo fiscal por un importe de 3.000 euros por la contratación del primer trabajador en una empresa de nueva creación <br/>");
    
    root597.append("- Sustitución de la asignatura Educación para la ciudadanía por otra cuyo contenido se centre en los valores constitucionales y el conocimiento de las instituciones españolas y europeas </br> ");
    
    root597.append("- Modificación de la ley del aborto para reforzar la protección del derecho a la vida. Promoción de una ley de protección de la maternidad <br/> ");
    
    root597.append("- Plan integral de apoyo a la conciliación de la vida laboral, personal y familiar de hombres y mujeres <br/> ");
    
    root597.append("- Fortalecimiento de la lucha contra los delitos en internet, con especial atención a la protección a la infancia <br/> ");
    
    root597.append("- Actualización de la deducción por adquisición de vivienda en el IRPF <br/>");
    
    root597.append("- Fomento de una inmigración legal, ordenada y vinculada al empleo y fin a las regulaciones masivas <br/>");
    
    root597.append("- En las infracciones por incivismo, se trasladará a los infractores el cobro de la reparación de los desperfectos originados en la vía pública <br/>");
    
    root597.append("- Incorporación de los juicios rápidos al ámbito civil y promoción de una nueva ley de enjuiciamiento criminal que agilice la instrucción <br/>");
    
    root597.append("- Aprobación del Convenio Europeo sobre Acceso a los Documentos Públicos, una ley de transparencia, acceso a la información pública y buen gobierno <br/>");
    
    root597.append("- Impulso de la candidatura de España al Consejo de Seguridad de la ONU para el período 2015-2016 <br/>");
    
    root597.append("- Fomento de las redes eléctricas inteligentes y de las energías renovables. Reducción en la intensidad de uso de petróleo como fuente de energía primaria en el transporte <br/>");
    
    root597.append("- Protección de las manifestaciones artísticas tradicionales como la tauromaquia <br/>");
    callback(root597); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes505;
    nodes505 = node.contents();
    oldNodes.replaceWith(nodes505);
  }));
  callback(root594); return subs__;
  
  
  return subs__;
};

EleccionES20N.programaIU = function(callback, screenCallback) {
  var root598 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1885 = mobl.ref("IU");
  
  
  var tmp1886 = mobl.ref(null);
  
  var nodes506 = $("<span>");
  root598.append(nodes506);
  subs__.addSub((mobl.ui.generic.header)(tmp1885, tmp1886, function(_, callback) {
    var root599 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1883 = mobl.ref("Volver");
    
    
    var tmp1884 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes507 = $("<span>");
    root599.append(nodes507);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1883, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1884, function(_, callback) {
      var root600 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root600); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes507;
      nodes507 = node.contents();
      oldNodes.replaceWith(nodes507);
    }));
    callback(root599); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes506;
    nodes506 = node.contents();
    oldNodes.replaceWith(nodes506);
  }));
  
  var tmp1889 = mobl.ref(null);
  
  
  var tmp1888 = mobl.ref(null);
  
  
  var tmp1887 = mobl.ref(null);
  
  var nodes508 = $("<span>");
  root598.append(nodes508);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1887, tmp1888, tmp1889, function(_, callback) {
    var root601 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root601.append("- Recuperar para el sector público empresas públicas privatizadas, especialmente en los sectores estratégicos como energía, comunicaciones, transporte, correos, banca... <br/>");
    
    root601.append("- Reducción de la jornada laboral a 35 horas semanales sin disminución de salario, y jubilación a los 60 años con plenos derechos económicos o tras 35 años cotizados <br/>");
    
    root601.append("- Reforma del IRPF: Todas las rentas tributarán de la misma manera, ya sean del trabajo o del capital <br/>");
    
    root601.append("- Gratuidad de los libros y materiales didácticos de aula, e implantación de software libre de código abierto en el sistema educativo <br/> ");
    
    root601.append("- Ampliación del catálogo de coberturas sanitarias que incluya óptica, ortopedia y salud buco denta <br/> ");
    
    root601.append("- Creación de un Ministerio de Igualdad de Género/Mujer con competencias exclusivas y presupuesto adecuado <br/> ");
    
    root601.append("- Programa de apoyo a la juventud española en el extranjero mendiante un sistema de becas de estudio, prácticas laborales, e incentivos a proyectos empresariales <br/> ");
    
    root601.append("- Promulgación de una nueva Ley Hipotecaria que contemple la dación en pago como fórmula para liquidar las deudas hipotecarias <br/>");
    
    root601.append("- Permitir el voto de inmigrantes con 2 años de residencia en el Estado <br/>");
    
    root601.append("- Crear un Nuevo Sistema Policial descentralizado y un Código de Ética básico común a todos los cuerpos policiales <br/>");
    
    root601.append("- Reformar el sistema de elección del TC, CGPJ y del Fiscal General del Estado <br/>");
    
    root601.append("- Establecimiento obligatorio de gestación, gestión y control participativos de los presupuestos de las administraciones públicas <br/>");
    
    root601.append("- La OTAN supone una amenaza contra la paz, IU exige su disolución y cierre de todas las bases de EEUU en el mundo <br/>");
    
    root601.append("- Crear un Ministerio de Medio Ambiente que atienda de forma exclusiva la conservación, cuidado y protección del medio <br/>");
    
    root601.append("- Eliminar de la brecha digital y definir el acceso a Internet como un Derecho Universal y Gratuito (hasta 10 Megabites) para el conjunto de los ciudadanos <br/>");
    callback(root601); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes508;
    nodes508 = node.contents();
    oldNodes.replaceWith(nodes508);
  }));
  callback(root598); return subs__;
  
  
  return subs__;
};

EleccionES20N.programaCIU = function(callback, screenCallback) {
  var root602 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1892 = mobl.ref("CIU");
  
  
  var tmp1893 = mobl.ref(null);
  
  var nodes509 = $("<span>");
  root602.append(nodes509);
  subs__.addSub((mobl.ui.generic.header)(tmp1892, tmp1893, function(_, callback) {
    var root603 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1890 = mobl.ref("Volver");
    
    
    var tmp1891 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes510 = $("<span>");
    root603.append(nodes510);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1890, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1891, function(_, callback) {
      var root604 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root604); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes510;
      nodes510 = node.contents();
      oldNodes.replaceWith(nodes510);
    }));
    callback(root603); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes509;
    nodes509 = node.contents();
    oldNodes.replaceWith(nodes509);
  }));
  
  var tmp1896 = mobl.ref(null);
  
  
  var tmp1895 = mobl.ref(null);
  
  
  var tmp1894 = mobl.ref(null);
  
  var nodes511 = $("<span>");
  root602.append(nodes511);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1894, tmp1895, tmp1896, function(_, callback) {
    var root605 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root605.append("- Creación de un Ministerio de la Empresa  <br/>");
    
    root605.append("- Reforma de la negociación colectiva para, entre otras medidas, facilitar una mayor vinculación entre el salario y la productividad <br/>");
    
    root605.append("- Lucha contra el fraude fiscal y la economía sumergida <br/>");
    
    root605.append("- Facilitar la movilidad de estudiantes, profesores e investigadores en la Universidad. <br/> ");
    
    root605.append("- Tratamiento fiscal favorable, en forma de desgravación, por la suscripción de pólizas de seguros sanitarios privados <br/> ");
    
    root605.append("- Reclamar al Estado recursos económicos previstos en la ley de medidas integrales contra la violencia de género <br/> ");
    
    root605.append("- Impulso de un plan de medidas de prevención y reducción del consumo de drogas <br/>");
    
    root605.append("- Recuperar temporalmente la deducción por compra de vivienda habitual durante 2012 <br/> ");
    
    root605.append("- Reivindicar más competencias en materia de inmigración <br/>");
    
    root605.append("- Exigir que la Generalitat sea la responsable integral de la segurida <br/>");
    
    root605.append("- Impulsar un amplio acuerdo social en materia de Justicia <br/>");
    
    root605.append("- Reforma del Senado <br/>");
    
    root605.append("- Trabajar para que Cataluña tenga voz propia entro de la Unión Europea. El catalán ha de ser una lengua oficial en las instituciones de la UE <br/>");
    
    root605.append("- Promover una ley sobre el cambio climático <br/>");
    
    root605.append("- Promover una nueva ley de patrocinio y mecenazgo e incrementar la transparencia en materia de subvenciones <br/>");
    callback(root605); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes511;
    nodes511 = node.contents();
    oldNodes.replaceWith(nodes511);
  }));
  callback(root602); return subs__;
  
  
  return subs__;
};

EleccionES20N.programaPNV = function(callback, screenCallback) {
  var root606 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1899 = mobl.ref("PNV");
  
  
  var tmp1900 = mobl.ref(null);
  
  var nodes512 = $("<span>");
  root606.append(nodes512);
  subs__.addSub((mobl.ui.generic.header)(tmp1899, tmp1900, function(_, callback) {
    var root607 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1897 = mobl.ref("Volver");
    
    
    var tmp1898 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes513 = $("<span>");
    root607.append(nodes513);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1897, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1898, function(_, callback) {
      var root608 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root608); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes513;
      nodes513 = node.contents();
      oldNodes.replaceWith(nodes513);
    }));
    callback(root607); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes512;
    nodes512 = node.contents();
    oldNodes.replaceWith(nodes512);
  }));
  
  var tmp1903 = mobl.ref(null);
  
  
  var tmp1902 = mobl.ref(null);
  
  
  var tmp1901 = mobl.ref(null);
  
  var nodes514 = $("<span>");
  root606.append(nodes514);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1901, tmp1902, tmp1903, function(_, callback) {
    var root609 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root609.append("- Transferencia a Euskadi de las competencias sobre crédito, banca y seguro  <br/>");
    
    root609.append("- Duplicar la duración de la ayuda al desempleo, manteniendo la cuantía actua <br/>");
    
    root609.append("- Modificación en el Estado del régimen de las SICAV <br/>");
    
    root609.append("- Mantenimiento del euskera como lengua vehicular <br/> ");
    
    root609.append("- Mayor investigación y prestación en el caso de las enfermedades raras <br/> ");
    
    root609.append("- Oposición a modificar las leyes de las dos últimas legislaturas, y más en concreto, la que se refiere a la Ley de Matrimonio Homosexual <br/> ");
    
    root609.append("- Convertir al País Vasco en destino preferente para jóvenes europeos de alta cualificación <br/>");
    
    root609.append("- Encaje en las redes transeuropeas <br/> ");
    
    root609.append("- Mantenimiento de los derechos de las personas extranjeras residentes, incluso en lo referente al reagrupamiento familiar y el arraigo <br/>");
    
    root609.append("- Derogación de las imprescriptibilidad de los delitos de terrorismo <br/>");
    
    root609.append("- Rechazo de cualquier intento de instaurar la pena de cadena perpetua, incluso si es de carácter revisable <br/>");
    
    root609.append("- Transparencia y participación como derechos ciudadanos <br/>");
    
    root609.append("- Reconocimiento de Kosovo y del derecho de autodeterminación de todos los pueblos <br/>");
    
    root609.append("- Cumplimiento estricto del Protocolo de Kyoto <br/>");
    
    root609.append("- Atracción y retención de talentos <br/>");
    callback(root609); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes514;
    nodes514 = node.contents();
    oldNodes.replaceWith(nodes514);
  }));
  callback(root606); return subs__;
  
  
  return subs__;
};

EleccionES20N.programaUPYD = function(callback, screenCallback) {
  var root610 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1906 = mobl.ref("UPyD");
  
  
  var tmp1907 = mobl.ref(null);
  
  var nodes515 = $("<span>");
  root610.append(nodes515);
  subs__.addSub((mobl.ui.generic.header)(tmp1906, tmp1907, function(_, callback) {
    var root611 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1904 = mobl.ref("Volver");
    
    
    var tmp1905 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes516 = $("<span>");
    root611.append(nodes516);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1904, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1905, function(_, callback) {
      var root612 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root612); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes516;
      nodes516 = node.contents();
      oldNodes.replaceWith(nodes516);
    }));
    callback(root611); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes515;
    nodes515 = node.contents();
    oldNodes.replaceWith(nodes515);
  }));
  
  var tmp1910 = mobl.ref(null);
  
  
  var tmp1909 = mobl.ref(null);
  
  
  var tmp1908 = mobl.ref(null);
  
  var nodes517 = $("<span>");
  root610.append(nodes517);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1908, tmp1909, tmp1910, function(_, callback) {
    var root613 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root613.append("- Terminar con cualquier privilegio en las pensiones de los parlamentarios y expresidentes <br/>");
    
    root613.append("- Reforma del mercado de trabajo: todos los nuevos contratos serán indefinidos y los temporales se suprimen salvo para sustitución de bajas <br/>");
    
    root613.append("- Creación de un nuevo impuesto que grave el consumo de bienes y servicios de lujo<br/>");
    
    root613.append("- El Estado recuperaría las competencias en educación, sin perjuicio de que la gestión siga siendo desempeñada por las Comunidades Autónoma <br/> ");
    
    root613.append("- Devolución al Estado de las competencias de Sanidad con el fin de reinstaurar un sistema sanitario común <br/> ");
    
    root613.append("- Ley Nacional de Custodia Compartida <br/> ");
    
    root613.append("- Desarrollo del contrato único laboral de investigación que mejore las condiciones y derechos de los jóvenes investigadores <br/>");
    
    root613.append("- Apoyo al incremento de la oferta de créditos hipotecarios en dación en pago de la vivienda para amortizar el crédito. <br/> ");
    
    root613.append("- La política de inmigración debe ser competencia de la UE <br/>");
    
    root613.append("- Cumplimiento íntegro de las penas de los terroristas presos <br/>");
    
    root613.append("- Recuperación por el Estado de la competencia exclusiva en materia de justicia <br/>");
    
    root613.append("- Modificación de la Ley Orgánica del Régimen Electoral General: sustitución de la fórmula electoral D'Hont por otra más proporcional como la fórmula Hare <br/>");
    
    root613.append("- Pacto de Estado para evitar que la política exterior cambie cuando cambien los gobiernos <br/>");
    
    root613.append("- Mantenimiento de la energía nuclear instalada <br/>");
    
    root613.append("- Garantizar el derecho de los usuarios de Internet a intercambiar, recibir u ofrecer cualquier flujo de información a través de la red, reconociendo la legalidad del uso de aplicaciones P2P para el intercambio de archivos <br/>");
    callback(root613); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes517;
    nodes517 = node.contents();
    oldNodes.replaceWith(nodes517);
  }));
  callback(root610); return subs__;
  
  
  return subs__;
};

EleccionES20N.programaERC = function(callback, screenCallback) {
  var root614 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1913 = mobl.ref("ERC");
  
  
  var tmp1914 = mobl.ref(null);
  
  var nodes518 = $("<span>");
  root614.append(nodes518);
  subs__.addSub((mobl.ui.generic.header)(tmp1913, tmp1914, function(_, callback) {
    var root615 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1911 = mobl.ref("Volver");
    
    
    var tmp1912 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes519 = $("<span>");
    root615.append(nodes519);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1911, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1912, function(_, callback) {
      var root616 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root616); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes519;
      nodes519 = node.contents();
      oldNodes.replaceWith(nodes519);
    }));
    callback(root615); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes518;
    nodes518 = node.contents();
    oldNodes.replaceWith(nodes518);
  }));
  
  var tmp1917 = mobl.ref(null);
  
  
  var tmp1916 = mobl.ref(null);
  
  
  var tmp1915 = mobl.ref(null);
  
  var nodes520 = $("<span>");
  root614.append(nodes520);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1915, tmp1916, tmp1917, function(_, callback) {
    var root617 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root617.append("- Reservar el 30% de la contratación pública a las empresas de economía social y a las pymes <br/>");
    
    root617.append("- Elevar el Salario Mínimo Interprofesional al 60% del salario medio neto, para alcanzar en cinco años los 1.000 euros mensuales <br/>");
    
    root617.append("- Soberanía fiscal efectiva para Cataluña, Baleares y la Comunidad Valenciana <br/>");
    
    root617.append("- Competencias exclusivas para las Comunidades Autónomas en impuestos <br/> ");
    
    root617.append("- Desaparición del Ministerio de Sanidad, para ahorrar recursos <br/> ");
    
    root617.append("- Ley de medidas integrales para la integración personal y laboral de los transexuales <br/>");
    
    root617.append("- Regular la venta de marihuana y legalizar el consumo, así como el de cannabis, educando en su uso responsable <br/> ");
    
    root617.append("- Declarar abusivas las cláusulas que fijan límites a la baja a la variación del tipo de interés en los contratos hipotecarios <br/>");
    
    root617.append("- Blindar el mantenimiento, durante la próxima década, del Fondo de Inmigración con una dotación mínima de 200 millones de euros<br/> ");
    
    root617.append("- Traspaso de las competencias penitenciarias a la Comunidad Valenciana y Baleares <br/>");
    
    root617.append("- Reforma de la Ley Orgánica del Poder Judicial<br/>");
    
    root617.append("- Regular los referéndums para que sean vinculantes. Libertad para que las CC.AA. y los ayuntamientos convoquen referéndums <br/>");
    
    root617.append("- Internacionalizar la causa del catalanismo para la constitución de los Países Catalanes <br/>");
    
    root617.append("- Destinar el 50% de la inversión estatal en medidas contra la crisis económica a la denominada economía verde <br/>");
    
    root617.append("- Supresión del Ministerio de Cultura, repartiendo su presupuesto entre las CC.AA <br/>");
    callback(root617); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes520;
    nodes520 = node.contents();
    oldNodes.replaceWith(nodes520);
  }));
  callback(root614); return subs__;
  
  
  return subs__;
};

EleccionES20N.programaBNG = function(callback, screenCallback) {
  var root618 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1920 = mobl.ref("BNG");
  
  
  var tmp1921 = mobl.ref(null);
  
  var nodes521 = $("<span>");
  root618.append(nodes521);
  subs__.addSub((mobl.ui.generic.header)(tmp1920, tmp1921, function(_, callback) {
    var root619 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1918 = mobl.ref("Volver");
    
    
    var tmp1919 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes522 = $("<span>");
    root619.append(nodes522);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1918, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1919, function(_, callback) {
      var root620 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root620); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes522;
      nodes522 = node.contents();
      oldNodes.replaceWith(nodes522);
    }));
    callback(root619); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes521;
    nodes521 = node.contents();
    oldNodes.replaceWith(nodes521);
  }));
  
  var tmp1924 = mobl.ref(null);
  
  
  var tmp1923 = mobl.ref(null);
  
  
  var tmp1922 = mobl.ref(null);
  
  var nodes523 = $("<span>");
  root618.append(nodes523);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1922, tmp1923, tmp1924, function(_, callback) {
    var root621 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root621.append("- Profunda reforma del sistema económico neoliberal para permitir mayor intervención pública en la actividad económica <br/>");
    
    root621.append("- Reactivación de los sectores productivos básicos de Galicia como el lácteo, naval, pesquero o agrario para crear empleo de calidad <br/>");
    
    root621.append("- Creación de una agencia tributaria gallega y medidas efectivas en la lucha contra el fraude fiscal <br/>");
    
    root621.append("- Incremento de las dotaciones para la enseñanza pública para lograr mayor calidad en el sistema educativo<br/> ");
    
    root621.append("- Incorporación de la asistencia odontológica gratuita hasta los 18 años <br/> ");
    
    root621.append("- Incrementar los recursos destinados a avanzar en la igualdad en todos los ámbitos sociales y económicos<br/>");
    
    root621.append("- Reestructuración de la formación continua para los jóvenes gallegos <br/> ");
    
    root621.append("- Admitir la dación de pago para la liquidación total de la hipoteca <br/>");
    
    root621.append("- Prorrogar los programas de alquiler para jóvenes y personas con pocos recursos<br/> ");
    
    root621.append("- Simplificar la estructura de las Fuerzas y Cuerpos de Seguridad del Estado a través de la creación de un cuerpo único de Policía <br/>");
    
    root621.append("- Creación de un poder judicial propio para cada circunscripción electora<br/>");
    
    root621.append("- Reforma de la ley electoral que fije a las CCAA como circunscripción electoral y una fórmula de proporcionalidad directa para la atribución de representantes <br/>");
    
    root621.append("- Condena enérgica a Marruecos por la ocupación del Sáhara Occidental <br/>");
    
    root621.append("- Oposición a construir nuevas centrales nucleares <br/>");
    
    root621.append("- Traspaso a las Comunidades Autónomas de la gestión de museos, archivos, bibliotecas y otras infraestructuras culturales <br/>");
    callback(root621); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes523;
    nodes523 = node.contents();
    oldNodes.replaceWith(nodes523);
  }));
  callback(root618); return subs__;
  
  
  return subs__;
};

EleccionES20N.programaCC = function(callback, screenCallback) {
  var root622 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1927 = mobl.ref("CC");
  
  
  var tmp1928 = mobl.ref(null);
  
  var nodes524 = $("<span>");
  root622.append(nodes524);
  subs__.addSub((mobl.ui.generic.header)(tmp1927, tmp1928, function(_, callback) {
    var root623 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1925 = mobl.ref("Volver");
    
    
    var tmp1926 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes525 = $("<span>");
    root623.append(nodes525);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1925, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1926, function(_, callback) {
      var root624 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root624); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes525;
      nodes525 = node.contents();
      oldNodes.replaceWith(nodes525);
    }));
    callback(root623); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes524;
    nodes524 = node.contents();
    oldNodes.replaceWith(nodes524);
  }));
  
  var tmp1931 = mobl.ref(null);
  
  
  var tmp1930 = mobl.ref(null);
  
  
  var tmp1929 = mobl.ref(null);
  
  var nodes526 = $("<span>");
  root622.append(nodes526);
  subs__.addSub((mobl.block)(mobl.ref(EleccionES20N.textStyle), tmp1929, tmp1930, tmp1931, function(_, callback) {
    var root625 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root625.append("- Medidas para incrementar el turismo. Profundizar en la política de subvenciones al transporte aéreo y marítimo. Desarrollo de las tarifas de pasajeros en los aeropuertos canarios y bonificaciones de tasas <br/>");
    
    root625.append("- Actualización del Salario Mínimo Interprofesional para pasar de los 641,40 euros al mes de 2011 a 800 euros en la próxima legislatura <br/>");
    
    root625.append("- Creación de una Agencia Tributaria de Canarias <br/>");
    
    root625.append("- Lograr la transferencia de la gestión de los programas de becas del Ministerio de Educación al Gobierno de Canarias<br/> ");
    
    root625.append("- Desarrollar el derecho de los pacientes a acceder a su historia clínica aprovechando las posibilidades que la tecnología actual permite <br/> ");
    
    root625.append("- Medidas laborales que favorezcan la conciliación. Promover la corresponsabilidad de los hombres, las empresas y los poderes públicos con el cuidado de las personas<br/>");
    
    root625.append("- Programa específico de acceso a la vivienda, en propiedad y en alquiler, para jóvenes de entre 18 y 35 años <br/> ");
    
    root625.append("- Deducción fiscal por la compra de vivienda: para unidades familiares cuya renta máxima no supere los 60.000 euros y para compra de vivienda habitua <br/>");
    
    root625.append("- Disminuir el efecto llamada sobre segmentos de población inmigratorios y controlar absolutamente la inmigración ilegal<br/> ");
    
    root625.append("- Defensa ante la UE de una estrategia integral para abordar el fenómeno migratorio, basada en la solidaridad entre los Estados  <br/>");
    
    root625.append("- Modificación de las normas que regulan el referéndum y la iniciativa legislativa popular para quitar trámites que limiten ambos mecanismos<br/>");
    
    root625.append("- Establecimiento de una mayoría cualificada de tres quintos del Congreso de los Diputados para autorizar misiones de las Fuerzas Armadas fuera de España <br/>");
    
    root625.append("- Asumir competencias propias en materias como inmigración, comercio exterior, y relaciones con países del entorno cultural y geográfico de América y África <br/>");
    
    root625.append("- Valoración preferente a sectores de reciclaje y reutilización y agricultura biológica <br/>");
    
    root625.append("- Intercambios culturales como instrumento de integración entre los pueblos <br/>");
    callback(root625); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes526;
    nodes526 = node.contents();
    oldNodes.replaceWith(nodes526);
  }));
  callback(root622); return subs__;
  
  
  return subs__;
};

EleccionES20N.programas = function(elements, callback) {
  var root626 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1932 = mobl.ref("Programas");
  
  
  var tmp1933 = mobl.ref(null);
  
  var nodes527 = $("<span>");
  root626.append(nodes527);
  subs__.addSub((mobl.ui.generic.header)(tmp1932, tmp1933, function(_, callback) {
    var root627 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root627); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes527;
    nodes527 = node.contents();
    oldNodes.replaceWith(nodes527);
  }));
  var nodes528 = $("<span>");
  root626.append(nodes528);
  subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
    var root628 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1945 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.programaPSOE', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2089 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1947 = mobl.ref(false);
    
    
    var tmp1946 = mobl.ref(null);
    
    var nodes529 = $("<span>");
    root628.append(nodes529);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1945, tmp1946, tmp1947, function(_, callback) {
      var root629 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1941 = mobl.ref(15);
      
      
      var tmp1944 = mobl.ref(null);
      
      
      var tmp1943 = mobl.ref(null);
      
      
      var tmp1942 = mobl.ref(null);
      
      var nodes530 = $("<span>");
      root629.append(nodes530);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1942, tmp1941, tmp1943, tmp1944, function(_, callback) {
        var root630 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1935 = mobl.ref(24);
        
        
        var tmp1934 = mobl.ref("img/LogoPSOE.gif");
        
        
        var tmp1940 = mobl.ref(null);
        
        
        var tmp1939 = mobl.ref(null);
        
        
        var tmp1938 = mobl.ref(null);
        
        
        var tmp1937 = mobl.ref(null);
        
        
        var tmp1936 = mobl.ref(null);
        
        var nodes531 = $("<span>");
        root630.append(nodes531);
        subs__.addSub((mobl.ui.generic.image)(tmp1934, tmp1936, tmp1935, tmp1937, tmp1938, tmp1939, tmp1940, function(_, callback) {
          var root631 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root631); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes531;
          nodes531 = node.contents();
          oldNodes.replaceWith(nodes531);
        }));
        callback(root630); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes530;
        nodes530 = node.contents();
        oldNodes.replaceWith(nodes530);
      }));
      
      root629.append("Partido Socialista");
      callback(root629); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes529;
      nodes529 = node.contents();
      oldNodes.replaceWith(nodes529);
    }));
    
    var tmp1959 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.programaPP', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2090 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1961 = mobl.ref(false);
    
    
    var tmp1960 = mobl.ref(null);
    
    var nodes532 = $("<span>");
    root628.append(nodes532);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1959, tmp1960, tmp1961, function(_, callback) {
      var root632 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1955 = mobl.ref(15);
      
      
      var tmp1958 = mobl.ref(null);
      
      
      var tmp1957 = mobl.ref(null);
      
      
      var tmp1956 = mobl.ref(null);
      
      var nodes533 = $("<span>");
      root632.append(nodes533);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1956, tmp1955, tmp1957, tmp1958, function(_, callback) {
        var root633 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1949 = mobl.ref(24);
        
        
        var tmp1948 = mobl.ref("img/LogoPP.gif");
        
        
        var tmp1954 = mobl.ref(null);
        
        
        var tmp1953 = mobl.ref(null);
        
        
        var tmp1952 = mobl.ref(null);
        
        
        var tmp1951 = mobl.ref(null);
        
        
        var tmp1950 = mobl.ref(null);
        
        var nodes534 = $("<span>");
        root633.append(nodes534);
        subs__.addSub((mobl.ui.generic.image)(tmp1948, tmp1950, tmp1949, tmp1951, tmp1952, tmp1953, tmp1954, function(_, callback) {
          var root634 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root634); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes534;
          nodes534 = node.contents();
          oldNodes.replaceWith(nodes534);
        }));
        callback(root633); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes533;
        nodes533 = node.contents();
        oldNodes.replaceWith(nodes533);
      }));
      
      root632.append("Partido Popular");
      callback(root632); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes532;
      nodes532 = node.contents();
      oldNodes.replaceWith(nodes532);
    }));
    
    var tmp1973 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.programaIU', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2091 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1975 = mobl.ref(false);
    
    
    var tmp1974 = mobl.ref(null);
    
    var nodes535 = $("<span>");
    root628.append(nodes535);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1973, tmp1974, tmp1975, function(_, callback) {
      var root635 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1969 = mobl.ref(15);
      
      
      var tmp1972 = mobl.ref(null);
      
      
      var tmp1971 = mobl.ref(null);
      
      
      var tmp1970 = mobl.ref(null);
      
      var nodes536 = $("<span>");
      root635.append(nodes536);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1970, tmp1969, tmp1971, tmp1972, function(_, callback) {
        var root636 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1963 = mobl.ref(24);
        
        
        var tmp1962 = mobl.ref("img/LogoIU.gif");
        
        
        var tmp1968 = mobl.ref(null);
        
        
        var tmp1967 = mobl.ref(null);
        
        
        var tmp1966 = mobl.ref(null);
        
        
        var tmp1965 = mobl.ref(null);
        
        
        var tmp1964 = mobl.ref(null);
        
        var nodes537 = $("<span>");
        root636.append(nodes537);
        subs__.addSub((mobl.ui.generic.image)(tmp1962, tmp1964, tmp1963, tmp1965, tmp1966, tmp1967, tmp1968, function(_, callback) {
          var root637 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root637); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes537;
          nodes537 = node.contents();
          oldNodes.replaceWith(nodes537);
        }));
        callback(root636); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes536;
        nodes536 = node.contents();
        oldNodes.replaceWith(nodes536);
      }));
      
      root635.append("Izquierda Unida");
      callback(root635); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes535;
      nodes535 = node.contents();
      oldNodes.replaceWith(nodes535);
    }));
    
    var tmp1987 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.programaCIU', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2092 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1989 = mobl.ref(false);
    
    
    var tmp1988 = mobl.ref(null);
    
    var nodes538 = $("<span>");
    root628.append(nodes538);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1987, tmp1988, tmp1989, function(_, callback) {
      var root638 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1983 = mobl.ref(15);
      
      
      var tmp1986 = mobl.ref(null);
      
      
      var tmp1985 = mobl.ref(null);
      
      
      var tmp1984 = mobl.ref(null);
      
      var nodes539 = $("<span>");
      root638.append(nodes539);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1984, tmp1983, tmp1985, tmp1986, function(_, callback) {
        var root639 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1977 = mobl.ref(24);
        
        
        var tmp1976 = mobl.ref("img/LogoCIU.gif");
        
        
        var tmp1982 = mobl.ref(null);
        
        
        var tmp1981 = mobl.ref(null);
        
        
        var tmp1980 = mobl.ref(null);
        
        
        var tmp1979 = mobl.ref(null);
        
        
        var tmp1978 = mobl.ref(null);
        
        var nodes540 = $("<span>");
        root639.append(nodes540);
        subs__.addSub((mobl.ui.generic.image)(tmp1976, tmp1978, tmp1977, tmp1979, tmp1980, tmp1981, tmp1982, function(_, callback) {
          var root640 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root640); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes540;
          nodes540 = node.contents();
          oldNodes.replaceWith(nodes540);
        }));
        callback(root639); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes539;
        nodes539 = node.contents();
        oldNodes.replaceWith(nodes539);
      }));
      
      root638.append("Convergència i Unió");
      callback(root638); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes538;
      nodes538 = node.contents();
      oldNodes.replaceWith(nodes538);
    }));
    
    var tmp2001 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.programaPNV', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2093 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp2003 = mobl.ref(false);
    
    
    var tmp2002 = mobl.ref(null);
    
    var nodes541 = $("<span>");
    root628.append(nodes541);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp2001, tmp2002, tmp2003, function(_, callback) {
      var root641 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1997 = mobl.ref(15);
      
      
      var tmp2000 = mobl.ref(null);
      
      
      var tmp1999 = mobl.ref(null);
      
      
      var tmp1998 = mobl.ref(null);
      
      var nodes542 = $("<span>");
      root641.append(nodes542);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp1998, tmp1997, tmp1999, tmp2000, function(_, callback) {
        var root642 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1991 = mobl.ref(24);
        
        
        var tmp1990 = mobl.ref("img/LogoPNV.gif");
        
        
        var tmp1996 = mobl.ref(null);
        
        
        var tmp1995 = mobl.ref(null);
        
        
        var tmp1994 = mobl.ref(null);
        
        
        var tmp1993 = mobl.ref(null);
        
        
        var tmp1992 = mobl.ref(null);
        
        var nodes543 = $("<span>");
        root642.append(nodes543);
        subs__.addSub((mobl.ui.generic.image)(tmp1990, tmp1992, tmp1991, tmp1993, tmp1994, tmp1995, tmp1996, function(_, callback) {
          var root643 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root643); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes543;
          nodes543 = node.contents();
          oldNodes.replaceWith(nodes543);
        }));
        callback(root642); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes542;
        nodes542 = node.contents();
        oldNodes.replaceWith(nodes542);
      }));
      
      root641.append("Nacionalista Vasco");
      callback(root641); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes541;
      nodes541 = node.contents();
      oldNodes.replaceWith(nodes541);
    }));
    
    var tmp2015 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.programaUPYD', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2094 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp2017 = mobl.ref(false);
    
    
    var tmp2016 = mobl.ref(null);
    
    var nodes544 = $("<span>");
    root628.append(nodes544);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp2015, tmp2016, tmp2017, function(_, callback) {
      var root644 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp2011 = mobl.ref(15);
      
      
      var tmp2014 = mobl.ref(null);
      
      
      var tmp2013 = mobl.ref(null);
      
      
      var tmp2012 = mobl.ref(null);
      
      var nodes545 = $("<span>");
      root644.append(nodes545);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp2012, tmp2011, tmp2013, tmp2014, function(_, callback) {
        var root645 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp2005 = mobl.ref(24);
        
        
        var tmp2004 = mobl.ref("img/LogoUPyD.gif");
        
        
        var tmp2010 = mobl.ref(null);
        
        
        var tmp2009 = mobl.ref(null);
        
        
        var tmp2008 = mobl.ref(null);
        
        
        var tmp2007 = mobl.ref(null);
        
        
        var tmp2006 = mobl.ref(null);
        
        var nodes546 = $("<span>");
        root645.append(nodes546);
        subs__.addSub((mobl.ui.generic.image)(tmp2004, tmp2006, tmp2005, tmp2007, tmp2008, tmp2009, tmp2010, function(_, callback) {
          var root646 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root646); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes546;
          nodes546 = node.contents();
          oldNodes.replaceWith(nodes546);
        }));
        callback(root645); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes545;
        nodes545 = node.contents();
        oldNodes.replaceWith(nodes545);
      }));
      
      root644.append("Progreso y Democracia");
      callback(root644); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes544;
      nodes544 = node.contents();
      oldNodes.replaceWith(nodes544);
    }));
    
    var tmp2029 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.programaERC', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2095 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp2031 = mobl.ref(false);
    
    
    var tmp2030 = mobl.ref(null);
    
    var nodes547 = $("<span>");
    root628.append(nodes547);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp2029, tmp2030, tmp2031, function(_, callback) {
      var root647 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp2025 = mobl.ref(15);
      
      
      var tmp2028 = mobl.ref(null);
      
      
      var tmp2027 = mobl.ref(null);
      
      
      var tmp2026 = mobl.ref(null);
      
      var nodes548 = $("<span>");
      root647.append(nodes548);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp2026, tmp2025, tmp2027, tmp2028, function(_, callback) {
        var root648 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp2019 = mobl.ref(24);
        
        
        var tmp2018 = mobl.ref("img/LogoERC.gif");
        
        
        var tmp2024 = mobl.ref(null);
        
        
        var tmp2023 = mobl.ref(null);
        
        
        var tmp2022 = mobl.ref(null);
        
        
        var tmp2021 = mobl.ref(null);
        
        
        var tmp2020 = mobl.ref(null);
        
        var nodes549 = $("<span>");
        root648.append(nodes549);
        subs__.addSub((mobl.ui.generic.image)(tmp2018, tmp2020, tmp2019, tmp2021, tmp2022, tmp2023, tmp2024, function(_, callback) {
          var root649 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root649); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes549;
          nodes549 = node.contents();
          oldNodes.replaceWith(nodes549);
        }));
        callback(root648); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes548;
        nodes548 = node.contents();
        oldNodes.replaceWith(nodes548);
      }));
      
      root647.append("Esquerra Republicana");
      callback(root647); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes547;
      nodes547 = node.contents();
      oldNodes.replaceWith(nodes547);
    }));
    
    var tmp2043 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.programaBNG', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2096 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp2045 = mobl.ref(false);
    
    
    var tmp2044 = mobl.ref(null);
    
    var nodes550 = $("<span>");
    root628.append(nodes550);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp2043, tmp2044, tmp2045, function(_, callback) {
      var root650 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp2039 = mobl.ref(15);
      
      
      var tmp2042 = mobl.ref(null);
      
      
      var tmp2041 = mobl.ref(null);
      
      
      var tmp2040 = mobl.ref(null);
      
      var nodes551 = $("<span>");
      root650.append(nodes551);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp2040, tmp2039, tmp2041, tmp2042, function(_, callback) {
        var root651 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp2033 = mobl.ref(24);
        
        
        var tmp2032 = mobl.ref("img/LogoBNG.gif");
        
        
        var tmp2038 = mobl.ref(null);
        
        
        var tmp2037 = mobl.ref(null);
        
        
        var tmp2036 = mobl.ref(null);
        
        
        var tmp2035 = mobl.ref(null);
        
        
        var tmp2034 = mobl.ref(null);
        
        var nodes552 = $("<span>");
        root651.append(nodes552);
        subs__.addSub((mobl.ui.generic.image)(tmp2032, tmp2034, tmp2033, tmp2035, tmp2036, tmp2037, tmp2038, function(_, callback) {
          var root652 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root652); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes552;
          nodes552 = node.contents();
          oldNodes.replaceWith(nodes552);
        }));
        callback(root651); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes551;
        nodes551 = node.contents();
        oldNodes.replaceWith(nodes551);
      }));
      
      root650.append("El Bloque Galego");
      callback(root650); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes550;
      nodes550 = node.contents();
      oldNodes.replaceWith(nodes550);
    }));
    
    var tmp2057 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('EleccionES20N.programaCC', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp2097 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp2059 = mobl.ref(false);
    
    
    var tmp2058 = mobl.ref(null);
    
    var nodes553 = $("<span>");
    root628.append(nodes553);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp2057, tmp2058, tmp2059, function(_, callback) {
      var root653 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp2053 = mobl.ref(15);
      
      
      var tmp2056 = mobl.ref(null);
      
      
      var tmp2055 = mobl.ref(null);
      
      
      var tmp2054 = mobl.ref(null);
      
      var nodes554 = $("<span>");
      root653.append(nodes554);
      subs__.addSub((mobl.ui.generic.floatBox)(tmp2054, tmp2053, tmp2055, tmp2056, function(_, callback) {
        var root654 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp2047 = mobl.ref(24);
        
        
        var tmp2046 = mobl.ref("img/LogoCC.gif");
        
        
        var tmp2052 = mobl.ref(null);
        
        
        var tmp2051 = mobl.ref(null);
        
        
        var tmp2050 = mobl.ref(null);
        
        
        var tmp2049 = mobl.ref(null);
        
        
        var tmp2048 = mobl.ref(null);
        
        var nodes555 = $("<span>");
        root654.append(nodes555);
        subs__.addSub((mobl.ui.generic.image)(tmp2046, tmp2048, tmp2047, tmp2049, tmp2050, tmp2051, tmp2052, function(_, callback) {
          var root655 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root655); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes555;
          nodes555 = node.contents();
          oldNodes.replaceWith(nodes555);
        }));
        callback(root654); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes554;
        nodes554 = node.contents();
        oldNodes.replaceWith(nodes554);
      }));
      
      root653.append("Coalición Canaria");
      callback(root653); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes553;
      nodes553 = node.contents();
      oldNodes.replaceWith(nodes553);
    }));
    callback(root628); return subs__;
    
    
    
    
    
    
    
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes528;
    nodes528 = node.contents();
    oldNodes.replaceWith(nodes528);
  }));
  callback(root626); return subs__;
  
  
  return subs__;
};

EleccionES20N.resultados = function(elements, callback) {
  var root656 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp2062 = mobl.ref("Resultados");
  
  
  var tmp2063 = mobl.ref(null);
  
  var nodes556 = $("<span>");
  root656.append(nodes556);
  subs__.addSub((mobl.ui.generic.header)(tmp2062, tmp2063, function(_, callback) {
    var root657 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp2061 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         var result__ = mobl.reload();
                         if(callback && callback.apply) callback(); return;
                       });
    
    
    var tmp2060 = mobl.ref("Cargar");
    
    var nodes557 = $("<span>");
    root657.append(nodes557);
    subs__.addSub((mobl.ui.generic.button)(tmp2060, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp2061, function(_, callback) {
      var root658 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root658); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes557;
      nodes557 = node.contents();
      oldNodes.replaceWith(nodes557);
    }));
    callback(root657); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes556;
    nodes556 = node.contents();
    oldNodes.replaceWith(nodes556);
  }));
  
  var tmp2064 = mobl.ref("http://www.mobilets.eu/file/theme/simple/ResultadosVotacion.png");
  
  
  var tmp2069 = mobl.ref(null);
  
  
  var tmp2068 = mobl.ref(null);
  
  
  var tmp2067 = mobl.ref(null);
  
  
  var tmp2066 = mobl.ref(null);
  
  
  var tmp2065 = mobl.ref(null);
  
  var nodes558 = $("<span>");
  root656.append(nodes558);
  subs__.addSub((mobl.ui.generic.image)(tmp2064, tmp2065, tmp2066, tmp2067, mobl.ref(EleccionES20N.photoStyle), tmp2068, tmp2069, function(_, callback) {
    var root659 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root659); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes558;
    nodes558 = node.contents();
    oldNodes.replaceWith(nodes558);
  }));
  callback(root656); return subs__;
  
  
  return subs__;
};

EleccionES20N.root = function(callback, screenCallback) {
  var root660 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  var nodes559 = $("<span>");
  root660.append(nodes559);
  subs__.addSub((EleccionES20N.banner)(function(_, callback) {
    var root661 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root661); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes559;
    nodes559 = node.contents();
    oldNodes.replaceWith(nodes559);
  }));
  
  var tmp2070 = mobl.ref([new mobl.Tuple("I", "img/inicio.png", EleccionES20N.inicio), new mobl.Tuple("P", "img/partidos.png", EleccionES20N.partidos), new mobl.Tuple("C", "", EleccionES20N.candidatos), new mobl.Tuple("G", "", EleccionES20N.programas), new mobl.Tuple("R", "", EleccionES20N.resultados)]);
  subs__.addSub(mobl.ref(EleccionES20N.inicio).addEventListener('change', function() {
    tmp2070.set([new mobl.Tuple("I", "img/inicio.png", EleccionES20N.inicio), new mobl.Tuple("P", "img/partidos.png", EleccionES20N.partidos), new mobl.Tuple("C", "", EleccionES20N.candidatos), new mobl.Tuple("G", "", EleccionES20N.programas), new mobl.Tuple("R", "", EleccionES20N.resultados)]);
  }));
  subs__.addSub(mobl.ref(EleccionES20N.partidos).addEventListener('change', function() {
    tmp2070.set([new mobl.Tuple("I", "img/inicio.png", EleccionES20N.inicio), new mobl.Tuple("P", "img/partidos.png", EleccionES20N.partidos), new mobl.Tuple("C", "", EleccionES20N.candidatos), new mobl.Tuple("G", "", EleccionES20N.programas), new mobl.Tuple("R", "", EleccionES20N.resultados)]);
  }));
  subs__.addSub(mobl.ref(EleccionES20N.candidatos).addEventListener('change', function() {
    tmp2070.set([new mobl.Tuple("I", "img/inicio.png", EleccionES20N.inicio), new mobl.Tuple("P", "img/partidos.png", EleccionES20N.partidos), new mobl.Tuple("C", "", EleccionES20N.candidatos), new mobl.Tuple("G", "", EleccionES20N.programas), new mobl.Tuple("R", "", EleccionES20N.resultados)]);
  }));
  subs__.addSub(mobl.ref(EleccionES20N.programas).addEventListener('change', function() {
    tmp2070.set([new mobl.Tuple("I", "img/inicio.png", EleccionES20N.inicio), new mobl.Tuple("P", "img/partidos.png", EleccionES20N.partidos), new mobl.Tuple("C", "", EleccionES20N.candidatos), new mobl.Tuple("G", "", EleccionES20N.programas), new mobl.Tuple("R", "", EleccionES20N.resultados)]);
  }));
  subs__.addSub(mobl.ref(EleccionES20N.resultados).addEventListener('change', function() {
    tmp2070.set([new mobl.Tuple("I", "img/inicio.png", EleccionES20N.inicio), new mobl.Tuple("P", "img/partidos.png", EleccionES20N.partidos), new mobl.Tuple("C", "", EleccionES20N.candidatos), new mobl.Tuple("G", "", EleccionES20N.programas), new mobl.Tuple("R", "", EleccionES20N.resultados)]);
  }));
  
  var nodes560 = $("<span>");
  root660.append(nodes560);
  subs__.addSub((mobl.ui.generic.tabSet)(tmp2070, function(_, callback) {
    var root662 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root662); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes560;
    nodes560 = node.contents();
    oldNodes.replaceWith(nodes560);
  }));
  callback(root660); return subs__;
  
  
  return subs__;
};



<!--
  // XHTML should not attempt to parse these strings, declare them CDATA.
  /* <![CDATA[ */
  window.googleAfmcRequest = {
    client: 'ca-mb-pub-3461174449619703',
    format: '320x50_mb',
    output: 'html',
    slotname: '5266416026',
  };
  /* ]]> */
//-->








    if (window && window.google && google.gears || window.openDatabase) {
      try {
        persistence.store.websql.config(persistence, 'EleccionES20N', 'mobl database', 1024 * 1024, '1.0');
      } catch(e) {
        alert("Could not connect to the database, sometimes a refresh helps.");
      }

      persistence.search.config(persistence, persistence.store.websql.sqliteDialect);
    } else {
      persistence.store.memory.config(persistence);
    }
    









    mobl.icon = "img/default-icon.png";
    $(function(){
      persistence.schemaSync(function(tx) {
        if(persistence.loadFromLocalStorage) {
          persistence.loadFromLocalStorage();
        }
        $("#mobl-loading").remove();
        mobl.call("EleccionES20N.root", [mobl.ref(false), mobl.ref("none")], function() {});
      });
    });
    

		var admob_vars = {
		 pubid: 'a14eb40b83397c3', // publisher id
		 bgcolor: 'FFFFFF', // background color (hex)
		 text: '000000', // font-color (hex)
		 test: false, // test mode, set to false to receive live ads
		 manual_mode: true
		};
	


	 _admob.fetchAd(document.getElementById('anuncio'));
	

mobl.provides('mobl.ui.generic');
mobl.provides('mobl.ui');
mobl.provides('mobl');
mobl.ui.generic.loadingStyle = 'mobl__ui__generic__loadingStyle';

mobl.ui.generic.whenLoaded = function(value, style, loadingMessage, elements, callback) {
  var root10 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node6 = $("<span>");
  root10.append(node6);
  var condSubs0 = new mobl.CompSubscription();
  subs__.addSub(condSubs0);
  var oldValue0;
  var renderCond0 = function() {
    var value10 = value.get();
    if(oldValue0 === value10) return;
    oldValue0 = value10;
    var subs__ = condSubs0;
    subs__.unsubscribe();
    node6.empty();
    if(value10) {
      var nodes4 = $("<span>");
      node6.append(nodes4);
      subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
        renderControl4();
      }));
      
      function renderControl4() {
        subs__.addSub((elements)(function(elements, callback) {
          var root11 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root11); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes4;
          nodes4 = node.contents();
          oldNodes.replaceWith(nodes4);
        }));
      }
      renderControl4();
      
      
    } else {
      
      var tmp12 = mobl.ref(null);
      
      
      var tmp11 = mobl.ref(null);
      
      
      var tmp9 = mobl.ref(null);
      
      var nodes5 = $("<span>");
      node6.append(nodes5);
      subs__.addSub((mobl.block)(style, tmp9, tmp11, tmp12, function(_, callback) {
        var root12 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1 = mobl.ref(null);
        
        
        var tmp0 = mobl.ref(null);
        
        var nodes6 = $("<span>");
        root12.append(nodes6);
        subs__.addSub((mobl.label)(loadingMessage, tmp0, tmp1, function(_, callback) {
          var root13 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root13); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes6;
          nodes6 = node.contents();
          oldNodes.replaceWith(nodes6);
        }));
        
        var tmp3 = mobl.ref("middle");
        
        
        var tmp2 = mobl.ref("data:image/gif;base64,R0lGODlhIAAgAOf2AAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19f///////////////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQD/ACwAAAAAIAAgAAAI/gABCBxIsKDBgwgTKlzIsKHDhxAjSiSoYc+bCBMFbqCSY4DAApTgyQOUcUGkZcXAeHxQLB49SgI+xnSYAdYxZsjCDHgQLN48NAEEaFAh4oDDA3+EIXO2rAiAN96owQBQ4YVVCg87XBKWLNofAAROlAgAwIPVFxAgmrAkzJgWgxZcvADhESKGKk2MFhTgIAKBhwweNCjAMICBvwoPHMkDCNCYBwoLhFhxIm3CFYEIGUKkiIfCC2dLzDyI4k6e03hqKLQQerTBAkHCgOFCREHkDydGQFYoYAGDBK4RBiX78ACFBsQJBoAAIThDAyVguMBaEIPcEIgbBjBrtQOAAAoSTAgEcXZ3QwEnrLqQAMD6CgdUz1J3yOFFCwwBBqR/ESJoBhUk6OXQABAwQBYBKVhFAnEF1JURAB9YhcGDByHgwQUOUqjhhhx26KGGAQEAIfkEBQUA/wAsBQADABQAGAAACMwA/wkcSDDABg8BCCpc+I+KMmhKGEpcAAsdu1MFJGZwUmOgg14WgS1gqIDQLltZBoJsB0wBwwugbPXSpeXfAlro3LXKONCAQANzYt361QvIPzXZvHlROGGghkSxcgm7IzBGjQESBYpAFMsWlawMLTQx4hOsQAUNFhAwOzBAjTJs2lRhwPYfhDBs3MCRI6NuAilfAn9RUReACCFIisxAUBgAAQQGEtZVaKDp5IEkXjQGAIDDZYIlPg+84EL0PwEOTC/0ILDCZwMZKAhYGBAAIfkEBQUA/wAsBQADABIAFgAACMsA/wkcSBBDnDMQCCokGOBPt295FkpsEKubOFsKFlowAkOAwAi4uo3zxUBhgjupTEXx6GCWyFwCCTgQSOERqVWqpghQsKobuVP/GADSIrCAmU6lWrXa8e8MtWtb/r3pVGPghTyeTsFq8+9ADh3/Aqj5odADHk+lmiwMIXECEbISCRJQkCBAXIIAMBSxYgVIxrv/BuyQQsVKFhOAA9MgwpjIh8T/IKx40SJEAcj/BBQggLlz3Mue/2UIHWBE6H8UWEAGwJq1gr8ERRAMCAAh+QQFBQD/ACwFAAMAFAAWAAAIzgD/CRxI8IKaMA8IKlz47w60aXMYSmRgCpq1VhL/GUhBYiAEVtCu1VrAcEAVSJKSCGyAKiSsBAI3OBho4M2jS5iWCPwEDdsngYSswfogMMAURJA0bbLxLwwyZlf+tXFHLx2QgRTOIJLUSYxGGzcEbqL3jY4EghnMIIpEZOEcaGUYQtBxo8BCBCIUCjBwICPDBC14/IDR169AACBs4NDRI4Phwx1gSIYx4bFABCBUpPBAwHJRz6BDh8bAsLBCAKgBeGCowjCEFSxE/zuAwHJAACH5BAUFAP8ALAYAAwATABgAAAjSAP8JHDiwwhcpDggqXNgGWDE2CyP+W5AJGDJRCRQC2KiAwUYADjwFQ6Zq4UYOZuT4EMhAU7BkpgZqmPBvoxA8gQYF+ZdAUrBllggs+OOsVomNM+DkIYToxb8suX5J+ZemHLt3ZwQ2oBJnDyIrAmXMEGiJHbx3UwZSmNJ1x8I36uKRgkCwwQsXBBYqQHLFgsAABAh8HEwYgMACHlKo+JBXIkEKLyK/iOD4seQXEioPLPBBYIcBmkOLHk1a4oXSnlH/Y4BihWYRCgsY0BxAdejTEQMCACH5BAUFAP8ALAYAAwAVABYAAAjMAP8JHDhwgpUlCwgqXChwzCtaWhhK/KdA0atblhAwBMARQICBDRy9wtVJgUAFLTgQJDBjyYuPCxa9yqVJYwZI1X7JGOihC5o2NwIgGPRqFyOBj76NMxdnYAcrYNjIQfEPSipYTP6d2bb0HJSBCX5cEQMnyb8CLl4IOABKnLl0nyAQfNDjypgYC+eUSwcKw8IEI0YMWAjhypcKAzlO/PvAwD8BGFCg6LD4nwEbNlA4kFtZ4oPOEgWoBD1QRAPSqFOrXs1wA2uKJ14TSB0QACH5BAUFAP8ALAYAAwAWABYAAAjdAP8JHDiwAAsWAggqBMCwYcMlljYVUUiRYoI8m0oFKlDxn0OHC/pwMvUogcAERqI8ENjwwgsOJ/NwOsXowL8LiJxZo0NwgQ8nVFj8OzCHE6o/Ag1Ju7bNFIKBDXIUiaIFxD8jlj5NDOOMabczBAmY2HHEig6BKVb8M2DJ2rZvmFYSTIBiRxITFNlo+5bpQkUDFzIkVPhgyhYKHRMTVPDB778AihV6SMXtGJJ/DFxEHuiGnDZqmxIs0Lz534klQnioeJwhRYrSAxd4BECAAOzbuHPr3r1ZhWPdBRjCDggAIfkEBQUA/wAsBgADABYAFQAACNQAAQgcSFDBAYIIAfxbyJDhCDZoRDScSHEhAS6GIHFJOLDivwNnDEXSc2AhgiBLHEw0YCGCSTOGJAVC8K+CH2DI2jQcQGJGjg//DIQxRIlOAQV8iCVz1qmkyRYwbPzA8C+Hn0U2/mn5hcwZtDANBYh4EUOHin8COoRYuKirNEgqJ5ogq4FimWbTIlXwWEFCAIoOnliZ4LFwwwQeLDBUbJhhh1HVghn5l6BFY4Z13sGDx2tB5csL6dAbfUsBaIYcENGapeP0xAM0XcueTbu27X8hDDAMCAAh+QQFBQD/ACwGAAMAFgAVAAAIywABCBxIsKBBAP8SKlS4AEcOBgsjSkwo4IebPEUmakxoQIobPWgMKORRpEHEAQ0WCDwwxQ2fNwf+TZgDCxeZhQE8uGBRAeETN37IEEgQZ1YuX5EWFlDx4kWLB/9aoLnj4l8UV7h8CdMisekLDv8CYABb4M8tX8MMmZzogoLELr2IHXI7kQJUiQ2SQJGwsa/CDhUSAgjsN+EGTsx6MfmHgEXhhHDMnTtXS0Hjx//gsNtsK6EFFI83eDImawlmpXdPq17NurXrfx8KKAwIACH5BAUFAP8ALAYABAAXABMAAAjSAP8JHDhQAIYMAQgq/AegoUOHJaJoUbGwokICO6iEiTJA4IEWPhgsDKAggcACPKiM2WLgXwQznExtGegQw78VAgngoFJmygAEZD6dakWoZUETCkNAAYMUySZTrWJNodnww0IJFwIQiFOq1aw9Ii3+k7BwCitafMiKtchgiJIIa+P+Q8CBRAWjcgeGmBQsGa9HEg7gzNtnGzdu3bQZMTBY7h1xkMVxOwKAwom8HDD98uVLDgKBHfP+c0A6tOgdUhyIXijk0SYKqxXGEPMi9sIKBAMCACH5BAUFAP8ALAYABAAYABUAAAjRAAEIHEhQAQKCCAf+W8iQoYUZPDA0nEix4YATOIzsELDQQIkQHCsmMLBwQAocSIwQ+OcAC6JENipaaKGiJEYlQAQYqKJIUqYwBCsutGDjiId/PQxFyuQpidCGAhlEWBgGUiZQbhY8fZoEUyg4U7cKVcBjyAOxaP9pEBECQtqJJRzR4tXL04u3CwPwaebsGTRokgoQQPHWj7XDhyWtnPD2Q6RatWg5IoyXYYPLBSoniBKl8kQx7tqV8szwhq5675yQXnhkWD0zqxcaKdQhdkmKAQEAIfkEBQUA/wAsBgAEABgAFQAACNgA/wkcSLAAAYIIEyZ8kOIEA4UQCQoo8QJGiQACBSQwAKCjR48FCJ6o2ELAvwVBylB5mDBCCoQvYrD4V8DInD2CXiQMMCIhixcU/sl4o2cQIRMRBWoQqGABgAFQ8gxS5CVkUggJewhiJMZB0ogJaOho8LXsAQwfPjwYOKGsQBGCSrFyJWnFPwIo3P6b4+sXMGDBDh3U+88OMmTHDiMSiNVtB0SrVKUqhJQwQgaD9SJw4oSsZYEB8pwr96nt5wGk4rU7t+SzQDfw4rkT4/rkIGudagsksOFAwoAAIfkEBQUA/wAsBwAEABYAFQAACMIA/wkcODBAAIIIExJkICLEAYUQBQYI8eLFBgAYAQTIiDFixRICDaz4geIgQQcJK44IQIBGFjFhIiAEMRDlPxYsIPwjUSXMGjUTEHYYmEEgAgX/AuwAs2bOEwIRFcZQU2cKg6gKD6RgsQBrVAMVOGxo8E+n138e6lDa1InQibMC0bBq5eoVrD1w/7G5xZdvn7wb/Hjq1GnPiLz/CDBYjFiJEsQD63TTdkkC5E/oyHFDAnkNusxeIP/78wwVSNEaEiAMCAAh+QQFBQD/ACwIAAQAFgAXAAAIzQD/CRw4EIDBgwgPEhy4IMSHhRAj/gNRMGFCiQsHYCgB4SJGgQJC8DiSQwBBAB4+XtBhBMqSAws5SDRYoggULTkCLDxQAiOIJ1yEKPgYccCHEQmIfiwgAQMGBEoJajATCFEiNyKiCuSCKdMmTpzcDNAaplQpUmbhjI2KYc6jR47ePNQqcMGCoVohXJnigO5AOtWeObKgNUKAA6i6YZvGiEHUR0z+ufHWLRu0IVERrSrw7xG4yl2iltn8T8KhZ7ZWRKVSZmCBEhi0ZsCLMSAAIfkEBQUA/wAsCQAEABUAFwAACNgAAQgcSLCgwX8IEx7woKFAwocQIX5AmCGiRQIWEQp4QAHjwwYnUmT818EFjA8BRkas8AJGDRcCHmpQ6cGlDxEFDai0UAMIDIcqIQqokEFn0IwEHkxoYPToPwtV2Mh5s6WC039OBA0qZOiQEgBOqUAaO7YJ2KMVzPzx4yfMhKv/BiSYO8ApBStMGsBF+AZZsEEUggqYUeLfgn/QlBET5EClCGXXlPxLMw3aMmJeVLpIJs/UPwWHqEFjZunAyBrU5CWsEGmaMzSas8FjkxACkyV6R0KYoyb3yIAAIfkEBQUA/wAsCQAFABQAFgAACMsA/wkcaADDBQIDEypcyHDhgIYDGzQQkHCBCRQQ/7lwcQGARwAcMv57QXJEgIEZRJJ8UUGkQpIgHrocCCECwpkKByx4kMDjTAdArGyxIoOiwI9IP/JIs6aNmzMRZv7IQzXPmwkzIVxxA8eMjJM4ESw44DOjBCdFGOAUeAYXrDsSMiKwQeKfgk7BdNGy06BhgD3mnh35J6ZYsF20rDSEoAxeuk//EvwxFoyXIgMML0iDp46UwAmIiv0C03DAJsdoBj44YkRtQw90zogMCAAh+QQFBQD/ACwIAAUAFQAWAAAIswD/CRz4rwDBgwgPekjIsKHAAAoUAJg40eHADf9YRLAoUMWDgx8oAmB44ADHkyhTohSAQIEBlQha9BCyw8LIkyqeRJlCZcgAlDLACAVzhECJkw2QZMHSBAMAASsPGPh5MoKRHgpU/utiipMaCBxpiPiXABIsVKHSLHB4p1uxIf+20IKVKlQTh8TOfbsksE4tWKr4NLTA7Bw4TgIl9Jnl6opDS+e8jRnoAAeQtQ07vBHDwGFAACH5BAUFAP8ALAkABQAUABgAAAjRAP8JHCiwwgCCCP8BWMiQQ8KHEBEmMBAxYgsVDipGdKixY0cXHhNmDJkwgAEDAkgaCLGChQgEITnQqHEDxwcAHkcU2VmEBM6OCWwQGSIjAcl/BQqk7OiABw2jD2XoYMhwSqRDW0YKpCBwTiOBOmAMQCCI06RFWxQgvAKtyz851IYh+SdFFKdKjYIQdNFJD4IHvLZJSyQAgZpRnCydOSgQQYaDH55xm/bvwD8IcUBtagJRQzJu1DhZ/sdARg61Dx/Y4latz1Eqw2jhOBqAwwWNAQEAIfkEBQUA/wAsCQAFABMAGAAACMwA/wkc+O8CBYIIExK8oLChwgMOHbJAoSDivxQJNVgsYLGjx48fCQQAKTDFBwIeM7xY+QJCShgwXzzwaIBEixUfBnwMMGDAyIEjECRM8EIFRIIl1jxDk9BIHjhKFgy0cEecPEn/DtxoIeCAHEN96CwR+k/LuXnptPxjc6yWkH9IHBnyY8eGQBzIqtn550CWs2F+snZxdOgPEwAACnIQiMGXs2KQDPD9osiPDIUXejkzNklyVhUjBCikgMvZMUUoOw44tPkKSA1jrkhtGBAAIfkEBQUA/wAsCQAFABMAGAAACMMA/wkc+K/CBIIIEypcyHCgAQINFa4wgSCiQgsWE0LIyLGjRwAAPP7TIECkCwcZLbxY6aJBxgIfTpioEKCjAAEg/4UgU0ThARIfChD0sGueOTIJc4SxgqOiQDXy3qlrJHBGin8EtLwhs8UGxH+K3q0DZ+VfGVyldvzzceeNGS4cBNoI1kyOQFO/ZMkJYOBJWzMhBlrQINBCrF+0BAlUoAQNEgUXD9cyNHBAgwEgQxKUsOqXLT8DOPb5VetJRwxcoEBeGBAAIfkEBQUA/wAsCQAHABMAFgAACLcA/wkcSPAfAAAFBhRcWFCDChIHGEqcSLGixYsYM2q8EEDjPxYRNa4IibGEBAAeB4IQM4TkwAEYKCgc2KHWum5gFqoosoNEgYFz1JkDZ+ifARck/gUYUiXJjxEd/x0yF65alH9dTk2i8S/GlypLfCgQSCPXMDYHGGRq9YnMvwJAvFQhkmBghQwCKYxqFWrOTwQugoA4iJIgBVGtRtkpQFgA4cIDI3RqRQoORgFzEh/JaGEKkroSAwIAIfkEBQUA/wAsBwAHABUAFgAACMwA/wkcSLDgPwEGEyYUYUChw4EQHj58ILGixYsYMxYYWAEAxgsDVRhg0UOIE5AWRdoYdStRA4sjBjaosNFigIIfzERRYFDAhAkJR7gKZ02MQQ4wXoQoiGEUOG3T/vwrgOJDgAAwcsR4sQGA139ivmmrlswKgCmU/rD4R4KIVhQDBv7ZZs1ZnX8LFGVSVOXfgBdDcpRAKFAGrF9sXkqYpImRGAL/DIQIsaAghQ6Q/0mIpMlRGQJeQ4dO+KCRpkdgMv4Lc7qHaghFdiBwGBAAIfkEBQUA/wAsBgAOABYADwAACLwA/1lYkeKfwYMIE/6bIFCVLUqAVCic+A8FAQzO6NGLx4WiwhMD/lHx1WwSBI8JHyCkgLLlvw5gmrhUGKIUtWRbFGJ48WKihU3TmhWrY1CEhn8ARPB8kQFhADnSmhnT9eRfkj9pRvy7sLSEgIMKUDU79kuMAQV5CMkh8k9ABxcvOACY+2+AnmPB4ij4BwEQoTpPQgp4MIFASiNEGBh84IfQnSghZxpMYIcQHiUBJB9EEkiOCc0HDZj4kJliQAAh+QQFBQD/ACwGAAcAFgAWAAAIzAD/CRxIsOA/AgYHkkg4EAMKhhAjSpxIsaLFgRUsDLj4L0AVZtEyYagYQeCyeCivVDwx4AIyduzUaalYQsC/KLeKOeIokMEEngQ5aEGSwGAACBBsGvywyViuKQldMKwQiVgvWmoOYvj5LwRENcN62UJ15F+PM1E0/LMwUEQAgpx63XKVpQACM2uyyADwj8O/FhUICohzC5aZohHesNmyQ6kDBm8JOgDiY4FAB2vYdOmhtOIBLmy+wABAurTp06U/TBFSkiFq0wUEvC4dEAAh+QQFBQD/ACwGAA0AFgAQAAAIsAD//aNQQaDBgwgRSjG2rNKFhBBPQPhXgRi6dOmoQIRYQoCFX+LEgbuysWQTV7wOPSjJUgLLl/8yTAmCACbCDo5qoVrCkgDCCYVosQrl5d8ACQwAADhoAWEYWaxGVfLxL0aTGysPdlC6NIEjVqQ0Ofl3IEqUHiAMtmAx8aAZUpuw1HSQJQoQEwEELlDAdem/BjlqGBCoYIoUIXhtGgywQ8oQDYoPMlDhYUDJvpgzaw4IACH5BAUFAP8ALAUACQAWABMAAAjDAP8J/FekxsCDCBMK3CPJoMKHA0PkgjQDokUQYjRYRGhgwoV/BzYivPBIGLJilyyIFOjACzdu3bx9C7NSoBZrOK1V61JzBIZFuHLJIkRhpYgF/wpYwDCBQE2FF5boCPn0n4ZAoigFqRoBTyhMjKD8E8AgAUQAaK98wuQIEI1/I2iscIBQ40AEfzBBKjSEQIEdNmCECCCQBQqkB7VAMrQkJIIegUsIDHCgQMIFMlpYToojsIiqAkPQaAEB9NgHDNCqXh0QACH5BAUFAP8ALAQABwAYABUAAAjaAP8JHNigwMCDCBMOxIHrjMKHCRvRc4YEosV/f+LR+8Th4kMQu+J9m+Hx4YczTAyWHCjBAoWVCHdgutVrF6QLKxv8U/Dp2TNo0aS5WTkiQIJLyJImDbNSRIB/NS6tYlVKD86SCgYqqGAhAkyIFITMMPB14IU4jfzYKPvvQZpFguoE+Rcgq0AQLBUyUSToDhoV/zC4GFhhYIaEBMoIytPGxoABKF68MLziRIKBADID8FGHTQ+DBVRIJvEvM9mHBDxwGCBwwAnJHzTLnk07s4UVKBhArD3bgMqHAQEAIfkEBQUA/wAsBAAHABUAFQAACLYA/wkc+MBCgIEIEya08c8ZmwEDFEoUiIgdPHRIJk7Uk65dPEAaJX6glY7clJASPYxJgnJggQgVJBhoOfBGo1WxXh2yQDPBpF/AggkjZoYmgkW3buFKqoXmvxiJNnGq9KaC038JJlB4cFVhBBwqCnSdAMbOGRVXE1yhk2YLjJAREMKQk8aLkw0hLwDYC+BFGjBUVgj4d4ImAyJMUhBoyXcvgQMHBZoQqKHrPwgmSiSw/G/AYIUBAQAh+QQFBQD/ACwEAAcAFwAVAAAIswD/CRwoocLAgwgTDsx1LI3ChwcFiTsHzghEiHS8jUPH5+LDDqu8bYPi8aMXiyUPQpgQISVCGYE6jRLFR4LLBQgKuXIFK5YsKi5FHOhTqmjRKC4FrtCjSBEhMTaT/kMAIYKDAVITOmgRQkDWfxCadGGyIeuAIVueAAFx8UHCC1WeDKER9SGFhBSYFMHBIcBDFSQOJBQQYsUFrA8LIP4HoLHjAI4FjPh6kMEIDwYo/wvg92FAACH5BAUFAP8ALAQABQAVABcAAAjRAP8JHEjw34YpFAQUXJihQwCBAR7dirGwIJBdxMgM+PcgWS0ZFQcGMGRNWzUz/yAgWxWSoJxo1rhdQ/JPDqeWAzeQinbNm6F/BDrgHJhiVLRpYIYu3MBlygGlQB1EeFAAqsAWdBpJkhQnAtQDdjRt4uTp0xKoBtpAWrv2iNUSau7ciUMFgtV/Bxw8WKDwLsEFHyo8vKsgh5AZFO4KaPGDBgyhVhfkcOzCb4EVMFxgwPmhAIDPnxlkoPCQQIqKD0GrBh0ghF+CCDxALri6tm3QAQEAIfkEAQUA/wAsBAAFABUAFgAACMYA/wkcSPCfhjVZGBQsaIFKjgEDF8V7N2fhwAOBlhUDM3BYPHqKLAqUgOpYs2Rh/j0IFm9eGZH/BOQRhuzZsiL/3nh7BgPmvw6XhCWL9kfgCQ4BfP4zYUmYMS1KF2Ko0iTqQAYPHFgdWOHLHkCAxjywGiAKoUKHECkKQtZJnrdveWylwCRMGC5EGmyNuYBBgr0LD1DQC9hACRguAAfwAOPFC8ADTjiOCoGggBAvWkQlUNAABYVRAYgeTRrAB4EYAAvkcAFiwYAAOw==");
        
        
        var tmp8 = mobl.ref(null);
        
        
        var tmp7 = mobl.ref(null);
        
        
        var tmp6 = mobl.ref(null);
        
        
        var tmp5 = mobl.ref(null);
        
        
        var tmp4 = mobl.ref(null);
        
        var nodes7 = $("<span>");
        root12.append(nodes7);
        subs__.addSub((mobl.ui.generic.image)(tmp2, tmp4, tmp5, tmp6, tmp7, tmp3, tmp8, function(_, callback) {
          var root14 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root14); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes7;
          nodes7 = node.contents();
          oldNodes.replaceWith(nodes7);
        }));
        callback(root12); return subs__;
        
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes5;
        nodes5 = node.contents();
        oldNodes.replaceWith(nodes5);
      }));
      
      
    }
  };
  renderCond0();
  subs__.addSub(value.addEventListener('change', function() {
    renderCond0();
  }));
  
  callback(root10); return subs__;
  
  return subs__;
};
mobl.ui.generic.headerStyle = 'mobl__ui__generic__headerStyle';
mobl.ui.generic.headerContainerStyle = 'mobl__ui__generic__headerContainerStyle';
mobl.ui.generic.headerTextStyle = 'mobl__ui__generic__headerTextStyle';

mobl.ui.generic.header = function(text, onclick, elements, callback) {
  var root15 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node7 = $("<div>");
  
  var ref11 = mobl.ref(mobl.ui.generic.headerStyle);
  if(ref11.get() !== null) {
    node7.attr('class', ref11.get());
    subs__.addSub(ref11.addEventListener('change', function(_, ref, val) {
      node7.attr('class', val);
    }));
    
  }
  subs__.addSub(ref11.rebind());
  
  var val5 = onclick.get();
  if(val5 !== null) {
    subs__.addSub(mobl.domBind(node7, 'tap', val5));
  }
  
  
  var node8 = $("<div>");
  
  var ref10 = mobl.ref(mobl.ui.generic.headerContainerStyle);
  if(ref10.get() !== null) {
    node8.attr('class', ref10.get());
    subs__.addSub(ref10.addEventListener('change', function(_, ref, val) {
      node8.attr('class', val);
    }));
    
  }
  subs__.addSub(ref10.rebind());
  
  
  var node9 = $("<div>");
  
  var ref8 = text;
  node9.text(""+ref8.get());
  var ignore1 = false;
  subs__.addSub(ref8.addEventListener('change', function(_, ref, val) {
    if(ignore1) return;
    node9.text(""+val);
  }));
  subs__.addSub(ref8.rebind());
  
  
  var ref9 = mobl.ref(mobl.ui.generic.headerTextStyle);
  if(ref9.get() !== null) {
    node9.attr('class', ref9.get());
    subs__.addSub(ref9.addEventListener('change', function(_, ref, val) {
      node9.attr('class', val);
    }));
    
  }
  subs__.addSub(ref9.rebind());
  
  node8.append(node9);
  node7.append(node8);
  var nodes8 = $("<span>");
  node7.append(nodes8);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl5();
  }));
  
  function renderControl5() {
    subs__.addSub((elements)(function(elements, callback) {
      var root16 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root16); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes8;
      nodes8 = node.contents();
      oldNodes.replaceWith(nodes8);
    }));
  }
  renderControl5();
  root15.append(node7);
  callback(root15); return subs__;
  
  
  
  
  return subs__;
};
mobl.ui.generic.buttonStyle = 'mobl__ui__generic__buttonStyle';
mobl.ui.generic.buttonPushedStyle = 'mobl__ui__generic__buttonPushedStyle';
mobl.ui.generic.buttonStyle = 'mobl__ui__generic__buttonStyle';
mobl.ui.generic.buttonPushedStyle = 'mobl__ui__generic__buttonPushedStyle';

mobl.ui.generic.button = function(text, style, pushedStyle, onclick, elements, callback) {
  var root17 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var pushed = mobl.ref(false);
  
  var sp = $("<span>");
  
  var ref12 = mobl.ref(pushed.get() ? pushedStyle.get() : style.get());
  if(ref12.get() !== null) {
    sp.attr('class', ref12.get());
    subs__.addSub(ref12.addEventListener('change', function(_, ref, val) {
      sp.attr('class', val);
    }));
    subs__.addSub(pushed.addEventListener('change', function() {
      sp.attr('class', pushed.get() ? pushedStyle.get() : style.get());
    }));
    subs__.addSub(pushedStyle.addEventListener('change', function() {
      sp.attr('class', pushed.get() ? pushedStyle.get() : style.get());
    }));
    subs__.addSub(style.addEventListener('change', function() {
      sp.attr('class', pushed.get() ? pushedStyle.get() : style.get());
    }));
    
  }
  subs__.addSub(ref12.rebind());
  
  var val6 = function(event, callback) {
                if(event && event.stopPropagation) event.stopPropagation();
                var result__ = event.preventDefault();
                var result__ = true;
                pushed.set(result__);
                if(callback && callback.apply) callback(); return;
              };
  if(val6 !== null) {
    subs__.addSub(mobl.domBind(sp, 'touchdown', val6));
  }
  
  var val7 = function(event, callback) {
                if(event && event.stopPropagation) event.stopPropagation();
                var result__ = event.y < 0 || event.y > sp.outerHeight() || event.x < 0 || event.x > sp.outerWidth();
                if(result__) {
                  var result__ = false;
                  pushed.set(result__);
                  if(callback && callback.apply) callback(); return;
                } else {
                  {
                    if(callback && callback.apply) callback(); return;
                  }
                }
              };
  if(val7 !== null) {
    subs__.addSub(mobl.domBind(sp, 'touchdrag', val7));
  }
  
  var val8 = function(event, callback) {
                if(event && event.stopPropagation) event.stopPropagation();
                var result__ = pushed.get();
                if(result__) {
                  var result__ = false;
                  pushed.set(result__);
                  function after0(result__) {
                    var tmp92 = result__;
                    if(callback && callback.apply) callback(); return;
                  }
                  var result__ = onclick.get()(event, after0);if(result__ !== undefined) after0(result__);
                } else {
                  {
                    if(callback && callback.apply) callback(); return;
                  }
                }
              };
  if(val8 !== null) {
    subs__.addSub(mobl.domBind(sp, 'touchup', val8));
  }
  
  var val9 = function(event, callback) {
                if(event && event.stopPropagation) event.stopPropagation();
                var result__ = pushed.get();
                if(result__) {
                  var result__ = false;
                  pushed.set(result__);
                  if(callback && callback.apply) callback(); return;
                } else {
                  {
                    if(callback && callback.apply) callback(); return;
                  }
                }
              };
  if(val9 !== null) {
    subs__.addSub(mobl.domBind(sp, 'mouseout', val9));
  }
  
  var ref13 = text;
  sp.text(""+ref13.get());
  var ignore2 = false;
  subs__.addSub(ref13.addEventListener('change', function(_, ref, val) {
    if(ignore2) return;
    sp.text(""+val);
  }));
  subs__.addSub(ref13.rebind());
  
  
  root17.append(sp);
  callback(root17); return subs__;
  
  return subs__;
};
mobl.ui.generic.sideButtonStyle = 'mobl__ui__generic__sideButtonStyle';
mobl.ui.generic.sideButtonPushedStyle = 'mobl__ui__generic__sideButtonPushedStyle';

mobl.ui.generic.sideButton = function(text, style, pushedStyle, onclick, elements, callback) {
  var root18 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes9 = $("<span>");
  root18.append(nodes9);
  subs__.addSub((mobl.ui.generic.button)(text, style, pushedStyle, onclick, function(_, callback) {
    var root19 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root19); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes9;
    nodes9 = node.contents();
    oldNodes.replaceWith(nodes9);
  }));
  callback(root18); return subs__;
  
  return subs__;
};
mobl.ui.generic.backButtonStyle = 'mobl__ui__generic__backButtonStyle';
mobl.ui.generic.backButtonPushedStyle = 'mobl__ui__generic__backButtonPushedStyle';
mobl.ui.generic.backButtonStyle = 'mobl__ui__generic__backButtonStyle';
mobl.ui.generic.backButtonPushedStyle = 'mobl__ui__generic__backButtonPushedStyle';

mobl.ui.generic.backButton = function(text, style, pushedStyle, onclick, elements, callback) {
  var root20 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes10 = $("<span>");
  root20.append(nodes10);
  subs__.addSub((mobl.ui.generic.button)(text, style, pushedStyle, onclick, function(_, callback) {
    var root21 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root21); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes10;
    nodes10 = node.contents();
    oldNodes.replaceWith(nodes10);
  }));
  callback(root20); return subs__;
  
  return subs__;
};
mobl.ui.generic.groupStyle = 'mobl__ui__generic__groupStyle';

mobl.ui.generic.group = function(elements, callback) {
  var root22 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node10 = $("<ul>");
  
  var ref14 = mobl.ref(mobl.ui.generic.groupStyle);
  if(ref14.get() !== null) {
    node10.attr('class', ref14.get());
    subs__.addSub(ref14.addEventListener('change', function(_, ref, val) {
      node10.attr('class', val);
    }));
    
  }
  subs__.addSub(ref14.rebind());
  
  var nodes11 = $("<span>");
  node10.append(nodes11);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl6();
  }));
  
  function renderControl6() {
    subs__.addSub((elements)(function(elements, callback) {
      var root23 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root23); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes11;
      nodes11 = node.contents();
      oldNodes.replaceWith(nodes11);
    }));
  }
  renderControl6();
  root22.append(node10);
  callback(root22); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.image = function(url, width, height, onclick, style, valign, align, elements, callback) {
  var root24 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node11 = $("<img>");
  
  var ref15 = url;
  if(ref15.get() !== null) {
    node11.attr('src', ref15.get());
    subs__.addSub(ref15.addEventListener('change', function(_, ref, val) {
      node11.attr('src', val);
    }));
    
  }
  subs__.addSub(ref15.rebind());
  
  var ref16 = width;
  if(ref16.get() !== null) {
    node11.attr('width', ref16.get());
    subs__.addSub(ref16.addEventListener('change', function(_, ref, val) {
      node11.attr('width', val);
    }));
    
  }
  subs__.addSub(ref16.rebind());
  
  var ref17 = height;
  if(ref17.get() !== null) {
    node11.attr('height', ref17.get());
    subs__.addSub(ref17.addEventListener('change', function(_, ref, val) {
      node11.attr('height', val);
    }));
    
  }
  subs__.addSub(ref17.rebind());
  
  var ref18 = style;
  if(ref18.get() !== null) {
    node11.attr('class', ref18.get());
    subs__.addSub(ref18.addEventListener('change', function(_, ref, val) {
      node11.attr('class', val);
    }));
    
  }
  subs__.addSub(ref18.rebind());
  
  var val10 = onclick.get();
  if(val10 !== null) {
    subs__.addSub(mobl.domBind(node11, 'tap', val10));
  }
  
  var ref19 = valign;
  if(ref19.get() !== null) {
    node11.attr('valign', ref19.get());
    subs__.addSub(ref19.addEventListener('change', function(_, ref, val) {
      node11.attr('valign', val);
    }));
    
  }
  subs__.addSub(ref19.rebind());
  
  var ref20 = align;
  if(ref20.get() !== null) {
    node11.attr('align', ref20.get());
    subs__.addSub(ref20.addEventListener('change', function(_, ref, val) {
      node11.attr('align', val);
    }));
    
  }
  subs__.addSub(ref20.rebind());
  
  root24.append(node11);
  callback(root24); return subs__;
  
  return subs__;
};
mobl.ui.generic.itemStyle = 'mobl__ui__generic__itemStyle';
mobl.ui.generic.itemPushedStyle = 'mobl__ui__generic__itemPushedStyle';
mobl.ui.generic.itemArrowStyle = 'mobl__ui__generic__itemArrowStyle';

mobl.ui.generic.item = function(style, pushedStyle, onclick, onswipe, hideArrow, elements, callback) {
  var root25 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var pushed = mobl.ref(false);
  
  var el = $("<li>");
  
  var ref21 = mobl.ref(mobl.ui.generic.itemStyle);
  if(ref21.get() !== null) {
    el.attr('class', ref21.get());
    subs__.addSub(ref21.addEventListener('change', function(_, ref, val) {
      el.attr('class', val);
    }));
    
  }
  subs__.addSub(ref21.rebind());
  
  var ref22 = mobl.ref(onclick.get() && hideArrow.get() == false ? mobl.mergeStyles([pushed.get() ? pushedStyle.get() : style.get(), mobl.ui.generic.itemArrowStyle]) : (pushed.get() ? pushedStyle.get() : style.get()));
  if(ref22.get() !== null) {
    el.attr('class', ref22.get());
    subs__.addSub(ref22.addEventListener('change', function(_, ref, val) {
      el.attr('class', val);
    }));
    subs__.addSub(onclick.addEventListener('change', function() {
      el.attr('class', onclick.get() && hideArrow.get() == false ? mobl.mergeStyles([pushed.get() ? pushedStyle.get() : style.get(), mobl.ui.generic.itemArrowStyle]) : (pushed.get() ? pushedStyle.get() : style.get()));
    }));
    subs__.addSub(hideArrow.addEventListener('change', function() {
      el.attr('class', onclick.get() && hideArrow.get() == false ? mobl.mergeStyles([pushed.get() ? pushedStyle.get() : style.get(), mobl.ui.generic.itemArrowStyle]) : (pushed.get() ? pushedStyle.get() : style.get()));
    }));
    subs__.addSub(mobl.ref(mobl.ui.generic.itemArrowStyle).addEventListener('change', function() {
      el.attr('class', onclick.get() && hideArrow.get() == false ? mobl.mergeStyles([pushed.get() ? pushedStyle.get() : style.get(), mobl.ui.generic.itemArrowStyle]) : (pushed.get() ? pushedStyle.get() : style.get()));
    }));
    subs__.addSub(pushed.addEventListener('change', function() {
      el.attr('class', onclick.get() && hideArrow.get() == false ? mobl.mergeStyles([pushed.get() ? pushedStyle.get() : style.get(), mobl.ui.generic.itemArrowStyle]) : (pushed.get() ? pushedStyle.get() : style.get()));
    }));
    subs__.addSub(pushedStyle.addEventListener('change', function() {
      el.attr('class', onclick.get() && hideArrow.get() == false ? mobl.mergeStyles([pushed.get() ? pushedStyle.get() : style.get(), mobl.ui.generic.itemArrowStyle]) : (pushed.get() ? pushedStyle.get() : style.get()));
    }));
    subs__.addSub(style.addEventListener('change', function() {
      el.attr('class', onclick.get() && hideArrow.get() == false ? mobl.mergeStyles([pushed.get() ? pushedStyle.get() : style.get(), mobl.ui.generic.itemArrowStyle]) : (pushed.get() ? pushedStyle.get() : style.get()));
    }));
    
  }
  subs__.addSub(ref22.rebind());
  
  var val11 = onswipe.get();
  if(val11 !== null) {
    subs__.addSub(mobl.domBind(el, 'swipe', val11));
  }
  
  var val12 = onclick.get() ? function(event, callback) {
                                         if(event && event.stopPropagation) event.stopPropagation();
                                         var result__ = true;
                                         pushed.set(result__);
                                         mobl.sleep(100, function(result__) {
                                           var tmp93 = result__;
                                           function after1(result__) {
                                             var tmp94 = result__;
                                             
                                           }
                                           var result__ = onclick.get()(event, after1);if(result__ !== undefined) after1(result__);
                                           mobl.sleep(200, function(result__) {
                                             var tmp95 = result__;
                                             var result__ = false;
                                             pushed.set(result__);
                                             if(callback && callback.apply) callback(); return;
                                           });
                                           
                                         });
                                       } : null;
  if(val12 !== null) {
    subs__.addSub(mobl.domBind(el, 'tap', val12));
  }
  
  var nodes12 = $("<span>");
  el.append(nodes12);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl7();
  }));
  
  function renderControl7() {
    subs__.addSub((elements)(function(elements, callback) {
      var root26 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root26); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes12;
      nodes12 = node.contents();
      oldNodes.replaceWith(nodes12);
    }));
  }
  renderControl7();
  root25.append(el);
  callback(root25); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.checkBox = function(b, label, onchange, elements, callback) {
  var root27 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node12 = $("<input>");
  node12.attr('type', "checkbox");
  
  var ref24 = b;
  node12.attr('checked', !!ref24.get());
  subs__.addSub(ref24.addEventListener('change', function(_, ref, val) {
    if(ref === ref24) node12.attr('checked', !!val);
  }));
  subs__.addSub(mobl.domBind(node12, 'change', function() {
    b.set(!!node12.attr('checked'));
  }));
  
  var val14 = function(event, callback) {
                if(event && event.stopPropagation) event.stopPropagation();
                if(callback && callback.apply) callback(); return;
              };
  if(val14 !== null) {
    subs__.addSub(mobl.domBind(node12, 'tap', val14));
  }
  
  var val15 = onchange.get();
  if(val15 !== null) {
    subs__.addSub(mobl.domBind(node12, 'change', val15));
  }
  
  root27.append(node12);
  
  root27.append(" ");
  
  var node13 = $("<span>");
  
  var ref23 = label;
  node13.text(""+ref23.get());
  var ignore3 = false;
  subs__.addSub(ref23.addEventListener('change', function(_, ref, val) {
    if(ignore3) return;
    node13.text(""+val);
  }));
  subs__.addSub(ref23.rebind());
  
  
  var val13 = function(event, callback) {
                if(event && event.stopPropagation) event.stopPropagation();
                var result__ = !b.get();
                b.set(result__);
                var result__ = onchange.get();
                if(result__) {
                  function after2(result__) {
                    var tmp96 = result__;
                    if(callback && callback.apply) callback(); return;
                  }
                  var result__ = onchange.get()(null, after2);if(result__ !== undefined) after2(result__);
                } else {
                  {
                    if(callback && callback.apply) callback(); return;
                  }
                }
              };
  if(val13 !== null) {
    subs__.addSub(mobl.domBind(node13, 'tap', val13));
  }
  
  root27.append(node13);
  callback(root27); return subs__;
  
  
  return subs__;
};
mobl.ui.generic.textFieldStyle = 'mobl__ui__generic__textFieldStyle';
mobl.ui.generic.textFieldInvalidStyle = 'mobl__ui__generic__textFieldInvalidStyle';
mobl.ui.generic.textFieldLabelStyle = 'mobl__ui__generic__textFieldLabelStyle';
mobl.ui.generic.validationMessageStyle = 'mobl__ui__generic__validationMessageStyle';
mobl.ui.generic.alwaysOkValidator = function(s) {
   var __this = this;
  return "";
};


mobl.ui.generic.textField = function(s, placeholder, label, validator, style, invalidStyle, onchange, onkeyup, elements, callback) {
  var root28 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node14 = $("<span>");
  root28.append(node14);
  var condSubs1 = new mobl.CompSubscription();
  subs__.addSub(condSubs1);
  var oldValue1;
  var renderCond1 = function() {
    var value11 = label.get();
    if(oldValue1 === value11) return;
    oldValue1 = value11;
    var subs__ = condSubs1;
    subs__.unsubscribe();
    node14.empty();
    if(value11) {
      
      var tmp13 = mobl.ref(null);
      
      var nodes13 = $("<span>");
      node14.append(nodes13);
      subs__.addSub((mobl.label)(label, mobl.ref(mobl.ui.generic.textFieldLabelStyle), tmp13, function(_, callback) {
        var root29 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root29); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes13;
        nodes13 = node.contents();
        oldNodes.replaceWith(nodes13);
      }));
      
      
    } else {
      
    }
  };
  renderCond1();
  subs__.addSub(label.addEventListener('change', function() {
    renderCond1();
  }));
  
  
  var node15 = $("<span>");
  root28.append(node15);
  var condSubs2 = new mobl.CompSubscription();
  subs__.addSub(condSubs2);
  var oldValue2;
  var renderCond2 = function() {
    var value12 = validator.get();
    if(oldValue2 === value12) return;
    oldValue2 = value12;
    var subs__ = condSubs2;
    subs__.unsubscribe();
    node15.empty();
    if(value12) {
      
      var temp = mobl.ref(s.get());
      
      var identifier = mobl.ref(mobl.random(999));
      function after6(result__) {
        var validationMessage = mobl.ref(result__);
        mobl.sleep(200, function(result__) {
          var tmp97 = result__;
          var result__ = mobl.setValidationError(identifier.get(), !validationMessage.get());
          
        });
        
        var node16 = $("<input>");
        node16.attr('type', "text");
        
        var ref25 = mobl.ref(validationMessage.get() ? invalidStyle.get() : style.get());
        if(ref25.get() !== null) {
          node16.attr('class', ref25.get());
          subs__.addSub(ref25.addEventListener('change', function(_, ref, val) {
            node16.attr('class', val);
          }));
          subs__.addSub(validationMessage.addEventListener('change', function() {
            node16.attr('class', validationMessage.get() ? invalidStyle.get() : style.get());
          }));
          subs__.addSub(invalidStyle.addEventListener('change', function() {
            node16.attr('class', validationMessage.get() ? invalidStyle.get() : style.get());
          }));
          subs__.addSub(style.addEventListener('change', function() {
            node16.attr('class', validationMessage.get() ? invalidStyle.get() : style.get());
          }));
          
        }
        subs__.addSub(ref25.rebind());
        
        var ref26 = placeholder;
        if(ref26.get() !== null) {
          node16.attr('placeholder', ref26.get());
          subs__.addSub(ref26.addEventListener('change', function(_, ref, val) {
            node16.attr('placeholder', val);
          }));
          
        }
        subs__.addSub(ref26.rebind());
        
        var ref27 = temp;
        node16.val(""+ref27.get());
        var ignore4 = false;
        subs__.addSub(ref27.addEventListener('change', function(_, ref, val) {
          if(ignore4) return;
          node16.val(""+val);
        }));
        subs__.addSub(ref27.rebind());
        
        subs__.addSub(mobl.domBind(node16, 'keyup change', function() {
          ignore4 = true;
          temp.set(mobl.stringTomobl__String(node16.val()));
          ignore4 = false;
        }));
        
        
        var val16 = onchange.get();
        if(val16 !== null) {
          subs__.addSub(mobl.domBind(node16, 'change', val16));
        }
        
        var val17 = function(event, callback) {
                      if(event && event.stopPropagation) event.stopPropagation();
                      var result__ = onkeyup.get();
                      if(result__) {
                        function after3(result__) {
                          var tmp98 = result__;
                          function after4(result__) {
                            var tmp99 = result__;
                            var result__ = tmp99;
                            validationMessage.set(result__);
                            var result__ = !validationMessage.get();
                            if(result__) {
                              var result__ = temp.get();
                              s.set(result__);
                              var result__ = mobl.setValidationError(identifier.get(), !validationMessage.get());
                              if(callback && callback.apply) callback(); return;
                            } else {
                              {
                                var result__ = mobl.setValidationError(identifier.get(), !validationMessage.get());
                                if(callback && callback.apply) callback(); return;
                              }
                            }
                          }
                          var result__ = validator.get()(temp.get(), after4);if(result__ !== undefined) after4(result__);
                        }
                        var result__ = onkeyup.get()(event, after3);if(result__ !== undefined) after3(result__);
                      } else {
                        {
                          function after5(result__) {
                            var tmp99 = result__;
                            var result__ = tmp99;
                            validationMessage.set(result__);
                            var result__ = !validationMessage.get();
                            if(result__) {
                              var result__ = temp.get();
                              s.set(result__);
                              var result__ = mobl.setValidationError(identifier.get(), !validationMessage.get());
                              if(callback && callback.apply) callback(); return;
                            } else {
                              {
                                var result__ = mobl.setValidationError(identifier.get(), !validationMessage.get());
                                if(callback && callback.apply) callback(); return;
                              }
                            }
                          }
                          var result__ = validator.get()(temp.get(), after5);if(result__ !== undefined) after5(result__);
                        }
                      }
                    };
        if(val17 !== null) {
          subs__.addSub(mobl.domBind(node16, 'keyup', val17));
        }
        
        var val18 = function(event, callback) {
                      if(event && event.stopPropagation) event.stopPropagation();
                      var result__ = mobl.ui.generic.scrollUp();
                      if(callback && callback.apply) callback(); return;
                    };
        if(val18 !== null) {
          subs__.addSub(mobl.domBind(node16, 'blur', val18));
        }
        
        node15.append(node16);
        
        var tmp14 = mobl.ref(null);
        
        var nodes14 = $("<span>");
        node15.append(nodes14);
        subs__.addSub((mobl.label)(validationMessage, mobl.ref(mobl.ui.generic.validationMessageStyle), tmp14, function(_, callback) {
          var root30 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root30); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes14;
          nodes14 = node.contents();
          oldNodes.replaceWith(nodes14);
        }));
        
        
        
        
      }
      var result__ = validator.get()(s.get(), after6);if(result__ !== undefined) after6(result__);
    } else {
      
      var node17 = $("<input>");
      node17.attr('type', "text");
      
      var ref28 = style;
      if(ref28.get() !== null) {
        node17.attr('class', ref28.get());
        subs__.addSub(ref28.addEventListener('change', function(_, ref, val) {
          node17.attr('class', val);
        }));
        
      }
      subs__.addSub(ref28.rebind());
      
      var ref29 = placeholder;
      if(ref29.get() !== null) {
        node17.attr('placeholder', ref29.get());
        subs__.addSub(ref29.addEventListener('change', function(_, ref, val) {
          node17.attr('placeholder', val);
        }));
        
      }
      subs__.addSub(ref29.rebind());
      
      var ref30 = s;
      node17.val(""+ref30.get());
      var ignore5 = false;
      subs__.addSub(ref30.addEventListener('change', function(_, ref, val) {
        if(ignore5) return;
        node17.val(""+val);
      }));
      subs__.addSub(ref30.rebind());
      
      subs__.addSub(mobl.domBind(node17, 'keyup change', function() {
        ignore5 = true;
        s.set(mobl.stringTomobl__String(node17.val()));
        ignore5 = false;
      }));
      
      
      var val19 = onchange.get();
      if(val19 !== null) {
        subs__.addSub(mobl.domBind(node17, 'change', val19));
      }
      
      var val20 = onkeyup.get();
      if(val20 !== null) {
        subs__.addSub(mobl.domBind(node17, 'keyup', val20));
      }
      
      var val21 = function(event, callback) {
                    if(event && event.stopPropagation) event.stopPropagation();
                    var result__ = mobl.ui.generic.scrollUp();
                    if(callback && callback.apply) callback(); return;
                  };
      if(val21 !== null) {
        subs__.addSub(mobl.domBind(node17, 'blur', val21));
      }
      
      node15.append(node17);
      
      
    }
  };
  renderCond2();
  subs__.addSub(validator.addEventListener('change', function() {
    renderCond2();
  }));
  
  callback(root28); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.emailField = function(s, placeholder, label, validator, style, invalidStyle, onchange, onkeyup, elements, callback) {
  var root31 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes15 = $("<span>");
  root31.append(nodes15);
  subs__.addSub((mobl.ui.generic.textField)(s, placeholder, label, validator, style, invalidStyle, onchange, onkeyup, function(_, callback) {
    var root32 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root32); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes15;
    nodes15 = node.contents();
    oldNodes.replaceWith(nodes15);
  }));
  callback(root31); return subs__;
  
  return subs__;
};
mobl.ui.generic.validateNum = function(n) {
   var __this = this;
  return mobl.Math.isNaN(n) ? mobl._("Not a valid numeric value", []) : "";
};


mobl.ui.generic.numField = function(n, label, placeholder, validator, style, invalidStyle, onchange, onkeyup, elements, callback) {
  var root33 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var validator2 = function(s, callback) {
    var __this = this;
    var result__ = mobl.parseNum(s);
    var n2 = result__;
    function after7(result__) {
      var tmp100 = result__;
      var result__ = tmp100;
      var m = result__;
      var result__ = !m;
      if(result__) {
        var result__ = n2;
        n.set(result__);
        var result__ = m;
        if(callback && callback.apply) callback(result__);
        return;
        if(callback && callback.apply) callback(); return;
      } else {
        {
          var result__ = m;
          if(callback && callback.apply) callback(result__);
          return;
          if(callback && callback.apply) callback(); return;
        }
      }
    }
    var result__ = validator.get()(n2, after7);if(result__ !== undefined) after7(result__);
  };
  
  
  
  var s = mobl.ref("" + n.get());
  var nodes16 = $("<span>");
  root33.append(nodes16);
  subs__.addSub((mobl.ui.generic.textField)(s, placeholder, label, mobl.ref(validator2), style, invalidStyle, onchange, onkeyup, function(_, callback) {
    var root34 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root34); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes16;
    nodes16 = node.contents();
    oldNodes.replaceWith(nodes16);
  }));
  callback(root33); return subs__;
  
  return subs__;
};

mobl.ui.generic.passwordField = function(s, placeholder, label, style, onchange, onkeyup, elements, callback) {
  var root35 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node18 = $("<span>");
  root35.append(node18);
  var condSubs3 = new mobl.CompSubscription();
  subs__.addSub(condSubs3);
  var oldValue3;
  var renderCond3 = function() {
    var value13 = label.get();
    if(oldValue3 === value13) return;
    oldValue3 = value13;
    var subs__ = condSubs3;
    subs__.unsubscribe();
    node18.empty();
    if(value13) {
      
      var node19 = $("<span>");
      node19.attr('style', "float: left; margin-top: 0.2em; width: 5em; color: #666;");
      
      var ref34 = label;
      node19.text(""+ref34.get());
      var ignore7 = false;
      subs__.addSub(ref34.addEventListener('change', function(_, ref, val) {
        if(ignore7) return;
        node19.text(""+val);
      }));
      subs__.addSub(ref34.rebind());
      
      
      node18.append(node19);
      
      var node20 = $("<span>");
      node20.attr('style', "float: left");
      
      
      var node21 = $("<input>");
      node21.attr('type', "password");
      
      var ref31 = style;
      if(ref31.get() !== null) {
        node21.attr('class', ref31.get());
        subs__.addSub(ref31.addEventListener('change', function(_, ref, val) {
          node21.attr('class', val);
        }));
        
      }
      subs__.addSub(ref31.rebind());
      
      var ref32 = placeholder;
      if(ref32.get() !== null) {
        node21.attr('placeholder', ref32.get());
        subs__.addSub(ref32.addEventListener('change', function(_, ref, val) {
          node21.attr('placeholder', val);
        }));
        
      }
      subs__.addSub(ref32.rebind());
      
      var ref33 = s;
      node21.val(""+ref33.get());
      var ignore6 = false;
      subs__.addSub(ref33.addEventListener('change', function(_, ref, val) {
        if(ignore6) return;
        node21.val(""+val);
      }));
      subs__.addSub(ref33.rebind());
      
      subs__.addSub(mobl.domBind(node21, 'keyup change', function() {
        ignore6 = true;
        s.set(mobl.stringTomobl__String(node21.val()));
        ignore6 = false;
      }));
      
      
      var val22 = onchange.get();
      if(val22 !== null) {
        subs__.addSub(mobl.domBind(node21, 'change', val22));
      }
      
      var val23 = onkeyup.get();
      if(val23 !== null) {
        subs__.addSub(mobl.domBind(node21, 'keyup', val23));
      }
      
      var val24 = function(event, callback) {
                    if(event && event.stopPropagation) event.stopPropagation();
                    var result__ = mobl.ui.generic.scrollUp();
                    if(callback && callback.apply) callback(); return;
                  };
      if(val24 !== null) {
        subs__.addSub(mobl.domBind(node21, 'blur', val24));
      }
      
      node20.append(node21);
      node18.append(node20);
      
      
      
      
    } else {
      
      var node22 = $("<input>");
      node22.attr('type', "password");
      
      var ref35 = style;
      if(ref35.get() !== null) {
        node22.attr('class', ref35.get());
        subs__.addSub(ref35.addEventListener('change', function(_, ref, val) {
          node22.attr('class', val);
        }));
        
      }
      subs__.addSub(ref35.rebind());
      
      var ref36 = placeholder;
      if(ref36.get() !== null) {
        node22.attr('placeholder', ref36.get());
        subs__.addSub(ref36.addEventListener('change', function(_, ref, val) {
          node22.attr('placeholder', val);
        }));
        
      }
      subs__.addSub(ref36.rebind());
      
      var ref37 = s;
      node22.val(""+ref37.get());
      var ignore8 = false;
      subs__.addSub(ref37.addEventListener('change', function(_, ref, val) {
        if(ignore8) return;
        node22.val(""+val);
      }));
      subs__.addSub(ref37.rebind());
      
      subs__.addSub(mobl.domBind(node22, 'keyup change', function() {
        ignore8 = true;
        s.set(mobl.stringTomobl__String(node22.val()));
        ignore8 = false;
      }));
      
      
      var val25 = onchange.get();
      if(val25 !== null) {
        subs__.addSub(mobl.domBind(node22, 'change', val25));
      }
      
      var val26 = onkeyup.get();
      if(val26 !== null) {
        subs__.addSub(mobl.domBind(node22, 'keyup', val26));
      }
      
      var val27 = function(event, callback) {
                    if(event && event.stopPropagation) event.stopPropagation();
                    var result__ = mobl.ui.generic.scrollUp();
                    if(callback && callback.apply) callback(); return;
                  };
      if(val27 !== null) {
        subs__.addSub(mobl.domBind(node22, 'blur', val27));
      }
      
      node18.append(node22);
      
      
    }
  };
  renderCond3();
  subs__.addSub(label.addEventListener('change', function() {
    renderCond3();
  }));
  
  callback(root35); return subs__;
  
  return subs__;
};
mobl.ui.generic.selectFieldStyle = 'mobl__ui__generic__selectFieldStyle';

mobl.ui.generic.selectField = function(value, options, onchange, style, optionStyle, elements, callback) {
  var root36 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var sel = $("<select>");
  
  var ref42 = style;
  if(ref42.get() !== null) {
    sel.attr('class', ref42.get());
    subs__.addSub(ref42.addEventListener('change', function(_, ref, val) {
      sel.attr('class', val);
    }));
    
  }
  subs__.addSub(ref42.rebind());
  
  var val28 = function(event, callback) {
                if(event && event.stopPropagation) event.stopPropagation();
                var result__ = sel.val();
                value.set(result__);
                var result__ = onchange.get();
                if(result__) {
                  function after8(result__) {
                    var tmp102 = result__;
                    if(callback && callback.apply) callback(); return;
                  }
                  var result__ = onchange.get()(event, after8);if(result__ !== undefined) after8(result__);
                } else {
                  {
                    if(callback && callback.apply) callback(); return;
                  }
                }
              };
  if(val28 !== null) {
    subs__.addSub(mobl.domBind(sel, 'change', val28));
  }
  
  
  var node23 = mobl.loadingSpan();
  sel.append(node23);
  var list0;
  var listSubs__ = new mobl.CompSubscription();
  subs__.addSub(listSubs__);
  var renderList0 = function() {
    var subs__ = listSubs__;
    list0 = options.get();
    list0.list(function(results0) {
      node23.empty();
      for(var i0 = 0; i0 < results0.length; i0++) {
        (function() {
          var iternode0 = $("<span>");
          node23.append(iternode0);
          var optionValue;var optionDescription;
          optionValue = mobl.ref(mobl.ref(mobl.ref(results0), i0), "_1");optionDescription = mobl.ref(mobl.ref(mobl.ref(results0), i0), "_2");
          
          var node24 = $("<option>");
          
          var ref38 = optionDescription;
          node24.text(""+ref38.get());
          var ignore9 = false;
          subs__.addSub(ref38.addEventListener('change', function(_, ref, val) {
            if(ignore9) return;
            node24.text(""+val);
          }));
          subs__.addSub(ref38.rebind());
          
          
          var ref39 = optionStyle;
          if(ref39.get() !== null) {
            node24.attr('class', ref39.get());
            subs__.addSub(ref39.addEventListener('change', function(_, ref, val) {
              node24.attr('class', val);
            }));
            
          }
          subs__.addSub(ref39.rebind());
          
          var ref40 = optionValue;
          if(ref40.get() !== null) {
            node24.attr('value', ref40.get());
            subs__.addSub(ref40.addEventListener('change', function(_, ref, val) {
              node24.attr('value', val);
            }));
            
          }
          subs__.addSub(ref40.rebind());
          
          var ref41 = mobl.ref(value.get() == optionValue.get() ? "selected" : "");
          if(ref41.get() !== null) {
            node24.attr('selected', ref41.get());
            subs__.addSub(ref41.addEventListener('change', function(_, ref, val) {
              node24.attr('selected', val);
            }));
            subs__.addSub(value.addEventListener('change', function() {
              node24.attr('selected', value.get() == optionValue.get() ? "selected" : "");
            }));
            subs__.addSub(optionValue.addEventListener('change', function() {
              node24.attr('selected', value.get() == optionValue.get() ? "selected" : "");
            }));
            
          }
          subs__.addSub(ref41.rebind());
          
          iternode0.append(node24);
          
          var oldNodes = iternode0;
          iternode0 = iternode0.contents();
          oldNodes.replaceWith(iternode0);
          
          
        }());
      }
      mobl.delayedUpdateScrollers();
      subs__.addSub(list0.addEventListener('change', function() { listSubs__.unsubscribe(); renderList0(true); }));
      subs__.addSub(options.addEventListener('change', function() { listSubs__.unsubscribe(); renderList0(true); }));
    });
  };
  renderList0();
  
  root36.append(sel);
  var result__ = sel.append(sel.children().eq(0).children());
  callback(root36); return subs__;
  
  
  return subs__;
};
mobl.ui.generic.tabbarStyle = 'mobl__ui__generic__tabbarStyle';
mobl.ui.generic.inActiveTabButtonStyle = 'mobl__ui__generic__inActiveTabButtonStyle';
mobl.ui.generic.activeTabButtonStyle = 'mobl__ui__generic__activeTabButtonStyle';
mobl.ui.generic.inActiveTabStyle = 'mobl__ui__generic__inActiveTabStyle';
mobl.ui.generic.activeTabStyle = 'mobl__ui__generic__activeTabStyle';

mobl.ui.generic.tabSet = function(tabs, elements, callback) {
  var root37 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var activeTabName = mobl.ref(tabs.get().get(0)._1);
  
  var s = mobl.ref("");
  
  var tmp24 = mobl.ref(null);
  
  
  var tmp23 = mobl.ref(null);
  
  
  var tmp22 = mobl.ref(null);
  
  var nodes17 = $("<span>");
  root37.append(nodes17);
  subs__.addSub((mobl.block)(mobl.ref(mobl.ui.generic.tabbarStyle), tmp22, tmp23, tmp24, function(_, callback) {
    var root38 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var node25 = mobl.loadingSpan();
    root38.append(node25);
    var list1;
    var listSubs__ = new mobl.CompSubscription();
    subs__.addSub(listSubs__);
    var renderList1 = function() {
      var subs__ = listSubs__;
      list1 = tabs.get();
      list1.list(function(results1) {
        node25.empty();
        for(var i1 = 0; i1 < results1.length; i1++) {
          (function() {
            var iternode1 = $("<span>");
            node25.append(iternode1);
            var tabName;var tabIcon;var tabControl;
            tabName = mobl.ref(mobl.ref(mobl.ref(results1), i1), "_1");tabIcon = mobl.ref(mobl.ref(mobl.ref(results1), i1), "_2");tabControl = mobl.ref(mobl.ref(mobl.ref(results1), i1), "_3");
            
            var tmp18 = mobl.ref(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
            subs__.addSub(activeTabName.addEventListener('change', function() {
              tmp18.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
            }));
            subs__.addSub(tabName.addEventListener('change', function() {
              tmp18.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.activeTabButtonStyle).addEventListener('change', function() {
              tmp18.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.inActiveTabButtonStyle).addEventListener('change', function() {
              tmp18.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
            }));
            
            
            var tmp17 = mobl.ref(function(event, callback) {
                                 if(event && event.stopPropagation) event.stopPropagation();
                                 var result__ = tabName.get();
                                 activeTabName.set(result__);
                                 if(callback && callback.apply) callback(); return;
                               });
            
            
            var tmp21 = mobl.ref(null);
            
            
            var tmp19 = mobl.ref(null);
            
            var nodes18 = $("<span>");
            iternode1.append(nodes18);
            subs__.addSub((mobl.span)(tmp18, tmp19, tmp17, tmp21, function(_, callback) {
              var root39 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              
              var tmp16 = mobl.ref(null);
              
              
              var tmp15 = mobl.ref(null);
              
              var nodes19 = $("<span>");
              root39.append(nodes19);
              subs__.addSub((mobl.label)(tabName, tmp15, tmp16, function(_, callback) {
                var root40 = $("<span>");
                var subs__ = new mobl.CompSubscription();
                callback(root40); return subs__;
                return subs__;
              }, function(node) {
                var oldNodes = nodes19;
                nodes19 = node.contents();
                oldNodes.replaceWith(nodes19);
              }));
              callback(root39); return subs__;
              
              return subs__;
            }, function(node) {
              var oldNodes = nodes18;
              nodes18 = node.contents();
              oldNodes.replaceWith(nodes18);
            }));
            
            var oldNodes = iternode1;
            iternode1 = iternode1.contents();
            oldNodes.replaceWith(iternode1);
            
            
          }());
        }
        mobl.delayedUpdateScrollers();
        subs__.addSub(list1.addEventListener('change', function() { listSubs__.unsubscribe(); renderList1(true); }));
        subs__.addSub(tabs.addEventListener('change', function() { listSubs__.unsubscribe(); renderList1(true); }));
      });
    };
    renderList1();
    
    callback(root38); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes17;
    nodes17 = node.contents();
    oldNodes.replaceWith(nodes17);
  }));
  
  var node26 = mobl.loadingSpan();
  root37.append(node26);
  var list2;
  var listSubs__ = new mobl.CompSubscription();
  subs__.addSub(listSubs__);
  var renderList2 = function() {
    var subs__ = listSubs__;
    list2 = tabs.get();
    list2.list(function(results2) {
      node26.empty();
      for(var i2 = 0; i2 < results2.length; i2++) {
        (function() {
          var iternode2 = $("<span>");
          node26.append(iternode2);
          var tabName;var tabIcon;var tabControl;
          tabName = mobl.ref(mobl.ref(mobl.ref(results2), i2), "_1");tabIcon = mobl.ref(mobl.ref(mobl.ref(results2), i2), "_2");tabControl = mobl.ref(mobl.ref(mobl.ref(results2), i2), "_3");
          
          var tmp25 = mobl.ref(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
          subs__.addSub(activeTabName.addEventListener('change', function() {
            tmp25.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
          }));
          subs__.addSub(tabName.addEventListener('change', function() {
            tmp25.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
          }));
          subs__.addSub(mobl.ref(mobl.ui.generic.activeTabStyle).addEventListener('change', function() {
            tmp25.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
          }));
          subs__.addSub(mobl.ref(mobl.ui.generic.inActiveTabStyle).addEventListener('change', function() {
            tmp25.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
          }));
          
          
          var tmp28 = mobl.ref(null);
          
          
          var tmp27 = mobl.ref(null);
          
          
          var tmp26 = mobl.ref(null);
          
          var nodes20 = $("<span>");
          iternode2.append(nodes20);
          subs__.addSub((mobl.block)(tmp25, tmp26, tmp27, tmp28, function(_, callback) {
            var root41 = $("<span>");
            var subs__ = new mobl.CompSubscription();
            var nodes21 = $("<span>");
            root41.append(nodes21);
            subs__.addSub((mobl.screenContext)(function(_, callback) {
              var root42 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              var nodes22 = $("<span>");
              root42.append(nodes22);
              subs__.addSub(tabControl.addEventListener('change', function() {
                renderControl8();
              }));
              
              function renderControl8() {
                subs__.addSub((tabControl.get())(function(elements, callback) {
                  var root43 = $("<span>");
                  var subs__ = new mobl.CompSubscription();
                  callback(root43); return subs__;
                  return subs__;
                }, function(node) {
                  var oldNodes = nodes22;
                  nodes22 = node.contents();
                  oldNodes.replaceWith(nodes22);
                }));
              }
              renderControl8();
              callback(root42); return subs__;
              
              return subs__;
            }, function(node) {
              var oldNodes = nodes21;
              nodes21 = node.contents();
              oldNodes.replaceWith(nodes21);
            }));
            callback(root41); return subs__;
            
            return subs__;
          }, function(node) {
            var oldNodes = nodes20;
            nodes20 = node.contents();
            oldNodes.replaceWith(nodes20);
          }));
          
          var oldNodes = iternode2;
          iternode2 = iternode2.contents();
          oldNodes.replaceWith(iternode2);
          
          
        }());
      }
      mobl.delayedUpdateScrollers();
      subs__.addSub(list2.addEventListener('change', function() { listSubs__.unsubscribe(); renderList2(true); }));
      subs__.addSub(tabs.addEventListener('change', function() { listSubs__.unsubscribe(); renderList2(true); }));
    });
  };
  renderList2();
  
  callback(root37); return subs__;
  
  
  return subs__;
};
mobl.ui.generic.searchboxStyle = 'mobl__ui__generic__searchboxStyle';
mobl.ui.generic.searchBoxInputStyle = 'mobl__ui__generic__searchBoxInputStyle';

mobl.ui.generic.searchBox = function(s, placeholder, onsearch, onkeyup, elements, callback) {
  var root44 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node27 = $("<div>");
  
  var ref46 = mobl.ref(mobl.ui.generic.searchboxStyle);
  if(ref46.get() !== null) {
    node27.attr('class', ref46.get());
    subs__.addSub(ref46.addEventListener('change', function(_, ref, val) {
      node27.attr('class', val);
    }));
    
  }
  subs__.addSub(ref46.rebind());
  
  
  var node28 = $("<input>");
  node28.attr('type', "search");
  
  var ref43 = mobl.ref(mobl.ui.generic.searchBoxInputStyle);
  if(ref43.get() !== null) {
    node28.attr('class', ref43.get());
    subs__.addSub(ref43.addEventListener('change', function(_, ref, val) {
      node28.attr('class', val);
    }));
    
  }
  subs__.addSub(ref43.rebind());
  
  var ref44 = placeholder;
  if(ref44.get() !== null) {
    node28.attr('placeholder', ref44.get());
    subs__.addSub(ref44.addEventListener('change', function(_, ref, val) {
      node28.attr('placeholder', val);
    }));
    
  }
  subs__.addSub(ref44.rebind());
  
  var ref45 = s;
  node28.val(""+ref45.get());
  var ignore10 = false;
  subs__.addSub(ref45.addEventListener('change', function(_, ref, val) {
    if(ignore10) return;
    node28.val(""+val);
  }));
  subs__.addSub(ref45.rebind());
  
  subs__.addSub(mobl.domBind(node28, 'keyup change', function() {
    ignore10 = true;
    s.set(mobl.stringTomobl__String(node28.val()));
    ignore10 = false;
  }));
  
  
  var val29 = onsearch.get();
  if(val29 !== null) {
    subs__.addSub(mobl.domBind(node28, 'change', val29));
  }
  
  var val30 = onkeyup.get();
  if(val30 !== null) {
    subs__.addSub(mobl.domBind(node28, 'keyup', val30));
  }
  node28.attr('autocorrect', false);
  node28.attr('autocapitalize', false);
  node28.attr('autocomplete', false);
  
  node27.append(node28);
  root44.append(node27);
  callback(root44); return subs__;
  
  
  return subs__;
};
mobl.ui.generic.contextMenuStyle = 'mobl__ui__generic__contextMenuStyle';
mobl.ui.generic.buttonStyle = 'mobl__ui__generic__buttonStyle';
mobl.ui.generic.buttonPushedStyle = 'mobl__ui__generic__buttonPushedStyle';

mobl.ui.generic.contextMenu = function(elements, callback) {
  var root45 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var menu = $("<div>");
  
  var ref47 = mobl.ref(mobl.ui.generic.contextMenuStyle);
  if(ref47.get() !== null) {
    menu.attr('class', ref47.get());
    subs__.addSub(ref47.addEventListener('change', function(_, ref, val) {
      menu.attr('class', val);
    }));
    
  }
  subs__.addSub(ref47.rebind());
  
  var nodes23 = $("<span>");
  menu.append(nodes23);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl9();
  }));
  
  function renderControl9() {
    subs__.addSub((elements)(function(elements, callback) {
      var root46 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root46); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes23;
      nodes23 = node.contents();
      oldNodes.replaceWith(nodes23);
    }));
  }
  renderControl9();
  root45.append(menu);
  var result__ = menu.hide();
  
  var img = $("<img>");
  img.attr('src', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA0AAAANABeWPPlAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEuSURBVDiNrdSrTkNBEMbx35aLIhUNEl4CsCSkmgfBoOoJz0B4BhSSBEcQSMA3GBJE34Br6CA6heWUA4huMuLszvc/c9stEaG5Sil97GADm7l9g1tcRsTFjCgiPg09nCDSxhimjav9E/S+aSvINkbpeIU+utV5N/eu0meE7W+gjGSEFwzQqf/WiLqTPi+p6dWgaTqDNsAPwME0zWmd+1U6rZG0RDZNs9/J7sBBRIxnutGy0vcgP3cWTVocuC6lLGD9H5z3iHjAdWo3ZMGGVchHvtrcZnuV/zAZM6CCUzz9AHjGYaNWn6Azk2GrZ2YJlw3YI44bkG5qzzomY1+wVRXyDbu4w2sCz7HfqNVWam/5pf1YxX2eLf/W/j8HEmtY+XMg53pF5nZp5/GMlHk9bB8Ws56C3JDK8wAAAABJRU5ErkJggg==");
  img.attr('style', "float: right;");
  
  var val31 = function(event, callback) {
                if(event && event.stopPropagation) event.stopPropagation();
                var result__ = img.parent();
                var target = result__;
                var result__ = target.css("position", "relative");
                var result__ = img.hide();
                var result__ = menu.css("right", "5px");
                var result__ = menu.css("top", "5px");
                var result__ = menu.show();
                mobl.sleep(500, function(result__) {
                  var tmp105 = result__;
                  var result__ = mobl.$("body").bind("tap", removeMenu);
                  if(callback && callback.apply) callback(); return;
                });
              };
  if(val31 !== null) {
    subs__.addSub(mobl.domBind(img, 'tap', val31));
  }
  
  root45.append(img);
  
  var removeMenu = function(evt) {
     var __this = this;
    menu.hide();
    img.show();
    mobl.$("body").unbind("tap", removeMenu);
  };
  
  
  callback(root45); return subs__;
  
  
  
  return subs__;
};

mobl.ui.generic.masterDetail = function(items, masterItem, detail, elements, callback) {
  var root47 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp91 = mobl.ref(mobl.window.get().innerWidth > 500);
  subs__.addSub(mobl.ref(mobl.window, 'innerWidth').addEventListener('change', function() {
    tmp91.set(mobl.window.get().innerWidth > 500);
  }));
  
  
  var node29 = $("<span>");
  root47.append(node29);
  var condSubs4 = new mobl.CompSubscription();
  subs__.addSub(condSubs4);
  var oldValue4;
  var renderCond4 = function() {
    var value14 = tmp91.get();
    if(oldValue4 === value14) return;
    oldValue4 = value14;
    var subs__ = condSubs4;
    subs__.unsubscribe();
    node29.empty();
    if(value14) {
      items.get().one(function(result__) {
        var current = mobl.ref(result__);
        
        var node30 = $("<div>");
        node30.attr('width', "100%");
        
        
        var node31 = $("<div>");
        node31.attr('style', "float:left; width:33%; position:relative; border-right: solid 1px #cccccc;");
        
        var nodes26 = $("<span>");
        node31.append(nodes26);
        subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
          var root50 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          
          var node34 = mobl.loadingSpan();
          root50.append(node34);
          var list3;
          var listSubs__ = new mobl.CompSubscription();
          subs__.addSub(listSubs__);
          var renderList3 = function() {
            var subs__ = listSubs__;
            list3 = items.get();
            list3.list(function(results3) {
              node34.empty();
              for(var i3 = 0; i3 < results3.length; i3++) {
                (function() {
                  var iternode3 = $("<span>");
                  node34.append(iternode3);
                  var it;
                  it = mobl.ref(mobl.ref(results3), i3);
                  
                  var tmp44 = mobl.ref(it.get() == current.get());
                  subs__.addSub(it.addEventListener('change', function() {
                    tmp44.set(it.get() == current.get());
                  }));
                  subs__.addSub(current.addEventListener('change', function() {
                    tmp44.set(it.get() == current.get());
                  }));
                  
                  
                  var node35 = $("<span>");
                  iternode3.append(node35);
                  var condSubs6 = new mobl.CompSubscription();
                  subs__.addSub(condSubs6);
                  var oldValue6;
                  var renderCond6 = function() {
                    var value16 = tmp44.get();
                    if(oldValue6 === value16) return;
                    oldValue6 = value16;
                    var subs__ = condSubs6;
                    subs__.unsubscribe();
                    node35.empty();
                    if(value16) {
                      
                      var tmp39 = mobl.ref(false);
                      
                      
                      var tmp38 = mobl.ref(null);
                      
                      
                      var tmp37 = mobl.ref(null);
                      
                      var nodes27 = $("<span>");
                      node35.append(nodes27);
                      subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.selectedItemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp37, tmp38, tmp39, function(_, callback) {
                        var root51 = $("<span>");
                        var subs__ = new mobl.CompSubscription();
                        var nodes28 = $("<span>");
                        root51.append(nodes28);
                        subs__.addSub(masterItem.addEventListener('change', function() {
                          renderControl11();
                        }));
                        
                        function renderControl11() {
                          subs__.addSub((masterItem.get())(it, function(elements, callback) {
                            var root52 = $("<span>");
                            var subs__ = new mobl.CompSubscription();
                            callback(root52); return subs__;
                            return subs__;
                          }, function(node) {
                            var oldNodes = nodes28;
                            nodes28 = node.contents();
                            oldNodes.replaceWith(nodes28);
                          }));
                        }
                        renderControl11();
                        callback(root51); return subs__;
                        
                        return subs__;
                      }, function(node) {
                        var oldNodes = nodes27;
                        nodes27 = node.contents();
                        oldNodes.replaceWith(nodes27);
                      }));
                      
                      
                    } else {
                      
                      var tmp42 = mobl.ref(function(event, callback) {
                                           if(event && event.stopPropagation) event.stopPropagation();
                                           var result__ = it.get();
                                           current.set(result__);
                                           var result__ = mobl.ui.generic.scrollUp();
                                           if(callback && callback.apply) callback(); return;
                                         });
                      
                      
                      var tmp41 = mobl.ref(true);
                      
                      
                      var tmp43 = mobl.ref(null);
                      
                      var nodes29 = $("<span>");
                      node35.append(nodes29);
                      subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp42, tmp43, tmp41, function(_, callback) {
                        var root53 = $("<span>");
                        var subs__ = new mobl.CompSubscription();
                        var nodes30 = $("<span>");
                        root53.append(nodes30);
                        subs__.addSub(masterItem.addEventListener('change', function() {
                          renderControl12();
                        }));
                        
                        function renderControl12() {
                          subs__.addSub((masterItem.get())(it, function(elements, callback) {
                            var root54 = $("<span>");
                            var subs__ = new mobl.CompSubscription();
                            callback(root54); return subs__;
                            return subs__;
                          }, function(node) {
                            var oldNodes = nodes30;
                            nodes30 = node.contents();
                            oldNodes.replaceWith(nodes30);
                          }));
                        }
                        renderControl12();
                        callback(root53); return subs__;
                        
                        return subs__;
                      }, function(node) {
                        var oldNodes = nodes29;
                        nodes29 = node.contents();
                        oldNodes.replaceWith(nodes29);
                      }));
                      
                      
                    }
                  };
                  renderCond6();
                  subs__.addSub(tmp44.addEventListener('change', function() {
                    renderCond6();
                  }));
                  
                  
                  var oldNodes = iternode3;
                  iternode3 = iternode3.contents();
                  oldNodes.replaceWith(iternode3);
                  
                  
                }());
              }
              mobl.delayedUpdateScrollers();
              subs__.addSub(list3.addEventListener('change', function() { listSubs__.unsubscribe(); renderList3(true); }));
              subs__.addSub(items.addEventListener('change', function() { listSubs__.unsubscribe(); renderList3(true); }));
            });
          };
          renderList3();
          
          callback(root50); return subs__;
          
          return subs__;
        }, function(node) {
          var oldNodes = nodes26;
          nodes26 = node.contents();
          oldNodes.replaceWith(nodes26);
        }));
        node30.append(node31);
        
        var node32 = $("<div>");
        node32.attr('style', "float:left; width:66.5%; position:relative; margin-left: 0.5%;");
        
        
        var node33 = $("<span>");
        node32.append(node33);
        var condSubs5 = new mobl.CompSubscription();
        subs__.addSub(condSubs5);
        var oldValue5;
        var renderCond5 = function() {
          var value15 = current.get();
          if(oldValue5 === value15) return;
          oldValue5 = value15;
          var subs__ = condSubs5;
          subs__.unsubscribe();
          node33.empty();
          if(value15) {
            var nodes24 = $("<span>");
            node33.append(nodes24);
            subs__.addSub(detail.addEventListener('change', function() {
              renderControl10();
            }));
            
            function renderControl10() {
              subs__.addSub((detail.get())(current, function(elements, callback) {
                var root48 = $("<span>");
                var subs__ = new mobl.CompSubscription();
                callback(root48); return subs__;
                return subs__;
              }, function(node) {
                var oldNodes = nodes24;
                nodes24 = node.contents();
                oldNodes.replaceWith(nodes24);
              }));
            }
            renderControl10();
            
            
          } else {
            
            var tmp45 = mobl.ref(mobl._("Select an item on the left", []));
            
            
            var tmp47 = mobl.ref(null);
            
            
            var tmp46 = mobl.ref(null);
            
            var nodes25 = $("<span>");
            node33.append(nodes25);
            subs__.addSub((mobl.label)(tmp45, tmp46, tmp47, function(_, callback) {
              var root49 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              callback(root49); return subs__;
              return subs__;
            }, function(node) {
              var oldNodes = nodes25;
              nodes25 = node.contents();
              oldNodes.replaceWith(nodes25);
            }));
            
            
          }
        };
        renderCond5();
        subs__.addSub(current.addEventListener('change', function() {
          renderCond5();
        }));
        
        node30.append(node32);
        node29.append(node30);
        
        
        
        
        
        
      });
    } else {
      var nodes31 = $("<span>");
      node29.append(nodes31);
      subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
        var root55 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var node36 = mobl.loadingSpan();
        root55.append(node36);
        var list4;
        var listSubs__ = new mobl.CompSubscription();
        subs__.addSub(listSubs__);
        var renderList4 = function() {
          var subs__ = listSubs__;
          list4 = items.get();
          list4.list(function(results4) {
            node36.empty();
            for(var i4 = 0; i4 < results4.length; i4++) {
              (function() {
                var iternode4 = $("<span>");
                node36.append(iternode4);
                var it;
                it = mobl.ref(mobl.ref(results4), i4);
                
                var tmp29 = mobl.ref(function(event, callback) {
                                     if(event && event.stopPropagation) event.stopPropagation();
                                     mobl.call('mobl.ui.generic.detailScreen', [it, detail, mobl.ref(false), mobl.ref("slide")], function(result__) {
                                     var tmp106 = result__;
                                     if(callback && callback.apply) callback(); return;
                                     });
                                   });
                
                
                var tmp32 = mobl.ref(false);
                
                
                var tmp31 = mobl.ref(null);
                
                var nodes32 = $("<span>");
                iternode4.append(nodes32);
                subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp29, tmp31, tmp32, function(_, callback) {
                  var root56 = $("<span>");
                  var subs__ = new mobl.CompSubscription();
                  var nodes33 = $("<span>");
                  root56.append(nodes33);
                  subs__.addSub(masterItem.addEventListener('change', function() {
                    renderControl13();
                  }));
                  
                  function renderControl13() {
                    subs__.addSub((masterItem.get())(it, function(elements, callback) {
                      var root57 = $("<span>");
                      var subs__ = new mobl.CompSubscription();
                      callback(root57); return subs__;
                      return subs__;
                    }, function(node) {
                      var oldNodes = nodes33;
                      nodes33 = node.contents();
                      oldNodes.replaceWith(nodes33);
                    }));
                  }
                  renderControl13();
                  callback(root56); return subs__;
                  
                  return subs__;
                }, function(node) {
                  var oldNodes = nodes32;
                  nodes32 = node.contents();
                  oldNodes.replaceWith(nodes32);
                }));
                
                var oldNodes = iternode4;
                iternode4 = iternode4.contents();
                oldNodes.replaceWith(iternode4);
                
                
              }());
            }
            mobl.delayedUpdateScrollers();
            subs__.addSub(list4.addEventListener('change', function() { listSubs__.unsubscribe(); renderList4(true); }));
            subs__.addSub(items.addEventListener('change', function() { listSubs__.unsubscribe(); renderList4(true); }));
          });
        };
        renderList4();
        
        callback(root55); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes31;
        nodes31 = node.contents();
        oldNodes.replaceWith(nodes31);
      }));
      
      
    }
  };
  renderCond4();
  subs__.addSub(tmp91.addEventListener('change', function() {
    renderCond4();
  }));
  
  callback(root47); return subs__;
  
  return subs__;
};

mobl.ui.generic.detailScreen = function(it, detail, callback, screenCallback) {
  var root58 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp35 = mobl.ref("Detail");
  
  
  var tmp36 = mobl.ref(null);
  
  var nodes34 = $("<span>");
  root58.append(nodes34);
  subs__.addSub((mobl.ui.generic.header)(tmp35, tmp36, function(_, callback) {
    var root59 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp34 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    
    var tmp33 = mobl.ref("Back");
    
    var nodes35 = $("<span>");
    root59.append(nodes35);
    subs__.addSub((mobl.ui.generic.backButton)(tmp33, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp34, function(_, callback) {
      var root60 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root60); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes35;
      nodes35 = node.contents();
      oldNodes.replaceWith(nodes35);
    }));
    callback(root59); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes34;
    nodes34 = node.contents();
    oldNodes.replaceWith(nodes34);
  }));
  var nodes36 = $("<span>");
  root58.append(nodes36);
  subs__.addSub(detail.addEventListener('change', function() {
    renderControl14();
  }));
  
  function renderControl14() {
    subs__.addSub((detail.get())(it, function(elements, callback) {
      var root61 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root61); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes36;
      nodes36 = node.contents();
      oldNodes.replaceWith(nodes36);
    }));
  }
  renderControl14();
  callback(root58); return subs__;
  
  
  return subs__;
};
mobl.ui.generic.selectedItemStyle = 'mobl__ui__generic__selectedItemStyle';

mobl.ui.generic.zoomList = function(coll, listCtrl, zoomCtrl, elements, callback) {
  var root62 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var selected = mobl.ref(null);
  var nodes37 = $("<span>");
  root62.append(nodes37);
  subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
    var root63 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var node37 = mobl.loadingSpan();
    root63.append(node37);
    var list5;
    var listSubs__ = new mobl.CompSubscription();
    subs__.addSub(listSubs__);
    var renderList5 = function() {
      var subs__ = listSubs__;
      list5 = coll.get();
      list5.list(function(results5) {
        node37.empty();
        for(var i5 = 0; i5 < results5.length; i5++) {
          (function() {
            var iternode5 = $("<span>");
            node37.append(iternode5);
            var it;
            it = mobl.ref(mobl.ref(results5), i5);
            
            var tmp55 = mobl.ref(it.get() == selected.get());
            subs__.addSub(it.addEventListener('change', function() {
              tmp55.set(it.get() == selected.get());
            }));
            subs__.addSub(selected.addEventListener('change', function() {
              tmp55.set(it.get() == selected.get());
            }));
            
            
            var node38 = $("<span>");
            iternode5.append(node38);
            var condSubs7 = new mobl.CompSubscription();
            subs__.addSub(condSubs7);
            var oldValue7;
            var renderCond7 = function() {
              var value17 = tmp55.get();
              if(oldValue7 === value17) return;
              oldValue7 = value17;
              var subs__ = condSubs7;
              subs__.unsubscribe();
              node38.empty();
              if(value17) {
                
                var tmp51 = mobl.ref(false);
                
                
                var tmp49 = mobl.ref(null);
                
                
                var tmp48 = mobl.ref(null);
                
                var nodes38 = $("<span>");
                node38.append(nodes38);
                subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp48, tmp49, tmp51, function(_, callback) {
                  var root64 = $("<span>");
                  var subs__ = new mobl.CompSubscription();
                  var nodes39 = $("<span>");
                  root64.append(nodes39);
                  subs__.addSub(zoomCtrl.addEventListener('change', function() {
                    renderControl15();
                  }));
                  
                  function renderControl15() {
                    subs__.addSub((zoomCtrl.get())(it, function(elements, callback) {
                      var root65 = $("<span>");
                      var subs__ = new mobl.CompSubscription();
                      callback(root65); return subs__;
                      return subs__;
                    }, function(node) {
                      var oldNodes = nodes39;
                      nodes39 = node.contents();
                      oldNodes.replaceWith(nodes39);
                    }));
                  }
                  renderControl15();
                  callback(root64); return subs__;
                  
                  return subs__;
                }, function(node) {
                  var oldNodes = nodes38;
                  nodes38 = node.contents();
                  oldNodes.replaceWith(nodes38);
                }));
                
                
              } else {
                
                var tmp53 = mobl.ref(true);
                
                
                var tmp52 = mobl.ref(function(event, callback) {
                                     if(event && event.stopPropagation) event.stopPropagation();
                                     var result__ = it.get();
                                     selected.set(result__);
                                     if(callback && callback.apply) callback(); return;
                                   });
                
                
                var tmp54 = mobl.ref(null);
                
                var nodes40 = $("<span>");
                node38.append(nodes40);
                subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp52, tmp54, tmp53, function(_, callback) {
                  var root66 = $("<span>");
                  var subs__ = new mobl.CompSubscription();
                  var nodes41 = $("<span>");
                  root66.append(nodes41);
                  subs__.addSub(listCtrl.addEventListener('change', function() {
                    renderControl16();
                  }));
                  
                  function renderControl16() {
                    subs__.addSub((listCtrl.get())(it, function(elements, callback) {
                      var root67 = $("<span>");
                      var subs__ = new mobl.CompSubscription();
                      callback(root67); return subs__;
                      return subs__;
                    }, function(node) {
                      var oldNodes = nodes41;
                      nodes41 = node.contents();
                      oldNodes.replaceWith(nodes41);
                    }));
                  }
                  renderControl16();
                  callback(root66); return subs__;
                  
                  return subs__;
                }, function(node) {
                  var oldNodes = nodes40;
                  nodes40 = node.contents();
                  oldNodes.replaceWith(nodes40);
                }));
                
                
              }
            };
            renderCond7();
            subs__.addSub(tmp55.addEventListener('change', function() {
              renderCond7();
            }));
            
            
            var oldNodes = iternode5;
            iternode5 = iternode5.contents();
            oldNodes.replaceWith(iternode5);
            
            
          }());
        }
        mobl.delayedUpdateScrollers();
        subs__.addSub(list5.addEventListener('change', function() { listSubs__.unsubscribe(); renderList5(true); }));
        subs__.addSub(coll.addEventListener('change', function() { listSubs__.unsubscribe(); renderList5(true); }));
      });
    };
    renderList5();
    
    callback(root63); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes37;
    nodes37 = node.contents();
    oldNodes.replaceWith(nodes37);
  }));
  callback(root62); return subs__;
  
  return subs__;
};
mobl.ui.generic.loadMoreStyle = 'mobl__ui__generic__loadMoreStyle';

mobl.ui.generic.stagedList = function(coll, listCtrl, initialItems, step, moreLabel, elements, callback) {
  var root68 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var n = mobl.ref(initialItems.get());
  coll.get().count(function(result__) {
    var total = mobl.ref(result__);
    var nodes42 = $("<span>");
    root68.append(nodes42);
    subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
      var root69 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp59 = mobl.ref(coll.get().limit(n.get()));
      subs__.addSub(mobl.ref(coll.get().limit(n.get())).addEventListener('change', function() {
        tmp59.set(coll.get().limit(n.get()));
      }));
      subs__.addSub(coll.addEventListener('change', function() {
        tmp59.set(coll.get().limit(n.get()));
      }));
      subs__.addSub(n.addEventListener('change', function() {
        tmp59.set(coll.get().limit(n.get()));
      }));
      
      
      var node39 = mobl.loadingSpan();
      root69.append(node39);
      var list6;
      var listSubs__ = new mobl.CompSubscription();
      subs__.addSub(listSubs__);
      var renderList6 = function() {
        var subs__ = listSubs__;
        list6 = tmp59.get();
        list6.list(function(results6) {
          node39.empty();
          for(var i6 = 0; i6 < results6.length; i6++) {
            (function() {
              var iternode6 = $("<span>");
              node39.append(iternode6);
              var it;
              it = mobl.ref(mobl.ref(results6), i6);
              
              var tmp56 = mobl.ref(function(event, callback) {
                                   if(event && event.stopPropagation) event.stopPropagation();
                                   if(callback && callback.apply) callback(); return;
                                 });
              
              
              var tmp58 = mobl.ref(false);
              
              
              var tmp57 = mobl.ref(null);
              
              var nodes43 = $("<span>");
              iternode6.append(nodes43);
              subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp56, tmp57, tmp58, function(_, callback) {
                var root70 = $("<span>");
                var subs__ = new mobl.CompSubscription();
                var nodes44 = $("<span>");
                root70.append(nodes44);
                subs__.addSub(listCtrl.addEventListener('change', function() {
                  renderControl17();
                }));
                
                function renderControl17() {
                  subs__.addSub((listCtrl.get())(it, function(elements, callback) {
                    var root71 = $("<span>");
                    var subs__ = new mobl.CompSubscription();
                    callback(root71); return subs__;
                    return subs__;
                  }, function(node) {
                    var oldNodes = nodes44;
                    nodes44 = node.contents();
                    oldNodes.replaceWith(nodes44);
                  }));
                }
                renderControl17();
                callback(root70); return subs__;
                
                return subs__;
              }, function(node) {
                var oldNodes = nodes43;
                nodes43 = node.contents();
                oldNodes.replaceWith(nodes43);
              }));
              
              var oldNodes = iternode6;
              iternode6 = iternode6.contents();
              oldNodes.replaceWith(iternode6);
              
              
            }());
          }
          mobl.delayedUpdateScrollers();
          subs__.addSub(list6.addEventListener('change', function() { listSubs__.unsubscribe(); renderList6(true); }));
          subs__.addSub(tmp59.addEventListener('change', function() { listSubs__.unsubscribe(); renderList6(true); }));
        });
      };
      renderList6();
      
      
      var tmp63 = mobl.ref(n.get() < total.get());
      subs__.addSub(n.addEventListener('change', function() {
        tmp63.set(n.get() < total.get());
      }));
      subs__.addSub(total.addEventListener('change', function() {
        tmp63.set(n.get() < total.get());
      }));
      
      
      var node40 = $("<span>");
      root69.append(node40);
      var condSubs8 = new mobl.CompSubscription();
      subs__.addSub(condSubs8);
      var oldValue8;
      var renderCond8 = function() {
        var value18 = tmp63.get();
        if(oldValue8 === value18) return;
        oldValue8 = value18;
        var subs__ = condSubs8;
        subs__.unsubscribe();
        node40.empty();
        if(value18) {
          
          var node41 = $("<li>");
          
          var ref48 = mobl.ref(mobl.ui.generic.loadMoreStyle);
          if(ref48.get() !== null) {
            node41.attr('class', ref48.get());
            subs__.addSub(ref48.addEventListener('change', function(_, ref, val) {
              node41.attr('class', val);
            }));
            
          }
          subs__.addSub(ref48.rebind());
          
          var val32 = function(event, callback) {
                        if(event && event.stopPropagation) event.stopPropagation();
                        var result__ = n.get() + step.get();
                        n.set(result__);
                        if(callback && callback.apply) callback(); return;
                      };
          if(val32 !== null) {
            subs__.addSub(mobl.domBind(node41, 'tap', val32));
          }
          
          
          var tmp62 = mobl.ref(null);
          
          
          var tmp61 = mobl.ref(null);
          
          var nodes45 = $("<span>");
          node41.append(nodes45);
          subs__.addSub((mobl.label)(moreLabel, tmp61, tmp62, function(_, callback) {
            var root72 = $("<span>");
            var subs__ = new mobl.CompSubscription();
            callback(root72); return subs__;
            return subs__;
          }, function(node) {
            var oldNodes = nodes45;
            nodes45 = node.contents();
            oldNodes.replaceWith(nodes45);
          }));
          node40.append(node41);
          
          
          
        } else {
          
        }
      };
      renderCond8();
      subs__.addSub(tmp63.addEventListener('change', function() {
        renderCond8();
      }));
      
      callback(root69); return subs__;
      
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes42;
      nodes42 = node.contents();
      oldNodes.replaceWith(nodes42);
    }));
    callback(root68); return subs__;
    
  });
  return subs__;
};

mobl.ui.generic.markableList = function(items, elements, callback) {
  var root73 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes46 = $("<span>");
  root73.append(nodes46);
  subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
    var root74 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var node42 = mobl.loadingSpan();
    root74.append(node42);
    var list7;
    var listSubs__ = new mobl.CompSubscription();
    subs__.addSub(listSubs__);
    var renderList7 = function() {
      var subs__ = listSubs__;
      list7 = items.get();
      list7.list(function(results7) {
        node42.empty();
        for(var i7 = 0; i7 < results7.length; i7++) {
          (function() {
            var iternode7 = $("<span>");
            node42.append(iternode7);
            var checked;var it;
            checked = mobl.ref(mobl.ref(mobl.ref(results7), i7), "_1");it = mobl.ref(mobl.ref(mobl.ref(results7), i7), "_2");
            
            var tmp67 = mobl.ref(false);
            
            
            var tmp66 = mobl.ref(null);
            
            
            var tmp65 = mobl.ref(null);
            
            var nodes47 = $("<span>");
            iternode7.append(nodes47);
            subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp65, tmp66, tmp67, function(_, callback) {
              var root75 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              
              var tmp64 = mobl.ref(null);
              
              var nodes48 = $("<span>");
              root75.append(nodes48);
              subs__.addSub((mobl.ui.generic.checkBox)(checked, it, tmp64, function(_, callback) {
                var root76 = $("<span>");
                var subs__ = new mobl.CompSubscription();
                callback(root76); return subs__;
                return subs__;
              }, function(node) {
                var oldNodes = nodes48;
                nodes48 = node.contents();
                oldNodes.replaceWith(nodes48);
              }));
              callback(root75); return subs__;
              
              return subs__;
            }, function(node) {
              var oldNodes = nodes47;
              nodes47 = node.contents();
              oldNodes.replaceWith(nodes47);
            }));
            
            var oldNodes = iternode7;
            iternode7 = iternode7.contents();
            oldNodes.replaceWith(iternode7);
            
            
          }());
        }
        mobl.delayedUpdateScrollers();
        subs__.addSub(list7.addEventListener('change', function() { listSubs__.unsubscribe(); renderList7(true); }));
        subs__.addSub(items.addEventListener('change', function() { listSubs__.unsubscribe(); renderList7(true); }));
      });
    };
    renderList7();
    
    callback(root74); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes46;
    nodes46 = node.contents();
    oldNodes.replaceWith(nodes46);
  }));
  callback(root73); return subs__;
  
  return subs__;
};

mobl.ui.generic.selectList = function(title, coll, doneButtonLabel, callback, screenCallback) {
  var root77 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var items = mobl.ref([]);
  var result__ = coll.get();
  coll.get().list(function(coll16) {
    coll16 = coll16.reverse();
    function processOne1() {
      var it;
      it = coll16.pop();
      var result__ = items.get().push(new mobl.Tuple(false, it));
      
      if(coll16.length > 0) processOne1(); else rest1();
      
    }
    function rest1() {
      
      var tmp72 = mobl.ref(null);
      
      var nodes49 = $("<span>");
      root77.append(nodes49);
      subs__.addSub((mobl.ui.generic.header)(title, tmp72, function(_, callback) {
        var root78 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp68 = mobl.ref(function(event, callback) {
                             if(event && event.stopPropagation) event.stopPropagation();
                             var result__ = null;
                             if(callback && callback.apply) callback(result__);
                             return;
                             if(callback && callback.apply) callback(); return;
                           });
        
        
        var tmp69 = mobl.ref(mobl._("Back", []));
        
        var nodes50 = $("<span>");
        root78.append(nodes50);
        subs__.addSub((mobl.ui.generic.backButton)(tmp69, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp68, function(_, callback) {
          var root79 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root79); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes50;
          nodes50 = node.contents();
          oldNodes.replaceWith(nodes50);
        }));
        
        var tmp71 = mobl.ref(function(event, callback) {
                             if(event && event.stopPropagation) event.stopPropagation();
                             var result__ = [];
                             var selected = result__;
                             var result__ = items.get();
                             items.get().list(function(coll15) {
                               coll15 = coll15.reverse();
                               function processOne0() {
                                 var checked;var it;
                                 var tmp108 = coll15.pop();
                                 checked = tmp108._1;it = tmp108._2;
                                 var result__ = checked;
                                 if(result__) {
                                   var result__ = selected.push(it);
                                   
                                   if(coll15.length > 0) processOne0(); else rest0();
                                   
                                 } else {
                                   {
                                     
                                     if(coll15.length > 0) processOne0(); else rest0();
                                     
                                   }
                                 }
                               }
                               function rest0() {
                                 var result__ = selected;
                                 if(screenCallback) screenCallback(result__);
                                 return;
                                 if(callback && callback.apply) callback(); return;
                               }
                               if(coll15.length > 0) processOne0(); else rest0();
                             });
                             
                           });
        
        var nodes51 = $("<span>");
        root78.append(nodes51);
        subs__.addSub((mobl.ui.generic.button)(doneButtonLabel, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp71, function(_, callback) {
          var root80 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root80); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes51;
          nodes51 = node.contents();
          oldNodes.replaceWith(nodes51);
        }));
        callback(root78); return subs__;
        
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes49;
        nodes49 = node.contents();
        oldNodes.replaceWith(nodes49);
      }));
      var nodes52 = $("<span>");
      root77.append(nodes52);
      subs__.addSub((mobl.ui.generic.markableList)(items, function(_, callback) {
        var root81 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root81); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes52;
        nodes52 = node.contents();
        oldNodes.replaceWith(nodes52);
      }));
      callback(root77); return subs__;
      
      
    }
    if(coll16.length > 0) processOne1(); else rest1();
  });
  
  return subs__;
};

mobl.ui.generic.searchList = function(Ent, masterItem, detailItem, resultLimit, searchTermPlaceholder, elements, callback) {
  var root82 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var phrase = mobl.ref("");
  
  var tmp74 = mobl.ref(null);
  
  
  var tmp73 = mobl.ref(null);
  
  var nodes53 = $("<span>");
  root82.append(nodes53);
  subs__.addSub((mobl.ui.generic.searchBox)(phrase, searchTermPlaceholder, tmp73, tmp74, function(_, callback) {
    var root83 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root83); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes53;
    nodes53 = node.contents();
    oldNodes.replaceWith(nodes53);
  }));
  
  var tmp75 = mobl.ref(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  subs__.addSub(mobl.ref(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get())).addEventListener('change', function() {
    tmp75.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  subs__.addSub(mobl.ref(Ent.get().searchPrefix(phrase.get())).addEventListener('change', function() {
    tmp75.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  subs__.addSub(Ent.addEventListener('change', function() {
    tmp75.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  subs__.addSub(phrase.addEventListener('change', function() {
    tmp75.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  subs__.addSub(resultLimit.addEventListener('change', function() {
    tmp75.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  
  var nodes54 = $("<span>");
  root82.append(nodes54);
  subs__.addSub((mobl.ui.generic.masterDetail)(tmp75, masterItem, detailItem, function(_, callback) {
    var root84 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root84); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes54;
    nodes54 = node.contents();
    oldNodes.replaceWith(nodes54);
  }));
  callback(root82); return subs__;
  
  
  return subs__;
};
mobl.ui.generic.progressStyle = 'mobl__ui__generic__progressStyle';
mobl.ui.generic.startLoading = function(loadingMessage, style) {
   var __this = this;
  var loading = mobl.$("<div id='progress' class='" + style + "'>" + loadingMessage + "</div>");
  
  mobl.$("body").prepend(loading);
};

mobl.ui.generic.endLoading = function() {
   var __this = this;
  mobl.$("#progress").remove();
};

(function(__ns) {
__ns.floatBox = function(top, right, bottom, left, elements, callback) {
                  var root928 = $("<span>");
                  var node280 = $("<div style=\"position: absolute;\">");
                  var nodes681 = $("<span>");
                  node280.append(nodes681);
                  mobl.ref(elements).addEventListener('change', function() {
                                                                  renderControl102();
                                                                });
                  function renderControl102 ( ) {
                    (elements)(function(elements, callback) {
                                 var root929 = $("<span>");
                                 callback(root929);
                                 return;
                               }, function(node) {
                                    var oldNodes = nodes681;
                                    nodes681 = node.contents();
                                    oldNodes.replaceWith(nodes681);
                                  });
                  }
                  renderControl102();
                  root928.append(node280);
                  var box = node280;
                  if(top.get() !== null)
                  box.css("top", "" + top.get() + "px");
                  if(right.get() !== null)
                  box.css("right", "" + right.get() + "px");
                  if(bottom.get() !== null)
                  box.css("top", "" + ( window.pageYOffset + window.innerHeight - box.outerHeight() - bottom.get() ) + "px");
                  if(left.get() !== null)
                  box.css("left", "" + left.get() + "px");
                  function updateLocation ( ) {
                    if(top.get() !== null)
                    {
                      box.css("top", "" + ( window.pageYOffset + top.get() ) + "px");
                    }
                    if(bottom.get() !== null)
                    {
                      box.css("top", "" + ( window.pageYOffset + window.innerHeight - box.outerHeight() - bottom.get() ) + "px");
                    }
                  }
                  $(window).bind('scroll', updateLocation);
                  $(window).bind('resize', updateLocation);
                  callback(root928);
                  return;
                };
}(mobl.ui.generic));mobl.ui.generic.accordionStyle = 'mobl__ui__generic__accordionStyle';
mobl.ui.generic.activeSectionHeaderStyle = 'mobl__ui__generic__activeSectionHeaderStyle';
mobl.ui.generic.inActiveSectionHeaderStyle = 'mobl__ui__generic__inActiveSectionHeaderStyle';
mobl.ui.generic.activeSectionHeaderStyle = 'mobl__ui__generic__activeSectionHeaderStyle';
mobl.ui.generic.inActiveSectionHeaderStyle = 'mobl__ui__generic__inActiveSectionHeaderStyle';
mobl.ui.generic.inActiveSectionStyle = 'mobl__ui__generic__inActiveSectionStyle';
mobl.ui.generic.activeSectionStyle = 'mobl__ui__generic__activeSectionStyle';

mobl.ui.generic.accordion = function(sections, elements, callback) {
  var root85 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var activeSection = mobl.ref(sections.get().get(0)._1);
  
  var tmp89 = mobl.ref(null);
  
  
  var tmp88 = mobl.ref(null);
  
  
  var tmp87 = mobl.ref(null);
  
  var nodes55 = $("<span>");
  root85.append(nodes55);
  subs__.addSub((mobl.block)(mobl.ref(mobl.ui.generic.accordionStyle), tmp87, tmp88, tmp89, function(_, callback) {
    var root86 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var node43 = mobl.loadingSpan();
    root86.append(node43);
    var list8;
    var listSubs__ = new mobl.CompSubscription();
    subs__.addSub(listSubs__);
    var renderList8 = function() {
      var subs__ = listSubs__;
      list8 = sections.get();
      list8.list(function(results8) {
        node43.empty();
        for(var i8 = 0; i8 < results8.length; i8++) {
          (function() {
            var iternode8 = $("<span>");
            node43.append(iternode8);
            var sectionName;var sectionControl;
            sectionName = mobl.ref(mobl.ref(mobl.ref(results8), i8), "_1");sectionControl = mobl.ref(mobl.ref(mobl.ref(results8), i8), "_2");
            
            var tmp79 = mobl.ref(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            subs__.addSub(activeSection.addEventListener('change', function() {
              tmp79.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            }));
            subs__.addSub(sectionName.addEventListener('change', function() {
              tmp79.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.activeSectionHeaderStyle).addEventListener('change', function() {
              tmp79.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.inActiveSectionHeaderStyle).addEventListener('change', function() {
              tmp79.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            }));
            
            
            var tmp78 = mobl.ref(function(event, callback) {
                                 if(event && event.stopPropagation) event.stopPropagation();
                                 var result__ = sectionName.get();
                                 activeSection.set(result__);
                                 if(callback && callback.apply) callback(); return;
                               });
            
            
            var tmp82 = mobl.ref(null);
            
            
            var tmp81 = mobl.ref(null);
            
            var nodes56 = $("<span>");
            iternode8.append(nodes56);
            subs__.addSub((mobl.span)(tmp79, tmp81, tmp78, tmp82, function(_, callback) {
              var root87 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              
              var tmp77 = mobl.ref(null);
              
              
              var tmp76 = mobl.ref(null);
              
              var nodes57 = $("<span>");
              root87.append(nodes57);
              subs__.addSub((mobl.label)(sectionName, tmp76, tmp77, function(_, callback) {
                var root88 = $("<span>");
                var subs__ = new mobl.CompSubscription();
                callback(root88); return subs__;
                return subs__;
              }, function(node) {
                var oldNodes = nodes57;
                nodes57 = node.contents();
                oldNodes.replaceWith(nodes57);
              }));
              callback(root87); return subs__;
              
              return subs__;
            }, function(node) {
              var oldNodes = nodes56;
              nodes56 = node.contents();
              oldNodes.replaceWith(nodes56);
            }));
            
            var tmp83 = mobl.ref(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            subs__.addSub(activeSection.addEventListener('change', function() {
              tmp83.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            }));
            subs__.addSub(sectionName.addEventListener('change', function() {
              tmp83.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.activeSectionStyle).addEventListener('change', function() {
              tmp83.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.inActiveSectionStyle).addEventListener('change', function() {
              tmp83.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            }));
            
            
            var tmp86 = mobl.ref(null);
            
            
            var tmp85 = mobl.ref(null);
            
            
            var tmp84 = mobl.ref(null);
            
            var nodes58 = $("<span>");
            iternode8.append(nodes58);
            subs__.addSub((mobl.block)(tmp83, tmp84, tmp85, tmp86, function(_, callback) {
              var root89 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              var nodes59 = $("<span>");
              root89.append(nodes59);
              subs__.addSub(sectionControl.addEventListener('change', function() {
                renderControl18();
              }));
              
              function renderControl18() {
                subs__.addSub((sectionControl.get())(function(elements, callback) {
                  var root90 = $("<span>");
                  var subs__ = new mobl.CompSubscription();
                  callback(root90); return subs__;
                  return subs__;
                }, function(node) {
                  var oldNodes = nodes59;
                  nodes59 = node.contents();
                  oldNodes.replaceWith(nodes59);
                }));
              }
              renderControl18();
              callback(root89); return subs__;
              
              return subs__;
            }, function(node) {
              var oldNodes = nodes58;
              nodes58 = node.contents();
              oldNodes.replaceWith(nodes58);
            }));
            
            var oldNodes = iternode8;
            iternode8 = iternode8.contents();
            oldNodes.replaceWith(iternode8);
            
            
            
          }());
        }
        mobl.delayedUpdateScrollers();
        subs__.addSub(list8.addEventListener('change', function() { listSubs__.unsubscribe(); renderList8(true); }));
        subs__.addSub(sections.addEventListener('change', function() { listSubs__.unsubscribe(); renderList8(true); }));
      });
    };
    renderList8();
    
    callback(root86); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes55;
    nodes55 = node.contents();
    oldNodes.replaceWith(nodes55);
  }));
  callback(root85); return subs__;
  
  return subs__;
};
mobl.ui.generic.tableStyle = 'mobl__ui__generic__tableStyle';
mobl.ui.generic.tdStyle = 'mobl__ui__generic__tdStyle';
mobl.ui.generic.trStyle = 'mobl__ui__generic__trStyle';
mobl.ui.generic.trStyle = 'mobl__ui__generic__trStyle';
mobl.ui.generic.trStyle = 'mobl__ui__generic__trStyle';
mobl.ui.generic.tdStyle = 'mobl__ui__generic__tdStyle';
mobl.ui.generic.tdStyle = 'mobl__ui__generic__tdStyle';
mobl.ui.generic.tdStyle = 'mobl__ui__generic__tdStyle';
mobl.ui.generic.tdStyle = 'mobl__ui__generic__tdStyle';
mobl.ui.generic.tdStyle = 'mobl__ui__generic__tdStyle';
mobl.ui.generic.tdStyle = 'mobl__ui__generic__tdStyle';

mobl.ui.generic.table = function(elements, callback) {
  var root91 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node44 = $("<table>");
  
  var ref49 = mobl.ref(mobl.ui.generic.tableStyle);
  if(ref49.get() !== null) {
    node44.attr('class', ref49.get());
    subs__.addSub(ref49.addEventListener('change', function(_, ref, val) {
      node44.attr('class', val);
    }));
    
  }
  subs__.addSub(ref49.rebind());
  
  var nodes60 = $("<span>");
  node44.append(nodes60);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl19();
  }));
  
  function renderControl19() {
    subs__.addSub((elements)(function(elements, callback) {
      var root92 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root92); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes60;
      nodes60 = node.contents();
      oldNodes.replaceWith(nodes60);
    }));
  }
  renderControl19();
  root91.append(node44);
  callback(root91); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.row = function(elements, callback) {
  var root93 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node45 = $("<tr>");
  
  var ref50 = mobl.ref(mobl.ui.generic.trStyle);
  if(ref50.get() !== null) {
    node45.attr('class', ref50.get());
    subs__.addSub(ref50.addEventListener('change', function(_, ref, val) {
      node45.attr('class', val);
    }));
    
  }
  subs__.addSub(ref50.rebind());
  
  var nodes61 = $("<span>");
  node45.append(nodes61);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl20();
  }));
  
  function renderControl20() {
    subs__.addSub((elements)(function(elements, callback) {
      var root94 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root94); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes61;
      nodes61 = node.contents();
      oldNodes.replaceWith(nodes61);
    }));
  }
  renderControl20();
  root93.append(node45);
  callback(root93); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.cell = function(width, elements, callback) {
  var root95 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node46 = $("<td>");
  
  var ref51 = width;
  if(ref51.get() !== null) {
    node46.attr('width', ref51.get());
    subs__.addSub(ref51.addEventListener('change', function(_, ref, val) {
      node46.attr('width', val);
    }));
    
  }
  subs__.addSub(ref51.rebind());
  
  var ref52 = mobl.ref(mobl.ui.generic.tdStyle);
  if(ref52.get() !== null) {
    node46.attr('class', ref52.get());
    subs__.addSub(ref52.addEventListener('change', function(_, ref, val) {
      node46.attr('class', val);
    }));
    
  }
  subs__.addSub(ref52.rebind());
  
  var nodes62 = $("<span>");
  node46.append(nodes62);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl21();
  }));
  
  function renderControl21() {
    subs__.addSub((elements)(function(elements, callback) {
      var root96 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root96); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes62;
      nodes62 = node.contents();
      oldNodes.replaceWith(nodes62);
    }));
  }
  renderControl21();
  root95.append(node46);
  callback(root95); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.col = function(width, elements, callback) {
  var root97 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node47 = $("<td>");
  
  var ref53 = width;
  if(ref53.get() !== null) {
    node47.attr('width', ref53.get());
    subs__.addSub(ref53.addEventListener('change', function(_, ref, val) {
      node47.attr('width', val);
    }));
    
  }
  subs__.addSub(ref53.rebind());
  
  var ref54 = mobl.ref(mobl.ui.generic.tdStyle);
  if(ref54.get() !== null) {
    node47.attr('class', ref54.get());
    subs__.addSub(ref54.addEventListener('change', function(_, ref, val) {
      node47.attr('class', val);
    }));
    
  }
  subs__.addSub(ref54.rebind());
  
  var nodes63 = $("<span>");
  node47.append(nodes63);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl22();
  }));
  
  function renderControl22() {
    subs__.addSub((elements)(function(elements, callback) {
      var root98 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root98); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes63;
      nodes63 = node.contents();
      oldNodes.replaceWith(nodes63);
    }));
  }
  renderControl22();
  root97.append(node47);
  callback(root97); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.headerCol = function(width, elements, callback) {
  var root99 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node48 = $("<td>");
  
  var ref55 = width;
  if(ref55.get() !== null) {
    node48.attr('width', ref55.get());
    subs__.addSub(ref55.addEventListener('change', function(_, ref, val) {
      node48.attr('width', val);
    }));
    
  }
  subs__.addSub(ref55.rebind());
  
  var ref56 = mobl.ref(mobl.ui.generic.tdStyle);
  if(ref56.get() !== null) {
    node48.attr('class', ref56.get());
    subs__.addSub(ref56.addEventListener('change', function(_, ref, val) {
      node48.attr('class', val);
    }));
    
  }
  subs__.addSub(ref56.rebind());
  
  
  var node49 = $("<strong>");
  
  var nodes64 = $("<span>");
  node49.append(nodes64);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl23();
  }));
  
  function renderControl23() {
    subs__.addSub((elements)(function(elements, callback) {
      var root100 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root100); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes64;
      nodes64 = node.contents();
      oldNodes.replaceWith(nodes64);
    }));
  }
  renderControl23();
  node48.append(node49);
  root99.append(node48);
  callback(root99); return subs__;
  
  
  
  return subs__;
};
(function(__ns) {
setTimeout(function() {
             scrollTo(0, -1);
           }, 250);
__ns.scrollUp = function() {
                  scrollTo(0, 0);
                };
__ns.setupScrollers = function() {
                        setTimeout(function() {
                                     var allScrollers = $("div.scroller");
                                     for(var i = 0; i < allScrollers.length; i++)
                                     {
                                       var scroller = allScrollers.eq(i);
                                       if(!scroller.data("scroller"))
                                       {
                                         scroller.data("scroller", new TouchScroll(scroller[0],{
                                                                                                 elastic: true
                                                                                               }));
                                       }
                                     }
                                   }, 250);
                      };
}(mobl.ui.generic));

mobl.provides('mobl.ui.stylemixin');


/**
 * You can identify a swipe gesture as follows: 1. Begin gesture if you receive
 * a touchstart event containing one target touch. 2. Abort gesture if, at any
 * time, you receive an event with >1 touches. 3. Continue gesture if you
 * receive a touchmove event mostly in the x-direction. 4. Abort gesture if you
 * receive a touchmove event mostly the y-direction. 5. End gesture if you
 * receive a touchend event.
 *
 * @author Dave Dunkin
 * @copyright public domain
 */
function addSwipeListener(el, listener) {
  var startX;
  var dx;
  var direction;

  function cancelTouch() {
    el.removeEventListener('touchmove', onTouchMove);
    el.removeEventListener('touchend', onTouchEnd);
    startX = null;
    startY = null;
    direction = null;
  }

  function onTouchMove(e) {
    if (e.touches.length > 1) {
      cancelTouch();
    } else {
      dx = e.touches[0].pageX - startX;
      var dy = e.touches[0].pageY - startY;
      if (direction == null) {
        direction = dx;
        e.preventDefault();
      } else if ((direction < 0 && dx > 0) || (direction > 0 && dx < 0)
          || Math.abs(dy) > 15) {
        cancelTouch();
      }
    }
  }

  function onTouchEnd(e) {
    cancelTouch();
    if (Math.abs(dx) > 50) {
      listener(e);
    }
  }

  function onTouchStart(e) {
    if (e.touches.length == 1) {
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
      el.addEventListener('touchmove', onTouchMove, false);
      el.addEventListener('touchend', onTouchEnd, false);
    }
  }

  el.addEventListener('touchstart', onTouchStart, false);
}

jQuery.fn.swipe = function(callback) {
  this.each(function(idx, node) {
    addSwipeListener(node, callback);
  });
}

$.event.special.swipe = {
  add : function(callback) {
    addSwipeListener(this, callback);
    $(this).bind('dblclick', callback);
  }
};

function NoClickDelay(el, callback) {
  this.element = el;
  this.element.addEventListener('touchstart', this, false);
  this.callback = callback;
}

NoClickDelay.prototype = {
  handleEvent : function(e) {
    switch (e.type) {
    case 'touchstart':
      this.onTouchStart(e);
      break;
    case 'touchmove':
      this.onTouchMove(e);
      break;
    case 'touchend':
      this.onTouchEnd(e);
      break;
    }
  },

  onTouchStart : function(e) {
    // e.preventDefault();
    this.moved = false;
    // console.log("Starting...");
    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
    this.touchStartY = e.touches[0].pageY;
    this.touchStartX = e.touches[0].pageX;
  },

  onTouchMove : function(e) {
    // console.log("Moving");
    var topDelta = e.touches[0].pageY - this.touchStartY;
    var leftDelta = e.touches[0].pageX - this.touchStartX;
    if (Math.abs(topDelta) > 5 || Math.abs(leftDelta) > 5) {
      this.moved = true;
    }
  },

  onTouchEnd : function(e) {
    this.element.removeEventListener('touchmove', this, false);
    this.element.removeEventListener('touchend', this, false);
    e.preventDefault();

    // console.log("The end");
    if (!this.moved) {
      this.callback(e);
    }
  }
};

/*
 * jQuery.fn.tap = function (callback) { // if (true) {//(mobl.isIphone) { //new
 * NoClickDelay(this[0], callback); // } else { this.click(callback); // } };
 *
 * jQuery.fn.tap = function (callback) { if(mobl.isIphone() || mobl.isAndroid() ||
 * mobl.isIpad()) { new NoClickDelay(this[0], callback); } else {
 * this.click(callback); } };
 */

$.event.special.tap = {
  add : function(callback) {
    if (mobl.isTouchDevice()) {
      new NoClickDelay(this, callback);
    } else {
      $(this).bind('click', callback);
    }
  },
  remove : function(callback) {
    if (mobl.isIphone() || mobl.isAndroid() || mobl.isIpad()) {
      // new NoClickDelay(this, callback); // TODO FIX THIS!!
    } else {
      $(this).unbind('click', callback);
    }
  }
};

$.event.special.touchdown = {
  add : function(callback) {
    var that = $(this);

    if (mobl.isTouchDevice()) {
      that.bind('touchstart', function(event) {
        event = event.originalEvent;
        // event.preventDefault();
        if (event.touches.length === 1) {
          var touch = event.touches[0];
          event.x = touch.pageX - that.offset().left;
          event.y = touch.pageY - that.offset().top;
          event.clientX = touch.pageX;
          event.clientY = touch.pageY;
          callback(event);
        }
      });
    } else {
      that.mousedown(function(event) {
        // event.preventDefault();
        this.dragging = true;
        event.x = event.offsetX || event.layerX - that.offset().left;
        event.y = event.offsetY || event.layerY - that.offset().top;
        callback(event);
      });
    }
  }
};

$.event.special.touchdrag = {
  add : function(callback) {
    var that = $(this);
    if (mobl.isTouchDevice()) {
      that.bind('touchmove', function(event) {
        event = event.originalEvent;
        // event.preventDefault();
        if (event.touches.length === 1) {
          var touch = event.touches[0];
          event.x = touch.pageX - that.offset().left;
          event.y = touch.pageY - that.offset().top;
          event.clientX = touch.pageX;
          event.clientY = touch.pageY;
          callback(event);
        }
      });
    } else {
      that
          .mousemove(function(event) {
            // event.preventDefault();
            if (this.dragging) {
              event.x = event.offsetX || event.layerX
                  - that.offset().left;
              event.y = event.offsetY || event.layerY
                  - that.offset().top;
              callback(event);
            }
          });
      that.mouseup(function() {
        this.dragging = false;
      });
    }
  }
};

$.event.special.touchup = {
  add : function(callback) {
    var that = $(this);
    if (mobl.isTouchDevice()) {
      that.bind('touchend', function(event) {
        event = event.originalEvent;
        event.preventDefault();
        if (event.changedTouches.length === 1) {
          var touch = event.changedTouches[0];
          event.x = touch.pageX - that.offset().left;
          event.y = touch.pageY - that.offset().top;
          event.clientX = touch.pageX;
          event.clientY = touch.pageY;
          callback(event);
        }
      });
    } else {
      that.mouseup(function(event) {
        event.preventDefault();
        this.dragging = false;
        event.x = event.offsetX || event.layerX - that.offset().left;
        event.y = event.offsetY || event.layerY - that.offset().top;
        callback(event);
      });
    }
  }
};


try {
  if(!window) {
    window = {};
    //exports.console = console;
  }
} catch(e) {
  window = {};
  exports.console = console;
}

var persistence = (window && window.persistence) ? window.persistence : {}; 

if(!persistence.store) {
  persistence.store = {};
}

persistence.store.memory = {};

persistence.store.memory.config = function(persistence, dbname) {
  var argspec = persistence.argspec;
  dbname = dbname || 'persistenceData';

  var allObjects = {}; // entityName -> LocalQueryCollection

  persistence.getAllObjects = function() { return allObjects; };

  var defaultAdd = persistence.add;

  persistence.add = function(obj) {
    if(!this.trackedObjects[obj.id]) {
      defaultAdd.call(this, obj);
      var entityName = obj._type;
      if(!allObjects[entityName]) {
        allObjects[entityName] = new persistence.LocalQueryCollection();
        allObjects[entityName]._session = persistence;
      }
      allObjects[entityName].add(obj);
    }
    return this;
  };

  var defaultRemove = persistence.remove;

  persistence.remove = function(obj) {
    defaultRemove.call(this, obj);
    var entityName = obj._type;
    allObjects[entityName].remove(obj);
  };

  persistence.schemaSync = function (tx, callback, emulate) {
    var args = argspec.getArgs(arguments, [
        { name: "tx", optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: "callback", optional: true, check: argspec.isCallback(), defaultValue: function(){} },
        { name: "emulate", optional: true, check: argspec.hasType('boolean') }
      ]);

    args.callback();
  };

  persistence.flush = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: "tx", optional: true, check: persistence.isTransaction },
        { name: "callback", optional: true, check: argspec.isCallback(), defaultValue: function(){} }
      ]);

    var fns = persistence.flushHooks;
    persistence.asyncForEach(fns, function(fn, callback) {
        fn(session, tx, callback);
      }, function() {
        var trackedObjects = persistence.trackedObjects;
        for(var id in trackedObjects) {
          if(trackedObjects.hasOwnProperty(id)) {
            if (persistence.objectsToRemove.hasOwnProperty(id)) {
              delete trackedObjects[id];
            } else {
              trackedObjects[id]._dirtyProperties = {};
            }
          }
        }
        args.callback();
      });
  };

  persistence.transaction = function(callback) {
    setTimeout(function() {
        callback({executeSql: function() {} });
      }, 0);
  };

  persistence.loadFromLocalStorage = function(callback) {
    var dump = window.localStorage.getItem(dbname);
    if(dump) {
      this.loadFromJson(dump, callback);
    } else {
      callback && callback();
    }
  };

  persistence.saveToLocalStorage = function(callback) {
    this.dumpToJson(function(dump) {
        window.localStorage.setItem(dbname, dump);
        if(callback) {
          callback();
        }
      });
  };

  /**
   * Remove all tables in the database (as defined by the model)
   */
  persistence.reset = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: "tx", optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: "callback", optional: true, check: argspec.isCallback(), defaultValue: function(){} }
      ]);
    tx = args.tx;
    callback = args.callback;

    allObjects = {};
    this.clean();
    callback();
  };

  /**
   * Dummy
   */
  persistence.close = function() {};

  // QueryCollection's list

  function makeLocalClone(otherColl) {
    var coll = allObjects[otherColl._entityName];
    if(!coll) {
      coll = new persistence.LocalQueryCollection();
    }
    coll = coll.clone();
    coll._filter = otherColl._filter;
    coll._prefetchFields = otherColl._prefetchFields;
    coll._orderColumns = otherColl._orderColumns;
    coll._limit = otherColl._limit;
    coll._skip = otherColl._skip;
    coll._reverse = otherColl._reverse;
    return coll;
  }
  /**
   * Asynchronous call to actually fetch the items in the collection
   * @param tx transaction to use
   * @param callback function to be called taking an array with 
   *   result objects as argument
   */
  persistence.DbQueryCollection.prototype.list = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: 'tx', optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: 'callback', optional: false, check: argspec.isCallback() }
      ]);
    tx = args.tx;
    callback = args.callback;

    var coll = makeLocalClone(this);
    coll.list(null, callback);
  };

  /**
   * Asynchronous call to remove all the items in the collection. 
   * Note: does not only remove the items from the collection, but
   * the items themselves.
   * @param tx transaction to use
   * @param callback function to be called when clearing has completed
   */
  persistence.DbQueryCollection.prototype.destroyAll = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: 'tx', optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: 'callback', optional: true, check: argspec.isCallback(), defaultValue: function(){} }
      ]);
    tx = args.tx;
    callback = args.callback;

    var coll = makeLocalClone(this);
    coll.destroyAll(null, callback);
  };

  /**
   * Asynchronous call to count the number of items in the collection.
   * @param tx transaction to use
   * @param callback function to be called when clearing has completed
   */
  persistence.DbQueryCollection.prototype.count = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: 'tx', optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: 'callback', optional: false, check: argspec.isCallback() }
      ]);
    tx = args.tx;
    callback = args.callback;

    var coll = makeLocalClone(this);
    coll.count(null, callback);
  };

  persistence.ManyToManyDbQueryCollection = function(session, entityName) {
    this.init(session, entityName, persistence.ManyToManyDbQueryCollection);
    this._items = [];
  };

  persistence.ManyToManyDbQueryCollection.prototype = new persistence.LocalQueryCollection();

  persistence.ManyToManyDbQueryCollection.prototype.initManyToMany = function(obj, coll) {
    this._obj = obj;
    this._coll = coll; // column name
  };

  persistence.ManyToManyDbQueryCollection.prototype.add = function(item, recursing) {
    persistence.LocalQueryCollection.prototype.add.call(this, item);
    if(!recursing) { // prevent recursively adding to one another
      // Let's find the inverse collection
      var meta = persistence.getMeta(this._obj._type);
      var inverseProperty = meta.hasMany[this._coll].inverseProperty;
      persistence.get(item, inverseProperty).add(this._obj, true);
    }
  };

  persistence.ManyToManyDbQueryCollection.prototype.remove = function(item, recursing) {
    persistence.LocalQueryCollection.prototype.remove.call(this, item);
    if(!recursing) { // prevent recursively adding to one another
      // Let's find the inverse collection
      var meta = persistence.getMeta(this._obj._type);
      var inverseProperty = meta.hasMany[this._coll].inverseProperty;
      persistence.get(item, inverseProperty).remove(this._obj, true); 
    }
  };
};

try {
  exports.config = persistence.store.memory.config;
  exports.getSession = function() { return persistence; };
} catch(e) {}



try {
  if(!window) {
    window = {};
    //exports.console = console;
  }
} catch(e) {
  window = {};
  exports.console = console;
}

var persistence = (window && window.persistence) ? window.persistence : {}; 

if(!persistence.store) {
  persistence.store = {};
}

persistence.store.websql = {};


persistence.store.websql.config = function(persistence, dbname, description, size) {
  var conn = null;

  /**
   * Create a transaction
   * 
   * @param callback,
   *            the callback function to be invoked when the transaction
   *            starts, taking the transaction object as argument
   */
  persistence.transaction = function (callback) {
    if(!conn) {
      throw new Error("No ongoing database connection, please connect first.");
    } else {
      conn.transaction(callback);
    }
  };

  ////////// Low-level database interface, abstracting from HTML5 and Gears databases \\\\
  persistence.db = persistence.db || {};

  persistence.db.implementation = "unsupported";
  persistence.db.conn = null;

  // window object does not exist on Qt Declarative UI (http://doc.trolltech.org/4.7-snapshot/declarativeui.html)
  if (window && window.openDatabase) {
    persistence.db.implementation = "html5";
  } else if (window && window.google && google.gears) {
    persistence.db.implementation = "gears";
  } else {
    try {
      if (openDatabaseSync) {
        // TODO: find a browser that implements openDatabaseSync and check out if
        //       it is attached to the window or some other object
        persistence.db.implementation = "html5-sync";
      }
    } catch(e) {
    }
  }

  persistence.db.html5 = {};

  persistence.db.html5.connect = function (dbname, description, size) {
    var that = {};
    var conn = openDatabase(dbname, '1.0', description, size);

    that.transaction = function (fn) {
      return conn.transaction(function (sqlt) {
          return fn(persistence.db.html5.transaction(sqlt));
        });
    };
    return that;
  };

  persistence.db.html5.transaction = function (t) {
    var that = {};
    that.executeSql = function (query, args, successFn, errorFn) {
      if(persistence.debug) {
        console.log(query, args);
      }
      t.executeSql(query, args, function (_, result) {
          if (successFn) {
            var results = [];
            for ( var i = 0; i < result.rows.length; i++) {
              results.push(result.rows.item(i));
            }
            successFn(results);
          }
        }, errorFn);
    };
    return that;
  };

  persistence.db.html5Sync = {};

  persistence.db.html5Sync.connect = function (dbname, description, size) {
    var that = {};
    var conn = openDatabaseSync(dbname, '1.0', description, size);

    that.transaction = function (fn) {
      return conn.transaction(function (sqlt) {
          return fn(persistence.db.html5Sync.transaction(sqlt));
        });
    };
    return that;
  };

  persistence.db.html5Sync.transaction = function (t) {
    var that = {};
    that.executeSql = function (query, args, successFn, errorFn) {
      if (args == null) args = [];

      if(persistence.debug) {
        console.log(query, args);
      }

      var result = t.executeSql(query, args);
      if (result) {
        if (successFn) {
          var results = [];
          for ( var i = 0; i < result.rows.length; i++) {
            results.push(result.rows.item(i));
          }
          successFn(results);
        }
      }
    };
    return that;
  };

  persistence.db.gears = {};

  persistence.db.gears.connect = function (dbname) {
    var that = {};
    var conn = google.gears.factory.create('beta.database');
    conn.open(dbname);

    that.transaction = function (fn) {
      fn(persistence.db.gears.transaction(conn));
    };
    return that;
  };

  persistence.db.gears.transaction = function (conn) {
    var that = {};
    that.executeSql = function (query, args, successFn, errorFn) {
      if(persistence.debug) {
        console.log(query, args);
      }
      var rs = conn.execute(query, args);
      if (successFn) {
        var results = [];
        while (rs.isValidRow()) {
          var result = {};
          for ( var i = 0; i < rs.fieldCount(); i++) {
            result[rs.fieldName(i)] = rs.field(i);
          }
          results.push(result);
          rs.next();
        }
        successFn(results);
      }
    };
    return that;
  };

  persistence.db.connect = function (dbname, description, size) {
    if (persistence.db.implementation == "html5") {
      return persistence.db.html5.connect(dbname, description, size);
    } else if (persistence.db.implementation == "html5-sync") {
      return persistence.db.html5Sync.connect(dbname, description, size);
    } else if (persistence.db.implementation == "gears") {
      return persistence.db.gears.connect(dbname);
    }
  };

  ///////////////////////// SQLite dialect

  persistence.store.websql.sqliteDialect = {
    // columns is an array of arrays, e.g.
    // [["id", "VARCHAR(32)", "PRIMARY KEY"], ["name", "TEXT"]]
    createTable: function(tableName, columns) {
      var tm = persistence.typeMapper;
      var sql = "CREATE TABLE IF NOT EXISTS `" + tableName + "` (";
      var defs = [];
      for(var i = 0; i < columns.length; i++) {
        var column = columns[i];
        defs.push("`" + column[0] + "` " + tm.columnType(column[1]) + (column[2] ? " " + column[2] : ""));
      }
      sql += defs.join(", ");
      sql += ')';
      return sql;
    },

    // columns is array of column names, e.g.
    // ["id"]
    createIndex: function(tableName, columns, options) {
      options = options || {};
      return "CREATE "+(options.unique?"UNIQUE ":"")+"INDEX IF NOT EXISTS `" + tableName + "__" + columns.join("_") + 
             "` ON `" + tableName + "` (" + 
             columns.map(function(col) { return "`" + col + "`"; }).join(", ") + ")";
    }
  };

  // Configure persistence for generic sql persistence, using sqliteDialect
  persistence.store.sql.config(persistence, persistence.store.websql.sqliteDialect);

  // Make the connection
  conn = persistence.db.connect(dbname, description, size);
  if(!conn) {
    throw new Error("No supported database found in this browser.");
  }
};

try {
  exports.persistence = persistence;
} catch(e) {}


// Copyright 2007, Google Inc.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//  3. Neither the name of Google Inc. nor the names of its contributors may be
//     used to endorse or promote products derived from this software without
//     specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// Sets up google.gears.*, which is *the only* supported way to access Gears.
//
// Circumvent this file at your own risk!
//
// In the future, Gears may automatically define google.gears.* without this
// file. Gears may use these objects to transparently fix bugs and compatibility
// issues. Applications that use the code below will continue to work seamlessly
// when that happens.

(function() {
  // We are already defined. Hooray!
  if (window.google && google.gears) {
    return;
  }

  var factory = null;

  // Firefox
  if (typeof GearsFactory != 'undefined') {
    factory = new GearsFactory();
  } else {
    // IE
    try {
      factory = new ActiveXObject('Gears.Factory');
      // privateSetGlobalObject is only required and supported on IE Mobile on
      // WinCE.
      if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
        factory.privateSetGlobalObject(this);
      }
    } catch (e) {
      // Safari
      if ((typeof navigator.mimeTypes != 'undefined')
           && navigator.mimeTypes["application/x-googlegears"]) {
        factory = document.createElement("object");
        factory.style.display = "none";
        factory.width = 0;
        factory.height = 0;
        factory.type = "application/x-googlegears";
        document.documentElement.appendChild(factory);
      }
    }
  }

  // *Do not* define any objects if Gears is not installed. This mimics the
  // behavior of Gears defining the objects in the future.
  if (!factory) {
    return;
  }

  // Now set up the objects, being careful not to overwrite anything.
  //
  // Note: In Internet Explorer for Windows Mobile, you can't add properties to
  // the window object. However, global objects are automatically added as
  // properties of the window object in all browsers.
  if (!window.google) {
    google = {};
  }

  if (!google.gears) {
    google.gears = {factory: factory};
  }
})();


/**
 * Default type mapper. Override to support more types or type options.
 */
var defaultTypeMapper = {
  /**
   * SQL type for ids
   */
  idType: "VARCHAR(32)",
  
  /**
   * SQL type for class names (used by mixins)
   */
  classNameType: "TEXT",

  /**
   * Returns SQL type for column definition
   */
  columnType: function(type){
    switch(type) {
    case 'JSON': return 'TEXT';
    case 'BOOL': return 'INT';
    case 'DATE': return 'INT';
    default: return type;
    }
  },

  inVar: function(str, type){
    return str;
  },
  outVar: function(str, type){
    return str;
  },
  outId: function(str){
    return "'" + str + "'";
  },
  /**
   * Converts a value from the database to a value suitable for the entity
   * (also does type conversions, if necessary)
   */
  dbValToEntityVal: function(val, type){
    if (val === null || val === undefined) {
      return val;
    }
    switch (type) {
      case 'DATE':
        // SQL is in seconds and JS in miliseconds
        return new Date(parseInt(val, 10) * 1000);
      case 'BOOL':
        return val === 1 || val === '1';
        break;
      case 'INT':
        return +val;
        break;
      case 'BIGINT':
        return +val;
        break;
      case 'JSON':
        if (val) {
          return JSON.parse(val);
        }
        else {
          return val;
        }
        break;
      default:
        return val;
    }
  },

  /**
   * Converts an entity value to a database value, inverse of
   *   dbValToEntityVal
   */
  entityValToDbVal: function(val, type){
    if (val === undefined || val === null) {
      return null;
    }
    else if (type === 'JSON' && val) {
      return JSON.stringify(val);
    }
    else if (val.id) {
      return val.id;
    }
    else if (type === 'BOOL') {
      return (val === 'false') ? 0 : (val ? 1 : 0);
    }
    else if (type === 'DATE' || val.getTime) {
      // In order to make SQLite Date/Time functions work we should store
      // values in seconds and not as miliseconds as JS Date.getTime()
      val = new Date(val);
      return Math.round(val.getTime() / 1000);
    }
    else {
      return val;
    }
  },
  /**
   * Shortcut for inVar when type is id -- no need to override
   */
  inIdVar: function(str){
    return this.inVar(str, this.idType);
  },
  /**
   * Shortcut for outVar when type is id -- no need to override
   */
  outIdVar: function(str){
    return this.outVar(str, this.idType);
  },
  /**
   * Shortcut for entityValToDbVal when type is id -- no need to override
   */
  entityIdToDbId: function(id){
    return this.entityValToDbVal(id, this.idType);
  }
}

function config(persistence, dialect) {
  var argspec = persistence.argspec;

  persistence.typeMapper = dialect.typeMapper || defaultTypeMapper;

  persistence.generatedTables = {}; // set

  /**
   * Synchronize the data model with the database, creates table that had not
   * been defined before
   * 
   * @param tx
   *            transaction object to use (optional)
   * @param callback
   *            function to be called when synchronization has completed,
   *            takes started transaction as argument
   */
  persistence.schemaSync = function (tx, callback, emulate) {
    var args = argspec.getArgs(arguments, [
        { name: "tx", optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: "callback", optional: true, check: argspec.isCallback(), defaultValue: function(){} },
        { name: "emulate", optional: true, check: argspec.hasType('boolean') }
      ]);
    tx = args.tx;
    callback = args.callback;
    emulate = args.emulate;

    if(!tx) {
      var session = this;
      this.transaction(function(tx) { session.schemaSync(tx, callback, emulate); });
      return;
    }
    var queries = [], meta, colDefs, otherMeta, tableName;
	
	var tm = persistence.typeMapper;
    var entityMeta = persistence.getEntityMeta();
    for (var entityName in entityMeta) {
      if (entityMeta.hasOwnProperty(entityName)) {
        meta = entityMeta[entityName];
        if (!meta.isMixin) {
          colDefs = [];
          for (var prop in meta.fields) {
            if (meta.fields.hasOwnProperty(prop)) {
              colDefs.push([prop, meta.fields[prop]]);
            }
          }
          for (var rel in meta.hasOne) {
            if (meta.hasOne.hasOwnProperty(rel)) {
              otherMeta = meta.hasOne[rel].type.meta;
              colDefs.push([rel, tm.idType]);
              queries.push([dialect.createIndex(meta.name, [rel]), null]);
            }
          }
          for (var i = 0; i < meta.indexes.length; i++) {
            queries.push([dialect.createIndex(meta.name, meta.indexes[i].columns, meta.indexes[i]), null]);
          }
        }
        for (var rel in meta.hasMany) {
          if (meta.hasMany.hasOwnProperty(rel) && meta.hasMany[rel].manyToMany) {
            tableName = meta.hasMany[rel].tableName;
            if (!persistence.generatedTables[tableName]) {
              var otherMeta = meta.hasMany[rel].type.meta;
              var inv = meta.hasMany[rel].inverseProperty;
              // following test ensures that mixin mtm tables get created with the mixin itself
              // it seems superfluous because mixin will be processed before entitites that use it 
              // but better be safe than sorry.
              if (otherMeta.hasMany[inv].type.meta != meta)
                continue; 
              var p1 = meta.name + "_" + rel;
              var p2 = otherMeta.name + "_" + inv;
              queries.push([dialect.createIndex(tableName, [p1]), null]);
              queries.push([dialect.createIndex(tableName, [p2]), null]);
              var columns = [[p1, tm.idType], [p2, tm.idType]];
              if (meta.isMixin)
                columns.push([p1 + "_class", tm.classNameType])
              if (otherMeta.isMixin)
                columns.push([p2 + "_class", tm.classNameType])
              queries.push([dialect.createTable(tableName, columns), null]);
              persistence.generatedTables[tableName] = true;
            }
          }
        }
        if (!meta.isMixin) {
          colDefs.push(["id", tm.idType, "PRIMARY KEY"]);
          persistence.generatedTables[meta.name] = true;
          queries.push([dialect.createTable(meta.name, colDefs), null]);
        }
      }
    }
    var fns = persistence.schemaSyncHooks;
    for(var i = 0; i < fns.length; i++) {
      fns[i](tx);
    }
    if(emulate) {
      // Done
      callback(tx);
    } else {
      executeQueriesSeq(tx, queries, function(_, err) {
          callback(tx, err);
        });
    }
  };

  /**
   * Persists all changes to the database transaction
   * 
   * @param tx
   *            transaction to use
   * @param callback
   *            function to be called when done
   */
  persistence.flush = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: "tx", optional: true, check: persistence.isTransaction },
        { name: "callback", optional: true, check: argspec.isCallback(), defaultValue: null }
      ]);
    tx = args.tx;
    callback = args.callback;

    var session = this;
    if(!tx) {
      this.transaction(function(tx) { session.flush(tx, callback); });
      return;
    }
    var fns = persistence.flushHooks;
    persistence.asyncForEach(fns, function(fn, callback) {
        fn(session, tx, callback);
      }, function() {
        // After applying the hooks
        var persistObjArray = [];
        for (var id in session.trackedObjects) {
          if (session.trackedObjects.hasOwnProperty(id)) {
            persistObjArray.push(session.trackedObjects[id]);
          }
        }
        var removeObjArray = [];
        for (var id in session.objectsToRemove) {
          if (session.objectsToRemove.hasOwnProperty(id)) {
            removeObjArray.push(session.objectsToRemove[id]);
            delete session.trackedObjects[id]; // Stop tracking
          }
        }
        session.objectsToRemove = {};
        if(callback) {
          persistence.asyncParForEach(removeObjArray, function(obj, callback) {
              remove(obj, tx, callback);
            }, function(result, err) {
              if (err) return callback(result, err);
              persistence.asyncParForEach(persistObjArray, function(obj, callback) {
                  save(obj, tx, callback);
                }, callback);
            });
        } else { // More efficient
          for(var i = 0; i < persistObjArray.length; i++) {
            save(persistObjArray[i], tx);
          }
          for(var i = 0; i < removeObjArray.length; i++) {
            remove(removeObjArray[i], tx);
          }
        }
      });
  };
  
  /**
   * Remove all tables in the database (as defined by the model)
   */
  persistence.reset = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: "tx", optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: "callback", optional: true, check: argspec.isCallback(), defaultValue: function(){} }
      ]);
    tx = args.tx;
    callback = args.callback;

    var session = this;
    if(!tx) {
      session.transaction(function(tx) { session.reset(tx, callback); });
      return;
    }
    // First emulate syncing the schema (to know which tables were created)
    this.schemaSync(tx, function() {
        var tableArray = [];
        for (var p in persistence.generatedTables) {
          if (persistence.generatedTables.hasOwnProperty(p)) {
            tableArray.push(p);
          }
        }
        function dropOneTable () {
          var tableName = tableArray.pop();
          tx.executeSql("DROP TABLE IF EXISTS `" + tableName + "`", null, function () {
              if (tableArray.length > 0) {
                dropOneTable();
              } else {
                cb();
              }
            }, cb);
        }
        if(tableArray.length > 0) {
          dropOneTable();
        } else {
          cb();
        }
		
        function cb(result, err) {
          session.clean();
          persistence.generatedTables = {};
          if (callback) callback(result, err);
        }
      }, true);
  };

  /**
   * Converts a database row into an entity object
   */
  function rowToEntity(session, entityName, row, prefix) {
    prefix = prefix || '';
    if (session.trackedObjects[row[prefix + "id"]]) { // Cached version
      return session.trackedObjects[row[prefix + "id"]];
    }
    var tm = persistence.typeMapper;
    var rowMeta = persistence.getMeta(entityName);
    var ent = persistence.define(entityName); // Get entity
    if(!row[prefix+'id']) { // null value, no entity found
      return null;
    }
    var o = new ent(session, undefined, true);
    o.id = tm.dbValToEntityVal(row[prefix + 'id'], tm.idType);
    o._new = false;
    for ( var p in row) {
      if (row.hasOwnProperty(p)) {
        if (p.substring(0, prefix.length) === prefix) {
          var prop = p.substring(prefix.length);
          if (prop != 'id') {
            o._data[prop] = tm.dbValToEntityVal(row[p], rowMeta.fields[prop] || tm.idType);
          }
        }
      }
    }
    return o;
  }

  /**
   * Internal function to persist an object to the database
   * this function is invoked by persistence.flush()
   */
  function save(obj, tx, callback) {
    var meta = persistence.getMeta(obj._type);
    var tm = persistence.typeMapper;
    var properties = [];
    var values = [];
    var qs = [];
    var propertyPairs = [];
    if(obj._new) { // Mark all properties dirty
      for (var p in meta.fields) {
        if(meta.fields.hasOwnProperty(p)) {
          obj._dirtyProperties[p] = true;
        }
      }
    } 
    for ( var p in obj._dirtyProperties) {
      if (obj._dirtyProperties.hasOwnProperty(p)) {
        properties.push("`" + p + "`");
        var type = meta.fields[p] || tm.idType;
        values.push(tm.entityValToDbVal(obj._data[p], type));
        qs.push(tm.outVar("?", type));
        propertyPairs.push("`" + p + "` = " + tm.outVar("?", type));
      }
    }
    var additionalQueries = [];
    for(var p in meta.hasMany) {
      if(meta.hasMany.hasOwnProperty(p)) {
        additionalQueries = additionalQueries.concat(persistence.get(obj, p).persistQueries());
      }
    }
    executeQueriesSeq(tx, additionalQueries, function() {
        if (properties.length === 0) { // Nothing changed
          if(callback) callback();
          return;
        }
        obj._dirtyProperties = {};
        if (obj._new) {
          properties.push('id');
          values.push(tm.entityIdToDbId(obj.id));
          qs.push(tm.outIdVar('?'));
          var sql = "INSERT INTO `" + obj._type + "` (" + properties.join(", ") + ") VALUES (" + qs.join(', ') + ")";
          obj._new = false;
          tx.executeSql(sql, values, callback, callback);
        } else {
          var sql = "UPDATE `" + obj._type + "` SET " + propertyPairs.join(',') + " WHERE id = " + tm.outId(obj.id);
          tx.executeSql(sql, values, callback, callback);
        }
      });
  }

  persistence.save = save;

  function remove (obj, tx, callback) {
    var meta = persistence.getMeta(obj._type);
	var tm = persistence.typeMapper;
    var queries = [["DELETE FROM `" + obj._type + "` WHERE id = " + tm.outId(obj.id), null]];
    for (var rel in meta.hasMany) {
      if (meta.hasMany.hasOwnProperty(rel) && meta.hasMany[rel].manyToMany) {
        var tableName = meta.hasMany[rel].tableName;
        //var inverseProperty = meta.hasMany[rel].inverseProperty;
        queries.push(["DELETE FROM `" + tableName + "` WHERE `" + meta.name + '_' + rel + "` = " + tm.outId(obj.id), null]);
      }
    }
    executeQueriesSeq(tx, queries, callback);
  }

  /**
   * Utility function to execute a series of queries in an asynchronous way
   * @param tx the transaction to execute the queries on
   * @param queries an array of [query, args] tuples
   * @param callback the function to call when all queries have been executed
   */
  function executeQueriesSeq (tx, queries, callback) {
    // queries.reverse();
    var callbackArgs = [];
    for ( var i = 3; i < arguments.length; i++) {
      callbackArgs.push(arguments[i]);
    }
    persistence.asyncForEach(queries, function(queryTuple, callback) {
        tx.executeSql(queryTuple[0], queryTuple[1], callback, function(_, err) {
            console.log(err.message);
            callback(_, err);
          });
      }, function(result, err) {
        if (err && callback) {
          callback(result, err);
          return;
        }
        if(callback) callback.apply(null, callbackArgs);
      });
  }

  persistence.executeQueriesSeq = executeQueriesSeq;

  /////////////////////////// QueryCollection patches to work in SQL environment

  /**
   * Function called when session is flushed, returns list of SQL queries to execute 
   * (as [query, arg] tuples)
   */
  persistence.QueryCollection.prototype.persistQueries = function() { return []; };

  var oldQCClone = persistence.QueryCollection.prototype.clone;

  persistence.QueryCollection.prototype.clone = function (cloneSubscribers) {
    var c = oldQCClone.call(this, cloneSubscribers);
    c._additionalJoinSqls = this._additionalJoinSqls.slice(0);
    c._additionalWhereSqls = this._additionalWhereSqls.slice(0);
    c._additionalGroupSqls = this._additionalGroupSqls.slice(0);
    c._manyToManyFetch = this._manyToManyFetch;
    return c;
  };

  var oldQCInit = persistence.QueryCollection.prototype.init;

  persistence.QueryCollection.prototype.init = function(session, entityName, constructor) {
    oldQCInit.call(this, session, entityName, constructor);
    this._manyToManyFetch = null;
    this._additionalJoinSqls = [];
    this._additionalWhereSqls = [];
    this._additionalGroupSqls = [];
  };

  var oldQCToUniqueString = persistence.QueryCollection.prototype.toUniqueString;

  persistence.QueryCollection.prototype.toUniqueString = function() {
    var s = oldQCToUniqueString.call(this);
    s += '|JoinSQLs:';
    for(var i = 0; i < this._additionalJoinSqls.length; i++) {
      s += this._additionalJoinSqls[i];
    }
    s += '|WhereSQLs:';
    for(var i = 0; i < this._additionalWhereSqls.length; i++) {
      s += this._additionalWhereSqls[i];
    }
    s += '|GroupSQLs:';
    for(var i = 0; i < this._additionalGroupSqls.length; i++) {
      s += this._additionalGroupSqls[i];
    }
    if(this._manyToManyFetch) {
      s += '|ManyToManyFetch:';
      s += JSON.stringify(this._manyToManyFetch); // TODO: Do something more efficient
    }
    return s;
  };

  persistence.NullFilter.prototype.sql = function (meta, alias, values) {
    return "1=1";
  };

  persistence.AndFilter.prototype.sql = function (meta, alias, values) {
    return "(" + this.left.sql(meta, alias, values) + " AND "
    + this.right.sql(meta, alias, values) + ")";
  };

  persistence.OrFilter.prototype.sql = function (meta, alias, values) {
    return "(" + this.left.sql(meta, alias, values) + " OR "
    + this.right.sql(meta, alias, values) + ")";
  };

  persistence.PropertyFilter.prototype.sql = function (meta, alias, values) {
    var tm = persistence.typeMapper;
    var aliasPrefix = alias ? "`" + alias + "`." : "";
  	var sqlType = meta.fields[this.property] || tm.idType;
    if (this.operator === '=' && this.value === null) {
      return aliasPrefix + '`' + this.property + "` IS NULL";
    } else if (this.operator === '!=' && this.value === null) {
      return aliasPrefix + '`' + this.property + "` IS NOT NULL";
    } else if (this.operator === 'in') {
      var vals = this.value;
      var qs = [];
      for(var i = 0; i < vals.length; i++) {
        qs.push('?');
        values.push(tm.entityValToDbVal(vals[i], sqlType));
      }
      if(vals.length === 0) {
        // Optimize this a little
        return "1 = 0";
      } else {
        return aliasPrefix + '`' + this.property + "` IN (" + qs.join(', ') + ")";
      }
    } else if (this.operator === 'not in') {
      var vals = this.value;
      var qs = [];
      for(var i = 0; i < vals.length; i++) {
        qs.push('?');
        values.push(tm.entityValToDbVal(vals[i], sqlType));
      }

      if(vals.length === 0) {
        // Optimize this a little
        return "1 = 1";
      } else {
        return aliasPrefix + '`' + this.property + "` NOT IN (" + qs.join(', ') + ")";
      }
    } else {
      var value = this.value;
      if(value === true || value === false) {
        value = value ? 1 : 0;
      }
      values.push(tm.entityValToDbVal(value, sqlType));
 	  return aliasPrefix + '`' + this.property + "` " + this.operator + " " + tm.outVar("?", sqlType);
   }
  };

  // QueryColleciton's list

  /**
   * Asynchronous call to actually fetch the items in the collection
   * @param tx transaction to use
   * @param callback function to be called taking an array with 
   *   result objects as argument
   */
  persistence.DbQueryCollection.prototype.list = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: 'tx', optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: 'callback', optional: false, check: argspec.isCallback() }
      ]);
    tx = args.tx;
    callback = args.callback;

    var that = this;
    var session = this._session;
    if(!tx) { // no transaction supplied
      session.transaction(function(tx) {
          that.list(tx, callback);
        });
      return;
    }
    var entityName = this._entityName;
    var meta = persistence.getMeta(entityName);
    var tm = persistence.typeMapper;
    
    // handles mixin case -- this logic is generic and could be in persistence.
    if (meta.isMixin) {
      var result = [];
      persistence.asyncForEach(meta.mixedIns, function(realMeta, next) {
        var query = that.clone();
        query._entityName = realMeta.name;
        query.list(tx, function(array) {
          result = result.concat(array);
          next();
        });
      }, function() {
        var query = new persistence.LocalQueryCollection(result);
        query._orderColumns = that._orderColumns;
        query._reverse = that._reverse;
        // TODO: handle skip and limit -- do we really want to do it?
        query.list(null, callback);
      });
      return;
    }    

    function selectAll (meta, tableAlias, prefix) {
      var selectFields = [ tm.inIdVar("`" + tableAlias + "`.id") + " AS " + prefix + "id" ];
      for ( var p in meta.fields) {
        if (meta.fields.hasOwnProperty(p)) {
          selectFields.push(tm.inVar("`" + tableAlias + "`.`" + p + "`", meta.fields[p]) + " AS `"
            + prefix + p + "`");
        }
      }
      for ( var p in meta.hasOne) {
        if (meta.hasOne.hasOwnProperty(p)) {
          selectFields.push(tm.inIdVar("`" + tableAlias + "`.`" + p + "`") + " AS `"
            + prefix + p + "`");
        }
      }
      return selectFields;
    }
    var args = [];
    var mainPrefix = entityName + "_";

    var mainAlias = 'root';
    var selectFields = selectAll(meta, mainAlias, mainPrefix);

    var joinSql = '';
    var additionalWhereSqls = this._additionalWhereSqls.slice(0);
    var mtm = this._manyToManyFetch;
    if(mtm) {
      joinSql += "LEFT JOIN `" + mtm.table + "` AS mtm ON mtm.`" + mtm.inverseProp + "` = `root`.`id` ";
      additionalWhereSqls.push("mtm.`" + mtm.prop + "` = " + tm.outId(mtm.id));
    }

    joinSql += this._additionalJoinSqls.join(' ');

    for ( var i = 0; i < this._prefetchFields.length; i++) {
      var prefetchField = this._prefetchFields[i];
      var thisMeta = meta.hasOne[prefetchField].type.meta;
      if (thisMeta.isMixin)
        throw new Error("cannot prefetch a mixin");
      var tableAlias = thisMeta.name + '_' + prefetchField + "_tbl";
      selectFields = selectFields.concat(selectAll(thisMeta, tableAlias,
          prefetchField + "_"));
      joinSql += "LEFT JOIN `" + thisMeta.name + "` AS `" + tableAlias
      + "` ON `" + tableAlias + "`.`id` = `" + mainAlias + '`.`' + prefetchField + "` ";

    }

    var whereSql = "WHERE "
    + [ this._filter.sql(meta, mainAlias, args) ].concat(additionalWhereSqls).join(' AND ');

    var sql = "SELECT " + selectFields.join(", ") + " FROM `" + entityName
    + "` AS `" + mainAlias + "` " + joinSql + " " + whereSql;

    if(this._additionalGroupSqls.length > 0) {
      sql += this._additionalGroupSqls.join(' ');
    }

    if(this._orderColumns.length > 0) {
      sql += " ORDER BY "
      + this._orderColumns.map(
        function (c) {
          return "`" + mainPrefix + c[0] + "` "
          + (c[1] ? "ASC" : "DESC");
        }).join(", ");
    }
    if(this._limit >= 0) {
      sql += " LIMIT " + this._limit;
    }
    if(this._skip > 0) {
      sql += " OFFSET " + this._skip;
    }
    session.flush(tx, function () {
        tx.executeSql(sql, args, function (rows) {
            var results = [];
            if(that._reverse) {
              rows.reverse();
            }
            for ( var i = 0; i < rows.length; i++) {
              var r = rows[i];
              var e = rowToEntity(session, entityName, r, mainPrefix);
              for ( var j = 0; j < that._prefetchFields.length; j++) {
                var prefetchField = that._prefetchFields[j];
                var thisMeta = meta.hasOne[prefetchField].type.meta;
                e._data_obj[prefetchField] = rowToEntity(session, thisMeta.name, r, prefetchField + '_');
                session.add(e._data_obj[prefetchField]);
              }
              results.push(e);
              session.add(e);
            }
            callback(results);
            that.triggerEvent('list', that, results);
          });
      });
  };

  /**
   * Asynchronous call to remove all the items in the collection. 
   * Note: does not only remove the items from the collection, but
   * the items themselves.
   * @param tx transaction to use
   * @param callback function to be called when clearing has completed
   */
  persistence.DbQueryCollection.prototype.destroyAll = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: 'tx', optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: 'callback', optional: true, check: argspec.isCallback(), defaultValue: function(){} }
      ]);
    tx = args.tx;
    callback = args.callback;

    var that = this;
    var session = this._session;
    if(!tx) { // no transaction supplied
      session.transaction(function(tx) {
          that.destroyAll(tx, callback);
        });
      return;
    } 
    var entityName = this._entityName;
    var meta = persistence.getMeta(entityName);
    var tm = persistence.typeMapper;

    // handles mixin case -- this logic is generic and could be in persistence.
    if (meta.isMixin) {
      persistence.asyncForEach(meta.mixedIns, function(realMeta, next) {
        var query = that.clone();
        query._entityName = realMeta.name;
        query.destroyAll(tx, callback);
      }, callback);
      return;
    }    

    var joinSql = '';
    var additionalWhereSqls = this._additionalWhereSqls.slice(0);
    var mtm = this._manyToManyFetch;
    if(mtm) {
      joinSql += "LEFT JOIN `" + mtm.table + "` AS mtm ON mtm.`" + mtm.inverseProp + "` = `root`.`id` ";
      additionalWhereSqls.push("mtm.`" + mtm.prop + "` = " + tm.outId(mtm.id));
    }

    joinSql += this._additionalJoinSqls.join(' ');

    var args = [];
    var whereSql = "WHERE "
    + [ this._filter.sql(meta, null, args) ].concat(additionalWhereSqls).join(' AND ');

    var selectSql = "SELECT id FROM `" + entityName + "` " + joinSql + ' ' + whereSql;
    var deleteSql = "DELETE FROM `" + entityName + "` " + joinSql + ' ' + whereSql;
    var args2 = args.slice(0);

    session.flush(tx, function () {
        tx.executeSql(selectSql, args, function(results) {
            for(var i = 0; i < results.length; i++) {
              delete session.trackedObjects[results[i].id];
              session.objectsRemoved.push({id: results[i].id, entity: entityName});
            }
            that.triggerEvent('change', that);
            tx.executeSql(deleteSql, args2, callback, callback);
          }, callback);
      });
  };

  /**
   * Asynchronous call to count the number of items in the collection.
   * @param tx transaction to use
   * @param callback function to be called when clearing has completed
   */
  persistence.DbQueryCollection.prototype.count = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: 'tx', optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: 'callback', optional: false, check: argspec.isCallback() }
      ]);
    tx = args.tx;
    callback = args.callback;

    var that = this;
    var session = this._session;
    if(tx && !tx.executeSql) { // provided callback as first argument
      callback = tx;
      tx = null;
    } 
    if(!tx) { // no transaction supplied
      session.transaction(function(tx) {
          that.count(tx, callback);
        });
      return;
    } 
    var entityName = this._entityName;
    var meta = persistence.getMeta(entityName);
    var tm = persistence.typeMapper;

    // handles mixin case -- this logic is generic and could be in persistence.
    if (meta.isMixin) {
      var result = 0;
      persistence.asyncForEach(meta.mixedIns, function(realMeta, next) {
        var query = that.clone();
        query._entityName = realMeta.name;
        query.count(tx, function(count) {
          result += count;
          next();
        });
      }, function() {
        callback(result);
      });
      return;
    }    

    var joinSql = '';
    var additionalWhereSqls = this._additionalWhereSqls.slice(0);
    var mtm = this._manyToManyFetch;
    if(mtm) {
      joinSql += "LEFT JOIN `" + mtm.table + "` AS mtm ON mtm.`" + mtm.inverseProp + "` = `root`.`id` ";
      additionalWhereSqls.push("mtm.`" + mtm.prop + "` = " + tm.outId(mtm.id));
    }

    joinSql += this._additionalJoinSqls.join(' ');
    var args = [];
    var whereSql = "WHERE " + [ this._filter.sql(meta, "root", args) ].concat(additionalWhereSqls).join(' AND ');

    var sql = "SELECT COUNT(*) AS cnt FROM `" + entityName + "` AS `root` " + joinSql + " " + whereSql;

    session.flush(tx, function () {
        tx.executeSql(sql, args, function(results) {
            callback(parseInt(results[0].cnt, 10));
          });
      });
  };

  persistence.ManyToManyDbQueryCollection.prototype.persistQueries = function() {
    var queries = [];
    var meta = persistence.getMeta(this._obj._type);
    var inverseMeta = meta.hasMany[this._coll].type.meta;
    var tm = persistence.typeMapper;
    var rel = meta.hasMany[this._coll];
    var inv = inverseMeta.hasMany[rel.inverseProperty];
    var direct = rel.mixin ? rel.mixin.meta.name : meta.name;
    var inverse = inv.mixin ? inv.mixin.meta.name : inverseMeta.name;

    // Added
    for(var i = 0; i < this._localAdded.length; i++) {
      var columns = [direct + "_" + this._coll, inverse + '_' + rel.inverseProperty];
      var vars = [tm.outIdVar("?"), tm.outIdVar("?")];
      var args = [tm.entityIdToDbId(this._obj.id), tm.entityIdToDbId(this._localAdded[i].id)];
      if (rel.mixin) {
        columns.push(direct + "_" + this._coll + "_class");
        vars.push("?");
        args.push(meta.name);
      }
      if (inv.mixin) {
        columns.push(inverse + "_" + rel.inverseProperty + "_class");
        vars.push("?");
        args.push(inverseMeta.name);
      }
      queries.push(["INSERT INTO " + rel.tableName + 
            " (`" + columns.join("`, `") + "`) VALUES (" + vars.join(",") + ")", args]);
    }
    this._localAdded = [];
    // Removed
    for(var i = 0; i < this._localRemoved.length; i++) {
    queries.push(["DELETE FROM  " + rel.tableName + 
          " WHERE `" + direct + "_" + this._coll + "` = " + tm.outIdVar("?") + " AND `" + 
          inverse + '_' + rel.inverseProperty +
          "` = " + tm.outIdVar("?"), [tm.entityIdToDbId(this._obj.id), tm.entityIdToDbId(this._localRemoved[i].id)]]);
    }
    this._localRemoved = [];
    return queries;
  };
};

if (typeof exports !== 'undefined') {
	exports.defaultTypeMapper = defaultTypeMapper;
	exports.config = config;
}
else {
	window = window || {};
	window.persistence = window.persistence || {};
	window.persistence.store = window.persistence.store || {};
	window.persistence.store.sql = {
		defaultTypeMapper: defaultTypeMapper,
		config: config
	};
}


var mobl = {};

mobl.provides = function (moduleName) {
    var parts = moduleName.split('.');
    var current = window;
    for ( var i = 0; i < parts.length; i++) {
        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
};

mobl.loadedFiles = {};

mobl.load = function(url) {
    if(url in mobl.loadedFiles) {
        return;
    }
    if(url.substring(url.length-4) === '.css') {
        $("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + url + "\">");
    } else {
        $("head").append("<script type=\"text/javascript\" src=\"" + url + "\">");
    }
    mobl.loadedFiles[url] = true;
};

mobl.loadingSpan = function() {
    return $("<span>Loading... <img src=\"data:image/gif;base64,R0lGODlhCgAKAJEDAMzMzP9mZv8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAADACwAAAAACgAKAAACF5wncgaAGgJzJ647cWua4sOBFEd62VEAACH5BAUAAAMALAEAAAAIAAMAAAIKnBM2IoMDAFMQFAAh+QQFAAADACwAAAAABgAGAAACDJwHMBGofKIRItJYAAAh+QQFAAADACwAAAEAAwAIAAACChxgOBPBvpYQYxYAIfkEBQAAAwAsAAAEAAYABgAAAgoEhmPJHOGgEGwWACH5BAUAAAMALAEABwAIAAMAAAIKBIYjYhOhRHqpAAAh+QQFAAADACwEAAQABgAGAAACDJwncqi7EQYAA0p6CgAh+QQJAAADACwHAAEAAwAIAAACCpRmoxoxvQAYchQAOw==\" width=\"10\" height=\"10\"></span>");
};


