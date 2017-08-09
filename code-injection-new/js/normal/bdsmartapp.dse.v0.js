
var src0 = 'http://choudhury.me.uk/bpl/app.json.v2.php?action=tab&index=0';
var connectionError='Sorry! There is an error in connecting to the data source.';
var chart=null;
$(function() {		
	jQuery(".content").hide();
	//toggle the componenet with class msg_body

	$( "#tabs2" ).tabs({
		select: function(event, ui) { 
			loadTab(ui.index,'team');
		}
	});
        $( "#tabs3" ).tabs({
                select: function(event, ui) {
                        loadTab(ui.index,'result');
                }
        });
    
	$( "#tabs" ).tabs({
		select: function(event, ui) { 
			loadTab(ui.index,'tab');
		}
	});
	loadTab(0,'tab');
});
function selectTab(index){
	$("#tabs2" ).tabs('select', index);
	$("#tabs3" ).tabs('select', index);
	$("#tabs" ).tabs('select', 3);
}
function loadTab(index,action){
	if(action=='tab' && index==1 ){
			var src = 'http://choudhury.me.uk/bpl/app.json.v2.php?action='+action+'&index=graph';
			$.ajax({
				url: 'http://choudhury.me.uk/bpl/app.json.v2.php?action='+action+'&index=graph',dataType: "jsonp",
				data: {},
				success: function(data) {
						if(data.ongoing==1)initGraph(data.data);
						else $('#container').html(data.html);
				}
		
			});
	}
	if(action=='tab' && index==3 )
		loadTab(0,'team');
	if(action=='tab' && index==4 )
		loadTab(0,'result');
	if(action=='tab' && (index!=3 || index!=1 || index!=4)){
		if(index>1)index=index-1
		var src = 'http://choudhury.me.uk/bpl/app.json.v2.php?action='+action+'&index='+index;
			$.ajax({
				url: src,dataType: "jsonp",
				data: {},
				success: function(data) {
					  $('#tabs-'+index).html(data.html);
					  $('#update').html(data.update);
					  if(data.grapfongoing==1)initGraph(data.data);
					  else $('#container').html(data.graphhtml);
					  if(data.ongoing)$("#tabs" ).tabs('enable', 1);
						var timer = setInterval( function() {
							$.ajax({
								url: src0,
								dataType: "jsonp",
								data: {},
								success: function(data) {
									$('#tabs-0').html(data.html);
									$('#update').html(data.update);
									if(data.ograpfongoing==1)initGraph(data.data);
									else $('#container').html(data.graphhtml);
									if(data.refreshRate==0)clearInterval(timer);
									
									$("#tabs" ).tabs('enable', 1);
										
									
								}
							});
					  }, data.refreshRate);
				}
			});
		}
	if(action=='team'){
	var index_1=index+1;
	var srcTeam = 'http://choudhury.me.uk/bpl/app.json.v2.php?action='+action+'&index='+index_1;
		$.ajax({
			url: srcTeam,dataType: "jsonp",
			data: {},
			success: function(data) {
				  //var squad='<p class="heading">Squad</p><div class="content">Lorem ip</div>';
				  $('#team-'+index_1).html(data.html);
				  $('#update').html(data.update);
				  $(".content").hide();
					$(".heading").click(function(){
						$(".content").toggle(500);
						if($(".content").is(':visible')){
							$.ajax({
								url: 'http://choudhury.me.uk/bpl/app.json.v2.php?action=squad&index='+index_1,dataType: "jsonp",
								data: {},
								success: function(data) {
									$(".content").html(data.html);
									
								}
							});
						}
					});
			}
		});
	}
	if (action =='result' ) {
		var resultsrc = 'http://choudhury.me.uk/bpl/app.json.v2.php?action='+action+'&index='+index;        
                $.ajax({
                        url: resultsrc,dataType: "jsonp",
                        data: {},
                        success: function(data) {
                                $('#result-'+index).html(data.html);
                        },
                        error: function(data) {
                                $('#result-'+index).html(connectionError);
                        }
                });
        }
}
function initGraph(data){
	var data1=data[0];	
	var data2=data[1];
	var over=data[2];
	chart = new Highcharts.Chart({
		chart: {
			renderTo: 'container',
			defaultSeriesType: 'line'
			,spacingLeft: 0
			//,marginLeft: 0
			//,marginRight: 130
			//,marginBottom: 25
		},
		title: {
			text: '',
			x: -20 //center
		},
		/*subtitle: {
			text: 'Source: WorldClimate.com',
			x: -20
		},*/
		xAxis: {
			categories: over
			,tickInterval :2
			,tickmarkPlacement :'on'
		},
		yAxis: {
			title: {
				text: 'Runs'
			},
			plotLines: [{
				value: 0,
				width: 1,
				color: '#808080'
			}]
			,min:0
			,tickInterval :10
		},
		tooltip: {
			formatter: function() {
			return '<b>'+ this.series.name +'</b><br/>'+
					this.y +"("+this.x +'ov) '  ;
			}
		},
		legend: {
			layout: 'horizontal',
			align: 'top',
			verticalAlign: 'top',
			//x: -10,
			//y: 10,
			borderWidth: 0
		},
		series: [{
			name: data.team_name[0],
			data: data1
		}, {
			name: data.team_name[1],
			data: data2
		}]
	});	
	
	
}
function playerDetail(player_id){
	var srcPlayer = 'http://choudhury.me.uk/bpl/app.json.v2.php?action=player&index='+player_id;
	$('#playerDetail').html("<img src='img/loading.gif' />");
	$('#playerDetail').dialog();
	$.ajax({
		url: srcPlayer,dataType: "jsonp",
		data: {},
		success: function(data) {
			$('#playerDetail').html(data.html);
			
			
		}
	});
	
}








