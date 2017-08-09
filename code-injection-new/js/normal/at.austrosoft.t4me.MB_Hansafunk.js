
var __ZENTRALE__ = {
   kuerzel : '1000',
   farbe   : 'blue',
   pos : {
      y: 53.5501,
      x:  9.9926
   },
   defaultsprachcode: 'de',
   isEU: false
};  
  








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
        

/*

*/
//      
t4me.LangArray['BT_ABBRECHEN'] = {   
   'de': 'Abbrechen',   
   'en': 'Back',   
   'da': 'Afbryd',   
   'fr': 'Annuler',   
   'nl': 'Ga terug',   
   'cs': 'Ukončit',   
   'tr': 'İptal et'
};      
t4me.LangArray['BT_ABBRUCH'] = {   
   'de': 'Abbruch',   
   'en': 'Cancel',   
   'da': 'Annuller',   
   'fr': 'Annuler',   
   'nl': 'Annuleren',   
   'cs': 'Přerušení',   
   'tr': 'İptal'
};      
t4me.LangArray['BT_AENDERN'] = {   
   'de': 'ändern',   
   'en': 'change',   
   'da': 'ændre',   
   'fr': 'éditer',   
   'nl': 'Wijzigen',   
   'cs': 'změnit',   
   'tr': 'değiştir'
};      
t4me.LangArray['BT_AFLISTE'] = {   
   'de': 'Liste',   
   'en': 'List',   
   'da': 'Liste',   
   'fr': 'Liste',   
   'nl': 'Lijst',   
   'cs': 'Seznam',   
   'tr': 'Liste'
};      
t4me.LangArray['BT_AKTUALISIEREN'] = {   
   'de': 'Aktualisieren',   
   'en': 'Refresh',   
   'da': 'Opdater',   
   'fr': 'Mise à jour',   
   'nl': 'Vernieuwen',   
   'cs': 'Aktualizovat',   
   'tr': 'Güncelle'
};      
t4me.LangArray['BT_AKTUELL'] = {   
   'de': 'Aktuell',   
   'en': 'Current',   
   'da': 'Aktuel',   
   'fr': 'Actuel',   
   'nl': 'Actueel',   
   'cs': 'Aktuální',   
   'tr': 'Güncel'
};      
t4me.LangArray['BT_ANFORDERN'] = {   
   'de': 'Anfordern',   
   'en': 'Request',   
   'da': 'bestille',   
   'fr': 'Demande',   
   'nl': 'Aanvragen',   
   'cs': 'Vyžádat',   
   'tr': 'Talep et'
};      
t4me.LangArray['BT_ANMELDEN'] = {   
   'de': 'Anmelden',   
   'en': 'Log in',   
   'da': 'Tilmeld',   
   'fr': 'Enregistrer',   
   'nl': 'Aanmelden',   
   'cs': 'Přihlásit',   
   'tr': 'Giriş yap'
};      
t4me.LangArray['BT_ANRUFEN'] = {   
   'de': 'Anrufen',   
   'en': 'Call',   
   'da': 'Ring til',   
   'fr': 'Appeler',   
   'nl': 'Bellen',   
   'cs': 'Zavolat',   
   'tr': 'Ara'
};      
t4me.LangArray['BT_AST'] = {   
   'de': 'AST',   
   'en': 'CCT',   
   'da': 'AST',   
   'fr': 'Transport collectif à la demande',   
   'nl': 'AST',   
   'cs': 'VKT',   
   'tr': 'BT_AST/tr'
};      
t4me.LangArray['BT_AUSWAEHLEN'] = {   
   'de': 'Auswählen',   
   'en': 'Choose ',   
   'da': 'Vælg',   
   'fr': 'Sélection',   
   'nl': 'Kiezen',   
   'cs': 'Zvolit',   
   'tr': 'Seç'
};      
t4me.LangArray['BT_BEARBEITEN'] = {   
   'de': 'Bearbeiten',   
   'en': 'Edit',   
   'da': 'Rediger',   
   'fr': 'Modifier',   
   'nl': 'Wijzigen',   
   'cs': 'Zpracovat',   
   'tr': 'İşle'
};      
t4me.LangArray['BT_BESTELLEN'] = {   
   'de': 'Bestellen',   
   'en': 'Book',   
   'da': 'Bestil',   
   'fr': 'Commander',   
   'nl': 'Bestellen',   
   'cs': 'Objednat',   
   'tr': 'Sipariş et'
};      
t4me.LangArray['BT_BESTAETIGEN'] = {   
   'de': 'Bestätigen',   
   'en': 'Confirm',   
   'da': 'Bekræft',   
   'fr': 'Confirmation',   
   'nl': 'Bevestigen',   
   'cs': 'Potvrdit',   
   'tr': 'Onayla'
};      
t4me.LangArray['BT_BEWERTEN'] = {   
   'de': 'Bewerten',   
   'en': 'Rate',   
   'da': 'Bedøm',   
   'fr': 'Noter',   
   'nl': 'Evalueren',   
   'cs': 'Vyhodnotit',   
   'tr': 'Değerlendir'
};      
t4me.LangArray['BT_ERSTELLEN'] = {   
   'de': 'Erstellen',   
   'en': 'Create',   
   'da': 'Opret',   
   'fr': 'Créer  ',   
   'nl': 'Opmaken',   
   'cs': 'Vytvořit',   
   'tr': 'Oluştur'
};      
t4me.LangArray['BT_FAHRPREIS'] = {   
   'de': 'Preis',   
   'en': 'Price',   
   'da': 'Pris',   
   'fr': 'Prix',   
   'nl': 'Prijs',   
   'cs': 'Cena jízdy',   
   'tr': 'Fiyat'
};      
t4me.LangArray['BT_FAHRTEN'] = {   
   'de': 'Fahrten',   
   'en': 'Trips',   
   'da': 'Kørsler',   
   'fr': 'Trajets',   
   'nl': 'Ritten',   
   'cs': 'Jízdy',   
   'tr': 'Yolculuklar'
};      
t4me.LangArray['BT_FERTIG'] = {   
   'de': 'Fertig',   
   'en': 'Finished',   
   'da': 'Færdig',   
   'fr': 'Terminer',   
   'nl': 'Klaar',   
   'cs': 'Hotovo',   
   'tr': 'Hazır'
};      
t4me.LangArray['BT_HOTLINEANRUFEN'] = {   
   'de': 'Hotline anrufen',   
   'en': 'Please call the hotline',   
   'da': 'Ring til hotline',   
   'fr': 'Veuillez appeler la hotline',   
   'nl': 'Aub bel de helpline',   
   'cs': 'Zavolat hotline',   
   'tr': 'Danışma hattını arayın'
};      
t4me.LangArray['BT_JA'] = {   
   'de': 'Ja',   
   'en': 'Yes',   
   'da': 'Ja',   
   'fr': 'Oui',   
   'nl': 'Ja',   
   'cs': 'Ano',   
   'tr': 'Evet'
};      
t4me.LangArray['BT_LOESCHEN'] = {   
   'de': 'Löschen',   
   'en': 'Delete',   
   'da': 'Slet',   
   'fr': 'Effacer',   
   'nl': 'Verwijderen',   
   'cs': 'Smazat',   
   'tr': 'Sil'
};      
t4me.LangArray['BT_MEHR'] = {   
   'de': 'Mehr',   
   'en': 'More',   
   'da': 'Flere',   
   'fr': 'Plus',   
   'nl': 'Meer',   
   'cs': 'Více',   
   'tr': 'Daha fazla'
};      
t4me.LangArray['BT_NACHRICHT'] = {   
   'de': 'Nachrichten',   
   'en': 'news',   
   'da': 'Meddelelser',   
   'fr': 'Messages',   
   'nl': 'nieuws',   
   'cs': 'zprávy',   
   'tr': 'Mesajlar'
};      
t4me.LangArray['BT_NACHRICHTANFAHRER'] = {   
   'de': 'Nachricht<br/>an Fahrer',   
   'en': 'Message <br/>to driver',   
   'da': 'Meddelelse<br/>til chauffør',   
   'fr': 'Message<br/> au chauffeur',   
   'nl': 'Bericht<br/>aan chauffeur',   
   'cs': 'Zpráva pro řidiče',   
   'tr': 'Şoföre<br/>haber'
};      
t4me.LangArray['BT_NEIN'] = {   
   'de': 'Nein',   
   'en': 'no',   
   'da': 'Nej',   
   'fr': 'Non',   
   'nl': 'Nee',   
   'cs': 'Ne',   
   'tr': 'Hayır'
};      
t4me.LangArray['BT_OK'] = {   
   'de': 'OK',   
   'en': 'OK',   
   'da': 'Ok',   
   'fr': 'OK',   
   'nl': 'OK',   
   'cs': 'OK',   
   'tr': 'OK'
};      
t4me.LangArray['BT_OPTIONEN'] = {   
   'de': 'Optionen',   
   'en': 'Options',   
   'da': 'Options',   
   'fr': 'Options',   
   'nl': 'Opties',   
   'cs': 'Možnosti',   
   'tr': 'Seçenekler'
};      
t4me.LangArray['BT_PWDAENDERN'] = {   
   'de': 'LW. ändern',   
   'en': 'Change password',   
   'da': 'Ændre PW',   
   'fr': 'Editer MdP',   
   'nl': 'WW wijzigen',   
   'cs': 'Změna hesla',   
   'tr': 'GSC. değiştir'
};      
t4me.LangArray['BT_SERVICE'] = {   
   'de': 'Service',   
   'en': 'Service',   
   'da': 'Service',   
   'fr': 'Service',   
   'nl': 'Service',   
   'cs': 'Servis',   
   'tr': 'Servis'
};      
t4me.LangArray['BT_SMS'] = {   
   'de': 'SMS',   
   'en': 'SMS',   
   'da': 'SMS',   
   'fr': 'SMS',   
   'nl': 'SMS',   
   'cs': 'SMS',   
   'tr': 'SMS'
};      
t4me.LangArray['BT_SPEICHERN'] = {   
   'de': 'Speichern',   
   'en': 'store',   
   'da': 'Gem',   
   'fr': 'Enregistrer',   
   'nl': 'Opslaan',   
   'cs': 'Uložit',   
   'tr': 'Kaydet'
};      
t4me.LangArray['BT_STORNO'] = {   
   'de': 'Storno',   
   'en': 'Cancel',   
   'da': 'Annuller',   
   'fr': 'Annuler',   
   'nl': 'Annulering',   
   'cs': 'Storno',   
   'tr': 'İptal'
};      
t4me.LangArray['BT_STORNIEREN'] = {   
   'de': 'Stornieren',   
   'en': 'Cancel',   
   'da': 'Annuller',   
   'fr': 'Annuler',   
   'nl': 'Annuleren',   
   'cs': 'Stornovat',   
   'tr': 'İptal et'
};      
t4me.LangArray['BT_VERBINDLICHBESTELLEN'] = {   
   'de': 'Verbindlich bestellen',   
   'en': 'Place a binding booking',   
   'da': 'Bindende bestilling',   
   'fr': 'Commande fixe',   
   'nl': 'Plaats order',   
   'cs': 'závazná objednávka',   
   'tr': 'Bağlayıcı olmak üzere sipariş et'
};      
t4me.LangArray['BT_VORBESTELLT'] = {   
   'de': 'Vorbestellt',   
   'en': 'Reservations',   
   'da': 'Reserveret',   
   'fr': 'Réservée',   
   'nl': 'Gereserveerd',   
   'cs': 'předobjednat',   
   'tr': 'Ön siparişi yapıldı'
};      
t4me.LangArray['BT_VORBESTELLUNGEN'] = {   
   'de': 'Vorbestellungen',   
   'en': 'Reservations',   
   'da': 'Reservering',   
   'fr': 'Réservations',   
   'nl': 'Reserveringen',   
   'cs': 'Predobjednávky',   
   'tr': 'Ön siparişler'
};      
t4me.LangArray['BT_WEBSEITEOEFFNEN'] = {   
   'de': 'Webseite öffnen',   
   'en': 'Open website',   
   'da': 'Åben website',   
   'fr': 'Ouvrir le site web',   
   'nl': 'Website openen',   
   'cs': 'Otevřít webovou stránku',   
   'tr': 'Websitesini aç'
};      
t4me.LangArray['BT_WEITER'] = {   
   'de': 'Weiter',   
   'en': 'Next',   
   'da': 'Vidre',   
   'fr': 'Plus',   
   'nl': 'Volgende',   
   'cs': 'Dále',   
   'tr': 'Devam'
};      
t4me.LangArray['BT_WEITERESTAXI'] = {   
   'de': 'w. Taxi',   
   'en': 'extra taxi',   
   'da': 'fl. taxaer',   
   'fr': 'Taxi suppl.',   
   'nl': 'extra taxi',   
   'cs': 'Další taxi',   
   'tr': 'w. Taksi'
};      
t4me.LangArray['BT_ZIEL'] = {   
   'de': 'Ziel',   
   'en': 'Dest.',   
   'da': 'Mål',   
   'fr': 'Dest.',   
   'nl': 'Naar',   
   'cs': 'Cíl',   
   'tr': 'Varış noktası'
};      
t4me.LangArray['BT_ZULETZT'] = {   
   'de': 'Zuletzt',   
   'en': 'Last',   
   'da': 'Sidste',   
   'fr': 'Dernière',   
   'nl': 'Historie',   
   'cs': 'Poslední',   
   'tr': 'En son'
};      
t4me.LangArray['BT_ZURUECK'] = {   
   'de': 'Zurück',   
   'en': 'Back',   
   'da': 'Tilbage',   
   'fr': 'Retour',   
   'nl': 'Terug',   
   'cs': 'Zpět',   
   'tr': 'Geri'
};      
t4me.LangArray['ERR_ADDR_NAMEPFLICHT'] = {   
   'de': 'Das Feld Name darf nicht leer sein!',   
   'en': 'The field Name must not be blank!',   
   'da': 'Feltet Navn skal udfyldes!darf nicht leer sein!',   
   'fr': 'Le champ Nom ne peut pas être vide !',   
   'nl': 'Het veld Naam mag niet leeg zijn!',   
   'cs': 'Pole Jméno nesmí být prázdné!',   
   'tr': 'İsim alanı boş bırakılmamalıdır!'
};      
t4me.LangArray['ERR_ADDR_TELEFONNUMMERPFLICHT'] = {   
   'de': 'Das Feld Telefon darf nicht leer sein.',   
   'en': 'Field Phone cannot be blank.',   
   'da': 'Feltet [% apptext(\'TXT_TELEFON\') skal udfyldes.',   
   'fr': 'Le champ Téléphone ne peut pas être vide !',   
   'nl': 'Het veld Telefoon mag niet leeg zijn.',   
   'cs': 'Pole Telefon nesmí být prázdné.',   
   'tr': 'Telefon alanı boş bırakılmamalıdır!'
};      
t4me.LangArray['ERR_ADRESSENICHTERMITTELT'] = {   
   'de': 'Die Adresse konnte nicht ermittelt werden.<br/>Bitte geben Sie die Adresse in die Adresszeile ein oder wählen Sie einen Ort auf der Karte aus.',   
   'en': 'The address could not be determined.<br/>Please enter the address or select a place on the map.',   
   'da': 'Adressen blev ikke fundet.<br/>Angiv venligst en adresse eller vælg en position på kortet.',   
   'fr': 'L\'adresse n\'a pas pu être déterminée.<br/>Veuillez saisir une adresse dans la ligne d\'adresse ou sélectionner un endroit sur le plan.',   
   'nl': 'Kan adres niet bepalen.<br/>Geef een adres in de adresregel, of schuif naar een lokatie op de kaart om deze te selecteren.',   
   'cs': 'Adresu nelze zjistit.<br/>Zadejte adresu do adresového řádku nebo zvolte místo na mapě.',   
   'tr': 'Adres belirlenemedi.<br/>Lütfen adresi ilgili satıra girin veya haritadan bir yer seçin.'
};      
t4me.LangArray['ERR_ADRESSENICHTGEFUNDEN'] = {   
   'de': 'Die Adresse "{0}" wurde nicht gefunden. Bitte korrigieren Sie die Eingabe!',   
   'en': 'Cannot find the address "{0}". Please correct the data!',   
   'da': 'Adressen "{0}" blev ikke fundet. Korriger venligst adressen',   
   'fr': 'L\'adresse "{0}" n\'a pas pu être trouvée. Veuillez corriger votre saisie!',   
   'nl': 'Kan adres "{0}" niet vinden. Corrigeer AUB de gegevens!',   
   'cs': 'Adresa "{0}" nebyla nalezena. Opravte prosím zadání!',   
   'tr': '"{0}» adresi bulunamadı. Lütfen girdiğiniz bilgiyi kontrol edin!'
};      
t4me.LangArray['ERR_ERNEUTVERSUCHEN'] = {   
   'de': 'Erneut versuchen?',   
   'en': 'Try again?',   
   'da': 'Prøv igen?',   
   'fr': 'Essayer à nouveau ?',   
   'nl': 'Nog een keer proberen?',   
   'cs': 'Zkusit znovu?',   
   'tr': 'Tekrar dene?'
};      
t4me.LangArray['ERR_FEHLERBEIANFRAGE'] = {   
   'de': 'Bei der Anfrage ist ein Fehler aufgetreten.<br/>Erneut versuchen?',   
   'en': 'An error occured during the request.<br/> Try again ?',   
   'da': 'Det lykkedes ikke at sende forespørgslen.<br/>Vil du prøve igen?',   
   'fr': 'Une erreur est survenue lors de l\'interrogation.<br/> Essayer encore une fois ?',   
   'nl': 'Er is een fout opgetreden bij het opvragen.<br/>Nog een keer proberen?',   
   'cs': 'Při dotazu došlo k chybě. <br/> Pokusíte se znovu?',   
   'tr': 'Talepte bir hata oluştu.<br/>Tekrar denensin mi?'
};      
t4me.LangArray['ERR_FEHLERBEISAVEAUFTRAG'] = {   
   'de': 'Bei der Anfrage ist ein Fehler aufgetreten. Der Auftrag wurde möglicherweise nicht gespeichert. Bitte versuchen Sie es erneut oder rufen Sie die Hotline: {0}.',   
   'en': 'An error has occurred as the order might not have been stored. Please try again or contact our helpdesk: {0}.',   
   'da': 'Forespørgslen lykkedes ikke. Ordren er evt. ikke blevet gemt. Prøv venligst igen, eller ring til hotlinen: {0}.',   
   'fr': 'Une erreur est survenue lors du traitement de votre demande. Cette commande n’a peut-être pas pu être enregistrée. Veuillez S.V.P. réessayer ou appeler la hotline : {0}.',   
   'nl': 'Er is een fout opgetreden bij de aanvraag, misschien is de order niet opgeslagen. Aub probeer het nog een keer of bel de hotline: {0}.',   
   'cs': 'Při dotazu se vyskytla chyba. Zakázka možná nebyla uložena. Zkuste to znovu nebo volejte hotline:{0}.',   
   'tr': 'ERR_FEHLERBEISAVEAUFTRAG/tr'
};      
t4me.LangArray['ERR_FEHLERBEIVERBINDUNGZUSERVER'] = {   
   'de': 'Fehler bei Verbindung zu Server',   
   'en': 'Error when connecting to server',   
   'da': 'Det lykkedes ikke at forbinde til serveren',   
   'fr': 'Erreur lors de la connexion au serveur',   
   'nl': 'Fout bij verbinding met server',   
   'cs': 'Chyba spojení serveru.',   
   'tr': 'Servere bağlantıda hata'
};      
t4me.LangArray['ERR_INVALID_TIME'] = {   
   'de': 'Die eingegebene Uhrzeit ist ungültig',   
   'en': 'Time entered is not valid.',   
   'da': 'Det angivne klokkeslæt er ugyldigt',   
   'fr': 'L\'heure saisie est invalide.',   
   'nl': 'De ingevoerde tijd is ongeldig',   
   'cs': 'Neplatný čas!',   
   'tr': 'Girilen saat geçersiz'
};      
t4me.LangArray['ERR_KEINEHALTESTELLE'] = {   
   'de': 'Sie haben keine Haltestelle ausgewählt!',   
   'en': 'You have not selected a stop!',   
   'da': 'Du har ikke valgt et stoppested!',   
   'fr': 'Vous n\'avez pas sélectionné d\'arrêt.',   
   'nl': 'U hebt geen halte gekozen!',   
   'cs': 'Nevybrali jste zastávku!',   
   'tr': 'kendinize Durak veya Pozisyon secmediniz.'
};      
t4me.LangArray['ERR_LOCATIONDETECTDISABLED'] = {   
   'de': 'Es kann keine Standortbestimmung durchgeführt werden.<br/>Bitte geben Sie die Adresse in die Adresszeile ein oder wählen Sie einen Ort auf der Karte aus.',   
   'en': 'Cannot determine position.<br/>Please enter the address or select a place on the map.',   
   'da': 'Din position kan ikke findes.<br/>Angiv venligst en adresse eller vælg en position på kortet. ',   
   'fr': 'Erreur lors de la géolocationsation. <br/>Veuillez saisir une adresse dans la ligne d\'adresse ou sélectionner un endroit sur le plan.',   
   'nl': 'Kan geen locatie bepalen.<br/>Aub voer het adres in of kies een plaats op de plattegrond.',   
   'cs': 'Nelze určit Vaši pozici. <br/> Zadejte adresu do adresového řádku nebo zvolte místo na mapě.',   
   'tr': 'Konum tespiti yapılamıyor.<br/>Lütfen adresi ilgili satıra girin veya haritadan bir yer seçin.'
};      
t4me.LangArray['ERR_MINDBUCHSTABENINFELD'] = {   
   'de': 'Geben Sie in das Feld {0} mindestens {1} Zeichen ein!',   
   'en': 'Please enter at least {1} character into field {0}!',   
   'da': 'Angiv i feltet  {0} mindst {1} tegn!',   
   'fr': 'Le champ {0} doit contenir au moins {1} caractère !',   
   'nl': 'U moet ten minste {1} teken invoeren in het veld {0}! ',   
   'cs': 'Do pole {0}zadejte nejméně {1}znak!',   
   'tr': '{0} alanına en az {1} simge girin!'
};      
t4me.LangArray['ERR_PFLICHFELDERLEER'] = {   
   'de': 'Die folgenden Pflichtfelder sind nicht ausgefüllt:',   
   'en': 'Following mandatory fields have not been completed:',   
   'da': 'De følgende obligatoriske felter er ikke udfyldte:',   
   'fr': 'Les champs obligatoires suivants ne sont pas remplis :',   
   'nl': 'De volgende verplichte velden zijn niet ingevuld:',   
   'cs': 'Nejsou vyplněna tato pole:',   
   'tr': 'Aşağıdaki zorunlu alanlar boş bırakılmış:'
};      
t4me.LangArray['ERR_SESSIONABGELAUFEN'] = {   
   'de': 'Session abgelaufen!',   
   'en': 'Session expired!',   
   'da': 'sessionen er udløbet!',   
   'fr': 'session expirée!',   
   'nl': 'sessie verlopen!',   
   'cs': 'Čas vypršel!',   
   'tr': 'Oturum bitti!'
};      
t4me.LangArray['ERR_TIMEOUTADRESSERMITTLUNG'] = {   
   'de': 'Beim Ermitteln der Adresse ist ein Timeout aufgetreten.',   
   'en': 'Time-out when determining the address.',   
   'da': 'Timeout ved søgning af en adresse.',   
   'fr': 'Temporisation lors de la recherche de l\'adresse',   
   'nl': 'Er is een time-out opgetreden',   
   'cs': 'Při určení trasy nastala časová prodleva.',   
   'tr': 'Adresi belirlerken bir timeout oluştu.'
};      
t4me.LangArray['ERR_VERBINDUNGZUSERVER'] = {   
   'de': 'Derzeit ist keine Verbindung zum Server möglich.<br/>Versuchen Sie es in ein paar Minuten erneut.',   
   'en': 'Sorry no server connection. <br/> Please try again later.',   
   'da': 'I øjeblikket ingen forbindelse er det muligt at serveren. <br/> Prøv igen om et par minutter.',   
   'fr': 'Problème de connexion au serveur.<br/>Veuillez réessayer S.V.P. dans quelques minutes.',   
   'nl': 'Op het ogenblik is er geen verbinding met de server.<br/>Aub probeer het over een paar minuten nog een keer over.',   
   'cs': 'Nyní se nelze spojit se serverem. <br/>Zkuste to za pár minut znovu. ',   
   'tr': 'ERR_VERBINDUNGZUSERVER/tr'
};      
t4me.LangArray['TXT_ABFAHRT'] = {   
   'de': 'Abfahrt',   
   'en': 'Pickup',   
   'da': 'Afgang',   
   'fr': 'Départ',   
   'nl': 'Vertrek',   
   'cs': 'Odjezd',   
   'tr': 'TXT_ABFAHRT/tr'
};      
t4me.LangArray['TXT_ABFAHRTSADRESSE'] = {   
   'de': 'Abfahrtsadresse',   
   'en': 'Pickup address',   
   'da': 'Fra',   
   'fr': 'Adresse de départ',   
   'nl': 'Vertrekadres',   
   'cs': 'Adresa odjezdu',   
   'tr': 'Çıkış adresi'
};      
t4me.LangArray['TXT_ABFAHRTSHALTESTELLE'] = {   
   'de': 'Abfahrtshaltestelle',   
   'en': 'Departure stop',   
   'da': 'Afgangsadresse',   
   'fr': 'Arrêt de départ',   
   'nl': 'Vertrekhalte',   
   'cs': 'Nástupní zastávka',   
   'tr': 'Hareket Pozisyonunuz'
};      
t4me.LangArray['TXT_ABFAHRTSZEITPUNKT'] = {   
   'de': 'Abfahrtszeitpunkt',   
   'en': 'Departure time',   
   'da': 'Afgangstidspunkt',   
   'fr': 'Horodatage de départ',   
   'nl': 'Vertrektijd',   
   'cs': 'Čas odjezdu',   
   'tr': 'Çıkış zamanı'
};      
t4me.LangArray['TXT_ABHOLADRESSE'] = {   
   'de': 'Abholadresse',   
   'en': 'Pickup address',   
   'da': 'Afhentningsadresse',   
   'fr': 'Adresse de départ',   
   'nl': 'Ophaaladres',   
   'cs': 'Adresa vyzvednutí',   
   'tr': 'Teslim alma adresi'
};      
t4me.LangArray['TXT_ACCOUNT'] = {   
   'de': 'Konto',   
   'en': 'Account',   
   'da': 'Konto',   
   'fr': 'Compte',   
   'nl': 'Account',   
   'cs': 'Konto',   
   'tr': 'Hesap'
};      
t4me.LangArray['TXT_ACCOUNTDATA'] = {   
   'de': 'Kontodaten',   
   'en': 'Account data',   
   'da': 'Kontodata',   
   'fr': 'Données du compte',   
   'nl': 'Accountgegevens',   
   'cs': 'Přihlašovací údaje',   
   'tr': 'Hesap bilgileri'
};      
t4me.LangArray['TXT_ACCOUNTHINWEIS'] = {   
   'de': 'Herzlich willkommen,<br/>sie haben nun die folgenden Möglichkeiten',   
   'en': 'Wellcome, <br/> you now have the following possibilities',   
   'da': 'Velkommen,<br/>du kan nu vælge mellem følgende:',   
   'fr': 'Bienvenue, <br/> vous avez maintenant les possibilités suivantes',   
   'nl': 'Hartelijk welkom,<br/>u hebt nu de volgende opties',   
   'cs': 'Vítáme Vás,<br/> nyní máte tyto možnosti',   
   'tr': 'Hoş geldiniz,<br/> şimdi aşağıdaki seçenekleriniz bulunmaktadır'
};      
t4me.LangArray['TXT_ACCOUNTHINWEISTEXT'] = {   
   'de': 'Der Business Account macht Taxifahren noch effizienter. Sie fahren einfach per Verrechnungsfahrt. Für mehr Informationen kontaktieren Sie Ihre Taxizentrale.',   
   'en': 'The business account makes your taxi ride more efficient. For more information, please contact your taxi center.',   
   'da': 'Business Account gør det lettere at tage en taxi. Du får en faktura på kørslen. Kontakt din taxacentral hvis du er interesseret.',   
   'fr': 'Devenez plus efficace avec un compte société pour vos commandes de taxis. Payez par retrait bancaire. Veuillez contacter le central de taxis pour davantage d\'informations',   
   'nl': 'De business account maakt het rijden met een taxi nog efficiënter. U betaalt gewoon dmv een factuur. Voor meer informatie aub contacteer uw taxicentrale.',   
   'cs': 'Jízda taxíkem je s Business Account ještě efektivnější. Pojedete prostě na fakturu. Pro další informace kontaktujte Váš dispečink.',   
   'tr': 'TXT_ACCOUNTHINWEISTEXT/tr'
};      
t4me.LangArray['TXT_ACC_ABMELDEN'] = {   
   'de': 'Abmelden',   
   'en': 'log off',   
   'da': 'Frameld',   
   'fr': 'Déconnexion',   
   'nl': 'Afmelden',   
   'cs': 'Odhlásit se',   
   'tr': 'Çıkış'
};      
t4me.LangArray['TXT_ACC_ANMELDEN'] = {   
   'de': 'Anmelden',   
   'en': 'log in',   
   'da': 'Tilmeld',   
   'fr': 'Connexion',   
   'nl': 'Aanmelden',   
   'cs': 'Přihlásit se',   
   'tr': 'Giriş yap'
};      
t4me.LangArray['TXT_ACC_EINFACH'] = {   
   'de': 'einfach bestellen',   
   'en': 'simple order',   
   'da': 'enkelt bestilling',   
   'fr': 'commande simple',   
   'nl': 'eenvoudige order',   
   'cs': 'jednorázová objednávka',   
   'tr': 'kolay şekilde sipariş'
};      
t4me.LangArray['TXT_ACC_NEU'] = {   
   'de': 'neues Konto erstellen',   
   'en': 'add a new account',   
   'da': 'opret ny konto',   
   'fr': 'Créer un nouveau compte',   
   'nl': 'nieuw account aanmaken',   
   'cs': 'vytvořit nové konto',   
   'tr': 'yeni hesap oluştur'
};      
t4me.LangArray['TXT_ACC_PWDAENDERN'] = {   
   'de': 'Losungswort ändern',   
   'en': 'Change password',   
   'da': 'Ændre Password',   
   'fr': 'Editer le mot de passe',   
   'nl': 'Wachtwoord wijzigen',   
   'cs': 'Změnit heslo',   
   'tr': 'Gizli sorunun cevabını değiştir'
};      
t4me.LangArray['TXT_ADRESSAUSWAHL'] = {   
   'de': 'Adressauswahl',   
   'en': 'Address selection',   
   'da': 'Valg af adresse',   
   'fr': 'Sélection d\'adresses',   
   'nl': 'Adressenkeuze',   
   'cs': 'Výběr adresy',   
   'tr': 'Adres seçimi'
};      
t4me.LangArray['TXT_ADRESSDETAILS'] = {   
   'de': 'Adressdetails',   
   'en': 'Address details',   
   'da': 'Adressedetaljer',   
   'fr': 'Détail d\'adresses',   
   'nl': 'Adresgegevens',   
   'cs': 'Podrobnosti adresy',   
   'tr': 'Adres detayları'
};      
t4me.LangArray['TXT_ADRESSE'] = {   
   'de': 'Adresse',   
   'en': 'Address',   
   'da': 'Adresse',   
   'fr': 'Adresse',   
   'nl': 'Adres',   
   'cs': 'Adresa',   
   'tr': 'Adres'
};      
t4me.LangArray['TXT_ADRESSEN'] = {   
   'de': 'Adressen',   
   'en': 'Addresses',   
   'da': 'Adresser',   
   'fr': 'Adresses',   
   'nl': 'Adressen',   
   'cs': 'Adresy',   
   'tr': 'Adresler'
};      
t4me.LangArray['TXT_ADRESSEALSFIXEADRESSE'] = {   
   'de': 'Wollen Sie die Adresse<br/>{0}<br/>als fixe Adresse setzen?',   
   'en': 'Do you want to set the address<br/>{0}<br/>as fixed address?',   
   'da': 'Vil du angive adressen<br/>{0}<br/>som fast adresse?',   
   'fr': 'Souhaitez-vous paramétrer l\'adresse <br/>{0}<br/>comme adresse par défaut ?',   
   'nl': 'Wilt u het adres<br/>{0}<br/>zetten als vast adres?',   
   'cs': 'Chcete nastavit adresu<br/>{0}<br/>jako pevnou adresu?',   
   'tr': 'TXT_ADRESSEALSFIXEADRESSE/tr'
};      
t4me.LangArray['TXT_ADRESSEALSFIXEADRESSELOESCHEN'] = {   
   'de': 'Wollen Sie die Adresse<br/>{0}<br/>nicht mehr als fixe Adresse haben?',   
   'en': 'Do you want to give up the address<br/>{0}<br/>as fixed address?',   
   'da': 'Vil du angive at adressen<br/>{0}<br/>ikke mere er fast adresse?',   
   'fr': 'Souhaitez-vous retirer à l\'adresse <br/>{0}<br/> sont état d\'adresse fixe ?',   
   'nl': 'Wilt u het adres<br/>{0}<br/>niet meer als vast adres hebben?',   
   'cs': 'Tato adresa <br/>{0}<br/>už nemá být pevná?',   
   'tr': 'TXT_ADRESSEALSFIXEADRESSELOESCHEN/tr'
};      
t4me.LangArray['TXT_ADRESSEALSHEIMADRESSE'] = {   
   'de': 'Wollen Sie die Adresse <br/>{0}<br/>als Heimadresse setzen?',   
   'en': 'Do you want to turn your address <br/>{0}<br/> into your default pickup address?',   
   'da': 'Vil du angive adressen <br/>{0}<br/>som hjemmeadresse?',   
   'fr': 'Souhaitez-vous paramétrer l\'adresse <br/>{0}<br/>comme adresse par défaut?',   
   'nl': 'Wilt u het adres <br/>{0}<br/>vastleggen als uw huisadres?',   
   'cs': 'Chcete tuto adresu <br/>{0}<br/> nastavit jako domovskou?',   
   'tr': 'Adres<br/>{0}<br/>›i ev adresi olarak belirlemek istiyor musunuz?'
};      
t4me.LangArray['TXT_ADRESSEALSHEIMADRESSELOSCHEN'] = {   
   'de': 'Wollen Sie die Adresse <br/>{0}<br/>nicht mehr als Heimadresse haben?',   
   'en': 'Do you want to edit your default pickup address <br/>{0}<br/> ? ',   
   'da': 'Vil du angive at adressen {0} ikke er hjemmeadresse?',   
   'fr': 'Vous ne souhaitez-plus avoir l\'adresse <br/>{0}<br/>comme adresse par défaut?',   
   'nl': 'Is het adres <br/>{0}<br/>niet meer uw huisadres?',   
   'cs': 'Nechcete už mít tuto adresu <br/>{0}<br/> jako domovskou?',   
   'tr': 'Adres<br/>{0}<br/>›i artık ev adresi olarak belirlemek istemiyor musunuz?'
};      
t4me.LangArray['TXT_ADRESSELOESCHEN'] = {   
   'de': 'Wollen Sie die Adresse <br/>{0}<br/> wirklich löschen?',   
   'en': 'Do you really want to delete your address <br/>{0}<br/>?',   
   'da': 'Vil du virkelig slette adressen <br/>{0}<br/>?',   
   'fr': 'Souhaitez-vous vraiment effacer l\'adresse <br/>{0}<br/>?',   
   'nl': 'Wilt u het adres <br/>{0}<br/> daadwerkelijk verwijderen?',   
   'cs': 'Chcete adresu <br/>{0}<br/> opravdu smazat?',   
   'tr': 'Adres<br/>{0}<br/>›i gerçekten silmek istiyor musunuz?'
};      
t4me.LangArray['TXT_AKTPOS'] = {   
   'de': 'Akt.Pos.',   
   'en': 'Act.pos.',   
   'da': 'Akt. Pos',   
   'fr': 'Pos.act.',   
   'nl': 'Act. pos.',   
   'cs': 'Akt. pol.',   
   'tr': 'Günc.kon.'
};      
t4me.LangArray['TXT_AKTUELLEAFART'] = {   
   'de': 'aktuelle Auftragsart',   
   'en': 'current order type',   
   'da': 'aktuel ordretype',   
   'fr': 'Type de commande actuelle',   
   'nl': 'huidig ordertype',   
   'cs': 'aktuální druh zakázky',   
   'tr': 'TXT_AKTUELLEAFART/tr'
};      
t4me.LangArray['TXT_AKTUELLEBESTELLUNGEN'] = {   
   'de': 'Aktuelle Bestellungen',   
   'en': 'Current orders',   
   'da': 'Aktuelle bestillinger',   
   'fr': 'Commande actuelle',   
   'nl': 'Actuele bestellingen',   
   'cs': 'Aktuální objednávky',   
   'tr': 'Güncel siparişler'
};      
t4me.LangArray['TXT_ALARM'] = {   
   'de': 'Alarm',   
   'en': 'Alarm',   
   'da': 'Alarm',   
   'fr': 'Alarme',   
   'nl': 'Alarm',   
   'cs': 'Alarm',   
   'tr': 'TXT_ALARM/tr'
};      
t4me.LangArray['TXT_ALSFAVORITHINZUFUEGEN'] = {   
   'de': 'Als Favorit hinzufügen',   
   'en': 'Add as favorite',   
   'da': 'Tilføj som favorit',   
   'fr': 'Ajouter aux favoris',   
   'nl': 'Als favoriet toevoegen',   
   'cs': 'Přidat k oblíbeným',   
   'tr': 'Favori olarak ekle'
};      
t4me.LangArray['TXT_ALSHEIMADRESSE'] = {   
   'de': 'Als Heimadresse',   
   'en': 'As home address',   
   'da': 'Som hjemmeadresse',   
   'fr': 'Adresse par défaut',   
   'nl': 'als huisadres',   
   'cs': 'jako domovskou adresu',   
   'tr': 'Ev adresi olarak'
};      
t4me.LangArray['TXT_ALSFIXEADRESSE'] = {   
   'de': 'Als fixe Adresse',   
   'en': 'As fixed address',   
   'da': 'Som fast adresse',   
   'fr': 'Comme adresse fixe',   
   'nl': 'Als vast adres',   
   'cs': 'Jako pevnou adresu',   
   'tr': 'Sabit Adresim'
};      
t4me.LangArray['TXT_ANDERERTERMIN'] = {   
   'de': 'anderer Termin',   
   'en': 'diff. pickup time',   
   'da': 'andet tidspunkt',   
   'fr': 'Réservation',   
   'nl': 'andere ophaaltijd',   
   'cs': 'jiný termín',   
   'tr': 'diğer termin'
};      
t4me.LangArray['TXT_ANFAHRTSZEIT'] = {   
   'de': 'Anfahrtszeit',   
   'en': 'Arrival in',   
   'da': 'Henkørselstid',   
   'fr': 'Temps d\'approche',   
   'nl': 'Heenwegtijd',   
   'cs': 'Čas přistavení',   
   'tr': 'Varış süresi'
};      
t4me.LangArray['TXT_ANFRAGEWIRDGESENDET'] = {   
   'de': 'Bitte warten.<br/>Die Anfrage wird gesendet ...',   
   'en': 'Please wait. <br/>Sending the request...',   
   'da': 'Vent venligst. <br/>Forespørgslen sendes ...',   
   'fr': 'Veuillez patienter. <br/>L\'interrogation est envoyée…',   
   'nl': 'Een ogenblikje alstublieft.<br/>De aanvraag wordt verstuurd ...',   
   'cs': 'Vyčkejte, prosím. <br/> Posílám dotaz...',   
   'tr': 'Lütfen bekleyin.<br/>Talep gönderiliyor...'
};      
t4me.LangArray['TXT_ANGEMELDETALS'] = {   
   'de': 'Sie sind angemeldet als',   
   'en': 'You are logged in as ',   
   'da': 'Du er tilmeldt som',   
   'fr': 'Vous êtes connecté comme',   
   'nl': 'U bent aangemeld als',   
   'cs': 'Jste přihlášen jako',   
   'tr': 'Girişi bu şekilde yapıldı'
};      
t4me.LangArray['TXT_ANKUNFTSZEITPUNKT'] = {   
   'de': 'Ankunftszeitpunkt',   
   'en': 'Arrival time',   
   'da': 'Ankomsttidspunkt',   
   'fr': 'Heure d\'arrivée',   
   'nl': 'Aankomsttijd',   
   'cs': 'Doba příjezdu',   
   'tr': 'Varis Saatiniz'
};      
t4me.LangArray['TXT_ANMELDUNGMITKONTONICHTMOEGLICH'] = {   
   'de': 'Die automatische Anmeldung mit Ihren Kontodaten(Loginname, Losungswort) wurde abgelehnt!',   
   'en': 'Automatic login with your account data (login name, password) has been denied!',   
   'da': 'Den automatiske tilmelding med dine kontodata (Loginnavn, password) blev afvist!',   
   'fr': 'La connexion automatique avec vos données de compte ( nom utilisateur et mot de passe ) a été refusée !',   
   'nl': 'De automatische aanmelding met uw accountgegevens (loginnaam, wachtwoord) werd geweigerd!',   
   'cs': 'Automatické přihlášení pomocí Vašich přihlašovacích údajů (přihlašovací jméno, heslo) bylo odmítnuto!',   
   'tr': 'Hesap bilgileriniz (kullanıcı adı, gizli sorunun cevabı) ile otomatik girişinize izin verilmedi.'
};      
t4me.LangArray['TXT_ANRUFENFRAGE'] = {   
   'de': 'Anrufen?',   
   'en': 'Call?',   
   'da': 'Ring til?',   
   'fr': 'Appeler?',   
   'nl': 'Bellen?',   
   'cs': 'Volat?',   
   'tr': 'Ara?'
};      
t4me.LangArray['TXT_ANZEIGEN'] = {   
   'de': 'Anzeigen',   
   'en': 'Display',   
   'da': 'Vis',   
   'fr': 'Afficher',   
   'nl': 'Weergeven',   
   'cs': 'Zobrazit',   
   'tr': 'Göster'
};      
t4me.LangArray['TXT_APPBEWERTEN'] = {   
   'de': 'App bewerten',   
   'en': 'Rate App',   
   'da': 'Rate App',   
   'fr': 'Notation l\'application',   
   'nl': 'Beoordeel App',   
   'cs': 'Hodnotit App',   
   'tr': 'Hızı App'
};      
t4me.LangArray['TXT_APPNEULADEN'] = {   
   'de': 'App neu laden',   
   'en': 'reload App',   
   'da': 'Hent app igen',   
   'fr': 'Recharger l\'application',   
   'nl': 'App opnieuw laden',   
   'cs': 'Znova nahrát aplikaci',   
   'tr': 'App›i yeniden yükle'
};      
t4me.LangArray['TXT_AUFTRAG_LOESCHEN'] = {   
   'de': 'Wollen Sie den Auftrag <br/>{0}<br/>wirklich löschen?',   
   'en': 'Do you really want to delete the order <br/>{0}<br/>?',   
   'da': 'Vil du virklig slette ordren<br/>{0}<br/>?',   
   'fr': 'Souhaitez-vous réellement effacer la course<br/> {0}<br/>?',   
   'nl': 'Wilt u de order<br/>{0}<br/>daadwerkelijk verwijderen?',   
   'cs': 'Chcete opravdu smazat zakázku<br/>{0}<br/>?',   
   'tr': 'Görev<br/>{0}<br/>›i gerçekten silmek istiyor musunuz?'
};      
t4me.LangArray['TXT_AUFTRAGSART'] = {   
   'de': 'Auftragsart',   
   'en': 'Order type',   
   'da': 'Ordretype',   
   'fr': 'Type de course',   
   'nl': 'Opdrachtsoort',   
   'cs': 'Druh zakazky',   
   'tr': 'Görev türü'
};      
t4me.LangArray['TXT_AUFTRAGSARTEN'] = {   
   'de': 'Auftragsarten',   
   'en': 'Order types',   
   'da': 'Ordretyper',   
   'fr': 'Types de courses',   
   'nl': 'Ordertypes',   
   'cs': 'Druhy zakázky',   
   'tr': 'Görev türleri'
};      
t4me.LangArray['TXT_AUSWAHL'] = {   
   'de': 'Auswahl',   
   'en': 'Choice',   
   'da': 'Valg af',   
   'fr': 'Sélection',   
   'nl': 'Selectie',   
   'cs': 'Výběr',   
   'tr': 'Seçim'
};      
t4me.LangArray['TXT_BEGRUENDUNG'] = {   
   'de': 'Begründung',   
   'en': 'Cancellation reason',   
   'da': 'Annulleringsgrund',   
   'fr': 'Raison de l\'annulation',   
   'nl': 'Annuleringsreden',   
   'cs': 'Odůvodnění',   
   'tr': 'Gerekçe'
};      
t4me.LangArray['TXT_BENACHRICHTIGUNGHINZUFUEGEN'] = {   
   'de': 'Wollen Sie für diese Bestellung einen Alarm auf Ihrem Gerät hinzufügen?',   
   'en': 'Do you want to add an alarm on your device for this booking?',   
   'da': 'Vil du angive en alarm på dit apparat til denne bestilling?',   
   'fr': 'Souhaitez-vous ajouter un rappel sur votre appareil pour cette commande ?',   
   'nl': 'Wilt u voor deze boeking een alarm toevoegen op uw toestel?',   
   'cs': 'Chcete na Vašem zařízení u této objednávky přidat alarm?',   
   'tr': 'Bu aldiginiz is icin Alarmi aktive edelimmi?'
};      
t4me.LangArray['TXT_BENUTZERDATEN'] = {   
   'de': 'Benutzerdaten',   
   'en': 'User data',   
   'da': 'Bruger-id',   
   'fr': 'Données utilisateur',   
   'nl': 'Gebruikergegevens',   
   'cs': 'Uživatelská data',   
   'tr': 'Kullanıcı verileri'
};      
t4me.LangArray['TXT_BESTAETIGUNG'] = {   
   'de': 'Bestätigung',   
   'en': 'Confirmation',   
   'da': 'Bekræftigelse',   
   'fr': 'Confirmation',   
   'nl': 'Bevestiging ',   
   'cs': 'Potvrzení',   
   'tr': 'Onay'
};      
t4me.LangArray['TXT_BESTAETIGUNGEINHOLEN'] = {   
   'de': 'Bestätigung einholen',   
   'en': 'Get confirmation',   
   'da': 'Hent bekræftigelse',   
   'fr': 'Demander confirmation',   
   'nl': 'Bevestiging ophalen',   
   'cs': 'Vyžádat potvrzení',   
   'tr': 'Onay al'
};      
t4me.LangArray['TXT_BESTELLNRANRUFEN'] = {   
   'de': 'Wollen Sie bei der Taxizentrale<br/>{0}<br/>unter der Nummer<br/>{1}<br/>ein Taxi bestellen?',   
   'en': 'Do you want to call the taxi central <br/>{0}<br/> at <br/>{1}<br/> to order a taxi?',   
   'da': 'Vil du bestille en taxi ved taxacentralen <br/>{0}<br/>med telefonnummeret<br/>{1}<br/>?',   
   'fr': 'Souhaitez-vous réserver un taxi auprès du central de taxis<br/> {0}<br/> au numéro<br/> {1}<br/>?',   
   'nl': 'Wilt u bij de taxicentrale<br/>{0}<br/> een taxi bestellen via het nummer<br/>{1}<br/>?',   
   'cs': 'Chcete si na dispečinku<br/>{0}<br/> číslo <br/>{1}<br/> objednat taxi?',   
   'tr': 'Taksi santral<br/>{0}<br/>›de<br/>{1}<br/>numara üzerinden bir taksi sipariş etmek istiyor musunuz?'
};      
t4me.LangArray['TXT_BESTELLNRANRUFEN_NOPHONE'] = {   
   'de': 'Um Ihr Taxi zu Bestellen rufen Sie bitte die Zentrale <br/>{0}<br/> unter der Telefonnummer<br/>{1}<br/>an.',   
   'en': 'To order your taxi please call the taxi central <br/>{0}<br/>at<br/>{1}<br/>.',   
   'da': 'Ring venligst til centralen <br/>{0}<br/> med nummeret<br/>{1}<br/>for at bestille din taxa.',   
   'fr': 'Pour commander votre taxi, veuillez appeler le central <br/>{0}<br/> au numéro de téléphone<br/> {1}<br/>.',   
   'nl': 'Om uw taxi te bestellen bel de centrale <br/>{0}<br/> onder het telefoonnummer<br/>{1}<br/>.',   
   'cs': 'Pro objednávku taxi zatelefonujte na dispečink <br/>{0}<br/> na tel. č. <br/>{1}<br/>.',   
   'tr': 'Taksinizi sipariş etmek için lütfen<br/>{0}<br/> merkezini<br/>{1}<br/>numara üzerinde arayın.'
};      
t4me.LangArray['TXT_BESTELLEN'] = {   
   'de': 'Bestellen',   
   'en': 'Order',   
   'da': 'Bestil',   
   'fr': 'Bestil',   
   'nl': 'Bestellen',   
   'cs': 'Objednat',   
   'tr': 'Sipariş et'
};      
t4me.LangArray['TXT_BESTELLENFRAGE'] = {   
   'de': 'Bestellen?',   
   'en': 'Order?',   
   'da': 'Bestil?',   
   'fr': 'Commander?',   
   'nl': 'Bestellen?',   
   'cs': 'Objednat?',   
   'tr': 'Sipariş et?'
};      
t4me.LangArray['TXT_BESTELLUNGHIERNICHTMOEGLICH'] = {   
   'de': 'Es ist noch keine Adresse bekannt. Bitte wählen Sie zuerste eine gültige Adresse aus.',   
   'en': 'Address not known yet. Please select a valid address.',   
   'da': 'Der findes ingen adresse endnu. Vælg venligst først en gyldig adresse.',   
   'fr': 'L\'adresse manque. Veuillez d\'abord sélectionner une adresse valide.',   
   'nl': 'Nog geen adres bekend. Aub kies eerst een geldig adres.',   
   'cs': 'Neznámá adresa. Zvolte prosím nejbližší možnou adresu.',   
   'tr': 'Henüz bir adres bilinmemekte. Lütfen önce geçerli bir adres seçin.'
};      
t4me.LangArray['TXT_BEWERTEN'] = {   
   'de': 'Bewerten',   
   'en': 'Rate',   
   'da': 'Bedøm',   
   'fr': 'Noter',   
   'nl': 'Evalueren',   
   'cs': 'Vyhodnotit',   
   'tr': 'Değerlendir'
};      
t4me.LangArray['TXT_BEWERTUNG'] = {   
   'de': 'Bewertung',   
   'en': 'Rating',   
   'da': 'Bedømmelse',   
   'fr': 'Evaluation',   
   'nl': 'Evaluatie',   
   'cs': 'Vyhodnocení',   
   'tr': 'Değerlendirme'
};      
t4me.LangArray['TXT_BEWERTUNGWIRDGESENDET'] = {   
   'de': 'Bitte warten<br/>Bewertung wird gesendet ...',   
   'en': 'Please wait<br/>you rating is being sent',   
   'da': 'Vent venligst. <br/>Din bedømmelse sendes ...',   
   'fr': 'Veuillez attendre, l\'avis <br/> est envoyée …',   
   'nl': 'Een ogenblikje aub<br/>, de evaluatie wordt verstuurd ...',   
   'cs': 'Vyčkejte, prosím <br/> hodnocení se odesílá...',   
   'tr': 'Lütfen bekleyin.<br/>Değerlendirme gönderiliyor...'
};      
t4me.LangArray['TXT_BITTEABFAHRTSHALTESTELLEAUSWAEHLEN'] = {   
   'de': 'Bitte wählen Sie die gewünschte Abfahrtshaltestelle aus.',   
   'en': 'Please select the required departure stop.',   
   'da': 'Vælg venligst det ønskede afgangsstoppested.',   
   'fr': 'Veuillez S.V.P. d\'abord sélectionner l\'arrêt de départ souhaité.',   
   'nl': 'Aub kies de gewenste vertrekhalte.',   
   'cs': 'Zvolte požadovanou nástupní zastávku.',   
   'tr': 'Lütfen dilediginiz Hareket Duraginizi seciniz'
};      
t4me.LangArray['TXT_BITTEABFAHRTSZEITPUNKTAUSWAEHLEN'] = {   
   'de': 'Bitte wählen Sie den gewünschten Abfahrtszeitpunkt aus.',   
   'en': 'Please select the required departure time.',   
   'da': 'Vælg venligst det ønskede afgangstidspunkt.',   
   'fr': 'Veuillez S.V.P. d\'abord sélectionner l\'horodatage de départ.',   
   'nl': 'Aub kies de gewenste vertrektijd.',   
   'cs': 'Zvolte požadovanou dobu odjezdu.',   
   'tr': 'Lütfen harekete gececeyiniz saati seciniz.'
};      
t4me.LangArray['TXT_BITTEAFARTAUSWAEHLEN'] = {   
   'de': 'Bitte wählen Sie eine Auftragsart aus.',   
   'en': 'Please select an order type.',   
   'da': 'Vælg venligst en ordretype.',   
   'fr': 'Veuillez S.V.P. sélectionner le type de commande.',   
   'nl': 'Aub kies een order type.',   
   'cs': 'Zvolte druh zakázky.',   
   'tr': 'Dilediginiz is seklini seciniz.'
};      
t4me.LangArray['TXT_BITTEANKUNFTSHALTESTELLEAUSWAEHLEN'] = {   
   'de': 'Bitte wählen Sie eine Ankunftshaltestelle aus.',   
   'en': 'Please select an arrival stop.',   
   'da': 'Vælg venligst et ankomststoppested.',   
   'fr': 'Veuillez S.V.P. sélectionner l\'arrêt d\'arrivée.',   
   'nl': 'Aub kies een aankomsthalte.',   
   'cs': 'Zvolte příjezdovou zastávku.',   
   'tr': 'Lütfen varmak istediginiz Duragi seciniz.'
};      
t4me.LangArray['TXT_BITTEANKUNFTSZEITPUNKTAUSWAEHLEN'] = {   
   'de': 'Bitte wählen Sie den gewünschten Ankunftszeitpunkt aus.',   
   'en': 'Please select the required arrival time.',   
   'da': 'Vælg venligst det ønskede ankomsttidspunkt.',   
   'fr': 'Veuillez S.V.P. d\'abord sélectionner l\'horodatage d\'arrivée.',   
   'nl': 'Aub kies de gewenste aankomsttijd.',   
   'cs': 'Zvolte požadovanou dobu příjezdu.',   
   'tr': 'Varisa ulasmak istediginiz Zamani secininz'
};      
t4me.LangArray['TXT_BITTEBEWERTEN'] = {   
   'de': 'Bitte bewerten',   
   'en': 'Please rate',   
   'da': 'Giv venligst feedback',   
   'fr': 'Veuillez attribuer une note S.V.P.',   
   'nl': 'Aub maak een beoordeling',   
   'cs': 'Ohodnoťte, prosím',   
   'tr': 'Lütfen degerlendirin.'
};      
t4me.LangArray['TXT_BITTEDATUMWAEHLEN'] = {   
   'de': 'Bitte wählen Sie ein Datum ...',   
   'en': 'Please select a date …',   
   'da': 'Angiv venligst en dato ...',   
   'fr': 'Veuillez sélectionner une date...',   
   'nl': 'Aub kies een datum…',   
   'cs': 'Zvolte datum…',   
   'tr': 'Lütfen bir tarih seçin ...'
};      
t4me.LangArray['TXT_BITTEWARTEN'] = {   
   'de': 'Bitte warten...',   
   'en': 'Please wait...',   
   'da': 'Vent venligst...',   
   'fr': 'Veuillez patienter...',   
   'nl': 'Een ogenblik alstublieft...',   
   'cs': 'Vyčkejte, prosím...',   
   'tr': 'Lütfen bekleyin...'
};      
t4me.LangArray['TXT_BITTEWARTENANMELDUNGERFOLGT'] = {   
   'de': 'Bitte Warten, die Anmeldung wird durchgeführt...',   
   'en': 'Please wait...',   
   'da': 'Vent venligst...',   
   'fr': 'Veuillez patienter...',   
   'nl': 'Een ogenblik alstublieft...',   
   'cs': 'Vyčkejte, prosím...',   
   'tr': 'Lütfen bekleyin..'
};      
t4me.LangArray['TXT_BITTEZEITPUNKTAUSWAEHLEN'] = {   
   'de': 'Bitte wählen Sie einen Zeitpunkt aus.',   
   'en': 'Please select a time.',   
   'da': 'Vælg venligst et tidspunkt.',   
   'fr': 'Veuillez S.V.P. sélectionner une heure',   
   'nl': 'Aub kies een tijdstip.',   
   'cs': 'Zvolte dobu.',   
   'tr': 'Lütfen zamani seciniz'
};      
t4me.LangArray['TXT_CIRCA'] = {   
   'de': 'ca.',   
   'en': 'approx.',   
   'da': 'ca.',   
   'fr': 'env.',   
   'nl': 'ca.',   
   'cs': 'cca.',   
   'tr': 'yaklaşık'
};      
t4me.LangArray['TXT_DANKE'] = {   
   'de': 'Danke',   
   'en': 'Thank you',   
   'da': 'Tak',   
   'fr': 'Merci',   
   'nl': 'Dank u',   
   'cs': 'Děkujeme',   
   'tr': 'Teşekkür ederiz'
};      
t4me.LangArray['TXT_DATUM'] = {   
   'de': 'Datum',   
   'en': 'Date',   
   'da': 'Dato',   
   'fr': 'Date',   
   'nl': 'Datum',   
   'cs': 'Datum',   
   'tr': 'Tarih'
};      
t4me.LangArray['TXT_DAUER'] = {   
   'de': 'Dauer',   
   'en': 'Duration',   
   'da': 'Varighed',   
   'fr': 'Durée',   
   'nl': 'Duur',   
   'cs': 'Doba',   
   'tr': 'Süre'
};      
t4me.LangArray['TXT_DISTANZ'] = {   
   'de': 'Distanz',   
   'en': 'Distance',   
   'da': 'Afstand',   
   'fr': 'Distance',   
   'nl': 'Afstand',   
   'cs': 'Vzdálenost',   
   'tr': 'Mesafe'
};      
t4me.LangArray['TXT_EINSTELLUNGEN'] = {   
   'de': 'Einstellungen',   
   'en': 'Settings',   
   'da': 'Indstillinger',   
   'fr': 'Paramètres',   
   'nl': 'Instellingen',   
   'cs': 'Nastavení',   
   'tr': 'Ayarlar'
};      
t4me.LangArray['TXT_EMAIL'] = {   
   'de': 'Email',   
   'en': 'Email',   
   'da': 'Email',   
   'fr': 'Mail',   
   'nl': 'Email',   
   'cs': 'E-mail',   
   'tr': 'Email'
};      
t4me.LangArray['TXT_ERMITTLEADRESSE'] = {   
   'de': 'Ermittle Adresse',   
   'en': 'Detect address',   
   'da': 'Beregnet adresse',   
   'fr': 'Adresse déterminée',   
   'nl': 'Adres bepalen',   
   'cs': 'Zjisti adresu',   
   'tr': 'Adresi belirle'
};      
t4me.LangArray['TXT_ERMITTLEPOSITION'] = {   
   'de': 'Ermittle Position',   
   'en': 'Detect position',   
   'da': 'Beregnet position',   
   'fr': 'Position détectée',   
   'nl': 'Positie bepalen',   
   'cs': 'Zjisti pozici',   
   'tr': 'Konumu belirle'
};      
t4me.LangArray['TXT_ERMITTLEZENTRALE'] = {   
   'de': 'Ermittle Taxizentrale',   
   'en': 'Detect dispatch centre',   
   'da': 'Beregnet taxacentral',   
   'fr': 'Central de taxis déterminé',   
   'nl': 'Taxicentrale bepalen',   
   'cs': 'Zjisti dispečink',   
   'tr': 'Taksi santralini belirler'
};      
t4me.LangArray['TXT_EUROPA'] = {   
   'de': 'Europa',   
   'en': 'Europe',   
   'da': 'Europa',   
   'fr': 'l\'Europe',   
   'nl': 'Europa',   
   'cs': 'Evropa',   
   'tr': 'Avrupa'
};      
t4me.LangArray['TXT_FAHRTROUTE'] = {   
   'de': 'Fahrtroute',   
   'en': 'Route',   
   'da': 'Kørselsrute',   
   'fr': 'Trajet',   
   'nl': 'Route',   
   'cs': 'Trasa',   
   'tr': 'Yolculuk rotası'
};      
t4me.LangArray['TXT_FAHRTSTRECKE'] = {   
   'de': 'Fahrtstrecke',   
   'en': 'Route',   
   'da': 'Kørselsstrækning',   
   'fr': 'Trajet',   
   'nl': 'Route',   
   'cs': 'Trasa',   
   'tr': 'Yolculuk güzergahı'
};      
t4me.LangArray['TXT_FAHRTBELEG'] = {   
   'de': 'Fahrtbeleg',   
   'en': 'Receipt',   
   'da': 'Kørselsbelæg',   
   'fr': 'Facturette',   
   'nl': 'Kwitantie',   
   'cs': 'Jízdní doklad ',   
   'tr': 'Yolculuk makbuzu'
};      
t4me.LangArray['TXT_FAHRTBELEG_AKTIV'] = {   
   'de': 'Fahrtbeleg aktiv',   
   'en': 'Receipt active',   
   'da': 'Kørselsbelæg aktiv',   
   'fr': 'Facturette active',   
   'nl': 'Kwitantie actief',   
   'cs': 'Jízdní doklad aktivní',   
   'tr': 'Yolculuk makbuzu aktif'
};      
t4me.LangArray['TXT_FAHRZEIT'] = {   
   'de': 'Fahrzeit',   
   'en': 'Trip time',   
   'da': 'Kørselstid',   
   'fr': 'Temps de trajet',   
   'nl': 'Rijtijd',   
   'cs': 'Doba jízdy',   
   'tr': 'Yolculuk süresi'
};      
t4me.LangArray['TXT_FARBE'] = {   
   'de': 'Farbe',   
   'en': 'Color',   
   'da': 'Farve',   
   'fr': 'Couleur',   
   'nl': 'Kleur',   
   'cs': 'Barva',   
   'tr': 'Renk'
};      
t4me.LangArray['TXT_FARBE_BLAU'] = {   
   'de': 'Blau',   
   'en': 'Blue',   
   'da': 'Blå',   
   'fr': 'Bleu',   
   'nl': 'Blauw',   
   'cs': 'Modrá',   
   'tr': 'Mavi'
};      
t4me.LangArray['TXT_FARBE_GELB'] = {   
   'de': 'Gelb',   
   'en': 'Yellow',   
   'da': 'Gul',   
   'fr': 'Jaune',   
   'nl': 'Geel',   
   'cs': 'Žlutá',   
   'tr': 'Sarı'
};      
t4me.LangArray['TXT_FARBE_GRUEN'] = {   
   'de': 'Grün',   
   'en': 'Green',   
   'da': 'Grøn',   
   'fr': 'Vert',   
   'nl': 'Groen',   
   'cs': 'Zelená',   
   'tr': 'Yeşil'
};      
t4me.LangArray['TXT_FARBE_GRAU'] = {   
   'de': 'Grau',   
   'en': 'Gray',   
   'da': 'Grå',   
   'fr': 'Gris',   
   'nl': 'Grijs',   
   'cs': 'Šedá',   
   'tr': 'Gri'
};      
t4me.LangArray['TXT_FARBE_MAGENTA'] = {   
   'de': 'Magenta',   
   'en': 'Magenta',   
   'da': 'Magenta',   
   'fr': 'Magenta',   
   'nl': 'Magenta',   
   'cs': 'Magenta',   
   'tr': 'Magenta'
};      
t4me.LangArray['TXT_FARBE_ORANGE'] = {   
   'de': 'Orange',   
   'en': 'Orange',   
   'da': 'Orange',   
   'fr': 'Orange',   
   'nl': 'Oranje',   
   'cs': 'Oranžová',   
   'tr': 'Turuncu'
};      
t4me.LangArray['TXT_FARBE_ROT'] = {   
   'de': 'Rot',   
   'en': 'Red',   
   'da': 'Rød',   
   'fr': 'Rouge',   
   'nl': 'Rood',   
   'cs': 'Červená',   
   'tr': 'Kırmızı'
};      
t4me.LangArray['TXT_FAVORITEN'] = {   
   'de': 'Favoriten',   
   'en': 'Favorites',   
   'da': 'Favoritter',   
   'fr': 'Favoris',   
   'nl': 'Favorieten',   
   'cs': 'Oblíbené',   
   'tr': 'Favoriler'
};      
t4me.LangArray['TXT_FEEDBACKWIRDGESENDET'] = {   
   'de': 'Feedback wird gesendet...',   
   'en': 'Sending feedback…',   
   'da': 'Feedback sendes ...',   
   'fr': 'Vos informations sont envoyées...',   
   'nl': 'Feedback wordt verzonden…',   
   'cs': 'Zpětná reakce bude zaslána...',   
   'tr': 'Feedback gönderiliyor...'
};      
t4me.LangArray['TXT_FEHLER'] = {   
   'de': 'Fehler',   
   'en': 'Error',   
   'da': 'Fejl',   
   'fr': 'Erreur',   
   'nl': 'Fout',   
   'cs': 'Chyba',   
   'tr': 'Hata'
};      
t4me.LangArray['TXT_FIXEADRESSELOESCHEN'] = {   
   'de': 'Fixe Adresse löschen',   
   'en': 'Delete fixed address',   
   'da': 'Slet fast adresse',   
   'fr': 'Effacer une adresse fixe',   
   'nl': 'Vast adres verwijderen',   
   'cs': 'Vymazat pevnou adresu',   
   'tr': 'Sabit Adresi siliniz.'
};      
t4me.LangArray['TXT_GENAUIGKEIT'] = {   
   'de': 'Genauigkeit',   
   'en': 'Accuracy',   
   'da': 'Nøjagtighed',   
   'fr': 'Exactitude',   
   'nl': 'Nauwkeurigheid',   
   'cs': 'Přesnost',   
   'tr': 'Hassasiyet'
};      
t4me.LangArray['TXT_HALTESTELLE'] = {   
   'de': 'Haltestelle',   
   'en': 'Stop',   
   'da': 'Stoppested',   
   'fr': 'Arrêt',   
   'nl': 'Halte',   
   'cs': 'Zastávka',   
   'tr': 'TXT_HALTESTELLE/tr'
};      
t4me.LangArray['TXT_HEIMADRESSE'] = {   
   'de': 'Heimadresse',   
   'en': 'Home address',   
   'da': 'Hjemmeadresse',   
   'fr': 'Adresse par défaut',   
   'nl': 'Huisadres',   
   'cs': 'Domovská adresa',   
   'tr': 'Ev adresi'
};      
t4me.LangArray['TXT_HILFE'] = {   
   'de': 'Hilfe',   
   'en': 'Help',   
   'da': 'Hjælp',   
   'fr': 'Aide',   
   'nl': 'Help',   
   'cs': 'Pomoc',   
   'tr': 'Yardım'
};      
t4me.LangArray['TXT_HINZUFUEGEN'] = {   
   'de': 'Hinzufügen',   
   'en': 'Add',   
   'da': 'Tilføj',   
   'fr': 'Ajouter',   
   'nl': 'Toevoegen',   
   'cs': 'Přidat',   
   'tr': 'Ekle'
};      
t4me.LangArray['TXT_HINWEIS'] = {   
   'de': 'Hinweis',   
   'en': 'Note',   
   'da': 'Tip',   
   'fr': 'Note',   
   'nl': 'Opmerking',   
   'cs': 'Odkaz',   
   'tr': 'Uyarı'
};      
t4me.LangArray['TXT_IHREBESTELLUNG'] = {   
   'de': 'Ihre Bestellung',   
   'en': 'Your order',   
   'da': 'Din ordre',   
   'fr': 'Votre réservation',   
   'nl': 'Uw bestelling',   
   'cs': 'Vaše objednávka',   
   'tr': 'Siparişiniz'
};      
t4me.LangArray['TXT_IHREBESTELLUNGWIRDGESENDET'] = {   
   'de': 'Ihre Bestelldaten werden gesendet ...',   
   'en': 'Sending your booking data...',   
   'da': 'Dine bestillingsdata sendes ...',   
   'fr': 'Vos données de commande sont envoyées...',   
   'nl': 'Uw bestelgegevens worden verzonden…',   
   'cs': 'Vaše údaje o objednávce byly zaslány…',   
   'tr': 'Sipariş verileriniz gönderiliyor ...'
};      
t4me.LangArray['TXT_IHRTAXIKOMMTIN'] = {   
   'de': 'Ihr Taxi kommt in {0} Minuten',   
   'en': 'Your taxi will arrive in {0} minutes',   
   'da': 'Din taxa kommer om {0} minutter.',   
   'fr': 'Votre taxi arrive dans {0} minutes',   
   'nl': 'Uw taxi komt over {0} minuten',   
   'cs': 'Vaše taxi přijede za {0} minut',   
   'tr': 'Taksiniz {0} dakika sonra geliyor'
};      
t4me.LangArray['TXT_IHRTAXIKOMMTUM'] = {   
   'de': 'Ihr Taxi kommt um {0}.',   
   'en': 'Your taxi will arrive at {0}.',   
   'da': 'Din taxa kommer kl. {0}.',   
   'fr': 'Votre taxi arrive à {0}',   
   'nl': 'Uw taxi komt om {0} .',   
   'cs': 'Vaše taxi přijede v {0}',   
   'tr': 'Taksiniz saat {0} da orada'
};      
t4me.LangArray['TXT_IMMER'] = {   
   'de': 'Immer',   
   'en': 'Always',   
   'da': 'Altid',   
   'fr': 'Toujours',   
   'nl': 'Altijd',   
   'cs': 'Vždy',   
   'tr': 'Her zaman'
};      
t4me.LangArray['TXT_IMPRESSUM'] = {   
   'de': 'Impressum',   
   'en': 'Imprint',   
   'da': 'Kontakt',   
   'fr': 'Informations légales',   
   'nl': 'Colofon',   
   'cs': 'Kontakt',   
   'tr': 'Künye'
};      
t4me.LangArray['TXT_IMPRESSUM_AGB'] = {   
   'de': 'Impressum & AGB',   
   'en': 'Legal details & Terms and conditions',   
   'da': 'Impressum & handelsvilkår',   
   'fr': 'Informations légales & CGV',   
   'nl': 'Colofon',   
   'cs': 'Kontakt',   
   'tr': 'Impressum, Kosullar'
};      
t4me.LangArray['TXT_INFO'] = {   
   'de': 'Info',   
   'en': 'Info',   
   'da': 'Info',   
   'fr': 'Info',   
   'nl': 'Info',   
   'cs': 'Info',   
   'tr': 'Bilgi'
};      
t4me.LangArray['TXT_INFO_BENUTZERDATEN'] = {   
   'de': 'Um Ihre Bestellung durchzuführen benötigen wir Ihren Namen und Ihre Telefonnummer.',   
   'en': 'We need your name and phone number to process your booking.',   
   'da': 'For at kunne gennemføre din bestilling har vi brug for dit navn og dit telefonnummer.',   
   'fr': 'Afin d\'effectuer votre commande, nous avons besoin de votre nom et numéro de téléphone',   
   'nl': 'Voor uw bestelling hebben wij uw naam en telefoonnummer nodig.',   
   'cs': 'K uskutečnění objednávky je potřeba Vaše jméno a telefonní číslo.',   
   'tr': 'Siparişinizi gerçekleştirebilmemiz için isim ve telefon numaranıza ihtiyacımız var.'
};      
t4me.LangArray['TXT_INFOFAHRER'] = {   
   'de': 'Zusatzinfo Fahrer',   
   'en': 'Additional information for driver',   
   'da': 'Kørselsanvisninger til chaufføren',   
   'fr': 'Information supplémentaire pour le chauffeur',   
   'nl': 'Informatie voor de chauffeur',   
   'cs': 'Dodatečné info řidiči',   
   'tr': 'İlave bilgiler şoför'
};      
t4me.LangArray['TXT_INFOPRIVATEMODE'] = {   
   'de': 'Falls sie im "Privaten Modus" surfen gibt es folgende Einschränkungen:<ol><li>Lesezeichen können nicht gespeichert werden</li><li>Sie haben keinen Zugriff auf Ihre letzten Fahrten</li><li>Bei einer Vorbestellung können Sie zum entsprechenden Termin nicht den Status abfragen</li><li>Name und Telefonnummer müssen bei jeder Bestellung neu eingegeben werden</li></ol>Durch Verwendung des untenstehenden Links können Sie die Punkte 1-3 verwenden.',   
   'en': 'There are the following restrictions when surfing in the privacy mode:<ol><li>Bookmarks cannot be stored</li><li>You do not have access to your last trips</li><li>With reservations, you cannot request the status with the corresponding date</li><li>You have to enter your name and phone number again and again</li></ol>Please use the link below in order to be able to use points 1-3.',   
   'da': 'Hvis du surfer i "privat modus" gælder følgende begrænsninger:<ol><li>Favoritter kan ikke gemmes</li><li>Du har ikke adgang til dine sidste kørsler</li><li>Ved en reservering kan du ikke forespørge status på bestillingstidspunktet</li><li>Navn og telefonnummer skal angives ved hver bestilling</li></ol>Ved anvendelse af nedenstående links, kan du anvende punkt 1-3. ',   
   'fr': 'Si vous naviguez en mode privé les restrictions suivantes s\'appliquent : <ol><li>Les marques-pages ne peuvent pas être enregistrés</li><li>Vous n\'accédez pas à vos dernières commandes</li><li>Vous ne pouvez pas interroger l\'état d\'un réservation au moment du rendez-vous</li><li>Vous devez saisir à chaque fois votre nom et numéro de téléphone</li></ol>En utilisant le lien ci-dessous, vous pouvez utiliser les points 1-3.',   
   'nl': 'In het geval dat u privacy mode op uw internet browser het geselcteerd heeft u geen toegang tot uw reserveringen en zsult u bij elke bestelling opnieuw uw gegevens in moeten voeren.',   
   'cs': 'Při použití soukromého rozhraní na internetu následují tato omezení. Záložky nemohou být ukládány.:<ol><li>Nemáte přístup k posledním jízdám.</li><li>U předobjednávky není možné k odpovídajícímu termínu zadat status.</li><li>Jméno a telefonní číslo musí zadány znovu u každé objednávky.</li></ol>Při užití níže zvolených odkazů můžete body 1-3 využít.',   
   'tr': 'Internette «Ozel Mod" ile geziniyorsanız aşağıdaki kısıtlamalar söz konusudur:<ol><li>Ayraçlar kaydedilemez</li><li>Son yolculuklara erişiminiz bulunmaz</li><li>Ön siparişte ilgili terminin durumunu sorgulayamazsınız</li><li>Her siparişte isim ve telefon numarası yeniden girilmelidir</li></ol>Aşağıdaki linki kullanarak 1 ile 3 arsı maddeleri kullanabilirsiniz.'
};      
t4me.LangArray['TXT_INFORMATION'] = {   
   'de': 'Information',   
   'en': 'Information',   
   'da': 'Informationer',   
   'fr': 'Information',   
   'nl': 'Informatie',   
   'cs': 'Informace',   
   'tr': 'Bilgi'
};      
t4me.LangArray['TXT_INFOTAXIFAHRER'] = {   
   'de': 'Info für Fahrer',   
   'en': 'Additional information for driver',   
   'da': 'Kørselsanvisninger til chaufføren',   
   'fr': 'Information supplémentaire pour le chauffeur',   
   'nl': 'Informatie voor de chauffeur',   
   'cs': 'Dodatečné informace k zakázce pro řidiče',   
   'tr': 'Taksi şoförü için bilgiler'
};      
t4me.LangArray['TXT_JETZT'] = {   
   'de': 'Jetzt',   
   'en': 'Now',   
   'da': 'Nu',   
   'fr': 'Maintenant',   
   'nl': 'Nu',   
   'cs': 'Nyní',   
   'tr': 'Şimdi'
};      
t4me.LangArray['TXT_KEINEAKTUELLENBESTELLUNGEN'] = {   
   'de': 'Derzeit sind keine aktuellen Bestellungen vorhanden.',   
   'en': 'No current orders',   
   'da': 'Der er i øjeblikket ingen aktive bestillinger.',   
   'fr': 'Actuellement, aucune commande actuelle n\'est disponible.',   
   'nl': 'Op het ogenblik geen actuele bestellingen.',   
   'cs': 'V současné době nejsou žádné aktuální objednávky.',   
   'tr': 'Şu an güncel siparişler bulunmamaktadır.'
};      
t4me.LangArray['TXT_KEINEANMELDUNGMOEGLICH'] = {   
   'de': 'Sie konnten am System nicht angemeldet werden!',   
   'en': 'Cannot log in to the system',   
   'da': 'Du kunne ikke tilmeldes systemet!',   
   'fr': 'Echec de votre connexion au système !',   
   'nl': 'U kunt niet worden aangemeld op het systeem',   
   'cs': 'Přihlášení se nezdařilo!',   
   'tr': 'Sisteme girişiniz yapılamadı!'
};      
t4me.LangArray['TXT_KEINEHALTESTELLEGEFUNDEN'] = {   
   'de': 'Es wurde keine Haltestelle gefunden.',   
   'en': 'No stop found',   
   'da': 'Der blev ikke fundet et stoppested.',   
   'fr': 'Aucun arrêt n\'a été trouvé.',   
   'nl': 'Geen halte gevonden',   
   'cs': 'Nebyla nalezana žádná zastávka.',   
   'tr': 'öyle bir Durak bulunamadi'
};      
t4me.LangArray['TXT_KEINELESEZEICHEN'] = {   
   'de': 'Derzeit sind keine Lesezeichen vorhanden!',   
   'en': 'No bookmarks are available!',   
   'da': 'Der findes ingen favoritter i øjeblikket!',   
   'fr': 'Aucun marque-page n\'existe actuellement!',   
   'nl': 'Geen bladwijzers beschikbaar',   
   'cs': 'V současné době nejsou nastaveny žádné záložky.',   
   'tr': 'Şu an ayraçlar bulunmamaktadır!'
};      
t4me.LangArray['TXT_KEINELETZTENAUFTRAEGE'] = {   
   'de': 'Derzeit sind keine letzten Aufträge vorhanden.',   
   'en': 'No last orders available.',   
   'da': 'Der findes ingen sidste ordre i øjeblikket.',   
   'fr': 'Aucune dernière course n\'existe actuellement!',   
   'nl': 'Er zijn geen laatste bestellingen beschikbaar.',   
   'cs': 'Aktuálně nejsou k dispozici žádné poslední zakázky.',   
   'tr': 'Şu an son görevler bulunmamaktadır!'
};      
t4me.LangArray['TXT_KEINEVORBESTELLUNGEN'] = {   
   'de': 'Derzeit sind keine Vorbestellungen vorhanden!',   
   'en': 'No reservations are available',   
   'da': 'Der findes ingen reserveringer i øjeblikket!',   
   'fr': 'Aucune réservation n\'existe actuellement!',   
   'nl': 'Er zijn geen reserveringen beschikbaar.',   
   'cs': 'Aktuálně nejsou k dispozici žádné předobjednávky zakázky.',   
   'tr': 'Şu an ön siparişler bulunmamaktadır.'
};      
t4me.LangArray['TXT_KEINNETZWERKVERFUEGBAR'] = {   
   'de': 'Derzeit ist kein Netzwerk verfügbar.<br/>Bitte überprüfen Sie die Einstellungen.',   
   'en': 'No available network.<br/>Please check your settings.',   
   'da': 'Der er i øjeblikket intet netværk. <br/>Kontroller venligst dine indstillinger.',   
   'fr': 'Actuellement aucun réseau n\'est disponible.<br/>Veuillez S.V.P. vérifier vos paramètres.',   
   'nl': 'Op het ogenblik staat er geen netwerk ter beschikking.<br/>Aub controleer de instellingen.',   
   'cs': 'Momentálně není k dispozici žádná síť. <br/> Zkontrolujte prosím nastavení.',   
   'tr': 'Şu an herhangi bir ağ mevcut değil.<br/>Lütfen ayarları kontrol edin.'
};      
t4me.LangArray['TXT_KM'] = {   
   'de': 'KM',   
   'en': 'KM',   
   'da': 'KM',   
   'fr': 'KM',   
   'nl': 'KM',   
   'cs': 'KM',   
   'tr': 'KM'
};      
t4me.LangArray['TXT_KUNDENWUENSCHE'] = {   
   'de': 'Kundenwünsche',   
   'en': 'Preferences',   
   'da': 'Ekstra',   
   'fr': 'Souhaits particuliers',   
   'nl': 'Speciale wensen',   
   'cs': 'Přání zákazníka',   
   'tr': 'Müşteri istekleri'
};      
t4me.LangArray['TXT_LADEADRESSE'] = {   
   'de': 'Lade Adresse...',   
   'en': 'Loading address...',   
   'da': 'Henter adressen...',   
   'fr': 'Chargement de l\'adresse ...',   
   'nl': 'Adres laden...',   
   'cs': 'Nahrávám adresu...',   
   'tr': 'Adresi yükle...'
};      
t4me.LangArray['TXT_LADELESEZEICHEN'] = {   
   'de': 'Lade Lesezeichen ...',   
   'en': 'Loading bookmarks...',   
   'da': 'Henter favoritter...',   
   'fr': 'Chargement des marques pages ...',   
   'nl': 'Bladwijzers laden…',   
   'cs': 'Nahrávám záložky...',   
   'tr': 'Ayracı yükle ...'
};      
t4me.LangArray['TXT_LAUFENDEBESTELLUNG'] = {   
   'de': 'Laufende Bestellung',   
   'en': 'Processed booking',   
   'da': 'Løbende bestilling',   
   'fr': 'Réservation actuelle',   
   'nl': 'Bestelling verwerken',   
   'cs': 'Aktuální objednávka',   
   'tr': 'Mevcut sipariş'
};      
t4me.LangArray['TXT_LAUFENDEBESTELUNGNICHTABGESCHLOSSEN'] = {   
   'de': 'Die aktuelle Bestellung ist noch nicht abgeschlossen. Trotzdem neue Bestellung beginnen?',   
   'en': 'The current booking has not been finished yet. Do you want to start a new booking?',   
   'da': 'Den aktuelle bestilling er ikke afsluttet. Vil du alligevel starte en ny bestilling?',   
   'fr': 'La réservation actuelle n\'est pas encore clôturée. Commencer quand même une nouvelle réservation?',   
   'nl': 'De actuele bestelling is nog niet afgesloten. Wilt u desondanks met een nieuwe bestelling beginnen?',   
   'cs': 'Aktuální objednávka ještě není uzavřena. Chcete přesto začít novou objednávku?',   
   'tr': 'Güncel sipariş henüz tamamlanmadı. Buna rağmen yeni sipariş ile başlanılsın mı?'
};      
t4me.LangArray['TXT_LESEZEICHEN'] = {   
   'de': 'Lesezeichen',   
   'en': 'Bookmark',   
   'da': 'Favoritter',   
   'fr': 'Marque-page',   
   'nl': 'Bladwijzer',   
   'cs': 'Záložka',   
   'tr': 'Ayraç'
};      
t4me.LangArray['TXT_LESEZEICHENNAME'] = {   
   'de': 'Name für Lesezeichen',   
   'en': 'Bookmark name',   
   'da': 'Favorittens navn',   
   'fr': 'Nom du marque-page',   
   'nl': 'Naam voor bladwijzer',   
   'cs': 'Název záložky',   
   'tr': 'Ayraç için isim'
};      
t4me.LangArray['TXT_LESEZEICHENWIRDGESPEICHERT'] = {   
   'de': 'Das Lesezeichen wird gespeichert.',   
   'en': 'Saving the favorit.',   
   'da': 'Favoritten gemmes.',   
   'fr': 'Le marque-page est enregistré.',   
   'nl': 'De bladwijzer wordt opgeslagen.',   
   'cs': 'Záložka se ukládá.',   
   'tr': 'Ayraç kaydediliyor.'
};      
t4me.LangArray['TXT_LETZTEADRESSEN'] = {   
   'de': 'Letzte Adressen',   
   'en': 'Last addresses',   
   'da': 'Sidste adresser',   
   'fr': 'Dernière adresse',   
   'nl': 'Laatste adressen',   
   'cs': 'Poslední adresy',   
   'tr': 'Son adresler'
};      
t4me.LangArray['TXT_LETZTEAUFTRAEGE'] = {   
   'de': 'Letzte Aufträge',   
   'en': 'Last orders',   
   'da': 'Sidste ordre',   
   'fr': 'Dernières commandes',   
   'nl': 'Laatste orders',   
   'cs': 'Poslední zakázky',   
   'tr': 'Son görevler'
};      
t4me.LangArray['TXT_LISTEWIRDGELADEN'] = {   
   'de': 'Liste wird geladen...',   
   'en': 'Loading the list...',   
   'da': 'Listen hentes...',   
   'fr': 'Chargement de la liste...',   
   'nl': 'Lijst wordt geladen…',   
   'cs': 'Nahrávám seznam...',   
   'tr': 'Liste yükleniyor...'
};      
t4me.LangArray['TXT_LOGINNAME'] = {   
   'de': 'TXT_LOGINNAME/de',   
   'en': 'TXT_LOGINNAME/en',   
   'da': 'TXT_LOGINNAME/da',   
   'fr': 'TXT_LOGINNAME/fr',   
   'nl': 'TXT_LOGINNAME/nl',   
   'cs': 'TXT_LOGINNAME/cs',   
   'tr': 'TXT_LOGINNAME/tr'
};      
t4me.LangArray['TXT_LOSUNGSWORT'] = {   
   'de': 'Losungswort',   
   'en': 'Password',   
   'da': 'Password',   
   'fr': 'Mot de passe',   
   'nl': 'Wachtwoord ',   
   'cs': 'Heslo',   
   'tr': 'Gizli sorunun cevabı'
};      
t4me.LangArray['TXT_LOSUNGSWORTALT'] = {   
   'de': 'Losungswort alt',   
   'en': 'Old password',   
   'da': 'Gammelt password',   
   'fr': 'Ancien mot de passe',   
   'nl': 'Oud wachtwoord',   
   'cs': 'Staré heslo',   
   'tr': 'Gizli sorunun cevabı eski'
};      
t4me.LangArray['TXT_LOSUNGSWORTGEAENDERT'] = {   
   'de': 'Das Losungswort wurde geändert.',   
   'en': 'The password has been changed.',   
   'da': 'Password ændret',   
   'fr': 'Le mot de passe a été édité',   
   'nl': 'Het wachtwoord is gewijzigd.',   
   'cs': 'Heslo bylo změněno.',   
   'tr': 'Çözümün cevabı değiştirildi.'
};      
t4me.LangArray['TXT_LOSUNGSWORTNEU'] = {   
   'de': 'Losungswort neu',   
   'en': 'New password',   
   'da': 'Nyt password',   
   'fr': 'Nouveau mot de passe',   
   'nl': 'Nieuw wachtwoord',   
   'cs': 'Nové heslo',   
   'tr': 'Gizli sorunun cevabı yeni'
};      
t4me.LangArray['TXT_MAPKONNTENICHTGELADENWERDEN'] = {   
   'de': 'Die Map konnte nicht geladen werden!',   
   'en': 'The map could not be loaded.',   
   'da': 'Map kunne ikke hentes!',   
   'fr': 'Le plan n\'a pas pu être chargé !',   
   'nl': 'De map kan niet worden geladen!',   
   'cs': 'Mapu nelze nahrát!',   
   'tr': 'Map yüklenemedi!'
};      
t4me.LangArray['TXT_MIN'] = {   
   'de': 'Min',   
   'en': 'Min',   
   'da': 'min',   
   'fr': 'Min.',   
   'nl': 'Min',   
   'cs': 'Min',   
   'tr': 'Dk'
};      
t4me.LangArray['TXT_MINUTE'] = {   
   'de': 'Minute',   
   'en': 'Minute',   
   'da': 'minut',   
   'fr': 'Minute',   
   'nl': 'minuut',   
   'cs': 'Minuta',   
   'tr': 'Dakika'
};      
t4me.LangArray['TXT_MINUTEN'] = {   
   'de': 'Minuten',   
   'en': 'Minutes',   
   'da': 'minutter',   
   'fr': 'Minutes',   
   'nl': 'Minuten',   
   'cs': 'min.',   
   'tr': 'Dakika'
};      
t4me.LangArray['TXT_MONAT_1'] = {   
   'de': 'Jänner',   
   'en': 'January',   
   'da': 'Januar',   
   'fr': 'Janvier',   
   'nl': 'Januari',   
   'cs': 'Leden',   
   'tr': 'Ocak'
};      
t4me.LangArray['TXT_MONAT_2'] = {   
   'de': 'Februar',   
   'en': 'February',   
   'da': 'Februar',   
   'fr': 'Février',   
   'nl': 'Februari',   
   'cs': 'Únor',   
   'tr': 'Şubat'
};      
t4me.LangArray['TXT_MONAT_3'] = {   
   'de': 'März',   
   'en': 'March',   
   'da': 'Marts',   
   'fr': 'Mars',   
   'nl': 'Maart',   
   'cs': 'Březen',   
   'tr': 'Mart'
};      
t4me.LangArray['TXT_MONAT_4'] = {   
   'de': 'April',   
   'en': 'April',   
   'da': 'April',   
   'fr': 'Avril',   
   'nl': 'April',   
   'cs': 'Duben',   
   'tr': 'Nisan'
};      
t4me.LangArray['TXT_MONAT_5'] = {   
   'de': 'Mai',   
   'en': 'May',   
   'da': 'Maj',   
   'fr': 'Mai',   
   'nl': 'Mei',   
   'cs': 'Květen',   
   'tr': 'Mayıs'
};      
t4me.LangArray['TXT_MONAT_6'] = {   
   'de': 'Juni',   
   'en': 'June',   
   'da': 'Juni',   
   'fr': 'Juin',   
   'nl': 'Juni',   
   'cs': 'Červen',   
   'tr': 'Haziran'
};      
t4me.LangArray['TXT_MONAT_7'] = {   
   'de': 'Juli',   
   'en': 'July',   
   'da': 'Juli',   
   'fr': 'Juillet',   
   'nl': 'Juli',   
   'cs': 'Červenec',   
   'tr': 'Temmuz'
};      
t4me.LangArray['TXT_MONAT_8'] = {   
   'de': 'August',   
   'en': 'August',   
   'da': 'August',   
   'fr': 'Août',   
   'nl': 'Augustus',   
   'cs': 'Srpen',   
   'tr': 'Ağustos'
};      
t4me.LangArray['TXT_MONAT_9'] = {   
   'de': 'September',   
   'en': 'September',   
   'da': 'September',   
   'fr': 'Septembre',   
   'nl': 'September',   
   'cs': 'Září',   
   'tr': 'Eylüly'
};      
t4me.LangArray['TXT_MONAT_10'] = {   
   'de': 'Oktober',   
   'en': 'October',   
   'da': 'Oktober',   
   'fr': 'Octobre',   
   'nl': 'Oktober',   
   'cs': 'Říjen',   
   'tr': 'Ekim'
};      
t4me.LangArray['TXT_MONAT_11'] = {   
   'de': 'November',   
   'en': 'November',   
   'da': 'November',   
   'fr': 'Novembre',   
   'nl': 'November',   
   'cs': 'Listopad',   
   'tr': 'Kasım'
};      
t4me.LangArray['TXT_MONAT_12'] = {   
   'de': 'Dezember',   
   'en': 'December',   
   'da': 'December',   
   'fr': 'Décembre',   
   'nl': 'December',   
   'cs': 'Prosinec',   
   'tr': 'Aralık'
};      
t4me.LangArray['TXT_NACH_FC'] = {   
   'de': 'Nach',   
   'en': 'To',   
   'da': 'Efter',   
   'fr': 'après',   
   'nl': 'Naar',   
   'cs': 'po',   
   'tr': 'Sonra'
};      
t4me.LangArray['TXT_NAEHESTESTAXI'] = {   
   'de': 'Nähestes Taxi',   
   'en': 'Nearest taxi',   
   'da': 'Næste taxa',   
   'fr': 'Taxi le plus proche',   
   'nl': 'Dichtstbijzijnde taxi',   
   'cs': 'Nejbližší taxi',   
   'tr': 'En yakın taksi'
};      
t4me.LangArray['TXT_NAME'] = {   
   'de': 'Name',   
   'en': 'Name',   
   'da': 'Navn',   
   'fr': 'Nom',   
   'nl': 'Naam',   
   'cs': 'Jméno',   
   'tr': 'İsim'
};      
t4me.LangArray['TXT_NEU'] = {   
   'de': 'neu',   
   'en': 'new',   
   'da': 'nye',   
   'fr': 'nouveau  ',   
   'nl': 'nieuw',   
   'cs': 'nový',   
   'tr': 'yeni'
};      
t4me.LangArray['TXT_NICHTANGEMELDETINFO'] = {   
   'de': 'Sie sind derzeit nicht an einem Konto angemeldet.',   
   'en': 'You are currently not logged-in with your personal account',   
   'da': 'Du er i øjeblikket tilmeldt via en konto.',   
   'fr': 'Vous n\'êtes pas connecté avec votre compte',   
   'nl': 'U bent op het ogenblik niet aangemeld met een account.',   
   'cs': 'Momentálně nejste přihlášeni k Vašemu účtu.',   
   'tr': 'Şu an bir hesap ile girişiniz yapılmadı.'
};      
t4me.LangArray['TXT_NICHTERMITTELBAR'] = {   
   'de': '-',   
   'en': '-',   
   'da': '-',   
   'fr': '-',   
   'nl': '-',   
   'cs': '-',   
   'tr': '-'
};      
t4me.LangArray['TXT_NOCHZUBEWERTEN'] = {   
   'de': 'noch zu bewerten',   
   'en': 'still to be ranked',   
   'da': 'Bedømmelse mangler',   
   'fr': 'à noter',   
   'nl': 'nog te beoordelen',   
   'cs': 'k hodnocení',   
   'tr': 'henüz değerlendirilmedi'
};      
t4me.LangArray['TXT_NUR2GNETWERKVERFUEGBAR'] = {   
   'de': 'Derzeit ist nur ein 2G-Netzwerk verfügbar. Die Funktionalität, insbesondere die der Map-Komponente, ist dadurch eingeschränkt!',   
   'en': 'Right now, there is only a 2G network available. The functionality, especially the map component, is therefore restricted. ',   
   'da': 'Der findes i øjeblikket kun et 2G-netværk. Derfor fungerer specielt map-delen ikke særlig godt. ',   
   'fr': 'Actuellement, seul le réseau 2G est disponible. Les fonctionnalités, notamment celles du plan sont de ce fait limitées !',   
   'nl': 'Op het ogenblik staat er slechts een 2G-netwerk ter beschikking. De functionaliteit - vooral het mapcomponent is hierdoor beperkt!',   
   'cs': 'Momentálně je k dispozici pouze síť 2G. Je tudíž omezena funkčnost a to především u součásti map.',   
   'tr': 'Şu an sadece bir 2G-Ağı mevcut. Özellikle Map-Bileşimin olmak üzere bundan dolayı işlevsellik kısıtlıdır!'
};      
t4me.LangArray['TXT_OPTIONEN'] = {   
   'de': 'TXT_OPTIONEN/de',   
   'en': 'TXT_OPTIONEN/en',   
   'da': 'TXT_OPTIONEN/da',   
   'fr': 'TXT_OPTIONEN/fr',   
   'nl': 'TXT_OPTIONEN/nl',   
   'cs': 'TXT_OPTIONEN/cs',   
   'tr': 'TXT_OPTIONEN/tr'
};      
t4me.LangArray['TXT_ORTEN'] = {   
   'de': 'Orten',   
   'en': 'Locate',   
   'da': 'Localise',   
   'fr': 'localiser',   
   'nl': 'lokaliseren',   
   'cs': 'Zaměřit',   
   'tr': 'Yeri tespit et'
};      
t4me.LangArray['TXT_ORTUNGSTARTEN'] = {   
   'de': 'starte Ortung',   
   'en': 'start positioning',   
   'da': 'Starter lokalisering',   
   'fr': 'géolocalisation lancée',   
   'nl': 'Begin lokalisatie',   
   'cs': 'počáteční poloha',   
   'tr': 'yer tespitini başlat'
};      
t4me.LangArray['TXT_ORTUNGUNGENAU'] = {   
   'de': 'Ortung ungenau',   
   'en': 'positioning inaccurate',   
   'da': 'Lokalisering unøjagtig',   
   'fr': 'géolocalisation inexacte',   
   'nl': 'Lokalisatie onduidelijk',   
   'cs': 'Nepřesná poloha',   
   'tr': 'Yer tespiti net değil'
};      
t4me.LangArray['TXT_ORTUNGVERBESSERN'] = {   
   'de': 'verbessere Ortung',   
   'en': 'improve positioning',   
   'da': 'Optimerer lokalisering',   
   'fr': 'amélioration de la géolocalisation',   
   'nl': 'verbeterde lokalisatie',   
   'cs': 'upřesnit polohu',   
   'tr': 'yer tespitini iyileştir'
};      
t4me.LangArray['TXT_PRAUK_KEINZIELANGEGEBEN'] = {   
   'de': 'Für die Preisauskunft geben Sie bitte ein Fahrziel ein und drücken danach das Preis-Symbol!',   
   'en': 'For price information please set a destination and press the price symbol!',   
   'da': 'Der skal angives et mål før prisen kan beregnes!',   
   'fr': 'Pour tout renseignement de prix, vous devez saisir une adresse!',   
   'nl': 'Voor een prijsinformatie moet u een bestemming invoeren!',   
   'cs': 'Pro informaci o ceně zadejte cíl jízdy a potom stiskněte symbol ceny!',   
   'tr': 'Fiyat bilgisi için lütfen varış noktasını girip ardından fiyat sembolüne basın.'
};      
t4me.LangArray['TXT_PREIS'] = {   
   'de': 'Preis',   
   'en': 'Price',   
   'da': 'Pris',   
   'fr': 'Prix',   
   'nl': 'Prijs',   
   'cs': 'Cena',   
   'tr': 'Fiyat'
};      
t4me.LangArray['TXT_PREISAUSKUNFT'] = {   
   'de': 'Preisauskunft',   
   'en': 'Price information',   
   'da': 'Prisinformation',   
   'fr': 'Info prix',   
   'nl': 'Prijsinformatie',   
   'cs': 'Info o ceně',   
   'tr': 'Fiyat bilgisi'
};      
t4me.LangArray['TXT_RADAR'] = {   
   'de': 'Radar',   
   'en': 'Radar',   
   'da': 'Radar',   
   'fr': 'Radar',   
   'nl': 'Radar',   
   'cs': 'Radar',   
   'tr': 'Radar'
};      
t4me.LangArray['TXT_RADARWIRDGELADEN'] = {   
   'de': 'Radar wird geladen...',   
   'en': 'Loading the radar...',   
   'da': 'Radar hentes...',   
   'fr': 'Chargement du radar...',   
   'nl': 'Radar wordt geladen…',   
   'cs': 'Nahrávám radar...',   
   'tr': 'Radar yükleniyor...'
};      
t4me.LangArray['TXT_ROUTEKONNTENICHTERMITTELTWERDEN'] = {   
   'de': 'Die Route konnte nicht ermittelt werden.',   
   'en': 'Cannot detect the route',   
   'da': 'Ruten kunne ikke beregnes.',   
   'fr': 'Le trajet n\'a pas pu être calculé.',   
   'nl': 'Kan route niet bepalen',   
   'cs': 'Nelze zjistit trasu.',   
   'tr': 'Rota belirlenemedi.'
};      
t4me.LangArray['TXT_SERVICENRANRUFEN'] = {   
   'de': 'Geben Sie bitte bei Ihrem Anruf die SupportId <span class="color">{0}</span> bekannt.',   
   'en': 'Please have your support ID <span class="color">{0}</span> ready when calling.',   
   'da': 'Angiv venligst support-ID <span class="color">{0}</span> når du ringer.',   
   'fr': 'Lors de votre appel, veuillez indiquer l\'ID S.A.V.<span class="color">{0}</span>.',   
   'nl': 'Houdt aub uw supportId <span class="color">{0}</span>gereed als u opbelt.',   
   'cs': 'Při volání prosím uveďte Vaše ID podpory <span class="color">{0}</span>.',   
   'tr': 'Aradığınızda lütfen SupportId›nizi <span class="color">{0}</span> bildirin.'
};      
t4me.LangArray['TXT_SERVICENRANRUFEN_NOPHONE'] = {   
   'de': 'Bitte rufen Sie die Telefonnummer {0} an und geben Sie Ihre SupportId {1} bekannt.',   
   'en': 'Please call the following number {0} and indicate your support ID  {1}.',   
   'da': 'Ring venligst til telefonnummeret {0} og angiv din support-id {1}.',   
   'fr': 'Veuillez S.V.P. appeler au {0} et indiquer l\'ID S.A.V. {1}.',   
   'nl': 'Aub bel het telefoonnummer {0} en houdt u supportId {1} gereed.',   
   'cs': 'Zavolejte tel. č. {0} a uveďte Vaše ID podpory {1}.',   
   'tr': 'Lütfen {0} telefon numarasını arayın ve SupportId›nizi {1} bildirin.'
};      
t4me.LangArray['TXT_SERVICENRANRUFEN_NOSUPID'] = {   
   'de': 'Support unter {0} anrufen?',   
   'en': 'Call support under {0} ?',   
   'da': 'Ring til support: {0} ?',   
   'fr': 'Appeler le SAV au {0} ?',   
   'nl': 'Support bellen onder {0} ?',   
   'cs': 'Podporu volat pod číslem {0}?',   
   'tr': '{0} ile desteği ara?'
};      
t4me.LangArray['TXT_SERVICENRANRUFEN_NOSUPID_NOPHONE'] = {   
   'de': 'Bitte rufen Sie die Telefonnummer {0} an.',   
   'en': 'Please call {0}.',   
   'da': 'Ring venligst til nummeret {0}.',   
   'fr': 'Veuillez S.V.P. appeler au {0}.',   
   'nl': 'Aub bel {0}.',   
   'cs': 'Volejte prosím tel. č. {0}. ',   
   'tr': 'Lütfen {0} telefon numarasını arayın.'
};      
t4me.LangArray['TXT_SOFORT'] = {   
   'de': 'Sofort',   
   'en': 'Immediately',   
   'da': 'Straks',   
   'fr': 'Immédiatement',   
   'nl': 'Meteen',   
   'cs': 'Ihned',   
   'tr': 'Hemen'
};      
t4me.LangArray['TXT_SOFORTANTWORTWIRDAKTUALISIERT'] = {   
   'de': 'Bitte warten. Ihre Bestelldaten werden überprüft.',   
   'en': 'Please wait, your booking data are verified.',   
   'da': 'Vent venligst. Dine bestillingsdata kontrolleres.',   
   'fr': 'Veuillez patienter. Vos données de commandes sont vérifiées.',   
   'nl': 'Even wachten aub. Uw bestelgegevens worden gecontroleerd.',   
   'cs': 'Prosíme čekejte. Informace o objednávce se zpracovávají.',   
   'tr': 'Lütfen bekleyin. Sipariş verileriniz kontrol ediliyor.'
};      
t4me.LangArray['TXT_SONDERWUENSCHE'] = {   
   'de': 'Sonderwünsche',   
   'en': 'Special wishes',   
   'da': 'Ekstras',   
   'fr': 'Souhaits particuliers',   
   'nl': 'Speciale wensen',   
   'cs': 'Zvláštní přání',   
   'tr': 'Özel istekler'
};      
t4me.LangArray['TXT_SPRACHECODE'] = {   
   'de': 'Sprache',   
   'en': 'Language',   
   'da': 'Sprog',   
   'fr': 'Langue',   
   'nl': 'Taal',   
   'cs': 'Jazyk',   
   'tr': 'Dil'
};      
t4me.LangArray['TXT_SPRACHE_DAENISCH'] = {   
   'de': 'Dänisch',   
   'en': 'Danish',   
   'da': 'Dansk',   
   'fr': 'Danois',   
   'nl': 'Deens',   
   'cs': 'Dánský jazyk',   
   'tr': 'Danimarkaca'
};      
t4me.LangArray['TXT_SPRACHE_DAENISCH_DANSK'] = {   
   'de': 'Dansk',   
   'en': 'Dansk',   
   'da': 'Dansk',   
   'fr': 'Dansk',   
   'nl': 'Dansk',   
   'cs': 'Dansk',   
   'tr': 'Dansk'
};      
t4me.LangArray['TXT_SPRACHE_DEUTSCH'] = {   
   'de': 'Deutsch',   
   'en': 'German',   
   'da': 'Tysk',   
   'fr': 'Allemand',   
   'nl': 'Duits',   
   'cs': 'Německý jazyk',   
   'tr': 'Almanca'
};      
t4me.LangArray['TXT_SPRACHE_DEUTSCH_DEUTSCH'] = {   
   'de': 'Deutsch',   
   'en': 'Deutsch',   
   'da': 'Deutsch',   
   'fr': 'Deutsch',   
   'nl': 'Deutsch',   
   'cs': 'Deutsch',   
   'tr': 'Deutsch'
};      
t4me.LangArray['TXT_SPRACHE_ENGLISCH'] = {   
   'de': 'Englisch',   
   'en': 'English',   
   'da': 'Engelsk',   
   'fr': 'Anglais',   
   'nl': 'Engels',   
   'cs': 'Anglický jazyk',   
   'tr': 'İngilizce'
};      
t4me.LangArray['TXT_SPRACHE_ENGLISCH_ENGLISH'] = {   
   'de': 'English',   
   'en': 'English',   
   'da': 'English',   
   'fr': 'English',   
   'nl': 'English',   
   'cs': 'English',   
   'tr': 'English'
};      
t4me.LangArray['TXT_SPRACHE_FRANZOESISCH'] = {   
   'de': 'Französisch',   
   'en': 'French',   
   'da': 'Fransk',   
   'fr': 'Français',   
   'nl': 'Frans',   
   'cs': 'Francouzský jazyk',   
   'tr': 'Fransızca'
};      
t4me.LangArray['TXT_SPRACHE_FRANZOESISCH_FRANCAIS'] = {   
   'de': 'Français',   
   'en': 'Français',   
   'da': 'Français',   
   'fr': 'Français',   
   'nl': 'Français',   
   'cs': 'Français',   
   'tr': 'Français'
};      
t4me.LangArray['TXT_SPRACHE_NIEDERLAENDISCH'] = {   
   'de': 'Niederländisch',   
   'en': 'Dutch',   
   'da': 'Hollandsk',   
   'fr': 'Néerlandais',   
   'nl': 'Nederlands',   
   'cs': 'Holandský jazyk',   
   'tr': 'Hollandaca'
};      
t4me.LangArray['TXT_SPRACHE_NIEDERLAENDISCH_NEDERLANDS'] = {   
   'de': 'Nederlands',   
   'en': 'Nederlands',   
   'da': 'Nederlands',   
   'fr': 'Nederlands',   
   'nl': 'Nederlands',   
   'cs': 'Nederlands',   
   'tr': 'Nederlands'
};      
t4me.LangArray['TXT_SPRACHE_TSCHECHISCH'] = {   
   'de': 'Tschechisch',   
   'en': 'Czech',   
   'da': 'Tjekkisk',   
   'fr': 'Tchèque',   
   'nl': 'Tsjechisch',   
   'cs': 'Český jazyk',   
   'tr': 'Çekce'
};      
t4me.LangArray['TXT_SPRACHE_TSCHECHISCH_CESKYJAZYK'] = {   
   'de': 'Český jazyk',   
   'en': 'Český jazyk',   
   'da': 'Český jazyk',   
   'fr': 'Český jazyk',   
   'nl': 'Český jazyk',   
   'cs': 'Český jazyk',   
   'tr': 'Český jazyk'
};      
t4me.LangArray['TXT_SPRACHE_TUERKISCH'] = {   
   'de': 'Türkisch',   
   'en': 'Turkish',   
   'da': 'Tyrkisk',   
   'fr': 'Turque',   
   'nl': 'Turks',   
   'cs': 'Turečtina',   
   'tr': 'Türk'
};      
t4me.LangArray['TXT_SPRACHE_TUERKISCH_TUERK'] = {   
   'de': 'Türk',   
   'en': 'Türk',   
   'da': 'Türk',   
   'fr': 'Türk',   
   'nl': 'Türk',   
   'cs': 'Türk',   
   'tr': 'Türk'
};      
t4me.LangArray['TXT_STANDORTNICHTERMITTELT'] = {   
   'de': 'Standort kann nicht bestimmt werden.',   
   'en': 'Cannot determine position.',   
   'da': 'Position kan ikke findes. ',   
   'fr': 'L\'emplacement ne peut pas être déterminé.',   
   'nl': 'Kan lokalisatie niet bepalen.',   
   'cs': 'Lokalita nemůže být určena.',   
   'tr': 'Konum belirlenemiyor.'
};      
t4me.LangArray['TXT_STATUS'] = {   
   'de': 'Status',   
   'en': 'Status',   
   'da': 'Status',   
   'fr': 'Etat',   
   'nl': 'Status',   
   'cs': 'Status',   
   'tr': 'Durum'
};      
t4me.LangArray['TXT_STORNO'] = {   
   'de': 'Storno',   
   'en': 'Cancellation',   
   'da': 'Annullering',   
   'fr': 'Annulation',   
   'nl': 'Annulering',   
   'cs': 'Storno',   
   'tr': 'İptal'
};      
t4me.LangArray['TXT_STORNOFUERAUFTRAG'] = {   
   'de': 'Storno für Auftrag Nr.:',   
   'en': 'Cancellation for order no.:',   
   'da': 'Annullering til ordrenr.:',   
   'fr': 'Annulation pour la course n° :',   
   'nl': 'Annulering voor order no:',   
   'cs': 'Storno zakázky č.:',   
   'tr': 'İptal edilen görevin numarası:'
};      
t4me.LangArray['TXT_STORNOFUERAUFTRAG2'] = {   
   'de': 'Storno für Auftrag',   
   'en': 'Cancellation for booking',   
   'da': 'Annullering af ordre',   
   'fr': 'Annulation de la commande',   
   'nl': 'Annulering voor order',   
   'cs': 'Storno zakázky',   
   'tr': 'Görev iptali'
};      
t4me.LangArray['TXT_STORNOFUERAUFTRAG_TEXT'] = {   
   'de': 'Wollen Sie diesen Auftrag wirklich stornieren?',   
   'en': 'Do you really want to cancel this order?',   
   'da': 'Vil du virkelig annullere denne ordre?',   
   'fr': 'Souhaitez-vous réellement annuler cette course?',   
   'nl': 'Wilt u deze bestelling daadwerkelijk annuleren ?',   
   'cs': 'Chcete tuto zakázku opravdu stornovat?',   
   'tr': 'Görevi gerçekten iptal etmek istiyor musunuz?'
};      
t4me.LangArray['TXT_TAXI'] = {   
   'de': 'Taxi',   
   'en': 'Taxi',   
   'da': 'Taxi',   
   'fr': 'Taxi',   
   'nl': 'Taxi',   
   'cs': 'Taxi',   
   'tr': 'TXT_TAXI/tr'
};      
t4me.LangArray['TXT_TAXIDIENST'] = {   
   'de': 'Taxidienst',   
   'en': 'Taxi service',   
   'da': 'Taxiservice',   
   'fr': 'Service taxis',   
   'nl': 'Taxiservice',   
   'cs': 'Taxi služba',   
   'tr': 'Taksi hizmeti'
};      
t4me.LangArray['TXT_TAXIDIENSTE'] = {   
   'de': 'Taxidienste',   
   'en': 'Taxi services',   
   'da': 'Taxiservice',   
   'fr': 'Services taxis',   
   'nl': 'Taxiservices',   
   'cs': 'Taxi služby',   
   'tr': 'Taksi hizmetleri'
};      
t4me.LangArray['TXT_TAXIIN'] = {   
   'de': 'Taxi in',   
   'en': 'Taxi in',   
   'da': 'Taxa',   
   'fr': 'Taxi',   
   'nl': 'Taxi in',   
   'cs': 'Taxi za',   
   'tr': 'Taksiniz'
};      
t4me.LangArray['TXT_TAXISINEUROPA'] = {   
   'de': 'Taxis in Europa',   
   'en': 'Taxis in Europe',   
   'da': 'Taxaer i europa',   
   'fr': 'Taxis en Europe',   
   'nl': 'Taxi\'s in Europa ',   
   'cs': 'Taxi v Evropě',   
   'tr': 'Avrupadaki Taksiler'
};      
t4me.LangArray['TXT_TAXIVORTUER'] = {   
   'de': 'Ihr Taxi <br/>{0}<br/>ist eingetroffen.',   
   'en': 'Your taxi <br/>{0}<br/> has arrived.',   
   'da': 'Din taxi<br/>{0}<br/>er ankommet.',   
   'fr': 'Votre taxi<br/> {0}<br/> est arrivé.',   
   'nl': 'Uw taxi<br/>{0}<br/>staat klaar.',   
   'cs': 'Vaše taxi <br/>{0}<br/> je na místě.',   
   'tr': 'Taksiniz <br/>{0}<br/>ulaşmıştır.'
};      
t4me.LangArray['TXT_TELEFON'] = {   
   'de': 'Telefon',   
   'en': 'Phone',   
   'da': 'Telefon',   
   'fr': 'Téléphone',   
   'nl': 'Telefoon',   
   'cs': 'Telefon',   
   'tr': 'Telefon'
};      
t4me.LangArray['TXT_TELNRANRUFEN_NOPHONE'] = {   
   'de': 'Bitte rufen Sie die Telefonnummer <br/>{0}<br/>an.',   
   'en': 'Please call <br/>{0}.',   
   'da': 'Ring venligst til telefonnummeret<br/>{0}',   
   'fr': 'Veuillez S.V.P. appeler au {0}.',   
   'nl': 'Aub bel <br/>{0}<br/>.',   
   'cs': 'Volejte prosím tel. č. <br/>{0}<br/>.',   
   'tr': 'Lütfen <br/>{0}<br/> telefon numarasını arayın.'
};      
t4me.LangArray['TXT_TERMIN'] = {   
   'de': 'Termin',   
   'en': 'Date',   
   'da': 'Tidspunkt',   
   'fr': 'Rendez-vous',   
   'nl': 'Tijdstip',   
   'cs': 'Termín',   
   'tr': 'Termin'
};      
t4me.LangArray['TXT_TRYLOADMAP'] = {   
   'de': 'Versuche Karte zu laden ...',   
   'en': 'Try to load Map ...',   
   'da': 'Prøver at hente kortet...',   
   'fr': 'Chargement de la carte...',   
   'nl': 'Probeer kaart te laden…',   
   'cs': 'Pokus o načtení mapy...',   
   'tr': 'Harita yüklenilmeye çalışıyor ...'
};      
t4me.LangArray['TXT_UEBERSICHT'] = {   
   'de': 'Übersicht',   
   'en': 'Overview',   
   'da': 'Oversigt',   
   'fr': 'Aperçu',   
   'nl': 'Overzicht',   
   'cs': 'Přehled',   
   'tr': 'Özet'
};      
t4me.LangArray['TXT_UEBERSICHTWIRDGELADEN'] = {   
   'de': 'Übersicht wird geladen...',   
   'en': 'Loading overview...',   
   'da': 'Oversigten hentes...',   
   'fr': 'Chargement de l\'aperçu...',   
   'nl': 'Overzicht wordt geladen…',   
   'cs': 'Nahrávám přehled...',   
   'tr': 'Özet yükleniyor...'
};      
t4me.LangArray['TXT_UHR'] = {   
   'de': 'Uhr',   
   'en': 'Hour',   
   'da': 'Kl.',   
   'fr': 'heure',   
   'nl': 'Uur',   
   'cs': 'Hodina',   
   'tr': 'Saat'
};      
t4me.LangArray['TXT_UHRZEIT'] = {   
   'de': 'Uhrzeit',   
   'en': 'Time',   
   'da': 'Klokkeslæt',   
   'fr': 'Heure',   
   'nl': 'Tijdstip',   
   'cs': 'Čas',   
   'tr': 'Saat'
};      
t4me.LangArray['TXT_UMGEBUNG'] = {   
   'de': 'Umgebung',   
   'en': 'Surr.',   
   'da': 'Omegn',   
   'fr': 'Environs',   
   'nl': 'Omgeving',   
   'cs': 'Okolí',   
   'tr': 'Civarı'
};      
t4me.LangArray['TXT_USERNAME'] = {   
   'de': 'Loginname',   
   'en': 'Username',   
   'da': 'BrugerID',   
   'fr': 'ID utilisateur',   
   'nl': 'GebruikerID',   
   'cs': 'Uživatelské jméno',   
   'tr': 'Kullanıcı adı'
};      
t4me.LangArray['TXT_VB_LOESCHEN'] = {   
   'de': 'Wollen Sie die Vorbestellung <br/>{0}<br/> wirklich löschen?',   
   'en': 'Do you really want to delete the reservation <br/>{0}<br/>?',   
   'da': 'Vil du virkelig slette reserveringen <br/>{0}<br/>?',   
   'fr': 'Souhaitez-vous réellement effacer la réservation <br/>{0}<br/>?',   
   'nl': 'Wilt u de reservering <br/>{0}<br/> daadwerkelijk verwijderen?',   
   'cs': 'Chcete opravdu smazat předobjednávku <br/>{0}<br/>?',   
   'tr': 'Ön sipariş<br/>{0}<br/>›i gerçekten silmek istiyor musunuz?'
};      
t4me.LangArray['TXT_VERSION'] = {   
   'de': 'Version',   
   'en': 'Version',   
   'da': 'Version',   
   'fr': 'Version',   
   'nl': 'Version',   
   'cs': 'Verze',   
   'tr': 'TXT_VERSION/tr'
};      
t4me.LangArray['TXT_VON_FC'] = {   
   'de': 'Von',   
   'en': 'From',   
   'da': 'Fra',   
   'fr': 'De',   
   'nl': 'Van',   
   'cs': 'Od',   
   'tr': '‹dan'
};      
t4me.LangArray['TXT_VORBEST'] = {   
   'de': 'Vorbest.',   
   'en': 'Reservation',   
   'da': 'Reserv.',   
   'fr': 'Résa',   
   'nl': 'Reservering',   
   'cs': 'Předobj.',   
   'tr': 'Ön sip.'
};      
t4me.LangArray['TXT_VORBESTELLUNGEN'] = {   
   'de': 'Vorbestellungen',   
   'en': 'Reservations',   
   'da': 'Reservering',   
   'fr': 'Réservations',   
   'nl': 'Reserveringen',   
   'cs': 'Předobjednávky',   
   'tr': 'Ön siparişler'
};      
t4me.LangArray['TXT_VORORT'] = {   
   'de': 'Vor Ort',   
   'en': 'on site',   
   'da': 'på stedet',   
   'fr': 'Taxi arrivé',   
   'nl': 'ter plekke',   
   'cs': 'Na místě',   
   'tr': 'Yerinde'
};      
t4me.LangArray['TXT_WENNKEINGPS'] = {   
   'de': 'Wenn kein GPS',   
   'en': 'If no GPS',   
   'da': 'Når ingen GPS',   
   'fr': 'Si aucun GPS',   
   'nl': 'Indien geen GPS',   
   'cs': 'Pokud není GPS',   
   'tr': 'GPS olmadığı durumda'
};      
t4me.LangArray['TXT_WERBUNG'] = {   
   'de': 'Werbung',   
   'en': 'Promotion',   
   'da': 'Reklame',   
   'fr': 'Publicité',   
   'nl': 'Reclame',   
   'cs': 'Reklama',   
   'tr': 'Reklam'
};      
t4me.LangArray['TXT_WIRDGELADEN'] = {   
   'de': 'Die Daten werden geladen ...',   
   'en': 'The data is loading',   
   'da': 'Dataerne hentes...',   
   'fr': 'Chargement des données en cours ...',   
   'nl': 'De gegevens worden geladen…',   
   'cs': 'Nahrávám data...',   
   'tr': 'Veriler yükleniyor ...'
};      
t4me.LangArray['TXT_WOCHENTAG_MONTAG_KURZ'] = {   
   'de': 'Mo',   
   'en': 'Mo',   
   'da': 'Ma',   
   'fr': 'Lu',   
   'nl': 'Ma',   
   'cs': 'Po',   
   'tr': 'P.tesi'
};      
t4me.LangArray['TXT_WOCHENTAG_DIENSTAG_KURZ'] = {   
   'de': 'Di',   
   'en': 'Tu',   
   'da': 'Ti',   
   'fr': 'Ma',   
   'nl': 'Di',   
   'cs': 'Út',   
   'tr': 'Sa'
};      
t4me.LangArray['TXT_WOCHENTAG_MITTWOCH_KURZ'] = {   
   'de': 'Mi',   
   'en': 'We',   
   'da': 'On',   
   'fr': 'Me',   
   'nl': 'Wo',   
   'cs': 'St',   
   'tr': 'Çarş'
};      
t4me.LangArray['TXT_WOCHENTAG_DONNERSTAG_KURZ'] = {   
   'de': 'Do',   
   'en': 'Th',   
   'da': 'To',   
   'fr': 'Je',   
   'nl': 'Do',   
   'cs': 'Čt',   
   'tr': 'Perş'
};      
t4me.LangArray['TXT_WOCHENTAG_FREITAG_KURZ'] = {   
   'de': 'Fr',   
   'en': 'Fr',   
   'da': 'Fr',   
   'fr': 'Ve',   
   'nl': 'Vr',   
   'cs': 'Pá',   
   'tr': 'Cu'
};      
t4me.LangArray['TXT_WOCHENTAG_SAMSTAG_KURZ'] = {   
   'de': 'Sa',   
   'en': 'Sa',   
   'da': 'Lø',   
   'fr': 'Sa',   
   'nl': 'Za',   
   'cs': 'So',   
   'tr': 'C.tesi'
};      
t4me.LangArray['TXT_WOCHENTAG_SONNTAG_KURZ'] = {   
   'de': 'So',   
   'en': 'Su',   
   'da': 'Sø',   
   'fr': 'Di',   
   'nl': 'Zo',   
   'cs': 'Ne',   
   'tr': 'Pa'
};      
t4me.LangArray['TXT_ZEITPUNKT'] = {   
   'de': 'Zeitpunkt',   
   'en': 'Date',   
   'da': 'Tidspunkt',   
   'fr': 'Rendez-vous',   
   'nl': 'Tijdpunt',   
   'cs': 'Okamžik',   
   'tr': 'TXT_ZEITPUNKT/tr'
};      
t4me.LangArray['TXT_ZENTRALERUFEN'] = {   
   'de': 'Zentrale rufen',   
   'en': 'Call dispatch centre',   
   'da': 'Ring til centralen',   
   'fr': 'Appeler le central',   
   'nl': 'Centrale oproepen',   
   'cs': 'Volat centrálu',   
   'tr': 'Santrali ara'
};      
t4me.LangArray['TXT_ZIELADRESSE'] = {   
   'de': 'Zieladresse',   
   'en': 'Destination address',   
   'da': 'Til',   
   'fr': 'Adresse de destination',   
   'nl': 'Bestemmingsadres',   
   'cs': 'Cílová adresa',   
   'tr': 'Varış adresi'
};      
t4me.LangArray['TXT_ZIELHALTESTELLE'] = {   
   'de': 'Zielhaltestelle',   
   'en': 'Destination stop',   
   'da': 'Målstoppested',   
   'fr': 'Arrêt de destination',   
   'nl': 'Aankomsthalte',   
   'cs': 'Cílová zastávka',   
   'tr': 'Varis noktasindaki Durak'
};      
t4me.LangArray['TXT_ZULETZT'] = {   
   'de': 'Zuletzt',   
   'en': 'Last addresses',   
   'da': 'Sidste',   
   'fr': 'Dernière',   
   'nl': 'Laatste adressen',   
   'cs': 'Poslední',   
   'tr': 'En son'
};      
t4me.LangArray['TXT_ZURBESTELLUNG'] = {   
   'de': 'zur Bestellung',   
   'en': 'booking',   
   'da': 'til bestilling',   
   'fr': 'A la commande',   
   'nl': 'Bestel taxi',   
   'cs': 'k objednávce',   
   'tr': 'siparişe git'
};      
t4me.LangArray['TXT_ZURORTUNGSVERBESSERUNGWLANEINSCHALTEN'] = {   
   'de': 'WLan aktiviert?',   
   'en': 'Wlan active?',   
   'da': 'Wireless LAN aktiv?',   
   'fr': 'Activer Wifi ?',   
   'nl': 'Is WiFi geactiveerd?',   
   'cs': 'Aktivovat WLan?',   
   'tr': 'WLAN aktif mi?'
};      
t4me.LangArray['TXT_ZUSATZINFOS'] = {   
   'de': 'Zusatzinfos',   
   'en': 'Extra info',   
   'da': 'Tillægsinfo',   
   'fr': 'Informations supplémentaires',   
   'nl': 'Extra informatie ',   
   'cs': 'Doplňující info',   
   'tr': 'İlave bilgiler'
};



