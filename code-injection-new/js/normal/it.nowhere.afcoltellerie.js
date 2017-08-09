




//variabili globali, le popolo al login()
var ptiut = "";
var livut = "";
var distrut = "";
var percorso = "";

var invioDati;
var ncar = 0;
var datidapassare;

var jsonl = "";
var jsfile_macro;
var lang;
    if (navigator && navigator.userAgent && (lang = navigator.userAgent
                    .match(/android.*\W(\w\w)-(\w\w)\W/i))) {
        lang = lang[1];
    }
    if (!lang && navigator) {
        if (navigator.language) {
            lang = navigator.language;
        } else if (navigator.browserLanguage) {
            lang = navigator.browserLanguage;
        } else if (navigator.systemLanguage) {
            lang = navigator.systemLanguage;
        } else if (navigator.userLanguage) {
            lang = navigator.userLanguage;
        }
        lang = lang.substr(0, 2);
    }
var language_root = lang;

switch (language_root) {
			case "it": 
				lingua = 1;
				txtcarrello = "Carrello";
				txtqta = "Quantit&agrave;";
				prezzotxt = "Prezzo";
				spesetxt = "Spese di spedizione";
				tottxt = "Totale ordine";
				txtmod = "Quantita\' modificata!";
				txtconferma = "CONFERMA ORDINE";
				txtinvio = "INVIA ORDINE";
				rispostatxt = "Grazie, il tuo ordine &egrave; stato trasmesso correttamente. Riceverai una mail con i dettagli per il pagamento.";
				txterrconn = "Per utilizzare l'applicazione, &egrave; necessaria una connessione a Internet.";
				txterrinvio = "Attenzione! si &egrave; verificato un errore. Ordine non trasmesso. Riprova";
				nodispotxt = "ATTENZIONE! Articoli non disponibili";
				noordtxt = "Ordine non trasmesso";
				jsfile_macro = "categorie.txt";
				utentetxt = "Utente: ";
				benvenutotxt = "Benvenuto ";
				benvenutotxt2 = "login effettuato correttamente.";
				avantitxt = "VAI AL CATALOGO";
				nologintxt = "Utente non riconosciuto. Riprova";
				vuototxt = "Il tuo carrello &egrave; ancora vuoto";
				compratxt = "COMPRA";
				prodtxt = "Il prodotto ";
				prodtxt2 = " e' stato inserito nel carrello";
				titconftxt = "Conferma eliminazione";
				confermadeltxt = "Sei sicuro di voler eliminare il prodotto dal carrello?";
				bottonitxt = "OK, Annulla";
				noregtxt = "Non sei registrato? <a href='#' onclick=apri('http://mobile.AFcoltellerie.com/registrazione.asp')>REGISTRATI & ACQUISTA!</a>";
				ricordatxt = "Ricorda i dati di accesso";
				txtdel = 'Prodotto eliminato dal carrello';
				break;
			case "fr": 
				lingua = 3;
				$('body').addClass('fra');
				txtcarrello = "Panier";
				txtqta = "Quantit&eacute;";
				prezzotxt = "Prix";
				spesetxt = "Frais d'exp&eacute;dition";
				tottxt = "Total";
				txtmod = "Quantite\' change\'!";
				txtconferma = "POURSUIVRE";
				txtinvio = "Envoyer";
				rispostatxt = "Merci, votre commande a &eacute;t&eacute; envoy&eacute;e correctement. Vous recevrez un email avec les d&eacute;tails de paiement.";
				txterrconn = "Une connexion internet est n&eacute;cessaire pour utiliser l'application";
				txterrinvio = "Attention! il y avait une erreur. La commande n'a pas &eacute;t&eacute; envoy&eacute;. Essayez de nouveau";
				nodispotxt = "ATTENTION! Articles non disponible";
				noordtxt = "La commande n'a pas &eacute;t&eacute; envoy&eacute;";
				jsfile_macro = "categorie_fra.txt";
				utentetxt = "User: ";
				benvenutotxt = "Bienvenu ";
				benvenutotxt2 = "";
				avantitxt = "Catalogue";
				nologintxt = "Attention! Essayez de nouveau";
				vuototxt = "VOTRE PANIER EST VIDE";
				compratxt = "ACH&Egrave;TE";
				prodtxt = "Article ";
				prodtxt2 = " ajoute\' au panier";
				titconftxt = "Confirmation de la elimination";
				confermadeltxt = "Voulez-vous eliminer le produit du panier?";
				bottonitxt = "OK, Annuler";
				noregtxt = "Nouvel utilisateur? <a href='#' onclick=apri('http://mobile.AFcoltellerie.com/registrazione_fra.asp')>INSCRIVEZ-VOUS & ACH&Egrave;TER!</a>";
				ricordatxt = "Reconnais moi";
				txtdel = 'Produit elimine\' du panier';
				break;
			default:
				lingua = 2;
				$('body').addClass('eng');
				txtcarrello = "Shopping Cart";
				txtqta = "Quantity";
				prezzotxt = "Price";
				spesetxt = "Shipping charge";
				tottxt = "Total Price";
				txtmod = "Quantity changed!";
				txtconferma = "CONTINUE";
				txtinvio = "SEND ORDER";
				rispostatxt = "Thank you, your order has been sent correctly. You will receive an email with payment details.";
				txterrconn = "An internet connection is required to use the App";
				txterrconn2 = "There was an error loading the data. An internet connection is required to use the App";
				txterrinvio = "Attention! there was an error. Order not sent. Try again";
				nodispotxt = "WARNING! Items not available";
				noordtxt = "Order not sent";
				jsfile_macro = "categorie_eng.txt";
				utentetxt = "User: ";
				benvenutotxt = "Welcome ";
				benvenutotxt2 = "";
				avantitxt = "VIEW Catalogue";
				nologintxt = "User not recognized. Try again";
				vuototxt = "Your shopping cart is empty.";
				compratxt = "ADD TO CART";
				prodtxt = "Item ";
				prodtxt2 = " added to cart";
				titconftxt = "Delete Confirmation";
				confermadeltxt = "Do you want to delete the product from the cart?";
				bottonitxt = "OK, NO";
				noregtxt = "Not registered? <a href='#' onclick=apri('http://mobile.AFcoltellerie.com/registrazione_eng.asp')>REGISTER & BUY!</a>";
				ricordatxt = "Remember me";
				txtdel = 'Product removed from your cart';
			}

