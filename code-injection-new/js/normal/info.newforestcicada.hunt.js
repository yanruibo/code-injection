




















/**
 * Shim class to mimic the API presented by the Native plugin when running in Chrome
 */

console.warn("Using the Codova Shim, don't include this file in production code!!");

window.device = {
	name: 'Test Environment',
	platform: 'Desktop',
	cordova: 'shim',
	uuid: 'ignore-me',
	version: '1.0',
	model: ''
};

window.CicadaDetector = (function() {
	var detector = function() {

	};

	// List of functions to expose
	//var fns = ['initialiseDetector', 'getAmplitude', 'getFrequencies', 'startDetector', 'startWhiteNoise', 'stopDetector', 'startWhiteNoise', 'startSurvey', 'getCicada'];
	var fns = ['initialiseDetector', 'startDetector', 'startWhiteNoise', 'startSurvey', 'stopDetector'];

	// Add functions for each of the plugin methods that are just fire and forget
	for(var i=0; i<fns.length; i++) {
		// Wrap in a closure so that we lock in the value of fnName
		(function() {
			var fnName = fns[i];

			detector.prototype[fnName] = function(win, fail) {
				win = win || function() {};
				fail = fail || function() {};

				setTimeout(function() {
					win();
				}, 10);
			};
		})();
	}
	
	detector.prototype.getFrequencies = function(win, fail) {
		win = win || function() {};
		fail = fail || function() {};
		
		var d = [];
		
		for(var i=0; i<20; i++) {
			d.push(Math.random())
			//d.push(0.5)
		}
		
		setTimeout(function() {
			win(d);
		}, 10);
	};
	
	detector.prototype.getCicada = function(win, fail) {
		win = win || function() {};
		fail = fail || function() {};
		
		setTimeout(function() {
			win(Math.random());
		}, 10);
	};
	
	detector.prototype.writeRecording = function(win, fail, seconds) {
		win = win || function() {};
		fail = fail || function() {};
		seconds = seconds || 60;

		setTimeout(function() {
			win();
		}, 10);
	};
	
	var createInsectArray = function() {
		return [{
			value: Math.random(),
			insect: RL.INSECTS.kCICADA,
			name: 'New Forest Cicada'
		},
		{
			value: Math.random(),
			insect: RL.INSECTS.kFIELDGRASSHOPPER,
			name: 'Common Grasshopper'
		},
		{
			value: Math.random(),
			insect: RL.INSECTS.kDARKBUSHCRICKET,
			name: 'Bush Cricket'
		},
		{
			value: Math.random(),
			insect: RL.INSECTS.kROESELSBUSHCRICKET,
			name: 'Rosel Bush Cricket'
		},
		{
			value: Math.random(),
			insect: RL.INSECTS.kWOODCRICKET,
			name: 'Wood Cricket'
		}];
	};
	
	detector.prototype.stopSurvey = function(width, height, win, fail) {
		win = win || function() {};
		fail = fail || function() {};
		
		var data = {
			"insects": createInsectArray(),
		    keep_recording: true,
		    message: Math.floor(Math.random()*3), // in the range 0-2
			sonogram: 'img/cicada-sonogram.png'
		};
		
		$(data.insects).each(function(i, insect) {
			insect.found = (insect.value > 0.5);
		});
		
		setTimeout(function() {
			win(data);
		}, 10);
	};

	detector.prototype.getInsects = function(win, fail) {
		win = win || function() {};
		fail = fail || function() {};
		
		var insects = createInsectArray();
		
		$(insects).each(function(i, insect) {
			insect.found = insect.value > 0.5;
		});

		setTimeout(function() {
			win(insects);
		}, 10);
	};
	
	detector.prototype.setApplicationIconBadgeNumber = function(count, win, fail) {
		win = win || function() {};
		fail = fail || function() {};
		
		setTimeout(function() {
			win();
		}, 10);
	};
	
	navigator.notification = function(msec) {}
	navigator.notification.vibrate = function(msec) {}

	var d = new detector();
	d.isShim = true;
	
	return d;
})();

window.CicadaDetector = (function() {
	var detector = function() {
		
	};
	
	// List of functions to expose
	var fns = ['initialiseDetector', 'getAmplitude', 'getFrequencies', 'startDetector', 'startWhiteNoise', 'stopDetector', 'startWhiteNoise', 'startSurvey', 'getCicada'];

	// Add functions for each of the plugin callbacks we want to expose
	for(var i=0; i<fns.length; i++) {
		// Wrap in a closure so that we lock in the value of fnName
		(function() {
			var fnName = fns[i];

			detector.prototype[fnName] = function(win, fail) {
				win = win || function() {};
				fail = fail || function() {};
				
				var w = function(data) {
					setTimeout(function() {
						win(data);
					}, 10);
				};

				//console.log('CicadaDetector.'+fnName+'()');
				cordova.exec(w, fail, "CicadaDetector", fnName, [null]);
			};
		})();
	}
	
	detector.prototype.stopSurvey = function(width, height, win, fail) {
		win = win || function() {};
		fail = fail || function() {};
		
		// Android plugin falls over with null values for w/h
		width = width || 10;
		height = height || 10;

		//console.log('CicadaDetector.'+fnName+'()');
		cordova.exec(win, fail, "CicadaDetector", "stopSurvey", [width, height]);
	}
	
	detector.prototype.writeRecording = function(win, fail, seconds) {
		win = win || function() {};
		fail = fail || function() {};
		seconds = seconds || 60;

		//console.log('CicadaDetector.'+fnName+'()');
		cordova.exec(win, fail, "CicadaDetector", "writeRecording", [seconds]);
	}
	
	detector.prototype.getInsects = function(win, fail) {
		win = win || function() {};
		fail = fail || function() {};
		
		var w = function(data) {
			// Bug fix for iOS plugin sending the data as a serialized string
			if(typeof data == "string")
				data = JSON.parse(data) || [];
			
			if(!(data instanceof Array))
				data = [data];
			
			//console.log(JSON.stringify(data));
				
			// Hack to workaround the Cordova Plugin returning the wrong data structure
			// Ensure the data is in the correct format (check that insect id is 'insect' and not 'id' which is how the server expects it)
			if(data.length > 0 && data[0].id !== undefined) {
				//console.log("Cordova Plugin returned insects array with 'id' instead of 'insect'.");
				
				for(var i=0; i<data.length; i++) {
					data[i].insect = data[i].id;
					delete data[i].id;
				}
			}
			
			//console.log(JSON.stringify(data));
			
			win(data);
		};
		
		//console.log('CicadaDetector.'+fnName+'()');
		cordova.exec(w, fail, "CicadaDetector", "getInsects", [null]);
	}
	
	detector.prototype.setApplicationIconBadgeNumber = function(count, win, fail) {
		win = win || function() {};
		fail = fail || function() {};
		
		if(window.device.platform == 'Android') {
			setTimeout(function() {
				fail();
			}, 10);
			
			return;
		}
		
		cordova.exec(win, fail, "CicadaDetector", "setApplicationIconBadgeNumber", [count]);
	}
	
	return new detector();
})();

define(['view'], function() {
	RL.ListView = RL.View.extend({
		type: 'list',
		template: [
			'<div class="list-cell">{{label}}</div>'
		],
		grouped: false,
		initialize: function(params) {
			params = params || {};
			
			this.supr(params);
			
			this.grouped = params.grouped || this.grouped;
			
			var _this = this;
			
			// Enable functions to be passed in as part of the params
			$(['getRowCountForGroup', 'getGroupCount', 'getDataForRowAndGroup', 'rowSelected', 'rowBuilt', 'getGroupHeader']).each(function(i, f) {
				if(params.f) {
					_this[f] = function() {
						return params.f.apply(_this, arguments);
					};
				}
			});
		},
		render: function() {
			this.elem.html('');
			
			if(this.grouped)
				this.elem.addClass('grouped');
			else
				this.elem.removeClass('grouped');
			
			for(var i=0; i<this.getGroupCount(); i++) {
				var group = $('<div class="group"></div>');

				for(var j=0; j<this.getRowCountForGroup(i); j++) {
					var d = this.getDataForRowAndGroup(j, i);
					var e = $(this.renderTemplate(d));
					this.rowBuilt(e.data('index', j).data('group', i), j, i);
					group.append(e);
				}

				var headerText = this.getGroupHeader(i);
				
				if(headerText)
					this.elem.append('<div class="header">'+headerText+'</div>');
					
				this.elem.append(group);
			}

			return this.elem;
		},
		setupListeners: function() {
			var _this = this;
			
			this.elem.delegate('.list-cell', 'touchstart', function(event) {
				var target = $(this),
					index = target.data('index'),
					group = target.data('group');
				
				if(!_this.rowCanBeSelected(index, group))
					return;
				
				// Listen for movement & prevent action
				var move = function(event) {
					moved = true;
					target.removeClass('selected');
					
					_this.elem.undelegate('.list-cell', 'touchmove', move);
					_this.elem.undelegate('.list-cell', 'touchend', end);
				};
				
				var end = function(event) {
					target.removeClass('selected');
					
					_this.elem.undelegate('.list-cell', 'touchmove', move);
					_this.elem.undelegate('.list-cell', 'touchend', end);
					
					setTimeout(function() {
						_this.rowSelected(index, group);
					}, 100);
				};
				
				_this.elem.delegate('.list-cell', 'touchmove', move);
				_this.elem.delegate('.list-cell', 'touchend', end);
				
				_this.elem.find('.group').eq(group).find('.list-cell').eq(index).addClass('selected');
			});
		},
		getRowCountForGroup: function(group) {
			return 0;
		},
		getGroupCount: function() {
			return 1;
		},
		getGroupHeader: function(group) {
			return false;
		},
		getDataForRowAndGroup: function(index, group) {
			return {};
		},
		rowSelected: function(index, group) {
			
		},
		rowCanBeSelected: function(index, group) {
			return true;
		},
		rowBuilt: function(cell, index, group) {
			
		}
	});
});

define(['view', 'scrollview', 'reportheaderview', 'sonogram'], function() {
	
		
	Handlebars.registerHelper('if_gt', function(context, options) {
		if (context > options.hash.compare)
			return options.fn(this);
		return options.inverse(this);
	});
		
	RL.ReportView = RL.View.extend({
		type: 'reportview',
		stretchY: true,
		title: 'Survey Result',
		
		initialize: function(params) {
			params = params || {};
			
			var loaded = params.loaded || function() {};
			
			this._data = params.data;

			this.headerView = new RL.ReportHeaderView({
				modal: false,
				show_h2: false
			});
			
			this.listView = new RL.ReportListView();
			
			var scrollViewSubs = [this.listView],
				cicada = RL.util.getInsectFromData(RL.INSECTS.kCICADA, this._data.insects);
			
			if(!cicada || !cicada.found) {
				scrollViewSubs.push(new RL.View({template: '', classes: 'recording-warning'}));
			}
			
			if(this._data.sonogram)
				scrollViewSubs.unshift(new RL.SonogramView({sonogram: this._data.sonogram, loaded: loaded}));
			
			params.subViews = [
				this.headerView,
				new RL.ScrollView({subViews: scrollViewSubs})
			];
			
			this.supr(params);
			
			if(!this._data.sonogram) {
				// Must be async
				setTimeout(function() {
					loaded();
				}, 10);
			}
		},
		_destroy: function() {
			// Stop listening for api updates			
			$(window).off('api:sent', this._apiSentHander);
		},
		setupListeners: function() {
			var _this = this;
			
			this.elem.delegate('.dismiss-modal', 'touchstart', function(event) {
				event.preventDefault();
				window.app.dismissModalView();
			});
			
			this.elem.delegate('.back', 'touchend', function(event) {
				event.preventDefault();
				_this.navView.popView();
			});
			
			// Listen for when the API updates

			this._apiSentHander = function() {
				var reports = window.app.data.getReports();			
				$(reports).each(function(i, d) {
					if(d.id ===_this._data.id){
						_this._data.status = d.status;
						_this.subViews[1].render();
					}
				});			
			};
			
			$(window).on('api:sent', this._apiSentHander);
		}
	});
	
	
	
	RL.ReportListView = RL.ListView.extend({
		template: [
			'<div class="list-cell">',
				'<div class="label">{{label}}</div>',
				'<div class="value">{{value}}</div>',
			'</div>'
		],
		grouped: true,
		cls: 'report-details',
		getGroupHeader: function(group) {
			return false;
		},
		getGroupCount: function() {
			return 1;
		},
		getRowCountForGroup: function(group) {
			return this.data().length;
		},
		getDataForRowAndGroup: function(index, group) {
			return this.data()[index];
		},
		rowCanBeSelected: function(index, group) {
			return false;
		},
		data: function() {
			var d = this.getParentView().getParentView()._data;
			
			var out = [];
			
			var status = 'Waiting to upload';
			
			if(d.status === RL.REPORTSTATUS.kDATASENT) {
				if (d.filepath) {
 					if (d.keep_recording) {
						status = 'Awaiting recording upload';
					} else {
						status = 'Sent to server';
					}
				} else {
					status = 'Sent to server';
				}
			} else if(d.status === RL.REPORTSTATUS.kDATAANDPAYLOADSENT) {
				status = 'Sent to server';
			}
			
			// If we've not found a cicada then add a row for the user selected insect
			for(var i=0; i<d.insects.length; i++) {
				var insect = d.insects[i];
				if(insect.user_selected) {
					out.push({label: 'Insect', value: insect.name});
				}
			}
			
			out.push({label: 'Status', value: status});
			out.push({label: 'Date', value: moment.unix(d.timestamp).format('DD/MM/YY @ h:mmA')});
			out.push({label: 'Recording', value: (d.keep_recording ? 'Saved for analysis' : 'Not saved' )});
			
			return out;
			
		}
	});
});

