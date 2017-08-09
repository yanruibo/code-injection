




 function loaded(){
  document.addEventListener('deviceready',fn,false);
 }
function fn(){
	setTimeout(myInit,800);	
}



Number.prototype.format = function () {
  if (parseInt(this) == 0) return '00';
  if (this.toString().length < 2) return '0' + this;
  return this;
}


var settings = {
  debug: 0,
  price: 50,
  currency: 'USD',
  interval: 200
};


function myInit(){
var db = window.openDatabase("timetrack", "1.0", "HTML5 Database", 20000);
window.db = db;
setTimeout(myStart,800);
}
function dbInit(callback)
{
  var callback = callback || function(){}
  db.transaction(function(tx)
  {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS counter (id integer primary key autoincrement, name varchar(150) , price integer)",
                  [],
                  function(){
                    db.transaction(function(tx){
                      tx.executeSql(
                        "CREATE TABLE IF NOT EXISTS track "+
                        "(id integer primary key autoincrement, "+
                        "counter_id integer constraint cid references counter(id) on delete cascade on update cascade "+
                        " , start integer,stop integer, is_active bool)", [],callback,function(tx,err){}
                      );
                    });
                  },
                  function(tx, error) { /*alert("Failure: "+error.message*/ }
                  );
});
    }
    
  function dbAdd(title,price,callback){
    var callback = callback||function(){}
    db.transaction(function(tx)
    {
      tx.executeSql("insert into counter (name,price) values('"+title+"',"+price+")",
                    [],function(tx,result){ callback(result.insertId); },function(tx,err){});
    });
  }
function dbReset(callback){
  var callback=callback||function(){}
  db.transaction(function(tx){
    tx.executeSql("drop table track",
                  [],
                  function(){
                    db.transaction(function(tx){
                      tx.executeSql("drop table counter",[],callback,function(tx,err){});
                    });
                    
                  }
                  ,function(tx,err){});
  });
  
}


function createPopup(){
  
  $('#i-title').val('');
  $('#i-price').val('10');
  $('#popup').show(0);
  $('#i-title')[0].focus();
    
}
    