/**
 * Grid theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
	colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
	chart: {
		backgroundColor: {
			linearGradient: [0, 0, 500, 500],
			stops: [
				[0, 'rgb(255, 255, 255)'],
				[1, 'rgb(240, 240, 255)']
			]
		},
		borderWidth: 2,
		plotBackgroundColor: 'rgba(255, 255, 255, .9)',
		plotShadow: true,
		plotBorderWidth: 1
	},
	title: {
		style: {
			color: '#000',
			font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
		}
	},
	subtitle: {
		style: {
			color: '#666666',
			font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
		}
	},
	xAxis: {
		gridLineWidth: 1,
		lineColor: '#000',
		tickColor: '#000',
		labels: {
			style: {
				color: '#000',
				font: '11px Trebuchet MS, Verdana, sans-serif'
			}
		},
		title: {
			style: {
				color: '#333',
				fontWeight: 'bold',
				fontSize: '12px',
				fontFamily: 'Trebuchet MS, Verdana, sans-serif'

			}
		}
	},
	yAxis: {
		minorTickInterval: 'auto',
		lineColor: '#000',
		lineWidth: 1,
		tickWidth: 1,
		tickColor: '#000',
		labels: {
			style: {
				color: '#000',
				font: '11px Trebuchet MS, Verdana, sans-serif'
			}
		},
		title: {
			style: {
				color: '#333',
				fontWeight: 'bold',
				fontSize: '12px',
				fontFamily: 'Trebuchet MS, Verdana, sans-serif'
			}
		}
	},
	legend: {
		itemStyle: {
			font: '9pt Trebuchet MS, Verdana, sans-serif',
			color: 'black'

		},
		itemHoverStyle: {
			color: '#039'
		},
		itemHiddenStyle: {
			color: 'gray'
		}
	},
	labels: {
		style: {
			color: '#99b'
		}
	}
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);



/**
 * Gray theme for Highcharts JS
 * @author Torstein Hønsi
 */