define(['visualisationview', 'surveyendview', 'insectnotificationview', 'loadingview'], function() {
	
	RL.INSECTS = {
		kCICADA: 0,
		kFIELDGRASSHOPPER: 1,
		kDARKBUSHCRICKET: 2,
		kROESELSBUSHCRICKET: 3,
		kWOODCRICKET: 4
	};
	
	RL.SurveyView = RL.View.extend({
		type: 'survey',
		cls: 'survey',
		stretchY: true,
		startSurveyMessage: 'Tap the cicada to start survey',
		initialize: function(params) {
			params = params || {};

			this._data = {
				updateFrequency: Math.round(1000 / 10), // ms
				surveying: false,
				surveyDuration: 30000,
				surveyStart: null,
				surveyCompletion: 0,
				surveyLastSample: null,
				surveySecondsRemaining: null,
				freq: [],
				message: 0,
				labelVisible: false,
				cicada: 0	// The probability of a cicada
			}
			
			this.overlay = new RL.View({
				template: [
					'<div class="title">'+this.startSurveyMessage+'</div>'
				]
			});
			
			this.canvas = new RL.VisualisationView({
				data: this.data()
			});
			
			params.subViews = [this.overlay, this.canvas, this.notifications]
			
			this.supr(params);
			this.surface().css('position', 'relative');
		},
		startUpdateLoop: function() {
			if(this.updating)
				return;
			
			this.updating = true;
			
			if(this.timeout)	
				window.cancelAnimationFrame(this.timeout);
			
			var _this = this;
			
			setTimeout(function() {
				_this.updateTick();
			}, 60);
		},
		stopUpdateLoop: function() {
			this.updating = false;
			
			if(this.timeout)	
				window.cancelAnimationFrame(this.timeout);
		},
		updateTick: function() {
			var d = this.data()
				_this = this,
				t = +new Date;
			
			// Throttle the update requests	
			if(t - d.surveyLastSample >= d.updateFrequency) {
				this.updateData();
				d.surveyLastSample = t;
			}
			
			if(this.updating) {
				this.timeout = window.requestAnimationFrame(function() {
					_this.updateTick();
				});				
			}
		},
		updateData: function() {
			var d = this.data()
				_this = this,
				t = +new Date,
				delta = t - d.surveyStart,
				remaining = Math.ceil((d.surveyDuration - delta) / 1000);
			
			if(d.surveying) {
				d.surveyCompletion = delta / d.surveyDuration;
				
				// Update the counter
				if(remaining != d.surveySecondsRemaining) {
					if (remaining <= 0) {
						this.elem.find('.title').html('Analysing...');
					} else {
						this.elem.find('.title').html('Surveying – ' + remaining + ' sec remaining');
					}
					d.surveySecondsRemaining = remaining;
				}
				
				// Make enough getFrequencies request for the time elapsed since last update
				for(var i=0; i < Math.ceil(delta/d.updateFrequency) - d.freq.length; i++) {			
					// Get a new set of freq data
					CicadaDetector.getFrequencies(function(data) {
						//console.log(JSON.stringify(data));
						d.freq.push(data);
					});
					
					CicadaDetector.getCicada(function(confidence) {
						d.cicada = confidence;
					});
				}

				// Check if we've completed the survey
				if(d.surveyCompletion > 1) {
					d.surveyCompletion = 1;
					d.surveying = false;
					
					// Check that we've drawn a full circle
					var segments = Math.ceil(d.surveyDuration/d.updateFrequency);
					
					for(var i = d.freq.length; i < segments; i++) {
						CicadaDetector.getFrequencies(function(data) {
							d.freq.push(data);
						});
					}
					
					// Handle the end of the survey
					setTimeout(function() {
						_this.surveyCompleted();
					}, 50);
				}
			}
			else if(d.listening && !CicadaDetector.isShim) {
				// We're in a waiting state before surveying has begun
				CicadaDetector.getFrequencies(function(data) {
					d.freq.push(data);					
					if(d.freq.length > 1)
						d.freq.shift();
				});
				
				// Update the cicada likelyhood				
				CicadaDetector.getCicada(function(confidence) {
					d.cicada = confidence;
					
				});
			}
		},
		reset: function() {
			var d = this.data();
			d.surveying = false;
			d.freq.length = 0;
			d.surveyLastSample = 0;
			d.cicada = 0;
			d.surveyCompletion = 0;
			d.surveySecondsRemaining = d.surveyDuration / 1000;
			
			this.canvas.reset();
			this.elem.find('.title').removeClass('countdown').html(this.startSurveyMessage);
		},
		checkAndStartSurvey: function() {
			var d = this.data()
				_this = this;

			if (d.surveying) {
				return;
			}

			var callBack = function(button) {
				if ( button == 2 ) {
					_this.startSurvey();
				}
			}

			if ( window.app.data.getReports().length == 0 ) {
				var message = "This will record 30 seconds of sound from your phone's microphone. You can stop this recording at any time by selecting another tab at the bottom of the screen. Once the survey is complete, you can choose to upload or delete the recording.";
				if(window.device.platform == 'iOS' && window.orientation != 180) {
					message = message + " For best results, hold your phone upside down so that the microphone is pointing up.";
				}
				RL.confirm(message, callBack, "Start Survey", "Cancel,OK");
			} else {
				_this.startSurvey();
			}
		},
		startSurvey: function() {				
			var d = this.data()
				_this = this;

			var success = function(position) {
				console.log('Update GPS location for survey ' + position.coords.latitude + ',' + position.coords.longitude + ' with accuracy ' + position.coords.accuracy + ' at timestamp ' + position.timestamp);
			};

			var error = function(error) {
				console.log('GPS Failed');
				if(error && error.code) {
					switch(error.code) {
						case error.TIMEOUT:
							console.error('Geo: Timeout');
							break;
						case error.POSITION_UNAVAILABLE:
							console.error('Geo: Position unavailable');
							break;
						case error.PERMISSION_DENIED:
							console.error('Geo: Permission denied');
							break;
						case error.UNKNOWN_ERROR:
							console.error('Geo: Unknown error');
							break;
					}
				}
			};

			setTimeout(function() {
				navigator.geolocation.getCurrentPosition(success, error, {
					enableHighAccuracy: true,
					maximumAge: 0,
					timeout: 25000
				});
			}, 50);

			setTimeout(function() {
				window.CicadaDetector.startSurvey();
				
				d.listening = false;
				_this.reset();
				d.surveying = true;
				
				d.surveyStart = +new Date;
				_this.canvas.startDrawing();
				_this.elem.find('.title').addClass('countdown').html('Surveying – ' + d.surveySecondsRemaining + ' sec remaining');
			}, 50);
		
			this.canvas.stopDrawing();
		},
		surveyCompleted: function() {

			console.log('Completed survey duration: '+(+new Date - this.data().surveyStart)+'ms');
			
			var _this = this;

			var survey = {
				timestamp: (+new Date)/1000
			};
			
			var processSurvey = function(s) {

				console.log('Survey::processSurvey()');
				
				var processData = function(data) {

					//var loading = new RL.LoadingView(),
					//	startTime = +new Date();
						
					//loading.setLabel('Processing');
					//loading.show();
					
					window.app.data.addReport(data, function() {

						//var timeElapsed = (+new Date()) - startTime,
						//	delay = timeElapsed < 4000 ? 4000 : 0;
							
						//setTimeout(function() {
						//	loading.dismiss();
							
							_this.elem.find('.title').css('opacity', 0.0);
							data.labelVisible = false;
							
							// The addReport method is async
							var loaded = function() {
								window.app.showModalView(v, function() {
									_this.reset();
								});
							};

							var v = new RL.SurveyEndView({
								data: data,
								loaded: loaded
							});
						//}, delay);
						
						
					});
				}
				
				if(s.keep_recording) {
					// Get the file path for the recording, then process
					console.log('CicadaDetector.writeRecording');
					
					var win = function(path) {
						console.log("Filepath: "+path);
						s.filepath = path;
						
						processData(s);
					};
					
					var fail = function(path) {
						console.log('error in writeRecording');
						processData(s);
					}
					
					CicadaDetector.writeRecording(win, fail, parseInt(_this.data().surveyDuration/1000, 10));
				}
				else
					processData(s);	// Process straight away
				
			};
			
			var w = screen.width;
			
			if(window.devicePixelRatio)
				w = w * window.devicePixelRatio;
			
			// Image size should have aspect ration of 4:1
			CicadaDetector.stopSurvey(w, w/4, function(data) {	
				console.log('stopSurvey() callback');
				survey = $.extend({}, survey, data);
				_this.data().message = data.message;		
				processSurvey(survey);
			});
		},
		didAppear: function() {
			// We need about 60px for the top message section so if there is not space automatically we should force this
			var w = this.elem.width(),
				h = this.elem.height();
				
			var topSpace = (h - w) / 2;
			
			if(topSpace < 60)
				this.overlay.surface().height(60);
			
			this.supr();
			
			var _this = this,
				d = this.data();
			
			d.labelVisible = false;
			d.listening = true;
			d.surveying = false;
			_this.elem.find('.title').css('opacity', 0.0);
			this.reset();

			CicadaDetector.startDetector(function() {
				_this.startUpdateLoop();
			});

		},
		didDisappear: function() {
			this.supr();
			
			var d = this.data();

			var _this = this;
			
			var stopD = function() {
				CicadaDetector.stopDetector();
				var message = _this.data().message;
				if (message == 1) {
					navigator.notification.vibrate(1000);
					_this.data().message = 0;
				} else if (message == 2) {
					navigator.notification.vibrate(2000);
					_this.data().message = 0;
				}
			};
			
			if (d.surveying) {
			
				d.surveying = false;
				d.listening = true;
				this.reset();
				
				CicadaDetector.stopSurvey(null, null, stopD);
			
			} else {

				stopD();

			}
				
			this.stopUpdateLoop();
		}
	});
});

