








    if (window && window.google && google.gears || window.openDatabase) {
      try {
        persistence.store.websql.config(persistence, 'PresidentialsUS2012', 'mobl database', 1024 * 1024, '1.0');
      } catch(e) {
        alert("Could not connect to the database, sometimes a refresh helps.");
      }

      persistence.search.config(persistence, persistence.store.websql.sqliteDialect);
    } else {
      persistence.store.memory.config(persistence);
    }
    









    mobl.icon = "img/default-icon.png";
    $(function(){
      mobl.initDb(function() {
        $("#mobl-loading").remove();
        mobl.call("PresidentialsUS2012.root", [mobl.ref(false), mobl.ref("none")], function() {});
      });
    });
    

mobl.provides('PresidentialsUS2012');
mobl.provides('mobl.ui');
mobl.provides('mobl.ui.generic');
mobl.provides('PresidentialsUS2012');
mobl.provides('mobl');
persistence.debug = false;PresidentialsUS2012.textStyle = 'PresidentialsUS2012__textStyle';
PresidentialsUS2012.photoStyle = 'PresidentialsUS2012__photoStyle';

PresidentialsUS2012.democrat = function(elements, callback) {
  var root56 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes43 = $("<span>");
  root56.append(nodes43);
  subs__.addSub((mobl.block)(mobl.ref(PresidentialsUS2012.textStyle), mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
    var root57 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    var nodes44 = $("<span>");
    root57.append(nodes44);
    subs__.addSub((mobl.ui.generic.image)(mobl.ref("img/democratLogo.png"), mobl.ref(null), mobl.ref(null), mobl.ref(null), mobl.ref(PresidentialsUS2012.photoStyle), mobl.ref(null), mobl.ref(null), function(_, callback) {
      var root58 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root58); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes44;
      nodes44 = node.contents();
      oldNodes.replaceWith(nodes44);
    }));
    
    root57.append("<p>Historically, the Democratic Party has supported organized labour, ethnic minorities, and progressive reform. It tends to favour greater government intervention in the economy and to oppose government intervention in the private, noneconomic affairs of citizens. The logo of the Democratic Party, the donkey, was popularized by cartoonist Thomas Nast in the 1870s; though widely used, it has never been officially adopted by the party.</p>");
    callback(root57); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes43;
    nodes43 = node.contents();
    oldNodes.replaceWith(nodes43);
  }));
  callback(root56); return subs__;
  
  return subs__;
};

PresidentialsUS2012.republican = function(elements, callback) {
  var root59 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes45 = $("<span>");
  root59.append(nodes45);
  subs__.addSub((mobl.block)(mobl.ref(PresidentialsUS2012.textStyle), mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
    var root60 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    var nodes46 = $("<span>");
    root60.append(nodes46);
    subs__.addSub((mobl.ui.generic.image)(mobl.ref("img/logoRepublican.jpg"), mobl.ref(null), mobl.ref(null), mobl.ref(null), mobl.ref(PresidentialsUS2012.photoStyle), mobl.ref(null), mobl.ref(null), function(_, callback) {
      var root61 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root61); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes46;
      nodes46 = node.contents();
      oldNodes.replaceWith(nodes46);
    }));
    
    root60.append("<p>The Republican Party traditionally has supported laissez-faire capitalism, low taxes, and conservative social policies. The party acquired the acronym GOP, widely understood as Grand Old Party, in the 1870s. The partys official logo, the elephant, is derived from a cartoon by Thomas Nast and also dates from the 1870s.</p>");
    callback(root60); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes45;
    nodes45 = node.contents();
    oldNodes.replaceWith(nodes45);
  }));
  callback(root59); return subs__;
  
  return subs__;
};

PresidentialsUS2012.romney = function(elements, callback) {
  var root62 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes47 = $("<span>");
  root62.append(nodes47);
  subs__.addSub((mobl.block)(mobl.ref(PresidentialsUS2012.textStyle), mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
    var root63 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    var nodes48 = $("<span>");
    root63.append(nodes48);
    subs__.addSub((mobl.ui.generic.image)(mobl.ref("img/fotoRomney.jpg"), mobl.ref(null), mobl.ref(null), mobl.ref(null), mobl.ref(PresidentialsUS2012.photoStyle), mobl.ref(null), mobl.ref(null), function(_, callback) {
      var root64 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root64); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes48;
      nodes48 = node.contents();
      oldNodes.replaceWith(nodes48);
    }));
    
    root63.append("<p>Mitt Romney</p>");
    
    root63.append("<p>March 12, 1947 Detroit, Michigan</p>");
    
    root63.append("<p>Brigham Young University & Harvard University</p>");
    
    root63.append("<p>Co-founder, Bain Capital (1984-1998)</p>");
    
    root63.append("<p>CEO, Bain & Company (1991-1992)</p>");
    
    root63.append("<p>CEO, Winter Olympics 2002 (1999-2002)</p>");
    
    root63.append("<p>Governor of Massachusetts</p>");
    callback(root63); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes47;
    nodes47 = node.contents();
    oldNodes.replaceWith(nodes47);
  }));
  callback(root62); return subs__;
  
  return subs__;
};

PresidentialsUS2012.obama = function(elements, callback) {
  var root65 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes49 = $("<span>");
  root65.append(nodes49);
  subs__.addSub((mobl.block)(mobl.ref(PresidentialsUS2012.textStyle), mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
    var root66 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    var nodes50 = $("<span>");
    root66.append(nodes50);
    subs__.addSub((mobl.ui.generic.image)(mobl.ref("img/fotoObama.jpg"), mobl.ref(null), mobl.ref(null), mobl.ref(null), mobl.ref(PresidentialsUS2012.photoStyle), mobl.ref(null), mobl.ref(null), function(_, callback) {
      var root67 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root67); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes50;
      nodes50 = node.contents();
      oldNodes.replaceWith(nodes50);
    }));
    
    root66.append("<p>Barack Obama</p>");
    
    root66.append("<p>August 4, 1961 Honolulu, Hawaii</p>");
    
    root66.append("<p>Columbia University & Harvard University, 1992</p>");
    
    root66.append("<p>Lawyer</p>");
    
    root66.append("<p>Member of the Illinois Senate by the district 13. January 8, 1997 - Nov. 4, 2004</p>");
    
    root66.append("<p>Junior U.S. Senator Illinois. January 4, 2005 - 16 November 2008</p>");
    
    root66.append("<p>President of the United States</p>");
    callback(root66); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes49;
    nodes49 = node.contents();
    oldNodes.replaceWith(nodes49);
  }));
  callback(root65); return subs__;
  
  return subs__;
};

PresidentialsUS2012.mandemocrat = function(elements, callback) {
  var root68 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes51 = $("<span>");
  root68.append(nodes51);
  subs__.addSub((mobl.block)(mobl.ref(PresidentialsUS2012.textStyle), mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
    var root69 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root69.append("<p>- Democrats agree to extend tax cuts for the middle class, and promise to reform the tax code so that no high incomes pay less taxes than the middle class.</p>");
    
    root69.append("<p>- The Democratic Party is committed to enact comprehensive immigration reform. The reform would require undocumented immigrants to comply with the law, learn English and pay taxes if they are eligible for citizenship. Calls for Congressional action as the only way to turn that model into permanent.</p>");
    
    root69.append("<p>- Support the movement to ensure equal treatment under the law for same-sex couples as heterosexual. Obama spoke out publicly for the first time in favor of gay marriage in May.</p>");
    
    root69.append("<p>- Support for the right of women to abortion. Democrats argue that abortion is a personal decision, which belongs only to the woman and her family.</p>");
    
    root69.append("<p>- Defense reform passed in 2010 that sets compulsory health insurance to ensure health care accessible to everyone and quality. The Democrats are willing to improve the law but within the parameters approved in 2010.</p>");
    
    root69.append("<p>- In Latin America, the party is committed to promoting greater freedom in Cuba and Venezuela until all its citizens enjoy universal rights they deserve, and supports the Cuban people's desire to freely determine their own future.</p>");
    callback(root69); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes51;
    nodes51 = node.contents();
    oldNodes.replaceWith(nodes51);
  }));
  callback(root68); return subs__;
  
  return subs__;
};

PresidentialsUS2012.manrepublican = function(elements, callback) {
  var root70 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes52 = $("<span>");
  root70.append(nodes52);
  subs__.addSub((mobl.block)(mobl.ref(PresidentialsUS2012.textStyle), mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
    var root71 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root71.append("<p>- Republicans propose simplifying the tax code and improve transparency, to help entrepreneurs create jobs.</p>");
    
    root71.append("<p>- They oppos the practice of abortion without exception, and prohibits using federal funds to subsidize health plans that include abortion services.</p>");
    
    root71.append("<p>- They oppos marriage between same sex.</p>");
    
    root71.append("<p>- Supports a wide range of alternatives to public education, and promotes the teaching of teen abstinence until marriage</p>");
    
    root71.append("<p>- Supports the right of Puerto Ricans, who are all U.S. citizens to be admitted into EE. UU. as a fully sovereign state if they freely determine.</p>");
    
    root71.append("<p>- Calls for a national defense strategy as a path to peace, economic prosperity and the protection of those who yearn to be free.</p>");
    
    root71.append("<p>- Supports the completion of a fence along the U.S. southwest border. UU., To safeguard the rule of law both at the borders and at ports of entry.</p>");
    
    root71.append("<p>- They oppos any form of amnesty for those who knowingly violate the law, disadvantage those who obey.</p>");
    callback(root71); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes52;
    nodes52 = node.contents();
    oldNodes.replaceWith(nodes52);
  }));
  callback(root70); return subs__;
  
  return subs__;
};

PresidentialsUS2012.manifestos = function(callback, screenCallback) {
  var root72 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  var nodes53 = $("<span>");
  root72.append(nodes53);
  subs__.addSub((mobl.ui.generic.header)(mobl.ref("Manifestos"), mobl.ref(false), mobl.ref(null), function(_, callback) {
    var root73 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     if(screenCallback) screenCallback();
                     return;
                     if(callback && callback.apply) callback(); return;
                   };
    var tmp33 = mobl.ref(result__);
    
    var result__ = mobl._("Back", []);
    var tmp32 = mobl.ref(result__);
    
    var nodes54 = $("<span>");
    root73.append(nodes54);
    subs__.addSub((mobl.ui.generic.backButton)(tmp32, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp33, function(_, callback) {
      var root74 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root74); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes54;
      nodes54 = node.contents();
      oldNodes.replaceWith(nodes54);
    }));
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     mobl.call('PresidentialsUS2012.about', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                     var tmp55 = result__;
                     if(callback && callback.apply) callback(); return;
                     });
                   };
    var tmp34 = mobl.ref(result__);
    
    var nodes55 = $("<span>");
    root73.append(nodes55);
    subs__.addSub((mobl.ui.generic.button)(mobl.ref("About"), mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp34, function(_, callback) {
      var root75 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root75); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes55;
      nodes55 = node.contents();
      oldNodes.replaceWith(nodes55);
    }));
    callback(root73); return subs__;
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes53;
    nodes53 = node.contents();
    oldNodes.replaceWith(nodes53);
  }));
  var result__ = [new mobl.Tuple("Democrat", "", PresidentialsUS2012.mandemocrat), new mobl.Tuple("Republican", "", PresidentialsUS2012.manrepublican)];
  var tmp35 = mobl.ref(result__);
  subs__.addSub(mobl.ref(PresidentialsUS2012.mandemocrat).addEventListener('change', function() {
    tmp35.set([new mobl.Tuple("Democrat", "", PresidentialsUS2012.mandemocrat), new mobl.Tuple("Republican", "", PresidentialsUS2012.manrepublican)]);
  }));
  subs__.addSub(mobl.ref(PresidentialsUS2012.manrepublican).addEventListener('change', function() {
    tmp35.set([new mobl.Tuple("Democrat", "", PresidentialsUS2012.mandemocrat), new mobl.Tuple("Republican", "", PresidentialsUS2012.manrepublican)]);
  }));
  
  var nodes56 = $("<span>");
  root72.append(nodes56);
  subs__.addSub((mobl.ui.generic.tabSet)(tmp35, mobl.ref(null), function(_, callback) {
    var root76 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root76); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes56;
    nodes56 = node.contents();
    oldNodes.replaceWith(nodes56);
  }));
  callback(root72); return subs__;
  
  
  return subs__;
};

PresidentialsUS2012.candidates = function(callback, screenCallback) {
  var root77 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  var nodes57 = $("<span>");
  root77.append(nodes57);
  subs__.addSub((mobl.ui.generic.header)(mobl.ref("Candidates"), mobl.ref(false), mobl.ref(null), function(_, callback) {
    var root78 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     if(screenCallback) screenCallback();
                     return;
                     if(callback && callback.apply) callback(); return;
                   };
    var tmp37 = mobl.ref(result__);
    
    var result__ = mobl._("Back", []);
    var tmp36 = mobl.ref(result__);
    
    var nodes58 = $("<span>");
    root78.append(nodes58);
    subs__.addSub((mobl.ui.generic.backButton)(tmp36, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp37, function(_, callback) {
      var root79 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root79); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes58;
      nodes58 = node.contents();
      oldNodes.replaceWith(nodes58);
    }));
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     mobl.call('PresidentialsUS2012.about', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                     var tmp56 = result__;
                     if(callback && callback.apply) callback(); return;
                     });
                   };
    var tmp38 = mobl.ref(result__);
    
    var nodes59 = $("<span>");
    root78.append(nodes59);
    subs__.addSub((mobl.ui.generic.button)(mobl.ref("About"), mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp38, function(_, callback) {
      var root80 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root80); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes59;
      nodes59 = node.contents();
      oldNodes.replaceWith(nodes59);
    }));
    callback(root78); return subs__;
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes57;
    nodes57 = node.contents();
    oldNodes.replaceWith(nodes57);
  }));
  var result__ = [new mobl.Tuple("Democrat", "", PresidentialsUS2012.obama), new mobl.Tuple("Republican", "", PresidentialsUS2012.romney)];
  var tmp39 = mobl.ref(result__);
  subs__.addSub(mobl.ref(PresidentialsUS2012.obama).addEventListener('change', function() {
    tmp39.set([new mobl.Tuple("Democrat", "", PresidentialsUS2012.obama), new mobl.Tuple("Republican", "", PresidentialsUS2012.romney)]);
  }));
  subs__.addSub(mobl.ref(PresidentialsUS2012.romney).addEventListener('change', function() {
    tmp39.set([new mobl.Tuple("Democrat", "", PresidentialsUS2012.obama), new mobl.Tuple("Republican", "", PresidentialsUS2012.romney)]);
  }));
  
  var nodes60 = $("<span>");
  root77.append(nodes60);
  subs__.addSub((mobl.ui.generic.tabSet)(tmp39, mobl.ref(null), function(_, callback) {
    var root81 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root81); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes60;
    nodes60 = node.contents();
    oldNodes.replaceWith(nodes60);
  }));
  callback(root77); return subs__;
  
  
  return subs__;
};

PresidentialsUS2012.parties = function(callback, screenCallback) {
  var root82 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  var nodes61 = $("<span>");
  root82.append(nodes61);
  subs__.addSub((mobl.ui.generic.header)(mobl.ref("Parties"), mobl.ref(false), mobl.ref(null), function(_, callback) {
    var root83 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     if(screenCallback) screenCallback();
                     return;
                     if(callback && callback.apply) callback(); return;
                   };
    var tmp42 = mobl.ref(result__);
    
    var result__ = mobl._("Back", []);
    var tmp41 = mobl.ref(result__);
    
    var nodes62 = $("<span>");
    root83.append(nodes62);
    subs__.addSub((mobl.ui.generic.backButton)(tmp41, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp42, function(_, callback) {
      var root84 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root84); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes62;
      nodes62 = node.contents();
      oldNodes.replaceWith(nodes62);
    }));
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     mobl.call('PresidentialsUS2012.about', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                     var tmp57 = result__;
                     if(callback && callback.apply) callback(); return;
                     });
                   };
    var tmp43 = mobl.ref(result__);
    
    var nodes63 = $("<span>");
    root83.append(nodes63);
    subs__.addSub((mobl.ui.generic.button)(mobl.ref("About"), mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp43, function(_, callback) {
      var root85 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root85); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes63;
      nodes63 = node.contents();
      oldNodes.replaceWith(nodes63);
    }));
    callback(root83); return subs__;
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes61;
    nodes61 = node.contents();
    oldNodes.replaceWith(nodes61);
  }));
  var result__ = [new mobl.Tuple("Democrat", "", PresidentialsUS2012.democrat), new mobl.Tuple("Republican", "", PresidentialsUS2012.republican)];
  var tmp44 = mobl.ref(result__);
  subs__.addSub(mobl.ref(PresidentialsUS2012.democrat).addEventListener('change', function() {
    tmp44.set([new mobl.Tuple("Democrat", "", PresidentialsUS2012.democrat), new mobl.Tuple("Republican", "", PresidentialsUS2012.republican)]);
  }));
  subs__.addSub(mobl.ref(PresidentialsUS2012.republican).addEventListener('change', function() {
    tmp44.set([new mobl.Tuple("Democrat", "", PresidentialsUS2012.democrat), new mobl.Tuple("Republican", "", PresidentialsUS2012.republican)]);
  }));
  
  var nodes64 = $("<span>");
  root82.append(nodes64);
  subs__.addSub((mobl.ui.generic.tabSet)(tmp44, mobl.ref(null), function(_, callback) {
    var root86 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root86); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes64;
    nodes64 = node.contents();
    oldNodes.replaceWith(nodes64);
  }));
  callback(root82); return subs__;
  
  
  return subs__;
};

PresidentialsUS2012.results = function(callback, screenCallback) {
  var root87 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  var nodes65 = $("<span>");
  root87.append(nodes65);
  subs__.addSub((mobl.ui.generic.header)(mobl.ref("Results"), mobl.ref(false), mobl.ref(null), function(_, callback) {
    var root88 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     if(screenCallback) screenCallback();
                     return;
                     if(callback && callback.apply) callback(); return;
                   };
    var tmp46 = mobl.ref(result__);
    
    var result__ = mobl._("Back", []);
    var tmp45 = mobl.ref(result__);
    
    var nodes66 = $("<span>");
    root88.append(nodes66);
    subs__.addSub((mobl.ui.generic.backButton)(tmp45, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp46, function(_, callback) {
      var root89 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root89); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes66;
      nodes66 = node.contents();
      oldNodes.replaceWith(nodes66);
    }));
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     mobl.call('PresidentialsUS2012.about1', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                     var tmp58 = result__;
                     if(callback && callback.apply) callback(); return;
                     });
                   };
    var tmp47 = mobl.ref(result__);
    
    var nodes67 = $("<span>");
    root88.append(nodes67);
    subs__.addSub((mobl.ui.generic.button)(mobl.ref("About"), mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp47, function(_, callback) {
      var root90 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root90); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes67;
      nodes67 = node.contents();
      oldNodes.replaceWith(nodes67);
    }));
    callback(root88); return subs__;
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes65;
    nodes65 = node.contents();
    oldNodes.replaceWith(nodes65);
  }));
  var nodes68 = $("<span>");
  root87.append(nodes68);
  subs__.addSub((mobl.block)(mobl.ref(PresidentialsUS2012.textStyle), mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
    var root91 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root91.append("<p>Senators distribution</p>");
    var nodes69 = $("<span>");
    root91.append(nodes69);
    subs__.addSub((mobl.ui.generic.image)(mobl.ref("http://www.mobilets.eu/file/res/PresidentialsUS2012.png"), mobl.ref(null), mobl.ref(null), mobl.ref(null), mobl.ref(PresidentialsUS2012.photoStyle), mobl.ref(null), mobl.ref(null), function(_, callback) {
      var root92 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root92); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes69;
      nodes69 = node.contents();
      oldNodes.replaceWith(nodes69);
    }));
    
    root91.append("<p>On November 6 results</p>");
    callback(root91); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes68;
    nodes68 = node.contents();
    oldNodes.replaceWith(nodes68);
  }));
  callback(root87); return subs__;
  
  
  return subs__;
};

PresidentialsUS2012.about = function(callback, screenCallback) {
  var root93 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  var nodes70 = $("<span>");
  root93.append(nodes70);
  subs__.addSub((mobl.block)(mobl.ref(PresidentialsUS2012.textStyle), mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
    var root94 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root94.append("<p>Presidentials 2012 contains the most important information to decide your vote on November 6 presidential election in the United States of America.</p>");
    
    root94.append("<p>That day also will see an outline of the election results</p><br/><br/> ");
    var nodes71 = $("<span>");
    root94.append(nodes71);
    subs__.addSub((mobl.link)(mobl.ref("http://www.mobilets.eu"), mobl.ref("_BLANK"), function(_, callback) {
      var root95 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root95); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes71;
      nodes71 = node.contents();
      oldNodes.replaceWith(nodes71);
    }));
    callback(root94); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes70;
    nodes70 = node.contents();
    oldNodes.replaceWith(nodes70);
  }));
  callback(root93); return subs__;
  
  return subs__;
};

