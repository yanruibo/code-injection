















			$(document).ready(function()
			{
				//sys.updateSizes();
				game.init();
				sys.init();
			});
		

			var ViewportWidth = parseInt($(window).width()),
				viewport = document.querySelector("meta[name=viewport]");
				
				if(ViewportWidth <= 0)
				{
					var myInterval = setInterval(function()
					{
						var ViewportWidth = parseInt($(window).width());						
						if(ViewportWidth > 0)
						{
							updateMe();
							clearInterval(myInterval);
						}
					}, 1000);
				}
				else
				{
				//	setTimeout(function()
				//	{
						updateMe();
				//		clearTimeout(this);
				//	}, 200);
				}
				
				function updateMe()
				{
					if(ViewportWidth == 480)
					{
						viewport.setAttribute('content', 'width=device-width, user-scalable=yes, initial-scale=0.6, maximum-scale=5, minimum-scale=0.6');

					}
					else if(ViewportWidth == 640)
					{
						viewport.setAttribute('content', 'width=device-width, target-densityDpi=device-dpi, initial-scale=1.58');
					}
					else if(ViewportWidth <= 430 && ViewportWidth >=420)
					{
						viewport.setAttribute('content', 'width=device-width, user-scalable=yes, initial-scale=0.41, maximum-scale=5, minimum-scale=0.41');
					}
					else if(ViewportWidth >= 1280)
					{
						viewport.setAttribute('content', 'width=device-width, target-densityDpi=device-dpi, initial-scale=1.60');
					}

				}
				/*
				playground.loadMap(6);
				setTimeout(function()
				{
					
					game.start(false);
					
				}, 200);
				*/
				
		

var walls = window.walls = {

	stepAllowed :function(stepX, stepY)
	{
		if((stepY == 2 && stepX == 1)) return true;
		if((stepY == 1 && stepX == 2)) return true;
		
		if((stepY == -2 && stepX == -1)) return true;
		if((stepY == -1 && stepX == -2)) return true;
		
		if((stepY == -2 && stepX == 1)) return true;		
		if((stepY == -1 && stepX == 2)) return true;
		
		if((stepY == 2 && stepX == -1)) return true;		
		if((stepY == 1 && stepX == -2)) return true;		
		
		return false;
	},
	
	
	isWall: function(currentPos, targetPos, direction)
	{
		var stepY = currentPos[1] - targetPos[1],
			stepX = currentPos[0] - targetPos[0];

		if(!this.stepAllowed(stepX, stepY)) return true;
	
		var grid = playground.grid,
			wall1 = false,
			wall2 = false;
		
		switch(direction)
		{
			
			/* START Y1 MOVEMENTS */	
			case 'topLeftY':	//TOP(1/2) LEFT(2/1)
				if(stepX == 1 && stepY == 2)
				{
					if(grid[currentPos[0]][currentPos[1]].t || grid[currentPos[0]][currentPos[1]].moveOver) wall1 = true;
					if(grid[currentPos[0]][currentPos[1]-1] && (grid[currentPos[0]][currentPos[1]-1].t || grid[currentPos[0]][currentPos[1]-1].moveOver)) wall1 = true;
					if(grid[currentPos[0]][currentPos[1]-2] && (grid[currentPos[0]][currentPos[1]-2].l)) wall1 = true;

					if(grid[currentPos[0]][currentPos[1]].l || grid[currentPos[0]][currentPos[1]].moveOver) wall2 = true;
					if(grid[currentPos[0]-1][currentPos[1]] && (grid[currentPos[0]-1][currentPos[1]].t || grid[currentPos[0]][currentPos[1]-1].moveOver)) wall2 = true;
					if(grid[currentPos[0]-1][currentPos[1]-1] && (grid[currentPos[0]-1][currentPos[1]-1].t)) wall2 = true;

				}				
				if(stepX == 2 && stepY == 1)
				{	
					if(grid[currentPos[0]][currentPos[1]].t || grid[currentPos[0]][currentPos[1]].moveOver) wall1 = true;
					if(grid[currentPos[0]][currentPos[1]-1] && (grid[currentPos[0]][currentPos[1]-1].l || grid[currentPos[0]][currentPos[1]-1].moveOver)) wall1 = true;
					if(grid[currentPos[0]-1][currentPos[1]-1] && (grid[currentPos[0]-1][currentPos[1]-1].l)) wall1 = true;

					if(grid[currentPos[0]][currentPos[1]].l || grid[currentPos[0]][currentPos[1]].moveOver) wall2 = true;
					if(grid[currentPos[0]-1][currentPos[1]] && (grid[currentPos[0]-1][currentPos[1]].l || grid[currentPos[0]-1][currentPos[1]].moveOver)) wall2 = true;
					if(grid[currentPos[0]-2][currentPos[1]] && (grid[currentPos[0]-2][currentPos[1]].t || grid[currentPos[0]-2][currentPos[1]].moveOver)) wall2 = true;			
				}					
			break;
			case 'bottomRightY':	//TOP(1/2) LEFT(2/1) alert(1234);

				if(stepX == -1 && stepY == -2)
				{
					if(grid[currentPos[0]][currentPos[1]+1] && (grid[currentPos[0]][currentPos[1]+1].t || grid[currentPos[0]][currentPos[1]+1].moveOver)) wall1 = true;
					if(grid[currentPos[0]][currentPos[1]+2] && (grid[currentPos[0]][currentPos[1]+2].t || grid[currentPos[0]][currentPos[1]+2].moveOver)) wall1 = true;
					if(grid[currentPos[0]+1][currentPos[1]+2] && (grid[currentPos[0]+1][currentPos[1]+2].l)) wall1 = true;
					
					if(grid[currentPos[0]+1][currentPos[1]] && (grid[currentPos[0]+1][currentPos[1]].l || grid[currentPos[0]+1][currentPos[1]].moveOver)) wall2 = true;
					if(grid[currentPos[0]+1][currentPos[1]+1] && (grid[currentPos[0]+1][currentPos[1]+1].t || grid[currentPos[0]+1][currentPos[1]+1].moveOver)) wall2 = true;
					if(grid[currentPos[0]+1][currentPos[1]+2] && (grid[currentPos[0]+1][currentPos[1]+2].t)) wall2 = true;
					
				}				
				if(stepX == -2 && stepY == -1)
				{
					if(grid[currentPos[0]+1][currentPos[1]] && (grid[currentPos[0]+1][currentPos[1]].l || grid[currentPos[0]+1][currentPos[1]].moveOver)) wall1 = true;
					if(grid[currentPos[0]+2][currentPos[1]] && (grid[currentPos[0]+2][currentPos[1]].l || grid[currentPos[0]+2][currentPos[1]].moveOver)) wall1 = true;
					if(grid[currentPos[0]+2][currentPos[1]+1] && (grid[currentPos[0]+2][currentPos[1]+1].t)) wall1 = true;
					
					if(grid[currentPos[0]][currentPos[1]+1] && (grid[currentPos[0]][currentPos[1]+1].t || grid[currentPos[0]][currentPos[1]+1].moveOver)) wall2 = true;
					if(grid[currentPos[0]+1][currentPos[1]+1] && (grid[currentPos[0]+1][currentPos[1]+1].l || grid[currentPos[0]+1][currentPos[1]+1].moveOver)) wall2 = true;
					if(grid[currentPos[0]+2][currentPos[1]+1] && (grid[currentPos[0]+2][currentPos[1]+1].l)) wall2 = true;	
				}					
			break;			
			case 'bottomLeftY':	//TOP(1/2) LEFT(2/1) alert(1234);

				if(stepX == 1 && stepY == -2)
				{			
					if(grid[currentPos[0]][currentPos[1]+1] && (grid[currentPos[0]][currentPos[1]+1].t || grid[currentPos[0]][currentPos[1]+1].moveOver)) wall1 = true;
					if(grid[currentPos[0]][currentPos[1]+2] && (grid[currentPos[0]][currentPos[1]+2].t || grid[currentPos[0]][currentPos[1]+2].moveOver)) wall1 = true;
					if(grid[currentPos[0]][currentPos[1]+2] && (grid[currentPos[0]][currentPos[1]+2].l)) wall1 = true;

					if(grid[currentPos[0]][currentPos[1]] && (grid[currentPos[0]][currentPos[1]].l || grid[currentPos[0]][currentPos[1]].moveOver)) wall2 = true;	
					if(grid[currentPos[0]-1][currentPos[1]+1] && (grid[currentPos[0]-1][currentPos[1]+1].t || grid[currentPos[0]-1][currentPos[1]+1].moveOver)) wall2 = true;
					if(grid[currentPos[0]-1][currentPos[1]+2] && (grid[currentPos[0]-1][currentPos[1]+2].t)) wall2 = true;
								
					
				}				
			
				if(stepX == 2 && stepY == -1)
				{					
					if(grid[currentPos[0]][currentPos[1]] && (grid[currentPos[0]][currentPos[1]].l || grid[currentPos[0]][currentPos[1]].moveOver)) wall1 = true;
					if(grid[currentPos[0]-1][currentPos[1]] && (grid[currentPos[0]-1][currentPos[1]].l || grid[currentPos[0]-1][currentPos[1]].moveOver)) wall1 = true;				
					if(grid[currentPos[0]-2][currentPos[1]+1] && (grid[currentPos[0]-2][currentPos[1]+1].t)) wall1 = true;
					
					if(grid[currentPos[0]][currentPos[1]+1] && (grid[currentPos[0]][currentPos[1]+1].t || grid[currentPos[0]][currentPos[1]+1].moveOver)) wall2 = true;
					if(grid[currentPos[0]][currentPos[1]+1] && (grid[currentPos[0]][currentPos[1]+1].l || grid[currentPos[0]][currentPos[1]+1].moveOver)) wall2 = true;
					if(grid[currentPos[0]-1][currentPos[1]+1] && (grid[currentPos[0]-1][currentPos[1]+1].l)) wall2 = true;
				
				}					
			break;			
			case 'topRightY':	//TOP(1/2) LEFT(2/1)

				if(stepX == -1 && stepY == 2)
				{
					
					if(grid[currentPos[0]][currentPos[1]].t | grid[currentPos[0]][currentPos[1]].moveOver) wall1 = true; 
					if(grid[currentPos[0]][currentPos[1]-1] && (grid[currentPos[0]][currentPos[1]-1].t || grid[currentPos[0]][currentPos[1]-1].moveOver)) wall1 = true;
					if(grid[currentPos[0]+1][currentPos[1]-2] && (grid[currentPos[0]+1][currentPos[1]-2].l)) wall1 = true;

					if(grid[currentPos[0]+1][currentPos[1]].l || grid[currentPos[0]+1][currentPos[1]].moveOver) wall2 = true;
					if(grid[currentPos[0]+1][currentPos[1]] && (grid[currentPos[0]+1][currentPos[1]].t || grid[currentPos[0]+1][currentPos[1]].moveOver)) wall2 = true;				
					if(grid[currentPos[0]+1][currentPos[1]-1] && (grid[currentPos[0]+1][currentPos[1]-1].t)) wall2 = true;

				}				
				if(stepX == -2 && stepY == 1)
				{	
					if(grid[currentPos[0]][currentPos[1]].t || grid[currentPos[0]][currentPos[1]].moveOver) wall1 = true;
					if(grid[currentPos[0]+1][currentPos[1]-1] && (grid[currentPos[0]+1][currentPos[1]-1].l || grid[currentPos[0]+1][currentPos[1]-1].moveOver)) wall1 = true;
					if(grid[currentPos[0]+2][currentPos[1]-1] && (grid[currentPos[0]+2][currentPos[1]-1].l)) wall1 = true;

					if(grid[currentPos[0]+1][currentPos[1]].l || grid[currentPos[0]+1][currentPos[1]].moveOver) wall2 = true;
					if(grid[currentPos[0]+2][currentPos[1]] && (grid[currentPos[0]+2][currentPos[1]].l || grid[currentPos[0]+2][currentPos[1]].moveOver)) wall2 = true;
					if(grid[currentPos[0]+2][currentPos[1]] && (grid[currentPos[0]+2][currentPos[1]].t)) wall2 = true;			
				}					
			break;		
		}
		if(wall1 && wall2) return true;
		return false;		
	}

}

