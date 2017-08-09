














































    currentIndex = 0;
    pages = [$('#page1'), $('#page2'), $('#page3')];

    function left() {

        if (currentIndex === 0) return;

        pages[currentIndex].removeClass('stage-center');
        pages[currentIndex].addClass('stage-right');

        pages[currentIndex - 1].removeClass('stage-left');
        pages[currentIndex - 1].addClass('stage-center');

        currentIndex = currentIndex - 1;

    }

    function right() {

        if (currentIndex === pages.length - 1) return;

        pages[currentIndex].removeClass('stage-center');
        pages[currentIndex].addClass('stage-left');

        pages[currentIndex + 1].removeClass('stage-right');
        pages[currentIndex + 1].addClass('stage-center');

        currentIndex = currentIndex + 1;

    }

    $('.page').swipe(function(){
        alert('swipe!');
    });






/* TODO:

    clean iscroll resources (contacts & db)
    clean twis resources (each page)
    Check geoLocation timeout
    Why geolocation fails in compass
    unwatch doesn't remove the location symbol

*/

var AppRouter = Backbone.Router.extend({

    routes: {
        "api/:name":        "api",
        "api/:name/:page":  "page",
        "doc/:name":        "doc"
    },

    initialize: function (options) {

        var self = this;

        this.samples = new SampleCollection([
            {id: 1, name: "Accelerometer", view: "AccelerometerView", description: "Get x, y, z device acceleration",
                methods: [
                    {name: "getCurrentAcceleration", view: "AccelerometerView/0", description: "Get device's current acceleration"},
                    {name: "watchAcceleration", view: "AccelerometerView/1", description: "Watch acceleration at specified interval"},
                    {name: "clearWatch", view: "AccelerometerView/2", description: "Stop watching acceleration"}
                ]},
            {id: 2, name: "Camera", view: "CameraView", description: "Take pictures from your app",
                methods: [
                    {name: "getPicture", view: "CameraView/0", description: "Get a picture from the camera app"},
                    {name: "cleanup", view: "CameraView/1", description: "Cleanup temporary files"}
                ]},
            {id: 3, name: "Capture", view: "CaptureView", description: "Sound, pictures, and videos",
                methods: [
                    {name: "captureAudio", view: "CaptureView/0", description: "Record an audio clip"},
                    {name: "captureImage", view: "CaptureView/1", description: "Take a picture using device's camera app"},
                    {name: "captureVideo", view: "CaptureView/2", description: "Record a video clip"}
                ]},
            {id: 4, name: "Compass", view: "CompassView", description: "Get compass orientation",
                methods: [
                    {name: "getCurrentHeading", view: "CompassView/0", description: "Get current heading"},
                    {name: "watchHeading", view: "CompassView/1", description: "Watch heading at specified interval"},
                    {name: "clearWatch", view: "CompassView/2", description: "Stop watching heading"}
                ]},
            {id: 5, name: "Connection", view: "ConnectionView/0", description: "Get network connection info"},
            {id: 6, name: "Contacts", view: "ContactView", description: "Find and modify contacts",
                methods: [
                    {name: "create", view: "ContactView/0", description: "Create a contact"},
                    {name: "find", view: "ContactView/1", description: "Find contacts"}
                ]},
            {id: 7, name: "Database", view: "DatabaseView", description: "Access a local database",
                methods: [
                    {name: "transaction", view: "DatabaseView/0", description: "Run a database transaction"},
                    {name: "executeSQL", view: "DatabaseView/1", description: "Execute a SQL statement"},
                    {name: "SQLResultSetList", view: "DatabaseView/2", description: "Manipulate result set with multiple rows"}
                ]},
            {id: 8, name: "Device", view: "DeviceView/0", description: "General device information"},
            {id: 9, name: "Events", view: "EventsView", description: "Handle app life cycle events",
                methods: [
                    {name: "pause and resume", view: "EventsView/0", description: "App background/foreground events"},
                    {name: "online and offline", view: "EventsView/1", description: "Listen for network events"},
                    {name: "battery", view: "EventsView/2", description: "Listen for battery events"},
                    {name: "startcall and endcall", view: "EventsView/3", description: "Listen for call events"}
                ]},
            {id: 10, name: "File", view: "FileView", description: "Read and write local files",
                methods: [
                    {name: "read", view: "FileView/0", description: "Read a text file"},
                    {name: "write", view: "FileView/1", description: "Write a file"}
                ]},
            {id: 11, name: "Geolocation", view: "GeolocationView", description: "Track your location",
                methods: [
                    {name: "getCurrentPosition", view: "GeolocationView/0", description: "Get current location"},
                    {name: "watchPosition", view: "GeolocationView/1", description: "Watch location at regular interval"},
                    {name: "clearWatch", view: "GeolocationView/2", description: "Stop watching location"},
                    {name: "Google Maps", view: "GeolocationView/3", description: "Using the Google Maps API"}
                ]},
            {id: 12, name: "Notification", view: "NotificationView", description: "Display native alerts",
                methods: [
                    {name: "alert", view: "NotificationView/0", description: "Display an alert dialog"},
                    {name: "confirm", view: "NotificationView/1", description: "Display a customizable dialog box"},
                    {name: "beep", view: "NotificationView/2", description: "Play a sound"}
                ]}

        ]);

        this.sampleList = new SampleListView({model: this.samples, el: $('#mainList')});

        methods = new MethodCollection();
        this.methodList = new SampleListView({model: methods, el: $('#subList')});

        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {

            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function(event) {
                self.selectItem(event);
            });
            $('body').on('touchend', 'a', function(event) {
                self.deselectItem(event);
            });
        } else {
//            ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                self.selectItem(event);
            });
            $('body').on('mouseup', 'a', function(event) {
                self.deselectItem(event);
            });
        }

    },

    page: function(api, page) {

        var klass = window[api];

        if (klass === undefined) {
            showAlert('API does not exist', 'Error');
            return;
        }

        if (this.currentView && this.currentView instanceof klass) {
            this.currentView.showPage(page);
            return;
        }

        if (this.currentView) {
            if (this.currentView.close) {
                this.currentView.close();
            }
            this.currentView.undelegateEvents();
            $(this.currentView.el).empty();
        }
        this.currentView = new klass({el: "#content", page: page});
    },

    doc: function (name) {
        if (this.currentView) {
            if (this.currentView.close) {
                this.currentView.close();
            }
            this.currentView.undelegateEvents();
            $(this.currentView.el).empty();
        }
        this.currentView = new DocView({el: "#content", api: name});
    },

    selectItem: function(event) {
        $(event.target).addClass('tappable-active');
    },

    deselectItem: function(event) {
        $(event.target).removeClass('tappable-active');
    }

});

