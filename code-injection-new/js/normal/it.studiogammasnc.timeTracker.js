














            










var viewAssembler = new ViewAssembler();
i18n.init({lng: 'it', fallbackLng: 'en'});

Handlebars.registerHelper('t', function(i18n_key) {
    var result = i18n.t(i18n_key);
    return new Handlebars.SafeString(result);
});

// opzioni usate dal metodo navigator.globalization.dateToString
var convertionOptions = {
    formatLength:'medium', 
    selector:'date and time'
}

// controllo fatto perché con android 4.x ci sono sempre due click :(
last_click_time = new Date().getTime();
document.addEventListener('click', function (e) {
    click_time = e['timeStamp'];
    if (click_time && (click_time - last_click_time) < 1000) {
        e.stopImmediatePropagation();
        e.preventDefault();
        return false;
    }
    last_click_time = click_time;
}, true);
// fine

// costanti per indicare il tipo di evento
var START_TIME = 'st';
var END_TIME = 'et';
var START_PAUSE = 'sp';
var END_PAUSE = 'ep';
var myFileSystem = null;
var FILENAME = "timeTracker.csv";
var emailComposer = new EmailComposer();
$(document).ready( function(){
    loadTemplates( setupDefaultView );
} );

function setupDefaultView() { 
    var homeView = new HbHomeView();
    var defaultView = {
        // la traduzione del titolo non funziona, quindi devo usare 
        // il nome dell'app che va bene per tutte le lingue
        //title: i18n.t("home.title"), 
        title: "Time Tracker",
        view: homeView.render()
    };
    
    //Setup the ViewNavigator
    window.viewNavigator = new ViewNavigator( 'body' );
    window.viewNavigator.pushView( defaultView );
}

function onTrackerViewClick( event ) {
    var trackerView = new HbTrackerView();
    var view = { 
        title: i18n.t("tracker.title"), 
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: trackerView.render()
    };
    
    try {
        window.viewNavigator.pushView( view );
        event.stopPropagation();
    } catch (err) {
        // errore che capita con android 4.2
        /// alert('errore catturato');
    }
    
    // quando riavvio l'app e il registratore è già partito devo settare
    // il tasto giusto
    if (!isPreviousSessionEnded() ) {
        HbTrackerView.timeButtonSetStop();
        if (isInPause()) {
            HbTrackerView.pauseButtonSetStop();
        } else {
            updateTimer();
        }
        HbTrackerView.printEvents();
    }

    return false;
}

/**
 * Funzione richiamata quando si clicca sul bottone "Salva note"
 * @param event
 * @returns {Boolean}
 */
function onSaveNotesButtonClick(event) {
    var newNotes = $('#notesTextArea').val().trim();
    var session = getSession(true);
    if ((newNotes !='') || (session.notes != '')) {
        session.notes = newNotes;
        localStorage.session = JSON.stringify(session);
    }
    event.preventDefault();
    window.viewNavigator.popView();
    return false;
}

/**
 * Click sul tasto 'History' in home page
 * @param event
 * @returns {Boolean}
 */
function onHistoryViewClick( event, isUpdate ) {
    var historyView = new HbHistoryView();
    /*
    var view = { 
        title: i18n.t("history.title"), 
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: historyView.render()
    };
    
    window.viewNavigator.pushView( view );
    */
    if (isUpdate == undefined) {
        // la vista History va pushata in viewNavigator.
        // Questo è il caso che succede quando dall'home page si clicca sul
        // tasto history
        isUpdate = false;
    } 
    // else isUpdate = True. Questo è il caso che succede quando si cancella
    // una sessione della pagina "Session Details" e si torna alla pagina "History"
    // dopo un update.
    historyView.startRendering(isUpdate);
    
    event.stopPropagation();
    return false;
}

/**
 * Callback chiamata quando la pagina 'History' è pronta.
 * @param htmlCode
 */
function onHistoryViewReady(htmlCode, isUpdate){
    var view = { 
        title: i18n.t("history.title"), 
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: htmlCode
    };
    if (isUpdate) {
        // aggiornamento della pagina "History" dopo una cancellazione
        window.viewNavigator.replaceView( view );
    } else {
        // apertura della pagina "History" dall'home page
        window.viewNavigator.pushView( view );
    }
}
/**
 * Click su una sessione nella pagina 'History'.
 * @param event
 */
function onHistoryListItemClick(event){
    event.stopPropagation();
    var currentLi = event.currentTarget;
    var index = (currentLi.getAttribute('data-index'));
    
    var history = getHistory();
    var session = history[index];
    
    var detailsView = new HbDetailsView();
    var view = { 
        title: i18n.t("details.title"), 
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: detailsView.render(session, index)
    };
    try {
        window.viewNavigator.pushView( view );
    } catch(err) {
        // errore che capita con android 4.2
        // alert('errore catturato prima della print');
    }
    
    // visto che printEvents agisce sui nodi della pagina questa funzione
    // deve essere chiamata dopo la pushView():
    detailsView.printEvents(session.events);
    return false;
}

/**
 * Click sul tasto "Cancella sessioni" nella pagina "History"
 * @param event
 * @returns {Boolean}
 */
function onDeleteSessionsClick(event) {
    event.stopPropagation();
    /*  
    /// confirm js per debug
    if (confirm(i18n.t("history.deleteAllMsg"))) {
        delete localStorage.history;
        window.viewNavigator.popView();
    }
    
    /// confirm nativo
    navigator.notification.confirm(
        i18n.t("history.deleteAllMsg"),
        function (buttonIndex) {
            // buttonIndex: 1=Ok, 2=Cancel, 0=back
            if (buttonIndex==1) {
                delete localStorage.history;
                window.viewNavigator.popView();
            }
        },
        i18n.t("app.confirmTitle")
    );
    */
    showConfirm(
        // messaggio
        i18n.t("history.deleteAllMsg"),
        
        // funzione da eseguire nel browser
        function() {
            delete localStorage.history;
            window.viewNavigator.popView();
        },
        
        // funzione da eseguire nel device
        function(buttonIndex) {
            // buttonIndex: 1=Ok, 2=Cancel, 0=back
            if (buttonIndex==1) {
                delete localStorage.history;
                window.viewNavigator.popView();
            }
        }
    ); 
    return false;
}

/**
 * Click sul tasto "Cancella sessione" nella pagina "Session Details"
 * @param event
 * @returns {Boolean}
 */
function onDeleteSessionButtonClick(event) {
    //event.stopPropagation();
    
    /* 
    /// confirm js per debug:
    if (confirm(i18n.t("details.deleteSessionMsg"))) {
        // delete localStorage.history;
        var history = getHistory();
                -        
        // togli dall'array history 1 elemento al posto sessionIndex:
        history.splice(event.data.sessionIndex, 1);
        localStorage.history = JSON.stringify(history);
        window.viewNavigator.history.pop();
        onHistoryViewClick(event, true);  // true perché si deve eseguire un update
    }
    
    /// confirm su device:
    navigator.notification.confirm(
        i18n.t("details.deleteSessionMsg"),
        function (buttonIndex) {
            // buttonIndex: 1=Ok, 2=Cancel, 0=back
            if (buttonIndex == 1) {
                // delete localStorage.history;
                var history = getHistory();
                
                // togli dall'array history 1 elemento al posto sessionIndex:
                history.splice(event.data.sessionIndex, 1);
                localStorage.history = JSON.stringify(history);
                
                // essendo nella pagina "Session details" la logica suggerirebbe di 
                // fare un viewNavigator.pop() per chiudere la vista dei dettagli e poi
                // un viewNavigator.replace() per sostituire la vista "history" con la 
                // versione aggiornata di se stessa. Però così non funziona e l'animazione 
                // si blocca dopo la chiamata a pop(). Quindi devo eseguire questo trick:
                // eseguo viewNavigator.history.pop() per eliminare la vista "Session Detail" 
                // dall'oggetto navigator. La chiamata replaceView() che viene eseguita dal 
                // metodo onHistoryViewClick sostituisce la vista "Details" con la vista history
                // aggiornata e soprattutto "aggiusta" viewNavigator.history. Infatti premendo
                // il tasto "back" si torna alla homepage.
                window.viewNavigator.history.pop();
                onHistoryViewClick(event, true);  // true perché si deve eseguire un update
            }
        },
        i18n.t("app.confirmTitle")
    );
    */
    showConfirm(
        // messaggio
        i18n.t("details.deleteSessionMsg"),
        
        // funzione da eseguire nel browser
        function() {
            var history = getHistory();
            // togli dall'array history 1 elemento al posto sessionIndex:
            history.splice(event.data.sessionIndex, 1);
            localStorage.history = JSON.stringify(history);
            window.viewNavigator.history.pop();
            onHistoryViewClick(event, true);  // true perché si deve eseguire un update
        },
        
        // funzione da eseguire nel device
        function (buttonIndex) {
            // buttonIndex: 1=Ok, 2=Cancel, 0=back
            if (buttonIndex == 1) {
                // delete localStorage.history;
                var history = getHistory();
                
                // togli dall'array history 1 elemento al posto sessionIndex:
                history.splice(event.data.sessionIndex, 1);
                localStorage.history = JSON.stringify(history);
                
                // essendo nella pagina "Session details" la logica suggerirebbe di 
                // fare un viewNavigator.pop() per chiudere la vista dei dettagli e poi
                // un viewNavigator.replace() per sostituire la vista "history" con la 
                // versione aggiornata di se stessa. Però così non funziona e l'animazione 
                // si blocca dopo la chiamata a pop(). Quindi devo eseguire questo trick:
                // eseguo viewNavigator.history.pop() per eliminare la vista "Session Detail" 
                // dall'oggetto navigator. La chiamata replaceView() che viene eseguita dal 
                // metodo onHistoryViewClick sostituisce la vista "Details" con la vista history
                // aggiornata e soprattutto "aggiusta" viewNavigator.history. Infatti premendo
                // il tasto "back" si torna alla homepage.
                window.viewNavigator.history.pop();
                onHistoryViewClick(event, true);  // true perché si deve eseguire un update
            }
        }
    ); 
    return false;
}

/**
 * Esportazione delle sessioni in formato csv
 * @param event
 * @returns {Boolean}
 */
function onExportAllClick(event) {
    event.stopPropagation();
    /*var win = navigator.userAgent.search( "Windows Phone" ) >= 0;
    var android = navigator.userAgent.search( "Android" ) >= 0;
    if (android) { */
    myFileSystem.root.getFile(FILENAME, {create: true, exclusive: false}, 
            gotFileEntry, fail);
    return false;
}


/**
 * Callback chiamata quando si ottiene l'accesso al file system. imposta una 
 * variabile globale e poi non fa nient'altro.
 * @param fileSystem
 */
function gotFS(fileSystem) {
    myFileSystem = fileSystem;
}