define(['listview'], function() {
	
	var START_AT_TOP = 1.5*Math.PI,
		TWO_PI = 2*Math.PI,
	
		CIRCLE_RADIUS = 50,
		PROGRESS_WIDTH = 6,
		
		LAST_PROGRESS_VALUE = null,
		LAST_CICADA_VALUE = null,
		
		VIS_START_RADIUS = CIRCLE_RADIUS + (PROGRESS_WIDTH * 0.5),
		VIS_LINE_WIDTH = 20,
		VIS_HALF_LINE_WIDTH = VIS_LINE_WIDTH * 0.5,
		LAST_FREQ_INDEX = -1,
		CHORDS_IN_CIRCLE = 1,
		ANGLE_PER_CHORD = null;
	
	RL.VisualisationView = RL.View.extend({
		cls: 'visualisation',
		template: [
			'<div class="canvas"></div>',
			'<div class="insect icon"></div>'
		],
		stretchY: true, 
		count: 0,
		duration: 10, //sec
		initialize: function(params) {
			params = params || {};
			this.supr(params);
			
			CHORDS_IN_CIRCLE = Math.round(params.data.surveyDuration / params.data.updateFrequency);
			ANGLE_PER_CHORD = TWO_PI / CHORDS_IN_CIRCLE;
			
			console.log('CHORDS_IN_CIRCLE: '+ CHORDS_IN_CIRCLE);
			console.log('ANGLE_PER_CHORD: '+ ANGLE_PER_CHORD);
		},
		setupListeners: function() {
			var _this = this;
			
			this.elem.delegate('.canvas', 'touchstart', function(event) {
				//_this.canvas.reset();
				//console.log(event);
				var e = event.originalEvent,
					x = e.touches[0].clientX - _this.offsetX,
					y = e.touches[0].clientY - _this.offsetY;
								
				// Check if the input came from the center circle
				var deltaX = _this.centerX - x,
					deltaY = _this.centerY - y,
					displacement = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
				
				if(Math.abs(displacement) <= CIRCLE_RADIUS) {
					_this.getParentView().checkAndStartSurvey();
				}

			});
		},
		setParentView: function(view) {
			this.supr(view);
			this.dataSource = this.getParentView();
		},
		didAppear: function() {
			this.supr();
			this.stopDrawing();
			this.initializeCanvas();
				
			this.startDrawing();
			console.log('VisualisationView::didAppear()');
		},
		didDisappear: function() {
			this.supr();
			this.stopDrawing();
			console.log('VisualisationView::didDisappear()');
		},
		initializeCanvas: function() {
			this.width = this.elem.width();
			this.height = this.elem.height();
			
			this.centerX = this.width * 0.5;
			this.centerY = this.height * 0.5;
			
			// Work out the relative position of this view to the viewport
			var o = this.elem.offset();
			this.offsetX = o.left;
			this.offsetY = o.top;
			
			this.canvas = $('<canvas/>').attr('width', this.width).attr('height', this.height);
			this.ctx = this.canvas.get(0).getContext('2d');
			
			this.progressCanvas = $('<canvas/>').attr('width', this.width).attr('height', this.height);
			this.progressCtx = this.progressCanvas.get(0).getContext('2d');
			
			this.cicadaCanvas = $('<canvas/>').attr('width', this.width).attr('height', this.height);
			this.cicadaCtx = this.cicadaCanvas.get(0).getContext('2d');
			
			this.visCanvas = $('<canvas/>').attr('width', this.width).attr('height', this.height);
			this.visCtx = this.visCanvas.get(0).getContext('2d');
			
			// Work out how large each ring of the visualisation can be
			var halfWidth = Math.min(this.width, this.height) * 0.5,
				availableSpace = halfWidth - (CIRCLE_RADIUS+PROGRESS_WIDTH+10);
				VIS_LINE_WIDTH = availableSpace / 20;
			
			var scaleFactor = window.devicePixelRatio;
			
			// iPhone 4 can't handle drawing at retina scale
			if(scaleFactor && !(RL.device.is.iPhone4() || RL.device.is.iPod4G())) {
				this.progressCanvas.attr('width', this.width*scaleFactor).attr('height', this.height*scaleFactor).css({ width: this.width+'px', height: this.height+'px' });
				this.progressCtx.scale(scaleFactor, scaleFactor);
				
				this.visCanvas.attr('width', this.width*scaleFactor).attr('height', this.height*scaleFactor).css({ width: this.width+'px', height: this.height+'px' });
				this.visCtx.scale(scaleFactor, scaleFactor);
				
				this.canvas.attr('width', this.width*scaleFactor).attr('height', this.height*scaleFactor).css({ width: this.width+'px', height: this.height+'px' });
				this.ctx.scale(scaleFactor, scaleFactor);
				
				this.cicadaCanvas.attr('width', this.width*scaleFactor).attr('height', this.height*scaleFactor).css({ width: this.width+'px', height: this.height+'px' });
				this.cicadaCtx.scale(scaleFactor, scaleFactor);
			}
			
			// Set initial drawing states
			this.progressCtx.lineWidth = PROGRESS_WIDTH;
			this.progressCtx.strokeStyle = 'rgb(255, 255, 255)';
			
			this.visCtx.lineWidth = VIS_LINE_WIDTH;

			// Put the canvas onto the dom
			this.elem.find('.canvas').html(this.canvas).append(this.progressCanvas).append(this.visCanvas).append(this.cicadaCanvas);
		},
		startDrawing: function() {
			if(this.drawing)
				return;
			
			var _this = this;
			
			setTimeout(function() {
				if(_this.rAF)
					window.cancelAnimationFrame(_this.rAF);
					
				_this.drawing = true;
				_this.reset();
				_this.tick();
			}, 60);	
		},
		stopDrawing: function() {
			this.drawing = false;
			
			if(this.rAF)
				window.cancelAnimationFrame(this.rAF);
		},
		updateProgress: function(data) {			
			// We only need to update the image if something has changed
			if(data.surveyCompletion != LAST_PROGRESS_VALUE) {
				var areaSize = (CIRCLE_RADIUS*2)+PROGRESS_WIDTH+6;

				// Clear only the bit we care about
				this.progressCtx.clearRect((this.width-areaSize)*0.5, (this.height-areaSize)*0.5, areaSize, areaSize);

				// Draw the percentage completed arc
				this.progressCtx.beginPath();
				this.progressCtx.arc(this.centerX, this.centerY, CIRCLE_RADIUS+(PROGRESS_WIDTH*0.5), START_AT_TOP, TWO_PI*data.surveyCompletion + START_AT_TOP);
				this.progressCtx.stroke();

				LAST_PROGRESS_VALUE = data.surveyCompletion;
			}
		},
		updateVisualisation: function(data) {
			var offset = 0,
				startAngle = 0,
				endAngle = 0;
				
			if(data.surveying) {

				if (!data.labelVisible) {
					this.getParentView().elem.find('.title').css('opacity', 1);
					data.labelVisible = true;
				}

				// Draw the freq visualisation
				for(var i=LAST_FREQ_INDEX+1; i<CHORDS_IN_CIRCLE && i<data.freq.length; i++) {
					// Each chord has 20 freq values
					offset = 0;
					startAngle = i * ANGLE_PER_CHORD;
					endAngle = (i+1) * ANGLE_PER_CHORD;

					for(var j=0; j<20; j++) {
						this.visCtx.strokeStyle = 'rgba(255, 255, 255, '+(data.freq[i][j])+')';
						this.visCtx.beginPath();
						this.visCtx.arc(this.centerX, this.centerY, VIS_START_RADIUS + offset + VIS_HALF_LINE_WIDTH, START_AT_TOP + startAngle, START_AT_TOP + endAngle);
						this.visCtx.stroke();

						offset += VIS_LINE_WIDTH;
					}
				}

				LAST_FREQ_INDEX = data.freq.length-1;
			}
			else if(data.listening) {
				// Show that we're listening
				if(data.freq.length < 1)
					return;
				
				var now = +new Date();
				
				if(now - (this.lastListeningDraw || 0) > data.updateFrequency) {

					if (!data.labelVisible) {
						this.getParentView().elem.find('.title').css('opacity', 1);
						data.labelVisible = true;
					}

					this.visCtx.clearRect(0, 0, this.width, this.height);

					for(var j=0; j<20; j++) {
						this.visCtx.strokeStyle = 'rgba(255, 255, 255, '+(data.freq[0][j])+')';
						this.visCtx.beginPath();
						this.visCtx.arc(this.centerX, this.centerY, VIS_START_RADIUS + offset + VIS_HALF_LINE_WIDTH, 0, TWO_PI);
						this.visCtx.stroke();

						offset += VIS_LINE_WIDTH;
					}
					
					this.lastListeningDraw = now;
				}
			}
			
		},
		updateCicada: function(data) {
			if(data.cicada != LAST_CICADA_VALUE) {
				var areaSize = (CIRCLE_RADIUS*2)+PROGRESS_WIDTH+6;

				// Clear only the bit we care about
				this.cicadaCtx.clearRect((this.width-areaSize)*0.5, (this.height-areaSize)*0.5, areaSize, areaSize);

				this.cicadaCtx.globalAlpha = data.cicada;
				this.cicadaCtx.beginPath();
				this.cicadaCtx.arc(this.centerX, this.centerY, CIRCLE_RADIUS, 0, TWO_PI);
				this.cicadaCtx.fill();
				
				LAST_CICADA_VALUE = data.cicada;
			}
		},
		reset: function() {
			LAST_FREQ_INDEX = LAST_CICADA_VALUE = -1;
			LAST_PROGRESS_VALUE = null;
			
			this.visCtx.clearRect(0, 0, this.width, this.height);
			this.ctx.clearRect(0, 0, this.width, this.height);
			this.cicadaCtx.clearRect(0, 0, this.width, this.height);
			this.progressCtx.clearRect(0, 0, this.width, this.height);
			
			// Draw the center circle
			this.ctx.beginPath();
			this.ctx.arc(this.centerX, this.centerY, CIRCLE_RADIUS, 0, TWO_PI);
			this.ctx.fill();
			
			// Position/size the insect icon
			var insect = this.surface().find('.insect.icon');
			insect.css({
				margin: (this.centerY-CIRCLE_RADIUS)+'px auto 0',
				width: (2*CIRCLE_RADIUS)+'px',
				height: (2*CIRCLE_RADIUS)+'px'
			});
			
			// Draw the border round the circle
			this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
			this.ctx.beginPath();
			this.ctx.lineWidth = 5;
			this.ctx.arc(this.centerX, this.centerY, CIRCLE_RADIUS+(PROGRESS_WIDTH*0.5), 0, TWO_PI);
			this.ctx.stroke();
			
			// Setup the cicada indicator
			var radgrad = this.cicadaCtx.createRadialGradient(this.centerX,this.centerY,0,this.centerX,this.centerY,CIRCLE_RADIUS*1.5);
			radgrad.addColorStop(0, '#E9B262');
			radgrad.addColorStop(0.6, '#943B41');
			radgrad.addColorStop(1, 'rgba(148, 59, 65, 0)');
			this.cicadaCtx.fillStyle = radgrad;
		},
		tick: function() {
			if(this.drawing) {				
				var _this = this,
					data = this.dataSource.data();
				
				// Update the Progress Bar
				this.updateProgress(data);
				this.updateVisualisation(data);
				this.updateCicada(data);

				// Queue up the next frame
				this.rAF = window.requestAnimationFrame(function() {
					_this.tick();
				});
			}
		}
	});
});

define([], function() {
	if(window.Media) {
		RL.Media = {};

		RL.Media.Audio = klass({
			initialize: function(audio) {
				var _this = this;

				this.loaded = false;
				this.playing = false;

				this.audio = $(audio).css({
					display: 'none',
					visibility: 'hidden'
				});
				var src = window.device && window.device.platform == 'Android' ? '/android_asset/www/' : '';
				
				src += this.audio.find('[type="audio/mpeg"]').attr('src');
				
				console.log(src);

				var win = function() {
					_this.loaded = true;
					a.play();
					button.addClass('playing');
				};

				var fail = function(err) {
					console.error('Audio failed to load: '+src);
				};

				this.media = new Media(src, win, fail);

				this.button = $('<button></button>');
				this.updateLabel();	

				this.audio.before(this.button);

				var lastClick = 0;

				this.button.click(function(event) {
					now = +new Date;
					
					if(now - lastClick <= 500)
						return;
						
					lastClick = now;
					
					console.log('audio clicked');
					
					if(_this.playing) {
						_this.stop();
					}
					else {
						_this.play();
					}
				});
			},
			play: function() {
				this.playing = true;
				this.updateLabel();
				this.media.play();
			},
			stop: function() {
				this.playing = false;
				this.updateLabel();
				this.media.stop();
			},
			updateLabel: function() {
				this.button.html(this.playing ? 'Stop Audio' : 'Play Audio');
				this.button.width(); // Force the element to reflow so the label is definitely updates (iOS bug)
			}
		});
	}
	
})

define(['data'], function() {
	RL.API = klass({
		url: 'http://api.newforestcicada.info',
		initialize: function() {
			this.setupListeners();
		},
		setupListeners: function() {
			var _this = this;

			document.addEventListener("resume", function() {
				_this.sendToServer();
			}, false);
			
			document.addEventListener("online", function() {
				_this.sendToServer();
			}, false);
		},
		sendToServer: function() {
			var _this = this;
			
			setTimeout(function() {
				if(_this.sendingInProgress) {
					console.log('sendToServer Cancelled - sendingInProgress = true;');
					return;
				}
			
				_this.sendingInProgress = true;

				$(window).trigger('api:startUpload');
			
				var queue = window.app.data.getUnsentReports();
				
				_this.allQueueItemsSuccessful = true;
			
				_this.processQueue(queue, function(success) {
					if(success) {
						console.log('All items in queue were sent.');
					} else {
						console.log('One or more of the items in the queue failed to send.');
					}	
					$(window).trigger('api:stopUpload');			
					_this.sendingInProgress = false;				
				});
			}, 300);
		},
		processQueue: function(q, complete) {
			complete = complete || function() {};
			
			if(q.length == 0) {
				complete(this.allQueueItemsSuccessful);
				return;
			}
				
			var report = q.shift(),
				_this = this;
			
			this.processReport(report, function(success) {
				
				_this.allQueueItemsSuccessful &= success;

				_this.processQueue(q, complete);
			});
		},
		processReport: function(r, complete) {

			complete = complete || function() {};
			
			var _this = this;
			
			if(r.status === RL.REPORTSTATUS.kDATASENT && r.filepath) {

				console.log('Sending report audio file');
				
				if (r.keep_recording == false) {

					r.status = RL.REPORTSTATUS.kDATAANDPAYLOADSENT;

					window.app.data.writeToDisk();
					$(window).trigger('api:sent');

					window.app.data.removeAudioFileForReport(r);

					complete(true);

				} else if(window.FileTransfer && window.FileUploadOptions) {

					var win = function(data) {
						r.status = RL.REPORTSTATUS.kDATAANDPAYLOADSENT;

						window.app.data.writeToDisk();
						$(window).trigger('api:sent');
						
						window.app.data.removeAudioFileForReport(r);
						
						complete(true);
					};
					
					var fail = function(error) {
						console.log('Report audio failed to send to the server (report id: '+r.id+')');
						complete(false);
					};

					var options = new FileUploadOptions()
					
					options.fileKey = 'audio_file';
					options.fileName = r.filepath.substr(r.filepath.lastIndexOf('/')+1)
					options.mimeType = 'audio/wav';
					
					options.params = {
						observation: r.guid
					};
					
					options.headers = {};
					options.headers['Accept'] = 'application/json';
					
					var ft = new FileTransfer();
					ft.upload(r.filepath, encodeURI(_this.url+'/upload/'), win, fail, options);
				
				} else {
					console.log('Something bad happened in api.js - this should never happen.');
					complete(false);
				}

			} else if(r.status === RL.REPORTSTATUS.kNOTSENT || r.status === undefined) {
				
				var win = function(data) {
					r.status = RL.REPORTSTATUS.kDATASENT;
					
					r.guid = data.guid;
					r.serialised_sonogram = '';

					console.log(r);

					window.app.data.writeToDisk();
					$(window).trigger('api:sent');

					_this.processReport(r, complete);
				};
				
				var fail = function(xhr, errorType, error) {
					console.log('Report JSON failed to send to the server (report id: '+r.id+')');
					console.log(xhr);
					console.log(errorType);
					console.log(error);
					complete(false);
				};
				
				var data = {
					id: r.id,
					recording_timestamp: moment.unix(r.timestamp).format(), // ISO 8601
					device: window.device ? window.device : {},
					device_uuid: window.device ? window.device.uuid : null,
					insect_detected: r.insects,
					serialised_sonogram: r.serialised_sonogram
				};
				
				var params = { 'lat': 'latitude', 'lng': 'longitude', 'gpsAccuracy': 'loc_accuracy'};
				
				for(var key in params) {
					if(r[key])
						data[params[key]] = r[key];
				}

				$.ajax({
					url: _this.url+'/observations/',
					type: 'POST',
					data: JSON.stringify(data),
					processData: false, // don't serialize the data as we've done that ourselves
					contentType: 'application/json',
					dataType: 'json',
					success: win,
					error: fail
				});
			
			} else {
				complete(true);
			}
		}
	});
});