function pause(callback){
	var callback = callback||function(){};
	var curtime = (new Date()).getTime();
	db.transaction(function(tx){
		console.log('sql');
		tx.executeSql("update track set stop=?, is_active=0 where is_active",[curtime],
				function(tx,result){
			$('.counter.active').removeClass('active');
			callback(tx,result);
		},
				function(tx,err){console.log(err);});
	});
}
function bindEvents(){
  //events
	 //events
    $('#panel .button').mousedown(function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
    $('.counter').live('mousedown', function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
    
    
    
  
  $('#panel .button.add').click(function(e){
    createPopup();
  });


  $('#panel .button.delete').click(function(e){
    dbReset(function(){
      $('.counter').remove();
      dbInit();
    })
  });


  function report(tx,result,callback){
	  console.log(callback);
	  console.log('reporting')
	      // var callback = callback|function(){};
			for(j=0;j<result.rows.length;j++){
				console.log (row=result.rows.item(j));
			}
			try{ callback(); }catch(e){ console.log('callback not passed')}
	}

  $('#panel .button.report').click(function(e){ 
	  alert('comming soon');
	  return false;
	var id=0;
	db.transaction(function(tx){
		tx.executeSql("select counter_id as id from track where is_active",[],function(tx,res){
			console.log('exec');
			var rep;
			if(!res.rows.length){

				console.log('no active counters');
				rep = function(tx,rs){
					console.log('callback - no active counters');
					return report(tx,rs);
				}
			}else{

				console.log('have active counter');
			id = parseInt(res.rows.item(0)['id']);
			rep = function(){
				console.log('callback have active counter');
				console.log('inrep')
				var curid = id;
				var clb = function(){
					console.log('in c')
					var sql = "update track set is_active=1,stop=null where id=?";
					db.transaction(function(tx){
						tx.executeSql(sql,[curid],function(tt,rr){	
							console.log(curid,'-x-x-')
							$('#counter-'+curid).addClass('active');
						},function(tt,ee){ console.log(ee);});
					});
					
				};
				
				return function(z,x){

					console.log('inreturned')
					report(z,x,clb)
				};
					
				}
			}
            var genReport = function(){
            	db.transaction(function(tx){
    			tx.executeSql("select c.name as title, sum(t.stop - t.start) as total, c.price*sum(t.stop - t.start) as cost from counter c left join track t on t.counter_id=c.id group by c.id",[],
    					rep(),function(tx,err){console.log(err)});
            	});
            }

			pause(genReport);
		},function(t,e){console.log(e)});
	})
	
  });

  $('#panel .button.pause').click(function(e){
    pause();
  });
  
  $('.addCounter').click(function(e){
    var title = $('#i-title').val();
    var price = $('#i-price').val();
    new Counter(title,price);
    $('#popup').hide(0);
  });
  
  
  $('.cancelNewCounter').click(function(e){
    $('#popup').hide(0);
  });
  
  $('.counter').live('click',function(){
    this.owner.begin();
  });
  
  $('.counter .edit-button').live('click',function(){
    var id = this.parentNode.owner.id;
    var title = this.parentNode.owner.title;
    var price = this.parentNode.owner.price;
    $('#editpopup #i-title').val(title);
    $('#editpopup #i-title')[0].focus();
    $('#editpopup #i-price').val(price);
    $('#editpopup #editid').val(id);
    $('#editpopup').show();
    return false;
  });
  
  $('.canceledit').click(function(){
    $('#editpopup').hide();
  });
  
  $('.saveedit').click(function(){
    var title = $('#editpopup #i-title').val();
    var price = parseInt($('#editpopup #i-price').val());
    var id = parseInt($('#editpopup #editid').val());
    
    db.transaction(function(tx){
      tx.executeSql("update counter set name=?,price=? where id=?",[title,price,id],
                    function(tx,result){
                      $('#counter-'+id+' .title').text(title);
                      var elem = $('#counter-'+id)[0];
                      elem.owner.title = title;
                      elem.owner.price = price;
                    },
                    function(tx,err){c});
    });
    
    $('#editpopup').hide();
  });
  
  
}

function myStart() {
  var w = $(document).height() - 150;
  $('#counters').css({'height':w});
  if(!settings.debug) console.log = function(){};
  dbInit();
  bindEvents();
  loadCounters();
  setInterval(updater,settings.interval);
  
}

function updater(){
  if(!$('.counter').length){ return; }
  $('.counter').each(function(){
    var id = this.owner.id;
    var counter = this;
    db.transaction(function(tx){
      tx.executeSql("select * from track where counter_id=?",[id],
                    function(tx,result){
                      var totalSeconds = 0;
                      for(i=0; i<result.rows.length; i++){
                        var row = result.rows.item(i);
                        var start = row.start;
                        var stop = row.stop;
                        if(row.stop==null){
                          stop=(new Date()).getTime();
                        }
                        totalSeconds += (stop - start);                        
                      }
                      var totalSeconds = parseInt(totalSeconds/1000);
                      var seconds = totalSeconds%60;
                      var totalMinutes = Math.floor(totalSeconds/60);
                      var minutes = totalMinutes%60;
                      var hours = Math.floor(totalMinutes/60);
                      
                      $('#counter-'+id+' .value').html(
                        [
                          hours.format(),
                          ' : ',
                          minutes.format(),
                          ' : ',
                          seconds.format()
                        ].join(''));
                    },
                    function(tx,err){});
    });
  });
  
}

function loadCounters(){
  db.transaction(function(tx){
    tx.executeSql("select * from counter",[],
                  function(tx,result){
                    for(i=0; i<result.rows.length; i++){
                      var row = result.rows.item(i);
                      var cnt = new Counter(row['name'],row['price'],row['id']);
                    }
                  },
                  function(tx,err){});
  });
}

function Counter(title,price,id)
{
  console.log('create new counter',arguments);
  var id = id || 'init';
  this.price = parseInt(price);
  var title = title||'';
  console.log(title);
  if(title.length < 1){
   title = 'new-' + Math.round(Math.random()*125000); 
  }
  this.title = title;
  if(id == 'init'){
    this.init(); // by default
  }else{
    this.load(id);
  }
}
Counter.prototype =
{
  load: function(id){
    this.createDom(id);
    var self = this;
    db.transaction(function(tx){
      tx.executeSql("select * from track where counter_id=?",[self.id],
                    function(tx,result){
                      for(i=0; i<result.rows.length; i++){
                        var row = result.rows.item(i);
                        if(row.is_active) self.begin();
                      }
                    },
                    function(tx,err){});
    });
  },
  init: function(){
    this.save();
    this.begin();
  },
  begin: function(){
    this.start = (new Date()).getTime();
    var self = this;
    db.transaction(function(tx){
      var s = "update track set stop="+self.start+", is_active=0 where is_active";
      console.log(s);
      tx.executeSql(s,[],
                    function(tx,result){
                      var sql = "insert into track (start,is_active,counter_id) values("+self.start+",1,"+self.id+")";
                      console.log(sql)
                      tx.executeSql(sql,
                                    [],function(){
                                      $('.counter').removeClass('active');
                                      self.dom.addClass('active');
                                    },function(t,e){console.log(e)});
                    },
                    function(tx,err){console.log(err);});
    });
    
   
  },
  save: function(){
    var self=this;
    dbAdd(this.title,this.price,function(id){self.createDom(id);});
  },
  createDom: function(id){
    this.id = id;
    var template = '<div class="counter" id="counter-'+this.id+'"><div class="title">'+this.title+'</div>' +
                   '<div class="value"></div><div class="edit-button">edit</div>'+
                   '<div class="br"></div></div>'
    this.dom = $(template);
    
    $('#counters').append(this.dom);
    $('#counter-'+this.id)[0].owner = this;
  },
  update: function(){
    console.log('up',this.id,(new Date()).getTime());
  }
  
  
}