PresidentialsUS2012.about1 = function(callback, screenCallback) {
  var root96 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  var nodes72 = $("<span>");
  root96.append(nodes72);
  subs__.addSub((mobl.ui.generic.header)(mobl.ref("About"), mobl.ref(false), mobl.ref(null), function(_, callback) {
    var root97 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     if(screenCallback) screenCallback();
                     return;
                     if(callback && callback.apply) callback(); return;
                   };
    var tmp49 = mobl.ref(result__);
    
    var result__ = mobl._("Back", []);
    var tmp48 = mobl.ref(result__);
    
    var nodes73 = $("<span>");
    root97.append(nodes73);
    subs__.addSub((mobl.ui.generic.backButton)(tmp48, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp49, function(_, callback) {
      var root98 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root98); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes73;
      nodes73 = node.contents();
      oldNodes.replaceWith(nodes73);
    }));
    callback(root97); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes72;
    nodes72 = node.contents();
    oldNodes.replaceWith(nodes72);
  }));
  var nodes74 = $("<span>");
  root96.append(nodes74);
  subs__.addSub((mobl.block)(mobl.ref(PresidentialsUS2012.textStyle), mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
    var root99 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    root99.append("<p>Presidentials 2012 contains the most important information to decide your vote on November 6 presidential election in the United States of America.</p>");
    
    root99.append("<p>That day also will see an outline of the election results</p><br/><br/> ");
    var nodes75 = $("<span>");
    root99.append(nodes75);
    subs__.addSub((mobl.link)(mobl.ref("http://www.mobilets.eu"), mobl.ref("_BLANK"), function(_, callback) {
      var root100 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root100); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes75;
      nodes75 = node.contents();
      oldNodes.replaceWith(nodes75);
    }));
    callback(root99); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes74;
    nodes74 = node.contents();
    oldNodes.replaceWith(nodes74);
  }));
  callback(root96); return subs__;
  
  
  return subs__;
};

PresidentialsUS2012.root = function(callback, screenCallback) {
  var root101 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  var nodes76 = $("<span>");
  root101.append(nodes76);
  subs__.addSub((mobl.ui.generic.header)(mobl.ref("Presidentials"), mobl.ref(false), mobl.ref(null), function(_, callback) {
    var root102 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root102); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes76;
    nodes76 = node.contents();
    oldNodes.replaceWith(nodes76);
  }));
  var nodes77 = $("<span>");
  root101.append(nodes77);
  subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
    var root103 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     mobl.call('PresidentialsUS2012.parties', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                     var tmp63 = result__;
                     if(callback && callback.apply) callback(); return;
                     });
                   };
    var tmp51 = mobl.ref(result__);
    
    var nodes78 = $("<span>");
    root103.append(nodes78);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp51, mobl.ref(null), mobl.ref(false), function(_, callback) {
      var root104 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      var nodes79 = $("<span>");
      root104.append(nodes79);
      subs__.addSub((mobl.label)(mobl.ref("Parties"), mobl.ref(null), mobl.ref(null), function(_, callback) {
        var root105 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root105); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes79;
        nodes79 = node.contents();
        oldNodes.replaceWith(nodes79);
      }));
      callback(root104); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes78;
      nodes78 = node.contents();
      oldNodes.replaceWith(nodes78);
    }));
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     mobl.call('PresidentialsUS2012.candidates', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                     var tmp62 = result__;
                     if(callback && callback.apply) callback(); return;
                     });
                   };
    var tmp52 = mobl.ref(result__);
    
    var nodes80 = $("<span>");
    root103.append(nodes80);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp52, mobl.ref(null), mobl.ref(false), function(_, callback) {
      var root106 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      var nodes81 = $("<span>");
      root106.append(nodes81);
      subs__.addSub((mobl.label)(mobl.ref("Candidates"), mobl.ref(null), mobl.ref(null), function(_, callback) {
        var root107 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root107); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes81;
        nodes81 = node.contents();
        oldNodes.replaceWith(nodes81);
      }));
      callback(root106); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes80;
      nodes80 = node.contents();
      oldNodes.replaceWith(nodes80);
    }));
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     mobl.call('PresidentialsUS2012.manifestos', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                     var tmp61 = result__;
                     if(callback && callback.apply) callback(); return;
                     });
                   };
    var tmp53 = mobl.ref(result__);
    
    var nodes82 = $("<span>");
    root103.append(nodes82);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp53, mobl.ref(null), mobl.ref(false), function(_, callback) {
      var root108 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      var nodes83 = $("<span>");
      root108.append(nodes83);
      subs__.addSub((mobl.label)(mobl.ref("Manifestos"), mobl.ref(null), mobl.ref(null), function(_, callback) {
        var root109 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root109); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes83;
        nodes83 = node.contents();
        oldNodes.replaceWith(nodes83);
      }));
      callback(root108); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes82;
      nodes82 = node.contents();
      oldNodes.replaceWith(nodes82);
    }));
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     mobl.call('PresidentialsUS2012.results', [mobl.ref(false), mobl.ref("slide")], function(result__) {
                     var tmp59 = result__;
                     if(callback && callback.apply) callback(); return;
                     });
                   };
    var tmp54 = mobl.ref(result__);
    
    var nodes84 = $("<span>");
    root103.append(nodes84);
    subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp54, mobl.ref(null), mobl.ref(false), function(_, callback) {
      var root110 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      var nodes85 = $("<span>");
      root110.append(nodes85);
      subs__.addSub((mobl.label)(mobl.ref("Results"), mobl.ref(null), mobl.ref(null), function(_, callback) {
        var root111 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root111); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes85;
        nodes85 = node.contents();
        oldNodes.replaceWith(nodes85);
      }));
      callback(root110); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes84;
      nodes84 = node.contents();
      oldNodes.replaceWith(nodes84);
    }));
    callback(root103); return subs__;
    
    
    
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes77;
    nodes77 = node.contents();
    oldNodes.replaceWith(nodes77);
  }));
  callback(root101); return subs__;
  
  
  return subs__;
};


mobl.provides('mobl');
mobl.provides('mobl');
(function(__ns) {
__ns.Bool = {
            };
__ns.Num = {
           };
__ns.String = {
              };
}(mobl));(function(__ns) {
__ns.RegExp = {
                fromString: function(regexp) {
                              return new RegExp(regexp);
                            }
              };
}(mobl));mobl.mergeStyles = function(styles) {
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
}(mobl));(function(__ns) {
__ns.dyn = function(o) {
             return o;
           };
}(mobl));
mobl.label = function(s, style, onclick, elements, callback) {
  var root188 = $("<span>");
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
  
  root188.append(node0);
  callback(root188); return subs__;
  
  return subs__;
};

mobl.block = function(cssClass, id, onclick, onswipe, elements, callback) {
  var root189 = $("<span>");
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
  
  var nodes141 = $("<span>");
  node1.append(nodes141);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl0();
  }));
  
  function renderControl0() {
    subs__.addSub((elements)(function(elements, callback) {
      var root190 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root190); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes141;
      nodes141 = node.contents();
      oldNodes.replaceWith(nodes141);
    }));
  }
  renderControl0();
  root189.append(node1);
  callback(root189); return subs__;
  
  
  return subs__;
};

mobl.span = function(cssClass, id, onclick, onswipe, elements, callback) {
  var root191 = $("<span>");
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
  
  var nodes142 = $("<span>");
  node2.append(nodes142);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl1();
  }));
  
  function renderControl1() {
    subs__.addSub((elements)(function(elements, callback) {
      var root193 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root193); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes142;
      nodes142 = node.contents();
      oldNodes.replaceWith(nodes142);
    }));
  }
  renderControl1();
  root191.append(node2);
  callback(root191); return subs__;
  
  
  return subs__;
};

mobl.link = function(url, target, elements, callback) {
  var root194 = $("<span>");
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
  
  var nodes143 = $("<span>");
  l.append(nodes143);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl2();
  }));
  
  function renderControl2() {
    subs__.addSub((elements)(function(elements, callback) {
      var root195 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root195); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes143;
      nodes143 = node.contents();
      oldNodes.replaceWith(nodes143);
    }));
  }
  renderControl2();
  root194.append(l);
  var result__ = l.contents().length == 0;
  if(result__) {
    var result__ = l.text(url.get());
    callback(root194); return subs__;
  } else {
    {
      callback(root194); return subs__;
    }
  }
  
  
  return subs__;
};

mobl.nl = function(elements, callback) {
  var root196 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node3 = $("<br>");
  
  root196.append(node3);
  callback(root196); return subs__;
  
  return subs__;
};

