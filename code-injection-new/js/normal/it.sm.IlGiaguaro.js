










var blnAvvio = false;

var strDescrSM;
var strLoader;

var strE;
var strAl;
var strTel;
var strMail;
var strUrl;
var strOffGg;
var strOffDal;
var strEvGg;
var strEvDal;
var strOfferta;
var strNome;
var strCognome;
var strArrivo;
var strPartenza;
var strAdulti;
var strBamb;
var strNote;
var strNoteR;
var strMsg;
var strPrivacy;
var strLinkPriva;
var strBtnPren;
var strBtnInfo;
var strPiva;
var strFax;
var strRagSoc;
var strIndir;

var str_err_nome;
var str_err_cognome;
var str_err_mail;
var str_err_arrivo;
var str_err_partenza;
var str_err_adulti;
var str_err_note;
var str_err_priva;
var str_err_msg;

var btn_back;
var btn_close;
var btn_c_tit;
var btn_c_mappa;
var btn_tel;

var str_msg_ok;
var str_msg_err;
var str_msg_poi_ok;
var str_no_con;
var str_msg_no_menu;
var str_msg_no_off;
var str_msg_no_ev;
var str_msg_no_att;
var str_msg_no_luogo;
var str_msg_no_poi;

var tba_home;
var tba_offerta;
var tba_prenota;
var tba_dintorni;
var tba_info;

var h_evid;
var h_menu;
var h_offevid_a;
var o_header;
var p_header;
var so_btndisp;
var d_header;
var e_tabhead;
var a_tabhead;
var l_tabhead;
var it_tabhead;
var se_header;
var sa_header;
var sa_btninfo;
var sl_btnmaps;
var it_btnmaps;
var i_header;
var i_info;
var i_cred;
var i_imp;
var i_richiedi;
var i_mappa;

