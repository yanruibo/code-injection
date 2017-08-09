
mobl.provides('ui');
mobl.provides('mobl.ui');
mobl.provides('mobl.ui.generic');

ui.column = function(s, st, elements, callback) {
  var root435 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1192 = mobl.ref(mobl._("app-title", []));
  
  
  var tmp1193 = mobl.ref(null);
  
  var nodes392 = $("<span>");
  root435.append(nodes392);
  subs__.addSub((mobl.ui.generic.header)(tmp1192, tmp1193, function(_, callback) {
    var root436 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1189 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('ui.config', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp1330 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1188 = mobl.ref(mobl._("config", []));
    
    var nodes393 = $("<span>");
    root436.append(nodes393);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1188, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1189, function(_, callback) {
      var root437 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root437); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes393;
      nodes393 = node.contents();
      oldNodes.replaceWith(nodes393);
    }));
    
    var tmp1191 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('ui.addTask', [s, mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp1331 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1190 = mobl.ref(mobl._("add", []));
    
    var nodes394 = $("<span>");
    root436.append(nodes394);
    subs__.addSub((mobl.ui.generic.button)(tmp1190, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp1191, function(_, callback) {
      var root438 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root438); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes394;
      nodes394 = node.contents();
      oldNodes.replaceWith(nodes394);
    }));
    callback(root436); return subs__;
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes392;
    nodes392 = node.contents();
    oldNodes.replaceWith(nodes392);
  }));
  
  var tmp1197 = mobl.ref(s.get().tasks.order("priority", true).order("finished", true));
  subs__.addSub(mobl.ref(s.get().tasks.order("priority", true).order("finished", true)).addEventListener('change', function() {
    tmp1197.set(s.get().tasks.order("priority", true).order("finished", true));
  }));
  subs__.addSub(mobl.ref(s.get().tasks.order("priority", true)).addEventListener('change', function() {
    tmp1197.set(s.get().tasks.order("priority", true).order("finished", true));
  }));
  subs__.addSub(mobl.ref(s, 'tasks').addEventListener('change', function() {
    tmp1197.set(s.get().tasks.order("priority", true).order("finished", true));
  }));
  
  
  var node7 = mobl.loadingSpan();
  root435.append(node7);
  var list7;
  var listSubs__ = new mobl.CompSubscription();
  subs__.addSub(listSubs__);
  var renderList7 = function() {
    var subs__ = listSubs__;
    list7 = tmp1197.get();
    list7.list(function(results7) {
      node7.empty();
      for(var i7 = 0; i7 < results7.length; i7++) {
        (function() {
          var iternode7 = $("<span>");
          node7.append(iternode7);
          var t;
          t = mobl.ref(mobl.ref(results7), i7);
          
          var tmp1196 = mobl.ref(false);
          
          
          var tmp1195 = mobl.ref(null);
          
          
          var tmp1194 = mobl.ref(null);
          
          var nodes395 = $("<span>");
          iternode7.append(nodes395);
          subs__.addSub((mobl.ui.generic.item)(st, mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1194, tmp1195, tmp1196, function(_, callback) {
            var root439 = $("<span>");
            var subs__ = new mobl.CompSubscription();
            var nodes396 = $("<span>");
            root439.append(nodes396);
            subs__.addSub((ui.task)(t, function(_, callback) {
              var root440 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              callback(root440); return subs__;
              return subs__;
            }, function(node) {
              var oldNodes = nodes396;
              nodes396 = node.contents();
              oldNodes.replaceWith(nodes396);
            }));
            callback(root439); return subs__;
            
            return subs__;
          }, function(node) {
            var oldNodes = nodes395;
            nodes395 = node.contents();
            oldNodes.replaceWith(nodes395);
          }));
          
          var oldNodes = iternode7;
          iternode7 = iternode7.contents();
          oldNodes.replaceWith(iternode7);
          
          
        }());
      }
      mobl.delayedUpdateScrollers();
      subs__.addSub(list7.addEventListener('change', function() { listSubs__.unsubscribe(); renderList7(true); }));
      subs__.addSub(tmp1197.addEventListener('change', function() { listSubs__.unsubscribe(); renderList7(true); }));
    });
  };
  renderList7();
  
  callback(root435); return subs__;
  
  
  return subs__;
};

ui.task = function(t, elements, callback) {
  var root441 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp1203 = mobl.ref(null);
  
  
  var tmp1202 = mobl.ref(null);
  
  
  var tmp1201 = mobl.ref(null);
  
  var nodes397 = $("<span>");
  root441.append(nodes397);
  subs__.addSub((mobl.span)(mobl.ref(styling.dateTaskStyle), tmp1201, tmp1202, tmp1203, function(_, callback) {
    var root442 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root442.append(" [");
    
    var tmp1198 = mobl.ref(t.get().finished.toDateString());
    subs__.addSub(mobl.ref(t, 'finished').addEventListener('change', function() {
      tmp1198.set(t.get().finished.toDateString());
    }));
    
    
    var tmp1200 = mobl.ref(null);
    
    
    var tmp1199 = mobl.ref(null);
    
    var nodes398 = $("<span>");
    root442.append(nodes398);
    subs__.addSub((mobl.label)(tmp1198, tmp1199, tmp1200, function(_, callback) {
      var root443 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root443); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes398;
      nodes398 = node.contents();
      oldNodes.replaceWith(nodes398);
    }));
    
    root442.append("] ");
    callback(root442); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes397;
    nodes397 = node.contents();
    oldNodes.replaceWith(nodes397);
  }));
  
  var tmp1230 = mobl.ref(null);
  
  
  var tmp1229 = mobl.ref(null);
  
  
  var tmp1228 = mobl.ref(null);
  
  var nodes399 = $("<span>");
  root441.append(nodes399);
  subs__.addSub((mobl.span)(mobl.ref(styling.taskCmdStyle), tmp1228, tmp1229, tmp1230, function(_, callback) {
    var root444 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1205 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         var result__ = t.get().status.number > 1;
                         if(result__) {
                           var result__ = t.get().status;
                           var oldstatus = result__;
                           var result__ = oldstatus.tasks.remove(t.get());
                           model.StatusTM.getStatus(oldstatus.number - 1, function(result__) {
                             var tmp1334 = result__;
                             var result__ = tmp1334.tasks;
                             var tmp1333 = result__;
                             var result__ = tmp1333.add(t.get());
                             var tmp1332 = result__;
                             if(callback && callback.apply) callback(); return;
                           });
                         } else {
                           {
                             if(callback && callback.apply) callback(); return;
                           }
                         }
                       });
    
    
    var tmp1204 = mobl.ref("img/left.gif");
    
    
    var tmp1209 = mobl.ref(null);
    
    
    var tmp1208 = mobl.ref(null);
    
    
    var tmp1207 = mobl.ref(null);
    
    
    var tmp1206 = mobl.ref(null);
    
    var nodes400 = $("<span>");
    root444.append(nodes400);
    subs__.addSub((mobl.ui.generic.image)(tmp1204, tmp1206, tmp1207, tmp1205, mobl.ref(styling.iconCmdStyle), tmp1208, tmp1209, function(_, callback) {
      var root445 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root445); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes400;
      nodes400 = node.contents();
      oldNodes.replaceWith(nodes400);
    }));
    
    var tmp1211 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         var result__ = t.get().status.number < 4;
                         if(result__) {
                           var result__ = t.get().status;
                           var oldstatus = result__;
                           var result__ = oldstatus.tasks.remove(t.get());
                           model.StatusTM.getStatus(oldstatus.number + 1, function(result__) {
                             var tmp1337 = result__;
                             var result__ = tmp1337.tasks;
                             var tmp1336 = result__;
                             var result__ = tmp1336.add(t.get());
                             var tmp1335 = result__;
                             if(callback && callback.apply) callback(); return;
                           });
                         } else {
                           {
                             if(callback && callback.apply) callback(); return;
                           }
                         }
                       });
    
    
    var tmp1210 = mobl.ref("img/right.gif");
    
    
    var tmp1215 = mobl.ref(null);
    
    
    var tmp1214 = mobl.ref(null);
    
    
    var tmp1213 = mobl.ref(null);
    
    
    var tmp1212 = mobl.ref(null);
    
    var nodes401 = $("<span>");
    root444.append(nodes401);
    subs__.addSub((mobl.ui.generic.image)(tmp1210, tmp1212, tmp1213, tmp1211, mobl.ref(styling.iconCmdStyle), tmp1214, tmp1215, function(_, callback) {
      var root446 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root446); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes401;
      nodes401 = node.contents();
      oldNodes.replaceWith(nodes401);
    }));
    
    var tmp1217 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         mobl.call('ui.editTask', [t, mobl.ref(false), mobl.ref("slide")], function(result__) {
                         var tmp1338 = result__;
                         if(callback && callback.apply) callback(); return;
                         });
                       });
    
    
    var tmp1216 = mobl.ref("img/pen.gif");
    
    
    var tmp1221 = mobl.ref(null);
    
    
    var tmp1220 = mobl.ref(null);
    
    
    var tmp1219 = mobl.ref(null);
    
    
    var tmp1218 = mobl.ref(null);
    
    var nodes402 = $("<span>");
    root444.append(nodes402);
    subs__.addSub((mobl.ui.generic.image)(tmp1216, tmp1218, tmp1219, tmp1217, mobl.ref(styling.iconCmdStyle), tmp1220, tmp1221, function(_, callback) {
      var root447 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root447); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes402;
      nodes402 = node.contents();
      oldNodes.replaceWith(nodes402);
    }));
    
    var tmp1223 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         var result__ = mobl.remove(t.get());
                         if(callback && callback.apply) callback(); return;
                       });
    
    
    var tmp1222 = mobl.ref("img/trash.gif");
    
    
    var tmp1227 = mobl.ref(null);
    
    
    var tmp1226 = mobl.ref(null);
    
    
    var tmp1225 = mobl.ref(null);
    
    
    var tmp1224 = mobl.ref(null);
    
    var nodes403 = $("<span>");
    root444.append(nodes403);
    subs__.addSub((mobl.ui.generic.image)(tmp1222, tmp1224, tmp1225, tmp1223, mobl.ref(styling.iconCmdStyle), tmp1226, tmp1227, function(_, callback) {
      var root448 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root448); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes403;
      nodes403 = node.contents();
      oldNodes.replaceWith(nodes403);
    }));
    callback(root444); return subs__;
    
    
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes399;
    nodes399 = node.contents();
    oldNodes.replaceWith(nodes399);
  }));
  
  var tmp1231 = mobl.ref("<p style='padding: 0.5em; white-space:pre-line;'>" + t.get().description + "</p>");
  subs__.addSub(mobl.ref(t, 'description').addEventListener('change', function() {
    tmp1231.set("<p style='padding: 0.5em; white-space:pre-line;'>" + t.get().description + "</p>");
  }));
  
  var nodes404 = $("<span>");
  root441.append(nodes404);
  subs__.addSub((mobl.html)(tmp1231, function(_, callback) {
    var root449 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root449); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes404;
    nodes404 = node.contents();
    oldNodes.replaceWith(nodes404);
  }));
  callback(root441); return subs__;
  
  
  
  return subs__;
};

ui.selectPriority = function(t, callback, screenCallback) {
  var root450 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  var nodes405 = $("<span>");
  root450.append(nodes405);
  subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
    var root451 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1237 = mobl.ref(false);
    
    
    var tmp1236 = mobl.ref(null);
    
    
    var tmp1235 = mobl.ref(null);
    
    var nodes406 = $("<span>");
    root451.append(nodes406);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1235, tmp1236, tmp1237, function(_, callback) {
      var root452 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1233 = mobl.ref(function(event, callback) {
                           if(event && event.stopPropagation) event.stopPropagation();
                           if(screenCallback) screenCallback();
                           return;
                           if(callback && callback.apply) callback(); return;
                         });
      
      
      var tmp1232 = mobl.ref([new mobl.Tuple(mobl._("Import&Urgent", []), mobl._("Import&Urgent", [])), new mobl.Tuple(mobl._("Import&NotUrgent", []), mobl._("Import&NotUrgent", [])), new mobl.Tuple(mobl._("NotImport&Urgent", []), mobl._("NotImport&Urgent", [])), new mobl.Tuple(mobl._("NotImport&NotUrgent", []), mobl._("NotImport&NotUrgent", []))]);
      
      
      var tmp1234 = mobl.ref(null);
      
      var nodes407 = $("<span>");
      root452.append(nodes407);
      subs__.addSub((mobl.ui.generic.selectField)(mobl.ref(t, 'priority'), tmp1232, tmp1233, mobl.ref(styling.comboStyle), tmp1234, function(_, callback) {
        var root453 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root453); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes407;
        nodes407 = node.contents();
        oldNodes.replaceWith(nodes407);
      }));
      callback(root452); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes406;
      nodes406 = node.contents();
      oldNodes.replaceWith(nodes406);
    }));
    callback(root451); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes405;
    nodes405 = node.contents();
    oldNodes.replaceWith(nodes405);
  }));
  callback(root450); return subs__;
  
  return subs__;
};