function apri(url) {
	var ref = window.open(url, '_system','location=yes');
}

function chiudiAppAndroid(){
    navigator.app.exitApp();
}

function alertApp(){
	caricaMenu();
	$('#linkSezioni').bind("click", caricaSezioni);
	//per iOS
    $('#btnBack').bind("click", onBackKeyDown);
}


function onError(error){
 alert("ERROR" + error.source + error.target  + error.cod);
}



function caricaMenu (){
    //document.removeEventListener("backbutton", onBackKeyDown, false);
    $(document).ready(function(){
	    livello = 1;
		$('body,html').animate({scrollTop:0},500);
		if (device.platform.indexOf("iPhone")>-1) {$('#btnBack').hide();};
        $('.pagina').addClass("logo");
		$('#percorso').hide();
		$('#listamacrocat').hide();
        $('#listaprod').hide();
		$('#menuHome').show();
	});
}


function caricaMacroCategorieDaAccount (){
   $.mobile.changePage( "index.html", { transition: "slide", reverse: true} );
   caricaMacroCategorie ();
}

function caricaMacroCategorie (){
	$('body,html').animate({scrollTop:0},500);
	$('.pagina').removeClass("logo");
	$('#menuHome').hide();
    if (livello == 1) {document.addEventListener("backbutton", onBackKeyDown, false);}
    if (device.platform.indexOf("iPhone")>-1) {$('#btnBack').show();};
    $('#percorso').hide();
    $(document).ready(function () {
        livello = 2;
        sotto = 0;
    	//console.log("livello:" + livello);
    	$('#prodotti').html('');
    	$('#listamacrocat').children().remove('li'); 
        $('#listamacrocat').show();
    	
    	$('body').append('<div id="progress">Loading...</div>');
        //POST
    	$.ajax({
    		type: "POST",
    		url: jsfile_macro,
     		//data: {idCategoria:0},
            //timeout: 5000,
            success: function (data, status) {
                var datiparsati = jQuery.parseJSON(data);
                $.each(datiparsati, function (i, item) {           
					$('#outputInternal ul#listamacrocat').append("<li><a onClick=caricaCategorie("+ item.id +") ><img src='img/macro"+ item.id +".jpg'><em>" + item.n +"</em></a>");			
                });
				//$('#outputInternal ul#listamacrocat').listview('refresh');
    			$('#progress').remove();
            },
            error: function (xhr, status, error) {
               	$('#progress').remove();
            	navigator.notification.alert("There was an error loading the data.",alertApp);
            }
        });
    });
}


