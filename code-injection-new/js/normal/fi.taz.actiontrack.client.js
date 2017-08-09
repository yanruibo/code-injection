






























































































































































taz.loadingDialog = {};

taz.loadingDialog.animateInterval_ = null;
taz.loadingDialog.html_ = null;
taz.loadingDialog.message_ = '';
taz.loadingDialog.container_ = null;

taz.loadingDialog.initialize = function() {
    this.html_ = taz.getTemplate('loadingdialog')();
};

taz.loadingDialog.setLoadingMessage = function(message) {
	if (message == null || message == undefined) {
		message = '';
	}
    
    this.message_ = taz.htmlDecode(message);

    if (this.container_) {
        this.container_.find('#l-msg').text(this.message_);
    }
};

taz.loadingDialog.show = function() {
	if (this.container_ != null) {
        return;
    }

    this.container_ = $(this.html_);
    this.setLoadingMessage(this.message_);
    var dialog = this.container_.find('#l-dialog');

	//Resize the container
	this.container_.width(window.innerWidth);
	this.container_.height(window.innerHeight);
    this.container_.css("top", $(window).scrollTop());
	
    $('body').append(this.container_);
    
    this.container_.bind("click touchstart touchmove touchend", function(event) {
        event.preventDefault();
        event.stopPropagation();
    });

	//Position the l-dialog
	dialog.css("top", (window.innerHeight - dialog.height()) / 2);
	dialog.css("left", (window.innerWidth - dialog.width()) / 2);
};

taz.loadingDialog.hide = function() {
	if (this.container_ != null) {
        this.container_.remove();
        this.container_ = null;
    }
};


taz.LabelOverlay = function(map, options) {
    this.position_ = options.position;
    this.pixelOffset_ = options.pixelOffset;
    this.text_ = options.text;
    
    this.setMap(map);
};

taz.LabelOverlay.prototype = new google.maps.OverlayView();

taz.LabelOverlay.prototype.position_ = null;
taz.LabelOverlay.prototype.pixelOffset_ = null;
taz.LabelOverlay.prototype.text_ = null;
taz.LabelOverlay.prototype.div_ = null;

taz.LabelOverlay.prototype.onAdd = function() {
    this.div_ = document.createElement('div');
    $(this.div_).addClass("map-overlay-label");
    
    var panes = this.getPanes();
    panes.overlayMouseTarget.appendChild(this.div_);
};

taz.LabelOverlay.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
};

taz.LabelOverlay.prototype.draw = function() {
    var projection = this.getProjection();
    var pxPosition = new taz.Vector2d(projection.fromLatLngToDivPixel(this.position_));
    
    pxPosition.x += this.pixelOffset_.x;
    pxPosition.y += this.pixelOffset_.y;
    
    var width = 75;
    var height = 18;
    
    $(this.div_).text(this.text_);
    $(this.div_).css({
        width: width + 'px',
        height: height + 'px',
        position: 'absolute',
        left: (pxPosition.x - width/2) + 'px',
        top: (pxPosition.y - height/2) + 'px'
    });
};

/**
 * @class Handles the connection to the game server.
 *
 * @constructor
 * @implements {taz.Backend}
 */
taz.OfflineBackend = function() {
    this.uuid_ = this.createUUID_();
    this.masterServerRequestSender_ = new taz.AjaxRequestSender(taz.settings.masterServerUrl);
};

/** 
 * Inherit from taz.Backend.
 */
taz.inherits(taz.OfflineBackend, taz.ServerBackend);

/** @inheritDoc */
taz.OfflineBackend.prototype.isGameRunning = function(gameId, callback) {   
    callback && callback(true);
};

/** @inheritDoc */
taz.OfflineBackend.prototype.isPermissionToStart = function(gameId, teamId, callback) {
    callback && callback(true);
};

/** @inheritDoc */
taz.OfflineBackend.prototype.updateTeamStatus = function(gameId, teamId, position, 
                                                        state, points, nextcheckpointId, 
                                                        traveledDist, callback) {
    callback && callback({
        hasGameEnded: false,
        newMessages: false,
        numberOfTeams: 1,
        pointAdjustment: 0,
        ranking: 1,
        teamInGame: true
    });
};

/** @inheritDoc */
taz.OfflineBackend.prototype.updateTeamStatusAfterCp = function(gameId, teamId, position, 
                                                        state, points, nextcheckpointId, 
                                                        traveledDist, callback) {
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        var data = {
            latitude : position.latitude,
            longitude : position.longitude,
            timestamp : new Date().getTime(),
            gameTime : taz.gameTimer.getTime(),
            status : state,
            points : points,
            nextCheckPointId: nextcheckpointId,
            traveledDistance: traveledDist
        };
        
        request.type = taz.AjaxRequest.Type.POST;
        request.path = 'resource/game/' + gameId + '/team/' + teamId + '/statusupdate';
        request.data = data;
        request.messageType = taz.AjaxRequest.MessageType.STATUS_UPDATE;
        request.successCallback = callback;
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.OfflineBackend.updateTeamStatus: Active game server URL is not set!");
    }
};

/** @inheritDoc */
taz.OfflineBackend.prototype.getNextCheckPoint = function(gameId, teamId, validCheckPoints, hasConnections, callback) {
    callback && callback(-1);
};

/** @inheritDoc */
taz.OfflineBackend.prototype.arrivedToCheckPoint = function(gameId, teamId, checkPointTemplateId, callback) {
    console.warn("Calling of deprecated functionality: taz.OfflineBackend.arrivedToCheckPoint");        
    callback && callback();
};

 /** @inheritDoc */
taz.OfflineBackend.prototype.leftCheckPoint = function(gameId, teamId, callback) {
    console.warn("Calling of deprecated functionality: taz.OfflineBackend.leftCheckPoint");        
    callback && callback();
};

/** @inheritDoc */
taz.OfflineBackend.prototype.getCheckPointStatus = function(gameId, checkPointId, callback) {
    console.warn("Calling of deprecated functionality: taz.OfflineBackend.getCheckPointStatus");
    callback && callback();
};

/** @inheritDoc */
taz.OfflineBackend.prototype.answerTask = function(gameId, teamId, answer, callback) {    
    callback && callback(null);
};

/** @inheritDoc */
taz.OfflineBackend.prototype.getMessages = function(messageThreadId, callback) {
    console.warn("WARN: Calling of OfflineBackend.getMessages should not happen in offline mode!");
    callback && callback([]);
};

taz.OfflineBackend.prototype.sendMessage = function(gameId, teamId, messageThreadId, message, callback) {
    console.warn("WARN: Calling of OfflineBackend.sendMessage should not happen in offline mode!");
    callback && callback(null);       
};

taz.OfflineBackend.prototype.setMessageThreadRead = function(messageThreadId, messageId, callback) {
    callback && callback(); 
};

taz.OfflineBackend.prototype.getTeamLocations = function(gameId, callback, error) {
    callback([]);
};

/**
 * Returns information about the current network status.
 */
taz.OfflineBackend.prototype.getNetworkInfo = function() {
    if (this.gameServerRequestSender_ != null) {
        return this.gameServerRequestSender_.getInfo();
    }
    else {
        console.log("taz.OfflineBackend.getNetworkInfo: Active game server URL is not set!");
    }
    
    return null;
};



/**
 * @const
 */
taz.settings = {
    disablePersistence : false,
    dontWaitForGPSFix : false,
    countdownTime : 6,
    requiredLocationAccuracy : 200,
    masterServerUrl : 'http://masterserver.taz.fi:8080/TAZActionTrackMasterServer/',
//    serverUrl : 'http://192.168.1.7:8080/TAZActionTrackServer/',
    serverUsername : 'client',
    serverPassword : 'ClientTazActionTrck',
    clientVersion : '1.5.4',
    minServerVersion : '1.5.0'
};


/**
 * class FileManager
 */
taz.FileHelper = function() {
    
};

taz.FileHelper.prototype.success = null;

taz.FileHelper.prototype.notFound = null;

taz.FileHelper.prototype.error = null;

taz.FileHelper.prototype.readJSON = function(filePath) {
    var that = this;
    
    console.log('readJSON: ' + filePath);
    
    var fileOpened = function(file) {
        var reader = new FileReader();
        
        console.log('fileOpened')
        
        reader.onload = function(evt) {
            console.log('reader.onload')
            console.log(JSON.stringify(evt))
            console.log(JSON.stringify(evt.target))
            console.log(evt.target.result)
            
            if (evt.target.result.length == 0) {
                that.error('File was empty');
                return;
            }
            
            if (that.success) {
                console.log('reader.onload: success exists')
                that.success(JSON.parse(evt.target.result));
            }
        };
        
        reader.onerror = function() {
            console.log('reader.onerror')
            
            if (that.error) {
                that.error('File read failed');
            }
        };
        
        reader.readAsText(file);
    };
    
    var gotFileEntry = function(fileEntry) {  
        console.log('gotFileEntry')
        
        fileEntry.file(fileOpened);
    };
    
    this.getFile_(filePath, false, gotFileEntry, this.notFound);
};

taz.FileHelper.prototype.getFile_ = function(filePath, createFile, gotFileEntryCb, fileNotFoundCb) {
    var that = this;
    
    var fileNotFound = function(evt) {
        console.log('fileNotFound')
        
        if (fileNotFoundCb) {
            fileNotFoundCb();
        }
    };
    
    var gotFileSystem = function(fileSystem) {
        console.log('gotFileSystem')
        
        fileSystem.root.getFile(filePath, {create: createFile}, gotFileEntryCb, fileNotFound);
    };
    
    var fileSystemFail = function() {
        console.log('fileSystemFail')
        
        if (that.error) {
            that.error('File system not found.');
        }
    };
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, fileSystemFail);
};

taz.FileHelper.prototype.writeJSON = function(filePath, data, truncate) {
    var that = this;
    
    console.log('writeJSON')
    
    var writerCreated = function(writer) {
        // Delete any existing content.
        if(truncate) {
            writer.truncate(0);
        }
        
        writer.onwrite = function(evt) {
            console.log('writer.onwrite')
            
            if (that.success) {
                that.success();
            }
        };
        
        writer.onerror = function() {
            console.log('writer.onerror')
            
            if (that.error) {
                that.error('File write failed');
            }
        };
        
        console.log('writing' + JSON.stringify(data));
        
        writer.write(JSON.stringify(data));
    };
    
    var writerCreationFiled = function() {
        console.log('writerCreationFiled')
    };
    
    var gotFileEntry = function(fileEntry) {
        console.log('gotFileEntry')
        
        fileEntry.createWriter(writerCreated, writerCreationFiled);
    };
    
    this.getFile_(filePath, true, gotFileEntry);
};

taz.FileHelper.prototype.remove = function(filePath) {
    var that = this;
    
    console.log('remove')
    
    var fileRemoved = function() {
        console.log('fileRemoved')
        
        if (that.success) {
            that.success();
        }
    };
    
    var fileRemoveFailed = function() {
        console.log('fileRemoveFailed')
        
        if (that.error) {
            that.error('File remove failed');
        }
    };
    
    var gotFileEntry = function(fileEntry) {
        console.log('gotFileEntry')
        
        fileEntry.remove(fileRemoved, fileRemoveFailed);
    };
    
    // Call fileRemoved function even if the file is not found.
    this.getFile_(filePath, false, gotFileEntry, fileRemoved);
};


/**
 * @class Simple class responsible of handling check point graphs.
 *
 * @param {Array.<CheckPointTemplateDTO>} checkPoints Check point list of a game.
 */
taz.Graph = function(checkPoints) {
    this.cpMap_ = {};
    console.log("taz.Graph: Reading graphs");

    // We only need the connections and the identifiers of the check points.
    // Discard all other fields.
    for (var i = 0; i < checkPoints.length; ++i) {
        var cp = checkPoints[i];

        var strippedCp = {
            id : cp.id,
            connections : []
        };

        for (var j = 0; j < cp.startingEdges.length; ++j) {
            strippedCp.connections.push(cp.startingEdges[j].endId);
        }

        for (var j = 0; j < cp.endingEdges.length; ++j) {
        	// If the startId is null, the edge is an entry point to the game and 
        	// thus not part of the graph.
        	if (cp.endingEdges[j].startId != null) {
        		strippedCp.connections.push(cp.endingEdges[j].startId);
        	}
        }

        this.cpMap_[cp.id] = strippedCp;
    }
};

/**
 * Given an id of a check point, returns ids of all check points in the same graph.
 *
 * @param {Number} checkPointId
 * @return {Array.<Number>}
 */
taz.Graph.prototype.calculateGraphOf = function(checkPointId) {
    var cpMap = this.cpMap_;
    var graph = [];
    var visited = {};

    function visit(cpId) {
        if (visited[cpId]) {
            return;
        }
    
        visited[cpId] = true;
        graph.push(cpId);

        var connections = cpMap[cpId].connections;
        for (var i = 0; i < connections.length; ++i) {
            visit(connections[i]);
        }
    }

    visit(checkPointId);
    return graph;
};



taz.Vibration = function() {
	
}

taz.vibration = new taz.Vibration();

taz.Vibration.prototype.vibrate = function(millis) {
	if (window.JSBridge) {
		window.JSBridge.vibrate(millis);
	}
	else {
		console.log("WARN(Vibration): JSBridge not available, couldn't vibrate.");
	}
};

if (!taz.task) {
    /**
     * @namespace
     */
    taz.task = {};
}

/**
 * @private
 * @type {Object.<Number, Array.<taz.NumberPie>>}
 */
taz.task.indicators_ = {};

/**
 * @param {TaskDTO} task
 * @param {TaskAnswerDTO} answerData
 */
taz.task.createDataForTemplate = function(task, answerData) {
    var taskData = {};

    taskData.name = task.name;
    taskData.hasTimeLimit = task.timeLimit > 0;
    taskData.elements = [];
    taskData.noAnswerElements = true;
    // Do not remove this. Needed when used in server.
    taskData.strings = taz.strings;
    	
    // Create the HTML for each task element.
    for (var i = 0; i < task.elements.length; ++i) {
        var element = task.elements[i];
        var answer = undefined;
        
        if (answerData) {
            // Find if this element has already been answered.
            for (var j = 0; j < answerData.elementAnswers.length; ++j) {
                if (answerData.elementAnswers[j].taskElementId == element.id) {
                    answer = answerData.elementAnswers[j];
                }
            }
        }

        // If the element type has an answer extractor it is an answer element.
        if (taz.taskelements.isAnswerElement(element)) {
            taskData.noAnswerElements = false;
        }

        var html = taz.taskelements.createHTML(element, answer);

        taskData.elements[i] = {
            html : html
        };
    }
    
    return taskData;
};

/**
 * @param {TaskDTO} task
 * @param {jQuery object} opt_domElement
 * @return {{pointsIndicator:taz.NumberPie, timeIndicator:taz.NumberPie}} Number and time indicators or empty
 *                                                                        object if the task doesn't have them.
 */
taz.task.initialize = function(task, opt_domElement) {
    opt_domElement || (opt_domElement = $(document));
    
    // Now that the html is in the DOM tree, initialize the elements.
    for (var i = 0; i < task.elements.length; ++i) {
        var element = task.elements[i];
        taz.taskelements.initialize(element, opt_domElement);
    }

    var ret = {};

    if (task.timeLimit > 0) {
        var pointIndicator = new taz.NumberPie({
            elementSelector : opt_domElement.find('#pointIndicator'),
            colour : '#3e8c02',
            lineWidth : 8,
            maximum : task.points
        });

        var timeIndicator = new taz.NumberPie({
            elementSelector : opt_domElement.find('#timeIndicator'),
            colour : '#3e8c02',
            lineWidth : 8,
            maximum : Math.round(task.timeLimit / 1000)
        });

        ret.pointIndicator = pointIndicator;
        ret.timeIndicator = timeIndicator;
    }

    this.indicators_[task.id] = ret;
    return ret;
};

/** 
 * Checks a task and returns the points.
 *
 * @param {TaskDTO} task
 * @param {TaskAnswerDTO} answer
 */
taz.task.checkAnswer = function(task, answer) {
    var correctCount = 0;
	
    // Check the answers that can be checked offline.
    for (var i = 0; i < answer.elementAnswers.length; ++i) {
        var elementAnswer = answer.elementAnswers[i];

        // Find the corresponding task element.
        var taskElement = null;
        for (var j = 0; j < task.elements.length; ++j) {
            if (task.elements[j].id == elementAnswer.taskElementId) {
                taskElement = task.elements[j];
                break;
            }
        }

        var correctness = taz.taskelements.checkAnswer(taskElement, elementAnswer);
        
        if (correctness == null) {
            // Unable to check this answer offline. Give full points.
            correctCount += 1.0;
        } else {
            correctCount += correctness;
        }
    }
    
    var points = answer.maximumPoints;
    if (answer.elementAnswers.length > 0) {
        points = Math.round((correctCount / answer.elementAnswers.length) * answer.maximumPoints);
    }

    return points;
};

/**
 * @param {TaskDTO} task
 * @param {jQuery object} opt_domElement
 */
taz.task.destroy = function(task, opt_domElement) {
    opt_domElement || (opt_domElement = $(document));
    
    // Destroy all task elements.
    for (var i = 0; i < task.elements.length; ++i) {
        var element = task.elements[i];
        taz.taskelements.destroy(element, opt_domElement);
    }

    _.each(this.indicators_[task.id], function(indicator) {
        indicator.remove();
    });

    delete this.indicators_[task.id];
};



/** 
 * @class
 */
taz.NumberPie = function(options) {
    this.opt_ = _.defaults(options, {
        elementSelector : null,
        maximum : 100,
        colour : '#0f2',
        lineWidth : 10
    });

    this.el_ = $(options.elementSelector);
    var width = this.el_.width();
    var height = this.el_.height();

    // Create a container div.
    this.container_ = $('<div>');
    this.el_.append(this.container_);
    this.container_.css('position', 'relative');

    // Create the canvas that is used for drawing the pie.
    this.canvas_ = $('<canvas>');
    this.container_.append(this.canvas_);
    this.canvas_.css('position', 'absolute');

    // Create the element that contains the number.
    this.number_ = $('<h2>');
    this.container_.append(this.number_);
    this.number_.css({
        position : 'absolute',
        display : 'inline',
        padding : '0px',
        margin : '0px',
    });

    this.updateSize_();
};

taz.NumberPie.prototype.updateSize_ = function() {
    var width = this.el_.width();
    var height = this.el_.height();

    this.container_.css({
        width : width,
        height : height
    });

    this.canvas_.css({
        width : width,
        height : height
    });

    this.canvas_.attr({
        width : width,
        height : height
    });

    // Setup canvas style.
    var ctx = this.canvas_[0].getContext('2d');
    ctx.strokeStyle = this.opt_.colour;
    ctx.lineWidth = this.opt_.lineWidth;  
};

taz.NumberPie.prototype.setValue = function(value) {
    this.updateSize_();

    value = Math.min(Math.max(value, 0), this.opt_.maximum)
    var ctx = this.canvas_[0].getContext('2d');
    var width = this.canvas_.width();
    var height = this.canvas_.height();
    var lineWidth = this.opt_.lineWidth;

    var relVal = 1;
    if(this.opt_.maximum != 0) {
        relVal = value / this.opt_.maximum;
    }

    // Draw the pie.
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(width / 2, 
        height / 2, 
        Math.min(width / 2, height / 2) - lineWidth / 2,
        -Math.PI / 2 + (1 - relVal) * Math.PI * 2,
        3 * Math.PI / 2,
        false);
    ctx.stroke();

    // Update number and move it to the center.
    this.number_.text(value);
    this.number_.css({
        top : (height - this.number_.height()) / 2,
        left : (width - this.number_.width()) / 2
    });
};

taz.NumberPie.prototype.remove = function() {
    if (this.container_) {
        this.container_.remove();
    }
};



/**
 * @class Handles the connection to the game server.
 *
 * @constructor
 * @implements {taz.Backend}
 */
taz.ServerBackend = function() {
    this.uuid_ = this.createUUID_();
    this.masterServerRequestSender_ = new taz.AjaxRequestSender(taz.settings.masterServerUrl);
};

/** 
 * Inherit from taz.Backend.
 */
taz.inherits(taz.ServerBackend, taz.Backend);

/**
 * @private
 */
taz.ServerBackend.prototype.uuid_ = null;

/**
 * @private
 */
taz.ServerBackend.prototype.gameServerRequestSender_ = null;

/** @inheritDoc */
taz.ServerBackend.prototype.createUUID_ = function() {
    if (window.device && window.device.uuid) {
        return window.device.uuid;
    }
    
    return 'unknown';
};

/** @inheritDoc */
taz.ServerBackend.prototype.getServers = function(position, callback) {
    var data = {
        latitude : position.latitude,
        longitude : position.longitude
    };
    
    var request = new taz.AjaxRequest();
    
    request.type = taz.AjaxRequest.Type.POST;
    request.path = 'resource/server/list';
    request.data = data;
    request.successCallback = callback;
    request.timeout = 60000;
    
    this.masterServerRequestSender_.send(request);
};

/** @inheritDoc */
taz.ServerBackend.prototype.setActiveGameServer = function(serverUrl) {
    this.gameServerRequestSender_ = new taz.AjaxRequestSender(serverUrl);
};

/** @inheritDoc */
taz.ServerBackend.prototype.getActiveGameServerUrl = function() {
    if (this.gameServerRequestSender_) {
        return this.gameServerRequestSender_.getServerUrl();
    }
    else {
        return null;
    }
};

/** @inheritDoc */
taz.ServerBackend.prototype.clearActiveGameServer = function() {
    this.gameServerRequestSender_ = null;
};

/** @inheritDoc */
taz.ServerBackend.prototype.getNearbyGames = function(position, callback) {
    if (this.gameServerRequestSender_ != null) {
        var data = {
            id : null,
            latitude : position.latitude,
            longitude : position.longitude
        };
        
        var request = new taz.AjaxRequest();
        
        request.type = taz.AjaxRequest.Type.POST;
        request.path = 'resource/game/runninglist';
        request.data = data;
        request.successCallback = callback;
        request.timeout = 60000;
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.getNearbyGames: Active game server URL is not set!");
    }
};

/** @inheritDoc */
taz.ServerBackend.prototype.getDataChunk = function(dataChunkId, callback) {
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        request.type = taz.AjaxRequest.Type.GET;
        request.path = 'resource/datachunk/' + dataChunkId;
        request.successCallback = callback;
        request.timeout = 60000;
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.getDataChunk: Active game server URL is not set!");
    }
};

/** @inheritDoc */
taz.ServerBackend.prototype.isGameRunning = function(gameId, callback) {   
    if (this.gameServerRequestSender_ != null) {
        var success = function(response) {
            callback(response.status == 'RUNNING');
        };
        
        var error = function(response) {
            callback(false);
        };
        
        var request = new taz.AjaxRequest();
        
        request.type = taz.AjaxRequest.Type.GET;
        request.path = 'resource/game/' + gameId + '/status';
        request.successCallback = success;
        // Handle the 404 error case (the game is no longer found).
        request.errorCallback = {404 : error};
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.isGameRunning: Active game server URL is not set!");
    }
};

/** @inheritDoc */
taz.ServerBackend.prototype.joinGame = function(gameId, teamName, position, callbacks) {
    if (this.gameServerRequestSender_ != null) {
        var data = {
            name : teamName,
            uuid : this.uuid_,
            status : {
                latitude : position.latitude,
                longitude : position.longitude,
                timestamp : new Date().getTime(),
                gameTime : 0,
                points : 0,
                status : 'NOT_JOINED'
            }
        };
        
        // Map the server error codes to corresponding callbacks.
        var success = function(response) {
            if (!response) {
                callbacks.noResponse();
            }
            else if (response.status == 'OK') {
                callbacks.success(response.teamId, response.messageThreadId);
            } else if (response.status == 'ALREADY_JOINED') {
                callbacks.alreadyJoined(response.teamId, response.messageThreadId);
            } else {
                callbacks.nameInUse();
            }
        };
        
        var request = new taz.AjaxRequest();
        
        request.type = taz.AjaxRequest.Type.POST;
        request.path = 'resource/game/' + gameId + '/join';
        request.data = data;
        request.successCallback = success;
        request.timeout = 60000;
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.joinGame: Active game server URL is not set!");
    }
};

/** @inheritDoc */
taz.ServerBackend.prototype.getGame = function(gameId, callback) {
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        request.type = taz.AjaxRequest.Type.GET;
        request.path = 'resource/game/' + gameId;
        request.successCallback = callback;
        // Large timeout because of large data.
        request.timeout = 60000;
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.getGame: Active game server URL is not set!");
    }
};

/** @inheritDoc */
taz.ServerBackend.prototype.isPermissionToStart = function(gameId, teamId, callback) {
    if (this.gameServerRequestSender_ != null) {
        var success = function(response) {
            callback(response.launched);
        };
        
        var error = function() {
            // Empty errorCallBack, removes the request from queue.
        };
        
        var request = new taz.AjaxRequest();
        
        request.type = taz.AjaxRequest.Type.GET;
        request.path = 'resource/game/' + gameId + '/team/' + teamId + '/launched';
        request.successCallback = success;
        request.errorCallback = error;
        request.timeout = 60000;
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.isPermissionToStart: Active game server URL is not set!");
    }
};

/** @inheritDoc */
taz.ServerBackend.prototype.updateTeamStatus = function(gameId, teamId, position, 
                                                        state, points, nextcheckpointId, 
                                                        traveledDist, callback) {
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        var data = {
            latitude : position.latitude,
            longitude : position.longitude,
            timestamp : new Date().getTime(),
            gameTime : taz.gameTimer.getTime(),
            status : state,
            points : points,
        nextCheckPointId: nextcheckpointId,
        traveledDistance: traveledDist
        };
        
        request.type = taz.AjaxRequest.Type.POST;
        request.path = 'resource/game/' + gameId + '/team/' + teamId + '/statusupdate';
        request.data = data;
        request.messageType = taz.AjaxRequest.MessageType.STATUS_UPDATE;
        request.successCallback = callback;
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.updateTeamStatus: Active game server URL is not set!");
    }
};

/** @inheritDoc */
taz.ServerBackend.prototype.updateTeamStatusAfterCp = function(gameId, teamId, position, 
                                                        state, points, nextcheckpointId, 
                                                        traveledDist, callback) {
};

/** @inheritDoc */
taz.ServerBackend.prototype.getNextCheckPoint = function(gameId, teamId, validCheckPoints, hasConnections, callback) {
    if (this.gameServerRequestSender_ != null) {
        var success = function(response) {
            callback(response.nextCheckPointId);
        };
        
        var checkpoints = validCheckPoints;
        var error = function() {
            if (checkpoints && checkpoints.length == 0) {
                callback(null);
            } else {
                // indicate, that we didn't get the next checkpoint and caller should calculate it by itself
                callback(-1);
            }
            
        };
        
        var position = taz.game.getLastKnownPosition();
        
        var data = {
            validCheckPoints : validCheckPoints,
		latitude: position.latitude,
		longitude: position.longitude,
		hasConnections: hasConnections
        };
        
        var request = new taz.AjaxRequest();
        
        request.type = taz.AjaxRequest.Type.POST;
        request.path = 'resource/game/' + gameId + '/team/' + teamId + '/nextcheckpoint';
        request.data = data;
        request.successCallback = success;
        request.errorCallback = error;
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.getNextCheckPoint: Active game server URL is not set!");
    }
};

/** @inheritDoc */
taz.ServerBackend.prototype.arrivedToCheckPoint = function(gameId, teamId, checkPointTemplateId, callback) {        
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        request.type = taz.AjaxRequest.Type.POST;
        request.path = 'resource/game/' + gameId + '/team/' + teamId + '/arrivedtocheckpoint';
        request.data = {
            checkPointTemplateId : checkPointTemplateId
        };
        request.successCallback = callback;
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.arrivedToCheckPoint: Active game server URL is not set!");
    }
};

 /** @inheritDoc */
taz.ServerBackend.prototype.leftCheckPoint = function(gameId, teamId, callback) {
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        request.type = taz.AjaxRequest.Type.POST;
        request.path = 'resource/game/' + gameId + '/team/' + teamId + '/leftcheckpoint';
        request.successCallback = callback;
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.leftCheckPoint: Active game server URL is not set!");
    }
};

/** @inheritDoc */
taz.ServerBackend.prototype.getCheckPointStatus = function(gameId, checkPointId, callback) {
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        var error = function() {
            // Empty errorCallBack, removes the request from queue.
        };
        
        request.type = taz.AjaxRequest.Type.GET;
        request.path = 'resource/game/' + gameId + '/checkpoint/' + checkPointId + '/status';
        request.data = null;
        request.successCallback = callback;
        request.errorCallback = error;
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.getCheckPointStatus: Active game server URL is not set!");
    }    
};

/** @inheritDoc */
taz.ServerBackend.prototype.answerTask = function(gameId, teamId, answer, callback) {    
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        var success = function(data) {
            if (callback) {
                callback(data.answerId);
            }
        }
        
        request.type = taz.AjaxRequest.Type.POST;
        request.path = 'resource/game/' + gameId + '/team/' + teamId + '/answer';
        request.data = JSON.parse(JSON.stringify(answer));
        request.successCallback = success;
        // Longer timeout because of large data.
        request.timeout = 60000;
        request.messageType = taz.AjaxRequest.MessageType.ANSWER;

        this.gameServerRequestSender_.send(request);
        
        // Ugly hack to "fix" the local storage filling bug.
        taz.game.getModel().clearAnswerPhotoFromLocalStorage_(answer);
    }
    else {
        console.log("taz.ServerBackend.answerTask: Active game server URL is not set!");
    }    
};

/** @inheritDoc */
taz.ServerBackend.prototype.finishGame = function(gameId, teamId, position, state, points, callback) {    
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        var data = {
            latitude : position.latitude,
            longitude : position.longitude,
            timestamp : new Date().getTime(),
            gameTime : taz.gameTimer.getTime(),
            points : points,
            status : state
        };
        
        request.type = taz.AjaxRequest.Type.POST;
        request.path = 'resource/game/' + gameId + '/team/' + teamId + '/finish';
        request.data = data;
        request.successCallback = callback;
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.finishGame: Active game server URL is not set!");
    }    
};

/** @inheritDoc */
taz.ServerBackend.prototype.getRankingList = function(gameId, callback, gameNotFoundCb) {    
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        var error = function() {
            // Empty errorCallBack, removes the request from queue.
        };
        
        request.type = taz.AjaxRequest.Type.GET;
        request.path = 'resource/game/' + gameId + '/rankinglist';
        request.successCallback = callback;
        
        // Handle the 404 error case (the game is no longer found).
        request.errorCallback = {
            404 : gameNotFoundCb,
            503 : error
        };
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.getRankingList: Active game server URL is not set!");
    }    
};

taz.ServerBackend.prototype.getTeamLocations = function(gameId, callback, error) {
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        // Do not re-queue this request on error.
        request.type = taz.AjaxRequest.Type.GET;
        request.path = 'resource/game/' + gameId + '/team/position/all';
        request.successCallback = callback;
        request.errorCallback = function() {
            error && error();
        };
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.getRankingList: Active game server URL is not set!");
    }
};

taz.ServerBackend.prototype.batchSendAnswers = function(gameId, teamId, answers, callback) {
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        var error = function() {
            // Empty errorCallBack, removes the request from queue.
        };
        
        request.type = taz.AjaxRequest.Type.POST;
        request.path = 'resource/game/' + gameId + '/team/' + teamId + '/answers';
        request.data = answers;
        request.successCallback = callback;
        request.errorCallback = error;
        request.timeout = 60000;
        request.messageType = taz.AjaxRequest.MessageType.ANSWER;
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.getRankingList: Active game server URL is not set!");
    }
};

/** @inheritDoc */
taz.ServerBackend.prototype.getMessages = function(messageThreadId, callback) {
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        request.type = taz.AjaxRequest.Type.GET;
        request.path = 'resource/message/thread/' + messageThreadId + '/messages';
        request.successCallback = callback;
        request.errorCallback = {400 : function() {}};
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.getMessages: Active game server URL is not set!");
    }    
};

taz.ServerBackend.prototype.sendMessage = function(gameId, teamId, messageThreadId, message, callback) {
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        request.type = taz.AjaxRequest.Type.POST;
        request.path = 'resource/message/send';
        request.successCallback = callback;
        request.data = {
    	messageThreadId: messageThreadId,
    	sender: 'TEAM',
    	gameId: gameId,
    	teamId: teamId,
    	content: message
        };
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.sendMessage: Active game server URL is not set!");
    }    
};

taz.ServerBackend.prototype.setMessageThreadRead = function(messageThreadId, messageId, callback) {
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        request.type = taz.AjaxRequest.Type.POST;
        request.path = 'resource/message/thread/' + messageThreadId + '/read/team';
        request.successCallback = callback;
        request.data = messageId;
        
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.setMessageThreadRead: Active game server URL is not set!");
    }    
};

taz.ServerBackend.prototype.getCustomMap = function(mapId, callback) {
    if (this.gameServerRequestSender_ != null) {
        var request = new taz.AjaxRequest();
        
        request.type = taz.AjaxRequest.Type.GET;
        request.path = 'resource/map/' + mapId;
        request.successCallback = callback;
              
        this.gameServerRequestSender_.send(request);
    }
    else {
        console.log("taz.ServerBackend.setMessageThreadRead: Active game server URL is not set!");
    }    
};

taz.ServerBackend.prototype.getCustomMapTileUrl = function(mapId, z, x, y) {
    var serverUrl = this.getActiveGameServerUrl();
    var contextPath = serverUrl.replace(/\/$/, '');
    return contextPath + '/resource/map/tile/' + mapId + "/" + z + "/" + x + "/" + y;
};

/**
 * Returns information about the current network status.
 */
taz.ServerBackend.prototype.getNetworkInfo = function() {
    if (this.gameServerRequestSender_ != null) {
        return this.gameServerRequestSender_.getInfo();
    }
    else {
        console.log("taz.ServerBackend.getNetworkInfo: Active game server URL is not set!");
    }
    
    return null;
};

/**
 * Loads any peristent data that may have been saved by this backend.
 */
taz.ServerBackend.prototype.loadPersistentData = function() {
    if (this.gameServerRequestSender_ != null) {
        this.gameServerRequestSender_.loadPersistentData();
    }
    else {
        console.log("taz.ServerBackend.loadPersistentData: Active game server URL is not set!");
    }
};

/**
 * Clears any peristent data that may have been saved by this backend.
 */
taz.ServerBackend.prototype.clearPersistentData = function() {
    if (this.gameServerRequestSender_ != null) {
        this.gameServerRequestSender_.clearPersistentData();
    }
    else {
        console.log("taz.ServerBackend.clearPersistentData: Active game server URL is not set!");
    }
};

taz.ServerBackend.prototype.login = function() {
	if (this.gameServerRequestSender_ != null) {
        this.gameServerRequestSender_.login_();
    }
    else {
        console.log("taz.ServerBackend.clearPersistentData: Active game server URL is not set!");
    }
};



/**
 * @namespace
 */
taz.main = {};

/**
 * @type {taz.Game}
 */
taz.game = null;

/** 
 * @private
 */
taz.main.navigationReady_ = false;

/** 
 * @private
 */
taz.main.splashScreenShown_ = false;

/** 
 * @private
 */
taz.main.deviceReady_ = false;

/**
 * @private
 */
taz.main.backDialogShown_ = false;

taz.main.rejoinViewDisplayed = false;

/**
 * Entry point to the program. Called from index.html.
 */
taz.main.main = function() {
    taz.viewManager.changeView('splashScreenView');
    
    taz.splashScreenView.setSplashFinishedListener(function() {        
        if (!taz.main.navigationReady_) {
            taz.loadingDialog.setLoadingMessage(taz.strings.waiting_gps);
            taz.loadingDialog.show();
        }

        taz.main.splashScreenShown_ = true;
        taz.main.startGameIfReady_();
    });
    

    
    // Call onDeviceReady when PhoneGap is loaded.
    //
    // At this point, the document has loaded but phonegap.js has not.
    // When PhoneGap is loaded and talking with the native device,
    // it will call the event 'deviceready'.        
    if (typeof navigator.device == "undefined"){
        document.addEventListener("deviceready", taz.main.onDeviceReady_, false);
    } else {
        taz.main.onDeviceReady_();
    }
};

/**
 * Called when PhoneGap is ready.
 * 
 * @private
 */
taz.main.onDeviceReady_ = function() {
    console.log("onDeviceReady called.");

    taz.loadingDialog.initialize();
    taz.navigation.init(taz.main.onNavigationReady, taz.main.onNavigationError);
    
    //disable back button
    if (navigator.app && navigator.app.overrideBackbutton) {
        navigator.app.overrideBackbutton(true);
    }
    document.addEventListener("backbutton", taz.main.showBackDialog, true);

    taz.main.deviceReady_ = true;
    taz.main.startGameIfReady_();
};

/**
 * Called when navigation fails. Setup from App.java
 */
taz.main.onNavigationError = function(error) {
    if (error != null) {
        alert(error);
    }
    else {
        alert('Navigation failed');
    }
};

/**
 * Called when navigation is ready. Setup from App.java
 */
taz.main.onNavigationReady = function() {
    taz.sounds.play(taz.Sounds.Type.GPS_READY);

    taz.main.navigationReady_ = true;
    taz.main.startGameIfReady_();
};

taz.main.startGameIfReady_ = function() {
    if (taz.main.deviceReady_
            && taz.main.navigationReady_
            && taz.main.splashScreenShown_
            && taz.game == null) {

        taz.loadingDialog.hide();
        taz.game = new taz.Game();
        taz.game.start();
    }
};

taz.main.showBackDialog = function() {
	var that = this;
	// For Android phones, quit instantly on back button when in finished state. Also make sure that the queue is empty, otherwise show dialog
    if (!(taz.isUsingRipple() || taz.isDeviceiPhone()) && taz.game && taz.game.getModel() && taz.game.getModel().getState() == 'FINISHED' && taz.game.getBackend() && taz.game.getBackend().getNetworkInfo() && taz.game.getBackend().getNetworkInfo().answerQueue.length == 0) {
		navigator.app.exitApp();
    }
    // If not yet in a game, show only continue/exit dialog
    else if (taz.main.rejoinViewDisplayed || (taz.game && taz.game.getModel() && (taz.game.getModel().getState() == 'INITIALIZING' || taz.game.getModel().getState() == 'FINISHED')) || !taz.game || !taz.game.getModel() || !taz.game.getModel().getState()) {
	    if(!taz.main.backDialogShown_) {
	        taz.main.backDialogShown_ = true;
	
	        taz.dialogs.twoButtonDialog(taz.strings.exit_confirm, taz.strings.continue_button, taz.strings.exit_button, function() {
	            taz.main.backDialogShown_ = false;
	        }, function() {
	            taz.main.backDialogShown_ = false;
	            if (taz.isUsingRipple() || taz.isDeviceiPhone()) {
	                taz.game.startNewGame();
	            }
	            else {
	                navigator.app.exitApp();
	            }
	        });
	    }
    }
    else {
	    if(!taz.main.backDialogShown_) {
	        taz.main.backDialogShown_ = true;
	
	        taz.dialogs.pauseDialog(taz.strings.exit_confirm, taz.strings.continue_button, taz.strings.finish_this_game, taz.strings.exit_button, function() {
	            taz.main.backDialogShown_ = false;
	        }, function() {
	            taz.main.backDialogShown_ = false;
	            taz.dialogs.twoButtonDialog(taz.strings.finish_this_game_confirmation, taz.strings.finish_this_game_confirmation_cont, taz.strings.finish_this_game_confirmation_quit, function() {
		        }, function() {
		            taz.game.setState(taz.Game.State.FINISHED);
		        });
	        }, function() {
	            taz.main.backDialogShown_ = false;
	            if (taz.isUsingRipple() || taz.isDeviceiPhone()) {
	                taz.game.startNewGame();
	            }
	            else {
	                navigator.app.exitApp();
	            }
	        });
	    }
    }
};



/**
 * @class Audio player that uses phonegap Media player by default and falls back to
 *        html5 audio element if the media class is not found.
 */
taz.AudioPlayer = function() {

};

/**
 * @private
 * @type {{play:function, pause:function, stop:function}}
 */
taz.AudioPlayer.prototype.audio_ = null;

taz.AudioPlayer.prototype.pause = function() {
    if (this.audio_ != null) {
        this.audio_.pause();
    }
};

taz.AudioPlayer.prototype.stop = function() {
    if (this.audio_ != null) {
        this.audio_.stop();
        this.audio_ = null;
    }
};

/**
 * Plays an URL or data URI.
 */
taz.AudioPlayer.prototype.play = function(src, onEnded) {
    if (this.audio_ == null) {
        this.createURLPlayer_(src, onEnded);
    }
    else {
        this.audio_.play();
    }
};

/**
 * Plays a file located in the the www folder of the phonegap project.
 *
 * @param {String} filePath Path relative to the www folder of your project.
 */
taz.AudioPlayer.prototype.playAssetFile = function(filePath, onEnded) {
    if (this.audio_ == null) {
        this.createAsserFilePlayer_(filePath, onEnded);
    }

    this.audio_.play();
};

/**
 * @private
 */
taz.AudioPlayer.prototype.createURLPlayer_ = function(src, onEnded) {
    function isDataURI(url) {
        return url.length > 5
                && url.indexOf('data:') == 0
                && url.indexOf(';base64,') != -1;
    }

    var that = this;
    
    if (!isDataURI(src) && !taz.isUsingRipple()) {
        window.JSBridge.getPhoneGapMediaPath(src, function(convertedSrc) {
            
            // If phonegap is detected, play non data URIs using it.
            that.createPhonegapPlayer_(convertedSrc, onEnded);
            that.audio_.play();
        });
    } else {
        this.createHtml5Player_(src, onEnded);
        this.audio_.play();
    }
};

/**
 * @private
 */
taz.AudioPlayer.prototype.createAsserFilePlayer_ = function(filePath, onEnded) {
    var rootPath = '';
    if (!taz.isDeviceiPhone()) {
        // android resource
        rootPath = '/android_asset/www/';
    }

    if (!taz.isUsingRipple()) {
        this.createPhonegapPlayer_(rootPath + filePath, onEnded);
    } else {
        this.createHtml5Player_(filePath, onEnded);
    }
};

/**
 * @private
 */
taz.AudioPlayer.prototype.createPhonegapPlayer_ = function(src, onEnded) {    
    if (onEnded) {
        // Make sure the onEnded is only called once.
        onEnded = _.once(onEnded);
    }

    var that = this;
    var audio = new Media(src, onEnd, onEnd);

    function play() {
        audio.play();
    }

    function pause() {
        audio.pause();
    }
    
    function onEnd() {
        audio.release();
        that.audio_ = null;

        if (onEnded) {
            onEnded();
        } 
    }

    function stop() {
        audio.stop();
        onEnd();
    }

    this.audio_ = {
        play : play,
        pause : pause,
        stop : stop
    };
};

/**
 * @private
 */
taz.AudioPlayer.prototype.createHtml5Player_ = function(src, onEnded) {
    if (onEnded) {
        // Make sure the onEnded is only called once.
        onEnded = _.once(onEnded);
    }

    var that = this;
    var audio = $('<audio>');

    audio.bind('ended error abort', stop);
    audio.attr('src', src);
    $('body').append(audio);

    function play() {
        audio[0].play();
    }

    function pause() {
        audio[0].pause();
    }

    function stop() {
        // Remove the audio element from the DOM.
        audio.remove();
        that.audio_ = null;

        if (onEnded) {
            onEnded();
        }
    }

    this.audio_ = {
        play : play,
        pause : pause,
        stop : stop
    };
};



/**
 * @class This class is responsible of changing views by calling their onCreate and onDestroy
 * methods. This class also provides a mechanism for passing arbitrary data between views.
 */
taz.ViewManager = function() {	
	this.historyData_ = {};
	
	var that = this;
	$(document).ready(function() {
		$(document).bind('pagechange', function(event, data) {
			that.onViewChange_(event, data);
		});
	});
};

/**
 * Singleton instance.
 */
taz.viewManager = new taz.ViewManager();

/**
 * @private
 */
taz.ViewManager.prototype.currentView_ = 'showServersView';

/**
 * @private
 */
taz.ViewManager.prototype.pageChangeData_ = null;

/**
 * @private
 */
taz.ViewManager.prototype.historyData_ = null;

/**
 * Returns the identifier of the current view.
 */
taz.ViewManager.prototype.getCurrentViewId = function() {
	return this.currentView_;
};

/**
 * Changes a view: Calls the onDestroy method of the current view and the
 * onCreate method of the new view.
 * 
 * @param {String} view Name of the view. There must exist a view by this name in the
 *                      taz namespace. If changeView('someView') is called there must
 *                      be a view object taz.someView that has onCreate and onDestoy
 *                      methods. A jQuery mobile page by the same ID must also
 *                      exist in the index.html file.
 *                      
 * @param {*} data Data to be passed to the new view's onCreate method.
 */
taz.ViewManager.prototype.changeView = function(view, data) {
	this.pageChangeData_ = (data == undefined) ? null : data;
	
	var defaultOptions = {
		transition : 'none'
	};
	
	// Use jQuery method to change the page. This fires the 'pagebeforechange' event which
	// we are listening and causes the onViewChange_ to be called.
	$.mobile.changePage('#' + view, defaultOptions);
};

/**
 * Re-renders the current view. Can be useful if globally available Handlebars context changes 
 * (e.g. localization strings).
 */
taz.ViewManager.prototype.refreshCurrentView = function() {
	var currentView = taz[this.currentView_];

    if (currentView) {
        var viewData = currentView.viewData;
        currentView.onDestroy();
		currentView.onCreate(currentView.viewData);
    }
}

/**
 * Sets history data for a view. The given data is then used if returning to the view and passing 
 * null or undefined to changeView as the data parameter.
 */
taz.ViewManager.prototype.setHistoryData = function(view, viewData) {	
	var history = {};
	history.viewData = viewData;
	this.historyData_[view] = history;
};

/**
 * This is called when a jQuery mobile page is changed.
 * 
 * @private
 */
taz.ViewManager.prototype.onViewChange_ = function(event, data) {		
	var viewId = '';
	
	if (typeof(data.toPage) === 'string') {
		var urlData = $.mobile.path.parseUrl(data.toPage);
		// Remove the hash character.
		viewId = urlData.hash.slice(1);
	} else {
		viewId = $(data.toPage).attr('id');
	}
	
	console.log('INFO(ViewChange): Moved from ' + this.currentView_ + " to " + viewId);
		
	// Call the onDestroy method of the current view.
	if (this.currentView_ != null) {
		taz[this.currentView_].onDestroy();
	}
	
	if (this.pageChangeData_ == null && viewId in this.historyData_) {
		this.pageChangeData_ = this.historyData_[viewId].viewData;
		delete this.historyData_[viewId];
	}
	
	// Remove old shit from the dom
	if (taz[this.currentView_].shouldCleanDom()) {
	    $('#' + this.currentView_).children().remove();
	}
	
	// Call the onCreate method of the new view.
	taz[viewId].onCreate(this.pageChangeData_);
	
	this.pageChangeData_ = null;
	this.currentView_ = viewId;
};


taz.Sounds = function() {
    this.playQueue_ = [];
};

taz.sounds = new taz.Sounds();

taz.Sounds.Type = {
    GPS_READY : 'sounds/gps_ready.wav',
    GAME_STARTED : 'sounds/game_start_target_reached.wav',
    ARRIVED_TO_CHECK_POINT : 'sounds/game_start_target_reached.wav',
    GOAL_REACHED : 'sounds/goal_reached.mp3',
    CORRECT_ANSWER : 'sounds/correct_answer.wav',
    WRONG_ANSWER : 'sounds/wrong_answer.mp3', 
    MESSAGE_ARRIVED : 'sounds/gps_ready.wav'
};

/**
 * The sound that is currently looped, or null.
 */
taz.Sounds.prototype.loopSound = null;

/**
 * @private
 */
taz.Sounds.prototype.loopHandle_ = null;

/**
 * @private
 */
taz.Sounds.prototype.playing_ = false;

/**
 * @private
 */
taz.Sounds.prototype.playQueue_ = null;

taz.Sounds.prototype.play = function(type) {    
    this.playQueue_.push(type);

    if (!this.playing_) {
        this.playNext_();
    }
};

/**
 * @private
 */
taz.Sounds.prototype.playNext_ = function() {
    if (this.playQueue_.length > 0) {
        this.playing_ = true;
        var filePath = this.playQueue_.shift();
        var player = new taz.AudioPlayer();
        player.playAssetFile(filePath, _.bind(this.playNext_, this));
    } else {
        this.playing_ = false;
    }
};

taz.Sounds.prototype.loop = function(type, interval) {
    this.stopLoop();

    var that = this;
    this.loopSound = type;
    
    this.loopHandle_ = setInterval(function() {
        that.play(type);
    }, interval);
    
    that.play(type);
};

taz.Sounds.prototype.stopLoop = function() {
    if (this.loopHandle_ != null) {
        clearInterval(this.loopHandle_);
        this.loopHandle_ = null;
        this.loopSound = null;
    }
};



taz.CustomMapTileOverlay = function(serverUrl, offlineBasePath, offlineLevels, googleMap, customMap) {
    var map = googleMap;
    var nativeZoom = customMap.nativeZoomLevel;
    
    this.imageMapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {  
          if (offlineBasePath && offlineLevels && offlineLevels.length) {
              if (offlineLevels.indexOf(zoom) !== -1) {
                  offlineBasePath = offlineBasePath.replace(/\/$/, '');
                  var path = offlineBasePath + "/" + coord.x + "/" + coord.y + ".png";
                  console.log("OFFLINE FETCH TILE FROM: " + path);
                  return path;
              }
          }
          else {
              var minX = Math.floor(customMap.minTileX * Math.pow(2, zoom - nativeZoom));
              var minY = Math.floor(customMap.minTileY * Math.pow(2, zoom - nativeZoom));
              var maxX = Math.floor(customMap.maxTileX * Math.pow(2, zoom - nativeZoom));
              var maxY = Math.floor(customMap.maxTileY * Math.pow(2, zoom - nativeZoom));
              
              if (zoom < customMap.minZoomLevel || zoom > customMap.maxZoomLevel  
                  || coord.x > maxX || coord.y > maxY || coord.x < minX || coord.y < minY) {
                  return null;
              }
                
              // Strip a possible final slash.
              var contextPath = serverUrl.replace(/\/$/, '');
              
              console.log("Fetching tile: " + contextPath + '/resource/map/tile/' + customMap.id + "/" + zoom + "/" + coord.x + "/" + coord.y);
              return contextPath + '/resource/map/tile/' + customMap.id + "/" + zoom + "/" + coord.x + "/" + coord.y;              
          }
        },
        tileSize: new google.maps.Size(256, 256)
      });
      
      map.overlayMapTypes.push(this.imageMapType);
      this.map = map;
      this.customMap = map;
};

taz.CustomMapTileOverlay.prototype.map = null;
taz.CustomMapTileOverlay.prototype.customMap = null;
taz.CustomMapTileOverlay.prototype.imageMapType = null;

taz.CustomMapTileOverlay.prototype.remove = function() {
    this.map.overlayMapTypes.removeAt(this.map.overlayMapTypes.indexOf(this.imageMapType));
};

taz.CustomMapTileOverlay.prototype.setOpacity = function(opacity) {
    this.imageMapType.setOpacity(opacity);
};

taz.CustomMapTileOverlay.prototype.getCustomMap = function() {
    return this.customMap;
};

/**
 * @class Class that takes care of polling the location and bearing of the player using
 *       GPS and compass. Listeners can be registered to be notified about the location
 *       and bearing updates.
 */
taz.Navigation = function() {
	
};

/**
 * Singleton instance.
 */
taz.navigation = new taz.Navigation();

/**
 * @const
 */
taz.Navigation.POSITION_UPDATE_INTERVAL = 1500;

/**
 * @private
 */
taz.Navigation.prototype.positionUpdateCount_ = 0;

/**
 * @private
 */
taz.Navigation.prototype.compassUpdateCount_ = 0;

/**
 * @private
 */
taz.Navigation.prototype.initReadyCB_ = null;

/**
 * @private
 */
taz.Navigation.prototype.initErrorCB_ = null;

/**
 * @private
 */
taz.Navigation.prototype.positionUpdateHandle_ = null;

/**
 * @private
 */
taz.Navigation.prototype.positionListenerHandle_ = null;

/**
 * @private
 */
taz.Navigation.prototype.positionUpdatesEnabled_ = false;

/**
 * @private
 */
taz.Navigation.prototype.compassListenerHandle_ = null;

/**
 * @private
 */
taz.Navigation.prototype.positionListeners_ = [];

/**
 * @private
 */
taz.Navigation.prototype.headingListeners_ = [];

/**
 * Newest heading.
 * 
 * @type taz.Heading
 */
taz.Navigation.prototype.currentHeading = new taz.Heading(0);

/**
 * @private
 */
taz.Navigation.prototype.previousHeadings = [];

/**
 * Newest position. Initial value is a dummy position in Hervanta.
 * 
 * @type taz.GeoPosition
 */
taz.Navigation.prototype.currentPosition = new taz.GeoPosition(61.44760648446768, 23.85829953313521);

/**
 * The accuracy of the most recent location fix. Null means no fix yet.
 */
taz.Navigation.prototype.currentPositionAccuracy = null;

/**
 * The default orientation of the screen
 */
taz.Navigation.prototype.displayRotation_ = 0;

/**
 * Asynchronously initializes the navigation. Connects to the GPS and compass sensors.
 *
 * @param {Function} readyCallback Called when the initialization is ready i.e. when we have a GPS fix
 *                   and we are ready to provide position and heading updates.
 *
 * @param {Function} errorCallback Called if the initialization failed: Needed sensors were not
 *                   found or could not be connected to. This function must take one parameter
 *                   that is a String describing the error.
 */
taz.Navigation.prototype.init = function(readyCallback, errorCallback) {
    if (this.isInitialized_) {
        return;
    }
    
    this.initReadyCB_ = readyCallback;
    this.initErrorCB_ = errorCallback;
        
    // Start polling for position updates. This simply updates the this.currentPosition
    // and this.currentPositionAccuracy variables and doesn't invoke the position listeners.
    this.pollPosition_();
    
    var that = this;

    window.JSBridge && window.JSBridge.getDisplayRotation(function(rotation) {
    	that.displayRotation_ = rotation * 90;
	});
    
    // Start the loop that invokes the position listeners.
    this.startUpdates();
        
    var compassOptions = {
        frequency : 100
    };
    
    if (taz.isDeviceiPhone()) {
        // Use filter in iOS, frequency timeouts in iPad Mini.
        compassOptions.filter = 1;
    }
    
    // Register compass listener.
    this.compassListenerHandle_ = navigator.compass.watchHeading(
            _.bind(this.onCompassUpdate_, this),
            _.bind(this.onCompassError_, this),
            compassOptions);
        
    this.isInitialized_ = true;

    if (taz.settings.dontWaitForGPSFix) {
        _.defer(_.bind(function() {
            // Fake position update.
            this.onPositionUpdate_({
                coords : {
                    accuracy : taz.settings.requiredLocationAccuracy,
                    latitude : this.currentPosition.latitude,
                    longitude : this.currentPosition.longitude
                }
            });
        }, this));
    }
};

taz.Navigation.prototype.enableLocationUpdates = function(enabled) {
    if (enabled) {
        this.startUpdates();
    }
    else {
        this.stopUpdates();
    }
};

taz.Navigation.prototype.startUpdates = function() {
    if (this.positionUpdatesEnabled_) {
        return;
    }
    this.positionUpdatesEnabled_ = true;
    
    var positionUpdatesStarted = _.bind(function() {
        var that = this;
        
        this.pollPosition_();
        this.positionUpdateHandle_ = setInterval(function() {
            var position = that.currentPosition;
            
            // Invoke all registered listeners.
            for (var i = 0; i < that.positionListeners_.length; ++i) {
                var posCopy = new taz.GeoPosition(position.latitude, position.longitude);
                that.positionListeners_[i](posCopy, that.currentPositionAccuracy);
            }
            
        }, taz.Navigation.POSITION_UPDATE_INTERVAL);        
    }, this);
    
    window.JSBridge && window.JSBridge.startPositionUpdates(positionUpdatesStarted);
    
    if (taz.isUsingRipple()) {
        positionUpdatesStarted();
    }
};

taz.Navigation.prototype.stopUpdates = function() {
    clearInterval(this.positionUpdateHandle_);
    clearTimeout(this.pollPositionHandle_);
    
    this.positionUpdateHandle_ = null;
    this.pollPositionHandle_ = null;
    window.JSBridge && window.JSBridge.stopPositionUpdates();
    
    this.positionUpdatesEnabled_ = false;
};

/**
 * Adds a position (GPS) listener.
 *
 * @param {Function} The listener that takes one parameter of type {@link taz.GeoPosition}.
 */
taz.Navigation.prototype.addPositionListener = function(listener) {
    this.positionListeners_.push(listener);
};
 
/**
 * Adds a heading (compass) listener.
 *
 * @param {Function} The listener that takes one parameter of type {@link taz.Heading}.
 */
taz.Navigation.prototype.addHeadingListener = function(listener) {
    this.headingListeners_.push(listener);
};
 
/**
 * Removes a position (gps) listener.
 */
taz.Navigation.prototype.removePositionListener = function(listener) {
    this.positionListeners_ = taz.removeFromArray(this.positionListeners_, listener);
};
  
/**
 * Removes a heading (compass) listener.
 */
taz.Navigation.prototype.removeHeadingListener = function(listener) {
    this.headingListeners_ = taz.removeFromArray(this.headingListeners_, listener);
};

/**
 * @private
 */
taz.Navigation.prototype.pollPosition_ = function() {
	var that = this;
	
    if (!this.positionUpdatesEnabled_) {
        return;
    }
	
	if (taz.isUsingRipple()) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	        if (position) {
	            that.onPositionUpdate_(position);
	        }
	    });
	}
	else {
	    window.JSBridge.getCurrentPosition(function(position) {
	        if (position) {
	            that.onPositionUpdate_(position);
	        }
	    });
	}

	this.pollPositionHandle_ = setTimeout(function() {
		that.pollPosition_();
	}, taz.Navigation.POSITION_UPDATE_INTERVAL);
};

/**
 * @private
 */
taz.Navigation.prototype.onPositionUpdate_ = function(position) {
    ++this.positionUpdateCount_;
    this.invokeInitReadyCallbackIfNeeded_();
    
    /*
    // HACK: Always fake that you are on the checkpoint even if your real location is somewhere else
    if (taz && taz.game && taz.game.getModel() && taz.game.getModel().getCurrentCheckPoint()) {
        var x = taz.game.getModel().getCurrentCheckPoint();
        position.coords.latitude = x.position.latitude;
        position.coords.longitude = x.position.longitude;
        position.coords.accuracy = 1;
    }
    */
    
    this.currentPositionAccuracy = position.coords.accuracy;
    this.currentPosition = new taz.GeoPosition(position.coords.latitude, position.coords.longitude);
};

/**
 * Sets the current position manually. Useful for faking location information.
 */
taz.Navigation.prototype.setCurrentPosition = function(position, accuracy) {
    this.onPositionUpdate_({
        coords: {
            accuracy: accuracy,
            latitude: position.latitude,
            longitude: position.longitude
        }
    });
    
    // Invoke all registered listeners.
    for (var i = 0; i < this.positionListeners_.length; ++i) {
        var posCopy = new taz.GeoPosition(position.latitude, position.longitude);
        this.positionListeners_[i](posCopy, this.currentPositionAccuracy);
    }    
};

/**
 * @private
 */
taz.Navigation.prototype.invokeInitReadyCallbackIfNeeded_ = function() {
    if (this.initReadyCB_ && this.compassUpdateCount_ >= 1 && this.positionUpdateCount_ >= 1) {
        // Initialization is ready when two events of both types have been succesfully received.
        // Two because the first event seems to always come instantly event if the GPS fix has
        // not yet been made.
        this.initReadyCB_();
        
        // Make sure this is called only once.
        this.initReadyCB_ = null;
        this.initErrorCB_ = null;
    }
};

/**
 * @private
 */
taz.Navigation.prototype.onCompassUpdate_ = function(heading) {
    ++this.compassUpdateCount_;
    this.invokeInitReadyCallbackIfNeeded_();

    var receivedHeadingDegrees = 0;
    
    if (typeof(heading) == "number") {
    	receivedHeadingDegrees = heading;
    } else {
    	receivedHeadingDegrees = heading.magneticHeading;
    }
    
	// Apply screen rotation to the heading so it's displayed correctly on tablets with landscape as default orientation
	receivedHeadingDegrees += this.displayRotation_;
    
    //Angle averaging algorithm: Average the sine and cosine of the latest readings 
    //and get the angle back with Math.atan2(y,x). Convert the result (in range [-180...180]) to desired angle 
    //range [0...360] so that 0 means North and that the angles increment counter-clockwise.
    var sumSin = 0;
    var sumCos = 0;
    this.previousHeadings.push(receivedHeadingDegrees);
    
    for(var i = 0; i < this.previousHeadings.length; ++i) {
    	sumSin = sumSin + Math.sin(this.previousHeadings[i] * Math.PI/180);
    	sumCos = sumCos + Math.cos(this.previousHeadings[i] * Math.PI/180);
    }
    
    var avgSin = sumSin / this.previousHeadings.length;
    var avgCos = sumCos / this.previousHeadings.length;
    var conversion = Math.atan2(avgSin, avgCos) * 180/Math.PI;
    if (conversion <= 0) {conversion += 360}
    conversion = conversion - 360;
  
    this.currentHeading = new taz.Heading(conversion);
    
    //Only keep 5 latest readings
    if (this.previousHeadings.length > 5) {
    	this.previousHeadings.splice(0, 1);
    }
    
    // Invoke all registered listeners.
    for (var i = 0; i < this.headingListeners_.length; ++i) {
        this.headingListeners_[i](new taz.Heading(conversion));
    }
};

/**
 * @private
 */
taz.Navigation.prototype.onCompassError_ = function(error) {
    this.onCompassUpdate_(0);
    if (error.code == CompassError.COMPASS_INTERNAL_ERR
            || error.code == CompassError.COMPASS_NOT_SUPPORTED) {
            
        if (this.initErrorCB_) {
            this.initErrorCB_("Compass not supported");
        }
        
        navigator.geolocation.clearWatch(this.positionListenerHandle_);
        navigator.compass.clearWatch(this.compassListenerHandle_);
    }
};


/**
 * TimerHelper contains a bunch of static utility functions for use with countdown timers
 */

/**
 * @namespace
 */
taz.TimerHelper = {}

/**
 * Returns a mm:ss formatted string based on time left in seconds
 */
taz.TimerHelper.getTimeString = function(seconds) {
    if (seconds <= 0) {
        return "00:00"; //Prevent negative times
    }
	
    var timeMinutes = String(Math.floor(seconds / 60));
    var timeSeconds = String(Math.floor(seconds) % 60);
	
    if (timeMinutes.length == 1) {
        timeMinutes = "0" + timeMinutes;
    }
    if (timeSeconds.length == 1) {
        timeSeconds = "0" + timeSeconds;
    }
	
    var timeString = timeMinutes + ":" + timeSeconds;
    return timeString;
};




/**
 * @class
 */
taz.GameTimer = function() {
    this.tickListeners_ = [];
    this.timeoutListeners_ = [];
    this.state_ = {
        startTime : null,
        pauseTime : null,
        pauseTimeSum : 0,
        gameDuration : null,
    };
	
    var that = this;
    // Start tick loop.
    setInterval(function() {
        // Invoke all tick listeners.
        for (var i = 0; i < that.tickListeners_.length; ++i) {
            that.tickListeners_[i]();
        }

        if (that.gameTimeEndListener_ != null 
            && that.state_.gameDuration != null
            && that.state_.gameDuration != 0
            && that.getTime() >= that.state_.gameDuration) {
            that.gameTimeEndListener_();
            that.gameTimeEndListener_ = null;
        }
    }, taz.GameTimer.TICK_INTERVAL);
};

/**
 * @const
 */
taz.GameTimer.TICK_INTERVAL = 500;

/**
 * Singleton instance.
 * 
 * @type taz.GameTimer
 */
taz.gameTimer = new taz.GameTimer();

/**
 * @private
 */
taz.GameTimer.prototype.state_ = null;

/**
 * @private
 * @type Function
 */
taz.GameTimer.prototype.gameTimeEndListener_ = null;

/**
 * @private
 */
taz.GameTimer.prototype.timeoutListeners_ = null;

/**
 * @private
 * @type taz.GameModel
 */
taz.GameTimer.prototype.model_ = null;

taz.GameTimer.prototype.setModel = function(model) {
    this.model_ = model;
    var state = model.getTimerState();
    
    if (state != null) {
        this.state_ = state;
    }
};

taz.GameTimer.prototype.clear = function() {
    this.state_.pauseTime = null;
    this.state_.pauseTimeSum = 0;
    this.state_.startTime = null;
    this.state_.gameDuration = null;
    this.model_.setTimerState(this.state_);
};

taz.GameTimer.prototype.getTime = function() {
    if (this.state_.startTime == null) {
        return 0;
    }
    var time = new Date().getTime();
	
    if (this.state_.pauseTime != null) {
        return (this.state_.pauseTime - this.state_.startTime) - this.state_.pauseTimeSum;
    } else {
        return (time - this.state_.startTime) - this.state_.pauseTimeSum;
    }
};

taz.GameTimer.prototype.getTimeString = function() {
    var totalSeconds = Math.floor(this.getTime() / 1000);
    var hours = Math.floor(totalSeconds / (60 * 60));
    var minutes = Math.floor(totalSeconds / 60) % 60;
    var seconds = (totalSeconds % 60);

    var twoCharFormat = function(number) {
        var str = number.toString();
        return str.length == 1 ? '0' + str : str;
    };

    var str = twoCharFormat(minutes) + ':' + twoCharFormat(seconds);

    if (hours > 0) {
        str = hours + ':' + str;
    }
	
    return str;
};

taz.GameTimer.prototype.start = function(startTime, gameDuration) {
    this.state_.pauseTime = null;
    this.state_.pauseTimeSum = 0;
    this.state_.startTime = startTime;
    this.state_.gameDuration = gameDuration;
    this.model_.setTimerState(this.state_);
};

taz.GameTimer.prototype.pause = function() {
    if (this.state_.pauseTime == null) {
        this.state_.pauseTime = new Date().getTime();
    }
};

taz.GameTimer.prototype.resume = function() {
    if (this.state_.pauseTime != null) {
        var time = new Date().getTime();
        this.state_.pauseTimeSum += (time - this.state_.pauseTime);
    }

    this.state_.pauseTime = null;
    this.model_.setTimerState(this.state_);
};

taz.GameTimer.prototype.addTickListener = function(listener) {
    this.tickListeners_.push(listener);
};

taz.GameTimer.prototype.removeTickListener = function(listener) {
    this.tickListeners_ = taz.removeFromArray(this.tickListeners_, listener);
};

taz.GameTimer.prototype.setGameTimeEndListener = function(listener) {
    this.gameTimeEndListener_ = listener;
};


/**
 * @class Represents an ajax request that can be sent using AjaxRequestSender.
 */
taz.AjaxRequest = function() {
    this.type = taz.AjaxRequest.Type.GET;
    this.messageType = taz.AjaxRequest.MessageType.GAME_EVENT;
    this.path = null;
    this.url = null;
    this.contentType = taz.AjaxRequest.ContentType.JSON;
    this.data = null;
    this.successCallback = null;
    this.errorCallback = null;
    this.dataType = taz.AjaxRequest.DataType.JSON;
    this.timeout = 10000;
};

/**
 * Static method that creates a special request for logging in to the server.
 */
taz.AjaxRequest.createLoginRequest = function(serverUrl) {
    var loginRequest = new taz.AjaxRequest();

    loginRequest.type = taz.AjaxRequest.Type.POST;
    loginRequest.dataType = taz.AjaxRequest.DataType.HTML;
    loginRequest.contentType = taz.AjaxRequest.ContentType.URLENCODED;
    loginRequest.path = 'user/login';
    loginRequest.url = serverUrl + loginRequest.path;
    loginRequest.timeout = 60000;
    loginRequest.isLoginRequest = true;
    
    // Succesfull login is answered with this error code.  Handle it so that the
    // login is not attempted again.
    loginRequest.errorCallback = {
        '302': function() {}
    };
    
    loginRequest.data = {
        username : taz.settings.serverUsername,
        password : taz.settings.serverPassword
    };
    
    return loginRequest;
};

/**
 * Supported HTTP methods.
 * 
 * @enum
 */
taz.AjaxRequest.Type = {
    POST : 'POST',
    GET : 'GET'
};

/**
 * Format in which to send the data.
 * 
 * @enum {String}
 */
taz.AjaxRequest.ContentType = {
    URLENCODED : 'application/x-www-form-urlencoded',
    JSON : 'application/json; charset=utf-8'
};

/**
 * Format in which the response is expected.
 * 
 * @enum {String}
 */
taz.AjaxRequest.DataType = {
    HTML : 'html',
    JSON : 'json',
    NONE : 'text'
};

/**
 * Message type.
 * 
 * @enum {String}
 */
taz.AjaxRequest.MessageType = {
    ANSWER : "ANSWER",
    STATUS_UPDATE: "STATUS_UPDATE",
    GAME_EVENT : "GAME_EVENT"
};

/**
 * @type String
 */
taz.AjaxRequest.prototype.type = taz.AjaxRequest.Type.GET;

/**
 * @type integer
 */
taz.AjaxRequest.prototype.messageType = taz.AjaxRequest.MessageType.GAME_EVENT;

/**
 * Request path in relation to the root of the server REST root url.
 * 
 * @type String
 */
taz.AjaxRequest.prototype.path = null;

/**
 * Whole request URL. If this is set this.path is ignored.
 * 
 * @type String
 */
taz.AjaxRequest.prototype.url = null;

/**
 * @type taz.AjaxRequest.ContentType
 */
taz.AjaxRequest.prototype.contentType = taz.AjaxRequest.ContentType.JSON;

/**
 * Possible data to send.
 * 
 * @type Object
 */
taz.AjaxRequest.prototype.data = null;

/**
 * Function that is called after success. The functions should take one parameter which is 
 * the response as JSON object.
 * 
 * @type Function
 */
taz.AjaxRequest.prototype.successCallback = null;

/**
 * Error callbacks. Can be either a single function that is called when any error occurs or
 * an object whose keys are HTTP status codes and values functions that handle the error case.
 * If error is handled by the functions defined here, the request retry is disabled.
 * 
 * @type Function(Number)|Object.<Number, Function(Number)>
 */
taz.AjaxRequest.prototype.errorCallback = null;

/**
 * @type taz.AjaxRequest.DataType
 */
taz.AjaxRequest.prototype.dataType = taz.AjaxRequest.DataType.JSON;

/**
 * Request timeout in milliseconds.
 * 
 * @type Number
 */
taz.AjaxRequest.prototype.timeout = 10000;




$.mobile.page.prototype.options.domCache = false;

/**
 * @namespace
 */
taz = {};

/**
 * @namespace
 */
taz.input = {}

/**
 * @private
 */
taz.templateCache_ = {};

/**
 * @private
 */
taz.isDeviceiPhone_ = null;


taz.inherits = function(descendant, parent) {
	for(var m in parent.prototype) {
		descendant.prototype[m] = parent.prototype[m];
	}
};

taz.median = function(values) {
    values.sort( function(a,b) {return a - b;} );
    var half = Math.floor(values.length/2);
    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

taz.medianPos = function(posList) {
    var lats = [];
    var lons = [];
    _.each(posList, function(pos){
        lats.push(pos.latitude);
        lons.push(pos.longitude);
    });
    var latMedian = taz.median(lats);
    var lonMedian = taz.median(lons);
    
    return new taz.GeoPosition(latMedian, lonMedian);
}

taz.deg2rad = function(deg) {
    return deg * Math.PI / 180;
};

taz.rad2deg = function(rad) {
    return rad * 180 / Math.PI;
};

taz.removeFromArray = function(arr, obj) {
    var newArray = [];
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i] != obj) {
            newArray.push(arr[i]);
        }
    }
    return newArray;
};

taz.getTemplate = function(template) {
	if (template in taz.templateCache_) {
		return taz.templateCache_[template];
	}
	
	var ajaxObj = {
    	type : 'GET',
    	url : 'templates/' + template.toLowerCase() + '.html',
        contentType : 'text/html',
        async : false
    };
	
    taz.templateCache_[template] = Handlebars.compile($.ajax(ajaxObj).responseText);
    return taz.templateCache_[template];
};

taz.isUsingRipple = function() {
	return ('tinyHippos' in window);
};

taz.isDeviceiPhone = function() {
    if(taz.isDeviceiPhone_ == null) {
        taz.isDeviceiPhone_ = (navigator.userAgent.toLowerCase().indexOf('iphone') > -1 || navigator.userAgent.toLowerCase().indexOf('ipad') > -1);
    }
    return taz.isDeviceiPhone_;
}

taz.isDeviceAndroid = function() {
    return device.platform === "Android";
};

taz.htmlDecode = function(encodedString) {
    return $('<div/>').html(encodedString).text();
}

/**
 * Generates strings from template strings written using handlebars syntax.
 *
 * Example:
 *
 * taz.formatString('My name is {{name}}', {name : 'Sami'});
 * --> 'My name is Sami'
 */
taz.formatString = function(template, data) {
    var template = Handlebars.compile(template);
    return template(data);
};

/**
 * Enables input validation for a <input> element.
 * 
 * @param input     Selector string for the <input> element
 * @param validator Validator to decide the validity. Takes the input-parameter and returns if it is valid.
 * @param callback  Callback that is called after each validation decision. Boolean which tells if the string 
 *                  is valid or not is passed.
 */
taz.input.setInputValidator = function(input, validator, callback) {
    $(input).bind('keydown keyup keypress cut paste change input', function() {
        setTimeout(function() {
            callback(validator.validate(input));
        }, 0);
    });
};

/**
 * Pre-defined validator. Does not allow name to be empty, nor allows for illegal characters in team name.
 * @param input         The selector string for the <input> element.
 * @returns {Boolean}
 */
taz.input.LegalTeamNameValidator = function(){};
taz.input.LegalTeamNameValidator.prototype.validate = function(input) {
    var notEmptyValidator = new taz.input.NotEmptyValidator();
    var validatedNotEmpty = notEmptyValidator.validate(input);
    if( validatedNotEmpty == false ) return false;
    var inputString = $(input).val();
    var valid = true;

    for (var i = 0; i < inputString.length; ++i) {
        if (inputString[i] == '"' ) {
            valid = false;
            break;
        }
    }

    return valid;
};

/**
 * Pre-defined validator. Does not allow empty or whitespace strings.
 * 
 * @param input         The selector string for the <input> element.
 * @returns {Boolean}
 */
taz.input.NotEmptyValidator = function(){};
taz.input.NotEmptyValidator.prototype.validate = function(input) {
    var inputString = $(input).val();
    var empty = true;
	        
    if (!(inputString === undefined) && inputString != null && inputString.length > 0) {
        for (var i = 0; i < inputString.length; ++i) {
            if (inputString[i] != ' ') {
                empty = false;
            }
        }
    }
	    
    return !empty;
};

/**
 * Pre-defined validator. Only allows input if: begin <= input <= end. 
 *
 * @param begin
 * @param end
 */
taz.input.RangeValidator = function(begin, end) {
	this.begin_ = begin;
	this.end_ = end;
};
taz.input.RangeValidator.prototype.begin_ = null;
taz.input.RangeValidator.prototype.end_ = null;
taz.input.RangeValidator.prototype.notEmpty_ = new taz.input.NotEmptyValidator();
taz.input.RangeValidator.prototype.validate = function(input) {
	if (!this.notEmpty_.validate(input)) {return false;}
	var inputString = $(input).val();
	
	var inputNumber = Number(inputString);
	if ((this.begin_ == null || inputNumber >= this.begin_) 
			&& (this.end_ == null || inputNumber <= this.end_)) {
		return true;
	}
	else {
		return false;
	}
};

/**
 * Pre-defined validator. Check if the password is correct
 *
 * @param correct
 */
taz.input.PasswordValidator = function(correct) {
	this.correct_ = correct;
};
taz.input.PasswordValidator.prototype.correct_ = null;
taz.input.PasswordValidator.prototype.validate = function(input) {
    var inputString = $(input).val();

    if (this.correct_ == inputString)
	{
    	return true;
	}
    
    return false;
};

Handlebars.registerHelper('iter', function(context, options) {
    var fn = options.fn, inverse = options.inverse;
    var ret = "";
    
    if(context && context.length > 0) {
        for(var i=0, j=context.length; i<j; i++) {
            ret = ret + fn(_.extend({}, context[i], { i: i, iPlus1: i + 1 }));
    }
    } else {
        ret = inverse(this);
    }
    
    return ret;
});

/** jQuery plugin for "tazClick" events (used to prevent Android ICS problems) */
taz.input.latestTazClick = 0;
(function($) {
	$.fn.tazClick = function(callback) {
	    return (function(cb, el) {
	        $(el).bind("tap", function(event) {
                //console.log("TAZ: tap occured at: " + event.timeStamp + "(" + taz.input.latestTazClick + ")");
                // On Android ICS+ the event may be handled in DOM elements 
                // that are added in the callback. This check ensures that multiple elements 
                // will not get the same tazClick.
                if (event.timeStamp == taz.input.latestTazClick) {
                    console.log("WARN(TazClick): Stray event to sibling element. Ignoring...");
                    return false;
                }

                taz.input.latestTazClick = event.timeStamp;
                event.preventDefault();
                event.stopPropagation();
                cb(event);
                return false;
            });
            
            $(el).bind("click", function(event) {
                //console.log("TAZ: click occured at: " + event.timeStamp + "(" + taz.input.latestTazClick + ")");
                event.preventDefault();
                event.stopPropagation();
                return false;
            });	        
            
            return el;
	    })(callback, this);
	};
})(jQuery);

/** jQuery plugins */

/**
 * Plugin that allows scrolling to a specific element.
 */
(function($) {
    $.fn.scrollToThis = function(timeMs) {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, timeMs);
        return this;
    }
})(jQuery);

/**
 * @class Interface for the game backend.
 * @constructor
 * @interface
 */
taz.Backend = function() {

};

/**
 * Requests a list of servers sorted by the location (nearest first).
 *
 * @param {taz.GeoPosition} position Current position of the team.
 * @param {Function(GameListDTO)} callback Function that takes the game list as parameter.
 */
taz.Backend.prototype.getServers = function(position, callback) {
    throw new Error('Not implemented');
};

/**
 * Set active game server to be used in game requests.
 *
 * @param {String} serverUrl Game server base url.
 */
taz.Backend.prototype.setActiveGameServer = function(serverUrl) {
    throw new Error('Not implemented');
};

taz.Backend.prototype.getActiveGameServerUrl = function() {
    throw new Error('Not implemented');
};

/**
 * Clear active game server instance.
 */
taz.Backend.prototype.clearActiveGameServer = function() {
    throw new Error('Not implemented');
};

/**
 * Requests a list of games that can be joined from the current position.
 * 
 * @param {taz.GeoPosition} position Current position of the team.
 * @param {Function(GameListDTO)} callback Function that takes the game list as parameter.
 */
taz.Backend.prototype.getNearbyGames = function(position, callback) {
    throw new Error('Not implemented');
};

/**
 * Requests a data chunk by id.
 * 
 * @param {Number} dataChunkId Identifier of the data chunk.
 * @param {Function(DataChunkDTO)} callback Function that takes the data chunk as parameter.
 */
taz.Backend.prototype.getDataChunk = function(dataChunkId, callback) {
    throw new Error('Not implemented');
};

/**
 * Requests whether the game is running or not.
 * 
 * @param {Number} gameId Identifier of the game to test.
 * @param {Function(Boolean)} callback Function that is passed true if the game is running
 *                                     and false otherwise.
 */
taz.Backend.prototype.isGameRunning = function(gameId, callback) {   
    throw new Error('Not implemented');
};

/**
 * Attempts to join a game.
 * 
 * @param {Number} gameId Identifier of the game to join.
 * @param {String} teamName Name of the team.
 * @param {taz.GeoPosition} position Current position of the team.
 * @param {Object.<String, Function(?Number)>} callbacks
 *      An object that contains three callbacks: "success", "alreadyJoined" and "nameInUse".
 *      The correct callback is invoked when the backend responds. "success" and "alreadyJoined"
 *      callbacks take 2 parameters: the id given to the team and the message thread id associated to the team.
 */
taz.Backend.prototype.joinGame = function(gameId, teamName, position, callbacks) {
    throw new Error('Not implemented');
};

/**
 * Fetches a game from the backend.
 *
 * @param {Number} gameId Identifier of the game.
 * @param {Function(GameDTO)} callback A function that is passed the requsted game.
 */
taz.Backend.prototype.getGame = function(gameId, callback) {
    throw new Error('Not implemented');
};

/**
 * Asks the backend whether the team can start playing.
 * 
 * @param {Number} gameId Identifier of the game.
 * @param {Number} teamId Identifier of the team.
 * @param {Function(Boolean)} callback Takes one boolean parameter that indicates whether the team
 *                            can start playing the game.
 */
taz.Backend.prototype.isPermissionToStart = function(gameId, teamId, callback) {
    throw new Error('Not implemented');
};

/**
 * Updates the team status to backend.
 *
 * @param {Number} gameId Identifier of the game.
 * @param {Number} teamId Identifier of the team.
 * @param {taz.GeoPosition} position Current position of the team.
 * @param {String} state Current state of the team.
 * @param {Number} points Current points of the team.
 * @param {Function} callback Invoked after the backend has responded.
 */
taz.Backend.prototype.updateTeamStatus = function(gameId, teamId, position, state, points, nextcheckpointId, traveled, callback) {
    throw new Error('Not implemented');
};

taz.Backend.prototype.updateTeamStatusAfterCp = function(gameId, teamId, position, state, points, nextcheckpointId, traveled, callback) {
    throw new Error('Not implemented');
};

/**
 * Requests the next check point.
 * 
 * @param {Number} gameId Identifier of the game.
 * @param {Number} teamId Identifier of the team.
 * @param {Function(CheckPointTemplateDTO)} callback Function that takes a check point template id as parameter.
 */
taz.Backend.prototype.getNextCheckPoint = function(gameId, teamId, validCheckPointIds, hasConnections, callback) {
    throw new Error('Not implemented');
};

/**
 * Notifies the backend that the team has arrived to a check point.
 * 
 * @param {Number} gameId Identifier of the game.
 * @param {Number} teamId Identifier of the team.
 * @param {Number} checkPointTemplateId Identifier of the template of the check point the team arrived to.
 * @param {Function} callback Invoked after the backend has responded.
 */
taz.Backend.prototype.arrivedToCheckPoint = function(gameId, teamId, checkPointTemplateId, callback) {        
    throw new Error('Not implemented');
};

/**
 * @param {Number} gameId Identifier of the game.
 * @param {Number} teamId Identifier of the team.
 * @param {Function} callback Invoked after the backend has responded.  	
 */
taz.Backend.prototype.leftCheckPoint = function(gameId, teamId, callback) {
	throw new Error('Not implemented');
};

/**
 * Gets current checkpoint status from the backend.
 */
taz.Backend.prototype.getCheckPointStatus = function(gameId, checkPointId, callback) {
	throw new Error('Not implemented');
};

/**
 * Answers to a task on a check point.
 * 
 * @param {Number} gameId Identifier of the game.
 * @param {Number} teamId Identifier of the team.
 * @param {TaskAnswerDTO} answer The answer object.
 * @param {Function} callback Function taking the number of points given for the answer.
 */
taz.Backend.prototype.answerTask = function(gameId, teamId, answer, callback) {    
    throw new Error('Not implemented');
};

/**
 * Informs the backend that we have finished the game.
 *
 * @param {Number} gameId Identifier of the game.
 * @param {Number} teamId Identifier of the team.
 * @param {taz.GeoPosition} position Current position of the team.
 * @param {String} state Current state of the team.
 * @param {Number} points Current points of the team.
 * @param {Function} callback Invoked after the backend has responded.
 */
taz.Backend.prototype.finishGame = function(gameId, teamId, position, state, points, callback) {    
    throw new Error('Not implemented');
};

/**
 * Gets a rankinglist from the backend.
 *
 * @param {Number} gameId Identifier of the game.
 * @param {Function(RankingListDTO)} callback This function is called with RankingListDTO as parameter
 *                                            after the list has been fetched from the server.
 * @param {Function} gameNotFoundCb Called if the game is not found.
 */
taz.Backend.prototype.getRankingList = function(gameId, callback, gameNotFoundCb) {    
    throw new Error('Not implemented');
};

/**
 * Fetches the locations of all the teams in the game.
 */
taz.Backend.prototype.getTeamLocations = function(gameId, callback, error) {
    throw new Error('Not implemented');
};

/**
 * Gets messages from server.
 */
taz.Backend.prototype.getMessages = function(messageThreadId, callback) {
	throw new Error('Not implemented');
};

taz.Backend.prototype.sendMessage = function(gameId, teamId, messageThreadId, message, callback) {
	throw new Error('Not implemented');
};

taz.Backend.prototype.setMessageThreadRead = function(messageThreadId, messageId, callback) {
	throw new Error('Not implemented');
};

/**
 * Returns information about the current network status.
 */
taz.Backend.prototype.getNetworkInfo = function() {
    throw new Error('Not implemented');
};

/**
 * Loads any peristent data that may have been saved by this backend.
 */
taz.Backend.prototype.loadPersistentData = function() {
    throw new Error('Not implemented');
};

/**
 * Clears any peristent data that may have been saved by this backend.
 */
taz.Backend.prototype.clearPersistentData = function() {
    throw new Error('Not implemented');
};


/**
 * @class The game logic. Game is implemented as a state machine. Each state extends taz.State class.
 *        taz.State has the same interface as Game does and the calls to Game are delegated directly
 *        to the State object that represents the current state.
 */
taz.Game = function() {
    // Nothing to do here.
};

taz.Game.LOCATION_ACCURACY_REQUIREMENT = taz.settings.requiredLocationAccuracy;
taz.Game.MAX_TIME_BETWEEN_LOCATION_UPDATES = 30 * 1000;
    
/**
 * This is called once after the client is done initializing. Starts a new game or continues an old
 * game if one is detected.
 */
taz.Game.prototype.start = function() {
    console.log("taz.Game.start");
    
    this.model_ = new taz.GameModel();
    this.serverBackend_ = new taz.ServerBackend();
    this.offlineBackend_ = new taz.OfflineBackend();
    this.backend_ = this.serverBackend_;
    this.messagingOverlay_ = new taz.MessagingOverlay();
    this.netDebugOverlay_ = new taz.NetworkDebugOverlay();
    
    var that = this;
    
    // Create a model for the game.
    this.model_.create(function(unfinishedGameFound) {
        
        // Create state objects.
        that.states_ = {
            INITIALIZING          : new taz.InitializingState(that, taz.Game.State.INITIALIZING),
            ON_WAY_TO_START_AREA  : new taz.OnWayToStartAreaState(that, taz.Game.State.ON_WAY_TO_START_AREA),
            WAITING_FOR_LAUNCH    : new taz.WaitingForLaunchState(that, taz.Game.State.WAITING_FOR_LAUNCH),
            ON_WAY_TO_CHECKPOINT  : new taz.OnWayToCheckPointState(that, taz.Game.State.ON_WAY_TO_CHECKPOINT),
            ON_DEMAND_TASK        : new taz.OnDemandTaskState(that, taz.Game.State.ON_DEMAND_TASK),
            ON_CHECKPOINT         : new taz.OnCheckPointState(that, taz.Game.State.ON_CHECKPOINT),
            ON_WAY_TO_FINISH_AREA : new taz.OnWayToFinishAreaState(that, taz.Game.State.ON_WAY_TO_FINISH_AREA),
            ON_DEMANDS_LEFT       : new taz.OnDemandsLeftState(that, taz.Game.State.ON_DEMANDS_LEFT),
            FINISHED              : new taz.FinishedState(that, taz.Game.State.FINISHED)
        };
        
        taz.gameTimer.setModel(that.model_);
        
        if (that.getLanguage() != null && _.has(taz, 'strings_' + String(that.getLanguage()))) {
        	taz.strings = taz['strings_' + String(that.getLanguage())];
        }
                
        that.lastLocationFixTime_ = new Date().getTime();
        if(that.model_.getWarningDialogShown() == null) {
        	taz.dialogs.warningDialog(function() {
            	if (unfinishedGameFound) {
                    console.log("taz.Game.start: unfinished game found");
                    taz.viewManager.changeView("rejoinGameView", null);
                } else {
                    that.startNewGame();
                }
            	if($("#warningDialogCheckbox").is(":checked")) {
            		that.model_.setWarningDialogShown(true);
            	}
            });
        } else {
        	if (unfinishedGameFound) {
                console.log("taz.Game.start: unfinished game found");
                taz.viewManager.changeView("rejoinGameView", null);
            } else {
                that.startNewGame();
            }
        } 
        
        // Register position listener.
        taz.navigation.addPositionListener(_.bind(that.positionListener_, that));
        
        // Register game time end listener.
        taz.gameTimer.setGameTimeEndListener(function() {
            if (that.state_) {
                that.gameTimeEnded();
            }
        });
    });
};

/**
 * This enumeration contains the states the game can be in.
 * 
 * @enum
 */
taz.Game.State = {
    INITIALIZING : 'INITIALIZING',
    ON_WAY_TO_START_AREA : 'ON_WAY_TO_START_AREA',
    WAITING_FOR_LAUNCH : 'WAITING_FOR_LAUNCH',
    ON_WAY_TO_CHECKPOINT : 'ON_WAY_TO_CHECKPOINT',
    ON_DEMAND_TASK : 'ON_DEMAND_TASK',
    ON_CHECKPOINT : 'ON_CHECKPOINT',
    ON_WAY_TO_FINISH_AREA : 'ON_WAY_TO_FINISH_AREA',
    ON_DEMANDS_LEFT : 'ON_DEMANDS_LEFT',
    FINISHED : 'FINISHED'
};

/**
 * @private
 * @type {taz.GameModel}
 */
taz.Game.prototype.model_ = null;

/**
 * @private
 * @type {taz.Backend}
 */
taz.Game.prototype.backend_ = null;

/**
 * @private
 * @type {taz.ServerBackend}
 */
taz.Game.prototype.serverBackend_ = null;

/**
 * @private
 * @type {object.<taz.Game.State, taz.State>}
 */
taz.Game.prototype.states_ = null;

/**
 * The current state.
 *
 * @private
 * @type {taz.State}
 */
taz.Game.prototype.state_ = null;

/**
 * @private
 */
taz.Game.prototype.locationInaccurate_ = false;

/**
 * @private
 */
taz.Game.prototype.lastLocationFixTime_ = null;

/**
 * @private
 */
taz.Game.prototype.positionListeners_ = [];

/**
 * @private
 */
taz.Game.prototype.messageListeners_ = [];

/**
 * @private
 */
taz.Game.prototype.messages_ = [];

/**
 * @private
 */
taz.Game.prototype.messagingOverlay_ = null;

/**
 * @private
 */
taz.Game.prototype.netDebugOverlay_ = null;

/**
 * @private
 */
taz.Game.prototype.isOnline_ = true;

/**
 * @private
 */
taz.Game.prototype.isNoGpsGame_ = false;

/**
 * @private
 * @type {taz.GeoPosition}
 */
taz.Game.prototype.lastKnownPosition_ = taz.GeoPosition(61.4496194826987, 23.8583135604858);

/** 
 * @private
 */
taz.Game.prototype.positionListener_ = function(position, accuracy) {
    var timeSinceLastFix = new Date().getTime() - this.lastLocationFixTime_;
    
	// Save the position, even if it is inaccurate
    this.lastKnownPosition_ = position;

    // Is location accuracy too low?
	if (!accuracy || accuracy > taz.Game.LOCATION_ACCURACY_REQUIREMENT) {
	    // Should we show location warning dialog?
		if (/*!this.locationWarningDialog_.isOpen()*/
			!this.locationInaccurate_
                        && this.state_
                        && this.state_.isLocationSensitive()
                        && this.lastLocationFixTime_ 
                        && timeSinceLastFix > taz.Game.MAX_TIME_BETWEEN_LOCATION_UPDATES) {

            //this.locationWarningDialog_.show();
			this.locationInaccurate_ = true;
            
            var gameId = this.model_.getGameId();
            var teamId = this.model_.getTeamId();
            var state = 'NO_GPS';
            var points = this.model_.getPoints();
            var dist = this.model_.getDistance();
            
            this.backend_.updateTeamStatus(gameId, teamId, position, state, points, null, dist, null);
		}
		
		return;
	}
	
	// If we got here, the location warning dialog should be closed and game timer resumed.
	if (/*this.locationWarningDialog_.isOpen()/*/
		this.locationInaccurate_) {
	    
            //this.locationWarningDialog_.close();
			this.locationInaccurate_ = false;
            
            var gameId = this.model_.getGameId();
            var teamId = this.model_.getTeamId();
            var state = this.model_.getState();
            var points = this.model_.getPoints();
            var dist = this.model_.getDistance();
            
            this.backend_.updateTeamStatus(gameId, teamId, position, state, points, null, dist, null);
	}
	
	this.lastLocationFixTime_ = new Date().getTime();
	
    if (this.state_) {
        this.positionChanged(position);
    }
};

/**
 * Clears any persistent data stored by this game or any previous game.
 */
taz.Game.prototype.clearPersistentData = function() {
    this.model_.clear();
    this.backend_.clearPersistentData(); 
};

/**
 * Clears the model and starts a new game. 
 */
taz.Game.prototype.startNewGame = function() {
    console.log("taz.Game.startNewGame: starting new game, wiping old data");
    
    taz.navigation.removePositionListener(this.positionListener_);
    var lang = this.model_.getLanguage();
    
    // Preserve selected language, otherwise wipe the model
    this.clearPersistentData();
    this.model_.setLanguage(lang);
    taz.gameTimer.setModel(this.model_);

    this.messages_ = [];
    
    this.setState(taz.Game.State.INITIALIZING);
};

taz.Game.prototype.continueGame = function() {
    console.log("taz.Game.continueGame: continuing the old game");
    
    // when continuing and old game, reset it's state to not ended so client will inform the rejoining 
    // team that the game has ended
    var game = this.model_.getGame();
    game.ended = false;
    this.model_.setGame(game);
    this.setOnline(!game.template.offline);
    this.setNoGpsGame(game.template.noGpsGame);
    
    this.backend_.loadPersistentData();
    this.continueState_(this.model_.getState());

    // Refetch messages when continuing
    this.newMessagesAvailable();
};

/**
 * Gets if the client is in online or offline mode
 */
taz.Game.prototype.isOnline = function() {
	return this.isOnline_;
};

taz.Game.prototype.setOnline = function(online) {
    if (online !== this.isOnline_) {
        this.backend_ = this[(online ? 'server' : 'offline') + 'Backend_'];
        
        for (var state in this.states_) {
            this.states_[state].backend = this.backend_;
        }
    }
    
    this.backend_.setActiveGameServer(this.model_.getServerUrl());
    this.isOnline_ = online;
};

taz.Game.prototype.isNoGpsGame = function() {
    return this.isNoGpsGame_;
};

taz.Game.prototype.setNoGpsGame = function(isNoGpsGame) {
    this.isNoGpsGame_ = isNoGpsGame;
    taz.navigation.enableLocationUpdates(!this.isNoGpsGame_);
};

taz.Game.prototype.isOnDemandTaskAvailable = function() {
    var tasksLeft = this.model_.getCurrentOnDemandTask() !== null;
    var stateOk = (this.model_.getState() == taz.Game.State.ON_WAY_TO_CHECKPOINT || this.model_.getState() == taz.Game.State.ON_DEMANDS_LEFT || this.model_.getState() == taz.Game.State.ON_WAY_TO_FINISH_AREA);
    
    return tasksLeft && stateOk;
};

/**
 * @return {taz.GameModel} The model object.
 */
taz.Game.prototype.getModel = function() {
    return this.model_;
};

/**
 * @return {taz.GeoPosition}
 * return last known position
 */
taz.Game.prototype.getLastKnownPosition = function() {
    return this.lastKnownPosition_;
};


/**
 * @return {taz.Backend} The backend.
 */
taz.Game.prototype.getBackend = function() {
    return this.backend_;
};

/**
 * @return {Array} List of server names and urls. 
 */
taz.Game.prototype.getServerList = function(callback) {
    taz.loadingDialog.setLoadingMessage(taz.htmlDecode(taz.strings.finding_servers));
    taz.loadingDialog.show();    
    
    this.backend_.getServers(this.getLastKnownPosition(), function(list) {
        taz.loadingDialog.hide();
        callback && callback(list);
    });
};

/**
 * Returns the team name.
 */
taz.Game.prototype.getTeamName = function() {
    return this.model_.getTeamName();
};

/**
 * Returns boolean for hiding the ranking.
 */
taz.Game.prototype.isHideRanking = function() {
    return this.model_.isHideRanking();
};

/**
 * Returns boolean for hiding the ranking list.
 */
taz.Game.prototype.isHideRankingList = function() {
    return this.model_.isHideRankingList();
};

/**
 * Returns boolean for hiding the scores.
 */
taz.Game.prototype.isHideScores = function() {
    return this.model_.isHideScores();
};

/**
 * Returns boolean for hiding the travelled distance.
 */
taz.Game.prototype.isHideDistance = function() {
    return this.model_.isHideDistance() || this.isNoGpsGame();
};

/**
 * Returns current points
 */
taz.Game.prototype.getCurrentPoints = function() {
    return this.model_.getPoints() + this.model_.getPointAdjustment();
};

/**
 * Returns 'current position / number of teams'
 */
taz.Game.prototype.getRankingString = function() {
    return this.model_.getRankingString();
};

taz.Game.prototype.getTraveledString = function() {
    return "" + this.model_.getDistance();
};

/**
 * Returns the set language.
 */
taz.Game.prototype.getLanguage = function() {
	return this.model_.getLanguage();
};

/**
 * Called when selected language has been changed.
 */
taz.Game.prototype.setLanguage = function(language) {
	if (language != null && language != undefined && language != "") {
		this.model_.setLanguage(language);
		taz.strings = taz['strings_' + String(language)];
		taz.viewManager.refreshCurrentView();
	}
};

/**
 * Changes the state.
 */
taz.Game.prototype.setState = function(stateId) {
    if (this.state_) {
        this.state_.exitState();
    }

    this.state_ = this.states_[stateId];
    this.model_.setState(stateId);
    this.state_.enterState();
};

/**
 * Registers a position update listener. 
 */
taz.Game.prototype.addPositionListener = function(listener) {
	this.positionListeners_.push(listener);
};

/**
 * Registers a message listener. Called with the message list every time 
 * there are updates.
 */
taz.Game.prototype.addMessageListener = function(listener) {
	this.messageListeners_.push(listener);
};

taz.Game.prototype.removeMessageListener = function(listener) {
	this.messageListeners_ = taz.removeFromArray(this.messageListeners_, listener);
};

/**
 * The state class calls this when it knows new messages are available.
 */
taz.Game.prototype.newMessagesAvailable = function() {
	//Get the messages
	var that = this;

	that.backend_.getMessages(that.model_.getTeamMessageThreadId(), function(messageThread) {		
		that.messages_ = messageThread.messages || [];
		
		var newMessageCount = 0;
		for(var i = 0; i < that.messages_.length; ++i) {
			if (that.messages_[i].newMessageTeam) {
				newMessageCount++;
			}
		}
		
		if (that.messages_.length > 0) {
			// Set messages as read
			var lastSeenMessageId = that.messages_[that.messages_.length - 1].id;
			that.backend_.setMessageThreadRead(that.model_.getTeamMessageThreadId(), lastSeenMessageId, null);
			
			for(var i = 0; i < that.messageListeners_.length; ++i) {
				that.messageListeners_[i](that.messages_);
			}
			
			if (that.messagingOverlay_.isVisible()) {
				that.messagingOverlay_.updateMessages(that.messages_);
			}
			
			if (newMessageCount > 0 && !that.state_.requiresAttention()) {
				that.showMessagingOverlay();
			}
		}
	});
};

taz.Game.prototype.getMessages = function() {
	return this.messages_;
};

taz.Game.prototype.sendMessage = function(message, callback) {
	var gameId = this.model_.getGameId();
	var teamId = this.model_.getTeamId();
	var messageThreadId = this.model_.getTeamMessageThreadId();
	
	var that = this;
	this.backend_.sendMessage(gameId, teamId, messageThreadId, message, function(message) {
	    console.log("taz.Game.sendMessage: got response for sendMessage call");
	    
		that.messages_.push(message);
		
		for(var i = 0; i < that.messageListeners_.length; ++i) {
			that.messageListeners_[i](that.messages_);
		}		
		
		callback(message);
	});
};

taz.Game.prototype.showMessagingOverlay = function() {
	var teamName = this.model_.getTeamName();
	this.messagingOverlay_.show(this.messages_, teamName);
};

taz.Game.prototype.hideMessagingOverlay = function() {
	this.messagingOverlay_.hide();
};

taz.Game.prototype.showNetworkDebugOverlay = function() {
	this.netDebugOverlay_.show();
};

taz.Game.prototype.hideNetworkDebugOverlay = function() {
	this.netDebugOverlay_.hide();
};

/**
 * Continues the state.
 * 
 * @private
 */
taz.Game.prototype.continueState_ = function(stateId) {
    this.state_ = this.states_[stateId];
    this.state_.continueState();
};

/**
 * Called periodically with the current position.
 * 
 * @param {taz.GeoPosition} position The current position.
 */
taz.Game.prototype.positionChanged = function(position, accuracy) {
    this.state_.positionChanged(position, accuracy);
    
    for(var i = 0; i < this.positionListeners_.length; ++i) {
    	this.positionListeners_[i](position, accuracy);
    }
};

/**
 * This is called from the ShowServersView when the user selects a game server
 *
 * @param {GameServerListDTO.ServerDescription} server The description of the selected server.
 */
taz.Game.prototype.selectServer = function(server) {
    this.state_.selectServer(server);
};

/**
 * This is called from the serverDescriptionView when the user accepts the server.
 *
 * @param {GameServerListDTO.ServerDescription} game The description of the selected game.
 */
taz.Game.prototype.acceptServerSelection = function(server) {
    this.state_.acceptServerSelection(server);
};

/**
 * This is called from the ShowGamesView when the user selects a game to join.
 * 
 * @param {GameListDTO.GameDescription} game The description of the selected game.
 */
taz.Game.prototype.selectGame = function(game) {
    this.state_.selectGame(game);
};

/**
 * This is called from the gameDescriptionView when the user accepts the game.
 * 
 * @param {GameListDTO.GameDescription} game The description of the selected game.
 */
taz.Game.prototype.acceptGameSelection = function(game) {
    this.state_.acceptGameSelection(game);
};

/**
 * This is called from the JoinGameView when the user attempts to join the game.
 * 
 * @param {GameListDTO.GameDescription} game The description of the game to join.
 * @param {String} teamName Wanted name for the team.
 */
taz.Game.prototype.join = function(game, teamName) {	
    this.state_.join(game, teamName);
};

/**
 * Called by WaitForStartView when the start countdown has finished.
 */
taz.Game.prototype.startCountdownFinished = function() {
    this.state_.startCountdownFinished();
};

/**
 * Called from the ShowHintView after guidance hint has been shown long enough.
 */
taz.Game.prototype.guideHintShown = function() {
    this.state_.guideHintShown();
};

/**
 * Called from GuideView when route timer expires
 */
taz.Game.prototype.routeTimeExpired = function() {
    this.state_.routeTimeExpired();
};

/**
 * Called from the TaskView when that answer changes: for example when the team fills
 * a new text answer or selects a new check box during the answering process.
 * 
 * @param {AnswerTaskResponseDTO} answer The team's (partial) answer to the task at hand.
 */
taz.Game.prototype.answerChanged = function(answer) {
    this.state_.answerChanged(answer);
};

/**
 * Called from the TaskView after the user has an aswer.
 * 
 * @param {AnswerTaskResponseDTO} answer The team's answer to the task at hand.
 */
taz.Game.prototype.answerTask = function(answer) {
    this.state_.answerTask(answer);
};

/**
 * Called from the taskView when the user gives up.
 */
taz.Game.prototype.giveUpTask = function() {
    this.state_.giveUpTask();
};

/**
 * Called from the CheckTaskAnswerView after the answer has been checked.
 */
taz.Game.prototype.taskAnswersChecked = function(points) {
    this.state_.taskAnswersChecked(points);
};

/**
 * Called from AnswerView when "retry" has been clicked. 
 */
taz.Game.prototype.retryTask = function() {
    this.state_.retryTask();
};

/**
 * Called from AnswerView when "ok" has been clicked. 
 */
taz.Game.prototype.acceptTask = function(points) {
    this.state_.acceptTask(points);
};

/**
 * Called from ChooseRouteView when the team has selected a route.
 * 
 * @param {EdgeDTO} selectedEdge The edge that corresponds to the selected route.
 */
taz.Game.prototype.selectRoute = function(selectedEdge) {
    this.state_.selectRoute(selectedEdge);
};

taz.Game.prototype.selectCheckpointFromMap = function(selectedCheckpoint) {
    this.state_.selectCheckpointFromMap(selectedCheckpoint);
};

taz.Game.prototype.showOnDemandTask = function() {
    this.state_.showOnDemandTask();
};

taz.Game.prototype.showMapView = function() {
    this.state_.showMapView();
};

taz.Game.prototype.switchToGuideView = function() {
    this.state_.switchToGuideView();
};

taz.Game.prototype.refreshRankingListClicked = function() {
    this.state_.refreshRankingList();
};

/**
 * Called when we run out of game time.
 */
taz.Game.prototype.gameTimeEnded = function() {
    this.state_.gameTimeEnded();
};

taz.Game.prototype.qrCodeScanned = function(code) {
    this.state_.qrCodeScanned(code);
};


/**
 * @class A set of geographic coordinates.
 *
 * @param {Number} latitude Latitude in degrees.
 * @param {Number} longitude Longitude in degrees.
 */
taz.GeoPosition = function(latitude, longitude) {
    this.latitude = Number(latitude);
    this.longitude = Number(longitude);
};

/**
 * @type Number
 */
taz.GeoPosition.prototype.latitude = 0;

/**
 * @type Number
 */
taz.GeoPosition.prototype.longitude = 0;

/**
 * Calculates the shortest distance along the surface of the earth to another position.
 *
 * @param {taz.GeoPosition} position The position to which the distance is calculated.
 * @returns {Number} Distance in meters.
 */
taz.GeoPosition.prototype.distanceTo = function(position) {
    var deg2rad = taz.deg2rad;
    // Radius of the earth in meters.
    var R = 6371000;
    
    var dLat = deg2rad(position.latitude - this.latitude);
    var dLon = deg2rad(position.longitude - this.longitude);
    
    var lat1 = deg2rad(this.latitude);
    var lat2 = deg2rad(position.latitude);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
            
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c;
};

/**
 * Calculates a position that is <bearing> degrees and <distance> meters away from this point.
 * @returns {taz.GeoPosition} The destination position. 
 */
taz.GeoPosition.prototype.positionFromOffset = function(bearing, distance) {
	var lat1 = taz.deg2rad(this.latitude);
	var lon1 = taz.deg2rad(this.longitude);
	var R = 6371000;
	var d = distance;
	var brng = taz.deg2rad(bearing);
	
	var lat2 = Math.asin(Math.sin(lat1)*Math.cos(d/R) + Math.cos(lat1)*Math.sin(d/R)*Math.cos(brng));
	var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(lat1), Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));
	
	return new taz.GeoPosition(taz.rad2deg(lat2), taz.rad2deg(lon2));
};

/**
 * Calculates the bearing from this position to another.
 *
 * @param {taz.GeoPosition} position The position to which the bearing is calculated.
 * @returns {taz.Heading} The heading from this position to the other.
 */
taz.GeoPosition.prototype.bearingTo = function(position) {
    var deg2rad = taz.deg2rad;
    var rad2deg = taz.rad2deg;

    var dLat = deg2rad(position.latitude - this.latitude);
    var dLon = deg2rad(position.longitude - this.longitude);

    var lat1 = deg2rad(this.latitude);
    var lat2 = deg2rad(position.latitude);
    
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
            
    var angle = rad2deg(Math.atan2(y, x));
    // Convert from [-180, 180] to [0, 360]
    return new taz.Heading((angle + 360) % 360);
};


/**
 * @class This class is responsible of sending taz.AjaxRequest instances. A send queue is
 * maintained so that the requests are sent in the order they are passed to the send method.
 * 
 * If a request fails it will be retried until it is succesfully sent. Retry can be disabled
 * for a request by defining an errorCallback indicating that the error is handled somewhere
 * else.
 * 
 * This class is also responsible of automatically logging in to the server when the first 
 * request is sent and each time the session expires.
 */
taz.AjaxRequestSender = function(serverUrl) {
    this.serverUrl = serverUrl;
    if (this.serverUrl.substr(-1) != '/') {
        this.serverUrl += '/';
    }
    
    this.queues_ = {};
    
    // Initialize an empty queue for each message type.
    for (var messsageTypeId in taz.AjaxRequest.MessageType) {
        var messageType = taz.AjaxRequest.MessageType[messsageTypeId];
        this.queues_[messageType] = [];
    }
    
    this.currentRequest_ = null;
    this.previouslySelectedQueueType_ = taz.AjaxRequest.MessageType.ANSWER;
    this.statusUpdateBatchRequest_ = null;
};

/**
 * If a request fails this many milliseconds is waited before retry.
 * 
 * @const
 */
taz.AjaxRequestSender.RETRY_TIMEOUT = 10000;

/**
 * Special status code that means that response parsing failed.
 * 
 * @const
 */
taz.AjaxRequestSender.STATUS_CODE_PARSE_FAILED = -1;

taz.AjaxRequestSender.prototype.getServerUrl = function() {
    return this.serverUrl;
};

/**
 * Pushes a request to the request queue.
 * 
 * @param {taz.AjaxRequest} request 
 */
taz.AjaxRequestSender.prototype.send = function(request) {    
    console.log("AjaxRequestSender.send: queueing request: " + request.path);
    
    // Make sure the success callback is called only once.
    if (request.successCallback) {
        request.successCallback = _.once(request.successCallback);
    }

    // Make sure the error callbacks are called only once.
    if (request.errorCallback) {
        if (_.isFunction(request.errorCallback)) {
            request.errorCallback = _.once(request.errorCallback);
        } else {
            for (var errorCode in request.errorCallback) {
                var callback = request.errorCallback[errorCode];
                request.errorCallback[errorCode] = _.once(callback);
            }
        }
    }
    
    if (!request.url) {
        request.url = this.serverUrl + request.path;
    }
    
    // Push to the end of correct queue.
    this.queues_[request.messageType].push(request);

    if (request.messageType == taz.AjaxRequest.MessageType.ANSWER) {
        this.persistAnswers_();
    }
    
    if (!this.currentRequest_) {
        this.sendNext_();
    }
};

/**
 * @private
 */
taz.AjaxRequestSender.prototype.sendNext_ = function() {
    console.log("AjaxRequestSender.sendNext_");

    this.currentRequest_ = this.selectNextRequest_();
    
    // All queues are empty. Stop loop.
    if (this.currentRequest_ == null) {
        console.log("AjaxRequestSender.sendNext_: queue is empty");
        return;
    }
    
    console.log("AjaxRequestSender.sendNext_: message to send: " + this.currentRequest_.path);
    
    if (taz.isUsingRipple() || !window.JSBridge || taz.isDeviceiPhone()) {
        // For iOS, use jQuery ajax calls.
        
        var ajaxObj = {
            type : this.currentRequest_.type,
            contentType : this.currentRequest_.contentType,
            url : this.currentRequest_.url ? this.currentRequest_.url : (this.serverUrl + 'resource/' + this.currentRequest_.path),
            dataType : this.currentRequest_.dataType,
            async : true,
            cache : false
        };
        
        if (this.currentRequest_.timeout) {
            ajaxObj.timeout = this.currentRequest_.timeout;
        }
        
        if (this.currentRequest_.data) {
            if (this.currentRequest_.contentType == taz.AjaxRequest.ContentType.JSON) {
                ajaxObj.data = JSON.stringify(this.currentRequest_.data);
            } else {
                ajaxObj.data = this.currentRequest_.data;
            }
        }

        ajaxObj.success = _.bind(this.ajaxResponseCallbackSuccess_, this);
        ajaxObj.error = _.bind(this.ajaxResponseCallbackError_, this);
        
        //console.log("AjaxRequestSender.sendNext_: ajaxObj: " + JSON.stringify(ajaxObj, null, 4));
        
        $.ajax(ajaxObj);
    }
    else {
        // For Android, call native code to make the request.
        window.JSBridge.sendAjaxRequest(this.currentRequest_, _.bind(this.responseCallback_, this));
    }
};

/**
 * @private
 */
taz.AjaxRequestSender.prototype.selectNextRequest_ = function() {
    var MessageType = taz.AjaxRequest.MessageType;
    
    // Shortcuts to message queues.
    var gameEventQueue = this.queues_[MessageType.GAME_EVENT];
    var answerQueue = this.queues_[MessageType.ANSWER];
    var statusUpdateQueue = this.queues_[MessageType.STATUS_UPDATE];
    
    // If there are game events, pick the first one.
    if (gameEventQueue.length != 0) {
        return gameEventQueue[0];
    }
    
    // Otherwise take turns in selecting the status updates or answers.
    if ((this.previouslySelectedQueueType_ == MessageType.ANSWER || answerQueue.length == 0)
            && statusUpdateQueue.length != 0) {
        
        this.previouslySelectedQueueType_ = MessageType.STATUS_UPDATE;
        
        // Create a batch update of all the status updates.
        var statusUpdateBatchRequest = this.createStatusUpdateBatchRequest_(statusUpdateQueue);
        // Clear the queue and add only the batch.
        statusUpdateQueue.splice(0, statusUpdateQueue.length, statusUpdateBatchRequest);
        
        return statusUpdateQueue[0];
    }
    
    if (answerQueue.length != 0) {
        this.previouslySelectedQueueType_ = MessageType.ANSWER;
        return answerQueue[0];
    }
    
    // All queues are empty.
    return null;
};

/**
 * @private
 */
taz.AjaxRequestSender.prototype.createStatusUpdateBatchRequest_ = function(statusUpdates) {
    console.log("AjaxRequestSender.createStatusUpdateBatchRequest_: batch size: " + statusUpdates.length);
    
    var request = new taz.AjaxRequest();
    var lastRequest = statusUpdates[statusUpdates.length - 1];
    
    request.type = taz.AjaxRequest.Type.POST;
    request.path = lastRequest.path;
    request.url = lastRequest.url;
    request.messageType = taz.AjaxRequest.MessageType.STATUS_UPDATE;
    request.isBatchStatusUpdate = true;
    
    // Use the callbacks of the last status update. This is OK as long as the callbacks aren't expected to
    // be called for each request.
    request.successCallback = lastRequest.successCallback;
    request.errorCallback = lastRequest.errorCallback;
    
    var dataArray = [];
    
    for (var i = 0; i < statusUpdates.length; ++i) {
        var statusUpdate = statusUpdates[i];
        
        // There may already be batch requests in the statusUpdates array.
        if (statusUpdate.isBatchStatusUpdate) {
            
            // In that case merge it into the new one.
            for (var j = 0; j < statusUpdate.data.statusUpdates.length; ++j) {
                dataArray.push(statusUpdate.data.statusUpdates[j]);
            }
            
        } else {
            dataArray.push(statusUpdates[i].data);
        }
    }
    
    request.data = {statusUpdates : dataArray};
        
    return request;
};

/**
 * @private
 */
taz.AjaxRequestSender.prototype.responseCallback_ = function(responseData, responseStatusCode) {
    
    console.log("AjaxRequestSender.responseCallback_: message: "
            + this.currentRequest_.path
            + " status: " + responseStatusCode);
    
    if (responseStatusCode == taz.AjaxRequestSender.STATUS_CODE_PARSE_FAILED) {
        this.login_();
    }
    else if (responseStatusCode == 200) {
        this.handleSuccess_(responseData);
    }
    else {
        this.handleError_(responseData, responseStatusCode);
    }
};

/**
 * @private
 */
taz.AjaxRequestSender.prototype.ajaxResponseCallbackSuccess_ = function(data, textStatus, jqXHR) {

    //console.log("AjaxRequestSender.ajaxResponseCallbackSuccess_: " + JSON.stringify(data, null, 4));
    console.log("AjaxRequestSender.ajaxResponseCallback_: message: "
                + this.currentRequest_.path
                + " textStatus: " + textStatus
                + " statusCode: " + jqXHR.status);
    
    this.responseCallback_(data, jqXHR.status);
};

/**
 * @private
 */
taz.AjaxRequestSender.prototype.ajaxResponseCallbackError_ = function(jqXHR, textStatus, errorThrown) {
    
    //console.log("AjaxRequestSender.ajaxResponseCallbackError_: " + JSON.stringify(jqXHR, null, 4));
    console.log("AjaxRequestSender.ajaxResponseCallbackError_: message: "
                + this.currentRequest_.path
                + " textStatus: " + textStatus
                + " statusCode: " + jqXHR.status);
    
    // If we got a parser error it means that the server redirected us to the login
    // page and the response is HTML instead of the expected JSON. We need to log in.
    if (textStatus === 'parsererror') {
        this.responseCallback_(jqXHR.responseText, taz.AjaxRequestSender.STATUS_CODE_PARSE_FAILED);
    }
    else {
        this.responseCallback_(jqXHR.responseText, jqXHR.status);
    }
};

/**
 * @private
 */
taz.AjaxRequestSender.prototype.login_ = function() {
    console.log("AjaxRequestSender.login_");
    
    this.addLoginRequestToTheTopOfGameEventQueue_();
    this.sendNext_();  
};

/**
 * @private
 */
taz.AjaxRequestSender.prototype.addLoginRequestToTheTopOfGameEventQueue_ = function() {
    var loginRequest = taz.AjaxRequest.createLoginRequest(this.serverUrl);
    // Put login request to the top of game event queue so that it will be sent next.
    this.queues_[taz.AjaxRequest.MessageType.GAME_EVENT].splice(0, 0, loginRequest);
};

/**
 * @private
 */
taz.AjaxRequestSender.prototype.removeCurrentRequestFromQueue_ = function() {
    for (var queueId in this.queues_) {
        var queue = this.queues_[queueId];
        
        if (queue.length > 0 && queue[0] == this.currentRequest_) {
            queue.shift();
            
            // Answer queue changed. Persist the new queue.
            if (this.currentRequest_.messageType == taz.AjaxRequest.MessageType.ANSWER) {
                this.persistAnswers_();
            }
            
            return;
        }
    }
};

/**
 * @private
 */
taz.AjaxRequestSender.prototype.handleSuccess_ = function(responseData) {
    console.log("AjaxRequestSender.handleSuccess_");
    
    if (this.currentRequest_.successCallback) {
        this.currentRequest_.successCallback(responseData);
    }
    
    this.removeCurrentRequestFromQueue_();
    this.sendNext_(); 
};

/**
 * @private
 */
taz.AjaxRequestSender.prototype.handleError_ = function(responseData, responseStatusCode) {
    console.log("AjaxRequestSender.handleError_");
    
    var errorCallback = this.currentRequest_.errorCallback;
    
    if (errorCallback && !_.isFunction(errorCallback)) {
        errorCallback = errorCallback[responseStatusCode];
    }
    
    // If the error case is handled (has error callback) invoke the callback
    // and remove the request from queue.
    if (errorCallback) {
        errorCallback();
        this.removeCurrentRequestFromQueue_();
    }
    
    // Wait a while before continuing.
    _.delay(_.bind(this.sendNext_, this), taz.AjaxRequestSender.RETRY_TIMEOUT);
}

taz.AjaxRequestSender.prototype.getInfo = function() {
    var info = {
        GAME_EVENT : [],
        ANSWER : [],
        STATUS_UPDATE: []
    };
    
    for (var queueId in this.queues_) {
        var queue = this.queues_[queueId];
        
        for (var i = 0; i < queue.length; ++i) {
            var request = queue[i];
            var name = request.url != null ? request.url : request.path;
            var lastIdx = name.lastIndexOf('/');
            name = name.substr(lastIdx + 1);

            info[queueId].push({
                name : name,
                size : request.data ? JSON.stringify(request.data).length : 0,
                type : queueId
            });
        }
    }

    return {
        eventQueue : info.GAME_EVENT,
        answerQueue : info.ANSWER,
        statusUpdateQueue : info.STATUS_UPDATE
    };
};

taz.AjaxRequestSender.prototype.persistAnswers_ = function() {
    console.log("taz.AjaxRequestSender.persistAnswers_");
    
    if (!taz.isUsingRipple()) {
        window.JSBridge.saveJson("answers", {queue : this.queues_[taz.AjaxRequest.MessageType.ANSWER]}, 
                function() {}, 
                function() {});
    }
};

taz.AjaxRequestSender.prototype.loadPersistentData = function() {
    console.log("taz.AjaxRequestSender.loadPersistentData");
    
    if (!taz.isUsingRipple()) {
        var that = this;
        
        window.JSBridge.readJson("answers", function(json) {
            var answerQueue = that.queues_[taz.AjaxRequest.MessageType.ANSWER];
            
            // Add the persisted answers to the end of the queue.
            for (var i = 0; i < json.queue.length; ++i) {
                answerQueue.push(json.queue[i]);
            }
            
        }, function() {});
    }
};

taz.AjaxRequestSender.prototype.clearPersistentData = function() {
    console.log("taz.AjaxRequestSender.clearPersistentData");
    this.queues_ = {};
    
 // Initialize an empty queue for each message type.
    for (var messsageTypeId in taz.AjaxRequest.MessageType) {
        var messageType = taz.AjaxRequest.MessageType[messsageTypeId];
        this.queues_[messageType] = [];
    }
};


/**
 * @class Basic two dimensional vector.
 *
 * @param {(number|taz.Vector2d)} arg1
 * @param {number=} arg2
 */
taz.Vector2d = function(arg1, arg2) {
    if (arg1 == undefined && arg2 == undefined) {
        this.x = 0;
        this.y = 0;
    } else if (typeof(arg1) === 'object' && 'x' in arg1 && 'y' in arg1) {
        this.x = Number(arg1.x);
        this.y = Number(arg1.y);
    } else {
        this.x = Number(arg1);
        this.y = Number(arg2);
    }
};

/**
 * @type number
 */
taz.Vector2d.prototype.x = 0;

/**
 * @type number
 */
taz.Vector2d.prototype.y = 0;
 
taz.Vector2d.min = function(lhs, rhs) {
    return new taz.Vector2d(Math.min(lhs.x, rhs.x), Math.min(lhs.y, rhs.y));
};

taz.Vector2d.max = function(lhs, rhs) {
    return new taz.Vector2d(Math.max(lhs.x, rhs.x), Math.max(lhs.y, rhs.y));
};
 
taz.Vector2d.prototype.sub = function(other) {
    if (other instanceof taz.Vector2d) {
        return new taz.Vector2d(this.x - other.x, this.y - other.y);
    } else {
        return new taz.Vector2d(this.x - other, this.y - other);
    }
};

taz.Vector2d.prototype.add = function(other) {
    if (other instanceof taz.Vector2d) {
        return new taz.Vector2d(this.x + other.x, this.y + other.y);
    } else {
        return new taz.Vector2d(this.x + other, this.y + other);
    }
};

taz.Vector2d.prototype.mul = function(other) {
    if (other instanceof taz.Vector2d) {
        return new taz.Vector2d(this.x * other.x, this.y * other.y);
    } else {
        return new taz.Vector2d(this.x * other, this.y * other);
    }
};

taz.Vector2d.prototype.div = function(other) {
    if (other instanceof taz.Vector2d) {
        return new taz.Vector2d(this.x/other.x, this.y/other.y);
    } else {
        return new taz.Vector2d(this.x/other, this.y/other);
    }
};

taz.Vector2d.prototype.normalized = function() {
    var len = this.len();
    return new taz.Vector2d(this.x/len, this.y/len);
};

taz.Vector2d.prototype.len = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

taz.Vector2d.prototype.distanceTo = function(other) {
    var xDiff = this.x - other.x;
    var yDiff = this.y - other.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
};

taz.Vector2d.prototype.normalVector = function() {
    return new taz.Vector2d(-this.y, this.x);
};

taz.Vector2d.prototype.dot = function(other) {
    return this.x * other.x + this.y * other.y;
};

taz.Vector2d.prototype.toString = function() {
    return (this.x + ',' + this.y);
};



taz.MessagingOverlay = function(){};

taz.MessagingOverlay.prototype.template_ = null

taz.MessagingOverlay.prototype.visible_ = false;

taz.MessagingOverlay.prototype.teamName_ = null;

taz.MessagingOverlay.prototype.messages_ = null;

taz.MessagingOverlay.prototype.show = function(messages, teamName) {
	this.template_ = taz.getTemplate("messagingoverlay");
	
	this.teamName_ = teamName;
	this.initUi_(messages);
	
	this.visible_ = true;
};

taz.MessagingOverlay.prototype.hide = function() {
	this.visible_ = false;
	$("#messaging-view-container").remove();
};

taz.MessagingOverlay.prototype.updateMessages = function(messages) {
	this.initUi_(messages);
};

taz.MessagingOverlay.prototype.isVisible = function() {
	return this.visible_;
}

taz.MessagingOverlay.prototype.initUi_ = function(messages) {
	// Insert the overlay to body
	var context = {
		strings: taz.strings,
		messages: [], 
		messageInput: $("#message-text-area").val()
	}
	
	$("#messaging-view-container").remove();
	
	for(var i = 0; i < messages.length; ++i) {
		var senderString = "";
		
		if (messages[i].sender == 'GAME_MASTER') {
			senderString = taz.strings.game_master;
		}
		else if (messages[i].sender == 'TEAM') {
			senderString = this.teamName_;
		}
		
		var messageContext = {
			content: messages[i].content, 
			senderString: senderString
		}
		
		context.messages.push(messageContext);
	}
	
	$("body").append(this.template_(context)).trigger('create');
	
	// Add margin to message list based on header size
	var margin = $("#messaging-overlay-header").outerHeight();
	$("#messaging-overlay-content").css("margin-top", margin);
	
	var that = this;
	$("#close-overlay-button").click(function() {
		that.hide();
	});
	
	$("#send-message-button").click(function() {
		var message = $("#message-text-area").val();
		$("#message-text-area").val("");
		
		// update the message list immediately.
		that.messages_.push({
		    content : message,
		    sender : 'TEAM'
		});
		
		that.initUi_(that.messages_);
		
		taz.game.sendMessage(message, function(message) {
			taz.game.newMessagesAvailable();
		});
	});
	
	var documentHeight = $(document).height();
	var minHeight = Math.max(documentHeight, window.innerHeight);
	$("#messaging-view-container").css("min-height", minHeight + "px");
	
	var contentHeight = $("#messaging-overlay-content").outerHeight(true);
	
	// Scroll to bottom or top depending on height
	// 1. Scroll to bottom if content height is more than whole document height
	//	  (before this overlay)
	if (contentHeight >= documentHeight) {
		$("html, body").scrollTop($(document).height());
	}
	// 2. Scroll to bottom of content if content height is more than window height but less than 
	//    document height.
	else if (contentHeight >= window.innerHeight) {
		$("html, body").scrollTop(contentHeight - window.innerHeight);
	}
	
	// Define a not empty validator for the text area
	if($("#message-text-area").val() == "") {
		$('#send-message-button').addClass('ui-disabled');
	}
	
	taz.input.setInputValidator("#message-text-area", new taz.input.NotEmptyValidator, function(valid) {
		if (valid) {
			$('#send-message-button').removeClass('ui-disabled');
		}
		else {
			$('#send-message-button').addClass('ui-disabled');
		}
	});
	
	this.messages_ = messages;
};

/**
 * @class Modal dialog that is shown in the middle of the screen.
 */
taz.Dialog = function(options) {
    this.id_ = ++taz.Dialog.runningId_;

    this.opt_ = _.defaults(options, {
        headerText : null,
        headerCloseButton : true,
        button1Text : null,
        button1Cb : null,
        button1Theme : 'a',
        button2Text : null,
        button2Cb : null,
        button2Theme : 'a',
        button3Text : null,
        button3Cb : null,
        button3Theme : 'a',
        buttonsClose : true,
        checkboxText : null,
        content : null,
        hasHeader : true,
        headerTheme : 'b',
        contentTheme : 'c',
        maxWidth : 400
    });
};

taz.Dialog.runningId_ = 0;
taz.Dialog.openDialogs_ = [];
taz.Dialog.template = taz.getTemplate('dialog');
taz.Dialog.MARGIN_TOP = 15;
taz.Dialog.MARGIN_SIDE = 10;

taz.Dialog.prototype.id_ = null;
taz.Dialog.prototype.el_ = null;

taz.Dialog.closeAllDialogs = function()  {
    while (taz.Dialog.openDialogs_.length != 0) {
        taz.Dialog.openDialogs_[0].close();
    }

    taz.Dialog.openDialogs_ = [];
};  

taz.Dialog.prototype.setOptions = function(options, value) {
	if (options instanceof Object) {
		this.opt_ = _.defaults(options, this.opt_);
	}
	
	if (this.isOpen()) {
		this.show();
	}
};

taz.Dialog.prototype.show = function() {
    var opt = this.opt_;

    if (this.el_ != null) {
        // Already opened.
        this.close();
    }

    var html = taz.Dialog.template({
        id : this.id_,
        strings : taz.strings,
        headerTheme : opt.headerTheme,
        contentTheme : opt.contentTheme,
        headerText : opt.headerText ? opt.headerText : undefined,
        hasHeader : opt.hasHeader, 
        hasHeaderCloseButton : opt.headerCloseButton
    });

    this.el_ = $(html);
    var content = this.getContent_();

    if (opt.content) {
        content.html(opt.content);
    }
    
    if (opt.checkboxText) {
    	var checkboxes = $('<div></div');
    	var checkbox = this.createCheckbox_(opt.checkboxText);
    	checkboxes.append(checkbox);
    	content.append(checkboxes);
    }

    if (opt.button1Text) {
    	var buttons = $('<div></div>');
    	if (opt.button1Text) {
	        var button1 = this.createButton_(opt.button1Text,
	            opt.button1Theme,
	            opt.button1Cb);
        	button1.css("width", "95%");
        	buttons.append(button1);
	    }
	
	    if (opt.button2Text) {
	        var button2 = this.createButton_(opt.button2Text,
	            opt.button2Theme,
	            opt.button2Cb);
	        buttons.append("<br />");
        	button2.css("width", "95%");
	        buttons.append(button2);
	    }
	
	    if (opt.button3Text) {
	        var button3 = this.createButton_(opt.button3Text,
	            opt.button3Theme,
	            opt.button3Cb);
	        buttons.append("<br />");
        	button3.css("width", "95%");
	        buttons.append(button3);
	    }
	    content.append(buttons);
    }

    this.getCloseButton_().tazClick(_.bind(this.close, this));

    $('body').append(this.el_);
    this.el_.trigger('create');
    this.updatePositionAndSize_();

    taz.Dialog.openDialogs_.push(this);
};

taz.Dialog.prototype.getContent_ = function() {
    return this.el_.find('#dialog_content_' + this.id_);
};

taz.Dialog.prototype.getContentContainer_ = function() {
    return this.el_.find('#dialog_content_container_' + this.id_);
};

taz.Dialog.prototype.getHeader_ = function() {
    return this.el_.find('#dialog_header_' + this.id_);
};

taz.Dialog.prototype.getCloseButton_ = function() {
    return this.el_.find('#dialog_close_button_' + this.id_);
};

taz.Dialog.prototype.createButton_ = function(text, theme, callback) {
    var button = $('<a data-role="button" data-inline="true">' + text + '</a>');

    if (theme === 'positive') {
        button.addClass('positive-button');
    } else if (theme === 'negative') {
        button.addClass('negative-button');
    } else {
        button.attr('data-theme', theme);
    }

    button.tazClick(_.bind(function() {
        if (callback) {
            callback();
        }
        
        if (this.opt_.buttonsClose) {
            this.close();
        }
    }, this));

    return button;
};

taz.Dialog.prototype.createCheckbox_ = function(text) {
    var checkbox = $('<label><input type="checkbox" name="warningDialogCheckbox" id="warningDialogCheckbox">' + text +'</label>');
    		
    return checkbox;
};

taz.Dialog.prototype.updatePositionAndSize_ = function() {
    var opt = this.opt_;
    var content = this.getContent_();
    var header = this.getHeader_();
    var contentContainer = this.getContentContainer_();

    var scroll = $(window).scrollTop();
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    var width = content.outerWidth();
    var height = content.outerHeight() + header.outerHeight();
    var maxWidth = opt.maxWidth;
    
    if (maxWidth > winWidth - 2 * taz.Dialog.MARGIN_SIDE) {
        maxWidth = winWidth - 2 * taz.Dialog.MARGIN_SIDE;
    }

    // Calculate the top of the dialog so that the dialog is centered in the screen.
    var top = scroll + (winHeight - height) / 2;
    if (top < scroll + taz.Dialog.MARGIN_TOP) {
        top = scroll + taz.Dialog.MARGIN_TOP;
    }

    contentContainer.css({
        'max-width' : maxWidth,
        'padding-top' : top + 'px'
    });

    var pageHeight = $.mobile.activePage.outerHeight();    
    var backgroundHeight = Math.max(pageHeight, top + height, winHeight + scroll);
    this.el_.height(backgroundHeight);
};

taz.Dialog.prototype.isOpen = function() {
    return (this.el_ != null);
};

taz.Dialog.prototype.close = function() {
    if (this.el_ != null) {
        this.el_.remove();
        this.el_ = null;
    }

    var index = _.indexOf(taz.Dialog.openDialogs_, this);

    if (index != -1) {
        taz.Dialog.openDialogs_.splice(index, 1);
    }
};



/**
 * @class
 */
taz.GameModel = function() {
    this.cache_ = {};
};

/**
 * Creates the model. readyCallback is called after the model has been created. 
 * readyCallback is called with a boolean parameter that indicates whether a 
 * running game was found in the persistent storage or not.
 *
 * @param {function(boolean)} readyCallback
 */
taz.GameModel.prototype.create = function(readyCallback) {
    var that = this;
    
    var doCreate = _.bind(function() {
        // If persistence is disabled clear the persistent storage to make sure that no
        // running game is found.
        if (taz.settings.disablePersistence) {
            this.clear(); 
        }
        
        var game = this.load_(taz.GameModel.KEY.GAME);
        readyCallback(game != null);        
    }, this);
    
    if (taz.isDeviceAndroid()) {
        window.JSBridge.getApplicationDirectory(function(dirpath) {
            taz.GameModel.FILE_ROOT_DIR = dirpath;
            doCreate();
        });
    }
    else {
        doCreate();
    }
};

/**
 * @enum
 */
taz.GameModel.KEY = {
    SERVER_ID : 'SERVER_ID',
    SERVER_URL : 'SERVER_URL',
    GAME : 'GAME',
    TEAM_ID : 'TEAM_ID',
    TEAM_NAME : 'TEAM_NAME',
    TEAM_MESSAGE_THREAD_ID : 'TEAM_MESSAGE_THREAD_ID', 
    CURRENT_CHECK_POINT_ID : 'CURRENT_CHECK_POINT_ID', 
    CURRENT_EDGE_ID : 'CURRENT_EDGE_ID',
    CURRENT_TASK_ATTEMPTS : 'CURRENT_TASK_ATTEMPTS',
    LAST_STEP_VALID_CHECKPOINT_IDS : 'LAST_STEP_VALID_CHECKPOINT_IDS',
    BEGIN_SHOW_TASK_TIME : 'BEGIN_SHOW_TASK_TIME',
    BEGIN_SHOW_GUIDE_TIME : 'BEGIN_SHOW_GUIDE_TIME',
    STATE : 'STATE',
    SUB_STATE : 'SUB_STATE',
    STASHED_SUB_STATES: 'STASHED_SUB_STATES',
    STASHED_VIEW_ID: 'STASHED_VIEW_ID',
    POINTS : 'POINTS',
    POINTADJUSTMENT: 'POINT_ADJUSTMENT',
    RANKING : 'RANKING',
    CHECK_POINT_DATA : 'CHECK_POINT_DATA',
    TIMER_STATE : 'TIMER_STATE', 
    LANGUAGE : 'LANGUAGE',
    TRAVELED: 'TRAVELED',
    WARNING_DIALOG: 'WARNING_DIALOG',
    DEFAULT_SERVER: 'DEFAULT_SERVER',
    CURRENT_ON_DEMAND_TASK_ID : 'CURRENT_ON_DEMAND_TASK_ID',
    ON_DEMAND_TASK_DATA : 'ON_DEMAND_TASK_DATA',
    CUSTOM_MAP_BASE_PATH : 'CUSTOM_MAP_BASE_PATH',
    CUSTOM_MAP_LEVELS: 'CUSTOM_MAP_LEVELS',
    CUSTOM_MAP: 'CUSTOM_MAP'
};

taz.GameModel.FILE_ROOT_DIR = "";
taz.GameModel.MAP_DOWNLOAD_DIR = "custom_map";

/**
 * @private
 */
taz.GameModel.prototype.cache_ = null;

taz.GameModel.prototype.clear = function() {
    if (!taz.isUsingRipple()) {
        window.JSBridge.removeDataFiles();
    }

    this.cache = {};
    for (var key in taz.GameModel.KEY) {
    	if(key != taz.GameModel.KEY.WARNING_DIALOG && key != taz.GameModel.KEY.DEFAULT_SERVER) {
    		this.remove_(key);
    	}
    }
    
    // Delete custom map offline tiles
    if (!taz.isUsingRipple()) {
        var writer = new taz.FileWriter();
        writer.deleteDirectory(taz.GameModel.FILE_ROOT_DIR + taz.GameModel.MAP_DOWNLOAD_DIR, null, 
            function() { // Success
                console.log("Cleaned old offline tiles");
            }, 
            function() { // Error
                console.error("Error deleting offline tiles!");
            });
    }
};

taz.GameModel.prototype.persist_ = function(key, item) {
    this.cache_[key] = item;
    var str = JSON.stringify(item);
    window.localStorage.setItem(key, str);
};


taz.GameModel.prototype.load_ = function(key) {	
    if (key in this.cache_) {
        return this.cache_[key];
    }
	
    var str = window.localStorage.getItem(key);
	
    if (str) {
        this.cache_[key] = JSON.parse(str);
        return this.cache_[key];
    }
    return null;
};

taz.GameModel.prototype.remove_ = function(key) {
    window.localStorage.removeItem(key);

    if (key in this.cache_) {
        delete this.cache_[key];
    }
};

taz.GameModel.prototype.getServerUrl = function() {
    return this.load_(taz.GameModel.KEY.SERVER_URL);
};

taz.GameModel.prototype.setServer = function(url) {
    // The only identifier for game servers sent by the master server is 
    // the url. The URL needs to be converted to be able to use it in 
    // offline tile paths.
    var id = this.getSafeDirectoryName_(url);
    
    this.setServerId(id);
    this.setServerUrl(url);
};

taz.GameModel.prototype.setServerId = function(id) {
    this.persist_(taz.GameModel.KEY.SERVER_ID, id);
};

taz.GameModel.prototype.getServerId = function() {
    return this.load_(taz.GameModel.KEY.SERVER_ID);
};

taz.GameModel.prototype.setServerUrl = function(url) {
    this.persist_(taz.GameModel.KEY.SERVER_URL, url);
};

taz.GameModel.prototype.getWarningDialogShown = function() {
    return this.load_(taz.GameModel.KEY.WARNING_DIALOG);
};

taz.GameModel.prototype.setWarningDialogShown = function(shown) {
    this.persist_(taz.GameModel.KEY.WARNING_DIALOG, shown);
};

taz.GameModel.prototype.getDefaultServer = function() {
    return this.load_(taz.GameModel.KEY.DEFAULT_SERVER);
};

taz.GameModel.prototype.setDefaultServer = function(server) {
    this.persist_(taz.GameModel.KEY.DEFAULT_SERVER, server);
};

taz.GameModel.prototype.getState = function() {
    return this.load_(taz.GameModel.KEY.STATE);
};

taz.GameModel.prototype.setState = function(state) {
    this.persist_(taz.GameModel.KEY.STATE, state);
};

taz.GameModel.prototype.getDistance = function() {
    var dist = this.load_(taz.GameModel.KEY.TRAVELED);
    return dist != null ? new Number(dist) : 0;
};

taz.GameModel.prototype.setDistance = function(dist) {
    this.persist_(taz.GameModel.KEY.TRAVELED, dist);
};


taz.GameModel.prototype.getSubState = function() {
    return this.load_(taz.GameModel.KEY.SUB_STATE);
};

taz.GameModel.prototype.setSubState = function(state) {
    this.persist_(taz.GameModel.KEY.SUB_STATE, state);
};

taz.GameModel.prototype.stashSubState = function(mainState, subState) {
    var map = this.load_(taz.GameModel.KEY.STASHED_SUB_STATES) || {};
    map[mainState] = subState;
    this.persist_(taz.GameModel.KEY.STASHED_SUB_STATES, map);
};

taz.GameModel.prototype.popStashedSubState = function(mainState) {
    var substates = this.load_(taz.GameModel.KEY.STASHED_SUB_STATES) || {};
    
    var state = substates[mainState];
    if (state === undefined) {
        state = null;
    }
    
    this.stashSubState(mainState, null);
    return state;
};

taz.GameModel.prototype.stashActiveViewId = function(viewId) {
    this.persist_(taz.GameModel.KEY.STASHED_VIEW_ID, viewId);
};

taz.GameModel.prototype.popStashedActiveViewId = function() {
    var viewId = this.load_(taz.GameModel.KEY.STASHED_VIEW_ID);
    this.stashActiveViewId(null);
    
    return viewId;
};

taz.GameModel.prototype.getTimerState = function() {
    return this.load_(taz.GameModel.KEY.TIMER_STATE);
};

taz.GameModel.prototype.setTimerState = function(timerState) {
    this.persist_(taz.GameModel.KEY.TIMER_STATE, timerState);
};

taz.GameModel.prototype.getTeamId = function() {
    return this.load_(taz.GameModel.KEY.TEAM_ID);
};

taz.GameModel.prototype.setTeamId = function(teamId) {
    this.persist_(taz.GameModel.KEY.TEAM_ID, teamId);
};

taz.GameModel.prototype.getTeamName = function() {
    return this.load_(taz.GameModel.KEY.TEAM_NAME);
};

taz.GameModel.prototype.setTeamName = function(teamName) {
    this.persist_(taz.GameModel.KEY.TEAM_NAME, teamName);
};

taz.GameModel.prototype.getTeamMessageThreadId = function() {
    return this.load_(taz.GameModel.KEY.TEAM_MESSAGE_THREAD_ID);
};

taz.GameModel.prototype.setTeamMessageThreadId = function(messageThreadId) {
    this.persist_(taz.GameModel.KEY.TEAM_MESSAGE_THREAD_ID, messageThreadId);
};

taz.GameModel.prototype.getRankingString = function() {
    return this.load_(taz.GameModel.KEY.RANKING);
};

taz.GameModel.prototype.setRankingString = function(rankingString) {
    this.persist_(taz.GameModel.KEY.RANKING, rankingString);
};

taz.GameModel.prototype.getPoints = function() {
    var points = this.load_(taz.GameModel.KEY.POINTS);
    return points != null ? points : 0;
};

taz.GameModel.prototype.setPoints = function(points) {
    // Do not allow negative points to be set.
    if (points < 0) {
        points = 0;
    }
	
    this.persist_(taz.GameModel.KEY.POINTS, points);
};

taz.GameModel.prototype.getPointAdjustment = function() {
    var adjustment = this.load_(taz.GameModel.KEY.POINTADJUSTMENT);
    return adjustment != null ? adjustment : 0;
}

taz.GameModel.prototype.setPointAdjustment = function(adjustment) {
    this.persist_(taz.GameModel.KEY.POINTADJUSTMENT, adjustment);
}

taz.GameModel.prototype.getGameId = function() {
    var game = this.getGame();
    
    if (game) {
        return game.id;
    }
    
    return null;
};

taz.GameModel.prototype.getGameDuration = function() {
    var game = this.getGame();
    
    if (game) {
        return game.duration;
    }
    
    return null;
};

taz.GameModel.prototype.getZone = function() {
    var game = this.getGame();
    
    if (game) {
        return new taz.GeoPolygon(game.template.zone.corners);
    }
    
    return null;
};

taz.GameModel.prototype.getStartArea = function() {
    var game = this.getGame();
    
    if (game) {
        return game.template.startArea;
    }
    
    return null;
};

taz.GameModel.prototype.getFinishArea = function() {
    var game = this.getGame();
    
    if (game && game.template.finishArea) {
        return new taz.GeoPolygon(game.template.finishArea.corners);
    }
    
    return null;
};

taz.GameModel.prototype.getStartArea = function() {
    var game = this.getGame();
    
    if (game && game.template.startArea) {
        return new taz.GeoPolygon(game.template.startArea.corners);
    }
    
    return null;
};

taz.GameModel.prototype.getForbiddenZones = function() {
    // Check if this method has already been called and return the cached array.
    if (this.forbiddenZones_) {
        return this.forbiddenZones_;
    }
    
    var game = this.getGame();
    var forbiddenZones = [];
    
    for (var i = 0; i < game.template.forbiddenZones.length; ++i) {
        forbiddenZones.push(new taz.GeoPolygon(game.template.forbiddenZones[i].corners))
    }
    
    this.forbiddenZones_ = forbiddenZones;
    return forbiddenZones;
};

taz.GameModel.prototype.getCurrentCheckPoint = function() {
    var currentCheckPointId = this.load_(taz.GameModel.KEY.CURRENT_CHECK_POINT_ID);
    
    if (currentCheckPointId != null) {
        return this.getCheckPointById(currentCheckPointId);
    }
    
    return null;
};

/**
 * Sets the current checkpoint and also the current edge if the new checkpoint and the 
 * previous checkpoint have an edge between them
 */
taz.GameModel.prototype.setCurrentCheckPoint = function(currentCheckPoint) {
    var oldCp = this.getCurrentCheckPoint();
    var game = this.getGame();

    if (oldCp != null && oldCp.id != currentCheckPoint.id) {   
        this.setEdgeBetweenCheckPointsAsCurrentEdge_(oldCp, currentCheckPoint);        
    }

    // Old Check point is null only in the case where the game has just started and we are
    // setting the first check point. In this case check if the game has starting edges.
    if (oldCp == null && game.template.startingEdges.length != 0) {
        this.setStartEdgeAsCurrentEdge_(game.template, currentCheckPoint); 
    }

    this.persist_(taz.GameModel.KEY.CURRENT_CHECK_POINT_ID, currentCheckPoint.id);
};

/**
 * @private
 * Finds if the given checkpoints have an edge between them and sets it to current edge
 * If there was no edge between them, a null edge is set as currentEdge
 */
taz.GameModel.prototype.setEdgeBetweenCheckPointsAsCurrentEdge_ = function(startCp, endCp) {
    // check if there is an edge between the cp's
    for (var i in startCp.startingEdges) {
        for (var j in endCp.endingEdges) {
            if (startCp.startingEdges[i].id == endCp.endingEdges[j].id) {
                this.setCurrentEdgeId_(endCp.endingEdges[j].id);
                return;
            }
        }
    }
    // if no matching edge was found, remove the current edge
    this.removeCurrentEdgeId_();
};

/**
 * @private
 */
taz.GameModel.prototype.setStartEdgeAsCurrentEdge_ = function(template, endCp) {
    // check if there is an edge between the game and the cp.
    for (var i in template.startingEdges) {
        for (var j in endCp.endingEdges) {
            if (template.startingEdges[i].id == endCp.endingEdges[j].id) {
                this.setCurrentEdgeId_(endCp.endingEdges[j].id);
                return;
            }
        }
    }
    // if no matching edge was found, remove the current edge
    this.removeCurrentEdgeId_();
};

taz.GameModel.prototype.getCurrentEdge = function() {
    var edgeId = this.load_(taz.GameModel.KEY.CURRENT_EDGE_ID);

    if (edgeId != null) {
        var cp = this.getCurrentCheckPoint();
        for (var i in cp.endingEdges) {
            if (cp.endingEdges[i].id == edgeId) {
                return cp.endingEdges[i];
            }
        }
    }

    return null;
};

/**
 * @private
 */
taz.GameModel.prototype.setCurrentEdgeId_ = function(currentEdgeId) {    
    this.persist_(taz.GameModel.KEY.CURRENT_EDGE_ID, currentEdgeId);
};

/**
 * @private
 */
taz.GameModel.prototype.removeCurrentEdgeId_ = function() {
    this.remove_(taz.GameModel.KEY.CURRENT_EDGE_ID);
};

taz.GameModel.prototype.getCurrentTaskAttempts = function() {
    var attempts = this.load_(taz.GameModel.KEY.CURRENT_TASK_ATTEMPTS);
    return attempts;
};

taz.GameModel.prototype.setCurrentTaskAttempts = function(currentTaskAttempts) {
    this.persist_(taz.GameModel.KEY.CURRENT_TASK_ATTEMPTS, currentTaskAttempts);
};

taz.GameModel.prototype.getCurrentTaskAnswerId = function() {
    var currentTaskId = this.load_(taz.GameModel.KEY.CURRENT_TASK_ANSWER_ID);
    return currentTaskId;
};

taz.GameModel.prototype.setCurrentTaskAnswerId = function(currentTaskId) {
    this.persist_(taz.GameModel.KEY.CURRENT_TASK_ANSWER_ID, currentTaskId);
};

taz.GameModel.prototype.setBeginShowTaskTime = function(beginShowTaskTime) {
    this.persist_(taz.GameModel.KEY.BEGIN_SHOW_TASK_TIME, beginShowTaskTime);
};

taz.GameModel.prototype.getBeginShowTaskTime = function() {
    var beginShowTaskTime = this.load_(taz.GameModel.KEY.BEGIN_SHOW_TASK_TIME);
    return beginShowTaskTime;
};

taz.GameModel.prototype.setBeginShowGuideTime = function(beginShowGuideTime) {
    this.persist_(taz.GameModel.KEY.BEGIN_SHOW_GUIDE_TIME, beginShowGuideTime)
};

taz.GameModel.prototype.getBeginShowGuideTime = function() {
    var beginShowGuideTime = this.load_(taz.GameModel.KEY.BEGIN_SHOW_GUIDE_TIME);
    return beginShowGuideTime;
};

taz.GameModel.prototype.setLanguage = function(language) {
	this.persist_(taz.GameModel.KEY.LANGUAGE, language);
};

taz.GameModel.prototype.getLanguage = function() {
	var language = this.load_(taz.GameModel.KEY.LANGUAGE);
	return language;
};

taz.GameModel.prototype.getGame = function() {
    return this.load_(taz.GameModel.KEY.GAME);
};

taz.GameModel.prototype.setGame = function(game) {	
    this.persist_(taz.GameModel.KEY.GAME, game);
};

taz.GameModel.prototype.setCustomMap = function(customMap) {
    this.persist_(taz.GameModel.KEY.CUSTOM_MAP, customMap);
};

taz.GameModel.prototype.getCustomMap = function() {
    return this.load_(taz.GameModel.KEY.CUSTOM_MAP);
};

taz.GameModel.prototype.setCustomMapBasePath = function(path) {
    this.persist_(taz.GameModel.KEY.CUSTOM_MAP_BASE_PATH, path);
};

taz.GameModel.prototype.getCustomMapBasePath = function() {
    return this.load_(taz.GameModel.KEY.CUSTOM_MAP_BASE_PATH);
};

taz.GameModel.prototype.setCustomMapOfflineLevels = function(levels) {
    this.persist_(taz.GameModel.KEY.CUSTOM_MAP_LEVELS, levels);
};

taz.GameModel.prototype.getCustomMapOfflineLevels = function() {
    return this.load_(taz.GameModel.KEY.CUSTOM_MAP_LEVELS);
};

/**
 * 
 * @param callback Called after the game has been created (with no parameters).
 * @param mapDownloadProgressCb Called after every successful tile fetch. 
 *                              Parameters: downloaded (tiles downloaded this far), 
 *                                          total (total number of tiles to download).
 */
taz.GameModel.prototype.createGame = function(game, backend, callback, mapDownloadProgressCb) {
    var checkPointData = {};
    var onDemandTaskData = {};

    var isNoGpsGame = game.template.noGpsGame;
    for (var i = 0; i < game.template.checkPoints.length; ++i) {
        var id = game.template.checkPoints[i].id;
        var taskId = null;
        var checkpoint = game.template.checkPoints[i];
        
        // Sanity check to prevent errors
        if (isNoGpsGame && checkpoint.useGps) {
            checkpoint.useGps = false;
        }
        
        if (checkpoint.task) {
            taskId = checkpoint.task.id;
        }
        
        checkPointData[id] = {
            visited : false,
            points : 0,
            answer : null,
            taskId : taskId
        };
    }

    for (var i = 0; i < game.template.onDemandTasks.length; ++i) {
        var id = game.template.onDemandTasks[i].id;

        onDemandTaskData[id] = {
            done : false,
            points : 0,
            answer : null,
            order  : i
        };
    }

    var that = this;
    // Write base64 strings to file and replace base64 data URIs with file URIs to save
    // memory and local storage.
    this.writeDataURIsToFile_(game, function(gameWithReplacedURIs) {
        that.persist_(taz.GameModel.KEY.CHECK_POINT_DATA, checkPointData);
        that.persist_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA, onDemandTaskData);
        that.setGame(gameWithReplacedURIs);
        
        if (game.template.customMapId) {
            backend.getCustomMap(game.template.customMapId, function(customMap) {
                that.setCustomMap(customMap);
                
                if (game.template.offline && game.template.enableMapView) {
                    console.log("Game has custom map + offline game + map view enabled -> download one zoom level for offline use.");
                    that.downloadCustomMap_(game, backend, callback, mapDownloadProgressCb);
                }
                else {
                    callback();
                }
            });
        }
        else {
            callback();
        }
    });
    
    // Init the first on-demand task, if there are any.
    this.setNextOnDemandTask();
};

/** 
 * @private
 */
taz.GameModel.prototype.writeDataURIsToFile_ = function(game, callback) {

    // Skip if using ripple.
    if (taz.isUsingRipple()) {
        callback(game);
        return;
    }
    
    var base64Objects = [];
    
    // Recursively find all base64 strings.
    writeDataURIsToFile(game);

    function writeDataURIsToFile(obj) {
        _.each(obj, function(value, key) {
            if (isDataURI(value) && obj.id) {
                base64Objects.push({key : key, obj : obj});
            }

            if (_.isObject(value) || _.isArray(value)) {
                writeDataURIsToFile(value);
            }
        });
    }

    function isDataURI(value) {
        return _.isString(value)
                && value.length > 5
                && value.indexOf('data:') == 0
                && value.indexOf(';base64,') != -1;
    }
    
    
    // If there isn't any objects, go straight to callback
    if (base64Objects.length == 0) {
        callback(game);
    }
    
    var replacedObjectCount = 0;
    // Replace all base64 strings with file paths.
    _.each(base64Objects, function(base64Obj, idx) {
        var obj = base64Obj.obj;
        var key = base64Obj.key;
        var base64Data = obj[key];
        var id = obj.id;
        
        window.JSBridge && window.JSBridge.writeBase64ToFile(id.toString(), base64Data, function(filePath) {
            obj[key] = filePath;
            
            ++replacedObjectCount;
            // When all strings have been replaced, call the callback function.
            if (replacedObjectCount == base64Objects.length) {
                callback(game);
            }
        });
    });
};

/**
 * Pre-downloads a custom map for offline use. Downloads files to "/root/ActionTrack/{serverId}/{mapId}/{z}/{x}/{y}.png"
 * Note: Only one zoom level (the native/unzoomed one) is currently downloaded.
 * @private
 */
taz.GameModel.prototype.downloadCustomMap_ = function(game, backend, callback, progressCb) {
        var that = this;
        var serverId = this.getServerId();
        var customMap = this.getCustomMap();

        // Determine the zoom level to download and tile index ranges to fetch.
        var offsetToNative = -1;
        var offsetMultiplier = Math.pow(2, offsetToNative);
        var zoomLevel = customMap.nativeZoomLevel + offsetToNative;
        var xRange = [Math.floor(customMap.minTileX * offsetMultiplier), Math.floor(customMap.maxTileX * offsetMultiplier)];
        var yRange = [Math.floor(customMap.minTileY * offsetMultiplier), Math.floor(customMap.maxTileY * offsetMultiplier)];
        
        var fileWriter = new taz.FileWriter();
        
        // Tiles downloaded vs. total tiles to download.
        var downloaded = 0;
        var total = (xRange[1]-xRange[0]+1)*(yRange[1]-yRange[0]+1);
        
        progressCb(downloaded, total); // Initial progress call: Downloading about to start.
        
        // Only 1 offline level supported.
        that.setCustomMapOfflineLevels([zoomLevel]);
        
        var targetBase = taz.GameModel.FILE_ROOT_DIR + taz.GameModel.MAP_DOWNLOAD_DIR;
        
        // Function to fetch and save one file. Tiles downloaded in a deferred loop below.
        var fetchTile = function(x, y, fileSys, cb) {
            var url = backend.getCustomMapTileUrl(customMap.id, zoomLevel, x, y);
            var target = targetBase + "/" + serverId + "/" + customMap.id + "/" + zoomLevel + "/" + x + "/";
            fileWriter.createDirectory(target, fileSys, function(entry) {
                var path = entry.fullPath;
                
                // This must be done for Android to get a working url from the path.
                if (device.platform === "Android" && path.indexOf("file://") === 0) {
                    path = path.substring(7);
                }
                
                // Set the custom map base path as the parent of this directory (is the zoom level directory)
                var parentSlashIndex = path.lastIndexOf('/');
                if (!that.getCustomMapBasePath()) {
                    that.setCustomMapBasePath(path.slice(0, parentSlashIndex));
                }
                
                path += "/" + y + ".png";
                
                // Calls the callback with next tile indices.
                var getNext = function() {
                    downloaded++;
                    progressCb(downloaded, total);
                    
                    ++y;
                    if (y > yRange[1]) {
                        y = yRange[0];
                        ++x;
                    }
                    
                    cb(x, y, x == xRange[1] + 1);
                };

                // Calls the ready callback with the same tile indices.
                // Call is delayed by 3000ms to throttle retries.
                var getSame = function() {
                    _.delay(function() {
                        cb(x, y, false); // Request same tile again after 3s.
                    }, 3000);                    
                };
                
                // Check if file already exists
                entry.getFile(y + '.png', {create: false}, 
                    getNext, // Success -> File already exists 
                    function() { // Error -> Needs downloading
                        var fileTransfer = new FileTransfer();
                        fileTransfer.download(
                            url,
                            path,
                            function(entry) {
                                console.log("Downloaded tile " + downloaded + "/" + total);
                                getNext();
                            },
                            function(error) {
                                console.log("Tile download error, try again in 3s");
                                getSame();
                            }
                        );
                    }
                );                                    
            }, function(error) {
                console.log("FileSys error: Could not get or create directory");
                getSame();
            });
        };
        
        // Request the file system with PhoneGap to create files and directories.
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
            console.log("GOT FILE SYSTEM, start downloading tiles.");
            
            // Download tiles in a deferred loop for a more controlled sequential downloading. 
            // Prevents sending all download requests at the same time.
            fetchTile(xRange[0], yRange[0], fs, function(nx, ny, last) {
                if (last) {
                    console.log("Downloading tiles complete!");
                    callback();
                }
                else {
                    fetchTile(nx, ny, fs, arguments.callee);
                }
            });
        });            
};

taz.GameModel.prototype.getCheckPoints = function() {
    var game = this.getGame();
    
    if (game == null) {
        return null;
    }
    
    return game.template.checkPoints;
};

taz.GameModel.prototype.isHideRanking = function() {
    var game = this.getGame();
    
    if (game == null) {
        return null;
    }
    
    return game.template.hideRanking;
};

taz.GameModel.prototype.isHideRankingList = function() {
    var game = this.getGame();
    
    if (game == null) {
        return null;
    }
    
    return game.template.hideRankingList;
};

taz.GameModel.prototype.isHideScores = function() {
    var game = this.getGame();
    
    if (game == null) {
        return null;
    }
    
    return game.template.hideScores;
};

taz.GameModel.prototype.isHideDistance = function() {
    var game = this.getGame();
    
    if (game == null) {
        return null;
    }
    
    return game.template.hideDistance;
};

taz.GameModel.prototype.getCheckPointById = function(id) {
    var checkPoints = this.getCheckPoints();
    if (checkPoints == null) {
        return null;
    }
	
    for (var i = 0; i < checkPoints.length; ++i) {
        if (checkPoints[i].id == id) {
            return checkPoints[i];
        }
    }
    return null;
};

taz.GameModel.prototype.getTaskElementOfCurrentTaskById = function(taskElementId) {
    var currentCheckPoint = this.getCurrentCheckPoint();
    
    if (currentCheckPoint && currentCheckPoint.task) {
        for (var i = 0; i < currentCheckPoint.task.elements.length; ++i) {
            var taskElement = currentCheckPoint.task.elements[i];

            if (taskElement.id == taskElementId) {
                return taskElement;
            }
        }
    }
    return null;
};

taz.GameModel.prototype.markCheckPointsAsVisited = function(idList) {
    var checkPointData = this.load_(taz.GameModel.KEY.CHECK_POINT_DATA);
    
    for (var i = 0; i < idList.length; ++i) {
        var id = idList[i];

        if (id in checkPointData) {
            checkPointData[id].visited = true;
        }
    }

    this.persist_(taz.GameModel.KEY.CHECK_POINT_DATA, checkPointData);
};

taz.GameModel.prototype.hasCheckPointBeenVisited = function(checkPoint) {
    var checkPointData = this.load_(taz.GameModel.KEY.CHECK_POINT_DATA);
    
    if (checkPointData == null || !(checkPoint.id in checkPointData)) {
        return false;
    }
    
    return checkPointData[checkPoint.id].visited;
};

taz.GameModel.prototype.setPointsGainedFromCurrentCheckPoint = function(points) {
    var checkPointId = this.load_(taz.GameModel.KEY.CURRENT_CHECK_POINT_ID);
    var checkPointData = this.load_(taz.GameModel.KEY.CHECK_POINT_DATA);
    
    if (checkPointId != null) {
        checkPointData[checkPointId].points = points;
        this.persist_(taz.GameModel.KEY.CHECK_POINT_DATA, checkPointData);
    }
};

taz.GameModel.prototype.isCurrentTaskAnswerTask = function() {
    var task = this.getCurrentCheckPoint().task;
    var elements = task.elements;

    for(var i = 0; i < elements.length; ++i) {
        if(elements[i].type.indexOf("ANSWER") != -1) {
            return true;
        }
    }
    return false;
};

taz.GameModel.prototype.setAnswerToCurrentCheckPointTask = function(answer) {
    var checkPointId = this.load_(taz.GameModel.KEY.CURRENT_CHECK_POINT_ID);
    var checkPointData = this.load_(taz.GameModel.KEY.CHECK_POINT_DATA);

    // Don't persist images in offline game.
    if (this.getGame() != null && this.getGame().template.offline) {
	    var that = this;
	    var elementAnswers = answer.elementAnswers;
	    answer.elementAnswers = [];
	    _.each(elementAnswers, function(elAnswer) {
	        var element = that.getTaskElementOfCurrentTaskById(elAnswer.taskElementId);
	        element.type !== 'PHOTO_ANSWER' && answer.elementAnswers.push(elAnswer);
	    });
    }
    
    if (checkPointId != null) {
        checkPointData[checkPointId].answer = answer;
        this.persist_(taz.GameModel.KEY.CHECK_POINT_DATA, checkPointData);
    }
};

taz.GameModel.prototype.getAnswerToCurrentCheckPointTask = function() {
    var checkPointId = this.load_(taz.GameModel.KEY.CURRENT_CHECK_POINT_ID);
    var checkPointData = this.load_(taz.GameModel.KEY.CHECK_POINT_DATA);
    
    if (checkPointId != null) {
        var answerData = checkPointData[checkPointId].answer;
        return answerData;
    }
    
    return null;
};

taz.GameModel.prototype.getAnswersToTasks = function(onlyUnsent) {
    onlyUnsent = onlyUnsent || false;
    var answers = [];
    var checkPointData = this.load_(taz.GameModel.KEY.CHECK_POINT_DATA);
    var onDemandTaskData = this.load_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA) || {};
    
    for(var key in checkPointData) {
        // Leave sent answers out if the flag is set.
        var answer = onlyUnsent && checkPointData[key].answerSent ? null : checkPointData[key].answer;
        
        if (answer != null) {
            answer.points = checkPointData[checkPointId].points;
        }
        
        answer && answers.push(answer);
    }
    
    for(var key in onDemandTaskData) {
        var answer = onlyUnsent && onDemandTaskData[key].answerSent ? null : onDemandTaskData[key].answer;
        
        if (answer != null) {
            answer.points = onDemandTaskData[key].points;
        }        
        
        answer && answers.push(answer);
    }
    
    return answers;
};

taz.GameModel.prototype.setAnswersSent = function(answers) {
    var checkPointData = this.load_(taz.GameModel.KEY.CHECK_POINT_DATA);
    var taskData = this.load_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA);
    
    for(var i in answers) {
        var cpId = answers[i].checkPointTemplateId;
        var taskId = answers[i].taskId;
        var onDemand = answers[i].answerType === 'ON_DEMAND_ANSWER';
        
        cpId && (checkPointData[cpId].answerSent = true);
        taskId && onDemand && (taskData[taskId].answerSent = true);
    }

   this.persist_(taz.GameModel.KEY.CHECK_POINT_DATA, checkPointData);
   this.persist_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA, taskData);
};

taz.GameModel.prototype.clearAnswerPhotoFromLocalStorage_ = function(answer) {
    var checkPointData = this.load_(taz.GameModel.KEY.CHECK_POINT_DATA);
    var taskData = this.load_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA);
    var answerData = null;
    
    if (answer.taskId && answer.answerType === 'ON_DEMAND_ANSWER') {
        answerData = taskData[answer.taskId].answer;
    } else if (answer.checkPointTemplateId) {
        answerData = checkPointData[answer.checkPointTemplateId].answer;
    }
        
    if (answerData) {
        _.each(answerData.elementAnswers, function(elAnswer) {
            if (elAnswer.answer.rawData && elAnswer.answer.rawData.length > 10 * 1024) {
               elAnswer.answer.rawData = null;
            }
        });
    }
    
    this.persist_(taz.GameModel.KEY.CHECK_POINT_DATA, checkPointData);
    this.persist_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA, taskData);
};

taz.GameModel.prototype.getPointsGainedFromCurrentCheckPoint = function() {
    var checkPointId = this.load_(taz.GameModel.KEY.CURRENT_CHECK_POINT_ID);
    var checkPointData = this.load_(taz.GameModel.KEY.CHECK_POINT_DATA);
    
    if (checkPointId != null) {
        return checkPointData[checkPointId].points;
    }
    
    return null;
};

taz.GameModel.prototype.getGraph = function() {
	var game = this.getGame();
    this.graph_ = new taz.Graph(game.template.checkPoints);

    return this.graph_;
};

taz.GameModel.prototype.setNextOnDemandTask = function() {
    var taskId = this.getNextOnDemandTask_();
    this.persist_(taz.GameModel.KEY.CURRENT_ON_DEMAND_TASK_ID, taskId);
    
    console.log("Next on demand task: " + taskId);
    
    return taskId;
};

taz.GameModel.prototype.getCurrentOnDemandTask = function() {
    var id = this.load_(taz.GameModel.KEY.CURRENT_ON_DEMAND_TASK_ID) || null;
    var game = this.getGame();
    var tasks = game.template.onDemandTasks;
    return _.find(tasks, function(task) {
        return task.id === id;
    }) || null;
};

taz.GameModel.prototype.getNextOnDemandTask_ = function() {
    var game = this.getGame();
    var tasks = game.template.onDemandTasks;
    var taskData = this.load_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA);
    var latestDoneIndex = -1;
    
    for(var i in taskData) {
        if (taskData[i].done && taskData[i].order > latestDoneIndex) {
            latestDoneIndex = taskData[i].order;
        }
    }
    
    for(var i in taskData) {
        var done = taskData[i].done;
        
        if (!done && latestDoneIndex === taskData[i].order - 1) {
            var task = _.find(tasks, function(task) {
                return task.id === Number(i);
            });
            
            return task ? task.id : null;
        }
    }
    
    return null;    
};

taz.GameModel.prototype.getTaskElementOfCurrentOnDemandTaskById = function(taskElementId) {
    var task = this.getCurrentOnDemandTask();

    if (task != null) {
        for (var i = 0; i < task.elements.length; ++i) {
            var taskElement = task.elements[i];

            if (taskElement.id == taskElementId) {
                return taskElement;
            }
        }
    }
    return null;
};

taz.GameModel.prototype.setAnswerToCurrentOnDemandTask = function(answer) {
    var taskId = this.load_(taz.GameModel.KEY.CURRENT_ON_DEMAND_TASK_ID);
    var taskData = this.load_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA);

    // Don't persist images in offline game.
    if (this.getGame() != null && this.getGame().template.offline) {
      var that = this;
      var elementAnswers = answer.elementAnswers;
      answer.elementAnswers = [];
      _.each(elementAnswers, function(elAnswer) {
          var element = that.getTaskElementOfCurrentOnDemandTaskById(elAnswer.taskElementId);
          element.type !== 'PHOTO_ANSWER' && answer.elementAnswers.push(elAnswer);
      });
    }

    if (taskId != null) {
        taskData[taskId].answer = answer;
        this.persist_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA, taskData);
    }
};

taz.GameModel.prototype.getAnswerToCurrentOnDemandTask = function() {
    var taskId = this.load_(taz.GameModel.KEY.CURRENT_ON_DEMAND_TASK_ID);
    var taskData = this.load_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA);

    if (taskId != null) {
        var answerData = taskData[taskId].answer;
        return answerData;
    }

    return null;
};

taz.GameModel.prototype.setPointsGainedFromCurrentOnDemandTask = function(points) {
    var taskId = this.load_(taz.GameModel.KEY.CURRENT_ON_DEMAND_TASK_ID);
    var taskData = this.load_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA);

    if (taskId != null) {
        taskData[taskId].points = points;
        this.persist_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA, taskData);
    }
};

taz.GameModel.prototype.getPointsGainedFromCurrentOnDemandTask = function() {
    var taskId = this.load_(taz.GameModel.KEY.CURRENT_ON_DEMAND_TASK_ID);
    var taskData = this.load_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA);

    if (taskId != null) {
        return taskData[taskId].points;
    }

    return null;
};

taz.GameModel.prototype.isCurrentOnDemandTaskAnswerTask = function() {
    var task = this.getCurrentOnDemandTask();
    var elements = task.elements;

    for(var i = 0; i < elements.length; ++i) {
        if(elements[i].type.indexOf("ANSWER") != -1) {
            return true;
        }
    }
    return false;
};

taz.GameModel.prototype.markOnDemandTaskAsDone = function() {
    var taskId = this.load_(taz.GameModel.KEY.CURRENT_ON_DEMAND_TASK_ID);
    var taskData = this.load_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA);

    if (taskId != null) {
        taskData[taskId].done = true;
        this.persist_(taz.GameModel.KEY.ON_DEMAND_TASK_DATA, taskData);
        
        this.setNextOnDemandTask();
    }
};

taz.GameModel.prototype.setPreviousValidCheckpointIds = function(ids) {
    this.persist_(taz.GameModel.KEY.LAST_STEP_VALID_CHECKPOINT_IDS, ids);
};

/**
 * Gets the checkpoints that were assigned as valid in the latest map view -based selection.
 * The returned checkpoints are also the only ones to which the current target checkpoint can be 
 * changed to. The return value is always null if the team is not between two graphs. 
 */
taz.GameModel.prototype.getPreviousValidCheckpointIds = function() {
    return this.load_(taz.GameModel.KEY.LAST_STEP_VALID_CHECKPOINT_IDS) || null;
};

/**
 * Returns a version of an url that is safe to use as a directory name.
 * @private
 */
taz.GameModel.prototype.getSafeDirectoryName_ = function(url) {
    // Simple version: Just allow all alphanumeric characters, dashes and underscores.
    // window.encodeURIComponent also seems to work for Android filesystem but not as part of 
    // an URL in web view.
    return url.replace(/[^A-Za-z-_0-9]/g, "");
};

(function() {
    
    // Ripple emulator doesn't have cordova.
    if (taz.isUsingRipple()) {
        return;
    }
    
    window.JSBridge = {};
    
    window.JSBridge.getCurrentPosition = function(callback) {
        cordova.exec(callback, function() {}, "JSBridge", "getCurrentPosition", []);
    };

    window.JSBridge.stopPositionUpdates = function(callback) {
        cordova.exec(callback, function() {}, "JSBridge", "stopPositionUpdates", []);
    };    
    
    window.JSBridge.startPositionUpdates = function(callback) {
        cordova.exec(callback, function() {}, "JSBridge", "startPositionUpdates", []);
    };
    
    window.JSBridge.log = function(text) {
        cordova.exec(function() {}, function() {}, "JSBridge", "log", [text]);
    };
   
    window.JSBridge.getPhoneGapMediaPath = function(path, callback) {
        cordova.exec(callback, function() {}, "JSBridge", "getPhoneGapMediaPath", [path]);
    };
    
    window.JSBridge.removeDataFiles = function() {
        cordova.exec(function() {}, function() {}, "JSBridge", "removeDataFiles", []);
    };
    
    window.JSBridge.writeBase64ToFile = function(id, value, callback) {
        cordova.exec(callback, function() {}, "JSBridge", "writeBase64ToFile", [id, value]);
    };
    
    window.JSBridge.vibrate = function(millis) {
        cordova.exec(function() {}, function() {}, "JSBridge", "vibrate", [millis]);
    };
    
    window.JSBridge.readJson = function(name, okCb, errorCb) {
        cordova.exec(okCb, errorCb, "JSBridge", "readJson", [name]);
    };
    
    window.JSBridge.saveJson = function(name, data, okCb, errorCb) {
        cordova.exec(okCb, errorCb, "JSBridge", "saveJson", [name, data]);
    };
    
    window.JSBridge.sendAjaxRequest = function(data, okCb) {
        
        var callback = function(args) {
            okCb(args[0], args[1]);
        };
        
        cordova.exec(callback, function() {}, "JSBridge", "sendAjaxRequest", [data]);
    };
    
    window.JSBridge.getDisplayRotation = function(okCb) {
    	cordova.exec(okCb, function() {}, "JSBridge", "getDisplayRotation", []);
    };
    
    window.JSBridge.checkMediaStorageCapability = function(okCb, errorCb) {
        cordova.exec(okCb, errorCb, "JSBridge", "checkMediaStorageCapability", []);
    };    
    
    window.JSBridge.getApplicationDirectory = function(callback) {
        cordova.exec(callback, null, "JSBridge", "getApplicationDirectory", []);
    };
    
    function replaceConsoleLog() {
        console.log("replacing console.log with window.JSBridge.log");
        console.log = function(text) {
            window.JSBridge.log("<js> " + text);
        };
    }
    
    if (typeof navigator.device == "undefined"){
        document.addEventListener("deviceready", replaceConsoleLog, false);
    } else {
        replaceConsoleLog();
    }
    
})();


/**
 * @class Magnetic heading.
 */
taz.Heading = function(heading) {
    this.heading = taz.Heading.fixAngle_(heading);
};

/**
 * Fixes an angle to interval [0, 360]
 * 
 * @private
 */
taz.Heading.fixAngle_ = function(heading) {
	heading = heading % 360;
	
	if (heading < 0) {
		heading = 360 + heading;
	}
	
	return heading;
};

/**
 * Magentic heading in degrees [0, 360].
 *
 * @type Number
 */
taz.Heading.prototype.heading = 0;

/**
 * Returns the compass point string that is nearest to this heading.
 *
 * @returns {String} One of 'N', 'NNE', 'NE', 'NEE', 'E', 'SEE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'SWW', 'W', 'NWW', 'NW', and 'NNW'.
 */
taz.Heading.prototype.getCompassPoint = function(steps) {
	if (steps == undefined) {
		steps = 16
	}
	if (steps != 4 && steps != 8 && steps != 16) {
		console.log("ERROR(Heading): " + steps + " step compass unsupported!"); 
		return 'N';
	}
	
    var index = (Math.round(this.heading / (360 / steps)) % steps) * (16 / steps);
    return (['N', 'NNE', 'NE', 'NEE', 'E', 'SEE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'SWW', 'W', 'NWW', 'NW', 'NNW'])[index];
};

/**
 * @returns {taz.Heading} This heading minus the other heading.
 */
taz.Heading.prototype.substract = function(anotherHeading) {
    return new taz.Heading(this.heading - anotherHeading.heading);
};

/**
 * @returns {taz.Heading} This heading plus the other heading.
 */
taz.Heading.prototype.add = function(anotherHeading) {
    return new taz.Heading(this.heading + anotherHeading.heading);
};


/**
 * @namespace Various tool related to handling image objects.
 */
taz.imageutils = {};

/**
 * Preloads an array of images and passes them to imagesLoaded callback.
 *
 * @param {string[]} imageUrls Urls of the images to load.
 * @param {function(Image[])} imagesLoaded Function that is called when all images are loaded. 
 */
taz.imageutils.load = function(imageUrls, imagesLoaded) {
    // Start loading images.
    loadImage();
    
    var images = [];
    // Clone the array so that the splice operation doesn't affect
    // the original array.
    imageUrls = $.extend(true, [], imageUrls);
    
    function loadImage() {
        var imageUrl = imageUrls.splice(0, 1);
        var image = new Image();
        
        image.onload = function() {
            images.push(image);
            
            if (imageUrls.length == 0) {
                imagesLoaded(images);
            } else {
                loadImage();
            }
        };
        
        // This starts the asynchronous fetching operation.
        image.src = imageUrl;
    };
};

/**
 * Positions an image inside it's parent container.
 *
 * @param {Image} image The image element to position.
 * @param {Number} width Width of the image in relation to its parent. Percents 0 - 100.
 * @param {Number} pos Position of the center of the image in relation to its parent. Percents 0 - 100.
 * @param {Number=} animateDuration If set the values are from current values animated (milliseconds)
 */
taz.imageutils.setPositionAndWidth = function(image, width, pos, animateDuration) {
    var finalImageHeight = (image.height/image.width) * (width/100) * $(image).parent().width();

    var css = {
        'position' : 'absolute',
        'width' : width + '%',
        'margin-left' : (100 - width) / 2 + '%',
        'margin-right' : (100 - width) / 2 + '%',
        'margin-top' : $(image).parent().height() * (pos/100) - finalImageHeight / 2 + 'px'
    };

    if (animateDuration != undefined) {
        $(image).animate(css, animateDuration);
    } else {
        $(image).css(css);
    }
};

/**
 * Positions an image in relation to the screen.
 *
 * @param {Image} image The image element to position.
 * @param {Number} width Width of the image in relation to the screen width. Percents 0 - 100.
 * @param {Number} pos Position of the center of the image in relation to the screen height. Percents 0 - 100.
 * @param {Number=} animateDuration If set the values are from current values animated (milliseconds)
 */
taz.imageutils.setPositionAndWidthOnScreen = function(image, width, pos, animateDuration) {
    var finalImageHeight = (image.height/image.width) * (width/100) * window.innerWidth;

    var css = {
        'position' : 'absolute',
        'width' : width + '%',
        'margin-left' : (100 - width) / 2 + '%',
        'margin-right' : (100 - width) / 2 + '%',
        'margin-top' : window.innerHeight * (pos/100) - finalImageHeight / 2 + 'px'
    };
    
    if (animateDuration != undefined) {
        $(image).animate(css, animateDuration);
    } else {
        $(image).css(css);
    }
};


taz.dialogs = {};

taz.dialogs.warningDialog = function(okCallback) {

    // Makes sure the callback is only executed once.
    var okOnceCallback = _.once(okCallback);

    var dialog = new taz.Dialog({
        hasHeader : false,
        content : '<h2 style="text-align:center; padding-top:8px; padding-bottom:8px;">' + taz.strings.warning + '</h2>',
        button1Text : taz.strings.ok,
        button1Theme : 'positive',
        button1Cb : okOnceCallback,
        checkboxText : taz.strings.doNotShowAgain,
        contentTheme : 'd'
    });

    dialog.show();
};

taz.dialogs.languageDialog = function() {

    var dialog = new taz.Dialog({
        hasHeader : false,
        content : '<div class=ui-grid-c><div id="finnishSelect" class="ui-block-a lang-select"><a><img  src="images/flags/finland.png" /></a></div><div id="englishSelect" class="ui-block-b lang-select"><a><img src="images/flags/flag_uk.png" /></a></div><div id="chineseSelect" class="ui-block-c lang-select"><a><img src="images/flags/flag_zh.png" /></a></div><div id="arabicSelect" class="ui-block-d lang-select"><a><img src="images/flags/arabic.png" /></a></div><div id="danishSelect" class="ui-block-a lang-select"><a><img src="images/flags/danish.png" /></a></div><div id="frenchSelect" class="ui-block-b lang-select"><a><img src="images/flags/france.png" /></a></div><div id="germanSelect" class="ui-block-c lang-select"><a><img src="images/flags/german.png" /></a></div><div id="norwegianSelect" class="ui-block-d lang-select"><a><img src="images/flags/norway.png" /></a></div><div id="swedishSelect" class="ui-block-a lang-select"><a><img src="images/flags/sweden.png" /></a></div><div id="russianSelect" class="ui-block-b lang-select"><a><img src="images/flags/flag_ru.png" /></a></div></div>',
        contentTheme : 'd'
    });
    
    return dialog;
};

taz.dialogs.okDialog = function(prompt, okCallback) {
    if (!okCallback) {
        okCallback = function() {}
    }

    // Makes sure the callback is only executed once.
    var okOnceCallback = _.once(okCallback);

    var dialog = new taz.Dialog({
        hasHeader : false,
        content : '<h2 style="text-align:center; padding-top:8px; padding-bottom:8px;">' + prompt + '</h2>',
        button1Text : taz.strings.ok,
        button1Theme : 'positive',
        button1Cb : okOnceCallback,
        contentTheme : 'd'
    });

    // Autoclose the dialog and press ok after 30 seconds.
    setTimeout(function() {
        if (dialog.isOpen()) {
            dialog.close();
            okCallback();
        }
    }, 30000);

    dialog.show();
};

taz.dialogs.okCancelDialog = function(prompt, okCallback, cancelCallback) {
    if (!okCallback) {
        okCallback = function() {}
    }
    
    if (cancelCallback === undefined || cancelCallback == null) {
        cancelCallback = function() {this.close();}
    }

    // Makes sure the callback is only executed once.
    var okOnceCallback = _.once(okCallback);
    var cancelOnceCallback = _.once(cancelCallback);

    var dialog = new taz.Dialog({
        hasHeader : false,
        content : '<h2 style="text-align:center; padding-top:8px; padding-bottom:8px;">' + prompt + '</h2>',
        button1Text : taz.strings.ok,
        button1Theme : 'positive',
        button1Cb : okOnceCallback,
        button2Text : taz.strings.cancel,
        button2Theme : 'negative',
        button2Cb: cancelOnceCallback,
        contentTheme : 'd'
    });

    dialog.show();
};

taz.dialogs.twoButtonDialog = function(prompt, leftText, rightText, leftCallback, rightCallback) {
    if (leftCallback === undefined || leftCallback == null) {
        leftCallback = function() {this.close();}
    }
    
    if (rightCallback === undefined || rightCallback == null) {
        rightCallback = function() {this.close();}
    }

    // Makes sure the callback is only executed once.
    var leftOnceCallback = _.once(leftCallback);
    var rightOnceCallback = _.once(rightCallback);

    var dialog = new taz.Dialog({
        hasHeader : false,
        content : '<h2 style="text-align:center; padding-top:8px; padding-bottom:8px;">' + prompt + '</h2>',
        button1Text : leftText,
        button1Theme : 'positive',
        button1Cb : leftOnceCallback,
        button2Text : rightText,
        button2Theme : 'negative',
        button2Cb: rightOnceCallback,
        contentTheme : 'd'
    });

    dialog.show();
    
    return dialog;
};

taz.dialogs.gotoNonTargetCheckpointDialog = function(prompt, content, question, leftText, rightText, leftCallback, rightCallback) {
    if (leftCallback === undefined || leftCallback == null) {
        leftCallback = function() {this.close();}
    }
    
    if (rightCallback === undefined || rightCallback == null) {
        rightCallback = function() {this.close();}
    }

    // Makes sure the callback is only executed once.
    var leftOnceCallback = _.once(leftCallback);
    var rightOnceCallback = _.once(rightCallback);

    var content = 
          '<h2 style="text-align:center; padding-top:8px; padding-bottom:8px;">' + prompt + '</h2>' 
        + '<div style="margin-left: 10px; margin-right: 10px;">' + content + '</div>' 
        + '<h3 style="margin-left: 10px; margin-right: 10px; margin-top: 10px;">' + question + '</h3>';
    
    var dialog = new taz.Dialog({
        hasHeader : false,
        content : content,
        button1Text : leftText,
        button1Theme : 'positive',
        button1Cb : leftOnceCallback,
        button2Text : rightText,
        button2Theme : 'negative',
        button2Cb: rightOnceCallback,
        contentTheme : 'd'
    });

    dialog.show();
    
    return dialog;
};

taz.dialogs.passwordDialog = function(prompt, okCallback, cancelCallback) {
     var okCb = function() {
         if(okCallback) {
             okCallback($('#password').val());
         }
         this.close();
     }

    
    if (cancelCallback === undefined || cancelCallback == null) {
        cancelCallback = function() {this.close();}
    }

    // Makes sure the callback is only executed once.
    //var okOnceCallback = _.once(okCallback);
    var cancelOnceCallback = _.once(cancelCallback);
    var contentData = '<h2 style="text-align:center; padding-top:8px; padding-bottom:8px;">' + prompt + '</h2>' +
                      '<input type="password" name="password" id="password" value=""  />';

    var dialog = new taz.Dialog({
        hasHeader : false,
        content : contentData,
        button1Text : taz.strings.ok,
        button1Theme : 'positive',
        button1Cb : _.once(okCb),
        button2Text : taz.strings.cancel,
        button2Theme : 'negative',
        button2Cb: cancelOnceCallback,
        contentTheme : 'd'
    });

    dialog.show();
};


taz.dialogs.noButtonDialog = function(prompt, okCallback) {
    if (!okCallback) {
        okCallback = function() {}
    }
    
    var dialog = new taz.Dialog({
        hasHeader : false,
        content : '<h2 style="text-align:center; padding-top:8px; padding-bottom:8px;">' + prompt + '</h2>',
        contentTheme : 'd'
    });

    // Autoclose the dialog and press ok after 3 seconds.
    setTimeout(function() {
        if (dialog.isOpen()) {
            dialog.close();
            okCallback();
        }
    }, 3000);

    dialog.show();
};

taz.dialogs.joinNewGameConfirmDialog = function(prompt, okCallback, cancelCallback) {
    if (!okCallback) {
        okCallback = function() {}
    }
    
    if (cancelCallback === undefined || cancelCallback == null) {
        cancelCallback = function() {this.close();}
    }

    // Makes sure the callback is only executed once.
    var okOnceCallback = _.once(okCallback);
    var cancelOnceCallback = _.once(cancelCallback);

    var dialog = new taz.Dialog({
        hasHeader : false,
        content : '<h2 style="text-align:center; padding-top:8px; padding-bottom:8px;">' + prompt + '</h2>',
        button1Text : taz.strings.join_new_game,
        button1Theme : 'positive',
        button1Cb : okOnceCallback,
        button2Text : taz.strings.cancel,
        button2Theme : 'negative',
        button2Cb: cancelOnceCallback,
        contentTheme : 'd'
    });

    dialog.show();
};

taz.dialogs.pauseDialog = function(prompt, button1Text, button2Text, button3Text, button1Cb, button2Cb, button3Cb) {
    if (button1Cb === undefined || button1Cb == null) {
    	button1Cb = function() {this.close();}
    }
    
    if (button2Cb === undefined || button2Cb == null) {
    	button2Cb = function() {this.close();}
    }
    
    if (button3Cb === undefined || button3Cb == null) {
    	button3Cb = function() {this.close();}
    }

    // Makes sure the callback is only executed once.
    var button1CbOnce = _.once(button1Cb);
    var button2CbOnce = _.once(button2Cb);
    var button3CbOnce = _.once(button3Cb);

    var dialog = new taz.Dialog({
        hasHeader : false,
        content : '<h2 style="text-align:center; padding-top:8px; padding-bottom:8px;">' + prompt + '</h2>',
        button1Text : button1Text,
        button1Theme : 'positive',
        button1Cb : button1CbOnce,
        button2Text : button2Text,
        button2Theme : 'negative',
        button2Cb: button2CbOnce,
        button3Text : taz.isDeviceiPhone() ? null : button3Text,
        button3Theme : taz.isDeviceiPhone() ? null : 'negative',
        button3Cb: taz.isDeviceiPhone() ? null : button3CbOnce,
        contentTheme : 'd'
    });

    dialog.show();
    
    return dialog;
};


taz.FileWriter = function() {

};

taz.FileWriter.prototype.writeFile = function(data, fileName, success, error) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, error);

    function gotFS(fileSystem) {
        console.log('File system: ' + fileSystem.name);
        console.log('Path :' + fileSystem.root.fullPath);
        fileSystem.root.getFile(fileName, {create: true, exclusive: false}, gotFileEntry, error);
    }

    function gotFileEntry(fileEntry) {
        console.log('FileEntry: ' + fileEntry.fullPath);
        fileEntry.createWriter(gotFileWriter, error);
    }

    function gotFileWriter(writer) {
        writer.onwriteend = success;
        writer.onerror = error;
        writer.write(data);
    }
};

taz.FileWriter.prototype.requestFileSystem = function(success, error) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, success, error);
};

taz.FileWriter.prototype.createDirectory = function(path, fileSys, success, error) {
    if (fileSys) {
        gotFS(fileSys);
    }
    else {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, error);
    }
    
    function gotFS(fileSystem) {
        var dirs = path.split("/");
        if (!dirs.length) dirs = [path];
        
        var createDir = function(base, dirName, done) {
            if (!dirName || !dirName.length) {
                success(base);
                return;
            }
            
            base.getDirectory(dirName, {create: true}, done, error);
        };
        
        var i = 0;
        createDir(fileSystem.root, dirs[i], function(dir) {
            createDir(dir, dirs[++i], arguments.callee);
        });
    }
};

taz.FileWriter.prototype.deleteDirectory = function(path, fileSys, success, error) {
    if (fileSys) {
        gotFS(fileSys);
    }
    else {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, error);
    }
    
    function gotFS(fileSystem) {
        fileSystem.root.getDirectory(path, {create: false}, function(dir) {
            dir.removeRecursively(success, error);
        }, error);
    }
};

/**
 * 
 */
taz.PathOverlay = function(map, start, end) {
    this.googleMap_ = map;
    this.path_ = [start, end];
    
    this.setMap(this.googleMap_);
};

taz.PathOverlay.prototype = new google.maps.OverlayView();

taz.PathOverlay.prototype.div_ = null;
taz.PathOverlay.prototype.svg_ = null;
taz.PathOverlay.prototype.svgPath_ = null;
taz.PathOverlay.prototype.path_ = null;
taz.PathOverlay.prototype.googleMap_ = null;

taz.PathOverlay.prototype.setPath = function(start, end) {
    if (this.path_[0].equals(start) && this.path_[1].equals(end)) {
        return;
    }
    
    this.path_ = [start, end];
    this.draw();
};

taz.PathOverlay.prototype.onAdd = function() {
    this.svg_ = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svgPath_ = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.div_ = document.createElement('div');
    
    $(this.div_).css({
        'position' : 'absolute',
        'border' : 'none'
    });        
    
    $(this.svgPath_).attr({
        'stroke-width' : 2,
        'stroke-opacity' : 1,
        'fill-opacity' : 1,
        'stroke' : "#FF0000",
        'fill' : "#FF0000",
    });        
    
    this.div_.appendChild(this.svg_);
    this.svg_.appendChild(this.svgPath_);

    var panes = this.getPanes();
    panes.mapPane.appendChild(this.div_);
};

taz.PathOverlay.prototype.onRemove = function() {
    this.div_.parentNode.removeChild(this.div_);
};

taz.PathOverlay.prototype.draw = function() {
    var start = this.path_[0];
    var end = this.path_[1];
    
    var projection = this.getProjection();
    
    var pxStart = new taz.Vector2d(projection.fromLatLngToDivPixel(start));
    var pxEnd = new taz.Vector2d(projection.fromLatLngToDivPixel(end));
    
    // Calculate the position and dimensions of the div. The div is made a bit larger than
    // needed because the SVG element seems to be buggy inside a smaller div on some browsers.
    var padding = new taz.Vector2d(10,10);
    var topLeft = taz.Vector2d.min(pxStart, pxEnd).sub(padding);
    var bottomRight = taz.Vector2d.max(pxStart, pxEnd).add(padding);
    var size = bottomRight.sub(topLeft);
    
    var path = 'M' + pxStart.sub(topLeft)
        + 'L' + pxEnd.sub(topLeft) + 'Z';
    
    $(this.div_).css({
        'left' : topLeft.x + 'px',
        'top' : topLeft.y + 'px',
        'width' : size.x + 'px',
        'height' : size.y + 'px'
    });    
    
    $(this.svgPath_).attr('d', path);    
};

/**
 * @class Calculates the next check point in offline mode.
 * 
 * @param {taz.GameModel} model
 */
taz.OfflineRouter = function(model) {
    console.log("taz.OfflineRouter");
    this.model_ = model;
};

/**
 * @private
 * @type {taz.GameModel}
 */
taz.OfflineRouter.prototype.model_ = null;

/**
 * @private
 * @type float (meters)
 * Calculated from percentage of longest diagonal of the game zone.
 * Checkpoints within this distance from the player are considered
 * to be equal distance from each other
 * */
taz.OfflineRouter.prototype.distanceEquality_ = -1.0;

/**
 * @type boolean
 * Used to notice that the team is forcibly thrown out of graph, 
 * because they had no points to continue
 * */
taz.OfflineRouter.prototype.forceBetweenGraphs = false;

/**
 * Calculates best checkpoint from given array of checkpoints
 */

taz.OfflineRouter.prototype.calculateNextCheckPoint = function() {

    var game = this.model_.getGame();
    
    if(this.distanceEquality_ < 0) {
        console.log("taz.OfflineRouter.calculateNextCheckPoint: first time called. Calculated distance equality value");
        
        var corners = game.template.zone.corners;
        
        if(corners.length < 4) {
            return null;
        }
        
        var c1 = new taz.GeoPosition(corners[0].latitude, corners[0].longitude);
        var c2 = new taz.GeoPosition(corners[1].latitude, corners[1].longitude);
        var c3 = new taz.GeoPosition(corners[2].latitude, corners[2].longitude);
        var c4 = new taz.GeoPosition(corners[3].latitude, corners[3].longitude);

        var diag1length = c1.distanceTo(c3);
        var diag2length = c2.distanceTo(c4);
        this.distanceEquality_ = 0.2 * (diag1length > diag2length ? diag1length : diag2length);
        
        console.log("taz.OfflineRouter.calculateNextCheckPoint: distance equality = " + this.distanceEquality_);
    }

    var playerPosition = taz.game.getLastKnownPosition();
    console.log("taz.OfflineRouter.calculateNextCheckPoint: player pos: " + playerPosition.latitude + "," + playerPosition.longitude);

    var validCheckpoints = this.getValidCheckPoints();
    validCheckpoints.sort(function(left, right) {
       return playerPosition.distanceTo(left.position) -  playerPosition.distanceTo(right.position);
    });
    
    var i = 0;
    var currentCheckPoint = this.model_.getCurrentCheckPoint();
    var hasConnections = false;
    
    if ((currentCheckPoint != null && !currentCheckPoint.graphEnd) || (currentCheckPoint == null && game.template.startingEdges)) {
    	hasConnections = true;
    }
    
    for(; i < validCheckpoints.length; ++i){
        var dist = playerPosition.distanceTo(validCheckpoints[i].position);
        console.log("taz.OfflineRouter.calculateNextCheckPoint: " + validCheckpoints[i].name + " dist " + dist);
        if( !hasConnections && dist > this.distanceEquality_ ){
            break;
        }
    }
    
    var chosen = Math.floor(i * Math.random());
    return validCheckpoints[chosen];
}


/**
 * Returns list of valid checkpoints.
 * 
 */
taz.OfflineRouter.prototype.getValidCheckPoints = function() {
    var currentCheckPoint = this.model_.getCurrentCheckPoint();
    if (currentCheckPoint == null) {
        return this.gameStartingCheckPoints_();
    } if (currentCheckPoint.graphEnd || this.forceBetweenGraphs) {
        return this.unvisitedGraphStartingCheckPoints_();
    } else {
        return this.unvisitedConnectedCheckPoints_();
    }
};

/**
 * Returns a list of all unvisited checkpoints that are marked as hidden 'discovery' checkpoints. 
 * Does not return discovery checkpoints that are neither GPS nor QR-based.
 * @param includeGps Include GPS-based discovery checkpoints in result. Default is true.
 * @param includeQr Include QR-based discovery checkpoints in result. Default is false.
 */
taz.OfflineRouter.prototype.getUnvisitedDiscoveryCheckpoints = function(includeGps, includeQr) {
    includeGps = includeGps === undefined ? true : includeGps;
    includeQr = includeQr === undefined ? false : includeQr;
    
    var allCheckPoints = this.model_.getCheckPoints();
    var unvisited = [];
    
    for (var i = 0; i < allCheckPoints.length; ++i) {
        var checkPoint = allCheckPoints[i];
        
        if (!this.model_.hasCheckPointBeenVisited(checkPoint) 
                && checkPoint.graphStart 
                && checkPoint.discoveryCheckpoint 
                && (checkPoint.useGps || checkPoint.qrCode) // No support for no-GPS no-QR CPs
                && (includeGps || !checkPoint.useGps) 
                && (includeQr || !checkPoint.qrCode)
                && (this.model_.getPoints() + checkPoint.arrivePoints >= 0 && this.model_.getPoints() - checkPoint.requiredPoints >= 0)) {
            
            unvisited.push(checkPoint);
        }
    }
    
    return unvisited;    
};

/**
 * Returns a list of all unvisited checkpoints.
 * Does not return checkpoints that are neither GPS nor QR-based.
 * @param includeGps Include GPS-based checkpoints in result. Default is true.
 * @param includeQr Include QR-based checkpoints in result. Default is false.
 */
taz.OfflineRouter.prototype.getUnvisitedCheckpoints = function(includeGps, includeQr) {
    includeGps = includeGps === undefined ? true : includeGps;
    includeQr = includeQr === undefined ? false : includeQr;
    
    var allCheckPoints = this.model_.getCheckPoints();
    var unvisited = [];
    
    for (var i = 0; i < allCheckPoints.length; ++i) {
        var checkPoint = allCheckPoints[i];
        
        if (!this.model_.hasCheckPointBeenVisited(checkPoint) 
                && checkPoint.graphStart
                && (checkPoint.useGps || checkPoint.qrCode) // No support for no-GPS no-QR CPs
                && (includeGps || !checkPoint.useGps)
                && (includeQr || !checkPoint.qrCode)
                && (this.model_.getPoints() + checkPoint.arrivePoints >= 0 && this.model_.getPoints() - checkPoint.requiredPoints >= 0)) {
            
            unvisited.push(checkPoint);
        }
    }
    
    return unvisited;    
};

/**
 * Returns list of game starting checkpoints
 */
taz.OfflineRouter.prototype.gameStartingCheckPoints_ = function() {
    var gameTempl = this.model_.getGame().template;
    var selectable = [];
    
    if (!gameTempl.startingEdges || gameTempl.startingEdges.length == 0) {
        return this.unvisitedGraphStartingCheckPoints_();
    }

    for (var i = 0; i < gameTempl.startingEdges.length; ++i) {
        var checkPoint = this.model_.getCheckPointById(gameTempl.startingEdges[i].endId);
        if (!this.model_.hasCheckPointBeenVisited(checkPoint)) {
            selectable.push(checkPoint);
        }
    }

    if (selectable.length == 0) {
        return this.unvisitedGraphStartingCheckPoints_();
    }
    return selectable;
};

/**
 * returns list of unvisited graph starting checkpoints
 */
taz.OfflineRouter.prototype.unvisitedGraphStartingCheckPoints_ = function() {
    var allCheckPoints = this.model_.getCheckPoints();
    var selectable = [];
    
    for (var i = 0; i < allCheckPoints.length; ++i) {
        var checkPoint = allCheckPoints[i];
        if (!this.model_.hasCheckPointBeenVisited(checkPoint) 
                && checkPoint.graphStart 
                && !checkPoint.discoveryCheckpoint) {
        	if (this.model_.getPoints() + checkPoint.arrivePoints >= 0 && this.model_.getPoints() - checkPoint.requiredPoints >= 0) {
            	selectable.push(checkPoint);
            }
        }
    }
    return selectable;
};

/**
 * returns list of unvisited connected checkpoints
 */
taz.OfflineRouter.prototype.unvisitedConnectedCheckPoints_ = function() {
    var currentCheckPoint = this.model_.getCurrentCheckPoint();
    var selectable = [];
    
    for (var i = 0; i < currentCheckPoint.startingEdges.length; ++i) {
        var edge = currentCheckPoint.startingEdges[i];
        var checkPoint = this.model_.getCheckPointById(edge.endId);
        
        if (!this.model_.hasCheckPointBeenVisited(checkPoint)) {
            if (this.model_.getPoints() + checkPoint.arrivePoints >= 0 && this.model_.getPoints() - checkPoint.requiredPoints >= 0) {
            	selectable.push(checkPoint);
            }
        } else {
            console.log("taz.OfflineRouter.unvisitedConnectedCheckPoints_: checkpoint already visited");
        }
    }
    
    if (selectable.length == 0) {
        var graph = this.model_.getGraph();
        var graphIdList = graph.calculateGraphOf(currentCheckPoint.id);
        this.model_.markCheckPointsAsVisited(graphIdList);
        console.log("taz.OfflineRouter.unvisitedConnectedCheckPoints_: Not enough points to go to next checkpoint, exit graph!");
        this.forceBetweenGraphs = true;
        return this.unvisitedGraphStartingCheckPoints_();
    }
    
    return selectable;
};


if (!taz.taskelements) {
    /**
     * @namespace
     */
    taz.taskelements = {};
}

/**
 * @const
 */
taz.taskelements.TEMPLATE_PATHS = {
    TEXT : 'taskelements/text',
    YOUTUBE_VIDEO : 'taskelements/youtubevideo',
    AUDIO : 'taskelements/audio',
    TEXT_ANSWER : 'taskelements/textanswer',
    NUMBER_ANSWER : 'taskelements/numberanswer',
    PICTURE : 'taskelements/picture',
    PHOTO_ANSWER : 'taskelements/photoanswer',
    RADIO_GROUP_ANSWER : 'taskelements/radiogroupanswer',
    CHECK_BOX_ANSWER : 'taskelements/checkboxanswer'
};

/**
 * @private
 */
taz.taskelements.templateGetter_ = _.bind(taz.getTemplate, taz);

/**
 * @private
 * @type {Array.<taz.AudioPlayer>}
 */
taz.taskelements.audioPlayers_ = {};

/**
 * By default the templates are requested using taz.getTemplate method. Use this to
 * register another getter.
 */
taz.taskelements.setTemplateGetter = function(templateGetter) {
    this.templateGetter_ = templateGetter;
};

/**
 * Returns true if an element is an answer element.
 * 
 * @param {TaskElementDTO} elementDto The element to test.
 * @return {Boolean} True if the elementDto is an answer element.
 */
taz.taskelements.isAnswerElement = function(elementDto) {
    return (elementDto.type.indexOf('_ANSWER') != -1);
};

/**
 * Creates the html for a task element.
 *
 * @param {TaskElementDTO} elementDto The element whose UI should be created.
 * @param {TaskElementAnswerDTO} opt_answer Optional answer.
 */
taz.taskelements.createHTML = function(elementDto, opt_answer) {
    var funcs = this.funcs_;
    var type = elementDto.type;

    var createData = funcs[type].createData ? funcs[type].createData : funcs.DEFAULTS.createData;
        
    var data = createData(elementDto, opt_answer);
    var template = this.templateGetter_(this.TEMPLATE_PATHS[elementDto.type]);
    var html = template(data);
    
    return html;
};

/**
 * This should be called after the html of the task element has been inserted to DOM tree. This
 * initializes the element (attaches event handlers etc.).
 *
 * @param {TaskElementDTO} elementDto Data of the element.
 * @param {jQuery object} container jQuery object that contains the element. Doesn't have to be the
 *                                  immediate parent. This is only used to avoid id conficts when using
 *                                  jQuery selectors. So give the closest parent you can easily get access to.
 *                                  by default $(document) should be fine.
 */
taz.taskelements.initialize = function(elementDto, container) {
    var funcs = this.funcs_;
    var type = elementDto.type;
    
    var initialize = funcs[type].initialize ? funcs[type].initialize : funcs.DEFAULTS.initialize;
    initialize(elementDto, container);
};

/**
 * Extracts the answer from a task element.
 *
 * @param {TaskElementDTO} elementDto Data of the element.
 * @param {jQuery object} container jQuery object that contains the element. Doesn't have to be the
 *                                  immediate parent. This is only used to avoid id conficts when using
 *                                  jQuery selectors. So give the closest parent you can easily get access to.
 *                                  by default $(document) should be fine.
 *
 * @return {TaskElementAnswerDTO} The answer or null if the element is not an answer element.
 */
taz.taskelements.extractAnswer = function(elementDto, container) {
    var funcs = this.funcs_;
    var type = elementDto.type;

    if (this.isAnswerElement(elementDto)) {
        var extractAnswer = funcs[type].extractAnswer ? funcs[type].extractAnswer : funcs.DEFAULTS.extractAnswer;
        var answerData = extractAnswer(elementDto, container);
        
        if (answerData == undefined) {
            answerData = null;
        }
        
        // Create the TaskElementAnswerDTO structure.
        return {
			taskElementId : elementDto.id,
			answer : {
				rawData : answerData
			}
		};
    }
    
    return null;
};

/**
 * This should be called just before the html of the task element is removed from the DOM. This frees allocated
 * resources, stops audio players if they are left playing and so on.
 *
 * @param {TaskElementDTO} elementDto Data of the element.
 * @param {jQuery object} container jQuery object that contains the element. Doesn't have to be the
 *                                  immediate parent. This is only used to avoid id conficts when using
 *                                  jQuery selectors. So give the closest parent you can easily get access to.
 *                                  by default $(document) should be fine.
 */
taz.taskelements.destroy = function(elementDto, container) {
    var funcs = this.funcs_;
    var type = elementDto.type;
    
    var destroy = funcs[type].destroy ? funcs[type].destroy : funcs.DEFAULTS.destroy;
    destroy(elementDto, container);
};


/**
 * Checks the answer of a task element and returns a value between 0 and 1 to indicate how
 * correct the answer is. null is returned if the answer cannot be checked automatically.
 *
 * @param {TaskElementDTO} elementDto
 * @param {TaskElementAnswerDTO} answerDto
 * @return {Number} Value between 0 and 1 indicating how correct the answer was.
 */
taz.taskelements.checkAnswer = function(elementDto, answerDto) {
    var funcs = this.funcs_;
    var type = elementDto.type;
    
    if (this.isAnswerElement(elementDto)) {
        var checkAnswer = funcs[type].checkAnswer ? funcs[type].checkAnswer : funcs.DEFAULTS.checkAnswer;        
        return checkAnswer(elementDto, answerDto);
    }
    
    return null;
};

/**
 * Given an task element and answer data (either correctAnswer or teamAnswer) formats the
 * data to human readable string.
 *
 * @param {TaskElementDTO} elementDto
 * @param {DataChunkDTO} answerDataChunk
 * @param {Boolean=} opt_concise If true the result is kept as short as possible. For example the
 *                               check boxes will be shown as numbers instead of text. Default true.
 *
 * @return {String} Human readable answer.
 */
taz.taskelements.answerToHumanReadable = function(elementDto, answerDataChunk, opt_concise) {
    if (opt_concise == undefined) {
        opt_concise = true;
    }
    
    var funcs = this.funcs_;
    var type = elementDto.type;
    
    var answerToHumanReadable = funcs[type].answerToHumanReadable
            ? funcs[type].answerToHumanReadable
            : funcs.DEFAULTS.answerToHumanReadable;
            
    if (answerDataChunk == null
            || answerDataChunk.rawData == null
            || answerDataChunk.rawData == undefined) {
        return '';        
    }
            
    return answerToHumanReadable(elementDto, answerDataChunk, opt_concise);
};

/**
 * @private
 */
taz.taskelements.funcs_ = {
    DEFAULTS : {},
    TEXT : {},
    YOUTUBE_VIDEO : {},
    TEXT_ANSWER : {},
    PICTURE : {},
    PHOTO_ANSWER : {},
    NUMBER_ANSWER : {},
    CHECK_BOX_ANSWER : {},
    RADIO_GROUP_ANSWER : {}
};

/**
 * @private
 */
taz.taskelements.funcs_.DEFAULTS = {
    // Given a TaskElementDTO and an optional answer, creates the data to be passed
    // to the template. This default implementaion simply inserts the answer and localization
    // strings to the element.
    createData : function(element, answer) {
        element = $.extend(true, {}, element);
    
        if (answer) {
            element.teamAnswer = answer.answer;
        }
        
        element.strings = taz.strings;
        return element;
    },
    
    // Called after the element has been inserted to the DOM tree. Attaches event handlers etc.
    // This default implementation does nothing.
    initialize : function(element, container) {
        // Do nothing by default.
    },
    
    // Extracts the answer data from the DOM tree.
    extractAnswer : function(element, container) {
        var value = container.find('#answer_' + element.id).val();
        
        if (value == undefined) {
            return null;
        }
    
        return value;
    },

    // Called just before the html of the element is removed from DOM tree. Frees resources.
    destroy : function(element, container) {
        // Do nothing by default.
    },
    
    // Given a TaskElementDTO and corresponding TaskElementAnswerDTO checks the answer and
    // returns a value between 0 and 1 to indicate how correct the answer was. Default
    // implementation returns null to indicate that the element cannot be checked.
    checkAnswer : function(element, answer) {
        return null;
    },
    
    // Formats the answer data to human readabe format. This default implementation assumes
    // that the answer already is in such format.
    answerToHumanReadable : function(element, answerData, opt_concise) {
        if (answerData.rawData == null || answerData.rawData == undefined) {
            return '';
        }
        
        return answerData.rawData.toString();
    }
};


taz.taskelements.funcs_.TEXT_ANSWER = {
	checkAnswer: function(element, answer) {
        if (answer == null
                || answer.answer == null
                || answer.answer.rawData == null
                || answer.answer.rawData == undefined) {
            return 0;        
        }

		
        if (element.correctAnswer == null ||
        	element.correctAnswer.rawData == null ||
        	element.correctAnswer.rawData == undefined) {
        	return 1;
        } else {
        	var regexp = new RegExp('^\\s*' + element.correctAnswer.rawData + '\\s*$', 'gi');
        	return regexp.test(answer.answer.rawData);
        }
        
        return 0;
	}
};


/**
 * @private
 */
taz.taskelements.funcs_.NUMBER_ANSWER = {
    createData : function(element, answer) {
        var self = taz.taskelements.funcs_.NUMBER_ANSWER;
        element = $.extend(true, {}, element);
    
        if (answer) {
            element.teamAnswer = self.answerToHumanReadable(element, answer.answer, true);
        }

        return element;
    },

    checkAnswer : function(element, answer) {
        if (answer == null
                || answer.answer == null
                || answer.answer.rawData == null
                || answer.answer.rawData == undefined) {
            return 0;        
        }

        var range = JSON.parse(element.correctAnswer.rawData);
        var answerValue = JSON.parse(answer.answer.rawData);
		
        if (answerValue.start >= range.start && answerValue.end <= range.end) {
            return 1;
        }
        
        return 0;
    },
    
    extractAnswer : function(element, container) {
        var value = container.find('#answer_' + element.id).val();
        
        if (value == undefined) {
            return null;
        }
    
        return JSON.stringify({
            start : Number(value),
            end : Number(value)
        });
    },
    
    answerToHumanReadable : function(element, answerData, opt_concise) {
        var range = JSON.parse(answerData.rawData);
        
        if (range.start == range.end)  {
            return range.start.toString();
        } else {
            return range.start + ' - ' + range.end;	
        }
    }
};

/**
 * @private
 */
taz.taskelements.funcs_.AUDIO = {
    initialize : function(element, container) {
        var players = taz.taskelements.audioPlayers_;

    	container.find('#audio_button_play_pause_' + element.id).mousedown(function(domElement) {
            var $this = $(this);

            if ($this.hasClass('play')) {
                $this.removeClass('play').addClass('pause');
                var player = players[element.id];

                if (!player) {
	                player = new taz.AudioPlayer();
                    players[element.id] = player;
                }

                player.play(element.data.rawData, function() {
                    $this.removeClass('pause').addClass('play');                     
                });
            } else {
                $this.removeClass('pause').addClass('play');
                var player = players[element.id];
    
                if (player) {
                    player.pause();
                }
            }
        });

        container.find('#audio_button_stop_' + element.id).mousedown(function(domElement) {
            var $this = $(this);
            var players = taz.taskelements.audioPlayers_;
            var player = players[element.id];
            if (player) {
                player.stop();
            }
        });
    },

    destroy : function(element, container) {
        var players = taz.taskelements.audioPlayers_;
        var player = players[element.id];

        if (player) {
            player.stop();
        }
    }
};
    
/**
 * @private
 */
taz.taskelements.funcs_.PHOTO_ANSWER = {
    initialize : function(element, container) {
    	container.find('#take_picture_button_' + element.id).tazClick(function() {	
	        var onSuccess = function(imageData) {
		        container.find('#answer_' + element.id).attr('src', 'data:image/jpeg;base64,' + imageData);
	        };
	
	        var onError = function(message) {
		        taz.dialogs.okDialog(taz.strings.picture_failed);
	        };
	
	        var doTakePicture = function() {
	            var cameraOptions = {
                    quality : 80,
                    correctOrientation: true,
                    destinationType : Camera.DestinationType.DATA_URL, 
                    sourceType : Camera.PictureSourceType.CAMERA, 
                    allowEdit : true,
                    encodingType : Camera.EncodingType.JPEG,
                    targetWidth : 480,
                    targetHeight : 640
                };
	                    
                navigator.camera.getPicture(onSuccess, onError, cameraOptions);	            
	        };
	        
	        if (taz.isDeviceAndroid()) {
	            window.JSBridge.checkMediaStorageCapability(doTakePicture, function() {
	                taz.dialogs.okDialog(taz.strings.error_no_media_storage);
	            });
    	    }
	        else {
	            doTakePicture();
	        }
        });
    },

    extractAnswer : function(element, container) {
        var data = container.find('#answer_' + element.id).attr('src');
        return (data == undefined) ? null : data;
    }
};

/**
 * @private
 */
taz.taskelements.funcs_.CHECK_BOX_ANSWER = {
    createData : function(element, answer) {
        var items = JSON.parse(element.data.rawData);
        
        var data = {
            id : element.id,
            items : items
        };

        var teamChecked = {};
        if (answer) {
            teamChecked = JSON.parse(answer.answer.rawData);
        }
        
        // Add indices to the data items.
        for (var i = 0; i < data.items.length; ++i) {
            data.items[i].index = i;
            
            if (i in teamChecked) {
                data.items[i].checked = true;
            }
        }
        
        return data;
    },

    extractAnswer : function(element, container) {
        var answer = {};

        container.find('#answer_' + element.id)
        		.find('input[type="checkbox"]')
                .each(function(index, checkbox) {
            if ($(checkbox).is(':checked')) {
                answer[index] = true;
            }
        });

        return JSON.stringify(answer);
    },
    
    checkAnswer : function(element, answer) {
        if (answer == null
                || answer.answer == null
                || answer.answer.rawData == null
                || answer.answer.rawData == undefined) {
            return 0;        
        }

        var answerIndices = JSON.parse(answer.answer.rawData);
        var correctIndices = JSON.parse(element.correctAnswer.rawData);
        
        var totalNumCorrectIndices = 0;
        for (var index in correctIndices) {
            ++totalNumCorrectIndices;
        }
        
        var numCorrect = 0;
        for (var index in answerIndices) {
            if (index in correctIndices) {
                ++numCorrect;
            } else {
                --numCorrect;
            }
        }
        
        if (numCorrect < 0) {
            numCorrect = 0;
        }

        return (numCorrect / totalNumCorrectIndices);
    },
    
    answerToHumanReadable : function(element, answerData, opt_concise) {
        var answerIndices = JSON.parse(answerData.rawData);
        var items = JSON.parse(element.data.rawData);
        
        var answerArray = [];
        for (var index in answerIndices) {
            if (opt_concise) {
                answerArray.push(index);
            } else {
                answerArray.push(items[index].text);
            }
        }
       
        if (opt_concise) {
            return answerArray.join(' ');
        } else {
            return answerArray.join(' + ');
        }
    }
};
      
/**
 * @private
 */
taz.taskelements.funcs_.RADIO_GROUP_ANSWER = {
    checkAnswer : taz.taskelements.funcs_.CHECK_BOX_ANSWER.checkAnswer,
    answerToHumanReadable : taz.taskelements.funcs_.CHECK_BOX_ANSWER.answerToHumanReadable,
    
    createData : function(element, answer) {
        var data = taz.taskelements.funcs_.CHECK_BOX_ANSWER.createData(element, answer);

        var teamCheckedCount = 0;
        for (var i = 0; i < data.items.length; ++i) {
            if (data.items[i].checked) {
                ++teamCheckedCount;
            }
        }

        // If no answer is checked, check the first one.
        if (teamCheckedCount == 0 && data.items.length > 0) {
            data.items[0].checked = true;
        }

        return data;
    },

    extractAnswer : function(element, container) {
        var answer = {};

        container.find('#answer_' + element.id)
                .find('input[type="radio"]')
                .each(function(index, radioButton) {
                
            if ($(radioButton).is(':checked')) {
                answer[index] = true;
            }
        });

        return JSON.stringify(answer);
    }
};



taz.NetworkDebugOverlay = function(){};

taz.NetworkDebugOverlay.prototype.template_ = null

taz.NetworkDebugOverlay.prototype.visible_ = false;

taz.NetworkDebugOverlay.prototype.timeoutHandle_ = null;

taz.NetworkDebugOverlay.prototype.show = function() {
    if (this.visible_) {
        return;
    }

    this.template_ = taz.getTemplate("NetworkDebugOverlay");
    this.visible_ = true;

    var that = this;

    that.initUi_(taz.game.getBackend().getNetworkInfo());
    this.timeoutHandle_ = setInterval(function() {
        that.initUi_(taz.game.getBackend().getNetworkInfo());
    }, 2000);
};

taz.NetworkDebugOverlay.prototype.hide = function() {
    this.visible_ = false;

    if (this.timeoutHandle_) {
        clearInterval(this.timeoutHandle_);
    }

    $("#netdebug-overlay-container").remove();
};

taz.NetworkDebugOverlay.prototype.isVisible = function() {
	return this.visible_;
}

taz.NetworkDebugOverlay.prototype.initUi_ = function(netInfo) {
    $("#netdebug-overlay-container").remove();

    var context = {
        strings : taz.strings,
        netInfo : netInfo
    };

    $("body").append(this.template_(context)).trigger('create');

    // Add margin to message list based on header size
    var margin = $("#netdebug-overlay-header").outerHeight();
    $("#netdebug-overlay-content").css("margin-top", margin);

    var that = this;
    $("#close-netdebug-overlay-button").tazClick(function() {
        that.hide();
    });

    var documentHeight = $(document).height();
    var minHeight = Math.max(documentHeight, window.innerHeight);
    $("#netdebug-overlay-container").css("min-height", minHeight + "px");

    var contentHeight = $("#netdebug-overlay-content").outerHeight(true);

    // Scroll to bottom or top depending on height
    // 1. Scroll to bottom if content height is more than whole document height
    //	  (before this overlay)
    if (contentHeight >= documentHeight) {
            $("html, body").scrollTop($(document).height());
    }
    // 2. Scroll to bottom of content if content height is more than window height but less than 
    //    document height.
    else if (contentHeight >= window.innerHeight) {
            $("html, body").scrollTop(contentHeight - window.innerHeight);
    }
};



/**
 * @namespace Tools related to client and server version handling.
 */
taz.versionutils = {};


/**
 * Check if server and client versions are compatible.
 *
 * @param {VersionInfoDTO} versionInfo Server version info.
 * @param {boolean} showErrorNotes Flag to show error note if version is incompatible.
 */
taz.versionutils.isCompatibleVersion = function(versionInfo, showErrorNotes) {
    if (!versionInfo || !versionInfo.serverVersion || !versionInfo.minClientVersion) {
        console.log("Version info is not available! Unable to resolve compatibility.");
        if (showErrorNotes) {
            taz.dialogs.okDialog(taz.strings.version_not_available);            
        }
        return false;
    }
    else if (taz.versionutils.versionCompare_(versionInfo.serverVersion, taz.settings.minServerVersion) < 0) {
        console.log("Version mismatch. Server is too old for this client.");
        if (showErrorNotes) {
            taz.dialogs.okDialog(taz.strings.version_server_too_old);
        }
        return false;
    }
    else if (taz.versionutils.versionCompare_(taz.settings.clientVersion, versionInfo.minClientVersion) < 0) {
        console.log("Version mismatch. Client is too old for this server.");
        if (showErrorNotes) {
            taz.dialogs.okDialog(taz.strings.version_client_too_old);
        }
        return false;
    }
    console.log("Client and server versions are compatible.");
    return true;
};


/**
 * Simply compares two string version values.
 *
 * Example:
 * versionCompare('1.1', '1.2') => -1
 * versionCompare('1.1', '1.1') =>  0
 * versionCompare('1.2', '1.1') =>  1
 * versionCompare('2.23.3', '2.22.3') => 1
 *
 * Returns:
 * -1 = left is LOWER than right
 *  0 = they are equal
 *  1 = left is GREATER = right is LOWER
 *  And FALSE if one of input versions are not valid
 *
 * @function
 * @param {String} left  Version #1
 * @param {String} right Version #2
 * @return {Integer|Boolean}
 * @author Alexey Bass (albass)
 * @since 2011-07-14
 */

taz.versionutils.versionCompare_ = function(left, right) {
    if (typeof left + typeof right != 'stringstring')
        return false;
        
    var a = left.split('.');
    var b = right.split('.');
    var i = 0;
    var len = Math.max(a.length, b.length);
        
    for (; i < len; i++) {
        if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
            return 1;
        } else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
            return -1;
        }
    }
        
    return 0;
};


/* 
 * Localization strings for Russian language
 */

taz.strings_ru = {
		
	// warningDialog
	// WarningDialog, shown when the application starts
	warning : "Внимание! Учитывайте состояние дорожного покрытия и интенсивность движения. Соблюдайте меры предосторожности, чтобы избежать столкновений с различными объектами, другими людьми или животными, когда используете ActionTrack.",
	// Option to turn the warning dialog off, so it won't appear on future startups
	doNotShowAgain : "Больше не показывать это сообщение.",
		
    // showServersView
	// X amount of server found. i.e. "5 servers found".
    servers_found : " - количество найденных серверов.",
    // Select server. Header for the servers list
    select_server : "Выберите сервер",
    // Info popups if unable to join a server. 
    version_not_available : "Информация о серверах недоступна. Не удалось подключиться к серверу.",
    version_client_too_old : "Для работы с этим сервером требуется более поздняя версия приложения. Обновите приложение, чтобы подключиться к этому серверу.",
    version_server_too_old : "Этот сервер уже не совместим с программой, установленной на вашем устройстве.",
    
    // serverDescriptionView
    // After choosing server, you are shown the servers description. This text is used in the button in that view to join the server.
    accept_server : "Присоединиться",
    
    // showGamesView
    // i.e. "5 activities found."
    games_found : "- количество найденных этапов.",
    // i.e. "1 activity found."
    game_found : "- количество найденных этапов.",
    // Join activity. Header for activities list.
    join_game : "Присоединение к этапу",

    // gameDescriptionView
    // After choosing activity, you are shown the activity's description. This text is used in the button in that view to join the activity.
    accept_game : "Присоединиться",

    // joinGameView
    // Header for joining the activity. used like: "Welcome to Activity X"
    welcome_to : "Приветствуем участника этапа",
    // Who are you? Header for text input field where you enter your name / username / teamname
    name_your_team : "Кто вы?",
    // Back button
    back : "Назад",
    // Submit button, used in button to submit the name and to start the activity
    accept : "Отправить",

    // rejoinGameView
    // If you restart the application, and try to join a new activity, and you have previously participitated in another activity, 
    // this is the prompt to make sure you want to actually leave the old activity and start joining a new one
    sure_to_start_new_game : "Вы не сможете продолжить текущий этап. Желаете присоединиться к новому этапу?",
        
    // answerView
    // These are shown to the user after answering a task.
    // Full points, PERFECT!
    correct_answer : "ОТЛИЧНО!",
    // Partial points, PRETTY GOOD!
    ok_answer : "НЕПЛОХО!",
    // Wrong answer, no points, OOPS!
    incorrect_answer : "ОЙ!",
    // Try again, in case there is possibility to try a task again, this will be shown in a button
    try_again : "Повторите попытку",
    // Ok button
    ok : "ОК",
    // i.e. "Получено очков: 100"
    you_got : "Получено очков: ",
    points : ".",
    // i.e. "У вас осталось 3 попытки"
    you_have : "Количество оставшихся попыток: ", 
    attempt_left: " .", 
    attempts_left: " .",
    
    //showHintView
    // Shown in a small box indicating when the view is changed to the guiding arrow instead of hint view. i.e. "Switching to guiding arrow in 01:15"
    switching_to_compass: "Переключение в режим движения по стрелке через",
    // Button to open QR code scanner
    scan_qr_code: "Сканировать QR-код",	
    
    // guideView
    // Distance to target checkpoint. i.e. "120 meters"
    meters : " м",
    // Warning if you are outside of the activity area, the arrow guides you back to activity area.
    outside_game_area : "Вы вышли за пределы, следуйте за стрелкой.",
    // Warning if you are in a forbidden zone, the arrow guides you back to activity area.
    forbidden_zone : "Вы вошли в запретную зону, следуйте за стрелкой.",
    // Information in the start of the activity, if the team is required to move to the start area before beginning.
	goto_start_area : "Следуйте за стрелкой в зону старта.",
	// Similiar to switching_to_compass. i.e. "Time left to reach the checkpoint: 01:15"
    time_left : "Время, оставшееся для достижения контрольной точки:",
    
    // mapView
    // Button used to set a checkpoint as a target
    set_as_target: "Установить в качестве цели",
    // Activate button in case the checkpoint is floating one, that starts instantly when you click this button (replaces the "set as target" button)
    activate: "Активировать",
    // Popup text when you have walked into a checkpoint that is not your primary target
    in_radius_of_another_cp: "Найдена контрольная точка!",
    // Popup text when you have walked into a checkpoint that is hidden/secret
    in_radius_of_discovery_cp: "Найдена скрытая контрольная точка!",
    // Prompt about going to the checkpoint, shown under the previous texts.
    goto_non_target_cp: "Активировать эту контрольную точку?",
    
	// queueView
    // Shown when queue is enabled, the players should form a queue and wait for the supervisor that is present at the checkpoint to come and let them to the checkpoint
	checkpoint_full : "Займите очередь и дождитесь контролера.",
	
    // taskView
	// Continue button, used in tasks that don't have any questions, just information. You can continue forward on the trail by clicking this.
    continue_str : "Продолжить",
    // Pass / give up button to pass the current task and move on with the trail.
    give_up : "Пропустить",
    // Submit button for sending the answer(s) after the team has answered the questions.
    submit : "Отправить",
    // Take picture button for tasks that have a task that requires a picture to be taken. Opens camera.
    take_picture : "Сделать снимок",
    // If the tasks time runs out, you will be shown this in popup and you will be forced to submit your answer at it's current state automatically.
    task_time_expired : "Ой! Ваше время истекло.",
    // Header text for points available from the current task
    indicator_points : "Очки",
    // Header text for time left to answer the task
    indicator_time : "Время",
    
    // checkAnswersView
    // Button that takes you to the unlock view, from where you can unlock the supervisor view, to evaluate the current task.
    give_phone_button : "Разблокировать",
    // Info text above previous button, that tells the player to give the device to the supervisor
    give_phone : "Передайте свое мобильное устройство контролеру.",
    // Header for supervisor password input field in the unlock view
    superpasswd : "Пароль контролера:",
    // Unlock button after entering the password
    unlock : "Разблокировать",
    // Header for the picture the team took when in the evaluating view
    teams_picture : "Отправленное изображение:",
    // Header for the picture that shows what the answer was supposed to be like, in the evaluating view
    correct_picture : "Контрольное изображение:",
    // Header for player/user answer in the evaluating view, in other cases than picture
    team : "Пользователь:",
    // Header for the correct answer in the evaluating view, in other cases than picture
    correct : "Правильный ответ:",
    // Points to give to the team in the evaluating view. Used like: "Points (0-100)". Used as header/label for the points input field
    given_points : "Очки",
    // Submit points button under the previous field
    submit_points : "Предоставить очки",
    
    // Popup after submitting an answer in case it was submitted for the admin to check and evaluate later.
    answer_sent_for_check : "Ответ направлен для оценки.",
	
    // finishedView
    // After the activity has finished, these are shown
    // Headers in the scorelist. Username, Points gained, Finished (yes/no)
    fteam : "Пользователь",
    fpoints : "Очки",
    finished : "Готово",
    // Finished texts, yes / no
    yes : "Да",
    no : "Нет",
    // In finishedView, a button that lets you quit from this activity, and return to the main menu
    main_menu : "Завершить этап",
    // Prompt when quitting the activity, you won't be able to return into this finishedView anymore
    sure_to_exit_game : "Вы не сможете вернуться на этот экран. Завершить?",
    // Info text in the finished view stating, that all your answers have been sent to the server and you may now close the application.
    you_may_now_close : "Теперь можно закрыть приложение.",
    // Info text in case you still have unsent answers. Used like: 
    // "Results from 3 tasks are being uploaded. If the count does not decrease in two minutes, check your internet connection."
    warning_you_have : "Загружаются результаты ",
    warning_unsent_answers : " задач(-и).",
    warning_connection : "Если количество задач не уменьшается в течение минуты, проверьте подключение к Интернету.",
    // Refresh button for refreshing the scores list
    refresh_list : "Обновить",
    
	//rejoinGameView
    // When restarting the application, and a still ongoing activity is found from memory, prompt if user wants to rejoin that
	rejoin_header : "Что вы хотите сделать?",
	// Continue current activity button
	continue_previous_game : "Продолжить текущий этап",
	// Join new activity button
    join_new_game : "Присоединиться к новому этапу",
    
    // adminView
    // Header for admin settings view
    adminView_header : "Настройки администратора",
    // Header for text field indicating the currently set default server
    adminView_current_server : "Текущий сервер по умолчанию",
    // Header for the server list used to change the default server
    adminView_new_server : "Выберите новый сервер по умолчанию",
    // Save settings button
    adminView_save_settings : "Сохранить настройки",
    // Clear the default server button
    adminView_clear_server : "Удалить сервер",
    
    // onDemandsLeftView
    // When the game is coming to end, but you still have on-demand tasks that you may do before finishing, this is the info text shown on the screen.
    onDemandsLeftView_text : "У вас есть незавершенные задачи по запросу. Перед завершением вы можете получить доступ к ним.",
    
    // header
    // In-game header label texts. i.e. "POINTS: 100     POSITION: 5/8    TRAVELED: 100m"
    head_points : "ОЧКИ: ",
    head_position : "МЕСТО: ",
    traveled: "ПРОЙДЕНО: ",
        
    // chat
    // Send chat message button
    send : "Отправить",
    // Name for the admin used in chat when he/she writes a message to the players
    game_master : "Организатор",
    // Info text if there are yet no messages in the chat
    no_messages : "Сообщения пока отсутствуют. Используйте окно ниже, чтобы отправить сообщение организатору.",
    
    // dialogs and messages
    // Label for password field in popups where we request some password
    enter_passcode : "Введите пароль:",
    // Popup text for incorrect password
    wrong_password: "Неверный пароль",
    // Close button for popups
    close : "Закрыть",
    // Popup when the system is calculating the next checkpoint
    calculating_next_cp : "Определение следующей контрольной точки...",
    // Prompt after clicking the pass button when doing task.
    give_up_dialog : "Пропустить? Сделав это, вы не получите полагающиеся за эту задачу очки!",
    // Popup when the system is loading something
    loading : "Загрузка...",
    // Popup when entering a checkpoint, that has plus or minus points for entering it.
    // i.e. "You were awarded 100 points for arriving at this checkpoint" or "You were deducted 100 points..."
    // you_got_points + " " + POINTS_NUMBER + " " + points + for_arriving
	you_got_points : "Вам добавлено",
	you_lost_points : "У вас вычтено",
	for_arriving : " очков за достижение этой контрольной точки.",
	// Popup for timeout when moving to next checkpoint, when there was a time limit and you didn't make it
    route_timer_timeout : "Вам не удалось достичь этой контрольной точки в отведенное время.",
    // Sending points popup, a loading dialog when the system sends the points.
    sending_points : "Отправление очков.",
    // Sending the answer popup, a loading dialog when the system send the answer.
    sending_answer : "Отправление ответа.",
    // A loading dialog when the system is looking for servers.
    finding_servers : "Поиск серверов.",
    // A loading dialog when the system is looking for activities.
    finding_games : "Поиск этапов в этой зоне.",
    // A loading dialog when the system is trying to join the activity
    joining_game : "Присоединение к этапу ",
    // Error dialog, if you entered a name that was already in use in this activity
    name_in_use : "Это имя уже используется. Выберите другое имя.",
    // Error dialog, if you tried to join the same activity multiple times
    already_joined : "Вы уже присоединились к этому этапу",
    // A loading dialog when the system loads the activity. i.e. "Loading the activity TAZ Test Track"
	loading_game : "Загрузка этапа ",
	// A loading dialog when the system loads the custom map. i.e. "Loading the map 5%"
	loading_map: "Загрузка карты",
	// A loading dialog when the system waits for GPS fix
    waiting_gps : "Ожидание информации о местоположении от GPS.",
    // A popup when you have reached the finish area
    reached_finish : "Вы достигли зоны финиша.",
    // An info text when the ranking list is not yet shown because we are loading it still
    fetching_rankings : "Получение списка результатов.",
    // Cancel button
    cancel : "Отмена",
    // An info popup, after the last task is done and the team is guided to finish area.
    that_was_last_cp : "Это была последняя контрольная точка. Следуйте в зону финиша.",
    // Same as previous, but when there is no finish area.
    last_cp_game_ended : "Это была последняя контрольная точка. Поздравляем! Этап завершен!",
    // An info popup when the activity time runs out and there is a finish area.
    game_ended_with_fa: "Этап завершен. Следуйте в зону финиша.",
    // Same as previous, but when there is no finish area.
    game_ended_without_fa: "Этап завершен.",
    // An info / error popup. Taking the picture failed for some reason.
    picture_failed: "Снимок не сделан. Повторите попытку.",
    // An info popup if you have been kicked out of the activity
    kicked_out_of_game: "Вы сняты с этапа.",
    // Exit prompt popup after clicking back button
    exit_confirm : "Продолжить этот этап?",
    // Button to continue the activity
    continue_button : "Продолжить этап",
    // Button for exiting the application
    exit_button : "Завершить приложение",
    // Button to quit this activity
    finish_this_game : "Завершить этот этап",
    // Second prompt for quitting the activity
    finish_this_game_confirmation : "Вы подтверждаете завершение этого этапа?",
    // Button to actually quit the activity and go to the finishedView
    finish_this_game_confirmation_quit : "Завершить этап",
    // Button to continue the activity instead
    finish_this_game_confirmation_cont : "Продолжить этап",
    // Error when trying to join an activity, but the internet connection is not ok
    no_connection : "Подключение отсутствует, повторите попытку."
};


/* 
 * Localization strings for Swedish language
 */

taz.strings_sv = {
		
	// warningDialog
	// WarningDialog, shown when the application starts
	warning : "Varning! Var uppmärksam på omgivningen och trafiken runt omkring dig. Var försiktig så att du inte springer in i saker, andra människor eller djur när du använder ActionTrack.",
	// Option to turn the warning dialog off, so it won't appear on future startups
	doNotShowAgain : "Visa inte igen.",
		
    // showServersView
	// X amount of server found. i.e. "5 servers found".
    servers_found : "servrar hittades.",
    // Select server. Header for the servers list
    select_server : "Välj server",
    // Info popups if unable to join a server. 
    version_not_available : "Serverinformation ej tillgänglig. Det går inte att anslut till en server just nu.",
    version_client_too_old : "Servern kräver en senare version av programmet. Uppdatera programmet för att ansluta till servern.",
    version_server_too_old : "Servern är inte längre kompatibel med programmet som är installerat på enheten.",
    
    // serverDescriptionView
    // After choosing server, you are shown the servers description. This text is used in the button in that view to join the server.
    accept_server : "Anslut",
    
    // showGamesView
    // i.e. "5 activities found."
    games_found : "aktiviteter hittades.",
    // i.e. "1 activity found."
    game_found : "aktivitet hittades.",
    // Join activity. Header for activities list.
    join_game : "Anslut till aktivitet",

    // gameDescriptionView
    // After choosing activity, you are shown the activity's description. This text is used in the button in that view to join the activity.
    accept_game : "Anslut",

    // joinGameView
    // Header for joining the activity. used like: "Welcome to Activity X"
    welcome_to : "Välkommen till",
    // Who are you? Header for text input field where you enter your name / username / teamname
    name_your_team : "Vem är du?",
    // Back button
    back : "Tillbaka",
    // Submit button, used in button to submit the name and to start the activity
    accept : "Skicka",

    // rejoinGameView
    // If you restart the application, and try to join a new activity, and you have previously participitated in another activity, 
    // this is the prompt to make sure you want to actually leave the old activity and start joining a new one
    sure_to_start_new_game : "Du kommer inte att kunna fortsätta med den aktuella aktiviteten. Vill du ansluta till en ny aktivitet?",
        
    // answerView
    // These are shown to the user after answering a task.
    // Full points, PERFECT!
    correct_answer : "PERFEKT!",
    // Partial points, PRETTY GOOD!
    ok_answer : "GANSKA BRA!",
    // Wrong answer, no points, OOPS!
    incorrect_answer : "HOPPSAN!",
    // Try again, in case there is possibility to try a task again, this will be shown in a button
    try_again : "Försök igen",
    // Ok button
    ok : "OK",
    // i.e. "Du fick 100 poäng"
    you_got : "Du fick ",
    points : "poäng",
    // i.e. "Du har 3 försök kvar"
    you_have : "Du har ", 
    attempt_left: " försök kvar", 
    attempts_left: " försök kvar",
    
    //showHintView
    // Shown in a small box indicating when the view is changed to the guiding arrow instead of hint view. i.e. "Switching to guiding arrow in 01:15"
    switching_to_compass: "Växlar till guidepil om",
    // Button to open QR code scanner
    scan_qr_code: "Skanna QR-kod",	
    
    // guideView
    // Distance to target checkpoint. i.e. "120 meters"
    meters : " meter",
    // Warning if you are outside of the activity area, the arrow guides you back to activity area.
    outside_game_area : "Du är utanför gränsen. Följ pilen.",
    // Warning if you are in a forbidden zone, the arrow guides you back to activity area.
    forbidden_zone : "Du är i en förbjuden zon. Följ pilen.",
    // Information in the start of the activity, if the team is required to move to the start area before beginning.
	goto_start_area : "Följ pilen till startområdet.",
	// Similiar to switching_to_compass. i.e. "Time left to reach the checkpoint: 01:15"
    time_left : "Kvarvarande tid att nå kontrollplatsen:",
    
    // mapView
    // Button used to set a checkpoint as a target
    set_as_target: "Ange som mål",
    // Activate button in case the checkpoint is floating one, that starts instantly when you click this button (replaces the "set as target" button)
    activate: "Aktivera",
    // Popup text when you have walked into a checkpoint that is not your primary target
    in_radius_of_another_cp: "Kontrollplats hittad!",
    // Popup text when you have walked into a checkpoint that is hidden/secret
    in_radius_of_discovery_cp: "Dold kontrollplats hittad!",
    // Prompt about going to the checkpoint, shown under the previous texts.
    goto_non_target_cp: "Vill du aktivera kontrollplatsen?",
    
	// queueView
    // Shown when queue is enabled, the players should form a queue and wait for the supervisor that is present at the checkpoint to come and let them to the checkpoint
	checkpoint_full : "Ställ dig i kö och vänta på handledaren.",
	
    // taskView
	// Continue button, used in tasks that don't have any questions, just information. You can continue forward on the trail by clicking this.
    continue_str : "Fortsätt",
    // Pass / give up button to pass the current task and move on with the trail.
    give_up : "Pass",
    // Submit button for sending the answer(s) after the team has answered the questions.
    submit : "Skicka",
    // Take picture button for tasks that have a task that requires a picture to be taken. Opens camera.
    take_picture : "Ta bild",
    // If the tasks time runs out, you will be shown this in popup and you will be forced to submit your answer at it's current state automatically.
    task_time_expired : "Hoppsan! Tiden tog slut.",
    // Header text for points available from the current task
    indicator_points : "Poäng",
    // Header text for time left to answer the task
    indicator_time : "Tid",
    
    // checkAnswersView
    // Button that takes you to the unlock view, from where you can unlock the supervisor view, to evaluate the current task.
    give_phone_button : "Lås upp",
    // Info text above previous button, that tells the player to give the device to the supervisor
    give_phone : "Ge din mobila enhet till handledaren.",
    // Header for supervisor password input field in the unlock view
    superpasswd : "Handledarlösenord:",
    // Unlock button after entering the password
    unlock : "Lås upp",
    // Header for the picture the team took when in the evaluating view
    teams_picture : "Skickad bild:",
    // Header for the picture that shows what the answer was supposed to be like, in the evaluating view
    correct_picture : "Referensbild:",
    // Header for player/user answer in the evaluating view, in other cases than picture
    team : "Användare:",
    // Header for the correct answer in the evaluating view, in other cases than picture
    correct : "Korrekt:",
    // Points to give to the team in the evaluating view. Used like: "Points (0-100)". Used as header/label for the points input field
    given_points : "Poäng",
    // Submit points button under the previous field
    submit_points : "Skicka poäng",
    
    // Popup after submitting an answer in case it was submitted for the admin to check and evaluate later.
    answer_sent_for_check : "Svar skickat för poängräkning.",
	
    // finishedView
    // After the activity has finished, these are shown
    // Headers in the scorelist. Username, Points gained, Finished (yes/no)
    fteam : "Användare",
    fpoints : "Poäng",
    finished : "Klar",
    // Finished texts, yes / no
    yes : "Ja",
    no : "Nej",
    // In finishedView, a button that lets you quit from this activity, and return to the main menu
    main_menu : "Avsluta aktivitet",
    // Prompt when quitting the activity, you won't be able to return into this finishedView anymore
    sure_to_exit_game : "Du kan inte återgå till den här skärmen. Vill du avsluta?",
    // Info text in the finished view stating, that all your answers have been sent to the server and you may now close the application.
    you_may_now_close : "Du kan nu stänga programmet.",
    // Info text in case you still have unsent answers. Used like: 
    // "Results from 3 tasks are being uploaded. If the count does not decrease in two minutes, check your internet connection."
    warning_you_have : "Resultat från ",
    warning_unsent_answers : " uppgifter laddas upp.",
    warning_connection : "Kontrollera din Internetanslutning om antalet inte minskar inom två minuter.",
    // Refresh button for refreshing the scores list
    refresh_list : "Uppdatera",
    
	//rejoinGameView
    // When restarting the application, and a still ongoing activity is found from memory, prompt if user wants to rejoin that
	rejoin_header : "Vad vill du göra?",
	// Continue current activity button
	continue_previous_game : "Fortsätt med aktuell aktivitet",
	// Join new activity button
    join_new_game : "Anslut till ny aktivitet",
    
    // adminView
    // Header for admin settings view
    adminView_header : "Admininställningar",
    // Header for text field indicating the currently set default server
    adminView_current_server : "Aktuell standardserver",
    // Header for the server list used to change the default server
    adminView_new_server : "Välj ny standardserver",
    // Save settings button
    adminView_save_settings : "Spara inställningar",
    // Clear the default server button
    adminView_clear_server : "Rensa server",
    
    // onDemandsLeftView
    // When the game is coming to end, but you still have on-demand tasks that you may do before finishing, this is the info text shown on the screen.
    onDemandsLeftView_text : "Du har fortfarande tillgängliga uppgifter. Du kan komma åt dem innan du avslutar.",
    
    // header
    // In-game header label texts. i.e. "POINTS: 100     POSITION: 5/8    TRAVELED: 100m"
    head_points : "POÄNG: ",
    head_position : "POSITION: ",
    traveled: "STRÄCKA: ",
        
    // chat
    // Send chat message button
    send : "Skicka",
    // Name for the admin used in chat when he/she writes a message to the players
    game_master : "Ledare",
    // Info text if there are yet no messages in the chat
    no_messages : "Inga meddelanden. Använd rutan nedan för att skicka ett meddelande till ledaren.",
    
    // dialogs and messages
    // Label for password field in popups where we request some password
    enter_passcode : "Ange lösenord:",
    // Popup text for incorrect password
    wrong_password: "Felaktigt lösenord",
    // Close button for popups
    close : "Stäng",
    // Popup when the system is calculating the next checkpoint
    calculating_next_cp : "Beräknar nästa kontrollplats...",
    // Prompt after clicking the pass button when doing task.
    give_up_dialog : "Vill du passa? Om du passar får du inga poäng.",
    // Popup when the system is loading something
    loading : "Läser in...",
    // Popup when entering a checkpoint, that has plus or minus points for entering it.
    // i.e. "You were awarded 100 points for arriving at this checkpoint" or "You were deducted 100 points..."
    // you_got_points + " " + POINTS_NUMBER + " " + points + for_arriving
	you_got_points : "Du fick",
	you_lost_points : "Du fick ett avdrag på",
	for_arriving : " för den här kontrollplatsen.",
	// Popup for timeout when moving to next checkpoint, when there was a time limit and you didn't make it
    route_timer_timeout : "Du misslyckades att nå kontrollplatsen i tid.",
    // Sending points popup, a loading dialog when the system sends the points.
    sending_points : "Skickar poäng.",
    // Sending the answer popup, a loading dialog when the system send the answer.
    sending_answer : "Skickar svaret.",
    // A loading dialog when the system is looking for servers.
    finding_servers : "Söker efter servrar.",
    // A loading dialog when the system is looking for activities.
    finding_games : "Söker efter aktiviteter i området.",
    // A loading dialog when the system is trying to join the activity
    joining_game : "Ansluter till aktiviteten ",
    // Error dialog, if you entered a name that was already in use in this activity
    name_in_use : "Namnet används redan. Prova med ett annat namn.",
    // Error dialog, if you tried to join the same activity multiple times
    already_joined : "Redan ansluten",
    // A loading dialog when the system loads the activity. i.e. "Loading the activity TAZ Test Track"
	loading_game : "Läser in aktiviteten ",
	// A loading dialog when the system loads the custom map. i.e. "Loading the map 5%"
	loading_map: "Läser in kartan",
	// A loading dialog when the system waits for GPS fix
    waiting_gps : "Väntar på GPS-platsinformation.",
    // A popup when you have reached the finish area
    reached_finish : "Du har nått målområdet.",
    // An info text when the ranking list is not yet shown because we are loading it still
    fetching_rankings : "Hämtar rankinglistan.",
    // Cancel button
    cancel : "Avbryt",
    // An info popup, after the last task is done and the team is guided to finish area.
    that_was_last_cp : "Det var sista kontrollplatsen. Fortsätt till målområdet.",
    // Same as previous, but when there is no finish area.
    last_cp_game_ended : "Det var sista kontrollplatsen. Grattis! Aktivitet slutförd.",
    // An info popup when the activity time runs out and there is a finish area.
    game_ended_with_fa: "Aktiviteten har slutförts. Fortsätt till målområdet.",
    // Same as previous, but when there is no finish area.
    game_ended_without_fa: "Aktiviteten har slutförts.",
    // An info / error popup. Taking the picture failed for some reason.
    picture_failed: "Bilden togs inte. Försök igen.",
    // An info popup if you have been kicked out of the activity
    kicked_out_of_game: "Du har tagits bort från aktiviteten.",
    // Exit prompt popup after clicking back button
    exit_confirm : "Vill du fortsätta med aktiviteten?",
    // Button to continue the activity
    continue_button : "Fortsätt med aktiviteten",
    // Button for exiting the application
    exit_button : "Avsluta programmet",
    // Button to quit this activity
    finish_this_game : "Avsluta aktiviteten",
    // Second prompt for quitting the activity
    finish_this_game_confirmation : "Vill du avsluta den här aktiviteten?",
    // Button to actually quit the activity and go to the finishedView
    finish_this_game_confirmation_quit : "Avsluta aktivitet",
    // Button to continue the activity instead
    finish_this_game_confirmation_cont : "Fortsätt med aktiviteten",
    // Error when trying to join an activity, but the internet connection is not ok
    no_connection : "Ingen anslutning. Försök igen."
};


/* 
 * Localization strings for Norwegian language
 */

taz.strings_nb = {
		
	// warningDialog
	// WarningDialog, shown when the application starts
	warning : "Forsiktig! Følg med på bakkeforholdene og trafikken. Pass på at du ikke kolliderer med ting, folk eller dyr mens du har det gøy med ActionTrack.",
	// Option to turn the warning dialog off, so it won't appear on future startups
	doNotShowAgain : "Ikke vis dette igjen.",
		
    // showServersView
	// X amount of server found. i.e. "5 servers found".
    servers_found : "servere funnet.",
    // Select server. Header for the servers list
    select_server : "Velg server",
    // Info popups if unable to join a server. 
    version_not_available : "Serverinformasjon er ikke tilgjengelig. Kan ikke koble til en server nå.",
    version_client_too_old : "Denne serveren krever en nyere versjon av appen. Oppdater appen for å koble til denne serveren.",
    version_server_too_old : "Denne serveren er ikke lenger kompatibel med appen som er installert på enheten din.",
    
    // serverDescriptionView
    // After choosing server, you are shown the servers description. This text is used in the button in that view to join the server.
    accept_server : "Koble til",
    
    // showGamesView
    // i.e. "5 activities found."
    games_found : "aktiviteter funnet.",
    // i.e. "1 activity found."
    game_found : "aktivitet funnet.",
    // Join activity. Header for activities list.
    join_game : "Bli med på aktivitet",

    // gameDescriptionView
    // After choosing activity, you are shown the activity's description. This text is used in the button in that view to join the activity.
    accept_game : "Bli med",

    // joinGameView
    // Header for joining the activity. used like: "Welcome to Activity X"
    welcome_to : "Velkommen til",
    // Who are you? Header for text input field where you enter your name / username / teamname
    name_your_team : "Hvem er du?",
    // Back button
    back : "Tilbake",
    // Submit button, used in button to submit the name and to start the activity
    accept : "Send inn",

    // rejoinGameView
    // If you restart the application, and try to join a new activity, and you have previously participitated in another activity, 
    // this is the prompt to make sure you want to actually leave the old activity and start joining a new one
    sure_to_start_new_game : "Du kan ikke fortsette med aktiviteten du holder på med nå. Er du sikker på at du vil bli med på en ny aktivitet?",
        
    // answerView
    // These are shown to the user after answering a task.
    // Full points, PERFECT!
    correct_answer : "PERFEKT!",
    // Partial points, PRETTY GOOD!
    ok_answer : "IKKE VERST!",
    // Wrong answer, no points, OOPS!
    incorrect_answer : "UFF DA!",
    // Try again, in case there is possibility to try a task again, this will be shown in a button
    try_again : "Prøv på nytt",
    // Ok button
    ok : "OK",
    // i.e. "Du fikk 100 poeng"
    you_got : "Du fikk ",
    points : "poeng",
    // i.e. "Du har tre forsøk igjen."
    you_have : "Du har ", 
    attempt_left: " forsøk igjen", 
    attempts_left: " forsøk igjen",
    
    //showHintView
    // Shown in a small box indicating when the view is changed to the guiding arrow instead of hint view. i.e. "Switching to guiding arrow in 01:15"
    switching_to_compass: "Bytter til pil om",
    // Button to open QR code scanner
    scan_qr_code: "Skann QR-kode",	
    
    // guideView
    // Distance to target checkpoint. i.e. "120 meters"
    meters : " meter",
    // Warning if you are outside of the activity area, the arrow guides you back to activity area.
    outside_game_area : "Du er utenfor tillatt område, følg pilen.",
    // Warning if you are in a forbidden zone, the arrow guides you back to activity area.
    forbidden_zone : "Du er i forbudt område, følg pilen.",
    // Information in the start of the activity, if the team is required to move to the start area before beginning.
	goto_start_area : "Følg pilen til startområdet.",
	// Similiar to switching_to_compass. i.e. "Time left to reach the checkpoint: 01:15"
    time_left : "Tid igjen til å nå kontrollpunktet:",
    
    // mapView
    // Button used to set a checkpoint as a target
    set_as_target: "Angi som mål",
    // Activate button in case the checkpoint is floating one, that starts instantly when you click this button (replaces the "set as target" button)
    activate: "Aktiver",
    // Popup text when you have walked into a checkpoint that is not your primary target
    in_radius_of_another_cp: "Fant kontrollpunkt!",
    // Popup text when you have walked into a checkpoint that is hidden/secret
    in_radius_of_discovery_cp: "Fant skjult kontrollpunkt!",
    // Prompt about going to the checkpoint, shown under the previous texts.
    goto_non_target_cp: "Vil du aktivere dette kontrollpunktet?",
    
	// queueView
    // Shown when queue is enabled, the players should form a queue and wait for the supervisor that is present at the checkpoint to come and let them to the checkpoint
	checkpoint_full : "Still deg i kø og vent på kontrolløren.",
	
    // taskView
	// Continue button, used in tasks that don't have any questions, just information. You can continue forward on the trail by clicking this.
    continue_str : "Fortsett",
    // Pass / give up button to pass the current task and move on with the trail.
    give_up : "Stå over",
    // Submit button for sending the answer(s) after the team has answered the questions.
    submit : "Send inn",
    // Take picture button for tasks that have a task that requires a picture to be taken. Opens camera.
    take_picture : "Ta bilde",
    // If the tasks time runs out, you will be shown this in popup and you will be forced to submit your answer at it's current state automatically.
    task_time_expired : "Uff da! Du slapp opp for tid.",
    // Header text for points available from the current task
    indicator_points : "Poeng",
    // Header text for time left to answer the task
    indicator_time : "Tid",
    
    // checkAnswersView
    // Button that takes you to the unlock view, from where you can unlock the supervisor view, to evaluate the current task.
    give_phone_button : "Lås opp",
    // Info text above previous button, that tells the player to give the device to the supervisor
    give_phone : "Gi mobilenheten din til kontrolløren.",
    // Header for supervisor password input field in the unlock view
    superpasswd : "Kontrollørpassord:",
    // Unlock button after entering the password
    unlock : "Lås opp",
    // Header for the picture the team took when in the evaluating view
    teams_picture : "Innsendt bilde:",
    // Header for the picture that shows what the answer was supposed to be like, in the evaluating view
    correct_picture : "Referansebilde:",
    // Header for player/user answer in the evaluating view, in other cases than picture
    team : "Bruker:",
    // Header for the correct answer in the evaluating view, in other cases than picture
    correct : "Riktig:",
    // Points to give to the team in the evaluating view. Used like: "Points (0-100)". Used as header/label for the points input field
    given_points : "Poeng",
    // Submit points button under the previous field
    submit_points : "Send inn poeng",
    
    // Popup after submitting an answer in case it was submitted for the admin to check and evaluate later.
    answer_sent_for_check : "Svar sendt til retting.",
	
    // finishedView
    // After the activity has finished, these are shown
    // Headers in the scorelist. Username, Points gained, Finished (yes/no)
    fteam : "Bruker",
    fpoints : "Poeng",
    finished : "Ferdig",
    // Finished texts, yes / no
    yes : "Ja",
    no : "Nei",
    // In finishedView, a button that lets you quit from this activity, and return to the main menu
    main_menu : "Avslutt aktivitet",
    // Prompt when quitting the activity, you won't be able to return into this finishedView anymore
    sure_to_exit_game : "Du kan ikke gå tilbake til denne skjermen. Er du sikker på at du vil avslutte?",
    // Info text in the finished view stating, that all your answers have been sent to the server and you may now close the application.
    you_may_now_close : "Nå kan du lukke appen.",
    // Info text in case you still have unsent answers. Used like: 
    // "Results from 3 tasks are being uploaded. If the count does not decrease in two minutes, check your internet connection."
    warning_you_have : "Resultater fra ",
    warning_unsent_answers : " oppgaver blir lastet opp.",
    warning_connection : "Hvis antallet ikke synker i løpet av to minutter, bør du kontrollere Internett-tilkoblingen.",
    // Refresh button for refreshing the scores list
    refresh_list : "Oppdater",
    
	//rejoinGameView
    // When restarting the application, and a still ongoing activity is found from memory, prompt if user wants to rejoin that
	rejoin_header : "Hva vil du gjøre?",
	// Continue current activity button
	continue_previous_game : "Fortsette gjeldende aktivitet",
	// Join new activity button
    join_new_game : "Bli med på ny aktivitet",
    
    // adminView
    // Header for admin settings view
    adminView_header : "Administratorinnstillinger",
    // Header for text field indicating the currently set default server
    adminView_current_server : "Gjeldende standardserver",
    // Header for the server list used to change the default server
    adminView_new_server : "Velg ny standardserver",
    // Save settings button
    adminView_save_settings : "Lagre innstillinger",
    // Clear the default server button
    adminView_clear_server : "Slett server",
    
    // onDemandsLeftView
    // When the game is coming to end, but you still have on-demand tasks that you may do before finishing, this is the info text shown on the screen.
    onDemandsLeftView_text : "Du har fortsatt behovsbaserte oppgaver tilgjengelige. Du kan åpne dem før du avslutter.",
    
    // header
    // In-game header label texts. i.e. "POINTS: 100     POSITION: 5/8    TRAVELED: 100m"
    head_points : "POENG: ",
    head_position : "PLASSERING: ",
    traveled: "TILBAKELAGT: ",
        
    // chat
    // Send chat message button
    send : "Send",
    // Name for the admin used in chat when he/she writes a message to the players
    game_master : "Organisator",
    // Info text if there are yet no messages in the chat
    no_messages : "Ingen meldinger ennå. Bruk feltet nedenfor for å sende en melding til organisatoren.",
    
    // dialogs and messages
    // Label for password field in popups where we request some password
    enter_passcode : "Skriv inn passord:",
    // Popup text for incorrect password
    wrong_password: "Feil passord",
    // Close button for popups
    close : "Lukk",
    // Popup when the system is calculating the next checkpoint
    calculating_next_cp : "Avgjør det neste kontrollpunktet ditt ...",
    // Prompt after clicking the pass button when doing task.
    give_up_dialog : "Er du sikker på at du vil stå over? Hvis du gjør det, får du ingen poeng!",
    // Popup when the system is loading something
    loading : "Laster inn ...",
    // Popup when entering a checkpoint, that has plus or minus points for entering it.
    // i.e. "You were awarded 100 points for arriving at this checkpoint" or "You were deducted 100 points..."
    // you_got_points + " " + POINTS_NUMBER + " " + points + for_arriving
	you_got_points : "Du fikk",
	you_lost_points : "Du ble trukket",
	for_arriving : " for å komme til dette kontrollpunktet.",
	// Popup for timeout when moving to next checkpoint, when there was a time limit and you didn't make it
    route_timer_timeout : "Du kom for sent til kontrollpunktet.",
    // Sending points popup, a loading dialog when the system sends the points.
    sending_points : "Sender poeng.",
    // Sending the answer popup, a loading dialog when the system send the answer.
    sending_answer : "Sender svaret.",
    // A loading dialog when the system is looking for servers.
    finding_servers : "Søker etter servere.",
    // A loading dialog when the system is looking for activities.
    finding_games : "Søker etter aktiviteter i området.",
    // A loading dialog when the system is trying to join the activity
    joining_game : "Blir med på aktiviteten ",
    // Error dialog, if you entered a name that was already in use in this activity
    name_in_use : "Navnet er allerede i bruk. Prøv et annet.",
    // Error dialog, if you tried to join the same activity multiple times
    already_joined : "Allerede med",
    // A loading dialog when the system loads the activity. i.e. "Loading the activity TAZ Test Track"
	loading_game : "Laster inn aktiviteten ",
	// A loading dialog when the system loads the custom map. i.e. "Loading the map 5%"
	loading_map: "Laster inn kartet",
	// A loading dialog when the system waits for GPS fix
    waiting_gps : "Venter på informasjon om GPS-posisjon.",
    // A popup when you have reached the finish area
    reached_finish : "Du har nådd målområdet.",
    // An info text when the ranking list is not yet shown because we are loading it still
    fetching_rankings : "Henter rangeringslisten.",
    // Cancel button
    cancel : "Avbryt",
    // An info popup, after the last task is done and the team is guided to finish area.
    that_was_last_cp : "Det var det siste kontrollpunktet. Gå til målområdet.",
    // Same as previous, but when there is no finish area.
    last_cp_game_ended : "Det var det siste kontrollpunktet. Gratulerer, aktiviteten er ferdig!",
    // An info popup when the activity time runs out and there is a finish area.
    game_ended_with_fa: "Aktiviteten er ferdig. Gå til målområdet.",
    // Same as previous, but when there is no finish area.
    game_ended_without_fa: "Aktiviteten er ferdig.",
    // An info / error popup. Taking the picture failed for some reason.
    picture_failed: "Det ble ikke tatt bilde. Prøv på nytt.",
    // An info popup if you have been kicked out of the activity
    kicked_out_of_game: "Du er fjernet fra aktiviteten.",
    // Exit prompt popup after clicking back button
    exit_confirm : "Vil du fortsette denne aktiviteten?",
    // Button to continue the activity
    continue_button : "Fortsett aktiviteten",
    // Button for exiting the application
    exit_button : "Avslutt appen",
    // Button to quit this activity
    finish_this_game : "Avslutt denne aktiviteten",
    // Second prompt for quitting the activity
    finish_this_game_confirmation : "Er du sikker på at du vil avslutte denne aktiviteten?",
    // Button to actually quit the activity and go to the finishedView
    finish_this_game_confirmation_quit : "Avslutt aktiviteten",
    // Button to continue the activity instead
    finish_this_game_confirmation_cont : "Fortsett aktiviteten",
    // Error when trying to join an activity, but the internet connection is not ok
    no_connection : "Ingen tilkobling, prøv på nytt."
};


/* 
 * Localization strings for Danish language
 */

taz.strings_da = {
		
	// warningDialog
	// WarningDialog, shown when the application starts
	warning : "Advarsel! Vær opmærksom på vejforhold og trafikken. Løb ikke ind i ting, andre mennesker eller dyr, mens du bruger ActionTrack.",
	// Option to turn the warning dialog off, so it won't appear on future startups
	doNotShowAgain : "Vis ikke igen.",
		
    // showServersView
	// X amount of server found. i.e. "5 servers found".
    servers_found : "servere blev fundet.",
    // Select server. Header for the servers list
    select_server : "Vælg server",
    // Info popups if unable to join a server. 
    version_not_available : "Serveroplysninger er ikke tilgængelige. Der kan ikke oprettes forbindelse til serveren lige nu.",
    version_client_too_old : "Denne server kræver en nyere version af appen. Opdater appen for at oprette forbindelse til serveren.",
    version_server_too_old : "Serveren er ikke længere kompatibel med den app, der er installeret på din enhed.",
    
    // serverDescriptionView
    // After choosing server, you are shown the servers description. This text is used in the button in that view to join the server.
    accept_server : "Deltag",
    
    // showGamesView
    // i.e. "5 activities found."
    games_found : "aktiviteter blev fundet.",
    // i.e. "1 activity found."
    game_found : "aktivitet blev fundet.",
    // Join activity. Header for activities list.
    join_game : "Deltag i aktivitet",

    // gameDescriptionView
    // After choosing activity, you are shown the activity's description. This text is used in the button in that view to join the activity.
    accept_game : "Opret forbindelse",

    // joinGameView
    // Header for joining the activity. used like: "Welcome to Activity X"
    welcome_to : "Velkommen til",
    // Who are you? Header for text input field where you enter your name / username / teamname
    name_your_team : "Hvem er du?",
    // Back button
    back : "Tilbage",
    // Submit button, used in button to submit the name and to start the activity
    accept : "Send",

    // rejoinGameView
    // If you restart the application, and try to join a new activity, and you have previously participitated in another activity, 
    // this is the prompt to make sure you want to actually leave the old activity and start joining a new one
    sure_to_start_new_game : "Du kan ikke fortsætte den aktuelle aktivitet. Er du sikker på, at du vil deltage i en ny aktivitet?",
        
    // answerView
    // These are shown to the user after answering a task.
    // Full points, PERFECT!
    correct_answer : "PERFEKT!",
    // Partial points, PRETTY GOOD!
    ok_answer : "RIGTIG GODT!",
    // Wrong answer, no points, OOPS!
    incorrect_answer : "HOVSA!",
    // Try again, in case there is possibility to try a task again, this will be shown in a button
    try_again : "Prøv igen",
    // Ok button
    ok : "OK",
    // i.e. "Du fik 100 points"
    you_got : "Du fik ",
    points : "points",
    // i.e. "Du har 3 forsøg tilbage"
    you_have : "Du har ", 
    attempt_left: " forsøg tilbage", 
    attempts_left: " forsøg tilbage",
    
    //showHintView
    // Shown in a small box indicating when the view is changed to the guiding arrow instead of hint view. i.e. "Switching to guiding arrow in 01:15"
    switching_to_compass: "Skifter til guidepil om",
    // Button to open QR code scanner
    scan_qr_code: "Scan QR-kode",	
    
    // guideView
    // Distance to target checkpoint. i.e. "120 meters"
    meters : " meter",
    // Warning if you are outside of the activity area, the arrow guides you back to activity area.
    outside_game_area : "Du er på afveje. Følg pilen.",
    // Warning if you are in a forbidden zone, the arrow guides you back to activity area.
    forbidden_zone : "Du befinder dig i et forbudt område. Følg pilen.",
    // Information in the start of the activity, if the team is required to move to the start area before beginning.
	goto_start_area : "Følg pilen til startområdet.",
	// Similiar to switching_to_compass. i.e. "Time left to reach the checkpoint: 01:15"
    time_left : "Tid, til du skal nå kontrolstedet:",
    
    // mapView
    // Button used to set a checkpoint as a target
    set_as_target: "Angiv som mål",
    // Activate button in case the checkpoint is floating one, that starts instantly when you click this button (replaces the "set as target" button)
    activate: "Aktivér",
    // Popup text when you have walked into a checkpoint that is not your primary target
    in_radius_of_another_cp: "Kontrolsted fundet!",
    // Popup text when you have walked into a checkpoint that is hidden/secret
    in_radius_of_discovery_cp: "Skjult kontrolsted fundet!",
    // Prompt about going to the checkpoint, shown under the previous texts.
    goto_non_target_cp: "Vil du aktivere dette kontrolsted?",
    
	// queueView
    // Shown when queue is enabled, the players should form a queue and wait for the supervisor that is present at the checkpoint to come and let them to the checkpoint
	checkpoint_full : "Dan en kø, og vent på vejlederen.",
	
    // taskView
	// Continue button, used in tasks that don't have any questions, just information. You can continue forward on the trail by clicking this.
    continue_str : "Fortsæt",
    // Pass / give up button to pass the current task and move on with the trail.
    give_up : "Spring over",
    // Submit button for sending the answer(s) after the team has answered the questions.
    submit : "Send",
    // Take picture button for tasks that have a task that requires a picture to be taken. Opens camera.
    take_picture : "Tag billede",
    // If the tasks time runs out, you will be shown this in popup and you will be forced to submit your answer at it's current state automatically.
    task_time_expired : "Hovsa! Der er ikke mere tid tilbage.",
    // Header text for points available from the current task
    indicator_points : "Points",
    // Header text for time left to answer the task
    indicator_time : "Tid",
    
    // checkAnswersView
    // Button that takes you to the unlock view, from where you can unlock the supervisor view, to evaluate the current task.
    give_phone_button : "Lås op",
    // Info text above previous button, that tells the player to give the device to the supervisor
    give_phone : "Giv din mobilenhed til vejlederen.",
    // Header for supervisor password input field in the unlock view
    superpasswd : "Adgangskode for vejleder:",
    // Unlock button after entering the password
    unlock : "Lås op",
    // Header for the picture the team took when in the evaluating view
    teams_picture : "Indsendt billede:",
    // Header for the picture that shows what the answer was supposed to be like, in the evaluating view
    correct_picture : "Referencebillede:",
    // Header for player/user answer in the evaluating view, in other cases than picture
    team : "Bruger:",
    // Header for the correct answer in the evaluating view, in other cases than picture
    correct : "Korrekt:",
    // Points to give to the team in the evaluating view. Used like: "Points (0-100)". Used as header/label for the points input field
    given_points : "Points",
    // Submit points button under the previous field
    submit_points : "Send points",
    
    // Popup after submitting an answer in case it was submitted for the admin to check and evaluate later.
    answer_sent_for_check : "Svar sendt til optælling.",
	
    // finishedView
    // After the activity has finished, these are shown
    // Headers in the scorelist. Username, Points gained, Finished (yes/no)
    fteam : "Bruger",
    fpoints : "Points",
    finished : "Færdig",
    // Finished texts, yes / no
    yes : "Ja",
    no : "Nej",
    // In finishedView, a button that lets you quit from this activity, and return to the main menu
    main_menu : "Afslut aktivitet",
    // Prompt when quitting the activity, you won't be able to return into this finishedView anymore
    sure_to_exit_game : "Du kan ikke vende tilbage til denne skærm. Er du sikker på, at du vil afslutte?",
    // Info text in the finished view stating, that all your answers have been sent to the server and you may now close the application.
    you_may_now_close : "Nu kan du lukke appen.",
    // Info text in case you still have unsent answers. Used like: 
    // "Results from 3 tasks are being uploaded. If the count does not decrease in two minutes, check your internet connection."
    warning_you_have : "Resultater fra ",
    warning_unsent_answers : " opgaver uploades.",
    warning_connection : "Hvis tallet ikke reduceres inden for to minutter, skal du kontrollere din internetforbindelse.",
    // Refresh button for refreshing the scores list
    refresh_list : "Opdater",
    
	//rejoinGameView
    // When restarting the application, and a still ongoing activity is found from memory, prompt if user wants to rejoin that
	rejoin_header : "Hvad vil du?",
	// Continue current activity button
	continue_previous_game : "Fortsæt aktuel aktivitet",
	// Join new activity button
    join_new_game : "Deltag i ny aktivitet",
    
    // adminView
    // Header for admin settings view
    adminView_header : "Indstillinger for administratorer",
    // Header for text field indicating the currently set default server
    adminView_current_server : "Aktuel standardserver",
    // Header for the server list used to change the default server
    adminView_new_server : "Vælg ny standardserver",
    // Save settings button
    adminView_save_settings : "Gem indstillinger",
    // Clear the default server button
    adminView_clear_server : "Ryd server",
    
    // onDemandsLeftView
    // When the game is coming to end, but you still have on-demand tasks that you may do before finishing, this is the info text shown on the screen.
    onDemandsLeftView_text : "Der er stadig tilgængelige opgaver. Du kan åbne dem, før du afslutter.",
    
    // header
    // In-game header label texts. i.e. "POINTS: 100     POSITION: 5/8    TRAVELED: 100m"
    head_points : "POINTS: ",
    head_position : "POSITION: ",
    traveled: "TILBAGELAGT: ",
        
    // chat
    // Send chat message button
    send : "Send",
    // Name for the admin used in chat when he/she writes a message to the players
    game_master : "Arrangør",
    // Info text if there are yet no messages in the chat
    no_messages : "Ingen beskeder. Brug feltet nedenfor til at sende en besked til arrangøren.",
    
    // dialogs and messages
    // Label for password field in popups where we request some password
    enter_passcode : "Angiv adgangskode:",
    // Popup text for incorrect password
    wrong_password: "Forkert adgangskode",
    // Close button for popups
    close : "Luk",
    // Popup when the system is calculating the next checkpoint
    calculating_next_cp : "Fastlægger næste kontrolsted...",
    // Prompt after clicking the pass button when doing task.
    give_up_dialog : "Er du sikker på, at du vil springe over? Du får ikke nogen points!",
    // Popup when the system is loading something
    loading : "Indlæser..",
    // Popup when entering a checkpoint, that has plus or minus points for entering it.
    // i.e. "You were awarded 100 points for arriving at this checkpoint" or "You were deducted 100 points..."
    // you_got_points + " " + POINTS_NUMBER + " " + points + for_arriving
	you_got_points : "Du har fået en præmie",
	you_lost_points : "Du har mistet",
	for_arriving : " for at komme til kontrolstedet.",
	// Popup for timeout when moving to next checkpoint, when there was a time limit and you didn't make it
    route_timer_timeout : "Du nåede ikke kontrolstedet i tide:",
    // Sending points popup, a loading dialog when the system sends the points.
    sending_points : "Sender points.",
    // Sending the answer popup, a loading dialog when the system send the answer.
    sending_answer : "Sender svaret.",
    // A loading dialog when the system is looking for servers.
    finding_servers : "Finder servere.",
    // A loading dialog when the system is looking for activities.
    finding_games : "Finder aktiviteter i nærheden.",
    // A loading dialog when the system is trying to join the activity
    joining_game : "Deltag i aktiviteten ",
    // Error dialog, if you entered a name that was already in use in this activity
    name_in_use : "Navnet er taget. Prøv et andet navn.",
    // Error dialog, if you tried to join the same activity multiple times
    already_joined : "Deltager allerede",
    // A loading dialog when the system loads the activity. i.e. "Loading the activity TAZ Test Track"
	loading_game : "Indlæser aktiviteten ",
	// A loading dialog when the system loads the custom map. i.e. "Loading the map 5%"
	loading_map: "Indlæser kortet",
	// A loading dialog when the system waits for GPS fix
    waiting_gps : "Venter på GPS-position.",
    // A popup when you have reached the finish area
    reached_finish : "Du har nået målområdet.",
    // An info text when the ranking list is not yet shown because we are loading it still
    fetching_rankings : "Henter resultatlisten.",
    // Cancel button
    cancel : "Annuller",
    // An info popup, after the last task is done and the team is guided to finish area.
    that_was_last_cp : "Det var det sidste kontrolsted. Fortsæt til målområdet.",
    // Same as previous, but when there is no finish area.
    last_cp_game_ended : "Det var det sidste kontrolsted. Tillykke! Aktiviteten er slut!",
    // An info popup when the activity time runs out and there is a finish area.
    game_ended_with_fa: "Aktiviteten er slut. Fortsæt til målområdet.",
    // Same as previous, but when there is no finish area.
    game_ended_without_fa: "Aktiviteten er slut.",
    // An info / error popup. Taking the picture failed for some reason.
    picture_failed: "Billedet blev ikke taget. Prøv igen.",
    // An info popup if you have been kicked out of the activity
    kicked_out_of_game: "Du er smidt ud af aktiviteten.",
    // Exit prompt popup after clicking back button
    exit_confirm : "Vil du fortsætte denne aktivitet?",
    // Button to continue the activity
    continue_button : "Fortsæt aktivitet",
    // Button for exiting the application
    exit_button : "Luk app",
    // Button to quit this activity
    finish_this_game : "Afslut denne aktivitet",
    // Second prompt for quitting the activity
    finish_this_game_confirmation : "Er du sikker på, at du vil afslutte denne aktivitet?",
    // Button to actually quit the activity and go to the finishedView
    finish_this_game_confirmation_quit : "Afslut aktivitet",
    // Button to continue the activity instead
    finish_this_game_confirmation_cont : "Fortsæt aktivitet",
    // Error when trying to join an activity, but the internet connection is not ok
    no_connection : "Ingen forbindelse. Prøv igen."
};


/*
 * @global public
 */
taz.strings = taz.strings_en;
var langCode = navigator.userAgent.match(/([a-z]{2})-[a-z]{2}/);
if(langCode != null && langCode.length > 1 && langCode[1] == "ar") {
	taz.strings = _.defaults(taz.strings_ar, taz.strings_en);
}
if(langCode != null && langCode.length > 1 && langCode[1] == "da") {
	taz.strings = _.defaults(taz.strings_da, taz.strings_en);
}
if(langCode != null && langCode.length > 1 && langCode[1] == "de") {
	taz.strings = _.defaults(taz.strings_de, taz.strings_en);
}
if(langCode != null && langCode.length > 1 && langCode[1] == "fi") {
	taz.strings = _.defaults(taz.strings_fi, taz.strings_en);
}
if(langCode != null && langCode.length > 1 && langCode[1] == "fr") {
	taz.strings = _.defaults(taz.strings_fr, taz.strings_en);
}
if(langCode != null && langCode.length > 1 && langCode[1] == "nb") {
	taz.strings = _.defaults(taz.strings_nb, taz.strings_en);
}
if(langCode != null && langCode.length > 1 && langCode[1] == "sv") {
	taz.strings = _.defaults(taz.strings_sv, taz.strings_en);
}
if(langCode != null && langCode.length > 1 && langCode[1] == "zh") {
	taz.strings = _.defaults(taz.strings_zh, taz.strings_en);
}
if(langCode != null && langCode.length > 1 && langCode[1] == "ru") {
	taz.strings = _.defaults(taz.strings_ru, taz.strings_en);
}


/* 
 * Localization strings for German language
 */

taz.strings_de = {
		
	// warningDialog
	// WarningDialog, shown when the application starts
	warning : "Vorsicht! Achten Sie auf die Bodenbedingungen und den Verkehr. Achten Sie darauf, bei Ihrem ActionTrack-Vergnügen keine Menschen, Tiere oder Objekte anzufahren.",
	// Option to turn the warning dialog off, so it won't appear on future startups
	doNotShowAgain : "Nicht erneut anzeigen.",
		
    // showServersView
	// X amount of server found. i.e. "5 servers found".
    servers_found : "Server gefunden.",
    // Select server. Header for the servers list
    select_server : "Server auswählen",
    // Info popups if unable to join a server. 
    version_not_available : "Es sind keine Serverinformationen verfügbar. Zurzeit ist keine Serververbindung möglich.",
    version_client_too_old : "Für diesen Server ist eine neuere Version der Anwendung erforderlich. Aktualisieren Sie die Anwendung, um eine Verbindung zu diesem Server herzustellen.",
    version_server_too_old : "Dieser Server ist nicht mehr mit der auf Ihrem Gerät installierten Anwendung kompatibel.",
    
    // serverDescriptionView
    // After choosing server, you are shown the servers description. This text is used in the button in that view to join the server.
    accept_server : "Teilnehmen",
    
    // showGamesView
    // i.e. "5 activities found."
    games_found : "Aktivitäten gefunden.",
    // i.e. "1 activity found."
    game_found : "Aktivität gefunden.",
    // Join activity. Header for activities list.
    join_game : "An Aktivität teilnehmen",

    // gameDescriptionView
    // After choosing activity, you are shown the activity's description. This text is used in the button in that view to join the activity.
    accept_game : "Teilnehmen",

    // joinGameView
    // Header for joining the activity. used like: "Welcome to Activity X"
    welcome_to : "Willkommen bei",
    // Who are you? Header for text input field where you enter your name / username / teamname
    name_your_team : "Wer sind Sie?",
    // Back button
    back : "Zurück",
    // Submit button, used in button to submit the name and to start the activity
    accept : "Versenden",

    // rejoinGameView
    // If you restart the application, and try to join a new activity, and you have previously participitated in another activity, 
    // this is the prompt to make sure you want to actually leave the old activity and start joining a new one
    sure_to_start_new_game : "Sie können die derzeitige Aktivität nicht fortsetzen. Sind Sie sicher, dass Sie an einer neuen Aktivität teilnehmen möchten?",
        
    // answerView
    // These are shown to the user after answering a task.
    // Full points, PERFECT!
    correct_answer : "PERFEKT!",
    // Partial points, PRETTY GOOD!
    ok_answer : "ZIEMLICH GUT!",
    // Wrong answer, no points, OOPS!
    incorrect_answer : "SCHADE!",
    // Try again, in case there is possibility to try a task again, this will be shown in a button
    try_again : "Erneut versuchen",
    // Ok button
    ok : "Ok",
    // i.e. "Sie haben 100 Punkte."
    you_got : "Sie haben ",
    points : "Punkte",
    // i.e. "Sie haben noch 3 Versuch(e)"
    you_have : "Sie haben noch ", 
    attempt_left: " Versuch", 
    attempts_left: " Versuche",
    
    //showHintView
    // Shown in a small box indicating when the view is changed to the guiding arrow instead of hint view. i.e. "Switching to guiding arrow in 01:15"
    switching_to_compass: "Zum Führungspfeil wechseln in",
    // Button to open QR code scanner
    scan_qr_code: "QR-Code einscannen",	
    
    // guideView
    // Distance to target checkpoint. i.e. "120 meters"
    meters : " Meter",
    // Warning if you are outside of the activity area, the arrow guides you back to activity area.
    outside_game_area : "Sie befinden Sie außerhalb der Grenzen, bitte folgen Sie dem Pfeil.",
    // Warning if you are in a forbidden zone, the arrow guides you back to activity area.
    forbidden_zone : "Sie befinden sich in einer verbotenen Zone, bitte folgen Sie dem Pfeil.",
    // Information in the start of the activity, if the team is required to move to the start area before beginning.
	goto_start_area : "Bitte folgen Sie dem Pfeil in den Startbereich.",
	// Similiar to switching_to_compass. i.e. "Time left to reach the checkpoint: 01:15"
    time_left : "Verbleibende Zeit zum Erreichen des Kontrollpunkts",
    
    // mapView
    // Button used to set a checkpoint as a target
    set_as_target: "Als Ziel festlegen",
    // Activate button in case the checkpoint is floating one, that starts instantly when you click this button (replaces the "set as target" button)
    activate: "Aktivieren",
    // Popup text when you have walked into a checkpoint that is not your primary target
    in_radius_of_another_cp: "Kontrollpunkt gefunden!",
    // Popup text when you have walked into a checkpoint that is hidden/secret
    in_radius_of_discovery_cp: "Verborgener Kontrollpunkt gefunden!",
    // Prompt about going to the checkpoint, shown under the previous texts.
    goto_non_target_cp: "Möchten Sie diesen Kontrollpunkt aktivieren?",
    
	// queueView
    // Shown when queue is enabled, the players should form a queue and wait for the supervisor that is present at the checkpoint to come and let them to the checkpoint
	checkpoint_full : "Bilden Sie eine Warteschlange und warten Sie auf den Administrator.",
	
    // taskView
	// Continue button, used in tasks that don't have any questions, just information. You can continue forward on the trail by clicking this.
    continue_str : "Weiter",
    // Pass / give up button to pass the current task and move on with the trail.
    give_up : "Durchgehen",
    // Submit button for sending the answer(s) after the team has answered the questions.
    submit : "Versenden",
    // Take picture button for tasks that have a task that requires a picture to be taken. Opens camera.
    take_picture : "Fotografieren",
    // If the tasks time runs out, you will be shown this in popup and you will be forced to submit your answer at it's current state automatically.
    task_time_expired : "Schade! Ihre Zeit ist abgelaufen.",
    // Header text for points available from the current task
    indicator_points : "Punkte",
    // Header text for time left to answer the task
    indicator_time : "Zeit",
    
    // checkAnswersView
    // Button that takes you to the unlock view, from where you can unlock the supervisor view, to evaluate the current task.
    give_phone_button : "Entsperren",
    // Info text above previous button, that tells the player to give the device to the supervisor
    give_phone : "Bitte übergeben Sie Ihr mobiles Gerät dem Administrator.",
    // Header for supervisor password input field in the unlock view
    superpasswd : "Administratorkennwort:",
    // Unlock button after entering the password
    unlock : "Entsperren",
    // Header for the picture the team took when in the evaluating view
    teams_picture : "Eingesandtes Bild:",
    // Header for the picture that shows what the answer was supposed to be like, in the evaluating view
    correct_picture : "Referenzbild:",
    // Header for player/user answer in the evaluating view, in other cases than picture
    team : "Benutzer:",
    // Header for the correct answer in the evaluating view, in other cases than picture
    correct : "Richtig:",
    // Points to give to the team in the evaluating view. Used like: "Points (0-100)". Used as header/label for the points input field
    given_points : "Punkte",
    // Submit points button under the previous field
    submit_points : "Punkte übermitteln",
    
    // Popup after submitting an answer in case it was submitted for the admin to check and evaluate later.
    answer_sent_for_check : "Antwort zur Punktzahl gesendet.",
	
    // finishedView
    // After the activity has finished, these are shown
    // Headers in the scorelist. Username, Points gained, Finished (yes/no)
    fteam : "Benutzer",
    fpoints : "Punkte",
    finished : "Beendet",
    // Finished texts, yes / no
    yes : "Ja",
    no : "Nein",
    // In finishedView, a button that lets you quit from this activity, and return to the main menu
    main_menu : "Aktivität beenden",
    // Prompt when quitting the activity, you won't be able to return into this finishedView anymore
    sure_to_exit_game : "Sie können zu diesem Bildschirm nicht zurückkehren. Sind Sie sicher, dass Sie aufhören möchten?",
    // Info text in the finished view stating, that all your answers have been sent to the server and you may now close the application.
    you_may_now_close : "Sie können jetzt die Anwendung schließen.",
    // Info text in case you still have unsent answers. Used like: 
    // "Results from 3 tasks are being uploaded. If the count does not decrease in two minutes, check your internet connection."
    warning_you_have : "Ergebnisse aus ",
    warning_unsent_answers : " Aufgaben werden hochgeladen.",
    warning_connection : "Wenn Sie die Anzahl innerhalb von zwei Minuten nicht verringert, prüfen Sie Ihre Internetverbindung.",
    // Refresh button for refreshing the scores list
    refresh_list : "Aktualisieren",
    
	//rejoinGameView
    // When restarting the application, and a still ongoing activity is found from memory, prompt if user wants to rejoin that
	rejoin_header : "Wie möchten Sie fortfahren?",
	// Continue current activity button
	continue_previous_game : "Aktuelle Aktivität fortsetzen",
	// Join new activity button
    join_new_game : "An neuer Aktivität teilnehmen",
    
    // adminView
    // Header for admin settings view
    adminView_header : "Admin-Einstellungen",
    // Header for text field indicating the currently set default server
    adminView_current_server : "Aktueller Standardserver",
    // Header for the server list used to change the default server
    adminView_new_server : "Neuen Standardserver auswählen",
    // Save settings button
    adminView_save_settings : "Einstellungen speichern",
    // Clear the default server button
    adminView_clear_server : "Server bereinigen",
    
    // onDemandsLeftView
    // When the game is coming to end, but you still have on-demand tasks that you may do before finishing, this is the info text shown on the screen.
    onDemandsLeftView_text : "Ihnen stehen noch bedarfsweise Aufgaben zur Verfügung. Sie können vor dem Beenden auf diese zugreifen.",
    
    // header
    // In-game header label texts. i.e. "POINTS: 100     POSITION: 5/8    TRAVELED: 100m"
    head_points : "PUNKTE: ",
    head_position : "POSITION: ",
    traveled: "GEFAHREN: ",
        
    // chat
    // Send chat message button
    send : "Senden",
    // Name for the admin used in chat when he/she writes a message to the players
    game_master : "Organisator",
    // Info text if there are yet no messages in the chat
    no_messages : "Noch keine Nachrichten. Senden Sie über das nachstehende Feld eine Nachricht an den Organisator.",
    
    // dialogs and messages
    // Label for password field in popups where we request some password
    enter_passcode : "Kennwort eingeben",
    // Popup text for incorrect password
    wrong_password: "Kennwort falsch",
    // Close button for popups
    close : "Schließen",
    // Popup when the system is calculating the next checkpoint
    calculating_next_cp : "Auswahl Ihres nächsten Kontrollpunkts...",
    // Prompt after clicking the pass button when doing task.
    give_up_dialog : "Sind Sie sicher, dass Sie schieben möchten? Sie können dann keine weiteren Punkte bekommen!",
    // Popup when the system is loading something
    loading : "Ladevorgang läuft...",
    // Popup when entering a checkpoint, that has plus or minus points for entering it.
    // i.e. "You were awarded 100 points for arriving at this checkpoint" or "You were deducted 100 points..."
    // you_got_points + " " + POINTS_NUMBER + " " + points + for_arriving
	you_got_points : "Ihnen wurden gutgeschrieben",
	you_lost_points : "Ihnen wurden abgezogen",
	for_arriving : " für die Ankunft an diesem Kontrollpunkt.",
	// Popup for timeout when moving to next checkpoint, when there was a time limit and you didn't make it
    route_timer_timeout : "Sie haben diesen Kontrollpunkt nicht rechtzeitig erreicht.",
    // Sending points popup, a loading dialog when the system sends the points.
    sending_points : "Punkte werden versendet.",
    // Sending the answer popup, a loading dialog when the system send the answer.
    sending_answer : "Antwort wird versendet.",
    // A loading dialog when the system is looking for servers.
    finding_servers : "Server werden gesucht.",
    // A loading dialog when the system is looking for activities.
    finding_games : "Es werden Aktivitäten im Bereich gesucht.",
    // A loading dialog when the system is trying to join the activity
    joining_game : "An der Aktivität teilnehmen ",
    // Error dialog, if you entered a name that was already in use in this activity
    name_in_use : "Der Name wird bereits verwendet. Versuchen Sie es mit einem anderen Namen.",
    // Error dialog, if you tried to join the same activity multiple times
    already_joined : "Bereits angemeldet",
    // A loading dialog when the system loads the activity. i.e. "Loading the activity TAZ Test Track"
	loading_game : "Die Aktivität wird geladen ",
	// A loading dialog when the system loads the custom map. i.e. "Loading the map 5%"
	loading_map: "Die Karte wird geladen",
	// A loading dialog when the system waits for GPS fix
    waiting_gps : "Warten auf GPS-Standortdaten.",
    // A popup when you have reached the finish area
    reached_finish : "Sie sind im Zielbereich angekommen.",
    // An info text when the ranking list is not yet shown because we are loading it still
    fetching_rankings : "Rangliste wird abgerufen.",
    // Cancel button
    cancel : "Abbrechen",
    // An info popup, after the last task is done and the team is guided to finish area.
    that_was_last_cp : "Das war der letzte Kontrollpunkt. Gehen Sie weiter zum Zielbereich.",
    // Same as previous, but when there is no finish area.
    last_cp_game_ended : "Das war der letzte Kontrollpunkt. Herzlichen Glückwunsch! Die Aktivität ist abgeschlossen.",
    // An info popup when the activity time runs out and there is a finish area.
    game_ended_with_fa: "Die Aktivität ist abgeschlossen. Gehen Sie weiter zum Zielbereich.",
    // Same as previous, but when there is no finish area.
    game_ended_without_fa: "Die Aktivität ist abgeschlossen.",
    // An info / error popup. Taking the picture failed for some reason.
    picture_failed: "Kein Foto erstellt. Bitte versuchen Sie es erneut.",
    // An info popup if you have been kicked out of the activity
    kicked_out_of_game: "Sie wurden aus der Aktivität herausgenommen.",
    // Exit prompt popup after clicking back button
    exit_confirm : "Möchten Sie diese Aktivität fortsetzen?",
    // Button to continue the activity
    continue_button : "Aktivität fortsetzen",
    // Button for exiting the application
    exit_button : "Anwendung beenden",
    // Button to quit this activity
    finish_this_game : "Diese Aktivität beenden",
    // Second prompt for quitting the activity
    finish_this_game_confirmation : "Sind Sie sicher, dass Sie diese Aktivität beenden möchten?",
    // Button to actually quit the activity and go to the finishedView
    finish_this_game_confirmation_quit : "Aktivität beenden",
    // Button to continue the activity instead
    finish_this_game_confirmation_cont : "Aktivität fortsetzen",
    // Error when trying to join an activity, but the internet connection is not ok
    no_connection : "Keine Verbindung. Bitte versuchen Sie es erneut."
};


/* 
 * Localization strings for French language
 */

taz.strings_fr = {
		
	// warningDialog
	// WarningDialog, shown when the application starts
	warning : "Attention au monde qui vous entoure et aux véhicules ! Évitez les collisions avec des objets, des animaux ou d'autres personnes quand vous jouez sur ActionTrack.",
	// Option to turn the warning dialog off, so it won't appear on future startups
	doNotShowAgain : "Ne plus afficher.",
		
    // showServersView
	// X amount of server found. i.e. "5 servers found".
    servers_found : "serveurs trouvés.",
    // Select server. Header for the servers list
    select_server : "Choisir un serveur",
    // Info popups if unable to join a server. 
    version_not_available : "Informations serveur indisponibles. Serveur temporairement inaccessible.",
    version_client_too_old : "Ce serveur requiert une version plus récente de l'application. Mettez l'application à jour pour accéder au serveur.",
    version_server_too_old : "Ce serveur n'est plus compatible avec l'application installée sur votre appareil.",
    
    // serverDescriptionView
    // After choosing server, you are shown the servers description. This text is used in the button in that view to join the server.
    accept_server : "Accéder",
    
    // showGamesView
    // i.e. "5 activities found."
    games_found : "activités trouvées.",
    // i.e. "1 activity found."
    game_found : "activité trouvée.",
    // Join activity. Header for activities list.
    join_game : "Chercher activité",

    // gameDescriptionView
    // After choosing activity, you are shown the activity's description. This text is used in the button in that view to join the activity.
    accept_game : "Accéder",

    // joinGameView
    // Header for joining the activity. used like: "Welcome to Activity X"
    welcome_to : "Bienvenue dans",
    // Who are you? Header for text input field where you enter your name / username / teamname
    name_your_team : "Qui êtes-vous ?",
    // Back button
    back : "Retour",
    // Submit button, used in button to submit the name and to start the activity
    accept : "Envoyer",

    // rejoinGameView
    // If you restart the application, and try to join a new activity, and you have previously participitated in another activity, 
    // this is the prompt to make sure you want to actually leave the old activity and start joining a new one
    sure_to_start_new_game : "Vous ne pourrez pas continuer l'activité en cours. Voulez-vous vraiment accéder à une autre activité ?",
        
    // answerView
    // These are shown to the user after answering a task.
    // Full points, PERFECT!
    correct_answer : "PARFAIT !",
    // Partial points, PRETTY GOOD!
    ok_answer : "PAS MAL !",
    // Wrong answer, no points, OOPS!
    incorrect_answer : "OUPS !",
    // Try again, in case there is possibility to try a task again, this will be shown in a button
    try_again : "Réessayer",
    // Ok button
    ok : "OK",
    // i.e. "Vous avez 100 points"
    you_got : "Vous avez ",
    points : "points",
    // i.e. "Il vous reste 3 essai(s)"
    you_have : "Il vous reste ", 
    attempt_left: " essai", 
    attempts_left: " essais",
    
    //showHintView
    // Shown in a small box indicating when the view is changed to the guiding arrow instead of hint view. i.e. "Switching to guiding arrow in 01:15"
    switching_to_compass: "Activation flèche de guidage dans",
    // Button to open QR code scanner
    scan_qr_code: "Scanner le QR code",	
    
    // guideView
    // Distance to target checkpoint. i.e. "120 meters"
    meters : " mètres",
    // Warning if you are outside of the activity area, the arrow guides you back to activity area.
    outside_game_area : "Vous êtes hors limites, suivez la flèche.",
    // Warning if you are in a forbidden zone, the arrow guides you back to activity area.
    forbidden_zone : "Vous vous trouvez en zone interdite, suivez la flèche.",
    // Information in the start of the activity, if the team is required to move to the start area before beginning.
	goto_start_area : "Suivez la flèche jusqu'à la zone de départ.",
	// Similiar to switching_to_compass. i.e. "Time left to reach the checkpoint: 01:15"
    time_left : "Délai pour atteindre le point de contrôle :",
    
    // mapView
    // Button used to set a checkpoint as a target
    set_as_target: "Définir comme objectif",
    // Activate button in case the checkpoint is floating one, that starts instantly when you click this button (replaces the "set as target" button)
    activate: "Activer",
    // Popup text when you have walked into a checkpoint that is not your primary target
    in_radius_of_another_cp: "Point de contrôle trouvé !",
    // Popup text when you have walked into a checkpoint that is hidden/secret
    in_radius_of_discovery_cp: "Point de contrôle caché trouvé !",
    // Prompt about going to the checkpoint, shown under the previous texts.
    goto_non_target_cp: "Voulez-vous activer ce point de contrôle ?",
    
	// queueView
    // Shown when queue is enabled, the players should form a queue and wait for the supervisor that is present at the checkpoint to come and let them to the checkpoint
	checkpoint_full : "Formez une file et attendez le superviseur.",
	
    // taskView
	// Continue button, used in tasks that don't have any questions, just information. You can continue forward on the trail by clicking this.
    continue_str : "Continuer",
    // Pass / give up button to pass the current task and move on with the trail.
    give_up : "Passer",
    // Submit button for sending the answer(s) after the team has answered the questions.
    submit : "Envoyer",
    // Take picture button for tasks that have a task that requires a picture to be taken. Opens camera.
    take_picture : "Prendre une photo",
    // If the tasks time runs out, you will be shown this in popup and you will be forced to submit your answer at it's current state automatically.
    task_time_expired : "Oups ! Le temps est écoulé.",
    // Header text for points available from the current task
    indicator_points : "Points",
    // Header text for time left to answer the task
    indicator_time : "Temps",
    
    // checkAnswersView
    // Button that takes you to the unlock view, from where you can unlock the supervisor view, to evaluate the current task.
    give_phone_button : "Déverrouiller",
    // Info text above previous button, that tells the player to give the device to the supervisor
    give_phone : "Remettez votre appareil mobile au superviseur.",
    // Header for supervisor password input field in the unlock view
    superpasswd : "Mot de passe superviseur :",
    // Unlock button after entering the password
    unlock : "Déverrouiller",
    // Header for the picture the team took when in the evaluating view
    teams_picture : "Photo envoyée :",
    // Header for the picture that shows what the answer was supposed to be like, in the evaluating view
    correct_picture : "Photo de référence :",
    // Header for player/user answer in the evaluating view, in other cases than picture
    team : "Utilisateur :",
    // Header for the correct answer in the evaluating view, in other cases than picture
    correct : "Correct :",
    // Points to give to the team in the evaluating view. Used like: "Points (0-100)". Used as header/label for the points input field
    given_points : "Points",
    // Submit points button under the previous field
    submit_points : "Envoyer les points",
    
    // Popup after submitting an answer in case it was submitted for the admin to check and evaluate later.
    answer_sent_for_check : "Réponse envoyée pour le calcul.",
	
    // finishedView
    // After the activity has finished, these are shown
    // Headers in the scorelist. Username, Points gained, Finished (yes/no)
    fteam : "Utilisateur",
    fpoints : "Points",
    finished : "Terminé",
    // Finished texts, yes / no
    yes : "Oui",
    no : "Non",
    // In finishedView, a button that lets you quit from this activity, and return to the main menu
    main_menu : "Quitter l'activité",
    // Prompt when quitting the activity, you won't be able to return into this finishedView anymore
    sure_to_exit_game : "Vous ne pourrez plus revenir à cet écran. Voulez-vous vraiment quitter ?",
    // Info text in the finished view stating, that all your answers have been sent to the server and you may now close the application.
    you_may_now_close : "Vous pouvez fermer l'application.",
    // Info text in case you still have unsent answers. Used like: 
    // "Results from 3 tasks are being uploaded. If the count does not decrease in two minutes, check your internet connection."
    warning_you_have : "Résultats de ",
    warning_unsent_answers : " tâches en cours de chargement.",
    warning_connection : "Si le nombre ne baisse pas d'ici deux minutes, vérifiez votre connexion à Internet.",
    // Refresh button for refreshing the scores list
    refresh_list : "Actualiser",
    
	//rejoinGameView
    // When restarting the application, and a still ongoing activity is found from memory, prompt if user wants to rejoin that
	rejoin_header : "Que voulez-vous faire ?",
	// Continue current activity button
	continue_previous_game : "Continuer l'activité en cours",
	// Join new activity button
    join_new_game : "Accéder à une autre activité",
    
    // adminView
    // Header for admin settings view
    adminView_header : "Paramètres admin",
    // Header for text field indicating the currently set default server
    adminView_current_server : "Serveur par défaut actuel",
    // Header for the server list used to change the default server
    adminView_new_server : "Choisir un autre serveur par défaut",
    // Save settings button
    adminView_save_settings : "Enregistrer les paramètres",
    // Clear the default server button
    adminView_clear_server : "Effacer le serveur",
    
    // onDemandsLeftView
    // When the game is coming to end, but you still have on-demand tasks that you may do before finishing, this is the info text shown on the screen.
    onDemandsLeftView_text : "Il reste des tâches à la demande. Vous pouvez y accéder avant de quitter.",
    
    // header
    // In-game header label texts. i.e. "POINTS: 100     POSITION: 5/8    TRAVELED: 100m"
    head_points : "POINTS : ",
    head_position : "POSITION : ",
    traveled: "DISTANCE : ",
        
    // chat
    // Send chat message button
    send : "Envoyer",
    // Name for the admin used in chat when he/she writes a message to the players
    game_master : "Organisateur",
    // Info text if there are yet no messages in the chat
    no_messages : "Pas de message. Utilisez la zone ci-dessous pour envoyer un message à l'organisateur.",
    
    // dialogs and messages
    // Label for password field in popups where we request some password
    enter_passcode : "Saisir le mot de passe :",
    // Popup text for incorrect password
    wrong_password: "Mot de passe incorrect",
    // Close button for popups
    close : "Fermer",
    // Popup when the system is calculating the next checkpoint
    calculating_next_cp : "Calcul du point de contrôle suivant...",
    // Prompt after clicking the pass button when doing task.
    give_up_dialog : "Voulez-vous vraiment passer ? Vous ne marquerez aucun point dans ce cas !",
    // Popup when the system is loading something
    loading : "Chargement...",
    // Popup when entering a checkpoint, that has plus or minus points for entering it.
    // i.e. "You were awarded 100 points for arriving at this checkpoint" or "You were deducted 100 points..."
    // you_got_points + " " + POINTS_NUMBER + " " + points + for_arriving
	you_got_points : "Vous avez gagné",
	you_lost_points : "Vous avez perdu",
	for_arriving : " en arrivant à ce point de contrôle.",
	// Popup for timeout when moving to next checkpoint, when there was a time limit and you didn't make it
    route_timer_timeout : "Vous n'avez pas atteint le point de contrôle à temps.",
    // Sending points popup, a loading dialog when the system sends the points.
    sending_points : "Envoi des points.",
    // Sending the answer popup, a loading dialog when the system send the answer.
    sending_answer : "Envoi de la réponse.",
    // A loading dialog when the system is looking for servers.
    finding_servers : "Recherche de serveurs.",
    // A loading dialog when the system is looking for activities.
    finding_games : "Recherche d'activités dans la zone.",
    // A loading dialog when the system is trying to join the activity
    joining_game : "Accès à l'activité ",
    // Error dialog, if you entered a name that was already in use in this activity
    name_in_use : "Nom déjà utilisé. Essayez-en un autre.",
    // Error dialog, if you tried to join the same activity multiple times
    already_joined : "Déjà effectuée",
    // A loading dialog when the system loads the activity. i.e. "Loading the activity TAZ Test Track"
	loading_game : "Chargement de l'activité ",
	// A loading dialog when the system loads the custom map. i.e. "Loading the map 5%"
	loading_map: "Chargement de la carte",
	// A loading dialog when the system waits for GPS fix
    waiting_gps : "En attente des informations du GPS.",
    // A popup when you have reached the finish area
    reached_finish : "Vous avez atteint la zone d'arrivée.",
    // An info text when the ranking list is not yet shown because we are loading it still
    fetching_rankings : "Classement en cours.",
    // Cancel button
    cancel : "Annuler",
    // An info popup, after the last task is done and the team is guided to finish area.
    that_was_last_cp : "C'était le dernier point de contrôle. Rendez-vous à la zone d'arrivée.",
    // Same as previous, but when there is no finish area.
    last_cp_game_ended : "C'était le dernier point de contrôle. Félicitations, l'activité est terminée !",
    // An info popup when the activity time runs out and there is a finish area.
    game_ended_with_fa: "L'activité est terminée. Rendez-vous à la zone d'arrivée.",
    // Same as previous, but when there is no finish area.
    game_ended_without_fa: "L'activité est terminée.",
    // An info / error popup. Taking the picture failed for some reason.
    picture_failed: "La photo n'a pas été prise. Réessayez.",
    // An info popup if you have been kicked out of the activity
    kicked_out_of_game: "Vous avez été exclu de l'activité.",
    // Exit prompt popup after clicking back button
    exit_confirm : "Voulez-vous continuer cette activité ?",
    // Button to continue the activity
    continue_button : "Continuer l'activité",
    // Button for exiting the application
    exit_button : "Quitter l'application",
    // Button to quit this activity
    finish_this_game : "Quitter cette activité",
    // Second prompt for quitting the activity
    finish_this_game_confirmation : "Voulez-vous vraiment quitter cette activité ?",
    // Button to actually quit the activity and go to the finishedView
    finish_this_game_confirmation_quit : "Quitter l'activité",
    // Button to continue the activity instead
    finish_this_game_confirmation_cont : "Continuer l'activité",
    // Error when trying to join an activity, but the internet connection is not ok
    no_connection : "Absence de connexion, réessayez."
};


/* 
 * Localization strings for Arabic language
 */

taz.strings_ar = {
		
	// warningDialog
	// WarningDialog, shown when the application starts
	warning : "تنبيه! كن على علم بأحوال الطريق وحركة المرور. كن على حذر من ألا ترتطم بأشياء أو أشخاص آخرين أو حيوانات بينما تستمتع بتطبيق ActionTrack.",
	// Option to turn the warning dialog off, so it won't appear on future startups
	doNotShowAgain : "عدم الإظهار مرة أخرى.",
		
    // showServersView
	// X amount of server found. i.e. "5 servers found".
    servers_found : "خوادم تم العثور عليها.",
    // Select server. Header for the servers list
    select_server : "حدد الخادم",
    // Info popups if unable to join a server. 
    version_not_available : "معلومات الخادم غير متاحة. تعذر الدخول على الخادم في الوقت الحالي.",
    version_client_too_old : "يتطلب هذا الخادم إصدارًا أحدث من التطبيق. الرجاء تحديث التطبيق للدخول على هذا الخادم.",
    version_server_too_old : "هذا الخادم لم يعد متوافقًا مع التطبيق الموجود على هاتفك.",
    
    // serverDescriptionView
    // After choosing server, you are shown the servers description. This text is used in the button in that view to join the server.
    accept_server : "ادخل",
    
    // showGamesView
    // i.e. "5 activities found."
    games_found : "أنشطة تم العثور عليها.",
    // i.e. "1 activity found."
    game_found : "نشاط تم العثور عليه.",
    // Join activity. Header for activities list.
    join_game : "الاشتراك في النشاط",

    // gameDescriptionView
    // After choosing activity, you are shown the activity's description. This text is used in the button in that view to join the activity.
    accept_game : "اشترك",

    // joinGameView
    // Header for joining the activity. used like: "Welcome to Activity X"
    welcome_to : "مرحبًا بك في",
    // Who are you? Header for text input field where you enter your name / username / teamname
    name_your_team : "من أنت؟",
    // Back button
    back : "الرجوع",
    // Submit button, used in button to submit the name and to start the activity
    accept : "إرسال",

    // rejoinGameView
    // If you restart the application, and try to join a new activity, and you have previously participitated in another activity, 
    // this is the prompt to make sure you want to actually leave the old activity and start joining a new one
    sure_to_start_new_game : "لن يكون بإمكانك مواصلة النشاط الحالي. هل أنت متأكد من رغبتك في الاشتراك في نشاط جديد؟",
        
    // answerView
    // These are shown to the user after answering a task.
    // Full points, PERFECT!
    correct_answer : "رائع!",
    // Partial points, PRETTY GOOD!
    ok_answer : "معقول!",
    // Wrong answer, no points, OOPS!
    incorrect_answer : "ياااه!",
    // Try again, in case there is possibility to try a task again, this will be shown in a button
    try_again : "حاول مرة أخرى",
    // Ok button
    ok : "موافق",
    // i.e. "لقد حصلت على 100 نقطة"
    you_got : "لقد حصلت على ",
    points : "نقطة (نقاط)",
    // i.e. "يتبقى لك 3 محاولات"
    you_have : "لك ", 
    attempt_left: " محاولة متبقية", 
    attempts_left: " محاولات متبقية",
    
    //showHintView
    // Shown in a small box indicating when the view is changed to the guiding arrow instead of hint view. i.e. "Switching to guiding arrow in 01:15"
    switching_to_compass: "التبديل إلى الوضع السهمي بعد",
    // Button to open QR code scanner
    scan_qr_code: "مسح كود QR",	
    
    // guideView
    // Distance to target checkpoint. i.e. "120 meters"
    meters : " متر",
    // Warning if you are outside of the activity area, the arrow guides you back to activity area.
    outside_game_area : "لقد جاوزت الحدود، برجاء اتباع السهم.",
    // Warning if you are in a forbidden zone, the arrow guides you back to activity area.
    forbidden_zone : "أنت في منطقة محظورة، برجاء اتباع السهم.",
    // Information in the start of the activity, if the team is required to move to the start area before beginning.
	goto_start_area : "الرجاء اتباع السهم حتى منطقة البداية.",
	// Similiar to switching_to_compass. i.e. "Time left to reach the checkpoint: 01:15"
    time_left : "الوقت المتبقي حتى الوصول إلى نقطة التفتيش:",
    
    // mapView
    // Button used to set a checkpoint as a target
    set_as_target: "ضبط كهدف",
    // Activate button in case the checkpoint is floating one, that starts instantly when you click this button (replaces the "set as target" button)
    activate: "تنشيط",
    // Popup text when you have walked into a checkpoint that is not your primary target
    in_radius_of_another_cp: "تم العثور على نقطة تفتيش!",
    // Popup text when you have walked into a checkpoint that is hidden/secret
    in_radius_of_discovery_cp: "تم العثور على نقطة تفتيش سرية!",
    // Prompt about going to the checkpoint, shown under the previous texts.
    goto_non_target_cp: "هل ترغب في تنشيط نقطة التفتيش هذه؟",
    
	// queueView
    // Shown when queue is enabled, the players should form a queue and wait for the supervisor that is present at the checkpoint to come and let them to the checkpoint
	checkpoint_full : "قم بعمل استفسار وانتظر المشرف.",
	
    // taskView
	// Continue button, used in tasks that don't have any questions, just information. You can continue forward on the trail by clicking this.
    continue_str : "متابعة",
    // Pass / give up button to pass the current task and move on with the trail.
    give_up : "تخطي",
    // Submit button for sending the answer(s) after the team has answered the questions.
    submit : "إرسال",
    // Take picture button for tasks that have a task that requires a picture to be taken. Opens camera.
    take_picture : "التقاط صورة",
    // If the tasks time runs out, you will be shown this in popup and you will be forced to submit your answer at it's current state automatically.
    task_time_expired : "ياااه! لقد انتهى الوقت.",
    // Header text for points available from the current task
    indicator_points : "النقاط",
    // Header text for time left to answer the task
    indicator_time : "الوقت",
    
    // checkAnswersView
    // Button that takes you to the unlock view, from where you can unlock the supervisor view, to evaluate the current task.
    give_phone_button : "فتح",
    // Info text above previous button, that tells the player to give the device to the supervisor
    give_phone : "الرجاء إعطاء هاتفك للمشرف.",
    // Header for supervisor password input field in the unlock view
    superpasswd : "كلمة مرور المشرف:",
    // Unlock button after entering the password
    unlock : "فتح",
    // Header for the picture the team took when in the evaluating view
    teams_picture : "الصورة المرسلة:",
    // Header for the picture that shows what the answer was supposed to be like, in the evaluating view
    correct_picture : "الصورة المرجعية:",
    // Header for player/user answer in the evaluating view, in other cases than picture
    team : "المستخدم:",
    // Header for the correct answer in the evaluating view, in other cases than picture
    correct : "صحيح:",
    // Points to give to the team in the evaluating view. Used like: "Points (0-100)". Used as header/label for the points input field
    given_points : "النقاط",
    // Submit points button under the previous field
    submit_points : "إرسال النقاط",
    
    // Popup after submitting an answer in case it was submitted for the admin to check and evaluate later.
    answer_sent_for_check : "تم إرسال الإجابة للتصحيح.",
	
    // finishedView
    // After the activity has finished, these are shown
    // Headers in the scorelist. Username, Points gained, Finished (yes/no)
    fteam : "المستخدم",
    fpoints : "النقاط",
    finished : "انتهى",
    // Finished texts, yes / no
    yes : "نعم",
    no : "لا",
    // In finishedView, a button that lets you quit from this activity, and return to the main menu
    main_menu : "الخروج من النشاط",
    // Prompt when quitting the activity, you won't be able to return into this finishedView anymore
    sure_to_exit_game : "لن يمكنك الرجوع لهذه الشاشة مرة أخرى. هل أنت متأكد من رغبتك في الخروج؟",
    // Info text in the finished view stating, that all your answers have been sent to the server and you may now close the application.
    you_may_now_close : "يمكنك الآن غلق التطبيق.",
    // Info text in case you still have unsent answers. Used like: 
    // "Results from 3 tasks are being uploaded. If the count does not decrease in two minutes, check your internet connection."
    warning_you_have : "النتائج من ",
    warning_unsent_answers : " يتم رفع المهام الآن.",
    warning_connection : "إذا لم ينخفض العدد خلال دقيقتين، تحقق من اتصال الإنترنت.",
    // Refresh button for refreshing the scores list
    refresh_list : "تحديث",
    
	//rejoinGameView
    // When restarting the application, and a still ongoing activity is found from memory, prompt if user wants to rejoin that
	rejoin_header : "ماذا تريد أن تفعل؟",
	// Continue current activity button
	continue_previous_game : "متابعة النشاط الحالي",
	// Join new activity button
    join_new_game : "الاشتراك في نشاط جديد",
    
    // adminView
    // Header for admin settings view
    adminView_header : "إعدادات المدير",
    // Header for text field indicating the currently set default server
    adminView_current_server : "الخادم الافتراضي الحالي",
    // Header for the server list used to change the default server
    adminView_new_server : "تحديد خادم افتراضي جديد",
    // Save settings button
    adminView_save_settings : "حفظ الإعدادات",
    // Clear the default server button
    adminView_clear_server : "مسح الإعدادات",
    
    // onDemandsLeftView
    // When the game is coming to end, but you still have on-demand tasks that you may do before finishing, this is the info text shown on the screen.
    onDemandsLeftView_text : "لا يزال لديك بعض المهام المطلوبة. يمكنك الدخول إليها قبل الخروج.",
    
    // header
    // In-game header label texts. i.e. "POINTS: 100     POSITION: 5/8    TRAVELED: 100m"
    head_points : "النقاط: ",
    head_position : "الموقع: ",
    traveled: "المسافة: ",
        
    // chat
    // Send chat message button
    send : "أرسل",
    // Name for the admin used in chat when he/she writes a message to the players
    game_master : "المنظِّم",
    // Info text if there are yet no messages in the chat
    no_messages : "لا توجد رسائل حتى الآن. استخدم الصندوق الموجود بالأسفل لإرسال رسالة إلى المنظِّم.",
    
    // dialogs and messages
    // Label for password field in popups where we request some password
    enter_passcode : "أدخل كلمة المرور:",
    // Popup text for incorrect password
    wrong_password: "كلمة مرور غير صحيحة",
    // Close button for popups
    close : "أغلق",
    // Popup when the system is calculating the next checkpoint
    calculating_next_cp : "تحديد نقطة التفتيش القادمة....",
    // Prompt after clicking the pass button when doing task.
    give_up_dialog : "هل أنت متأكد من رغبتك في التخطي؟ لن تحصل على أية نقاط في هذه الحالة!",
    // Popup when the system is loading something
    loading : "تحميل...",
    // Popup when entering a checkpoint, that has plus or minus points for entering it.
    // i.e. "You were awarded 100 points for arriving at this checkpoint" or "You were deducted 100 points..."
    // you_got_points + " " + POINTS_NUMBER + " " + points + for_arriving
	you_got_points : "تم إضافة نقاط",
	you_lost_points : "تم خصم نقاط",
	for_arriving : " على الوصول لنقطة التفتيش هذه.",
	// Popup for timeout when moving to next checkpoint, when there was a time limit and you didn't make it
    route_timer_timeout : "لم تنجح في الوصول إلى نقطة التفتيش في الوقت المناسب.",
    // Sending points popup, a loading dialog when the system sends the points.
    sending_points : "إرسال النقاط.",
    // Sending the answer popup, a loading dialog when the system send the answer.
    sending_answer : "إرسال الجواب.",
    // A loading dialog when the system is looking for servers.
    finding_servers : "البحث عن خوادم.",
    // A loading dialog when the system is looking for activities.
    finding_games : "البحث عن أنشطة في المنطقة.",
    // A loading dialog when the system is trying to join the activity
    joining_game : "الاشتراك في النشاط ",
    // Error dialog, if you entered a name that was already in use in this activity
    name_in_use : "الاسم مستخدم بالفعل. الرجاء تجربة اسم آخر.",
    // Error dialog, if you tried to join the same activity multiple times
    already_joined : "مشترك بالفعل",
    // A loading dialog when the system loads the activity. i.e. "Loading the activity TAZ Test Track"
	loading_game : "تحميل النشاط ",
	// A loading dialog when the system loads the custom map. i.e. "Loading the map 5%"
	loading_map: "تحميل الخريطة",
	// A loading dialog when the system waits for GPS fix
    waiting_gps : "في انتظار معلومات الموقع من GPS.",
    // A popup when you have reached the finish area
    reached_finish : "لقد وصلت إلى منطقة النهاية.",
    // An info text when the ranking list is not yet shown because we are loading it still
    fetching_rankings : "تحميل قائمة الترتيب.",
    // Cancel button
    cancel : "إلغاء",
    // An info popup, after the last task is done and the team is guided to finish area.
    that_was_last_cp : "لقد كانت تلك هي نقطة التفتيش الأخيرة. أكمل حتى منطقة النهاية.",
    // Same as previous, but when there is no finish area.
    last_cp_game_ended : "‏‫لقد كانت تلك هي نقطة التفتيش الأخيرة. تهانينا، لقد انتهى النشاط!",
    // An info popup when the activity time runs out and there is a finish area.
    game_ended_with_fa: "لقد انتهى النشاط. برجاء الإكمال إلى منطقة النهاية.",
    // Same as previous, but when there is no finish area.
    game_ended_without_fa: "لقد انتهى النشاط.",
    // An info / error popup. Taking the picture failed for some reason.
    picture_failed: "لم يتم التقاط صورة. برجاء المحاولة مرة أخرى.",
    // An info popup if you have been kicked out of the activity
    kicked_out_of_game: "لقد تم إخراجك من النشاط.",
    // Exit prompt popup after clicking back button
    exit_confirm : "هل تريد الاستمرار في هذا النشاط؟",
    // Button to continue the activity
    continue_button : "الاستمرار في النشاط",
    // Button for exiting the application
    exit_button : "الخروج من التطبيق",
    // Button to quit this activity
    finish_this_game : "الخروج من هذا النشاط",
    // Second prompt for quitting the activity
    finish_this_game_confirmation : "هل أنت متأكد من رغبتك في الخروج من هذا النشاط؟",
    // Button to actually quit the activity and go to the finishedView
    finish_this_game_confirmation_quit : "الخروج من النشاط",
    // Button to continue the activity instead
    finish_this_game_confirmation_cont : "الاستمرار في النشاط",
    // Error when trying to join an activity, but the internet connection is not ok
    no_connection : "لا يوجد اتصال بالإنترنت، برجاء المحاولة مرة أخرى."
};


/* 
 * Localization strings for English language
 */

taz.strings_en = {
	// warningDialog
	// WarningDialog, shown when the application starts
	warning : "Caution! Be aware of the ground conditions and traffic. Be careful not to run into objects, other people or animals while you have fun with ActionTrack.",
	// Option to turn the warning dialog off, so it won't appear on future startups
	doNotShowAgain : "Do not show again.",
		
    // showServersView
	// X amount of server found. i.e. "5 servers found".
    servers_found : "servers found.",
    // Select server. Header for the servers list
    select_server : "Select server",
    // Info popups if unable to join a server. 
    version_not_available : "Server information is not available. Unable to join a server at the moment.",
    version_client_too_old : "This server requires a newer version of the application. Please update the application to join this server.",
    version_server_too_old : "This server is no longer compatible with the application installed on your device.",
    
    // serverDescriptionView
    // After choosing server, you are shown the servers description. This text is used in the button in that view to join the server.
    accept_server : "Join",
    
    // showGamesView
    // i.e. "5 activities found."
    games_found : "activities found.",
    // i.e. "1 activity found."
    game_found : "activity found.",
    // Join activity. Header for activities list.
    join_game : "Join activity",

    // gameDescriptionView
    // After choosing activity, you are shown the activity's description. This text is used in the button in that view to join the activity.
    accept_game : "Join",

    // joinGameView
    // Header for joining the activity. used like: "Welcome to Activity X"
    welcome_to : "Welcome to",
    // Who are you? Header for text input field where you enter your name / username / teamname
    name_your_team : "Who are you?",
    // Back button
    back : "Back",
    // Submit button, used in button to submit the name and to start the activity
    accept : "Submit",

    // rejoinGameView
    // If you restart the application, and try to join a new activity, and you have previously participitated in another activity, 
    // this is the prompt to make sure you want to actually leave the old activity and start joining a new one
    sure_to_start_new_game : "You will not be able to continue the current activity. Are you sure you want to join a new activity?",
        
    // answerView
    // These are shown to the user after answering a task.
    // Full points, PERFECT!
    correct_answer : "PERFECT!",
    // Partial points, PRETTY GOOD!
    ok_answer : "PRETTY GOOD!",
    // Wrong answer, no points, OOPS!
    incorrect_answer : "OOPS!",
    // Try again, in case there is possibility to try a task again, this will be shown in a button
    try_again : "Try again",
    // Ok button
    ok : "Ok",
    // i.e. "You got 100 points"
    you_got : "You got ",
    points : "points",
    // i.e. "You have 3 attempt(s) left"
    you_have : "You have ", 
    attempt_left: " attempt left", 
    attempts_left: " attempts left",
    
    //showHintView
    // Shown in a small box indicating when the view is changed to the guiding arrow instead of hint view. i.e. "Switching to guiding arrow in 01:15"
    switching_to_compass: "Switching to guiding arrow in",
    // Button to open QR code scanner
    scan_qr_code: "Scan QR code",	
    
    // guideView
    // Distance to target checkpoint. i.e. "120 meters"
    meters : " meters",
    // Warning if you are outside of the activity area, the arrow guides you back to activity area.
    outside_game_area : "You are off limits, please follow the arrow.",
    // Warning if you are in a forbidden zone, the arrow guides you back to activity area.
    forbidden_zone : "You are in a forbidden zone, please follow the arrow.",
    // Information in the start of the activity, if the team is required to move to the start area before beginning.
	goto_start_area : "Please follow the arrow to the start area.",
	// Similiar to switching_to_compass. i.e. "Time left to reach the checkpoint: 01:15"
    time_left : "Time left to reach the checkpoint:",
    
    // mapView
    // Button used to set a checkpoint as a target
    set_as_target: "Set as target",
    // Activate button in case the checkpoint is floating one, that starts instantly when you click this button (replaces the "set as target" button)
    activate: "Activate",
    // Popup text when you have walked into a checkpoint that is not your primary target
    in_radius_of_another_cp: "Checkpoint found!",
    // Popup text when you have walked into a checkpoint that is hidden/secret
    in_radius_of_discovery_cp: "Hidden checkpoint found!",
    // Prompt about going to the checkpoint, shown under the previous texts.
    goto_non_target_cp: "Do you want to activate this checkpoint?",
    
	// queueView
    // Shown when queue is enabled, the players should form a queue and wait for the supervisor that is present at the checkpoint to come and let them to the checkpoint
	checkpoint_full : "Form a queue and wait for the supervisor.",
	
    // taskView
	// Continue button, used in tasks that don't have any questions, just information. You can continue forward on the trail by clicking this.
    continue_str : "Continue",
    // Pass / give up button to pass the current task and move on with the trail.
    give_up : "Pass",
    // Submit button for sending the answer(s) after the team has answered the questions.
    submit : "Submit",
    // Take picture button for tasks that have a task that requires a picture to be taken. Opens camera.
    take_picture : "Take picture",
    
    // If the tasks time runs out, you will be shown this in popup and you will be forced to submit your answer at it's current state automatically.
    task_time_expired : "Oops! You ran out of time.",
    // Header text for points available from the current task
    indicator_points : "Points",
    // Header text for time left to answer the task
    indicator_time : "Time",
    
    // This error will be displayed if you try to take a picture in Android without a SD card (internal or external)
    error_no_media_storage: 'Error: The device has no capable media storage (e.g. SD card) installed. Taking pictures is not possible.',
    
    // checkAnswersView
    // Button that takes you to the unlock view, from where you can unlock the supervisor view, to evaluate the current task.
    give_phone_button : "Unlock",
    // Info text above previous button, that tells the player to give the device to the supervisor
    give_phone : "Please give your mobile device to the supervisor.",
    // Header for supervisor password input field in the unlock view
    superpasswd : "Supervisor password:",
    // Unlock button after entering the password
    unlock : "Unlock",
    // Header for the picture the team took when in the evaluating view
    teams_picture : "Submitted picture:",
    // Header for the picture that shows what the answer was supposed to be like, in the evaluating view
    correct_picture : "Reference picture:",
    // Header for player/user answer in the evaluating view, in other cases than picture
    team : "User:",
    // Header for the correct answer in the evaluating view, in other cases than picture
    correct : "Correct:",
    // Points to give to the team in the evaluating view. Used like: "Points (0-100)". Used as header/label for the points input field
    given_points : "Points",
    // Submit points button under the previous field
    submit_points : "Submit points",
    
    // Popup after submitting an answer in case it was submitted for the admin to check and evaluate later.
    answer_sent_for_check : "Answer sent for scoring.",
	
    // finishedView
    // After the activity has finished, these are shown
    // Headers in the scorelist. Username, Points gained, Finished (yes/no)
    fteam : "User",
    fpoints : "Points",
    finished : "Finished",
    // Finished texts, yes / no
    yes : "Yes",
    no : "No",
    // In finishedView, a button that lets you quit from this activity, and return to the main menu
    main_menu : "Quit activity",
    // Prompt when quitting the activity, you won't be able to return into this finishedView anymore
    sure_to_exit_game : "You will not be able to return to this screen. Are you sure you want to quit?",
    // Info text in the finished view stating, that all your answers have been sent to the server and you may now close the application.
    you_may_now_close : "You may now close the application.",
    // Info text in case you still have unsent answers. Used like: 
    // "Results from 3 tasks are being uploaded. If the count does not decrease in two minutes, check your internet connection."
    warning_you_have : "Results from ",
    warning_unsent_answers : " tasks are being uploaded.",
    warning_connection : "If the count does not decrease in two minutes, check your internet connection.",
    // Refresh button for refreshing the scores list
    refresh_list : "Refresh",
    
	//rejoinGameView
    // When restarting the application, and a still ongoing activity is found from memory, prompt if user wants to rejoin that
	rejoin_header : "What would you like to do?",
	// Continue current activity button
	continue_previous_game : "Continue current activity",
	// Join new activity button
    join_new_game : "Join new activity",
    
    // adminView
    // Header for admin settings view
    adminView_header : "Admin settings",
    // Header for text field indicating the currently set default server
    adminView_current_server : "Current default server",
    // Header for the server list used to change the default server
    adminView_new_server : "Select new default server",
    // Save settings button
    adminView_save_settings : "Save settings",
    // Clear the default server button
    adminView_clear_server : "Clear server",
    
    // onDemandsLeftView
    // When the game is coming to end, but you still have on-demand tasks that you may do before finishing, this is the info text shown on the screen.
    onDemandsLeftView_text : "You still have on-demand tasks available. You may access them before quitting.",
    
    // header
    // In-game header label texts. i.e. "POINTS: 100     POSITION: 5/8    TRAVELED: 100m"
    head_points : "POINTS: ",
    head_position : "POSITION: ",
    traveled: "TRAVELLED: ",
        
    // chat
    // Send chat message button
    send : "Send",
    // Name for the admin used in chat when he/she writes a message to the players
    game_master : "Organizer",
    // Info text if there are yet no messages in the chat
    no_messages : "No messages yet. Use the box below to send a message to the organizer.",
    
    // dialogs and messages
    // Label for password field in popups where we request some password
    enter_passcode : "Enter password:",
    // Popup text for incorrect password
    wrong_password: "Incorrect password",
    // Close button for popups
    close : "Close",
    // Popup when the system is calculating the next checkpoint
    calculating_next_cp : "Deciding your next checkpoint...",
    // Prompt after clicking the pass button when doing task.
    give_up_dialog : "Are you sure you want to pass? You will not gain any points if you do!",
    // Popup when the system is loading something
    loading : "Loading...",
    // Popup when entering a checkpoint, that has plus or minus points for entering it.
    // i.e. "You were awarded 100 points for arriving at this checkpoint" or "You were deducted 100 points..."
    // you_got_points + " " + POINTS_NUMBER + " " + points + for_arriving
	you_got_points : "You were awarded",
	you_lost_points : "You were deducted",
	for_arriving : " for arriving at this checkpoint.",
	// Popup for timeout when moving to next checkpoint, when there was a time limit and you didn't make it
    route_timer_timeout : "You failed to reach the checkpoint in time.",
    // Sending points popup, a loading dialog when the system sends the points.
    sending_points : "Sending points.",
    // Sending the answer popup, a loading dialog when the system send the answer.
    sending_answer : "Sending the answer.",
    // A loading dialog when the system is looking for servers.
    finding_servers : "Finding servers.",
    // A loading dialog when the system is looking for activities.
    finding_games : "Finding activities in the area.",
    // A loading dialog when the system is trying to join the activity
    joining_game : "Joining the activity ",
    // Error dialog, if you entered a name that was already in use in this activity
    name_in_use : "Name already in use. Please try another one.",
    // Error dialog, if you tried to join the same activity multiple times
    already_joined : "Already joined",
    // A loading dialog when the system loads the activity. i.e. "Loading the activity TAZ Test Track"
	loading_game : "Loading the activity ",
	// A loading dialog when the system loads the custom map. i.e. "Loading the map 5%"
	loading_map: "Loading the map",
	// A loading dialog when the system waits for GPS fix
    waiting_gps : "Waiting for GPS location information.",
    // A popup when you have reached the finish area
    reached_finish : "You have reached the finish area.",
    // An info text when the ranking list is not yet shown because we are loading it still
    fetching_rankings : "Fetching the ranking list.",
    // Cancel button
    cancel : "Cancel",
    // An info popup, after the last task is done and the team is guided to finish area.
    that_was_last_cp : "That was the last checkpoint. Proceed to the finish area.",
    // Same as previous, but when there is no finish area.
    last_cp_game_ended : "That was the last checkpoint. Congratulations, the activity has ended!",
    // An info popup when the activity time runs out and there is a finish area.
    game_ended_with_fa: "Activity has ended. Please proceed to the finish area.",
    // Same as previous, but when there is no finish area.
    game_ended_without_fa: "Activity has ended.",
    // An info / error popup. Taking the picture failed for some reason.
    picture_failed: "No picture taken. Please try again.",
    // An info popup if you have been kicked out of the activity
    kicked_out_of_game: "You have been dropped from the activity.",
    // Exit prompt popup after clicking back button
    exit_confirm : "Do you want to continue this activity?",
    // Button to continue the activity
    continue_button : "Continue activity",
    // Button for exiting the application
    exit_button : "Exit application",
    // Button to quit this activity
    finish_this_game : "Quit this activity",
    // Second prompt for quitting the activity
    finish_this_game_confirmation : "Are you sure you want to quit this activity?",
    // Button to actually quit the activity and go to the finishedView
    finish_this_game_confirmation_quit : "Quit activity",
    // Button to continue the activity instead
    finish_this_game_confirmation_cont : "Continue activity",
    // Error when trying to join an activity, but the internet connection is not ok
    no_connection : "No connection, please try again."
};


/* 
 * Localization strings for Chinese language
 */

taz.strings_zh = {
		
	// warningDialog
	// WarningDialog, shown when the application starts
	warning : "小心！请注意道路和交通状况。请小心，不要在玩 ActionTrack 时撞到物体、其他人或动物。",
	// Option to turn the warning dialog off, so it won't appear on future startups
	doNotShowAgain : "不再显示。",
		
    // showServersView
	// X amount of server found. i.e. "5 servers found".
    servers_found : "找到的服务器。",
    // Select server. Header for the servers list
    select_server : "选择服务器",
    // Info popups if unable to join a server. 
    version_not_available : "没有服务器信息。此刻无法连接服务器。",
    version_client_too_old : "此服务器需要更新版本的应用程序。请更新该应用程序，然后连接此服务器。",
    version_server_too_old : "此服务器不再与安装在您的设备上的应用程序兼容。",
    
    // serverDescriptionView
    // After choosing server, you are shown the servers description. This text is used in the button in that view to join the server.
    accept_server : "加入",
    
    // showGamesView
    // i.e. "5 activities found."
    games_found : "找到的活动。",
    // i.e. "1 activity found."
    game_found : "找到的活动。",
    // Join activity. Header for activities list.
    join_game : "加入活动",

    // gameDescriptionView
    // After choosing activity, you are shown the activity's description. This text is used in the button in that view to join the activity.
    accept_game : "加入",

    // joinGameView
    // Header for joining the activity. used like: "Welcome to Activity X"
    welcome_to : "欢迎",
    // Who are you? Header for text input field where you enter your name / username / teamname
    name_your_team : "您是谁？",
    // Back button
    back : "返回",
    // Submit button, used in button to submit the name and to start the activity
    accept : "提交",

    // rejoinGameView
    // If you restart the application, and try to join a new activity, and you have previously participitated in another activity, 
    // this is the prompt to make sure you want to actually leave the old activity and start joining a new one
    sure_to_start_new_game : "您将无法继续当前活动。您确定要加入新活动吗？",
        
    // answerView
    // These are shown to the user after answering a task.
    // Full points, PERFECT!
    correct_answer : "漂亮！",
    // Partial points, PRETTY GOOD!
    ok_answer : "非常好！",
    // Wrong answer, no points, OOPS!
    incorrect_answer : "哎呀！",
    // Try again, in case there is possibility to try a task again, this will be shown in a button
    try_again : "请重试",
    // Ok button
    ok : "好",
    // i.e. "您得了 100 分"
    you_got : "您得了",
    points : "分数",
    // i.e. "您还有 3 次尝试机会"
    you_have : "您还有", 
    attempt_left: " 尝试机会", 
    attempts_left: " 尝试机会",
    
    //showHintView
    // Shown in a small box indicating when the view is changed to the guiding arrow instead of hint view. i.e. "Switching to guiding arrow in 01:15"
    switching_to_compass: "切换到导向箭头",
    // Button to open QR code scanner
    scan_qr_code: "扫描二维码",	
    
    // guideView
    // Distance to target checkpoint. i.e. "120 meters"
    meters : " 米",
    // Warning if you are outside of the activity area, the arrow guides you back to activity area.
    outside_game_area : "您超过了限制范围，请沿着箭头。",
    // Warning if you are in a forbidden zone, the arrow guides you back to activity area.
    forbidden_zone : "您在禁区中，请沿着箭头。",
    // Information in the start of the activity, if the team is required to move to the start area before beginning.
	goto_start_area : "请沿着箭头到达开始区域。",
	// Similiar to switching_to_compass. i.e. "Time left to reach the checkpoint:01:15"
    time_left : "到达关卡所剩下的时间：",
    
    // mapView
    // Button used to set a checkpoint as a target
    set_as_target: "设置为目标",
    // Activate button in case the checkpoint is floating one, that starts instantly when you click this button (replaces the "set as target" button)
    activate: "启动",
    // Popup text when you have walked into a checkpoint that is not your primary target
    in_radius_of_another_cp: "找到关卡！",
    // Popup text when you have walked into a checkpoint that is hidden/secret
    in_radius_of_discovery_cp: "找到隐藏的关卡！",
    // Prompt about going to the checkpoint, shown under the previous texts.
    goto_non_target_cp: "是否要启用此关卡？",
    
	// queueView
    // Shown when queue is enabled, the players should form a queue and wait for the supervisor that is present at the checkpoint to come and let them to the checkpoint
	checkpoint_full : "排队等待监管员。",
	
    // taskView
	// Continue button, used in tasks that don't have any questions, just information. You can continue forward on the trail by clicking this.
    continue_str : "继续",
    // Pass / give up button to pass the current task and move on with the trail.
    give_up : "通过",
    // Submit button for sending the answer(s) after the team has answered the questions.
    submit : "提交",
    // Take picture button for tasks that have a task that requires a picture to be taken. Opens camera.
    take_picture : "拍照",
    // If the tasks time runs out, you will be shown this in popup and you will be forced to submit your answer at it's current state automatically.
    task_time_expired : "哎呀！您的时间用完了。",
    // Header text for points available from the current task
    indicator_points : "分数",
    // Header text for time left to answer the task
    indicator_time : "时间",
    
    // checkAnswersView
    // Button that takes you to the unlock view, from where you can unlock the supervisor view, to evaluate the current task.
    give_phone_button : "解锁",
    // Info text above previous button, that tells the player to give the device to the supervisor
    give_phone : "请把您的移动设备交给监管员。",
    // Header for supervisor password input field in the unlock view
    superpasswd : "监管员密码：",
    // Unlock button after entering the password
    unlock : "解锁",
    // Header for the picture the team took when in the evaluating view
    teams_picture : "已提交的照片：",
    // Header for the picture that shows what the answer was supposed to be like, in the evaluating view
    correct_picture : "参照图：",
    // Header for player/user answer in the evaluating view, in other cases than picture
    team : "用户：",
    // Header for the correct answer in the evaluating view, in other cases than picture
    correct : "正确：",
    // Points to give to the team in the evaluating view. Used like: "Points (0-100)". Used as header/label for the points input field
    given_points : "分数",
    // Submit points button under the previous field
    submit_points : "提交分数",
    
    // Popup after submitting an answer in case it was submitted for the admin to check and evaluate later.
    answer_sent_for_check : "答案已发送，待评分。",
	
    // finishedView
    // After the activity has finished, these are shown
    // Headers in the scorelist. Username, Points gained, Finished (yes/no)
    fteam : "用户",
    fpoints : "分数",
    finished : "已完成",
    // Finished texts, yes / no
    yes : "是",
    no : "否",
    // In finishedView, a button that lets you quit from this activity, and return to the main menu
    main_menu : "退出活动",
    // Prompt when quitting the activity, you won't be able to return into this finishedView anymore
    sure_to_exit_game : "您将无法返回到此屏幕。您确定要退出吗？",
    // Info text in the finished view stating, that all your answers have been sent to the server and you may now close the application.
    you_may_now_close : "您可立即关闭此应用程序。",
    // Info text in case you still have unsent answers. Used like: 
    // "Results from 3 tasks are being uploaded.If the count does not decrease in two minutes, check your internet connection."
    warning_you_have : "正在上传",
    warning_unsent_answers : " 任务的结果。",
    warning_connection : "如果该计数在两分钟内没有减少，则请检查您的 Internet 连接。",
    // Refresh button for refreshing the scores list
    refresh_list : "刷新",
    
	//rejoinGameView
    // When restarting the application, and a still ongoing activity is found from memory, prompt if user wants to rejoin that
	rejoin_header : "您想做什么？",
	// Continue current activity button
	continue_previous_game : "继续当前活动",
	// Join new activity button
    join_new_game : "加入新活动",
    
    // adminView
    // Header for admin settings view
    adminView_header : "管理设置",
    // Header for text field indicating the currently set default server
    adminView_current_server : "当前默认服务器",
    // Header for the server list used to change the default server
    adminView_new_server : "选择新默认服务器",
    // Save settings button
    adminView_save_settings : "保存设置",
    // Clear the default server button
    adminView_clear_server : "清除服务",
    
    // onDemandsLeftView
    // When the game is coming to end, but you still have on-demand tasks that you may do before finishing, this is the info text shown on the screen.
    onDemandsLeftView_text : "您仍然可选择请求式任务。您可在退出之前访问。",
    
    // header
    // In-game header label texts. i.e. "POINTS:100     POSITION:5/8    TRAVELED:100m"
    head_points : "分数：",
    head_position : "位置：",
    traveled: "已行驶：",
        
    // chat
    // Send chat message button
    send : "发送",
    // Name for the admin used in chat when he/she writes a message to the players
    game_master : "组织者",
    // Info text if there are yet no messages in the chat
    no_messages : "还没有消息。使用下框向组织者发送消息。",
    
    // dialogs and messages
    // Label for password field in popups where we request some password
    enter_passcode : "输入密码：",
    // Popup text for incorrect password
    wrong_password: "密码错误",
    // Close button for popups
    close : "关闭",
    // Popup when the system is calculating the next checkpoint
    calculating_next_cp : "正在确定您的下一个关卡...",
    // Prompt after clicking the pass button when doing task.
    give_up_dialog : "您确定要通过吗？如果这样做，您不会获得任何分数！",
    // Popup when the system is loading something
    loading : "正在加载...",
    // Popup when entering a checkpoint, that has plus or minus points for entering it.
    // i.e. "You were awarded 100 points for arriving at this checkpoint" or "You were deducted 100 points..."
    // you_got_points + " " + POINTS_NUMBER + " " + points + for_arriving
	you_got_points : "奖励您",
	you_lost_points : "扣掉您",
	for_arriving : " 到达此关卡。",
	// Popup for timeout when moving to next checkpoint, when there was a time limit and you didn't make it
    route_timer_timeout : "您没能及时到达此关卡。",
    // Sending points popup, a loading dialog when the system sends the points.
    sending_points : "发送分数。",
    // Sending the answer popup, a loading dialog when the system send the answer.
    sending_answer : "发送答案。",
    // A loading dialog when the system is looking for servers.
    finding_servers : "找到服务器。",
    // A loading dialog when the system is looking for activities.
    finding_games : "在区域中找到活动。",
    // A loading dialog when the system is trying to join the activity
    joining_game : "加入活动",
    // Error dialog, if you entered a name that was already in use in this activity
    name_in_use : "名称已被使用。请尝试其他名称。",
    // Error dialog, if you tried to join the same activity multiple times
    already_joined : "已加入",
    // A loading dialog when the system loads the activity. i.e. "Loading the activity TAZ Test Track"
	loading_game : "加载活动",
	// A loading dialog when the system loads the custom map. i.e. "Loading the map 5%"
	loading_map: "加载地图",
	// A loading dialog when the system waits for GPS fix
    waiting_gps : "等待 GPS 位置信息。",
    // A popup when you have reached the finish area
    reached_finish : "您已到达终点。",
    // An info text when the ranking list is not yet shown because we are loading it still
    fetching_rankings : "获取排名列表。",
    // Cancel button
    cancel : "取消",
    // An info popup, after the last task is done and the team is guided to finish area.
    that_was_last_cp : "这是最后一个关卡。继续以到达终点。",
    // Same as previous, but when there is no finish area.
    last_cp_game_ended : "这是最后一个关卡。恭喜，活动已结束！",
    // An info popup when the activity time runs out and there is a finish area.
    game_ended_with_fa: "活动已结束！请继续以到达终点。",
    // Same as previous, but when there is no finish area.
    game_ended_without_fa: "活动已结束！",
    // An info / error popup. Taking the picture failed for some reason.
    picture_failed: "没有拍照。请重试。",
    // An info popup if you have been kicked out of the activity
    kicked_out_of_game: "您已经离开活动。",
    // Exit prompt popup after clicking back button
    exit_confirm : "是否要继续此活动？",
    // Button to continue the activity
    continue_button : "继续活动",
    // Button for exiting the application
    exit_button : "退出应用程序",
    // Button to quit this activity
    finish_this_game : "退出此活动",
    // Second prompt for quitting the activity
    finish_this_game_confirmation : "您确定要退出此活动吗？",
    // Button to actually quit the activity and go to the finishedView
    finish_this_game_confirmation_quit : "退出活动",
    // Button to continue the activity instead
    finish_this_game_confirmation_cont : "继续活动",
    // Error when trying to join an activity, but the internet connection is not ok
    no_connection : "没有连接，请重试。"
};


/* 
 * Localization strings for Finnish language
 */

taz.strings_fi = {
		
	// warningDialog
	// WarningDialog, shown when the application starts
	warning : "Ole varovainen pelatessasi! Ota huomioon maasto ja liikenne. Pid&auml; huolta ettet t&ouml;rm&auml;&auml; rakennuksiin, ihmisiin tai el&auml;imiin pit&auml;ess&auml;si hauskaa ActionTrackin kanssa.",
	// Option to turn the warning dialog off, so it won't appear on future startups
	doNotShowAgain : "&Auml;l&auml; n&auml;yt&auml; uudelleen",
		
    // showServersView
	// X amount of server found. i.e. "5 servers found".
    servers_found : "palvelinta l&ouml;ytynyt!",
    // Select server. Header for the servers list
    select_server : "Valitse palvelin",
    // Info popups if unable to join a server. 
	version_not_available : "Palvelimeen ei saada t&auml;ll&auml; hetkell&auml; yhteytt&auml;. Yrit&auml; my&ouml;hemmin uudelleen.",
    version_client_too_old : "Palvelin vaatii uudemman version sovelluksesta. P&auml;ivit&auml; sovellus liitty&auml;ksesi palvelimelle.",
    version_server_too_old : "Palvelin on vanhentunut eik&auml; ole en&auml;&auml; yhteensopiva sovelluksen t&auml;m&auml;n version kanssa.",
    
    // serverDescriptionView
    // After choosing server, you are shown the servers description. This text is used in the button in that view to join the server.
    accept_server : "Liity",
    
    // showGamesView
    // i.e. "5 activities found."
    games_found : "aktiviteettia l&ouml;ytynyt.",
    // i.e. "1 activity found."
    game_found : "aktiviteetti l&ouml;ytynyt.",
    // Join activity. Header for activities list.
    join_game : "Liity aktiviteettiin",

    // gameDescriptionView
    // After choosing activity, you are shown the activity's description. This text is used in the button in that view to join the activity.
    accept_game : "Liity",

    // joinGameView
    // Header for joining the activity. used like: "Welcome to Activity X"
    welcome_to : "Tervetuloa aktiviteettiin",
    // Who are you? Header for text input field where you enter your name / username / teamname
    name_your_team : "Kuka olet?",
    // Back button
    back : "Takaisin",
    // Submit button, used in button to submit the name and to start the activity
    accept : "Hyv&auml;ksy",

    // rejoinGameView
    // If you restart the application, and try to join a new activity, and you have previously participitated in another activity, 
    // this is the prompt to make sure you want to actually leave the old activity and start joining a new one
    sure_to_start_new_game : "Et voi jatkaa kesken j&auml;&auml;nyttä aktiviteettia aloitettuasi uuden. Haluatko varmasti liitty&auml; uuteen aktiviteettiin?",
        
    // answerView
    // These are shown to the user after answering a task.
    // Full points, PERFECT!
    correct_answer : "T&Auml;YDELLIST&Auml;!", 
    // Partial points, PRETTY GOOD!
    ok_answer : "MAINIOTA!",
    // Wrong answer, no points, OOPS!
    incorrect_answer : "HUPSIS!",
    // Try again, in case there is possibility to try a task again, this will be shown in a button
    try_again : "Yrit&auml; uudelleen",
    // Ok button
    ok : "Ok",
    // i.e. "You got 100 points"
    you_got : "Sait ",
    points : "pistett&auml;",
    // i.e. "You have 3 attempt(s) left"
    you_have : "Sinulla on ", 
    attempt_left: " yritys j&auml;ljell&auml;", 
    attempts_left: " yrityst&auml; j&auml;ljell&auml;", 
    
    //showHintView
    // Shown in a small box indicating when the view is changed to the guiding arrow instead of hint view. i.e. "Switching to guiding arrow in 01:15"
    switching_to_compass: "Aikaa nuoliohjaukseen siirtymiseen",
    // Button to open QR code scanner
    scan_qr_code: "Skannaa QR-koodi",	
    
    // guideView
    // Distance to target checkpoint. i.e. "120 meters"
    meters : " metri&auml;",
    // Warning if you are outside of the activity area, the arrow guides you back to activity area.
    outside_game_area : "Olette aktiviteettialueen ulkopuolella. Palatkaa takaisin alueelle.",
    // Warning if you are in a forbidden zone, the arrow guides you back to activity area.
    forbidden_zone : "Olette kielletyll&auml; alueella. Palatkaa takaisin sallitulle alueelle.",
    // Information in the start of the activity, if the team is required to move to the start area before beginning.
	goto_start_area : "Siirtyk&auml;&auml; aloitusalueelle.",
	// Similiar to switching_to_compass. i.e. "Time left to reach the checkpoint: 01:15"
    time_left : "Aikaa j&auml;ljell&auml; rastille siirtymiseen:",
    
    // mapView
    // Button used to set a checkpoint as a target
    set_as_target: "Aseta kohteeksi",
    // Activate button in case the checkpoint is floating one, that starts instantly when you click this button (replaces the "set as target" button)
    activate: "Aktivoi",
    // Popup text when you have walked into a checkpoint that is not your primary target
    in_radius_of_another_cp: "Rasti l&ouml;ytynyt!",
    // Popup text when you have walked into a checkpoint that is hidden/secret
    in_radius_of_discovery_cp: "Piilotettu rasti l&ouml;ytynyt!",
    // Prompt about going to the checkpoint, shown under the previous texts.
    goto_non_target_cp: "Haluatko aktivoida t&auml;m&auml;n rastin?",
    
	// queueView
    // Shown when queue is enabled, the players should form a queue and wait for the supervisor that is present at the checkpoint to come and let them to the checkpoint
	checkpoint_full : "Muodostakaa jono ja odottakaa rastin valvojaa.",
	
    // taskView
	// Continue button, used in tasks that don't have any questions, just information. You can continue forward on the trail by clicking this.
    continue_str : "Jatka",
    // Pass / give up button to pass the current task and move on with the trail.
    give_up : "Ohita",
    // Submit button for sending the answer(s) after the team has answered the questions.
    submit : "L&auml;het&auml;",
    // Take picture button for tasks that have a task that requires a picture to be taken. Opens camera.
    take_picture : "Ota kuva",
    // If the tasks time runs out, you will be shown this in popup and you will be forced to submit your answer at it's current state automatically.
    task_time_expired : "Vastausaikanne loppui",
    // Header text for points available from the current task
    indicator_points : "Pistett&auml;",
    // Header text for time left to answer the task
    indicator_time : "Aika",
    
    // checkAnswersView
    // Button that takes you to the unlock view, from where you can unlock the supervisor view, to evaluate the current task.
    give_phone_button : "Avaa",
    // Info text above previous button, that tells the player to give the device to the supervisor
    give_phone : "Anna puhelin rastilla aktiviteetin valvojalle teht&auml;v&auml;n tarkistusta varten.",
    // Header for supervisor password input field in the unlock view
    superpasswd : "Tarkistajan salasana:",
    // Unlock button after entering the password
    unlock : "Avaa",
    // Header for the picture the team took when in the evaluating view
    teams_picture : "Lähetetty kuva:",
    // Header for the picture that shows what the answer was supposed to be like, in the evaluating view
    correct_picture : "Oikea kuva:",
    // Header for player/user answer in the evaluating view, in other cases than picture
    team : "K&auml;yttäj&auml;:",
    // Header for the correct answer in the evaluating view, in other cases than picture
    correct : "Oikea:",
    // Points to give to the team in the evaluating view. Used like: "Points (0-100)". Used as header/label for the points input field
    given_points : "Pisteet",
    // Submit points button under the previous field
    submit_points : "Anna pisteet",
    
    // Popup after submitting an answer in case it was submitted for the admin to check and evaluate later.
    answer_sent_for_check : "Vastauksesi l&auml;hetettiin tarkastettavaksi.",
	
    // finishedView
    // After the activity has finished, these are shown
    // Headers in the scorelist. Username, Points gained, Finished (yes/no)
    fteam : "K&auml;ytt&auml;j&auml;:",
    fpoints : "Pisteet",
    finished : "Maalissa",
    // Finished texts, yes / no
    yes : "Kyll&auml;",
    no : "Ei",
    // In finishedView, a button that lets you quit from this activity, and return to the main menu
    main_menu : "Poistu aktiviteetista",
    // Prompt when quitting the activity, you won't be able to return into this finishedView anymore
    sure_to_exit_game : "Et voi palata t&auml;h&auml;n n&auml;kym&auml;&auml;n poistuttuasi. Haluatko varmasti poistua n&auml;kym&auml;st&auml;?",
    // Info text in the finished view stating, that all your answers have been sent to the server and you may now close the application.
    you_may_now_close : "Voit nyt sulkea sovelluksen.",
    // Info text in case you still have unsent answers. Used like: 
    // "Results from 3 tasks are being uploaded. If the count does not decrease in two minutes, check your internet connection."
    warning_you_have : "",
    warning_unsent_answers : " teht&auml;v&auml;n vastaukset ovat viel&auml; l&auml;hett&auml;m&auml;tt&auml;.",
    warning_connection : "Jos luku ei pienene kahdessa minuutissa, tarkista internet-yhteys.",
    // Refresh button for refreshing the scores list
    refresh_list : "P&auml;ivit&auml;",
    
	//rejoinGameView
    // When restarting the application, and a still ongoing activity is found from memory, prompt if user wants to rejoin that
	rejoin_header : "Mit&auml; haluat tehd&auml;?",
	// Continue current activity button
	continue_previous_game : "Jatka nykyistä aktiviteettia",
	// Join new activity button
    join_new_game : "Liity uuteen aktiviteettiin",
    
    // adminView
    // Header for admin settings view
    adminView_header : "Admin-asetukset",
    // Header for text field indicating the currently set default server
    adminView_current_server : "Nykyinen serveri",
    // Header for the server list used to change the default server
    adminView_new_server : "Valitse uusi serveri",
    // Save settings button
    adminView_save_settings : "Tallenna",
    // Clear the default server button
    adminView_clear_server : "Tyhjenn&auml;",
    
    // onDemandsLeftView
    // When the game is coming to end, but you still have on-demand tasks that you may do before finishing, this is the info text shown on the screen.
    onDemandsLeftView_text : "Lis&auml;teht&auml;vi&auml; on viel&auml; j&auml;ljell&auml;. Voitte suorittaa niit&auml; ennen kuin lopetatte aktiviteetin.",
    
    // header
    // In-game header label texts. i.e. "POINTS: 100     POSITION: 5/8    TRAVELED: 100m"
    head_points : "PISTEET: ",
    head_position : "SIJOITUS: ",
    traveled: "MATKA: ",
        
    // chat
    // Send chat message button
    send : "L&auml;het&auml;", 
    // Name for the admin used in chat when he/she writes a message to the players
    game_master : "J&auml;rjest&auml;j&auml;",
    // Info text if there are yet no messages in the chat
    no_messages : "Ei viestej&auml; t&auml;ll&auml; hetkell&auml;. Voit l&auml;hett&auml;&auml; j&auml;rjest&auml;j&auml;lle viestin alla olevasta viestikent&auml;st&auml;.",
    
    // dialogs and messages
    // Label for password field in popups where we request some password
    enter_passcode : "Sy&ouml;t&auml; salasana:",
    // Popup text for incorrect password
    wrong_password: "V&auml;&auml;r&auml; salasana",
    // Close button for popups
    close : "Sulje",
    // Popup when the system is calculating the next checkpoint
    calculating_next_cp : "Lasketaan seuraavaa rastia...",
    // Prompt after clicking the pass button when doing task.
    give_up_dialog : 'Haluatko varmasti luovuttaa? Luovutetusta teht&auml;v&auml;st&auml; ei saa pisteit&auml;!',
    // Popup when the system is loading something
    loading : "Ladataan...",
    // Popup when entering a checkpoint, that has plus or minus points for entering it.
    // i.e. "You were awarded 100 points for arriving at this checkpoint" or "You were deducted 100 points..."
    // you_got_points + " " + POINTS_NUMBER + " " + points + for_arriving
	you_got_points : "Saitte rastille saapumisesta",
	you_lost_points : "Menetitte rastille saapumisesta",
	for_arriving : "",
	// Popup for timeout when moving to next checkpoint, when there was a time limit and you didn't make it
    route_timer_timeout : "Ette ehtineet rastille ajoissa. Ohjataan seuraavalle rastille.",
    // Sending points popup, a loading dialog when the system sends the points.
    sending_points : "L&auml;hetet&auml;&auml;n pisteit&auml; palvelimelle",
    // Sending the answer popup, a loading dialog when the system send the answer.
    sending_answer : "L&auml;hetet&auml;&auml;n vastausta palvelimelle",
    // A loading dialog when the system is looking for servers.
    finding_servers : "Haetaan palvelimia",
    // A loading dialog when the system is looking for activities.
    finding_games : "Etsitään aktiviteetteja alueelta.",
    // A loading dialog when the system is trying to join the activity
    joining_game : "Liityt&auml;&auml;n aktiviteettiin ",
    // Error dialog, if you entered a name that was already in use in this activity
    name_in_use : "Nimi on jo k&auml;yt&ouml;ss&auml;. Kokeile toista nime&auml;.",
    // Error dialog, if you tried to join the same activity multiple times
    already_joined : "Olet jo liittynyt aktiviteettiin.",
    // A loading dialog when the system loads the activity. i.e. "Loading the activity TAZ Test Track"
	loading_game : "Ladataan aktiviteettia ",
	// A loading dialog when the system loads the custom map. i.e. "Loading the map 5%"
	loading_map: "Ladataan karttaa",
	// A loading dialog when the system waits for GPS fix
    waiting_gps : "Odotetaan GPS-paikannusta",
    // A popup when you have reached the finish area
    reached_finish : "Saavuit maalialueelle.",
    // An info text when the ranking list is not yet shown because we are loading it still
    fetching_rankings : "Noudetaan tuloslistaa",
    // Cancel button
    cancel : "Peruuta",
    // An info popup, after the last task is done and the team is guided to finish area.
    that_was_last_cp : "Se oli viimeinen rasti. Jatkakaa maalialueelle.",
    // Same as previous, but when there is no finish area.
    last_cp_game_ended : "Se oli viimeinen rasti. Onneksi olkoon, aktiviteetti on p&auml;&auml;ttynyt!",
    // An info popup when the activity time runs out and there is a finish area.
    game_ended_with_fa: "Aktiviteetti p&auml;&auml;ttyi. Olkaa hyv&auml; ja jatkakaa maalialueelle.",
    // Same as previous, but when there is no finish area.
    game_ended_without_fa: "Aktiviteetti p&auml;&auml;ttyi. Olkaa hyv&auml; ja palatkaa l&auml;ht&ouml;paikalle.",
    // An info / error popup. Taking the picture failed for some reason.
    picture_failed: "Kuvan ottaminen ep&auml;onnistui. Ole hyv&auml; ja yrit&auml; uudelleen.",
    // An info popup if you have been kicked out of the activity
    kicked_out_of_game: "Teid&auml;t on pudotettu aktiviteetista.",
    // Exit prompt popup after clicking back button
    exit_confirm : "Haluatko jatkaa t&auml;t&auml; aktiviteettia?",
    // Button to continue the activity
    continue_button : "Jatka aktiviteettia",
    // Button for exiting the application
    exit_button : "Poistu sovelluksesta",
    // Button to quit this activity
    finish_this_game : "Poistu aktiviteetista",
    // Second prompt for quitting the activity
    finish_this_game_confirmation : "Haluatko varmasti lopettaa t&auml;m&auml;n aktiviteetin?",
    // Button to actually quit the activity and go to the finishedView
    finish_this_game_confirmation_quit : "Poistu aktiviteetista",
    // Button to continue the activity instead
    finish_this_game_confirmation_cont : "Jatka aktiviteettia",
    // Error when trying to join an activity, but the internet connection is not ok
    no_connection : "Yhteytt&auml; palvelimeen ei voitu muodostaa, yrit&auml; uudelleen.",
};


/**
 * @class
 */
taz.OnDemandsLeftState = function(game, id) {
    // Call parent class implementation.
    taz.State.call(this, game, id);
};

taz.inherits(taz.OnDemandsLeftState, taz.State);

/**
 * Called when the state is entered.
 */
taz.OnDemandsLeftState.prototype.enterState = function() {
    console.log("INFO(State): Changed state to OnDemandsLeftState");
    
    taz.viewManager.changeView('onDemandsLeftView', null);
};

taz.OnDemandsLeftState.prototype.showOnDemandTask = function() {
    taz.game.setState(taz.Game.State.ON_DEMAND_TASK);
};

/**
 * @class
 */
taz.OnDemandTaskState = function(game, id) {
    // Call parent class implementation.
    taz.State.call(this, game, id);
};

taz.inherits(taz.OnDemandTaskState, taz.State);

/**
 * @enum Substates of this state.
 */
taz.OnDemandTaskState.State = {
    ON_TASK : 0,
    ANSWER_VIEW : 1
};

/**
 * Called when the state is entered.
 */
taz.OnDemandTaskState.prototype.enterState = function() {
    console.log("INFO(State): Changed state to OnDemandTaskState");

    // Set task answer time start to now.
    var now = new Date().getTime();
    this.model.setBeginShowTaskTime(now);

    taz.sounds.play(taz.Sounds.Type.ARRIVED_TO_CHECK_POINT);
    taz.vibration.vibrate(750);

    this.model.setSubState(taz.OnDemandTaskState.State.ON_TASK);
    this.showTaskView_();
};

/**
 * @private
 */
taz.OnDemandTaskState.prototype.showTaskView_ = function() {
    var task = this.model.getCurrentOnDemandTask();
    var answer = this.model.getAnswerToCurrentOnDemandTask();
    var taskShowBegin = this.model.getBeginShowTaskTime();

    if (task) {
        var taskData = {
            task : task,
            answer : answer,
            taskShowBegin : taskShowBegin
        };

        taz.viewManager.changeView('taskView', taskData);  
    } else {
        this.game.setState(taz.Game.State.ON_WAY_TO_CHECKPOINT);
    }
};

/**
 * Called when the state is continued after restart of the application.
 */
taz.OnDemandTaskState.prototype.continueState = function() {
    var STATE = taz.OnDemandTaskState.State;
    var subState = this.model.getSubState();
    
    switch (subState) {
        case STATE.ON_TASK:
            this.showTaskView_();
            break;
        case STATE.ANSWER_VIEW:
            var points = this.model.getPointsGainedFromCurrentOnDemandTask();
            this.showAnswerView_(points);
            break;
        default:
            this.enterState();
            break;
    };
};

/**
 * Called when user leaves on-demand task.
 */
taz.OnDemandTaskState.prototype.leaveTask_ = function() {
    this.model.markOnDemandTaskAsDone();
    this.game.setState(taz.Game.State.ON_WAY_TO_CHECKPOINT);
}


/**
 * Called from the TaskView when that answer changes: for example when the team fills
 * a new text answer or selects a new check box during the answering process.
 */
taz.OnDemandTaskState.prototype.answerChanged = function(answer) {
    // Persist the answer.
    answer.taskId = this.model.getCurrentOnDemandTask().id;
    answer.checkPointTemplateId = null;
    answer.answerType = 'ON_DEMAND_ANSWER';    
    
    this.model.setAnswerToCurrentOnDemandTask(answer);
};

/**
 * Called from the taskView after the user has an answer.
 * 
 * @param {TaskAnswerDTO} answer
 */
taz.OnDemandTaskState.prototype.answerTask = function(answer) {
    answer.taskId = this.model.getCurrentOnDemandTask().id;
    answer.checkPointTemplateId = null;
    answer.answerType = 'ON_DEMAND_ANSWER';
    
    // Persist the final version of the answer.
    this.model.setAnswerToCurrentOnDemandTask(answer);

    if (answer.maximumPoints == 0) {
        // If maximum points is zero, skip checking.
        this.taskAnswersChecked(0);
    } else {
        this.checkAnswerAutomatic_(answer);
    }
};

/**
 * Called from the taskView after the user gives up.
 */
taz.OnDemandTaskState.prototype.giveUpTask = function() {
    this.leaveTask_();
};

/**
 * Overridden from taz.State. This state does not need user's accurate 
 * location.
 */
taz.OnDemandTaskState.prototype.isLocationSensitive = function() {	
    return false;
};

/**
 * Overridden from taz.State. If the team is doing a task no unneeded 
 * popups should occur.
 */
taz.OnDemandTaskState.prototype.requiresAttention = function() {
    return true;
};

/**
 * Called when answer has been checked.
 */
taz.OnDemandTaskState.prototype.taskAnswersChecked = function(points) {
    this.showAnswerView_(points);
};

/**
 * Called from AnswerView when "retry" has been clicked. 
 */
taz.OnDemandTaskState.prototype.retryTask = function() {
    // Retry is not supported in on-demand tasks, this shouldn't be called.
};

/**
 * Called from AnswerView when "ok" has been clicked. 
 */
taz.OnDemandTaskState.prototype.acceptTask = function(points) {
    var gameId = this.model.getGameId();
    var teamId = this.model.getTeamId();
    var that = this;    
    
    // Update the model.
    this.model.setPoints(Number(this.model.getPoints()) + Number(points));
    
    // Try to send the answer
    var answerData = this.model.getAnswerToCurrentOnDemandTask();  
    answerData.points = points;
    
    this.backend.answerTask(gameId, teamId, answerData, function(data) {
        // Mark answer as sent.
        data && that.model.setAnswersSent([answerData]);
    });

    // Leave task and start guiding to the next check point or to the finish area.
    this.leaveTask_();
}

/**
 * Checks answer offline. Only RADIO_GROUP_ANSWER and NUMBER_ANSWER type of task
 * elements can be checked.
 * 
 * @private
 */
taz.OnDemandTaskState.prototype.checkAnswerAutomatic_ = function(answer) {
    var task = this.model.getCurrentOnDemandTask();
    var points = taz.task.checkAnswer(task, answer);
    this.taskAnswersChecked(points);
};

/**
 * Called after the answer has been checked.
 * 
 * @private
 */
taz.OnDemandTaskState.prototype.showAnswerView_ = function(points) {
    this.model.setPointsGainedFromCurrentOnDemandTask(points);

    var answer = this.model.getAnswerToCurrentOnDemandTask();
    var task = this.model.getCurrentOnDemandTask();

    // On-demand tasks have only one attempt
    var answerData = {
        points : points,
        maxPoints : answer.maximumPoints,
        taskPoints : task.points,
        attempts : 1,
        maxAttempts : 1,
        useCustomFeedback : true,
        correctAnswerFeedback : task.correctAnswerFeedback,
        necAnswerFeedback : task.notEntirelyCorrectAnswerFeedback,
        wrongAnswerFeedback : task.wrongAnswerFeedback
    }
    
    if (this.model.isCurrentOnDemandTaskAnswerTask()) {
        this.model.setSubState(taz.OnDemandTaskState.State.ANSWER_VIEW);
        // Show the points to the team.
        taz.viewManager.changeView('answerView', answerData);
    }
    else {
        this.acceptTask(points);
    }
};

/**
 * Called when the state exited.
 */
taz.OnDemandTaskState.prototype.exitState = function() {
    taz.State.prototype.exitState.call(this);
};



/**
 * @class
 */
taz.OnWayToFinishAreaState = function(game, id) {
    // Call parent class implementation.
    taz.State.call(this, game, id);
};

taz.inherits(taz.OnWayToFinishAreaState, taz.State);

/**
 * @private
 */
taz.OnWayToFinishAreaState.prototype.finishAreaReached_ = false;

/**
 * Called when the state is entered.
 */
taz.OnWayToFinishAreaState.prototype.enterState = function() {
    console.log("INFO(State): Changed state to OnWayToFinishAreaState");
    var finishArea = this.model.getFinishArea();
    var that = this;  
    var guideData = {
        // Guide to the center of the finish area.
        goalPosition: finishArea.calculateCenter(),
        cpSize: 0,
        guideTimerStartTime: null,
        guideTimerTimeout: null
    };
    
    if (taz.game.isNoGpsGame()) {
        // Fake a status update to the start area
        taz.navigation.setCurrentPosition(finishArea.getRandomPoint(), 10);
    }    
    
    if(this.finishAreaReached_  || taz.game.isNoGpsGame()) {
    	if(taz.game.isOnDemandTaskAvailable()) {
    		that.game.setState(taz.Game.State.ON_DEMANDS_LEFT);
    	} else {
    		that.game.setState(taz.Game.State.FINISHED);
    	}
    } else {
    	taz.viewManager.changeView('guideView', guideData);
    }
};

/**
 * Called when the position changes.
 * 
 * @param {taz.GeoPosition} position The new position.
 */
taz.OnWayToFinishAreaState.prototype.positionChanged = function(position) {
    if (taz.game.isNoGpsGame()) {
        taz.State.prototype.positionChanged.call(this, position);
        return;
    }    
    
    var finishArea = this.model.getFinishArea();
    this.checkIfInGameArea(position);
        
    if (this.isInValidGameZone) {
        // Guide to the nearest point in the game area.
        taz.guideView.teamInAllowedArea(finishArea.nearestPointInPolygon(position));
    }
        
    // Call parent class implementation.
    taz.State.prototype.positionChanged.call(this, position);
    
    if (finishArea.containsPosition(position) && !this.finishAreaReached_) {
        // This makes sure the dialog is only shown once.
        this.finishAreaReached_ = true;
        var that = this;
                
        taz.sounds.play(taz.Sounds.Type.GOAL_REACHED);
        taz.dialogs.okDialog(taz.strings.reached_finish, function() {
            if(taz.game.isOnDemandTaskAvailable()) {
        		that.game.setState(taz.Game.State.ON_DEMANDS_LEFT);
        	} else {
        		that.game.setState(taz.Game.State.FINISHED);
        	}
        });   
    }
};

/**
 * Called when the state exited.
 */
taz.OnWayToFinishAreaState.prototype.exitState = function() {
    taz.State.prototype.exitState.call(this);
//    this.finishAreaReached_ = false;
};

taz.OnWayToFinishAreaState.prototype.showOnDemandTask = function() {
    taz.game.setState(taz.Game.State.ON_DEMAND_TASK);
};


/**
 * @class
 */
taz.OnWayToCheckPointState = function(game, id) {
    // Call parent class implementation.
    taz.State.call(this, game, id);
    this.offlineRouter_ = new taz.OfflineRouter(this.model);
};

taz.inherits(taz.OnWayToCheckPointState, taz.State);

taz.OnWayToCheckPointState.prototype.lastCheckpointShown_ = false;

/**
 * @enum
 */
taz.OnWayToCheckPointState.STATE = {
    NEXT_CHECK_POINT_CALCULATED : 0,
    GUIDE_HINT_SHOWN : 1
};

/**
 * Flag that indicates whether the popup that asks the team whether they want to 
 * go to another checkpoint than their target is visible or not. Used to prevent 
 * opening multiple popups. 
 * @private
 */
taz.OnWayToCheckPointState.prototype.gotoNonTargetCheckpointDialogVisible_ = false;

/**
 * 
 */
taz.OnWayToCheckPointState.prototype.gotoNonTargetCheckpointDialogCloseTime_ = 0;

/**
 * 
 */
taz.OnWayToCheckPointState.prototype.currentMapZoomLevel_ = null;

/**
 * Called when the state is entered.
 */
taz.OnWayToCheckPointState.prototype.enterState = function() {
    console.log("TAZ: INFO(State): Changed state to OnWayToCheckPointState");
    var currentCheckPoint = this.model.getCurrentCheckPoint();
    this.validCheckpoints_ = null;
    
    var stashedState = this.model.popStashedSubState(taz.Game.State.ON_WAY_TO_CHECKPOINT);
    if (stashedState !== null) {
        console.log("POPPED A STASHED STATE: " + stashedState);
        this.model.setSubState(stashedState);
        
        var stashedView = this.model.popStashedActiveViewId();
        if (stashedView === "mapView") {
            this.showMapView();
        }
        else {
            this.guide_();
        }
        return;
    }

    this.model.stashActiveViewId(null);
    
    this.model.setBeginShowGuideTime(null);
    var game = this.model.getGame();
    var routeData = null;

    if (currentCheckPoint && currentCheckPoint.routingType == 'TEAM') {
    	routeData = {
    		teamPoints: this.model.getPoints(),
    		routingInstructions: currentCheckPoint.routingInstructions,
    		startingEdges: currentCheckPoint.startingEdges
    	}
    }

    // currentCheckPoint is null only when the game has just started and no check points
    // have been visited. In this case check if the game has starting edges.
    if (!currentCheckPoint && game.template.startRoutingType == 'TEAM') {
    	routeData = {
    		teamPoints: this.model.getPoints(),
    		routingInstructions: game.template.startRoutingInstructions,
		startingEdges: game.template.startingEdges
    	}
    }
    
    if (routeData) {
        this.guideUsingTeamRouteSelection_(routeData);
    } else if(!currentCheckPoint) {
        if(game.template.startingEdges && game.template.startingEdges.length == 1) {
            this.selectRoute(game.template.startingEdges[0]);
        } else {
            this.guideUsingAutomaticRouteSelection_();
        }
    } else if(currentCheckPoint.startingEdges.length == 1) {
		var checkPoint = this.model.getCheckPointById(currentCheckPoint.startingEdges[0].endId);
		// If we can afford this route, just go there
		if (this.model.getPoints() + checkPoint.arrivePoints >= 0 && this.model.getPoints() - checkPoint.requiredPoints >= 0) {        
			this.selectRoute(currentCheckPoint.startingEdges[0]);
		}
		// Otherwise mark the graph as visited and continue to other graphs
		else {
	        var graph = this.model.getGraph();
	        var graphIdList = graph.calculateGraphOf(currentCheckPoint.id);
	        this.model.markCheckPointsAsVisited(graphIdList);
			this.guideUsingAutomaticRouteSelection_();
		}
    } else {
        this.guideUsingAutomaticRouteSelection_();
    }
};

/**
 * @private
 */
taz.OnWayToCheckPointState.prototype.guideUsingTeamRouteSelection_ = function(routeData) {
    // Let the user decide which route to take. selectRoute method is called
    // from the chooseRouteView after the selection has been done.
    taz.viewManager.changeView('chooseRouteView', routeData);
};

/**
 * Called from ChooseRouteView when the team has selected a route.
 * 
 * @param {EdgeDTO} selectedEdge The edge that corresponds to the selected route.
 */
taz.OnWayToCheckPointState.prototype.selectRoute = function(selectedEdge) { 
    // Set points based on route selection
    if (selectedEdge.points) {
        this.model.setPoints(this.model.getPoints() + selectedEdge.points);
    }
    
    var nextCheckPoint = this.model.getCheckPointById(selectedEdge.endId);
    this.nextCheckPointCalculated_(nextCheckPoint);
};

taz.OnWayToCheckPointState.prototype.selectCheckpointFromMap = function(selectedCheckpoint) {
    // If changing checkpoints, make sure the client is no longer in the GUIDE_HINT_SHOWN state.
    this.model.setBeginShowGuideTime(null);
    this.model.setSubState(taz.OnWayToCheckPointState.STATE.NEXT_CHECK_POINT_CALCULATED);    
    this.nextCheckPointCalculated_(selectedCheckpoint);
};

taz.OnWayToCheckPointState.prototype.showMapView = function() {
    var validCheckpoints = this.getPreviouslyValidCheckpoints();
    var targetCp = this.model.getCurrentCheckPoint();
    var nextCheckPointCalculated = (this.model.getSubState() != null);
    
    // Substate must be at least in the NEXT_CHECKPOINT_CALCULATED stage for 
    // there to be a target. Otherwise the current checkpoint will just point 
    // to the previously visited one.
    if (!nextCheckPointCalculated) {
        targetCp = null;
    }
    
    this.askNextCheckpointWithMap_(validCheckpoints || [], targetCp);
};

taz.OnWayToCheckPointState.prototype.switchToGuideView = function() {
    this.guide_();
};

/**
 * @private
 */
taz.OnWayToCheckPointState.prototype.guideUsingAutomaticRouteSelection_ = function() {    
    var that = this;
    var gameId = this.model.getGameId();
    var teamId = this.model.getTeamId();
    
    var validCheckPoints = this.offlineRouter_.getValidCheckPoints();
    var validCheckPointIds = [];
    
    var currentCheckPoint = this.model.getCurrentCheckPoint();
    var hasConnections = false;
    var template = this.model.getGame().template;
    
    if ((currentCheckPoint != null && !currentCheckPoint.graphEnd) || (currentCheckPoint == null && template.startingEdges)) {
    	hasConnections = true;
    }
    
    for (var i = 0; i < validCheckPoints.length; ++i) {
    	validCheckPointIds.push(validCheckPoints[i].id);
    }
    
    console.log("TAZ: DEBUG(GuideUsingAutomaticRouteSelection): Valid Checkpoints: " + validCheckPointIds);
    
    //check if this the last checkpoint
    if(validCheckPointIds.length == 0) {
    	console.log("TAZ: INFO(Routing): No more valid checkpoints left, going to finish.");
        this.nextCheckPointCalculated_(null);
        taz.loadingDialog.hide();
        return;
    }
    
    var nextCheckPointCb = _.once(function(nextCheckPointId) {
        taz.loadingDialog.hide();        
        if (nextCheckPointId == null) {
            that.nextCheckPointCalculated_(null);
        } else if(nextCheckPointId > 0) {
            var nextCheckPoint = that.model.getCheckPointById(nextCheckPointId);
            that.nextCheckPointCalculated_(nextCheckPoint);
        } else {
            var nextCalculatedCheckPoint = that.offlineRouter_.calculateNextCheckPoint();
            console.log("TAZ: Got the self calculated next checkpoint: " + nextCalculatedCheckPoint.name);
            that.nextCheckPointCalculated_(nextCalculatedCheckPoint);
        }        
    });
    
    var betweenGraphs = currentCheckPoint == null || currentCheckPoint.graphEnd || this.offlineRouter_.forceBetweenGraphs;
    var comingFromStartArea = (!(betweenGraphs && currentCheckPoint != null) || template.startArea === null);
    var forcedRoutingFromStart = comingFromStartArea && template.startingEdges.length;
    
    this.offlineRouter_.forceBetweenGraphs = false;
    var mapEnabled = this.model.getGame().template.enableMapView;
    if (validCheckPoints.length > 1 && betweenGraphs && mapEnabled && !forcedRoutingFromStart) {
        this.askNextCheckpointWithMap_(validCheckPoints);
        this.model.setPreviousValidCheckpointIds(validCheckPointIds);
    }
    else {
        taz.loadingDialog.setLoadingMessage(taz.strings.calculating_next_cp);
        taz.loadingDialog.show();        
        
        this.backend.getNextCheckPoint(gameId, teamId, validCheckPointIds, hasConnections, nextCheckPointCb);
        //and ensure that callback is always called even if network goes bad
        _.delay(function(){
            console.log("TAZ: watchdog timer bites: force use of offlinerouter!");
            nextCheckPointCb(-1);
        }, 30000);
    }
};

taz.OnWayToCheckPointState.prototype.askNextCheckpointWithMap_ = function(validCheckpoints, targetCheckpoint) {    
    var mapData = {
        validCheckpoints: validCheckpoints,
        targetCheckpoint: targetCheckpoint || null,
        gameZone: this.model.getGame().template.zone,
        forbiddenZones: this.model.getGame().template.forbiddenZones,
        showScanQrCodeIcon: this.canScanQrCode(),
        showGuideViewIcon: targetCheckpoint != null,
        startZoom: this.currentMapZoomLevel_
    };
    
    taz.viewManager.changeView('mapView', mapData);
    
    var that = this;
    taz.mapView.addZoomChangedListener(function(zoom) {
        console.log("Zoom changed to " + zoom);
        that.currentMapZoomLevel_ = zoom;
    });
};

/**
 * @private
 */
taz.OnWayToCheckPointState.prototype.nextCheckPointCalculated_ = function(nextCheckPoint) {
    var that = this;
    
    if (nextCheckPoint == null) {
    	console.log("TAZ: INFO(NextCheckPoint): That was the last checkpoint");
        // No more check points left. If the game has a finish area, guide the team to it.
        if (that.model.getFinishArea() != null) {
        	if(!that.lastCheckpointShown_) {
        		taz.dialogs.okDialog(taz.strings.that_was_last_cp, function() {
                    that.game.setState(taz.Game.State.ON_WAY_TO_FINISH_AREA);
                    that.lastCheckpointShown_ = true;
                });
        	} else {
        		that.game.setState(taz.Game.State.ON_WAY_TO_FINISH_AREA);
        	}
        } else {
        	if(taz.game.isOnDemandTaskAvailable()) {
        		that.game.setState(taz.Game.State.ON_DEMANDS_LEFT);
        	} else {
        		taz.sounds.play(taz.Sounds.Type.GOAL_REACHED);
	            taz.dialogs.okDialog(taz.strings.last_cp_game_ended, function() {
	                that.game.setState(taz.Game.State.FINISHED);
	            });
        	}
        }
    }
    else if (!nextCheckPoint.useGps && !nextCheckPoint.qrCode) {
        console.log("TAZ: INFO(NextCheckPoint): Next checkpoint is: " + nextCheckPoint.name + "(NO GPS + NO QR)");
        // No-GPS checkpoints are reached immediately.
        this.model.setCurrentCheckPoint(nextCheckPoint);
        this.model.setPreviousValidCheckpointIds(null);
        this.game.setState(taz.Game.State.ON_CHECKPOINT);
    }
    else {
    	console.log("TAZ: INFO(NextCheckPoint): Next checkpoint is: " + nextCheckPoint.name);
        this.model.setCurrentCheckPoint(nextCheckPoint);
        this.model.setSubState(taz.OnWayToCheckPointState.STATE.NEXT_CHECK_POINT_CALCULATED);
        this.guide_();
    }
    
    var gameId = this.model.getGameId();
    var teamId = this.model.getTeamId();
    var position = taz.navigation.currentPosition;
    var state = this.model.getState();
    var points = this.model.getPoints();
    var dist = this.model.getDistance();
    this.backend.updateTeamStatusAfterCp(gameId, teamId, position, state, points, nextCheckPoint ? nextCheckPoint.id : null, dist, null);
};

/**
 * @private
 */
taz.OnWayToCheckPointState.prototype.guide_ = function() {
    var nextCheckPoint = this.model.getCurrentCheckPoint();
    var subState = this.model.getSubState();

    var guideShowBegin = this.model.getBeginShowGuideTime();

    if (guideShowBegin == null) {
        // This is the first time this guide is shown after enterState.
        // Start the timer.
        guideShowBegin = new Date().getTime();
        this.model.setBeginShowGuideTime(guideShowBegin);
    }
    
    if ((nextCheckPoint.hintPicture != null || nextCheckPoint.hintText != null || nextCheckPoint.qrCode != null)
            && (nextCheckPoint.hintTimeout > 0 || nextCheckPoint.qrCode)
            && (subState != taz.OnWayToCheckPointState.STATE.GUIDE_HINT_SHOWN || nextCheckPoint.qrCode)) {
        this.showHintView_();
    } else {
        // Protected method from taz.State.
        this.showGuideView(nextCheckPoint.position);
    }
};

/**
 * @private
 */
taz.OnWayToCheckPointState.prototype.showHintView_ = function() {
    var nextCheckPoint = this.model.getCurrentCheckPoint();
    var currentEdge = this.model.getCurrentEdge();
    var guideShowBegin = this.model.getBeginShowGuideTime();
    var guideTimeout = null;
    
    if (currentEdge != null && currentEdge.transitionTime > 0) {
        guideTimeout = currentEdge.transitionTime;
    }
    
    var hintData = {
        checkPoint : nextCheckPoint,
        hintShowBegin : guideShowBegin, 
        guideTimeout : guideTimeout,
        showMapViewIcon: this.canSwitchToMapView() && nextCheckPoint.qrCode !== null && nextCheckPoint.qrCode.length > 0
    };
    
    // this.guideHintShown is called when the guide has been shown long enough.
    taz.viewManager.changeView('showHintView', hintData);
};

/**
 * Called from the showHintView after guidance hint has been shown long enough.
 */
taz.OnWayToCheckPointState.prototype.guideHintShown = function() {
    var checkPoint = this.model.getCurrentCheckPoint();
    // Set the sub state so that the hint is not shown again if the client is restarted.
    this.model.setSubState(taz.OnWayToCheckPointState.STATE.GUIDE_HINT_SHOWN);
 
    if (!checkPoint.qrCode) {
        this.showGuideView(checkPoint.position);
    }
    else {
        taz.showHintView.setHintVisible(false);
    }
};

/**
 * Called from GuideView when route timer expires
 */
taz.OnWayToCheckPointState.prototype.routeTimeExpired = function() {
    var gameId = this.model.getGameId();
    var teamId = this.model.getTeamId();
    var checkPoint = this.model.getCurrentCheckPoint();
    var that = this;
    
    taz.loadingDialog.setLoadingMessage(taz.strings.loading); 
    taz.loadingDialog.show();

    // Inform the backend that we have arrived to a check point.
    taz.loadingDialog.hide();
    taz.sounds.play(taz.Sounds.Type.WRONG_ANSWER);
            
    // start guiding to the next checkpoint.
    taz.dialogs.noButtonDialog(taz.strings.route_timer_timeout, function() {
        taz.loadingDialog.setLoadingMessage(taz.strings.loading); 
        taz.loadingDialog.show();

        taz.OnCheckPointState.leaveCheckPoint(function() {
            taz.loadingDialog.hide();
            that.game.setState(taz.Game.State.ON_WAY_TO_CHECKPOINT);
        });           
    });
};

taz.OnWayToCheckPointState.prototype.qrCodeScanned = function(code) {
    // Verify code
    var nextCheckPointCalculated = (this.model.getSubState() != null);
    var checkPoint = this.model.getCurrentCheckPoint();
    
    console.log("QR code scanned: " + code);
    
    // If the code is correct, move to the on checkpoint state. 
    if (nextCheckPointCalculated && checkPoint && checkPoint.qrCode && checkPoint.qrCode.toLowerCase() === code.toLowerCase()) {
        this.model.setPreviousValidCheckpointIds(null);
        this.game.setState(taz.Game.State.ON_CHECKPOINT);
    }
    // Else check the code against unvisited QR checkpoints if team is not currently on any graph.
    else if (this.isTeamBetweenGraphs_()) {        
        var qrCPs = this.offlineRouter_.getUnvisitedCheckpoints(false, true);
        
        for(var i = 0; i < qrCPs.length; ++i) {
            var cpCode = qrCPs[i].qrCode.toLowerCase();
            var scannedCode = code.toLowerCase();
            
            if (scannedCode === cpCode) {
                this.model.setCurrentCheckPoint(qrCPs[i]);
                this.model.setPreviousValidCheckpointIds(null);
                this.game.setState(taz.Game.State.ON_CHECKPOINT);
            }
        }
    }
};

taz.OnWayToCheckPointState.prototype.canScanQrCode = function() {
    var qrCPs = this.offlineRouter_.getUnvisitedCheckpoints(false, true);
    var betweenGraphs = this.isTeamBetweenGraphs_();
    var hasQrCheckpoints = qrCPs.length > 0;
    
    return betweenGraphs && hasQrCheckpoints;
};

taz.OnWayToCheckPointState.prototype.canSwitchToMapView = function() {
    var currentCP = this.model.getCurrentCheckPoint();
    return currentCP != null && this.model.getGame().template.enableMapView;
};

/**
 * Called when the state is continued after restart of the application.
 */
taz.OnWayToCheckPointState.prototype.continueState = function() {
    var STATE = taz.OnWayToCheckPointState.STATE;
    var subState = this.model.getSubState();
    
    switch (subState) {
        case STATE.NEXT_CHECK_POINT_CALCULATED:
        case STATE.GUIDE_HINT_SHOWN:
            this.guide_();
            break;
        
        default:
            this.enterState();
            break;
    };
};

/**
 * Called when the position changes.
 * 
 * @param {taz.GeoPosition} position The new position.
 */
taz.OnWayToCheckPointState.prototype.positionChanged = function(position) {    
    var checkPoint = this.model.getCurrentCheckPoint();

    // Protected method from taz.State.
    this.checkIfInGameArea(position);
        
    // Check the sub state to see whether the next check point has been calculated. Checking if
    // checkPoint is null is not enough since it is the previous check point if the new one
    // hasn't been calculated.
    var nextCheckPointCalculated = (this.model.getSubState() != null);
   
    // Time passed since the guiding started.
    var elapsedGuideTime = new Date().getTime() - this.model.getBeginShowGuideTime();
    
    if (this.isInValidGameZone) {
        var currentViewId = taz.viewManager.getCurrentViewId();
        var hintTimeLeft = false;
        
        if (nextCheckPointCalculated && checkPoint) {
            hintTimeLeft = elapsedGuideTime < checkPoint.hintTimeout;
    
            if (currentViewId == 'guideView') {
                // Continue guiding to the next check point.
                taz.guideView.teamInAllowedArea(checkPoint.position);
            }
        }
        
        // If we were outside the game zone the view has been switched to guideView. Switch
        // back to showHintView if there is hint time left.
        if (currentViewId == 'guideView') {
            if (hintTimeLeft && checkPoint) {
                this.showHintView_();
            }
            else if ((!nextCheckPointCalculated 
                    && this.isTeamBetweenGraphs_() 
                    && this.model.getGame().template.enableMapView) || this.model.popStashedActiveViewId() == "mapView") {
                // If there is no target checkpoint, we must return to map view (if the map is enabled for this game)
                this.showMapView();
            }
            // Else stay in guideView
        }
    }
    
    // Call parent class implementation.
    taz.State.prototype.positionChanged.call(this, position);
    
    var currentEdge = this.model.getCurrentEdge();
    var transitionTimeLeft = 1;
    
    // Calculate how much transition time we have left.
    if (currentEdge != null && currentEdge.transitionTime > 0) {
        transitionTimeLeft = currentEdge.transitionTime - elapsedGuideTime;
    }
    
    // If we know the next check point and there is transition time left, test if we have reached it.
    if (nextCheckPointCalculated && checkPoint && !checkPoint.qrCode && transitionTimeLeft > 0) {
        if (position.distanceTo(checkPoint.position) < checkPoint.radius) {
            this.model.setPreviousValidCheckpointIds(null);
            this.game.setState(taz.Game.State.ON_CHECKPOINT);
        }
    }
    
    // Also check possible arrivals to other graph starting checkpoints and discovery checkpoints.
    this.checkArrivalToOtherCheckpoints(position);
};

taz.OnWayToCheckPointState.prototype.checkArrivalToOtherCheckpoints = function(position) {   
    var betweenGraphs = this.isTeamBetweenGraphs_();
    
    if (!betweenGraphs) {
        return; // Only possible to change target while between graphs.
    }
    
    if (this.gotoNonTargetCheckpointDialogVisible_ 
        || Date.now() - this.gotoNonTargetCheckpointDialogCloseTime_ < 30000) {
        return;
    }
    
    var checkpoints = this.getPreviouslyValidCheckpoints();
    checkpoints = checkpoints.concat(this.offlineRouter_.getUnvisitedDiscoveryCheckpoints());
    
    for(var i = 0; checkpoints && i < checkpoints.length; ++i) {
        var checkpoint = checkpoints[i];
        if (checkpoint.useGps && position.distanceTo(checkpoint.position) < checkpoint.radius) {
            console.log("In radius of another possible checkpoint!");
            
            taz.sounds.play(taz.Sounds.Type.ARRIVED_TO_CHECK_POINT);
            taz.vibration.vibrate(750);
            
            var prompt = checkpoint.discoveryCheckpoint ? 
                    taz.strings.in_radius_of_discovery_cp : taz.strings.in_radius_of_another_cp;
            
            var content = checkpoint.name 
                + (checkpoint.description ? (": " + checkpoint.description) : "");
            var question = taz.strings.goto_non_target_cp;
            
            var callback = _.once(function() {
                this.nextCheckPointCalculated_(nextCheckPoint);
            });
            var dialog = taz.dialogs.gotoNonTargetCheckpointDialog(prompt, content, question, taz.strings.ok, taz.strings.cancel, 
                _.bind(function() { //ok
                    this.model.setCurrentCheckPoint(checkpoint);
                    this.model.setPreviousValidCheckpointIds(null);
                    this.game.setState(taz.Game.State.ON_CHECKPOINT);
                    
                    this.gotoNonTargetCheckpointDialogVisible_ = false;
                    this.gotoNonTargetCheckpointDialogCloseTime_ = 0;
                    dialog.close();
                }, this),
                _.bind(function() { //cancel
                    this.gotoNonTargetCheckpointDialogVisible_ = false;
                    this.gotoNonTargetCheckpointDialogCloseTime_ = Date.now();
                    dialog.close();
                }, this)
            );
            
            this.gotoNonTargetCheckpointDialogVisible_ = true;
            this.gotoNonTargetCheckpointDialogCloseTime_ = Date.now();
            
            // Important break to freeze the checkpoint value for the time of the prompt!
            break;
        }
    }
};

taz.OnWayToCheckPointState.prototype.isTeamBetweenGraphs_ = function() {
    var currentCheckpoint = this.model.getCurrentCheckPoint();
    var nextCheckPointCalculated = (this.model.getSubState() != null);
    var betweenGraphsBeforeNewTarget = !currentCheckpoint || (!nextCheckPointCalculated && currentCheckpoint.graphEnd);
    var betweenGraphsAfterNewTarget = !currentCheckpoint || (nextCheckPointCalculated && currentCheckpoint.graphStart);
    var forcedStartRoute = nextCheckPointCalculated && _.find(this.model.getGame().template.startingEdges, function(edge) {
        return edge.endId === currentCheckpoint.id;
    });
    
    return (betweenGraphsBeforeNewTarget || betweenGraphsAfterNewTarget) && !forcedStartRoute;
};

taz.OnWayToCheckPointState.prototype.showOnDemandTask = function() {
    this.model.stashSubState(taz.Game.State.ON_WAY_TO_CHECKPOINT, this.model.getSubState());
    console.log("STASHED A SUBSTATE: " + this.model.getSubState());
    
    this.model.stashActiveViewId(taz.viewManager.getCurrentViewId());
    
    taz.game.setState(taz.Game.State.ON_DEMAND_TASK);
};

taz.OnWayToCheckPointState.prototype.getPreviouslyValidCheckpoints = function() {
    var validIds = this.model.getPreviousValidCheckpointIds();
    var validCheckpoints = [];
    var game = this.model.getGame();
    var cps = game.template.checkPoints;
    
    for(var i = 0; validIds && i < validIds.length; ++i) {
        validCheckpoints.push(_.find(cps, function(cp) {return cp.id === validIds[i];}));
    }
    
    return validCheckpoints;
};

/**
 * Called when the state exited.
 */
taz.OnWayToCheckPointState.prototype.exitState = function() {
    taz.State.prototype.exitState.call(this);
};


/**
 * @class
 */
taz.InitializingState = function(game, id) {
	// Call parent class implementation.
	taz.State.call(this, game, id);
};

taz.inherits(taz.InitializingState, taz.State);

/**
 * @const
 */
taz.InitializingState.POLL_INTERVAL = 5000;

/**
 * @private
 */
taz.InitializingState.prototype.pollServersAndGamesHandle_ = null;

/**
 * Called when the state is entered.
 */
taz.InitializingState.prototype.enterState = function() {
	console.log("INFO(State): Changed state to InitializingState");
	taz.loadingDialog.setLoadingMessage(taz.htmlDecode(taz.strings.finding_servers));
	taz.loadingDialog.show();
	
	var that = this;
	
    var currentPosition = taz.navigation.currentPosition;
    var serverUrl = null;
    if(taz.settings.serverUrl != null) {
    	serverUrl = taz.settings.serverUrl;
    }
    else {
    	if(this.model.getDefaultServer() != null) {
        	serverUrl = this.model.getDefaultServer().url;
        }
        else {
        	serverUrl = null;
        }
    }
    
    if (!serverUrl) {
        this.backend.getServers(currentPosition, function(serverList) {
        	taz.loadingDialog.hide();
            taz.viewManager.changeView('showServersView', serverList);
        });
	}
	else {
	    console.log("Moving straight to server: " + serverUrl);
	    this.backend.setActiveGameServer(serverUrl);
	    this.model.setServer(serverUrl);
	    this.backend.login();
        this.backend.getNearbyGames(currentPosition, function(gameList) {
            taz.loadingDialog.hide();
            var showBackButton;
            if(taz.settings.masterServerUrl != '') {
            	showBackButton = true;
            }
            else {
            	showBackButton = false;
            }
            if(taz.settings.serverUrl == null) {
            	taz.viewManager.changeView('showGamesView', {games: gameList.games, server: that.model.getDefaultServer(), showBackButton: showBackButton});
            }
            else {
            	taz.viewManager.changeView('showGamesView', {games: gameList.games, server: null, showBackButton: showBackButton});
            }
        });
	}
	
	var pollCallback = function() {
	    var currentPosition = taz.navigation.currentPosition;
        if (taz.viewManager.getCurrentViewId() == 'showServersView') {
            // Update server list.
            that.backend.getServers(currentPosition, function(serverList) {
                if (taz.viewManager.getCurrentViewId() == 'showServersView') {
                    taz.showServersView.setServers(serverList);
                }
                
                if (that.pollServersAndGamesHandle_ != null) {
                    that.pollServersAndGamesHandle_ = setTimeout(pollCallback, taz.InitializingState.POLL_INTERVAL);
                }
            });
        }
        else if (taz.viewManager.getCurrentViewId() == 'showGamesView') {
            // Update the game list.
            that.backend.getNearbyGames(currentPosition, function(gameList) {
                if (taz.viewManager.getCurrentViewId() == 'showGamesView') {
                    taz.showGamesView.setGames(gameList);
                }
                
                if (that.pollServersAndGamesHandle_ != null) {
                    that.pollServersAndGamesHandle_ = setTimeout(pollCallback, taz.InitializingState.POLL_INTERVAL);
                }
            });
        }
        else if (that.pollServersAndGamesHandle_ != null) {
            // No need to update anything, just keep timer alive.
            that.pollServersAndGamesHandle_ = setTimeout(pollCallback, taz.InitializingState.POLL_INTERVAL);
        }
	};
	
	this.pollServersAndGamesHandle_ = setTimeout(pollCallback, taz.InitializingState.POLL_INTERVAL);
};

/**
 * This is called from the showServersView when the user selects a server to join.
 *
 * @param {GameServerListDTO.ServerDescription} server The description of the selected server.
 */
taz.InitializingState.prototype.selectServer = function(server) {
    if (taz.versionutils.isCompatibleVersion(server.versionInfo, true)) {
        console.log("INFO(SelectServer): Selected server: " + server.name + " - " + server.url);
        taz.viewManager.changeView('serverDescriptionView', server);
    }
};

/**
 * This is called from the serverDescriptionView when the user accepts the server.
 *
 * @param {GameServerListDTO.ServerDescription} server The description of the selected server.
 */
taz.InitializingState.prototype.acceptServerSelection = function(server) {
    var that = this;
    this.checkServerPasscodeAndContinue_(server.passcode, function() {
        taz.loadingDialog.setLoadingMessage(taz.htmlDecode(taz.strings.finding_games));
        taz.loadingDialog.show();
        
        var currentPosition = taz.navigation.currentPosition;
        
        // Set active game server
        console.log(JSON.stringify(server));
        that.model.setServer(server.url);
        that.backend.setActiveGameServer(server.url);
                
        that.backend.login();
        
        // Find nearby games and show user the possibilities.
        that.backend.getNearbyGames(currentPosition, function(gameList) {
            taz.loadingDialog.hide();
            var showBackButton;
            if(taz.settings.masterServerUrl != '') {
            	showBackButton = true;
            }
            else {
            	showBackButton = false;
            }
            taz.viewManager.changeView('showGamesView', {games: gameList.games, server: server, showBackButton: showBackButton});
        });    
    });
};

/**
 * This is called from the adminView when the user accepts the server.
 *
 * @param {GameServerListDTO.ServerDescription} server The description of the selected server.
 */
taz.InitializingState.prototype.acceptDefaultServerSelection = function(server) {
	
    taz.loadingDialog.setLoadingMessage(taz.htmlDecode(taz.strings.finding_games));
    taz.loadingDialog.show();
    
    var currentPosition = taz.navigation.currentPosition;
    
    // Set active game server
    this.model.setServer(server.url);
    this.backend.setActiveGameServer(server.url);
            
    this.backend.login();
    
    // Find nearby games and show user the possibilities.
    this.backend.getNearbyGames(currentPosition, function(gameList) {
        taz.loadingDialog.hide();
        taz.viewManager.changeView('showGamesView', {games: gameList.games, server: server});
    });
};

/**
 * This is called from the showGamesView when the user selects a game to join.
 * 
 * @param {GameListDTO.GameDescription} game The description of the selected game.
 */
taz.InitializingState.prototype.selectGame = function(game) {
	console.log("INFO(SelectGame): Selected game: " + game.name);
    if (game.description || game.descriptionPictureId) {
        // If the game has a description, show it.
        if (game.descriptionPictureId) {
	        taz.loadingDialog.setLoadingMessage(taz.strings.loading);
	        taz.loadingDialog.show();

            // If there is a description picture, fetch it.
            this.backend.getDataChunk(game.descriptionPictureId, function(picture) {
                taz.loadingDialog.hide();
                taz.viewManager.changeView('gameDescriptionView', {game : game, picture : picture});
            });
        } else {
	        taz.viewManager.changeView('gameDescriptionView', {game : game, picture : null});
        }
    } else {
        // If there is no description or passcode, skip directly to the join view.
        this.checkGamePasscodeAndContinue_(game.passcode, function() {
            taz.viewManager.changeView('joinGameView', game);
        });
    }
};

/**
 * This is called from the gameDescriptionView when the user accepts the game.
 *
 * @param {GameListDTO.GameDescription} game The description of the selected game.
 */
taz.InitializingState.prototype.acceptGameSelection = function(game) {
    this.checkGamePasscodeAndContinue_(game.passcode, function() {
        taz.viewManager.changeView('joinGameView', game);
    });
};

/**
 * Check if joining passcode is set and show passcode query dialog.
 * If passcode is null, successCallback is called automatically.
 *
 * @private
 */
taz.InitializingState.prototype.checkGamePasscodeAndContinue_ = function(passcode, successCallback) {
    if (passcode != null) {
        taz.dialogs.passwordDialog(taz.strings.enter_passcode, function(input){
            var shaObj = new jsSHA(input, "TEXT");
            var hash = shaObj.getHash("SHA-1", "HEX");
            if(hash == passcode) {
                successCallback();
            } else {
                taz.dialogs.okDialog(taz.strings.wrong_password, null);
            }
        });
    } else {
        successCallback();
    }
};

/**
 * Show passcode query dialog for admin view.
 *
 * @private
 */
taz.InitializingState.prototype.checkAdminPasscodeAndContinue_ = function(successCallback) {
    taz.dialogs.passwordDialog(taz.strings.enter_passcode, function(input){
    	var passcode = "d033e22ae348aeb5660fc2140aec35850c4da997"; 
        var shaObj = new jsSHA(input, "TEXT");
        var hash = shaObj.getHash("SHA-1", "HEX");
        if(hash == passcode) {
            successCallback();
        } else {
            taz.dialogs.okDialog(taz.strings.wrong_password, null);
        }
    });
};

/**
 * Check if joining passcode is set and show passcode query dialog.
 * If passcode is null, successCallback is called automatically.
 *
 * @private
 */
taz.InitializingState.prototype.checkServerPasscodeAndContinue_ = function(passcode, successCallback) {
    if (passcode != null) {
        taz.dialogs.passwordDialog(taz.strings.enter_passcode, function(input){
            var shaObj = new jsSHA(input, "TEXT");
            var hash = shaObj.getHash("SHA-1", "HEX");
            if(hash == passcode) {
                successCallback();
            } else {
                taz.dialogs.okDialog(taz.strings.wrong_password, null);
            }
        });
    } else {
        successCallback();
    }
};

/**
 * This is called from the joinGameView when the user attempts to join the game.
 * 
 * @param {GameListDTO.GameDescription} game The description of the game to join.
 * @param {String} teamName Wanted name for the team.
 */
taz.InitializingState.prototype.join = function(game, teamName) {	
	taz.loadingDialog.setLoadingMessage(taz.strings.joining_game + game.name);
	taz.loadingDialog.show();
	
	var that = this;
	// Callbacks for backend.joinGame method.
	var callbacks = {
		// Called after succesfully joined.
		success : function(teamId, messageThreadId) {
		    
            console.log("join success callback. teamId: " + teamId + " msgthreadId: " + messageThreadId);
		    
			that.model.setTeamId(teamId);
			that.model.setTeamName(teamName);
			that.model.setPoints(0);
			that.model.setPointAdjustment(0);
			that.model.setTeamMessageThreadId(messageThreadId);
			
			taz.loadingDialog.setLoadingMessage(taz.strings.loading_game + game.name);
			that.backend.getGame(game.id, function(gameData) {
				taz.loadingDialog.hide();
				console.log("Got game: " + game.id);
				
				gameData.ended = false;
				that.game.setOnline(!gameData.template.offline);
				that.game.setNoGpsGame(gameData.template.noGpsGame);
				
				that.model.createGame(gameData, that.backend, function() {				    
	                // Start guiding to start area if one exists
	                if (gameData.template.startArea != null) {
	                    that.game.setState(taz.Game.State.ON_WAY_TO_START_AREA);
	                }
	                else {
	                    that.game.setState(taz.Game.State.WAITING_FOR_LAUNCH);
	                }
				}, 
				function(downloadedTiles, totalTiles) { // Map download progress
				    var progress = Math.round((downloadedTiles/totalTiles) * 100);
				    
				    taz.loadingDialog.setLoadingMessage(taz.strings.loading_map + " " + progress + "%");
				    taz.loadingDialog.show();
				    
				    if (downloadedTiles === totalTiles) {
				        taz.loadingDialog.hide();
				    }
				});
			});
		},
		
		// Called if the suggested name for the team is in use.
		nameInUse : function() {
			taz.loadingDialog.hide();
			taz.dialogs.okDialog(taz.strings.name_in_use);
			taz.joinGameView.releaseButtonLocks();
		},
		
		// Called if this device is already joined to the game.
		alreadyJoined : function(teamId, messageThreadId) {
			taz.loadingDialog.hide();
			taz.dialogs.okDialog(taz.strings.already_joined);	
		},
		
		// Called if connection fails
		noResponse : function() {
			taz.loadingDialog.hide();
			taz.dialogs.okDialog(taz.strings.no_connection);
			taz.joinGameView.releaseButtonLocks();
		}
	};
	
	var position = taz.navigation.currentPosition;
	this.backend.joinGame(game.id, teamName, position, callbacks);
};

/**
 * Called when the position changes.
 * 
 * @param {taz.GeoPosition} position The new position.
 */
taz.InitializingState.prototype.positionChanged = function(position) {
	// Overriden on purpose to do nothing.
};

/**
 * Overridden from taz.State. This state does not need user's accurate 
 * location.
 */
taz.InitializingState.prototype.isLocationSensitive = function() {
	return false;
};

/**
 * Called when the state exited.
 */
taz.InitializingState.prototype.exitState = function() {
    taz.State.prototype.exitState.call(this);
    
    if (this.pollServersAndGamesHandle_ != null) {
        clearTimeout(this.pollServersAndGamesHandle_);
        this.pollServersAndGamesHandle_ = null;
    } 
};


/**
 * @class
 */
taz.OnCheckPointState = function(game, id) {
    // Call parent class implementation.
    taz.State.call(this, game, id);
};

taz.inherits(taz.OnCheckPointState, taz.State);

/**
 * @enum Substates of this state.
 */
taz.OnCheckPointState.State = {
    IN_QUEUE : 0,
    ON_TASK : 1,
    WAITING_FOR_CHECK_ONLINE : 2,
    ANSWER_CHECKED : 3
};

/**
 * @private
 */
taz.OnCheckPointState.prototype.answerCheckLoopHandle_ = null;

/**
 * Called when the state is entered.
 */
taz.OnCheckPointState.prototype.enterState = function() {
    console.log("INFO(State): Changed state to OnCheckPointState");
    var gameId = this.model.getGameId();
    var teamId = this.model.getTeamId();
    var checkPoint = this.model.getCurrentCheckPoint();
    var that = this;
    
    console.log("INFO(State): Player at checkpoint " + checkPoint.name);

    if (taz.game.isNoGpsGame()) {
        // Fake team location with a position update from the checkpoint
        taz.navigation.setCurrentPosition(checkPoint.position, checkPoint.radius);
    }    
    
    this.model.setCurrentTaskAttempts(0);
    
    var proceed = function(checkPoint) {
        if(checkPoint.maxTeams > 0) {
            console.log("TAZ: this checkpoint has queue enabled.");
            that.showQueue_();
//            var waitInQueue = checkPoint.task && checkPointStatus.maxTeams;
//            waitInQueue = waitInQueue && checkPointStatus.currentTeams.length > checkPointStatus.maxTeams; 
//            if (waitInQueue) {
//
//                return;
//            }
        } else {
            if (checkPoint.task) {
                that.showTask();
            } else {
                that.continueToNext_(checkPoint);
            }
        }
    };
    
    var handleArrival = function(checkPoint) {
        taz.loadingDialog.hide();        
        // If the check point has a task defined, show it and start waiting for call
        // to this.answerTask().
        if (checkPoint.arrivePoints != 0) {
            var prompt = "";

            if (checkPoint.arrivePoints > 0) {

                prompt += " " + taz.strings.you_got_points
                + " " + checkPoint.arrivePoints
                + " " + taz.strings.points
                + taz.strings.for_arriving;
            }
            else if (checkPoint.arrivePoints < 0) {

                prompt += " " + taz.strings.you_lost_points
                + " " + -checkPoint.arrivePoints
                + " " + taz.strings.points
                + taz.strings.for_arriving;
            }
    	
            taz.dialogs.noButtonDialog(prompt, function() {
                proceed(checkPoint);//, checkPointStatus);
            });
        }
        else {
            proceed(checkPoint);//, checkPointStatus);
        }
        
    }
    
    taz.loadingDialog.setLoadingMessage(taz.strings.loading);
    taz.loadingDialog.show();

    taz.sounds.play(taz.Sounds.Type.ARRIVED_TO_CHECK_POINT);
    taz.vibration.vibrate(750);
    
    handleArrival(checkPoint);
};

/**
 * @private
 */
taz.OnCheckPointState.prototype.showTask = function() {
    //resume clock if it was stopped due to queuing
    taz.gameTimer.resume();
    var checkPoint = this.model.getCurrentCheckPoint();
    this.model.setPoints(this.model.getPoints() + checkPoint.arrivePoints);
    this.model.setSubState(taz.OnCheckPointState.State.ON_TASK);

    var now = new Date().getTime();
    // Set task answer time start to now.
    this.model.setBeginShowTaskTime(now);

    this.showTaskView();
};

/**
 * @private
 */
taz.OnCheckPointState.prototype.showQueue_ = function() {
    this.model.setSubState(taz.OnCheckPointState.State.IN_QUEUE);
    taz.gameTimer.pause();
    taz.viewManager.changeView("queueView", this);
    //this.showQueueView_(checkPoint);
};

/**
 * @private
 */
taz.OnCheckPointState.prototype.continueToNext_ = function(checkPoint) {
    this.model.setPoints(Number(this.model.getPoints()) + Number(checkPoint.arrivePoints));

    taz.loadingDialog.setLoadingMessage(taz.strings.loading);
    taz.loadingDialog.show();

    var that = this;
    taz.OnCheckPointState.leaveCheckPoint(function() {
        taz.loadingDialog.hide();
        that.game.setState(taz.Game.State.ON_WAY_TO_CHECKPOINT);
    });
};

/**
 * Public static method for leaving a check point. This can be used outside this
 * state.
 */
taz.OnCheckPointState.leaveCheckPoint = function(callback) {
    var model = taz.game.getModel();
    var backend = taz.game.getBackend();
    var gameId = model.getGameId();
    var teamId = model.getTeamId();
    var currentCheckPoint = model.getCurrentCheckPoint();
    
    if (currentCheckPoint.graphEnd) {
        var graph = model.getGraph();
        var graphIdList = graph.calculateGraphOf(currentCheckPoint.id);
        model.markCheckPointsAsVisited(graphIdList);
    }
    
    if(callback != null) {
        callback();
    }
};

/**
 * @public
 */
taz.OnCheckPointState.prototype.showTaskView = function() {
    var checkPoint = this.model.getCurrentCheckPoint();
    var answer = this.model.getAnswerToCurrentCheckPointTask();
    var taskShowBegin = this.model.getBeginShowTaskTime();
    
    if( checkPoint.task ) {
        var taskData = {
            task : checkPoint.task,
            answer : answer,
            taskShowBegin : taskShowBegin
        };

        taz.viewManager.changeView('taskView', taskData);  
    } else {
        this.continueToNext_(checkPoint);
    }
};

/**
 * Called when the state is continued after restart of the application.
 */
taz.OnCheckPointState.prototype.continueState = function() {
    var STATE = taz.OnCheckPointState.State;
    var subState = this.model.getSubState();
    
    switch (subState) {
        case STATE.IN_QUEUE:
            this.enterState();
            break;
        case STATE.ON_TASK:
            this.showTaskView();
            break;
        case STATE.ANSWER_CHECKED:
            var points = this.model.getPointsGainedFromCurrentCheckPoint();
            this.onAnswerChecked_(points);
            break;
        default:
            this.enterState();
            break;
    };
};

/**
 * Called from the TaskView when that answer changes: for example when the team fills
 * a new text answer or selects a new check box during the answering process.
 */
taz.OnCheckPointState.prototype.answerChanged = function(answer) {
    // Persist the answer.
    var checkPoint = this.model.getCurrentCheckPoint();
    // Add the checkpoint id to the answer.
    answer.checkPointTemplateId = checkPoint.id;
    answer.taskId = checkPoint.task ? checkPoint.task.id : null;
    answer.answerType = 'ON_CHECKPOINT_ANSWER';    
    this.model.setAnswerToCurrentCheckPointTask(answer);
};

/**
 * Called from the taskView after the user has an aswer.
 * 
 * @param {TaskAnswerDTO} answer
 */
taz.OnCheckPointState.prototype.answerTask = function(answer) {
    var that = this;
    var checkPoint = this.model.getCurrentCheckPoint();
    var checkType = checkPoint.answerCheckType;
    
    // Add the checkpoint id to the answer.
    answer.checkPointTemplateId = checkPoint.id;
    answer.taskId = checkPoint.task ? checkPoint.task.id : null;
    answer.answerType = 'ON_CHECKPOINT_ANSWER';
    
    // Reset the current answer id used in answer waiting
    that.model.setCurrentTaskAnswerId(null);

    // Persist the final version of the answer.
    this.model.setAnswerToCurrentCheckPointTask(answer);
    
    // Register as an task attempt
    var attempts = this.model.getCurrentTaskAttempts() + 1;
    this.model.setCurrentTaskAttempts(attempts);
    
    if (answer.maximumPoints == 0) {
        // If maximum points is zero, skip checking.
        this.taskAnswersChecked(0);
    } else {
        if (checkType == 'GAME_MASTER' && that.game.isOnline()) {
            this.checkAnswerOnline_(answer);              
        } else if (checkType == 'FIELD') {
            this.checkAnswerOnField_(answer);
        } else {               
            this.checkAnswerAutomatic_(answer);
        }
    }
};

/**
 * Called from the taskView after the user gives up.
 */
taz.OnCheckPointState.prototype.giveUpTask = function() {
    taz.gameTimer.resume();
    taz.loadingDialog.setLoadingMessage(taz.strings.loading);
    taz.loadingDialog.show();
    
    var that = this;
    taz.OnCheckPointState.leaveCheckPoint(function() {
        taz.loadingDialog.hide();
        that.game.setState(taz.Game.State.ON_WAY_TO_CHECKPOINT);
    });
};

/**
 * Overridden from taz.State. This state does not need user's accurate 
 * location.
 */
taz.OnCheckPointState.prototype.isLocationSensitive = function() {	
    return false;
};

/**
 * Overridden from taz.State. If the team is doing a task no unneeded 
 * popups should occur.
 */
taz.OnCheckPointState.prototype.requiresAttention = function() {
    var STATE = taz.OnCheckPointState.State;
    var subState = this.model.getSubState();
	
    if (subState == STATE.ON_TASK) {
        return true;
    }
    else {
        return false;
    }
};

/**
 * Checks answer online. This is only used if the check mode is GAME_MASTER.
 * 
 * @private
 */
taz.OnCheckPointState.prototype.checkAnswerOnline_ = function(answerData) {	
    var gameId = this.model.getGameId();
    var teamId = this.model.getTeamId();
    var that = this;
	
    taz.loadingDialog.setLoadingMessage(taz.strings.sending_answer);
    taz.loadingDialog.show();
	
    // Pause the game timer until the answer has been checked.
    taz.gameTimer.pause();

    this.backend.answerTask(gameId, teamId, answerData, function(data) {
        // Mark answer as sent.
        data && that.model.setAnswersSent([answerData]);
    });
    
    taz.gameTimer.resume();
    taz.loadingDialog.hide();
    taz.dialogs.okDialog(taz.strings.answer_sent_for_check, function() {
        that.acceptTask(0);
    });
};

/**
 * Check answer on the checkpoint by staff member.
 * 
 * @param {TaskAnswerDTO} answerData
 * @private
 */
taz.OnCheckPointState.prototype.checkAnswerOnField_ = function(answerData) {
    var checkPoint = this.model.getCurrentCheckPoint();
    var gameTemplate = this.model.getGame().template;

    var fieldCheckData = {
        password: gameTemplate.fieldCheckPassword,
        maximumPoints: answerData.maximumPoints,
        answers: []
    };
	
    for(var i = 0; i < answerData.elementAnswers.length; ++i) {
        var answer = answerData.elementAnswers[i];
        var taskElement = this.model.getTaskElementOfCurrentTaskById(answer.taskElementId);
		
        fieldCheckData.answers.push({
            type : taskElement.type,
            teamAnswer : taz.taskelements.answerToHumanReadable(taskElement, answer.answer),
            correctAnswer : taz.taskelements.answerToHumanReadable(taskElement, taskElement.correctAnswer)
        });
    }
	
    // Pause the game timer until the answer has been checked.
    taz.gameTimer.pause();

    // Show manual check view. this.taskAnswersChecked is called after the field person
    // has checked the answer.
    taz.viewManager.changeView('checkTaskAnswersView', fieldCheckData);
};

/**
 * Called from the CheckTaskAnswerView after the answer has been checked.
 */
taz.OnCheckPointState.prototype.taskAnswersChecked = function(points) {
    taz.gameTimer.resume();

    var that = this;
    var gameId = this.model.getGameId();
    var teamId = this.model.getTeamId();
    var answerData = this.model.getAnswerToCurrentCheckPointTask();
    answerData.points = points;

    taz.loadingDialog.setLoadingMessage(taz.strings.sending_answer);
    taz.loadingDialog.show();
    
    // TODO: hack to prevent freezing if picture sending fails: do not wait for callback on 
    // task answer, just place the request on queue and continue on with the application
    this.backend.answerTask(gameId, teamId, answerData, function(data) {
        // Mark answer as sent.
        data && that.model.setAnswersSent([answerData]);
    });
    
    taz.loadingDialog.hide();
    this.onAnswerChecked_(points);
};

/**
 * Called from AnswerView when "retry" has been clicked. 
 */
taz.OnCheckPointState.prototype.retryTask = function() {
    var checkPoint = this.model.getCurrentCheckPoint();
    var checkType = checkPoint.answerCheckType;
    
    // If the answer check type is FIELD or GAME_MASTER we need to resume game clock
    if (checkType == 'FIELD' || checkType == 'GAME_MASTER') {
        taz.gameTimer.resume();                
    }
    
    // reopen the answer view.
    this.model.setSubState(taz.OnCheckPointState.State.ON_TASK);

    var now = new Date().getTime();
    // Set task answer time start to now.
    this.model.setBeginShowTaskTime(now);

    this.showTaskView();
};

/**
 * Called from AnswerView when "ok" has been clicked. 
 */
taz.OnCheckPointState.prototype.acceptTask = function(points) {
    var checkPoint = this.model.getCurrentCheckPoint();
    var that = this;
    
    taz.loadingDialog.setLoadingMessage(taz.strings.sending_points);
    taz.loadingDialog.show();

    taz.OnCheckPointState.leaveCheckPoint(null);
    taz.loadingDialog.hide();
    // Now that the server is informed about the points, update the model.
    that.model.setPoints(Number(that.model.getPoints()) + Number(points));
    // Start guiding to the next check point or to the finish area.
    that.game.setState(taz.Game.State.ON_WAY_TO_CHECKPOINT);

}

/**
 * Checks answer offline. Only RADIO_GROUP_ANSWER and NUMBER_ANSWER type of task
 * elements can be checked.
 * 
 * @private
 */
taz.OnCheckPointState.prototype.checkAnswerAutomatic_ = function(answer) {
    var task = this.model.getCurrentCheckPoint().task;
    var points = taz.task.checkAnswer(task, answer);
    this.taskAnswersChecked(points);
};

/**
 * Called after the answer has been checked.
 * 
 * @private
 */
taz.OnCheckPointState.prototype.onAnswerChecked_ = function(points) {
    var answer = this.model.getAnswerToCurrentCheckPointTask();
    this.model.setPointsGainedFromCurrentCheckPoint(points);
    var checkPoint = this.model.getCurrentCheckPoint();
    
    var attempts = this.model.getCurrentTaskAttempts();
    var maxAttempts = checkPoint.maxAttempts;
    
    var answerData = {
        points : points,
        maxPoints : answer.maximumPoints,
        taskPoints : checkPoint.task.points,
        attempts : attempts,
        maxAttempts : maxAttempts,
        useCustomFeedback : checkPoint.useCustomFeedback,
        correctAnswerFeedback : checkPoint.task.correctAnswerFeedback,
        necAnswerFeedback : checkPoint.task.notEntirelyCorrectAnswerFeedback,
        wrongAnswerFeedback : checkPoint.task.wrongAnswerFeedback
    }
    
    if (this.model.isCurrentTaskAnswerTask() && !(this.model.getGame().template.hideFeedbackView)) {
        this.model.setSubState(taz.OnCheckPointState.State.ANSWER_CHECKED);
        // Show the points to the team.
        taz.viewManager.changeView('answerView', answerData);
    }
    else {
        this.acceptTask(points);
    }
};

/**
 * Called when the state exited.
 */
taz.OnCheckPointState.prototype.exitState = function() {
    taz.State.prototype.exitState.call(this);
    
    if (this.answerCheckLoopHandle_ != null) {
        clearTimeout(this.answerCheckLoopHandle_);
        this.answerCheckLoopHandle_ = null;
    }

    if (this.checkPointStatusLoopHandle_ != null) {
        clearTimeout(this.checkPointStatusLoopHandle_ );
        this.checkPointStatusLoopHandle_  = null;
    }
};



/**
 * @class
 */
taz.FinishedState = function(game, id) {
	// Call parent class implementation.
	taz.State.call(this, game, id);
};

taz.inherits(taz.FinishedState, taz.State);

/**
 * @const
 */
taz.FinishedState.RANKING_LIST_UPDATE_INTERVAL = 20000;

/**
 * @private
 */
taz.FinishedState.prototype.timeoutHandle_ = null;

/**
 * Called when the state is entered.
 */
taz.FinishedState.prototype.enterState = function() {
    console.log("INFO(State): Changed state to FinishedState");
    taz.gameTimer.pause();
	
    var gameId = this.model.getGameId();
    var teamId = this.model.getTeamId();
    var position = taz.navigation.currentPosition;
    var state = taz.Game.State.FINISHED;
    this.model.setState(state);
    var points = this.model.getPoints();
		
    taz.loadingDialog.setLoadingMessage(taz.strings.fetching_rankings);
    taz.loadingDialog.show();
	
    var that = this;
	// Notify the backend that we have finished.
    var showFinishedView = function(that) {                
        // Now that finish notification has been sent, start polling ranking list.
    	// Try to update the ranking list once immediately.
        that.refreshRankingList();
        taz.loadingDialog.hide();
        taz.viewManager.changeView('finishedView', {
            rankingList : [{
                name : taz.strings.fetching_rankings,
                points : that.model.getPoints(),
                finished : true
            }],
            teamName: that.model.getTeamName(),
            showRefreshButton: !that.game.isOnline()
        });

        // Start a loop that keeps updating the ranking list.
        that.timeoutHandle_ = that.game.isOnline() && setInterval(function() {
            position = taz.navigation.currentPosition;
            // Update the position of the team.
            that.backend.updateTeamStatus(gameId, teamId, position, state, points, null, 
                                          that.model.getDistance(), function(data) {});            
            
            that.refreshRankingList();
        }, taz.FinishedState.RANKING_LIST_UPDATE_INTERVAL);
    };
    
    this.backend.finishGame(gameId, teamId, position, state, points, null);
    showFinishedView(that);
    
    // In offline mode, try to send all answers in batch at this point
    if (!this.game.isOnline()) {
        var answers = this.model.getAnswersToTasks(true);        
        answers.length && this.backend.batchSendAnswers(gameId, teamId, answers, function() {
            that.model.setAnswersSent(answers);
        });
    }
};

/**
 * Called when the position changes.
 * 
 * @param {taz.GeoPosition} position The new position.
 */
taz.FinishedState.prototype.positionChanged = function(position) {
    // Do nothing.
};

/**
 * Called when we run out of game time.
 */
taz.FinishedState.prototype.gameTimeEnded = function() {
    // Intentionally overriden to do nothing.
};

taz.FinishedState.prototype.refreshRankingList = function() {
    var that = this;
    
    var success = function(data) {
        taz.finishedView.updateRankingList(_.extend({teamName: that.model.getTeamName()}, data));
    };    
    
    // If the game is not found, stop possible polling.
    var gameNotFound = function() {
        if (this.timeoutHandle_) {
            clearInterval(this.timeoutHandle_);
            this.timeoutHandle_ = null;
        }
    };

    this.backend.getRankingList(this.model.getGameId(), success, gameNotFound);
};

/**
 * Overridden from taz.State. This state does not need user's accurate 
 * location.
 */
taz.FinishedState.prototype.isLocationSensitive = function() {
	return false;
};

/**
 * Called when the state exited.
 */
taz.FinishedState.prototype.exitState = function() {
    taz.State.prototype.exitState.call(this);    
    if (this.timeoutHandle_ != null) {
            clearTimeout(this.timeoutHandle_);
            this.timeoutHandle_ = null;
    }
};


/**
 * @class
 */
taz.OnWayToStartAreaState = function(game, id) {
    // Call parent class implementation.
    taz.State.call(this, game, id);
};

taz.inherits(taz.OnWayToStartAreaState, taz.State);

/**
 * @private
 */
taz.OnWayToStartAreaState.prototype.startAreaReached_ = false;

/**
 * Called when the state is entered.
 */
taz.OnWayToStartAreaState.prototype.enterState = function() {
	console.log("INFO(State): Changed state to OnWayToStartAreaState");
	// Make sure game timer is not yet running
	taz.gameTimer.clear();

    var startArea = this.model.getStartArea();
    var position = taz.navigation.currentPosition;      

    if (taz.game.isNoGpsGame()) {
        // Fake a status update to the start area
        taz.navigation.setCurrentPosition(startArea.getRandomPoint(), 10);
    }
    
    if(startArea.containsPosition(position) || taz.game.isNoGpsGame()) {
    	this.startAreaReached_ = true;
        this.game.setState(taz.Game.State.WAITING_FOR_LAUNCH);
    }
    else {
    	var guideData = {
    		// Guide to the nearest point in the start area.
    		goalPosition: startArea.nearestPointInPolygon(position),
    		cpSize: 0,
    		guideTimerStartTime: null,
    		guideTimerTimeout: null
    	};

    	taz.viewManager.changeView('guideView', guideData);
    }
};

/**
 * Called when the position changes.
 * 
 * @param {taz.GeoPosition} position The new position.
 */
taz.OnWayToStartAreaState.prototype.positionChanged = function(position) {
    if (taz.game.isNoGpsGame()) {
        taz.State.prototype.positionChanged.call(this, position);
        return;
    }
    
    var startArea = this.model.getStartArea();
    
    this.checkIfInGameArea(position);
        
    if (this.isInValidGameZone) {
        // Guide to the nearest point in the start area.
        taz.guideView.teamInAllowedArea(startArea.nearestPointInPolygon(position), taz.strings.goto_start_area);
    }
        
    // Call parent class implementation.
    taz.State.prototype.positionChanged.call(this, position);
    
   if (startArea.containsPosition(position) && !this.startAreaReached_) {
        this.startAreaReached_ = true;
        this.game.setState(taz.Game.State.WAITING_FOR_LAUNCH);  
   }
};

/**
 * Called when the state exited.
 */
taz.OnWayToStartAreaState.prototype.exitState = function() {
    taz.State.prototype.exitState.call(this);
    this.startAreaReached_ = false;
};


/**
 * @class Base class for all game states.
 */
taz.State = function(game, id) {
    this.id = id;
    this.game = game;
    this.model = game.getModel();
    this.backend = game.getBackend();
};

/**
 * Status updates are sent only every STATUS_UPDATE_LIMITER:th position change event.
 * 
 * @const
 */
taz.State.STATUS_UPDATE_LIMITER = 6;

/**
 * Position for travel distance calculation is calculated using this many last positions.
 * 
 * @const
 */
taz.State.POSSAMPLESIZE = 5;

/**
 * The step must be smaller than the previous step multiplied by this modifier in order to be counted in the total distance.
 * 
 * @const
 */
taz.State.DISTFILTERMULTIPLIER = 2;

/**
 * The step must be smaller than THRESHOLDMAXDISTANCE in order to be counted in the total distance.
 * 
 * @const
 */
taz.State.THRESHOLDMAXDISTANCE = 1000;

/**
 * Buffer of previous positions for travel distance calculation.
 * 
 * @type {Array.<taz.GeoPosition>}
 */
taz.State.posBuffer_ = [];

/**
 * How many times has the positionChanged method been called.
 */
taz.State.statusUpdateCounter_ = 0;

/**
 * Previous step distance for travel distance calculation
 */
taz.State.oldStep_ = null;

/**
 * Previous filtered position for travel distance calculation
 */
taz.State.oldPos_ = null;

/**
 * @protected
 * @type {String}
 */
taz.State.prototype.id = null;

/**
 * @protected
 * @type {taz.Game}
 */
taz.State.prototype.game = null;

/**
 * @protected
 * @type {taz.GameModel}
 */
taz.State.prototype.model = null;

/**
 * @protected
 * @type {taz.Backend}
 */
taz.State.prototype.backend = null;

/**
 * @protected
 * @type {boolean}
 */
taz.State.prototype.isInValidGameZone = true;

taz.State.prototype.getModel = function() {
    return this.model;
};
/**
 * Called when the state is entered.
 */
taz.State.prototype.enterState = function() {

};

/**
 * Called when the state is continued after restart of the application.
 */
taz.State.prototype.continueState = function() {
    // Default implementation just enters the state.
    this.enterState();
};

/**

 * Called when the state exited.
 */
taz.State.prototype.exitState = function() {
	this.model.setSubState(null);
};

/**
 * This is called from the showServersView when the user selects a server to join.
 *
 * @param [GameServerListDTO.ServerDescription} server The description of the selected server.
 */
taz.State.prototype.selectServer = function(server) {

};

/**
 * This is called from the serverDescriptionView when the user accepts the server.
 *
 * @param {GameServerListDTO.ServerDescription} server The description of the selected server.
 */
taz.State.prototype.acceptServerSelection = function(server) {
    
};

/**
 * This is called from the ShowGamesView when the user selects a game to join.
 * 
 * @param {GameListDTO.GameDescription} game The description of the selected game.
 */
taz.State.prototype.selectGame = function(game) {

};

/**
 * This is called from the gameDescriptionView when the user accepts the game.
 * 
 * @param {GameListDTO.GameDescription} game The description of the selected game.
 */
taz.State.prototype.acceptGameSelection = function(game) {

};

/**
 * This is called from the JoinGameView when the user attempts to join the game.
 * 
 * @param {GameListDTO.GameDescription} game The description of the game to join.
 * @param {String} teamName Wanted name for the team.
 */
taz.State.prototype.join = function(game, teamName) {	

};

/**
 * Called when the position changes.
 * 
 * @param {taz.GeoPosition} position The new position.
 */
taz.State.prototype.positionChanged = function(position) {
    var that = this;

    var success = function(posReply) {
        
        if (posReply && posReply.teamInGame == false) {
            that.kickedOutOfGame();
        }	   
        else if (posReply && posReply.ranking && posReply.numberOfTeams) {
            that.formatRankingString_(posReply.ranking, posReply.numberOfTeams);

            if (posReply.hasGameEnded == true && that.model.getGame().ended == false) {
                that.gameEnded();
            }
        }

        if (posReply && posReply.newMessages) {
            taz.game.newMessagesAvailable();
        }

        if (posReply && posReply.pointAdjustment) {
            that.model.setPointAdjustment(posReply.pointAdjustment);
        }
    };

    var gameId = this.model.getGameId();
    var teamId = this.model.getTeamId();
    var state  = this.isInValidGameZone ? this.model.getState() : 'OUT_OF_GAME_AREA';
    var points = this.model.getPoints();
    var traveled = parseInt(this.model.getDistance());
    
    var dist = this.calculateStepDistance(position);
    if (dist > 0) {
        traveled += dist;
        this.model.setDistance(traveled);
        
        console.log("taz.State.positionChanged: new traveled distance is " + traveled);
    }
    
    var nextcpId = null;
    
    if ((state == 'ON_WAY_TO_CHECKPOINT' && (this.model.getSubState() != null))) {
    	var currentCP = this.model.getCurrentCheckPoint();
    	
    	if(currentCP != null) {
    		nextcpId = currentCP.id;
    	}
    }
    
    taz.State.statusUpdateCounter_++;
    
    // In no-gps games the status updates are so rare that let every one go through immediately.
    if (taz.State.statusUpdateCounter_ % taz.State.STATUS_UPDATE_LIMITER == 0 || taz.game.isNoGpsGame()) {
        this.backend.updateTeamStatus(gameId, teamId, position, state, points, nextcpId, traveled, success);	
    }
};

/**
 * Called from navigation views when position changes to check react
 * if gone outside valid game area
 * 
 * @param position the latest position of team
 */
taz.State.prototype.checkIfInGameArea = function(position) {
    if (taz.game.isNoGpsGame()) {
        return true;
    }
    
	var inGameZone = this.isInGameZone(position);
    var forbiddenZone = this.isInForbiddenZone(position);
    var inForbiddenZone = forbiddenZone != null;
    this.isInValidGameZone = (inGameZone && !inForbiddenZone);   
    
    if (!inGameZone) {
    	var guidePos = this.model.getZone().nearestPointInPolygon(position);
        taz.guideView.teamOutsideGameArea(guidePos);
        
        if (['showHintView', 'mapView'].indexOf(taz.viewManager.getCurrentViewId()) !== -1) {
            this.model.stashActiveViewId(taz.viewManager.getCurrentViewId());
        	this.showGuideView(guidePos);
        	taz.guideView.teamOutsideGameArea(guidePos);
        }
    }
    
    if (inForbiddenZone) {
    	var guidePos = forbiddenZone.nearestPointInPolygon(position);
        taz.guideView.teamInForbiddenZone(guidePos);
        
        if (['showHintView', 'mapView'].indexOf(taz.viewManager.getCurrentViewId()) !== -1) {
            this.model.stashActiveViewId(taz.viewManager.getCurrentViewId());
        	this.showGuideView(guidePos);
        	taz.guideView.teamInForbiddenZone(guidePos);
        }
    }
};

/**
 * Show the guide view. Here because used in multiple states.
 *
 * @protected
 */
taz.State.prototype.showGuideView = function(goalPosition) {
    var guideShowBegin = null;
    var guideTimeout = null;
    var currentEdge = this.model.getCurrentEdge();
    var currentCP = this.model.getCurrentCheckPoint();
    var cpSize = 0;
    
    if (currentCP != null) {
    	cpSize = currentCP.radius;
    }
    
    if (currentEdge != null && currentEdge.transitionTime > 0) {
        guideShowBegin = this.model.getBeginShowGuideTime();
        guideTimeout = currentEdge.transitionTime;
    }
    
    var guideData = {
        goalPosition: goalPosition,
        cpSize: cpSize,
        guideTimerStartTime: guideShowBegin,
        guideTimerTimeout: guideTimeout,
        canSwitchToMap: this.canSwitchToMapView(),
        showScanQrCodeIcon: this.canScanQrCode()
    };
    
    taz.viewManager.changeView('guideView', guideData);
};

/**
 * Checks if the QR code scanning in the game header should be enabled.
 */
taz.State.prototype.canScanQrCode = function() {
    return false;
};

taz.State.prototype.canSwitchToMapView = function() {
    return false;
};

/** 
 * Formats the current ranking string based on current ranking and number of teams
 * 
 * @private
 */
taz.State.prototype.formatRankingString_ = function(ranking, numOfTeams) {
	this.model.setRankingString(ranking + "/" + numOfTeams);
};

/**
 * Returns true if the given positions is inside the game zone.
 * 
 * @param {taz.GeoPosition} position.
 */
taz.State.prototype.isInGameZone = function(position) {
	var zone = this.model.getZone();
	return zone.containsPosition(position);
};

/**
 * Returns true if this state is sensitive to the team's location so 
 * that accurate location is always needed.
 * State classes should override this if they do not need the maximum 
 * accuracy.
 */
taz.State.prototype.isLocationSensitive = function() {
	return true;
};

/**
 * Returns true if this state requires undivided attention from the user 
 * team. If this is true, no overlays will jump to the user's face unless 
 * absolutely necessary.
 */
taz.State.prototype.requiresAttention = function() {
	return false;
};

/**
 * Returns the forbidden zone inside which the position is or null.
 * 
 * @param {taz.GeoPosition} position.
 */
taz.State.prototype.isInForbiddenZone = function(position) {
	var forbiddenZones = this.model.getForbiddenZones();
	
	for (var i = 0; i < forbiddenZones.length; ++i) {
		if (forbiddenZones[i].containsPosition(position)) {
			return forbiddenZones[i];
		}
	}
	
	return null;
};

/**
 * Called from the TaskView when that answer changes: for example when the team fills
 * a new text answer or selects a new check box during the answering process.
 */
taz.State.prototype.answerChanged = function(answer) {

};

/**
 * Called from the TaskView after the user has an aswer.
 */
taz.State.prototype.answerTask = function(answer) {

};

/**
 * Called from the taskView when the user gives up.
 */
taz.State.prototype.giveUpTask = function() {

};

/**
 * Called from CheckTaskAnswerView (field) or WaitTaskCheckView (game master) 
 * after the answer has been checked.
 */
taz.State.prototype.taskAnswersChecked = function(points) {
	
};

/**
 * Called from AnswerView when "retry" has been clicked. 
 */
taz.State.prototype.retryTask = function() {
    
}

/**
 * Called from AnswerView when "ok" has been clicked. 
 */
taz.State.prototype.acceptTask = function(points) {
	
}

/**
 * Called from the ShowHintView after guidance hint has been shown long enough.
 */
taz.State.prototype.guideHintShown = function() {

};

/**
 * Called from GuideView when route timer expires
 */
taz.State.prototype.routeTimeExpired = function() {
    
};

/**
 * Called by WaitForStartView when the start countdown has finished.
 */
taz.State.prototype.startCountdownFinished = function() {

};

/**
 * Called in OnWayToCheckPointState (either GuideView or HintView). 
 */
taz.State.prototype.showOnDemandTask = function() {
    
};

/**
 * Called from ChooseRouteView when the team has selected a route.
 * 
 * @param {EdgeDTO} selectedEdge The edge that corresponds to the selected route.
 */
taz.State.prototype.selectRoute = function(selectedEdge) {

};

/**
 * Called from MapView ("dashboard")
 */
taz.State.prototype.selectCheckpointFromMap = function(selectedCheckpoint) {
    
};

/**
 * Called from guide view when the team wants to view the map again.
 */
taz.State.prototype.showMapView = function() {
    
};

/**
 * Called from MapView when the team wants to switch to guide view.
 */
taz.State.prototype.switchToGuideView = function() {
    
};

/**
 * Called when the team has succesfully scanned a QR code. 
 * This is used in HintView to verify 
 */
taz.State.prototype.qrCodeScanned = function(code) {
    
};

/**
 * Called from finishedView in offline games when the team wants to update 
 * the ranking.
 */
taz.State.prototype.refreshRankingList = function() {
    
};

/**
 * Called when we run out of game time.
 */
taz.State.prototype.gameTimeEnded = function() {
	this.endGame_(true);
};

/**
 * Called when the game is stopped
 */
taz.State.prototype.gameEnded = function() {
    this.endGame_(false);
};

/**
 * Called when kicked out of game
 */
taz.State.prototype.kickedOutOfGame = function() {
	// Close messaging overlay if open
	this.game.hideMessagingOverlay();
	
    // Close all dialogs so that the used cannot click them any more.
    taz.Dialog.closeAllDialogs();
    
    // Clear the model and switch back to initializing state.
    this.game.clearPersistentData();
    this.game.setState(taz.Game.State.INITIALIZING);

    taz.dialogs.okDialog(taz.strings.kicked_out_of_game);    
};

/**
 * This is called when the game ends because of time running out or for some other reason. 
 * 
 * @param {boolean} isTimeRunout did the game end because of time running out?
 * 
 * @private
 * 
 */
taz.State.prototype.endGame_ = function(isTimeRunout) {
    taz.gameTimer.pause();
    
    var game = this.model.getGame();
    game.ended = true;
    this.model.setGame(game);
    var finishAreaExists = this.model.getFinishArea() != null;    
    var that = this;
    var message = "";

    if (finishAreaExists) {
        message = taz.strings.game_ended_with_fa;
    }
    else {
        message = taz.strings.game_ended_without_fa;
    }

    // Close all dialogs so that the used cannot click them any more.
    taz.Dialog.closeAllDialogs();
    
    if (finishAreaExists) {
        taz.dialogs.okDialog(message, function() {
            that.game.setState(taz.Game.State.ON_WAY_TO_FINISH_AREA);
        });
    }
    else {
        taz.dialogs.okDialog(message, function() {
            that.game.setState(taz.Game.State.FINISHED);
        });
    }
};

taz.State.prototype.calculateStepDistance = function(newpos) {
    if(taz.State.posBuffer_.length >= taz.State.POSSAMPLESIZE ) {
        taz.State.posBuffer_.shift();
    }
    taz.State.posBuffer_.push(newpos);
    
    //check that there is enough points
    if(taz.State.posBuffer_.length < taz.State.POSSAMPLESIZE ) {
        console.log("taz.State.calculateStepDistance: not enough samples not calculating distance: " + taz.State.posBuffer_.length);
        return -1;
    }
    
    // check we are in a state where distance is calculated
    var state = this.model.getState();
    
    if (state == 'ON_WAY_TO_CHECKPOINT' ||
        state == 'ON_CHECKPOINT'        ||
        state == 'ON_DEMAND_TASK'       ||
        state == 'ON_WAY_TO_FINISH_AREA') {
        
    	// Calculate the position that is in middle of all positions in the buffer
    	var smallestDistIndex = 0;
    	for (var i = 0; i < taz.State.posBuffer_.length; i++) {
    		var distSum = 0.0;
    		var smallestDist = 0.0;
    		
    		for (var j = 0; j < taz.State.posBuffer_.length; j++) {
    			if (i != j) {
    				distSum += taz.State.posBuffer_[i].distanceTo(taz.State.posBuffer_[j]);
    			}
    		}
    		if (distSum < smallestDist || i == 0) {
    			smallestDist = distSum;
    			smallestDistIndex = i;
    		}
    	}
    	
    	var step = -1;
    	
    	if (taz.State.oldPos_) {
    		step = taz.State.oldPos_.distanceTo(taz.State.posBuffer_[smallestDistIndex]);
    	}
    	
        step = Math.round(step);

        taz.State.oldPos_ = taz.State.posBuffer_[smallestDistIndex];
        
        // Clear buffer
        taz.State.posBuffer_ = [];
        // Only accept steps under 50 meters
        if (step < 50) {
        	return step;
        }

    	console.log("taz.State.prototype.calculateStepDistance: StepTooLong! Ignored step: " + step + "m.");
        
        /*var medianPos = taz.medianPos(taz.State.posBuffer_);
        var step = 0;
        var stepTooLong = false;
        
        if (taz.State.oldPos_ != null && taz.State.oldStep_ != null) {
            step = taz.State.oldPos_.distanceTo(medianPos);
            // Check if the step is too much longer than the previous one
            if (step > taz.State.oldStep_ * taz.State.DISTFILTERMULTIPLIER || step > taz.State.THRESHOLDMAXDISTANCE) {
            	stepTooLong = true;
            }
        }
        
        taz.State.oldStep_ = step;
        taz.State.oldPos_ = medianPos;

        step = Math.round(step);
        // If step was too long, don't return the step
        if (stepTooLong) {
        	console.log("taz.State.prototype.calculateStepDistance: StepTooLong! Ignored step: " + step + "m.");
        	return -1;
        }
        
        return step;
        */
    }
    else {
        console.log("taz.State.prototype.calculateStepDistance: not calculating distance");
    }
    
    return -1;
};


/**
 * @class
 */
taz.WaitingForLaunchState = function(game, id) {
	// Call parent class implementation.
	taz.State.call(this, game, id);
};

taz.inherits(taz.WaitingForLaunchState, taz.State);

/**
 * @const
 */
taz.WaitingForLaunchState.GAME_START_POLL_INTERVAL = 3000;

/**
 * @private
 */
taz.WaitingForLaunchState.prototype.timeoutHandle_ = null;

/**
 * Called when the state is entered.
 */
taz.WaitingForLaunchState.prototype.enterState = function() {
	console.log("INFO(State): Changed state to WaitingForLaunchState");
	//Make sure game timer is not yet running
	taz.gameTimer.clear();
	
    var autolaunch = this.model.getGame().template.teamAutolaunch;
	taz.viewManager.changeView('waitForLaunchView', {autolaunch : autolaunch});
	
	var that = this;
	var gameId = this.model.getGameId();
	var teamId = this.model.getTeamId();
	
	var pollFunc = function() {
        if (!taz.waitForLaunchView.isInitialized()) {
            that.timeoutHandle_ = setTimeout(pollFunc, taz.WaitingForLaunchState.GAME_START_POLL_INTERVAL);
            return;
        }
        
        that.backend.isPermissionToStart(gameId, teamId, function(permission) {
            // Make sure taz.waitForLaunchView.startCountDown() is called exactly once.         
            if (that.timeoutHandle_ == null) {
                return;
            }
        
            if (permission) {
                that.timeoutHandle_ = null;
                // Start the countdown. startCountdownFinished is called by WaitForLaunchView
                // when the countdown has finished.
                taz.waitForLaunchView.startCountDown();
            } else {
                that.timeoutHandle_ = setTimeout(pollFunc, taz.WaitingForLaunchState.GAME_START_POLL_INTERVAL);
            }
        });
	};
	
    // If the autolaunch is enabled, the waitForLaunchView starts the countdown automatically as soon as
    // it is initialized. Otherwise we need to poll the backend for permission to start.
    if (!autolaunch) {
	    // Start polling the server for permission to start.
	    this.timeoutHandle_ = setTimeout(pollFunc, taz.WaitingForLaunchState.GAME_START_POLL_INTERVAL);
    }
};

/**
 * Called by waitForStartView when the start countdown has finished.
 */
taz.WaitingForLaunchState.prototype.startCountdownFinished = function() {
    taz.sounds.play(taz.Sounds.Type.GAME_STARTED);
    
    var gameId = this.model.getGameId();
    var teamId = this.model.getTeamId();
    var gameDuration = this.model.getGameDuration();
	
    var that = this;
    var time = new Date().getTime();
	
    taz.gameTimer.start(time, gameDuration);

    // Start guiding to the first check point.
    that.game.setState(taz.Game.State.ON_WAY_TO_CHECKPOINT);
};

/**
 * Called when the state exited.
 */
taz.WaitingForLaunchState.prototype.exitState = function(data) {
    taz.State.prototype.exitState.call(this);
    taz.waitForLaunchView.setInitialized(false);

	if (this.timeoutHandle_ != null) {
		clearTimeout(this.timeoutHandle_);
		this.timeoutHandle_ = null;
	}
};


/**
 * @class Lets the user select a name for the team.
 */
taz.JoinGameView = function() {

};

taz.inherits(taz.JoinGameView, taz.View);

/**
 * Singleton instance.
 * 
 * @type taz.JoinGameView
 */
taz.joinGameView = new taz.JoinGameView();

taz.JoinGameView.prototype.gameData_ = null;

/**
 * @param {GameListDTO.GameDescription} gameData
 */
taz.JoinGameView.prototype.onCreate = function(gameData) {
	
    // Call parent class implementation.
    taz.View.prototype.onCreate.call(this, 'joinGameView', gameData);
    
    // Generate and insert the content HTML.
    this.initUi({gameName : gameData.name});
    
	this.gameData_ = gameData;
	var that = this;
    var ready = false;
    
    var readyCb = function() {
    	ready = true;
    };
    
    var t = setTimeout(readyCb, 300);
	
	$("#backToGamesList").tazClick(_.once(function() {
		taz.viewManager.changeView("showGamesView");
	}));
	
    $("#joinGameButton").tazClick(_.once(function() {
        that.joinGamePressed_();
    }));
    
    $('#teamName').bind("focus", function() {
    	if (!ready) {
    		$(this).blur();
    	}
    });
    
    taz.input.setInputValidator('#teamName', new taz.input.LegalTeamNameValidator(), function(valid) {
        if (valid) {
            $('#joinGameButton').removeClass('ui-disabled');
        }
        else {
            $('#joinGameButton').addClass('ui-disabled');
        }
    });
};

taz.JoinGameView.prototype.releaseButtonLocks = function() {
	$("#joinGameButton").unbind();
	
	var that = this;
	
	$("#joinGameButton").tazClick(_.once(function() {
        that.joinGamePressed_();
    }));
};

taz.JoinGameView.prototype.joinGamePressed_ = function() {
	var teamName = $("#teamName").val();
    taz.game.join(this.gameData_, teamName);
};


/**
 * @class
 */
taz.WaitForLaunchView = function() {

};

taz.inherits(taz.WaitForLaunchView, taz.GameBaseView);

/**
 * Singleton instance.
 * 
 * @type taz.WaitForLaunchView
 */
taz.waitForLaunchView = new taz.WaitForLaunchView();

/**
 * @const
 */
taz.WaitForLaunchView.LIGHT_IMAGE_SMALL_WIDTH_PERCENTAGE = 30;

/**
 * @const
 */
taz.WaitForLaunchView.LIGHT_IMAGE_WIDTH_PERCENTAGE = 70;

/**
 * @const
 */
taz.WaitForLaunchView.ANIMATION_DURATION = 500;

/**
 * @private
 */
taz.WaitForLaunchView.prototype.isInitialized_ = false;

/**
 * @private
 */
taz.WaitForLaunchView.prototype.images_ = null;

taz.WaitForLaunchView.prototype.onCreate = function(data) {
	// Call parent class implementation.
	taz.GameBaseView.prototype.onCreate.call(this, 'waitForLaunchView', data);
	
	// Generate and insert the content HTML.
	this.initContentUi({});
			
    imageUrls = [
	    'images/red_light_wait.png',
	    'images/red_light.png',
	    'images/yellow_light.png',
	    'images/green_light_go.png'
    ];
		
	var that = this;	
    // All images must be preloaded so that we know their sizes.
	taz.imageutils.load(imageUrls, function(images) {
        that.images_ = images; 
            
        var redLightWait = images[0];
        var header = $('#game-header');
        var content = $('#waitForLaunchViewContent');
        
    	// Resize the waitForLaunchViewContent element to fill the page.
	    var headerHeight = header.outerHeight(true);
	    var contentHeight = window.innerHeight - headerHeight;
	    content.height(contentHeight - content.outerHeight(true));
	    
        // Draw the red light image to the page.
        content.append(redLightWait);
        taz.imageutils.setPositionAndWidth(redLightWait, taz.WaitForLaunchView.LIGHT_IMAGE_WIDTH_PERCENTAGE, 50);
        
        that.isInitialized_ = true;

        if (data.autolaunch) {
            that.startCountDown();
        }
    });
};

/**
 * Sets initialized
 */
taz.WaitForLaunchView.prototype.setInitialized = function(initialized) {
    this.isInitialized_ = initialized;
};

/**
 * Returns true if this view has been initialized and the countdown can be started.
 */
taz.WaitForLaunchView.prototype.isInitialized = function() {
	return this.isInitialized_;
};

taz.WaitForLaunchView.prototype.startCountDown = function() {
    if (!this.isInitialized_) {
        throw new Error('Not initialized');
    }

	var that = this;
	var totalTime = taz.settings.countdownTime;
	var index = 0;
	
	var timeoutFunction = function() {
	    if (index + 1 < that.images_.length) {
            that.animateLightImage_(that.images_[index + 1]);
        }
		
		if (index == 3) {
			clearTimeout(timeoutHandle);
			taz.game.startCountdownFinished();
		}
		
		++index;
	};

	timeoutFunction();
	var timeoutHandle = setInterval(timeoutFunction, 1000 * totalTime / 3);
};

/** 
 * @private
 */
taz.WaitForLaunchView.prototype.animateLightImage_ = function(image) {
    var content = $('#waitForLaunchViewContent');
    
    content.children().remove();
    content.append(image);
    
    taz.imageutils.setPositionAndWidth(image, 
        taz.WaitForLaunchView.LIGHT_IMAGE_SMALL_WIDTH_PERCENTAGE, 
        50);
        
    _.defer(function() {
        taz.imageutils.setPositionAndWidth(image,
            taz.WaitForLaunchView.LIGHT_IMAGE_WIDTH_PERCENTAGE,
            50,
            taz.WaitForLaunchView.ANIMATION_DURATION);
    });
};



/**
 * @class View that shows a list of games running nearby and lets
 *        the user select one
 */
taz.SplashScreenView = function() {

};

taz.inherits(taz.SplashScreenView, taz.View);

/**
 * Singleton instance.
 * 
 * @type taz.SplashScreenView
 */
taz.splashScreenView = new taz.SplashScreenView();

/**
 * @private
 */
taz.SplashScreenView.prototype.listener_ = null;

/**
 * @private
 */
taz.SplashScreenView.prototype.clientVersion_ = "Unknown";

/**
 * @private
 */
taz.SplashScreenView.prototype.finished_ = false;

taz.SplashScreenView.prototype.onCreate = function(data) {
    // Call parent class implementation.
    taz.View.prototype.onCreate.call(this, 'splashScreenView', data);

    this.initUi({});
    var that = this;
    
    var imageUrls = [
        'images/logo_splash.png',
        'images/taz_logo_splash.png'
    ];
    
    // Load images.
    taz.imageutils.load(imageUrls, imagesLoaded);
    
    // Now that all images are loaded and their width and height attributes ARE FINALLY NON-ZERO
    // calculate and set position for them.
    function imagesLoaded(images) {
        var logo = images[0];
        var tazLogo = images[1];
        
        // Hide the logos.
        $(logo).hide();
        $(tazLogo).hide();
               
        // Put elements to dom tree.
        $('#splashScreenViewContent').append(images);
        
        $('#clientVersion').text("Version " + taz.settings.clientVersion);

        // And then calculate sizes and positions and set them.
        taz.imageutils.setPositionAndWidthOnScreen(logo, 80, 50);
        taz.imageutils.setPositionAndWidthOnScreen(tazLogo, 30, 68);

        $(logo).fadeIn(1000, function() {
            $(tazLogo).fadeIn(1000, function() {
                if (that.listener_) {
                    that.listener_();
                }
                
                that.finished_ = true;
            });
        });
    };
};

taz.SplashScreenView.prototype.setSplashFinishedListener = function(listener) {
    this.listener_ = listener;
    
    // If the splash has already finished, call the listener immediately.
    if (this.finished_) {
        listener();
    }
};


/**
 * @class
 */
taz.FinishedView = function() {

};

taz.inherits(taz.FinishedView, taz.View);

/**
 * Singleton instance.
 * 
 * @type taz.FinishedView
 */
taz.finishedView = new taz.FinishedView();

/**
 * @private
 */
taz.FinishedView.prototype.created_ = false;

/**
 * @private
 */
taz.FinishedView.prototype.showRefreshButton_ = false;

/**
 * @private 
 */
taz.FinishedView.prototype.SHOW_FIRST_N = 10;

/**
 * @private
 */
taz.FinishedView.prototype.netDebugUpdateHandle_ = false;

/**
 * @private
 */
taz.main.timerTick_ = null;

/**
 * @private
 */
taz.main.pauseDialogShowBegin_ = null;

/**
 * @private
 * Time that the pause dialogs exit button will be disabled if there is queue (ms)
 */
taz.main.timeDisabled_ = 5000;


taz.FinishedView.prototype.onCreate = function(rankingList) {	
    // Call parent class implementation.
    taz.View.prototype.onCreate.call(this, 'finishedView', rankingList);
    
    this.created_ = true;
    this.showRefreshButton_ = rankingList.showRefreshButton;
    this.updateRankingList(rankingList);                  

    this.netDebugUpdateHandle_ = setInterval(_.bind(this.updateNetworkDebug_, this), 3000);
    this.updateRankingList(rankingList);

//    if (navigator.app && navigator.app.overrideBackbutton) {
//        navigator.app.overrideBackbutton(true);
//        document.addEventListener("backbutton", taz.FinishedView.backButtonDown_, true);  
//    }
};

/**
 * @private
 */
taz.FinishedView.prototype.updateRankingList = function(rankingList_) {
	if (this.created_) {
            // Generate and insert the content HTML.
            // hack: handlebars does not support ../ notation inside if/else blocks, so just put a reference
            // of the localized strings to each rankinglist object.
            // Also add meta information: which team is me, and what each team's rank is (also taking equals into account).
            var myTeam = null;
            var list = rankingList_.rankingList;
            for (var i = 0; i < list.length; ++i) {
                var prev = list[i - 1] || null;
                var item = list[i];
                item.strings = taz.strings;
                item.me = item.name === rankingList_.teamName;
                item.index = i;
                item.rank = prev && prev.points === item.points ? prev.rank : i + 1;
                item.inTopList = i < this.SHOW_FIRST_N;
                item.me && (myTeam = item);
            }
            
            // Clip the list to contain max SHOW_FIRST_N items (or +1 if own team did not make the list).
            list = list.slice(0, this.SHOW_FIRST_N);
            list = myTeam && myTeam.index > this.SHOW_FIRST_N ? list.concat([myTeam]) : list;
            
            var answerQueueLength = 0;
            if (taz.game && taz.game.getBackend() && taz.game.getBackend().getNetworkInfo()) {
            	answerQueueLength = taz.game.getBackend().getNetworkInfo().answerQueue.length;
            }
            
            var data = {
                    rankingList: list,
                    hideRankingList : taz.game.isHideRankingList(),
                    answerQueueLength : answerQueueLength,
                    showRefreshButton : this.showRefreshButton_
            };

            this.initUi(data, null, false);

            this.updateNetworkDebug_();
            this.bindButtons_();
	}
};

/**
 * @private
 */
taz.FinishedView.prototype.updateNetworkDebug_ = function() {
    var netInfo = taz.game.getBackend().getNetworkInfo();
    $('#net-debug-text').text("" + (netInfo.eventQueue.length + netInfo.answerQueue.length + netInfo.statusUpdateQueue.length));

    $('#net-debug-text').tazClick(function() {
        taz.game.showNetworkDebugOverlay();
    });
};

taz.FinishedView.prototype.bindButtons_ = function() {
    $('#refresh-ranking-list-btn-container a').tazClick(_.once(function() {
        $('#refresh-ranking-list-btn-container a').addClass("ui-disabled");
        $('#refresh-ranking-list-btn-container img').addClass("spin");
        
        taz.game.refreshRankingListClicked();
    }));
    
    $('#main-menu-button').tazClick(function() {
		var prompt = taz.strings.sure_to_exit_game;
        var callback = _.once(_.bind(taz.game.startNewGame, taz.game));
        taz.dialogs.okCancelDialog(prompt, callback);
    });    
};

taz.FinishedView.prototype.onDestroy = function(data) {	
    this.created_ = false;
    clearInterval(this.netDebugUpdateHandle_);

	// Call parent class implementation.
	taz.View.prototype.onDestroy.call(this, data);
};

/**
 * @private
 */
taz.FinishedView.prototype.onTimeTick_ = function() {
    // Get current time.
    var now = new Date().getTime();
    var timeElapsed = now - taz.main.pauseDialogShowBegin_;
    var timeLeft = taz.main.timeDisabled_ - timeElapsed;
    
    if (timeLeft > 0 && taz.game.getBackend().getNetworkInfo().answerQueue.length > 0) {
    	$('#negative-button').addClass('ui-disabled');
    }
    else {
    	$('#negative-button').removeClass('ui-disabled');
    }
    
    $('#answer-queue-length').text(taz.game.getBackend().getNetworkInfo().answerQueue.length);
};

/**
 * @private
 */
taz.FinishedView.prototype.stopTimerTick_ = function() {
    if (this.timerTick_ != null) {
        clearInterval(this.timerTick_);
        this.timerTick_ = null;
    }
};


taz.OnDemandsLeftView = function() {

};

taz.inherits(taz.OnDemandsLeftView, taz.GameBaseView);

taz.onDemandsLeftView = new taz.OnDemandsLeftView();


taz.OnDemandsLeftView.prototype.onCreate = function(data) {
    // Call parent class implementation.
    taz.GameBaseView.prototype.onCreate.call(this, 'onDemandsLeftView', data);
    
    // Generate and insert the content HTML.
    this.initContentUi({});
    
    $('#go-to-finish-button').tazClick(_.bind(function() {
    	taz.dialogs.twoButtonDialog(taz.strings.finish_this_game_confirmation, taz.strings.finish_this_game_confirmation_cont, taz.strings.finish_this_game_confirmation_quit, function() {
        }, function() {
            taz.game.setState(taz.Game.State.FINISHED);
        });
    }));
    
    $('#image-container').tazClick(_.bind(function() {
    	taz.game.setState(taz.Game.State.ON_DEMAND_TASK);
    }));
};

taz.OnDemandsLeftView.prototype.onDestroy = function(data) {
    // Call parent class implementation.
    taz.GameBaseView.prototype.onDestroy.call(this, data);
};


/**
 * @class Lets the user select a name for the team.
 */
taz.RejoinGameView = function() {

};

taz.inherits(taz.RejoinGameView, taz.View);

/**
 * Singleton instance.
 * 
 * @type taz.RejoinGameView
 */
taz.rejoinGameView = new taz.RejoinGameView();

taz.RejoinGameView.prototype.onCreate = function(data) {
	// Call parent class implementation.
	taz.View.prototype.onCreate.call(this, 'rejoinGameView', data);
	
	// Generate and insert the content HTML.
	this.initUi();
	var that = this;
	
	taz.main.rejoinViewDisplayed = true;
	
	var languageDialog;
	
	$("#openLanguageMenu").bind("tap", function() {
    	that.languageDialog = taz.dialogs.languageDialog();
    	that.languageDialog.show();
    	
    	$("#finnishSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("fi");
        	that.languageDialog.close();
    	}));
        
        $("#englishSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("en");
        	that.languageDialog.close();
    	}));
        
        $("#chineseSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("zh");
        	that.languageDialog.close();
    	}));
        
        $("#arabicSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("ar");
        	that.languageDialog.close();
    	}));
        
        $("#danishSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("da");
        	that.languageDialog.close();
    	}));
        
        $("#frenchSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("fr");
        	that.languageDialog.close();
    	}));
        
        $("#germanSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("de");
        	that.languageDialog.close();
    	}));
        
        $("#norwegianSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("nb");
        	that.languageDialog.close();
    	}));
        
        $("#swedishSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("sv");
        	that.languageDialog.close();
    	}));
        
        $("#russianSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("ru");
        	that.languageDialog.close();
    	}));
    });
    
    $('#continue-game-button').tazClick(_.once(function() {
    	taz.main.rejoinViewDisplayed = false;
        taz.game.continueGame();
    }));

    $('#join-new-game-button').tazClick(function() {
    	taz.main.rejoinViewDisplayed = false;
        var prompt = taz.strings.sure_to_start_new_game;
        var callback = _.once(_.bind(taz.game.startNewGame, taz.game));
        taz.dialogs.joinNewGameConfirmDialog(prompt, callback);
    });
};



/**
 * @class Shows a description of a game.
 */
taz.GameDescriptionView = function() {

};

taz.inherits(taz.GameDescriptionView, taz.View);

taz.gameDescriptionView = new taz.GameDescriptionView();

/**
 * @param {{game:GameListDTO.GameDescription, picture:DataChunkDTO}} data
 */
taz.GameDescriptionView.prototype.onCreate = function(data) {
    // Call parent class implementation.
    taz.View.prototype.onCreate.call(this, 'gameDescriptionView', data);
    
    // Generate and insert the content HTML.
    this.initUi(data);    

    $('#cancelGameButton').tazClick(_.once(function() {
	taz.viewManager.changeView("showGamesView");
    }));
    
    $('#acceptGameButton').tazClick(function() {
        taz.game.acceptGameSelection(data.game);
    });
};

taz.GameDescriptionView.prototype.onDestroy = function(data) {
    // Call parent class implementation.
    taz.View.prototype.onDestroy.call(this, data);
};



/**
 * @class Shows a hint about the location of the next checkpoint
 */
taz.ShowHintView = function() {

};

taz.inherits(taz.ShowHintView, taz.GameBaseView);

taz.showHintView = new taz.ShowHintView();

/**
 * Timeout for checking if the hint show time has passed
 * 
 * @private
 */
taz.ShowHintView.prototype.timeTick_ = null;

/**
 * Time when the hint showing has begun in milliseconds
 * 
 * @private
 */
taz.ShowHintView.prototype.hintBeginTime_ = null;

/**
 * The timeout in milliseconds.
 * 
 * @private
 */
taz.ShowHintView.prototype.hintTimeout_ = null;

/**
 * @private
 */
taz.ShowHintView.prototype.guideTimeout_ = null;

taz.ShowHintView.prototype.hintTimeoutTriggered_ = false;

taz.ShowHintView.prototype.guideTimeoutTriggered_ = false;

/**
 * @param {CheckPointTemplateDTO} checkPoint The check point to show hint for.
 */
taz.ShowHintView.prototype.onCreate = function(hintData) {
	// Call parent class implementation.
	taz.GameBaseView.prototype.onCreate.call(this, 'showHintView', hintData);
	
	this.hintBeginTime_ = hintData.hintShowBegin;
	this.hintTimeout_ = hintData.checkPoint.hintTimeout;	
	this.guideTimeout_ = hintData.guideTimeout;
	this.hintTimeoutTriggered_ = false;
	this.guideTimeoutTriggered_ = false;
	
    var hintTimeLeft = (this.hintTimeout_ - (Date.now() - this.hintBeginTime_)) > 0;	
	hintData.showHintContainer = (hintData.checkPoint.hintText || hintData.checkPoint.hintPicture) && hintTimeLeft;
	
	// Generate and insert the content HTML.
	this.initContentUi(hintData);
	
	if (!this.guideTimeout_) {
		$('#guide-time-left-container').hide();
	}
	if (this.hintTimeout_ > 0 || this.guideTimeout_ > 0) {
	    this.updateClock_();
	    // Tick every 0.5 seconds so every second is surely shown
	    this.timeTick_ = setInterval(_.bind(this.onTimeTick_, this), 500);	    
	}
	
	$('#scan-qr-code').tazClick(function() {
	    var code = "";
	    
	    if (!taz.isUsingRipple() && window.plugins && window.plugins.barcodeScanner) {
	        window.plugins.barcodeScanner.scan(function(result) {
	            code = result.text;
	            taz.game.qrCodeScanned(code);
	        });
	    }
	    else {
	        // If using Ripple then just assume correct code.
	        code = hintData.checkPoint.qrCode;
	        taz.game.qrCodeScanned(code);
	    }
	});
};

taz.ShowHintView.prototype.setHintVisible = function(visible) {
    $('#hint-container')[visible ? 'show' : 'hide']();
    $('#hint-timeout-container')[visible ? 'show' : 'hide']();
};

/**
 * @private
 */
taz.ShowHintView.prototype.onTimeTick_ = function() {
	// Get current time
	var time = new Date().getTime();
	
	// Time left (in seconds)
	var hintTimeLeft = (this.hintTimeout_ - (time - this.hintBeginTime_)) / 1000;
	var guideTimeLeft = null;

	if (this.guideTimeout_) {
		 guideTimeLeft = (this.guideTimeout_ - (time - this.hintBeginTime_)) / 1000;
	}
	
	// Trigger hint shown event but only once
	if (hintTimeLeft <= 0 && !this.hintTimeoutTriggered_) {
	    this.hintTimeoutTriggered_ = true;
	    taz.game.guideHintShown();
	}
	
	// Trigger guide timeout event only once
	if (this.guideTimeout_ && guideTimeLeft <= 0 && !this.guideTimeoutTriggered_) {
	    this.guideTimeoutTriggered_ = true;
	    taz.game.routeTimeExpired();
	}
	
	// Update both clocks (hint & guide timeout)
	this.updateClock_();
	
	// If both clocks have run out, disable the clock updating
    if (this.timeTick_ != null && hintTimeLeft <= 0 && (!guideTimeLeft || guideTimeLeft <= 0)) {
        clearInterval(this.timeTick_);
        this.timeTick_ = null;
    }	
};

/**
 * @private
 */
taz.ShowHintView.prototype.updateClock_ = function() {
	var time = new Date().getTime();
	var hintTimeLeft = (this.hintTimeout_ - (time - this.hintBeginTime_)) / 1000;
	
	if (hintTimeLeft > 0) {
    	var hintTimeString = taz.TimerHelper.getTimeString(hintTimeLeft);
    	$('#hint-time-left-text').html(hintTimeString);
	}
	
	if (this.guideTimeout_) {
		var guideTimeLeft = (this.guideTimeout_ - (time - this.hintBeginTime_)) / 1000;
		var guideTimeString = taz.TimerHelper.getTimeString(guideTimeLeft);
		$('#guide-time-left-text').html(guideTimeString);
	}
};

taz.ShowHintView.prototype.onDestroy = function(data) {
	// Call parent class implementation.
	taz.GameBaseView.prototype.onDestroy.call(this, data);
	
	// Cancel the hint timeout if it is still pending.
	if (this.timeTick_ != null) {
		clearInterval(this.timeTick_);
		this.timeTick_ = null;
	}
};



/**
 * @class Shows the answer view after team answer to a task has been inspected
 */
taz.AnswerView = function() {

};

taz.inherits(taz.AnswerView, taz.GameBaseView);

taz.answerView = new taz.AnswerView();

/**
 * @param {Object} answerData An object consisting of points, taskPoints, maxPoints and message
 */
taz.AnswerView.prototype.onCreate = function(answerData) {
    // Call parent class implementation.
    taz.GameBaseView.prototype.onCreate.call(this, 'answerView', answerData);

    var imgUrl = '';
    var useCustomFeedback = false;
    var customFeedback = "";
    // Make sure there is a custom feedback set if trying to use it
    if ((answerData.useCustomFeedback) &&
    		((answerData.points == answerData.taskPoints && (answerData.correctAnswerFeedback != null && answerData.correctAnswerFeedback != ""))
    		|| (answerData.points > 0 && answerData.points != answerData.taskPoints && (answerData.necAnswerFeedback != null && answerData.necAnswerFeedback != ""))
        	|| (answerData.points == 0 && (answerData.wrongAnswerFeedback != null && answerData.wrongAnswerFeedback != "")))) {
    	
    	useCustomFeedback = true;
        imgUrl = "../www/images/feedback.png";
        
        if (answerData.points == 0) {
        	taz.sounds.play(taz.Sounds.Type.WRONG_ANSWER);
        }
        else {
        	taz.sounds.play(taz.Sounds.Type.CORRECT_ANSWER);
        }
        
    	if (answerData.points == answerData.taskPoints) {
    		customFeedback = answerData.correctAnswerFeedback;
	    } 
	    else if (answerData.points > 0) {
	    	customFeedback = answerData.necAnswerFeedback;
	    }
	    else {
	    	customFeedback = answerData.wrongAnswerFeedback;
	    }
    }
    // If custom feedback is not set or used, go with defaults
    else {
	    if (answerData.points == answerData.taskPoints) {
	        imgUrl = "../www/images/OK.png";
	        taz.sounds.play(taz.Sounds.Type.CORRECT_ANSWER);
	    } 
	    else if (answerData.points > 0) {
	        imgUrl = "../www/images/neutral.png";
	        taz.sounds.play(taz.Sounds.Type.CORRECT_ANSWER);
	    }
	    else {
	        imgUrl = "../www/images/wrong.png";
	        taz.sounds.play(taz.Sounds.Type.WRONG_ANSWER);
	    }
    }

    var canTryAgain = answerData.attempts < answerData.maxAttempts && answerData.points <= 0 && answerData.taskPoints > 0;
    var attemptsLeft = answerData.maxAttempts - answerData.attempts;

    var canTryAgainText = "";
    if (canTryAgain) {
    	canTryAgainText = taz.strings.you_have + attemptsLeft + (attemptsLeft == 1 ? taz.strings.attempt_left : taz.strings.attempts_left);
    }
    
    var buttonText = taz.strings.ok;
    if (canTryAgain) {
        buttonText = taz.strings.try_again;
    }

    var resultText = taz.strings.correct_answer;
    if (answerData.points <= 0 && answerData.taskPoints > 0) {
    	resultText = taz.strings.incorrect_answer;
    }
    else if (answerData.points > 0 && answerData.points < answerData.taskPoints) {
    	resultText = taz.strings.ok_answer;
    }
    
    var data = {
        answerPoints : taz.strings.you_got + answerData.points + "/" + answerData.taskPoints + " " + taz.strings.points + ".",
        tryAgainText : canTryAgainText,
        buttonText : buttonText, 
        answerIsResult : resultText,
        positiveButton : answerData.points > 0,
        useCustomFeedback : useCustomFeedback,
        customFeedback : customFeedback
    };

    // Generate and insert the content HTML.
    this.initContentUi(data);
    
    // Insert the image
    taz.imageutils.load([imgUrl], function(images) {
       var el = images[0];
       $('#result-image-container').append(el);
       $(el).height('auto');
       $(el).width('100%');
    });
        
    $("#answerOkButton").tazClick(_.once(_.bind(function() {
    	if(!canTryAgain) {
    		taz.game.acceptTask(answerData.points);
    	}
    	else {
    		taz.game.retryTask();
    	}
    })));
};

taz.AnswerView.prototype.onDestroy = function(data) {
    // Call parent class implementation.
    taz.GameBaseView.prototype.onDestroy.call(this, data);
};


/**
 * @class View that shows a list of games running nearby and lets
 *        the user select one
 */
taz.ShowGamesView = function() {

};

taz.inherits(taz.ShowGamesView, taz.View);

/**
 * Singleton instance.
 * 
 * @type taz.ShowGamesView
 */
taz.showGamesView = new taz.ShowGamesView();

/**
 * @param {GameListDTO} data
 */
taz.ShowGamesView.prototype.onCreate = function(data) {
    // Call parent class implementation.
    taz.View.prototype.onCreate.call(this, 'showGamesView', data);
    
    // Register handlebars helper
    Handlebars.registerHelper('getGameIcon', function(passcode) {
        if (passcode) {
            return "images/server_lock.png";
        }
        else {
            return "images/server_green.png";
        }
    });
    
    // Register handlebars helper for plural comparison
    Handlebars.registerHelper('getGameFoundText', function(length) {
    	if (length != 1) {
    		return taz.strings.games_found;
    	} else {
    		return taz.strings.game_found;
    	}
    });

    // Generate and insert the content HTML and add handlers to buttons in UI
    this.initUiAndBindButtons_();            
};

/**
 * @private
 */
taz.ShowGamesView.prototype.initUiAndBindButtons_ = function() {
    this.initUi(this.viewData);
    var that = this;
    
    var languageDialog;
    
    $("#openLanguageMenu").bind("tap", function() {
    	that.languageDialog = taz.dialogs.languageDialog();
    	that.languageDialog.show();
    	
    	$("#finnishSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("fi");
        	that.languageDialog.close();
    	}));
        
        $("#englishSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("en");
        	that.languageDialog.close();
    	}));
        
        $("#chineseSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("zh");
        	that.languageDialog.close();
    	}));
        
        $("#arabicSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("ar");
        	that.languageDialog.close();
    	}));
        
        $("#danishSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("da");
        	that.languageDialog.close();
    	}));
        
        $("#frenchSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("fr");
        	that.languageDialog.close();
    	}));
        
        $("#germanSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("de");
        	that.languageDialog.close();
    	}));
        
        $("#norwegianSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("nb");
        	that.languageDialog.close();
    	}));
        
        $("#swedishSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("sv");
        	that.languageDialog.close();
    	}));
        
        $("#russianSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("ru");
        	that.languageDialog.close();
    	}));
    });
    
    $("#showGamesViewContent li").each(function(index, item) {
        $(item).tazClick(_.once(function() {
            taz.game.selectGame(that.viewData.games[index]);
        }));
    });
    
    $("#backToServersList").tazClick(_.once(function() {        
        taz.viewManager.changeView("showServersView");
    }));
    
    if(taz.settings.masterServerUrl != '') {
	    $("#adminSelect").bind("tap", function() {
	    	taz.InitializingState.prototype.checkAdminPasscodeAndContinue_(function() {
	    		taz.viewManager.changeView('adminView', null);
	    	})
	    });
    }
};

taz.ShowGamesView.prototype.setGames = function(data) {
    this.viewData.games = data.games;
    this.initUiAndBindButtons_();
};


/**
 * @class Shows a task.
 */
taz.TaskView = function() {

};

taz.inherits(taz.TaskView, taz.GameBaseView);

/**
 * Singleton instance.
 * 
 * @type taz.TaskView
 */
taz.taskView = new taz.TaskView();

/**
 * @private
 * @type {TaskDTO}
 */
taz.TaskView.prototype.task_ = null;

/**
 * @private
 * @type {TaskAnswerDTO}
 */
taz.TaskView.prototype.answer_ = null;

/**
 * @private
 */
taz.TaskView.prototype.taskShowBegin_ = null;

/**
 * @private
 */
taz.TaskView.prototype.timerTick_ = null;

/**
 * @private
 * @type Object.<String, taz.NumberPie>
 */
taz.TaskView.prototype.indicators_ = null;

/**
 * @private
 */
taz.TaskView.prototype.points_ = null;

/**
 * @param {{task:TaskDTO, answer:TaskAnswerDTO, taskShowBegin:Number}} taskData
 */
taz.TaskView.prototype.onCreate = function(taskData) {
    // Call parent class implementation.
    taz.GameBaseView.prototype.onCreate.call(this, 'taskView', taskData);
    
    this.task_ = taskData.task;
    this.answer_ = taskData.answer;
    this.taskShowBegin_ = taskData.taskShowBegin;

    this.initUi_();
};

/**
 * @private
 */
taz.TaskView.prototype.initUi_ = function() {
    var task = this.task_;
    var answerData = this.answer_;
    var taskData = taz.task.createDataForTemplate(task, answerData);
    
    // Insert the content HTML.
    this.initContentUi(taskData);
    
    // Initialize the view.
    this.indicators_ = taz.task.initialize(task);

    if (task.timeLimit > 0 && this.timerTick_ == null) {
        this.timerTick_ = setInterval(_.bind(this.onTimeTick_, this), 200);
        this.onTimeTick_();
    }

    this.bindButtonHandlers_();
    this.bindAnswerUpdateHandlers_();
};

/**
 * @private
 */
taz.TaskView.prototype.onTimeTick_ = function() {
    // Get current time.
    var now = new Date().getTime();
    var timeElapsed = now - this.taskShowBegin_;
    var timeLeft = this.task_.timeLimit - timeElapsed;

    // Update time indicator.
    this.indicators_.timeIndicator.setValue(Math.round(timeLeft / 1000));

    if (this.task_.pointsDecreaseWithTime) {
        var relTime = Math.ceil((timeLeft / this.task_.timeLimit) * this.task_.numberOfPointDecreaseSteps);
        this.points_ = Math.round(relTime * this.task_.points / this.task_.numberOfPointDecreaseSteps);
        this.indicators_.pointIndicator.setValue(this.points_);
    } else {
        this.indicators_.pointIndicator.setValue(this.task_.points);
    }

    if (timeLeft <= 0) {
        this.stopTimerTick_();
        taz.sounds.play(taz.Sounds.Type.WRONG_ANSWER);

        taz.dialogs.okDialog(taz.strings.task_time_expired, _.bind(function() {
            // When the time ends force submit button click.
            this.onSubmitButtonClick_();
        }, this));
    }
};

/**
 * @private
 */
taz.TaskView.prototype.bindButtonHandlers_ = function() {
    // Submit button can only be clicked once between onCreate and onDestroy.
    $('#submitButton').tazClick(_.once(_.bind(this.onSubmitButtonClick_, this)));
    $('#giveUpButton').tazClick(_.bind(this.onGiveUpButtonClick_, this));
};

/**
 * @private
 */
taz.TaskView.prototype.onSubmitButtonClick_ = function() {
    this.stopTimerTick_();
    this.answer_ = this.extractAnswers_();
    taz.game.answerTask(this.answer_);
};

/**
 * @private
 * @return {TaskAnswerDTO}
 */
taz.TaskView.prototype.extractAnswers_ = function() {
    var task = this.task_;

    var now = new Date().getTime();
    var answerTime = now - this.taskShowBegin_;
    var maximumPoints = task.points;
    
    if (task.timeLimit > 0) {
        answerTime = Math.min(answerTime, task.timeLimit);

        if (task.pointsDecreaseWithTime) {
            maximumPoints = Math.max(this.points_, 0);
        }
    }

    // This variable must have the same structure as TaskAnswerDTO.
    var answers = {
        elementAnswers : [],
        answerTime : answerTime,
        maximumPoints : maximumPoints
    };

    // Extract answer from each element that can have an answer.
    for (var i = 0; i < task.elements.length; ++i) {
        var element = task.elements[i];
        var answer = taz.taskelements.extractAnswer(element, $(document));
        
        if (answer != null) {        
            answers.elementAnswers.push(answer);
        }
    };
        
    return answers;
};

/**
 * @private
 */
taz.TaskView.prototype.onGiveUpButtonClick_ = function() {
    taz.dialogs.okCancelDialog(taz.strings.give_up_dialog, function() {
        taz.game.giveUpTask();
    });
};

/**
 * @private
 */
taz.TaskView.prototype.bindAnswerUpdateHandlers_ = function() {    
    var handler = _.bind(this.onAnswerChanged_, this);

    /**
     * HACK explanation:
     * 
     * Android ICS 4.0.4 causes problems with touch events to radio- and checkbox elements. 
     * This hack works around the problem by removing all jQuery Mobile logic from the input elements 
     * and by implementing the same functionality in a better way (so that the view is always based on the model 
     * whereas in jQuery Mobile the model and view were separate). Also the buttons react to "tap" event instead of 
     * click/mousedown to (a) reduce input lag and (b) prevent accidental pressed to nearby elements.
     * 
     * NOTE: This hack uses hard coded information about jQuery Mobiles inner structures and may break if JQM is updated.
     */
    
    // Remove all handlers of all events in all descendants of #taskElements to ensure no JQM logic will be executed.
    $('#taskElements').find('.checkbox-items').find('*').unbind();
    $('#taskElements').find('.radio-items').find('*').unbind();
    
    $('#taskElements textarea').bind('blur', handler);
    $('#taskElements input[type="number"]').bind('blur', handler);
    $('#taskElements img[id^="answer_"]').bind('load', handler);
    
    $('#taskElements input[type="checkbox"]').change(function() {
    	// Bind answer extraction to actual change event (not just to click)
    	handler();
    	
    	// Find the span that is used as the "visual" checkbox element (the actual one is hidden).
    	// It always has class "ui-icon" and is located in a container that is a sibling to the actual input element.
    	var checkboxSpan = $(this).siblings().find('span.ui-icon');
    	
    	// Also tightly bind visual state to the state of the actual input element. 
    	if ($(this).is(":checked")) {
    		//The magic number is the offset in icons-36-xxx.png file to find the correct icon
    		var iconSheetOffset = "-648px";
    		$(checkboxSpan).css("background-position-x", iconSheetOffset);
    		$(checkboxSpan).css("background-color", "#4596ce");
    	}
    	else {
    		var iconSheetOffset = "-684px";
    		$(checkboxSpan).css("background-position-x", iconSheetOffset);
    		$(checkboxSpan).css("background-color", "transparent");
    	}
    });

    $('#taskElements input[type="radio"]').change(function() {
    	// Same idea as in checkbox change handler
    	handler();
    	
    	var disableSelectState = function(element) {
    		var span = $(element).siblings().find('span.ui-icon');
    		//The magic number is the offset in icons-36-xxx.png file to find the correct icon
    		var iconSheetOffset = "-756px";
    		$(span).css("background-position-x", iconSheetOffset);
    		$(span).css("background-color", "transparent");    		
    	}
    	
    	$('#taskElements input[name="' + $(this).attr("name") + '"]').each(function() {
    		disableSelectState(this);
    	});
    	
    	var radioSpan = $(this).siblings().find('span.ui-icon');
    	
    	if ($(this).is(":checked")) {
    		var iconSheetOffset = "-720px";
    		$(radioSpan).css("background-position-x", iconSheetOffset);
    		$(radioSpan).css("background-color", "#4596ce");
    	}
    	else {
    		var iconSheetOffset = "-756px";
    		$(radioSpan).css("background-position-x", iconSheetOffset);
    		$(radioSpan).css("background-color", "transparent");
    	}    	
    });
};

/**
 * @private
 */
taz.TaskView.prototype.onAnswerChanged_ = function() {
    this.answer_ = this.extractAnswers_();
    taz.game.answerChanged(this.answer_);
};

/**
 * @private
 */
taz.TaskView.prototype.stopTimerTick_ = function() {
    if (this.timerTick_ != null) {
        clearInterval(this.timerTick_);
        this.timerTick_ = null;
    }
};

taz.TaskView.prototype.onDestroy = function(data) {
    // Call parent class implementation.
    taz.GameBaseView.prototype.onDestroy.call(this, data);
    this.stopTimerTick_();

    taz.task.destroy(this.task_);

    this.indicators_ = null;
    this.points_ = null;
};



/**
 * @class Superclass for application Views
 */
taz.View = function() {
	
};

/**
 * @protected
 * @type String
 */
taz.View.prototype.id = null;

/**
 * @protected
 * @type Object
 */
taz.View.prototype.viewData = null;

/**
 * @protected
 * @type Object
 */
taz.View.prototype.userData = null;

/**
 * This is called when the view is shown.
 * 
 * @param {String} id Identifier of the view. There must exist a jQuery mobile page in index.html
 *                 that has this id. There also must exist a View by this name in the taz namespace.
 *                 If the id is for example 'someId' there must exist an object taz.someId that 
 *                 extends taz.View.
 *                 
 * @param {Object} viewData View data passed to this view by the taz.ViewManger#changeView method.
 */
taz.View.prototype.onCreate = function(id, viewData) {
	this.id = id;
	this.viewData = viewData;
	this.userData = {};
};

/**
 * Helper function that populates the jQuery mobile page using Handlebars templates.
 *
 * @param {Object} contentData Data that is passed to the Handlebars template of this
 *                 view. There must exist a Handlebars template for this view in the
 *                 templates folder.
 *                 
 * @param {Object} headerData Data that is passed to the Handlebars header template.
 */
taz.View.prototype.initUi = function(contentData, headerData, showBackButton, useOldPageContent) {
	if (contentData == null || contentData == undefined) {
		contentData = {};
	}

	useOldPageContent = useOldPageContent || false;
	
    // Menu button overlay is displayd only for iOS & ripple
    if (!(taz.isDeviceiPhone() || taz.isUsingRipple())) {
        showBackButton = false;
    }
    
	var menuButtonHtml = '';
	if (showBackButton) {
		var menuButtonTemplate = taz.getTemplate("menubuttonoverlay");
		menuButtonHtml = menuButtonTemplate();
	}

	var headerHtml = null;
	if (!(headerData == null || headerData == undefined)) {
		var headerTemplate = taz.getTemplate("gameheader");
		headerData.strings = taz.strings;
		headerData.noLogo = showBackButton;
		headerHtml = headerTemplate(headerData);
	}
	
	// Fetch the template of this view.
	var template = taz.getTemplate(this.id);
	
	// Create html from the template using the data.
    contentData.strings = taz.strings;
	var html = useOldPageContent ? '' : template(contentData);
	delete contentData.strings;
	
	if (headerHtml) {
		html = headerHtml + html;
	}
	
	if (!useOldPageContent) {
	    $('#' + this.id + '[data-role="page"]').html(html + menuButtonHtml).trigger('create');
	    
	    $('#' + this.id + '[data-role="page"]').find('.menu-button-overlay').click(function() {
	        taz.main.showBackDialog();
	    });	    
	}
	else {
	    $('#' + this.id + '[data-role="page"]').find('#game-header').html($(html).html()).trigger('create');
	}
};

/**
 * This is called when the view is hidden.
 */
taz.View.prototype.onDestroy = function(data) {
	taz.viewManager.setHistoryData(this.id, this.viewData);
};

taz.View.prototype.shouldCleanDom = function() {
    return true;
};

/**
 * @class View that shows a list of servers and lets the user select one
 */
taz.ShowServersView = function() {

};

taz.inherits(taz.ShowServersView, taz.View);

/**
 * Singleton instance.
 * 
 * @type taz.ShowServersView
 */
taz.showServersView = new taz.ShowServersView();

/**
 * @param {GameServerListDTO} data
 */
taz.ShowServersView.prototype.onCreate = function(data) {
    // Call parent class implementation.
    taz.View.prototype.onCreate.call(this, 'showServersView', data);
    
    // Register handlebars helper
    Handlebars.registerHelper('getServerIcon', function(versionInfo, passcode) {
        if (taz.versionutils.isCompatibleVersion(versionInfo, false)) {
            if (passcode) {
                return "images/server_lock.png";
            }
            else {
                return "images/server_green.png";
            }
        }
        return "images/server_red.png";
    });    
    
    // If no servers are given, fetch them first to prevent an empty view.
    // This violates the architecture slightly but was a real easy solution.
    data ? this.initUiAndBindButtons_() : taz.game.getServerList(_.bind(function(list) {
        this.viewData = data = list;
        this.initUiAndBindButtons_();
    }, this));
};

/**
 * @private
 */
taz.ShowServersView.prototype.initUiAndBindButtons_ = function() {
    this.initUi(this.viewData);
    var that = this;
    
    var languageDialog;
    
    $("#openLanguageMenu").bind("tap", function() {
    	that.languageDialog = taz.dialogs.languageDialog();
    	that.languageDialog.show();
    	
    	$("#finnishSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("fi");
        	that.languageDialog.close();
    	}));
        
        $("#englishSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("en");
        	that.languageDialog.close();
    	}));
        
        $("#chineseSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("zh");
        	that.languageDialog.close();
    	}));
        
        $("#arabicSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("ar");
        	that.languageDialog.close();
    	}));
        
        $("#danishSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("da");
        	that.languageDialog.close();
    	}));
        
        $("#frenchSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("fr");
        	that.languageDialog.close();
    	}));
        
        $("#germanSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("de");
        	that.languageDialog.close();
    	}));
        
        $("#norwegianSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("nb");
        	that.languageDialog.close();
    	}));
        
        $("#swedishSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("sv");
        	that.languageDialog.close();
    	}));
        
        $("#russianSelect").tazClick(_.once(function() {
        	taz.game.setLanguage("ru");
        	that.languageDialog.close();
    	}));
    });    
    
    $("#showServersViewContent li").each(function(index, item) {
        $(item).tazClick(function() {
            taz.game.selectServer(that.viewData.servers[index]);
        });
    });
    
    if(taz.settings.masterServerUrl != '') {
	    $("#adminSelect").bind("tap", function() {
	    	taz.InitializingState.prototype.checkAdminPasscodeAndContinue_(function() {
	    		taz.viewManager.changeView('adminView', null);
	    	})
	    });
    }
};

taz.ShowServersView.prototype.setServers = function(data) {
    this.viewData = data;
    this.initUiAndBindButtons_();
};



/**
 * @class Shows a task answer check view with given and correct answers
 */
taz.CheckTaskAnswersView = function() {

};

taz.inherits(taz.CheckTaskAnswersView, taz.GameBaseView);

/**
 * Singleton instance.
 * 
 * @type taz.CheckTaskAnswersView
 */
taz.checkTaskAnswersView = new taz.CheckTaskAnswersView();

/**
 * @private
 */
taz.CheckTaskAnswersView.prototype.fieldCheckData_ = null;

/**
 *
 */
taz.CheckTaskAnswersView.prototype.onCreate = function(fieldCheckData) {	
    for(var i in fieldCheckData.answers) {
        var answer = fieldCheckData.answers[i];
        answer.strings = taz.strings;
		
        if (answer.type == 'PHOTO_ANSWER') {
            answer.isPicture = true;
        }
    }
	
    // Call parent class implementation.
    taz.GameBaseView.prototype.onCreate.call(this, 'checkTaskAnswersView', fieldCheckData);
    this.initContentUi(fieldCheckData);
    this.fieldCheckData_ = fieldCheckData;
	
    $('#password-protected-elements').css("visibility","hidden");
	
    $('#go-back-button').mousedown(function() {
    	taz.gameTimer.resume();
    });
    
	// Define a validator for the password
	var passwordValidator = new taz.input.PasswordValidator(fieldCheckData.password);
	taz.input.setInputValidator("#password-input", passwordValidator, function(valid) {
		if (valid) {
			$('#show-content-button').removeClass('ui-disabled');
		}
		else {
			$('#show-content-button').addClass('ui-disabled');
		}
	});
	
    $('#show-content-button').tazClick(_.once(function() {
        $('#check-password-screen').remove();
        $('#password-protected-elements').css("visibility", "visible");
    }));
    
    var validator = new taz.input.RangeValidator(0, fieldCheckData.maximumPoints);
	taz.input.setInputValidator("#points-input", validator, function(valid) {
		if (valid) {
			$('#submit-points-button').removeClass('ui-disabled');
		}
		else {
			$('#submit-points-button').addClass('ui-disabled');
		}
	});
	
    $('#submit-points-button').tazClick(_.once(function() {
        var points = Number($('#points-input').val()).toFixed(0);
        taz.game.taskAnswersChecked(points);
    }));

};


/**
 * @class Shows the team that she/he is in the queue for task.
 */
taz.QueueView = function() {

};

taz.inherits(taz.QueueView, taz.GameBaseView);

/**
 * Singleton instance.
 * 
 * @type taz.QueueView
 */
taz.queueView = new taz.QueueView();

/**
 * @param {onCheckPointState} onCheckPointState
 */
taz.QueueView.prototype.onCreate = function(onCheckPointState) {
    // Call parent class implementation.
    taz.GameBaseView.prototype.onCreate.call(this, 'queueView', onCheckPointState);

    var checkPointFullText = taz.strings.checkpoint_full;

    this.initContentUi({});

    var state = onCheckPointState;
    var imageUrl = ['images/wait_for_turn.png'];
    taz.imageutils.load(imageUrl, function(images) {
            var el = images[0];
            $('#wait-for-turn-image-container').html(el);
            var margin = $('#queueViewContent').outerHeight(true) - $('#queueViewContent').height();
            var height = window.innerHeight - $('#game-header').height() - margin - 40;
            $(el).height(height);
            var imgLeft = (window.innerWidth - $(el).outerWidth()) / 2;
            $(el).offset({left: imgLeft, top: $(el).offset().top});	
            
            var bubbleVCenter = 80;
            var text = $('#check-point-full-text');
            text.html(taz.strings.checkpoint_full);
            var origHeight = 540;
            var textTop = $(el).offset().top + bubbleVCenter * ($(el).height() / origHeight) - text.outerHeight(true) / 2;
            var textLeft = (window.innerWidth - text.outerWidth(true)) / 2;
            text.offset({left: textLeft, top: textTop});
    });
    var that = this;
    $('#giveToAdmin').tazClick(function(){
            that.giveToAdmin_(state);
        }
    );
    $('#giveUpButton').tazClick(function() {
        taz.dialogs.okCancelDialog(taz.strings.give_up_dialog, 
            function() {
                state.giveUpTask();
            }
        );
    });
};


taz.QueueView.prototype.giveToAdmin_ = function(state) {
    var currentState = state;
    var dialog = taz.dialogs.passwordDialog(taz.strings.superpasswd, function(password){
        var pw = currentState.getModel().getGame().template.fieldCheckPassword;
        if(pw == password) {
            currentState.showTask();
        } else {
            taz.dialogs.okDialog(taz.strings.wrong_password, null);
        }
    });    
    dialog.close();
}

/**
 * @private
 */
taz.QueueView.prototype.calculateTeamsBefore_ = function(checkPointStatus) {
	var teamId = taz.game.getModel().getTeamId();
	
	for (var i = 0; i < checkPointStatus.currentTeams.length; ++i) {
		if (checkPointStatus.currentTeams[i].teamId == teamId) {
			return (i - checkPointStatus.maxTeams);
		}
	}
	
	//Should not happen
	return undefined;
};

taz.QueueView.prototype.onDestroy = function(data) {
	// Call parent class implementation.
	taz.GameBaseView.prototype.onDestroy.call(this, data);
};


/**
 * @class Superclass for game views. All game views have a common header. This
 *        class takes care of updating it.
 */
taz.GameBaseView = function() {
	
};

taz.inherits(taz.GameBaseView, taz.View);

/**
 * @private
 * @type Function
 */
taz.GameBaseView.prototype.updateCb_ = null;

taz.GameBaseView.prototype.messageCb_ = null;

taz.GameBaseView.HEADER_BUTTON_NAMES = {
    MESSAGE: '#messaging-icon-container',
    ON_DEMAND_TASK : '#on-demand-task-icon-container',
    MAP_VIEW : '#switch-to-map-icon-container',
    GUIDE_VIEW : '#switch-to-guide-icon-container',
    SCAN_QR_CODE : '#scan-qr-code-icon-container'
};

taz.GameBaseView.prototype.onCreate = function(id, data) {
	// Call parent implementation.
	taz.View.prototype.onCreate.call(this, id, data);
	
	var hideRanking = taz.game.isHideRanking();
	var hideScores = taz.game.isHideScores();
	var hideDistance = taz.game.isHideDistance();
	
	// Function that listens to the gameTimer tick updates.
	this.updateCb_ = function() {
	    var points = taz.game.getCurrentPoints() ? taz.game.getCurrentPoints() : 0;
	    // TODO some default string or maybe hide position? The ranking string is null in offlined mode.
	    var ranking = taz.game.getRankingString() && !hideRanking ? taz.game.getRankingString() : '-/-';
        var traveled = taz.game.getTraveledString() ? taz.game.getTraveledString() + " m" : '0 m';
	    
        if(hideScores) {
        	$('.team-points-text-' + id).html('-');
        } else {
        	$('.team-points-text-' + id).html(points);
        }
		$('.team-position-text-' + id).html(ranking);
		if(hideDistance) {
			$('.team-traveled-text-' + id).html('-');
		} else {
			$('.team-traveled-text-' + id).html(traveled);
		}
		$('.team-time-text-' + id).html(taz.gameTimer.getTimeString());
	};
	
	taz.gameTimer.addTickListener(this.updateCb_);
	
	// Function that listens to new incoming messages
	var that = this;
	this.messageCb_ = function(messages) {
		if (messages.length == 0) {
			return;
		}
		
		var newestIncomingIndex = -1;
		for(var i = messages.length - 1; i >= 0; --i) {
			if (messages[i].sender == 'GAME_MASTER') {
				newestIncomingIndex = i;
				break;
			}
		}
		
		if (newestIncomingIndex == -1) {
			return;
		}
		
		var latestMessageText = messages[newestIncomingIndex].content;
		var isNew = messages[newestIncomingIndex].newMessageTeam;
		
		if (newestIncomingIndex == messages.length - 1) {
			if (isNew) {
				taz.sounds.play(taz.Sounds.Type.MESSAGE_ARRIVED);
				messages[newestIncomingIndex].newMessageTeam = false;
			}

			console.log("INFO(Messaging): update rolling text to: " + latestMessageText);
			$("#header-text-span").text(latestMessageText);
			$("#header-message-text").stop(true, true);
			
			var animate = function() {
				var width = $("#header-text-span").outerWidth();
				$("#header-message-text").css('text-indent', $("#header-message-text").innerWidth());
				$("#header-message-text").css('padding-left', -width);
				$("#header-message-text").css('padding-right', -width);
				
				var pixelsPerSec = 100;
				var totalLength = $("#header-message-text").innerWidth() + width;
				var totalTime = totalLength / pixelsPerSec * 1000;
				
				$("#header-message-text").animate({'text-indent': -width}, totalTime, 'linear', animate);
			}

			//animate();
		}
		else {
			$("#header-text-span").text('');
		}
		
		that.messages_ = messages; 
	};
	
	taz.game.addMessageListener(this.messageCb_);
};

taz.GameBaseView.prototype.initContentUi = function(data, useOldPageContent) {
	if (data == null || data == undefined) {
		data = {};
	}
	
    data.teamName = taz.game.getTeamName();
        
	var headerData = {
		name : taz.game.getTeamName(),
		score : taz.game.isHideScores() ? '-' : taz.game.getCurrentPoints(),
        traveled : taz.game.isHideDistance() ? '-' : taz.game.getTraveledString() + " m",
        position : taz.game.isHideRanking() ? '-/-' : taz.game.getRankingString(),
		time : taz.gameTimer.getTimeString(),
		viewId : this.id, 
		isOnline : taz.game.isOnline(),
		onDemandTaskAvailable: taz.game.isOnDemandTaskAvailable(),
		showGuideViewIcon: data && data.showGuideViewIcon === true,
		showMapViewIcon: data && data.showMapViewIcon === true,
		showScanQrCodeIcon: data && data.showScanQrCodeIcon === true
	};

	
	this.initUi(data, headerData, true, useOldPageContent);
	
	var that = this;
	$("#messaging-icon-container").click(function() {
		taz.game.showMessagingOverlay();
	});
	
	$('#on-demand-task-icon-container').click(function() {
	    taz.game.showOnDemandTask();
	});
	
	$('#switch-to-map-icon-container').click(function() {
	    taz.game.showMapView();
	});
	
	$('#switch-to-guide-icon-container').click(function() {
	    taz.game.switchToGuideView();
	});
	
    $('#scan-qr-code-icon-container').tazClick(function() {
        if (!taz.isUsingRipple() && window.plugins && window.plugins.barcodeScanner) {
            window.plugins.barcodeScanner.scan(function(result) {
                var code = result.text;
                taz.game.qrCodeScanned(code);
            });
        }
        else {
            console.error('ERROR: Cannot scan QR code with this device');
        }
    });	
	
	// Set the latest message if messages are available
	var messages = taz.game.getMessages();
	
	if (messages.length > 0) {
		this.messageCb_(messages);
	}
};

taz.GameBaseView.prototype.setHeaderButtonEnabled = function(button, enabled) {    
    if (button) {
        $(button)[enabled ? 'show' : 'hide']();
    }
};

taz.GameBaseView.prototype.onDestroy = function(data) {
	// Call parent implementation.
	taz.View.prototype.onDestroy.call(this, data);
	// Stop listening to timer ticks.
	taz.gameTimer.removeTickListener(this.updateCb_);
	// Stop listening to message updates
	taz.game.removeMessageListener(this.messageCb_);
};


/**
 * @class Compass view that guides to a given area.
 */
taz.MapView = function() {

};

taz.inherits(taz.MapView, taz.GameBaseView);

taz.mapView = new taz.MapView();

/**
 * @private
 * @type {taz.GeoPosition}
 */
taz.MapView.prototype.position_ = null;

/**
 * @private
 * @type {Function}
 */
taz.MapView.prototype.positionCb_ = null;

taz.MapView.prototype.googleMap_ = null;

taz.MapView.prototype.teamPositionMarker_ = null;

taz.MapView.prototype.validCheckpoints_ = [];

taz.MapView.prototype.targetCheckpoint_ = null;

taz.MapView.prototype.gameZone_ = null;
taz.MapView.prototype.gameZonePoly_ = null;

taz.MapView.prototype.forbiddenZones_ = null;
taz.MapView.prototype.forbiddenZonePolys_ = null;

taz.MapView.prototype.checkpointMarkersById_ = {};
taz.MapView.prototype.checkpointRadiusCircles_ = [];

taz.MapView.prototype.pathToTarget_ = null;

taz.MapView.prototype.startZoom_ = null;

taz.MapView.prototype.zoomChangedListeners_ = [];

taz.MapView.prototype.popupScroller_ = null;

taz.MapView.prototype.otherTeamMarkers_ = null;

taz.MapView.prototype.otherTeamLabels_ = null;

taz.MapView.prototype.overlayView_ = null;

taz.MapView.prototype.hideOtherTeamsTimeout_ = null;

taz.MapView.prototype.zoomEventListener_ = null;

taz.MapView.prototype.boundsCheckListener_ = null;

/**
 * @param {taz.GeoPosition} position to guide to.
 */
taz.MapView.prototype.onCreate = function(mapData) {
    // Call parent class implementation.
    taz.GameBaseView.prototype.onCreate.call(this, 'mapView', mapData);
    
    mapData.showMapViewIcon = false;
    this.position_ = taz.navigation.currentPosition;
    this.positionCb_ = _.bind(this.onPositionChanged_, this);
    taz.game.addPositionListener(this.positionCb_);
    
    this.validCheckpoints_ = mapData.validCheckpoints;
    this.targetCheckpoint_ = mapData.targetCheckpoint;
    this.gameZone_ = mapData.gameZone;
    this.forbiddenZones_ = mapData.forbiddenZones;
    this.startZoom_ = mapData.startZoom !== null ? mapData.startZoom : null;   
    
    // Generate and insert the content HTML.
    this.initContentUi(mapData, this.googleMap_ != null);
    
    this.initGoogleMap_();
    this.popupScroller_ = new iScroll('checkpoint-popup-container');
};

/**
 * 
 */
taz.MapView.prototype.addZoomChangedListener = function(listener) {
    this.zoomChangedListeners_.push(listener);
};

/*
 * 
 */
taz.MapView.prototype.removeZoomChangedListener = function(listener) {
    for (var i = this.zoomChangedListeners_.length - 1; i >= 0; --i) {
        if (this.zoomChangedListeners_[i] === listener) {
            this.zoomChangedListeners_.splice(i, 1);
        }
    }
};

/**
 * Called when team exits the game area.
 */
taz.MapView.prototype.teamOutsideGameArea = function(goalPosition) {
    
};

/**
 * Called when team enters a forbidden zone.
 */
taz.MapView.prototype.teamInForbiddenZone = function(goalPosition) {
    
};

/**
 * Called when the team is in allowed area (not outside game area and 
 * not in forbidden zone).
 */
taz.MapView.prototype.teamInAllowedArea = function(goalPosition, message) {
    
};

/**
 * Called when the position changes.
 * 
 * @param {taz.GeoPosition} The new position.
 * 
 * @private
 */
taz.MapView.prototype.onPositionChanged_ = function(position, accuracy) {
    if (this.teamPositionMarker_) {
        this.position_ = position;
        var position = new google.maps.LatLng(this.position_.latitude, this.position_.longitude);
        
        this.teamPositionMarker_.setPosition(position);
    }
    
    if (this.pathToTarget_) {
        var path = this.getPathToTargetPoints_();
        this.pathToTarget_.setPath(path[0], path[1]);
    }
};

taz.MapView.prototype.onDestroy = function(data) {
    // Call parent class implementation.
    taz.GameBaseView.prototype.onDestroy.call(this, data);
    
    taz.navigation.removePositionListener(this.positionCb_);
    taz.navigation.removeHeadingListener(this.headingCb_);
    
    this.cleanGoogleMap_();
};

taz.MapView.prototype.initGoogleMap_ = function() {
    // Pre-resize the container to fit the canvas in.
    var mapContainer = document.getElementById('google-map-canvas');
    $(mapContainer).height($('#mapView').height() - $('#game-header').outerHeight(true));    
    var that = this;
    
    var model = taz.game.getModel();
    var position = new google.maps.LatLng(this.position_.latitude, this.position_.longitude);
    var styles = [{featureType: "all", stylers: [{visibility: "off"}]}];
    var gamemodel = model.getGame();
    
    if (gamemodel.template.customMapId == null) {
        // If no custom map is specified, enable normal google map.
        // (Only disable the pois and their popups etc)
        styles = [{
            featureType:"poi",
            elementType:"labels",
            stylers:[{
                visibility:"off"
            }]
        }];
    }
    
    var mapOptions = {
        zoom : this.startZoom_ || 16,
        mapTypeId : google.maps.MapTypeId.ROADMAP,
        center : position,
        disableDefaultUI: true,
        styles: styles
    };
    
    if (!this.googleMap_) {
        this.googleMap_ = new google.maps.Map(mapContainer, mapOptions);
    }
    else {
        mapOptions.minZoom = null;
        mapOptions.maxZoom = null;
        
        google.maps.event.trigger(this.googleMap_, "resize");
        this.googleMap_.setOptions(mapOptions);
    }
    
    var map = this.googleMap_;
    var serverUrl = taz.game.getBackend().getActiveGameServerUrl();
    var offlinePath = model.getCustomMapBasePath() || null;
    var offlineLevels = model.getCustomMapOfflineLevels() || null;
    var customMap = model.getCustomMap() || null;
    
    if (customMap) {
        var zoomOptions = {
            minZoom: offlineLevels ? offlineLevels[0] : customMap.minZoomLevel, 
            maxZoom: offlineLevels ? offlineLevels[offlineLevels.length-1] : customMap.maxZoomLevel, 
            zoom: offlineLevels ? offlineLevels[0] : customMap.nativeZoomLevel 
        };
        
        var sz = this.startZoom_;
        var zo = zoomOptions;
        if (sz && sz >= zo.minZoom && sz <= zo.maxZoom) {
            zoomOptions.zoom = this.startZoom_;
        }
        
        map.setOptions(zoomOptions);
        
        this.overlayView_ = new taz.CustomMapTileOverlay(serverUrl, offlinePath, offlineLevels, map, customMap);
    }
    
    this.initOwnPosition_();
    this.initGameZone_();
    this.initForbiddenZones_();
    this.initCheckpoints_();
    this.initPathToTarget_();
    this.initBoundsCheck_();
    this.initMapControls_();
    this.initEventListeners_();
    this.disableViewOnGoogleMapsLink_();
};

taz.MapView.prototype.cleanGoogleMap_ = function() {
    if (this.pathToTarget_) {
        this.pathToTarget_.setMap(null);
        this.pathToTarget_ = null;
    }
    
    if (this.overlayView_) {
        this.overlayView_.remove();
        this.overlayView_ = null;
    }
    
    if (this.teamPositionMarker_) {
        this.teamPositionMarker_.setMap(null);
        this.teamPositionMarker_ = null;
    }
    
    for(var i in this.checkpointMarkersById_) {
        this.checkpointMarkersById_[i].setMap(null);
    }
    this.checkpointMarkersById_ = {};
    
    _.each(this.forbiddenZonePolys_, function(zone) {
        zone.setMap(null);
    });
    this.forbiddenZonePolys_ = [];
    
    if (this.gameZonePoly_) {
        this.gameZonePoly_.setMap(null);
        this.gameZonePoly_ = null;
    }
    
    if (this.hideOtherTeamsTimeout_) {
        clearTimeout(this.hideOtherTeamsTimeout_);
        this.hideOtherTeamsTimeout_ = null;
        this.hideOtherTeamMarkers_();
        $('#show-other-teams-btn').removeClass('disabled');
    }
    
    _.each(this.checkpointRadiusCircles_, function(circle) {
        circle.setMap(null);
    });
    this.checkpointRadiusCircles_ = [];
    
    google.maps.event.removeListener(this.zoomEventListener_);
    this.zoomEventListener_ = null;
    this.zoomChangedListeners_ = [];
    
    google.maps.event.removeListener(this.boundsCheckListener_);
    this.boundsCheckListener_ = null;
    
    $('#map-controls-container').find('.map-control-btn').off();
};

taz.MapView.prototype.initOwnPosition_ = function() {
    var position = new google.maps.LatLng(this.position_.latitude, this.position_.longitude);
    
    this.teamPositionMarker_ = new google.maps.Marker({
        position: position,
        map: this.googleMap_,
        optimized: false, // Fixes duplication bugs in Android (surprise) 4.1.1.
        icon: 'images/team.png'
    });
};

taz.MapView.prototype.initGameZone_ = function() {
    var gz = this.gameZone_;
    var corners = [];
    
    for(var i = 0; i < gz.corners.length; ++i) {
        var corner = gz.corners[i];
        corners.push(new google.maps.LatLng(corner.latitude, corner.longitude));
    }
    
    var poly = new google.maps.Polygon({
        paths: corners,
        strokeColor: "#000000",
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillOpacity: 0
    });
    
    poly.setMap(this.googleMap_);
    
    this.gameZonePoly_ = poly;
};

taz.MapView.prototype.initForbiddenZones_ = function() {
    if (!this.forbiddenZones_ || this.forbiddenZones_.length == 0) {
        return;
    }
    
    this.forbiddenZonePolys_ = [];
    for(var i = 0; i < this.forbiddenZones_.length; ++i) {
        var fz = this.forbiddenZones_[i];
        var corners = [];
        
        for(var i = 0; i < fz.corners.length; ++i) {
            var corner = fz.corners[i];
            corners.push(new google.maps.LatLng(corner.latitude, corner.longitude));
        }
        
        var poly = new google.maps.Polygon({
            paths: corners,
            strokeColor: "#FF0000",
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: "#FF0000",
            fillOpacity: 0.2
        });
        
        poly.setMap(this.googleMap_);    
        this.forbiddenZonePolys_.push(poly);
    }     
}

taz.MapView.prototype.initCheckpoints_ = function() {  
    var that = this;
    var createMarker = _.bind(function(checkpoint, target) {
        if (!checkpoint) return;
        
        var icon = null;
        if (!checkpoint.icon) {
            icon = target ? 'images/checkpoint_target.png' : 'images/checkpoint.png';
            if (!target && !checkpoint.useGps) {
            	if(checkpoint.qrCode) {
            		icon = 'images/checkpoint_qr.png';
            	} else {
            		icon = 'images/checkpoint_floating.png';
            	}
            }
        }
        else {
            icon = checkpoint.icon.rawData;
        }
        
        var position = checkpoint.position;
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(position.latitude, position.longitude), 
            map: this.googleMap_,
            icon: icon
        });
        
        marker.set("id", checkpoint.id);
        this.checkpointMarkersById_[checkpoint.id] = marker;
        
        // Inner function scope to detach reference var scope from the loop vars.
        // Wonderful.
        (function(m, cp) {
            m.addListener('click', function() {
                that.checkPointClicked_(cp);
            });
        })(marker, checkpoint);
    }, this);
    
    var createRadiusCircle = _.bind(function(checkpoint) {
        if (!checkpoint || !checkpoint.useGps) return;
        
        var circle = new google.maps.Circle({
            clickable: false,
            fillColor: '#94ff94',
            fillOpacity: 0.5,
            strokeWeight: 2,
            strokeColor: '#065e00',
            map: this.googleMap_,
            radius: checkpoint.radius,
            center: this.positionToLatLng_(checkpoint.position)
        });
        
        this.checkpointRadiusCircles_.push(circle);
    }, this);
    
    for(var i = 0; i < this.validCheckpoints_.length; ++i) {
       if (this.validCheckpoints_[i] !== this.targetCheckpoint_) {
           createMarker(this.validCheckpoints_[i], false);
       }
    }
    
    createMarker(this.targetCheckpoint_, true);
    createRadiusCircle(this.targetCheckpoint_);
};

taz.MapView.prototype.initPathToTarget_ = function() {
    if (this.targetCheckpoint_) {
        var path = this.getPathToTargetPoints_();
        this.pathToTarget_ = new taz.PathOverlay(this.googleMap_, path[0], path[1]);        
    }
};

taz.MapView.prototype.getPathToTargetPoints_ = function() {
    var cp = this.targetCheckpoint_;
    
    return [
        new google.maps.LatLng(this.position_.latitude, this.position_.longitude),
        new google.maps.LatLng(cp.position.latitude, cp.position.longitude)
    ];
};

taz.MapView.prototype.checkPointClicked_ = function(checkpoint) {
    var position = checkpoint.position;
    var that = this;
    
    this.googleMap_.panTo(new google.maps.LatLng(position.latitude, position.longitude));
    
    var distance = this.position_.distanceTo(
        new taz.GeoPosition(position.latitude, position.longitude)
    );
    
    if (checkpoint !== this.targetCheckpoint_) {
        var popup = $('#checkpoint-popup-container');
        var canvasHeight = $('#google-map-canvas').height();
        //var maxHeight = canvasHeight - canvasHeight * 0.15;
        
        popup.find('*').off();
        popup.addClass('visible');
        popup.find('#activate').hide();
        popup.find('#set-as-target').show();
        popup.find('#checkpoint-type-picture-container').hide();
        popup.find('#checkpoint-type-picture').attr('src', '');
        //popup.children('div').css('max-height', maxHeight);
        popup.find('#checkpoint-name').text(checkpoint.name);
        popup.find('#checkpoint-description').text(checkpoint.description || "");
        
        if (checkpoint.descriptionPicture && checkpoint.descriptionPicture.rawData) {
            popup.find('#checkpoint-description-picture-container').show();
            
            popup.find('#checkpoint-description-picture').load(function() {
                that.popupScroller_.refresh();
            });
            
            popup.find('#checkpoint-description-picture').attr('src', checkpoint.descriptionPicture.rawData);
        }
        else {
            popup.find('#checkpoint-description-picture-container').hide();
            popup.find('#checkpoint-description-picture').attr('src', '');
            this.popupScroller_.refresh();
        }
        
        if (!checkpoint.useGps) {
        	popup.find('#checkpoint-type-picture-container').show();
        	if(checkpoint.qrCode) {
        		popup.find('#checkpoint-type-picture').attr('src', 'images/qr.png');
        	} else {
        		popup.find('#checkpoint-type-picture').attr('src', 'images/noGPS.png');
        		popup.find('#set-as-target').hide();
        		popup.find('#activate').show();
        	}
        }
        
        var distanceStr = checkpoint.useGps ? Math.round(distance) + 'm' : '';
        popup.find('#checkpoint-distance').text(distanceStr);
        
        popup.find('#set-as-target').click(function() {
            popup.removeClass('visible');
            
            taz.game.selectCheckpointFromMap(checkpoint);
        });
        
        popup.find('#activate').click(function() {
            popup.removeClass('visible');
            
            taz.game.selectCheckpointFromMap(checkpoint);
        });
        
        popup.find('#cancel-set-as-target').click(function() {
            popup.removeClass('visible');
        });
    }
};

taz.MapView.prototype.initBoundsCheck_ = function() {
    var map = this.googleMap_;
    var allowedBounds =  this.getZoneBBOX_();
    
    function checkBounds() {    
        if(!allowedBounds.contains(map.getCenter())) {
          var C = map.getCenter();
          var X = C.lng();
          var Y = C.lat();

          var AmaxX = allowedBounds.getNorthEast().lng();
          var AmaxY = allowedBounds.getNorthEast().lat();
          var AminX = allowedBounds.getSouthWest().lng();
          var AminY = allowedBounds.getSouthWest().lat();

          if (X < AminX) {X = AminX;}
          if (X > AmaxX) {X = AmaxX;}
          if (Y < AminY) {Y = AminY;}
          if (Y > AmaxY) {Y = AmaxY;}

          map.setCenter(new google.maps.LatLng(Y,X));
        }
    }    
    
    this.boundsCheckListener_ = google.maps.event.addListener(map, 'center_changed', function() {checkBounds();});    
};

taz.MapView.prototype.initMapControls_ = function() {
    // Disable controls that are not needed in offline mode
    if (!taz.game.isOnline()) {
        $('#show-other-teams-btn').hide();
        
        // If a custom map overlay is used, then zooming will be disabled 
        // (as only 1 level is downloaded for offline)
        if (this.overlayView_ !== null) {
            $('.map-control-zoom-btn').hide();
        }
    }
    else if (!taz.game.getModel().getGame().template.enableShowTeams) {
        $('#show-other-teams-btn').hide();
    }
    
    var that = this;
    $('#goto-team-location-btn').tazClick(function() {
        var position = new google.maps.LatLng(that.position_.latitude, that.position_.longitude);
        that.googleMap_.panTo(position);
    });
    
    $('#zoom-in-btn').tazClick(function() {
        $('#google-map-canvas').trigger('mousewheel')
        that.googleMap_.setZoom(that.googleMap_.getZoom() + 1);
    });
    
    $('#zoom-out-btn').tazClick(function() {
        that.googleMap_.setZoom(that.googleMap_.getZoom() - 1);
    });

    $('#show-other-teams-btn').tazClick(function() {
        $('#show-other-teams-btn').addClass('disabled');
        
        var backend = taz.game.getBackend();
        var gameId = taz.game.getModel().getGame().id;
        
        backend.getTeamLocations(gameId, function(list) {
            that.flashOtherTeams_(list.positions, function() {
                $('#show-other-teams-btn').removeClass('disabled');
            });
        });
    });    
};

taz.MapView.prototype.initEventListeners_ = function() {
    var that = this;
    this.zoomEventListener_ = google.maps.event.addListener(this.googleMap_, 'zoom_changed', function() {
        var lis = that.zoomChangedListeners_.slice(0);
        
        for(var i = 0; i < lis.length; ++i) {
            lis[i](that.googleMap_.getZoom());
        }
    });
};

taz.MapView.prototype.flashOtherTeams_ = function(teams, disappearedCb) {
    var ownTeamId = taz.game.getModel().getTeamId();
    this.otherTeamMarkers_ = [];
    this.otherTeamLabels_ = [];
    
    var that = this;
    
    for(var i = 0; i < teams.length; ++i) {
        var t = teams[i];
        if (ownTeamId === t.teamId) {
            continue;
        }
        
        var position = new google.maps.LatLng(t.position.latitude, t.position.longitude);
        
        var marker = new google.maps.Marker({
            position: position,
            //animation: google.maps.Animation.DROP, // Has weird flicker
            map: this.googleMap_,
            optimized: false, // Fixes duplication bugs in Android (surprise) 4.1.1.
            icon: 'images/other_team.png'
        });
        
        this.otherTeamLabels_.push(new taz.LabelOverlay(this.googleMap_, {
            position: position,
            pixelOffset: {x: 0, y: -50},
            text: t.teamName
        }));
        this.otherTeamMarkers_.push(marker);
    }
    
    this.hideOtherTeamsTimeout_ = setTimeout(function() {
        that.hideOtherTeamMarkers_();
        disappearedCb();
    }, 8000);
};

taz.MapView.prototype.hideOtherTeamMarkers_ = function() {
    _.each(this.otherTeamMarkers_.concat(this.otherTeamLabels_), function(object) {
        object.setMap(null);
    });
    
    this.hideOtherTeamsTimeout_ = null;
    this.otherTeamMarkers_ = [];
    this.otherTeamLabels_ = [];
};

taz.MapView.prototype.getZoneBBOX_ = function() {
    var bbox = new google.maps.LatLngBounds();
    var corners = this.gameZone_.corners;
    
    for(var i = 0; i < corners.length; ++i) {
        bbox.extend(new google.maps.LatLng(
            corners[i].latitude, corners[i].longitude
        ));
    }
    
    return bbox;
};

taz.MapView.prototype.positionToLatLng_ = function(position) {
    return new google.maps.LatLng(position.latitude, position.longitude);
};

taz.MapView.prototype.disableViewOnGoogleMapsLink_ = function() {
    google.maps.event.addListenerOnce(this.googleMap_, 'idle', function(){
        var anchors = document.getElementsByTagName('a');
        
        for (var i = 0; i < anchors.length; i++) {
            var a = anchors[i];
            if (a.href.indexOf('google.com') !== -1) {
                 a.title = ''; 
                 a.onclick = function () {return false;};
            }
        }
        
        $('.gm-style-cc a').css('pointer-events', 'none');
    });    
};

taz.MapView.prototype.shouldCleanDom = function() {
    return false;
};

/**
 * @class Shows a description of a server.
 */
taz.ServerDescriptionView = function() {

};

taz.inherits(taz.ServerDescriptionView, taz.View);

taz.serverDescriptionView = new taz.ServerDescriptionView();

/**
 * @param {GameServerListDTO.ServerDescription} data
 */
taz.ServerDescriptionView.prototype.onCreate = function(data) {
    // Call parent class implementation.
    taz.View.prototype.onCreate.call(this, 'serverDescriptionView', data);
    
    // Generate and insert the content HTML.
    this.initUi(data);    

    $('#cancelServerButton').tazClick(_.once(function() {
        taz.viewManager.changeView("showServersView");
    }));
    
    $('#acceptServerButton').tazClick(function() {
        taz.game.acceptServerSelection(data);
    });
};

taz.ServerDescriptionView.prototype.onDestroy = function(data) {
    // Call parent class implementation.
    taz.View.prototype.onDestroy.call(this, data);
};



/**
 * @class View that lets the team decide which route to take.
 */
taz.ChooseRouteView = function() {

};

taz.inherits(taz.ChooseRouteView, taz.GameBaseView);

/**
 * Singleton instance.
 * 
 * @type taz.ChooseRouteView
 */
taz.chooseRouteView = new taz.ChooseRouteView();

/**
 * @param {{routingInstructions : Array.<String>, startingEdges : Array.<EdgeDTO>}} object
 */
taz.ChooseRouteView.prototype.onCreate = function(object) {
    // Call parent class implementation.
    taz.GameBaseView.prototype.onCreate.call(this, 'chooseRouteView', object);
    
    // Generate and insert the content HTML.
    this.initContentUi(object);
    
    // Disable submit button before the selection is made
    $("input[type='radio']").bind("change", function(event, ui) {
        $('#submitButton').removeClass('ui-disabled');
    });
    
    $('#submitButton').addClass('ui-disabled');
    
    // Disable routes that can't be afforded
    $('input[type="radio"]').each(function(index, radioButton) {
    	if (object.teamPoints + object.startingEdges[index].points < 0) {
    		$(radioButton).checkboxradio('disable');
    	}
    });
    
    $('#submitButton').tazClick(_.once(function() {
        var edge = -1;
        $(document).find('#routeList')
        		.find('input[type="radio"]')
                .each(function(index, radioButton) {
            if ($(radioButton).is(':checked')) {
            	edge = index;
            }
        });
        taz.game.selectRoute(object.startingEdges[edge]);
    }));
    
};


/**
 * @class Compass view that guides to a given area.
 */
taz.GuideView = function() {

};

taz.inherits(taz.GuideView, taz.GameBaseView);

taz.guideView = new taz.GuideView();

/**
 * @private
 * @type {taz.GeoPosition}
 */
taz.GuideView.prototype.goalPosition_ = null;

/**
 * @private
 * @type {int}
 */
taz.GuideView.prototype.cpSize_ = 0;

/**
 * @private
 * @type {taz.GeoPosition}
 */
taz.GuideView.prototype.position_ = null;

/**
 * @private
 * @type {String}
 */
taz.GuideView.prototype.arrowColor_ = 'Y';

/**
 * @private
 * @type {Boolean}
 */
taz.GuideView.prototype.inAllowedZone_ = true;

/**
 * @private
 * @type {Function}
 */
taz.GuideView.prototype.positionCb_ = null;

/**
 * @private
 * @type {Function}
 */
taz.GuideView.prototype.headingCb_ = null;

/**
 * @private
 */
taz.GuideView.prototype.timeTick_ = null;

/**
 * @private
 */
taz.GuideView.prototype.guideBeginTime_ = null;

/**
 * @private
 */
taz.GuideView.prototype.guideTimeout_ = null;

/**
 * @param {taz.GeoPosition} position to guide to.
 */
taz.GuideView.prototype.onCreate = function(guideData) {
    // Call parent class implementation.
    taz.GameBaseView.prototype.onCreate.call(this, 'guideView', guideData);
	
    guideData.showMapViewIcon = guideData.canSwitchToMap;
    guideData.showGuideViewIcon = false;
    
    // Generate and insert the content HTML.
    this.initContentUi(guideData);
	
    this.guideBeginTime_ = guideData.guideTimerStartTime;
    this.guideTimeout_ = guideData.guideTimerTimeout;
    this.goalPosition_ = guideData.goalPosition;
    this.cpSize_ = guideData.cpSize;
    this.position_ = taz.navigation.currentPosition;
    this.positionCb_ = _.bind(this.onPositionChanged_, this);
    this.headingCb_ = _.bind(this.onHeadingChanged_, this);	
    	
    taz.game.addPositionListener(this.positionCb_);
    taz.navigation.addHeadingListener(this.headingCb_);

    var heading = this.position_.bearingTo(this.goalPosition_);
    $("#headingText").html(heading.getCompassPoint());
	
    $('#arrowImage').attr('src', 'images/arrows/arrowG_N.png');
    this.onPositionChanged_(this.position_);
            
    if (this.guideTimeout_) {
        this.updateClock_();
        this.timeTick_ = setInterval(_.bind(this.onTimeTick_, this), 500);
    }
    else {
        this.setAdditionalMessage('');
    }
};

/**
 * Called when team exits the game area.
 */
taz.GuideView.prototype.teamOutsideGameArea = function(goalPosition) {
	this.goalPosition_ = goalPosition;
	this.setAdditionalMessage(taz.strings.outside_game_area);
	this.inAllowedZone_ = false;
	
	this.setHeaderButtonEnabled(taz.GameBaseView.HEADER_BUTTON_NAMES.MAP_VIEW, false);
};

/**
 * Called when team enters a forbidden zone.
 */
taz.GuideView.prototype.teamInForbiddenZone = function(goalPosition) {
	this.goalPosition_ = goalPosition;
	this.setAdditionalMessage(taz.strings.forbidden_zone);
	this.inAllowedZone_ = false;
	
	this.setHeaderButtonEnabled(taz.GameBaseView.HEADER_BUTTON_NAMES.MAP_VIEW, false);
};

/**
 * Called when the team is in allowed area (not outside game area and 
 * not in forbidden zone).
 */
taz.GuideView.prototype.teamInAllowedArea = function(goalPosition, message) {
	if (message == undefined) {
		message = null;
	}
	
	this.goalPosition_ = goalPosition;
	
	if (message != null) {
	    this.setAdditionalMessage(message);
	}
	else {
		this.setAdditionalMessage('');
	}
	
	this.inAllowedZone_ = true;
	
	if (this.guideTimeout_) {
		this.updateClock_();
	}
	
	this.setHeaderButtonEnabled(taz.GameBaseView.HEADER_BUTTON_NAMES.MAP_VIEW, this.viewData.canSwitchToMap);
};

/**
 * Called when something needs to be shown in the additional message field
 */
taz.GuideView.prototype.setAdditionalMessage = function(message) {
	if (message.length > 0) {
		$("#additional-message-container").css("display", "block");
	}
	else {
		$("#additional-message-container").css("display", "none");
	}
	
    $("#additionalMessage").html(message);
};

/**
 * Called when the position changes.
 * 
 * @param {taz.GeoPosition} The new position.
 * 
 * @private
 */
taz.GuideView.prototype.onPositionChanged_ = function(position, accuracy) {
    this.position_ = position;

    // If in allowed zone, reduce the checkpoint radius from the distanceTo checkpoint
    var distance = this.inAllowedZone_ ? Math.ceil(position.distanceTo(this.goalPosition_) - this.cpSize_) : Math.ceil(position.distanceTo(this.goalPosition_));
    if (distance < 0) {
    	distance = 0;
	}
    $("#distanceText").html(distance + taz.strings.meters);
    
    var heading = position.bearingTo(this.goalPosition_);
    $("#headingText").html(heading.getCompassPoint(8));
    
    //Arrow color can also change
    this.onHeadingChanged_(taz.navigation.currentHeading);
};

/**
 * Called when the compass heading changes.
 * 
 * @param {taz.Heading} The new heading.
 * 
 * @private
 */
taz.GuideView.prototype.onHeadingChanged_ = function(heading) {	
    var bearing = this.position_.bearingTo(this.goalPosition_);
    var direction = bearing.substract(heading);
	
    var arrowColor = 'Y';
    if (!this.inAllowedZone_) {
    	arrowColor = 'R';
    }
    else if (this.position_.distanceTo(this.goalPosition_) < 50 + this.cpSize_) {
		arrowColor = 'G';
	}
    
    // Select the correct arrow image using the compass point string.
    this.arrowColor_ = arrowColor;
    var imageUrl = 'images/arrows/arrow' + arrowColor + '_N.png';
		
    // Draw the image.
    $('#arrowImage').attr('src', imageUrl);

    var css = {
    'transform' : 'rotate(' + direction.heading + 'deg)',
'-webkit-transform' : 'rotate(' + direction.heading + 'deg)'
    }

    $('#arrowImage').css(css);
};

taz.GuideView.prototype.onDestroy = function(data) {
    // Call parent class implementation.
    taz.GameBaseView.prototype.onDestroy.call(this, data);
	
    taz.navigation.removePositionListener(this.positionCb_);
    taz.navigation.removeHeadingListener(this.headingCb_);
        
    // Cancel the guide timeout.
    if (this.timeTick_ != null) {
        clearInterval(this.timeTick_);
        this.timeTick_ = null;
    }
};

/**
 * Called to update route timer
 * @private
 */
taz.GuideView.prototype.onTimeTick_ = function() {
    //Get current time
    var time = new Date().getTime();
	
    //Time left (in seconds)
    var timeLeft = (this.guideTimeout_ - (time - this.guideBeginTime_)) / 1000;
	
    if (timeLeft <= 0) {
        if (this.timeTick_ != null) {
            clearInterval(this.timeTick_);
        }
        this.timeTick_ = null;
        taz.game.routeTimeExpired();
    }
    else {
        this.updateClock_();
    }
};

/**
 * @private
 */
taz.GuideView.prototype.updateClock_ = function() {
    var time = new Date().getTime();
    var timeLeft = (this.guideTimeout_ - (time - this.guideBeginTime_)) / 1000;
	
    var timeString = taz.TimerHelper.getTimeString(timeLeft);
    
    if (this.inAllowedZone_ && this.guideTimeout_) {
    	this.setAdditionalMessage(taz.strings.time_left + ' ' + timeString);
    }
};

taz.AdminView = function() {

};

taz.inherits(taz.AdminView, taz.View);

taz.AdminView.prototype.model_ = null;

taz.AdminView.prototype.selectedServer = null;

/**
 * Singleton instance.
 * 
 * @type taz.AdminView
 */
taz.adminView = new taz.AdminView();

taz.AdminView.prototype.onCreate = function(data) {
	// Call parent class implementation.
	taz.View.prototype.onCreate.call(this, 'adminView', data);
	
	this.model_ = new taz.GameModel();
	
	var that = this;
    
    // Register handlebars helper
    Handlebars.registerHelper('getServerIcon', function(versionInfo, passcode) {
        if (taz.versionutils.isCompatibleVersion(versionInfo, false)) {
            if (passcode) {
                return "images/server_lock.png";
            }
            else {
                return "images/server_green.png";
            }
        }
        return "images/server_red.png";
    });    
    
    // If no servers are given, fetch them first to prevent an empty view.
    // This violates the architecture slightly but was a real easy solution.
    data ? this.initUiAndBindButtons_() : taz.game.getServerList(_.bind(function(list) {
        this.viewData = data = list;
        this.initUiAndBindButtons_();
    }, this));
};

/**
 * @private
 */
taz.AdminView.prototype.initUiAndBindButtons_ = function() {
    this.initUi(this.viewData);
    if(this.model_.getDefaultServer() != null) {
    	$('#defaultServerUrl').text(this.model_.getDefaultServer().name);
    }
    else {
    	$('#defaultServerUrl').text("");
    }
    
    var that = this;
    
    $("#showAdminViewContent li").each(function(index, item) {
        $(item).tazClick(function() {
        	if (taz.versionutils.isCompatibleVersion(that.viewData.servers[index].versionInfo, true)) {
        		taz.InitializingState.prototype.checkServerPasscodeAndContinue_(that.viewData.servers[index].passcode, function() {
            		$('#defaultServerUrl').text(that.viewData.servers[index].name);
            		that.selectedServer = that.viewData.servers[index];
            	})
            }
        });
    });
    
    $('#save-settings-button').tazClick(function() {
    	var currentPosition = taz.navigation.currentPosition;
    	
    	if ($('#defaultServerUrl').text() != null && that.selectedServer != null) {
    		that.model_.setDefaultServer(that.selectedServer);
    		
    		taz.loadingDialog.setLoadingMessage(taz.htmlDecode(taz.strings.finding_games));
    	    taz.loadingDialog.show();
    	    
    	    // Set active game server
    	    that.model_.setServerUrl(that.selectedServer.url);
    	    taz.game.getBackend().setActiveGameServer(that.selectedServer.url);
    	            
    	    taz.game.getBackend().login();
    	    
    	    // Find nearby games and show user the possibilities.
    	    taz.game.getBackend().getNearbyGames(currentPosition, function(gameList) {
    	        taz.loadingDialog.hide();
    	        taz.viewManager.changeView('showGamesView', {games: gameList.games, server: that.selectedServer, showBackButton: true});
    	    });
    	}
    	else {
    		taz.loadingDialog.setLoadingMessage(taz.htmlDecode(taz.strings.finding_servers));
    	    taz.loadingDialog.show();
    	    
    		taz.game.getBackend().getServers(currentPosition, function(serverList) {
    			taz.loadingDialog.hide();
                taz.viewManager.changeView('showServersView', serverList);
            });
    	}
    });
    
    $('#clear-settings-button').tazClick(function() {
    	that.model_.setDefaultServer(null);
    	that.selectedServer = null;
    	$('#defaultServerUrl').text("");
    });
};

taz.AdminView.prototype.setServers = function(data) {
    this.viewData = data;
    this.initUiAndBindButtons_();
};