var hero = window.hero = {
	
	defaultPos: [2, 2],
	currentPos: [2, 2],
	offset: [10, 5],
	
	size: [37, 46],
	sprite: {
		'frames' : 4,
		'blinkSpeed': 100,
		'blinkTimeout' : 3000,
		'rotationLuck': 4
	},
	
	startAgain: false,
	
	road: {},
	undo: {
		'road' : [],
		'used' : false,
	},
	
	step: 1,
	
	$elems: {
		'hero' : false,
	},
	
	resetValues: function(gridElem)
	{
		this.step = 1;
		this.road = {};
		if(!hero.startAgain)
		{
			this.resetUndo();
		}
		clearInterval(hero.blinkInterval);
		clearInterval(hero.blinkingInterval);
		$(".mark").remove();	

		this.currentPos = [this.defaultPos[0], this.defaultPos[1]];	
		this.markRoad(this.defaultPos);
		this.setHeroPos(gridElem);
	},
	
	toPlayground: function()
	{
		var gridObj = playground.grid[this.defaultPos[0]][this.defaultPos[1]],
			gridElem = gridObj.$elem;
			
			if(this.$elems.hero)
			{
				this.$elems.hero.remove();
			}
			
			var heroCheck = $("#hero").length;
			if(!heroCheck)
			{
				var $hero = $('<div id="hero" style="width:'+this.size[0]+'px;height:'+this.size[1]+'px;left:'+(this.defaultPos[0] * playground.c.grid.w + + this.offset[0])+'px;top:'+(this.defaultPos[1] * playground.c.grid.h + + this.offset[1])+'px;"></div>');		
				playground.$elems.playground.append($hero);
				this.$elems.hero = $hero;
			}
			this.resetValues(gridElem);			
			this.blinking(gridElem);	
	},
	
	setHeroPos: function(gridElem, anim)
	{
		var pos = playground.getGridPos(gridElem);
		this.$elems.hero.css({
			'left' : (pos[0] + this.offset[0]),
			'top' : (pos[1] + this.offset[1])
		});
		if(!anim) return;
		//animate to
	
	
	},
	
	setRoad: function(currentPos, targetPos)
	{
		var stepY = 0,
			stepX = 0,
			ok = false,
			direction = ''; 
		
		//MOVE UP
		if(targetPos[1] < currentPos[1])
		{
			//MOVE TOP LEFT
			if(targetPos[0] < currentPos[0])
			{
				direction = 'topLeftY';

				if(!walls.isWall(currentPos, targetPos, direction))
				{
					return targetPos;				
				}
				return false
			}
			
			//MOVE TOP RIGHT
			if(targetPos[0] > currentPos[0])
			{
				stepY = currentPos[1] - targetPos[1];
				stepX = currentPos[0] - targetPos[0];
				direction = 'topRightY';

				if(!walls.isWall(currentPos, targetPos, direction))
				{
					return targetPos;				
				}
				return false;
			}			
			return false;
		}
		
		//MOVE DOWN
		if(targetPos[1] > currentPos[1])
		{
			//MOVE DOWN LEFT
			if(targetPos[0] < currentPos[0])
			{			
				stepY = currentPos[1] - targetPos[1];
				stepX = currentPos[0] - targetPos[0];
				direction = 'bottomLeftY';

				if(!walls.isWall(currentPos, targetPos, direction))
				{
					return targetPos;				
				}				
			}
			//MOVE DOWN RIGHT
			if(targetPos[0] > currentPos[0])
			{
				stepY = currentPos[1] - targetPos[1];
				stepX = currentPos[0] - targetPos[0];
				direction = 'bottomRightY';

				if(!walls.isWall(currentPos, targetPos, direction))
				{
					return targetPos;				
				}	
			}			
			
		}		
		
		return false;
	},
	
	
	wasHere: function(xy)
	{
		var wasHere = (this.road[xy[0]] && this.road[xy[0]][xy[1]]) ? true : false;
		return wasHere;
	},
	
	markRoad: function(xy)
	{
		if(!this.road[xy[0]]) this.road[xy[0]] = {}; 
		this.road[xy[0]][xy[1]] = true;	
		this.undo.road.push(xy);
		playground.grid[xy[0]][xy[1]].$elem.append('<div class="mark">'+this.step+'</div>');
	},
	
	resetUndo: function()
	{
		$(".undo").removeClass('disabled');
		this.undo.road = [];
		this.undo.used = false;		
	},
	
	stepBack: function()
	{
		game.hidePopUp();
		this.undo(1, false);
	},
	
	
	undo: function(back, chances)
	{
		if(game.end) return alert(conf.lang.gameIsEnded);
		var steps = this.undo.road.length;
		if(steps < (back)) return alert(conf.lang.maxUndoUsed);
		if(this.undo.used && chances) return alert(conf.lang.oneTimePerGameOnly);
		$(".undo").addClass('disabled');
		this.undo.used = true;
		var u = 0;
		for(i = steps - back; i <= steps; i++)
		{
			if(this.undo.road[i])
			{
				delete this.road[this.undo.road[i][0]][this.undo.road[i][1]];
				playground.grid[this.undo.road[i][0]][this.undo.road[i][1]].$elem.find('.mark').remove();
				if(chances)
				{
					this.step--;
				}
				//get last place
				if(!u)
				{
					var moveTo = [],
						moveTo = [this.undo.road[i][0], this.undo.road[i][1]];
				}
				//delete this.undo.road[i];
				u++;
			}
		}
		//fignja
		var gridObj = playground.grid[moveTo[0]][moveTo[1]],
			activeGrid = gridObj.$elem;
		this.currentPos = moveTo;
		this.setHeroPos(activeGrid);

	},
	
	move: function(xy)
	{

		var gridObj = playground.grid[xy[0]][xy[1]],
			activeGrid = gridObj.$elem,
			target = [];

		target = this.setRoad(this.currentPos, xy);
		if(!target) return game.warning();
		if(this.wasHere(target) && !gridObj.dontMark) return game.warning();
	
		
		
		game.currentStepTime = game.stepTime
		if(!gridObj.dontMark)
		{
			this.step++;
			this.markRoad(xy);
		}
	
		var prevHack = this.currentPos;
	
		this.currentPos = target;
		
		this.setHeroPos(activeGrid, true);	
		enemy.move(target);
		item.checkItem(target, prevHack);
		item.randomStar(xy);
		return;

	},
	
	blinkInterval: false,
	blinkingInterval: false,
	blinking: function()
	{
		hero.blinkInterval = setInterval(function()
		{
			var blink_n0 = 0,
				rotation_ = hero.rotate(),
				rotation = ((rotation_ !== false) ? rotation_ : sys.backgroundPos(hero.$elems.hero)[1]);
				hero.blinkingInterval = setInterval(function()
			{
				if(hero.sprite.frames <= blink_n0)
				{
					clearInterval(hero.blinkingInterval);
			
					hero.$elems.hero.css({
						'backgroundPosition' :'0px '+sys.backgroundPos(hero.$elems.hero)[1]+'px'
					});
					return;
				}		
				hero.$elems.hero.css({
					'backgroundPosition' : ''+(blink_n0 * hero.size[0] * -1)+'px '+rotation+'px'
				});
				blink_n0++;
			}, hero.sprite.blinkSpeed);
		}, hero.sprite.blinkTimeout + (hero.sprite.blinkSpeed * hero.sprite.frames));		
	
	},
	
	unlock: function()
	{
		var keys = parseInt((db.getItem(db.keys) ? db.getItem(db.keys) : 0));
		if(keys < 1)
		{
			alert(conf.lang.notEnoughKeys);
			this.stepBack();
			return;
		}
		
		game._continue();
		db.updateCollectedKeys(-1);
		playground.grid[hero.currentPos[0]][hero.currentPos[1]].ignore = true;
		playground.grid[hero.currentPos[0]][hero.currentPos[1]].dontMark = false;
		playground.grid[hero.currentPos[0]][hero.currentPos[1]].moveOver = false;
		$(".item[data-pos='"+hero.currentPos[0]+","+hero.currentPos[1]+"']").remove();
	},
	
	rotate: function()
	{	
		var rotate = Math.floor((Math.random()*this.sprite.rotationLuck)+1);	
		if(rotate == 2) return (this.size[1] * -1);
		if(rotate == 4) return 0;
		return false;
	},
	
	init: function()
	{
		this.toPlayground();
	}
	
}	

var playground = window.playground = {
	
	$elems: {
		'playground' : false
	},
	
	
	loaded: false,
	
	c: {
		'grid': {
			'w' : 55,
			'h' : 55
		}
	},
	
	grid: [],
	
	doubleClick: false,
	
	loadMap: function(id)
	{
		
		if(playground.doubleClick)
		{
			playground.doubleClick = false;
			game.start(false);
			return;
		}	
		
		this.doubleClick = setTimeout(function()
		{
			playground.doubleClick = false;
		}, 250);

		var map_ = (map.get[id]) ? map.get[id] : false;
		if(!map_)
		{
			game.showPopUp('inProgress');
			return false;
		
		}
		
		game.currentLevel = id;
		
		userTop.loadMy();
		
		$(".stat.level").html(id+1);
		playground.grid = [];
		playground.grid = map_.map;
		hero.defaultPos = map_.pos;
		if(!this.$elems.playground) this.$elems.playground = $("#playground");

		this.$elems.playground.css({
			'width' : map_.map.length * this.c.grid.w,
			'height' : map_.map[0].length * this.c.grid.h
		});

		this.build();
		enemy.clearEnemy();
		if(map_.enemy)
		{	
			enemy.init(map_.enemy);
		}
		this.events();
		playground.loaded = true;
		
		if(id == 0)
		{
			if(db.firstTimePlay())
			{
				/*LOAD HELP ELEMENTS*/
			}
		}
		
		return map_;
	},

	
	build: function()
	{
		var grid = "",
			wall = "",
			i = 0;
			this.$elems.playground.html('');
		for(x in this.grid)
		{
			for(y in this.grid[x])
			{
				var dark = (i % 2 == 0) ? ' dark' : '',
					x_ = (x * this.c.grid.w),
					y_ = (y * this.c.grid.h);
				grid = $('<div data-pos="'+x+','+y+'" class="grid'+dark+'" style="height:'+this.c.grid.h+'px;width:'+this.c.grid.w+'px;left:'+x_+'px;top:'+y_+'px;"></div>');
				
				this.$elems.playground.append(grid).append(this.setItem(this.grid[x][y], [x_, y_], [x, y]));
				
				playground.grid[x][y].$elem = grid;
				i++;
			}
			i++;
		}
	},	
	
	setItem: function(obj, xy, pos)
	{
		wall = '';
		if(obj.t) wall += '<div class="wall horizontal top" style="left:'+(xy[0]-4)+'px;top:'+(xy[1]-4)+'px;"></div>';
		if(obj.l) wall += '<div class="wall vertical left" style="left:'+(xy[0]-4)+'px;top:'+(xy[1]-4)+'px;"></div>';
		
		if(obj.item)
		{
			for(k in obj.item)
			{
				var offset_ = item.offset(obj.item[k]);
				
				if(obj.item[k] == 'slidedown' || obj.item[k] == 'key2' || obj.item[k] == 'lock')
				{
					playground.grid[pos[0]][pos[1]].ignore = false;
				}

				wall += '<div class="item '+obj.item[k]+' grid" data-pos="'+pos[0]+','+pos[1]+'" style="left:'+(xy[0]+offset_[0])+'px;top:'+(xy[1]+offset_[1])+'px;"></div>';
		
				if(obj.item[k] == 'key2' && db.key2IsCollected()) wall = '';
				
			}
		
		}
		return wall;
	},
	
	events: function()
	{
		var mode = 'click';
		$(".grid").unbind(mode+'.grid');
		$(".grid").bind(mode+'.grid', function(e)
		{
			if(game.wait) return false;
			if(game.end) return alert('Game Over!');
			if(game.currentGameTime <= 0 || game.currentStepTime <= 0) return alert('Time Over!');
			playground.gridClick($(this), e);
		});
	},
	
	gridClick: function(elem, e)
	{
		var xy_ = this.gridPosData(elem.attr('data-pos')),
			xy = [parseInt(xy_[0]), parseInt(xy_[1])];
		
		
		hero.move(xy);	
	},
	
	gridPosData: function(pos)
	{
		return pos.split(',');
	},
	
	getGridPos: function(elem)
	{
		var l = parseInt(elem.css('left')),
			t = parseInt(elem.css('top'));
		return [l, t];
	},
	
	setWallsAroundCurrent: function(xy, mark)
	{
		if(this.grid[xy[0]] && this.grid[xy[0]][xy[1]])
		{
			this.grid[xy[0]][xy[1]].l = true;
			this.grid[xy[0]][xy[1]].t = true;
			
			if(mark)
			{
				this.grid[xy[0]][xy[1]].$elem.append('<div class="mark">'+hero.step+'</div>');
			}
		}
		
		if(this.grid[xy[0]+1] && this.grid[xy[0]+1][xy[1]])
		{		
			this.grid[xy[0]+1][xy[1]].l = true;
		}
		
		if(this.grid[xy[0]] && this.grid[xy[0]][xy[1]+1])
		{		
			this.grid[xy[0]][xy[1]+1].t = true;
		}		
		
	}	
}	

var ajax = window.ajax = {
	
	wait: false,
	
	postJSON: function(url, args)
	{
		if(ajax.wait) return;
		ajax.wait = true;
		$.post(POST_URL+url, args, function(r)
		{	
			ajax.wait = false;
			ajax.processJsonRequest(r);
		}, 'json');
	},
	
	
	
	processJsonRequest: function(r)
	{	

		if(r.todo)
		{
		
		
		}	
	}
	
	
}

var conf = window.conf = {
	
	points: {
		'perLevel' : 20,
		'perKey' : 5,
		'perRandom' : 1,
		'perRestart' : -3,
		'perHome' : -5,
		'perDeath' : -10
	},
	
	keys: {
		'perLevel' : 1,
		'perPoints' : 1
	},	
	
	keys2: {
		'perLevel' : 1
	},	

	dbV: 'v14',
	gameV : 'v2',
	
	lang: {
		'levelCompleted': [
			'Well done!',
			'Great job, keep going!',
			'Excellent! It couldn’t be done any better!',
			'The level completed.',
			'Good, good!',
			'Brilliant performance, keep up the good work.'		
		],
		'gameIsEnded' : 'Game Over!',
		'notEnoughKeys' : 'You don’t have enough keys to open the lock!',
		'maxUndoUsed' : 'Can’t go as far backwards!',
		'oneTimePerGameOnly' : 'Option already used!'
	
	},
	

}