templateLoader.load([   'HeaderView',
                        'SampleListItemView',
                        'GeolocationView',
                        'GoogleMapsView',
                        'CameraView',
                        'DeviceView',
                        'AccelerometerView',
                        'CaptureView',
                        'CompassView',
                        'ConnectionView',
                        'ContactView',
                        'EventsView',
                        'NotificationView',
                        'FileView',
                        'DatabaseView'],
    function () {
        app = new AppRouter();
        Backbone.history.start();
});

eventDispatcher = {};

_.extend(eventDispatcher, Backbone.Events);

eventDispatcher.on("showMethods", function(model) {
    $('#title').html(model.get('name'));
    methods.reset(model.get('methods'));
    $('#listContainer').css('left', '-270px');
    $('#backButton').show();
});

eventDispatcher.on("navigate", function(route) {
    app.navigate(route, true);
});

// The Template Loader. Used to asynchronously load templates located in separate .html files
window.templateLoader = {

    templates: {},

    load: function(views, callback) {

        var deferreds = [];

        var self = this;

        $.each(views, function(index, view) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    if (window[view]) {
                        window[view].prototype.template = _.template(data);
                    }
                    self.templates[view] = data;
                }, 'html'));
        });

        $.when.apply(null, deferreds).done(callback);
    }

};

//window.templateLoader = {
//
//	    // Hash of preloaded templates for the app
//	    templates:{},
//
//	    // Recursively pre-load all the templates for the app.
//	    // This implementation should be changed in a production environment. All the template files should be
//	    // concatenated in a single file.
//	    load:function (views, callback) {
//
//	        var self = this;
//
//	        var loadTemplate = function (index) {
//	            var view = views[index];
//	            console.log('Loading template: ' + view);
//	            $.get('tpl/' + view + '.html', function (data) {
//                    if (window[view]) {
//                        window[view].prototype.template = _.template(data);
//                    }
//	                self.templates[view] = data;
//	                index++;
//	                if (index < views.length) {
//	                    loadTemplate(index);
//	                } else {
//	                    callback();
//	                }
//	            });
//	        };
//
//	        loadTemplate(0);
//	    }
//
//};

function showAlert(message, title) {
    if (navigator.notification) {
        navigator.notification.alert(
            message,
            null, // callback
            title,
            'OK' // Button label
        );
    } else {
        alert(title + ": " + message);
    }
}

if ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ) {
    document.write('<link href="css/styles-ios.css" rel="stylesheet">');
} else {
    document.write('<link href="css/styles-android.css" rel="stylesheet">');
}

window.Sample = Backbone.Model.extend({
});

window.SampleCollection = Backbone.Collection.extend({

    model: Sample

});

window.Method = Backbone.Model.extend({
});

window.MethodCollection = Backbone.Collection.extend({

    model: Method

});

window.CameraView = window.PagedView.extend({

    events: {
        "touchstart .getBtn":    "getPicture",
        "touchstart .cleanBtn":  "cleanup"
    },

    getPicture: function() {
        navigator.camera.getPicture(this.successHandler, this.errorHandler,
            {   quality: parseInt($('#quality').val(), 10),
                destinationType: parseInt($('#destinationType').val(), 10),
                sourceType: parseInt($('#sourceType').val(), 10),
                encodingType: parseInt($('#encodingType').val(), 10)
            });
        return false;
    },

    cleanup: function() {
        navigator.camera.cleanup(
            function() {
                showAlert('Success', 'cleanup');
            },
            function() {
                showAlert('Error', 'cleanup');
            });
        return false;
    },

    successHandler: function(imageData) {
        $('#image').attr('src', "data:image/jpeg;base64," + imageData);
    },

    errorHandler: function(error) {
        showAlert(error, "Camera");
    },

    close: function() {
        navigator.camera.cleanup();
    }

});


window.EventsView = window.PagedView.extend({

    events: {
        "touchstart #pauseBtn":   "addPauseResume",
        "touchstart #onlineBtn":  "addOnlineOffline",
        "touchstart #batteryBtn": "addBattery",
        "touchstart #callBtn":    "addCall"
    },

    addPauseResume: function () {
        if (this.pauseResumeRegistered) {
            showAlert("The pause and resume events have already been registered", "Error");
            return;
        }
        this.logListener("#pauseLog", "pause");
        document.addEventListener("pause", this.pauseHandler, false);
        this.logListener("#pauseLog", "resume");
        document.addEventListener("resume", this.resumeHandler, false);
        this.pauseResumeRegistered = true;
    },

    addOnlineOffline: function () {
        if (this.onlineOfflineRegistered) {
            showAlert("The online and offline events have already been registered", "Error");
            return;
        }
        this.logListener("#onlineLog", "online");
        document.addEventListener("online", this.onlineHandler, false);
        this.logListener("#onlineLog", "offline");
        document.addEventListener("resume", this.offlineHandler, false);
        this.onlineOfflineRegistered = true;
    },

    addBattery: function () {
        if (this.batteryRegistered) {
            showAlert("The battery events have already been registered", "Error");
            return;
        }
        this.logListener("#batteryLog", "batterystatus");
        document.addEventListener("batterystatus", this.batterystatusHandler, false);
        this.logListener("#batteryLog", "batterylow");
        document.addEventListener("batterylow", this.batterylowHandler, false);
        this.logListener("#batteryLog", "batterycritical");
        document.addEventListener("batterycritical", this.batterycriticalHandler, false);
        this.batteryRegistered = true;
    },

    addCall: function () {
        if (this.callRegistered) {
            showAlert("The startcall and endcall events have already been registered", "Error");
            return;
        }
        this.logListener("#callLog", "online");
        document.addEventListener("startcall", this.startcallHandler, false);
        this.logListener("#callLog", "endcall");
        document.addEventListener("resume", this.endcallHandler, false);
        this.callRegistered = true;
    },

    log: function(selector, msg) {
        $(selector).val($(selector).val() + msg + "\r\n");
    },

    logListener: function(selector, name) {
        this.log(selector, 'Adding event listener "' + name + '"');
    },

    pauseHandler: function() {
        this.log('#pauseLog', 'Event: pause');
    },

    resumeHandler: function() {
        this.log('#pauseLog', 'Event: resume');
    },

    onlineHandler: function() {
        this.log('#onlineLog', 'Event: online');
    },

    offlineHandler: function() {
        this.log('#onlineLog', 'Event: offline');
    },

    batterystatusHandler: function() {
        this.log('#batteryLog', 'Event: batterystatus');
    },

    batterylowHandler: function() {
        this.log('#batteryLog', 'Event: batterylow');
    },

    batterycriticalHandler: function() {
        this.log('#batteryLog', 'Event: batterycritical');
    },

    startcallHandler: function() {
        this.log('#callLog', 'Event: startcall');
    },

    endcallHandler: function() {
        this.log('#callLog', 'Event: endcall');
    },

    close: function() {
        document.removeEventListener('pause', this.pauseHandler);
        document.removeEventListener('resume', this.resumeHandler);
        document.removeEventListener('online', this.onlineHandler);
        document.removeEventListener('offline', this.offlineHandler);
        document.removeEventListener('batterystatus', this.batterystatusHandler);
        document.removeEventListener('batterylow', this.batterylowHandler());
        document.removeEventListener('batterycritical', this.batterycritical);
        document.removeEventListener('startcall', this.startcall);
        document.removeEventListener('endcall', this.endcall);
    }

});