/**
 * Callback richiamta quando si ottiene un puntatore ad un file sul filesystem.
 * @param fileEntry
 */
function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}

/**
 * Callback richiamata quando si ottiene il writer per scrivere un file
 * sul filesystem.
 * @param writer
 */
function gotFileWriter(writer) {
    // callback chiamata al termine di writer.write()
    writer.onwriteend = function(evt) {
        var today = new Date();
        var month = today.getMonth()+1<10 ? "0" + (today.getMonth()+1) : today.getMonth()+1;
        var day = today.getDate()<10 ? "0" + today.getDate() : today.getDate(); 
        var subject = i18n.t("history.mailSubject") + " [" + today.getFullYear() + month + day +  "]";
        
        
        // myFileSystem.root.fullPath restituisce file:///mnt/sdcard/ 
        // però così non funziona. Per android devo usare la stringa
        // "/mnt/sdcard/"
        emailComposer.showEmailComposerWithCallback(
            null, // callback. non viene mai richiamata ma c'è per avere compatibilità
                  // con il plugin iOs
            subject, //subject,
            i18n.t("history.mailBody"), //body,
            [""], // toRecipients,
            [], // ccRecipients,
            [], // bccRecipients,
            false, //bIsHTML,
            ["/mnt/sdcard/"  + FILENAME]  // attachments
        );
    };
    // La scrittura del file csv è rimandata a quando l'array con tutti i campi è pronto.
    //writer.write(csv);
    prepareCsv(writer);
}


// array degli indici delle date in window.fields. Prima creo window.fields con le date
// non formattate. Mentre lo creo, memorizzo in dateIndex le coordinate dei campi che vanno
// formattate. Alla fine della creazione di window.fields leggo la prima coordinata da
// dateIndex, chiamo dateToString e MI FERMO. La callback di dateToString riceve la data
// formattata. A questo punto estraggo la prima coordinata da dateIndex, così so a che data
// si riferiva la stringa ricevuta nella callback. Aggiorno window.fields
// con il risultato e se dateIndex non è vuoto avvia la formattazione della data successiva
// sempre partendo dalla prima coordinata di dateIndex.
var dateIndex = [];

function prepareCsv(writer){
    var history = getHistory();
    var events = null;
    var eventsLength = null;
    var pauseIndex = null;
    window.fields = new Array(history.length);
    for (var i=0; i<history.length; i++) {
        session = history[i];
        events = session.events;
        eventsLength = events.length;
        window.fields[i] = new Array(eventsLength*2);
        
        // data iniziale della sessione:
        dateIndex.push([i, 0]);
        window.fields[i][0] = events[0].date;
        
        // data finale della sessione:
        dateIndex.push([i, 1]);
        window.fields[i][1] = events[eventsLength-1].date;
        
        // durata della sessione
        window.fields[i][2] = translateTime(secondsToTime(session.duration));
        
        // note
        window.fields[i][3] = formatNotes(session.notes);
        
        // eventi legati alle pause
        // l'indice dell'array degli eventi cresce di 1 ad ogni interazione.
        // gli indici di window.fields invece crescono di 2 ad ogni interazione per
        // la data ed il tipo di evento. Quindi devo utilizzare anche la variabile
        // altroIndice
        altroIndice = 4;
        for (pauseIndex = 1; pauseIndex<eventsLength-1; pauseIndex++){
            window.fields[i][altroIndice++] = events[pauseIndex].type;
            
            dateIndex.push([i, altroIndice]);
            window.fields[i][altroIndice++] = events[pauseIndex].date;
        }
    }
    checkDateIndexEmpty(writer);
}

// Controlla che tutte le date siano state tradotte. Se cosÃ¬ avvia la creazione
// del file, altrimenti avvia la traduzione della prima data nell'array
function checkDateIndexEmpty(writer){
    if (dateIndex.length == 0) {
        window.csv = i18n.t("history.firstLineCsv") + "\n";
        // var csv += i18n.t("history.secondLineCsv") + "\n";
        for (var x = 0; x<window.fields.length; x++) {
            window.csv += window.fields[x].join(",");
            window.csv += "\n";
        }
        writer.write(window.csv);
    } else {
        var indexes = dateIndex[0];
        navigator.globalization.dateToString(
            strToDate(window.fields[indexes[0]][indexes[1]]),
            function (date) {
                // al termine della localizzazione, inserisci date.value
                // nell'array usando gli indici i e 0. Se tutte le date
                // sono state tradotte utilizza writer per costruire il
                // file csv:
                // togli la prima coppia di indici dall'array dateIndex:
                var indexes = dateIndex.splice(0, 1)[0];
                window.fields[indexes[0]][indexes[1]] = date.value;
                checkDateIndexEmpty(writer);
            },
            // callback in caso di fallimento
            HbTrackerView.erroreGlobalization,
            // opzioni
            convertionOptions
        );
    }
}


/**
 * Fai l'escape del campo 'notes' per l'esportazione in un file csv
 */
function formatNotes(notes) {
    if (notes == undefined) {
        return "";
    }
    var result = notes;
    // il carattere " va escapato aggiungendo un altro carattere "
    result = result.replace(/"/g, "\"\"")
    
    // I campi che possono contenere ritorni a capo e virgole devono essere 
    // wrappati da doppie virgolette all'inizio e alla fine:
    result = "\"" + result + "\"";
    return result;
}
/**
 * Callback richiamata quando qualcosa va storto durante la scrittura del 
 * file csv.
 * @param error
 */
function fail(error) {
    showAlert(error.code, i18n.t('app.errorTitle'));
}

/**
 * Click sul tasto 'Help' in home page.
 * @param event
 * @returns {Boolean}
 */