define(['lib/md5'], function() {
	RL.REPORTSTATUS = {
		kNOTSENT: 0,
		kDATASENT: 1,
		kDATAANDPAYLOADSENT: 2
	};
	
	RL.DataStore = klass({
		initialize: function() {
			this.readFromDisk();
			this._reportLookup = {};
			
			// Listen for when the API has sent to server to trigger a data:changed event
			$(window).on('api:sent', function() {
				$(window).trigger('data:changed');
			});
		},
		readFromDisk: function() {
			var _this = this,
				reports = localStorage.getItem('reports');
			
			this.reports = reports ? JSON.parse(reports) : [];
			
			if(!$.isArray(this.reports))
				this.reports = [];
			
			// Index the reports for quick lookup	
			this._reportLookup = {};
			
			$(this.reports).each(function(i, r) {
				_this._reportLookup[r.id] = i;
			});
		},
		getReportWithId: function(id) {
			var index = this._reportLookup[id];
			
			if(index === undefined)
				return false;
				
			return this.reports[index] || false;
		},
		writeToDisk: function() {
			localStorage.setItem('reports', JSON.stringify(this.reports));
		},
		addReport: function(report, callback) {
			console.log('DataStore::addReport()');
			callback = callback || function() {};
			
			report.timestamp = Math.round((+new Date)/1000);
			report.id = MD5(JSON.stringify(report) + (window.device ? device.uuid : ''));
			report.status = RL.REPORTSTATUS.kNOTSENT;
			
			var _this = this,
				gpsHandled = false;;
			
			//console.log(JSON.stringify(report));
			
			var complete = function(success) {
				gpsHandled = true;
				_this._reportLookup[report.id] = _this.reports.length - 1;
				callback(success, report);
				$(window).trigger('data:changed');
			};
			
			if(navigator.geolocation) {
				console.log('Attempting to add GPS coords to report.');
				
				var timedOut = false,
					timeoutHandle = null;
				
				var success = function(position) {
					if(timedOut || gpsHandled)
						return;
					
					if(timeoutHandle)
						clearTimeout(timeoutHandle);
						
					console.log('GPS Successful ' + position.coords.latitude + ',' + position.coords.longitude + ' with accuracy ' + position.coords.accuracy + ' at timestamp ' + position.timestamp);
					report.lat = position.coords.latitude;
					report.lng = position.coords.longitude;
					report.gpsAccuracy = position.coords.accuracy;
					
					_this.reports.push(report);
					_this.writeToDisk();
					complete(true);
				};

				var error = function(error) {
					if(timedOut || gpsHandled)
						return;
						
					if(timeoutHandle)
						clearTimeout(timeoutHandle);
						
					console.log('GPS Failed');
					
					if(error && error.code) {
						switch(error.code) {
							case error.TIMEOUT:
								console.error('Geo: Timeout');
								break;
							case error.POSITION_UNAVAILABLE:
								console.error('Geo: Position unavailable');
								break;
							case error.PERMISSION_DENIED:
								console.error('Geo: Permission denied');
								break;
							case error.UNKNOWN_ERROR:
								console.error('Geo: Unknown error');
								break;
						}
					}
					
					_this.reports.push(report);
					_this.writeToDisk();
					complete(false);
				};

				navigator.geolocation.getCurrentPosition(success, error, {
					enableHighAccuracy: true,
					maximumAge: 45000,
					timeout: 2000
				});
			}
			else {
				this.reports.push(report);
				this.writeToDisk();
				callback(true, report);
			}
		},
		getReports: function() {
			return this.reports.slice(0);
		},
		getUnsentReports: function() {
			var data = this.reports.slice(0),
				unsent = [];
				
			$(data).each(function(i, d) {
				if(d.status === RL.REPORTSTATUS.kDATASENT && d.filepath) {
					// JSON sent but audio hasn't
					unsent.push(d);
				}
				else if(d.status === RL.REPORTSTATUS.kNOTSENT || d.status === undefined) {
					// No data sent to server
					unsent.push(d);
				}
			});
			
			return unsent;
		},
		removeAudioFileForReport: function(r) {
			if(window.requestFileSystem) {
				var onGetFileWin = function(file) {
					file.remove();
					console.log('Removed recording for report id: '+r.id+' ('+r.filepath+')');
					
					// Should we set the filepath to null here?
			    }
			
			    var onGetFileFail = function() {
					console.error("Failed to get a handle to file: "+r.filepath);
			    }

			    var onFSWin = function(fileSystem) {
					fileSystem.root.getFile(r.filepath, {create: false, exclusive: false}, onGetFileWin, onGetFileFail);
			    }

			    var onFSFail = function(evt) {
					console.error('Failed to get handle to local file system.');
					console.error(evt.target.error.code);
			    }
				
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSWin, onFSFail);
			}
		}
	});
});

define(['view', 'scrollview', 'reportheaderview', 'sonogram'], function() {
	RL.SurveyEndView = RL.View.extend({
		type: 'surveyendview',
		stretchY: true,
		title: 'Survey Result',
		cls: 'reportview',
		initialize: function(params) {
			params = params || {};
			
			var loaded = params.loaded || function() {};
			
			this._data = params.data;
			
			this.headerView = new RL.ReportHeaderView({
				modal: true,
				show_h2: true
			});
			
			// Load the correct subview based on the result of the survey
			var message = this._data.message < RL.ReportTypes.length ? this._data.message : 0,
				subViewClass = RL.ReportTypes[message].view;

			var scrollViewSubs = [new RL[subViewClass]()];
			
			// Show the sonogram for the survey
			scrollViewSubs.unshift(new RL.SonogramView({sonogram: this._data.sonogram, loaded: loaded}));
			
			params.subViews = [
				this.headerView,
				new RL.ScrollView({subViews: scrollViewSubs})
			];
			
			this.supr(params);
		},
		setupListeners: function() {
			var _this = this;
			
			this.elem.delegate('.dismiss-modal', 'touchstart', function(event) {
				event.preventDefault();
				window.app.dismissModalView();
			});
		},
		saveAndSubmitReport: function() {
			window.app.data.writeToDisk();
			window.app.dismissModalView();
			window.app.api.sendToServer();
		},
		data: function() {
			var d = $.extend({}, this._data, {
				cicadaFound: false
			});
			
			var cicada = RL.util.getInsectFromData(RL.INSECTS.kCICADA, this._data.insects);
			d.cicadaFound = cicada && cicada.found;
			
			return d;
		}
	});
	
	// There are various options for what to display in the bottom half of this view
	
	RL.SurveyEndNothingDetectedView = RL.View.extend({
		type: 'surveyend-partial',
		cls: 'nothing',
		template: [
			'<div class="divider">Did you know?</div>',
			'<div class="fact"></div>',
			'<div class="buttons">',
				'<button class="button">OK</button>',
			'</div>'
		],
		facts: [
		    "What you see above is called a sonogram or spectrogram. This is a visual representation of sound, and shows how frequencies (on the vertical axis) change over time (on the horizontal axis).",
		    "The cicada was first discovered in the New Forest in 1812.",
		    "The cicada has never been recorded in the New Forest earlier than the 13th of May or later than the 30th of July in any year.",
		    "Adults above the age of 40 often cannot hear the song of the cicada since it is too high pitched (around 14-15kHz).",
		    "The song we hear is the mating call of male individuals. Females only have 200 milliseconds to respond to this call, with a rapid wing click.",
		    "The last confirmed sighting of the cicada in the New Forest was in 1993, but there was one in 2000 which was not confirmed at the time.",
		    "The largest population of cicadas ever observed in the New Forest consisted of over 100 individuals.",
		    "The scientific name of the New Forest cicada is Cicadetta montana. This species is found in several other countries around the world.",
		    "The typical habitat of the New Forest cicada is warm, sunny, south-facing and sheltered slopes.",
		    "Cicadas stop singing when the wind blows, when the sun goes behind a cloud, and when they detect danger.",
		    "Young adults and children can hear the cicada from over 60m away.",
		    "The cicada lives underground as a nymph for 7-8 year, before emerging, turning into an adult, mating and finally dying, all in less than 6 weeks.",
		    "The cicada is an insect of the order Hemiptera, and not of the order Orthoptera as many people think. This means that it is more closely related to a bed bug than to a cricket or a grasshopper.",
		    "The cicada often flies up into the canopy. It is from there that you are likely to hear it singing."
		],
		setupListeners: function() {
			var _this = this;
			
			this.elem.delegate('.buttons button', 'touchstart', function() {
				var target = $(this).addClass('active');
				
				_this.elem.delegate('.buttons button', 'touchmove', function() {
					target.removeClass('active');
					_this.elem.undelegate('.buttons button', 'touchmove');
				});

			});
			
			this.elem.delegate('.buttons button', 'touchend', function() {
				if(!$(this).is('.active'))
					return;

				_this.getParentView().getParentView().saveAndSubmitReport();
			});
		},
		_destroy: function() {
			this.elem.undelegate('.buttons button', 'touchstart');
			this.elem.undelegate('.buttons button', 'touchend');
		},
		render: function() {
			var ret = this.supr();
			var count = window.app.data.getReports().length;
			var randomIndex = 0;
			if ( count > 1 ) {
				randomIndex = Math.floor(Math.random()*this.facts.length);
			}
			ret.find('.fact').html(this.facts[randomIndex]);
			
			return ret;
		}
	});
	
	RL.SurveyEndCicadaDetectedView = RL.View.extend({
		type: 'surveyend-partial',
		cls: 'cicada',
		template: [
			'<div class="divider">The cicada should look like this:</div>',
			'<img class="cicada" src="img/cicada-sonogram.png" />',
			'<div class="buttons">',
				'<button class="button" data-id="delete">Delete Recording</button>',
				'<button class="button" data-id="upload">Upload Recording</button>',
			'</div>'
		],
		setupListeners: function() {
			var _this = this;
			
			this.elem.delegate('.buttons button', 'touchstart', function() {
				var target = $(this).addClass('active');
				
				_this.elem.delegate('.buttons button', 'touchmove', function() {
					target.removeClass('active');
					_this.elem.undelegate('.buttons button', 'touchmove');
				});
			});
			
			this.elem.delegate('.buttons button', 'touchend', function() {
				var data = window.app.data.getReportWithId(_this.getParentView().getParentView().data().id);
				
				if(!$(this).is('.active'))
					return;

				var callBack = function(button) {
					if (button==1) {
						data.keep_recording = false;
						_this.getParentView().getParentView().saveAndSubmitReport();
					}
				};
					
				if($(this).data('id') == 'delete') {
					RL.confirm("Are you sure you want to delete the recording rather than uploading it for further analysis?", callBack, "Delete Recording", "Delete,Cancel");
				}	

				if($(this).data('id') == 'upload') {
					_this.getParentView().getParentView().saveAndSubmitReport();
				}
					
			});
		},
		_destroy: function() {
			this.elem.undelegate('.buttons button', 'touchstart');
			this.elem.undelegate('.buttons button', 'touchend');
		}
		
	});
	
	RL.SurveyEndInsectDetectedView = RL.View.extend({
		type: 'surveyend-partial',
		cls: 'insect',
		template: [
			'<div class="divider">We think it could be one of these:</div>',
			'<ul class="insects">',
				'{{#possible_insects}}',
					'<li data-id="{{insect}}">',
						'{{#if name}}',
							'<span class="sonogram"><img src="img/insect-sonogram-id-{{insect}}.png" /></span>',
							'<span class="title">{{name}}</span>',
						'{{/if}}',
					'</li>',
				'{{/possible_insects}}',
			'</ul>',
			'<div class="buttons">',
				'<button class="button" data-id="delete">Delete Recording</button>',
				'<button class="button" data-id="upload">Upload Recording</button>',
			'</div>'
		],
		setupListeners: function() {
			var _this = this;
			
			this.elem.delegate('ul.insects li', 'touchstart', function(event) {
				var target = $(event.target).closest('ul.insects li');
				
				if(target.data('id') == undefined)
					return;
				
				target.addClass('pressed');

				_this.elem.delegate('ul.insects li', 'touchmove', function() {
					target.removeClass('pressed');
					_this.elem.undelegate('ul.insects li', 'touchmove');
				});
			});
			
			this.elem.delegate('ul.insects li', 'touchend', function(event) {
				var target = $(event.target).closest('ul.insects li');
				
				_this.elem.undelegate('ul.insects li', 'touchmove');
				
				if(target.is('.pressed')) {
					_this.elem.find('ul.insects li').removeClass('selected').removeClass('pressed');
					target.addClass('selected');					
				}
			});
			
			this.elem.delegate('.buttons button', 'touchstart', function() {
				var target = $(this).addClass('active');
				
				_this.elem.delegate('.buttons button', 'touchmove', function() {
					target.removeClass('active');
					_this.elem.undelegate('.buttons button', 'touchmove');
				});
			});
			
			this.elem.delegate('.buttons button', 'touchend', function() {
				// Get a copy of the raw untouched data for this report
				var data = window.app.data.getReportWithId(_this.data().id),
					selectedInsectId = _this.elem.find('li.selected').data('id');
				
				if(!$(this).is('.active'))
					return;
				
				$(this).removeClass('active');
				
				if(selectedInsectId === undefined) {
					RL.alert('Please select an insect that best matches your recording.', function(){}, 'Almost Done', 'OK');
					return;
				}
				
				// Find the selected insect
				$(data.insects).each(function(i, insect) {
					if(insect.insect == selectedInsectId)
						insect.user_selected = true;
				});

				var callBack = function(button) {
					if (button==1) {
						data.keep_recording = false;
						_this.getParentView().getParentView().saveAndSubmitReport();
					}
				};
					
				if($(this).data('id') == 'delete') {
					RL.confirm("Are you sure you want to delete the recording rather than uploading it for further analysis.", callBack, "Delete Recording", "Delete,Cancel");
				}	

				if($(this).data('id') == 'upload') {
					_this.getParentView().getParentView().saveAndSubmitReport();
				}

					
			});
		},
		render: function() {
			var ret = this.supr();
			
			// If we have images then updated iScroll once they've loaded
			var _this = this,
				images = ret.find('img');
			
			if(images.length) {
				var loaded = 0;
				
				images.each(function(i, img) {
					var image = new Image();
					image.onload = function() {
						loaded++;
						
						if(loaded >= images.length) {
							_this.getParentView().refresh();
						}
					}
					
					image.src = $(img).attr('src');
				});
			}
			
			return ret;
		},
		_destroy: function() {
			this.elem.undelegate('ul.insects li', 'touchstart');
			this.elem.undelegate('ul.insects li', 'touchend');
			
			this.elem.undelegate('.buttons button', 'touchstart');
			this.elem.undelegate('.buttons button', 'touchend');
		},
		data: function() {
			var d = this.getParentView().getParentView().data();
			
			d.possible_insects = [];
			
			$(d.insects).each(function(i, insect) {
				if(true || insect.insect != RL.INSECTS.kCICADA) {
					d.possible_insects.push(insect);
				}
			});
			
			if(d.possible_insects.length < 4) {
				while(d.possible_insects.length < 4) {
					//d.possible_insects.push(d.insects[d.insects.length-1]);
					d.possible_insects.push({});
				}
			}
			
			// Limit the array to 4
			d.possible_insects.length = 4;
			
			return d;
		},
		didAppear: function() {
			this.supr();
			
			var _this = this;
			
			setTimeout(function() {
				_this.getParentView().refresh();
			}, 50);
		}
	});
});