window.CaptureView = window.PagedView.extend({

    events: {
        "click .audioBtn":  "captureAudio",
        "click .imgBtn":    "captureImage",
        "click .videoBtn":  "captureVideo"
    },

    captureAudio: function() {
        var self = this;
        navigator.device.capture.captureAudio(
            function(files) {
                $('#capturedAudio').attr('controls', 'controls');
                self.loadMedia(files, "#capturedAudio");
            },
            this.errorHandler,
            {
                limit:1, duration: Number($('#duration').val())
            });
        return false;
    },

    captureImage: function() {
        var self = this;
        navigator.device.capture.captureImage(function(files) {
            $('#capturedImage').show();
            self.loadMedia(files, "#capturedImage");
        }, this.errorHandler)
        return false;
    },

    captureVideo: function() {
        var self = this;
        navigator.device.capture.captureVideo(function(files) {
            self.loadMedia(files, "#capturedVideo");
        }, this.errorHandler)
        return false;
    },

    loadMedia: function(files, target) {
        var i, path, len;
        for (i = 0, len = files.length; i < len; i += 1) {
            path = files[i].fullPath;
            $(target).attr('src', path);
        }
    },

    errorHandler: function(error) {
        showAlert(error, "Capture");
    }

});

window.AccelerometerView = window.PagedView.extend({

    events: {
        "touchstart .getBtn":            "getHandler",
        "touchstart .watchBtn":          "watchHandler",
        "touchstart .clearBtn":          "clearHandler",
        "touchstart #watchFrequency":   "changeFrequency"
    },

    getHandler: function () {
        navigator.accelerometer.getCurrentAcceleration(this.successHandler, this.errorHandler);
        return false;
    },

    watchHandler: function () {
        if (this.watchId) {
            showAlert("You are already watching", "Accelerometer");
        } else {
            this.watchId = navigator.accelerometer.watchAcceleration(this.watchSuccessHandler, this.errorHandler, { frequency: Number($('#watchFrequency').val()) });
            $('#watchId1').html('"' + this.watchId + '"');
            $('#watchId2').html('"' + this.watchId + '"');
        }
        return false;
    },

    clearHandler: function () {
        if (this.watchId) {
            navigator.accelerometer.clearWatch(this.watchId);
            this.watchId = undefined;
            delete(this.watchId);
            $('#watchId1').html('undefined');
            $('#watchId2').html('undefined');
        } else {
            showAlert("Nothing to clear!!!", "Accelerometer");
        }
        return false;
    },

    changeFrequency: function () {
        if (this.watchId) {
            navigator.accelerometer.clearWatch(this.watchId);
            delete(this.watchId);
            this.watchHandler();
        }
        return false;
    },

    successHandler: function (acceleration) {
        $('#accelerationX1').html(acceleration.x);
        $('#accelerationY1').html(acceleration.y);
        $('#accelerationZ1').html(acceleration.z);
        $('#accelerationTime1').html(acceleration.timestamp);
    },

    watchSuccessHandler: function (acceleration) {
        $('#accelerationX2').html(acceleration.x);
        $('#accelerationY2').html(acceleration.y);
        $('#accelerationZ2').html(acceleration.z);
        $('#accelerationTime2').html(acceleration.timestamp);
    },

    errorHandler: function (error) {
        showAlert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n', 'Error');
    },

    close: function() {
        if (this.watchId) {
            navigator.accelerometer.clearWatch(this.watchId);
        }
    }

});