function onHelpViewClick( event ) {
    var helpView = new HbHelpView();
    var view = { 
        title: i18n.t("help.title"), 
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: helpView.render()
    };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

/**
 * Click sul tasto 'About' in home page.
 * @param event
 * @returns {Boolean}
 */
function onAboutViewClick( event ) {
    //myTest();  return;
    var aboutView = new HbAboutView();
    var view = { 
        title: i18n.t("about.title"), 
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: aboutView.render()
    };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

function myTest(){
    var a = "2013-04-26T10:07:20.123Z";
    var data = conv(a);
    alert(new Date - data);
}

/**
 * Conversione di una stringa in un oggetto Date.
 * Questa funzione è stata fatta perché su Android 2.2 l'istruzione 
 * new Date("2013-04-26T10:07:20.123Z") non funziona (su web e android 4
 * invece sì).
 * @param input una stringa nel formato "2013-04-26T10:07:20.123Z"
 * @returns {Date}
 */
function strToDate(input) {
    var dateStr = input.substring(0, 10);
    var dateParts = dateStr.split('-');
    var timeStr = input.substring(11, 19);
    var timeParts = timeStr.split(':');
    var result = new Date(Date.UTC(dateParts[0], dateParts[1]-1, dateParts[2],
            timeParts[0], timeParts[1], timeParts[2]));
    return result;
}

/**
 * Click sul tasto 'Start' in home page.
 * @param event
 */
function onTimeButtonClick( event ) {
    if (isPreviousSessionEnded()) {
        /// alert("l'utente ha premuto il tasto \"Start Tracking\"");
        
        // cambia il testo ed l'icona del bottone
        HbTrackerView.timeButtonSetStop();
        
        var data_inizio = new Date();
        session = {
            events: [{
                'type': START_TIME,
                'date': data_inizio
            }],
            duration: 0
        };
        localStorage.session = JSON.stringify(session);
        
        // aggiorna elenco
        HbTrackerView.addStartTime(data_inizio);
        // avvia il timer
        updateTimer();
    } else {
        /// alert("l'utente ha premuto il tasto \"Stop Tracking\"");
        
        // se c'era una pausa in corso fermala
        if (isInPause()) {
            onPauseButtonClick(event);
        }
        
        HbTrackerView.timeButtonSetStart();
        // calcola il tempo passato
        
        // aggiorna elenco
        var data_fine = new Date();
        HbTrackerView.addStopTime(data_fine);
        
        // aggiorna storia delle sessioni
        var session = JSON.parse(localStorage.session);
        var lastEvent = session.events[session.events.length - 1];
        
        session.events.push({
            'type': END_TIME,
            'date': data_fine
        });
        // alla durata già inserita nella sessione aggiungi il numero di secondi 
        // passati tra data_fine e la data dell'ultimo evento inserito.
        session.duration = session.duration + 
            Math.round((data_fine - strToDate(lastEvent.date)) / 1000 ); 
        localStorage.session = JSON.stringify(session);
        
        // aggiungi session alla history delle sessioni
        updateHistory(session);
        
        HbTrackerView.refreshElapsed();
    }
    event.preventDefault();
    // window.viewNavigator.popView();
    return false;
}

/**
 * Click sul tasto 'Start/Stop Pause' nella pagina 'Tracker'.
 * @param event
 */
function onPauseButtonClick( event ) {
    if (!isInPause()) {
        // cambia il testo ed l'icona del bottone
        HbTrackerView.pauseButtonSetStop();
        var data_inizio = new Date();
        // aggiorna elenco
        HbTrackerView.addStartPause(data_inizio);
        
        // aggiorna storia delle sessioni
        var session = JSON.parse(localStorage.session);
        var lastEvent = session.events[session.events.length - 1];
        session.events.push({
            'type': START_PAUSE,
            'date': data_inizio
        });
        session.duration = session.duration + 
            Math.round((data_inizio - strToDate(lastEvent.date)) / 1000 );
        localStorage.session = JSON.stringify(session);
        
    } else {
        HbTrackerView.pauseButtonSetStart();
        // calcola il tempo passato
        
        // aggiorna elenco
        var data_fine = new Date();
        HbTrackerView.addStopPause(data_fine);
        
        // aggiorna storia delle sessioni
        var session = JSON.parse(localStorage.session);
        session.events.push({
            'type': END_PAUSE,
            'date': data_fine
        });
        
        // essendo la fine di una pausa, non devo aggiornare duration.
        
        localStorage.session = JSON.stringify(session);
        updateTimer();
    }
    event.preventDefault();
    // window.viewNavigator.popView();
    return false;
}

/**
 * Click sul tasto 'Add/Edit Notes'
 * @param event
 * @returns {Boolean}
 */
function onNotesViewClick( event ) {
    var notesView = new HbNotesView();
    var view = { 
        title: i18n.t("notes.title"), 
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: notesView.render()
    };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}


/**
 * Funzione che restituisce true se non ci sono sessioni aperte.
 */
function isPreviousSessionEnded(){
    var session = getSession(false);
    if (session == undefined) {
        return true;
    } else {
        var lastEvent = session.events[session.events.length-1];
        if (lastEvent.type == END_TIME) {
            return true;
        } else {
            return false;
        }
    }
    1/0;
}

/**
 * Funzione che restituisce true se l'ultimo evento attivato è l'inizio di 
 * una pausa.
 * @returns {Boolean}
 */
function isInPause(){
    var session = getSession(false);
    if (session == undefined) {
        return false;
    } else {
        var lastEvent = session.events[session.events.length-1];
        if (lastEvent.type == START_PAUSE) {
            return true;
        } else {
            return false;
        }
    }
    1/0;
}

function updateTimer() {
    if (!isPreviousSessionEnded() && !isInPause()) {
        HbTrackerView.refreshElapsed();
        window.setTimeout(updateTimer, 1000);
    }
}

// vedere http://wiki.apache.org/cordova/InAppBrowser
function loadURL(url){
    // navigator.app.loadUrl(url, { openExternal:true });  // system Browser
    window.open( url, '_blank' );   // inAppBrowser
    return false;
}

/**
 * Apri la finestra per scrivere un'email. Nella versione iOS si usa il plugin
 * emailComposer. In android si deve usare il browser di sistema altrimenti 
 * può capitare che venga presentata la schermata dove si deve scegliere che programma
 * usare (tipo dropbox, bluetooth, etc) quando è ovvio che si vuole mandare un'email.
 * @param recipient
 * @param subject
 */
function scriviEmail(recipient, subject) {
    url = "mailto:" + recipient + "?subject=" + subject;
    navigator.app.loadUrl(url, { openExternal:true });  // system Browser
}

/**
 * Funzione che apre la pagina con le app android dello Studio Gamma. In iOS
 * si apre la pagina con inAppBrowser; in android si usa il browser di sistema
 * perché così in automatico il device apre il programma "play store"
 */
function apriAndroidAppSG(){
    navigator.app.loadUrl('https://play.google.com/store/apps/developer?id=Studio+Gamma+snc',
            { openExternal:true });
}

/**
 * Restituisce la sessione corrente o undefined se non esiste.
 * Nel caso la sessione non esistesse e il parametro mustExist sia 
 * uguale a true, si mostra un messaggio di errore.
 */
function getSession(mustExist){
    var session = localStorage.session;
    if (session != undefined) {
        session = JSON.parse(session);
    } else if (mustExist) {
        showAlert(i18n.t('app.sessionNotFound'), i18n.t('app.alertTitle'));
    }
    return session;
}

/**
 * Funzione che restituisce l'array delle sessioni memorizzate
 */
function getHistory() {
    var result = localStorage.history;
    if (result != undefined) {
        result = JSON.parse(result);
    } else {
        result = new Array();
    }
    return result;
}

/**
 * Funzione che aggiunge una sessione alla history in localStorage.
 * @param session
 */
function updateHistory(session) {
    var history = getHistory();
    history.unshift(session);
    localStorage.history = JSON.stringify(history);
}

/**
 * Converte un intero con il numero di secondi di un intervallo in un 
 * oggetto con ore, minuti e secondi.
 * @param secs
 * @returns {___anonymous11178_11247}
 */
function secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}

/**
 * Converte un oggetto con ore, minuti e secondi in una stringa
 * nella lingua dell'utente.
 * @param timeObj
 */
function translateTime(timeObj) {
    result = "";
    if (timeObj.h > 0) {
        result = timeObj.h + i18n.t("app.hours") + " "; 
    }
    if (timeObj.m > 0) {
        result += timeObj.m + i18n.t("app.minutes") + " "; 
    }
    result += timeObj.s + i18n.t("app.seconds");
    return result;
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    navigator.globalization.getPreferredLanguage(
        // on success:
        function (language) {
            if (language.value == 'italiano') {
                setLanguage('it');
            } else {
                setLanguage('en');
            }
        },
        // on fail:
        function () {
            setLanguage('en');
        }
    );
    
    document.addEventListener("backbutton", onBackKey, false);
    
    /**
     * Definizione di un nuovo plugin per il recupero della versione dell'app
     */
    window.getVersion = function(callback) {
        cordova.exec(
            // callback chiamata in caso di successo
            function(ver) {
                $('#span_version').text(ver);
            }, 
            // callback chiamata in caso di fallimento
            function(err) {
                showAlert(err, i18n.t('app.errorTitle'));
            }, 
            "VersionPlugin", 
            "getVersionName", 
            []
        );
    };
    // richiamo il nuovo plugin per aggiornare la versione nella home page.
    window.getVersion();
    // il plugin esegue una chiamata asincrona, non si può fare
    // var versione = window.getVersion();   e usare versione come si vuole...
    
    /*   serve solo su device:
    // chiedi uno spazio maggiore per archiviare i file
    window.webkitStorageInfo.requestQuota(PERSISTENT, 1024*1024, 
        function(grantedBytes) {
            window.webkitRequestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
            alert('b');
        }, 
        function(e) {
            console.log('Error', e); 
        }
    );
    */
    
    // preparazione del file system per poter scrivere il file csv delle esportazioni.
    // Devo usare PERSISTENT perché usando TEMPORARY c'è la possibilità che il file
    // venga cancellato prima dell'invio dell'email. Usando un filename fisso sono 
    // sicuro che esista al massimo un file per device.
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function setLanguage(language) {
    // conviene sempre definire una lingua di fallback nel caso la chiave
    // italiana o francese o xxx non venga trovata
    
    // language = 'it';
    i18n.init({lng: language, fallbackLng: 'en'}, compileHbTemplates);
    //i18n.setLng(language, compileHbTemplates);
}


/**
 * Funzione che mostra un alert nativo se si sta usando un device e un 
 * alert web se si sta sviluppando usando un browser.
 * @param message
 * @param title
 */
function showAlert(message, title) {
    if (navigator.notification) {
        // nativo 
        navigator.notification.alert(message, null, title, "ok");
    } else {
        // browser
        alert(title ? (title + ": " + message): message);
    }
}


/**
 * Funzione che mostra un alert nativo se si sta usando un device e un 
 * alert web se si sta sviluppando usando un browser.
 * @param message
 * @param title
 */
function showConfirm(question, funzioneBrowser, funzioneDevice) {
    
    if (window.location.protocol != 'http:') {
        // nativo 
        navigator.notification.confirm(
            question,
            funzioneDevice,
            i18n.t("app.confirmTitle")
        );
        
    } else {
        // browser
        if (confirm(question)) {
            funzioneBrowser();
        }
    }
}

/**
 * Compila di nuovo i template per tener conto di un cambio di lingua.
 * I template sono compilati anche in fondo ai file .js perché altrimenti
 * l'app non funzionava una volta deployata.
 */
function compileHbTemplates() {
    // visto che la homeView viene tradotta "a mano" non c'è bisogno di ricompilarla:
    // HbHomeView.template = Handlebars.compile($("#home-tpl").html());
    HbTrackerView.template = Handlebars.compile($("#tracker-tpl").html());
    HbNotesView.template = Handlebars.compile($('#notes-tpl').html());
    HbHistoryView.template = Handlebars.compile($("#history-tpl").html());
    HbDetailsView.template = Handlebars.compile($("#sessionDetails-tpl").html());
    HbHelpView.template = Handlebars.compile($("#help-tpl").html());
    HbAboutView.template = Handlebars.compile($("#about-tpl").html());
    
    // dopo la ricompilazione dei template, le viste sono tradotte nella 
    // lingua corretta. Ma la homeView non viene mai ricreata e quindi va
    // "tradotta" a mano:
    
    //// TODO: scoprire perché il titolo viene tradotto solo una volta ma
    //// quando si ritorna alla home page ricompare il titolo non tradotto
    // $('div.viewNavigator_header_title').html(i18n.t('home.title'));
    $('#trackerButton').html(i18n.t('home.tracker'));
    $('#historyButton').html(i18n.t('home.history'));
    $('#helpButton').html(i18n.t('home.help'));
    $('#aboutButton').html(i18n.t('home.about'));
    $('#versione').html(i18n.t('app.version'));
}

function onBackKey( event ) {
    if ( window.viewNavigator.history.length > 1 ){
        event.preventDefault();
        window.viewNavigator.popView();
        return false;
    }
    navigator.app.exitApp();
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);



var templates = {
    sellerMapViewTemplate:"views/sellerMapViewTemplate.html",
    loaded: 0,
    requested: 0
};

var ___templatesLoadedCallback;

function loadTemplates(callback) {
    ___templatesLoadedCallback = callback;
    
    //load Moustache HTML templates
    for (var key in templates) {
        (function() {
             var _key = key.toString();
             if ( _key != "loaded" && _key != "requested" ){
                 templates.requested ++;
                 
                 var templateLoaded = function( template ){
                    onTemplateLoaded( template, _key );
                 }
                 
                 $.get( templates[ _key ], templateLoaded, "html" );
             }
         })();
    }
}

// Questa funzione carica un template. 
// Quando tutti i template sono stati caricati, richiama la callback che era
// stata passata alla funzione loadTemplates.
function onTemplateLoaded(template, key) {
    //alert( key + ": " + template);
    templates[ key ] = template;
    templates.loaded ++;
    
    if ( templates.loaded == templates.requested ) {
        ___templatesLoadedCallback();
    }
}



function isTablet() {
    var _w = $(window).width();
    var _h = $(window).height();
    return (Math.min(_w,_h) >= 600);
}

function ViewAssembler() {
    this.touchSupported = 'ontouchstart' in window;
    //this.CLICK_EVENT = this.touchSupported ? 'touchend' : 'click';
    this.CLICK_EVENT = 'click';
    return this;
}


var HbDetailsView = function() {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="detailsView" />');
    };
    
    this.render = function(session, sessionIndex) {
        var durationStr = translateTime(secondsToTime(session.duration));
        var viewModel = {
             'events': session.events,
             'durationStr': durationStr,
             'notes': session.notes,
             'index': sessionIndex
        }
        this.el.html(HbDetailsView.template(viewModel));
        this.el.find( "#deleteSessionButton" ).on(
                this.CLICK_EVENT,
                {'sessionIndex': sessionIndex},
                onDeleteSessionButtonClick );
        return this.el;
    };
    
    /**
     * Funzione che aggiunge gli eventi all'elenco nella pagina 'Session Details'.
     * NB: questo metodo va chiamato *dopo* che è stata eseguito .push(view)!!!!!!
     */
    this.printEvents = function(events) {
        for (var i=0; i<events.length; i++) {
            event = events[i];
            if (event.type == START_TIME) {
                HbTrackerView.addStartTime(strToDate(event.date));
            } else if (event.type == START_PAUSE) {
                HbTrackerView.addStartPause(strToDate(event.date));
            } else if (event.type == END_PAUSE) {
                HbTrackerView.addStopPause(strToDate(event.date));
            } else if (event.type == END_TIME) {
                HbTrackerView.addStopTime(strToDate(event.date));
            }
        }
    };
    
    
    this.initialize();
}

// membri statici della vista

// questa vista viene compilata dopo il calcolo della lingua dell'utente
HbDetailsView.template = Handlebars.compile($("#sessionDetails-tpl").html());


var HbNotesView = function(store) {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="notesView" />');
    };
    
    this.render = function() {
        this.el.html(HbNotesView.template());
        this.el.find( "#saveNotesButton" ).on( this.CLICK_EVENT, onSaveNotesButtonClick );
        
        // la sessione deve esistere, quindi passo true come parametro
        var session = getSession(true);
        if (session.notes != undefined) {
            this.el.find('#notesTextArea').val(session.notes);
        }
        
        return this.el;
    };
    
    this.initialize();
}