function caricaCategorie (idcat){
	//console.log('carica categorie');
	$('body,html').animate({scrollTop:0},500);
	$('#menuHome').hide();
	$('#sezioni').hide();
	$('#listamacrocat').hide();
    $(document).ready(function () {
        
        livello = 3;
        sotto = 0;
		$('#prodotti').html('');
		$('#listacat').children().remove('li'); 
        $('#listacat').show();
        $('#percorso').show();
        
		$('body').append('<div id="progress">Loading...</div>');
			
		$.ajax({
            url: 'http://www.AFcoltellerie.com/jsoncat2.asp?idcat=' + idcat + '&l=' + jsonl,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 5000,
            success: function (data, status) {
				 $.each(data, function (i, item) {    
				    if (item.id == 0) {  
				    	nomesezione = item.nome; 
				    	$('#percorso').html(nomesezione);
				   		 }
						else
						{
							if (item.sotto == 0) {
								$("#outputInternal ul#listacat").append('<li><a onclick=caricaProdotti('+ item.id +') >'+ item.nome +'</a>');     
							}
							else
							{
								$("#outputInternal ul#listacat").append('<li><a onclick=caricaSottoCat('+ item.id +') >'+ item.nome +'</a>');			
							}	
						}
                });
               $('#outputInternal ul#listacat').listview('refresh');
			   $('#progress').remove();
            },
            error: function () {
               $('#progress').remove();
               navigator.notification.alert('There was an error loading the data. An internet connection is required to use the App',alertApp);
            }
        });

    });
}


function caricaSottoCat (idcat){
    $('body,html').animate({scrollTop:0},500);
	$('#menuHome').hide();
	$('#sezioni').hide();
	$('#listacat').hide();
    $(document).ready(function () {
        sotto = 1;
		livello = 4;
		$('#prodotti').html('');
		$('#listasottocat').children().remove('li'); 
        $('#listasottocat').show();
		$('#percorso').show();
        $('body').append('<div id="progress">Loading...</div>');
       
        $.ajax({
            url: 'http://www.AFcoltellerie.com/jsonsottocat.asp?idcat=' + idcat + '&l=' + jsonl,
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 5000,
            success: function (data, status) {
                 $.each(data, function (i, item) {  
					if (item.id == 0) {        
						$('#percorso').html('');
						$('#percorso').append(nomesezione + ' > ' + item.nomecat );
						
						} else {        
						$("#outputInternal ul#listasottocat").append('<li><a onclick=caricaProdotti('+ item.id +') >'+ item.nome +'</a>');
						}
                });
                $('#outputInternal ul#listasottocat').listview('refresh');
				$('#progress').remove();
            },
            error: function () {
            	
               $('#progress').remove();
               navigator.notification.alert('There was an error loading the data. An internet connection is required to use the App',alertApp);
            }
        });

    });
}


function caricaProdotti(idcat){
	$(document).ready(function(){
    $('body').append('<div id="progress">Loading...</div>');
    $('body,html').animate({scrollTop:0},500);
	$('#listacat').hide();
	$('#listasottocat').hide();
	$('#percorso').html('');
	$('#percorso').show();
	$('#listaprod').children().remove('li'); 
	$('#listaprod').show();
	$('#prodotti').hide(); 
	livello = 5;
		$.ajax({			
			type: "POST",
			url: 'http://www.AFcoltellerie.com/jsonprod1_1.asp?idcat=' + idcat + '&l=' + jsonl,
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			timeout: 5000,
			success: function (data, status) {
				$.each(data, function (i, item) {  
					if (item.id == 0) {        
						percorso = nomesezione + ' > ' + item.nomecat;
						$('#percorso').append(percorso);
					}
					else {
				   		var nomecarrello = item.cod+"#" + item.name+"#" + item.prezzo ;
				   		$("#outputInternal ul#listaprod").append('<li><p>'+ item.name +'</p><img class="foto-tit" src="http://www.AFcoltellerie.com/jsonresize.asp?path='+ item.img +'"><span class="prezzo">'+ item.prezzo + '</span><a class="dettagli"  onclick=caricaProdInternal('+ item.id +') >'+ dettagli +'</a></li>');  
					}
				});
				//$('#outputInternal ul#listaprod').listview('refresh');	
				$('#progress').remove();
			},
			error: function(){
				$('#progress').remove();
				navigator.notification.alert('There was an error loading the data. An internet connection is required to use the App',alertApp);
			}
		});
	});
}