var item = window.item = {
	
	clickTimeout: 200,
	prevHack : false,
	
	randomStar: function(xy)
	{
		if(Math.floor((Math.random()*10)+1) != 3) return false;
		
		var giftStars = conf.points.perRandom;
		
		var gridElem = hero.$elems.hero,
			l = parseInt(gridElem.css('left')) - 7,
			t = parseInt(gridElem.css('top')) - 3,
			star = $('<div class="point-star">+'+giftStars+'</div>').css({
				'left' : l,
				'top' : t
			});;
	
		playground.$elems.playground.append(star);
		db.updateCollectedStars(giftStars);
			star.animate({
				'top' : '-='+100
			}, 1000).animate({
				'opacity' : 0
			}, 500, function()
			{
				star.remove();
			});

	},
	
	checkItem: function(pos, prevHack)
	{	
		var gridObj = playground.grid[pos[0]][pos[1]];
		if(gridObj.item)
		{
			this.prevHack = prevHack;
			this.itemAction(pos, gridObj);
		}
	},
	
	offset: function(type)
	{	
		var type = type.split(' ')[0];
	
		switch(type)
		{
			case 'key':
			case 'key2':
				return [13, 7]
			break;
			case 'teleport':
				return [6, 5]
			break;
			case 'slidedown':
				return [1, 3]
			break;		
		}
		return [0, 0]	
	},
	
	itemAction: function(pos, gridObj)
	{
		
		var item = gridObj.item;
		if(!item) return false;
		for(k in item)
		{
			var check = item[k].split(' ')[0];
			if(check == 'key' || check == 'key2')
			{
				this.__key(pos, gridObj, check);
			}
			
			if(check == 'finish')
			{
				this.__finish(pos, gridObj);
			}
			
			if(check == 'teleport')
			{
				this.__telport(pos, gridObj, item.id);
			}

			if(check == 'slidedown')
			{
				if(!hero.wasHere([pos[0], pos[1]+1]))
				{
					if($(".item[data-pos='"+pos[0]+","+pos[1]+"']").is(':visible'))
					{
						this.__slidedown(pos, gridObj, item);
					}
					else
					{
						if(playground.grid[pos[0]][pos[1]].$elem.html() != "")
						{
							var activeGrid = playground.grid[this.prevHack[0]][this.prevHack[1]];					
							hero.currentPos = this.prevHack;
							hero.setHeroPos(activeGrid.$elem);
							game.warning();
							return;
						}
						hero.step++;
						hero.markRoad(pos);
						game.wait = false;						
					}
				}
				else
				{	
					if($(".item[data-pos='"+pos[0]+","+pos[1]+"']").is(':visible') || playground.grid[pos[0]][pos[1]].$elem.html() != "")
					{
						var activeGrid = playground.grid[this.prevHack[0]][this.prevHack[1]];					
						hero.currentPos = this.prevHack;
						hero.setHeroPos(activeGrid.$elem);
						game.warning();
					}
					else
					{
						hero.step++;
						hero.markRoad(pos);
						game.wait = false;
						playground.grid[this.prevHack[0]][this.prevHack[1]].dontMark = false;
					}
				}
			}			

			if(check == 'lock')
			{
				this.__lock(pos, gridObj, item);
			}					
		}
	},
	
	/*
		ACTIONS
	*/
	
	__lock: function(pos, gridObj)
	{
		if(!gridObj.ignore)
		{
			game.showPopUp('unlock');
			game._pause();
		}
	},
	
	sTimeout: false,
	__slidedown: function(pos, gridObj)
	{
		if(gridObj)
		{
			var target = [pos[0], pos[1]+1];
			
			/*
			if(hero.wasHere(target))
			{
				var activeGrid = playground.grid[pos[0]][pos[1]];	
				
				hero.currentPos = pos;
				hero.setHeroPos(activeGrid.$elem);				

				
				
				game.wait = false;				
				return false;
			}			
			*/
			
			if(playground.grid[pos[0]][pos[1]].ignore)
			{
				hero.step++;
				hero.markRoad(pos);
				game.wait = false;
				return;
			}
			
			var activeGrid = playground.grid[target[0]][target[1]];	
			game.wait = true;
			
			$(".item[data-pos='"+pos[0]+","+pos[1]+"']").animate({
				'opacity' : 0
			}, function()
			{
				$(this).remove();
				playground.grid[pos[0]][pos[1]].ignore = true;
			});
			
			hero.$elems.hero.animate({
				'top' : activeGrid.$elem.css('top')
			}, 1000, function()
			{

				var activeGrid = playground.grid[target[0]][target[1]];
				
				hero.currentPos = target;
				hero.setHeroPos(activeGrid.$elem);
	

				if(activeGrid.item && activeGrid.item[0] == 'slidedown')
				{
					item.__slidedown(target, activeGrid.$elem);
					return;
				}
				
				if(activeGrid.item && (activeGrid.item[0] == 'teleport' || activeGrid.item[0] == 'teleport t1'))
				{
					item.__telport(hero.currentPos, activeGrid);
					return;				
				}
				
				hero.step++;
				hero.markRoad(target);
				
				if(item.sTimeout) clearTimeout(item.sTimeout);
				item.sTimeout = setTimeout(function()
				{
					game.wait = false;
					clearTimeout(this);
					item.sTimeout = false;
				}, item.clickTimeout);
			})
		}
	},
	
	tTimeout: false,
	__telport: function(pos, gridObj)
	{
		if(gridObj)
		{
			var target = gridObj.teleportTarget;
			game.wait = true;
			hero.$elems.hero.animate({
				'opacity' : 0
			}, 1000, function()
			{
				var activeGrid = playground.grid[target[0]][target[1]];
				hero.currentPos = target;
				hero.setHeroPos(activeGrid.$elem);
				hero.$elems.hero.animate({
					'opacity': 1
				}, function()
				{
					if(item.tTimeout) clearTimeout(item.tTimeout);
					item.tTimeout = setTimeout(function()
					{
						game.wait = false;
						clearTimeout(this);
						item.tTimeout = false;
					}, item.clickTimeout);
					
				});
			})
		}
	
	},
	
	__finish: function(pos, gridObj)
	{
		db.updateLevel();
		db.updateTopSpeed(game.gameTime - game.currentGameTime);
		game._end();
		game.showMyBestTimes();
		
		var praiseText = conf.lang.levelCompleted;
		var r = Math.floor((Math.random() * praiseText.length)+1);

		$(".onLevelCompletePraise").html(praiseText[r]);
		
		game.showPopUp('levelCompleted');
		userTop.loadMy();

		setTimeout(function()
		{
			var mapOk = false;
			playground.$elems.playground.animate({
				'opacity' : 0
			}, 500, function()
			{
				var mapOk = playground.loadMap(game.currentLevel+1);
			});

			clearTimeout(this);
			setTimeout(function()
			{	
				clearTimeout(this);
				playground.$elems.playground.animate({
					'opacity' : 1
				}, 500);
					if($(".scrollBtn").length == game.currentLevel + 1)
					{
						game.showPopUp('inProgress');
						return false;
					}
					
					game.start(false);
					
				
			}, 1000);
		}, 2000);
		
	},
	
	__key: function(pos, gridObj, type)
	{
		var key = $('.'+type+'[data-pos=\''+pos[0]+','+pos[1]+'\']');
		if(!game.levelComleted())
		{
			if(playground.grid[pos[0]][pos[1]].ignore) return;
			if(type == 'key2')
			{
				db.collectKey2();
				key.animate({
					'top' : '-='+25
				}, 500, function()
				{
					$(this).remove();
					playground.grid[pos[0]][pos[1]].ignore = true;
				});
			}
			db.updateCollectedKeys(1, type);
			db.updateCollectedStars(conf.points.perLevel);
			return;
		}
		
		if(!db.key2IsCollected())
		{
			if(type == 'key2')
			{
				db.collectKey2();
				key.animate({
					'top' : '-='+25
				}, 500, function()
				{
					$(this).remove();
					playground.grid[pos[0]][pos[1]].ignore = true;
				});
			}
			db.updateCollectedKeys(1, type);		
		}
		
		
	}
}

var game = window.game = {

	end: false,
	gameTime: 240,
	stepTime: 50,
	currentGameTime: 0,
	currentStepTime: 0,
	gameTimer: false,
	splashScreenTimout: 1800,
	currentLevel: 0,
	pause: false,
	viewsWidth: 800,
	wait: false,
	subContentChosen: 1,
	
	
	wait: false,
	switchView: function(id)
	{
		$("#views").animate({
			'left' : this.viewsWidth * id * -1
		});
		
		if(id == 1)
		{
			this.hidePopUp();
			clearInterval(game.gameTimer);
		}
		
	},
	
	_continue: function()
	{
		this.pause = false;
		this.hidePopUp();
	},
	
	_pause: function()
	{
		this.pause = true;
	},
	
	_restart: function()
	{
		if(game.wait) return false;
		if(game.end) return alert(conf.lang.gameIsEnded);
		this.start(true);
	},
	
	_end: function()
	{
		this.end = true;
		this.currentGameTime = 0;
		this.currentStepTime = 0;
		clearInterval(game.gameTimer);
	//	playground.loaded = false;
	},
	
	dontHideOnStart: false,
	start: function(restart)
	{
		if(!playground.loaded) return false;
		if(!restart)
		{
			if(!this.dontHideOnStart)
			{
				this.hidePopUp();
				this.dontHideOnStart = false;
			}
			game.end = false;
			clearInterval(game.gameTimer);
			this.setGameTimer();
			hero.startAgain = false;
		}
		else
		{
			hero.startAgain = true;
			db.updateCollectedStars(conf.points.perRestart);
		} 
		
		hero.init();
		game.switchView(2);
		
	},
	
	
	
	gameProgressBar: false,
	gameStepProgressBar: false,
	setGameTimer: function()
	{
		game.currentGameTime = game.gameTime;
		game.currentStepTime= game.stepTime;
		this.gameTimer = setInterval(function()
		{
			if(game.currentGameTime <= 0 || game.currentStepTime <= 0)
			{
				game._end();
				game.showPopUp('timeIsOver');
				db.updateCollectedStars(-7);
				clearInterval(game.gameTimer);
				return;
			}
			if(!game.pause)
			{
				game.currentGameTime--;
				game.currentStepTime--;
				if(!game.gameProgressBar) game.gameProgressBar = $("#gameTime");
				if(!game.gameStepProgressBar) game.gameStepProgressBar = $("#stepTime");
				
				game.gameProgressBar.find('.bar').css({
					'height' : sys.getPercent(game.currentGameTime, game.gameTime, false)+'%'
				});
				game.gameProgressBar.find('.t').html(sys.setTime(game.currentGameTime));
				
				game.gameStepProgressBar.find('.bar').css({
					'height' : sys.getPercent(game.currentStepTime, game.stepTime, false)+'%'
				});
				game.gameStepProgressBar.find('.t').html(sys.setTime(game.currentStepTime));
			}
			
		}, 1000);
	
	},
	
	hidePopUp: function()
	{
		$(".popelem").hide();
		$(".popelem").removeClass('animated');
	},
	
	showPopUp: function(id)
	{
		this.hidePopUp();
		var elem = $("#"+id);
		$("#popbg").show();
		
		elem.show();
		elem.addClass('animated');
	},
	
	warning: function()
	{
		if(playground.$elems.playground.find('.stop').length == 0)
		{
			playground.$elems.playground.append('<div class="stop"></div>');
			$(".stop").animate({
				'opacity' : 1,
				'transform' : '+='+0.33
			}, 500, function()
			{
				$(this).animate({
					'opacity' : 0
				}, 200, function(){
					$(this).remove();
				});
			});
		}
	},
	
	showMyBestTimes: function()
	{
		var myTop = $("#myBestTimes"),
			times = db.getItem(db.top);
		myTop.html(times);
	},
	
	updateAvaibleLevels: function()
	{
		var level = db.getCurrentLevel();
		$(".level-list .scrollBtn").each(function()
		{
			var levelBTN = $(this),
				levelNum = parseInt(levelBTN.html());
				if(levelNum == 1 && !game.currentLevel){
					playground.loadMap(0);
					levelBTN.addClass('current');
				}
			if((levelNum - 1) <= level)
			{
				levelBTN.attr('href', 'javascript:playground.loadMap('+(levelNum - 1)+');');
				levelBTN.removeClass('disabled');
			}
		});
	},
	
	avaibleLevels: function()
	{

		var unavaible =  $(".scrollBtn.disabled").length,
			all = $(".scrollBtn").length;
		
		return (all - unavaible);
			
	},
	
	changeSubContent: function(id)
	{
		$(".subcontent").hide();
		$("#subcontent"+id).show();
		$(".subChanger").addClass('off');
		$("#subChanger"+id).removeClass('off');
		
		game.subContentChosen = id;

	},

	levelComleted: function()
	{
		if(db.getCurrentLevel() > game.currentLevel) return true;
		return false
	},
	
	init: function()
	{
		db.init();
		this.updateAvaibleLevels();
		
		this.showMyBestTimes();
		setTimeout(function()
		{
			game.switchView(1);
		}, this.splashScreenTimout);

	}	
}	

var db = window.db = {

	cl : 'level_'+conf.dbV,
	top : 'top_'+conf.dbV,
	keys: 'key_'+conf.dbV,
	keys2: 'key2_'+conf.dbV,
	stars: 'star_'+conf.dbV,
	giveStars: 'give_'+conf.dbV,
	key2C : 'key2collected_'+conf.dbV,
	ftp: 'ftp'+conf.dbV,
	
	firstTimePlay: function()
	{
		if(this.getItem(this.ftp) == "")
		{
			return true;
		}
		return false;
	},
	
	updateLevel: function()
	{
		var cl = (this.getItem(this.cl)),
			cl = (cl) ? parseInt(cl) : 0,
			ftp = false;
			
		if(cl == 1)
		{
			if(this.firstTimePlay())
			{
				ftp = true;
			}
		}		
			
		if(game.currentLevel >= cl)
		{
			this.setItem(this.cl, (cl + 1));
			if(ftp)
			{
				this.setItem(this.ftp, 1);
			}
		}
		game.updateAvaibleLevels();
		return cl;
	},
	
	updateZeros: function(num)
	{
		return (num < 10) ? '0'+num : num;
	},
	
	key2IsCollected: function()
	{
		var data = this.getItem(this.key2C),
			myKey2 = {};
		
		if(data) myKey2 = $.parseJSON(data);	
		
		if(myKey2[game.currentLevel]) return true;

		return false;
	},
	
	collectKey2: function()
	{
		var data = this.getItem(this.key2C);	
		var d  = {};
		if(data)
		{
			var d = $.parseJSON(data);
		}

		d[game.currentLevel] = true;
		
		this.setItem(this.key2C, JSON.stringify(d));		
		return true;
	},
	
	updateTopSpeed: function(speed)
	{
		var data = this.getItem(this.top),
			today = new Date(),
			d = this.updateZeros(today.getDate()),
			m = this.updateZeros(today.getMonth()+1),
			y = today.getFullYear(),
			date_ = d+'.'+m+'.'+y;	
		
			var score = {"date_" : date_, "time" : speed};
			
		var d  = {};
		if(data)
		{
			var d = $.parseJSON(data);
		}		
		
		if(!d[game.currentLevel]) d[game.currentLevel] = [];
		
		d[game.currentLevel].push(score);
		
		this.setItem(this.top, JSON.stringify(d));

		return true;
	},
	
	updateCollectedKeys: function(count, type)
	{	
		if(!type) type = 'key';
		var prefix = (type == 'key') ? this.keys : this.keys2;
		var keys = this.getItem(prefix),
			keys = (keys) ? parseInt(keys) : 0;
		
		var keyCount = keys + count;
		this.setItem(prefix, keyCount);
		$(".stat.keys"+((type == 'key2') ? '2' : '')).html(keyCount);
	},
	
	getMyTop: function()
	{
		var data = this.getItem(this.top),
			myTop = {};
		
		if(data) myTop = $.parseJSON(data);

		return myTop;

	},
	
	
	updateCollectedStars: function(count)
	{
		var stars = this.getItem(this.stars),
			stars = (stars) ? parseInt(stars) : 0;
		var starCount = stars + count,
			starCount = (starCount < 0) ? 0 : starCount;
		
		if(count > 0)
		{
			var giveStars = this.getItem(this.giveStars),
				giveStars = (giveStars) ? parseInt(giveStars) : -50,
				newGiveStars = giveStars + count;
			if(newGiveStars >= 0)
			{	
				this.updateCollectedKeys(conf.keys.perPoints);
				newGiveStars = -50;
			}
			this.setItem(this.giveStars, newGiveStars);
		}
		
		
		this.setItem(this.stars, starCount);
		$(".stat.stars").html(starCount);	
	},
	
	
	setItem: function(key, value)
	{
		localStorage.setItem(key, value); 
	},
	
	getCurrentLevel: function()
	{
		var level = this.getItem(this.cl),
			level = (level) ? parseInt(level) : 0;
	
		return level;
	
	},
	
	getItem: function(key)
	{
		if(localStorage.getItem(key))
		{
			return localStorage.getItem(key);
		}
		return "";
	},
	
	init: function()
	{
		if(window && window['localStorage'] !== null)
		{
			db.updateCollectedKeys(0);
			db.updateCollectedKeys(0, 'key2');
			db.updateCollectedStars(0);
			return true;
		}
		alert('Local storage problem!');
	}
}

