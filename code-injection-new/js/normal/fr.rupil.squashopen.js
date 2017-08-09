
/*
|
|  Fabien Tillon - Rupil 2012
|  http://www.rupil.fr
|
*/

// Array : Method lastObject
Array.prototype.lastObject = function()
{
  return this[this.length - 1];
}

// Array : Method addObject
Array.prototype.addObject = function(objectP)
{
  this[this.length] = objectP;
}

function RupilState() {
  this.pointsPlayerOne=null;
  this.pointsPlayerTwo=null;
  this.setsPlayerOne=null;
  this.setsPlayerTwo=null;
  this.server=null;
  this.side=null;
  this.score=null;
}

// Namespace rupil_squash_open
var rupil_squash_open = {

  LEFT : 0,
  RIGHT : 1,
  NONE : -1,
  PLAYER_ONE : 0,
  PLAYER_TWO : 1,
  WARM_UP_TIME : 300000,
  REST_TIME : 90000,

  reset : true,
  startDate : null,
  history : new Array(),
  showWarmupAlert : null,
  showRestTimeAlert : null,

  // Appareil photo
  pictureSource : null,
  destinationType : null,

  // Choix du nombre de sets et de points (valeurs par défaut)
  setMax : 3,
  setPoints : 11,
  
  // Initialisation des états
  action_initState : function () {
    currentState = new RupilState();
    currentState.score = "";
    currentState.side = null;
    currentState.setsPlayerOne = 0;
    currentState.setsPlayerTwo = 0;
    currentState.server = null;
    currentState.pointsPlayerOne = 0;
    currentState.pointsPlayerTwo = 0;

    this.history.addObject(currentState);
    this.startDate = new Date();

    $('#scoreArea').text("");
    $('#pointAreaPlayerOne').text("0");
    $('#pointAreaPlayerTwo').text("0");
    this.reset = false;
    clearTimeout(this.showWarmupAlert);
    clearTimeout(this.showRestTimeAlert);
    $('#startView').show();
    /*
    [self.pictureAreaPlayerOne setImage:[UIImage imageNamed:@"user-1.png"] forState:UIControlStateNormal];
    [self.imageAreaPlayerOne setImage:[UIImage imageNamed:@"user-1.png"]]; 
    [self.pictureAreaPlayerTwo setImage:[UIImage imageNamed:@"user-2.png"] forState:UIControlStateNormal];
    [self.imageAreaPlayerTwo setImage:[UIImage imageNamed:@"user-2.png"]];
    
    */
  },


  // Vérification de l'état actuel
  action_inspectState : function ()
  {
    var currentState = this.history.lastObject();
    
    // Gain du set
    if ((currentState.pointsPlayerOne >= this.setPoints || currentState.pointsPlayerTwo >= this.setPoints)
      && Math.abs(currentState.pointsPlayerOne - currentState.pointsPlayerTwo) >= 2) 
    {
      var nextState = new RupilState();
      
      // Joueur remportant le set
      if (currentState.pointsPlayerOne > currentState.pointsPlayerTwo)
      {
          nextState.setsPlayerOne = currentState.setsPlayerOne + 1;
          nextState.setsPlayerTwo = currentState.setsPlayerTwo;
      }
      else {
          nextState.setsPlayerOne = currentState.setsPlayerOne;
          nextState.setsPlayerTwo = currentState.setsPlayerTwo + 1;
      }
      
      // Réinitialisation des points des joueurs
      nextState.pointsPlayerOne = 0;
      nextState.pointsPlayerTwo = 0;
      
      // Continuité du service mais choix du côté
      nextState.server = currentState.server;
      nextState.side = null;
      
      // Mise à jour du score
      nextState.score = currentState.score + " " + currentState.pointsPlayerOne + "/" + currentState.pointsPlayerTwo;

      // Temps de repos
      this.showRestTimeAlert = setTimeout(function(){ alert(rupil_squash_open.msg_rest_time) }, this.REST_TIME);
      
      this.history.addObject(nextState);
    }
  },

  // Affichage de l'état actuel
  action_displayState : function () {
    var currentState = this.history.lastObject();

    // Cacher les images des boutons
    $('#pointButtonPlayerOne').html('');
    $('#pointButtonPlayerTwo').html('');

    // Mise à jour des temps
    var now = new Date();
    var duration = Math.round((now - this.startDate) / 60000);  
    $('#startArea').text(this.startDate.toLocaleTimeString());
    $('#durationArea').text(this.msg_minute(duration));
    
    // Début du match
    if (this.history.length == 1) {
        $('#startArea').text("");
        $('#durationArea').text("");
        
        // Suppression de l'indication du serveur
        $('#pointAreaPlayerOne').removeClass();
        $('#pointAreaPlayerTwo').removeClass();
        
        // Mise à jour des libellés pour le choix du serveur
        $('#choiceLabel').text(this.msg_player_starting_match);
        $('#choiceSegmentedControl_0').text(this.msg_player_one);
        $('#choiceSegmentedControl_1').text(this.msg_player_two);
        $('#choiceView').show();
        $('#choiceSegmentedControl_0').show();
        $('#choiceSegmentedControl_1').show();
    }
    // Fin du match
    else if (currentState.setsPlayerOne == this.setMax || currentState.setsPlayerTwo == this.setMax) {
        
        // Mise à jour des points
        $('#pointAreaPlayerOne').text("");
        $('#pointAreaPlayerTwo').text("");

        // Mise à jour du score
        $('#scoreArea').text(currentState.score);      

        // Mise à jour des libellés pour indiquer la fin du match
        $('#choiceView').show();
        $('#choiceSegmentedControl_0').hide();
        $('#choiceSegmentedControl_1').hide();
        if (currentState.setsPlayerOne == this.setMax)
          $('#choiceLabel').text(this.msg_player_one_wins(currentState.setsPlayerOne, currentState.setsPlayerTwo));
        else
          $('#choiceLabel').text(this.msg_player_two_wins(currentState.setsPlayerTwo, currentState.setsPlayerOne));
        
        // Désactiver le temps de repos
        clearTimeout(this.showRestTimeAlert);
    }
    else {
        // Mise à jour des points
        $('#pointAreaPlayerOne').text(currentState.pointsPlayerOne);
        $('#pointAreaPlayerTwo').text(currentState.pointsPlayerTwo);
        
        // Indication du serveur
        $('#pointAreaPlayerOne').removeClass();
        $('#pointAreaPlayerTwo').removeClass();
        if (currentState.server == this.PLAYER_ONE) {
            $('#pointAreaPlayerOne').addClass('label-server');
        }
        else if (currentState.server == this.PLAYER_TWO) {
            $('#pointAreaPlayerTwo').addClass('label-server');
        }

        // indication d'une balle de jeu
        if ((currentState.pointsPlayerOne >= this.setPoints - 1 || currentState.pointsPlayerTwo >= this.setPoints - 1)
            && Math.abs(currentState.pointsPlayerOne - currentState.pointsPlayerTwo) >= 1) {
            if (currentState.pointsPlayerOne > currentState.pointsPlayerTwo) {
                $('#pointAreaPlayerOne').addClass('label-important');
            }
            else {
                $('#pointAreaPlayerTwo').addClass('label-important');
            }

        }

        // Gestion du côté de service
        $('#choiceView').hide();

        if (currentState.side == this.LEFT) {
          if(currentState.server == this.PLAYER_ONE) 
            //[self.pointButtonPlayerOne setImage:ballLeft forState:UIControlStateNormal];
            $('#pointButtonPlayerOne').html('<div class="ball-left"></div>');
          else
            //[self.pointButtonPlayerTwo setImage:ballLeft forState:UIControlStateNormal];
            $('#pointButtonPlayerTwo').html('<div class="ball-left"></div>');
        }
        else if (currentState.side == this.RIGHT) {
          if(currentState.server == this.PLAYER_ONE)
            //[self.pointButtonPlayerOne setImage:ballRight forState:UIControlStateNormal];
            $('#pointButtonPlayerOne').html('<div class="ball-right"></div>');
          else
            //[self.pointButtonPlayerTwo setImage:ballRight forState:UIControlStateNormal];    
            $('#pointButtonPlayerTwo').html('<div class="ball-right"></div>');
        }
        else {
          // Mise à jour des libellés pour le choix du côté de service
          $('#choiceLabel').text(this.msg_server_side_choice);
          $('#choiceSegmentedControl_0').text(this.msg_left);
          $('#choiceSegmentedControl_1').text(this.msg_right);
          $('#choiceView').show();
          $('#choiceSegmentedControl_0').show();
          $('#choiceSegmentedControl_1').show();
        }

        // Mise à jour du score
        $('#scoreArea').text(currentState.score + " " + currentState.pointsPlayerOne + "/" + currentState.pointsPlayerTwo);
        
    }
    // Mise à jour des sets
    $('#setAreaPlayerOne').text(currentState.setsPlayerOne);
    $('#setAreaPlayerTwo').text(currentState.setsPlayerTwo);

  },

  // Player One
  action_addPointToPlayerOne : function () {
      var currentState = this.history.lastObject();
      var nextState = new RupilState();
      nextState.pointsPlayerOne = currentState.pointsPlayerOne + 1;
      nextState.pointsPlayerTwo = currentState.pointsPlayerTwo;
      nextState.setsPlayerOne = currentState.setsPlayerOne;
      nextState.setsPlayerTwo = currentState.setsPlayerTwo;
      nextState.server = this.PLAYER_ONE;
      nextState.score = currentState.score;    
      
      // Changement de côté
      if (currentState.server == nextState.server) {
          if (currentState.side == this.LEFT) nextState.side = this.RIGHT;
          else nextState.side = this.LEFT;
      }
      else {
          nextState.side = null;
      }
      
      this.history.addObject(nextState);
      this.action_inspectState();
      this.action_displayState();
  },

  // Player Two
  action_addPointToPlayerTwo : function () {
      var currentState = this.history.lastObject();
      var nextState = new RupilState();
      nextState.pointsPlayerOne = currentState.pointsPlayerOne;
      nextState.pointsPlayerTwo = currentState.pointsPlayerTwo + 1;
      nextState.setsPlayerOne = currentState.setsPlayerOne;
      nextState.setsPlayerTwo = currentState.setsPlayerTwo;
      nextState.server = this.PLAYER_TWO;
      nextState.score = currentState.score;    
      
      // Changement de côté
      if (currentState.server == nextState.server) {
          if (currentState.side == this.LEFT) nextState.side = this.RIGHT;
          else nextState.side = this.LEFT;
      }
      else {
          nextState.side = null;
      }
      
      this.history.addObject(nextState);
      this.action_inspectState();
      this.action_displayState();
  },

  action_choice : function (indexP) {
    $('#choiceView').hide();
    
    // Nouveau match
    if (this.reset) 
    {
      if (!indexP) {
        this.history = new Array();
        this.action_initState();
      }
      this.reset = false;
    }
    else 
    {
      var currentState = this.history.lastObject();
      var nextState = new RupilState();
      
      nextState.pointsPlayerOne = currentState.pointsPlayerOne;
      nextState.pointsPlayerTwo = currentState.pointsPlayerTwo;
      nextState.score = currentState.score;
      nextState.setsPlayerOne = currentState.setsPlayerOne;
      nextState.setsPlayerTwo = currentState.setsPlayerTwo;
      
      // Début du match: choix du serveur, sinon choix du côté de service
      if (this.history.length == 1) {
          nextState.server = indexP;
          nextState.side = null;
          this.startDate = new Date();
          
          // Désactiver le temps d'échauffement
          clearTimeout(this.showWarmupAlert);
      }
      else {
          nextState.server = currentState.server;
          nextState.side = indexP;
          
          // Désactiver le temps de repos
          clearTimeout(this.showRestTimeAlert);
      }
      
      this.history.addObject(nextState);
      
    }
    
    this.action_displayState();
  },

  action_start : function ()
  {
    $('#startView').hide();

    // Temps d'échauffement
    this.showWarmupAlert = setTimeout(function(){ alert(rupil_squash_open.msg_warm_up) }, this.WARM_UP_TIME);
  },

  action_reset : function ()
  {
    this.reset = true;

    // Mise à jour des libellés pour confirmer l'arrêt du match
    $('#choiceLabel').text(this.msg_start_a_new_match);
    $('#choiceSegmentedControl_0').text(this.msg_confirm);
    $('#choiceSegmentedControl_1').text(this.msg_cancel);
    $('#choiceSegmentedControl_0').show();
    $('#choiceSegmentedControl_1').show();
    $('#choiceView').show();
  },

  action_undo : function ()
  {
    if (this.history.length > 1) {
      this.history.pop();

      // Suppression supplémentaire si il y a eu gain du set
      var currentState = this.history.lastObject();
      if ((currentState.pointsPlayerOne >= this.setPoints || currentState.pointsPlayerTwo >= this.setPoints)
        && Math.abs(currentState.pointsPlayerOne - currentState.pointsPlayerTwo) >= 2) {
        this.history.pop();
      }
    }
    this.action_displayState();
  },

  // Initialisation de l'appareil photo
  action_initCamera : function ()
  {
    this.pictureSource = navigator.camera.PictureSourceType;
    this.destinationType = navigator.camera.DestinationType;
  },

  // Called when a photo is successfully retrieved - Player One
  action_onPhotoPlayerOneDataSuccess : function (imageData) {
    $('.pictureAreaPlayerOne').attr('src', "data:image/jpeg;base64," + imageData);
  },

  // Called when a photo is successfully retrieved - Player Two
  action_onPhotoPlayerTwoDataSuccess : function (imageData) {
    $('.pictureAreaPlayerTwo').attr('src', "data:image/jpeg;base64," + imageData);
  },

  // Called if something bad happens.
  action_onPhotoFail : function (message) {
    $('.pictureAreaPlayerOne').attr('src', "img/user-1.png");
    $('.pictureAreaPlayerTwo').attr('src', "img/user-2.png");
  },

  // Capture photo Player One
  action_capturePhotoPlayerOne : function ()
  {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(this.action_onPhotoPlayerOneDataSuccess, this.action_onPhotoFail, { quality: 50, destinationType: this.destinationType.DATA_URL });
  },

  // Capture photo Player Two
  action_capturePhotoPlayerTwo : function ()
  {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(this.action_onPhotoPlayerTwoDataSuccess, this.action_onPhotoFail, { quality: 50, destinationType: this.destinationType.DATA_URL });
  },

  // Nom des joueurs
  action_updatePlayerName : function ()
  {
    namePlayerOne = $('#namePlayerOne').val();
    namePlayerTwo = $('#namePlayerTwo').val();
    if(namePlayerOne.length && namePlayerTwo.length)
    {
      $('#nameArea').text(namePlayerOne.toUpperCase() + ' vs ' + namePlayerTwo.toUpperCase());
    }
  },
};









    // Wait for Cordova to connect with the device
    document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    function onDeviceReady() {
      rupil_squash_open.action_initState();
      rupil_squash_open.action_displayState();
      rupil_squash_open.action_initCamera();
    }

    // Plugin i18n
    jQuery.i18n.properties({
      name: 'Messages',
      path: 'i18n/',
      // Mise à jour des traductions dans la page
      callback: function(){
        $('span').eq(0).text(rupil_squash_open.msg_score);
        $('span').eq(1).text(rupil_squash_open.msg_start_time);
        $('span').eq(3).text(rupil_squash_open.msg_duration);
        $('.cellSetArea p').eq(0).text(rupil_squash_open.msg_sets);
        $('.cellSetArea p').eq(2).text(rupil_squash_open.msg_sets);
        $('#start').text(rupil_squash_open.msg_start);
        $('#startView span').eq(0).text(rupil_squash_open.msg_heading_sets);
        $('#startView span').eq(1).text(rupil_squash_open.msg_set);
        $('#startView span').eq(2).text(rupil_squash_open.msg_sets);
        $('#startView span').eq(3).text(rupil_squash_open.msg_sets);
        $('#startView span').eq(4).text(rupil_squash_open.msg_heading_points);
        $('#startView span').eq(5).text(rupil_squash_open.msg_points);
        $('#startView span').eq(6).text(rupil_squash_open.msg_points);
        $('#startView span').eq(7).text(rupil_squash_open.msg_players_photo);
        $('#startView span').eq(8).text(rupil_squash_open.msg_player_one);
        $('#startView span').eq(9).text(rupil_squash_open.msg_player_two);
      }
    });


    $('input[name=setMax]:radio').click(function(e){
      rupil_squash_open.setMax = $(this).val();
    });

    $('input[name=setPoints]:radio').click(function(e){
      rupil_squash_open.setPoints = $(this).val();
    });

    $('#pointButtonPlayerOne').click(function(e){
      rupil_squash_open.action_addPointToPlayerOne();
    });

    $('#pointButtonPlayerTwo').click(function(e){
      rupil_squash_open.action_addPointToPlayerTwo();
    });

    $('#start').click(function(e){
      rupil_squash_open.action_updatePlayerName();
      rupil_squash_open.action_start();
    });

    $('#choiceSegmentedControl_0').click(function(e){
      rupil_squash_open.action_choice(0);
    });

    $('#choiceSegmentedControl_1').click(function(e){
      rupil_squash_open.action_choice(1);
    });

    $('#reset').click(function(e){
      rupil_squash_open.action_reset();
    });

    $('#undo').click(function(e){
      rupil_squash_open.action_undo();
    });

    $('#capturePhotoPlayerOne').click(function(e){
      rupil_squash_open.action_capturePhotoPlayerOne();
    });

    $('#capturePhotoPlayerTwo').click(function(e){
      rupil_squash_open.action_capturePhotoPlayerTwo();
    });


  

