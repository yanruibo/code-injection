
/* Copyright (c) 2012 Mobile Developer Solutions. All rights reserved.
 * This software is available under the MIT License:
 * The MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

$(document).ready(function() {   
    $('.api-div').hide();
    $('.api-div#api-intro').show();
    
    $('#intro').click(function(event) {
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);            
    });
    
    $('div ul li a').click(function(event) {
        event.preventDefault();
        //alert('clicked : ' + $(this).attr('href'));
        var attrhref = $(this).attr('href');

        if (attrhref.indexOf("#api-") !== 0) {
            return;
        }
        
        // hide all div's, show only this one
        $('.api-div').hide();
        $(attrhref).show();

        // if small screen and portrait - close after tap
        var disp = $('ul #listdivider').css("display");
        //alert(disp + ' : ' + attrhref);
        if (disp === 'none') {
            $('div.ui-collapsible').trigger("collapse");
        } else {
            $.mobile.silentScroll(0);            
        }
    }); 
    
    $('#listdivider').click(function() {
        event.preventDefault();
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);
    });
    

});




		$(document).bind("mobileinit", function(){
	  		$.mobile.touchOverflowEnabled = true;
	  		$.mobile.defaultPageTransition = "none";
	  		$.mobile.defaultDialogTransition = "none";
		});
		
		
    

















// Obtiene los par�metros pasados por la url
function getUrlParams() {
	var Url = location.href;
	if (Url.indexOf("?") != -1) {
		Url = Url.replace(/.*\?(.*?)/,"$1");
		Variables = Url.split ("&");
		for (var i = 0; i < Variables.length; i++) { 
			Separ = Variables[i].split("="); 
			eval (Separ[0]+'="'+Separ[1]+'"');
		}
	}
}

// Escribe en la memoria interna
function writeLocalStorage(key, value) {
    window.localStorage.setItem(key, value);
}

// Lee de la memoria interna
function readLocalStorage(key) {
    var value = window.localStorage.getItem(key);
    return value;
}

// Muestra el mensaje de cargando y bloquea la pantalla
function showLoading() {
	if ($('#block-ui').length == 0) {
		$('body').append('<div id="block-ui"></div>');
		$.mobile.showPageLoadingMsg("c", _("loading"), true);
		//$.mobile.loading('show');
		//alert("showloading");
	}
}

// Oculta el mensaje de cargando y desbloquea la pantalla
function hideLoading() {
	if ($('#block-ui').length > 0) {
		$.mobile.hidePageLoadingMsg();
		//$.mobile.loading('hide');
		//alert("hideloading");
		$('#block-ui').remove();
	}
}

function showdate(mydate, fechaConocida){
	
	var month = mydate.getMonth();
    var daym = mydate.getDate();
    if (daym < 10)
     daym = "" + daym;
    
    if (fechaConocida == 'N') {
    	var mydate1 = mydate;
    	mydate1.setDate(mydate.getDate()+1);
	    var month1 = mydate1.getMonth();
	    var daym1 = mydate1.getDate();
	    if (daym1 < 10) daym1 = "" + daym1;
	    if(month1==0){
            month1=12;
        }
        if(month==0){
            month=12;
        }
	    return daym + " " + montharray[month] + " / " + daym1 + " " + montharray[month1];

    }
    else {
    	  if(month==0){
              month=12;
          }
    	return daym + " " + montharray[month];
    }
}

function checkConnection() {
    var networkState = navigator.network.connection.type;
    if (networkState=='none') {
        alert('No ha sido posible realizar la conexión, verifique la configuración de red y vuelva a intentarlo.');
	}
}

function sumar(sum1, sum2)
{
    var resultado;
    resultado = parseInt(sum1) + parseInt(sum2);
    return resultado;
}

function restar(sum1, sum2)
{
    var resultado;
    resultado = parseInt(sum1) - parseInt(sum2);
    return resultado;
}

function loadjscssfile(src, callback){
	var s = document.createElement('script');
    document.getElementsByTagName('head')[0].appendChild(s);
    s.onload = function() {
        //callback if existent.
        if (typeof callback == "function") callback();
        callback = null;
    }
    s.onreadystatechange = function() {
        if (s.readyState == 4 || s.readyState == "complete") {
            if (typeof callback == "function") callback();
            callback = null; // Wipe callback, to prevent multiple calls.
        }
    }
    s.src = src;

}

function resetPaginaTweets(pIdImagenes, pIdTweets) {
	
	if (pIdImagenes != "") {
		$("#"+pIdImagenes+"_content").html("");
	}
	
	if (pIdTweets != "") {
		$("#"+pIdTweets).html("");
		$("#"+idListView).listview();
		$("#"+idListView).listview("refresh");
	}
	
}

// Variable que almacena la url de refresco
var refreshUrl = "";
var urlTwitterProxy = "http://www.artiic.com/soccer/soccer/TwitterProxy.php?iddivision="+appSettings.division+"&url=";

function getImages(jugadores, idCarousel) {
	
	var screenName = "";
	
	// Añadimos la lista de twitters
	$.each(jugadores, function(index, item) {
		if (item.activo) {
			if (screenName == "")
				screenName += item.twitter.substring(1);
 	 		else
 	 			screenName += "," + item.twitter.substring(1);
		}
 	});
	
	//var urlTwitter = "https://api.twitter.com/1/users/lookup.json?";
	var urlTwitter = "users/lookup.json?";
	var urlParams = "screen_name="+screenName+"&include_entities=true";
	var urlCallback = "&callback=?";
	var urlFinal = "";
	
	var output = new Object();
	var args = new Object();
	output.uuid = idCarousel;
	
	args.scrollInterval = 200;
	args.itemWidth = 70;
	args.itemHeight = 70;
	args.showNav = false;
	
	//var image = new Object();
	
	output.args = args;
	
	urlFinal = urlTwitterProxy + urlTwitter + urlParams + urlCallback;
	
	$.ajax({
		type: "POST",
		url: urlFinal, 
		success: function(data) {	
		
	 		$.each(data, function(index, item) {
	 			$.each(jugadores, function(index, jugador){
	 				if (jugador.twitter.substring(1).toLowerCase() == item.screen_name.toLowerCase()) {
	 					jugador.image = item.profile_image_url;
	 					jugador.title = "";
	 				}
	 		 	});
	
	 		});
	 		
	 		output.value = jugadores;
	 		var carousel = new $.widgets.Carousel(output);
 		
		}
 		 				
 	});
	
}

// Funci�n que obtiene los tweets
// Par�metros:
// - fromList: array que contiene los la info de los twitters que queremos mostrar (id, nombre, activo (si se muestra o no))
// - since: fecha de inicio. Formato yyyy-mm-dd (opcional)
// - until: fecha de fin. Formato yyyy-mm-dd (opcional)
// - refresh: booleano que indica si vamos a hacer un refresco de la lista actual
// - idListView: id del listView donde cargaremos la lista de tuits
// - extraTwitters: array que contiene twitters extras que se quieran a�adir
// Tenemos dos opciones para hacer la carga de tuits:
// 1) En una primera carga, pasamos el fromList, since i until
// 2) Si queremos hacer un refresco de la lista, pasamos el refreshUrl
function getTweets(fromList, since, until, refresh, idListView, extraTwitters, hashTagList) {

	//BYPASS Para 2 selecciones con el mismo twitter
	if (fromList.length == 2) {
		if (fromList[0].twitter == fromList[1].twitter) {
			fromList.splice(1,1);
		}
		
	}
	
	//var urlTwitter = "http://search.twitter.com/search.json";
	var urlTwitter = "search/tweets.json";
	var urlParams = "&result_type=recent&rpp=50";
	var urlCallback = "&callback=?";
	var urlFinal = "";
	var urlFrom = "";
	var urlInterval = "";
	var screenname = "";
	var tweet = "";
	var avatar = "";
	var created_at = "";
	var auxList = "";
	var image = null;
	var imageList = [];
	
	// Si es un refresh, refrescamos la consulta anterior
 	if (refresh) {
 		urlFinal = urlTwitterProxy + urlTwitter + encodeURIComponent(refreshUrl) + urlCallback;
 	}
 	// Si no, si tenemos la lista de twitters a mostrar, montamos la url de b�squeda
 	else if (fromList.length != 0 || extraTwitters.length != 0 || hashTagList.length != 0) {
 		
 		// Primero borramos la lista que tenemos antes de cargar de nuevo
 		$("#"+idListView).html('');
 		$("#"+idListView).listview();
		$("#"+idListView).listview("refresh");
		
 		// A�adimos la lista de twitters
 		$.each(fromList, function(index, item){
 			if (item.activo) {
 				if (urlFrom == "")
 	 	 			urlFrom += "from%3A" + item.twitter.substring(1);
 	 	 		else
 	 	 			urlFrom += "%20OR%20from%3A" + item.twitter.substring(1);
 			}
 	 	});
 		
 		$.each(extraTwitters, function(index, item){
			if (urlFrom == "")
 	 			urlFrom += "from%3A" + item;
 	 		else
 	 			urlFrom += "%20OR%20from%3A" + item;
 	 	});
 		
 		//A�adimos la busqueda de TAGS
 		$.each(hashTagList, function(index, item){
			if (urlFrom == "")
 	 			urlFrom += item;
 	 		else
 	 			urlFrom += "%20OR%20" + item;
 	 	});
 	 	
 		// A�adimos la fecha de inicio de b�squeda
 	 	if (since != "") {
 	 		urlInterval += "%20since%3A" + since;
 	 	}
 	 	
 	 	// A�adimos la fecha de fin de b�squeda
 	 	if (until != "") {
 	 		urlInterval += "%20until%3A" + until;
 	 	}
 	
 	 	// Montamos la url definitiva de b�squeda si hay elementos from sobre los que buscar
 	 	if (urlFrom != "") {
 	 		urlFinal = urlTwitterProxy + urlTwitter + "?q=" + encodeURIComponent(urlFrom + urlInterval) + urlParams + urlCallback;
 	 	}
 	 	
 	}
 	
 	// Si tenemos la urlFinal montada, hacemos la b�squeda
 	if (urlFinal != "") {
 		
 		// Mostramos imagen cargando
 		showLoading();
 		
 		$.ajax({
 			type: "POST",
 			url: urlFinal, 
 			success: function(data) {
 		
			refreshUrl = data.search_metadata.refresh_url;
			
			$.each(data.statuses, function(index, item) {
     					
     			screenname  = item.user.name;
        		tweet       = item.text;
        		avatar     	= item.user.profile_image_url;
        		created_at  = item.created_at.split(" ");
        		created_at  = created_at[1] + " " + created_at[2] + " " + getHoraZonaUsuario(created_at[2], created_at[1], created_at[5], created_at[3]);
        		
        		// Montamos el elemento de la lista con la info del tweet
        		// filtrando los replies
        		if (tweet.substring(0, 1) != "@") {
        			auxList += '<li id="' + item.id_str + '" class="ui-li ui-li-static ui-body-c ui-li-has-thumb ui-corner-top tweetItem"><img class="ui-li-thumb ui-corner-tl" src="'+avatar+'"><p class="ui-li-desc"><strong>'+screenname+'</strong></p><p class="ui-li-desc listTwitterMarginTop">'+tweet+'</p><p class="ui-li-desc listTwitterMarginTop">'+created_at+'</p></li>';
        		}
        		
     		});
     		
     		// A�adimos el contenido de la lista al listView
     		$("#"+idListView).prepend(auxList);
     		
     		// Refrescamos la lista
  			$("#"+idListView).listview();
        	$("#"+idListView).listview("refresh");
        	
        	// Ocultamos imagen cargando
     		hideLoading();
        	
     	},
     	error: function(data, text, a) {
     		// Ocultamos imagen cargando
     		hideLoading();
     		alert("Se ha producido un error al obtener los tweets");
     	}
     	});
 		
 	}

}

// Funci�n que marca como favorito un tweet
function getTweet(idTweet) {
	
	//alert("idTweet: " + idTweet);
	var urlTwitter = "https://api.twitter.com/1.1/statuses/show.json?id=" + idTweet + "&callback=?";
	
	var oauth;
    var requestParams;
    var options = { 
            consumerKey: 'uE7nD2vATy4DVFGjBpFIgA',
            consumerSecret: 'QnDibubELt3PkT29j7LcmhKQVkDE5XX5LAd4ivlkM',
            callbackUrl: 'http://www.artiic.com/twittercallback/?' };
    var mentionsId = 0;
    var localStoreKey = "twitterkey";
    
    // Check for access token key/secret in localStorage
    var storedAccessData, rawData = localStorage.getItem(localStoreKey);
    if (rawData !== null) {
        storedAccessData = JSON.parse(rawData);                 
        options.accessTokenKey = storedAccessData.accessTokenKey;
        options.accessTokenSecret = storedAccessData.accessTokenSecret;
          
        console.log("AppLaudLog: Attemping oauth with stored token key/secret");           
        oauth = OAuth(options);
        
        oauth.get(urlTwitter,
        		function(data) {
                	//alert("exito");
        			var replaceString = data.text.replace("(","");
        			replaceString = replaceString.replace(")", "");
        			replaceString = replaceString.replace(";", "");
        			var datatext = $.parseJSON(replaceString);
                	
                	//alert("favorited: " + datatext.favorited);
            		//alert("retweeted: " + datatext.retweeted);
            		
            		username	= datatext.user.name;
            		userscreenname = datatext.user.screen_name;
            		tweet		= datatext.text;
            		avatar     	= datatext.user.profile_image_url;
            		created_at  = datatext.created_at.split(" ");
            		created_at  = created_at[2] + " " + created_at[1] + " " + getHoraZonaUsuario(created_at[2], created_at[1], created_at[5], created_at[3]);
            		
            		$("#tweetAvatar").attr("src", avatar);
            		$("#tweetUser").html("<strong>"+username+"</strong>");
            		$("#tweetText").text(tweet);
            		$("#tweetFecha").text(created_at);
            		$("#userScreenName").val(userscreenname);
            		
            		// Si es favorito o retuiteado, lo marcamos
            		if (datatext.favorited) {
            			$("#imgFav").attr("src", "app/img/favorite_on.png");
            			$(document).on("click", "#imgFav", function(){ unsetFavorite(idTweet); });
            		}
            		else {
            			$("#imgFav").attr("src", "app/img/favorite.png");
            			$(document).on("click", "#imgFav", function(){ setFavorite(idTweet); });
            		}
            		
            		if (datatext.retweeted) {
            			$("#imgRetweet").attr("src", "app/img/retweet_on.png");
            			//$(document).off("click", "#imgRetweet");
            			//$("#imgRetweet").off("click", "**");
            		}
            		else {
            			$("#imgRetweet").attr("src", "app/img/retweet.png");
            			$(document).on("click", "#imgRetweet", function(){ doRetweet(idTweet); });
            			//$("#imgRetweet").on("click", function(){ doRetweet(idTweet); });
            		}
            		
                },
                function(data) { 
                	alert(_("errorDetTweet") + data.text);
                }
        ); 
        
    }
    else {
    	alert(_("noLogin"));
    	$.mobile.changePage("#settings");
    }
    
}

//Funci�n que marca como favorito un tweet
function setFavorite(idTweet) {
	
	var urlTwitter = "https://api.twitter.com/1.1/favorites/create.json?id=" + idTweet;
	
	var oauth;
    var requestParams;
    var options = { 
            consumerKey: 'uE7nD2vATy4DVFGjBpFIgA',
            consumerSecret: 'QnDibubELt3PkT29j7LcmhKQVkDE5XX5LAd4ivlkM',
            callbackUrl: 'http://www.artiic.com/twittercallback/?' };
    var mentionsId = 0;
    var localStoreKey = "twitterkey";
    
    // Check for access token key/secret in localStorage
    var storedAccessData, rawData = localStorage.getItem(localStoreKey);
    if (rawData !== null) {
        storedAccessData = JSON.parse(rawData);                 
        options.accessTokenKey = storedAccessData.accessTokenKey;
        options.accessTokenSecret = storedAccessData.accessTokenSecret;
          
        console.log("AppLaudLog: Attemping oauth with stored token key/secret");           
        oauth = OAuth(options);
        
        oauth.post(urlTwitter,
        		"",
                function(data) {
                	//alert("exito set favorite");
                	
                	$("#imgFav").attr("src", "app/img/favorite_on.png");
                	$(document).off("click", "#imgFav");
        			$(document).on("click", "#imgFav", function(){ unsetFavorite(idTweet); });
                	
                },
                function(data) { 
                	alert(_("errorFavorito") + data.text);
                }
        ); 
        
    }
    else {
    	alert(_("noLogin"));
    	$.mobile.changePage("#settings");
    }
    
}

//Funci�n que desmarca como favorito un tweet
function unsetFavorite(idTweet) {
	
	var urlTwitter = "https://api.twitter.com/1.1/favorites/destroy.json?id=" + idTweet;
	
	var oauth;
    var requestParams;
    var options = { 
            consumerKey: 'uE7nD2vATy4DVFGjBpFIgA',
            consumerSecret: 'QnDibubELt3PkT29j7LcmhKQVkDE5XX5LAd4ivlkM',
            callbackUrl: 'http://www.artiic.com/twittercallback/?' };
    var mentionsId = 0;
    var localStoreKey = "twitterkey";
    
    // Check for access token key/secret in localStorage
    var storedAccessData, rawData = localStorage.getItem(localStoreKey);
    if (rawData !== null) {
        storedAccessData = JSON.parse(rawData);                 
        options.accessTokenKey = storedAccessData.accessTokenKey;
        options.accessTokenSecret = storedAccessData.accessTokenSecret;
          
        console.log("AppLaudLog: Attemping oauth with stored token key/secret");           
        oauth = OAuth(options);
        
        oauth.post(urlTwitter,
        		"",
                function(data) {
                	//alert("exito unset favorite");
                	
                	$("#imgFav").attr("src", "app/img/favorite.png");
                	$(document).off("click", "#imgFav");
        			$(document).on("click", "#imgFav", function(){ setFavorite(idTweet); });
                	
                },
                function(data) { 
                	alert(_("errorNoFavorito") + data.text);
                }
        ); 
        
    }
    else {
    	alert(_("noLogin"));
    	$.mobile.changePage("#settings");
    }
    
}

//Funci�n que hace retweet de un tweet
function doRetweet(idTweet) {
	
	var urlTwitter = "https://api.twitter.com/1.1/statuses/retweet/" + idTweet + ".json";
	
	var oauth;
    var requestParams;
    var options = { 
            consumerKey: 'uE7nD2vATy4DVFGjBpFIgA',
            consumerSecret: 'QnDibubELt3PkT29j7LcmhKQVkDE5XX5LAd4ivlkM',
            callbackUrl: 'http://www.artiic.com/twittercallback/?' };
    var mentionsId = 0;
    var localStoreKey = "twitterkey";
    
    // Check for access token key/secret in localStorage
    var storedAccessData, rawData = localStorage.getItem(localStoreKey);
    if (rawData !== null) {
        storedAccessData = JSON.parse(rawData);                 
        options.accessTokenKey = storedAccessData.accessTokenKey;
        options.accessTokenSecret = storedAccessData.accessTokenSecret;
          
        console.log("AppLaudLog: Attemping oauth with stored token key/secret");         
        oauth = OAuth(options);
        
        oauth.post(urlTwitter,
        		"",
                function(data) {
                	
                	$("#imgRetweet").attr("src", "app/img/retweet_on.png");
                	$(document).off("click", "#imgRetweet");
        			
                },
                function(data) { 
                	alert(_("errorRetweet") + data.text);
                }
        ); 
        
    }
    else {
    	alert(_("noLogin"));
    	$.mobile.changePage("#settings");
    }
    
}

function updateTweet(textTweet, inReplyTo) {
	
	var oauth;
    var requestParams;
    var options = { 
            consumerKey: 'uE7nD2vATy4DVFGjBpFIgA',
            consumerSecret: 'QnDibubELt3PkT29j7LcmhKQVkDE5XX5LAd4ivlkM',
            callbackUrl: 'http://www.artiic.com/twittercallback/?' };
    var mentionsId = 0;
    var localStoreKey = "twitterkey";
    
    // Check for access token key/secret in localStorage
    var storedAccessData, rawData = localStorage.getItem(localStoreKey);
    if (rawData !== null) {
        storedAccessData = JSON.parse(rawData);                 
        options.accessTokenKey = storedAccessData.accessTokenKey;
        options.accessTokenSecret = storedAccessData.accessTokenSecret;
          
        console.log("AppLaudLog: Attemping oauth with stored token key/secret");           
        oauth = OAuth(options);
        
        if (inReplyTo == "") {
        	oauth.post('https://api.twitter.com/1/statuses/update.json',
    	            { 'status' : textTweet,  // jsOAuth encodes for us
    				  'trim_user' : 'true' },
    	            function(data) {
    	                alert("Se ha publicado con �xito el mensaje en twitter");
    	            },
    	            function(data) { 
    	                alert("No se ha publicado con �xito el mensaje en twitter -> " + data.text);
    	            }
    	    );
        }
        else {
        	oauth.post('https://api.twitter.com/1.1/statuses/update.json',
    	            { 'status' : textTweet,  // jsOAuth encodes for us
        			  'in_reply_to_status_id' : inReplyTo,
    				  'trim_user' : 'true' },
    	            function(data) {
    	                alert(_("updateTweetOK"));
    	            },
    	            function(data) { 
    	                alert(_("updateTweetNOK") + data.text);
    	            }
    	    );
        }
	
    }
    else {
    	alert(_("noLogin"));
    	$.mobile.changePage("#settings");
    }
}


// Funci�n que calcula la fecha y hora local del usuario
function getHoraZonaUsuario(dia, mes, anyo, hora) {

	var utcOffset = - new Date().getTimezoneOffset();
	var mesNum = getMesFromString(mes);
	var arrayHoraMinSeg = hora.split(":");
	var hora = parseInt(arrayHoraMinSeg[0]);
	var minutos = parseInt(arrayHoraMinSeg[1]);
	var segundos = parseInt(arrayHoraMinSeg[2]);
	
	var fechaHoraUsuario = new Date(anyo, mesNum, dia, hora, minutos, segundos);
	
	fechaHoraUsuario.setMinutes(fechaHoraUsuario.getMinutes() + utcOffset);
	return fechaHoraUsuario.toTimeString().split(" ")[0];
}

// Funci�n que retorna el entero del mes a partir del string
function getMesFromString(mesStr) {
	switch (mesStr) {
		case "Jan":
			return 1;
			break;
		case "Feb":
			return 2;
			break;
		case "Mar":
			return 3;
			break;
		case "Apr":
			return 4;
			break;
		case "May":
			return 5;
			break;
		case "Jun":
			return 6;
			break;
		case "Jul":
			return 7;
			break;
		case "Aug":
			return 8;
			break;
		case "Sep":
			return 9;
			break;
		case "Oct":
			return 10;
			break;
		case "Nov":
			return 11;
			break;
		case "Dec":
			return 12;
			break;
	}
}

function logoutTwitter() {
	var localStoreKey = "twitterkey";
	localStorage.removeItem(localStoreKey);
}

function getStatusTwitter() {
	var resultado = false;
	var localStoreKey = "twitterkey";
	var rawData = localStorage.getItem(localStoreKey);
	
	if (rawData !== null) {
		storedAccessData = JSON.parse(rawData);                 
        resultado = true;
    }
	else {
		resultado = false;
	}
	
	return resultado;
	
}

function loginTwitter() {
	
	 var oauth;
	    var requestParams;
	    var options = { 
	            consumerKey: 'uE7nD2vATy4DVFGjBpFIgA',
	            consumerSecret: 'QnDibubELt3PkT29j7LcmhKQVkDE5XX5LAd4ivlkM',
	            callbackUrl: 'http://www.artiic.com/twittercallback/?' };
	    var localStoreKey = "twitterkey";
	    
	    // Buscamos si tenemos la info del login guardada en la memoria del tel�fono
	    var storedAccessData, rawData = localStorage.getItem(localStoreKey);
	
	if (rawData !== null) {
		localStorage.removeItem(localStoreKey);
        options.accessTokenKey = '';
        options.accessTokenSecret = '';
        oauth.post('http://api.twitter.com/1/account/end_session.json',
                {}, function(data) {
                    console.log("User ended session");
                }, function(data) {
                    console.log("Error: End session");
                });
	}
	// Si no est� loginado, hacemos el login
	else {
		// Callback del childBrowser (despu�s que el usuario introduzca sus datos de login)
        if (typeof window.plugins.childBrowser.onLocationChange !== "function") {
            window.plugins.childBrowser.onLocationChange = function(loc){
                console.log("onLocationChange : " + loc);
                // Si el usuario clica "No, gracias"
                if (loc.indexOf("http://www.artiic.com/twittercallback/?denied") >= 0) {
                    window.plugins.childBrowser.close();
                    return;
                }

                // Si el usuario va a la p�gina de la aplicaci�n, no cerramos el navegador
                if (loc === "http://www.artiic.com/") {
                    return;
                }
                
                // Si el usuario introduce sus datos y hace el login
                if (loc.indexOf("http://www.artiic.com/twittercallback/?") >= 0) {
                    var index, verifier = '';            
                    var params = loc.substr(loc.indexOf('?') + 1);
                    
                    params = params.split('&');
                    for (var i = 0; i < params.length; i++) {
                        var y = params[i].split('=');
                        if(y[0] === 'oauth_verifier') {
                            verifier = y[1];
                        }
                    }
               
                    // Exchange request token for access token
                    oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier='+verifier+'&'+requestParams,
                            function(data) {               
                                var accessParams = {};
                                var qvars_tmp = data.text.split('&');
                                for (var i = 0; i < qvars_tmp.length; i++) {
                                    var y = qvars_tmp[i].split('=');
                                    accessParams[y[0]] = decodeURIComponent(y[1]);
                                }
                                console.log(accessParams.oauth_token + ' : ' + accessParams.oauth_token_secret);
                                oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);
                                
                                // Guardamos la info del login en la memoria del tel�fono
                                var accessData = {};
                                accessData.accessTokenKey = accessParams.oauth_token;
                                accessData.accessTokenSecret = accessParams.oauth_token_secret;
                                console.log("Storing token key/secret in localStorage");
                                localStorage.setItem(localStoreKey, JSON.stringify(accessData));

                                // Hacemos el login
                                oauth.get('https://api.twitter.com/1.1/account/verify_credentials.json?skip_status=true',
                                        // Si login OK
                                		function(data) {
      
                                            console.log("screen_name: " + entry.screen_name);
                                        },
                                        // Si login NOK
                                        function(data) { 
                                        	alert('Se ha producido un error al hacer el login de twitter. Int�ntalo de nuevo.'); 
                                            console.log("Error " + data); 
                                        }
                                );                                         
                                window.plugins.childBrowser.close();
                        },
                        function(data) { 
                            console.log("1 Error " + data); 
                            window.plugins.childBrowser.close();
                        }
                    );
                }
            };  
        } // end if
        
        // Abrimos la ventana del childbrowser para que el usuario introduzca sus datos
        oauth = OAuth(options);
        oauth.get('https://api.twitter.com/oauth/request_token',
                function(data) {
                    requestParams = data.text;
                    console.log("requestParams: " + data.text);
                    window.plugins.childBrowser.showWebPage('https://api.twitter.com/oauth/authorize?'+data.text, 
                            { showLocationBar : false });                    
                },
                function(data) { 
                    alert('Error : No Authorization'); 
                    console.log("2 Error " + data); 
                    alert('Se ha producido un error al hacer el login de twitter. Int�ntalo de nuevo.');
                }
        );
	}
}

// Funci�n que gestiona el login de twitter
/*function loginTwitter() {
    var oauth;
    var requestParams;
    var options = { 
            consumerKey: 'uE7nD2vATy4DVFGjBpFIgA',
            consumerSecret: 'QnDibubELt3PkT29j7LcmhKQVkDE5XX5LAd4ivlkM',
            callbackUrl: 'http://www.artiic.com/twittercallback/?' };
    var localStoreKey = "twitterkey";
    
    // Buscamos si tenemos la info del login guardada en la memoria del tel�fono
    var storedAccessData, rawData = localStorage.getItem(localStoreKey);
    // Si hay info, hacemos el login
    if (rawData !== null) {
        storedAccessData = JSON.parse(rawData);                 
        options.accessTokenKey = storedAccessData.accessTokenKey;
        options.accessTokenSecret = storedAccessData.accessTokenSecret;
        
        console.log("Attemping oauth with stored token key/secret");
        oauth = OAuth(options);
        oauth.get('https://api.twitter.com/1/account/verify_credentials.json?skip_status=true',
                function(data) {
                    var entry = JSON.parse(data.text);
                    console.log("Success getting credentials. screen_name: " + entry.screen_name);
                    
                    $("#textTwitter").text(entry.screen_name);
                },
                function(data) { 
                    alert('Se ha producido un error al hacer el login de twitter. Int�ntalo de nuevo.');
                    options.accessTokenKey = '';
                    options.accessTokenSecret = '';
                    localStorage.removeItem(localStoreKey);
                    //$("#textTwitter").text("Loginate!!");
                    console.log("No Authorization from localStorage data"); 
                }
        );
    } 
    // Si no, mostramos el literal para loginarse
    else {
    	$("#textTwitter").text("Loginate!!");
        console.log("No localStorage data");
    }

    // Funci�n del touchstart del bot�n de login
    $("#loginTwitter a").touchstart(function() { 
    	// Si est� loginado, preguntamos si quiere cerrar la sesi�n
    	// A�ADIR UN DIALOG!!
    	if (rawData !== null) {
    		localStorage.removeItem(localStoreKey);
            options.accessTokenKey = '';
            options.accessTokenSecret = '';
            oauth.post('http://api.twitter.com/1/account/end_session.json',
                    {}, function(data) {
                        console.log("User ended session");
                    }, function(data) {
                        console.log("Error: End session");
                    });
    	}
    	// Si no est� loginado, hacemos el login
    	else {
    		// Callback del childBrowser (despu�s que el usuario introduzca sus datos de login)
            if (typeof window.plugins.childBrowser.onLocationChange !== "function") {
                window.plugins.childBrowser.onLocationChange = function(loc){
                    console.log("onLocationChange : " + loc);
      
                    // Si el usuario clica "No, gracias"
                    if (loc.indexOf("http://www.artiic.com/twittercallback/?denied") >= 0) {
                        window.plugins.childBrowser.close();
                        return;
                    }

                    // Si el usuario va a la p�gina de la aplicaci�n, no cerramos el navegador
                    if (loc === "http://www.artiic.com/") {
                        return;
                    }
                    
                    // Si el usuario introduce sus datos y hace el login
                    if (loc.indexOf("http://www.artiic.com/twittercallback/?") >= 0) {
                        var index, verifier = '';            
                        var params = loc.substr(loc.indexOf('?') + 1);
                        
                        params = params.split('&');
                        for (var i = 0; i < params.length; i++) {
                            var y = params[i].split('=');
                            if(y[0] === 'oauth_verifier') {
                                verifier = y[1];
                            }
                        }
                   
                        // Exchange request token for access token
                        oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier='+verifier+'&'+requestParams,
                                function(data) {               
                                    var accessParams = {};
                                    var qvars_tmp = data.text.split('&');
                                    for (var i = 0; i < qvars_tmp.length; i++) {
                                        var y = qvars_tmp[i].split('=');
                                        accessParams[y[0]] = decodeURIComponent(y[1]);
                                    }
                                    console.log(accessParams.oauth_token + ' : ' + accessParams.oauth_token_secret);
                                    oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);
                                    
                                    // Guardamos la info del login en la memoria del tel�fono
                                    var accessData = {};
                                    accessData.accessTokenKey = accessParams.oauth_token;
                                    accessData.accessTokenSecret = accessParams.oauth_token_secret;
                                    console.log("Storing token key/secret in localStorage");
                                    localStorage.setItem(localStoreKey, JSON.stringify(accessData));

                                    // Hacemos el login
                                    oauth.get('https://api.twitter.com/1/account/verify_credentials.json?skip_status=true',
                                            // Si login OK
                                    		function(data) {
                                                var entry = JSON.parse(data.text);
                                                $('#textTwitter').html(entry.screen_name);
                                                console.log("screen_name: " + entry.screen_name);
                                            },
                                            // Si login NOK
                                            function(data) { 
                                            	alert('Se ha producido un error al hacer el login de twitter. Int�ntalo de nuevo.'); 
                                                console.log("Error " + data); 
                                            }
                                    );                                         
                                    window.plugins.childBrowser.close();
                            },
                            function(data) { 
                                console.log("1 Error " + data); 
                                window.plugins.childBrowser.close();
                            }
                        );
                    }
                };  
            } // end if
            
            // Abrimos la ventana del childbrowser para que el usuario introduzca sus datos
            oauth = OAuth(options);
            oauth.get('https://api.twitter.com/oauth/request_token',
                    function(data) {
                        requestParams = data.text;
                        console.log("requestParams: " + data.text);
                        window.plugins.childBrowser.showWebPage('https://api.twitter.com/oauth/authorize?'+data.text, 
                                { showLocationBar : false });                    
                    },
                    function(data) { 
                        alert('Error : No Authorization'); 
                        console.log("2 Error " + data); 
                        alert('Se ha producido un error al hacer el login de twitter. Int�ntalo de nuevo.');
                    }
            );
    	}
    });

}*/