var sys = window.sys = {
	
	backgroundPos: function(obj)
	{
		var pos = obj.css('backgroundPosition').split(" ");
		return [parseInt(pos[0]), parseInt(pos[1])];
	},
	
	getPercent: function(curr, max, reverse)
	{
		
		var p_ = (curr * 100),
			p = 0;
		if(p_ == 0)	
		{
			if(reverse) return 100;
			return 0;
		}
		
		var p = Math.round(p_ / max);
		if(reverse) return 100 - p;
		return p;
	},
	
	setTime: function(seconds)
	{	
		function nfx(num)
		{
			return (num < 10) ? '0'+num : num;
		}
		var m = 60,
			m_ = Math.floor(seconds / m),
			s_ = seconds - m_ * m;
	
		return nfx(m_)+':'+nfx(s_);
	},
	
	scrollBtnClick: function()
	{
		$(".scrollBtn").click(function()
		{
			if($(this).is('.disabled')) return false
			var parentSCroll = $(this).parents('.scroll:first');
			parentSCroll.find('.scrollBtn').removeClass('current');
			$(this).addClass('current');
		});
	},
	
	cStep: {},
	cLimit: 7,
	scroll: function(scroller, dir, $_cLimit)
	{
		var cLimit = ($_cLimit) ? $_cLimit : this.cLimit,
			scrollerID = scroller,
			scroller = $("."+scrollerID),
			pDiv = scroller.parents('div:first'),
			cLeft = pDiv.find('.scroll-action.left'),
			cRight = pDiv.find('.scroll-action.right'),
			scroll = scroller.find('.scroll'),
			max = Math.floor(scroll.find('.scrollA').length / cLimit),
			w = (cLimit * parseInt(scroll.find('.scrollA').width()));
			
		if(!this.cStep[scrollerID]) this.cStep[scrollerID] = 0;			
		

			


		if(dir == 1 && this.cStep[scrollerID] == 0) return false;


		if($_cLimit) max -=1;

		if(max == (this.cStep[scrollerID] * -1) && dir == -1) return false;
		
		this.cStep[scrollerID] += dir;		
		
		var allACtive = true;
		if(dir < 0 && (max == (this.cStep[scrollerID] * -1)))
		{
			cLeft.removeClass('inactive');
			cRight.addClass('inactive');
			allACtive = false;
		}
		
		if(dir > 0 && this.cStep[scrollerID] == 0)
		{
			cRight.removeClass('inactive');
			cLeft.addClass('inactive');
			allACtive = false;		
		}
		
		if(allACtive)
		{
			cRight.removeClass('inactive');
			cLeft.removeClass('inactive');		
		}

		scroll.animate({
			'left':  w * this.cStep[scrollerID]
		});
	},
	
	action: function(todo, key)
	{
		switch(todo)
		{
			case 'unlock':
				if(key == 0) return hero.stepBack();
				return hero.unlock();
			break;
		
		}
	
	},	
	
	
	init: function()
	{		
		this.scrollBtnClick();
	}
}

