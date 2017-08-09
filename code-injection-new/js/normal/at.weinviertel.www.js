

 
 
 
 
 var codesite_token = null;
 
 
 var CS_env = {"profileUrl":null,"token":null,"assetHostPath":"http://www.gstatic.com/codesite/ph","domainName":null,"assetVersionPath":"http://www.gstatic.com/codesite/ph/11556196549636558490","projectHomeUrl":"/p/jquery-bing-maps","relativeBaseUrl":"","projectName":"jquery-bing-maps","loggedInUserEmail":null};
 var _gaq = _gaq || [];
 _gaq.push(
 ['siteTracker._setAccount', 'UA-18071-1'],
 ['siteTracker._trackPageview']);
 
 _gaq.push(
 ['projectTracker._setAccount', 'UA-17614686-7'],
 ['projectTracker._trackPageview']);
 
 (function() {
 var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
 ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
 (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ga);
 })();
 
 

 window.___gcfg = {lang: 'en'};
 (function() 
 {var po = document.createElement("script");
 po.type = "text/javascript"; po.async = true;po.src = "https://apis.google.com/js/plusone.js";
 var s = document.getElementsByTagName("script")[0];
 s.parentNode.insertBefore(po, s);
 })();


 
 function codesearchQuery(form) {
 var query = document.getElementById('q').value;
 if (query) { form.action += '%20' + query; }
 }
 

 var cancelBubble = false;
 function _go(url) { document.location = url; }


 var lineNumUnderMouse = -1;
 
 function gutterOver(num) {
 gutterOut();
 var newTR = document.getElementById('gr_svn56_' + num);
 if (newTR) {
 newTR.className = 'undermouse';
 }
 lineNumUnderMouse = num;
 }
 function gutterOut() {
 if (lineNumUnderMouse != -1) {
 var oldTR = document.getElementById(
 'gr_svn56_' + lineNumUnderMouse);
 if (oldTR) {
 oldTR.className = '';
 }
 lineNumUnderMouse = -1;
 }
 }
 var numsGenState = {table_base_id: 'nums_table_'};
 var srcGenState = {table_base_id: 'src_table_'};
 var alignerRunning = false;
 var startOver = false;
 function setLineNumberHeights() {
 if (alignerRunning) {
 startOver = true;
 return;
 }
 numsGenState.chunk_id = 0;
 numsGenState.table = document.getElementById('nums_table_0');
 numsGenState.row_num = 0;
 if (!numsGenState.table) {
 return; // Silently exit if no file is present.
 }
 srcGenState.chunk_id = 0;
 srcGenState.table = document.getElementById('src_table_0');
 srcGenState.row_num = 0;
 alignerRunning = true;
 continueToSetLineNumberHeights();
 }
 function rowGenerator(genState) {
 if (genState.row_num < genState.table.rows.length) {
 var currentRow = genState.table.rows[genState.row_num];
 genState.row_num++;
 return currentRow;
 }
 var newTable = document.getElementById(
 genState.table_base_id + (genState.chunk_id + 1));
 if (newTable) {
 genState.chunk_id++;
 genState.row_num = 0;
 genState.table = newTable;
 return genState.table.rows[0];
 }
 return null;
 }
 var MAX_ROWS_PER_PASS = 1000;
 function continueToSetLineNumberHeights() {
 var rowsInThisPass = 0;
 var numRow = 1;
 var srcRow = 1;
 while (numRow && srcRow && rowsInThisPass < MAX_ROWS_PER_PASS) {
 numRow = rowGenerator(numsGenState);
 srcRow = rowGenerator(srcGenState);
 rowsInThisPass++;
 if (numRow && srcRow) {
 if (numRow.offsetHeight != srcRow.offsetHeight) {
 numRow.firstChild.style.height = srcRow.offsetHeight + 'px';
 }
 }
 }
 if (rowsInThisPass >= MAX_ROWS_PER_PASS) {
 setTimeout(continueToSetLineNumberHeights, 10);
 } else {
 alignerRunning = false;
 if (startOver) {
 startOver = false;
 setTimeout(setLineNumberHeights, 500);
 }
 }
 }
 function initLineNumberHeights() {
 // Do 2 complete passes, because there can be races
 // between this code and prettify.
 startOver = true;
 setTimeout(setLineNumberHeights, 250);
 window.onresize = setLineNumberHeights;
 }
 initLineNumberHeights();


 var detail_url = '/p/jquery-bing-maps/source/detail?r=56&spec=svn56';
 var publish_url = '/p/jquery-bing-maps/source/detail?r=56&spec=svn56#publish';
 // describe the paths of this revision in javascript.
 var changed_paths = [];
 var changed_urls = [];
 
 changed_paths.push('/trunk/js/build/build.bat');
 changed_urls.push('/p/jquery-bing-maps/source/browse/trunk/js/build/build.bat?r\x3d56\x26spec\x3dsvn56');
 
 
 changed_paths.push('/trunk/js/jquery.ui.bmap.full.js');
 changed_urls.push('/p/jquery-bing-maps/source/browse/trunk/js/jquery.ui.bmap.full.js?r\x3d56\x26spec\x3dsvn56');
 
 
 changed_paths.push('/trunk/js/jquery.ui.bmap.js');
 changed_urls.push('/p/jquery-bing-maps/source/browse/trunk/js/jquery.ui.bmap.js?r\x3d56\x26spec\x3dsvn56');
 
 
 changed_paths.push('/trunk/js/jquery.ui.bmap.services.js');
 changed_urls.push('/p/jquery-bing-maps/source/browse/trunk/js/jquery.ui.bmap.services.js?r\x3d56\x26spec\x3dsvn56');
 
 
 changed_paths.push('/trunk/js/min/jquery.ui.bmap.full.min.js');
 changed_urls.push('/p/jquery-bing-maps/source/browse/trunk/js/min/jquery.ui.bmap.full.min.js?r\x3d56\x26spec\x3dsvn56');
 
 
 changed_paths.push('/trunk/js/min/jquery.ui.bmap.min.js');
 changed_urls.push('/p/jquery-bing-maps/source/browse/trunk/js/min/jquery.ui.bmap.min.js?r\x3d56\x26spec\x3dsvn56');
 
 
 changed_paths.push('/trunk/js/min/jquery.ui.bmap.services.min.js');
 changed_urls.push('/p/jquery-bing-maps/source/browse/trunk/js/min/jquery.ui.bmap.services.min.js?r\x3d56\x26spec\x3dsvn56');
 
 var selected_path = '/trunk/js/min/jquery.ui.bmap.services.min.js';
 
 
 function getCurrentPageIndex() {
 for (var i = 0; i < changed_paths.length; i++) {
 if (selected_path == changed_paths[i]) {
 return i;
 }
 }
 }
 function getNextPage() {
 var i = getCurrentPageIndex();
 if (i < changed_paths.length - 1) {
 return changed_urls[i + 1];
 }
 return null;
 }
 function getPreviousPage() {
 var i = getCurrentPageIndex();
 if (i > 0) {
 return changed_urls[i - 1];
 }
 return null;
 }
 function gotoNextPage() {
 var page = getNextPage();
 if (!page) {
 page = detail_url;
 }
 window.location = page;
 }
 function gotoPreviousPage() {
 var page = getPreviousPage();
 if (!page) {
 page = detail_url;
 }
 window.location = page;
 }
 function gotoDetailPage() {
 window.location = detail_url;
 }
 function gotoPublishPage() {
 window.location = publish_url;
 }


prettyPrint();



 var lastStop = null;
 var initialized = false;
 
 function updateCursor(next, prev) {
 if (prev && prev.element) {
 prev.element.className = 'cursor_stop cursor_hidden';
 }
 if (next && next.element) {
 next.element.className = 'cursor_stop cursor';
 lastStop = next.index;
 }
 }
 
 function pubRevealed(data) {
 updateCursorForCell(data.cellId, 'cursor_stop cursor_hidden');
 if (initialized) {
 reloadCursors();
 }
 }
 
 function draftRevealed(data) {
 updateCursorForCell(data.cellId, 'cursor_stop cursor_hidden');
 if (initialized) {
 reloadCursors();
 }
 }
 
 function draftDestroyed(data) {
 updateCursorForCell(data.cellId, 'nocursor');
 if (initialized) {
 reloadCursors();
 }
 }
 function reloadCursors() {
 kibbles.skipper.reset();
 loadCursors();
 if (lastStop != null) {
 kibbles.skipper.setCurrentStop(lastStop);
 }
 }
 // possibly the simplest way to insert any newly added comments
 // is to update the class of the corresponding cursor row,
 // then refresh the entire list of rows.
 function updateCursorForCell(cellId, className) {
 var cell = document.getElementById(cellId);
 // we have to go two rows back to find the cursor location
 var row = getPreviousElement(cell.parentNode);
 row.className = className;
 }
 // returns the previous element, ignores text nodes.
 function getPreviousElement(e) {
 var element = e.previousSibling;
 if (element.nodeType == 3) {
 element = element.previousSibling;
 }
 if (element && element.tagName) {
 return element;
 }
 }
 function loadCursors() {
 // register our elements with skipper
 var elements = CR_getElements('*', 'cursor_stop');
 var len = elements.length;
 for (var i = 0; i < len; i++) {
 var element = elements[i]; 
 element.className = 'cursor_stop cursor_hidden';
 kibbles.skipper.append(element);
 }
 }
 function toggleComments() {
 CR_toggleCommentDisplay();
 reloadCursors();
 }
 function keysOnLoadHandler() {
 // setup skipper
 kibbles.skipper.addStopListener(
 kibbles.skipper.LISTENER_TYPE.PRE, updateCursor);
 // Set the 'offset' option to return the middle of the client area
 // an option can be a static value, or a callback
 kibbles.skipper.setOption('padding_top', 50);
 // Set the 'offset' option to return the middle of the client area
 // an option can be a static value, or a callback
 kibbles.skipper.setOption('padding_bottom', 100);
 // Register our keys
 kibbles.skipper.addFwdKey("n");
 kibbles.skipper.addRevKey("p");
 kibbles.keys.addKeyPressListener(
 'u', function() { window.location = detail_url; });
 kibbles.keys.addKeyPressListener(
 'r', function() { window.location = detail_url + '#publish'; });
 
 kibbles.keys.addKeyPressListener('j', gotoNextPage);
 kibbles.keys.addKeyPressListener('k', gotoPreviousPage);
 
 
 }
 


 function showPublishInstructions() {
 var element = document.getElementById('review_instr');
 if (element) {
 element.className = 'opened';
 }
 }
 var codereviews;
 function revsOnLoadHandler() {
 // register our source container with the commenting code
 var paths = {'svn56': '/trunk/js/min/jquery.ui.bmap.services.min.js'}
 codereviews = CR_controller.setup(
 {"profileUrl":null,"token":null,"assetHostPath":"http://www.gstatic.com/codesite/ph","domainName":null,"assetVersionPath":"http://www.gstatic.com/codesite/ph/11556196549636558490","projectHomeUrl":"/p/jquery-bing-maps","relativeBaseUrl":"","projectName":"jquery-bing-maps","loggedInUserEmail":null}, '', 'svn56', paths,
 CR_BrowseIntegrationFactory);
 
 codereviews.registerActivityListener(CR_ActivityType.REVEAL_DRAFT_PLATE, showPublishInstructions);
 
 codereviews.registerActivityListener(CR_ActivityType.REVEAL_PUB_PLATE, pubRevealed);
 codereviews.registerActivityListener(CR_ActivityType.REVEAL_DRAFT_PLATE, draftRevealed);
 codereviews.registerActivityListener(CR_ActivityType.DISCARD_DRAFT_COMMENT, draftDestroyed);
 
 
 
 
 
 
 
 var initialized = true;
 reloadCursors();
 }
 window.onload = function() {keysOnLoadHandler(); revsOnLoadHandler();};






eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] } ]; e = function () { return '\\w+' }; c = 1; }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p; } ('(j(f){j g(a,b){f.2l(a,j(a){"2p"===a.2j&&a.R&&0<a.R.L&&0<a.R[0].2k?b(a.R,"2h"):b(y,"2m")}).2f(j(){b(y,"2a")})}f.a=j(a,b,c){f[a]=f[a]||{};f[a][b]=j(a,b){1l.L&&9.1W(a,b)};f[a][b].16=c;f.1V[b]=j(c){p e=9,i=17.16.1v.1s(1l,1),h="12"===11 c;o(h&&"2D"===c.2C(0,1))n e;9.28(j(){p g=f.Z(9,b)?f.Z(9,b):f.Z(9,b,r f[a][b](c,9));h&&(e=g[c].1u(g,i))});n e}};f.a("2B","1p",{t:{D:r l.m.1f(0,0),1a:5},2G:j(a,b){o(b)9.23(a,b);v n 9.t[a]},1W:j(a,b){9.A=f(b);E.1c(9.t,a);9.t.D=9.G(9.t.D);9.1Q();9.1R&&9.1R()},1Q:j(){p a=9.T={A:9.A,q:r l.m.18(9.A[0],9.t),19:[],M:[],14:[]};9.X(9.t.20,a.q);2y(j(){a.A.2z("2x",a.q)},1)},23:j(a,b){p c=9.k("q");9.t[a]=b;c.2v(E.1c(9.t,{D:c.2w(),2e:c.2r(),1a:c.2q()}))},1C:j(a){p b=9.k("q"),c=9.k("1j",[]);c.B(9.G(a));1<c.L?b.1k({1j:l.m.2s.2u(c)}):b.1k({1a:9.k("q").2t().2F,D:c[0]})},2H:j(a,b){p c=9.k("q"),d=f(9.1e(a)),e={2J:"2I","z-2A":10};o(3>b)e.1I=0;v o(2<b&&6>b)e.1I=(c.2E()-d.2d())/2;v o(5<b)e.2c=0;o(0==b||3==b||6==b)e.1J=0;v o(1==b||4==b||7==b)e.1J=(c.2b()-d.2g())/2;v o(2==b||5==b||8==b)e.2n=0;d.2o(e);9.A[0].2i(d[0]);n d},1y:j(a,b,c){p d=9.k("q"),c=c||l.m.Y,a=9.S?9.S("1y",a):a;a.F=9.G(a.F);p c=r c(a.F,a),e;J(e W a)c[e]=a[e];e=9.k("19",[]);c.1A()?e[c.1A()]=c:e.B(c);a.1j&&9.1C(c.K());d.x.B(c);9.X(b,d,c);n f(c)},29:j(a,b,c){a=r l.m.I(b.K(),a);9.k("q").x.B(a);9.X(c,a);n f(a)},1x:j(a,b){a.1B=a.1B||r l.m.3a(0,15);a.1D=a.1D||3f;p a=9.S?9.S("1x",a):a,b=9.1e(b),c;c=b?b s l.m.Y?b.K():b.3e.K():a.F;9.k("H")&&-1<9.k("q").x.1G(9.k("H"))&&9.k("q").x.1K(9.k("H"));o(a.C)o(a.C s 1n)a.C=\'<1z 3h="I">\'+a.C.3g+"</1z>";v o(y==a.C.3b(3d(/<(?:"[^"]*"[\'"]*|\'[^\']*\'[\'"]*|[^\'">])+>/)))a.3c=a.C;9.P("H",r l.m.I(c,a));9.k("q").x.B(9.k("H"));9.k("q").1k({D:c})},Q:j(a){9.13(9.k(a));9.P(a,[])},13:j(a){J(p b W a)a.1L(b)&&(a[b]s l.m.Y||a[b]s l.m.I||a[b]s l.m.18?(l.m.1d.3i(a[b]),9.k("q").x.1K(a[b])):a[b]s 17&&9.13(a[b]),a[b]=y)},3k:j(a,b,c){p a=9.k(a),d;J(d W a)a.1L(d)&&c(a[d],b.1r&&a[d][b.1b]?-1<f.3m(b.1F,a[d][b.1b].1i(b.1r)):a[d][b.1b]===b.1F)},3l:j(a){n 9.k("q").39().2S(a.K())},k:j(a,b){p c=9.T;o(!c[a]){o(-1<a.1G(">")){J(p d=a.w(/ /g,"").1i(">"),e=0;e<d.L;e++){o(!c[d[e]])o(b)c[d[e]]=e+1<d.L?[]:b;v n y;c=c[d[e]]}n c}b&&!c[a]&&9.P(a,b)}n c[a]},P:j(a,b){9.T[a]=b},2Q:j(){9.Q("19");9.Q("M");9.Q("14");p a=9.T;a.q.2U();J(p b W a)a[b]=y;E.2M(9.A[0],"1p")},X:j(a){a&&f.2L(a)&&a.1u(9,17.16.1v.1s(1l,1))},G:j(a){o(a s l.m.1f)n a;a=a.w(/ /g,"").1i(",");n r l.m.1f(a[0],a[1])},1e:j(a){o(a){o(a s E)n a[0];o(a s 1n)n a}v n y;n f("#"+a)[0]},2K:j(a,b){g("24://1Z.21.25/27/26/2P/{0}?1M=1N&1O=?&1S={1}".w("{0}",a.V?a.V:a.22.2O+","+a.22.2N).w("{1}",9.t.1T),b)},2W:j(a,b){g("24://1Z.21.25/27/26/35?1P.0={0}&1P.1={1}&34=33&1M=1N&1O=?&1S={2}".w("{0}",a.U).w("{1}",a.N).w("{2}",9.t.1T),b)},38:j(a,b){p c=9,d=j(){p e=c.k("M > 1g",r l.m.O.1g(c.k("q"))),d="12"===11 a.U?{V:a.U}:{F:a.U},f="12"===11 a.N?{V:a.N}:{F:a.N};e.37();e.36(a.2Z);e.1U(r l.m.O.1Y(d));e.1U(r l.m.O.1Y(f));b&&e.2Y({2X:b.32});e.31()};c.k("M > 1g")?d():l.m.30("l.m.O",{20:d})},3j:j(a,b){p c=9;f.28(b.1h,j(a,d){b.1h[a]=c.G(d)});p d=r l.m[a](b.1h,b);9.k("14 > "+a,[]).B(d);9.k("q").x.B(d);n f(d)}});E.1V.1c({1X:j(a,b){n 9.u("1X",a,b)},1o:j(a,b){n 9.u("1o",a,b)},1m:j(a,b){n 9.u("1m",a,b)},1q:j(a,b){n 9.u("1q",a,b)},1t:j(a,b){n 9.u("1t",a,b)},1w:j(a){n 9.u("1w",a)},1H:j(a){n 9.u("1H",a)},2T:j(a){l.m.1d.2V(9[0],a)},u:j(a,b,c){9[0]s l.m.Y||9[0]s l.m.I||9[0]s l.m.18?l.m.1d.2R(9[0],a,b):c?9.1E(a,b,c):9.1E(a,b);n 9}})})(E);', 62, 209, '|||||||||this||||||||||function|get|Microsoft|Maps|return|if|var|map|new|instanceof|options|addEventListener|else|replace|entities|null||el|push|htmlContent|center|jQuery|location|_latLng|iw|Infobox|for|getLocation|length|services|destination|Directions|set|clear|resourceSets|_convert|instance|origin|address|in|_call|Pushpin|data||typeof|string|_c|overlays||prototype|Array|Map|markers|zoom|property|extend|Events|_unwrap|Location|DirectionsManager|paths|split|bounds|setView|arguments|dblclick|Object|rightclick|gmap|mouseover|delimiter|call|mouseout|apply|slice|drag|openInfoWindow|addMarker|div|getId|offset|addBounds|zIndex|bind|value|indexOf|dragend|top|left|remove|hasOwnProperty|output|json|jsonp|wp|_create|_init|key|credentials|addWaypoint|fn|_setup|click|Waypoint|dev|callback|virtualearth|point|_u|http|net|v1|REST|each|addInfoWindow|ERROR|getWidth|bottom|height|mapTypeId|error|width|OK|appendChild|authenticationResultCode|estimatedTotal|getJSON|ZERO_RESULTS|right|css|ValidCredentials|getZoom|getMapTypeId|LocationRect|getZoomRange|fromLocations|setOptions|getCenter|init|setTimeout|trigger|index|ui|substring|_|getHeight|max|option|addControl|absolute|position|search|isFunction|removeData|longitude|latitude|Locations|destroy|addHandler|contains|triggerEvent|dispose|invoke|loadDirections|itineraryContainer|setRenderOptions|routeMode|loadModule|calculateDirections|panel|Points|routePathOutput|Routes|setRequestOptions|resetDirections|displayDirections|getBounds|Point|match|description|RegExp|target|99999|innerHTML|class|removeHandler|addShape|find|inViewport|inArray'.split('|'), 0, {}))

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(3(e){e.w(e.u.v.z,{y:3(a,b){8 d=5;e(\'[h="{0}"]\'.i("{0}",a)).p(3(a){b(d.7(e(5),{"@o":d.9(e(5).2("h"))}),5,a)})},7:3(a,b){8 d=5;a.n().p(3(){8 a=e(5),f=a.2("h"),c=a.2("A");x 0!=f&&0<a.n().k?(b[c]||(b[c]=[]),b[c].j({"@o":d.9(f)}),d.7(a,b[c][b[c].k-1])):c?b[c]?("H"===G b[c]&&(f=b[c],b[c]=[],b[c].j(f)),b[c].j(d.g(a))):b[c]=d.g(a):d.7(a,b)});4 b},g:3(a){6(a.2("m"))4 a.2("m");6(a.2("l"))4 a.2("l");6(a.2("s"))4 a.2("s");6(a.2("t"))4 a.2("t");6(a.r())4 a.r()},9:3(a){-1<a.q("D")?a=a.E(a.C("/")+1).i("?","").i("#",""):-1<a.q(":")&&(a=a.F(":")[1]);4 a}})})(B);',44,44,'||attr|function|return|this|if|_traverse|var|_resolveType|||||||_extract|itemtype|replace|push|length|href|src|children|type|each|indexOf|text|content|datetime|ui|gmap|extend|void|microdata|prototype|itemProp|jQuery|lastIndexOf|http|substr|split|typeof|string'.split('|'),0,{}))

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(1(a){a.f(a.9.g.i,{h:1(d,c){5 e=0;a.8(c.2,1(a,b){c.2[a]=e.6(b)});5 b=7 j.o[d](c.2,c);0.3("k > "+d,[]).4(b);0.3("m").n.4(b);l a(b)}})})(p);',26,26,'this|function|paths|get|push|var|_latLng|new|each|ui||||||extend|gmap|addShape|prototype|Microsoft|overlays|return|map|entities|Maps|jQuery'.split('|'),0,{}))

// popup examples
$( document ).on( "pageinit", function() {

	$( ".photopopup" ).on({
		popupbeforeposition: function() {
			var maxHeight = $( window ).height() - 60 + "px";
			$( ".photopopup img" ).css( "max-height", maxHeight );
		}
	});

	function scale( width, height, padding, border ) {
		var scrWidth = $( window ).width() - 30,
			scrHeight = $( window ).height() - 30,
			ifrPadding = 2 * padding,
			ifrBorder = 2 * border,
			ifrWidth = width + ifrPadding + ifrBorder,
			ifrHeight = height + ifrPadding + ifrBorder,
			h, w;

		if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
			w = ifrWidth;
			h = ifrHeight;
		} else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
			w = scrWidth;
			h = ( scrWidth / ifrWidth ) * ifrHeight;
		} else {
			h = scrHeight;
			w = ( scrHeight / ifrHeight ) * ifrWidth;
		}
		
		return {
			'width': w - ( ifrPadding + ifrBorder ),
			'height': h - ( ifrPadding + ifrBorder )
		};
	};

	$( ".ui-popup iframe" )
		.attr( "width", 0 )
		.attr( "height", "auto" );
	 
	$( "#popupVideo" ).on({
		popupbeforeposition: function() {
			// call our custom function scale() to get the width and height 
			var size = scale( 497, 298, 15, 1 ),
				w = size.width,
				h = size.height;

			$( "#popupVideo iframe" )
				.attr( "width", w )
				.attr( "height", h );
		},
		popupafterclose: function() {
			$( "#popupVideo iframe" )
				.attr( "width", 0 )
				.attr( "height", 0 );	
		}
	});

	$( "#popupMap iframe" ).contents().find( "#map_canvas" )
		.css( { "width" : 0, "height" : 0 } );
	 		 
	$( "#popupMap" ).on({
		popupbeforeposition: function() {
			var size = scale( 480, 320, 0, 1 ),
				w = size.width,
				h = size.height;

			$( "#popupMap iframe" )
				.attr( "width", w )
				.attr( "height", h );
					 
			$( "#popupMap iframe" ).contents().find( "#map_canvas" )
				.css( { "width": w, "height" : h } );
		},
		popupafterclose: function() {
			$( "#popupMap iframe" )
				.attr( "width", 0 )
				.attr( "height", 0 );
					 
			$( "#popupMap iframe" ).contents().find( "#map_canvas" )
				.css( { "width": 0, "height" : 0 } );
		}
	});
      
	$( "#popupPanel" ).on({
		popupbeforeposition: function() {
			var h = $( window ).height();
			
			$( "#popupPanel" )
				.css( "height", h );
		}
	});
		 
	$( "#popupPanel button" ).on( "click", function() {	
		$( "#popupPanel" ).popup('close');
	});

});// JavaScript Document

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(3(e){e.y(e.x.A.u,{v:3(a,b){j c=4;e(\'[h="{0}"]\'.i("{0}",a)).r(3(a){b(c.8(e(4),{"@l":c.7(e(4).2("h"))}),4,a)})},8:3(a,b){j c=4;a.m().r(3(){j a=e(4),g=c.7(a.2("h")),f=c.7(a.2("z")),d=c.7(a.2("w"));g||f||d?(f&&(0<a.m().o?(b[f]=[],c.8(a,b[f])):b[f]=c.9(a,!0)),g&&(b.n({"@l":g}),c.8(a,b[b.o-1])),d&&(b[d]?(b[d]=[b[d]],b[d].n(c.9(a,!1))):b[d]=c.9(a,!1))):c.8(a,b)});5 b},9:3(a,b){6(b){6(a.2("k"))5 a.2("k");6(a.2("p"))5 a.2("p")}6(a.2("t"))5 a.2("t");6(a.s())5 a.s()},7:3(a){a&&(-1<a.q("B")?a=a.C(a.E("/")+1).i("?","").i("#",""):-1<a.q(":")&&(a=a.F(":")[1]));5 a}})})(D);',42,42,'||attr|function|this|return|if|_resolveType|_traverse|_extract||||||||typeof|replace|var|src|type|children|push|length|href|indexOf|each|text|content|prototype|rdfa|property|ui|extend|rel|gmap|http|substr|jQuery|lastIndexOf|split'.split('|'),0,{}))










<!--



        function initialize() {

        }
        var geocoder;
        var map;
        var mapTotal;
        var infowindow;
        var directionsService;
        var directionsRenderer;
        var marker1;
        var marker2;
$(document).ready(function() {
    var canDetect = "onorientationchange" in window;
    var orientationTimer = 0;

    var ROTATION_CLASSES = {
        "0": "none",
        "90": "right",
        "-90": "left",
        "180": "flipped"
    };

    $(window).bind(canDetect ? "orientationchange" : "resize", function(evt) {
        clearTimeout(orientationTimer);
        orientationTimer = setTimeout(function() {
            // display the event type and window details
            $("#event-type").html(evt.type);
            $("#window-orientation").html(window.orientation);
            $("#window-width").html(window.innerWidth);
            $("#window-height").html(window.innerHeight);

            // given we can only really rely on width and height at this stage, 
            // calculate the orientation based on aspect ratio
            var aspectRatio = 1;
            if (window.innerHeight !== 0) {
                aspectRatio = window.innerWidth / window.innerHeight;
            } // if

            // determine the orientation based on aspect ratio
            var orientation = aspectRatio <= 1 ? "portrait" : "landscape";

            // if the event type is an orientation change event, we can rely on
            // the orientation angle
            var rotationText = null;
            if (evt.type == "orientationchange") {
                rotationText = ROTATION_CLASSES[window.orientation.toString()];
            } // if

            $(window).trigger("reorient", [orientation, rotationText]);
        }, 500);
    });

    $(window).bind("reorient", function(evt, orientation, rotation) {
        // display the details we have determine from the display
        $("#orientation").html(orientation);
        $("#rotation-class").html(rotation);
    });
});

        function initialize2(lat, long) {
            //alert(lat+'ffff'+long);
            geocoder = new google.maps.Geocoder();
            var myLatlng = new google.maps.LatLng(lat, long);
            var myOptions =
        {
            zoom: 15,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
            // alert('12');
            map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            mapTotal = new google.maps.Map(document.getElementById("map_canvasTotal"), myOptions);
        }

        function codeAddress(addr, firma) {

            var icon = new google.maps.MarkerImage("images/supermarket.png");
            var lat = localStorage.getItem("lati");
            var long = localStorage.getItem("longi");
            if (lat == "0") {
                lat = "48.221609";
                long = "14.239826999999991";
            }
            var address = addr;
            var Firms = firma;
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: map,
                        icon: icon,
                        title: Firms,
                        position: results[0].geometry.location
                    });
                    if (lat != "0" || lat != null) {
                        var marker2 = new google.maps.Marker({
                            map: map,
                            title: 'Ihre Position',
                            position: new google.maps.LatLng(lat, long)
                        });
                    }
                    route(results[0].geometry.location, new google.maps.LatLng(lat, long));
                }
                else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }
        function loadScript() {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://maps.google.com/maps/api/js?sensor=true&callback=initialize";
            document.body.appendChild(script);
        }


        var lat = 0;
        var long = 0;
        var KartenID = null;
        var SystemID = null;
        var Passwort = null;
        var form1var = null;
        var FirmaID = null;
        var MailingID = null;
        var storeDate = null;
        $(document).ready(function () {
            $("#kartenID").val(localStorage.getItem("KartenID"));
            $("#password").val(localStorage.getItem("Passwort"));
            $("#SystemID").val(localStorage.getItem("SystemID"));
            KartenID = localStorage.getItem("KartenID");
            Passwort = localStorage.getItem("Passwort");
            SystemID = localStorage.getItem("SystemID");
            storeDate = localStorage.getItem("storeDate");
            if (SystemID == "" || SystemID == null) {
                $('.frontlink').each(function () {

                    //$(this).attr('href', '#setup');
                });
            }
        });

        $('#form1').submit(function () {

            $.mobile.showPageLoadingMsg();
            KartenID = $("#kartenID").val();
            Passwort = $("#password").val();
            var jetzt = new Date();
            localStorage.setItem("KartenID", KartenID);
            localStorage.setItem("Passwort", Passwort);
            localStorage.setItem("storeDate", jetzt.getTime());
        });

        function hider() {
            $.mobile.hidePageLoadingMsg();
        }


        function onPartner(result, methodName) {
    		
            
            result = result.sort(result.Dist);
            var html = '<li data-role=\"list-divider\">Partner</li>';
            for (var i = 0; i < result.length; i++) {

                html = html + '<li><a href=\"#detail\" onclick=\"return redir(\'' + result[i].ID + '\');\">';
                if (result[i].Dist < 1000) {
                    html = html + '<p><span class=\"ui-li-count\" style=\"margin-top:-50px;\">' + result[i].Dist + ' km</span></p>';
                }
                html = html + '<h3><p><img align=left style=\"overflow:visible;margin-top:10px;\" ONERROR=\"this.src=http://loyalty.brain-behind.com/images/blank.gif\" src=\"http://loyalty.brain-behind.com/ThumbNail.ashx?p=' + result[i].Logo + '&Height=50&Width=120&cache=false\"  border=\"0\" ></p>' + result[i].Firma + '</h3>	<p><strong></strong></p><p>' + result[i].Strasse + ', ' + result[i].Plz + ' ' + result[i].Ort + '</p><p>' + result[i].Telefon + '</p><p>' + result[i].Email + '<br>' + result[i].Web + '</p>';

                //alert(result[i].Dist);

                html = html + '</a><a href=\"#detail\" onclick=\"return redir(\'' + result[i].ID + '\');\" >Details ' + result[i].Firma + '</a></li>';
            }
            $('#det2').html('');
            $('#det2').append(html);
            localStorage.setItem("partnerStr", html);
            $('#det2').listview();
            $('#det2').listview('refresh');
            $.mobile.hidePageLoadingMsg();
        }


        $('#foo').live('pageshow', function (event, ui) {


            SystemID = localStorage.getItem("SystemID");

            if (SystemID == "" || SystemID == null) {
                $.mobile.hidePageLoadingMsg();
                var html = '<li data-role=\"list-divider\">Kartendaten eingeben</li>';
                html = html + '<li>Bitte Ihre Kartendaten eingeben</li>';
                html = html + '<li><a href=\"#setup\">Zum Setup</a></li>';
                $('#Kontakt').html('');
                $('#Kontakt').append(html);
                $('#Kontakt').listview();
                $('#Kontakt').listview('refresh');
                $.mobile.hidePageLoadingMsg();
                //setTimeout(hider, 250);
            }
            else {
                date2 = new Date(localStorage.getItem("fooDate"));
                myDate = new Date();
                var check = false;
                if (date2 <= myDate) {
                    check = true;
                }
                var html = localStorage.getItem("fooStr");
                if (html == null) {
                    check = true;

                }
                //check = true;
                if (check == true) {
                    $.mobile.showPageLoadingMsg();

                    myDate.setDate(myDate.getDate() + 10);
                    localStorage.setItem("fooDate", myDate);

                    return $.ajax({ url: "http://iphone.brain-behind.com/Service.ashx?methodName=getStart&jsonp=onStart&SystemID=" + localStorage.getItem("SystemID"), dataType: "jsonp" });
                }
                else {
                    $('.changesrc').each(function () {
                        //$(this).attr('src', 'http://loyalty.brain-behind.com/ThumbJpeg.ashx?VFilePath=' + result[0].Logo + '&width=200&height=80&Bevel=false');
                        $(this).attr('src', localStorage.getItem("logo"));
                    });
                    $('#Kontakt').html('');
                    $('#Kontakt').append(html);
                    $('#Kontakt').listview();
                    $('#Kontakt').listview('refresh');
                }
            }
        });
        function onStart(result, methodName) {
            $('.changesrc').each(function () {

                //$(this).attr('src', 'http://87.106.135.111/CULOSYS/ThumbJpeg.ashx?VFilePath=' + result[0].Logo + '&width=200&height=80&Bevel=false');
                $(this).attr('src', 'http://loyalty.brain-behind.com/ThumbNail.ashx?p=' + result[0].Logo + '&Height=60&Width=300&cache=false');
            });
            $('#PrName').html(result[0].Programm);
            var html = '<li data-role=\"list-divider\">Kontakt</li>';
            html = html + '<li>' + result[0].Kontakt;
            html = html + '</li>';
            $('#Kontakt').html('');
            $('#Kontakt').append(html);
            $('#Kontakt').listview();
            $('#Kontakt').listview('refresh');
            localStorage.setItem("fooStr", html);
            localStorage.setItem("logo", 'http://loyalty.brain-behind.com/ThumbNail.ashx?p=' + result[0].Logo + '&Height=100&Width=300&cache=false');
            document.getElementById('ico').style.visibility = 'visible';

            if (result[0].Konto == "0") {
                document.getElementById('konto0').src = 'images/blank.gif';
                document.getElementById('konto0').style.width = '0px';
                document.getElementById('konto0').style.height = '0px';
                document.getElementById('konto0').style.paddingLeft = '0px';
                document.getElementById('konto0').style.paddingRight = '0px';
                document.getElementById('konto1').src = 'images/blank.gif';
                document.getElementById('konto1').style.width = '0px';
                document.getElementById('konto1').style.height = '0px';
                document.getElementById('konto1').style.paddingLeft = '0px';
                document.getElementById('konto1').style.paddingRight = '0px';
                document.getElementById('konto2').src = 'images/blank.gif';
                document.getElementById('konto2').style.width = '0px';
                document.getElementById('konto2').style.height = '0px';
                document.getElementById('konto2').style.paddingLeft = '0px';
                document.getElementById('konto2').style.paddingRight = '0px';
                document.getElementById('konto3').src = 'images/blank.gif';
                document.getElementById('konto3').style.width = '0px';
                document.getElementById('konto3').style.height = '0px';
                document.getElementById('konto3').style.paddingLeft = '0px';
                document.getElementById('konto3').style.paddingRight = '0px';
                document.getElementById('konto4').src = 'images/blank.gif';
                document.getElementById('konto4').style.width = '0px';
                document.getElementById('konto4').style.height = '0px';
                document.getElementById('konto4').style.paddingLeft = '0px';
                document.getElementById('konto4').style.paddingRight = '0px';
                document.getElementById('konto5').src = 'images/blank.gif';
                document.getElementById('konto5').style.width = '0px';
                document.getElementById('konto5').style.height = '0px';
                document.getElementById('konto5').style.paddingLeft = '0px';
                document.getElementById('konto5').style.paddingRight = '0px';
                document.getElementById('konto6').src = 'images/blank.gif';
                document.getElementById('konto6').style.width = '0px';
                document.getElementById('konto6').style.height = '0px';
                document.getElementById('konto6').style.paddingLeft = '0px';
                document.getElementById('konto6').style.paddingRight = '0px';
                document.getElementById('konto7').src = 'images/blank.gif';
                document.getElementById('konto7').style.width = '0px';
                document.getElementById('konto7').style.height = '0px';
                document.getElementById('konto7').style.paddingLeft = '0px';
                document.getElementById('konto7').style.paddingRight = '0px';
            }
            if (result[0].Partner == "0") {
                document.getElementById('partner0').src = 'images/blank.gif';
                document.getElementById('partner0').style.width = '0px';
                document.getElementById('partner0').style.height = '0px';
                document.getElementById('partner0').style.paddingLeft = '0px';
                document.getElementById('partner0').style.paddingRight = '0px';
                document.getElementById('partner1').src = 'images/blank.gif';
                document.getElementById('partner1').style.width = '0px';
                document.getElementById('partner1').style.height = '0px';
                document.getElementById('partner1').style.paddingLeft = '0px';
                document.getElementById('partner1').style.paddingRight = '0px';
                document.getElementById('partner2').src = 'images/blank.gif';
                document.getElementById('partner2').style.width = '0px';
                document.getElementById('partner2').style.height = '0px';
                document.getElementById('partner2').style.paddingLeft = '0px';
                document.getElementById('partner2').style.paddingRight = '0px';
                document.getElementById('partner3').src = 'images/blank.gif';
                document.getElementById('partner3').style.width = '0px';
                document.getElementById('partner3').style.height = '0px';
                document.getElementById('partner3').style.paddingLeft = '0px';
                document.getElementById('partner3').style.paddingRight = '0px';
                document.getElementById('partner4').src = 'images/blank.gif';
                document.getElementById('partner4').style.width = '0px';
                document.getElementById('partner4').style.height = '0px';
                document.getElementById('partner4').style.paddingLeft = '0px';
                document.getElementById('partner4').style.paddingRight = '0px';
                document.getElementById('partner5').src = 'images/blank.gif';
                document.getElementById('partner5').style.width = '0px';
                document.getElementById('partner5').style.height = '0px';
                document.getElementById('partner5').style.paddingLeft = '0px';
                document.getElementById('partner5').style.paddingRight = '0px';
                document.getElementById('partner6').src = 'images/blank.gif';
                document.getElementById('partner6').style.width = '0px';
                document.getElementById('partner6').style.height = '0px';
                document.getElementById('partner6').style.paddingLeft = '0px';
                document.getElementById('partner6').style.paddingRight = '0px';
                document.getElementById('partner7').src = 'images/blank.gif';
                document.getElementById('partner7').style.width = '0px';
                document.getElementById('partner7').style.height = '0px';
                document.getElementById('partner7').style.paddingLeft = '0px';
                document.getElementById('partner7').style.paddingRight = '0px';
            }

            if (result[0].Karte == "0") {
                document.getElementById('bonus0').src = 'images/blank.gif';
                document.getElementById('bonus0').style.width = '0px';
                document.getElementById('bonus0').style.height = '0px';
                document.getElementById('bonus0').style.paddingLeft = '0px';
                document.getElementById('bonus0').style.paddingRight = '0px';
                document.getElementById('bonus1').src = 'images/blank.gif';
                document.getElementById('bonus1').style.width = '0px';
                document.getElementById('bonus1').style.height = '0px';
                document.getElementById('bonus1').style.paddingLeft = '0px';
                document.getElementById('bonus1').style.paddingRight = '0px';
                document.getElementById('bonus2').src = 'images/blank.gif';
                document.getElementById('bonus2').style.width = '0px';
                document.getElementById('bonus2').style.height = '0px';
                document.getElementById('bonus2').style.paddingLeft = '0px';
                document.getElementById('bonus2').style.paddingRight = '0px';
                document.getElementById('bonus3').src = 'images/blank.gif';
                document.getElementById('bonus3').style.width = '0px';
                document.getElementById('bonus3').style.height = '0px';
                document.getElementById('bonus3').style.paddingLeft = '0px';
                document.getElementById('bonus3').style.paddingRight = '0px';
                document.getElementById('bonus4').src = 'images/blank.gif';
                document.getElementById('bonus4').style.width = '0px';
                document.getElementById('bonus4').style.height = '0px';
                document.getElementById('bonus4').style.paddingLeft = '0px';
                document.getElementById('bonus4').style.paddingRight = '0px';
                document.getElementById('bonus5').src = 'images/blank.gif';
                document.getElementById('bonus5').style.width = '0px';
                document.getElementById('bonus5').style.height = '0px';
                document.getElementById('bonus5').style.paddingLeft = '0px';
                document.getElementById('bonus5').style.paddingRight = '0px';
                document.getElementById('bonus6').src = 'images/blank.gif';
                document.getElementById('bonus6').style.width = '0px';
                document.getElementById('bonus6').style.height = '0px';
                document.getElementById('bonus6').style.paddingLeft = '0px';
                document.getElementById('bonus6').style.paddingRight = '0px';
                document.getElementById('bonus7').src = 'images/blank.gif';
                document.getElementById('bonus7').style.width = '0px';
                document.getElementById('bonus7').style.height = '0px';
                document.getElementById('bonus7').style.paddingLeft = '0px';
                document.getElementById('bonus7').style.paddingRight = '0px';
            }
            if (result[0].Aktionen == "0") {
                document.getElementById('aktionen0').src = 'images/blank.gif';
                document.getElementById('aktionen0').style.width = '0px';
                document.getElementById('aktionen0').style.height = '0px';
                document.getElementById('aktionen0').style.paddingLeft = '0px';
                document.getElementById('aktionen0').style.paddingRight = '0px';
                document.getElementById('aktionen1').src = 'images/blank.gif';
                document.getElementById('aktionen1').style.width = '0px';
                document.getElementById('aktionen1').style.height = '0px';
                document.getElementById('aktionen1').style.paddingLeft = '0px';
                document.getElementById('aktionen1').style.paddingRight = '0px';
                document.getElementById('aktionen2').src = 'images/blank.gif';
                document.getElementById('aktionen2').style.width = '0px';
                document.getElementById('aktionen2').style.height = '0px';
                document.getElementById('aktionen2').style.paddingLeft = '0px';
                document.getElementById('aktionen2').style.paddingRight = '0px';
                document.getElementById('aktionen3').src = 'images/blank.gif';
                document.getElementById('aktionen3').style.width = '0px';
                document.getElementById('aktionen3').style.height = '0px';
                document.getElementById('aktionen3').style.paddingLeft = '0px';
                document.getElementById('aktionen3').style.paddingRight = '0px';
                document.getElementById('aktionen4').src = 'images/blank.gif';
                document.getElementById('aktionen4').style.width = '0px';
                document.getElementById('aktionen4').style.height = '0px';
                document.getElementById('aktionen4').style.paddingLeft = '0px';
                document.getElementById('aktionen4').style.paddingRight = '0px';
                document.getElementById('aktionen5').src = 'images/blank.gif';
                document.getElementById('aktionen5').style.width = '0px';
                document.getElementById('aktionen5').style.height = '0px';
                document.getElementById('aktionen5').style.paddingLeft = '0px';
                document.getElementById('aktionen5').style.paddingRight = '0px';
                document.getElementById('aktionen6').src = 'images/blank.gif';
                document.getElementById('aktionen6').style.width = '0px';
                document.getElementById('aktionen6').style.height = '0px';
                document.getElementById('aktionen6').style.paddingLeft = '0px';
                document.getElementById('aktionen6').style.paddingRight = '0px';
                document.getElementById('aktionen7').src = 'images/blank.gif';
                document.getElementById('aktionen7').style.width = '0px';
                document.getElementById('aktionen7').style.height = '0px';
                document.getElementById('aktionen7').style.paddingLeft = '0px';
                document.getElementById('aktionen7').style.paddingRight = '0px';
            }
            if (result[0].Einkauf == "0") {
                document.getElementById('einkauf0').src = 'images/blank.gif';
                document.getElementById('einkauf0').style.width = '0px';
                document.getElementById('einkauf0').style.height = '0px';
                document.getElementById('einkauf0').style.paddingLeft = '0px';
                document.getElementById('einkauf0').style.paddingRight = '0px';
                document.getElementById('einkauf1').src = 'images/blank.gif';
                document.getElementById('einkauf1').style.width = '0px';
                document.getElementById('einkauf1').style.height = '0px';
                document.getElementById('einkauf1').style.paddingLeft = '0px';
                document.getElementById('einkauf1').style.paddingRight = '0px';
                document.getElementById('einkauf2').src = 'images/blank.gif';
                document.getElementById('einkauf2').style.width = '0px';
                document.getElementById('einkauf2').style.height = '0px';
                document.getElementById('einkauf2').style.paddingLeft = '0px';
                document.getElementById('einkauf2').style.paddingRight = '0px';
                document.getElementById('einkauf3').src = 'images/blank.gif';
                document.getElementById('einkauf3').style.width = '0px';
                document.getElementById('einkauf3').style.height = '0px';
                document.getElementById('einkauf3').style.paddingLeft = '0px';
                document.getElementById('einkauf3').style.paddingRight = '0px';
                document.getElementById('einkauf4').src = 'images/blank.gif';
                document.getElementById('einkauf4').style.width = '0px';
                document.getElementById('einkauf4').style.height = '0px';
                document.getElementById('einkauf4').style.paddingLeft = '0px';
                document.getElementById('einkauf4').style.paddingRight = '0px';
                document.getElementById('einkauf5').src = 'images/blank.gif';
                document.getElementById('einkauf5').style.width = '0px';
                document.getElementById('einkauf5').style.height = '0px';
                document.getElementById('einkauf5').style.paddingLeft = '0px';
                document.getElementById('einkauf5').style.paddingRight = '0px';
                document.getElementById('einkauf6').src = 'images/blank.gif';
                document.getElementById('einkauf6').style.width = '0px';
                document.getElementById('einkauf6').style.height = '0px';
                document.getElementById('einkauf6').style.paddingLeft = '0px';
                document.getElementById('einkauf6').style.paddingRight = '0px';
                document.getElementById('einkauf7').src = 'images/blank.gif';
                document.getElementById('einkauf7').style.width = '0px';
                document.getElementById('einkauf7').style.height = '0px';
                document.getElementById('einkauf7').style.paddingLeft = '0px';
                document.getElementById('einkauf7').style.paddingRight = '0px';
            } $.mobile.hidePageLoadingMsg();
        }





        $('#einkauf').live('pageshow', function (event, ui) {
            if (localStorage.getItem("KartenID") != "" && localStorage.getItem("KartenID") != null) {
                $.mobile.showPageLoadingMsg();
                return $.ajax({ url: "http://iphone.brain-behind.com/Service.ashx?methodName=GetTopVerkauf&jsonp=onEinkauf&KartenID=" + localStorage.getItem("KartenID"), dataType: "jsonp" });
            } else {

                $.mobile.changePage("#setup", "slide", true, true);
            }
        });

        function onEinkauf(result, methodName) {
            var heighto = $(document).height();
            var widtho = $(document).width();
            var height2 = Math.round(heighto - 100);
            var width2 = Math.round(widtho - (widtho * 20 / 100));

            var html = '<li data-role=\"list-divider\">Kartennutzung</li>';
            html = html + '<li >';
            for (var i = 0; i < result.length; i++) {

                html = html + '		<li>';

                html = html + '<div>	<p style=\"font-size:9px;padding-top:5px;\">' + result[i].Datum + '</p>';
                html = html + '	<p style=\"width:' + width2 + 'px;;\"><strong>' + result[i].Abzug + '</strong></p></div>';
                if (result[i].Punkte != "" && result[i].Punkte != "0") {
                    html = html + '<p class=\"ui-li-aside\" style=\"font-size:12px;;\">' + result[i].Punkte + ' Punkte</p>';
                }
                else {
                    html = html + '<p class=\"ui-li-aside\" style=\"font-size:12px;\">€ ' + result[i].Betrag + '</p>';
                }


                html = html + '	</li>';


            }
            html = html + '</li>';
            $('#det3').html('');
            $('#det3').append(html);
            $('#det3').listview();
            $('#det3').listview('refresh');
            $.mobile.hidePageLoadingMsg();
        }

        $('#konto').live('pageshow', function (event, ui) {

            if (localStorage.getItem("KartenID") != "" && localStorage.getItem("KartenID") != null) {
                $.mobile.showPageLoadingMsg();
                return $.ajax({ url: "http://iphone.brain-behind.com/Service.ashx?methodName=GetGuthaben&jsonp=onKonto&KartenID=" + localStorage.getItem("KartenID") + "&SystemID=" + localStorage.getItem("SystemID"), dataType: "jsonp" });
                $.mobile.hidePageLoadingMsg();
            } else {

                $.mobile.changePage("#setup", "slide", true, true);
            }

        });

        function onKonto(result, methodName) {
            var heighto = $(document).height();
            var widtho = $(document).width();
            var height2 = Math.round(heighto - 100);
            var width2 = Math.round(widtho - (widtho * 40 / 100));
            var width3 = Math.round(widtho - (widtho * 75 / 100));
            var html = '';
            html = html + '<li data-role=\"list-divider\">Aktuelles Guthaben</li>';


            html = html + '<li ><div  style=\"width:' + width2 + 'px;font-size:13px;\">' + result[0].Abzug + '</div>';
            if (result[0].Punkte != "" && result[0].Punkte != "0") {
                html = html + '<div class=\"ui-li-aside\" style=\"width:' + width3 + 'px;\">' + result[0].Punkte + ' Punkte</div>';
            }
            else {
                html = html + '<div class=\"ui-li-aside \" style=\"width:' + width3 + 'px;\">€ ' + result[0].Betrag + '</div>';
            }


            html = html + '</li>';
            html = html + '<li data-role=\"list-divider\">Nächste Ausschüttung</li><li><div style=\"width:' + width2 + 'px;font-size:13px;\">' + result[1].Abzug + '</div>';
            if (result[1].Punkte != "" && result[1].Punkte != "0") {
                html = html + '<div class=\"ui-li-aside\" style=\"width:' + width3 + 'px;\">' + result[1].Punkte + ' Punkte</div>';
            }
            else {
                html = html + '<div class=\"ui-li-aside\" style=\"width:' + width3 + 'px;\"><strong>€ ' + result[1].Betrag + '</strong></div>';
            }
            html = html + '</li>';
            html = html + '<li data-role=\"list-divider\">Ausschüttungen</li>';
            var ii = 0;
            var iii = 0;
            var iiii = 0;
            for (var i = 2; i < result.length; i++) {
                if (result[i].Art == "98") {
                    html = html + '<li><div style=\"font-size:10px;\">' + result[i].Datum + '</div><div  style=\"width:' + width2 + 'px;font-size:12px;font-weight:normal;\">' + result[i].Abzug + '</div>';
                    if (result[i].Punkte != "" && result[i].Punkte != "0") {
                        html = html + '<div class=\"ui-li-aside\" style=\"width:' + width3 + 'px;\">' + result[i].Punkte + ' Punkte</div>';
                    }
                    else {
                        html = html + '<div class=\"ui-li-aside\" style=\"width:' + width3 + 'px;\">€ ' + result[i].Betrag + '</div>';
                    }
                    html = html + '</li>';
                    iii = 1;
                }
                else {
                    if (iii == 0) {
                        html = html + '<li><p><strong>Keine Ausschüttungen</strong></p></li>';
                        iii = 1;
                    }


                    if (ii == 0) {
                        html = html + '<li data-role=\"list-divider\">Gutscheinzahlungen</li>';
                        ii = 1;
                    }
                    html = html + '<li><div style=\"font-size:10px;\">' + result[i].Datum + '</div><div style=\"width:' + width2 + 'px\">' + result[i].Abzug + '</div>';
                    if (result[i].Punkte != "" && result[i].Punkte != "0") {
                        html = html + '<div class=\"ui-li-aside\" style=\"width:' + width3 + 'px;\">' + result[i].Punkte + ' Punkte</div>';
                    }
                    else {
                        html = html + '<div class=\"ui-li-aside\" style=\"width:' + width3 + 'px;\">€ ' + result[i].Betrag + '</div>';
                    }
                    html = html + '</li>';
                    iiii = 1;
                }

            }
            if (iiii == 0) {
                html = html + '<li data-role=\"list-divider\">Guthabenszahlungen</li>';
                html = html + '<li><div><strong>Keine Guthabenszahlungen</strong></div></li>';
                iiii = 1;
            }
            $('#det4').html('');
            $('#det4').append(html);
            $('#det4').listview();
            $('#det4').listview('refresh');
            $.mobile.hidePageLoadingMsg();
        }



        $('#totalmap').live('pageshow', function (event, ui) {

            date2 = new Date(localStorage.getItem("partnerMapDate"));
            myDate = new Date();
            var check = false;
            if (date2 <= myDate) {
                check = true;
            }
            var html = localStorage.getItem("partnerMapStr");
            if (html == null) {
                check = true;
            }
            if (check == true) {
                var lattt=0;
               if(localStorage.getItem("lati") != null)
               {
               lattt=localStorage.getItem("lati");
               }
               var lonoo=0;
               if(localStorage.getItem("longi") != null)
               {
               lonoo=localStorage.getItem("longi");
               }
                
                if (localStorage.getItem("KartenID") != "" && localStorage.getItem("KartenID") != null) {
                    myDate.setDate(myDate.getDate() + 10);
                    localStorage.setItem("partnerMapDate", myDate);
                    $.mobile.showPageLoadingMsg();
                    return $.ajax({ url: "http://iphone.brain-behind.com/Service.ashx?methodName=topCustomers&jsonp=onPartnerTotal&lat=" + lattt + "&lng=" + lonoo + "&SystemID=" + localStorage.getItem("SystemID"), dataType: "jsonp" });
                    $.mobile.hidePageLoadingMsg();

                } else {

                    $.mobile.changePage("#setup", "slide", true, true);
                }
            } else {
                $('#det2').html('');
                $('#det2').append(html);
                $('#det2').listview();
                $('#det2').listview('refresh');
                $.mobile.hidePageLoadingMsg();
            }
            //codeAddress(addr, firm);

        });

        function onPartnerTotal(result, methodName) {
            //alert(result);
            initialize2(result[0].Lat, result[0].Long);
            result = result.sort(result.Dist);

            var lat = localStorage.getItem("lati");
            var long = localStorage.getItem("longi");
            if (lat != "0") {
                var marker2 = new google.maps.Marker({
                    map: mapTotal,
                    title: 'Ihre Position',
                    position: new google.maps.LatLng(lat, long)
                });
            }

            for (var i = 0; i < result.length; i++) {

                var marker = createMarker('<p><img align=left style=\"max-height:40px;\" ONERROR=\"this.src=http://loyalty.brain-behind.com/images/blank.gif\" src=\"http://loyalty.brain-behind.com/ThumbNail.ashx?p=' + result[i].Logo + '&Height=50&Width=150&cache=false\"  border=\"0\" ></p><p style=\"font-size:10px;\"><strong>' + result[i].Firma + '</strong></p><p style=\"font-size:10px;\">' + result[i].Strasse + ' ' + result[i].Plz + ' ' + result[i].Ort + '<br/>' + result[i].Telefon + '</p><p style=\"font-size:10px;\">' + result[i].Email + '<br>' + result[i].Web + '</p><p style=\"font-size:10px;background-color:#E2E2E2;padding-top:3px;padding-bottom:3px;\">Bei jedem Einkauf erhalten Sie<br/> <strong>' + result[i].Bonus + ' %</strong> Rabatt.</p><p style=\"font-size:10px;text-align:right;\"><a href=\"javascript:void(0);\" onclick=\"return redir2(\'' + result[i].ID + '\');\">Mehr Info</a></p>', new google.maps.LatLng(result[i].Lat, result[i].Long), result[i].Branche + "_" + result[i].Bonus.substring(0, 1), result[i].Branche);

            }
            //localStorage.setItem("partnerMapStr", myDate);
            $.mobile.hidePageLoadingMsg();
        }

        function createMarker(name, latlng, icon, beschreibung) {
            var icon = new google.maps.MarkerImage("images/" + icon + ".png");
            var marker = new google.maps.Marker({ position: latlng, icon: icon, title: beschreibung, map: mapTotal });
            google.maps.event.addListener(marker, "click", function () {
                if (infowindow) infowindow.close();
                infowindow = new google.maps.InfoWindow({ content: name });
                infowindow.open(mapTotal, marker);
            });
            return marker;
        }


        function savePage() {
            $.mobile.showPageLoadingMsg();

            localStorage.setItem("KartenID", $("#kartenID").val());
            localStorage.setItem("Passwort", $("#password").val());
            return $.ajax({ url: "http://iphone.brain-behind.com/Service.ashx?methodName=getSystem&fd=1&jsonp=ongetSystem&KartenID=" + $("#kartenID").val() + "&Passwort=" + $("#password").val(), dataType: "jsonp" });
        }

        function ongetSystem(result, methodName) {
            SystemID = result[0];
            if (isNaN(SystemID)) {
                $('#errorP').html(SystemID);
                $.mobile.hidePageLoadingMsg();
                localStorage.removeItem("KartenID");
                localStorage.removeItem("Passwort");
                localStorage.removeItem("SystemID");
                localStorage.clear();
            }
            else {
                localStorage.setItem("SystemID", SystemID);
                $.mobile.hidePageLoadingMsg();
                $('#errorP').html("Speichern erfolgreich");
            }
        }
        function redirAktion(ID) {
            MailingID = ID;
            $.mobile.changePage("#detailAktion", "slide", false, false);
        }
        function redir(ID) {

            FirmaID = ID;

        }
        function redir2(ID) {

            FirmaID = ID;
            $.mobile.changePage("#detail", "slide", false, false);
        }
        $('#aktionen').live('pageshow', function (event, ui) {

            date2 = new Date(localStorage.getItem("aktionenDate"));
            myDate = new Date();
            var check = true;
            if (date2 <= myDate) {
                check = true;
            }
            var html = localStorage.getItem("aktionenStr");

            if (html == null) {
                check = true;
            }
            check = true;
            if (check == true) {
                if (localStorage.getItem("KartenID") != "" && localStorage.getItem("KartenID") != null) {
                    myDate.setDate(myDate.getDate() + 10);
                    localStorage.setItem("aktionenDate", myDate);
                    $.mobile.showPageLoadingMsg();
                    return $.ajax({ url: "http://iphone.brain-behind.com/Service.ashx?methodName=getOffers&jsonp=onOffers&lat=" + localStorage.getItem("lati") + "&lng=" + localStorage.getItem("longi") + "&KartenID=" + localStorage.getItem("KartenID") + "&SystemID=" + localStorage.getItem("SystemID"), dataType: "jsonp" });
                    $.mobile.hidePageLoadingMsg();
                } else {

                    $.mobile.changePage("#setup", "slide", true, true);
                }
            } else {
                $('#aktionenList').html('');
                $('#aktionenList').append(html);
                $('#aktionenList').listview();
                $('#aktionenList').listview('refresh');
                $.mobile.hidePageLoadingMsg();
            }
        });
        function onOffers(result, methodName) {
            var heighto = $(document).height();
            var widtho = $(document).width();
            var height2 = Math.round(heighto - 100);
            var width2 = Math.round(widtho - (widtho * 38 / 100));

            result = result.sort(result.Dist);
            var html = '<li data-role=\"list-divider\">Aktuelle Angebote</li>';
            for (var i = 0; i < result.length; i++) {

                html = html + '<li><a href=\"#detailAktion\" onclick=\"return redirAktion(\'' + result[i].MailingID + '\');\">';
                html = html + '<li class=\"ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb\" data-theme=\"c\" data-iconpos=\"right\" data-icon=\"arrow-r\" data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperEls=\"div\">';
                html = html + '<div class=\"ui-btn-inner ui-li\">';
                html = html + '<div class=\"ui-btn-text\">';
                html = html + '<a class=\"ui-link-inherit\" href=\"#detailAktion\" onclick=\"return redirAktion(\'' + result[i].MailingID + '\');\">';
                if (result[i].Logo != '') {
                    html = html + '<img class=\"ui-li-thumb\" align=left ONERROR=\"this.src=http://loyalty.brain-behind.com/images/blank.gif\" src=\"http://loyalty.brain-behind.com/ThumbNail.ashx?p=' + result[i].Logo + '&Width=120&Height=100&cache=false\"  border=\"0\" style=\"padding-bottom:30px;\">';
                    if (result[i].Dist < 1000) {
                        html = html + '<div class=\"ui-li-count\"  style=\"position:relative;left:-85px;top:50px; width:50px;\">' + result[i].Dist + ' km</div>';
                    }
                }
                html = html + '<div style=\"width:' + width2 + 'px;position:relative; left:-20px; white-space:pre-wrap;\"><p><i>' + result[i].Firma + '</i></p>';
                html = html + '<h3 class=\"ui-li-heading\" style=\" white-space:pre-wrap;\">' + result[i].Betreff + '</h3>';
                html = html + '<p style=\"white-space:pre-wrap;\">' + result[i].Content + '</p></div>';



                html = html + '</a>';


                html = html + '</div>';
                html = html + '</div>';
                html = html + '</li>';

                html = html + '</a></li>';
            }
            $('#aktionenList').html('');
            $('#aktionenList').append(html);
            localStorage.setItem("aktionenStr", html);
            $('#aktionenList').listview();
            $('#aktionenList').listview('refresh');
            $.mobile.hidePageLoadingMsg();
        }

        $('#detailAktion').live('pageshow', function (event, ui) {

            $.mobile.showPageLoadingMsg();

            return $.ajax({ url: "http://iphone.brain-behind.com/Service.ashx?methodName=getOffersDetail&jsonp=onOffersDetail&lat=" + localStorage.getItem("lati") + "&lng=" + localStorage.getItem("longi") + "&KartenID=" + localStorage.getItem("KartenID") + "&MailingID=" + MailingID + "&SystemID=" + localStorage.getItem("SystemID"), dataType: "jsonp" });
        });

        function onOffersDetail(result, methodName) {

            var heighto = $(document).height();
            var widtho = $(document).width();
            var height2 = Math.round(heighto - 100);
            var width2 = Math.round(widtho - (widtho * 8 / 100));
            var width3 = Math.round(widtho - (widtho * 35 / 100));
            var html = '<li data-role=\"list-divider\">Infos zum Angebot</li>';
            html = html + '<li class=\"ui-btn ui-btn-up-c ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-thumb\" data-theme=\"c\" data-iconpos=\"right\" data-icon=\"arrow-r\" data-corners=\"false\" data-shadow=\"false\" data-iconshadow=\"true\" data-wrapperEls=\"div\">';
            html = html + '<div class=\"ui-btn-inner ui-li\">';
            html = html + '<div class=\"ui-btn-text\">';
            html = html + '<div style=\"width:' + width2 + 'px; overflow:visible;white-space:pre-wrap;\"><a class=\"ui-link-inherit\" rel="prettyPhoto" href=\"http://loyalty.brain-behind.com/ThumbNail.ashx?p=' + result[0].Attachment + '&Width=' + width2 + '&Height=' + height2 + '&cache=false\">';
            if (result[0].Attachment != '') {
                html = html + '<img  align=\"left\" ONERROR=\"this.src=http://loyalty.brain-behind.com/images/blank.gif\" src=\"http://loyalty.brain-behind.com/ThumbNail.ashx?p=' + result[0].Attachment + '&Width=100&Height=200&cache=false\"  border=\"0\"  style=\"padding-bottom:30px;\">';

            }


            html = html + '<div style=\"width:' + width3 + 'px;position:relative; left:-40px; white-space:pre-wrap;\"><h3 class=\"ui-li-heading\">' + result[0].Betreff + '</h3>';
            html = html + '<p class=\"ui-li-desc\" \><span id=\"cl\" class=\"cl\" style=\"white-space:pre-wrap;width:' + width2 + 'px;\">' + result[0].Content + '</span></p></div>';
            html = html + '</a></div>';
            html = html + '</div>';
            html = html + '</div>';
            html = html + '</li>';



            if (result[0].Barcode != '') {
                html = html + '<li data-role=\"list-divider\">Aktionsgutschein</li>';
                //  html = html +'<li ><div style=\"width:'+width2+'px;\"><a href="http://loyalty.brain-behind.com/ThumbNail.ashx?p='+result[0].Barcode+'&Width='+width2+'&Height='+height2+'&cache=false" rel="prettyPhoto" title=""><img src="http://loyalty.brain-behind.com/ThumbNail.ashx?p='+result[0].Barcode+'&Width=300&Height=200&cache=false"  alt="" align=center style=\"margin-right: auto; margin-left: auto; text-align: center;\"/></a></div></li>';
                html = html + '<li ><div style=\"width:' + width2 + 'px;\"><img src="http://loyalty.brain-behind.com/ThumbNail.ashx?p=' + result[0].Barcode + '&Width=260&Height=200&cache=false"  alt="" align=center style=\"margin-right: auto; margin-left: auto; text-align: center;\"/></div></li>';
            }


            html = html + '<li data-role=\"list-divider\">Partner</li>';
            var addr = result[0].Strasse + ', ' + result[0].Plz + ' ' + result[0].Ort;
            var firm = result[0].Firma;

            html = html + '<li style=\"padding-bottom:20px;\"><img align=left ONERROR=\"this.src=http://loyalty.brain-behind.com/images/blank.gif\" src=\"http://loyalty.brain-behind.com/ThumbNail.ashx?p=' + result[0].Logo + '&Width=100&Height=80&cache=false\"  border=\"0\" style=\"padding-bottom:30px;\"><p><h3><div  style=\"position:absolute;width:200px;font-size:14px;font-weight:bold;\">' + result[0].Firma + '</div></h3></p><p><div  style=\"position:absolute;min-height:150px;width:200px;top:35px;font-size:12px;font-weight:normal;padding-bottom:30px;margin-bottom:60px;\">' + result[0].Strasse + ', ' + result[0].Plz + ' ' + result[0].Ort + '<br>' + result[0].Telefon + '<br>' + result[0].Email + ' ' + result[0].Web + '<br><br></div></p></li>';




            $('#AktionList').html('');
            $('#AktionList').append(html);

            $('#AktionList').listview();
            $('#AktionList').listview('refresh');
            $("a[rel^='prettyPhoto']").prettyPhoto({ social_tools: '' });

            /*
            document.getElementById('mapList').style.visibility='visible';
            initialize2(-34.397, 190.644);
			
            codeAddress(addr, firm);
            */
            //loader();


            $.mobile.hidePageLoadingMsg();
        }


        $('#partner').live('pageshow', function (event, ui) {

            date2 = new Date(localStorage.getItem("partnerDate"));
            myDate = new Date();
            var check = true;
            if (date2 <= myDate) {
                check = true;
            }
            var html = localStorage.getItem("partnerStr");

            if (html == null) {
                check = true;
            }
            if (check == true) {
               var lattt=0;
               if(localStorage.getItem("lati") != null)
               {
               lattt=localStorage.getItem("lati");
               }
               var lonoo=0;
               if(localStorage.getItem("longi") != null)
               {
               lonoo=localStorage.getItem("longi");
               }
               
                if (localStorage.getItem("KartenID") != "" && localStorage.getItem("KartenID") != null) {
                    myDate.setDate(myDate.getDate() + 10);
                    localStorage.setItem("partnerDate", myDate);
                    $.mobile.showPageLoadingMsg();
                    return $.ajax({ url: "http://iphone.brain-behind.com/Service.ashx?methodName=topCustomers&jsonp=onPartner&lat=" + lattt + "&lng=" + lonoo + "&SystemID=" + localStorage.getItem("SystemID"), dataType: "jsonp" });
                    $.mobile.hidePageLoadingMsg();
                } else {

                    $.mobile.changePage("#setup", "slide", true, true);
                }


            } else {
                $('#det2').html('');
                $('#det2').append(html);
                $('#det2').listview();
                $('#det2').listview('refresh');
                $.mobile.hidePageLoadingMsg();
            }
        });

        $('#detail').live('pageshow', function (event, ui) {

            $.mobile.showPageLoadingMsg();
            return $.ajax({ url: "http://iphone.brain-behind.com/Service.ashx?methodName=getFirma&jsonp=onFirmaDetail&FirmaID=" + FirmaID, dataType: "jsonp" });
        });

        function getLocation() {
            var fail = function (error) {
                if (navigator.notification.activityStop) navigator.notification.activityStop(); // only call this if the function exists as it is iPhone only.
                alert("Failed to get GPS location");
            };

            if (navigator.geolocation) {
                if (navigator.notification.activityStart) navigator.notification.activityStart(); // only call this if the function exists as it is iPhone only.
                // Success callback function that will grab coordinate information and display it in an alert.
                var suc = function (p) {
                    if (navigator.notification.activityStop) navigator.notification.activityStop(); // only call this if the function exists as it is iPhone only.
                    //alert(p.coords.latitude);
                    localStorage.setItem("lati", p.coords.latitude);
                    localStorage.setItem("longi", p.coords.longitude);
                };

                // Now make the PhoneGap JavaScript API call, passing in success and error callbacks as parameters, respectively.
                navigator.geolocation.getCurrentPosition(suc, fail);
            } else {
                fail();
            }
        }
        function route(orig, dest) {
            var request = {
                origin: orig,
                destination: dest,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService = new google.maps.DirectionsService();
            directionsRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: true });
            directionsService.route(request, function (result, status) {

                if (status == google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setMap(map);
                    directionsRenderer.setDirections(result);
                }
            });
        }


        function onFirmaDetail(result, methodName) {
            var html = '<li data-role=\"list-divider\">Partner</li>';
            var addr = result[0].Strasse + ', ' + result[0].Plz + ' ' + result[0].Ort;
            var firm = result[0].Firma;

            html = html + '<li style=\"padding-bottom:20px;\"><img align=left ONERROR=\"this.src=http://loyalty.brain-behind.com/images/blank.gif\" src=\"http://loyalty.brain-behind.com/ThumbNail.ashx?p=' + result[0].Logo + '&Width=100&Height=80&cache=false\"  border=\"0\" style=\"padding-bottom:30px;\"><p><h3><div  style=\"position:absolute;width:200px;font-size:14px;font-weight:bold;\">' + result[0].Firma + '</div></h3></p><p><div  style=\"position:absolute;min-height:150px;width:200px;top:35px;font-size:12px;font-weight:normal;padding-bottom:30px;margin-bottom:60px;\">' + result[0].Strasse + ', ' + result[0].Plz + ' ' + result[0].Ort + '<br>' + result[0].Telefon + '<br>' + result[0].Email + ' ' + result[0].Web + '<br><br></div></p></li>';
            if (result[0].Content != '') {
                html = html + '<li data-role=\"list-divider\">Details</li>';
                html = html + '<li >' + result[0].Content + '</li>';
            }
            if (result[0].Bonus != '') {
                html = html + '<li data-role=\"list-divider\">Vorteile</li>';
                html = html + '<li >' + result[0].Bonus + '</li>';
            }

            $('#det7').html('');
            $('#det7').append(html);

            $('#det7').listview();
            $('#det7').listview('refresh');
            document.getElementById('mapList').style.visibility = 'visible';
            initialize2(-34.397, 190.644);

            codeAddress(addr, firm);

            //loader();
            $.mobile.hidePageLoadingMsg();
        }
        function loader() {

            var state = document.readyState;

            if (state == 'loaded' || state == 'complete') {
                //alert('2f');            
                //document.addEventListener('onDeviceReady',run,false);          
                //   run();
            }
            else {
                if (navigator.userAgent.indexOf('Browzr') > -1) {

                    //alert('1');
                    setTimeout(run, 250);
                }
                else {
                    //alert('2');             
                    document.addEventListener('onDeviceReady', run, false);
                }
            }
        }

        function run() {
            var win = function (position) {                          // Grab coordinates object from the Position object passed into success callback.
                var coords = position.coords;
                localStorage.setItem("lati", coords.latitude);
                localStorage.setItem("longi", coords.longitude);

            };
            var fail = function (e) {
                localStorage.setItem("lati", "0");
                localStorage.setItem("longi", "0");
                //alert('Can\'t retrieve position.\nError: ' + e);
            };
            navigator.geolocation.getCurrentPosition(win, fail);
            //checkConnection();  
        } 

 
 -->
    

        // Wait for PhoneGap to load    //   
        function onLoad() {
            checkConnection();

            //loadScript();

            //loader();

            //document.addEventListener("deviceready", onDeviceReady, false);   
        }
        document.addEventListener("deviceready", onDeviceReady, false);



        // PhoneGap is loaded and it is now safe to make calls PhoneGap methods    //  
        function onDeviceReady() {

            // This will initialize the plugin
            // and show two dialog boxes: one with the text "Olá World"
            // and other with the text "Good morning John!"
            jQuery.i18n.properties({
                                   name:'Messages',
                                   path:'bundle/',
                                   mode:'both',
                                   language:'en',
                                   callback: function() {
                                   // We specified mode: 'both' so translated values will be
                                   // available as JS vars/functions and as a map
                                   
                                   // Accessing a simple value through the map
                                   jQuery.i18n.prop('msg_hello');
                                   // Accessing a value with placeholders through the map
                                   jQuery.i18n.prop('msg_complex', 'John');

                                   }
                                   });

            
            alert(msg_hello);
            checkConnection();
            loadScript();
            run();
        }

        function checkConnection() {

            var networkState = navigator.network.connection.type;
            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.NONE] = 'No network connection';

            if (states[networkState] != 'No network connection' && states[networkState] != 'Unknown connection') {

                SystemID = localStorage.getItem("SystemID");
                if (SystemID == "" || SystemID == null) {
                    $.mobile.hidePageLoadingMsg();
                    var html = '<li data-role=\"list-divider\">Kartendaten eingeben</li>';
                    html = html + '<li>Bitte Ihre Kartendaten eingeben</li>';
                    html = html + '<li><a href=\"#setup\">Zum Setup</a></li>';
                    $('#Kontakt').html('');
                    $('#Kontakt').append(html);
                    $('#Kontakt').listview();
                    $('#Kontakt').listview('refresh');
                    $.mobile.hidePageLoadingMsg();

                }
                else {
                    date2 = new Date(localStorage.getItem("fooDate"));
                    myDate = new Date();
                    var check = false;
                    if (date2 <= myDate) {
                        check = true;
                    }
                    var html = localStorage.getItem("fooStr");

                    if (html == null) {

                        check = true;
                    }

                    if (check == true) {
                        $.mobile.showPageLoadingMsg();
                        return $.ajax({ url: "http://iphone.brain-behind.com/Service.ashx?methodName=getStart&jsonp=onStart&SystemID=" + localStorage.getItem("SystemID"), dataType: "jsonp" });
                    }
                    else {
                        $('.changesrc').each(function () {

                            $(this).attr('src', localStorage.getItem("logo"));
                        });
                        $('#Kontakt').html('');
                        $('#Kontakt').append(html);
                        $('#Kontakt').listview();
                        $('#Kontakt').listview('refresh');
                    }
                }
            }
            else {
                var html = '<li data-role=\"list-divider\">Keine Datenverbindung</li>';
                html = html + '<li>Um Ihren aktuellen Guthabensstand abzufragen, müssen Sie eine aktive Datenverbindung haben.<br></li>';

                html = html + '<li><a href=\"javascript:void(0);\" onclick=\"onDeviceReady()\">Erneut versuchen</a></li>';
                $('#Kontakt').html('');
                $('#Kontakt').append(html);
                $('#Kontakt').listview();
                $('#Kontakt').listview('refresh');
                $.mobile.hidePageLoadingMsg();
                document.getElementById('ico').style.visibility = 'hidden';
            }
            //}
        }
        
    

function writeHTMLasJS(){

    
    
    var langi = navigator.language;

if(langi.indexOf('de')>-1)
{
document.write("                <a href=\"#foo\" id=\"fooID\" class=\"frontlink\">");
document.write("                    <img src=\"images\/home.png\" style=\"padding-left: 5px; padding-right: 5px; padding-top: 5px;");
document.write("                        padding-bottom: 5px;\" border=\"0\" \/><\/a><a href=\"#konto\" id=\"kontoID\" class=\"frontlink\"><img");
document.write("                            src=\"images\/konto.png\" id=\"konto0\" style=\"padding-left: 5px; padding-right: 5px;");
document.write("                            padding-top: 5px; padding-bottom: 5px;\" border=\"0\" \/><\/a><a href=\"#partner\" id=\"partnerID\"");
document.write("                                class=\"frontlink\"><img src=\"images\/partner.png\" id=\"partner0\" style=\"padding-left: 5px;");
document.write("                                    padding-right: 5px; padding-top: 5px; padding-bottom: 5px;\" border=\"0\" \/><\/a><a href=\"#totalmap\"");
document.write("                                        id=\"totalmapID\" class=\"frontlink\"><img src=\"images\/bonus.png\" id=\"bonus0\" border=\"0\"");
document.write("                                            style=\"padding-left: 5px; padding-right: 5px; padding-top: 5px; padding-bottom: 5px;\" \/><\/a><a");
document.write("                                                href=\"#aktionen\" id=\"aktionenID\" class=\"frontlink\"><img src=\"images\/aktionen.png\"");
document.write("                                                    id=\"aktionen0\" border=\"0\" style=\"padding-left: 5px; padding-right: 5px; padding-top: 5px;");
document.write("                                                    padding-bottom: 5px;\" \/><\/a><a href=\"#einkauf\" id=\"einkaufID\" class=\"frontlink\"><img");
document.write("                                                        src=\"images\/einkauf.png\" id=\"einkauf0\" border=\"0\" style=\"padding-left: 5px; padding-right: 5px;");
document.write("                                                        padding-top: 5px; padding-bottom: 5px;\" \/><\/a><a href=\"#setup\"><img src=\"images\/setup.png\"");
document.write("                                                            border=\"0\" style=\"padding-left: 5px; padding-right: 5px; padding-top: 5px; padding-bottom: 5px;\" \/><\/a>");
} else{
	document.write("                <a href=\"#foo\" id=\"fooID\" class=\"frontlink\">");
document.write("                    <img src=\"images\/home.png\" style=\"padding-left: 5px; padding-right: 5px; padding-top: 5px;");
document.write("                        padding-bottom: 5px;\" border=\"0\" \/><\/a><a href=\"#konto\" id=\"kontoID\" class=\"frontlink\"><img");
document.write("                            src=\"images\/konto_eng.png\" id=\"konto0\" style=\"padding-left: 5px; padding-right: 5px;");
document.write("                            padding-top: 5px; padding-bottom: 5px;\" border=\"0\" \/><\/a><a href=\"#partner\" id=\"partnerID\"");
document.write("                                class=\"frontlink\"><img src=\"images\/partner_eng.png\" id=\"partner0\" style=\"padding-left: 5px;");
document.write("                                    padding-right: 5px; padding-top: 5px; padding-bottom: 5px;\" border=\"0\" \/><\/a><a href=\"#totalmap\"");
document.write("                                        id=\"totalmapID\" class=\"frontlink\"><img src=\"images\/bonus_eng.png\" id=\"bonus0\" border=\"0\"");
document.write("                                            style=\"padding-left: 5px; padding-right: 5px; padding-top: 5px; padding-bottom: 5px;\" \/><\/a><a");
document.write("                                                href=\"#aktionen\" id=\"aktionenID\" class=\"frontlink\"><img src=\"images\/aktionen.png\"");
document.write("                                                    id=\"aktionen0\" border=\"0\" style=\"padding-left: 5px; padding-right: 5px; padding-top: 5px;");
document.write("                                                    padding-bottom: 5px;\" \/><\/a><a href=\"#einkauf\" id=\"einkaufID\" class=\"frontlink\"><img");
document.write("                                                        src=\"images\/einkauf_eng.png\" id=\"einkauf0\" border=\"0\" style=\"padding-left: 5px; padding-right: 5px;");
document.write("                                                        padding-top: 5px; padding-bottom: 5px;\" \/><\/a><a href=\"#setup\"><img src=\"images\/setup.png\"");
document.write("                                                            border=\"0\" style=\"padding-left: 5px; padding-right: 5px; padding-top: 5px; padding-bottom: 5px;\" \/><\/a>");
	
}

}


writeHTMLasJS();


writeHTMLasJS();


writeHTMLasJS();


writeHTMLasJS();


writeHTMLasJS();


writeHTMLasJS();


writeHTMLasJS();


writeHTMLasJS();


writeHTMLasJS();


eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(j(f){f.a=j(a,b,c){f[a]=f[a]||{};f[a][b]=j(a,b){17.Q&&9.1E(a,b)};f[a][b].T=c;f.1H[b]=j(c){q e=9,i=U.T.1t.1y(17,1),g="20"===1Z c;m(g&&"22"===c.21(0,1))k e;9.1Y(j(){q h=f.Y(9,b)?f.Y(9,b):f.Y(9,b,t f[a][b](c,9));g&&(e=h[c].1x(h,i))});k e}};f.a("1V","1z",{s:{A:t n.o.13(0,0),Z:5},1U:j(a,b){m(b)9.1s(a,b);u k 9.s[a]},1E:j(a,b){9.w=f(b);C.16(9.s,a);9.s.A=9.L(9.s.A);9.1e();9.1C&&9.1C()},1e:j(){q a=9.J={w:9.w,p:t n.o.12(9.w[0],9.s),X:[],1I:[],1v:[]};9.N(9.s.1X,a.p);1W(j(){a.w.29("28",a.p)},1)},1s:j(a,b){q c=9.l("p");9.s[a]=b;c.2b(C.16(9.s,{A:c.2a(),27:c.24(),Z:c.23()}))},1b:j(a){q b=9.l("p"),c=9.l("V",[]);c.G(9.L(a));1<c.Q?b.11({V:n.o.26.25(c)}):b.11({Z:9.l("p").1T().1L,A:c[0]})},1M:j(a,b){q c=9.l("p"),d=f(9.19(a)),e={1Q:"1R","z-1O":10};m(3>b)e.1i=0;u m(2<b&&6>b)e.1i=(c.1P()-d.1K())/2;u m(5<b)e.1N=0;m(0==b||3==b||6==b)e.1u=0;u m(1==b||4==b||7==b)e.1u=(c.1S()-d.1J())/2;u m(2==b||5==b||8==b)e.2u=0;d.2w(e);9.w[0].2x(d[0]);k d},1G:j(a,b,c){q d=9.l("p"),c=c||n.o.R,a=9.O?9.O("1G",a):a;a.K=9.L(a.K);c=t c(a.K,a);E(y M a)c[y]=a[y];q e=9.l("X",[]);c.1g()?e[c.1g()]=c:e.G(c);a.V&&9.1b(c.D());d.x.G(c);9.N(b,d,c);k f(c)},2y:j(a,b,c){a=t n.o.I(b.D(),a);9.l("p").x.G(a);9.N(c,a);k f(a)},1n:j(a,b){a.1k=a.1k||t n.o.2A(0,15);a.1j=a.1j||2z;q a=9.O?9.O("1n",a):a,b=9.19(b),c;c=b?b r n.o.R?b.D():b.2i.D():a.K;9.l("H")&&-1<9.l("p").x.1D(9.l("H"))&&9.l("p").x.1o(9.l("H"));m(a.B)m(a.B r 1w)a.B=\'<1l 2k="I">\'+a.B.2j+"</1l>";u m(F==a.B.2v(2d(/<(?:"[^"]*"[\'"]*|\'[^\']*\'[\'"]*|[^\'">])+>/)))a.2c=a.B;9.P("H",t n.o.I(c,a));9.l("p").x.G(9.l("H"));9.l("p").11({A:c})},S:j(a){9.W(9.l(a));9.P(a,[])},W:j(a){E(q b M a)a.1a(b)&&(a[b]r n.o.R||a[b]r n.o.I||a[b]r n.o.12?(n.o.18.2r(a[b]),9.l("p").x.1o(a[b])):a[b]r U&&9.W(a[b]),a[b]=F)},2q:j(a,b,c){q a=9.l(a),d;E(d M a)a.1a(d)&&c(a[d],b.1c&&a[d][b.y]?-1<f.2t(b.1h,a[d][b.y].14(b.1c)):a[d][b.y]===b.1h)},2s:j(a){k 9.l("p").2p().2m(a.D())},l:j(a,b){q c=9.J;m(!c[a]){m(-1<a.1D(">")){E(q d=a.1A(/ /g,"").14(">"),e=0;e<d.Q;e++){m(!c[d[e]])m(b)c[d[e]]=e+1<d.Q?[]:b;u k F;c=c[d[e]]}k c}b&&!c[a]&&9.P(a,b)}k c[a]},P:j(a,b){9.J[a]=b},2l:j(){9.S("X");9.S("1I");9.S("1v");q a=9.J;a.p.2o();E(q b M a)a[b]=F;C.2n(9.w[0],"1z")},N:j(a){a&&f.2g(a)&&a.1x(9,U.T.1t.1y(17,1))},L:j(a){m(a r n.o.13)k a;a=a.1A(/ /g,"").14(",");k t n.o.13(a[0],a[1])},19:j(a){m(a){m(a r C)k a[0];m(a r 1w)k a}u k F;k f("#"+a)[0]}});C.1H.16({1B:j(a,b){k 9.v("1B",a,b)},1F:j(a,b){k 9.v("1F",a,b)},1f:j(a,b){k 9.v("1f",a,b)},1d:j(a,b){k 9.v("1d",a,b)},1p:j(a,b){k 9.v("1p",a,b)},1q:j(a){k 9.v("1q",a)},1r:j(a){k 9.v("1r",a)},2e:j(a){n.o.18.2f(9[0],a)},v:j(a,b,c){9[0]r n.o.R||9[0]r n.o.I||9[0]r n.o.12?n.o.18.2h(9[0],a,b):c?9.1m(a,b,c):9.1m(a,b);k 9}})})(C);',62,161,'|||||||||this||||||||||function|return|get|if|Microsoft|Maps|map|var|instanceof|options|new|else|addEventListener|el|entities|property||center|htmlContent|jQuery|getLocation|for|null|push|iw|Infobox|instance|location|_latLng|in|_call|_convert|set|length|Pushpin|clear|prototype|Array|bounds|_c|markers|data|zoom||setView|Map|Location|split||extend|arguments|Events|_unwrap|hasOwnProperty|addBounds|delimiter|mouseover|_create|dblclick|getId|value|top|zIndex|offset|div|bind|openInfoWindow|remove|mouseout|drag|dragend|_u|slice|left|overlays|Object|apply|call|gmap|replace|click|_init|indexOf|_setup|rightclick|addMarker|fn|services|width|height|max|addControl|bottom|index|getHeight|position|absolute|getWidth|getZoomRange|option|ui|setTimeout|callback|each|typeof|string|substring|_|getZoom|getMapTypeId|fromLocations|LocationRect|mapTypeId|init|trigger|getCenter|setOptions|description|RegExp|triggerEvent|invoke|isFunction|addHandler|target|innerHTML|class|destroy|contains|removeData|dispose|getBounds|find|removeHandler|inViewport|inArray|right|match|css|appendChild|addInfoWindow|99999|Point'.split('|'),0,{}))

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(5(e){e.C(e.16.18.1b,{U:5(a,c){r d=m;E.C(d.6("8",{}),{"1a-l":{},19:{3:!0},1d:{},1c:{},14:{},13:{j:!0},"v":{},15:{},"17-l":{},1l:{},1k:{},1m:{},1o:{},1n:{},"s-w":{},"s-I":{},"s-k":{},1j:{3:!0},1f:{},"1e-F":{},"1g-l":{},1i:{},1h:{3:!0},"N-l":{},M:{2:!0},O:{2:!0},"B-Q":{},"B-P":{},L:{2:!0},J:{2:!0},K:{},Z:{3:!0},Y:{},X:{},12:{},11:{3:!0},10:{},T:{},S:{},n:{3:!0},R:{j:!0},W:{},V:{3:!0},"G-l":{},"G-1O":{},1M:{},1L:{},"1N-1I-1H":{},"1K-1J":{},1U:{2:!0},1T:{},1V:{},1W:{},1Q:{},1P:{},1S:{},1R:{},1G:{},"1u-1t":{},1w:{},"1v-F":{},I:{},1q:{j:!0},k:{},q:{},1p:{},1s:{},1r:{},H:{j:!0},t:{},"t-k":{},1x:{2:!0},1D:{2:!0},1C:{2:!0},1F:{},1E:{2:!0}});e(a).p(5(h){c(d.o(e(m),{"@q":a.1z(".","")}),m,h)})},o:5(a,c){r d=m;a.u().p(5(){r a=e(m);7(a.4("v")){r i=a.4("v").1y(" "),g=[],f;e.p(i,5(a,b){d.6("8")[b]&&d.6("8")[b].2?f=b:g.x(b)});e.p(g,5(e,b){d.6("8")[b]&&(f=f||b,d.6("8")[b].3&&0<a.u().y?(c[b]||(c[b]=[]),c[b].x({"@q":f}),d.o(a,c[b][c[b].y-1])):0<a.u().y?(c[b]={"@q":f},d.o(a,c[b])):d.6("8")[b].j?(c[b]||(c[b]=[]),c[b].x(d.z(a,b))):c[b]=d.z(a,b))})}1B d.o(a,c)});9 c},z:5(a,c){7("t-k"===c)9 a.4("k");7("H"===c)9 a.4("1A");7(a.4("D"))9 a.4("D");7(a.4("w"))9 a.4("w");7(a.A())9 a.A()}})})(E);',62,121,'||isRoot|hasChildren|attr|function|get|if|properties|return||||||||||isMultivalued|title|name|this||_traverse|each|type|var|entry|value|children|class|content|push|length|_extract|text|honorific|extend|src|jQuery|address|organization|url|summary|hreview|item|hresume|hentry|given|hfeed|suffix|prefix|nickname|mailer|longitude|microformat|org|note|latitude|label|key|logo|location|locality|category|bday|contact|ui|country|gmap|adr|additional|prototype|author|affiliation|extended|experience|family|geo|fn|email|dtend|description|dtreviewed|education|dtstart|tz|tel|updated|uid|string|sort|street|sound|vcalendar|split|replace|href|else|vevent|vcard|xoxo|version|skill|box|office|code|postal|photo|permalink|post|unit|rev|region|role|reviewer|publications|profile|published|rating'.split('|'),0,{}))

function localizable() {
}

localizable.prototype.get = function(name, success) 
{
    PhoneGap.exec("localizable.get", name,GetFunctionName(success));
};

PhoneGap.addConstructor(function() 
{
	if(!window.plugins)
	{
		window.plugins = {};
	}
    window.plugins.localizable = new localizable();
});