// membri statici della vista


// questa vista viene compilata dopo il calcolo della lingua dell'utente
HbNotesView.template = Handlebars.compile($("#notes-tpl").html());


var HbTrackerView = function(store) {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="trackerView" />');
    };
    
    this.render = function() {
        this.el.html(HbTrackerView.template());
        this.el.find("#timeButton").on( this.CLICK_EVENT, onTimeButtonClick );
        this.el.find("#pauseButton").on( this.CLICK_EVENT, onPauseButtonClick );
        this.el.find("#notesButton").on( this.CLICK_EVENT, onNotesViewClick );
        return this.el;   // return $("<div id='trackerView'>...</div>")
    };
    
    
    this.initialize();
}

// membri statici della vista

HbTrackerView.addStartTime = function(data_inizio) {
    navigator.globalization.dateToString(
        data_inizio,
        // callback in caso di successo
        function (date) {
            var classe = 'time_inizio';
            var selettore_lingua = 'tracker.labelTimeStart';
            var appendElenco = false;
            HbTrackerView.aggiornaElenco(date, classe, selettore_lingua, appendElenco);
        },
        // callback in caso di fallimento
        HbTrackerView.erroreGlobalization,
        // opzioni
        convertionOptions
    );
}

/**
 * Modifiche grafiche apportate quando si clicca sul bottone "Start Tracking"
 * o quando si avvia il programma e la registrazione era già stata avviata
 * precedentemente.
 */
HbTrackerView.timeButtonSetStop = function() {
    var timeButton = $('#timeButton');
    timeButton.html(i18n.t('tracker.stopButton'));
    timeButton.removeClass('startButton').addClass('stopButton');
    
    $('#pauseButtonMask').css('display', 'none');
    $('#notesButtonMask').css('display', 'none');
}

HbTrackerView.addStopTime = function(data_fine) {
    navigator.globalization.dateToString(
        data_fine,
        function (date) {
            var classe = 'time_fine';
            var selettore_lingua = 'tracker.labelTimeStop';
            var appendElenco = true;
            HbTrackerView.aggiornaElenco(date, classe, selettore_lingua, appendElenco);
        },
        HbTrackerView.erroreGlobalization,
        convertionOptions
    );
}

HbTrackerView.timeButtonSetStart = function() {
    var timeButton = $('#timeButton');
    timeButton.html(i18n.t('tracker.startButton'));
    timeButton.removeClass('stopButton').addClass('startButton');
    
    // dopo aver fermato il tracker non è più possibile aggiungere una pausa
    // o refreshare il tempo trascorso
    $('#pauseButtonMask').css('display', 'block');
}

HbTrackerView.addStartPause = function(data_inizio) {
    navigator.globalization.dateToString(
        data_inizio,
        function (date) {
            var classe = 'pausa_inizio';
            var selettore_lingua = 'tracker.labelPauseStart';
            var appendElenco = true;
            HbTrackerView.aggiornaElenco(date, classe, selettore_lingua, appendElenco);
        },
        HbTrackerView.erroreGlobalization,
        convertionOptions
    );
}

HbTrackerView.pauseButtonSetStop = function() {
    var pauseButton = $('#pauseButton');
    pauseButton.html(i18n.t('tracker.pauseStop'));
    pauseButton.removeClass('pauseStartButton').addClass('pauseStopButton');
}

HbTrackerView.addStopPause = function(data_fine) {
    navigator.globalization.dateToString(
        data_fine,
        function (date) {
            var classe = 'pausa_fine';
            var selettore_lingua = 'tracker.labelPauseStop';
            var appendElenco = true;
            HbTrackerView.aggiornaElenco(date, classe, selettore_lingua, appendElenco);
        },
        HbTrackerView.erroreGlobalization,
        convertionOptions
    );
}

HbTrackerView.pauseButtonSetStart = function() {
    // è finita una pausa
    var pauseButton = $('#pauseButton');
    pauseButton.html(i18n.t('tracker.pauseStart'));
    pauseButton.removeClass('pauseStopButton').addClass('pauseStartButton');
}

/**
 * Funzione che aggiunge un evento all'elenco
 */
HbTrackerView.aggiornaElenco = function (date, classe, selettore_lingua, appendElenco) {
    var newHtml = "<div class=\"" + classe + "\">" 
        + i18n.t(selettore_lingua) + ": " + date.value + "</div>";
    
    if (appendElenco) {
        newHtml = $('#elenco').html() + newHtml;
    }
    $('#elenco').html(newHtml);
    window.viewNavigator.refreshScroller();
}


HbTrackerView.printEvents = function() {
    var session = JSON.parse(localStorage.session);
    var events = session.events;
    var event = undefined;
    for (var i=0; i<events.length; i++) {
        event = events[i];
        if (event.type == START_TIME) {
            HbTrackerView.addStartTime(strToDate(event.date));
        } else if (event.type == START_PAUSE) {
            HbTrackerView.addStartPause(strToDate(event.date));
        } else if (event.type == END_PAUSE) {
            HbTrackerView.addStopPause(strToDate(event.date));
        }
    }
}

HbTrackerView.erroreGlobalization = function() {
    alert('Error getting dateString\n');
}

/**
 * Funzione che calcola il tempo trascorso dall'ultimo evento, l'aggiunge
 * ai tempi trascorsi tra gli eventi precedenti e visualizza la durata
 * totale.
 */
HbTrackerView.refreshElapsed = function(session) {
    
    if (session == undefined) {
        session = JSON.parse(localStorage.session);
    } 
    var result = session.duration;
    var lastEvent = session.events[session.events.length - 1];
    if ((lastEvent.type == START_TIME) || (lastEvent.type == END_PAUSE)) {
        var now = new Date();
        result += Math.round((now - strToDate(lastEvent.date)) / 1000);
    }
    var timeElapsed = translateTime(secondsToTime(result))
    $('#durata').html(timeElapsed);
}

// questa vista viene compilata dopo il calcolo della lingua dell'utente
HbTrackerView.template = Handlebars.compile($("#tracker-tpl").html());


var HbHelpView = function() {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="helpView" />');
    };
    
    this.render = function() {
        this.el.html(HbHelpView.template());
        return this.el;
    };
    
    this.initialize();
}

// membri statici della vista

// questa vista viene compilata dopo il calcolo della lingua dell'utente
HbHelpView.template = Handlebars.compile($("#help-tpl").html());

var HbHomeView = function() {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="defaultView" />');
        //this.el.on('keyup', '.search-key', this.findByName);
    };
    
    this.render = function() {
        // si utilizza this.el invece di #body per rendere la view riutilizzabile
        var codice = HbHomeView.template();
        this.el.html(codice);
        this.el.find("#trackerButton").on(this.CLICK_EVENT, onTrackerViewClick );
        this.el.find("#historyButton").on( this.CLICK_EVENT, onHistoryViewClick );
        this.el.find("#helpButton").on( this.CLICK_EVENT, onHelpViewClick );
        this.el.find("#aboutButton").on( this.CLICK_EVENT, onAboutViewClick );
        return this.el;   // return "<div id='...'>...</div>"
        
    };
    
    this.initialize();
}

// membri statici della vista
// Questa vista è particolare perché è la prima ad essere usata e quindi va 
// compilata ancora prima di decidere quale lingua usa l'utente.
HbHomeView.template = Handlebars.compile($("#home-tpl").html());


var HbHistoryView = function(store) {
    /*    questo non serve perché quasi tutti i metodi sono statici 
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="historyView" />');
        
        // array delle sessioni con data non formattata
        ///////this.myHistory = '';
        
        // numero di sessioni da mostrare nella pagina 'history'
        this.counts = 0; 
        HbHistoryView.sessionArray = new Array();
    };*/
    
    /**
     * Visto che la funzione di phonegap che formatta le date è asincrona, devo 
     * usare un array ed un contatore per verificare quando tutte le date sono 
     * pronte.
     * Il parametro isUpdate serve ad indicare che la vista sostituirà la vista
     * corrente invece che essere aggiunta dopo di essa.
     */
    this.startRendering = function(isUpdate) {
        // resetta l'array delle sessioni con data convertita:
        HbHistoryView.sessionArray = new Array();
        
        // resetta l'array delle sessioni memorizzate in localStorage:
        HbHistoryView.myHistory = getHistory();
        
        HbHistoryView.checkHistoryReady(isUpdate);
    };

    //// this.initialize();
}

// membri statici della vista
HbHistoryView.sessionArray = new Array();
HbHistoryView.myHistory = '';

HbHistoryView.checkHistoryReady = function(isUpdate) {
    if (HbHistoryView.myHistory.length == 0) {
        var viewModel = {
            sessions: HbHistoryView.sessionArray,
            counts: HbHistoryView.sessionArray.length
        };
        var el = $('<div id="historyView" />');
        el.html(HbHistoryView.template(viewModel));
        el.find("li").on( 'click', onHistoryListItemClick);
        el.find("#exportAllButton").on( 'click', onExportAllClick);
        el.find("#deleteAllButton").on( 'click', onDeleteSessionsClick);
        onHistoryViewReady(el, isUpdate);
    } else {
        currentSession = HbHistoryView.myHistory.shift(0);
        myDate = currentSession.events[0].date;
        myDate = strToDate(myDate);
        navigator.globalization.dateToString(
            myDate,
            // callback in caso di successo:
            function (date) {
                HbHistoryView.sessionArray.push({
                    'dataInizioFormattata': date.value,
                    'durationStr': translateTime(secondsToTime(currentSession.duration))
                });
                // se ho convertito tutte le date apri la nuova pagina
                HbHistoryView.checkHistoryReady(isUpdate);
            },
            HbTrackerView.erroreGlobalization,
            convertionOptions
        );
    }
}

// questa vista viene compilata dopo il calcolo della lingua dell'utente
HbHistoryView.template = Handlebars.compile($("#history-tpl").html());

var HbAboutView = function() {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="aboutView" />');
    };
    
    this.render = function() {
        this.el.html(HbAboutView.template());
        return this.el;   // return $("<div id='aboutView'>...</div>")
    };
    
    this.initialize();
}