mobl.screenContext = function(elements, callback) {
  var root197 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node4 = $("<div>");
  node4.attr('class', "screenContext");
  node4.attr('style', "position: relative;");
  
  
  var node5 = $("<div>");
  node5.attr('class', "initialElements");
  
  var nodes144 = $("<span>");
  node5.append(nodes144);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl3();
  }));
  
  function renderControl3() {
    subs__.addSub((elements)(function(elements, callback) {
      var root198 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root198); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes144;
      nodes144 = node.contents();
      oldNodes.replaceWith(nodes144);
    }));
  }
  renderControl3();
  node4.append(node5);
  root197.append(node4);
  callback(root197); return subs__;
  
  
  
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
                  return parseFloat(s, 10);
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
               if(from <= to)
               {
                 for(var i = from; i < to; i++)
                 {
                   ar.push(i);
                 }
               }
               else
               {
                 for(var i = from; i > to; i--)
                 {
                   ar.push(i);
                 }
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
                    Type.prototype = SuperType ? new SuperType ( ) : new persistence.Observable ( );
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
var TRANSITION_SPEED = 250;
__ns.animations = {
                  };
__ns.animations.slide = function(prevNode, nextNode, forward, callback) {
                          nextNode.css("-webkit-transform", "translate3d(" + ( forward ? "100%" : "-100%" ) + ",0px,0px)");
                          nextNode.css("-webkit-transition-duration", TRANSITION_SPEED + "ms");
                          nextNode.show();
                          setTimeout(function() {
                                       nextNode.css({
                                                      "-webkit-transition-duration": TRANSITION_SPEED + "ms",
                                                      "-webkit-transition-timing-function": "ease-in-out"
                                                    });
                                       prevNode.css({
                                                      "-webkit-transition-duration": TRANSITION_SPEED + "ms",
                                                      "-webkit-transition-timing-function": "ease-in-out"
                                                    });
                                       nextNode.css("-webkit-transform", "translate3d(0px,0px,0px)");
                                       prevNode.css("-webkit-transform", "translate3d(" + ( forward ? "-100%" : "100%" ) + ",0px,0px)");
                                       prevNode.bind("webkitTransitionEnd", function() {
                                                                              prevNode.unbind("webkitTransitionEnd");
                                                                              prevNode.hide();
                                                                              nextNode.css({
                                                                                             "-webkit-transition-duration": null,
                                                                                             "-webkit-transition-timing-function": null
                                                                                           });
                                                                              prevNode.css({
                                                                                             "-webkit-transition-duration": null,
                                                                                             "-webkit-transition-timing-function": null
                                                                                           });
                                                                              callback();
                                                                            });
                                     }, 5);
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
__ns.screenTransitionLock = null;
__ns.acquireScreenTransitionLock = function(resource) {
                                     if(__ns.screenTransitionLock === resource)
                                     {
                                       return false;
                                     }
                                     __ns.screenTransitionLock = resource;
                                     return true;
                                   };
$("html").bind("screenTransitionEnded", function() {
                                          __ns.screenTransitionLock = null;
                                        });
__ns.call = function(screenName, args, callback) {
              if(!__ns.acquireScreenTransitionLock(screenName))
              {
                return false;
              }
              var replace = args[args.length - 2].get();
              var animate = args[args.length - 1].get();
              args.splice(args.length - 2, 2);
              var screenFrame = {
                                  name: screenName,
                                  args: args,
                                  callback: callback,
                                  div: screenName.replace(/\./g, '__'),
                                  dom: $("<div>")
                                };
              if(!screenName.match(/\.root$/))
              {
                location.hash = "" + Math.round(Math.random() * 99999);
              }
              oldHash = location.hash;
              var screenContext = mobl.findDeepestVisibleContext();
              screenContext.screens.push(screenFrame);
              var callbackFn = function() {
                                 if(!__ns.acquireScreenTransitionLock(screenName))
                                 {
                                   return false;
                                 }
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
                                                                                             domNode.trigger("screenTransitionEnded");
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
                                                                           node.css('position', 'absolute').css('top', '0').css('left', '0px').css('width', '100%');
                                                                           screenFrame.dom = node;
                                                                           if(screenContext.screens.length > 1)
                                                                           {
                                                                             var previousScreen = screenContext.screens[screenContext.screens.length - 2];
                                                                             previousScreen.pageYOffset = window.pageYOffset;
                                                                             node.hide();
                                                                             node.prependTo(screenContext.dom);
                                                                             __ns.animations[animate](previousScreen.dom, node, true, function() {
                                                                                                                                        node.trigger("screenTransitionEnded");
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
                                                                               node.trigger("screenTransitionEnded");
                                                                             }
                                                                             else
                                                                             {
                                                                               screenContext.initialElements = screenContext.dom.find("div.initialElements");
                                                                               node.hide();
                                                                               node.prependTo(screenContext.dom);
                                                                               __ns.animations[animate](screenContext.initialElements, node, true, function() {
                                                                                                                                                     node.trigger("screenTransitionEnded");
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
   var batchedEvents = [];
   function processEvents ( ) {
     var toTrigger = [];
     for(var i = 0; i < batchedEvents.length; i++)
     {
       var ev = batchedEvents[i];
       var found = false;
       for(var j = 0; j < toTrigger.length; j++)
       {
         var ev2 = toTrigger[j];
         if(ev.obj === ev2.obj && ev.eventType === ev2.eventType)
         {
           found = true;
           break;
         }
       }
       if(!found)
       {
         toTrigger.push(ev);
       }
     }
     batchedEvents = [ ];
     for(i = 0; i < toTrigger.length; i++)
     {
       var ev = toTrigger[i];
       ev.fn.apply(null, ev.args);
     }
   }
   function CompSubscription ( name ) {
     this.subscriptions = [ ];
     this.name = name;
   }
   CompSubscription.prototype.addSub = function(sub) {
                                         if(sub)
                                         {
                                           if(sub.node && ( sub.eventType.indexOf('change') !== -1 || sub.eventType.indexOf('key') !== -1 ))
                                           {
                                             var fn = sub.fn;
                                             sub.unsubscribe();
                                             sub = mobl.domBind(sub.node, sub.eventType, function() {
                                                                                           batchedEvents.push({
                                                                                                                obj: sub.node,
                                                                                                                eventType: sub.eventType,
                                                                                                                fn: fn,
                                                                                                                args: Array.prototype.slice.call(arguments)
                                                                                                              });
                                                                                           if(batchedEvents.length === 1)
                                                                                           {
                                                                                             setTimeout(processEvents, 300);
                                                                                           }
                                                                                         });
                                           }
                                           else
                                           if(sub.obj && sub.obj._filter && ( sub.eventType.indexOf('change') !== -1 || sub.eventType.indexOf('key') !== -1 ))
                                           {
                                             var fn = sub.fn;
                                             sub.unsubscribe();
                                             sub = sub.obj.addEventListener(sub.eventType, function() {
                                                                                             batchedEvents.push({
                                                                                                                  obj: sub.obj,
                                                                                                                  eventType: sub.eventType,
                                                                                                                  fn: fn,
                                                                                                                  args: Array.prototype.slice.call(arguments)
                                                                                                                });
                                                                                             if(batchedEvents.length === 1)
                                                                                             {
                                                                                               setTimeout(processEvents, 300);
                                                                                             }
                                                                                           });
                                           }
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
   DomSubscription.prototype.equals = function(o) {
                                        return this.node === o.node && this.eventType === o.eventType && this.fn === o.fn;
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
mobl.provides('mobl.ui.stylemixin');
mobl.provides('mobl.ui.generic');
mobl.provides('mobl');
mobl.provides('mobl.ui');
mobl.ui.generic.loadingStyle = 'mobl__ui__generic__loadingStyle';

mobl.ui.generic.whenLoaded = function(value, style, loadingMessage, elements, callback) {
  var root199 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node6 = $("<span>");
  root199.append(node6);
  var condSubs0 = new mobl.CompSubscription();
  subs__.addSub(condSubs0);
  var oldValue0;
  var renderCond0 = function() {
    var value12 = value.get();
    if(oldValue0 === value12) return;
    oldValue0 = value12;
    var subs__ = condSubs0;
    subs__.unsubscribe();
    node6.empty();
    if(value12) {
      var nodes145 = $("<span>");
      node6.append(nodes145);
      subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
        renderControl4();
      }));
      
      function renderControl4() {
        subs__.addSub((elements)(function(elements, callback) {
          var root200 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root200); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes145;
          nodes145 = node.contents();
          oldNodes.replaceWith(nodes145);
        }));
      }
      renderControl4();
      
      
    } else {
      var nodes146 = $("<span>");
      node6.append(nodes146);
      subs__.addSub((mobl.block)(style, mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
        var root201 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        var nodes147 = $("<span>");
        root201.append(nodes147);
        subs__.addSub((mobl.label)(loadingMessage, mobl.ref(null), mobl.ref(null), function(_, callback) {
          var root202 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root202); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes147;
          nodes147 = node.contents();
          oldNodes.replaceWith(nodes147);
        }));
        var nodes148 = $("<span>");
        root201.append(nodes148);
        subs__.addSub((mobl.ui.generic.image)(mobl.ref("data:image/gif;base64,R0lGODlhIAAgAOf2AAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19f///////////////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQD/ACwAAAAAIAAgAAAI/gABCBxIsKDBgwgTKlzIsKHDhxAjSiSoYc+bCBMFbqCSY4DAApTgyQOUcUGkZcXAeHxQLB49SgI+xnSYAdYxZsjCDHgQLN48NAEEaFAh4oDDA3+EIXO2rAiAN96owQBQ4YVVCg87XBKWLNofAAROlAgAwIPVFxAgmrAkzJgWgxZcvADhESKGKk2MFhTgIAKBhwweNCjAMICBvwoPHMkDCNCYBwoLhFhxIm3CFYEIGUKkiIfCC2dLzDyI4k6e03hqKLQQerTBAkHCgOFCREHkDydGQFYoYAGDBK4RBiX78ACFBsQJBoAAIThDAyVguMBaEIPcEIgbBjBrtQOAAAoSTAgEcXZ3QwEnrLqQAMD6CgdUz1J3yOFFCwwBBqR/ESJoBhUk6OXQABAwQBYBKVhFAnEF1JURAB9YhcGDByHgwQUOUqjhhhx26KGGAQEAIfkEBQUA/wAsBQADABQAGAAACMwA/wkcSDDABg8BCCpc+I+KMmhKGEpcAAsdu1MFJGZwUmOgg14WgS1gqIDQLltZBoJsB0wBwwugbPXSpeXfAlro3LXKONCAQANzYt361QvIPzXZvHlROGGghkSxcgm7IzBGjQESBYpAFMsWlawMLTQx4hOsQAUNFhAwOzBAjTJs2lRhwPYfhDBs3MCRI6NuAilfAn9RUReACCFIisxAUBgAAQQGEtZVaKDp5IEkXjQGAIDDZYIlPg+84EL0PwEOTC/0ILDCZwMZKAhYGBAAIfkEBQUA/wAsBQADABIAFgAACMsA/wkcSBBDnDMQCCokGOBPt295FkpsEKubOFsKFlowAkOAwAi4uo3zxUBhgjupTEXx6GCWyFwCCTgQSOERqVWqpghQsKobuVP/GADSIrCAmU6lWrXa8e8MtWtb/r3pVGPghTyeTsFq8+9ADh3/Aqj5odADHk+lmiwMIXECEbISCRJQkCBAXIIAMBSxYgVIxrv/BuyQQsVKFhOAA9MgwpjIh8T/IKx40SJEAcj/BBQggLlz3Mue/2UIHWBE6H8UWEAGwJq1gr8ERRAMCAAh+QQFBQD/ACwFAAMAFAAWAAAIzgD/CRxI8IKaMA8IKlz47w60aXMYSmRgCpq1VhL/GUhBYiAEVtCu1VrAcEAVSJKSCGyAKiSsBAI3OBho4M2jS5iWCPwEDdsngYSswfogMMAURJA0bbLxLwwyZlf+tXFHLx2QgRTOIJLUSYxGGzcEbqL3jY4EghnMIIpEZOEcaGUYQtBxo8BCBCIUCjBwICPDBC14/IDR169AACBs4NDRI4Phwx1gSIYx4bFABCBUpPBAwHJRz6BDh8bAsLBCAKgBeGCowjCEFSxE/zuAwHJAACH5BAUFAP8ALAYAAwATABgAAAjSAP8JHDiwwhcpDggqXNgGWDE2CyP+W5AJGDJRCRQC2KiAwUYADjwFQ6Zq4UYOZuT4EMhAU7BkpgZqmPBvoxA8gQYF+ZdAUrBllggs+OOsVomNM+DkIYToxb8suX5J+ZemHLt3ZwQ2oBJnDyIrAmXMEGiJHbx3UwZSmNJ1x8I36uKRgkCwwQsXBBYqQHLFgsAABAh8HEwYgMACHlKo+JBXIkEKLyK/iOD4seQXEioPLPBBYIcBmkOLHk1a4oXSnlH/Y4BihWYRCgsY0BxAdejTEQMCACH5BAUFAP8ALAYAAwAVABYAAAjMAP8JHDhwgpUlCwgqXChwzCtaWhhK/KdA0atblhAwBMARQICBDRy9wtVJgUAFLTgQJDBjyYuPCxa9yqVJYwZI1X7JGOihC5o2NwIgGPRqFyOBj76NMxdnYAcrYNjIQfEPSipYTP6d2bb0HJSBCX5cEQMnyb8CLl4IOABKnLl0nyAQfNDjypgYC+eUSwcKw8IEI0YMWAjhypcKAzlO/PvAwD8BGFCg6LD4nwEbNlA4kFtZ4oPOEgWoBD1QRAPSqFOrXs1wA2uKJ14TSB0QACH5BAUFAP8ALAYAAwAWABYAAAjdAP8JHDiwAAsWAggqBMCwYcMlljYVUUiRYoI8m0oFKlDxn0OHC/pwMvUogcAERqI8ENjwwgsOJ/NwOsXowL8LiJxZo0NwgQ8nVFj8OzCHE6o/Ag1Ju7bNFIKBDXIUiaIFxD8jlj5NDOOMabczBAmY2HHEig6BKVb8M2DJ2rZvmFYSTIBiRxITFNlo+5bpQkUDFzIkVPhgyhYKHRMTVPDB778AihV6SMXtGJJ/DFxEHuiGnDZqmxIs0Lz534klQnioeJwhRYrSAxd4BECAAOzbuHPr3r1ZhWPdBRjCDggAIfkEBQUA/wAsBgADABYAFQAACNQAAQgcSFDBAYIIAfxbyJDhCDZoRDScSHEhAS6GIHFJOLDivwNnDEXSc2AhgiBLHEw0YCGCSTOGJAVC8K+CH2DI2jQcQGJGjg//DIQxRIlOAQV8iCVz1qmkyRYwbPzA8C+Hn0U2/mn5hcwZtDANBYh4EUOHin8COoRYuKirNEgqJ5ogq4FimWbTIlXwWEFCAIoOnliZ4LFwwwQeLDBUbJhhh1HVghn5l6BFY4Z13sGDx2tB5csL6dAbfUsBaIYcENGapeP0xAM0XcueTbu27X8hDDAMCAAh+QQFBQD/ACwGAAMAFgAVAAAIywABCBxIsKBBAP8SKlS4AEcOBgsjSkwo4IebPEUmakxoQIobPWgMKORRpEHEAQ0WCDwwxQ2fNwf+TZgDCxeZhQE8uGBRAeETN37IEEgQZ1YuX5EWFlDx4kWLB/9aoLnj4l8UV7h8CdMisekLDv8CYABb4M8tX8MMmZzogoLELr2IHXI7kQJUiQ2SQJGwsa/CDhUSAgjsN+EGTsx6MfmHgEXhhHDMnTtXS0Hjx//gsNtsK6EFFI83eDImawlmpXdPq17NurXrfx8KKAwIACH5BAUFAP8ALAYABAAXABMAAAjSAP8JHDhQAIYMAQgq/AegoUOHJaJoUbGwokICO6iEiTJA4IEWPhgsDKAggcACPKiM2WLgXwQznExtGegQw78VAgngoFJmygAEZD6dakWoZUETCkNAAYMUySZTrWJNodnww0IJFwIQiFOq1aw9Ii3+k7BwCitafMiKtchgiJIIa+P+Q8CBRAWjcgeGmBQsGa9HEg7gzNtnGzdu3bQZMTBY7h1xkMVxOwKAwom8HDD98uVLDgKBHfP+c0A6tOgdUhyIXijk0SYKqxXGEPMi9sIKBAMCACH5BAUFAP8ALAYABAAYABUAAAjRAAEIHEhQAQKCCAf+W8iQoYUZPDA0nEix4YATOIzsELDQQIkQHCsmMLBwQAocSIwQ+OcAC6JENipaaKGiJEYlQAQYqKJIUqYwBCsutGDjiId/PQxFyuQpidCGAhlEWBgGUiZQbhY8fZoEUyg4U7cKVcBjyAOxaP9pEBECQtqJJRzR4tXL04u3CwPwaebsGTRokgoQQPHWj7XDhyWtnPD2Q6RatWg5IoyXYYPLBSoniBKl8kQx7tqV8szwhq5675yQXnhkWD0zqxcaKdQhdkmKAQEAIfkEBQUA/wAsBgAEABgAFQAACNgA/wkcSLAAAYIIEyZ8kOIEA4UQCQoo8QJGiQACBSQwAKCjR48FCJ6o2ELAvwVBylB5mDBCCoQvYrD4V8DInD2CXiQMMCIhixcU/sl4o2cQIRMRBWoQqGABgAFQ8gxS5CVkUggJewhiJMZB0ogJaOho8LXsAQwfPjwYOKGsQBGCSrFyJWnFPwIo3P6b4+sXMGDBDh3U+88OMmTHDiMSiNVtB0SrVKUqhJQwQgaD9SJw4oSsZYEB8pwr96nt5wGk4rU7t+SzQDfw4rkT4/rkIGudagsksOFAwoAAIfkEBQUA/wAsBwAEABYAFQAACMIA/wkcODBAAIIIExJkICLEAYUQBQYI8eLFBgAYAQTIiDFixRICDaz4geIgQQcJK44IQIBGFjFhIiAEMRDlPxYsIPwjUSXMGjUTEHYYmEEgAgX/AuwAs2bOEwIRFcZQU2cKg6gKD6RgsQBrVAMVOGxo8E+n138e6lDa1InQibMC0bBq5eoVrD1w/7G5xZdvn7wb/Hjq1GnPiLz/CDBYjFiJEsQD63TTdkkC5E/oyHFDAnkNusxeIP/78wwVSNEaEiAMCAAh+QQFBQD/ACwIAAQAFgAXAAAIzQD/CRw4EIDBgwgPEhy4IMSHhRAj/gNRMGFCiQsHYCgB4SJGgQJC8DiSQwBBAB4+XtBhBMqSAws5SDRYoggULTkCLDxQAiOIJ1yEKPgYccCHEQmIfiwgAQMGBEoJajATCFEiNyKiCuSCKdMmTpzcDNAaplQpUmbhjI2KYc6jR47ePNQqcMGCoVohXJnigO5AOtWeObKgNUKAA6i6YZvGiEHUR0z+ufHWLRu0IVERrSrw7xG4yl2iltn8T8KhZ7ZWRKVSZmCBEhi0ZsCLMSAAIfkEBQUA/wAsCQAEABUAFwAACNgAAQgcSLCgwX8IEx7woKFAwocQIX5AmCGiRQIWEQp4QAHjwwYnUmT818EFjA8BRkas8AJGDRcCHmpQ6cGlDxEFDai0UAMIDIcqIQqokEFn0IwEHkxoYPToPwtV2Mh5s6WC039OBA0qZOiQEgBOqUAaO7YJ2KMVzPzx4yfMhKv/BiSYO8ApBStMGsBF+AZZsEEUggqYUeLfgn/QlBET5EClCGXXlPxLMw3aMmJeVLpIJs/UPwWHqEFjZunAyBrU5CWsEGmaMzSas8FjkxACkyV6R0KYoyb3yIAAIfkEBQUA/wAsCQAFABQAFgAACMsA/wkcaADDBQIDEypcyHDhgIYDGzQQkHCBCRQQ/7lwcQGARwAcMv57QXJEgIEZRJJ8UUGkQpIgHrocCCECwpkKByx4kMDjTAdArGyxIoOiwI9IP/JIs6aNmzMRZv7IQzXPmwkzIVxxA8eMjJM4ESw44DOjBCdFGOAUeAYXrDsSMiKwQeKfgk7BdNGy06BhgD3mnh35J6ZYsF20rDSEoAxeuk//EvwxFoyXIgMML0iDp46UwAmIiv0C03DAJsdoBj44YkRtQw90zogMCAAh+QQFBQD/ACwIAAUAFQAWAAAIswD/CRz4rwDBgwgPekjIsKHAAAoUAJg40eHADf9YRLAoUMWDgx8oAmB44ADHkyhTohSAQIEBlQha9BCyw8LIkyqeRJlCZcgAlDLACAVzhECJkw2QZMHSBAMAASsPGPh5MoKRHgpU/utiipMaCBxpiPiXABIsVKHSLHB4p1uxIf+20IKVKlQTh8TOfbsksE4tWKr4NLTA7Bw4TgIl9Jnl6opDS+e8jRnoAAeQtQ07vBHDwGFAACH5BAUFAP8ALAkABQAUABgAAAjRAP8JHCiwwgCCCP8BWMiQQ8KHEBEmMBAxYgsVDipGdKixY0cXHhNmDJkwgAEDAkgaCLGChQgEITnQqHEDxwcAHkcU2VmEBM6OCWwQGSIjAcl/BQqk7OiABw2jD2XoYMhwSqRDW0YKpCBwTiOBOmAMQCCI06RFWxQgvAKtyz851IYh+SdFFKdKjYIQdNFJD4IHvLZJSyQAgZpRnCydOSgQQYaDH55xm/bvwD8IcUBtagJRQzJu1DhZ/sdARg61Dx/Y4latz1Eqw2jhOBqAwwWNAQEAIfkEBQUA/wAsCQAFABMAGAAACMwA/wkc+O8CBYIIExK8oLChwgMOHbJAoSDivxQJNVgsYLGjx48fCQQAKTDFBwIeM7xY+QJCShgwXzzwaIBEixUfBnwMMGDAyIEjECRM8EIFRIIl1jxDk9BIHjhKFgy0cEecPEn/DtxoIeCAHEN96CwR+k/LuXnptPxjc6yWkH9IHBnyY8eGQBzIqtn550CWs2F+snZxdOgPEwAACnIQiMGXs2KQDPD9osiPDIUXejkzNklyVhUjBCikgMvZMUUoOw44tPkKSA1jrkhtGBAAIfkEBQUA/wAsCQAFABMAGAAACMMA/wkc+K/CBIIIEypcyHCgAQINFa4wgSCiQgsWE0LIyLGjRwAAPP7TIECkCwcZLbxY6aJBxgIfTpioEKCjAAEg/4UgU0ThARIfChD0sGueOTIJc4SxgqOiQDXy3qlrJHBGin8EtLwhs8UGxH+K3q0DZ+VfGVyldvzzceeNGS4cBNoI1kyOQFO/ZMkJYOBJWzMhBlrQINBCrF+0BAlUoAQNEgUXD9cyNHBAgwEgQxKUsOqXLT8DOPb5VetJRwxcoEBeGBAAIfkEBQUA/wAsCQAHABMAFgAACLcA/wkcSPAfAAAFBhRcWFCDChIHGEqcSLGixYsYM2q8EEDjPxYRNa4IibGEBAAeB4IQM4TkwAEYKCgc2KHWum5gFqoosoNEgYFz1JkDZ+ifARck/gUYUiXJjxEd/x0yF65alH9dTk2i8S/GlypLfCgQSCPXMDYHGGRq9YnMvwJAvFQhkmBghQwCKYxqFWrOTwQugoA4iJIgBVGtRtkpQFgA4cIDI3RqRQoORgFzEh/JaGEKkroSAwIAIfkEBQUA/wAsBwAHABUAFgAACMwA/wkcSLDgPwEGEyYUYUChw4EQHj58ILGixYsYMxYYWAEAxgsDVRhg0UOIE5AWRdoYdStRA4sjBjaosNFigIIfzERRYFDAhAkJR7gKZ02MQQ4wXoQoiGEUOG3T/vwrgOJDgAAwcsR4sQGA139ivmmrlswKgCmU/rD4R4KIVhQDBv7ZZs1ZnX8LFGVSVOXfgBdDcpRAKFAGrF9sXkqYpImRGAL/DIQIsaAghQ6Q/0mIpMlRGQJeQ4dO+KCRpkdgMv4Lc7qHaghFdiBwGBAAIfkEBQUA/wAsBgAOABYADwAACLwA/1lYkeKfwYMIE/6bIFCVLUqAVCic+A8FAQzO6NGLx4WiwhMD/lHx1WwSBI8JHyCkgLLlvw5gmrhUGKIUtWRbFGJ48WKihU3TmhWrY1CEhn8ARPB8kQFhADnSmhnT9eRfkj9pRvy7sLSEgIMKUDU79kuMAQV5CMkh8k9ABxcvOACY+2+AnmPB4ij4BwEQoTpPQgp4MIFASiNEGBh84IfQnSghZxpMYIcQHiUBJB9EEkiOCc0HDZj4kJliQAAh+QQFBQD/ACwGAAcAFgAWAAAIzAD/CRxIsOA/AgYHkkg4EAMKhhAjSpxIsaLFgRUsDLj4L0AVZtEyYagYQeCyeCivVDwx4AIyduzUaalYQsC/KLeKOeIokMEEngQ5aEGSwGAACBBsGvywyViuKQldMKwQiVgvWmoOYvj5LwRENcN62UJ15F+PM1E0/LMwUEQAgpx63XKVpQACM2uyyADwj8O/FhUICohzC5aZohHesNmyQ6kDBm8JOgDiY4FAB2vYdOmhtOIBLmy+wABAurTp06U/TBFSkiFq0wUEvC4dEAAh+QQFBQD/ACwGAA0AFgAQAAAIsAD//aNQQaDBgwgRSjG2rNKFhBBPQPhXgRi6dOmoQIRYQoCFX+LEgbuysWQTV7wOPSjJUgLLl/8yTAmCACbCDo5qoVrCkgDCCYVosQrl5d8ACQwAADhoAWEYWaxGVfLxL0aTGysPdlC6NIEjVqQ0Ofl3IEqUHiAMtmAx8aAZUpuw1HSQJQoQEwEELlDAdem/BjlqGBCoYIoUIXhtGgywQ8oQDYoPMlDhYUDJvpgzaw4IACH5BAUFAP8ALAUACQAWABMAAAjDAP8J/FekxsCDCBMK3CPJoMKHA0PkgjQDokUQYjRYRGhgwoV/BzYivPBIGLJilyyIFOjACzdu3bx9C7NSoBZrOK1V61JzBIZFuHLJIkRhpYgF/wpYwDCBQE2FF5boCPn0n4ZAoigFqRoBTyhMjKD8E8AgAUQAaK98wuQIEI1/I2iscIBQ40AEfzBBKjSEQIEdNmCECCCQBQqkB7VAMrQkJIIegUsIDHCgQMIFMlpYToojsIiqAkPQaAEB9NgHDNCqXh0QACH5BAUFAP8ALAQABwAYABUAAAjaAP8JHNigwMCDCBMOxIHrjMKHCRvRc4YEosV/f+LR+8Th4kMQu+J9m+Hx4YczTAyWHCjBAoWVCHdgutVrF6QLKxv8U/Dp2TNo0aS5WTkiQIJLyJImDbNSRIB/NS6tYlVKD86SCgYqqGAhAkyIFITMMPB14IU4jfzYKPvvQZpFguoE+Rcgq0AQLBUyUSToDhoV/zC4GFhhYIaEBMoIytPGxoABKF68MLziRIKBADID8FGHTQ+DBVRIJvEvM9mHBDxwGCBwwAnJHzTLnk07s4UVKBhArD3bgMqHAQEAIfkEBQUA/wAsBAAHABUAFQAACLYA/wkc+MBCgIEIEya08c8ZmwEDFEoUiIgdPHRIJk7Uk65dPEAaJX6glY7clJASPYxJgnJggQgVJBhoOfBGo1WxXh2yQDPBpF/AggkjZoYmgkW3buFKqoXmvxiJNnGq9KaC038JJlB4cFVhBBwqCnSdAMbOGRVXE1yhk2YLjJAREMKQk8aLkw0hLwDYC+BFGjBUVgj4d4ImAyJMUhBoyXcvgQMHBZoQqKHrPwgmSiSw/G/AYIUBAQAh+QQFBQD/ACwEAAcAFwAVAAAIswD/CRwoocLAgwgTDsx1LI3ChwcFiTsHzghEiHS8jUPH5+LDDqu8bYPi8aMXiyUPQpgQISVCGYE6jRLFR4LLBQgKuXIFK5YsKi5FHOhTqmjRKC4FrtCjSBEhMTaT/kMAIYKDAVITOmgRQkDWfxCadGGyIeuAIVueAAFx8UHCC1WeDKER9SGFhBSYFMHBIcBDFSQOJBQQYsUFrA8LIP4HoLHjAI4FjPh6kMEIDwYo/wvg92FAACH5BAUFAP8ALAQABQAVABcAAAjRAP8JHEjw34YpFAQUXJihQwCBAR7dirGwIJBdxMgM+PcgWS0ZFQcGMGRNWzUz/yAgWxWSoJxo1rhdQ/JPDqeWAzeQinbNm6F/BDrgHJhiVLRpYIYu3MBlygGlQB1EeFAAqsAWdBpJkhQnAtQDdjRt4uTp0xKoBtpAWrv2iNUSau7ciUMFgtV/Bxw8WKDwLsEFHyo8vKsgh5AZFO4KaPGDBgyhVhfkcOzCb4EVMFxgwPmhAIDPnxlkoPCQQIqKD0GrBh0ghF+CCDxALri6tm3QAQEAIfkEAQUA/wAsBAAFABUAFgAACMYA/wkcSPCfhjVZGBQsaIFKjgEDF8V7N2fhwAOBlhUDM3BYPHqKLAqUgOpYs2Rh/j0IFm9eGZH/BOQRhuzZsiL/3nh7BgPmvw6XhCWL9kfgCQ4BfP4zYUmYMS1KF2Ko0iTqQAYPHFgdWOHLHkCAxjywGiAKoUKHECkKQtZJnrdveWylwCRMGC5EGmyNuYBBgr0LD1DQC9hACRguAAfwAOPFC8ADTjiOCoGggBAvWkQlUNAABYVRAYgeTRrAB4EYAAvkcAFiwYAAOw=="), mobl.ref(null), mobl.ref(null), mobl.ref(null), mobl.ref(null), mobl.ref("middle"), mobl.ref(null), function(_, callback) {
          var root203 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root203); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes148;
          nodes148 = node.contents();
          oldNodes.replaceWith(nodes148);
        }));
        callback(root201); return subs__;
        
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes146;
        nodes146 = node.contents();
        oldNodes.replaceWith(nodes146);
      }));
      
      
    }
  };
  renderCond0();
  subs__.addSub(value.addEventListener('change', function() {
    renderCond0();
  }));
  
  callback(root199); return subs__;
  
  return subs__;
};
mobl.ui.generic.headerStyle = 'mobl__ui__generic__headerStyle';
mobl.ui.generic.headerContainerStyle = 'mobl__ui__generic__headerContainerStyle';
mobl.ui.generic.headerTextStyle = 'mobl__ui__generic__headerTextStyle';

mobl.ui.generic.header = function(text, fixedPosition, onclick, elements, callback) {
  var root204 = $("<span>");
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
  
  var ref12 = mobl.ref(fixedPosition.get() ? "position:fixed;" : null);
  if(ref12.get() !== null) {
    node7.attr('style', ref12.get());
    subs__.addSub(ref12.addEventListener('change', function(_, ref, val) {
      node7.attr('style', val);
    }));
    subs__.addSub(fixedPosition.addEventListener('change', function() {
      node7.attr('style', fixedPosition.get() ? "position:fixed;" : null);
    }));
    
  }
  subs__.addSub(ref12.rebind());
  
  
  var node10 = $("<div>");
  
  var ref10 = mobl.ref(mobl.ui.generic.headerContainerStyle);
  if(ref10.get() !== null) {
    node10.attr('class', ref10.get());
    subs__.addSub(ref10.addEventListener('change', function(_, ref, val) {
      node10.attr('class', val);
    }));
    
  }
  subs__.addSub(ref10.rebind());
  
  
  var node11 = $("<div>");
  
  var ref8 = text;
  node11.text(""+ref8.get());
  var ignore1 = false;
  subs__.addSub(ref8.addEventListener('change', function(_, ref, val) {
    if(ignore1) return;
    node11.text(""+val);
  }));
  subs__.addSub(ref8.rebind());
  
  
  var ref9 = mobl.ref(mobl.ui.generic.headerTextStyle);
  if(ref9.get() !== null) {
    node11.attr('class', ref9.get());
    subs__.addSub(ref9.addEventListener('change', function(_, ref, val) {
      node11.attr('class', val);
    }));
    
  }
  subs__.addSub(ref9.rebind());
  
  node10.append(node11);
  node7.append(node10);
  var nodes149 = $("<span>");
  node7.append(nodes149);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl5();
  }));
  
  function renderControl5() {
    subs__.addSub((elements)(function(elements, callback) {
      var root205 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root205); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes149;
      nodes149 = node.contents();
      oldNodes.replaceWith(nodes149);
    }));
  }
  renderControl5();
  root204.append(node7);
  
  var node8 = $("<span>");
  root204.append(node8);
  var condSubs1 = new mobl.CompSubscription();
  subs__.addSub(condSubs1);
  var oldValue1;
  var renderCond1 = function() {
    var value13 = fixedPosition.get();
    if(oldValue1 === value13) return;
    oldValue1 = value13;
    var subs__ = condSubs1;
    subs__.unsubscribe();
    node8.empty();
    if(value13) {
      
      var node9 = $("<div>");
      node9.attr('id', "hello");
      node9.attr('style', "height: 2.9em;");
      
      node8.append(node9);
      
      
    } else {
      
    }
  };
  renderCond1();
  subs__.addSub(fixedPosition.addEventListener('change', function() {
    renderCond1();
  }));
  
  callback(root204); return subs__;
  
  
  
  
  
  return subs__;
};
mobl.ui.generic.buttonStyle = 'mobl__ui__generic__buttonStyle';
mobl.ui.generic.buttonPushedStyle = 'mobl__ui__generic__buttonPushedStyle';
mobl.ui.generic.buttonStyle = 'mobl__ui__generic__buttonStyle';
mobl.ui.generic.buttonPushedStyle = 'mobl__ui__generic__buttonPushedStyle';

mobl.ui.generic.button = function(text, style, pushedStyle, onclick, elements, callback) {
  var root206 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var pushed = mobl.ref(false);
  
  var sp = $("<span>");
  
  var ref13 = mobl.ref(pushed.get() ? pushedStyle.get() : style.get());
  if(ref13.get() !== null) {
    sp.attr('class', ref13.get());
    subs__.addSub(ref13.addEventListener('change', function(_, ref, val) {
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
  subs__.addSub(ref13.rebind());
  
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
                    var tmp115 = result__;
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
  
  var ref14 = text;
  sp.text(""+ref14.get());
  var ignore2 = false;
  subs__.addSub(ref14.addEventListener('change', function(_, ref, val) {
    if(ignore2) return;
    sp.text(""+val);
  }));
  subs__.addSub(ref14.rebind());
  
  
  root206.append(sp);
  callback(root206); return subs__;
  
  return subs__;
};
mobl.ui.generic.sideButtonStyle = 'mobl__ui__generic__sideButtonStyle';
mobl.ui.generic.sideButtonPushedStyle = 'mobl__ui__generic__sideButtonPushedStyle';

mobl.ui.generic.sideButton = function(text, style, pushedStyle, onclick, elements, callback) {
  var root207 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes150 = $("<span>");
  root207.append(nodes150);
  subs__.addSub((mobl.ui.generic.button)(text, style, pushedStyle, onclick, function(_, callback) {
    var root208 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root208); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes150;
    nodes150 = node.contents();
    oldNodes.replaceWith(nodes150);
  }));
  callback(root207); return subs__;
  
  return subs__;
};
mobl.ui.generic.backButtonStyle = 'mobl__ui__generic__backButtonStyle';
mobl.ui.generic.backButtonPushedStyle = 'mobl__ui__generic__backButtonPushedStyle';
mobl.ui.generic.backButtonStyle = 'mobl__ui__generic__backButtonStyle';
mobl.ui.generic.backButtonPushedStyle = 'mobl__ui__generic__backButtonPushedStyle';

mobl.ui.generic.backButton = function(text, style, pushedStyle, onclick, elements, callback) {
  var root209 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes151 = $("<span>");
  root209.append(nodes151);
  subs__.addSub((mobl.ui.generic.button)(text, style, pushedStyle, onclick, function(_, callback) {
    var root210 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root210); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes151;
    nodes151 = node.contents();
    oldNodes.replaceWith(nodes151);
  }));
  callback(root209); return subs__;
  
  return subs__;
};
mobl.ui.generic.groupStyle = 'mobl__ui__generic__groupStyle';

mobl.ui.generic.group = function(elements, callback) {
  var root211 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node12 = $("<ul>");
  
  var ref15 = mobl.ref(mobl.ui.generic.groupStyle);
  if(ref15.get() !== null) {
    node12.attr('class', ref15.get());
    subs__.addSub(ref15.addEventListener('change', function(_, ref, val) {
      node12.attr('class', val);
    }));
    
  }
  subs__.addSub(ref15.rebind());
  
  var nodes152 = $("<span>");
  node12.append(nodes152);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl6();
  }));
  
  function renderControl6() {
    subs__.addSub((elements)(function(elements, callback) {
      var root212 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root212); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes152;
      nodes152 = node.contents();
      oldNodes.replaceWith(nodes152);
    }));
  }
  renderControl6();
  root211.append(node12);
  callback(root211); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.image = function(url, width, height, onclick, style, valign, align, elements, callback) {
  var root213 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node13 = $("<img>");
  
  var ref16 = url;
  if(ref16.get() !== null) {
    node13.attr('src', ref16.get());
    subs__.addSub(ref16.addEventListener('change', function(_, ref, val) {
      node13.attr('src', val);
    }));
    
  }
  subs__.addSub(ref16.rebind());
  
  var ref17 = width;
  if(ref17.get() !== null) {
    node13.attr('width', ref17.get());
    subs__.addSub(ref17.addEventListener('change', function(_, ref, val) {
      node13.attr('width', val);
    }));
    
  }
  subs__.addSub(ref17.rebind());
  
  var ref18 = height;
  if(ref18.get() !== null) {
    node13.attr('height', ref18.get());
    subs__.addSub(ref18.addEventListener('change', function(_, ref, val) {
      node13.attr('height', val);
    }));
    
  }
  subs__.addSub(ref18.rebind());
  
  var ref19 = style;
  if(ref19.get() !== null) {
    node13.attr('class', ref19.get());
    subs__.addSub(ref19.addEventListener('change', function(_, ref, val) {
      node13.attr('class', val);
    }));
    
  }
  subs__.addSub(ref19.rebind());
  
  var val10 = onclick.get();
  if(val10 !== null) {
    subs__.addSub(mobl.domBind(node13, 'tap', val10));
  }
  
  var ref20 = valign;
  if(ref20.get() !== null) {
    node13.attr('valign', ref20.get());
    subs__.addSub(ref20.addEventListener('change', function(_, ref, val) {
      node13.attr('valign', val);
    }));
    
  }
  subs__.addSub(ref20.rebind());
  
  var ref21 = align;
  if(ref21.get() !== null) {
    node13.attr('align', ref21.get());
    subs__.addSub(ref21.addEventListener('change', function(_, ref, val) {
      node13.attr('align', val);
    }));
    
  }
  subs__.addSub(ref21.rebind());
  
  root213.append(node13);
  callback(root213); return subs__;
  
  return subs__;
};
mobl.ui.generic.itemStyle = 'mobl__ui__generic__itemStyle';
mobl.ui.generic.itemPushedStyle = 'mobl__ui__generic__itemPushedStyle';
mobl.ui.generic.itemArrowStyle = 'mobl__ui__generic__itemArrowStyle';
mobl.ui.generic.itemDownArrowStyle = 'mobl__ui__generic__itemDownArrowStyle';