define(['view'], function() {
	RL.TabBar = RL.View.extend({
		type: 'tabbar',
		initialize: function(params) {
			params = params || {};
			
			this.changeCallback = params.callback || function() {};
			
			this.tabs = params.tabs || {};
			this.supr(params);
		},
		render: function() {
			var elem = this.supr();
			
			$(this.tabs).each(function(i, v) {
				var btn = $('<button/>').html(v.getTitle()).data('index', i).addClass(v.cls).removeClass('view');
				elem.append($('<div/>').append(btn));
			});
			
			// elem.find('div').first().find('button').addClass('selected');
			
			return elem;
		},
		setupListeners: function() {
			var _this = this;
			
			this.elem.delegate('button', 'touchstart', function(event) {
				var target = $(event.target),
					index = target.data('index');
				
				_this.changeCallback(index);
			});
		},
		selectTab: function(index) {
			this.elem.find('.selected').removeClass('selected');
			this.elem.find('div').eq(index).addClass('selected');
			// 
			// this.elem.find('button').each(function(i, b) {
			// 	b.parentNode.style.cssText += ';-webkit-transform:rotateZ(0deg)';
			// 	b.parentNode.offsetHeight;
			// 	b.parentNode.style.cssText += ';-webkit-transform:none';
			// 	
			// 	console.log('HACK!');
			// });
		}
	});
});

// requestAnimation shim by Erik Möller 
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelRequestAnimationFrame = window[vendors[x]+
          'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
		console.log("No native support for requestAnimationFrame, adding a shim");
		
		 window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	}
       

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// JSON Parse polyfill to prevent falling over on null values on some Android implementations
(function(){
	var _parse = JSON.parse;
	
	JSON.parse = function(text){
		if (text != null) {
			return _parse(text);
		} else {
			// no longer crashing on null value but just returning null
			return null;
		}
	}
	
})();

define([], function() {
	var _autoIncrement = 0;
	
	RL.util = {
		autoIncrement: function() {
			return ++_autoIncrement;
		},
		getInsectFromData: function(type, data) {
			var found = false;
			
			$(data).each(function(i, insect) {
				if(insect.insect == type)
					found = insect;
			});
			
			return found;
		}
	};
	
	// Helper functions for device detection
	RL.device = {
		is: {
			android: function() {
				return window.device ? window.device.platform == 'Android' : false;
			},
			iOS: function() {
				return window.device ? window.device.platform == 'iOS' : false;
			},
			iPhone3G: function() {
				return window.device ? window.device.model == 'iPhone1,2' : false;
			},
			iPhone3GS: function() {
				return window.device ? window.device.model == 'iPhone2,1' : false;
			},
			iPhone4: function() {
				return window.device ? window.device.model == 'iPhone3,1' || window.device.model == 'iPhone3,2' || window.device.model == 'iPhone3,3' : false;
			},
			iPhone4S: function() {
				return window.device ? window.device.model == 'iPhone4,1' : false;
			},
			iPhone4S: function() {
				return window.device ? window.device.model == 'iPhone5,1' || window.device.model == 'iPhone5,2' : false;
			},
			iPod3G: function() {
				return window.device ? window.device.model == 'iPod3,1' : false;
			},
			iPod4G: function() {
				return window.device ? window.device.model == 'iPod4,1' : false;
			},
			iPod5G: function() {
				return window.device ? window.device.model == 'iPod5,1' : false;
			}
		}
	};
});

define(['view', 'navbar'], function() {
	RL.NavBar = RL.View.extend({
		type: 'navbar',
		initialize: function(params) {
			params = params || {};
			
			// var _this = this;
			// 
			// this.mainView = new RL.View();
			// 
			// this.mainView.addClass('display stretch-y');
			// 
			// this.navBar = new RL.NavBar({
			// });
			// 
			// params.subViews = [
			// 	this.mainView,
			// 	this.navBar
			// ]
			
			params.subViews = this.buildSubViews(params.view, params.showBack);
			
			this.backCallback = params.backCallback || function() {};
			
			this.supr(params);
		},
		setupListeners: function() {
			var _this = this;
			
			this.elem.delegate('.left', 'touchend', function(event) {
				_this.backCallback();
			});
		},
		buildSubViews: function(view, showBack) {
			var leftParams = {};
			
			if(showBack) {
				leftParams.template = '<button>Back</button>';
			}
			
			var left = new RL.View(leftParams);
			var right = new RL.View();
			
			var title = new RL.View({
				template: [
					'<span>',
						view.getTitle(),
					'</span>'
				]
			});
			
			left.addClass('left');
			right.addClass('right');
			title.addClass('title');
			
			
			
			return [left, title, right];
		}
	});
});

define(['listview', 'reportview'], function() {
	RL.ReportsView = RL.View.extend({
		cls: 'prev-reports',
		title: 'Reports',
		initialize: function(params) {
			params = params || {};
			
			params.subViews = [
				new RL.ReportsListSummaryView({ title: 'Reports' }),
				new RL.ScrollView({ subViews: [ new RL.ReportsListView({ title: 'Reports' }) ]})
			];
	
			this.supr(params);
		},
		setupListeners: function() {
			var _this = this;

			_this.uploading = false;

			this._apiSentHander = function() {
				console.log('api:sent - lets update the view');
				_this.didAppear();
			};

			this._apiStartUploadHander = function() {
				_this.uploading = true;
				_this.render();
			};

			this._apiStopUploadHander = function() {
				_this.uploading = false;
				_this.render();
			};

			$(window).on('api:sent', _this._apiSentHander);
			$(window).on('api:startUpload', _this._apiStartUploadHander);
			$(window).on('api:stopUpload', _this._apiStopUploadHander);
		},
		_destroy: function() {
			$(window).off('api:sent', this._apiSentHander);
			$(window).off('api:startUpload', this._apiStartUploadHander);
			$(window).off('api:stopUpload', this._apiStopUploadHander);
		},
		getNumberOfReports: function() {
			return window.app.data.getReports().length;
		},
		getNumberOfUploadedReports: function() {
			var reports = window.app.data.getReports(),
				uploaded = 0;
			$(reports).each(function(i, d) {
				if((d.status === RL.REPORTSTATUS.kDATASENT && !d.filepath) || d.status === RL.REPORTSTATUS.kDATAANDPAYLOADSENT) {
					uploaded++;
				}
			});
			return uploaded;			
		},
	});
	
	RL.ReportsListSummaryView = RL.View.extend({
		cls: 'prev-reports-summary',
		title: 'Reports',
		template: [
			'<div>{{text}}</div>'
		],
		data: function() {

			var numberOfReports = this.getParentView().getNumberOfReports();
			var numberOfUploadedReport = this.getParentView().getNumberOfUploadedReports();

			if( this.getParentView().uploading ) {

				var reportsLeftToUpload = numberOfReports-numberOfUploadedReport;

				if ( reportsLeftToUpload == 1 ) {

					return {
						text: 'UPLOADING REPORT'
					};


				} else {

					return {
						text: 'UPLOADING REPORTS - ' + reportsLeftToUpload + ' TO UPLOAD'
					};

				}

			} else {

				return {
					text: numberOfUploadedReport + ' UPLOADED / ' + numberOfReports + ' REPORTS'
				};

			}

		}
	});
	
	RL.ReportsListView = RL.ListView.extend({
		cls: 'reports',
		title: 'Reports',
		stretchY: true,
		template: [
			'<div class="list-cell">',
				'<div class="date">{{dateString}}</div>',
				'<div class="insects">{{insectsString}}</div>',
			'</div>'
		],
		render: function() {
			var ret = this.supr();
			
			if(this.getRowCountForGroup(1) == 0)
				ret.addClass('empty');
			else
				ret.removeClass('empty');
			
			return ret;
		},
		rowSelected: function(index) {
			var _this = this, v;
			
			var	r = this.getDataForRowAndGroup(index),
				loaded = function() {
					// We may need to load the sonogram image asynchronously
					_this.getParentView().getParentView().navView.pushView(v);
				};
				
			v = new RL.ReportView({
				data: r,
				loaded: loaded
			});
		},
		didAppear: function() {
			console.log('ReportsListView.didAppear()');
			this.supr();
			
			this._data = window.app.data.getReports();
			
			this._data.sort(function(a, b) {
				return a.timestamp < b.timestamp ? 1 : -1;
			});
			
			this.render();
			
			var _this = this;
			
			setTimeout(function() {
				var p = _this.getParentView();
				
				if(p.type != 'scroll')
					p = null;
				
				if(_this.elem.hasClass('empty')) {
					_this.elem.height(_this.elem.closest('.content').height());
					
					if(p)
						p.disableScroll();
				}
				else {
					_this.elem.height('auto');
					
					if(p)
						p.enableScroll();
				}
			}, 50);
			
		},
		getRowCountForGroup: function(group) {
			return this._data.length;
		},
		getDataForRowAndGroup: function(index, group) {

			var d = $.extend({}, this._data[index]);

			switch(d.message) {
				case 0:
					d.insectsString = 'No Cicada Detected';
					break;
				case 1:
					d.insectsString = 'Sounds Interesting';
					break;
				case 2:
					d.insectsString = 'Possible Cicada Detected';
					break;
			}

			d.dateString = moment.unix(d.timestamp).format('DD/MM/YY @ h:mmA');
			
			return d;
		},
		rowBuilt: function(cell, index, group) {
			cell.addClass('right-arrow');
			
			var d = this.getDataForRowAndGroup(index, group);
			
			// Check if the data has been sent to the server or not
			if( (d.status === RL.REPORTSTATUS.kDATASENT && d.filepath) || (d.status === RL.REPORTSTATUS.kNOTSENT || d.status === undefined) )
				cell.addClass('not-sent-to-server');
		}
	});
});

define(['view', 'scrollview', 'reportheaderview', 'sonogram'], function() {
	RL.SonogramView = RL.View.extend({
		type: 'sonogram',
		template: [
			'<img src="" />'
		],
		initialize: function(params) {
			this.supr(params);
			
			var loaded = params.loaded || function() {};
			
			var imgPath = params.sonogram,
				_this = this;
		
			if(!window.CicadaDetector.isShim) {
				var reader = new FileReader();
			    reader.onloadend = function(evt) {
			        _this.imgSrc = evt.target.result;
					
					// Ensure the callback is async
					setTimeout(function() {
						loaded();
					}, 10)
			    };
			
				console.log('FileReader.readAsDataURL('+imgPath+')');
			    reader.readAsDataURL(imgPath);
			}
			else {
				this.imgSrc = imgPath;
				setTimeout(function() {					
					loaded();
				}, 10);
			}
		},
		render: function() {
			var ret = this.supr();
		
			ret.find('img').attr('src', this.imgSrc);
		
			return ret;
		}
	});
});

define(['zepto-rjs', 'util'], function() {	
	RL.View = klass({
		template: [],
		type: 'view',
		cls: '',
		stretchY: false,
		initialize: function(params) {
			params = params || {};
			
			this.id = RL.util.autoIncrement();
			
			var _this = this;
			
			this._data = params.data || this._data || {};
			this._title = params.title || "";
			this.template = params.template || this.template;
			this.stretchY = params.stretchY || this.stretchY;
			
			if(params.classes)
				this.cls = this.cls + ' ' + params.classes;
				
			this.subViews = [];
			
			$(params.subViews).each(function(i, v) {
				v.setParentView(_this);
				_this.subViews.push(v);
			});
			
			this.compiledTemplate = Handlebars.compile(this.processTemplate(this.template));
			this.elem = $('<div></div>').addClass(this.type+' '+this.cls).addClass('view view-'+this.id);
			
			if(this.stretchY)
				this.elem.addClass('stretch-y');
			
			this.setupListeners();
		},
		// Function called when a view is no longer needed
		_destroy: function() {
			
		},
		destroy: function() {			
			$(this.subViews).each(function(i, v) {
				v.destroy();
			});
			
			var _this = this;
			
			setTimeout(function() {
				_this._destroy();
			}, 50);
		},
		setModal: function(modal) {
			console.log('View::setModal()');
			modal = modal === undefined ? true : modal;
			
			this._isModal = modal;
		},
		surface: function() {
			return this.elem;
		},
		setupListeners: function() {
			
		},
		setParentView: function(view) {
			this._parentView = view;
		},
		getParentView: function() {
			return this._parentView;
		},
		addClass: function(cls) {
			this.elem.addClass(cls);
		},
		removeClass: function(cls) {
			this.elem.removeClass(cls);
		},
		render: function() {
			this.elem.html('');
			
			if(this.subViews.length) {
				var _this = this;

				$(this.subViews).each(function(i, v) {
					_this.elem.append(v.render());
				});

				return this.elem;
			}
			else {
				return this.elem.append(this.renderTemplate(this.data()));
			}
		}, 
		renderTemplate: function(data) {
			data = data || {};
			return this.compiledTemplate(data);
		},
		processTemplate: function(template) {
			template = template || [];

			if(template instanceof Array)
				return template.join('');
			else
				return template;
		},
		data: function() {
			return this._data || {};
		},
		didAppear: function() {
			$(this.subViews).each(function(i, v) {
				v.didAppear();
			});
		},
		didDisappear: function() {
			$(this.subViews).each(function(i, v) {
				v.didDisappear();
			});
		},
		getTitle: function() {
			return this._title || "";
		},
		nextResponder: function() {
			return this.subViews.length ? this.subViews[0] : false;
		},
		
		/**
		 * Called to give this View the chance to handle the back button event
		 * @returns {Boolean} Did this view use the event
		 */
		
		processBackButton: function() {
			return false;
		},
		
		/**
		 * Propogates the back button event down the View heirachy
		 * @returns {Boolean} If the backbutton has been handled or not
		 */
		
		handleBackButton: function() {
			var nextResponder = this.nextResponder(),
				nextResponderHandledBackButton = false;
			
			if(nextResponder)	
				nextResponderHandledBackButton = nextResponder.handleBackButton();
				
			return nextResponderHandledBackButton || this.processBackButton();
		}
	})
});