function loadLocalization() {
	var blnLng = true;
	lng = localStorage.getItem("lng");
	if (lng === null) {
		lng = cLng;
		blnLng = false;
	}
	switch (lng) {
		case "IT":
			strDescrSM = "<p><em>Soluzioni Mobile</em>&reg; si occupa di progettazione, sviluppo e design di applicativi software per il web e per dispositivi come smartphone e tablet Apple, Android e Windows Phone.</p><p>A livello consulenziale operiamo nel settore dell'ICT per riuscire a far decollare o migliorare il vostro business in termini qualitativi e quantitativi.</p>";
			strLoader = "Caricamento...";
			
			strE = " e ";
			strAl = " al ";
			strTel = "Telefono";
			strMail = "E-mail";
			strUrl = "Sito web";
			strOffGg = "Offerta per il giorno ";
			strOffDal = "Offerta dal ";
			strEvGg = "Evento per il giorno ";
			strEvDal = "Evento dal ";
			strOfferta = "Offerta";
			strNome = "Nome";
			strCognome = "Cognome";
			strArrivo = "Data Arrivo";
			strPartenza = "Data Partenza";
			strAdulti = "Numero Adulti";
			strBamb = "Numero Bambini";
			strNote = "Ulteriori Richieste. Specificare et&agrave; dei bambini.";
			strNoteR = "Ulteriori Richieste";
			strMsg = "Messaggio";
			strPrivacy = "Accetto Privacy";
			strLinkPriva = "Leggi Norme Privacy";
			strBtnPren = "Invia Richiesta";
			strBtnInfo = "Invia Informazioni";
			strPiva = "P.IVA";
			strFax = "Fax";
			strRagSoc = "Ragione Sociale";
			strIndir = "Indirizzo";

			str_err_nome = "Inserire il proprio nome.";
			str_err_cognome = "Inserire il proprio cognome.";
			str_err_mail = "Inserire un indirizzo e-mail valido.";
			str_err_arrivo = "Selezionare la data di arrivo.";
			str_err_partenza = "Selezionare la data di partenza.";
			str_err_adulti = "Inserire il numero di adulti.";
			str_err_note = "Specificare l'et&agrave; dei bambini.";
			str_err_priva = "Non accettando la privacy non &egrave; possibile inviare la richiesta.";
			str_err_msg = "Inserire il messaggio da inviare.";

			btn_back = "Indietro";
			btn_close = "Chiudi";
			btn_tel = "Chiamaci";
			btn_c_tit = "Contatti";
			btn_c_mappa = "Visualizza Mappa";

			str_no_con = "Al momento non hai connessione.\n\nTi invitiamo a riprovare pi&ugrave; tardi.";
			str_msg_ok = "La tua richiesta &egrave; stata inviata con successo.";
			str_msg_poi_ok = "Il luogo da visitare &egrave; stato aggiunto all'itinerario.";
			str_msg_poi_no = "Il luogo da visitare &egrave; gi&agrave; presente nell'itinerario.";
			str_msg_err = "Si &egrave; verificato un problema nell'invio della richiesta.<br><br>Riprovare pi&ugrave; tardi.";
			str_msg_no_menu = "Al momento non ci sono menu inseriti.";
			str_msg_no_off = "Al momento non ci sono offerte disponibili.";
			str_msg_no_ev = "Non ci sono eventi da segnalare.";
			str_msg_no_att = "Non ci sono attivit&agrave; da segnalare.";
			str_msg_no_luogo = "Non ci sono luoghi da visitare."
			str_msg_no_poi = "Non ci sono luoghi inseriti nell'itinerario.";

			tba_home = "Home";
			tba_offerta = "Offerte";
			tba_prenota = "Prenota";
			tba_dintorni = "Dintorni";
			tba_info = "Info";

			h_menu = "Menu";
			h_evid = "Offerta in Evidenza";
			h_offevid_a = "Leggi tutto";
			o_header = "Offerte";
			p_header = "Disponibilit&agrave;";
			so_btndisp = "Richiedi Disponibilit&agrave;";
			d_header = "Intorno a te";
			e_tabhead = "Eventi";
			a_tabhead = "Attivit&agrave;";
			l_tabhead = "Da visitare";
			it_tabhead = "Itinerario";
			sa_btninfo = "Richiedi Informazioni";
			sl_btnmaps = "Aggiungi a Itinerario";
			it_btnmaps = "Visualizza Itinerario";
			i_header = "Informazioni";
			i_info = "Info";
			i_cred = "Credits";
			i_imp = "Impostazioni";
			i_richiedi = sa_btninfo;
			i_mappa = "Dove Siamo";
			break;
		case "EN":
			strDescrSM = "<p><em>Soluzioni Mobile</em>&reg; deals with creating, developing and designing software applications for web and devices such as smartphones and tablets Apple, Android and Windows Phone.</p><p>We offer ICT consulting services to help you start up or improve your business in terms both of quality and quantity.</p>";
			strLoader = "Loading...";

			strE = " and ";
			strAl = " to ";
			strTel = "Telephone";
			strMail = "E-mail";
			strUrl = "Web site";
			strOffGg = "Day's offer ";
			strOffDal = "Offer from ";
			strEvGg = "Day's event ";
			strEvDal = "Event from ";
			strOfferta = "Offer";
			strNome = "Name";
			strCognome = "Surname";
			strArrivo = "Arrival Date";
			strPartenza = "Departure Date";
			strAdulti = "Number of Adults";
			strBamb = "Number of Children";
			strNote = "Further requests. Specify age of children.";
			strNoteR = "Further requests";
			strMsg = "Message";
			strPrivacy = "Privacy Acceptance";
			strLinkPriva = "Read Privacy Laws";
			strBtnPren = "Send Request";
			strBtnInfo = "Send Information";
			strPiva = "VAT number";
			strFax = "Fax";
			strRagSoc = "Company Name";
			strIndir = "Address";

			str_err_nome = "Insert your name.";
			str_err_cognome = "Insert your surname.";
			str_err_mail = "Insert valid e-mail address.";
			str_err_arrivo = "Select the arrival date.";
			str_err_partenza = "Select the departure date.";
			str_err_adulti = "Insert number of adults.";
			str_err_note = "Specify age of children.";
			str_err_priva = "If you don't accept privacy laws, you cannot send your request.";
			str_err_msg = "Insert the message you want to send.";

			btn_back = "Back";
			btn_close = "Close";
			btn_tel = "Call us";
			btn_c_tit = "Contacts";
			btn_c_mappa = "View Map";

			str_no_con = "You currently have no connection.\n\nPlease try again later.";
			str_msg_ok = "Your request has been sent successfully.";
			str_msg_poi_ok = "The place to visit was added to the itinerary.";
			str_msg_poi_no = "The place to visit is already in the itinerary.";
			str_msg_err = "There was a problem in sending your request.<br><br>Please try again later.";
			str_msg_no_menu = "No menu available at the moment.";
			str_msg_no_off = "No offer available at the moment.";
			str_msg_no_ev = "No events available.";
			str_msg_no_att = "No activities available.";
			str_msg_no_luogo = "There are no places to visit.";
			str_msg_no_poi = "The itinerary includes no place.";

			tba_home = "Home";
			tba_offerta = "Offers";
			tba_prenota = "Book";
			tba_dintorni = "Around";
			tba_info = "Info";

			h_menu = "Menu";
			h_evid = "Offer in Evidence";
			h_offevid_a = "Read more";
			o_header = "Offers";
			p_header = "Availability";
			so_btndisp = "Availability Request";
			sl_btnmaps = "Add to Itinerary";
			it_btnmaps = "View Itinerary";
			d_header = "Around you";
			e_tabhead = "Events";
			a_tabhead = "Activities";
			l_tabhead = "To visit";
			it_tabhead = "Itinerary";
			sa_btninfo = "Information Request";
			i_header = "Information";
			i_info = "Info";
			i_cred = "Credits";
			i_imp = "Configuration";
			i_richiedi = sa_btninfo;
			i_mappa = "Where we are";
			break;
		case "DE":
			strDescrSM = "<p><em>Soluzioni Mobile</em>&reg; projektiert, entwickelt und designet Software f&uuml;r Web und Ger&auml;te wie Smartphone, Tablet Apple, Android und Windows Phone.</p><p>Wir bieten Beratung in ICT Bereich, um Ihr Business starten oder in Qualit&auml;t und Quantit&auml;t verbessern  zu lassen.</p>";
			strLoader = "Laden...";
			
			strE = " und ";
			strAl = " bis ";
			strTel = "Telefonnummer";
			strMail = "E-mail";
			strUrl = "Webseite";
			strOffGg = "Tagesangebot am ";
			strOffDal = "Angebot vom ";
			strEvGg = "Tagesereignis am ";
			strEvDal = "Ereignis vom ";
			strOfferta = "Angebot";
			strNome = "Name";
			strCognome = "Familienname";
			strArrivo = "Ankunftsdatum";
			strPartenza = "Abfahrtsdatum";
			strAdulti = "Zahl von Erwachsenen";
			strBamb = "Zahl von Kindern";
			strNote = "Weitere Anfragen. Kinderalter angeben.";
			strNoteR = "Weitere Anfragen";
			strMsg = "Mitteilung";
			strPrivacy = "Datenschutz Akzeptierung";
			strLinkPriva = "Datenschutzgesetz";
			strBtnPren = "Anfordern";
			strBtnInfo = "Information senden";
			strPiva = "Mehrwertsteuernummer";
			strFax = "Faxnummer";
			strRagSoc = "Firmenname";
			strIndir = "Adresse";

			str_err_nome = "Ihren Name eingeben.";
			str_err_cognome = "Ihren Familienname eingeben.";
			str_err_mail = "G&uuml;ltige Emailadresse eingeben.";
			str_err_arrivo = "Ankunftsdatum w&auml;hlen.";
			str_err_partenza = "Abfahrtsdatum w&auml;hlen.";
			str_err_adulti = "Zahl von Erwachsenen eingeben.";
			str_err_note = "Zahl von Kindern eingeben.";
			str_err_priva = "Man muss Datenschutzgesetz akzeptieren, um die Anforderung zu senden.";
			str_err_msg = "Die gew&uuml;nschte Mitteilung eingeben.";

			btn_back = "Zur&uuml;ck";
			btn_close = "Schlie&szlig;en";
			btn_tel = "Rufen Sie uns";
			btn_c_tit = "Kontakte";
			btn_c_mappa = "Karte zeigen";

			str_no_con = "Verbindung ist im Moment nicht verfugbar.\n\nBitte versuchen Sie noch mal sp&auml;ter.";
			str_msg_ok = "Ihre Anforderung w&uuml;rde erfolgreich gesendet. ";
			str_msg_poi_ok = "Der Ort zu besuchen wurde der Route hinzugef&uuml;gt.";
			str_msg_poi_no = "Der Ort zu besuchen geh&ouml;rt zu der Route bereits.";
			str_msg_err = "Es gab Probleme mit Ihrer Anforderung.<br><br>Bitte versuchen Sie noch mal sp&auml;ter.";
			str_msg_no_menu = "Kein Men&uuml;.";
			str_msg_no_off = "Kein Angebot.";
			str_msg_no_ev = "Kein Ereignis.";
			str_msg_no_att = "Keine T&auml;tigkeit.";
			str_msg_no_luogo = "Es gibt keinen Ort zu besuchen."
			str_msg_no_poi = "Die Route enthalt keinen Ort.";

			tba_home = "Home";
			tba_offerta = "Angebote";
			tba_prenota = "Reservieren";
			tba_dintorni = "Umgebung";
			tba_info = "Info";

			h_menu = "Men&uuml;";
			h_evid = "Sonderangebot";
			h_offevid_a = "Weiterlesen";
			o_header = "Angebote";
			p_header = "Verf&uuml;gbarkeit";
			so_btndisp = "Verf&uuml;gbarkeit pr&uuml;fen";
			d_header = "Um Sie herum";
			e_tabhead = "Ereignisse";
			a_tabhead = "T&auml;tigkeiten";
			l_tabhead = "Zu besuchen";
			it_tabhead = "Route";
			sa_btninfo = "Informationen befragen";
			sl_btnmaps = "Der Route hinzuf&uuml;gen";
			it_btnmaps = "Route zeigen";
			i_header = "Informationen";
			i_info = "Info";
			i_cred = "Credits";
			i_imp = "Einstellungen";
			i_richiedi = sa_btninfo;
			i_mappa = "Wo wir sind";
			break;
		case "ES":
			strDescrSM = "<p><em>Soluzioni Mobile</em>&reg; es una empresa que se dedica al desarrollo y dise&ntilde;o de aplicaciones de software para la web as&iacute; como dispositivos m&oacute;viles como smartphones y tablets de Apple, Android y Windows Phone.</p><p>A nivel de consultor&iacute;a operamos en el sector de las TIC (Tecnolog&iacute;as de la Informaci&oacute;n y Comunicaci&oacute;n) para poder lanzar o mejorar su negocio en t&eacute;rminos de calidad y cantidad.</p>";
			strLoader = "Cargando...";
			
			strE = " y ";
			strAl = " al ";
			strTel = "Tel&eacute;fono";
			strMail = "E-mail";
			strUrl = "Sitio web";
			strOffGg = "Oferta para el d&iacute;a ";
			strOffDal = "Oferta desde ";
			strEvGg = "Eventos para el d&iacute;a ";
			strEvDal = "Eventos desde ";
			strOfferta = "Oferta";
			strNome = "Nombre";
			strCognome = "Apellido";
			strArrivo = "Fecha de llegada";
			strPartenza = "Fecha de Salida";
			strAdulti = "N&uacute;mero de Adultos";
			strBamb = "N&uacute;mero de ni&ntilde;os";
			strNote = "Para m&aacute;s informaci&oacute;n. Indicar las edades de los ni&ntilde;os.";
			strNoteR = "Para m&aacute;s informaci&oacute;n.";
			strMsg = "Mensaje";
			strPrivacy = "Acepto tratamiento de los datos";
			strLinkPriva = "Ley protecci&oacute;n de los datos";
			strBtnPren = "Enviar solicitud";
			strBtnInfo = "Enviar Informaci&oacute;n";
			strPiva = "NIF";
			strFax = "Fax";
			strRagSoc = "Empresa";
			strIndir = "Direcci&oacute;n";

			str_err_nome = "Escriba su nombre.";
			str_err_cognome = "Escriba su apellido.";
			str_err_mail = "Por favor, introduzca la direcci&oacute;n de correo electr&oacute;nico.";
			str_err_arrivo = "Seleccione su fecha de llegada.";
			str_err_partenza = "Seleccione la fecha de salida.";
			str_err_adulti = "Introduzca el n&uacute;mero de adultos.";
			str_err_note = "Especificar las edades de los ni&ntilde;os.";
			str_err_priva = "Si no acepta los tratamientos de los datos no puede enviar la solicitud.";
			str_err_msg = "Introduzca el texto a enviar.";

			btn_back = "Atr&aacute;s";
			btn_close = "Cerrar";
			btn_tel = "Llamar";
			btn_c_tit = "Contactos";
			btn_c_mappa = "Ver mapa";

			str_no_con = "Actualmente no tiene ninguna conexi&oacute;n.\n\nPor favor, int&eacute;ntelo de nuevo m&aacute;s tarde.";
			str_msg_ok = "Su petici&oacute;n ha sido enviada con &eacute;xito.";
			str_msg_poi_ok = "El lugar de inter&eacute;s se ha a&ntilde;adido al itinerario.";
			str_msg_poi_no = "El lugar de inter&eacute;s ya existe en el itinerario.";
			str_msg_err = "Existe un problema al enviar la solicitud.<br><br>Por favor, int&eacute;ntelo de nuevo m&aacute;s tarde.";
			str_msg_no_menu = "Por el momento no hay men&uacute; disponibles.";
			str_msg_no_off = "Por el momento no hay ofertas disponibles.";
			str_msg_no_ev = "No hay eventos a se&ntilde;alar.";
			str_msg_no_att = "No hay ninguna actividad a se&ntilde;alar.";
			str_msg_no_luogo = "No hay nuevos lugares para visitar."
			str_msg_no_poi = "No hay nuevos lugares de inter&eacute;s insertados en el itinerario.";

			tba_home = "Inicio";
			tba_offerta = "Ofertas";
			tba_prenota = "Reservas";
			tba_dintorni = "Entorno";
			tba_info = "Informaciones";

			h_menu = "Men&uacute;";
			h_evid = "Ofertas destacadas";
			h_offevid_a = "Leer m&aacute;s";
			o_header = "Ofertas";
			p_header = "Disponibilidad";
			so_btndisp = "Consultar disponibilidad";
			d_header = "A su alrededor";
			e_tabhead = "Eventos";
			a_tabhead = "Actividad";
			l_tabhead = "Para visitar";
			it_tabhead = "Itinerario";
			sa_btninfo = "Solicitud de Informaci&oacute;n";
			sl_btnmaps = "A&ntilde;adir a un itinerario";
			it_btnmaps = "Muestra itinerario";
			i_header = "Informaciones";
			i_info = "Informaciones";
			i_cred = "Creado por";
			i_imp = "Configuraci&oacute;n";
			i_richiedi = sa_btninfo;
			i_mappa = "D&oacute;nde estamos";
			break;
		case "FR":
			strDescrSM = "<p><em>Soluzioni Mobile</em>&reg; s'occupe du projet, du d&eacute;veloppement et du design de logiciels d'application pour le web et pour les dispositifs T&eacute;l&eacute;phone Intelligent, Tablette Apple, Android et Windows Phone.</p><p>Nous op&eacute;rons dans la branche du ICT afin de faire d&eacute;coller ou am&eacute;liorer vos affaires en termes tant qualitatifs que quantitatifs.</p>";
			strLoader = "Chargement...";
			
			strE = " et ";
			strAl = " au ";
			strTel = "T&eacute;l&eacute;phone";
			strMail = "E-mail";
			strUrl = "Site web";
			strOffGg = "Offre sp&eacute;ciale pour le jour ";
			strOffDal = "Offre sp&eacute;ciale du ";
			strEvGg = "&Eacute;v&eacute;nement pour le jour ";
			strEvDal = "&Eacute;v&eacute;nement du ";
			strOfferta = "Offre";
			strNome = "Pr&eacute;nom";
			strCognome = "Nom";
			strArrivo = "Date d'arriv&eacute;e";
			strPartenza = "Date de d&eacute;part";
			strAdulti = "Nombre d'adultes";
			strBamb = "Nombre d'enfants";
			strNote = "En savoir plus. Age des enfants";
			strNoteR = "En savoir plus";
			strMsg = "Message";
			strPrivacy = "Je reconnais avoir pris connaissance des condition du traitement des donn&eacute;s &agrave; caract&egrave;re personnel.";
			strLinkPriva = "Lire lois sur la confidentialit&eacute;";
			strBtnPren = "Envoyer Demande";
			strBtnInfo = "Envoyer Demande";
			strPiva = "T.V.A.";
			strFax = "Fax";
			strRagSoc = "Raison Sociale";
			strIndir = "Adresse";

			str_err_nome = "Ins&eacute;rer votre pr&eacute;nom.";
			str_err_cognome = "Ins&eacute;rer votre nom.";
			str_err_mail = "Ins&eacute;rer un adresse d'e-mail actif.";
			str_err_arrivo = "S&eacute;lectionner la date d'arriv&eacute;e.";
			str_err_partenza = "S&eacute;lectionner la date de d&eacute;part.";
			str_err_adulti = "Ins&eacute;rer le n. d'adultes.";
			str_err_note = "Indiquer l'&acirc;ge des enfants.";
			str_err_priva = "Si vous n'acceptez la politique de confidentialit&eacute;, il ne sera pas possible envoyer votre demande.";
			str_err_msg = "Ins&eacute;rer le message &agrave; envoyer.";

			btn_back = "En arri&egrave;re";
			btn_close = "Fermer";
			btn_tel = "Appelez-nous";
			btn_c_tit = "Contacts";
			btn_c_mappa = "Voir la carte";

			str_no_con = "Au moment pas de connexion.\n\nEssayer plus tard s'il vous pla&icirc;t.";
			str_msg_ok = "Votre demande a &eacute;t&eacute; envoy&eacute;e avec succ&egrave;s.";
			str_msg_poi_ok = "Le lieu &agrave; voir a &eacute;t&eacute; ajout&eacute; &agrave; l'itin&eacute;raire.";
			str_msg_poi_no = "Le lieu &agrave; voir se trouve d&eacute;j&agrave; dans l'itin&eacute;raire.";
			str_msg_err = "Il y a eu un probl&egrave;me au moment de l'envoi de la demande.<br><br>Essayer plus tard.";
			str_msg_no_menu = "Pas menu disponibles en ce moment.";
			str_msg_no_off = "Pas d'offres disponibles en ce moment.";
			str_msg_no_ev = "Pas d'&eacute;v&eacute;nement &agrave; signaler.";
			str_msg_no_att = "Pas d'activit&eacute; &agrave; signaler.";
			str_msg_no_luogo = "Il n'y &agrave; pas de lieux &agrave; voir."
			str_msg_no_poi = "Il n'y a pas de lieux ins&eacute;r&eacute;s dans l'itin&eacute;raire.";

			tba_home = "Home";
			tba_offerta = "Offres";
			tba_prenota = "R&eacute;server";
			tba_dintorni = "Alentours";
			tba_info = "Info";

			h_menu = "Menu";
			h_evid = "Offre en &eacute;vidence";
			h_offevid_a = "Lis tous";
			o_header = "Offres";
			p_header = "Disponibilit&eacute;";
			so_btndisp = "Demander la disponibilit&eacute;";
			d_header = "Alentours";
			e_tabhead = "&Eacute;v&eacute;nement";
			a_tabhead = "Activit&eacute;s";
			l_tabhead = "A voir";
			it_tabhead = "Itin&eacute;raire";
			sa_btninfo = "Demander des informations";
			sl_btnmaps = "Ajoute &agrave; ton itin&eacute;raire";
			it_btnmaps = "Voir l'itin&eacute;raire";
			i_header = "R&eacute;f&eacute;rences";
			i_info = "Info";
			i_cred = "Credits";
			i_imp = "Param&egrave;tres";
			i_richiedi = sa_btninfo;
			i_mappa = "Ou sommes-nous";
			break;
	}

	$(".h_evid").html(h_evid);
	$("#o_header").html(o_header);
	$("#so_header").html(o_header);
	$("#p_header").html(p_header);
	$(".d_header").html(d_header);
	$("#e_tabhead").html(e_tabhead);
	$("#a_tabhead").html(a_tabhead);
	$("#l_tabhead").html(l_tabhead);
	$("#p_lbl_offerta").html(strOfferta);
	$("#p_lbl_nome").html(strNome);
	$("#p_lbl_cognome").html(strCognome);
	$("#p_lbl_mail").html(strMail);
	$("#p_lbl_tel").html(strTel);
	$("#p_lbl_arrivo").html(strArrivo);
	$("#p_lbl_partenza").html(strPartenza);
	$("#p_lbl_adulti").html(strAdulti);
	$("#p_lbl_bamb").html(strBamb);
	$("#p_lbl_note").html(strNote);
	$(".i_header").html(i_header);
	$("#i_nome").attr("placeholder", $("<div/>").html(strNome + strE + strCognome).text());
	$("#i_tel").attr("placeholder", $("<div/>").html(strTel).text());
	$("#i_mail").attr("placeholder", strMail);
	$("#i_msg").attr("placeholder", strMsg);
	$("#i_richiedi").html(i_richiedi);
	$("#pm_close").find(".ui-btn-text").html(btn_close);
	$("#c_descr").html(strDescrSM);

	$l_priva = $(".l_priva");
	$l_priva.html(strLinkPriva);
	$l_priva.attr("onclick", "window.open('" + dmnSRV + "privacy.asp?id=" + idUtente + "&lng=" + lng + "','_blank','location=yes')");

	strLoader = "<span class='ui-icon ui-icon-loading'></span><h1>" + strLoader + "</h1>";
	
	initPopUp();

	blnAvvio = true;

	if (!blnLng) {
		initImpostazioni();
	} else {
		initHome();
	}
}