/*
 * Author: cargomedia.ch
 *
 * Binds 'touchstart' when binding $.on('click')
 * and triggers 'click' when 'touchend' happens without 'touchmove' inbetween.
 */
(function($) {
	if (!("ontouchstart" in window)) {
		return;
	}

	var clickbuster = {
		isLocked: false,
		delayedUnlock: null,
		onClick: function(event) {
			if (this.isLocked) {
				event.stopPropagation();
				event.preventDefault();
			}
		},
		lock: function() {
			this.isLocked = true;
			var clickbuster = this;
			this.delayedUnlock = setTimeout(function() {
				clickbuster.unlock();
			}, 2000);
		},
		unlock: function() {
			this.isLocked = false;
			if (this.delayedUnlock) {
				window.clearTimeout(this.delayedUnlock);
			}
		}
	};
	document.addEventListener('click', function(e) {
		clickbuster.onClick(e);
	}, true);





	$.event.special.click = {
		delegateType: "click",
		bindType: "click",
		setup: function(data, namespaces, eventHandle) {
			var element = this;
			var touchHandler = {
				handleEvent: function(e) {
					switch(e.type) {
						case 'touchstart': this.onTouchStart(e); break;
						case 'touchmove': this.onTouchMove(e); break;
						case 'touchend': this.onTouchEnd(e); break;
					}
				},
				onTouchStart: function(e) {
					e.stopPropagation();
					this.moved = false;
					element.addEventListener('touchmove', this, false);
					element.addEventListener('touchend', this, false);
				},
				onTouchMove: function(e) {
					this.moved = true;
				},
				onTouchEnd: function(e) {
					element.removeEventListener('touchmove', this, false);
					element.removeEventListener('touchend', this, false);

					if (!this.moved) {
						clickbuster.unlock();

						var theEvent = document.createEvent('MouseEvents');
						theEvent.initEvent('click', true, true);
						e.target.dispatchEvent(theEvent);

						clickbuster.lock();

						e.stopPropagation();
					}
				}
			};

			element.addEventListener('touchstart', touchHandler, false);

			$(element).data('touchToClick-handler', touchHandler);

			return false;
		},
		teardown: function(namespaces) {
			var element = this;
			var touchHandler = $(element).data('touchToClick-handler');
			element.removeEventListener('touchstart', touchHandler, false);

			return false;
		}
	};
})(jQuery);