mobl.ui.generic.item = function(style, pushedStyle, onclick, onswipe, hideArrow, elements, callback) {
  var root214 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var pushed = mobl.ref(false);
  
  var el = $("<li>");
  
  var ref22 = mobl.ref(mobl.ui.generic.itemStyle);
  if(ref22.get() !== null) {
    el.attr('class', ref22.get());
    subs__.addSub(ref22.addEventListener('change', function(_, ref, val) {
      el.attr('class', val);
    }));
    
  }
  subs__.addSub(ref22.rebind());
  
  var ref23 = mobl.ref(onclick.get() && hideArrow.get() == false ? mobl.mergeStyles([pushed.get() ? pushedStyle.get() : style.get(), mobl.ui.generic.itemArrowStyle]) : (pushed.get() ? pushedStyle.get() : style.get()));
  if(ref23.get() !== null) {
    el.attr('class', ref23.get());
    subs__.addSub(ref23.addEventListener('change', function(_, ref, val) {
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
  subs__.addSub(ref23.rebind());
  
  var val11 = onswipe.get();
  if(val11 !== null) {
    subs__.addSub(mobl.domBind(el, 'swipe', val11));
  }
  
  var val12 = onclick.get() ? function(event, callback) {
                                         if(event && event.stopPropagation) event.stopPropagation();
                                         var result__ = true;
                                         pushed.set(result__);
                                         mobl.sleep(100, function(result__) {
                                           var tmp116 = result__;
                                           function after1(result__) {
                                             var tmp117 = result__;
                                             
                                           }
                                           var result__ = onclick.get()(event, after1);if(result__ !== undefined) after1(result__);
                                           mobl.sleep(200, function(result__) {
                                             var tmp118 = result__;
                                             var result__ = false;
                                             pushed.set(result__);
                                             if(callback && callback.apply) callback(); return;
                                           });
                                           
                                         });
                                       } : null;
  if(val12 !== null) {
    subs__.addSub(mobl.domBind(el, 'tap', val12));
  }
  
  var nodes153 = $("<span>");
  el.append(nodes153);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl7();
  }));
  
  function renderControl7() {
    subs__.addSub((elements)(function(elements, callback) {
      var root215 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root215); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes153;
      nodes153 = node.contents();
      oldNodes.replaceWith(nodes153);
    }));
  }
  renderControl7();
  root214.append(el);
  callback(root214); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.checkBox = function(b, label, onchange, elements, callback) {
  var root216 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node14 = $("<input>");
  node14.attr('type', "checkbox");
  
  var ref25 = b;
  node14.attr('checked', !!ref25.get());
  subs__.addSub(ref25.addEventListener('change', function(_, ref, val) {
    if(ref === ref25) node14.attr('checked', !!val);
  }));
  subs__.addSub(mobl.domBind(node14, 'change', function() {
    b.set(!!node14.attr('checked'));
  }));
  
  var val14 = function(event, callback) {
                if(event && event.stopPropagation) event.stopPropagation();
                if(callback && callback.apply) callback(); return;
              };
  if(val14 !== null) {
    subs__.addSub(mobl.domBind(node14, 'tap', val14));
  }
  
  var val15 = onchange.get();
  if(val15 !== null) {
    subs__.addSub(mobl.domBind(node14, 'change', val15));
  }
  
  root216.append(node14);
  
  root216.append(" ");
  
  var node15 = $("<span>");
  
  var ref24 = label;
  node15.text(""+ref24.get());
  var ignore3 = false;
  subs__.addSub(ref24.addEventListener('change', function(_, ref, val) {
    if(ignore3) return;
    node15.text(""+val);
  }));
  subs__.addSub(ref24.rebind());
  
  
  var val13 = function(event, callback) {
                if(event && event.stopPropagation) event.stopPropagation();
                var result__ = !b.get();
                b.set(result__);
                var result__ = onchange.get();
                if(result__) {
                  function after2(result__) {
                    var tmp119 = result__;
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
    subs__.addSub(mobl.domBind(node15, 'tap', val13));
  }
  
  root216.append(node15);
  callback(root216); return subs__;
  
  
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


mobl.ui.generic.textField = function(s, placeholder, label, inputType, validator, style, invalidStyle, autofocus, autocorrect, autocapitalize, autocomplete, onchange, onkeyup, elements, callback) {
  var root217 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node16 = $("<span>");
  root217.append(node16);
  var condSubs2 = new mobl.CompSubscription();
  subs__.addSub(condSubs2);
  var oldValue2;
  var renderCond2 = function() {
    var value14 = label.get();
    if(oldValue2 === value14) return;
    oldValue2 = value14;
    var subs__ = condSubs2;
    subs__.unsubscribe();
    node16.empty();
    if(value14) {
      var nodes154 = $("<span>");
      node16.append(nodes154);
      subs__.addSub((mobl.label)(label, mobl.ref(mobl.ui.generic.textFieldLabelStyle), mobl.ref(null), function(_, callback) {
        var root218 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root218); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes154;
        nodes154 = node.contents();
        oldNodes.replaceWith(nodes154);
      }));
      
      
    } else {
      
    }
  };
  renderCond2();
  subs__.addSub(label.addEventListener('change', function() {
    renderCond2();
  }));
  
  
  var node17 = $("<span>");
  root217.append(node17);
  var condSubs3 = new mobl.CompSubscription();
  subs__.addSub(condSubs3);
  var oldValue3;
  var renderCond3 = function() {
    var value15 = validator.get();
    if(oldValue3 === value15) return;
    oldValue3 = value15;
    var subs__ = condSubs3;
    subs__.unsubscribe();
    node17.empty();
    if(value15) {
      
      var temp = mobl.ref(s.get());
      
      var identifier = mobl.ref(mobl.random(999));
      function after6(result__) {
        var tmp120 = result__;
        var validationMessage = mobl.ref(result__);
        mobl.sleep(200, function(result__) {
          var tmp121 = result__;
          var result__ = mobl.setValidationError(identifier.get(), !validationMessage.get());
          
        });
        
        var node18 = $("<input>");
        
        var ref26 = inputType;
        if(ref26.get() !== null) {
          node18.attr('type', ref26.get());
          subs__.addSub(ref26.addEventListener('change', function(_, ref, val) {
            node18.attr('type', val);
          }));
          
        }
        subs__.addSub(ref26.rebind());
        
        var ref27 = mobl.ref(validationMessage.get() ? invalidStyle.get() : style.get());
        if(ref27.get() !== null) {
          node18.attr('class', ref27.get());
          subs__.addSub(ref27.addEventListener('change', function(_, ref, val) {
            node18.attr('class', val);
          }));
          subs__.addSub(validationMessage.addEventListener('change', function() {
            node18.attr('class', validationMessage.get() ? invalidStyle.get() : style.get());
          }));
          subs__.addSub(invalidStyle.addEventListener('change', function() {
            node18.attr('class', validationMessage.get() ? invalidStyle.get() : style.get());
          }));
          subs__.addSub(style.addEventListener('change', function() {
            node18.attr('class', validationMessage.get() ? invalidStyle.get() : style.get());
          }));
          
        }
        subs__.addSub(ref27.rebind());
        
        var ref28 = placeholder;
        if(ref28.get() !== null) {
          node18.attr('placeholder', ref28.get());
          subs__.addSub(ref28.addEventListener('change', function(_, ref, val) {
            node18.attr('placeholder', val);
          }));
          
        }
        subs__.addSub(ref28.rebind());
        
        var ref29 = temp;
        node18.val(""+ref29.get());
        var ignore4 = false;
        subs__.addSub(ref29.addEventListener('change', function(_, ref, val) {
          if(ignore4) return;
          node18.val(""+val);
        }));
        subs__.addSub(ref29.rebind());
        
        subs__.addSub(mobl.domBind(node18, 'keyup change', function() {
          ignore4 = true;
          temp.set(mobl.stringTomobl__String(node18.val()));
          ignore4 = false;
        }));
        
        
        var val16 = onchange.get();
        if(val16 !== null) {
          subs__.addSub(mobl.domBind(node18, 'change', val16));
        }
        
        var val17 = function(event, callback) {
                      if(event && event.stopPropagation) event.stopPropagation();
                      var result__ = onkeyup.get();
                      if(result__) {
                        function after3(result__) {
                          var tmp122 = result__;
                          function after4(result__) {
                            var tmp123 = result__;
                            var result__ = tmp123;
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
                            var tmp123 = result__;
                            var result__ = tmp123;
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
          subs__.addSub(mobl.domBind(node18, 'keyup', val17));
        }
        
        var ref30 = autofocus;
        if(ref30.get() !== null) {
          node18.attr('autofocus', ref30.get());
          subs__.addSub(ref30.addEventListener('change', function(_, ref, val) {
            node18.attr('autofocus', val);
          }));
          
        }
        subs__.addSub(ref30.rebind());
        
        var ref31 = autocorrect;
        if(ref31.get() !== null) {
          node18.attr('autocorrect', ref31.get());
          subs__.addSub(ref31.addEventListener('change', function(_, ref, val) {
            node18.attr('autocorrect', val);
          }));
          
        }
        subs__.addSub(ref31.rebind());
        
        var ref32 = autocapitalize;
        if(ref32.get() !== null) {
          node18.attr('autocapitalize', ref32.get());
          subs__.addSub(ref32.addEventListener('change', function(_, ref, val) {
            node18.attr('autocapitalize', val);
          }));
          
        }
        subs__.addSub(ref32.rebind());
        
        var ref33 = autocomplete;
        if(ref33.get() !== null) {
          node18.attr('autocomplete', ref33.get());
          subs__.addSub(ref33.addEventListener('change', function(_, ref, val) {
            node18.attr('autocomplete', val);
          }));
          
        }
        subs__.addSub(ref33.rebind());
        
        node17.append(node18);
        var nodes155 = $("<span>");
        node17.append(nodes155);
        subs__.addSub((mobl.label)(validationMessage, mobl.ref(mobl.ui.generic.validationMessageStyle), mobl.ref(null), function(_, callback) {
          var root219 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root219); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes155;
          nodes155 = node.contents();
          oldNodes.replaceWith(nodes155);
        }));
        
        
        
        
      }
      var result__ = validator.get()(s.get(), after6);if(result__ !== undefined) after6(result__);
    } else {
      
      var node19 = $("<input>");
      
      var ref34 = inputType;
      if(ref34.get() !== null) {
        node19.attr('type', ref34.get());
        subs__.addSub(ref34.addEventListener('change', function(_, ref, val) {
          node19.attr('type', val);
        }));
        
      }
      subs__.addSub(ref34.rebind());
      
      var ref35 = style;
      if(ref35.get() !== null) {
        node19.attr('class', ref35.get());
        subs__.addSub(ref35.addEventListener('change', function(_, ref, val) {
          node19.attr('class', val);
        }));
        
      }
      subs__.addSub(ref35.rebind());
      
      var ref36 = placeholder;
      if(ref36.get() !== null) {
        node19.attr('placeholder', ref36.get());
        subs__.addSub(ref36.addEventListener('change', function(_, ref, val) {
          node19.attr('placeholder', val);
        }));
        
      }
      subs__.addSub(ref36.rebind());
      
      var ref37 = s;
      node19.val(""+ref37.get());
      var ignore5 = false;
      subs__.addSub(ref37.addEventListener('change', function(_, ref, val) {
        if(ignore5) return;
        node19.val(""+val);
      }));
      subs__.addSub(ref37.rebind());
      
      subs__.addSub(mobl.domBind(node19, 'keyup change', function() {
        ignore5 = true;
        s.set(mobl.stringTomobl__String(node19.val()));
        ignore5 = false;
      }));
      
      
      var val18 = onchange.get();
      if(val18 !== null) {
        subs__.addSub(mobl.domBind(node19, 'change', val18));
      }
      
      var val19 = onkeyup.get();
      if(val19 !== null) {
        subs__.addSub(mobl.domBind(node19, 'keyup', val19));
      }
      
      var ref38 = autofocus;
      if(ref38.get() !== null) {
        node19.attr('autofocus', ref38.get());
        subs__.addSub(ref38.addEventListener('change', function(_, ref, val) {
          node19.attr('autofocus', val);
        }));
        
      }
      subs__.addSub(ref38.rebind());
      
      var ref39 = autocorrect;
      if(ref39.get() !== null) {
        node19.attr('autocorrect', ref39.get());
        subs__.addSub(ref39.addEventListener('change', function(_, ref, val) {
          node19.attr('autocorrect', val);
        }));
        
      }
      subs__.addSub(ref39.rebind());
      
      var ref40 = autocapitalize;
      if(ref40.get() !== null) {
        node19.attr('autocapitalize', ref40.get());
        subs__.addSub(ref40.addEventListener('change', function(_, ref, val) {
          node19.attr('autocapitalize', val);
        }));
        
      }
      subs__.addSub(ref40.rebind());
      
      var ref41 = autocomplete;
      if(ref41.get() !== null) {
        node19.attr('autocomplete', ref41.get());
        subs__.addSub(ref41.addEventListener('change', function(_, ref, val) {
          node19.attr('autocomplete', val);
        }));
        
      }
      subs__.addSub(ref41.rebind());
      
      node17.append(node19);
      
      
    }
  };
  renderCond3();
  subs__.addSub(validator.addEventListener('change', function() {
    renderCond3();
  }));
  
  callback(root217); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.emailField = function(s, placeholder, label, validator, style, invalidStyle, autofocus, onchange, onkeyup, elements, callback) {
  var root220 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes156 = $("<span>");
  root220.append(nodes156);
  subs__.addSub((mobl.ui.generic.textField)(s, placeholder, label, mobl.ref("email"), validator, style, invalidStyle, autofocus, mobl.ref(false), mobl.ref(false), mobl.ref(false), onchange, onkeyup, function(_, callback) {
    var root221 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root221); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes156;
    nodes156 = node.contents();
    oldNodes.replaceWith(nodes156);
  }));
  callback(root220); return subs__;
  
  return subs__;
};

mobl.ui.generic.telField = function(phoneNumber, placeholder, label, validator, style, invalidStyle, autofocus, onchange, onkeyup, elements, callback) {
  var root222 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes157 = $("<span>");
  root222.append(nodes157);
  subs__.addSub((mobl.ui.generic.textField)(phoneNumber, placeholder, label, mobl.ref("tel"), validator, style, invalidStyle, autofocus, mobl.ref(false), mobl.ref(false), mobl.ref(false), onchange, onkeyup, function(_, callback) {
    var root223 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root223); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes157;
    nodes157 = node.contents();
    oldNodes.replaceWith(nodes157);
  }));
  callback(root222); return subs__;
  
  return subs__;
};

mobl.ui.generic.rangeField = function(n, min, max, step, placeholder, label, onchange, onkeyup, elements, callback) {
  var root224 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node20 = $("<span>");
  root224.append(node20);
  var condSubs4 = new mobl.CompSubscription();
  subs__.addSub(condSubs4);
  var oldValue4;
  var renderCond4 = function() {
    var value16 = label.get();
    if(oldValue4 === value16) return;
    oldValue4 = value16;
    var subs__ = condSubs4;
    subs__.unsubscribe();
    node20.empty();
    if(value16) {
      var nodes158 = $("<span>");
      node20.append(nodes158);
      subs__.addSub((mobl.label)(label, mobl.ref(mobl.ui.generic.textFieldLabelStyle), mobl.ref(null), function(_, callback) {
        var root225 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root225); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes158;
        nodes158 = node.contents();
        oldNodes.replaceWith(nodes158);
      }));
      
      
    } else {
      
    }
  };
  renderCond4();
  subs__.addSub(label.addEventListener('change', function() {
    renderCond4();
  }));
  
  
  var node21 = $("<input>");
  node21.attr('type', "range");
  
  var ref42 = n;
  node21.val(""+ref42.get());
  var ignore6 = false;
  subs__.addSub(ref42.addEventListener('change', function(_, ref, val) {
    if(ignore6) return;
    node21.val(""+val);
  }));
  subs__.addSub(ref42.rebind());
  
  subs__.addSub(mobl.domBind(node21, 'keyup change', function() {
    ignore6 = true;
    n.set(mobl.stringTomobl__Num(node21.val()));
    ignore6 = false;
  }));
  
  
  var ref43 = min;
  if(ref43.get() !== null) {
    node21.attr('min', ref43.get());
    subs__.addSub(ref43.addEventListener('change', function(_, ref, val) {
      node21.attr('min', val);
    }));
    
  }
  subs__.addSub(ref43.rebind());
  
  var ref44 = max;
  if(ref44.get() !== null) {
    node21.attr('max', ref44.get());
    subs__.addSub(ref44.addEventListener('change', function(_, ref, val) {
      node21.attr('max', val);
    }));
    
  }
  subs__.addSub(ref44.rebind());
  
  var ref45 = step;
  if(ref45.get() !== null) {
    node21.attr('step', ref45.get());
    subs__.addSub(ref45.addEventListener('change', function(_, ref, val) {
      node21.attr('step', val);
    }));
    
  }
  subs__.addSub(ref45.rebind());
  node21.attr('style', "width: 99%;");
  
  var val20 = onchange.get();
  if(val20 !== null) {
    subs__.addSub(mobl.domBind(node21, 'change', val20));
  }
  
  var val21 = onkeyup.get();
  if(val21 !== null) {
    subs__.addSub(mobl.domBind(node21, 'keyup', val21));
  }
  
  var ref46 = placeholder;
  if(ref46.get() !== null) {
    node21.attr('placeholder', ref46.get());
    subs__.addSub(ref46.addEventListener('change', function(_, ref, val) {
      node21.attr('placeholder', val);
    }));
    
  }
  subs__.addSub(ref46.rebind());
  
  root224.append(node21);
  callback(root224); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.numField = function(n, label, placeholder, validator, style, invalidStyle, autofocus, step, min, max, onchange, onkeyup, elements, callback) {
  var root226 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var validateNum = function(n) {
     var __this = this;
    if(mobl.Math.isNaN(n)) {
      return mobl._("Not a valid numeric value", []);
    } else if(max.get() != null && n > max.get()) {
      return mobl._("Number is too high, maximum is: %%", [max.get()]);
    } else if(min.get() != null && n < min.get()) {
      return mobl._("Number is too low, minimum is: %%", [min.get()]);
    } else {
      return "";
    }
  };
  
  
  var result__ = validator.get() == null;
  if(result__) {
    var result__ = validateNum;
    validator.set(result__);
    function after9(result__) {
      var tmp124 = result__;
      var validationMessage = mobl.ref(result__);
      
      var node22 = $("<input>");
      node22.attr('type', "number");
      
      var ref47 = mobl.ref(validationMessage.get() ? invalidStyle.get() : style.get());
      if(ref47.get() !== null) {
        node22.attr('class', ref47.get());
        subs__.addSub(ref47.addEventListener('change', function(_, ref, val) {
          node22.attr('class', val);
        }));
        subs__.addSub(validationMessage.addEventListener('change', function() {
          node22.attr('class', validationMessage.get() ? invalidStyle.get() : style.get());
        }));
        subs__.addSub(invalidStyle.addEventListener('change', function() {
          node22.attr('class', validationMessage.get() ? invalidStyle.get() : style.get());
        }));
        subs__.addSub(style.addEventListener('change', function() {
          node22.attr('class', validationMessage.get() ? invalidStyle.get() : style.get());
        }));
        
      }
      subs__.addSub(ref47.rebind());
      
      var ref48 = placeholder;
      if(ref48.get() !== null) {
        node22.attr('placeholder', ref48.get());
        subs__.addSub(ref48.addEventListener('change', function(_, ref, val) {
          node22.attr('placeholder', val);
        }));
        
      }
      subs__.addSub(ref48.rebind());
      
      var ref49 = n;
      node22.val(""+ref49.get());
      var ignore7 = false;
      subs__.addSub(ref49.addEventListener('change', function(_, ref, val) {
        if(ignore7) return;
        node22.val(""+val);
      }));
      subs__.addSub(ref49.rebind());
      
      subs__.addSub(mobl.domBind(node22, 'keyup change', function() {
        ignore7 = true;
        n.set(mobl.stringTomobl__Num(node22.val()));
        ignore7 = false;
      }));
      
      
      var val22 = onchange.get();
      if(val22 !== null) {
        subs__.addSub(mobl.domBind(node22, 'change', val22));
      }
      
      var val23 = function(event, callback) {
                    if(event && event.stopPropagation) event.stopPropagation();
                    function after7(result__) {
                      var tmp125 = result__;
                      var result__ = tmp125;
                      validationMessage.set(result__);
                      var result__ = onkeyup.get();
                      if(result__) {
                        function after8(result__) {
                          var tmp126 = result__;
                          if(callback && callback.apply) callback(); return;
                        }
                        var result__ = onkeyup.get()(event, after8);if(result__ !== undefined) after8(result__);
                      } else {
                        {
                          if(callback && callback.apply) callback(); return;
                        }
                      }
                    }
                    var result__ = validator.get()(n.get(), after7);if(result__ !== undefined) after7(result__);
                  };
      if(val23 !== null) {
        subs__.addSub(mobl.domBind(node22, 'keyup', val23));
      }
      
      var ref50 = autofocus;
      if(ref50.get() !== null) {
        node22.attr('autofocus', ref50.get());
        subs__.addSub(ref50.addEventListener('change', function(_, ref, val) {
          node22.attr('autofocus', val);
        }));
        
      }
      subs__.addSub(ref50.rebind());
      
      var ref51 = step;
      if(ref51.get() !== null) {
        node22.attr('step', ref51.get());
        subs__.addSub(ref51.addEventListener('change', function(_, ref, val) {
          node22.attr('step', val);
        }));
        
      }
      subs__.addSub(ref51.rebind());
      
      var ref52 = min;
      if(ref52.get() !== null) {
        node22.attr('min', ref52.get());
        subs__.addSub(ref52.addEventListener('change', function(_, ref, val) {
          node22.attr('min', val);
        }));
        
      }
      subs__.addSub(ref52.rebind());
      
      var ref53 = max;
      if(ref53.get() !== null) {
        node22.attr('max', ref53.get());
        subs__.addSub(ref53.addEventListener('change', function(_, ref, val) {
          node22.attr('max', val);
        }));
        
      }
      subs__.addSub(ref53.rebind());
      
      root226.append(node22);
      var nodes159 = $("<span>");
      root226.append(nodes159);
      subs__.addSub((mobl.label)(validationMessage, mobl.ref(mobl.ui.generic.validationMessageStyle), mobl.ref(null), function(_, callback) {
        var root227 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root227); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes159;
        nodes159 = node.contents();
        oldNodes.replaceWith(nodes159);
      }));
      callback(root226); return subs__;
      
      
    }
    var result__ = validator.get()(n.get(), after9);if(result__ !== undefined) after9(result__);
  } else {
    {
      function after9(result__) {
        var tmp124 = result__;
        var validationMessage = mobl.ref(result__);
        
        var node22 = $("<input>");
        node22.attr('type', "number");
        
        var ref47 = mobl.ref(validationMessage.get() ? invalidStyle.get() : style.get());
        if(ref47.get() !== null) {
          node22.attr('class', ref47.get());
          subs__.addSub(ref47.addEventListener('change', function(_, ref, val) {
            node22.attr('class', val);
          }));
          subs__.addSub(validationMessage.addEventListener('change', function() {
            node22.attr('class', validationMessage.get() ? invalidStyle.get() : style.get());
          }));
          subs__.addSub(invalidStyle.addEventListener('change', function() {
            node22.attr('class', validationMessage.get() ? invalidStyle.get() : style.get());
          }));
          subs__.addSub(style.addEventListener('change', function() {
            node22.attr('class', validationMessage.get() ? invalidStyle.get() : style.get());
          }));
          
        }
        subs__.addSub(ref47.rebind());
        
        var ref48 = placeholder;
        if(ref48.get() !== null) {
          node22.attr('placeholder', ref48.get());
          subs__.addSub(ref48.addEventListener('change', function(_, ref, val) {
            node22.attr('placeholder', val);
          }));
          
        }
        subs__.addSub(ref48.rebind());
        
        var ref49 = n;
        node22.val(""+ref49.get());
        var ignore7 = false;
        subs__.addSub(ref49.addEventListener('change', function(_, ref, val) {
          if(ignore7) return;
          node22.val(""+val);
        }));
        subs__.addSub(ref49.rebind());
        
        subs__.addSub(mobl.domBind(node22, 'keyup change', function() {
          ignore7 = true;
          n.set(mobl.stringTomobl__Num(node22.val()));
          ignore7 = false;
        }));
        
        
        var val22 = onchange.get();
        if(val22 !== null) {
          subs__.addSub(mobl.domBind(node22, 'change', val22));
        }
        
        var val23 = function(event, callback) {
                      if(event && event.stopPropagation) event.stopPropagation();
                      function after7(result__) {
                        var tmp125 = result__;
                        var result__ = tmp125;
                        validationMessage.set(result__);
                        var result__ = onkeyup.get();
                        if(result__) {
                          function after8(result__) {
                            var tmp126 = result__;
                            if(callback && callback.apply) callback(); return;
                          }
                          var result__ = onkeyup.get()(event, after8);if(result__ !== undefined) after8(result__);
                        } else {
                          {
                            if(callback && callback.apply) callback(); return;
                          }
                        }
                      }
                      var result__ = validator.get()(n.get(), after7);if(result__ !== undefined) after7(result__);
                    };
        if(val23 !== null) {
          subs__.addSub(mobl.domBind(node22, 'keyup', val23));
        }
        
        var ref50 = autofocus;
        if(ref50.get() !== null) {
          node22.attr('autofocus', ref50.get());
          subs__.addSub(ref50.addEventListener('change', function(_, ref, val) {
            node22.attr('autofocus', val);
          }));
          
        }
        subs__.addSub(ref50.rebind());
        
        var ref51 = step;
        if(ref51.get() !== null) {
          node22.attr('step', ref51.get());
          subs__.addSub(ref51.addEventListener('change', function(_, ref, val) {
            node22.attr('step', val);
          }));
          
        }
        subs__.addSub(ref51.rebind());
        
        var ref52 = min;
        if(ref52.get() !== null) {
          node22.attr('min', ref52.get());
          subs__.addSub(ref52.addEventListener('change', function(_, ref, val) {
            node22.attr('min', val);
          }));
          
        }
        subs__.addSub(ref52.rebind());
        
        var ref53 = max;
        if(ref53.get() !== null) {
          node22.attr('max', ref53.get());
          subs__.addSub(ref53.addEventListener('change', function(_, ref, val) {
            node22.attr('max', val);
          }));
          
        }
        subs__.addSub(ref53.rebind());
        
        root226.append(node22);
        var nodes159 = $("<span>");
        root226.append(nodes159);
        subs__.addSub((mobl.label)(validationMessage, mobl.ref(mobl.ui.generic.validationMessageStyle), mobl.ref(null), function(_, callback) {
          var root227 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root227); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes159;
          nodes159 = node.contents();
          oldNodes.replaceWith(nodes159);
        }));
        callback(root226); return subs__;
        
        
      }
      var result__ = validator.get()(n.get(), after9);if(result__ !== undefined) after9(result__);
    }
  }
  return subs__;
};

mobl.ui.generic.passwordField = function(s, placeholder, label, style, onchange, onkeyup, elements, callback) {
  var root228 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node23 = $("<span>");
  root228.append(node23);
  var condSubs5 = new mobl.CompSubscription();
  subs__.addSub(condSubs5);
  var oldValue5;
  var renderCond5 = function() {
    var value17 = label.get();
    if(oldValue5 === value17) return;
    oldValue5 = value17;
    var subs__ = condSubs5;
    subs__.unsubscribe();
    node23.empty();
    if(value17) {
      
      var node24 = $("<span>");
      node24.attr('style', "float: left; margin-top: 0.2em; width: 5em; color: #666;");
      
      var ref57 = label;
      node24.text(""+ref57.get());
      var ignore9 = false;
      subs__.addSub(ref57.addEventListener('change', function(_, ref, val) {
        if(ignore9) return;
        node24.text(""+val);
      }));
      subs__.addSub(ref57.rebind());
      
      
      node23.append(node24);
      
      var node25 = $("<span>");
      node25.attr('style', "float: left");
      
      
      var node26 = $("<input>");
      node26.attr('type', "password");
      
      var ref54 = style;
      if(ref54.get() !== null) {
        node26.attr('class', ref54.get());
        subs__.addSub(ref54.addEventListener('change', function(_, ref, val) {
          node26.attr('class', val);
        }));
        
      }
      subs__.addSub(ref54.rebind());
      
      var ref55 = placeholder;
      if(ref55.get() !== null) {
        node26.attr('placeholder', ref55.get());
        subs__.addSub(ref55.addEventListener('change', function(_, ref, val) {
          node26.attr('placeholder', val);
        }));
        
      }
      subs__.addSub(ref55.rebind());
      
      var ref56 = s;
      node26.val(""+ref56.get());
      var ignore8 = false;
      subs__.addSub(ref56.addEventListener('change', function(_, ref, val) {
        if(ignore8) return;
        node26.val(""+val);
      }));
      subs__.addSub(ref56.rebind());
      
      subs__.addSub(mobl.domBind(node26, 'keyup change', function() {
        ignore8 = true;
        s.set(mobl.stringTomobl__String(node26.val()));
        ignore8 = false;
      }));
      
      
      var val24 = onchange.get();
      if(val24 !== null) {
        subs__.addSub(mobl.domBind(node26, 'change', val24));
      }
      
      var val25 = onkeyup.get();
      if(val25 !== null) {
        subs__.addSub(mobl.domBind(node26, 'keyup', val25));
      }
      
      var val26 = function(event, callback) {
                    if(event && event.stopPropagation) event.stopPropagation();
                    var result__ = mobl.ui.generic.scrollUp();
                    if(callback && callback.apply) callback(); return;
                  };
      if(val26 !== null) {
        subs__.addSub(mobl.domBind(node26, 'blur', val26));
      }
      
      node25.append(node26);
      node23.append(node25);
      
      
      
      
    } else {
      
      var node27 = $("<input>");
      node27.attr('type', "password");
      
      var ref58 = style;
      if(ref58.get() !== null) {
        node27.attr('class', ref58.get());
        subs__.addSub(ref58.addEventListener('change', function(_, ref, val) {
          node27.attr('class', val);
        }));
        
      }
      subs__.addSub(ref58.rebind());
      
      var ref59 = placeholder;
      if(ref59.get() !== null) {
        node27.attr('placeholder', ref59.get());
        subs__.addSub(ref59.addEventListener('change', function(_, ref, val) {
          node27.attr('placeholder', val);
        }));
        
      }
      subs__.addSub(ref59.rebind());
      
      var ref60 = s;
      node27.val(""+ref60.get());
      var ignore10 = false;
      subs__.addSub(ref60.addEventListener('change', function(_, ref, val) {
        if(ignore10) return;
        node27.val(""+val);
      }));
      subs__.addSub(ref60.rebind());
      
      subs__.addSub(mobl.domBind(node27, 'keyup change', function() {
        ignore10 = true;
        s.set(mobl.stringTomobl__String(node27.val()));
        ignore10 = false;
      }));
      
      
      var val27 = onchange.get();
      if(val27 !== null) {
        subs__.addSub(mobl.domBind(node27, 'change', val27));
      }
      
      var val28 = onkeyup.get();
      if(val28 !== null) {
        subs__.addSub(mobl.domBind(node27, 'keyup', val28));
      }
      
      var val29 = function(event, callback) {
                    if(event && event.stopPropagation) event.stopPropagation();
                    var result__ = mobl.ui.generic.scrollUp();
                    if(callback && callback.apply) callback(); return;
                  };
      if(val29 !== null) {
        subs__.addSub(mobl.domBind(node27, 'blur', val29));
      }
      
      node23.append(node27);
      
      
    }
  };
  renderCond5();
  subs__.addSub(label.addEventListener('change', function() {
    renderCond5();
  }));
  
  callback(root228); return subs__;
  
  return subs__;
};
mobl.ui.generic.selectFieldStyle = 'mobl__ui__generic__selectFieldStyle';

mobl.ui.generic.selectField = function(value, options, onchange, style, optionStyle, elements, callback) {
  var root229 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var sel = $("<select>");
  
  var ref65 = style;
  if(ref65.get() !== null) {
    sel.attr('class', ref65.get());
    subs__.addSub(ref65.addEventListener('change', function(_, ref, val) {
      sel.attr('class', val);
    }));
    
  }
  subs__.addSub(ref65.rebind());
  
  var val30 = function(event, callback) {
                if(event && event.stopPropagation) event.stopPropagation();
                var result__ = sel.val();
                value.set(result__);
                var result__ = onchange.get();
                if(result__) {
                  function after10(result__) {
                    var tmp128 = result__;
                    if(callback && callback.apply) callback(); return;
                  }
                  var result__ = onchange.get()(event, after10);if(result__ !== undefined) after10(result__);
                } else {
                  {
                    if(callback && callback.apply) callback(); return;
                  }
                }
              };
  if(val30 !== null) {
    subs__.addSub(mobl.domBind(sel, 'change', val30));
  }
  
  
  var node28 = mobl.loadingSpan();
  sel.append(node28);
  var list0;
  var listSubs0 = new mobl.CompSubscription();
  subs__.addSub(listSubs0);
  var renderList0 = function() {
    var subs__ = listSubs0;
    list0 = options.get();
    list0.list(function(results0) {
      node28.empty();
      for(var i0 = 0; i0 < results0.length; i0++) {
        (function() {
          var iternode0 = $("<span>");
          node28.append(iternode0);
          var optionValue;var optionDescription;
          optionValue = mobl.ref(mobl.ref(mobl.ref(results0), i0), "_1");optionDescription = mobl.ref(mobl.ref(mobl.ref(results0), i0), "_2");
          
          var node29 = $("<option>");
          
          var ref61 = optionDescription;
          node29.text(""+ref61.get());
          var ignore11 = false;
          subs__.addSub(ref61.addEventListener('change', function(_, ref, val) {
            if(ignore11) return;
            node29.text(""+val);
          }));
          subs__.addSub(ref61.rebind());
          
          
          var ref62 = optionStyle;
          if(ref62.get() !== null) {
            node29.attr('class', ref62.get());
            subs__.addSub(ref62.addEventListener('change', function(_, ref, val) {
              node29.attr('class', val);
            }));
            
          }
          subs__.addSub(ref62.rebind());
          
          var ref63 = optionValue;
          if(ref63.get() !== null) {
            node29.attr('value', ref63.get());
            subs__.addSub(ref63.addEventListener('change', function(_, ref, val) {
              node29.attr('value', val);
            }));
            
          }
          subs__.addSub(ref63.rebind());
          
          var ref64 = mobl.ref(value.get() == optionValue.get() ? "selected" : "");
          if(ref64.get() !== null) {
            node29.attr('selected', ref64.get());
            subs__.addSub(ref64.addEventListener('change', function(_, ref, val) {
              node29.attr('selected', val);
            }));
            subs__.addSub(value.addEventListener('change', function() {
              node29.attr('selected', value.get() == optionValue.get() ? "selected" : "");
            }));
            subs__.addSub(optionValue.addEventListener('change', function() {
              node29.attr('selected', value.get() == optionValue.get() ? "selected" : "");
            }));
            
          }
          subs__.addSub(ref64.rebind());
          
          iternode0.append(node29);
          
          var oldNodes = iternode0;
          iternode0 = iternode0.contents();
          oldNodes.replaceWith(iternode0);
          
          
        }());
      }
      mobl.delayedUpdateScrollers();
      subs__.addSub(list0.addEventListener('change', function() { listSubs0.unsubscribe(); renderList0(true); }));
      subs__.addSub(options.addEventListener('change', function() { listSubs0.unsubscribe(); renderList0(true); }));
    });
  };
  renderList0();
  
  root229.append(sel);
  var result__ = sel.append(sel.children().eq(0).children());
  callback(root229); return subs__;
  
  
  return subs__;
};
mobl.ui.generic.tabbarStyle = 'mobl__ui__generic__tabbarStyle';
mobl.ui.generic.inActiveTabButtonStyle = 'mobl__ui__generic__inActiveTabButtonStyle';
mobl.ui.generic.activeTabButtonStyle = 'mobl__ui__generic__activeTabButtonStyle';
mobl.ui.generic.inActiveTabStyle = 'mobl__ui__generic__inActiveTabStyle';
mobl.ui.generic.activeTabStyle = 'mobl__ui__generic__activeTabStyle';

mobl.ui.generic.tabSet = function(tabs, activeTab, elements, callback) {
  var root230 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var result__ = activeTab.get() == null;
  if(result__) {
    var result__ = tabs.get().get(0)._1;
    activeTab.set(result__);
    
    var s = mobl.ref("");
    var nodes160 = $("<span>");
    root230.append(nodes160);
    subs__.addSub((mobl.block)(mobl.ref(mobl.ui.generic.tabbarStyle), mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
      var root231 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      
      var node30 = mobl.loadingSpan();
      root231.append(node30);
      var list1;
      var listSubs1 = new mobl.CompSubscription();
      subs__.addSub(listSubs1);
      var renderList1 = function() {
        var subs__ = listSubs1;
        list1 = tabs.get();
        list1.list(function(results1) {
          node30.empty();
          for(var i1 = 0; i1 < results1.length; i1++) {
            (function() {
              var iternode1 = $("<span>");
              node30.append(iternode1);
              var tabName;var tabIcon;var tabControl;
              tabName = mobl.ref(mobl.ref(mobl.ref(results1), i1), "_1");tabIcon = mobl.ref(mobl.ref(mobl.ref(results1), i1), "_2");tabControl = mobl.ref(mobl.ref(mobl.ref(results1), i1), "_3");
              var result__ = activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle;
              var tmp93 = mobl.ref(result__);
              subs__.addSub(activeTab.addEventListener('change', function() {
                tmp93.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
              }));
              subs__.addSub(tabName.addEventListener('change', function() {
                tmp93.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
              }));
              subs__.addSub(mobl.ref(mobl.ui.generic.activeTabButtonStyle).addEventListener('change', function() {
                tmp93.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
              }));
              subs__.addSub(mobl.ref(mobl.ui.generic.inActiveTabButtonStyle).addEventListener('change', function() {
                tmp93.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
              }));
              
              var result__ = function(event, callback) {
                               if(event && event.stopPropagation) event.stopPropagation();
                               var result__ = tabName.get();
                               activeTab.set(result__);
                               if(callback && callback.apply) callback(); return;
                             };
              var tmp92 = mobl.ref(result__);
              
              var nodes161 = $("<span>");
              iternode1.append(nodes161);
              subs__.addSub((mobl.span)(tmp93, mobl.ref(null), tmp92, mobl.ref(null), function(_, callback) {
                var root232 = $("<span>");
                var subs__ = new mobl.CompSubscription();
                var nodes162 = $("<span>");
                root232.append(nodes162);
                subs__.addSub((mobl.label)(tabName, mobl.ref(null), mobl.ref(null), function(_, callback) {
                  var root233 = $("<span>");
                  var subs__ = new mobl.CompSubscription();
                  callback(root233); return subs__;
                  return subs__;
                }, function(node) {
                  var oldNodes = nodes162;
                  nodes162 = node.contents();
                  oldNodes.replaceWith(nodes162);
                }));
                callback(root232); return subs__;
                
                return subs__;
              }, function(node) {
                var oldNodes = nodes161;
                nodes161 = node.contents();
                oldNodes.replaceWith(nodes161);
              }));
              
              var oldNodes = iternode1;
              iternode1 = iternode1.contents();
              oldNodes.replaceWith(iternode1);
              
              
            }());
          }
          mobl.delayedUpdateScrollers();
          subs__.addSub(list1.addEventListener('change', function() { listSubs1.unsubscribe(); renderList1(true); }));
          subs__.addSub(tabs.addEventListener('change', function() { listSubs1.unsubscribe(); renderList1(true); }));
        });
      };
      renderList1();
      
      callback(root231); return subs__;
      
      return subs__;
    }, function(node) {
      var oldNodes = nodes160;
      nodes160 = node.contents();
      oldNodes.replaceWith(nodes160);
    }));
    
    var node31 = mobl.loadingSpan();
    root230.append(node31);
    var list2;
    var listSubs2 = new mobl.CompSubscription();
    subs__.addSub(listSubs2);
    var renderList2 = function() {
      var subs__ = listSubs2;
      list2 = tabs.get();
      list2.list(function(results2) {
        node31.empty();
        for(var i2 = 0; i2 < results2.length; i2++) {
          (function() {
            var iternode2 = $("<span>");
            node31.append(iternode2);
            var tabName;var tabIcon;var tabControl;
            tabName = mobl.ref(mobl.ref(mobl.ref(results2), i2), "_1");tabIcon = mobl.ref(mobl.ref(mobl.ref(results2), i2), "_2");tabControl = mobl.ref(mobl.ref(mobl.ref(results2), i2), "_3");
            var result__ = activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle;
            var tmp94 = mobl.ref(result__);
            subs__.addSub(activeTab.addEventListener('change', function() {
              tmp94.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
            }));
            subs__.addSub(tabName.addEventListener('change', function() {
              tmp94.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.activeTabStyle).addEventListener('change', function() {
              tmp94.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.inActiveTabStyle).addEventListener('change', function() {
              tmp94.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
            }));
            
            var nodes163 = $("<span>");
            iternode2.append(nodes163);
            subs__.addSub((mobl.block)(tmp94, mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
              var root234 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              var nodes164 = $("<span>");
              root234.append(nodes164);
              subs__.addSub((mobl.screenContext)(function(_, callback) {
                var root235 = $("<span>");
                var subs__ = new mobl.CompSubscription();
                var nodes165 = $("<span>");
                root235.append(nodes165);
                subs__.addSub(tabControl.addEventListener('change', function() {
                  renderControl8();
                }));
                
                function renderControl8() {
                  subs__.addSub((tabControl.get())(function(elements, callback) {
                    var root236 = $("<span>");
                    var subs__ = new mobl.CompSubscription();
                    callback(root236); return subs__;
                    return subs__;
                  }, function(node) {
                    var oldNodes = nodes165;
                    nodes165 = node.contents();
                    oldNodes.replaceWith(nodes165);
                  }));
                }
                renderControl8();
                callback(root235); return subs__;
                
                return subs__;
              }, function(node) {
                var oldNodes = nodes164;
                nodes164 = node.contents();
                oldNodes.replaceWith(nodes164);
              }));
              callback(root234); return subs__;
              
              return subs__;
            }, function(node) {
              var oldNodes = nodes163;
              nodes163 = node.contents();
              oldNodes.replaceWith(nodes163);
            }));
            
            var oldNodes = iternode2;
            iternode2 = iternode2.contents();
            oldNodes.replaceWith(iternode2);
            
            
          }());
        }
        mobl.delayedUpdateScrollers();
        subs__.addSub(list2.addEventListener('change', function() { listSubs2.unsubscribe(); renderList2(true); }));
        subs__.addSub(tabs.addEventListener('change', function() { listSubs2.unsubscribe(); renderList2(true); }));
      });
    };
    renderList2();
    
    callback(root230); return subs__;
    
    
  } else {
    {
      
      var s = mobl.ref("");
      var nodes160 = $("<span>");
      root230.append(nodes160);
      subs__.addSub((mobl.block)(mobl.ref(mobl.ui.generic.tabbarStyle), mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
        var root231 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var node30 = mobl.loadingSpan();
        root231.append(node30);
        var list1;
        var listSubs1 = new mobl.CompSubscription();
        subs__.addSub(listSubs1);
        var renderList1 = function() {
          var subs__ = listSubs1;
          list1 = tabs.get();
          list1.list(function(results1) {
            node30.empty();
            for(var i1 = 0; i1 < results1.length; i1++) {
              (function() {
                var iternode1 = $("<span>");
                node30.append(iternode1);
                var tabName;var tabIcon;var tabControl;
                tabName = mobl.ref(mobl.ref(mobl.ref(results1), i1), "_1");tabIcon = mobl.ref(mobl.ref(mobl.ref(results1), i1), "_2");tabControl = mobl.ref(mobl.ref(mobl.ref(results1), i1), "_3");
                var result__ = activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle;
                var tmp93 = mobl.ref(result__);
                subs__.addSub(activeTab.addEventListener('change', function() {
                  tmp93.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
                }));
                subs__.addSub(tabName.addEventListener('change', function() {
                  tmp93.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
                }));
                subs__.addSub(mobl.ref(mobl.ui.generic.activeTabButtonStyle).addEventListener('change', function() {
                  tmp93.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
                }));
                subs__.addSub(mobl.ref(mobl.ui.generic.inActiveTabButtonStyle).addEventListener('change', function() {
                  tmp93.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabButtonStyle : mobl.ui.generic.inActiveTabButtonStyle);
                }));
                
                var result__ = function(event, callback) {
                                 if(event && event.stopPropagation) event.stopPropagation();
                                 var result__ = tabName.get();
                                 activeTab.set(result__);
                                 if(callback && callback.apply) callback(); return;
                               };
                var tmp92 = mobl.ref(result__);
                
                var nodes161 = $("<span>");
                iternode1.append(nodes161);
                subs__.addSub((mobl.span)(tmp93, mobl.ref(null), tmp92, mobl.ref(null), function(_, callback) {
                  var root232 = $("<span>");
                  var subs__ = new mobl.CompSubscription();
                  var nodes162 = $("<span>");
                  root232.append(nodes162);
                  subs__.addSub((mobl.label)(tabName, mobl.ref(null), mobl.ref(null), function(_, callback) {
                    var root233 = $("<span>");
                    var subs__ = new mobl.CompSubscription();
                    callback(root233); return subs__;
                    return subs__;
                  }, function(node) {
                    var oldNodes = nodes162;
                    nodes162 = node.contents();
                    oldNodes.replaceWith(nodes162);
                  }));
                  callback(root232); return subs__;
                  
                  return subs__;
                }, function(node) {
                  var oldNodes = nodes161;
                  nodes161 = node.contents();
                  oldNodes.replaceWith(nodes161);
                }));
                
                var oldNodes = iternode1;
                iternode1 = iternode1.contents();
                oldNodes.replaceWith(iternode1);
                
                
              }());
            }
            mobl.delayedUpdateScrollers();
            subs__.addSub(list1.addEventListener('change', function() { listSubs1.unsubscribe(); renderList1(true); }));
            subs__.addSub(tabs.addEventListener('change', function() { listSubs1.unsubscribe(); renderList1(true); }));
          });
        };
        renderList1();
        
        callback(root231); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes160;
        nodes160 = node.contents();
        oldNodes.replaceWith(nodes160);
      }));
      
      var node31 = mobl.loadingSpan();
      root230.append(node31);
      var list2;
      var listSubs2 = new mobl.CompSubscription();
      subs__.addSub(listSubs2);
      var renderList2 = function() {
        var subs__ = listSubs2;
        list2 = tabs.get();
        list2.list(function(results2) {
          node31.empty();
          for(var i2 = 0; i2 < results2.length; i2++) {
            (function() {
              var iternode2 = $("<span>");
              node31.append(iternode2);
              var tabName;var tabIcon;var tabControl;
              tabName = mobl.ref(mobl.ref(mobl.ref(results2), i2), "_1");tabIcon = mobl.ref(mobl.ref(mobl.ref(results2), i2), "_2");tabControl = mobl.ref(mobl.ref(mobl.ref(results2), i2), "_3");
              var result__ = activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle;
              var tmp94 = mobl.ref(result__);
              subs__.addSub(activeTab.addEventListener('change', function() {
                tmp94.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
              }));
              subs__.addSub(tabName.addEventListener('change', function() {
                tmp94.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
              }));
              subs__.addSub(mobl.ref(mobl.ui.generic.activeTabStyle).addEventListener('change', function() {
                tmp94.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
              }));
              subs__.addSub(mobl.ref(mobl.ui.generic.inActiveTabStyle).addEventListener('change', function() {
                tmp94.set(activeTab.get() == tabName.get() ? mobl.ui.generic.activeTabStyle : mobl.ui.generic.inActiveTabStyle);
              }));
              
              var nodes163 = $("<span>");
              iternode2.append(nodes163);
              subs__.addSub((mobl.block)(tmp94, mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
                var root234 = $("<span>");
                var subs__ = new mobl.CompSubscription();
                var nodes164 = $("<span>");
                root234.append(nodes164);
                subs__.addSub((mobl.screenContext)(function(_, callback) {
                  var root235 = $("<span>");
                  var subs__ = new mobl.CompSubscription();
                  var nodes165 = $("<span>");
                  root235.append(nodes165);
                  subs__.addSub(tabControl.addEventListener('change', function() {
                    renderControl8();
                  }));
                  
                  function renderControl8() {
                    subs__.addSub((tabControl.get())(function(elements, callback) {
                      var root236 = $("<span>");
                      var subs__ = new mobl.CompSubscription();
                      callback(root236); return subs__;
                      return subs__;
                    }, function(node) {
                      var oldNodes = nodes165;
                      nodes165 = node.contents();
                      oldNodes.replaceWith(nodes165);
                    }));
                  }
                  renderControl8();
                  callback(root235); return subs__;
                  
                  return subs__;
                }, function(node) {
                  var oldNodes = nodes164;
                  nodes164 = node.contents();
                  oldNodes.replaceWith(nodes164);
                }));
                callback(root234); return subs__;
                
                return subs__;
              }, function(node) {
                var oldNodes = nodes163;
                nodes163 = node.contents();
                oldNodes.replaceWith(nodes163);
              }));
              
              var oldNodes = iternode2;
              iternode2 = iternode2.contents();
              oldNodes.replaceWith(iternode2);
              
              
            }());
          }
          mobl.delayedUpdateScrollers();
          subs__.addSub(list2.addEventListener('change', function() { listSubs2.unsubscribe(); renderList2(true); }));
          subs__.addSub(tabs.addEventListener('change', function() { listSubs2.unsubscribe(); renderList2(true); }));
        });
      };
      renderList2();
      
      callback(root230); return subs__;
      
      
    }
  }
  return subs__;
};
mobl.ui.generic.searchboxStyle = 'mobl__ui__generic__searchboxStyle';
mobl.ui.generic.searchBoxInputStyle = 'mobl__ui__generic__searchBoxInputStyle';