// Captura los touchstart de los tweets de la lista
$(".tweetItem").live('click', function () {
	
	idTweet = $(this).attr("id");
	
	$.mobile.changePage("#tweet");
});


 /*********************************/
/**			VARIABLES			**/ 
/*********************************/

// Guarda el país
var pais = appSettings.pais;
var liga = appSettings.liga;
var division = appSettings.division;
var tipoTorneo = appSettings.torneo;

/* MODO DE LA APP */
var modo = appSettings.modo; //0 : FREE, 1: PREMIUM

// Guarda el id de la listView donde se monta la lista de tuits
var idListView = "";

// Guarda el equipo seleccionado en la pantalla de equipos
var equipo = "";

// El id del equipo guardado como favorito
var miEquipo = "";

//El nombre del equipo, para mostrar en la cabecera
var nombreEquipo = "";

// El nombre de la clave con el que se graba el equipo en la memoria interna
var claveEquipoFavorito = "miEquipo";

//Array que guarda la info del channel de notificaciones para cada equipo
// Contiene channel y alerta (true o false según si está suscrito o no)
var equiposNotificaciones = [];

/** DATOS PARA PARTIDO**/
var equiposPartido = [];

/** DATOS PARA PARTIDO LIVE **/
//Guarda la info de los equipos
//Es un array de objetos que contienen nombre, twitter, escudo, y si el equipo est� activo o no (se muestran sus tuits o no)
var equipos = [];

//Twitter de la eurocopa que se mostrar� en todos los partidos
var extraTwitters = appSettings.extraTwitters;

//Guarda el resultado/hora del partido
//var resultado = "";
var idPartido = "";
var idLocal = "";
var idVisitante = "";

//Indica si venimos de una notificacion o de navegacion normal
var isNavegacion = false;

//Guarda el id del tweet seleccionado
var idTweet = "";

// Variables para hacer tweet
var defaultTextTweet = ""; // Guarda el texto a mostrar inicialmente al twittear
var tweetInReplyTo = ""; // Guarda el id del tweet al que se responde (vacío si no se responde)

var grupoSel = "";

/*********************************/
/**			LISTENERS			**/ 
/*********************************/

//En la pantalla inicial tenemos que usar el evento onDeviceReady, para esperar a que cargue la parte nativa
if (appSettings.pruebas) {
	$(document).ready(onDeviceReady);
}
else {
	document.addEventListener("deviceready", onDeviceReady, false);
}

document.addEventListener("backbutton", function(e){
    if($.mobile.activePage.is('#index')){
        e.preventDefault();
        navigator.app.exitApp();
    }
    else if($.mobile.activePage.is('#settings')){
    	$.mobile.changePage("#index");
    }
    // Si estamos en la pantalla de partido live tenemos que hacer lo que haya definido en el boton de back
    else if($.mobile.activePage.is('#partidoLive')){
    	$("#backPartidoLive").click();
    }
    else {
        navigator.app.backHistory();
    }
}, false);

$(document).on("pageinit", "#settings", function() {
    initSettings();
});

$(document).on("pagebeforeshow", "#noticias", function() {
    initNoticias();
});

$(document).on("pageinit", "#equipos", function() {
    initEquipos();
});

$(document).on("pagebeforeshow", "#equipo", function() {
    initEquipo();
});

$(document).on("pageinit", "#tabla", function() {
	if (tipoTorneo == "L") {
		initClasificacion();
	}
	else {
		
		initClasificacionGrupo("A");
		initCabeceraGrupo();
	}
    initGoleadores();
});

/*$(document).on("pageinit", "#goleadores", function() {
    initGoleadores();
});*/

$(document).on("pageinit", "#calendario", function() {
    
	cargarJornadas();
	initCalendario();
    
    $("#jornada").change(function() {
    	$("#jornadaAnt").off("touchstart");
		$("#jornadaSig").off("touchstart");
		writeLocalStorage("jornada", $("#jornada").val());
		$("#timelineCalendario").empty();
		initCalendario();
	});
});

$(document).on("pagebeforeshow", "#calendarioLive", function() {
    initCalendarioLive();
    $("#refreshButtonCalendarioLive").touchstart(function () {
    	initCalendarioLive();
	});
});

$(document).on("pageinit", "#miEquipo", function() {
    initMiEquipo();
});

$(document).on("pageinit", "#notificaciones", function() {
    initNotificaciones();
});

$(document).on("pagebeforeshow", "#partidoLive", function() {
    initPartidoLive();
});

$(document).on("pagebeforeshow", "#partido", function() {
    initPartido();
});

$(document).on("pagebeforeshow", "#dialog_twitter", function() {
    initTwitterDialog();
});

$(document).on("pagebeforeshow", "#tweet", function() {
	initTweet();
});

$(document).on("pageinit", "#rankingMiEquipo", function() {
    initRankingMiEquipo();
});
	
/*********************************/
/**			INDEX				**/ 
/*********************************/