(function(k){function n(c,a){k.ajax({url:c,async:!1,cache:a.cache,contentType:"text/plain;charset="+a.encoding,dataType:"text",success:function(b){r(b,a.mode)}})}function r(c,a){for(var b="",e=c.split(/\n/),d=/(\{\d+\})/g,q=/\{(\d+)\}/g,m=/(\\u.{4})/ig,f=0;f<e.length;f++)if(e[f]=e[f].replace(/^\s\s*/,"").replace(/\s\s*$/,""),e[f].length>0&&e[f].match("^#")!="#"){var g=e[f].split("=");if(g.length>0){for(var o=unescape(g[0]).replace(/^\s\s*/,"").replace(/\s\s*$/,""),h=g.length==1?"":g[1];h.match(/\\$/)==
"\\";)h=h.substring(0,h.length-1),h+=e[++f].replace(/\s\s*$/,"");for(var l=2;l<g.length;l++)h+="="+g[l];h=h.replace(/^\s\s*/,"").replace(/\s\s*$/,"");if(a=="map"||a=="both"){if(g=h.match(m))for(l=0;l<g.length;l++)h=h.replace(g[l],s(g[l]));k.i18n.map[o]=h}if(a=="vars"||a=="both")if(h=h.replace(/"/g,'\\"'),t(o),d.test(h)){for(var g=h.split(d),l=!0,j="",n=[],p=0;p<g.length;p++)if(d.test(g[p])&&(n.length==0||n.indexOf(g[p])==-1))l||(j+=","),j+=g[p].replace(q,"v$1"),n.push(g[p]),l=!1;b+=o+"=function("+
j+"){";o='"'+h.replace(q,'"+v$1+"')+'"';b+="return "+o+";};"}else b+=o+'="'+h+'";'}}eval(b)}function t(c){if(/\./.test(c))for(var a="",c=c.split(/\./),b=0;b<c.length;b++)b>0&&(a+="."),a+=c[b],eval("typeof "+a+' == "undefined"')&&eval(a+"={};")}function s(c){var a=[],c=parseInt(c.substr(2),16);c>=0&&c<Math.pow(2,16)&&a.push(c);for(var c="",b=0;b<a.length;++b)c+=String.fromCharCode(a[b]);return c}k.i18n={};k.i18n.map={};k.i18n.properties=function(c){c=k.extend({name:"Messages",language:"",path:"",mode:"vars",
cache:!1,encoding:"UTF-8",callback:null},c);if(c.language===null||c.language=="")c.language=k.i18n.browserLang();if(c.language===null)c.language="";var a=c.name&&c.name.constructor==Array?c.name:[c.name];for(i=0;i<a.length;i++)n(c.path+a[i]+".properties",c),c.language.length>=2&&n(c.path+a[i]+"_"+c.language.substring(0,2)+".properties",c),c.language.length>=5&&n(c.path+a[i]+"_"+c.language.substring(0,5)+".properties",c);c.callback&&c.callback()};k.i18n.prop=function(c){var a=k.i18n.map[c];if(a==null)return"["+
c+"]";var b;if(typeof a=="string"){for(b=0;(b=a.indexOf("\\",b))!=-1;)a=a[b+1]=="t"?a.substring(0,b)+"\t"+a.substring(b++ +2):a[b+1]=="r"?a.substring(0,b)+"\r"+a.substring(b++ +2):a[b+1]=="n"?a.substring(0,b)+"\n"+a.substring(b++ +2):a[b+1]=="f"?a.substring(0,b)+"\u000c"+a.substring(b++ +2):a[b+1]=="\\"?a.substring(0,b)+"\\"+a.substring(b++ +2):a.substring(0,b)+a.substring(b+1);var e=[],d,j;for(b=0;b<a.length;)if(a[b]=="'")if(b==a.length-1)a=a.substring(0,b);else if(a[b+1]=="'")a=a.substring(0,b)+
a.substring(++b);else{for(d=b+2;(d=a.indexOf("'",d))!=-1;)if(d==a.length-1||a[d+1]!="'"){a=a.substring(0,b)+a.substring(b+1,d)+a.substring(d+1);b=d-1;break}else a=a.substring(0,d)+a.substring(++d);d==-1&&(a=a.substring(0,b)+a.substring(b+1))}else if(a[b]=="{")if(d=a.indexOf("}",b+1),d==-1)b++;else if(j=parseInt(a.substring(b+1,d)),!isNaN(j)&&j>=0){var m=a.substring(0,b);m!=""&&e.push(m);e.push(j);b=0;a=a.substring(d+1)}else b=d+1;else b++;a!=""&&e.push(a);a=e;k.i18n.map[c]=e}if(a.length==0)return"";
if(a.lengh==1&&typeof a[0]=="string")return a[0];m="";for(b=0;b<a.length;b++)m+=typeof a[b]=="string"?a[b]:a[b]+1<arguments.length?arguments[a[b]+1]:"{"+a[b]+"}";return m};k.i18n.browserLang=function(){var c=navigator.language||navigator.userLanguage,c=c.toLowerCase();c.length>3&&(c=c.substring(0,3)+c.substring(3).toUpperCase());return c};var j;if(!j)j=function(c,a,b){if(Object.prototype.toString.call(a)!=="[object RegExp]")return typeof j._nativeSplit=="undefined"?c.split(a,b):j._nativeSplit.call(c,
a,b);var e=[],d=0,k=(a.ignoreCase?"i":"")+(a.multiline?"m":"")+(a.sticky?"y":""),a=RegExp(a.source,k+"g"),m,f,g;c+="";j._compliantExecNpcg||(m=RegExp("^"+a.source+"$(?!\\s)",k));if(b===void 0||+b<0)b=Infinity;else if(b=Math.floor(+b),!b)return[];for(;f=a.exec(c);){k=f.index+f[0].length;if(k>d&&(e.push(c.slice(d,f.index)),!j._compliantExecNpcg&&f.length>1&&f[0].replace(m,function(){for(var a=1;a<arguments.length-2;a++)arguments[a]===void 0&&(f[a]=void 0)}),f.length>1&&f.index<c.length&&Array.prototype.push.apply(e,
f.slice(1)),g=f[0].length,d=k,e.length>=b))break;a.lastIndex===f.index&&a.lastIndex++}d===c.length?(g||!a.test(""))&&e.push(""):e.push(c.slice(d));return e.length>b?e.slice(0,b):e},j._compliantExecNpcg=/()??/.exec("")[1]===void 0,j._nativeSplit=String.prototype.split;String.prototype.split=function(c,a){return j(this,c,a)}})(jQuery);
