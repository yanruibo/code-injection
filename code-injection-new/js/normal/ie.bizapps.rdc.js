

	var etags = document.getElementsByTagName('embed');
	var itags = document.getElementsByTagName('iframe');
	processEmbeds(etags);
	processEmbeds(itags);
	function processEmbeds(earr) {
		for(var i = 0; i < earr.length; i++) {
			var eobject = earr[i];
			var esrc = eobject.src;
			if(esrc.indexOf('www.youtube.com') != -1) {
				var vid = '';
				var parentRepl = eobject.parentNode;
				var sind = 0;
				var tind = 0;
				if(esrc.indexOf('/embed/') != -1) {
					sind = esrc.indexOf('/embed/') + 7;
					tind = esrc.indexOf('?');
					if(tind == -1) {
						tind = esrc.length;
					}
				} else {
					if (parentRepl.tagName.toLowerCase() == 'object') {
						parentRepl = parentRepl.parentNode;
						eobject = eobject.parentNode;
					}
					sind = esrc.indexOf('/v/') + 3;
					tind = esrc.indexOf('?');
				}
				vid = esrc.substring(sind, tind);

				var width = eobject.width;
				var height = eobject.height;
				
				if(parseInt(width) < 100) {
					width = '100';
				}
				
				if(parseInt(height) < 100) {
					height = '100';
				}

				var image = '<img width=\"' + width + '\" height=\"' + height + '\" src=\"http://img.youtube.com/vi/' + vid + '/0.jpg\" alt=\"YouTube.com\">';

				var youtubeLink = document.createElement('a');
				youtubeLink.innerHTML = image;
				youtubeLink.href = 'ytube:http://www.youtube.com/watch?v=' + vid;

				parentRepl.replaceChild(youtubeLink, eobject);
				i = -1;
			}
		}
	}



$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});




$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});




$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});



