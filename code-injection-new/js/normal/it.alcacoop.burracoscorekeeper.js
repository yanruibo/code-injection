














      $( '#archive' ).live( 'pageinit',function(event){
	  initializeStore();
	  archive();
	  lang = getLanguage();
	  if(lang == "it") {
	      $.getJSON('it.json', function(data) {
		  $.each(data, function(key, val) {
		      translationStrings[key] = val;
		  });
	      });
	      localizeArchive();
	  }
      });
    







$(document).bind("mobileinit", function() {
    $("[data-role=header]").fixedtoolbar({ tapToggle: false });
    $.mobile.defaultPageTransition = 'none';
    $.mobile.defaultDialogTransition = 'none';
     //$.mobile.useFastClick  = false;
});


// jqm.page.params.js - version 0.1
// Copyright (c) 2011, Kin Blas
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the <organization> nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

(function( $, window, undefined ) {

// Given a query string, convert all the name/value pairs
// into a property/value object. If a name appears more than
// once in a query string, the value is automatically turned
// into an array.
function queryStringToObject( qstr )
{
	var result = {},
		nvPairs = ( ( qstr || "" ).replace( /^\?/, "" ).split( /&/ ) ),
		i, pair, n, v;

	for ( i = 0; i < nvPairs.length; i++ ) {
		var pstr = nvPairs[ i ];
		if ( pstr ) {
			pair = pstr.split( /=/ );
			n = pair[ 0 ];
			v = pair[ 1 ];
			if ( result[ n ] === undefined ) {
				result[ n ] = v;
			} else {
				if ( typeof result[ n ] !== "object" ) {
					result[ n ] = [ result[ n ] ];
				}
				result[ n ].push( v );
			}
		}
	}

	return result;
}

// The idea here is to listen for any pagebeforechange notifications from
// jQuery Mobile, and then muck with the toPage and options so that query
// params can be passed to embedded/internal pages. So for example, if a
// changePage() request for a URL like:
//
//    http://mycompany.com/myapp/#page-1?foo=1&bar=2
//
// is made, the page that will actually get shown is:
//
//    http://mycompany.com/myapp/#page-1
//
// The browser's location will still be updated to show the original URL.
// The query params for the embedded page are also added as a property/value
// object on the options object. You can access it from your page notifications
// via data.options.pageData.
$( document ).bind( "pagebeforechange", function( e, data ) {

	// We only want to handle the case where we are being asked
	// to go to a page by URL, and only if that URL is referring
	// to an internal page by id.

	if ( typeof data.toPage === "string" ) {
		var u = $.mobile.path.parseUrl( data.toPage );
		if ( $.mobile.path.isEmbeddedPage( u ) ) {

			// The request is for an internal page, if the hash
			// contains query (search) params, strip them off the
			// toPage URL and then set options.dataUrl appropriately
			// so the location.hash shows the originally requested URL
			// that hash the query params in the hash.

			var u2 = $.mobile.path.parseUrl( u.hash.replace( /^#/, "" ) );
			if ( u2.search ) {
				if ( !data.options.dataUrl ) {
					data.options.dataUrl = data.toPage;
				}
				data.options.pageData = queryStringToObject( u2.search );
				data.toPage = u.hrefNoHash + "#" + u2.pathname;
			}
		}
	}
});

})( jQuery, window );

var matches=[],linkHome="",translationStrings={},lang="en";function getLanguage(){if(navigator&&navigator.userAgent&&(lang=navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i)))lang=lang[1];!lang&&navigator&&(navigator.language?lang=navigator.language:navigator.browserLanguage?lang=navigator.browserLanguage:navigator.systemLanguage?lang=navigator.systemLanguage:navigator.userLanguage&&(lang=navigator.userLanguage),lang=lang.substr(0,2));return lang}
function initializeStore(){var a=localStorage.getItem("matches");a?matches=JSON.parse(a):localStorage.setItem("matches",JSON.stringify(matches))}
function archive(){0===matches.length?($("#archive-list").html(""),$("#archive-list").append('<li class="no-matches">No Matches added yet</li>')):($("#archive-list").html(""),$.each(matches,function(a){var c,d,b="match";"single"==matches[a].type?(c=matches[a].team1[0],d=matches[a].team2[0],c=c+" vs. "+d):"double"==matches[a].type?(c=matches[a].team1[0]+" & "+matches[a].team1[1],d=matches[a].team2[0]+" & "+matches[a].team2[1],c=c+" vs. "+d):"triple"==matches[a].type&&(c=matches[a].team1[0],d=matches[a].team2[0],
team3String=matches[a].team3[0],c=c+" vs. "+d+" vs. "+team3String,b="match-triple");d=new Date(matches[a].date);var f="OPEN";matches[a].closed&&(f="CLOSED");$("#archive-list").append('<li><a href="'+b+".html?id="+a+'"><h3>'+c+'</h3><p class="ui-li-desc date">'+d.toDateString().substr(4)+" "+d.toLocaleTimeString()+'</p><p "class="ui-li-desc '+f+'">Match: '+f+'</p></a><a id="delete-'+a+'" title="Remove this Match" href="delete-match.html?id='+a+'" data-split-icon="true" data-icon="delete" data-split-theme="e" data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="span" data-icon="false" data-iconpos="false" data-theme="c"></a></li>')}));
$("#archive-list").listview("refresh")}function localizeArchive(){$("#archive h1").html(translationStrings.matchList);$("#new-match-link .ui-btn-text").text(translationStrings.match);$(".no-matches").text(translationStrings.noMatches);$(".OPEN").text(translationStrings.matchOpen);$(".CLOSED").text(translationStrings.matchClosed)}
$(function(){$(document).bind("pagechange",function(){linkHome="file:"===window.location.protocol?"index.html":"/";$(".home-link").attr("href",linkHome)});document.addEventListener("deviceready",function(){lang=getLanguage();"it"==lang&&($.getJSON("it.json",function(a){$.each(a,function(a,d){translationStrings[a]=d})}),localizeArchive());"file:"===window.location.protocol&&Cordova.exec(null,null,"AdMob","loadAd",[])},!1);$("#new-single").live("pageinit",function(){"it"===lang&&($("#new-single h1").html(translationStrings.newMatch),
$("label[for=player1]").html(translationStrings.player1),$("label[for=player2]").html(translationStrings.player2),$("#player1").attr("placeholder",translationStrings.player1),$("#player2").attr("placeholder",translationStrings.player2))});$("#new-double").live("pageinit",function(){"it"===lang&&($("#new-double h1").html(translationStrings.newMatch),$("label[for=player1]").html(translationStrings.team1),$("label[for=player2]").html(translationStrings.team2),$("#player1").attr("placeholder",translationStrings.player1),
$("#player2").attr("placeholder",translationStrings.player2),$("#player3").attr("placeholder",translationStrings.player3),$("#player4").attr("placeholder",translationStrings.player4))});$("#new-triple").live("pageinit",function(){"it"===lang&&($("#new-triple h1").html(translationStrings.newMatch),$("label[for=player1]").html(translationStrings.player1),$("label[for=player2]").html(translationStrings.player2),$("label[for=player3]").html(translationStrings.player3),$("#player1").attr("placeholder",
translationStrings.player1),$("#player2").attr("placeholder",translationStrings.player2),$("#player3").attr("placeholder",translationStrings.player3))});$("#new, #new-single, #new-double, #new-triple").live("pageinit",function(){var a="Player Names cannot be empty",c="Got it";"it"===lang&&($("#new h1").html(translationStrings.newMatch),$("#submit .ui-btn-text").text(translationStrings.save),$(".match-type div").first().text(translationStrings.matchType),$("#single .ui-btn-text").text(translationStrings.singleMatch),
$("#double .ui-btn-text").text(translationStrings.doubleMatch),$("#triple .ui-btn-text").text(translationStrings.threeMatch),a=translationStrings.matchWarning,c="Ok");$("#new-match-form").submit(function(){return!1});$("#new-single #submit").click(function(d){var b={},f=$("#player1").val(),e=$("#player2").val(),g=[];""==f||""==e?$("html").simpledialog2({mode:"blank",headerText:"Warning",headerClose:!0,blankContent:'<div data-role="content"><p>'+a+"</p><a rel='close' data-role='button' href='#'>"+
c+"</a></div>"}):(f=[f],e=[e],b.type="single",b.date=new Date,b.team1=f,b.team2=e,b.games=g,matches.push(b),localStorage.setItem("matches",JSON.stringify(matches)),$.mobile.changePage("match.html?id="+(matches.length-1)),d.preventDefault())});$("#new-double #submit").click(function(d){var b={},f=$("#player1").val(),e=$("#player2").val(),g=$("#player3").val(),n=$("#player4").val(),k=[];""==f||""==e||""==g||""==n?$("html").simpledialog2({mode:"blank",headerText:"Warning",headerClose:!0,blankContent:'<div data-role="content"><p>'+
a+"</p><a rel='close' data-role='button' href='#'>"+c+"</a></div>"}):(f=[f,e],g=[g,n],b.type="double",b.date=new Date,b.team1=f,b.team2=g,b.games=k,matches.push(b),localStorage.setItem("matches",JSON.stringify(matches)),$.mobile.changePage("match.html?id="+(matches.length-1)),d.preventDefault())});$("#new-triple #submit").click(function(d){var b={},f=$("#player1").val(),e=$("#player2").val(),g=$("#player3").val(),n=[];""==f||""==e||""==g?$("html").simpledialog2({mode:"blank",headerText:"Warning",
headerClose:!0,blankContent:'<div data-role="content"><p>'+a+"</p><a rel='close' data-role='button' href='#'>"+c+"</a></div>"}):(f=[f],e=[e],g=[g],b.type="triple",b.date=new Date,b.team1=f,b.team2=e,b.team3=g,b.games=n,matches.push(b),localStorage.setItem("matches",JSON.stringify(matches)),$.mobile.changePage("match-triple.html?id="+(matches.length-1)),d.preventDefault())})});$("#match").live("pageshow",function(a){var c="No Games added yet",d="MATCH CLOSED";"it"===lang&&($("#match h1").html(translationStrings.match),
c=translationStrings.noGames,$("#new-game-link .ui-btn-text").text(translationStrings.game),d="PARTITA CHIUSA");var b=document.URL.split("?").pop();if(void 0!==b){var f=b.substr(3),b=b.substr(0,2);if(void 0!==f&"id"==b){b=matches[f];"single"==matches[f].type?(a=b.team1[0],b=b.team2[0]):(a=b.team1[0]+" & "+b.team1[1],b=b.team2[0]+" & "+b.team2[1]);$("#new-game-link").attr("href","newgame.html?id="+f);if(0===matches[f].games.length)$("#game-list").html(""),$("#game-list").append("<li>"+c+"</li>"),$("#game-list").prepend('<li data-role="list-divider" class="divider-center"><div class="ui-grid-a" align="center"><div class="ui-block-a">'+
a+'</div><div class="ui-block-b">'+b+"</div></div></li>");else{$("#game-list").html("");var e=0,g=0;$.each(matches[f].games,function(a){var b=matches[f].games[a],c=parseInt(b[0].closing)+parseInt(b[0].points),b=parseInt(b[1].closing)+parseInt(b[1].points);e+=parseInt(c);g+=parseInt(b);$("#game-list").append('<li><a href="edit-game.html?id='+f+"&game_id="+a+'"><div class="ui-grid-a" align="center"><div class="ui-block-a">'+c+'</div><div class="ui-block-b">'+b+"</div></div></a></li>")});$("#game-list").prepend('<li data-role="list-divider" class="divider-center"><div class="ui-grid-a" align="center"><div class="ui-block-a">'+
a+": "+parseInt(e)+'</div><div class="ui-block-b">'+b+": "+parseInt(g)+"</div></div></li>");(2005<=e||2005<=g)&&$("#game-list").prepend('<li data-role="list-divider" class="divider-center">'+d+"</li>")}$("#game-list").listview("refresh")}else $.mobile.changePage(linkHome),a.preventDefault()}else $.mobile.changePage(linkHome),a.preventDefault()});$("#match-triple").live("pageshow",function(a){var c="No Games added yet",d="MATCH CLOSED";"it"===lang&&($("#match h1").html(translationStrings.match),c=
translationStrings.noGames,$("#new-game-link .ui-btn-text").text(translationStrings.game),d="PARTITA CHIUSA");var b=document.URL.split("?").pop();if(void 0!==b){var f=b.substr(3),b=b.substr(0,2);if(void 0!==f&"id"==b){var e=matches[f],a=e.team1[0],b=e.team2[0],e=e.team3[0];$("#new-game-link").attr("href","newgame-triple.html?id="+f);if(0===matches[f].games.length)$("#game-list").html(""),$("#game-list").append("<li>"+c+"</li>"),$("#game-list").prepend('<li data-role="list-divider" class="divider-center"><div class="ui-grid-b" align="center"><div class="ui-block-a">'+
a+'</div><div class="ui-block-b">'+b+'</div><div class="ui-block-c">'+e+"</div></div></li>");else{$("#game-list").html("");var g=0,n=0,k=0;$.each(matches[f].games,function(a){var b=matches[f].games[a],c=parseInt(b[0].closing)+parseInt(b[0].points),d=parseInt(b[1].closing)+parseInt(b[1].points),b=parseInt(b[2].closing)+parseInt(b[2].points);g+=parseInt(c);n+=parseInt(d);k+=parseInt(b);$("#game-list").append('<li><a href="edit-game-triple.html?id='+f+"&game_id="+a+'"><div class="ui-grid-b" align="center"><div class="ui-block-a">'+
c+'</div><div class="ui-block-b">'+d+'</div><div class="ui-block-c">'+b+"</div></div></a></li>")});$("#game-list").prepend('<li data-role="list-divider" class="divider-center"><div class="ui-grid-b" align="center"><div class="ui-block-a">'+a+": "+parseInt(g)+'</div><div class="ui-block-b">'+b+": "+parseInt(n)+'</div><div class="ui-block-c">'+e+": "+parseInt(k)+"</div></div></li>");(2005<=g||2005<=n||2005<=k)&&$("#game-list").prepend('<li data-role="list-divider" class="divider-center">'+d+"</li>")}$("#game-list").listview("refresh")}else $.mobile.changePage(linkHome),
a.preventDefault()}else $.mobile.changePage(linkHome),a.preventDefault()});$("#archive").live("pageshow",function(){archive();"it"===lang&&localizeArchive()});$("#new-game").live("pageinit",function(){var a=document.URL.split("?")[1].substr(3),c,d,b="Every field is empty.",f="Got it";void 0!==a&&("it"===lang&&($("#new-game h1").html(translationStrings.newGame),$(".closing-points").html(translationStrings.closingPoints),$(".card-points").html(translationStrings.cardPoints),$("#submit-game .ui-btn-text").text(translationStrings.save),
b=translationStrings.gameWarning,f="Ok"),d=matches[a],"single"==matches[a].type?(c=d.team1[0],d=d.team2[0]):(c=d.team1[0]+" & "+d.team1[1],d=d.team2[0]+" & "+d.team2[1]));$(".team1").html(c);$(".team2").html(d);$("#submit-game").click(function(c){if(void 0!==a){var d,n,k,l;""==$.trim($("#closing1").val())?d=0:d=$.trim($("#closing1").val());""==$.trim($("#points1").val())?n=0:n=$.trim($("#points1").val());""==$.trim($("#closing2").val())?k=0:k=$.trim($("#closing2").val());""==$.trim($("#points2").val())?
l=0:l=$.trim($("#points2").val());if(0==d&&0==k&&0==n&&0==l)$("html").simpledialog2({mode:"blank",headerText:"Warning",headerClose:!0,blankContent:'<div data-role="content"><p>'+b+"</p><a rel='close' data-role='button' href='#'>"+f+"</a></div>"});else if(isNaN(d)||isNaN(k)||isNaN(n)||isNaN(l))$("html").simpledialog2({mode:"blank",headerText:"Warning",headerClose:!0,blankContent:"<div data-role=\"content\"><p>Values must be numeric.</p><a rel='close' data-role='button' href='#'>"+f+"</a></div>"});
else{var h={},i={};h.closing=d;h.points=n;i.closing=k;i.points=l;matches[a].games.push([h,i]);var j=0,m=0;$.each(matches[a].games,function(b){var c=matches[a].games[b],b=parseInt(c[0].closing)+parseInt(c[0].points),c=parseInt(c[1].closing)+parseInt(c[1].points);j+=parseInt(b);m+=parseInt(c)});if(2005<=j||2005<=m)matches[a].closed=!0;localStorage.setItem("matches",JSON.stringify(matches));$.mobile.changePage("match.html?id="+a);c.preventDefault()}}})});$("#new-game-triple").live("pageinit",function(){var a=
document.URL.split("?")[1].substr(3),c,d,b="Every field is empty.",f="Got it";if(void 0!==a){"it"===lang&&($("#new-game h1").html(translationStrings.newGame),$(".closing-points").html(translationStrings.closingPoints),$(".card-points").html(translationStrings.cardPoints),$("#submit-game .ui-btn-text").text(translationStrings.save),b=translationStrings.gameWarning,f="Ok");var e=matches[a];c=e.team1[0];d=e.team2[0];team3String=e.team3[0]}$(".team1").html(c);$(".team2").html(d);$(".team3").html(team3String);
$("#submit-game").click(function(c){if(void 0!==a){var d,e,l,h,i,j;""==$.trim($("#closing1").val())?d=0:d=$.trim($("#closing1").val());""==$.trim($("#points1").val())?e=0:e=$.trim($("#points1").val());""==$.trim($("#closing2").val())?l=0:l=$.trim($("#closing2").val());""==$.trim($("#points2").val())?h=0:h=$.trim($("#points2").val());""==$.trim($("#closing3").val())?i=0:i=$.trim($("#closing3").val());""==$.trim($("#points3").val())?j=0:j=$.trim($("#points3").val());if(0==d&&0==l&&0==i&&0==e&&0==h&&
0==j)$("html").simpledialog2({mode:"blank",headerText:"Warning",headerClose:!0,blankContent:'<div data-role="content"><p>'+b+"</p><a rel='close' data-role='button' href='#'>"+f+"</a></div>"});else if(isNaN(d)||isNaN(l)||isNaN(i)||isNaN(e)||isNaN(h)||isNaN(j))$("html").simpledialog2({mode:"blank",headerText:"Warning",headerClose:!0,blankContent:"<div data-role=\"content\"><p>Values must be numeric.</p><a rel='close' data-role='button' href='#'>"+f+"</a></div>"});else{var m={},p={},q={};m.closing=d;
m.points=e;p.closing=l;p.points=h;q.closing=i;q.points=j;matches[a].games.push([m,p,q]);var r=0,s=0,t=0;$.each(matches[a].games,function(b){var c=matches[a].games[b],b=parseInt(c[0].closing)+parseInt(c[0].points),d=parseInt(c[1].closing)+parseInt(c[1].points),c=parseInt(c[2].closing)+parseInt(c[2].points);r+=parseInt(b);s+=parseInt(d);t+=parseInt(c)});if(2005<=r||2005<=s||2005<=t)matches[a].closed=!0;localStorage.setItem("matches",JSON.stringify(matches));$.mobile.changePage("match-triple.html?id="+
a);c.preventDefault()}}})});$("#edit-game").live("pageshow",function(){var a=document.URL.split("?").pop().split("&"),c=a[0].substr(3),d=a[1].substr(8),b="Every field is empty.",f="Got it";if(void 0!==c&&void 0!==d){"it"===lang&&($("#edit-game h1").html(translationStrings.editGame),$(".closing-points").html(translationStrings.closingPoints),$(".card-points").html(translationStrings.cardPoints),$("#submit-edit-game .ui-btn-text").text(translationStrings.save),b=translationStrings.gameWarning,f="Ok");
var e;e=matches[c];"single"==e.type?(a=e.team1[0],e=e.team2[0]):(a=e.team1[0]+" & "+e.team1[1],e=e.team2[0]+" & "+e.team2[1]);$(".team1").html(a);$(".team2").html(e);a=matches[c].games[d];$("#edit-closing1").val(a[0].closing);$("#edit-points1").val(a[0].points);$("#edit-closing2").val(a[1].closing);$("#edit-points2").val(a[1].points);$("#submit-edit-game").click(function(a){var e,k,l,h;""==$.trim($("#edit-closing1").val())?e=0:e=$.trim($("#edit-closing1").val());""==$.trim($("#edit-points1").val())?
k=0:k=$.trim($("#edit-points1").val());""==$.trim($("#edit-closing2").val())?l=0:l=$.trim($("#edit-closing2").val());""==$.trim($("#edit-points2").val())?h=0:h=$.trim($("#edit-points2").val());if(0==e&&0==l&&0==k&&0==h)$("html").simpledialog2({mode:"blank",headerText:"Warning",headerClose:!0,blankContent:'<div data-role="content"><p>'+b+"</p><a rel='close' data-role='button' href='#'>"+f+"</a></div>"});else if(isNaN(e)||isNaN(l)||isNaN(k)||isNaN(h))$("html").simpledialog2({mode:"blank",headerText:"Warning",
headerClose:!0,blankContent:"<div data-role=\"content\"><p>Values must be numeric.</p><a rel='close' data-role='button' href='#'>"+f+"</a></div>"});else{var i={},j={};i.closing=e;i.points=k;j.closing=l;j.points=h;matches[c].games[d]=[i,j];var m=0,p=0;$.each(matches[c].games,function(a){var b=matches[c].games[a],a=parseInt(b[0].closing)+parseInt(b[0].points),b=parseInt(b[1].closing)+parseInt(b[1].points);m+=parseInt(a);p+=parseInt(b)});matches[c].closed=2005<=m||2005<=p?!0:!1;localStorage.setItem("matches",
JSON.stringify(matches));$.mobile.changePage("match.html?id="+c);a.preventDefault()}})}});$("#edit-game-triple").live("pageshow",function(){var a=document.URL.split("?").pop().split("&"),c=a[0].substr(3),d=a[1].substr(8),b="Every field is empty.",f="Got it";if(void 0!==c&&void 0!==d){"it"===lang&&($("#edit-game h1").html(translationStrings.editGame),$(".closing-points").html(translationStrings.closingPoints),$(".card-points").html(translationStrings.cardPoints),$("#submit-edit-game .ui-btn-text").text(translationStrings.save),
b=translationStrings.gameWarning,f="Ok");var e,g;g=matches[c];a=g.team1[0];e=g.team2[0];g=g.team3[0];$(".team1").html(a);$(".team2").html(e);$(".team3").html(g);a=matches[c].games[d];$("#edit-closing1").val(a[0].closing);$("#edit-points1").val(a[0].points);$("#edit-closing2").val(a[1].closing);$("#edit-points2").val(a[1].points);$("#edit-closing3").val(a[2].closing);$("#edit-points3").val(a[2].points);$("#submit-edit-game").click(function(a){var e,g,h,i,j,m;""==$.trim($("#edit-closing1").val())?e=
0:e=$.trim($("#edit-closing1").val());""==$.trim($("#edit-points1").val())?g=0:g=$.trim($("#edit-points1").val());""==$.trim($("#edit-closing2").val())?h=0:h=$.trim($("#edit-closing2").val());""==$.trim($("#edit-points2").val())?i=0:i=$.trim($("#edit-points2").val());""==$.trim($("#edit-closing3").val())?j=0:j=$.trim($("#edit-closing3").val());""==$.trim($("#edit-points3").val())?m=0:m=$.trim($("#edit-points3").val());if(0==e&&0==h&&0==j&&0==g&&0==i&&0==m)$("html").simpledialog2({mode:"blank",headerText:"Warning",
headerClose:!0,blankContent:'<div data-role="content"><p>'+b+"</p><a rel='close' data-role='button' href='#'>"+f+"</a></div>"});else if(isNaN(e)||isNaN(h)||isNaN(j)||isNaN(g)||isNaN(i)||isNaN(m))$("html").simpledialog2({mode:"blank",headerText:"Warning",headerClose:!0,blankContent:"<div data-role=\"content\"><p>Values must be numeric.</p><a rel='close' data-role='button' href='#'>"+f+"</a></div>"});else{var p={},q={},r={};p.closing=e;p.points=g;q.closing=h;q.points=i;r.closing=j;r.points=m;matches[c].games[d]=
[p,q,r];var s=0,t=0,u=0;$.each(matches[c].games,function(a){var b=matches[c].games[a],a=parseInt(b[0].closing)+parseInt(b[0].points),d=parseInt(b[1].closing)+parseInt(b[1].points),b=parseInt(b[2].closing)+parseInt(b[2].points);s+=parseInt(a);t+=parseInt(d);u+=parseInt(b)});matches[c].closed=2005<=s||2005<=t||2005<=u?!0:!1;localStorage.setItem("matches",JSON.stringify(matches));$.mobile.changePage("match-triple.html?id="+c);a.preventDefault()}})}});$("#confirm-remove-match").live("pageshow",function(){"it"===
lang&&($("#confirm-remove-match h1").html(translationStrings.confirm),$("#confirm-message").html(translationStrings.reallyDelete),$("#no-thanks .ui-btn-text").text(translationStrings.noThanks),$("#confirm-delete-match .ui-btn-text").text(translationStrings.yesThanks));$("#confirm-delete-match").click(function(a){var c=document.URL.split("?")[1].substr(3).split("#")[0];matches.splice(c,1);localStorage.setItem("matches",JSON.stringify(matches));$.mobile.changePage(linkHome);a.preventDefault()})});$("#help").live("pageshow",
function(){"it"===lang&&$("#help-text").html('<p>Per ulteriori informazioni sul punteggio del Burraco, vai su <a rel="external" href="http://it.wikipedia.org/wiki/Burraco#Punteggio">Wikipedia</a></p> ')})});