var map = window.map = {
	
	get: [		
		{
			pos: [2, 3],
			map: [ 
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l':false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false, 'item' : ['key', 'finish']},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l':false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}			
				]	
			]
		},
		{
			pos: [0, 0],
			map: [ 
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l':false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},					
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l':false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true, 'item' : ['key', 'finish']},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l':false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false}			
				]	
			]
		},
		{	/* Level 3 */
			pos: [0, 0],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false},
 /* [0, 1] */		{'l': false, 't' : false},
 /* [0, 2] */		{'l': false, 't' : false},
 /* [0, 3] */		{'l': false, 't' : true},
 /* [0, 4] */		{'l': false, 't' : false},
 /* [0, 5] */		{'l': false, 't' : true},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [1, 0] */		{'l': false, 't' : false},
 /* [1, 1] */		{'l': false, 't' : false},
 /* [1, 2] */		{'l': false, 't' : true},
 /* [1, 3] */		{'l': false, 't' : false},
 /* [1, 4] */		{'l': false, 't' : true},
 /* [1, 5] */		{'l': false, 't' : false},
 /* [1, 6] */		{'l': false, 't' : false},
 /* [1, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [2, 0] */		{'l': false, 't' : false},
 /* [2, 1] */		{'l': true, 't' : false},
 /* [2, 2] */		{'l': true, 't' : true},
 /* [2, 3] */		{'l': false, 't' : true},
 /* [2, 4] */		{'l': false, 't' : true},
 /* [2, 5] */		{'l': true, 't' : true},
 /* [2, 6] */		{'l': true, 't' : true},
 /* [2, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [3, 0] */		{'l': true, 't' : false},
 /* [3, 1] */		{'l': false, 't' : false},
 /* [3, 2] */		{'l': false, 't' : false},
 /* [3, 3] */		{'l': false, 't' : false},
 /* [3, 4] */		{'l': false, 't' : true},
 /* [3, 5] */		{'l': false, 't' : false},
 /* [3, 6] */		{'l': false, 't' : false},
 /* [3, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [4, 0] */		{'l': false, 't' : false},
 /* [4, 1] */		{'l': true, 't' : false},
 /* [4, 2] */		{'l': false, 't' : false},
 /* [4, 3] */		{'l': false, 't' : true},
 /* [4, 4] */		{'l': false, 't' : false},
 /* [4, 5] */		{'l': false, 't' : true},
 /* [4, 6] */		{'l': true, 't' : false},
 /* [4, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [5, 0] */		{'l': false, 't' : false},
 /* [5, 1] */		{'l': false, 't' : false},
 /* [5, 2] */		{'l': false, 't' : false},
 /* [5, 3] */		{'l': false, 't' : true},
 /* [5, 4] */		{'l': false, 't' : false},
 /* [5, 5] */		{'l': false, 't' : true},
 /* [5, 6] */		{'l': false, 't' : false},
 /* [5, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [6, 0] */		{'l': false, 't' : false},
 /* [6, 1] */		{'l': true, 't' : false},
 /* [6, 2] */		{'l': false, 't' : false},
 /* [6, 3] */		{'l': false, 't' : false},
 /* [6, 4] */		{'l': false, 't' : true},
 /* [6, 5] */		{'l': false, 't' : false},
 /* [6, 6] */		{'l': true, 't' : false},
 /* [6, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [7, 0] */		{'l': true, 't' : false},
 /* [7, 1] */		{'l': false, 't' : false},
 /* [7, 2] */		{'l': false, 't' : true},
 /* [7, 3] */		{'l': false, 't' : true},
 /* [7, 4] */		{'l': false, 't' : true},
 /* [7, 5] */		{'l': false, 't' : true},
 /* [7, 6] */		{'l': false, 't' : true},
 /* [7, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [8, 0] */		{'l': false, 't' : false},
 /* [8, 1] */		{'l': true, 't' : false},
 /* [8, 2] */		{'l': true, 't' : true},
 /* [8, 3] */		{'l': false, 't' : false},
 /* [8, 4] */		{'l': false, 't' : true},
 /* [8, 5] */		{'l': true, 't' : false},
 /* [8, 6] */		{'l': true, 't' : true},
 /* [8, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [9, 0] */		{'l': false, 't' : false},
 /* [9, 1] */		{'l': false, 't' : false},
 /* [9, 2] */		{'l': false, 't' : false},
 /* [9, 3] */		{'l':false, 't' : true},
 /* [9, 4] */		{'l': false, 't' : false},
 /* [9, 5] */		{'l': false, 't' : true},
 /* [9, 6] */		{'l': false, 't' : false},
 /* [9, 7] */		{'l': false, 't' : false, 'item' : ['key', 'finish']}			
				]	
			]
		},
		{	/* Level 4 */
			pos: [0, 0],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false},
 /* [0, 1] */		{'l': false, 't' : false},
 /* [0, 2] */		{'l': false, 't' : false},
 /* [0, 3] */		{'l': false, 't' : false},
 /* [0, 4] */		{'l': false, 't' : true},
 /* [0, 5] */		{'l': false, 't' : true},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [1, 0] */		{'l': false, 't' : false},
 /* [1, 1] */		{'l': true, 't' : false},
 /* [1, 2] */		{'l': false, 't' : false},
 /* [1, 3] */		{'l': true, 't' : false},
 /* [1, 4] */		{'l': false, 't' : true},
 /* [1, 5] */		{'l': false, 't' : false},
 /* [1, 6] */		{'l': false, 't' : false},
 /* [1, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [2, 0] */		{'l': true, 't' : false},
 /* [2, 1] */		{'l': false, 't' : false},
 /* [2, 2] */		{'l': true, 't' : false},
 /* [2, 3] */		{'l':false, 't' : false},
 /* [2, 4] */		{'l': false, 't' : true},
 /* [2, 5] */		{'l': true, 't' : true},
 /* [2, 6] */		{'l': true, 't' : true},
 /* [2, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [3, 0] */		{'l': false, 't' : false},
 /* [3, 1] */		{'l': true, 't' : false},
 /* [3, 2] */		{'l': true, 't' : false},
 /* [3, 3] */		{'l': false, 't' : false},
 /* [3, 4] */		{'l': false, 't' : true},
 /* [3, 5] */		{'l': false, 't' : false},
 /* [3, 6] */		{'l': false, 't' : false},
 /* [3, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [4, 0] */		{'l': true, 't' : false},
 /* [4, 1] */		{'l': false, 't' : false},
 /* [4, 2] */		{'l': true, 't' : false},
 /* [4, 3] */		{'l': false, 't' : false},
 /* [4, 4] */		{'l': false, 't' : true},
 /* [4, 5] */		{'l': false, 't' : true},
 /* [4, 6] */		{'l': false, 't' : true},
 /* [4, 7] */		{'l': false, 't' : false, 'item' : ['key', 'finish']}
				],
				[	
 /* [5, 0] */		{'l': false, 't' : false},
 /* [5, 1] */		{'l': true, 't' : false},
 /* [5, 2] */		{'l': true, 't' : false},
 /* [5, 3] */		{'l': false, 't' : false},
 /* [5, 4] */		{'l': false, 't' : true},
 /* [5, 5] */		{'l': true, 't' : true},
 /* [5, 6] */		{'l': true, 't' : false},
 /* [5, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [6, 0] */		{'l': true, 't' : false},
 /* [6, 1] */		{'l': false, 't' : false},
 /* [6, 2] */		{'l': true, 't' : false},
 /* [6, 3] */		{'l': true, 't' : false},
 /* [6, 4] */		{'l': false, 't' : true},
 /* [6, 5] */		{'l': false, 't' : false},
 /* [6, 6] */		{'l': true, 't' : false},
 /* [6, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [7, 0] */		{'l': false, 't' : false},
 /* [7, 1] */		{'l': true, 't' : false},
 /* [7, 2] */		{'l': false, 't' : false},
 /* [7, 3] */		{'l': false, 't' : false},
 /* [7, 4] */		{'l': false, 't' : true},
 /* [7, 5] */		{'l': false, 't' : true},
 /* [7, 6] */		{'l': false, 't' : true},
 /* [7, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [8, 0] */		{'l': false, 't' : false},
 /* [8, 1] */		{'l': true, 't' : false},
 /* [8, 2] */		{'l': true, 't' : false},
 /* [8, 3] */		{'l': true, 't' : false},
 /* [8, 4] */		{'l': false, 't' : true},
 /* [8, 5] */		{'l': true, 't' : false},
 /* [8, 6] */		{'l': true, 't' : true},
 /* [8, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [9, 0] */		{'l': false, 't' : false},
 /* [9, 1] */		{'l': false, 't' : false},
 /* [9, 2] */		{'l': false, 't' : true},
 /* [9, 3] */		{'l': false, 't' : true},
 /* [9, 4] */		{'l': false, 't' : false},
 /* [9, 5] */		{'l': false, 't' : true},
 /* [9, 6] */		{'l': false, 't' : false},
 /* [9, 7] */		{'l': false, 't' : false}			
				]	
			]
		},
		{	/* LEVEL 5 */
			pos: [0, 7],
			map: [ 
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false, 'item' : ['key2']},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false},
					{'l':false, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : true}
				],
				[	
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false, 'item' : ['key', 'finish']},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l':false, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}			
				]	
			]
		},		
		{	/* Level 6 */
			pos: [4, 4],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false},
 /* [0, 1] */		{'l': false, 't' : false},
 /* [0, 2] */		{'l': false, 't' : false},
 /* [0, 3] */		{'l': false, 't' : false},
 /* [0, 4] */		{'l': false, 't' : false},
 /* [0, 5] */		{'l': false, 't' : false},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [1, 0] */		{'l': true, 't' : false},
 /* [1, 1] */		{'l': false, 't' : false},
 /* [1, 2] */		{'l': true, 't' : false},
 /* [1, 3] */		{'l': false, 't' : false},
 /* [1, 4] */		{'l': true, 't' : false},
 /* [1, 5] */		{'l': false, 't' : false},
 /* [1, 6] */		{'l': true, 't' : false},
 /* [1, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [2, 0] */		{'l': false, 't' : false},
 /* [2, 1] */		{'l': true, 't' : false},
 /* [2, 2] */		{'l': false, 't' : false},
 /* [2, 3] */		{'l':false, 't' : false},
 /* [2, 4] */		{'l': false, 't' : false},
 /* [2, 5] */		{'l': true, 't' : false},
 /* [2, 6] */		{'l': false, 't' : false},
 /* [2, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [3, 0] */		{'l': true, 't' : false},
 /* [3, 1] */		{'l': false, 't' : false},
 /* [3, 2] */		{'l': true, 't' : false},
 /* [3, 3] */		{'l': false, 't' : false},
 /* [3, 4] */		{'l': true, 't' : false},
 /* [3, 5] */		{'l': false, 't' : false},
 /* [3, 6] */		{'l': true, 't' : false},
 /* [3, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [4, 0] */		{'l': false, 't' : false},
 /* [4, 1] */		{'l': false, 't' : false},
 /* [4, 2] */		{'l': true, 't' : false},
 /* [4, 3] */		{'l': false, 't' : false},
 /* [4, 4] */		{'l': true, 't' : false},
 /* [4, 5] */		{'l': true, 't' : true, 'item' : ['key', 'finish']},
 /* [4, 6] */		{'l': false, 't' : false},
 /* [4, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [5, 0] */		{'l': false, 't' : false},
 /* [5, 1] */		{'l': true, 't' : false},
 /* [5, 2] */		{'l': false, 't' : false},
 /* [5, 3] */		{'l': false, 't' : true},
 /* [5, 4] */		{'l': false, 't' : false},
 /* [5, 5] */		{'l': false, 't' : false},
 /* [5, 6] */		{'l': true, 't' : false},
 /* [5, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [6, 0] */		{'l': false, 't' : false},
 /* [6, 1] */		{'l': true, 't' : false},
 /* [6, 2] */		{'l': true, 't' : false},
 /* [6, 3] */		{'l': true, 't' : false},
 /* [6, 4] */		{'l': false, 't' : false},
 /* [6, 5] */		{'l': true, 't' : false},
 /* [6, 6] */		{'l': false, 't' : false},
 /* [6, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [7, 0] */		{'l': true, 't' : false},
 /* [7, 1] */		{'l': false, 't' : false},
 /* [7, 2] */		{'l': true, 't' : false},
 /* [7, 3] */		{'l': false, 't' : false},
 /* [7, 4] */		{'l': true, 't' : false},
 /* [7, 5] */		{'l': false, 't' : false},
 /* [7, 6] */		{'l': true, 't' : false},
 /* [7, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [8, 0] */		{'l': false, 't' : false},
 /* [8, 1] */		{'l': true, 't' : false},
 /* [8, 2] */		{'l': false, 't' : false},
 /* [8, 3] */		{'l': false, 't' : false},
 /* [8, 4] */		{'l': false, 't' : false},
 /* [8, 5] */		{'l': true, 't' : false},
 /* [8, 6] */		{'l': false, 't' : false},
 /* [8, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [9, 0] */		{'l': true, 't' : false},
 /* [9, 1] */		{'l': false, 't' : false},
 /* [9, 2] */		{'l': true, 't' : false},
 /* [9, 3] */		{'l': false, 't' : false},
 /* [9, 4] */		{'l': true, 't' : false},
 /* [9, 5] */		{'l': false, 't' : false},
 /* [9, 6] */		{'l': true, 't' : false},
 /* [9, 7] */		{'l': false, 't' : false}			
				]	
			]
		},
		{	/* Level 7 */
			pos: [0, 1],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false},
 /* [0, 1] */		{'l': false, 't' : false},
 /* [0, 2] */		{'l': false, 't' : false},
 /* [0, 3] */		{'l': false, 't' : false},
 /* [0, 4] */		{'l': false, 't' : true},
 /* [0, 5] */		{'l': false, 't' : false},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [1, 0] */		{'l': false, 't' : false, 'item' : ['teleport t1'], teleportTarget: [4, 5], dontMark: true},
 /* [1, 1] */		{'l': false, 't' : false},
 /* [1, 2] */		{'l': false, 't' : true, 'item' : ['teleport t1'], teleportTarget: [2, 5], dontMark: true},
 /* [1, 3] */		{'l': true, 't' : false},
 /* [1, 4] */		{'l': false, 't' : true},
 /* [1, 5] */		{'l': false, 't' : true},
 /* [1, 6] */		{'l': true, 't' : false},
 /* [1, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [2, 0] */		{'l': true, 't' : false},
 /* [2, 1] */		{'l': false, 't' : false},
 /* [2, 2] */		{'l': false, 't' : true},
 /* [2, 3] */		{'l': false, 't' : true},
 /* [2, 4] */		{'l': false, 't' : false},
 /* [2, 5] */		{'l': false, 't' : true, 'item' : ['teleport t1'], teleportTarget: [1, 2], dontMark: true},
 /* [2, 6] */		{'l': true, 't' : true},
 /* [2, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [3, 0] */		{'l': false, 't' : false},
 /* [3, 1] */		{'l': true, 't' : true},
 /* [3, 2] */		{'l': true, 't' : false},
 /* [3, 3] */		{'l': true, 't' : false, 'item' : ['lock'], dontMark: true, 'moveOver': true},
 /* [3, 4] */		{'l': true, 't' : false},
 /* [3, 5] */		{'l': false, 't' : false},
 /* [3, 6] */		{'l': true, 't' : true},
 /* [3, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [4, 0] */		{'l': false, 't' : false},
 /* [4, 1] */		{'l': false, 't' : false},
 /* [4, 2] */		{'l': true, 't' : false},
 /* [4, 3] */		{'l': false, 't' : true},
 /* [4, 4] */		{'l': true, 't' : true},
 /* [4, 5] */		{'l': false, 't' : true, 'item' : ['teleport t1'], teleportTarget: [1, 0], dontMark: true},
 /* [4, 6] */		{'l': true, 't' : false},
 /* [4, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [5, 0] */		{'l': true, 't' : false},
 /* [5, 1] */		{'l': false, 't' : false},
 /* [5, 2] */		{'l': true, 't' : true},
 /* [5, 3] */		{'l': false, 't' : true},
 /* [5, 4] */		{'l': false, 't' : true},
 /* [5, 5] */		{'l': true, 't' : false},
 /* [5, 6] */		{'l': false, 't' : false},
 /* [5, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [6, 0] */		{'l': false, 't' : false},
 /* [6, 1] */		{'l': false, 't' : false},
 /* [6, 2] */		{'l': false, 't' : false},
 /* [6, 3] */		{'l': false, 't' : true},
 /* [6, 4] */		{'l': false, 't' : false},
 /* [6, 5] */		{'l': true, 't' : false},
 /* [6, 6] */		{'l': true, 't' : false},
 /* [6, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [7, 0] */		{'l': true, 't' : false},
 /* [7, 1] */		{'l': true, 't' : false},
 /* [7, 2] */		{'l': false, 't' : false},
 /* [7, 3] */		{'l': false, 't' : false},
 /* [7, 4] */		{'l': true, 't' : true},
 /* [7, 5] */		{'l': true, 't' : false},
 /* [7, 6] */		{'l': false, 't' : false},
 /* [7, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [8, 0] */		{'l': false, 't' : false},
 /* [8, 1] */		{'l': true, 't' : false},
 /* [8, 2] */		{'l': false, 't' : false},
 /* [8, 3] */		{'l': false, 't' : true},
 /* [8, 4] */		{'l': false, 't' : true},
 /* [8, 5] */		{'l': true, 't' : false},
 /* [8, 6] */		{'l': false, 't' : true},
 /* [8, 7] */		{'l': true, 't' : true, 'item' : ['key', 'finish']}
				],
				[	
 /* [9, 0] */		{'l': false, 't' : false},
 /* [9, 1] */		{'l': true, 't' : false},
 /* [9, 2] */		{'l': true, 't' : false},
 /* [9, 3] */		{'l': true, 't' : false},
 /* [9, 4] */		{'l': false, 't' : false},
 /* [9, 5] */		{'l': true, 't' : true},
 /* [9, 6] */		{'l': false, 't' : false},
 /* [9, 7] */		{'l': false, 't' : false}			
				]	
			]
		},
		{	/* Level 8 */
			pos: [9, 7],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false},
 /* [0, 1] */		{'l': false, 't' : false},
 /* [0, 2] */		{'l': false, 't' : false},
 /* [0, 3] */		{'l': false, 't' : true},
 /* [0, 4] */		{'l': false, 't' : false},
 /* [0, 5] */		{'l': false, 't' : true},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [1, 0] */		{'l': false, 't' : false},
 /* [1, 1] */		{'l': false, 't' : false, 'item' : ['key', 'finish']},
 /* [1, 2] */		{'l': false, 't' : true},
 /* [1, 3] */		{'l': false, 't' : false},
 /* [1, 4] */		{'l': false, 't' : true},
 /* [1, 5] */		{'l': false, 't' : false},
 /* [1, 6] */		{'l': false, 't' : true},
 /* [1, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [2, 0] */		{'l': false, 't' : false},
 /* [2, 1] */		{'l': true, 't' : false},
 /* [2, 2] */		{'l': true, 't' : true},
 /* [2, 3] */		{'l': false, 't' : true},
 /* [2, 4] */		{'l': false, 't' : false},
 /* [2, 5] */		{'l': true, 't' : true},
 /* [2, 6] */		{'l': true, 't' : true},
 /* [2, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [3, 0] */		{'l': false, 't' : false},
 /* [3, 1] */		{'l': false, 't' : true},
 /* [3, 2] */		{'l': false, 't' : false},
 /* [3, 3] */		{'l': true, 't' : false},
 /* [3, 4] */		{'l': false, 't' : true},
 /* [3, 5] */		{'l': false, 't' : false},
 /* [3, 6] */		{'l': false, 't' : false},
 /* [3, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [4, 0] */		{'l': false, 't' : false},
 /* [4, 1] */		{'l': true, 't' : false},
 /* [4, 2] */		{'l': false, 't' : true},
 /* [4, 3] */		{'l': false, 't' : true},
 /* [4, 4] */		{'l': false, 't' : false},
 /* [4, 5] */		{'l': false, 't' : true},
 /* [4, 6] */		{'l': true, 't' : false},
 /* [4, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [5, 0] */		{'l': false, 't' : false},
 /* [5, 1] */		{'l': false, 't' : false},
 /* [5, 2] */		{'l': false, 't' : false},
 /* [5, 3] */		{'l': false, 't' : true},
 /* [5, 4] */		{'l': false, 't' : false},
 /* [5, 5] */		{'l': false, 't' : true},
 /* [5, 6] */		{'l': false, 't' : false},
 /* [5, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [6, 0] */		{'l': false, 't' : false},
 /* [6, 1] */		{'l': true, 't' : false},
 /* [6, 2] */		{'l': false, 't' : false},
 /* [6, 3] */		{'l': false, 't' : false},
 /* [6, 4] */		{'l': false, 't' : true},
 /* [6, 5] */		{'l': false, 't' : false},
 /* [6, 6] */		{'l': true, 't' : false},
 /* [6, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [7, 0] */		{'l': true, 't' : false},
 /* [7, 1] */		{'l': false, 't' : false},
 /* [7, 2] */		{'l': false, 't' : true},
 /* [7, 3] */		{'l': false, 't' : true},
 /* [7, 4] */		{'l': true, 't' : true},
 /* [7, 5] */		{'l': false, 't' : true},
 /* [7, 6] */		{'l': false, 't' : true, 'item' : ['slidedown'], dontMark: true},
 /* [7, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [8, 0] */		{'l': false, 't' : false},
 /* [8, 1] */		{'l': true, 't' : false},
 /* [8, 2] */		{'l': true, 't' : false},
 /* [8, 3] */		{'l': false, 't' : false},
 /* [8, 4] */		{'l': false, 't' : true},
 /* [8, 5] */		{'l': true, 't' : false, 'item' : ['slidedown'], dontMark: true},
 /* [8, 6] */		{'l': true, 't' : false},
 /* [8, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [9, 0] */		{'l': false, 't' : false},
 /* [9, 1] */		{'l': false, 't' : false},
 /* [9, 2] */		{'l': false, 't' : false},
 /* [9, 3] */		{'l':false, 't' : true},
 /* [9, 4] */		{'l': false, 't' : false},
 /* [9, 5] */		{'l': false, 't' : true},
 /* [9, 6] */		{'l': false, 't' : false},
 /* [9, 7] */		{'l': false, 't' : false}			
				]	
			]
		},
		{	/* Level 9 */
			pos: [0, 0],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false},
 /* [0, 1] */		{'l': false, 't' : false},
 /* [0, 2] */		{'l': false, 't' : false},
 /* [0, 3] */		{'l': false, 't' : false},
 /* [0, 4] */		{'l': false, 't' : false, 'item' : ['key2']},
 /* [0, 5] */		{'l': false, 't' : true, 'item' : ['key', 'finish']},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [1, 0] */		{'l': false, 't' : false},
 /* [1, 1] */		{'l': true, 't' : false},
 /* [1, 2] */		{'l': false, 't' : true, 'item' : ['lock'], dontMark: true, 'moveOver': true},
 /* [1, 3] */		{'l': true, 't' : true},
 /* [1, 4] */		{'l': false, 't' : true},
 /* [1, 5] */		{'l': true, 't' : true},
 /* [1, 6] */		{'l': true, 't' : false},
 /* [1, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [2, 0] */		{'l': true, 't' : false},
 /* [2, 1] */		{'l': false, 't' : false},
 /* [2, 2] */		{'l': false, 't' : false},
 /* [2, 3] */		{'l': false, 't' : false, 'item' : ['key2']},
 /* [2, 4] */		{'l': false, 't' : false},
 /* [2, 5] */		{'l': false, 't' : true},
 /* [2, 6] */		{'l': true, 't' : false},
 /* [2, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [3, 0] */		{'l': false, 't' : false},
 /* [3, 1] */		{'l': false, 't' : false},
 /* [3, 2] */		{'l': false, 't' : false},
 /* [3, 3] */		{'l': true, 't' : true},
 /* [3, 4] */		{'l': true, 't' : false},
 /* [3, 5] */		{'l': false, 't' : true},
 /* [3, 6] */		{'l': true, 't' : false},
 /* [3, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [4, 0] */		{'l': true, 't' : false},
 /* [4, 1] */		{'l': false, 't' : false},
 /* [4, 2] */		{'l': true, 't' : false},
 /* [4, 3] */		{'l': false, 't' : false},
 /* [4, 4] */		{'l': false, 't' : false},
 /* [4, 5] */		{'l': false, 't' : true},
 /* [4, 6] */		{'l': true, 't' : false},
 /* [4, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [5, 0] */		{'l': false, 't' : false},
 /* [5, 1] */		{'l': true, 't' : false},
 /* [5, 2] */		{'l': false, 't' : false},
 /* [5, 3] */		{'l': false, 't' : true},
 /* [5, 4] */		{'l': true, 't' : false},
 /* [5, 5] */		{'l': true, 't' : true},
 /* [5, 6] */		{'l': true, 't' : false},
 /* [5, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [6, 0] */		{'l': true, 't' : false},
 /* [6, 1] */		{'l': false, 't' : false},
 /* [6, 2] */		{'l': true, 't' : false},
 /* [6, 3] */		{'l': true, 't' : false},
 /* [6, 4] */		{'l': false, 't' : true},
 /* [6, 5] */		{'l': false, 't' : true},
 /* [6, 6] */		{'l': true, 't' : false},
 /* [6, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [7, 0] */		{'l': false, 't' : false},
 /* [7, 1] */		{'l': true, 't' : false},
 /* [7, 2] */		{'l': false, 't' : false},
 /* [7, 3] */		{'l': false, 't' : false},
 /* [7, 4] */		{'l': false, 't' : false},
 /* [7, 5] */		{'l': false, 't' : true},
 /* [7, 6] */		{'l': false, 't' : true},
 /* [7, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [8, 0] */		{'l': false, 't' : false},
 /* [8, 1] */		{'l': true, 't' : false},
 /* [8, 2] */		{'l': true, 't' : false},
 /* [8, 3] */		{'l': true, 't' : false},
 /* [8, 4] */		{'l': false, 't' : true},
 /* [8, 5] */		{'l': true, 't' : false},
 /* [8, 6] */		{'l': true, 't' : true},
 /* [8, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [9, 0] */		{'l': false, 't' : false},
 /* [9, 1] */		{'l': false, 't' : false},
 /* [9, 2] */		{'l': false, 't' : false},
 /* [9, 3] */		{'l': false, 't' : true},
 /* [9, 4] */		{'l': false, 't' : true},
 /* [9, 5] */		{'l': false, 't' : false},
 /* [9, 6] */		{'l': false, 't' : false},
 /* [9, 7] */		{'l': false, 't' : false}			
				]	
			]
		},
		{	/* Level 10 */
			pos: [9, 0],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false},
 /* [0, 1] */		{'l': false, 't' : false},
 /* [0, 2] */		{'l': false, 't' : false},
 /* [0, 3] */		{'l': false, 't' : false},
 /* [0, 4] */		{'l': false, 't' : false},
 /* [0, 5] */		{'l': false, 't' : true},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [1, 0] */		{'l': false, 't' : false},
 /* [1, 1] */		{'l': true, 't' : false},
 /* [1, 2] */		{'l': false, 't' : false},
 /* [1, 3] */		{'l': false, 't' : false},
 /* [1, 4] */		{'l': false, 't' : false},
 /* [1, 5] */		{'l': false, 't' : false},
 /* [1, 6] */		{'l': true, 't' : false},
 /* [1, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [2, 0] */		{'l': false, 't' : false},
 /* [2, 1] */		{'l': false, 't' : false},
 /* [2, 2] */		{'l': true, 't' : false},
 /* [2, 3] */		{'l': false, 't' : false},
 /* [2, 4] */		{'l': true, 't' : false},
 /* [2, 5] */		{'l': false, 't' : false},
 /* [2, 6] */		{'l': false, 't' : false},
 /* [2, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [3, 0] */		{'l': false, 't' : false},
 /* [3, 1] */		{'l': false, 't' : false},
 /* [3, 2] */		{'l': false, 't' : true},
 /* [3, 3] */		{'l': false, 't' : false},
 /* [3, 4] */		{'l': false, 't' : true},
 /* [3, 5] */		{'l': true, 't' : false},
 /* [3, 6] */		{'l': false, 't' : true},
 /* [3, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [4, 0] */		{'l': false, 't' : false},
 /* [4, 1] */		{'l': true, 't' : false},
 /* [4, 2] */		{'l': true, 't' : true},
 /* [4, 3] */		{'l': false, 't' : true},
 /* [4, 4] */		{'l': true, 't' : false},
 /* [4, 5] */		{'l': false, 't' : true},
 /* [4, 6] */		{'l': false, 't' : true},
 /* [4, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [5, 0] */		{'l': false, 't' : false},
 /* [5, 1] */		{'l': false, 't' : true},
 /* [5, 2] */		{'l': false, 't' : false},
 /* [5, 3] */		{'l': false, 't' : false},
 /* [5, 4] */		{'l': false, 't' : false},
 /* [5, 5] */		{'l': false, 't' : true},
 /* [5, 6] */		{'l': false, 't' : true},
 /* [5, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [6, 0] */		{'l': false, 't' : false},
 /* [6, 1] */		{'l': true, 't' : false},
 /* [6, 2] */		{'l': false, 't' : false},
 /* [6, 3] */		{'l': true, 't' : false},
 /* [6, 4] */		{'l': false, 't' : true},
 /* [6, 5] */		{'l': false, 't' : true},
 /* [6, 6] */		{'l': false, 't' : false},
 /* [6, 7] */		{'l': false, 't' : true, 'item' : ['key', 'finish']}
				],
				[	
 /* [7, 0] */		{'l': false, 't' : false},
 /* [7, 1] */		{'l': false, 't' : true},
 /* [7, 2] */		{'l': true, 't' : false},
 /* [7, 3] */		{'l': true, 't' : false},
 /* [7, 4] */		{'l': true, 't' : true},
 /* [7, 5] */		{'l': false, 't' : false},
 /* [7, 6] */		{'l': true, 't' : false},
 /* [7, 7] */		{'l': true, 't' : true}
				],
				[	
 /* [8, 0] */		{'l': true, 't' : false},
 /* [8, 1] */		{'l': false, 't' : true},
 /* [8, 2] */		{'l': false, 't' : false},
 /* [8, 3] */		{'l': true, 't' : false},
 /* [8, 4] */		{'l': false, 't' : false},
 /* [8, 5] */		{'l': true, 't' : true},
 /* [8, 6] */		{'l': false, 't' : false},
 /* [8, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [9, 0] */		{'l': false, 't' : false},
 /* [9, 1] */		{'l': false, 't' : false},
 /* [9, 2] */		{'l': true, 't' : false},
 /* [9, 3] */		{'l': false, 't' : false},
 /* [9, 4] */		{'l': false, 't' : true},
 /* [9, 5] */		{'l': false, 't' : false},
 /* [9, 6] */		{'l': false, 't' : false},
 /* [9, 7] */		{'l': true, 't' : false}			
				]	
			]
		},
		{	/* LEVEL 11 */
			pos: [4, 7],
			map: [ 
				[
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[
					{'l': false, 't' : false},
					{'l': true, 't' : false, 'item' : ['key', 'finish']},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : false, 'item' : ['teleport t1'], teleportTarget: [7, 0], dontMark: true},
					{'l': false, 't' : true},
					{'l': false, 't' : true}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l':false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : true}
				],
				[	
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false}
				],
				[	
					{'l': false, 't' : false, 'item' : ['teleport t1'], teleportTarget: [1, 5], dontMark: true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : true}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l':false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false}			
				]	
			]
		},
		{	/* LEVEL 12 */
			pos: [0, 0],
			map: [ 
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l':true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': true, 't' : true}
				],
				[	
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true}
				],
				[	
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : true}
				],
				[	
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': true, 't' : true},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l':false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false, 'item' : ['key', 'finish']},
					{'l': false, 't' : true}			
				]	
			]
		},

		{	/* LEVEL 13 */
			pos: [9, 5],
			map: [ 
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false, 'item' : ['key2']},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false, 'item' : ['key', 'finish']},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false, 'item' : ['teleport t1'], teleportTarget: [6, 4], dontMark: true},
					{'l': true, 't' : false},
					{'l':false, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true, 'item' : ['teleport t2'], teleportTarget: [2, 1], dontMark: true},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': true, 't' : true},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}			
				]	
			]
		},
		{	/* LEVEL 14 */
			enemy: {
				'0' : {'id' : 1, 'item' : 'enemy1', 'startPos' : [0, 7], 'road' : [[2, 6], [0, 5], [1, 7], [0, 5], [2, 6], [0, 7]]}
			},			
			pos: [4, 7],
			map: [ 
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false, 'item' : ['key', 'finish']},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l':false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : true}
				],
				[	
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : true}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l':false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false}			
				]	
			]
		},
		{	/* LEVEL 15 */
			pos: [0, 1],
			map: [ 
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false}	
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false}	
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true}	
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': false, 't' : false}	
				],
				[	
					{'l': true, 't' : false},
					{'l': true, 't' : false, 'item' : ['slidedown'], dontMark: true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true}	
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false, 'item' : ['slidedown'], dontMark: true},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}	
				],
				[	
					{'l': false, 't' : false, 'item' : ['lock'], dontMark: true, 'moveOver': true},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true}	
				],
				[	
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': true, 't' : false, 'item' : ['lock'], dontMark: true, 'moveOver': true},
					{'l': false, 't' : false}	
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}	
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false, 'item' : ['key', 'finish']},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}			
				]	
			]
		},		
		{	/* LEVEL 16 */
			pos: [7, 7],
			map: [ 
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false, 'item' : ['key', 'finish']},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false, 'item' : ['slidedown'], dontMark: true},
					{'l': true, 't' : false, 'item' : ['slidedown'], dontMark: true},
					{'l': true, 't' : false, 'item' : ['slidedown'], dontMark: true},
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': true, 't' : false}
				],
				[	
					{'l': true, 't' : false, 'item' : ['slidedown'], dontMark: true},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false, 'item' : ['slidedown'], dontMark: true},
					{'l': false, 't' : false},
					{'l': true, 't' : true},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false, 'item' : ['slidedown'], dontMark: true},
					{'l': false, 't' : false, 'item' : ['slidedown'], dontMark: true},
					{'l': true, 't' : false},
					{'l': false, 't' : true}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : true}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false, 'item' : ['lock'], dontMark: true, 'moveOver': true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true, 'item' : ['slidedown'], dontMark: true,},
					{'l': false, 't' : false}			
				]	
			]
		},		
		{	/* LEVEL 17 */
			pos: [4, 7],
			map: [ 
				[	
					{'l': false, 't' : false, 'item' : ['teleport t1'], teleportTarget: [8, 7], dontMark: true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false, 'item' : ['teleport t1'], teleportTarget: [8, 5], dontMark: true},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true}
				],
				[	
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': true, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': true, 't' : true},
					{'l': true, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : true},
					{'l': true, 't' : false},
					{'l': false, 't' : true},
					{'l': true, 't' : true}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : true},
					{'l': false, 't' : false, 'item' : ['teleport t1'], teleportTarget: [1, 0], dontMark: true},
					{'l': false, 't' : false},
					{'l': false, 't' : false, 'item' : ['teleport t1'], teleportTarget: [0, 0], dontMark: true}
				],
				[	
					{'l': false, 't' : false, 'item' : ['key', 'finish']},
					{'l': true, 't' : false},
					{'l': false, 't' : false},
					{'l':false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : false}			
				]	
			]
		},		
		{	/* Level 18 */
			pos: [4, 0],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false},
 /* [0, 1] */		{'l': false, 't' : false},
 /* [0, 2] */		{'l': false, 't' : false},
 /* [0, 3] */		{'l': false, 't' : false},
 /* [0, 4] */		{'l': false, 't' : true},
 /* [0, 5] */		{'l': false, 't' : false},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [1, 0] */		{'l': false, 't' : false, 'item' : ['teleport t1'], teleportTarget: [4, 2], dontMark: true},
 /* [1, 1] */		{'l': false, 't' : true},
 /* [1, 2] */		{'l': false, 't' : true},
 /* [1, 3] */		{'l': false, 't' : true},
 /* [1, 4] */		{'l': false, 't' : true},
 /* [1, 5] */		{'l': false, 't' : true},
 /* [1, 6] */		{'l': true, 't' : false},
 /* [1, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [2, 0] */		{'l': false, 't' : false},
 /* [2, 1] */		{'l': false, 't' : false},
 /* [2, 2] */		{'l': false, 't' : true},
 /* [2, 3] */		{'l': true, 't' : false},
 /* [2, 4] */		{'l': false, 't' : false},
 /* [2, 5] */		{'l': true, 't' : true},
 /* [2, 6] */		{'l': false, 't' : false},
 /* [2, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [3, 0] */		{'l': false, 't' : false},
 /* [3, 1] */		{'l': true, 't' : false},
 /* [3, 2] */		{'l': true, 't' : true},
 /* [3, 3] */		{'l': true, 't' : false},
 /* [3, 4] */		{'l': true, 't' : false},
 /* [3, 5] */		{'l': false, 't' : true},
 /* [3, 6] */		{'l': false, 't' : false},
 /* [3, 7] */		{'l': false, 't' : false, 'item' : ['key', 'finish']}
				],
				[	
 /* [4, 0] */		{'l': true, 't' : false},
 /* [4, 1] */		{'l': false, 't' : true},
 /* [4, 2] */		{'l': false, 't' : true, 'item' : ['teleport t1'], teleportTarget: [1, 0], dontMark: true},
 /* [4, 3] */		{'l': true, 't' : false},
 /* [4, 4] */		{'l': false, 't' : true},
 /* [4, 5] */		{'l': true, 't' : true},
 /* [4, 6] */		{'l': true, 't' : false},
 /* [4, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [5, 0] */		{'l': false, 't' : false},
 /* [5, 1] */		{'l': false, 't' : false},
 /* [5, 2] */		{'l': true, 't' : false},
 /* [5, 3] */		{'l': false, 't' : true},
 /* [5, 4] */		{'l': false, 't' : true},
 /* [5, 5] */		{'l': false, 't' : true},
 /* [5, 6] */		{'l': false, 't' : false},
 /* [5, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [6, 0] */		{'l': true, 't' : false},
 /* [6, 1] */		{'l': false, 't' : false},
 /* [6, 2] */		{'l': false, 't' : true},
 /* [6, 3] */		{'l': false, 't' : false, 'item' : ['teleport t1'], teleportTarget: [7, 5], dontMark: true},
 /* [6, 4] */		{'l': true, 't' : true},
 /* [6, 5] */		{'l': true, 't' : false},
 /* [6, 6] */		{'l': true, 't' : false},
 /* [6, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [7, 0] */		{'l': true, 't' : false},
 /* [7, 1] */		{'l': false, 't' : true, 'item' : ['teleport t1'], teleportTarget: [8, 6], dontMark: true},
 /* [7, 2] */		{'l': true, 't' : false},
 /* [7, 3] */		{'l': true, 't' : false},
 /* [7, 4] */		{'l': false, 't' : false},
 /* [7, 5] */		{'l': false, 't' : true, 'item' : ['teleport t1'], teleportTarget: [6, 3], dontMark: true},
 /* [7, 6] */		{'l': false, 't' : true},
 /* [7, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [8, 0] */		{'l': false, 't' : false},
 /* [8, 1] */		{'l': true, 't' : false},
 /* [8, 2] */		{'l': false, 't' : false},
 /* [8, 3] */		{'l': true, 't' : false},
 /* [8, 4] */		{'l': false, 't' : true},
 /* [8, 5] */		{'l': false, 't' : true},
 /* [8, 6] */		{'l': false, 't' : true, 'item' : ['teleport t1'], teleportTarget: [7, 1], dontMark: true},
 /* [8, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [9, 0] */		{'l': true, 't' : false},
 /* [9, 1] */		{'l': true, 't' : false},
 /* [9, 2] */		{'l': false, 't' : false},
 /* [9, 3] */		{'l': false, 't' : false},
 /* [9, 4] */		{'l': false, 't' : true},
 /* [9, 5] */		{'l': false, 't' : false},
 /* [9, 6] */		{'l': true, 't' : false},
 /* [9, 7] */		{'l': false, 't' : false}			
				]	
			]
		},
		{	/* Level *** */
			pos: [4, 3],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false},
 /* [0, 1] */		{'l': false, 't' : false},
 /* [0, 2] */		{'l': false, 't' : false},
 /* [0, 3] */		{'l': false, 't' : false},
 /* [0, 4] */		{'l': false, 't' : false},
 /* [0, 5] */		{'l': false, 't' : false},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [1, 0] */		{'l': false, 't' : false},
 /* [1, 1] */		{'l': false, 't' : false},
 /* [1, 2] */		{'l': false, 't' : false},
 /* [1, 3] */		{'l': false, 't' : false},
 /* [1, 4] */		{'l': false, 't' : false},
 /* [1, 5] */		{'l': false, 't' : false},
 /* [1, 6] */		{'l': false, 't' : false},
 /* [1, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [2, 0] */		{'l': false, 't' : false},
 /* [2, 1] */		{'l': false, 't' : false},
 /* [2, 2] */		{'l': false, 't' : false},
 /* [2, 3] */		{'l': false, 't' : false},
 /* [2, 4] */		{'l': false, 't' : false},
 /* [2, 5] */		{'l': false, 't' : false},
 /* [2, 6] */		{'l': false, 't' : false},
 /* [2, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [3, 0] */		{'l': false, 't' : false},
 /* [3, 1] */		{'l': false, 't' : false},
 /* [3, 2] */		{'l': false, 't' : false},
 /* [3, 3] */		{'l': false, 't' : false},
 /* [3, 4] */		{'l': false, 't' : false},
 /* [3, 5] */		{'l': false, 't' : false},
 /* [3, 6] */		{'l': false, 't' : false},
 /* [3, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [4, 0] */		{'l': false, 't' : false},
 /* [4, 1] */		{'l': false, 't' : false},
 /* [4, 2] */		{'l': false, 't' : false},
 /* [4, 3] */		{'l': false, 't' : false},
 /* [4, 4] */		{'l': false, 't' : false},
 /* [4, 5] */		{'l': false, 't' : false},
 /* [4, 6] */		{'l': false, 't' : false},
 /* [4, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [5, 0] */		{'l': false, 't' : false},
 /* [5, 1] */		{'l': false, 't' : false},
 /* [5, 2] */		{'l': false, 't' : false},
 /* [5, 3] */		{'l': false, 't' : false, 'item' : ['key', 'finish']},
 /* [5, 4] */		{'l': false, 't' : false},
 /* [5, 5] */		{'l': false, 't' : false},
 /* [5, 6] */		{'l': false, 't' : false},
 /* [5, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [6, 0] */		{'l': false, 't' : false},
 /* [6, 1] */		{'l': false, 't' : false},
 /* [6, 2] */		{'l': false, 't' : false},
 /* [6, 3] */		{'l': false, 't' : false},
 /* [6, 4] */		{'l': false, 't' : false},
 /* [6, 5] */		{'l': false, 't' : false},
 /* [6, 6] */		{'l': false, 't' : false},
 /* [6, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [7, 0] */		{'l': false, 't' : false},
 /* [7, 1] */		{'l': false, 't' : false},
 /* [7, 2] */		{'l': false, 't' : false},
 /* [7, 3] */		{'l': false, 't' : false},
 /* [7, 4] */		{'l': false, 't' : false},
 /* [7, 5] */		{'l': false, 't' : false},
 /* [7, 6] */		{'l': false, 't' : false},
 /* [7, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [8, 0] */		{'l': false, 't' : false},
 /* [8, 1] */		{'l': false, 't' : false},
 /* [8, 2] */		{'l': false, 't' : false},
 /* [8, 3] */		{'l': false, 't' : false},
 /* [8, 4] */		{'l': false, 't' : false},
 /* [8, 5] */		{'l': false, 't' : false},
 /* [8, 6] */		{'l': false, 't' : false},
 /* [8, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [9, 0] */		{'l': false, 't' : false},
 /* [9, 1] */		{'l': false, 't' : false},
 /* [9, 2] */		{'l': false, 't' : false},
 /* [9, 3] */		{'l': false, 't' : false},
 /* [9, 4] */		{'l': false, 't' : false},
 /* [9, 5] */		{'l': false, 't' : false},
 /* [9, 6] */		{'l': false, 't' : false},
 /* [9, 7] */		{'l': false, 't' : false}			
				]	
			]
		},
		{	/* Level 20 */
			pos: [1, 1],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false},
 /* [0, 1] */		{'l': false, 't' : false},
 /* [0, 2] */		{'l': false, 't' : false},
 /* [0, 3] */		{'l': false, 't' : false},
 /* [0, 4] */		{'l': false, 't' : false},
 /* [0, 5] */		{'l': false, 't' : false, 'item' : ['key', 'finish']},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [1, 0] */		{'l': false, 't' : false},
 /* [1, 1] */		{'l': true, 't' : true},
 /* [1, 2] */		{'l': false, 't' : true},
 /* [1, 3] */		{'l': false, 't' : false},
 /* [1, 4] */		{'l': true, 't' : false},
 /* [1, 5] */		{'l': true, 't' : true},
 /* [1, 6] */		{'l': false, 't' : false},
 /* [1, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [2, 0] */		{'l': false, 't' : false},
 /* [2, 1] */		{'l': false, 't' : false},
 /* [2, 2] */		{'l': true, 't' : false},
 /* [2, 3] */		{'l': true, 't' : false},
 /* [2, 4] */		{'l': true, 't' : true},
 /* [2, 5] */		{'l': false, 't' : false},
 /* [2, 6] */		{'l': true, 't' : false},
 /* [2, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [3, 0] */		{'l': false, 't' : false},
 /* [3, 1] */		{'l': true, 't' : false},
 /* [3, 2] */		{'l': false, 't' : false},
 /* [3, 3] */		{'l': false, 't' : false},
 /* [3, 4] */		{'l': false, 't' : false, 'item' : ['lock'], dontMark: true, 'moveOver': true},
 /* [3, 5] */		{'l': true, 't' : false},
 /* [3, 6] */		{'l': false, 't' : true},
 /* [3, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [4, 0] */		{'l': false, 't' : false, 'item' : ['lock'], dontMark: true, 'moveOver': true},
 /* [4, 1] */		{'l': false, 't' : true},
 /* [4, 2] */		{'l': true, 't' : false},
 /* [4, 3] */		{'l': false, 't' : false},
 /* [4, 4] */		{'l': false, 't' : false},
 /* [4, 5] */		{'l': true, 't' : false},
 /* [4, 6] */		{'l': true, 't' : true},
 /* [4, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [5, 0] */		{'l': false, 't' : false},
 /* [5, 1] */		{'l': true, 't' : false},
 /* [5, 2] */		{'l': true, 't' : false},
 /* [5, 3] */		{'l': true, 't' : false},
 /* [5, 4] */		{'l': true, 't' : false},
 /* [5, 5] */		{'l': true, 't' : true},
 /* [5, 6] */		{'l': false, 't' : true},
 /* [5, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [6, 0] */		{'l': true, 't' : false},
 /* [6, 1] */		{'l': true, 't' : false},
 /* [6, 2] */		{'l': false, 't' : false},
 /* [6, 3] */		{'l': false, 't' : true},
 /* [6, 4] */		{'l': false, 't' : false},
 /* [6, 5] */		{'l': false, 't' : true},
 /* [6, 6] */		{'l': true, 't' : false},
 /* [6, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [7, 0] */		{'l': false, 't' : false},
 /* [7, 1] */		{'l': false, 't' : true},
 /* [7, 2] */		{'l': true, 't' : false},
 /* [7, 3] */		{'l': false, 't' : true},
 /* [7, 4] */		{'l': false, 't' : false},
 /* [7, 5] */		{'l': false, 't' : true},
 /* [7, 6] */		{'l': false, 't' : false},
 /* [7, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [8, 0] */		{'l': true, 't' : false},
 /* [8, 1] */		{'l': false, 't' : true},
 /* [8, 2] */		{'l': false, 't' : false},
 /* [8, 3] */		{'l': true, 't' : false},
 /* [8, 4] */		{'l': true, 't' : false},
 /* [8, 5] */		{'l': false, 't' : true},
 /* [8, 6] */		{'l': true, 't' : false},
 /* [8, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [9, 0] */		{'l': false, 't' : false},
 /* [9, 1] */		{'l': true, 't' : false},
 /* [9, 2] */		{'l': false, 't' : false},
 /* [9, 3] */		{'l': false, 't' : false},
 /* [9, 4] */		{'l': true, 't' : false},
 /* [9, 5] */		{'l': false, 't' : false, 'item' : ['lock'], dontMark: true, 'moveOver': true},
 /* [9, 6] */		{'l': false, 't' : true},
 /* [9, 7] */		{'l': false, 't' : false}			
				]	
			]
		},	
		{	/* LEVEL 21 */
			pos: [0, 0],
			enemy: {
				'0' : {'id' : 1, 'item' : 'enemy1', 'startPos' : [2, 4], 'road' : [[1, 2], [3, 3], [4, 5], [2, 4]]},
				'1' : {'id' : 1, 'item' : 'enemy1', 'startPos' : [8, 4], 'road' : [[9, 2], [8, 0], [6, 1], [7, 3], [6, 5], [8, 4]]},
				'2' : {'id' : 1, 'item' : 'enemy1', 'startPos' : [7, 5], 'road' : [[6, 7], [5, 5], [6, 3], [7, 5]]}
			},			
			map: [ 
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l':false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},					
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l':false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': true, 't' : false},
					{'l': true, 't' : true, 'item' : ['key', 'finish']},
					{'l': false, 't' : false}
				],
				[	
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l': false, 't' : false},
					{'l':false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : true},
					{'l': false, 't' : false},
					{'l': false, 't' : false}			
				]	
			]
		},
		{	/* Level 22 */
			pos: [9, 7],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false, 'item' : ['key', 'finish']},
 /* [0, 1] */		{'l': false, 't' : false},
 /* [0, 2] */		{'l': false, 't' : true},
 /* [0, 3] */		{'l': false, 't' : false},
 /* [0, 4] */		{'l': false, 't' : true},
 /* [0, 5] */		{'l': false, 't' : true},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [1, 0] */		{'l': true, 't' : false},
 /* [1, 1] */		{'l': false, 't' : false},
 /* [1, 2] */		{'l': false, 't' : true},
 /* [1, 3] */		{'l': false, 't' : false},
 /* [1, 4] */		{'l': false, 't' : false},
 /* [1, 5] */		{'l': false, 't' : true},
 /* [1, 6] */		{'l': false, 't' : false, 'item' : ['teleport t1'], teleportTarget: [4, 0], dontMark: true},
 /* [1, 7] */		{'l': false, 't' : false, 'item' : ['teleport t1'], teleportTarget: [7, 1], dontMark: true}
				],
				[	
 /* [2, 0] */		{'l': true, 't' : false},
 /* [2, 1] */		{'l': false, 't' : false},
 /* [2, 2] */		{'l': false, 't' : false},
 /* [2, 3] */		{'l': false, 't' : true},
 /* [2, 4] */		{'l': true, 't' : false},
 /* [2, 5] */		{'l': false, 't' : true},
 /* [2, 6] */		{'l': false, 't' : false},
 /* [2, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [3, 0] */		{'l': false, 't' : false},
 /* [3, 1] */		{'l': true, 't' : false},
 /* [3, 2] */		{'l': true, 't' : false},
 /* [3, 3] */		{'l': false, 't' : true},
 /* [3, 4] */		{'l': false, 't' : false},
 /* [3, 5] */		{'l': true, 't' : false},
 /* [3, 6] */		{'l': true, 't' : false},
 /* [3, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [4, 0] */		{'l': true, 't' : false, 'item' : ['teleport t1'], teleportTarget: [1, 6], dontMark: true},
 /* [4, 1] */		{'l': true, 't' : false},
 /* [4, 2] */		{'l': false, 't' : false},
 /* [4, 3] */		{'l': false, 't' : true},
 /* [4, 4] */		{'l': true, 't' : true},
 /* [4, 5] */		{'l': false, 't' : false},
 /* [4, 6] */		{'l': false, 't' : true},
 /* [4, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [5, 0] */		{'l': false, 't' : false},
 /* [5, 1] */		{'l': true, 't' : false},
 /* [5, 2] */		{'l': false, 't' : false},
 /* [5, 3] */		{'l': true, 't' : false},
 /* [5, 4] */		{'l': false, 't' : true},
 /* [5, 5] */		{'l': true, 't' : false},
 /* [5, 6] */		{'l': true, 't' : true},
 /* [5, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [6, 0] */		{'l': false, 't' : false},
 /* [6, 1] */		{'l': false, 't' : false},
 /* [6, 2] */		{'l': false, 't' : false},
 /* [6, 3] */		{'l': true, 't' : false},
 /* [6, 4] */		{'l': false, 't' : true},
 /* [6, 5] */		{'l': false, 't' : false},
 /* [6, 6] */		{'l': false, 't' : false},
 /* [6, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [7, 0] */		{'l': true, 't' : false},
 /* [7, 1] */		{'l': true, 't' : false, 'item' : ['teleport t1'], teleportTarget: [1, 7], dontMark: true},
 /* [7, 2] */		{'l': true, 't' : false},
 /* [7, 3] */		{'l': false, 't' : false},
 /* [7, 4] */		{'l': true, 't' : true},
 /* [7, 5] */		{'l': true, 't' : false},
 /* [7, 6] */		{'l': false, 't' : false},
 /* [7, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [8, 0] */		{'l': true, 't' : false},
 /* [8, 1] */		{'l': true, 't' : false},
 /* [8, 2] */		{'l': false, 't' : false},
 /* [8, 3] */		{'l': false, 't' : false},
 /* [8, 4] */		{'l': false, 't' : false},
 /* [8, 5] */		{'l': true, 't' : true},
 /* [8, 6] */		{'l': true, 't' : false},
 /* [8, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [9, 0] */		{'l': false, 't' : false},
 /* [9, 1] */		{'l': false, 't' : false},
 /* [9, 2] */		{'l': false, 't' : true},
 /* [9, 3] */		{'l': true, 't' : false},
 /* [9, 4] */		{'l': false, 't' : false},
 /* [9, 5] */		{'l': false, 't' : true},
 /* [9, 6] */		{'l': true, 't' : false},
 /* [9, 7] */		{'l': true, 't' : false}			
				]	
			]
		},		
		{	/* Level 23 */
			pos: [0, 4],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false},
 /* [0, 1] */		{'l': false, 't' : false},
 /* [0, 2] */		{'l': false, 't' : false},
 /* [0, 3] */		{'l': false, 't' : false},
 /* [0, 4] */		{'l': false, 't' : true},
 /* [0, 5] */		{'l': false, 't' : true},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [1, 0] */		{'l': false, 't' : false},
 /* [1, 1] */		{'l': true, 't' : false}, //, 'item' : ['lock'], dontMark: true, 'moveOver': true
 /* [1, 2] */		{'l': false, 't' : false},
 /* [1, 3] */		{'l': true, 't' : true},
 /* [1, 4] */		{'l': false, 't' : false},
 /* [1, 5] */		{'l': true, 't' : false},
 /* [1, 6] */		{'l': false, 't' : true},
 /* [1, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [2, 0] */		{'l': false, 't' : false},
 /* [2, 1] */		{'l': true, 't' : false},
 /* [2, 2] */		{'l': false, 't' : true},
 /* [2, 3] */		{'l': true, 't' : false, 'item' : ['teleport t1'], teleportTarget: [2, 5], dontMark: true},
 /* [2, 4] */		{'l': false, 't' : false},
 /* [2, 5] */		{'l': true, 't' : false, 'item' : ['teleport t1'], teleportTarget: [2, 3], dontMark: true},
 /* [2, 6] */		{'l': false, 't' : false},
 /* [2, 7] */		{'l': true, 't' : true}
				],
				[	
 /* [3, 0] */		{'l': false, 't' : false},
 /* [3, 1] */		{'l': true, 't' : true},
 /* [3, 2] */		{'l': false, 't' : false},
 /* [3, 3] */		{'l': true, 't' : false},
 /* [3, 4] */		{'l': false, 't' : false},
 /* [3, 5] */		{'l': true, 't' : false},
 /* [3, 6] */		{'l': false, 't' : true},
 /* [3, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [4, 0] */		{'l': false, 't' : false},
 /* [4, 1] */		{'l': true, 't' : false},
 /* [4, 2] */		{'l': true, 't' : false},
 /* [4, 3] */		{'l': true, 't' : false},
 /* [4, 4] */		{'l': true, 't' : false},
 /* [4, 5] */		{'l': true, 't' : false},
 /* [4, 6] */		{'l': false, 't' : false},
 /* [4, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [5, 0] */		{'l': false, 't' : false},
 /* [5, 1] */		{'l': true, 't' : false},
 /* [5, 2] */		{'l': false, 't' : true},
 /* [5, 3] */		{'l': true, 't' : false},
 /* [5, 4] */		{'l': true, 't' : false},
 /* [5, 5] */		{'l': true, 't' : false},
 /* [5, 6] */		{'l': false, 't' : true},//, 'item' : ['lock'], dontMark: true, 'moveOver': true
 /* [5, 7] */		{'l': true, 't' : true}
				],
				[	
 /* [6, 0] */		{'l': false, 't' : false},
 /* [6, 1] */		{'l': true, 't' : true},
 /* [6, 2] */		{'l': true, 't' : false},
 /* [6, 3] */		{'l': false, 't' : false},
 /* [6, 4] */		{'l': false, 't' : false},
 /* [6, 5] */		{'l': true, 't' : false},
 /* [6, 6] */		{'l': false, 't' : false},
 /* [6, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [7, 0] */		{'l': false, 't' : false},
 /* [7, 1] */		{'l': true, 't' : false},
 /* [7, 2] */		{'l': false, 't' : true},
 /* [7, 3] */		{'l': true, 't' : false},
 /* [7, 4] */		{'l': true, 't' : false},
 /* [7, 5] */		{'l': true, 't' : false},
 /* [7, 6] */		{'l': true, 't' : false},
 /* [7, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [8, 0] */		{'l': false, 't' : false},
 /* [8, 1] */		{'l': true, 't' : false},
 /* [8, 2] */		{'l': false, 't' : false},
 /* [8, 3] */		{'l': true, 't' : true},
 /* [8, 4] */		{'l': false, 't' : false},
 /* [8, 5] */		{'l': true, 't' : false},
 /* [8, 6] */		{'l': false, 't' : true},
 /* [8, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [9, 0] */		{'l': true, 't' : false, 'item' : ['teleport t1'], teleportTarget: [9, 7], dontMark: true},
 /* [9, 1] */		{'l': true, 't' : false},
 /* [9, 2] */		{'l': false, 't' : false},
 /* [9, 3] */		{'l': true, 't' : false},
 /* [9, 4] */		{'l': false, 't' : true, 'item' : ['key', 'finish']},
 /* [9, 5] */		{'l': true, 't' : true},
 /* [9, 6] */		{'l': false, 't' : false},
 /* [9, 7] */		{'l': true, 't' : false, 'item' : ['teleport t1'], teleportTarget: [9, 0], dontMark: true}			
				]	
			]
		},
		{	/* Level 24 */
			pos: [4, 4],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false},
 /* [0, 1] */		{'l': false, 't' : false, 'item' : ['slidedown'], dontMark: true},
 /* [0, 2] */		{'l': false, 't' : false},
 /* [0, 3] */		{'l': false, 't' : false},
 /* [0, 4] */		{'l': false, 't' : false},
 /* [0, 5] */		{'l': false, 't' : false},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [1, 0] */		{'l': false, 't' : false},
 /* [1, 1] */		{'l': true, 't' : false},
 /* [1, 2] */		{'l': false, 't' : true},
 /* [1, 3] */		{'l': false, 't' : false},
 /* [1, 4] */		{'l': false, 't' : true},
 /* [1, 5] */		{'l': false, 't' : true},
 /* [1, 6] */		{'l': false, 't' : true},
 /* [1, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [2, 0] */		{'l': false, 't' : false},
 /* [2, 1] */		{'l': false, 't' : false},
 /* [2, 2] */		{'l': true, 't' : false},
 /* [2, 3] */		{'l': false, 't' : false},
 /* [2, 4] */		{'l': false, 't' : true},
 /* [2, 5] */		{'l': false, 't' : false},
 /* [2, 6] */		{'l': false, 't' : true, 'item' : ['teleport t1'], teleportTarget: [4, 3], dontMark: true},
 /* [2, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [3, 0] */		{'l': false, 't' : false},
 /* [3, 1] */		{'l': true, 't' : true},
 /* [3, 2] */		{'l': false, 't' : false},
 /* [3, 3] */		{'l': true, 't' : false},
 /* [3, 4] */		{'l': true, 't' : false},
 /* [3, 5] */		{'l': true, 't' : false},
 /* [3, 6] */		{'l': true, 't' : true},
 /* [3, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [4, 0] */		{'l': true, 't' : false, 'item' : ['slidedown'], dontMark: true},
 /* [4, 1] */		{'l': true, 't' : false, 'item' : ['teleport t1'], teleportTarget: [9, 5], dontMark: true},
 /* [4, 2] */		{'l': false, 't' : false},
 /* [4, 3] */		{'l': true, 't' : false, 'item' : ['teleport t1'], teleportTarget: [2, 6], dontMark: true},
 /* [4, 4] */		{'l': true, 't' : false},
 /* [4, 5] */		{'l': false, 't' : true},
 /* [4, 6] */		{'l': false, 't' : true},
 /* [4, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [5, 0] */		{'l': false, 't' : false},
 /* [5, 1] */		{'l': true, 't' : false},
 /* [5, 2] */		{'l': true, 't' : true},
 /* [5, 3] */		{'l': true, 't' : false},
 /* [5, 4] */		{'l': false, 't' : false},
 /* [5, 5] */		{'l': false, 't' : false},
 /* [5, 6] */		{'l': false, 't' : true},
 /* [5, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [6, 0] */		{'l': false, 't' : false},
 /* [6, 1] */		{'l': false, 't' : true, 'item' : ['key', 'finish']},
 /* [6, 2] */		{'l': false, 't' : true},
 /* [6, 3] */		{'l': true, 't' : false},
 /* [6, 4] */		{'l': true, 't' : true},
 /* [6, 5] */		{'l': true, 't' : true},
 /* [6, 6] */		{'l': true, 't' : false},
 /* [6, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [7, 0] */		{'l': false, 't' : false},
 /* [7, 1] */		{'l': false, 't' : false},
 /* [7, 2] */		{'l': true, 't' : true},
 /* [7, 3] */		{'l': false, 't' : false},
 /* [7, 4] */		{'l': false, 't' : true},
 /* [7, 5] */		{'l': false, 't' : false},
 /* [7, 6] */		{'l': true, 't' : false},
 /* [7, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [8, 0] */		{'l': true, 't' : false},
 /* [8, 1] */		{'l': false, 't' : false},
 /* [8, 2] */		{'l': false, 't' : true},
 /* [8, 3] */		{'l': false, 't' : true},
 /* [8, 4] */		{'l': false, 't' : false},
 /* [8, 5] */		{'l': true, 't' : false},
 /* [8, 6] */		{'l': false, 't' : false},
 /* [8, 7] */		{'l': false, 't' : true}
				],
				[	
 /* [9, 0] */		{'l': false, 't' : false},
 /* [9, 1] */		{'l': true, 't' : false},
 /* [9, 2] */		{'l': true, 't' : false},
 /* [9, 3] */		{'l': true, 't' : false},
 /* [9, 4] */		{'l': false, 't' : false},
 /* [9, 5] */		{'l': true, 't' : true, 'item' : ['teleport t1'], teleportTarget: [4, 1], dontMark: true},
 /* [9, 6] */		{'l': true, 't' : false},
 /* [9, 7] */		{'l': false, 't' : false}			
				]	
			]
		},
		{	/* Level 25 */
			enemy: {
				'0' : {'id' : 1, 'item' : 'enemy1', 'startPos' : [8, 2], 'road' : [[6, 1], [7, 3], [9, 2], [8, 0], [6, 1], [8, 2]]}
			},			
			pos: [0, 0],
			map: [ 
				[	
 /* [0, 0] */		{'l': false, 't' : false},
 /* [0, 1] */		{'l': false, 't' : false},
 /* [0, 2] */		{'l': false, 't' : false},
 /* [0, 3] */		{'l': false, 't' : false},
 /* [0, 4] */		{'l': false, 't' : false},
 /* [0, 5] */		{'l': false, 't' : false},
 /* [0, 6] */		{'l': false, 't' : false},
 /* [0, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [1, 0] */		{'l': true, 't' : false},
 /* [1, 1] */		{'l': true, 't' : false, 'item' : ['key', 'finish']},
 /* [1, 2] */		{'l': false, 't' : false},
 /* [1, 3] */		{'l': true, 't' : false},
 /* [1, 4] */		{'l': false, 't' : true},
 /* [1, 5] */		{'l': true, 't' : false},
 /* [1, 6] */		{'l': true, 't' : false},
 /* [1, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [2, 0] */		{'l': false, 't' : false},
 /* [2, 1] */		{'l': true, 't' : true, 'item' : ['slidedown'], dontMark: true},
 /* [2, 2] */		{'l': true, 't' : false},
 /* [2, 3] */		{'l': false, 't' : false},
 /* [2, 4] */		{'l': true, 't' : false},
 /* [2, 5] */		{'l': true, 't' : false, 'item' : ['lock'], dontMark: true, 'moveOver': true},
 /* [2, 6] */		{'l': true, 't' : false},
 /* [2, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [3, 0] */		{'l': false, 't' : false},
 /* [3, 1] */		{'l': true, 't' : false},
 /* [3, 2] */		{'l': true, 't' : true},
 /* [3, 3] */		{'l': false, 't' : false},
 /* [3, 4] */		{'l': true, 't' : true},
 /* [3, 5] */		{'l': true, 't' : false},
 /* [3, 6] */		{'l': true, 't' : false},
 /* [3, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [4, 0] */		{'l': false, 't' : false},
 /* [4, 1] */		{'l': false, 't' : false},
 /* [4, 2] */		{'l': false, 't' : true},
 /* [4, 3] */		{'l': true, 't' : false},
 /* [4, 4] */		{'l': false, 't' : true},
 /* [4, 5] */		{'l': true, 't' : false},
 /* [4, 6] */		{'l': true, 't' : false},
 /* [4, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [5, 0] */		{'l': false, 't' : false},
 /* [5, 1] */		{'l': false, 't' : false},
 /* [5, 2] */		{'l': true, 't' : true},
 /* [5, 3] */		{'l': false, 't' : false},
 /* [5, 4] */		{'l': false, 't' : true},
 /* [5, 5] */		{'l': true, 't' : false},
 /* [5, 6] */		{'l': true, 't' : false},
 /* [5, 7] */		{'l': true, 't' : false}
				],
				[	
 /* [6, 0] */		{'l': false, 't' : false},
 /* [6, 1] */		{'l': true, 't' : false},
 /* [6, 2] */		{'l': true, 't' : true},
 /* [6, 3] */		{'l': false, 't' : false},
 /* [6, 4] */		{'l': true, 't' : false},
 /* [6, 5] */		{'l': true, 't' : true},
 /* [6, 6] */		{'l': true, 't' : false},
 /* [6, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [7, 0] */		{'l': false, 't' : false},
 /* [7, 1] */		{'l': false, 't' : true},
 /* [7, 2] */		{'l': false, 't' : false},
 /* [7, 3] */		{'l': true, 't' : false},
 /* [7, 4] */		{'l': true, 't' : false},
 /* [7, 5] */		{'l': false, 't' : true},
 /* [7, 6] */		{'l': true, 't' : false},
 /* [7, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [8, 0] */		{'l': false, 't' : false},
 /* [8, 1] */		{'l': false, 't' : true},
 /* [8, 2] */		{'l': true, 't' : false},
 /* [8, 3] */		{'l': false, 't' : true},
 /* [8, 4] */		{'l': false, 't' : true},
 /* [8, 5] */		{'l': true, 't' : true},
 /* [8, 6] */		{'l': true, 't' : false},
 /* [8, 7] */		{'l': false, 't' : false}
				],
				[	
 /* [9, 0] */		{'l': false, 't' : false},
 /* [9, 1] */		{'l': true, 't' : false},
 /* [9, 2] */		{'l': true, 't' : false},
 /* [9, 3] */		{'l': false, 't' : false},
 /* [9, 4] */		{'l': false, 't' : false},
 /* [9, 5] */		{'l': false, 't' : false},
 /* [9, 6] */		{'l': true, 't' : false},
 /* [9, 7] */		{'l': false, 't' : false}			
				]	
			]
		}		
	]
}	