window.DatabaseView = window.PagedView.extend({

    events: {
        "touchstart .txBtn":     "transaction",
        "touchstart .execBtn":   "execSQL",
        "touchstart .rsBtn":     "select"
    },

    transaction: function() {
        var self = this;
        $('#log1').html('');
        this.db = window.openDatabase("mydb", "1.0", "My Database", 1000000);
        this.db.transaction(this.txHandler,
            function(error) {
                self.log('#log1', 'Transaction failed.\nsqlError.code: ' + error.code + '\nsqlError.message: ' + error.message);
            },
            function() {
                self.log('#log1', 'Transaction succeeded');
            });
    },

    txHandler: function(tx) {
        tx.executeSql("DROP TABLE IF EXISTS state");
        tx.executeSql("CREATE TABLE state (id,name)");
        tx.executeSql("INSERT INTO state (id,name) VALUES ('ME','Maine')");
        tx.executeSql("INSERT INTO state (id,name) VALUES ('OH','OHIO')");
    },

    execSQL: function() {
        var self = this;
        $('#log2').html('');
        this.db = window.openDatabase("mydb", "1.0", "My Database", 1000000);
        this.db.transaction(this.executeStatement,
            function(error) {
                self.log('#log2', 'Transaction failed.\nsqlError.code: ' + error.code + '\nsqlError.message: ' + error.message);
            },
            function() {
                self.log('#log2', 'Transaction succeeded');
            });
    },

    executeStatement: function(tx) {
        var params = $('#params1').val().trim().split(",");
        tx.executeSql($("#stmt1").val(), params, this.stmtSuccess, this.stmtError);
    },

    stmtSuccess: function(tx, results) {
        this.log("#log2", "Statement executed successfully" +
            "<br/>sqlResultSet.insertId: " + results.insertId +
            "<br/>sqlResultSet.rowsAffected: " + results.rowsAffected +
            "<br/>sqlResultSet.rows: " + results.rows +
            "<br/>sqlResultSet.rows.length: " + results.rows.length + ' (rows returned)');
    },

    stmtError: function(error) {
        this.log('#log2', 'Statement error' + error.message);
    },

    select: function() {
        var self = this;
        $('#log3').html('');
        this.db = window.openDatabase("mydb", "1.0", "My Database", 1000000);
        this.db.transaction(this.selectTXHandler,
            function(error) {
                self.log('#log3', 'Transaction failed.\nsqlError.code: ' + error.code + '\nsqlError.message: ' + error.message);
                self.refreshScroll();
            },
            function() {
                self.log('#log3', 'Transaction succeeded');
                self.refreshScroll();
            });
    },

    selectTXHandler: function(tx) {
        tx.executeSql($("#stmt2").val(), null, this.selectStmtSuccess, this.selectStmtError);
    },

    selectStmtSuccess: function(tx, results) {
        var row,
            l = results.rows.length;
        for (var i=0; i < l; i++) {
            var row = results.rows.item(i);
            str = "";
            for (var col in row) {
                str = str + col + ": " + row[col] + " ";
            }
            this.log("#log3", str);
        }
        this.refreshScroll();
    },

    refreshScroll: function() {
        if (this.rowScroll) {
            console.log('refresh rowScroll');
            this.rowScroll.refresh();
        } else {
            console.log('new rowScroll');
            this.rowScroll = new iScroll('rowWrapper', {hScrollbar: false, vScrollbar: false });
        }
    },

    selectStmtError: function(error) {
        this.log('#log3', 'Statement error' + error.message);
    },

    log: function(selector, msg) {
        $(selector).html($(selector).html() + msg + '<br/>');
    }

});

window.PagedView = Backbone.View.extend({

    wrapperWidth: 0,

    initialize: function () {
        _.bindAll(this);
        this.render();
        $('select, input, .noscroll').on('touchstart', function(event){
            event.stopPropagation();
        });
    },

    render: function () {
        $(this.el).html(this.template());
        this.iscroll = new TWIS('#pageWrapper');
        this.updateLayout();
        this.iscroll.scrollToPage(this.options.page);
        prettyPrint();
        return this;
    },

    showPage: function(page) {
        this.iscroll.scrollToPage(page);
        return false;
    },

    updateLayout: function() {
        var currentPage = 0;
        if (this.wrapperWidth > 0) {
            currentPage = - Math.ceil( $('.slider').position().left / this.wrapperWidth);
        }
        this.wrapperWidth = $('.page-wrapper').width();
        console.log('wrapperWidth: ' + this.wrapperWidth);
        $('.slider').css('width', this.wrapperWidth * 4);
        $('.page').css('width', this.wrapperWidth - 40);
        this.iscroll.refresh();
        this.iscroll.scrollToPage(currentPage, 0, 0);
    }

});

