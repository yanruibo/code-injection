










	//TAILLE A FIXER PAR DEFAUT POUR INITIALISER LA MAP
	var h = $( window ).height();
	var w = $( window ).width();
	$('#mapLocalisationParking').css( "height",h);
	//$('#mapLocalisation').css( "margin-top", "40px" );
	$('#mapLocalisationParking').css( "width", w );
	//$('#mapLocalisation').css( "z-index","100000" );
	
		












cordova.define("cordova/plugin/twitter",
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var Twitter = function () {};
   
    Twitter.prototype.isTwitterAvailable = function( success, failure ) {
    	
    	
        if (typeof failure != "function")  {
            console.log("Twitter.scan failure: failure parameter not a function");
            return
        }

        if (typeof success != "function") {
            console.log("Twitter.scan failure: success callback parameter must be a function");
            return
        }
        cordova.exec(success, failure, "Twitter", "isTwitterAvailable", []);
    };

    Twitter.prototype.composeTweet = function( success, failure, tweetText, options) {
        if (typeof failure != "function")  {
            console.log("Twitter.scan failure: failure parameter not a function");
            return
        }

        if (typeof success != "function") {
            console.log("Twitter.scan failure: success callback parameter must be a function");
            return
        }
        cordova.exec(success, failure, "Twitter", "composeTweet", [tweetText]);
    };

    var twitter = new Twitter();
    module.exports = twitter;
});

if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.twitter) {
    window.plugins.twitter = cordova.require("cordova/plugin/twitter");
}


































	   		//Ce code est placé ici pour masquer l'affichage des différents éléments concernés de manière anticipée
			$('#boutonReloadJson').css('visibility', 'hidden');
			$('#btn-about-accueil').css('visibility', 'hidden');
	
			$('[data-role=content]').css('display', 'none');
			$('#loading').css('visibility', '');
			
				
			var h = $( window ).height();
			var w = $( window ).width();
			largeurEcran=w;
			hauteurEcran=h;
			//alert("largeurEcran="+largeurEcran+"****hauteurEcran="+hauteurEcran);
				
		

			//TABLETTE
			if(largeurEcran>640 && hauteurEcran>640)
			{
				$("#actualites").load("actualites.html", function(response, status, xhr) 
				{
					if (status == "success") {}
				});
			}
            

			//SMARTPHONES
			if(largeurEcran<=640 || hauteurEcran<=640)
			{
				$("#actusIphoneL").load("actusIphoneL.html", function(response, status, xhr) 
				{
					if (status == "success") {}
				});
			}
            

			//SMARTPHONES
			if(largeurEcran<=640 || hauteurEcran<=640){
				$("#actusIphoneD").load("actusIphoneD.html", function(response, status, xhr) 
				{
					if (status == "success") {}
				});
			}
            

			//TABLETTE
			if(largeurEcran>640 && hauteurEcran>640)
			{
				$("#tv8").load("tv8.html", function(response, status, xhr) 
				{
					if (status == "success") {}
				});
			}
			

			//SMARTPHONES
			if(largeurEcran<=640 || hauteurEcran<=640)
			{	
				$("#tv8IphoneL").load("tv8IphoneL.html", function(response, status, xhr) 
				{
					if (status == "success") {}
				});
			}
            

			//SMARTPHONES
			if(largeurEcran<=640 || hauteurEcran<=640)
			{	
				$("#tv8IphoneD").load("tv8IphoneD.html", function(response, status, xhr) 
				{
					if (status == "success") {}
				});
			}
            
	
            $("#agenda").load("agenda.html", function(response, status, xhr) {
                  if (status == "success") {
					
                  }
            });
            

            $("#map").load("map.html", function(response, status, xhr) {
                  
            });
            

            	$("#mapCarte").load("mapCarte.html", function(response, status, xhr) {
                  
            	});
			

            	$("#routage").load("routage.html", function(response, status, xhr) {
                  
            	});
			

			//SMARTPHONES/TABLETTES	
			$("#pubIphoneL").load("pubIphoneL.html", function(response, status, xhr) 
			{
				if (status == "success") {}
			});
			

			//SMARTPHONES/TABLETTES	
			$("#pubIphoneD").load("pubIphoneD.html", function(response, status, xhr) 
			{
				if (status == "success") {}
			});
            
	
            $("#demarches").load("demarches.html", function(response, status, xhr) 
            {
            	if (status == "success") {}
            });
            
	
            $("#demarches-autres").load("demarches-autres.html", function(response, status, xhr) 
            {
                  
            });
            
	
            $("#demarches-contact").load("demarches-contact.html", function(response, status, xhr) 
            {
            	if (status == "success") {} 
            });
            
	
            $("#demarches-contact-info").load("demarches-contact-info.html", function(response, status, xhr) 
            {
				if (status == "success") {}                  
            });
            
	
            $("#demarches-proximcite").load("demarches-proximcite.html", function(response, status, xhr) 
            {
                  if (status == "success") {}
            });
            
	
            $("#demarches-proximcite-info").load("demarches-proximcite-info.html", function(response, status, xhr) 
            {
            	if (status == "success") {}
            });
            
	
            $("#demarches-Demandenaissance").load("demarches-Demandenaissance.html", function(response, status, xhr) 
            {
            	if (status == "success") {}
            });
            
	
            $("#demarches-SuiviDemandenaissance").load("demarches-SuiviDemandenaissance.html", function(response, status, xhr) 
            {
				if (status == "success") {}
            });
            
	
            $("#demarches-Demandemariage").load("demarches-Demandemariage.html", function(response, status, xhr) 
            {
                  if (status == "success") {}
            });
            
	
            $("#demarches-SuiviDemandemariage").load("demarches-SuiviDemandemariage.html", function(response, status, xhr) 
            {
            	if (status == "success") {}
            });
          
	
            $("#demarches-etatCivil-info").load("demarches-etatCivil-info.html", function(response, status, xhr) 
            {
            	if (status == "success") {} 
            });
         
	
            $("#about").load("about.html", function(response, status, xhr) 
            {
            	if (status == "success") {}
            });
            
	
            $("#redirection").load("redirection.html", function(response, status, xhr) 
            {
            	if (status == "success") {}
            });
            
	
            $("#parking").load("parking.html", function(response, status, xhr) 
            {
            	if (status == "success") {}
            });
            
	
            $("#parking-detail").load("parking-detail.html", function(response, status, xhr) 
            {
            	if (status == "success") {}
            });
            



	//TAILLE A FIXER PAR DEFAUT POUR INITIALISER LA MAP
	var h = $( window ).height();
	var w = $( window ).width();
	$('#mapDiv').css( "height", h );
	$('#mapDiv').css( "width", w );
	//$('#mapDiv').css( "z-index","100000" );










	//TAILLE A FIXER PAR DEFAUT POUR INITIALISER LA MAP
	var h = $( window ).height();
	var w = $( window ).width();
	$('#mapLocalisation').css( "height", h );
	//$('#mapLocalisation').css( "margin-top", "40px" );
	$('#mapLocalisation').css( "width", w );
	//$('#mapLocalisation').css( "z-index","100000" );
	
		


































































































































































		$( document ).on( "pageinit", "#myPage", function() {
			$( "#autocomplete" ).on( "listviewbeforefilter", function ( e, data ) {
				var $ul = $( this ),
					$input = $( data.input ),
					value = $input.val(),
					html = "";
				$ul.html( "" );
				if ( value && value.length > 2 ) {
					$ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
					$ul.listview( "refresh" );
					$.ajax({
						url: "http://gd.geobytes.com/AutoCompleteCity",
						dataType: "jsonp",
						crossDomain: true,
						data: {
							q: $input.val()
						}
					})
					.then( function ( response ) {
						$.each( response, function ( i, val ) {
							html += "<li>" + val + "</li>";
						});
						$ul.html( html );
						$ul.listview( "refresh" );
						$ul.trigger( "updatelayout");
					});
				}
			});
		});
    

(function( $ ) {
  // On document ready
  $(function() {

    // Bind to the navigate event
    $( window ).on( "navigate", function() {
      console.log( "navigated!" );
    });

    // Bind to the click of the example link
    $( "#event-example" ).click(function( event ) {
      event.preventDefault();
      location.hash = "foo";
    });

    // Bind to the click of the example link
    $( "#method-example" ).click(function( event ) {
      // Append #bar
      $.mobile.navigate( "#bar", {
        info: "info about the #bar hash"
      });

      // Replace #bar with #baz
      $.mobile.navigate( "#baz" );

      // Log the results of the navigate event
      $( window ).on( "navigate", function( event, data ){
        console.log( data.state.info );
        console.log( data.state.direction );
        console.log( data.state.url );
        console.log( data.state.hash );
      });

      // Go back to pop the state for #bar and log it
      window.history.back();
    });
  });
})( jQuery );






























































































		$(document).on("click", ".show-page-loading-msg", function() {
			var $this = $( this ),
				theme = $this.jqmData("theme") || $.mobile.loader.prototype.options.theme,
				msgText = $this.jqmData("msgtext") || $.mobile.loader.prototype.options.text,
				textVisible = $this.jqmData("textvisible") || $.mobile.loader.prototype.options.textVisible,
				textonly = !!$this.jqmData("textonly");
				html = $this.jqmData("html") || "";
			$.mobile.loading( 'show', {
					text: msgText,
					textVisible: textVisible,
					theme: theme,
					textonly: textonly,
					html: html
			});
		})
		.on("click", ".hide-page-loading-msg", function() {
			$.mobile.loading( 'hide' );
		});
	


































































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

});






		function initialize() {
			var myLatlng = new google.maps.LatLng( 51.520838, -0.140261 );
			var myOptions = {
				zoom: 15,
				center: myLatlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			var map = new google.maps.Map( document.getElementById( "map_canvas" ), myOptions );
		}
	































































var hljs=new function(){function l(o){return o.replace(/&/gm,"&amp;").replace(/</gm,"&lt;")}function c(q,p,o){return RegExp(p,"m"+(q.cI?"i":"")+(o?"g":""))}function i(q){for(var o=0;o<q.childNodes.length;o++){var p=q.childNodes[o];if(p.nodeName=="CODE"){return p}if(!(p.nodeType==3&&p.nodeValue.match(/\s+/))){break}}}function g(s,r){var q="";for(var p=0;p<s.childNodes.length;p++){if(s.childNodes[p].nodeType==3){var o=s.childNodes[p].nodeValue;if(r){o=o.replace(/\n/g,"")}q+=o}else{if(s.childNodes[p].nodeName=="BR"){q+="\n"}else{q+=g(s.childNodes[p])}}}if(/MSIE [678]/.test(navigator.userAgent)){q=q.replace(/\r/g,"\n")}return q}function a(r){var p=r.className.split(/\s+/);p=p.concat(r.parentNode.className.split(/\s+/));for(var o=0;o<p.length;o++){var q=p[o].replace(/^language-/,"");if(d[q]||q=="no-highlight"){return q}}}function b(o){var p=[];(function(r,s){for(var q=0;q<r.childNodes.length;q++){if(r.childNodes[q].nodeType==3){s+=r.childNodes[q].nodeValue.length}else{if(r.childNodes[q].nodeName=="BR"){s+=1}else{p.push({event:"start",offset:s,node:r.childNodes[q]});s=arguments.callee(r.childNodes[q],s);p.push({event:"stop",offset:s,node:r.childNodes[q]})}}}return s})(o,0);return p}function k(x,y,w){var q=0;var v="";var s=[];function t(){if(x.length&&y.length){if(x[0].offset!=y[0].offset){return(x[0].offset<y[0].offset)?x:y}else{return y[0].event=="start"?x:y}}else{return x.length?x:y}}function r(B){var C="<"+B.nodeName.toLowerCase();for(var z=0;z<B.attributes.length;z++){var A=B.attributes[z];C+=" "+A.nodeName.toLowerCase();if(A.nodeValue!=undefined){C+='="'+l(A.nodeValue)+'"'}}return C+">"}while(x.length||y.length){var u=t().splice(0,1)[0];v+=l(w.substr(q,u.offset-q));q=u.offset;if(u.event=="start"){v+=r(u.node);s.push(u.node)}else{if(u.event=="stop"){var p=s.length;do{p--;var o=s[p];v+=("</"+o.nodeName.toLowerCase()+">")}while(o!=u.node);s.splice(p,1);while(p<s.length){v+=r(s[p]);p++}}}}v+=w.substr(q);return v}function f(I,C){function y(r,L){for(var K=0;K<L.c.length;K++){if(L.c[K].bR.test(r)){return L.c[K]}}}function v(K,r){if(B[K].e&&B[K].eR.test(r)){return 1}if(B[K].eW){var L=v(K-1,r);return L?L+1:0}return 0}function w(r,K){return K.iR&&K.iR.test(r)}function z(N,M){var L=[];for(var K=0;K<N.c.length;K++){L.push(N.c[K].b)}var r=B.length-1;do{if(B[r].e){L.push(B[r].e)}r--}while(B[r+1].eW);if(N.i){L.push(N.i)}return c(M,"("+L.join("|")+")",true)}function q(L,K){var M=B[B.length-1];if(!M.t){M.t=z(M,G)}M.t.lastIndex=K;var r=M.t.exec(L);if(r){return[L.substr(K,r.index-K),r[0],false]}else{return[L.substr(K),"",true]}}function o(N,r){var K=G.cI?r[0].toLowerCase():r[0];for(var M in N.kG){if(!N.kG.hasOwnProperty(M)){continue}var L=N.kG[M].hasOwnProperty(K);if(L){return[M,L]}}return false}function E(L,N){if(!N.k){return l(L)}var M="";var O=0;N.lR.lastIndex=0;var K=N.lR.exec(L);while(K){M+=l(L.substr(O,K.index-O));var r=o(N,K);if(r){s+=r[1];M+='<span class="'+r[0]+'">'+l(K[0])+"</span>"}else{M+=l(K[0])}O=N.lR.lastIndex;K=N.lR.exec(L)}M+=l(L.substr(O,L.length-O));return M}function J(r,L){if(L.sL&&d[L.sL]){var K=f(L.sL,r);s+=K.keyword_count;return K.value}else{return E(r,L)}}function H(L,r){var K=L.cN?'<span class="'+L.cN+'">':"";if(L.rB){p+=K;L.buffer=""}else{if(L.eB){p+=l(r)+K;L.buffer=""}else{p+=K;L.buffer=r}}B.push(L);A+=L.r}function D(N,K,P){var Q=B[B.length-1];if(P){p+=J(Q.buffer+N,Q);return false}var L=y(K,Q);if(L){p+=J(Q.buffer+N,Q);H(L,K);return L.rB}var r=v(B.length-1,K);if(r){var M=Q.cN?"</span>":"";if(Q.rE){p+=J(Q.buffer+N,Q)+M}else{if(Q.eE){p+=J(Q.buffer+N,Q)+M+l(K)}else{p+=J(Q.buffer+N+K,Q)+M}}while(r>1){M=B[B.length-2].cN?"</span>":"";p+=M;r--;B.length--}var O=B[B.length-1];B.length--;B[B.length-1].buffer="";if(O.starts){H(O.starts,"")}return Q.rE}if(w(K,Q)){throw"Illegal"}}var G=d[I];var B=[G.dM];var A=0;var s=0;var p="";try{var u=0;G.dM.buffer="";do{var x=q(C,u);var t=D(x[0],x[1],x[2]);u+=x[0].length;if(!t){u+=x[1].length}}while(!x[2]);if(B.length>1){throw"Illegal"}return{language:I,r:A,keyword_count:s,value:p}}catch(F){if(F=="Illegal"){return{language:null,r:0,keyword_count:0,value:l(C)}}else{throw F}}}function h(){function o(t,s,u){if(t.compiled){return}if(!u){t.bR=c(s,t.b?t.b:"\\B|\\b");if(!t.e&&!t.eW){t.e="\\B|\\b"}if(t.e){t.eR=c(s,t.e)}}if(t.i){t.iR=c(s,t.i)}if(t.r==undefined){t.r=1}if(t.k){t.lR=c(s,t.l||hljs.IR,true)}for(var r in t.k){if(!t.k.hasOwnProperty(r)){continue}if(t.k[r] instanceof Object){t.kG=t.k}else{t.kG={keyword:t.k}}break}if(!t.c){t.c=[]}t.compiled=true;for(var q=0;q<t.c.length;q++){o(t.c[q],s,false)}if(t.starts){o(t.starts,s,false)}}for(var p in d){if(!d.hasOwnProperty(p)){continue}o(d[p].dM,d[p],true)}}function e(){if(e.called){return}e.called=true;h()}function n(t,y,p){e();var A=g(t,p);var r=a(t);if(r=="no-highlight"){return}if(r){var w=f(r,A)}else{var w={language:"",keyword_count:0,r:0,value:l(A)};var x=w;for(var z in d){if(!d.hasOwnProperty(z)){continue}var u=f(z,A);if(u.keyword_count+u.r>x.keyword_count+x.r){x=u}if(u.keyword_count+u.r>w.keyword_count+w.r){x=w;w=u}}}var s=t.className;if(!s.match(w.language)){s=s?(s+" "+w.language):w.language}var o=b(t);if(o.length){var q=document.createElement("pre");q.innerHTML=w.value;w.value=k(o,b(q),A)}if(y){w.value=w.value.replace(/^((<[^>]+>|\t)+)/gm,function(B,E,D,C){return E.replace(/\t/g,y)})}if(p){w.value=w.value.replace(/\n/g,"<br>")}if(/MSIE [678]/.test(navigator.userAgent)&&t.tagName=="CODE"&&t.parentNode.tagName=="PRE"){var q=t.parentNode;var v=document.createElement("div");v.innerHTML="<pre><code>"+w.value+"</code></pre>";t=v.firstChild.firstChild;v.firstChild.cN=q.cN;q.parentNode.replaceChild(v.firstChild,q)}else{t.innerHTML=w.value}t.className=s;t.dataset={};t.dataset.result={language:w.language,kw:w.keyword_count,re:w.r};if(x&&x.language){t.dataset.second_best={language:x.language,kw:x.keyword_count,re:x.r}}}function j(){if(j.called){return}j.called=true;e();var q=document.getElementsByTagName("pre");for(var o=0;o<q.length;o++){var p=i(q[o]);if(p){n(p,hljs.tabReplace)}}}function m(){var o=arguments;var p=function(){j.apply(null,o)};if(window.addEventListener){window.addEventListener("DOMContentLoaded",p,false);window.addEventListener("load",p,false)}else{if(window.attachEvent){window.attachEvent("onload",p)}else{window.onload=p}}}var d={};this.LANGUAGES=d;this.initHighlightingOnLoad=m;this.highlightBlock=n;this.initHighlighting=j;this.IR="[a-zA-Z][a-zA-Z0-9_]*";this.UIR="[a-zA-Z_][a-zA-Z0-9_]*";this.NR="\\b\\d+(\\.\\d+)?";this.CNR="\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)";this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";this.BE={b:"\\\\.",r:0};this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE],r:0};this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE],r:0};this.CLCM={cN:"comment",b:"//",e:"$"};this.CBLCLM={cN:"comment",b:"/\\*",e:"\\*/"};this.HCM={cN:"comment",b:"#",e:"$"};this.NM={cN:"number",b:this.NR,r:0};this.CNM={cN:"number",b:this.CNR,r:0};this.inherit=function(o,r){var q={};for(var p in o){q[p]=o[p]}if(r){for(var p in r){q[p]=r[p]}}return q}}();hljs.LANGUAGES.javascript={dM:{k:{keyword:{"in":1,"if":1,"for":1,"while":1,"finally":1,"var":1,"new":1,"function":1,"do":1,"return":1,"void":1,"else":1,"break":1,"catch":1,"instanceof":1,"with":1,"throw":1,"case":1,"default":1,"try":1,"this":1,"switch":1,"continue":1,"typeof":1,"delete":1},literal:{"true":1,"false":1,"null":1}},c:[hljs.ASM,hljs.QSM,hljs.CLCM,hljs.CBLCLM,hljs.CNM,{b:"("+hljs.RSR+"|case|return|throw)\\s*",k:{"return":1,"throw":1,"case":1},c:[hljs.CLCM,hljs.CBLCLM,{cN:"regexp",b:"/.*?[^\\\\/]/[gim]*"}],r:0},{cN:"function",b:"\\bfunction\\b",e:"{",k:{"function":1},c:[{cN:"title",b:"[A-Za-z$_][0-9A-Za-z$_]*"},{cN:"params",b:"\\(",e:"\\)",c:[hljs.ASM,hljs.QSM,hljs.CLCM,hljs.CBLCLM]}]}]}};hljs.LANGUAGES.css=function(){var a={cN:"function",b:hljs.IR+"\\(",e:"\\)",c:[{eW:true,eE:true,c:[hljs.NM,hljs.ASM,hljs.QSM]}]};return{cI:true,dM:{i:"[=/|']",c:[hljs.CBLCLM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@font-face",l:"[a-z-]+",k:{"font-face":1}},{cN:"at_rule",b:"@",e:"[{;]",eE:true,k:{"import":1,page:1,media:1,charset:1},c:[a,hljs.ASM,hljs.QSM,hljs.NM]},{cN:"tag",b:hljs.IR,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[hljs.CBLCLM,{cN:"rule",b:"[^\\s]",rB:true,e:";",eW:true,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:true,i:"[^\\s]",starts:{cN:"value",eW:true,eE:true,c:[a,hljs.NM,hljs.QSM,hljs.ASM,hljs.CBLCLM,{cN:"hexcolor",b:"\\#[0-9A-F]+"},{cN:"important",b:"!important"}]}}]}]}]}}}();hljs.LANGUAGES.xml=function(){var b="[A-Za-z0-9\\._:-]+";var a={eW:true,c:[{cN:"attribute",b:b,r:0},{b:'="',rB:true,e:'"',c:[{cN:"value",b:'"',eW:true}]},{b:"='",rB:true,e:"'",c:[{cN:"value",b:"'",eW:true}]},{b:"=",c:[{cN:"value",b:"[^\\s/>]+"}]}]};return{cI:true,dM:{c:[{cN:"pi",b:"<\\?",e:"\\?>",r:10},{cN:"doctype",b:"<!DOCTYPE",e:">",r:10},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style",e:">",k:{title:{style:1}},c:[a],starts:{cN:"css",e:"</style>",rE:true,sL:"css"}},{cN:"tag",b:"<script",e:">",k:{title:{script:1}},c:[a],starts:{cN:"javascript",e:"<\/script>",rE:true,sL:"javascript"}},{cN:"vbscript",b:"<%",e:"%>",sL:"vbscript"},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:"[^ />]+"},a]}]}}}();

// jquery.royalslider v9.3.73
(function(l){function v(b,f){var c=navigator.userAgent.toLowerCase(),g=l.browser,a=this,e=g.webkit||g.chrome;a.isIPAD=c.match(/(ipad)/);for(var d=document.createElement("div").style,j=["webkit","Moz","ms","O"],h="",k=0,m,c=0;c<j.length;c++)m=j[c],!h&&m+"Transform"in d&&(h=m),m=m.toLowerCase(),window.requestAnimationFrame||(window.requestAnimationFrame=window[m+"RequestAnimationFrame"],window.cancelAnimationFrame=window[m+"CancelAnimationFrame"]||window[m+"CancelRequestAnimationFrame"]);window.requestAnimationFrame||
(window.requestAnimationFrame=function(a){var b=(new Date).getTime(),c=Math.max(0,16-(b-k)),d=window.setTimeout(function(){a(b+c)},c);k=b+c;return d});window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)});a.slider=l(b);a.ev=l(a);a._a=l(document);a.st=l.extend({},l.fn.royalSlider.defaults,f);a._b=a.st.transitionSpeed;a._c=0;if(a.st.allowCSS3&&(!e||a.st.allowCSS3OnWebkit))c=h+(h?"T":"t"),a._d=c+"ransform"in d&&c+"ransition"in d,a._d&&(a._e=h+(h?"P":"p")+"erspective"in
d);h=h.toLowerCase();a._f="-"+h+"-";a._g="vertical"===a.st.slidesOrientation?!1:!0;a._h=a._g?"left":"top";a._i=a._g?"width":"height";a._j=-1;a._k="fade"===a.st.transitionType?!1:!0;a._k||(a.st.sliderDrag=!1,a._l=10);a._m="z-index:0; display:none; opacity:0;";a._n=0;a._o=0;a._p=0;l.each(l.rsModules,function(b,c){c.call(a)});a.slides=[];a._q=0;(a.st.slides?l(a.st.slides):a.slider.children().detach()).each(function(){a._r(this,!0)});a.st.randomizeSlides&&a.slides.sort(function(){return 0.5-Math.random()});
a.numSlides=a.slides.length;a._s();a.st.startSlideId?a.st.startSlideId>a.numSlides-1&&(a.st.startSlideId=a.numSlides-1):a.st.startSlideId=0;a.staticSlideId=a.currSlideId=a._t=a.st.startSlideId;a.currSlide=a.slides[a.currSlideId];a._u=0;a.msTouch=!1;a.slider.addClass((a._g?"rsHor":"rsVer")+(a._k?"":" rsFade"));d='<div class="rsOverflow"><div class="rsContainer">';a.slidesSpacing=a.st.slidesSpacing;a._v=(a._g?a.slider.width():a.slider.height())+a.st.slidesSpacing;a._w=Boolean(0<a._x);1>=a.numSlides&&
(a._y=!1);a._z=a._y&&a._k?2===a.numSlides?1:2:0;a._a1=6>a.numSlides?a.numSlides:6;a._b1=0;a._c1=0;a.slidesJQ=[];for(c=0;c<a.numSlides;c++)a.slidesJQ.push(l('<div style="'+(a._k?"":c!==a.currSlideId?a._m:"z-index:0;")+'" class="rsSlide "></div>'));a._d1=d=l(d+"</div></div>");c=function(){a.st.sliderDrag&&(a._e1=!0,g.msie||g.opera?a._f1=a._g1="move":g.mozilla?(a._f1="-moz-grab",a._g1="-moz-grabbing"):e&&-1!=navigator.platform.indexOf("Mac")&&(a._f1="-webkit-grab",a._g1="-webkit-grabbing"),a._h1())};
h=function(b,c,d,e,f){a._i1=b+c+".rs";a._j1=b+d+".rs";a._k1=b+e+".rs";f&&(a._l1=b+f+".rs")};a.msEnabled=window.navigator.msPointerEnabled;a.msEnabled?(a.msTouch=Boolean(1<window.navigator.msMaxTouchPoints),a.hasTouch=!1,a._m1=0.2,h("MSPointer","Down","Move","Up","Cancel"),c()):"ontouchstart"in window||"createTouch"in document?(a.hasTouch=!0,h("touch","start","move","end","cancel"),a._m1=0.5,a.st.sliderTouch&&(a._e1=!0)):(a.hasTouch=!1,a._m1=0.2,c(),h("mouse","down","move","up","up"));a.slider.html(d);
a._n1=a.st.controlsInside?a._d1:a.slider;a._o1=a._d1.children(".rsContainer");a.msEnabled&&a._o1.css("-ms-touch-action",a._g?"pan-y":"pan-x");a._p1=l('<div class="rsPreloader"></div>');c=a._o1.children(".rsSlide");a._q1=a.slidesJQ[a.currSlideId];a._r1=0;a._d?(a._s1="transition-property",a._t1="transition-duration",a._u1="transition-timing-function",a._v1=a._w1=a._f+"transform",a._e?(e&&a.slider.addClass("rsWebkit3d"),a._x1="translate3d(",a._y1="px, ",a._z1="px, 0px)"):(a._x1="translate(",a._y1="px, ",
a._z1="px)"),a._k?a._o1[a._f+a._s1]=a._f+"transform":(d={},d[a._f+a._s1]="opacity",d[a._f+a._t1]=a.st.transitionSpeed+"ms",d[a._f+a._u1]=a.st.css3easeInOut,c.css(d))):(a._w1="left",a._v1="top");var n;l(window).on("resize.rs",function(){n&&clearTimeout(n);n=setTimeout(function(){a.updateSliderSize()},50)});a.ev.trigger("rsAfterPropsSetup");a.updateSliderSize();a.st.keyboardNavEnabled&&a._a2();if(a.st.arrowsNavHideOnTouch&&(a.hasTouch||a.msTouch))a.st.arrowsNav=!1;a.st.arrowsNav&&(c=a._n1,l('<div class="rsArrow rsArrowLeft"><div class="rsArrowIcn"></div></div><div class="rsArrow rsArrowRight"><div class="rsArrowIcn"></div></div>').appendTo(c),
a._b2=c.children(".rsArrowLeft").click(function(b){b.preventDefault();a.prev()}),a._c2=c.children(".rsArrowRight").click(function(b){b.preventDefault();a.next()}),a.st.arrowsNavAutoHide&&!a.hasTouch&&(a._b2.addClass("rsHidden"),a._c2.addClass("rsHidden"),c.one("mousemove.arrowshover",function(){a._b2.removeClass("rsHidden");a._c2.removeClass("rsHidden")}),c.hover(function(){a._d2||(a._b2.removeClass("rsHidden"),a._c2.removeClass("rsHidden"))},function(){a._d2||(a._b2.addClass("rsHidden"),a._c2.addClass("rsHidden"))})),
a.ev.on("rsOnUpdateNav",function(){a._e2()}),a._e2());if(a._e1)a._o1.on(a._i1,function(b){a._f2(b)});else a.dragSuccess=!1;var p=["rsPlayBtnIcon","rsPlayBtn","rsCloseVideoBtn","rsCloseVideoIcn"];a._o1.click(function(b){if(!a.dragSuccess){var c=l(b.target).attr("class");if(-1!==l.inArray(c,p)&&a.toggleVideo())return!1;if(a.st.navigateByClick&&!a._g2){if(l(b.target).closest(".rsNoDrag",a._q1).length)return!0;a._h2(b)}a.ev.trigger("rsSlideClick")}}).on("click.rs","a",function(){if(a.dragSuccess)return!1;
a._g2=!0;setTimeout(function(){a._g2=!1},3)});a.ev.trigger("rsAfterInit")}l.rsModules||(l.rsModules={});v.prototype={_h2:function(b){b=b[this._g?"pageX":"pageY"]-this._i2;b>=this._p?this.next():0>b&&this.prev()},_s:function(){var b;b=this.st.numImagesToPreload;if(this._y=this.st.loop)2===this.numSlides?(this._y=!1,this.st.loopRewind=!0):2>this.numSlides&&(this.st.loopRewind=this._y=!1);this._y&&0<b&&(4>=this.numSlides?b=1:this.st.numImagesToPreload>(this.numSlides-1)/2&&(b=Math.floor((this.numSlides-
1)/2)));this._x=b},_r:function(b,f){function c(a,b){b?e.images.push(a.attr(b)):e.images.push(a.text());if(j){j=!1;e.caption="src"===b?a.attr("alt"):a.contents();e.image=e.images[0];e.videoURL=a.attr("data-rsVideo");var c=a.attr("data-rsw"),d=a.attr("data-rsh");"undefined"!==typeof c&&!1!==c&&"undefined"!==typeof d&&!1!==d?(e.iW=parseInt(c),e.iH=parseInt(d)):g.st.imgWidth&&g.st.imgHeight&&(e.iW=g.st.imgWidth,e.iH=g.st.imgHeight)}}var g=this,a,e={},d,j=!0;b=l(b);g._j2=b;g.ev.trigger("rsBeforeParseNode",
[b,e]);if(!e.stopParsing)return b=g._j2,e.id=g._q,e.contentAdded=!1,g._q++,e.images=[],e.isBig=!1,e.hasCover||(b.hasClass("rsImg")?(d=b,a=!0):(d=b.find(".rsImg"),d.length&&(a=!0)),a?(e.bigImage=d.eq(0).attr("data-rsBigImg"),d.each(function(){var a=l(this);a.is("a")?c(a,"href"):a.is("img")?c(a,"src"):c(a)})):b.is("img")&&(b.addClass("rsImg rsMainSlideImage"),c(b,"src"))),d=b.find(".rsCaption"),d.length&&(e.caption=d.remove()),e.content=b,g.ev.trigger("rsAfterParseNode",[b,e]),f&&g.slides.push(e),0===
e.images.length&&(e.isLoaded=!0,e.isRendered=!1,e.isLoading=!1,e.images=null),e},_a2:function(){var b=this,f,c,g=function(a){37===a?b.prev():39===a&&b.next()};b._a.on("keydown.rskb",function(a){if(!b._k2&&(c=a.keyCode,(37===c||39===c)&&!f))g(c),f=setInterval(function(){g(c)},700)}).on("keyup.rskb",function(){f&&(clearInterval(f),f=null)})},goTo:function(b,f){b!==this.currSlideId&&this._l2(b,this.st.transitionSpeed,!0,!f)},destroy:function(b){this.ev.trigger("rsBeforeDestroy");this._a.off("keydown.rskb keyup.rskb "+
this._j1+" "+this._k1);this._o1.off(this._i1+" click");this.slider.data("royalSlider",null);l.removeData(this.slider,"royalSlider");l(window).off("resize.rs");b&&this.slider.remove();this.ev=this.slider=this.slides=null},_m2:function(b,f){function c(c,e,f){c.isAdded?(g(e,c),a(e,c)):(f||(f=d.slidesJQ[e]),c.holder?f=c.holder:(f=d.slidesJQ[e]=l(f),c.holder=f),c.appendOnLoaded=!1,a(e,c,f),g(e,c),d._o2(c,f,b),appended=c.isAdded=!0)}function g(a,c){c.contentAdded||(d.setItemHtml(c,b),b||(c.contentAdded=
!0))}function a(a,b,c){d._k&&(c||(c=d.slidesJQ[a]),c.css(d._h,(a+d._c1+p)*d._v))}function e(a){if(k){if(a>m-1)return e(a-m);if(0>a)return e(m+a)}return a}var d=this,j,h,k=d._y,m=d.numSlides;if(!isNaN(f))return e(f);var n=d.currSlideId,p,q=b?Math.abs(d._n2-d.currSlideId)>=d.numSlides-1?0:1:d._x,r=Math.min(2,q),t=!1,u=!1,s;for(h=n;h<n+1+r;h++)if(s=e(h),(j=d.slides[s])&&(!j.isAdded||!j.positionSet)){t=!0;break}for(h=n-1;h>n-1-r;h--)if(s=e(h),(j=d.slides[s])&&(!j.isAdded||!j.positionSet)){u=!0;break}if(t)for(h=
n;h<n+q+1;h++)s=e(h),p=Math.floor((d._t-(n-h))/d.numSlides)*d.numSlides,(j=d.slides[s])&&c(j,s);if(u)for(h=n-1;h>n-1-q;h--)s=e(h),p=Math.floor((d._t-(n-h))/m)*m,(j=d.slides[s])&&c(j,s);if(!b){r=e(n-q);n=e(n+q);q=r>n?0:r;for(h=0;h<m;h++)if(!(r>n&&h>r-1)&&(h<q||h>n))if((j=d.slides[h])&&j.holder)j.holder.detach(),j.isAdded=!1}},setItemHtml:function(b,f){function c(){if(b.images){if(!b.isLoading){var a,c;b.content.hasClass("rsImg")?(a=b.content,c=!0):a=b.content.find(".rsImg:not(img)");a&&!a.is("img")&&
a.each(function(){var a=l(this),d='<img class="rsImg" src="'+(a.is("a")?a.attr("href"):a.text())+'" />';c?b.content=l(d):a.replaceWith(d)});a=c?b.content:b.content.find("img.rsImg");j();a.eq(0).addClass("rsMainSlideImage");b.iW&&b.iH&&(b.isLoaded||k._p2(b),e());b.isLoading=!0;if(b.isBig)l("<img />").on("load.rs error.rs",function(){g([this],!0)}).attr("src",b.image);else{b.loaded=[];b.imgLoaders=[];for(a=0;a<b.images.length;a++){var d=l("<img />");b.imgLoaders.push(this);d.on("load.rs error.rs",function(){b.loaded.push(this);
b.loaded.length===b.imgLoaders.length&&(l.browser.mozilla?setTimeout(function(){g(b.loaded,!1)},1):g(b.loaded,!1))}).attr("src",b.images[a])}}}}else b.isRendered=!0,b.isLoaded=!0,b.isLoading=!1,e(!0)}function g(c,d){if(c.length){var e=c[0];if(d!==b.isBig)(e=b.holder.children())&&1<e.length&&h();else if(b.iW&&b.iH)a();else if(b.iW=e.width,b.iH=e.height,b.iW&&b.iH)a();else{var f=new Image;f.onload=function(){f.width?(b.iW=f.width,b.iH=f.height,a()):setTimeout(function(){f.width&&(b.iW=f.width,b.iH=
f.height);a()},1E3)};f.src=e.src}}else a()}function a(){b.isLoaded=!0;b.isLoading=!1;e();h();d()}function e(){if(!b.isAppended){var a=k.st.visibleNearby,c=b.id-k._n;if(!f&&!b.appendOnLoaded&&k.st.fadeinLoadedSlide&&(0===c||(a||k._q2||k._k2)&&(-1===c||1===c)))a={visibility:"visible",opacity:0},a[k._f+"transition"]="opacity 400ms ease-in-out",b.content.css(a),setTimeout(function(){b.content.css("opacity",1)},16);b.holder.find(".rsPreloader").length?b.holder.append(b.content):b.holder.html(b.content);
b.isAppended=!0;b.isLoaded&&(k._p2(b),d());b.sizeReady||(b.sizeReady=!0,setTimeout(function(){k.ev.trigger("rsMaybeSizeReady",b)},100))}}function d(){b.loadedTriggered||(b.isLoaded=b.loadedTriggered=!0,b.holder.trigger("rsAfterContentSet"),k.ev.trigger("rsAfterContentSet",b))}function j(){k.st.usePreloader&&b.holder.html(k._p1.clone())}function h(){if(k.st.usePreloader){var a=b.holder.find(".rsPreloader");a.length&&a.remove()}}var k=this;b.isLoaded?e():f?!k._k&&b.images&&b.iW&&b.iH?c():(b.holder.isWaiting=
!0,j(),b.holder.slideId=-99):c()},_o2:function(b){this._o1.append(b.holder);b.appendOnLoaded=!1},_f2:function(b,f){var c=this,g;c.ev.trigger("rsDragStart");if(l(b.target).closest(".rsNoDrag",c._q1).length)return c.dragSuccess=!1,!0;!f&&c._q2&&(c._r2=!0,c._s2());c.dragSuccess=!1;if(c._k2)c.hasTouch&&(c._t2=!0);else{c.hasTouch&&(c._t2=!1);c._u2();if(c.hasTouch){var a=b.originalEvent.touches;if(a&&0<a.length)g=a[0],1<a.length&&(c._t2=!0);else return}else b.preventDefault(),g=b,c.msEnabled&&(g=g.originalEvent);
c._k2=!0;c._a.on(c._j1,function(a){c._v2(a,f)}).on(c._k1,function(a){c._w2(a,f)});c._x2="";c._y2=!1;c._z2=g.pageX;c._a3=g.pageY;c._b3=c._u=(!f?c._g:c._c3)?g.pageX:g.pageY;c._d3=0;c._e3=0;c._f3=!f?c._o:c._g3;c._h3=(new Date).getTime();if(c.hasTouch)c._d1.on(c._l1,function(a){c._w2(a,f)})}},_i3:function(b,f){if(this._j3){var c=this._k3,g=b.pageX-this._z2,a=b.pageY-this._a3,e=this._f3+g,d=this._f3+a,j=!f?this._g:this._c3,e=j?e:d,d=this._x2;this._y2=!0;this._z2=b.pageX;this._a3=b.pageY;"x"===d&&0!==g?
this._d3=0<g?1:-1:"y"===d&&0!==a&&(this._e3=0<a?1:-1);d=j?this._z2:this._a3;g=j?g:a;f?e>this._l3?e=this._f3+g*this._m1:e<this._m3&&(e=this._f3+g*this._m1):this._y||(0>=this.currSlideId&&0<d-this._b3&&(e=this._f3+g*this._m1),this.currSlideId>=this.numSlides-1&&0>d-this._b3&&(e=this._f3+g*this._m1));this._f3=e;200<c-this._h3&&(this._h3=c,this._u=d);f?this._o3(this._f3):this._k&&this._n3(this._f3)}},_v2:function(b,f){var c=this,g;if(c.hasTouch){if(c._p3)return;var a=b.originalEvent.touches;if(a){if(1<
a.length)return;g=a[0]}else return}else g=b,c.msEnabled&&(g=g.originalEvent);c._y2||(c._d&&(!f?c._o1:c._q3).css(c._f+c._t1,"0s"),function d(){c._k2&&(c._r3=requestAnimationFrame(d),c._s3&&c._i3(c._s3,f))}());if(c._j3)b.preventDefault(),c._k3=(new Date).getTime(),c._s3=g;else if(a=!f?c._g:c._c3,g=Math.abs(g.pageX-c._z2)-Math.abs(g.pageY-c._a3)-(a?-7:7),7<g){if(a)b.preventDefault(),c._x2="x";else if(c.hasTouch){c._t3();return}c._j3=!0}else if(-7>g){if(a){if(c.hasTouch){c._t3();return}}else b.preventDefault(),
c._x2="y";c._j3=!0}},_t3:function(){this._p3=!0;this._y2=this._k2=!1;this._w2()},_w2:function(b,f){function c(a){return 100>a?100:500<a?500:a}function g(b,d){if(a._k||f)j=(-a._t-a._c1)*a._v,h=Math.abs(a._o-j),a._b=h/d,b&&(a._b+=250),a._b=c(a._b),a._v3(j,!1)}var a=this,e,d,j,h;a.ev.trigger("rsDragRelease");a._s3=null;a._k2=!1;a._p3=!1;a._j3=!1;a._k3=0;cancelAnimationFrame(a._r3);a._y2&&(f?a._o3(a._f3):a._k&&a._n3(a._f3));a._a.off(a._j1).off(a._k1);a.hasTouch&&a._d1.off(a._l1);a._h1();if(!a._y2&&!a._t2&&
f&&a._u3){var k=l(b.target).closest(".rsNavItem");k.length&&a.goTo(k.index())}else{d=!f?a._g:a._c3;if(!a._y2||"y"===a._x2&&d||"x"===a._x2&&!d)if(!f&&a._r2){a._r2=!1;if(a.st.navigateByClick){a._h2(a.msEnabled?b.originalEvent:b);a.dragSuccess=!0;return}a.dragSuccess=!0}else{a._r2=!1;a.dragSuccess=!1;return}else a.dragSuccess=!0;a._r2=!1;a._x2="";var m=a.st.minSlideOffset;e=a.hasTouch?b.originalEvent.changedTouches[0]:a.msEnabled?b.originalEvent:b;var n=d?e.pageX:e.pageY,p=a._b3;e=a._u;var q=a.currSlideId,
r=a.numSlides,t=d?a._d3:a._e3,u=a._y;Math.abs(n-p);e=n-e;d=(new Date).getTime()-a._h3;d=Math.abs(e)/d;if(0===t||1>=r)g(!0,d);else{if(!u&&!f)if(0>=q){if(0<t){g(!0,d);return}}else if(q>=r-1&&0>t){g(!0,d);return}if(f){j=a._g3;if(j>a._l3)j=a._l3;else if(j<a._m3)j=a._m3;else{m=d*d/0.006;k=-a._g3;n=a._w3-a._x3+a._g3;0<e&&m>k?(k+=a._x3/(15/(0.003*(m/d))),d=d*k/m,m=k):0>e&&m>n&&(n+=a._x3/(15/(0.003*(m/d))),d=d*n/m,m=n);k=Math.max(Math.round(d/0.003),50);j+=m*(0>e?-1:1);if(j>a._l3){a._y3(j,k,!0,a._l3,200);
return}if(j<a._m3){a._y3(j,k,!0,a._m3,200);return}}a._y3(j,k,!0)}else p+m<n?0>t?g(!1,d):a._l2("prev",c(Math.abs(a._o-(-a._t-a._c1+1)*a._v)/d),!1,!0,!0):p-m>n?0<t?g(!1,d):a._l2("next",c(Math.abs(a._o-(-a._t-a._c1-1)*a._v)/d),!1,!0,!0):g(!1,d)}}},_n3:function(b){b=this._o=b;this._d?this._o1.css(this._w1,this._x1+(this._g?b+this._y1+0:0+this._y1+b)+this._z1):this._o1.css(this._g?this._w1:this._v1,b)},updateSliderSize:function(b){var f,c;if(this.st.autoScaleSlider){var g=this.st.autoScaleSliderWidth,
a=this.st.autoScaleSliderHeight;this.st.autoScaleHeight?(f=this.slider.width(),f!=this.width&&(this.slider.css("height",f*(a/g)),f=this.slider.width()),c=this.slider.height()):(c=this.slider.height(),c!=this.height&&(this.slider.css("width",c*(g/a)),c=this.slider.height()),f=this.slider.width())}else f=this.slider.width(),c=this.slider.height();if(b||f!=this.width||c!=this.height){this.width=f;this.height=c;this._z3=f;this._a4=c;this.ev.trigger("rsBeforeSizeSet");this.ev.trigger("rsAfterSizePropSet");
this._d1.css({width:this._z3,height:this._a4});this._v=(this._g?this._z3:this._a4)+this.st.slidesSpacing;this._b4=this.st.imageScalePadding;for(f=0;f<this.slides.length;f++)b=this.slides[f],b.positionSet=!1,b&&(b.images&&b.isLoaded)&&(b.isRendered=!1,this._p2(b));if(this._c4)for(f=0;f<this._c4.length;f++)b=this._c4[f],b.holder.css(this._h,(b.id+this._c1)*this._v);this._m2();this._k&&(this._d&&this._o1.css(this._f+"transition-duration","0s"),this._n3((-this._t-this._c1)*this._v));this.ev.trigger("rsOnUpdateNav")}this._i2=
this._d1.offset();this._i2=this._i2[this._h]},appendSlide:function(b,f){var c=this._r(b);if(isNaN(f)||f>this.numSlides)f=this.numSlides;this.slides.splice(f,0,c);this.slidesJQ.splice(f,0,'<div style="'+(this._k?"position:absolute;":this._m)+'" class="rsSlide"></div>');f<this.currSlideId&&this.currSlideId++;this.ev.trigger("rsOnAppendSlide",[c,f]);this._e4(f);f===this.currSlideId&&this.ev.trigger("rsAfterSlideChange")},removeSlide:function(b){var f=this.slides[b];f&&(f.holder&&f.holder.remove(),b<
this.currSlideId&&this.currSlideId--,this.slides.splice(b,1),this.slidesJQ.splice(b,1),this.ev.trigger("rsOnRemoveSlide",[b]),this._e4(b),b===this.currSlideId&&this.ev.trigger("rsAfterSlideChange"))},_e4:function(){var b=this,f=b.numSlides,f=0>=b._t?0:Math.floor(b._t/f);b.numSlides=b.slides.length;0===b.numSlides?(b.currSlideId=b._c1=b._t=0,b.currSlide=b._f4=null):b._t=f*b.numSlides+b.currSlideId;for(f=0;f<b.numSlides;f++)b.slides[f].id=f;b.currSlide=b.slides[b.currSlideId];b._q1=b.slidesJQ[b.currSlideId];
b.currSlideId>=b.numSlides?b.goTo(b.numSlides-1):0>b.currSlideId&&b.goTo(0);b._s();b._k&&b._y&&b._o1.css(b._f+b._t1,"0ms");b._g4&&clearTimeout(b._g4);b._g4=setTimeout(function(){b._k&&b._n3((-b._t-b._c1)*b._v);b._m2();b._k||b._q1.css({display:"block",opacity:1})},14);b.ev.trigger("rsOnUpdateNav")},_h1:function(){this._e1&&(!this.hasTouch&&this._k)&&(this._f1?this._d1.css("cursor",this._f1):(this._d1.removeClass("grabbing-cursor"),this._d1.addClass("grab-cursor")))},_u2:function(){this._e1&&(!this.hasTouch&&
this._k)&&(this._g1?this._d1.css("cursor",this._g1):(this._d1.removeClass("grab-cursor"),this._d1.addClass("grabbing-cursor")))},next:function(b){this._l2("next",this.st.transitionSpeed,!0,!b)},prev:function(b){this._l2("prev",this.st.transitionSpeed,!0,!b)},_l2:function(b,f,c,g,a){var e=this,d,j,h;e._i4&&e.stopVideo();e.ev.trigger("rsBeforeMove",[b,g]);newItemId="next"===b?e.currSlideId+1:"prev"===b?e.currSlideId-1:b=parseInt(b,10);if(!e._y){if(0>newItemId){e._j4("left",!g);return}if(newItemId>=
e.numSlides){e._j4("right",!g);return}}e._q2&&(e._s2(!0),c=!1);j=newItemId-e.currSlideId;h=e._n2=e.currSlideId;var k=e.currSlideId+j;g=e._t;var m;e._y?(k=e._m2(!1,k),g+=j):g=k;e._n=k;e._f4=e.slidesJQ[e.currSlideId];e._t=g;e.currSlideId=e._n;e.currSlide=e.slides[e.currSlideId];e._q1=e.slidesJQ[e.currSlideId];var k=e.st.slidesDiff,l=Boolean(0<j);j=Math.abs(j);var p=Math.floor(h/e._x),q=Math.floor((h+(l?k:-k))/e._x),p=(l?Math.max(p,q):Math.min(p,q))*e._x+(l?e._x-1:0);p>e.numSlides-1?p=e.numSlides-1:
0>p&&(p=0);h=l?p-h:h-p;h>e._x&&(h=e._x);if(j>h+k){e._c1+=(j-(h+k))*(l?-1:1);f*=1.4;for(h=0;h<e.numSlides;h++)e.slides[h].positionSet=!1}e._b=f;e._m2(!0);a||(m=!0);d=(-g-e._c1)*e._v;m?setTimeout(function(){e._h4=!1;e._v3(d,b,!1,c);e.ev.trigger("rsOnUpdateNav")},0):(e._v3(d,b,!1,c),e.ev.trigger("rsOnUpdateNav"))},_e2:function(){this.st.arrowsNav&&(1>=this.numSlides?(this._b2.css("display","none"),this._c2.css("display","none")):(this._b2.css("display","block"),this._c2.css("display","block"),!this._y&&
!this.st.loopRewind&&(0===this.currSlideId?this._b2.addClass("rsArrowDisabled"):this._b2.removeClass("rsArrowDisabled"),this.currSlideId===this.numSlides-1?this._c2.addClass("rsArrowDisabled"):this._c2.removeClass("rsArrowDisabled"))))},_v3:function(b,f,c,g,a){function e(){var a;if(j&&(a=j.data("rsTimeout")))j!==h&&j.css({opacity:0,display:"none",zIndex:0}),clearTimeout(a),j.data("rsTimeout","");if(a=h.data("rsTimeout"))clearTimeout(a),h.data("rsTimeout","")}var d=this,j,h,k={};isNaN(d._b)&&(d._b=
400);d._o=d._f3=b;d.ev.trigger("rsBeforeAnimStart");d._d?d._k?(d._b=parseInt(d._b),k[d._f+d._t1]=d._b+"ms",k[d._f+d._u1]=g?l.rsCSS3Easing[d.st.easeInOut]:l.rsCSS3Easing[d.st.easeOut],d._o1.css(k),g||!d.hasTouch?setTimeout(function(){d._n3(b)},5):d._n3(b)):(d._b=d.st.transitionSpeed,j=d._f4,h=d._q1,h.data("rsTimeout")&&h.css("opacity",0),e(),j&&j.data("rsTimeout",setTimeout(function(){k[d._f+d._t1]="0ms";k.zIndex=0;k.display="none";j.data("rsTimeout","");j.css(k);setTimeout(function(){j.css("opacity",
0)},16)},d._b+60)),k.display="block",k.zIndex=d._l,k.opacity=0,k[d._f+d._t1]="0ms",k[d._f+d._u1]=l.rsCSS3Easing[d.st.easeInOut],h.css(k),h.data("rsTimeout",setTimeout(function(){h.css(d._f+d._t1,d._b+"ms");h.data("rsTimeout",setTimeout(function(){h.css("opacity",1);h.data("rsTimeout","")},20))},20))):d._k?(k[d._g?d._w1:d._v1]=b+"px",d._o1.animate(k,d._b,g?d.st.easeInOut:d.st.easeOut)):(j=d._f4,h=d._q1,h.stop(!0,!0).css({opacity:0,display:"block",zIndex:d._l}),d._b=d.st.transitionSpeed,h.animate({opacity:1},
d._b,d.st.easeInOut),e(),j&&j.data("rsTimeout",setTimeout(function(){j.stop(!0,!0).css({opacity:0,display:"none",zIndex:0})},d._b+60)));d._q2=!0;d.loadingTimeout&&clearTimeout(d.loadingTimeout);d.loadingTimeout=a?setTimeout(function(){d.loadingTimeout=null;a.call()},d._b+60):setTimeout(function(){d.loadingTimeout=null;d._k4(f)},d._b+60)},_s2:function(b){this._q2=!1;clearTimeout(this.loadingTimeout);if(this._k)if(this._d){if(!b){b=this._o;var f=this._f3=this._l4();this._o1.css(this._f+this._t1,"0ms");
b!==f&&this._n3(f)}}else this._o1.stop(!0),this._o=parseInt(this._o1.css(this._w1),10);else 20<this._l?this._l=10:this._l++},_l4:function(){var b=window.getComputedStyle(this._o1.get(0),null).getPropertyValue(this._f+"transform").replace(/^matrix\(/i,"").split(/, |\)$/g),f=0===b[0].indexOf("matrix3d");return parseInt(b[this._g?f?12:4:f?13:5],10)},_m4:function(b,f){return this._d?this._x1+(f?b+this._y1+0:0+this._y1+b)+this._z1:b},_k4:function(){this._k||(this._q1.css("z-index",0),this._l=10);this._q2=
!1;this.staticSlideId=this.currSlideId;this._m2();this._n4=!1;this.ev.trigger("rsAfterSlideChange")},_j4:function(b,f){var c=this,g=(-c._t-c._c1)*c._v;if(!(0===c.numSlides||c._q2))if(c.st.loopRewind)c.goTo("left"===b?c.numSlides-1:0,f);else if(c._k){c._b=200;var a=function(){c._q2=!1};c._v3(g+("left"===b?30:-30),"",!1,!0,function(){c._q2=!1;c._v3(g,"",!1,!0,a)})}},_p2:function(b){if(!b.isRendered){var f=b.content,c="rsMainSlideImage",g,a=this.st.imageAlignCenter,e=this.st.imageScaleMode,d;b.videoURL&&
(c="rsVideoContainer","fill"!==e?g=!0:(d=f,d.hasClass(c)||(d=d.find("."+c)),d.css({width:"100%",height:"100%"}),c="rsMainSlideImage"));f.hasClass(c)||(f=f.find("."+c));if(f){var j=b.iW,c=b.iH;b.isRendered=!0;if("none"!==e||a){bMargin="fill"!==e?this._b4:0;b=this._z3-2*bMargin;d=this._a4-2*bMargin;var h,k,l={};if("fit-if-smaller"===e&&(j>b||c>d))e="fit";if("fill"===e||"fit"===e)h=b/j,k=d/c,h="fill"==e?h>k?h:k:"fit"==e?h<k?h:k:1,j=Math.ceil(j*h,10),c=Math.ceil(c*h,10);"none"!==e&&(l.width=j,l.height=
c,g&&f.find(".rsImg").css({width:"100%",height:"100%"}));a&&(l.marginLeft=Math.floor((b-j)/2)+bMargin,l.marginTop=Math.floor((d-c)/2)+bMargin);f.css(l)}}}}};l.rsProto=v.prototype;l.fn.royalSlider=function(b){var f=arguments;return this.each(function(){var c=l(this);if("object"===typeof b||!b)c.data("royalSlider")||c.data("royalSlider",new v(c,b));else if((c=c.data("royalSlider"))&&c[b])return c[b].apply(c,Array.prototype.slice.call(f,1))})};l.fn.royalSlider.defaults={slidesSpacing:8,startSlideId:0,
loop:!1,loopRewind:!1,numImagesToPreload:4,fadeinLoadedSlide:!0,slidesOrientation:"horizontal",transitionType:"move",transitionSpeed:600,controlNavigation:"bullets",controlsInside:!0,arrowsNav:!0,arrowsNavAutoHide:!0,navigateByClick:!0,randomizeSlides:!1,sliderDrag:!0,sliderTouch:!0,keyboardNavEnabled:!1,fadeInAfterLoaded:!0,allowCSS3:!0,allowCSS3OnWebkit:!0,addActiveClass:!1,autoHeight:!1,easeOut:"easeOutSine",easeInOut:"easeInOutSine",minSlideOffset:10,imageScaleMode:"fit-if-smaller",imageAlignCenter:!0,
imageScalePadding:4,usePreloader:!0,autoScaleSlider:!1,autoScaleSliderWidth:800,autoScaleSliderHeight:400,autoScaleHeight:!0,arrowsNavHideOnTouch:!1,globalCaption:!1,slidesDiff:2};l.rsCSS3Easing={easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)"};l.extend(jQuery.easing,{easeInOutSine:function(b,f,c,g,a){return-g/2*(Math.cos(Math.PI*f/a)-1)+c},easeOutSine:function(b,f,c,g,a){return g*Math.sin(f/a*(Math.PI/2))+c},easeOutCubic:function(b,
f,c,g,a){return g*((f=f/a-1)*f*f+1)+c}})})(jQuery,window);
// jquery.rs.active-class v1.0.1
(function(c){c.rsProto._o4=function(){var b,a=this;if(a.st.addActiveClass)a.ev.on("rsOnUpdateNav",function(){b&&clearTimeout(b);b=setTimeout(function(){a._f4&&a._f4.removeClass("rsActiveSlide");a._q1&&a._q1.addClass("rsActiveSlide");b=null},50)})};c.rsModules.activeClass=c.rsProto._o4})(jQuery);
// jquery.rs.animated-blocks v1.0.2
(function(j){j.extend(j.rsProto,{_p4:function(){function k(){var e=a.currSlide;if(a.currSlide&&a.currSlide.isLoaded&&a._t4!==e){if(0<a._s4.length){for(b=0;b<a._s4.length;b++)clearTimeout(a._s4[b]);a._s4=[]}if(0<a._r4.length){var g;for(b=0;b<a._r4.length;b++)if(g=a._r4[b])a._d?(g.block.css(a._f+a._t1,"0s"),g.block.css(g.css)):g.running?g.block.stop(!0,!0):g.block.css(g.css),a._t4=null,e.animBlocksDisplayed=!1;a._r4=[]}e.animBlocks&&(e.animBlocksDisplayed=!0,a._t4=e,a._u4(e.animBlocks))}}var a=this,
b;a._q4={fadeEffect:!0,moveEffect:"top",moveOffset:20,speed:400,easing:"easeOutSine",delay:200};a.st.block=j.extend({},a._q4,a.st.block);a._r4=[];a._s4=[];a.ev.on("rsAfterInit",function(){k()});a.ev.on("rsBeforeParseNode",function(a,b,c){b=j(b);c.animBlocks=b.find(".rsABlock").css("display","none");c.animBlocks.length||(c.animBlocks=b.hasClass("rsABlock")?b.css("display","none"):!1)});a.ev.on("rsAfterContentSet",function(b,g){g.id===a.currSlideId&&setTimeout(function(){k()},a.st.fadeinLoadedSlide?
300:0)});a.ev.on("rsAfterSlideChange",function(){k()})},_v4:function(j,a){setTimeout(function(){j.css(a)},6)},_u4:function(k){var a=this,b,e,g,c;a._s4=[];k.each(function(k){b=j(this);e={};g={};c=null;var f=b.data("move-offset");isNaN(f)&&(f=a.st.block.moveOffset);if(0<f){var d=b.data("move-effect");d?(d=d.toLowerCase(),"none"===d?d=!1:"left"!==d&&("top"!==d&&"bottom"!==d&&"right"!==d)&&(d=a.st.block.moveEffect,"none"===d&&(d=!1))):d=a.st.block.moveEffect;if(d){var m;m="right"===d||"left"===d?!0:!1;
var l,h;isOppositeProp=!1;a._d?(l=0,h=a._w1):(m?isNaN(parseInt(b.css("right"),10))?h="left":(h="right",isOppositeProp=!0):isNaN(parseInt(b.css("bottom"),10))?h="top":(h="bottom",isOppositeProp=!0),h="margin-"+h,isOppositeProp&&(f=-f),l=parseInt(b.css(h),10));g[h]=a._m4("top"===d||"left"===d?l-f:l+f,m);e[h]=a._m4(l,m)}}if(f=b.attr("data-fade-effect")){if("none"===f.toLowerCase()||"false"===f.toLowerCase())f=!1}else f=a.st.block.fadeEffect;f&&(g.opacity=0,e.opacity=1);if(f||d)c={},c.hasFade=Boolean(f),
Boolean(d)&&(c.moveProp=h,c.hasMove=!0),c.speed=b.data("speed"),isNaN(c.speed)&&(c.speed=a.st.block.speed),c.easing=b.data("easing"),c.easing||(c.easing=a.st.block.easing),c.css3Easing=j.rsCSS3Easing[c.easing],c.delay=b.data("delay"),isNaN(c.delay)&&(c.delay=a.st.block.delay*k);d={};a._d&&(d[a._f+a._t1]="0ms");d.moveProp=e.moveProp;d.opacity=e.opacity;d.display="none";a._r4.push({block:b,css:d});a._v4(b,g);a._s4.push(setTimeout(function(b,d,c,g){return function(){b.css("display","block");if(c){var f=
{};if(a._d){var e="";c.hasMove&&(e+=c.moveProp);c.hasFade&&(c.hasMove&&(e+=", "),e+="opacity");f[a._f+a._s1]=e;f[a._f+a._t1]=c.speed+"ms";f[a._f+a._u1]=c.css3Easing;b.css(f);setTimeout(function(){b.css(d)},24)}else setTimeout(function(){b.animate(d,c.speed,c.easing)},16)}delete a._s4[g]}}(b,e,c,k),6>=c.delay?12:c.delay))})}});j.rsModules.animatedBlocks=j.rsProto._p4})(jQuery);
// jquery.rs.auto-height v1.0.2
(function(b){b.extend(b.rsProto,{_w4:function(){var a=this;if(a.st.autoHeight){var b,d,e,c=function(c){e=a.slides[a.currSlideId];if(b=e.holder)if((d=b.height())&&void 0!==d)a._a4=d,a._d||!c?a._d1.css("height",d):a._d1.stop(!0,!0).animate({height:d},a.st.transitionSpeed)};a.ev.on("rsMaybeSizeReady.rsAutoHeight",function(a,b){e===b&&c()});a.ev.on("rsAfterContentSet.rsAutoHeight",function(a,b){e===b&&c()});a.slider.addClass("rsAutoHeight");a.ev.one("rsAfterInit",function(){setTimeout(function(){c(!1);
setTimeout(function(){a.slider.append('<div style="clear:both; float: none;"></div>');a._d&&a._d1.css(a._f+"transition","height "+a.st.transitionSpeed+"ms ease-in-out")},16)},16)});a.ev.on("rsBeforeAnimStart",function(){c(!0)});a.ev.on("rsBeforeSizeSet",function(){setTimeout(function(){c(!1)},16)})}}});b.rsModules.autoHeight=b.rsProto._w4})(jQuery);
// jquery.rs.autoplay v1.0.4
(function(b){b.extend(b.rsProto,{_x4:function(){var a=this,d;a._y4={enabled:!1,stopAtAction:!0,pauseOnHover:!0,delay:2E3};!a.st.autoPlay&&a.st.autoplay&&(a.st.autoPlay=a.st.autoplay);a.st.autoPlay=b.extend({},a._y4,a.st.autoPlay);a.st.autoPlay.enabled&&(a.ev.on("rsBeforeParseNode",function(a,c,e){c=b(c);if(d=c.attr("data-rsDelay"))e.customDelay=parseInt(d,10)}),a.ev.one("rsAfterInit",function(){a._z4()}),a.ev.on("rsBeforeDestroy",function(){a.stopAutoPlay()}))},_z4:function(){var a=this;a.startAutoPlay();
a.ev.on("rsAfterContentSet",function(d,b){!a._k2&&(!a._q2&&a._a5&&b===a.currSlide)&&a._b5()});a.ev.on("rsDragRelease",function(){a._a5&&a._c5&&(a._c5=!1,a._b5())});a.ev.on("rsAfterSlideChange",function(){a._a5&&a._c5&&(a._c5=!1,a.currSlide.isLoaded&&a._b5())});a.ev.on("rsDragStart",function(){a._a5&&(a.st.autoPlay.stopAtAction?a.stopAutoPlay():(a._c5=!0,a._d5()))});a.ev.on("rsBeforeMove",function(b,f,c){a._a5&&(c&&a.st.autoPlay.stopAtAction?a.stopAutoPlay():(a._c5=!0,a._d5()))});a._e5=!1;a.ev.on("rsVideoStop",
function(){a._a5&&(a._e5=!1,a._b5())});a.ev.on("rsVideoPlay",function(){a._a5&&(a._c5=!1,a._d5(),a._e5=!0)});a.st.autoPlay.pauseOnHover&&(a._f5=!1,a.slider.hover(function(){a._a5&&(a._c5=!1,a._d5(),a._f5=!0)},function(){a._a5&&(a._f5=!1,a._b5())}))},toggleAutoPlay:function(){this._a5?this.stopAutoPlay():this.startAutoPlay()},startAutoPlay:function(){this._a5=!0;this.currSlide.isLoaded&&this._b5()},stopAutoPlay:function(){this._e5=this._f5=this._c5=this._a5=!1;this._d5()},_b5:function(){var a=this;
!a._f5&&!a._e5&&(a._g5=!0,a._h5&&clearTimeout(a._h5),a._h5=setTimeout(function(){var b;!a._y&&!a.st.loopRewind&&(b=!0,a.st.loopRewind=!0);a.next(!0);b&&(a.st.loopRewind=!1)},!a.currSlide.customDelay?a.st.autoPlay.delay:a.currSlide.customDelay))},_d5:function(){!this._f5&&!this._e5&&(this._g5=!1,this._h5&&(clearTimeout(this._h5),this._h5=null))}});b.rsModules.autoplay=b.rsProto._x4})(jQuery);
// jquery.rs.bullets v1.0.1
(function(c){c.extend(c.rsProto,{_i5:function(){var a=this;"bullets"===a.st.controlNavigation&&(a.ev.one("rsAfterPropsSetup",function(){a._j5=!0;a.slider.addClass("rsWithBullets");for(var b='<div class="rsNav rsBullets">',e=0;e<a.numSlides;e++)b+='<div class="rsNavItem rsBullet"><span></span></div>';a._k5=b=c(b+"</div>");a._l5=b.appendTo(a.slider).children();a._k5.on("click.rs",".rsNavItem",function(){a._m5||a.goTo(c(this).index())})}),a.ev.on("rsOnAppendSlide",function(b,c,d){d>=a.numSlides?a._k5.append('<div class="rsNavItem rsBullet"><span></span></div>'):
a._l5.eq(d).before('<div class="rsNavItem rsBullet"><span></span></div>');a._l5=a._k5.children()}),a.ev.on("rsOnRemoveSlide",function(b,c){var d=a._l5.eq(c);d&&d.length&&(d.remove(),a._l5=a._k5.children())}),a.ev.on("rsOnUpdateNav",function(){var b=a.currSlideId;a._n5&&a._n5.removeClass("rsNavSelected");b=c(a._l5[b]);b.addClass("rsNavSelected");a._n5=b}))}});c.rsModules.bullets=c.rsProto._i5})(jQuery);
// jquery.rs.deeplinking v1.0.4 + jQuery hashchange plugin v1.3 Copyright (c) 2010
(function(a){a.extend(a.rsProto,{_o5:function(){var b=this,g,c,e;b._p5={enabled:!1,change:!1,prefix:""};b.st.deeplinking=a.extend({},b._p5,b.st.deeplinking);if(b.st.deeplinking.enabled){var h=b.st.deeplinking.change,d="#"+b.st.deeplinking.prefix,f=function(){var a=window.location.hash;return a&&(a=parseInt(a.substring(d.length),10),0<=a)?a-1:-1},j=f();-1!==j&&(b.st.startSlideId=j);h&&(a(window).on("hashchange.rs",function(){if(!g){var a=f();0>a||(a>b.numSlides-1&&(a=b.numSlides-1),b.goTo(a))}}),b.ev.on("rsBeforeAnimStart",
function(){c&&clearTimeout(c);e&&clearTimeout(e)}),b.ev.on("rsAfterSlideChange",function(){c&&clearTimeout(c);e&&clearTimeout(e);e=setTimeout(function(){g=!0;window.location.hash=d+(b.currSlideId+1);c=setTimeout(function(){g=!1;c=null},60)},400)}));b.ev.on("rsBeforeDestroy",function(){c=e=null;h&&a(window).off("hashchange.rs")})}}});a.rsModules.deeplinking=a.rsProto._o5})(jQuery);
(function(a,b,g){function c(a){a=a||location.href;return"#"+a.replace(/^[^#]*#?(.*)$/,"$1")}"$:nomunge";var e=document,h,d=a.event.special,f=e.documentMode,j="onhashchange"in b&&(f===g||7<f);a.fn.hashchange=function(a){return a?this.bind("hashchange",a):this.trigger("hashchange")};a.fn.hashchange.delay=50;d.hashchange=a.extend(d.hashchange,{setup:function(){if(j)return!1;a(h.start)},teardown:function(){if(j)return!1;a(h.stop)}});var p=function(){var e=c(),d=r(n);e!==n?(q(n=e,d),a(b).trigger("hashchange")):
d!==n&&(location.href=location.href.replace(/#.*/,"")+d);l=setTimeout(p,a.fn.hashchange.delay)},d={},l,n=c(),q=f=function(a){return a},r=f;d.start=function(){l||p()};d.stop=function(){l&&clearTimeout(l);l=g};if(a.browser.msie&&!j){var k,m;d.start=function(){k||(m=(m=a.fn.hashchange.src)&&m+c(),k=a('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){m||q(c());p()}).attr("src",m||"javascript:0").insertAfter("body")[0].contentWindow,e.onpropertychange=function(){try{"title"===event.propertyName&&
(k.document.title=e.title)}catch(a){}})};d.stop=f;r=function(){return c(k.location.href)};q=function(b,d){var c=k.document,f=a.fn.hashchange.domain;b!==d&&(c.title=e.title,c.open(),f&&c.write('<script>document.domain="'+f+'"\x3c/script>'),c.close(),k.location.hash=b)}}h=d})(jQuery,this);
// jquery.rs.fullscreen v1.0.3
(function(c){c.extend(c.rsProto,{_q5:function(){var a=this;a._r5={enabled:!1,keyboardNav:!0,buttonFS:!0,nativeFS:!1,doubleTap:!0};a.st.fullscreen=c.extend({},a._r5,a.st.fullscreen);if(a.st.fullscreen.enabled)a.ev.one("rsBeforeSizeSet",function(){a._s5()})},_s5:function(){var a=this;a._t5=!a.st.keyboardNavEnabled&&a.st.fullscreen.keyboardNav;if(a.st.fullscreen.nativeFS){a._u5={supportsFullScreen:!1,isFullScreen:function(){return!1},requestFullScreen:function(){},cancelFullScreen:function(){},fullScreenEventName:"",
prefix:""};var b=["webkit","moz","o","ms","khtml"];if("undefined"!=typeof document.cancelFullScreen)a._u5.supportsFullScreen=!0;else for(var d=0;d<b.length;d++)if(a._u5.prefix=b[d],"undefined"!=typeof document[a._u5.prefix+"CancelFullScreen"]){a._u5.supportsFullScreen=!0;break}a._u5.supportsFullScreen?(a.nativeFS=!0,a._u5.fullScreenEventName=a._u5.prefix+"fullscreenchange.rs",a._u5.isFullScreen=function(){switch(this.prefix){case "":return document.fullScreen;case "webkit":return document.webkitIsFullScreen;
default:return document[this.prefix+"FullScreen"]}},a._u5.requestFullScreen=function(a){return""===this.prefix?a.requestFullScreen():a[this.prefix+"RequestFullScreen"]()},a._u5.cancelFullScreen=function(){return""===this.prefix?document.cancelFullScreen():document[this.prefix+"CancelFullScreen"]()}):a._u5=!1}a.st.fullscreen.buttonFS&&(a._v5=c('<div class="rsFullscreenBtn"><div class="rsFullscreenIcn"></div></div>').appendTo(a._n1).on("click.rs",function(){a.isFullscreen?a.exitFullscreen():a.enterFullscreen()}))},
enterFullscreen:function(a){var b=this;if(b._u5)if(a)b._u5.requestFullScreen(c("html")[0]);else{b._a.on(b._u5.fullScreenEventName,function(){b._u5.isFullScreen()?b.enterFullscreen(!0):b.exitFullscreen(!0)});b._u5.requestFullScreen(c("html")[0]);return}if(!b._w5){b._w5=!0;b._a.on("keyup.rsfullscreen",function(a){27===a.keyCode&&b.exitFullscreen()});b._t5&&b._a2();a=c(window);b._x5=a.scrollTop();b._y5=a.scrollLeft();b._z5=c("html").attr("style");b._a6=c("body").attr("style");b._b6=b.slider.attr("style");
c("body, html").css({overflow:"hidden",height:"100%",width:"100%",margin:"0",padding:"0"});b.slider.addClass("rsFullscreen");var d;for(d=0;d<b.numSlides;d++)a=b.slides[d],a.isRendered=!1,a.bigImage&&(a.isBig=!0,a.isMedLoaded=a.isLoaded,a.isMedLoading=a.isLoading,a.medImage=a.image,a.medIW=a.iW,a.medIH=a.iH,a.slideId=-99,a.bigImage!==a.medImage&&(a.sizeType="big"),a.isLoaded=a.isBigLoaded,a.isLoading=!1,a.image=a.bigImage,a.images[0]=a.bigImage,a.iW=a.bigIW,a.iH=a.bigIH,a.isAppended=a.contentAdded=
!1,b._c6(a));b.isFullscreen=!0;b._w5=!1;b.updateSliderSize();b.ev.trigger("rsEnterFullscreen")}},exitFullscreen:function(a){var b=this;if(b._u5){if(!a){b._u5.cancelFullScreen(c("html")[0]);return}b._a.off(b._u5.fullScreenEventName)}if(!b._w5){b._w5=!0;b._a.off("keyup.rsfullscreen");b._t5&&b._a.off("keydown.rskb");c("html").attr("style",b._z5||"");c("body").attr("style",b._a6||"");var d;for(d=0;d<b.numSlides;d++)a=b.slides[d],a.isRendered=!1,a.bigImage&&(a.isBig=!1,a.slideId=-99,a.isBigLoaded=a.isLoaded,
a.isBigLoading=a.isLoading,a.bigImage=a.image,a.bigIW=a.iW,a.bigIH=a.iH,a.isLoaded=a.isMedLoaded,a.isLoading=!1,a.image=a.medImage,a.images[0]=a.medImage,a.iW=a.medIW,a.iH=a.medIH,a.isAppended=a.contentAdded=!1,b._c6(a,!0),a.bigImage!==a.medImage&&(a.sizeType="med"));b.isFullscreen=!1;a=c(window);a.scrollTop(b._x5);a.scrollLeft(b._y5);b._w5=!1;b.slider.removeClass("rsFullscreen");b.updateSliderSize();setTimeout(function(){b.updateSliderSize()},1);b.ev.trigger("rsExitFullscreen")}},_c6:function(a){var b=
!a.isLoaded&&!a.isLoading?'<a class="rsImg rsMainSlideImage" href="'+a.image+'"></a>':'<img class="rsImg rsMainSlideImage" src="'+a.image+'"/>';a.content.hasClass("rsImg")?a.content=c(b):a.content.find(".rsImg").eq(0).replaceWith(b);!a.isLoaded&&(!a.isLoading&&a.holder)&&a.holder.html(a.content)}});c.rsModules.fullscreen=c.rsProto._q5})(jQuery);
// jquery.rs.global-caption v1.0
(function(b){b.extend(b.rsProto,{_d6:function(){var a=this;a.st.globalCaption&&(a.ev.on("rsAfterInit",function(){a.globalCaption=b('<div class="rsGCaption"></div>').appendTo(!a.st.globalCaptionInside?a.slider:a._d1);a.globalCaption.html(a.currSlide.caption)}),a.ev.on("rsBeforeAnimStart",function(){a.globalCaption.html(a.currSlide.caption)}))}});b.rsModules.globalCaption=b.rsProto._d6})(jQuery);
// jquery.rs.nav-auto-hide v1.0
(function(b){b.extend(b.rsProto,{_e6:function(){var a=this;if(a.st.navAutoHide&&!a.hasTouch)a.ev.one("rsAfterInit",function(){if(a._k5){a._k5.addClass("rsHidden");var b=a.slider;b.one("mousemove.controlnav",function(){a._k5.removeClass("rsHidden")});b.hover(function(){a._k5.removeClass("rsHidden")},function(){a._k5.addClass("rsHidden")})}})}});b.rsModules.autoHideNav=b.rsProto._e6})(jQuery);
// jquery.rs.tabs v1.0.1
(function(e){e.extend(e.rsProto,{_f6:function(){var a=this;"tabs"===a.st.controlNavigation&&(a.ev.on("rsBeforeParseNode",function(a,d,b){d=e(d);b.thumbnail=d.find(".rsTmb").remove();b.thumbnail.length?b.thumbnail=e(document.createElement("div")).append(b.thumbnail).html():(b.thumbnail=d.attr("data-rsTmb"),b.thumbnail||(b.thumbnail=d.find(".rsImg").attr("data-rsTmb")),b.thumbnail=b.thumbnail?'<img src="'+b.thumbnail+'"/>':"")}),a.ev.one("rsAfterPropsSetup",function(){a._g6()}),a.ev.on("rsOnAppendSlide",
function(c,d,b){b>=a.numSlides?a._k5.append('<div class="rsNavItem rsTab">'+d.thumbnail+"</div>"):a._l5.eq(b).before('<div class="rsNavItem rsTab">'+item.thumbnail+"</div>");a._l5=a._k5.children()}),a.ev.on("rsOnRemoveSlide",function(c,d){var b=a._l5.eq(d);b&&(b.remove(),a._l5=a._k5.children())}),a.ev.on("rsOnUpdateNav",function(){var c=a.currSlideId;a._n5&&a._n5.removeClass("rsNavSelected");c=e(a._l5[c]);c.addClass("rsNavSelected");a._n5=c}))},_g6:function(){var a=this,c,d;a._j5=!0;c='<div class="rsNav rsTabs">';
for(var b=0;b<a.numSlides;b++)b===a.numSlides-1&&(style=""),d=a.slides[b],c+='<div class="rsNavItem rsTab">'+d.thumbnail+"</div>";c=e(c+"</div>");a._k5=c;a._l5=c.find(".rsNavItem");a.slider.append(c);a._k5.click(function(b){b=e(b.target).closest(".rsNavItem");b.length&&a.goTo(b.index())})}});e.rsModules.tabs=e.rsProto._f6})(jQuery);
// jquery.rs.thumbnails v1.0.5
(function(f){f.extend(f.rsProto,{_h6:function(){var a=this;"thumbnails"===a.st.controlNavigation&&(a._i6={drag:!0,touch:!0,orientation:"horizontal",navigation:!0,arrows:!0,arrowLeft:null,arrowRight:null,spacing:4,arrowsAutoHide:!1,appendSpan:!1,transitionSpeed:600,autoCenter:!0,fitInViewport:!0,firstMargin:!0,paddingTop:0,paddingBottom:0},a.st.thumbs=f.extend({},a._i6,a.st.thumbs),a._j6=!0,!1===a.st.thumbs.firstMargin?a.st.thumbs.firstMargin=0:!0===a.st.thumbs.firstMargin&&(a.st.thumbs.firstMargin=
a.st.thumbs.spacing),a.ev.on("rsBeforeParseNode",function(a,c,b){c=f(c);b.thumbnail=c.find(".rsTmb").remove();b.thumbnail.length?b.thumbnail=f(document.createElement("div")).append(b.thumbnail).html():(b.thumbnail=c.attr("data-rsTmb"),b.thumbnail||(b.thumbnail=c.find(".rsImg").attr("data-rsTmb")),b.thumbnail=b.thumbnail?'<img src="'+b.thumbnail+'"/>':"")}),a.ev.one("rsAfterPropsSetup",function(){a._k6()}),a._n5=null,a.ev.on("rsOnUpdateNav",function(){var e=f(a._l5[a.currSlideId]);e!==a._n5&&(a._n5&&
(a._n5.removeClass("rsNavSelected"),a._n5=null),a._l6&&a._m6(a.currSlideId),a._n5=e.addClass("rsNavSelected"))}),a.ev.on("rsOnAppendSlide",function(e,c,b){e="<div"+a._n6+' class="rsNavItem rsThumb">'+a._o6+c.thumbnail+"</div>";b>=a.numSlides?a._q3.append(e):a._l5.eq(b).before(e);a._l5=a._q3.children();a.updateThumbsSize()}),a.ev.on("rsOnRemoveSlide",function(e,c){var b=a._l5.eq(c);b&&(b.remove(),a._l5=a._q3.children(),a.updateThumbsSize())}))},_k6:function(){var a=this,e="rsThumbs",c=a.st.thumbs,
b="",g,d,h=c.spacing;a._j5=!0;a._c3="vertical"===c.orientation?!1:!0;a._n6=g=h?' style="margin-'+(a._c3?"right":"bottom")+":"+h+'px;"':"";a._g3=0;a._p6=!1;a._m5=!1;a._l6=!1;a._q6=c.arrows&&c.navigation;d=a._c3?"Hor":"Ver";a.slider.addClass("rsWithThumbs rsWithThumbs"+d);b+='<div class="rsNav rsThumbs rsThumbs'+d+'"><div class="'+e+'Container">';a._o6=c.appendSpan?'<span class="thumbIco"></span>':"";for(var j=0;j<a.numSlides;j++)d=a.slides[j],b+="<div"+g+' class="rsNavItem rsThumb">'+d.thumbnail+a._o6+
"</div>";b=f(b+"</div></div>");g={};c.paddingTop&&(g[a._c3?"paddingTop":"paddingLeft"]=c.paddingTop);c.paddingBottom&&(g[a._c3?"paddingBottom":"paddingRight"]=c.paddingBottom);b.css(g);a._q3=f(b).find("."+e+"Container");a._q6&&(e+="Arrow",c.arrowLeft?a._r6=c.arrowLeft:(a._r6=f('<div class="'+e+" "+e+'Left"><div class="'+e+'Icn"></div></div>'),b.append(a._r6)),c.arrowRight?a._s6=c.arrowRight:(a._s6=f('<div class="'+e+" "+e+'Right"><div class="'+e+'Icn"></div></div>'),b.append(a._s6)),a._r6.click(function(){var b=
(Math.floor(a._g3/a._t6)+a._u6)*a._t6;a._y3(b>a._l3?a._l3:b)}),a._s6.click(function(){var b=(Math.floor(a._g3/a._t6)-a._u6)*a._t6;a._y3(b<a._m3?a._m3:b)}),c.arrowsAutoHide&&!a.hasTouch&&(a._r6.css("opacity",0),a._s6.css("opacity",0),b.one("mousemove.rsarrowshover",function(){a._l6&&(a._r6.css("opacity",1),a._s6.css("opacity",1))}),b.hover(function(){a._l6&&(a._r6.css("opacity",1),a._s6.css("opacity",1))},function(){a._l6&&(a._r6.css("opacity",0),a._s6.css("opacity",0))})));a._k5=b;a._l5=a._q3.children();
a.msEnabled&&a.st.thumbs.navigation&&a._q3.css("-ms-touch-action",a._c3?"pan-y":"pan-x");a.slider.append(b);a._u3=!0;a._v6=h;c.navigation&&a._d&&a._q3.css(a._f+"transition-property",a._f+"transform");a._k5.on("click.rs",".rsNavItem",function(){a._m5||a.goTo(f(this).index())});a.ev.off("rsBeforeSizeSet.thumbs").on("rsBeforeSizeSet.thumbs",function(){a._w6=a._c3?a._a4:a._z3;a.updateThumbsSize(!0)})},updateThumbsSize:function(){var a=this,e=a._l5.first(),c={},b=a._l5.length;a._t6=(a._c3?e.outerWidth():
e.outerHeight())+a._v6;a._w3=b*a._t6-a._v6;c[a._c3?"width":"height"]=a._w3+a._v6;a._x3=a._c3?a._k5.width():a._k5.height();a._m3=-(a._w3-a._x3)-a.st.thumbs.firstMargin;a._l3=a.st.thumbs.firstMargin;a._u6=Math.floor(a._x3/a._t6);if(a._w3<a._x3)a.st.thumbs.autoCenter&&a._o3((a._x3-a._w3)/2),a.st.thumbs.arrows&&a._r6&&(a._r6.addClass("rsThumbsArrowDisabled"),a._s6.addClass("rsThumbsArrowDisabled")),a._l6=!1,a._m5=!1,a._k5.off(a._i1);else if(a.st.thumbs.navigation&&!a._l6&&(a._l6=!0,!a.hasTouch&&a.st.thumbs.drag||
a.hasTouch&&a.st.thumbs.touch))a._m5=!0,a._k5.on(a._i1,function(b){a._f2(b,!0)});a._d&&(c[a._f+"transition-duration"]="0ms");a._q3.css(c);if(a._u3&&(a.isFullscreen||a.st.thumbs.fitInViewport))a._c3?a._a4=a._w6-a._k5.outerHeight():a._z3=a._w6-a._k5.outerWidth()},setThumbsOrientation:function(a,e){this._u3&&(this.st.thumbs.orientation=a,this._k5.remove(),this.slider.removeClass("rsWithThumbsHor rsWithThumbsVer"),this._k6(),this._k5.off(this._i1),e||this.updateSliderSize(!0))},_o3:function(a){this._g3=
a;this._d?this._q3.css(this._w1,this._x1+(this._c3?a+this._y1+0:0+this._y1+a)+this._z1):this._q3.css(this._c3?this._w1:this._v1,a)},_y3:function(a,e,c,b,g){var d=this;if(d._l6){e||(e=d.st.thumbs.transitionSpeed);d._g3=a;d._x6&&clearTimeout(d._x6);d._p6&&(d._d||d._q3.stop(),c=!0);var h={};d._p6=!0;d._d?(h[d._f+"transition-duration"]=e+"ms",h[d._f+"transition-timing-function"]=c?f.rsCSS3Easing[d.st.easeOut]:f.rsCSS3Easing[d.st.easeInOut],d._q3.css(h),d._o3(a)):(h[d._c3?d._w1:d._v1]=a+"px",d._q3.animate(h,
e,c?"easeOutCubic":d.st.easeInOut));b&&(d._g3=b);d._y6();d._x6=setTimeout(function(){d._p6=!1;g&&(d._y3(b,g,!0),g=null)},e)}},_y6:function(){this._q6&&(this._g3===this._l3?this._r6.addClass("rsThumbsArrowDisabled"):this._r6.removeClass("rsThumbsArrowDisabled"),this._g3===this._m3?this._s6.addClass("rsThumbsArrowDisabled"):this._s6.removeClass("rsThumbsArrowDisabled"))},_m6:function(a,e){var c=0,b,f=a*this._t6+2*this._t6-this._v6+this._l3,d=Math.floor(this._g3/this._t6);this._l6&&(this._j6&&(e=!0,
this._j6=!1),f+this._g3>this._x3?(a===this.numSlides-1&&(c=1),d=-a+this._u6-2+c,b=d*this._t6+this._x3%this._t6+this._v6-this._l3):0!==a?(a-1)*this._t6<=-this._g3+this._l3&&a-1<=this.numSlides-this._u6&&(b=(-a+1)*this._t6+this._l3):b=this._l3,b!==this._g3&&(c=void 0===b?this._g3:b,c>this._l3?this._o3(this._l3):c<this._m3?this._o3(this._m3):void 0!==b&&(e?this._o3(b):this._y3(b))),this._y6())}});f.rsModules.thumbnails=f.rsProto._h6})(jQuery);
// jquery.rs.video v1.0.8
(function(e){e.extend(e.rsProto,{_z6:function(){var a=this;a._a7={autoHideArrows:!0,autoHideControlNav:!1,autoHideBlocks:!1,autoHideCaption:!1,youTubeCode:'<iframe src="http://www.youtube.com/embed/%id%?rel=1&autoplay=1&showinfo=0&autoplay=1&wmode=transparent" frameborder="no"></iframe>',vimeoCode:'<iframe src="http://player.vimeo.com/video/%id%?byline=0&amp;portrait=0&amp;autoplay=1" frameborder="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'};a.st.video=e.extend({},a._a7,
a.st.video);a.ev.on("rsBeforeSizeSet",function(){a._i4&&setTimeout(function(){var b=a._q1,b=b.hasClass("rsVideoContainer")?b:b.find(".rsVideoContainer");a._b7&&a._b7.css({width:b.width(),height:b.height()})},32)});var c=e.browser.mozilla;a.ev.on("rsAfterParseNode",function(b,f,d){b=e(f);if(d.videoURL){c&&(a._d=a._e=!1);f=e('<div class="rsVideoContainer"></div>');var g=e('<div class="rsBtnCenterer"><div class="rsPlayBtn"><div class="rsPlayBtnIcon"></div></div></div>');b.hasClass("rsImg")?d.content=
f.append(b).append(g):d.content.find(".rsImg").wrap(f).after(g)}})},toggleVideo:function(){return this._i4?this.stopVideo():this.playVideo()},playVideo:function(){var a=this;if(!a._i4){var c=a.currSlide;if(!c.videoURL)return!1;var b=a._c7=c.content,c=c.videoURL,f,d;c.match(/youtu\.be/i)||c.match(/youtube\.com/i)?(d=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,(d=c.match(d))&&11==d[7].length&&(f=d[7]),void 0!==f&&(a._b7=a.st.video.youTubeCode.replace("%id%",f))):c.match(/vimeo\.com/i)&&
(d=/(www\.)?vimeo.com\/(\d+)($|\/)/,(d=c.match(d))&&(f=d[2]),void 0!==f&&(a._b7=a.st.video.vimeoCode.replace("%id%",f)));a.videoObj=e(a._b7);a.ev.trigger("rsOnCreateVideoElement",[c]);a.videoObj.length&&(a._b7=e('<div class="rsVideoFrameHolder"><div class="rsPreloader"></div><div class="rsCloseVideoBtn"><div class="rsCloseVideoIcn"></div></div></div>'),a._b7.find(".rsPreloader").after(a.videoObj),b=b.hasClass("rsVideoContainer")?b:b.find(".rsVideoContainer"),a._b7.css({width:b.width(),height:b.height()}).find(".rsCloseVideoBtn").off("click.rsv").on("click.rsv",
function(b){a.stopVideo();b.preventDefault();b.stopPropagation();return!1}),b.append(a._b7),a.isIPAD&&b.addClass("rsIOSVideo"),a._d7(),setTimeout(function(){a._b7.addClass("rsVideoActive")},10),a.ev.trigger("rsVideoPlay"),a._i4=!0);return!0}return!1},stopVideo:function(){var a=this;return a._i4?(a.isIPAD&&a.slider.find(".rsCloseVideoBtn").remove(),a._d7(!0),setTimeout(function(){a.ev.trigger("rsOnDestroyVideoElement",[a.videoObj]);var c=a._b7.find("iframe");if(c.length)try{c.attr("src","")}catch(b){}a._b7.remove();
a._b7=null},16),a.ev.trigger("rsVideoStop"),a._i4=!1,!0):!1},_d7:function(a){var c=[],b=this.st.video;b.autoHideArrows&&(this._b2&&(c.push(this._b2,this._c2),this._d2=!1),this._v5&&c.push(this._v5));b.autoHideControlNav&&this._k5&&c.push(this._k5);b.autoHideBlocks&&this.currSlide.animBlocks&&c.push(this.currSlide.animBlocks);b.autoHideCaption&&this.globalCaption&&c.push(this.globalCaption);if(c.length)for(b=0;b<c.length;b++)a?c[b].removeClass("rsHidden"):c[b].addClass("rsHidden")}});e.rsModules.video=
e.rsProto._z6})(jQuery);
// jquery.rs.visible-nearby v1.0.2
(function(d){d.rsProto._e7=function(){var a=this;a.st.visibleNearby&&a.st.visibleNearby.enabled&&(a._f7={enabled:!0,centerArea:0.6,center:!0,breakpoint:0,breakpointCenterArea:0.8,hiddenOverflow:!0,navigateByCenterClick:!1},a.st.visibleNearby=d.extend({},a._f7,a.st.visibleNearby),a.ev.one("rsAfterPropsSetup",function(){a._g7=a._d1.css("overflow","visible").wrap('<div class="rsVisibleNearbyWrap"></div>').parent();a.st.visibleNearby.hiddenOverflow||a._g7.css("overflow","visible");a._n1=a.st.controlsInside?
a._g7:a.slider}),a.ev.on("rsAfterSizePropSet",function(){var b,c=a.st.visibleNearby;b=c.breakpoint&&a.width<c.breakpoint?c.breakpointCenterArea:c.centerArea;a._g?(a._z3*=b,a._g7.css({height:a._a4,width:a._z3/b}),a._c=a._z3*(1-b)/2/b):(a._a4*=b,a._g7.css({height:a._a4/b,width:a._z3}),a._c=a._a4*(1-b)/2/b);c.navigateByCenterClick||(a._p=a._g?a._z3:a._a4);c.center&&a._d1.css("margin-"+(a._g?"left":"top"),a._c)}))};d.rsModules.visibleNearby=d.rsProto._e7})(jQuery);


function initPushwoosh() {
	var pushNotification = window.plugins.pushNotification;
	pushNotification.onDeviceReady();
	
	//21B32-7A962
	pushNotification.registerDevice({alert:true, badge:true, sound:true, pw_appid:"D3450-18FDA", appname:"APPCLFD"},
									function(status) {
									var deviceToken = status['deviceToken'];
									console.warn('registerDevice: ' + deviceToken);
									},
									function(status) {
									console.warn('failed to register : ' + JSON.stringify(status));
									//navigator.notification.alert(JSON.stringify(['failed to register ', status]));
									});
	
	pushNotification.setApplicationIconBadgeNumber(0);
	
	document.addEventListener('push-notification', function(event) {
							  var notification = event.notification;
							  navigator.notification.alert(notification.aps.alert);
							  pushNotification.setApplicationIconBadgeNumber(0);
							  });
}

var appPushWoosh = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },

    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        initPushwoosh();

       // app.report('deviceready');
		
		var pushNotification = window.plugins.pushNotification;
		pushNotification.setTags({deviceName:"hello", deviceId:10},
										function(status) {
											console.warn('setTags success');
										},
										function(status) {
											console.warn('setTags failed');
										});

		
		function geolocationSuccess(position) {
		/*	pushNotification.sendLocation({lat:position.coords.latitude, lon:position.coords.longitude},
									 function(status) {
										  console.warn('sendLocation success');
									 },
									 function(status) {
										  console.warn('sendLocation failed');
									 });
		*/

		};
		
		// onError Callback receives a PositionError object
		//
		function geolocationError(error) {
			alert('code: '    + error.code    + '\n' +
				  'message: ' + error.message + '\n');
		}
		
		function getCurrentPosition() {
			//navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
		}
		
		//greedy method to get user position every 3 second. works well for demo.
		//setInterval(getCurrentPosition, 3000);
		
		//this method just gives the position once
//		navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
		
		//this method should track the user position as per Phonegap docs.
//		navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, { maximumAge: 3000, enableHighAccuracy: true });
    },
    report: function(id) {
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};


/************************************************************************
* FONCTIONS actualites.html
************************************************************************/
function loadActusJSON(flag) {
	
	
	//alert(flag);
	if(flag && flag!="")
	{
		reloadActu=flag;
	}
	//INIT TABLE ACTUS
	db.transaction( function(trans){
		
		trans.executeSql( " CREATE TABLE IF NOT EXISTS actus (id unique, lien, virtuel, title, chapo, texte, image, preview, keywords)", [],
				function(trans){
					//SUCCESS
				},
				function(trans, error){
					alert( 'error '+ error.message );
				}
		);
		
	});
	
	readActus(updateActus);
}


//RECUPERE LES DONNEES DE LA BDD POUR LES AFFICHER
function readActus(_callback){

	if(!db)
		return;

	//lecture de la base
	db.transaction(function(trans){
		
		trans.executeSql(' SELECT * FROM actus', [], function(trans, data){
			
			
			actusJSON=data;			
			//alert(actusJSON);
			
			if(actusJSON.rows.length>1)
			{
			
				var actu = actusJSON.rows.item(0);				
				
				
				//alert(actu.title);
										
				renderActusList();
					
				if(reloadActu!="reload")
				{
					renderActusLast();
				}
				
				if(!_callback)
				{
					loadActuTermine=true;				
				}					
					//AFFICHAGE DES DONNEES TERMINEE				
			}
			
			
			
			if(_callback)
			{
				_callback();
			}
			
			
		}, fnerreur);
	});

}



//RECUPERE LA MAJ JSON
function updateActus(){
	
	//$('#LoadingMsg').show();
	// récupération des données avec le dernier id
		$.ajax({ 
			
			//url: 'proxy.php?type=actu',
			url: 'http://www.clermont-ferrand.fr/spip.php?page=actus.json&var_mode=recalcul',
			//url: 'actus.json',
			//type: 'GET',
			dataType:'json',
			success: function(data, status) {
				//debugger;
				//console.log(data);
				//alert(data);
				//console.log(data);
					
				db.transaction(function(trans){ // insertion des données
					
					
					//SI ON A DES ACTUS ON MAJ LA BDD
					if(data.actus.length>10)
					{				
						//On vide la table actus
						
						
						trans.executeSql('DELETE from actus', [], function(){}, 
							fnerreur);
						
					
						//On insere les nouvelles actus
						data.actus.forEach(function(item){
						
							trans.executeSql('INSERT into actus (id, title, lien, chapo, texte, image, preview, keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [item.id, item.title, item.lien, item.chapo, item.texte, item.image, item.preview, item.keywords], function(){}, 
							fnerreur);
						
						});
					}
					readActus(null);
					
					
				});
				
			},
			
			error: erreurActu
			
		});
}	







function fnerreur(trans , e){

	console.log(e.message);
	
	
	/*setTimeout(function(){
		
		$('#LoadingMsg').hide();		
		
	}, 2000);*/
	
	//renderActusLast();
	//renderActusList();
	

}


function erreurActu(trans , e){

	//console.log(e.message);
	
	
	
	//alert("erreur actu")
	loadActuTermine=true;
	
	/*setTimeout(function(){
		
		$('#LoadingMsg').hide();		
		
	}, 2000);*/
	
	//renderActusLast();
	//renderActusList();
	

}


	
	
	
	
	
	function renderActusLast(){
		//console.log(actusJSON.actus[0]["id"]);
		var actu = actusJSON.rows.item(0);
		
		var lastactutitle=actu.title;
		var lastactuchapo=actu.chapo;
		var lastactupreview=actu.image;
		var lastactutexte=actu.texte;
		var lastactukeywords=actu.keywords;
		var lastactuid=actu.id;
		actusHTML='<div class="text" id="'+lastactuid+'">'
		+'<h1>'+lastactutitle+'</h1>'
		+'<img src="'+lastactupreview+'" class="img-rounded" />'
		+'<div class="lead">'+lastactuchapo+'</div>'
		+''+lastactutexte+''
		//+'<br />'+lastactukeywords+''
		+'</div>';
		
		var reactusHTML=unescapeHTML(actusHTML);
		$('#actus-detail').empty().append(reactusHTML);
		
		
		
		$('#listeA li').removeClass('btn-danger');
		$('#listeA #'+actu.id).addClass('btn-danger');
		
	}
	
	function renderActusList(){
		
		//actusJSON = data;
		
		//var $actus = $(data);
		var actusHTML="";
		var actusHTMLA="";
		var i=0;
		
		
		
		
		for(i = 0; i < actusJSON.rows.length; i++)
		{
					
			var actu = actusJSON.rows.item(i);
			
			//PARTIE ACTUS ACCUEIL
			if(i<=3)
			{ 
				actusHTMLA+='<div data-id="'+actu.id+'" class="rsContent item">';
				actusHTMLA+='<img class="rsImg" src="'+actu.image+'" />';
				actusHTMLA+='<div class="infoBlock infoBlockLeftBlack rsABlock" data-fade-effect="" data-move-offset="10" data-move-effect="bottom" data-speed="200">';
				actusHTMLA+='<h4>'+actu.title+'</h4>';
				if(largeurEcran>640 && hauteurEcran>640){
					actusHTMLA+='<p>'+actu.chapo+'</p>';
				}
				actusHTMLA+='</div>';
				actusHTMLA+='</div>';
				
				
				
			}
	  
			//PARTIE LISTE DES ACTUS
			actusHTML+='<li data-theme="b" data-id="'+actu.id+'" id="'+actu.id+'" data-icon="arrow-r" data-iconpos="right" ><a  href="#">';
			actusHTML+='<img src="'+actu.image+'" width="120" height="90" />';
			if(largeurEcran>640 && hauteurEcran>640)
			{
				actusHTML+='<h3>'+affichageTitreListview(actu.title)+'</h3>';
			}
			else
			{
				actusHTML+='<h3>'+actu.title+'</h3>';
			}
			//actusHTML+='<p>'+item.chapo+'</p>';
			actusHTML+='</a></li>';
			//i++;
		}
	
		//Nombre total d'actu
		nbActu=parseInt(i)-1;
		
		
	//alert("affichage royalslider");
		actusRSCourante=unescapeHTML(actusHTMLA);
		//alert("contenu de actusRSCourante:----"+actusRSCourante);
		
		var reactusHTML=unescapeHTML(actusHTML);
		
		
		//alert(reloadActu);
		
		
		
		
		
		//CLICK SUR BOUTON ACTUALISATION
		/*if(reloadActu=="reload")
		{
		
			//if(premierDemarrageAppli && premierDemarrageAppli==true)
			//{
			//	$('#listeA').empty().append(reactusHTML).listview('refresh');
			//}
			//else
			//{
				//alert("sfgsdfdsf");
				//$('#listeA').empty().append(reactusHTML);
				$('#listeA').empty().append(reactusHTML).listview('refresh');
			//}
			//alert(reloadActu);
			//alert(premierDemarrageAppli);
			
		}
		else
		{
			$('#listeA').empty().append(reactusHTML).listview('create');
		}*/
		
		
		console.log("mise a jour listview actu");
		
		if ( $('#listeA').hasClass('ui-listview')) 
		{
		    $('#listeA').empty().append(reactusHTML).listview('refresh');
		} 
		else 
		{
		    $('#listeA').empty().append(reactusHTML).trigger('create');
		}
		
		
		
		
	}
	
	
	

	
	//CLIQUE SUR UNE ACTU DANS LA LISTE DE GAUCHE POUR FAIRE APPARAITRE LE DETAIL A DROITE DE L'ECRAN
	function clickActusBtn(event){
	
		
		//IPHONE OU AUTRES
		if(largeurEcran<=640 || hauteurEcran<=640){
			$.mobile.changePage( "#actusIphoneD", {
				reverse: true,
				changeHash: true
			});
		}
		var currentid=$(event.currentTarget).attr('data-id');
		currentidActus=currentid;
		$('#listeA li').removeClass('btn-danger');
		$('#listeA #'+currentidActus+'').addClass('btn-danger');
		for(i = 0; i < actusJSON.rows.length; i++)
		{
			var actu = actusJSON.rows.item(i);
			if(actu.id==currentid)
			{
				currentDataActus= actu;			
				break;
			}
		}
		
		/*var templateHTML;
		templateHTML='<div class="text" id="{{{id}}}" >'
		+'<h1>{{{title}}}</h1>'
		+'<img src="{{image}}" class="img-rounded responsive" />'
		+'<div class="lead">{{{chapo}}}</div>'
		+'{{{texte}}}'
		//+'<br />{{{keywords}}}'
		+'</div>';*/
		
		
		
		templateHTML='<div class="text" id="'+currentDataActus.id+'">'
		+'<h1>'+currentDataActus.title+'</h1>'
		+'<img  src="'+currentDataActus.image+'"  class="img-rounded responsive" />'
		+'<div class="lead">'+htmlDecode(currentDataActus.chapo)+'</div>'
		+ htmlDecode(currentDataActus.texte)
		+'</div>';		
		
		
		
		
		detailHTMLActus=unescapeHTML(templateHTML);
		//var redetailHTMLActus=$("<div />").html(templateHTML).text();
		//alert(redetailHTMLActus);
		$('#actus-detail').empty().append(detailHTMLActus);
		
		
		//les liens sont supprim�s
		setTimeout('$("#actus-detail a").attr("href","#");',1000);
		
		
		
		//POUR IOS
		trackEventGA("Actualités", "consultation", unescapeHTML(currentDataActus["title"]));
		
		//POUR ANDROID
		trackEventAndroid("Actualités", "consultation", unescapeHTML(currentDataActus["title"]));
		
		
	}
	
	

	
	
	
	
	//SWIPE A GAUCHE POUR ALLER A L'ACTU PRECEDENTE
	function SwipeLeftActus(event){
		var currentid=$(event.currentTarget).attr('id');
		
		
		if(currentid==parseInt(actusJSON.rows.item(0).id))
		{
			currentDataActus= actusJSON.rows.item(nbActu);
			currentidActus=actusJSON.rows.item(nbActu).id;
	
		}
		else
		{
		
			//currentidActus=currentid;
			for(x = 0; x < actusJSON.rows.length; x++)
			{
				var actu = actusJSON.rows.item(x);
				if(actu.id==currentid)
				{
					var actu2 = actusJSON.rows.item(x-1);
					currentDataActus= actu2;
					currentidActus=actu2.id;
					
					break;
				}
			}
		}
		
		
		/*if(largeurEcran>640 && hauteurEcran>640)
		{
			console.log(currentidActus);
			console.log(scrolllisteActus);
			
			if(currentidActus){
				scrolllisteActus.scrollToElement("#15212", '400ms');
			}
		}*/
		
		//IPAD
		//if(isIpad){
		$('#listeActus li').removeClass('btn-danger');
		$('#listeActus #'+currentidActus+'').addClass('btn-danger');
		//}
		
				
		
		
		templateHTML='<div class="text" id="'+currentDataActus.id+'">'
		+'<h1>'+currentDataActus.title+'</h1>'
		+'<img  src="'+currentDataActus.image+'"  class="img-rounded responsive" />'
		+'<div class="lead">'+htmlDecode(currentDataActus.chapo)+'</div>'
		+ htmlDecode(currentDataActus.texte)
		+'</div>';		
		
		
		
		
		detailHTMLActus=unescapeHTML(templateHTML);
		//var redetailHTMLActus=$("<div />").html(templateHTML).text();
		//alert(redetailHTMLActus);
		$('#actus-detail').empty().append(detailHTMLActus);
		
		
		//les liens sont supprim�s
		setTimeout('$("#actus-detail a").attr("href","#");',1000);
		
		
			
		//POUR IOS
		trackEventGA("Actualités", "consultation", unescapeHTML(currentDataActus["title"]));
		
		//POUR ANDROID
		trackEventAndroid("Actualités", "consultation", unescapeHTML(currentDataActus["title"]));
		
		
	}
	
	//SWIPE A DROITE POUR ALLER A L'ACTU SUIVANT
	function SwipeRightActus(event){
		var currentid=$(event.currentTarget).attr('id');
		
	
		if(currentid==parseInt(actusJSON.rows.item(nbActu).id))
		{
			currentDataActus= actusJSON.rows.item(0);
			currentidActus=actusJSON.rows.item(0).id;
		}
		else
		{
			for(x = 0; x < actusJSON.rows.length; x++)
			{
				var actu = actusJSON.rows.item(x);
				
				if(actu.id==currentid)
				{
					var actu2 = actusJSON.rows.item(x+1);
					currentDataActus= actu2;
					currentidActus=actu2.id;
					break;
				}
			}
		}
		
		
		/*if(largeurEcran>640 && hauteurEcran>640)
		{
			
			if(currentidActus){
				scrolllisteActus.scrollToElement("#"+currentid, '400ms');
			}
		}*/
		
		//scrolllisteActus.scrollToElement("#"+currentid, '400ms');
		
		//IPAD
		//if(isIpad){
		$('#listeActus li').removeClass('btn-danger');
		$('#listeActus #'+currentidActus+'').addClass('btn-danger');
		//}
		
		
		
		templateHTML='<div class="text" id="'+currentDataActus.id+'">'
		+'<h1>'+currentDataActus.title+'</h1>'
		+'<img  src="'+currentDataActus.image+'"  class="img-rounded responsive" />'
		+'<div class="lead">'+htmlDecode(currentDataActus.chapo)+'</div>'
		+ htmlDecode(currentDataActus.texte)
		+'</div>';		
		
		
		
		
		detailHTMLActus=unescapeHTML(templateHTML);
		//var redetailHTMLActus=$("<div />").html(templateHTML).text();
		//alert(redetailHTMLActus);
		$('#actus-detail').empty().append(detailHTMLActus);
		
		
		//les liens sont supprim�s
		setTimeout('$("#actus-detail a").attr("href","#");',1000);
		
		
		//POUR IOS
		trackEventGA("Actualités", "consultation", unescapeHTML(currentDataActus["title"]));
		
		//POUR ANDROID
		trackEventAndroid("Actualités", "consultation", unescapeHTML(currentDataActus["title"]));
		
		
	}

var appTwitter = {
initialize: function() {

    this.bind();
},
bind: function() {

    document.addEventListener('deviceready', this.deviceready, false);
},
deviceready: function() {
    // note that this is an event handler so the scope is that of the event
    // so we need to call app.report(), and not this.report()
	
    appTwitter.report('deviceready');
    
	
	
    TwitterDemo.setup();

    
},
report: function(id) {
    console.log("report:" + id);
    // hide the .pending <p> and show the .complete <p>
    document.querySelector('#' + id + ' .pending').className += ' hide';
    var completeElem = document.querySelector('#' + id + ' .complete');
    completeElem.className = completeElem.className.split('hide').join('');
}
};


// jquery.royalslider v9.2.0
(function(k){function t(b,e){var c=navigator.userAgent.toLowerCase(),g=k.browser,a=this,f=g.webkit;c.indexOf("android");a.isIPAD=c.match(/(ipad)/);for(var d=document.createElement("div").style,i=["webkit","Moz","ms","O"],h="",j=0,m,c=0;c<i.length;c++)m=i[c],!h&&m+"Transform"in d&&(h=m),m=m.toLowerCase(),window.requestAnimationFrame||(window.requestAnimationFrame=window[m+"RequestAnimationFrame"],window.cancelAnimationFrame=window[m+"CancelAnimationFrame"]||window[m+"CancelRequestAnimationFrame"]);
window.requestAnimationFrame||(window.requestAnimationFrame=function(a){var b=(new Date).getTime(),c=Math.max(0,16-(b-j)),d=window.setTimeout(function(){a(b+c)},c);j=b+c;return d});window.cancelAnimationFrame||(window.cancelAnimationFrame=function(a){clearTimeout(a)});a.slider=k(b);a.ev=k({});a._a=k(document);a.st=k.extend({},k.fn.royalSlider.defaults,e);a._b=a.st.transitionSpeed;if(a.st.allowCSS3&&(!f||a.st.allowCSS3OnWebkit))c=h+(h?"T":"t"),a._c=c+"ransform"in d&&c+"ransition"in d,a._c&&(a._d=h+
(h?"P":"p")+"erspective"in d);h=h.toLowerCase();a._e="-"+h+"-";a._f="vertical"===a.st.slidesOrientation?!1:!0;a._g=a._f?"left":"top";a._h=a._f?"width":"height";a._i=-1;a._j="fade"===a.st.transitionType?!1:!0;a._j||(a.st.sliderDrag=!1,a._k=10);a._l=0;a._m=0;k.each(k.rsModules,function(b,c){c.call(a)});a.slides=[];a._n=0;(a.st.slides?k(a.st.slides):a.slider.children().detach()).each(function(){a._o(this,true)});a.st.randomizeSlides&&a.slides.sort(function(){return 0.5-Math.random()});a.numSlides=a.slides.length;
a._p();a.st.startSlideId>a.numSlides-1&&(a.st.startSlideId=a.numSlides-1);a.staticSlideId=a.currSlideId=a._q=a.st.startSlideId;a.currSlide=a.slides[a.currSlideId];a._r=0;a.slider.addClass((a._f?"rsHor":"rsVer")+(a._j?"":" rsFade"));d='<div class="rsOverflow"><div class="rsContainer">';a.slidesSpacing=a.st.slidesSpacing;a._s=(a._f?a.slider.width():a.slider.height())+a.st.slidesSpacing;a._t=Boolean(0<a._u);1>=a.numSlides&&(a._v=!1);a._w=a._v&&a._j?2===a.numSlides?1:2:0;a._x=6>a.numSlides?a.numSlides:
6;a._y=0;a._z=0;a.slidesJQ=[];for(c=0;c<a.numSlides;c++)a.slidesJQ.push(k('<div style="'+(a._j?"":c!==a.currSlideId?"z-index: 0; display:none; opacity: 0; position: absolute;  left: 0; top: 0;":"z-index: 0;  position: absolute; left: 0; top: 0;")+'" class="rsSlide "></div>'));a.slider.html(d+"</div></div>");a._a1=a.slider.children(".rsOverflow");a._b1=a._a1.children(".rsContainer");a._c1=k('<div class="rsPreloader"></div>');c=a._b1.children(".rsSlide");a._d1=a.slidesJQ[a.currSlideId];a._e1=0;"ontouchstart"in
window||"createTouch"in document?(a.hasTouch=!0,a._f1="touchstart.rs",a._g1="touchmove.rs",a._h1="touchend.rs",a._i1="touchcancel.rs",a._j1=0.5):(a.hasTouch=!1,a._j1=0.2,a.st.sliderDrag&&(g.msie||g.opera?a._k1=a._l1="move":g.mozilla?(a._k1="-moz-grab",a._l1="-moz-grabbing"):f&&-1!=navigator.platform.indexOf("Mac")&&(a._k1="-webkit-grab",a._l1="-webkit-grabbing"),a._m1()),a._f1="mousedown.rs",a._g1="mousemove.rs",a._h1="mouseup.rs",a._i1="mouseup.rs");a._c?(a._n1="transition-property",a._o1="transition-duration",
a._p1="transition-timing-function",a._q1=a._r1=a._e+"transform",a._d?(f&&a.slider.addClass("rsWebkit3d"),a._s1="translate3d(",a._t1="px, ",a._u1="px, 0px)"):(a._s1="translate(",a._t1="px, ",a._u1="px)"),a._j)?a._b1[a._e+a._n1]=a._e+"transform":(g={},g[a._e+a._n1]="opacity",g[a._e+a._o1]=a.st.transitionSpeed+"ms",g[a._e+a._p1]=a.st.css3easeInOut,c.css(g)):(a._r1="left",a._q1="top");var l;k(window).on("resize.rs",function(){l&&clearTimeout(l);l=setTimeout(function(){a.updateSliderSize()},50)});a.ev.trigger("rsAfterPropsSetup");
a.updateSliderSize();a.st.keyboardNavEnabled&&a._v1();a.st.arrowsNavHideOnTouch&&a.hasTouch&&(a.st.arrowsNav=!1);a.st.arrowsNav&&(g=a.st.controlsInside?a._a1:a.slider,k('<div class="rsArrow rsArrowLeft"><div class="rsArrowIcn"></div></div><div class="rsArrow rsArrowRight"><div class="rsArrowIcn"></div></div>').appendTo(g),a._w1=g.children(".rsArrowLeft").click(function(b){b.preventDefault();a.prev()}),a._x1=g.children(".rsArrowRight").click(function(b){b.preventDefault();a.next()}),a.st.arrowsNavAutoHide&&
!a.hasTouch&&(a._w1.addClass("rsHidden"),a._x1.addClass("rsHidden"),g.one("mousemove.arrowshover",function(){a._w1.removeClass("rsHidden");a._x1.removeClass("rsHidden")}),g.hover(function(){if(!a._y1){a._w1.removeClass("rsHidden");a._x1.removeClass("rsHidden")}},function(){if(!a._y1){a._w1.addClass("rsHidden");a._x1.addClass("rsHidden")}})),a.ev.on("rsOnUpdateNav",function(){a._z1()}),a._z1());a._a2=!a.hasTouch&&a.st.sliderDrag||a.hasTouch&&a.st.sliderTouch;if(a._a2)a._b1.on(a._f1,function(b){a._b2(b)});
else a.dragSuccess=!1;var q=["rsPlayBtnIcon","rsPlayBtn","rsCloseVideoBtn","rsCloseVideoIcn"];a._b1.click(function(b){if(!a.dragSuccess){var c=k(b.target).attr("class");if(k.inArray(c,q)!==-1&&a.toggleVideo())return false;if(a.st.navigateByClick&&!a._c2){if(k(b.target).closest(".rsNoDrag",a._d1).length)return true;a._d2(b)}}});a.ev.trigger("rsAfterInit")}k.rsModules||(k.rsModules={});t.prototype={_d2:function(b){b[this._f?"pageX":"pageY"]-this._e2>0?this.next():this.prev()},_p:function(){var b;b=
this.st.numImagesToPreload;if(this._v=this.st.loop)if(this.numSlides===2){this._v=false;this.st.loopRewind=true}else if(this.numSlides<2)this.st.loopRewind=this._v=false;this._v&&b>0&&(this.numSlides<=4?b=1:this.st.numImagesToPreload>(this.numSlides-1)/2&&(b=Math.floor((this.numSlides-1)/2)));this._u=b},_o:function(b,e){function c(b,c){a.image=b.attr(!c?"src":c);a.caption=!c?b.attr("alt"):b.contents();a.videoURL=b.attr("data-rsVideo")}var g,a={};this._f2=b=k(b);this.ev.trigger("rsBeforeParseNode",
[b,a]);if(!a.stopParsing){b=this._f2;a.id=this._n;a.contentAdded=false;this._n++;if(!a.hasCover){if(b.hasClass("rsImg")){tempEl=b;g=true}else{tempEl=b.find(".rsImg");tempEl.length&&(g=true)}if(g){a.bigImage=tempEl.attr("data-rsBigImg");tempEl.is("a")?c(tempEl,"href"):tempEl.is("img")&&c(tempEl)}else if(b.is("img")){b.addClass("rsImg");c(b)}}tempEl=b.find(".rsCaption");if(tempEl.length)a.caption=tempEl.remove();if(!a.image){a.isLoaded=true;a.isRendered=false;a.isLoading=false}a.content=b;this.ev.trigger("rsAfterParseNode",
[b,a]);e&&this.slides.push(a);return a}},_v1:function(){var b=this;b._a.on("keydown.rskb",function(e){if(!b._g2&&!b._h2)if(e.keyCode===37){e.preventDefault();b.prev()}else if(e.keyCode===39){e.preventDefault();b.next()}})},goTo:function(b,e){b!==this.currSlideId&&this._i2(b,this.st.transitionSpeed,true,!e)},destroy:function(b){var e=this;e.ev.trigger("rsBeforeDestroy");e._a.off("keydown.rskb "+e._g1+" "+e._h1);e._b1.on(e._f1,function(b){e._b2(b)});e.slider.data("royalSlider","");b&&e.slider.remove()},
_j2:function(b,e){function c(c,e,f){if(c.isAdded){g(e,c);a(e,c)}else{f||(f=d.slidesJQ[e]);if(c.holder)f=c.holder;else{f=d.slidesJQ[e]=k(f);c.holder=f}c.appendOnLoaded=false;a(e,c,f);g(e,c);d._l2(c,f,b);appended=c.isAdded=true}}function g(a,c){if(!c.contentAdded){d.setItemHtml(c,b);if(!b)c.contentAdded=true}}function a(a,b,c){if(d._j){c||(c=d.slidesJQ[a]);c.css(d._g,(a+d._z+q)*d._s)}}function f(a){if(j){if(a>m-1)return f(a-m);if(a<0)return f(m+a)}return a}var d=this,i,h,j=d._v,m=d.numSlides;if(!isNaN(e))return f(e);
var l=d.currSlideId,q,n=b?Math.abs(d._k2-d.currSlideId)>=d.numSlides-1?0:1:d._u,o=Math.min(2,n),r=false,s=false,p;for(h=l;h<l+1+o;h++){p=f(h);if((i=d.slides[p])&&(!i.isAdded||!i.positionSet)){r=true;break}}for(h=l-1;h>l-1-o;h--){p=f(h);if((i=d.slides[p])&&(!i.isAdded||!i.positionSet)){s=true;break}}if(r)for(h=l;h<l+n+1;h++){p=f(h);q=Math.floor((d._q-(l-h))/d.numSlides)*d.numSlides;(i=d.slides[p])&&c(i,p)}if(s)for(h=l-1;h>l-1-n;h--){p=f(h);q=Math.floor((d._q-(l-h))/m)*m;(i=d.slides[p])&&c(i,p)}if(!b){o=
f(l-n);l=f(l+n);n=o>l?0:o;for(h=0;h<m;h++)if(!(o>l&&h>o-1)&&(h<n||h>l))if((i=d.slides[h])&&i.holder){i.holder.detach();i.isAdded=false}}},setItemHtml:function(b,e){function c(){a.isWaiting=true;b.holder.html(g._c1.clone());a.slideId=-99}var g=this,a=b.holder,f=function(a){var b=a.sizeType;return function(d){var f=a.content,h=a.holder;if(d){var i=d.currentTarget;k(i).off("load error");if(d.type==="error"){a.isLoaded=true;a.image="";a.isLoading=false;f.addClass("rsSlideError");h.html(f);a.holder.trigger("rsAfterContentSet");
g.ev.trigger("rsAfterContentSet",a);return}}if(a.image){if(a.bigImage&&a.sizeType!==b){b==="med"?a.isMedLoading=false:b==="big"?a.isBigLoading=false:a.isMedLoading=a.isLoading=false;return}if(a.isLoaded){if(!a.isRendered&&e){c();return}g._m2(a)}else{var j;if(f.hasClass("rsImg")){j=true;d=f}else{j=false;d=f.find(".rsImg")}if(d.length&&d.is("a")){j?f=k('<img class="rsImg" src="'+a.image+'" />'):f.find(".rsImg").replaceWith('<img class="rsImg" src="'+a.image+'" />');a.content=f}a.iW=i.width;if(a.iW>
0){a.iH=i.height;a.isLoaded=true;a.isLoading=false;g._m2(a)}}}else{if(!g._t&&e&&!a.isRendered){a.isRendered=true;c();return}a.isLoaded=true;a.isLoading=false}i=a.id-g._l;if(!e&&!a.appendOnLoaded&&g.st.fadeinLoadedSlide&&(i===0||(g._h2||g._g2)&&(i===-1||i===1))){f.css(g._e+"transition","opacity 400ms ease-in-out").css({visibility:"visible",opacity:0});h.html(f);setTimeout(function(){f.css("opacity",1)},6)}else h.html(f);a.isRendered=true;h.find("a").off("click.rs").on("click.rs",function(){if(g.dragSuccess)return false;
g._c2=true;g.ev.trigger("rsSlideClick");setTimeout(function(){g._c2=false},3)});a.holder.trigger("rsAfterContentSet");g.ev.trigger("rsAfterContentSet",a);a.appendOnLoaded&&g._l2(a,f,e)}};if(b.isLoaded)f(b)();else if(e)c();else if(b.image)if(b.isLoading){var d=1,i=function(){if(b.isLoading)if(b.isLoaded)f(b)();else{if(d%50===0){var a=b.imageLoader;if(a.complete&&a.naturalWidth!==void 0&&a.naturalWidth!==0&&a.naturalHeight!==0){f(b)();return}}if(!(d>300)){setTimeout(i,400);d++}}};i(b.sizeType)}else{var h=
k("<img/>"),j=b.image;if(e)c();else if(!b.isLoading){if(!j){j=h.attr("src");h=k("<img/>")}b.holder.html(g._c1.clone());b.isLoading=true;b.imageLoader=h;h.one("load error",f(b)).attr("src",j)}}else f(b)()},_l2:function(b,e,c){var g=b.holder,a=b.id-this._l;if(this._j&&!c&&this.st.fadeinLoadedSlide&&(a===0||(this._h2||this._g2)&&(a===-1||a===1))){e=b.content;e.css(this._e+"transition","opacity 400ms ease-in-out").css({visibility:"visible",opacity:0});this._b1.append(g);setTimeout(function(){e.css("opacity",
1)},6)}else this._b1.append(g);b.appendOnLoaded=false},_b2:function(b,e){var c=this,g;c.dragSuccess=false;if(k(b.target).closest(".rsNoDrag",c._d1).length)return true;e||c._h2&&c._n2();if(c._g2){if(c.hasTouch)c._o2=true}else{if(c.hasTouch)c._o2=false;c._p2();if(c.hasTouch){var a=b.originalEvent.touches;if(a&&a.length>0){g=a[0];if(a.length>1)c._o2=true}else return}else{g=b;b.preventDefault()}c._g2=true;c._a.on(c._g1,function(a){c._q2(a,e)}).on(c._h1,function(a){c._r2(a,e)});c._s2="";c._t2=false;c._u2=
g.pageX;c._v2=g.pageY;c._w2=c._r=(!e?c._f:c._x2)?g.pageX:g.pageY;c._y2=0;c._z2=0;c._a3=!e?c._m:c._b3;c._c3=(new Date).getTime();if(c.hasTouch)c._a1.on(c._i1,function(a){c._r2(a,e)})}},_d3:function(b,e){if(this._e3){var c=this._f3,g=b.pageX-this._u2,a=b.pageY-this._v2,f=this._a3+g,d=this._a3+a,i=!e?this._f:this._x2,f=i?f:d,h=this._s2;this._t2=true;this._u2=b.pageX;this._v2=b.pageY;d=i?this._u2:this._v2;if(h==="x"&&g!==0)this._y2=g>0?1:-1;else if(h==="y"&&a!==0)this._z2=a>0?1:-1;g=i?g:a;if(e)f>this._g3?
f=this._a3+g*this._j1:f<this._h3&&(f=this._a3+g*this._j1);else if(!this._v){this.currSlideId<=0&&d-this._w2>0&&(f=this._a3+g*this._j1);this.currSlideId>=this.numSlides-1&&d-this._w2<0&&(f=this._a3+g*this._j1)}this._a3=f;if(c-this._c3>200){this._c3=c;this._r=d}e?this._j3(this._a3):this._j&&this._i3(this._a3)}},_q2:function(b,e){var c=this;if(c.hasTouch){if(c._k3)return;var g=b.originalEvent.touches;if(g){if(g.length>1)return;point=g[0]}else return}else point=b;if(!c._t2){c._c&&(!e?c._b1:c._l3).css(c._e+
c._o1,"0s");(function d(){if(c._g2){c._m3=requestAnimationFrame(d);c._n3&&c._d3(c._n3,e)}})()}if(c._e3){b.preventDefault();c._f3=(new Date).getTime();c._n3=point}else{var g=!e?c._f:c._x2,a=Math.abs(point.pageX-c._u2)-Math.abs(point.pageY-c._v2)-(g?-7:7);if(a>7){if(g){b.preventDefault();c._s2="x"}else if(c.hasTouch){c._o3();return}c._e3=true}else if(a<-7){if(g){if(c.hasTouch){c._o3();return}}else{b.preventDefault();c._s2="y"}c._e3=true}}},_o3:function(){this._k3=true;this._t2=this._g2=false;this._r2()},
_r2:function(b,e){function c(a){return a<100?100:a>500?500:a}function g(b,d){if(a._j||e){i=(-a._q-a._z)*a._s;h=Math.abs(a._m-i);a._b=h/d;if(b)a._b=a._b+250;a._b=c(a._b);a._q3(i,false)}}var a=this,f,d,i,h;a.ev.trigger("rsDragRelease");a._n3=null;a._g2=false;a._k3=false;a._e3=false;a._f3=0;cancelAnimationFrame(a._m3);a._t2&&(e?a._j3(a._a3):a._j&&a._i3(a._a3));a._a.off(a._g1).off(a._h1);a.hasTouch&&a._a1.off(a._i1);a._m1();if(!a._t2&&!a._o2&&e&&a._p3){var j=k(b.target).closest(".rsNavItem");j.length&&
a.goTo(j.index())}else{d=!e?a._f:a._x2;if(a._t2&&!(a._s2==="y"&&d||a._s2==="x"&&!d)){a.dragSuccess=true;a._s2="";var m=a.st.minSlideOffset;f=a.hasTouch?b.originalEvent.changedTouches[0]:b;var l=d?f.pageX:f.pageY,q=a._w2;f=a._r;var n=a.currSlideId,o=a.numSlides,r=d?a._y2:a._z2,s=a._v;Math.abs(l-q);f=l-f;d=(new Date).getTime()-a._c3;d=Math.abs(f)/d;if(r===0||o<=1)g(true,d);else{if(!s&&!e)if(n<=0){if(r>0){g(true,d);return}}else if(n>=o-1&&r<0){g(true,d);return}if(e){i=a._b3;if(i>a._g3)i=a._g3;else if(i<
a._h3)i=a._h3;else{m=d*d/0.006;j=-a._b3;l=a._r3-a._s3+a._b3;if(f>0&&m>j){j=j+a._s3/(15/(m/d*0.003));d=d*j/m;m=j}else if(f<0&&m>l){l=l+a._s3/(15/(m/d*0.003));d=d*l/m;m=l}j=Math.max(Math.round(d/0.003),50);i=i+m*(f<0?-1:1);if(i>a._g3){a._t3(i,j,true,a._g3,200);return}if(i<a._h3){a._t3(i,j,true,a._h3,200);return}}a._t3(i,j,true)}else q+m<l?r<0?g(false,d):a._i2("prev",c(Math.abs(a._m-(-a._q-a._z+1)*a._s)/d),false,true,true):q-m>l?r>0?g(false,d):a._i2("next",c(Math.abs(a._m-(-a._q-a._z-1)*a._s)/d),false,
true,true):g(false,d)}}}},_i3:function(b){b=this._m=b;this._c?this._b1.css(this._r1,this._s1+(this._f?b+this._t1+0:0+this._t1+b)+this._u1):this._b1.css(this._f?this._r1:this._q1,b)},updateSliderSize:function(b){var e,c;this.st.beforeResize&&this.st.beforeResize.call(this);if(this.st.autoScaleSlider){var g=this.st.autoScaleSliderWidth,a=this.st.autoScaleSliderHeight;if(this.st.autoScaleHeight){e=this.slider.width();if(e!=this.width){this.slider.css("height",e*(a/g));e=this.slider.width()}c=this.slider.height()}else{c=
this.slider.height();if(c!=this.height){this.slider.css("width",c*(g/a));c=this.slider.height()}e=this.slider.width()}}else{e=this.slider.width();c=this.slider.height()}this._e2=this.slider.offset();this._e2=this._e2[this._g];if(b||e!=this.width||c!=this.height){this.width=e;this.height=c;this._u3=e;this._v3=c;this.ev.trigger("rsBeforeSizeSet");this._a1.css({width:this._u3,height:this._v3});this._s=(this._f?this._u3:this._v3)+this.st.slidesSpacing;this._w3=this.st.imageScalePadding;for(e=0;e<this.slides.length;e++){b=
this.slides[e];b.positionSet=false;if(b&&b.image&&b.isLoaded){b.isRendered=false;this._m2(b)}}if(this._x3)for(e=0;e<this._x3.length;e++){b=this._x3[e];b.holder.css(this._g,(b.id+this._z)*this._s)}this._j2();if(this._j){this._c&&this._b1.css(this._e+"transition-duration","0s");this._i3((-this._q-this._z)*this._s)}this.ev.trigger("rsOnUpdateNav");this.st.afterResize&&this.st.afterResize.call(this)}},setSlidesOrientation:function(){},appendSlide:function(b,e){var c=this._o(b);if(isNaN(e)||e>this.numSlides)e=
this.numSlides;this.slides.splice(e,0,c);this.slidesJQ.splice(e,0,'<div style="'+(this._j?"position: absolute;":"z-index: 0; display:none; opacity: 0; position: absolute;  left: 0; top: 0;")+'" class="rsSlide"></div>');e<this.currSlideId&&this.currSlideId++;this.ev.trigger("rsOnAppendSlide",[c,e]);this._z3(e);e===this.currSlideId&&this.ev.trigger("rsAfterSlideChange")},removeSlide:function(b){var e=this.slides[b];if(e){e.holder&&e.holder.remove();b<this.currSlideId&&this.currSlideId++;this.slides.splice(b,
1);this.slidesJQ.splice(b,1);this.ev.trigger("rsOnRemoveSlide",[b]);this._z3(b);b===this.currSlideId&&this.ev.trigger("rsAfterSlideChange")}},_z3:function(){var b=this,e=b.numSlides,e=b._q<=0?0:Math.floor(b._q/e);b.numSlides=b.slides.length;if(b.numSlides===0){b.currSlideId=b._z=b._q=0;b.currSlide=b._a4=null}else b._q=e*b.numSlides+b.currSlideId;for(e=0;e<b.numSlides;e++)b.slides[e].id=e;b.currSlide=b.slides[b.currSlideId];b._d1=b.slidesJQ[b.currSlideId];b.currSlideId>=b.numSlides?b.goTo(b.numSlides-
1):b.currSlideId<0&&b.goTo(0);b._p();b._j&&b._v&&b._b1.css(b._e+b._o1,"0ms");b._b4&&clearTimeout(b._b4);b._b4=setTimeout(function(){b._i3((-b._q-b._z)*b._s);b._j2()},14);b.ev.trigger("rsOnUpdateNav")},_m1:function(){if(!this.hasTouch&&this._j)if(this._k1)this._a1.css("cursor",this._k1);else{this._a1.removeClass("grabbing-cursor");this._a1.addClass("grab-cursor")}},_p2:function(){if(!this.hasTouch&&this._j)if(this._l1)this._a1.css("cursor",this._l1);else{this._a1.removeClass("grab-cursor");this._a1.addClass("grabbing-cursor")}},
next:function(b){this._i2("next",this.st.transitionSpeed,true,!b)},prev:function(b){this._i2("prev",this.st.transitionSpeed,true,!b)},_i2:function(b,e,c,g,a){var f=this,d,i,h;f._d4&&f.stopVideo();f.ev.trigger("rsBeforeMove",[b,g]);newItemId=b==="next"?f.currSlideId+1:b==="prev"?f.currSlideId-1:b=parseInt(b,10);if(!f._v){if(newItemId<0){f._e4("left",!g);return}if(newItemId>=f.numSlides){f._e4("right",!g);return}}if(f._h2){f._n2();c=false}i=newItemId-f.currSlideId;h=f._k2=f.currSlideId;var j=f.currSlideId+
i,g=f._q,m;if(f._v){j=f._j2(false,j);g=g+i}else g=j;f._l=j;f._a4=f.slidesJQ[f.currSlideId];f._q=g;f.currSlideId=f._l;f.currSlide=f.slides[f.currSlideId];f._d1=f.slidesJQ[f.currSlideId];j=Boolean(i>0);i=Math.abs(i);var l=Math.floor(h/f._u),k=Math.floor((h+(j?2:-2))/f._u),l=(j?Math.max(l,k):Math.min(l,k))*f._u+(j?f._u-1:0);l>f.numSlides-1?l=f.numSlides-1:l<0&&(l=0);h=j?l-h:h-l;if(h>f._u)h=f._u;if(i>h+2){f._z=f._z+(i-(h+2))*(j?-1:1);e=e*1.4;for(h=0;h<f.numSlides;h++)f.slides[h].positionSet=false}f._b=
e;f._j2(true);a||(m=true);d=(-g-f._z)*f._s;if(m)setTimeout(function(){f._c4=false;f._q3(d,b,false,c);f.ev.trigger("rsOnUpdateNav")},0);else{f._q3(d,b,false,c);f.ev.trigger("rsOnUpdateNav")}},_z1:function(){if(this.st.arrowsNav)if(this.numSlides<=1){this._w1.css("display","none");this._x1.css("display","none")}else{this._w1.css("display","block");this._x1.css("display","block");if(!this._v&&!this.st.loopRewind){this.currSlideId===0?this._w1.addClass("rsArrowDisabled"):this._w1.removeClass("rsArrowDisabled");
this.currSlideId===this.numSlides-1?this._x1.addClass("rsArrowDisabled"):this._x1.removeClass("rsArrowDisabled")}}},_q3:function(b,e,c,g,a){function f(){var a=i.data("rsTimeout");if(a){i!==h&&i.css({opacity:0,display:"none",zIndex:0});clearTimeout(a);i.data("rsTimeout","")}if(a=h.data("rsTimeout")){clearTimeout(a);h.data("rsTimeout","")}}var d=this,i,h,j={};if(isNaN(d._b))d._b=400;d._m=d._a3=b;d.ev.trigger("rsBeforeAnimStart");d.st.beforeSlideChange&&d.st.beforeSlideChange.call(d);if(d._c)if(d._j){j[d._e+
d._o1]=d._b+"ms";j[d._e+d._p1]=g?k.rsCSS3Easing[d.st.easeInOut]:k.rsCSS3Easing[d.st.easeOut];d._b1.css(j);setTimeout(function(){d._i3(b)},d.hasTouch?5:0)}else{d._b=d.st.transitionSpeed;i=d._a4;h=d._d1;h.data("rsTimeout")&&h.css("opacity",0);f();i&&i.data("rsTimeout",setTimeout(function(){j[d._e+d._o1]="0ms";j.zIndex=0;j.display="none";i.data("rsTimeout","");i.css(j);setTimeout(function(){i.css("opacity",0)},16)},d._b+60));j.display="block";j.zIndex=d._k;j.opacity=0;j[d._e+d._o1]="0ms";j[d._e+d._p1]=
k.rsCSS3Easing[d.st.easeInOut];h.css(j);h.data("rsTimeout",setTimeout(function(){h.css(d._e+d._o1,d._b+"ms");h.data("rsTimeout",setTimeout(function(){h.css("opacity",1);h.data("rsTimeout","")},20))},20))}else if(d._j){j[d._f?d._r1:d._q1]=b+"px";d._b1.animate(j,d._b,g?d.st.easeInOut:d.st.easeOut)}else{i=d._a4;h=d._d1;h.stop(true,true).css({opacity:0,display:"block",zIndex:d._k});d._b=d.st.transitionSpeed;h.animate({opacity:1},d._b,d.st.easeInOut);f();i&&i.data("rsTimeout",setTimeout(function(){i.stop(true,
true).css({opacity:0,display:"none",zIndex:0})},d._b+60))}d._h2=true;d.loadingTimeout&&clearTimeout(d.loadingTimeout);d.loadingTimeout=a?setTimeout(function(){d.loadingTimeout=null;a.call()},d._b+60):setTimeout(function(){d.loadingTimeout=null;d._f4(e)},d._b+60)},_n2:function(){this._h2=false;clearTimeout(this.loadingTimeout);if(this._j)if(this._c){var b=this._m,e=this._a3=this._g4();this._b1.css(this._e+this._o1,"0ms");b!==e&&this._i3(e)}else{this._b1.stop(true);this._m=parseInt(this._b1.css(this._r1),
10)}else this._k>20?this._k=10:this._k++},_g4:function(){var b=window.getComputedStyle(this._b1.get(0),null).getPropertyValue(this._e+"transform").replace(/^matrix\(/i,"").split(/, |\)$/g);return parseInt(b[this._f?4:5],10)},_h4:function(b,e){return this._c?this._s1+(e?b+this._t1+0:0+this._t1+b)+this._u1:b},_f4:function(){if(!this._j){this._d1.css("z-index",0);this._k=10}this._h2=false;this.staticSlideId=this.currSlideId;this._j2();this._i4=false;this.ev.trigger("rsAfterSlideChange");this.st.afterSlideChange&&
this.st.afterSlideChange.call(this)},_e4:function(b,e){var c=this,g=(-c._q-c._z)*c._s;moveDist=30;if(c.numSlides!==0)if(c.st.loopRewind)b==="left"?c.goTo(c.numSlides-1,e):c.goTo(0,e);else if(!c._h2&&c._j&&moveDist!==0){c._b=200;var a=function(){c._h2=false};c._q3(g+(b==="left"?moveDist:-moveDist),"",false,true,function(){c._h2=false;c._q3(g,"",false,true,a)})}},_m2:function(b){if(!b.isRendered){var e=b.content,c="rsImg",g,a=this.st.imageAlignCenter,f=this.st.imageScaleMode,d;if(b.videoURL){c="rsVideoContainer";
if(f!=="fill")g=true;else{d=e;d.hasClass(c)||(d=d.find("."+c));d.css({width:"100%",height:"100%"});c="rsImg"}}e.hasClass(c)||(e=e.find("."+c));var i=b.iW,c=b.iH;b.isRendered=true;if(f!=="none"||a){bMargin=f!=="fill"?this._w3:0;b=this._u3-bMargin*2;d=this._v3-bMargin*2;var h,j,k={};if(f==="fit-if-smaller"&&(i>b||c>d))f="fit";if(f==="fill"||f==="fit"){h=b/i;j=d/c;h=f=="fill"?h>j?h:j:f=="fit"?h<j?h:j:1;i=Math.ceil(i*h,10);c=Math.ceil(c*h,10)}if(f!=="none"){k.width=i;k.height=c;g&&e.find(".rsImg").css({width:"100%",
height:"100%"})}if(a){k.marginLeft=Math.floor((b-i)/2)+bMargin;k.marginTop=Math.floor((d-c)/2)+bMargin}e.css(k)}}}};k.rsProto=t.prototype;k.fn.royalSlider=function(b){var e=arguments;return this.each(function(){var c=k(this);if(typeof b==="object"||!b)c.data("royalSlider")||c.data("royalSlider",new t(c,b));else if((c=c.data("royalSlider"))&&c[b])return c[b].apply(c,Array.prototype.slice.call(e,1))})};k.fn.royalSlider.defaults={slidesSpacing:8,startSlideId:0,loop:!1,loopRewind:!1,numImagesToPreload:4,
fadeinLoadedSlide:!0,slidesOrientation:"horizontal",transitionType:"move",transitionSpeed:600,controlNavigation:"bullets",controlsInside:!0,arrowsNav:!0,arrowsNavAutoHide:!0,navigateByClick:!0,randomizeSlides:!1,sliderDrag:!0,sliderTouch:!0,keyboardNavEnabled:!1,fadeInAfterLoaded:!0,allowCSS3:!0,allowCSS3OnWebkit:!0,addActiveClass:!1,autoHeight:!1,easeOut:"easeOutSine",easeInOut:"easeInOutSine",minSlideOffset:10,imageScaleMode:"fit-if-smaller",imageAlignCenter:!0,imageScalePadding:4,autoScaleSlider:!1,
autoScaleSliderWidth:800,autoScaleSliderHeight:400,autoScaleHeight:!0,arrowsNavHideOnTouch:!1,globalCaption:!1,beforeSlideChange:null,afterSlideChange:null,beforeResize:null,afterResize:null};k.rsCSS3Easing={easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)"};k.extend(jQuery.easing,{easeInOutSine:function(b,e,c,g,a){return-g/2*(Math.cos(Math.PI*e/a)-1)+c},easeOutSine:function(b,e,c,g,a){return g*Math.sin(e/a*(Math.PI/2))+c},easeOutCubic:function(b,
e,c,g,a){return g*((e=e/a-1)*e*e+1)+c}})})(jQuery);
// jquery.rs.active-class v1.0
(function(b){b.rsProto._j4=function(){var c,a=this;if(a.st.addActiveClass){a.ev.on("rsBeforeMove",function(){b()});a.ev.on("rsAfterInit",function(){b()});var b=function(){c&&clearTimeout(c);c=setTimeout(function(){a._a4&&a._a4.removeClass("rsActiveSlide");a._d1&&a._d1.addClass("rsActiveSlide");c=null},50)}}};b.rsModules.activeClass=b.rsProto._j4})(jQuery);
// jquery.rs.animated-blocks v1.0.2
(function(i){i.extend(i.rsProto,{_k4:function(){function j(){var e=a.currSlide;if(a.currSlide&&a.currSlide.isLoaded&&a._o4!==e){if(0<a._n4.length){for(b=0;b<a._n4.length;b++)clearTimeout(a._n4[b]);a._n4=[]}if(0<a._m4.length){var g;for(b=0;b<a._m4.length;b++)if(g=a._m4[b])a._c?(g.block.css(a._e+a._o1,"0s"),g.block.css(g.css)):g.running?g.block.stop(!0,!0):g.block.css(g.css),a._o4=null,e.animBlocksDisplayed=!1;a._m4=[]}e.animBlocks&&(e.animBlocksDisplayed=!0,a._o4=e,a._p4(e.animBlocks))}}var a=this,
b;a._l4={fadeEffect:!0,moveEffect:"top",moveOffset:20,speed:400,easing:"easeOutSine",delay:200};a.st.block=i.extend({},a._l4,a.st.block);a._m4=[];a._n4=[];a.ev.on("rsAfterInit",function(){j()});a.ev.on("rsBeforeParseNode",function(a,b,c){b=i(b);c.animBlocks=b.find(".rsABlock").css("display","none");c.animBlocks.length||(c.animBlocks=b.hasClass("rsABlock")?b.css("display","none"):!1)});a.ev.on("rsAfterContentSet",function(b,g){g.id===a.currSlideId&&setTimeout(function(){j()},a.st.fadeinLoadedSlide?
300:0)});a.ev.on("rsAfterSlideChange",function(){j()})},_q4:function(i,a){setTimeout(function(){i.css(a)},6)},_p4:function(j){var a=this,b,e,g,c;a._n4=[];j.each(function(j){b=i(this);e={};g={};c=null;var f=b.data("move-offset");isNaN(f)&&(f=a.st.block.moveOffset);if(0<f){var d=b.data("move-effect");d?(d=d.toLowerCase(),"none"===d?d=!1:"left"!==d&&("top"!==d&&"bottom"!==d&&"right"!==d)&&(d=a.st.block.moveEffect,"none"===d&&(d=!1))):d=a.st.block.moveEffect;if(d){var l;l="right"===d||"left"===d?!0:!1;
var k,h;isOppositeProp=!1;a._c?(k=0,h=a._r1):(l?isNaN(parseInt(b.css("right"),10))?h="left":(h="right",isOppositeProp=!0):isNaN(parseInt(b.css("bottom"),10))?h="top":(h="bottom",isOppositeProp=!0),h="margin-"+h,isOppositeProp&&(f=-f),k=parseInt(b.css(h),10));g[h]=a._h4("top"===d||"left"===d?k-f:k+f,l);e[h]=a._h4(k,l)}}if(f=b.attr("data-fade-effect")){if("none"===f.toLowerCase()||"false"===f.toLowerCase())f=!1}else f=a.st.block.fadeEffect;f&&(g.opacity=0,e.opacity=1);if(f||d)if(c={},c.hasFade=Boolean(f),
Boolean(d)&&(c.moveProp=h,c.hasMove=!0),c.speed=b.data("speed"),isNaN(c.speed)&&(c.speed=a.st.block.speed),c.easing=b.data("easing"),c.easing||(c.easing=a.st.block.easing),c.css3Easing=i.rsCSS3Easing[c.easing],c.delay=b.data("delay"),isNaN(c.delay))c.delay=a.st.block.delay*j;d={};a._c&&(d[a._e+a._o1]="0ms");d.moveProp=e.moveProp;d.opacity=e.opacity;d.display="none";a._m4.push({block:b,css:d});a._q4(b,g);a._n4.push(setTimeout(function(b,d,c,g){return function(){b.css("display","block");if(c){var f=
{};if(a._c){var e="";c.hasMove&&(e=e+c.moveProp);if(c.hasFade){c.hasMove&&(e=e+", ");e=e+"opacity"}f[a._e+a._n1]=e;f[a._e+a._o1]=c.speed+"ms";f[a._e+a._p1]=c.css3Easing;b.css(f);setTimeout(function(){b.css(d)},24)}else setTimeout(function(){b.animate(d,c.speed,c.easing)},16)}delete a._n4[g]}}(b,e,c,j),6>=c.delay?12:c.delay))})}});i.rsModules.animatedBlocks=i.rsProto._k4})(jQuery);
// jquery.rs.auto-height v1.0.1
(function(b){b.extend(b.rsProto,{_r4:function(){var a=this;if(a.st.autoHeight){var b,c;a.slider.addClass("rsAutoHeight");a.ev.on("rsAfterInit",function(){setTimeout(function(){d(!1);setTimeout(function(){a.slider.append('<div id="clear" style="clear:both;"></div>');a._c&&a._a1.css(a._e+"transition","height "+a.st.transitionSpeed+"ms ease-in-out")},16)},16)});a.ev.on("rsBeforeAnimStart",function(){d(!0)});a.ev.on("rsBeforeSizeSet",function(){setTimeout(function(){d(!1)},16)});var d=function(f){var e=
a.slides[a.currSlideId];b=e.holder;if(e.isLoaded)b&&(c=b.height(),0!==c&&void 0!==c&&(a._v3=c,a._c||!f?a._a1.css("height",c):a._a1.stop(!0,!0).animate({height:c},a.st.transitionSpeed)));else a.ev.off("rsAfterContentSet.rsAutoHeight").on("rsAfterContentSet.rsAutoHeight",function(a,b){e===b&&d()})}}}});b.rsModules.autoHeight=b.rsProto._r4})(jQuery);
// jquery.rs.autoplay v1.0.2
(function(b){b.extend(b.rsProto,{_u4:function(){var a=this,d;a._v4={enabled:!1,stopAtAction:!0,pauseOnHover:!0,delay:2E3};a.st.autoPlay=b.extend({},a._v4,a.st.autoPlay);a.st.autoPlay.enabled&&(a.ev.on("rsBeforeParseNode",function(a,c,e){c=b(c);if(d=c.attr("data-rsDelay"))e.customDelay=parseInt(d,10)}),a.ev.one("rsAfterInit",function(){a._w4()}),a.ev.on("rsBeforeDestroy",function(){a.stopAutoPlay()}))},_w4:function(){var a=this;a.startAutoPlay();a.ev.on("rsAfterContentSet",function(d,b){!a._g2&&(!a._h2&&
a._x4&&b===a.currSlide)&&a._y4()});a.ev.on("rsDragRelease",function(){a._x4&&a._z4&&(a._z4=!1,a._y4())});a.ev.on("rsAfterSlideChange",function(){a._x4&&a._z4&&(a._z4=!1,a.currSlide.isLoaded&&a._y4())});a.ev.on("rsDragStart",function(){a._x4&&(a.st.autoPlay.stopAtAction?a.stopAutoPlay():(a._z4=!0,a._a5()))});a.ev.on("rsBeforeMove",function(b,f,c){a._x4&&(c&&a.st.autoPlay.stopAtAction?a.stopAutoPlay():(a._z4=!0,a._a5()))});a._b5=!1;a.ev.on("rsVideoStop",function(){a._x4&&(a._b5=!1,a._y4())});a.ev.on("rsVideoPlay",
function(){a._x4&&(a._z4=!1,a._a5(),a._b5=!0)});a.st.autoPlay.pauseOnHover&&(a._c5=!1,a.slider.hover(function(){a._x4&&(a._z4=!1,a._a5(),a._c5=!0)},function(){a._x4&&(a._c5=!1,a._y4())}))},toggleAutoplay:function(){this._x4?this.startAutoPlay():this.stopAutoPlay()},startAutoPlay:function(){this._x4=!0;this.currSlide.isLoaded&&this._y4()},stopAutoPlay:function(){this._b5=this._c5=this._z4=this._x4=!1;this._a5()},_y4:function(){var a=this;!a._c5&&!a._b5&&(a._d5=!0,a._e5&&clearTimeout(a._e5),a._e5=setTimeout(function(){var b;
!a._v&&!a.st.loopRewind&&(b=!0,a.st.loopRewind=!0);a.next(!0);b&&(a.st.loopRewind=!1)},!a.currSlide.customDelay?a.st.autoPlay.delay:a.currSlide.customDelay))},_a5:function(){!this._c5&&!this._b5&&(this._d5=!1,this._e5&&(clearTimeout(this._e5),this._e5=null))}});b.rsModules.autoplay=b.rsProto._u4})(jQuery);
// jquery.rs.bullets v1.0
(function(c){c.extend(c.rsProto,{_f5:function(){var a=this;"bullets"===a.st.controlNavigation&&(a.ev.one("rsAfterPropsSetup",function(){a._g5=!0;a.slider.addClass("rsWithBullets");for(var b='<div class="rsNav rsBullets">',e=0;e<a.numSlides;e++)b+='<div class="rsNavItem rsBullet"><span class=""></span></div>';b=c(b+"</div>");a._t4=b;a._h5=b.children();a.slider.append(b);a._t4.click(function(b){b=c(b.target).closest(".rsNavItem");b.length&&a.goTo(b.index())})}),a.ev.on("rsOnAppendSlide",function(b,
c,d){d>=a.numSlides?a._t4.append('<div class="rsNavItem rsBullet"><span class=""></span></div>'):a._h5.eq(d).before('<div class="rsNavItem rsBullet"><span class=""></span></div>');a._h5=a._t4.children()}),a.ev.on("rsOnRemoveSlide",function(b,c){var d=a._h5.eq(c);d&&(d.remove(),a._h5=a._t4.children())}),a.ev.on("rsOnUpdateNav",function(){var b=a.currSlideId;a._i5&&a._i5.removeClass("rsNavSelected");b=c(a._h5[b]);b.addClass("rsNavSelected");a._i5=b}))}});c.rsModules.bullets=c.rsProto._f5})(jQuery);
// jquery.rs.deeplinking v1.0.1 + jQuery hashchange plugin v1.3 Copyright (c) 2010
(function(a){a.extend(a.rsProto,{_j5:function(){var b=this,g,d,e;b._k5={enabled:!1,change:!1,prefix:""};b.st.deeplinking=a.extend({},b._k5,b.st.deeplinking);if(b.st.deeplinking.enabled){var j=b.st.deeplinking.change,c="#"+b.st.deeplinking.prefix,f=function(){var a=window.location.hash;return a&&(a=parseInt(a.substring(c.length),10),0<=a)?a-1:-1},h=f();-1!==h&&(b.st.startSlideId=h);if(j)a(window).on("hashchange.rs",function(){if(!g){var a=f();a<0?a=0:a>b.numSlides-1&&(a=b.numSlides-1);b.goTo(a)}});
b.ev.on("rsAfterSlideChange",function(){d&&clearTimeout(d);e&&clearTimeout(e);e=setTimeout(function(){g=true;window.location.hash=c+(b.currSlideId+1);d=setTimeout(function(){g=false;d=0},60)},750)})}}});a.rsModules.deeplinking=a.rsProto._j5})(jQuery);
(function(a,b,g){function d(a){a=a||location.href;return"#"+a.replace(/^[^#]*#?(.*)$/,"$1")}"$:nomunge";var e=document,j,c=a.event.special,f=e.documentMode,h="onhashchange"in b&&(f===g||7<f);a.fn.hashchange=function(a){return a?this.bind("hashchange",a):this.trigger("hashchange")};a.fn.hashchange.delay=50;c.hashchange=a.extend(c.hashchange,{setup:function(){if(h)return!1;a(j.start)},teardown:function(){if(h)return!1;a(j.stop)}});var n=function(){var c=d(),e=p(m);c!==m?(o(m=c,e),a(b).trigger("hashchange")):
e!==m&&(location.href=location.href.replace(/#.*/,"")+e);k=setTimeout(n,a.fn.hashchange.delay)},c={},k,m=d(),o=f=function(a){return a},p=f;c.start=function(){k||n()};c.stop=function(){k&&clearTimeout(k);k=g};if(a.browser.msie&&!h){var i,l;c.start=function(){i||(l=(l=a.fn.hashchange.src)&&l+d(),i=a('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){l||o(d());n()}).attr("src",l||"javascript:0").insertAfter("body")[0].contentWindow,e.onpropertychange=function(){try{"title"===event.propertyName&&
(i.document.title=e.title)}catch(a){}})};c.stop=f;p=function(){return d(i.location.href)};o=function(b,c){var d=i.document,f=a.fn.hashchange.domain;b!==c&&(d.title=e.title,d.open(),f&&d.write('<script>document.domain="'+f+'"<\/script>'),d.close(),i.location.hash=b)}}j=c})(jQuery,this);
// jquery.rs.fullscreen v1.0
(function(c){c.extend(c.rsProto,{_l5:function(){var a=this;a._m5={enabled:!1,keyboardNav:!0,buttonFS:!0,nativeFS:!1,doubleTap:!0};a.st.fullscreen=c.extend({},a._m5,a.st.fullscreen);if(a.st.fullscreen.enabled)a.ev.one("rsBeforeSizeSet",function(){a._n5()})},_n5:function(){var a=this;a._o5=!a.st.keyboardNavEnabled&&a.st.fullscreen.keyboardNav;if(a.st.fullscreen.nativeFS){a._p5={supportsFullScreen:!1,isFullScreen:function(){return!1},requestFullScreen:function(){},cancelFullScreen:function(){},fullScreenEventName:"",
prefix:""};var b=["webkit","moz","o","ms","khtml"];if("undefined"!=typeof document.cancelFullScreen)a._p5.supportsFullScreen=!0;else for(var d=0;d<b.length;d++)if(a._p5.prefix=b[d],"undefined"!=typeof document[a._p5.prefix+"CancelFullScreen"]){a._p5.supportsFullScreen=!0;break}a._p5.supportsFullScreen?(a._p5.fullScreenEventName=a._p5.prefix+"fullscreenchange.rs",a._p5.isFullScreen=function(){switch(this.prefix){case "":return document.fullScreen;case "webkit":return document.webkitIsFullScreen;default:return document[this.prefix+
"FullScreen"]}},a._p5.requestFullScreen=function(a){return""===this.prefix?a.requestFullScreen():a[this.prefix+"RequestFullScreen"]()},a._p5.cancelFullScreen=function(){return""===this.prefix?document.cancelFullScreen():document[this.prefix+"CancelFullScreen"]()}):a._p5=!1}a.st.fullscreen.buttonFS&&(a._q5=c('<div class="rsFullscreenBtn"><div class="rsFullscreenIcn"></div></div>').appendTo(a.st.controlsInside?a._a1:a.slider).on("click.rs",function(){a.isFullscreen?a.exitFullscreen():a.enterFullscreen()}))},
enterFullscreen:function(a){var b=this;if(b._p5)if(a)b._p5.requestFullScreen(c("html")[0]);else{b._a.on(b._p5.fullScreenEventName,function(){b._p5.isFullScreen()?b.enterFullscreen(!0):b.exitFullscreen(!0)});b._p5.requestFullScreen(c("html")[0]);return}if(!b._r5){b._r5=!0;b._a.on("keyup.rsfullscreen",function(a){27===a.keyCode&&b.exitFullscreen()});b._o5&&b._v1();b._s5=c("html").attr("style");b._t5=c("body").attr("style");b._u5=b.slider.attr("style");c("body, html").css({overflow:"hidden",height:"100%",
width:"100%",margin:"0",padding:"0"});b.slider.addClass("rsFullscreen");var d;for(d=0;d<b.numSlides;d++)if(a=b.slides[d],a.isRendered=!1,a.bigImage){a.isMedLoaded=a.isLoaded;a.isMedLoading=a.isLoading;a.medImage=a.image;a.medIW=a.iW;a.medIH=a.iH;a.slideId=-99;a.bigImage!==a.medImage&&(a.sizeType="big");a.isLoaded=a.isBigLoaded;a.isLoading=a.isBigLoading;a.image=a.bigImage;a.iW=a.bigIW;a.iH=a.bigIH;a.contentAdded=!1;var e=!a.isLoaded?'<a class="rsImg" href="'+a.image+'"></a>':'<img class="rsImg" src="'+
a.image+'"/>';a.content.hasClass("rsImg")?a.content=c(e):a.content.find(".rsImg").replaceWith(e)}b.isFullscreen=!0;setTimeout(function(){b._r5=!1;b.updateSliderSize()},100)}},exitFullscreen:function(a){var b=this;if(b._p5){if(!a){b._p5.cancelFullScreen(c("html")[0]);return}b._a.off(b._p5.fullScreenEventName)}if(!b._r5){b._r5=!0;b._a.off("keyup.rsfullscreen");b._o5&&b._a.off("keydown.rskb");c("html").attr("style",b._s5||"");c("body").attr("style",b._t5||"");b.slider.removeClass("rsFullscreen");var d;
for(d=0;d<b.numSlides;d++)if(a=b.slides[d],a.isRendered=!1,a.bigImage){a.slideId=-99;a.isBigLoaded=a.isLoaded;a.isBigLoading=a.isLoading;a.bigImage=a.image;a.bigIW=a.iW;a.bigIH=a.iH;a.isLoaded=a.isMedLoaded;a.isLoading=a.isMedLoading;a.image=a.medImage;a.iW=a.medIW;a.iH=a.medIH;a.contentAdded=!1;var e=!a.isLoaded?'<a class="rsImg" href="'+a.image+'"></a>':'<img class="rsImg" src="'+a.image+'"/>';a.content.hasClass("rsImg")?a.content=c(e):a.content.find(".rsImg").replaceWith(e);a.holder&&a.holder.html(a.content);
a.bigImage!==a.medImage&&(a.sizeType="med")}b.isFullscreen=!1;setTimeout(function(){b._r5=!1;b.updateSliderSize()},100)}}});c.rsModules.fullscreen=c.rsProto._l5})(jQuery);
// jquery.rs.global-caption v1.0
(function(b){b.extend(b.rsProto,{_v5:function(){var a=this;a.st.globalCaption&&(a.ev.on("rsAfterInit",function(){a.globalCaption=b('<div class="rsGCaption"></div>').appendTo(a.slider);a.globalCaption.html(a.currSlide.caption)}),a.ev.on("rsBeforeAnimStart",function(){a.globalCaption.html(a.currSlide.caption)}))}});b.rsModules.globalCaption=b.rsProto._v5})(jQuery);
// jquery.rs.nav-auto-hide v1.0
(function(b){b.extend(b.rsProto,{_s4:function(){var a=this;if(a.st.navAutoHide&&!a.hasTouch)a.ev.one("rsAfterInit",function(){if(a._t4){a._t4.addClass("rsHidden");var b=a.slider;b.one("mousemove.controlnav",function(){a._t4.removeClass("rsHidden")});b.hover(function(){a._t4.removeClass("rsHidden")},function(){a._t4.addClass("rsHidden")})}})}});b.rsModules.autoHideNav=b.rsProto._s4})(jQuery);
// jquery.rs.tabs v1.0.1
(function(e){e.extend(e.rsProto,{_w5:function(){var a=this;"tabs"===a.st.controlNavigation&&(a.ev.on("rsBeforeParseNode",function(a,d,b){d=e(d);b.thumbnail=d.find(".rsTmb").remove();b.thumbnail.length?b.thumbnail=e(document.createElement("div")).append(b.thumbnail).html():(b.thumbnail=d.attr("data-rsTmb"),b.thumbnail||(b.thumbnail=d.find(".rsImg").attr("data-rsTmb")),b.thumbnail=b.thumbnail?'<img src="'+b.thumbnail+'"/>':"")}),a.ev.one("rsAfterPropsSetup",function(){a._x5()}),a.ev.on("rsOnAppendSlide",
function(c,d,b){b>=a.numSlides?a._t4.append('<div class="rsNavItem rsTab">'+d.thumbnail+"</div>"):a._h5.eq(b).before('<div class="rsNavItem rsTab">'+item.thumbnail+"</div>");a._h5=a._t4.children()}),a.ev.on("rsOnRemoveSlide",function(c,d){var b=a._h5.eq(d);b&&(b.remove(),a._h5=a._t4.children())}),a.ev.on("rsOnUpdateNav",function(){var c=a.currSlideId;a._i5&&a._i5.removeClass("rsNavSelected");c=e(a._h5[c]);c.addClass("rsNavSelected");a._i5=c}))},_x5:function(){var a=this,c,d;a._g5=!0;c='<div class="rsNav rsTabs">';
for(var b=0;b<a.numSlides;b++)b===a.numSlides-1&&(style=""),d=a.slides[b],c+='<div class="rsNavItem rsTab">'+d.thumbnail+"</div>";c=e(c+"</div>");a._t4=c;a._h5=c.find(".rsNavItem");a.slider.append(c);a._t4.click(function(b){b=e(b.target).closest(".rsNavItem");b.length&&a.goTo(b.index())})}});e.rsModules.tabs=e.rsProto._w5})(jQuery);
// jquery.rs.thumbnails v1.0.2
(function(f){f.extend(f.rsProto,{_y5:function(){var a=this;"thumbnails"===a.st.controlNavigation&&(a._z5={drag:!0,touch:!0,orientation:"horizontal",navigation:!0,arrows:!0,arrowLeft:null,arrowRight:null,spacing:4,arrowsAutoHide:!1,appendSpan:!1,transitionSpeed:600,autoCenter:!0,fitInViewport:!0,firstMargin:!0},a.st.thumbs=f.extend({},a._z5,a.st.thumbs),a.ev.on("rsBeforeParseNode",function(a,b,c){b=f(b);c.thumbnail=b.find(".rsTmb").remove();c.thumbnail.length?c.thumbnail=f(document.createElement("div")).append(c.thumbnail).html():
(c.thumbnail=b.attr("data-rsTmb"),c.thumbnail||(c.thumbnail=b.find(".rsImg").attr("data-rsTmb")),c.thumbnail=c.thumbnail?'<img src="'+c.thumbnail+'"/>':"")}),a.ev.one("rsAfterPropsSetup",function(){a._a6()}),a.ev.on("rsOnUpdateNav",function(){var e=a.currSlideId,b;a._i5&&a._i5.removeClass("rsNavSelected");b=f(a._h5[e]);b.addClass("rsNavSelected");a._b6&&a._c6(e);a._i5=b}),a.ev.on("rsOnAppendSlide",function(e,b,c){e="<div"+a._d6+' class="rsNavItem rsThumb">'+a._e6+b.thumbnail+"</div>";c>=a.numSlides?
a._l3.append(e):a._h5.eq(c).before(e);a._h5=a._l3.children();a.updateThumbsSize()}),a.ev.on("rsOnRemoveSlide",function(e,b){var c=a._h5.eq(b);c&&(c.remove(),a._h5=a._l3.children(),a.updateThumbsSize())}))},_a6:function(){var a=this,e="rsThumbs",b="",c,g,d=a.st.thumbs.spacing;a._g5=!0;0<d?(c=d+"px ",c=' style="margin: 0 '+c+c+'0;"'):c="";a._d6=c;a._x2="vertical"===a.st.thumbs.orientation?!1:!0;a._b3=0;a._f6=!1;a._g6=!1;a._b6=!1;a._h6=a.st.thumbs.arrows&&a.st.thumbs.navigation;g=a._x2?"Hor":"Ver";a.slider.addClass("rsWithThumbs rsWithThumbs"+
g);b+='<div class="rsNav rsThumbs rsThumbs'+g+'"><div class="'+e+'Container">';a._e6=a.st.thumbs.appendSpan?'<span class="thumbIco"></span>':"";for(var h=0;h<a.numSlides;h++)g=a.slides[h],b+="<div"+c+' class="rsNavItem rsThumb">'+a._e6+g.thumbnail+"</div>";b=f(b+"</div></div>");a._l3=f(b).find("."+e+"Container");if(a._h6&&(e+="Arrow",a.st.thumbs.arrowLeft?a._i6=a.st.thumbs.arrowLeft:(a._i6=f('<div class="'+e+" "+e+'Left"><div class="'+e+'Icn"></div></div>'),b.append(a._i6)),a.st.thumbs.arrowRight?
a._j6=a.st.thumbs.arrowRight:(a._j6=f('<div class="'+e+" "+e+'Right"><div class="'+e+'Icn"></div></div>'),b.append(a._j6)),a._i6.click(function(){var b=(Math.floor(a._b3/a._k6)+a._l6)*a._k6;a._t3(b>a._g3?a._g3:b)}),a._j6.click(function(){var b=(Math.floor(a._b3/a._k6)-a._l6)*a._k6;a._t3(b<a._h3?a._h3:b)}),a.st.thumbs.arrowsAutoHide&&!a.hasTouch))a._i6.css("opacity",0),a._j6.css("opacity",0),b.one("mousemove.rsarrowshover",function(){if(a._b6){a._i6.css("opacity",1);a._j6.css("opacity",1)}}),b.hover(function(){if(a._b6){a._i6.css("opacity",
1);a._j6.css("opacity",1)}},function(){if(a._b6){a._i6.css("opacity",0);a._j6.css("opacity",0)}});a._t4=b;a._h5=a._l3.children();a.slider.append(b);a._p3=!0;a._m6=d;a.st.thumbs.navigation&&a._c&&a._l3.css(a._e+"transition-property",a._e+"transform");a._t4.click(function(b){if(!a._g6){b=f(b.target).closest(".rsNavItem");b.length&&a.goTo(b.index())}});a.ev.off("rsBeforeSizeSet.thumbs").on("rsBeforeSizeSet.thumbs",function(){a._n6=a._x2?a._v3:a._u3;a.updateThumbsSize()})},updateThumbsSize:function(){var a=
this,e=a._h5.first(),b={},c=a._h5.length;a._k6=(a._x2?e.outerWidth():e.outerHeight())+a._m6;a._r3=c*a._k6-a._m6;b[a._x2?"width":"height"]=a._r3+a._m6;a._s3=a._x2?a._t4.width():a._t4.height();a._h3=-(a._r3-a._s3)-(a.st.thumbs.firstMargin?a._m6:0);a._g3=a.st.thumbs.firstMargin?a._m6:0;a._l6=Math.floor(a._s3/a._k6);if(a._r3<a._s3)a.st.thumbs.autoCenter&&a._j3((a._s3-a._r3)/2),a.st.thumbs.arrows&&a._i6&&(a._i6.addClass("rsThumbsArrowDisabled"),a._j6.addClass("rsThumbsArrowDisabled")),a._b6=!1,a._g6=!1,
a._t4.off(a._f1);else if(a.st.thumbs.navigation&&!a._b6&&(a._b6=!0,!a.hasTouch&&a.st.thumbs.drag||a.hasTouch&&a.st.thumbs.touch))a._g6=!0,a._t4.on(a._f1,function(b){a._b2(b,!0)});a._l3.css(b);if(a._p3&&(a.isFullscreen||a.st.thumbs.fitInViewport))a._x2?a._v3=a._n6-a._t4.outerHeight():a._u3=a._n6-a._t4.outerWidth()},setThumbsOrientation:function(a,e){this._p3&&(this.st.thumbs.orientation=a,this._t4.remove(),this.slider.removeClass("rsWithThumbsHor rsWithThumbsVer"),this._a6(),this._t4.off(this._f1),
e||this.updateSliderSize(!0))},_j3:function(a){this._b3=a;this._c?this._l3.css(this._r1,this._s1+(this._x2?a+this._t1+0:0+this._t1+a)+this._u1):this._l3.css(this._x2?this._r1:this._q1,a)},_t3:function(a,e,b,c,g){var d=this;if(d._b6){e||(e=d.st.thumbs.transitionSpeed);d._b3=a;d._o6&&clearTimeout(d._o6);d._f6&&(d._c||d._l3.stop(),b=!0);var h={};d._f6=!0;d._c?(h[d._e+"transition-duration"]=e+"ms",h[d._e+"transition-timing-function"]=b?f.rsCSS3Easing[d.st.easeOut]:f.rsCSS3Easing[d.st.easeInOut],d._l3.css(h),
d._j3(a)):(h[d._x2?d._r1:d._q1]=a+"px",d._l3.animate(h,e,b?"easeOutCubic":d.st.easeInOut));c&&(d._b3=c);d._p6();d._o6=setTimeout(function(){d._f6=false;if(g){d._t3(c,g,true);g=null}},e)}},_p6:function(){this._h6&&(this._b3===this._g3?this._i6.addClass("rsThumbsArrowDisabled"):this._i6.removeClass("rsThumbsArrowDisabled"),this._b3===this._h3?this._j6.addClass("rsThumbsArrowDisabled"):this._j6.removeClass("rsThumbsArrowDisabled"))},_c6:function(a,e){var b=0,c,f=a*this._k6+2*this._k6-this._m6+this._g3,
d=Math.floor(this._b3/this._k6);this._b6&&(f+this._b3>this._s3?(a===this.numSlides-1&&(b=1),d=-a+this._l6-2+b,c=d*this._k6+this._s3%this._k6+this._m6-this._g3):0!==a?(a-1)*this._k6<=-this._b3+this._g3&&a-1<=this.numSlides-this._l6&&(c=(-a+1)*this._k6+this._g3):c=this._g3,c!==this._b3&&(b=void 0===c?this._b3:c,b>this._g3?this._j3(this._g3):b<this._h3?this._j3(this._h3):void 0!==c&&(e?this._j3(c):this._t3(c))),this._p6())}});f.rsModules.thumbnails=f.rsProto._y5})(jQuery);
// jquery.rs.video v1.0.3
(function(e){e.extend(e.rsProto,{_q6:function(){var a=this;a._r6={autoHideArrows:!0,autoHideControlNav:!1,autoHideBlocks:!1,youTubeCode:'<iframe src="http://www.youtube.com/embed/%id%?rel=1&autoplay=1&showinfo=0&autoplay=1" frameborder="no"></iframe>',vimeoCode:'<iframe src="http://player.vimeo.com/video/%id%?byline=0&amp;portrait=0&amp;autoplay=1" frameborder="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'};a.st.video=e.extend({},a._r6,a.st.video);a.ev.on("rsBeforeSizeSet",
function(){a._d4&&setTimeout(function(){var b=a._d1,b=b.hasClass("rsVideoContainer")?b:b.find(".rsVideoContainer");a._s6.css({width:b.width(),height:b.height()})},32)});var d=e.browser.mozilla;a.ev.on("rsAfterParseNode",function(b,f,c){b=e(f);if(c.videoURL){d&&(a._c=a._d=!1);var f=e('<div class="rsVideoContainer"></div>'),g=e('<div class="rsBtnCenterer"><div class="rsPlayBtn"><div class="rsPlayBtnIcon"></div></div></div>');b.hasClass("rsImg")?c.content=f.append(b).append(g):c.content.find(".rsImg").wrap(f).after(g)}})},
toggleVideo:function(){return this._d4?this.stopVideo():this.playVideo()},playVideo:function(){var a=this;if(!a._d4){var d=a.currSlide;if(!d.videoURL)return!1;var b=a._t6=d.content,d=d.videoURL,f,c;d.match(/youtu\.be/i)||d.match(/youtube\.com\/watch/i)?(c=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,(c=d.match(c))&&11==c[7].length&&(f=c[7]),void 0!==f&&(a._s6=a.st.video.youTubeCode.replace("%id%",f))):d.match(/vimeo\.com/i)&&(c=/\/\/(www\.)?vimeo.com\/(\d+)($|\/)/,
(c=d.match(c))&&(f=c[2]),void 0!==f&&(a._s6=a.st.video.vimeoCode.replace("%id%",f)));a.videoObj=e(a._s6);a.ev.trigger("rsOnCreateVideoElement",[d]);a.videoObj.length&&(a._s6=e('<div class="rsVideoFrameHolder"><div class="rsPreloader"></div><div class="rsCloseVideoBtn"><div class="rsCloseVideoIcn"></div></div></div>'),a._s6.find(".rsPreloader").after(a.videoObj),b=b.hasClass("rsVideoContainer")?b:b.find(".rsVideoContainer"),a._s6.css({width:b.width(),height:b.height()}).find(".rsCloseVideoBtn").off("click.rsv").on("click.rsv",
function(b){a.stopVideo();b.preventDefault();b.stopPropagation();return false}),b.append(a._s6),a.isIPAD&&b.addClass("rsIOSVideo"),a._w1&&a.st.video.autoHideArrows&&(a._w1.addClass("rsHidden"),a._x1.addClass("rsHidden"),a._y1=!0),a._t4&&a.st.video.autoHideControlNav&&a._t4.addClass("rsHidden"),a.st.video.autoHideBlocks&&a.currSlide.animBlocks&&a.currSlide.animBlocks.addClass("rsHidden"),setTimeout(function(){a._s6.addClass("rsVideoActive")},10),a.ev.trigger("rsVideoPlay"),a._d4=!0);return!0}return!1},
stopVideo:function(){var a=this;return a._d4?(a.isIPAD&&a.slider.find(".rsCloseVideoBtn").remove(),a._w1&&a.st.video.autoHideArrows&&(a._w1.removeClass("rsHidden"),a._x1.removeClass("rsHidden"),a._y1=!1),a._t4&&a.st.video.autoHideControlNav&&a._t4.removeClass("rsHidden"),a.st.video.autoHideBlocks&&a.currSlide.animBlocks&&a.currSlide.animBlocks.removeClass("rsHidden"),setTimeout(function(){a.ev.trigger("rsOnDestroyVideoElement",[a.videoObj]);a._s6.remove()},16),a.ev.trigger("rsVideoStop"),a._d4=!1,
!0):!1}});e.rsModules.video=e.rsProto._q6})(jQuery);


function loadCalJSON(flag) {
	
	
	//alert(flag);
	if(flag && flag!="")
	{
		reloadAgenda=flag;
	}
	
	
	
	
	//INIT TABLE AGENDA
	db.transaction( function(trans){
		
		trans.executeSql( " CREATE TABLE IF NOT EXISTS agenda (id unique, datedebut, datedebutexplicite, datefin, datefinexplicite, longitude, latitude, theme, lien, title, chapo, texte, image, preview, lieu, adresse)", [],
				function(trans){
					//SUCCESS
				},
				function(trans, error){
					//alert( 'error '+ error.message );
				}
		);
		
	});
	
	

	readAgenda(updateAgenda);
}


//RECUPERE LES DONNEES DE LA BDD POUR LES AFFICHER
function readAgenda(_callback){

	if(!db)
		return;

	//lecture de la base
	db.transaction(function(trans){
		
		trans.executeSql('SELECT  id, datedebut, datedebutexplicite, datefin, datefinexplicite, longitude, latitude, theme, lien, title, chapo, texte, image, preview, lieu, adresse FROM agenda ', [], function(trans, data){
			
			
			calJSON=data;
			
						
			if(calJSON.rows.length>1)
			{
				
				var agenda = calJSON.rows.item(0);
				//alert(actu.title);
				
				initPanelJours();
				renderCalList();
				
				if(!_callback)
				{
					loadAgendaTermine=true;
					
					
					//AFFICHAGE DES DONNEES TERMINEE
				}
			
				
				
			}
			
			if(_callback)
			{
				_callback();
			}
			
			
		}, fnerreur);
	});

}



//RECUPERE LA MAJ JSON
function updateAgenda(){
	
	//$('#LoadingMsg').show();
	// récupération des données avec le dernier id
		$.ajax({ 
			
			//url: 'proxy.php?type=agenda',
			url: 'http://www.clermont-ferrand.fr/spip.php?page=agenda.json&var_mode=recalcul',
			//url: 'agenda.json',
			
			//type: 'GET',
			dataType:'json',
			success: function(data, status) {
				//debugger;
				
				
				//console.log(data);
					
				db.transaction(function(trans){ // insertion des données
					
					
					//SI ON A DES ACTUS ON MAJ LA BDD
					if(data.agenda.length>10)
					{				
						//On vide la table actus
						
						
						trans.executeSql('DELETE from agenda', [], function(){}, 
							fnerreur);
						
					
						//On insere les nouvelles actus
						data.agenda.forEach(function(item){
						
							trans.executeSql('INSERT into agenda (id, datedebut, datedebutexplicite, datefin, datefinexplicite, longitude, latitude, theme, lien, title, chapo, texte, image, preview, lieu, adresse) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [item.id, item.datedebut, item.datedebutexplicite, item.datefin,item.datefinexplicite, item.longitude, item.latitude, item.theme, item.lien, item.title, item.chapo, item.texte, item.image, item.preview, item.lieu, item.adresse], function(){}, 
							fnerreur);
						
						});
					}
					readAgenda(null);
					
					
				});
				
			},
			
			error: erreurAgenda
			
		});
}	







function fnerreur(trans , e){

	//alert(e.message);
	
	
	/*setTimeout(function(){
		
		$('#LoadingMsg').hide();		
		
	}, 2000);*/
	
	//renderActusLast();
	//renderActusList();
	

}


function erreurAgenda(trans , e){

	//alert("erreur agenda")
	
	loadAgendaTermine=true;
	
	//alert(e.message);
	
	//alert("dflkghsdfilghsdfk:mghskdh");
	/*setTimeout(function(){
		
		$('#LoadingMsg').hide();		
		
	}, 2000);*/
	
	//renderActusLast();
	//renderActusList();
	

}



/************************************************************************
 * FONCTIONS AGENDA
 ************************************************************************/

	
	function initPanelJours(){
	
	
	
		var oDate_1 = new Date(); // JOUR J
		var oDate_2 = new Date(oDate_1.getTime() +  (24 * 60 * 60 * 1000));  // JOUR + 1
		var oDate_3 = new Date(oDate_2.getTime() +  (24 * 60 * 60 * 1000));  // JOUR + 2
		var oDate_4 = new Date(oDate_3.getTime() +  (24 * 60 * 60 * 1000));  // JOUR + 3
		var oDate_5 = new Date(oDate_4.getTime() +  (24 * 60 * 60 * 1000));  // JOUR + 4
		var oDate_6 = new Date(oDate_5.getTime() +  (24 * 60 * 60 * 1000));  // JOUR + 5
		var oDate_7 = new Date(oDate_6.getTime() +  (24 * 60 * 60 * 1000));  // JOUR + 6
	
		if(largeurEcran>640 && hauteurEcran>640)
		{
			jour1=oDate_1.dateFormat('l', 'fr').substr(0,2)+" "+oDate_1.dateFormat('d', 'fr');
			jour2=oDate_2.dateFormat('l', 'fr').substr(0,2)+" "+oDate_2.dateFormat('d', 'fr');
			jour3=oDate_3.dateFormat('l', 'fr').substr(0,2)+" "+oDate_3.dateFormat('d', 'fr');
			jour4=oDate_4.dateFormat('l', 'fr').substr(0,2)+" "+oDate_4.dateFormat('d', 'fr');
			jour5=oDate_5.dateFormat('l', 'fr').substr(0,2)+" "+oDate_5.dateFormat('d', 'fr');
			jour6=oDate_6.dateFormat('l', 'fr').substr(0,2)+" "+oDate_6.dateFormat('d', 'fr');
			jour7=oDate_7.dateFormat('l', 'fr').substr(0,2)+" "+oDate_7.dateFormat('d', 'fr');
		}
		else
		{
			jour1=oDate_1.dateFormat('l', 'fr').substr(0,1)+"<br/>"+oDate_1.dateFormat('d', 'fr');
			jour2=oDate_2.dateFormat('l', 'fr').substr(0,1)+"<br/>"+oDate_2.dateFormat('d', 'fr');
			jour3=oDate_3.dateFormat('l', 'fr').substr(0,1)+"<br/>"+oDate_3.dateFormat('d', 'fr');
			jour4=oDate_4.dateFormat('l', 'fr').substr(0,1)+"<br/>"+oDate_4.dateFormat('d', 'fr');
			jour5=oDate_5.dateFormat('l', 'fr').substr(0,1)+"<br/>"+oDate_5.dateFormat('d', 'fr');
			jour6=oDate_6.dateFormat('l', 'fr').substr(0,1)+"<br/>"+oDate_6.dateFormat('d', 'fr');
			jour7=oDate_7.dateFormat('l', 'fr').substr(0,1)+"<br/>"+oDate_7.dateFormat('d', 'fr');
		}
		jour1_id=oDate_1.dateFormat('Y-m-d', 'fr');
		jour2_id=oDate_2.dateFormat('Y-m-d', 'fr');
		jour3_id=oDate_3.dateFormat('Y-m-d', 'fr');
		jour4_id=oDate_4.dateFormat('Y-m-d', 'fr');
		jour5_id=oDate_5.dateFormat('Y-m-d', 'fr');
		jour6_id=oDate_6.dateFormat('Y-m-d', 'fr');
		jour7_id=oDate_7.dateFormat('Y-m-d', 'fr');
		
	
		var agendaPanelJoursHTML="";
		agendaPanelJoursHTML+=''
		+'<li class="active" id="'+jour1_id+'"><a class="btn-danger" href="#" >'+jour1+'</a></li>'
		+'<li id="'+jour2_id+'"><a href="#" >'+jour2+'</a></li>'
		+'<li id="'+jour3_id+'"><a href="#" >'+jour3+'</a></li>'
		+'<li id="'+jour4_id+'"><a href="#" >'+jour4+'</a></li>'
		+'<li id="'+jour5_id+'"><a href="#" >'+jour5+'</a></li>'
		+'<li id="'+jour6_id+'"><a href="#" >'+jour6+'</a></li>'
		+'<li id="'+jour7_id+'"><a href="#" >'+jour7+'</a></li>';		
	
		$('#paneljours').empty().append(agendaPanelJoursHTML);
		//scrollpaneljours = new iScroll('septjours', { hScroll: true, vScroll: false, hScrollbar: false, checkDOMChanges: true, useTransition:true });
		
		/*scrollpaneljours.destroy();
		scrollpaneljours = null;  */
		
		// OR you can set attr to "" 
		$('#traceButton').attr('disabled', '');
		
	}
	
	
	//CLIQUE SUR UN JOUR DE LA SEMAINE POUR AFFICHER TOUS LES EVENEMENTS RELATIFS A CE JOUR
	function clickPanelJoursBtn(event){
	
		var detailHTMLCalJours="";
		var currentDataCalJour="";
		
		var currentidJour=$(event.currentTarget).attr('id');
		//$('#paneljours li a').addClass('btn-inverse');
		$('#paneljours li').removeClass('active');
		$('#paneljours li a').removeClass('btn-danger');
		//$('#'+currentidJour+' a').removeClass('btn-inverse');
		$('#'+currentidJour+' a').addClass('btn-danger');
		$('#'+currentidJour).addClass('active');
		
			
			
		
		var templateHTML;
		
		for(x = 0; x < calJSON.rows.length; x++)
		{
				
			var agenda = calJSON.rows.item(x);
			
			//alert(agenda.datedebut.substring(0,10));
			dated=agenda.datedebut.substring(0,10);
			datef=agenda.datefin.substring(0, 10);
				
			lieuEvenement=agenda.lieu;
		
			
		
			if(dated<=currentidJour && currentidJour<=datef)
			{
				
				currentDataCalJour= calJSON.rows.item(x);
			
				templateHTML="";
				
				templateHTML+='<li data-theme="b" id='+currentDataCalJour.id+'><a href="#">';
				templateHTML+='<img src='+currentDataCalJour.image+' class="img-rounded" width="120" height="90" />';
				templateHTML+='<p class="li-contenu">';
				templateHTML+='<strong>'+currentDataCalJour.title+'</strong><br/>';
				if(currentDataCalJour.latitude && currentDataCalJour.longitude){
					
					templateHTML+='<i class="icon-map-marker '+couleurIcone+'"></i> ';
					if(currentDataCalJour.title)
					{
						templateHTML+=currentDataCalJour.title;
					}
					templateHTML+=' <br />';
					
				}
				templateHTML+='<i class="icon-calendar '+couleurIcone+'"></i> début: '+currentDataCalJour.datedebutexplicite+' <br/><i class="icon-calendar '+couleurIcone+'"></i> fin: '+currentDataCalJour.datefinexplicite+'<br />';
				templateHTML+='<span class="li-theme-agenda"><i class="icon-hand-right '+couleurIcone+'"></i> '+currentDataCalJour.theme+'</span></p>';
				if(largeurEcran>=768){
					templateHTML+='<p class="ui-li-aside">'+currentDataCalJour.theme+'</p>';
				}
				templateHTML+='</a></li>';
				
	 
				detailHTMLCalJours+=templateHTML;
			}
		}
		var redetailHTMLCalJours=unescapeHTML(detailHTMLCalJours);
		$('#listeC').empty().append(redetailHTMLCalJours).listview('refresh');
		
		setTimeout(modifCouleurIcone,1000);
	}
	
	
	function renderCalList(data){
		var calHTML="";
		var currentDataCalJour="";
		var oDate_1 = new Date(); // JOUR J
		jour1_id=oDate_1.dateFormat('Y-m-d', 'fr');
		
		
		
		
		
		
		for(x = 0; x < calJSON.rows.length; x++)
		{
	
			var agenda = calJSON.rows.item(x);
	
			dated=agenda.datedebut.substring(0,10);
			datef=agenda.datefin.substring(0, 10);
		
			if(dated<=jour1_id && jour1_id<=datef)
			{
			
				currentDataCalJour= calJSON.rows.item(x);
			
				calHTML+='<li id="'+currentDataCalJour.id+'"><a href="#">';
				calHTML+='<img src="'+currentDataCalJour.image+'" class="img-rounded" width="120" height="90" />';
				
				calHTML+='<p class="li-contenu">';
				calHTML+='<strong>'+currentDataCalJour.title+'</strong><br/>';
				if(currentDataCalJour.latitude && currentDataCalJour.longitude){
					
					calHTML+='<i class="icon-map-marker '+couleurIcone+'"></i> ';
					if(currentDataCalJour.title)
					{
						calHTML+=currentDataCalJour.title;
					}
					calHTML+='<br />';
					
				}
				//calHTML+='<i class="icon-calendar '+couleurIcone+'"></i> '+currentDataCalJour.datedebutexplicite+' - '+currentDataCalJour.datefinexplicite+'<br />';
				//calHTML+='<span class="li-theme-agenda"><i class="icon-hand-right '+couleurIcone+'"></i> '+currentDataCalJour.theme+'</span></p>';
				//if(largeurEcran>640 && hauteurEcran>640){
				//	calHTML+='<p class="ui-li-aside">'+currentDataCalJour.theme+'</p>';
				//}
				
				//calHTML+='</a></li>';
				
				
				
				calHTML+='<i class="icon-calendar '+couleurIcone+'"></i> début: '+currentDataCalJour.datedebutexplicite+' <br/><i class="icon-calendar '+couleurIcone+'"></i> fin: '+currentDataCalJour.datefinexplicite+'<br />';
				calHTML+='<span class="li-theme-agenda"><i class="icon-hand-right '+couleurIcone+'"></i> '+currentDataCalJour.theme+'</span></p>';
				if(largeurEcran>=768){
					calHTML+='<p class="ui-li-aside">'+currentDataCalJour.theme+'</p>';
				}
				calHTML+='</a></li>';
				
				
			}
		}
		
		var recalHTML=unescapeHTML(calHTML);
		
		//$('#listeC').empty().append(recalHTML);
		
		
		//CLICK SUR BOUTON ACTUALISATION
		//if(reloadAgenda=="reload")
		//{
		//	$('#listeC').empty().append(recalHTML).listview('refresh');
		//}
		//else
		//{
		//	$('#listeC').empty().append(recalHTML).listview('create');
		//}
		
		
		console.log("mise a jour listview agenda");
		
		if ( $('#listeC').hasClass('ui-listview')) 
		{
		    $('#listeC').empty().append(recalHTML).listview('refresh');
		} 
		else 
		{
		    $('#listeC').empty().append(recalHTML).trigger('create');
		}
		
		
		

	}
	
	
//*******************************************************************************************************************//
//*************************CLIQUE SUR UNE BOUTON DETAIL D'UN EVENEMENT DANS L'AGENDA*********************************//
//*******************************************************************************************************************//
	function clickAgendaBtn(event){
		

		lieuEvenement="";
		latitude="";
		longitude="";
		IntituleEvenement="";
		
		
		
		
		var currentid=$(event.currentTarget).attr('id');
		var templateHTML="";
		
		
		$('#listeC li').removeClass('btn-danger');
		$('#listeC #'+currentid+'').addClass('btn-danger');
		
		
		detailHTMLCal="";
		
		for(x = 0; x < calJSON.rows.length; x++)
		{
			//dated=calJSON.agenda[x]["datedebut"].substring(0,10);
			//datef=calJSON.agenda[x]["datefin"].substring(0, 10);
		
			//console.log("elem:"+x+"datedeb:"+dated+" dtaefin:"+datef+"  ---elemcourant:"+currentid);
		
			currentDataCal= calJSON.rows.item(x);		
		
			if(currentDataCal.id==currentid)
			{
				
				templateHTML="";
				
				latitude=currentDataCal.latitude;
				longitude=currentDataCal.longitude;
				lieuEvenement=unescapeHTML(currentDataCal.lieu);
				IntituleEvenement=unescapeHTML(currentDataCal.title);
				
				
				//PARAMETRAGE D'ACCES AU BOUTON LOCALISATION
				if (latitude!="" && longitude!="")
				{
					hrefBtnLoc='#mapCarte';
					cssBtnLoc='btn-success btn-loc';
					iconBtnLoc='<i class="icon-map-marker"></i>';
					nomBtnLoc='Voir la Carte';
				}
				else
				{
					hrefBtnLoc='#';
					cssBtnLoc='btn-danger disabled'
					iconBtnLoc='<i class="icon-ban-circle"></i>';
					nomBtnLoc='Carte indisponible';
				}
				
				//PARAMETRAGE D'ACCES AU BOUTON ITINERAIRE
				if (latitudeUser && longitudeUser && latitude && longitude)
				{
					hrefBtnIti='#popupMap';
					cssBtnIti='btn-success';
					iconBtnIti='<i class="icon-move"></i>';
					nomBtnIti='Voir Itinéraire';
				}
				else
				{
					hrefBtnIti='#';
					cssBtnIti='btn-danger disabled'
					iconBtnIti='<i class="icon-ban-circle"></i>';
					nomBtnIti='Itinéraire indisponible';
				}
				
				templateHTML+='<div id='+currentDataCal.id+' class="fdagenda">';
				templateHTML+='<h1>'+currentDataCal.title+'</h1>';
			
				if(currentDataCal.adresse)
				{
					templateHTML+='<div data-role="collapsible" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d" data-icon="info" data-theme="a" data-content-theme="a" data-mini="true"><h3>'+currentDataCal.lieu+'</h3>';
					templateHTML+='<p><small>'+currentDataCal.adresse+'</small></p></div>';
				}
				if (latitude!="" && longitude!="")
				{
					templateHTML+='<div data-role="controlgroup" data-type="horizontal" data-mini="true"><a data-role="button" href="'+hrefBtnLoc+'"  class=" '+cssBtnLoc+'">'+iconBtnLoc+nomBtnLoc+'</a>';
					templateHTML+='<a data-role="button" id="traceButton" href="'+hrefBtnIti+'" data-rel="popup" data-position-to="window"  class=" '+cssBtnIti+'">'+iconBtnIti+nomBtnIti+'</a></div>';
					//templateHTML+='<a href="'+hrefBtnLoc+'" data-rel="popup" data-position-to="window" class="btn '+cssBtnLoc+'">'+iconBtnLoc+nomBtnLoc+'</a>';
				}
				templateHTML+='<img src='+currentDataCal.preview+' class="img-rounded pull-right" />';
				templateHTML+='<p><small><i class="icon-calendar"></i> '+currentDataCal.datedebutexplicite+' - '+currentDataCal.datefinexplicite+' <br />';
				templateHTML+='<i class="icon-hand-right"></i> '+currentDataCal.theme+'</small></p>';
				templateHTML+='<div id="texte-agenda">'+htmlDecode(currentDataCal.texte)+'</div>';
				templateHTML+='</div>';
				
				detailHTMLCal+= templateHTML;
				
				break;	
			}
		}
		var redetailHTMLCal=unescapeHTML(detailHTMLCal);
		//ON INJECTE LA DESCRIPTION DU LIEU
		$('#descriptionlocalisation').empty().append(redetailHTMLCal).trigger('create');
		
		//les liens sont supprim�s
		setTimeout('$("#texte-agenda a").attr("href","#");',1000);
		
		
		
		//les liens sont supprim�s
		//setTimeout('$("#descriptionlocalisation a").attr("href","#");',1000);
		//scrolldescriptionlocalisation = new iScroll('descriptionlocalisation', { hScroll: false, hScrollbar: false, checkDOMChanges: true, useTransition:true });
		
		
	
		//POUR IOS
		trackEventGA("Agenda", "consultation", lieuEvenement+" - "+IntituleEvenement);
		
		//POUR ANDROID
		trackEventAndroid("Agenda", "consultation", lieuEvenement+" - "+IntituleEvenement);
		
		
		$.mobile.changePage( "#map", {
				reverse: true,
				changeHash: true
		});
	}

function clickLocalisationBtn(event){

	//var $objetDeclencheur= $(event.target);
	//var idobjet= $objetDeclencheur.attr('id');
		
	//alert($objetDeclencheur)
	
	if (latitude!="" && longitude!="")
		{
			

			//ON VIDE LA DIV CONTENANT LA MAP LOCALISATION
			$("#mapLocalisation").empty();
			$('#titreLocalisation').empty()
						
			
			// create map
			mapL = new OpenLayers.Map({
				div: "mapLocalisation",
				controls: [
					//new OpenLayers.Control.Attribution(),
					new OpenLayers.Control.ScaleLine(),
					new OpenLayers.Control.TouchNavigation({
						dragPanOptions: {
						enableKinetic: true
						}
					}),
					new OpenLayers.Control.Zoom()
				],
				
				center: new OpenLayers.LonLat(742000, 5861000),
				zoom: 3
			});									
												
			var layer_de_baseL =  new OpenLayers.Layer.OSM();
			mapL.addLayer(layer_de_baseL);
			
			

									
													
			var epsg4326L = new OpenLayers.Projection("EPSG:4326");
			
			var lieu = new OpenLayers.LonLat(longitude,latitude);	
			var markersL = new OpenLayers.Layer.Markers("Lieu de l'évenement");
			mapL.addLayer(markersL);
		
			markersL.addMarker(new OpenLayers.Marker(
				lieu.clone().transform(epsg4326L, mapL.getProjectionObject())));
				centerL = lieu.transform(epsg4326L, mapL.getProjectionObject());
				mapL.setCenter(centerL, 17);	
				
				
		}
		else
		{
			// $('#localisation').hide();
		}
		
		//ON INJECTE LE TITRE DE l'EVENEMENT
		$('#titreLocalisation').empty().append("<img width='15' height='15' src='img/marker.png'></img><b>"+lieuEvenement+"</b> - "+IntituleEvenement);
		
			
		//POUR IOS
		trackEventGA("Agenda", "localisation", lieuEvenement+" - "+IntituleEvenement);
		
		//POUR ANDROID
		trackEventAndroid("Agenda", "localisation", lieuEvenement+" - "+IntituleEvenement);
		
		
		$.mobile.changePage( "#mapCarte", {
				reverse: true,
				changeHash: true
		});
		
		//ON CHARGE LA SCROLL SUR LA DESCRIPTION DU LIEU
		//scrolldescriptionlocalisation = new iScroll('mapLocalisation', { hScroll: false, hScrollbar: false, checkDOMChanges: true, useTransition:true });

}


function recentrerMapL(event){

	//var $objetDeclencheur= $(event.target);
	//var idobjet= $objetDeclencheur.attr('id');
		
	//alert($objetDeclencheur)
	if(typeof (lieuEvenement)=="undefined") lieuEvenement="";
	if(typeof (latitude)=="undefined") latitude=""; 
	if(typeof (longitude)=="undefined") longitude=""; 
	if(typeof (IntituleEvenement)=="undefined") IntituleEvenement=""; 
	
	
	
	
	if (latitude!="" && longitude!="")
		{
			

			//ON VIDE LA DIV CONTENANT LA MAP LOCALISATION
			$("#mapLocalisation").empty();
			$('#titreLocalisation').empty()
						
			
			// create map
			mapL = new OpenLayers.Map({
				div: "mapLocalisation",
				controls: [
					//new OpenLayers.Control.Attribution(),
					new OpenLayers.Control.ScaleLine(),
					new OpenLayers.Control.TouchNavigation({
						dragPanOptions: {
						enableKinetic: true
						}
					}),
					new OpenLayers.Control.Zoom()
				],
				
				center: new OpenLayers.LonLat(742000, 5861000),
				zoom: 3
			});									
												
			var layer_de_baseL =  new OpenLayers.Layer.OSM();
			mapL.addLayer(layer_de_baseL);
			
			
										
			var epsg4326L = new OpenLayers.Projection("EPSG:4326");
			
			var lieu = new OpenLayers.LonLat(longitude,latitude);	
			var markersL = new OpenLayers.Layer.Markers("Lieu de l'évenement");
			mapL.addLayer(markersL);
		
			markersL.addMarker(new OpenLayers.Marker(
				lieu.clone().transform(epsg4326L, mapL.getProjectionObject())));
				centerL = lieu.transform(epsg4326L, mapL.getProjectionObject());
				mapL.setCenter(centerL, 17);	
				
				
		}
		else
		{
			// $('#localisation').hide();
		}
		
		//ON INJECTE LE TITRE DE l'EVENEMENT
		$('#titreLocalisation').empty().append("<img width='15' height='15' src='img/marker.png'></img><b>"+lieuEvenement+"</b> - "+IntituleEvenement);
		

}

//*****************************************************************************************************//
//*************************CLIQUE SUR UNE BOUTON ITINERAIRE A PIED*********************************//
//*****************************************************************************************************//
function clickItineraireBtnP(event){
	
	typeMapRoutage="P";
	
	if (latitudeUser && longitudeUser && latitude && longitude){
		
		//ON VIDE LES DIVS DE ROUTAGE.HTML
		$('#mapDiv').empty();
		$('#titreItineraire').empty();
		
		//CHARGEMENT DE LA MAP POUR L'ITINERAIRE
		mapP = new OpenLayers.Map({
			div: "mapDiv",
			controls: [
				//new OpenLayers.Control.Attribution(),
				new OpenLayers.Control.ScaleLine(),
				new OpenLayers.Control.TouchNavigation({
					dragPanOptions: {
					enableKinetic: true
					}
				}),
				new OpenLayers.Control.Zoom()
			],
		});
			
		var layer_de_base =  new OpenLayers.Layer.OSM();
		mapP.addLayer(layer_de_base);
				
		$('#titreHeaderRoutage').empty().append("A PIED");
		
		var from = new OpenLayers.LonLat(longitudeUser,latitudeUser);
		var to = new OpenLayers.LonLat(longitude,latitude);	
			
		ecartLongM = parseFloat(longitudeUser) - parseFloat(longitude);
		ecartLatM = parseFloat(latitudeUser) - parseFloat(latitude);
		
		ecartLongM = ecartLongM/2;
		ecartLatM = ecartLatM/2
		
		longitudeM = parseFloat(longitude) + parseFloat(ecartLongM);
		latitudeM = parseFloat(latitude) + parseFloat(ecartLatM);
		
		var middle = new OpenLayers.LonLat(longitudeM,latitudeM);	

		epsg4326 = new OpenLayers.Projection("EPSG:4326");
		center = new OpenLayers.LonLat(longitudeM, latitudeM).transform(epsg4326, mapP.getProjectionObject());


			//	mapP.setCenter(center, 13);

		addScriptP('http://routes.cloudmade.com/BC9A493B41014CAABB98F0471D759707/api/0.3/' +
				from.lat + ',' + from.lon + ',' + to.lat + ',' + to.lon + 
				'/foot.js?callback=getRouteP');
		
		var size = new OpenLayers.Size(21,25);
		var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
		var icon = new OpenLayers.Icon('img/markerVert.png', size, offset);
		var icon2 = new OpenLayers.Icon('img/marker.png', size, offset);
		
		var markers = new OpenLayers.Layer.Markers("Itinéraire à pied");
			mapP.addLayer(markers);
			
		markers.addMarker(new OpenLayers.Marker(
				from.clone().transform(epsg4326, mapP.getProjectionObject()),icon));
		markers.addMarker(new OpenLayers.Marker(
				to.clone().transform(epsg4326, mapP.getProjectionObject()),icon2));


		//POUR IOS
		trackEventGA("Agenda", "Itinéraire", lieuEvenement+" - "+IntituleEvenement);
		
		//POUR ANDROID
		trackEventAndroid("Agenda", "Itinéraire", lieuEvenement+" - "+IntituleEvenement);
		
		
		$.mobile.changePage( "#routage", {
			reverse: false,
			changeHash: false
		});
	}
	
}



function recentrerMapP(event){
	
	if(typeof (lieuEvenement)=="undefined") lieuEvenement="";
	if(typeof (latitude)=="undefined") latitude=""; 
	if(typeof (longitude)=="undefined") longitude=""; 
	if(typeof (IntituleEvenement)=="undefined") IntituleEvenement=""; 
	
	
	if (latitudeUser && longitudeUser && latitude && longitude){
		
		//ON VIDE LES DIVS DE ROUTAGE.HTML
		$('#mapDiv').empty();
		$('#titreItineraire').empty();
		
		//CHARGEMENT DE LA MAP POUR L'ITINERAIRE
		mapP = new OpenLayers.Map({
			div: "mapDiv",
			controls: [
				//new OpenLayers.Control.Attribution(),
				new OpenLayers.Control.ScaleLine(),
				new OpenLayers.Control.TouchNavigation({
					dragPanOptions: {
					enableKinetic: true
					}
				}),
				new OpenLayers.Control.Zoom()
			],
		});
			
		var layer_de_base =  new OpenLayers.Layer.OSM();
		mapP.addLayer(layer_de_base);
				
		$('#titreHeaderRoutage').empty().append("A PIED");
		
		var from = new OpenLayers.LonLat(longitudeUser,latitudeUser);
		var to = new OpenLayers.LonLat(longitude,latitude);	
			
		ecartLongM = parseFloat(longitudeUser) - parseFloat(longitude);
		ecartLatM = parseFloat(latitudeUser) - parseFloat(latitude);
		
		ecartLongM = ecartLongM/2;
		ecartLatM = ecartLatM/2
		
		longitudeM = parseFloat(longitude) + parseFloat(ecartLongM);
		latitudeM = parseFloat(latitude) + parseFloat(ecartLatM);
		
		var middle = new OpenLayers.LonLat(longitudeM,latitudeM);	

		epsg4326 = new OpenLayers.Projection("EPSG:4326");
		center = new OpenLayers.LonLat(longitudeM, latitudeM).transform(epsg4326, mapP.getProjectionObject());


			//	mapP.setCenter(center, 13);

		addScriptP('http://routes.cloudmade.com/BC9A493B41014CAABB98F0471D759707/api/0.3/' +
				from.lat + ',' + from.lon + ',' + to.lat + ',' + to.lon + 
				'/foot.js?callback=getRouteP');
		
		var size = new OpenLayers.Size(21,25);
		var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
		var icon = new OpenLayers.Icon('img/markerVert.png', size, offset);
		var icon2 = new OpenLayers.Icon('img/marker.png', size, offset);
		
		var markers = new OpenLayers.Layer.Markers("Itinéraire à pied");
			mapP.addLayer(markers);
			
		markers.addMarker(new OpenLayers.Marker(
				from.clone().transform(epsg4326, mapP.getProjectionObject()),icon));
		markers.addMarker(new OpenLayers.Marker(
				to.clone().transform(epsg4326, mapP.getProjectionObject()),icon2));


		
		
	
		
	}
	
}







function addScriptP(url) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}
		
function getRouteP(response ) {
	//console.log(response);
	
	if(typeof(response.route_geometry)=="undefined")
	{
		navigator.notification.alert("L'itineraire est indisponible",erreurItineraire,"Info","Fermer");
		return;
	}
	
	
	var points = [];
	var tabchemins =[];
	
	
	var debut;
	var fin;
	var distance;
	var tempsParcour;
	
	for (var i = 0; i < response.route_geometry.length; i++) {
		var point = new OpenLayers.Geometry.Point(
		response.route_geometry[i][1], 
		response.route_geometry[i][0]);
		points.push(point.transform(epsg4326, mapP .getProjectionObject()));
	}
			
	for (var i = 0; i < response.route_instructions.length; i++) {
		tabchemins.push(response.route_instructions[i][0]);
	}
	
	//DEPART
	debut=response.route_summary["start_point"];
	//ARRIVEE
	fin=response.route_summary["end_point"];
	//DISTANCE
	distance=response.route_summary["total_distance"];
	distanceM=distance;
	distance=parseFloat(distance)/1000;
	distance=Math.round(distance*1000)/1000;
	
	//TEMPD DE PARCOURS
	tempsParcour=response.route_summary["total_time"];
    tempsParcour=parseFloat(tempsParcour);

	
	//RECENTRE LA MAP ET REPOSITIONNE LE ZOOM SUR L'ITINERAIRE
	recadrerItineraire(mapP);
	
	//IPAD
	//if (isIpad){
	$('#titreItineraire').empty().append("[Distance: "+distance+"Km] - [Temps: "+conversion_seconde_heure(tempsParcour)+"]<br/><img width='15' height='15' src='img/markerVert.png'></img><b>Départ:</b>"+debut+"(Votre position) <br/> <img width='15' height='15' src='img/marker.png'></img><b>Arrivée:</b>"+fin+"("+lieuEvenement+")");
	//}
	var geometry = new OpenLayers.Geometry.LineString(points);
	var feature = new OpenLayers.Feature.Vector(geometry, null, {
		strokeColor: "#0033ff",
		strokeOpacity: 0.7,
		strokeWidth: 5
	});
			
	var vectors = new OpenLayers.Layer.Vector("Vectors");
				
	vectors.addFeatures(feature);
			
	mapP .addLayer(vectors);
			
	var schemin="";
	for(var i = 0; i < tabchemins.length; i++)
	{
		schemin= schemin + tabchemins[i] + "</br>";
	} 
			
	//document.getElementById('chemins').innerHTML = schemin;

}








//*****************************************************************************************************//
//*************************CLIQUE SUR UNE BOUTON ITINERAIRE EN VOITURE*********************************//
//*****************************************************************************************************//
function clickItineraireBtnV(event){

	typeMapRoutage="V";
	
	if (latitudeUser && longitudeUser && latitude && longitude){
		//ON VIDE LES DIV QUE COMPOSE LA PAGE ROUTAGE.HTML
		$('#mapDiv').empty();
		$('#titreItineraire').empty();
		
		//CHARGEMENT DE LA MAP POUR L'ITINERAIRE
		mapV  = new OpenLayers.Map({
			div: "mapDiv",
			controls: [
				//new OpenLayers.Control.Attribution(),
				new OpenLayers.Control.ScaleLine(),
				new OpenLayers.Control.TouchNavigation({
					dragPanOptions: {
						enableKinetic: true
					}
				}),
				new OpenLayers.Control.Zoom()
			],
		});
						
		var layer_de_base =  new OpenLayers.Layer.OSM();
		mapV .addLayer(layer_de_base);		
	
		$('#titreHeaderRoutage').empty().append("EN VOITURE");	
	
		var from = new OpenLayers.LonLat(longitudeUser,latitudeUser);
		var to = new OpenLayers.LonLat(longitude,latitude);	
			
		ecartLongM = parseFloat(longitudeUser) - parseFloat(longitude);
		ecartLatM = parseFloat(latitudeUser) - parseFloat(latitude);
		
		ecartLongM = ecartLongM/2;
		ecartLatM = ecartLatM/2
		
		longitudeM = parseFloat(longitude) + parseFloat(ecartLongM);
		latitudeM = parseFloat(latitude) + parseFloat(ecartLatM);
		
	
		
		var middle = new OpenLayers.LonLat(longitudeM,latitudeM);	

		epsg4326 = new OpenLayers.Projection("EPSG:4326");
		center = new OpenLayers.LonLat(longitudeM, latitudeM).transform(epsg4326, mapV.getProjectionObject());


		

		
		addScriptV('http://routes.cloudmade.com/BC9A493B41014CAABB98F0471D759707/api/0.3/' +
				from.lat + ',' + from.lon + ',' + to.lat + ',' + to.lon + 
				'/car.js?callback=getRouteV');
		
		
		var size = new OpenLayers.Size(21,25);
		var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
		var icon = new OpenLayers.Icon('img/markerVert.png', size, offset);
		var icon2 = new OpenLayers.Icon('img/marker.png', size, offset);
		
	
		var markers = new OpenLayers.Layer.Markers("Itinéraire en� voiture");
			mapV.addLayer(markers);
			
		markers.addMarker(new OpenLayers.Marker(
				from.clone().transform(epsg4326, mapV .getProjectionObject()),icon));
		markers.addMarker(new OpenLayers.Marker(
				to.clone().transform(epsg4326, mapV.getProjectionObject()),icon2));

		
		//POUR IOS
		trackEventGA("Agenda", "Itinéraire", lieuEvenement+" - "+IntituleEvenement);
		
		//POUR ANDROID
		trackEventAndroid("Agenda", "Itinéraire", lieuEvenement+" - "+IntituleEvenement);		
	
		$.mobile.changePage( "#routage", {
			reverse: false,
			changeHash: false
		});
	}
	
}



function recentrerMapV(event){
	
	
	if(typeof (lieuEvenement)=="undefined") lieuEvenement="";
	if(typeof (latitude)=="undefined") latitude=""; 
	if(typeof (longitude)=="undefined") longitude=""; 
	if(typeof (IntituleEvenement)=="undefined") IntituleEvenement=""; 
	
	if (latitudeUser && longitudeUser && latitude && longitude){
		//ON VIDE LES DIV QUE COMPOSE LA PAGE ROUTAGE.HTML
		$('#mapDiv').empty();
		$('#titreItineraire').empty();
		
		//CHARGEMENT DE LA MAP POUR L'ITINERAIRE
		mapV  = new OpenLayers.Map({
			div: "mapDiv",
			controls: [
				//new OpenLayers.Control.Attribution(),
				new OpenLayers.Control.ScaleLine(),
				new OpenLayers.Control.TouchNavigation({
					dragPanOptions: {
						enableKinetic: true
					}
				}),
				new OpenLayers.Control.Zoom()
			],
		});
						
		var layer_de_base =  new OpenLayers.Layer.OSM();
		mapV .addLayer(layer_de_base);
				

	
		$('#titreHeaderRoutage').empty().append("EN VOITURE");
	
	
		var from = new OpenLayers.LonLat(longitudeUser,latitudeUser);
		var to = new OpenLayers.LonLat(longitude,latitude);	
			
		ecartLongM = parseFloat(longitudeUser) - parseFloat(longitude);
		ecartLatM = parseFloat(latitudeUser) - parseFloat(latitude);
		
		ecartLongM = ecartLongM/2;
		ecartLatM = ecartLatM/2
		
		longitudeM = parseFloat(longitude) + parseFloat(ecartLongM);
		latitudeM = parseFloat(latitude) + parseFloat(ecartLatM);
		
	
		
		var middle = new OpenLayers.LonLat(longitudeM,latitudeM);	

		epsg4326 = new OpenLayers.Projection("EPSG:4326");
		center = new OpenLayers.LonLat(longitudeM, latitudeM).transform(epsg4326, mapV.getProjectionObject());


		

		
		addScriptV('http://routes.cloudmade.com/BC9A493B41014CAABB98F0471D759707/api/0.3/' +
				from.lat + ',' + from.lon + ',' + to.lat + ',' + to.lon + 
				'/car.js?callback=getRouteV');
		
		
		var size = new OpenLayers.Size(21,25);
		var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
		var icon = new OpenLayers.Icon('img/markerVert.png', size, offset);
		var icon2 = new OpenLayers.Icon('img/marker.png', size, offset);
		
	
		var markers = new OpenLayers.Layer.Markers("Itinéraire en� voiture");
			mapV.addLayer(markers);
			
		markers.addMarker(new OpenLayers.Marker(
				from.clone().transform(epsg4326, mapV .getProjectionObject()),icon));
		markers.addMarker(new OpenLayers.Marker(
				to.clone().transform(epsg4326, mapV.getProjectionObject()),icon2));

	
		/*$.mobile.changePage( "#routage", {
			reverse: true,
			changeHash: true
		});*/
	}
	
}







//AJOUTE LE SCRIPTE NECESSAIRE A L'AFFICHAGE DE L'ITINERAIRE
function addScriptV(url) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}





//TRACE L'ITINERAIRE	
function getRouteV(response ) {
	//console.log(response.route_geometry);
		
	if(typeof(response.route_geometry)=="undefined")
	{
		navigator.notification.alert("L'itineraire est indisponible",erreurItineraire,"Info","Fermer");
		return;
	}
	
	
	var points = [];
	var tabchemins =[];
	
	
	var debut;
	var fin;
	var distance;
	var tempsParcour;
	
	for (var i = 0; i < response.route_geometry.length; i++) {
		var point = new OpenLayers.Geometry.Point(
		response.route_geometry[i][1], 
		response.route_geometry[i][0]);
		points.push(point.transform(epsg4326, mapV .getProjectionObject()));
	}
			
	for (var i = 0; i < response.route_instructions.length; i++) {
		tabchemins.push(response.route_instructions[i][0]);
	}
	
	//DEPART
	debut=response.route_summary["start_point"];
	//ARRIVEE
	fin=response.route_summary["end_point"];
	//DISTANCE TOTALE
	distance=response.route_summary["total_distance"];
	distanceM=distance;
	distance=parseFloat(distance)/1000;
	distance=Math.round(distance*1000)/1000;
	//TEMPS DE PARCOUR TOTALE
	tempsParcour=response.route_summary["total_time"];
    tempsParcour=parseFloat(tempsParcour);
	
	
	//PERMET DE REPLACER LE ZOOM SUR L'ITINERAIRE
	recadrerItineraire(mapV);
	
	
	//ON AFFICHE DANS LA DIV LES INFOS CONCERNAT L'ITINERAIRE
	//SEULEMENT POUR L'IPAD
	//if (isIpad){
	$('#titreItineraire').empty().append("- Distance: "+distance+"Km] - Temps: "+conversion_seconde_heure(tempsParcour)+"<br/><img width='15' height='15' src='img/markerVert.png'></img><b>Départ:</b>"+debut+"(Votre emplacement actuel) <br/> <img width='15' height='15' src='img/marker.png'></img><b>Arrivée:</b>"+fin+"("+lieuEvenement+")");
	//}
	var geometry = new OpenLayers.Geometry.LineString(points);
	var feature = new OpenLayers.Feature.Vector(geometry, null, {
		strokeColor: "#0033ff",
		strokeOpacity: 0.7,
		strokeWidth: 5
	});
			
	var vectors = new OpenLayers.Layer.Vector("Vectors");
				
	vectors.addFeatures(feature);
			
	mapV.addLayer(vectors);
			
	var schemin="";
	for(var i = 0; i < tabchemins.length; i++)
	{
		schemin= schemin + tabchemins[i] + "</br>";
	} 
	
	//document.getElementById('chemins').innerHTML = schemin;

}

	



//RECENTRE LA MAP ET REPOSITIONNNE LE ZOOM SUR L'ITINERAIRE 
function recadrerItineraire(map){
	if(center){
		if(largeurEcran>640 && hauteurEcran>640){
			if(distanceM<=750) map.setCenter(center, 17);
			if(distanceM<=1500 && distanceM>750) map.setCenter(center, 16);
			if(distanceM<=3000 && distanceM>1500) map.setCenter(center, 15);
			if(distanceM<=5000 && distanceM>3000) map.setCenter(center, 14);
			if(distanceM<=10000 && distanceM>5000) map.setCenter(center, 13);
			if(distanceM>10000) map.setCenter(center, 12);
		}
		else{
			if(distanceM<=750) map.setCenter(center, 16);
			if(distanceM<=1500 && distanceM>750) map.setCenter(center, 15);
			if(distanceM<=3000 && distanceM>1500) map.setCenter(center, 14);
			if(distanceM<=5000 && distanceM>3000) map.setCenter(center, 13);
			if(distanceM<=10000 && distanceM>5000) map.setCenter(center, 12);
			if(distanceM>10000) map.setCenter(center, 11);
		}
	
	}
	else
	{
		center = new OpenLayers.LonLat(longitudeM, latitudeM).transform(epsg4326, map.getProjectionObject());
		map.setCenter(center, 12);
	}
}


//RECENTRE LA MAP ET REPOSITIONNNE LE ZOOM SUR L'ITINERAIRE 
function recadrerLocalisation(map){
	if(centerL){
		map.setCenter(centerL, 17);
	}
	else
	{
		centerL = new OpenLayers.LonLat(longitude, latitude).transform(epsg4326, map.getProjectionObject());
		map.setCenter(centerL, 17);
	}
}


	
function erreurItineraire(){
	
	
	$.mobile.changePage( "#map", {
		reverse: true,
		changeHash: true
	});
	
	
}		

	


//CONVERTIS UN NOMBRE DE SECONDES EN HEURE MINUTES SECONDES	
function conversion_seconde_heure(time)
{
	//86400 = 3600*24 c'est à dire le nombre de secondes dans un seul jour ! donc là on vérifie si le nombre de secondes donné contient des jours ou pas
	if (time>=86400)
    {
		// Si c'est le cas on commence nos calculs en incluant les jours
		// on divise le nombre de seconde par 86400 (=3600*24)
		// puis on utilise la fonction floor() pour arrondir au plus petit
		var jour = Math.floor(time/86400);
		// On extrait le nombre de jours
		var reste = time%86400;
 
		var heure = floor(reste/3600);
		// puis le nombre d'heures
		var reste = reste%3600;
 
		var minute = Math.floor(reste/60);
		// puis les minutes
 
		var seconde = reste%60;
		// et le reste en secondes
 
		// on rassemble les résultats en forme de date
		var result = jour+'j '+heure+'h '+minute+'min '+seconde+'s';
 
	}
	else if (time < 86400 && time>=3600)// si le nombre de secondes ne contient pas de jours mais contient des heures
	{
		// on refait la même opération sans calculer les jours
		var heure = floor(time/3600);
		var reste = time%3600;
 
		var minute = Math.floor(reste/60);
 
		var seconde = reste%60;
 
		var result = heure+'h '+minute+'min '+seconde+'s';
	}
	else if (time<3600 && time>=60)// si le nombre de secondes ne contient pas d'heures mais contient des minutes
	{
		var minute = Math.floor(time/60);
		var seconde = time%60;
		var result = minute+'min '+seconde+'s';
	}
	/*else if (time < 60) // si le nombre de secondes ne contient aucune minutes
	{
		var result = time+'s';
	}*/
 
	return result;	
}

OpenLayers.Layer.CloudMade = OpenLayers.Class(OpenLayers.Layer.TMS, {
    initialize: function(name, options) {
		if (!options.key) {
			throw "Please provide key property in options (your API key).";
		}
        options = OpenLayers.Util.extend({
            attribution: "Data &copy; 2009 <a href='http://openstreetmap.org/'>OpenStreetMap</a>. Rendering &copy; 2009 <a href='http://cloudmade.com'>CloudMade</a>.",
            maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
            maxResolution: 156543.0339,
            units: "m",
            projection: "EPSG:900913",
			isBaseLayer: true,
			numZoomLevels: 19,
			displayOutsideMaxExtent: true,
			wrapDateLine: true,
			styleId: 1
        }, options);
		var prefix = [options.key, options.styleId, 256].join('/') + '/';
        var url = [
            "http://a.tile.cloudmade.com/" + prefix,
            "http://b.tile.cloudmade.com/" + prefix,
            "http://c.tile.cloudmade.com/" + prefix
        ];
        var newArguments = [name, url, options];
        OpenLayers.Layer.TMS.prototype.initialize.apply(this, newArguments);
    },

    getURL: function (bounds) {
        var res = this.map.getResolution();
        var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
        var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
        var z = this.map.getZoom();
        var limit = Math.pow(2, z);

        if (y < 0 || y >= limit)
        {
            return "http://cloudmade.com/js-api/images/empty-tile.png";
        }
        else
        {
            x = ((x % limit) + limit) % limit;

            var url = this.url;
            var path = z + "/" + x + "/" + y + ".png";

            if (url instanceof Array)
            {
                url = this.selectUrl(path, url);
            }

            return url + path;
        }
    },

    CLASS_NAME: "OpenLayers.Layer.CloudMade"
});

/*!
* mustache.js - Logic-less {{mustache}} templates with JavaScript
* http://github.com/janl/mustache.js
*/

/*global define: false*/

var Mustache;

(function (exports) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = exports; // CommonJS
  } else if (typeof define === "function") {
    define(exports); // AMD
  } else {
    Mustache = exports; // <script>
  }
}((function () {

  var exports = {};

  exports.name = "mustache.js";
  exports.version = "0.7.0";
  exports.tags = ["{{", "}}"];

  exports.Scanner = Scanner;
  exports.Context = Context;
  exports.Writer = Writer;

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  function testRe(re, string) {
    return RegExp.prototype.test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRe(nonSpaceRe, string);
  }

  var isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };

  function escapeRe(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  exports.escape = escapeHtml;

  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
* Returns `true` if the tail is empty (end of string).
*/
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
* Tries to match the given regular expression at the current position.
* Returns the matched text if it can match, the empty string otherwise.
*/
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      this.tail = this.tail.substring(match[0].length);
      this.pos += match[0].length;
      return match[0];
    }

    return "";
  };

  /**
* Skips all text until the given regular expression can be matched. Returns
* the skipped string, which is the entire tail if no match can be made.
*/
  Scanner.prototype.scanUntil = function (re) {
    var match, pos = this.tail.search(re);

    switch (pos) {
    case -1:
      match = this.tail;
      this.pos += this.tail.length;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, pos);
      this.tail = this.tail.substring(pos);
      this.pos += pos;
    }

    return match;
  };

  function Context(view, parent) {
    this.view = view;
    this.parent = parent;
    this.clearCache();
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.clearCache = function () {
    this._cache = {};
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value = this._cache[name];

    if (!value) {
      if (name === ".") {
        value = this.view;
      } else {
        var context = this;

        while (context) {
          if (name.indexOf(".") > 0) {
            var names = name.split("."), i = 0;

            value = context.view;

            while (value && i < names.length) {
              value = value[names[i++]];
            }
          } else {
            value = context.view[name];
          }

          if (value != null) {
            break;
          }

          context = context.parent;
        }
      }

      this._cache[name] = value;
    }

    if (typeof value === "function") {
      value = value.call(this.view);
    }

    return value;
  };

  function Writer() {
    this.clearCache();
  }

  Writer.prototype.clearCache = function () {
    this._cache = {};
    this._partialCache = {};
  };

  Writer.prototype.compile = function (template, tags) {
    var fn = this._cache[template];

    if (!fn) {
      var tokens = exports.parse(template, tags);
      fn = this._cache[template] = this.compileTokens(tokens, template);
    }

    return fn;
  };

  Writer.prototype.compilePartial = function (name, template, tags) {
    var fn = this.compile(template, tags);
    this._partialCache[name] = fn;
    return fn;
  };

  Writer.prototype.compileTokens = function (tokens, template) {
    var fn = compileTokens(tokens);
    var self = this;

    return function (view, partials) {
      if (partials) {
        if (typeof partials === "function") {
          self._loadPartial = partials;
        } else {
          for (var name in partials) {
            self.compilePartial(name, partials[name]);
          }
        }
      }

      return fn(self, Context.make(view), template);
    };
  };

  Writer.prototype.render = function (template, view, partials) {
    return this.compile(template)(view, partials);
  };

  Writer.prototype._section = function (name, context, text, callback) {
    var value = context.lookup(name);

    switch (typeof value) {
    case "object":
      if (isArray(value)) {
        var buffer = "";

        for (var i = 0, len = value.length; i < len; ++i) {
          buffer += callback(this, context.push(value[i]));
        }

        return buffer;
      }

      return value ? callback(this, context.push(value)) : "";
    case "function":
      var self = this;
      var scopedRender = function (template) {
        return self.render(template, context);
      };

      return value.call(context.view, text, scopedRender) || "";
    default:
      if (value) {
        return callback(this, context);
      }
    }

    return "";
  };

  Writer.prototype._inverted = function (name, context, callback) {
    var value = context.lookup(name);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0)) {
      return callback(this, context);
    }

    return "";
  };

  Writer.prototype._partial = function (name, context) {
    if (!(name in this._partialCache) && this._loadPartial) {
      this.compilePartial(name, this._loadPartial(name));
    }

    var fn = this._partialCache[name];

    return fn ? fn(context) : "";
  };

  Writer.prototype._name = function (name, context) {
    var value = context.lookup(name);

    if (typeof value === "function") {
      value = value.call(context.view);
    }

    return (value == null) ? "" : String(value);
  };

  Writer.prototype._escaped = function (name, context) {
    return exports.escape(this._name(name, context));
  };

  /**
* Calculates the bounds of the section represented by the given `token` in
* the original template by drilling down into nested sections to find the
* last token that is part of that section. Returns an array of [start, end].
*/
  function sectionBounds(token) {
    var start = token[3];
    var end = start;

    var tokens;
    while ((tokens = token[4]) && tokens.length) {
      token = tokens[tokens.length - 1];
      end = token[3];
    }

    return [start, end];
  }

  /**
* Low-level function that compiles the given `tokens` into a function
* that accepts three arguments: a Writer, a Context, and the template.
*/
  function compileTokens(tokens) {
    var subRenders = {};

    function subRender(i, tokens, template) {
      if (!subRenders[i]) {
        var fn = compileTokens(tokens);
        subRenders[i] = function (writer, context) {
          return fn(writer, context, template);
        };
      }

      return subRenders[i];
    }

    return function (writer, context, template) {
      var buffer = "";
      var token, sectionText;

      for (var i = 0, len = tokens.length; i < len; ++i) {
        token = tokens[i];

        switch (token[0]) {
        case "#":
          sectionText = template.slice.apply(template, sectionBounds(token));
          buffer += writer._section(token[1], context, sectionText, subRender(i, token[4], template));
          break;
        case "^":
          buffer += writer._inverted(token[1], context, subRender(i, token[4], template));
          break;
        case ">":
          buffer += writer._partial(token[1], context);
          break;
        case "&":
          buffer += writer._name(token[1], context);
          break;
        case "name":
          buffer += writer._escaped(token[1], context);
          break;
        case "text":
          buffer += token[1];
          break;
        }
      }

      return buffer;
    };
  }

  /**
* Forms the given array of `tokens` into a nested tree structure where
* tokens that represent a section have a fifth item: an array that contains
* all tokens in that section.
*/
  function nestTokens(tokens) {
    var tree = [];
    var collector = tree;
    var sections = [];
    var token, section;

    for (var i = 0; i < tokens.length; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case "#":
      case "^":
        token[4] = [];
        sections.push(token);
        collector.push(token);
        collector = token[4];
        break;
      case "/":
        if (sections.length === 0) {
          throw new Error("Unopened section: " + token[1]);
        }

        section = sections.pop();

        if (section[1] !== token[1]) {
          throw new Error("Unclosed section: " + section[1]);
        }

        if (sections.length > 0) {
          collector = sections[sections.length - 1][4];
        } else {
          collector = tree;
        }
        break;
      default:
        collector.push(token);
      }
    }

    // Make sure there were no open sections when we're done.
    section = sections.pop();

    if (section) {
      throw new Error("Unclosed section: " + section[1]);
    }

    return tree;
  }

  /**
* Combines the values of consecutive text tokens in the given `tokens` array
* to a single token.
*/
  function squashTokens(tokens) {
    var token, lastToken;

    for (var i = 0; i < tokens.length; ++i) {
      token = tokens[i];

      if (lastToken && lastToken[0] === "text" && token[0] === "text") {
        lastToken[1] += token[1];
        lastToken[3] = token[3];
        tokens.splice(i--, 1); // Remove this token from the array.
      } else {
        lastToken = token;
      }
    }
  }

  function escapeTags(tags) {
    if (tags.length !== 2) {
      throw new Error("Invalid tags: " + tags.join(" "));
    }

    return [
      new RegExp(escapeRe(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRe(tags[1]))
    ];
  }

  /**
* Breaks up the given `template` string into a tree of token objects. If
* `tags` is given here it must be an array with two string values: the
* opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
* course, the default is to use mustaches (i.e. Mustache.tags).
*/
  exports.parse = function (template, tags) {
    tags = tags || exports.tags;

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var tokens = [], // Buffer to hold the tokens
        spaces = [], // Indices of whitespace tokens on the current line
        hasTag = false, // Is there a {{tag}} on the current line?
        nonSpace = false; // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          tokens.splice(spaces.pop(), 1);
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr;

    while (!scanner.eos()) {
      start = scanner.pos;
      value = scanner.scanUntil(tagRes[0]);

      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(["text", chr, start, start + 1]);
          start += 1;

          if (chr === "\n") {
            stripSpace(); // Check for whitespace on the current line.
          }
        }
      }

      start = scanner.pos;

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) {
        break;
      }

      hasTag = true;
      type = scanner.scan(tagRe) || "name";

      // Skip any whitespace between tag and value.
      scanner.scan(whiteRe);

      // Extract the tag value.
      if (type === "=") {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === "{") {
        var closeRe = new RegExp("\\s*" + escapeRe("}" + tags[1]));
        value = scanner.scanUntil(closeRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = "&";
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error("Unclosed tag at " + scanner.pos);
      }

      tokens.push([type, value, start, scanner.pos]);

      if (type === "name" || type === "{" || type === "&") {
        nonSpace = true;
      }

      // Set the tags for the next time around.
      if (type === "=") {
        tags = value.split(spaceRe);
        tagRes = escapeTags(tags);
      }
    }

    squashTokens(tokens);

    return nestTokens(tokens);
  };

  // The high-level clearCache, compile, compilePartial, and render functions
  // use this default writer.
  var _writer = new Writer();

  /**
* Clears all cached templates and partials in the default writer.
*/
  exports.clearCache = function () {
    return _writer.clearCache();
  };

  /**
* Compiles the given `template` to a reusable function using the default
* writer.
*/
  exports.compile = function (template, tags) {
    return _writer.compile(template, tags);
  };

  /**
* Compiles the partial with the given `name` and `template` to a reusable
* function using the default writer.
*/
  exports.compilePartial = function (name, template, tags) {
    return _writer.compilePartial(name, template, tags);
  };

  /**
* Compiles the given array of tokens (the output of a parse) to a reusable
* function using the default writer.
*/
  exports.compileTokens = function (tokens, template) {
    return _writer.compileTokens(tokens, template);
  };

  /**
* Renders the `template` with the given `view` and `partials` using the
* default writer.
*/
  exports.render = function (template, view, partials) {
    return _writer.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  exports.to_html = function (template, view, partials, send) {
    var result = exports.render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

  return exports;

}())));

//
// dateFormat v0.1 | 2004-04-03 15:10
//
// a : Ante meridiem et Post meridiem en minuscules - am ou pm 
// A : Ante meridiem et Post meridiem en majuscules - AM ou PM 
// B : Heure Internet Swatch - 000 � 999
//     http://www.quirksmode.org/index.html?/js/beat.html
// d : Jour du mois, sur deux chiffres avec z�ro initial - 01 � 31 
// D : Jour de la semaine, en 3 lettres, anglais par d�faut - Mon � Sun 
// F : Mois textuel, version longue, anglais par d�faut - January � December 
// g : Heure au format 12h, sans le z�ro initial - 1 � 12 
// G : Heure au format 24h, sans le z�ro initial - 0 � 23 
// h : Heure au format 12h, avec le z�ro initial - 01 � 12 
// H : Heure au format 24h, avec le z�ro initial - 00 � 23 
// i : Minutes avec le z�ro initial - 00 � 59 
// j : Jour du mois sans le z�ro initial - 1 � 31 
// l : Jour de la semaine, textuel, anglais par d�faut - Sunday � Saturday 
// L : L'ann�e est elle bissextile ? - 0 ou 1 
// m : Mois avec le z�ro intial - 01 � 12 
// M : Mois, en 3 lettres, anglais par d�faut - Jan � Dec 
// n : Mois sans le z�ro intial - 1 � 12 
// O : Diff�rence avec l'heure de Greenwich (GMT), en heures - -1200 � +1200 
// r : Format de date RFC 822 Thu, 1 Apr 2004 12:00:00 - +0200 
// s : Secondes avec le z�ro initial - 00 � 59 
// S : Suffixe ordinal d'un jour, anglais par d�faut - st, nd, rd, th 
// t : Nombre de jours dans le mois - 28 � 31 
// U : Secondes depuis le 1er Janvier 1970, 0h00 00s GMT - Ex: 1081072800 
// w : Jour de la semaine (0 �tant dimanche, 6 samedi) - 0 � 6 
// W : Num�ro de la semaine dans l'ann�e - 1 � 52
//     http://www.asp-php.net/tutorial/asp-php/glossaire.php?glossid=28
// y : Ann�e sur 2 chiffres - Ex: 04 
// Y : Ann�e sur 4 chiffres - Ex: 2004 
// z : Jour de l'ann�e - 1 � 366 
// Z : D�calage horaire en secondes - -43200 � 43200 
// \ : Caract�re d'echappement - Ex: \a, \A, \m

String.prototype.padLeft = function(strChar, intLength)
{
 var str = this + '';
 while (str.length != intLength) {
  str = strChar + str;
 }
 return str;
}

String.prototype.isInt = function()
{
 var oRegExp = new RegExp(/\d+/);
 return oRegExp.test(this);
}

Array.prototype.exists = function(objValue)
{
 var boolReturn = false, i = 0;
 for (i = 0; i < this.length; i++) {
  if (this[i] == objValue) {
   boolReturn = true;
   break;
  }
 }
 return boolReturn;
}

Date.prototype.dateFormat = function(strFormat, strLang, intTime)
{

 var arrayLang = ['en', 'fr'];
 var arrayFunctions = ['a', 'A', 'B', 'd', 'D', 'F', 'g', 'G', 'h', 'H', 'i', 'j', 'l', 'L', 'm', 'M', 'n', 'O', 'r', 's', 'S', 't', 'U', 'w', 'W', 'y', 'Y', 'z', 'Z'];

 if (intTime) {
  if (!intTime.toString().isInt()) {
   intTime = null;
  } else {
   intTime *= 1000;
  }
 }
 if (strLang) {
  if (strLang.toString().isInt()) {
   intTime = strLang * 1000;
   strLang = 'en';
  } else {
   if (!arrayLang.exists(strLang)) {
    strLang = 'en';
   }
  }
 } else {
  strLang = 'en';
 }

 var arrayDays_en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 var arrayMonths_en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 var arraySuffix_en = ['st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st'];

 var arrayDays_fr = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
 var arrayMonths_fr = ['Janvier', 'F�vrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Ao�t', 'Septembre', 'Octobre', 'Novembre', 'D�cembre'];
 var arraySuffix_fr = ['er', 'nd', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me', '�me'];

 // a : Ante meridiem et Post meridiem en minuscules - am ou pm 
 fct_a = function()
 {
  return (self.getHours() > 11) ? 'pm' : 'am';
 }

 // A : Ante meridiem et Post meridiem en majuscules - AM ou PM 
 fct_A = function()
 {
  return (self.getHours() > 11) ? 'PM' : 'AM';
 }

 // B : Heure Internet Swatch - 000 � 999
 //     http://www.quirksmode.org/index.html?/js/beat.html
 fct_B = function() {
  var intGMTOffset = (self.getTimezoneOffset() + 60) * 60;
  var intSeconds = (self.getHours() * 3600) + (self.getMinutes() * 60) + self.getSeconds() + intGMTOffset;
  var intBeat = Math.floor(intSeconds / 86.4);
  if (intBeat > 1000) {intBeat -= 1000;}
  if (intBeat < 0) {intBeat += 1000;}
  return intBeat.toString().padLeft('0', 3);
 }

 // d : Jour du mois, sur deux chiffres avec z�ro initial - 01 � 31 
 fct_d = function()
 {
  return self.getDate().toString().padLeft('0', 2);
 }

 // D : Jour de la semaine, en 3 lettres, anglais par d�faut - Mon � Sun 
 fct_D = function()
 {
  return eval('arrayDays_' + strLang)[self.getDay()].substring(0, 3);
 }

 // F : Mois textuel, version longue, anglais par d�faut - January � December 
 fct_F = function()
 {
  return eval('arrayMonths_' + strLang)[self.getMonth()];
 }

 // g : Heure au format 12h, sans le z�ro initial - 1 � 12 
 fct_g = function()
 {
  return (self.getHours() > 12) ? self.getHours() - 12 : self.getHours();
 }

 // G : Heure au format 24h, sans le z�ro initial - 0 � 23 
 fct_G = function()
 {
  return self.getHours();
 }

 // h : Heure au format 12h, avec le z�ro initial - 01 � 12 
 fct_h = function()
 {
  return (self.getHours() > 12) ? (self.getHours() - 12).toString().padLeft('0', 2) : self.getHours().toString().padLeft('0', 2);
 }

 // H : Heure au format 24h, avec le z�ro initial - 00 � 23 
 fct_H = function()
 {
  return self.getHours().toString().padLeft('0', 2);
 }

 // i : Minutes avec le z�ro initial - 00 � 59 
 fct_i = function()
 {
  return self.getMinutes().toString().padLeft('0', 2);
 }

 // j : Jour du mois sans le z�ro initial - 1 � 31 
 fct_j = function()
 {
  return self.getDate();
 }

 // l : Jour de la semaine, textuel, anglais par d�faut - Sunday � Saturday 
 fct_l = function()
 {
  return eval('arrayDays_' + strLang)[self.getDay()];
 }

 // L : L'ann�e est elle bissextile ? - 0 ou 1 
 fct_L = function()
 {
  var intFullYear = fct_Y();
  return ((intFullYear % 4 == 0 && intFullYear % 100 != 0) || (intFullYear % 4 == 0 && intFullYear % 100 == 0 && intFullYear % 400 == 0)) ? 1 : 0;
 }

 // m : Mois avec le z�ro intial - 01 � 12 
 fct_m = function()
 {
  return (self.getMonth() + 1).toString().padLeft('0', 2);
 }

 // M : Mois, en 3 lettres, anglais par d�faut - Jan � Dec 
 fct_M = function()
 {
  return eval('arrayMonths_' + strLang)[self.getMonth()].substring(0, 3);
 }

 // n : Mois sans le z�ro intial - 1 � 12 
 fct_n = function()
 {
  return (self.getMonth() + 1);
 }

 // O : Diff�rence avec l'heure de Greenwich (GMT), en heures - -1200 � +1200 
 fct_O = function()
 {
  var intTimezone = self.getTimezoneOffset();
  var intTimezoneAbs = Math.abs(intTimezone);
  var strTimezone = Math.floor(intTimezoneAbs / 60).toString().padLeft('0', 2) + (intTimezoneAbs % 60).toString().padLeft('0', 2);
  return (intTimezone < 0) ? '+' + strTimezone : '-' + strTimezone ;
 }

 // r : Format de date RFC 822 Thu, 1 Apr 2004 12:00:00 - +0200 
 fct_r = function()
 {
  return fct_D() + ', ' + fct_j() + ' ' + fct_M() + ' ' + fct_Y() + ' ' + fct_H() + ':' + fct_i() + ':' + fct_s() + ' ' + fct_O();
 }

 // s : Secondes avec le z�ro initial - 00 � 59 
 fct_s = function()
 {
  return (self.getSeconds()).toString().padLeft('0', 2);
 }

 // S : Suffixe ordinal d'un jour, anglais par d�faut - st, nd, rd, th 
 fct_S = function()
 {
  return eval('arraySuffix_' + strLang)[self.getDate() - 1];
 }

 // t : Nombre de jours dans le mois - 28 � 31 
 fct_t = function()
 {
  var intDays = 0;
  if (self.getMonth() == 1) {
   intDays = 28 + fct_L();
  } else {
   switch (self.getMonth() % 2) {
    case 0 : intDays = 31; break;
    default : intDays = 30;
   }
  }
  return intDays;
 }

 // U : Secondes depuis le 1er Janvier 1970, 0h00 00s GMT - Ex: 1081072800 
 fct_U = function()
 {
  return Math.round(self.getTime() / 1000);
 }

 // w : Jour de la semaine (0 �tant dimanche, 6 samedi) - 0 � 6 
 fct_w = function()
 {
  return self.getDay();
 }

 // W : Num�ro de la semaine dans l'ann�e - 1 � 52
 //     http://www.asp-php.net/tutorial/asp-php/glossaire.php?glossid=28
 fct_W = function()
 {
  return Math.floor((fct_z() - 1 - self.getDay()) / 7) + 2;
 }

 // y : Ann�e sur 2 chiffres - Ex: 04 
 fct_y = function()
 {
  var strFullYear = fct_Y().toString();
  return strFullYear.substring(strFullYear.length - 2, strFullYear.length);
 }

 // Y : Ann�e sur 4 chiffres - Ex: 2004 
 fct_Y = function()
 {
  return self.getFullYear();
 }

 // z : Jour de l'ann�e - 1 � 366 
 fct_z = function()
 {
  var datePremierJanvier = new Date('January 1 ' + fct_Y().toString() + ' 00:00:00');
  var intDifference = self.getTime() - datePremierJanvier.getTime();
  return Math.floor(intDifference / 1000 / 60 / 60 / 24);
 }

 // Z : D�calage horaire en secondes - -43200 � 43200 
 fct_Z = function()
 {
  var intTimezone = self.getTimezoneOffset();
  var intTimezoneAbs = Math.abs(intTimezone);
  var strTimezone = intTimezoneAbs * 60;
  return (intTimezone < 0) ? strTimezone : -strTimezone ;
 }

 var self = this;
 if (intTime) {
  var intMyTime = self.getTime();
  self.setTime(intTime);
 }
 var arrayFormat = strFormat.split(''), i = 0;
 for (i = 0; i < arrayFormat.length; i++) {
  if (arrayFormat[i] == '\\') {
   arrayFormat.splice(i, 1);
  } else {
   if (arrayFunctions.exists(arrayFormat[i])) {
    arrayFormat[i] = eval('fct_' + arrayFormat[i] + '();');
   }
  }
 }
 if (intMyTime) {
  self.setTime(intMyTime);
 }
 return arrayFormat.join('');

}


/************************************************************************
* VARIABLES
************************************************************************/
//connaitre le dernier type d'itin�raire consult�: a pied ou en voiture
var typeMapRoutage;



var couleurIcone;


var db;


var hauteurEcran;
var largeurEcran;


var idPageCourante;


var reloadActu;
var reloadAgenda;
var reloadTv8;
var	reloadPub


var pasDeReseauPasDeWebSQL=false;

var premierDemarrageAppli=false;

var intervalle;

var loadPubTermine=false;
var loadTv8Termine=false;
var loadActuTermine=false;
var loadAgendaTermine=false;


var htmlBandeauEtatReseau=false;

// TV8
var listeTv8HTML;
var tv8JSON;
var currentDataTv8;
var detailHTMLTV8;
var tv8HTML;
var currentidTv8;
var nbVideo;
var entryCourant;

// actualités
var actusJSON;
var currentDataActus;
var detailHTMLActus;
var currentidActus;
var nbActu;
var actusRSCourante;

// agenda
var calJSON;
var currentDataCal;
var detailHTMLCal;
var currentidCal;
var lieuEvenement;
var latitude;
var longitude;
var latitudeUser;
var longitudeUser;
var flagGeoloc;
var latLng;
var marker;
var directions;

// initialize mapL when page ready
var mapL;
var centerL;
var mapP;
var mapV;
var epsg4326;
var distanceM;
var center;		

//parking
var mapParking;
var centerParking;

var latitudeEnCoursParking;
var longitudeEnCoursParking;
var titreEnCoursParking;


// publications
var pubJSON;
var currentDataPub;
var pubHTML;
var publistHTML;
var detailHTMLPub;

//demarches
var spinner;
var opts;
var target

// Scrolls
//var scrollabout;
//var scrollpaneljours;
//var scrollcalendar;
//var scrolldescriptionlocalisation;
var scrolllisteVideo;
var scrolllisteVideo2;
var scrolllisteActus;
var scrolllisteActus2;
var scrolllistePubli;
//var scrolllistePubli2;
//var scrolldem;
//var scrollcontact;
//var scrollproxi;
//var scrollmariage;
//var scrollnaissance;
//var scrollmariageSuivi;
//var scrollnaissanceSuivi;
//var scrollcontactInfo;
//var scrolletatcivilInfo;
//var scrollproxiInfo;
//var scrollAutresDem;

var royalsliderAccueil;

var DEBUG=false;

var typeAPPLI;
typeAPPLI="ANDROID";
//typeAPPLI="IOS";



var userAgent = navigator.userAgent.toLowerCase();

var versionAndroid = navigator.userAgent.match(/Android [\d+\.]{3,5}/)[0].replace('Android ','');
versionAndroid = versionAndroid.substr(0,1);

var isIphone = (userAgent.indexOf('iphone') != -1 || userAgent.indexOf('ipod') != -1) ? true : false;
var isIpad = (userAgent.indexOf('ipad') != -1 ) ? true : false;

//isIpad=true
//isIphone=false

//document.addEventListener("resume", onResume, false);

//document.addEventListener("deviceready", checkConnection, false);







//Evenement d�clench� lorsque l'appli disparait et r�apparait au premier plan
function onResume() {
	// Lorsque l'appli disparait et réapparait au premier plan on relance le reload
	//reloadJson();
}



	
//*************************************************************************************************//
//****************************** CONTROLE CONNEXION RESEAU ****************************************//
//*************************************************************************************************//

document.addEventListener("deviceready", onDeviceReady, false);
	
	
function onDeviceReady() {
	document.addEventListener("offline", onOffline, false);
	document.addEventListener("online", onOnline, false);
}

function onOffline() {
	//navigator.notification.alert("Le réseau est indisponible, Accès restreint à l'application",ActionConnexionPerdue,"Pas de connexion","Fermer");
		
	//AffichePopupConnexion("Le réseau est indisponible, Accès restreint à l'application")
	$('.bandeauPasDeReseau').css( "display","block" );
	htmlBandeauEtatReseau=true;
}
	

function onOnline() {
	
	//AffichePopupConnexion("La connexion est rétablie, accès normal à l'application ")
	$('.bandeauPasDeReseau').css( "display","none" );
	htmlBandeauEtatReseau=false;
		
	pasDeReseauPasDeWebSQL=false;
	
	recupInfoParking(true);
	
}
	

function ActionConnexionPerdue()
{
}
	
function ActionConnexionRetablie()
{
}








//*************************************************************************************************//
//********************* CHARGEMENT DES JSON ET RENDU GRAPHIQUE DES PAGES ***************************//
//*************************************************************************************************//

function loadJson(flag)
{
	//alert("loadPubTermine="+loadPubTermine+"//loadTv8Termine"+loadTv8Termine+"//loadActuTermine"+loadActuTermine+"//loadAgendaTermine"+loadAgendaTermine);
	loadPubTermine=false;
	loadTv8Termine=false;
	loadActuTermine=false;
	loadAgendaTermine=false;
	//CHARGEMENT DU JSON ACTU
	loadActusJSON(flag);
	
	//CHARGEMENT DU JSON ACTU
	loadTv8JSON(flag);
	
	//CHARGEMENT DU JSON AGENDA
	loadCalJSON(flag);
	
	//CHARGEMENT DU JSON PUBLICATIONS
	loadPubJSON(flag);
	
	
	//ATTEND QUE TOUS LES LOAD JSON SOIENT TERMINE
	intervalle = setInterval(rendreVisibleElement,2000);
	
	
	
	
	
	var networkState = navigator.connection.type;
	var states = {};
	states[Connection.UNKNOWN]  = 'UNKNOWN';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'UNKNOWN';
	
	//RELOAD  => AFFICHAGE BANDEAU M.A.J DES DONNEES	
	if(flag && flag=="reload")
	{			
		if(states[networkState]=="UNKNOWN" || states[networkState]=="undefined" || states[networkState]=="")
		{
			//navigator.notification.alert("pas de réseau",ActionConnexionPerdue,"Actualisation","Fermer");
		}
		else
		{
			
  
			//AFFICHAGE DU BANDEAU DANS LE HOME
			$('.bandeauReloadJson').css("display","block");
			 
			var myDate = new Date();
			jourActuel=myDate.dateFormat('d.m.Y','fr');
	
			Min= myDate.getMinutes();
		
			if (Min<10){
				Min = "0"+Min;
			}
		
			$('.bandeauReloadJson').empty().append("Mise à jour le "+jourActuel+" à "+myDate.getHours() + ":" + Min);
		}
	}
	

		
		
}


function rendreVisibleElement()
{
	//alert("1");
	if(pasDeReseauPasDeWebSQL)
	{
		//alert("2");
		
		var contenuMessage='<div style="margin:10px"><br/><img src="images/clfd.png" class="pull-right" width="50" height="50"/>';
		contenuMessage+='<small><strong>ATTENTION: Internet est inaccessible.';
		contenuMessage+='</strong><br /><strong>Veuillez cliquer sur le bouton "Actualiser" ';
		contenuMessage+='lorsque le réseau sera disponible. </strong></small></div>';
		
		
		
		$('#loading').empty().append(contenuMessage);
		$('#boutonReloadJson').css('visibility', '');
		//PERMET DE STOPPER L'EXECUTION EN BOUCLE DE LA FONCTION rendreVisibleElement
		clearInterval(intervalle);
			
	}
	
	else
	{
		//alert("3");
		//alert("loadPubTermine="+loadPubTermine+"//loadTv8Termine"+loadTv8Termine+"//loadActuTermine"+loadActuTermine+"//loadAgendaTermine"+loadAgendaTermine);
		if(loadPubTermine==true && loadTv8Termine==true && loadActuTermine==true && loadAgendaTermine==true )
		{
			//alert("4");
			$('#boutonReloadJson').css('visibility', '');
			$('#btn-about-accueil').css('visibility', '');
		
			$('[data-role=content]').css('display', '');
			$('#loading').css('display', 'none');
		

			//CHARGEMENT DU ROYALSLIDER
			setTimeout(chargementRoyalslider,2000);
			//alert("chargementRoyalslider")
			
					
			premierDemarrageAppli=false;
		
			//PERMET DE STOPPER L'EXECUTION EN BOUCLE DE LA FONCTION rendreVisibleElement
			clearInterval(intervalle);
			
			
		
		}
	}
	
}


function chargementRoyalslider()
{
	//console.log("VALEUR ROYALSLIDER:"+royalsliderAccueil)
	if(royalsliderAccueil)
	{
		var slider = $(".rsaccueil").data('royalSlider');
		slider.destroy();
		//alert(actusRSCourante);
		$('.rsaccueil').empty().append(actusRSCourante).trigger('refresh');
		//alert("rechargement du royalslider");
	}
	else{
		$('.rsaccueil').empty().append(actusRSCourante);
		//alert("rechargement du royalslider 2");
	}

	//if(!royalsliderAccueil)
	//{
		royalsliderAccueil=$('.rsaccueil').royalSlider({
			arrowsNav: false,
		    loop: true,
		    keyboardNavEnabled: false,
		    controlsInside: true,
		    imageScaleMode: 'fill',
		    arrowsNavAutoHide: false,
		    //autoScaleSlider: true, 
		    //autoScaleSliderWidth: 960,     
		    //autoScaleSliderHeight: 350,
		    controlNavigation: 'none',
		    //thumbsFitInViewport: false,
		    //navigateByClick: true,
		    startSlideId: 0,
		    autoPlay: false,
		    transitionType:'move',
		    //globalCaption: true,
			autoPlay: {
				// autoplay options go gere
				enabled: true,
				pauseOnHover: false,
				stopAtAction: false,
				delay:5000
			}
		});
		
	
	//}
		
		
}



//FONCTION SCROLL
function loadScrollTablette()
{
	//CHARGEMENT SCROLL ACTUS
	scrolllisteActus = new iScroll('listeActus', { hScroll: false, hScrollbar: false, checkDOMChanges: true, useTransition:true });
	scrolllisteActus2 = new iScroll('listeActus2', { hScroll: false, hScrollbar: false, checkDOMChanges: true, useTransition:true });
	//CHARGEMENT SCROLL TV8
	scrolllisteVideo = new iScroll('listeVideo', { hScroll: false, hScrollbar: false, checkDOMChanges: true, useTransition:true });
	scrolllisteVideo2 = new iScroll('listeVideo2', { hScroll: false, hScrollbar: false, checkDOMChanges: true, useTransition:true });
	//CHARGEMENT SCROLL PUBLICATIONS
	//scrolllistePubli = new iScroll('listePubli', { hScroll: false, hScrollbar: false, checkDOMChanges: true, useTransition:true });
}

function destroyScrollTablette()
{
	//CHARGEMENT SCROLL ACTUS
	scrolllisteActus.destroy(true); 
	scrolllisteActus2.destroy(true);  
	//CHARGEMENT SCROLL TV8
	scrolllisteVideo.destroy(true);  
	scrolllisteVideo2.destroy(true);  
	//CHARGEMENT SCROLL PUBLICATIONS
	//scrolllistePubli.destroy(true);  
}


function loadScrollSmartphone()
{
	//scrolllisteActus2 = new iScroll('detailActuSmartphone', { hScroll: false, hScrollbar: false, checkDOMChanges: true, useTransition:true });
	//scrolllisteVideo2 = new iScroll('detailVideoSmartphone', { hScroll: false, hScrollbar: false, checkDOMChanges: true, useTransition:true });
	//scrolllisteActus = new iScroll('listeActusIphone', { hScroll: false, hScrollbar: false, checkDOMChanges: true, useTransition:true });
	//scrolllisteVideo = new iScroll('listeVideoIphone', { hScroll: false, hScrollbar: false, checkDOMChanges: true, useTransition:true });
	//scrolllistePubli = new iScroll('listePubliIphone', { hScroll: false, hScrollbar: false, checkDOMChanges: true, useTransition:true });


}

function destroyScrollSmartphone()
{
	//scrolllisteActus2.destroy(true);
	//scrolllisteVideo2.destroy(true);
	//scrolllisteActus.destroy(true);
	//scrolllisteVideo.destroy(true);
	//scrolllistePubli.destroy(true);
}







function fixerTitrePageAccueil()
{
	//ON RECUPERE LES DIMENSIONS DE L'ERAN
	var h = $( window ).height();
	var w = $( window ).width();
	
	hauteurEcran=h;
	largeurEcran=w;
	
	//TABLETTE
	if(largeurEcran>640 && hauteurEcran>640)
	{
		$('#titreHome').empty().append("CLERMONT-FERRAND");
	}
	//SMARTPHONE
	else
	{
		$('#titreHome').empty().append("CLERMONT-FD");
	}
}



/*****************************************************************************************/
/****************************** DEBUT DEVICEREADY ****************************************/
/*****************************************************************************************/

$(document).live('deviceready',initDevice);


function initDevice()
{
	
	//INITIALISATION DES LATITUDE LONGITUDE DU USER
	navigator.geolocation.getCurrentPosition(onSuccessGetLocation, onErrorGetLocation);
	
	
	//PAGE AGENDA, ON CHANGE OU PAS LA COULEUR DES ICONES BOOTSTRAP SELON LA LARGEUR DE L'ECRAN	
	setTimeout(modifCouleurIcone,5000);
	
	/***** ON LANCE L'AFFICHAGE DES DISPO PARKING *****/
	recupInfoParking(false);
	setInterval("recupInfoParking(true);",60000*5);
	
	
	/***** LANCE UN RELOAD AUTOMATIQUE TOUTES LES 5 HEURES *****/
	//setInterval(loadJson, 1000*60*60*5);
	setInterval('loadJson("reload");', 1000*60*60);
	/***** OUVERTURE DE LA BDD APPCLFD *****/
	if(window.openDatabase){
	db = window.openDatabase('APPCLFD','1.0','Application',20000000);
	}
	
	setTimeout(checkConnection,"1000");
	
	/***** LOAD DES JSONS *****/
	loadJson("load");
	
	/***** ADAPTE LA TAILLE DU TITRE EN PAGE D'ACCUEIL SELON LA TAILLE DE L'ECRAN ****/
	fixerTitrePageAccueil();
	
	
	/***** CHARGEMENT SCROLL TABLETTE *********/
	if(largeurEcran>640 && hauteurEcran>640)
	{
		setTimeout(loadScrollTablette,1000);
	}
	/***** OU CHARGEMENT SCROLL SMARTPHONE *********/
	else
	{
		setTimeout(loadScrollSmartphone,1000);
	}
	
	/***** ON DETERMINE L'ACTION DE CERTAINS BOUTONS ***/
	if(largeurEcran>640 && hauteurEcran>640)
	{
		//ECOUTE DE L'EVENEMENT CLICK SUR LE BOUTON PUBLICATION DU FOOTER
		$('#publications-btn').live("click",function(event){
			//event.preventDefault();
			if(!pubHTML)
			{
				//AFFICHE 1ER PUBLI DE MANIERE AUTOMATIQUE AU DEMARRAGE DE L'APPLI
				renderPubLast(pubJSON);
			}
			
		})
		//ECOUTE DE L'EVENEMENT CLICK SUR LE BOUTON ICONE PUBLICATION DE L'ACCUEIL
		$('#btn-icone-pub').live("click",function(event){
			//event.preventDefault();
			if(!pubHTML)
			{
				//AFFICHE 1ER PUBLI DE MANIERE AUTOMATIQUE AU DEMARRAGE DE L'APPLI
				renderPubLast(pubJSON);
			}
			
		})
	}
	
	
		
	
	/************GESTION DE L'ORIENTATION ***************/
	$(window).bind('orientationchange', function(e){
		
		console.log("changement d'orientation");
		
		
		//ADAPTATION TITRE PAGE D'ACCUEIL
		setTimeout(fixerTitrePageAccueil,500);
		 
		//TABLETTE: RECHARGEMENT SCROLL SPLITVIEW VIDEOS ET ACTUS
		if(largeurEcran>640 && hauteurEcran>640){
			if(idPageCourante=="actualites" || idPageCourante == "tv8"){
				
				destroyScrollTablette();
				loadScrollTablette();
			}
			
		}		 
		
		//CSS MAP ITINERAIRE ET RECENTRAGE MAP		
		if(idPageCourante=="mapCarte"){	
			setTimeout(cssMap,500);
			setTimeout(recentrerMapL,1000);					
		}	
		
		
		//CSS MAP ITINERAIRE ET RECENTRAGE MAP		
		if(idPageCourante=="routage"){
			setTimeout(cssMap,500);
			if(typeMapRoutage=="V"){
				setTimeout(recentrerMapV,1000);
			}
			else if(typeMapRoutage=="P"){
				setTimeout(recentrerMapP,1000);	
			}
						
		}
		
		if(idPageCourante=="parking-detail"){	
			setTimeout(cssMap,500);
			setTimeout(recentrerMapParking,1000);					
		}	
		
		
		 
		//CSS FRAME PUBLICATION		
		if(idPageCourante=="pubIphoneD"){
			
			pubOrientationChange();
		}
		
		
		//CSS FRAME VIDEO
		if(idPageCourante=="tv8" || idPageCourante=="tv8IphoneD"){
			
			if(versionAndroid == "2"){
				
				$('#video-detail').empty().append(tv8HTML);	
				setTimeout("$('#video-detail iframe').addClass('iframeVideo');",1000);
			}
			
			
		}		
		
		
		
		//PAGE AGENDA, A CHAQUE CHANGEMENT D'ORIENTATION ON CHANGE OU PAS LA COULEUR DES ICONES BOOTSTRAP SELON LA LARGEUR DE L'ECRAN
		if(idPageCourante=="agenda"){	
			
			setTimeout(modifCouleurIcone,2000);
			
		}
		
		
		
			
	})
	
	
	//APPLI ANDROID
	if(typeAPPLI == "ANDROID"){
		
		//INIT PLUGIN PUSHWOOSH ANDROID
		appPushwooshAndroid.initialize();
		
		//START GOOGLE ANALYTICS ANDROID
		startAnalyticsAndroid();
		
		
		
		// Initialize the Facebook SDK
		FB.init({
			appId : '468757046478097',
			nativeInterface : CDV.FB,
			useCachedDialogs : false
		});

		//FB.getLoginStatus(handleStatusChange);

		//authUser();
		//updateAuthElements(); 
	
		
	}
	
	
	//APPLI IOS
	if(typeAPPLI == "IOS"){
		
		//INIT PLUGIN PUSHWOOSH ANDROID
		appPushWoosh.initialize();
		//INIT PLUGIN TWITTER ANDROID
		appTwitter.initialize();
		//INIT PLUGIN FACEBOOK ANDROID
		appFacebook.initialize();
		//INIT PLUGIN ANALYTICS ANDROID 
		appStat.initialize();
	}
			
	
}


function modifCouleurIcone(){
	
	//ON RECUPERE LES DIMENSIONS DE L'ERAN
	var h = $( window ).height();
	var w = $( window ).width();
	
	hauteurEcran=h;
	largeurEcran=w;
	
	if(largeurEcran>640)
	{
		$("#listeC i").addClass("icon-white");
	}
	else
	{
		$("#listeC i").removeClass("icon-white");
	}
}



function successAlert(){}
function errorAlert(){}
function showAlert(msg){
cordova.exec(successAlert, errorAlert, "Notification","alert", [msg]);
}



function cssMap()
{
	
	var h = $(window).height();
	var w = $(window).width();	
	$('.mapLocalisation').css("width",w);
	$('.mapLocalisation').css("height",h );
	$('.mapDiv').css("width",w);
	$('.mapDiv').css("height",h );
	$('.mapLocalisationParking').css("width",w);
	$('.mapLocalisationParking').css("height",h );
	
}


function pubOrientationChange(){
	
	//$('#publi-detail').hide();
	//var h = $( window ).height();
	//var w = $( window ).width();
	//$('#publi-detail').css( "height", h);
	//$('#publi-detail').css( "width", w);
	
	//$('#publi-detail').empty().append(pubHTML);
	//alert("orientation publication");
	
	
	//$('#publi-detail').addClass("cssIframePub");
	
	//setTimeout("$('#publi-detail').empty().append(pubHTML)",1000);
	$('#publi-detail').empty().append(pubHTML);
	

}



/*****************************************************************************************/
/****************************** FIN DEVICEREADY ******************************************/
/*****************************************************************************************/




//****************************************************************************************//
//*********************** STATISTIQUES GOOGLE ANALYTICS IOS*******************************//
//****************************************************************************************//

//TRACE LA PAGE CIBLE
function trackPageGA(page)
{
	if(typeAPPLI == "IOS"){
		googleAnalytics.trackPageview(page);
	}
}


//EVENEMENT TRACE SUR GA
function trackEventGA(categorie,evenenement,valeur)
{
	if(typeAPPLI == "IOS"){
		googleAnalytics.trackEvent(categorie, evenenement, valeur);
	}
}
	



//****************************************************************************************//
//*********************** STATISTIQUES GOOGLE ANALYTICS IOS*******************************//
//****************************************************************************************//

function startAnalyticsAndroid(){
	
		window.plugins.analytics.start(
		        function(){
		        	
		            console.log("Start: success");
		        },
		        function(){
		        	
		            console.log("Start: failure");
		        }
		);
	
	
	
}



//TRACE LA PAGE CIBLE
function trackPageAndroid(page)
{
	if(typeAPPLI == "ANDROID"){
		window.plugins.analytics.trackPageView(
		        page,
		         function(){
		        	console.log("Track page:"+page+ ": success");
		         },
		         function(){
		            console.log("Track page:"+page+ ": failure");
		         }
		);
	}
}


//EVENEMENT TRACE SUR GA
function trackEventAndroid(categorie,evenenement,valeur)
{
	if(typeAPPLI == "ANDROID"){	
		window.plugins.analytics.trackEvent(
				categorie,
				evenenement,
				valeur,
		         1,
		        function(){
		            console.log("Track event:"+categorie+"/"+evenenement+"/"+valeur+" success");
		        }, 
		        function(){
		        	console.log("Track event:"+categorie+"/"+evenenement+"/"+valeur+" failure");
		        }
		);
	}
}




/************************************************************************
 * INIT
 ************************************************************************/
$(document).on('mobileinit', function(event) {
	
	$.support.cors = true;
	$.mobile.allowCrossDomainPages = true;
	$.mobile.loader.prototype.options.text = "Chargement";
	$.mobile.loader.prototype.options.textVisible = true;
	$.mobile.loader.prototype.options.theme = "c";
	$.mobile.pageLoadErrorMessage = "Erreur";
	$.mobile.buttonMarkup.hoverDelay = "300";
    //$.mobile.ajaxEnabled=true;
	$.mobile.page.prototype.options.backBtnText = "Retour";
	//$.mobile.orientationChangeEnabled = true;
	$.mobile.defaultPageTransition = 'none';
		
	//$.event.special.swipeleft.horizontalDistanceThreshold = 75;
	//$.event.special.swipe.durationThreshold = 2000;
	
	//-------------------------------------------------------------------------------//
	//--- CODE PERMETTANT DE TRACKER LES PAGES DE L'APPLI AVEC GOOGLE ANALYTICS -----//
	//--- A CHAQUE AFFICHAGE D'UNE PAGE ---------------------------------------------//
	//-------------------------------------------------------------------------------//
		
	
	$('[data-role=page]').live('pagebeforeshow', function (event, ui) {
			
		var $page= $(event.target);
		var idpage= $page.attr('id');
		
		idPageCourante=idpage;
		
		//console.log(idPageCourante);
		
		try {
		//ID GA ---> UA-36100910-1
			hash = location.hash;
			
			if (hash) {
				if(idpage=="home")
				{
					//POUR IOS
					trackPageGA("/APPCLFD/#home");
					//POUR ANDROID
					trackPageAndroid("/APPCLFD/#home");
				}
				else
				{
					//POUR IOS
					trackPageGA("/APPCLFD/"+hash);
					//POUR ANDROID
					trackPageAndroid("/APPCLFD/"+hash);
					
				}
			}
			else
			{
				//POUR IOS
				trackPageGA("/APPCLFD/#home");
				//POUR ANDROID
				trackPageAndroid("/APPCLFD/#home");
			}
		
		}
		catch(err) {
		}
	});

	
	//FERMETURE DES POPUP PARTAGE AU CLIC SUR CELLE-CI
	$('#popupPartageA').live("click",function () {
		$('#popupPartageA').popup('close');
	})
	
	$('#popupPartageV').live("click",function () {
		$('#popupPartageV').popup('close');
	})
	
	
	$('#popupPartageM').live("click",function () {
		$('#popupPartageM').popup('close');
	})
	
	
	$('#popupPartageP').live("click",function () {
		$('#popupPartageP').popup('close');
	})
	
	
	
	//CHARGEMENT DU FOOTER DANS TOUTES LES PAGES
	$("[data-role=page]").live('pagebeforecreate', function(event) {
		
		
		
		//on vérifie si le footer a déja été ajouté à la page en cours
		//console.log($.mobile.activePage);	//undefined ici car on est dans pagebeforecreate et non live
		var $page= $(event.target);
		var $footer= $page.find('.fdfooter');
		var numchildren= $footer.children().length;
		if(numchildren == 0) {
		
			var footerHTML = '';
				footerHTML += '<div class="navbar navbar-inverse navbar-fixed-bottom">';
				footerHTML += '<div class="navbar-inner">';
				footerHTML += '<p class="bandeauPasDeReseau">Attention: Réseau indisponible</p>';
				footerHTML += '<ul class="nav">';
				footerHTML += '<li><a data-prefetch="true" href="#home" class="ui-icon-accueil" id="home-btn"><span>Accueil</span></a></li>';				
				
				//IPAD
				if(largeurEcran>640 && hauteurEcran>640) {footerHTML += '<li><a data-prefetch="true" href="#actualites" class="ui-icon-actualites" id="actualites-btn"><span>Actualités</span></a></li>';}
				
				//IPHONE OU AUTRES
				else {footerHTML += '<li><a data-prefetch="true" href="#actusIphoneL" class="ui-icon-actualites" id="actualites-btn"><span>Actus</span></a></li>';}
				
				//IPAD
				if(largeurEcran>640 && hauteurEcran>640) {footerHTML += '<li><a data-prefetch="true" href="#tv8" class="ui-icon-tv8" id="tv8-btn"><span>Vidéos</span></a></li>';}
				//IPHONE OU AUTRES
				else {footerHTML += '<li><a data-prefetch="true" href="#tv8IphoneL" class="ui-icon-tv8" id="tv8-btn"><span>Vidéos</span></a></li>';}
				
				footerHTML += '<li><a data-prefetch="true" href="#agenda" class="ui-icon-agenda" id="agenda-btn"><span>Agenda</span></a></li>';
				
				//IPAD
				if(largeurEcran>640 && hauteurEcran>640){footerHTML += '<li><a href="#pubIphoneL" class="ui-icon-publications" id="publications-btn"><span>Publications</span></a></li>';}
				//IPHONE OU AUTRES
				else{footerHTML += '<li><a data-prefetch="true" href="#pubIphoneL" class="ui-icon-publications" id="publications-btn"><span>Pub.</span></a></li>';}
				
				//IPAD
				if(largeurEcran>640 && hauteurEcran>640){footerHTML += '<li><a data-prefetch="true" href="#demarches" class="ui-icon-demarches" id="demarches-btn"><span>Démarches</span></a></li>';}
				//IPHONE OU AUTRES
				else{footerHTML += '<li><a data-prefetch="true" href="#demarches" class="ui-icon-demarches" id="demarches-btn"><span>Dém.</span></a></li>';}
				
				footerHTML += '</ul>';
				footerHTML += '</div>';
				footerHTML += '</div>';
				
			//transformation variable javascript en objet jquery
			var $footer = $(footerHTML);
			//recup de l'id de la page
			var idpage= $page.attr('id');
			
			var idgroupe= $page.attr('data-id');
			
			//console.log("htmlBandeauEtatReseau="+htmlBandeauEtatReseau);
			
			
			
			//$(footerHTML)  => tranformation variable en objet jquery
			//on cherche le bouton possédant le même id que la page en cours
			//selecteur jquery  *=  correspond à contient
			$footer.find('#' + idgroupe + '-btn').addClass('f' + idgroupe + ' active');
			//objet page pour l'ajout
			$page.find('.fdfooter').attr({"data-id" : "appfooter"}).append($footer);
		    //on supprime la classe slideup et ui-fixed-hidden du footer pour qu'elle reste fixe
			$page.find('.fdfooter').removeClass('slideup ui-fixed-hidden');
			
			if(htmlBandeauEtatReseau)
			{
				$('.bandeauPasDeReseau').css( "display","block" );
			}
			else
			{
				$('.bandeauPasDeReseau').css( "display","none" );
			}
			
		}
	}) //fin du pagebeforecreate pour le footer
	
	
		

	//ACCUEIL ----------------------------------------------------		
		$('#home').live('pageinit', function(event) {
			
			
			/************ BOUTON ACTUALISER PAGE D'ACCUEIL *******/
			$('#boutonReloadJson').live("click",function(event){
					  
				event.preventDefault();
				//RECHARGEMENT DES JSONS 
				//reloadJson()
				loadJson("reload");
					
			})
			
			
			
			//ICONE TV8 PAGE D'ACCUEIL
			$('#btn-icone-tv8').live("click",function(event){
				
				event.preventDefault();
				
				//TABLETTE
				if(largeurEcran>640 && hauteurEcran>640){
					$.mobile.changePage( "#tv8", {
						reverse: true,
						changeHash: true
					});
				}
				//SMARTPHONES
				else {
					$.mobile.changePage( "#tv8IphoneL", {
						reverse: true,
						changeHash: true
					});
				}
				
			})
			
			
			//ICONE PUBLICATIONS PAGE D'ACCUEIL
			$('#btn-icone-pub').live("click",function(event){
				
				event.preventDefault();
				
				$.mobile.changePage( "#pubIphoneL", {
					reverse: true,
					changeHash: true
				});
				
			})

				
			//ECOUTE DE L'EVENEMENT CLICK DANS LE ROYALSLIDER DES ACTUS
			$('.item').live("click",function(event){
				
				event.preventDefault();
				
				//TABLETTE
				if(largeurEcran>640 && hauteurEcran>640){
					$.mobile.changePage( "#actualites", {
						reverse: true,
						changeHash: true
					});
					
				}
				//SMARTPHONES
				else {
					
					$.mobile.changePage( "#actusIphoneD", {
						reverse: true,
						changeHash: true
					});
					
					$("#retourActusIphoneL").attr("data-rel", "none");
					
				}
				clickActusBtn(event);
			})
			
			//console.log("pageinit home");
	
		})
		
		
	
			
	//ABOUT ------------------------------------------------------
			
				 
	//TV8 --------------------------------------------------------			 
		$('#tv8').live('pageinit', function(event) {
					
			//FONCTIONS POUR AGRANDIR OU DIMINUER LE TEXTE DANS LA PAGE DETAIL ACTUS
			$('#diminuerTv8Ipad').live("click",function () {
				
				diminuer("#video-detail");
			})
						  
			$('#agrandirTv8Ipad').live("click",function () {
				
				agrandir("#video-detail");
				
			})
		
			
			//EVENEMENT SWIPELEFT SUR L'ACTU
			$('#video-detail .text').live("swipeleft", function (event) {
				event.preventDefault();
				SwipeLeftVideos(event);
				//$("#video-detail .text").fadeOut(1000);				
				//$("#video-detail .text").fadeIn(1000);
			})
			//EVENEMENT SWIPERIGHT SUR L'ACTU
			$('#video-detail .text').live("swiperight", function (event) {
				event.preventDefault();
				SwipeRightVideos(event);
				//$("#video-detail .text").fadeOut(1000);				
				//$("#video-detail .text").fadeIn(1000);
			})
			//ECOUTE DE L'EVENEMENT CLICK DANS LA LISTE GAUCHE DES VIDEOS			
			$('#listeV li').live("click",function(event){
				event.preventDefault();
				clickTv8Btn(event);
			})
			console.log("pageinit home");
			
			
			//ECOUTE DE L'EVENEMENT CLICK DANS LE ROYALSLIDER DES ACTUS
			/*$('#retourTv8IphoneL').live("click",function(event){
				
				$.mobile.changePage( "#tv8IphoneL", {
					reverse: true,
					changeHash: true
				});
				
				$("#retourTv8IphoneL").attr("data-rel", "none");
				
				//setTimeout("$('#listeV').empty().append(listeTv8HTML);",500);
				
				
				
			})*/
			
			
		})
		
		
		
		
				
		$('#tv8').live('pagebeforeshow', function(event) {
			
			if(versionAndroid == "2"){
				
				$('#video-detail').empty().append(tv8HTML);		
				setTimeout("$('#video-detail iframe').addClass('iframeVideo');",500);
				
			}			
					
		})
		 

		 
		$('#tv8').live('pagehide', function(event) {
			//Lorsqu'on quitte la page on stop la video en cours de lecture
			//$('#video-detail').empty().append(tv8HTML);
			$('#video-detail').empty().append(tv8HTML);	
			setTimeout("$('#video-detail iframe').addClass('iframeVideo');",1000);
		})		
		 
	//TV8 - IPHONE - LISTE VIDEOS --------------------------------------------------------			 
				
		$('#tv8IphoneL').live('pageinit', function(event) {
			//ECOUTE DE L'EVENEMENT CLICK DANS LA LISTE GAUCHE DES VIDEOS			
			$('#listeV li').live("click",function(event){
				event.preventDefault();
				clickTv8Btn(event);
			})
			
			/*if(currentidTv8){
				destroyScrollSmartphone();
				loadScrollSmartphone();
				setTimeout(scrollSurElementCourantVideo,500);
				
			}*/
			
			
			
			
		 })
		 
		 
		/*function scrollSurElementCourantVideo(){
			//alert("scrolllisteVideo="+scrolllisteVideo);
			//alert("currentidTv8="+currentidTv8);
			scrolllisteVideo.scrollToElement('#'+currentidTv8, '400ms');
		}*/
	
	//TV8 - IPHONE DETAIL VIDEOS --------------------------------------------------------			 
				
		$('#tv8IphoneD').live('pageinit', function(event) {
			
			
			
			
			//FONCTIONS POUR AGRANDIR OU DIMINUER LE TEXTE DANS LA PAGE DETAIL 
			$('#diminuerTv8Iphone').live("click",function () {
				
				diminuer("#video-detail");
			})
						  
			$('#agrandirTv8Iphone').live("click",function () {
				
				agrandir("#video-detail");
				
			})
			
			
			//EVENEMENT SWIPELEFT SUR LES VIDEOS
			$('#video-detail .text').live("swipeleft", function (event) {
				event.preventDefault();
				SwipeLeftVideos(event);
				//$("#video-detail .text").fadeOut(1000);				
				//$("#video-detail .text").fadeIn(1000);
			})
			//EVENEMENT SWIPERIGHT SUR LES VIDEOS
			$('#video-detail .text').live("swiperight", function (event) {
				event.preventDefault();				
				SwipeRightVideos(event);
				//$("#video-detail .text").fadeOut(1000);				
				//$("#video-detail .text").fadeIn(1000);
			})
		
		 })
		 
		$('#tv8IphoneD').live('pagebeforeshow', function(event) {
			//Lorsqu'on quitte la page on stop la video en cours de lecture
			//$('#video-detail').empty().append(tv8HTML);
			$('#video-detail').empty().append(tv8HTML);
			setTimeout("$('#video-detail iframe').addClass('iframeVideo');",500);
			
		})	
		
		
		
		$('#tv8IphoneD').live('pagehide', function(event) {
			//Lorsqu'on quitte la page on stop la video en cours de lecture
			//$('#video-detail').empty().append(tv8HTML);
			$('#video-detail').empty().append(tv8HTML);	
			setTimeout("$('#video-detail iframe').addClass('iframeVideo');",1000);
		})	
	
	//ACTUALITES------------------------------------------------
		$('#actualites').live('pagebeforeshow', function(event) {
			
			//les liens sont supprim�s
			$(".text a").remove();
			
			
			//FONCTIONS POUR AGRANDIR OU DIMINUER LE TEXTE DANS LA PAGE DETAIL ACTUS
			$('#diminuerActusIpad').live("click",function () {
				
				diminuer("#actus-detail");
			})
						  
			$('#agrandirActusIpad').live("click",function () {
				
				agrandir("#actus-detail");
				
			})
						  
			//EVENEMENT SWIPELEFT SUR L'ACTU
			$('#actus-detail .text').live("swipeleft", function (event) {
				event.preventDefault();
				SwipeLeftActus(event);
				//$("#actus-detail .text").fadeOut(1000);				
				//$("#actus-detail .text").fadeIn(1000);
			})
						  
			//EVENEMENT SWIPERIGHT SUR L'ACTU
			$('#actus-detail .text').live("swiperight", function (event) {
				event.preventDefault();
				SwipeRightActus(event);
				//$("#actus-detail .text").fadeOut(1000);				
				//$("#actus-detail .text").fadeIn(1000);
			})
		
			//ECOUTE DE L'EVENEMENT CLICK DANS LA LISTE GAUCHE DES ACTUS				  
			$('#listeA li').live("click",function(event){
				event.preventDefault();
				clickActusBtn(event);
			})
		})
		
		
		
	
		
	//ACTUALITES M------------------------------------------------
		$('#actusIphoneL').live('pageinit', function(event) {
			
			
			//ECOUTE DE L'EVENEMENT CLICK DANS LA LISTE GAUCHE DES ACTUS				  
			$('#listeA li').live("click",function(event){
				
				event.preventDefault();
				clickActusBtn(event);
				
				
				$("#retourActusIphoneL").attr("data-rel", "back");
			})
			
			/*if(currentidActus){
				destroyScrollSmartphone();
				loadScrollSmartphone();
				setTimeout(scrollSurElementCourantActu,500);
				
			}*/
			
			
		})
		
		/*function scrollSurElementCourantActu(){
			//alert("scrolllisteActu="+scrolllisteActu);
			//alert("currentidActu="+currentidActus);
			scrolllisteActus.scrollToElement('#'+currentidActus, '400ms');
		}*/
		
		
		
		
		
		
		
		
		
			//ACTUALITES D------------------------------------------------
		$('#actusIphoneD').live('pagebeforeshow', function(event) {
			
			console.log($(".text a"));
			
			//les liens sont supprim�s
			$(".text a").remove();
			
			
			
				//FONCTIONS POUR AGRANDIR OU DIMINUER LE TEXTE DANS LA PAGE DETAIL ACTUS
			$('#retourActusIphoneL').live("click",function () {
				event.preventDefault();
				/*$.mobile.changePage( "#home", {
						reverse: true,
						changeHash: true
					});*/
				
			})
			
			//FONCTIONS POUR AGRANDIR OU DIMINUER LE TEXTE DANS LA PAGE DETAIL
			$('#diminuerActusIphone').live("click",function () {
				diminuer("#actus-detail");
			})
						  
			$('#agrandirActusIphone').live("click",function () {
				agrandir("#actus-detail");
			})
						  
			//EVENEMENT SWIPELEFT SUR L'ACTU
			$('#actus-detail .text').live("swipeleft", function (event) {
				event.preventDefault();
				SwipeLeftActus(event);
				//$("#actus-detail .text").fadeOut(1000);				
				//$("#actus-detail .text").fadeIn(1000);
				
			})
						  
			//EVENEMENT SWIPERIGHT SUR L'ACTU
			$('#actus-detail .text').live("swiperight", function (event) {
				event.preventDefault();
				SwipeRightActus(event);
				//$("#actus-detail .text").fadeOut(1000);				
				//$("#actus-detail .text").fadeIn(1000);
			})
		
		})
 
 
	
 
 
	
	//PUBLICATIONS----------------------------------------------
		$('#publications').live('pageinit', function(event) {
			
			//-- GESTION DE L'ORIENTATION --////////////////////////////////
			$('#publications').on('orientationchange', function(e){

				//alert("dwxfsdfsdf");
				// agenda
				//$('#popupMap').popup('close');
		
		
			})
										
			
		})
	
	
	
	
		$('#publications').live('pagebeforeshow', function(event) {
						
			
		})
		
		
		
		
		//PUBLICATIONS IPHONE LISTE----------------------------------------------
		$('#pubIphoneL').live('pagebeforeshow', function(event) {
			
			//ECOUTE DE L'EVENEMENT CLICK DANS LA LISTE GAUCHE DES VIDEOS
			$('#listeP li').live("click",function(event){
				event.preventDefault();
				clickPubBtn(event);
			})
			
		})
		
		
		//PUBLICATIONS IPHONE DETAIL----------------------------------------------
		$('#pubIphoneD').live('pagebeforeshow', function(event) {
			
			//$('#publi-detail').removeClass('publi-detail-iphone');
			//$('#publi-detail').addClass('publi-detail-iphone');
			
			//var h = $( window ).height();
			//var w = $( window ).width();
			//$('#publi-detail').css( "height", h-50 );
			//$('#publi-detail').css( "width", w);
			//$('#publi-detail').css( "padding", "60");
			
			
			
		})
		
		
		
		
	//DEMARCHES --------------------------------------------------------	

		$('#demarches-proximcite').live('pagebeforeshow', function(event)
		{
			// vider les champs par defaut
			loadSettingsProximcite();
		
		})
		
		$('#demarches-contact').live('pagebeforeshow', function(event)
		{
			// vider les champs par defaut
			loadSettingsContact();
			
		})
		
		$('#demarches-Demandenaissance').live('pagebeforeshow', function(event)
		{
			// vider les champs par defaut
			loadSettingsDemandenaissance();
			
			
		})		
		
		
		$('#demarches-SuiviDemandenaissance').live('pagebeforeshow', function(event) {
			// vider les champs par defaut
			loadSettingsSuiviDemandenaissance();
			//ECOUTE DE L'EVENEMENT Entree sur l'écran de suivi des demandes de naissance
			$('#numero_SuiviDemandenaissance').live('keypress',function(event)
			{
				if ( event.which == 13 )
				{
					check_formular_SuiviDemandenaissance();
					return false;
				}			
			});	
		})
		

		$('#demarches-Demandemariage').live('pagebeforeshow', function(event)
		{
			// vider les champs par defaut
			loadSettingsDemandemariage();
		})
		
		$('#demarches-SuiviDemandemariage').live('pagebeforeshow', function(event)
		{
			// vider les champs par defaut
			//loadSettingsSuiviDemandemariage();
			//ECOUTE DE L'EVENEMENT Entree sur l'écran de suivi des demandes de mariage
			$('#numero_SuiviDemandemariage').live('keypress',function(event)
			{
				if ( event.which == 13 )
				{
					check_formular_SuiviDemandemariage();
					return false;
				}			
			});
		})

			
							 
	//AGENDA --------------------------------------------------------
	
		$('#agenda').live('pageinit', function(event) {
			
				
			//ECOUTE DE L'EVENEMENT CLICK DANS LA LISTE GAUCHE DES VIDEOS
			$('#listeC li').live("click",function(event){
				//event.preventDefault();
				clickAgendaBtn(event);
			})
			//ECOUTE DE L'EVENEMENT CLICK DANS LE PANEL DES JOURS				  
			$('#paneljours li').live("click",function(event){
				//event.preventDefault();
				clickPanelJoursBtn(event);
			})
			
										
			
		})
	

	
	
	
	
	
	
		$('#agenda').live('pagebeforeshow', function(event) {
			
			//DEMANDE DES COORDONNEES GEOGRAPHIQUE DE L'UTILISATEUR
			//if (!latitudeUser && !longitudeUser){
				navigator.geolocation.getCurrentPosition(onSuccessGetLocation, onErrorGetLocation);
			//}
			
					
			
		})
		
	//LOCALISATION --------------------------------------------------------
		$('#map').live('pageinit', function(event) {					   
			
						
			//FONCTIONS POUR AGRANDIR OU DIMINUER LE TEXTE DANS LA PAGE DETAIL
			$('#diminuerAgenda').live("click",function () {
				
				diminuer("#descriptionlocalisation");
			})
						  
			$('#agrandirAgenda').live("click",function () {
				
				agrandir("#descriptionlocalisation");
				
			})

			
			
			//ECOUTE DE L'EVENEMENT CLICK DANS LE BOUTON ITINERAIRE
			$('.btn-loc').live("click",function(event){
				
				event.preventDefault();
				
				clickLocalisationBtn(event);
				
				
			})	

			
			
			//ECOUTE DE L'EVENEMENT CLICK DANS LE BOUTON ITINERAIRE
			$('#pied').live("click",function(event){
				
				event.preventDefault();
				
				clickItineraireBtnP(event);
				
				
			})
			
			
			//ECOUTE DE L'EVENEMENT CLICK DANS LE BOUTON ITINERAIRE
			$('#voiture').live("click",function(event){
				
				event.preventDefault();
				
				clickItineraireBtnV(event);
				
				
			})
		})
		
	//MAP CARTE --------------------------------------------------------
		$('#mapCarte').live('pageinit', function(event) {
		
			
			$('#btn-recentrer-loc').live("click",function(event){
				event.preventDefault();
				if(mapL) {
					
					//recadrerLocalisation(mapL);
					clickLocalisationBtn(event);
				}
				
				
			})
			
										
			
		})
	
	
	
		$('#mapCarte').live('pagebeforeshow', function(event) {					   
			
			setTimeout(cssMap,500);
			setTimeout(recentrerMapL,1000);					
					
			
		})
		
		//PARKING	
		
		$('#parking').live('pagebeforeshow', function(event) {
				
			
			
			
			/***** INITIALISATION CARTE PARKING ********/
			//initCarteParking();
			
		}) 
		
		
		$('#parking-detail').live('pagebeforeshow', function(event) {					   
			
			
			setTimeout(cssMap,500);
			setTimeout(recentrerMapParking,1000);					
					
			
		})
		
		$('#parking-detail').live('pageinit', function(event) {					   
			
			$('#btn-recentrer-parking').live("click",function(event){
				event.preventDefault();
				if(mapParking) {
					
					//recadrerLocalisation(mapL);
					setTimeout(recentrerMapParking,1000);
				}
				
				
			})			
			
		})
		
		
		
		
				 
	//ITINERAIRE --------------------------------------------------------
	
		$('#routage').live('pageinit', function(event) {
			

			//ECOUTE DE L'EVENEMENT CLICK DANS LE BOUTON ITINERAIRE
			$('#btn-recentrer').live("click",function(event){
				event.preventDefault();
				if(typeMapRoutage=="V") 
				{
					recadrerItineraire(mapV);
				}
				else if(typeMapRoutage=="P")
				{
					recadrerItineraire(mapP);
				}
				
				/*var h = $( window ).height();
					var w = $( window ).width();
					$('#mapDiv').css( "height", h );
					$('#mapDiv').css( "width", w );
				*/
			})
										
		
		})

	
	
		$('#routage').live('pagebeforeshow', function(event) {						
			
			setTimeout(cssMap,500);
			
				
			
			
			
				
																								
		})
		//AUTRES DEMARCHES --------------------------------------------------------
		$('#demarches-autres').live('pagebeforeshow', function(event) {					   
			//REDEFINITION DES DIMENSIONS A CHAQUE CHANGEMENT D'ORIENTATION
			$(window).orientationchange( function( e ) {
				var h = $( window ).height();
					var w = $( window ).width();
					$('#frameDemAutres').css( "height", h );
					$('#frameDemAutres').css( "width", w );
			})
		})
		
		

}) //////////////////////////////////////////////////////////////////////////////// fin du mobileinit

//$.getScript('jquery/jquery.mobile-1.2.0.min.js');





//}




/************************************************************************
 * FONCTIONS
 ************************************************************************/
//CORRECTIONS TYPO ET CHARSET HTML----------------------------
function unescapeHTML(escapedHTML) {
	var retour="";
	if(escapedHTML)
	{
		retour=escapedHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
	}
	return retour;
}



function htmlEncode(value){
    if (value) {
        return jQuery('<div />').text(value).html();
    } else {
        return '';
    }
}
 
function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    } else {
        return '';
    }
}


//TEST DE CONNECTION----------------------------
/*
function connectionAvailable() {
	var networkState = navigator.network.type;
	// on checke la connection : si le networkState est égal à unknown ou none
	// on considère qu'il n'y a pas de connexion dispo
	return (networkState != Connection.UNKNOWN && networkState != Connection.NONE);
}
*/

function checkConnection() {

	
			var networkState = navigator.connection.type;
			var states = {};
			states[Connection.UNKNOWN]  = 'UNKNOWN';
			states[Connection.ETHERNET] = 'Ethernet connection';
			states[Connection.WIFI]     = 'WiFi connection';
			states[Connection.CELL_2G]  = 'Cell 2G connection';
			states[Connection.CELL_3G]  = 'Cell 3G connection';
			states[Connection.CELL_4G]  = 'Cell 4G connection';
			states[Connection.NONE]     = 'UNKNOWN';
		
			if(states[networkState]=="UNKNOWN" || states[networkState]=="undefined" || states[networkState]=="")
			{
				//VERIFICATION SI LA BASE WEBSQL EXISTE
				if(!db){
					
					pasDeReseauPasDeWebSQL=true;
					premierDemarrageAppli=true;
					
					navigator.notification.alert("Vous ne pouvez pas lancer l'application car le réseau est indisponible","","Réseau indisponible","Fermer");
					//alert("Vous ne pouvez pas lancer l'application car le réseau est indisponible");
					$.mobile.changePage( "#redirection", {
							reverse: true,
							changeHash: true
					});
					
				}
				
				else{
					
					////VERIFICATION SI LA BASE WEBSQL CONTIENT DES DONNEES
					db.transaction(function(trans){
						
						trans.executeSql(' SELECT * FROM actus ORDER BY id desc', [], function(trans, data){
							
							if(!data || data.rows.length<1)
							{
								pasDeReseauPasDeWebSQL=true;
								premierDemarrageAppli=true;
								
								navigator.notification.alert("Vous ne pouvez pas lancer l'application car le réseau est indisponible","","Réseau indisponible","Fermer");
								//alert("Vous ne pouvez pas lancer l'application car le réseau est indisponible");
								$.mobile.changePage( "#redirection", {
										reverse: true,
										changeHash: true
								});
								
							}
							
					
							
							
						}, fnerreur);
					});
					
					
					
				}
				
				
				
					
											
					
				
			}
					   
	
}






function AffichePopupConnexion(MonTexte)
{
	$("#popup-connexion-texte").empty();
	$("#popup-connexion-texte").append(MonTexte);
	// adapter le lien en fonction du resultat de l'action
	$("#popup-connexion").popup("open");
	
	/*if (BlErreur == true)
	{
		
		$("#href-popup-connexion").attr("href","#about");
		
	}
	else
	{
		$("#href-popup-connexion").attr("href","#about");
		
	}*/
	
}


//GESTION ORIENTATON PUBLICATIONS----------------------------
function readDeviceOrientationPubli()
{
	switch (window.orientation)
	{
		case 0:  
				//var h = $( window ).height();
				$('#listePubli').css( "height", "600px");
				//$('#publi-detail').removeClass('publi-detail-paysage publi-detail');
				//$('#publi-detail').addClass('publi-detail');
				// Portrait 
				break; 
        
		case 180:  
				//var h = $( window ).height();
				$('#listePubli').css( "height", "600px");
				// Portrait (Upside-down)
				//$('#publi-detail').removeClass('publi-detail-paysage publi-detail');
				//$('#publi-detail').addClass('publi-detail');
				break; 
		
		case -90:  
				//var h = $( window ).height();
				$('#listePubli').css( "height", "600px");
				// Landscape (Clockwise)
				//$('#publi-detail').removeClass('publi-detail publi-detail-paysage');
				//$('#publi-detail').addClass('publi-detail-paysage');
				break;  
  
		case 90:  
				//var h = $( window ).height();
				$('#listePubli').css( "height", "600px");
				// Landscape  (Counterclockwise)
				//$('#publi-detail').removeClass('publi-detail publi-detail-paysage');
				//$('#publi-detail').addClass('publi-detail-paysage');
				break;
	}
}

//FONCTION APPELE LORSQUE L'UTILISATEUR A REPONDU FAVORABLEMENT A LA DEMANDE DE PARTAGE DE SA LOCALISATION
function onSuccessGetLocation(position)
{
       
	latitudeUser=position.coords.latitude;
	longitudeUser= position.coords.longitude;
	//alert('latitude:'+latitudeUser+'longitude'+longitudeUser)
	flagGeoloc=true;
		
	if (latitudeUser && longitudeUser && latitude && longitude){
	
		hrefBtnIti='#popupMap';
		cssBtnIti='btn-success';
		iconBtnIti='<i class="icon-move"></i>';
		nomBtnIti='Voir Itinéraire';
			
		$('#divIti').empty().append('<a id="traceButton" href="'+hrefBtnIti+'" data-rel="popup" data-position-to="window" class="btn '+cssBtnIti+'">'+iconBtnIti+nomBtnIti+'</a>');
			
	}
	else
	{
		// OR you can set attr to ""
		//$('#traceButton').attr('disabled', 'disabled');
			
		//$('#traceButton').hide()$admin-pushwoosh@;
		//alert('c PAS bon je bloque le btn itineraire');
	}
}

//FONCTION APPELE LORSQUE L'UTILISATEUR N'A PAS REPONDU FAVORABLEMENT A LA DEMANDE DE PARTAGE DE SA LOCALISATION
 function onErrorGetLocation(error){
	//latitudeUser='45.778819';
	//longitudeUser='3.086739';
	//alert('Erreur:Vos coordonnées géographiques')
	flagGeoloc=false;
}


//PERMET D'AFFICHER PROPREMENT LE TITRE DANS LES LISTVIEWS
function affichageTitreListview(str)
{
	if(str.length > 30)
	{
		return unescapeHTML(str.substr(0,35))+' ...';
	}
	return unescapeHTML(str.substr(0,35));
}


//FONCTIONS SUR LE TEXTE----------------------------
function diminuer(div)
{
	//console.log("je suis dans bouton diminuer");
	var fontSize = $(div).css("font-size");
	//console.log(fontSize);
	fontSize=fontSize.replace("px","");
	if(fontSize>=10)
	{
		$(div).stop().animate({fontSize: '-=2px'},300);
		$(div+' > h1').stop().animate({fontSize: '-=2px'},300);
	}
				
}
function agrandir(div)
{
	//console.log("je suis dans bouton agrandir");
	var fontSize = $(div).css("font-size");
	//console.log(fontSize);
	fontSize=fontSize.replace("px","");
	if(fontSize<=20)
	{
		$(div).stop().animate({fontSize: '+=2px'},300);
		$(div+' > h1').stop().animate({fontSize: '+=2px'},300);
	}

}




function adapterLargeurPage(ident)
{

	
	var w = $( window ).width();

	//$('[data-role=page]').css( "width", w);
	$(ident+' [data-role=header]').css( "width", w);
	$(ident+' [data-role=content]').css( "width", w-20);
	$(ident+' [data-role=footer]').css( "width", w);
}

function adapterLargeurMap(ident)
{

	
	var w = $( window ).width();
	var h = $( window ).height();
	//$('[data-role=page]').css( "width", w);
	$(ident+' [data-role=header]').css( "width", w);
	$(ident+' [data-role=content]').css( "width", w);
	$(ident+' [data-role=footer]').css( "width", w);
}



//EN ATTENDANT QUE FACEBOOK SOIT MISE EN PLACE
/*function publishStory(flag) {
	  
	
	navigator.notification.alert("prochainement disponible.","","Facebook","Fermer");
	
}*/



/************************************************************************
* FONCTIONS publications.html
************************************************************************/
function loadPubJSON(flag) {
	
	
	//alert(flag);
	if(flag && flag!="")
	{
		reloadPub=flag;
	}
	//INIT TABLE ACTUS
	db.transaction( function(trans){
		
		trans.executeSql( " CREATE TABLE IF NOT EXISTS publications (id unique, lien, title, image, preview)", [],
				function(trans){
					//SUCCESS
				},
				function(trans, error){
					alert( 'error '+ error.message );
				}
		);
		
	});
	
	

	readPub(updatePub);
}


//RECUPERE LES DONNEES DE LA BDD POUR LES AFFICHER
function readPub(_callback){

	if(!db)
		return;

	//lecture de la base
	db.transaction(function(trans){
		
		trans.executeSql(' SELECT * FROM publications ', [], function(trans, data){			
			
			pubJSON=data;			
			
			if(pubJSON.rows.length>1)
			{
				
				var pub = pubJSON.rows.item(0);
				//alert(actu.title);
				
				if(reloadPub!="reload")
				{
					renderPubLast();
				}
				
				renderPubList();
				
				if(!_callback)
				{
					loadPubTermine=true;				
					//AFFICHAGE DES DONNEES TERMINEE
				}
				
			}
			
			if(_callback)
			{
				_callback();
			}
			
			
		}, fnerreur);
	});

}



//RECUPERE LA MAJ JSON
function updatePub(){
	
	//$('#LoadingMsg').show();
	// récupération des données avec le dernier id
		$.ajax({ 
			
			//url: 'proxy.php?type=pub',
			url: 'http://www.clermont-ferrand.fr/spip.php?page=publications.json&var_mode=recalcul',
			//type: 'GET',
			dataType:'json',
			success: function(data, status) {
				//debugger;
				
				
				//console.log(data);
					
				db.transaction(function(trans){ // insertion des données
					
					
					//SI ON A DES ACTUS ON MAJ LA BDD
					if(data.publications.length>10)
					{				
						//On vide la table actus
						
						
						trans.executeSql('DELETE from publications', [], function(){}, 
							fnerreur);
						
					
						//On insere les nouvelles actus
						data.publications.forEach(function(item){
						
							trans.executeSql('INSERT into publications (id, lien, title, image, preview) VALUES (?, ?, ?, ?, ?)', [item.id, item.lien, item.title, item.image, item.preview], function(){},
							fnerreur);
						
						});
					}
					readPub(null);
					
					
				});
				
			},
			
			error: erreurPub
			
		});
}	







function fnerreur(trans , e){

	console.log(e.message);
	
	
	/*setTimeout(function(){
		
		$('#LoadingMsg').hide();		
		
	}, 2000);*/
	
	//renderActusLast();
	//renderActusList();
	

}


function erreurPub(trans , e){

	
	//alert("erreur pub")
	
	loadPubTermine=true;
	
	
	//console.log(e.message);
	
	
	/*setTimeout(function(){
		
		$('#LoadingMsg').hide();		
		
	}, 2000);*/
	
	//renderActusLast();
	//renderActusList();
	

}




	
	function renderPubLast(){
	
		currentDataPub = pubJSON.rows.item(0);
	
		var lastpub=currentDataPub.lien;
				pubHTML="";
				pubHTML+='<iframe frameborder="0" width="100%" height="100%" src="'+lastpub+'"></iframe>';
				
		
		//$('#publi-detail').hide();
				
		//setTimeout("$('#publi-detail').empty().append(pubHTML);",1000);
				
		//f.contentWindow.document.body.calameo-flyer.style.display = 'none';
	}


		


	function renderPubList(data){
		var publistHTML='';
		for(i = 0; i < pubJSON.rows.length; i++)
		{
			var publi = pubJSON.rows.item(i);
			
			publistHTML+='<li data-theme="a" data-icon="arrow-r" data-iconpos="right" data-id="'+publi.id+'" id="'+publi.id+'">';
			publistHTML+='<a href="#">';
			publistHTML+='<img src="'+publi.image+'"  /> ';
			publistHTML+=''+publi.title+'';
			publistHTML+='</a>';
			publistHTML+='</li>';
			
		}
		
		
		//CLICK SUR BOUTON ACTUALISATION
		//if(reloadAgenda=="reload")
		//{
		//	$('#listeP').empty().append(publistHTML).listview('refresh');
		//}
		//else
		//{
		//	$('#listeP').empty().append(publistHTML).listview('create');
		//}
		
		
		console.log("mise a jour listview pub");
		
		if ( $('#listeP').hasClass('ui-listview')) 
		{
		    $('#listeP').empty().append(publistHTML).listview('refresh');
		} 
		else 
		{
		    $('#listeP').empty().append(publistHTML).trigger('create');
		}
		
	
		
	}



function clickPubBtn(event){
	//IPHONE OU AUTRES
		//if(largeurEcran<=640 || hauteurEcran<=640){
			$.mobile.changePage( "#pubIphoneD", {
				reverse: true,
				changeHash: true
			});
		//}

		var currentid=$(event.currentTarget).attr('id');
		
		$('#listeP li').removeClass('btn-danger');
		$('#listeP #'+currentid+'').addClass('btn-danger');

		
		for(x = 0; x < pubJSON.rows.length; x++)
		{
			var publi = pubJSON.rows.item(x);
			if(publi.id==currentid)
			{
				currentDataPub= pubJSON.rows.item(x);
				break;
			}
		}
		
		var templateHTML;
			templateHTML='<iframe frameborder="0" width="100%" height="100%" src="'+currentDataPub.lien+'"></iframe>';
		
		pubHTML= templateHTML;

		
		
		//$('#publi-detail').hide();
		//var h = $( window ).height();
		//var w = $( window ).width();
		//$('#publi-detail').css( "height", h);
		//$('#publi-detail').css( "width", w);
		
		
		//setTimeout("$('#publi-detail').empty().append(pubHTML);$('#publi-detail').show();",2000);
		
		$('#publi-detail').empty().append(pubHTML);
		
				
		//POUR IOS
		trackEventGA("Publications", "consultation", unescapeHTML(currentDataPub["title"]));
		
		//POUR ANDROID
		trackEventAndroid("Publications", "consultation", unescapeHTML(currentDataPub["title"]));
		
		
	}


/************************************************************************
 * FONCTIONS TV8
 ************************************************************************/

function loadgapp() {
        gapi.client.setApiKey('AIzaSyBT5b0MBNsHiQU4GuVDMdef1smF0A-yugk');
		gapi.client.load('youtube', 'v3', function() { console.log('gapp Youtube loaded.'); });
      }




function loadTv8JSON(flag) {
	
	
	//alert(flag);
	if(flag && flag!="")
	{
		reloadTv8=flag;
	}
	//INIT TABLE ACTUS
	db.transaction( function(trans){
		
		trans.executeSql( " CREATE TABLE IF NOT EXISTS videos (id unique, lien, title, chapo)", [],
				function(trans){
					//SUCCESS
				},
				function(trans, error){
					alert( 'error '+ error.message );
					console.log( 'error '+ error.message );
				}
		);
		
	});
	
	

	readTv8(updateTv8);
}


//RECUPERE LES DONNEES DE LA BDD POUR LES AFFICHER
function readTv8(_callback){

	if(!db)
		return;

	//lecture de la base
	db.transaction(function(trans){
		
		trans.executeSql(' SELECT * FROM videos ORDER BY id desc', [], function(trans, data){
			
			
			tv8JSON=data;
			
			
			
			if(tv8JSON.rows.length>1)
			{
				
				var tv8 = tv8JSON.rows.item(0);
				//alert(actu.title);
				
				renderTv8List();
				
				if(reloadTv8!="reload")
				{
					if(largeurEcran>640 && hauteurEcran>640)
					{
						
						renderTv8Last();
					}
					
				}
				
				
				if(!_callback)
				{
					loadTv8Termine=true;					
					//AFFICHAGE DES DONNEES TERMINEE
				}
				
			}
			
			if(_callback)
			{
				_callback();
			}
			
			
		}, fnerreur);
	});

}



//RECUPERE LA MAJ JSON
function updateTv8(){
	
	//$('#LoadingMsg').show();
	// récupération des données avec le dernier id
		$.ajax({ 
			
			//url: 'proxy.php?type=actu',
			url: 'https://gdata.youtube.com/feeds/api/users/UCDHYLk7Ou2OkHSNsO6Cy3JA/uploads?alt=json&v=2&max-results=20&key=AI39si48BmfOcflTf_62jcu1j5Cs6v6a3IQI0wU8iqIzGOFrLiVCSUmDZttiD31O8I52LUGjZ2HnCLv1DehAvU-zQlHT0IJCUg',
			type: 'GET',
			dataType:'json',
			success: function(data, status) {
				//debugger;
				
				
				//console.log(data);
					
				db.transaction(function(trans){ // insertion des données
					
					
											
					trans.executeSql('DELETE from videos', [], function(){}, 
							fnerreur);
						
					
					
					
					var feed = data.feed;
					var entries = feed.entry || [];
					nbVideo=entries.length;
					nbVideo=parseInt(nbVideo)-1;
					
					for (var i = 0; i < entries.length; i++) {
						var entry = entries[i];
						//var vid = entry.media$group.yt$videoid.$t;
						var vid = entry.id.$t.split(":").slice(-1);
						var currentid = i;
						var vtitle = entry.title.$t;
						var vthumb = entry.media$group.media$thumbnail[0].url;
						var vchapo = entry.media$group.media$description.$t;
						if(vthumb!="undefined")
						{
							
							trans.executeSql('INSERT into videos (id, title, lien, chapo) VALUES (?, ?, ?, ?)', [vid, vtitle, vthumb, vchapo], function(){},
							fnerreur);
				
						}
					}
					
					
					
					
					
					
					readTv8(null);
					
					
				});
				
			},
			
			error: erreurTv8
			
		});
}	







function fnerreur(trans , e){

	console.log(e.message);
	
	
	/*setTimeout(function(){
		
		$('#LoadingMsg').hide();		
		
	}, 2000);*/
	
	//renderActusLast();
	//renderActusList();
	

}


function erreurTv8(trans , e){

	
	//alert("erreur tv8")
	
	loadTv8Termine=true;
	
	//console.log(e.message);
	
	
	/*setTimeout(function(){
		
		$('#LoadingMsg').hide();		
		
	}, 2000);*/
	
	//renderActusLast();
	//renderActusList();
	

}



function renderTv8Last(){

		var tv8 = tv8JSON.rows.item(0);
		currentDataTv8 = tv8JSON.rows.item(0);
		tv8HTML='<div class="text" id="'+tv8.id+'">'
		+'<h1>'+tv8.title+'</h1>'
		+'<iframe id="ytplayer" src="http://www.youtube.com/embed/'+tv8.id+'?rel=0" frameborder="0" allowfullscreen></iframe>'
		+'<br/>'+tv8.chapo+''
		+'</div>';
		
		$('#video-detail').empty().append(tv8HTML);
		
		$('#listeV li').removeClass('btn-danger');
		$('#listeV #'+tv8.id).addClass('btn-danger');
		
}




function renderTv8List(){
		var listeTv8HTMLTemp="";
		
		for(i = 0; i < tv8JSON.rows.length; i++)
		{
					
			var tv8 = tv8JSON.rows.item(i);
				
			listeTv8HTMLTemp+='<li data-id="'+tv8.id+'" id="'+tv8.id+'" data-icon="arrow-r" data-iconpos="right" data-theme="a" ><a href="#">';
			listeTv8HTMLTemp+='<img src="'+tv8.lien+'" width="120" height="90" />';
			if(largeurEcran>640 && hauteurEcran>640)
			{
				listeTv8HTMLTemp+='<h3>'+affichageTitreListview(tv8.title)+'</h3>';
			}
			else
			{
				listeTv8HTMLTemp+='<h3>'+tv8.title+'</h3>';
			}
			listeTv8HTMLTemp+='</a></li>';
				
			
		}
		
		//if(reloadActu=="reload")
		//{
			//$('#listeV').empty().append(listeTv8HTMLTemp).listview('refresh');
		//}
		//else
		//{
			
		//	$('#listeV').empty().append(listeTv8HTMLTemp).listview('create');
		//}
		
		
		
		console.log("mise a jour listview pub");
		
		if ( $('#listeV').hasClass('ui-listview')) 
		{
		    $('#listeV').empty().append(listeTv8HTMLTemp).listview('refresh');
		} 
		else 
		{
		    $('#listeV').empty().append(listeTv8HTMLTemp).trigger('create');
		}
		
		
		
		listeTv8HTML=listeTv8HTMLTemp;
		
		
		
	}
/*
	function showMyVideos(data) {
    var s = '';
    s += '<img src="' + entry.media$group.media$thumbnail[0].url + '" width="' + entry.media$group.media$thumbnail[0].width + '" height="' + entry.media$group.media$thumbnail[0].height + '" alt="' + entry.media$group.media$thumbnail[0].yt$name + '" align="right"/>';
    s += '<b>Title:</b> ' + entry.title.$t + '<br/>';
    s += '<b>Author:</b> ' + entry.author[0].name.$t + '<br/>';
    s += '<b>Published:</b> ' + new Date(entry.published.$t).toLocaleDateString() + '<br/>';
    s += '<b>Duration:</b> ' + Math.floor(entry.media$group.yt$duration.seconds / 60) + ':' + (entry.media$group.yt$duration.seconds % 60) + ' (' + entry.media$group.yt$duration.seconds + ' seconds)<br/>';
    if (entry.gd$rating) {
      s += '<b>Rating:</b> ' + entry.gd$rating.average.toFixed(1) + ' out of ' + entry.gd$rating.max + ' (' + entry.gd$rating.numRaters + ' ratings)<br/>';
    }
    s += '<b>Statistics:</b> ' + entry.yt$statistics.favoriteCount + ' favorite(s); ' + entry.yt$statistics.viewCount + ' view(s)<br/>';
    s += '<br/>' + entry.media$group.media$description.$t.replace(/\n/g, '<br/>') + '<br/>';
    s += '<br/><a href="' + entry.media$group.media$player.url + '" target="_blank">Watch on YouTube</a>';
    //document.write(s);
	$('#video-detail').empty().append(s).trigger('create');
  }
*/
	
	
	
	//CLIQUE SUR UNE VIDEO DANS LA LISTE DE GAUCHE POUR FAIRE APPARAITRE LE DETAIL A DROITE DE L'ECRAN
	function clickTv8Btn(event){
	
		//IPHONE OU AUTRES
		if(largeurEcran<=640 || hauteurEcran<=640){
			
			
			$.mobile.changePage( "#tv8IphoneD", {
				reverse: true,
				changeHash: true
			});
		}
		
		var currentid = $(event.currentTarget).attr('id');
		currentidTv8 = currentid;
		
		
		
		
		$('#listeV li').removeClass('btn-danger');
		$('#listeV #'+currentidTv8+'').addClass('btn-danger');
		
		
	
		
		for(i = 0; i < tv8JSON.rows.length; i++)
		{
			var tv8 = tv8JSON.rows.item(i);
			if(tv8.id==currentidTv8)
			{
				currentDataTv8= tv8;
				break;
			}
		}
		
		
		tv8HTML='<div class="text" id="'+currentDataTv8.id+'">';
		tv8HTML+='<h1>'+currentDataTv8.title+'</h1>';
		tv8HTML+='<iframe id="ytplayer" src="http://www.youtube.com/embed/'+currentDataTv8.id+'?rel=0" frameborder="0" allowfullscreen></iframe>';
		tv8HTML+='<br />'+htmlDecode(currentDataTv8.chapo);
		tv8HTML+='</div>';
		
		$('#video-detail').empty().append(tv8HTML);		
		
		setTimeout("$('#video-detail iframe').addClass('iframeVideo');",500);
		
		

		//POUR IOS
		trackEventGA("Video", "consultation", currentDataTv8.title);
		
		//POUR ANDROID
		trackEventAndroid("Video", "consultation", currentDataTv8.title);
		
		
		
		
		
	}

	//SWIPE A GAUCHE POUR ALLER A LA VIDEO PRECEDENTE
	function SwipeLeftVideos(event){
		var currentid=$(event.currentTarget).attr('id');
		
		//alert(currentid);
		//alert(tv8JSON.rows.item(0).id);
		if(currentid==tv8JSON.rows.item(0).id)
		{
			nbTv8=tv8JSON.rows.length-1;
			//alert(tv8JSON.rows.length);
			currentDataTv8= tv8JSON.rows.item(nbTv8);
			currentidTv8=tv8JSON.rows.item(nbTv8).id;
	
		}
		else
		{
			
		
			//currentidActus=currentid;
			for(x = 0; x < tv8JSON.rows.length; x++)
			{
				var tv8 = tv8JSON.rows.item(x);
				if(tv8.id==currentid)
				{
					var tv82 = tv8JSON.rows.item(x-1);
					currentDataTv8= tv82;
					currentidTv8=tv82.id;
					break;
				}
			}
		}
		
		$('#listeV li').removeClass('btn-danger');
		$('#listeV #'+currentidTv8+'').addClass('btn-danger');
		
		
		
		
		/*if(largeurEcran>640 && hauteurEcran>640)
		{
			
			if(currentidTv8){
				scrolllisteVideo.scrollToElement("#"+currentidTv8, '400ms');
			}
		}*/
		
		
		tv8HTML='<div class="text" id="'+currentDataTv8.id+'">'
		+'<h1>'+currentDataTv8.title+'</h1>'
		+'<iframe id="ytplayer" src="http://www.youtube.com/embed/'+currentDataTv8.id+'?rel=0" frameborder="0" allowfullscreen></iframe>'
		+'<br />'+htmlDecode(currentDataTv8.chapo)+''
		+'</div>';
		
		
		detailtv8HTML=unescapeHTML(tv8HTML);
		
		//$('#video-detail').empty().append(tv8HTML);
		$('#video-detail').empty().append(detailtv8HTML);
			
		setTimeout("$('#video-detail iframe').addClass('iframeVideo');",500);
		
		
		
				
		
		
		//POUR IOS
		trackEventGA("Video", "consultation", currentDataTv8.title);
		
		//POUR ANDROID
		trackEventAndroid("Video", "consultation", currentDataTv8.title);
		
		
	}
	
	//SWIPE A DROITE POUR ALLER A VIDEO SUIVANTE
	function SwipeRightVideos(event){
		var currentid=$(event.currentTarget).attr('id');
		var nbTv8=tv8JSON.rows.length-1;
	
		if(currentid==tv8JSON.rows.item(nbTv8).id)
		{
			currentDataTv8= tv8JSON.rows.item(0);
			currentidTv8=tv8JSON.rows.item(0).id;
			
		}
		else
		{
			for(x = 0; x < tv8JSON.rows.length; x++)
			{
				var tv8 = tv8JSON.rows.item(x);
				
				if(tv8.id==currentid)
				{
					var tv82 = tv8JSON.rows.item(x+1);
					currentDataTv8= tv82;
					currentidTv8=tv82.id;
					break;
				}
			}
		}
		
		/*if(largeurEcran>640 && hauteurEcran>640)
		{
			if(currentidTv8){
				scrolllisteVideo.scrollToElement("#"+currentidTv8, '400ms');
			}
		}*/
		
		$('#listeV li').removeClass('btn-danger');
		$('#listeV #'+currentidTv8+'').addClass('btn-danger');
		
		
		
		tv8HTML='<div class="text" id="'+currentDataTv8.id+'">'
		+'<h1>'+currentDataTv8.title+'</h1>'
		+'<iframe id="ytplayer" src="http://www.youtube.com/embed/'+currentDataTv8.id+'?rel=0" frameborder="0" allowfullscreen></iframe>'
		+'<br />'+htmlDecode(currentDataTv8.chapo)+''
		+'</div>';
		
		
		
		
		//$('#video-detail').empty().append(tv8HTML);
		$('#video-detail').empty().append(tv8HTML);
		
		setTimeout("$('#video-detail iframe').addClass('iframeVideo');",500);
		
		//POUR IOS
		trackEventGA("Video", "consultation", currentDataTv8.title);
		
		//POUR ANDROID
		trackEventAndroid("Video", "consultation", currentDataTv8.title);
		
		
		
	}


/*

adresse webservice

extranet.ville-clermont-ferrand.fr au lieu de 212.51.186.148

*/



function loadSettings(){
	$('#age').val(localStorage.age);
	$('#budget').val(localStorage.budget);
	$('#poids').val(localStorage.poids);
}

function saveSettings(){
	localStorage.age= $('#age').val();
	localStorage.budget= $('#budget').val();
	localStorage.poids= $('#poids').val();
	jQT.goBack();
	return false;
}

function refreshEntries() {
    var currentDate = sessionStorage.currentDate;
    $('#date h1').text(currentDate);
}

//------------------------------------------------------------------------------
//CAMERA

function PictureSourceType() {};
PictureSourceType.PHOTO_LIBRARY = 0;
PictureSourceType.CAMERA = 1;

function getPicture(sourceType)
{
	var options = { quality: 10 };
	if (sourceType != undefined)
	{
		options["sourceType"] = sourceType;
	}
	// if no sourceType specified, the default is CAMERA
	navigator.camera.getPicture(getPicture_Success, null, options);
}

function getPicture_Success(imageData)
{
	//alert("getpic success");
	debug.log('length: ' + imageData.length);
	//debug.log('imagedata=' + imageData);
	document.getElementById("test_img").src = "data:image/jpeg;base64," + imageData;
	$('#hiddenimage').val(imageData);
}



/************************************************************************
 * FONCTIONS DE VERIFICATION DU FORMULAIRE
 ************************************************************************/


$(document).ready(function()
{
	$('input.donnees').live("blur",function()
	{
		//console.log(this.value);
		var email =    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
		var number = /^[-]?\d*\.?\d*$/; // Nombre
		var length5 = /\b.{5}\b/; // Longueur de 5 caractères
		var length10 = /\b.{10}\b/; // Longueur de 10 caractères
		var trigger_ok = false;
		var trigger_tested = true;
    
		if($(this).attr("rel") == 'obligatoire')
		{
			if($(this).attr("rev") == 'email' && $(this).val().match(email))
			{
				trigger_ok = true;
				trigger_tested = false;
			}
			if($(this).attr("rev") == 'number' && $(this).val().match(number))
			{
				trigger_ok = true;
				trigger_tested = false;
			}
			if($(this).attr("rev") == 'length5' && $(this).val().match(length5))
			{
				trigger_ok = true;
				trigger_tested = false;
			}
			if($(this).attr("rev") == 'length10' && $(this).val().match(length10))
			{
				trigger_ok = true;
				trigger_tested = false;
			}
			if($(this).val() != '' && trigger_tested)
			{
				trigger_ok = true;
			}
			if(trigger_ok)
			{
				$(this).removeClass("field_error");
				$("#l_"+$(this).attr("name")).removeClass("label_error");
			}
			
		}
	});

				  
	$('textarea.donnees').live("blur",function()
	{
		var email =    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; //Adresses Mail
		var number = /^[-]?\d*\.?\d*$/; // Nombre
		var length5 = /\b.{5}\b/; // Longueur de 5 caractères
		var length10 = /\b.{10}\b/; // Longueur de 10 caractères
		//var maxlength380 = /\b.{10}\b/; // Longueur de 10 caractères
		var trigger_ok = false;
		var trigger_tested = true;
											 
		//console.log($(this).val().length());
											 
		if($(this).attr("rel") == 'obligatoire')
		{
			if($(this).attr("rev") == 'email' && $(this).val().match(email))
			{
				trigger_ok = true;
				trigger_tested = false;
			}
			if($(this).attr("rev") == 'number' && $(this).val().match(number))
			{
				trigger_ok = true;
				trigger_tested = false;
			}
			if($(this).attr("rev") == 'length5' && $(this).val().match(length5))
			{
				trigger_ok = true;
				trigger_tested = false;
			}
			if($(this).attr("rev") == 'lenght10' && $(this).val().match(lenght10))
			{
				trigger_ok = true;
				trigger_tested = false;
			}
			if($(this).attr("rev") == 'maxlenght50' && $(this).val().length < 50 )
			{
				trigger_ok = true;
				trigger_tested = false;
			}
			if($(this).val() != '' && trigger_tested)
			{
				trigger_ok = true;
			}
			if(trigger_ok)
			{
				$(this).removeClass("field_error");
				$("#l_"+$(this).attr("name")).removeClass("label_error");
			}
			
		}
	});

});





function alerte(id)
{
    $("#"+id).addClass("field_error");
    $("#l_"+id).addClass("label_error");
	
}

function no_alerte(id)
{
    $("#"+id).removeClass("field_error");
    $("#l_"+id).removeClass("label_error");
}

/************************************************************************
 * FONCTIONS FORMULAIRE PROXIMCITE WEB SERVICE
 ************************************************************************/




function check_formular()
{
    var email = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; //Adresses Mail
    var number = /^[-]?\d*\.?\d*$/; // Nombre
    var length5 = /\b.{5}\b/; // Longueur de 5 caractères
	var length10 = /\b.{10}\b/; // Longueur de 10 caractères
	//var formatDate = /^(\d{1,2}\/){2}\d{4}$/;
	var formatDate = /^([012]\d|30|31)\/([01]\d)\/\d{1,4}$/;
	
	
    var trigger = true;
    
    //:imput CORRESPOND A TOUS LES ELEMENTS DU FORMULAIRE
    $(":input[data-id=proxi]").each(function()
	{
		var valeur = $(this).val();
		
		var type = $(this).attr("rel");
		var rev = $(this).attr("rev");
		var nom = $(this).attr("name");
		
		//CAS D'UNE COMBO
		if(rev=="select")
		{			
			var valeur=$("#"+nom+" option:selected").val(); 			
		}
		
		
		//alert("valeur"+valeur+"/type"+type+"/rev"+rev+"/nom"+nom)
		
		
				
/*		
 		console.log("objet="+this);
		console.log("type="+type);
		console.log("rev="+rev);
		console.log("nom="+nom);
		console.log("valeur="+valeur);
		console.log($(this).val().length);
*/
      
									
		if(type == "obligatoire")
		{
			if(valeur == '')
			{
				alerte(nom);
				trigger = false;
			}
			if(!valeur.match(email) && rev == 'email')
			{
				alerte(nom);
				trigger = false;
			}
			if(!valeur.match(number) && rev == 'number')
			{
				alerte(nom);
				trigger = false;
			}
			if(!valeur.match(length5) && rev == 'length5')
			{
				alerte(nom);
				trigger = false;
			}
			if(!valeur.match(length10) && rev == 'lenght10')
			{
				alerte(nom);
				trigger = false;
			}
			
			
			
			
		
			
		}
	});
	/*
	 if(trigger)
	 {
	 $("#error_formular").slideUp("fast");
	 no_alerte(nom);
	 }else{
	 $("#error_formular").slideDown("fast");
	 }
	 */
	 
	if(trigger == true)
    {
		$("#loader_proxi").show(function()
		{
			$("#btn_envoyer_proximcite").attr("disabled","disabled");
			envoiProximcite();
		});
    }
	else
	{
		$("#btn_envoyer_proximcite").attr("disabled","");
		$("#loader_proxi").hide();
		AffichePopupProxi("Les champs en rouge sont vides ou incorrects. Merci de corriger ce(s) erreur(s) avant de valider le formulaire.",true);
    }
	
    return trigger;
	
	
}


function AffichePopupProxi(MonTexte,BlErreur)
{
	$('#popup-proxi-texte').empty();
	$('#popup-proxi-texte').append(MonTexte);
	// adapter le lien en fonction du resultat de l'action
	if (BlErreur == true)
	{
		$("#href-popup-proxi").attr("href","#demarches-proximcite");
	}
	else
	{
		$("#href-popup-proxi").attr("href","#demarches-proximcite-info");
	}
	$('#popup-proxi').popup("open");
}


function RetourDemarchesProxi()
{
	$(location).attr("href", "#demarches-proximcite-info");
}

function envoiProximcite()
{
	
	
	/*console.log("proximcitecivilite="+$('#civilite_proxi option:selected').val());
	console.log("proximcitenom="+$('#nom_proxi').val());
	console.log("proximciteprenom="+$('#prenom_proxi').val());
	console.log("proximciteadresse="+$('#adresse_proxi').val());
	console.log("proximcitecp="+$('#cp_proxi').val());
	console.log("proximciteville="+$('#ville_proxi').val());
	console.log("proximcitetel="+$('#tel_proxi').val());
	console.log("proximciteemail="+$('#email_proxi').val());
	console.log("proximcitelieu="+$('#lieu_proxi').val());
	console.log("proximcitedescription="+$('#description_proxi').val());
	console.log("proximciteimage="+$('#hiddenimage').val());*/
	
	

	localStorage.proximciteimage= $('#hiddenimage').val();
	if (localStorage.proximciteimage.length>2000000)
	{
		$("#loader_proxi").hide();
		$("#btn_envoyer_proximcite").attr("disabled","");
		AffichePopupProxi('La taille de la photo est trop importante pour être transmise, merci de diminuer la résolution',true);
	}
	else
	{
	
		localStorage.proximcitecivilite= $('#civilite_proxi option:selected').val();
		localStorage.proximcitenom= $('#nom_proxi').val();
		localStorage.proximciteprenom= $('#prenom_proxi').val();
		localStorage.proximciteadresse= $('#adresse_proxi').val();
		localStorage.proximcitecp= $('#cp_proxi').val();
		localStorage.proximciteville= $('#ville_proxi').val();
		localStorage.proximcitetel= $('#tel_proxi').val();
		localStorage.proximciteemail= $('#email_proxi').val();
		localStorage.proximcitelieu= $('#lieu_proxi').val();
		localStorage.proximcitedescription= $('#description_proxi').val();

		var MonResult = ExecuteRequete();

	}
	return false;
}	




function loadSettingsProximcite(){
	//on réinitialise tout au rechargement
	
	$("#loader_proxi").hide();
	
	$("#btn_envoyer_proximcite").attr("disabled","");
	$('#hiddenimage').val("");
	// raz d'une select
	$("#civilite_proxi option:selected").attr("selected",'');// on met simplement la valeur de l'attribut à vide
	$("#civilite_proxi option[value=3]").attr("selected","selected");	
	$("#civilite_proxi").selectmenu('refresh');
	//
	//$('#civilite_proxi').val("");
	$('#nom_proxi').val("");
	$('#prenom_proxi').val("");
	$('#adresse_proxi').val("");
	$('#cp_proxi').val("");
	$('#ville_proxi').val("");
	$('#tel_proxi').val("");
	$('#email_proxi').val("");
	$('#lieu_proxi').val("");
	$('#description_proxi').val("");


	// raz d'une select
	$("#localisation_proxi option:selected").attr("selected",'');// on met simplement la valeur de l'attribut à vide
	$("#localisation_proxi option[value='1']").attr("selected","selected");
	$('#localisation_proxi').val('1').slider("refresh");

	$(":input[data-id=proxi]").each(function()
	{
		$(this).removeClass("field_error");
		$("#l_"+$(this).attr("name")).removeClass("label_error");
	});
	
	
	deletePhoto();


}

function nettoyageSQL(champ)
{
	
	if(champ){
		
		return champ.replace(/'/g,"''"); //remplacement apostrophe dans toute la chaine(javascript expression régulière utilisée)
	}
	return "";
	
	
}
						 
                         
function ExecuteRequete()
{
	var jsondata;
	if (DEBUG==false)
	{
		jsondata= "{'NomBdd':'Proximcite','Password':'Proximcite$','Requete':'";
	}
	else
	{
		jsondata= "{'NomBdd':'ProximciteDev','Password':'ProximciteDev$','Requete':'";		
	}
	localStorage.proximcitecivilite;
	
	
	/*alert("localStorage.proximcitenom="+localStorage.proximcitenom);
	alert("localStorage.proximciteprenom="+localStorage.proximciteprenom);
	alert("localStorage.proximciteadresse="+localStorage.proximciteadresse);
	alert("localStorage.proximcitecp="+localStorage.proximcitecp);
	alert("localStorage.proximciteville="+localStorage.proximciteville);
	alert("localStorage.proximcitetel="+localStorage.proximcitetel);
	alert("localStorage.proximciteemail="+localStorage.proximciteemail);
	alert("localStorage.proximcitelieu="+localStorage.proximcitelieu);
	alert("localStorage.proximcitedescription="+localStorage.proximcitedescription);*/
	
	
	var snom=nettoyageSQL(localStorage.proximcitenom);
	var sprenom=nettoyageSQL(localStorage.proximciteprenom);
	var sadresse=nettoyageSQL(localStorage.proximciteadresse);
	var scp=nettoyageSQL(localStorage.proximcitecp);
	var sville=nettoyageSQL(localStorage.proximciteville);
	var stel=nettoyageSQL(localStorage.proximcitetel);
	var semail=nettoyageSQL(localStorage.proximciteemail);
	var slieu=nettoyageSQL(localStorage.proximcitelieu);
	var sdescription=nettoyageSQL(localStorage.proximcitedescription);
	var fichierimageb64= localStorage.proximciteimage;
	var reponse;
	try
	{
		navigator.geolocation.getCurrentPosition(function(position)
		{
			insertEntry(position.coords.latitude,position.coords.longitude);
		});
	}
	catch(e)
	{
		insertEntry();
	}

	var sLongitude="";
	var sLatitude="";

	
	
	
	// si l'utilisateur a choisi 'Signaler ma position'
	if ($("#localisation_proxi option[value='1']").attr("selected"))
	{
		//alert("longitude"+sLongitude+"//latitude"+sLatitude)
		//sLongitude = nettoyageSQL(localStorage.Longitude);
		//sLatitude = nettoyageSQL(localStorage.Latitude);
		sLongitude = longitudeUser;
		sLatitude = latitudeUser;
		//alert("longitude"+sLongitude+"//latitude"+sLatitude)
		
	}
		
	if(fichierimageb64)
	{
		jsondata= jsondata + escape("exec SP_INS_FIC_MOBILE @fichierbase64='" + fichierimageb64 + "', @FIC_LOG_AUTEUR='Mobile', @CIV_ID=" + localStorage.proximcitecivilite + ", @ORI_ID=3, @PRI_ID=2, @FIC_NOM='" + snom + "', @FIC_PRENOM='" + sprenom + "', @FIC_ADRESSE='" + sadresse + "', @FIC_ZIPCODE='" + scp + "', @FIC_VILLE='" + sville + "', @FIC_TELEPHONE='" + stel + "', @FIC_EMAIL='" + semail + "', @FIC_SUPPLEMENT='" + slieu + "', @FIC_DESCRIPTION='" + sdescription + "', @ETA_ID=2, @FIC_NOMPHOTO='iphonecamera.jpeg', @FIC_TYPE='image/jpeg', @FIC_LONGITUDE='" + sLongitude + "', @FIC_LATITUDE='" + sLatitude + "'");
	}
	else
	{	
		jsondata= jsondata + escape("exec SP_INS_FIC_MOBILE @FIC_LOG_AUTEUR='Mobile', @CIV_ID=" + localStorage.proximcitecivilite + ", @ORI_ID=3, @PRI_ID=2, @FIC_NOM='" + snom + "', @FIC_PRENOM='" + sprenom + "', @FIC_ADRESSE='" + sadresse + "', @FIC_ZIPCODE='" + scp + "', @FIC_VILLE='" + sville + "', @FIC_TELEPHONE='" + stel + "', @FIC_EMAIL='" + semail + "', @FIC_SUPPLEMENT='" + slieu + "', @FIC_DESCRIPTION='" + sdescription + "', @ETA_ID=2, @FIC_LONGITUDE='" + sLongitude + "', @FIC_LATITUDE='" + sLatitude + "'");	
	}
	jsondata= jsondata + "'}";
	////console.log(jsondata);

	
	
	$.ajax(
	{
		type: "POST",
		//url: "http://212.51.186.148:8084/service.asmx/ExecuteNonQuery_ParametersEncodeAjax",
		url: "http://extranet.ville-clermont-ferrand.fr:8084/service.asmx/ExecuteNonQuery_ParametersEncodeAjax",
		data: jsondata,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		//async: false,
		timeout: 60000,
		success: function(data, textStatus, jqXHR)
		{
			reponse = true;
			// envoyer le mail de confirmation
			EnvoiMailDistant("http://www.clermont-ferrand.fr/modules/proximcite/mail.php?Destinataire=" + encodeURIComponent(localStorage.proximciteemail));
			// reinitialiser les champs		
			loadSettingsProximcite();
			// envoyer le message de confirmation et
			AffichePopupProxi('Votre demande sera traitée dans les plus brefs délais',false);
			
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			reponse = false;
			$("#loader_proxi").hide();
			$("#btn_envoyer_proximcite").attr("disabled","");
			$("#loader_proxi").hide();
			console.log(errorThrown);
			if (textStatus=="timeout") {
				AffichePopupProxi("Réseau insuffisant, veuillez réitérer votre demande ultérieurement",true);
			}
			else
			{
				
				AffichePopupProxi("Suite à un problème technique, veuillez réitérer votre demande ultérieurement",true);
			}
		},
		complete: function()
		{
			$("#loader_proxi").hide();
			return reponse;
		}	
	});
	
	return reponse;
	
}



		
/************************************************************************
 * FONCTIONS FORMULAIRE CONTACT WEB SERVICE
 ************************************************************************/
function check_formular_contact()
{
    var email = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; //Adresses Mail
    var trigger = true;
    $(":input[data-id=contact]").each(function()
	{
		var valeur = $(this).val();
		var type = $(this).attr("rel");
		var rev = $(this).attr("rev");
		var nom = $(this).attr("name");

		if(type == "obligatoire")
		{
			if(valeur == '')
			{
				alerte(nom);
				trigger = false;
			}
			if(!valeur.match(email) && rev == 'email')
			{
				alerte(nom);
				trigger = false;
			}
		}
	});
	
	
	if(trigger == true)
    {
		

		$("#loader_contact").show(function()
		{
			$("#btn_envoyer_contact").attr("disabled","disabled");
			envoiContact();
		});

    }
	else
	{
		$("#btn_envoyer_contact").attr("disabled","");
		$("#loader_contact").hide();
		AffichePopupContact("Les champs en rouge sont vides ou incorrects. Merci de corriger ce(s) erreur(s) avant de valider le formulaire.", true);
    }
	
    //return trigger;
	
}

function AffichePopupContact(MonTexte,BlErreur)
{
	$("#popup-contact-texte").empty();
	$("#popup-contact-texte").append(MonTexte);
	// adapter le lien en fonction du resultat de l'action
	$("#popup-contact").popup("open");
	
	if (BlErreur == true)
	{
		
		$("#href-popup-contact").attr("href","#demarches-contact");
		
	}
	else
	{
		$("#href-popup-contact").attr("href","#demarches-contact-info");
		
	}
	
}






function envoiContact()
{
	//ON RECUPERE LES VALEURS SAISIES DU FORMULAIRE CONTACT
	localStorage.Contactnom= $('#nom_Contact').val();
	localStorage.Contactemail= $('#email_Contact').val();
	localStorage.Contactsujet= $('#sujet_Contact').val();
	localStorage.Contactcommentaire= $('#commentaire_Contact').val();
	
	//NETTOYAGE SQL DES VALEURS SAISIES DU FORMULAIRE CONTACT
	var snom=nettoyageSQL(localStorage.Contactnom);
	var semail=nettoyageSQL(localStorage.Contactemail);
	var ssujet=nettoyageSQL(localStorage.Contactsujet);
	var scommentaire=nettoyageSQL(localStorage.Contactcommentaire);
	
	//alert(DEBUG);
	
	$.ajax(
	{
		type: "POST",
		//url: "http://212.51.186.148:8084/service.asmx/ExecuteNonQuery_ParametersEncodeAjax",
		//url: "http://extranet.ville-clermont-ferrand.fr:8084/service.asmx/ExecuteNonQuery_ParametersEncodeAjax",
		
		url: "http://www.clermont-ferrand.fr/modules/eprocedures/envoi_app_mobile.php",
		data: "app_id=12&app=12&appli12champ2="+snom+"&appli12champ3="+semail+"&appli12champ4="+ssujet+"&appli12champ5="+scommentaire+"&debug="+DEBUG,
		timeout: 20000,
		//contentType: "application/json; charset=utf-8",
		//dataType: "json",
		//async: false,
		success: function(data, textStatus, jqXHR)
		{
			if(jqXHR.readyState == 4)
			{
				if(jqXHR.status == 200)
				{
				
					//alert(jqXHR.responseText);
					//console.log(jqXHR.responseText);
					
					// envoyer le mail de confirmation pour debug : inutile car envoyé par envoi_app_mobile.php
					////////////////////////////
					if (DEBUG==true)
					{
						LocalDestinataire = encodeURIComponent("contactmobile@ville-clermont-ferrand.fr");
					
						EnvoiMailDistant("http://www.clermont-ferrand.fr/modules/eprocedures/mail.php?Destinataire="+LocalDestinataire+"&sujet="+ssujet+"&commentaire="+scommentaire);
					}
					////////////////////////////
					// reinitialiser les champs
					loadSettingsContact();
					// envoyer le message de confirmation
					AffichePopupContact("Votre demande sera traitée dans les plus brefs délais",false);
				}
				else
				{
					$("#loader_contact").hide();
					AffichePopupContact("Suite à un problème technique, veuillez réitérer votre demande ultérieurement", true);
				}
			}
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			reponse = false;
			//alert(textStatus + " " + errorThrown );
			$("#loader_contact").hide();
			if (textStatus=="timeout") {
				AffichePopupContact("Réseau insuffisant, veuillez réitérer votre demande ultérieurement",true);
			}
			else
			{
				AffichePopupContact("Suite à un problème technique, veuillez réitérer votre demande ultérieurement",true);
			}

		},
		complete: function()
		{
			//$("#loader_contact").hide();
			//return reponse;
		}	
	});

}







function RetourDemarchesContact()
{
	$.mobile.changePage( "#demarches-contact-info", {reverse: true,changeHash: true});
}


					 
function loadSettingsContact()
{
	//on réinitialise tout au rechargement
	$("#loader_contact").hide();
	$('#nom_Contact').val("");
	$('#email_Contact').val("");
	$('#sujet_Contact').val("");
	$('#commentaire_Contact').val("");
	$("#btn_envoyer_contact").attr("disabled","");
	
	$(":input[data-id=contact]").each(function()
	{
		$(this).removeClass("field_error");
		$("#l_"+$(this).attr("name")).removeClass("label_error");
	});
	
}
						 
/*
function ExecuteRequeteContact()
{
	var jsondata;
	if (DEBUG==false) 
	{
		jsondata= "{'NomBdd':'Eprocedures','Password':'Eprocedures$','Requete':'";
	}
	else
	{
		jsondata= "{'NomBdd':'EproceduresDev','Password':'EproceduresDev$','Requete':'";
	}
	var snom=nettoyageSQL(localStorage.Contactnom);
	var semail=nettoyageSQL(localStorage.Contactemail);
	var ssujet=nettoyageSQL(localStorage.Contactsujet);
	var scommentaire=nettoyageSQL(localStorage.Contactcommentaire);
	var reponse;
	jsondata= jsondata + escape("insert into T_DONNEES_UTILISATEUR_DUT (APP_ID, DUT_CHAMPS1, DUT_CHAMPS2, DUT_CHAMPS3, DUT_CHAMPS4, DUT_DATE_DEMANDE ) values(12, '" + snom + "', '" + semail + "',  '" + ssujet + "', '" + scommentaire + "', getdate())");
	jsondata= jsondata + "'}";
	 ////alert(jsondata);

	$.ajax
	(
		{
			type: "POST",
			url: "http://extranet.ville-clermont-ferrand.fr:8084/service.asmx/ExecuteNonQuery_ParametersEncodeAjax",
			data: jsondata,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			async: false,
			timeout: 20000,
			success: function(data, textStatus, jqXHR)
			{
				reponse = true;
				////alert('ok');
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
 				reponse = false;
				////alert(textStatus + " " + errorThrown);
			},
			complete: function()
			{
				//$("#loader_contact").hide();
				return reponse;
			}	
		}
	);
	return reponse;
	
}
*/
/************************************************************************
* FONCTIONS FORMULAIRE DEMANDE NAISSANCE WEB SERVICE
************************************************************************/

  
function check_formular_Demandenaissance()
{
	var email = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; //Adresses Mail
	//var formatDate = /^(\d{1,2}\/){2}\d{4}$/;
	var formatDate = /^([012]\d|30|31)\/([01]\d)\/\d{1,4}$/;
	
	var trigger = true;
	$(":input[data-id=Demandenaissance]").each(function()
	{
		var valeur = $(this).val();
		var type = $(this).attr("rel");
		var rev = $(this).attr("rev");
		var nom = $(this).attr("name");
		
		//CAS D'UNE COMBO
		if(rev=="select")
		{			
			var valeur=$("#"+nom+" option:selected").val(); 			
		}
		
	
		if(type == "obligatoire")
		{
			if(valeur == '')
			{
				alerte(nom);
				trigger = false;
			}
			if(!valeur.match(email) && rev == 'email')
			{
				alerte(nom);
				trigger = false;
			}
			
			if(!valeur.match(formatDate) && rev == 'formatDate')
			{
				alerte(nom);
				trigger = false;
			}
			
			
		}
	});

	if(trigger == true)
	{
		$("#loader_Demandenaissance").show(function()
		{
			$("#btn_envoyer_Demandenaissance").attr("disabled","disabled");
			envoiDemandenaissance();
		});

	}
	else
	{
		$("#btn_envoyer_Demandenaissance").attr("disabled","");
		$("#loader_Demandenaissance").hide();
		AffichePopupDemandenaissance("Les champs en rouge sont vides ou incorrects. Merci de corriger ce(s) erreur(s) avant de valider le formulaire.",true);
	}

	return trigger;
						 
}


function RetourDemarchesDemandenaissance()
{
	$(location).attr("href", "#demarches-etatCivil-info");
}


function AffichePopupDemandenaissance(MonTexte,BlErreur)
{
	$('#popup-Demandenaissance-texte').empty();
	$('#popup-Demandenaissance-texte').append(MonTexte);
	// adapter le lien en fonction du resultat de l'action
	if (BlErreur == true)
	{
		$("#href-popup-Demandenaissance").attr("href","#demarches-Demandenaissance");
	}
	else
	{
		$("#href-popup-Demandenaissance").attr("href","#demarches-etatCivil-info");
	}
	$('#popup-Demandenaissance').popup("open");
}


						 
function envoiDemandenaissance()
{

	// enregistrement de la saisie
	localStorage.nom_Demandenaissance = $('#nom_Demandenaissance').val();
	localStorage.prenom_Demandenaissance = $('#prenom_Demandenaissance').val();
	localStorage.date_Demandenaissance = $('#date_Demandenaissance').val();
	localStorage.NomPere_Demandenaissance = $('#NomPere_Demandenaissance').val();
	localStorage.PrenomPere_Demandenaissance = $('#PrenomPere_Demandenaissance').val();
	localStorage.NomPere_Demandenaissance = $('#NomPere_Demandenaissance').val();
	localStorage.lieu_Demandenaissance = $('#lieu_Demandenaissance').val();
	localStorage.NomMere_Demandenaissance = $('#NomMere_Demandenaissance').val();
	localStorage.PrenomMere_Demandenaissance = $('#PrenomMere_Demandenaissance').val();
	//localStorage.plutilingue_Demandenaissance = $('input[type=radio][name=plutilingue_Demandenaissance]:checked').attr('value');
	localStorage.plutilingue_Demandenaissance = $('#plutilingue_Demandenaissance').val();
	localStorage.referenceActe_Demandenaissance = $('#referenceActe_Demandenaissance').val();
	localStorage.TypeActe_Demandenaissance = $('#TypeActe_Demandenaissance').val() ;
	localStorage.TypeDemandeur_Demandenaissance = $('#TypeDemandeur_Demandenaissance').val();
	localStorage.Exemplaire_Demandenaissance = $('#Exemplaire_Demandenaissance').val();
	localStorage.Motif_Demandenaissance = $('#Motif_Demandenaissance').val();
	localStorage.AutreMotif_Demandenaissance = $('#AutreMotif_Demandenaissance').val();
	localStorage.civiliteDestinataire_Demandenaissance = $('#civiliteDestinataire_Demandenaissance').val();
	localStorage.nomDestinataire_Demandenaissance = $('#nomDestinataire_Demandenaissance').val();
	localStorage.prenomDestinataire_Demandenaissance = $('#prenomDestinataire_Demandenaissance').val();
	localStorage.adresseDestinataire_Demandenaissance = $('#adresseDestinataire_Demandenaissance').val();
	localStorage.ComplementadresseDestinataire_Demandenaissance = $('#ComplementadresseDestinataire_Demandenaissance').val();
	localStorage.cpDestinataire_Demandenaissance = $('#cpDestinataire_Demandenaissance').val();
	localStorage.villeDestinataire_Demandenaissance = $('#villeDestinataire_Demandenaissance').val();
	localStorage.PaysDestinataire_Demandenaissance = $('#PaysDestinataire_Demandenaissance').val();
	localStorage.telDestinataire_Demandenaissance = $('#telDestinataire_Demandenaissance').val();
	localStorage.emailDestinataire_Demandenaissance = $('#emailDestinataire_Demandenaissance').val();
	
	// ecrire dans la bdd
	var MonResult = ExecuteRequeteDemandenaissance();
	//alert(MonResult);

/*
	if ((!MonResult) || (MonResult==false))
	{
		// effacer le loader
		$("#loader_Demandenaissance").hide();
		$("#btn_envoyer_Demandenaissance").attr("disabled","");
		AffichePopupDemandenaissance('Suite à un problème technique, veuillez réitérer votre demande ultérieurement',true);
	}
	else
	{
		var sURLTELEPRO = "http://www.clermont-ferrand.fr/modules/telepro/mail.php?Destinataire=" + encodeURIComponent(localStorage.emailDestinataire_Demandenaissance) + "&Id="+localStorage.nbLastID;
		// envoyer le mail de confirmation		
		EnvoiMailDistant(sURLTELEPRO);
		// reinitialiser les champs
		loadSettingsDemandenaissance();
		// effacer le loader
		AffichePopupDemandenaissance('Votre demande sera traitée dans les plus brefs délais.\n\nLe numéro de suivi de votre demande est le ' + localStorage.nbLastID + '.\n\nMerci.',false);
	}
*/
	return false;
}

					 
function loadSettingsDemandenaissance()
{
						 
	//on réinitialise tout au rechargement
	$("#loader_Demandenaissance").hide();
	$('#nom_Demandenaissance').val("");
	$('#prenom_Demandenaissance').val("");
	$('#lieu_Demandenaissance').val("Clermont-Ferrand");
	$('#date_Demandenaissance').val("");
	$('#NomPere_Demandenaissance').val("");
	$('#PrenomPere_Demandenaissance').val("");
	$('#NomMere_Demandenaissance').val("");
	$('#PrenomMere_Demandenaissance').val("");
	$("#btn_envoyer_Demandenaissance").attr("disabled","");


	// raz d'une select
	$("#plutilingue_Demandenaissance option:selected").attr("selected",'');// on met simplement la valeur de l'attribut à vide
	$("#plutilingue_Demandenaissance option[value='0']").attr("selected","selected");
	$('#plutilingue_Demandenaissance').val('0').slider("refresh");


	//$('#referenceActe_Demandenaissance').val("");
	// raz d'une select
	$("#TypeActe_Demandenaissance option:selected").attr("selected",'');// on met simplement la valeur de l'attribut à vide
	$("#TypeActe_Demandenaissance option[value='']").attr("selected","selected");	
	$("#TypeActe_Demandenaissance").selectmenu('refresh');
	
	//
	// raz d'une select
	$("#TypeDemandeur_Demandenaissance option:selected").attr("selected",'');// on met simplement la valeur de l'attribut à vide
	$("#TypeDemandeur_Demandenaissance option[value='1']").attr("selected","selected");	
	$("#TypeDemandeur_Demandenaissance").selectmenu('refresh');
	//	
	// raz d'une select
	$("#Exemplaire_Demandenaissance option:selected").attr("selected",'');// on met simplement la valeur de l'attribut à vide
	$("#Exemplaire_Demandenaissance option[value='1']").attr("selected","selected");	
	$("#Exemplaire_Demandenaissance").selectmenu('refresh');
	//		
	// raz d'une select
	$("#Motif_Demandenaissance option:selected").attr("selected",'');// on met simplement la valeur de l'attribut à vide
	$("#Motif_Demandenaissance option[value='.']").attr("selected","selected");	
	$("#Motif_Demandenaissance").selectmenu('refresh');
	//		
	//$('#AutreMotif_Demandenaissance').val("");
	// raz d'une select
	$("#civiliteDestinataire_Demandenaissance option:selected").attr("selected",'');// on met simplement la valeur de l'attribut à vide
	$("#civiliteDestinataire_Demandenaissance option[value='']").attr("selected","selected");	
	$("#civiliteDestinataire_Demandenaissance").selectmenu('refresh');
	//	
	$('#nomDestinataire_Demandenaissance').val("");
	$('#prenomDestinataire_Demandenaissance').val("");
	$('#adresseDestinataire_Demandenaissance').val("");
	$('#ComplementadresseDestinataire_Demandenaissance').val("");
	$('#cpDestinataire_Demandenaissance').val("");
	$('#villeDestinataire_Demandenaissance').val("");
	$('#PaysDestinataire_Demandenaissance').val("");
						
	$('#telDestinataire_Demandenaissance').val("");
	$('#emailDestinataire_Demandenaissance').val("");
	
	
	//ON MASQUE COULEUR FOND ROUGE DES CHAMPS
	$(":input[data-id=Demandenaissance]").each(function()
	{
		$(this).removeClass("field_error");
		$("#l_"+$(this).attr("name")).removeClass("label_error");		
	});
	
	
}
						 

function ExecuteRequeteDemandenaissance()
{

	var sTypeDemandeur_Demandenaissance=(localStorage.TypeDemandeur_Demandenaissance);
	var sciviliteDestinataire_Demandenaissance=(localStorage.civiliteDestinataire_Demandenaissance);
	var sTypeActe_Demandenaissance=(localStorage.TypeActe_Demandenaissance);
	var snom_Demandenaissance=nettoyageSQL(localStorage.nom_Demandenaissance);
	var sprenom_Demandenaissance=nettoyageSQL(localStorage.prenom_Demandenaissance);
	var slieu_Demandenaissance=nettoyageSQL(localStorage.lieu_Demandenaissance);
	
	
	var sdate_Demandenaissance = localStorage.date_Demandenaissance.substr(6,4) + localStorage.date_Demandenaissance.substr(3,2) + localStorage.date_Demandenaissance.substr(0,2)
	
	
	//var sdate_Demandenaissance = localStorage.date_Demandenaissance.substr(0,4)+'/'+localStorage.date_Demandenaissance.substr(8,2)+'/'+localStorage.date_Demandenaissance.substr(5,2);
	var sNomPere_Demandenaissance=nettoyageSQL(localStorage.NomPere_Demandenaissance);
	var sPrenomPere_Demandenaissance = nettoyageSQL(localStorage.PrenomPere_Demandenaissance);
	var sNomMere_Demandenaissance = nettoyageSQL(localStorage.NomMere_Demandenaissance);
	var sPrenomMere_Demandenaissance = nettoyageSQL(localStorage.PrenomMere_Demandenaissance);
	var sreferenceActe_Demandenaissance = nettoyageSQL(localStorage.referenceActe_Demandenaissance);
	var sExemplaire_Demandenaissance = (localStorage.Exemplaire_Demandenaissance);
	var sAutreMotif_Demandenaissance = nettoyageSQL(localStorage.AutreMotif_Demandenaissance)
	var snomDestinataire_Demandenaissance = nettoyageSQL(localStorage.nomDestinataire_Demandenaissance);
	var sprenomDestinataire_Demandenaissance = nettoyageSQL(localStorage.prenomDestinataire_Demandenaissance);
	var sadresseDestinataire_Demandenaissance = nettoyageSQL(localStorage.adresseDestinataire_Demandenaissance);
	var sComplementadresseDestinataire_Demandenaissance = nettoyageSQL(localStorage.ComplementadresseDestinataire_Demandenaissance);
	var scpDestinataire_Demandenaissance = nettoyageSQL(localStorage.cpDestinataire_Demandenaissance);
	var svilleDestinataire_Demandenaissance = nettoyageSQL(localStorage.villeDestinataire_Demandenaissance);
	var sPaysDestinataire_Demandenaissance = nettoyageSQL(localStorage.PaysDestinataire_Demandenaissance);
	var semailDestinataire_Demandenaissance = nettoyageSQL(localStorage.emailDestinataire_Demandenaissance);
	var sTypeDemandeur_Demandenaissance = (localStorage.TypeDemandeur_Demandenaissance);
	var stelDestinataire_Demandenaissance = nettoyageSQL(localStorage.telDestinataire_Demandenaissance);
	var sMotif_Demandenaissance = (localStorage.Motif_Demandenaissance);
	var splutilingue_Demandenaissance = (localStorage.plutilingue_Demandenaissance);
	
	

		
						 
	var sql= "insert into EC_T_DEMANDE_DEM (PAR_ID,CIV_ID,TYA_ID,DEM_NOM,DEM_PRENOM,DEM_VILLE,DEM_DAT_NAISSANCE,DEM_NOM_PERE,DEM_PRENOM_PERE,DEM_NOM_MERE,DEM_PRENOM_MERE,DEM_REF,DEM_NB,DEM_MOTIF,DEM_NOM_EPOUX,DEM_PRENOM_EPOUX,DEM_DAT_MARIAGE,DEM_DAT_DECES,DEM_NOM_DEST,DEM_PRENOM_DEST,DEM_ADR_DEST,DEM_ADR_DEST2,DEM_CP_DEST,DEM_VILLE_DEST,DEM_PAYS_DEST,DEM_MEL_DEST,TYD_ID,MOT_ID,TDe_ID,DEM_DAT,ETA_ID,DEM_TEL_DEST,DEM_NOM_PERE_EPOUX,DEM_NOM_MERE_EPOUX,DEM_DAT_ENVOI,DEM_LOGIN,DEM_PLURILINGUE,DEM_ORIGINE) values (";
	sql = sql + sTypeDemandeur_Demandenaissance + ",";									//PAR_ID
	sql = sql + sciviliteDestinataire_Demandenaissance + ",";							//CIV_ID
	sql = sql + sTypeActe_Demandenaissance+ ",";										//TYA_ID
	sql = sql + "'" + snom_Demandenaissance + "',";										//DEM_NOM
	sql = sql + "'" + sprenom_Demandenaissance + "',";									//DEM_PRENOM
	sql = sql + "'" + slieu_Demandenaissance + "',";									//DEM_VILLE
	sql = sql + "'" + sdate_Demandenaissance + "',";									//DEM_DAT_NAISSANCE
	sql = sql + "'" + sNomPere_Demandenaissance + "',";									//DEM_NOM_PERE
	sql = sql + "'" + sPrenomPere_Demandenaissance + "',";								//DEM_PRENOM_PERE
	sql = sql + "'" + sNomMere_Demandenaissance + "',";									//DEM_NOM_MERE
	sql = sql + "'" + sPrenomMere_Demandenaissance + "',";								//DEM_PRENOM_MERE
	sql = sql + "'" + sreferenceActe_Demandenaissance + "',";							//DEM_REF
	sql = sql + sExemplaire_Demandenaissance + ",";										//DEM_NB
	sql = sql + "'" + sAutreMotif_Demandenaissance + "',";								//DEM_MOTIF
	sql = sql + "null" + ",";															//DEM_NOM_EPOUX
	sql = sql + "null" + ",";															//DEM_PRENOM_EPOUX
	sql = sql + "null" + ",";															//DEM_DAT_MARIAGE
	sql = sql + "null" + ",";															//DEM_DAT_DECES
	sql = sql + "'" + snomDestinataire_Demandenaissance + "',";							//DEM_NOM_DEST
	sql = sql + "'" + sprenomDestinataire_Demandenaissance + "',";						//DEM_PRENOM_DEST
	sql = sql + "'" + sadresseDestinataire_Demandenaissance + "',";						//DEM_ADR_DEST
	sql = sql + "'" + sComplementadresseDestinataire_Demandenaissance + "',";			//DEM_ADR_DEST2
	sql = sql + "'" + scpDestinataire_Demandenaissance + "',";							//DEM_CP_DEST
	sql = sql + "'" + svilleDestinataire_Demandenaissance + "',";						//DEM_VILLE_DEST
	sql = sql + "'" + sPaysDestinataire_Demandenaissance + "',";						//DEM_PAYS_DEST
	sql = sql + "'" + semailDestinataire_Demandenaissance + "',";						//DEM_MEL_DEST
	sql = sql + sTypeDemandeur_Demandenaissance + ",";									//TYD_ID
	sql = sql + sMotif_Demandenaissance + ",";											//MOT_ID
	sql = sql + '1' + ",";// 1= Acte de naissance - Type formulaire ....				//TDE_ID
	sql = sql + "getdate(),";															//DEM_DAT
	sql = sql + '0' + ",";//0= Enregistré												//ETA_ID
	sql = sql + "'" + stelDestinataire_Demandenaissance + "',";							//DEM_TEL_DEST
	sql = sql + "null" + ",";															//DEM_NOM_PERE_EPOUX
	sql = sql + "null" + ",";															//DEM_NOM_MERE_EPOUX
	sql = sql + "null" + ",";															//DEM_DAT_ENVOI
	sql = sql + "null" + ",";															//DEM_LOGIN
	sql = sql + splutilingue_Demandenaissance + ",'Mobile')";							//DEM_PLURILINGUE
	
	
	var reponse;
	var jsondata;
	if (DEBUG==false) 
	{
		jsondata= "{'NomBdd':'Extranet','Password':'Extranet$','Requete':'";
	}
	else
	{
		jsondata= "{'NomBdd':'ExtranetDev','Password':'ExtranetDev$','Requete':'";
	}
	var Lastreq = 'SELECT MAX(DEM_ID) FROM EC_T_DEMANDE_DEM';
 	jsondata= jsondata + escape(sql) + "','RequeteLastID':'" + escape(Lastreq) + "'}";
	
	$.ajax
	(
		{
			type: "POST",
			url: "http://extranet.ville-clermont-ferrand.fr:8084/service.asmx/ExecuteNonQueryLastID_ParametersEncodeAjax",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: jsondata,
			timeout: 20000,
			//async: false,
			success: function(data, textStatus, jqXHR)
			{
				reponse = true;
				var string = JSON.stringify(data);
				var obj = $.parseJSON(string);
				localStorage.nbLastID = obj.d;		//{'d':'11675}'
				var sURLTELEPRO = "http://www.clermont-ferrand.fr/modules/telepro/mail.php?Destinataire=" + encodeURIComponent(localStorage.emailDestinataire_Demandenaissance) + "&Id="+localStorage.nbLastID;
				// envoyer le mail de confirmation		
				EnvoiMailDistant(sURLTELEPRO);
				// reinitialiser les champs
				loadSettingsDemandenaissance();
				// effacer le loader
				AffichePopupDemandenaissance('Votre demande sera traitée dans les plus brefs délais.\n\nLe numéro de suivi de votre demande est le ' + localStorage.nbLastID + '.\n\nMerci.',false);				
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				// alert('error ' + textStatus + ' ' + errorThrown);
	 			reponse = false;
				// effacer le loader
				$("#loader_Demandenaissance").hide();
				$("#btn_envoyer_Demandenaissance").attr("disabled","");
				if (textStatus=="timeout") {
					AffichePopupDemandenaissance("Réseau insuffisant, veuillez réitérer votre demande ultérieurement",true);
				}
				else
				{
					AffichePopupDemandenaissance("Suite à un problème technique, veuillez réitérer votre demande ultérieurement",true);
				}
			},
			complete: function()
			{
				$("#loader_Demandenaissance").hide();
				return reponse;
			}
		}
	);
	return reponse;
}

/************************************************************************
* FONCTIONS FORMULAIRE SUIVI DEMANDE NAISSANCE WEB SERVICE
************************************************************************/


function Fin_SuiviDemandenaissance()
{
	// reinitialiser les champs
	loadSettingsSuiviDemandenaissance();
	// retour à la page des demarches
	 RetourDemarchesSuiviDemandenaissance();
}

function check_formular_SuiviDemandenaissance()
{
	
	var trigger = true;
	$(":input[data-id=SuiviDemandenaissance]").each(function()
	{
		var valeur = $(this).val();
		var type = $(this).attr("rel");
		var rev = $(this).attr("rev");
		var nom = $(this).attr("name");
/*
		console.log("objet="+this);
		console.log("type="+type);
		console.log("rev="+rev);
		console.log("nom="+nom);
		console.log("valeur="+valeur);
		console.log($(this).val().length);
*/
		if(type == "obligatoire")
		{
			if(valeur == '')
			{
				alerte(nom);
				trigger = false;
			}
		}
	});

	if(trigger == true)
	{
		$("#loader_SuiviDemandenaissance").show(function()
		{
			$("#btn_envoyer_SuiviDemandenaissance").attr("disabled","disabled");
			envoiSuiviDemandenaissance();
		});
	}
	else
	{
		// cacher le loader
		$("#loader_SuiviDemandenaissance").hide();
		$("#btn_envoyer_SuiviDemandenaissance").attr("disabled","");
		AffichePopupSuiviDemandenaissance("Les champs en rouge sont vides ou incorrects. Merci de corriger ce(s) erreur(s) avant de valider le formulaire.",true);
	}
	return trigger;
}



						 
function envoiSuiviDemandenaissance()
{
	
	// enregistrement de la saisie
	localStorage.numero_SuiviDemandenaissance = $('#numero_SuiviDemandenaissance').val();

	
	// lire etat dans la bdd
	var MonResult = ExecuteRequeteSuiviDemandenaissance();
/*
	if ((!MonResult) || (MonResult==false))
	{
		$("#btn_envoyer_SuiviDemandenaissance").attr("disabled","");
		// cacher le loader
		$("#loader_SuiviDemandenaissance").hide();
		AffichePopupSuiviDemandenaissance("Suite à un problème technique, veuillez réitérer votre demande ultérieurement",true);
	}
	else
	{
	
		// transformer l'objet jsn en text
		var string0 = JSON.stringify(MonResult);
	
		// decomposition du json
		var obj = $.parseJSON(string0);
		// cela donne :
		//{"d":["TDE_LIB##ETA_ID##DEM_ID##DEM_DAT##DEM_DAT_ENVOI##ETA_LIB_LONG","Naissance##2##151853##29/10/2012 00:00:00##30/10/2012 00:00:00##Demande enregistrée##"]}
		
		// lecture de la valeur de d, soit la seule valeur du json
		var string1 = (obj.d).toString();
		
		// lecture des valeurs en scindant la chaine près la ,
		var splitted1 = string1.split(',');
	
		// si le json splitted1[1] contient une reponse
		if (jQuery.isEmptyObject(splitted1[1])==false)
		{

			// lecture des valeurs en scindant la chaine valeurs après les ##
			var splitted2 = splitted1[1].split('##');

			// lecture des champs du json
			var sTDE_LIB = splitted2[0];
			var sETA_ID = splitted2[1];
			var sDEM_ID = splitted2[2];
			var sDEM_DAT = splitted2[3];
			var sDEM_DAT_ENVOI = splitted2[4];
			var sETA_LIB_LONG = splitted2[5];		
		

			// afichage temporaire du resultat
			//alert(sETA_LIB_LONG);

			// cacher le loader
			$("#loader_SuiviDemandenaissance").hide();
			// construire le div reponse
			var ChaineReponse;
			// choisir la couleur
			switch (sETA_ID) 
			{ 
				case '0': 
					ChaineReponse = '<li data-role="list-divider">Demande enregistrée ' + sDEM_DAT + '</li><li>Demande en cours de traitement</li><li>Acte envoyé ou Demande non recevable</li>';
					break; 
				case '1': 
					ChaineReponse = '<li>Demande enregistrée</li><li data-role="list-divider">Demande en cours de traitement</li><li>Acte envoyé ou Demande non recevable</li>';
					break; 
				default: 	// cas 2 et 3 en fait
					ChaineReponse = '<li>Demande enregistrée</li><li>Demande en cours de traitement</li><li data-role="list-divider">Acte envoyé ou Demande non recevable</li>';
					break; 
			}
			$('#ulreponse_SuiviDemandenaissance').html(ChaineReponse);
			$('#ulreponse_SuiviDemandenaissance').listview('refresh');		
			// afficher le div reponse
			$("#reponse_SuiviDemandenaissance").popup("open");	
		
			// afficher le bouton Fermer
			$("#Fin_SuiviDemandenaissance").style="display:block";
			// cacher le bouton Envoyer
			$("#Envoyer_SuiviDemandenaissance").style="display:none";	
		}
		else
		{
			AffichePopupSuiviDemandenaissance('Numero de suivi inconnu',true);
			$("#loader_SuiviDemandenaissance").hide();
		}
	}
*/
	return false;
}

function AffichePopupSuiviDemandenaissance(MonTexte,BlErreur)
{
	$('#popup-SuiviDemandenaissance-texte').empty();
	$('#popup-SuiviDemandenaissance-texte').append(MonTexte);
	// adapter le lien en fonction du resultat de l'action
	if (BlErreur == true)
	{
		$("#href-popup-SuiviDemandenaissance").attr("href","#demarches-SuiviDemandenaissance");
	}
	else
	{
		$("#href-popup-SuiviDemandenaissance").attr("href","#demarches-etatCivil-info");
	}
	$('#popup-SuiviDemandenaissance').popup("open");
}


function RetourDemarchesSuiviDemandenaissance()
{
	$(location).attr("href", "#demarches-etatCivil-info");
}
				 
function loadSettingsSuiviDemandenaissance()
{
	//on réinitialise tout au rechargement
	$('#numero_SuiviDemandenaissance').val("");
	// cacher le div reponse
	$('#libellereponse_SuiviDemandenaissance1').style="background:white";
	$('#libellereponse_SuiviDemandenaissance2').style="background:white";
	$('#libellereponse_SuiviDemandenaissance3').style="background:white";
	$('#libellereponse_SuiviDemandenaissance1').val("");
	$("#reponse_SuiviDemandenaissance").style="display:none";
	// cacher le bouton Fermer
	$("#Fin_SuiviDemandenaissance").style="display:none";
	// afficher le bouton Envoyer
	$("#btn_envoyer_SuiviDemandenaissance").attr("disabled","");
	$("#loader_SuiviDemandenaissance").hide();
	
	//ON MASQUE COULEUR FOND ROUGE DES CHAMPS
	$(":input[data-id=SuiviDemandenaissance]").each(function()
	{
		$(this).removeClass("field_error");
		$("#l_"+$(this).attr("name")).removeClass("label_error");		
	});
	
}


function ExecuteRequeteSuiviDemandenaissance()
{


	var snumero_SuiviDemandenaissance=(localStorage.numero_SuiviDemandenaissance);
	var sql ="SELECT EC_T_TYPEDEMANDE_TDE.TDE_LIB, EC_T_DEMANDE_DEM.ETA_ID, EC_T_DEMANDE_DEM.DEM_ID, EC_T_DEMANDE_DEM.DEM_DAT, EC_T_DEMANDE_DEM.DEM_DAT_ENVOI, EC_T_ETAT_ETA.ETA_LIB_LONG ";
	sql = sql + "FROM EC_T_DEMANDE_DEM INNER JOIN EC_T_TYPEDEMANDE_TDE ON EC_T_DEMANDE_DEM.TDE_ID = EC_T_TYPEDEMANDE_TDE.TDE_ID INNER JOIN EC_T_ETAT_ETA ON EC_T_DEMANDE_DEM.ETA_ID = EC_T_ETAT_ETA.ETA_ID  "
	sql = sql + "WHERE (EC_T_DEMANDE_DEM.TDE_ID = 1 AND EC_T_DEMANDE_DEM.DEM_ID =" + snumero_SuiviDemandenaissance + ")";	 
	
	var reponse;
	var jsondata;
	if (DEBUG==false) 
	{
		jsondata= "{'NomBdd':'Extranet','Password':'Extranet$','Requete':'";
	}
	else
	{
		jsondata= "{'NomBdd':'ExtranetDev','Password':'ExtranetDev$','Requete':'";
	}
 	jsondata= jsondata + escape(sql) + "'}";
	
	$.ajax
	(
		{
			type: "POST",
			url: "http://extranet.ville-clermont-ferrand.fr:8084/service.asmx/GetDataset_ParametersEncodeAjax",
			contentType: "application/json; charset=utf-8",
			//dataType: "text",		// pour visualiser la structure de l'objet
			dataType: "json",		// pour lecture json de l'objet
			data: jsondata,
			async: false,
			timeout: 20000,
			success: function(data, textStatus, jqXHR)
			{
			
				//alert('success');
				// la reponse est l'objet json contenant les champs reponse
				reponse = data;
				
				// transformer l'objet jsn en text
				var string0 = JSON.stringify(data);
	
				// decomposition du json
				var obj = $.parseJSON(string0);
				// cela donne :
				//{"d":["TDE_LIB##ETA_ID##DEM_ID##DEM_DAT##DEM_DAT_ENVOI##ETA_LIB_LONG","Naissance##2##151853##29/10/2012 00:00:00##30/10/2012 00:00:00##Demande enregistrée##"]}
		
				// lecture de la valeur de d, soit la seule valeur du json
				var string1 = (obj.d).toString();
		
				// lecture des valeurs en scindant la chaine près la ,
				var splitted1 = string1.split(',');
	
				// si le json splitted1[1] contient une reponse
				if (jQuery.isEmptyObject(splitted1[1])==false)
				{

					// lecture des valeurs en scindant la chaine valeurs après les ##
					var splitted2 = splitted1[1].split('##');

					// lecture des champs du json
					var sTDE_LIB = splitted2[0];
					var sETA_ID = splitted2[1];
					var sDEM_ID = splitted2[2];
					var sDEM_DAT = splitted2[3];
					var sDEM_DAT_ENVOI = splitted2[4];
					var sETA_LIB_LONG = splitted2[5];		
		

					// afichage temporaire du resultat
					//alert(sETA_LIB_LONG);

					// cacher le loader
					$("#loader_SuiviDemandenaissance").hide();
					// construire le div reponse
					var ChaineReponse;
					// choisir la couleur
					switch (sETA_ID) 
					{ 
						case '0': 
							ChaineReponse = '<li data-role="list-divider">Demande enregistrée ' + sDEM_DAT + '</li><li>Demande en cours de traitement</li><li>Acte envoyé ou Demande non recevable</li>';
							break; 
						case '1': 
							ChaineReponse = '<li>Demande enregistrée</li><li data-role="list-divider">Demande en cours de traitement</li><li>Acte envoyé ou Demande non recevable</li>';
							break; 
						default: 	// cas 2 et 3 en fait
							ChaineReponse = '<li>Demande enregistrée</li><li>Demande en cours de traitement</li><li data-role="list-divider">Acte envoyé ou Demande non recevable</li>';
							break; 
					}
					$('#ulreponse_SuiviDemandenaissance').html(ChaineReponse);
					$('#ulreponse_SuiviDemandenaissance').listview('refresh');		
					// afficher le div reponse
					$("#reponse_SuiviDemandenaissance").popup("open");	
		
					// afficher le bouton Fermer
					$("#Fin_SuiviDemandenaissance").style="display:block";
					// cacher le bouton Envoyer
					$("#Envoyer_SuiviDemandenaissance").style="display:none";	
				}
				else
				{
					AffichePopupSuiviDemandenaissance('Numero de suivi inconnu',true);
				$("#loader_SuiviDemandenaissance").hide();
				}
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				//alert('error ' + textStatus + ' ' + errorThrown);
				reponse = null;
				$("#btn_envoyer_SuiviDemandenaissance").attr("disabled","");
				// cacher le loader
				$("#loader_SuiviDemandenaissance").hide();
				if (textStatus=="timeout") {
					AffichePopupSuiviDemandenaissance("Réseau insuffisant, veuillez réitérer votre demande ultérieurement",true);
				}
				else
				{
					AffichePopupSuiviDemandenaissance("Suite à un problème technique, veuillez réitérer votre demande ultérieurement",true);
				}
			},
			complete: function()
			{
				//$("#loader_SuiviDemandenaissance").hide();
				return reponse;
			}
		}
	);
	return reponse;
}




/************************************************************************
* FONCTIONS FORMULAIRE DEMANDE MARIAGE WEB SERVICE
************************************************************************/
						 
						 
function check_formular_Demandemariage()
{
	var email = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/; //Adresses Mail
	//var formatDate = /^(\d{1,2}\/){2}\d{4}$/;
	var formatDate = /^([012]\d|30|31)\/([01]\d)\/\d{1,4}$/;
	var trigger = true;
	$(":input[data-id=Demandemariage]").each(function()
	{
		var valeur = $(this).val();
		var type = $(this).attr("rel");
		var rev = $(this).attr("rev");
		var nom = $(this).attr("name");


		//CAS D'UNE COMBO
		if(rev=="select")
		{			
			var valeur=$("#"+nom+" option:selected").val(); 			
		}
		
		if(type == "obligatoire")
		{
			if(valeur == '')
			{
				alerte(nom);
				trigger = false;
			}
			
			if(!valeur.match(email) && rev == 'email')
			{
				alerte(nom);
				trigger = false;
			}
			
			if(!valeur.match(formatDate) && rev == 'formatDate')
			{
				alerte(nom);
				trigger = false;
			}
		}
	});


	if(trigger == true)
	{
		$("#loader_Demandemariage").show(function()
		{
			$("#btn_envoyer_Demandemariage").attr("disabled","disabled");
			envoiDemandemariage();
		});
	}
	else
	{
		$("#btn_envoyer_Demandemariage").attr("disabled","");
		AffichePopupDemandemariage("Les champs en rouge sont vides ou incorrects. Merci de corriger ce(s) erreur(s) avant de valider le formulaire.",true);
	}

	return trigger;
						 
}

function AffichePopupDemandemariage(MonTexte,BlErreur)
{
	$('#popup-Demandemariage-texte').empty();
	$('#popup-Demandemariage-texte').append(MonTexte);
	// adapter le lien en fonction du resultat de l'action
	if (BlErreur == true)
	{
		$("#href-popup-Demandemariage").attr("href","#demarches-Demandemariage");
	}
	else
	{
		$("#href-popup-Demandemariage").attr("href","#demarches-etatCivil-info");
	}
	$('#popup-Demandemariage').popup("open");
}



function RetourDemarchesDemandemariage()
{
	$(location).attr("href", "#demarches-etatCivil-info");
}

						 
function envoiDemandemariage()
{

	// enregistrement de la saisie
	localStorage.nom_Demandemariage = $('#nom_Demandemariage').val();
	localStorage.prenom_Demandemariage = $('#prenom_Demandemariage').val();
	localStorage.Naissance_Demandemariage = $('#Naissance_Demandemariage').val();
	localStorage.ville_Demandemariage = $('#ville_Demandemariage').val();
	localStorage.Pays_Demandemariage = $('#Pays_Demandemariage').val();
	localStorage.NomPere_Demandemariage = $('#NomPere_Demandemariage').val();
	localStorage.PrenomPere_Demandemariage = $('#PrenomPere_Demandemariage').val();
	localStorage.NomMere_Demandemariage = $('#NomMere_Demandemariage').val();
	localStorage.PrenomMere_Demandemariage = $('#PrenomMere_Demandemariage').val();
	localStorage.NomEpoux_Demandemariage = $('#NomEpoux_Demandemariage').val();
	localStorage.PrenomEpoux_Demandemariage = $('#PrenomEpoux_Demandemariage').val();
	localStorage.nomPrenomPere_Demandemariage = $('#nomPrenomPere_Demandemariage').val();
	localStorage.nomPrenomMere_Demandemariage = $('#nomPrenomMere_Demandemariage').val();
	localStorage.date_mariage = $('#date_mariage').val();
	localStorage.lieu_mariage = $('#lieu_mariage').val();
//	localStorage.plutilingue_Demandemariage = $('input[type=radio][name=plutilingue_Demandemariage]:checked').attr('value');
	localStorage.plutilingue_Demandemariage = $('#plutilingue_Demandemariage').val();
	localStorage.referenceActe_Demandemariage = $('#referenceActe_Demandemariage').val();
	localStorage.TypeDemandeur_Demandemariage = $('#TypeDemandeur_Demandemariage').val();
	localStorage.Exemplaire_Demandemariage = $('#Exemplaire_Demandemariage').val();
	localStorage.civiliteDestinataire_Demandemariage = $('#civiliteDestinataire_Demandemariage').val();
	localStorage.nomDestinataire_Demandemariage = $('#nomDestinataire_Demandemariage').val();
	localStorage.prenomDestinataire_Demandemariage = $('#prenomDestinataire_Demandemariage').val();
	localStorage.adresseDestinataire_Demandemariage = $('#adresseDestinataire_Demandemariage').val();
	localStorage.ComplementadresseDestinataire_Demandemariage = $('#ComplementadresseDestinataire_Demandemariage').val();
	localStorage.cpDestinataire_Demandemariage = $('#cpDestinataire_Demandemariage').val();
	localStorage.villeDestinataire_Demandemariage = $('#villeDestinataire_Demandemariage').val();
	localStorage.PaysDestinataire_Demandemariage = $('#PaysDestinataire_Demandemariage').val();
	localStorage.telDestinataire_Demandemariage = $('#telDestinataire_Demandemariage').val();
	localStorage.emailDestinataire_Demandemariage = $('#emailDestinataire_Demandemariage').val();
	
	// ecrire dans la bdd
	var MonResult = ExecuteRequeteDemandemariage();
	//alert(MonResult);
/*
	if ((!MonResult) || (MonResult==false))
	{
		// effacer le loader
		$("#loader_Demandemariage").hide();
		$("#btn_envoyer_Demandemariage").attr("disabled","");
		AffichePopupDemandemariage("Suite à un problème technique, veuillez réitérer votre demande ultérieurement",true);
	}
	else
	{
		var sURLTELEPRO = "http://www.clermont-ferrand.fr/modules/telepro/mail.php?Destinataire=" + encodeURIComponent(localStorage.emailDestinataire_Demandemariage) + "&Id="+localStorage.nbLastID;
		//alert(sURLTELEPRO);
		// envoyer le mail de confirmation		
		EnvoiMailDistant(sURLTELEPRO);
		// reinitialiser les champs
		loadSettingsDemandemariage();
		// effacer le loader
		$("#loader_Demandemariage").hide();
		AffichePopupDemandemariage("Votre demande sera traitée dans les plus brefs délais.\n\nLe numéro de suivi de votre demande est le " + localStorage.nbLastID + ".\n\nMerci.",false);
	}
*/
	return false;
}






					 
function loadSettingsDemandemariage()
{
	//on réinitialise tout au rechargement
	$('#nom_Demandemariage').val("");
	$('#prenom_Demandemariage').val("");
	$('#Naissance_Demandemariage').val("");
	$('#ville_Demandemariage').val("");
	$('#Pays_Demandemariage').val("");
	$('#NomPere_Demandemariage').val("");
	$('#PrenomPere_Demandemariage').val("");
	$('#NomMere_Demandemariage').val("");
	$('#PrenomMere_Demandemariage').val("");
	$('#nomEpoux_Demandemariage').val("");
	$('#prenomEpoux_Demandemariage').val("");
	$('#nomPrenomPere_Demandemariage').val("");
	$('#nomPrenomMere_Demandemariage').val("");
	$('#date_mariage').val("");
	$('#lieu_mariage').val("");

/*	// ancienne version checkbox	
	//on attribut la valeur checked à l'attribut checked
	$('#plutilingue_Demandemariage_OUI')
		.attr('checked',false)
    	.checkboxradio("refresh");
	$('#plutilingue_Demandemariage_NON')
		.attr('checked',true)
    	.checkboxradio("refresh");
*/
	// raz d'une select
	$("#plutilingue_Demandemariage option:selected").attr("selected",'');// on met simplement la valeur de l'attribut à vide
	$("#plutilingue_Demandemariage option[value='0']").attr("selected","selected");
	$('#plutilingue_Demandemariage').val('0').slider("refresh");
	
	$('#referenceActe_Demandemariage').val("");
	
	// raz d'une select
	$("#TypeDemandeur_Demandemariage option:selected").attr("selected",'');// on met simplement la valeur de l'attribut à vide
	$("#TypeDemandeur_Demandemariage option[value='1']").attr("selected","selected");	
	$("#TypeDemandeur_Demandemariage").selectmenu('refresh');
	
	// raz d'une select
	$("#Exemplaire_Demandemariage option:selected").attr("selected",'');// on met simplement la valeur de l'attribut à vide
	$("#Exemplaire_Demandemariage option[value='1']").attr("selected","selected");	
	$("#Exemplaire_Demandemariage").selectmenu('refresh');
	
	// raz d'une select
	$("#civiliteDestinataire_Demandemariage option:selected").attr("selected",'');// on met simplement la valeur de l'attribut à vide
	$("#civiliteDestinataire_Demandemariage option[value='']").attr("selected","selected");	
	$("#civiliteDestinataire_Demandemariage").selectmenu('refresh');
	
	$('#nomDestinataire_Demandemariage').val("");
	$('#prenomDestinataire_Demandemariage').val("");
	$('#adresseDestinataire_Demandemariage').val("");
	$('#ComplementadresseDestinataire_Demandemariage').val("");
	$('#cpDestinataire_Demandemariage').val("");
	$('#villeDestinataire_Demandemariage').val("");
	$('#PaysDestinataire_Demandemariage').val("");
	$('#telDestinataire_Demandemariage').val("");
	$('#emailDestinataire_Demandemariage').val("");
	
	$("#btn_envoyer_Demandemariage").attr("disabled","");
	
	//ON MASQUE COULEUR FOND ROUGE DES CHAMPS
	$(":input[data-id=Demandemariage]").each(function()
	{
		$(this).removeClass("field_error");
		$("#l_"+$(this).attr("name")).removeClass("label_error");		
	});
	
	
}
						 

function ExecuteRequeteDemandemariage()
{


	var snom_Demandemariage = nettoyageSQL(localStorage.nom_Demandemariage);
	var sprenom_Demandemariage = nettoyageSQL(localStorage.prenom_Demandemariage);
	
	var sNaissance_Demandemariage = localStorage.Naissance_Demandemariage.substr(6,4) + localStorage.Naissance_Demandemariage.substr(3,2) + localStorage.Naissance_Demandemariage.substr(0,2);
	
	//var sNaissance_Demandemariage = localStorage.Naissance_Demandemariage.substr(0,4)+'/'+localStorage.Naissance_Demandemariage.substr(8,2)+'/'+localStorage.Naissance_Demandemariage.substr(5,2);
	var sville_Demandemariage = nettoyageSQL(localStorage.ville_Demandemariage);
	var sPays_Demandemariage = nettoyageSQL (localStorage.Pays_Demandemariage);
	var sNomPere_Demandemariage = nettoyageSQL(localStorage.NomPere_Demandemariage);
	var sPrenomPere_Demandemariage = nettoyageSQL(localStorage.PrenomPere_Demandemariage);
	var sNomMere_Demandemariage = nettoyageSQL(localStorage.NomMere_Demandemariage);
	var sPrenomMere_Demandemariage = nettoyageSQL(localStorage.PrenomMere_Demandemariage);
	var sNomEpoux_Demandemariage = nettoyageSQL(localStorage.NomEpoux_Demandemariage);
	var sPrenomEpoux_Demandemariage = nettoyageSQL(localStorage.PrenomEpoux_Demandemariage);
	var snomPrenomPere_Demandemariage = nettoyageSQL(localStorage.nomPrenomPere_Demandemariage);
	var snomPrenomMere_Demandemariage = nettoyageSQL(localStorage.nomPrenomMere_Demandemariage);
	var sdate_mariage = localStorage.date_mariage.substr(6,4) + localStorage.date_mariage.substr(3,2) + localStorage.date_mariage.substr(0,2);
	//var sdate_mariage = localStorage.date_mariage.substr(0,4)+'/'+localStorage.date_mariage.substr(8,2)+'/'+localStorage.date_mariage.substr(5,2);
	var slieu_mariage = nettoyageSQL(localStorage.lieu_mariage);
	var splutilingue_Demandemariage = (localStorage.plutilingue_Demandemariage);
	var sreferenceActe_Demandemariage = nettoyageSQL(localStorage.referenceActe_Demandemariage);
	var sTypeDemandeur_Demandemariage = (localStorage.TypeDemandeur_Demandemariage);
	var sExemplaire_Demandemariage = (localStorage.Exemplaire_Demandemariage);
	var sciviliteDestinataire_Demandemariage = (localStorage.civiliteDestinataire_Demandemariage);
	var snomDestinataire_Demandemariage = nettoyageSQL(localStorage.nomDestinataire_Demandemariage);
	var sprenomDestinataire_Demandemariage = nettoyageSQL(localStorage.prenomDestinataire_Demandemariage);
	var sadresseDestinataire_Demandemariage = nettoyageSQL(localStorage.adresseDestinataire_Demandemariage);
	var sComplementadresseDestinataire_Demandemariage = nettoyageSQL(localStorage.ComplementadresseDestinataire_Demandemariage);
	var scpDestinataire_Demandemariage = nettoyageSQL(localStorage.cpDestinataire_Demandemariage);
	var svilleDestinataire_Demandemariage = nettoyageSQL(localStorage.villeDestinataire_Demandemariage);
	var sPaysDestinataire_Demandemariage = nettoyageSQL(localStorage.PaysDestinataire_Demandemariage);
	var stelDestinataire_Demandemariage = nettoyageSQL(localStorage.telDestinataire_Demandemariage);
	var semailDestinataire_Demandemariage = nettoyageSQL(localStorage.emailDestinataire_Demandemariage);


	var sql= "insert into EC_T_DEMANDE_DEM (PAR_ID,CIV_ID,TYA_ID,DEM_NOM,DEM_PRENOM,DEM_VILLE,DEM_DAT_NAISSANCE,DEM_NOM_PERE,DEM_PRENOM_PERE,DEM_NOM_MERE,DEM_PRENOM_MERE,DEM_REF,DEM_NB,DEM_MOTIF,DEM_NOM_EPOUX,DEM_PRENOM_EPOUX,DEM_DAT_MARIAGE,DEM_DAT_DECES,DEM_NOM_DEST,DEM_PRENOM_DEST,DEM_ADR_DEST,DEM_ADR_DEST2,DEM_CP_DEST,DEM_VILLE_DEST,DEM_PAYS_DEST,DEM_MEL_DEST,TYD_ID,MOT_ID,TDE_ID,DEM_DAT,ETA_ID,DEM_TEL_DEST,DEM_NOM_PERE_EPOUX,DEM_NOM_MERE_EPOUX,DEM_DAT_ENVOI,DEM_LOGIN,DEM_PLURILINGUE,DEM_ORIGINE) values (";
	sql = sql + sTypeDemandeur_Demandemariage + ",";									//PAR_ID
	sql = sql + sciviliteDestinataire_Demandemariage + ",";								//CIV_ID
	sql = sql + "4,";																	//TYA_ID
	sql = sql + "'" + snom_Demandemariage + "',";										//DEM_NOM
	sql = sql + "'" + sprenom_Demandemariage + "',";									//DEM_PRENOM
	sql = sql + "'" + sville_Demandemariage + "',";										//DEM_VILLE
	sql = sql + "'" + sNaissance_Demandemariage + "',";									//DEM_DAT_NAISSANCE
	sql = sql + "'" + sNomPere_Demandemariage + "',";									//DEM_NOM_PERE
	sql = sql + "'" + sPrenomPere_Demandemariage + "',";								//DEM_PRENOM_PERE
	sql = sql + "'" + sNomMere_Demandemariage + "',";									//DEM_NOM_MERE
	sql = sql + "'" + sPrenomMere_Demandemariage + "',";								//DEM_PRENOM_MERE
	sql = sql + "'" + sreferenceActe_Demandemariage + "',";								//DEM_REF
	sql = sql + sExemplaire_Demandemariage + ",";										//DEM_NB
	sql = sql + "5,";																	//DEM_MOTIF
	sql = sql + "'" + sNomEpoux_Demandemariage + "',";									//DEM_NOM_EPOUX
	sql = sql + "'" + sPrenomEpoux_Demandemariage + "',";								//DEM_PRENOM_EPOUX	
	sql = sql + "'" + sdate_mariage + "',";												//DEM_DAT_MARIAGE
	sql = sql + "null" + ",";															//DEM_DAT_DECES
	sql = sql + "'" + snomDestinataire_Demandemariage + "',";							//DEM_NOM_DEST
	sql = sql + "'" + sprenomDestinataire_Demandemariage + "',";						//DEM_PRENOM_DEST
	sql = sql + "'" + sadresseDestinataire_Demandemariage + "',";						//DEM_ADR_DEST
	sql = sql + "'" + sComplementadresseDestinataire_Demandemariage + "',";				//DEM_ADR_DEST2
	sql = sql + "'" + scpDestinataire_Demandemariage + "',";							//DEM_CP_DEST
	sql = sql + "'" + svilleDestinataire_Demandemariage + "',";							//DEM_VILLE_DEST
	sql = sql + "'" + sPaysDestinataire_Demandemariage + "',";							//DEM_PAYS_DEST
	sql = sql + "'" + semailDestinataire_Demandemariage + "',";							//DEM_MEL_DEST
	sql = sql + sTypeDemandeur_Demandemariage + ",";									//TYD_ID
	sql = sql + "5,";																	//MOT_ID
	sql = sql + "3,";																	//TDE_ID	
	sql = sql + "getdate(),";															//DEM_DAT
	sql = sql + '0' + ",";//0= Enregistré												//ETA_ID
	sql = sql + "'" + stelDestinataire_Demandemariage + "',";							//DEM_TEL_DEST
	sql = sql + "'" + snomPrenomPere_Demandemariage + "',";								//DEM_NOM_PERE_EPOUX
	sql = sql + "'" + snomPrenomMere_Demandemariage + "',";								//DEM_NOM_MERE_EPOUX	
	sql = sql + "null" + ",";															//DEM_DAT_ENVOI
	sql = sql + "null" + ",";															//DEM_LOGIN
	sql = sql + splutilingue_Demandemariage + ",'Mobile')";								//DEM_PLURILINGUE
	
	
	var reponse;
	var jsondata;
	if (DEBUG==false) 
	{
		jsondata= "{'NomBdd':'Extranet','Password':'Extranet$','Requete':'";
	}
	else
	{
		jsondata= "{'NomBdd':'ExtranetDev','Password':'ExtranetDev$','Requete':'";
	}
	var Lastreq = 'SELECT MAX(DEM_ID) FROM EC_T_DEMANDE_DEM';
 	jsondata= jsondata + escape(sql) + "','RequeteLastID':'" + escape(Lastreq) + "'}";
	
	$.ajax
	(
		{
			type: "POST",
			url: "http://extranet.ville-clermont-ferrand.fr:8084/service.asmx/ExecuteNonQueryLastID_ParametersEncodeAjax",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: jsondata,
			timeout: 20000,
			//async: false,
			success: function(data, textStatus, jqXHR)
			{
				reponse = true;
				var string = JSON.stringify(data);
				var obj = $.parseJSON(string);
				localStorage.nbLastID = obj.d;		//{'d':'11675}'
				var sURLTELEPRO = "http://www.clermont-ferrand.fr/modules/telepro/mail.php?Destinataire=" + encodeURIComponent(localStorage.emailDestinataire_Demandemariage) + "&Id="+localStorage.nbLastID;
				//alert(sURLTELEPRO);
				// envoyer le mail de confirmation		
				EnvoiMailDistant(sURLTELEPRO);
				// reinitialiser les champs
				loadSettingsDemandemariage();
				// effacer le loader
				$("#loader_Demandemariage").hide();
				AffichePopupDemandemariage("Votre demande sera traitée dans les plus brefs délais.\n\nLe numéro de suivi de votre demande est le " + localStorage.nbLastID + ".\n\nMerci.",false);
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
	 			reponse = false;
				// effacer le loader
				$("#loader_Demandemariage").hide();
				$("#btn_envoyer_Demandemariage").attr("disabled","");
				if (textStatus=="timeout") {
					AffichePopupDemandemariage("Réseau insuffisant, veuillez réitérer votre demande ultérieurement",true);
				}
				else
				{
					AffichePopupDemandemariage("Suite à un problème technique, veuillez réitérer votre demande ultérieurement",true);
				}
				// alert('error ' + textStatus + ' ' + errorThrown);
			},
			complete: function()
			{
				//$("#loader_Demandemariage").hide();
				return reponse;
			}
		}
	);
	return reponse;
}

/************************************************************************
* FONCTIONS FORMULAIRE SUIVI DEMANDE MARIAGE WEB SERVICE
************************************************************************/

function Fin_SuiviDemandemariage()
{
	// reinitialiser les champs
	loadSettingsSuiviDemandemariage();
	// retour à la page des demarches
	RetourDemarchesSuiviDemandemariage();
}

function RetourDemarchesSuiviDemandemariage()
{
	$(location).attr("href", "#demarches-etatCivil-info");
}

function check_formular_SuiviDemandemariage()
{
	var trigger = true;
	$(":input[data-id=SuiviDemandemariage]").each(function()
	{
		var valeur = $(this).val();
		var type = $(this).attr("rel");
		var rev = $(this).attr("rev");
		var nom = $(this).attr("name");
/*
		console.log("objet="+this);
		console.log("type="+type);
		console.log("rev="+rev);
		console.log("nom="+nom);
		console.log("valeur="+valeur);
		console.log($(this).val().length);
*/
		if(type == "obligatoire")
		{
			if(valeur == '')
			{
				alerte(nom);
				trigger = false;
			}
		}
	});

	if(trigger == true)
	{
		$("#loader_SuiviDemandemariage").show(function()
		{
			$("#btn_envoyer_SuiviDemandemariage").attr("disabled","disabled");
			envoiSuiviDemandemariage();
		});
		
	}
	else
	{
		$("#btn_envoyer_SuiviDemandemariage").attr("disabled","");
		AffichePopupSuiviDemandemariage("Les champs en rouge sont vides ou incorrects. Merci de corriger ce(s) erreur(s) avant de valider le formulaire.",true);
	}
	return trigger;
}

function AffichePopupSuiviDemandemariage(MonTexte,BlErreur)
{
	$('#popup-SuiviDemandemariage-texte').empty();
	$('#popup-SuiviDemandemariage-texte').append(MonTexte);
	// adapter le lien en fonction du resultat de l'action
	if (BlErreur == true)
	{
		$("#href-popup-SuiviDemandemariage").attr("href","#demarches-SuiviDemandemariage");
	}
	else
	{
		$("#href-popup-SuiviDemandemariage").attr("href","#demarches-etatCivil-info");
	}
	$('#popup-SuiviDemandemariage').popup("open");
}

						 
function envoiSuiviDemandemariage()
{
	// enregistrement de la saisie
	localStorage.numero_SuiviDemandemariage = $('#numero_SuiviDemandemariage').val();
	
	// lire etat dans la bdd
	var MonResult = ExecuteRequeteSuiviDemandemariage();
/*	
	if ((!MonResult) || (MonResult==false))
	{
		$("#btn_envoyer_SuiviDemandemariage").attr("disabled","");
		AffichePopupSuiviDemandemariage("Suite à un problème technique, veuillez réitérer votre demande ultérieurement",true);
	}
	else
	{
		// transformer l'objet jsn en text
		var string0 = JSON.stringify(MonResult);
	
		// decomposition du json
		var obj = $.parseJSON(string0);
		// cela donne :
		//{"d":["TDE_LIB##ETA_ID##DEM_ID##DEM_DAT##DEM_DAT_ENVOI##ETA_LIB_LONG","Naissance##2##151853##29/10/2012 00:00:00##30/10/2012 00:00:00##Demande enregistrée##"]}
		
		// lecture de la valeur de d, soit la seule valeur du json
		var string1 = (obj.d).toString();
		
		// lecture des valeurs en scindant la chaine près la ,
		var splitted1 = string1.split(',');
	
		// si le json splitted1[1] contient une reponse
		if (jQuery.isEmptyObject(splitted1[1])==false)
		{
	
			// lecture des valeurs en scindant la chaine valeurs après les ##
			var splitted2 = splitted1[1].split('##');

			// lecture des champs du json
			var sTDE_LIB = splitted2[0];
			var sETA_ID = splitted2[1];
			var sDEM_ID = splitted2[2];
			var sDEM_DAT = splitted2[3];
			var sDEM_DAT_ENVOI = splitted2[4];
			var sETA_LIB_LONG = splitted2[5];		
		

			// afichage temporaire du resultat
			//alert(sETA_LIB_LONG + ' ' + sDEM_DAT_ENVOI);

			// cacher le loader
			$("#loader_SuiviDemandemariage").hide();
			// construire le div reponse
			var ChaineReponse;
			// choisir la couleur
			switch (sETA_ID) 
			{ 
				case '0': 
					ChaineReponse = '<li data-role="list-divider">Demande enregistrée ' + sDEM_DAT + '</li><li>Demande en cours de traitement</li><li>Acte envoyé ou Demande non recevable</li>';
					break; 
				case '1': 
					ChaineReponse = '<li>Demande enregistrée</li><li data-role="list-divider">Demande en cours de traitement</li><li>Acte envoyé ou Demande non recevable</li>';
					break; 
				default: 	// cas 2 et 3 en fait
					ChaineReponse = '<li>Demande enregistrée</li><li>Demande en cours de traitement</li><li data-role="list-divider">Acte envoyé ou Demande non recevable</li>';
					break; 
			}
			//alert(ChaineReponse);
			$('#ulreponse_SuiviDemandemariage').html(ChaineReponse);
			$('#ulreponse_SuiviDemandemariage').listview('refresh');		
			// afficher le div reponse
			$("#reponse_SuiviDemandemariage").popup("open");	
		
			// afficher le bouton Fermer
			$("#Fin_SuiviDemandemariage").style="display:block";
			// cacher le bouton Envoyer
			$("#btn_envoyer_SuiviDemandemariage").style="display:none";	
		}
		else
		{
			AffichePopupSuiviDemandemariage("Numero de suivi inconnu",true);
		}
	}
	// effacer le loader
	$("#loader_SuiviDemandemariage").hide();
	$("#btn_envoyer_SuiviDemandemariage").attr("disabled","");
*/	
	return false;
}


				 				 
function loadSettingsSuiviDemandemariage()
{
	//on réinitialise tout au rechargement
	$('#numero_SuiviDemandemariage').val("");
	// cacher le div reponse
	$('#libellereponse_SuiviDemandemariage1').style="background:white";
	$('#libellereponse_SuiviDemandemariage2').style="background:white";
	$('#libellereponse_SuiviDemandemariage3').style="background:white";
	$('#libellereponse_SuiviDemandemariage1').val("");
	// cacher le bouton Fermer
	$("#Fin_SuiviDemandemariage").style="display:none";
	// afficher le bouton Envoyer
	$("#btn_envoyer_SuiviDemandemariage").style="display:block";
	$("#btn_envoyer_SuiviDemandemariage").attr("disabled","");
	
	//ON MASQUE COULEUR FOND ROUGE DES CHAMPS
	$(":input[data-id=SuiviDemandemariage]").each(function()
	{
		$(this).removeClass("field_error");
		$("#l_"+$(this).attr("name")).removeClass("label_error");		
	});
	
}


function ExecuteRequeteSuiviDemandemariage()
{
	var snumero_SuiviDemandemariage=(localStorage.numero_SuiviDemandemariage);
	var sql ="SELECT EC_T_TYPEDEMANDE_TDE.TDE_LIB, EC_T_DEMANDE_DEM.ETA_ID, EC_T_DEMANDE_DEM.DEM_ID, EC_T_DEMANDE_DEM.DEM_DAT, EC_T_DEMANDE_DEM.DEM_DAT_ENVOI, EC_T_ETAT_ETA.ETA_LIB_LONG ";
	sql = sql + "FROM EC_T_DEMANDE_DEM INNER JOIN EC_T_TYPEDEMANDE_TDE ON EC_T_DEMANDE_DEM.TDE_ID = EC_T_TYPEDEMANDE_TDE.TDE_ID INNER JOIN EC_T_ETAT_ETA ON EC_T_DEMANDE_DEM.ETA_ID = EC_T_ETAT_ETA.ETA_ID  "
	sql = sql + "WHERE ( EC_T_DEMANDE_DEM.TDE_ID = 3 AND EC_T_DEMANDE_DEM.DEM_ID =" + snumero_SuiviDemandemariage + ")";

	var reponse;
	var jsondata;
	if (DEBUG==false) 
	{
		jsondata= "{'NomBdd':'Extranet','Password':'Extranet$','Requete':'";
	}
	else
	{
		jsondata= "{'NomBdd':'ExtranetDev','Password':'ExtranetDev$','Requete':'";
	}

 	jsondata= jsondata + escape(sql) + "'}";
	
	$.ajax
	(
		{
			type: "POST",
			url: "http://extranet.ville-clermont-ferrand.fr:8084/service.asmx/GetDataset_ParametersEncodeAjax",
			contentType: "application/json; charset=utf-8",
			//dataType: "text",		// pour visualiser la structure de l'objet
			dataType: "json",		// pour lecture json de l'objet
			data: jsondata,
			async: false,
			timeout: 20000,
			success: function(data, textStatus, jqXHR)
			{
				// transformer l'objet jsn en text
				var string0 = JSON.stringify(data);
	
				// decomposition du json
				var obj = $.parseJSON(string0);
				// cela donne :
				//{"d":["TDE_LIB##ETA_ID##DEM_ID##DEM_DAT##DEM_DAT_ENVOI##ETA_LIB_LONG","Naissance##2##151853##29/10/2012 00:00:00##30/10/2012 00:00:00##Demande enregistrée##"]}
		
				// lecture de la valeur de d, soit la seule valeur du json
				var string1 = (obj.d).toString();
		
				// lecture des valeurs en scindant la chaine près la ,
				var splitted1 = string1.split(',');
	
				// si le json splitted1[1] contient une reponse
				if (jQuery.isEmptyObject(splitted1[1])==false)
				{
	
					// lecture des valeurs en scindant la chaine valeurs après les ##
					var splitted2 = splitted1[1].split('##');

					// lecture des champs du json
					var sTDE_LIB = splitted2[0];
					var sETA_ID = splitted2[1];
					var sDEM_ID = splitted2[2];
					var sDEM_DAT = splitted2[3];
					var sDEM_DAT_ENVOI = splitted2[4];
					var sETA_LIB_LONG = splitted2[5];		
		

					// afichage temporaire du resultat
					//alert(sETA_LIB_LONG + ' ' + sDEM_DAT_ENVOI);

					// cacher le loader
					$("#loader_SuiviDemandemariage").hide();
					// construire le div reponse
					var ChaineReponse;
					// choisir la couleur
					switch (sETA_ID) 
					{ 
						case '0': 
							ChaineReponse = '<li data-role="list-divider">Demande enregistrée ' + sDEM_DAT + '</li><li>Demande en cours de traitement</li><li>Acte envoyé ou Demande non recevable</li>';
							break; 
						case '1': 
							ChaineReponse = '<li>Demande enregistrée</li><li data-role="list-divider">Demande en cours de traitement</li><li>Acte envoyé ou Demande non recevable</li>';
							break; 
						default: 	// cas 2 et 3 en fait
							ChaineReponse = '<li>Demande enregistrée</li><li>Demande en cours de traitement</li><li data-role="list-divider">Acte envoyé ou Demande non recevable</li>';
							break; 
					}
					//alert(ChaineReponse);
					$('#ulreponse_SuiviDemandemariage').html(ChaineReponse);
					$('#ulreponse_SuiviDemandemariage').listview('refresh');		
					// afficher le div reponse
					$("#reponse_SuiviDemandemariage").popup("open");	
				
					// afficher le bouton Fermer
					$("#Fin_SuiviDemandemariage").style="display:block";
					// cacher le bouton Envoyer
					$("#btn_envoyer_SuiviDemandemariage").style="display:none";	
				}
				else
				{
					AffichePopupSuiviDemandemariage("Numero de suivi inconnu",true);
				$("#loader_SuiviDemandemariage").hide();
				}
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				reponse = null;
				$("#btn_envoyer_SuiviDemandemariage").attr("disabled","");
				// cacher le loader
				$("#loader_SuiviDemandemariage").hide();
				if (textStatus=="timeout") {
					AffichePopupSuiviDemandemariage("Réseau insuffisant, veuillez réitérer votre demande ultérieurement",true);
				}
				else
				{
					AffichePopupSuiviDemandemariage("Suite à un problème technique, veuillez réitérer votre demande ultérieurement",true);
				}
			},
			complete: function()
			{
				return reponse;
			}
		}
	);
	return reponse;
}


						 
/************************************************************************
* 									LOADER
 ************************************************************************/						 


function annuleRequete()
{
	if(jqXHR.readyState != 4)
	{
		AffichePopupContact("Suite à un problème technique, veuillez réitérer votre demande ultérieurement", true);
		jqXHR.abort();
	}	
}

function EnvoiMailDistant(sUrl)
{

	//alert(sUrl);
	$.ajax(
	{
		url: sUrl+"&Debug="+DEBUG,
		crossDomain: true,
//		type: "GET",																// par defaut
//		contentType: "'application/x-www-form-urlencoded; charset=UTF-8'",			// par defaut
//		async: true,																// par defaut
		success: function(data, textStatus, jqXHR)
		{
			console.log(data);
			//alert('Votre mail est parti');
		},	
		error: function(xhr, status, error)
		{
			alert("Problème sur l envoi de votre mail : " + xhr.responseText+" ("+status+" - "+error+")");
		},
		
	});
}

			
			
			
function getXDomainRequest() {
        var xdr = null;
        
        if (window.XDomainRequest) {
                xdr = new XDomainRequest(); 
        } else if (window.XMLHttpRequest) {
                xdr = new XMLHttpRequest(); 
        } else {
                alert("Votre navigateur ne gère pas l'AJAX cross-domain !");
        }
        
        return xdr;        
}			
			
						 
function getXhr()
{
	var xhr = null; 
	if(window.XMLHttpRequest) // Firefox et autres
		xhr = new XMLHttpRequest(); 
	else if(window.ActiveXObject)
	{ // Internet Explorer 
		try
		{
			xhr = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	else
	{ // XMLHttpRequest non supporté par le navigateur 
		alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
		xhr = false; 
	} 
	return xhr
}
				 
				 
/**
  * Envoie des données à l'aide d'XmlHttpRequest?
  * @param string methode d'envoi ['GET'|'POST']
  * @param string url
  * @param string données à envoyer sous la forme var1=value1&var2=value2...
  */
 function sendData(method, url, data)
 {
 	var xmlhttp = getHTTPObject();

	if (!xmlhttp)
    {
		return false;
    }

    if(method == "GET")
	{
		if(data == 'null')
		{
			xmlhttp.open("GET", url, true); //ouverture asynchrone
		}
		else
		{
			xmlhttp.open("GET", url+"?"+data, true);
		}
		xmlhttp.send(null);
	}
    else if(method == "POST")
	{
		xmlhttp.open("POST", url, true); //ouverture asynchrone
		xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlhttp.send(data);
	}
	return true;
}				 
						 
						 
						 /************************************************************************
						  * FONCTIONS NON UTILISE GEOLOCALISATION
						  ************************************************************************/
						 
						 function geolocalisation()
						 {
						 //on réinitialise tout au rechargement
						 //$('#nom').val("");
						 try
						 {
						 navigator.geolocation.getCurrentPosition(
																  function(position)
																  {
																  var latitude = position.coords.latitude;
																  var longitude = position.coords.longitude;
																  insertEntry(latitude,longitude);
																  },
																  function()
																  {
																  insertEntry();
																  }
																  );
						 }
						 catch(e)
						 {
						 insertEntry();
						 }
						 }
						 
						 
						 function insertEntry(latitude,longitude)
						 {
						 //$('#latitude').html('Latitude: ' + latitude);
						 //$('#longitude').html('Longitude: ' + longitude);
						 localStorage.Latitude=latitude;
						 localStorage.Longitude=longitude;
						 }
						 
						 
						 function loader()
						 {
						 var state = document.readyState;
						 if (state == 'loaded' || state == 'complete')
						 {
						 run();
						 }
						 else
						 {
						 
						 if (navigator.userAgent.indexOf('Browzr') > -1)
						 {
						 setTimeout(run, 250);
						 }
						 else
						 {
						 document.addEventListener('deviceready',run,false);
						 }
						 }
						 }
                         
                         
						 function run()
						 {
						 var win = function(position)
						 {
						 // Grab coordinates object from the Position object passed into success callback.
						 var coords = position.coords;
						 // Call for static google maps data - make sure you use your own Google Maps API key!
						 var url = "http://maps.google.com/maps/api/staticmap?center=" + coords.latitude + "," + coords.longitude + "&zoom=13&size=320x480&maptype=roadmap&key=MyGoogleMapsAPIKey&sensor=true";
						 document.getElementById('map').setAttribute('src',url);
						 };
						 var fail = function(e) {
						 alert('Can\'t retrieve position.\nError: ' + e);
						 };
						 navigator.geolocation.getCurrentPosition(win, fail);
						 }
						 
						 
						 
						 
						 
						 
						 
						 
						 
						 
/************************************************************************
* FONCTIONS PHONEGAP CAMERA
************************************************************************/
						 
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
						 
// Wait for Cordova to connect with the device
document.addEventListener("deviceready",onDeviceReady,false);
						 
                         
                         
                         
// Cordova is ready to be used!
function onDeviceReady()
{
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
}
						 
// Called when a photo is successfully retrieved
function onPhotoDataSuccess(imageData)
{
	// Uncomment to view the base64 encoded image data
	// console.log(imageData);
						 
	// Get image handle
	 var smallImage = document.getElementById('smallImage');
						 
	// Unhide image elements
	smallImage.style.display = 'block';
						 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	smallImage.src = "data:image/jpeg;base64," + imageData;
	$('#hiddenimage').val(imageData);
                         
	//console.log(imageData+"/////imageData");
                         
						 
	// On affiche le boutton de suppression
	$('#button_deletePhoto').show();
}
						 
// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI)
{
	// Uncomment to view the image file URI
	//console.log(imageURI+"/////imageURI");
						 
	// Get image handle
	var largeImage = document.getElementById('smallImage');
						 
	// Unhide image elements
	largeImage.style.display = 'block';
						 
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	largeImage.src = imageURI;
	$('#hiddenimage').val(imageURI);
	// On affiche le boutton de suppression
	$('#button_deletePhoto').Show();
}
						 
// A button will call this function
function capturePhoto()
{
	// Take picture using device camera and retrieve image as base64-encoded string
//	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
//	destinationType: destinationType.DATA_URL });
	navigator.camera.getPicture(onPhotoDataSuccess, onFail,
	{
		quality: 35,
		destinationType: destinationType.DATA_URL,
		targetWidth: 1024,
		targetHeight: 1024
	});
}
						 
					
						 
// A button will call this function
function getPhoto(source)
{
	//	Retrieve image file location from specified source
	//	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
	//	destinationType: destinationType.FILE_URI,
	//	sourceType: source });
//	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL, sourceType: source });
	navigator.camera.getPicture(onPhotoDataSuccess, onFail,
	{
		quality: 35, 
		destinationType: destinationType.DATA_URL, 
		sourceType: source,
		targetWidth: 1024,
		targetHeight: 1024
	 });	
}
						
// Called if something bad happens.
function onFail(message)
{
	//alert('Failed because: ' + message);
}
						 
// A button will call this function
function capturePhotoEdit()
{
	// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	//navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true, destinationType: destinationType.DATA_URL });
	navigator.camera.getPicture(onPhotoDataSuccess, onFail,
	{
		quality: 20, 
		allowEdit: true,
		destinationType: destinationType.DATA_URL,
		targetWidth: 1024,
		targetHeight: 1024
	});													 
}
/*
function Effacer()
{
	document.form1.nom_proxi.value="";
	document.form1.prenom_proxi.value="";
	document.form1.adresse_proxi.value="";
	document.form1.cp_proxi.value="";
	document.form1.ville_proxi.value="";
	document.form1.tel_proxi.value="";
	document.form1.email_proxi.value="";
	document.form1.lieu_proxi.value="";
	document.form1.description_proxi.value="";
}
*/						 
						 
						 
function deletePhoto()
{
	$('#smallImage').attr('src', '');
	$('#smallImage').hide();
	$('#button_deletePhoto').hide();
}
						 
						 
		
						 
										 



function recupInfoParking(reload)
{

	$.ajax(
			{
				type: "POST",
				//url: "http://212.51.186.148:8084/service.asmx/ExecuteNonQuery_ParametersEncodeAjax",
				//url: "http://extranet.ville-clermont-ferrand.fr:8084/service.asmx/ExecuteNonQuery_ParametersEncodeAjax",
				
				url: "http://www.clermont-ferrand.fr/modules/parkings/parkings.php",
				//data: "app_id=12&app=12&appli12champ2="+snom+"&appli12champ3="+semail+"&appli12champ4="+ssujet+"&appli12champ5="+scommentaire+"&debug="+DEBUG,
				timeout: 20000,
				//contentType: "application/json; charset=utf-8",
				//dataType: "json",
				//async: false,
				success: function(data, textStatus, jqXHR)
				{
					if(jqXHR.readyState == 4)
					{
						if(jqXHR.status == 200)
						{
						
							//alert(jqXHR.responseText);
							//console.log(jqXHR.responseText);
							
							// envoyer le mail de confirmation pour debug : inutile car envoyé par envoi_app_mobile.php
							////////////////////////////
							
							
							
							
							
							
							/*var htmlContent="<div class='CSS_Table_Example' style='width:100%;'>";
							htmlContent+="<table><tr><td>Parking</td><td>Disponibilit&eacute;</td><td>Carte</td></tr>";*/
							
							
							
							var tableau_row = jqXHR.responseText.split(";");
							
							var tableau_data = new Array();
							
							for(i=0;i<5;i++)
							{							
								tableau_data[i] = tableau_row[i].split(",");						
							}						
							

							var htmlContent="";
							
							for(i=0;i<tableau_data.length;i++)
							{		
								//alert(tableau_data[i]);
								
								
								htmlContent+="<li><a href='#parking-detail' onClick='initCarteParking("+tableau_data[i][6]+","+tableau_data[i][7]+",\""+tableau_data[i][2]+"\")'>";
								htmlContent+='<p class="li-contenu">';
								htmlContent+='<i class="icon-map-marker"></i> - <span style="font-weight:bold;font-size:16px;">'+tableau_data[i][2]+'</span><br/>';
								htmlContent+='<span>'+tableau_data[i][0]+'</span><br/>';								
								htmlContent+='</p>';
								
								
								htmlContent+='<p class="li-contenu text-right">';													
								if(tableau_data[i][4].trim() == "OUVERT"){
									
									htmlContent+='<i class="icon-ok-sign"></i> ';	
									htmlContent+='<strong style="color:#01B02A;font-size:14px">'+tableau_data[i][4]+'</strong>';	
									htmlContent+='<br />';									
								}
								else if(tableau_data[i][4].trim() == "COMPLET"){
									
									htmlContent+='<i class="icon-ban-circle"></i> ';
									htmlContent+='<strong style="color:red;font-size:14px">'+tableau_data[i][4]+'</strong>';	
									htmlContent+='<br />';																
								}
								else
								{
									htmlContent+='<i class="icon-ok-sign"></i> ';	
									htmlContent+='<strong style="color:#01B02A;font-size:14px">'+tableau_data[i][4]+' place(s) disponible(s)</strong>';	
									htmlContent+='<br />';							
								}
								
								htmlContent+='</p></a></li>';						
												
							}							
							
						
													
							
							
							//REFRESH LISTVIEW
							if(reload == true)
							{								
								$('#listeParking').empty().append(htmlContent).listview('refresh');
								
								//AFFICHAGE DU BANDEAU DANS LE HOME
								$('.bandeauMajParking').css("display","block");
								 
								
								
								//AFFICHAGE DERNIERE MAJ DISPO PARKING
								var myDateP = new Date();
								jourActuel=myDateP.dateFormat('d.m.Y','fr');						
								Min= myDateP.getMinutes();							
								if (Min<10){
									Min = "0"+Min;
								}							
								$('.bandeauMajParking').empty().append("Mise à jour le "+jourActuel+" à "+myDateP.getHours() + ":" + Min);							
								
								
							}
							//CREATE LISTVIEW
							else
							{								
								$('#listeParking').empty().append(htmlContent);
							}
							
							
							
							
							
							
							
							
						}
						else
						{
							//$("#loader_contact").hide();
							//AffichePopupContact("Suite à un problème technique, veuillez réitérer votre demande ultérieurement", true);
						}
					}
				},
				error: function(jqXHR, textStatus, errorThrown)
				{
					
					var htmlContentError = "<div class='alert alert-error'>";
					htmlContentError += "<strong>Attention!</strong> Pour consulter la disponibilit&eacute; des Parkings, veuillez v&eacute;rifier votre connexion Internet.</div>";
					htmlContentError += "</div>";
				   
					
					$('#listeParking').empty().append(htmlContentError);
					
					
					//reponse = false;
					//alert(textStatus + " " + errorThrown );
					//$("#loader_contact").hide();
					//if (textStatus=="timeout") {
					//	AffichePopupContact("Réseau insuffisant, veuillez réitérer votre demande ultérieurement",true);
					//}
					//else
					//{
					//	AffichePopupContact("Suite à un problème technique, veuillez réitérer votre demande ultérieurement",true);
					//}

				},
				complete: function()
				{
					//$("#loader_contact").hide();
					//return reponse;
				}	
			});

}



function initCarteParking(latitude,longitude,titre)
{
	//alert("latitude:"+latitude+"//longitude:"+longitude+"//titre:"+titre);
	
	
	latitudeEnCoursParking = latitude;
	longitudeEnCoursParking = longitude;
	titreEnCoursParking = titre;
	
	$("#mapLocalisationParking").empty();
	$("#bandeauInfoParking").empty();
	
	
	
	
	
	
	
	//create map
	mapParking = new OpenLayers.Map({
		div: "mapLocalisationParking",
		controls: [
			//new OpenLayers.Control.Attribution(),
			new OpenLayers.Control.ScaleLine(),
			new OpenLayers.Control.TouchNavigation({
				dragPanOptions: {
				enableKinetic: true
				}
			}),
			new OpenLayers.Control.Zoom()
		],
		
		center: new OpenLayers.LonLat(742000, 5861000),
		zoom: 3
	});									
										
	var layer_de_baseL =  new OpenLayers.Layer.OSM();
	mapParking.addLayer(layer_de_baseL);
	
	
											
	var epsg4326L = new OpenLayers.Projection("EPSG:4326");
	
	var lieu = new OpenLayers.LonLat(longitude,latitude);	
	var markersL = new OpenLayers.Layer.Markers("Lieu de l'évenement");
	mapParking.addLayer(markersL);
	
	markersL.addMarker(new OpenLayers.Marker(
		lieu.clone().transform(epsg4326L, mapParking.getProjectionObject())));
		centerL = lieu.transform(epsg4326L, mapParking.getProjectionObject());
		mapParking.setCenter(centerL, 17);	
		
		
	//ON INJECTE LE TITRE DE l'EVENEMENT
	$('#bandeauInfoParking').empty().append("<img width='15' height='15' src='img/marker.png'></img><b>"+titre+"</b>");	
	

}

function recentrerMapParking(){

	//var $objetDeclencheur= $(event.target);
	//var idobjet= $objetDeclencheur.attr('id');
		
	//alert($objetDeclencheur)
	//if(typeof (lieuEvenement)=="undefined") lieuEvenement="";
	//if(typeof (latitude)=="undefined") latitude=""; 
	//if(typeof (longitude)=="undefined") longitude=""; 
	//if(typeof (IntituleEvenement)=="undefined") IntituleEvenement=""; 
	

	
	
	if (latitude!="" && longitude!="")
		{
			

			//ON VIDE LA DIV CONTENANT LA MAP LOCALISATION
			$("#mapLocalisationParking").empty();
			//$('#description-parking').empty()
						
			
			// create map
			mapL = new OpenLayers.Map({
				div: "mapLocalisationParking",
				controls: [
					//new OpenLayers.Control.Attribution(),
					new OpenLayers.Control.ScaleLine(),
					new OpenLayers.Control.TouchNavigation({
						dragPanOptions: {
						enableKinetic: true
						}
					}),
					new OpenLayers.Control.Zoom()
				],
				
				center: new OpenLayers.LonLat(742000, 5861000),
				zoom: 3
			});									
												
			var layer_de_baseL =  new OpenLayers.Layer.OSM();
			mapL.addLayer(layer_de_baseL);
			
			
										
			var epsg4326L = new OpenLayers.Projection("EPSG:4326");
			
			var lieu = new OpenLayers.LonLat(longitudeEnCoursParking,latitudeEnCoursParking);	
			var markersL = new OpenLayers.Layer.Markers("Lieu de l'évenement");
			mapL.addLayer(markersL);
		
			markersL.addMarker(new OpenLayers.Marker(
				lieu.clone().transform(epsg4326L, mapL.getProjectionObject())));
				centerL = lieu.transform(epsg4326L, mapL.getProjectionObject());
				mapL.setCenter(centerL, 17);	
				
				
		}
		else
		{
			// $('#localisation').hide();
		}
		
	

}



//////////////////////////
//
// News Feed
// See the "News Feed" section on https://developers.facebook.com/mobile
//
//////////////////////////

//Publish a story to the user's own wall
function publishStory(flag) {
  
	var link;
	var picture;
	var titre;
	var caption;
	var description;
	var vid;
	
	
	//PARTAGE ACTUS
	if(flag=='A')
	{						
		titre=currentDataActus["title"];
		picture=currentDataActus["image"];
		//caption=currentDataActus["chapo"];
		caption="";
		//description=currentDataActus["texte"];
		description="";
		link=currentDataActus["lien"];
	}
		
		
	//PARTAGE VIDEO
	else if(flag=='V')
	{
		
		//var currentid = entry[x];
		vid= entryCourant.id.$t.split(":").slice(-1);
		titre = entryCourant.title.$t;
		//caption = entryCourant.media$group.media$description.$t;
		caption = entryCourant.media$group.media$description.$t;
		picture = entryCourant.media$group.media$thumbnail[0].url;
		description="";
		link='http://www.youtube.com/embed/'+vid+'?rel=0';
	}
		
		
	//PARTAGE EVENEMENT AGENDA
	else if(flag=='E')
	{						
		titre=currentDataCal["lieu"]+"</br>"+currentDataCal["theme"]+" - "+currentDataCal["title"]+"</br>";
		picture=currentDataCal["preview"];
		//caption=currentDataCal["chapo"];
		caption="";
		//description=currentDataCal["texte"];
		description="";
		link=currentDataCal["lien"];
	}
		
	//PARTAGE PUBLI
	else if(flag=='P')
	{						
		titre=currentDataPub["title"];
		picture=currentDataPub["preview"];
		//caption=currentDataPub["chapo"];
		caption="";
		//description=currentDataPub["texte"];
		description="";
		link=currentDataPub["lien"];
	}

  
	titre=unescapeHTML(titre);
	caption=unescapeHTML(caption);
  
  
  FB.ui({
    method: 'feed',
    name: titre,
    caption: caption,
    description: 'Partage Facebook',
    link: link,
    picture: picture,
    actions: [{ name: 'Commencer', link: 'http://www.clermont-ferrand.fr' }],
  }, 
  function(response) {
    console.log('publishStory UI response: ', response);
  });
}

//Publish a story to the user's friend's wall
function publishStoryFriend() {
  randNum = Math.floor ( Math.random() * friendIDs.length ); 

  var friendID = friendIDs[randNum];
  
  console.log('Opening a dialog for friendID: ', friendID);
  
  FB.ui({
    method: 'feed',
    to: friendID,
    name: 'I\'m using the Hackbook web app',
    caption: 'Hackbook for Mobile Web.',
    description: 'Check out Hackbook for Mobile Web to learn how you can make your web apps social using Facebook Platform.',
    link: 'http://apps.facebook.com/mobile-start/',
    picture: 'http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png',
    actions: [{ name: 'Get Started', link: 'http://apps.facebook.com/mobile-start/' }],
    user_message_prompt: 'Tell your friends about building social web apps.'
  }, 
  function(response) {
    console.log('publishStoryFriend UI response: ', response);
  });
}

//////////////////////////
//
// UI assist functions
//
//////////////////////////

//show a loading screen when launched, until we get the user's session back
setAction("Loading Hackbook", true);

//Swaps the pages out when the user taps on a choice
function openPage(pageName, ignoreHistoryPush) {
  window.scrollTo(0,1);

  var els = document.getElementsByClassName('page');
  
  for (var i = 0 ; i < els.length ; ++i) {
    els[i].style.display = 'none';
  }
  
  var page = document.getElementById('page-' + pageName);
  
  page.style.display = "block";
  
  title = (pageName == 'root') ? 'Hackbook' : pageName.replace(/-/g, ' ');
  document.getElementById('title').innerHTML = title;
  
  if (ignoreHistoryPush != true) {
    window.history.pushState({page: pageName}, '', document.location.origin + document.location.pathname + "#" + pageName);
  }

  document.getElementById('back').style.display = (pageName == 'root') ? 'none' : 'block';
}

window.onpopstate = function(e) {
  if (e.state != null) {
    console.log(e.state);
    openPage(e.state.page);
  }
  else {
    openPage('root', true);
  }
}

openPage('root', true);

//Shows a modal dialog when fetcing data from Facebook
function setAction(msg, hideBackground) {
  document.getElementById('action').style.display = 'block';
  
  if (hideBackground) {
    document.getElementById('action').style.opacity = '100';
  }
  else {
    document.getElementById('action').style.opacity = '.9';
  }
  
  FB.$('msg').innerHTML = FB.String.escapeHTML(msg);
  
  window.scrollTo(0, 1);
}

//Clears the modal dialog
function clearAction() {
  FB.$('msg').innerHTML = '';
  
  document.getElementById('action').style.display = 'none';
}

//Automatically scroll away the address bar
addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);

function hideURLbar() {
  window.scrollTo(0,1);
}

function hideButton(button) {
  button.style.display = 'none';
}

//////////////////////////
//
// Requests
// See the "Requests" section on https://developers.facebook.com/mobile
//
//////////////////////////

//Send a request to friends have have logged into the app in the past, as well as friends that haven't
function sendRequestBoth() {
  FB.ui({
    method: 'apprequests',
    message: 'Learn how to make your mobile web app social',
  }, 
  function(response) {
    console.log('sendRequestBoth response: ', response);
  });
}

//Send an invite to friends that haven't logged into the app yet
function sendRequestInvite() {
  FB.ui({
    method: 'apprequests',
    suggestions: nonAppFriendIDs,
    message: 'Learn how to make your mobile web app social',
  }, function(response) {
    console.log('sendRequestInvite UI response: ', response);
  });
}

//Send a request to friends that are already using the app
function sendRequest() {
  FB.ui({
    method: 'apprequests',
    suggestions: appFriendIDs,
    message: 'Learn how to make your mobile web app social',
  }, function(response) {
    console.log('sendRequest UI response: ', response);
  });
}

//Send a request to a single friend that is using the app
function sendRequestSingle() {
  randNum = Math.floor ( Math.random() * friendIDs.length ); 

  var friendID = friendIDs[randNum];

  FB.ui({
    method: 'apprequests',
    //Use the first friend returned
    to: friendID,
    message: 'Learn how to make your mobile web app social',
  }, function(response) {
    console.log('sendRequestSingle UI response: ', response);
  });
}

//////////////////////////
//
// Credits
// See https://developers.facebook.com/docs/creditsapi/
//
//////////////////////////

//Prompt the user to pay for a virtual good
function sendPay() {
  FB.ui({
      method: 'pay',
      credits_purchase: false,
      // This is the item ID defined in your game or app
      order_info: 'locket'
  },
  function(response) {
    console.log('sendPay response: ', response);
  });
}

//If Hackbook is running from within the Facebook iOS native app, disable Credits
if (FB.UA.nativeApp()) {
  document.getElementById('credits-button').style.display = 'none';
}

//////////////////////////
//
// Graph API
// See https://developers.facebook.com/docs/reference/api/
//
//////////////////////////

//Detect when Facebook tells us that the user's session has been returned
FB.Event.monitor('auth.statusChange', function(session) {
  //If the user isn't logged in, set the body class so that we show/hide the correct elements
  if (session == undefined || session.status == 'not_authorized') {
    if (document.body.className != 'not_connected') {
      document.body.className = 'not_permissioned';
    }
  }
  //The user is logged in, so let's see if they've granted the check-in permission and pre-fetch some data
  //Depending on if they have or haven't, we'll set the body to reflect that so we show/hide the correct elements on the page
  else {
    preFetchData();
    
    FB.api({method: 'fql.query', query: 'SELECT user_checkins, publish_checkins FROM permissions WHERE uid = me()'}, function(response) {
           if (document.body.className != 'not_connected') {
             //We couldn't get a check-in for the user, so they haven't granted the permission
             if (response[0] && response[0].user_checkins == 1) {
               document.body.className = 'permissioned';
             }
             //We were able to get a check-in for the user, so they have granted the permission already
             else {
               document.body.className = 'not_permissioned';
             }
           }
    });
  }
});

//Get the user's basic information
function getUserBasicInfo() {
  setAction('Getting your information', false);
  
  var markup = '<div class="data-header">Your information:</div>';
  
  //Update display of user name and picture
  if (FB.$('user-info')) {
    markup = markup + '<strong>User ID:</strong> ' + user.id + '<br />' + '<strong>Name:</strong> ' + user.name + '<br />' + '<strong>Profile picture URL:</strong> <a href="' + user.picture + '" target="_blank">' + user.picture + '</a><br />';
    FB.$('user-info').innerHTML = markup;
    
    clearAction();
  }
}

//Get the user's friends
function getUserFriends() {
  var markup = '<div class="data-header">Friends (capped at 25):</div>';
  
  for (var i=0; i < friendsInfo.length && i < 25; i++) {
    markup = markup + '<img src="' + friendsInfo[i].picture + '">' + friendsInfo[i].name + '<br />';
  }
  
  FB.$('user-friends').innerHTML = markup;
}

//Get the user's check-ins
function getCheckIns() {
  setAction('Getting check-ins', false);
  
  FB.api('/me/checkins', function(response) {
    console.log('Got your check-ins: ', response);
    
    clearAction();
    
    if (!response.error) {
      displayCheckIns(response.data, FB.$('checkins'));
    }
  });
}

//Display the user's check-ins
function displayCheckIns(checkins, dom) {
  var markup = '<div class="data-header">Your last five check-ins:</div>';
  
  for (var i=0; i < checkins.length && i < 5; i++) {
    var checkin = checkins[i];
    
    markup += '<div class="place">'
        + '<div class="picture"><img src="https://graph.facebook.com/' + checkin.place.id + '/picture"></div>'
        + '<div class="info">'
        + '  <div class="name">' + checkin.place.name + '</div>'
        + '  <div class="check-in-msg">' + (checkin.message || '') + '</div>'
        + '</div>'
      + '</div>';
  }
  
  dom.innerHTML = markup;
}

//Display the local places that the user can check into
function displayPlaces(places, dom) {
  var markup = '<div class="data-header">Nearby locations:</div>';
  
  for (var i=0; i < places.length && i < 5; i++) {
    var place = places[i];
    
    markup += '<div class="place">'
        + '<div class="picture"><img src="https://graph.facebook.com/' + place.id + '/picture"></div>'
        + '<div class="info">'
        + '  <div class="name">' + place.name + '</div>'
        + '  <div class="check-in-button"><input type="button" value="Check in" onclick="checkin(' + place.id + ')" /></div>'
        + '</div>'
      + '</div>';
  }
  
  dom.innerHTML = markup;
}

//Check the user into the place
function checkin(id) {
  setAction("Checking you in", false);
  
  var params = {
    method: 'POST',
    place: id,
    coordinates: {
      latitude: curLocation.coords.latitude,
      longitude: curLocation.coords.longitude
    },
    message: ''
  };
  
  FB.api('/me/checkins', params,
    function(response) {
      clearAction();
      
      var debugOutput = '';
      for (var property in response) {
        debugOutput += property + ': ' + response[property]+'; ';
      }
      console.log('Checked you into the place, here\'s the response::'+debugOutput);   
      //console.log('Checked you into the place, here\'s the response: ', response);
      
      setAction("You've successfully checked in!", false);
      
      setTimeout('clearAction();', 2000);
    }
  );
}

//Get locations near the user
function getNearby() {
  setAction("Getting nearby locations", false);
  
  // First use browser's geolocation API to obtain location
  navigator.geolocation.getCurrentPosition(function(location) {
    curLocation = location;
    console.log(location);

    // Use graph API to search nearby places
    var path = '/search?type=place&center=' + location.coords.latitude + ',' + location.coords.longitude + '&distance=1000';
    
    FB.api(path, function(response) {
      clearAction();
      console.log('Got some places near you: ', response);
      if (!response.error) {
        displayPlaces(response.data, FB.$('locations-nearby'));
      }
    });
  });
}

//Prompt the user to grant the check-in permission
function promptCheckInPermission() {
  FB.login(function(response) {
    if (response.authResponse) {
      //User granted permissions
      document.body.className = 'permissioned';
    } 
    else {
      //User didn't grant permissions
      alert('You need to grant the check-in permission before using this functionality.');
    }
  }, {scope:'user_checkins,publish_checkins'});
}

//Pre-fetch data, mainly used for requests and feed publish dialog
var nonAppFriendIDs = [];
var appFriendIDs = [];
var friendIDs = [];
var friendsInfo = [];

function preFetchData() {
  //First, get friends that are using the app
  FB.api({method: 'friends.getAppUsers'}, function(appFriendResponse) {
    appFriendIDs = appFriendResponse;
  
    //Now fetch all of the user's friends so that we can determine who hasn't used the app yet
    FB.api('/me/friends', { fields: 'id, name, picture' }, function(friendResponse) {
      friends = friendResponse.data;
      
      //limit to a 200 friends so it's fast
      for (var k = 0; k < friends.length && k < 200; k++) {
        var friend = friends[k];
        var index = 1;
        
        friendIDs[k] = friend.id;
        friendsInfo[k] = friend;
        
        for (var i = 0; i < appFriendIDs.length; i++) {
          if (appFriendIDs[i] == friend.id) {
            index = -1;
          }
        }       
        
        if (index == 1) { 
          nonAppFriendIDs.push(friend.id);
        }
      }
      
      console.log('Got your friend\'s that use the app: ', appFriendIDs);
      
      console.log('Got all of your friends: ', friendIDs);
      
      console.log('Got friends that are not using the app yet: ', nonAppFriendIDs);
    });
  });
}


//////////////////////////
//
// Authentication
// See "Logging the user in" on https://developers.facebook.com/mobile
//
//////////////////////////

var user = [];

//Detect when Facebook tells us that the user's session has been returned
FB.Event.monitor('auth.statusChange', function(session) {
  console.log('Got the user\'s session: ', session);
  
  if (session && session.status != 'not_authorized' && session.status != 'notConnected') {
    if (session.authResponse['accessToken']) {
      document.body.className = 'connected';
      
      //Fetch user's id, name, and picture
      FB.api('/me', {
        fields: 'name, picture'
      },
      function(response) {
        if (!response.error) {
          user = response;
          
          console.log('Got the user\'s name and picture: ', response);
          
          //Update display of user name and picture
          if (FB.$('user-name')) {
            FB.$('user-name').innerHTML = user.name;
          }
          if (FB.$('user-picture')) {
            FB.$('user-picture').src = user.picture;
          }
        }
        
        clearAction();
      });
    }
  }
  else if (session === undefined) {
    document.body.className = 'not_connected';
  
    clearAction();
  }
  else if (session && (session.status == 'not_authorized' || session.status == 'notConnected')) {
    document.body.className = 'not_connected';
    
    clearAction();
  }
});

//Prompt the user to login and ask for the 'email' permission
function promptLogin() {
  FB.login(null, {scope: 'email'});
}

//This will prompt the user to grant you acess to their Facebook Likes
function promptExtendedPermissions() {
  FB.login(function() {
    setAction("The 'user_likes' permission has been granted.", false);
    
    setTimeout('clearAction();', 2000);
    
    document.body.className = 'permissioned';
  }, {scope: 'user_likes'});
}

//See https://developers.facebook.com/docs/reference/rest/auth.revokeAuthorization/
function uninstallApp() {
  FB.api({method: 'auth.revokeAuthorization'},
    function(response) {
      window.location.reload();
    });
}

//See https://developers.facebook.com/docs/reference/javascript/FB.logout/
function logout() {
  FB.logout(function(response) {
    window.location.reload();
  });
}

cordova.define("cordova/plugin/twitter",
  function(require, exports, module) {
    var exec = require("cordova/exec");
    var Twitter = function () {};

    Twitter.prototype.isTwitterAvailable = function( success, failure ) {
        if (typeof failure != "function")  {
            console.log("Twitter.scan failure: failure parameter not a function");
            return
        }

        if (typeof success != "function") {
            console.log("Twitter.scan failure: success callback parameter must be a function");
            return
        }
        cordova.exec(success, failure, "Twitter", "isTwitterAvailable", []);
    };

    Twitter.prototype.composeTweet = function( success, failure, tweetText, options) {
        if (typeof failure != "function")  {
            console.log("Twitter.scan failure: failure parameter not a function");
            return
        }

        if (typeof success != "function") {
            console.log("Twitter.scan failure: success callback parameter must be a function");
            return
        }
        cordova.exec(success, failure, "Twitter", "composeTweet", [tweetText]);
    };

    var twitter = new Twitter();
    module.exports = twitter;
});

if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.twitter) {
    window.plugins.twitter = cordova.require("cordova/plugin/twitter");
}

//function onBodyLoad(){
//	document.addEventListener("deviceready", onDeviceReady, false);
//}

//function onDeviceReady(){
//    console.log("onDeviceReady");


//    TwitterDemo.setup(); ///This is now called from index.js 


//}

TwitterDemo = {
  
  
	tweetActu:function(){
	
		
		var link="";
		var picture="";
		var titre="";
		var caption="";
		var description="";
		var vid="";
					
		titre=currentDataActus["title"];
		picture=currentDataActus["image"];
		//caption=currentDataActus["chapo"];
		caption="";
		//description=currentDataActus["texte"];
		description="";
		link=currentDataActus["lien"];
		
					
		titre=unescapeHTML(titre);
		caption=unescapeHTML(caption);						
							
	
		

		
		 window.plugins.twitter.composeTweet(
				 function(){
				 },
				 function(){
					 navigator.notification.alert("Veuillez réessayer ultérieurement ou installer l'application Twitter avant de partager un Tweet","","Twitter","Fermer");
				 },
				 link,
				 {
					urlAttach: link,
					imageAttach: picture
				 }
			);
		
		
	},
	
	tweetVideo:function(){
	
		var link="";
		var picture="";
		var titre="";
		var caption="";
		var description="";
		var vid="";
					
		//PARTAGE VIDEO
		vid= currentDataTv8.id;		
		titre = currentDataTv8.title;
		picture = currentDataTv8.lien;
		//link='http://www.youtube.com/embed/'+vid+'?rel=0';
		link='http://www.youtube.com/watch?v='+vid+'';
		
		
		window.plugins.twitter.composeTweet(
				 function(){
					 
					 
					
				 },
				 function(){
					 navigator.notification.alert("Veuillez réessayer ultérieurement ou installer l'application Twitter avant de partager un Tweet","","Twitter","Fermer");
				 },
				 link,
				 {
						urlAttach: link,
						imageAttach: picture
				 }
			);
		
	},
	
	tweetPubli:function(){
	
		var link="";
		var picture="";
		var titre="";
		var caption="";
		var description="";
		var vid="";
					
		//PARTAGE PUBLI
								
		titre=currentDataPub["title"];
		picture=currentDataPub["image"];
		//caption=currentDataPub["chapo"];
		caption="";
		//description=currentDataPub["texte"];
		description="";
		link=currentDataPub["lien"];
		
		titre=unescapeHTML(titre);
		caption=unescapeHTML(caption);

		
		window.plugins.twitter.composeTweet(
				 function(){
					 
					
				 },
				 function(){
					 navigator.notification.alert("Veuillez réessayer ultérieurement ou installer l'application Twitter avant de partager un Tweet","","Twitter","Fermer");
				 },
				 link,
					{
						urlAttach: link,
						imageAttach: picture
					}
			);
	},


	tweetEvenement:function(){
	
		var link="";
		var picture="";
		var titre="";
		var caption="";
		var description="";
		var vid="";
					
		
		//PARTAGE EVENEMENT AGENDA
		titre=currentDataCal["lieu"]+"</br>"+currentDataCal["theme"]+" - "+currentDataCal["title"]+"</br>";
		picture=currentDataCal["preview"];
		//caption=currentDataCal["chapo"];
		caption="";
		//description=currentDataCal["texte"];
		description="";
		link=currentDataCal["lien"];
		
		titre=unescapeHTML(titre);
		caption=unescapeHTML(caption);
		
		
		
		window.plugins.twitter.composeTweet(
				 function(){
					 
					
				 },
				 function(){
					 navigator.notification.alert("Veuillez réessayer ultérieurement ou installer l'application Twitter avant de partager un Tweet","","Twitter","Fermer");
				 },
				 link,
					{
						urlAttach: link,
						imageAttach: picture
					}
			);
	}
    
    
};


//function onBodyLoad(){
//	document.addEventListener("deviceready", onDeviceReady, false);
//}

//function onDeviceReady(){
//    console.log("onDeviceReady");


//    TwitterDemo.setup(); ///This is now called from index.js 


//}

TwitterDemo = {
    $:function(id){
        return document.getElementById(id);
    },
    
    log:function(s){
        TwitterDemo.$("log").innerHTML = s;
    },
    
    setup:function(){
	
	
		
	
        var tests = ["isAvailable", "isSetup", "tweet1", "tweet2", "tweet3", "tweet4", "tweet5", "tweet6", "timeline", "mentions", "friendsIds", "usersLookup"];
        for(var i=0, l=tests.length; i<l; i++){
            this.$(tests[i]).onclick = this[tests[i]];
        }
    },
    
    isAvailable:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.isTwitterAvailable(function(r){
            TwitterDemo.log("twitter available? " + r);
        });        
    },
    
    isSetup:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.isTwitterSetup(function(r){
            TwitterDemo.log("twitter configured? " + r);
        });
    },
  
	tweetActu:function(){
	
		alert("qdiojfsdklhfsd");
		
		var link;
		var picture;
		var titre;
		var caption;
		var description;
		var vid;
					
		titre=currentDataActus["title"];
		picture=currentDataActus["image"];
		//caption=currentDataActus["chapo"];
		caption="";
		//description=currentDataActus["texte"];
		description="";
		link=currentDataActus["lien"];
		
					
		titre=unescapeHTML(titre);
		caption=unescapeHTML(caption);						
							
	
		TwitterDemo.log("wait..");
		window.plugins.twitter.composeTweet(
			function(s){ TwitterDemo.log("tweet success"); }, 
			function(e){ TwitterDemo.log("tweet failure: " + e); }, 
			"",
			{
				urlAttach: link,
				imageAttach: picture
			});
	},
	
	tweetVideo:function(){
	
		var link;
		var picture;
		var titre;
		var caption;
		var description;
		var vid;
					
		//PARTAGE VIDEO
		
		
		//var currentid = entry[x];
		vid= entryCourant.id.$t.split(":").slice(-1);
		titre = entryCourant.title.$t;
		//caption = entryCourant.media$group.media$description.$t;
		caption = entryCourant.media$group.media$description.$t;
		picture = entryCourant.media$group.media$thumbnail[0].url;
		description="";
		link='http://www.youtube.com/embed/'+vid+'?rel=0';
		
	
		TwitterDemo.log("wait..");
		window.plugins.twitter.composeTweet(
			function(s){ TwitterDemo.log("tweet success"); }, 
			function(e){ TwitterDemo.log("tweet failure: " + e); }, 
			"",
			{
				urlAttach: link,
				imageAttach: picture
			});
	},
	
	tweetPubli:function(){
	
		var link;
		var picture;
		var titre;
		var caption;
		var description;
		var vid;
					
		//PARTAGE PUBLI
								
		titre=currentDataPub["title"];
		picture=currentDataPub["image"];
		//caption=currentDataPub["chapo"];
		caption="";
		//description=currentDataPub["texte"];
		description="";
		link=currentDataPub["lien"];
		
		titre=unescapeHTML(titre);
		caption=unescapeHTML(caption);

		
		TwitterDemo.log("wait..");
		window.plugins.twitter.composeTweet(
			function(s){ TwitterDemo.log("tweet success"); }, 
			function(e){ TwitterDemo.log("tweet failure: " + e); }, 
			"",
			{
				urlAttach: link,
				imageAttach: picture
			});
	},


	tweetEvenement:function(){
	
		var link;
		var picture;
		var titre;
		var caption;
		var description;
		var vid;
					
		
		//PARTAGE EVENEMENT AGENDA
		titre=currentDataCal["lieu"]+"</br>"+currentDataCal["theme"]+" - "+currentDataCal["title"]+"</br>";
		picture=currentDataCal["preview"];
		//caption=currentDataCal["chapo"];
		caption="";
		//description=currentDataCal["texte"];
		description="";
		link=currentDataCal["lien"];
		
		titre=unescapeHTML(titre);
		caption=unescapeHTML(caption);
		
		
		
		TwitterDemo.log("wait..");
		window.plugins.twitter.composeTweet(
			function(s){ TwitterDemo.log("tweet success"); }, 
			function(e){ TwitterDemo.log("tweet failure: " + e); }, 
			"", 
			{
				urlAttach: link,
				imageAttach: picture
			});
	},



	
	/*
	 //Original tweet1 example
    tweet1:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.composeTweet(
            function(s){ TwitterDemo.log("tweet success"); }, 
            function(e){ TwitterDemo.log("tweet failure: " + e); }, 
            "Text, Image, URL", 
            {
                urlAttach:"https://github.com/brianantonelli", 
                imageAttach:"http://zomgdinosaurs.com/zomg.jpg"
            });
    },
	 
	 */

    tweet2:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.composeTweet(
            function(s){ TwitterDemo.log("tweet success"); }, 
            function(e){ TwitterDemo.log("tweet failure: " + e); }, 
            "Text, Remote Image", 
            {
                imageAttach:"http://zomgdinosaurs.com/zomg.jpg"
            });
    },

    tweet6:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.composeTweet(
                                            function(s){ TwitterDemo.log("tweet success"); }, 
                                            function(e){ TwitterDemo.log("tweet failure: " + e); }, 
                                            "Text, Local Image", 
                                            {
                                            imageAttach:"www/ninja-lolcat.gif"
                                            });
    },

    tweet3:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.composeTweet(
            function(s){ TwitterDemo.log("tweet success"); }, 
            function(e){ TwitterDemo.log("tweet failure: " + e); }, 
            "Text, URL", 
            {
                urlAttach:"https://github.com/brianantonelli"
            });
    },

    tweet4:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.composeTweet(
            function(s){ TwitterDemo.log("tweet success"); }, 
            function(e){ TwitterDemo.log("tweet failure: " + e); }, 
            "Text");
    },
    
    tweet5:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.composeTweet(
            function(s){ TwitterDemo.log("tweet success"); }, 
            function(e){ TwitterDemo.log("tweet failure: " + e); });
    },

    timeline:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.getPublicTimeline(
            function(s){ TwitterDemo.log("timeline success: " + JSON.stringify(s)); }, 
            function(e){ TwitterDemo.log("timeline failure: " + e); });
    },
    
    mentions:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.getMentions(
            function(s){ TwitterDemo.log("mentions success: " + JSON.stringify(s)); }, 
            function(e){ TwitterDemo.log("mentions failure: " + e); });
    },
    
    friendsIds:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.getTWRequest(
            'friends/ids.json',
            {},
            function(s){ TwitterDemo.log("friendsIds success: " + JSON.stringify(s)); }, 
            function(e){ TwitterDemo.log("friendsIds failure: " + e); });
    },
    
    usersLookup:function(){
        TwitterDemo.log("wait..");
        window.plugins.twitter.getTWRequest(
            'users/lookup.json',
            {user_id: '16141659,783214,6253282'},
            function(s){ TwitterDemo.log("usersLookup success: " + JSON.stringify(s)); }, 
            function(e){ TwitterDemo.log("usersLookup failure: " + e); },
            {requestMethod: 'POST'});
    }
    
    
};


function initPushwoosh()
{
	var pushNotification = window.plugins.pushNotification;
	pushNotification.onDeviceReady();

	document.addEventListener('push-notification', function(event) {
   	                            var title = event.notification.title;
   	                            var userData = event.notification.userdata;

   	                            if(typeof(userData) != "undefined") {
   									console.warn('user data: ' + JSON.stringify(userData));
   								}

   								navigator.notification.alert(title);

   								pushNotification.stopGeoPushes();
   							  });
	
	
	registerPushwoosh();
	
}

function registerPushwoosh()
{
	var pushNotification = window.plugins.pushNotification;
	//projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID"
	
	pushNotification.registerDevice({ projectid: "152935902043", appid : "D3450-18FDA" },
	//pushNotification.registerDevice({ projectid: "152935902043", appid : "958F5-BA94C" },
	
									function(token) {
										//alert(token);
										onPushwooshInitialized(token);
									},
									function(status) {
										//alert("failed to register: " +  status);
									    console.warn(JSON.stringify(['failed to register ', status]));
									});
}

function unregisterPushwoosh()
{
	var pushNotification = window.plugins.pushNotification;
	pushNotification.unregisterDevice(function(token) {
										alert("unregistered, old token " + token);
									},
									function(status) {
										//alert("failed to unregister: " +  status);
									    console.warn(JSON.stringify(['failed to unregister ', status]));
									});
}

//set the settings for Pushwoosh or set tags, this must be called only after successful registration
function onPushwooshInitialized(pushToken)
{
	//output the token to the console
	console.warn('push token: ' + pushToken);

	var pushNotification = window.plugins.pushNotification;

	//set multi notificaiton mode
	//pushNotification.setMultiNotificationMode();
	
	//set single notification mode
	//pushNotification.setSingleNotificationMode();
	
	//disable sound and vibration
	//pushNotification.setSoundType(1);
	//pushNotification.setVibrateType(1);
	
	pushNotification.setLightScreenOnNotification(false);
	
	//goal with count
	//pushNotification.sendGoalAchieved({goal:'purchase', count:3});
	
	//goal with no count
	//pushNotification.sendGoalAchieved({goal:'registration'});

	//setting list tags
	//pushNotification.setTags({"MyTag":["hello", "world"]});
	
	//settings tags
	pushNotification.setTags({deviceName:"hello", deviceId:10},
									function(status) {
										console.warn('setTags success');
									},
									function(status) {
										console.warn('setTags failed');
									});
		
	function geolocationSuccess(position) {
		pushNotification.sendLocation({lat:position.coords.latitude, lon:position.coords.longitude},
								 function(status) {
									  console.warn('sendLocation success');
								 },
								 function(status) {
									  console.warn('sendLocation failed');
								 });
	};
		
	// onError Callback receives a PositionError object
	//
	function geolocationError(error) {
		//alert('code: '    + error.code    + '\n' +
		//	  'message: ' + error.message + '\n');
	}
	
	function getCurrentPosition() {
		navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
	}
	
	//greedy method to get user position every 3 second. works well for demo.
//	setInterval(getCurrentPosition, 3000);
		
	//this method just gives the position once
//	navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
		
	//this method should track the user position as per Phonegap docs.
//	navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, { maximumAge: 3000, enableHighAccuracy: true });

	//Pushwoosh Android specific method that cares for the battery
	pushNotification.startGeoPushes();
}

var appPushwooshAndroid = {
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
    // function, we must explicity call 'appPushwooshAndroid.receivedEvent(...);'
    onDeviceReady: function() {
        initPushwoosh();
        //appPushwooshAndroid.receivedEvent('deviceready');
        
        //optional: create local notification alert
        //var pushNotification = window.plugins.pushNotification;
	//pushNotification.clearLocalNotification();
	//pushNotification.createLocalNotification({"msg":"message", "seconds":30, "userData":"optional"});

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


//////////////////////////
//
// Config
// Set your app id here.
//
//////////////////////////


//46875704678097

if (window.location.host == 'facebookmobileweb.com' || window.location.host == 'www.facebookmobileweb.com') {
	var gAppID = '468757046478097';
}
//Add your Application ID here
else {
  var gAppID = '468757046478097';
}

if (gAppID == '468757046478097') {
  alert('You need to enter your App ID in js/_config.js on line 13.');
}

//Initialize the Facebook SDK
//See https://developers.facebook.com/docs/reference/javascript/
window.fbAsyncInit = function() {
  FB.init({ 
    appId: gAppID,
    status: true,
    cookie: true,
    xfbml: true,
    frictionlessRequests: true,
    useCachedDialogs: true,
    oauth: true
  });

  FB.getLoginStatus(handleStatusChange);

  authUser();
  checkForCredits();
  updateAuthElements();
};


// Load the SDK Asynchronously
(function(d){
 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement('script'); js.id = id; js.async = true;
 js.src = "//connect.facebook.net/en_US/all.js";
 ref.parentNode.insertBefore(js, ref);
}(document));

//////////////////////////
//
// News Feed
// See the "News Feed" section on https://developers.facebook.com/mobile
//
//////////////////////////

//Publish a story to the user's own wall
function publishStory(flag) {
  
	var link;
	var picture;
	var titre;
	var caption;
	var description;
	var vid;
	
	
	//PARTAGE ACTUS
	if(flag=='A')
	{						
		titre=currentDataActus["title"];
		picture=currentDataActus["image"];
		//caption=currentDataActus["chapo"];
		caption="";
		//description=currentDataActus["texte"];
		description="";
		link=currentDataActus["lien"];
	}
		
		
	//PARTAGE VIDEO
	else if(flag=='V')
	{
		
		//var currentid = entry[x];
		vid= currentDataTv8.id;
		titre = currentDataTv8.title;
		//caption = entryCourant.media$group.media$description.$t;
		caption = currentDataTv8.chapo;
		picture = currentDataTv8.lien;
		description="";
		//link='http://www.youtube.com/embed/'+vid+'?rel=0';
		link='http://www.youtube.com/watch?v='+vid+'';
	}
		
		
	//PARTAGE EVENEMENT AGENDA
	else if(flag=='E')
	{						
		titre=currentDataCal["lieu"]+"</br>"+currentDataCal["theme"]+" - "+currentDataCal["title"]+"</br>";
		picture=currentDataCal["preview"];
		//caption=currentDataCal["chapo"];
		caption="";
		//description=currentDataCal["texte"];
		description="";
		link=currentDataCal["lien"];
	}
		
	//PARTAGE PUBLI
	else if(flag=='P')
	{						
		titre=currentDataPub["title"];
		picture=currentDataPub["preview"];
		//caption=currentDataPub["chapo"];
		caption="";
		//description=currentDataPub["texte"];
		description="";
		link=currentDataPub["lien"];
	}

  
	titre=unescapeHTML(titre);
	caption=unescapeHTML(caption);
  
  
	FB.getLoginStatus(function(response){
		  
		if(response.status=="connected"){
		  FB.ui({
		    method: 'feed',
		    name: titre,
		    caption: caption,
		    description: 'Partage Facebook',
		    link: link,
		    picture: picture,
		    actions: [{ name: 'Commencer', link: 'http://www.clermont-ferrand.fr' }],
		  }, 
		  function(response) {
		    console.log('publishStory UI response: ', response);
		  });
		}
		else
		{
			  
			//alert("Veuillez vous authentifiez");
			promptLogin();
			  
		}
	
	});
}

//Publish a story to the user's friend's wall
function publishStoryFriend() {
  randNum = Math.floor ( Math.random() * friendIDs.length ); 

  var friendID = friendIDs[randNum];
  
  console.log('Opening a dialog for friendID: ', friendID);
  
  FB.ui({
    method: 'feed',
    to: friendID,
    name: 'I\'m using the Hackbook web app',
    caption: 'Hackbook for Mobile Web.',
    description: 'Check out Hackbook for Mobile Web to learn how you can make your web apps social using Facebook Platform.',
    link: 'http://apps.facebook.com/mobile-start/',
    picture: 'http://www.facebookmobileweb.com/hackbook/img/facebook_icon_large.png',
    actions: [{ name: 'Get Started', link: 'http://apps.facebook.com/mobile-start/' }],
    user_message_prompt: 'Tell your friends about building social web apps.'
  }, 
  function(response) {
    console.log('publishStoryFriend UI response: ', response);
  });
}


/*

 UI assist functions
yo
*/

//show a loading screen when launched, until we get the user's session back
setAction("Loading Hackbook", true);

//Swaps the pages out when the user taps on a choice
function openPage(pageName, ignoreHistoryPush) {
  window.scrollTo(0,1);

  var els = document.getElementsByClassName('page');
  
  for (var i = 0 ; i < els.length ; ++i) {
    els[i].style.display = 'none';
  }
  
  var page = document.getElementById('page-' + pageName);
  
  page.style.display = "block";
  
  title = (pageName == 'root') ? 'Hackbook' : pageName.replace(/-/g, ' ');
  document.getElementById('title').innerHTML = title;
  
  if (ignoreHistoryPush != true) {
    window.history.pushState({page: pageName}, '', document.location.origin + document.location.pathname + "#" + pageName);
  }

  document.getElementById('back').style.display = (pageName == 'root') ? 'none' : 'block';
}

window.onpopstate = function(e) {
  if (e.state != null) {
    console.log(e.state);
    openPage(e.state.page);
  }
  else {
    openPage('root', true);
  }
}

openPage('root', true);

//Shows a modal dialog when fetcing data from Facebook
function setAction(msg, hideBackground) {
  document.getElementById('action').style.display = 'block';
  
  if (hideBackground) {
    document.getElementById('action').style.opacity = '100';
  }
  else {
    document.getElementById('action').style.opacity = '.9';
  }
  
  document.getElementById('msg').innerHTML = msg;
  
  window.scrollTo(0, 1);
}

//Clears the modal dialog
function clearAction() {
  document.getElementById('msg').innerHTML = '';
  
  document.getElementById('action').style.display = 'none';
}

//Automatically scroll away the address bar
addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false);

function hideURLbar() {
  window.scrollTo(0,1);
}

function hideButton(button) {
  button.style.display = 'none';
}


//////////////////////////
//
// Requests
// See the "Requests" section on https://developers.facebook.com/mobile
//
//////////////////////////

//Send a request to friends have have logged into the app in the past, as well as friends that haven't
function sendRequestBoth() {
  FB.ui({
    method: 'apprequests',
    message: 'Learn how to make your mobile web app social',
  }, 
  function(response) {
    console.log('sendRequestBoth response: ', response);
  });
}

//Send an invite to friends that haven't logged into the app yet
function sendRequestInvite() {
  FB.ui({
    method: 'apprequests',
    suggestions: nonAppFriendIDs,
    message: 'Learn how to make your mobile web app social',
  }, function(response) {
    console.log('sendRequestInvite UI response: ', response);
  });
}

//Send a request to friends that are already using the app
function sendRequest() {
  FB.ui({
    method: 'apprequests',
    suggestions: appFriendIDs,
    message: 'Learn how to make your mobile web app social',
  }, function(response) {
    console.log('sendRequest UI response: ', response);
  });
}

//Send a request to a single friend that is using the app
function sendRequestSingle() {
  randNum = Math.floor ( Math.random() * friendIDs.length ); 

  var friendID = friendIDs[randNum];

  FB.ui({
    method: 'apprequests',
    //Use the first friend returned
    to: friendID,
    message: 'Learn how to make your mobile web app social',
  }, function(response) {
    console.log('sendRequestSingle UI response: ', response);
  });
}

//////////////////////////
//
// Credits
// See https://developers.facebook.com/docs/creditsapi/
//
//////////////////////////

//Prompt the user to pay for a virtual good
function sendPay() {
  FB.ui({
      method: 'pay',
      credits_purchase: false,
      // This is the item ID defined in your game or app
      order_info: 'locket'
  },
  function(response) {
    console.log('sendPay response: ', response);
  });
}

//If Hackbook is running from within the Facebook iOS native app, disable Credits
function checkForCredits() {
  if (FB.UA.nativeApp()) {
    document.getElementById('credits-button').style.display = 'none';
  }
}

//////////////////////////
//
// Graph API
// See https://developers.facebook.com/docs/reference/api/
//
//////////////////////////

//Detect when Facebook tells us that the user's session has been returned
function updateAuthElements() {
  FB.Event.subscribe('auth.statusChange', function(session) {
    if (session.authResponse) { 
      //The user is logged in, so let's pre-fetch some data and check the current 
      //permissions to show/hide the proper elements.
      preFetchData();
      checkUserPermissions();
    }
  });
}

//Get the user's basic information
function getUserBasicInfo() {
  setAction('Getting your information', false);
  
  var markup = '<div class="data-header">Your information:</div>';
  
  //Update display of user name and picture
  if (document.getElementById('user-info')) {
    var profilePictureUrl = '';
    if (user.picture.data) {
      profilePictureUrl = user.picture.data.url;
    } else {
      profilePictureUrl = user.picture;
    }
    markup = markup + '<strong>User ID:</strong> ' + user.id + '<br />' + '<strong>Name:</strong> ' + user.name + '<br />' + '<strong>Profile picture URL:</strong> <a href="' + profilePictureUrl + '" target="_blank">' + profilePictureUrl + '</a><br />';
    document.getElementById('user-info').innerHTML = markup;
    
    clearAction();
  }
}

//Get the user's friends
function getUserFriends() {
  var markup = '<div class="data-header">Friends (capped at 25):</div>';
  
  for (var i=0; i < friendsInfo.length && i < 25; i++) {
    var profilePictureUrl = '';
    if (friendsInfo[i].picture.data) {
      profilePictureUrl = friendsInfo[i].picture.data.url;
    } else {
      profilePictureUrl = friendsInfo[i].picture;
    }
    markup = markup + '<img src="' + profilePictureUrl + '">' + friendsInfo[i].name + '<br />';
  }
  
  document.getElementById('user-friends').innerHTML = markup;
}

//Get the user's check-ins
function getCheckIns() {
  setAction('Getting check-ins', false);
  
  FB.api('/me/checkins', function(response) {
    console.log('Got your check-ins: ', response);
    
    clearAction();
    
    if (!response.error) {
      displayCheckIns(response.data, document.getElementById('checkins'));
    }
  });
}

//Display the user's check-ins
function displayCheckIns(checkins, dom) {
  var markup = '<div class="data-header">Your last five check-ins:</div>';
  
  for (var i=0; i < checkins.length && i < 5; i++) {
    var checkin = checkins[i];
    
    markup += '<div class="place">'
        + '<div class="picture"><img src="http://graph.facebook.com/' + checkin.place.id + '/picture"></div>'
        + '<div class="info">'
        + '  <div class="name">' + checkin.place.name + '</div>'
        + '  <div class="check-in-msg">' + (checkin.message || '') + '</div>'
        + '</div>'
      + '</div>';
  }
  
  dom.innerHTML = markup;
}

//Display the local places that the user can check into
function displayPlaces(places, dom) {
  var markup = '<div class="data-header">Nearby locations:</div>';
  
  for (var i=0; i < places.length && i < 5; i++) {
    var place = places[i];
    
    markup += '<div class="place">'
        + '<div class="picture"><img src="http://graph.facebook.com/' + place.id + '/picture"></div>'
        + '<div class="info">'
        + '  <div class="name">' + place.name + '</div>'
        + '  <div class="check-in-button"><input type="button" value="Check in" onclick="checkin(' + place.id + ')" /></div>'
        + '</div>'
      + '</div>';
  }
  
  dom.innerHTML = markup;
}

//Check the user into the place
function checkin(id) {
  setAction("Checking you in", false);
  
  var params = {
    method: 'POST',
    place: id,
    coordinates: {
      latitude: curLocation.coords.latitude,
      longitude: curLocation.coords.longitude
    },
    message: ''
  };

  console.log('Checking you into using the following params: ', params);
  
  FB.api('/me/checkins', params,
    function(response) {
      clearAction();
      
      console.log('Checked you into the place, here\'s the response: ', response);
      
      setAction("You've successfully checked in!", false);
      
      setTimeout('clearAction();', 2000);
    }
  );
}

//Get locations near the user
function getNearby() {
  setAction("Getting nearby locations", false);
  
  // First use browser's geolocation API to obtain location
  navigator.geolocation.getCurrentPosition(function(location) {
    curLocation = location;
    console.log(location);

    // Use graph API to search nearby places
    var path = '/search?type=place&center=' + location.coords.latitude + ',' + location.coords.longitude + '&distance=1000';
    
    FB.api(path, function(response) {
      clearAction();
      console.log('Got some places near you: ', response);
      if (!response.error) {
        displayPlaces(response.data, document.getElementById('locations-nearby'));
      }
    });
  });
}

//Pre-fetch data, mainly used for requests and feed publish dialog
var nonAppFriendIDs = [];
var appFriendIDs = [];
var friendIDs = [];
var friendsInfo = [];

function preFetchData() {
  //First, get friends that are using the app
  FB.api({method: 'friends.getAppUsers'}, function(appFriendResponse) {
    appFriendIDs = appFriendResponse;
  
    //Now fetch all of the user's friends so that we can determine who hasn't used the app yet
    FB.api('/me/friends', { fields: 'id, name, picture' }, function(friendResponse) {
      friends = friendResponse.data;
      
      //limit to a 200 friends so it's fast
      for (var k = 0; k < friends.length && k < 200; k++) {
        var friend = friends[k];
        var index = 1;
        
        friendIDs[k] = friend.id;
        friendsInfo[k] = friend;
        
        for (var i = 0; i < appFriendIDs.length; i++) {
          if (appFriendIDs[i] == friend.id) {
            index = -1;
          }
        }       
        
        if (index == 1) { 
          nonAppFriendIDs.push(friend.id);
        }
      }
      
      console.log('Got your friend\'s that use the app: ', appFriendIDs);
      
      console.log('Got all of your friends: ', friendIDs);
      
      console.log('Got friends that are not using the app yet: ', nonAppFriendIDs);
    });
  });
}

//////////////////////////
//
// Authentication
// See "Logging the user in" on https://developers.facebook.com/mobile
//
//////////////////////////

var user = [];

var permissions = ['user_status', 'publish_checkins', 'user_likes'];

//Detect when Facebook tells us that the user's session has been returned
function authUser() {
  FB.Event.subscribe('auth.statusChange', handleStatusChange);
}

// Handle status changes
function handleStatusChange(session) {
    console.log('Got the user\'s session: ' + JSON.stringify(session));
    
    if (session.authResponse) {
        //document.body.className = 'connected';
        
        //Fetch user's id, name, and picture
        FB.api('/me', {
          fields: 'name, picture'
        },
        function(response) {
          if (!response.error) {
            document.body.className = 'connected';

            user = response;
            
            console.log('Got the user\'s name and picture: ' + JSON.stringify(response));
            
            //Update display of user name and picture
            if (document.getElementById('user-name')) {
              document.getElementById('user-name').innerHTML = user.name;
            }
            if (document.getElementById('user-picture')) {
              document.getElementById('user-picture').src = user.picture.data.url;
            }
          } else {
            document.body.className = 'not_connected';
            console.log('Error getting user info: ' + JSON.stringify(response.error));
            // Check for errors due to app being unininstalled
            if (response.error.error_subcode && response.error.error_subcode == "458") {
              setTimeout(function() {
                alert("The app was removed. Please log in again.");
              }, 0);              
            }
            logout();         
          }
          
          clearAction();
        });
    }
    else  {
      document.body.className = 'not_connected';
    
      clearAction();
    }
}

//Check the current permissions to set the page elements.
//Pass back a flag to check for a specific permission, to
//handle the cancel detection flow.
function checkUserPermissions(permissionToCheck) {
  var permissionsFQLQuery = 'SELECT ' + permissions.join() + ' FROM permissions WHERE uid = me()';
  FB.api('/fql', { q: permissionsFQLQuery },
    function(response) {
      if (document.body.className != 'not_connected') {
          for (var i = 0; i < permissions.length; i++) {
            var perm = permissions[i];
            var enabledElementName = document.getElementById('enabled_perm_' + perm);
            var disabledElementName = document.getElementById('disabled_perm_' + perm);
            if (response.data[0][perm] == 1) {
              enabledElementName.style.display = 'block';
              disabledElementName.style.display = 'none';
            } else {
              enabledElementName.style.display = 'none';
              disabledElementName.style.display = 'block';
            }
          }
          if (permissionToCheck) {
            if (response.data[0][permissionToCheck] == 1) {
              setAction("The '" + permissionToCheck + "' permission has been granted.", false);
              setTimeout('clearAction();', 2000);
              return true;
            } else {
              setAction('You need to grant the ' + permissionToCheck + ' permission before using this functionality.', false);
              setTimeout('clearAction();', 2000);
            } return false;
          }
          return true;
      }
  });
}

//Prompt the user to login and ask for the 'email' permission
function promptLogin() {
  FB.login(null, {scope: 'email'});
}

//This will prompt the user to grant you acess to a given permission
function promptPermission(permission) {
  FB.login(function(response) {
    if (response.authResponse) {
      checkUserPermissions(permission)
    }
  }, {scope: permission});
}

//See https://developers.facebook.com/docs/reference/api/user/#permissions
function uninstallApp() {
  FB.api('/me/permissions', 'DELETE',
    function(response) {
      //window.location.reload();
      // For may instead call logout to clear
      // cache data, ex: using in a PhoneGap app
      console.log('APP Uninstalled');
      logout();
  });
}

//See https://developers.facebook.com/docs/reference/javascript/FB.logout/
function logout() {
  FB.logout(function(response) {
    window.location.reload();
  });
}

SignUp = {
    
    light_form_id: "light-sign-up",
    
    submit_form: function(){
        new Ajax.Request("/enter", {
            method: 'post',
            evalScripts: true,
            parameters: $(this.light_form_id).serialize(true),
            onCreate: function(){
                Element.setStyle($(SignUp.light_form_id), {
                    'opacity': '0.4'
                })
            },
            onComplete: function(transport){
                if (transport.status == 200){
                    var response = transport.responseText;
                    if(response.include('form')){
                        Element.replace($(SignUp.light_form_id), response);
                    }
                    else {
                        window.location.href = response;
                    }
                }
                else {
                    alert('Something went wrong. Please, try again.');
                    window.location.reload();
                }
            }
        })
    },

    hide_errors: function(){
        var errors_array = $$('#' + SignUp.light_form_id + ' .error');
        errors_array.each(function(error){
            Element.hide(error);
        })
    }
}



/**
 * @author Victoria Moshanova
 */

document.observe("dom:loaded", function(){
    hightlight_error();
})
var hightlight_error = function(){
    if ($$('.input-holder .error').length > 0) {
        var errors_array = $$('.input-holder .error');
        errors_array.each(function(error){
            var focused = false;
            if (error.visible()){
                error.observe('mouseover', function(){
                    this.hide();
                });
                var input = error.previous("input") || error.previous("textarea");
                input.observe('keydown', function(){
                    this.hide();
                }.bind(error));
            }
        });
    }
}