function onDeviceReady() {
	
	try {
		FB.init({
			appId : appSettings.facebookId,
			nativeInterface : CDV.FB,
			useCachedDialogs : false
		});
	} catch (e) {
		alert(e);
	}
	
	//Free: No se marca ninguna opci�n
	//if (modo == 1) {
		initPush();
	//}
	
	//Recuperamos el idioma;
	
	
	if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
		$("#jornadas_btn")
		.bind("touchstart", function () {
			 	$(this).addClass("jornadas_selected").removeClass("jornadas");
		})
		.bind("touchend", function() {
 				$(this).addClass("jornadas").removeClass("jornadas_selected");
		})
		.bind("touchcancel", function() {
 				$(this).addClass("jornadas").removeClass("jornadas_selected");
		});
		
		$("#noticias_btn")
		.bind("touchstart", function () {
			 	$(this).addClass("noticias_selected").removeClass("noticias");
		})	
		.bind("touchend", function() {
 				$(this).addClass("noticias").removeClass("noticias_selected");
		})
		.bind("touchcancel", function() {
 				$(this).addClass("noticias").removeClass("noticias_selected");
		});
		
		$("#clasificacion_btn")
		.bind("touchstart", function () {
			 	$(this).addClass("clasificacion_selected").removeClass("clasificacion");
		})
		.bind("touchend", function() {
 				$(this).addClass("clasificacion").removeClass("clasificacion_selected");
		})
		.bind("touchcancel", function() {
 				$(this).addClass("clasificacion").removeClass("clasificacion_selected");
		});
		
		$("#equipos_btn")
		.bind("touchstart", function () {
			 	$(this).addClass("equipos_selected").removeClass("equipos");
		})
		.bind("touchend", function() {
 				$(this).addClass("equipos").removeClass("equipos_selected");
		})
		.bind("touchcancel", function() {
 				$(this).addClass("equipos").removeClass("equipos_selected");
		});
		
		$("#miequipo_btn")
		.bind("touchstart", function () {
			 	$(this).addClass("miequipo_selected").removeClass("miequipo");
		})
		.bind("touchend", function() {
 				$(this).addClass("miequipo").removeClass("miequipo_selected");
		})
		.bind("touchcancel", function() {
 				$(this).addClass("miequipo").removeClass("miequipo_selected");
		});
		
		$("#envivo_btn")
		.bind("touchstart", function () {
			 	$(this).addClass("envivo_selected").removeClass("envivo");
		})
		.bind("touchend", function() {
 				$(this).addClass("envivo").removeClass("envivo_selected");
		})
		.bind("touchcancel", function() {
 				$(this).addClass("envivo").removeClass("envivo_selected");
		});
		
		$("#notificaciones_btn")
		.bind("touchstart", function () {
			 	$(this).addClass("notificaciones_selected").removeClass("notificaciones");
		})
		.bind("touchend", function() {
 				$(this).addClass("notificaciones").removeClass("notificaciones_selected");
		})
		.bind("touchcancel", function() {
 				$(this).addClass("notificaciones").removeClass("notificaciones_selected");
		});
		
		$("#pichichi_btn")
		.bind("touchstart", function () {
			 	$(this).addClass("pichichi_selected").removeClass("pichichi");
		})
		.bind("touchend", function() {
 				$(this).addClass("pichichi").removeClass("pichichi_selected");
		})
		.bind("touchcancel", function() {
 				$(this).addClass("pichichi").removeClass("pichichi_selected");
 			});
 
  		$("#login_btn")
		.bind("touchstart", function () {
			 	$(this).addClass("login_selected").removeClass("login");
		})
		.bind("touchend", function() {
 				$(this).addClass("login").removeClass("login_selected");
		})
		.bind("touchcancel", function() {
 				$(this).addClass("login").removeClass("login_selected");
		});
	
	}
	 
	window.plugins.artiic.getIdioma(function(r){
		loadjscssfile("js/lang/lang-"+r+".js", function () {
			
			translate();
			cordova.exec(null, null, 'CustomSplashScreen', 'hide', []);
		});
 		
 		
	},function(e){console.log(e);});
	 		
	 
	// Comprobamos la conexión
	
	checkConnection();

}

function initPush() {
	
	/*
	//if (readLocalStorage("tratarNotif") == null) {
		window.plugins.artiic.getStateNotification("bilbao",function(r){writeLocalStorage("bilbao", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("atletico",function(r){writeLocalStorage("atletico", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("barcelona",function(r){writeLocalStorage("barcelona", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("betis",function(r){writeLocalStorage("betis", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("celta",function(r){writeLocalStorage("celta", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("elche",function(r){writeLocalStorage("elche", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("espanyol",function(r){writeLocalStorage("espanyol", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("getafe",function(r){writeLocalStorage("getafe", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("granada",function(r){writeLocalStorage("granada", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("levante",function(r){writeLocalStorage("levante", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("malaga",function(r){writeLocalStorage("malaga", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("almeria",function(r){writeLocalStorage("almeria", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("osasuna",function(r){writeLocalStorage("osasuna", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("rayo",function(r){writeLocalStorage("rayo", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("madrid",function(r){writeLocalStorage("madrid", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("realsociedad",function(r){writeLocalStorage("realsociedad", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("sevilla",function(r){writeLocalStorage("sevilla", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("valencia",function(r){writeLocalStorage("valencia", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("valladolid",function(r){writeLocalStorage("valladolid", r);},function(e){console.log(e);});
		window.plugins.artiic.getStateNotification("villarreal",function(r){writeLocalStorage("villarreal", r);},function(e){console.log(e);});
		//writeLocalStorage("tratarNotif", true);
	//}
	*/
	
	$.each(appSettings.equiposCanales, function(index,item) {
		window.plugins.artiic.getStateNotification(item,function(r){writeLocalStorage(item, r);},function(e){console.log(e);});
	});
	 
}

/*********************************/
/**			SETTINGS			**/ 
/*********************************/

function initSettings() {
	
	window.plugins.artiic.getSettings(function(data) {
		if (data.vibracion) {
			var myNewValue = 'on';
	        $('#toggleswitch1').val(myNewValue).slider("refresh");
		}
		if (data.sonido) {
			var myNewValue = 'on';
	        $('#toggleswitch2').val(myNewValue).slider("refresh");
		}
	}, function(e){console.log(e);});
	
	
//	if (readLocalStorage("vibracion")!=null && readLocalStorage("vibracion")=="true") {
//
//        
//	}
//
//	if (readLocalStorage("sonido")!=null && readLocalStorage("sonido")=="true") {
//
//        var myNewValue = 'on';
//        $('#toggleswitch2').val(myNewValue).slider("refresh");
//	}
	
	
	
	FB.getLoginStatus(function(response) {
    	if (response.status == 'connected') {
    		var myNewValue = 'on';
    		$('#fb_login').val(myNewValue).slider("refresh");
    	}
	});
	
	var twitterState = getStatusTwitter();
	if (twitterState == true) {
		var myNewValue = 'on';
		$('#twitter_login').val(myNewValue).slider("refresh");
	}
	
	setSettings();
}

function setSettings() {
    $('#toggleswitch2').change(function() {
        var myswitch = $(this);
        var showSonido =	true;

        if(myswitch[0].selectedIndex != 1) { 
        	showSonido =false;
        	writeLocalStorage("sonido", false);
        }else{
        	writeLocalStorage("sonido", true);
        }
    	window.plugins.artiic.activarSonido(showSonido,function(r){
    		    	
    	},function(e){console.log(e);});
    });
        
    $('#toggleswitch1').change(function() {
        var myswitch = $(this);
        var showVibracion = true;
        if(myswitch[0].selectedIndex != 1) { 
        	showVibracion =false;
        	writeLocalStorage("vibracion", false);   
          }else{
        	writeLocalStorage("vibracion", true);     
          }
           	window.plugins.artiic.activarVibracion(showVibracion,function(r){
    	},function(e){console.log(e);});
    });
    
    $('#fb_login').change(function() {
        var myswitch = $(this);
        if(myswitch[0].selectedIndex != 1) { 
        	logoutFacebook();  
          }else{
        	 loginFacebook();     
          }
         
    });
    
    $('#twitter_login').change(function() {
        var myswitch = $(this);
        if(myswitch[0].selectedIndex != 1) { 
        	logoutTwitter();  
          }else{
        	  loginTwitter();     
          }
         
    });
    
    

}

/*********************************/
/**			NOTICIAS			**/ 
/*********************************/

function initNoticias() {
	
	var urlNoticias = "http://soccer.artiic.com/soccer/artiic.php/rest/Noticias/datos/idpais/"+pais+"?callback=?";
	var noticias = [];
	
	idListView = "tweetsNoticias";
	
	// Borramos las imágenes y la lista de tweets
	resetPaginaTweets("carousel_noticias", "tweetsNoticias");
	
	// M�todo que se encargar� de capturar el touchstart de refrescar
	// y actualizar� la lista de tweets
	$("#refreshButtonNoticias").touchstart(function () {
		getTweets("", "", "", true, idListView, [], []);
	});
	
	// Obtenemos la info de las noticias
	$.getJSON(urlNoticias, function (data) {
		
		var i = 0;
		$.each(data, function (index, item) {
			
			if (item.idtwitter != null && item.idtwitter != "") {
				
				noticias[i] = {
					nombre: item.nombre,
					twitter: item.idtwitter,
					activo: true
					
				};
				
				i++;
			}
			
		});
		
		//getImages(noticias, "carousel_noticias");
		
		// Obtenemos la info de los tweets
		getTweets(noticias, "", "", false, idListView, [], []);
		
	});
	
}

/*********************************/
/**			EQUIPOS				**/ 
/*********************************/

function initEquipos() {
		
	var selecciones = appSettings.equiposNombres; 
	var idPlantilla = appSettings.equiposIds; 

	for (var i=0;i<selecciones.length;i++){ 
		 
		 if (i%4 == 0) {
	 	  	$("#timelineEquipos").append('<div class="ui-block-a" style="padding:0px 0px 10px 0px;"> '+'<a  href="javascript:seleccionarEquipo('+idPlantilla[i]+');"><img src="img/escudos/64x/'+selecciones[i]+'.png" width="" alt="image" /></a> </div>');

		 }
		 else  if (i%4 == 1) {
	 	  	$("#timelineEquipos").append('<div class="ui-block-b" style="padding:0px 0px 10px 0px;"> '+'<a  href="javascript:seleccionarEquipo('+idPlantilla[i]+');"><img src="img/escudos/64x/'+selecciones[i]+'.png" width="" alt="image" /></a> </div>');
		 } 
		else  if (i%4 == 2) {
	 	  	$("#timelineEquipos").append('<div class="ui-block-c" style="padding:0px 0px 10px 0px;"> '+'<a  href="javascript:seleccionarEquipo('+idPlantilla[i]+');"><img src="img/escudos/64x/'+selecciones[i]+'.png" width="" alt="image" /></a> </div>');
		 } 
		else  if (i%4 == 3) {
	 	  	$("#timelineEquipos").append('<div class="ui-block-d" style="padding:0px 0px 10px 0px;"> '+'<a  href="javascript:seleccionarEquipo('+idPlantilla[i]+');"><img src="img/escudos/64x/'+selecciones[i]+'.png" width="" alt="image" /></a> </div>');
		 } 

	} 
}

function seleccionarEquipo(idEquipo) {
	//writeLocalStorage("equipo", idEquipo);
	equipo = idEquipo;
	
	var guardarFavorito = false;
	
	// Si tenemos la marca de guardarFavorito, es que venimos de la selección de favorito
	if (readLocalStorage("guardarFavorito") == "SI") {
		guardarFavorito = true;
		writeLocalStorage("guardarFavorito", "NO");
	}
	
	if (guardarFavorito) {
		// Guardamos el equipo favorito en el plugin y en el localStorage
		window.plugins.artiic.setMyTeam(equipo,function(r){console.log(r);},function(e){console.log(e);});
		writeLocalStorage(claveEquipoFavorito, equipo);
	}
	
	$.mobile.changePage("#equipo");
}

/*********************************/
/**			EQUIPO				**/ 
/*********************************/

function initEquipo() {
	
	// Obtenemos el valor del id del equipo pasado por parámetro
	// Se almacena en la variable equipo
	/*if (readLocalStorage("equipo")!=null && readLocalStorage("equipo")!="") {
		equipo=readLocalStorage("equipo");
		window.localStorage.removeItem("equipo");
		cargarEquipo(equipo);
	}else{
		//equipo=readLocalStorage("miEquipo");
		window.plugins.artiic.getMyTeam(function(r){writeLocalStorage(claveEquipoFavorito, r);cargarEquipo(r);},function(e){console.log(e);});
	}*/
	
	cargarEquipo(equipo);
}

function cargarEquipo(pEquipo) {
	
	var urlJugadores = "http://soccer.artiic.com/soccer/artiic.php/rest/Jugadores/datos/idliga/"+pais+"/idclub/"+pEquipo+"?callback=?";
	var jugadores = [];
	
	idListView = "tweetsEquipo";
	
	// Borramos el nombre del equipo
	$("#nombreEquipo").text("");
	
	// Borramos las imágenes y la lista de tweets
	resetPaginaTweets("carousel_equipo", "tweetsEquipo");
	
	// Método que se encargará de capturar el touchstart de refrescar
	// y actualizará la lista de tweets
	$("#refreshButtonEquipo").touchstart(function () {
		
		getTweets("", "", "", true, idListView, [], []);
		
	});
	
	// Método que se encargará de capturar el touchstart de equipo favorito
	$("#equipoFavorito").touchstart(function () {
		
		//Recuperamos los datos en el plugin y en el localStorage
		window.plugins.artiic.setMyTeam("",function(r){console.log(r);},function(e){console.log(e);});
		writeLocalStorage(claveEquipoFavorito, "");
		$("#equipoFavorito").hide();
		$("#equipoNoFavorito").show();
		
	});
	
	// Método que se encargará de capturar el touchstart de equipo no favorito
	$("#equipoNoFavorito").touchstart(function () {
		
		//Recuperamos los datos en el plugin y en el localStorage
		window.plugins.artiic.setMyTeam(equipo,function(r){console.log(r);},function(e){console.log(e);});
		writeLocalStorage(claveEquipoFavorito, equipo);
		$("#equipoNoFavorito").hide();
		$("#equipoFavorito").show();
		
	});
	
	window.plugins.artiic.getMyTeam(function(r){writeLocalStorage(claveEquipoFavorito, r);},function(e){console.log(e);});
	miEquipo = readLocalStorage(claveEquipoFavorito);
	
	// Si el equipo ya ha sido guardado anteriormente, mostraremos el botón de favorito
	if (miEquipo != undefined && miEquipo != "" && miEquipo == equipo) {
		console.log("equipo favorito");
		$("#equipoNoFavorito").hide();
		$("#equipoFavorito").show();
	}
	else { // si no, mostraremos el de no favorito
		console.log("equipo no favorito");
		$("#equipoFavorito").hide();
		$("#equipoNoFavorito").show();
	}
	
	// Obtenemos la info de los jugadores
	$.getJSON(urlJugadores, function (data) {
		var i = 0;
		$.each(data, function (index, item) {
			
			if (item.idtwitter != null && item.idtwitter != "") {
				jugadores[i] = {
					nombre: item.nombre,
					twitter: item.idtwitter,
					activo: true
				};
				
				nombreEquipo = item.club;
				
				i++;
			}
			
		});
		
		// Ponemos el nombre del equipo en la cabecera
		$("#nombreEquipo").text(_(nombreEquipo));
		
		//getImages(jugadores, "carousel_equipo");
		
		// Obtenemos la info de los tweets
		getTweets(jugadores, "", "", false, idListView, [], []);
		
	});
	
}

/*********************************/
/**		CLASIFICACIÓN			**/ 
/*********************************/

function initClasificacion() {
	
	var urlClasificacion = "http://soccer.artiic.com/soccer/artiic.php/rest/Clasificacion/posiciones/idliga/"+liga+"?callback=?";
	
 	$.getJSON(urlClasificacion, function(data){
 		
 		var nombre = "";
 		var posicion = "";
 		var partidosJugados = "";
 		var partidosGanados = "";
 		var partidosEmpatados = "";
 		var partidosPerdidos = "";
 		var puntos = "";
 		
 		var competicion = "";
 		var pijama = "";
		
 		$("#timelineClasificacion").append('<div class="ui-block-a" style="color:#000000;background:white;" >POS</div><div class="ui-block-b" >'+_("EQUIPO")+'</div><div class="ui-block-c" >PJ</div><div class="ui-block-d" >PG</div><div class="ui-block-e" >PE</div><div class="ui-block-f" >PP</div><div class="ui-block-g" ><b>PTS</b></div></div>');
 		
	      $.each(data, function(i,item){
	    	 nombre =item.nombre;
     		 partidosJugados = item.partidosJugados;
     		 partidosGanados = item.partidosGanados;
     		 partidosEmpatados = item.partidosEmpatados;
     		 partidosPerdidos = item.partidosPerdidos;
     		 puntos = item.puntos;
     		 posicion = i+1;
     		 
     		 if (posicion <= appSettings.championsPos) {		 
     			 competicion = "ui-block-champions";
     		 }
     		 else if (posicion > appSettings.championsPos && posicion <= appSettings.europaLeaguePos) {
     			competicion = "ui-block-europaleague";
     		 }
     		 else if (posicion >= appSettings.descensoPos) {
     			competicion = "ui-block-descenso";
     		 }
     		 else {
     			competicion = "ui-block-nada";
     		 }
     		 
     		 if (posicion%2 == 1) {
     			 pijama = "ui-block-pijama";
     		 }
     		 else {
     			 pijama = "";
     		 }
     		 
       	 	  	$("#timelineClasificacion").append('<div class="ui-block-a '+competicion+'">'+ posicion +'</div><div class="ui-block-b '+ pijama+'" > '+nombre+'</div><div class="ui-block-c '+ pijama+'" > '+partidosJugados+'</div><div class="ui-block-d '+ pijama+'" > '+partidosGanados+'</div><div class="ui-block-e '+ pijama+'" > '+partidosEmpatados+'</div><div class="ui-block-f '+ pijama+'" >'+partidosPerdidos+'</div><div class="ui-block-g '+ pijama+'" ><b>'+puntos+'</b></div></div>');
   	  			
      		});

 	});
}

function initCabeceraGrupo() {
	
	var grupos = appSettings.groups;
	for (i=0;i<grupos.length;i++){ 
		 $("#fclasifGrupos").append('<div class="ui-block-'+grupos[i].toLowerCase()+'"><a data-inline="true" data-role="button" href="javascript:initClasificacionGrupo(\''+grupos[i]+'\')" data-theme="a" id="grupo'+grupos[i]+'" class="ui-btn ui-btn-inline ui-shadow ui-btn-up-c" style="width: 100%;  margin: 0px;"><span aria-hidden="true" class="ui-btn-inner " style="padding: .3em 8px;">'+grupos[i]+'</span></a></div>');
	 }
	 	
	
	var grupoSel = "A";
		$(document).ready(function() {
			
			
			$("#grupoA").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
		
			$("#grupoA").bind("click", function () {
				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
				$(this).addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
	 		});
	 		
	 		$("#grupoB").bind("click", function () {
	 			$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
				$(this).addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
	 		});
	 		
	 		$("#grupoC").bind("click", function () {
	 			$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
				$(this).addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
	 		});
	 		
	 		$("#grupoD").bind("click", function () {
	 			$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
				$(this).addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
	 		});
	 		
	 		$("#grupoE").bind("click", function () {
	 			$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
				$(this).addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
	 		});
	 		
	 		$("#grupoF").bind("click", function () {
	 			$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
				$(this).addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
	 		});
	 		
	 		$("#grupoG").bind("click", function () {
	 			$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
				$(this).addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
	 		});
	 		
	 		$("#grupoH").bind("click", function () {
	 			$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 			$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
				$(this).addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
	 		});
	 		
	 		$('div.ui-page').bind("swipeleft", function() {

	 			if (grupoSel == 'A') {
	 				getClasificacion('B');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoB").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'B';
	 			}
	 			
	 			else if (grupoSel == 'B') {
	 				getClasificacion('C');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoC").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'C';
	 			}
	 			
	 			else if (grupoSel == 'C') {
	 				getClasificacion('D');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoD").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'D';
	 			}
	 			
	 			else if (grupoSel == 'D') {
	 				getClasificacion('E');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoE").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'A';
	 			}
	 			
	 			else if (grupoSel == 'E') {
	 				getClasificacion('F');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoF").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'F';
	 			}
	 			
	 			else if (grupoSel == 'F') {
	 				getClasificacion('G');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoG").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'G';
	 			}
	 			
	 			else if (grupoSel == 'G') {
	 				getClasificacion('H');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoH").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'H';
	 			}
	 			
	 			else if (grupoSel == 'H') {
	 				getClasificacion('A');
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoA").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'A';
	 			}
	 		
				
	 		});
	 		
	 		$('div.ui-page').bind("swiperight", function() {

	 			if (grupoSel == 'A') {
	 				getClasificacion('H');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoH").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'H';
	 			}
	 			
	 			else if (grupoSel == 'B') {
	 				getClasificacion('A');
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoA").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'A';
	 			}
	 			
	 			else if (grupoSel == 'C') {
	 				getClasificacion('B');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoB").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'B';
	 			}
	 			
	 			else if (grupoSel == 'D') {
	 				getClasificacion('C');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoC").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'C';
	 			}
	 			
	 			else if (grupoSel == 'E') {
	 				getClasificacion('D');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoD").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'D';
	 			}
	 			
	 			else if (grupoSel == 'F') {
	 				getClasificacion('E');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoE").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'E';
	 			}
	 			
	 			else if (grupoSel == 'G') {
	 				getClasificacion('F');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoG").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoF").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'F';
	 			}
	 			
	 			else if (grupoSel == 'H') {
	 				getClasificacion('G');
	 				$("#grupoA").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoB").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoC").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoD").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoE").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoF").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
	 				$("#grupoH").addClass("ui-btn-up-c").removeClass("ui-btn-up-e");
					$("#grupoG").addClass("ui-btn-up-e").removeClass("ui-btn-up-c");
					grupoSel = 'G';
	 			}
	 		
				
	 		});
		});
	
}