define(['scrollview', 'media'], function() {
	RL.HTMLView = RL.ScrollView.extend({
		cls: 'html',
		initialize: function(params) {
			params = params || {};
			
			this.supr(params);
			this.filename = params.filename;
			
			var _this = this;

			this.html = null;
			this._loaded = false;
			this._loadedSuccessful = false;
			this._loadedCallbacks = [];
			
			this._media = [];
			
			var win = function(content) {
				// On iOS the Ajax request succeeds but returns an empty string if the file doesn't exist
				if(content == "") {
					fail();
					return;
				}
				
				var body = content.match(/<body>[\s\S]*<\/body>/)[0];
				
				_this.html = _this.processHTML(body);
				
				_this._loadedSuccessful = true;
				_this._loaded = true;
				
				$(_this._loadedCallbacks).each(function(i, fn) {
					fn(_this._loadedSuccessful);
				});
			};
			
			var fail = function() {
				_this._loadedSuccessful = false;
				_this._loaded = true;
				
				$(_this._loadedCallbacks).each(function(i, fn) {
					fn(_this._loadedSuccessful);
				});
			};
			
			// Load the file via AJAX
			$.ajax({
				url: 'html/'+this.filename+'.html',
				success: win,
				error: fail,
				dataType: 'html'
			});
		},
		processHTML: function(html) {
			var _this = this;
			
			// Make sure all references to media still work
			html = html.replace(/"media\/(.*?)"/gm, '"html/media/$1"');

			// Turn into a Zepto object
			html = $('<div>'+html+'</div>');
			
			// Ensure all links open in the default browser
			html.find('a').each(function(i, a) {
				a = $(a);
				
				if(!a.attr('href').match(/^mailto/))
					a.attr('target', '_blank');
			});
			
			// If we have images then updated iScroll once they've loaded
			var images = html.find('img');
			
			if(images.length) {
				var loaded = 0;
				
				images.each(function(i, img) {
					var image = new Image();
					image.onload = function() {
						loaded++;
						
						if(loaded >= images.length) {
							_this.refresh();
						}
					}
					
					image.src = $(img).attr('src');
				});
			}
			
			
			// Wrap videos with a play button (iOS HTML5 Video workaround)
			if(/iOS|iPhone|iPad/.test(window.navigator.userAgent)) {
				html.find('video').wrap('<div class="video-container"></div>');
				html.find('.video-container').append('<button class="play"></button>');
				
				this.surface().delegate('.video-container .play', 'click', function(event) {
					var target = $(this),
						video = target.closest('.video-container').find('video').get(0);
			
					video.play();
				});
			}
			
			// Cordova 2.3 changed how links are handled - we need to tell both platforms to load in external browsers
			this.surface().delegate('a[target="_blank"]', 'click', function(event) {
				event.preventDefault();
				if(navigator.app)
					navigator.app.loadUrl($(event.target).attr('href'), {openExternal: true});
				else
					window.open($(event.target).attr('href'), '_system');
			});
			
			return html;
		},
		didAppear: function() {
			this.supr();
			
			this._media.length = 0;
			
			var _this = this;
			
			this.surface().find('audio:not(.processed)').each(function(i, a) {
				if(RL.Media && window.device) {
					// Use native PhoneGap call where possible
					var am = new RL.Media.Audio(a);
					_this._media.push(am);
				}
				else {
					_this._media.push(a);
				}
				
				$(a).addClass('processed');
			});
			
			// Center the play buttons
			this.surface().find('.video-container').each(function(i, elem) {
				elem = $(elem);
				var height = elem.find('video').height(),
					button = elem.find('.play'),
					buttonHeight = button.height();
					
				button.css('top', ((height - buttonHeight) / 2) + 'px');
			});
		},
		didDisappear: function() {
			this.supr();
			
			$(this._media).each(function(i, a) {
				if(a.stop) {
					// Our custom PhoneGap powered object has a stop button
					a.stop();
				}
				else {
					// Native HTML5 has no stop() function (wtf?)
					try {
						a.pause();
						a.currentTime = 0;
					}
					catch(e) {
						console.log(e);
					}
				}
			});
		},
		render: function() {
			this.elem.append(this.html);
			return this.wrapper;
		}, 
		loaded: function(callback) {
			callback = callback || function() {};
			
			if(this._loaded)
				callback(_this._loadedSuccessful);
			else
				this._loadedCallbacks.push(callback);
		}
	});
});

define(['lib/zepto'], function() {
    require(['lib/zepto']);
    return this.Zepto;
});

define(['view'], function() {
	RL.LoadingView = RL.View.extend({
		cls: 'loadingview',
		initialize: function(params) {
			this.supr(params);
			this.overlay = $('<div class="overlay"></div>').css({
				position: 'absolute',
				top: '0px',
				left: '0px',
				width: '100%',
				height: '100%'
			});
			this.spinner = $('<div class="spinner"></div>').appendTo(this.overlay);
			this.label = $('<div class="label"></div>').appendTo(this.overlay);
			this.elem.append(this.overlay);
		},

		render: function() {
			return this.elem;
		},

		show: function(view) {
			console.debug('LoadingView::attatchToView()');
			var surface = window.app.elem;
			surface.css({
				position: 'relative'
			});
			
			var thisSurface = this.surface();

			surface.append(thisSurface);
			
			var _this = this;
			
			setTimeout(function() {
				_this.overlay.css('opacity', 1);
				_this.spinner.addClass('grow');
			}, 10)
			
		},

		dismiss: function() {
			this.surface().css('opacity', 0);
			
			var _this = this;
			
			setTimeout(function() {
				_this.surface().remove();
				_this.spinner.removeClass('success failure');
				_this.setLabel('');
			}, 500);
			
		},

		setLabel: function(l) {
			this.label.html(l);
		}
	});
});

// Define a namespace
window.RL = {
	_cordovaReadyFired: false
};

if(window.PhoneGap || window.Cordova || window.cordova) {
	document.addEventListener("deviceready", function () {
	    if(window.app) {
			window.app.ready();
		}
		else {
			RL._cordovaReadyFired = true;
			console.log('Cordova is ready but window.app is not yet defined');
		}
	}, false);
}

// Helper function for an alert dialog that works in both the browser and native cordova code
RL.alert = function(message, alertCallback, title, buttonName) {
	if(navigator.notification && navigator.notification.alert)
		navigator.notification.alert(message, alertCallback, title, buttonName);
	else {
		alert(message);
		
		if(alertCallback)
			alertCallback();
	}
};

// Helper function for an confirm dialog that works in both the browser and native cordova code
RL.confirm = function(message, confirmCallback, title, buttonLabels) {
	if(navigator.notification && navigator.notification.confirm)
		navigator.notification.confirm(message, confirmCallback, title, buttonLabels);
	else {
		var response = confirm(message);
		
		if(confirmCallback)
			confirmCallback(response == true ? 1 : 2); // Mimic the Cordova implementation
	}
};

// We can remove this block when we go live - just to help with dev (cache busting)
if(/iOS/.test(window.navigator.userAgent)) {
	require.config({
	    urlArgs: "bust=" + (new Date()).getTime()
	});
}

// Define the strings and views used for different types of reports
RL.ReportTypes = [
	{
		h1: 'No Cicada Detected',
		h2: "Recording will not be saved",
		view: 'SurveyEndNothingDetectedView'
	},
	{
		h1: 'Sounds Interesting',
		h2: "Upload the recording for analysis",
		view: 'SurveyEndInsectDetectedView'
	},
	{
		h1: 'Possible Cicada Detected',
		h2: "Upload the recording for analysis",
		view: 'SurveyEndCicadaDetectedView'
	}
];

require(['tabview', 'navview', 'infoview', 'scrollview', 'surveyview', 'data', 'reportslistview', 'api'], function() {
	var app = klass({
		initialize: function() {
			console.log('app.intialize');
			this.elem = $('<div/>').addClass('app');

			$('body').append(this.elem);
			
			this.infoView = new RL.InfoView({title: 'Information'});
			this.reportsView = new RL.ReportsView({ title: 'Reports' });
			
			this.view = new RL.TabView({
				subViews: [
					new RL.SurveyView({ title: 'Survey' }),
					new RL.NavView({ 
						classes: 'info', title: 'Info', rootView: new RL.ScrollView({ subViews: [this.infoView] })
					}),
					new RL.NavView({ 
						classes: 'reports', title: 'Reports', rootView: this.reportsView
					})
				],
				tabBarPosition: $.os.android ? RL.kTABS_AT_TOP : RL.kTABS_AT_BOTTOM
			});
			
			this.data = new RL.DataStore();
			this.api = new RL.API();
		},
		ready: function() {
			console.log('app.ready()');
			
			var _this = this;
			
			// Listen for backbutton presses
			document.addEventListener("backbutton", function(event) {
				console.log('Back button pressed');
				_this.handleBackButton(event);
			}, true);
			
			document.addEventListener("pause", function(event) {
				_this.view.didDisappear();
			}, false);
			
			document.addEventListener("resume", function(event) {
				_this.view.didAppear();
			}, false);
			
			$(window).on('data:changed', function() {
				var count = _this.data.getUnsentReports().length;
				console.log('Update app badge count ('+count+')');
				CicadaDetector.setApplicationIconBadgeNumber(count);
			});
			
			if(window.device)
				$('html').addClass(device.platform.toLowerCase());
			
			this.render();
			
			if(navigator.splashscreen) {
				setTimeout(function() {
					navigator.splashscreen.hide();
				}, 800);
			}
			
			var success = function(position) {
				console.log('Initial GPS location on app launch ' + position.coords.latitude + ',' + position.coords.longitude + ' with accuracy ' + position.coords.accuracy + ' at timestamp ' + position.timestamp);
			};

			var error = function(error) {
				console.log('GPS Failed');
				if(error && error.code) {
					switch(error.code) {
						case error.TIMEOUT:
							console.error('Geo: Timeout');
							break;
						case error.POSITION_UNAVAILABLE:
							console.error('Geo: Position unavailable');
							break;
						case error.PERMISSION_DENIED:
							console.error('Geo: Permission denied');
							break;
						case error.UNKNOWN_ERROR:
							console.error('Geo: Unknown error');
							break;
					}
				}
			};


			if(navigator.geolocation) {
				setTimeout(function() {
					navigator.geolocation.getCurrentPosition(success, error, {
						enableHighAccuracy: true,
						maximumAge: 0,
						timeout: 25000
					});
				}, 50);
			}

			if(window.CicadaDetector)
				window.CicadaDetector.initialiseDetector();
			
			setTimeout(function() {
				_this.api.sendToServer();
			}, 10000);
		},
		render: function() {
			console.log('app.render()');
			this.elem.append(this.view.render());
			
			var _this = this;
			
			setTimeout(function() {
				_this.view.didAppear();
			}, 100);
		},
		showModalView: function(view, callback) {
			callback = callback || function() {};
			
			view.setModal();
			
			var s = view.render(),
				modal = $('<div/>').addClass('modal transition-from-below transition').append(s);
						
			this.elem.append(modal);
			view.didAppear();
			this.view.didDisappear();
			
			this.modalView = view;
			
			var end = function(event) {
				modal.unbind('webkitTransitionEnd', end);
				
				callback();
			};
			
			modal.bind('webkitTransitionEnd', end);
			
			setTimeout(function() {
				modal.removeClass('transition-from-below');
			}, 50);
		},
		dismissModalView: function() {
			if(this.modalView) {
				var _this = this,
					s = _this.modalView.surface().closest('.modal');
					
				var end = function(event) {
					s.unbind('webkitTransitionEnd', end);
					
					s.remove();
					_this.modalView.setModal(false);
					_this.modalView.didDisappear()
					_this.modalView.destroy();
					_this.view.didAppear();
				};
				
				s.bind('webkitTransitionEnd', end);
				
				setTimeout(function(){
					s.addClass('transition-from-below');
				}, 50);
			}
		},
		handleBackButton: function(event) {
			var backButtonHandled = this.view.handleBackButton();
			
			if(!backButtonHandled && this.modalView) {
				backButtonHandled = this.modalView.handleBackButton();
				
				if(!backButtonHandled) {
					this.dismissModalView();
					backButtonHandled = true;
				}
			}
			
			if(!backButtonHandled) {
				console.log('Back button not handled');
				
				if(navigator.app && navigator.app.exitApp)
					navigator.app.exitApp();
			}
			else
				event.preventDefault();
		}
	});
	
	window.app = new app();
	
	if((!window.PhoneGap && !window.Cordova && !window.cordova) || RL._cordovaReadyFired) {
		$(function() {
			window.app.ready();
		});
	};
});

