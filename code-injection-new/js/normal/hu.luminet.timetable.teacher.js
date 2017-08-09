











//    alert($(window).width());
    

// Scrollers:
// utility per gestire mobiscroll

function Scrollers() {
    
    var DATE_SCROLLER_PRESETS = {
    preset: 'date',
    display: 'bubble',
    animate: 'pop',
    dateFormat: 'd M yy',
    dateOrder: 'dMyy',
    monthNamesShort: dataModel.SHORT_MONTHS,
    headerText: false,
    showLabel: false,
    setText: 'Imposta',
    cancelText: 'Annulla',
    theme: 'android-ics'
    };
    
    
    function prepareScroller(scrollerId, wheelValues, button3ClickHandler, scrollerChangeHandler) {
        var wheels = [{}];
        wheels[0]['Values'] = wheelValues;
        $(scrollerId).mobiscroll({
                                 display: 'bubble',
                                 animate: 'pop',
                                 mode: 'scroller',
                                 setText: 'Imposta',
                                 cancelText: 'Annulla',
                                 button3Text: 'Modifica',
                                 button3: button3ClickHandler,
                                 headerText: false,
                                 showLabel: false,
                                 theme: 'android-ics',
                                 wheels: wheels,
                                 onChange: scrollerChangeHandler
                                 });
    }
    
    
    // Converte una data da formato ISO a formato carino
    this.formatIsoDate = function (isoDate) {
        var date = Date.parseIsoDate(isoDate);
        return $.mobiscroll.formatDate('d M yy', date, DATE_SCROLLER_PRESETS);
    }
    
    
    // Converte una data da formato ISO a formato carino
    this.parseToIsoDate = function (formattedDate) {
        var date = $.mobiscroll.parseDate('d M yy', formattedDate, DATE_SCROLLER_PRESETS);
        return date.toIsoDate();
    }
    
    
    this.prepareDateScroller = function (scrollerId) {
        $(scrollerId).mobiscroll(DATE_SCROLLER_PRESETS);
    }
    
    
    this.preparePlaceScroller = function (scrollerId, timeTable, button3ClickHandler, scrollerChangeHandler) {
        var i;
        var place;
        var placeWheel = {};
        placeWheel[0] = '<div>vuoto</div>';
        for (i = 1; i < timeTable.places.length; i++) {
            place = timeTable.places[i];
            placeWheel[i] = '<div>' + place.name + '</div>';
        }
        prepareScroller(scrollerId, placeWheel, button3ClickHandler, scrollerChangeHandler);
    }
    
    
    this.prepareSubjectScroller = function (scrollerId, timeTable, button3ClickHandler, scrollerChangeHandler) {
        var i;
        var subject;
        var subjectWheel = {};
        subjectWheel[0] = '<div>vuoto</div>';
        for (i = 1; i < timeTable.subjects.length; i++) {
            subject = timeTable.subjects[i];
            if (subject) {
                subjectWheel[i] = '<div class="scrollerItem" style="background-color:' + subject.color + '">' + subject.name + '</div>';
            }
        }
        prepareScroller(scrollerId, subjectWheel, button3ClickHandler, scrollerChangeHandler);
    }
    
    
    this.prepareTimeScroller = function (scrollerId, scrollerChangeHandler) {
        $(scrollerId).mobiscroll({
                                 preset: 'time',
                                 display: 'bubble',
                                 animate: 'pop',
                                 stepMinute: 5,
                                 timeFormat: 'H:ii',
                                 timeWheels: 'Hii',
                                 setText: 'Imposta',
                                 cancelText: 'Annulla',
                                 headerText: false,
                                 showLabel: false,
                                 theme: 'android-ics',
                                 hourText: 'Ore',
                                 minuteText: 'Minuti',
                                 onChange: scrollerChangeHandler
                                 });
    }
    
}


var scrollers = new Scrollers();


// Enable strict mode
'use strict';


function log(x) {
    var s = '';
    $.each( x, function(i, n) {
           s += '' + i + ': ' + n + '\n';
           });
    alert(s);
}


// Aggiunte al prototipo Date

Date.prototype.MILLISECONDS_IN_A_DAY = 86400000;


Date.parseIsoDate = function (isoDate) {
    var dateParts = isoDate.split('-');
    var result = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    
    return result;
}


Date.prototype.toIsoDate = function () {
    // Non conviene usare toISOString() perché ritorna la data relativa a UTC,
    // che non corrisponde con la nostra data nelle prime due ore del giorno.
    //
    // return this.toISOString().substring(0, 10);
    var year = this.getFullYear();
    var month = this.getMonth() + 1;
    var day = this.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    return year + '-' + month + '-' + day;
}


// Aggiunge un certo numero di giorni ad una data. Può essere un numero di giorni negativo
Date.prototype.addDays = function (numberOfDays) {
    this.setTime(this.getTime() + numberOfDays * this.MILLISECONDS_IN_A_DAY);
}


// Ritorna il lunedì precedente alla data.
// Se la data è lunedì, ritorna la data stessa.
// Se la data è domenica, ritorna il lunedì successivo.
Date.prototype.getGoodMonday = function () {
    var result = new Date(this.getTime());
    var currentDay = this.getDay(); // Il giorno corrente, un numero da 0 a 6 (da domenica a sabato)
    if (currentDay == 0) {
        result.addDays(1);
    } else {
        result.addDays(-(currentDay - 1));
    }
    return result;
}


// Prototype for Subject objects (materie)

function Subject() {
    this.name = '';
    this.color = '';
}


// Prototype for Place objects (aule)

function Place() {
    this.name = '';
}


// Prototype per oggetti PlanEntry
//
// time è una stringa del tipo '8:30'
// subjectId e placeId: in questo caso 'undefined' e 0 hanno lo stesso significato,
// cioè la materia o l'aula non sono indicati.
// Quando possibile preferisco 'undefined' perché riduce l'occupazione di memoria dell'orario.
function PlanEntry(time) {
    this.time = time;
    this.subjectId = undefined;
    this.placeId = undefined;
}


// Prototype for CalendarEntry objects
//
// subjectId può essere:
//   undefined: non c'è override, c'è la materia originale
//   0: override a 'vuoto', ovvero 'nessuna materia'
//   1..N: override alla materia n-esima
// placeId: stesso discorso.
// noteType: deve essere diverso da zero affinché la nota sia valida
function CalendarEntry() {
    this.subjectId = undefined;
    this.placeId = undefined;
    this.noteType = 0;
    this.noteText = '';
}


// Prototype per oggetti TimeTable

function TimeTable() {
    
    var today = new Date();
    var year = today.getFullYear();
    if (today.getMonth() < 6) {
        year--;
    }
    this.firstIsoDate = year + '-09-01';
    this.lastIsoDate = (year + 1) + '-06-30';
    this.name = '';
    
    this.subjects = []; // Array di materie
    this.places = []; // Array di aule
    this.plan = []; // Array di array
    // vacations: l'importante è l'esistenza dell'elemento che indica l'esistenza della vacanza:
    this.vacations = {} // Dictionary dove la chiave è la data; ogni elemento ha valore TRUE.
    this.calendar = {}; // Dictionary dove la chiave è la data; ogni elemento è un dictionary dove la chiave è l'ora di lezione


    this.getNumberOfHoursPerDay = function () {
        // Il numero delle ore del lunedì
        return this.plan[1].length;
    }
    
    
    this.getCalendarEntry = function (isoDate, hour) {
        var calendarDay = this.calendar[isoDate];
        return calendarDay ? calendarDay[hour] : null;
    }

    
    this.setCalendarEntry = function (isoDate, hour, calendarEntry) {
        if (!this.calendar[isoDate]) {
            this.calendar[isoDate] = {};
        }
        this.calendar[isoDate][hour] = calendarEntry;
    }
    
   
    this.deletePlace = function (placeId) {
        for (var calendarDay in this.calendar) {
            for (var calendarEntry in calendarDay) {
                if (calendarEntry.placeId == placeId) {
                    calendarEntry.placeId = undefined;
                }
            }
        }
        var i, j;
        var planEntry;
        for (i = 1; i < this.plan.length; i++) {
            for (j = 0; j < this.plan[i].length; j++) {
                planEntry = this.plan[i][j];
                if (planEntry.placeId == placeId) {
                    planEntry.placeId = 0;
                }
            }
        }
        delete this.places[placeId];
    }
    
    
    this.deleteSubject = function (subjectId) {
        for (var calendarDay in this.calendar) {
            for (var calendarEntry in calendarDay) {
                if (calendarEntry.subjectId == subjectId) {
                    calendarEntry.subjectId = undefined;
                }
            }
        }
        var i, j;
        var planEntry;
        for (i = 1; i < this.plan.length; i++) {
            for (j = 0; j < this.plan[i].length; j++) {
                planEntry = this.plan[i][j];
                if (planEntry.subjectId == subjectId) {
                    planEntry.subjectId = 0;
                }
            }
        }
        delete this.subjects[subjectId];
    }
    
    

    this.populate = function () {
        var TIMES = ['8:30', '9:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30'];
        var today = new Date();
        var year = today.getFullYear();
        if (today.getMonth() < 6) {
            year--;
        }
        
        this.name = 'Nuovo orario';
        
        this.firstIsoDate = year + '-09-01';
        this.lastIsoDate = (year + 1) + '-06-30';
        this.subjects = [
                         null,
                         { name: 'Italiano', color: '#004A99'},
                         { name: 'Storia', color: '#E95E10'},
                         { name: 'Geografia', color: '#F39500'},
                         { name: 'Matematica', color: '#E1111D'},
                         { name: 'Ed. fisica', color: '#97BE0D'},
                         { name: 'Scienze', color: '#42A62B'}
                         ]; // Array di materie
        this.places = []; // Array di aule
        this.plan = [];
        this.calendar = {};
        
        var i, j;
        var dayPlan;
        // NOTA: lascio vuoto lo slot "0", quello della domenica, per eventuali miglioramenti futuri
        for (i = 1; i < 7; i++) {
            dayPlan = [];
            for (j = 0; j < TIMES.length; j++) {
                dayPlan[j] = new PlanEntry(TIMES[j]);
            }
            this.plan[i] = dayPlan;
        }
    }
    
    
    this.loadFromObject = function (timeTableObject) {
        this.name = timeTableObject.name;
        this.isOld = timeTableObject.isOld;
        this.subjects = timeTableObject.subjects;
        this.places = timeTableObject.places;
        this.plan = timeTableObject.plan;
        this.calendar = timeTableObject.calendar || {};
        if (timeTableObject.vacations) {
            this.vacations = timeTableObject.vacations;
        }
        if (timeTableObject.firstIsoDate) {
            this.firstIsoDate = timeTableObject.firstIsoDate;
        }
        if (timeTableObject.lastIsoDate) {
            this.lastIsoDate = timeTableObject.lastIsoDate;
        }
    }


    this.loadFromShareableString = function (shareableString) {
        
        var sourceObject = JSON.parse(shareableString);
        this.calendar = {};
        this.subjects = [];
        this.places = [];
        this.plan = [];
        
        var i;
        
        var subject;
        var subjectId;
        var sourceSubject;
        var sourceSubjects = sourceObject['class'];
        for (i = 0; i < sourceSubjects.length; i++) {
            sourceSubject = sourceSubjects[i];
            subjectId = sourceSubject.id;
            subject = new Subject();
            subject.name = sourceSubject.name;
            subject.color = sourceSubject.color;
            this.subjects[subjectId] = subject;
        }
        
        var place;
        var placeId;
        var sourcePlace;
        var sourcePlaces = sourceObject.place;
        for (i = 0; i < sourcePlaces.length; i++) {
            sourcePlace = sourcePlaces[i];
            placeId = sourcePlace.id;
            place = new Place();
            place.name = sourcePlace.name;
            this.places[placeId] = place;
        }
        
        var dayPlan;
        var planEntry;
        var sourcePlanEntry;
        var sourcePlan = sourceObject.plan;
        for (i = 0; i < sourcePlan.length; i++) {
            sourcePlanEntry = sourcePlan[i];
            planEntry = new PlanEntry();
            planEntry.time = sourcePlanEntry.time;
            planEntry.subjectId = sourcePlanEntry.class_id || 0;
            planEntry.placeId = sourcePlanEntry.place_id || 0;
            dayPlan = this.plan[sourcePlanEntry.day];
            if (!dayPlan) {
                dayPlan = [];
            }
            dayPlan[sourcePlanEntry.hour - 1] = planEntry;
            this.plan[sourcePlanEntry.day] = dayPlan;
            // this.plan[sourcePlanEntry.day][sourcePlanEntry.hour] = planEntry;
        }
        
        var sourceCalendar = sourceObject.calendar;
        if (sourceCalendar) {
            var hour;
            var isoDate;
            var calendarDay;
            var calendarEntry;
            var sourceCalendarEntry;
            for (i = 0; i < sourceCalendar.length; i++) {
                sourceCalendarEntry = sourceCalendar[i];
                hour = sourceCalendarEntry.hour;
                isoDate = sourceCalendarEntry.date;
                calendarDay = this.calendar[isoDate] || {};
                calendarEntry = new CalendarEntry();
                calendarEntry.subjectId = sourceCalendarEntry.class_id;
                calendarEntry.placeId = sourceCalendarEntry.place_id;
                calendarEntry.noteType = sourceCalendarEntry.note_type;
                calendarEntry.noteText = sourceCalendarEntry.note;
                calendarDay[hour] = calendarEntry;
                this.calendar[isoDate] = calendarDay;
            }
        }
        
        this.name = 'Orario caricato';
        this.isOld = true;
    }
}