function initClasificacionGrupo(grupo) {
	if(grupo!=grupoSel){
	if(!grupo){
			grupo="A";
		}
		    var url = "http://soccer.artiic.com/soccer/artiic.php/rest/Clasificacion/posiciones/idliga/"+liga+"/grupo/"+grupo+"?callback=?";
		    $("#timelineClasificacion").empty();
		// Mostramos imagen cargando
	 	//$.mobile.showPageLoadingMsg();
		
	     	$.getJSON(url, function(data){
	     		var nombre = "";
	     		var posicion = "";
	     		var partidosJugados = "";
	     		var partidosGanados = "";
	     		var partidosEmpatados = "";
	     		var partidosPerdidos = "";
	     		var puntos = "";
	     		
	     		var competicion = "";
	     		var pijama = "";
				
	     		
	     		$("#timelineClasificacion").append('<div class="ui-block-a" style="color:#000000;background:white;" >POS</div><div class="ui-block-b" >'+_("EQUIPO")+'</div><div class="ui-block-c" >'+_("PJ")+'</div><div class="ui-block-d" >'+_("PG")+'</div><div class="ui-block-e" >'+_("PE")+'</div><div class="ui-block-f" >'+_("PP")+'</div><div class="ui-block-g" ><b>PTS</b></div></div>');
	     		  
    		      $.each(data, function(i,item){
    		    	 nombre =item.nombre;
		     		 partidosJugados = item.partidosJugados;
		     		 partidosGanados = item.partidosGanados;
		     		 partidosEmpatados = item.partidosEmpatados;
		     		 partidosPerdidos = item.partidosPerdidos;
		     		 puntos = item.puntos;
		     		 posicion = i+1;
		     		 
		     		 if (posicion <= 2) {		 
		     			 competicion = "ui-block-champions";
		     		 }
		     		 
		     		 else {
		     			competicion = "ui-block-nada";
		     		 }
		     		 
		     		 if (posicion%2 == 1) {
		     			 pijama = "ui-block-pijama";
		     		 }
		     		 else {
		     			 pijama = "";
		     		 }
		     		 
		       	 	  	$("#timelineClasificacion").append('<div class="ui-block-a '+competicion+'">'+ posicion +'</div><div class="ui-block-b '+ pijama+'">'+_(nombre)+'</div><div class="ui-block-c '+ pijama+'" > '+partidosJugados+'</div><div class="ui-block-d '+ pijama+'" > '+partidosGanados+'</div><div class="ui-block-e '+ pijama+'" > '+partidosEmpatados+'</div><div class="ui-block-f '+ pijama+'" >'+partidosPerdidos+'</div><div class="ui-block-g '+ pijama+'" ><b>'+puntos+'</b></div></div>');
	       	  			
	          		});
    		   	

	     	});
	    	// Ocultamos imagen cargando
	     	
	     	
     		$.mobile.hidePageLoadingMsg();
     		grupoSel=grupo;
	}
	
}

/*********************************/
/**			GOLEADORES			**/ 
/*********************************/

function cambiar(pantalla){
 
    $("#"+pantalla).css("display", "block");
    $("#"+pantalla+"_h").show();
    if(pantalla=='goleadores'){
         $("#clasificacion_a").removeClass("ui-btn-active");
        $("#clasificacion").css("display", "none");
         $("#clasificacion_h").hide();
    }else{
        $("#goleadores").css("display", "none");
        $("#goleadores_a").removeClass("ui-btn-active");
       $("#goleadores_h").hide();
    }
    $("#"+pantalla+"_a").addClass("ui-btn-active");
}

function initGoleadores() {
	
	var urlGoleadores = "http://soccer.artiic.com/soccer/artiic.php/rest/Jugadores/goleadores/idliga/"+liga+"?callback=?";
	
 	$.getJSON(urlGoleadores, function(data){
 		
 		var nombre = "";
 		var goles = "";
 		var escudo = "";
 		
	      $.each(data, function(i,item){
	    	 nombre =item.nombre;
     		 goles = item.goles;
     		 escudo = item.escudo;
     		 posicion = i+1;
     		 
     		 if (i==0) {
		       	$("#timelineGoleadores").append('<div class="ui-block-a"><img src="img/escudos/64x/'+escudo+'" alt="image" width="30" height="30" style="vertical-align: middle;"/></div><div class="ui-block-b"><b>&nbsp;&nbsp;'+ nombre +'</b></div><div class="ui-block-c"><b>'+goles+'</b></div>');
			}else{
				if (i%2==0) {
		       	 	$("#timelineGoleadores").append('<div class="ui-block-a"><img src="img/escudos/64x/'+escudo+'" alt="image" width="30" height="30" style="vertical-align: middle;"/></div><div class="ui-block-b" style="color:#000000;background:white;">&nbsp;&nbsp;'+ nombre +'</div><div class="ui-block-c" style="color:#000000;background:white;"> '+goles+'</div>');
				}else {
		       	 	$("#timelineGoleadores").append('<div class="ui-block-a" style="color:#000000;background:#D8D8D8;"><img src="img/escudos/64x/'+escudo+'" alt="image" width="30" height="30" style="vertical-align: middle;"/></div><div class="ui-block-b" style="color:#000000;background:#D8D8D8;">&nbsp;&nbsp;'+ nombre +'</div><div class="ui-block-c" style="color:#000000;background:#D8D8D8;" > '+goles+'</div>');
				}
			}
   	  			
      	});

 	});
}

/*********************************/
/**			CALENDARIO			**/ 
/*********************************/

function cargarJornadas() {
	
	for (i=0; i<appSettings.jornadas.length;i++) {
		$("#jornada").append('<option value="'+appSettings.jornadas[i]+'">'+_("jornada"+appSettings.jornadasKey[i])+'</option>')
		
	}
	

}

function initCalendario(grupo) {
	var grupoSel = "A";
	 if(grupo!=grupoSel){
		   $("#timelineCalendario").empty();
		 	// Mostramos imagen cargando
			 	//showLoading();
		      
		      	if (grupo!=null) {
		      		var url = "http://soccer.artiic.com/soccer/artiic.php/rest/Jornada/faseFinal?callback=?"; 
		      		$.getJSON(url, function(data){
		
				     		var eliminatoria = "";
				     		var partidos = "";
				   
		
								var ultimaFecha = "";
				     		$("#timelineCalendario").append('<div class="ui-grid-b">');
						
			    		      $.each(data, function(i,item){
				     				 eliminatoria = item.eliminatoria;
				     				 partidos = item.partidos;
				     				 $("#timelineCalendario").append('<div class="ui-block-h"><b>'+_(eliminatoria)+'</b> </div>'); 
				     				 	var idpartido = "";
							     		var idplantillalocal = "";
							     		var idplantillavisitante = "";	
							     		var jornada = "";
							     		var fecha = "";
							     		var idliga = "";
							     		var golesLocal = "";
							     		var golesVisitante = "";
							     		var estado = "";
							     		var local = "";
							     		var visitante = "";
							     		var escudovisitante = "";
							     		var escudolocal = "";
							     		var ultimaFecha = "";
							     		
				     				  $.each(partidos, function(i2,item2){
				     				  	
	                       idpartido =item2.idpartido;
							     			 idplantillalocal = item2.idplantillalocal;
							     			 idplantillavisitante = item2.idplantillavisitante;
												 jornada = item2.jornada;
							    			 idliga =item2.idliga;
								   		 	 golesLocal = item2.golesLocal;
										 		 golesVisitante =item2.golesVisitante;
												 estado = item2.estado;
										 		 local = item2.local;
										 		 visitante = item2.visitante;
										 		 if (item2.escudolocal!=null) {
									    		 	 escudolocal = item2.escudolocal;
												} else {
													escudolocal ="incognita.png";
												}
										 		 if (item2.escudovisitante!=null) {
										 			escudovisitante = item2.escudovisitante;
												} else {
													escudovisitante ="incognita.png";
												}
				     				  
				     				  	fecha=item2.fecha;
				     				  	fechaFormateada = new Date(item2.fecha.substring(0,4),item2.fecha.substring(5,7)-1,item2.fecha.substring(8,10));
				     				  	
						     				if(fecha.substring(0,10)!=ultimaFecha.substring(0,10)){
						     					
						     				$("#timelineCalendario").append('<div class="ui-block-h">'+showdate(fechaFormateada, item2.calendario)+' </div>');

						     				$("#timelineCalendario").append('<div class="ui-block-0"><img src="app/img/play.png" alt="image" style="vertical-align: top;" /></p> </div>');
						     				$("#timelineCalendario").append('<div class="ui-block-a"><img src="img/escudos/64x/'+escudolocal+'" alt="image" style="vertical-align: top;" /></div>'); 
						     				if (golesLocal!=null) {
							       	 			  $("#timelineCalendario").append('<div class="ui-block-b" ><p><a href="javascript:seleccionarEquipoLive('+idpartido+','+idplantillalocal+','+idplantillavisitante+');" > '+golesLocal+ ' - ' +golesVisitante+'</a></p> </div>'); 
						       	  			}else{
						       	 				$("#timelineCalendario").append('<div class="ui-block-b"><p>'+fecha.substring(11,19)+'</p> </div>'); 
						       	 			}
						     					 $("#timelineCalendario").append('<div class="ui-block-c"><FONT FACE="arial" SIZE=2><p align="right">'+_(visitante)+'</FONT><img src="img/escudos/64x/'+escudovisitante+'" alt="image" width="30" height="30" align="right" />&nbsp </p></div>');

						     				}else{
						     					$("#timelineCalendario").append('<div class="ui-block-a"> <p>&nbsp<img src="img/escudos/64x/'+escudolocal+'" alt="image" style="vertical-align: top;" />&nbsp;<FONT FACE="arial" SIZE=2>'+_(local)+'</FONT></p> </div>'); 
										 	 if (golesLocal!=null) {
												 $("#timelineCalendario").append('<div class="ui-block-b" ><p><a href="javascript:seleccionarEquipoLive('+idpartido+','+idplantillalocal+','+idplantillavisitante+');" > '+golesLocal+ ' - ' +golesVisitante+'</a></p> </div>'); 
						       	 			}else{
						       	 				$("#timelineCalendario").append('<div class="ui-block-b"> <p>'+fecha.substring(11,19)+'</p> </div>'); 
						       	   			}
						     					$("#timelineCalendario").append('<div class="ui-block-c"><FONT FACE="arial" SIZE=2><p align="right">'+_(visitante)+'</FONT> <img src="img/escudos/64x/'+escudovisitante+'" alt="image" width="30" height="30" align="right"/>&nbsp</p></div>');

						     				}
											 ultimaFecha = fecha;
						          	});
					    		  $("#jornadaAnt").attr("href", "partidos.html?jornada="+restar(jornada,1));
					    		  $("#jornadaSig").attr("href", "partidos.html?jornada="+sumar(jornada,1));
						       	$("#timelineCalendario").append("</div>");
						     				});
						     	
						  	
					    		  
		
				     		

			     	});
		      		
				} else {
					var url = "http://soccer.artiic.com/soccer/artiic.php/rest/Jornada/partidos/idliga/"+liga+"?callback=?"; 
					if (readLocalStorage("jornada") != null) {
						url = "http://soccer.artiic.com/soccer/artiic.php/rest/Jornada/partidos/idliga/"+liga+"/jornada/"+readLocalStorage("jornada")+"/format/jsonp?callback=?";
						window.localStorage.removeItem("jornada");
					}
					$.getJSON(url, function(data){
			     		var idpartido = "";
			     		var idplantillalocal = "";
			     		var idplantillavisitante = "";
			     		var jornada = "";
			     		var fecha = "";
			     		var idliga = "";
			     		var golesLocal = "";
			     		var golesVisitante = "";
			     		var estado = "";
			     		var local = "";
			     		var visitante = "";
			     		var escudovisitante = "";
			     		var escudolocal = "";
			     		var resumen = "";
			     	

						var ultimaFecha = "";
			     		$("#timelineCalendario").append('<div class="ui-grid-b">');
					
						
		    		      $.each(data, function(i,item){
			     		
		    		    	 idpartido =item.idpartido;
				     			 idplantillalocal = item.idplantillalocal;
				     			 idplantillavisitante = item.idplantillavisitante;
									 jornada = item.jornada;
									 fecha = item.fecha;
				    			 fechaFormateada = new Date(item.fecha.substring(0,4),item.fecha.substring(5,7)-1,item.fecha.substring(8,10));
				    			
				    			idliga =item.idliga;
					   		 	 golesLocal = item.golesLocal;
							 		 golesVisitante =item.golesVisitante;
									 estado = item.estado;
							 		 local = item.local;
							 		 visitante = item.visitante;
				     		 	 escudovisitante = item.escudovisitante;
				    		 	 escudolocal = item.escudolocal;
				    		 	 resumen = item.resumen;
				    		 	 textoCanal = "";
				    		 	 
				    		 	 if (estado != "FT" && estado != "TR") {
				    		 		 $.each(item.canales, function(indice,canal){
					    			 
				    		 			if (indice == 0) textoCanal += "<br />";
					    			 	textoCanal += "<img src='img/canales/"+canal.imagen+"' />";
					    		 	});
				    		 	 }
				    		 	 else {
				    		 		 if (resumen != null && resumen != "") {
				    		 			textoCanal += "<a href=javascript:playVideo('"+resumen+"')><img src='app/img/play.png' width='52' height='52' alt='image' style='padding-top:10px;'/></a>";
				    		 		 }
				    		 	 }
				    		 
				    		 
			     			if(fecha.substring(0,10)!=ultimaFecha.substring(0,10)){
			     				
			     				$("#timelineCalendario").append('<div class="ui-block-h">'+showdate(fechaFormateada,item.calendario)+' </div>'); 
				  			    //$("#timeline").append('<div class="ui-block-b"> </div>'); 
			     			    //$("#timeline").append('<div class="ui-block-c"> </div>');
			     				$("#timelineCalendario").append('<div class="ui-block-a">'+textoCanal+'</div>');
			     				$("#timelineCalendario").append('<div class="ui-block-b"><img src="img/escudos/64x/'+escudolocal+'" alt="image" style="vertical-align: top;" /></div>');
			     				if (golesLocal!=null) {
				       	 			  $("#timelineCalendario").append('<div class="ui-block-c" ><FONT FACE="britannic bold" SIZE=5> <p><a href="javascript:seleccionarPartido('+idpartido+','+idplantillalocal+','+idplantillavisitante+');" > '+golesLocal+ ' - ' +golesVisitante+'</a>'+'</p> </FONT></div>'); 
			       	  			}else{
				       	  			if (item.calendario == 'S') {
			       	 					$("#timelineCalendario").append('<div class="ui-block-c"><FONT FACE="britannic bold" SIZE=4> <p>'+fecha.substring(11,19)+'</p></FONT> </div>');
			       	 				}
			       	 				else {
			       	 					$("#timelineCalendario").append('<div class="ui-block-c"><FONT FACE="britannic bold" SIZE=5> <p>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;'+'</p></FONT></div>');
			       	 				}
			       	 			}
			     					 $("#timelineCalendario").append('<div class="ui-block-d"><img src="img/escudos/64x/'+escudovisitante+'" alt="image" align="right" /></div>');
			     				}else{
			     					$("#timelineCalendario").append('<div class="ui-block-a">'+textoCanal+'</div>');
			     					$("#timelineCalendario").append('<div class="ui-block-b"> <img src="img/escudos/64x/'+escudolocal+'" alt="image" style="vertical-align: top;" /></div>'); 
							 	 if (golesLocal!=null) {
							 		$("#timelineCalendario").append('<div class="ui-block-c" ><FONT FACE="britannic bold" SIZE=5><p align="center"><a href="javascript:seleccionarPartido('+idpartido+','+idplantillalocal+','+idplantillavisitante+');" > '+golesLocal+ ' - ' +golesVisitante+'</a>'+'</p> </FONT></div>'); 
			       	 			}else{
			       	 				if (item.calendario == 'S') {
			       	 					$("#timelineCalendario").append('<div class="ui-block-c"><FONT FACE="britannic bold" SIZE=4> <p>'+fecha.substring(11,19)+'</p></FONT> </div>');
			       	 				}
			       	 				else {
			       	 					$("#timelineCalendario").append('<div class="ui-block-c"><FONT FACE="britannic bold" SIZE=5> <p>&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;'+'</p></FONT></div>');
			       	 				}
			       	   			}
			     					$("#timelineCalendario").append('<div class="ui-block-d"><img src="img/escudos/64x/'+escudovisitante+'" alt="image"  align="right"/></div>');
			     			}
			       	 			// 	$("#timeline").append('<input type="hidden" name="jornada" value="">');
								 ultimaFecha = fecha;
			          	});
		    		      
		    		      if (jornada == 1) {
					    		$("#jornadaAnt").hide();
					    	}
					    	else {
					    		$("#jornadaAnt").show();
					    	}
					    	if (jornada == appSettings.jornadas.length) {
					    		$("#jornadaSig").hide();
					    	}
					    	else {
					    		$("#jornadaSig").show();
					    	}
					    	
					    	$("#jornada").val(jornada);
					    	$("#jornada").selectmenu("refresh");

				        	$("#jornadaAnt").touchstart(function () {
				        		$("#jornadaAnt").off("touchstart");
				        		$("#jornadaSig").off("touchstart");
										writeLocalStorage("jornada", restar(jornada,1));
										//Removemos el contenido
										$("#timelineCalendario").empty();
										$("#jornada").val(readLocalStorage("jornada"));
										$("#jornada").selectmenu("refresh");
										initCalendario(null);

									});

									$("#jornadaSig").touchstart(function () {
										$("#jornadaAnt").off("touchstart");
										$("#jornadaSig").off("touchstart");
										writeLocalStorage("jornada", sumar(jornada,1));
										//Removemos el contenido
										$("#timelineCalendario").empty();
										$("#jornada").val(readLocalStorage("jornada"));
										$("#jornada").selectmenu("refresh");
										initCalendario(null);

									});
		
				       			//$("#timelineCalendario").append("</div>");

			     	});
					
				}
		      //var url = "http://soccer.artiic.com/soccer/artiic.php/rest/Jornada/partidos/jornada/1/format/jsonp?callback=?";
		      	 // Ocultamos imagen cargando
				//hideLoading();
				grupoSel=grupo;
				
				
				
	 }
	
}