ui.addTask = function(s, callback, screenCallback) {
  var root454 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var newTask = mobl.ref(new model.Task({'created': mobl.now(), 'finished': mobl.now(), 'priority': "1"}));
  
  var tmp1242 = mobl.ref(mobl._("add", []));
  
  
  var tmp1243 = mobl.ref(null);
  
  var nodes408 = $("<span>");
  root454.append(nodes408);
  subs__.addSub((mobl.ui.generic.header)(tmp1242, tmp1243, function(_, callback) {
    var root455 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1238 = mobl.ref(mobl._("back", []));
    
    
    var tmp1239 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    var nodes409 = $("<span>");
    root455.append(nodes409);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1238, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1239, function(_, callback) {
      var root456 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root456); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes409;
      nodes409 = node.contents();
      oldNodes.replaceWith(nodes409);
    }));
    
    var tmp1241 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         var result__ = mobl.add(newTask.get());
                         var result__ = s.get().tasks.add(newTask.get());
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    
    var tmp1240 = mobl.ref(mobl._("save", []));
    
    var nodes410 = $("<span>");
    root455.append(nodes410);
    subs__.addSub((mobl.ui.generic.button)(tmp1240, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp1241, function(_, callback) {
      var root457 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root457); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes410;
      nodes410 = node.contents();
      oldNodes.replaceWith(nodes410);
    }));
    callback(root455); return subs__;
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes408;
    nodes408 = node.contents();
    oldNodes.replaceWith(nodes408);
  }));
  var nodes411 = $("<span>");
  root454.append(nodes411);
  subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
    var root458 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1249 = mobl.ref(false);
    
    
    var tmp1248 = mobl.ref(null);
    
    
    var tmp1247 = mobl.ref(null);
    
    var nodes412 = $("<span>");
    root458.append(nodes412);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1247, tmp1248, tmp1249, function(_, callback) {
      var root459 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1244 = mobl.ref([new mobl.Tuple("1", mobl._("Import&Urgent", [])), new mobl.Tuple("2", mobl._("Import&NotUrgent", [])), new mobl.Tuple("3", mobl._("NotImport&Urgent", [])), new mobl.Tuple("4", mobl._("NotImport&NotUrgent", []))]);
      
      
      var tmp1246 = mobl.ref(null);
      
      
      var tmp1245 = mobl.ref(null);
      
      var nodes413 = $("<span>");
      root459.append(nodes413);
      subs__.addSub((mobl.ui.generic.selectField)(mobl.ref(newTask, 'priority'), tmp1244, tmp1245, mobl.ref(styling.comboStyle), tmp1246, function(_, callback) {
        var root460 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root460); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes413;
        nodes413 = node.contents();
        oldNodes.replaceWith(nodes413);
      }));
      callback(root459); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes412;
      nodes412 = node.contents();
      oldNodes.replaceWith(nodes412);
    }));
    
    var tmp1257 = mobl.ref(false);
    
    
    var tmp1256 = mobl.ref(null);
    
    
    var tmp1255 = mobl.ref(null);
    
    var nodes414 = $("<span>");
    root458.append(nodes414);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1255, tmp1256, tmp1257, function(_, callback) {
      var root461 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1250 = mobl.ref(mobl._("description", []));
      
      
      var tmp1254 = mobl.ref(null);
      
      
      var tmp1253 = mobl.ref(null);
      
      
      var tmp1252 = mobl.ref(null);
      
      
      var tmp1251 = mobl.ref(null);
      
      var nodes415 = $("<span>");
      root461.append(nodes415);
      subs__.addSub((mobl.ui.generic.textField)(mobl.ref(newTask, 'description'), tmp1250, tmp1251, tmp1252, mobl.ref(styling.textStyle), mobl.ref(mobl.ui.generic.textFieldInvalidStyle), tmp1253, tmp1254, function(_, callback) {
        var root462 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root462); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes415;
        nodes415 = node.contents();
        oldNodes.replaceWith(nodes415);
      }));
      callback(root461); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes414;
      nodes414 = node.contents();
      oldNodes.replaceWith(nodes414);
    }));
    
    var tmp1260 = mobl.ref(false);
    
    
    var tmp1259 = mobl.ref(null);
    
    
    var tmp1258 = mobl.ref(null);
    
    var nodes416 = $("<span>");
    root458.append(nodes416);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(styling.dateStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1258, tmp1259, tmp1260, function(_, callback) {
      var root463 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      var nodes417 = $("<span>");
      root463.append(nodes417);
      subs__.addSub((mobl.ui.generic.datepicker.datePicker)(mobl.ref(newTask, 'finished'), function(_, callback) {
        var root464 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root464); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes417;
        nodes417 = node.contents();
        oldNodes.replaceWith(nodes417);
      }));
      callback(root463); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes416;
      nodes416 = node.contents();
      oldNodes.replaceWith(nodes416);
    }));
    callback(root458); return subs__;
    
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes411;
    nodes411 = node.contents();
    oldNodes.replaceWith(nodes411);
  }));
  callback(root454); return subs__;
  
  
  return subs__;
};

ui.editTask = function(t, callback, screenCallback) {
  var root465 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var dt = mobl.ref(mobl.DateTime.fromTimestamp(t.get().finished.getTime()));
  
  var eTask = mobl.ref(new model.Task({'created': t.get().created, 'description': t.get().description, 'finished': dt.get(), 'priority': t.get().priority}));
  
  var tmp1265 = mobl.ref(mobl._("edit", []));
  
  
  var tmp1266 = mobl.ref(null);
  
  var nodes418 = $("<span>");
  root465.append(nodes418);
  subs__.addSub((mobl.ui.generic.header)(tmp1265, tmp1266, function(_, callback) {
    var root466 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1262 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         var result__ = t.get().status;
                         var tmpstatus = result__;
                         model.StatusTM.getStatus(tmpstatus.number, function(result__) {
                           var tmp1341 = result__;
                           var result__ = tmp1341.tasks;
                           var tmp1340 = result__;
                           var result__ = tmp1340.remove(t.get());
                           var tmp1339 = result__;
                           var result__ = mobl.remove(t.get());
                           var result__ = mobl.add(eTask.get());
                           model.StatusTM.getStatus(tmpstatus.number, function(result__) {
                             var tmp1344 = result__;
                             var result__ = tmp1344.tasks;
                             var tmp1343 = result__;
                             var result__ = tmp1343.add(eTask.get());
                             var tmp1342 = result__;
                             if(screenCallback) screenCallback();
                             return;
                             if(callback && callback.apply) callback(); return;
                           });
                         });
                       });
    
    
    var tmp1261 = mobl.ref(mobl._("back", []));
    
    var nodes419 = $("<span>");
    root466.append(nodes419);
    subs__.addSub((mobl.ui.generic.backButton)(tmp1261, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1262, function(_, callback) {
      var root467 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root467); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes419;
      nodes419 = node.contents();
      oldNodes.replaceWith(nodes419);
    }));
    
    var tmp1264 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         var result__ = t.get().status;
                         var tmpstatus = result__;
                         model.StatusTM.getStatus(tmpstatus.number, function(result__) {
                           var tmp1347 = result__;
                           var result__ = tmp1347.tasks;
                           var tmp1346 = result__;
                           var result__ = tmp1346.remove(t.get());
                           var tmp1345 = result__;
                           model.StatusTM.getStatus(tmpstatus.number, function(result__) {
                             var tmp1350 = result__;
                             var result__ = tmp1350.tasks;
                             var tmp1349 = result__;
                             var result__ = tmp1349.add(t.get());
                             var tmp1348 = result__;
                             if(screenCallback) screenCallback();
                             return;
                             if(callback && callback.apply) callback(); return;
                           });
                         });
                       });
    
    
    var tmp1263 = mobl.ref(mobl._("save", []));
    
    var nodes420 = $("<span>");
    root466.append(nodes420);
    subs__.addSub((mobl.ui.generic.button)(tmp1263, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp1264, function(_, callback) {
      var root468 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root468); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes420;
      nodes420 = node.contents();
      oldNodes.replaceWith(nodes420);
    }));
    callback(root466); return subs__;
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes418;
    nodes418 = node.contents();
    oldNodes.replaceWith(nodes418);
  }));
  var nodes421 = $("<span>");
  root465.append(nodes421);
  subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
    var root469 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp1272 = mobl.ref(false);
    
    
    var tmp1271 = mobl.ref(null);
    
    
    var tmp1270 = mobl.ref(null);
    
    var nodes422 = $("<span>");
    root469.append(nodes422);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1270, tmp1271, tmp1272, function(_, callback) {
      var root470 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1267 = mobl.ref([new mobl.Tuple("1", mobl._("Import&Urgent", [])), new mobl.Tuple("2", mobl._("Import&NotUrgent", [])), new mobl.Tuple("3", mobl._("NotImport&Urgent", [])), new mobl.Tuple("4", mobl._("NotImport&NotUrgent", []))]);
      
      
      var tmp1269 = mobl.ref(null);
      
      
      var tmp1268 = mobl.ref(null);
      
      var nodes423 = $("<span>");
      root470.append(nodes423);
      subs__.addSub((mobl.ui.generic.selectField)(mobl.ref(t, 'priority'), tmp1267, tmp1268, mobl.ref(styling.comboStyle), tmp1269, function(_, callback) {
        var root471 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root471); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes423;
        nodes423 = node.contents();
        oldNodes.replaceWith(nodes423);
      }));
      callback(root470); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes422;
      nodes422 = node.contents();
      oldNodes.replaceWith(nodes422);
    }));
    
    var tmp1280 = mobl.ref(false);
    
    
    var tmp1279 = mobl.ref(null);
    
    
    var tmp1278 = mobl.ref(null);
    
    var nodes424 = $("<span>");
    root469.append(nodes424);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1278, tmp1279, tmp1280, function(_, callback) {
      var root472 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1273 = mobl.ref(mobl._("description", []));
      
      
      var tmp1277 = mobl.ref(null);
      
      
      var tmp1276 = mobl.ref(null);
      
      
      var tmp1275 = mobl.ref(null);
      
      
      var tmp1274 = mobl.ref(null);
      
      var nodes425 = $("<span>");
      root472.append(nodes425);
      subs__.addSub((mobl.ui.generic.textField)(mobl.ref(t, 'description'), tmp1273, tmp1274, tmp1275, mobl.ref(styling.textStyle), mobl.ref(mobl.ui.generic.textFieldInvalidStyle), tmp1276, tmp1277, function(_, callback) {
        var root473 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root473); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes425;
        nodes425 = node.contents();
        oldNodes.replaceWith(nodes425);
      }));
      callback(root472); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes424;
      nodes424 = node.contents();
      oldNodes.replaceWith(nodes424);
    }));
    
    var tmp1283 = mobl.ref(false);
    
    
    var tmp1282 = mobl.ref(null);
    
    
    var tmp1281 = mobl.ref(null);
    
    var nodes426 = $("<span>");
    root469.append(nodes426);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(styling.dateStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1281, tmp1282, tmp1283, function(_, callback) {
      var root474 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      var nodes427 = $("<span>");
      root474.append(nodes427);
      subs__.addSub((mobl.ui.generic.datepicker.datePicker)(mobl.ref(t, 'finished'), function(_, callback) {
        var root475 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root475); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes427;
        nodes427 = node.contents();
        oldNodes.replaceWith(nodes427);
      }));
      callback(root474); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes426;
      nodes426 = node.contents();
      oldNodes.replaceWith(nodes426);
    }));
    callback(root469); return subs__;
    
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes421;
    nodes421 = node.contents();
    oldNodes.replaceWith(nodes421);
  }));
  callback(root465); return subs__;
  
  
  return subs__;
};