var datepickr=function(){function q(a,c){var b=0,j=a.length;for(b;b<j&&!1!==c(a[b],b);b++);}function p(a,c,b){a.addEventListener?a.addEventListener(c,b,!1):a.attachEvent&&a.attachEvent("on"+c,function(c){var d=c=c||window.event;c.preventDefault=function(){d.returnValue=!1};var f=c;c.stopPropagation=function(){f.cancelBubble=!0};c.target=c.srcElement;b.call(a,c)})}function d(a,c,b){a in r||(r[a]=document.createElement(a));a=r[a].cloneNode(!1);if(null!=c)for(var d in c)a[d]=c[d];null!=b&&("object"==
typeof b?a.appendChild(b):a.innerHTML=b);return a}function m(a,c,b){return!0==c?b[a]:3<b[a].length?b[a].substring(0,3):b[a]}function s(){for(;this.calendarBody.hasChildNodes();)this.calendarBody.removeChild(this.calendarBody.lastChild);var a=(new Date(this.currentYearView,this.currentMonthView,1)).getDay(),c=k.month.numDays(this.currentMonthView,this.currentYearView);this.currentMonth.innerHTML=k.month.string(this.config.fullCurrentMonth,this.currentMonthView,this.config.months)+" "+this.currentYearView;
this.calendarBody.appendChild(t(a,c,this.currentMonthView,this.currentYearView))}function t(a,c,b,j){var h=document.createDocumentFragment(),f=d("tr"),g=0,e;for(e=1;e<=a;e++)f.appendChild(d("td",null,"&nbsp;")),g++;for(e=1;e<=c;e++)7==g&&(h.appendChild(f),f=d("tr"),g=0),a=e==k.current.day()&&b==k.current.month.integer()&&j==k.current.year()?{className:"today"}:null,f.appendChild(d("td",a,d("span",{className:"day"},e))),g++;for(e=1;e<=7-g;e++)f.appendChild(d("td",null,"&nbsp;"));h.appendChild(f);return h}
var u=[],l=new Date,k={current:{year:function(){return l.getFullYear()},month:{integer:function(){return l.getMonth()},string:function(a,c){var b=l.getMonth();return m(b,a,c)}},day:function(){return l.getDate()}},month:{string:function(a,c,b){return m(c,a,b)},numDays:function(a,c){return 1==a&&!(c&3)&&(c%100||!(c%400))?29:v[a]}}},v=[31,28,31,30,31,30,31,31,30,31,30,31],r=[],w=function(a){if(a.target.className)switch(a.target.className){case "prev-month":case "prevMonth":this.currentMonthView--;0>
this.currentMonthView&&(this.currentYearView--,this.currentMonthView=11);s.call(this);break;case "next-month":case "nextMonth":this.currentMonthView++;11<this.currentMonthView&&(this.currentYearView++,this.currentMonthView=0);s.call(this);break;case "day":var c=this.element;a=(new Date(this.currentYearView,this.currentMonthView,a.target.innerHTML)).getTime();var b=this.config,d="",h=new Date(a),f={d:function(){var a=f.j();return 10>a?"0"+a:a},D:function(){return b.weekdays[f.w()].substring(0,3)},
j:function(){return h.getDate()},l:function(){return b.weekdays[f.w()]},S:function(){return b.suffix[f.j()]||b.defaultSuffix},w:function(){return h.getDay()},F:function(){return m(f.n(),!0,b.months)},m:function(){var a=f.n()+1;return 10>a?"0"+a:a},M:function(){return m(f.n(),!1,b.months)},n:function(){return h.getMonth()},Y:function(){return h.getFullYear()},y:function(){return f.Y().toString().substring(2,4)}},g=b.dateFormat.split("");q(g,function(a,b){f[a]&&"\\"!=g[b-1]?d+=f[a]():"\\"!=a&&(d+=a)});
c.value=d;this.close()}},x=function(a){if(a.target!=this.element&&a.target!=this.calendar&&(a=a.target.parentNode,a!=this.calender))for(;a!=this.calendar;)if(a=a.parentNode,null==a){this.close();break}};return function(a,c){var b=this;this.element=document.getElementById(a);this.config={fullCurrentMonth:!0,dateFormat:"F jS, Y",weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),months:"January February March April May June July August September October November December".split(" "),
suffix:{1:"st",2:"nd",3:"rd",21:"st",22:"nd",23:"rd",31:"st"},defaultSuffix:"th"};this.currentYearView=k.current.year();this.currentMonthView=k.current.month.integer();if(c)for(var j in c)this.config.hasOwnProperty(j)&&(this.config[j]=c[j]);this.documentClick=function(a){x.call(b,a)};this.open=function(){p(document,"click",b.documentClick);q(u,function(a){a!=b&&a.close()});b.calendar.style.display="block"};this.close=function(){var a=b.documentClick;document.removeEventListener?document.removeEventListener("click",
a,!1):document.detachEvent&&document.detachEvent("onclick",a);b.calendar.style.display="none"};j=(new Date(this.currentYearView,this.currentMonthView,1)).getDay();var h=k.month.numDays(this.currentMonthView,this.currentYearView),f=this,g=inputTop=0,e=this.element;if(e.offsetParent){do g+=e.offsetLeft,inputTop+=e.offsetTop;while(e=e.offsetParent)}e=d("div",{className:"calendar"});e.style.cssText="display: none; position: absolute; top: "+(inputTop+this.element.offsetHeight)+"px; left: "+g+"px; z-index: 100;";
this.currentMonth=d("span",{className:"current-month"},k.month.string(this.config.fullCurrentMonth,this.currentMonthView,this.config.months)+" "+this.currentYearView);var g=d("div",{className:"months"}),n=d("span",{className:"prev-month"},d("span",{className:"prevMonth"},"&lt;")),m=d("span",{className:"next-month"},d("span",{className:"nextMonth"},"&gt;"));g.appendChild(n);g.appendChild(m);g.appendChild(this.currentMonth);var n=this.config.weekdays,l=document.createDocumentFragment();q(n,function(a){l.appendChild(d("th",
{},a.substring(0,2)))});n=d("table",null,d("thead",null,d("tr",{className:"weekdays"},l)));this.calendarBody=d("tbody");this.calendarBody.appendChild(t(j,h,this.currentMonthView,this.currentYearView));n.appendChild(this.calendarBody);e.appendChild(g);e.appendChild(n);document.body.appendChild(e);p(e,"click",function(a){w.call(f,a)});this.calendar=e;u.push(this);"INPUT"==this.element.nodeName?p(this.element,"focus",this.open):p(this.element,"click",this.open)}}();