function seleccionarPartido(idPartidoE,idPlantillaLocal,idPlantillaVisitante) {

	
	idPartido = idPartidoE;
	idLocal = idPlantillaLocal;
	idVisitante = idPlantillaVisitante;
	
	
	$.mobile.changePage("#partido");
	
}

/*********************************/
/**		CALENDARIO LIVE			**/ 
/*********************************/

function initCalendarioLive() {
    
	var url = "http://soccer.artiic.com/soccer/artiic.php/rest/Jornada/partidos/idliga/"+liga+"?callback=?"; 
// Mostramos imagen cargando
	showLoading();
	
	$.getJSON(url, function(data){
		var indHayPartidos =null;
		
		var idpartido = "";
		var idplantillalocal = "";
		var idplantillavisitante = "";
		var jornada = "";
		var fecha = "";
		var idliga = "";
		var golesLocal = "";
		var golesVisitante = "";
		var estado = "";
		var local = "";
		var visitante = "";
		var escudovisitante = "";
		var escudolocal = "";
		var resumen = "";
	

	var ultimaFecha = "";
	$("#timelineCalendarioLive").html('');
		$("#timelineCalendarioLive").append('<div class="ui-grid-b">');
		
	
      $.each(data, function(i,item){
    	 indHayPartidos = data.error;
    	 if (indHayPartidos != undefined) {
    		 $("#timelineCalendarioLive").append('<div align="center"><b>No hay partidos disponibles</b></div>');
			}	else{ 
    	 idpartido =item.idpartido;
 			 idplantillalocal = item.idplantillalocal;
 			 idplantillavisitante = item.idplantillavisitante;
				 jornada = item.jornada;
				 fecha = item.fecha;
			 fechaFormateada = new Date(item.fecha.substring(0,4),item.fecha.substring(5,7)-1,item.fecha.substring(8,10));
			
			idliga =item.idliga;
   		 	 golesLocal = item.golesLocal;
		 		 golesVisitante =item.golesVisitante;
				 estado = item.estado;
		 		 local = item.local;
		 		 visitante = item.visitante;
 		 	 escudovisitante = item.escudovisitante;
		 	 escudolocal = item.escudolocal;
		 	 resumen = item.resumen;
		 	 
		 	textoEstado = "";
		 	if (estado == "S") {
		 		textoEstado += "<br /><FONT FACE='arial' SIZE=3>";
		 		textoEstado += _("sinComenzar")+"</FONT>";
		 	}
		 	else if (estado == "AB") {
		 		textoEstado += "<br /><FONT FACE='arial' SIZE=3>";
			 	textoEstado += _("suspendido")+"</FONT>";
		 	}
		 	else if (estado == "FT" || estado == "TR") {
		 		if (resumen != null && resumen != "") {
		 			textoEstado += "<a href=javascript:playVideo('"+resumen+"')><img src='app/img/play.png' width='52' height='52' alt='image' style='padding-top:10px;'/></a>";
		 		 }
		 		else {
		 			textoEstado += "<br /><FONT FACE='arial' SIZE=3>";
			 		textoEstado += _("finalizado")+"</FONT>";
			 		
		 		}
		 		
		 	}
		 	else {
		 		textoEstado += "<br /><FONT FACE='arial' SIZE=3>";
		 		textoEstado += _("enJuego")+"</FONT>";
		 	}

		 	
			if(fecha.substring(0,10)!=ultimaFecha.substring(0,10)){
				
				$("#timelineCalendarioLive").append('<div class="ui-block-h">'+showdate(fechaFormateada, item.calendario)+' </div>'); 
			    //$("#timelineCalendarioLive").append('<div class="ui-block-b"> </div>'); 
			    //$("#timelineCalendarioLive").append('<div class="ui-block-c"> </div>');
				$("#timelineCalendarioLive").append('<div class="ui-block-a">'+textoEstado+'</div>');
				$("#timelineCalendarioLive").append('<div class="ui-block-b"><img src="img/escudos/64x/'+escudolocal+'" alt="image" style="vertical-align: top;" /> </div>'); 

				if (golesLocal!=null) {
   	 			  $("#timelineCalendarioLive").append('<div class="ui-block-c" ><p><FONT FACE="britannic bold" SIZE=5><a href="javascript:seleccionarEquipoLive('+idpartido+','+idplantillalocal+','+idplantillavisitante+');" > '+golesLocal+ ' - ' +golesVisitante+'</a></FONT></p> </div>'); 
	  			}else{															
	 				$("#timelineCalendarioLive").append('<div class="ui-block-c"><p><FONT FACE="britannic bold" SIZE=4><a href="javascript:seleccionarEquipoLive('+idpartido+','+idplantillalocal+','+idplantillavisitante+');" >'+fecha.substring(11,19)+'</a></FONT></p> </div>'); 
	 			}
					 $("#timelineCalendarioLive").append('<div class="ui-block-d"><img src="img/escudos/64x/'+escudovisitante+'" alt="image" align="right" /></div>');
			}else{
				$("#timelineCalendarioLive").append('<div class="ui-block-a">'+textoEstado+'</div>');
					$("#timelineCalendarioLive").append('<div class="ui-block-b"><img src="img/escudos/64x/'+escudolocal+'" alt="image" style="vertical-align: top;" /> </div>'); 
		 	 if (golesLocal!=null) {
				 $("#timelineCalendarioLive").append('<div class="ui-block-c"><p><FONT FACE="britannic bold" SIZE=5> <a href="javascript:seleccionarEquipoLive('+idpartido+','+idplantillalocal+','+idplantillavisitante+');" >'+golesLocal+ ' - ' +golesVisitante+'</a></FONT></p></div>'); 
	 			}else{
	 				$("#timelineCalendarioLive").append('<div class="ui-block-c"><p><FONT FACE="britannic bold" SIZE=4><a href="javascript:seleccionarEquipoLive('+idpartido+','+idplantillalocal+','+idplantillavisitante+');" >'+fecha.substring(11,19)+'</a></FONT></p> </div>'); 
	   			}
					$("#timelineCalendarioLive").append('<div class="ui-block-d"> <img src="img/escudos/64x/'+escudovisitante+'" alt="image" align="right"/></div>');
			}
	 			// 	$("#timelineCalendarioLive").append('<input type="hidden" name="jornada" value="">');
			 ultimaFecha = fecha;
			}
  	});
      $("#jornadaAnt").attr("href", "partidos.html?jornada="+restar(jornada,1));
      $("#jornadaSig").attr("href", "partidos.html?jornada="+sumar(jornada,1));
      $("#timelineCalendarioLive").append("</div>");

	});
	// Ocultamos imagen cargando
	hideLoading();
}

//Guarda el equipo en la memoria interna y va a la pagina del equipo
function seleccionarEquipoLive(idPartidoE,idPlantillaLocal,idPlantillaVisitante) {

	
	idPartido = idPartidoE;
	idLocal = idPlantillaLocal;
	idVisitante = idPlantillaVisitante;
	
	isNavegacion = true;
	
	$.mobile.changePage("#partidoLive");
	
}

/*********************************/
/**			PARTIDO LIVE			**/ 
/*********************************/

function cargarFBPartidoDialog() {
$("#facebook_textarea_popup").html(equipos[0].nombre + " - " + equipos[1].nombre + " " + $("#resultado").html().replace("<b>","").replace("</b>",""));
$.mobile.changePage( "#dialog_fb", { role: "dialog"} );
}

/*
function cargarTweetPartidoDialog() {
	$("#twitter_textarea_popup").html(equipos[0].nombre + " - " + equipos[1].nombre + " " + $("#resultado").html().replace("<b>","").replace("</b>",""));
	$.mobile.changePage( "#dialog_twitter", { role: "dialog"} );
}

function cargarTweetCommentDialog() {
	$("#twitter_textarea_popup").html("#"+equipos[0].hash + equipos[1].hash+"_LT ");
	$.mobile.changePage( "#dialog_twitter", { role: "dialog"} );
}
*/

function cargarEventosDialog(texto, tipo) {
	//alert (tipo);
	if (tipo == 'G') {
		$("#eventos_textarea_popup").val(_("gol") + texto);
	}
	else if (tipo == 'Y') {
		$("#eventos_textarea_popup").val(_("yellowCard") + texto);
	}
	else if (tipo == 'R') {
		$("#eventos_textarea_popup").val(_("redCard") + texto);
	}
	
	$.mobile.changePage("#dialog_eventos", {role: "dialog"} );

	//$('#dialog_eventos').dialog();

}

function updateTweetPartido() {
	
	textTweet = $("#twitter_textarea_popup").val();
	updateTweet(textTweet);
}

function updateTweetEvento() {
	
	textTweet = $("#eventos_textarea_popup").val();
	updateTweet(textTweet);
}




function cambiarPartidoLive(pantalla){
	 
    $("#"+pantalla).css("display", "block");
    if(pantalla=='comentariosUsuarios'){
         $("#comentariosOficiales_a").removeClass("ui-btn-active");
        $("#comentariosOficiales").css("display", "none");
        
        $("#eventos_a").removeClass("ui-btn-active");
        $("#eventos").css("display", "none");
    }
    else if(pantalla=='eventos'){
        $("#comentariosUsuarios").css("display", "none");
        $("#comentariosUsuarios_a").removeClass("ui-btn-active");
        
        $("#comentariosOficiales_a").removeClass("ui-btn-active");
        $("#comentariosOficiales").css("display", "none");
    }
    
    else{
    	$("#eventos_a").removeClass("ui-btn-active");
        $("#eventos").css("display", "none");
    
        $("#comentariosUsuarios").css("display", "none");
        $("#comentariosUsuarios_a").removeClass("ui-btn-active");
    }
    $("#"+pantalla+"_a").addClass("ui-btn-active");
}

function recuperarEventos() {
	
	var url = "http://soccer.artiic.com/soccer/artiic.php/rest/EventosPartidos/datosV1/idpartido/"+idPartido+"?callback=?";
	var golesLocal = 0;
	var golesVisitante = 0;
	var fecha = "";
	var marcador = "";
	var auxList = "";
	
	$("#eventosList").empty();
	$("#eventosList").listview();
		
		
 	$.getJSON(url, function(data){
 	
 		// Si no hay eventos, tenemos que consultar el servicio de jornada para obtener el resultado o la hora del partido (si no ha empezado)
 		if (data.error != undefined) {
 			var urlJornada = "http://soccer.artiic.com/soccer/artiic.php/rest/Jornada/partidos/idliga/"+liga+"?callback=?";
 			
 			$.getJSON(urlJornada, function(dataJornada){
 				$.each(dataJornada, function (i, itemJornada){
 					if (itemJornada.idpartido == idPartido) {
 						fecha = itemJornada.fecha;
 						golesLocal = itemJornada.golesLocal;
 						golesVisitante = itemJornada.golesVisitante;
 						
 						if (golesLocal != null) {
 							marcador = golesLocal + " - " + golesVisitante;
 						}
 						else {
 							marcador = fecha.substring(11, 19);
 						}
 					}
 				});
 				
 				// Informamos el marcador
 				$("#resultado").html("<b>" + marcador + "</b>");
 				
 			}); 
 		}
 		else {
 			var eventosLocal = new Array();
	 		var eventosVisitante = new Array();
	 		var l = 0;
	 		var v = 0;
			
		      $.each(data, function(i,item){
		    	 var evento = new Object();
		    	 
		    	 evento.tipo  = item.tipo;
	    		 evento.minuto = item.minuto;
	    		 evento.jugador = item.texto;
	    		 
	    		 golesLocal = item.golesLocal;
	    		 golesVisitante = item.golesVisitante;
		    	 
		    	 /*if (idLocal == item.idplantilla) {
		    		 eventosLocal[l] = evento;
		    		 l++;
		    	 }
		    	 else {
		    		 eventosVisitante[v] = evento;
		    		 v++;
		    	 }*/
		    	 
		    	 var imagen = "";
			      if (evento.tipo == 'G') {
			    		  imagen="app/img/Soccer-Ball-icon.png";
			    	  }
			    	  else  if (evento.tipo == 'Y') {
			    		  imagen="app/img/yellow.png";
			    	  }
			    	  else  if (evento.tipo == 'R') {
			    		   imagen="app/img/red.png";
			    	  }
			    	  else  if (evento.tipo == 'DY') {
			    		   imagen="app/img/Yellow-and-Red-Card.png";
			    	  }
			      if (evento.tipo == 'G' || evento.tipo == 'R' || evento.tipo == 'Y' || evento.tipo == 'DY') {
			    	  if (idLocal == item.idplantilla) {
			    		auxList +="<li><img style='float: left' src='img/escudos/64x/" + equipos[0].escudo+"' height='30px' width='30px'/><a style='min-height: 30px;padding-left: 10px;' onclick=\"javascript:cargarEventosDialog('"+evento.jugador+"','"+evento.tipo+"');\"><span style='padding-left:0px'>"+evento.jugador+"</span><img style='position:absolute;padding: 10px 0px 0px 80%;' src='"+imagen+"' /></a></li>";
			    	  }
			    	  else {
			    		auxList +="<li><img style='float: left' src='img/escudos/64x/" + equipos[1].escudo+"' height='30px' width='30px'/><a style='min-height: 30px;padding-left: 10px;' onclick=\"javascript:cargarEventosDialog('"+evento.jugador+"','"+evento.tipo+"');\"><span style='padding-left:0px'>"+evento.jugador+"</span><img style='position:absolute;padding: 10px 0px 0px 80%;' src='"+imagen+"' /></a></li>";
			    	  }
			       }
		      });
		      
		      marcador = golesLocal + " - " + golesVisitante;
		      // Informamos el marcador
		      $("#resultado").html("<b>" + marcador + "</b>");
		      
		   		$("#eventosList").prepend(auxList);
			
			// Refrescamos la lista
		   		$("#eventosList").listview();
		   		$("#eventosList").listview("refresh");
		      
		      //$("#eventos").append('<div data-role="collapsible" data-theme="b" data-content-theme="b" class="detalle"><h3>'+_('Detalle')+'</h3><fieldset class="ui-grid-a"><div class="ui-block-a local"></div><div class="ui-block-b visitante" style="text-align:right"></div></fieldset></div>');
		      
		      /*$.each(eventosLocal, function(i,eventoLocal){
		    	  	if (eventoLocal.tipo == 'G') {
		    	  		$(".local").append("<p class='ui-li-desc eventoPartido'><img src='app/img/Soccer-Ball-icon.png' /> "+eventoLocal.jugador+"</p>");
		    	  	}
		    	  	else if (eventoLocal.tipo == 'Y') {
		    	  		$(".local").append("<p class='ui-li-desc eventoPartido'><img src='app/img/yellow.png' /> "+eventoLocal.jugador+"</p>");
		    	  	}
		    	  	else if (eventoLocal.tipo == 'R') {
		    	  		$(".local").append("<p class='ui-li-desc eventoPartido'><img src='app/img/red.png' /> "+eventoLocal.jugador+"</p>");
		    	  	}
		    	  	else if (eventoLocal.tipo == 'DY') {
		    	  		$(".local").append("<p class='ui-li-desc eventoPartido'><img src='app/img/Yellow-and-Red-Card.png' /> "+eventoLocal.jugador+"</p>");
		    	  	}
			    	 
			      });
		      
		      $.each(eventosVisitante, function(i,eventoVisitante){
		    	  if (eventoVisitante.tipo == 'G') {
		    		  $(".visitante").append("<p class='ui-li-desc eventoPartido'><img src='app/img/Soccer-Ball-icon.png' /> "+eventoVisitante.jugador+"</p>");
		    	  }
		    	  else  if (eventoVisitante.tipo == 'Y') {
		    		  $(".visitante").append("<p class='ui-li-desc eventoPartido'><img src='app/img/yellow.png' /> "+eventoVisitante.jugador+"</p>");
		    	  }
		    	  else  if (eventoVisitante.tipo == 'R') {
		    		  $(".visitante").append("<p class='ui-li-desc eventoPartido'><img src='app/img/red.png' /> "+eventoVisitante.jugador+"</p>");
		    	  }
		    	  else  if (eventoVisitante.tipo == 'DY') {
		    		  $(".visitante").append("<p class='ui-li-desc eventoPartido'><img src='app/img/Yellow-and-Red-Card.png' /> "+eventoVisitante.jugador+"</p>");
		    	  }
		    	  
		    	  	
			      });*/
		      
		      	//$('div[data-role=collapsible]').collapsible();
		   
 		}
 		
 	});
 	

}