window.CompassView = window.PagedView.extend({

    events: {
        "touchstart .getBtn"             : "getHandler",
        "touchstart .watchBtn"           : "watchHandler",
        "touchstart .clearBtn"           : "clearHandler",
        "change #watchFrequency"    : "changeFrequency"
    },

    getHandler: function () {
        navigator.compass.getCurrentHeading(this.successHandler, this.errorHandler);
        return false;
    },

    watchHandler: function () {
        if (this.watchId) {
            showAlert('You are already watching', 'Compass')
        } else {
//            this.geoWatchId = navigator.geolocation.watchPosition();
            this.watchId = navigator.compass.watchHeading(this.watchSuccessHandler, this.errorHandler, { frequency: Number($('#watchFrequency').val()) });
            $('#watchId1').html('"' + this.watchId + '"');
            $('#watchId2').html('"' + this.watchId + '"');
        }
        return false;
    },

    clearHandler: function () {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.geoWatchId);
            navigator.compass.clearWatch(this.watchId);
            delete(this.geoWatchId);
            this.watchId = undefined;
            delete(this.watchId);
            $('#watchId1').html('undefined');
            $('#watchId2').html('undefined');
        } else {
            showAlert('Nothing to clear', 'Compass');
        }
        return false;
    },

    changeFrequency: function () {
        if (this.watchId) {
            navigator.compass.clearWatch(this.watchId);
            delete(this.watchId);
            this.watchHandler();
        }
        return false;
    },

    successHandler: function (compassHeading) {
        $('#magneticHeading').html(compassHeading.magneticHeading);
        $('#trueHeading').html(compassHeading.trueHeading);
        $('#headingAccuracy').html(compassHeading.headingAccuracy);
        $('#headingTimestamp').html(compassHeading.timestamp);

//        $("#compass").css({
//            'transform': 'rotate(' + Math.round(compassHeading.magneticHeading) + 'deg)',
//            '-moz-transform': 'rotate(42deg)',
//            '-o-transform': 'rotate(42deg)',
//            '-webkit-transform': 'rotate(' + Math.round(compassHeading.magneticHeading) + 'deg)'
//        });
    },

    watchSuccessHandler: function (compassHeading) {
        $('#magneticHeading2').html(compassHeading.magneticHeading);
        $('#trueHeading2').html(compassHeading.trueHeading);
        $('#headingAccuracy2').html(compassHeading.headingAccuracy);
        $('#headingTimestamp2').html(compassHeading.timestamp);

//        $("#compass2").css({
//            'transform': 'rotate(' + Math.round(compassHeading.magneticHeading) + 'deg)',
//            '-moz-transform': 'rotate(42deg)',
//            '-o-transform': 'rotate(42deg)',
//            '-webkit-transform': 'rotate(' + Math.round(compassHeading.magneticHeading) + 'deg)'
//        });
    },

    errorHandler: function (error) {
        showAlert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n', 'Error');
    },

    close: function() {
        if (this.watchId) {
            navigator.compass.clearWatch(this.watchId);
        }
        if (this.geoWatchId) {
            navigator.geolocation.clearWatch(this.geoWatchId);
        }
    }

});

window.DeviceView = window.PagedView.extend({

});

window.FileView = window.PagedView.extend({

    initialize: function() {
        window.FileView.__super__.initialize.apply(this);
        var text =
            "This is readme.txt\n" +
            "A file used to demonstrate PhoneGap's File API.\n" +
            "Feel free to modify it, and save it using the write API.\n" +
            "In this app, the file is reinitialized every time this screen is loaded."
        this.writeFile("readme.txt", text);
        $("#writeFileArea").html(text);
    },

    events: {
        "touchstart .readBtn"    : "readHandler",
        "touchstart .writeBtn"   : "writeHandler"
    },

    readFile:function(fileName, selector) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem) {
                fileSystem.root.getFile(fileName, {create: false, exclusive: false},
                    function(file) {
                        var reader = new FileReader();
                        reader.onload = function(event) {
                            $(selector).html(event.target.result);
                        };
                        reader.onerror = function(event) {
                            showAlert('Error loading file');
                        };
                        reader.readAsText(file);
                    },
                    this.getFileError);
            },
            this.fsError);
    },

    writeFile: function(fileName, text, displayMessage) {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
            function(fileSystem) {
                fileSystem.root.getFile(fileName, {create: true, exclusive: false},
                    function(file) {
                        file.createWriter(
                            function(writer) {
                                writer.onwrite = function(event) {
                                    if (displayMessage) {
                                        navigator.notification.alert(
                                            fileName + ' was saved successfully',  // message
                                            null,
                                            'File Save',            // title
                                            'OK'                  // button label
                                        );
                                    }
                                };
                                writer.onerror = function(event) {
                                    navigator.notification.alert(
                                        'An error occurred while saving the file',  // message
                                        null,
                                        'File Save',            // title
                                        'OK'                  // button label
                                    );
                                };
                                writer.write(text);
                            },
                            function() {
                                showAlert('An error has occurred', 'createWriter');
                            }
                        );
                    },
                    this.getFileError);
            },
            this.fsError);
    },

    readHandler: function() {
        this.readFile('readme.txt', '#readFileArea');
        return false;
    },

    writeHandler: function() {
        this.writeFile('readme.txt', $('#writeFileArea').val(), true);
        return false;
    }

});