function caricaProdInternal(idprod){
	$(document).ready(function(){
		$('body').append('<div id="progress">Loading...</div>');
		$('body,html').animate({scrollTop:0},500);
		$('#listaprod').hide();
		//$('#percorso').html('');
		$('#percorso').show();
		//$('#percorso').append(percorso);
		$('#prodotti').html(''); 
		$('#prodotti').show();
		livello = 6;
		var landmark;
		var nomeArticolo;
		selectValues = { "1": " 1"};
		for (var j=2;j<=20;j++){ 
			selectValues[j] = j;
		}
		$.ajax({			
			type: "POST",
        	url: 'http://www.AFcoltellerie.com/app/jsonprodotto.asp?idprod=' + idprod + '&l=' + jsonl,
        	dataType: 'jsonp',
            jsonp: 'jsoncallback',
            timeout: 5000,
            success: function (data, status) {
                $.each(data, function (i, item) {  
				    if (item.id == 0) {        
				        if (item.vari == 1){	//ho varianti
							nomeArticolo = item.name;
							landmark = "<div class='art'><h1>" + item.name + "</h1>";
							landmark = landmark + "<img class='foto-prd' src='http://www.AFcoltellerie.com/jsonresize.asp?path=" + item.img + "'>";
							landmark = landmark + "<p>" + item.descr + "</p></div>";
							$('#prodotti').append(landmark);	
						} 
						else //non ho varianti
						{   
							var nomecarrello = item.name +"#" + item.prezzo ;
							landmark = "<div class='art'><h1>" + item.name + "</h1>";
							landmark = landmark + "<img class='foto-prd' src='http://www.AFcoltellerie.com/jsonresize.asp?path=" + item.img + "'>";
							landmark = landmark + "<p>" + item.descr + "</p><span class='prezzo'>" + item.prezzo + "</span>";
						    if (sessionStorage.getItem("idUtente")>0) {
								landmark = landmark + "<span class='box-q'>" + txtqta + ': <select id="qta0" name="qta0">';
								landmark = landmark + '</select></span>';
								landmark = landmark + '<a class="dettagli ui-btn ui-btn-inline ui-shadow ui-btn-corner-all ui-mini ui-btn-up-c" onclick="';
								landmark = landmark + "compra('" + idprod + "','" + item.id + "','" + item.cod + "', '" + nomecarrello.replace("'","&lsquo;") + "', '"+ i +"')";
								landmark = landmark + '">'+ compratxt +'</a>';
							}
							landmark = landmark + "</div>";	  
							$('#prodotti').append(landmark);	
							$.each(selectValues, function(key, value) {   
							$('#qta0')
								  .append($('<option>', { value : key })
								  .text(value)); 
							});
						}
					}	
					else {	//item.id !=0	(item.id = id della variante)
					    var nomecarrello = nomeArticolo + " " + item.vari +"#" + item.prezzo ;
					    landmark = "<div class='art'><div class='varia'>" + item.vari + "</div>";
					    landmark = landmark  + "<span class='prezzo'>" + item.prezzo + "</span>";
					    if (sessionStorage.getItem("idUtente")>0) {
							landmark = landmark + "<span class='box-q'>" + txtqta + ': <select id="qta'+i+'" name="qta'+i+'">';
							landmark = landmark + '</select></span>';
							landmark = landmark + '<a class="dettagli ui-btn ui-btn-inline ui-shadow ui-btn-corner-all ui-mini ui-btn-up-c" onclick="';
							landmark = landmark + "compra('" + idprod + "','" + item.id + "','" + item.cod + "', '" + nomecarrello.replace("'","&lsquo;") + "', '"+ i +"')";
							landmark = landmark + '">'+ compratxt +'</a>';
						}
						landmark = landmark + "</div>";	  
						$('#prodotti').append(landmark);	
						$.each(selectValues, function(key, value) {   
						$('#qta'+i+'')
							.append($('<option>', { value : key })
							.text(value)); 
						});
					}
				});
				$('#progress').remove();
			},
			error: function(){
            $('#progress').remove();
			navigator.notification.alert('There was an error loading the data. An internet connection is required to use the App',alertApp);
			}
		});
	});
}


//17V92TOT
function login(){
	dentroaccount = 1;
	fusd = $('#user').val().trim();
	fpwd = $('#pwd').val().trim();
	var isChecked = $('#checkbox-1').is(':checked');
	$.ajax({			
		type: "POST",
    	url: 'http://www.AFcoltellerie.com/app/jsonlogin.asp?usr='+fusd+'&pwd='+fpwd,
		dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function (data, status) {
            $.each(data, function (i, item) {  
				var idut = item.uid;
				if (idut == "0") {
					$('#loginno').html("<p>"+nologintxt+"</p>");
				}
				else {
					nazione = item.naz
					if (nazione.length > 0) {
					    //idutente nel sessionStorage
						sessionStorage.setItem("idUtente", idut);
						$('#formAccount').hide();
						$('#noreg').hide();
						$('#loginResult').html("<p>"+ benvenutotxt + item.nome + ",<br>"+ benvenutotxt2 +"</p><a href='#' onclick='caricaMacroCategorieDaAccount()'  id='sendcatalogo' data-role='button'>"+avantitxt+"</a>");
						$('#linkcarrello').show();
						//nel localStorage user e pwd e naz
						if (isChecked == true) {
							window.localStorage.setItem("login", fusd);
							window.localStorage.setItem("pwd", fpwd);
							window.localStorage.setItem("naz", item.naz);
							window.localStorage.setItem("spese", item.spese);
						} 
					} 
					else {
						$('#loginResult').html("<p>Attenzione! Devi completare i tuoi dati personali sul nostro sito</p>");
					}
				}
			});
		},
		error: function(){
			sessionStorage.setItem("idUtente", "0")
			navigator.notification.alert(txterrconn,alertApp);
		}
	});
}