function recuperarEventosPartido() {
	
	var url = "http://soccer.artiic.com/soccer/artiic.php/rest/EventosPartidos/datosV1/idpartido/"+idPartido+"?callback=?";
	var golesLocal = 0;
	var golesVisitante = 0;
	var fecha = "";
	var marcador = "";
	var auxList = "";
	
	$("#eventosPartidoList").empty();
	$("#eventosPartidoList").listview();
		$("#eventosPartidoList").listview("refresh");
		
 	$.getJSON(url, function(data){
 	
 		// Si no hay eventos, tenemos que consultar el servicio de jornada para obtener el resultado o la hora del partido (si no ha empezado)
 		if (data.error != undefined) {
 			var urlJornada = "http://soccer.artiic.com/soccer/artiic.php/rest/Jornada/partidos/idliga/"+liga+"?callback=?";
 			
 			$.getJSON(urlJornada, function(dataJornada){
 				$.each(dataJornada, function (i, itemJornada){
 					if (itemJornada.idpartido == idPartido) {
 						fecha = itemJornada.fecha;
 						golesLocal = itemJornada.golesLocal;
 						golesVisitante = itemJornada.golesVisitante;
 						
 						if (golesLocal != null) {
 							marcador = golesLocal + " - " + golesVisitante;
 						}
 						else {
 							marcador = fecha.substring(11, 19);
 						}
 					}
 				});
 				
 				// Informamos el marcador
 				$("#resultadoPartido").html("<b>" + marcador + "</b>");
 				
 			}); 
 		}
 		else {
 			var eventosLocal = new Array();
	 		var eventosVisitante = new Array();
	 		var l = 0;
	 		var v = 0;
			
		      $.each(data, function(i,item){
		    	 var evento = new Object();
		    	 
		    	 evento.tipo  = item.tipo;
	    		 evento.minuto = item.minuto;
	    		 evento.jugador = item.texto;
	    		 
	    		 golesLocal = item.golesLocal;
	    		 golesVisitante = item.golesVisitante;
		    	 
		    	 /*if (idLocal == item.idplantilla) {
		    		 eventosLocal[l] = evento;
		    		 l++;
		    	 }
		    	 else {
		    		 eventosVisitante[v] = evento;
		    		 v++;
		    	 }*/
		    	 
		    	 var imagen = "";
			      if (evento.tipo == 'G') {
			    		  imagen="app/img/Soccer-Ball-icon.png";
			    	  }
			    	  else  if (evento.tipo == 'Y') {
			    		  imagen="app/img/yellow.png";
			    	  }
			    	  else  if (evento.tipo == 'R') {
			    		   imagen="app/img/red.png";
			    	  }
			    	  else  if (evento.tipo == 'DY') {
			    		   imagen="app/img/Yellow-and-Red-Card.png";
			    	  }
			      if (evento.tipo == 'G' || evento.tipo == 'R' || evento.tipo == 'Y' || evento.tipo == 'DY') {
			    	  if (idLocal == item.idplantilla) {
			    		auxList +="<li><img style='float: left' src='img/escudos/64x/" + equiposPartido[0].escudo+"' height='30px' width='30px'/><a style='min-height: 30px;padding-left: 10px;' onclick=\"javascript:cargarEventosDialog('"+evento.jugador+"','"+evento.tipo+"');\"><span style='padding-left:0px'>"+evento.jugador+"</span><img style='position:absolute;padding: 10px 0px 0px 80%;' src='"+imagen+"' /></a></li>";
			    	  }
			    	  else {
			    		auxList +="<li><img style='float: left' src='img/escudos/64x/" + equiposPartido[1].escudo+"' height='30px' width='30px'/><a style='min-height: 30px;padding-left: 10px;' onclick=\"javascript:cargarEventosDialog('"+evento.jugador+"','"+evento.tipo+"');\"><span style='padding-left:0px'>"+evento.jugador+"</span><img style='position:absolute;padding: 10px 0px 0px 80%;' src='"+imagen+"' /></a></li>";
			    	  }
			       }
		      });
		      
		      marcador = golesLocal + " - " + golesVisitante;
		      // Informamos el marcador
		      $("#resultadoPartido").html("<b>" + marcador + "</b>");
		      
		   		$("#eventosPartidoList").prepend(auxList);
			
			// Refrescamos la lista
		   		$("#eventosPartidoList").listview();
		   		$("#eventosPartidoList").listview("refresh");
		      
		      //$("#eventos").append('<div data-role="collapsible" data-theme="b" data-content-theme="b" class="detalle"><h3>'+_('Detalle')+'</h3><fieldset class="ui-grid-a"><div class="ui-block-a local"></div><div class="ui-block-b visitante" style="text-align:right"></div></fieldset></div>');
		      
		      /*$.each(eventosLocal, function(i,eventoLocal){
		    	  	if (eventoLocal.tipo == 'G') {
		    	  		$(".local").append("<p class='ui-li-desc eventoPartido'><img src='app/img/Soccer-Ball-icon.png' /> "+eventoLocal.jugador+"</p>");
		    	  	}
		    	  	else if (eventoLocal.tipo == 'Y') {
		    	  		$(".local").append("<p class='ui-li-desc eventoPartido'><img src='app/img/yellow.png' /> "+eventoLocal.jugador+"</p>");
		    	  	}
		    	  	else if (eventoLocal.tipo == 'R') {
		    	  		$(".local").append("<p class='ui-li-desc eventoPartido'><img src='app/img/red.png' /> "+eventoLocal.jugador+"</p>");
		    	  	}
		    	  	else if (eventoLocal.tipo == 'DY') {
		    	  		$(".local").append("<p class='ui-li-desc eventoPartido'><img src='app/img/Yellow-and-Red-Card.png' /> "+eventoLocal.jugador+"</p>");
		    	  	}
			    	 
			      });
		      
		      $.each(eventosVisitante, function(i,eventoVisitante){
		    	  if (eventoVisitante.tipo == 'G') {
		    		  $(".visitante").append("<p class='ui-li-desc eventoPartido'><img src='app/img/Soccer-Ball-icon.png' /> "+eventoVisitante.jugador+"</p>");
		    	  }
		    	  else  if (eventoVisitante.tipo == 'Y') {
		    		  $(".visitante").append("<p class='ui-li-desc eventoPartido'><img src='app/img/yellow.png' /> "+eventoVisitante.jugador+"</p>");
		    	  }
		    	  else  if (eventoVisitante.tipo == 'R') {
		    		  $(".visitante").append("<p class='ui-li-desc eventoPartido'><img src='app/img/red.png' /> "+eventoVisitante.jugador+"</p>");
		    	  }
		    	  else  if (eventoVisitante.tipo == 'DY') {
		    		  $(".visitante").append("<p class='ui-li-desc eventoPartido'><img src='app/img/Yellow-and-Red-Card.png' /> "+eventoVisitante.jugador+"</p>");
		    	  }
		    	  
		    	  	
			      });*/
		      
		      	//$('div[data-role=collapsible]').collapsible();
		   
 		}
 		
 	});
 	

}



function publishFBPartido() {
	textFB = $("#facebook_textarea_popup").val();
	publishFB(textFB);
}

function publishFBEvento() {
	textFB = $("#eventos_textarea_popup").val();
	publishFB(textFB);
}

function gestionClicksBanderasPartidoLive() {
	$("img[class='escudoLive']").each( function(index, item) {
		if (equipos[index].activo == true) {
     		$(this).addClass("item_selected");
     	}

	    $(this).tap(function() {
	    	
			equipos[index].activo = !equipos[index].activo;
			if (equipos[index].activo == true) {
	 			$(this).addClass("item_selected");
	 		}
	 		else {
	 			$(this).removeClass("item_selected");
	 		}
 		
 		
			getTweets(equipos, "", "", false, "tweetsPartidoLive", extraTwitters, []);
		});
	    
	});
	
}

// Monta la cabecera del resultado con los nombres y escudos de los equipos
function montarCabecera(equipos) {

	$("#cabeceraLive").text(equipos[0].nombre + " - " + equipos[1].nombre);
	$("#escudoLocal").attr("src", "img/escudos/64x/" + equipos[0].escudo);
	$("#escudoVisitante").attr("src", "img/escudos/64x/" + equipos[1].escudo);
	
}

// Funci�n inicial
function initPartidoLive() {
	
	idListView = "tweetsPartidoLive";
	idListViewComentarios = "tweetsComentariosLive";
	
	var urlEquipos = "http://soccer.artiic.com/soccer/artiic.php/rest/Equipo/datos/idliga/"+liga+"?callback=?";
	
	// Borramos las imágenes y la lista de tweets
	resetPaginaTweets("", "tweetsPartidoLive");
	resetPaginaTweets("", "tweetsComentariosLive");
	
	// Si !isNavegacion, venimos de notificacion y tenemos que poner el back a la pagina inicial
	// Si venimos de una notificacion obtenemos los valores de los parametros a traves de la url
	if (isNavegacion) {
		$("#backPartidoLive").attr("data-rel", "back");
		$("#backPartidoLive").attr("href", "");
	}
	else {
		getUrlParams();
		$("#backPartidoLive").attr("data-rel", "");
		$("#backPartidoLive").attr("href", "#index");
	}
	isNavegacion = false;
	
	//if (readLocalStorage("idPartido") == null && readLocalStorage("idPlantillaLocal") == null && readLocalStorage("idPlantillaVisitante") == null) {
	if (idPartido == null ||  idPartido == "") {
		idPartido=readLocalStorage("idPartido");
		idLocal=readLocalStorage("idPlantillaLocal");
		idVisitante=readLocalStorage("idPlantillaVisitante");
		//Los eliminamos para los partidos de notificaciones que los lea de la url.
		window.localStorage.removeItem("idPartido");
		window.localStorage.removeItem("idPlantillaLocal");
		window.localStorage.removeItem("idPlantillaVisitante");
	//}	
	}
	
	// M�todo que se encargar� de capturar el touchstart de refrescar
	// y actualizar� la lista de tweets
	$("#refreshButtonPartidoLive").touchstart(function () {
		getTweets(equipos, "", "", false, idListView, extraTwitters, []);
		getTweets("", "", "", false, idListViewComentarios, extraTwitters, [equipos[0].hash+equipos[1].hash+"_LT"]);
		
		recuperarEventos();
		
	});
	
	
	
	// Obtenemos la info de los equipos
	$.getJSON(urlEquipos, function (data) {
		$.each(data, function (index, item) {
			if (item.idplantilla == idLocal) {
				
				equipos[0] = {
					nombre: _(item.nombre),
					twitter: item.idtwitter,
					escudo: item.escudo,
					activo: true,
					hash: item.hash
				};
			}
			
			if (item.idplantilla == idVisitante) {
				equipos[1] = {
					nombre: _(item.nombre),
					twitter: item.idtwitter,
					escudo: item.escudo,
					activo: true,
					hash: item.hash
				};
			}
			
		});
		
		// Informamos la cabecera con la info de los equipos
		montarCabecera(equipos);		
		
		gestionClicksBanderasPartidoLive();
		
		
		
		// Obtenemos la info de los tweets
		getTweets(equipos, "", "", false, idListView, extraTwitters, []);
		getTweets("", "", "", false, idListViewComentarios, extraTwitters, [equipos[0].hash+equipos[1].hash+"_LT"]);
		
		recuperarEventos();
		
		$("#twitter_comment").html("#"+equipos[0].hash+equipos[1].hash+"_LT ");

	});
	
	
	
}

/*********************************/
/**			PARTIDO			**/ 
/*********************************/

//Funci�n inicial
function initPartido() {
	
	
	var urlEquipos = "http://soccer.artiic.com/soccer/artiic.php/rest/Equipo/datos/idliga/"+liga+"?callback=?";
	
	// Obtenemos los valores de los ids de los equipos pasados por par�metro
	getUrlParams();
	//if (readLocalStorage("idPartido") == null && readLocalStorage("idPlantillaLocal") == null && readLocalStorage("idPlantillaVisitante") == null) {
	if (idPartido == null ||  idPartido == "") {
		idPartido=readLocalStorage("idPartido");
		idLocal=readLocalStorage("idPlantillaLocal");
		idVisitante=readLocalStorage("idPlantillaVisitante");
		//Los eliminamos para los partidos de notificaciones que los lea de la url.
		window.localStorage.removeItem("idPartido");
		window.localStorage.removeItem("idPlantillaLocal");
		window.localStorage.removeItem("idPlantillaVisitante");
	//}	
	}
	
	// M�todo que se encargar� de capturar el touchstart de refrescar
	// y actualizar� la lista de tweets
	$("#refreshButtonPartido").touchstart(function () {
		
		recuperarEventosPartido();
		
	});
	
	
	
	// Obtenemos la info de los equipos
	$.getJSON(urlEquipos, function (data) {
		$.each(data, function (index, item) {
			if (item.idplantilla == idLocal) {
				
				equiposPartido[0] = {
					nombre: _(item.nombre),
					twitter: item.idtwitter,
					escudo: item.escudo,
					activo: true,
					hash: item.hash
				};
			}
			
			if (item.idplantilla == idVisitante) {
				equiposPartido[1] = {
					nombre: _(item.nombre),
					twitter: item.idtwitter,
					escudo: item.escudo,
					activo: true,
					hash: item.hash
				};
			}
			
		});
		
		// Informamos la cabecera con la info de los equipos
		montarCabeceraPartido(equiposPartido);				
		recuperarEventosPartido();
		
	});
	
	
	
}

function montarCabeceraPartido(equipos) {

	$("#cabeceraPartido").text(equiposPartido[0].nombre + " - " + equiposPartido[1].nombre);
	$("#escudoLocalPartido").attr("src", "img/escudos/64x/" + equiposPartido[0].escudo);
	$("#escudoVisitantePartido").attr("src", "img/escudos/64x/" + equiposPartido[1].escudo);
	
}


/*********************************/
/**			MI EQUIPO			**/ 
/*********************************/

function initMiEquipo() {
	
	// Obtenemos el par�metro reload si llega
	//getUrlParams();
	
	//miEquipo = readLocalStorage(claveEquipo);
	window.plugins.artiic.getMyTeam(function(r){
		
		miEquipo = r;
		
		// Si el equipo ya ha sido guardado anteriormente, lo recuperamos y mostramos la pantalla del equipo
		if (miEquipo != undefined && miEquipo != "") {
			seleccionarMiEquipo(miEquipo);
		}
		// Si no, mostramos la lista de equipos para seleccionarlo
		else {
			//listaMiEquipos();
			mostrarListaEquipos();
		}
	
	},function(e){console.log(e);});
	
}

function mostrarListaEquipos() {
	
	// Guardamos en la localStorage una marca para saber que venimos de equipo favorito
	writeLocalStorage("guardarFavorito", "SI");
	
	$.mobile.changePage("#equipos");
}

/*
function listaMiEquipos() {

	//urlClasificacion += "idliga/"+pais+"?callback=?";
	// Mostramos imagen cargando
	 	$.mobile.showPageLoadingMsg();
	 	
 		
		var selecciones = ["athleticbilbao","atleticomadrid","barcelona","betis","celta","deportivo","espanyol","getafe","granada","levante","malaga","mallorca","osasuna","rayo","realmadrid","realsociedad","sevilla","valencia","valladolid","zaragoza"]; 
		var idPlantilla = ["47","44","37","51","54","55","43","46","52","41","40","49","42","48","38","50","45","39","56","53"]; 


		for (i=0;i<selecciones.length;i++){ 
		
	     	if (i%4 == 0) {
	 			$("#listaEquipos").append('<div class="ui-block-a" style="padding:0px 0px 10px 0px;"> '+'<a onclick="seleccionarMiEquipo('+idPlantilla[i]+')" href=""><img src="img/escudos/64x/'+selecciones[i]+'.png" width="" alt="image" /></a></div>');
			}
	 		else  if (i%4 == 1) {
	 			$("#listaEquipos").append('<div class="ui-block-b" style="padding:0px 0px 10px 0px;"> '+'<a href="javascript:seleccionarMiEquipo('+idPlantilla[i]+');"><img src="img/escudos/64x/'+selecciones[i]+'.png" width="" alt="image" /></a></div>');
			} 
	 		else  if (i%4 == 2) {
	 			$("#listaEquipos").append('<div class="ui-block-c" style="padding:0px 0px 10px 0px;"> '+'<a href="javascript:seleccionarMiEquipo('+idPlantilla[i]+');"><img src="img/escudos/64x/'+selecciones[i]+'.png" width="" alt="image" /></a></div>');
	 		} 
	 		else  if (i%4 == 3) {
	 			$("#listaEquipos").append('<div class="ui-block-d" style="padding:0px 0px 10px 0px;"> '+'<a href="javascript:seleccionarMiEquipo('+idPlantilla[i]+');"><img src="img/escudos/64x/'+selecciones[i]+'.png" width="" alt="image" /></a></div>');
	 		} 
		}
	 	
	$.mobile.hidePageLoadingMsg();
}
*/

// Guarda el equipo en la memoria interna y va a la pagina del equipo
function seleccionarMiEquipo(idEquipo) {

	//Guardamos en la localStorage, para no estar accediendo siempre.
	equipo = idEquipo;
	
	//Guardamos la variable en Android
	window.plugins.artiic.setMyTeam(idEquipo,function(r){console.log(r);},function(e){console.log(e);});
	
	$.mobile.changePage("#equipo");
	
}

/*********************************/
/**		NOTIFICACIONES			**/ 
/*********************************/

function initNotificaciones() {
	

		var selecciones = appSettings.equiposNombres; 
	var canal = appSettings.equiposCanales;

	for (i=0;i<selecciones.length;i++){ 
		 equiposNotificaciones[i] = {
				
		 channel: canal[i],
		 alerta: "false"
		 };
		 
		 if (i%4 == 0) {
	 	  	$("#timelineNotificaciones").append('<div class="ui-block-a escudoNotif" style="padding:0px 0px 10px 0px;position: relative; left: 0; top: 0;"> <img class="imgEscudoNotif" style="position: relative; top: 0; left: 0;" src="img/escudos/64x/'+selecciones[i]+'.png" width="" alt="image" /><img id="check" src="app/img/check.png" style="position: absolute; top: 30px; left: 40px;"/> </div>');
		 }
		 else  if (i%4 == 1) {
	 	  	$("#timelineNotificaciones").append('<div class="ui-block-b escudoNotif" style="padding:0px 0px 10px 0px;position: relative; left: 0; top: 0;"> <img class="imgEscudoNotif" style="position: relative; top: 0; left: 0;" src="img/escudos/64x/'+selecciones[i]+'.png" width="" alt="image" /><img id="check" src="app/img/check.png" style="position: absolute; top: 30px; left: 40px;"/>  </div>');
		 } 
		else  if (i%4 == 2) {
	 	  	$("#timelineNotificaciones").append('<div class="ui-block-c escudoNotif" style="padding:0px 0px 10px 0px;position: relative; left: 0; top: 0;"> <img class="imgEscudoNotif"style="position: relative; top: 0; left: 0;" src="img/escudos/64x/'+selecciones[i]+'.png" width="" alt="image" /><img id="check" src="app/img/check.png" style="position: absolute; top: 30px; left: 40px;"/>  </div>');
		 } 
		else  if (i%4 == 3) {
	 	  	$("#timelineNotificaciones").append('<div class="ui-block-d escudoNotif" style="padding:0px 0px 10px 0px;position: relative; left: 0; top: 0;"> <img class="imgEscudoNotif" style="position: relative; top: 0; left: 0;" src="img/escudos/64x/'+selecciones[i]+'.png" width="" alt="image" /><img id="check" src="app/img/check.png" style="position: absolute; top: 30px; left: 40px;"/>  </div>');
		 } 

	}
    gestionClicksBanderas(true);
    /* FREE no tiene botones de quitar/poner todos */
    //if (modo == 1) {
	      $("#notificacionesDisabled").touchstart(function () {
	      	notificationsDisableAll();
	  	});
	      $("#notificacionesAll").touchstart(function () {
	      	notificationsEnableAll();
	  	});
    //}
   
}

function gestionClicksBanderas(inicializar) {
	
	$(".escudoNotif").each( function(index, item) {
     	var channel = equiposNotificaciones[index].channel;
		var alerta = readLocalStorage(channel);
     	
     	if (alerta == null || alerta == undefined) {
     		alerta = "false";
     	}
     	
		equiposNotificaciones[index].alerta = alerta;
     	
		if (alerta == "true") {
			$(this).children(".imgEscudoNotif").next().show();
     	}
		else {
			$(this).children(".imgEscudoNotif").next().hide();
		}
		if (inicializar) {
			/* FREE no hace nada los botones de escudo */
			//if (modo == 1) {
			    $(this).click(function() {
			    	
			    	//showLoading();
			    	
			    	if (equiposNotificaciones[index].alerta == "true") {
			    		equiposNotificaciones[index].alerta = "false";
			    	}
			    	else {
			    		equiposNotificaciones[index].alerta = "true";
			    	}
		
			    	
					if (equiposNotificaciones[index].alerta == "true") {			
						writeLocalStorage(channel, "true");
						window.plugins.artiic.suscript(channel);
						$(this).children(".imgEscudoNotif").next().show();	 			
			 		}
			 		else {
			 			writeLocalStorage(channel, "false");
			 			window.plugins.artiic.unsuscript(channel);
			 			$(this).children(".imgEscudoNotif").next().hide();	
			 		}
					
					
				});
			//}
		}
	    
	});
	
}

function notificationsEnableAll() {
	
	window.plugins.artiic.suscriptAll(function(r){
		
		changeStateNotificationsAll(true);
		gestionClicksBanderas(false);
	
	},function(e){console.log(e);});
}

function notificationsDisableAll() {
	
	window.plugins.artiic.unsuscriptAll(function(r){
		
		changeStateNotificationsAll(false);
		gestionClicksBanderas(false);
	
	},function(e){console.log(e);});
}