var lng;
var br = "<br />";
var tmr = 3600000;
var dmn = "http://eatsleep.soluzionimobile.it";
var dmnSRV = "http://eatsleep.soluzionimobile.it/services/";
var dmnPBL = "http://eatsleep.soluzionimobile.it/public/";

var cLng = "IT";
var idUtente = 4;
var cPartner = "";
var tipoUtente = 1;

// jquery.event.move
//
// 1.3.1
//
// Stephen Band
//
// Triggers 'movestart', 'move' and 'moveend' events after
// mousemoves following a mousedown cross a distance threshold,
// similar to the native 'dragstart', 'drag' and 'dragend' events.
// Move events are throttled to animation frames. Move event objects
// have the properties:
//
// pageX:
// pageY:   Page coordinates of pointer.
// startX:
// startY:  Page coordinates of pointer at movestart.
// distX:
// distY:  Distance the pointer has moved since movestart.
// deltaX:
// deltaY:  Distance the finger has moved since last event.
// velocityX:
// velocityY:  Average velocity over last few events.


(function (module) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], module);
	} else {
		// Browser globals
		module(jQuery);
	}
})(function(jQuery, undefined){

	var // Number of pixels a pressed pointer travels before movestart
	    // event is fired.
	    threshold = 6,
	
	    add = jQuery.event.add,
	
	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    // Shim for requestAnimationFrame, falling back to timer. See:
	    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	    requestFrame = (function(){
	    	return (
	    		window.requestAnimationFrame ||
	    		window.webkitRequestAnimationFrame ||
	    		window.mozRequestAnimationFrame ||
	    		window.oRequestAnimationFrame ||
	    		window.msRequestAnimationFrame ||
	    		function(fn, element){
	    			return window.setTimeout(function(){
	    				fn();
	    			}, 25);
	    		}
	    	);
	    })(),
	    
	    ignoreTags = {
	    	textarea: true,
	    	input: true,
	    	select: true,
	    	button: true
	    },
	    
	    mouseevents = {
	    	move: 'mousemove',
	    	cancel: 'mouseup dragstart',
	    	end: 'mouseup'
	    },
	    
	    touchevents = {
	    	move: 'touchmove',
	    	cancel: 'touchend',
	    	end: 'touchend'
	    };


	// Constructors
	
	function Timer(fn){
		var callback = fn,
				active = false,
				running = false;
		
		function trigger(time) {
			if (active){
				callback();
				requestFrame(trigger);
				running = true;
				active = false;
			}
			else {
				running = false;
			}
		}
		
		this.kick = function(fn) {
			active = true;
			if (!running) { trigger(); }
		};
		
		this.end = function(fn) {
			var cb = callback;
			
			if (!fn) { return; }
			
			// If the timer is not running, simply call the end callback.
			if (!running) {
				fn();
			}
			// If the timer is running, and has been kicked lately, then
			// queue up the current callback and the end callback, otherwise
			// just the end callback.
			else {
				callback = active ?
					function(){ cb(); fn(); } : 
					fn ;
				
				active = true;
			}
		};
	}


	// Functions
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	function preventDefault(e) {
		e.preventDefault();
	}
	
	function preventIgnoreTags(e) {
		// Don't prevent interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }
		
		e.preventDefault();
	}

	function isLeftButton(e) {
		// Ignore mousedowns on any button other than the left (or primary)
		// mouse button, or when a modifier key is pressed.
		return (e.which === 1 && !e.ctrlKey && !e.altKey);
	}

	function identifiedTouch(touchList, id) {
		var i, l;

		if (touchList.identifiedTouch) {
			return touchList.identifiedTouch(id);
		}
		
		// touchList.identifiedTouch() does not exist in
		// webkit yet… we must do the search ourselves...
		
		i = -1;
		l = touchList.length;
		
		while (++i < l) {
			if (touchList[i].identifier === id) {
				return touchList[i];
			}
		}
	}

	function changedTouch(e, event) {
		var touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		// Chrome Android (at least) includes touches that have not
		// changed in e.changedTouches. That's a bit annoying. Check
		// that this touch has changed.
		if (touch.pageX === event.pageX && touch.pageY === event.pageY) { return; }

		return touch;
	}


	// Handlers that decide when the first movestart is triggered
	
	function mousedown(e){
		var data;

		if (!isLeftButton(e)) { return; }

		data = {
			target: e.target,
			startX: e.pageX,
			startY: e.pageY,
			timeStamp: e.timeStamp
		};

		add(document, mouseevents.move, mousemove, data);
		add(document, mouseevents.cancel, mouseend, data);
	}

	function mousemove(e){
		var data = e.data;

		checkThreshold(e, data, e, removeMouse);
	}

	function mouseend(e) {
		removeMouse();
	}

	function removeMouse() {
		remove(document, mouseevents.move, mousemove);
		remove(document, mouseevents.cancel, mouseend);
	}

	function touchstart(e) {
		var touch, template;

		// Don't get in the way of interaction with form elements.
		if (ignoreTags[ e.target.tagName.toLowerCase() ]) { return; }

		touch = e.changedTouches[0];
		
		// iOS live updates the touch objects whereas Android gives us copies.
		// That means we can't trust the touchstart object to stay the same,
		// so we must copy the data. This object acts as a template for
		// movestart, move and moveend event objects.
		template = {
			target: touch.target,
			startX: touch.pageX,
			startY: touch.pageY,
			timeStamp: e.timeStamp,
			identifier: touch.identifier
		};

		// Use the touch identifier as a namespace, so that we can later
		// remove handlers pertaining only to this touch.
		add(document, touchevents.move + '.' + touch.identifier, touchmove, template);
		add(document, touchevents.cancel + '.' + touch.identifier, touchend, template);
	}

	function touchmove(e){
		var data = e.data,
		    touch = changedTouch(e, data);

		if (!touch) { return; }

		checkThreshold(e, data, touch, removeTouch);
	}

	function touchend(e) {
		var template = e.data,
		    touch = identifiedTouch(e.changedTouches, template.identifier);

		if (!touch) { return; }

		removeTouch(template.identifier);
	}

	function removeTouch(identifier) {
		remove(document, '.' + identifier, touchmove);
		remove(document, '.' + identifier, touchend);
	}


	// Logic for deciding when to trigger a movestart.

	function checkThreshold(e, template, touch, fn) {
		var distX = touch.pageX - template.startX,
		    distY = touch.pageY - template.startY;

		// Do nothing if the threshold has not been crossed.
		if ((distX * distX) + (distY * distY) < (threshold * threshold)) { return; }

		triggerStart(e, template, touch, distX, distY, fn);
	}

	function handled() {
		// this._handled should return false once, and after return true.
		this._handled = returnTrue;
		return false;
	}

	function flagAsHandled(e) {
		e._handled();
	}

	function triggerStart(e, template, touch, distX, distY, fn) {
		var node = template.target,
		    touches, time;

		touches = e.targetTouches;
		time = e.timeStamp - template.timeStamp;

		// Create a movestart object with some special properties that
		// are passed only to the movestart handlers.
		template.type = 'movestart';
		template.distX = distX;
		template.distY = distY;
		template.deltaX = distX;
		template.deltaY = distY;
		template.pageX = touch.pageX;
		template.pageY = touch.pageY;
		template.velocityX = distX / time;
		template.velocityY = distY / time;
		template.targetTouches = touches;
		template.finger = touches ?
			touches.length :
			1 ;

		// The _handled method is fired to tell the default movestart
		// handler that one of the move events is bound.
		template._handled = handled;
			
		// Pass the touchmove event so it can be prevented if or when
		// movestart is handled.
		template._preventTouchmoveDefault = function() {
			e.preventDefault();
		};

		// Trigger the movestart event.
		trigger(template.target, template);

		// Unbind handlers that tracked the touch or mouse up till now.
		fn(template.identifier);
	}


	// Handlers that control what happens following a movestart

	function activeMousemove(e) {
		var event = e.data.event,
		    timer = e.data.timer;

		updateEvent(event, e, e.timeStamp, timer);
	}

	function activeMouseend(e) {
		var event = e.data.event,
		    timer = e.data.timer;
		
		removeActiveMouse();

		endEvent(event, timer, function() {
			// Unbind the click suppressor, waiting until after mouseup
			// has been handled.
			setTimeout(function(){
				remove(event.target, 'click', returnFalse);
			}, 0);
		});
	}

	function removeActiveMouse(event) {
		remove(document, mouseevents.move, activeMousemove);
		remove(document, mouseevents.end, activeMouseend);
	}

	function activeTouchmove(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = changedTouch(e, event);

		if (!touch) { return; }

		// Stop the interface from gesturing
		e.preventDefault();

		event.targetTouches = e.targetTouches;
		updateEvent(event, touch, e.timeStamp, timer);
	}

	function activeTouchend(e) {
		var event = e.data.event,
		    timer = e.data.timer,
		    touch = identifiedTouch(e.changedTouches, event.identifier);

		// This isn't the touch you're looking for.
		if (!touch) { return; }

		removeActiveTouch(event);
		endEvent(event, timer);
	}

	function removeActiveTouch(event) {
		remove(document, '.' + event.identifier, activeTouchmove);
		remove(document, '.' + event.identifier, activeTouchend);
	}


	// Logic for triggering move and moveend events

	function updateEvent(event, touch, timeStamp, timer) {
		var time = timeStamp - event.timeStamp;

		event.type = 'move';
		event.distX =  touch.pageX - event.startX;
		event.distY =  touch.pageY - event.startY;
		event.deltaX = touch.pageX - event.pageX;
		event.deltaY = touch.pageY - event.pageY;
		
		// Average the velocity of the last few events using a decay
		// curve to even out spurious jumps in values.
		event.velocityX = 0.3 * event.velocityX + 0.7 * event.deltaX / time;
		event.velocityY = 0.3 * event.velocityY + 0.7 * event.deltaY / time;
		event.pageX =  touch.pageX;
		event.pageY =  touch.pageY;

		timer.kick();
	}

	function endEvent(event, timer, fn) {
		timer.end(function(){
			event.type = 'moveend';

			trigger(event.target, event);
			
			return fn && fn();
		});
	}


	// jQuery special event definition

	function setup(data, namespaces, eventHandle) {
		// Stop the node from being dragged
		//add(this, 'dragstart.move drag.move', preventDefault);
		
		// Prevent text selection and touch interface scrolling
		//add(this, 'mousedown.move', preventIgnoreTags);
		
		// Tell movestart default handler that we've handled this
		add(this, 'movestart.move', flagAsHandled);

		// Don't bind to the DOM. For speed.
		return true;
	}
	
	function teardown(namespaces) {
		remove(this, 'dragstart drag', preventDefault);
		remove(this, 'mousedown touchstart', preventIgnoreTags);
		remove(this, 'movestart', flagAsHandled);
		
		// Don't bind to the DOM. For speed.
		return true;
	}
	
	function addMethod(handleObj) {
		// We're not interested in preventing defaults for handlers that
		// come from internal move or moveend bindings
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		// Stop the node from being dragged
		add(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid, preventDefault, undefined, handleObj.selector);
		
		// Prevent text selection and touch interface scrolling
		add(this, 'mousedown.' + handleObj.guid, preventIgnoreTags, undefined, handleObj.selector);
	}
	
	function removeMethod(handleObj) {
		if (handleObj.namespace === "move" || handleObj.namespace === "moveend") {
			return;
		}
		
		remove(this, 'dragstart.' + handleObj.guid + ' drag.' + handleObj.guid);
		remove(this, 'mousedown.' + handleObj.guid);
	}
	
	jQuery.event.special.movestart = {
		setup: setup,
		teardown: teardown,
		add: addMethod,
		remove: removeMethod,

		_default: function(e) {
			var template, data;
			
			// If no move events were bound to any ancestors of this
			// target, high tail it out of here.
			if (!e._handled()) { return; }

			template = {
				target: e.target,
				startX: e.startX,
				startY: e.startY,
				pageX: e.pageX,
				pageY: e.pageY,
				distX: e.distX,
				distY: e.distY,
				deltaX: e.deltaX,
				deltaY: e.deltaY,
				velocityX: e.velocityX,
				velocityY: e.velocityY,
				timeStamp: e.timeStamp,
				identifier: e.identifier,
				targetTouches: e.targetTouches,
				finger: e.finger
			};

			data = {
				event: template,
				timer: new Timer(function(time){
					trigger(e.target, template);
				})
			};
			
			if (e.identifier === undefined) {
				// We're dealing with a mouse
				// Stop clicks from propagating during a move
				add(e.target, 'click', returnFalse);
				add(document, mouseevents.move, activeMousemove, data);
				add(document, mouseevents.end, activeMouseend, data);
			}
			else {
				// We're dealing with a touch. Stop touchmove doing
				// anything defaulty.
				e._preventTouchmoveDefault();
				add(document, touchevents.move + '.' + e.identifier, activeTouchmove, data);
				add(document, touchevents.end + '.' + e.identifier, activeTouchend, data);
			}
		}
	};

	jQuery.event.special.move = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.move', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.move', jQuery.noop);
		}
	};
	
	jQuery.event.special.moveend = {
		setup: function() {
			// Bind a noop to movestart. Why? It's the movestart
			// setup that decides whether other move events are fired.
			add(this, 'movestart.moveend', jQuery.noop);
		},
		
		teardown: function() {
			remove(this, 'movestart.moveend', jQuery.noop);
		}
	};

	add(document, 'mousedown.move', mousedown);
	add(document, 'touchstart.move', touchstart);

	// Make jQuery copy touch event properties over to the jQuery event
	// object, if they are not already listed. But only do the ones we
	// really need. IE7/8 do not have Array#indexOf(), but nor do they
	// have touch events, so let's assume we can ignore them.
	if (typeof Array.prototype.indexOf === 'function') {
		(function(jQuery, undefined){
			var props = ["changedTouches", "targetTouches"],
			    l = props.length;
			
			while (l--) {
				if (jQuery.event.props.indexOf(props[l]) === -1) {
					jQuery.event.props.push(props[l]);
				}
			}
		})(jQuery);
	};
});