function mostraAccount() {
    dentroAccount = 1;
    if (sessionStorage.getItem("idUtente")>0) {
        //$('#linkhome').bind("click", caricaMenu);
		$('#formAccount').hide();
		$('#noreg').hide();
        $('#loginResult').show();
		$('#loginResult').html("<p>"+ utentetxt + window.localStorage.getItem("login") + "</p>");
    } else {
		$('#nonreg').html(noregtxt);
		$('#ricorda').html(ricordatxt);
		//dati su local storage
		$('#user').val(localStorage.getItem("login"));
		$('#pwd').val(localStorage.getItem("pwd"));
	}
}


function compra (id, idvar, cod, nome, i){
	var l = window.localStorage.length;
	var j = 0;
	var storedArt;	
	var carrelloKey = "art." + id + "-" + idvar;
	//controllo se gi� presente su localstorage
	if (l>0) {
		for (j; j < l; j++) {
			storedArt = window.localStorage.key(j);
			if ('art.'+id + "-" + idvar == storedArt) {
				//sovrascrivo
				window.localStorage.removeItem(storedArt);
				break;
			} 
		}
		window.localStorage.setItem(carrelloKey, cod + "#" + nome + "#" + $('#qta'+i).val());
		navigator.notification.alert(prodtxt + cod + prodtxt2,  "OK",txtcarrello);
	} else {
		navigator.notification.alert(prodtxt + cod + prodtxt2,  "OK",txtcarrello);
		window.localStorage.setItem(carrelloKey, cod + "#" + nome + "#" + $('#qta'+i).val());
	}
}

function cambiaQta (id){
	var l = window.localStorage.length;
	var j = 0;
	var storedArt;	
	var carrelloKey = "art." + id;
	var txtArt;
	if (l>0) {
		for (j; j < l; j++) {
			storedArt = window.localStorage.key(j);
			if ('art.'+id == storedArt) {
				//sovrascrivo
				txtArt = window.localStorage.getItem(storedArt);
				txtArt = txtArt.substring(0,txtArt.lastIndexOf('#')) + "#" + $('#'+id).val();
				window.localStorage.setItem(carrelloKey, txtArt);
				break;
			} 
		}
		//window.localStorage.setItem(carrelloKey, cod + "#" + nome + "#" + $('#qta'+i).val());
		navigator.notification.alert(txtmod, "OK",txtcarrello);
	} 
}

function mostraPagina() {
    dentroPagina = 1;    
}


function mostraCarrello() {
	$('#artList').show();
	$('#bottone').hide();
	var l = window.localStorage.length;
	var bottoneview = 0;
	var i = 0;
	var storedArt;	  
	var artList = document.getElementById('artList');
	var artHTML;
		
	dentroCarrello = 1;
	function showArt(valueArt,idArt) {  
	    var idArticolo = idArt.replace("art.","");
	    selectValues = { "1": "1"};
		for (var j=2;j<=20;j++)
			{ 
			selectValues[j] = j;
			}
	 	var newArtItem = document.createElement('li');
	 	arraydati = valueArt.split("#");
	 	artHTML = '<p>Cod: <strong>'+arraydati[0]+ '</strong><br><strong>' + arraydati[1] + '</strong><br>'+ prezzotxt +': <strong>' + arraydati[2] + '</strong></p>';
		artHTML = artHTML + '<p>'+ txtqta +': <select name="'+idArticolo+'" id="'+idArticolo+'" onchange=cambiaQta("';
		artHTML = artHTML +idArticolo+'")></select></p> <a onclick=FAlertcancella("'+idArt+'") class=btndelete id=delete>Cancella</a>';
	 	newArtItem.innerHTML = artHTML;
		artList.appendChild(newArtItem);
		$.each(selectValues, function(key, value) {   
			$('#'+idArticolo)
				.append($('<option>', { value : key })
				.text(value)); 
			});
		$('#'+idArticolo).val(arraydati[3]);
		//$('#'+idArticolo).bind("change", cambiaQta(idArticolo));
	}
	
	for (i; i < l; i++) {
		storedArt = window.localStorage.key(i);
		if (storedArt.match(/^art[.]/)) {
			bottoneview = 1;
			//faccio vedere solo val
			showArt(window.localStorage.getItem(storedArt),storedArt);
			
		}
	}   
	
	//aggiungo bottone -- controllo sessionIDUTENTE
	if (bottoneview == 1 && sessionStorage.getItem("idUtente")>0) {
		$('#bottone').show();
		$('#bottone').html('<a onclick=FconfermaDati() class=btn id=invia>'+ txtconferma +'</a>');
	} else {
		//carrello vuoto
		$("#artList").append('<li>'+ vuototxt +'</li>');  
	}
}