mobl.ui.generic.searchBox = function(s, placeholder, onsearch, onkeyup, elements, callback) {
  var root237 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node32 = $("<div>");
  
  var ref69 = mobl.ref(mobl.ui.generic.searchboxStyle);
  if(ref69.get() !== null) {
    node32.attr('class', ref69.get());
    subs__.addSub(ref69.addEventListener('change', function(_, ref, val) {
      node32.attr('class', val);
    }));
    
  }
  subs__.addSub(ref69.rebind());
  
  
  var node33 = $("<input>");
  node33.attr('type', "search");
  
  var ref66 = mobl.ref(mobl.ui.generic.searchBoxInputStyle);
  if(ref66.get() !== null) {
    node33.attr('class', ref66.get());
    subs__.addSub(ref66.addEventListener('change', function(_, ref, val) {
      node33.attr('class', val);
    }));
    
  }
  subs__.addSub(ref66.rebind());
  
  var ref67 = placeholder;
  if(ref67.get() !== null) {
    node33.attr('placeholder', ref67.get());
    subs__.addSub(ref67.addEventListener('change', function(_, ref, val) {
      node33.attr('placeholder', val);
    }));
    
  }
  subs__.addSub(ref67.rebind());
  
  var ref68 = s;
  node33.val(""+ref68.get());
  var ignore12 = false;
  subs__.addSub(ref68.addEventListener('change', function(_, ref, val) {
    if(ignore12) return;
    node33.val(""+val);
  }));
  subs__.addSub(ref68.rebind());
  
  subs__.addSub(mobl.domBind(node33, 'keyup change', function() {
    ignore12 = true;
    s.set(mobl.stringTomobl__String(node33.val()));
    ignore12 = false;
  }));
  
  
  var val31 = onsearch.get();
  if(val31 !== null) {
    subs__.addSub(mobl.domBind(node33, 'change', val31));
  }
  
  var val32 = onkeyup.get();
  if(val32 !== null) {
    subs__.addSub(mobl.domBind(node33, 'keyup', val32));
  }
  node33.attr('autocorrect', false);
  node33.attr('autocapitalize', false);
  node33.attr('autocomplete', false);
  
  node32.append(node33);
  root237.append(node32);
  callback(root237); return subs__;
  
  
  return subs__;
};
mobl.ui.generic.contextMenuStyle = 'mobl__ui__generic__contextMenuStyle';
mobl.ui.generic.buttonStyle = 'mobl__ui__generic__buttonStyle';
mobl.ui.generic.buttonPushedStyle = 'mobl__ui__generic__buttonPushedStyle';