function changeStateNotificationsAll(state) {
	
	/*
	writeLocalStorage("almeria", state);
	writeLocalStorage("bilbao", state);
	writeLocalStorage("atletico", state);
	writeLocalStorage("barcelona", state);
	writeLocalStorage("betis", state);
	writeLocalStorage("celta", state);
	writeLocalStorage("elche", state);
	writeLocalStorage("espanyol", state);
	writeLocalStorage("getafe", state);
	writeLocalStorage("granada", state);
	writeLocalStorage("levante", state);
	writeLocalStorage("malaga", state);
	writeLocalStorage("mallorca", state);
	writeLocalStorage("osasuna", state);
	writeLocalStorage("rayo", state);
	writeLocalStorage("madrid", state);
	writeLocalStorage("realsociedad", state);
	writeLocalStorage("sevilla", state);
	writeLocalStorage("valencia", state);
	writeLocalStorage("valladolid", state);
	writeLocalStorage("villarreal", state);
	*/
	
	$.each(appSettings.equiposCanales, function(index,item) {
		writeLocalStorage(item, state);
	});
}

/*********************************/
/**			TWEET				**/ 
/*********************************/

function initTweet() {
	
	getTweet(idTweet);
		
}

/*********************************/
/**		TWEET DIALOG			**/ 
/*********************************/

function initTwitterDialog() {
	$("#twitter_textarea_popup").val(defaultTextTweet);
}

function showDialogTweet(accionTweet) {
	
	if (accionTweet == "RESPONDER") {
		tweetInReplyTo = idTweet;
		defaultTextTweet = "@" + $("#userScreenName").val();
	}
	else if (accionTweet == "RESULTADO") {
		defaultTextTweet = equipos[0].nombre + " - " + equipos[1].nombre + " " + $("#resultado").html().replace("<b>","").replace("</b>","");
	}
	else if (accionTweet == "COMENTARIO") {
		defaultTextTweet = "#"+equipos[0].hash + equipos[1].hash+"_LT ";
	}
	
	$.mobile.changePage("#dialog_twitter", {role: 'dialog'});
	
}

function publicarTweet() {
	
	textTweet = $("#twitter_textarea_popup").val();
	
	updateTweet(textTweet, tweetInReplyTo);
	$('#dialog_twitter').dialog('close');
	
	tweetInReplyTo = "";
	//$("#twitter_textarea_popup").val("");
}

/*********************************/
/**		RANKING MI EQUIPO		**/ 
/*********************************/

function initRankingMiEquipo() {
	
	var urlRankingMiEquipo = "http://soccer.artiic.com/soccer/artiic.php/rest/Usuarios/datos/idliga/"+liga+"/iddivision/"+division+"?callback=?";
	
 	$.getJSON(urlRankingMiEquipo, function(data){
 		
 		var nombre = "";
 		var cantidad = "";
 		var escudo = "";
 		
	      $.each(data, function(i,item){
	    	 nombre =item.nombre;
     		 cantidad = item.cantidad;
     		 escudo = item.escudo;
     		 posicion = i+1;
     		 
     		 if (i==0) {
		       	$("#timelineRankingMiEquipo").append('<div class="ui-block-a"><img src="img/escudos/64x/'+escudo+'" alt="image" width="30" height="30" style="vertical-align: middle;"/></div><div class="ui-block-b"><b>&nbsp;&nbsp;'+ nombre +'</b></div><div class="ui-block-c"><b>'+cantidad+'</b></div>');
			}else{
				if (i%2==0) {
		       	 	$("#timelineRankingMiEquipo").append('<div class="ui-block-a"><img src="img/escudos/64x/'+escudo+'" alt="image" width="30" height="30" style="vertical-align: middle;"/></div><div class="ui-block-b" style="color:#000000;background:white;">&nbsp;&nbsp;'+ nombre +'</div><div class="ui-block-c" style="color:#000000;background:white;"> '+cantidad+'</div>');
				}else {
		       	 	$("#timelineRankingMiEquipo").append('<div class="ui-block-a" style="color:#000000;background:#D8D8D8;"><img src="img/escudos/64x/'+escudo+'" alt="image" width="30" height="30" style="vertical-align: middle;"/></div><div class="ui-block-b" style="color:#000000;background:#D8D8D8;">&nbsp;&nbsp;'+ nombre +'</div><div class="ui-block-c" style="color:#000000;background:#D8D8D8;" > '+cantidad+'</div>');
				}
			}
   	  			
      	});

 	});
}

/*********************************/
/**		INFO VERSION PRO			**/ 
/************************/
function initVersionPRO() {
	$.mobile.changePage("#infoVersionPRO");
}

function playVideo(urlVideo) {
	window.plugins.videoPlayer.play(urlVideo);
}

/**

 *  

 * @return Object literal singleton instance of TeamNotification

 */

var Artiic = function() {
};

/**
  * @param directory The directory for which we want the listing
  * @param successCallback The callback which will be called when directory listing is successful
  * @param failureCallback The callback which will be called when directory listing encouters an error
  */
Artiic.prototype.getStateNotification = function(channel,successCallback, failureCallback) {

 return cordova.exec(    successCallback,    //Success callback from the plugin

      failureCallback,     //Error callback from the plugin

      'ArtiicPlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin

      'notification',              //Tell plugin, which action we want to perform

      [channel]);        //Passing list of args to the plugin

};

Artiic.prototype.getIdioma = function(successCallback, failureCallback) {

	 return cordova.exec(    successCallback,    //Success callback from the plugin

	      failureCallback,     //Error callback from the plugin

	      'ArtiicPlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin

	      'getIdioma',              //Tell plugin, which action we want to perform

	      ["nada"]);        //Passing list of args to the plugin

	};
	
		
	Artiic.prototype.suscript = function(channel) {

			 return cordova.exec(    null,    //Success callback from the plugin

			      null,     //Error callback from the plugin

			      'ArtiicPlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin

			      'suscript',              //Tell plugin, which action we want to perform

			    [channel]);        //Passing list of args to the plugin

	};
	
	Artiic.prototype.suscriptAll = function(successCallback, failureCallback) {

		 return cordova.exec(successCallback,    //Success callback from the plugin

				 failureCallback,     //Error callback from the plugin

		      'ArtiicPlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin

		      'suscriptAll',              //Tell plugin, which action we want to perform

		    ["nada"]);        //Passing list of args to the plugin

};	
			
	Artiic.prototype.unsuscript = function(channel) {

		 return cordova.exec(    null,    //Success callback from the plugin

				      null,     //Error callback from the plugin

				      'ArtiicPlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin

				      'unsuscript',              //Tell plugin, which action we want to perform

				      [channel]);        //Passing list of args to the plugin

	};
	
	Artiic.prototype.unsuscriptAll = function(successCallback, failureCallback) {

		 return cordova.exec(successCallback,    //Success callback from the plugin

				 	failureCallback,     //Error callback from the plugin

				      'ArtiicPlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin

				      'unsuscriptAll',              //Tell plugin, which action we want to perform

				      ["nada"]);        //Passing list of args to the plugin

	};
	
	Artiic.prototype.setMyTeam = function(equipo,successCallback, failureCallback) {

		 return cordova.exec(    successCallback,    //Success callback from the plugin

				 failureCallback,     //Error callback from the plugin

		      'ArtiicPlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin

		      'setMyTeam',              //Tell plugin, which action we want to perform

		      [equipo]);        //Passing list of args to the plugin

		};
	
	Artiic.prototype.getMyTeam = function(successCallback, failureCallback) {

		 return cordova.exec(    successCallback,    //Success callback from the plugin

		      failureCallback,     //Error callback from the plugin

		      'ArtiicPlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin

		      'getMyTeam',              //Tell plugin, which action we want to perform

		      ["nada"]);        //Passing list of args to the plugin

		};
		Artiic.prototype.activarSonido = function(indSonido,successCallback, failureCallback) {
			 return cordova.exec(    successCallback,    //Success callback from the plugin

			      failureCallback,     //Error callback from the plugin

			      'ArtiicPlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin

			      'activarSonido',              //Tell plugin, which action we want to perform

			      [indSonido]);        //Passing list of args to the plugin

			};
			Artiic.prototype.getSettings = function(successCallback, failureCallback) {

				 return cordova.exec(    successCallback,    //Success callback from the plugin

				      failureCallback,     //Error callback from the plugin

				      'ArtiicPlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin

				      'getSettings',              //Tell plugin, which action we want to perform

				      ["nada"]);        //Passing list of args to the plugin

				};
		Artiic.prototype.activarVibracion = function(indVibracion,successCallback, failureCallback) {
			return cordova.exec(    successCallback,    //Success callback from the plugin

			      failureCallback,     //Error callback from the plugin

			      'ArtiicPlugin',  //Tell PhoneGap to run "DirectoryListingPlugin" Plugin

			     'activarVibracion',              //Tell plugin, which action we want to perform

			     [indVibracion]);        //Passing list of args to the plugin

			};			

 
PhoneGap.addConstructor(function() {

	cordova.addPlugin("artiic", new Artiic());

               });

function loginFacebook(){
                FB.getLoginStatus(function(response) {
                	if (response.status == 'connected') {
                     } else {
                         login();
                   }
            });
              
           

       }

function login() {
    FB.login(
             function(response) {

             },
             { scope: "email" }
             );
}


function publishFB(msg){
	  //msg = $("#facebook_textarea_popup").val();
    FB.getLoginStatus(function(response) {
                      if (response.status == 'connected') {
                    	  result = FB.getAccessToken();
                                                       if(!result.error||result!='invalid'){
                                                       var publish = {
                                                       access_token:result,
                                                       method: 'stream.publish',
                                                       message: msg,
                                                       link:'http://apps.facebook.com/ligatweets/',
                                                       picture : 'http://www.sgm-community.com/iconoRetina.png',
                                                       name: 'LigaTweets 2012',
                                                       caption: 'Descripcion',
                                                       description: 'Publicacion de resultados de partidos de futbol de la liga BBVA',
                                                       };
                                                       
                                                       
                                                       
                                                       FB.api('/me/feed', 'post', publish, function(response) {
                                                              if (!response) {
                                                              alert("no hay respuesta");
                                                              }else if(response.error){
                                                              alert(JSON.stringify(response));
                                                              }
                                                              else {
                                                              alert(_("updateFacebookOK"));
                                                              }
                                                              }); 
                                                       
                                                       }else{
                                                       alert(_("noLogin"));
                                                       }      
                      
                      
                      } else {
                      alert('no estas logueado');
                      }
                      });
    

                        
    
   
}
       

        
        function logoutFacebook() {
                FB.logout(function(response) {
                          
                });
            }
        
     

function _(s) {
	

	if (typeof(i18n)!='undefined' && i18n[s]) {
		
		return i18n[s];
	}
	return s;
}

function _2(s) {
	

	if (typeof(i18n_app)!='undefined' && i18n_app[s]) {
		return i18n_app[s];
	}
	return s;
}

function translate() {
	
	$('[key]').each(function (i) {
		$(this).html(_($(this).attr("key")));
    });
	
	$('[key2]').each(function (i) {
		$(this).html(_2($(this).attr("key2")));
    });
}





var appSettings = 
{
	pruebas: false,
	torneo: "L",
    pais: 1,
    liga: 20,
    division: 5,
    modo: 0,
    extraTwitters:[],
    facebookId: "413544098687260",
    championsPos: 2,
    europaLeaguePos:6,
    descensoPos:19,
    equiposCanales: ["alaves", "albacete", "alcorcon","betis","barcelonab","girona","laspalmas","leganes", "llagostera", "lugo", "mallorca", "mirandes","numancia","osasuna", "ponferradina","santander","huelva","sabadell","gijon","tenerife", "valladolid", "zaragoza"],
    equiposNombres: ["alaves", "albacete", "alcorcon","betis","barcelonab","girona","laspalmas","leganes", "llagostera", "lugo", "mallorca", "mirandes","numancia","osasuna", "ponferradina","racing","huelva","sabadell","sportinggijon", "tenerife", "valladolid", "zaragoza"],
    equiposIds: ["534","536","524","519","526","525","528","538","537","533","518","529","530","517","531","520","532","527","521","535","523","522"],
    jornadas: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42"],
	jornadasKey: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42"],
	groups: []
};

var i18n = {
 "Noticias": "Noticias",
 "Clasificacion": "Clasificación",
 "Cuartos": "Cuartos",
 "Semifinal": "Semifinal",
 "Final": "Final",
 "EQUIPO": "EQUIPO",
 "Calendario": "Calendario",
 "Grupos": "Grupos",
 "Fase Final": "Fase Final",
 "Mi selección": "Mi equipo",
 "Partidos en vivo": "Partidos en vivo",
 "Partidos en vivo!": "Partidos en vivo!",
 "Notificaciones": "Notificaciones",
 "Selecciones" : "Equipos",
 "¿De qué selecciones deseas recibir alertas?": "¿De qué selecciones deseas recibir alertas?",
 "PJ": "PJ",
 "PG": "PG",
 "PE": "PE",
 "PP": "PP",
 "Detalle": "Detalle",
 "Goleadores" : "Goleadores",
 "Ajustes" : "Ajustes",
 "Vibracion" : "Vibración",
 "Sonido" : "Sonido",
 "Alertas" : "ALERTAS",
 "Inicio" : "INICIO DE SESI&Oacute;N",
 "Conectado": "Conectado",
 "Desconectado": "Desconectado",
 "Comentar": "Comentar",
 "publicarTwitter": "Publicar en Twitter",
 "publicarFacebook": "Publicar en Facebook",
 "publicarEventos": "Publicar eventos de partido",
 "Publicar": "Publicar",
 "jornada1": "Jornada 1",
 "jornada2": "Jornada 2",
 "jornada3": "Jornada 3",
 "jornada4": "Jornada 4",
 "jornada5": "Jornada 5",
 "jornada6": "Jornada 6",
 "jornada7": "Jornada 7",
 "jornada8": "Jornada 8",
 "jornada9": "Jornada 9",
 "jornada10": "Jornada 10",
 "jornada11": "Jornada 11",
 "jornada12": "Jornada 12",
 "jornada13": "Jornada 13",
 "jornada14": "Jornada 14",
 "jornada15": "Jornada 15",
 "jornada16": "Jornada 16",
 "jornada17": "Jornada 17",
 "jornada18": "Jornada 18",
 "jornada19": "Jornada 19",
 "jornada20": "Jornada 20",
 "jornada21": "Jornada 21",
 "jornada22": "Jornada 22",
 "jornada23": "Jornada 23",
 "jornada24": "Jornada 24",
 "jornada25": "Jornada 25",
 "jornada26": "Jornada 26",
 "jornada27": "Jornada 27",
 "jornada28": "Jornada 28",
 "jornada29": "Jornada 29",
 "jornada30": "Jornada 30",
 "jornada31": "Jornada 31",
 "jornada32": "Jornada 32",
 "jornada33": "Jornada 33",
 "jornada34": "Jornada 34",
 "jornada35": "Jornada 35",
 "jornada36": "Jornada 36",
 "jornada37": "Jornada 37",
 "jornada38": "Jornada 38",
 "freeNotificaciones": "En la versión gratuita solo se envian notificaciones a 'Mi equipo' seleccionado. Clique para ver las diferencias",
 "gol" : "Gol: ",
 "yellowCard" : "Tarjeta amarilla: ", 
 "redCard" : "Tarjeta roja: ",
 "noLogin" : "No esta logueado",
 "errorDetTweet" : "Se ha producido un error al obtener el tweet:",
 "errorFavorito" : "Se ha producido un error al marcar como favorito: ",
 "errorNoFavorito" : "Se ha producido un error al desmarcar como favorito: ",
 "errorRetweet" : "Se ha producido un error al hacer el retweet: ",
 "updateTweetOK" : "Se ha publicado con exito el mensaje en twitter",
 "updateTweetNOK" : "No se ha publicado con exito el mensaje en twitter -> ",
 "updateFacebookOK": "Se ha publicado el mensaje en Facebook correctamente",
 "loading": "Cargando",
 "sinComenzar" : "Sin com.",
 "finalizado" : "Fin.",
 "suspendido" : "Susp.",
 "enJuego" : "En juego",
 "rankingME" : "Ranking Mi equipo",
 "sinPublicidad" : "Sin publicidad",
 "infoCanales" : "En la pantalla de partidos en vivo, con los canales de televisión",
 "infoNotif" : "Notificaciones de los equipos que quieras",
 "versionPRO" : "Versión PRO",
 "jornadaOctavos" : "Octavos",
 "jornadaCuartos" : "Cuartos",
 "jornadaSemis" : "Semifinales",
 "jornadaFinal" : "Final"
 };

var montharray = new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");

var i18n = {
 "Noticias": "Nachrichten",
 "Clasificación": "Klassifikation",
 "Cuartos": "Viertelfinale",
 "Semifinal": "Semifinale",
 "Final": "Finale",
 "EQUIPO": "TEAM",
 "Calendario": "Kalender",
 "Grupos": "Gruppen",
 "Fase Final": "Schlussphase",
 "Mi selección": "Mein Team",
 "Partidos en vivo": "Live-Spiele",
 "Partidos en vivo!": "Live-Spiele",
 "Notificaciones": "Benachrichtigungen",
 "Selecciones" : "Team",
 "¿De qué selecciones deseas recibir alertas?": "Welche Teams wollen Sie Mitteilungen erhalten?",
 "PJ": "P",
 "PG": "W",
 "PE": "D",
 "PP": "L",
 "Detalle": "Detail",
 "Goleadores" : "Torsch&uuml;tzenk&ouml;nige",
 "Ajustes" : "Einstellungen",
 "Vibracion" : "Vibration",
 "Sonido" : "Klang",
 "Alertas" : "Warnungen",
 "Inicio" : "Logon",
 "Conectado": "verbunden",
 "Desconectado": "gretennt",
 "Comentar": "Anmerkung",
 "publicarTwitter": "Ver&ouml;ffentlichen auf Twitter",
 "publicarFacebook": "Ver&ouml;ffentlichen auf Facebook",
 "publicarEventos": "Ver&ouml;ffentlichen Spielereignisse",
 "Publicar": "Ver&ouml;ffentlichen",
 "jornada1": "Tag 1",
 "jornada2": "Tag 2",
 "jornada3": "Tag 3",
 "jornada4": "Tag 4",
 "jornada5": "Tag 5",
 "jornada6": "Tag 6",
 "jornada7": "Tag 7",
 "jornada8": "Tag 8",
 "jornada9": "Tag 9",
 "jornada10": "Tag 10",
 "jornada11": "Tag 11",
 "jornada12": "Tag 12",
 "jornada13": "Tag 13",
 "jornada14": "Tag 14",
 "jornada15": "Tag 15",
 "jornada16": "Tag 16",
 "jornada17": "Tag 17",
 "jornada18": "Tag 18",
 "jornada19": "Tag 19",
 "jornada20": "Tag 20",
 "jornada21": "Tag 21",
 "jornada22": "Tag 22",
 "jornada23": "Tag 23",
 "jornada24": "Tag 24",
 "jornada25": "Tag 25",
 "jornada26": "Tag 26",
 "jornada27": "Tag 27",
 "jornada28": "Tag 28",
 "jornada29": "Tag 29",
 "jornada30": "Tag 30",
 "jornada31": "Tag 31",
 "jornada32": "Tag 32",
 "jornada33": "Tag 33",
 "jornada34": "Tag 34",
 "jornada35": "Tag 35",
 "jornada36": "Tag 36",
 "jornada37": "Tag 37",
 "jornada38": "Tag 38",
 "freeNotificaciones": "In der kostenlosen Version nur Benachrichtigungen f&uuml;r 'Mein Team '. Klicken Sie hier, um die Unterschiede zu sehen",
 "gol" : "Ziel: ",
 "yellowCard" : "gelbe Karte: ", 
 "redCard" : "rote Karte: ",
 "noLogin" : "Nicht eingeloggt",
 "errorDetTweet" : "Es gab einen Fehler bekommen die Tweet:",
 "errorFavorito" : "Es ist ein Fehler aufgetreten: ",
 "errorNoFavorito" : "Es ist ein Fehler aufgetreten: ",
 "errorRetweet" : "Es gab einen Fehler bei der Herstellung der retweet: ",
 "updateTweetOK" : "Es wurde erfolgreich die Nachricht auf Twitter gepostet",
 "updateTweetNOK" : "Es gab einen Fehler bei der Eintragung der Tweet -> ",
 "updateFacebookOK": "Es wurde erfolgreich die Nachricht auf Facebook gepostet",
 "loading": "Verladung",
 "sinComenzar" : "Nicht beg.",
 "finalizado" : "Fert.",
 "suspendido" : "Schw.",
 "enJuego" : "Auf Live",
 "rankingME" : "Rang Mein Team",
 "sinPublicidad" : "No ads",
 "infoCanales" : "On live scores, with TV channels",
 "infoNotif" : "Notifications of teams you want",
 "versionPRO" : "PRO Version",
 "jornadaOctavos" : "Runde",
 "jornadaCuartos" : "Viertelfinale",
 "jornadaSemis" : "Semifinale",
 "jornadaFinal" : "Finale"
 };