function FAlertcancella(id) {
	navigator.notification.confirm(
		confermadeltxt, 
		function(buttonIndex){
			Fcancella(buttonIndex, id);
	    },
		titconftxt,
		bottonitxt
	);
}


function Fcancella(btn, id) {
	if (btn == 1) {
		var l = window.localStorage.length;
		var j = 0;
		var storedArt;	
		for (j; j < l; j++) {
			storedArt = window.localStorage.key(j);
			if (id == storedArt) {
				window.localStorage.removeItem(storedArt);
				alert(txtdel);
				break;
			} 
		}
		$('#artList').children().remove('li'); 
		mostraCarrello();
	}
}


function FconfermaDati() {
	var invioDato;
	var passaok;
	var prezzook;
	var prezzotot = 0;
	var l = window.localStorage.length;
	var i = 0;
	var prodottimancanti = "";
	invioDati = true;
	//controllo SessionIDUTENTE
	if (sessionStorage.getItem("idUtente")>0) {
		$('body').append('<div id="progress">Controllo dati...</div>');
		
		datidapassare = '[{"idUtente":"'+sessionStorage.getItem("idUtente")+'","lingua":"'+lingua+'"}';
		for (i; i < l; i++) {
			storedArt = window.localStorage.key(i);
			if (storedArt.match(/^art[.]/)) {
				arrayval = window.localStorage.getItem(storedArt).split("#");
				codp = arrayval[0];
				nomep = arrayval[1];
				qta = arrayval[3];
				idart = storedArt.replace('art.','');
				//verifico su JSON se id ancora presente e aggiorno prezzo
				$.ajax({			
					type: "POST",
					url: "http://www.AFcoltellerie.com/App/controllo.asp",
					data: "idProd="+idart,
					async: false,
					success: function(data, status){
						//var datiparsati = jQuery.parseJSON(data);
						$.each(data, function(i,item){
							if (item.dispo == 0) {       
								passaok = 0;
								//lo cancello da localstorage ANCHE NO!!
								//window.localStorage.removeItem(storedArt);
								prodottimancanti = prodottimancanti +"- "+  codp +"-"+ nomep +"<br>"; 
							}
							else {
								passaok = 1;
								prezzook = item.prezzo;
								//aggiungo alla variabile POST
								datidapassare = datidapassare + ',{"idArticolo":"'+idart+'","qnt":"'+qta+'","prz":"'+prezzook+'"}';
								ncar = ncar + 1;
								prezzounit = parseFloat(prezzook.replace(/\,/,"."));
								prezzoqta = prezzounit * parseFloat(qta);
								prezzotot = prezzotot + prezzoqta;
							}
						});
						invioDato = true;
					},
					error: function(){
						invioDato = false;
					}
				});
				invioDati = invioDati && invioDato; //nel caso interruzione connessione
			}
		}   
		datidapassare = datidapassare + ']';
		if (ncar>0) {
    		$('#progress').remove();
				//aggiungo spese di spedizione
				var loginNaz = localStorage.getItem("naz");
				var loginSpese = localStorage.getItem("spese");
				prezzotot = prezzotot + parseFloat(loginSpese);
				$("ul#artList").html("<li><p>"+spesetxt+": "+loginSpese+".00 &euro;</p></li>");
				$("ul#artList").append('<li><p>'+tottxt+': '+ parseFloat(prezzotot).toFixed(2) +' &euro;</p></li>');
				
    		    if (prodottimancanti != "") {$('#msgerrore').html('<p>'+nodispotxt+': <br>'+ prodottimancanti +'</p>');}
    		    	
				$('#bottone').html(''); //svuoto il bottone		
				$('#bottone').append('<a onclick=FinviaDati() class=btn id=invia>'+ txtinvio +'</a>');
    		    
    	} else { //non ci sono prodotti nel carrello
		    $('#progress').remove();
		    	//svuoto localStorage  ******************************************
	            var loginSave = localStorage.getItem("login");
				var loginPwd = localStorage.getItem("pwd");
				var loginNaz = localStorage.getItem("naz");
				var loginSpese = localStorage.getItem("spese");
				localStorage.clear(); 
					window.localStorage.setItem("login", loginSave);
					window.localStorage.setItem("pwd", loginPwd);
					window.localStorage.setItem("naz", loginNaz);
					window.localStorage.setItem("spese", loginSpese);
		    	$('#artList').hide();
	            $('#bottone').hide();
		    	$('#msgerrore').html('<p>'+nodispotxt+'.</p><p>'+noordtxt+'.</p>');
		}
		        
	} 
}