// Data Model

function DataModel() {
    
    this.DAYS = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
    this.SHORT_DAYS = ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'];
    this.SHORT_MONTHS = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
    this.MONTHS = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
    this.HOLIDAYS = ['01-01', '01-06', '04-25', '05-01', '06-02', '11-01', '12-08', '12-25', '12-26'];
    this.NOTE_LABELS = ['', 'Nota libera', 'Compito in classe', 'Interrogazione'];
    
    this.timeTables = [];
    
    
    this.isHolidayDate = function (date) {
        var result = (date.getDay() == 0); // Domenica.
        if (!result) {
            var isoMonthDayDate = date.toIsoDate().substr(5, 5);
            var i;
            for (i = 0; i < this.HOLIDAYS.length; i++) {
                if (isoMonthDayDate == this.HOLIDAYS[i]) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }


    function errorHandler(transaction, error) {
        // alert('Oops. Error was ' + error.message + ' (Code ' + error.code + ')');
        var newTimeTable = new TimeTable();
        newTimeTable.populate();
        dataModel.timeTables = [newTimeTable];
        dataModel.save();
        // Handler memorizzato da load()
        dataModel.dataLoadedHandler();
    }
    
    
    function resultsHandler(database, results, timeTable, propertyName, doneHandler) {
        var tmp = [];
        var rows = results.rows;
        for (var i = 0 ; i < rows.length; i++) {
            var row = rows.item(i);
            tmp = tmp.concat(row);
        }
        timeTable[propertyName] = tmp;
        doneHandler(database, timeTable);
    }
    
    
    function dumpTable(database, tableName, timeTable, propertyName, doneHandler) {
        database.transaction(function (transaction) {
                             var sql = 'SELECT * FROM ' + tableName;
                             transaction.executeSql(sql, [], function(transaction, results) { resultsHandler(database, results, timeTable, propertyName, doneHandler); }, errorHandler);
                             });
        
    }
    
    
    function step1(ttdb, timeTable) {
        dumpTable(ttdb, 'class', timeTable, 'class', step2);
    }
    
    
    function step2(ttdb, timeTable) {
        dumpTable(ttdb, 'place', timeTable, 'place', step3);
    }
    
    
    function step3(ttdb, timeTable) {
        dumpTable(ttdb, 'calendar', timeTable, 'calendar', step4);
    }
    
    
    function step4(ttdb, timeTable) {
        dumpTable(ttdb, 'plan', timeTable, 'plan', step5);
    }
    
    
    function step5(ttdb, timeTable) {
        var newTimeTable = new TimeTable();
        newTimeTable.loadFromShareableString(JSON.stringify(timeTable));
        newTimeTable.name = 'Orario';
        dataModel.timeTables = [newTimeTable];
        dataModel.save();
        // Handler memorizzato da load()
        dataModel.dataLoadedHandler();
    }
    
    
    // Serve solo nel caso di primo avvio dopo upgrade da vecchia versione
    this.loadFromDatabase = function () {
        // Intanto preparo una nuova timetable
        var tmpTimeTable = {};
        
        // Poi vedo se c'è qualcosa sul db
        var shortName = 'ttdb';
        var version = '1.0';
        var displayName = 'TimeTable';
        var maxSize = 2*1024*1024; // in bytes
        
        var ttdb = openDatabase(shortName, version, displayName, maxSize);
        
        // E' tutto un incastro con le funzioni dumpTable e resultsHandler
        step1(ttdb, tmpTimeTable);
    }
    
    
    this.loadFromJsonString = function (jsonTimeTables) {
        var tmpTimeTables;
        var tmpTimeTable;
        var timeTable;
        var i;
        
        this.timeTables = [];
        if (jsonTimeTables) {
            tmpTimeTables = JSON.parse(jsonTimeTables);
            for (i = 0; i < tmpTimeTables.length; i++) {
                tmpTimeTable = tmpTimeTables[i];
                if (tmpTimeTable) {
                    timeTable = new TimeTable();
                    timeTable.loadFromObject(tmpTimeTable);
                    this.timeTables.push(timeTable);
                }
            }
        }
        
        if (this.timeTables.length == 0) {
            // Se non ho caricato nulla,
            // creo un timetable di default
            timeTable = new TimeTable();
            timeTable.populate();
            this.timeTables.push(timeTable);
        }
        // Handler memorizzato da load()
        this.dataLoadedHandler();
    }

    
    this.load = function (dataLoadedHandler) {
        // Salvo l'handler
        this.dataLoadedHandler = dataLoadedHandler;
        
        var jsonTimeTables;
        try {
            jsonTimeTables = localStorage.timeTables;
            if (jsonTimeTables) {
                this.loadFromJsonString(jsonTimeTables);
            } else {
                this.loadFromDatabase();
            }
        }
        catch (e) {
            alert(e);
        }
    }
    
    
    this.save = function () {
        var jsonTimeTables = JSON.stringify(this.timeTables);
        localStorage.timeTables = jsonTimeTables;
    }
}


var dataModel = new DataModel();



// Html Builder:
// utility per generare il codice Html

// Dipende dall'orario, che è un parametro che va impostato prima di usare questo modulo

function HtmlBuilder() {
    
    // L'orario: va impostato prima di chiamare questo modulo
    this.timeTable = null;
    
    
    this.valueForPlace = function(placeId) {
        var place = placeId ? this.timeTable.places[placeId] : null;
        var value = place ? place.name : '<span class="iconButton buttonEdit"></span>';
        return value;
    }
    
    
    this.snippetForHour = function(hour) {
        return '<td class="hour"><div class="value">' + (hour + 1) + 'ª ora</div></td>';
    }
    
    
    this.snippetForTime = function(time) {
        return '<td class="time"><div class="value">' + time + '</div></td>';
    }
    
    
    this.snippetForSubject = function(date, hour, isShort) {
        var result;
        
        if (dataModel.isHolidayDate(date)) {
            result = '<td class="holiday"></td>';
            return result;
        }
        
        var isoDate = date.toIsoDate();
        
        if (this.timeTable.vacations[isoDate]) {
            result = '<td class="vacationDay"></td>';
            return result;
        }
        
        var planEntry = this.timeTable.plan[date.getDay()][hour];
        
        var subjectId = planEntry.subjectId;
        var isSubjectOverridden = false;
        var noteType = 0;
        
        var calendarEntry = this.timeTable.getCalendarEntry(isoDate, hour);
        if (calendarEntry) {
            isSubjectOverridden = (calendarEntry.subjectId != undefined);
            if (isSubjectOverridden) {
                subjectId = calendarEntry.subjectId;
            }
            noteType = calendarEntry.noteType;
        }
        
        var subject = subjectId ? this.timeTable.subjects[subjectId] : null;
        
        var value;
        if (isShort) {
            value = subject ? subject.name.substr(0, 2) : '…';
        } else {
            value = subject ? subject.name : 'vuoto';
        }
        
        var attributes = ' date="' + date.toIsoDate() + '" hour="' + hour + '"';
        if (subjectId) {
            attributes += ' subjectId="' + subjectId + '"';
        }
        if (isSubjectOverridden) {
            attributes += ' isOverridden="true"';
        }
        if (noteType) {
            attributes += ' noteType="' + noteType + '"';
        }
        var style = subject ? ' style="background-color:' + subject.color + '"' : '';
        result = '<td class="subject"' + attributes + '><div class="value"' + style + '><span>' + value + '</span><div class="overlay"></div><div class="note"></div></div></td>';
        return result;
    }
    
    
    this.snippetForPlannedSubject = function (day, hour) {
        var planEntry = this.timeTable.plan[day][hour];
        
        var subjectId = planEntry.subjectId;
        
        var subject = subjectId ? this.timeTable.subjects[subjectId] : null;
        
        var value;
        value = subject ? subject.name : 'vuoto';
        
        var attributes = '';
        if (subjectId) {
            attributes += ' subjectId="' + subjectId + '"';
        }
        var style = subject ? 'style="background-color:' + subject.color + '"' : '';
        var result = '<td class="subject"' + attributes + '><div class="value"' + style + '>' + value + '</div></td>';
        return result;
    }
    
    
    this.snippetForPlannedPlace = function (day, hour) {
        var planEntry = this.timeTable.plan[day][hour];
        
        var placeId = planEntry.placeId;
        
        var value = this.valueForPlace(placeId);
        
        var attributes = '';
        if (placeId) {
            attributes += ' placeId="' + placeId + '"';
        }
        var result = '<td class="place"' + attributes + '><div class="value">' + value + '</div></td>';
        return result;
    }
    
    
    this.snippetForNote = function (date, hour) {
        var calendarEntry = this.timeTable.getCalendarEntry(date.toIsoDate(), hour);
        var noteType = 0;
        if (calendarEntry) {
            noteType = calendarEntry.noteType;
        }
        var attributes = '';
        if (noteType) {
            attributes += ' noteType="' + noteType + '"';
        }
        var result = '<td class="note"' + attributes + '><div class="value"></div></td>';
        return result;
    }
    
    
    this.snippetForNoteAtIsoDate = function (isoDate) {
        var result = '';
        var calendarDay = this.timeTable.calendar[isoDate];
        if (calendarDay) {
            for (var hour in calendarDay) {
                var calendarEntry = calendarDay[hour];
                if (calendarEntry.noteType > 0) {
                    var subject;
                    if (calendarEntry.subjectId) {
                        subject = this.timeTable.subjects[calendarEntry.subjectId];
                    } else {
                        var day = (Date.parseIsoDate(isoDate)).getDay();
                        var planEntry = this.timeTable.plan[day][hour];
                        if (planEntry) {
                            var subjectId = planEntry.subjectId;
                            if (subjectId) {
                                subject = this.timeTable.subjects[subjectId];
                            }
                        }
                    }
                    if (subject) {
                        var style = ' style="background-color:' + subject.color + '"';
                    }
                    result = '<div class="note" notetype="' + calendarEntry.noteType + '"' + style + '></div>';
                }
            }
        }
        return result;
    }
    
    
    this.snippetForPlace = function (date, hour) {
        var calendarEntry = this.timeTable.getCalendarEntry(date.toIsoDate(), hour);
        var placeId; // undefined
        if (calendarEntry) {
            placeId = calendarEntry.placeId;
        }
        // Non c'è override: vado a vedere il plan
        if (typeof placeId === 'undefined') {
            var planEntry = this.timeTable.plan[date.getDay()][hour];
            placeId = planEntry.placeId;
        }
        var attributes = '';
        if (placeId) {
            attributes += ' placeId="' + placeId + '"';
        }

        var value = this.valueForPlace(placeId);
        var result = '<td class="place"' + attributes + '><div class="value">' + value + '</div></td>';
        return result;
    }
    
}




$(document).ready(onDeviceReady);

function onDeviceReady() {
// document.body.style.zoom = $(window).width() / 640;
    application.name = 'te';
}


// Enable strict mode
'use strict';

function PageDelegate() {
    
    function showError() {
        $('div.headline').addClass('error');
        $('div.headline').html('Non è stato possible condividere l\'orario');
        $('p.latin').addClass('error');
        $('p.latin').addClass('info');
        $('p.latin').html('Riprova dopo esserti assicurato di essere online');
        $('div.hint').hide();
        $('input.single').hide();
    }
    
    
    function showSuccess() {
        $('div.headline').removeClass('error');
        $('div.headline').html('Caricamento orario riuscito');
        $('p.latin').hide();
        $('input.single').hide();
        $('div.button').hide();
    }
    
    
    function dataSentHandler(data, textStatus) {
        $('#code').val(data);

        // showSuccess();
    }

    
    this.bindEventHandlers = function () {
        var currentTimeTable = application.getCurrentTimeTable();
        // Voglio salvare tutti i campi di currentTimeTable, tranne 'calendar'
        // Faccio una copia il calendario: non è il modo più efficente,
        // ma sono sicuro di non dimenticare delle proprietà.
        var timeTableToSave = JSON.parse(JSON.stringify(currentTimeTable));
        // Elimino dalla copia la proprietà 'calendar'
        delete timeTableToSave.calendar;

        // Preparo i dati da inviare.
        // Si tratta di un oggetto con la sola proprietà 'content';
        // serve per eventuali upgrade futuri, servisse aggiungere altre proprietà senza compromettere l'attuale funzionamento.
        // content è una stringa in formato JSON del calendario, che verrà memorizzata così come è nel database.
        // L'oggetto viene poi ulteriormente trasformato in JSON per inviarlo al server.
        var jsonTimeTable = JSON.stringify({ content: JSON.stringify(timeTableToSave) });
        
        $.ajax({
               type: 'POST',
               url: 'http://orario.pearson.it/1/timeTables/',
               contentType: 'application/json',
               data: jsonTimeTable,
               timeout: 3000
               }).success(dataSentHandler).error(showError);
    }
    
    
    this.update = function () {
        
    };
    
}


application.pageDelegate = new PageDelegate();



(function(a){a.widget("mobile.jqmMobiscroll",a.mobile.widget,{options:{theme:"jqm",preset:"date",animate:"pop"},_create:function(){var j=this.element,z=a.extend(this.options,j.jqmData("options"));j.mobiscroll(z)}});a(document).bind("pagebeforecreate",function(j){a('input[type="date"]:jqmData(role="mobiscroll")',j.target).prop("type","text")});a(document).bind("pagecreate create",function(j){a(document).trigger("mobiscrollbeforecreate");a(':jqmData(role="mobiscroll")',j.target).each(function(){"undefined"===
typeof a(this).data("mobiscroll")&&a(this).jqmMobiscroll()})})})(jQuery);(function(a){function j(b,k){function n(b){return a.isArray(i.readonly)?(b=a(".dwwl",t).index(b),i.readonly[b]):i.readonly}function r(b){var a='<div class="dw-bf">',d=1,c;for(c in Y[b])0==d%20&&(a+='</div><div class="dw-bf">'),a+='<div class="dw-li dw-v" data-val="'+c+'" style="height:'+I+"px;line-height:"+I+'px;"><div class="dw-i">'+Y[b][c]+"</div></div>",d++;return a+"</div>"}function p(b){c=a(".dw-li",b).index(a(".dw-v",b).eq(0));e=a(".dw-li",b).index(a(".dw-v",b).eq(-1));y=a(".dw-ul",t).index(b);
h=I;l=m}function j(b){var a=i.headerText;return a?"function"==typeof a?a.call(R,b):a.replace(/\{value\}/i,b):""}function ea(){m.temp=W&&(null!==m.val&&m.val!=D.val()||!D.val().length)||null===m.values?i.parseValue(D.val()||"",m):m.values.slice(0);m.setValue(!0)}function B(b,c,d,q){!1!==L("validate",[t,c])&&a(".dw-ul",t).each(function(d){var e=a(this),f=a('.dw-li[data-val="'+m.temp[d]+'"]',e),k=a(".dw-li",e),i=k.index(f),C=k.length,A=d==c||void 0===c;if(!f.hasClass("dw-v")){for(var v=f,K=0,s=0;0<=
i-K&&!v.hasClass("dw-v");)K++,v=k.eq(i-K);for(;i+s<C&&!f.hasClass("dw-v");)s++,f=k.eq(i+s);(s<K&&s&&2!==q||!K||!v.hasClass("dw-v")||1==q)&&f.hasClass("dw-v")?i+=s:(f=v,i-=K)}if(!f.hasClass("dw-sel")||A)m.temp[d]=f.attr("data-val"),a(".dw-sel",e).removeClass("dw-sel"),f.addClass("dw-sel"),m.scroll(e,d,i,b)});m.change(d)}function aa(b){if(!("inline"==i.display||S===a(window).width()&&ba===a(window).height()&&b)){var d,c,f,q,e,k,C,A,K,v=0,s=0,b=a(window).scrollTop();q=a(".dwwr",t);var m=a(".dw",t),g=
{};e=void 0===i.anchor?D:i.anchor;S=a(window).width();ba=a(window).height();M=(M=window.innerHeight)||ba;/modal|bubble/.test(i.display)&&(a(".dwc",t).each(function(){d=a(this).outerWidth(!0);v+=d;s=d>s?d:s}),d=v>S?s:v,q.width(d));U=m.outerWidth();N=m.outerHeight(!0);"modal"==i.display?(c=(S-U)/2,f=b+(M-N)/2):"bubble"==i.display?(K=!0,A=a(".dw-arrw-i",t),c=e.offset(),k=c.top,C=c.left,q=e.outerWidth(),e=e.outerHeight(),c=C-(m.outerWidth(!0)-q)/2,c=c>S-U?S-(U+20):c,c=0<=c?c:20,f=k-N,f<b||k>b+M?(m.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"),
f=k+e):m.removeClass("dw-bubble-bottom").addClass("dw-bubble-top"),A=A.outerWidth(),q=C+q/2-(c+(U-A)/2),a(".dw-arr",t).css({left:q>A?A:q})):(g.width="100%","top"==i.display?f=b:"bottom"==i.display&&(f=b+M-N));g.top=0>f?0:f;g.left=c;m.css(g);a(".dw-persp",t).height(0).height(f+N>a(document).height()?f+N:a(document).height());K&&(f+N>b+M||k>b+M)&&a(window).scrollTop(f+N-M)}}function z(b){if("touchstart"===b.type)P=!0,setTimeout(function(){P=!1},500);else if(P)return P=!1;return!0}function L(b,c){var d;
c.push(m);a.each([Z,k],function(a,f){f[b]&&(d=f[b].apply(R,c))});return d}function ka(b){var a=+b.data("pos")+1;o(b,a>e?c:a,1)}function la(b){var a=+b.data("pos")-1;o(b,a<c?e:a,2)}var fa,I,Q,t,S,M,ba,U,N,T,ga,m=this,ca=a.mobiscroll,R=b,D=a(R),da,ha,i=s({},$),Z={},Y=[],X={},W=D.is("input"),V=!1;m.enable=function(){i.disabled=!1;W&&D.prop("disabled",!1)};m.disable=function(){i.disabled=!0;W&&D.prop("disabled",!0)};m.scroll=function(b,a,c,d,q,e){function k(){clearInterval(X[a]);X[a]=void 0;b.data("pos",
c).closest(".dwwl").removeClass("dwa")}var i=(fa-c)*I,A,e=e||F;b.attr("style",(d?v+"-transition:all "+d.toFixed(1)+"s ease-out;":"")+(f?v+"-transform:translate3d(0,"+i+"px,0);":"top:"+i+"px;"));X[a]&&k();d&&void 0!==q?(A=0,b.closest(".dwwl").addClass("dwa"),X[a]=setInterval(function(){A+=0.1;b.data("pos",Math.round((c-q)*Math.sin(A/d*(Math.PI/2))+q));A>=d&&(k(),e())},100),L("onAnimStart",[a,d])):(b.data("pos",c),e())};m.setValue=function(b,a,c,d){d||(m.values=m.temp.slice(0));V&&b&&B(c);a&&(Q=i.formatResult(m.temp),
m.val=Q,W&&D.val(Q).trigger("change"))};m.validate=function(b,a){B(0.2,b,!0,a)};m.change=function(b){Q=i.formatResult(m.temp);"inline"==i.display?m.setValue(!1,b):a(".dwv",t).html(j(Q));b&&L("onChange",[Q])};m.changeWheel=function(b,c){if(t){var d=0,f,q,e=b.length;for(f in i.wheels)for(q in i.wheels[f]){if(-1<a.inArray(d,b)&&(Y[d]=i.wheels[f][q],a(".dw-ul",t).eq(d).html(r(d)),e--,!e)){aa();B(c);return}d++}}};m.isVisible=function(){return V};m.tap=function(b,a){var d,c;b.bind("touchstart",function(b){b.preventDefault();
d=!1;c=!0}).bind("touchmove",function(){d=!0}).bind("touchend",function(b){d||a.call(this,b)}).bind("click",function(b){c||a.call(this,b)})};m.show=function(b){if(i.disabled||V)return!1;"top"==i.display&&(T="slidedown");"bottom"==i.display&&(T="slideup");ea();L("onBeforeShow",[t]);var c=0,f,e="";T&&!b&&(e="dw-"+T+" dw-in");for(var k='<div class="dw-trans '+i.theme+" dw-"+i.display+'">'+("inline"==i.display?'<div class="dw dwbg dwi"><div class="dwwr">':'<div class="dw-persp"><div class="dwo"></div><div class="dw dwbg '+
e+'"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr">'+(i.headerText?'<div class="dwv"></div>':"")),b=0;b<i.wheels.length;b++){k+='<div class="dwc'+("scroller"!=i.mode?" dwpm":" dwsc")+(i.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';for(f in i.wheels[b])Y[c]=i.wheels[b][f],k+='<td><div class="dwwl dwrc dwwl'+c+'">'+("scroller"!=i.mode?'<div class="dwwb dwwbp" style="height:'+I+"px;line-height:"+I+'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+
I+"px;line-height:"+I+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+f+'</div><div class="dww" style="height:'+i.rows*I+"px;min-width:"+i.width+'px;"><div class="dw-ul">',k+=r(c),k+='</div><div class="dwwo"></div></div><div class="dwwol"></div></div></td>',c++;k+="</tr></table></div></div>"}k+=("inline"!=i.display?'<div class="dwbc'+(i.button3?" dwbc-p":"")+'"><span class="dwbw dwb-s"><span class="dwb">'+i.setText+"</span></span>"+(i.button3?'<span class="dwbw dwb-n"><span class="dwb">'+
i.button3Text+"</span></span>":"")+'<span class="dwbw dwb-c"><span class="dwb">'+i.cancelText+"</span></span></div></div>":'<div class="dwcc"></div>')+"</div></div></div>";t=a(k);B();L("onMarkupReady",[t]);"inline"!=i.display?(t.appendTo("body"),setTimeout(function(){t.removeClass("dw-trans").find(".dw").removeClass(e)},350)):D.is("div")?D.html(t):t.insertAfter(D);V=!0;da.init(t,m);"inline"!=i.display&&(m.tap(a(".dwb-s span",t),function(){if(m.hide(false,"set")!==false){m.setValue(false,true);L("onSelect",
[m.val])}}),m.tap(a(".dwb-c span",t),function(){m.cancel()}),i.button3&&m.tap(a(".dwb-n span",t),i.button3),i.scrollLock&&t.bind("touchmove",function(b){N<=M&&U<=S&&b.preventDefault()}),a("input,select,button").each(function(){a(this).prop("disabled")||a(this).addClass("dwtd").prop("disabled",true)}),aa(),a(window).bind("resize.dw",function(){clearTimeout(ga);ga=setTimeout(function(){aa(true)},100)}));t.delegate(".dwwl","DOMMouseScroll mousewheel",function(b){if(!n(this)){b.preventDefault();var b=
b.originalEvent,b=b.wheelDelta?b.wheelDelta/120:b.detail?-b.detail/3:0,c=a(".dw-ul",this),d=+c.data("pos"),d=Math.round(d-b);p(c);o(c,d,b<0?1:2,true,d)}}).delegate(".dwb, .dwwb",J,function(){a(this).addClass("dwb-a")}).delegate(".dwwb",J,function(b){b.stopPropagation();b.preventDefault();var c=a(this).closest(".dwwl");if(z(b)&&!n(c)&&!c.hasClass("dwa")){d=true;var f=c.find(".dw-ul"),k=a(this).hasClass("dwwbp")?ka:la;p(f);clearInterval(g);g=setInterval(function(){k(f)},i.delay);k(f)}}).delegate(".dwwl",
J,function(b){b.preventDefault();if(z(b)&&!w&&!n(this)&&!d&&i.mode!="clickpick"){w=true;a(document).bind(O,ia);u=a(".dw-ul",this);u.closest(".dwwl").addClass("dwa");q=+u.data("pos");p(u);C=X[y]!==void 0;E=G(b);ja=new Date;x=E;m.scroll(u,y,q)}});L("onShow",[t,Q])};m.hide=function(b,c){if(!1===L("onClose",[Q,c]))return!1;a(".dwtd").prop("disabled",!1).removeClass("dwtd");D.blur();t&&("inline"!=i.display&&T&&!b?(a(".dw",t).addClass("dw-"+T+" dw-out"),setTimeout(function(){t.remove();t=null},350)):(t.remove(),
t=null),V=!1,a(window).unbind(".dw"))};m.cancel=function(){!1!==m.hide(!1,"cancel")&&L("onCancel",[m.val])};m.init=function(b){da=s({defaults:{},init:F},ca.themes[b.theme||i.theme]);ha=ca.i18n[b.lang||i.lang];s(k,b);s(i,da.defaults,ha,k);m.settings=i;D.unbind(".dw");if(b=ca.presets[i.preset])Z=b.call(R,m),s(i,Z,k),s(A,Z.methods);fa=Math.floor(i.rows/2);I=i.height;T=i.animate;void 0!==D.data("dwro")&&(R.readOnly=H(D.data("dwro")));V&&m.hide();"inline"==i.display?m.show():(ea(),W&&i.showOnFocus&&(D.data("dwro",
R.readOnly),R.readOnly=!0,D.bind("focus.dw",function(){m.show()})))};m.values=null;m.val=null;m.temp=null;m.init(k)}function z(b){for(var a in b)if(void 0!==k[b[a]])return!0;return!1}function G(b){var a=b.originalEvent,c=b.changedTouches;return c||a&&a.changedTouches?a?a.changedTouches[0].pageY:c[0].pageY:b.pageY}function H(b){return!0===b||"true"==b}function r(b,a,c){b=b>c?c:b;return b<a?a:b}function o(b,d,f,k,q){var d=r(d,c,e),A=a(".dw-li",b).eq(d),C=y,k=k?d==q?0.1:Math.abs(0.1*(d-q)):0;l.scroll(b,
C,d,k,q,function(){l.temp[C]=A.attr("data-val");l.validate(C,f)})}function p(b,a,c){return A[a]?A[a].apply(b,Array.prototype.slice.call(c,1)):"object"===typeof a?A.init.call(b,a):b}var n={},g,F=function(){},h,c,e,l,B=(new Date).getTime(),w,d,u,y,E,x,ja,q,C,k=document.createElement("modernizr").style,f=z(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"]),v=function(){var b=["Webkit","Moz","O","ms"],a;for(a in b)if(z([b[a]+"Transform"]))return"-"+b[a].toLowerCase();
return""}(),s=a.extend,P,J="touchstart mousedown",O="touchmove mousemove",ia=function(b){b.preventDefault();x=G(b);l.scroll(u,y,r(q+(E-x)/h,c-1,e+1));C=!0},$={width:70,height:40,rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",lang:"en-US",setText:"Set",cancelText:"Cancel",scrollLock:!0,formatResult:function(b){return b.join(" ")},parseValue:function(b,a){var c=a.settings.wheels,d=b.split(" "),f=
[],k=0,q,e,A;for(q=0;q<c.length;q++)for(e in c[q]){if(void 0!==c[q][e][d[k]])f.push(d[k]);else for(A in c[q][e]){f.push(A);break}k++}return f}},A={init:function(b){void 0===b&&(b={});return this.each(function(){this.id||(B+=1,this.id="scoller"+B);n[this.id]=new j(this,b)})},enable:function(){return this.each(function(){var b=n[this.id];b&&b.enable()})},disable:function(){return this.each(function(){var b=n[this.id];b&&b.disable()})},isDisabled:function(){var b=n[this[0].id];if(b)return b.settings.disabled},
isVisible:function(){var b=n[this[0].id];if(b)return b.isVisible()},option:function(b,a){return this.each(function(){var c=n[this.id];if(c){var d={};"object"===typeof b?d=b:d[b]=a;c.init(d)}})},setValue:function(b,a,c,d){return this.each(function(){var f=n[this.id];f&&(f.temp=b,f.setValue(!0,a,c,d))})},getInst:function(){return n[this[0].id]},getValue:function(){var b=n[this[0].id];if(b)return b.values},show:function(){var b=n[this[0].id];if(b)return b.show()},hide:function(){return this.each(function(){var b=
n[this.id];b&&b.hide()})},destroy:function(){return this.each(function(){var b=n[this.id];b&&(b.hide(),a(this).unbind(".dw"),delete n[this.id],a(this).is("input")&&(this.readOnly=H(a(this).data("dwro"))))})}};a(document).bind("touchend mouseup",function(){if(w){var b=new Date-ja,f=r(q+(E-x)/h,c-1,e+1),k;k=u.offset().top;300>b?(b=(x-E)/b,b=b*b/0.0012,0>x-E&&(b=-b)):b=x-E;if(!b&&!C){k=Math.floor((x-k)/h);var A=a(".dw-li",u).eq(k);A.addClass("dw-hl");setTimeout(function(){A.removeClass("dw-hl")},200)}else k=
Math.round(q-b/h);o(u,k,0,!0,Math.round(f));w=!1;u=null;a(document).unbind(O,ia)}d&&(clearInterval(g),d=!1);a(".dwb-a").removeClass("dwb-a")});a.fn.mobiscroll=function(b){s(this,a.mobiscroll.shorts);return p(this,b,arguments)};a.mobiscroll=a.mobiscroll||{setDefaults:function(b){s($,b)},presetShort:function(b){this.shorts[b]=function(a){return p(this,s(a,{preset:b}),arguments)}},shorts:{},presets:{},themes:{},i18n:{}};a.scroller=a.scroller||a.mobiscroll;a.fn.scroller=a.fn.scroller||a.fn.mobiscroll})(jQuery);(function(a){var j=a.mobiscroll,z=new Date,G={dateFormat:"mm/dd/yy",dateOrder:"mmddy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:z.getFullYear()-100,endYear:z.getFullYear()+1,monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
shortYearCutoff:"+10",monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",nowText:"Now",showNow:!1,stepHour:1,stepMinute:1,stepSecond:1,separator:" "},H=function(r){function o(a,b,c){return void 0!==w[b]?+a[w[b]]:void 0!==c?c:f[u[b]]?f[u[b]]():u[b](f)}function p(a,b){return Math.floor(a/b)*b}function n(a){var b=o(a,"h",0);return new Date(o(a,"y"),o(a,"m"),o(a,"d",1),o(a,"a")?b+12:b,o(a,"i",0),o(a,"s",0))}var g=a(this),F={},h;if(g.is("input")){switch(g.attr("type")){case "date":h=
"yy-mm-dd";break;case "datetime":h="yy-mm-ddTHH:ii:ssZ";break;case "datetime-local":h="yy-mm-ddTHH:ii:ss";break;case "month":h="yy-mm";F.dateOrder="mmyy";break;case "time":h="HH:ii:ss"}var c=g.attr("min"),g=g.attr("max");c&&(F.minDate=j.parseDate(h,c));g&&(F.maxDate=j.parseDate(h,g))}var e=a.extend({},G,F,r.settings),l=0,F=[],B=[],w={},d,u={y:"getFullYear",m:"getMonth",d:"getDate",h:function(a){a=a.getHours();a=C&&12<=a?a-12:a;return p(a,v)},i:function(a){return p(a.getMinutes(),s)},s:function(a){return p(a.getSeconds(),
P)},a:function(a){return q&&11<a.getHours()?1:0}},y=e.preset,E=e.dateOrder,x=e.timeWheels,H=E.match(/D/),q=x.match(/a/i),C=x.match(/h/),k="datetime"==y?e.dateFormat+e.separator+e.timeFormat:"time"==y?e.timeFormat:e.dateFormat,f=new Date,v=e.stepHour,s=e.stepMinute,P=e.stepSecond,J=e.minDate||new Date(e.startYear,0,1),O=e.maxDate||new Date(e.endYear,11,31,23,59,59);r.settings=e;h=h||k;if(y.match(/date/i)){a.each(["y","m","d"],function(a,b){d=E.search(RegExp(b,"i"));-1<d&&B.push({o:d,v:b})});B.sort(function(a,
b){return a.o>b.o?1:-1});a.each(B,function(a,b){w[b.v]=a});g={};for(c=0;3>c;c++)if(c==w.y){l++;g[e.yearText]={};var z=J.getFullYear(),$=O.getFullYear();for(d=z;d<=$;d++)g[e.yearText][d]=E.match(/yy/i)?d:(d+"").substr(2,2)}else if(c==w.m){l++;g[e.monthText]={};for(d=0;12>d;d++)z=E.replace(/[dy]/gi,"").replace(/mm/,9>d?"0"+(d+1):d+1).replace(/m/,d),g[e.monthText][d]=z.match(/MM/)?z.replace(/MM/,'<span class="dw-mon">'+e.monthNames[d]+"</span>"):z.replace(/M/,'<span class="dw-mon">'+e.monthNamesShort[d]+
"</span>")}else if(c==w.d){l++;g[e.dayText]={};for(d=1;32>d;d++)g[e.dayText][d]=E.match(/dd/i)&&10>d?"0"+d:d}F.push(g)}if(y.match(/time/i)){B=[];a.each(["h","i","s","a"],function(a,b){a=x.search(RegExp(b,"i"));-1<a&&B.push({o:a,v:b})});B.sort(function(a,b){return a.o>b.o?1:-1});a.each(B,function(a,b){w[b.v]=l+a});g={};for(c=l;c<l+4;c++)if(c==w.h){l++;g[e.hourText]={};for(d=0;d<(C?12:24);d+=v)g[e.hourText][d]=C&&0==d?12:x.match(/hh/i)&&10>d?"0"+d:d}else if(c==w.i){l++;g[e.minuteText]={};for(d=0;60>
d;d+=s)g[e.minuteText][d]=x.match(/ii/)&&10>d?"0"+d:d}else if(c==w.s){l++;g[e.secText]={};for(d=0;60>d;d+=P)g[e.secText][d]=x.match(/ss/)&&10>d?"0"+d:d}else c==w.a&&(l++,y=x.match(/A/),g[e.ampmText]={"0":y?"AM":"am",1:y?"PM":"pm"});F.push(g)}r.setDate=function(a,b,c,d){for(var f in w)this.temp[w[f]]=a[u[f]]?a[u[f]]():u[f](a);this.setValue(!0,b,c,d)};r.getDate=function(a){return n(a)};return{button3Text:e.showNow?e.nowText:void 0,button3:e.showNow?function(){r.setDate(new Date,!1,0.3,!0)}:void 0,wheels:F,
headerText:function(){return j.formatDate(k,n(r.temp),e)},formatResult:function(a){return j.formatDate(h,n(a),e)},parseValue:function(a){var b=new Date,c,d=[];try{b=j.parseDate(h,a,e)}catch(f){}for(c in w)d[w[c]]=b[u[c]]?b[u[c]]():u[c](b);return d},validate:function(c){var b=r.temp,d={y:J.getFullYear(),m:0,d:1,h:0,i:0,s:0,a:0},f={y:O.getFullYear(),m:11,d:31,h:p(C?11:23,v),i:p(59,s),s:p(59,P),a:1},k=!0,q=!0;a.each("y,m,d,a,h,i,s".split(","),function(C,v){if(w[v]!==void 0){var s=d[v],g=f[v],l=31,n=
o(b,v),h=a(".dw-ul",c).eq(w[v]),r,p;if(v=="d"){r=o(b,"y");p=o(b,"m");g=l=32-(new Date(r,p,32)).getDate();H&&a(".dw-li",h).each(function(){var b=a(this),c=b.data("val"),d=(new Date(r,p,c)).getDay(),c=E.replace(/[my]/gi,"").replace(/dd/,c<10?"0"+c:c).replace(/d/,c);a(".dw-i",b).html(c.match(/DD/)?c.replace(/DD/,'<span class="dw-day">'+e.dayNames[d]+"</span>"):c.replace(/D/,'<span class="dw-day">'+e.dayNamesShort[d]+"</span>"))})}k&&J&&(s=J[u[v]]?J[u[v]]():u[v](J));q&&O&&(g=O[u[v]]?O[u[v]]():u[v](O));
if(v!="y"){var x=a(".dw-li",h).index(a('.dw-li[data-val="'+s+'"]',h)),B=a(".dw-li",h).index(a('.dw-li[data-val="'+g+'"]',h));a(".dw-li",h).removeClass("dw-v").slice(x,B+1).addClass("dw-v");v=="d"&&a(".dw-li",h).removeClass("dw-h").slice(l).addClass("dw-h")}n<s&&(n=s);n>g&&(n=g);k&&(k=n==s);q&&(q=n==g);if(e.invalid&&v=="d"){var t=[];e.invalid.dates&&a.each(e.invalid.dates,function(b,a){a.getFullYear()==r&&a.getMonth()==p&&t.push(a.getDate()-1)});if(e.invalid.daysOfWeek){var y=(new Date(r,p,1)).getDay(),
j;a.each(e.invalid.daysOfWeek,function(b,a){for(j=a-y;j<l;j=j+7)j>=0&&t.push(j)})}e.invalid.daysOfMonth&&a.each(e.invalid.daysOfMonth,function(b,a){a=(a+"").split("/");a[1]?a[0]-1==p&&t.push(a[1]-1):t.push(a[0]-1)});a.each(t,function(b,c){a(".dw-li",h).eq(c).removeClass("dw-v")})}b[w[v]]=n}})},methods:{getDate:function(c){var b=a(this).mobiscroll("getInst");if(b)return b.getDate(c?b.temp:b.values)},setDate:function(c,b,d,f){void 0==b&&(b=!1);return this.each(function(){var k=a(this).mobiscroll("getInst");
k&&k.setDate(c,b,d,f)})}}}};a.each(["date","time","datetime"],function(a,o){j.presets[o]=H;j.presetShort(o)});j.formatDate=function(r,o,p){if(!o)return null;var p=a.extend({},G,p),n=function(a){for(var c=0;h+1<r.length&&r.charAt(h+1)==a;)c++,h++;return c},g=function(a,c,d){c=""+c;if(n(a))for(;c.length<d;)c="0"+c;return c},j=function(a,c,d,e){return n(a)?e[c]:d[c]},h,c="",e=!1;for(h=0;h<r.length;h++)if(e)"'"==r.charAt(h)&&!n("'")?e=!1:c+=r.charAt(h);else switch(r.charAt(h)){case "d":c+=g("d",o.getDate(),
2);break;case "D":c+=j("D",o.getDay(),p.dayNamesShort,p.dayNames);break;case "o":c+=g("o",(o.getTime()-(new Date(o.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":c+=g("m",o.getMonth()+1,2);break;case "M":c+=j("M",o.getMonth(),p.monthNamesShort,p.monthNames);break;case "y":c+=n("y")?o.getFullYear():(10>o.getYear()%100?"0":"")+o.getYear()%100;break;case "h":var l=o.getHours(),c=c+g("h",12<l?l-12:0==l?12:l,2);break;case "H":c+=g("H",o.getHours(),2);break;case "i":c+=g("i",o.getMinutes(),2);break;
case "s":c+=g("s",o.getSeconds(),2);break;case "a":c+=11<o.getHours()?"pm":"am";break;case "A":c+=11<o.getHours()?"PM":"AM";break;case "'":n("'")?c+="'":e=!0;break;default:c+=r.charAt(h)}return c};j.parseDate=function(r,o,p){var n=new Date;if(!r||!o)return n;var o="object"==typeof o?o.toString():o+"",g=a.extend({},G,p),j=g.shortYearCutoff,p=n.getFullYear(),h=n.getMonth()+1,c=n.getDate(),e=-1,l=n.getHours(),n=n.getMinutes(),B=0,w=-1,d=!1,u=function(a){(a=z+1<r.length&&r.charAt(z+1)==a)&&z++;return a},
y=function(a){u(a);a=o.substr(x).match(RegExp("^\\d{1,"+("@"==a?14:"!"==a?20:"y"==a?4:"o"==a?3:2)+"}"));if(!a)return 0;x+=a[0].length;return parseInt(a[0],10)},H=function(a,c,d){a=u(a)?d:c;for(c=0;c<a.length;c++)if(o.substr(x,a[c].length).toLowerCase()==a[c].toLowerCase())return x+=a[c].length,c+1;return 0},x=0,z;for(z=0;z<r.length;z++)if(d)"'"==r.charAt(z)&&!u("'")?d=!1:x++;else switch(r.charAt(z)){case "d":c=y("d");break;case "D":H("D",g.dayNamesShort,g.dayNames);break;case "o":e=y("o");break;case "m":h=
y("m");break;case "M":h=H("M",g.monthNamesShort,g.monthNames);break;case "y":p=y("y");break;case "H":l=y("H");break;case "h":l=y("h");break;case "i":n=y("i");break;case "s":B=y("s");break;case "a":w=H("a",["am","pm"],["am","pm"])-1;break;case "A":w=H("A",["am","pm"],["am","pm"])-1;break;case "'":u("'")?x++:d=!0;break;default:x++}100>p&&(p+=(new Date).getFullYear()-(new Date).getFullYear()%100+(p<=("string"!=typeof j?j:(new Date).getFullYear()%100+parseInt(j,10))?0:-100));if(-1<e){h=1;c=e;do{g=32-
(new Date(p,h-1,32)).getDate();if(c<=g)break;h++;c-=g}while(1)}l=new Date(p,h-1,c,-1==w?l:w&&12>l?l+12:!w&&12==l?0:l,n,B);if(l.getFullYear()!=p||l.getMonth()+1!=h||l.getDate()!=c)throw"Invalid date";return l}})(jQuery);(function(a){var j=a.mobiscroll,z={invalid:[],showInput:!0,inputClass:""},G=function(j){function r(c,d,k,f){for(var e=0;e<d;){var s=a(".dwwl"+e,c),g=o(f,e,k);a.each(g,function(c,d){a('.dw-li[data-val="'+d+'"]',s).removeClass("dw-v")});e++}}function o(a,c,d){for(var f=0,e,s=[];f<c;){var g=a[f];for(e in d)if(d[e].key==g){d=d[e].children;break}f++}for(f=0;f<d.length;)d[f].invalid&&s.push(d[f].key),f++;return s}function p(a,c,d){var f=0,e,s,g=[{}],j=y;if(c)for(e=0;e<c;e++)g[e]={},g[e][E[e]]={};for(;f<
a.length;){g[f]={};e=g[f];for(var c=E[f],h=j,l={},o=0;o<h.length;)l[h[o].key]=h[o++].value;e[c]=l;e=0;for(c=void 0;e<j.length&&void 0===c;){if(j[e].key==a[f]&&(void 0!==d&&f<=d||void 0===d))c=e;e++}if(void 0!==c&&j[c].children)f++,j=j[c].children;else if((s=n(j))&&s.children)f++,j=s.children;else break}return g}function n(a,c){if(!a)return!1;for(var d=0,f;d<a.length;)if(!(f=a[d++]).invalid)return c?d-1:f;return!1}function g(c,d){a(".dwc",c).css("display","").slice(d).hide()}function F(a,c){var d=
[],f=y,e=0,g=!1,j,h;if(void 0!==a[e]&&e<=c){g=0;j=a[e];for(h=void 0;g<f.length&&void 0===h;)f[g].key==a[e]&&!f[g].invalid&&(h=g),g++}else h=n(f,!0),j=f[h].key;g=void 0!==h?f[h].children:!1;for(d[e]=j;g;){f=f[h].children;e++;if(void 0!==a[e]&&e<=c){g=0;j=a[e];for(h=void 0;g<f.length&&void 0===h;)f[g].key==a[e]&&!f[g].invalid&&(h=g),g++}else h=n(f,!0),h=!1===h?void 0:h,j=f[h].key;g=void 0!==h&&n(f[h].children)?f[h].children:!1;d[e]=j}return{lvl:e+1,nVector:d}}function h(c){var e=[];d=d>u++?d:u;c.children("li").each(function(c){var d=
a(this),g=d.clone();g.children("ul,ol").remove();var g=g.html().replace(/^\s\s*/,"").replace(/\s\s*$/,""),j=d.data("invalid")?!0:!1,c={key:d.data("val")||c,value:g,invalid:j,children:null},d=d.children("ul,ol");d.length&&(c.children=h(d));e.push(c)});u--;return e}var c=a.extend({},z,j.settings),e=a(this),l,B,w=this.id+"_dummy",d=0,u=0,y=c.wheelArray||h(e),E=function(a){var d=[],e;for(e=0;e<a;e++)d[e]=c.labels&&c.labels[e]?c.labels[e]:e;return d}(d),x=[],G=function(a){for(var c=[],d,e=!0,g=0;e;)if(d=
n(a),c[g++]=d.key,e=d.children)a=d.children;return c}(y),G=p(G,d);a("#"+w).remove();c.showInput&&(l=a('<input type="text" id="'+w+'" value="" class="'+c.inputClass+'" readonly />').insertBefore(e),j.settings.anchor=l,c.showOnFocus&&l.focus(function(){j.show()}));c.wheelArray||e.hide().closest(".ui-field-contain").trigger("create");return{width:50,wheels:G,headerText:!1,onBeforeShow:function(){var a=j.temp;x=j.temp.slice(0);j.settings.wheels=p(a,d,d)},onSelect:function(a){l&&l.val(a)},onChange:function(a){l&&
c.display=="inline"&&l.val(a)},onClose:function(){l&&l.blur()},onAnimStart:function(a){for(var c=j.settings,e=d,f=[];e;)f[--e]=true;f[a]=false;c.readonly=f},validate:function(a,c){var d=j.temp;if(c!==void 0&&x[c]!=d[c]||c===void 0&&!B){j.settings.wheels=p(d,null,c);var e=[],h=(c||0)+1,l=F(d,c);if(c!==void 0)j.temp=l.nVector.slice(0);for(;h<l.lvl;)e.push(h++);g(a,l.lvl);x=j.temp.slice(0);if(e.length){B=true;j.changeWheel(e);return false}r(a,l.lvl,y,j.temp)}else{l=F(d,d.length);r(a,l.lvl,y,d);g(a,l.lvl)}B=
j.settings.readonly=false}}};a.each(["list","image","treelist"],function(a,r){j.presets[r]=G;j.presetShort(r)})})(jQuery);(function(a){var j={defaults:{dateOrder:"Mddyy",mode:"mixed",rows:5,width:70,height:36,showLabel:!1}};a.mobiscroll.themes["android-ics"]=j;a.mobiscroll.themes["android-ics light"]=j})(jQuery);



// CalendarController

function CalendarController(viewId) {
    
    this.viewId = viewId;
    this.$view = $(viewId);
    this.htmlBuilder = new HtmlBuilder();
    
    this.timeTable = null; // L'orario visualizzato
    this.currentDate = null;
    
    
    this.getCalendarStyle = function () {
        return this.$view.attr('calendarStyle');
    }
    
    
    this.setCalendarStyle = function (calendarStyle) {
        this.$view.removeClass(this.getCalendarStyle());
        this.$view.attr('calendarStyle', calendarStyle);
        this.$view.addClass(calendarStyle);
        this.updateView();
    }
    
    
    this.setCurrentDate = function (newDate) {
        var firstDate = Date.parseIsoDate(this.timeTable.firstIsoDate);
        var lastDate = Date.parseIsoDate(this.timeTable.lastIsoDate);
        if (newDate < firstDate) {
            newDate = firstDate;
        } else if (newDate > lastDate) {
            newDate = lastDate;
        }
        this.currentDate = newDate;
    }
    
    
    this.setTimeTable = function (timeTable) {
        this.timeTable = timeTable;
        this.htmlBuilder.timeTable = timeTable;
    }
    
    
    this.goToNext = function () {
        var newDate = this.currentDate;
        switch (this.getCalendarStyle()) {
            case 'day':
                var delta = newDate.getDay() == 6 ? 2 : 1;
                newDate.addDays(delta);
                break;
            case 'month':
                newDate.setMonth(newDate.getMonth() + 1);
                break;
            case 'week':
                newDate.addDays(7);
                break;
        }
        this.setCurrentDate(newDate);
        this.updateView();
    }
    
    
    this.goToPrev = function () {
        var newDate = this.currentDate;
        switch (this.getCalendarStyle()) {
            case 'day':
                var delta = newDate.getDay() == 1 ? -2 : -1;
                newDate.addDays(delta);
                break;
            case 'month':
                newDate.setMonth(newDate.getMonth() - 1);
                break;
            case 'week':
                newDate.addDays(-7);
                break;
        }
        this.setCurrentDate(newDate);
        this.updateView();
    }
    
    
    this.saveValue = function ($input, propertyName) {
        var value = $input.val();
        var $td = $input.data('td');
        var isoDate = this.currentDate.toIsoDate();
        var day = this.currentDate.getDay();
        var hour = parseInt($td.parent().attr('hour'));
        // Ecco che cosa dice il calendario:
        var calendarEntry = this.timeTable.getCalendarEntry(isoDate, hour);
        // Ed ecco che cosa dice il plan:
        var planEntry = this.timeTable.plan[day][hour];
        var planValue = planEntry[propertyName] || 0;
        // Vediamo se il nuovo valore differisce o meno dal plan:
        if  (value == planValue) {
            // NO OVERRIDE
            // $selectedElement.parent().removeAttr('isOverridden');
            if (calendarEntry) {
                calendarEntry[propertyName] = undefined;
            }
        } else {
            // OVERRIDE
            // $selectedElement.parent().attr('isOverridden', 'true');
            if (!calendarEntry) {
                calendarEntry = new CalendarEntry();
                this.timeTable.setCalendarEntry(isoDate, hour, calendarEntry);
            }
            calendarEntry[propertyName] = value;
        }
        dataModel.save();
    }
    
    
    this.planClickHandler = function () {
        application.planController.setTimeTable(this.timeTable);
        $.mobile.changePage(application.planController.viewId, { transition: 'slideup' });
    }
    
    
    this.shareClickHandler = function () {
        if (confirm('Condividi orario?')) {
            application.putController.setParams(this.timeTable);
            $.mobile.changePage(application.putController.viewId, { transition: 'pop', role: 'dialog' });
        }
    }
    
    
    this.tdClickHandler = function ($td) {
        switch (this.getCalendarStyle()) {
            case 'day':
                if ($td.hasClass('subject')) {
                    var subjectId = $td.attr('subjectId') || 0;
                    $('#calendarDaySubjectInput').data('td', $td);
                    $('#calendarDaySubjectInput').mobiscroll('option', 'anchor', $td).mobiscroll('setValue', [subjectId], false, 0.5).mobiscroll('show');
                } else if ($td.hasClass('place')) {
                    $('#calendarDayPlaceInput').data('td', $td);
                    $('#calendarDayPlaceInput').mobiscroll('option', 'anchor', $td).mobiscroll('show');
                } else if ($td.hasClass('note')) {
                    application.noteController.setParams(this.timeTable, this.currentDate, parseInt($td.parent().attr('hour')));
                    $.mobile.changePage(application.noteController.viewId, { transition: 'pop', role: 'dialog' });
                }
                break;
            case 'month':
                this.currentDate = Date.parseIsoDate($td.attr('date'));
                this.setCalendarStyle('day');
                this.updateView();
                break;
            case 'week':
                var isoDate = $td.attr('date');
                if (isoDate) {
                    application.noteController.setParams(this.timeTable, Date.parseIsoDate(isoDate), parseInt($td.attr('hour')));
                    $.mobile.changePage(application.noteController.viewId, { transition: 'pop', role: 'dialog' });
                }
                break;
        }
    }
    
    
    this.thClickHandler = function ($th) {
        switch (this.getCalendarStyle()) {
            case 'week':
                this.currentDate = Date.parseIsoDate($th.attr('date'));
                this.setCalendarStyle('day');
                this.updateView();
                break;
        }
    }
    
    
    this.placeInputChangeHandler = function ($placeInput) {
        this.saveValue($placeInput, 'placeId');
        this.updateView();
    }
    
    
    this.subjectInputChangeHandler = function ($subjectInput) {
        this.saveValue($subjectInput, 'subjectId');
        this.updateView();
    }
    
    
    this.showPlaceController = function () {
        $('#calendarDayPlaceInput').mobiscroll('hide');
        application.placeController.setParams(this.timeTable);
        $.mobile.changePage(application.placeController.viewId, { transition: 'pop', role: 'dialog' });
    }
    
    
    this.showSubjectController = function () {
        $('#calendarDaySubjectInput').mobiscroll('hide');
        application.subjectController.setParams(this.timeTable);
        $.mobile.changePage(application.subjectController.viewId, { transition: 'pop', role: 'dialog' });
    }
    
    
    this.vacationBarClickHandler = function () {
        if (dataModel.isHolidayDate(this.currentDate)) {
            return;
        }
        var currentIsoDate = this.currentDate.toIsoDate();
        if (this.timeTable.vacations[currentIsoDate]) {
            delete this.timeTable.vacations[currentIsoDate];
        } else {
            this.timeTable.vacations[currentIsoDate] = true;
        }
        dataModel.save();
        this.updateView();
    }
    
    
    this.bindEventHandlers = function () {
        var self = this;

        this.$view.find('.nextCell').click(function () { self.goToNext(); });
        this.$view.find('.prevCell').click(function () { self.goToPrev(); });
        this.$view.on('swipeleft', function () { self.goToNext(); });
        this.$view.on('swiperight', function () { self.goToPrev(); });
        
        this.$view.find('.vacationBar').click(function () { self.vacationBarClickHandler(); });
        var $planTable = this.$view.find('.planTable');
        $planTable.find('tbody').on('click', 'td', function() { self.tdClickHandler($(this)); });
        $planTable.find('thead').on('click', 'th', function() { self.thClickHandler($(this)); });
        
        $('#planButton').click(function () { self.planClickHandler(); });
        $('#dayButton').click(function () { self.setCalendarStyle('day'); });
        $('#monthButton').click(function () { self.setCalendarStyle('month'); });
        $('#weekButton').click(function () { self.setCalendarStyle('week'); });
        $('#shareButton').click(function () { self.shareClickHandler(); });
        $('#calendarDayPlaceInput').change(function () { self.placeInputChangeHandler($(this)); });
        $('#calendarDaySubjectInput').change(function () { self.subjectInputChangeHandler($(this)); });

        $('#welcome').click(function () { self.timeTable.isOld = true; dataModel.save(); $('#welcome').hide('fast'); });

        this.$view.on('pageshow', function () { self.updateView(); });
    }
    
    
    this.updateDayView = function ($planTable) {
        var self = this;
        scrollers.preparePlaceScroller('#calendarDayPlaceInput', this.timeTable, function () { self.showPlaceController(); }, null);
        scrollers.prepareSubjectScroller('#calendarDaySubjectInput', this.timeTable, function () { self.showSubjectController(); }, null);
        
        var currentDate = this.currentDate;
        
        this.$view.find('.headerCell').html('<b>' + dataModel.DAYS[currentDate.getDay()] + '</b> ' + currentDate.getDate() + ' ' + dataModel.MONTHS[currentDate.getMonth()]);
        
        var currentIsoDate = currentDate.toIsoDate();
        var currentTimeTable = this.timeTable;
        
        if (dataModel.isHolidayDate(currentDate)) {
            this.$view.removeClass('vacationDay');
            this.$view.addClass('holiday');
            return;
        } else {
            this.$view.removeClass('holiday');
        }
        
        if (currentTimeTable.vacations[currentIsoDate]) {
            this.$view.addClass('vacationDay');
            return;
        } else {
            this.$view.removeClass('vacationDay');
        }
        
        
        var header = '<th colspan="2">Orario</th><th>Materia</th>';
        if (application.name == 'te') {
            header += '<th>Classe</th>';
        }
        header += '<th>Nota</th>';
        $planTable.find('thead').html('<tr>' + header + '</tr>');
        
        var day = currentDate.getDay();
        var hour;
        var hoursPerDay = currentTimeTable.getNumberOfHoursPerDay();
        var tmpSubject;
        var tmpCalendarEntry;
        var tmpPlanEntry;
        var planTableBody = '';
        for (hour = 0; hour < hoursPerDay; hour++) {
            tmpPlanEntry = currentTimeTable.plan[day][hour];
            planTableBody += '<tr hour="' + hour + '">';
            planTableBody += this.htmlBuilder.snippetForHour(hour);
            planTableBody += this.htmlBuilder.snippetForTime(tmpPlanEntry.time);
            planTableBody += this.htmlBuilder.snippetForSubject(currentDate, hour);
            if (application.name == 'te') {
                planTableBody += this.htmlBuilder.snippetForPlace(currentDate, hour);
            }
            planTableBody += this.htmlBuilder.snippetForNote(currentDate, hour);
            planTableBody += '</tr>';
        }
        $planTable.find('tbody').html(planTableBody);
    }
    
    
    this.updateMonthView = function ($planTable) {
        var currentDate = this.currentDate;
        var currentMonth = currentDate.getMonth();
        var currentYear = currentDate.getFullYear();
        
        this.$view.find('.headerCell').html(dataModel.MONTHS[currentMonth] + ' ' + currentYear);
        
        $planTable.find('thead').html('<tr><th>lun</th><th>mar</th><th>mer</th><th>gio</th><th>ven</th><th>sab</th></tr>');
        
        var firstDayOfMonth = (new Date(currentYear, currentMonth, 1)).getDay();
        if (firstDayOfMonth == 0) {
            firstDayOfMonth = 7;
        }
        var daysInCurrentMonth = 32 - (new Date(currentYear, currentMonth, 32)).getDate();
        var daysInPrevMonth = 32 - (new Date(currentYear, currentMonth - 1, 32)).getDate();
        
        var planTableBody = '';
        var dayOfMonth = 0;
        
        for (var i = 0; i < 6; i++) {
            planTableBody += '<tr>';
            for (var j = 0; j < 6; j++) {
                var isDayOfCurrentMonth = false;
                var tmpDate;
                if (dayOfMonth == 0) {
                    if(firstDayOfMonth == (j + 1)) {
                        dayOfMonth = 1;
                        isDayOfCurrentMonth = true;
                    } else {
                        tmpDate = new Date(currentYear, currentMonth - 1, (daysInPrevMonth - firstDayOfMonth + j + 2));
                    }
                } else {
                    dayOfMonth++;
                    if(dayOfMonth <= daysInCurrentMonth) {
                        isDayOfCurrentMonth = true;
                    } else {
                        tmpDate = new Date(currentYear, currentMonth + 1, (dayOfMonth - daysInCurrentMonth));
                    }
                }
                if (isDayOfCurrentMonth) {
                    tmpDate = new Date(currentYear, currentMonth, dayOfMonth);
                }
                var isoDate = tmpDate.toIsoDate();
                var className = isDayOfCurrentMonth ? 'goodDate' : 'badDate';
                if (dataModel.isHolidayDate(tmpDate)) {
                    className += ' holidayDate';
                } else if (this.timeTable.vacations[isoDate]) {
                    className += ' vacationDate';
                }
                planTableBody += '<td class="'+ className +'" date="' + isoDate + '">' + tmpDate.getDate() + this.htmlBuilder.snippetForNoteAtIsoDate(isoDate) + '</td>';
                
            }
            planTableBody += '</tr>';
            dayOfMonth++; // Salto la domenica
        }
        $planTable.find('tbody').html(planTableBody);
    }
    
    
    this.updateWeekView = function ($planTable) {
        var currentTimeTable = this.timeTable;
        
        if (currentTimeTable.isOld) {
            $('#welcome').hide();
        } else {
            $('#welcome').show();
        }
        
        // Voglio mostrare il calendario da lunedì a sabato.
        // firstDate è il primo lunedì precedente alla data corrente, tranne nel caso che la data corrente sia domenica:
        // in questo caso firstDate è il primo lunedì successivo
        var firstDate = this.currentDate.getGoodMonday();
        // Faccio una copia di firstDate
        var tmpDate = new Date(firstDate.getTime());
        
        
        var day;
        var planTableHead = '<tr>';
        for (day = 1; day < 7; day++) {
            planTableHead += '<th date="' + tmpDate.toIsoDate() + '">';
            planTableHead += dataModel.SHORT_DAYS[tmpDate.getDay()] + ' ' + tmpDate.getDate();
            planTableHead += '</th>';
            tmpDate.addDays(1);
        }
        planTableHead += '</tr>';
        $planTable.find('thead').html(planTableHead);
        
        // Torno al sabato, per scrivere lo header:
        tmpDate.addDays(-1);
        this.$view.find('.headerCell').html(firstDate.getDate() + ' / ' + tmpDate.getDate() + ' ' + dataModel.MONTHS[tmpDate.getMonth()]);
        
        var hour;
        var hoursPerDay = currentTimeTable.getNumberOfHoursPerDay();
        
        var planTableBody = '';
        for (hour = 0; hour < hoursPerDay; hour++) {
            planTableBody += '<tr>';
            // Faccio una copia di firstDate
            tmpDate = new Date(firstDate.getTime());
            for (day = 1; day < 7; day++) {
                planTableBody += this.htmlBuilder.snippetForSubject(tmpDate, hour, true);
                tmpDate.addDays(1);
            }
            planTableBody += '</tr>';
        }
        
        $planTable.find('tbody').html(planTableBody);
    }
    
    
    this.updateView = function () {
        var $planTable = this.$view.find('.planTable');
        $('#dayButton').removeClass('ui-btn-active');
        $('#monthButton').removeClass('ui-btn-active');
        $('#weekButton').removeClass('ui-btn-active');
        switch (this.getCalendarStyle()) {
            case 'day':
                $('#dayButton').addClass('ui-btn-active');
                this.updateDayView($planTable);
                break;
            case 'month':
                $('#monthButton').addClass('ui-btn-active');
                this.updateMonthView($planTable);
                break;
            case 'week':
                $('#weekButton').addClass('ui-btn-active');
                this.updateWeekView($planTable);
                break;
        }
    }
}


// PlanController

function PlanController(viewId) {
    
    var $selectedElement = null;
    
    
    function saveDateValue(value) {
        $selectedElement.text(scrollers.formatIsoDate(value));
        if ($selectedElement.attr('id') == 'firstDate') {
            this.timeTable.firstIsoDate = value;
        } else if ($selectedElement.attr('id') == 'lastDate') {
            this.timeTable.lastIsoDate = value;
        } else {
            alert('err');
        }
        dataModel.save();
    }
    
    
    this.viewId = viewId;
    this.$view = $(viewId);
    this.htmlBuilder = new HtmlBuilder();
    this.timeTable = null; // Per debug
    this.planDay = 0;
    
    
    this.setTimeTable = function (timeTable) {
        this.timeTable = timeTable;
        this.htmlBuilder.timeTable = timeTable;
    }
    
    
    this.goToNext = function () {
        if (this.planDay == 6) {
            this.planDay = 0;
        } else {
            this.planDay++;
        }
        this.updateView();
    }
    
    
    this.goToPrev = function () {
        if (this.planDay == 0) {
            this.planDay = 6;
        } else {
            this.planDay--;
        }
        this.updateView();
    }
    
    
    this.saveValue = function ($input, propertyName) {
        var value = $input.val();
        var $td = $input.data('td');
        var hour = parseInt($td.parent().attr('hour'));
        this.timeTable.plan[this.planDay][hour][propertyName] = value;
        dataModel.save();
    }
    
    
    this.placeClickHandler = function ($td) {
        var placeId = $td.attr('placeId') || 0;
        $('#planPlaceInput').data('td', $td);
        $('#planPlaceInput').mobiscroll('option', 'anchor', $td).mobiscroll('setValue', [placeId], false, 0.5).mobiscroll('show');
    }
    
    
    this.subjectClickHandler = function ($td) {
        var subjectId = $td.attr('subjectId') || 0;
        $('#planSubjectInput').data('td', $td);
        $('#planSubjectInput').mobiscroll('option', 'anchor', $td).mobiscroll('setValue', [subjectId], false, 0.5).mobiscroll('show');
    }
    
    
    this.timeClickHandler = function ($td) {
        var timeAsString = $td.text();
        var timeItems = timeAsString.split(':');
        var date = new Date();
        date.setHours(timeItems[0]);
        date.setMinutes(timeItems[1]);
        // Un po' strano qui, ma così funziona...
        $('#planTimeInput').data('td', $td);
        $('#planTimeInput').val(timeAsString);
        $('#planTimeInput').mobiscroll('setDate', date, false, 0.5).mobiscroll('option', 'anchor', $td).mobiscroll('show');
    }
    
    
    this.firstDateChangeHandler = function ($input) {
        var isoDate = scrollers.parseToIsoDate($input.val());
        this.timeTable.firstIsoDate = isoDate;
        dataModel.save();
    }
    
    
    this.lastDateChangeHandler = function ($input) {
        var isoDate = scrollers.parseToIsoDate($input.val());
        this.timeTable.lastIsoDate = isoDate;
        dataModel.save();
    }
    
    
    this.placeInputChangeHandler = function ($placeInput) {
        this.saveValue($placeInput, 'placeId');
        this.updateView();
    }
    
    
    this.subjectInputChangeHandler = function ($subjectInput) {
        this.saveValue($subjectInput, 'subjectId');
        this.updateView();
    }
    
    
    this.timeInputChangeHandler = function ($timeInput) {
        this.saveValue($timeInput, 'time');
        this.updateView();
    }
    
    
    this.showPlaceController = function () {
        $('#planPlaceInput').mobiscroll('hide');
        application.placeController.setParams(this.timeTable);
        $.mobile.changePage(application.placeController.viewId, { transition: 'pop', role: 'dialog' });
    }
    
    
    this.showSubjectController = function () {
        $('#planSubjectInput').mobiscroll('hide');
        application.subjectController.setParams(this.timeTable);
        $.mobile.changePage(application.subjectController.viewId, { transition: 'pop', role: 'dialog' });
    }
    
    
    this.bindEventHandlers = function () {
        var self = this;
        
        scrollers.prepareTimeScroller('#planTimeInput', this.timeTable, null);
        
        this.$view.find('.nextCell').click(function () { self.goToNext(); });
        this.$view.find('.prevCell').click(function () { self.goToPrev(); });
        this.$view.on('swipeleft', function () { self.goToNext(); });
        this.$view.on('swiperight', function () { self.goToPrev(); });
        $('#firstDate').change(function () { self.firstDateChangeHandler($(this)); });
        $('#lastDate').change(function () { self.lastDateChangeHandler($(this)); });
        $('#planPlaceInput').change(function () { self.placeInputChangeHandler($(this)); });
        $('#planSubjectInput').change(function () { self.subjectInputChangeHandler($(this)); });
        $('#planTimeInput').change(function () { self.timeInputChangeHandler($(this)); });
        $planTable = this.$view.find('.planTable');
        $planTable.on('click', 'td.place', function () { self.placeClickHandler($(this)); });
        $planTable.on('click', 'td.subject', function () { self.subjectClickHandler($(this)); });
        $planTable.on('click', 'td.time', function () { self.timeClickHandler($(this)); });
        
        this.$view.on('pageshow', function () { self.updateView(); });
    }
    
    
    this.updateView = function () {
        if (this.planDay == 0) {
            // Domenica: in realtà mostro la pagina delle date
            this.$view.addClass('dates');
            this.$view.find('.headerCell').html('<b>Anno scolastico</b>');
            $('#firstDate').val(scrollers.formatIsoDate(this.timeTable.firstIsoDate));
            $('#lastDate').val(scrollers.formatIsoDate(this.timeTable.lastIsoDate));
            scrollers.prepareDateScroller('#firstDate');
            scrollers.prepareDateScroller('#lastDate');
        } else {
            this.$view.removeClass('dates');
            
            var self = this;
            scrollers.preparePlaceScroller('#planPlaceInput', this.timeTable, function () { self.showPlaceController(); }, null);
            scrollers.prepareSubjectScroller('#planSubjectInput', this.timeTable, function () { self.showSubjectController(); }, null);
            
            var day = this.planDay || 1;
            this.$view.find('.headerCell').html('<b>' + dataModel.DAYS[day] + '</b>');
            
            var $planTable = this.$view.find('.planTable');
            var tableHeader = '<th colspan="2">Orario</th><th>Materia</th>';
            if (application.name == 'te') {
                tableHeader += '<th>Classe</th>';
            }
            $planTable.find('thead').html('<tr>' + tableHeader + '</tr>');
            
            var hour;
            var hoursPerDay = this.timeTable.getNumberOfHoursPerDay();
            var tmpPlanEntry;
            var planTableBody = '';
            for (hour = 0; hour < hoursPerDay; hour++) {
                tmpPlanEntry = this.timeTable.plan[day][hour];
                planTableBody += '<tr hour="' + hour + '">';
                planTableBody += this.htmlBuilder.snippetForHour(hour);
                planTableBody += this.htmlBuilder.snippetForTime(tmpPlanEntry.time);
                planTableBody += this.htmlBuilder.snippetForPlannedSubject(day, hour);
                if (application.name == 'te') {
                    planTableBody += this.htmlBuilder.snippetForPlannedPlace(day, hour);
                }
                planTableBody += '</tr>';
            }
            $planTable.find('tbody').html(planTableBody);
        }
    }
}


// NoteController

function NoteController(viewId) {
    
    this._$view = $(viewId);
    this._timeTable = null;
    this._currentDate = null;
    this._currentHour = 0;
    
    this.viewId = viewId;
    
    this.setParams = function (timeTable, date, hour) {
        this._timeTable = timeTable;
        this._currentDate = date;
        this._currentHour = hour;
    }
    
    
    this.saveNoteClickHandler = function () {
        var isoDate = this._currentDate.toIsoDate();
        var calendarEntry = this._timeTable.getCalendarEntry(isoDate, this._currentHour);
        if (!calendarEntry) {
            calendarEntry = new CalendarEntry();
        }
        calendarEntry.noteType = $('#noteTypeField').val();
        calendarEntry.noteText = $('#noteTextField').val();
        this._timeTable.setCalendarEntry(isoDate, this._currentHour, calendarEntry);
        dataModel.save();
        this._$view.dialog('close');
        // application.goBack();
    }
    
    
    this.deleteNoteClickHandler = function () {
        var isoDate = this._currentDate.toIsoDate();
        var calendarEntry = this._timeTable.getCalendarEntry(isoDate, this._currentHour);
        calendarEntry.noteType = 0;
        calendarEntry.noteText = '';
        dataModel.save();
        this._$view.dialog('close');
        // application.goBack();
    }
    
    
    this.bindEventHandlers = function () {
        var self = this;
        
        $('#saveNoteButton').click(function () { self.saveNoteClickHandler(); } );
        $('#deleteNoteButton').click(function () { self.deleteNoteClickHandler(); });
        
        this._$view.on('pagebeforeshow', function () { self.updateView(); });
    }
    
    
    this.updateView = function () {
        this._$view.find('div.headline').html((1 + this._currentHour) + 'ª ora - <span>'
                            + dataModel.DAYS[this._currentDate.getDay()]
                            + ' ' + this._currentDate.getDate()
                            + ' ' + dataModel.MONTHS[this._currentDate.getMonth()] + '</span>');
        var isoDate = this._currentDate.toIsoDate();
        var calendarEntry = this._timeTable.getCalendarEntry(isoDate, this._currentHour);
        if (calendarEntry && (calendarEntry.noteType > 0)) {
            $('#noteTypeField').val(calendarEntry.noteType);
            $('#noteTextField').val(calendarEntry.noteText);
            $('#deleteNoteButton').css('display', 'block');
        } else {
            $('#noteTypeField').val(0);
            $('#noteTextField').val('');
            $('#deleteNoteButton').css('display', 'none');
        }
    }
}


// PlaceController

function PlaceController(viewId) {
    
    this._$view = $(viewId);
    this._timeTable = null;
    this._currentDate = null;
    this._currentHour = 0;
    
    this.viewId = viewId;
    
    this.setParams = function (timeTable) {
        this._timeTable = timeTable;
    }
    
    
    this.addRowClickHandler = function () {
        var newPlaceId = this._timeTable.places.length;
        if (newPlaceId == 0) {
            // Voglio lasciare vuoto il primo slot
            newPlaceId = 1;
        }
        this._timeTable.places[newPlaceId] = new Place();
        // dataModel.save();
        this.updateView();
        this._$view.find('.planTable tbody tr').last().find('input').focus();
    }
    
    
    this.deleteCellClickHandler = function ($td) {
        var placeId = $td.parent().attr('placeId');
        if (confirm('Elimino la classe?')) {
            this._timeTable.deletePlace(placeId);
            dataModel.save();
            this.updateView();
        }
    }
    
    
    this.inputBlurHandler = function ($input) {
        var placeId = $input.parent().parent().attr('placeId');
        var place = this._timeTable.places[placeId];
        place.name = $input.val();
        dataModel.save();
    }
    
    
    this.bindEventHandlers = function () {
        var self = this;
        var $planTable = this._$view.find('.planTable');
        $planTable.find('.addRow').click(function () { self.addRowClickHandler(); });
        $planTable.on('click', '.delete', function () { self.deleteCellClickHandler($(this)); });
        $planTable.on('blur', 'input', function () { self.inputBlurHandler($(this)); });
        
        this._$view.on('pagebeforeshow', function () { self.updateView(); });
    }
    
    
    this.updateView = function () {
        var places = this._timeTable.places;
        var place;
        var i;
        var planTableBody = '';
        for (i = 0; i < places.length; i++) {
            place = places[i];
            if (place) {
                planTableBody += '<tr placeId="' + i + '"><td class="delete"><span class="iconButton buttonDelete" /></td><td class="place"><input value="' + place.name + '" maxlength="3" /></td></tr>';
            }
        }
        this._$view.find('.planTable tbody').html(planTableBody);
    }
}


// SubjectController

function SubjectController(viewId) {
    
    this._$view = $(viewId);
    this._timeTable = null;
    
    this.viewId = viewId;
    
    this.setParams = function (timeTable) {
        this._timeTable = timeTable;
    }
    
    
    this.addRowClickHandler = function () {
        var newSubjectId = this._timeTable.subjects.length;
        if (newSubjectId == 0) {
            // Voglio lasciare vuoto il primo slot
            newSubjectId = 1;
        }
        var newSubject = new Subject();
        newSubject.color = '#444444';
        this._timeTable.subjects[newSubjectId] = newSubject;
        // dataModel.save();
        this.updateView();
        this._$view.find('.planTable tbody tr').last().find('input').focus();
    }
    
    
    this.colorCellClickHandler = function ($cell) {
        var color = $cell.css('background-color');
        $selectedRow.find('input').css({ backgroundColor: color });
        $selectedRow.find('.buttonDroplet').css({ color: color });
        var subjectId = $selectedRow.attr('subjectId');
        this._timeTable.subjects[subjectId].color = color;
        dataModel.save();
        $('#colorTable').hide('fast');
    }
    
    
    this.deleteCellClickHandler = function ($td) {
        var subjectId = $td.parent().attr('subjectId');
        if (confirm('Elimino la materia?')) {
            this._timeTable.deleteSubject(subjectId);
            dataModel.save();
            this.updateView();
        }
    }
    
    
    this.dropletCellClickHandler = function ($td) {
        $selectedRow = $td.parent();
        $('#colorTable').css({ top: $selectedRow.position().top - 32 });
        $('#colorTable').toggle('fast');
    }
    
    
    this.inputBlurHandler = function ($input) {
        var subjectId = $input.parent().parent().attr('subjectId');
        var subject = this._timeTable.subjects[subjectId];
        subject.name = $input.val();
        dataModel.save();
    }
    
    
    this.bindEventHandlers = function () {
        var self = this;
        var $planTable = this._$view.find('.planTable');
        $planTable.find('.addRow').click(function () { self.addRowClickHandler(); });
        $planTable.on('click', '.delete', function () { self.deleteCellClickHandler($(this)); });
        $planTable.on('blur', 'input', function () { self.inputBlurHandler($(this)); });
        $planTable.on('click', '.droplet', function () { self.dropletCellClickHandler($(this)); });
        
        $('#colorTable').on('click', 'td', function () { self.colorCellClickHandler($(this)); });
        
        this._$view.on('pagebeforeshow', function () { self.updateView(); });
    }
    
    
    this.updateView = function () {
        var subjects = this._timeTable.subjects;
        var subject;
        var i;
        var planTableBody = '';
        for (i = 0; i < subjects.length; i++) {
            subject = subjects[i];
            if (subject) {
                planTableBody += '<tr subjectId="' + i + '"><td class="delete"><span class="iconButton buttonDelete" /></td><td class="subject"><input style="background-color:' + subject.color + '" value="' + subject.name + '" maxlength="16" /></td><td class="droplet"><span class="iconButton buttonDroplet" style="color:' + subject.color + '" /></td></tr>';
            }
        }
        this._$view.find('.planTable tbody').html(planTableBody);
    }
}


// GetController

function GetController(viewId) {
    
    this._$view = $(viewId);
    this.viewId = viewId;
    
    
    this.showError = function () {
        this._$view.find('.message').addClass('error');
        this._$view.find('.message').html('Non è stato possibile caricare l\'orario<br />Riprova dopo esserti assicurato di essere online');
        this._$view.find('.message').show();
    }
    
    
    this.showSuccess = function () {
        this._$view.find('.message').removeClass('error');
        this._$view.find('.message').html('Caricamento orario riuscito');
        this._$view.find('.message').show();
        this._$view.find('input').hide();
        this._$view.find('.button').hide();
    }
    
    
    this.dataReceivedHandler = function (result) {
        var timeTable = new TimeTable();
        
        if ($('#getCodeInput').val().length == 8) {
            var sourceObject = $.parseJSON(result);
            timeTable.loadFromObject(sourceObject);
        } else {
            timeTable.loadFromShareableString(result);
        }
        
        dataModel.timeTables.push(timeTable);
        dataModel.save();
        this.showSuccess();
    }
    
    
    this.getJsonData = function () {
        var self = this;
        $.ajax({
               type: 'GET',
               url: 'http://orario.pearson.it/1/timeTables/' + $('#getCodeInput').val(),
               data: null,
               timeout: 3000
               }).done(function (result) { self.dataReceivedHandler(result); }).fail(function () { self.showError(); });
    }
    
    
    this.bindEventHandlers = function () {
        var self = this;
        $('#getButton').click(function () { self.getJsonData(); });
        this._$view.on('pageshow', function () { self.updateView(); });
    }
    
    
    this.updateView = function () {
        this._$view.find('.message').hide();
        this._$view.find('input').val('').show();
        this._$view.find('.button').show();
    }
}


// PutController

function PutController(viewId) {
    
    this._$view = $(viewId);
    this._timeTable = null;
    
    this.viewId = viewId;
    
    this.setParams = function (timeTable) {
        this._timeTable = timeTable;
    }
    
    
    function showError() {
        this._$view.find('div.headline').addClass('error');
        this._$view.find('div.headline').html('Non è stato possible condividere l\'orario');
        this._$view.find('p.latin').addClass('error');
        this._$view.find('p.latin').addClass('info');
        this._$view.find('p.latin').html('Riprova dopo esserti assicurato di essere online');
        this._$view.find('div.hint').hide();
        this._$view.find('input.single').hide();
    }
    
    
    function dataSentHandler(data, textStatus) {
        $('#putCodeInput').val(data);
    }
    
    
    this.bindEventHandlers = function () {
        var self = this;
        this._$view.on('pageshow', function () { self.updateView(); });
    }
    
    
    this.updateView = function () {
        // Voglio salvare tutti i campi di currentTimeTable, tranne 'calendar'
        // Faccio una copia il calendario: non è il modo più efficente,
        // ma sono sicuro di non dimenticare delle proprietà.
        var timeTableToSave = JSON.parse(JSON.stringify(this._timeTable));
        // Elimino dalla copia la proprietà 'calendar'
        delete timeTableToSave.calendar;
        
        // Preparo i dati da inviare.
        // Si tratta di un oggetto con la sola proprietà 'content';
        // serve per eventuali upgrade futuri, servisse aggiungere altre proprietà senza compromettere l'attuale funzionamento.
        // content è una stringa in formato JSON del calendario, che verrà memorizzata così come è nel database.
        // L'oggetto viene poi ulteriormente trasformato in JSON per inviarlo al server.
        var jsonTimeTable = JSON.stringify({ content: JSON.stringify(timeTableToSave) });
        
        $.ajax({
               type: 'POST',
               url: 'http://orario.pearson.it/1/timeTables/',
               contentType: 'application/json',
               data: jsonTimeTable,
               timeout: 3000
               }).success(dataSentHandler).error(showError);
    }
}


// TimetablesController

function TimetablesController(viewId) {
    
    this.$view = $(viewId);
    
    
    this.setEditing = function (isEditing) {
        var $planTable = this.$view.find('.planTable');
        if (isEditing) {
            $planTable.addClass('editing');
            $planTable.find('input').removeAttr('readonly');
        } else {
            $planTable.removeClass('editing');
            $planTable.find('input').attr('readonly', 'readonly');
        }
    }
    
    
    this.deleteCellClickHandler = function ($cell) {
        var timeTableIndex = parseInt($cell.parent().attr('timeTableIndex'));
        if (confirm('Elimino l\'orario \'' + dataModel.timeTables[timeTableIndex].name + '\'?')) {
            dataModel.timeTables.splice(timeTableIndex, 1);
            dataModel.save();
            this.updateView();
        }
    }
    
    
    this.inputCellBlurHandler = function ($cell) {
        var timeTableIndex = parseInt($cell.parent().parent().attr('timeTableIndex'));
        var selectedTimeTable = dataModel.timeTables[timeTableIndex];
        selectedTimeTable.name = $cell.val();
        dataModel.save();
    }
    
    
    this.rowClickHandler = function ($row) {
        var $planTable = this.$view.find('.planTable');
        if (!$planTable.hasClass('editing')) {
            // Passo attraverso timeTableIndex anziché il semplice numero di riga
            // nel caso in cui ad esempio
            // decidessi di ordinare diversamente gli orari
            // application.currentTimeTableIndex = parseInt($row.attr('timeTableIndex'));
            var timeTableIndex = parseInt($row.attr('timeTableIndex'));
            // Bisogna prima impostare timeTable poi la data,
            // perché la data viene "limitata" all'interno del calendario
            application.calendarController.setTimeTable(dataModel.timeTables[timeTableIndex]);
            application.calendarController.setCurrentDate(new Date());
            $.mobile.changePage(application.calendarController.viewId, { transition: 'slide' });
            // $.mobile.navigate( '#calendarView' );;
            // location = '#calendarView';
        }
    }
    
    
    this.addTimetableClickHandler = function () {
        var newTimeTable = new TimeTable();
        newTimeTable.populate();
        dataModel.timeTables.push(newTimeTable);
        dataModel.save();
        this.updateView();
        // TODO: verificare se serve
        this.$view.find('.planTable tbody tr').last().find('input').focus();
    }
    
    
    this.toggleEditingClickHandler = function () {
        if (this.$view.find('.planTable').hasClass('editing')) {
            this.setEditing(false);
        } else {
            this.setEditing(true);
        }
    }
    
    
    this.bindEventHandlers = function () {
        var self = this;
        var $planTable = this.$view.find('.planTable');
        $planTable.on('click', '.deleteCell', function () { self.deleteCellClickHandler($(this)); });
        $planTable.on('blur', 'input', function () { self.inputCellBlurHandler($(this)); });
        $planTable.on('click', 'tr', function() { self.rowClickHandler($(this)); });
        $('#addTimetableButton').on('click', function () { self.addTimetableClickHandler(); });
        $('#toggleEditingButton').on('click', function () { self.toggleEditingClickHandler(); });
        this.$view.on('pageshow', function () { self.updateView(); });
    }
    
    
    this.updateView = function () {
        var $planTable = this.$view.find('.planTable');
        var timeTables = dataModel.timeTables;
        var readonlyAttr = $planTable.hasClass('editing') ? '' : ' readonly="readonly"';
        var timeTable;
        var i;
        var planTableBody = '';
        for (i = 0; i < timeTables.length; i++) {
            timeTable = timeTables[i];
            planTableBody += '<tr timeTableIndex="' + i + '"><td class="commandCell deleteCell"><div class="iconButton buttonDelete"></div></td><td><input' + readonlyAttr + ' value="' + timeTable.name + '" maxlength="40" /></td><td class="accessoryCell"><div class="disclosureButton"></div></td></tr>';
        }
        $planTable.find('tbody').html(planTableBody);
    }
}


// Application

function TimeTableApplication() {
    
    this.init = function () {
        var self = this;
        
        this.calendarController = new CalendarController('#calendarView');
        this.planController = new PlanController('#planView');
        this.noteController = new NoteController('#noteView');
        this.placeController = new PlaceController('#placeView');
        this.subjectController = new SubjectController('#subjectView');
        this.getController = new GetController('#getView');
        this.putController = new PutController('#putView');
        this.timetablesController = new TimetablesController('#timetablesView');
        
        this.calendarController.bindEventHandlers();
        this.planController.bindEventHandlers();
        this.noteController.bindEventHandlers();
        this.placeController.bindEventHandlers();
        this.subjectController.bindEventHandlers();
        this.getController.bindEventHandlers();
        this.putController.bindEventHandlers();
        this.timetablesController.bindEventHandlers();
        
        // La prima view la aggiorno così:
        dataModel.load(function () { self.timetablesController.updateView(); });
    }
}


var application = new TimeTableApplication();


$(document).ready(function () { application.init(); });




