








              $("#msgs").bind("pagecreate",function(){
                  setTimeout(function(){
                              //$.mobile.showPageLoadingMsg();
                             loadMessages();
                  }, 100);
              });
              //$("#msgs").bind("pageshow",startWatch());
              //$("#msgs").bind("pagehide",stopWatch());
          







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
        



              $("#settings").bind("pagecreate",function(){
                                  loadSettings();
                              });
              


                $("#banca_1").bind("pagecreate",function(){
                                   setTimeout(function(){
                                              loadConsulenze();
                                              }, 100);
                                   });
                









	// If you want to prevent dragging, uncomment this section
	/*
	function preventBehavior(e) 
	{ 
      e.preventDefault(); 
    };
	document.addEventListener("touchmove", preventBehavior, false);
	*/
	
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	/*
	function handleOpenURL(url)
	{
		// TODO: do something with the url passed in.
	}
	*/
	
	function onBodyLoad()
	{		
		document.addEventListener("deviceready",onDeviceReady,false);
	}
	
	/* When this function is called, PhoneGap has been initialized and is ready to roll */
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	function onDeviceReady()
	{
		// do your thing!
		//navigator.notification.alert("PhoneGap is working");
        $.mobile.page.prototype.options.backBtnTheme = "a";
        window.localStorage.removeItem('feed');
        window.localStorage.removeItem('msgs');
        document.addEventListener("resume", function(){window.localStorage.removeItem('feed');window.localStorage.removeItem('msgs');}, false);

    }
    


              $("#juris").live("pageshow",function(){
                  $.mobile.showPageLoadingMsg();
                  setTimeout(function(){
                              loadJuris($.getUrlVar('link'));
                  }, 300);
              });
          


                $("#article").bind("pagecreate",function(){
                    setTimeout(function(){
                            $.mobile.showPageLoadingMsg();
                            loadArticle($.getUrlVar('origLink'));
                    }, 100);
                });
            



              $("#news").bind("pagecreate",function(){
                  setTimeout(function(){
                              //$.mobile.showPageLoadingMsg();
                             loadNews();
                  }, 100);
              });
              //$("#news").bind("pageshow",startWatch());
              //$("#news").bind("pagehide",stopWatch());
          



              $("#post_message").bind("pagecreate",function(){
                setTimeout(function(){
                  $("#ref").val($.getUrlVar('ref'));
                  if($.getUrlVar('ref') > 0){
                        $("#obj").attr("readonly", true);
                        $("#obj").val(decodeURIComponent($.getUrlVar('oggetto')));
                  }
                  $("textarea[maxlength]").keyup(function(){
                    var max=parseInt($(this).attr('maxlength'));
                    if($(this).val().length > max)
                      $(this).val($(this).val().substr(0,$(this).attr('maxlenght')));
                   });
                }, 100);
              });
          


                $("#message").bind("pagecreate",function(){
                    setTimeout(function(){
                            $.mobile.showPageLoadingMsg();
                            loadMessage($.getUrlVar('id'),$.getUrlVar('rif'));
                    }, 100);
                });
            