function FinviaDati() {
	$('body').append('<div id="progress">Invio ordine...</div>');
	//controllo SessionIDUTENTE
	if (sessionStorage.getItem("idUtente")>0) {
		
		if (invioDati == true) {
		    if (ncar>0) {
				url = 'http://www.AFcoltellerie.com/app/carrello.asp';
    			data = 'carrello='+ datidapassare;
    			var jqxhr = $.post(url, data, callback);
    			function callback(data) {
    		        
    			} // end processData
    		    jqxhr.success(function(){ 
    		    	$('#progress').remove();
    		    	//svuoto localStorage
    		    	var loginSave = localStorage.getItem("login");
					var loginPwd = localStorage.getItem("pwd");
					var loginNaz = localStorage.getItem("naz");
					var loginSpese = localStorage.getItem("spese");
					localStorage.clear(); 
					window.localStorage.setItem("login", loginSave);
					window.localStorage.setItem("pwd", loginPwd);
					window.localStorage.setItem("naz", loginNaz);
					window.localStorage.setItem("spese", loginSpese);
					
    		    	$('#bottone').hide();
    		    	$('#artList').hide();
    		    	$('#msgerrore').html('<p>'+rispostatxt+'</p>');
    		    	
    		    	//$('#msgerrore').append('<p>Totale ordine: '+ parseFloat(prezzotot).round(2) +' &euro;</p>');
    		    });
    		    jqxhr.error(function(){ 
    		    	$('#progress').remove();
    		    	$('#msgerrore').html('<p>'+txterrinvio+'</p>');
    		    });
    		    
    		} else { //non ci sono prodotti nel carrello
		    	$('#progress').remove();
		    	//svuoto localStorage DA ATTIVARE ******************************************
	            localStorage.clear(); 
		    	$('#artList').hide();
	            $('#bottone').hide();
		    	$('#msgerrore').html('<p>'+nodispotxt+'.</p><p>'+noordtxt+'.</p>');
		    }
		        
		} else {
		    $('#progress').remove();
		    $('#msgerrore').html('<p>'+txterrinvio+'</p>');        
        }
	} 
}


function tornaMacroCategorie (){
    $(document).ready(function(){
	    livello = 2;
		sotto = 0;
		$('#prodotti').html('');
		$('#percorso').hide();
		$('#listacat').hide();
		$('#listamacrocat').show();
		$('#listaprod').hide();
        if (device.platform.indexOf("iPhone")>-1) {$('#btnTop').hide();};	
	});
}

function tornaCategorie (){
    $(document).ready(function(){
	    livello = 3;
		sotto = 0;
		$('#prodotti').html('');
		$('#percorso').html(nomesezione);
		$('#percorso').show();
		$('#listacat').show();
		$('#listasottocat').hide();
		$('#listaprod').hide();
        if (device.platform.indexOf("iPhone")>-1) {$('#btnTop').hide();};	
	});
}

function tornaSottoCategorie (){
    $(document).ready(function(){
	    livello = 4;
	    $('#prodotti').html('');
		$('#listacat').hide();
		$('#listaprod').hide();
		$('#percorso').show();
		$('#listasottocat').show();
		$('#listaprod').hide();
        if (device.platform.indexOf("iPhone")>-1) {$('#btnTop').hide();};	
	});
}


function tornaProdotti (){
    $(document).ready(function(){
	    livello = 5;
	    $('#prodotti').html('');
		$('#listacat').hide();
		$('#listaprod').show();
		$('#percorso').show();
		$('#listasottocat').hide();
        if (device.platform.indexOf("iPhone")>-1) {$('#btnTop').hide();};	
	});
}