// jQuery.event.swipe
// 0.5
// Stephen Band

// Dependencies
// jQuery.event.move 1.2

// One of swipeleft, swiperight, swipeup or swipedown is triggered on
// moveend, when the move has covered a threshold ratio of the dimension
// of the target node, or has gone really fast. Threshold and velocity
// sensitivity changed with:
//
// jQuery.event.special.swipe.settings.threshold
// jQuery.event.special.swipe.settings.sensitivity

(function (module) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], module);
	} else {
		// Browser globals
		module(jQuery);
	}
})(function(jQuery, undefined){
	var add = jQuery.event.add,
	   
	    remove = jQuery.event.remove,

	    // Just sugar, so we can have arguments in the same order as
	    // add and remove.
	    trigger = function(node, type, data) {
	    	jQuery.event.trigger(type, data, node);
	    },

	    settings = {
	    	// Ratio of distance over target finger must travel to be
	    	// considered a swipe.
	    	threshold: 0.1,
	    	// Faster fingers can travel shorter distances to be considered
	    	// swipes. 'sensitivity' controls how much. Bigger is shorter.
	    	sensitivity: 30
	    };

	function moveend(e) {
		var w, h, event;

		w = e.target.offsetWidth;
		h = e.target.offsetHeight;

		// Copy over some useful properties from the move event
		event = {
			distX: e.distX,
			distY: e.distY,
			velocityX: e.velocityX,
			velocityY: e.velocityY,
			finger: e.finger
		};

		// Find out which of the four directions was swiped
		if (e.distX > e.distY) {
			if (e.distX > -e.distY) {
				if (e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
					event.type = 'swiperight';
					trigger(e.currentTarget, event);
				}
			}
			else {
				if (-e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
					event.type = 'swipeup';
					trigger(e.currentTarget, event);
				}
			}
		}
		else {
			if (e.distX > -e.distY) {
				if (e.distY/h > settings.threshold || e.velocityY * e.distY/w * settings.sensitivity > 1) {
					event.type = 'swipedown';
					trigger(e.currentTarget, event);
				}
			}
			else {
				if (-e.distX/w > settings.threshold || e.velocityX * e.distX/w * settings.sensitivity > 1) {
					event.type = 'swipeleft';
					trigger(e.currentTarget, event);
				}
			}
		}
	}

	function getData(node) {
		var data = jQuery.data(node, 'event_swipe');
		
		if (!data) {
			data = { count: 0 };
			jQuery.data(node, 'event_swipe', data);
		}
		
		return data;
	}

	jQuery.event.special.swipe =
	jQuery.event.special.swipeleft =
	jQuery.event.special.swiperight =
	jQuery.event.special.swipeup =
	jQuery.event.special.swipedown = {
		setup: function( data, namespaces, eventHandle ) {
			var data = getData(this);

			// If another swipe event is already setup, don't setup again.
			if (data.count++ > 0) { return; }

			add(this, 'moveend', moveend);

			return true;
		},

		teardown: function() {
			var data = getData(this);

			// If another swipe event is still setup, don't teardown.
			if (--data.count > 0) { return; }

			remove(this, 'moveend', moveend);

			return true;
		},

		settings: settings
	};
});