mobl.ui.generic.contextMenu = function(elements, callback) {
  var root238 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var menu = $("<div>");
  
  var ref70 = mobl.ref(mobl.ui.generic.contextMenuStyle);
  if(ref70.get() !== null) {
    menu.attr('class', ref70.get());
    subs__.addSub(ref70.addEventListener('change', function(_, ref, val) {
      menu.attr('class', val);
    }));
    
  }
  subs__.addSub(ref70.rebind());
  
  var nodes166 = $("<span>");
  menu.append(nodes166);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl9();
  }));
  
  function renderControl9() {
    subs__.addSub((elements)(function(elements, callback) {
      var root239 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root239); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes166;
      nodes166 = node.contents();
      oldNodes.replaceWith(nodes166);
    }));
  }
  renderControl9();
  root238.append(menu);
  var result__ = menu.hide();
  
  var img = $("<img>");
  img.attr('src', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA0AAAANABeWPPlAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEuSURBVDiNrdSrTkNBEMbx35aLIhUNEl4CsCSkmgfBoOoJz0B4BhSSBEcQSMA3GBJE34Br6CA6heWUA4huMuLszvc/c9stEaG5Sil97GADm7l9g1tcRsTFjCgiPg09nCDSxhimjav9E/S+aSvINkbpeIU+utV5N/eu0meE7W+gjGSEFwzQqf/WiLqTPi+p6dWgaTqDNsAPwME0zWmd+1U6rZG0RDZNs9/J7sBBRIxnutGy0vcgP3cWTVocuC6lLGD9H5z3iHjAdWo3ZMGGVchHvtrcZnuV/zAZM6CCUzz9AHjGYaNWn6Azk2GrZ2YJlw3YI44bkG5qzzomY1+wVRXyDbu4w2sCz7HfqNVWam/5pf1YxX2eLf/W/j8HEmtY+XMg53pF5nZp5/GMlHk9bB8Ws56C3JDK8wAAAABJRU5ErkJggg==");
  img.attr('style', "float: right;");
  
  var val33 = function(event, callback) {
                if(event && event.stopPropagation) event.stopPropagation();
                var result__ = img.parent();
                var target = result__;
                var result__ = target.css("position", "relative");
                var result__ = img.hide();
                var result__ = menu.css("right", "5px");
                var result__ = menu.css("top", "5px");
                var result__ = menu.show();
                mobl.sleep(500, function(result__) {
                  var tmp131 = result__;
                  var result__ = mobl.$("body").bind("tap", removeMenu);
                  if(callback && callback.apply) callback(); return;
                });
              };
  if(val33 !== null) {
    subs__.addSub(mobl.domBind(img, 'tap', val33));
  }
  
  root238.append(img);
  
  var removeMenu = function(evt) {
     var __this = this;
    menu.hide();
    img.show();
    mobl.$("body").unbind("tap", removeMenu);
  };
  
  
  callback(root238); return subs__;
  
  
  
  return subs__;
};