// membri statici della vista

// questa vista viene compilata dopo il calcolo della lingua dell'utente
HbAboutView.template = Handlebars.compile($("#about-tpl").html());

/*
THIS SOFTWARE IS PROVIDED BY ANDREW M. TRICE ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL ANDREW M. TRICE OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


var ViewNavigator = function( target, backLinkCSS, bindToWindow ) {

	this.supportsBackKey = true; //phonegap on android only
	this.animating = false;
	this.animationX = 150;
	this.animationDuration = 400;
	this.history = [];
	this.scroller = null;
	this.headerPadding = 5;
	
	this.uniqueId = this.guid();
	
	var regexp = new RegExp("Windows Phone OS 7");	
	this.winPhone = (navigator.userAgent.search(regexp) >= 0);
	
	this.rootElement = $('<div class="viewNavigator_root"></div>');
	this.header = $('<div class="viewNavigator_header"></div>');
	this.content = $('<div class="viewNavigator_content" id="contentRoot"></div>');
	this.rootElement.append( this.header );
	this.rootElement.append( this.content );
	
	this.parent = $( target );
	
	this.backLinkCSS = backLinkCSS ? backLinkCSS : "viewNavigator_backButton";
	
	var self = this;
	//$(window).resize( function(event){ self.resizeContent() } );
	//alert( this.parent.toString() );
	//this.parent.resize( function(event){ self.resizeContent() } );
	
	if ( bindToWindow != false ) {
		$(window).resize( function(event){ self.resizeContent() } );
	}
	else {
		this.parent.resize( function(event){ self.resizeContent() } );
	}
	
	this.parent.append( this.rootElement );
	
	if ( window.viewNavigators == null || window.viewNavigators == undefined ) {
		window.viewNavigators = {};
	}
	window.viewNavigators[ this.uniqueId ] = this; 

}

ViewNavigator.prototype.replaceView = function( viewDescriptor ) {
	if (this.animating)
		return;
	viewDescriptor.animation = "pushEffect"
	
	//this is a hack to mimic behavior of pushView, then pop off the "current" from the history
	this.history.push( viewDescriptor );
	this.updateView( viewDescriptor );
	this.history.pop();
	this.history.pop();
	this.history.push( viewDescriptor );
}

ViewNavigator.prototype.pushView = function( viewDescriptor ) {
	if (this.animating)
		return;
	viewDescriptor.animation = "pushEffect"
	this.history.push( viewDescriptor );
	this.updateView( viewDescriptor );
}

ViewNavigator.prototype.popView = function() {

	if (this.animating || this.history.length <= 1 )
		return;
	
	var currentViewDescriptor = this.history[ this.history.length-1];
	if ( currentViewDescriptor.backCallback ) {
		currentViewDescriptor.backCallback();
	}
		
	this.history.pop();	
	var viewDescriptor = this.history[ this.history.length-1 ];
	viewDescriptor.animation = "popEffect"
	this.updateView( viewDescriptor );
}

ViewNavigator.prototype.setHeaderPadding = function( amount ) {
	this.headerPadding = amount;
	if ( this.headerBacklink ) {
		this.headerBacklink.css("left", amount);
	}
}

ViewNavigator.prototype.updateView = function( viewDescriptor ) {
	
	this.animating = true;
	
    
	
	
	this.contentPendingRemove = this.contentViewHolder;
	this.headerContentPendingRemove = this.headerContent;
	
	this.headerContent = $('<div class="viewNavigator_headerContent"></div>');
	
	this.headerTitle = $("<div class='viewNavigator_header_title'>" + viewDescriptor.title + "</div>");
	this.headerContent.append( this.headerTitle );
	
	var linkGuid = this.guid();
	if ( viewDescriptor.backLabel ) {
		this.headerBacklink = $('<li class="viewNavigator_header_backlink viewNavigator_backButtonPosition ' + this.backLinkCSS +'" id="link' + linkGuid + '" onclick="window.viewNavigators[\'' + this.uniqueId + '\'].popView()">'+ viewDescriptor.backLabel + '</li>');
		this.headerContent.append( this.headerBacklink );
		
		//this is for proper handling in splitviewnavigator
		this.setHeaderPadding( this.headerPadding );
	}
	
	var id = this.guid();
	this.contentViewHolder = $('<div class="viewNavigator_contentHolder" id="' + id + '"></div>');
	this.contentViewHolder.append( viewDescriptor.view );
	this.resizeContent();
	
	if ( this.contentPendingRemove ){ 
        this.contentPendingRemove.stop()
	}
	if ( this.headerContentPendingRemove ) {
        this.headerContentPendingRemove.stop()
	}
	this.headerContent.stop()
	this.contentViewHolder.stop()
	
	
	
	if ( this.scroller != null ) {
	    var scrollY = this.scroller.y;
        this.scroller.destroy();
        this.scroller = null;
        
        if (this.contentPendingRemove) {
            //console.log( scrollY );
            
            //use this to mantain scroll position when scroller is destroyed
            var children = $( this.contentPendingRemove.children()[0] );
            children.attr( "scrollY", scrollY );
            var originalTopMargin = children.css( "margin-top" );
            children.attr( "originalTopMargin", originalTopMargin );
            
            var cssString = "translate3d(0px, "+(parseInt( scrollY ) + parseInt( originalTopMargin )).toString()+"px, 0px)";
            children.css( "-webkit-transform", cssString );
            
           // children.css( "margin-top", (parseInt( scrollY ) + parseInt( originalTopMargin )).toString() + "px" );
        } 
    }
	
	$(this.contentPendingRemove).click(function(){ return false; });
	
    
	if ( viewDescriptor.animation == "popEffect" ) {
		
		this.contentViewHolder.css( "left", -this.contentViewHolder.width() );
		this.contentViewHolder.css( "opacity", 1 );
    	this.content.prepend( this.contentViewHolder );
    	
		this.headerContent.css( "left", -this.animationX );
		this.headerContent.css( "opacity", 0 );
		this.header.append( this.headerContent );
    	
    	var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );
    	
 	   	this.contentPendingRemove.animate({
   	 			left:this.contentViewHolder.width(),
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration*0.8);
    		
    	//remove this to change back
 	   	this.contentViewHolder.animate({
   	 			left:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration/2);
    		
    	this.headerContentPendingRemove.animate({
   	 			left:this.animationX,
    			opacity:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration, func );
    		
    	this.headerContent.animate({
   	 			left:0,
    			opacity:1,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration/2 );
    		
    	
    	//using a timeout to get around inconsistent response times for webkittransitionend event
        //var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );
    	//setTimeout( func, this.animationDuration+90 );
	}
	else if ( this.history.length > 1 ) {
	
		this.contentViewHolder.css( "left", this.contentViewHolder.width() );
		this.contentViewHolder.css( "opacity", 1 );
		
    	this.content.append( this.contentViewHolder );
    	
		this.headerContent.css( "left", this.animationX );
		this.headerContent.css( "opacity", 0 );
		this.header.append( this.headerContent );

        var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );

 	   	this.contentViewHolder.animate({
   	 			left:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration*0.75);
    	
 	   	this.contentPendingRemove.animate({
   	 			left:-this.contentViewHolder.width()/2,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration, func);
    		
    	this.headerContent.animate({
   	 			left:0,
    			opacity:1,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration*0.75);
    		
    	this.headerContentPendingRemove.animate({
   	 			left:-this.animationX,
    			opacity:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration );
    		
    	//using a timeout to get around inconsistent response times for webkittransitionend event
    	//var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );
    	//setTimeout( func, this.animationDuration+90 );
	}
	else {
		this.contentViewHolder.css( "left", 0 );
		this.contentViewHolder.css( "opacity", 1 );
    	this.content.append( this.contentViewHolder );

		this.headerContent.css( "left", 0 );
		this.headerContent.css( "opacity", 1 );
		this.header.append( this.headerContent );
		this.animating = false;
		this.resetScroller();
	}
	
    if ( viewDescriptor.backLabel ) {
    	new NoClickDelay( this.headerBacklink.get()[0] );
	}
	
	if ( viewDescriptor.showCallback ) {
	    viewDescriptor.showCallback();
	}
}


ViewNavigator.prototype.resetScroller = function() {
    
    var id = this.contentViewHolder.attr( "id" );
    var currentViewDescriptor = this.history[ this.history.length-1];
    
	if ( !this.winPhone ) {
		if ( this.scroller != null ) {
			this.scroller.destroy();
			this.scroller = null;
		}
		if ( id && !(currentViewDescriptor && currentViewDescriptor.scroll === false)) {
			var self = this;
			setTimeout( function() { 
			    
                //use this to mantain scroll position when scroller is destroyed
                var targetDiv = $( $("#"+id ).children()[0] );
                var scrollY= targetDiv.attr( "scrollY" );
                var originalTopMargin = targetDiv.attr( "originalTopMargin" );
                if ( scrollY != undefined && scrollY != "" ){
                  //  console.log( "resetScroller scrollY: " + scrollY)
                  //  targetDiv.css( "margin-top", originalTopMargin );
                    var cssString = "translate3d(0px, "+(originalTopMargin).toString()+"px, 0px)";
                    targetDiv.css( "-webkit-transform", cssString );
                }
			    self.scroller = new iScroll( id ); 
			    if ( scrollY != undefined && scrollY != "" ) {
			        self.scroller.scrollTo( 0, parseInt( scrollY ) );
			    }
			}, 10 );
			//this.scroller = new iScroll( id );
		}
    }
}


ViewNavigator.prototype.refreshScroller = function() {
    
	if ( !this.winPhone ) {
		if ( this.scroller != null ) {
			this.scroller.refresh();
		}
    }
}

ViewNavigator.prototype.animationCompleteHandler = function(removalTarget, headerRemovalTarget, headerView, contentView) {
	var self = this;
	return function() {
		self.animating = false;
        self.resetScroller();
		if ( removalTarget ) {
			removalTarget.unbind( "click" );
			removalTarget.detach();
		}
		if ( headerRemovalTarget ) {
			headerRemovalTarget.unbind( "click" );
			headerRemovalTarget.detach(); 
		}
	}
}

ViewNavigator.prototype.resizeContent = function(event) {

	var targetWidth = this.parent.width();
	if ( this.headerContent )
		this.headerContent.width( targetWidth );
	if ( this.contentViewHolder )
		this.contentViewHolder.width( targetWidth );
}


//GUID logic from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript

ViewNavigator.prototype.S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
ViewNavigator.prototype.guid = function() {
	return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
}



/*  PHONEGAP INTEGRATION */
/*
//android+phonegap specific back button support - will only work if phonegap is used on android (www.phonegap.com)
if ( typeof PhoneGap != 'undefined' ) { 
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
   document.addEventListener("backbutton", onBackKey, false);
}

function onBackKey( event ) {
	event.preventDefault();
	window.viewNavigator.popView();
	for ( var x=0; x<window.backKeyViewNavigators.length; x++ ) {
		window.backKeyViewNavigators[x].popView();
	}
}
*/