function loadSlides() {
	var wrap = $(".h_slide"),
	slides = wrap.find(".slide"),
	active = slides.filter(".active"),
	i = slides.index(active),
	width = wrap.width();
			
	// Listen for swipe events on slides, and use a custom 'activate'
	// event to add and remove the class 'active' to the previous
	// or next slide, and to keep the index up-to-date. The class
	// 'active' uses CSS transitions to make the slide move.
	
	slides
	
	.on("swipeleft", function(e) {
		if (i === slides.length - 1) {
			var id_i = setInterval(function(){
				slides.eq(i - 1).trigger("activate");
				if (i === 0) {
					clearInterval(id_i);
				}
			}, 150);
		} else {
			slides.eq(i + 1).trigger("activate");
		}
	})
	
	.on("swiperight", function(e) {
		if (i === 0) {
			var id_i = setInterval(function(){
				slides.eq(i + 1).trigger("activate");
				if (i === slides.length - 1) {
					clearInterval(id_i);
				}
			}, 150);
		} else {
			slides.eq(i - 1).trigger("activate");
		}
	})
	
	.on("activate", function(e) {
		slides.eq(i).removeClass("active");
		$("#img_p_" + i).attr("src", "images/slide-btn.png")
		$(e.target).addClass("active");
		// Update the active slide index
		i = slides.index(e.target);
		$("#img_p_" + i).attr("src", "images/slide-btnactive.png")
	})
	
	
	// The code below handles what happens before any swipe event is triggered.
	// It makes the slides demo on this page work nicely, but really doesn't
	// have much to do with demonstrating the swipe events themselves. For more
	// on move events see:
	//
	// http://stephband.info/jquery.event.move
	
	.on("movestart", function(e) {
	// If the movestart heads off in a upwards or downwards
	// direction, prevent it so that the browser scrolls normally.
		if ((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) {
			e.preventDefault();
			return;
		}
		
		// To allow the slide to keep step with the finger,
		// temporarily disable transitions.
		wrap.addClass("notransition");
	})
	
	.on("move", function(e) {
		var left = 100 * e.distX / width;
		
		// Move slides with the finger
		if (e.distX < 0) {
			if (slides[i+1]) {
				slides[i].style.left = left + "%";
				slides[i+1].style.left = (left+100) + "%";
			} else {
				slides[i].style.left = left/4 + "%";
			}
		}
		if (e.distX > 0) {
			if (slides[i-1]) {
				slides[i].style.left = left + "%";
				slides[i-1].style.left = (left-100) + "%";
			} else {
				slides[i].style.left = left/5 + "%";
			}
		}
	})
	
	.on("moveend", function(e) {
		wrap.removeClass("notransition");
		
		slides[i].style.left = "";
		
		if (slides[i+1]) {
			slides[i+1].style.left = "";
		}
		if (slides[i-1]) {
			slides[i-1].style.left = "";
		}
	});

	$(".slide_p").click(function(e){
		$("#img_" + e.currentTarget.id.substring(6)).trigger("activate");
	});
}

var numTel;
var dbName;
var dbLat;
var dbLong;
var dbOrder;
var dbDel;
var blnHome = false;
var blnOfferta = false;
var blnEvento = false;
var blnAttivita = false;
var blnLuogo = false;
var blnImpostazioni = false;
var objInterval = 0;

// init app with localization
//$("#splash").live("pageinit", loadLocalization);
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    loadLocalization();
}

// set option for pop up message
function initPopUp() {
	$("#popupMsg").popup({
		theme: "a",
		overlayTheme: "a",
		positionTo: "window",
		transition: "fade"
	});
}

// set timer, for general reset, to 15 sec. for demo APP
if ((idUtente === 1) || (idUtente === 2)) {tmr = 15000;}

// reset general boolean variable for refresh page
setInterval(function(){blnHome = false; blnOfferta = false; blnEvento = false; blnAttivita = false; blnLuogo = false; blnImpostazioni = false;}, tmr);

// check connection available
function checkConnection() {
	if ((navigator.connection.type == "none") || (navigator.connection.type == "unknown")) {
	//if (lng == "TT") {
		if ((blnAvvio) && (objInterval === 0)) {
			objInterval = setInterval(function(){loadLocalization();}, 5000);
		}
		return false;
	} else {
		clearInterval(objInterval);
		return true;
	}
}

// open external link with child browser
/*function openChild(url) {
	window.plugins.childBrowser.showWebPage(url, {showNavigationBar: true});
}*/

// set text on generic html element
function setTextBtn() {
	$(".h_offevid_a").find(".ui-btn-text").html(h_offevid_a);
	$(".h_home").find(".ui-btn-text").html(tba_home);
	$(".h_menu").find(".ui-btn-text").html(h_menu);
	$(".h_back").find(".ui-btn-text").html(btn_back);
	$(".btn_back").find(".ui-btn-text").html(btn_back);
	$(".btn_tel").find(".ui-btn-text").html(btn_tel);
	$(".btn_c_tit").find(".ui-btn-text").html(btn_c_tit);
	$(".tba_home").find(".ui-btn-text").html(tba_home);
	$(".tba_offerta").find(".ui-btn-text").html(tba_offerta);
	$(".tba_prenota").find(".ui-btn-text").html(tba_prenota);
	$(".tba_dintorni").find(".ui-btn-text").html(tba_dintorni);
	$(".tba_info").find(".ui-btn-text").html(tba_info);
	$("#so_btndisp").find(".ui-btn-text").html(so_btndisp);
	$(".e_tabhead").find(".ui-btn-text").html(e_tabhead);
	$(".a_tabhead").find(".ui-btn-text").html(a_tabhead);
	$(".l_tabhead").find(".ui-btn-text").html(l_tabhead);
	$(".it_tabhead").find(".ui-btn-text").html(it_tabhead);
	$("#sa_btninfo").find(".ui-btn-text").html(sa_btninfo);
	$("#sl_btnmaps").find(".ui-btn-text").html(sl_btnmaps);
	$("#it_btnmaps").find(".ui-btn-text").html(it_btnmaps);
	$(".ck_priva").find(".ui-btn-text").html(strPrivacy);
	$("#p_send").find(".ui-btn-text").html(strBtnPren);
	$("#i_mappa").find(".ui-btn-text").html(i_mappa);
	$(".i_info").find(".ui-btn-text").html(i_info);
	$(".i_cred").find(".ui-btn-text").html(i_cred);
	$(".i_imp").find(".ui-btn-text").html(i_imp);
	$("#i_send").find(".ui-btn-text").html(strBtnInfo);
}

// set active button on nav bar
function setActiveBtn(id) {
	$("div[data-role='navbar']").find("a").removeClass("ui-btn-active");
	$(id).addClass("ui-btn-active");
}

// set language on selection
function setLng() {
	blnHome = false;
	blnOfferta = false;
	blnEvento = false;
	blnAttivita = false;
	blnLuogo = false;
	blnImpostazioni = false;
	
	var newLng = $("#im_btnlingua").val();
	if (newLng == "") {
		localStorage.removeItem("lng");
	} else {
		localStorage.setItem("lng", newLng);
		lng = newLng;
	}
	loadLocalization();
}