///* FIRSTLINE COMMENT */
(function()
{

	function InitObject()
	{
		var initobject = this;
		this.appver = navigator.appVersion.toLowerCase();
		this.ieVersion = undefined;
		// 
		this.css_version = '';
		// 
		this._cssdone = [ false, false, false
		];
		this._cssloaded = false;

		this.ieVersion = (function()
		{
			var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
			while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0])
				;
			return v > 4 ? v : undef;
		}());
	}
	/**
	 * <pre>
	 * ---------------------------------------------------------------------------------------------
	 * Sind wir in der App oder im Browser
	 * ---------------------------------------------------------------------------------------------
	 * </pre>
	 */
	InitObject.prototype.isApp = function()
	{
		var initobject = this;
		var result = false;
		// 
		result = true;
		// 
		return result;
	};

	/**
	 * <pre>
	 * ---------------------------------------------------------------------------------------------
	 * Überprüfung IOS7 Device
	 * ---------------------------------------------------------------------------------------------
	 * </pre>
	 */
	InitObject.prototype.isIOS7Device = function()
	{
		var initobject = this;
		var bResult = false;
		if (initobject.isApp() === true)
		{
			// alter testnavigator.userAgent.search(/OS 7_.*? like Mac OS X/i);
			var res = navigator.userAgent.match(/OS (\d*)_.*? like Mac OS X/i);
			if (res !== null)
			{
				if ((res.length === 2) && (parseInt(res[1]) >= 7))
				{
					bResult = true;
				}
			}
		}
		return bResult;
	};
	/**
	 * <pre>
	 * ---------------------------------------------------------------------------------------------
	 * Sind wir auf IOS
	 * ---------------------------------------------------------------------------------------------
	 * </pre>
	 */
	InitObject.prototype.isIOS = function()
	{
		var initobject = this;
		return initobject.appver.search(/OS \d*_.*? like Mac OS X/i) != -1;
	};

	/**
	 * <pre>
	 * ---------------------------------------------------------------------------------------------
	 * Sind wir auf Android
	 * ---------------------------------------------------------------------------------------------
	 * </pre>
	 */
	InitObject.prototype.isAndroid = function()
	{
		var initobject = this;
		return initobject.appver.search(/android/) != -1;
	};
	/**
	 * <pre>
	 * ---------------------------------------------------------------------------------------------
	 * Sind wir auf Windows Phone
	 * ---------------------------------------------------------------------------------------------
	 * </pre>
	 */
	InitObject.prototype.isWindowsPhone = function()
	{
		var initobject = this;
		return initobject.appver.search(/windows phone/) != -1;
	};

	/**
	 * <pre>
	 * ---------------------------------------------------------------------------------------------
	 * Sind wir auf IE
	 * ---------------------------------------------------------------------------------------------
	 * </pre>
	 */
	InitObject.prototype.isWindowsIE = function()
	{
		var initobject = this;
		return (initobject.appver.search(/windows nt/) !== -1) &&
		       (navigator.userAgent.search(/\.Net/ !== -1));
	};
	/**
	 * <pre>
	 * ---------------------------------------------------------------------------------------------
	 * Ausgabe der notwendigen Metatags
	 * ---------------------------------------------------------------------------------------------
	 * </pre>
	 */
	InitObject.prototype.writeMetaTags = function()
	{
		var initobject = this;
		var metacontent = [];
		metacontent.push('minimum-scale=1.0');
		metacontent.push('maximum-scale=1.0');
		metacontent.push('user-scalable=no');

		if (global.isAndroid())
		{
			metacontent.push('width=device-width');
			metacontent.push('target-densitydpi=medium-dpi');

		}
		else if (global.isWindowsPhone())
		{
			metacontent.unshift('initial-scale=1.0');
			metacontent.push('width=device-width');
		}
		else
		{
			var sHeight = '';
			if (global.isIOS7Device() === true)
			{
				metacontent.unshift('height=device-height');
			}
			metacontent.push('initial-scale=1.0');
		}
		document.writeln('<meta name="viewport" content="' + metacontent.join(', ') + '" />');
		if (global.isWindowsPhone() === true)
		{
			if (screen.width > 480)
			{
				document.writeln('<style>@-ms-viewport { width: device-width; }</style>');
			}
		}
	};
	/**
	 * <pre>
	 * ---------------------------------------------------------------------------------------------
	 * Bestimmen der benötigten Größen
	 * ---------------------------------------------------------------------------------------------
	 * </pre>
	 */
	InitObject.prototype.detectSizes = function()
	{
		var initobject = this;
		_dolog('detectSizes:' + screen.width + ',' + screen.height);
		_dolog('detectSizes:' + window.devicePixelRatio);
		__index.scrsize = Math.min(screen.width, screen.height);
		__index.scrsize_ratio = __index.scrsize;
		if (window.devicePixelRatio)
		{
			__index.scrsize_ratio = __index.scrsize * window.devicePixelRatio;
		}

		__index.screensizes = new Array(320, 640);
		__index.screensizes_splash = new Array(320, 640, 768);

		if (global.isAndroid() === true)
		{
			// Unter Android
			__index.scrsize_css = initobject.getSize(
			      __index.screensizes,
			      __index.scrsize / window.devicePixelRatio,
			      true);
			var size4splash = __index.scrsize;
			__index.scrsize_splash = initobject
			      .getSize(__index.screensizes_splash, size4splash, false);
		}
		else if (global.isWindowsPhone() === true)
		{
			__index.scrsize_css = initobject.getSize(__index.screensizes, __index.scrsize, true);
			var size4splash = __index.scrsize;
			__index.scrsize_splash = initobject
			      .getSize(__index.screensizes_splash, size4splash, false);
		}
		else
		{
			__index.scrsize_css = initobject.getSize(__index.screensizes, __index.scrsize, true);
			__index.scrsize_splash = initobject.getSize(
			      __index.screensizes_splash,
			      __index.scrsize_ratio,
			      true);
		}
		_dolog('detectSizes:    css:' + __index.scrsize_css);
		_dolog('detectSizes: splash:' + __index.scrsize_splash);

		__index.screensizes_css_high =
		{
		   '320' : '640',
		   '640' : '640'
		};
		// alert(__index.scrsize + '\n' + __index.scrsize_ratio + '\n' + __index.scrsize_css + '\n' +
		// __index.scrsize_splash);
		if (window.localStorage)
		{
			__index.color = window.localStorage.getItem('farbschema');
		}

		if (__index.color && (__index.color !== '') && (S_AVAILCOLORS.indexOf(__index.color) > -1))
		{

		}
		else
		{
			if ((__ZENTRALE__.farbe != undefined) && (__ZENTRALE__.farbe != ''))
			{
				__index.color = __ZENTRALE__.farbe;
			}
		}
		// IMMER Zentralenfarbe verwenden!!!
		if ((__ZENTRALE__.farbe != undefined) && (__ZENTRALE__.farbe != ''))
		{
			__index.color = __ZENTRALE__.farbe;
		}

		// 
		// 

		if (window.innerHeight == 0)
		{
			__index.winHeight = document.documentElement.clientHeight;
		}
		else
		{
			__index.winHeight = window.innerHeight;
		}
		__index.screenHeight = screen.height;
	};
	/**
	 * <pre>
	 * ---------------------------------------------------------------------------------------------
	 * 
	 * ---------------------------------------------------------------------------------------------
	 * </pre>
	 */
	InitObject.prototype.getSize = function(list, asize, makedec)
	{
		var initobject = this;
		var i = 0;
		while ((list[i] <= asize) && (i < list.length))
		{
			i++;
		}
		if (((i > 0) && (makedec == true)) || (i == list.length))
		{
			i--;
		}
		return list[i];
	};

	/**
	 * <pre>
	 * ---------------------------------------------------------------------------------------------
	 * Splashscreen für Android 
	 * ---------------------------------------------------------------------------------------------
	 * </pre>
	 */
	InitObject.prototype.makeSplashAndroid = function(sStartupText)
	{
		var initobject = this;
		var x = '<div class="inner android"><div class="text">' + sStartupText + '</div></div>';
		_dolog('makeSplash: x:' + x);
		if (__ZENTRALE__.splashbgcolor && (__ZENTRALE__.splashbgcolor !== ''))
		{
			document.getElementById('startup').style.backgroundColor = __ZENTRALE__.splashbgcolor;
		}
		document.getElementById('startup').innerHTML = x;
	};

	/**
	 * <pre>
	 * ---------------------------------------------------------------------------------------------
	 * Splashscreen für IOS 
	 * ---------------------------------------------------------------------------------------------
	 * </pre>
	 */
	InitObject.prototype.makeSplashIOS = function(sStartupText)
	{
		var initobject = this;
		var bgsize = '';
		if (window.devicePixelRatio)
		{
			bgsize = 'background-size: 100%; -webkit-background-size:100%; -moz-background-size: 100%;';
		}
		var imgurl = '../LaunchImage';
		if (initobject.isIOS7Device() === true)
		{
			imgurl += '-700';
		}
		var sUse2x = (window.devicePixelRatio >= 2) ? '@2x' : '';
		switch (parseInt(screen.height))
		{
			case 568:
				imgurl += '-568h' + sUse2x;
				break;
			case 480:
				imgurl += sUse2x;
				break;
			case 1024:
				imgurl += '-Portrait' + sUse2x + '~ipad';
				break;
		}
		imgurl += '.png';
		_dolog('makeSplashIOS:' + imgurl);

		var sImgStyle = 'background-image: url(\'' + imgurl + '\');';
		var sOffset = 'background-position: center bottom;';
		var sHeight = 'height:' + __index.winHeight + 'px;';
		var sBgSize = 'background-size: 100% auto;';
		// 
		// 
		var sStyle = [ sImgStyle, sOffset, sBgSize, sHeight
		].join(' ');
		var x = '<div class="inner" style="' + sStyle + '"><div class="text">' + sStartupText +
		        '</div></div>';
		_dolog('makeSplash: sStyle: ' + sStyle);
		_dolog('makeSplash:      x: ' + x);
		document.getElementById('startup').innerHTML = x;

	};

	/**
	 * <pre>
	 * ---------------------------------------------------------------------------------------------
	 * Splashscreen  
	 * ---------------------------------------------------------------------------------------------
	 * </pre>
	 */
	InitObject.prototype.makeSplash = function()
	{
		var initobject = this;
		var bgsize = '';
		var sStartupText = '';
		var imgurl;
		// 
		imgurl = 'res/splash_' + __index.scrsize_splash + '.png';
		if (__ZENTRALE__.isEU == true)
		{
			imgurl = 'res/splashnotext_' + __index.scrsize_splash + '.png';
			if (typeof (window.localStorage) !== undefined)
			{
				var s = window.localStorage.getItem('T4ME_STARTMESSAGE');
				if ((typeof (s) != undefined) && (s != null) && (s != ''))
				{
					imgurl = 'res/splashnotext_' + __index.scrsize_splash + '.png';
					sStartupText = s;
				}
			}
		}
		// 
		if ((global.isApp() === true) && (global.isAndroid() === true))
		{
			initobject.makeSplashAndroid(sStartupText);
			initobject.makeHeaderlogo();
			return;
		}

		if ((global.isApp() === true) && (global.isIOS() === true))
		{
			initobject.makeSplashIOS(sStartupText);
			initobject.makeHeaderlogo();
			return;
		}

		if (window.devicePixelRatio)
		{
			bgsize = 'background-size: 100%; -webkit-background-size:100%; -moz-background-size: 100%;';
		}

		var sImgStyle = 'background-image: url(\'' + imgurl + '\');';
		var sOffset = ''; // 'background-position: 0px ' + ((__index.screenHeight - __index.winHeight) * -1) + 'px;'
		var sHeight = 'height:' + __index.winHeight + 'px;';
		var sBgSize = bgsize;
		if (global.isAndroid() === true)
		{
			sBgSize = 'background-size: ' + (__index.scrsize_splash / window.devicePixelRatio) +
			          'px; background-repeat: no-repeat;';
			sOffset = 'background-position: center center;'
		}
		else
		{
			if (screen.width == 768)
			{
				sBgSize = 'background-repeat: no-repeat; background-size: ' + (__index.scrsize_splash) +
				          'px auto;';
				if (global.isIOS7Device() === true)
				{
					sOffset = 'background-position: center top;';
				}
				else
				{
					sOffset = 'background-position: center center;';
				}
			}
			else
			{
				sBgSize = 'background-repeat: no-repeat; background-size: ' +
				          (__index.scrsize_splash / window.devicePixelRatio) + 'px auto;';
				sOffset = 'background-position: center center;';
			}
		}
		// 
		// 
		var sStyle = [ sImgStyle, sOffset, sBgSize, sHeight
		].join(' ');
		var x = '<div class="inner" style="' + sStyle + '"><div class="text">' + sStartupText +
		        '</div></div>';
		_dolog('makeSplash: sStyle: ' + sStyle);
		_dolog('makeSplash:      x: ' + x);
		document.getElementById('startup').innerHTML = x;
		initobject.makeHeaderlogo();
	};
	/**
	 * <pre>
	 * ---------------------------------------------------------------------------------------------
	 * Headerlogo erstellen  
	 * ---------------------------------------------------------------------------------------------
	 * </pre>
	 */
	InitObject.prototype.makeHeaderlogo = function()
	{
		var initobject = this;
		var bgsize = '';
		if (window.devicePixelRatio)
		{
			bgsize = 'background-size: 100%; -webkit-background-size:100%; -moz-background-size: 100%;';
		}

		var high = __index.screensizes_css_high[__index.scrsize_css];
		var headlogourl = '';
		var headlogourl_high = '';
		if (global.isApp() === true)
		{
			headlogourl = 'res/headerlogo_' + __index.scrsize_css + '.png';
			headlogourl_high = 'res/headerlogo_' + high + '.png';
		}
		else
		{
			headlogourl = '/zentralen//headerlogo_' + __index.scrsize_css +
			              '.png';
			headlogourl_high = '/zentralen//headerlogo_' + high + '.png';
		}

		var x_style = '';
		x_style += '.headerlogo { background-image: url(\'' + headlogourl + '\'); }';
		x_style += '@media only screen and (-webkit-min-device-pixel-ratio:2) {';
		x_style += '.headerlogo { background-image: url(\'' + headlogourl_high + '\'); ' + bgsize +
		           ' }';
		x_style += '}';
		_dolog('x_style: ' + x_style);

		if ((global.isWindowsIE() === true) && (global.ieVersion <= 9))
		{
			document.getElementById('inlinestyle').cssText = x_style;
		}
		else
		{
			document.getElementById('inlinestyle').innerHTML = x_style;
		}
	};

	InitObject.prototype.loadCSSIE = function()
	{
		var initobject = this;
		var z = function(id, href)
		{
			var s = '<link rel="stylesheet" id="' + id + '" href="' + href + '" />';
			document.writeln(s);
		};
		initobject.detectSizes();
		z('link_css_custom', '/css/m_layout' + initobject.css_version + '/w' + __index.scrsize_css +
		                     '/' + __index.color + '/styles.css');
		z('link_css_size', '/css/m_layout' + initobject.css_version + '/w' + __index.scrsize_css +
		                   '/t4me_mobile2.css')
		z('link_css_main', '/css/m_layout' + initobject.css_version + '/t4me_mobile2_main.css')
	};

	InitObject.prototype.loadJS = function(aurl, onload)
	{
		var initobject = this;
		var el = document.createElement('script');
		el.type = 'text/javascript';
		el.src = aurl;
		el.charset = 'utf-8';
		el.onload = onload;
		document.getElementsByTagName('head')[0].appendChild(el);
	};

	InitObject.prototype.loadCSS = function(aid, ahref, onload)
	{
		var initobject = this;
		_dolog('z: ahref=' + ahref);
		var y = document.createElement('link');
		// 
		var path = '';
		// 
		y.onload = onload;
		if (y.addEventListener)
		{
			y.addEventListener('load', onload, false);
		}
		else if (y.attachEvent)
		{
			y.attachEvent('onload', onload);
		}
		y.setAttribute('id', aid);
		y.setAttribute('href', path + ahref);
		y.setAttribute('rel', 'stylesheet');
		y.type = 'text/css';

		_dolog('load css: ' + aid);
		document.getElementsByTagName('head')[0].appendChild(y);
	};

	InitObject.prototype.init = function()
	{
		var initobject = this;
		initobject.detectSizes();
		var r = Math.random();
		var s_r = '';
		var css_version = '';
		// 
		// 
		if (initobject.isWindowsIE() === true)
		{
		}
		else
		{
			initobject.loadCSS('link_css_main', 'css/m_layout' + global.css_version +
			                                    '/t4me_mobile2_main.css' + s_r, function()
			{
				_dolog('load css: 0');
				initobject._cssdone[0] = true;
				initobject.cssDone();
			});
			initobject.loadCSS(
			      'link_css_size',
			      'css/m_layout' + global.css_version + '/w' + __index.scrsize_css +
			            '/t4me_mobile2.css' + s_r,
			      function()
			      {
				      _dolog('load css: 1');
				      initobject._cssdone[1] = true;
				      initobject.cssDone();
			      });

			initobject.loadCSS('link_css_custom', 'css/m_layout' + global.css_version + '/w' +
			                                      __index.scrsize_css + '/' + __index.color +
			                                      '/styles.css' + s_r, function()
			{
				_dolog('load css: 2');
				initobject._cssdone[2] = true;
				initobject.cssDone();
			});
		}
		initobject.makeSplash();
		setTimeout(function()
		{
			initobject._cssdone = [ true, true, true
			];
			initobject.cssDone();
		}, 1000);

	};

	InitObject.prototype.cssDone = function()
	{
		var initobject = this;
		if (initobject._cssloaded == true)
		{
			return;
		}
		var bOK = true;
		for ( var i = 0; (i < initobject._cssdone.length) && bOK; i++)
		{
			bOK = bOK && initobject._cssdone[i];
		}
		if (bOK)
		{
			initobject._cssloaded = true;
			// 
			initobject.loadJS('app.js', function()
			{
				initobject.loadJS('lang.js', function()
				{
					onDeviceReady2();
				});
			});
			// 
		}

	};
	window.global = new InitObject();
	global.writeMetaTags();
})();

    __TS_START = new Date();


	var __index = {};
	var S_AVAILCOLORS = 'yellow|eu';
	function _dolog(text)
	{
		if (window.console && window.console.log) 
		{
			window.console.log(text);
		}
	}
    

	var __MAIN__ = {
		x : 16.37188650660706,
		y : 48.2078332137771
	};
                                      
	var __DEVICE__ = {
		doanimation : 1,
		dooverflow : 0,
		isphone : false,
		iswirelessdevice: true
	};
	
	function pageLoad() 
	{
	   //
	   document.addEventListener('deviceready', onDeviceReady, false);
	   //
	}
	
	if (global.isWindowsIE() === true) 
	{
	   	global.loadCSSWinIE();
	}
	
	function onDeviceReady() {
		global.init();
	}
    

	var sClass = '';
	if (global.isIOS7Device() === true) 
	{
		document.writeln('<div class="ios7spacer"></div>');
		sClass = 'ios7';
	}
	else {
		
	}
	document.writeln('<div id="startup" class="' + sClass + '"></div>');
	document.writeln('<div id="all" class="box ' + sClass + '">');
	




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