$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});



    window.onload = function()
    {
        window.location = document.getElementById("hiddendivid").innerText;
    }
  



$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});




$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});





$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});




$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});



    function SubmitClick() {
        var datepick1 = document.getElementById("datepick");

	if (datepick1) {
      if (datepick1.value == "Tap to choose a date") {
        alert("Please enter a date first.");
        return;
          }
		else {
        window.location.href = 'external://http://www.brsgolf.com/royaldublin/visitor_day.php?d_date=20' + datepick1.value + '&course_id1=1';
			}
		}
	}



      
      new datepickr('datepick', {
        'dateFormat': 'y-m-d'
    });
  


function RssTableResize()
{  
    var rsstableElem= document.getElementById("rsstable");
	if (rsstableElem == null)
	{
		rsstableElem = document.getElementById("podcasttable");
	}
    if (rsstableElem != null)
    {
        try
        {
            var iDoc = rsstableElem.contentWindow.document;
            if (iDoc != null)
            {
                var ifrH = iDoc.body.offsetHeight;
		ifrH += 20;
                if (ifrH < 380)
                {
                    ifrH = 380;
                }
                rsstableElem.style.height = ifrH+"px";
            }
        }
        catch(err)
        {

        }
    } 
}



$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});




$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});




$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});




$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});





$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});




$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});




$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});





$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});




/*
    datepickr - pick your date not your nose
    Copyright (c) 2012
*/