define(['view'], function() {
	RL.ScrollView = RL.View.extend({
		type: 'scroll',
		initialize: function(params) {
			params = params || {};
			
			params.title = params.title || ((params.subViews && params.subViews.length) ? params.subViews[0].getTitle() : '');
			
			this.supr(params);
			
			this.wrapper = $(this.elem.get(0)).addClass('scroll stretch-y');
			this.elem = $('<div class="content"></div>').appendTo(this.wrapper);
			
			var _this = this;
			
			if(this.subViews.length) {
				$(this.subViews[0].cls.split(' ')).each(function(i, c) {
					if(c !== '')
						_this.wrapper.addClass(c+'-wrapper');
				});
			}
			
			this.iScrollSetup();
		},
		// setupListeners: function() {
		// 	var _this = this;
		// 	
		// 	this.elem.delegate('button', 'touchend', function(event) {
		// 		var newView = new RL.View({
		// 			title: 'testing 123',
		// 			template: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		// 		});
		// 		
		// 		_this.navView.pushView(newView);
		// 	});
		// },
		iScrollSetup: function() {
			if(this.scroller)
				this.scroller.destroy();
				
			this.scroller = new iScroll(this.wrapper.get(0), {
				hScroll: false,
				// useTransform: false,
				// onBeforeScrollStart: function (e) {
				// 	var target = e.target;
				// 	while (target.nodeType != 1) target = target.parentNode;
				// 
				// 	if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA' && $(target).attr('contenteditable') == null)
				// 		e.preventDefault();
				// }
			});
		},
		enableScroll: function() {
			this.iScrollSetup()
		},
		disableScroll: function() {
			if(this.scroller)
				this.scroller.destroy();
				
			this.scroller = null;
		},
		didAppear: function() {
			this.supr();
			this.elem.css('min-height', this.wrapper.height());
			this.refresh();
		},
		refresh: function() {
			var _this = this;
			
			setTimeout(function() {
				if(_this.scroller)
					_this.scroller.refresh();
			}, 50);
		},
		render: function() {
			this.supr();
			return this.wrapper;
		},
		surface: function() {
			return this.wrapper;
		}
	});
});

define(['view', 'tabbar'], function() {
	RL.kTABS_AT_TOP = 100;
	RL.kTABS_AT_BOTTOM = 101;
	
	RL.TabView = RL.View.extend({
		type: 'tabview',
		stretchY: true,
		
		initialize: function(params) {
			params = params || {};
			
			params.tabBarPosition = params.tabBarPosition || RL.kTABS_AT_BOTTOM;
			
			var _this = this;
			
			this.mainView = new RL.View();
			
			this.mainView.addClass('display stretch-y');
			
			this.tabs = params.subViews;
			
			this.tabBar = new RL.TabBar({
				tabs: this.tabs,
				callback: function(index) {
					_this.showTab(index);
				}
			});
			
			params.subViews = [
				this.mainView
			];
			
			if(params.tabBarPosition == RL.kTABS_AT_BOTTOM)
				params.subViews.push(this.tabBar);
			else
				params.subViews.unshift(this.tabBar);
			
			
			this.supr(params);
			
			this.selectedIndex = undefined;
		},
		currentTab: function() {
			return this.tabs[this.selectedIndex];
		},
		showTab: function(index) {
			if(index >= 0 && index < this.tabs.length) {
				var oldView = this.tabs[this.selectedIndex],
					newView = this.tabs[index];
				
				// Catch a bug where tapping the survey tab whilst recording causes a crash
				if(index == this.selectedIndex) {
					if(oldView && oldView.type == 'survey' && oldView.data().surveying)
						return;
				}
				
				this.mainView.surface().html('');

				if(oldView)	{
					oldView.didDisappear();
				}

				var elem = newView.render();
				this.mainView.surface().append(elem);
				newView.didAppear();

				this.tabBar.selectTab(index);

				this.selectedIndex = index;
				
				// Tell the nav view to go back to the start
				if(newView.type == 'navview' && window.device && window.device.platform == 'Android') {
					newView.popAllViews();
				}
			}
		},
		didAppear: function() {
			//this.supr();
			
			this.showTab(this.selectedIndex !== undefined ? this.selectedIndex : 0);
		},
		didDisappear: function() {
			this.currentTab().didDisappear();
		},
		nextResponder: function() {
			return this.currentTab();
		}
	});
});

define(['listview', 'htmlview'], function() {
	RL.InfoView = RL.ListView.extend({
		cls: 'info',
		template: [
			'<div class="list-cell">',
				'<span class="title">{{title}}</span>',
				'<span class="sub">{{sub}}</span>',
			'</div>'
		],
		_data: [
			// Group
			{
				title: "The Context",
				rows: [
					{ 
						title: 'The New Forest Cicada', 
						sub: '', 
						filename: device.platform+'_the-nfc' // name of the html file (without the extension)
					},
					{ 
						title: 'The New Forest', 
						sub: '', 
						filename: device.platform+'_the-nf' // name of the html file (without the extension)
					}
				]
			},
			// Group
			{
				title: "The Project and the App",
				rows: [
					{ 
						title: 'Project and Technology', 
						sub: '', 
						filename: device.platform+'_the-app' // name of the html file (without the extension)
					},
					{ 
						title: 'How to Use the App', 
						sub: '', 
						filename: device.platform+'_how-to' // name of the html file (without the extension)
					},
					{ 
						title: 'Quick Tips', 
						sub: '', 
						filename: device.platform+'_quick-tips' // name of the html file (without the extension)
					}
				]
			},
			// Group
			{
				title: "Your Device",
				rows: [
					{
					        title: 'Device ID',
					        sub: device.uuid
				        }
				]
			}
		],
		grouped: true,
		getGroupHeader: function(group) {
			return this._data[group].title;
		},
		getGroupCount: function() {
			return this._data.length;
		},
		getRowCountForGroup: function(group) {
			return this._data[group].rows.length;
		},
		getDataForRowAndGroup: function(index, group) {
			return this._data[group].rows[index];
		},
		rowSelected: function(index, group) {
			var d = this.getDataForRowAndGroup(index, group);
			
			if (d.filename){
			        var v = new RL.HTMLView({
				        title: d.title,
				        filename: d.filename,
				        template: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			        });
			
			        var _this = this;
			
			        v.loaded(function(success) {
				        if(success)
					        _this._parentView.navView.pushView(v);
				        else {
					        RL.alert("Sorry, there was an error loading the content for this item.", null, "Oops");
					        console.error('Failed to load HTML for "'+d.filename+'"');
				        }
			        });
			}
		},
		rowBuilt: function(cell, index, group) {
			var d = this.getDataForRowAndGroup(index, group);
			if (d.filename) {
			    cell.addClass('right-arrow');
		        }
		}
	});
});


define(['view', 'navbar'], function() {
	RL.NavView = RL.View.extend({
		type: 'navview',
		stretchY: true,
		initialize: function(params) {
			params = params || {};
			
			this.stack = [];
			
			if(!params.rootView)
				console.error("NavView expects a 'rootView' param");
			
			this.stack.push(this.wrapView(params.rootView));
			
			params.subViews = [
				this.stack[0]
			];
			
			this.supr(params);
		},
		currentView: function() {
			return this.stack[this.stack.length-1];
		},
		render: function() {
			return this.elem.html('').append(this.currentView().render());
		},
		didAppear: function() {
			var v = this.stack[this.stack.length-1];
			
			v.didAppear();
		},
		didDisappear: function() {
			var v = this.stack[this.stack.length-1];
			
			v.didDisappear();
		},
		wrapView: function(view, showBack) {
			showBack = !!showBack; // Turn into a boolean
			
			var _this = this;
			
			var navBar = new RL.NavBar({
				view: view,
				showBack: showBack,
				backCallback: function() {
					_this.popView();
				}
			});
			
			view.addClass('stretch-y');
			view.navView = this;
			
			var output = new RL.View({
				subViews: [navBar, view]
			});
			
			output.addClass('stretch-y container transition');
			
			var terms = view.cls.split(' ');
			terms = terms.concat(view.type.split(' '));
			
			output.addClass('container-'+terms.join(' container-'));
			
			return output;
		},
		pushView: function(view) {
			if(this.animating)
				return;
			
			this.animating = true;
				
			var wrapped = this.wrapView(view, true);
			
			var oldView = this.stack[this.stack.length-1],
				oldElem = oldView.surface();
			
			this.stack.push(wrapped);
			
			var elem = wrapped.render();
			elem.addClass('transition-from-right');
			
			var _this = this;
			
			setTimeout(function() {
				_this.elem.append(elem);
				view.didAppear();

				var transitionEnd = function(event) {
					oldElem.unbind('webkitTransitionEnd').remove().removeClass('transition-left');
					_this.animating = false;
					oldView.didDisappear();
				};

				oldElem.bind('webkitTransitionEnd', transitionEnd);

				setTimeout(function() {
					elem.removeClass('transition-from-right');
					oldElem.addClass('transition-from-left');
				}, 50);
			}, 50);
		},
		popView: function() {
			if(this.stack.length <= 1)
				return;
				
			if(this.animating)
				return;
			
			this.animating = true;
			
			var oldView = this.stack.pop(),
				oldElem = oldView.surface(),
				view = this.stack[this.stack.length-1],
				elem = view.surface();
				
			elem.addClass('transition-from-left');

			this.elem.append(elem);

			var _this = this;

			var transitionEnd = function(event) {
				oldElem.unbind('webkitTransitionEnd').remove().removeClass('transition-from-right');
				_this.animating = false;
				view.didAppear();
				oldView.didDisappear();
			};

			oldElem.bind('webkitTransitionEnd', transitionEnd);

			setTimeout(function() {
				elem.removeClass('transition-from-left');
				oldElem.addClass('transition-from-right');
			});
		},
		popAllViews: function() {
			if(this.stack.length <= 1)
				return;
				
			if(this.animating)
				return;
			
			this.animating = true;
			
			var oldView = this.stack.pop(),
				oldElem = oldView.surface(),
				view = this.stack[0],
				elem = view.surface();
				
			this.stack.length = 1;
				
			elem.addClass('transition-from-left');

			this.elem.append(elem);

			var _this = this;

			var transitionEnd = function(event) {
				oldElem.unbind('webkitTransitionEnd').remove().removeClass('transition-from-right');
				_this.animating = false;
				view.didAppear();
				oldView.didDisappear();
			};

			oldElem.bind('webkitTransitionEnd', transitionEnd);

			setTimeout(function() {
				elem.removeClass('transition-from-left');
				oldElem.addClass('transition-from-right');
			});
		},
		processBackButton: function() {
			if(this.stack.length > 1) {
				this.popView();
				return true;
			}
			else
				return false;
		}
	});
});

define(['view'], function() {
	var TWO_PI = 2*Math.PI,
	
		CIRCLE_RADIUS = 40,
		PROGRESS_WIDTH = 6,
		MAX_RADIUS = 40,
		MAX_RINGS = 7,
		AVAILABLE_RING_SPACE = 0,
		RING_SEPERATION = 0;
		
	RL.ReportHeaderView = RL.View.extend({
		template: [
			'<div class="header{{#if cicadaFound}} found{{/if}}{{#if smallscreen}} smallscreen{{else}} bigscreen{{/if}}">',
				'{{#if modal}}',
					//'<button class="dismiss-modal"></button>',
					'<span></span>',
				'{{else}}',
					'<button class="back"></button>',
				'{{/if}}',
				'{{#if cicadaFound}}',
					'<div class="canvas"></div>',
					'<div class="insect icon"></div>',
				'{{/if}}',
					'<h1>{{message.h1}}</h1>',
					'<h2>{{message.h2}}</h2>',
			'</div>'
		],
		initialize: function(params) {
			params = params || {};
			
			this.supr(params);
			this.modal = !!params.modal;
			this.show_h2 = !!params.show_h2;
			console.log("HEIGHT: " + window.innerHeight);
			console.log("Do I have a small screen? " + (window.innerHeight <= 450));
		},
		data: function() {
			var data = this.getParentView().data(),
				message = data.message !== undefined && data.message < RL.ReportTypes.length ? RL.ReportTypes[data.message] : RL.ReportTypes[0];
			
			if (this.show_h2 == false) {
				message.h2 = '';
			}
			
			return $.extend({}, data, {
				message: message,
				modal: this.modal,
				smallscreen: (window.innerHeight <= 450)
			})

		},
		initializeCanvas: function() {
			if(!this.data().cicadaFound)
				return;
			
			this.width = this.elem.width();
			this.height = this.elem.height();
		
			this.centerX = this.width * 0.5;
			this.centerY = (parseInt(this.elem.find('.header').css('padding-top'), 10) - (2*CIRCLE_RADIUS))/2 + CIRCLE_RADIUS;//this.height * 0.5;
		
			this.canvas = $('<canvas/>').attr('width', this.width).attr('height', this.height);
			this.ctx = this.canvas.get(0).getContext('2d');
		
			this.circleCanvas = $('<canvas/>').attr('width', this.width).attr('height', this.height);
			this.circleCtx = this.circleCanvas.get(0).getContext('2d');
		
			this.offset = 0;
		
			// Work out how large each ring of the visualisation can be
			MAX_RADIUS = Math.max(this.width * 0.5, this.height-this.centerY);
		
			AVAILABLE_RING_SPACE = MAX_RADIUS - CIRCLE_RADIUS - PROGRESS_WIDTH;
			RING_SEPERATION = AVAILABLE_RING_SPACE / MAX_RINGS;
		
			var scaleFactor = window.devicePixelRatio;
			
			// iPhone4 can't handle drawing at retina scale
			if(scaleFactor && !(RL.device.is.iPhone4() || RL.device.is.iPod4G())) {				
				this.canvas.attr('width', this.width*scaleFactor).attr('height', this.height*scaleFactor).css({ width: this.width+'px', height: this.height+'px' });
				this.ctx.scale(scaleFactor, scaleFactor);
			
				this.circleCanvas.attr('width', this.width*scaleFactor).attr('height', this.height*scaleFactor).css({ width: this.width+'px', height: this.height+'px' });
				this.circleCtx.scale(scaleFactor, scaleFactor);
			}
		
			this.drawCircle();

			// Put the canvas onto the dom
			this.elem.find('.canvas').html(this.canvas).append(this.circleCanvas);
		},
		drawCircle: function() {
			this.circleCtx.clearRect(0, 0, this.width, this.height);
		
			// Setup the cicada indicator gradient - Alex added this
			var radgrad = this.circleCtx.createRadialGradient(this.centerX,this.centerY,0,this.centerX,this.centerY,CIRCLE_RADIUS*1.5);
			radgrad.addColorStop(0, '#E9B262');
			radgrad.addColorStop(0.6, '#943B41');
			radgrad.addColorStop(1, 'rgba(148, 59, 65, 0)');
			this.circleCtx.fillStyle = radgrad;

			// Draw the center circle
			this.circleCtx.beginPath();
			this.circleCtx.arc(this.centerX, this.centerY, CIRCLE_RADIUS, 0, TWO_PI);
			this.circleCtx.fill();

			// Position/size the icon
			var insect = this.surface().find('.insect.icon');
		
			insect.css({
				margin: (this.centerY-CIRCLE_RADIUS)+'px auto 0',
				width: (CIRCLE_RADIUS*2)+'px',
				height: (CIRCLE_RADIUS*2)+'px',
				position: 'absolute',
				left: 0,
				right: 0,
				top: 0,
				'z-index': 1
			});
		
			// Draw the border round the circle
			this.circleCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
			this.circleCtx.beginPath();
			this.circleCtx.lineWidth = 5;
			this.circleCtx.arc(this.centerX, this.centerY, CIRCLE_RADIUS+(PROGRESS_WIDTH*0.5), 0, TWO_PI);
			this.circleCtx.stroke();
		},
		didAppear: function() {
			this.supr();
		
			this.initializeCanvas();
			
			this.startDrawing();
		},
		didDisappear: function() {
			this.stopDrawing();
		},
		startDrawing: function() {
			if(this.drawing || !this.data().cicadaFound)
				return;

			if(this.rAF)
				window.cancelAnimationFrame(this.rAF);
			
			this.drawing = true;
			this.lastPulse = this.lastPulse || 0;
			//this.reset();
			this.tick();
		},
		stopDrawing: function() {
			this.drawing = false;
		
			if(this.rAF)
				window.cancelAnimationFrame(this.rAF);
		},
		drawRings: function() {
			this.ctx.clearRect(0, 0, this.width, this.height);
		
			this.ctx.lineWidth = 2;
		
			var radius = ratio = null;
		
			for(var i=0; i < MAX_RINGS; i++) {
				radius = ((i * RING_SEPERATION) + this.offset) %  AVAILABLE_RING_SPACE;
				radius += CIRCLE_RADIUS + PROGRESS_WIDTH;
				ratio = 1 - (radius / MAX_RADIUS);
			
				this.ctx.strokeStyle = 'rgba(0, 0, 0, '+(0.15*ratio)+')';
				this.ctx.beginPath();
				this.ctx.arc(this.centerX, this.centerY, radius, 0, TWO_PI);
				this.ctx.stroke();
			}
		},
		tick: function() {
			if(this.drawing) {				
				var _this = this,
					now = +new Date;
			
				this.offset += 0.1;

				this.drawRings();

				// Queue up the next frame
				this.rAF = window.requestAnimationFrame(function() {
					_this.tick();
				});
			}
		}
	});
});