/*
THIS SOFTWARE IS PROVIDED BY ANDREW M. TRICE ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL ANDREW M. TRICE OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


var SplitViewNavigator = function( target, toggleButtonLabel, backLinkCSS, bindToWindow ) {
	
	this.animating = false;
	this.animationDuration = 350;
	this.animationPerformed = false;
	
	this.uniqueId = this.guid();
	this.parent = $( target );
	
	var regexp = new RegExp("Windows Phone OS 7");	
	this.winPhone = (navigator.userAgent.search(regexp) >= 0);
	
	this.rootElement = $('<div class="splitViewNavigator_root"></div>');
	this.sidebarContainer = $('<div class="splitViewNavigator_sidebar"></div>');
	this.contentOverlay = $('<div class="content_overlay_hidden" id="overlay'+this.uniqueId+'"></div>');
	this.bodyContainer = $('<div class="splitViewNavigator_body"></div>');
	
	this.sidebarViewNavigator = new ViewNavigator( this.sidebarContainer.get()[0], backLinkCSS, false );	
	
	this.bodyViewNavigator = new ViewNavigator( this.bodyContainer.get()[0], backLinkCSS, false );
	
	this.backLinkCSS = backLinkCSS ? backLinkCSS : "viewNavigator_backButton";
	
	this.toggleSidebarButton = $('<li class="viewNavigator_backButton viewNavigator_backButtonPosition ' + backLinkCSS + '" id="toggle' + this.uniqueId + '" onclick="window.splitViewNavigator.showSidebar()">'+toggleButtonLabel+'</li>');
	
	this.rootElement.append( this.bodyContainer );
	this.rootElement.append( this.contentOverlay );
	
	this.rootElement.append( this.sidebarContainer );
	
	var self = this;
	
	/*if ( "onorientationchange" in window ) {
		$(window).bind( "orientationchange", function(event){ self.resizeContent() } )
	}
	else {*/
		//$(window).resize( function(event){ self.resizeContent() } );
		//alert( this.parent.attr( "id" ) );
		this.parent.resize( function(event){ self.resizeContent() } );
	//}
	
	if ( bindToWindow != false ) {
		$(window).resize( function(event){ self.resizeContent() } );
	}
	else {
		this.parent.resize( function(event){ self.resizeContent() } );
	}
	
	this.resizeContent();
	
	this.parent.append( this.rootElement );
	
	this.contentOverlay.click( function(event){ self.hideSidebar() } );
	
	new NoClickDelay( this.contentOverlay.get()[0] );
	new NoClickDelay( this.toggleSidebarButton.get()[0] );
	window.splitViewNavigator = this;
}


SplitViewNavigator.prototype.resizeContent = function() {

	this.applyStylesByOrientation();
	this.sidebarViewNavigator.resizeContent();	
	this.bodyViewNavigator.resizeContent()
}

SplitViewNavigator.prototype.applyStylesByOrientation = function() {
	var $window = $(window)
    var w = $window.width();
    var h = $window.height();
   
    
    var orientation = (w >= h) ? "landscape" : "portrait";
    this.contentOverlay.removeClass( "content_overlay_visible" ).addClass( "content_overlay_hidden" );
    
    //landscape
    if ( orientation == "landscape" && this.orientation != orientation ) {
    	this.sidebarContainer.removeClass( "sidebar_portrait" ).addClass( "sidebar_landscape" );
    	this.bodyViewNavigator.setHeaderPadding( 0 );
    	this.toggleSidebarButton.remove();
    	if ( this.animationPerformed ) {
    		this.sidebarContainer.css( "left", 0 );
    	}
    	this.bodyContainer.removeClass( "body_portrait" ).addClass( "body_landscape" );
    }
    
    //portrait
    else if ( this.orientation != orientation ) {
    	this.sidebarContainer.removeClass( "sidebar_landscape" ).addClass( "sidebar_portrait" );
    	this.bodyViewNavigator.setHeaderPadding( "70px" );
		this.bodyContainer.append( this.toggleSidebarButton );
    	if ( this.animationPerformed ) {
    		this.sidebarContainer.css( "left", -this.sidebarContainer.width() );
    	}
    	this.bodyContainer.removeClass( "body_landscape" ).addClass( "body_portrait" );
    }
    
    this.orientation = orientation;
}

SplitViewNavigator.prototype.showSidebar = function() {
	this.animationPerformed = true;
	if ( this.orientation == "portrait" ) {
    	this.contentOverlay.removeClass( "content_overlay_hidden" ).addClass( "content_overlay_visible" );
		this.animating = true;
		this.sidebarContainer.animate({
			left:0,
			avoidTransforms:false,
			useTranslate3d: true
		}, this.animationDuration, this.animationCompleteHandler());
    		
	}
}

SplitViewNavigator.prototype.hideSidebar = function() {
	if ( this.orientation == "portrait" ) {
    	this.contentOverlay.removeClass( "content_overlay_visible" ).addClass( "content_overlay_hidden" );
		this.animating = true;
		this.sidebarContainer.animate({
			left:-this.sidebarContainer.width(),
			avoidTransforms:false,
			useTranslate3d: true
		}, this.animationDuration, this.animationCompleteHandler());
    		
	}
}

SplitViewNavigator.prototype.animationCompleteHandler = function() {
	var self = this;
	return function() {
		self.animating = false;
        //self.resetScroller();
	}
}

SplitViewNavigator.prototype.pushSidebarView = function( viewDescriptor ) {
	this.sidebarViewNavigator.pushView( viewDescriptor );
}

SplitViewNavigator.prototype.popSidebarView = function() {
	this.sidebarViewNavigator.popView();
}

SplitViewNavigator.prototype.replaceSidebarView = function( viewDescriptor ) {
	this.sidebarViewNavigator.replaceView( viewDescriptor );
}

SplitViewNavigator.prototype.pushBodyView = function( viewDescriptor ) {
	this.bodyViewNavigator.pushView( viewDescriptor );
}

SplitViewNavigator.prototype.popBodyView = function() {
	this.bodyViewNavigator.popView();
}

SplitViewNavigator.prototype.replaceBodyView = function( viewDescriptor ) {
	this.bodyViewNavigator.replaceView( viewDescriptor );
}




//GUID logic from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript

SplitViewNavigator.prototype.S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
SplitViewNavigator.prototype.guid = function() {
	return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
}















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
        




            app.initialize();
        

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
var app = {
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
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
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














            
        








$(document).ready( function(){
    setupDefaultView();
} );

function setupDefaultView() { 
    /*   handlebars */
    var homeView = new HbHomeView();
    var defaultView = { 
        title: i18n.t("home.title"), 
        view: homeView.render()
    };
    
    //Setup the ViewNavigator
    window.viewNavigator = new ViewNavigator( 'body' );
    window.viewNavigator.pushView( defaultView );
}

/**
 * Click sul tasto 'Recorder' in home page
 * @param event
 * @returns {Boolean}
 */
function onRecorderViewClick( event ) {
    var recorderView = new HbRecorderView();
    var view = { 
        title: i18n.t("recorder.title"), 
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: recorderView.render()
    };
    
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

/**
 * Click sul tasto 'History' in home page
 * @param event
 * @returns {Boolean}
 */
function onHistoryViewClick( event ) {
    var historyView = new HbHistoryView();
    var view = { 
        title: i18n.t("history.title"), 
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: historyView.render()
    };
    
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

/**
 * Click sul tasto 'About' in home page.
 * @param event
 * @returns {Boolean}
 */
function onAboutViewClick( event ) {
    var aboutView = new HbAboutView();
    var view = { 
        title: i18n.t("about.title"), 
        backLabel: (isTablet() ? i18n.t("app.back") : " "),
        view: aboutView.render()
    };
    window.viewNavigator.pushView( view );
    event.stopPropagation();
    return false;
}

/**
 * Per il momento la pagina 'Check in' non fa nulla. Quando si clicca sul
 * tasto 'Check in' si torna alla home.
 * @param event
 */
function onRecordButtonClick( event ) {
    event.preventDefault();
    window.viewNavigator.popView();
}


function setLanguage(language) {
    // conviene sempre definire una lingua di fallback nel caso la chiave
    // italiana o francese o xxx non venga trovata
    
    // language = 'it';
    i18n.init({lng: language, fallbackLng: 'en'});
    compileHbTemplates();
    
    // dopo la ricompilazione dei template, le viste sono tradotte nella 
    // lingua corretta. Ma la homeView non viene mai ricreata e quindi va
    // "tradotta" a mano:
    
    $('div.viewNavigator_header_title').html(i18n.t('home.title'));
    $('#recorder').html(i18n.t('home.recorder'));
    $('#history').html(i18n.t('home.history'));
    $('#about').html(i18n.t('home.about'));
    
}

/**
 * Compila di nuovo i template per tener conto di un cambio di lingua.
 * I template sono compilati anche in fondo ai file .js perché altrimenti
 * l'app non funzionava una volta deployata.
 */
function compileHbTemplates() {
    // visto che la homeView viene tradotta "a mano" non c'è bisogno di ricompilarla:
    // HbHomeView.template = Handlebars.compile($("#home-tpl").html());
    HbRecorderView.template = Handlebars.compile($("#recorder-tpl").html());
    HbHistoryView.template = Handlebars.compile($("#history-tpl").html());
    HbAboutView.template = Handlebars.compile($("#about-tpl").html());
}



function isTablet() {
    var _w = $(window).width();
    var _h = $(window).height();
    return (Math.min(_w,_h) >= 600);
}

Handlebars.registerHelper('t', function(i18n_key) {
    var result = i18n.t(i18n_key);
    return new Handlebars.SafeString(result);
});


//non definendo una lingua iniziale, si usa la lingua del sistema o l'inglese.
i18n.init({lng: 'it', fallbackLng: 'en'});
//i18n.init({fallbackLng: 'en'});

function openExternalURL( url ) {

    var result=confirm(i18n.t("app.leave")); 
    if (result==true) {
        window.open( url, '_blank' );
    }
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    navigator.globalization.getPreferredLanguage(
        // on success:
        function (language) {
            if (language.value == 'italiano') {
                setLanguage('it');
            } else {
                setLanguage('en');
            }
        },
        // on fail:
        function () {
            setLanguage('en');
        }
    );
    
    document.addEventListener("backbutton", onBackKey, false);
    
    /**
     * Definizione di un nuovo plugin per il recupero della versione dell'app
     */
    window.getVersion = function(callback) {
        cordova.exec(
            // callback chiamata in caso di successo
            function(ver) {
                $('#span_version').text(ver);
            }, 
            // callback chiamata in caso di fallimento
            function(err) {
                alert(err);
            }, 
            "VersionPlugin", 
            "getVersionName", 
            []
        );
    };
    // richiamo il nuovo plugin per aggiornare la versione nella home page.
    window.getVersion();
    // il plugin esegue una chiamata asincrona, non si può fare
    // var versione = window.getVersion();   e usare versione come si vuole...
    
}



function onBackKey( event ) {
    if ( window.viewNavigator.history.length > 1 ){
        event.preventDefault();
        window.viewNavigator.popView();
        return false;
    }
    navigator.app.exitApp();
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);



var templates = {
    loaded: 0,
    requested: 0
};

var ___templatesLoadedCallback;

function loadTemplates(callback) {
    ___templatesLoadedCallback = callback;
    
    //load Moustache HTML templates
    for (var key in templates) {
        (function() {
             var _key = key.toString();
             if ( _key != "loaded" && _key != "requested" ){
                 templates.requested ++;
                 
                 var templateLoaded = function( template ){
                    onTemplateLoaded( template, _key );
                 }
                 
                 $.get( templates[ _key ], templateLoaded, "html" );
             }
         })();
    }
}

// Questa funzione carica un template. 
// Quando tutti i template sono stati caricati, richiama la callback che era
// stata passata alla funzione loadTemplates.
function onTemplateLoaded(template, key) {
    //alert( key + ": " + template);
    templates[ key ] = template;
    templates.loaded ++;
    
    if ( templates.loaded == templates.requested ) {
        ___templatesLoadedCallback();
    }
}



function isTablet() {
    var _w = $(window).width();
    var _h = $(window).height();
    return (Math.min(_w,_h) >= 600);
}

function ViewAssembler() {
    this.touchSupported = 'ontouchstart' in window;
    //this.CLICK_EVENT = this.touchSupported ? 'touchend' : 'click';
    this.CLICK_EVENT = 'click';
    return this;
}


ViewAssembler.prototype.geoPermissionDenied = function() {
    var el = $( templates.geoPermissionDeniedViewTemplate );
    return el;
}



var HbHomeView = function(store) {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="defaultView" />');
        //this.el.on('keyup', '.search-key', this.findByName);
    };
    
    this.render = function() {
        // si utilizza this.el invece di #body per rendere la view riutilizzabile
        this.el.html(HbHomeView.template());
        this.el.find("#recorder").on(this.CLICK_EVENT, onRecorderViewClick );
        this.el.find("#history").on( this.CLICK_EVENT, onHistoryViewClick );
        this.el.find("#about").on( this.CLICK_EVENT, onAboutViewClick );
        return this.el;   // return "<div id='...'>...</div>"
        
    };
    
    this.initialize();
}

// membri statici della vista
// Questa vista è particolare perché è la prima ad essere usata e quindi va 
// compilata ancora prima di decidere quale lingua usa l'utente.
HbHomeView.template = Handlebars.compile($("#home-tpl").html());


var HbHistoryView = function(store) {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="historyView" />');
    };
    
    this.render = function() {
        this.el.html(HbHistoryView.template());
        // this.el.find( "#checkInButton" ).on( this.CLICK_EVENT, onCheckInButtonClick );
        return this.el;   // return $("<div id='historyView'>...</div>")
    };
    
    this.initialize();
}

// membri statici della vista

// questa vista viene compilata dopo il calcolo della lingua dell'utente


var HbAboutView = function() {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="aboutView" />');
    };
    
    this.render = function() {
        this.el.html(HbAboutView.template());
        return this.el;   // return $("<div id='aboutView'>...</div>")
    };
    
    this.initialize();
}