ui.config = function(callback, screenCallback) {
  var root476 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  model.Preferences.loadPreferences(function(result__) {
    var prefs = mobl.ref(result__);
    
    var tmp1288 = mobl.ref(mobl._("config", []));
    
    
    var tmp1289 = mobl.ref(null);
    
    var nodes428 = $("<span>");
    root476.append(nodes428);
    subs__.addSub((mobl.ui.generic.header)(tmp1288, tmp1289, function(_, callback) {
      var root477 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1285 = mobl.ref(function(event, callback) {
                           if(event && event.stopPropagation) event.stopPropagation();
                           if(screenCallback) screenCallback();
                           return;
                           if(callback && callback.apply) callback(); return;
                         });
      
      
      var tmp1284 = mobl.ref(mobl._("back", []));
      
      var nodes429 = $("<span>");
      root477.append(nodes429);
      subs__.addSub((mobl.ui.generic.backButton)(tmp1284, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp1285, function(_, callback) {
        var root478 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root478); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes429;
        nodes429 = node.contents();
        oldNodes.replaceWith(nodes429);
      }));
      
      var tmp1287 = mobl.ref(function(event, callback) {
                           if(event && event.stopPropagation) event.stopPropagation();
                           var result__ = mobl.reload();
                           if(callback && callback.apply) callback(); return;
                         });
      
      
      var tmp1286 = mobl.ref(mobl._("save", []));
      
      var nodes430 = $("<span>");
      root477.append(nodes430);
      subs__.addSub((mobl.ui.generic.button)(tmp1286, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp1287, function(_, callback) {
        var root479 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root479); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes430;
        nodes430 = node.contents();
        oldNodes.replaceWith(nodes430);
      }));
      callback(root477); return subs__;
      
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes428;
      nodes428 = node.contents();
      oldNodes.replaceWith(nodes428);
    }));
    var nodes431 = $("<span>");
    root476.append(nodes431);
    subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
      var root480 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var tmp1295 = mobl.ref(false);
      
      
      var tmp1294 = mobl.ref(null);
      
      
      var tmp1293 = mobl.ref(null);
      
      var nodes432 = $("<span>");
      root480.append(nodes432);
      subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1293, tmp1294, tmp1295, function(_, callback) {
        var root481 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1291 = mobl.ref(function(event, callback) {
                             if(event && event.stopPropagation) event.stopPropagation();
                             if(callback && callback.apply) callback();
                             return;
                             if(callback && callback.apply) callback(); return;
                           });
        
        
        var tmp1290 = mobl.ref([new mobl.Tuple("en", "English"), new mobl.Tuple("es", "Español"), new mobl.Tuple("de", "Deutsch"), new mobl.Tuple("fr", "Français"), new mobl.Tuple("it", "Italiano"), new mobl.Tuple("pr", "Português"), new mobl.Tuple("da", "Dansk"), new mobl.Tuple("ho", "Nederlands"), new mobl.Tuple("se", "Svenskt"), new mobl.Tuple("tr", "Türk")]);
        
        
        var tmp1292 = mobl.ref(null);
        
        var nodes433 = $("<span>");
        root481.append(nodes433);
        subs__.addSub((mobl.ui.generic.selectField)(mobl.ref(prefs, 'lang'), tmp1290, tmp1291, mobl.ref(styling.comboStyle), tmp1292, function(_, callback) {
          var root482 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root482); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes433;
          nodes433 = node.contents();
          oldNodes.replaceWith(nodes433);
        }));
        callback(root481); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes432;
        nodes432 = node.contents();
        oldNodes.replaceWith(nodes432);
      }));
      
      var tmp1303 = mobl.ref(false);
      
      
      var tmp1302 = mobl.ref(null);
      
      
      var tmp1301 = mobl.ref(null);
      
      var nodes434 = $("<span>");
      root480.append(nodes434);
      subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1301, tmp1302, tmp1303, function(_, callback) {
        var root483 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1296 = mobl.ref(mobl._("database", []) + " (" + prefs.get().ctasks + ")");
        subs__.addSub(mobl.ref(prefs, 'ctasks').addEventListener('change', function() {
          tmp1296.set(mobl._("database", []) + " (" + prefs.get().ctasks + ")");
        }));
        
        
        var tmp1298 = mobl.ref(null);
        
        
        var tmp1297 = mobl.ref(null);
        
        var nodes435 = $("<span>");
        root483.append(nodes435);
        subs__.addSub((mobl.label)(tmp1296, tmp1297, tmp1298, function(_, callback) {
          var root484 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root484); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes435;
          nodes435 = node.contents();
          oldNodes.replaceWith(nodes435);
        }));
        
        var tmp1300 = mobl.ref(function(event, callback) {
                             if(event && event.stopPropagation) event.stopPropagation();
                             mobl.resetDatabase(function(result__) {
                               var tmp1351 = result__;
                               if(callback && callback.apply) callback(); return;
                             });
                           });
        
        
        var tmp1299 = mobl.ref(mobl._("reset", []));
        
        var nodes436 = $("<span>");
        root483.append(nodes436);
        subs__.addSub((mobl.ui.generic.sideButton)(tmp1299, mobl.ref(mobl.ui.generic.sideButtonStyle), mobl.ref(mobl.ui.generic.sideButtonPushedStyle), tmp1300, function(_, callback) {
          var root485 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root485); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes436;
          nodes436 = node.contents();
          oldNodes.replaceWith(nodes436);
        }));
        callback(root483); return subs__;
        
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes434;
        nodes434 = node.contents();
        oldNodes.replaceWith(nodes434);
      }));
      
      var tmp1309 = mobl.ref(false);
      
      
      var tmp1308 = mobl.ref(null);
      
      
      var tmp1307 = mobl.ref(null);
      
      var nodes437 = $("<span>");
      root480.append(nodes437);
      subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1307, tmp1308, tmp1309, function(_, callback) {
        var root486 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1304 = mobl.ref(mobl._("version", []) + " <b>1.4</b>");
        
        var nodes438 = $("<span>");
        root486.append(nodes438);
        subs__.addSub((mobl.html)(tmp1304, function(_, callback) {
          var root487 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root487); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes438;
          nodes438 = node.contents();
          oldNodes.replaceWith(nodes438);
        }));
        
        var tmp1306 = mobl.ref(function(event, callback) {
                             if(event && event.stopPropagation) event.stopPropagation();
                             var result__ = mobl.openUrl("http://www.mobilets.eu/timeM");
                             if(callback && callback.apply) callback(); return;
                           });
        
        
        var tmp1305 = mobl.ref(mobl._("updates", []));
        
        var nodes439 = $("<span>");
        root486.append(nodes439);
        subs__.addSub((mobl.ui.generic.sideButton)(tmp1305, mobl.ref(mobl.ui.generic.sideButtonStyle), mobl.ref(mobl.ui.generic.sideButtonPushedStyle), tmp1306, function(_, callback) {
          var root488 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root488); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes439;
          nodes439 = node.contents();
          oldNodes.replaceWith(nodes439);
        }));
        callback(root486); return subs__;
        
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes437;
        nodes437 = node.contents();
        oldNodes.replaceWith(nodes437);
      }));
      
      var tmp1317 = mobl.ref(false);
      
      
      var tmp1316 = mobl.ref(null);
      
      
      var tmp1315 = mobl.ref(null);
      
      var nodes440 = $("<span>");
      root480.append(nodes440);
      subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1315, tmp1316, tmp1317, function(_, callback) {
        var root489 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1310 = mobl.ref(mobl._("comments", []));
        
        
        var tmp1312 = mobl.ref(null);
        
        
        var tmp1311 = mobl.ref(null);
        
        var nodes441 = $("<span>");
        root489.append(nodes441);
        subs__.addSub((mobl.label)(tmp1310, tmp1311, tmp1312, function(_, callback) {
          var root490 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root490); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes441;
          nodes441 = node.contents();
          oldNodes.replaceWith(nodes441);
        }));
        
        var tmp1314 = mobl.ref(function(event, callback) {
                             if(event && event.stopPropagation) event.stopPropagation();
                             var result__ = mobl.openUrl("http://www.mobilets.eu/contact");
                             if(callback && callback.apply) callback(); return;
                           });
        
        
        var tmp1313 = mobl.ref(mobl._("submit", []));
        
        var nodes442 = $("<span>");
        root489.append(nodes442);
        subs__.addSub((mobl.ui.generic.sideButton)(tmp1313, mobl.ref(mobl.ui.generic.sideButtonStyle), mobl.ref(mobl.ui.generic.sideButtonPushedStyle), tmp1314, function(_, callback) {
          var root491 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root491); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes442;
          nodes442 = node.contents();
          oldNodes.replaceWith(nodes442);
        }));
        callback(root489); return subs__;
        
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes440;
        nodes440 = node.contents();
        oldNodes.replaceWith(nodes440);
      }));
      
      var tmp1324 = mobl.ref(false);
      
      
      var tmp1323 = mobl.ref(null);
      
      
      var tmp1322 = mobl.ref(null);
      
      var nodes443 = $("<span>");
      root480.append(nodes443);
      subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1322, tmp1323, tmp1324, function(_, callback) {
        var root492 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1321 = mobl.ref(null);
        
        
        var tmp1320 = mobl.ref(null);
        
        
        var tmp1319 = mobl.ref(null);
        
        var nodes444 = $("<span>");
        root492.append(nodes444);
        subs__.addSub((mobl.block)(mobl.ref(styling.configStyle), tmp1319, tmp1320, tmp1321, function(_, callback) {
          var root493 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          
          var tmp1318 = mobl.ref(mobl._("help", []));
          
          var nodes445 = $("<span>");
          root493.append(nodes445);
          subs__.addSub((mobl.html)(tmp1318, function(_, callback) {
            var root494 = $("<span>");
            var subs__ = new mobl.CompSubscription();
            callback(root494); return subs__;
            return subs__;
          }, function(node) {
            var oldNodes = nodes445;
            nodes445 = node.contents();
            oldNodes.replaceWith(nodes445);
          }));
          callback(root493); return subs__;
          
          return subs__;
        }, function(node) {
          var oldNodes = nodes444;
          nodes444 = node.contents();
          oldNodes.replaceWith(nodes444);
        }));
        callback(root492); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes443;
        nodes443 = node.contents();
        oldNodes.replaceWith(nodes443);
      }));
      
      var tmp1329 = mobl.ref(false);
      
      
      var tmp1328 = mobl.ref(null);
      
      
      var tmp1327 = mobl.ref(null);
      
      var nodes446 = $("<span>");
      root480.append(nodes446);
      subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp1327, tmp1328, tmp1329, function(_, callback) {
        var root495 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp1326 = mobl.ref("_BLANK");
        
        
        var tmp1325 = mobl.ref("http://www.mobilets.eu");
        
        var nodes447 = $("<span>");
        root495.append(nodes447);
        subs__.addSub((mobl.link)(tmp1325, tmp1326, function(_, callback) {
          var root496 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root496); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes447;
          nodes447 = node.contents();
          oldNodes.replaceWith(nodes447);
        }));
        callback(root495); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes446;
        nodes446 = node.contents();
        oldNodes.replaceWith(nodes446);
      }));
      callback(root480); return subs__;
      
      
      
      
      
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes431;
      nodes431 = node.contents();
      oldNodes.replaceWith(nodes431);
    }));
    callback(root476); return subs__;
    
    
  });
  return subs__;
};



mobl.provides('model');

model.Preferences = persistence.define('model__Preferences', {
  'lang': 'VARCHAR(255)',
  'cstatus': 'INT',
  'ctasks': 'INT'
});

model.Preferences.initAll = function(callback) {
                          model.Preferences.all().count(function(result__) {
                            var tmp12 = result__;
                            var result__ = tmp12 == 0;
                            var tmp11 = result__;
                            var result__ = tmp11;
                            if(result__) {
                              {
                                var result__ = new model.Preferences({'lang': "en"});
                                var prefs = result__;
                                var result__ = mobl.add(prefs);
                                var result__ = new model.StatusTM({'number': 1, 'name': "someday"});
                                var status1 = result__;
                                var result__ = mobl.add(status1);
                                var result__ = new model.StatusTM({'number': 2, 'name': "todo"});
                                var status2 = result__;
                                var result__ = mobl.add(status2);
                                var result__ = new model.StatusTM({'number': 3, 'name': "progress"});
                                var status3 = result__;
                                var result__ = mobl.add(status3);
                                var result__ = new model.StatusTM({'number': 4, 'name': "done"});
                                var status4 = result__;
                                var result__ = mobl.add(status4);
                                model.Preferences.all().one(function(result__) {
                                  var tmp13 = result__;
                                  var result__ = tmp13;
                                  var aprefs = result__;
                                  model.Preferences.all().one(function(result__) {
                                    var tmp15 = result__;
                                    var result__ = tmp15.lang;
                                    var tmp14 = result__;
                                    var result__ = tmp14;
                                    aprefs.lang = result__;
                                    model.StatusTM.all().count(function(result__) {
                                      var tmp16 = result__;
                                      var result__ = tmp16;
                                      aprefs.cstatus = result__;
                                      model.Task.all().count(function(result__) {
                                        var tmp17 = result__;
                                        var result__ = tmp17;
                                        aprefs.ctasks = result__;
                                        var result__ = aprefs;
                                        if(callback && callback.apply) callback(result__);
                                        return;
                                        if(callback && callback.apply) callback(); return;
                                      });
                                    });
                                  });
                                });
                              }
                            } else {
                              {
                                model.Preferences.all().one(function(result__) {
                                  var tmp13 = result__;
                                  var result__ = tmp13;
                                  var aprefs = result__;
                                  model.Preferences.all().one(function(result__) {
                                    var tmp15 = result__;
                                    var result__ = tmp15.lang;
                                    var tmp14 = result__;
                                    var result__ = tmp14;
                                    aprefs.lang = result__;
                                    model.StatusTM.all().count(function(result__) {
                                      var tmp16 = result__;
                                      var result__ = tmp16;
                                      aprefs.cstatus = result__;
                                      model.Task.all().count(function(result__) {
                                        var tmp17 = result__;
                                        var result__ = tmp17;
                                        aprefs.ctasks = result__;
                                        var result__ = aprefs;
                                        if(callback && callback.apply) callback(result__);
                                        return;
                                        if(callback && callback.apply) callback(); return;
                                      });
                                    });
                                  });
                                });
                              }
                            }
                          });
                        };