window.NotificationView = window.PagedView.extend({

    events: {
        "touchstart .alertBtn"   : "alertHandler",
        "touchstart .confirmBtn" : "confirmHandler",
        "touchstart .beepBtn"    : "beepHandler"
    },

    alertHandler: function() {
        var self = this;
        navigator.notification.alert(
            $('#message1').val(),  // message
            function() {            // callback
                self.log("#log1", "Alert dismissed");
            },
            $('#title1').val(),            // title
            $('#buttonLabel').val()                  // button label
        );
        return false;
    },

    confirmHandler: function() {
        var self = this;
        navigator.notification.confirm(
            $('#message2').val(),  // message
            function(button) {
                self.log("#log2", "Confirm dismissed. You pressed button #: " + button);
            },
            $('#title2').val(),            // title
            $('#buttonLabels').val()                  // button label
        );
        return false;
    },

    beepHandler: function() {
        navigator.notification.beep(1);
        return false;
    },

    log: function(selector, msg) {
        $(selector).val($(selector).val() + msg + "\r\n");
    }

});

SideBarView = Backbone.View.extend({

    events: {
        "click li": "selectItem"
    },

    selectItem: function(event) {
        $('li', $(this.el)).removeClass('active');
        $(event.currentTarget).addClass('active');
    }

});


SampleListView = Backbone.View.extend({

    initialize: function() {
        _.bindAll(this);
        this.render();
        this.model.on('reset', this.render);
    },

    events: {
        "click li": "selectItem"
    },

    render: function(eventName) {
        var ul = $('ul', this.el);
        ul.empty();
        _.each(this.model.models, function(api) {
            ul.append(new SampleListItemView({model: api}).render().el);
        }, this);
        if (this.iscroll) {
            console.log('Refresh iScroll');
            this.iscroll.refresh();
        } else {
            console.log('New iScroll');
            this.iscroll = new iScroll(this.el, {hScrollbar: false, vScrollbar: false });
        }
        return this;
    },

    selectItem: function(event) {
        $('li', $(this.el)).removeClass('active');
        $(event.currentTarget).addClass('active');
    }

});

SampleListItemView = Backbone.View.extend({

    tagName: "li",

    events: {
        "click": "selectItem"
    },

    render: function(eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },

    selectItem: function(event) {
        var methods = this.model.get('methods');
        if (methods) {
            eventDispatcher.trigger('showMethods', this.model);
        } else if (this.model.get('view')) {
            eventDispatcher.trigger('navigate', 'api/' + this.model.get('view'));
        }
        return false;
    }
});

window.ConnectionView = window.PagedView.extend({

});


window.ContactView = window.PagedView.extend({

    events: {
        "touchstart #findBtn":   "findHandler",
        "touchstart #createBtn": "createHandler"
    },

    findHandler: function() {
        var self = this;
        var fields = ["id", "name", "phoneNumbers", 'emails'];
        navigator.contacts.find(
            fields,
            function(contacts) {
                $('#contactList').empty();
                this.contacts = contacts;
                for (var i=0; i < contacts.length; i++) {
                    var contact = contacts[i];
                    console.log('name: ' + contact.toString());
                    if (contact.name.givenName || contact.name.familyName) {
                        $('#contactList').append("<li>" + contact.name.givenName + " " + contact.name.familyName + "</li>");
                    }
                }
                if (self.contactScroll) {
                    console.log('Refresh iScroll');
                    self.contactScroll.refresh();
                } else {
                    console.log('New iScroll');
                    self.contactScroll = new iScroll('contactWrapper', {hScrollbar: false, vScrollbar: false });
                }
            },
            this.contactError,
            {filter: $('#contactSearchKey').val(), multiple: true});
        return false;
    },

    createHandler: function() {
        var contact = {};
        contact.name = {givenName: $('#givenName').val(), familyName:  $('#lastName').val()};
        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField($('#phoneType1').val(), $('#phone1').val());
        phoneNumbers[1] = new ContactField($('#phoneType2').val(), $('#phone2').val());
        contact.phoneNumbers = phoneNumbers;
        var emails = [];
        emails[0] = new ContactField($('#emailType1').val(), $('#email1').val());
        emails[1] = new ContactField($('#emailType2').val(), $('#email2').val());
        contact.emails = emails;
        var result = navigator.contacts.create(contact);
        result.save();
        $('#givenName').val('');
        $('#lastName').val('');
        $('#phoneType1').val('');
        $('#phoneType2').val('');
        $('#phone1').val('');
        $('#phone2').val('');
        $('#emailType1').val('');
        $('#emailType2').val('');
        $('#email1').val('');
        $('#email2').val('');
        return false;
    },

    contactError: function() {
        showAlert('An error has occurred', 'Contact');
    }

});