var userTop = window.userTop = {

	
	loadMy: function()
	{
		var results = db.getMyTop(),
			scores = (!results[game.currentLevel]) ? false : results[game.currentLevel];
		
		if(!scores)
		{
			$("#subcontent2").html('<div class="notif">No high scores for this level.</div>');
			return;
		}
		$("#subcontent2").html('');

			scores.sort(function(a, b) {
			   return a.time - b.time;
			})

		var scoreBoard = '',
			place = 1;
		for(i in scores)
		{
			scoreBoard += '<div class="score'+((i % 2 == 0) ? ' dark' : '')+'">'+
							'<div class="nr">'+(place++)+'</div>'+
							'<div class="row">'+scores[i].date_+'</div>'+
							'<div class="row">'+scores[i].time+'s</div>'+
						'</div>';
		}
		$("#subcontent2").html(scoreBoard);	
			
			
	},
	
	global: function()
	{
	
		
	
	}

}



var enemy = window.enemy = {
	
	heros: false,
	curremtPos : [],
	currentStep : [],
	
	sprite: {
		'1' : {
			'size' : [37, 46],
			'frames' : 4,
			'rotationLuck': 4,
			'offset' : [10, 4]
		},
		'blinkSpeed': 100,
		'blinkTimeout' : 3000,		
	},
	
	clearEnemy: function()
	{
		if(!enemy.heros) return false;
		for(k in enemy.heros)
		{
			clearInterval(enemy.blinkInterval[k]);
			enemy.blinkingInterval[k]
			enemy.heros[k].$elem.remove();
		}
		enemy.heros = [];
	},
	
	blinkInterval: {},
	blinkingInterval: {},
	blinking: function()
	{
		for(k in enemy.heros)
		{	
			var h = enemy.heros[k],
				blink_n0 = [];
			blink_n0[k] = 0;
		
			enemy.blinkInterval[k] = setInterval(function()
			{
				var rotation_ = hero.rotate(),
					rotation = ((rotation_ !== false) ? rotation_ : sys.backgroundPos(h.$elem)[1]);
				blink_n0[k] = 0;			

				enemy.blinkingInterval[k] = setInterval(function()
				{		
					
					if(enemy.sprite[h.id].frames <= blink_n0[k])
					{
						clearInterval(enemy.blinkingInterval[k]);
						
						h.$elem.css({
							'backgroundPosition' :'0px '+sys.backgroundPos(h.$elem)[1]+'px'
						});
						return;
					}
					
					h.$elem.css({
						'backgroundPosition' : ''+(blink_n0[k] * enemy.sprite[h.id].size[0] * -1)+'px '+rotation+'px'
					});

					blink_n0[k]++;
				}, enemy.sprite.blinkSpeed);

			}, enemy.sprite.blinkTimeout + (enemy.sprite.blinkSpeed * enemy.sprite[h.id].frames));		
		}
	},
	
	collision: function(elem)
	{
		game.showPopUp('killed');
		db.updateCollectedStars(conf.points.perDeath);
		game._end();
	},

	move: function(xy)
	{
		if(!this.heros) return false;
		for(k in this.heros)
		{
			var h = this.heros[k];
				key = this.currentStep[k];
				if(key >= h.road.length)
				{
					key = 0;
					this.currentStep[k] = 0;
				}
				
			this.setPos(h, h.road[key]);
			
			if(h.road[key][0] == xy[0] && h.road[key][1] == xy[1])
			{
				this.collision(h);
				return;
			}	
			
			
			
			this.currentStep[k]++;
		}
	},
	
	setPos: function(h, xy)
	{
		h.$elem.attr('data-pos', xy[0]+','+xy[1]);
		h.$elem.css({
			'left' : playground.c.grid.w * xy[0] + enemy.sprite[h.id].offset[0],
			'top' : playground.c.grid.h * xy[1] + enemy.sprite[h.id].offset[1]
		});
	},
	
	load: function()
	{
		var h = {};
		for(k in this.heros)
		{
			h = this.heros[k];
			this.curremtPos[k] = h.startPos;
			var elem = $('<div style="left:'+(playground.c.grid.w * h.startPos[0] + enemy.sprite[h.id].offset[0])+'px;top:'+(playground.c.grid.w * h.startPos[1] + enemy.sprite[h.id].offset[1])+'px;" data-pos="'+h.startPos[0]+','+h.startPos[0]+'" class="grid enemy '+h.item+'"></div>');
			playground.$elems.playground.append(elem);
			this.currentStep[k] = 0;
			this.heros[k].$elem = elem;
		}
		
		this.blinking();
		
	},

	init: function(enemy)
	{
		this.heros = enemy;
		this.load();
	}

}