var montharray = new Array("Januar","Februar","M&auml;rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember");

var i18n = {
 "Noticias": "Notícies",
 "Clasificacion": "Classificació",
 "Cuartos": "Cuarts",
 "Semifinal": "Semifinal",
 "Final": "Final",
 "EQUIPO": "EQUIP",
 "Calendario": "Calendari",
 "Grupos": "Grups",
 "Fase Final": "Fase Final",
 "Mi selección": "El meu equip",
 "Partidos en vivo": "Partits en directe",
 "Partidos en vivo!": "Partits en directe!",
 "Notificaciones": "Notificacions",
 "Selecciones" : "Equips",
 "¿De qué selecciones deseas recibir alertas?": "De quins equips desitges rebre alertes?",
 "PJ": "PJ",
 "PG": "PG",
 "PE": "PE",
 "PP": "PP",
 "Detalle": "Detall",
 "Goleadores" : "Golejadors",
 "Ajustes" : "Configuració",
 "Vibracion" : "Vibració",
 "Sonido" : "So",
 "Alertas" : "ALERTES",
 "Inicio" : "INICI DE SESSI&Oacute;",
 "Conectado": "Connectat",
 "Desconectado": "Desconnectat",
 "Comentar": "Comentar",
 "publicarTwitter": "Publicar a Twitter",
 "publicarFacebook": "Publicar a Facebook",
 "publicarEventos": "Publicar events de partit",
 "Publicar": "Publicar",
 "jornada1": "Jornada 1",
 "jornada2": "Jornada 2",
 "jornada3": "Jornada 3",
 "jornada4": "Jornada 4",
 "jornada5": "Jornada 5",
 "jornada6": "Jornada 6",
 "jornada7": "Jornada 7",
 "jornada8": "Jornada 8",
 "jornada9": "Jornada 9",
 "jornada10": "Jornada 10",
 "jornada11": "Jornada 11",
 "jornada12": "Jornada 12",
 "jornada13": "Jornada 13",
 "jornada14": "Jornada 14",
 "jornada15": "Jornada 15",
 "jornada16": "Jornada 16",
 "jornada17": "Jornada 17",
 "jornada18": "Jornada 18",
 "jornada19": "Jornada 19",
 "jornada20": "Jornada 20",
 "jornada21": "Jornada 21",
 "jornada22": "Jornada 22",
 "jornada23": "Jornada 23",
 "jornada24": "Jornada 24",
 "jornada25": "Jornada 25",
 "jornada26": "Jornada 26",
 "jornada27": "Jornada 27",
 "jornada28": "Jornada 28",
 "jornada29": "Jornada 29",
 "jornada30": "Jornada 30",
 "jornada31": "Jornada 31",
 "jornada32": "Jornada 32",
 "jornada33": "Jornada 33",
 "jornada34": "Jornada 34",
 "jornada35": "Jornada 35",
 "jornada36": "Jornada 36",
 "jornada37": "Jornada 37",
 "jornada38": "Jornada 38",
 "freeNotificaciones": "A la versió gratuïta només s'envien notificacions a 'El meu equip' seleccionat. Cliqui per veure les diferències",
 "gol" : "Gol: ",
 "yellowCard" : "Targeta groga: ", 
 "redCard" : "Targeta vermella: ",
 "noLogin" : "No has fet login",
 "errorDetTweet" : "S'ha produït un error al obtenir el tweet:",
 "errorFavorito" : "S'ha produït un error al marcar com a favorit: ",
 "errorNoFavorito" : "S'ha produït un error al desmarcar com a favorit: ",
 "errorRetweet" : "S'ha produït un error al fer retweet: ",
 "updateTweetOK" : "S'ha publicat el missatge a Twitter",
 "updateTweetNOK" : "S'ha produït un error al publicar el missatge -> ",
 "updateFacebookOK": "S'ha publicat el missatge a Facebook",
 "loading": "Carregant",
 "sinComenzar" : "No com.",
 "finalizado" : "Fi.",
 "suspendido" : "Susp.",
 "enJuego" : "En joc",
 "rankingME" : "Rànquing El meu equip",
 "sinPublicidad" : "Sense publicitat",
 "infoCanales" : "A la pantalla de partits en directe, amb els canals de televisió",
 "infoNotif" : "Notificacions dels equips que vulguis",
 "versionPRO" : "Versió PRO",
 "jornadaOctavos" : "Vuitens",
 "jornadaCuartos" : "Quarts",
 "jornadaSemis" : "Semifinals",
 "jornadaFinal" : "Final"
 };

var montharray = new Array("Gener","Febrer","Març","Abril","Maig","Juny","Juliol","Agost","Setembre","Octubre","Novembre","Desembre");

var i18n_app = {
 "titulo": "Adelante Tweets",
 };

var i18n = {
 "Noticias": "Not&iacute;cias",
 "Clasificación": "Classifica&ccedil;&atilde;o",
 "Cuartos": "Quartos-final",
 "Semifinal": "Meia-final",
 "Final": "Final",
 "EQUIPO": "EQUIPE",
 "Calendario": "Calend&aacute;rio",
 "Grupos": "Grupos",
 "Fase Final": "Fase final",
 "Mi selección": "Minha equipe",
 "Partidos en vivo": "Jogos ao vivo",
 "Partidos en vivo!": "Jogos ao vivo",
 "Notificaciones": "Notifica&ccedil;&otilde;es",
 "Selecciones" : "Equipes",
 "¿De qué selecciones deseas recibir alertas?": "Que equipas deseja receber alertas?",
 "PJ": "J",
 "PG": "V",
 "PE": "E",
 "PP": "D",
 "Detalle": "Detalhe",
 "Goleadores" : "Marcadores",
 "Ajustes" : "Configura&ccedil;&otilde;es",
 "Vibracion" : "Vibra&ccedil;&atilde;o",
 "Sonido" : "Parecer",
 "Alertas" : "ALERTAS",
 "Inicio" : "ENTRAR",
 "Conectado": "Ligado",
 "Desconectado": "Desligado",
 "Comentar": "Coment&aacute;rio",
 "publicarTwitter": "Publicar no Twitter",
 "publicarFacebook": "Publicar no Facebook",
 "publicarEventos": "Publicar eventos do jogo",
 "Publicar": "Pubblicare",
 "jornada1": "Jogo 1",
 "jornada2": "Jogo 2",
 "jornada3": "Jogo 3",
 "jornada4": "Jogo 4",
 "jornada5": "Jogo 5",
 "jornada6": "Jogo 6",
 "jornada7": "Jogo 7",
 "jornada8": "Jogo 8",
 "jornada9": "Jogo 9",
 "jornada10": "Jogo 10",
 "jornada11": "Jogo 11",
 "jornada12": "Jogo 12",
 "jornada13": "Jogo 13",
 "jornada14": "Jogo 14",
 "jornada15": "Jogo 15",
 "jornada16": "Jogo 16",
 "jornada17": "Jogo 17",
 "jornada18": "Jogo 18",
 "jornada19": "Jogo 19",
 "jornada20": "Jogo 20",
 "jornada21": "Jogo 21",
 "jornada22": "Jogo 22",
 "jornada23": "Jogo 23",
 "jornada24": "Jogo 24",
 "jornada25": "Jogo 25",
 "jornada26": "Jogo 26",
 "jornada27": "Jogo 27",
 "jornada28": "Jogo 28",
 "jornada29": "Jogo 29",
 "jornada30": "Jogo 30",
 "jornada31": "Jogo 31",
 "jornada32": "Jogo 32",
 "jornada33": "Jogo 33",
 "jornada34": "Jogo 34",
 "jornada35": "Jogo 35",
 "jornada36": "Jogo 36",
 "jornada37": "Jogo 37",
 "jornada38": "Jogo 38",
 "freeNotificaciones": "Na vers&atilde;o gratuita s;&oacute; enviar notifica&ccedil;&otilde;es 'Minha equipe' selecionado. Clique aqui para ver as diferen&ccedil;as",
 "gol" : "Goal: ",
 "yellowCard" : "Cart&atilde;o amarelo: ", 
 "redCard" : "Cart&atilde;o vermelho: ",
 "noLogin" : "N\u00E3o logado",
 "errorDetTweet" : "Ocorreu um erro ao obter o tweet:",
 "errorFavorito" : "Ocorreu um erro: ",
 "errorNoFavorito" : "Ocorreu um erro: ",
 "errorRetweet" : "Houve um erro na realiza��o do retweet: ",
 "updateTweetOK" : "Foi com sucesso postou a mensagem no twitter",
 "updateTweetNOK" : "N&atilde;o publicado com &ecirc;xito a mensagem no twitter -> ",
 "updateFacebookOK": "A mensagem foi postada no Facebook corretamente",
 "loading": "Carga",
 "sinComenzar" : "N&atilde;o ini.",
 "finalizado" : "Fin.",
 "suspendido" : "Susp.",
 "enJuego" : "Em jogo",
 "rankingME" : "Ranking Minha equipe",
 "sinPublicidad" : "Sem an&uacute;ncios",
 "infoCanales" : "Em jogos ao vivo, com informa��es de canais de TV",
 "infoNotif" : "Notifica&ccedil;&otilde;es de equipes que voc&ecirc; quer",
 "versionPRO" : "Vers&atilde;o PRO",
 "jornadaOctavos" : "Oitava de final",
 "jornadaCuartos" : "Quartos-final",
 "jornadaSemis" : "Meia-final",
 "jornadaFinal" : "Final"
 };

var dayarray = new Array("Sexta-feira","S&aacute;bado","Domingo","Segunda-feira","Ter&ccedil;a-feira","Quarta-feira","Quinta-feira");
var dayarray7 = new Array("Quinta-feira","Sexta-feira","S&aacute;bado","Domingo","Segunda-feira","Ter�a-feira","Quarta-feira");
var montharray = new Array("Janeiro","Fevereiro","Mar�o","Primaveras","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");

var i18n = {
 "Noticias": "News",
 "Clasificación": "Tables",
 "Cuartos": "Quarterfinals",
 "Semifinal": "Semifinal",
 "Final": "Finale",
 "EQUIPO": "TEAM",
 "Calendario": "Fixtures",
 "Grupos": "Groups",
 "Fase Final": "Final phase",
 "Mi selección": "My team",
 "Partidos en vivo": "Live scores",
 "Partidos en vivo!": "Live scores",
 "Notificaciones": "Notifications",
 "Selecciones" : "Teams",
 "¿De qué selecciones deseas recibir alertas?": "Which national teams do you want to receive alerts?",
 "PJ": "P",
 "PG": "W",
 "PE": "D",
 "PP": "L",
 "Detalle": "Detail",
 "Goleadores" : "Top scorers",
 "Ajustes" : "Settings",
 "Vibracion" : "Vibration",
 "Sonido" : "Sound",
 "Alertas" : "Alerts",
 "Inicio" : "Logon",
 "Conectado": "Connected",
 "Desconectado": "Disconnected",
 "Comentar": "Comment",
 "publicarTwitter": "Publish on Twitter",
 "publicarFacebook": "Publish on Facebook",
 "publicarEventos": "Publich match events",
 "Publicar": "Publish",
 "jornada1": "Round 1",
 "jornada2": "Round 2",
 "jornada3": "Round 3",
 "jornada4": "Round 4",
 "jornada5": "Round 5",
 "jornada6": "Round 6",
 "jornada7": "Round 7",
 "jornada8": "Round 8",
 "jornada9": "Round 9",
 "jornada10": "Round 10",
 "jornada11": "Round 11",
 "jornada12": "Round 12",
 "jornada13": "Round 13",
 "jornada14": "Round 14",
 "jornada15": "Round 15",
 "jornada16": "Round 16",
 "jornada17": "Round 17",
 "jornada18": "Round 18",
 "jornada19": "Round 19",
 "jornada20": "Round 20",
 "jornada21": "Round 21",
 "jornada22": "Round 22",
 "jornada23": "Round 23",
 "jornada24": "Round 24",
 "jornada25": "Round 25",
 "jornada26": "Round 26",
 "jornada27": "Round 27",
 "jornada28": "Round 28",
 "jornada29": "Round 29",
 "jornada30": "Round 30",
 "jornada31": "Round 31",
 "jornada32": "Round 32",
 "jornada33": "Round 33",
 "jornada34": "Round 34",
 "jornada35": "Round 35",
 "jornada36": "Round 36",
 "jornada37": "Round 37",
 "jornada38": "Round 38",
 "freeNotificaciones": "In the free version, only notifications for 'My Team'. Click here to see the differences",
 "gol" : "Goal: ",
 "yellowCard" : "Yellow card: ", 
 "redCard" : "Red card: ",
 "noLogin" : "Not logged in",
 "errorDetTweet" : "There was an error getting the tweet:",
 "errorFavorito" : "There was an error: ",
 "errorNoFavorito" : "There was an error: ",
 "errorRetweet" : "There was an error in making the retweet: ",
 "updateTweetOK" : "It has been successfully posted the message on twitter",
 "updateTweetNOK" : "There was an error while posting the tweet -> ",
 "updateFacebookOK": "It has been successfully posted the message on Facebook",
 "loading": "Loading",
 "sinComenzar" : "Not st.",
 "finalizado" : "Fin.",
 "suspendido" : "Susp.",
 "enJuego" : "On live",
 "rankingME" : "Ranking My team",
 "sinPublicidad" : "No ads",
 "infoCanales" : "On live scores, with TV channels",
 "infoNotif" : "Notifications of teams you want",
 "versionPRO" : "PRO Version",
 "jornadaOctavos" : "Round of 16",
 "jornadaCuartos" : "Round of 8",
 "jornadaSemis" : "Semifinals",
 "jornadaFinal" : "Final"
 };

var montharray = new Array("January","February","March","April","May","June","July","August","September","October","November","December");

var i18n = {
 "Noticias": "Notizie",
 "Clasificación": "Classificazione",
 "Cuartos": "Quarti di finale",
 "Semifinal": "Semifinale",
 "Final": "Finale",
 "EQUIPO": "SQUADRA",
 "Calendario": "Calendario",
 "Grupos": "Gruppi",
 "Fase Final": "Fase finale",
 "Mi selección": "La mia squadra",
 "Partidos en vivo": "Partite in diretta",
 "Partidos en vivo!": "Partite in diretta",
 "Notificaciones": "Notifiche",
 "Selecciones" : "Squadre",
 "¿De qué selecciones deseas recibir alertas?": "Quali squadre desidera ricevere gli avvisi?",
 "PJ": "G",
 "PG": "V",
 "PE": "N",
 "PP": "P",
 "Detalle": "Dettaglio",
 "Goleadores" : "Marcatori",
 "Ajustes" : "Impostazioni",
 "Vibracion" : "Vibrazione",
 "Sonido" : "Suono",
 "Alertas" : "AVVISI",
 "Inicio" : "LOGON",
 "Conectado": "Collegato",
 "Desconectado": "Disconnesso",
 "Comentar": "Commento",
 "publicarTwitter": "Pubblicare su Twitter",
 "publicarFacebook": "Pubblicare su Facebook",
 "publicarEventos": "Pubblicare gli eventi di partito",
 "Publicar": "Pubblicare",
 "jornada1": "Giornate 1",
 "jornada2": "Giornate 2",
 "jornada3": "Giornate 3",
 "jornada4": "Giornate 4",
 "jornada5": "Giornate 5",
 "jornada6": "Giornate 6",
 "jornada7": "Giornate 7",
 "jornada8": "Giornate 8",
 "jornada9": "Giornate 9",
 "jornada10": "Giornate 10",
 "jornada11": "Giornate 11",
 "jornada12": "Giornate 12",
 "jornada13": "Giornate 13",
 "jornada14": "Giornate 14",
 "jornada15": "Giornate 15",
 "jornada16": "Giornate 16",
 "jornada17": "Giornate 17",
 "jornada18": "Giornate 18",
 "jornada19": "Giornate 19",
 "jornada20": "Giornate 20",
 "jornada21": "Giornate 21",
 "jornada22": "Giornate 22",
 "jornada23": "Giornate 23",
 "jornada24": "Giornate 24",
 "jornada25": "Giornate 25",
 "jornada26": "Giornate 26",
 "jornada27": "Giornate 27",
 "jornada28": "Giornate 28",
 "jornada29": "Giornate 29",
 "jornada30": "Giornate 30",
 "jornada31": "Giornate 31",
 "jornada32": "Giornate 32",
 "jornada33": "Giornate 33",
 "jornada34": "Giornate 34",
 "jornada35": "Giornate 35",
 "jornada36": "Giornate 36",
 "jornada37": "Giornate 37",
 "jornada38": "Giornate 38",
 "freeNotificaciones": "Nella versione gratuita solo inviare notifiche selezionato 'Mia squadra'. Clicca qui per vedere le differenze",
 "gol" : "Goal: ",
 "yellowCard" : "Cartellino giallo: ", 
 "redCard" : "Cartellino rosso: ",
 "noLogin" : "Non sei loggato",
 "errorDetTweet" : "Si &egrave; verificato un errore ottenendo il tweet:",
 "errorFavorito" : "Si &egrave; verificato un errore: ",
 "errorNoFavorito" : "Si &egrave; verificato un errore: ",
 "errorRetweet" : "Si &egrave; verificato un errore nel rendere il rispondi: ",
 "updateTweetOK" : "E 'stato correttamente inviato il messaggio su twitter",
 "updateTweetNOK" : "C'� stato un messaggio di errore postato in Twitter -> ",
 "updateFacebookOK": "Il messaggio &egrave; stato postato su Facebook correttamente",
 "loading": "Caricamento",
 "sinComenzar" : "Non iniz.",
 "finalizado" : "Fin.",
 "suspendido" : "Sosp.",
 "enJuego" : "In corso", 
 "rankingME" : "Ranking la mia squadra",
 "sinPublicidad" : "Nessun annuncio",
 "infoCanales" : "Il partite in diretta, con informazioni canali TV",
 "infoNotif" : "Notifiche di squadre che si desidera",
 "versionPRO" : "Versione PRO",
 "jornadaOctavos" : "Ottavi di finale",
 "jornadaCuartos" : "Quarti di finale",
 "jornadaSemis" : "Semifinale",
 "jornadaFinal" : "Finale"
 };

var dayarray = new Array("Venerd&igrave;", "Sabato", "Domenica", "Lunedi", "Marted&igrave;", "Mercoled&igrave;", "Giovedi");
var dayarray7  = new Array ("Giovedi", "Venerd&igrave;", "Sabato", "Domenica", "Lunedi", "Marted&igrave;", "Mercoled&igrave;");
var montharray = new Array("Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre");