Highcharts.theme = {
	colors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee",
		"#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
	chart: {
		backgroundColor: {
			linearGradient: [0, 0, 0, 400],
			stops: [
				[0, 'rgb(96, 96, 96)'],
				[1, 'rgb(16, 16, 16)']
			]
		},
		borderWidth: 0,
		borderRadius: 15,
		plotBackgroundColor: null,
		plotShadow: false,
		plotBorderWidth: 0
	},
	title: {
		style: {
			color: '#FFF',
			font: '16px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
		}
	},
	subtitle: {
		style: {
			color: '#DDD',
			font: '12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
		}
	},
	xAxis: {
		gridLineWidth: 0,
		lineColor: '#999',
		tickColor: '#999',
		labels: {
			style: {
				color: '#999',
				fontWeight: 'bold'
			}
		},
		title: {
			style: {
				color: '#AAA',
				font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
			}
		}
	},
	yAxis: {
		alternateGridColor: null,
		minorTickInterval: null,
		gridLineColor: 'rgba(255, 255, 255, .1)',
		lineWidth: 0,
		tickWidth: 0,
		labels: {
			style: {
				color: '#999',
				fontWeight: 'bold'
			}
		},
		title: {
			style: {
				color: '#AAA',
				font: 'bold 12px Lucida Grande, Lucida Sans Unicode, Verdana, Arial, Helvetica, sans-serif'
			}
		}
	},
	legend: {
		itemStyle: {
			color: '#CCC'
		},
		itemHoverStyle: {
			color: '#FFF'
		},
		itemHiddenStyle: {
			color: '#333'
		}
	},
	labels: {
		style: {
			color: '#CCC'
		}
	},
	tooltip: {
		backgroundColor: {
			linearGradient: [0, 0, 0, 50],
			stops: [
				[0, 'rgba(96, 96, 96, .8)'],
				[1, 'rgba(16, 16, 16, .8)']
			]
		},
		borderWidth: 0,
		style: {
			color: '#FFF'
		}
	},


	plotOptions: {
		line: {
			dataLabels: {
				color: '#CCC'
			},
			marker: {
				lineColor: '#333'
			}
		},
		spline: {
			marker: {
				lineColor: '#333'
			}
		},
		scatter: {
			marker: {
				lineColor: '#333'
			}
		},
		candlestick: {
			lineColor: 'white'
		}
	},

	toolbar: {
		itemStyle: {
			color: '#CCC'
		}
	},

	navigation: {
		buttonOptions: {
			backgroundColor: {
				linearGradient: [0, 0, 0, 20],
				stops: [
					[0.4, '#606060'],
					[0.6, '#333333']
				]
			},
			borderColor: '#000000',
			symbolStroke: '#C0C0C0',
			hoverSymbolStroke: '#FFFFFF'
		}
	},

	exporting: {
		buttons: {
			exportButton: {
				symbolFill: '#55BE3B'
			},
			printButton: {
				symbolFill: '#7797BE'
			}
		}
	},

	// scroll charts
	rangeSelector: {
		buttonTheme: {
			fill: {
				linearGradient: [0, 0, 0, 20],
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
			stroke: '#000000',
			style: {
				color: '#CCC',
				fontWeight: 'bold'
			},
			states: {
				hover: {
					fill: {
						linearGradient: [0, 0, 0, 20],
						stops: [
							[0.4, '#BBB'],
							[0.6, '#888']
						]
					},
					stroke: '#000000',
					style: {
						color: 'white'
					}
				},
				select: {
					fill: {
						linearGradient: [0, 0, 0, 20],
						stops: [
							[0.1, '#000'],
							[0.3, '#333']
						]
					},
					stroke: '#000000',
					style: {
						color: 'yellow'
					}
				}
			}
		},
		inputStyle: {
			backgroundColor: '#333',
			color: 'silver'
		},
		labelStyle: {
			color: 'silver'
		}
	},

	navigator: {
		handles: {
			backgroundColor: '#666',
			borderColor: '#AAA'
		},
		outlineColor: '#CCC',
		maskFill: 'rgba(16, 16, 16, 0.5)',
		series: {
			color: '#7798BF',
			lineColor: '#A6C7ED'
		}
	},

	scrollbar: {
		barBackgroundColor: {
				linearGradient: [0, 0, 0, 20],
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
		barBorderColor: '#CCC',
		buttonArrowColor: '#CCC',
		buttonBackgroundColor: {
				linearGradient: [0, 0, 0, 20],
				stops: [
					[0.4, '#888'],
					[0.6, '#555']
				]
			},
		buttonBorderColor: '#CCC',
		rifleColor: '#FFF',
		trackBackgroundColor: {
			linearGradient: [0, 0, 0, 10],
			stops: [
				[0, '#000'],
				[1, '#333']
			]
		},
		trackBorderColor: '#666'
	},

	// special colors for some of the demo examples
	legendBackgroundColor: 'rgba(48, 48, 48, 0.8)',
	legendBackgroundColorSolid: 'rgb(70, 70, 70)',
	dataLabelsColor: '#444',
	textColor: '#E0E0E0',
	maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);