// add POI to maps
function addPOI(name, lat, long, order) {
	dbName = name.replace(/'/g, "''").replace(/"/g, "&quot;");
	dbLat = lat;
	dbLong = long;
	dbOrder = order;
	var db = window.openDatabase("itinerario", "1.0", "Itinerario DB", 1000000);
	db.transaction(createTBL, errorDB, tblCreated);
}

function createTBL(tx) {
	//tx.executeSql("DROP TABLE IF EXISTS POI");
	tx.executeSql("CREATE TABLE IF NOT EXISTS POI (name, lat, long, ord)");
}

function tblCreated() {
	var db = window.openDatabase("itinerario", "1.0", "Itinerario DB", 1000000);
	db.transaction(checkPOI, errorDB);
}

function checkPOI(tx) {
	tx.executeSql("SELECT name FROM POI WHERE name='" + dbName + "' AND ord=" + dbOrder, [], insertPOI, errorDB);
}

function insertPOI(tx, results) {
	if (results.rows.length == 0) {
		tx.executeSql("INSERT INTO POI (name, lat, long, ord) VALUES ('" + dbName + "', '" + dbLat + "', '" + dbLong + "', " + dbOrder + ")");
		if (dbOrder > 0 ) {
			$("#pm_msg").html(str_msg_poi_ok);
			$("#popupMsg").popup("open");
		}
	} else {
		if (dbOrder > 0 ) {
			$("#pm_msg").html(str_msg_poi_no);
			$("#popupMsg").popup("open");
		}
	}
}

// delete POI to maps
function delPOI(id) {
	dbDel = id;
	var db = window.openDatabase("itinerario", "1.0", "Itinerario DB", 1000000);
	db.transaction(deletePOI, errorDB);
}

function deletePOI(tx) {
	tx.executeSql("DELETE FROM POI WHERE rowid=" + dbDel, [], initItinerario, errorDB);
}

// funzione errori DB
function errorDB(err) {
	//alert("Error: " + err.code);
	//console.log("Error: " + err.code);
}

// home
function initHome() {
	if (!blnHome) {
		if (checkConnection()) {
			$.mobile.loading("show", {html: strLoader});
			$.getJSON(dmnSRV + "getUtente.asp?jsoncallback=?", {id: idUtente, lng: lng, uuid: device.uuid, model: device.name}, getUtente);
		} else {
            $("#pm_msg").html(str_no_con);
            $("#popupMsg").popup("open");
		}
	} else {
		$.mobile.changePage("#home", {transition: "slide"});
		setActiveBtn(".tba_a_home");
		$("#h_h_home").addClass("ui-btn-active");
	}
}

function getUtente(data) {
	$(".h_nomeaz").html(data.nome);
	$(".h_descr").html(data.descr);
	numTel = data.tel;
	var arrSlides = [];
	var arrSlidesP = [];
	if (data.slides !== undefined) {
		for (var i = 0; i < data.slides.length; i++) {
			var strActive = i == 0 ? "active" : "";
			arrSlides.push("<img id='img_" + i + "' src='" + dmnPBL + "tbl_utente/" + idUtente + "/grande/" + data.slides[i].slide + "' class='slide " + strActive + "' />");
			arrSlidesP.push("<a href='#'><img id='img_p_" + i + "' class='slide_p' src='images/slide-btn" + strActive + ".png' /></a>");
		}
	}
	if (arrSlides.length > 0) {
		$h_slide = $(".h_slide");
		$h_slide.html(arrSlides.join(""));
		$h_slide.css("display", "block");
		$h_slide_p = $(".h_slide_p");
		$h_slide_p.html(arrSlidesP.join(""));
		$h_slide_p.css("display", "block");
	} else {
		$(".h_slide").css("display", "none");
		$(".h_slide_p").css("display", "none");
	}
	if (data.id === undefined) {
		$(".h_offevid").css("display", "none");
	} else {
		$(".h_offevid").css("display", "block");
		$(".h_offevid_tit").html(data.titolo_off);
		$(".h_offevid_descr").html(data.descr_off);
		if (data.foto === undefined) {
			$(".h_offevid_img").css("display", "none");
		} else {
			$h_offevid_img = $(".h_offevid_img");
			$h_offevid_img.css("display", "block");
			$h_offevid_img.attr("src", dmnPBL + "tbl_offerta/" + idUtente + "/piccola/" + data.foto);
		}
		if (data.dataAl === undefined) {
			$(".h_offevid_data").html(strOffGg + data.dataDal);
		} else {
			$(".h_offevid_data").html(strOffDal + data.dataDal + strAl + data.dataAl);
		}
		$(".h_offevid_a").attr("onclick", "openSch_offerta(" + data.id + ")");
	}
	loadSlides();
	$.mobile.changePage("#home", {transition: "slide"});
	setTextBtn();
	setActiveBtn(".tba_a_home");
	if (tipoUtente == 1) {
		$("#h_menu").css("display", "none");
		$("#h_menu").css("height", "0");
	} else {
		$("#h_h_home").addClass("ui-btn-active");
		$("#h_menu").css("display", "block");
	}
	blnHome = true;
	addPOI(data.nome, data.latitudine, data.longitudine, 0);
	$.mobile.loading("hide");
}

// categorie menu
function initMenu() {
	if (checkConnection()) {
		$.mobile.loading("show", {html: strLoader});
		$.getJSON(dmnSRV + "getMenu.asp?jsoncallback=?", {id: idUtente, lng: lng}, getMenu);
	} else {
		$("#pm_msg").html(str_no_con);
		$("#popupMsg").popup("open");
	}
}

function getMenu(data) {
	var arrMenu = [];
	for (var i = 0; i < data.menu.length; i++) {
		arrMenu.push("<li><a onclick='getProdotto(" + data.menu[i].id + ")'><img src='" + dmn + "/app-images/menu/" + idUtente + "/" + data.menu[i].id + ".jpg' /><h3 style='margin-top:20px;'>" + data.menu[i].titolo + "</p></h3></li>");
	}
	var $m_list = $("#m_list");
	var $m_no_list = $("#m_no_list");
	if (arrMenu.length > 0) {
		$m_list.html(arrMenu.join(""));
		$m_list.css("display", "block");
		$m_no_list.css("display", "none");
	} else {
		$m_list.css("display", "none");
		$m_no_list.html(str_msg_no_menu);
		$m_no_list.css("display", "block");
	}
	$.mobile.changePage("#menu", {transition: "slide"});
	$m_list.listview("refresh");
	setTextBtn();
	setActiveBtn(".tba_a_home");
	$(".h_menu").addClass("ui-btn-active");
	$.mobile.loading("hide");
}

// lista prodotti
function getProdotto(id) {
	if (checkConnection()) {
		$.mobile.loading("show", {html: strLoader});
		$.getJSON(dmnSRV + "getListProdotto.asp?jsoncallback=?", {id: idUtente, idP: id, lng: lng}, getListProdotto);
	} else {
		$("#pm_msg").html(str_no_con);
		$("#popupMsg").popup("open");
	}
}

function getListProdotto(data) {
	var strImg = "";
	var arrProd = [];
	for (var i = 0; i < data.prodotto.length; i++) {
		strImg = "";
		if (data.prodotto[i].foto !== undefined) {
			strImg = "<img src='" + dmnPBL + "tbl_prodotto/" + idUtente + "/piccola/" + data.prodotto[i].foto + "' />";
		}
		arrProd.push("<li><a onclick='openSch_prodotto(" + data.prodotto[i].id + ")'>" + strImg + "<h3>" + data.prodotto[i].titolo + "</h3><p>" + data.prodotto[i].titoloc + " - &euro; " + data.prodotto[i].prezzo + "</p></a></li>");
	}
	$p_list = $("#p_list");
	$p_list.html(arrProd.join(""));
	$.mobile.changePage("#prodotto", {transition: "slide"});
	$p_list.listview("refresh");
	setTextBtn();
	setActiveBtn(".tba_a_home");
	$(".h_menu").addClass("ui-btn-active");
	$.mobile.loading("hide");
}

// scheda prodotto
function openSch_prodotto(id) {
	if (checkConnection()) {
		$.mobile.loading("show", {html: strLoader});
		$.getJSON(dmnSRV + "getSchedaProdotto.asp?jsoncallback=?", {id: id, lng: lng}, getSchedaProdotto);
	} else {
        $("#pm_msg").html(str_no_con);
        $("#popupMsg").popup("open");
	}
}

function getSchedaProdotto(data) {
	$("#sp_titolo").html(data.titolo);
	$("#sp_prezzo").html("&euro; " + data.prezzo);
	$("#sp_descr").html(data.descr);
	if (data.foto === undefined) {
		$("#sp_img").css("display", "none");
	} else {
		$sp_img = $("#sp_img");
		$sp_img.attr("src", dmnPBL + "tbl_prodotto/" + idUtente + "/grande/" + data.foto);
		$sp_img.css("display", "block");
	}
	$("#h_b_back").attr("onclick", "getProdotto(" + data.idc + ")");
	$.mobile.changePage("#scheda_prodotto", {transition: "slide"});
	setTextBtn();
	setActiveBtn(".tba_a_home");
	$(".h_menu").addClass("ui-btn-active");
	$.mobile.loading("hide");
}

// lista offerte
function initOfferta() {
	if (!blnOfferta) {
		if (checkConnection()) {
			$.mobile.loading("show", {html: strLoader});
			$.getJSON(dmnSRV + "getListOfferta.asp?jsoncallback=?", {id: idUtente, lng: lng}, getListOfferta);
		} else {
            $("#pm_msg").html(str_no_con);
            $("#popupMsg").popup("open");
		}
	} else {
		$.mobile.changePage("#offerta", {transition: "slide"});
		setActiveBtn(".tba_a_offerta");
	}
}

function getListOfferta(data) {
	var strDate;
	var strImg = "";
	var arrOffers = [];
	for (var i = 0; i < data.offers.length; i++) {
		if (data.offers[i].foto !== undefined) {
			strImg = "<img src='" + dmnPBL + "tbl_offerta/" + idUtente + "/piccola/" + data.offers[i].foto + "' />";
		}
		if (data.offers[i].dataAl === undefined) {
			strDate = strOffGg + br + data.offers[i].dataDal;
		} else {
			strDate = strOffDal + data.offers[i].dataDal + br + strAl + data.offers[i].dataAl;
		}
		arrOffers.push("<li><a onclick='openSch_offerta(" + data.offers[i].id + ")'>" + strImg + "<h3>" + data.offers[i].titolo + "</h3><p>" + strDate + "</p></a></li>");
	}
	var $o_list = $("#o_list");
	var $o_no_list = $("#o_no_list");
	if (arrOffers.length > 0) {
		$o_list.html(arrOffers.join(""));
		$o_list.css("display", "block");
		$o_no_list.css("display", "none");
	} else {
		$o_list.css("display", "none");
		$o_no_list.html(str_msg_no_off);
		$o_no_list.css("display", "block");
	}
	$.mobile.changePage("#offerta", {transition: "slide"});
	$o_list.listview("refresh");
	setTextBtn();
	setActiveBtn(".tba_a_offerta");
	blnOfferta = true;
	$.mobile.loading("hide");
}

// scheda offerta
function openSch_offerta(id) {
	if (checkConnection()) {
		$.mobile.loading("show", {html: strLoader});
		$.getJSON(dmnSRV + "getOfferta.asp?jsoncallback=?", {id: id, lng: lng}, getOfferta);
	} else {
        $("#pm_msg").html(str_no_con);
        $("#popupMsg").popup("open");
	}
}

function getOfferta(data) {
	$("#so_titolo").html(data.titolo);
	$("#so_descr").html(data.descr);
	if (data.foto === undefined) {
		$("#so_img").css("display", "none");
	} else {
		$so_img = $("#so_img");
		$so_img.attr("src", dmnPBL + "tbl_offerta/" + idUtente + "/grande/" + data.foto);
		$so_img.css("display", "block");
	}
	if (data.dataAl === undefined) {
		$("#so_data").html(strOffGg + data.dataDal);
	} else {
		$("#so_data").html(strOffDal + data.dataDal + strAl + data.dataAl);
	}
	$("#so_btndisp").attr("onclick", "initPrenota(\"" + data.titolo + "\")")
	$.mobile.changePage("#scheda_offerta", {transition: "slide"});
	setTextBtn();
	setActiveBtn(".tba_a_offerta");
	$.mobile.loading("hide");
}

// lista eventi
function initEvento() {
	if (!blnEvento) {
		if (checkConnection()) {
			$.mobile.loading("show", {html: strLoader});
			$.getJSON(dmnSRV + "getListEvento.asp?jsoncallback=?", {id: idUtente, lng: lng}, getListEvento);
		} else {
            $("#pm_msg").html(str_no_con);
            $("#popupMsg").popup("open");
		}
	} else {
		$.mobile.changePage("#evento", {transition: "slide"});
		setActiveBtn(".tba_a_dintorni");
		$("#e_evento").addClass("ui-btn-active");
	}
}

function getListEvento(data) {
	var strDate;
	var strImg = "";
	var arrEvents = [];	
	for (var i = 0; i < data.events.length; i++) {
		if (data.events[i].foto !== undefined) {
			strImg = "<img src='" + dmnPBL + "tbl_evento/" + idUtente + "/piccola/" + data.events[i].foto + "' />";
		}
		if (data.events[i].dataAl === undefined) {
			strDate = strEvGg + br + data.events[i].dataDal;
		} else {
			strDate = strEvDal + data.events[i].dataDal + br + strAl + data.events[i].dataAl;
		}
		arrEvents.push("<li><a onclick='openSch_evento(" + data.events[i].id + ")'>" + strImg + "<h3>" + data.events[i].titolo + "</h3><p>" + strDate + "</p></a></li>");
	}
	var $e_list = $("#e_list");
	var $e_no_list = $("#e_no_list");
	if (arrEvents.length > 0) {
		$e_list.html(arrEvents.join(""));
		$e_list.css("display", "block");
		$e_no_list.css("display", "none");
	} else {
		$e_list.css("display", "none");
		$e_no_list.html(str_msg_no_ev);
		$e_no_list.css("display", "block");
	}
	$.mobile.changePage("#evento", {transition: "slide"});
	$e_list.listview("refresh");
	setTextBtn();
	setActiveBtn(".tba_a_dintorni");
	$("#e_evento").addClass("ui-btn-active");
	blnEvento = true;
	$.mobile.loading("hide");
}

// scheda evento
function openSch_evento(id) {
	if (checkConnection()) {
		$.mobile.loading("show", {html: strLoader});
		$.getJSON(dmnSRV + "getEvento.asp?jsoncallback=?", {id: id, lng: lng}, getEvento);
	} else {
        $("#pm_msg").html(str_no_con);
        $("#popupMsg").popup("open");
    }
}

function getEvento(data) {
	$("#se_titolo").html(data.titolo);
	$("#se_descr").html(data.descr);
	if (data.foto === undefined) {
		$("#se_img").css("display", "none");
	} else {
		$se_img = $("#se_img");
		$se_img.attr("src", dmnPBL + "tbl_evento/" + idUtente + "/grande/" + data.foto);
		$se_img.css("display", "block");
	}
	if (data.dataAl === undefined) {
		$("#se_data").html(strEvGg + data.dataDal);
	} else {
		$("#se_data").html(strEvDal + data.dataDal + strAl + data.dataAl);
	}
	var arrContact = [];
	arrContact.push("<li><a onclick=\"window.open('http://maps.google.it/maps?q=" + data.latitudine + "," + data.longitudine + "','_blank','location=yes')\"><img src='images/icon/map.png' class='ui-li-icon' />" + btn_c_mappa + "</a></li>");
	if (data.tel !== undefined) {
		arrContact.push("<li><a href='tel:" + data.tel + "'><img src='images/icon/tel.png' class='ui-li-icon' />" + strTel + "</a></li>");
	}
	if (data.mail !== undefined) {
		arrContact.push("<li><a href='mailto:" + data.mail + "'><img src='images/icon/mail.png' class='ui-li-icon' />" + strMail + "</a></li>");
	}
	if (data.url !== undefined) {
		arrContact.push("<li><a onclick=\"window.open('" + data.url + "','_blank','location=yes')\"><img src='images/icon/url.png' class='ui-li-icon' />" + strUrl + "</a></li>");
	}
	var $se_c_list = $("#se_c_list");
	if (arrContact.length > 0) {
		$se_c_list.html(arrContact.join(""));
	}
	$.mobile.changePage("#scheda_evento", {transition: "slide"});
	$se_c_list.listview("refresh");
	$se_c_list.find(".ui-icon-arrow-r").remove();
	setTextBtn();
	setActiveBtn(".tba_a_dintorni");
	$.mobile.loading("hide");
}

// lista attivita
function initGPS_Attivita() {
	if (!blnAttivita) {
		if (checkConnection()) {
			$.mobile.loading("show", {html: strLoader});
			navigator.geolocation.getCurrentPosition(onSuccess_a, onError_a, {enableHighAccuracy: true});
		} else {
            $("#pm_msg").html(str_no_con);
            $("#popupMsg").popup("open");
        }
	} else {
		$.mobile.changePage("#attivita", {transition: "slide"});
		setActiveBtn(".tba_a_dintorni");
		$("#a_attivita").addClass("ui-btn-active");
	}
}

function onSuccess_a(p) {
	initAttivita(p.coords.latitude + "," + p.coords.longitude);
}

function onError_a(e) {
	initAttivita("0,0");
}

function initAttivita(ll) {
	$.getJSON(dmnSRV + "getListAttivita.asp?jsoncallback=?", {id: idUtente, lng: lng, ll: ll}, getListAttivita);
}

function getListAttivita(data) {
	var strImg = "";
	var arrActivity = [];
	var strDist;
	for (var i = 0; i < data.activity.length; i++) {
		strDist = (data.activity[i].dist === undefined) ? "" : data.activity[i].dist;
		if (data.activity[i].foto !== undefined) {
			strImg = "<img src='" + dmnPBL + "tbl_attivita/" + idUtente + "/piccola/" + data.activity[i].foto + "' />";
		}
		arrActivity.push("<li><a onclick='openSch_attivita(" + data.activity[i].id + ")'>" + strImg + "<h3>" + data.activity[i].titolo + "</h3><p>" + strDist + "</p></a></li>");
	}
	var $a_list = $("#a_list");
	var $a_no_list = $("#a_no_list");
	if (arrActivity.length > 0) {
		$a_list.html(arrActivity.join(""));
		$a_list.css("display", "block");
		$a_no_list.css("display", "none");
	} else {
		$a_list.css("display", "none");
		$a_no_list.html(str_msg_no_att);
		$a_no_list.css("display", "block");
	}
	$.mobile.changePage("#attivita", {transition: "slide"});
	$a_list.listview("refresh");
	setTextBtn();
	setActiveBtn(".tba_a_dintorni");
	$("#a_attivita").addClass("ui-btn-active");
	blnAttivita = true;
	$.mobile.loading("hide");
}

// scheda attivita
function openSch_attivita(id) {
	if (checkConnection()) {
		$.mobile.loading("show", {html: strLoader});
		$.getJSON(dmnSRV + "getAttivita.asp?jsoncallback=?", {id: id, lng: lng}, getAttivita);
	} else {
        $("#pm_msg").html(str_no_con);
        $("#popupMsg").popup("open");
	}
}

function getAttivita(data) {
	$("#sa_titolo").html(data.titolo);
	$("#sa_descr").html(data.descr);
	if (data.foto === undefined) {
		$("#sa_img").css("display", "none");
	} else {
		$sa_img = $("#sa_img");
		$sa_img.attr("src", dmnPBL + "tbl_attivita/" + idUtente + "/grande/" + data.foto);
		$sa_img.css("display", "block");
	}
	var arrContact = [];
	arrContact.push("<li><a onclick=\"window.open('http://maps.google.it/maps?q=" + data.latitudine + "," + data.longitudine + "','_blank','location=yes')\"><img src='images/icon/map.png' class='ui-li-icon' />" + btn_c_mappa + "</a></li>");
	if (data.tel !== undefined) {
		arrContact.push("<li><a href='tel:" + data.tel + "'><img src='images/icon/tel.png' class='ui-li-icon' />" + strTel + "</a></li>");
	}
	if (data.mail !== undefined) {
		arrContact.push("<li><a href='mailto:" + data.mail + "'><img src='images/icon/mail.png' class='ui-li-icon' />" + strMail + "</a></li>");
	}
	if (data.url !== undefined) {
		arrContact.push("<li><a onclick=\"window.open('" + data.url + "','_blank','location=yes')\"><img src='images/icon/url.png' class='ui-li-icon' />" + strUrl + "</a></li>");
	}
	if (data.btn == 0) {
		$("#sa_btninfo").css("display", "none");
	} else {
		$("#sa_btninfo").css("display", "block");
	}
	var $sa_c_list = $("#sa_c_list");
	if (arrContact.length > 0) {
		$sa_c_list.html(arrContact.join(""));
	}
	$.mobile.changePage("#scheda_attivita", {transition: "slide"});
	$sa_c_list.listview("refresh");
	$sa_c_list.find(".ui-icon-arrow-r").remove();
	$("#sa_btninfo").attr("onclick", "initInfo(\"" + data.titolo + "\")");
	setTextBtn();
	setActiveBtn(".tba_a_dintorni");
	$.mobile.loading("hide");
}

// lista luoghi
function initGPS_Luogo() {
	if (!blnLuogo) {
		if (checkConnection()) {
			$.mobile.loading("show", {html: strLoader});
			navigator.geolocation.getCurrentPosition(onSuccess_l, onError_l, {enableHighAccuracy: true});
		} else {
            $("#pm_msg").html(str_no_con);
            $("#popupMsg").popup("open");
        }
	} else {
		$.mobile.changePage("#luogo", {transition: "slide"});
		setActiveBtn(".tba_a_dintorni");
		$("#l_luogo").addClass("ui-btn-active");
	}
}

function onSuccess_l(p) {
	initLuogo(p.coords.latitude + "," + p.coords.longitude);
}

function onError_l(e) {
	initLuogo("0,0");
}

function initLuogo(ll) {
	$.getJSON(dmnSRV + "getListLuogo.asp?jsoncallback=?", {id: idUtente, lng: lng, ll: ll}, getListLuogo);
}

function getListLuogo(data) {
	var strImg = "";
	var arrLuogo = [];
	var strDist;
	for (var i = 0; i < data.luogo.length; i++) {
		strDist = (data.luogo[i].dist === undefined) ? "" : data.luogo[i].dist;
		if (data.luogo[i].foto !== undefined) {
			strImg = "<img src='" + dmnPBL + "tbl_luogo/" + idUtente + "/piccola/" + data.luogo[i].foto + "' />";
		}
		arrLuogo.push("<li><a onclick='openSch_luogo(" + data.luogo[i].id + ")'>" + strImg + "<h3>" + data.luogo[i].titolo + "</h3><p>" + strDist + "</p></a><a onclick=\"addPOI('" + data.luogo[i].titolo + "', '" + data.luogo[i].latitudine + "', '" + data.luogo[i].longitudine + "', 1)\"></a></li>");
	}
	var $l_list = $("#l_list");
	var $l_no_list = $("#l_no_list");
	if (arrLuogo.length > 0) {
		$l_list.html(arrLuogo.join(""));
		$l_list.css("display", "block");
		$l_no_list.css("display", "none");
	} else {
		$l_list.css("display", "none");
		$l_no_list.html(str_msg_no_luogo);
		$l_no_list.css("display", "block");
	}
	$.mobile.changePage("#luogo", {transition: "slide"});
	$l_list.listview("refresh");
	setTextBtn();
	setActiveBtn(".tba_a_dintorni");
	$("#l_luogo").addClass("ui-btn-active");
	blnLuogo = true;
	$.mobile.loading("hide");
}

// scheda luogo
function openSch_luogo(id) {
	if (checkConnection()) {
		$.mobile.loading("show", {html: strLoader});
		$.getJSON(dmnSRV + "getLuogo.asp?jsoncallback=?", {id: id, lng: lng}, getLuogo);
	} else {
        $("#pm_msg").html(str_no_con);
        $("#popupMsg").popup("open");
	}
}

function getLuogo(data) {
	$("#sl_titolo").html(data.titolo);
	$("#sl_descr").html(data.descr);
	if (data.foto === undefined) {
		$("#sl_img").css("display", "none");
	} else {
		$sl_img = $("#sl_img");
		$sl_img.attr("src", dmnPBL + "tbl_luogo/" + idUtente + "/grande/" + data.foto);
		$sl_img.css("display", "block");
	}
	var arrContact = [];
	arrContact.push("<li><a onclick=\"window.open('http://maps.google.it/maps?q=" + data.latitudine + "," + data.longitudine + "','_blank','location=yes')\"><img src='images/icon/map.png' class='ui-li-icon' />" + btn_c_mappa + "</a></li>");
	if (data.tel !== undefined) {
		arrContact.push("<li><a href='tel:" + data.tel + "'><img src='images/icon/tel.png' class='ui-li-icon' />" + strTel + "</a></li>");
	}
	if (data.mail !== undefined) {
		arrContact.push("<li><a href='mailto:" + data.mail + "'><img src='images/icon/mail.png' class='ui-li-icon' />" + strMail + "</a></li>");
	}
	if (data.url !== undefined) {
		arrContact.push("<li><a onclick=\"window.open('" + data.url + "','_blank','location=yes')\"><img src='images/icon/url.png' class='ui-li-icon' />" + strUrl + "</a></li>");
	}
	var $sl_c_list = $("#sl_c_list");
	if (arrContact.length > 0) {
		$sl_c_list.html(arrContact.join(""));
	}
	$.mobile.changePage("#scheda_luogo", {transition: "slide"});
	$sl_c_list.listview("refresh");
	$sl_c_list.find(".ui-icon-arrow-r").remove();
	$("#sl_btnmaps").attr("onclick", "addPOI('" + data.titolo + "', '" + data.latitudine + "', '" + data.longitudine + "', 1)");
	setTextBtn();
	setActiveBtn(".tba_a_dintorni");
	$.mobile.loading("hide");
}

// lista itinerari
function initItinerario() {
	$.mobile.loading("show", {html: strLoader});
	var db = window.openDatabase("itinerario", "1.0", "Itinerario DB", 1000000);
	db.transaction(selPOI, errorDB);
}

function selPOI(tx) {
	tx.executeSql("SELECT rowid, * FROM POI ORDER BY ord", [], readPOI, errorDB);
}

function readPOI(tx, results) {
	var $it_list = $("#it_list");
	var $it_no_list = $("#it_no_list");
	var $it_btnmaps = $("#it_btnmaps");
	var arrPOI = [];
	var sDel = "";
	var saddr;
	var daddr = "";
	var len = results.rows.length;
	if (len > 1) {
        for (var i = 0; i < len; i++){
			if (i == 0) {
				saddr = results.rows.item(i).lat + "," + results.rows.item(i).long;
			}
			if (i > 0) {
				daddr += (i == 1) ? results.rows.item(i).lat + "," + results.rows.item(i).long : "+to:" + results.rows.item(i).lat + "," + results.rows.item(i).long;
				sDel = "<a onclick='delPOI(" + results.rows.item(i).rowid + ")'></a>";
			}
			arrPOI.push("<li><a><h4>" + results.rows.item(i).name + "</h4><p>Lat.: " + results.rows.item(i).lat + br + "Long.: " + results.rows.item(i).long + "</p></a>" + sDel + "</li>");
        }
		$it_list.html(arrPOI.join(""));
		$it_list.css("display", "block");
		$it_no_list.css("display", "none");
		$it_btnmaps.attr("onclick", "window.open('http://www.google.com/maps?saddr=" + saddr + "&daddr=" + daddr + "+to:" + saddr + "&hl=it&z=10&t=m','_blank','location=yes')");
		$it_btnmaps.css("display", "block");
	} else {
		$it_list.css("display", "none");
		$it_no_list.html(str_msg_no_poi);
		$it_no_list.css("display", "block");
		$it_btnmaps.css("display", "none");
	}
	$.mobile.changePage("#itinerario", {transition: "slide"});
	$it_list.listview("refresh");
	$it_list.find(".ui-icon-arrow-r").remove();
	setTextBtn();
	setActiveBtn(".tba_a_dintorni");
	$("#it_itinerario").addClass("ui-btn-active");
	$.mobile.loading("hide");
}

// prenota
function initPrenota(optOffer) {
	$p_offerta = $("#p_offerta");
	if (optOffer === undefined) {
		$("#p_lbl_offerta").css("display", "none");
		$p_offerta.css("display", "none");
	} else {
		$p_offerta.val($("<div/>").html(optOffer).text());
		$p_offerta.css("display", "block");
		$("#p_lbl_offerta").css("display", "block");
	}
	$(".btn_tel").attr("href", "tel:" + numTel);
	if (tipoUtente == 1) {
		$(".btn_tel").css("display", "none");
		$("#p_lbl_partenza").css("display", "block");
		$("#p_partenza").css("display", "block");
		$("#p_lbl_note").html(strNote);
	} else {
		$(".btn_tel").css("display", "block");
		$("#p_lbl_partenza").css("display", "none");
		$("#p_partenza").css("display", "none");
		$("#p_lbl_note").html(strNoteR);
	}
	$.mobile.changePage("#prenota", {transition: "slide"});
	setTextBtn();
	setActiveBtn(".tba_a_prenota");
}

// info
function initInfo(optActivity) {
	$i_attivita = $("#i_attivita");
	if (optActivity === undefined) {
		$("#i_lbl_attivita").css("display", "none");
		$i_attivita.css("display", "none");
	} else {
		$i_attivita.val($("<div/>").html(optActivity).text());
		$i_attivita.css("display", "block");
		$("#i_lbl_attivita").css("display", "block");
	}
	if (checkConnection()) {
		$.mobile.loading("show", {html: strLoader});
		$.getJSON(dmnSRV + "getInfo.asp?jsoncallback=?", {id: idUtente}, getInfo);
	} else {
        $("#pm_msg").html(str_no_con);
        $("#popupMsg").popup("open");
	}
}

function getInfo(data) {
	$("#i_nomeaz").html(data.nome);
	var b = "<strong>";
	var eb = "</strong>: ";
	var a = "<a class='ui-link' href='";
	var aa = "'>";
	var ea = "</a>";
	var strIFax = "";
	var strIUrl = "";
	numTel = data.tel;
	if (data.fax !== undefined) {
		strIFax = b + strFax + eb + data.fax + br;
	}
	if (data.url !== undefined) {
		strIUrl = br + b + strUrl + eb + a + "#' onclick='window.open(\"" + data.url + "\",\"_blank\",\"location=yes\")" + aa + data.url + ea;
	}
	$("#i_datiaz").html(b + strPiva + eb + data.piva + br + b + strRagSoc + eb + data.ragsoc + br + b + strIndir + eb + data.indirizzo + br + b + strTel + eb + a + "tel:" + data.tel + aa + data.tel + ea + br + strIFax + b + strMail + eb + a + "mailto:" + data.mail + aa + data.mail + ea + strIUrl);
	$.mobile.changePage("#info", {transition: "slide"});
	$("#i_mappa").attr("onclick", "window.open('http://maps.google.it/maps?q=" + data.latitudine + "," + data.longitudine + "','_blank','location=yes')");
	setTextBtn();
	setActiveBtn(".tba_a_info");
	$("#i_i_info").addClass("ui-btn-active");
	$.mobile.loading("hide");
}

// credits
function initCredits() {
	$.mobile.changePage("#credits", {transition: "slide"});
	setTextBtn();
	setActiveBtn(".tba_a_info");
	$("#i_c_cred").addClass("ui-btn-active");
	if (cPartner !== "") {
		$("#c_p_" + cPartner).css("display", "block");
	}
}

// impostazioni
function initImpostazioni() {
	if (!blnImpostazioni) {
		if (checkConnection()) {
			$.mobile.loading("show", {html: strLoader});
			$.getJSON(dmnSRV + "getLingua.asp?jsoncallback=?", {id: idUtente}, getLingua);
		} else {
            $("#pm_msg").html(str_no_con);
            $("#popupMsg").popup("open");
		}
	} else {
		$.mobile.changePage("#impostazioni", {transition: "slide"});
		setTextBtn();
		setActiveBtn(".tba_a_info");
		$("#i_im_imp").addClass("ui-btn-active");
	}
}

function getLingua(data) {
	for (var i = 0; i < data.lingue.length; i++) {
		$("option[value='" + data.lingue[i].lingua + "']").remove();
	}
	var l = localStorage.getItem("lng");
	var $im_btnlingua = $("#im_btnlingua");
	if (l === null) {
		$im_btnlingua.val("");
	} else {
		$im_btnlingua.val(l);
	}
	$("#im_lingua").find(".ui-btn-text").children().html($("option[value='" + $im_btnlingua.val() + "']").html());
	$.mobile.changePage("#impostazioni", {transition: "slide"});
	setTextBtn();
	setActiveBtn(".tba_a_info");
	$("#i_im_imp").addClass("ui-btn-active");
	blnImpostazioni = true;
	$.mobile.loading("hide");
}

// invio richiesta prenotazione
function sendPrenota() {
	var $pm_msg = $("#pm_msg");
	var $popupMsg = $("#popupMsg");
	var regExpEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;
	if (checkConnection()) {
		if ($.trim($("#p_nome").val()) == "") {
			$pm_msg.html(str_err_nome);
			$popupMsg.popup("open");
			return false;
		}
		if ($.trim($("#p_cognome").val()) == "") {
			$pm_msg.html(str_err_cognome);
			$popupMsg.popup("open");
			return false;
		}
		if (!regExpEmail.test($.trim($("#p_mail").val()))) {
			$pm_msg.html(str_err_mail);
			$popupMsg.popup("open");
			return false;
		}
		if ($.trim($("#p_arrivo").val()) == "") {
			$pm_msg.html(str_err_arrivo);
			$popupMsg.popup("open");
			return false;
		}
		if (tipoUtente == 1) {
			if ($.trim($("#p_partenza").val()) == "") {
				$pm_msg.html(str_err_partenza);
				$popupMsg.popup("open");
				return false;
			}
		}
		if ($.trim($("#p_adulti").val()) == "") {
			$pm_msg.html(str_err_adulti);
			$popupMsg.popup("open");
			return false;
		}
		if (($.trim($("#p_bamb").val()) != "") && (tipoUtente == 1)) {
			if ($.trim($("#p_note").val()) == "") {
				$pm_msg.html(str_err_note);
				$popupMsg.popup("open");
				return false;
			}
		}
		if ($.trim($("#p_ck_priva:checked").val()) == "") {
			$pm_msg.html(str_err_priva);
			$popupMsg.popup("open");
			return false;
		}
		$.mobile.loading("show", {html: strLoader});
		var $ajax = $.getJSON(dmnSRV + "sendPren.asp?jsoncallback=?",
			{
				id: idUtente,
				lng: lng,
				offerta: $.trim($("#p_offerta").val()),
				nome: $.trim($("#p_nome").val()),
				cognome: $.trim($("#p_cognome").val()),
				mail: $.trim($("#p_mail").val()),
				tel: $.trim($("#p_tel").val()),
				arrivo: $.trim($("#p_arrivo").val()),
				partenza: $.trim($("#p_partenza").val()),
				adulti: $.trim($("#p_adulti").val()),
				bambini: $.trim($("#p_bamb").val()),
				note: $.trim($("#p_note").val()),
				uuid: device.uuid
			}, msgPrenota
		);
	} else {
        $("#pm_msg").html(str_no_con);
        $("#popupMsg").popup("open");
	}
}

function msgPrenota(state) {
	$.mobile.loading("hide");
	if (state.msg == "ok") {
		$("#pm_msg").html(str_msg_ok);
		$("#popupMsg").popup("open");
	} else {
		$("#pm_msg").html(str_msg_err);
		$("#popupMsg").popup("open");
	}
}

// invio richiesta informazioni
function sendInfo() {
	var $pm_msg = $("#pm_msg");
	var $popupMsg = $("#popupMsg");
	var regExpEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;

	if (checkConnection()) {
		if ($.trim($("#i_nome").val()) == "") {
			$pm_msg.html(str_err_nome);
			$popupMsg.popup("open");
			return false;
		}
		if (!regExpEmail.test($.trim($("#i_mail").val()))) {
			$pm_msg.html(str_err_mail);
			$popupMsg.popup("open");
			return false;
		}
		if ($.trim($("#i_msg").val()) == "") {
			$pm_msg.html(str_err_msg);
			$popupMsg.popup("open");
			return false;
		}
		if ($.trim($("#i_ck_priva:checked").val()) == "") {
			$pm_msg.html(str_err_priva);
			$popupMsg.popup("open");
			return false;
		}
		$.mobile.loading("show", {html: strLoader});
		var $ajax = $.getJSON(dmnSRV + "sendInfo.asp?jsoncallback=?",
			{
				id: idUtente,
				lng: lng,
				attivita: $.trim($("#i_attivita").val()),
				nome: $.trim($("#i_nome").val()),
				mail: $.trim($("#i_mail").val()),
				tel: $.trim($("#i_tel").val()),
				note: $.trim($("#i_msg").val()),
				uuid: device.uuid
			}, msgInfo
		);
	} else {
        $("#pm_msg").html(str_no_con);
        $("#popupMsg").popup("open");
	}
}

function msgInfo(state) {
	$.mobile.loading("hide");
	if (state.msg == "ok") {
		$("#pm_msg").html(str_msg_ok);
		$("#popupMsg").popup("open");
	} else {
		$("#pm_msg").html(str_msg_err);
		$("#popupMsg").popup("open");
	}
}