(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},h=0,c=0,l=[];function g(e,d,g,i){var c={data:i||(d?d.data:{}),_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};e&&a.extend(c,e,{nodes:[],parent:d});if(g){c.tmpl=g;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++h;(l.length?f:b)[h]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a.fn[d].apply(a(i[h]),k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,l,j){if(d[0]&&d[0].nodeType){var f=a.makeArray(arguments),g=d.length,i=0,h;while(i<g&&!(h=a.data(d[i++],"tmplItem")));if(g>1)f[0]=[a.makeArray(d)];if(h&&c)f[2]=function(b){a.tmpl.afterManip(this,b,j)};r.apply(this,f)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var j,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(i(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);j=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(i(c,null,j)):j},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(_,$1,$2);_=[];",close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){_.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){_.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function i(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:i(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=j(c).concat(b);if(d)b=b.concat(j(d))});return b?b:j(c)}function j(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,j,d,b,c,e){var i=a.tmpl.tag[j],h,f,g;if(!i)throw"Template command not found: "+j;h=i._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=k(b);e=e?","+k(e)+")":c?")":"";f=c?b.indexOf(".")>-1?b+c:"("+b+").call($item"+e:b;g=c?f:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else g=f=h.$1||"null";d=k(d);return"');"+i[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(g).split("$1").join(f).split("$2").join(d?d.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,function(d,c,b,a){a=a?","+a+")":b?")":"";return a?"("+c+").call($item"+a:d}):h.$2||"")+"_.push('"})+"');}return _;")}function n(c,b){c._wrap=i(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function k(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,i;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(i=j.length-1;i>=0;i--)m(j[i]);m(k)}function m(j){var p,i=j,k,e,m;if(m=j.getAttribute(d)){while(i.parentNode&&(i=i.parentNode).nodeType===1&&!(p=i.getAttribute(d)));if(p!==m){i=i.parentNode?i.nodeType===11?0:i.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[i]||f[i],null,true);e.key=++h;b[h]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;i=a.data(j.parentNode,"tmplItem");i=i?i.key:0}if(e){k=e;while(k&&k.key!=i){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent,null,true)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery)

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




var watchID = null;

$(document).bind("mobileinit", function(){
    $.mobile.loadingMessage = 'Caricamento...';
    $.mobile.pageLoadErrorMessage = 'Errore durante il caricamento';
    //$('#settings_form').submit(saveSettings);
    //$('#settings_form').submit(function(){console.log('tre');});
});

$.extend({
    getUrlVars: function(){
         var vars = [], hash;
         var hashes = window.location.href.slice(window.location.href.lastIndexOf('?') + 1).split('&');
         for(var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
         }
         return vars;
    },
    getUrlVar: function(name){
         return $.getUrlVars()[name];
    }
});

function formatDate(d){
    var date = new Date(d);  
    return date.toLocaleDateString();
};

function loadNews(){
    if(window.localStorage.getItem("feed") == undefined)
        remoteLoadNews();
    else
        buildNews(JSON.parse(window.localStorage.getItem("feed")));
};

function buildNews(data){
    var markup = '<li class="newsItem"><a href="article.html?origLink=${link}">${title}<br /><span class="small">${formatDate(pubDate)}</span></a></li>';
    $.template("newsTemplate",markup);
    
    var newsList = $("#feeds");
    newsList.empty();
    $.tmpl("newsTemplate",data.query.results.item).appendTo(newsList);
    newsList.listview("refresh");
};

function remoteLoadNews(){
    url = 'http://www.forzearmate.org/app/reader.php?reload=false';
    //url = 'http://giove.hsgroup.net:8080/test/tmp/reader.php?reload=false';
    $.mobile.showPageLoadingMsg();
    jQuery.ajax({
        type:"GET",
        url: url,
        dataType:"json",
        success: function(data){
            window.localStorage.setItem('feed',JSON.stringify(data));
            buildNews(data);
            $.mobile.hidePageLoadingMsg();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            $.mobile.hidePageLoadingMsg();
            try{
                navigator.notification.alert("Impossibile comunicare con il server",function(){;},"Errore","Ok");
            }
            catch(e){
                alert("Errore\r\nImpossibile comunicare con il server");
            }
        }
    });
};

function loadArticle(idArt){
    $.mobile.showPageLoadingMsg();
    if(idArt == undefined){
        $.mobile.hidePageLoadingMsg();
        try{
            navigator.notification.alert("Impossibile caricare l'articolo richiesto",function(){;},"Errore","Ok");
        }
        catch(e){
            alert("Errore\r\nImpossibile caricare l'articolo richiesto");
        }
    }
    else {
        //url = 'http://giove.hsgroup.net:8080/test/tmp/article.php?origLink='+idArt;
        url = 'http://www.forzearmate.org/app/article.php?origLink='+idArt;
        var markupText = '<h2>${title}</h2><p class="first">{{html description}}</p>'
        var markupLink = '<li><a href="${link}" target="_blank">Leggi su Sideweb.it</a></li>';      
        $.template("artTmpl",markupText);
        $.template("linkTmpl",markupLink);
        
        jQuery.ajax({
            type:"GET",
            url: url,
            dataType:"json",
            success: function(data){
                $("#art").empty();
                $("#link").empty();
                $.tmpl("artTmpl",data.query.results.item).appendTo($("#art"));
                $.tmpl("linkTmpl",data.query.results.item).appendTo($("#link"));
                $("#link").listview("refresh");
                $.mobile.hidePageLoadingMsg();	
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                $.mobile.hidePageLoadingMsg();
                try{
                    navigator.notification.alert("Impossibile comunicare con il server",function(){;},"Errore","Ok");
                }
                catch(e){
                    alert("Errore\r\nImpossibile comunicare con il server");
                }
            }
        });
    }
};

function loadSettings(){
    $('#uname').val(window.localStorage.getItem('uname'));
    $('#passw').val(window.localStorage.getItem('passw'));
};

function saveSettings(){
    if($('#uname').val() == ""){
        try{
            navigator.notification.alert("Inserire il nome utente",function(){;},"Errore","Ok");
        }
        catch(e){
            alert("Errore\r\nInserire il nome utente");
        }
        return false;
    }
    if($('#passw').val() == ""){
        try{
            navigator.notification.alert("Inserire la password",function(){;},"Errore","Ok");
        }
        catch(e){
            alert("Errore\r\nInserire la password");
        }
        return false;
    }
    window.localStorage.setItem('uname', $('#uname').val());
    window.localStorage.setItem('passw', $('#passw').val());
    $.mobile.changePage("banca.html",{transition:"slidedown"});
    return false;
};

function loadConsulenze(){
    if($('#uname').val() == ""){
        try{
            navigator.notification.alert("Inserire il nome utente",function(){;},"Errore","Ok");
        }
        catch(e){
            alert("Errore\r\nInserire il nome utente");
        }
        return;
    }
    if($('#passw').val() == ""){
        try{
            navigator.notification.alert("Inserire la password",function(){;},"Errore","Ok");
        }
        catch(e){
            alert("Errore\r\nInserire la password");
        }
        return;
    }
    dati = 'uname='+window.localStorage.getItem('uname')+'&passw='+window.localStorage.getItem('passw');
    url = 'http://www.forzearmate.org/app/consulenze.php';
    //url = 'http://giove.hsgroup.net:8080/test/tmp/consulenze.php';
    $.mobile.showPageLoadingMsg();
    jQuery.ajax({
        type:"POST",
        url: url,
        data: dati,
        dataType:"json",
        success: function(data){
            $("#results").empty();
            if(data.status == "OK")
                $("#results").append(data.text);
            else{
                try{
                    navigator.notification.alert(data.text,function(){;},'Errore','Ok');
                }
                catch(e){
                    alert(data.text);
                }
            }
            $.mobile.hidePageLoadingMsg();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            $.mobile.hidePageLoadingMsg();
            try{
                navigator.notification.alert("Impossibile comunicare con il server",function(){;},"Errore","Ok");
            }
            catch(e){
                alert("Errore\r\nImpossibile comunicare con il server");
            }
        }
    });
};


function loadJuris(link){
    if($('#uname').val() == ""){
        try{
            navigator.notification.alert("Inserire il nome utente",function(){;},"Errore","Ok");
        }
        catch(e){
            alert("Errore\r\nInserire il nome utente");
        }
        return;
    }
    if($('#passw').val() == ""){
        try{
            navigator.notification.alert("Inserire la password",function(){;},"Errore","Ok");
        }
        catch(e){
            aclert("Errore\r\nInserire la password");
        }
        return;
    }
    dati = 'uname='+window.localStorage.getItem('uname')+'&passw='+window.localStorage.getItem('passw');
    
    url = 'http://www.sideweb.org/app/juris.php';
    //url = 'http://giove.hsgroup.net:8080/test/tmp/juris.php';
    
    if(link == undefined)
        link = "";
    else
        link = "&path="+link;
    
    var markup_head = '${back_title}';
    $.template("headTemplate",markup_head);
    var head = $("#juris_head_h1");

    var markup_menu = '<li><a href="banca_2.html?link=${link}">${title}</a></li>';
    $.template("menuTemplate",markup_menu);
    var menu = $("#juris_menu");

    var markup = '<li class="newsItem"><a href="${link}">${title}<br /></a></li>';
    $.template("newsTemplate",markup);
    var newsList = $("#juris_feeds");

    $.mobile.showPageLoadingMsg();
    jQuery.ajax({
    type:"POST",
    url: url,
    data: dati+link,
    dataType:"json",
    success: function(data){
        if(data.status == "OK"){
        head.empty();
        $("#juris_error").empty();
        newsList.empty();

        $.tmpl("headTemplate",data).appendTo(head);
        $("#juris_back").attr('href',data.back_link);
        menu.empty();

        if(data.dirs.length > 0)
            $.tmpl("menuTemplate",data.dirs).appendTo(menu);
        else
            if(data.files.length > 0)
                $.tmpl("newsTemplate",data.files).appendTo(newsList);
            else
                $("#juris_error").append('Nessun Documento');

        menu.listview("refresh");
        newsList.listview("refresh");
        }
        else{
            head.empty();
            $.tmpl("headTemplate",data).appendTo(head);
            $("#juris_back").attr('href',data.back_link);
            try{
                navigator.notification.alert(data.text,function(){;},"Errore","Ok");
            }
            catch(e){
                alert(data.text);
            }
        }
        $.mobile.hidePageLoadingMsg();
        },
    error: function(XMLHttpRequest, textStatus, errorThrown){
        $.mobile.hidePageLoadingMsg();
        try{
            navigator.notification.alert("Impossibile comunicare con il server",function(){;},"Errore","Ok");
        }
        catch(e){
            alert("Errore\r\nImpossibile comunicare con il server");
        }
        }
    });
};

function startWatch(){
  try{
    var options = {frequency:3000};
    watchID = navigator.accelerometer.watchAcceleration(
        function(){
            remoteLoadNews();
        },
        function(){
            ;//console.log("Errore shake");
        },
        options
    );
  }catch(e){}
}

function stopWatch(){
  try{
    if(watchID){
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
  }catch(e){}
}


function loadMessages(){
    if(window.localStorage.getItem("msgs") == undefined)
        remoteLoadMsgs();
    else
        buildMsgs(JSON.parse(window.localStorage.getItem("msgs")));
};

function buildMsgs(data,limit,query){
    if(limit == null)
        limit = 100;
    else
        limit = limit + 100;
    if(query == null)
        query = "";
    var markup = '<li class="newsItem thread"><a href="radio_1.html?id=${id_messaggio}&rif=${rif_id}">Inviato da ${nome} il <span class="small">${data_inser}</span><br /><span class="big">${oggetto}</span><br />${testo_msg}</a></li>';
    $.template("msgsTemplate",markup);
    var newsList = $("#feeds");
    newsList.empty();
    $.tmpl("msgsTemplate",data).appendTo(newsList);
    newsList.listview("refresh");
    $('#link').empty();
    $('<li data-icon="forward"><a onclick="remoteLoadMsgs('+limit+','+query+');">Mostra messaggi più vecchi</a></li>').appendTo('#link');
    $('#link').listview("refresh");
};

function remoteLoadMsgs(limit,query){
    if(limit == null)
        limit = 100;
    if(query == null)
        query = $('#query').val();
    url = 'http://www.forzearmate.org/app/messages.php?limit='+limit+'&q='+query;
    //url = 'http://giove.hsgroup.net:8080/test/forzearmate/app/messages.php?limit='+limit+'&q='+query;
    $.mobile.showPageLoadingMsg();
    jQuery.ajax({
                type:"GET",
                url: url,
                dataType:"json",
                success: function(data){
                window.localStorage.setItem('msgs',JSON.stringify(data));
                buildMsgs(data,limit);
                $.mobile.hidePageLoadingMsg();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                $.mobile.hidePageLoadingMsg();
                try{
                navigator.notification.alert("Impossibile comunicare con il server",function(){;},"Errore","Ok");
                }
                catch(e){
                alert("Errore\r\nImpossibile comunicare con il server");
                }
                }
                });
};

function loadMessage(id,rif){
    $.mobile.showPageLoadingMsg();
    if(id == undefined){
        $.mobile.hidePageLoadingMsg();
        try{
            navigator.notification.alert("Impossibile caricare il messaggio richiesto",function(){;},"Errore","Ok");
        }
        catch(e){
            alert("Errore\r\nImpossibile caricare il messaggio richiesto");
        }
    }
    else {
        var r_id = id;
        if(rif > 0)
            r_id = rif;
        //url = 'http://giove.hsgroup.net:8080/test/forzearmate/app/message.php?id='+id+'&rif='+rif;
        url = 'http://www.forzearmate.org/app/message.php?id='+id+'&rif='+rif;
        
        var markup = '<li class="newsItem thread">Inviato da ${nome} il <span class="small">${data_inser}</span><br /><span class="big">${oggetto}</span><br />${testo}</a></li>';
        $.template("msgsTemplate",markup);
        jQuery.ajax({
                    type:"GET",
                    url: url,
                    dataType:"json",
                    success: function(data){
                    var newsList = $("#thread");
                    newsList.empty();
                    $.tmpl("msgsTemplate",data).appendTo(newsList);
                    newsList.listview("refresh");
                    $('#reply').empty();
                    $('<li data-icon="forward"><a href="radio_2.html?ref='+r_id+'&oggetto='+encodeURIComponent(data[0]['oggetto'])+'">Rispondi</a></li>').appendTo('#reply');
                    $('#reply').listview("refresh");
                    $.mobile.hidePageLoadingMsg();	
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown){
                    $.mobile.hidePageLoadingMsg();
                    try{
                    navigator.notification.alert("Impossibile comunicare con il server",function(){;},"Errore","Ok");
                    }
                    catch(e){
                    alert("Errore\r\nImpossibile comunicare con il server");
                    }
                    }
                    });
    }
};


function postMessage(){
    if($('#name').val() == ""){
        try{
            navigator.notification.alert("Inserire il proprio nome",function(){;},"Errore","Ok");
        }
        catch(e){
            alert("Errore\r\nInserire il proprio nome");
        }
        return false;
    }
    if($('#obj').val() == ""){
        try{
            navigator.notification.alert("Inserire l'oggetto del messaggio",function(){;},"Errore","Ok");
        }
        catch(e){
            alert("Errore\r\nInserire l'oggetto del messaggio");
        }
        return false;
    }
    if($('#testo').val() == ""){
        try{
            navigator.notification.alert("Inserire il testo del messaggio",function(){;},"Errore","Ok");
        }
        catch(e){
            alert("Errore\r\nInserire il testo del messaggio");
        }
        return false;
    }
    //url = 'http://giove.hsgroup.net:8080/test/forzearmate/app/post_message.php';
    url = 'http://www.forzearmate.org/app/post_message.php';
    jQuery.ajax({
        type:"POST",
        url: url,
        data: $('#msg_form').serialize(), 
        success: function(data){
            $.mobile.hidePageLoadingMsg();
            window.localStorage.removeItem('msgs');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            $.mobile.hidePageLoadingMsg();
            try{
                navigator.notification.alert("Impossibile comunicare con il server",function(){;},"Errore","Ok");
            }
            catch(e){
                alert("Errore\r\nImpossibile comunicare con il server");
            }
        }
    });
    
    $.mobile.changePage("radio.html",{transition:"slidedown"});
    return false;
};



(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},h=0,c=0,l=[];function g(e,d,g,i){var c={data:i||(d?d.data:{}),_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};e&&a.extend(c,e,{nodes:[],parent:d});if(g){c.tmpl=g;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++h;(l.length?f:b)[h]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a.fn[d].apply(a(i[h]),k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,l,j){if(d[0]&&d[0].nodeType){var f=a.makeArray(arguments),g=d.length,i=0,h;while(i<g&&!(h=a.data(d[i++],"tmplItem")));if(g>1)f[0]=[a.makeArray(d)];if(h&&c)f[2]=function(b){a.tmpl.afterManip(this,b,j)};r.apply(this,f)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var j,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(i(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);j=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(i(c,null,j)):j},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){_=_.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(_,$1,$2);_=[];",close:"call=$item.calls();_=call._.concat($item.wrap(call,_));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){_.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){_.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function i(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:i(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=j(c).concat(b);if(d)b=b.concat(j(d))});return b?b:j(c)}function j(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,j,d,b,c,e){var i=a.tmpl.tag[j],h,f,g;if(!i)throw"Template command not found: "+j;h=i._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=k(b);e=e?","+k(e)+")":c?")":"";f=c?b.indexOf(".")>-1?b+c:"("+b+").call($item"+e:b;g=c?f:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else g=f=h.$1||"null";d=k(d);return"');"+i[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(g).split("$1").join(f).split("$2").join(d?d.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,function(d,c,b,a){a=a?","+a+")":b?")":"";return a?"("+c+").call($item"+a:d}):h.$2||"")+"_.push('"})+"');}return _;")}function n(c,b){c._wrap=i(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function k(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,i;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(i=j.length-1;i>=0;i--)m(j[i]);m(k)}function m(j){var p,i=j,k,e,m;if(m=j.getAttribute(d)){while(i.parentNode&&(i=i.parentNode).nodeType===1&&!(p=i.getAttribute(d)));if(p!==m){i=i.parentNode?i.nodeType===11?0:i.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[i]||f[i],null,true);e.key=++h;b[h]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;i=a.data(j.parentNode,"tmplItem");i=i?i.key:0}if(e){k=e;while(k&&k.key!=i){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent,null,true)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery)