model.Preferences.loadPreferences = function(callback) {
                          model.Preferences.all().one(function(result__) {
                            var tmp18 = result__;
                            var result__ = tmp18;
                            if(callback && callback.apply) callback(result__);
                            return;
                            if(callback && callback.apply) callback(); return;
                          });
                        };

model.Task = persistence.define('model__Task', {
  'description': 'VARCHAR(255)',
  'created': 'DATE',
  'finished': 'DATE',
  'priority': 'VARCHAR(255)'
});

model.Task.prototype.setFinishedStatus = function(d) {
                                     var __this = this;
                                    __this.finished = d;
                                    return d;
                                  };

model.StatusTM = persistence.define('model__StatusTM', {
  'number': 'INT',
  'name': 'VARCHAR(255)'
});

model.StatusTM.getStatus = function(n, callback) {
                          (model.StatusTM.all().filter("number", "=", n)).list(function(result__) {
                            var tmp21 = result__;
                            var result__ = tmp21.get(0);
                            var tmp19 = result__;
                            var result__ = tmp19;
                            if(callback && callback.apply) callback(result__);
                            return;
                            if(callback && callback.apply) callback(); return;
                          });
                        };
model.StatusTM.hasMany('tasks', model.Task, 'status');









    try{
		            //we replace default localStorage with our Android Database one
		            window.localStorage=LocalStorage;
		            persistence.store.memory.config(persistence);    
		        }catch(e){
		            //LocalStorage class was not found. be sure to add it to the webview
					alert("LocalStorage ERROR : can't find android class LocalStorage. switching to raw localStorage")		        
				}
	/*			
    if (window && window.google && google.gears || window.openDatabase) {
      try {
        persistence.store.websql.config(persistence, 'timemanagement', 'mobl database', 1024 * 1024, '1.0');
      } catch(e) {
        alert("Could not connect to the database, sometimes a refresh helps.");
      }

      persistence.search.config(persistence, persistence.store.websql.sqliteDialect);
    } else {
      persistence.store.memory.config(persistence);
    }
    */
    













    mobl.icon = "img/default-icon.png";
    $(function(){
      persistence.schemaSync(function(tx) {
        if(persistence.loadFromLocalStorage) {
          persistence.loadFromLocalStorage();
        }
        $("#mobl-loading").remove();
        mobl.call("TimeManagement.root", [mobl.ref(false), mobl.ref("none")], function() {});
      });
    });
    

mobl.provides('TimeManagement');
mobl.provides('mobl.ui');
mobl.provides('mobl.ui.generic');
persistence.debug = false;
TimeManagement.root = function(callback, screenCallback) {
  var root507 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  model.Preferences.initAll(function(result__) {
    var conf = mobl.ref(result__);
    mobl.fetchLanguageBundle("lang/" + conf.get().lang + ".json", function(result__) {
      var tmp1367 = result__;
      
      var controlSomeday = function(elements, callback) {
        var root508 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        model.StatusTM.getStatus(1, function(result__) {
          var tmp1362 = mobl.ref(result__);
          subs__.addSub(mobl.ref(model.StatusTM).addEventListener('change', function() {
            model.StatusTM.getStatus(1, function(result__) {
              var tmp1368 = result__;
              var result__ = tmp1368;
              tmp1362.set(result__);
              
            });
          }));
          
          var nodes453 = $("<span>");
          root508.append(nodes453);
          subs__.addSub((ui.column)(tmp1362, mobl.ref(styling.somedayColStyle), function(_, callback) {
            var root509 = $("<span>");
            var subs__ = new mobl.CompSubscription();
            callback(root509); return subs__;
            return subs__;
          }, function(node) {
            var oldNodes = nodes453;
            nodes453 = node.contents();
            oldNodes.replaceWith(nodes453);
          }));
          callback(root508); return subs__;
          
        });
        return subs__;
      };
      
      var controlTodo = function(elements, callback) {
        var root510 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        model.StatusTM.getStatus(2, function(result__) {
          var tmp1363 = mobl.ref(result__);
          subs__.addSub(mobl.ref(model.StatusTM).addEventListener('change', function() {
            model.StatusTM.getStatus(2, function(result__) {
              var tmp1369 = result__;
              var result__ = tmp1369;
              tmp1363.set(result__);
              
            });
          }));
          
          var nodes454 = $("<span>");
          root510.append(nodes454);
          subs__.addSub((ui.column)(tmp1363, mobl.ref(styling.todoColStyle), function(_, callback) {
            var root511 = $("<span>");
            var subs__ = new mobl.CompSubscription();
            callback(root511); return subs__;
            return subs__;
          }, function(node) {
            var oldNodes = nodes454;
            nodes454 = node.contents();
            oldNodes.replaceWith(nodes454);
          }));
          callback(root510); return subs__;
          
        });
        return subs__;
      };
      
      var controlProgress = function(elements, callback) {
        var root512 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        model.StatusTM.getStatus(3, function(result__) {
          var tmp1364 = mobl.ref(result__);
          subs__.addSub(mobl.ref(model.StatusTM).addEventListener('change', function() {
            model.StatusTM.getStatus(3, function(result__) {
              var tmp1370 = result__;
              var result__ = tmp1370;
              tmp1364.set(result__);
              
            });
          }));
          
          var nodes455 = $("<span>");
          root512.append(nodes455);
          subs__.addSub((ui.column)(tmp1364, mobl.ref(styling.progressColStyle), function(_, callback) {
            var root513 = $("<span>");
            var subs__ = new mobl.CompSubscription();
            callback(root513); return subs__;
            return subs__;
          }, function(node) {
            var oldNodes = nodes455;
            nodes455 = node.contents();
            oldNodes.replaceWith(nodes455);
          }));
          callback(root512); return subs__;
          
        });
        return subs__;
      };
      
      var controlDone = function(elements, callback) {
        var root514 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        model.StatusTM.getStatus(4, function(result__) {
          var tmp1365 = mobl.ref(result__);
          subs__.addSub(mobl.ref(model.StatusTM).addEventListener('change', function() {
            model.StatusTM.getStatus(4, function(result__) {
              var tmp1371 = result__;
              var result__ = tmp1371;
              tmp1365.set(result__);
              
            });
          }));
          
          var nodes456 = $("<span>");
          root514.append(nodes456);
          subs__.addSub((ui.column)(tmp1365, mobl.ref(styling.doneColStyle), function(_, callback) {
            var root515 = $("<span>");
            var subs__ = new mobl.CompSubscription();
            callback(root515); return subs__;
            return subs__;
          }, function(node) {
            var oldNodes = nodes456;
            nodes456 = node.contents();
            oldNodes.replaceWith(nodes456);
          }));
          callback(root514); return subs__;
          
        });
        return subs__;
      };
      
      var tmp1366 = mobl.ref([new mobl.Tuple(mobl._("wait", []), "", controlSomeday), new mobl.Tuple(mobl._("todo", []), "", controlTodo), new mobl.Tuple(mobl._("progress", []), "", controlProgress), new mobl.Tuple(mobl._("done", []), "", controlDone)]);
      subs__.addSub(mobl.ref(controlSomeday).addEventListener('change', function() {
        tmp1366.set([new mobl.Tuple(mobl._("wait", []), "", controlSomeday), new mobl.Tuple(mobl._("todo", []), "", controlTodo), new mobl.Tuple(mobl._("progress", []), "", controlProgress), new mobl.Tuple(mobl._("done", []), "", controlDone)]);
      }));
      subs__.addSub(mobl.ref(controlTodo).addEventListener('change', function() {
        tmp1366.set([new mobl.Tuple(mobl._("wait", []), "", controlSomeday), new mobl.Tuple(mobl._("todo", []), "", controlTodo), new mobl.Tuple(mobl._("progress", []), "", controlProgress), new mobl.Tuple(mobl._("done", []), "", controlDone)]);
      }));
      subs__.addSub(mobl.ref(controlProgress).addEventListener('change', function() {
        tmp1366.set([new mobl.Tuple(mobl._("wait", []), "", controlSomeday), new mobl.Tuple(mobl._("todo", []), "", controlTodo), new mobl.Tuple(mobl._("progress", []), "", controlProgress), new mobl.Tuple(mobl._("done", []), "", controlDone)]);
      }));
      subs__.addSub(mobl.ref(controlDone).addEventListener('change', function() {
        tmp1366.set([new mobl.Tuple(mobl._("wait", []), "", controlSomeday), new mobl.Tuple(mobl._("todo", []), "", controlTodo), new mobl.Tuple(mobl._("progress", []), "", controlProgress), new mobl.Tuple(mobl._("done", []), "", controlDone)]);
      }));
      
      var nodes457 = $("<span>");
      root507.append(nodes457);
      subs__.addSub((mobl.ui.generic.tabSet)(tmp1366, function(_, callback) {
        var root516 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root516); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes457;
        nodes457 = node.contents();
        oldNodes.replaceWith(nodes457);
      }));
      callback(root507); return subs__;
      
      
      
      
      
    });
  });
  return subs__;
};