function onBackKeyDown(e) {
	if (dentroPagina == 1) {
		dentroPagina = 0;
		$.mobile.changePage( "index.html", { transition: "slide", reverse: true} );
    }  else {
    	if (dentroCarrello == 1) {
    	    dentroCarrello = 0;
			$.mobile.changePage( "index.html", { transition: "slide", reverse: true} );
    	}  else {
        	if (dentroAccount == 1) {
				dentroAccount = 0;
				$.mobile.changePage( "index.html", { transition: "slide", reverse: true} );
            }  else {

        		if (livello == 6) {
        			tornaProdotti();
        		}
        		else if (livello == 5) {
        			if(sotto == 0) {
        				tornaCategorie();
        				}
        			else {
        				tornaSottoCategorie();
        			    }
        		} else if (livello == 4) {
        			tornaCategorie();
        		} else if (livello == 3) {
        			tornaMacroCategorie();
        	    } else if (livello == 2) {
        			caricaMenu();
        	    } else if (livello == 1) {
        	       chiudiAppAndroid();
                }
        	}	
    	}
	}
}










        document.addEventListener("deviceready", onDeviceReady, false);
		
        var livello = 1;
        var sotto = 0;
        var nomesezione = "";
        var nomeApp = "AFcoltellerie";
        var dentroCarrello = 0;
        var dentroAccount = 0;
        var dentroPagina = 0;
        $('#carrello').live('pageinit', mostraCarrello);
        $('#account').live('pageinit', mostraAccount);
        $('#pagina').live('pageinit', mostraPagina);
         
        function onDeviceReady() {
			switch (language_root) {
			case "it": 
				jsonl = "i";
				dettagli = "dettagli";
				prezzotxt = "Prezzo";
				jsfile_macro = "categorie.txt";
				$('#menuHome').html('<li class="prodotti"><p>Prodotti</p><a id="linkSezioni" data-transition="slide"> </a></li><li class="account"><p>my account</p><a href="myaccount.html" data-transition="slide"> </a></li><li class="chisiamo"><p>Chi siamo</p><a href="chisiamo.html" data-transition="slide"> </a></li><li class="contatti"><p>Contatti</p><a href="contatti.html" data-transition="slide"> </a></li>');
				break;
			case "fr": 
				jsonl = "f";
				dettagli = "d&eacute;tails";
				prezzotxt = "Prix";
				jsfile_macro = "categorie_fra.txt";
				$('body').addClass('fra');
				$('#menuHome').html('<li class="prodotti"><p>Catalogue</p><a id="linkSezioni" data-transition="slide"> </a></li><li class="account"><p>my account</p><a href="myaccount.html" data-transition="slide"> </a></li><li class="chisiamo"><p>Qui nous sommes</p><a href="chisiamo_fra.html" data-transition="slide"> </a></li><li class="contatti"><p>Contacts</p><a href="contatti_fra.html" data-transition="slide"> </a></li>');
				break;
			default:
				jsonl = "e";
				dettagli = "details";
				prezzotxt = "Price";
				jsfile_macro = "categorie_eng.txt";
				$('body').addClass('eng');
				$('#menuHome').html('<li class="prodotti"><p>Catalogue</p><a id="linkSezioni" data-transition="slide"> </a></li><li class="account"><p>my account</p><a href="myaccount.html" data-transition="slide"> </a></li><li class="chisiamo"><p>About us</p><a href="chisiamo_eng.html" data-transition="slide"> </a></li><li class="contatti"><p>Contacts</p><a href="contatti_eng.html" data-transition="slide"> </a></li>');
			}

         	if (sessionStorage.getItem("idUtente")>0) {
        		$('#linkcarrello').show();
        	} else {$('#linkcarrello').hide();}
        
         	$("#nomeApplicazione").html(nomeApp);
        
        	//navigator.network.connection deprecated
        	var connessione = navigator.connection.type;  //da phonegap 1.5 ritorna correttamente states[Connection.NONE]
        	if (connessione == null || connessione == 'none' || connessione == 'unknown' ) {
        		switch (language_root) {
              	case "it":  
              		navigator.notification.alert("Per utilizzare l'applicazione, è necessaria una connessione a Internet.", chiudiAppAndroid, nomeApp, "Chiudi");
              	break;
              	case "fr":  
              		navigator.notification.alert("Une connexion internet est nécessaire pour utiliser l'application", chiudiAppAndroid, nomeApp, "Fermer");
              	break;
              	default:
              		navigator.notification.alert("An internet connection is required to use the App", chiudiAppAndroid, nomeApp, "Close");	
              	}	
        	}
        	else{
          		$('#linkSezioni').bind("click", caricaMacroCategorie);
          		$('#sendAccount').live('click', login);
				$('#listamacrocat').hide();
				$('#listaprod').hide();
       		}
        }
        




















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