mobl.ui.generic.masterDetail = function(items, masterItem, detail, elements, callback) {
  var root240 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var result__ = mobl.window.get().innerWidth > 500;
  var tmp114 = mobl.ref(result__);
  subs__.addSub(mobl.ref(mobl.window, 'innerWidth').addEventListener('change', function() {
    tmp114.set(mobl.window.get().innerWidth > 500);
  }));
  
  
  var node34 = $("<span>");
  root240.append(node34);
  var condSubs6 = new mobl.CompSubscription();
  subs__.addSub(condSubs6);
  var oldValue6;
  var renderCond6 = function() {
    var value18 = tmp114.get();
    if(oldValue6 === value18) return;
    oldValue6 = value18;
    var subs__ = condSubs6;
    subs__.unsubscribe();
    node34.empty();
    if(value18) {
      items.get().one(function(result__) {
        var tmp132 = result__;
        var current = mobl.ref(result__);
        
        var node35 = $("<div>");
        node35.attr('width', "100%");
        
        
        var node36 = $("<div>");
        node36.attr('style', "float:left; width:33%; position:relative; border-right: solid 1px #cccccc;");
        
        var nodes169 = $("<span>");
        node36.append(nodes169);
        subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
          var root243 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          
          var node39 = mobl.loadingSpan();
          root243.append(node39);
          var list3;
          var listSubs3 = new mobl.CompSubscription();
          subs__.addSub(listSubs3);
          var renderList3 = function() {
            var subs__ = listSubs3;
            list3 = items.get();
            list3.list(function(results3) {
              node39.empty();
              for(var i3 = 0; i3 < results3.length; i3++) {
                (function() {
                  var iternode3 = $("<span>");
                  node39.append(iternode3);
                  var it;
                  it = mobl.ref(mobl.ref(results3), i3);
                  var result__ = it.get() == current.get();
                  var tmp100 = mobl.ref(result__);
                  subs__.addSub(it.addEventListener('change', function() {
                    tmp100.set(it.get() == current.get());
                  }));
                  subs__.addSub(current.addEventListener('change', function() {
                    tmp100.set(it.get() == current.get());
                  }));
                  
                  
                  var node40 = $("<span>");
                  iternode3.append(node40);
                  var condSubs8 = new mobl.CompSubscription();
                  subs__.addSub(condSubs8);
                  var oldValue8;
                  var renderCond8 = function() {
                    var value20 = tmp100.get();
                    if(oldValue8 === value20) return;
                    oldValue8 = value20;
                    var subs__ = condSubs8;
                    subs__.unsubscribe();
                    node40.empty();
                    if(value20) {
                      var nodes170 = $("<span>");
                      node40.append(nodes170);
                      subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.selectedItemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), mobl.ref(null), mobl.ref(null), mobl.ref(false), function(_, callback) {
                        var root244 = $("<span>");
                        var subs__ = new mobl.CompSubscription();
                        var nodes171 = $("<span>");
                        root244.append(nodes171);
                        subs__.addSub(masterItem.addEventListener('change', function() {
                          renderControl11();
                        }));
                        
                        function renderControl11() {
                          subs__.addSub((masterItem.get())(it, function(elements, callback) {
                            var root245 = $("<span>");
                            var subs__ = new mobl.CompSubscription();
                            callback(root245); return subs__;
                            return subs__;
                          }, function(node) {
                            var oldNodes = nodes171;
                            nodes171 = node.contents();
                            oldNodes.replaceWith(nodes171);
                          }));
                        }
                        renderControl11();
                        callback(root244); return subs__;
                        
                        return subs__;
                      }, function(node) {
                        var oldNodes = nodes170;
                        nodes170 = node.contents();
                        oldNodes.replaceWith(nodes170);
                      }));
                      
                      
                    } else {
                      var result__ = function(event, callback) {
                                       if(event && event.stopPropagation) event.stopPropagation();
                                       var result__ = it.get();
                                       current.set(result__);
                                       var result__ = mobl.ui.generic.scrollUp();
                                       if(callback && callback.apply) callback(); return;
                                     };
                      var tmp99 = mobl.ref(result__);
                      
                      var nodes172 = $("<span>");
                      node40.append(nodes172);
                      subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp99, mobl.ref(null), mobl.ref(true), function(_, callback) {
                        var root246 = $("<span>");
                        var subs__ = new mobl.CompSubscription();
                        var nodes173 = $("<span>");
                        root246.append(nodes173);
                        subs__.addSub(masterItem.addEventListener('change', function() {
                          renderControl12();
                        }));
                        
                        function renderControl12() {
                          subs__.addSub((masterItem.get())(it, function(elements, callback) {
                            var root247 = $("<span>");
                            var subs__ = new mobl.CompSubscription();
                            callback(root247); return subs__;
                            return subs__;
                          }, function(node) {
                            var oldNodes = nodes173;
                            nodes173 = node.contents();
                            oldNodes.replaceWith(nodes173);
                          }));
                        }
                        renderControl12();
                        callback(root246); return subs__;
                        
                        return subs__;
                      }, function(node) {
                        var oldNodes = nodes172;
                        nodes172 = node.contents();
                        oldNodes.replaceWith(nodes172);
                      }));
                      
                      
                    }
                  };
                  renderCond8();
                  subs__.addSub(tmp100.addEventListener('change', function() {
                    renderCond8();
                  }));
                  
                  
                  var oldNodes = iternode3;
                  iternode3 = iternode3.contents();
                  oldNodes.replaceWith(iternode3);
                  
                  
                }());
              }
              mobl.delayedUpdateScrollers();
              subs__.addSub(list3.addEventListener('change', function() { listSubs3.unsubscribe(); renderList3(true); }));
              subs__.addSub(items.addEventListener('change', function() { listSubs3.unsubscribe(); renderList3(true); }));
            });
          };
          renderList3();
          
          callback(root243); return subs__;
          
          return subs__;
        }, function(node) {
          var oldNodes = nodes169;
          nodes169 = node.contents();
          oldNodes.replaceWith(nodes169);
        }));
        node35.append(node36);
        
        var node37 = $("<div>");
        node37.attr('style', "float:left; width:66.5%; position:relative; margin-left: 0.5%;");
        
        
        var node38 = $("<span>");
        node37.append(node38);
        var condSubs7 = new mobl.CompSubscription();
        subs__.addSub(condSubs7);
        var oldValue7;
        var renderCond7 = function() {
          var value19 = current.get();
          if(oldValue7 === value19) return;
          oldValue7 = value19;
          var subs__ = condSubs7;
          subs__.unsubscribe();
          node38.empty();
          if(value19) {
            var nodes167 = $("<span>");
            node38.append(nodes167);
            subs__.addSub(detail.addEventListener('change', function() {
              renderControl10();
            }));
            
            function renderControl10() {
              subs__.addSub((detail.get())(current, function(elements, callback) {
                var root241 = $("<span>");
                var subs__ = new mobl.CompSubscription();
                callback(root241); return subs__;
                return subs__;
              }, function(node) {
                var oldNodes = nodes167;
                nodes167 = node.contents();
                oldNodes.replaceWith(nodes167);
              }));
            }
            renderControl10();
            
            
          } else {
            var result__ = mobl._("Select an item on the left", []);
            var tmp101 = mobl.ref(result__);
            
            var nodes168 = $("<span>");
            node38.append(nodes168);
            subs__.addSub((mobl.label)(tmp101, mobl.ref(null), mobl.ref(null), function(_, callback) {
              var root242 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              callback(root242); return subs__;
              return subs__;
            }, function(node) {
              var oldNodes = nodes168;
              nodes168 = node.contents();
              oldNodes.replaceWith(nodes168);
            }));
            
            
          }
        };
        renderCond7();
        subs__.addSub(current.addEventListener('change', function() {
          renderCond7();
        }));
        
        node35.append(node37);
        node34.append(node35);
        
        
        
        
        
        
      });
    } else {
      var nodes174 = $("<span>");
      node34.append(nodes174);
      subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
        var root248 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        
        var node41 = mobl.loadingSpan();
        root248.append(node41);
        var list4;
        var listSubs4 = new mobl.CompSubscription();
        subs__.addSub(listSubs4);
        var renderList4 = function() {
          var subs__ = listSubs4;
          list4 = items.get();
          list4.list(function(results4) {
            node41.empty();
            for(var i4 = 0; i4 < results4.length; i4++) {
              (function() {
                var iternode4 = $("<span>");
                node41.append(iternode4);
                var it;
                it = mobl.ref(mobl.ref(results4), i4);
                var result__ = function(event, callback) {
                                 if(event && event.stopPropagation) event.stopPropagation();
                                 mobl.call('mobl.ui.generic.detailScreen', [it, detail, mobl.ref(false), mobl.ref("slide")], function(result__) {
                                 var tmp133 = result__;
                                 if(callback && callback.apply) callback(); return;
                                 });
                               };
                var tmp95 = mobl.ref(result__);
                
                var nodes175 = $("<span>");
                iternode4.append(nodes175);
                subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp95, mobl.ref(null), mobl.ref(false), function(_, callback) {
                  var root249 = $("<span>");
                  var subs__ = new mobl.CompSubscription();
                  var nodes176 = $("<span>");
                  root249.append(nodes176);
                  subs__.addSub(masterItem.addEventListener('change', function() {
                    renderControl13();
                  }));
                  
                  function renderControl13() {
                    subs__.addSub((masterItem.get())(it, function(elements, callback) {
                      var root250 = $("<span>");
                      var subs__ = new mobl.CompSubscription();
                      callback(root250); return subs__;
                      return subs__;
                    }, function(node) {
                      var oldNodes = nodes176;
                      nodes176 = node.contents();
                      oldNodes.replaceWith(nodes176);
                    }));
                  }
                  renderControl13();
                  callback(root249); return subs__;
                  
                  return subs__;
                }, function(node) {
                  var oldNodes = nodes175;
                  nodes175 = node.contents();
                  oldNodes.replaceWith(nodes175);
                }));
                
                var oldNodes = iternode4;
                iternode4 = iternode4.contents();
                oldNodes.replaceWith(iternode4);
                
                
              }());
            }
            mobl.delayedUpdateScrollers();
            subs__.addSub(list4.addEventListener('change', function() { listSubs4.unsubscribe(); renderList4(true); }));
            subs__.addSub(items.addEventListener('change', function() { listSubs4.unsubscribe(); renderList4(true); }));
          });
        };
        renderList4();
        
        callback(root248); return subs__;
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes174;
        nodes174 = node.contents();
        oldNodes.replaceWith(nodes174);
      }));
      
      
    }
  };
  renderCond6();
  subs__.addSub(tmp114.addEventListener('change', function() {
    renderCond6();
  }));
  
  callback(root240); return subs__;
  
  return subs__;
};

mobl.ui.generic.detailScreen = function(it, detail, callback, screenCallback) {
  var root251 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  var result__ = mobl._("Detail", []);
  var tmp98 = mobl.ref(result__);
  
  var nodes177 = $("<span>");
  root251.append(nodes177);
  subs__.addSub((mobl.ui.generic.header)(tmp98, mobl.ref(false), mobl.ref(null), function(_, callback) {
    var root252 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    var result__ = function(event, callback) {
                     if(event && event.stopPropagation) event.stopPropagation();
                     if(screenCallback) screenCallback();
                     return;
                     if(callback && callback.apply) callback(); return;
                   };
    var tmp97 = mobl.ref(result__);
    
    var result__ = mobl._("Back", []);
    var tmp96 = mobl.ref(result__);
    
    var nodes178 = $("<span>");
    root252.append(nodes178);
    subs__.addSub((mobl.ui.generic.backButton)(tmp96, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp97, function(_, callback) {
      var root253 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root253); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes178;
      nodes178 = node.contents();
      oldNodes.replaceWith(nodes178);
    }));
    callback(root252); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes177;
    nodes177 = node.contents();
    oldNodes.replaceWith(nodes177);
  }));
  var nodes179 = $("<span>");
  root251.append(nodes179);
  subs__.addSub(detail.addEventListener('change', function() {
    renderControl14();
  }));
  
  function renderControl14() {
    subs__.addSub((detail.get())(it, function(elements, callback) {
      var root254 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root254); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes179;
      nodes179 = node.contents();
      oldNodes.replaceWith(nodes179);
    }));
  }
  renderControl14();
  callback(root251); return subs__;
  
  
  return subs__;
};
mobl.ui.generic.selectedItemStyle = 'mobl__ui__generic__selectedItemStyle';

mobl.ui.generic.zoomList = function(coll, listCtrl, zoomCtrl, elements, callback) {
  var root255 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var selected = mobl.ref(null);
  var nodes180 = $("<span>");
  root255.append(nodes180);
  subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
    var root256 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var node42 = mobl.loadingSpan();
    root256.append(node42);
    var list5;
    var listSubs5 = new mobl.CompSubscription();
    subs__.addSub(listSubs5);
    var renderList5 = function() {
      var subs__ = listSubs5;
      list5 = coll.get();
      list5.list(function(results5) {
        node42.empty();
        for(var i5 = 0; i5 < results5.length; i5++) {
          (function() {
            var iternode5 = $("<span>");
            node42.append(iternode5);
            var it;
            it = mobl.ref(mobl.ref(results5), i5);
            var result__ = it.get() == selected.get();
            var tmp103 = mobl.ref(result__);
            subs__.addSub(it.addEventListener('change', function() {
              tmp103.set(it.get() == selected.get());
            }));
            subs__.addSub(selected.addEventListener('change', function() {
              tmp103.set(it.get() == selected.get());
            }));
            
            
            var node43 = $("<span>");
            iternode5.append(node43);
            var condSubs9 = new mobl.CompSubscription();
            subs__.addSub(condSubs9);
            var oldValue9;
            var renderCond9 = function() {
              var value21 = tmp103.get();
              if(oldValue9 === value21) return;
              oldValue9 = value21;
              var subs__ = condSubs9;
              subs__.unsubscribe();
              node43.empty();
              if(value21) {
                var nodes181 = $("<span>");
                node43.append(nodes181);
                subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), mobl.ref(null), mobl.ref(null), mobl.ref(false), function(_, callback) {
                  var root257 = $("<span>");
                  var subs__ = new mobl.CompSubscription();
                  var nodes182 = $("<span>");
                  root257.append(nodes182);
                  subs__.addSub(zoomCtrl.addEventListener('change', function() {
                    renderControl15();
                  }));
                  
                  function renderControl15() {
                    subs__.addSub((zoomCtrl.get())(it, function(elements, callback) {
                      var root258 = $("<span>");
                      var subs__ = new mobl.CompSubscription();
                      callback(root258); return subs__;
                      return subs__;
                    }, function(node) {
                      var oldNodes = nodes182;
                      nodes182 = node.contents();
                      oldNodes.replaceWith(nodes182);
                    }));
                  }
                  renderControl15();
                  callback(root257); return subs__;
                  
                  return subs__;
                }, function(node) {
                  var oldNodes = nodes181;
                  nodes181 = node.contents();
                  oldNodes.replaceWith(nodes181);
                }));
                
                
              } else {
                var result__ = function(event, callback) {
                                 if(event && event.stopPropagation) event.stopPropagation();
                                 var result__ = it.get();
                                 selected.set(result__);
                                 if(callback && callback.apply) callback(); return;
                               };
                var tmp102 = mobl.ref(result__);
                
                var nodes183 = $("<span>");
                node43.append(nodes183);
                subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), tmp102, mobl.ref(null), mobl.ref(true), function(_, callback) {
                  var root259 = $("<span>");
                  var subs__ = new mobl.CompSubscription();
                  var nodes184 = $("<span>");
                  root259.append(nodes184);
                  subs__.addSub(listCtrl.addEventListener('change', function() {
                    renderControl16();
                  }));
                  
                  function renderControl16() {
                    subs__.addSub((listCtrl.get())(it, function(elements, callback) {
                      var root260 = $("<span>");
                      var subs__ = new mobl.CompSubscription();
                      callback(root260); return subs__;
                      return subs__;
                    }, function(node) {
                      var oldNodes = nodes184;
                      nodes184 = node.contents();
                      oldNodes.replaceWith(nodes184);
                    }));
                  }
                  renderControl16();
                  callback(root259); return subs__;
                  
                  return subs__;
                }, function(node) {
                  var oldNodes = nodes183;
                  nodes183 = node.contents();
                  oldNodes.replaceWith(nodes183);
                }));
                
                
              }
            };
            renderCond9();
            subs__.addSub(tmp103.addEventListener('change', function() {
              renderCond9();
            }));
            
            
            var oldNodes = iternode5;
            iternode5 = iternode5.contents();
            oldNodes.replaceWith(iternode5);
            
            
          }());
        }
        mobl.delayedUpdateScrollers();
        subs__.addSub(list5.addEventListener('change', function() { listSubs5.unsubscribe(); renderList5(true); }));
        subs__.addSub(coll.addEventListener('change', function() { listSubs5.unsubscribe(); renderList5(true); }));
      });
    };
    renderList5();
    
    callback(root256); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes180;
    nodes180 = node.contents();
    oldNodes.replaceWith(nodes180);
  }));
  callback(root255); return subs__;
  
  return subs__;
};
mobl.ui.generic.loadMoreStyle = 'mobl__ui__generic__loadMoreStyle';

mobl.ui.generic.stagedList = function(coll, listCtrl, initialItems, step, moreLabel, moreStyle, elements, callback) {
  var root261 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var n = mobl.ref(initialItems.get());
  coll.get().count(function(result__) {
    var tmp134 = result__;
    var total = mobl.ref(result__);
    var result__ = coll.get().limit(n.get());
    var tmp104 = mobl.ref(result__);
    subs__.addSub(mobl.ref(coll.get().limit(n.get())).addEventListener('change', function() {
      tmp104.set(coll.get().limit(n.get()));
    }));
    subs__.addSub(coll.addEventListener('change', function() {
      tmp104.set(coll.get().limit(n.get()));
    }));
    subs__.addSub(n.addEventListener('change', function() {
      tmp104.set(coll.get().limit(n.get()));
    }));
    
    
    var node44 = mobl.loadingSpan();
    root261.append(node44);
    var list6;
    var listSubs6 = new mobl.CompSubscription();
    subs__.addSub(listSubs6);
    var renderList6 = function() {
      var subs__ = listSubs6;
      list6 = tmp104.get();
      list6.list(function(results6) {
        node44.empty();
        for(var i6 = 0; i6 < results6.length; i6++) {
          (function() {
            var iternode6 = $("<span>");
            node44.append(iternode6);
            var it;
            it = mobl.ref(mobl.ref(results6), i6);
            var nodes185 = $("<span>");
            iternode6.append(nodes185);
            subs__.addSub(listCtrl.addEventListener('change', function() {
              renderControl17();
            }));
            
            function renderControl17() {
              subs__.addSub((listCtrl.get())(it, function(elements, callback) {
                var root262 = $("<span>");
                var subs__ = new mobl.CompSubscription();
                callback(root262); return subs__;
                return subs__;
              }, function(node) {
                var oldNodes = nodes185;
                nodes185 = node.contents();
                oldNodes.replaceWith(nodes185);
              }));
            }
            renderControl17();
            
            var oldNodes = iternode6;
            iternode6 = iternode6.contents();
            oldNodes.replaceWith(iternode6);
            
            
          }());
        }
        mobl.delayedUpdateScrollers();
        subs__.addSub(list6.addEventListener('change', function() { listSubs6.unsubscribe(); renderList6(true); }));
        subs__.addSub(tmp104.addEventListener('change', function() { listSubs6.unsubscribe(); renderList6(true); }));
      });
    };
    renderList6();
    
    var result__ = n.get() < total.get();
    var tmp106 = mobl.ref(result__);
    subs__.addSub(n.addEventListener('change', function() {
      tmp106.set(n.get() < total.get());
    }));
    subs__.addSub(total.addEventListener('change', function() {
      tmp106.set(n.get() < total.get());
    }));
    
    
    var node45 = $("<span>");
    root261.append(node45);
    var condSubs10 = new mobl.CompSubscription();
    subs__.addSub(condSubs10);
    var oldValue10;
    var renderCond10 = function() {
      var value22 = tmp106.get();
      if(oldValue10 === value22) return;
      oldValue10 = value22;
      var subs__ = condSubs10;
      subs__.unsubscribe();
      node45.empty();
      if(value22) {
        var result__ = function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         var result__ = n.get() + step.get();
                         n.set(result__);
                         if(callback && callback.apply) callback(); return;
                       };
        var tmp105 = mobl.ref(result__);
        
        var nodes186 = $("<span>");
        node45.append(nodes186);
        subs__.addSub((mobl.block)(moreStyle, mobl.ref(null), tmp105, mobl.ref(null), function(_, callback) {
          var root263 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          var nodes187 = $("<span>");
          root263.append(nodes187);
          subs__.addSub((mobl.label)(moreLabel, mobl.ref(null), mobl.ref(null), function(_, callback) {
            var root264 = $("<span>");
            var subs__ = new mobl.CompSubscription();
            callback(root264); return subs__;
            return subs__;
          }, function(node) {
            var oldNodes = nodes187;
            nodes187 = node.contents();
            oldNodes.replaceWith(nodes187);
          }));
          callback(root263); return subs__;
          
          return subs__;
        }, function(node) {
          var oldNodes = nodes186;
          nodes186 = node.contents();
          oldNodes.replaceWith(nodes186);
        }));
        
        
      } else {
        
      }
    };
    renderCond10();
    subs__.addSub(tmp106.addEventListener('change', function() {
      renderCond10();
    }));
    
    callback(root261); return subs__;
    
    
  });
  return subs__;
};