var datepickr = (function() {
	var datepickrs = [],
	currentDate = new Date(),
	date = {
		current: {
			year: function() {
				return currentDate.getFullYear();
			},
			month: {
				integer: function() {
					return currentDate.getMonth();
				},
				string: function(full, months) {
					var date = currentDate.getMonth();
					return monthToStr(date, full, months);
				}
			},
			day: function() {
				return currentDate.getDate();			
			}
		},
		month: {
			string: function(full, currentMonthView, months) {
				var date = currentMonthView;
				return monthToStr(date, full, months);
			},
			numDays: function(currentMonthView, currentYearView) {
				/* checks to see if february is a leap year otherwise return the respective # of days */
				return (currentMonthView == 1 && !(currentYearView & 3) && (currentYearView % 1e2 || !(currentYearView % 4e2))) ? 29 : daysInMonth[currentMonthView];
			}
		}
	},
	daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	buildCache = [],
	handlers = {
		calendarClick: function(e) {
			if(e.target.className) {
				switch(e.target.className) {
					case 'prev-month':
					case 'prevMonth':
						this.currentMonthView--;
						if(this.currentMonthView < 0) {
							this.currentYearView--;
							this.currentMonthView = 11;
						}
						rebuildCalendar.call(this);
					break;
					case 'next-month':
					case 'nextMonth':
						this.currentMonthView++;
						if(this.currentMonthView > 11) {
							this.currentYearView++;
							this.currentMonthView = 0;
						}
						rebuildCalendar.call(this);
					break;
					case 'day':
						this.element.value = formatDate(new Date(this.currentYearView, this.currentMonthView, e.target.innerHTML).getTime(), this.config);
						this.close();
					break;
				}
			}
		},
		documentClick: function(e) {
			if(e.target != this.element && e.target != this.calendar) {
				var parentNode = e.target.parentNode;
				if(parentNode != this.calender) {
					while(parentNode != this.calendar) {
						parentNode = parentNode.parentNode;
						if(parentNode == null) {
							this.close();
							break;
						}
					}
				}
			}
		}
	};
	
	function formatDate(milliseconds, config) {
		var formattedDate = '',
		dateObj = new Date(milliseconds),
		format = {
			d: function() {
				var day = format.j();
				return (day < 10) ? '0' + day : day;
			},
			D: function() {
				return config.weekdays[format.w()].substring(0, 3);
			},
			j: function() {
				return dateObj.getDate();
			},
			l: function() {
				return config.weekdays[format.w()];
			},
			S: function() {
				return config.suffix[format.j()] || config.defaultSuffix;
			},
			w: function() {
				return dateObj.getDay();
			},
			F: function() {
				return monthToStr(format.n(), true, config.months);
			},
			m: function() {
				var month = format.n() + 1;
				return (month < 10) ? '0' + month : month;
			},
			M: function() {
				return monthToStr(format.n(), false, config.months);
			},
			n: function() {
				return dateObj.getMonth();
			},
			Y: function() {
				return dateObj.getFullYear();
			},
			y: function() {
				return format.Y().toString().substring(2, 4);
			}
		},
		formatPieces = config.dateFormat.split('');
		
		foreach(formatPieces, function(formatPiece, index) {
			if(format[formatPiece] && formatPieces[index - 1] != '\\') {
				formattedDate += format[formatPiece]();
			} else {
				if(formatPiece != '\\') {
					formattedDate += formatPiece;
				}
			}
		});
		
		return formattedDate;
	}
	
	function foreach(items, callback) {
		var i = 0, x = items.length;
		for(i; i < x; i++) {
			if(callback(items[i], i) === false) {
				break;
			}
		}
	}
	
	function addEvent(element, eventType, callback) {
		if(element.addEventListener) {
			element.addEventListener(eventType, callback, false);
		} else if(element.attachEvent) {
			var fixedCallback = function(e) {
				e = e || window.event;
				e.preventDefault = (function(e) {
					return function() { e.returnValue = false; }
				})(e);
				e.stopPropagation = (function(e) {
					return function() { e.cancelBubble = true; }
				})(e);
				e.target = e.srcElement;
				callback.call(element, e);
			};
			element.attachEvent('on' + eventType, fixedCallback);
		}
	}
	
	function removeEvent(element, eventType, callback) {
		if(element.removeEventListener) {
			element.removeEventListener(eventType, callback, false);
		} else if(element.detachEvent) {
			element.detachEvent('on' + eventType, callback);
		}
	}
	
	function buildNode(nodeName, attributes, content) {
		var element;
		
		if(!(nodeName in buildCache)) {
			buildCache[nodeName] = document.createElement(nodeName);
		}
		
		element = buildCache[nodeName].cloneNode(false);
		
		if(attributes != null) {
			for(var attribute in attributes) {
				element[attribute] = attributes[attribute];
			}
		}
		
		if(content != null) {
			if(typeof(content) == 'object') {
				element.appendChild(content);
			} else {
				element.innerHTML = content;
			}
		}
		
		return element;
	}
	
	function monthToStr(date, full, months) {
		return ((full == true) ? months[date] : ((months[date].length > 3) ? months[date].substring(0, 3) : months[date]));
	}
	
	function isToday(day, currentMonthView, currentYearView) {
		return day == date.current.day() && currentMonthView == date.current.month.integer() && currentYearView == date.current.year();
	}
	
	function buildWeekdays(weekdays) {
		var weekdayHtml = document.createDocumentFragment();
		foreach(weekdays, function(weekday) {
			weekdayHtml.appendChild(buildNode('th', {}, weekday.substring(0, 2)));
		});
		return weekdayHtml;
	}
	
	function rebuildCalendar() {
		while(this.calendarBody.hasChildNodes()){
			this.calendarBody.removeChild(this.calendarBody.lastChild);
		}
		
		var firstOfMonth = new Date(this.currentYearView, this.currentMonthView, 1).getDay(),
		numDays = date.month.numDays(this.currentMonthView, this.currentYearView);
		
		this.currentMonth.innerHTML = date.month.string(this.config.fullCurrentMonth, this.currentMonthView, this.config.months) + ' ' + this.currentYearView;
		this.calendarBody.appendChild(buildDays(firstOfMonth, numDays, this.currentMonthView, this.currentYearView));
	}
	
	function buildCurrentMonth(config, currentMonthView, currentYearView, months) {
		return buildNode('span', { className: 'current-month' }, date.month.string(config.fullCurrentMonth, currentMonthView, months) + ' ' + currentYearView);
	}
	
	function buildMonths(config, currentMonthView, currentYearView) {
		var months = buildNode('div', { className: 'months' }),
		prevMonth = buildNode('span', { className: 'prev-month' }, buildNode('span', { className: 'prevMonth' }, '&lt;')),
		nextMonth = buildNode('span', { className: 'next-month' }, buildNode('span', { className: 'nextMonth' }, '&gt;'));
		
		months.appendChild(prevMonth);
		months.appendChild(nextMonth);
		
		return months;
	}
	
	function buildDays(firstOfMonth, numDays, currentMonthView, currentYearView) {
		var calendarBody = document.createDocumentFragment(),
		row = buildNode('tr'),
		dayCount = 0, i;
		
		/* print out previous month's "days" */
		for(i = 1; i <= firstOfMonth; i++) {
			row.appendChild(buildNode('td', null, '&nbsp;'));
			dayCount++;
		}
		
		for(i = 1; i <= numDays; i++) {
			/* if we have reached the end of a week, wrap to the next line */
			if(dayCount == 7) {
				calendarBody.appendChild(row);
				row = buildNode('tr');
				dayCount = 0;
			}
			
			var todayClassName = isToday(i, currentMonthView, currentYearView) ? { className: 'today' } : null;
			row.appendChild(buildNode('td', todayClassName, buildNode('span', { className: 'day' }, i)));
			
			dayCount++;
		}
		
		/* if we haven't finished at the end of the week, start writing out the "days" for the next month */
		for(i = 1; i <= (7 - dayCount); i++) {
			row.appendChild(buildNode('td', null, '&nbsp;'));
		}
		
		calendarBody.appendChild(row);
		
		return calendarBody;
	}
	
	function buildCalendar() {
		var firstOfMonth = new Date(this.currentYearView, this.currentMonthView, 1).getDay(),
		numDays = date.month.numDays(this.currentMonthView, this.currentYearView),
		self = this;
		
		var inputLeft = inputTop = 0,
		obj = this.element;
		
		if(obj.offsetParent) {
			do {
				inputLeft += obj.offsetLeft;
				inputTop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		
		var calendarContainer = buildNode('div', { className: 'calendar' });
		calendarContainer.style.cssText = 'display: none; position: absolute; top: ' + (inputTop + this.element.offsetHeight) + 'px; left: ' + inputLeft + 'px; z-index: 100;';
		
		this.currentMonth = buildCurrentMonth(this.config, this.currentMonthView, this.currentYearView, this.config.months)
		var months = buildMonths(this.config, this.currentMonthView, this.currentYearView);
		months.appendChild(this.currentMonth);
		
		var calendar = buildNode('table', null, buildNode('thead', null, buildNode('tr', { className: 'weekdays' }, buildWeekdays(this.config.weekdays))));
		this.calendarBody = buildNode('tbody');
		this.calendarBody.appendChild(buildDays(firstOfMonth, numDays, this.currentMonthView, this.currentYearView));
		calendar.appendChild(this.calendarBody);
		
		calendarContainer.appendChild(months);
		calendarContainer.appendChild(calendar);
		
		document.body.appendChild(calendarContainer);
		
		addEvent(calendarContainer, 'click', function(e) { handlers.calendarClick.call(self, e); });
		
		return calendarContainer;
	}
	
	return function(elementId, userConfig) {
		var self = this;
		
		this.element = document.getElementById(elementId);
		this.config = {
			fullCurrentMonth: true,
			dateFormat: 'F jS, Y',
			weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			suffix: { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st' },
			defaultSuffix: 'th'
		};
		this.currentYearView = date.current.year();
		this.currentMonthView = date.current.month.integer();
		
		if(userConfig) {
			for(var key in userConfig) {
				if(this.config.hasOwnProperty(key)) {
					this.config[key] = userConfig[key];
				}
			}
		}
		
		this.documentClick = function(e) { handlers.documentClick.call(self, e); }
		
		this.open = function(e) {
			addEvent(document, 'click', self.documentClick);
			
			foreach(datepickrs, function(datepickr) {
				if(datepickr != self) {
					datepickr.close();
				}
			});
			
			self.calendar.style.display = 'block';
		}
		
		this.close = function() {
			removeEvent(document, 'click', self.documentClick);
			self.calendar.style.display = 'none';
		}
		
		this.calendar = buildCalendar.call(this);
		
		datepickrs.push(this);
		
		if(this.element.nodeName == 'INPUT') {
			addEvent(this.element, 'focus', this.open);
		} else {
			addEvent(this.element, 'click', this.open);
		}
	}
})();



$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});




$(document).ready(function(){
  $("#button").click(function(){
    $("#div1").toggle("slow");
  });
});