mobl.provides('styling');
styling.todoColStyle = 'styling__todoColStyle';
styling.progressColStyle = 'styling__progressColStyle';
styling.doneColStyle = 'styling__doneColStyle';
styling.somedayColStyle = 'styling__somedayColStyle';
styling.taskDescriptionStyle = 'styling__taskDescriptionStyle';
styling.dateTaskStyle = 'styling__dateTaskStyle';
styling.configStyle = 'styling__configStyle';
styling.taskCmdStyle = 'styling__taskCmdStyle';
styling.iconCmdStyle = 'styling__iconCmdStyle';
styling.aboutStyle = 'styling__aboutStyle';
styling.comboStyle = 'styling__comboStyle';
styling.textStyle = 'styling__textStyle';
styling.dateStyle = 'styling__dateStyle';


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
    var value8 = value.get();
    if(oldValue0 === value8) return;
    oldValue0 = value8;
    var subs__ = condSubs0;
    subs__.unsubscribe();
    node6.empty();
    if(value8) {
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
      
      var tmp26 = mobl.ref(null);
      
      
      var tmp25 = mobl.ref(null);
      
      
      var tmp24 = mobl.ref(null);
      
      var nodes5 = $("<span>");
      node6.append(nodes5);
      subs__.addSub((mobl.block)(style, tmp24, tmp25, tmp26, function(_, callback) {
        var root12 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp15 = mobl.ref(null);
        
        
        var tmp14 = mobl.ref(null);
        
        var nodes6 = $("<span>");
        root12.append(nodes6);
        subs__.addSub((mobl.label)(loadingMessage, tmp14, tmp15, function(_, callback) {
          var root13 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root13); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes6;
          nodes6 = node.contents();
          oldNodes.replaceWith(nodes6);
        }));
        
        var tmp17 = mobl.ref("middle");
        
        
        var tmp16 = mobl.ref("data:image/gif;base64,R0lGODlhIAAgAOf2AAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19f///////////////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQD/ACwAAAAAIAAgAAAI/gABCBxIsKDBgwgTKlzIsKHDhxAjSiSoYc+bCBMFbqCSY4DAApTgyQOUcUGkZcXAeHxQLB49SgI+xnSYAdYxZsjCDHgQLN48NAEEaFAh4oDDA3+EIXO2rAiAN96owQBQ4YVVCg87XBKWLNofAAROlAgAwIPVFxAgmrAkzJgWgxZcvADhESKGKk2MFhTgIAKBhwweNCjAMICBvwoPHMkDCNCYBwoLhFhxIm3CFYEIGUKkiIfCC2dLzDyI4k6e03hqKLQQerTBAkHCgOFCREHkDydGQFYoYAGDBK4RBiX78ACFBsQJBoAAIThDAyVguMBaEIPcEIgbBjBrtQOAAAoSTAgEcXZ3QwEnrLqQAMD6CgdUz1J3yOFFCwwBBqR/ESJoBhUk6OXQABAwQBYBKVhFAnEF1JURAB9YhcGDByHgwQUOUqjhhhx26KGGAQEAIfkEBQUA/wAsBQADABQAGAAACMwA/wkcSDDABg8BCCpc+I+KMmhKGEpcAAsdu1MFJGZwUmOgg14WgS1gqIDQLltZBoJsB0wBwwugbPXSpeXfAlro3LXKONCAQANzYt361QvIPzXZvHlROGGghkSxcgm7IzBGjQESBYpAFMsWlawMLTQx4hOsQAUNFhAwOzBAjTJs2lRhwPYfhDBs3MCRI6NuAilfAn9RUReACCFIisxAUBgAAQQGEtZVaKDp5IEkXjQGAIDDZYIlPg+84EL0PwEOTC/0ILDCZwMZKAhYGBAAIfkEBQUA/wAsBQADABIAFgAACMsA/wkcSBBDnDMQCCokGOBPt295FkpsEKubOFsKFlowAkOAwAi4uo3zxUBhgjupTEXx6GCWyFwCCTgQSOERqVWqpghQsKobuVP/GADSIrCAmU6lWrXa8e8MtWtb/r3pVGPghTyeTsFq8+9ADh3/Aqj5odADHk+lmiwMIXECEbISCRJQkCBAXIIAMBSxYgVIxrv/BuyQQsVKFhOAA9MgwpjIh8T/IKx40SJEAcj/BBQggLlz3Mue/2UIHWBE6H8UWEAGwJq1gr8ERRAMCAAh+QQFBQD/ACwFAAMAFAAWAAAIzgD/CRxI8IKaMA8IKlz47w60aXMYSmRgCpq1VhL/GUhBYiAEVtCu1VrAcEAVSJKSCGyAKiSsBAI3OBho4M2jS5iWCPwEDdsngYSswfogMMAURJA0bbLxLwwyZlf+tXFHLx2QgRTOIJLUSYxGGzcEbqL3jY4EghnMIIpEZOEcaGUYQtBxo8BCBCIUCjBwICPDBC14/IDR169AACBs4NDRI4Phwx1gSIYx4bFABCBUpPBAwHJRz6BDh8bAsLBCAKgBeGCowjCEFSxE/zuAwHJAACH5BAUFAP8ALAYAAwATABgAAAjSAP8JHDiwwhcpDggqXNgGWDE2CyP+W5AJGDJRCRQC2KiAwUYADjwFQ6Zq4UYOZuT4EMhAU7BkpgZqmPBvoxA8gQYF+ZdAUrBllggs+OOsVomNM+DkIYToxb8suX5J+ZemHLt3ZwQ2oBJnDyIrAmXMEGiJHbx3UwZSmNJ1x8I36uKRgkCwwQsXBBYqQHLFgsAABAh8HEwYgMACHlKo+JBXIkEKLyK/iOD4seQXEioPLPBBYIcBmkOLHk1a4oXSnlH/Y4BihWYRCgsY0BxAdejTEQMCACH5BAUFAP8ALAYAAwAVABYAAAjMAP8JHDhwgpUlCwgqXChwzCtaWhhK/KdA0atblhAwBMARQICBDRy9wtVJgUAFLTgQJDBjyYuPCxa9yqVJYwZI1X7JGOihC5o2NwIgGPRqFyOBj76NMxdnYAcrYNjIQfEPSipYTP6d2bb0HJSBCX5cEQMnyb8CLl4IOABKnLl0nyAQfNDjypgYC+eUSwcKw8IEI0YMWAjhypcKAzlO/PvAwD8BGFCg6LD4nwEbNlA4kFtZ4oPOEgWoBD1QRAPSqFOrXs1wA2uKJ14TSB0QACH5BAUFAP8ALAYAAwAWABYAAAjdAP8JHDiwAAsWAggqBMCwYcMlljYVUUiRYoI8m0oFKlDxn0OHC/pwMvUogcAERqI8ENjwwgsOJ/NwOsXowL8LiJxZo0NwgQ8nVFj8OzCHE6o/Ag1Ju7bNFIKBDXIUiaIFxD8jlj5NDOOMabczBAmY2HHEig6BKVb8M2DJ2rZvmFYSTIBiRxITFNlo+5bpQkUDFzIkVPhgyhYKHRMTVPDB778AihV6SMXtGJJ/DFxEHuiGnDZqmxIs0Lz534klQnioeJwhRYrSAxd4BECAAOzbuHPr3r1ZhWPdBRjCDggAIfkEBQUA/wAsBgADABYAFQAACNQAAQgcSFDBAYIIAfxbyJDhCDZoRDScSHEhAS6GIHFJOLDivwNnDEXSc2AhgiBLHEw0YCGCSTOGJAVC8K+CH2DI2jQcQGJGjg//DIQxRIlOAQV8iCVz1qmkyRYwbPzA8C+Hn0U2/mn5hcwZtDANBYh4EUOHin8COoRYuKirNEgqJ5ogq4FimWbTIlXwWEFCAIoOnliZ4LFwwwQeLDBUbJhhh1HVghn5l6BFY4Z13sGDx2tB5csL6dAbfUsBaIYcENGapeP0xAM0XcueTbu27X8hDDAMCAAh+QQFBQD/ACwGAAMAFgAVAAAIywABCBxIsKBBAP8SKlS4AEcOBgsjSkwo4IebPEUmakxoQIobPWgMKORRpEHEAQ0WCDwwxQ2fNwf+TZgDCxeZhQE8uGBRAeETN37IEEgQZ1YuX5EWFlDx4kWLB/9aoLnj4l8UV7h8CdMisekLDv8CYABb4M8tX8MMmZzogoLELr2IHXI7kQJUiQ2SQJGwsa/CDhUSAgjsN+EGTsx6MfmHgEXhhHDMnTtXS0Hjx//gsNtsK6EFFI83eDImawlmpXdPq17NurXrfx8KKAwIACH5BAUFAP8ALAYABAAXABMAAAjSAP8JHDhQAIYMAQgq/AegoUOHJaJoUbGwokICO6iEiTJA4IEWPhgsDKAggcACPKiM2WLgXwQznExtGegQw78VAgngoFJmygAEZD6dakWoZUETCkNAAYMUySZTrWJNodnww0IJFwIQiFOq1aw9Ii3+k7BwCitafMiKtchgiJIIa+P+Q8CBRAWjcgeGmBQsGa9HEg7gzNtnGzdu3bQZMTBY7h1xkMVxOwKAwom8HDD98uVLDgKBHfP+c0A6tOgdUhyIXijk0SYKqxXGEPMi9sIKBAMCACH5BAUFAP8ALAYABAAYABUAAAjRAAEIHEhQAQKCCAf+W8iQoYUZPDA0nEix4YATOIzsELDQQIkQHCsmMLBwQAocSIwQ+OcAC6JENipaaKGiJEYlQAQYqKJIUqYwBCsutGDjiId/PQxFyuQpidCGAhlEWBgGUiZQbhY8fZoEUyg4U7cKVcBjyAOxaP9pEBECQtqJJRzR4tXL04u3CwPwaebsGTRokgoQQPHWj7XDhyWtnPD2Q6RatWg5IoyXYYPLBSoniBKl8kQx7tqV8szwhq5675yQXnhkWD0zqxcaKdQhdkmKAQEAIfkEBQUA/wAsBgAEABgAFQAACNgA/wkcSLAAAYIIEyZ8kOIEA4UQCQoo8QJGiQACBSQwAKCjR48FCJ6o2ELAvwVBylB5mDBCCoQvYrD4V8DInD2CXiQMMCIhixcU/sl4o2cQIRMRBWoQqGABgAFQ8gxS5CVkUggJewhiJMZB0ogJaOho8LXsAQwfPjwYOKGsQBGCSrFyJWnFPwIo3P6b4+sXMGDBDh3U+88OMmTHDiMSiNVtB0SrVKUqhJQwQgaD9SJw4oSsZYEB8pwr96nt5wGk4rU7t+SzQDfw4rkT4/rkIGudagsksOFAwoAAIfkEBQUA/wAsBwAEABYAFQAACMIA/wkcODBAAIIIExJkICLEAYUQBQYI8eLFBgAYAQTIiDFixRICDaz4geIgQQcJK44IQIBGFjFhIiAEMRDlPxYsIPwjUSXMGjUTEHYYmEEgAgX/AuwAs2bOEwIRFcZQU2cKg6gKD6RgsQBrVAMVOGxo8E+n138e6lDa1InQibMC0bBq5eoVrD1w/7G5xZdvn7wb/Hjq1GnPiLz/CDBYjFiJEsQD63TTdkkC5E/oyHFDAnkNusxeIP/78wwVSNEaEiAMCAAh+QQFBQD/ACwIAAQAFgAXAAAIzQD/CRw4EIDBgwgPEhy4IMSHhRAj/gNRMGFCiQsHYCgB4SJGgQJC8DiSQwBBAB4+XtBhBMqSAws5SDRYoggULTkCLDxQAiOIJ1yEKPgYccCHEQmIfiwgAQMGBEoJajATCFEiNyKiCuSCKdMmTpzcDNAaplQpUmbhjI2KYc6jR47ePNQqcMGCoVohXJnigO5AOtWeObKgNUKAA6i6YZvGiEHUR0z+ufHWLRu0IVERrSrw7xG4yl2iltn8T8KhZ7ZWRKVSZmCBEhi0ZsCLMSAAIfkEBQUA/wAsCQAEABUAFwAACNgAAQgcSLCgwX8IEx7woKFAwocQIX5AmCGiRQIWEQp4QAHjwwYnUmT818EFjA8BRkas8AJGDRcCHmpQ6cGlDxEFDai0UAMIDIcqIQqokEFn0IwEHkxoYPToPwtV2Mh5s6WC039OBA0qZOiQEgBOqUAaO7YJ2KMVzPzx4yfMhKv/BiSYO8ApBStMGsBF+AZZsEEUggqYUeLfgn/QlBET5EClCGXXlPxLMw3aMmJeVLpIJs/UPwWHqEFjZunAyBrU5CWsEGmaMzSas8FjkxACkyV6R0KYoyb3yIAAIfkEBQUA/wAsCQAFABQAFgAACMsA/wkcaADDBQIDEypcyHDhgIYDGzQQkHCBCRQQ/7lwcQGARwAcMv57QXJEgIEZRJJ8UUGkQpIgHrocCCECwpkKByx4kMDjTAdArGyxIoOiwI9IP/JIs6aNmzMRZv7IQzXPmwkzIVxxA8eMjJM4ESw44DOjBCdFGOAUeAYXrDsSMiKwQeKfgk7BdNGy06BhgD3mnh35J6ZYsF20rDSEoAxeuk//EvwxFoyXIgMML0iDp46UwAmIiv0C03DAJsdoBj44YkRtQw90zogMCAAh+QQFBQD/ACwIAAUAFQAWAAAIswD/CRz4rwDBgwgPekjIsKHAAAoUAJg40eHADf9YRLAoUMWDgx8oAmB44ADHkyhTohSAQIEBlQha9BCyw8LIkyqeRJlCZcgAlDLACAVzhECJkw2QZMHSBAMAASsPGPh5MoKRHgpU/utiipMaCBxpiPiXABIsVKHSLHB4p1uxIf+20IKVKlQTh8TOfbsksE4tWKr4NLTA7Bw4TgIl9Jnl6opDS+e8jRnoAAeQtQ07vBHDwGFAACH5BAUFAP8ALAkABQAUABgAAAjRAP8JHCiwwgCCCP8BWMiQQ8KHEBEmMBAxYgsVDipGdKixY0cXHhNmDJkwgAEDAkgaCLGChQgEITnQqHEDxwcAHkcU2VmEBM6OCWwQGSIjAcl/BQqk7OiABw2jD2XoYMhwSqRDW0YKpCBwTiOBOmAMQCCI06RFWxQgvAKtyz851IYh+SdFFKdKjYIQdNFJD4IHvLZJSyQAgZpRnCydOSgQQYaDH55xm/bvwD8IcUBtagJRQzJu1DhZ/sdARg61Dx/Y4latz1Eqw2jhOBqAwwWNAQEAIfkEBQUA/wAsCQAFABMAGAAACMwA/wkc+O8CBYIIExK8oLChwgMOHbJAoSDivxQJNVgsYLGjx48fCQQAKTDFBwIeM7xY+QJCShgwXzzwaIBEixUfBnwMMGDAyIEjECRM8EIFRIIl1jxDk9BIHjhKFgy0cEecPEn/DtxoIeCAHEN96CwR+k/LuXnptPxjc6yWkH9IHBnyY8eGQBzIqtn550CWs2F+snZxdOgPEwAACnIQiMGXs2KQDPD9osiPDIUXejkzNklyVhUjBCikgMvZMUUoOw44tPkKSA1jrkhtGBAAIfkEBQUA/wAsCQAFABMAGAAACMMA/wkc+K/CBIIIEypcyHCgAQINFa4wgSCiQgsWE0LIyLGjRwAAPP7TIECkCwcZLbxY6aJBxgIfTpioEKCjAAEg/4UgU0ThARIfChD0sGueOTIJc4SxgqOiQDXy3qlrJHBGin8EtLwhs8UGxH+K3q0DZ+VfGVyldvzzceeNGS4cBNoI1kyOQFO/ZMkJYOBJWzMhBlrQINBCrF+0BAlUoAQNEgUXD9cyNHBAgwEgQxKUsOqXLT8DOPb5VetJRwxcoEBeGBAAIfkEBQUA/wAsCQAHABMAFgAACLcA/wkcSPAfAAAFBhRcWFCDChIHGEqcSLGixYsYM2q8EEDjPxYRNa4IibGEBAAeB4IQM4TkwAEYKCgc2KHWum5gFqoosoNEgYFz1JkDZ+ifARck/gUYUiXJjxEd/x0yF65alH9dTk2i8S/GlypLfCgQSCPXMDYHGGRq9YnMvwJAvFQhkmBghQwCKYxqFWrOTwQugoA4iJIgBVGtRtkpQFgA4cIDI3RqRQoORgFzEh/JaGEKkroSAwIAIfkEBQUA/wAsBwAHABUAFgAACMwA/wkcSLDgPwEGEyYUYUChw4EQHj58ILGixYsYMxYYWAEAxgsDVRhg0UOIE5AWRdoYdStRA4sjBjaosNFigIIfzERRYFDAhAkJR7gKZ02MQQ4wXoQoiGEUOG3T/vwrgOJDgAAwcsR4sQGA139ivmmrlswKgCmU/rD4R4KIVhQDBv7ZZs1ZnX8LFGVSVOXfgBdDcpRAKFAGrF9sXkqYpImRGAL/DIQIsaAghQ6Q/0mIpMlRGQJeQ4dO+KCRpkdgMv4Lc7qHaghFdiBwGBAAIfkEBQUA/wAsBgAOABYADwAACLwA/1lYkeKfwYMIE/6bIFCVLUqAVCic+A8FAQzO6NGLx4WiwhMD/lHx1WwSBI8JHyCkgLLlvw5gmrhUGKIUtWRbFGJ48WKihU3TmhWrY1CEhn8ARPB8kQFhADnSmhnT9eRfkj9pRvy7sLSEgIMKUDU79kuMAQV5CMkh8k9ABxcvOACY+2+AnmPB4ij4BwEQoTpPQgp4MIFASiNEGBh84IfQnSghZxpMYIcQHiUBJB9EEkiOCc0HDZj4kJliQAAh+QQFBQD/ACwGAAcAFgAWAAAIzAD/CRxIsOA/AgYHkkg4EAMKhhAjSpxIsaLFgRUsDLj4L0AVZtEyYagYQeCyeCivVDwx4AIyduzUaalYQsC/KLeKOeIokMEEngQ5aEGSwGAACBBsGvywyViuKQldMKwQiVgvWmoOYvj5LwRENcN62UJ15F+PM1E0/LMwUEQAgpx63XKVpQACM2uyyADwj8O/FhUICohzC5aZohHesNmyQ6kDBm8JOgDiY4FAB2vYdOmhtOIBLmy+wABAurTp06U/TBFSkiFq0wUEvC4dEAAh+QQFBQD/ACwGAA0AFgAQAAAIsAD//aNQQaDBgwgRSjG2rNKFhBBPQPhXgRi6dOmoQIRYQoCFX+LEgbuysWQTV7wOPSjJUgLLl/8yTAmCACbCDo5qoVrCkgDCCYVosQrl5d8ACQwAADhoAWEYWaxGVfLxL0aTGysPdlC6NIEjVqQ0Ofl3IEqUHiAMtmAx8aAZUpuw1HSQJQoQEwEELlDAdem/BjlqGBCoYIoUIXhtGgywQ8oQDYoPMlDhYUDJvpgzaw4IACH5BAUFAP8ALAUACQAWABMAAAjDAP8J/FekxsCDCBMK3CPJoMKHA0PkgjQDokUQYjRYRGhgwoV/BzYivPBIGLJilyyIFOjACzdu3bx9C7NSoBZrOK1V61JzBIZFuHLJIkRhpYgF/wpYwDCBQE2FF5boCPn0n4ZAoigFqRoBTyhMjKD8E8AgAUQAaK98wuQIEI1/I2iscIBQ40AEfzBBKjSEQIEdNmCECCCQBQqkB7VAMrQkJIIegUsIDHCgQMIFMlpYToojsIiqAkPQaAEB9NgHDNCqXh0QACH5BAUFAP8ALAQABwAYABUAAAjaAP8JHNigwMCDCBMOxIHrjMKHCRvRc4YEosV/f+LR+8Th4kMQu+J9m+Hx4YczTAyWHCjBAoWVCHdgutVrF6QLKxv8U/Dp2TNo0aS5WTkiQIJLyJImDbNSRIB/NS6tYlVKD86SCgYqqGAhAkyIFITMMPB14IU4jfzYKPvvQZpFguoE+Rcgq0AQLBUyUSToDhoV/zC4GFhhYIaEBMoIytPGxoABKF68MLziRIKBADID8FGHTQ+DBVRIJvEvM9mHBDxwGCBwwAnJHzTLnk07s4UVKBhArD3bgMqHAQEAIfkEBQUA/wAsBAAHABUAFQAACLYA/wkc+MBCgIEIEya08c8ZmwEDFEoUiIgdPHRIJk7Uk65dPEAaJX6glY7clJASPYxJgnJggQgVJBhoOfBGo1WxXh2yQDPBpF/AggkjZoYmgkW3buFKqoXmvxiJNnGq9KaC038JJlB4cFVhBBwqCnSdAMbOGRVXE1yhk2YLjJAREMKQk8aLkw0hLwDYC+BFGjBUVgj4d4ImAyJMUhBoyXcvgQMHBZoQqKHrPwgmSiSw/G/AYIUBAQAh+QQFBQD/ACwEAAcAFwAVAAAIswD/CRwoocLAgwgTDsx1LI3ChwcFiTsHzghEiHS8jUPH5+LDDqu8bYPi8aMXiyUPQpgQISVCGYE6jRLFR4LLBQgKuXIFK5YsKi5FHOhTqmjRKC4FrtCjSBEhMTaT/kMAIYKDAVITOmgRQkDWfxCadGGyIeuAIVueAAFx8UHCC1WeDKER9SGFhBSYFMHBIcBDFSQOJBQQYsUFrA8LIP4HoLHjAI4FjPh6kMEIDwYo/wvg92FAACH5BAUFAP8ALAQABQAVABcAAAjRAP8JHEjw34YpFAQUXJihQwCBAR7dirGwIJBdxMgM+PcgWS0ZFQcGMGRNWzUz/yAgWxWSoJxo1rhdQ/JPDqeWAzeQinbNm6F/BDrgHJhiVLRpYIYu3MBlygGlQB1EeFAAqsAWdBpJkhQnAtQDdjRt4uTp0xKoBtpAWrv2iNUSau7ciUMFgtV/Bxw8WKDwLsEFHyo8vKsgh5AZFO4KaPGDBgyhVhfkcOzCb4EVMFxgwPmhAIDPnxlkoPCQQIqKD0GrBh0ghF+CCDxALri6tm3QAQEAIfkEAQUA/wAsBAAFABUAFgAACMYA/wkcSPCfhjVZGBQsaIFKjgEDF8V7N2fhwAOBlhUDM3BYPHqKLAqUgOpYs2Rh/j0IFm9eGZH/BOQRhuzZsiL/3nh7BgPmvw6XhCWL9kfgCQ4BfP4zYUmYMS1KF2Ko0iTqQAYPHFgdWOHLHkCAxjywGiAKoUKHECkKQtZJnrdveWylwCRMGC5EGmyNuYBBgr0LD1DQC9hACRguAAfwAOPFC8ADTjiOCoGggBAvWkQlUNAABYVRAYgeTRrAB4EYAAvkcAFiwYAAOw==");
        
        
        var tmp23 = mobl.ref(null);
        
        
        var tmp22 = mobl.ref(null);
        
        
        var tmp21 = mobl.ref(null);
        
        
        var tmp19 = mobl.ref(null);
        
        
        var tmp18 = mobl.ref(null);
        
        var nodes7 = $("<span>");
        root12.append(nodes7);
        subs__.addSub((mobl.ui.generic.image)(tmp16, tmp18, tmp19, tmp21, tmp22, tmp17, tmp23, function(_, callback) {
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
                    var tmp105 = result__;
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
                                           var tmp106 = result__;
                                           function after1(result__) {
                                             var tmp107 = result__;
                                             
                                           }
                                           var result__ = onclick.get()(event, after1);if(result__ !== undefined) after1(result__);
                                           mobl.sleep(200, function(result__) {
                                             var tmp108 = result__;
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
                    var tmp109 = result__;
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
    var value9 = label.get();
    if(oldValue1 === value9) return;
    oldValue1 = value9;
    var subs__ = condSubs1;
    subs__.unsubscribe();
    node14.empty();
    if(value9) {
      
      var tmp27 = mobl.ref(null);
      
      var nodes13 = $("<span>");
      node14.append(nodes13);
      subs__.addSub((mobl.label)(label, mobl.ref(mobl.ui.generic.textFieldLabelStyle), tmp27, function(_, callback) {
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
    var value10 = validator.get();
    if(oldValue2 === value10) return;
    oldValue2 = value10;
    var subs__ = condSubs2;
    subs__.unsubscribe();
    node15.empty();
    if(value10) {
      
      var temp = mobl.ref(s.get());
      
      var identifier = mobl.ref(mobl.random(999));
      function after6(result__) {
        var validationMessage = mobl.ref(result__);
        mobl.sleep(200, function(result__) {
          var tmp111 = result__;
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
                          var tmp112 = result__;
                          function after4(result__) {
                            var tmp113 = result__;
                            var result__ = tmp113;
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
                            var tmp113 = result__;
                            var result__ = tmp113;
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
        
        var tmp28 = mobl.ref(null);
        
        var nodes14 = $("<span>");
        node15.append(nodes14);
        subs__.addSub((mobl.label)(validationMessage, mobl.ref(mobl.ui.generic.validationMessageStyle), tmp28, function(_, callback) {
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
      var tmp114 = result__;
      var result__ = tmp114;
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
    var value11 = label.get();
    if(oldValue3 === value11) return;
    oldValue3 = value11;
    var subs__ = condSubs3;
    subs__.unsubscribe();
    node18.empty();
    if(value11) {
      
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
                    var tmp116 = result__;
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
  
  var tmp38 = mobl.ref(null);
  
  
  var tmp37 = mobl.ref(null);
  
  
  var tmp36 = mobl.ref(null);
  
  var nodes17 = $("<span>");
  root37.append(nodes17);
  subs__.addSub((mobl.block)(mobl.ref(mobl.ui.generic.tabbarStyle), tmp36, tmp37, tmp38, function(_, callback) {
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
            
            var tmp33 = mobl.ref(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
            subs__.addSub(activeTabName.addEventListener('change', function() {
              tmp33.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
            }));
            subs__.addSub(tabName.addEventListener('change', function() {
              tmp33.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.activeTabButtonStyle).addEventListener('change', function() {
              tmp33.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.inActiveTabButtonStyle).addEventListener('change', function() {
              tmp33.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
            }));
            
            
            var tmp32 = mobl.ref(function(event, callback) {
                                 if(event && event.stopPropagation) event.stopPropagation();
                                 var result__ = tabName.get();
                                 activeTabName.set(result__);
                                 if(callback && callback.apply) callback(); return;
                               });
            
            
            var tmp35 = mobl.ref(null);
            
            
            var tmp34 = mobl.ref(null);
            
            var nodes18 = $("<span>");
            iternode1.append(nodes18);
            subs__.addSub((mobl.span)(tmp33, tmp34, tmp32, tmp35, function(_, callback) {
              var root39 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              
              var tmp31 = mobl.ref(null);
              
              
              var tmp29 = mobl.ref(null);
              
              var nodes19 = $("<span>");
              root39.append(nodes19);
              subs__.addSub((mobl.label)(tabName, tmp29, tmp31, function(_, callback) {
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
          
          var tmp39 = mobl.ref(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
          subs__.addSub(activeTabName.addEventListener('change', function() {
            tmp39.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
          }));
          subs__.addSub(tabName.addEventListener('change', function() {
            tmp39.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
          }));
          subs__.addSub(mobl.ref(mobl.ui.generic.activeTabStyle).addEventListener('change', function() {
            tmp39.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
          }));
          subs__.addSub(mobl.ref(mobl.ui.generic.inActiveTabStyle).addEventListener('change', function() {
            tmp39.set(activeTabName.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
          }));
          
          
          var tmp43 = mobl.ref(null);
          
          
          var tmp42 = mobl.ref(null);
          
          
          var tmp41 = mobl.ref(null);
          
          var nodes20 = $("<span>");
          iternode2.append(nodes20);
          subs__.addSub((mobl.block)(tmp39, tmp41, tmp42, tmp43, function(_, callback) {
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
                  var tmp119 = result__;
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
  
  var tmp104 = mobl.ref(mobl.window.get().innerWidth > 500);
  subs__.addSub(mobl.ref(mobl.window, 'innerWidth').addEventListener('change', function() {
    tmp104.set(mobl.window.get().innerWidth > 500);
  }));
  
  
  var node29 = $("<span>");
  root47.append(node29);
  var condSubs4 = new mobl.CompSubscription();
  subs__.addSub(condSubs4);
  var oldValue4;
  var renderCond4 = function() {
    var value12 = tmp104.get();
    if(oldValue4 === value12) return;
    oldValue4 = value12;
    var subs__ = condSubs4;
    subs__.unsubscribe();
    node29.empty();
    if(value12) {
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
                  
                  var tmp58 = mobl.ref(it.get() == current.get());
                  subs__.addSub(it.addEventListener('change', function() {
                    tmp58.set(it.get() == current.get());
                  }));
                  subs__.addSub(current.addEventListener('change', function() {
                    tmp58.set(it.get() == current.get());
                  }));
                  
                  
                  var node35 = $("<span>");
                  iternode3.append(node35);
                  var condSubs6 = new mobl.CompSubscription();
                  subs__.addSub(condSubs6);
                  var oldValue6;
                  var renderCond6 = function() {
                    var value14 = tmp58.get();
                    if(oldValue6 === value14) return;
                    oldValue6 = value14;
                    var subs__ = condSubs6;
                    subs__.unsubscribe();
                    node35.empty();
                    if(value14) {
                      
                      var tmp54 = mobl.ref(false);
                      
                      
                      var tmp53 = mobl.ref(null);
                      
                      
                      var tmp52 = mobl.ref(null);
                      
                      var nodes27 = $("<span>");
                      node35.append(nodes27);
                      subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.selectedItemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp52, tmp53, tmp54, function(_, callback) {
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
                      
                      var tmp56 = mobl.ref(function(event, callback) {
                                           if(event && event.stopPropagation) event.stopPropagation();
                                           var result__ = it.get();
                                           current.set(result__);
                                           var result__ = mobl.ui.generic.scrollUp();
                                           if(callback && callback.apply) callback(); return;
                                         });
                      
                      
                      var tmp55 = mobl.ref(true);
                      
                      
                      var tmp57 = mobl.ref(null);
                      
                      var nodes29 = $("<span>");
                      node35.append(nodes29);
                      subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp56, tmp57, tmp55, function(_, callback) {
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
                  subs__.addSub(tmp58.addEventListener('change', function() {
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
          var value13 = current.get();
          if(oldValue5 === value13) return;
          oldValue5 = value13;
          var subs__ = condSubs5;
          subs__.unsubscribe();
          node33.empty();
          if(value13) {
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
            
            var tmp59 = mobl.ref(mobl._("Select an item on the left", []));
            
            
            var tmp62 = mobl.ref(null);
            
            
            var tmp61 = mobl.ref(null);
            
            var nodes25 = $("<span>");
            node33.append(nodes25);
            subs__.addSub((mobl.label)(tmp59, tmp61, tmp62, function(_, callback) {
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
                
                var tmp44 = mobl.ref(function(event, callback) {
                                     if(event && event.stopPropagation) event.stopPropagation();
                                     mobl.call('mobl.ui.generic.detailScreen', [it, detail, mobl.ref(false), mobl.ref("slide")], function(result__) {
                                     var tmp121 = result__;
                                     if(callback && callback.apply) callback(); return;
                                     });
                                   });
                
                
                var tmp46 = mobl.ref(false);
                
                
                var tmp45 = mobl.ref(null);
                
                var nodes32 = $("<span>");
                iternode4.append(nodes32);
                subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp44, tmp45, tmp46, function(_, callback) {
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
  subs__.addSub(tmp104.addEventListener('change', function() {
    renderCond4();
  }));
  
  callback(root47); return subs__;
  
  return subs__;
};

mobl.ui.generic.detailScreen = function(it, detail, callback, screenCallback) {
  var root58 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var tmp49 = mobl.ref("Detail");
  
  
  var tmp51 = mobl.ref(null);
  
  var nodes34 = $("<span>");
  root58.append(nodes34);
  subs__.addSub((mobl.ui.generic.header)(tmp49, tmp51, function(_, callback) {
    var root59 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var tmp48 = mobl.ref(function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         if(screenCallback) screenCallback();
                         return;
                         if(callback && callback.apply) callback(); return;
                       });
    
    
    var tmp47 = mobl.ref("Back");
    
    var nodes35 = $("<span>");
    root59.append(nodes35);
    subs__.addSub((mobl.ui.generic.backButton)(tmp47, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp48, function(_, callback) {
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
            
            var tmp69 = mobl.ref(it.get() == selected.get());
            subs__.addSub(it.addEventListener('change', function() {
              tmp69.set(it.get() == selected.get());
            }));
            subs__.addSub(selected.addEventListener('change', function() {
              tmp69.set(it.get() == selected.get());
            }));
            
            
            var node38 = $("<span>");
            iternode5.append(node38);
            var condSubs7 = new mobl.CompSubscription();
            subs__.addSub(condSubs7);
            var oldValue7;
            var renderCond7 = function() {
              var value15 = tmp69.get();
              if(oldValue7 === value15) return;
              oldValue7 = value15;
              var subs__ = condSubs7;
              subs__.unsubscribe();
              node38.empty();
              if(value15) {
                
                var tmp65 = mobl.ref(false);
                
                
                var tmp64 = mobl.ref(null);
                
                
                var tmp63 = mobl.ref(null);
                
                var nodes38 = $("<span>");
                node38.append(nodes38);
                subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp63, tmp64, tmp65, function(_, callback) {
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
                
                var tmp67 = mobl.ref(true);
                
                
                var tmp66 = mobl.ref(function(event, callback) {
                                     if(event && event.stopPropagation) event.stopPropagation();
                                     var result__ = it.get();
                                     selected.set(result__);
                                     if(callback && callback.apply) callback(); return;
                                   });
                
                
                var tmp68 = mobl.ref(null);
                
                var nodes40 = $("<span>");
                node38.append(nodes40);
                subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp66, tmp68, tmp67, function(_, callback) {
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
            subs__.addSub(tmp69.addEventListener('change', function() {
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
      
      var tmp74 = mobl.ref(coll.get().limit(n.get()));
      subs__.addSub(mobl.ref(coll.get().limit(n.get())).addEventListener('change', function() {
        tmp74.set(coll.get().limit(n.get()));
      }));
      subs__.addSub(coll.addEventListener('change', function() {
        tmp74.set(coll.get().limit(n.get()));
      }));
      subs__.addSub(n.addEventListener('change', function() {
        tmp74.set(coll.get().limit(n.get()));
      }));
      
      
      var node39 = mobl.loadingSpan();
      root69.append(node39);
      var list6;
      var listSubs__ = new mobl.CompSubscription();
      subs__.addSub(listSubs__);
      var renderList6 = function() {
        var subs__ = listSubs__;
        list6 = tmp74.get();
        list6.list(function(results6) {
          node39.empty();
          for(var i6 = 0; i6 < results6.length; i6++) {
            (function() {
              var iternode6 = $("<span>");
              node39.append(iternode6);
              var it;
              it = mobl.ref(mobl.ref(results6), i6);
              
              var tmp71 = mobl.ref(function(event, callback) {
                                   if(event && event.stopPropagation) event.stopPropagation();
                                   if(callback && callback.apply) callback(); return;
                                 });
              
              
              var tmp73 = mobl.ref(false);
              
              
              var tmp72 = mobl.ref(null);
              
              var nodes43 = $("<span>");
              iternode6.append(nodes43);
              subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp71, tmp72, tmp73, function(_, callback) {
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
          subs__.addSub(tmp74.addEventListener('change', function() { listSubs__.unsubscribe(); renderList6(true); }));
        });
      };
      renderList6();
      
      
      var tmp77 = mobl.ref(n.get() < total.get());
      subs__.addSub(n.addEventListener('change', function() {
        tmp77.set(n.get() < total.get());
      }));
      subs__.addSub(total.addEventListener('change', function() {
        tmp77.set(n.get() < total.get());
      }));
      
      
      var node40 = $("<span>");
      root69.append(node40);
      var condSubs8 = new mobl.CompSubscription();
      subs__.addSub(condSubs8);
      var oldValue8;
      var renderCond8 = function() {
        var value16 = tmp77.get();
        if(oldValue8 === value16) return;
        oldValue8 = value16;
        var subs__ = condSubs8;
        subs__.unsubscribe();
        node40.empty();
        if(value16) {
          
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
          
          
          var tmp76 = mobl.ref(null);
          
          
          var tmp75 = mobl.ref(null);
          
          var nodes45 = $("<span>");
          node41.append(nodes45);
          subs__.addSub((mobl.label)(moreLabel, tmp75, tmp76, function(_, callback) {
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
      subs__.addSub(tmp77.addEventListener('change', function() {
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
            
            var tmp82 = mobl.ref(false);
            
            
            var tmp81 = mobl.ref(null);
            
            
            var tmp79 = mobl.ref(null);
            
            var nodes47 = $("<span>");
            iternode7.append(nodes47);
            subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp79, tmp81, tmp82, function(_, callback) {
              var root75 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              
              var tmp78 = mobl.ref(null);
              
              var nodes48 = $("<span>");
              root75.append(nodes48);
              subs__.addSub((mobl.ui.generic.checkBox)(checked, it, tmp78, function(_, callback) {
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
  coll.get().list(function(coll13) {
    coll13 = coll13.reverse();
    function processOne1() {
      var it;
      it = coll13.pop();
      var result__ = items.get().push(new mobl.Tuple(false, it));
      
      if(coll13.length > 0) processOne1(); else rest1();
      
    }
    function rest1() {
      
      var tmp86 = mobl.ref(null);
      
      var nodes49 = $("<span>");
      root77.append(nodes49);
      subs__.addSub((mobl.ui.generic.header)(title, tmp86, function(_, callback) {
        var root78 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var tmp83 = mobl.ref(function(event, callback) {
                             if(event && event.stopPropagation) event.stopPropagation();
                             var result__ = null;
                             if(callback && callback.apply) callback(result__);
                             return;
                             if(callback && callback.apply) callback(); return;
                           });
        
        
        var tmp84 = mobl.ref(mobl._("Back", []));
        
        var nodes50 = $("<span>");
        root78.append(nodes50);
        subs__.addSub((mobl.ui.generic.backButton)(tmp84, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp83, function(_, callback) {
          var root79 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root79); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes50;
          nodes50 = node.contents();
          oldNodes.replaceWith(nodes50);
        }));
        
        var tmp85 = mobl.ref(function(event, callback) {
                             if(event && event.stopPropagation) event.stopPropagation();
                             var result__ = [];
                             var selected = result__;
                             var result__ = items.get();
                             items.get().list(function(coll12) {
                               coll12 = coll12.reverse();
                               function processOne0() {
                                 var checked;var it;
                                 var tmp123 = coll12.pop();
                                 checked = tmp123._1;it = tmp123._2;
                                 var result__ = checked;
                                 if(result__) {
                                   var result__ = selected.push(it);
                                   
                                   if(coll12.length > 0) processOne0(); else rest0();
                                   
                                 } else {
                                   {
                                     
                                     if(coll12.length > 0) processOne0(); else rest0();
                                     
                                   }
                                 }
                               }
                               function rest0() {
                                 var result__ = selected;
                                 if(screenCallback) screenCallback(result__);
                                 return;
                                 if(callback && callback.apply) callback(); return;
                               }
                               if(coll12.length > 0) processOne0(); else rest0();
                             });
                             
                           });
        
        var nodes51 = $("<span>");
        root78.append(nodes51);
        subs__.addSub((mobl.ui.generic.button)(doneButtonLabel, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp85, function(_, callback) {
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
    if(coll13.length > 0) processOne1(); else rest1();
  });
  
  return subs__;
};

mobl.ui.generic.searchList = function(Ent, masterItem, detailItem, resultLimit, searchTermPlaceholder, elements, callback) {
  var root82 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var phrase = mobl.ref("");
  
  var tmp88 = mobl.ref(null);
  
  
  var tmp87 = mobl.ref(null);
  
  var nodes53 = $("<span>");
  root82.append(nodes53);
  subs__.addSub((mobl.ui.generic.searchBox)(phrase, searchTermPlaceholder, tmp87, tmp88, function(_, callback) {
    var root83 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root83); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes53;
    nodes53 = node.contents();
    oldNodes.replaceWith(nodes53);
  }));
  
  var tmp89 = mobl.ref(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  subs__.addSub(mobl.ref(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get())).addEventListener('change', function() {
    tmp89.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  subs__.addSub(mobl.ref(Ent.get().searchPrefix(phrase.get())).addEventListener('change', function() {
    tmp89.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  subs__.addSub(Ent.addEventListener('change', function() {
    tmp89.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  subs__.addSub(phrase.addEventListener('change', function() {
    tmp89.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  subs__.addSub(resultLimit.addEventListener('change', function() {
    tmp89.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  
  var nodes54 = $("<span>");
  root82.append(nodes54);
  subs__.addSub((mobl.ui.generic.masterDetail)(tmp89, masterItem, detailItem, function(_, callback) {
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
  
  var tmp103 = mobl.ref(null);
  
  
  var tmp102 = mobl.ref(null);
  
  
  var tmp101 = mobl.ref(null);
  
  var nodes55 = $("<span>");
  root85.append(nodes55);
  subs__.addSub((mobl.block)(mobl.ref(mobl.ui.generic.accordionStyle), tmp101, tmp102, tmp103, function(_, callback) {
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
            
            var tmp94 = mobl.ref(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            subs__.addSub(activeSection.addEventListener('change', function() {
              tmp94.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            }));
            subs__.addSub(sectionName.addEventListener('change', function() {
              tmp94.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.activeSectionHeaderStyle).addEventListener('change', function() {
              tmp94.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.inActiveSectionHeaderStyle).addEventListener('change', function() {
              tmp94.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            }));
            
            
            var tmp93 = mobl.ref(function(event, callback) {
                                 if(event && event.stopPropagation) event.stopPropagation();
                                 var result__ = sectionName.get();
                                 activeSection.set(result__);
                                 if(callback && callback.apply) callback(); return;
                               });
            
            
            var tmp96 = mobl.ref(null);
            
            
            var tmp95 = mobl.ref(null);
            
            var nodes56 = $("<span>");
            iternode8.append(nodes56);
            subs__.addSub((mobl.span)(tmp94, tmp95, tmp93, tmp96, function(_, callback) {
              var root87 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              
              var tmp92 = mobl.ref(null);
              
              
              var tmp91 = mobl.ref(null);
              
              var nodes57 = $("<span>");
              root87.append(nodes57);
              subs__.addSub((mobl.label)(sectionName, tmp91, tmp92, function(_, callback) {
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
            
            var tmp97 = mobl.ref(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            subs__.addSub(activeSection.addEventListener('change', function() {
              tmp97.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            }));
            subs__.addSub(sectionName.addEventListener('change', function() {
              tmp97.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.activeSectionStyle).addEventListener('change', function() {
              tmp97.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.inActiveSectionStyle).addEventListener('change', function() {
              tmp97.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            }));
            
            
            var tmp100 = mobl.ref(null);
            
            
            var tmp99 = mobl.ref(null);
            
            
            var tmp98 = mobl.ref(null);
            
            var nodes58 = $("<span>");
            iternode8.append(nodes58);
            subs__.addSub((mobl.block)(tmp97, tmp98, tmp99, tmp100, function(_, callback) {
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


mobl.provides('mobl.ui.generic.datepicker');
mobl.provides('mobl.ui');
mobl.ui.generic.datepicker.getMonthName = function(m) {
   var __this = this;
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  return months.get(m);
};

mobl.ui.generic.datepicker.narrowNumFieldStyle = 'mobl__ui__generic__datepicker__narrowNumFieldStyle';

mobl.ui.generic.datepicker.narrowNumField = function(n, onchange, elements, callback) {
  var root101 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node50 = $("<input>");
  node50.attr('type', "text");
  
  var ref57 = n;
  node50.val(""+ref57.get());
  var ignore11 = false;
  subs__.addSub(ref57.addEventListener('change', function(_, ref, val) {
    if(ignore11) return;
    node50.val(""+val);
  }));
  subs__.addSub(ref57.rebind());
  
  subs__.addSub(mobl.domBind(node50, 'keyup change', function() {
    ignore11 = true;
    n.set(mobl.stringTomobl__Num(node50.val()));
    ignore11 = false;
  }));
  
  
  var val33 = function(event, callback) {
                if(event && event.stopPropagation) event.stopPropagation();
                var result__ = !mobl.Math.isNaN(n.get());
                if(result__) {
                  function after9(result__) {
                    var tmp147 = result__;
                    if(callback && callback.apply) callback(); return;
                  }
                  var result__ = onchange.get()(null, after9);if(result__ !== undefined) after9(result__);
                } else {
                  {
                    if(callback && callback.apply) callback(); return;
                  }
                }
              };
  if(val33 !== null) {
    subs__.addSub(mobl.domBind(node50, 'keyup', val33));
  }
  
  var ref58 = mobl.ref(mobl.ui.generic.datepicker.narrowNumFieldStyle);
  if(ref58.get() !== null) {
    node50.attr('class', ref58.get());
    subs__.addSub(ref58.addEventListener('change', function(_, ref, val) {
      node50.attr('class', val);
    }));
    
  }
  subs__.addSub(ref58.rebind());
  
  root101.append(node50);
  callback(root101); return subs__;
  
  return subs__;
};

mobl.ui.generic.datepicker.datePicker = function(d, elements, callback) {
  var root102 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var visible = mobl.ref(false);
  
  var day = mobl.ref(d.get().getDate());
  
  var year = mobl.ref(d.get().getFullYear());
  
  var tmp126 = mobl.ref(function(event, callback) {
                       if(event && event.stopPropagation) event.stopPropagation();
                       var result__ = visible.get() ? false : true;
                       visible.set(result__);
                       if(callback && callback.apply) callback(); return;
                     });
  
  
  var tmp125 = mobl.ref(d.get().toDateString());
  subs__.addSub(d.addEventListener('change', function() {
    tmp125.set(d.get().toDateString());
  }));
  
  
  var tmp127 = mobl.ref(null);
  
  var nodes65 = $("<span>");
  root102.append(nodes65);
  subs__.addSub((mobl.label)(tmp125, tmp127, tmp126, function(_, callback) {
    var root103 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root103); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes65;
    nodes65 = node.contents();
    oldNodes.replaceWith(nodes65);
  }));
  
  var node51 = $("<div>");
  
  
  var node52 = $("<span>");
  node51.append(node52);
  var condSubs9 = new mobl.CompSubscription();
  subs__.addSub(condSubs9);
  var oldValue9;
  var renderCond9 = function() {
    var value17 = visible.get();
    if(oldValue9 === value17) return;
    oldValue9 = value17;
    var subs__ = condSubs9;
    subs__.unsubscribe();
    node52.empty();
    if(value17) {
      
      var node53 = $("<div>");
      node53.attr('style', "float: left; text-align: center;");
      
      
      var tmp129 = mobl.ref(function(event, callback) {
                           if(event && event.stopPropagation) event.stopPropagation();
                           var result__ = d.get().setDate(d.get().getDate() + 1);
                           var result__ = d.get().getDate();
                           day.set(result__);
                           var result__ = d.get();
                           d.set(result__);
                           if(callback && callback.apply) callback(); return;
                         });
      
      
      var tmp128 = mobl.ref("+");
      
      var nodes72 = $("<span>");
      node53.append(nodes72);
      subs__.addSub((mobl.ui.generic.button)(tmp128, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp129, function(_, callback) {
        var root110 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root110); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes72;
        nodes72 = node.contents();
        oldNodes.replaceWith(nodes72);
      }));
      
      var node60 = $("<br>");
      
      node53.append(node60);
      
      var tmp131 = mobl.ref(function(event, callback) {
                           if(event && event.stopPropagation) event.stopPropagation();
                           var result__ = d.get().setDate(day.get());
                           var result__ = d.get();
                           d.set(result__);
                           if(callback && callback.apply) callback(); return;
                         });
      
      var nodes73 = $("<span>");
      node53.append(nodes73);
      subs__.addSub((mobl.ui.generic.datepicker.narrowNumField)(day, tmp131, function(_, callback) {
        var root111 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root111); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes73;
        nodes73 = node.contents();
        oldNodes.replaceWith(nodes73);
      }));
      
      var node61 = $("<br>");
      
      node53.append(node61);
      
      var tmp133 = mobl.ref(function(event, callback) {
                           if(event && event.stopPropagation) event.stopPropagation();
                           var result__ = d.get().setDate(d.get().getDate() - 1);
                           var result__ = d.get();
                           d.set(result__);
                           if(callback && callback.apply) callback(); return;
                         });
      
      
      var tmp132 = mobl.ref("-");
      
      var nodes74 = $("<span>");
      node53.append(nodes74);
      subs__.addSub((mobl.ui.generic.button)(tmp132, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp133, function(_, callback) {
        var root112 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root112); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes74;
        nodes74 = node.contents();
        oldNodes.replaceWith(nodes74);
      }));
      node52.append(node53);
      
      var node54 = $("<div>");
      node54.attr('style', "float: left; text-align: center;");
      
      
      var tmp135 = mobl.ref(function(event, callback) {
                           if(event && event.stopPropagation) event.stopPropagation();
                           var result__ = d.get().setMonth(d.get().getMonth() + 1);
                           var result__ = d.get();
                           d.set(result__);
                           if(callback && callback.apply) callback(); return;
                         });
      
      
      var tmp134 = mobl.ref("+");
      
      var nodes69 = $("<span>");
      node54.append(nodes69);
      subs__.addSub((mobl.ui.generic.button)(tmp134, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp135, function(_, callback) {
        var root107 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root107); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes69;
        nodes69 = node.contents();
        oldNodes.replaceWith(nodes69);
      }));
      
      var node58 = $("<br>");
      
      node54.append(node58);
      
      var tmp136 = mobl.ref(mobl.ui.generic.datepicker.getMonthName(d.get().getMonth()));
      subs__.addSub(d.addEventListener('change', function() {
        tmp136.set(mobl.ui.generic.datepicker.getMonthName(d.get().getMonth()));
      }));
      
      
      var tmp138 = mobl.ref(null);
      
      
      var tmp137 = mobl.ref(null);
      
      var nodes70 = $("<span>");
      node54.append(nodes70);
      subs__.addSub((mobl.label)(tmp136, tmp137, tmp138, function(_, callback) {
        var root108 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root108); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes70;
        nodes70 = node.contents();
        oldNodes.replaceWith(nodes70);
      }));
      
      var node59 = $("<br>");
      
      node54.append(node59);
      
      var tmp141 = mobl.ref(function(event, callback) {
                           if(event && event.stopPropagation) event.stopPropagation();
                           var result__ = d.get().setMonth(d.get().getMonth() - 1);
                           var result__ = d.get();
                           d.set(result__);
                           if(callback && callback.apply) callback(); return;
                         });
      
      
      var tmp139 = mobl.ref("-");
      
      var nodes71 = $("<span>");
      node54.append(nodes71);
      subs__.addSub((mobl.ui.generic.button)(tmp139, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp141, function(_, callback) {
        var root109 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root109); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes71;
        nodes71 = node.contents();
        oldNodes.replaceWith(nodes71);
      }));
      node52.append(node54);
      
      var node55 = $("<div>");
      node55.attr('style', "float: left; text-align: center;");
      
      
      var tmp143 = mobl.ref(function(event, callback) {
                           if(event && event.stopPropagation) event.stopPropagation();
                           var result__ = d.get().setFullYear(d.get().getFullYear() + 1);
                           var result__ = d.get().getFullYear();
                           year.set(result__);
                           var result__ = d.get();
                           d.set(result__);
                           if(callback && callback.apply) callback(); return;
                         });
      
      
      var tmp142 = mobl.ref("+");
      
      var nodes66 = $("<span>");
      node55.append(nodes66);
      subs__.addSub((mobl.ui.generic.button)(tmp142, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp143, function(_, callback) {
        var root104 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root104); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes66;
        nodes66 = node.contents();
        oldNodes.replaceWith(nodes66);
      }));
      
      var node56 = $("<br>");
      
      node55.append(node56);
      
      var tmp144 = mobl.ref(function(event, callback) {
                           if(event && event.stopPropagation) event.stopPropagation();
                           var result__ = d.get().setFullYear(year.get());
                           var result__ = d.get();
                           d.set(result__);
                           if(callback && callback.apply) callback(); return;
                         });
      
      var nodes67 = $("<span>");
      node55.append(nodes67);
      subs__.addSub((mobl.ui.generic.datepicker.narrowNumField)(year, tmp144, function(_, callback) {
        var root105 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root105); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes67;
        nodes67 = node.contents();
        oldNodes.replaceWith(nodes67);
      }));
      
      var node57 = $("<br>");
      
      node55.append(node57);
      
      var tmp146 = mobl.ref(function(event, callback) {
                           if(event && event.stopPropagation) event.stopPropagation();
                           var result__ = d.get().setFullYear(d.get().getFullYear() - 1);
                           var result__ = d.get().getFullYear();
                           year.set(result__);
                           var result__ = d.get();
                           d.set(result__);
                           if(callback && callback.apply) callback(); return;
                         });
      
      
      var tmp145 = mobl.ref("-");
      
      var nodes68 = $("<span>");
      node55.append(nodes68);
      subs__.addSub((mobl.ui.generic.button)(tmp145, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp146, function(_, callback) {
        var root106 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root106); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes68;
        nodes68 = node.contents();
        oldNodes.replaceWith(nodes68);
      }));
      node52.append(node55);
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    } else {
      
    }
  };
  renderCond9();
  subs__.addSub(visible.addEventListener('change', function() {
    renderCond9();
  }));
  
  
  var node62 = $("<div>");
  node62.attr('style', "clear: both");
  
  node51.append(node62);
  root102.append(node51);
  callback(root102); return subs__;
  
  
  
  
  return subs__;
};


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
    var dump = LocalStorage.getItem(dbname);
    if(dump) {
      this.loadFromJson(dump, callback);
    } else {
      callback && callback();
    }
  };

  persistence.saveToLocalStorage = function(callback) {
    this.dumpToJson(function(dump) {
        LocalStorage.setItem(dbname, dump);
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