mobl.ui.generic.markableList = function(items, elements, callback) {
  var root265 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  var nodes188 = $("<span>");
  root265.append(nodes188);
  subs__.addSub((mobl.ui.generic.group)(function(_, callback) {
    var root266 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var node46 = mobl.loadingSpan();
    root266.append(node46);
    var list7;
    var listSubs7 = new mobl.CompSubscription();
    subs__.addSub(listSubs7);
    var renderList7 = function() {
      var subs__ = listSubs7;
      list7 = items.get();
      list7.list(function(results7) {
        node46.empty();
        for(var i7 = 0; i7 < results7.length; i7++) {
          (function() {
            var iternode7 = $("<span>");
            node46.append(iternode7);
            var checked;var it;
            checked = mobl.ref(mobl.ref(mobl.ref(results7), i7), "_1");it = mobl.ref(mobl.ref(mobl.ref(results7), i7), "_2");
            var nodes189 = $("<span>");
            iternode7.append(nodes189);
            subs__.addSub((mobl.ui.generic.item)(mobl.ref(mobl.ui.generic.itemStyle), mobl.ref(mobl.ui.generic.itemPushedStyle), mobl.ref(null), mobl.ref(null), mobl.ref(false), function(_, callback) {
              var root267 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              var nodes190 = $("<span>");
              root267.append(nodes190);
              subs__.addSub((mobl.ui.generic.checkBox)(checked, it, mobl.ref(null), function(_, callback) {
                var root268 = $("<span>");
                var subs__ = new mobl.CompSubscription();
                callback(root268); return subs__;
                return subs__;
              }, function(node) {
                var oldNodes = nodes190;
                nodes190 = node.contents();
                oldNodes.replaceWith(nodes190);
              }));
              callback(root267); return subs__;
              
              return subs__;
            }, function(node) {
              var oldNodes = nodes189;
              nodes189 = node.contents();
              oldNodes.replaceWith(nodes189);
            }));
            
            var oldNodes = iternode7;
            iternode7 = iternode7.contents();
            oldNodes.replaceWith(iternode7);
            
            
          }());
        }
        mobl.delayedUpdateScrollers();
        subs__.addSub(list7.addEventListener('change', function() { listSubs7.unsubscribe(); renderList7(true); }));
        subs__.addSub(items.addEventListener('change', function() { listSubs7.unsubscribe(); renderList7(true); }));
      });
    };
    renderList7();
    
    callback(root266); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes188;
    nodes188 = node.contents();
    oldNodes.replaceWith(nodes188);
  }));
  callback(root265); return subs__;
  
  return subs__;
};

mobl.ui.generic.selectList = function(title, coll, doneButtonLabel, callback, screenCallback) {
  var root269 = $("<div>");
  var subs__ = new mobl.CompSubscription();
  
  var items = mobl.ref([]);
  var result__ = coll.get();
  coll.get().list(function(coll19) {
    coll19 = coll19.reverse();
    function processOne1() {
      var it;
      it = coll19.pop();
      var result__ = items.get().push(new mobl.Tuple(false, it));
      
      if(coll19.length > 0) processOne1(); else rest1();
      
    }
    function rest1() {
      var nodes191 = $("<span>");
      root269.append(nodes191);
      subs__.addSub((mobl.ui.generic.header)(title, mobl.ref(false), mobl.ref(null), function(_, callback) {
        var root270 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        var result__ = function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         var result__ = null;
                         if(callback && callback.apply) callback(result__);
                         return;
                         if(callback && callback.apply) callback(); return;
                       };
        var tmp107 = mobl.ref(result__);
        
        var result__ = mobl._("Back", []);
        var tmp108 = mobl.ref(result__);
        
        var nodes192 = $("<span>");
        root270.append(nodes192);
        subs__.addSub((mobl.ui.generic.backButton)(tmp108, mobl.ref(mobl.ui.generic.backButtonStyle), mobl.ref(mobl.ui.generic.backButtonPushedStyle), tmp107, function(_, callback) {
          var root271 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root271); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes192;
          nodes192 = node.contents();
          oldNodes.replaceWith(nodes192);
        }));
        var result__ = function(event, callback) {
                         if(event && event.stopPropagation) event.stopPropagation();
                         var result__ = [];
                         var selected = result__;
                         var result__ = items.get();
                         items.get().list(function(coll18) {
                           coll18 = coll18.reverse();
                           function processOne0() {
                             var checked;var it;
                             var tmp136 = coll18.pop();
                             checked = tmp136._1;it = tmp136._2;
                             var result__ = checked;
                             if(result__) {
                               var result__ = selected.push(it);
                               
                               if(coll18.length > 0) processOne0(); else rest0();
                               
                             } else {
                               {
                                 
                                 if(coll18.length > 0) processOne0(); else rest0();
                                 
                               }
                             }
                           }
                           function rest0() {
                             var result__ = selected;
                             if(screenCallback) screenCallback(result__);
                             return;
                             if(callback && callback.apply) callback(); return;
                           }
                           if(coll18.length > 0) processOne0(); else rest0();
                         });
                         
                       };
        var tmp109 = mobl.ref(result__);
        
        var nodes193 = $("<span>");
        root270.append(nodes193);
        subs__.addSub((mobl.ui.generic.button)(doneButtonLabel, mobl.ref(mobl.ui.generic.buttonStyle), mobl.ref(mobl.ui.generic.buttonPushedStyle), tmp109, function(_, callback) {
          var root272 = $("<span>");
          var subs__ = new mobl.CompSubscription();
          callback(root272); return subs__;
          return subs__;
        }, function(node) {
          var oldNodes = nodes193;
          nodes193 = node.contents();
          oldNodes.replaceWith(nodes193);
        }));
        callback(root270); return subs__;
        
        
        return subs__;
      }, function(node) {
        var oldNodes = nodes191;
        nodes191 = node.contents();
        oldNodes.replaceWith(nodes191);
      }));
      var nodes194 = $("<span>");
      root269.append(nodes194);
      subs__.addSub((mobl.ui.generic.markableList)(items, function(_, callback) {
        var root273 = $("<span>");
        var subs__ = new mobl.CompSubscription();
        callback(root273); return subs__;
        return subs__;
      }, function(node) {
        var oldNodes = nodes194;
        nodes194 = node.contents();
        oldNodes.replaceWith(nodes194);
      }));
      callback(root269); return subs__;
      
      
    }
    if(coll19.length > 0) processOne1(); else rest1();
  });
  
  return subs__;
};

mobl.ui.generic.searchList = function(Ent, masterItem, detailItem, resultLimit, searchTermPlaceholder, elements, callback) {
  var root274 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var phrase = mobl.ref("");
  var nodes195 = $("<span>");
  root274.append(nodes195);
  subs__.addSub((mobl.ui.generic.searchBox)(phrase, searchTermPlaceholder, mobl.ref(null), mobl.ref(null), function(_, callback) {
    var root275 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root275); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes195;
    nodes195 = node.contents();
    oldNodes.replaceWith(nodes195);
  }));
  var result__ = Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get());
  var tmp110 = mobl.ref(result__);
  subs__.addSub(mobl.ref(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get())).addEventListener('change', function() {
    tmp110.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  subs__.addSub(mobl.ref(Ent.get().searchPrefix(phrase.get())).addEventListener('change', function() {
    tmp110.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  subs__.addSub(Ent.addEventListener('change', function() {
    tmp110.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  subs__.addSub(phrase.addEventListener('change', function() {
    tmp110.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  subs__.addSub(resultLimit.addEventListener('change', function() {
    tmp110.set(Ent.get().searchPrefix(phrase.get()).limit(resultLimit.get()));
  }));
  
  var nodes196 = $("<span>");
  root274.append(nodes196);
  subs__.addSub((mobl.ui.generic.masterDetail)(tmp110, masterItem, detailItem, function(_, callback) {
    var root276 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    callback(root276); return subs__;
    return subs__;
  }, function(node) {
    var oldNodes = nodes196;
    nodes196 = node.contents();
    oldNodes.replaceWith(nodes196);
  }));
  callback(root274); return subs__;
  
  
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

mobl.ui.generic.accordion = function(sections, activeSection, elements, callback) {
  var root277 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var activeSection = mobl.ref(activeSection.get() ? activeSection.get() : sections.get().get(0)._1);
  var nodes197 = $("<span>");
  root277.append(nodes197);
  subs__.addSub((mobl.block)(mobl.ref(mobl.ui.generic.accordionStyle), mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
    var root278 = $("<span>");
    var subs__ = new mobl.CompSubscription();
    
    var node47 = mobl.loadingSpan();
    root278.append(node47);
    var list8;
    var listSubs8 = new mobl.CompSubscription();
    subs__.addSub(listSubs8);
    var renderList8 = function() {
      var subs__ = listSubs8;
      list8 = sections.get();
      list8.list(function(results8) {
        node47.empty();
        for(var i8 = 0; i8 < results8.length; i8++) {
          (function() {
            var iternode8 = $("<span>");
            node47.append(iternode8);
            var sectionName;var sectionControl;
            sectionName = mobl.ref(mobl.ref(mobl.ref(results8), i8), "_1");sectionControl = mobl.ref(mobl.ref(mobl.ref(results8), i8), "_2");
            var result__ = activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle;
            var tmp112 = mobl.ref(result__);
            subs__.addSub(activeSection.addEventListener('change', function() {
              tmp112.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            }));
            subs__.addSub(sectionName.addEventListener('change', function() {
              tmp112.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.activeSectionHeaderStyle).addEventListener('change', function() {
              tmp112.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.inActiveSectionHeaderStyle).addEventListener('change', function() {
              tmp112.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionHeaderStyle : mobl.ui.generic.inActiveSectionHeaderStyle);
            }));
            
            var result__ = function(event, callback) {
                             if(event && event.stopPropagation) event.stopPropagation();
                             var result__ = sectionName.get();
                             activeSection.set(result__);
                             if(callback && callback.apply) callback(); return;
                           };
            var tmp111 = mobl.ref(result__);
            
            var nodes198 = $("<span>");
            iternode8.append(nodes198);
            subs__.addSub((mobl.span)(tmp112, mobl.ref(null), tmp111, mobl.ref(null), function(_, callback) {
              var root279 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              var nodes199 = $("<span>");
              root279.append(nodes199);
              subs__.addSub((mobl.label)(sectionName, mobl.ref(null), mobl.ref(null), function(_, callback) {
                var root280 = $("<span>");
                var subs__ = new mobl.CompSubscription();
                callback(root280); return subs__;
                return subs__;
              }, function(node) {
                var oldNodes = nodes199;
                nodes199 = node.contents();
                oldNodes.replaceWith(nodes199);
              }));
              callback(root279); return subs__;
              
              return subs__;
            }, function(node) {
              var oldNodes = nodes198;
              nodes198 = node.contents();
              oldNodes.replaceWith(nodes198);
            }));
            var result__ = activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle;
            var tmp113 = mobl.ref(result__);
            subs__.addSub(activeSection.addEventListener('change', function() {
              tmp113.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            }));
            subs__.addSub(sectionName.addEventListener('change', function() {
              tmp113.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.activeSectionStyle).addEventListener('change', function() {
              tmp113.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            }));
            subs__.addSub(mobl.ref(mobl.ui.generic.inActiveSectionStyle).addEventListener('change', function() {
              tmp113.set(activeSection.get() == sectionName.get() ? mobl.ui.generic.activeSectionStyle : mobl.ui.generic.inActiveSectionStyle);
            }));
            
            var nodes200 = $("<span>");
            iternode8.append(nodes200);
            subs__.addSub((mobl.block)(tmp113, mobl.ref(null), mobl.ref(null), mobl.ref(null), function(_, callback) {
              var root281 = $("<span>");
              var subs__ = new mobl.CompSubscription();
              var nodes201 = $("<span>");
              root281.append(nodes201);
              subs__.addSub(sectionControl.addEventListener('change', function() {
                renderControl18();
              }));
              
              function renderControl18() {
                subs__.addSub((sectionControl.get())(function(elements, callback) {
                  var root282 = $("<span>");
                  var subs__ = new mobl.CompSubscription();
                  callback(root282); return subs__;
                  return subs__;
                }, function(node) {
                  var oldNodes = nodes201;
                  nodes201 = node.contents();
                  oldNodes.replaceWith(nodes201);
                }));
              }
              renderControl18();
              callback(root281); return subs__;
              
              return subs__;
            }, function(node) {
              var oldNodes = nodes200;
              nodes200 = node.contents();
              oldNodes.replaceWith(nodes200);
            }));
            
            var oldNodes = iternode8;
            iternode8 = iternode8.contents();
            oldNodes.replaceWith(iternode8);
            
            
            
          }());
        }
        mobl.delayedUpdateScrollers();
        subs__.addSub(list8.addEventListener('change', function() { listSubs8.unsubscribe(); renderList8(true); }));
        subs__.addSub(sections.addEventListener('change', function() { listSubs8.unsubscribe(); renderList8(true); }));
      });
    };
    renderList8();
    
    callback(root278); return subs__;
    
    return subs__;
  }, function(node) {
    var oldNodes = nodes197;
    nodes197 = node.contents();
    oldNodes.replaceWith(nodes197);
  }));
  callback(root277); return subs__;
  
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
mobl.ui.generic.tdStyle = 'mobl__ui__generic__tdStyle';
mobl.ui.generic.tdStyle = 'mobl__ui__generic__tdStyle';

mobl.ui.generic.table = function(style, elements, callback) {
  var root283 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node48 = $("<table>");
  
  var ref71 = style;
  if(ref71.get() !== null) {
    node48.attr('class', ref71.get());
    subs__.addSub(ref71.addEventListener('change', function(_, ref, val) {
      node48.attr('class', val);
    }));
    
  }
  subs__.addSub(ref71.rebind());
  
  var nodes202 = $("<span>");
  node48.append(nodes202);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl19();
  }));
  
  function renderControl19() {
    subs__.addSub((elements)(function(elements, callback) {
      var root284 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root284); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes202;
      nodes202 = node.contents();
      oldNodes.replaceWith(nodes202);
    }));
  }
  renderControl19();
  root283.append(node48);
  callback(root283); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.row = function(style, elements, callback) {
  var root285 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node49 = $("<tr>");
  
  var ref72 = style;
  if(ref72.get() !== null) {
    node49.attr('class', ref72.get());
    subs__.addSub(ref72.addEventListener('change', function(_, ref, val) {
      node49.attr('class', val);
    }));
    
  }
  subs__.addSub(ref72.rebind());
  
  var nodes203 = $("<span>");
  node49.append(nodes203);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl20();
  }));
  
  function renderControl20() {
    subs__.addSub((elements)(function(elements, callback) {
      var root286 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root286); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes203;
      nodes203 = node.contents();
      oldNodes.replaceWith(nodes203);
    }));
  }
  renderControl20();
  root285.append(node49);
  callback(root285); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.cell = function(width, style, elements, callback) {
  var root287 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node50 = $("<td>");
  
  var ref73 = width;
  if(ref73.get() !== null) {
    node50.attr('width', ref73.get());
    subs__.addSub(ref73.addEventListener('change', function(_, ref, val) {
      node50.attr('width', val);
    }));
    
  }
  subs__.addSub(ref73.rebind());
  
  var ref74 = style;
  if(ref74.get() !== null) {
    node50.attr('class', ref74.get());
    subs__.addSub(ref74.addEventListener('change', function(_, ref, val) {
      node50.attr('class', val);
    }));
    
  }
  subs__.addSub(ref74.rebind());
  
  var nodes204 = $("<span>");
  node50.append(nodes204);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl21();
  }));
  
  function renderControl21() {
    subs__.addSub((elements)(function(elements, callback) {
      var root288 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root288); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes204;
      nodes204 = node.contents();
      oldNodes.replaceWith(nodes204);
    }));
  }
  renderControl21();
  root287.append(node50);
  callback(root287); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.col = function(width, style, elements, callback) {
  var root289 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node51 = $("<td>");
  
  var ref75 = width;
  if(ref75.get() !== null) {
    node51.attr('width', ref75.get());
    subs__.addSub(ref75.addEventListener('change', function(_, ref, val) {
      node51.attr('width', val);
    }));
    
  }
  subs__.addSub(ref75.rebind());
  
  var ref76 = style;
  if(ref76.get() !== null) {
    node51.attr('class', ref76.get());
    subs__.addSub(ref76.addEventListener('change', function(_, ref, val) {
      node51.attr('class', val);
    }));
    
  }
  subs__.addSub(ref76.rebind());
  
  var nodes205 = $("<span>");
  node51.append(nodes205);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl22();
  }));
  
  function renderControl22() {
    subs__.addSub((elements)(function(elements, callback) {
      var root290 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root290); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes205;
      nodes205 = node.contents();
      oldNodes.replaceWith(nodes205);
    }));
  }
  renderControl22();
  root289.append(node51);
  callback(root289); return subs__;
  
  
  return subs__;
};

mobl.ui.generic.headerCol = function(width, style, elements, callback) {
  var root291 = $("<span>");
  var subs__ = new mobl.CompSubscription();
  
  var node52 = $("<td>");
  
  var ref77 = width;
  if(ref77.get() !== null) {
    node52.attr('width', ref77.get());
    subs__.addSub(ref77.addEventListener('change', function(_, ref, val) {
      node52.attr('width', val);
    }));
    
  }
  subs__.addSub(ref77.rebind());
  
  var ref78 = style;
  if(ref78.get() !== null) {
    node52.attr('class', ref78.get());
    subs__.addSub(ref78.addEventListener('change', function(_, ref, val) {
      node52.attr('class', val);
    }));
    
  }
  subs__.addSub(ref78.rebind());
  
  
  var node53 = $("<strong>");
  
  var nodes206 = $("<span>");
  node53.append(nodes206);
  subs__.addSub(mobl.ref(elements).addEventListener('change', function() {
    renderControl23();
  }));
  
  function renderControl23() {
    subs__.addSub((elements)(function(elements, callback) {
      var root292 = $("<span>");
      var subs__ = new mobl.CompSubscription();
      callback(root292); return subs__;
      return subs__;
    }, function(node) {
      var oldNodes = nodes206;
      nodes206 = node.contents();
      oldNodes.replaceWith(nodes206);
    }));
  }
  renderControl23();
  node52.append(node53);
  root291.append(node52);
  callback(root291); return subs__;
  
  
  
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
      e.direction = dx > 0 ? 'right' : 'left';
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

mobl.initDb = function(callback) {
  if(mobl.migration) {
    mobl.migration.performMigration(callback)
  } else {
    persistence.schemaSync(function(tx) {
      if(persistence.loadFromLocalStorage) {
        persistence.loadFromLocalStorage();
      }
      callback();
    });
  }
};

mobl.loadingSpan = function() {
    return $("<span>Loading... <img src=\"data:image/gif;base64,R0lGODlhCgAKAJEDAMzMzP9mZv8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAADACwAAAAACgAKAAACF5wncgaAGgJzJ647cWua4sOBFEd62VEAACH5BAUAAAMALAEAAAAIAAMAAAIKnBM2IoMDAFMQFAAh+QQFAAADACwAAAAABgAGAAACDJwHMBGofKIRItJYAAAh+QQFAAADACwAAAEAAwAIAAACChxgOBPBvpYQYxYAIfkEBQAAAwAsAAAEAAYABgAAAgoEhmPJHOGgEGwWACH5BAUAAAMALAEABwAIAAMAAAIKBIYjYhOhRHqpAAAh+QQFAAADACwEAAQABgAGAAACDJwncqi7EQYAA0p6CgAh+QQJAAADACwHAAEAAwAIAAACCpRmoxoxvQAYchQAOw==\" width=\"10\" height=\"10\"></span>");
};