window.DocView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html("<div class='docWrapper'><iframe src='doc/" + this.options.api + ".html' frameborder='0' width='100%' height='100%'></iframe></div>");
        return this;
    }

});


window.GeolocationView = window.PagedView.extend({

    render: function() {
        window.GeolocationView.__super__.render.apply(this);
        var myOptions = {
                  center: new google.maps.LatLng(-34.397, 150.644),
                  zoom: 8,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                };
        this.map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);
    },

    events: {
        "touchstart .getBtn":            "getPosition",
        "touchstart .watchBtn":          "watchPosition",
        "touchstart .clearBtn":          "clearHandler",
        "touchstart .googleBtn":         "mapPosition",
        "change #watchFrequency":   "changeFrequency"
    },

    getPosition: function() {
        navigator.geolocation.getCurrentPosition(this.successHandler, this.errorHandler,
            {   enableHighAccuracy: $('#slAccuracy1').val(),
//                timeout: Number( $('#slTimeout1').val() ),
                maximumAge: Number( $('#slMaxAge1').val() )
            });
        return false;
    },

    mapPosition: function() {
        navigator.geolocation.getCurrentPosition(this.googleSuccessHandler, this.errorHandler,
            { enableHighAccuracy: true });
        return false;
    },

    watchPosition: function() {
        if (this.watchId) {
            showAlert('You are already watching', 'Geolocation')
        } else {
            this.watchId = navigator.geolocation.watchPosition(this.watchSuccessHandler, this.errorHandler,
                {   enableHighAccuracy: $('#slAccuracy2').val(),
//                    timeout: Number( $('#slTimeout2').val() ),
                    maximumAge: Number( $('#slMaxAge2').val() )
                });
            $('#watchId1').html('"' + this.watchId + '"');
            $('#watchId2').html('"' + this.watchId + '"');
        }
        return false;
    },

    clearHandler: function () {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
            delete(this.watchId);
            $('#watchId1').html('undefined');
            $('#watchId2').html('undefined');
        } else {
            showAlert('Nothing to clear!!!', 'Geolocation');
        }
        return false;
    },

    changeFrequency: function () {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
            delete(this.watchId);
            this.watchPosition();
        }
        return false;
    },

    successHandler: function(position) {
        $('#latitude1').html(position.coords.latitude);
        $('#longitude1').html(position.coords.longitude);
        $('#altitude1').html(position.coords.altitude);
        $('#accuracy1').html(position.coords.accuracy);
        $('#altitudeAccuracy1').html(position.coords.altitudeAccuracy);
        $('#heading1').html(position.coords.heading);
        $('#speed1').html(position.coords.speed);
        $('#timestamp1').html(position.timestamp);
    },

    googleSuccessHandler: function(position) {
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.setCenter(latLng);
        if (this.marker) {
            this.marker.setPosition(latLng)
        } else {
            this.marker = new google.maps.Marker({map: this.map, position: latLng});
        }
    },

    watchSuccessHandler: function(position) {
        $('#latitude2').html(position.coords.latitude);
        $('#longitude2').html(position.coords.longitude);
        $('#altitude2').html(position.coords.altitude);
        $('#accuracy2').html(position.coords.accuracy);
        $('#altitudeAccuracy2').html(position.coords.altitudeAccuracy);
        $('#heading2').html(position.coords.heading);
        $('#speed2').html(position.coords.speed);
        $('#timestamp2').html(position.timestamp);
    },

    errorHandler: function(error) {
        navigator.notification.alert(
            "Can't get your current location. Make sure the geolocation service is enabled for this app.",
            null,
            'Geolocation',
            'OK'
        );
    },

    close: function() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = null;
        }
    }


});