// membri statici della vista

// questa vista viene compilata dopo il calcolo della lingua dell'utente


var HbRecorderView = function(store) {
    this.CLICK_EVENT = 'click';
    this.initialize = function() {
        this.el = $('<div id="recorderView" />');
    };
    
    this.render = function() {
        this.el.html(HbRecorderView.template());
        // this.el.find( "#recorderButton" ).on( this.CLICK_EVENT, onRecorderButtonClick );
        return this.el;   // return $("<div id='recorderView'>...</div>")
    };
    
    this.initialize();
}

// membri statici della vista

// questa vista viene compilata dopo il calcolo della lingua dell'utente


/*
THIS SOFTWARE IS PROVIDED BY ANDREW M. TRICE ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL ANDREW M. TRICE OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


var ViewNavigator = function( target, backLinkCSS, bindToWindow ) {

	this.supportsBackKey = true; //phonegap on android only
	this.animating = false;
	this.animationX = 150;
	this.animationDuration = 400;
	this.history = [];
	this.scroller = null;
	this.headerPadding = 5;
	
	this.uniqueId = this.guid();
	
	var regexp = new RegExp("Windows Phone OS 7");	
	this.winPhone = (navigator.userAgent.search(regexp) >= 0);
	
	this.rootElement = $('<div class="viewNavigator_root"></div>');
	this.header = $('<div class="viewNavigator_header"></div>');
	this.content = $('<div class="viewNavigator_content" id="contentRoot"></div>');
	this.rootElement.append( this.header );
	this.rootElement.append( this.content );
	
	this.parent = $( target );
	
	this.backLinkCSS = backLinkCSS ? backLinkCSS : "viewNavigator_backButton";
	
	var self = this;
	//$(window).resize( function(event){ self.resizeContent() } );
	//alert( this.parent.toString() );
	//this.parent.resize( function(event){ self.resizeContent() } );
	
	if ( bindToWindow != false ) {
		$(window).resize( function(event){ self.resizeContent() } );
	}
	else {
		this.parent.resize( function(event){ self.resizeContent() } );
	}
	
	this.parent.append( this.rootElement );
	
	if ( window.viewNavigators == null || window.viewNavigators == undefined ) {
		window.viewNavigators = {};
	}
	window.viewNavigators[ this.uniqueId ] = this; 

}

ViewNavigator.prototype.replaceView = function( viewDescriptor ) {
	if (this.animating)
		return;
	viewDescriptor.animation = "pushEffect"
	
	//this is a hack to mimic behavior of pushView, then pop off the "current" from the history
	this.history.push( viewDescriptor );
	this.updateView( viewDescriptor );
	this.history.pop();
	this.history.pop();
	this.history.push( viewDescriptor );
}

ViewNavigator.prototype.pushView = function( viewDescriptor ) {
	if (this.animating)
		return;
	viewDescriptor.animation = "pushEffect"
	this.history.push( viewDescriptor );
	this.updateView( viewDescriptor );
}

ViewNavigator.prototype.popView = function() {

	if (this.animating || this.history.length <= 1 )
		return;
	
	var currentViewDescriptor = this.history[ this.history.length-1];
	if ( currentViewDescriptor.backCallback ) {
		currentViewDescriptor.backCallback();
	}
		
	this.history.pop();	
	var viewDescriptor = this.history[ this.history.length-1 ];
	viewDescriptor.animation = "popEffect"
	this.updateView( viewDescriptor );
}

ViewNavigator.prototype.setHeaderPadding = function( amount ) {
	this.headerPadding = amount;
	if ( this.headerBacklink ) {
		this.headerBacklink.css("left", amount);
	}
}

ViewNavigator.prototype.updateView = function( viewDescriptor ) {
	
	this.animating = true;
	
    
	
	
	this.contentPendingRemove = this.contentViewHolder;
	this.headerContentPendingRemove = this.headerContent;
	
	this.headerContent = $('<div class="viewNavigator_headerContent"></div>');
	
	this.headerTitle = $("<div class='viewNavigator_header_title'>" + viewDescriptor.title + "</div>");
	this.headerContent.append( this.headerTitle );
	
	var linkGuid = this.guid();
	if ( viewDescriptor.backLabel ) {
		this.headerBacklink = $('<li class="viewNavigator_header_backlink viewNavigator_backButtonPosition ' + this.backLinkCSS +'" id="link' + linkGuid + '" onclick="window.viewNavigators[\'' + this.uniqueId + '\'].popView()">'+ viewDescriptor.backLabel + '</li>');
		this.headerContent.append( this.headerBacklink );
		
		//this is for proper handling in splitviewnavigator
		this.setHeaderPadding( this.headerPadding );
	}
	
	var id = this.guid();
	this.contentViewHolder = $('<div class="viewNavigator_contentHolder" id="' + id + '"></div>');
	this.contentViewHolder.append( viewDescriptor.view );
	this.resizeContent();
	
	if ( this.contentPendingRemove ){ 
        this.contentPendingRemove.stop()
	}
	if ( this.headerContentPendingRemove ) {
        this.headerContentPendingRemove.stop()
	}
	this.headerContent.stop()
	this.contentViewHolder.stop()
	
	
	
	if ( this.scroller != null ) {
	    var scrollY = this.scroller.y;
        this.scroller.destroy();
        this.scroller = null;
        
        if (this.contentPendingRemove) {
            //console.log( scrollY );
            
            //use this to mantain scroll position when scroller is destroyed
            var children = $( this.contentPendingRemove.children()[0] );
            children.attr( "scrollY", scrollY );
            var originalTopMargin = children.css( "margin-top" );
            children.attr( "originalTopMargin", originalTopMargin );
            
            var cssString = "translate3d(0px, "+(parseInt( scrollY ) + parseInt( originalTopMargin )).toString()+"px, 0px)";
            children.css( "-webkit-transform", cssString );
            
           // children.css( "margin-top", (parseInt( scrollY ) + parseInt( originalTopMargin )).toString() + "px" );
        } 
    }
	
	$(this.contentPendingRemove).click(function(){ return false; });
	
    
	if ( viewDescriptor.animation == "popEffect" ) {
		
		this.contentViewHolder.css( "left", -this.contentViewHolder.width() );
		this.contentViewHolder.css( "opacity", 1 );
    	this.content.prepend( this.contentViewHolder );
    	
		this.headerContent.css( "left", -this.animationX );
		this.headerContent.css( "opacity", 0 );
		this.header.append( this.headerContent );
    	
    	var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );
    	
 	   	this.contentPendingRemove.animate({
   	 			left:this.contentViewHolder.width(),
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration*0.8);
    		
    	//remove this to change back
 	   	this.contentViewHolder.animate({
   	 			left:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration/2);
    		
    	this.headerContentPendingRemove.animate({
   	 			left:this.animationX,
    			opacity:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration, func );
    		
    	this.headerContent.animate({
   	 			left:0,
    			opacity:1,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration/2 );
    		
    	
    	//using a timeout to get around inconsistent response times for webkittransitionend event
        //var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );
    	//setTimeout( func, this.animationDuration+90 );
	}
	else if ( this.history.length > 1 ) {
	
		this.contentViewHolder.css( "left", this.contentViewHolder.width() );
		this.contentViewHolder.css( "opacity", 1 );
		
    	this.content.append( this.contentViewHolder );
    	
		this.headerContent.css( "left", this.animationX );
		this.headerContent.css( "opacity", 0 );
		this.header.append( this.headerContent );

        var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );

 	   	this.contentViewHolder.animate({
   	 			left:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration*0.75);
    	
 	   	this.contentPendingRemove.animate({
   	 			left:-this.contentViewHolder.width()/2,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration, func);
    		
    	this.headerContent.animate({
   	 			left:0,
    			opacity:1,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration*0.75);
    		
    	this.headerContentPendingRemove.animate({
   	 			left:-this.animationX,
    			opacity:0,
    			avoidTransforms:false,
    			useTranslate3d: true
    		}, this.animationDuration );
    		
    	//using a timeout to get around inconsistent response times for webkittransitionend event
    	//var func = this.animationCompleteHandler(this.contentPendingRemove, this.headerContentPendingRemove, this.headerContent, this.contentViewHolder );
    	//setTimeout( func, this.animationDuration+90 );
	}
	else {
		this.contentViewHolder.css( "left", 0 );
		this.contentViewHolder.css( "opacity", 1 );
    	this.content.append( this.contentViewHolder );

		this.headerContent.css( "left", 0 );
		this.headerContent.css( "opacity", 1 );
		this.header.append( this.headerContent );
		this.animating = false;
		this.resetScroller();
	}
	
    if ( viewDescriptor.backLabel ) {
    	new NoClickDelay( this.headerBacklink.get()[0] );
	}
	
	if ( viewDescriptor.showCallback ) {
	    viewDescriptor.showCallback();
	}
}


ViewNavigator.prototype.resetScroller = function() {
    
    var id = this.contentViewHolder.attr( "id" );
    var currentViewDescriptor = this.history[ this.history.length-1];
    
	if ( !this.winPhone ) {
		if ( this.scroller != null ) {
			this.scroller.destroy();
			this.scroller = null;
		}
		if ( id && !(currentViewDescriptor && currentViewDescriptor.scroll === false)) {
			var self = this;
			setTimeout( function() { 
			    
                //use this to mantain scroll position when scroller is destroyed
                var targetDiv = $( $("#"+id ).children()[0] );
                var scrollY= targetDiv.attr( "scrollY" );
                var originalTopMargin = targetDiv.attr( "originalTopMargin" );
                if ( scrollY != undefined && scrollY != "" ){
                  //  console.log( "resetScroller scrollY: " + scrollY)
                  //  targetDiv.css( "margin-top", originalTopMargin );
                    var cssString = "translate3d(0px, "+(originalTopMargin).toString()+"px, 0px)";
                    targetDiv.css( "-webkit-transform", cssString );
                }
			    self.scroller = new iScroll( id ); 
			    if ( scrollY != undefined && scrollY != "" ) {
			        self.scroller.scrollTo( 0, parseInt( scrollY ) );
			    }
			}, 10 );
			//this.scroller = new iScroll( id );
		}
    }
}


ViewNavigator.prototype.refreshScroller = function() {
    
	if ( !this.winPhone ) {
		if ( this.scroller != null ) {
			this.scroller.refresh();
		}
    }
}

ViewNavigator.prototype.animationCompleteHandler = function(removalTarget, headerRemovalTarget, headerView, contentView) {
	var self = this;
	return function() {
		self.animating = false;
        self.resetScroller();
		if ( removalTarget ) {
			removalTarget.unbind( "click" );
			removalTarget.detach();
		}
		if ( headerRemovalTarget ) {
			headerRemovalTarget.unbind( "click" );
			headerRemovalTarget.detach(); 
		}
	}
}

ViewNavigator.prototype.resizeContent = function(event) {

	var targetWidth = this.parent.width();
	if ( this.headerContent )
		this.headerContent.width( targetWidth );
	if ( this.contentViewHolder )
		this.contentViewHolder.width( targetWidth );
}


//GUID logic from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript

ViewNavigator.prototype.S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
ViewNavigator.prototype.guid = function() {
	return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
}



/*  PHONEGAP INTEGRATION */
/*
//android+phonegap specific back button support - will only work if phonegap is used on android (www.phonegap.com)
if ( typeof PhoneGap != 'undefined' ) { 
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
   document.addEventListener("backbutton", onBackKey, false);
}

function onBackKey( event ) {
	event.preventDefault();
	window.viewNavigator.popView();
	for ( var x=0; x<window.backKeyViewNavigators.length; x++ ) {
		window.backKeyViewNavigators[x].popView();
	}
}
*/