define(['view'], function() {
	// Local constant - will not leak into global scope
	var kNOTIFICATION_UPDATE_DELAY = 3000;
	
	RL.InsectNotificationView = RL.View.extend({
		cls: 'notifications',
		notificationTemplate: [
			'<div class="notification">Found: {{title}}</div>'
		],
		initialize: function(params) {
			this.supr(params);
			
			this.compiledNotificationTemplate = Handlebars.compile(this.processTemplate(this.notificationTemplate));
			
			this.currentMessage = false;
			this.nextMessage = false;
		},
		renderNotificationTemplate: function(title) {
			title = title || "";
			return this.compiledNotificationTemplate({title: title});
		},
		enqueueInsect: function(name) {
			this.nextMessage = name;
		},
		didAppear: function() {
			this.supr();
			this.startLoop();
		},
		didDisappear: function() {
			this.supr();
			this.stopLoop();
		},
		startLoop: function() {
			if(this.running)
				return;
			
			this.lastUpdate = +new Date;	
			this.running = true;
			this.tick();
		},
		stopLoop: function() {
			this.running = false;
		},
		tick: function() {
			if(this.running) {				
				var _this = this,
					now = +new Date;
				
				// Check if the correct ammount of time has passed to do an update
				if(now - this.lastUpdate > kNOTIFICATION_UPDATE_DELAY) {
					//console.log('Update Notifications');
					
					if(this.nextMessage != this.currentMessage) {
						var currentNotification = this.surface().find('.notification');
						
						// Change in some way
						if(this.nextMessage) {
							
							// Show new message
							var newNotification = $(this.renderNotificationTemplate(this.nextMessage));
							
							newNotification.addClass('before');
							
							this.surface().append(newNotification);
							
							// Animate
							var transitionEnd = function(event) {
								currentNotification.unbind('webkitTransitionEnd').remove();
							};

							currentNotification.bind('webkitTransitionEnd', transitionEnd);
							
							setTimeout(function() {
								setTimeout(function() {
									newNotification.removeClass('before');
								}, 200);
								
								currentNotification.addClass('after');
							}, 30);
							
							this.currentMessage = this.nextMessage;
							this.nextMessage = false;
						}
						else {
							// Hide notification
							var transitionEnd = function(event) {
								currentNotification.unbind('webkitTransitionEnd').remove();
							};

							currentNotification.bind('webkitTransitionEnd', transitionEnd);
							currentNotification.addClass('after');
							
							this.currentMessage = this.nextMessage = false;
						}
					}
					
					this.lastUpdate = now;
				}
				
				// Queue up the next frame
				window.requestAnimationFrame(function() {
					_this.tick();
				});
			}
		}
	});
});

var STATUS = 0;
var MAGNIT = 1;
var SURVEY = 2;

var surveyTimeout = null;
var magnInterval = null;

var imageObj = new Image();
imageObj.src = 'vcicada.png';

var drawCicada = function() {
	var c=document.getElementById("cicada");
	var ctx=c.getContext("2d");
	ctx.beginPath();
	ctx.drawImage(imageObj, c.width/2.0-10, c.height/2.0-20, 20, 40);
	ctx.lineWidth=2;
	ctx.arc(c.width/2.0, c.height/2.0, 40, 0, 2*Math.PI);
	ctx.stroke();
}

var clearCanvas = function() {
	var c=document.getElementById("cicada");
	var ctx=c.getContext("2d");
	
	// Store the current transformation matrix
	ctx.save();

	// Use the identity matrix while clearing the canvas
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, c.width, c.height);

	// Restore the transform
	ctx.restore();
	ctx.globalAlpha=1.0;
	
	// redraw the cicada
	drawCicada();
}

var updateAmplitude = function(amplitude) {
	//console.log("amplitude value: "+amplitude);
	var c=document.getElementById("amplitude");
	var ctx=c.getContext("2d");
	ctx.fillStyle="#777777";
	ctx.fillRect(0,0,c.width,c.height);
	ctx.fillStyle="#000000";
	ctx.fillRect(2,2,c.width-4,c.height-4);
	ctx.fillStyle="#cccccc";
	ctx.fillRect(2,(c.height-2)*(1-amplitude),c.width-4,(c.height-4)*amplitude);
}

var updateCicada = function(cicada) {
	//console.log("cicada value: "+cicada);
	var c=document.getElementById("cicada");
	var ctx=c.getContext("2d");
	ctx.fillStyle="#777777";
	ctx.fillRect(0,0,c.width,c.height);
	var insert = Math.round(25+cicada*230).toString(16);
	if (insert.length<2) insert = "0"+insert;
	ctx.fillStyle="#00"+insert+"00";
	ctx.fillRect(2,2,c.width-4,c.height-4);
	ctx.drawImage(imageObj, 24, 12, c.width-24, c.height-12);

	ctx.fillStyle="#ffffff";
	ctx.font="20px Arial";
	ctx.fillText(Number(cicada).toFixed(2), 5, 25);
}

var updateFreqs = function(freqs) {
	freqs = eval(freqs); 
	//console.log(freqs);
	var c=document.getElementById("cicada");
	var ctx=c.getContext("2d");
	
	for (var i=0;i<=20;i++){
		freqs[i] = freqs[i]/150.;
		if (freqs[i] > 1.0) { freqs[i] = 1.0;}
		var insert = Math.round(25+freqs[i]*230).toString(16);
		if (insert.length<2) insert = "0"+insert;
		ctx.beginPath();
		ctx.lineWidth=5;
		ctx.strokeStyle="#00"+insert+"00";
		ctx.globalAlpha=freqs[i];
		//if (i==15) {console.log(freqs[i]);}
		ctx.arc(c.width/2.0, c.height/2.0, 40+(i*4), 0, 2*Math.PI);
		ctx.stroke();
	}
}

var updateSurvey = function(freqs, t){
	freqs = eval(freqs); 
	//console.log("Updading Survey, t:"+t);
	var c=document.getElementById("cicada");
	var ctx=c.getContext("2d");
	var secs = 60*20; 
	
	for (var i=0;i<=20;i++){
		freqs[i] = freqs[i]/750.0;
		if (freqs[i] > 1.0) { freqs[i] = 1.0;}
		var insert = Math.round(25+freqs[i]*230).toString(16);
		if (insert.length<2) insert = "0"+insert;
		ctx.beginPath();
		ctx.lineWidth=5;
		ctx.strokeStyle="#00"+insert+"00";
		
		//ctx.globalAlpha=freqs[i];
		//if (i==15) {console.log(freqs[i]);}
		//console.debug("Start: "+2*Math.PI*t/secs+" Stop: "+2*Math.PI*(t+1)/secs);
		ctx.arc(c.width/2.0, 
				c.height/2.0, 40+(i*4), 
				2*Math.PI*t/secs-(Math.PI/2.0), 
				2*Math.PI*(t+1)/secs-(Math.PI/2.0));
		ctx.stroke();
	}
}

var updateInsects = function(insects) {
	insects = eval(insects);
	for (var i=0; i<insects.length; i++) {
		insect = insects[i]
		console.log(insect.name + " (" + insect.id + "): " + insect.value);
	}
}

var startDetector = function() {
	console.log("START DETECTOR");
	cordova.exec(function() {console.log("detector started");}, function(error) {console.log("broken: "+error);}, "CicadaDetector", "startDetector", [null]);
}

var stopDetector = function() {
	cordova.exec(function() {}, function() {}, "CicadaDetector", "stopDetector", [null]);
	clearCanvas();
}

var startWhiteNoise = function() {
	cordova.exec(function() {console.log("success")}, function() {console.log("Failed")}, "CicadaDetector", "startWhiteNoise", [null]);
}

var stopWhiteNoise = function() {
	cordova.exec(function() {console.log("success")}, function() {console.log("Failed")}, "CicadaDetector", "stopWhiteNoise", [null]);
}

var writeRecording = function() {
	cordova.exec(function() {}, function() {}, "CicadaDetector", "writeRecording", [ "test.WAV", 25 ] );
}

var startMagnitude = function() {
	console.log("Start Magnitude");
	startDetector();
	clearCanvas();
	
	//setInterval("getAmplitudeAndCicada()",50);
	magnInterval = setInterval("getFreqs()",50);
	insectInterval = setInterval("getInsects()",500);
	amplInterval = setInterval("getAmplitude()", 500);
	return magnInterval;
}

var stopMagnitude = function() {
	magnInterval = clearInterval(magnInterval);
	stopDetector();
}

var startSurvey = function() {
	
	console.log("Start survey");
	startDetector();
	clearCanvas();
	var secs = 60.0*20;
	var delay = 60.0/secs*1000.0;
	
	counter = 1;
	surveyTimeout = setInterval(function() {
		counter++;
		cordova.exec(function(freqs) {updateSurvey(freqs, counter);}, 
				function(error) {console.log("broken: "+error);}, 
				"CicadaDetector", 
				"getFrequencies", 
				[null]);
		if (counter > secs) { clearInterval(surveyTimeout); }
	}, delay); 
}

var stopSurvey = function() {
	clearTimeout(surveyTimeout);
	stopDetector();
}

var clickCicada = function () {
	console.log("Cicada clicked");
	if (STATUS == MAGNIT) {
		STATUS = SURVEY;
		stopMagnitude();
		console.debug('Start survey');
		startSurvey();
	} else {
		STATUS = MAGNIT;
		stopSurvey();
		console.debug('Start magnitude');
		startMagnitude();
	}
}

var getAmplitude = function() {
	console.log("Get amplitude");
	cordova.exec(function(amplitude) {
		console.log(amplitude);
	}, function() {
		console.log('broken');
	}, "CicadaDetector", "getAmplitude", [ null ]);
}

var getAmplitudeAndCicada = function() {
	cordova.exec(updateAmplitude, function() {console.log('broken');}, "CicadaDetector", "getAmplitude", [null]);
	cordova.exec(updateCicada, function() {}, "CicadaDetector", "getCicada", [null]);
}

var getFreqs = function() {
	cordova.exec(updateFreqs, function(error) {console.log("broken: "+error);}, "CicadaDetector", "getFrequencies", [null]);
}

var getInsects = function() {
	cordova.exec( updateInsects, function(error) {console.log("broken: "+error);}, "CicadaDetector", "getInsects", [null]);
}

var app = {

		initialize: function() {
			this.bindEvents();
		},
		bindEvents: function() {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		},
		onDeviceReady: function() {
			cordova.exec(function() {			// success
				
				/* draw the cicada */
				var c=document.getElementById("cicada");
				c.height=c.width;
				c.onclick = clickCicada;
				drawCicada();
				
				/* device ready */
				console.log("device is ready");			
			}, function(error) {				// fail
				console.log("device is not ready, error is: "+error);
			}, "CicadaDetector", "initialiseDetector", [null]);
		}
	}