/*
THIS SOFTWARE IS PROVIDED BY ANDREW M. TRICE ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL ANDREW M. TRICE OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


var SplitViewNavigator = function( target, toggleButtonLabel, backLinkCSS, bindToWindow ) {
	
	this.animating = false;
	this.animationDuration = 350;
	this.animationPerformed = false;
	
	this.uniqueId = this.guid();
	this.parent = $( target );
	
	var regexp = new RegExp("Windows Phone OS 7");	
	this.winPhone = (navigator.userAgent.search(regexp) >= 0);
	
	this.rootElement = $('<div class="splitViewNavigator_root"></div>');
	this.sidebarContainer = $('<div class="splitViewNavigator_sidebar"></div>');
	this.contentOverlay = $('<div class="content_overlay_hidden" id="overlay'+this.uniqueId+'"></div>');
	this.bodyContainer = $('<div class="splitViewNavigator_body"></div>');
	
	this.sidebarViewNavigator = new ViewNavigator( this.sidebarContainer.get()[0], backLinkCSS, false );	
	
	this.bodyViewNavigator = new ViewNavigator( this.bodyContainer.get()[0], backLinkCSS, false );
	
	this.backLinkCSS = backLinkCSS ? backLinkCSS : "viewNavigator_backButton";
	
	this.toggleSidebarButton = $('<li class="viewNavigator_backButton viewNavigator_backButtonPosition ' + backLinkCSS + '" id="toggle' + this.uniqueId + '" onclick="window.splitViewNavigator.showSidebar()">'+toggleButtonLabel+'</li>');
	
	this.rootElement.append( this.bodyContainer );
	this.rootElement.append( this.contentOverlay );
	
	this.rootElement.append( this.sidebarContainer );
	
	var self = this;
	
	/*if ( "onorientationchange" in window ) {
		$(window).bind( "orientationchange", function(event){ self.resizeContent() } )
	}
	else {*/
		//$(window).resize( function(event){ self.resizeContent() } );
		//alert( this.parent.attr( "id" ) );
		this.parent.resize( function(event){ self.resizeContent() } );
	//}
	
	if ( bindToWindow != false ) {
		$(window).resize( function(event){ self.resizeContent() } );
	}
	else {
		this.parent.resize( function(event){ self.resizeContent() } );
	}
	
	this.resizeContent();
	
	this.parent.append( this.rootElement );
	
	this.contentOverlay.click( function(event){ self.hideSidebar() } );
	
	new NoClickDelay( this.contentOverlay.get()[0] );
	new NoClickDelay( this.toggleSidebarButton.get()[0] );
	window.splitViewNavigator = this;
}


SplitViewNavigator.prototype.resizeContent = function() {

	this.applyStylesByOrientation();
	this.sidebarViewNavigator.resizeContent();	
	this.bodyViewNavigator.resizeContent()
}

SplitViewNavigator.prototype.applyStylesByOrientation = function() {
	var $window = $(window)
    var w = $window.width();
    var h = $window.height();
   
    
    var orientation = (w >= h) ? "landscape" : "portrait";
    this.contentOverlay.removeClass( "content_overlay_visible" ).addClass( "content_overlay_hidden" );
    
    //landscape
    if ( orientation == "landscape" && this.orientation != orientation ) {
    	this.sidebarContainer.removeClass( "sidebar_portrait" ).addClass( "sidebar_landscape" );
    	this.bodyViewNavigator.setHeaderPadding( 0 );
    	this.toggleSidebarButton.remove();
    	if ( this.animationPerformed ) {
    		this.sidebarContainer.css( "left", 0 );
    	}
    	this.bodyContainer.removeClass( "body_portrait" ).addClass( "body_landscape" );
    }
    
    //portrait
    else if ( this.orientation != orientation ) {
    	this.sidebarContainer.removeClass( "sidebar_landscape" ).addClass( "sidebar_portrait" );
    	this.bodyViewNavigator.setHeaderPadding( "70px" );
		this.bodyContainer.append( this.toggleSidebarButton );
    	if ( this.animationPerformed ) {
    		this.sidebarContainer.css( "left", -this.sidebarContainer.width() );
    	}
    	this.bodyContainer.removeClass( "body_landscape" ).addClass( "body_portrait" );
    }
    
    this.orientation = orientation;
}

SplitViewNavigator.prototype.showSidebar = function() {
	this.animationPerformed = true;
	if ( this.orientation == "portrait" ) {
    	this.contentOverlay.removeClass( "content_overlay_hidden" ).addClass( "content_overlay_visible" );
		this.animating = true;
		this.sidebarContainer.animate({
			left:0,
			avoidTransforms:false,
			useTranslate3d: true
		}, this.animationDuration, this.animationCompleteHandler());
    		
	}
}

SplitViewNavigator.prototype.hideSidebar = function() {
	if ( this.orientation == "portrait" ) {
    	this.contentOverlay.removeClass( "content_overlay_visible" ).addClass( "content_overlay_hidden" );
		this.animating = true;
		this.sidebarContainer.animate({
			left:-this.sidebarContainer.width(),
			avoidTransforms:false,
			useTranslate3d: true
		}, this.animationDuration, this.animationCompleteHandler());
    		
	}
}

SplitViewNavigator.prototype.animationCompleteHandler = function() {
	var self = this;
	return function() {
		self.animating = false;
        //self.resetScroller();
	}
}

SplitViewNavigator.prototype.pushSidebarView = function( viewDescriptor ) {
	this.sidebarViewNavigator.pushView( viewDescriptor );
}

SplitViewNavigator.prototype.popSidebarView = function() {
	this.sidebarViewNavigator.popView();
}

SplitViewNavigator.prototype.replaceSidebarView = function( viewDescriptor ) {
	this.sidebarViewNavigator.replaceView( viewDescriptor );
}

SplitViewNavigator.prototype.pushBodyView = function( viewDescriptor ) {
	this.bodyViewNavigator.pushView( viewDescriptor );
}

SplitViewNavigator.prototype.popBodyView = function() {
	this.bodyViewNavigator.popView();
}

SplitViewNavigator.prototype.replaceBodyView = function( viewDescriptor ) {
	this.bodyViewNavigator.replaceView( viewDescriptor );
}




//GUID logic from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript

SplitViewNavigator.prototype.S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
SplitViewNavigator.prototype.guid = function() {
	return (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
}








