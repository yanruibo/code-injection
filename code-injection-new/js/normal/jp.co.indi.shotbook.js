
/*
 Cordova - Golfer's HOME
 Copyright (c) 2012 Indi
 */

function addFromGolfriend() {
	var	event = {data:{page:'#golfriend_list_p', params:{shotbook_only_flag:true, selectable:true}}};
	moveto(event);
}

function editText(text){
	try{
		$("#text_input_dialog .dialog_do").on('click.sure', function(){
			var str = $('#name-id', $('#text_input_dialog')).val();
			if (typeof str ==="string" && str.length > 0) {
				var	newbee=new Player();
				
				newbee.name=str;
				newbee.di_flag=true;
				var	ll=new Array();
				var	p=new Player();
				p.di_flag=true;
				p.name=str;
				ll.push({"player":p});
				var previousPage=$.mobile.activePage.data('ui.prevPage');
				$("#"+previousPage.attr('id')).data('add_list', ll);
			}
			$(this).off('click.sure');
		});
		
		var	event = {data:{page:"#text_input_dialog"}};
		if (typeof text === "string"){
			event.data.params = {item:text};
		}
		opendialog2(event);
	}catch(e){l(e);}
}

function addFromDirectInput() {
	try{
		editText("");
	}catch(e){l("in addFromDirectInput "+e);}
}


function onSuccessFromContact(contacts) {
	$.mobile.hidePageLoadingMsg();
	
	try {
		var	n;
		
		$('#data_list').empty();
		
		if (contacts.length == 0) {
			navigator.notification.alert("住所録にコンタクトがありません。", null, "警告");
			return false;
		}
		/*	contacts
		 id:4
		 rawId:null
		 displayName:null
		 name:[object Object]
		 nickname:null
		 phoneNumbers:null
		 emails:null
		 addresses:null
		 ims:null
		 organizations:null
		 birthday:null
		 note:null
		 photos:null
		 categories:null
		 urls:null
		for(var i in contacts) {
			var	str="["+i+"] ";
			for(var j in contacts[i]){
				str+=j+":"+contacts[i][j]+" ";
			}
			l(str);
		}
		 */
		
		var	cl = new Array();
		for(var i=0; i<contacts.length; i++) {
			if (contacts[i].displayName) {
				n = contacts[i].displayName;
			} else {
				n = contacts[i].name["formatted"];
			}
			if (!n) {
				n = "CANNOT GET NAME";
			}
			var	id = contacts[i].id;
			
			cl.push({'id':id, 'name':n});
		}

		var	event = {data:{page:"#list_of_data_p", params:{item:cl}}};
		moveto(event);
	} catch(e){l(e);}
	return true;
}

function onErrorFromContact(contactError) {
	$.mobile.hidePageLoadingMsg();
	navigator.notification.alert('コンタクトエラー\n'+contactError, null, "エラー");
}

function addFromAddressBook() {
	console.log("mobile.showPageLoadingMsg");
	$.mobile.showPageLoadingMsg();
	
	try {
		var options = new ContactFindOptions();
		options.filter="";
		options.multiple=true;
		var fields = ["displayName", "name"];
		navigator.contacts.find(fields, onSuccessFromContact, onErrorFromContact, options);
	} catch(e){
	}
}

(function($) {

	$('#text_input_dialog').live('pagebeforeshow', function(e, d){
		if ($(this).data && $(this).data('params')) {
			var	txt = $(this).data('params')["item"];
			$('#name-id', $(this)).val(txt);
		}
	});
	
	
	$('#text_input_dialog').live('pageshow', function(e, d){
		$.mobile.activePage.data('ui.prevPage',d.prevPage);
		l("prev " + d.prevPage.attr('id'));
	});
	
})(jQuery);


/*
 Cordova - Golfer's Dashboard DB
 Copyright (c) 2012 Indi
 */

function setOutInHoles(isout, key) {
	var	tgt = "";

	if (isout){
		tgt="out";
	} else {
		tgt="in";
	}
	
	var	gcd = $('#edit_round_tee_p').data('golfcourse');
	var	cd = null;

	for(var i in gcd.course_data) {
		var	c=gcd.course_data[i];
		if (c.id == key) {
			cd = c;
			break;
		}
	}
	
	if (cd == null) {
		l("ERROR!! NO COURSE DATA.");
		return;
	}
		

	var	val_tee;
	if (IS_NATIVE_SELECTMENU) {
		val_tee=new Array();
		for(var i in (cd.tee_data)) {
			var	td=cd.tee_data[i];
			val_tee.push({k:td.id, v:td.name});
		}

		var	teetxt = "#ert_"+tgt+"_tee_n";
		var	teeotxt = ""+tgt+"_tee_o";
		l(teetxt+"\n"+teeotxt);

		$(teetxt).empty();
		$.tmpl("<option value='${k}'>${v}</option>", val_tee).appendTo($(teetxt));
		$(teetxt)[0].selectedIndex=0;
		$(teetxt).selectmenu('refresh');
	} else {
		val_tee={};
		var	tee_text=null;
		for(var i in (cd.tee_data)) {
			var	td=cd.tee_data[i];
			if (tee_text==null) {
				tee_text = td.name;
			}
			val_tee[td.id]=td.name;
		}
		
		var	teetxt = "#ert_"+tgt+"_tee";
		$(teetxt+" span.ui-btn-text").text(tee_text);
	}
	
	var	teeotxt = ""+tgt+"_tee_o";
	$('#edit_round_tee_p').removeData(teeotxt);
	$('#edit_round_tee_p').data(teeotxt, val_tee);
}

function sw_ert_cancel() {
	var results = SpinningWheel.getSelectedValues();
}

function sw_ert_out_hole_done() {
	var results = SpinningWheel.getSelectedValues();
	var	key = parseInt(results["keys"][0]);
	$("#ert_out_hole span.ui-btn-text").text(results["values"][0]);
	if (key > 0) {
		setOutInHoles(true, key);
	}
}
function sw_ert_in_hole_done() {
	var results = SpinningWheel.getSelectedValues();
	var	key = parseInt(results["keys"][0]);
	$("#ert_in_hole span.ui-btn-text").text(results["values"][0]);
	if (999 > key && key > 0) {
		$('#ert_in_tee', $('#edit_round_tee_p')).removeClass('ui-disabled');
		setOutInHoles(false, key);
	} else {
		$('#ert_in_tee', $('#edit_round_tee_p')).addClass('ui-disabled');
	}
}

function sw_ert_out_tee_done() {
	var results = SpinningWheel.getSelectedValues();
	$("#ert_out_tee span.ui-btn-text").text(results["values"][0]);
}

function sw_ert_in_tee_done() {
	var results = SpinningWheel.getSelectedValues();
	$("#ert_in_tee span.ui-btn-text").text(results["values"][0]);
}


function sw_ert_out_hole_value() {
	var	text;
	if (IS_NATIVE_SELECTMENU) {
		text = $("#ert_out_hole_n", $('#edit_round_tee_p')).val();
	} else {
		text = $("#ert_out_hole span.ui-btn-text").text();
	}
	var	sels = $('#edit_round_tee_p').data('out_hole_o');
	for(var j in sels) {
		if (sels[j] == text) {
			break;
		}
	}
	return j;
}
function sw_ert_in_hole_value() {
	var	text;
	if (IS_NATIVE_SELECTMENU) {
		text = $("#ert_in_hole_n", $('#edit_round_tee_p')).val();
	} else {
		text = $("#ert_in_hole span.ui-btn-text").text();
	}
	var	sels = $('#edit_round_tee_p').data('in_hole_o');
	for(var j in sels) {
		if (sels[j] == text) {
			if (j == 999){
				break;
			}
			return j;
		}
	}
	return -1;
}

function sw_ert_out_tee_value() {
	var	text;
	if (IS_NATIVE_SELECTMENU) {
		text = $("#ert_out_tee_n", $('#edit_round_tee_p')).val();
	} else {
		text = $("#ert_out_tee span.ui-btn-text").text();
	}
	var	sels = $('#edit_round_tee_p').data('out_tee_o');
	for(var j in sels) {
		if (sels[j] == text) {
			break;
		}
	}
	return j;
}
function sw_ert_in_tee_value() {
	var	text;
	if (IS_NATIVE_SELECTMENU) {
		text = $("#ert_in_tee_n", $('#edit_round_tee_p')).val();
	} else {
		text = $("#ert_in_tee span.ui-btn-text").text();
	}
	var	sels = $('#edit_round_tee_p').data('in_tee_o');
	for(var j in sels) {
		if (sels[j] == text) {
			if (j == 999){
				break;
			}
			return j;
		}
	}
	return -1;
}


(function($) {
	
	$('#edit_round_tee_p').live("pageinit", function(event, data) {
		
		if (IS_NATIVE_SELECTMENU) {
			$('#ert_out_hole', $('#edit_round_tee_p')).hide();
			$('#ert_out_tee', $('#edit_round_tee_p')).hide();
			$('#ert_in_hole', $('#edit_round_tee_p')).hide();
			$('#ert_in_tee', $('#edit_round_tee_p')).hide();
			
			$('#ert_out_hole_n', $('#edit_round_tee_p')).parent().show();
			$('#ert_out_tee_n', $('#edit_round_tee_p')).parent().show();
			$('#ert_in_hole_n', $('#edit_round_tee_p')).parent().show();
			$('#ert_in_tee_n', $('#edit_round_tee_p')).parent().show();
		} else {
			$('#ert_out_hole', $('#edit_round_tee_p')).show();
			$('#ert_out_tee', $('#edit_round_tee_p')).show();
			$('#ert_in_hole', $('#edit_round_tee_p')).show();
			$('#ert_in_tee', $('#edit_round_tee_p')).show();
			
			$('#ert_out_hole_n', $('#edit_round_tee_p')).parent().hide();
			$('#ert_out_tee_n', $('#edit_round_tee_p')).parent().hide();
			$('#ert_in_hole_n', $('#edit_round_tee_p')).parent().hide();
			$('#ert_in_tee_n', $('#edit_round_tee_p')).parent().hide();
		}

		
		$('#ert_out_hole_n', $('#edit_round_tee_p')).change(function(){
			var	key = $('#ert_out_hole_n option:selected').val();
			if (key > 0) {
				setOutInHoles(true, key);
			}
		});

		$('#ert_in_hole_n', $('#edit_round_tee_p')).change(function(){
			var	key = $('#ert_in_hole_n option:selected').val();
			if (999 > key && key > 0) {
				setOutInHoles(false, key);
			}
		});
		
		
		$('#ert_out_hole', $('#edit_round_tee_p')).live('click', function(){
			var	cco = $('#edit_round_tee_p').data('out_hole_o');
			var	selected = sw_ert_out_hole_value();
			SpinningWheel.addSlot(cco, 'center', selected);
			SpinningWheel.setCancelAction(sw_ert_cancel);
			SpinningWheel.setDoneAction(sw_ert_out_hole_done);
			SpinningWheel.open();
			return false;
		});

		$('#ert_out_tee', $('#edit_round_tee_p')).live('click', function(){
			var	cco = $('#edit_round_tee_p').data('out_tee_o');
			var	selected = sw_ert_out_tee_value();
			SpinningWheel.addSlot(cco, 'center', selected);
			SpinningWheel.setCancelAction(sw_ert_cancel);
			SpinningWheel.setDoneAction(sw_ert_out_tee_done);
			SpinningWheel.open();
			return false;
		});
		
		$('#ert_in_hole', $('#edit_round_tee_p')).live('click', function(){
			var	cco = $('#edit_round_tee_p').data('in_hole_o');
			var	selected = sw_ert_in_hole_value();
			l("IN HOLE "+ selected);
			selected = 999;
			SpinningWheel.addSlot(cco, 'center', selected);
			SpinningWheel.setCancelAction(sw_ert_cancel);
			SpinningWheel.setDoneAction(sw_ert_in_hole_done);
			SpinningWheel.open();
			return false;
		});
		
		$('#ert_in_tee', $('#edit_round_tee_p')).live('click', function(){
			var	cco = $('#edit_round_tee_p').data('in_tee_o');
			var	selected = sw_ert_in_tee_value();
			SpinningWheel.addSlot(cco, 'center', selected);
			SpinningWheel.setCancelAction(sw_ert_cancel);
			SpinningWheel.setDoneAction(sw_ert_in_tee_done);
			SpinningWheel.open();
			return false;
		});
		
		$('#edit_round_tee_form', $(this)).on('submit', function() {
			l("submit "+$(this).serialize());

			var	oh,ih,ot,it;
			if (IS_NATIVE_SELECTMENU) {
				oh=$('option:selected', $('#ert_out_hole_n', $('#edit_round_tee_p'))).val();
				ot=$('option:selected', $('#ert_out_tee_n', $('#edit_round_tee_p'))).val();
				ih=$('option:selected', $('#ert_in_hole_n', $('#edit_round_tee_p'))).val();
				it=$('option:selected', $('#ert_in_tee_n', $('#edit_round_tee_p'))).val();	
			} else {
				oh=sw_ert_out_hole_value();
				ih=sw_ert_in_hole_value();
				ot=sw_ert_out_tee_value();
				it=sw_ert_in_tee_value();
			}
			
			l("out course "+oh+" tee "+ot+" in course "+ih+" tee "+it);
			
			var	gcd=$('#edit_round_tee_p').data('golfcourse');
			
			var	rounddata=new RoundData();
			//	設定
			rounddata.id	= -1;
			
//			rounddata.golfcourse	= gcd;
			addGolfCourseData(gcd);
			
			rounddata.golfcourse_id		= gcd.id;
			rounddata.golfcoursename	= gcd.name;
			
			rounddata.out_course_id	= oh;
			rounddata.out_tee_id	= ot;
			
			for(var i in gcd.course_data) {
				var	cd = gcd.course_data[i];
				if (cd.id == oh) {
					for(var j in cd.tee_data) {
						var	td = cd.tee_data[j];
						if (td.id == ot) {
							for(var k in td.yards) {
								rounddata.yards.push(parseInt(td.yards[k]));
							}
							break;
						}
					}
					for(var k in cd.pars) {
						rounddata.pars.push(parseInt(cd.pars[k]));
						rounddata.hcds.push(parseInt(cd.hcds[k]));
					}
					break;
				}
			}

			if (typeof(ih) != "unknown") {
				if (ih > 0) {
					rounddata.in_course_id = ih;
					rounddata.in_tee_id = it;
					
					for(var i in gcd.course_data) {
						var	cd = gcd.course_data[i];
						if (cd.id == ih) {
							for(var j in cd.tee_data) {
								var	td = cd.tee_data[j];
								if (td.id == it) {
									for(var k in td.yards) {
										rounddata.yards.push(parseInt(td.yards[k]));
									}
									break;
								}
							}
							for(var k in cd.pars) {
								rounddata.pars.push(parseInt(cd.pars[k]));
								rounddata.hcds.push(parseInt(cd.hcds[k]));
							}
							break;
						}
					}
				}
			}
			
			rounddata.dump();
			
			var	event = {data:{page:'#edit_round_player_p', params:{item:rounddata}}};
			moveto(event);

			return false;
		});
	});
	
	/*	*/
	$('#edit_round_tee_p').live("pageshow", function(event, data) {
		if (IS_NATIVE_SELECTMENU) {
		$('#ert_out_hole_n', $(this)).selectmenu('refresh');
		$('#ert_out_tee_n', $(this)).selectmenu('refresh');
		$('#ert_in_hole_n', $(this)).selectmenu('refresh');
		$('#ert_in_tee_n', $(this)).selectmenu('refresh');
		}
	});
	
	$('#edit_round_tee_p').live("pagebeforeshow", function(event, data) {
		$('#edit_round_player_p').removeData('player_list');
		
		var	params=$(this).data('params');
		var	gcd=null;
		try {
			if (params) {
				for(var i in params) {
					console.log("edit_round_tee_p " + i +":"+ params[i]);
					if (i === "item") {
						gcd = params[i];
						break;
					}
				}
			}
		} catch(e){ l("try-catch : edit_round_tee_p " + e); }

		if (!gcd) {
			l("NO GOLF COURSE DATA");
			return false;
		}
	
		$(this).data('golfcourse', gcd);
		
		$('#ert_gc_name', $(this)).text(gcd.name);
		
		l(" name:"+gcd.name);
		l(" c # :"+gcd.max_course);

		var	val_out;
		var	val_in;
		var	val_tout;
		var	val_tin;
		if (IS_NATIVE_SELECTMENU) {
			val_out=new Array();
			val_in=new Array();
			val_tout=new Array();
			for(var i in (gcd.course_data)) {	//	var	cd = gcd.course_data[i];
				var	cd=gcd.course_data[i];
				val_out.push({k:cd.id, v:cd.name});

				if (val_tout.length == 0) {
					for(var tk in cd.tee_data){
						var	td = cd.tee_data[tk];
						l('td k:'+td.id+' v:'+td.name);
						val_tout.push({k:td.id, v:td.name});
					}
				}
				
				if (cd.holecount == 9) {
					val_in.push({k:cd.id, v:cd.name});
				}
			}

			var	th = $('#ert_out_hole_n', $('#edit_round_tee_p'));
			th.empty();
			$.tmpl("<option value='${k}'>${v}</option>", val_out).appendTo(th);
			th[0].selectedIndex=0;
			th.selectmenu('refresh');

			var	th = $('#ert_out_tee_n', $('#edit_round_tee_p'));
			th.empty();
			$.tmpl("<option value='${k}'>${v}</option>", val_tout).appendTo(th);
			th[0].selectedIndex=0;
			th.selectmenu('refresh');
		} else {
			val_out= {};
			val_in={};
			val_tout={};
			val_tin={};
			var	firsttime = true;
			var	firsttime_i = true;
			for(var i in (gcd.course_data)) {	//	var	cd = gcd.course_data[i];
				var	cd=gcd.course_data[i];
				
				val_out[cd.id]=cd.name;

				if (firsttime) {
					for(var tk in cd.tee_data){
						var	td = cd.tee_data[tk];
						val_tout[td.id]=td.name;
					}
					firsttime = false;
				}
		
				if (cd.holecount == 9) {
					if (firsttime_i) {
						val_in[999]="プレーしない";
						for(var tk in cd.tee_data){
							var	td = cd.tee_data[tk];
							val_tin[td.id]=td.name;
						}
						firsttime_i = false;
					}
					val_in[cd.id]=cd.name;
				}
			}

			$('#edit_round_tee_p').data('out_hole_o', val_out);
			for(var i in val_out) {
				$("#ert_out_hole span.ui-btn-text").text(val_out[i]);
				break;
			}
			
			$('#edit_round_tee_p').data('out_tee_o', val_tout);
			for(var i in val_tout) {
				$("#ert_out_tee span.ui-btn-text").text(val_tout[i]);
				break;
			}
		}
		

		if (IS_NATIVE_SELECTMENU) {

			if (val_in.length > 0) {
				var	th = $('#ert_in_hole_n', $('#edit_round_tee_p'));
				th.selectmenu('enable');
				th.empty();
				th.append("<option></option>");	//	none
				$.tmpl("<option value='${k}'>${v}</option>", val_in).appendTo(th);
				th[0].selectedIndex=0;

				$('#ert_in_tee_n', $('#edit_round_tee_p')).selectmenu('enable').empty();
			} else {
				$('#ert_in_hole_n', $('#edit_round_tee_p')).selectmenu('disable');
				$('#ert_in_tee_n', $('#edit_round_tee_p')).selectmenu('disable');
			}
		} else {
			l("VAL IN "+$.toJSON(val_in));
			l("VAL TIN "+$.toJSON(val_tin));
			var	c = 0;
			for(var i in val_in) {
				c ++;
			}
			
			if (c > 1) {
				l("VAL IN "+$.toJSON(val_in));
				$('#edit_round_tee_p').data('in_hole_o', val_in);
				for(var i in val_in) {
					$("#ert_in_hole span.ui-btn-text").text(val_in[i]);
					break;
				}
				$('#ert_in_hole', $('#edit_round_tee_p')).removeClass('ui-disabled');
	
				$('#edit_round_tee_p').data('in_tee_o', val_tin);
				for(var i in val_tin) {
					$("#ert_in_tee span.ui-btn-text").text(val_tin[i]);
					break;
				}
				$('#ert_in_tee', $('#edit_round_tee_p')).removeClass('ui-disabled');
			} else {
				$('#ert_in_hole', $('#edit_round_tee_p')).addClass('ui-disabled', true);
				$('#ert_in_tee', $('#edit_round_tee_p')).addClass('ui-disabled', true);
			}
		}
	});
	
	/*
	//	'#eri_in_hole'	in/outのチェックは必要。outには１８ホールは表示しない。inが9ホールの時はoutはnullか９ホール
	$('select', $('#edit_round_tee_p')).live('change', function(e, d){
		var	sid=$(this).attr('id');
		if (sid == "ert_in_tee" || sid === "ert_in_tee") {
			return;
		}

		var	v =  $('option:selected', $(this)).val();
		var	gcd = $('#edit_round_tee_p').data('golfcourse');
		var	cd = null;
		for(var i in gcd.course_data) {
			var	c=gcd.course_data[i];
			if (c.id == v) {
				cd = c;
				break;
			}
		}
		if (cd == null) {
			return;
		}
		
		var	val_tee=new Array();
		
		for(var i in (cd.tee_data)) {
			var	td=cd.tee_data[i];
			l('cd k:'+td.id+' v:'+td.name);
			val_tee.push({k:td.id, v:td.name});
		}
		
		var myselect = null;
		switch(sid){
			case "ert_in_hole":
				myselect = $("#ert_in_tee", $('#edit_round_tee_p'));
				break;
			
			case "ert_out_hole":
				myselect = $("#ert_out_tee", $('#edit_round_tee_p'));
				break;
		}
		myselect.empty();
		
		$.tmpl("<option value='${k}'>${v}</option>", val_tee).appendTo(myselect);
		
		myselect[0].selectedIndex=0;
		myselect.selectmenu('refresh');
	});
	*/
	
	$('#edit_round_tee_p').live("pagebeforehide", function(event, data) {
		$('#edit_round_tee_p').removeData('out_hole_o');
		$('#edit_round_tee_p').removeData('out_tee_o');
		$('#edit_round_tee_p').removeData('in_hole_o');
		$('#edit_round_tee_p').removeData('in_tee_o');
	});

}) (jQuery);


/*
 Cordova - SHOTBOOK make invites
 Copyright (c) 2012 Indi
 */

function confirmJoinEvent(answer) {
	if (answer <= 0 || answer > 3) {
		return;
	}
	try {
		$.mobile.showPageLoadingMsg("b","返答中'");
		
		var	params=$('#check_inv_p').data('params');
		var	event_id=params["event_id"];

		var	options = {"p":event_inv_ans_cmd, "evtbl_main_id":event_id, "status":answer };
		var	rcomment=$('#rinv_comment').attr('value');

		if (rcomment.length) {
			options.comment=rcomment;
		}
	
		$.post(root_url, options, function(response, textStatus, XMLHttpRequest){
			var	enc = $.toJSON(response);
			$.mobile.hidePageLoadingMsg();
			if (checkOkNg(enc)) {
				var	ansstr=["参加","不参加","未定"];
				navigator.notification.alert(ansstr[answer-1]+"と回答しました。", null, "お知らせ");
				$('#boot').removeData('check_time');
			} else {
				navigator.notification.alert("ネットワークエラー\n"+$.evalJSON(enc).error_list[0], null, "エラー");
			}
			history.back();
		}, 'json');
		
	}catch(e){l(e);}
}

function setInviteView(mine) {
	if (mine) {
		$('#inv_owner_div', $('#check_inv_p')).hide();
		$('#rinv_buttons', $('#check_inv_p')).hide();
		$('#rinv_texts', $('#check_inv_p')).hide();
	} else {
		$('#rinv_buttons', $('#check_inv_p')).show();
		$('#inv_owner_div', $('#check_inv_p')).show();
		$('#rinv_texts', $('#check_inv_p')).show();
		$('#inv_owner_name', $('#check_inv_p')).html("<div style='text-align:center'><img width='20px' height='20px' src='images/ajax-loader.gif' /></div>");
	}
}

function getYYYYMMDD(str) {
	return str.substring(0,10);
}

function getMyEventInfo(event_id) {
	try {
		//event_info_get_opt
		var	options = { "p":event_info_get_cmd, "evtbl_main_id":event_id };

		$.mobile.showPageLoadingMsg();
		
		var	loadtxt = "<div style='text-align:center'><img width='24px' height='24px' src='images/ajax-loader.gif' /></div>";
		$('#my_gr_title').html(loadtxt);
		$('#my_gr_text').html(loadtxt);
		$('#my_gr_date').html(loadtxt);
		
		$('#my_gr_count').text("参加 - 不参加 - 未定 - 未回答 - ");
		
		$.getJSON(root_url, options, function(json) {
			var	enc = $.toJSON(json);

			$('#my_gr_flist li').not("[data-role='list-divider']").remove();
			if (checkOkNg(enc)) {
				l("GET "+enc);
				
				var	_mydata = getDataFromLocal("mydata");
				
				var my_facebook_id;
				if (_mydata) {
					var	mydata = $.parseJSON(_mydata);
					my_facebook_id = mydata.pi_sns_id;
				} else {
					my_facebook_id = -1;
				}
				
				$('#my_gr_title').text($.evalJSON(enc).title);
				$('#my_gr_text').text($.evalJSON(enc).comment);
				
//				$('#my_gr_date').text(getYYYYMMDD($.evalJSON(enc).start_time));
				
				var	yyyymmdd=$.evalJSON(enc).start_time;
				var	ymd = yyyymmdd.split("-");
				if (ymd.length < 3) {
					ymd = yyyymmdd.split("/");
				}
				$('#my_gr_date').text(""+ymd[0]+" 年 "+ymd[1]+" 月 "+ymd[2].substring(0,2)+" 日");
			
				$('#inv_owner_name').text($.evalJSON(enc).event_owner_name);
				
				var	txt="";
				var	yes=0, not=0, unk=0, non=0;
				var	list = $.evalJSON(enc).request_user_list;
				
				var	button_off = -1;
				for(var i in list) {
					var	str = '';
					var	tmp = list[i];
					
					var	_ans_ = parseInt(tmp.status);
					if (tmp.facebook_id == my_facebook_id) {
						button_off = _ans_;
					}
					
					switch(_ans_) {
						case 0:
						non ++;
						str = '<span class="ui-li-aside" style="color:gray;">未回答</span>';
						break;
						
						case 1:
						yes ++;
						str = '<span class="ui-li-aside" style="color:green;">参加</span>';
						break;
						
						case 2:
						not ++;
						str = '<span class="ui-li-aside" style="color:red;">不参加</span>';
						break;
						
						case 3:
						unk ++;
						str = '<span class="ui-li-aside" style="color:maroon;">未定</span>';
						break;
					}

					var	comment = '';
					if (tmp.comment != null) {
						comment ="<span class='ui-li-desc'>"+tmp.comment+"</span>";
					}
					
					txt += "<li><span class='ui-li-heading'>"+tmp.name+"</span>"+str+comment+"</li>";
//					txt += "<li>"+tmp.name+" "+str+"</li>";
				}
/*				$('#rinv_ok').button('enable');
				$('#rinv_ng').button('enable');
				$('#rinv_un').button('enable');	*/
				$('#rinv_ok').removeClass('ui-disabled');
				$('#rinv_ng').removeClass('ui-disabled');
				$('#rinv_un').removeClass('ui-disabled');

				if (button_off > 0) {
					var	tgt;
					var	yesno;
					switch(button_off) {
						case 1:
						tgt = $('#rinv_ok');
//						$('rinv_ok').button('disable');
						yesno = "参加";
						break;
						
						case 2:
						tgt = $('#rinv_ng');
//						$('rinv_ng').button('disable');
						yesno = "不参加";
						break;
						
						case 3:
						tgt = $('#rinv_un');
//						$('rinv_un').button('disable');
						yesno = "未定";
						break;
					}
					
					tgt.addClass('ui-disabled');
					$('#should_answer_text').text("["+yesno+"]と返答済みです。");
				} else {
					$('#should_answer_text').text("お誘いに返答しましょう！");
				}

				$('#my_gr_flist').append(txt);
				$('#my_gr_flist').listview('refresh');
				$('#my_gr_flist').listview();
				
				$('#my_gr_count').text("参加 "+yes+" 不参加 "+not+" 未定 "+unk+" 未回答 "+non);
			} else {
				$('#my_gr_title').text("エラー");
				$('#my_gr_text').text("");
				$('#my_gr_date').text("");
				$('#inv_owner_name').text("");
			}
			$.mobile.hidePageLoadingMsg();
		});
		
	} catch(e){l(e);}
}


(function($) {
	$('#check_inv_p').live('pageinit', function(e,d) {
		
		$('a', $('#check_inv_p')).live('click', function(){
			var	id = $(this).attr('id');
			var	ans = -1;
			switch(id) {
				case "rinv_ok":
					ans = 1;
					break;

				case "rinv_ng":
					ans = 2;
					break;
				
				case "rinv_un":
					ans = 3;
					break;
			}

			if (ans > 0) {
				confirmJoinEvent(ans);
			}
		});
	});

	$('#check_inv_p').live('pagebeforeshow', function(e,d) {
		var	params=$(this).data('params');
		var	mine=params["mine"];
		setInviteView(mine);
	});
	
	$('#check_inv_p').live('pageshow', function(e,d) {
		if (online && fblogined) {
			var	params=$(this).data('params');
			var	event_id=params["event_id"];
			if (event_id) {
				getMyEventInfo(event_id);
			}
		} else {
		}
	});
	
})(jQuery);


//	ページ遷移
function moveto(event) {
    //	データ付加型 event.dataにparamsがある場合付加する。
    if (event.data && event.data.params) {
        $(event.data.page).data('params', event.data.params);
    }
    $.mobile.changePage($(event.data.page),{
        transition: event.data.transition
    });
}

function opendialog(event) {
    $.mobile.changePage($(event.data.page),{
        transition: event.data.transition,
        role:"dialog"
    });
}

function opendialog2(event) {
    //	データ付加型 event.dataにparamsがある場合付加する。
    if (event.data && event.data.params) {
        $(event.data.page).data('params', event.data.params);
    }
    
    $.mobile.changePage($(event.data.page),{
        transition: event.data.transition,
        role:"dialog"
    });
    //		return false;
}

//	ページ
function showthis(i) {
	var	pn = $('#results_gc_p');
	
	pn.removeData('max');
	pn.removeData('added');

	var	list = pn.data('list');

//	$('#gc_infos_p').data('params', {"item":list[i]});

	try {
 		var	cc = {};	//	make dummy data like from server
	
		cc.cc_id = list[i].id;
		cc.cc_name = list[i].name;
		cc.addr = list[i].address;
		cc.tel = list[i].phone;
		var	cl=list[i].course_data;
		
		cc.course_name_list = new Array();
		for(var j in cl) {
			var	tmp = new Array();
			tmp.course_name = cl[j].name;
			cc.course_name_list.push(tmp);
		}
		
		$('#gc_infos_p').data('params', {"item":cc});
		$.mobile.changePage('#gc_infos_p');

	} catch(e){l(e);}
	
	return false;
}




function makeHoleParYardsHCPtxt(hn,p,y,h){
	return "<span style='font-size:16px;color:#aaa;'>hole</span> <span style='font-size:22px;'>"
	+hn+ "</span> <span style='font-size:16px;color:#bbb;'>Par</span> <span style='font-size:22px;'>"
	+p+ "</span>  <span style='font-size:22px;'>"
	+y+ "<span style='font-size:16px;color:#ccc;'>yards</span><span style='font-size:16px;color:#ddd;'>H.C.</span><span style='font-size:22px;'>"
	+h+ "</span>";
}


function getWeatherImage(weather, size) {
	var	wc = new Weather();
	if (weather >=0 && weather < wc.title.length) {
		var	w1 = parseInt(weather) + 1;
		return "<img width='"+size+"' src='images/w/w"+w1+".png' />";
	}
	return null;
}

function addImageItemToRadio(opt, sel) {
	var	sel2j={'wind':"風", 'weather':"天候"};
	var	sel2c={'wind':"Wind()", 'weather':"Weather()"};
	
	var	vals=new Array();
	
	var	tw = eval("new "+sel2c[sel]);
	var	max = tw.title.length;
	
	var	fw = opt;
	fw.empty();
	var	str='<legend>'+sel2j[sel]+':</legend>';
	for(var i=0;i<max;i++){
		str += "<input id='"+sel+"_"+i+"' name='"+sel+"_checkbox' type='radio' value='" +i+ "'><label for='"+sel+"_"+i+"' style='width:54px;margin:0px;padding:0px;text-align:center;'><img src='images/w/w"+(i+1)+".png' style='width:34px;margin:0px -10px 0px -10px;padding:0px;' /></label></input>";
	}
	fw.append(str);
}

function addItemToRadio(opt, sel) {
	var	sel2j={'wind':"風", 'weather':"天候"};
	var	sel2c={'wind':"Wind()", 'weather':"Weather()"};
	
	var	vals=new Array();
	
	var	tw = eval("new "+sel2c[sel]);
	var	max = tw.title.length;
	
	var	fw = opt;
	fw.empty();
	for(var i=0; i<max; i++) {
		vals.push({k:i, v:tw.title[i]});
	}
	$('<legend>'+sel2j[sel]+':</legend>').appendTo(fw);
	$.tmpl("<input id='"+sel+"_${k}' name='"+sel+"_checkbox' type='radio' value='${k}'/><label for='"+sel+"_${k}' style='font-size:1.1em;'>${v}</label>", vals).appendTo(fw);
}

function addItemToSelector(opt, sel, isid) {
	try {
	var	sel2j={'wind':"風", 'weather':"天候", 'pref':"都道府県"};
	var	sel2c={'wind':"Wind()", 'weather':"Weather()", 'pref':"Prefecture()"};
	var	tmp;
	
	var	vals=new Array();
	
	var	tw = eval("new "+sel2c[sel]);
	var	max = tw.title.length;
	
	var	fw = opt;
	fw.empty();
	for(var i=0; i<max; i++) {
		tmp = (isid) ? i : tw.title[i];
		vals.push({k:tmp, v:tw.title[i]});
	}
	$("<option id='"+sel+"__' value='-1'  disabled='disabled'>"+sel2j[sel]+"</option>").appendTo(fw);
	var	str = "<option id='"+sel+"_${k}' value='${k}'>${v}</option>";
	$.tmpl(str, vals).appendTo(fw);
	} catch(e){l(e);}
}

//	jQuery
(function($) {
	
	$.fn.makeWindSelector = function() {
		addItemToRadio($(this), "wind");
	};
	
	$.fn.makeWeatherSelector = function() {
		addImageItemToRadio($(this), "weather");
	};
	
	$.fn.makePrefectureSelector = function() {
		addItemToSelector($(this), "pref", false);
	};
	
	
	$('div').live('pagebeforeshow', function(event, ui){	l('pagebeforeshow '+$(this).attr('id'));	});
	$('div').live('pagebeforehide', function(event, ui){	l('pagebeforehide '+$(this).attr('id'));	});
	$('div').live('pageshow', function(event, ui){
		l('pageshow '+$(this).attr('id'));
		l('window ('+$(window).width()+', '+$(window).height()+')');
		if ($(this).attr('id') == "text_input_dialog") {
			return;
		}
		var	_h = $('.ui-header',$(this)).height();
		if (_h) {
			_h += 4;
			$('.ui-content',$(this)).css('margin-top', _h + "px");
		}
		_h = $('.ui-footer',$(this)).height();
		if (_h) {
			_h += 4;
			$('.ui-content',$(this)).css('margin-bottom', _h + "px");
		}
	});
	$('div').live('pagehide', function(event, ui){	l('pagehide '+$(this).attr('id'));	});
	$('div').live('pagebeforecreate', function(event, ui){	l('pagebeforecreate '+$(this).attr('id'));	});
	$('div').live('pagecreate', function(event, ui){	l('pagecreate '+$(this).attr('id'));	});
	$('div').live('pageinit', function(event, ui){	l('pageinit '+$(this).attr('id'));	});
	//	???
	$('div').live('pagechange', function(event, ui){	l('pagechange '+$(this).attr('id'));	});

}) (jQuery);


/*
 Cordova - Golfer's HOME
 Copyright (c) 2012 Indi
 */

function initMenu() {
	//	ホーム用
	try {
		
		$('#h_b_0_0').html("ゴルフ<br>予約").addClass("twolinetxt");	//removeClass
		$('#menu_00').on('click', function() {
			/*
			var	event = {data:{page:'#search_gc_p', params:{'revflg':true}}};
			moveto(event);
			*/
			var	cb = ChildBrowser.install();
			if (cb != null) {
				cb.onClose = function(){self.onCloseBrowser();};
				cb.showWebPage(reserve_root_url);
			}
			return false;
		});
		
		$('#h_b_0_1').html("ゴルフに誘う").addClass("onelinetxt");
		$('#menu_01').attr('href', "#make_invites_p");
		
		$('#h_b_0_2').html("友達からの<br/>お誘い").addClass("twolinetxt");
		$('#menu_02').attr('href', "#have_invites_p");
		$('#h_b_0_2c').addClass("rightbottomtxt");
		
		$('#h_b_1_0').html("ゴル友一覧").addClass("onelinetxt");
		$('#menu_10').on('click', function() {
			var	event = {data:{page:'#golfriend_list_p', params:{'shotbook_only_flag':true, 'selectable':false}}};
			moveto(event);
		});	
		
		$('#h_b_1_1').html("スコア<br/>カード").addClass("twolinetxt");
//		$('#menu_11').attr('href', "#start_roundscores_p");
		$('#menu_11').attr('href', "#rounds_list_p");
		
		$('#h_b_1_2').html("スコア<br/>分析").addClass("twolinetxt");
//		$('#menu_12').attr('href', "#scoreanalysis_sel_p");
		$('#menu_12').attr('href', "#sa_easy_p");
		
		$('#h_b_2_0').html("ランキング").addClass("onelinetxt");
		$('#menu_20').attr('href', "#");
		
		$('#h_b_2_1').html("ニュース<br/>みんなの近況").addClass("twolinetxt");
//		$('#menu_21').attr('href', "#").attr('data-rel', "back");
		if (IS_IOS5) {
			$('#menu_21').attr('data-transition', "fade");
		}
		$('#menu_21').attr('href', "#home");
		
	//	$('#h_b_2_2').html("shotbook cup");
		$('#menu_22').attr('href', "#");

		var	w = $(window).width();
		var	v = parseInt( (w * 0.9) / 3);
		if (v > 94) {
			var	v2 = -v/2;
			var	px = ''+v+'px';
			var	hpx = ''+v2+'px';
			var	h=parseInt(v*1.1);
			var	ppx = ''+h+'px';
			$('.ninemenuicondiv').css({'height':ppx, 'width':px});
			
			$('.ninemenuimg').css({'height':px, 'width':px, 'margin-top':hpx, 'margin-left':hpx});
			$('.onelinetxt').css({'width':px, 'margin-left':hpx});
			$('.twolinetxt').css({'width':px, 'margin-left':hpx});
		}

	} catch(e){l(e);}
}

function setInvitaionCount(c) {
	if (c && c > 0) {
		if (c > 20) {
			c = "20+";
		}
		$('#h_b_0_2c').show();
		$('#h_b_0_2c').html("<div>"+c+"</div>");
	} else {
		$('#h_b_0_2c').hide();
	}
}


(function($) {
	$('#menu').live('pageinit', function(e,d){
		try{
			initMenu();
		} catch(e){l(e);}
	});
	
	$('#menu').live('pagebeforeshow', function(e,d){
		try{
			getPersonalInformation();
			
			var	json = getDataFromLocal("mydata");
			if (json) {
				var	myobj=$.parseJSON(json);
				
				$('#menu_best_score', $(this)).text(myobj.pi_best_score);
				$('#menu_ave_score', $(this)).text(myobj.pi_average);
				$('#menu_handicap', $(this)).text(myobj.pi_handicap);
				$('#menu_ave_putt', $(this)).text(myobj.pi_putting_average);
			}
			countEventListFromGolfriends();
			
			var	c = $('#boot').data('invitation_count');
			setInvitaionCount(c);

		} catch(e){l(e);}
	});

	$('#shotbook_etc_p').live('pagebeforeshow', function(e,d){
		if (fblogined) {
//			$('#shotbook_logout_btn', $(this)).removeClass('ui-disabled');
			$('#facebook_logout_btn', $(this)).removeClass('ui-disabled');
		} else {
//			$('#shotbook_logout_btn', $(this)).addClass('ui-disabled', 'ui-disabled');
			$('#facebook_logout_btn', $(this)).addClass('ui-disabled', 'ui-disabled');
		}
	});

})(jQuery);


/*
	Cordova - Golfer's Dashboard RoundScore
Copyright (c) 2012 Indi
 */

/*
function utf8_encode (argString) {
    if (argString === null || typeof argString === "undefined") {
        return "";
    }
	
    var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var utftext = "",
	start, end, stringl = 0;
	
    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;
		
        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.slice(start, end);
            }
            utftext += enc;
            start = end = n + 1;
        }
    }
	
    if (end > start) {
        utftext += string.slice(start, stringl);
    }
	
    return utftext;
}

function crc32 ( str ) {
    str = utf8_encode(str);
    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
	
    var crc = 0;
    var x = 0;
    var y = 0;
	
    crc = crc ^ (-1);
    for( var i = 0, iTop = str.length; i < iTop; i++ ) {
        y = ( crc ^ str.charCodeAt( i ) ) & 0xFF;
        x = "0x" + table.substr( y * 9, 8 );
        crc = ( crc >>> 8 ) ^ x;
    }
	
    return crc ^ (-1);
}
*/

function cleanupHolesDetails(rd) {
	for(var i in rd.scores) {
		for(var j in rd.scores[i].holescores) {
			var	tmp = rd.scores[i].holescores[j];
			if (tmp.details) {
				rd.scores[i].holescores[j].details = {};
			}
		}
	}
	
	return rd;
}

function quitRoundScoreOrNot() {
	navigator.notification.confirm(
		"ラウンドスコアを終了します。よろしいですか？",	// message
		function(index){
			if (index == 2) {
				var	rd = $('#round_score_p').data('rounddata');

				$('#round_score_p').removeData('scrollpos');
				$('#round_score_p').removeData('sum_');

				rd = cleanupHolesDetails(rd);
				
				if (rd.sdb_id < 0) {
					getIdIfServerIsReady(rd);
				} else {
					//	save する
					l("ROUNDDATA SDBID "+rd.sdb_id +" ID "+rd.id);
					if (rd.sdb_id < 0 && rd.id < 0) {
						l("NEW ROUNDDATA TO DB");
						addRoundData(rd);
					} else {
						l("UPDATE ROUNDDATA IN DB");
						updateRoundData(rd);
					}
					
					//	送る
					sendThisRoundData(rd);
					
					$('a', $(this)).off('click');
				}
				
				//	HISTORY CLEAR
				var historyCount=history.length;
				history.go(-historyCount);
				
//				$.mobile.changePage("#menu", {"reverse":true});
				$.mobile.changePage("#rounds_list_p", {"reverse":true});
							
				return;
			} else {
				return;
			}
		},	// callback (index of button pressed)
		'警告', 'いいえ,はい');
}


function getIdIfServerIsReady(rd) {
	if (rd.sdb_id >= 0) {
		return;
	}
	
	var	roundscore_register_opt = [ "cc_id", "course_id", "playdate", "weather", "wind" ];	//YYYYMMDD
	
	var	opt = { "p": roundscore_register_cmd };
	
	for(var i in roundscore_register_opt){
		var	j = roundscore_register_opt[i];
		if (j === "playdate") {
			opt[j] = normalizeDate(rd.date);
		} else if (j === "cc_id") {
			opt[j] = parseInt(rd.golfcourse_id);
		} else {
			opt[j] = rd[j];
		}
	}
	
	if (!opt.course_id) {
		opt.course_id = rd.out_course_id;
	}
	
	if (online) {
		$.post(root_url, opt, function(json){
			var	enc = $.toJSON(json);
			
			var result = $.evalJSON( enc ).result;
			if (result == 0){
				var	id = $.evalJSON( enc ).round_id;
				if (id) {
					rd.sdb_id = id;
					l(roundscore_register_cmd + " get "+id);
					
					//	save する
					l("GETID ROUNDDATA SDBID "+rd.sdb_id +" ID "+rd.id);
					if (rd.sdb_id < 0 && rd.id < 0) {
						l("NEW ROUNDDATA TO DB");
						addRoundData(rd);
					} else {
						l("UPDATE ROUNDDATA IN DB");
						updateRoundData(rd);
					}
					
					//	送る
					sendThisRoundData(rd);
					
					$('a', $(this)).off('click');
				
					return id;
				} else {
					l(roundscore_register_cmd + " NO ID !!!!!!");
					
					l("ERROR NO-ID... ROUNDDATA SDBID "+rd.sdb_id +" ID "+rd.id);
					if (rd.sdb_id < 0 && rd.id < 0) {
						l("NEW ROUNDDATA TO DB");
						addRoundData(rd);
					} else {
						l("UPDATE ROUNDDATA IN DB");
						updateRoundData(rd);
					}
				}
			} else {
				l(roundscore_register_cmd + " FAILED");
				l($.JSONstr($.evalJSON( enc ).error_list));
				
				l("ERROR GETID... ROUNDDATA SDBID "+rd.sdb_id +" ID "+rd.id);
				if (rd.sdb_id < 0 && rd.id < 0) {
					l("NEW ROUNDDATA TO DB");
					addRoundData(rd);
				} else {
					l("UPDATE ROUNDDATA IN DB");
					updateRoundData(rd);
				}
			}
		}, 'json');
	} else {
		if (rd.sdb_id < 0 && rd.id < 0) {
			l("NEW ROUNDDATA TO DB");
			addRoundData(rd);
		} else {
			l("UPDATE ROUNDDATA IN DB");
			updateRoundData(rd);
		}
	}
}

function sendThisRoundData(rd) {
	try {
		if (!(online && fblogined)) {
	//		navigator.notification.alert("ローカルにセーブします", null, "オフラインモード");
			return;
		}
		var	rd2 = $.toJSON(rd);
		
		var	sum = $('#round_score_p').data('sum_');
		$('#round_score_p').removeData('sum_');
	
		var	sum2 = checksum(rd2);
		
		if (sum == sum2) {
			return;
		}
		var	sums = one_analysis(rd);
		var	sums2 = $.toJSON(sums);
		var	dd = (rd.date).replace(/-/g, "");
		
		var	shot_total = 0;
		var	putt_total = 0;
		var	hss = rd.scores[0].holescores;
		for(var i in hss) {
			var	tsp = hss[i];
			shot_total += parseInt(tsp.shot);
			putt_total += parseInt(tsp.putt);
		}
		
		var	options = { "p":roundscore_upload_cmd, "round_id":rd.sdb_id, "playdate":dd, "weather":rd.weather, "wind":rd.wind, "sum_data":sums2, "score_data":rd2, "shot_total":shot_total, "putt_total":putt_total };
		
		$.mobile.showPageLoadingMsg('a', 'ラウンドデータをアップロード中です。');

		$.post(root_url, options, function(response, textStatus, XMLHttpRequest) {
			var	enc = $.toJSON(response);

			if (checkOkNg(enc)) {
				navigator.notification.alert("正常にアップロードされました。", null, "成功");
				if (sums != null) {
					$('#boot').removeData('check_pi_time');
					getPersonalInformation();
				}
			} else {
				navigator.notification.alert("ネットワークエラー\n"+$.evalJSON(enc).error_list[0], null, "エラー");
			}
			$.mobile.hidePageLoadingMsg();
		}, 'json');
	} catch(e){l(e);}
}


function drawScoreCard(rounddata){
	l("drawScoreCard");

	try {
		var	t = $('#sc_out_t', $('#round_score_p'));
		t.empty();
		
		var	max=rounddata.max_players;	//	rounddata.scores.length;
		var	max2=max + 2;

		var	prc;
		var	colstxt;
		
		if (max != 3) {
			prc = (84 - 16) / max;
			colstxt="<colgroup span='1' width='16%'></colgroup>";	//	20
		} else {
			prc = 22;
			colstxt="<colgroup span='1' width='17%'></colgroup>";	//	21
		}
		var	str_p = "<colgroup span='1' width='8%'></colgroup>";	//	8
		var	str = "<colgroup span='1' width='"+ prc + "%'></colgroup>";

		for(var i=0; i<max; i++) {
			if (i == 0 || i == 1) {
				colstxt += str_p;
			}
			colstxt += str;
		}

		t.append(colstxt);
		
		var	dd=(rounddata.date).split("-");
		
		var	uha= "<tr class='odd'>"
		+ "<td colspan='1' style='text-align:center;'><div style='font-size:0.8em;line-height:1em;' id='rc_date'>"+dd[0]+"<br/>"+dd[1]+"/"+dd[2]+"</div></td>"
		+ "<td colspan='" +max2+ "'><a id='rdibtn' href='#' class='simplea' style='font-size:0.9em;color:#222; white-space:nowrap; text-overflow:ellipsis'>"+rounddata.golfcoursename+"<div id='sc_weather_icon' style='vertical-align:-0.0em;float:right;'>"+getWeatherImage(rounddata.weather, "18px")+"</div></a></td>"
		+ "</tr>"
		+ "<tr class='even' style='border:1px solid red;text-align:center;'>"
		+ "<td style='font-size:0.6em;'><div style='text-align:left;'>HOLE</div><div style='text-align:right;'>YARD</div></td>"
		+ "<td class='puttnum' style='font-size:0.7em;line-height:0.8em;'>P<br/>A<br/>R</td>";
		
		var	hea=uha;
		var	cnt=0;
		for(var i in rounddata.scores) {
			var	ors=rounddata.scores[i];
			if (ors) {
//				var	sn=ors.player.name;
				var	snp = (ors.player.name).split(" ");
				var	sn=snp[0];
				var	playerstr="<td><a id='pname"+cnt+"' class='demo simplea'>"+ sn +"</a></td>";
				hea+=playerstr;
				if (i == 0) {
					hea+="<td class='puttnum'>P</td>";
				}
				cnt++;
			}
		}
		hea+="</tr>";
		t.append(hea);

		
		var	tmps="";

		var	cnt=0;
		var	maxh = rounddata.pars.length;
		
		
		var	shot=new Array();	//	max 4 player
		var	putt=new Array();	//	only 1 player, but not delete now
		for(var i=0;i<4;i++) {
			shot[i]=new Array();
			putt[i]=new Array();
		}
		
		for(var i in rounddata.scores) {
			var	ors=rounddata.scores[i];
			if (ors) {
				var	hs=ors.holescores;
				for(var i in hs) {
					var	hole = hs[i].holenum;
					var	s = hs[i].shot;
					var	p = hs[i].putt;
					shot[cnt][hole]=s;
					putt[cnt][hole]=p;
				}
				cnt++;
			}
		}
		var	sumyards=0;
		var	outsumyards=0;
		var	in_sumyards=0;
		var	sumpars=0;
		var	outsumpars=0;
		var	in_sumpars=0;
		
		for(var j=0;j<9;j++){
			sumpars += rounddata.pars[j];
			outsumpars += rounddata.pars[j];
			sumyards += rounddata.yards[j];
			outsumyards += rounddata.yards[j];
		}
		if (maxh > 9) {
			for(var j=9;j<18;j++){
				sumpars += rounddata.pars[j];
				in_sumpars += rounddata.pars[j];
				sumyards += rounddata.yards[j];
				in_sumyards += rounddata.yards[j];
			}
			
			$('#show_10_18', $('#round_score_p')).removeClass('ui-disabled');
		} else {
			$('#show_10_18', $('#round_score_p')).addClass('ui-disabled', true);
		}
		
		var	sumshot=new Array();
		var	sumputt=new Array();
		var	outsumshot=new Array();
		var	outsumputt=new Array();
		var	in_sumshot=new Array();
		var	in_sumputt=new Array();
		var	s, p;
		
		for(var i=0;i<max;i++){	//	players
			sumshot[i]=0;
			outsumshot[i]=0;
			in_sumshot[i]=0;
			sumputt[i]=0;
			outsumputt[i]=0;
			in_sumputt[i]=0;
			for(var j=1;j<=9;j++){
				s = parseInt(shot[i][j]);
				p = parseInt(putt[i][j]);
				sumshot[i] += s;
				outsumshot[i] += s;
				sumputt[i] += p;
				outsumputt[i] += p;
			}
			if (maxh > 9) {
				for(var j=10;j<=18;j++){
					s = parseInt(shot[i][j]);
					p = parseInt(putt[i][j]);
					sumshot[i] += s;
					in_sumshot[i] += s;
					sumputt[i] += p;
					in_sumputt[i] += p;
				}
			}
		}

		var	tmp = "";
		//	HOLE/YARD
		var	iba = "<tr class='";
		var	ibb = "'><td style='margin:1px; padding:1px;'><div class='holenum'>";
		var	ibc = "</div><div class='yards' style='vertical-align:bottom;'>";
		var	ibd = "</div></td>";
		//	PAR
		var	ibd0 = "<td class='puttnum'><div class='parnum'>";
		var	ibd1 = "</div></td>";

		var	ibea="<td id='";
		var	ibeb="'><div class='";
		var	ibec="'>";
		var	ibed="</td>";
		var	ibee0="<td class='puttnum' id='";
		var	ibee1="'>";
		var	ibef="</td>";
		var	ibeg="</tr>";
		
		//	OUT
		var	soba = "<tr class='out_row'><td><div style='font-size:0.9em;' class='sum'>OUT</div></td><td class='puttnum'><div class='parsum' id='rc_outsumpars'>"+outsumpars+"</div></td>";
		//	IN
		var	siba = "<tr class='in_row'><td><div style='font-size:0.9em;' class='sum'>IN</div></td><td class='puttnum'><div class='parsum' id='rc_in_sumpars'>"+in_sumpars+"</div></td>";
		//	SUM
		var	sba = "<tr class='sum_row'><td><div style='font-size:0.9em;' class='sum'>合計</div></td><td class='puttnum'><div class='parsum' id='rc_sumpars'>"+sumpars+"</div></td>";
		//	SUM
		var	sba18 = "<tr class='sum_row'><td><div style='font-size:0.9em;' class='sum'>合計</div></td><td class='puttnum'><div class='parsum' id='rc_18sumpars'>"+sumpars+"</div></td>";
		
		var	obea="<td style='margin:1px; padding:1px;'><div class='shotnum' id='";
		var	obea1="'>";
		var	obeb="</div></td>";
		var	obec="<td class='puttnum'><div class='puttnum' id='";
		var	obec1="'>";
		var	obed="</div></td>";
		var	obee = "</tr>";
		
		for(var i=0; i<9; i++){
			var	thispar = rounddata.pars[i];
			
			tmp += iba;
			tmp += (i%2)?"even":"odd";
			tmp += ibb;
			tmp += (i+1);	//	hole num
			tmp += ibc;
			tmp += rounddata.yards[i];
			tmp += ibd;
			
			tmp += ibd0;
			tmp += thispar;
			tmp += ibd1;
			
			for(var j=0;j<max;j++){
				var	s = shot[j][i+1];
				var	s_s = s.toString().length;
				var	str;
				if (s_s > 2) {
					str = "shotnum3";
				} else {
					str = "shotnum";
				}
				if (s == 0) {
					str += " shotnp";
				} else if (thispar - s > 0) {
					str += " shotop";
				} else if (thispar - s == 0) {
					str += " shotep";
				} else {
					str += " shotup";
				}
				
				tmp += ibea;
				tmp += j + "_" + (i+1);	//	user[0..3] _ [1..9/18]
				tmp += ibeb;
				tmp += str;
				tmp += ibec;
				if (s == 0) {
					tmp += "-";
				} else {
					tmp += s;
				}
				tmp += ibed;
				if (j == 0) {
					tmp += ibee0;
					tmp += "p_" +(i+1);	//	一人だけだから。
					tmp += ibee1;
					tmp += putt[j][i+1];
					tmp += ibef;
				}
			}
			tmp += ibeg;
		}
		//	for OUT sum
		tmp += soba;
		for(var j=0;j<max;j++){
			tmp += obea;
			tmp += "rc_out_sums_"+j;
			tmp += obea1;
			tmp += outsumshot[j];
			tmp += obeb;
			if (j == 0) {
				tmp += obec;
				tmp += "rc_out_sump_0";
				tmp += obec1;
				tmp += outsumputt[j];
				tmp += obed;
			}
		}
		tmp += obee;
		
		//	for SUM
		tmp += sba;
		for(var j=0;j<max;j++){
			tmp += obea;
			tmp += "rc_allo_sums_"+j;
			tmp += obea1;
			tmp += sumshot[j];
			tmp += obeb;
			if (j == 0) {
				tmp += obec;
				tmp += "rc_allo_sump_0";
				tmp += obec1;
				tmp += sumputt[j];
				tmp += obed;
			}
		}
		tmp += obee;
		
		tmps += tmp;
		
 		t.append(tmps);

		
		//	IN
		var	t = $('#sc_in_t', $('#round_score_p'));
		t.empty();
		
		if (maxh > 9) {
			t.append(colstxt);
			t.append(hea);

			tmp="";
			for(var i=9; i<18; i++){
				var	thispar = rounddata.pars[i];
				
				tmp += iba;
				tmp += (i%2)?"even":"odd";
				tmp += ibb;
				tmp += (i+1);	//	hole num
				tmp += ibc;
				tmp += rounddata.yards[i];
				tmp += ibd;
				
				tmp += ibd0;
				tmp += thispar;
				tmp += ibd1;
				
				for(var j=0;j<max;j++){
					var	s = shot[j][i+1];
					var	s_s = s.toString().length;
					var	str;
					if (s_s > 2) {
						str = "shotnum3";
					} else {
						str = "shotnum";
					}
					if (s == 0) {
						str += " shotnp";
					} else if (thispar - s > 0) {
						str += " shotop";
					} else if (thispar - s == 0) {
						str += " shotep";
					} else {
						str += " shotup";
					}
					
					tmp += ibea;
					tmp += j + "_" + (i+1);	//	user[0..3] _ [1..9/18]
					tmp += ibeb;
					tmp += str;
					tmp += ibec;
					if (s == 0) {
						tmp += "-";
					} else {
						tmp += s;
					}
					tmp += ibed;
					if (j == 0) {
						tmp += ibee0;
						tmp += "p_" +(i+1);	//	一人だけだから。
						tmp += ibee1;
						tmp += putt[j][i+1];
						tmp += ibef;
					}
				}
				tmp += ibeg;
			}
			//	for IN sum
			tmp += siba;
			for(var j=0;j<max;j++){
				tmp += obea;
				tmp += "rc_in_sums_"+j;
				tmp += obea1;
				tmp += in_sumshot[j];
				tmp += obeb;
				if (j == 0) {
					tmp += obec;
					tmp += "rc_in_sump_0";
					tmp += obec1;
					tmp += in_sumputt[j];
					tmp += obed;
				}
			}
			tmp += obee;
			
			//	for SUM
			tmp += sba18;
			for(var j=0;j<max;j++){
				tmp += obea;
				tmp += "rc_alli_sums_"+j;
				tmp += obea1;
				tmp += sumshot[j];
				tmp += obeb;
				if (j == 0) {
					tmp += obec;
					tmp += "rc_alli_sump_0";
					tmp += obec1;
					tmp += sumputt[j];
					tmp += obed;
				}
			}
			tmp += obee;
				
	 		t.append(tmp);
		} else {
			l("ONLY 9 HOLEs");
			$('#show_10_18').hide();
			$('#back_menu10_18').hide();
		}

	} catch(e){l("drawScoreCard " + e);}

	return;
}


function updateScoreCard(rounddata){
	
	try {
		var	max=rounddata.max_players;	//	rounddata.scores.length;
		var	dd=(rounddata.date).split("-");
		$('#rc_date').html(dd[0]+"<br/>"+dd[1]+"/"+dd[2]);
		$('#sc_weather_icon').html(getWeatherImage(rounddata.weather, "18px"));
		
		
		var	cnt=0;
		var	maxh = rounddata.pars.length;
		
		var	shot=new Array();	//	max 4 player
		var	putt=new Array();	//	only 1 player, but not delete now
		for(var i=0;i<4;i++) {
			shot[i]=new Array();
			putt[i]=new Array();
		}
		
		for(var i in rounddata.scores) {
			var	ors=rounddata.scores[i];
			if (ors) {
				var	hs=ors.holescores;
				for(var i in hs) {
					var	hole = hs[i].holenum;
					var	s = hs[i].shot;
					var	p = hs[i].putt;
					shot[cnt][hole]=parseInt(s);
					putt[cnt][hole]=parseInt(p);
				}
				cnt++;
			}
		}
//		var	sumyards=0;
//		var	outsumyards=0;
//		var	in_sumyards=0;
		var	sumpars=0;
		var	outsumpars=0;
		var	in_sumpars=0;
		
		for(var j=0;j<9;j++){
			sumpars += rounddata.pars[j];
			outsumpars += rounddata.pars[j];
//			sumyards += rounddata.yards[j];
//			outsumyards += rounddata.yards[j];
		}
		
		if (maxh > 9) {
			for(var j=9;j<18;j++){
				sumpars += rounddata.pars[j];
				in_sumpars += rounddata.pars[j];
//				sumyards += rounddata.yards[j];
//				in_sumyards += rounddata.yards[j];
			}
		}
		
		var	sumshot=new Array();
		var	sumputt=new Array();
		var	outsumshot=new Array();
		var	outsumputt=new Array();
		var	in_sumshot=new Array();
		var	in_sumputt=new Array();
		var	s, p;
		
		for(var i=0;i<max;i++){	//	players
			sumshot[i]=0;
			outsumshot[i]=0;
			in_sumshot[i]=0;
			sumputt[i]=0;
			outsumputt[i]=0;
			in_sumputt[i]=0;
			for(var j=1;j<=9;j++){
				s = parseInt(shot[i][j]);
				p = parseInt(putt[i][j]);
				sumshot[i] += s;
				outsumshot[i] += s;
				sumputt[i] += p;
				outsumputt[i] += p;
			}
			if (maxh > 9) {
				for(var j=10;j<=18;j++){
					s = parseInt(shot[i][j]);
					p = parseInt(putt[i][j]);
					sumshot[i] += s;
					in_sumshot[i] += s;
					sumputt[i] += p;
					in_sumputt[i] += p;
				}
			}
		}
		
		$('#rc_outsumpars').html(outsumpars);
		$('#rc_in_sumpars').html(in_sumpars);
		$('#rc_sumpars').html(sumpars);
		$('#rc_18sumpars').html(sumpars);
		
		for(var i=0; i<9; i++){
			var	thispar = parseInt(rounddata.pars[i]);
			var	i1 = i + 1;
			for(var j=0;j<max;j++){
				var	s = shot[j][i1];
				var	s_s = s.toString().length;
				var	tid = "#" +j+ "_" +i1;
				
				$(tid).removeClass('shotnum3').removeClass('shotnum').removeClass('shotop').removeClass('shotep').removeClass('shotup').removeClass('shotnp');

				var	str1;
				if (s_s > 2) {
					str1 = "shotnum3";
				} else {
					str1 = "shotnum";
				}
				
				var	str2;
				if (s == 0) {
					str2 += "shotnp";
				} else if (thispar - s > 0) {
					str2 = "shotop";
				} else if (thispar - s == 0) {
					str2 = "shotep";
				} else {
					str2 = "shotup";
				}
				$(tid).addClass(str1).addClass(str2);
				if (s == 0) {
					s = "-";
				}
				$(tid).text(s);
							
				if (j == 0) {
					$('#p_' + i1).text(putt[j][i1]);
				}
			}
		}
		
		//	for OUT sum
		for(var j=0;j<max;j++){
			l("OUT s "+outsumshot[j]+" p "+outsumputt[j]);
			$("#rc_out_sums_"+j).text(outsumshot[j]);
		}
		$('#rc_out_sump_0').text(outsumputt[0]);
		
		//	for SUM
		for(var j=0;j<max;j++){
			l("SUM s "+sumshot[j]+" p "+sumputt[j]);
			$("#rc_allo_sums_"+j).text(sumshot[j]);
		}
		$('#rc_allo_sump_0').text(sumputt[0]);
		
		
		
		//	IN
		if (maxh > 9) {
			for(var i=9; i<18; i++){
				var	thispar = parseInt(rounddata.pars[i]);
				var	i1 = i + 1;
				for(var j=0;j<max;j++){
					var	s = shot[j][i1];
					var	s_s = s.toString().length;
					var	tid = "#" +j+ "_" +i1;
					
					$(tid).removeClass('shotnum3').removeClass('shotnum').removeClass('shotop').removeClass('shotep').removeClass('shotup').removeClass('shotnp');
					
					var	str1;
					if (s_s > 2) {
						str1 = "shotnum3";
					} else {
						str1 = "shotnum";
					}
					
					var	str2;
					if (s == 0) {
						str2 = "shotnp";
					} else if (thispar - s > 0) {
						str2 = "shotop";
					} else if (thispar - s == 0) {
						str2 = "shotep";
					} else {
						str2 = "shotup";
					}
					$(tid).addClass(str1).addClass(str2);
					if (s == 0) {
						s = "-";
					}
					$(tid).text(s);
					
					if (j == 0) {
						$("#p_" + i1).text(putt[j][i1]);
					}
				}
			}
			
			//	for IN sum
			for(var j=0;j<max;j++){
				l(" IN s "+in_sumshot[j]+" p "+in_sumputt[j]);
				$("#rc_in_sums_"+j).text(in_sumshot[j]);
			}
			$('#rc_in_sump_0').text(in_sumputt[0]);
			
			//	for SUM
			for(var j=0;j<max;j++){
				$("#rc_alli_sums_"+j).text(sumshot[j]);
			}
			$('#rc_alli_sump_0').text(sumputt[0]);
		}
		
	} catch(e){l("updateScoreCard " + e);}
	
	return;
}




function movetoEditHandicap(usernum){
	try{
		var	rd = $('#round_score_p').data('rounddata');
		var	event;
		if (IS_ANDROID) {
			event = {data:{page:"#sc_edit_player_p", params:{'item':rd, 'usernum':usernum}}};
		} else {
			event = {data:{page:"#sc_edit_player_p", transition:"pop", params:{'item':rd, 'usernum':usernum}}};
		}
		opendialog2(event);
	}catch(e){l("movetoEditHandicap " + e);}
}


function showSCout() {
	l("SHOW SC OUT");
	scFirstContent.show();
	scSecondContent.hide();
	
	$('#show_10_18').show();
	$('#show_1_9').hide();
	$('#back_menu1_9').show();
	$('#back_menu10_18').hide();
}

function showSCin() {
	l("SHOW SC IN");
	scFirstContent.hide();
	scSecondContent.show();
	
	$('#show_10_18').hide();
	$('#show_1_9').show();
	$('#back_menu1_9').hide();
	$('#back_menu10_18').show();
}



(function($) {

	$('#round_score_p').live('pageinit', function(e, d){
		scFirstContent=$('#sc_out_c');	//defining selectors
		scSecondContent=$('#sc_in_c');
		showSCout();
		
		$('td', $('#round_score_p')).live('tap', function(){
			var	id = $(this).attr('id');
			if (id) {
				$(this).parents('tr').find('td').each( function( index, element ) {
					$(element).addClass('onHover');
				});
				
				var	a = id.split('_');
				
				l("TAP CELL a0 "+a[0]+" a1 "+a[1]+" lng "+a.length);
				
				var	rd = $('#round_score_p').data('rounddata');
				var	event;
				if (IS_ANDROID) {
					event = {data:{page:'#scoreedit_p', params:{item:rd, player:a[0], hole:a[1]}}};
				} else {
					event = {data:{page:'#scoreedit_p', transition:"pop", params:{item:rd, player:a[0], hole:a[1]}}};
				}
				moveto(event);
			}
		});
	});
	
	$('#round_score_p').live('pagebeforeshow', function(e,d){
		try{
			$('a', $(this)).off('click');
			
			var	params=$(this).data('params');
			var	rd=params["item"];
			if (rd) {
				l("RD HAS");
				var	str = $.toJSON(rd);
				$(this).data('rounddata', rd);
			} else {
				rd = $(this).data('rounddata');
			}
			
			//	checksum
			if (!$(this).data('sum_')) {
				var	sum_ = checksum(str);
				l("CHECKSUM is "+sum_);
				$(this).data('sum_', sum_);
				drawScoreCard(rd);
			} else {
//	drawScoreCard(rd);
				updateScoreCard(rd);
				
				$('#round_score_p').find('table td').each( function( index, element ) {
					$(element).removeClass('onHover');
				} );
			}

			if (params.show_in == true) {
				showSCin();
			} else if (params.show_in == false) {
				showSCout();
			}
			
			$('a', $(this)).on('click', function(e){
				var	id = $(this).attr('id');
				l("click (" + id + ") event type:"+e.type);
				
				var	rd = $('#round_score_p').data('rounddata');
				
				if (id =="show_10_18") {
					showSCin();
				} else if (id =="show_1_9") {
					showSCout();
				} else if ((id =="back_menu1_9") || (id =="back_menu10_18")) {
					quitRoundScoreOrNot();
					return false;
			} else if (id === "rdibtn") {
				var	event = {data:{page:'#sc_edit_info_p', transition:"pop", params:{item:rd}}};
				moveto(event);
			} else if (id.match("pname[0-3]")) {
/*				var	u = parseInt(id.substr(5));
				movetoEditHandicap(u);	*/
			}

			});

		}catch(e){l(e);}
	});
/*
	$('#round_score_p').live('pageshow', function(e,d) {
	});
*/
}) (jQuery);


/*
	Cordova - Golfer's Dashboard DB
Copyright (c) 2012 Indi
*/


function onCloseReserveBrowser() {
	//	HISTORY CLEAR
	var historyCount=history.length;
	history.go(-historyCount);
	
	$.mobile.changePage("#menu");
}

function readGCDetailsFromServer(cc_id) {
	var	options = {"p":golfcourse_info_cmd, "ccid":cc_id };
	
	$.mobile.showPageLoadingMsg();
	
	$.getJSON(root_url, options, function(response) {
		var	enc = $.toJSON(response);
		l("response is "+enc);
		
		var	result=$.evalJSON(enc).result;
		if (result == 0) {
try {			
			var	gcd = new GolfCourseData();

			gcd.id		= cc_id;	//	from server. uniq.
			gcd.name	= $.evalJSON(enc).cc_name;
			gcd.update	= $.evalJSON(enc).updatetime;
			
			gcd.address	= $.evalJSON(enc).addr;
			gcd.phone	= $.evalJSON(enc).tel;
			
			gcd.reserve_dd_id	= $.evalJSON(enc).reserve_cc_id;
			gcd.latitude		= $.evalJSON(enc).latitude;
			gcd.longitude		= $.evalJSON(enc).longitude;

			gcd.course_data = new Array();
			var	c = 0;
			var	cl = $.evalJSON(enc).course_list;
			for(var i in cl) {
				var	cd = new CourseData();
				cd.id	= cl[i].course_id;
				cd.name	= cl[i].course_name;
				cd.desc = cl[i].course_text;

				var	holecount = 0;
				cd.pars = new Array();
				cd.hcds = new Array();
				for(var j in cl[i].par) {
					cd.pars.push(cl[i].par[j]);
					cd.hcds.push(cl[i].rate[j]);
					holecount ++;
				}
				cd.holecount	= holecount;

				cd.tee_data	= new Array();
				var	tc = 0;
				var	tl = cl[i].tee;
				for(var j in tl) {
					var	tee = new TeeData();
					tee.id = j;
					tee.name = tl[j]["0"];
					
					tee.yards = new Array();
					for(var k in tl[j]["yards"]) {
						var	yard = tl[j]["yards"][k];
						tee.yards.push(yard);
					}
					
					cd.tee_data.push(tee);
					tc ++;
				}
				cd.teecount = tc;
				
				l("cd is "+$.JSONstr(cd));
				
				gcd.course_data.push(cd);
				c ++;
			}
			gcd.max_course	= c;	//	N
			
			l("gcd is "+$.JSONstr(gcd));
	
			$.mobile.hidePageLoadingMsg();
	
			navigator.notification.alert("コース詳細を入手しました。\nスコア編集を始めます。", function(action) {
				l(action);
				var	event = {data:{page:'#edit_round_tee_p', params:{'item':gcd}}};
				moveto(event);
			}, "お知らせ");
} catch(e){l("in callback " +e);}
		} else {
			$.mobile.hidePageLoadingMsg();
			navigator.notification.alert("ネットワークエラー\n"+$.evalJSON(enc).error_list[0], null, "エラー");
		}
	});
}

(function($) {
	
	$('#gc_infos_p').live('pageinit', function(e,d){

		$('a', $('#gc_infos_p')).on('click', function(e) {
			if ($(this).attr('id') == null) {
				var	params = $('#gc_infos_p').data('params');
				if (params.revonly) {
					$('#results_gc_p').data('params', {params:{'revflg':true}});
				}
			}
		});
		
		$('#preround00', $('#gc_infos_p')).live('click', function(e) {
			var	params = $('#gc_infos_p').data('params');
			var	gcd = params["item"];
			readGCDetailsFromServer(gcd.cc_id);
//			{page:"#edit_round_tee_p", params:{item:gcd}}, moveto
			return true;
		});
		
		$('#reservation', $('#gc_infos_p')).live('click', function(e) {
			var	params=$('#gc_infos_p').data('params');
			var	gcd = params["item"];
			if (!gcd){
				l("gc_infos_p NO DATA");
				return false;
			}
			
			if (gcd.reserve_cc_id > 0) {
//				var	url = $.tmpl(reservation_url, {'id':gcd.reserve_cc_id});
				var	url = reservation_url.replace("${id}", ""+gcd.reserve_cc_id);

				var	cb = ChildBrowser.install();
				if (cb != null) {
//					cb.onLocationChange = function(loc){ self.onLocationChange(loc); };
					cb.onClose = function(){self.onCloseReserveBrowser()};
//					cb.onOpenExternal = function(){self.onOpenExternal();};
					
					cb.showWebPage(url);
				}
			}
			return false;
		});
		
	});
	
	$('#gc_infos_p').live('pagebeforeshow', function(e,d){
		$("#gc_info_list").empty();
	
		var	params=$(this).data('params');
		var	gcd = params["item"];
		if (!gcd){
			l("gc_infos_p NO DATA");
			return false;
		}

		if (params.revonly) {
			$('#preround00', $(this)).hide();
		} else {
			$('#preround00', $(this)).show();
		}
		
		var	txt;
		txt="<table><colgroup span='1' width='25%'/><colgroup span='1' width='75%'/><tr><td>名称</td><td><div style='font-size:1.2em;'>"
			+gcd.cc_name+ "</div></td></tr><tr><td>住所</td><td><div style='font-size:1.0em;'>"
			+gcd.addr+ "</div></td></td></tr><td>電話番号</td><td><a href='telto:"
			+gcd.tel+ "'><div style='font-size:1.1em;'>"
			+gcd.tel+ "</div></a></td></td></tr><td>コース<br/>一覧</td><td><div style='font-size:1.0em;'>";
		for(var i in gcd.course_name_list){
			txt += ""+ gcd.course_name_list[i].course_name +"<br/>";
		}
		txt += "</div></td></tr></table>";


		/*	dl version
		txt="<dl><dt>名称</dt><dd><h2>" +gcd.name+ "</h2></dd><dt>住所</dt><dd><h3>" +gcd.address+ "</h3></dd><dt>電話番号</dt><dd><a href='telto:" +gcd.phone+ "'>" +gcd.phone+ "</a></dd><dt>コース一覧</dt>";
		var	max = gcd.max_course;
		for(var i=0;i<max;i++){
			var	cd = gcd.course_data[i];
			txt+="<dd>"+ cd.name +"</dd>";
		}
		txt += "</dl>";
		*/
		
		$('#gc_info_list').append(txt);

		if (gcd.reserve_cc_id > 0) {
			$('#reservation', $(this)).removeClass('ui-disabled');
			$('#reservation', $(this)).show();
		} else {
			$('#reservation', $(this)).addClass('ui-disabled');
			$('#reservation', $(this)).hide();
		}
	});

}) (jQuery);

/*
 Cordova - Golfer's Dashboard DB
 Copyright (c) 2012 Indi
 */

function movebackToRoundScore() {
	try{
	var	params=$('#sc_edit_info_p').data('params');
	var	rd = params['item'];

	rd.date = $('#scei_round_date').attr('value');
	rd.weather = $('input:checked', $('#scei_weather_f')).val();
	rd.wind = $('input:checked', $('#scei_wind_f')).val();
	
	var previousPage=$.mobile.activePage.data('ui.prevPage');
	$("#"+previousPage.attr('id')).data('params', { 'item':rd });

	history.back();
	
	} catch(e){l("movebackToRoundScore "+e);}
}

(function($) {
	
	$('#sc_edit_info_p').live("pageinit", function(event, data) {
		
		var	pn = $(this);
		
		$('#scei_weather_f', pn).makeWeatherSelector();
		$('#scei_wind_f', pn).makeWindSelector();
		$('#scei_weather_wind', pn).trigger('create');
		
		
		$('#scei_submit', $('#sc_edit_info_form', pn)).on('click', function()
//		$('#sc_edit_info_form', $('#sc_edit_info_p')).on('submit', function()
		{
			try{
				
			if ($('#sc_edit_info_form', $('#sc_edit_info_p')).valid()) {
				movebackToRoundScore();
			}
				
			} catch(e){l(e);}
			
			return false;
		});
		
		$('#scei_cancel', $('#sc_edit_info_form', pn)).on('click', function(){
			return true;	//	falseで画面遷移無し
		});
	});
	
	
	$('#sc_edit_info_p').live("pagebeforeshow", function(event, data) {
		var	pn = $(this);
		var	w = new Weather();
		for(var i = 0; i < w.title.length; i ++) {
			$('#weather_'+i, pn).attr('checked', false).checkboxradio('refresh');
		}
		var	w = new Wind();
		for(var i = 0; i < w.title.length; i ++) {
			$('#wind_'+i, pn).attr('checked', false).checkboxradio('refresh');
		}

		try{
			var	params=$(this).data('params');
			var	rd=params["item"];
			if (rd) {
				pn.data('rounddata', rd);
				$('#scei_gc_name', pn).text(rd.golfcoursename);
				
				$('#weather_'+rd.weather, pn).attr('checked', true).checkboxradio('refresh');
				$('#wind_'+rd.wind, pn).attr('checked', true).checkboxradio('refresh');
				$('#scei_round_date', pn).attr({value:rd.date});
			}
		}catch(e){l("ecei pbs " + e);}

//		$('#scei_round_date').attr({value:'2010-12-30'});
	});
	
	$('#sc_edit_info_p').live("pageshow", function(event, data) {
		$('#sc_edit_info_form').validate({
			rules: {
				scei_round_date: {
					required: true,
					date: false
				}
			}
		});
		
		$.mobile.activePage.data('ui.prevPage',data.prevPage);
		l("prev " + data.prevPage.attr('id'));
	});
	
}) (jQuery);


/*
	Cordova - Golfer's Dashboard DB
Copyright (c) 2012 Indi
 
 http://golfers.iret.co.jp/?p=debug.debug_set_login
 
 */

var	do_not_connect_network = false;

//	var	reserve_root_url = "http://shotbook.jp/reserve_sp.html";
//	var	reservation_url = "http://shotbook.jp/reserve_sp.html?reserve_id=${id}";
var	reservation_url = "http://www.alba.co.jp/sp/club/${id}/";
var	reserve_root_url = "http://www.alba.co.jp/sp/club/";

//	DEBUG API ROOT
//	var	root_url = "http://golfers.iret.co.jp/";	//?p=debug.debug_set_login"
var	root_url = "http://shotbook.jp/";
var	redirecturl = "http://shotbook.jp/success.html";



//	?p=
var	login_cmd = "api.set_login";
var	login_opt = [ "return_url" ];
var	golfcpurse_list_cmd = "api.get_cc_list";
var	golfcpurse_list_opt = [ "keyword", "latitude", "longitude", "prefcode", "limit", "offset", "ccid" ];
var	golfcourse_info_cmd = "api.get_cc_detail";
var	golfcourse_info_opt = [ "ccid" ];
var	user_info_get_cmd = "api.get_kihon";
var	user_info_opt = [];
var	user_info_update_cmd = "api.update_kihon";
var	golfriend_list_cmd = "api.get_friend_list";
var	roundscore_register_cmd = "api.regist_round";
var	roundscore_register_opt = [ "cc_id", "course_id", "playdate", "weather", "wind" ];	//YYYYMMDD
var	roundscore_upload_cmd = "api.update_round";
var	roundscore_upload_opt = [ "round_id", "score_data", "course_id", "playdate", "weather", "wind" ];	//YYYYMMDD
var	roundscore_info_cmd = "api.get_round_detail";
var	roundscore_info_opt = [ "round_id" ];
var	roundscore_list_cmd = "api.get_round_list";
var	roundscore_updatelist_cmd = "api.get_round_update_list";
var	roundscore_delete_cmd = "api.delete_round_data";
var	roundscore_delete_opt = [ "round_id" ];
var	analysis_get_cmd = "api.get_total_score";
var	gear_get_cmd = "api.get_gear";
var	facebook_post_cmd = "api.set_fb_post";
var	facebook_post_opt = [ "comment", "image", "status" ];	//	0:1.
var	facebook_post_get_cmd = "api.get_fb_post";
var	event_register_cmd = "api.regist_event";
var	event_register_opt = [ "facebookids", "start_time", "end_time", "title", "comment" ];
var	event_list_cmd = "api.get_event_list";
var	event_inv_get_cmd = "api.get_event_request_list";
var	event_info_get_cmd = "api.get_event_detail";
var	event_info_get_opt = [ "event_id" ];
var	event_inv_ans_cmd = "api.send_event_request_confirm";
var	event_inv_ans_opt = [ "event_id", "status", "comment" ];
var	event_exec_cmd = "api.send_event_confirm";
var	event_exec_opt = [ "event_id", "status", "comment" ];
var	facebook_timeline_get_cmd = "api.get_timeline";
var	facebook_timeline_get_opt = [ "limit", "offset", "date_from", "date_to" ];
var	news_get_cmd = "api.get_news";
var	ranking_get_cmd = "api.get_ranking";

var	logout_cmd = "api.set_logout";
var	logoutall_cmd = "api.set_logout_all";

var	scoreanalysis_preget_cmd = "api.get_score_aggregate_data";
var	scoreanalysis_get_cmd = "api.get_score_aggregate";

var	limit_offset_opt = [ "limit", "offset" ];


function checkOkNg(enc) {
	var result = $.evalJSON(enc).result;
	if (result == 1) {
		var	errors = $.evalJSON(enc).error_list;
		for(var i in errors) {
			l("ERROR LISTs " +i+ " : " +errors[i]);
			if (errors[i] == "認証に失敗しました") {
				fblogined = false;
			}
		}
		return false;
	} else if (result == 0) {
		return true;
	} else {
		return null;
	}
}

function getRoundDataHistoryFromServer(options) {
	l("getRoundDataHistoryFromServer "+options);
	try {
		if (fblogined) {
			options.p = roundscore_list_cmd;
			l($.JSONstr(options));
			$.getJSON(root_url, options, callbackGetRoundDataHistoryFromServer);
		} else {
			$('#rl_readmore_btn', $('#rounds_list_p')).button('disable');
			$('#rl_readmore_div', $('#rounds_list_p')).slideUp();
			$('#rl_loading_div', $('#rounds_list_p')).slideUp();
			$.mobile.hidePageLoadingMsg();
		}
	} catch(e){l(e);}
	return false;
}

function callbackGetRoundDataHistoryFromServer(response) {
	var	enc=$.toJSON(response);
	l(enc);
	if (checkOkNg(enc)) {
		try {
			var	needcheck=false;
			var que=$('#rounds_list_p').data('localque');
			if (que) {
				needcheck=true;
			}
			var	count = parseInt($.evalJSON(enc).round_count);
			var	position = parseInt($.evalJSON(enc).position);

			var	shws = 0;
			var	vals = new Array();

			var	htmtmp = '<tr id="rdsb_${id}"><td class="sh_date puttnum"><span class="rlp_date">${date}</span><span class="rlp_del">削除</span></td><td class="sh_cname">${cname}</td><td class="sh_num puttnum">${score}</td><td class="sh_num">${putt}</td></tr>';
//			var	htmtmp = '<li class="wideli"><a href="#" id="rdsb_${id}" class="ui-link-inherit"><h3 class="ui-li-heading">${cname}</h3><p class="ui-li-desc"><dl id="compact" style="font-size:0.7em;"><dt id="compact">ラウンド日</dt><dd>${date}</dd><dt id="compact">更新日</dt><dd>${update}</dd></dl><span style="font-size:.7em;">サーバデータ</span></p></a><a href="#" id="rdsd_${id}">delete</a></li>';

			var	jmp;
			var	round_list = $.evalJSON(enc).round_list;
			for(var i in round_list) {
				var	item = round_list[i];
				var	enc2 = $.toJSON(item);
				var	rid = $.evalJSON(enc2).round_id;
			
				jmp = false;
				if (needcheck) {
					for(var x in que) {
						if (rid == que[x].round_id) {
							jmp = true;
							break;
						}
					}
				}
				shws ++;
				if (jmp) {
					continue;
				}
				var	score = $.evalJSON(enc2).shot_total;
				var	putt = $.evalJSON(enc2).putt_total;
				if (!score) {
					score = "-";
				}
				if (!putt) {
					putt = "-";
				}
				var	tmp = $.evalJSON(enc2).playdate;
//				var	date = ""+tmp.substr(0,4)+"-"+tmp.substr(4,2)+"-"+tmp.substr(6);
				var	date = tmp.substr(2,2)+"'"+tmp.substr(4,2)+"."+tmp.substr(6);
				vals.push({"id":rid, "date":date,
			//		"update":$.evalJSON(enc2).updatetime,
					"cname":$.evalJSON(enc2).cc_name,
					"score":score, "putt":putt
				});
			}
			
			l("CNT   "+count);
			l("SHOWS "+shws);
			l("POS   "+position);
			$('#rl_loading_div').slideUp();
			if (position + shws >= count) {
				l("CLOSE BUTTON DIV");
				$('#rl_readmore_btn', $('#rounds_list_p')).button('disable');
				$('#rl_readmore_div', $('#rounds_list_p')).slideUp();
			} else {
				l("OPEN BUTTON DIV");
				$('#rl_readmore_btn', $('#rounds_list_p')).button('enable');
				$('#rl_readmore_div', $('#rounds_list_p')).slideDown();
			}
			var	c = 0;
			$('#rd_list').children().each(function(e){
				c ++;
			});
			if (c == 0) {
				var	li_head = "<colgroup span='1' width='18%'></colgroup><colgroup span='1' width='56%'></colgroup><colgroup span='1' width='13%'></colgroup><colgroup span='1' width='13%'></colgroup><tr class='odd'><td style='font-size:0.6em;text-align:center;' class='puttnum'><span class='rlp_date'>プレイ日</span><span class='rlp_del'>-</span></td><td style='font-size:0.6em;text-align:center;'>コース名</td><td style='font-size:0.6em;text-align:center;' class='puttnum'>スコア</td><td style='font-size:0.6em;text-align:center;'>パット</td></tr>";
				
				l(" THERE IS NO LIHEAD ");
				$('#rd_list', $('#rounds_list_p')).append(li_head);
			} else {
				l(" THERE IS LIHEAD ");
			}
			$.tmpl(htmtmp, vals).appendTo($('#rd_list'));

            $("span.rlp_del", $('#rounds_list_p')).hide();
            $("span.rlp_date", $('#rounds_list_p')).show();
            
//			$('#rd_list', $('#rounds_list_p')).listview('refresh');
			$('#rd_list tr', $('#rounds_list_p')).each(function (i) {
				$(this).removeClass("even").removeClass("odd");
				if (i%2==0)
				$(this).addClass("even");
				else
				$(this).addClass("odd");
			});
			
			$('#rounds_list_p').data('rl_shw', shws);
			$('#rounds_list_p').data('rl_cnt', count);
			$('#rounds_list_p').data('rl_pos', position);
		} catch(e){l(e);}
	} else {
		navigator.notification.alert("ネットワークエラー\n"+$.evalJSON(enc).error_list[0], null, "エラー");
		$('#rl_readmore_btn', $('#rounds_list_p')).button('disable');
		$('#rl_readmore_div', $('#rounds_list_p')).slideUp();
		$('#rl_loading_div', $('#rounds_list_p')).slideUp();
	}
	$.mobile.hidePageLoadingMsg();
}


function getMoreGolfriendList() {
	var	_get = $('#golfriend_list_p').data("sum");
	var	ofs = _get;

	var	_ofs = $('#golfriend_list_p').data("ofs");
	var	_max = $('#golfriend_list_p').data("max");
	
	var	o = parseInt(_ofs);
	var	m = parseInt(_max);
	var	lmt;
	if (o + 30 < m) {
		lmt = 30;
	} else {
		lmt = m - o;
	}
	
	var	flag = $('#golfriend_list_p').data('shotbook_only_flag');
	var	slab = $('#golfriend_list_p').data('selectable');
	getGolfriendList(flag, slab, {'offset':ofs, 'limit':lmt});
}

function getGolfriendList(sb_flag, selectable, options) {
	l("getGolfriendList");
	try {
		nowDownloading();

		var	opt = { "p":golfriend_list_cmd };
		
		if (options) {
			for(var i in limit_offset_opt) {
				var	key = limit_offset_opt[i];
				if (options[key]) {
					opt[key] = options[key];
				}
			}
		}
		
		if (!opt['limit']) {
			opt['limit'] = 30;
		}
		if (!opt['offset']) {
			opt['offset'] = '0';
		}
		if (sb_flag){
			opt['is_shotbook'] = 1;
		}
		
		l($.JSONstr(opt));
		$.getJSON( root_url, opt, function(response) {
			callbackgetGolfriendList(sb_flag, selectable, response);
		});
	} catch(e){l(e);}
}

function callbackgetGolfriendList(flag, select, response) {
	try {
	l($.JSONstr(response));
	
	var	enc = $.toJSON(response);
	if (checkOkNg(enc)) {
		// to db addGolfriendData
		//	getGolfriendData
		var	pos = parseInt($.evalJSON(enc).position);
		var	cnt = parseInt($.evalJSON(enc).golf_friend_count);
		var	gfl = $.evalJSON(enc).golf_friend_list;

		var	pn = $('#golfriend_list_p');
		pn.data("ofs", pos);
		pn.data("max", cnt);
		
		if (pos == 0) {
			pn.removeData("gf_downloaded");
			pn.data("gf_downloaded", gfl);
		} else {
			var	_old = pn.data("gf_downloaded");
			pn.data("gf_downloaded", _old.concat(gfl));
		}
		
		l("GFL pos "+pos+" cnt "+cnt);
		
		var	icononoff = " data-icon='false'";
		var	txt = "";
		var	c=0;
		var	s=0;
		try {
			for(var i in gfl) {
				c ++;
				if (flag) {	//	only shotbook user.
					if (!gfl[i].shotbook_id) {
						continue;
					}
				}
				
				var	url;
				
				var	user_id = gfl[i].facebook_id;
				var	name = gfl[i].name;
				var	hcp = gfl[i].handicap;
				
				if (!name) {
					name= "no name";
				}
				if (user_id) {
					url = "http://graph.facebook.com/"+user_id+"/picture";
				} else {
					url = "images/Player_silhouette_man.png";
				}
				
				if (select) {	//	SELECTABLE
					var	sbf = "facebook";
					if (gfl[i].shotbook_id) {
						sbf = "ゴル友";
					}
					
					if (!hcp) {
						if (sbf == "") {
							hcp= "<br/>&nbsp;";
						} else {
							hcp = "<br/><div style='font-size:0.8em;'>"+sbf+"</div>";
						}
					} else {
						hcp = "<br/><div style='font-size:0.8em;'>H.C. " +hcp+ " " +sbf+ "</div>";
					}
					txt += "<li"+icononoff+" style='min-height:40px;padding:2px;'><input type='checkbox' id='fl_cb_" +user_id+ "' data-iconpos='right' /><label style='margin:0px;' for='fl_cb_"+user_id+"'>"
					+ "<div style='float:left; margin-right:1em;'><img src='" +url+ "' style='width:32px;height:32px;' /></div><p>" +name+""+hcp+ "</p><span style='clear:both;' />"
//					+ "<table><colgroup span='1' width='25%'></colgroup><colgroup span='1' width='75%'></colgroup><tr><td><img src='" +url+ "' style='width:32px;height:32px;' /></td><td>" +name+""+hcp+ "</td></tr></table>"
					+ "</label></li>";				} else {	//	ONLY SHOWING (WILL JUMP TO USER PAGEs?)
					if (!hcp) {
						hcp= "";
					} else {
						hcp = "<div style='font-size:0.8em;'>H.C. " +hcp+ "</div>";
					}
					txt += "<li"+icononoff+" style='min-height:58px;'><a href='#' onclick='javascript:showGolfriend(\"" +user_id+ "\");'><img src='" +url+ "' style='width:32px;height:32px;left:4px;' class='ui-li-icon' />" +name+""+hcp+ "</a></li>";
				}
				s ++;
			}
			var	sum = pos + c;	//	showed item count
			var	shw = pos + s;	//	showed item count
			l(" pos "+pos+" max "+cnt + " sum "+sum +" shw "+shw);
			
			pn.data("shw", ''+shw);
			pn.data("sum", ''+sum);
			
			if (flag) {	//	only shotbook user
				$('#gfl_readmore_btn', $('#golfriend_list_p')).parents('.ui-btn').hide();
				if (cnt > shw) {
					nowDownloading();
					getMoreGolfriendList();
				} else {
					nowEnableDownloading();
				}
			} else {
				nowEnableDownloading();	//	hide loading icon area
				if (cnt > sum) {
					$('#gfl_readmore_btn', $('#golfriend_list_p')).button('enable');
					$('#gfl_readmore_btn', $('#golfriend_list_p')).parents('.ui-btn').show();
					$('#gfl_readmore_btn', $('#golfriend_list_p')).text("もっと読み込む");
				} else {
					$('#gfl_readmore_btn', $('#golfriend_list_p')).parents('.ui-btn').hide();
				}
			}
			/*
			if (cnt > sum) {
				var	requested_page = $('.ui-page-active').attr('id');
				l("REQ PAGE "+requested_page);
				if (requested_page == 'golfriend_list_p') {
					getMoreGolfriendList();
				}
			} else {
				nowEnableDownloading();
			}
			*/
		} catch(e){l("golfriend list make "+e);}

		if (pos == 0) {
			$('#golfriends_list', $('#golfriend_list_p')).empty();
		}
		$('#golfriends_list', $('#golfriend_list_p')).append(txt);
/*		if (select) {
			$('input[type="checkbox"]', $('#golfriends_list', $('#golfriend_list_p'))).attr("checked",false).checkboxradio();
		}
		$('#golfriends_list', $('#golfriend_list_p')).listview('refresh').listview();	*/
		if (select) {
			$('input[type="checkbox"]', $('#golfriends_list', $('#golfriend_list_p'))).attr("checked", false).checkboxradio();
			$('input[type="checkbox"]', $('#golfriends_list', $('#golfriend_list_p'))).checkboxradio('refresh');
		}
		$('#golfriends_list', $('#golfriend_list_p')).trigger('create').listview('refresh');
	}
	} catch(e){l(e);}
}



function deleteRoundDataFromServer(round_id) {
	l("deleteRoundDataFromServer");
	try {
		var	options = { "p":roundscore_delete_cmd, "round_id":round_id };
		
		l("options "+ $.JSONstr(options));
		$.getJSON(root_url, options, function(response) {
			var	enc = $.toJSON(response);
			l(enc);
			if (checkOkNg(enc)) {
				navigator.notification.alert("正常に削除されました。", null, "成功");
				resetHistorySearch();
			} else {
				navigator.notification.alert("ネットワークエラー\n"+$.evalJSON(enc).error_list[0], null, "エラー");
			}
		});
	} catch(e){l(e);}
}


function loadRoundDataFromServer(round_id) {
	l("loadRoundDataFromServer");
	try {
		var	options = { "p":roundscore_info_cmd, "round_id":round_id };
		
		l("options "+ $.JSONstr(options));
		$.getJSON(root_url, options, function(response) {
			var	enc = $.toJSON(response);
			l(enc);
			if (checkOkNg(enc)) {
				var	sd = $.evalJSON(enc).score_data;
				var	obj = $.parseJSON(sd);
				
				l(">>> "+$.JSONstr(obj));
				
				var	event = {data:{page:'#round_score_p', params:{"item":obj, "show_in":false}}};
				moveto(event);
				
			} else {
				navigator.notification.alert("ネットワークエラー"+$.evalJSON(enc).error_list[0], null, "エラー");
			}
		});
	} catch(e){l(e);}
}


function getPersonalInformation() {
	l("getPersonalInformation");

	var	dd = new Date();
	var	today_tic = dd.getTime();
	var	check_tic = $('#boot').data('check_pi_time');
	if (check_tic) {
		var	dif = today_tic - check_tic;
		l("DIFF "+dif);
		if (dif < 3600000) {	//1hour
			return;
		} 
	}
	
	var	opt = { "p":user_info_get_cmd };
	$.getJSON( root_url, opt, callbackgetPersonalInformation);
}

function callbackgetPersonalInformation(response) {
	l("callbackgetPersonalInformation");
	try {
		var	enc = $.toJSON(response);
		l("response "+enc);
		if (checkOkNg(enc)) {
			var	dd = new Date();
			var	today_tic = dd.getTime();
			$('#boot').data('check_pi_time', today_tic);
			
			var	user_id = $.evalJSON(enc).user_id;
			var	sns_id = $.evalJSON(enc).sns_id;		//	facebook_id
			var	sns_name = $.evalJSON(enc).sns_name;
			var	sns_icon = $.evalJSON(enc).sns_icon;	//	url?
			
			//	can edit
			var	birthday = $.evalJSON(enc).birthday;
			var	sex = $.evalJSON(enc).sex;				//	1,2
			var	address = $.evalJSON(enc).address;
			var	mailaddr = $.evalJSON(enc).mailaddr;
			var	tel = $.evalJSON(enc).tel;
			var	my_height = $.evalJSON(enc).my_height;
			var	my_weight = $.evalJSON(enc).my_weight;
			var	handicap = $.evalJSON(enc).handicap;
			var	head_speed = $.evalJSON(enc).head_speed;
			var	member_cc_id = $.evalJSON(enc).member_cc_id;
			var	golf_start_date = $.evalJSON(enc).golf_start_date;
			
			//	read only
			var	best_score = $.evalJSON(enc).best_score;
			var	average = $.evalJSON(enc).average;
			var	putting_average = $.evalJSON(enc).putting_average;
			var	golf_friend_count = $.evalJSON(enc).golf_friend_count;
			
			var	matcher = {
				"pi_myname":"sns_name",
				"pi_birthday":"birthday",
				"pi_mailaddr":"mailaddr",
				"pi_phone":"tel",
				"pi_sex":"sex",
				"pi_height":"my_height",
				"pi_weight":"my_weight",
				"pi_handicap":"handicap",
				"pi_startday_golf":"golf_start_date",
				"pi_golfcourse":"member_cc_id",
				"pi_headspeed":"head_speed",
				"pi_prefecture":"address",
				
				"pi_best_score":"best_score",
				"pi_average":"average",
				"pi_putting_average":"putting_average",
				"pi_golf_friend_count":"golf_firend_count",
				
				"pi_user_id":"user_id",
				"pi_sns_id":"sns_id",
				"pi_sns_icon":"sns_icon"
			};
			
			var	json = getDataFromLocal("mydata");
			l("local "+json);
			var	myobj=$.parseJSON(json);
			
			for(var i in matcher) {
				var	j = matcher[i];
				
				if (j == "sns_name") {
					if ($.evalJSON(enc)[j]) {
						myobj.pi_myname = $.evalJSON(enc)[j];
					} else {
						l("NO DATA:"+j);
					}
				} else if ((j == "best_score") || (j == "average") || (j == "putting_average") || (j == "golf_firend_count")) {
					var	value = $.evalJSON(enc)[j];
					if (value) {
						myobj[i] = value;
					} else {
						myobj[i] = "-";
					}
				} else {
					var	value = $.evalJSON(enc)[j];
					if ( value ) {
						if ( j == "birthday" || j == "golf_start_date" ) {
							var tmp = value.replace(/\//g, "-");
							value = tmp;
						}
						myobj[i] = value;
					}
				}
			}
			myobj.pi_from_server = "yes";
			
			
			var	jsontxt = $.toJSON(myobj);
			l("new "+jsontxt);
			
			if (setDataToLocal("mydata", jsontxt)) {
				var	current_id=$('.ui-page-active').attr('id');
				l("CURRENT PAGE "+current_id);
				if (current_id == "home") {
					$('#home_best_score', $('#home')).text(myobj.pi_best_score);
					$('#home_ave_score', $('#home')).text(myobj.pi_average);
					$('#home_handicap', $('#home')).text(myobj.pi_handicap);
					$('#home_ave_putt', $('#home')).text(myobj.pi_putting_average);
				} else if (current_id == "menu") {
					$('#menu_best_score', $('#menu')).text(myobj.pi_best_score);
					$('#menu_ave_score', $('#menu')).text(myobj.pi_average);
					$('#menu_handicap', $('#menu')).text(myobj.pi_handicap);
					$('#menu_ave_putt', $('#menu')).text(myobj.pi_putting_average);
				}
			} else {
				l("DEF DATA CANNOT UPDATE");
				navigator.notification.alert("ローカル保存領域でエラーが発生しました。", null, "エラー");
			}
		}
	} catch(e){l(e);}
}


function getGolfCourseInfo(ccid) {
	var	opt = {"p":golfcourse_info_cmd};
	if (ccid) {
		opt["ccid"] = ccid;
	}

	l($.JSONstr(opt));
	
	$.getJSON( root_url, opt, callbackgetGolfCourseInfo );
}

function callbackgetGolfCourseInfo(response) {
	var	enc = $.toJSON(response);
	if (checkOkNg(enc)) {
		var cc_id = $.evalJSON(enc).cc_id;
		var cc_name = $.evalJSON(enc).cc_name;
		var addr = $.evalJSON(enc).addr;
		var tel = $.evalJSON(enc).tel;
		var latitude = $.evalJSON(enc).latitude;
		var longitude = $.evalJSON(enc).longitude;
		var course_count = $.evalJSON(enc).course;
		var course_list = $.evalJSON(enc).course_list;
		var	updatetime = $.evalJSON(enc).updatetime;
		
		var	gcd = new GolfCourseData();
		gcd.id = cc_id;
		gcd.name = cc_name;
		gcd.updatetime= updatetime;
		gcd.address = addr;
		gcd.phone=tel;
		gcd.max_course=course_count;
		
		for(var i in course_list) {
			var	course = course_list[i];
			
			var	enci = $.toJSON(course);
			var	course_id = $.evalJSON(enci).course_id;
			var	course_name = $.evalJSON(enci).course_name;
			var	course_text = $.evalJSON(enci).course_text;
			
			var	tmp_course = new CourseData();
			tmp_course.id = course_id;
			tmp_course.name = course_id;
			tmp_course.desc = course_text;
			
			//
			l("THIS IS NOT COMPLETED... WE NEEDS GOLF COURSE DATA");
			//
			
			gcd.course_data.push(tmp_course);
		}

	}
}




function getFriendsUpdate() {
	l("getFriendsUpdate");
	try {
	
	var	tl_cnt = $('#home').data('fu_cnt');	//	カウント？
	var	tl_pos = $('#home').data('fu_pos');	//	取ってきたポジション
	var	tl_shw = $('#home').data('fu_shw');	//	表示中

	var	reqo = 0;
	var	reqc = 15;
	var	show = false;
	
	if (tl_cnt) {
		if (tl_cnt <= tl_shw) {
			l("already show max");
			$('#fu_readmore_btn', $('#home')).parents('.ui-btn').hide();
			$('#fu_now_loading_div', $('#home')).slideUp();
			return;
		} else {
			reqo = tl_shw + 1;
		}
	} else {
		reqo = 0;
	}
	
	if (online && fblogined) {
		$.mobile.showPageLoadingMsg("b", "みんなの近況");
		l("GET みんなの近況 OFFSET "+reqo+" LIMIT "+reqc);
		$.getJSON(root_url, { "p":facebook_post_get_cmd, "limit":reqc, "offset":reqo }, parseFriendsUpdate );
	} else {
		l("online "+online+" fb "+fblogined);
	}
	}catch(e){l(e);}
}

function parseFriendsUpdate(response) {
	l("parseFriendsUpdate "+response);
	try {
		var	enc = $.toJSON(response);
		l("enc "+enc);
		var result = $.evalJSON( enc ).result;
		var	tlcnt, orgcnt;
		var	tlpos, orgpos, orgshw;
		var	tldsc, orgdsc;
		switch(result) {
			case 0:
			tlcnt = $.evalJSON( enc ).timeline_count;
			tlpos = $.evalJSON( enc ).position;
			tldsc = $.evalJSON( enc ).timeline_list;
			
			orgcnt = $('#home').data('fu_cnt');
			if (orgcnt) {
				orgpos = $('#home').data('fu_pos');
				orgshw = $('#home').data('fu_shw');
				
				if (tlcnt != orgcnt) {
					l("どうすんべ！ new "+tlcnt+" old "+orgcnt);
				}
			} else {
				$('#friendsupdate_list li').not('[data-role="list-divider"]').remove();
			}
			$('#home').data('fu_cnt', tlcnt);
			$('#home').data('fu_pos', tlpos);

			$('#friendsupdate_list').append(makeTextFromFUDataList(tldsc));
			$('#friendsupdate_list').listview('refresh');
			
			var	tmp = $('#home').data('fu_shw');
			if (tmp < tlcnt) {
				$('#fu_readmore_btn', $('#home')).parents('.ui-btn').show();
			} else {
				$('#fu_readmore_btn', $('#home')).parents('.ui-btn').hide();
			}
			break;
			
			case 1:
			l("error ");
			
			$('#friendsupdate_list li').not("[data-role='list-divider']").remove().append(makeTextFromErrorList($.evalJSON(enc).error_list));
			$('#fu_readmore_btn', $('#home')).parents('.ui-btn').show();
			break;
			
			default:
			l("ERROR "+result );
			break;
		}
		$('#fu_now_loading_div', $('#home')).slideUp();
	} catch(e){l(e);}
	
	$.mobile.hidePageLoadingMsg();
}



function makeTextFromFUDataList(obj) {
	var	txt="";
	try {
	var	c=0;
	for(var i in obj) {
		var	item = obj[i];
		var	enc = $.toJSON(item);

		var	post_id = $.evalJSON(enc).post_id;
		var	facebook_id = $.evalJSON(enc).facebook_id;
		var	url ="images/Player_silhouette_man.png"; 
		if (facebook_id) {
			url = "http://graph.facebook.com/"+facebook_id+"/picture";
		}
		
		var	img = $.evalJSON(enc).photo;
		if (!img) {
			img = "";
		}
		var	img2 = $.evalJSON(enc).photo_thumb;
		if (!img2) {
			img2 = "";
		}

		var	comment=$.evalJSON(enc).comment;
		if (!comment) {
			comment = "";
		}

		if (post_id) {
			txt += '<li style="box-shadow:4px 4px 4px rgba(0,0,0,0.4);" id="'+post_id+'">';
		} else {
			txt += '<li style="box-shadow:4px 4px 4px rgba(0,0,0,0.4);">';
		}
		txt +='<div style="margin:0;padding:0px;" class="forTap" id="'+post_id+'">'
		
		+ '<div style="float:left; margin-right:0.8em;"><img src="'+url+'" style="width:32px;height:32px;" /></div>'
		+ '<div style="font-size:1.1em;font-weight:600;">' +$.evalJSON(enc).name+ '</div>'
		+ '<div style="color:gray;font-size:1.0em;font-weight:300;">' +$.evalJSON(enc).date+ '</div>'

		+ '</div>'
		
		+ '<span style="clear:both;"/>'
		+ '<div style="line-height:0.5em"><HR WIDTH="95%"></div>';
		
		if (comment.length > 0) {
			txt += '<div style="font-size:1.1em;" class="timeline_description2"><p>' +comment+ '</p></div>';
		}
		if (img.length > 0) {
			txt += '<div style="width:100%;text-align:center;">'
			+ '<img src="'+img+'" style="vertical-align:middle; width:auto; max-width:100%;"/>'
			+ '</div>'
			+ '</li>';
		}
		c ++;
	}
	
	var	orgshw = $('#home').data('fu_shw');
	if (orgshw) {
		orgshw += c;
	} else {
		orgshw = c;
	}
	$('#home').data('fu_shw', orgshw);
	
	} catch(e){l(e);}
	return txt;
}



function getTimeline() {
	l("getTimeline");
	try {
		var	tl_cnt = $('#home').data('tl_cnt');
		var	tl_pos = $('#home').data('tl_pos');
		var	tl_shw = $('#home').data('tl_shw');
		var	reqo = 0;
		var	reqc = 15;
		var	show = false;
		
		if (tl_cnt) {
			if (tl_cnt <= tl_shw) {
				l("already show max");
				$('#tl_readmore_btn', $('#home')).parents('.ui-btn').hide();
				$('#tl_now_loading_div', $('#home')).slideUp();
				return;
			} else {
				reqo = tl_shw + 1;
			}
		} else {
			reqo = 0;
		}
		
		if (online && fblogined) {
			$.mobile.showPageLoadingMsg("b", "ニュースを読み込み中");
			
			l("GET TIMELINE OFFSET "+reqo+" LIMIT "+reqc);
			$.getJSON(root_url, { "p":facebook_timeline_get_cmd, "limit":reqc, "offset":reqo }, parseTimeline );
		} else {
			l("online "+online+" fb "+fblogined);
		}
	} catch(e){l(e);}
}

function makeTextFromErrorList(obj){
//	var	obj = $.parseJSON(json);
	var	txt = "<dl>";
	for(var i in obj) {
		txt += "<dt>"+i+"</dt><dd>"+obj[i]+"</dd>";
	}
	txt += "</dl>";
	return txt;
}

function makeTextFromDataList(obj) {
	var	txt = "";
	try {
		var	c=0;
		for(var i in obj) {
			var	item = obj[i];
			var	enc = $.toJSON(item);
			var	img = $.evalJSON(enc).photo;
			if (!img) {
				img="";
			} else {
				img=img.replace(/_s./, "_o.");
			}
			var	post_id = $.evalJSON(enc).post_id;
			var	sp = post_id.split("_");
			var	url = "images/circle_red.png";
			if (sp[0].length > 0) {
				url = "http://graph.facebook.com/"+sp[0]+"/picture";
			}

			
			var	title = $.evalJSON(enc).title;
			if (!title) {
				title = "";
			} else {
				title = title.replace(/\n|\r\n/g,"<br/>")
			}
			
			/*
			var	comment = $.evalJSON(enc).comment;
			if (!comment) {
				comment = "";
			}
			*/
			/*
			var	like_count = $.evalJSON(enc).like_count;
			if (!like_count) {
				like_count = "0";
			}
			*/

			txt += '<li style="box-shadow:4px 4px 4px rgba(0,0,0,0.4);" id="'+post_id+'">'
			
			+ '<div style="margin:0;padding:0px;" class="forTap" id="'+post_id+'">'
			
			+ '<div style="float:left; margin-right:0.8em;"><img src="'+url+'" style="width:32px;height:32px;" /></div>'
			+ '<div style="font-size:1.1em;font-weight:600;">' +$.evalJSON(enc).name+ '</div>'
			+ '<div style="color:gray;font-size:1em;font-weight:300;">' +$.evalJSON(enc).date+ '</div>'
			
			+ '</div>'
			
			+ '<span style="clear:both;"/>'
			+ '<div style="line-height:0.5em"><HR WIDTH="95%"></div>';
			
			if (title.length > 0) {
				txt += '<div style="font-size:1.1em;" class="timeline_description2"><p>' +title+ '</p></div>';
			}
			/*
			if (comment.length > 0) {
				txt += '<div style="font-size:0.75em;border:1px solid yellow;" class="timeline_description2"><p>' +comment+ '</p></div>';
			}
			 */
			if (img.length > 0) {
				txt += '<div style="width:100%;text-align:center;">'
				+ '<img src="'+img+'" style="vertical-align:middle; width:auto; max-width:100%;"/>'
				+ '</div>'
			}
			txt += '</li>';
			c ++;
		}
		
		var	orgshw = $('#home').data('tl_shw');
		if (orgshw) {
			orgshw += c;
		} else {
			orgshw = c;
		}
		$('#home').data('tl_shw', orgshw);
		
	} catch(e){l(e);}
	
	return txt;
}

function parseTimeline(response) {
	l("parseTimeline "+response);
	//	obj array
	var	enc = $.toJSON(response);
	l("enc "+enc);
	try {
		var result = $.evalJSON( enc ).result;
		var	tlcnt, orgcnt;
		var	tlpos, orgpos, orgshw;
		var	tldsc, orgdsc;
		switch(result) {
			case 0:
				tlcnt = $.evalJSON( enc ).timeline_count;
				tlpos = $.evalJSON( enc ).position;
				tldsc = $.evalJSON( enc ).timeline_list;

				orgcnt = $('#home').data('tl_cnt');
				if (orgcnt) {
					orgpos = $('#home').data('tl_pos');
					orgshw = $('#home').data('tl_shw');

					if (tlcnt != orgcnt) {
						l("どうすんべ！ new "+tlcnt+" old "+orgcnt);
					}
				} else {
					$('#timeline_list').empty();
				}
				
				$('#home').data('tl_cnt', tlcnt);
				$('#home').data('tl_pos', tlpos);

				$('#timeline_list').append(makeTextFromDataList(tldsc));
				$('#timeline_list').listview('refresh');
				
				$('#timeline_list').find('p').expander({
					widow:1,
					slicePoint:200,
					preserveWords:false,
					expandText:'[つづきを読む]',
					userCollapseText:'[隠す]' });
				
				var	tmp = $('#home').data('tl_shw');
				if (tmp < tlcnt) {
					$('#tl_readmore_btn', $('#home')).parents('.ui-btn').show();
				} else {
					$('#tl_readmore_btn', $('#home')).parents('.ui-btn').hide();
				}
				break;
			
			case 1:
				l("ERROR ");
				$('#timeline_list').empty().append(makeTextFromErrorList($.evalJSON(enc).error_list));
				$('#tl_readmore_btn', $('#home')).parents('.ui-btn').show();
				break;
			
			default:
				l("UNKNOWN ERROR "+result );
				break;
		}
		
		$('#tl_now_loading_div', $('#home')).slideUp();
	} catch(e){l(e);}
	
	$.mobile.hidePageLoadingMsg();

}



function checkConnection() {
	var networkState = navigator.network.connection.type;
	
	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';
	
	l("Connection type: " + states[networkState]);
}

var online = navigator.onLine || false;
//	var	online = false;
var	fblogined = false;

function checkOnline() {
	try {
		checkConnection();
		if (online) {
			l("online ");
		}
	}catch(e){l(e);}
}

function loginFacebook() {
	l("loginFacebook");
	if (do_not_connect_network) {
		l("DO NOT CONNECT NETWORK");
		return;
	}
	if (online) {
		$.mobile.showPageLoadingMsg("b", "facebook login");
		try{
			$.getJSON(root_url, { "p":login_cmd, "return_url":redirecturl }, function(response) { parseLogin(response); });
		}catch(e){l(e);}
	} else {
		navigator.notification.alert("ネットワークにアクセス出来ません。", null, "報告");
	}
}


function onCloseBrowser() {
	l("onCloseBrowser!!");
	
	$.mobile.changePage("#home");
	return false;	
}

function onOpenExternal() {
	l("onOpenExternal!!");
	return false;
}

function onLocationChange(newLoc) {
	$.mobile.hidePageLoadingMsg();

	var	str = newLoc.substring(0,19);
	
	if (str == "http://shotbook.jp/")
//	if (newLoc.indexOf( redirecturl ) == 0)
	{	//	リダイレクトURL
		fblogined = true;
		try {
			getPersonalInformation();
			
			window.plugins.childBrowser.close();
		} catch(e){l(e);}
	} else {
		fblogined = false;
		l("newLoc " + newLoc);
		$.mobile.hidePageLoadingMsg();
	}
}

function parseLogin(jsonStr) {
	l("parseLogin");
	var	parsedJSON;
	try {
		if (typeof jsonStr === 'string') {
			parsedJSON = JSON.parse(jsonStr);
		}
		else { // maybe input object
			parsedJSON = jsonStr;
		}
	} catch(e) { parsedJSON = { "parse error":e}; }
/*
	for(var i in parsedJSON) {
		l(i + " : "+parsedJSON[i]);
	}
*/
	if (parseInt(parsedJSON["result"]) == 0) {
		l("REQ OK");
		
		if (parseInt(parsedJSON["is_login"]) == 0) {
			var	url=parsedJSON["oauth_url_facebook"];
			l("NOT LOGIN, OK\n" + url);

//			window.plugins.childBrowser.showWebPage(url+"&display=touch", { showLocationBar: true });

			var	cb = ChildBrowser.install();
			if (cb != null) {
				cb.onLocationChange = function(loc){ self.onLocationChange(loc); };
				cb.onClose = function(){self.onCloseBrowser()};
				cb.onOpenExternal = function(){self.onOpenExternal();};
			
				cb.showWebPage(url+"&display=touch");
			}

		} else {
			l("ALREADY LOGINED");

			fblogined = true;
			getPersonalInformation();
			
			$.mobile.changePage("#home");
		}
	}
}






function logoutFacebook() {
	$.mobile.showPageLoadingMsg("b", "facebook logout");
	l("options "+$.JSONstr({ "p":logoutall_cmd, "return_url":redirecturl }));
	$.getJSON(root_url, { "p":logoutall_cmd, "return_url":redirecturl }, parseLogoutAll );
}

function onFBCloseBrowser() {
	l("onFBCloseBrowser!!");

	//	HISTORY CLEAR
	$('#boot').removeData('check_time');
	$('#boot').removeData('invitation_count');
	$('#boot').removeData('check_pi_time');
	
	var historyCount=history.length;
	history.go(-historyCount);
	$.mobile.changePage("#boot");
	
	navigator.notification.alert("ログアウトしました。", null, "報告");
	
	return false;	
}

function onFBLocationChange(newLoc) {
	if (newLoc.indexOf( redirecturl ) == 0) {	//	リダイレクトURL
		$.mobile.hidePageLoadingMsg();
		fblogined = false;
		l("MOVE TO TARGET URL:" + newLoc);
		window.plugins.childBrowser.close();
	} else {
		l("NEW LOCATION " + newLoc);
	}
}

function parseLogoutAll(jsonStr) {
	l("parseLogoutAll "+jsonStr);
	var	enc = $.toJSON(jsonStr);
	
	$.mobile.hidePageLoadingMsg();
	try {
		l("enc "+enc);
		if (checkOkNg(enc)) {
			var	url = $.evalJSON(enc).oauth_url_facebook;
			if (url != null) {
				var	cb = ChildBrowser.install();
				if (cb != null) {
					cb.onLocationChange = function(loc){ self.onFBLocationChange(loc); };
					cb.onClose = function(){self.onFBCloseBrowser()};
					cb.showWebPage(url);
				}
			}
		} else {
			navigator.notification.alert("エラーが発生しました。\n"+$.evalJSON(enc).error_list, null, "エラー");
		}
	} catch(e) { parsedJSON = { "parse error":e}; }
}

/*
function logoutShotbook() {
	$.mobile.showPageLoadingMsg("b", "facebook logout");
	l("options "+$.JSONstr({ "p":logout_cmd, "return_url":redirecturl }));
	try{
		$.getJSON(root_url, { "p":logout_cmd, "return_url":redirecturl }, parseLogout );
	}catch(e){l(e);}
}

function parseLogout(jsonStr) {
	l(jsonStr);
	var	parsedJSON;
	try {
		if (typeof jsonStr === 'string') {
			parsedJSON = JSON.parse(jsonStr);
		}
		else { // maybe input object
			parsedJSON = jsonStr;
		}
	} catch(e) { parsedJSON = { "parse error":e}; }
	
	$.mobile.hidePageLoadingMsg();
	
	if (parseInt(parsedJSON["result"]) == 1) {
		navigator.notification.alert("エラーが発生しました。\n"+parsedJSON["error_list"], null, "エラー");
	} else {
		navigator.notification.alert("ログアウトしました。\nオフラインモードになります。", null, "報告");
		fblogined = false;
	}
}
*/

(function($) {

}) (jQuery);


/*
 Cordova - Golfer's Dashboard DB
 Copyright (c) 2012 Indi
 */


(function($) {
	
	$('#sc_edit_player_p').live("pageinit", function(event, data) {
		
		$('#scep_ok', $('#sc_edit_player_p')).on('click', function() {
			var	hp = $('#slider-0').val();
			
			var	rd=$('#sc_edit_player_p').data('rounddata');
			var	un=$('#sc_edit_player_p').data('usernum');
			
			rd.scores[un].player.handicap=hp;
			
			return true;
		});

/*		
		$('input[id^="slider-"]').change(function(){
			var slider_value = $(this).val()
			console.log($(this).id + " changed to " + slider_value)
		});
 */
	});
	
	
	$('#sc_edit_player_p').live("pagebeforehide", function(event, data) {
		$(this).removeData('rounddata');
		$(this).removeData('usernum');
	});
	
	$('#sc_edit_player_p').live("pagebeforeshow", function(event, data) {
		try{
			/*
			$('#userlabel2', $(this)).hide();
			$('#slider-2', $(this)).slider('disable');
			 */
			var	params=$(this).data('params');
			var	rd=params["item"];
			var	un=params["usernum"];
			if (rd) {
				$(this).data('rounddata', rd);
				$(this).data('usernum', un);
				
				var	p=rd.scores[un].player;
				$('#scep_text', $(this)).text(p.name);
				$('#slider-0', $(this)).val(p.handicap);
				$('#slider-0', $(this)).slider('refresh');
			}
			
		}catch(e){l("ecep pbs " + e);}
	});
	
	$('#sc_edit_info_p').live("pageshow", function(event, data) {
//		$.mobile.activePage.data('ui.prevPage',data.prevPage);
//		l("prev " + data.prevPage.attr('id'));
	});
	
}) (jQuery);


/*
 Cordova - Golfer's Dashboard DB
 Copyright (c) 2012 Indi
 */

//function getRoundIdFromServer(rd, callback)
function getRoundIdFromServer(rd) {
	
	var	roundscore_register_opt = [ "cc_id", "course_id", "playdate", "weather", "wind" ];	//YYYYMMDD
	
	var	opt = { "p": roundscore_register_cmd };
	
	for(var i in roundscore_register_opt){
		var	j = roundscore_register_opt[i];
		if (j === "playdate") {
			opt[j] = normalizeDate(rd.date);
		} else if (j === "cc_id") {
			opt[j] = parseInt(rd.golfcourse_id);
		} else {
			opt[j] = rd[j];
		}
	}
	
	if (!opt.course_id) {
		opt.course_id = rd.out_course_id;
	}
	
	if (online) {
		$.post(root_url, opt, function(json){
			var	enc = $.toJSON(json);
			
			var result = $.evalJSON( enc ).result;
			
			if (result == 0){
				var	id = $.evalJSON( enc ).round_id;
				if (id){
					rd.sdb_id = id;
				} else {
				}
			}
			callbackGetRoundIdFromServer(rd);
		}, 'json');

	} else {
		callbackGetRoundIdFromServer(rd);
	}
}

function callbackGetRoundIdFromServer(rd) {
	try {
		$('#edit_round_player_p').removeData('player_list');
		
		//	ラウンドスコアへ
		var	event = {data:{page:'#round_score_p', params:{"item":rd, "show_in":false}}};
		moveto(event);
	}catch(e){l(e);}
}

function moveToRoundScore(rd) {
	$.mobile.showPageLoadingMsg("b", "ラウンドを開始します");

	getRoundIdFromServer(rd);
}

(function($) {
	
	$('#edit_round_info_p').live("pageinit", function(event, data) {
		$('#edit_round_info_form', $(this)).on('submit', function() {
			if ($('#edit_round_info_form').valid()) {
				var	params=$('#edit_round_info_p').data('params');
				var	rd=params['item'];
				
				rd.date = $('#round_date').attr('value');
				rd.weather = $('input:checked', $('#eri_weather_f')).val();
				rd.wind = $('input:checked', $('#eri_wind_f')).val();
				
				moveToRoundScore(rd);
			}
			
			return false;
		});
	});
	
	/*	*/
	$('#edit_round_info_p').live("pageshow", function(event, data) {
		$("#edit_round_info_form").validate({
			rules: {
				round_date: {
					required: true,
					date: false
				}
			}
		});
	});
	
	$('#edit_round_info_p').live("pagebeforeshow", function(event, data) {
		var	pn = $(this);
	
		$('#eri_weather_f', pn).makeWeatherSelector();
		$('#eri_wind_f', pn).makeWindSelector();
		
		$('#eri_weather_wind', pn).trigger('create');
		
		$('#weather_0').attr('checked', true).checkboxradio('refresh');
		$('#wind_0').attr('checked', true).checkboxradio('refresh');

		var	str = getTodayString();
		$('#round_date').attr({value:str});
	});
	
}) (jQuery);


/*
 Cordova - Golfer's Dashboard DB
 Copyright (c) 2012 Indi
 */

function slideupResultDelete(num) {
	navigator.notification.confirm(
		"第 "+num+" 打を削除します。\nよろしいですか？",	// message
		function(index){
			if (index == 2) {
				var	pn = $('#detailed_scoreedit_p');
				var	dlist = pn.data('dlist');
				
				var	obj = dlist.get(num);
				var	body = dlist.getbody();
				for(var i in body) {
					var	_o = body[i];
					if (_o.shotnum > num) {
						_o.shotnum --;
					} else if (_o.shotnum == num) {
						dlist.del(i);
					}
				}
				pn.data('dlist', dlist);
				
				setDetailsList(dlist);
			}
		},	// callback (index of button pressed)
		'警告', 'いいえ,はい');
}

function slideupResultEdit(num, notme) {
	var	pn = $('#detailed_scoreedit_p');
	var	dlist = pn.data('dlist');
	
	if (!dlist) {
		l("NO DLIST...");
		return;
	}
	
	var	orggear = 0;
	var	orglie = 0;
	var	orgins = -1;
	if (num >= 0) {
		var	obj = dlist.get(num-1);

		orggear = obj.gear;
		orglie = obj.lie;
		
		pn.data('editing', num);
	} else {
		orgins = dlist.cnt();
	}

	try {
		var	gg = new GolfGear();
		var	sr = new ShotResults();
		
		var pickerView = window.plugins.pickerView;
		
		var slots = [];
		if (num < 0) {
			var	ilist = new Array();
			var	max = gg.clubidlist;
			for(var i=0; i<=orgins; i++) {
				ilist.push({text:""+(i+1), value:i});
			}
			slots.push({name:'ins', title:'ショットナンバー', data:ilist, value:orgins});
		}
		
		var	glist = new Array();
		/* 全ギア表示
		var	max = gg.clubidlist;
		for(var i in gg.clubidlist) {
			glist.push({text:gg.clublist[i], value:gg.clubidlist[i]});
		}
		 */
		/* 選択ギア表示 */
		var	json=getDataFromLocal("mygear");
		if (json && notme==0) {
			var	obj=$.parseJSON(json);
			
			for(var i in obj) {
				var k=obj[i]['name'];
				var	id = parseInt(k.substr(10));
				glist.push({text:gg.gettitle(id), value:id});
			}
		} else {
			var	max = gg.clubidlist;
			for(var i in gg.clubidlist) {
				var	id = gg.clubidlist[i];
//				glist.push({text:gg.clublist[i], value:gg.clubidlist[i]});
				glist.push({text:gg.gettitle(id), value:id});
			}
		}
		slots.push({name:'gear', title:'ギア', data:glist, value:orggear});

		var	llist = new Array();
		var	max = sr.id;
		for(var i in sr.id) {
			llist.push({text:sr.title[i], value:sr.id[i]});
		}
		slots.push({name:'lie', title:'ライ', data:llist, value:orglie});

		pickerView.create('詳細編集', slots, function(selectedValues, buttonIndex) {
			if (buttonIndex == 1) {
				changeResults(selectedValues);
			}
		}, { style: 'black-opaque', doneButtonLabel: 'OK', cancelButtonLabel: 'Cancel'});
		
	}catch(e){l(e);}
	
	return;
}

function sw_sdc_done() {
	var results = SpinningWheel.getSelectedValues();
	var	selectedValues = {};
	for (var i in results) {
		if (i == "keys") {
			var	v = {};
			var	c = 0;
			for (var j in results[i]) {
				v[c] = parseInt(results[i][j]);
				c ++;
			}
			if (c == 3) {
				selectedValues.ins = v[0];
				selectedValues.gear = v[1];
				selectedValues.lie = v[2];
			} else if (c == 2) {
				selectedValues.ins = -1;
				selectedValues.gear = v[0];
				selectedValues.lie = v[1];
			}
		}
	}
	l($.JSONstr(selectedValues));
	changeResults(selectedValues);
}

function openResultEdit(num, notme) {
	var	pn = $('#detailed_scoreedit_p');
	var	dlist = pn.data('dlist');
	
	if (!dlist) {
		return;
	}
	
	var	orggear = 0;
	var	orglie = 0;
	var	orgins = -1;
	if (num >= 0) {
		var	obj = dlist.get(num-1);

		orggear = obj.gear;
		orglie = obj.lie;
		
		pn.data('editing', num);
	} else {
		orgins = dlist.cnt();

		pn.removeData('editing');
	}
	
	try {
		var	gg = new GolfGear();
		var	sr = new ShotResults();
		
		var pickerView = window.plugins.pickerView;
		
		if (num < 0) {
			var	ilist = new Array();
			var	max = gg.clubidlist;
			for(var i=0; i<=orgins; i++) {
				ilist[i] = ""+(i+1);
			}
//			slots.push({name:'ins', title:'ショットナンバー', data:ilist, value:orgins});
			SpinningWheel.addSlot(ilist, 'right', orgins);
		}
		
		var	glist = new Array();
		/* 選択ギア表示 */
		var	json=getDataFromLocal("mygear");
		if (json && notme==0) {
			var	obj=$.parseJSON(json);
			
			for(var i in obj) {
				var k=obj[i]['name'];
				var	id = parseInt(k.substr(10));
//				glist.push({text:gg.gettitle(id), value:id});
				glist[id] = gg.gettitle(id);
			}
		} else {
			var	max = gg.clubidlist;
			for(var i in gg.clubidlist) {
				var	id = gg.clubidlist[i];
				glist[id] = gg.gettitle(id);
			}
		}
//		slots.push({name:'gear', title:'ギア', data:glist, value:orggear});
		SpinningWheel.addSlot(glist, 'left', orggear);
		
		var	llist = new Array();
		var	max = sr.id;
		for(var i in sr.id) {
//			llist.push({text:sr.title[i], value:sr.id[i]});
			llist[sr.id[i]] = sr.title[i];
		}
//		slots.push({name:'lie', title:'ライ', data:llist, value:orglie});
		SpinningWheel.addSlot(llist, 'left', orglie);
		
		SpinningWheel.setCancelAction(sw_cancel);
		SpinningWheel.setDoneAction(sw_sdc_done);
		
		SpinningWheel.open();
		
	}catch(e){l(e);}
	
	return;
}

function changeResults(selected) {
	try {
		var	ins=parseInt(selected.ins);
		var	lie=parseInt(selected.lie);
		var	gear=parseInt(selected.gear);
	
		var	pn = $('#detailed_scoreedit_p');
		var	dlist = pn.data('dlist');
		if (dlist) {
		} else {
			return false;
		}
		var	nlist = new ListBlock();
		
		if (ins>=0) {
			dlist.ins(ins, {'shotnum':(ins+1), 'gear':gear, 'lie':lie});
			
			var	orgb=dlist.getbody();
			//	re count
			var	cnt = 0;
			for(var i in orgb) {
				orgb[i].shotnum = parseInt(i) + 1;
			}
		} else {
			var	num = pn.data('editing');
			pn.removeData('editing');

			var	orgb=dlist.getbody();
			
			var	cnt = 0;
			for(var i in orgb) {
				if (orgb[i].shotnum == num) {
					orgb[i].gear = gear;
					orgb[i].lie = lie;
				}
			}
		}
		pn.data('dlist', dlist);
//		var	txt=makeDetailsList(dlist);
//		$('#dse_list', pn).empty().append(txt).listview('refresh');
		setDetailsList(dlist);
	} catch(e){l(e);}

	return true;
}

function makeDetailsListItem(num){
	var	litxt = "<li id='dli_" +num+ "'><a class='simplea' href='#' id='dlilink_" +num+ "'>"
	+ "<fieldset class='ui-grid-b'><div class='ui-block-a'><div class='circle32'>" +num+ "</div></div>"
	+ "<div class='ui-block-b' class='geartxt' id='dli_gear_" +num+ "'>def gear</div>"
	+ "<div class='ui-block-c' class='lietxt;' id='dli_lie_" +num+ "'>def lie</div></fieldset></a><a href='#' id='dlidel_" +num+ "'>del</a></li>";
	
	return litxt;
}

function makeDetailsList() {
	var	txt = "";

	txt += "<li data-role='list-divider'><fieldset class='ui-grid-c'>" + "<div class='ui-block-a'><div class='circle32'>＃</div></div>"
	+ "<div class='ui-block-b' style='text-align:center;line-height:32px;'>ギア</div>"
	+ "<div class='ui-block-c' style='text-align:center;line-height:32px;'>結果</div>"
	+ "<div class='ui-block-d' style='text-align:center;line-height:32px;'>削除</div>"
	+ "</fieldset></li>";
	for(var i=1;i<=18; i++) {
		txt += makeDetailsListItem(i);
	}
	txt += "<li data-role='list-divider' class='bluebg' data-icon='plus'><a href='#' id='add_dse' class='sc_date_c'>追加</a></li>";

	return txt;
}

function setDetailsList(objs) {
	var	dlb=objs.getbody();
	var	cnt = 1;
	var	gg=new GolfGear();
	var	sr=new ShotResults();
	for(var i in dlb) {
		var	obj = dlb[i];
		var	num = dlb[i].shotnum;
		var	gear = dlb[i].gear;
		var	lie = dlb[i].lie;
		var	tgt = $('#dli_'+num);
		$('#dli_gear_'+num, $(tgt, $('#detailed_scoreedit_p'))).text(gg.getLtitle(gear));
		$('#dli_lie_'+num, $(tgt, $('#detailed_scoreedit_p'))).text(sr.gettitle(lie));
		$('#dli_'+num, $('#detailed_scoreedit_p')).show();
		cnt++;
	}
	
	if (cnt < 18) {
		for(var i=cnt; i<=18; i++) {
			$('#dli_'+i, $('#detailed_scoreedit_p')).hide();
		}
	}

	$('#dse_list', $('#detailed_scoreedit_p')).listview('refresh');
}

(function($) {
	/*
	$('#detailed_scoreedit_p').live("pageinit", function(event, data) {
	});
	*/
	
	$('#detailed_scoreedit_p').live("pagebeforehide", function(event, data) {
//		$('#detailed_scoreedit_p').removeData('dlist');
		$('a', $('#detailed_scoreedit_p')).off('click');
	});
	/*
	function xxx( text, searchValue ){
		return text.toLowerCase().indexOf( searchValue ) === -1;
	}
	*/
	$('#detailed_scoreedit_p').live("pagebeforeshow", function(event, data) {
		var	pn = $('#detailed_scoreedit_p');
		try {
			var	params=pn.data('params');
			if (params) {
				var	dlist=pn.data('dlist');
				if (!dlist) {
					var	rd=params["item"];
					var	user=params["user"];
					var	hole=params["hole"];
					var	shot=params["shot"];
					var	putt=params["putt"];
					if (rd) {
						pn.data('rounddata', rd);
						pn.data('user', user);
						pn.data('hole', hole);
						pn.data('shot', shot);
						pn.data('putt', putt);
					}

					var	score=rd.scores[user];
					var	holescore=score.holescores[hole-1];

					$('#dse_name', $(this)).text(score.player.name);
					
					var	h1=hole-1;
					$('#dse_hole', $(this)).html(makeHoleParYardsHCPtxt(hole, rd.pars[h1], rd.yards[h1], rd.hcds[h1]));

					var	dd=holescore.details;
					
					var	max = dd.length;
					var	dlist=new ListBlock();
					if (shot > 0 && (holescore.shot != shot && holescore.putt != putt) ) {
						var	gg=new GolfGear();
						var	sr=new ShotResults();
						var	pid=gg.putter_id[0];
						for(var i=0; i<shot; i++){
							var	ds = new DetailShot();
							ds.shotnum=1+i;
							if (i >= shot-putt) {
								ds.gear = pid;
								if (ds.shotnum != shot)
									ds.lie = sr.green;
								else
									ds.lie = sr.holein;
							} else {
								ds.gear = 0;
								ds.lie = 0;
							}
							dlist.add(ds);
						}
					} else if (dd.length > 0) {
						for(var i in dd) {
							var	tdd = new DetailShot();
							tdd.shotnum = dd[i].shotnum;
							tdd.gear = dd[i].gear;
							tdd.lie = dd[i].lie;
							dlist.add(tdd);
						}
					}
					pn.data('dlist', dlist);
				} else {
					l($.JSONstr(dlist));
				}
				
				var	txt = makeDetailsList();
				$('#dse_list', $(this)).empty().append(txt);
				setDetailsList(dlist);
			}
		}catch(e){l("dsc pbs " + e);}
	});

	$('#detailed_scoreedit_p').live("pageshow", function(event, data) {
		$.mobile.activePage.data('ui.prevPage',data.prevPage);
		
		$('#dse_list', $(this)).listview('refresh');

		$('a', $('#detailed_scoreedit_p')).on('click', function(e,d) {
			var	id = $(this).attr('id');
			if (!id) {
				return true;
			}
			
			try {
				var	pn = $('#detailed_scoreedit_p');
				
				var	rd=pn.data('rounddata');
				var	user=pn.data('user');
				
				if (id == "add_dse") {
					if (IS_ANDROID) {
						openResultEdit(-1, user);
					} else {
						slideupResultEdit(-1, user);
					}
				} else if (id == "dse_ok_btn") {
					var	hole=pn.data('hole');
					var	dlist=pn.data('dlist');
					
					var	hs=rd.scores[user].holescores[hole-1];

					hs.details = [];
					var	s=0;
					var	p=0;
					
					var	gg=new GolfGear();
					var	pid=gg.putter_id[0];
					
					var	body = dlist.getbody();
					for(var i in body) {
						hs.details.push(body[i]);
						s++;
						if (body[i].gear == pid) {
							p++;
						}
					}
					hs.shot=s;
					hs.putt=p;
					
					var	dshd = rd.scores[user].holescores[hole-1].details;

					pn.removeData('dlist');
					pn.removeData('rounddata');
					pn.removeData('user');
					pn.removeData('hole');
					pn.removeData('shot');
					pn.removeData('putt');
					
					return true;
				} else if (id == "dse_cancel_btn") {
					var	pn = $('#detailed_scoreedit_p');

					pn.removeData('dlist');
					pn.removeData('rounddata');
					pn.removeData('user');
					pn.removeData('hole');
					pn.removeData('shot');
					pn.removeData('putt');

					return true;
				} else {
					var	ret=id.match("dlilink_[0-9]{1,2}");
					if (ret) {
						var	a = id.split('_');
						var	num=a[1];
						if (IS_ANDROID) {
							openResultEdit(num, user);
						} else {
							slideupResultEdit(num, user);
						}
					} else {
						ret=id.match("dlidel_[0-9]{1,2}");
						if (ret) {
							var	a = id.split('_');
							var	num=a[1];
							slideupResultDelete(num);
						}
					}
				}
			} catch(e){l("dse at "+id+" : "+e);}

			return false;
		});

	});
}) (jQuery);


/*
 Cordova - shotbook post to shotbook , with facebook.
 Copyright (c) 2012 Indi
 */

//	http://docs.phonegap.com/en/1.8.1/cordova_camera_camera.md.html#Camera

function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);

	$.mobile.hidePageLoadingMsg();

	if (checkOkNg(r.response)) {
		navigator.notification.alert("投稿が正常に完了しました。", null, "成功");
		history.back();
	} else {
		var	errors = $.evalJSON(r.response).error_list;
		var	error_msg ="";
		for(var i in errors) {
			if (i == "image") {
				error_msg += "[画像] ";
			} else {
				error_msg += "["+image+"] ";
			}
			error_msg += errors[i];
		}
		navigator.notification.alert(error_msg, null, "エラー");
	}
}

function fail(error) {
	$.mobile.hidePageLoadingMsg();
	
	navigator.notification.alert("エラーコード"+error.code+"が発生しました。\n時間をおいてから再度お試しください。", null, "エラー");
	console.log("An error has occurred: Code = " + error.code);
	console.log("upload error source " + error.source);
	console.log("upload error target " + error.target);
}



var pictureSource;   // picture source
var destinationType; // sets the format of returned value 

// PhoneGap is ready to be used!
function onPhoneGapCamera() {
	pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
	
/*	NOT WORK...
	if (typeof navigator.camera !== "undefined") { 
		// We are safe to use the camera 
		l("WITH CAMERA");
	} else { 
		// Bad news no camera 
		l("BAD NEWS NO CAMERA");
	}
	
	if (typeof navigator.device !== 'undefined' && typeof navigator.device.capture !== 'undefined' && typeof navigator.device.capture.captureImage !== 'undefined') {
		// Can take a picture
		l("CAN TAKE CAMERA");
	} else {
		// No camera
		l("NO CAMERA");
	}
 */
}

function getPicture(sourceType) {
	var options = {
		correctOrientation:true,
		quality: 75,
		encodingType: Camera.EncodingType.JPEG,
		destinationType: destinationType.FILE_URI
	};
	if (sourceType != undefined) {
		options["sourceType"] = sourceType;
	}

	// if no sourceType specified, the default is CAMERA 
	navigator.camera.getPicture(getPicture_Success, getPicture_Error, options);
}

function getPicFileEntry(fe, params) {
	l("FileEntry "+$.toJSON(fe));
	if (fe.isFile && !fe.isDirectory) {
		var	imageURI = fe.fullPath;

		l("FileEntry...imageURI "+imageURI);

		var options = new FileUploadOptions();
		options.fileKey="image";
		options.mimeType="image/jpeg";
		options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
		options.params = params;

		l("OPTIONS "+$.toJSON(options));
		
		var ft = new FileTransfer();
		ft.upload(imageURI, root_url, win, fail, options);
	}
}

function failPicFileEntry(err) {
	l("ERROR "+$.toJSON(err));
}

function getPicture_Success(imageData) {
	l("IMAGEDATA "+imageData);
	
	$('#sbfb_post_img').attr('src', imageData);
	$('#sbfb_post_img').show();

	$('#sbfb_overlay_img').removeClass('ui-icon-plus');
	$('#sbfb_overlay_img').addClass('ui-icon-delete');
}

function getPicture_Error(error) {
	var	mes;
	if (error == "no camera available") {
		mes = "カメラが使えません";
	} else if (error == "no image selected") {
		mes = "画像が選択されませんでした";		
	}
	if (mes) {
		navigator.notification.alert(mes, null, "警告");
	}
}


function makePostOptions(obj) {
	var	options = { "p":facebook_post_cmd, "is_post":0, "status":0 };
	
	var	key, val;
	for(var i in obj) {
		for(var j in obj[i]) {
			var	tmp = obj[i][j];
			switch(j) {
				case "name":
				key = tmp;
				break;
				
				case "value":
				val = tmp;
				break;
			}
		}
		
		switch(key) {
			case "sbfb_comment":
				options.comment = val;
				break;

			case "sbfb_post":
				options.is_post = 1;
				break;
			
			case "sbfb_select":
				options.status = val;
				break;
		}
	}
	
	return options;
}

// file system fail
function fsFail(error) {
	console.log("failed with error code: " + error.code);
}
function fssuccess(entry) {
	alert("New Path: " + entry.fullPath);
}
function fserror(error) {
	alert("ERROR: " + error.code);
}
   
(function($) {
	
	$('#post_sbfb_p').live('pageinit', function(event, data) {

		$('input[type="checkbox"]').live('change', function(event, ui) {
			var	val = $(this).val();
			var	chk = $(this).attr('checked');
			l("toggle "+val+" "+chk);
			if (chk == "checked") {
				$('#sbfb_sel_div', $('#post_sbfb_p')).slideDown();
				$('#sbfb_select', $('#post_sbfb_p')).selectmenu('enable');
			} else {
				$('#sbfb_sel_div', $('#post_sbfb_p')).slideUp();
				$('#sbfb_select', $('#post_sbfb_p')).selectmenu('disable');
			}
		});
		
		$('#sbfb_post_form').on('submit', function(e) {
			var	ar = $(this).serializeArray();
			
			if ($('#sbfb_post_form').valid()) {
				$.mobile.showPageLoadingMsg("b", "アップロード中");
				
				var	params = makePostOptions(ar);

				var	imageURI = $('#sbfb_post_img', $('#post_sbfb_p')).attr('src');
				if (!(imageURI && imageURI.length > 0)) {
					imageURI = "file:///data/data/jp.co.indi.shotbook/cache/images/1x1.gif";	//	COPIED ONCREATE()
//					imageURI = getPhoneGapPath() + "images/1x1.gif";	//	CANNOT !! WHY?!	//	file:///android_asset/www/images/1x1.gif
				}
				else {
					if (imageURI.match('content://')) {
						window.resolveLocalFileSystemURI(imageURI, function(fe) {getPicFileEntry(fe,params);}, failPicFileEntry);
						return false;
					} else {
						tmp = imageURI.split("?");
						l("IMAGEURI "+imageURI);
						if (tmp.length > 1) {
							for(var i in tmp){
								l("TMP["+i+"] "+tmp[i]);
							}
							imageURI = tmp[0];
						}
					}
				}

				l("imageURI "+imageURI);

				var options = new FileUploadOptions();
				options.fileKey="image";
				options.mimeType="image/jpeg";
				options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
				options.params = params;

				l("OPTIONS "+$.toJSON(options));
				
				var ft = new FileTransfer();
				ft.upload(imageURI, root_url, win, fail, options);
			} else {
				navigator.notification.alert("コメントは必須です。", null, "警告");
			}
			return false;
		});

		$('a[id="add_remove_photo"]').live('click', function(e) {
			var	src = $('#sbfb_post_img').attr('src');

//			var	src = $("#smallImage").attr('src');
//			l($("#smallImage").attr('id')+" "+$("#smallImage").attr('src'));
			
			if (src && src.length > 0) {
				navigator.notification.confirm(
				"添付画像を削除します。\nよろしいですか？",	// message
				function(index){
					if (index == 2) {
						$('#sbfb_post_img').attr('src', '');
						$('#sbfb_post_img').hide();
						
						$('#sbfb_overlay_img').removeClass('ui-icon-delete');
						$('#sbfb_overlay_img').addClass('ui-icon-plus');
					}
				},	// callback (index of button pressed)
				'警告', 'いいえ,はい' );
			} else {
				navigator.notification.confirm(
				"添付画像を選んでください。",	// message
				function(index){
					if (index == 1) {
						getPicture();
					} else if (index == 2) {	//Camera.PictureSourceType.SAVEDPHOTOALBUM
//						getPicture(pictureSource.PHOTOLIBRARY);
						getPicture(Camera.PictureSourceType.SAVEDPHOTOALBUM);
					}
				},	// callback (index of button pressed)
				'', 'カメラ,アルバム,キャンセル' );
			}
		});
	});
	
	$('#post_sbfb_p').live('pagebeforehide', function(event, data) {
		$('#sbfb_post', $(this)).attr('checked',false).checkboxradio("refresh");
		$('#sbfb_select', $(this))[0].selectedIndex = 0;
		$('#sbfb_select', $(this)).selectmenu("refresh");
		$('#sbfb_comment', $(this)).val("");

		//	画像初期化
		$('#sbfb_post_img', $(this)).attr('src', '').hide();
		$('#sbfb_overlay_img').removeClass('ui-icon-delete').addClass('ui-icon-plus');
	});

	$('#post_sbfb_p').live('pagebeforeshow', function(event, data) {
		$('#sbfb_sel_div', $('#post_sbfb_p')).hide();
		$('#sbfb_select', $('#post_sbfb_p')).selectmenu('disable');
	});
	
	$('#post_sbfb_p').live('pageshow', function(event, data) {
		
		$('#sbfb_post_form').validate({
			rules: {
				sbfb_comment: {
					required: true
				}
			}
		});
	});

}) (jQuery);



/*
 Cordova - Golfer's Dashboard DB
 Copyright (c) 2012 Indi
 */

function showGCinfo(cc_id) {
	var params = $('#results_gc_p').data('params');
	var	revflg = false;
	if (params) {
		revflg = params["revflg"];
	}
	
	var	list = $('#results_gc_p').data('list');
	for(var i in list) {
		if (list[i].cc_id == cc_id) {
			/*
			$('#gc_infos_p').data('params', {"item":list[i]});
			$.mobile.changePage('#gc_infos_p');
			 */
			var	event = {data:{page:'#gc_infos_p', params:{"item":list[i], 'revonly':revflg}}};
			moveto(event);
			break;
		}
	}
}

function searchByKeyword(key, revflg) {
	var	options = { "p":golfcpurse_list_cmd, "keyword":key };
	
	if (revflg) {
		options.revflg = 1;
	}
	$('#results_gc_p').data('searchoption', options);
	
	doSearch();
}

function searchByLocation(lat, lon, revflg) {
	var	options = { "p":golfcpurse_list_cmd, "latitude":lat, "longitude":lon };
	
	if (revflg) {
		options.revflg = 1;
	}
	$('#results_gc_p').data('searchoption', options);
	
	doSearch();
}

function doSearch() {
	$.mobile.showPageLoadingMsg('a', 'ゴルフ場を検索中です');
	
	$('#search_more_gc_btn', $('#results_gc_p')).button('disable');

	var	options = $('#results_gc_p').data('searchoption');

	var	ofs = 0;
	var	lmt = 20;
	
	var	showing = $('#results_gc_p').data('showing');
	if (showing) {
		ofs = showing;
		lmt = $('#results_gc_p').data('limit');
		var	max = $('#results_gc_p').data('max');
		if (ofs + lmt > max) {
			lmt = max - ofs;
		}
	} else {
		$('#gc_list_header').html("検索中　<div style='text-align:center'><img width='20px' height='20px' src='images/ajax-loader.gif' /></div>");
	}
	
	options.offset = ofs;
	options.limit = lmt;
	
	$.getJSON(root_url, options, callbackGolfCourseSearch);
}

function makeSGCRlist(enc) {
	var	cc_count = $.evalJSON(enc).cc_count;
	$('#results_gc_p').data('max', cc_count);
	
	var	shw = 0;
	var	pos = $.evalJSON(enc).position;
	if (pos == 0) {
		$('#testlist li').not("[data-role='list-divider']").remove();
		$('#gc_list_header').html("検索結果 "+cc_count+" コース");
	} else {
		shw = $('#results_gc_p').data('showing');
	}

	var	txt = "";
	var	list = $.evalJSON(enc).cc_list;
	var	c = 0;
	for(var i in list) {
		var	gc = list[i];

		var	cn = "[";
		for(var j in gc.course_name_list) {
			cn += " " + gc.course_name_list[j].course_name;
		}
		cn += " ]";

//		var	canres = (gc.reserve_cc_id > 0) ? "予約可能":"";
		var	canres = (gc.reserve_cc_id > 0) ? "<img src='images/icons-36-white_res.png' style='width:18px;height:18px;vertical-align:middle'><span>予約可能</span>":"";

//		txt += "<li><a href='#' onclick='javascript:showGCinfo("+gc.cc_id+")'><p class='ui-li-aside ui-li-desc'>"+cn+"</p><h3 class='ui-li-heading'>"+gc.cc_name+"</h3><p class='ui-li-desc'>"+gc.addr+" "+canres+"</p></a></li>";
		txt += "<li><a href='#' onclick='javascript:showGCinfo("+gc.cc_id+")'><h3 class='ui-li-heading'>"+gc.cc_name+"</h3><p class='ui-li-desc'>"+gc.addr+"<br/>"+cn+" "+canres+"</p></a></li>";
		c ++;
	}
	
	$('#testlist').append(txt);
	$('#testlist').listview('refresh');
	$('#testlist').listview();
	
	var	readed=$('#results_gc_p').data('list');
	if (readed) {
		$('#results_gc_p').data('list', readed.concat(list));
	} else {
		$('#results_gc_p').data('list', list);
	}
	
	var	t=$('#results_gc_p').data('list');
	
	if (shw + c >= cc_count) {
		$('#search_more_gc_btn', $('#results_gc_p')).button('disable');
		$('#search_more_gc_div', $('#results_gc_p')).hide();
	} else {
		$('#search_more_gc_btn', $('#results_gc_p')).button('enable');
	}
	var	showing = shw + c;
	$('#results_gc_p').data('showing', showing);
	$('#results_gc_p').data('limit', c);
}

function callbackGolfCourseSearch(response) {
	$.mobile.hidePageLoadingMsg();

	var	enc=$.toJSON(response);
	if (checkOkNg(enc)) {
		var	cc_count = $.evalJSON(enc).cc_count;
		if (cc_count <= 0) {
			removeRGClistDatas();
			$('#testlist li').not("[data-role='list-divider']").remove();
			
			navigator.notification.alert("ゴルフ場が見つかりませんでした。\n条件を変更してお試しください。", alertSearchGCCallback, "エラー");
			
			return false;
		}
		
		makeSGCRlist(enc);
		
		return true;
	} else {
		removeRGClistDatas();
		$('#testlist li').not("[data-role='list-divider']").remove();
		
		navigator.notification.alert("ネットワークエラー\n"+$.evalJSON(enc).error_list[0], alertSearchGCCallback, "エラー");
		
		return false;
	}
}

function removeRGClistDatas() {
	$('#results_gc_p').removeData('showing');
	$('#results_gc_p').removeData('limit');
	$('#results_gc_p').removeData('max');
}

function alertSearchGCCallback(e) {
	var params = $('#results_gc_p').data('params');
	if (params)
		if (params["revflg"])
			$('#search_gc_p').data('params', {'revflg':true});
	
	$('#results_gc_p').removeData('params');
	history.back();
}

(function($) {
	
	$('#results_gc_p').live("pageinit", function(event, data) {

		$('a', $('#results_gc_p')).on('click', function(e) {
			if ($(this).attr('id') == null) {
				var	params = $('#results_gc_p').data('params');
				if (params.revflg) {
					$('#search_gc_p').data('params', {'revflg':true});
				}
			}
		});
		
		$('#search_more_gc_btn', $('#results_gc_p')).live('click', function(e) {
			doSearch();
		});
	});
	
	//	GC検索結果のリストを表示する前に必ず設定
	$('#results_gc_p').live('pagebeforeshow', function(e,d) {
		var params = $(this).data('params');
		var	key;
		if (params) {
			var	newone = params["new"];
			if (newone) {
				$('#testlist li').not("[data-role='list-divider']").remove();
			
				$('#search_more_gc_div', $(this)).show();
				$('#search_more_gc_btn', $(this)).button('disable');

				params["new"] = false;
				$(this).data('params', params);
			} else {
				return;
			}
			
			var	revflg = params["revflg"];
			
			key = params["key"];
			if (key) {	//	キーワード検索
				searchByKeyword(key, revflg);
			}
			else {
				var	code = params["code"];
				if (code != "unknown") {
					if (code != 2) {	//	過去利用コース一覧
						//	code 0
						removeRGClistDatas();
						buildGolfCourseDataHistory();
					} else {			//	GPS位置情報利用
						//	code 2
						var	lat = params["latitude"];
						var	lon = params["longitude"];
						searchByLocation(lat, lon, revflg);
					}
				}
				else {
					l(" NO CODE ");
				}
			}
		}
	});

}) (jQuery);


/*
 Cordova - Golfer's HOME
 Copyright (c) 2012 Indi
 */


function initSAEvalues() {
	$('#sa_easy_p').data("box", {"0":"score", "1":"putt", "2":"fwkp", "3":"paron"});
	
	$('#sae_0_title', $('#sa_easy_p')).text("AVE");
	$('#sae_0_val', $('#sa_easy_p')).text("-");
	$('#sae_0_3r', $('#sa_easy_p')).text("-");
	$('#sae_0_b', $('#sa_easy_p')).text("-");
	
	$('#sae_1_title', $('#sa_easy_p')).text("PUTT");
	$('#sae_1_val', $('#sa_easy_p')).text("-");
	
	$('#sae_2_title', $('#sa_easy_p')).text("FW KEEP");
	$('#sae_2_val', $('#sa_easy_p')).text("- %");
	
	$('#sae_3_title', $('#sa_easy_p')).text("PAR ON");
	$('#sae_3_val', $('#sa_easy_p')).text("- %");
}

function showSAEvalues() {
	var	values = $('#sa_easy_p').data("values");
	var	score = values.score;
	var	putt = values.putt;
	var	fwkp = values.fwkp;
	var	paron = values.paron;

	var	pac;
	var	footer;
	var	box = $('#sa_easy_p').data("box");
	for(var i in box) {
		var txt = box[i];
		if (txt == "score") {
			pac = score;
			footer = "";
		} else if (txt == "putt") {
			pac = putt;
			footer = "";
		} else if (txt == "fwkp") {
			pac = fwkp;
			footer = "<span style='font-size:0.5em;'>%</span>";
		} else if (txt == "paron") {
			pac = paron;
			footer = "<span style='font-size:0.5em;'>%</span>";
		}
		if (footer.length > 0) {
			for(var j in pac) {
				if (pac[j] === "100.0") {
					pac[j] = "100";
				}
			}
		}
		
		if (i == 0) {
			$('#sae_0_val', $('#sa_easy_p')).html(pac["val"] + footer);
			$('#sae_0_3r', $('#sa_easy_p')).html(pac["3r"] + footer);
			$('#sae_0_b', $('#sa_easy_p')).html(pac["b"] + footer);
		} else {
			var	id = '#sae_'+i;
			$(id+'_val', $('#sa_easy_p')).html(pac.val + footer);
		}
	}
}

function drawSAChart() {
	try {
		l("0");
		var	box = $('#sa_easy_p').data("box");
		var	val = $('#sa_easy_p').data("values");
		
		l("0 "+$.toJSON(val));
		var	arr;
		var	tmp = box[0];
		if (tmp == "score") {
			arr = val.sline;
		} else if (tmp == "putt") {
			arr = val.pline;
		} else if (tmp == "fwkp") {
			arr = val.fline;
		} else if (tmp == "paron") {
			arr = val.oline;
		}
		var	data = [];
		data.push(arr);
		data.push(arr);

		var chartdata = {
			"config": {
				"title":"",
				"bg":"transparent",
				"axisXLen":0,
				"titleY": 25,
				"useVal": ["yes","no","no","no","no"],
				"paddingTop": 8,
				"type": "line",
				"colorSet": ["#666","#aaa","#5b7e91","#4c6cb3","#eee"],
				"xColor": "#00b",
				"yColor":"transparent",
				"onlyChart": "yes",
				"unit": "円",
				"width": 260,
				"height": 130
			},
			"data":[
					 ["年度",2007,2008,2009,2010,2011,2012,2013],
					 ["紅茶",335,352,527,448,775,835,979],
					 ["ウーロン",100,183,352,120,302,400,1112]
				 ]
		};
		chartdata["data"] = data ;

		ccchart.init('sa_chart', chartdata);

	} catch(e){l(e);}
}

function doEasyCalc(obj) {
	var	all_sum = $.parseJSON(obj.sum_data);
	l("\nALL_SUM "+$.toJSON(all_sum));
	try {
		var	score = new Array();
		var	putt = new Array();
		var	fwkp = new Array();
		var	paron = new Array();
		
		var	s_v = 0, p_v = 0, f_v = 0, o_v = 0;
		var	s_3 = 0, p_3 = 0, f_3 = 0, o_3 = 0;
		var	s_ex = 1000, p_ex = 1000, f_ex = 1000, o_ex = 1000;
		var	baseholes = 0;
		var	baserounds = 0;
		var	holecount = 0;
		var	hole3count = 0;
		var	mul = 0;
		var	c = 0;
		var	base3rounds = 0;
		var	base3holes = 0;
		
		if (obj.data_list.length == 0) {
			navigator.notification.alert("集計結果がありませんでした。", null, "エラー");
			history.back();
			return false;
		}
		
		var	slinepos = ["non"];
		var	plinepos = ["non"];
		var	flinepos = ["non"];
		var	olinepos = ["non"];
		
		for(var i in obj.data_list) {
			if (obj.data_list[i]) {
				var	tmp;
				if (typeof(obj.data_list[i]) == "string") {
					tmp = $.parseJSON(obj.data_list[i]);
				} else {
					tmp = obj.data_list[i];
				}
				l(i + " : " + $.toJSON(tmp));
				if ($.toJSON(tmp) == "null") {
					continue;
				}
				
				holecount = tmp.pcnt_sum[0];
				if (holecount != 18) {
					mul = 2;
				} else {
					mul = 1;
				}
				hole3count = tmp.pcnt_sum[3];
				
				s_v += tmp.shot_sum[0] * mul;
				p_v += tmp.putt_sum[0] * mul;
				if (tmp.fairwaykeep_sum) {
					f_v += tmp.fairwaykeep_sum * mul;
				}
				o_v += tmp.para_sum[0] * mul;

				if (c < 3) {
					base3holes += holecount;
					base3rounds ++;
					s_3 += tmp.shot_sum[0] * mul;
					p_3 += tmp.putt_sum[0] * mul;
					if (tmp.fairwaykeep_sum) {
						f_3 += tmp.fairwaykeep_sum * mul;
					}
					o_3 += tmp.gir0_sum[0] * mul;
				}
				
				if (s_ex > tmp.shot_sum[0] * mul) {
					s_ex = tmp.shot_sum[0] * mul;
				}
				if (p_ex > (tmp.putt_sum[0] / holecount)) {
					p_ex = (tmp.putt_sum[0] / holecount);
				}
				if (f_ex > (tmp.fairwaykeep_sum / (holecount - hole3count))) {
					f_ex = (tmp.fairwaykeep_sum / (holecount - hole3count));
				}
				if (o_ex > (tmp.gir0_sum[0] / holecount)) {
					o_ex = (tmp.gir0_sum[0] / holecount);
				}
				
				slinepos.push(tmp.shot_sum[0]);
				plinepos.push(marume2x(tmp.putt_sum[0] / holecount * 100));
				flinepos.push(marume1(tmp.fairwaykeep_sum / (holecount - hole3count) * 100));
				olinepos.push(marume1(tmp.gir0_sum[0] / holecount * 100));

				baseholes += holecount * mul;
				baserounds ++;
				c ++;
			}
		}
		
		score["val"] = marume1(s_v / baserounds);
		score["3r"] = marume1(s_3 / base3rounds);
		score["b"] = s_ex;
		
		putt["val"] = marume2x(p_v / baseholes);
		putt["3r"] = marume2x(p_3 / base3holes);
		putt["b"] = marume2x(p_ex);
		
		if (all_sum.fairwaykeep_sum) {
			fwkp["val"] = marume1(f_v / baseholes);
			fwkp["3r"] = marume1(f_3 / base3holes);	//	RECALC
			fwkp["b"] = marume1(f_ex);
		} else {
			fwkp["val"] = '-';
			fwkp["3r"] = '-';
			fwkp["b"] = '-';
		}
		
		paron["val"] = marume1(o_v / baseholes * 100);
		paron["3r"] = marume1(o_3 / base3holes * 100);	//	RECALC
		paron["b"] = marume1(o_ex);
		
		$('#sa_easy_p').data("values", {"score":score, "putt":putt, "fwkp":fwkp, "paron":paron,
			"sline":slinepos, "pline":plinepos, "fline":flinepos, "oline":olinepos });
		showSAEvalues();
//		drawSAChart();
	} catch(e){l(e);}
}


function marume1(val) {
	return $.FourOutFiveIn(val, 1).FillZero(-1,1);
}
function marume2x(val) {
	return $.FourOutFiveIn(val, 2).FillZero(-1,1);
}

function changeSAviewbox(val) {
	var	box = $('#sa_easy_p').data("box");

	l("CHANGE 0[" +box[0]+ "] TO " +val+ "[" +box[val]+ "]");
	
	var	box0org = box[0];
	box[0] = box[val];
	box[val] = box0org;
	
	var	title0org = $('#sae_0_title', $('#sa_easy_p')).text();
	$('#sae_0_title', $('#sa_easy_p')).text( $('#sae_'+val+'_title', $('#sa_easy_p')).text());
	$('#sae_'+val+'_title', $('#sa_easy_p')).text(title0org);
	
	$('#sa_easy_p').data("box", box);
	showSAEvalues();
}

(function($) {
	$('#sa_easy_p').live('pageinit', function(e,d){
		
		$('a', $(this)).on('click', function(e) {
			var	id = $(this).attr('id');
			l("CLICK "+id);
			if (id == 'sae_1_link') {
				changeSAviewbox(1);
				return false;
			} else if (id == 'sae_2_link') {
				changeSAviewbox(2);
				return false;
			} else if (id == 'sae_3_link') {
				changeSAviewbox(3);
				return false;
			}
			return true;
		});
	});
	
	$('#sa_easy_p').live('pagebeforeshow', function(e,d){
		/*
		var	width = $('.ui-content',$(this)).width();
		var	height = $('.ui-content',$(this)).height();
		*/
		$('.ui-content',$(this)).css('padding-top', '4px');
		$('.ui-content',$(this)).css('padding-right', '4px');
		$('.ui-content',$(this)).css('padding-left', '4px');
		$('.ui-content',$(this)).css('padding-bottom', '4px');
		
		initSAEvalues();
/*
		$.mobile.showPageLoadingMsg('b', 'ダウンロード中');
		var	options={"p":scoreanalysis_get_cmd, "cc_id":0, "last_round_count":10, "all_flag":0 };
		l("options "+$.JSONstr(options));

		$.getJSON(root_url, options, function(response) {
			var	enc = $.toJSON(response);
			l(enc);
			$.mobile.hidePageLoadingMsg();
			if (checkOkNg(enc)) {
				doEasyCalc(response);
			} else {
				navigator.notification.alert("集計結果がありませんでした。", null, "エラー");
				history.back();
				return false;
			}
		});
		*/
	});

	$('#sa_easy_p').live('pageshow', function(e,d){
		$.mobile.showPageLoadingMsg('b', 'ダウンロード中');
		var	options={"p":scoreanalysis_get_cmd, "cc_id":0, "last_round_count":10, "all_flag":0 };
		l("options "+$.JSONstr(options));

		$.getJSON(root_url, options, function(response) {
			var	enc = $.toJSON(response);
			l(enc);
			$.mobile.hidePageLoadingMsg();
			if (checkOkNg(enc)) {
				doEasyCalc(response);
			} else {
				navigator.notification.alert("集計結果がありませんでした。", null, "エラー");
				history.back();
				return false;
			}
		});
	});
	
	$('#sa_easy_p').live('pagebeforehide', function(e,d){
		$('#sa_easy_p').removeData("box");
		$('#sa_easy_p').removeData("values");
	});
	
})(jQuery);


/*
	Cordova - Golfer's Dashboard DB
Copyright (c) 2012 Indi
*/

function resetRLPfooterBtn() {
	var	pn = $('#rlp_mode_btn', $('#rounds_list_p'));
	pn.val(0);
	$('span.ui-btn-text', pn).text("読込");
    $('span.ui-icon', pn).addClass("ui-icon-plus").removeClass("ui-icon-delete");
}

function resetHistorySearch() {
	resetRLPfooterBtn();
	
	$('#rounds_list_p').removeData('rl_shw');
	$('#rounds_list_p').removeData('rl_pos');
	$('#rounds_list_p').removeData('rl_cnt');
	
	$('#rd_list').empty();
	$('#rl_loading_div').slideDown();
	$('#rl_readmore_btn').button('disable');
	
	getRoundDataHistory(false);
}

function getHistorySearch() {
	var	options = {};
	
	var	rl_shw = $('#rounds_list_p').data('rl_shw');	//	表示中
	if (rl_shw) {
		var	rl_pos = $('#rounds_list_p').data('rl_pos');	//	取ってきたポジション
		var	rl_cnt = $('#rounds_list_p').data('rl_cnt');	//	MAX
		if (rl_shw > 0 && (rl_shw + rl_pos < rl_cnt)) {
			options["offset"] = rl_shw + rl_pos;
			options["limit"] = rl_shw;
		} else if (rl_shw < 0) {
			options["offset"] = 0;
			options["limit"] = 10;
		} else {
			$('#rl_readmore_btn', $('#rounds_list_p')).button('disable');
			$('#rl_loading_div', $('#rounds_list_p')).slideUp();
			return;
		}
	} else {
		$('#rd_list', $('#rounds_list_p')).empty();
		options["offset"] = 0;
		options["limit"] = 10;
	}
	$('#rl_loading_div', $('#rounds_list_p')).slideDown();
	$('#rl_readmore_btn', $('#rounds_list_p')).button('disable');
	
	$.mobile.showPageLoadingMsg('a', 'ラウンドデータ検索中');
	getRoundDataHistoryFromServer(options);
}

function reloadAllRoundData() {
	resetRLPfooterBtn();
	
	$('#rounds_list_p').removeData('localque');
	$('#rounds_list_p').removeData('rl_shw');
	$('#rounds_list_p').removeData('rl_cnt');
	$('#rounds_list_p').removeData('rl_pos');
	
	$('#rd_list').empty();

	$('#rl_loading_div').slideDown();
	$('#rl_readmore_btn').button('disable');
	
	getRoundDataHistory(true);
}

function clearRLPHover() {
	$('#rounds_list_p').find('table td').each( function( index, element ) {
		$(element).removeClass('onHover');
	});
}

(function($) {

	$('#rounds_list_p').live('pageinit', function(e,d){
		/*
		var	pn = $('#rlp_mode_btn', $('#rounds_list_p'));
		pn.val(0);
		$('span.ui-btn-text', pn).text("読込");
        $('span.ui-icon', pn).addClass("ui-icon-plus").removeClass("ui-icon-delete");
		*/
		$('#rlp_mode_btn', $('#rounds_list_p')).live('click', function(e) {
			l("BTN VAL "+$('#rlp_mode_btn', $('#rounds_list_p')).val());
			if ($('span.ui-btn-text', $(this)).text() == "削除") {
				$(this).val(0);
				$('span.ui-btn-text', $(this)).text("読込");
	            $('span.ui-icon', $(this)).addClass("ui-icon-plus").removeClass("ui-icon-delete");

	            $("span.rlp_del", $('#rounds_list_p')).hide();
	            $("span.rlp_date", $('#rounds_list_p')).show();
			} else {
				$(this).val(1);
	            $('span.ui-btn-text', $(this)).text("削除");
	            $('span.ui-icon', $(this)).addClass("ui-icon-delete").removeClass("ui-icon-plus");

	            $("span.rlp_del", $('#rounds_list_p')).show();
	            $("span.rlp_date", $('#rounds_list_p')).hide();
			}
			return false;
		});

		$('tr', $('#rounds_list_p')).live('tap', function(e) {
			try {
				var	_id = $(this).attr('id');
				l('a click '+_id);
				var	txt = "";
				
				if (_id) {	//	for backbutton support
					if ($('#rlp_mode_btn', $('#rounds_list_p')).val() == 1) {
						_id = _id.replace(/b_/,"d_");
					}
					var	check = false;
					if (_id.match("^rdlb_")) {
						var	rid = -1;
						var	num = _id.substr(5);	//	ldb id
						var	que = $('#rounds_list_p').data('localque');
						for(var i in que) {
							if (que[i].local_id == num) {
								if (que[i].new_in_server) {
									rid = que[i].round_id;
								}
								break;
							}
						}
						if (rid > 0) {
							navigator.notification.confirm(
							"サーバに新しいデータがあります。\nどのデータを編集しますか？",	// message
							function(index){
								if (index == 1) {
									$.mobile.showPageLoadingMsg();
									loadRoundDataFromHistory(num);
								} else if (index == 2) {
									$.mobile.showPageLoadingMsg('b', 'サーバからダウンロード中');
									loadRoundDataFromServer(rid);
								}
								clearRLPHover();
							},	// callback (index of button pressed)
							'お知らせ', 'ローカル,サーバ,キャンセル' );
						} else {
							$.mobile.showPageLoadingMsg();
							loadRoundDataFromHistory(num);
						}
						check = true;

					} else if (_id.match("^rdld_")) {
						var	num = _id.substr(5);	//	ldb id
						var	que = $('#rounds_list_p').data('localque');
						for(var i in que) {
							if (que[i].local_id == num) {
								if (que[i].new_in_server) {
									txt = "サーバに新しいデータがあります。\n";
								} else if (que[i].new_in_local) {
									txt = "サーバより新しいデータです。\n";
								} else if (que[i].round_id < 0) {
									txt = "ローカルにしかデータがありません。\n";
								}
								break;
							}
						}
						navigator.notification.confirm(
						"ローカルのラウンドデータを削除します。\n"+txt+"よろしいですか？",	// message
						function(index){
							if (index == 1) {
								deleteRoundData(num);
								reloadAllRoundData();
							}
							clearRLPHover();
						},	// callback (index of button pressed)
						'警告', 'はい,いいえ' );
						check = true;
						
					} else if (_id.match("^rdsb_")) {
						var	num = _id.substr(5);	//	round_id
						$.mobile.showPageLoadingMsg('b', 'サーバからダウンロード中');
						loadRoundDataFromServer(num);
						check = true;
						
					} else if (_id.match("^rdsd_")) {
						navigator.notification.confirm(
						"サーバのラウンドデータを削除します。\nよろしいですか？",	// message
						function(index){
							if (index == 1) {
								var	num = _id.substr(5);	//	round_id
								deleteRoundDataFromServer(num);
							}
							clearRLPHover();
						},	// callback (index of button pressed)
						'警告', 'はい,いいえ' );
						check = true;
					}
					if (check) {
						$(this).find('td').each( function( index, element ) {
							$(element).addClass('onHover');
						} );
						return false;
					}
				}
				return true;
			} catch(e){l(e);}
		});

		
		$('#rl_readmore_btn', $('#rounds_list_p')).live('click', function(e) {
			getHistorySearch();
		});
	});
 
	$('#rounds_list_p').live('pagebeforeshow', function(e,d){
		try {
			$('#rd_list').empty();
			$('#rl_loading_div').slideDown();
			$('#rl_readmore_btn').button('disable');
			
			getRoundDataHistory(false);
		} catch(e){l(e);}
	});

	$('#rounds_list_p').live('pageshow', function(e,d){
		try {
			resetRLPfooterBtn();
			
			if (!online || !fblogined) {
				navigator.notification.alert("オフラインもしくはshotbookにログインしていないので、ローカル保存しているファイルをリストアップします。", null, "警告");
			} else {
				var que=$('#rounds_list_p').data('localque');
				if (que) {
					$('#rounds_list_p').data('rl_shw', -1);
				}
			}
		} catch(e){l("rounds_list_p pageshow "+e);}
	});
	
	$('#rounds_list_p').live('pagebeforehide', function(e,d){
		$('#rounds_list_p').removeData('localque');
		$('#rounds_list_p').removeData('rl_shw');
		$('#rounds_list_p').removeData('rl_cnt');
		$('#rounds_list_p').removeData('rl_pos');
	});
}) (jQuery);

/*
	Cordova - Golfer's Dashboard GolfCourse Data
	Copyright (c) 2012 Indi
 
	本来ライブラリ的に分けるべきだよね…jQueryに乗っかってるけど。
*/
//<![CDATA[

function GolfCourseData() {
	this.id			= 0;	//	from server. cc_id
	this.name		= "dummy name";
	this.update		= "19000101";	//
	
	this.address	= "dummy address";
	this.phone		= "du-mmyp-hone";

	this.reserve_dd_id	= 0;
	this.latitude	= 0.0;
	this.longitude	= 0.0;

	this.max_course		=	0;	//	N
	this.course_data	=	[];	//	Nx	CourseData
}

// メソッド
GolfCourseData.prototype.getCourseData = function(c) {
	return this.course_data[c];
};
GolfCourseData.prototype.dump = function(c) {
	var	str="dump GolfCourseData\n";
	str += "  id\t: "+this.id;
	str += "\nname\t: "+this.name;
	str += "\naddr\t: "+this.address;
	str += "\n tel\t: "+this.phone;
	str += "\n reserve_dd_id\t: "+this.reserve_dd_id;
	str += "\ncourses\t: "+this.max_course;
	l(str);
	
	if (this.max_course > 0) {
		for(var i in this.course_data) {
			this.course_data[i].dump();
		}
	}
	return;
};

function CourseData() {
	this.id		=	0;
	this.name	=	"dummy hole name";
	this.desc	=	"hole description";
	this.holecount	=	9;	//	9 || 18

	this.pars	= [];	//	9x	[5,4,3,4,5,4,3,4,5],
	this.hcds	= [];	//	9x	[10,11,12,13,14,15,16,17,18],
	
	this.teecount	= 0;
	this.tee_data	= [];	//	TeeData
}

CourseData.prototype.dump = function(c) {
	try{
		var	str="dump CourseData";
		str += "\n  id\t: "+this.id;
		str += "\nname\t: "+this.name;
		str += "\nholes\t: "+this.holecount;
		
		str += "\npars\t: "+this.pars;
		str += "\nhcds\t: "+this.hcds;
		
		str += "\ntees\t: "+this.teecount;
		l(str);
		
		if (this.teecount > 0) {
			for(var i in this.tee_data) {
				this.tee_data[i].dump();
			}
		}
	} catch(e){l("in CourseData "+e);}
};


function TeeData() {
	this.id		= -1;
	this.name	= "default tee name";
	this.yards	= [];	//	9x	[401,301,201,302,402,303,202,304,403],
}

TeeData.prototype.dump = function(c) {
	try {
		var	str="dump TeeData";
		str += "\nname\t: "+this.name;
		str += "\nyards\t: "+this.yards;

		l(str);
	} catch(e){l("in TeeData "+e);}
};



function RoundData() {
	this.sdb_id	= -1;	//	round id
	this.id		= -1;	//	
	this.date	= -1;	//	unixtime?

	this.weather	= -1;
	this.wind		= -1;

	this.golfcourse_id	= -1;
	this.in_course_id	= -1;	//	CourseData()	GolfCourseData中のidで判断
	this.out_course_id	= -1;	//	CourseData()	GolfCourseData中のidで判断
	this.in_tee_id		= -1;
	this.out_tee_id		= -1;

	this.max_players	= 0;
	this.scores			= [];	//	Score()

	/* セーブするにはゴミ */
//	this.golfcourse	= null;	//	GolfCourseData()
//	this.in_tee=null;	//	TeeData(). but copied from CourseData
//	this.out_tee=null;
	
	this.golfcoursename = "";
	this.pars=[];
	this.hcds=[];
	this.yards=[];
}


RoundData.prototype.dump = function(c) {
	var	str="dump RoundData";
	str += "\nid\t: "+this.id;
	str += "\ndate\t: "+this.date;
	
	str += "\nweather\t: "+this.weather;
	str += "\nwind\t: "+this.wind;
	str += "\nout_course_id\t: "+this.out_course_id;
	str += "\nin_course_id\t: "+this.in_course_id;
	str += "\nout_tee_id\t: "+this.out_tee_id;
	str += "\nin_tee_id\t: "+this.in_tee_id;
	
	str += "\nmax_players\t: "+this.max_players;
	l(str);
};

function HoleScore() { 
	this.holenum	= 0;
	this.shot	= 0;
	this.putt	= 0;
	this.details	= [];	//	DetailShot()

	//	new
	this.fairwaykeep=0;
	this.ob=0;
	this.penalty=0;
	this.bunker=0;
}

function DetailShot() {
	this.shotnum	= 0;
	this.gear	= 0;
	this.lie	= 0;
}

function Score() {
	this.player		= null;	//	Player()
	this.holescores	= [];	//	HoleScore()
}

function Player() {
	this.id	= 0;				//	uniq (shotbook_id?)
	this.facebook_id = "";		//	for facebook
	this.contact_id	= "";		//	for congtact
	this.gf_flag	= false;	//	golfriend
	this.c_flag		= false;	//	contact
	this.di_flag	= false;	//	direct input
	this.name		= "dummy player name";
	this.sex		= 0;
	this.photourl	= "";
	this.handicap	= 100.0;
}

function Sums() {
	this.pcnt_sum = { '0':0, '3':0, '4':0, '5':0 };	//	計算対象ホール数
	this.putt_sum = { '0':0, '3':0, '4':0, '5':0 };	//	パット数
	this.shot_sum = { '0':0, '3':0, '4':0, '5':0 };	//	ショット数
	this.gir0_sum = { '0':0, '3':0, '4':0, '5':0 };	//	GIR パーオン率用
	this.girb_sum = { '0':0, '3':0, '4':0, '5':0 };	//	GIRBOGEY
	this.parp_sum = {
		'-2':{ '0':0, '3':0, '4':0, '5':0 },	//	EAGLE - par3で?
		'-1':{ '0':0, '3':0, '4':0, '5':0 },	//	BARDY
		 '0':{ '0':0, '3':0, '4':0, '5':0 },	//	PAR
		 '1':{ '0':0, '3':0, '4':0, '5':0 },	//	BOGEY
		 '2':{ '0':0, '3':0, '4':0, '5':0 }		//	DOUBLE BOGEY +
	};
	this.para_sum = { '0':0, '3':0, '4':0, '5':0 };	//	パーセーブ率計算用(parp -2..0の和)
	
	this.sandsaves_sum = 0;	//	サンドセーブ率用(hole in - 1 or -2 がBunkerの時　+1) / バンカーに入ったホール数。
	this.bunkerhole_sum = 0;//	バンカーに捕まったホール数
	
	this.bunker_sum = 0;	//	バンカー率(結果がxxの回数) / ショット数
	this.penalty_sum = 0;	//	ペナルティ率(結果がxxの回数) / ショット数
	this.ob_sum = 0;		//	OB率(結果がxxの回数) / ショット数

	this.fairwaykeep_sum = 0;
	this.recover_sum = 0;	//	リカバー率用 パーの時にパットが0か1/パーのホール数
}

function EventListItem() {
	var	evtbl_main_id = -1;
	var	title = "dummy event name";
	var	start_time = -1;
	var	end_time = -1;
	var	event_owner_name = "name?";
	var	event_owner_facebook_id = -1;
}

function MyEventListItem() {
	var	evtbl_main_id = -1;
	var	title = "dummy event name";
	var	start_time = -1;
	var	end_time = -1;
}

function EventDetails() {
	var	evtbl_main_id = -1;
	var	title = "dummy event title";
	var	start_time = -1;
	var	end_time = -1;
	var	event_owner_name = "dummy owner name";
	var	event_owner_facebook_id = -1;
	var	comment = "dummy owner commnet";
	
	var	request_user_list = [];
}

function RequestUserListItem() {
	var	facebook_id = -1;
	var	name = "dummy request user name";
	var	status = 0;	//	0,1,2,3
}


function HistoryQueData() {
	this.round_id = -1;
	this.local_id = -1;
	this.modified = -1;	//	datetime( unixtimestamp?
	this.new_in_server = false;
	this.new_in_local = false;
}



//	定数
function GolfGear() {
	//	失敗。idとか各種名称をパックしてからやればよかった。とても面倒な事になってる。
	//	名前を追加したら、long,short,idを追加する事。
	this.wood_name = ["1 wood", "2 wood", "3 wood", "4 wood", "5 wood", "7 wood", "9 wood", "11 wood", "13 wood"];
	this.wood_long_name = ["Driver", "Brashie", "Spoon", "Baffy", "Cleek", "7 wood", "9 wood", "11 wood", "13 wood"];
	this.iron_name = ["1 Iron", "2 Iron", "3 Iron", "4 Iron", "5 Iron", "6 Iron", "7 Iron", "8 Iron", "9 Iron"];
	this.iron_long_name = ["Driving Iron", "Mid Iron", "Mid Mashie", "Mashie Iron", "Mashie", "Spade Mashie", "Mashie Niblic", "Lofter", "Niblic"];
	this.wedge_name = ["Pitching Wedge", "Approach Wedge", "Sand Wedge", "Lob Wedge", "Gap Wedge", "Utility Wedge" ];
	this.putter_name = ["Putter" , "-"];
	
	this.wood_short_name = ["1w", "2w", "3w", "4w", "5w", "7w", "9w", "11w", "13w"];
	this.iron_short_name = ["1i", "2i", "3i", "4i", "5i", "6i", "7i", "8i", "9i"];
	this.wedge_short_name = ["pw", "aw", "sw", "lw", "gw", "uw"];
	this.wedge_lshort_name = ["PW", "AW", "SW", "LW", "GW", "UW"];
	this.putter_short_name = ["pt", "-"];

	this.wood_id = [101, 102, 103, 104, 105, 107, 109, 110, 113];
	this.iron_id = [201, 202, 203, 204, 205, 206, 207, 208, 209];
	this.wedge_id = [301, 302, 303, 304, 305, 306];
	this.putter_id = [401, 0];

	this.clublist = (this.wood_name).concat(this.iron_name, this.wedge_name, this.putter_name);
	this.clubLlist = (this.wood_long_name).concat(this.iron_name, this.wedge_name, this.putter_name);
	this.clubtlist = (this.wood_long_name).concat(this.iron_name, this.wedge_lshort_name, this.putter_name);
	this.clubslist = (this.wood_short_name).concat(this.iron_short_name, this.wedge_short_name, this.putter_short_name);
	this.clubidlist = (this.wood_id).concat(this.iron_id, this.wedge_id, this.putter_id);
}

GolfGear.prototype.gettitle = function(id) {
	var	chk = -1;
	for(var	i in this.clubidlist) {
		if (id == this.clubidlist[i]) {
			chk = i;
			break;
		}
	}
	if (chk < 0) {
		return null;
	}
	return this.clubtlist[i];
};

GolfGear.prototype.getLtitle = function(id) {
	var	chk = -1;
	for(var	i in this.clubidlist) {
		if (id == this.clubidlist[i]) {
			chk = i;
			break;
		}
	}
	if (chk < 0) {
		return null;
	}
	return this.clubLlist[i];
};


function Shot2Name() {
	this.under = [ "Phoenix", "Ostrich", "Condor", "Albatross", "Eagle", "Birdie" ];
	this.par = [ "Par" ];
	this.over = [ "Bogey" ];
}

function ShotResults() {
	this.etitle = [ "-", "Fairway", "Rough", "Bunker", "Water Hazard", "OB", "Penalty", "Green", "Hole In" ];
	this.title = [ "-", "フェアウェイ", "ラフ", "バンカー", "ウォーター ハザード", "OB", "ペナルティ", "グリーン", "ホールイン" ];
	this.id = [ 0, 10, 20, 30, 40, 50, 60, 70, 80 ];
	this.bunker = 30;
	this.ob = 50;
	this.penalty = 60;
	this.green = 70;
	this.holein = 80;
}

ShotResults.prototype.gettitle = function(id) {
	var	chk = -1;
	for(var	i in this.id) {
		if (id == this.id[i]) {
			chk = i;
			break;
		}
	}
	if (chk < 0) {
		return null;
	}
	return this.title[i];
};


function Weather() {
	this.title = [ "快晴", "晴曇", "曇", "雨", "雪" ];
}

function Wind() {
	this.title = [ "無風", "微風", "弱風", "強風" ];
}

function Prefecture() {
	this.title = [
	"北海道",	"青森県",	"岩手県",	"宮城県",	"秋田県",	"山形県",	"福島県",	"茨城県",	"栃木県",	"群馬県",
	"埼玉県",	"千葉県",	"東京都",	"神奈川県",	"新潟県",	"富山県",	"石川県",	"福井県",	"山梨県",	"長野県",
	"岐阜県",	"静岡県",	"愛知県",	"三重県",	"滋賀県",	"京都府",	"大阪府",	"兵庫県",	"奈良県",	"和歌山県",
	"鳥取県",	"島根県",	"岡山県",	"広島県",	"山口県",	"徳島県",	"香川県",	"愛媛県",	"高知県",	"福岡県",
	"佐賀県",	"長崎県",	"熊本県",	"大分県",	"宮崎県",	"鹿児島県",	"沖縄県" ];
}

Prefecture.prototype.getnumber = function(text) {
	if (text || typeof(text)=="string") {
		for(var i in this.title) {
			if (this.title[i] == text) {
				return i;
			}
		}
	}
	return -1;
};

//]]>

/*
 Cordova - Golfer's Dashboard DB
 Copyright (c) 2012 Indi
 */


(function($) {
	
	$('#list_of_data_p').live('pagebeforeshow', function(e,d){
		try {
		var	params = $(this).data('params');
		var	txt="";
		if ($(this).data && $(this).data('params')) {
			var	list = $(this).data('params')["item"];
			for(var i in list) {
				var	id = list[i].id;
				var	n = list[i].name;
				
				txt += "<li style='margin:0px; padding:2px;' data-theme='c'><input id='cb-" +id+ "' type='checkbox' name='" +n+ "' value='" +id+ "' class='' /><label for='cb-" +id+ "'>" +n+ "</label></li>";
			}
			$('#data_list').append(txt); 
			
			//	$('input[type="checkbox"]', $(this)).checkboxradio();
			$('#data_list').listview('refresh');	//	変更が一個の時のみ？
			//	$('#data_list').listview();	//	callしないとCSSが適用されない
			$('#data_list', $(this)).trigger('create');
		}
		}catch(e){l(e);}
	});
	
	$('#list_of_data_p').live('pageshow', function(e,d){
		try {
			$.mobile.activePage.data('ui.prevPage',d.prevPage);
			l("prev " + d.prevPage.attr('id'));
			
			$('#data_list_count').text("0");
			
		}catch(e){l(e);}
		
		$('input:checkbox', $(this)).change(function() {
			l("input:checkbox changed " + $(this).attr('id'));
			
			var n = $('#data_list_count').text();	//	get
			var	c = parseInt(n);
			var	x = ($(this).attr('checked'))?1:-1;
			
			$('#data_list_count').text(c+x);		//	set
		});
	});
	
	$('#list_of_data_p').live('pagebeforehide', function(e,d){
		$('input:checkbox', $(this)).unbind('change');
	});
	
	$('#list_of_data_p').live('pageinit', function(e,d){
		$('#data_list_cancel', $('#list_of_data_p')).on('click', function(){
			l("push cancel!!");
			return true;	//	falseで画面遷移無し
		});
		
		$('#list_of_data_form', $('#list_of_data_p')).on('submit', function(){
			var	al=new Array();
			var	ll=$(this).serializeArray();	//	[{name:"", value:on},{},...]
			for(var i in ll) {
				l("submit serializeArray "+i+":"+ll[i]["value"]+":"+ll[i]["name"]);
				var	p=new Player();
				p.c_flag=true;
				p.contact_id=ll[i]["value"];
				p.name=ll[i]["name"];
				
				al.push({"player":p});
			}
			
			var previousPage=$.mobile.activePage.data('ui.prevPage');
			$("#"+previousPage.attr('id')).data('add_list', al);
			l("move back to #"+previousPage.attr('id'));
			
			l("history count " + history.length);
			history.back();
			return false;
		});
	});
	
}) (jQuery);


/*
 Cordova - Golfer's Shotbook Local DB
 Copyright (c) 2012 Indi
*/

var	sb_l_db=null;

function initLocalDB() {
	var storage = window.localStorage;
	sb_l_db = storage;
	if (sb_l_db) {
		return true;
	} else {
		return false;
	}
}

function clearLocalDB() {
	if (sb_l_db) {
		sb_l_db.clear();
		return true;
	}
	return false;
}

function setDataToLocal(key, value){
	if (sb_l_db) {
		sb_l_db.setItem(key, value);
		return true;
	}
	return false;
}

function getDataFromLocal(key){
	if (sb_l_db) {
		return sb_l_db.getItem(key);
	}
	return null;
}

function removeDataFromLocal(key){
	if (sb_l_db) {
		sb_l_db.removeItem(key);
		return true;
	}
	return false;
}

/*	sample
 
 window.localStorage.setItem("key", "value");
 var keyname = window.localStorage.key(i);

 // keyname is now equal to "key"
 var value = window.localStorage.getItem("key");
 
 // value is now equal to "value"
 window.localStorage.removeItem("key");
 window.localStorage.setItem("key2", "value2");
 window.localStorage.clear();
 // localStorage is now empty

 */

$(function() {
  /*
   
   */
});


/*!
 * config.js for jQuery JavaScript Library v1.7.2
 *
 * Copyright 2012, Indi
 *
 * Date: Wed May 01 12:46:34 2012 -0700
 */

$(document).bind('mobileinit', function(){
	$.mobile.loadingMessageTextVisible=true;
	$.mobile.loadingMessage='ローディング中';
	$.mobile.pageLoadErrorMessage='読み込みを失敗しました。';
	$.mobile.page.prototype.options.backBtnText='戻る';
	$.mobile.dialog.prototype.options.closeBtnText='閉じる';
	$.mobile.selectmenu.prototype.options.closeBtnText='閉じる';
	$.mobile.listview.prototype.options.filterPlaceholder='キーワードを入力してください。';

	$.mobile.touchOverflowEnabled=true;
});


/*
 Cordova - Golfer's HOME
 Copyright (c) 2012 Indi
 */

function personalFormSetEnable(mode){
	if (mode == true) {	
		$('#pi_myname').removeAttr("disabled");
		$('#pi_sex_radio').removeAttr("disabled");
		$('#pi_mailaddr').removeAttr("disabled");
		$('#pi_phone').removeAttr("disabled");
		$('#pi_handicap').removeAttr("disabled");
		$('#pi_ok_btn').removeAttr("disabled");
		if (IS_NATIVE_SELECTMENU) {
			$('#pi_prefecture_n').show();
			$('#pi_prefecture_n').removeAttr("disabled");
			$('#pi_prefecture').hide();
		} else {
			$('#pi_prefecture_n').hide();
			$('#pi_prefecture').removeAttr("disabled");
			$('#pi_prefecture').show();
		}
	} else {
		$('#pi_myname').attr("disabled", "disabled");
		$('#pi_sex_radio').attr("disabled", "disabled");
		$('#pi_mailaddr').attr("disabled", "disabled");
		$('#pi_phone').attr("disabled", "disabled");
		$('#pi_handicap').attr("disabled", "disabled");
		$('#pi_ok_btn').attr("disabled", "disabled");
		if (IS_NATIVE_SELECTMENU) {
			$('#pi_prefecture_n').show();
			$('#pi_prefecture_n').attr("disabled", "disabled");
			$('#pi_prefecture').hide();
		} else {
			$('#pi_prefecture_n').hide();
			$('#pi_prefecture').attr("disabled", "disabled");
			$('#pi_prefecture').show();
		}
	}
}

function setPersonalInformation() {
	
	var	opt = { "p":user_info_update_cmd };
	
	var	matcher = {
//		"pi_myname":"pi_sns_name",
		"pi_birthday":"birthday",
		"pi_sex":"sex",
		"pi_prefecture":"address",
		"pi_mailaddr":"mailaddr",
		"pi_phone":"tel",
//		"pi_height":"my_height",
//		"pi_weight":"my_weight",
		"pi_handicap":"handicap",
//		"pi_startday_golf":"golf_start_date",
//		"pi_golfcourse":"member_cc_id",
		"pi_headspeed":"head_speed"
		
//		"pi_best_score":"best_score",
//		"pi_average":"average",
//		"pi_putting_average":"putting_average",
//		"pi_golf_friend_count":"golf_firend_count",
		
//		"pi_user_id":"user_id",
//		"pi_sns_id":"sns_id",
//		"pi_sns_icon":"sns_icon",
	};
	
	try {
		var	json = getDataFromLocal("mydata");
		var	mydata = $.parseJSON(json);
		
		for(var i in matcher) {
			var	j = matcher[i];
			if (j) {
				var	value = mydata[i];
				if (j == "birthday" || j == "golf_start_date") {
					value = value.replace(/-/g, "/");
				}
				opt[j] = value;
			}
			else l("not "+i);
		}
	} catch(e){l(e);}
	
	if (online) {
		if (fblogined) {
			l("SEND "+$.JSONstr(opt));
			$.post(root_url, opt, callbackSuccessOrNot, 'json');
		}
	}
}

function callbackSuccessOrNot(response, textStatus, XMLHttpRequest) {
	var	enc = $.toJSON(response);
	if (checkOkNg(enc)) {
	}
}

function sw_pf_done() {
	var results = SpinningWheel.getSelectedValues();
	$("#pi_prefecture span.ui-btn-text").text(results["values"][0]);
}


(function($) {
	
	$('#player_infoedit_p').live('pageinit', function(e,d){

		if (IS_NATIVE_SELECTMENU) {
			$('#pi_prefecture_n', $(this)).makePrefectureSelector();
			$('#pi_prefecture_n', $(this)).parent().show();
			$('#pi_prefecture', $(this)).hide();
		} else {
			$('#pi_prefecture_n', $(this)).parent().hide();
			$('#pi_prefecture', $(this)).show();
		}
		
		$('#pi_ok_btn', $('#player_infoedit_p')).live('click', function(e,d){
			if (!fblogined) {
				return true;
			}
			
			try{
				var	_mydata = $.parseJSON(getDataFromLocal("mydata"));
				$('input', '#test_pi_form').each(function(){
					if ($(this).attr('id').match("^pi_sex_")) {
						if ($(this).attr('checked')) {
							_mydata["pi_sex"]=$(this).val();
						}
					} else {
						_mydata[$(this).attr('id')]=$(this).val();
					}
				});

				if (IS_NATIVE_SELECTMENU) {
					_mydata['pi_prefecture']=$('#pi_prefecture_n').val();
				} else {
					_mydata['pi_prefecture']=$('#pi_prefecture span.ui-btn-text').text();
				}
/*
				var	txt="";
				if (!$('#pi_phone').val()) {
					txt+=" 誕生日";
				}
				if (!$('#pi_phone').val()) {
					txt+=" 電話番号";
				}
				if (!$('#pi_mailaddr').val()) {
					txt+=" メールアドレス";
				}
				if (txt.length > 0) {
					navigator.notification.alert(txt+"を入力してください。", null, "お知らせ");	
					return false;
				}
*/
				removeDataFromLocal("mydata");
				setDataToLocal("mydata", $.toJSON(_mydata));
			
				setPersonalInformation();
			}catch(e){l(e);}
		});
		
		$('#pi_prefecture').live('click', function(e,d) {
			var	vals=new Array();
			var	tw = new Prefecture();
			var	max = tw.title.length;

			var	selected = parseInt(tw.getnumber($('#pi_prefecture span.ui-btn-text').text()));
			for(var i=0; i<max; i++) {
				vals[i] = tw.title[i];
			}

			SpinningWheel.addSlot(vals, 'center', selected);
			SpinningWheel.setCancelAction(sw_cancel);
			SpinningWheel.setDoneAction(sw_pf_done);
			
			SpinningWheel.open();
		});

	});
	
 
	$('#player_infoedit_p').live('pagebeforeshow', function(e,d){
		try{
			//	BUILD SCREEN
			/*
			if (IS_NATIVE_SELECTMENU) {
				$('#pi_prefecture_n', $(this)).makePrefectureSelector();
				$('#pi_prefecture_n', $(this)).show();
				$('#pi_prefecture', $(this)).hide();
			} else {
				$('#pi_prefecture_n', $(this)).hide();
				$('#pi_prefecture', $(this)).show();
			}
			*/
			//	SET DEF DATA
			var	_mydata = getDataFromLocal("mydata");

			if (_mydata) {
				var	mydata = $.parseJSON(_mydata);
			
				$('input', '#test_pi_form').each(function(){
					var	idt = $(this).attr('id');

					if (idt.match("^pi_sex_")) {
						var sex = mydata.pi_sex;
						$(this).attr('checked',false).checkboxradio("refresh");
						if (sex == 1) {
							if (idt == "pi_sex_male") {
								$(this).attr('checked',true).checkboxradio("refresh");
							}
						} else if (sex == 2) {
							if (idt == "pi_sex_female") {
								$(this).attr('checked',true).checkboxradio("refresh");
							}
						}
					} else {
						var txt = mydata[idt];
						$(this).val(txt);	//	$('#'+idt).val(txt)
					}
				});
/*				
				$('select', '#test_pi_form').each(function(){
					var	idt = $(this).attr('id');
					if (idt == "pi_prefecture") {
						var txt = mydata[idt];

//						$(this)[0].selectedIndex = parseInt(txt) + 1;	//	都道府県
						
						var	pref=new Prefecture();
						var	selected = parseInt(pref.getnumber(txt));
						
						l("pi_prefecture "+mydata[idt]+" count "+selected);
						
						$(this)[0].selectedIndex = selected + 1;	//	都道府県
						$(this).selectmenu("refresh");
					}
				});
*/

				if (IS_NATIVE_SELECTMENU) {
					var	p = new Prefecture();
					var	i = p.getnumber(mydata["pi_prefecture"]);
					$('#pi_prefecture_n', $('#player_infoedit_p'))[0].selectedIndex = i + 1;
					$('#pi_prefecture_n', $('#player_infoedit_p')).selectmenu("refresh");
				} else {
					$("#pi_prefecture span.ui-btn-text").text(mydata["pi_prefecture"]);
				}
				
				$('#pi_myname', $('#player_infoedit_p')).text(mydata["pi_myname"]);
			}

		} catch(e){l(e);}
	});

	$('#player_infoedit_p').live('pageshow', function(e,d){
		if (!fblogined) {
			navigator.notification.alert("shotbookにログインしていないので、編集結果は反映されません。", null, "警告");
			personalFormSetEnable(false);
		} else {
			personalFormSetEnable(true);
		}
	});
})(jQuery);


/*
	Cordova - Golfer's Dashboard DB
Copyright (c) 2012 Indi
*/

function resetForm(form) {
	form.find('input:text, input:password, input:file, select, textarea').val('');
	form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
	
	var	str = getTodayString();
	form.find('input:[type=date]').attr({'value':str});
}


//	jQuery.now() = (New Date()).getTime()
//	日付valをUnix Timestampに。
function dateParseUnixTimestamp(val) {
	var	tz = new Date();

	var n = tz.getTimezoneOffset();	//	-9 * 60
//	var	y = tz.getFullYear();
//	var	s_st = getSummerTimeStart(y);
//	var	e_st = getSummerTimeEnd(y);

	var	sp;
	sp = val.split("-");
	if (sp.length != 3) {
		sp = val.split("/");
	}

	var	d = new Date(sp[0], sp[1] - 1, sp[2], 0, 0, 0);
	var	ut = d.getTime();

	l("00 "+d.toLocaleString()+" "+d.toString()+" unixtime "+ut);

	var tst = n / 60;	// -9
/*	var	pdt = 0;
	if (s_st < ut && ut < e_st) {
		pdt = -8;	//	Pacific Daylight Saving Time
	} else {
		pdt = -7;	//	Pacific Standard Time
	}
 */
	var	pdt = -7;
	tst += pdt;
	tst = -tst;
	d.setHours(tst);
	ut = d.getTime();
	l(tst +" "+d.toLocaleString()+" "+d.toString()+" unixtime "+ut);

	return Math.round(d.getTime() / 1000);
	/*
	var	sp;
	sp = val.split("-");
	if (sp.length != 3) {
		sp = val.split("/");
	}
	var	d = new Date(sp[0], sp[1] - 1, sp[2]);
	return Math.round(d.getTime() / 1000);
	*/
}

//	本日をsplitcharのYYYY-MM-DDに
function getTodayString(splitchar, dd) {
	
	splitchar = splitchar || '-';
	dd = dd || new Date();
	//	var	dd = new Date();
	var	y = dd.getYear();
	var	m = dd.getMonth() + 1;
	var	d = dd.getDate();
	if (y < 2000) { y += 1900; }
	if (m < 10) { m = "0" + m; }
	if (d < 10) { d = "0" + d; }
	var	str = ''+y+splitchar+m+splitchar+d;
	
	return str;
}
function getTomorrowString(splitchar, dd) {
	
	splitchar = splitchar || '-';
	dd = dd || new Date();
	//	var	dd = new Date();
	var	y = dd.getYear();
	var	m = dd.getMonth() + 1;
	var	d = dd.getDate() + 1;
	if (y < 2000) { y += 1900; }
	if (m < 10) { m = "0" + m; }
	if (d < 10) { d = "0" + d; }
	var	str = ''+y+splitchar+m+splitchar+d;
	
	return str;
}

function getStringFromUnixTimestamp(stamp) {
	var	dd = new Date(stamp * 1000);
	return getTodayString('-', dd);
}

function getStringFromText(text) {
	var	dd = new Date(text);
	return getTodayString('-', dd);
}



function removeFromDataListsInMyInvPage(facebook_id) {
	var	list = $('#make_inv_p').data('lists');
	var	newlist = new Array();
	if (list) {
		for(var i in list) {
			var	obj = list[i];
			if (obj.facebook_id == facebook_id) {
				obj.facebook_id = -1;
		//		break;
			} else {
				var	tmp = $.cloneObject(obj, true);
				newlist.push(tmp);
			}
		}
		$('#make_inv_p').removeData('lists');
		$('#make_inv_p').data('lists', newlist);
	}
}

function clearMinvForm() {
	$('form.#minv_form').each(function() {
		this.reset();
	});
	
	$('#countdown', $('#make_inv_p')).text("0");
	$('#minv_gr_f_list li').not("[data-role='list-divider']").remove();
	$('#minv_gr_f_count', $('#make_inv_p')).html("0");
    $('#minv_gr_f_list').listview();
    $('#gr_area').selectmenu();
	
	$('#make_inv_p').removeData('lists');
}

function checkDeleteFromSelectedGolfriendsList(facebook_id){
	try{
		
		l("checkDeleteFromSelectedGolfriendsList "+facebook_id);
		var	list = $('#make_inv_p').data('lists');
		var	name;
		if (list) {
			for(var i in list) {
				var	obj = list[i];
				if (obj.facebook_id == facebook_id) {
					name = obj.name;
					break;
				}
			}
		} else {
			return false;
		}
		
		navigator.notification.confirm(
		""+name+" さんをリストから削除します。\nよろしいですか？",
		function(index) {
			if (index == 2) {
				var	liid = "#li_"+facebook_id;
				removeFromDataListsInMyInvPage(facebook_id);
				$('#minv_gr_f_list').children(liid).remove();
				$('#minv_gr_f_list').listview('refresh');

				var	c=$('#minv_gr_f_list li').not("[data-role='list-divider']").size();
				$('#minv_gr_f_count', $('#make_inv_p')).html(""+c);
			}
		},	// callback (index of button pressed)
		'警告', 'いいえ,はい' );

	}catch(e){l("checkDeleteFromSelectedGolfriendsList "+e);}
}


function addFacebookFriendsToEvent() {
	var	event = {data:{page:'#golfriend_list_p', params:{shotbook_only_flag:false, selectable:true}}};
	moveto(event);
}


function removeGFfromInvList(id) {
	l("will delete id:"+id);
}

function sendMyEvent(options) {
	$.mobile.showPageLoadingMsg();
	
	var	opt = {"p":event_register_cmd};
	if (options) {
		for(var i in event_register_opt) {
			var	key = event_register_opt[i];
			if (options[key]) {
				opt[key] = options[key];
			}
		}
	}
	
	l("opt "+$.JSONstr(opt));
	
	if (online) {
		l("ONLINE...");
		try {
			$.post(root_url, opt, function(response) {
				var	enc = $.toJSON(response);
				l(enc);
				if (checkOkNg(enc)) {
					clearMinvForm();
					navigator.notification.alert("お誘いしました！", null, "完了");
					history.back();
				} else {
					navigator.notification.alert("ネットワークエラー\n"+$.evalJSON(enc).error_list[0], null, "エラー");
				}
			}, 'json');
		} catch(e){l(e);}
	} else {
		l("NO ONLINE...");
		$.mobile.hidePageLoadingMsg();
		navigator.notification.alert("ネットワークにつながっていません。", null, "エラー");
	}
}

function sw_mi_done() {
	var results = SpinningWheel.getSelectedValues();
	$("#gr_area span.ui-btn-text").text(results["values"][0]);
}


(function($) {
	
	$('#make_inv_p').live('pageinit', function(e,d) {

		if (IS_NATIVE_SELECTMENU) {
			$('#gr_area_n', $('#make_inv_p')).makePrefectureSelector();
			$('#gr_area_n', $('#make_inv_p')).parent().show();
			$('#gr_area', $('#make_inv_p')).hide();
		} else {
			$('#gr_area_n', $('#make_inv_p')).parent().hide();
			$('#gr_area', $('#make_inv_p')).show();
		}

		$('#minv_form', $('#make_inv_p')).submit(function(e) {
			l("SUBMIT!!");
			e.preventDefault();
			e.stopPropagation();
			return false;
		});

		$('a', $('#make_inv_p')).live('click', function(e) {
			var	_id = $(this).attr('id');

			l("A CLICK "+_id);
			if (_id) {
				if (_id == "minv_cancel") {
					clearMinvForm();
					return true;
				} else if (_id == "minv_gr_f_add") {
					addFacebookFriendsToEvent();
					return false;
					
				} else if (_id == "gr_area"){

					if (IS_NATIVE_SELECTMENU) {
						return false;
					}
					//	for NOT NATIVE SELECTMENU
					var	vals=new Array();
					var	tw = new Prefecture();
					var	max = tw.title.length;

					var	selected = parseInt(tw.getnumber($('#pi_prefecture span.ui-btn-text').text()));
					vals[0] = "都道府県";
					for(var i=1; i<=max; i++) {
						vals[i] = tw.title[i];
					}
					SpinningWheel.addSlot(vals, 'center', selected);
					SpinningWheel.setCancelAction(sw_cancel);
					SpinningWheel.setDoneAction(sw_mi_done);
					
					SpinningWheel.open();

					return false;
				}
				
				var	options = {};
				var	obj = $('#minv_form', $('#make_inv_p')).serializeArray();
				
				var	_pref;
				var	pref = "";

				if (IS_NATIVE_SELECTMENU) {
					pref = $('#gr_area_n', $('#make_inv_p')).val();
				} else {
					pref = $("#gr_area span.ui-btn-text").text();
				}
				if (pref == "都道府県") {
					pref = "";
				}
				l("PREF "+pref);
				
				for(var i in obj) {
					var	key;
					var	val;
					for(var j in obj[i]) {
						if (j == "name") {
							key = obj[i][j].substring(3);
							if (key == "date") {
								key = "start_time";
							}
						} else {
							val = obj[i][j];
						}
					}
					
					if (key == "start_time") {
						//	val	YYYY-MM-DD;	//	datebox YYYY-MM-DD
						var	s = dateParseUnixTimestamp(val);	// 86400
						var	e = Math.round(s + 86399);
						options["start_time"] = s;
						options["end_time"] = e;
						l("start_time "+ val + " s "+ s + " e "+ e);
					} else {
						if (key == "title" && _pref >= 0){
							val += "【"+pref+"】";
						}
						if (key != "area") {
							options[key]=val;
						}
					}
				}
				
				l("obj "+$.JSONstr(obj));
				
				var	list = $('#make_inv_p').data('lists');
				if (list) {
					var	c = 0;
					var	newlist = [];
					for(var i in list) {
						var	obj = list[i];
						if (obj.facebook_id > 0) {
							newlist.push(obj.facebook_id);
							c++;
						}
					}
					if (c == 0) {
						navigator.notification.alert("お友達を誘ってください。", null, "お知らせ");
						return false;
					}
					options["facebookids"]=newlist;
				} else {
					navigator.notification.alert("お友達を誘ってください。", null, "お知らせ");
					l("NO USERS");
					return false;
				}

				l("opt "+$.JSONstr(options));
				if ($('#minv_form').valid()) {
					sendMyEvent(options);
					return false;
				} else {
					var	txt="";
					if (!$('#gr_title').val()) {
						txt+=" タイトル";
					}
					if (!$('#gr_comment').val()) {
						txt+=" コメント";
					}
					if (!$('#gr_date').val()) {
						txt+=" 日付";
					}
					
					navigator.notification.alert(txt+"を入力してください。", null, "お知らせ");
					return false;
				}
			}
		});

		$('#gr_comment').bind('keyup change', function(event) {
			var currentString = $("#gr_comment").val();
			
			$('#countdown', $('#make_inv_p')).text(currentString.length);
			l("CURRENT STRING LENGTH " + currentString.length);
			if (currentString.length <= 100 )  {  //or whatever your number is
				//do some css with your div
				l(" LESS THAN 100 ");
			} else {
				l(" OVER 100");
				//do some differnt stuff with your div
			}
		});

	});

	$('#make_inv_p').live('pagebeforeshow', function(e,d){
		try{
			$('#minv_h_submit', $(this)).hide();
			
			var	previd = d.prevPage.attr('id');
			l("prev id "+previd);
			if (previd == "make_invites_p") {
				l("CLEAR");
				clearMinvForm();
			}
			
			var	list = $(this).data('lists');
			if (list) {
				$('#minv_gr_f_list li').not("[data-role='list-divider']").remove();

				var	txt = "";
				for(var i in list) {
					var	obj = list[i];
					txt += "<li id='li_"+obj.facebook_id+"' data-icon='delete' ><a href='#' onclick='javascript:checkDeleteFromSelectedGolfriendsList("+obj.facebook_id+")'>"+obj.name+"</a></li>";
				}
				$('#minv_gr_f_list').append(txt).listview('refresh');
			} else {
				l("NO LISTS ");
			}
			
			var	c=$('#minv_gr_f_list li').not("[data-role='list-divider']").size();
			
			$('#minv_gr_f_count', $('#make_inv_p')).html(""+c);
			
			var	str;
			var	params=$(this).data('params');
			if (params && params["date"]) {
				str=getTodayString("/", params["date"]);
				l("PARAMS "+str);
			} else {
				str = getTomorrowString();
				l("GET TOM "+str);
			}
			$('#gr_date').attr({value:str});
		} catch(e){l(e);}

	});

	$('#make_inv_p').live('pageshow', function(e,d){
		try {
			$('#minv_form').validate({
				rules: {
					gr_date: {
						required: true,
						date: false
					},
					gr_title: {
						required: true
					},
					gr_comment: {
						required: true
					}
				}
			});
			
			$('#minv_gr_f_list').listview('refresh');
			
/*	初回のみにしたい。が、最悪送付後にクリアしよう。
			resetForm($('#minv_form'));
 			var	_mydata = getDataFromLocal("mydata");
			if (_mydata) {
				var	mydata = $.parseJSON(_mydata);
				var	pref = parseInt(mydata.pi_prefecture) + 1;
					
				$('#gr_area', $(this))[0].selectedIndex = pref;
				$('#gr_area', $(this)).selectmenu("refresh");
			}
 */
		}catch(e){l("sho..." +e);}
	});

}) (jQuery);

/*
 Cordova - shotbook Golfriend
 Copyright (c) 2012 Indi
 */

function showGolfriend(uid) {
	l(" showGolfriend : "+uid);
}

function nowEnableDownloading() {
	$('#loading_text_for_golfriendlist').slideUp("slow");
}

function nowDownloading() {
	$('#loading_text_for_golfriendlist').slideDown("slow");
}

(function($) {

	$('#golfriend_list_p').live('pageinit', function(e,d) {

		$('#gfl_readmore_btn', $('#golfriend_list_p')).live('click', function(e) {
			$(this).button('disable');
			getMoreGolfriendList();
		});
		
		$('#gfl_selok_btn', $('#golfriend_list_p')).live('click', function(e) {
			$('#gfl_selok_btn').button('disable');
			var i;
			var	ids = new Array();
			var	flist =$('#golfriend_list_p').data("gf_downloaded");
			for(i in flist) {
				l(flist[i].facebook_id + " "+flist[i].name);
			}
			
			l("CLICKED!");
			$('#golfriends_list').find("input:checkbox").each(
				function(){
					if ($(this).attr('checked')) {
						var	_id = $(this).attr('id');
						l( "SELECTED USER ID IS " + _id );
						var	fid = _id.substring(6)
						for(i in flist) {
							var obj = flist[i];
							if (obj.facebook_id == fid) {
								ids.push(obj);
								break;
							}
						}
					}
			});

			var	prevPage = $.mobile.activePage.data('ui.prevPage');
			l("PREV " + prevPage.attr('id'));
			prevPage.data('lists', ids);
			
			history.back();
			return false;
		});
	});
	
	$('#golfriend_list_p').live('pagebeforeshow', function(event, data) {
		try {
			$('#gfl_readmore_btn', $('#golfriend_list_p')).parents('.ui-btn').hide();
			
			$('#golfriends_list', $('#golfriend_list_p')).empty().listview('refresh');
			if (!online || !fblogined) {
				l("NO ONLINE or NO FB LOGINED");
//				nowEnableDownloading();

				$('#nonetwoerk_text_for_golfriendlist', $('#golfriend_list_p')).show();
				$('#gfl_selok_btn', $('#golfriend_list_p')).parents('.ui-btn').hide();
				return;
			}
		
			var	params=$(this).data('params');
			if (params) {
				var	flag=params["shotbook_only_flag"];
				var	slab=params["selectable"];
				
				$(this).data('shotbook_only_flag', flag);
				$(this).data('selectable', slab);
				
				if (slab) {
					$('#gfl_selok_btn').text("完了");
					$('#gfl_selok_btn', $(this)).parents('.ui-btn').show();
					$('#gfl_selok_btn').button('enable');
					
					$.mobile.activePage.data('ui.prevPage',data.prevPage);
					l("PREV " + data.prevPage.attr('id'));
				} else {
					$('#gfl_selok_btn', $(this)).parents('.ui-btn').hide();
				}
				getGolfriendList(flag, slab, { "offset":"0", "limit":30 });
			}
		} catch(e){l(e);}

	});

	$('#golfriend_list_p').live('pageshow', function(e,d) {
		$('#nonetwoerk_text_for_golfriendlist', $('#golfriend_list_p')).slideUp();
		
		nowEnableDownloading();
		if (online) {
			if (!fblogined) {
				$('#nonetwoerk_text_for_golfriendlist', $('#golfriend_list_p')).slideDown();
			}
		}
	});

	$('#golfriend_list_p').live('pagebeforehide', function(e,d) {
		$(this).removeData('ofs');	//	offset
		$(this).removeData('shw');	//	offset + shotbook item
//		$(this).removeData('lmt');	//	
		$(this).removeData('max');	//	max list item
		$(this).removeData('sum');	//	offset + facebook item
		
		$(this).removeData('shotbook_only_flag');
		$(this).removeData('selectable');
	});

	
}) (jQuery);


/*
 Cordova - Golfer's HOME
 Copyright (c) 2012 Indi
 */

function makeOptionYearManthList(pml) {
	try {
		if (IS_NATIVE_SELECTMENU) {
			var	txt = "";	//	txt += "<option value='0'>全期間</option>";
			var	max = pml.length;
			for(var i=0;i<max;i++) {
				var	ym=pml[i].split("-");
				var	y = ym[0];
				var	m = ym[1];
				txt += "<option value='" +y+""+m+ "'>" + y+"年"+m+"月</option>";
			}
			$('#scoreanalysis_sel_p').data('ymo', txt);
		} else {
			var	sels = {};
			var	max = pml.length;
			for(var i=0; i<max; i++) {
				var	ym=pml[i].split("-");
				var	y = ym[0];
				var	m = ym[1];
				sels[""+y+m]="" +y+ "年" +m+ "月";
			}
			$('#scoreanalysis_sel_p').data('ymo', sels);
		}
	}catch(e){l("makeOptionYearManthList "+e);}
}

function makeOptionCCList(ccl) {
	try {
		if (IS_NATIVE_SELECTMENU) {
			var	txt = "";
			txt += "<option value='0'>全コース</option>";
			for(var i in ccl) {
				var	cc = ccl[i];
				txt += "<option value='" +cc.cc_id+ "'>" +cc.name+ "</option>";
			}
			$('#scoreanalysis_sel_p').data('cco', txt);
		} else {
			var	sels = {'0':"全コース"};
			for(var i in ccl) {
			var	cc = ccl[i];
				sels[cc.cc_id]=cc.name;
			}
			$('#scoreanalysis_sel_p').data('cco', sels);
		}
	} catch(e){l("makeOptionCCList "+e);}
}

function makeOptionRoundsList(arc) {
	try {
		var	i = parseInt(arc);

		if (IS_NATIVE_SELECTMENU) {
			var	txt = "";
			txt += "<option value='0'>全ラウンド</option>";
			if (i >= 5) {
				txt += "<option value='5'>直近5ラウンド</option>";
			}
			if (i >= 10) {
				txt += "<option value='10'>直近10ラウンド</option>";
			}
			if (i >= 20) {
				txt += "<option value='20'>直近20ラウンド</option>";
			}
			$('#scoreanalysis_sel_p').data('rro', txt);
		} else {
			sels = {'0':"全ラウンド"};
			if (i >= 5) {
				sels = {'5':"直近5ラウンド"};
			}
			if (i >= 10) {
				sels = {'10':"直近10ラウンド"};
			}
			if (i >= 20) {
				sels = {'20':"直近20ラウンド"};
			}
			$('#scoreanalysis_sel_p').data('rro', sels);
		}
	}catch(e){l("makeOptionRoundsList "+e);}
}

function makeSASelList(enc) {
	try {
		var	pml = $.evalJSON(enc).play_month_list;
		var	ccl = $.evalJSON(enc).cc_list;
		var	arc = $.evalJSON(enc).all_rounds_count;
		
		$('#scoreanalysis_sel_p').data("cclist", ccl);
		makeOptionYearManthList(pml);
		makeOptionCCList(ccl);
		makeOptionRoundsList(arc);
		
	} catch(e){l(e);}
}

function removeAllAggData() {
	try {
		$('#scoreanalysis_sel_p').removeData('rro');
		$('#scoreanalysis_sel_p').removeData('cco');
		$('#scoreanalysis_sel_p').removeData('ymo');
		
		$('#scoreanalysis_sel_p').removeData('cclist');
	}catch(e){l(e);}
}

function getAnalysisAggData(){
	try {
		$.mobile.showPageLoadingMsg();
		
		var	options = {"p":scoreanalysis_preget_cmd};
		
		$.getJSON(root_url, options, function(json) {
			var	enc = $.toJSON(json);
			if (checkOkNg(enc)) {
				makeSASelList(enc);
				$('#sa_submit', $('#scoreanalysis_sel_p')).removeClass('ui-disabled');
			} else {
				navigator.notification.alert("ネットワークエラー\n"+$.evalJSON(enc).error_list[0], null, "エラー");
			}
			$.mobile.hidePageLoadingMsg();
		});
		
	} catch(e){l(e);}

}

function setSASelsShowHide(value) {
	var	i = parseInt(value);
	var	pn = $('#scoreanalysis_sel_p');

	if (IS_NATIVE_SELECTMENU) {
		$('#sa_period_bgn_sel_n', pn).empty();
		$('#sa_period_end_sel_n', pn).empty();
		$('#sa_rounds_sel_n', pn).empty();
		$('#sa_cc_sel_n', pn).empty();
		if (i > 0) {
			var	cco = pn.data('cco');
			if (cco) {
				$('#sa_cc_sel_n', pn).append(cco);
			}
		}
		switch(i) {
			case 0:
			$('#sa_period_div', pn).slideUp();
			$('#sa_rounds_div', pn).slideUp();
			$('#sa_cc_div', pn).slideUp();
			break;

			case 1:
			$('#sa_period_div', pn).slideDown();
			$('#sa_rounds_div', pn).slideUp();
			$('#sa_cc_div', pn).slideDown();
			var	ymo = pn.data('ymo');
			if (ymo) {
				$('#sa_period_bgn_sel_n', pn).append(ymo);
				$('#sa_period_end_sel_n', pn).append(ymo);
			}
			break;
			
			case 2:
			$('#sa_period_div', pn).slideUp();
			$('#sa_rounds_div', pn).slideDown();
			$('#sa_cc_div', pn).slideDown();
			var	rro = pn.data('rro');
			if (rro) {
				$('#sa_rounds_sel_n', pn).append(rro);
			}
			break;
			
			case 3:
			$('#sa_period_div', pn).slideUp();
			$('#sa_rounds_div', pn).slideUp();
			$('#sa_cc_div', pn).slideDown();
			break;
		}
		$('#sa_period_bgn_sel_n', pn).selectmenu('refresh');
		$('#sa_period_end_sel_n', pn).selectmenu('refresh');
		$('#sa_rounds_sel_n', pn).selectmenu('refresh');
		$('#sa_cc_sel_n', pn).selectmenu('refresh');	
	} else {
		switch(i) {
			case 0:
			$('#sa_period_div', pn).slideUp();
			$('#sa_rounds_div', pn).slideUp();
			$('#sa_cc_div', pn).slideUp();
			break;

			case 1:
			$('#sa_period_div', pn).slideDown();
			$('#sa_rounds_div', pn).slideUp();
			$('#sa_cc_div', pn).slideDown();
			break;
			
			case 2:
			$('#sa_period_div', pn).slideUp();
			$('#sa_rounds_div', pn).slideDown();
			$('#sa_cc_div', pn).slideDown();
			break;
			
			case 3:
			$('#sa_period_div', pn).slideUp();
			$('#sa_rounds_div', pn).slideUp();
			$('#sa_cc_div', pn).slideDown();
			break;
		}
	}
}

function sw_sasel_cancel() {
	var results = SpinningWheel.getSelectedValues();
	l("CANCEL "+$.JSONstr(results));
}

function sw_sasel_done() {
	var results = SpinningWheel.getSelectedValues();
	var	key = parseInt(results["keys"][0]);
	$("#sa_main_sel span.ui-btn-text").text(results["values"][0]);
	if (key > 0) {
		setSASelsShowHide(key);
	}
}

function sw_saselcc_done() {
	var results = SpinningWheel.getSelectedValues();
	$("#sa_cc_sel span.ui-btn-text").text(results["values"][0]);
}

function sw_saselperiod_b_done() {
	var results = SpinningWheel.getSelectedValues();
	$("#sa_period_bgn_sel span.ui-btn-text").text(results["values"][0]);
}

function sw_saselperiod_e_done() {
	var results = SpinningWheel.getSelectedValues();
	$("#sa_period_end_sel span.ui-btn-text").text(results["values"][0]);
}

function sw_saselrounds_done() {
	var results = SpinningWheel.getSelectedValues();
	$("#sa_rounds_sel span.ui-btn-text").text(results["values"][0]);
}


function sw_sasel_main_value() {
	var	sels= {'0':"選択してください", '1':"期間", '2':"直近ラウンド数",'3':"ゴルフコース"};
	var	text = $("#sa_main_sel span.ui-btn-text").text();
	var	i = 0;
	for(i = 0; i<4; i ++) {
		if (sels[i] == text) {
			break;
		}
	}
	return i;
}

function sw_sasel_cc_value() {
	var	sels = $('#scoreanalysis_sel_p').data('cco');
	l($.JSONstr(sels));
	var	text = $("#sa_cc_sel span.ui-btn-text").text();
	for(var j in sels) {
		if (sels[j] == text) {
			break;
		}
	}
	l("CC RETURN "+j);
	return j;
}

function sw_sasel_period_value(isbgn) {
	var	sels = $('#scoreanalysis_sel_p').data('ymo');
	l($.JSONstr(sels));
	var	pns;
	if (isbgn) {
		pns = "#sa_period_bgn_sel span.ui-btn-text";
	} else {
		pns = "#sa_period_end_sel span.ui-btn-text";
	}
	var	text = $(pns).text();
	for(var j in sels) {
		if (sels[j] == text) {
			break;
		}
	}
	l("BGN("+isbgn+") RETURN "+j);
	return j;
}

function sw_sasel_rounds_value() {
	var	sels = $('#scoreanalysis_sel_p').data('rro');
	l($.JSONstr(sels));
	var	text = $("#sa_rounds_sel span.ui-btn-text").text();
	for(var j in sels) {
		if (sels[j] == text) {
			break;
		}
	}
	l("ROUNDS RETURN "+j);
	return j;
}


(function($) {
	
	$('#scoreanalysis_sel_p').live('pageinit', function(e,d){

		if (IS_NATIVE_SELECTMENU) {
			$('#sa_main_sel_n', $(this)).parent().show();
			$('#sa_period_bgn_sel_n', $(this)).parent().show();
			$('#sa_period_end_sel_n', $(this)).parent().show();
			$('#sa_rounds_sel_n', $(this)).parent().show();
			$('#sa_cc_sel_n', $(this)).parent().show();
			
			$('#sa_main_sel', $(this)).hide();
			$('#sa_period_bgn_sel', $(this)).hide();
			$('#sa_period_end_sel', $(this)).hide();
			$('#sa_rounds_sel', $(this)).hide();
			$('#sa_cc_sel', $(this)).hide();
		} else {
			$('#sa_main_sel_n', $(this)).parent().hide();
			$('#sa_period_bgn_sel_n', $(this)).parent().hide();
			$('#sa_period_end_sel_n', $(this)).parent().hide();
			$('#sa_rounds_sel_n', $(this)).parent().hide();
			$('#sa_cc_sel_n', $(this)).parent().hide();
			
			$('#sa_main_sel', $(this)).show();
			$('#sa_period_bgn_sel', $(this)).show();
			$('#sa_period_end_sel', $(this)).show();
			$('#sa_rounds_sel', $(this)).show();
			$('#sa_cc_sel', $(this)).show();
		}
		
		
		$('a.ui-btn-left', $('#scoreanalysis_sel_p')).bind('click', function(){
			removeAllAggData();
		});
		
		$('#sa_submit', $('#scoreanalysis_sel_p')).live('click', function(e,d){
			l("ON SUBMIT");
			try{
				var	pn = $('#scoreanalysis_sel_p');
				var	ms;
				if (IS_NATIVE_SELECTMENU){
					ms = $('#sa_main_sel_n', pn).val();
				} else {
					ms = sw_sasel_main_value();
				}
				if (ms > 0) {
					var	text = "";
					var	ccltext = "";
					var	fsize = 24;
					var	options = {"p":scoreanalysis_get_cmd}

					var	cs;
					if (IS_NATIVE_SELECTMENU) {
						cs = $('#sa_cc_sel_n', pn).val();
						var	ccl = $('#scoreanalysis_sel_p').data('cclist');
						for(var i in ccl) {
							var	cc = ccl[i];
							if (cc.cc_id == cs) {
								ccltext = cc.name;
								var	w = strWidth(ccltext, fsize);
								if (w > 160) {
									var	tmp = 160 * 24 / w;
									fsize = parseInt(tmp);
								}
								break;
							}
						}
					} else {
						cs = sw_sasel_cc_value();
						var	ccltext = $("#sa_cc_sel span.ui-btn-text").text();
						var	w = strWidth(ccltext, fsize);
						if (w > 160) {
							var	tmp = 160 * 24 / w;
							fsize = parseInt(tmp);
						}
					}
					
					if (ms == 1) {
						var	ps,	pe;

						if (IS_NATIVE_SELECTMENU) {
							ps = $('#sa_period_bgn_sel_n', pn).val();
							pe = $('#sa_period_end_sel_n', pn).val();
						} else {
							ps = sw_sasel_period_value(true);
							pe = sw_sasel_period_value(false);
						}
						if (ps > pe) {
							navigator.notification.alert("開始年月より終了年月が過去です。\n", null, "エラー");
							return;
						}
						options.start_date=ps;
						options.end_date=pe;
						options.cc_id=cs;
						options.last_round_count=0;
						options.all_flag=0;
						if (ps == pe) {
							text = ""+ps.substring(0,4)+"<span style='font-size:0.7em;'>年</span>"+parseInt(ps.substr(4,2))+"<span style='font-size:0.7em;'>月</span>";
						} else {
							text = ""+ps.substring(0,4)+"<span style='font-size:0.7em;'>年</span>"+parseInt(ps.substr(4,2))+"<span style='font-size:0.7em;'>月</span><span style='font-size:0.6em;'>から</span>"+pe.substring(0,4)+"<span style='font-size:0.7em;'>年</span>"+parseInt(pe.substr(4,2))+"<span style='font-size:0.7em;'>月</span>";
						}
						if (cs > 0) {
							text += "<br/><span style='font-size:0.7em;'>"+ccltext+"</span>";
						}
					} else if (ms == 2) {
						var	rs;
						if (IS_NATIVE_SELECTMENU) {
							rs = $('#sa_rounds_sel_n', pn).val();
						} else {
							rs = sw_sasel_rounds_value();
						}
						options.cc_id=cs;
						options.last_round_count=rs;

						if (cs > 0) {
							text = ""+ccltext+"<br/>";
						}
						if (rs == 0) {
							options.all_flag=1;
							text += "全ラウンド";
						} else {
							options.all_flag=0;
							text += "直近"+rs+"ラウンド";
						}
					} else if (ms == 3) {
						options.last_round_count=0;
						options.cc_id=cs;
						if (cs == 0) {
							options.all_flag=1;
							text = "全ラウンド";
						} else {
							options.all_flag=0;
							text = "<span style='font-size:"+fsize+"px;'>"+ccltext+"</span>";
						}
					} else {
						navigator.notification.alert("想定外の条件が設定されています。\ncode:"+ms, null, "エラー");
						return false;
					}
//	text += "<br/><span style='font-size:1em;'>分析結果</span>";
					
					var	event = {data:{page:'#scoreanalysis_p', params:{"options":options, "title":text}}};
					moveto(event);
				} else {
					navigator.notification.alert("条件を選択してください。", null, "警告");
				}
				return false;
			} catch(e){l(e);}
		});
	
		$('#sa_main_sel_n', $('#scoreanalysis_sel_p')).change(function(){
			try{
				var value = $(this).val();
				console.log($(this).attr('id') + " changed to " + value);
				if (value > 0) {
					setSASelsShowHide(value);
				}
			} catch(e){l(e);}
		});
	
		$('#sa_main_sel', $('#scoreanalysis_sel_p')).live('click', function() {
			var	sels= {'0':"選択してください", '1':"期間", '2':"直近ラウンド数",'3':"ゴルフコース"};
			/*
			var	text = $("#sa_main_sel span.ui-btn-text").text();
			var	selected;
			for(selected = 0; selected<4; selected ++) {
				if (sels[selected] == text) {
					break;
				}
			}
			*/
			var	selected = sw_sasel_main_value();
			SpinningWheel.addSlot(sels, 'center', selected);
			SpinningWheel.setCancelAction(sw_sasel_cancel);
			SpinningWheel.setDoneAction(sw_sasel_done);
			SpinningWheel.open();
			return false;
		});

		$('#sa_cc_sel', $('#scoreanalysis_sel_p')).live('click', function() {
			var	cco = $('#scoreanalysis_sel_p').data('cco');
			var	selected = sw_sasel_cc_value();
			SpinningWheel.addSlot(cco, 'center', selected);
			SpinningWheel.setCancelAction(sw_sasel_cancel);
			SpinningWheel.setDoneAction(sw_saselcc_done);
			SpinningWheel.open();
			return false;
		});

		$('#sa_period_bgn_sel', $('#scoreanalysis_sel_p')).live('click', function() {
			var	cco = $('#scoreanalysis_sel_p').data('ymo');
			var	selected = sw_sasel_period_value(true);
			SpinningWheel.addSlot(cco, 'center', selected);
			SpinningWheel.setCancelAction(sw_sasel_cancel);
			SpinningWheel.setDoneAction(sw_saselperiod_b_done);
			SpinningWheel.open();
			return false;
		});
		
		$('#sa_period_end_sel', $('#scoreanalysis_sel_p')).live('click', function() {
			var	cco = $('#scoreanalysis_sel_p').data('ymo');
			var	selected = sw_sasel_period_value(false);
			SpinningWheel.addSlot(cco, 'center', selected);
			SpinningWheel.setCancelAction(sw_sasel_cancel);
			SpinningWheel.setDoneAction(sw_saselperiod_e_done);
			SpinningWheel.open();
			return false;
		});
		
		$('#sa_rounds_sel', $('#scoreanalysis_sel_p')).live('click', function() {
			var	cco = $('#scoreanalysis_sel_p').data('rro');
			var	selected = sw_sasel_rounds_value();
			SpinningWheel.addSlot(cco, 'center', selected);
			SpinningWheel.setCancelAction(sw_sasel_cancel);
			SpinningWheel.setDoneAction(sw_saselrounds_done);
			SpinningWheel.open();
			return false;
		});
	});

/*
	$('#scoreanalysis_sel_p').live('pagebeforehide', function(e,d){
		l("DO NOT DELETE IF MOVE TO ANALYSIS DATA VIEW");
		l("SHOULD DELETE IF MOVE TO BACK");
	});
*/

	$('#scoreanalysis_sel_p').live('pagebeforeshow', function(e,d){
		try {
			//	BUILD SCREEN
			if (IS_NATIVE_SELECTMENU) {
				$('#sa_main_sel_n', $(this))[0].selectedIndex=0;
				$('#sa_main_sel_n', $(this)).selectmenu('refresh');
			}
			
			$('#sa_period_div', $(this)).hide();
			$('#sa_rounds_div', $(this)).hide();
			$('#sa_cc_div', $(this)).hide();
			
			$('#sa_submit', $(this)).addClass('ui-disabled');
		} catch(e){l(e);}
	});
	
	$('#scoreanalysis_sel_p').live('pageshow', function(e,d){
		try{
			if (!online || !fblogined) {
				setSASelsShowHide(0);
				$('#sa_submit', $(this)).addClass('ui-disabled');
				return;
			}
			setSASelsShowHide(0);
			
			var	cclist=$('#scoreanalysis_sel_p').data('cclist');
			if (cclist) {
				$('#sa_submit', $('#scoreanalysis_sel_p')).removeClass('ui-disabled');
			} else {
				getAnalysisAggData();
			}
		} catch(e){l(e);}
	});
})(jQuery);


/*
 Cordova - SHOTBOOK have invites
 Copyright (c) 2012 Indi
 */

function showFromEventInfos(event_id) {
	var	event = {data:{page:'#check_inv_p', params:{ "event_id":event_id, "mine":false }}};
	moveto(event);
}


//	友達に誘われているリスト
function getEventListFromGolfriends() {
	try {
		l("getEventListFromGolfriends ");
		var	options = {"p":event_inv_get_cmd};
		
		var	hi_shw = parseInt($('#have_invites_p').data('hi_shw'));
		if (hi_shw) {
			var	hi_pos = parseInt($('#have_invites_p').data('hi_pos'));
			var	hi_cnt = parseInt($('#have_invites_p').data('hi_cnt'));
			if (hi_pos+hi_shw >= hi_cnt) {
				l("NONE");
				return;
			} else {
				l("NEXT");
				options.limit = hi_shw;
				options.offset = hi_pos+hi_shw;
			}
		} else {
			l("NEW GET");
			options.limit = 10;
			options.offset = 0;
		}
		
		l($.JSONstr(options));
		
		$.mobile.showPageLoadingMsg('a', 'イベントを検索中です');
		
		$.getJSON(root_url, options, function(json) {
			var i;
			var	enc = $.toJSON(json);
			
			l(enc);
			
			var	evtlst = new Array();
			
			var	list = $('#have_invites_p').data('invs');
			if (list) {
				l("HAS LIST");
				for(i in list) {
					l("PUSH EVENT ID "+list[i].evtbl_main_id);
					evtlst.push(list[i]);
				}
			}
			
			if (checkOkNg(enc)) {
				var	dates = $('#mydate_have').data('datebox').options.highDates;
				if (!dates)
					$('#mydate_have').data('datebox').options.highDates = new Array();
				
				var	event_count = parseInt($.evalJSON(enc).event_count);
				if (event_count > 0) {
					var	dd = new Date();
					var	today_tic = dd.getTime();
					var	break_flag = false;
					
					var	txt = "";
					var	shw = 0;
					var	position = parseInt($.evalJSON(enc).position);
					var	event_list = $.evalJSON(enc).event_list;
					for (i in event_list) {
						var	event = event_list[i];

						var	td = new Date(event.start_time);
						td.setHours(0);
				  
						var	target_tic = td.getTime();
						
						if (target_tic < today_tic) {
							break_flag = true;
							l("OLD ITEM BREAK!! "+target_tic + " < "+today_tic);
							break;
						}

						var	ansstr=["未回答","参加","不参加","未定"];
						
						evtlst.push(event);
						var	ds = getStringFromText(event.start_time);
//						txt += "<li id='invfrom_li_"+event.evtbl_main_id+"' data-icon='arrow-r'><a class='simplea' href='#' onclick='javascript:showFromEventInfos("+event.evtbl_main_id+");'><div class='ui-li-heading'>"+event.event_owner_name+"</div><div class='ui-li-aside ui-li-desc'>"+ds+"</div><div class='ui-li-desc'>"+event.title+"</div></a></li>";
						txt += "<li id='invfrom_li_"+event.evtbl_main_id+"' data-icon='arrow-r'><a class='simplea' href='#' onclick='javascript:showFromEventInfos("+event.evtbl_main_id+");'><div class='ui-li-heading'>"+event.event_owner_name+"</div><div class='ui-li-aside ui-li-desc'>"+ds+"</div><div class='ui-li-desc'>"+event.title+" / "+ansstr[event.status]+"</div></a></li>";

						$('#mydate_have').data('datebox').options.highDates.push(ds);
						shw ++;
					}
					$('#mydate_have').trigger('datebox', {'method': 'doset'});
					
					if (position == 0) {
						$('#inv_from_list li').not("[data-role='list-divider']").remove();
					}
					
					if (shw + position >= event_count || break_flag) {
						//	全部表示している
						if (break_flag && shw == 0) {
							$('#inv_from_list').append("<li id='inv_from_li_txt'>お誘いはみつかりませんでした。</li>");
						}
						$('#inf_readmore_div').slideUp();
					} else {
						$('#inf_readmore_btn').button('enable');
						$('#inf_readmore_div').slideDown();
					}
					
					$('#inv_from_list li#inv_from_li_txt').remove();
					$('#inv_from_list').append(txt);
					
					$('#have_invites_p').removeData('invs');
					$('#have_invites_p').data('invs', evtlst);
					
					$('#have_invites_p').data('hi_shw', shw);
					$('#have_invites_p').data('hi_pos', position);
					$('#have_invites_p').data('hi_cnt', event_count);
					
					$('#inf_readmore_btn').button('enable');
				} else {
					$('#inv_from_li_txt').html("<li>お誘いはみつかりませんでした。</li>");
					$('#inf_readmore_div').slideUp();
				}
			} else {
				$('#inv_from_li_txt').html("<li>"+$.evalJSON(enc).error_list[0]+"</li>");
				$('#inf_readmore_div').slideUp();
			}
			$('#inv_from_list').listview('refresh').listview();
			
			$.mobile.hidePageLoadingMsg();
		});
		
	} catch(e){l(e);}
}

function countEventListFromGolfriends() {
	try {
		
		var	dd = new Date();
		var	today_tic = dd.getTime();

		var	check_tic = $('#boot').data('check_time');
		if (check_tic) {
			var	dif = today_tic - check_tic;
			l("DIFF "+dif);
			if (dif < 360000) {	//	1h / 10
				return;
			} 
		}
		
		var count = 0;
		var	options = {"p":event_inv_get_cmd, "limit":25, "offset":0};
		l("countEventListFromGolfriends "+ $.JSONstr(options));
		
		$.getJSON(root_url, options, function(json) {
			var	enc = $.toJSON(json);
//			l("ENC "+ enc);
			if (checkOkNg(enc)) {
				var	event_count = parseInt($.evalJSON(enc).event_count);
				if (event_count > 0) {
					var	event_list = $.evalJSON(enc).event_list;
					for (i in event_list) {
						var	event = event_list[i];
						var	strst = (event.start_time).substring(0, 10);
//						var	sp = strst.split("/");

						var	td = new Date(strst);
//						var	td = new Date(sp[0], parseInt(sp[1]) - 1, sp[2]);
						var	target_tic = td.getTime();

						if (target_tic > today_tic && event.status == 0) {
							count ++;
						}
					}
					
					l("COUNT "+count);
					$('#boot').data('check_time', today_tic);
					$('#boot').data('invitation_count', count);
					setInvitaionCount(count);
				}
			} else {
				l("GETJSON ERROR");
			}
		});
		return count;
	} catch(e){l("COUNT EVENT ERROR "+e);}
}

function confirmInvitationCallback(idx) {
	l("confirmSelfMadeEventOnlyCallback "+idx);
	var	lst = $('#have_invites_p').data('show_list');
	var	max = lst.length;
	if (max == 0) {
		return;
	} else {
		if (max < idx) {
			return;
		} else {
			var	evtlst = $('#have_invites_p').data('invs');
			var	sel = lst[idx - 1];
			showFromEventInfos(evtlst[sel].evtbl_main_id);
		}
	}
}

//	http://dev.jtsage.com/jQM-DateBox/theme/
//	<div class="ui-datebox-griddate ui-corner-all ui-btn-up-e" data-date="25" data-theme="e">25</div>
(function($) {
	
	$('#have_invites_p').live('pageinit', function() {
		
		$('#mydate_have').live('datebox', function(e, p) {
			try {
				l("mydate_have datebox "+p.method);
				if (p.method === 'set') {
					e.stopImmediatePropagation();	//	ぶんどり
					var	clickDate = p.value;	//	"YYYY/MM/DD"
					var	lst = new Array();
					var	events = $('#have_invites_p').data('invs');
					l("click "+clickDate);
					for(var i in events) {
						var	st = events[i].start_time;
						var	c = st.substring(0,10);
						if (c == p.value) {
							lst.push(i);
						}
					}
					if (lst.length > 0) {
						$('#have_invites_p').data('show_list', lst);
						var	buttons ="";
						for(var i in lst) {
							if (buttons.length > 0) { 
								buttons += ",";
							}
							var	sel = lst[i];
							buttons += events[sel].title;
						}
						buttons+=",キャンセル";
						navigator.notification.confirm("選択してください", confirmInvitationCallback, "選択", buttons);
					}
				}
			} catch(e){l(e);}
		});
		
		$('#inf_readmore_btn').live('click', function(e) {
			l("READMORE...");
			getEventListFromGolfriends();
		});
		
	});

	$('#have_invites_p').live('pagebeforehide', function(e,d) {
		$('#have_invites_p').removeData('show_list');
	});
	
	$('#have_invites_p').live('pagebeforeshow', function(e,d){
		try {
			$('#inv_from_list li', $(this)).not("[data-role='list-divider']").remove();
			$('#inv_from_list', $(this)).append("<li id='inv_from_li_txt'><p style='text-align:center;'><img style='width:20px; height:20px' src='images/ajax-loader.gif' /></p></li>");
			$('#inv_from_list', $(this)).listview('refresh');

			$('#have_invites_p').removeData('invs');
			
			$('#have_invites_p').removeData('hi_shw');
			$('#have_invites_p').removeData('hi_pos');
			$('#have_invites_p').removeData('hi_cnt');
			
			$('#mydate_have').trigger('datebox', {'method': 'doclear'});
		} catch(e){l(e);}
	});
	
	$('#have_invites_p').live('pageshow', function(e,d){
		if (online) {
			if (fblogined) {
				$('#inf_readmore_div', $(this)).slideDown();
				$('#inf_readmore_btn', $(this)).button('disable');
				getEventListFromGolfriends();
			} else {
				$('#mydate_have').data('datebox').options.highDates = new Array();
				$('#mydate_have').trigger('datebox', {'method': 'doset'});
				
				$('#inf_readmore_div', $(this)).slideUp();
				$('#inf_readmore_btn', $(this)).button('disable');
				$('#inv_from_li_txt', $(this)).html("facebookにログインしていません。");
			}
		} else {
			$('#inf_readmore_div', $(this)).slideUp();
			$('#inf_readmore_btn', $(this)).button('disable');
			$('#inv_from_li_txt', $(this)).html("ネットワークにアクセス出来ません。");
		}
		$('#inv_from_list', $(this)).listview('refresh').listview();
	});

})(jQuery);



			window.location='./main.html';
		

/*
 Cordova - SHOTBOOK make invites
 Copyright (c) 2012 Indi
 */

function showMyEventInfos(event_id){
	//	check_inv_p
	var	event = {data:{page:'#check_inv_p', params:{ "event_id":event_id, "mine":true }}};
	moveto(event);
}


function getMyEventListToGolfriends() {
	try {
		l("getMyEventListToGolfriends");
		var	options = { "p":event_list_cmd };
		
		var	mi_shw = parseInt($('#make_invites_p').data('mi_shw'));
		if (mi_shw) {
			var	mi_pos = parseInt($('#make_invites_p').data('mi_pos'));
			var	mi_cnt = parseInt($('#make_invites_p').data('mi_cnt'));
			if (mi_pos+mi_shw >= mi_cnt) {
				l("NONE");
				return;
			} else {
				l("NEXT");
				options.limit = mi_shw;
				options.offset = mi_pos+mi_shw;
			}
		} else {
			l("NEW GET");
			options.limit = 10;
			options.offset = 0;
		}
		
		l($.JSONstr(options));
		
		$.mobile.showPageLoadingMsg('a', 'イベントを検索中です');
		
		$.getJSON(root_url, options, function(json) {
			
			var	enc = $.toJSON(json);
			l(enc);
			
			var	evtlst = new Array();
			
			var	list = $('#make_invites_p').data('invs');
			if (list) {
				l("HAS LIST");
				for(var	i in list) {
					l("PUSH EVENT ID "+list[i].evtbl_main_id);
					evtlst.push(list[i]);
				}
			}
			
			if (checkOkNg(enc)) {
				var	dates = $('#mydate_make').data('datebox').options.highDates;
				if (!dates)
					$('#mydate_make').data('datebox').options.highDates = new Array();
				
				var	event_count = parseInt($.evalJSON(enc).event_count);
				if (event_count > 0) {
					var	dd = new Date();
					dd.setDate(dd.getDate() - 1);
					var	today_tic = dd.getTime();
					var	break_flag = false;
					
					var	txt = "";
					var	shw = 0;
					var	position = parseInt($.evalJSON(enc).position);
					var	event_list = $.evalJSON(enc).event_list;
					for (var i in event_list) {
						var	event = event_list[i];

						var	td = new Date(event.start_time);
						td.setDate(td.getDate() - 1);
						td.setHours(0);
						
						var	target_tic = td.getTime();
						
						if (target_tic < today_tic) {
							break_flag = true;
							break;
						}
						
						evtlst.push(event);
						var	ds = getStringFromText(event.start_time);	//	YYYY-MM-DDのみ
						txt += "<li id='myinv_li_"+event.evtbl_main_id+"' data-icon='arrow-r' data-theme='c'><a class='simplea' href='#' onclick='javascript:showMyEventInfos("+event.evtbl_main_id+");'><h3 class='ui-li-heading'>"+event.title+"</h3><div class='ui-li-desc'>開催日："+ds+"</div></a></li>";
						
						$('#mydate_make').data('datebox').options.highDates.push(ds);
						shw ++;
					}
					$('#mydate_make').trigger('datebox', {'method': 'doset'});
					
					if (position == 0) {
						$('#my_inv_list li').not("[data-role='list-divider']").remove();
					}
					
					if (shw + position >= event_count || break_flag) {
						//	全部表示している
						if (break_flag && shw == 0) {
							$('#my_inv_list').append("<li id='inv_from_li_txt'>お誘いはみつかりませんでした。</li>");
						}
						$('#min_readmore_div').slideUp();
					} else {
						$('#min_readmore_btn').button('enable');
						$('#min_readmore_div').slideDown();
					}
					
					$('#my_inv_list li#my_inv_li_txt').remove();
					$('#my_inv_list').append(txt);
					
					$('#make_invites_p').removeData('invs');
					$('#make_invites_p').data('invs', evtlst);
					
					$('#make_invites_p').data('mi_shw', shw);
					$('#make_invites_p').data('mi_pos', position);
					$('#make_invites_p').data('mi_cnt', event_count);
					
					$('#min_readmore_btn').button('enable');
				} else {
					$('#my_inv_li_txt').html("<li>お誘いはみつかりませんでした。</li>");
					$('#min_readmore_div').slideUp();
				}
			} else {
				$('#my_inv_li_txt').html("<li>"+$.evalJSON(enc).error_list[0]+"</li>")
			}
			$('#my_inv_list').listview('refresh').listview();
			
			$.mobile.hidePageLoadingMsg();
		});
	} catch(e){l(e);}
}

function confirmSelfMadeEventOnlyCallback(idx) {
	l("confirmSelfMadeEventOnlyCallback "+idx);
	var	lst = $('#make_invites_p').data('show_list');
	var	max = lst.length;
	if (max == 0) {
		return;
	} else {
		if (max < idx) {
			return;
		} else {
			var	evtlst = $('#make_invites_p').data('invs');
			var	sel = lst[idx - 1];
			showMyEventInfos(evtlst[sel].evtbl_main_id);
		}
	}
}

function confirmSelfMadeEventCallback(idx) {
	l("confirmSelfMadeEventCallback "+idx);
	var	lst = $('#make_invites_p').data('show_list');
	var	max = 0;
	if (lst) {
		max = lst.length;
	}
	if (max == 0) {
		if (idx == 1) {
			var	event = {data:{page:'#make_inv_p', params:{ "date":$('#mydate_make').data('datebox').theDate }}};
			moveto(event);
		}
	} else {
		if (max + 1 < idx) {
			return;
		} else {
			if (idx == 1) {
				var	event = {data:{page:'#make_inv_p', params:{ "date":$('#mydate_make').data('datebox').theDate }}};
				moveto(event);
			} else {
				var	evtlst = $('#make_invites_p').data('invs');
				var	sel = lst[idx - 2];
				showMyEventInfos(evtlst[sel].evtbl_main_id);
			}
		}
	}
}


(function($) {
	$('#make_invites_p').live('pageinit', function(e, d) {
	
		$('#min_readmore_btn').live('click', function(e) {
			l("READMORE...");
			getMyEventListToGolfriends();
		});
		
		$('#new_inv_add').live('click', function(e) {
			if (fblogined) {
				var	event = {data:{page:'#make_inv_p'}};
				moveto(event);
				return false;
			} else {
				navigator.notification.alert("shotbookにログインしていません。", null, "報告");
			}
			e.preventDefault();
			return false;
		});
		$('#mydate_make').live('datebox', function(event, payload) {
			if ( payload.method === 'set' ) {
				l("payload.value "+payload.value);
				
				var	today = new Date();
				var	tut = today.getTime();
				var	selec = $('#mydate_make').data('datebox').theDate;
				var	sut = selec.getTime();
				l("T "+tut+" S "+sut);
				var	can_make_inv = false;
				if (tut < sut) {
					can_make_inv = true;
				}

				var	lst = new Array();
				var	evtlst = $('#make_invites_p').data('invs');
				for(var i in evtlst) {
					var	st = evtlst[i].start_time;
					var	c = st.substring(0,10);
					if (c == payload.value) {
						lst.push(i);
					}
				}
				
				if (lst.length > 0) {
					$('#make_invites_p').data('show_list', lst);
//					var	c = 0;
					var	buttons;
					if (can_make_inv) {
						buttons = "新規作成";
//						c = 1;
					} else {
						buttons = "";
					}
						
					for(var i in lst) {
						if (buttons.length > 0) { 
							buttons += ",";
						}
						var	sel = lst[i];
//						c ++;
						buttons += evtlst[sel].title;
					}
					buttons+=",キャンセル";

					if (can_make_inv) {
						navigator.notification.confirm("選択してください", confirmSelfMadeEventCallback, "選択", buttons);
					} else {
						navigator.notification.confirm("選択してください", confirmSelfMadeEventOnlyCallback, "選択", buttons);
					}
				} else {
					
					if (can_make_inv) {
						navigator.notification.confirm("友達を誘いますか？", confirmSelfMadeEventCallback, "友達を誘う",  "新規作成,キャンセル");
					}
					
				}
			}
		});
	});

	$('#make_invites_p').live('pagebeforehide', function(e,d) {
		$('#make_invites_p').removeData('show_list');
	});
	
	$('#make_invites_p').live('pagebeforeshow', function(e,d) {
		$('#my_inv_list li', $(this)).not("[data-role='list-divider']").remove();
		$('#my_inv_list', $(this)).append("<li id='my_inv_li_txt'><p style='text-align:center;'><img style='width:20px; height:20px' src='images/ajax-loader.gif' /></p></li>");
		$('#my_inv_list', $(this)).listview('refresh');
		
		$('#make_invites_p').removeData('invs');
		
		$('#make_invites_p').removeData('mi_shw');
		$('#make_invites_p').removeData('mi_pos');
		$('#make_invites_p').removeData('mi_cnt');
		
		$('#mydate_make').trigger('datebox', {'method': 'doclear'});
	});

	$('#make_invites_p').live('pageshow', function(e,d) {
		if (online) {
			if (fblogined) {
				$('#min_readmore_div', $(this)).slideDown();
				$('#min_readmore_btn', $(this)).button('disable');
				getMyEventListToGolfriends();
			} else {
				$('#mydate_make').data('datebox').options.highDates = new Array();
				$('#mydate_make').trigger('datebox', {'method': 'doset'});
				
				$('#min_readmore_div', $(this)).slideUp();
				$('#min_readmore_btn', $(this)).button('disable');
				$('#my_inv_li_txt', $(this)).html("shotbookにログインしていません。");
			}
		} else {
			$('#min_readmore_div', $(this)).slideUp();
			$('#min_readmore_btn', $(this)).button('disable');
			$('#my_inv_li_txt', $(this)).html("ネットワークにアクセス出来ません。");
		}
		$('#my_inv_list', $(this)).listview('refresh').listview();
	});

})(jQuery);


/*
 Cordova - Golfer's Dashboard DB
 Copyright (c) 2012 Indi
 */

function movetoRoundInfo() {
	try{
		var	params=$('#edit_round_player_p').data('params');
		var	rd=params['item'];
		
		var	pl=$('#edit_round_player_p').data('player_list');
		var	plb=pl.getbody();
		var	max=pl.cnt();
		if (max > 4) {
			max = 4;
		}
		rd.max_players=max;
		
		var	c = rd.pars.length;

		rd.scores=new Array();
		
		for(var i in plb) {
			var	p = plb[i];
			
			var	scoredata = new Score();
			scoredata.player = p;
			scoredata.holescores = new Array();
			
			for(var i=0; i < c; i ++){
				var	hscore = new HoleScore();
				hscore.holenum = i + 1;
				scoredata.holescores.push(hscore);
			}
			
			rd.scores.push(scoredata);
			
			max --;
		}
	}catch(e){l(e);}
	
	var	event = {data:{page:'#edit_round_info_p', params:{item:rd}}};
	moveto(event);
}

function checkCountAndJump(callfor) {
	var	pl = $('#edit_round_player_p').data('player_list');
	var	pc = pl.cnt();
	if (pc >= 4) {
		navigator.notification.alert("同組プレーヤーは四人までです。", null, "警告");
		return;
	}
	callfor();
}


(function($) {
	$('#edit_round_player_p').live('pageinit', function(e,d){
		
		$('#erp_add_golfriend', $(this)).on('click', function() {
			checkCountAndJump(addFromGolfriend);
		});
		$('#erp_add_direct', $(this)).on('click', function() {
			checkCountAndJump(addFromDirectInput);
		});
		$('#erp_add_from_addressbook', $(this)).on('click', function() {
			checkCountAndJump(addFromAddressBook);
		});
		$('#moveto_infos', $(this)).on('click', movetoRoundInfo);
		

		//	自分のデータだけいれとく
/*		var	p = new Player();
		var	me=getDataFromLocal("mydata");
		var	meobj=$.parseJSON(me);
		p.name = meobj['pi_myname'];
		p.handicap = meobj['pi_handicap'];
		
		var	lb=new ListBlock();	//	listblock
		lb.add(p);
		
		$(this).data('player_list', lb);	*/
	});
	
	$('#edit_round_player_p').live('pagebeforeshow', function(e,d){
		try{
			var	pl=$(this).data('player_list');
			var	plb;
			if (!pl) {
				l("NEW OL");
				var	p = new Player();
				var	me=getDataFromLocal("mydata");
				var	meobj=$.parseJSON(me);
				p.name = meobj['pi_myname'];
				p.handicap = meobj['pi_handicap'];
				
				pl=new ListBlock();	//	listblock
				pl.add(p);
				
				$(this).data('player_list', pl);
			}
			plb=pl.getbody();

			var	al=$(this).data('add_list');
			
			var	canadd;
			
			if (typeof al === "undefined") {
			} else {

			var	ld=$("#erp_player_list", $(this));
				
			for(var i in al) {
				var	addplayer=al[i].player;
				if (addplayer) {
					canadd=true;
					for(var j in plb) {
						var	listplayer=plb[j];
						l(j+" : "+listplayer.name +" =?= "+addplayer.name);
						if (listplayer.name == addplayer.name) {
							//	名前が同じ。
							if ((listplayer.di_flag == addplayer.di_flag) && (listplayer.c_flag == addplayer.c_flag)){
								if (listplayer.gf_flag==true && listplayer.gf_flag == addplayer.gf_flag){
									if (listplayer.facebook_id == addplayer.facebook_id) {
										//	all flag, facebook idも同じだから加えない。
										continue;
									}
								} else {
									canadd=false;
									break;
								}
							} else {
								canadd=false;
								break;
							}
						}
					}
					
					if (canadd) {
						pl.add(addplayer);
					}
				}
			}
			}
			
			plb=pl.getbody();	//	追加されたかもしれないから。
			
			var	lists=$(this).data('lists');
			if (lists) {
				for(var i in lists) {
					var	item = lists[i];
					
					canadd = true;
					for(var j in plb) {
						var	lp=plb[j];
						if (!lp.gf_flag) {
							continue;
						}
						if (lp.facebook_id == item.facebook_id) {
							canadd = false;
							break;
						}
					}

					if (canadd) {
						var p = new Player();
						p.id = item.shotbook_id;
						p.facebook_id = item.facebook_id;
						p.gf_flag = true;
						p.name = item.name;
						p.sex = item.sex;
						p.handicap = item.handicap;
						l("add "+item.name);
						pl.add(p);
					}
				}
			}
			
			if (pl.cnt() >= 4) {
				$('#erp_add_golfriend', $(this)).addClass('ui-disabled');
				$('#erp_add_direct', $(this)).addClass('ui-disabled');
				$('#erp_add_from_addressbook', $(this)).addClass('ui-disabled');
			}
			if (pl.cnt() > 4) {
				$('#moveto_infos', $(this)).button('disable');
				$('#listmustbeunderfour', $(this)).show();
			} else {
				$('#listmustbeunderfour', $(this)).hide();
			}
			
			$(this).removeData('lists');		//	削除
			
			$(this).removeData('add_list');		//	削除
			
			$(this).removeData('player_list');	//	削除
			$(this).data('player_list', pl);	//	更新

		}catch(e){l("edit_round_player_p pagebeforeshow ERROR : "+e);}
	});

		
	$('#edit_round_player_p').live('pageshow', function(e,d){
		try{
			var	lv=$('#erp_player_list', $(this));
			lv.empty();
			var	cnt=0;
			var	pl=$(this).data('player_list');
			var	plb=pl.getbody();
			
			var	txt = "";
			for(var i in plb) {
				var	p=plb[i];
				l(i+":"+p);
				
				if (p.di_flag){
					txt += "<li id='erp_list-" + i + "' data-icon='delete'><a id='erp_listb-" + i + "' href='#'>"+p.name+"</a></li>";
				}
				else if (p.c_flag) {
					txt += "<li id='erp_list-" + i + "' data-icon='delete'><a id='erp_listb-" + i + "' href='#'>"+p.name+"</a></li>";
				}
				else if (p.gf_flag) {
					txt += "<li id='erp_list-" + i + "' data-icon='delete'><a id='erp_listb-" + i + "' href='#'>"+p.name+"</a></li>";
				}
				else {
					txt += "<li id='erp_list-me'>"+p.name+"</li>";
				}
				cnt++;
			}
			lv.append(txt);
			
			$('a[id^="erp_listb-"]', lv).on('click', function(e){
			//	var	li = $(this).attr('id').replace(/^erp_listb-/g, "");
				var	li = $(this).attr('id').slice(10);	//	sns(?)_id
				
				// Show a custom confirmation dialog
				navigator.notification.confirm(
					$(this).text()+"さんを\n削除します。よろしいですか？",	// message
					function(index){
						if (index == 2) {
							var	pl=$('#edit_round_player_p').data('player_list');
							pl.del(li);
							if (pl.cnt() < 4) {
								$('#erp_add_golfriend', $('#edit_round_player_p')).removeClass('ui-disabled');
								$('#erp_add_direct', $('#edit_round_player_p')).removeClass('ui-disabled');
								$('#erp_add_from_addressbook', $('#edit_round_player_p')).removeClass('ui-disabled');
							}
							if (pl.cnt() <= 4) {
								$('#moveto_infos', $('#edit_round_player_p')).button('enable');
								
								$('#listmustbeunderfour', $('#edit_round_player_p')).hide();
							} else {
								
								$('#listmustbeunderfour', $('#edit_round_player_p')).show();
							}
							
							$('#erp_list-'+li).remove();
							
							$('#erp_player_list', $('#edit_round_player_p')).listview('refresh');
						}
					},	// callback (index of button pressed)
					'警告', 'いいえ,はい');
				
			});

			lv.listview('refresh');
			$(this).removeData('add_list');
		}catch(e){l("edit_round_player_p pageshow ERROR: "+e);}
	});
	
	
}) (jQuery);


/*
 Cordova - Golfer's HOME
 Copyright (c) 2012 Indi
 */

//---------------------------------------
function initRoot() {
	//	ホーム用
	try {
		checkOnline();
		onPhoneGapCamera();
		
		initDB();
		LocalDBCheckAndInit();
	} catch(e){l(e);}
//	$("[data-role=header]").fixedtoolbar({ tapToggle: false });
}

function LocalDBCheckAndInit() {

	if (initLocalDB()){
//		l("*** LOCAL DB CLEAR - should be remove this.");
//		clearLocalDB();

		var	mydata = getDataFromLocal("mydata");
		if (mydata) {
			console.log("HAS LOCAL DATA");
		} else {
			var	initmydata = {
				"pi_myname":"私",
				"pi_birthday":"",
				"pi_mailaddr":"",
				"pi_phone":"",
				"pi_sex":"1",
				"pi_height":"",
				"pi_weight":"",
				"pi_startday_golf":"",
				"pi_golfcourse":"",
				"pi_headspeed":"",
				"pi_prefecture":"",
				"pi_handicap":"-",
				
				"pi_best_score":"-",
				"pi_average":"-",
				"pi_putting_average":"-",
				"pi_golf_friend_count":"0",

				"pi_user_id":"",
				"pi_sns_id":"",
				"pi_sns_icon":"",
				
				//	only one time change.
				"pi_from_server":"no"
			};

			var	jsontxt = $.toJSON(initmydata);
			
			if (setDataToLocal("mydata", jsontxt)) {
				console.log("INSERTED");
			} else {
				console.log("DEF DATA CANNOT INSERT");
				navigator.notification.alert("ローカル保存領域でエラーが発生しました。", null, "エラー");
			}
		}
	} else {
		console.log("LOCAL DB CANNOT BUILD");
	}
}

// show only the first content div
function showContent1() {
	$('#li_tl:first').addClass('ui-btn-active');
	$('#li_tu:first').removeClass('ui-btn-active');
	firstContent.show();
	secondContent.hide();
	
	$('#home').removeData('tl_cnt');
	$('#home').removeData('tl_pos');
	$('#home').removeData('tl_shw');
	
	homeOnlineCheck();
	if (online && fblogined) {
		$('#tl_now_loading_div', $('#home')).slideDown();
		getTimeline();
	} else {
		$('#tl_now_loading_div', $('#home')).slideUp();
	}
}

function showContent2() {
	$('#li_tl:first').removeClass('ui-btn-active');
	$('#li_tu:first').addClass('ui-btn-active');
	firstContent.hide();
	secondContent.show();

	$('#home').removeData('fu_cnt');	//	カウント？
	$('#home').removeData('fu_pos');	//	取ってきたポジション
	$('#home').removeData('fu_shw');	//	表示中

	homeOnlineCheck();
	if (online && fblogined) {
//		$('#fu_my_post_btn', $('#home')).parents('.ui-btn').show();
		$('#fu_now_loading_div', $('#home')).slideDown();
		getFriendsUpdate();
	} else {
//		$('#fu_my_post_btn', $('#home')).parents('.ui-btn').hide();
		$('#fu_now_loading_div', $('#home')).slideUp();
	}
}

function homeOnlineCheck() {
	if (online) {
		if (fblogined) {
			$('#tl_tryonline_btn', $('#home')).parents('.ui-btn').hide();
			$('#fu_tryonline_btn', $('#home')).parents('.ui-btn').hide();
			
			$('#fu_my_post_btn', $('#home')).parents('.ui-btn').show();
		} else {
			$('#tl_tryonline_btn', $('#home')).parents('.ui-btn').show();
			$('#fu_tryonline_btn', $('#home')).parents('.ui-btn').show();
			
			$('#fu_my_post_btn', $('#home')).parents('.ui-btn').hide();
		}
		$('#tl_readmore_btn', $('#home')).parents('.ui-btn').hide();
		$('#fu_readmore_btn', $('#home')).parents('.ui-btn').hide();
		
		$('#timeline_list', $('#home')).empty();
		$('#friendsupdate_list', $('#home')).empty();
	} else {
		$('#tl_tryonline_btn', $('#home')).parents('.ui-btn').hide();
		$('#fu_tryonline_btn', $('#home')).parents('.ui-btn').hide();
		
		$('#tl_readmore_btn', $('#home')).parents('.ui-btn').hide();
		$('#fu_readmore_btn', $('#home')).parents('.ui-btn').hide();

		$('#fu_my_post_btn', $('#home')).parents('.ui-btn').hide();
		
		$('#timeline_list', $('#home')).empty();
		$('#timeline_list', $('#home')).append('<li data-theme="c">ネットワークにつながっていません</li>').listview('refresh');
		$('#friendsupdate_list', $('#home')).empty();
		$('#friendsupdate_list', $('#home')).append('<li data-theme="c">ネットワークにつながっていません</li>').listview('refresh');
	}
}

function boot_menu_pos() {

	l("POSITION SETTING for ANDROID ... NOT FIXED.");
	var	_h = parseInt($(window).height());
	var	_w = parseInt($(window).width());
	var	w = (_h / 2);

	_h += 25;
	var	_d = _h / _w;
	l("_d "+_d);
	if (_d == 1.5) {	//	2:3	320x480 HVGA
		l("2:3");
		w *= 1.08;
	} else if (_d < 1.5) {	//	3:4	240x320 QVGA
		w *= 1.0;
	} else if (_d > 1.778) {	//	480x854	WVGA854
		w *= 0.93;
	} else if (_d > 1.7) {	//	9:16	720x1280
		w *= 0.96;	//	FOR INFOBAR
//		w *= 1.05;
	} else if (_d > 1.6) {	//... NEXUS
		w *= 1.01;
	} else if (_d > 1.5) {	//	6:10	480x800 WVGA800	
		w *= 1.0;
	}
	
	w = parseInt(w);
	
	var	px = ""+w+"px";
	l("WIDTH TO ..."+px+" width "+$(window).width()+" height "+$(window).height());
	
	$('#bootbox').css({'margin-top':px});
	
	w = parseInt($(window).width() / 8);
	w2 = parseInt($(window).width() / 9);
	px = ""+w+"px";
	var	px2 = ""+w2+"px";
	$('#bootbox').css({'margin-left':px, 'margin-right':px2});
}

(function($) {
	
	$('#home').live('pageinit', function(e,d){
		$('#tl_readmore_btn', $(this)).parents('.ui-btn').hide();
		$('#fu_readmore_btn', $(this)).parents('.ui-btn').hide();

		$('#li_tl:first').addClass('ui-btn-active');	//set the first tab as active   
		firstContent=$('#content_timeline');			//defining selectors
		secondContent=$('#content_friendsupdate');
		secondContent.hide();							//hide the second content division

		homeOnlineCheck();
		
		//clicking on tab 1
		$('#li_tl').live('tap',function(event){
			showContent1();
		});

		//clicking on tab 2
		$('#li_fu').live('tap',function(event){
			showContent2();
		});
		
		$('div.forTap', $('#home')).live('tap',function(event){
			var	id = $(this).attr('id');
			l("ID "+id);
			if (typeof(id) == "string") {
//				var	url = "http://www.facebook.com/"+id.replace(/_/,"/posts/");
				var	url = "http://m.facebook.com/story.php?id="+id.replace(/_/,"&story_fbid=");
				
				var	cb = ChildBrowser.install();
				if (cb != null) {
					cb.showWebPage(url);
				}
				return false;	//	ここで止める。
			}
		});
		
		/*
		$('li', $('#home')).live('tap',function(event){
			var	id = $(this).attr('id');
			l("ID "+id);
			if (typeof(id) == "string") {
//				var	url = "http://www.facebook.com/"+id.replace(/_/,"/posts/");
				var	url = "http://m.facebook.com/story.php?id="+id.replace(/_/,"&story_fbid=");
				
				var	cb = ChildBrowser.install();
				if (cb != null) {
//					cb.onClose = function(){self.onCloseBrowser();};
					cb.showWebPage(url);
				}
				return false;
			}
		});
		*/
		
		$('#tl_readmore_btn', $('#home')).live('click', function(e) {
			if (online && fblogined) {
				$('#tl_now_loading_div', $('#home')).slideDown();
				getTimeline();
			} else {
				$('#tl_now_loading_div', $('#home')).slideUp();
			}
		});
		
		$('#fu_readmore_btn', $('#home')).live('click', function(e) {
			if (online && fblogined) {
				$('#fu_now_loading_div', $('#home')).slideDown();
				getFriendsUpdate();
			} else {
				$('#fu_now_loading_div', $('#home')).slideUp();
			}
		});
		
		$('#fu_my_post_btn', $('#home')).live('click', function(e) {
			$.mobile.changePage('#post_sbfb_p', {
				transition:"pop"
			});
		});
		
		$('#tl_tryonline_btn', $('#home')).live('click', function(e) {
			if (online) {
				$.mobile.changePage('#boot');
				loginFacebook();
			}
		});
		$('#fu_tryonline_btn', $('#home')).live('click', function(e) {
			if (online) {
				$.mobile.changePage('#boot');
				loginFacebook();
			}
		});
	});

	$('#home').live('pagebeforeshow', function(e,d){
		try{
			if (fblogined) {
				$('#fu_my_post_btn').button('enable');
				$('#fu_tryonline_btn', $(this)).parents('.ui-btn').hide();
				$('#tl_tryonline_btn', $(this)).parents('.ui-btn').hide();
			} else {
				$('#fu_my_post_btn').button('disable');
				$('#fu_tryonline_btn', $(this)).parents('.ui-btn').show();
				$('#tl_tryonline_btn', $(this)).parents('.ui-btn').show();
			}
			
			var	json = getDataFromLocal("mydata");
			l("mydata " + json);
			if (json) {
				var	myobj=$.parseJSON(json);
				
				$('#home_best_score', $(this)).text(myobj.pi_best_score);
				$('#home_ave_score', $(this)).text(myobj.pi_average);
				$('#home_handicap', $(this)).text(myobj.pi_handicap);
				$('#home_ave_putt', $(this)).text(myobj.pi_putting_average);
			}
		} catch(e){l(e);}
	});
	
	$('#home').live('pageshow', function(e,d){
		$('#fu_now_loading_div', $(this)).slideUp();
		$('#tl_now_loading_div', $(this)).slideUp();
		if (online) {
			if (!fblogined) {
				$('#fu_my_post_btn', $(this)).button('disable');
			} else {
				$('#tl_readmore_btn', $(this)).parents('.ui-btn').show();
				$('#fu_readmore_btn', $(this)).parents('.ui-btn').show();
				$('#fu_my_post_btn', $(this)).button('enable');

				if (d.prevPage.attr('id') == "post_sbfb_p") {
					showContent2();
				} else {
					showContent1();
				}
			}
		}
	});
	
	$('#boot').live('pageinit', function(e,d) {
		try {
			/*
			l("POSITION SETTING for ANDROID ... NOT FIXED.");
			var	_h = parseInt($(window).height());
			var	_w = parseInt($(window).width());
			var	w = (_h / 2);

			_h += 25;
			var	_d = _h / _w;
			l("_d "+_d);
			if (_d == 1.5) {	//	2:3	320x480 HVGA
				l("2:3");
				w *= 1.08;
			} else if (_d < 1.5) {	//	3:4	240x320 QVGA
				w *= 1.0;
			} else if (_d > 1.778) {	//	480x854	WVGA854
				w *= 0.93;
			} else if (_d > 1.7) {	//	9:16	720x1280
				w *= 1.05;
			} else if (_d > 1.5) {	//	6:10	480x800 WVGA800	
				w *= 1.0;
			}
			
			w = parseInt(w);
			
			var	px = ""+w+"px";
			l("WIDTH TO ..."+px+" width "+$(window).width()+" height "+$(window).height());
			$('#bootbox').css({'margin-top':px});
			
			w = parseInt($(window).width() / 8);
			w2 = parseInt($(window).width() / 9);
			px = ""+w+"px";
			var	px2 = ""+w2+"px";
			$('#bootbox').css({'margin-left':px, 'margin-right':px2});
*/
		} catch(e){l(e);}
		//	ログインボタン
		$('#facebook_login_btn').live('click', function(e){
			if (online) {
				if (!fblogined) {
					loginFacebook();
				}
			}
		});
	});

	$('#boot').live('pagebeforeshow', function(e,d) {
		boot_menu_pos();
		//	ログインボタン
		if (online) {
			$('#facebook_login_btn').removeAttr('disabled');
		} else {
			$('#facebook_login_btn').attr('disabled','disabled');
		}
	});
	
})(jQuery);


/*
 Cordova - Golfer's HOME
 Copyright (c) 2012 Indi
 */




function marume(val) {
	return $.FourOutFiveIn(val, 3).FillZero(-1,3);
}

function marume2(val) {
	return $.FourOutFiveIn(val, 3).FillZero(-1,2);
}

function setSRAllZero() {
	var	pn = $('#scoreanalysis_p');
	
	$('#ave_score', pn).html("-");
	$('#worst_score', pn).html("-");
	$('#best_score', pn).html("-");
	$('#all_rounds', pn).html("-");
	
	$('#all_holes', pn).html("-");	//	全ホール数
	$('#holesum_a', pn).html("-");	//	全ホール数
	$('#holesum_3', pn).html("-");	//	全パー３ホール数
	$('#holesum_4', pn).html("-");	//	全パー４ホール数
	$('#holesum_5', pn).html("-");	//	全パー５ホール数
	
	$('#shotsum_a', pn).html("-");	//	ショット合計
	$('#shotsum_3', pn).html("-");	//	パー３
	$('#shotsum_4', pn).html("-");	//	パー４
	$('#shotsum_5', pn).html("-");	//	パー５
	
	$('#puttsum_a', pn).html("-");	//	パット合計
	$('#puttsum_3', pn).html("-");	//	パー３
	$('#puttsum_4', pn).html("-");	//	パー４
	$('#puttsum_5', pn).html("-");	//	パー５
	
	$('#par_sv_a', pn).html("-");	//	パーセーブ率
	$('#par_sv_3', pn).html("-");	//	パー３
	$('#par_sv_4', pn).html("-");	//	パー４
	$('#par_sv_5', pn).html("-");	//	パー５
	
	$('#par_on_a', pn).html("-");	//	パーオン率
	$('#par_on_3', pn).html("-");	//	パー３
	$('#par_on_4', pn).html("-");	//	パー４
	$('#par_on_5', pn).html("-");	//	パー５
	
	$('#bog_on_a', pn).html("-");	//	ボギーオン率
	$('#bog_on_3', pn).html("-");	//	パー３
	$('#bog_on_4', pn).html("-");	//	パー４
	$('#bog_on_5', pn).html("-");	//	パー５
	
	
	$('#eagle_a', pn).html("-");	//	イーグル率
	$('#eagle_3', pn).html("-");	//	パー３
	$('#eagle_4', pn).html("-");	//	パー４
	$('#eagle_5', pn).html("-");	//	パー５
	
	$('#bardy_a', pn).html("-");	//	バーディ率
	$('#bardy_3', pn).html("-");	//	パー３
	$('#bardy_4', pn).html("-");	//	パー４
	$('#bardy_5', pn).html("-");	//	パー５
	
	$('#par_a', pn).html("-");	//	パー率
	$('#par_3', pn).html("-");	//	パー３
	$('#par_4', pn).html("-");	//	パー４
	$('#par_5', pn).html("-");	//	パー５
	
	$('#bogey_a', pn).html("-");	//	ボギー率
	$('#bogey_3', pn).html("-");	//	パー３
	$('#bogey_4', pn).html("-");	//	パー４
	$('#bogey_5', pn).html("-");	//	パー５
	
	$('#dbogey_a', pn).html("-");	//	ダブルボギー率
	$('#dbogey_3', pn).html("-");	//	パー３
	$('#dbogey_4', pn).html("-");	//	パー４
	$('#dbogey_5', pn).html("-");	//	パー５
	
	$('#recover_p', pn).html("-");
	$('#buncker_p', pn).html("-");	//	バンカー率	
	$('#penalty_p', pn).html("-");	//	ペナルティ率
	$('#ob_p', pn).html("-");		//	OB率	
}

function doCalc(enc) {
	var	pn = $('#scoreanalysis_p');

	var	wst_id = $.evalJSON(enc).worst_round_id;
	var	bst_id = $.evalJSON(enc).best_round_id;

	var	as = $.evalJSON(enc).average_score;
	var	ws = $.evalJSON(enc).worst_score;
	var	bs = $.evalJSON(enc).best_score;
	
	//	スコア：平均、ベスト、ワースト
	$('#ave_score', pn).html(marume2(as));
	$('#worst_score', pn).html(ws);
	$('#best_score', pn).html(bs);

	//	全ラウンド数
	var	rc = $.evalJSON(enc).round_count;
	$('#all_rounds', pn).html(rc);

	var	tmp;
	var	allsum = $.evalJSON(enc).sum_data;
	if (allsum) {
//		var	sums = new Sums();
//		var	all = $.toJSON(allsum);
//		sums = allsum;
		sums = $.parseJSON(allsum);
		
		var	pc0 = sums.pcnt_sum["0"]
		var	pc3 = sums.pcnt_sum["3"]
		var	pc4 = sums.pcnt_sum["4"]
		var	pc5 = sums.pcnt_sum["5"]
		
		var	sa0 = sums.shot_sum["0"]
		var	sa3 = sums.shot_sum["3"]
		var	sa4 = sums.shot_sum["4"]
		var	sa5 = sums.shot_sum["5"]

		if (pc0 == 0) {
			setSRAllZero();
			return;
		}

		if (pc3 == 0) {
			pc3 = 1000;
		}
		if (pc4 == 0) {
			pc4 = 1000;
		}
		if (pc5 == 0) {
			pc5 = 1000;
		}
		
		$('#all_holes', pn).html(pc0);	//	全ホール数
		$('#holesum_a', pn).html(pc0);	//	全ホール数
		$('#holesum_3', pn).html(pc3);	//	全パー３ホール数
		$('#holesum_4', pn).html(pc4);	//	全パー４ホール数
		$('#holesum_5', pn).html(pc5);	//	全パー５ホール数
		
		$('#shotsum_a', pn).html(sa0);	//	ショット合計
		$('#shotsum_3', pn).html(sa3);	//	パー３
		$('#shotsum_4', pn).html(sa4);	//	パー４
		$('#shotsum_5', pn).html(sa5);	//	パー５
		
		$('#puttsum_a', pn).html(sums.putt_sum["0"]);	//	パット合計
		$('#puttsum_3', pn).html(sums.putt_sum["3"]);	//	パー３
		$('#puttsum_4', pn).html(sums.putt_sum["4"]);	//	パー４
		$('#puttsum_5', pn).html(sums.putt_sum["5"]);	//	パー５
		
		tmp = sums.para_sum["0"] / pc0;
		$('#par_sv_a', pn).html(marume(tmp));	//	パーセーブ率
		tmp = sums.para_sum["3"] / pc3;
		$('#par_sv_3', pn).html(marume(tmp));	//	パー３
		tmp = sums.para_sum["4"] / pc4;
		$('#par_sv_4', pn).html(marume(tmp));	//	パー４
		tmp = sums.para_sum["5"] / pc5;
		$('#par_sv_5', pn).html(marume(tmp));	//	パー５
		
		tmp = sums.gir0_sum["0"] / pc0;
		$('#par_on_a', pn).html(marume(tmp));	//	パーオン率
		tmp = sums.gir0_sum["3"] / pc3;
		$('#par_on_3', pn).html(marume(tmp));	//	パー３
		tmp = sums.gir0_sum["4"] / pc4;
		$('#par_on_4', pn).html(marume(tmp));	//	パー４
		tmp = sums.gir0_sum["5"] / pc5;
		$('#par_on_5', pn).html(marume(tmp));	//	パー５
		
		tmp = sums.girb_sum["0"] / pc0;
		$('#bog_on_a', pn).html(marume(tmp));	//	ボギーオン率
		tmp = sums.girb_sum["3"] / pc3;
		$('#bog_on_3', pn).html(marume(tmp));	//	パー３
		tmp = sums.girb_sum["4"] / pc4;
		$('#bog_on_4', pn).html(marume(tmp));	//	パー４
		tmp = sums.girb_sum["5"] / pc5;
		$('#bog_on_5', pn).html(marume(tmp));	//	パー５
		
		
		tmp = sums.parp_sum["-2"]["0"] / pc0;
		$('#eagle_a', pn).html(marume(tmp));	//	イーグル率
		tmp = sums.parp_sum["-2"]["3"] / pc3;
		$('#eagle_3', pn).html(marume(tmp));	//	パー３
		tmp = sums.parp_sum["-2"]["4"] / pc4;
		$('#eagle_4', pn).html(marume(tmp));	//	パー４
		tmp = sums.parp_sum["-2"]["5"] / pc5;
		$('#eagle_5', pn).html(marume(tmp));	//	パー５
		
		tmp = sums.parp_sum["-1"]["0"] / pc0;
		$('#bardy_a', pn).html(marume(tmp));	//	バーディ率
		tmp = sums.parp_sum["-1"]["3"] / pc3;
		$('#bardy_3', pn).html(marume(tmp));	//	パー３
		tmp = sums.parp_sum["-1"]["4"] / pc4;
		$('#bardy_4', pn).html(marume(tmp));	//	パー４
		tmp = sums.parp_sum["-1"]["5"] / pc5;
		$('#bardy_5', pn).html(marume(tmp));	//	パー５

		tmp = sums.parp_sum["0"]["0"] / pc0;
		$('#par_a', pn).html(marume(tmp));	//	パー率
		tmp = sums.parp_sum["0"]["3"] / pc3;
		$('#par_3', pn).html(marume(tmp));	//	パー３
		tmp = sums.parp_sum["0"]["4"] / pc4;
		$('#par_4', pn).html(marume(tmp));	//	パー４
		tmp = sums.parp_sum["0"]["5"] / pc5;
		$('#par_5', pn).html(marume(tmp));	//	パー５
		
		tmp = sums.parp_sum["1"]["0"] / pc0;
		$('#bogey_a', pn).html(marume(tmp));	//	ボギー率
		tmp = sums.parp_sum["1"]["3"] / pc3;
		$('#bogey_3', pn).html(marume(tmp));	//	パー３
		tmp = sums.parp_sum["1"]["4"] / pc4;
		$('#bogey_4', pn).html(marume(tmp));	//	パー４
		tmp = sums.parp_sum["1"]["5"] / pc5;
		$('#bogey_5', pn).html(marume(tmp));	//	パー５
		
		tmp = sums.parp_sum["2"]["0"] / pc0;
		$('#dbogey_a', pn).html(marume(tmp));	//	ダブルボギー率
		tmp = sums.parp_sum["2"]["3"] / pc3;
		$('#dbogey_3', pn).html(marume(tmp));	//	パー３
		tmp = sums.parp_sum["2"]["4"] / pc4;
		$('#dbogey_4', pn).html(marume(tmp));	//	パー４
		tmp = sums.parp_sum["2"]["5"] / pc5;
		$('#dbogey_5', pn).html(marume(tmp));	//	パー５
		
		
		/*		
		if (sums.bunkerhole_sum > 0) {
			tmp = sums.sandsaves_sum / sums.bunkerhole_sum;	//	サンドセーブ率
			_tmp = marume(tmp);
		} else {
			_tmp = "-";
		}
		$('#sandsaves', pn).html(_tmp);
		 */
		if (sums.recover_sum) {
			_tmp = sums.recover_sum / sa0 * 100;
			$('#recover_p', pn).html(marume(_tmp));
		}

		tmp = sums.bunker_sum / sa0 * 100;	//	バンカー率	
		$('#buncker_p', pn).html(marume(tmp));
		
		tmp = sums.penalty_sum / sa0 * 100;	//	ペナルティ率	
		$('#penalty_p', pn).html(marume(tmp));
		
		tmp = sums.ob_sum /sa0 * 100;	//	OB率	
		$('#ob_p', pn).html(marume(tmp));
	}
}

(function($) {
	$('#scoreanalysis_p').live('pagebeforeshow', function(e,d){
		var	params=$(this).data('params');
		var	title=params['title'];
		if (title) {
			$('#sa_report_title', $(this)).html(title);
		}
	});
	
	$('#scoreanalysis_p').live('pageshow', function(e,d){
		try{
			if (!online || !fblogined) {
				navigator.notification.alert("ネットワークに接続していないか、shotbookにログインしていません。", null, "エラー");
				history.back();
				return true;
			}

			var	params=$(this).data('params');
			var	options=params['options'];
			if (options) {
				$.mobile.showPageLoadingMsg('a', 'ダウンロード中');
				$.getJSON(root_url, options, function(response) {
					var	enc = $.toJSON(response);

					$.mobile.hidePageLoadingMsg();
					if (checkOkNg(enc)) {
						doCalc(enc);
					} else {
						navigator.notification.alert("集計結果がありませんでした。", null, "エラー");
						history.back();
						return false;
					}
				});
			}
		} catch(e){l(e);}
	});
})(jQuery);


/*
 Cordova - Golfer's Dashboard DB
 Copyright (c) 2012 Indi
 */
function onSuccess(position) {
/*	var	txt =
	'Latitude: '			+ position.coords.latitude + '<br />' +
	'Longitude: '			+ position.coords.longitude + '<br />' +
	'Altitude: '			+ position.coords.altitude + '<br />' +
	'Accuracy: '			+ position.coords.accuracy + '<br />' +
	'Altitude Accuracy: '	+ position.coords.altitudeAccuracy + '<br />' +
	'Heading: '				+ position.coords.heading + '<br />' +
	'Speed: '				+ position.coords.speed + '<br />' +
	'Timestamp: '			+ position.timestamp + '<br />';

	l(txt);	*/
	
	$.mobile.hidePageLoadingMsg();
	
	var	event = {data:{page:'#results_gc_p', params:{'code':2, 'new':true,  'latitude':position.coords.latitude, 'longitude':position.coords.longitude, 'revflg':false}}};
	
	var params = $('#search_gc_p').data('params');
	if (params) {
		if (params.revflg) {
			event.data.params.revflg = true;
		}
	}
	
	moveto(event);
}

function onError(error) {
	$.mobile.hidePageLoadingMsg();

	navigator.notification.alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n', null, "エラー");
}

function alertCallback(e) {
}

(function($) {
	
	$('#search_gc_p').live("pageinit", function(event, data) {

		$('#search_gc_form').on('submit', function() {
			var a = $(this).serializeArray();
			var	keyword = "";
			for(var i in a) {
				if (a[i].name === "sgc_keywords_name") {
					keyword = a[i].value;
					continue;
				}
			}
			if (keyword.length == 0) {
				navigator.notification.alert("キーワードを入力してください。", alertCallback, "警告");
				return false;
			}

			var	event = {data:{page:'#results_gc_p', params:{'key':keyword, 'new':true, 'revflg':false}}};
			
			var params = $('#search_gc_p').data('params');
			if (params) {
				if (params.revflg) {
					event.data.params.revflg = true;
				}
			}
			
			moveto(event);
			
			return false;
		});
		
		$('#sgc_history_search', $('#search_gc_p')).live('click', function(){

			var	event = {data:{page:'#results_gc_p', params:{'code':0, 'new':true, 'revflg':false}}};
			moveto(event);
			
			return false;
		});
		
		$('#sgc_gps_search', $('#search_gc_p')).live('click', function(){
			
			$.mobile.showPageLoadingMsg();
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
			
			return false;
		});
	});

	$('#search_gc_p').live("pagebeforeshow", function(event, data) {
		var params = $(this).data('params');
//		l("PARAMS "+$.JSONstr(params));
		if (params) {
			if (params.revflg) {
				l("RESERVE ONLY");
			}
			$('#sgc_history_search', $(this)).hide();
		} else {
			$('#sgc_history_search', $(this)).show();
		}
	});
	
	$('#search_gc_p').live("pagebeforehide", function(event, data) {
		$(this).removeData('params');
	});
	
	$('#search_gc_p').live("pageshow", function(event, data) {
		var	tgt = $('#results_gc_p');
		if (tgt) {
			$('#results_gc_p').removeData('params');
			$('#results_gc_p').removeData('showing');
			$('#results_gc_p').removeData('limit');
			$('#results_gc_p').removeData('max');
		}
	});

}) (jQuery);


/*
	Cordova - Golfer's Dashboard GolfCourse Data
	Copyright (c) 2012 Indi
 
	本来ライブラリ的に分けるべきだよね…jQueryに乗っかってるけど。
*/
//<![CDATA[


var	BaseQue = function() {
//	this._array = new Array();
};
BaseQue.prototype = {
	size: function() {
		return this._array.length;
	},
	push: function(obj) {
		this._array.push(obj);
	},
	toString: function() {
		return "["+this._array.join(",")+"]";
	}
};


var	Stack = function(){
	this._array = new Array();
};
Stack.prototype = $.extend({
	pop: function() {
		if (this._array.length > 0) {
			return this._array.pop();
		}
		return null;
	}
}, BaseQue.prototype);


var	Fifo = function(){
	this._array = new Array();
};
Fifo.prototype = $.extend({
	pop: function() {
		if (this._array.length > 0) {
			return this._array.shift();
		}
		return null;
	}
}, BaseQue.prototype);



var ListBlock = function() {
	this._current=0;	//	常にカウントアップ
	this._count=0;		//	内包する個数。配列のlengthはアテにならないから。
	this._array=new Array();
};

ListBlock.prototype.add = function(obj) {
	var	i = this._current;
	this._count++;
	this._array[i]=obj;
	this._current++;
};

ListBlock.prototype.del = function(i) {
	if (i >= 0 && i < this._current) {
		if (this._array[i] !== "undefined") {
			delete this._array[i];
			this._count --;
			
			var	na = new Array();
			var	c = 0;
			for(var j in this._array){
				var	o=this._array[j];
				na.push(o);
				c++;
			}
			this._array = na;
			this._current = c;
			
			return true;
		}
	}
	return false;
};

ListBlock.prototype.get = function(i) {
	if (i >= 0 && i < this._current) {
		if (this._array[i] !== "undefined") {
			return this._array[i];
		}
	}
	return false;
};

ListBlock.prototype.getbody = function() {
	if (this._count > 0) {
		return this._array;
	}
	return false;
};

//	for test
ListBlock.prototype.dumpall = function() {
	for(var i in this._array) {
		l(i +":"+ this._array[i]);
	}
};
//	each()とかfor(var x in a)とかできない。どうする？

ListBlock.prototype.ins = function(i, obj) {
	if (i >= 0){
		if (i < this._current) {

			var	c = 0;
			var	na = new Array();
			for(var j in this._array){
				var	o=this._array[j];
				if (c < i) {
				} else if (c == i) {
					na[c]=obj;
					c++;
				} else {
				}
				na[c]=o;
				c++;
			}
			
			this._current=c;		
			this._array = na;
			this._count ++;
		} else {
			this.add(obj);
		}
	}
	return false;
};

ListBlock.prototype.cnt = function() {
	return this._count;
};


ListBlock.prototype.clear = function() {
	this._current=0;
	this._count=0;
	this._array=new Array();
	return true;
};




function StrCmp(str1, str2) {
	var ct;
	var cmp=0;
	
	if((cmp = str1.length - str2.length) != 0) {
		return cmp;
	}
	
	for(ct = 0; ct < str1.length; ct++) {
		var c1 = str1.charCodeAt(ct);
		var c2 = str2.charCodeAt(ct);
		if((cmp = (c1 - c2)) != 0) {
			break;
		}
	}
	return cmp;
}

String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		c = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+c;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};

/*
Math.ceil()		//	大きい整数
Math.floor()	//	小さい整数
Math.round()	//	四捨五入
parseInt( ,10)	//	切り捨て
*/



/*
	var img = document.getElementById("tmp"); 
	img.src = "http://example.jp/image.png";
	img.border = 1;
	img.width = 100;
	img.height = 100;
	img.hspace = 10;
	img.vspace = 10;
	img.onload = function() {
//		alert('読み込み完了');
	}
 */

/*
(function($) {
//	TO USE	$('form').disableOnSubmit();
	$.fn.disableOnSubmit = function(disableList){
		
		if (disableList == null) {
			var $list = 'input[type=submit],input[type=button],input[type=reset],button';
		} else{ 
			var $list = disableList;
		}
		
		$(this).find($list).removeAttr('disabled');
		
		$(this).submit(function(){$(this).find($list).attr('disabled','disabled');});
		
		return this;
	};
	$.fn.enebleSubmitBtn = function(disableList){
		
		if (disableList == null) {
			var $list = 'input[type=submit],input[type=button],input[type=reset],button';
		} else {
			var $list = disableList;
		}
		
		$(this).find($list).removeAttr('disabled');
		
		return this;
	};
	
})( jQuery );
*/

/*
obj = $.parseJSON(文字列)
文字列 = $.JSONstr(obj);

 var obj = $('form').serializeArray();
 */

jQuery.extend({
	JSONstr : function(obj) {
		var t = typeof(obj);
		if (t != "object" || obj === null) {
			// simple data type
			if (t == "string")
				obj = '"' + obj + '"';
			return String(obj);
		} else {
			// recurse array or object
			var n, v, json = [], arr = (obj && obj.constructor == Array);
			
			for (n in obj) {
				v = obj[n];
				t = typeof(v);
				if (obj.hasOwnProperty(n)) {
					if (t == "string")
						v = '"' + v + '"';
					else if (t == "object" && v !== null)
						v = jQuery.JSONstr(v);
					json.push((arr ? "" : '"' + n + '":') + String(v));
				}
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
		}
	},
	
	FourOutFiveIn : function(num, decimalplaces) {
		var	base;
		var	t = typeof(num);
		if (t == "string"){
			base = parseFloat(num);
		} else if (t == "number"){
			base = num;
		} else {
			return NaN;
		}
		
		var	p=Math.pow(10, decimalplaces);
		var	ret=Math.round(base * p) / p;
		return ret;
	}	
});

Number.prototype.FillZero = function(places, decimalplaces) {
	var	ret;
	var	tmp = this.toString().split('.');
	var	n = tmp[0];
	var	d = tmp[1];
	if (places > 0) {
		ret = Array((places+1) - n.length).join('0') + n;
	} else {
		ret = parseInt(n);
	}
	if (d) {
		ret += '.' + d;
		if (decimalplaces > 0) {
			ret += Array((decimalplaces+1) - d.length).join('0');
		}
	} else {
		if (decimalplaces > 0) {
			ret += '.' + Array((decimalplaces+1)).join('0');
		}
	}
	return ret;
};

function normalizeDate(date) {
	var	txt="";
	var	d;
	var	tmp;
	l(date);
	if (typeof(date) === "string") {
		d = new Date(date.replace(/-/g,"/"));
		
		var year = d.getFullYear();
		var month = d.getMonth() + 1;
		var day = d.getDate();
		
//		l(year+" / "+month+" / "+day);
		
		month = '0' + month;
		tmp = month.substr(month.length - 2, 2);
		month = tmp;
		day = '0'+day;
		tmp = day.substr(day.length - 2, 2);
		day = tmp;
		
		return ''+year+month+day;
	}
}


function getPhoneGapPath() {
	var path = window.location.pathname;
	path = path.substr( path, path.length - 10 );
	return 'file://' + path;
}

function byteLength(str) {
	var	uec = encodeURI(str);
	var	per = uec.match(/%/g);
	return uec.length - per.length * 2;
}

function checksum(s) {
	var i;
	var chk = 0x12345678;
	for (i = 0; i < s.length; i++) {
		chk += (s.charCodeAt(i) * i);
	}
	return chk;
}

function strWidth(str, size) {
	var e = $("#ruler");
	e.attr('font-size:'+size+'px;');
	var width = e.text(str).get(0).offsetWidth;
	e.empty();
	return width;
}

//Summer Time Start date.
function getSummerTimeStart(year) {
	var st = new Date(year, 3, 1, 2, 0, 0);		// April, 1st sunday
	var	wd = st.getDay();
	if (wd != 0) {
		wd = 7-wd;
		st.setDate(wd);
	}
	return st.getTime();
}

function getSummerTimeEnd(year) {
	//	FOR EUROPE
	/*
	var st = new Date(year, 9, 31, 1, 0, 0);	//	Oct,31. Last sunday
	var	wd = st.getDay();
	if (wd != 0) {
		wd = 31-wd;
		st.setDate(wd);
	}
	 */
	var st = new Date(year, 10, 1, 1, 0, 0);	//	Nov, 1st sunday
	var	wd = st.getDay();
	if (wd != 0) {
		wd = 7-wd;
		st.setDate(wd);
	}
	return st.getTime();
}
//]]>

/*
 Cordova - Shotbook ScoreEdit page
 Copyright (c) 2012 Indi
 */

function sw_cancel() {
	l("canceled");
}

function changeSEHole(hole) {
	var	pn=$('#scoreedit_p');
	
	var	rd = pn.data('rounddata');
	if (hole - 1 > 0) {
		$('#sc_up_btn .ui-btn-text').text(hole - 1);
		$('#sc_up_btn').removeClass('ui-disabled');
	} else {
		$('#sc_up_btn .ui-btn-text').text("-");
		$('#sc_up_btn').addClass('ui-disabled', true);
	}

	var	par = rd.pars[hole-1];
	var	yards = rd.yards[hole-1];
	
	$('#seh_par', $('#scoreedit_p')).text("PAR."+par);
	$('#seh_hole', $('#scoreedit_p')).text(hole);
	$('#seh_yards', $('#scoreedit_p')).text(yards+"Y");
	
	var	max_holes = rd.pars.length;
	if (hole + 1 <= max_holes) {
		$('#sc_down_btn .ui-btn-text').text(hole + 1);
		$('#sc_down_btn').removeClass('ui-disabled');
	} else {
		$('#sc_down_btn .ui-btn-text').text("-");
		$('#sc_down_btn').addClass('ui-disabled', true);
	}
	
	for(var i=1;i<4;i++) {
		var	name = "#sc_name_"+i;
		var	shot = "#sc_shot_"+i;
		var	shot_p = "#sc_shot_plus_"+i;
		var	shot_m = "#sc_shot_minus_"+i;
		$(name, $('#scoreedit_p')).text("-").addClass('ui-disabled', true);
		$(shot, $('#scoreedit_p')).text("-").addClass('ui-disabled', true);
		
		$(shot_p, $('#scoreedit_p')).addClass('ui-disabled', true);
		$(shot_m, $('#scoreedit_p')).addClass('ui-disabled', true);
	}

	var	reset = false;
	for(var i in rd.scores) {
		score=rd.scores[i];
		var	hscore = score.holescores[hole-1];

		l("ROUNDDATA["+(hole-1)+"]["+i+"]"+$.JSONstr(hscore));
		
		var	name = "#sc_name_"+i;
		var	shot = "#sc_shot_"+i;
		var	shot_p = "#sc_shot_plus_"+i;
		var	shot_m = "#sc_shot_minus_"+i;

		var	snp = (score.player.name).split(" ");
		var	sn=snp[0];
		
		$(name, $('#scoreedit_p')).text(sn).removeClass('ui-disabled');
		if (hscore.shot == 0) {
			reset = true;
			hscore.shot = par;
		} else {
			reset = false;
		}
		
		$(shot, $('#scoreedit_p')).text(hscore.shot).removeClass('ui-disabled');
		if (i == 0) {
			if (reset) {
				hscore.putt = 2;
				hscore.ob = 0;
				hscore.bunker = 0;
				hscore.penalty = 0;
			}
			$('#sc_putt_0', $('#scoreedit_p')).text(hscore.putt);
			
			$('#sc_ob_count', $('#scoreedit_p')).text(hscore.ob);
			$('#sc_bunker_count', $('#scoreedit_p')).text(hscore.bunker);
			$('#sc_penalty_count', $('#scoreedit_p')).text(hscore.penalty);
			
			if (par != 3) {
				$('#sc_fairwaykeep').removeClass('ui-disabled');
				if (hscore.fairwaykeep == 1) {
					$('a.radialToggle').addClass('touchHover');
					$('#sc_fairwaykeep').text("ON");
					$('#sc_fairwaykeep').css('font-size', '28px');
				} else {
					$('a.radialToggle').removeClass('touchHover');
					$('#sc_fairwaykeep').text("OFF");
					$('#sc_fairwaykeep').css('font-size', '24px');
				}
			} else {
				$('a.radialToggle').removeClass('touchHover');
				$('#sc_fairwaykeep').text("-");
				$('#sc_fairwaykeep').css('font-size', '24px');
				$('#sc_fairwaykeep').addClass('ui-disabled');
			}
		} else {
			$(shot_p, $('#scoreedit_p')).removeClass('ui-disabled');
			$(shot_m, $('#scoreedit_p')).removeClass('ui-disabled');
		}
	}

}


function plusSEHole(user, isShot) {
	l("plusSEHole "+user);
	
	var	pn=$('#scoreedit_p');
	var	rd = pn.data('rounddata');
	var	hole=pn.data('hole');	//	1..9/18
	
	var	hscore = rd.scores[user].holescores[hole-1];
	if (isShot) {
		if (hscore.shot < 15) {
			hscore.shot ++;
			$("#sc_shot_"+user, $('#scoreedit_p')).text(hscore.shot);
		}
	} else {
		if (hscore.shot > hscore.putt) {
			hscore.putt ++;
			$("#sc_putt_"+user, $('#scoreedit_p')).text(hscore.putt);
		}
	}
}

function minusSEHole(user, isShot) {
	l("minusSEHole "+user);

	var	pn=$('#scoreedit_p');
	var	rd = pn.data('rounddata');
	var	hole=pn.data('hole');	//	1..9/18
	
	var	hscore = rd.scores[user].holescores[hole-1];
	if (isShot) {
		if (hscore.shot > 0) {
			hscore.shot --;
			$("#sc_shot_"+user, $('#scoreedit_p')).text(hscore.shot);
			if (hscore.putt > hscore.shot) {
				hscore.putt = hscore.shot;
				$("#sc_putt_"+user, $('#scoreedit_p')).text(hscore.putt);
			}
		}
	} else {
		if (hscore.putt > 0) {
			hscore.putt --;
			$("#sc_putt_"+user, $('#scoreedit_p')).text(hscore.putt);
		}
	}
}

function editSELie(type, isPlus) {
	l("editSELie "+type);
	try {
		var	pn=$('#scoreedit_p');
		var	rd=pn.data('rounddata');
		var	hole=pn.data('hole');	//	1..9/18
	
		var	hscore = rd.scores[0].holescores[hole-1];
		l("HSCORE "+$.JSONstr(hscore));
		if (hscore[type] == null) {
			hscore[type] = 0;
		}
		if (isPlus) {
			if (hscore[type] <= (hscore.shot - hscore.putt)) {
				hscore[type] ++;
				$("#sc_"+type+"_count", $('#scoreedit_p')).text(hscore[type]);
			}
		} else {
			if (hscore[type] > 0) {
				hscore[type] --;
				$("#sc_"+type+"_count", $('#scoreedit_p')).text(hscore[type]);
			}
		}
	} catch(e){l("editSELie "+e);}
}


(function($) {

	$('#scoreedit_p').live("pageinit", function(event, data) {
		
		var	pn = $(this);

		$('a.radialBtn').live('touchstart', function(){
			$(this).addClass('touchHover');
		}).live('touchend', function(){
			$(this).removeClass('touchHover');
			
			var	id = $(this).attr('id');
			l("radialBtn ID "+id);
			if (id == "sc_shot_plus_0") {
				plusSEHole(0, true);
			} else if (id == "sc_shot_minus_0") {
				minusSEHole(0, true);
			} else if (id == "sc_shot_plus_1") {
				plusSEHole(1, true);
			} else if (id == "sc_shot_minus_1") {
				minusSEHole(1, true);
			} else if (id == "sc_shot_plus_2") {
				plusSEHole(2, true);
			} else if (id == "sc_shot_minus_2") {
				minusSEHole(2, true);
			} else if (id == "sc_shot_plus_3") {
				plusSEHole(3, true);
			} else if (id == "sc_shot_minus_3") {
				minusSEHole(3, true);
			} else if (id == "sc_putt_plus_0") {
				plusSEHole(0, false);
			} else if (id == "sc_putt_minus_0") {
				minusSEHole(0, false);
			}
		});
		
		
		$('a.radialSBtn').live('touchstart', function(){
			$(this).addClass('touchHover');
		}).live('touchend', function(){
			$(this).removeClass('touchHover');
			
			var	id = $(this).attr('id');
			l("radialSBtn ID "+id);
			if (id == "sc_ob_plus") {
				editSELie("ob", true);
			} else if (id == "sc_ob_minus") {
				editSELie("ob", false);
			} else if (id == "sc_penalty_plus") {
				editSELie("penalty", true);
			} else if (id == "sc_penalty_minus") {
				editSELie("penalty", false);
			} else if (id == "sc_bunker_plus") {
				editSELie("bunker", true);
			} else if (id == "sc_bunker_minus") {
				editSELie("bunker", false);
			}
		});
		
		$('a.radialToggle').live('touchend', function(){
			var	txt = $('#sc_fairwaykeep').text();
			l("sc_fairwaykeep touchend "+txt);

			var	pn=$('#scoreedit_p');
			var	rd=pn.data('rounddata');
			var	hole=pn.data('hole');	//	1..9/18
			var	hscore = rd.scores[0].holescores[hole-1];
			
			if (txt == "ON") {
				hscore.fairwaykeep = 0;
				$(this).removeClass('touchHover');
				$('#sc_fairwaykeep').text("OFF");
				$('#sc_fairwaykeep').css('font-size', '24px');
			} else {
				hscore.fairwaykeep = 1;
				$(this).addClass('touchHover');
				$('#sc_fairwaykeep').text("ON");
				$('#sc_fairwaykeep').css('font-size', '28px');
			}
		});
		
		$('#sc_down_btn').live('click', function(){
			var	hole=$('#scoreedit_p').data('hole');	//	1..9/18
			changeSEHole(hole+1);
			$('#scoreedit_p').data('hole', hole+1);		//	1..9/18
		});

		$('#sc_up_btn').live('click', function(){
			var	hole=$('#scoreedit_p').data('hole');	//	1..9/18
			changeSEHole(hole-1);
			$('#scoreedit_p').data('hole', hole-1);		//	1..9/18
		});

	});

	$('#scoreedit_p').live("pagebeforehide", function(event, data) {
		var	flg = ($('#scoreedit_p').data('hole') > 9);	//	1..9/18
		$('#round_score_p').data('params', {'show_in':flg});
	});

	$('#scoreedit_p').live("pagebeforeshow", function(event, data) {
		var	pn = $(this);
		try {
			var	params=$(this).data('params');
		
			if (params) {
				var	rd=params["item"];
				var	hole=parseInt(params["hole"]);
				var	score;
				var	holescore;
				if (rd) {
					l("HAS RD");
					pn.data('rounddata', rd);
					pn.data('hole', hole);	//	1..9/18
					
					changeSEHole(hole);
				}
			}
			else {
			}
		}catch(e){l("sc pbs " + e);}
	});

	$('#scoreedit_p').live("pageshow", function(event, data) {
		$.mobile.activePage.data('ui.prevPage',data.prevPage);
	});
}) (jQuery);


/*
 * Loader.js
 * check OS and load suitable javascript code.
 */
//<![CDATA[

var IS_ANDROID = (/android/gi).test(navigator.appVersion);
//	var IS_IOS4    = navigator.userAgent.match(/OS 4_[0-9_]+ like Mac OS X/i) !== null;
var IS_IOS5    = navigator.userAgent.match(/OS 5_[0-9_]+ like Mac OS X/i) !== null;

(function($) {
	(function() {
		var phonegapJs = "";
		// PhoneGapライブラリの設定
		if (IS_ANDROID) {
			phonegapJs = "cordova-a.js";
		} else {
			phonegapJs = 'cordova-i.js';
		}
	 
		// 読み込むファイルのリスト生成
		var scripts =
			[
			 // 各種ライブラリ
			 'config.js',
			 'jquery.mobile-1.1.0.js',
			 "addins/jqm-datebox.core.min.js",
			 "addins/jqm-datebox.mode.calbox.min.js",
			 "addins/jquery.mobile.datebox.i18n.ja.utf8.js",
			 "addins/jquery.tmpl.min.js",
			 "addins/jquery.validate.min.js",
			 "addins/jquery.json-2.3.min.js",
			 "addins/jqm.page.params.js",
			 
			 '' + phonegapJs,
			 
			 // アプリ固有のスクリプト
			 "debug.js",
			 "data.js",
			 "common.js",
			 "gddb-test.js",
			 "jquery.shotbook.js",
			 "jquery.sb_home.js",
			 "jquery.sb_menu.js",
			 "jquery.sb_gc_infos_p.js",
			 "jquery.sb_edit_round_tee_p.js",
			 "jquery.sb_edit_round_info_p.js",
			 "jquery.sb_edit_round_player_p.js",
			 "jquery.sb_round_score_p.js",
			 "jquery.sb_sc_edit_info_p.js",
			 "jquery.sb_scoreedit_p.js",
			 "jquery.sb_detailed_scoreedit_p.js",
			 "jquery.sb_make_invites_p.js",
			 "jquery.sb_have_invites_p.js",
			 "jquery.sb_sc_edit_player_p.js",
			 "jquery.sb_player_infoedit_p.js",
			 "jquery.sb_scoreanalysis_sel_p.js",
			 "jquery.sb_rounds_list_p.js",
			 "jquery.sb_setting_gg_p.js",
			 "jquery.sb_make_inv_p.js",
			 "jquery.sb_search_gc_p.js",
			 "jquery.sb_results_gc_p.js",
			 "jquery.sb_list_of_data_p.js",
			 "jquery.sb_golfriend_list_p.js",
			 "jquery.sb_roundscore_analysis_p.js",
			 "jquery.sb_check_inv_p.js",
			 "jquery.sb_post_sbfb_p.js",
			 "jquery.sb_scoreanalysis_p.js",
			 "jquery.sb_contacts.js",
			 "jquery.sb_login.js",
			 "jquery._localdb.js",
			 "plugins/PickerView.js",
			 "plugins/childbrowser.js"
	  ];
		for (var i = 0, len = scripts.length; i < len; i++) {
			loadScript(scripts[i]);
		}
		console.log("LOADING... js files");
	})();
	 
	function loadScript(filename) {
		var script = '%3Cscript type="text/javascript" src="' + filename + '"%3E%3C/script%3E';
		document.write(unescape(script));
	}
	
	console.log("JQ EXTEND...");
	jQuery.extend(jQuery.validator.messages, {
		required: "必須項目です",
		maxlength: jQuery.format("{0} 文字以下を入力してください"),
		minlength: jQuery.format("{0} 文字以上を入力してください"),
		rangelength: jQuery.format("{0} 文字以上 {1} 文字以下で入力してください"),
		email: "メールアドレスを入力してください",
		url: "URLを入力してください",
//		date: "日付を入力してください",
//		dateISO: "ISO日付を入力してください",
		number: "有効な数字を入力してください",
		digits: "0-9までを入力してください",
		equalTo: "同じ値を入力してください",
		range: jQuery.format(" {0} から {1} までの値を入力してください"),
		max: jQuery.format("{0} 以下の値を入力してください"),
		min: jQuery.format("{0} 以上の値を入力してください"),
//		creditcard: "クレジットカード番号を入力してください"
	});
}) (jQuery);

//]]>

/*
	Cordova - Golfer's Dashboard DB
Copyright (c) 2012 Indi
*/

//	var self = {};

var	_gdb_db = null;

function _open_db_() {
	if (_gdb_db == null) {
		_gdb_db = window.openDatabase("phonegap_db", "1.0", "Shotbook DB", 1024 * 1024 * 4);	/*1000000*/
		
		if (!_gdb_db) {
			console.log(" cannot open db");
			alert(" cannot open db");
			return null;
		}
	}
	return _gdb_db;
}

function initDB() {
	//	if version is '' then can open all version.
	//	if version is not correct, then you can not open requested db.
	var	gdb_db = _open_db_();
	if (gdb_db != false) {
		gdb_db.transaction(initDbSql, errorDbSQL, successDBinit); // 初期テーブル
	}
//	gdb_db.changeVersion("1.0", "1.1");	//	change db version, スキーマを変更したらする.
}

//	*********
//	ROUNDDATA
//	*********
function loadRoundDataFromHistory_Sub(tx, num) {
	tx.executeSql('SELECT * FROM ROUNDSCORE WHERE id=?', [num],
		function (tx, results) {
			var n = results.rows.length;
			
			if (n <= 0) {
				return false;
			}

			try {
				var	rd;
				var rows = results.rows;
				for (var i=0;i<n;i++) {
					var dc = {};
					$.each(rows.item(i),
						function(key, value) {
							dc[key]=value;
							
							if (key != "value")
								l(key +" "+ value);
						}
					);
					
					rd = $.parseJSON(dc["value"]);
					rd.id = dc["id"];
//					rd.sdb_id = dc["round_id"];
					break;
				}

				var	event = {data:{page:'#round_score_p', params:{"item":rd, "show_in":false}}};
				moveto(event);

			}catch(e){l("in loadRoundDataFromHistory_Sub " +e);}
			return true;
		}, errorDbSQL );
}


function loadRoundDataFromHistory(num) {
	var	_id_ = parseInt(num);
	
	var	gdb_db = _open_db_();
	
	gdb_db.transaction(function(transaction) {
		loadRoundDataFromHistory_Sub(transaction, num);
	}, errorDbSQL, successSQL);
}


function getRoundDataHistory_Sub(tx, getfromserver) {
	tx.executeSql('SELECT * FROM ROUNDSCORE ORDER BY modified DESC', [], function(tx, results) {
		try {
			var i;
			var num = results.rows.length;
			var	li_head = "<colgroup span='1' width='18%'></colgroup><colgroup span='1' width='56%'></colgroup><colgroup span='1' width='13%'></colgroup><colgroup span='1' width='13%'></colgroup><tr class='odd'><td style='font-size:0.6em;text-align:center;' class='puttnum'><span class='rlp_date'>プレイ日</span><span class='rlp_del'>-</span></td><td style='font-size:0.6em;text-align:center;'>コース名</td><td style='font-size:0.6em;text-align:center;' class='puttnum'>スコア</td><td style='font-size:0.6em;text-align:center;'>パット</td></tr>";
//			var	li_head = "<colgroup span='1' width='18%'></colgroup><colgroup span='1' width='56%'></colgroup><colgroup span='1' width='13%'></colgroup><colgroup span='1' width='13%'></colgroup><tr class='odd'><td style='font-size:0.6em;text-align:center;' class='puttnum'>プレイ日</td><td style='font-size:0.6em;text-align:center;'>コース名</td><td style='font-size:0.6em;text-align:center;' class='puttnum'>スコア</td><td style='font-size:0.6em;text-align:center;'>パット</td></tr>";
			
			if (num <= 0) {
				$('#rd_list', $('#rounds_list_p')).append(li_head+"<tr><td colspan='4' style='text-align:center;'>ラウンドスコアがありません。</td></tr>");
				
				$('#rl_loading_div', $('#rounds_list_p')).slideUp();
				$('#rl_readmore_div', $('#rounds_list_p')).slideUp();
				
				$.mobile.hidePageLoadingMsg();
//				return;
			}
			else {
				var	_mydata = getDataFromLocal("mydata");
				var	mydata = $.parseJSON(_mydata);
				var	my_facebook_id = mydata.pi_sns_id;
				var	username = mydata.pi_myname;
	
				var	dls = new Array();
				
				var rows = results.rows;
				for (i=0;i<num;i++){
					var dc = {};
					$.each(rows.item(i),
						function(key, value) {
							dc[key]=value;
						}
					);
					dls.push(dc);
				}
				
				var	que=new Array();
				var	tl=new Array();
				for(i in dls) {
					var	_rdt=dls[i];
					var	id = _rdt.id;
					var	rd = $.parseJSON(_rdt.value);

					/* NEW */
					if (rd.scores[0].player.name != username) {
						continue;
					}
					
					var	score = 0;
					var	putt = 0;
					for(var i in rd.scores[0].holescores) {
						var	tmp = rd.scores[0].holescores[i];
						if (tmp.shot > 0) {
							score += tmp.shot;
							putt += tmp.putt;
						}
					}
					/* NEW */
					var	tmp = (rd.date).split("-");
					if (tmp.length == 1) {
						tmp = (rd.date).split("/");
					}
					var	date = tmp[0].substring(2,4)+"'"+tmp[1]+"."+tmp[2];

					tl.push({"id":id, "date":date, "cname":rd.golfcoursename,
//						"maxp":rd.max_players,
						"score":score, "putt":putt });
					
					//	MAKE QUE.
					var	tmp = new HistoryQueData();
					tmp.local_id = id;
					tmp.round_id = rd.sdb_id;
					
					tmp.modified = Math.round((new Date(_rdt.modified)).getTime() / 1000);
					que.push(tmp);
				}

				if (tl.length > 0) {
					var	li_html = '<tr id="rdlb_${id}"><td class="sh_date puttnum"><span class="rlp_date">${date}</span><span class="rlp_del">削除</span></td><td class="sh_cname">${cname}</td><td class="sh_num puttnum">${score}</td><td class="sh_num">${putt}</td></tr>';
	
					$('#rd_list', $('#rounds_list_p')).empty();
					
					$('#rd_list', $('#rounds_list_p')).append(li_head);
					
					$.tmpl(li_html, tl).appendTo($('#rd_list', $('#rounds_list_p')));
	
		            $('span.rlp_del', $('#rounds_list_p')).hide();
		            $('span.rlp_date', $('#rounds_list_p')).show();
		            
					$('#rd_list tr', $('#rounds_list_p')).each(function (i) {
						$(this).removeClass("even").removeClass("odd");
						if (i%2==0)
							$(this).addClass("even");
						else
							$(this).addClass("odd");
					});
				
					$('#rl_readmore_btn', $('#rounds_list_p')).button('disable');
					$('#rl_readmore_div', $('#rounds_list_p')).slideUp();
					$('#rl_loading_div', $('#rounds_list_p')).slideDown();
				} else if (!fblogined) {
					$('#rd_list', $('#rounds_list_p')).append(li_head+"<tr><td colspan='4' style='text-align:center;'>ラウンドスコアがありません。</td></tr>");
					
					$('#rl_loading_div', $('#rounds_list_p')).slideUp();
					$('#rl_readmore_div', $('#rounds_list_p')).slideUp();
					
					$.mobile.hidePageLoadingMsg();
				}
			}
			
			if (fblogined) {
				var	look = false;
				for(var i in que) {
					var	obj = que[i];
					if (obj.round_id > 0) {
						look = true;
						break;
					}
				}
				
				if (look) {
					$.getJSON(root_url, {"p":roundscore_updatelist_cmd, "offset":0, "limit":100}, function(res) {
						var	enc = $.toJSON(res);

						if (checkOkNg(enc)) {
							var	rl = $.evalJSON(enc).round_list;
							for(i in rl) {
								var	s_r_id=rl[i].round_id;
								for(var j in que) {
									if (que[j].round_id == s_r_id) {
										var ltime = que[j].modified;
										
										var	ut = rl[i].updatetime;
										var	y = ut.substr(0,4);
										var	m1 = parseInt(ut.substr(5,2)) - 1;
										var	d = ut.substr(8,2);
										var	h = ut.substr(11,2);
										var	mm = ut.substr(14,2);
										var	s = ut.substr(17,2);
										
										var	stime = Math.round((new Date(y,m1,d,h,mm,s)).getTime() / 1000);
										if (stime > ltime+10) {	//	server save time ...would be 10sec.
											que[j].new_in_server = true;
											break;
										} else {
											que[j].new_in_local = true;
											break;	
										}
									}
								}
							}
						} else {
							//	NO ACTION... SERVER ERROR or ...
						}
					});
				}
				$('#rounds_list_p').data('localque', que);
			}
			
			if (num > 0) {
				$('#rounds_list_p').data('rl_shw', -1);
			}
			getHistorySearch();
			
		}catch(e){l(e);}
		return;
	}, errorDbSQL);
}


function getRoundDataHistory(server) {
	var	gdb_db = _open_db_();
	gdb_db.transaction(function(transaction) {
		getRoundDataHistory_Sub(transaction, server);
	}, errorDbSQL, successSQL);
}


function addRoundData(obj) {
	var	gdb_db = _open_db_();
	
	gdb_db.transaction(function(tx){
		//	obj is RoundData()
		try{

			var	_rid = obj.sdb_id;
			var	_cid = obj.golfcourse_id;
			var	_value = $.JSONstr(obj);	//	OBJ TO JSON formated text.
			var	time = new Date();
			var	_created = time.toString();

			var	sql = 'INSERT INTO ROUNDSCORE ( round_id, course_id, value, created, modified ) VALUES ( ?, ?, ?, ?, ? )';
			tx.executeSql(sql, [ _rid, _cid, _value, _created, _created ], successSQL, errorSQL);

		} catch(e){l(e);}
		return;

	}, errorDbSQL, successSQL);
}

//	UPDATE SET WHERE が効かない。なんで？
function updateRoundData(obj) {
	var	gdb_db = _open_db_();
	
	gdb_db.transaction(function(tx){
		try {
			//	obj is RoundData()
			var	_id = obj.id;
			var	_rid = obj.sdb_id;
			var	_gc_id = obj.golfcourse_id;
			var	_value = $.JSONstr(obj);	//	OBJ TO JSON formated text.
			var	time = new Date();
			var	_modified = time.toString();

			var	sql = 'REPLACE INTO ROUNDSCORE (id, round_id, course_id, value, created, modified) VALUES (?, ?, ?, ?, (select created from ROUNDSCORE where id= ?), ?);';
			tx.executeSql(sql, [ _id, _rid, _gc_id, _value, _id, _modified ], successSQL1, errorSQL);
		} catch(e){l(e);}
		
		return;
	}, errorDbSQL, successSQL);
}

function deleteRoundData(id) {
	var	gdb_db = _open_db_();
	try{
		gdb_db.transaction(function(tx){
			tx.executeSql('DELETE FROM ROUNDSCORE WHERE id=? ', [id], successSQL2, errorSQL);
		}, errorDbSQL, successSQL);
	}catch(e){l(e);}
}


//	**************
//	GOLFCOURSEDATA
//	**************

function addGolfCourseData(obj){
	var	gdb_db = _open_db_();
	
	gdb_db.transaction(function(tx){
		//	obj is GolfCourseData()
		try{
			var	_cid = obj.id;		//	not null
			var	_name = obj.name;
			var	_value = $.JSONstr(obj);	//	OBJ TO JSON formated text.
			var	time = new Date();
			var	_created = time.toString();
			var	_modified = obj.update;
			
			var	sql = 'INSERT INTO COURSEDATA ( course_id, name, value, created, modified ) VALUES ( ?, ?, ?, ?, ? )';
			tx.executeSql(sql, [ _cid, _name, _value, _created, _modified ], successSQL, errorSQL);
			
		} catch(e){l(e);}
		return;
	}, errorDbSQL, successSQL);
}

function getGolfCourseData(cid) {
	var	gdb_db = _open_db_();
	gdb_db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM ROUNDSCORE WHERE id=?', [cid],
			function (transaction, results) {
				var n = results.rows.length;
				
				if (n <= 0) {
					return false;
				}
				try{
					var	cd;
					var rows = results.rows;
					for (var i=0;i<n;i++){
						var dc = {};
						$.each(rows.item(i),
							function(key, value) {
								dc[key]=value;
							}
						);
						cd = $.parseJSON(dc["value"]);
						break;
					}

					var	event = {data:{page:'#gc_info_list', params:{"item":cd}}};
					moveto(event);
					
				}catch(e){l("in getGolfCourseData internal " +e);}
				return true;
			}, 
			errorSQL);
	}, errorDbSQL, successSQL);
}

function updateGolfCourseData(obj) {
	var	gdb_db = _open_db_();
	
	gdb_db.transaction(function(tx){
		try{
			var	_cid = obj.id;
			var	_name = obj.name;
			var	_value = $.JSONstr(obj);	//	OBJ TO JSON formated text.
			var	time = new Date();			//	本来サーバのアップデートタイムを取るが、現在あるかどうかわかんない。
			var	_modified = time.toString();
			
			/*
			 var	sql = 'UPDATE ROUNDSCORE SET value=?, modified=? WHERE id=? ';
			 tx.executeSql(sql, [ _value, _modified, _id ], successSQL1, errorSQL);
			 */
			
			var	sql = 'REPLACE INTO COURSEDATA (id, course_id, name, value, created, modified) '
				+ 'VALUES (?, ?, ?, ?, (select created from ROUNDSCORE where id = ?), ?);';
			tx.executeSql(sql, [ _id, _cid, _name, _value, _id, _modified ], successSQL1, errorSQL);
			
		}catch(e){l(e);}
		
		return;
	}, errorDbSQL, successSQL);
}

function buildGolfCourseDataHistory() {
	$.mobile.showPageLoadingMsg("b", "CHECK HISTORY AND COURSEs");
	
	var	i;
	var	gdb_db = _open_db_();

	gdb_db.transaction(function(tx) {
//		"select name from table JOIN second_table ON table.id = second_table.full_name WHERE second_table.column = 4"
//		var	sql = 'SELECT course_id FROM ROUNDSCORE GROUP BY course_id ORDER BY modified DESC LIMIT 100 ';
		var	sql = 'SELECT COURSEDATA.course_id AS course_id, COURSEDATA.value AS value, COURSEDATA.modified AS modified FROM COURSEDATA JOIN ROUNDSCORE ON COURSEDATA.course_id = ROUNDSCORE.course_id GROUP BY ROUNDSCORE.course_id ORDER BY ROUNDSCORE.modified DESC LIMIT 100 ';
		tx.executeSql(sql, [],
			function(tx, results) {
				var num = results.rows.length;

				if (num <= 0) {
					$.mobile.hidePageLoadingMsg();
					$('#gc_list_header').html("検索結果 0 コース");
					$('#testlist').listview('refresh');
					
					return false;
				}
				var	dls = new Array();
				
				var rows = results.rows;
				
				for (i=0;i<num;i++){
					$.each(rows.item(i),
						function(key, value) {
							if (key == "value") {
								dls.push($.parseJSON(value));
							}
						}
					);
				}
				$('#gc_list_header').html("検索結果 "+num+" コース");

				$('#results_gc_p').data('list', dls);
				//	+dls[i].max_course+	コース数
				
				var txt = "";
				for(i=0; i<dls.length; i++){
					txt += "<li><a href='#' onclick='javascript:showthis(" +i+ ");'><h3>" +dls[i].name+ "</h3><p>" +dls[i].id+"<br/>" +dls[i].phone + "<br/>"+dls[i].address+ "</p></a></li>";
				}
				
//	txt += "<li><a href='#' onclick='javascript:showGCinfo("+gc.cc_id+")'><p class='ui-li-aside ui-li-desc'>"+cn+"</p><h3 class='ui-li-heading'>"+gc.cc_name+"</h3><p class='ui-li-desc'>"+gc.addr+" "+canres+"</p></a></li>";
				
				$('#testlist li').not("[data-role='list-divider']").remove();
//				$('#testlist').empty();
				$('#testlist').append(txt);
				$('#testlist').listview('refresh');
				
				$('#results_gc_p').remove('list');
				
				$.mobile.hidePageLoadingMsg();

				return true;
			}, function(tx, err){
				$.mobile.hidePageLoadingMsg();
				errorSQL(tx, err);
			}
		);
	}, errorDbSQL, successSQL);

	return;
}

//	******************
//	GOLFRIEND
//	******************

function addGolfriendData(obj) {
	var	gdb_db = _open_db_();
	
	gdb_db.transaction(function(tx){
		//	obj is GolfCourseData()
		try{
			var	_sid = obj.shotbook_id;		//	not null
			var	_fid = obj.facebook_id;		//	not null
			var	_name = obj.name;
			var	_sex = obj.sex;
			var	_hdcp = obj.handicap;
			var	time = new Date();
			var	_created = time.toString();
			
			var	sql = 'INSERT INTO GOLFRIENDDATA ( shotbook_id, facebook_id, name, sex, handicap, created, modified ) VALUES ( ?, ?, ?, ?, ?, ? )';
			tx.executeSql(sql, [ _sid, _fid, _name, _sex, _hdcp, _created, _created ], successSQL, errorSQL);
		} catch(e){l(e);}
		return;
	}, errorDbSQL, successSQL);
}

//	UPDATE SET WHERE が効かない。なんで？
function updateGolfriendData(obj) {
	var	gdb_db = _open_db_();
	
	gdb_db.transaction(function(tx){
		try{
			var	_id = obj._id;
			var	_sid = obj.shotbook_id;	//	変わる可能性あり. 0->number
			var	_fid = obj.facebook_id;	//	never
			var	_nam = obj.name;		//	?
			var	_hdc = obj.handicap;	//	変わる可能性あり
			
			var	time = new Date();
			var	_modified = time.toString();
			
			var	sql = 'REPLACE INTO ROUNDSCORE (id, shotbook_id, facebook_id, name, sex, handicap, created, modified) VALUES  (?, ?, ?, ?, (select sex from ROUNDSCORE where id = ?), ?, (select created from ROUNDSCORE where id = ?), ?);';
			tx.executeSql(sql, [ _id, _sid, _fid, _nam, _id, _hdc, _id, _modified ], successSQL1, errorSQL);

		}catch(e){l(e);}
		
		return;
	}, errorDbSQL, successSQL);
}


function getGolfriendDataList() {
	$.mobile.showPageLoadingMsg("b", "GET GOLFRIENDs");
	var i;
	var	gdb_db = _open_db_();
	
	gdb_db.transaction(function(tx){
		tx.executeSql('SELECT * FROM GOLFRIENDDATA ORDER BY name ASC', [], function(tx, results) {
			
			var n = results.rows.length;
			if (n <= 0) {
				$.mobile.hidePageLoadingMsg();
				return false;
			}
try{
			var	dls = new Array();
			var rows = results.rows;
			for (i=0;i<n;i++) {
				$.each(rows.item(i),
					function(key, value) {
						dls[key] = value;
/*						if (key == "value") {
							dls.push($.parseJSON(value));
						} else	l(key +":"+value);
*/
					}
				);
			}
	
			var	txt="";
			for(i in dls) {
				var	url;
				var	sex = dls[i].sex;
				if (sex == 1){
					url = "images/Player_silhouette_man.png";
				} else {
					url = "images/Player_silhouette_woman.png";
				}

				var	user_id = dls[i].facebook_id;
				var	name = dls[i].name;
				var	hcp = dls[i].handicap;
				
				txt += "<li><a href='#' onclick='javascript:showGolfriend(\"" +user_id+ "\");'><img src='" +url+ "' style='width:32px;height:32px;left:4px;' class='ui-li-icon' />" +name+ "<div style='font-size:0.8em;'>H.C. " +hcp+ "</div></a></li>";
			}

			$('#golfriends_list', $('#golfriend_list_p')).empty();
			$('#golfriends_list', $('#golfriend_list_p')).append(txt);
			$('#golfriends_list', $('#golfriend_list_p')).listview('refresh');

			$.mobile.hidePageLoadingMsg();
} catch(e){l("get list gf"+e);}
		}, function(tx, err) {
			$.mobile.hidePageLoadingMsg();
			errorSQL(tx, err);
		});
	}, errorDbSQL, successSQL);
}

function getGolfriendData(userid) {
	var	gdb_db = _open_db_();

	gdb_db.transaction(function(tx){
		tx.executeSql('SELECT * FROM GOLFRIENDDATA WHERE facebook_id=? ', [userid],
			function(tx, results) {
				try{
				var n = results.rows.length;
				if (n <= 0) {
					$.mobile.hidePageLoadingMsg();
					return false;
				}
				}catch(e){l(e);}
				
				$.mobile.hidePageLoadingMsg();
				
				return true;
			}, errorSQL);
	}, errorDbSQL, successSQL);
}

function delGolfriendData(userid) {
	var	gdb_db = _open_db_();
	try{
	gdb_db.transaction(function(tx){
		tx.executeSql('DELETE FROM GOLFRIENDDATA WHERE facebook_id=? ', [userid], successSQL2, errorSQL);
	}, errorDbSQL, successSQL);
	}catch(e){l(e);}
}


//	******************
//	ERRORs AND COMMONs
//	******************
function successSQL1(tx, results) { //	 SQLResultSet	SQLResultSetList
	/*
	// this will be empty since no rows were inserted.
	console.log("Update ID = " + results.insertId);
	// this will be 0 since it is a select statement
	console.log("Rows Affected = " + results.rowAffected);
	// the number of rows returned by the select statement
	console.log("Update ID(length) = " + results.rows.length);
	*/
}

function successSQL2(tx, results) { //	 SQLResultSet	SQLResultSetList
/*	try{
	// the number of rows returned by the select statement
		console.log("Delete IDs(length would be 0) = " + results.rows.length);
	}catch(e){l("successSQL2 "+e);}
	*/
}

function errorSQL(tx, err) {
	var debug = "";
	
	var	time = new Date();
	debug += 'time=' + time.toString() + '\n';
	$.each(tx , function(key,value){
		debug += '\t' + key + ' : ' + value + '\n';
	});
	
	/* err.code, err.message
	 SQLError.UNKNOWN_ERR
	 SQLError.DATABASE_ERR
	 SQLError.VERSION_ERR
	 SQLError.TOO_LARGE_ERR
	 SQLError.QUOTA_ERR
	 SQLError.SYNTAX_ERR
	 SQLError.CONSTRAINT_ERR
	 SQLError.TIMEOUT_ERR
	 */
	l(" errorSQL ------------------------- ");
	l(debug + ": Error processing SQL: "+err);
	l(" ------------------------------------ ");
	$("#sqlerror").prepend(debug);
	
	return false;
}


function successSQL(tx, results) { //	 SQLResultSet	SQLResultSetList
	/*
	try {
	// this will be empty since no rows were inserted.
	console.log("Insert ID = " + results.insertId);
	// this will be 0 since it is a select statement
	console.log("Rows Affected = " + results.rowAffected);
	// the number of rows returned by the select statement
	console.log("Insert ID = " + results.rows.length);
	} catch(e){l(e);}
	*/
}


function initDbSql(tx) {
	//	ROUNDSCORE	id: #, round_id: #, course_id: #, value:JSONtxt, created:date, modified:date;
	tx.executeSql(' CREATE TABLE IF NOT EXISTS ROUNDSCORE '
		+ ' (id INTEGER PRIMARY KEY AUTOINCREMENT, round_id TEXT, course_id TEXT, value TEXT, created TEXT , modified TEXT) ' );

	//	COURSEDATA	id: #, course_id: #, name:text, value:JSONtxt, created:date, modified:date;
	tx.executeSql(' CREATE TABLE IF NOT EXISTS COURSEDATA '
	+ ' (id INTEGER PRIMARY KEY AUTOINCREMENT, course_id TEXT, name TEXT, value TEXT, created TEXT , modified TEXT) ' );
	
	//	GOLFRIEND	id: #, user_id: #, name:text, value:JSONtxt, created:date, modified:date;
	tx.executeSql(' CREATE TABLE IF NOT EXISTS GOLFRIENDDATA '
	+ ' (id INTEGER PRIMARY KEY AUTOINCREMENT, shotbook_id TEXT, facebook_id TEXT, name TEXT, sex TEXT, handicap TEXT, created TEXT , modified TEXT) ' );
}

function errorDbSQL(tx, err) {
	var debug = "";
	
	var	time = new Date();
	debug += '<tr><th>time</th><td>' + time.toString() + '</td></tr>';
	$.each(tx , function(key,value){
		debug += '<tr><th>' + key + '</th><td>' + value + '</td></tr>';
	});

/* err.code, err.message
	SQLError.UNKNOWN_ERR
	SQLError.DATABASE_ERR
	SQLError.VERSION_ERR
	SQLError.TOO_LARGE_ERR
	SQLError.QUOTA_ERR
	SQLError.SYNTAX_ERR
	SQLError.CONSTRAINT_ERR
	SQLError.TIMEOUT_ERR
*/
	l(" errorDbSQL ------------------------- ");
	l(debug + ": Error processing SQL: " + err);
	l(" ------------------------------------ ");
	
	$("#sqlerror").prepend(debug);

	return false;
}

function successDBinit(tx, results) {	//	 SQLResultSet	SQLResultSetList
//	l("--- SUCCESS DB INIT ---");
}


function clearSql(tx) {
//	l("DROP ROUNDDATA, COURSEDATA");
	tx.executeSql('DROP TABLE IF EXISTS ROUNDDATA');
	tx.executeSql('DROP TABLE IF EXISTS COURSEDATA');
	tx.executeSql('DROP TABLE IF EXISTS GOLFRIENDDATA');
}

/*
function clearGFdb(tx) {
	tx.executeSql('DROP TABLE IF EXISTS GOLFRIENDDATA');
	tx.executeSql(' CREATE TABLE IF NOT EXISTS GOLFRIENDDATA '
	+ ' (id INTEGER PRIMARY KEY AUTOINCREMENT, shotbook_id TEXT, facebook_id TEXT, name TEXT, sex TEXT, handicap TEXT, created TEXT , modified TEXT) '
	);
}
*/



//	SQLResultSet	insertId,rowAffected, rows.. SQLResultSetList item / length
function cntSql(tx) {
	/*
	tx.executeSql(
		'SELECT COALESCE(max(id)+1,1) AS cnt FROM xxxxx',
		[],
		function(tx, results) {
			cnt=results.rows.item(0)["cnt"];
			l("[typeof cnt] = " + typeof cnt + " cnt=" + cnt);
			l("[results rowAffected] = " + results.rowAffected);
			entryNewData();
		},
		errorDbSQL
	);
	 */
}







		var IS_ANDROID = (/android/gi).test(navigator.appVersion);
		var IS_IOS5    = navigator.userAgent.match(/OS 5_[0-9_]+ like Mac OS X/i) !== null;
		
		$(document).bind("mobileinit", function() {
			$.mobile.page.prototype.options.addBackBtn = false;
			
			if (IS_ANDROID) {
				$.mobile.defaultPageTransition = 'none';	//	....
			} else {
				$.mobile.defaultPageTransition = 'slide';	//	flip,turn
			}
			$.mobile.fixedtoolbar.prototype.options.tapToggle = false;
		});
	




















































	$(document).bind('pagebeforechange', function(event, data) {
		$.mobile.pageData = (data && data.options && data.options.pageData) ? data.options.pageData : null;

		//	fix 'transition updown problem'
		$("[data-role=header]").fixedtoolbar({ updatePagePadding: false });
		$("[data-role=footer]").fixedtoolbar({ updatePagePadding: false });
	});


			
	// If you want to prevent dragging, uncomment this section
/*
	function preventBehavior(e) {
		e.preventDefault();
	};
	document.addEventListener("touchmove", preventBehavior, false);
*/
	
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	/*
	function handleOpenURL(url) {
		// TODO: do something with the url passed in.
	}
	 */

	jQuery.extend(jQuery.validator.messages, {
		required: "必須項目です",
		maxlength: jQuery.format("{0} 文字以下を入力してください"),
		minlength: jQuery.format("{0} 文字以上を入力してください"),
		rangelength: jQuery.format("{0} 文字以上 {1} 文字以下で入力してください"),
		email: "メールアドレスを入力してください",
		url: "URLを入力してください",
//		date: "日付を入力してください",
//		dateISO: "ISO日付を入力してください",
		number: "有効な数字を入力してください",
		digits: "0-9までを入力してください",
		equalTo: "同じ値を入力してください",
		range: jQuery.format(" {0} から {1} までの値を入力してください"),
		max: jQuery.format("{0} 以下の値を入力してください"),
		min: jQuery.format("{0} 以上の値を入力してください"),
//		creditcard: "クレジットカード番号を入力してください"
	});

	function onBodyLoad() {
		console.log("ON BODYLOAD");
		document.addEventListener("deviceready", onDeviceReady, false);
	}

	function backKeyDown(e) {
		if ($.mobile.activePage.is('#home') || $.mobile.activePage.is('#boot')) {
			l('go back! but I am in home or boot.');
			
			navigator.notification.confirm(
				"shotbookを終了します。\nよろしいですか？",
				function(index) {
					if (index == 2) {
						e.preventDefault();
						navigator.app.exitApp();
					}
				},	// callback (index of button pressed)
				'警告', 'いいえ,はい' );
		} else {
			l('go back!');
			
 			navigator.app.backHistory();
 		}
	}
		
	/* When this function is called, Cordova has been initialized and is ready to roll */
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	var	IS_NATIVE_SELECTMENU = false;
	function onDeviceReady() {
		console.log("ON DEVICEREADY");
		//	DBの初期化とかPhoneGapが動いてないと出来ない事を行う。
		initRoot();

		//	FOR ANDROID 4.0.x対策'
		var string = device.version;
		if (IS_ANDROID) {
			document.addEventListener("backbutton", backKeyDown, true);
    
			if (string.substring(0,3) == "4.0") {
				IS_NATIVE_SELECTMENU = true;
			}
		}
	}
	

/*
 Cordova - Golfer's HOME
 Copyright (c) 2012 Indi
 */

function buildRoundscoreAnalysisTable() {
	var	rd;	//	RoundScore()
	var	params=$('#roundscore_analysis_p').data('params');
	var	rd=params["item"];
	if (!rd) {
		return;
	}
	//	rsa_title
	//	rsa_report
	var	txt = "";

	txt += "<table class='scoreanalysis'>";
	
	var	max=rd.max_players;

	var	prc;
	if (max != 3) {
		prc = 80 / max;
		txt += "<colgroup span='1' width='20%'></colgroup>";
	} else {
		prc = 26;
		txt += "<colgroup span='1' width='22%'></colgroup>";
	}
	var	str = "<colgroup span='1' width='"+ prc + "%'></colgroup>";
	for(var i=0; i<max; i++) {
		txt += str;
	}

	var	headertxt ="<tr style='font-size:0.8em;'>";
	headertxt +="<th><wbr/></th>";
	for(var	i=0; i<max; i++) {
		var	pname = rd.scores[i].player.name;
		headertxt +="<th>"+pname+"</th>";
	}
	headertxt +="</tr>";
	
	
	txt += headertxt;

	var	titles = {
		0:{ id:'shot_sum_0', title:"ショット合計" },
		1:{ id:'putt_sum_0', title:"パット合計" },
		2:{ id:'pcnt_sum_0', title:"対象ホール数" },
		
		9:{ id:'',			 title:"平均ショット数" },
//		10:{ id:'par0_avg_0', title:"全平均" },
		11:{ id:'par3_avg_0', title:"パー3" },
		12:{ id:'par4_avg_0', title:"パー4" },
		13:{ id:'par5_avg_0', title:"パー5" },
		14:{ id:'putt_avg_0', title:"平均パット数" },
		
		20:{ id:'', title:"パーセーブ率" },
		21:{ id:'par0s_avg_0', title:"全ホール" },
		22:{ id:'par3s_avg_0', title:"　パー3" },
		23:{ id:'par4s_avg_0', title:"　パー4" },
		24:{ id:'par5s_avg_0', title:"　パー5" },
		
		29:{ id:'', title:"確率" },
		30:{ id:'gir0_avg_0', title:"パーオン率" },
		31:{ id:'girb_avg_0', title:"ボギーオン率" },
		32:{ id:'parp_avg_1', title:"イーグル - 率" },
		33:{ id:'parp_avg_2', title:"バーディ率" },
		34:{ id:'parp_avg_3', title:"パー率" },
		35:{ id:'parp_avg_4', title:"Dボギー率" },
		36:{ id:'parp_avg_5', title:"Dボギー + 率" },
		
		40:{ id:'ob_avg_0', title:"OB率" },
		41:{ id:'pena_avg_0', title:"ペナルティ率" },
		42:{ id:'bunk_avg_0', title:"バンカー率" },
/*		43:{ id:'ssav_avg_0', title:"サンドセーブ率" }	*/
		43:{ id:'fwkp_avg_0', title:"フェアウェイキープ率" },
		44:{ id:'rvav_avg_0', title:"リカバー率" }
	};
	
	for(var i in titles) {
		var	align = "right";
		if (titles[i].id.length > 0) {
			if (titles[i].id.match("sum")) {
				align = "center";
			}
			txt += "<tr><th style='font-size:0.6em;text-align:right;'>" + titles[i].title +"</th>";
			for(var j=0;j<max;j++) {
				txt += "<td id='"+titles[i].id+"_"+j+"' style='font-size:0.8em;text-align:"+align+";'/>";
			}
			txt += "</tr>";
		} else {
			txt += "<tr><th colspan="+(max+1)+" style='font-size:0.6em;text-align:left;'>" + titles[i].title +"</th></tr>";
		}
	}
		
	txt += headertxt;
	txt += "</table>";
	$('#rsa_report').empty().append(txt);
}


function one_analysis(rd){
	var	sums = new Sums();	//	return;
	
	try {
		var	hc = rd.pars.length;

		if (hc != 18) {
			return null;
		}
		
		var	cc = 0;

		var	hss;	//	HoleScore()s
		var	player = 0;
		
		hss = rd.scores[player].holescores;
		
		var	SR = new ShotResults();
		for(var i in hss) {
			var	tsp = hss[i];
			var	t_p = rd.pars[tsp.holenum - 1];
	
			var	s = parseInt(tsp.shot);
			if (s > 0) {	//	対象ショットは0以上。
				sums.shot_sum[0] += s;
				sums.shot_sum[t_p] += s;
				
				var	p = parseInt(tsp.putt);
				sums.putt_sum[0] += p;
				sums.putt_sum[t_p] += p;
				
				sums.pcnt_sum[0] ++;
				sums.pcnt_sum[t_p] ++;
				
				var	dif = s - p;
				if (dif <= (t_p - 2)) {	//	Green In Regulation : パーオン
					sums.gir0_sum[0] ++;
					sums.gir0_sum[t_p] ++;
				} else if (dif == (t_p - 1)) {
					sums.girb_sum[0] ++;
					sums.girb_sum[t_p] ++;
				}
				
				var	sel = s - t_p;	//	abs()
				if (sel < -2) {
					sel = -2;
				} else if (sel > 2) {
					sel = 2;
				}
				if (sel <= 0){
					sums.para_sum[0] ++;
					sums.para_sum[t_p] ++;
				}
				sums.parp_sum[sel][0] ++;
				sums.parp_sum[sel][t_p] ++;
				
				if (tsp.penalty > 0) {
					sums.penalty_sum += tsp.penalty;
				}
				if (tsp.bunker > 0) {
					sums.bunker_sum += tsp.bunker;
				}
				if (tsp.ob > 0) {
					sums.ob_sum += tsp.ob;
				}
				if (tsp.fairwaykeep > 0) {
					sums.fairwaykeep_sum ++;
				}
				if (s == t_p && p <= 1) {
					sums.recover_sum ++;
				}
				/*
				var	sandsave_num = -1;	//	最終サンドショット番号を入れておく。
				var	dsr = tsp.details;	//	詳細
				for(var j in dsr) {
					var	re = dsr[j];
					switch(parseInt(re.lie)) {
						case SR.bunker: {
							if (sandsave_num < re.shotnum) {
								sandsave_num = re.shotnum;
							}
							sums.bunker_sum ++;
							break;
						}
						case SR.ob: {
							sums.ob_sum ++;
							break;
						}
						case SR.penalty: {
							sums.penalty_sum ++;
							break;
						}
					}
				}
				if (sandsave_num > 0) {
					if (sandsave_num + 2 >= s) { 
						sums.sandsaves_sum ++;
					}
					sums.bunkerhole_sum ++;
				}
				*/
			}
		}
	}catch(e){l("sum_calc "+e);}
	l(hc +" HOLES "+cc+" CNT");
	if (hc > cc) {	//足りない
		return null;
	} else {
		return sums;
	}
}

function analysis(){
	try {
	var	rs;	//	RoundScore()
	
	var	params=$('#roundscore_analysis_p').data('params');
	var	rd=params["item"];
	if (!rd) {
		return;
	}
	
	//	パーセーブ率 (par-saving percentage) : プレーしたホール数に対して、どれくらいの割合でパーか、またはそれ以上のスコアを出したかということ
	//	サンドセーブ率 : グリーンサイドのバンカーから（スコアに関係なく）２打以内でカップインする確率のこと
	//	フェアウェイキープ率 : パー３をのぞくティーショットで、フェアウェイのキープ率
	//	100-or-less ?
	/*
	var	pars;
	if (rd.in_tee) {
		pars = rd.out_tee.pars.concat(rd.in_tee.pars);
	} else {
		pars = rd.out_tee.pars;
	}
	 */
	var pmax = rd.max_players;
		
	var	hss;	//	HoleScore()s
	
	for(var player=0;player<pmax;player++) {
		
		hss = rd.scores[player].holescores;

		var	sum_label = { 0:"合計", 3:"par3", 4:"par4", 5:"par5" };
		var	pcnt_sum = { '0':0, '3':0, '4':0, '5':0 };	//	計算対象ホール数
		var	putt_sum = { '0':0, '3':0, '4':0, '5':0 };	//	パット数
		var	shot_sum = { '0':0, '3':0, '4':0, '5':0 };	//	ショット数
		var	gir0_sum = { '0':0, '3':0, '4':0, '5':0 };	//	GIR パーオン率用
		var	girb_sum = { '0':0, '3':0, '4':0, '5':0 };	//	GIRBOGEY
		var	parp_sum = {'-2':{ '0':0, '3':0, '4':0, '5':0 },	//	EAGLE - par3でイーグルって…
						'-1':{ '0':0, '3':0, '4':0, '5':0 },	//	BARDY
						'0': { '0':0, '3':0, '4':0, '5':0 },	//	PAR
						'1': { '0':0, '3':0, '4':0, '5':0 },	//	BOGEY
						'2': { '0':0, '3':0, '4':0, '5':0 }		//	DOUBLE BOGEY +
		};
		var	para_sum = { '0':0, '3':0, '4':0, '5':0 };		//	パーセーブ率計算用(parp -2..0の和)

		var	sandsaves_sum = 0;	//	サンドセーブ率用(hole in - 1 or -2 がBunkerの時　+1) / バンカーに入ったホール数。
		var	bunkerhole_sum = 0;	//	バンカーに捕まったホール数
		var	bunker_sum = 0;		//	バンカー率(結果がxxの回数) / ショット数
		var	penalty_sum = 0;	//	ペナルティ率(結果がxxの回数) / ショット数
		var	ob_sum = 0;			//	OB率(結果がxxの回数) / ショット数

		var	fairwaykeep_sum = 0;
		var	recover_sum = 0;
		
		
		var	SR = new ShotResults();
		for(var i in hss) {
			var	tsp = hss[i];
			var	t_p = rd.pars[tsp.holenum - 1];

	//		l(tsp.holenum +":" +i+" par "+t_p);

			var	s = parseInt(tsp.shot);
			if (s > 0) {	//	対象ショットは0以上。
				shot_sum[0] += s;
				shot_sum[t_p] += s;
				
				var	p = parseInt(tsp.putt);
				putt_sum[0] += p;
				putt_sum[t_p] += p;
				
				pcnt_sum[0] ++;
				pcnt_sum[t_p] ++;
				
				var	dif = s - p;
				if (dif <= (t_p - 2)) {	//	Green In Regulation : パーオン
					gir0_sum[0] ++;
					gir0_sum[t_p] ++;
				} else if (dif == (t_p - 1)) {
					girb_sum[0] ++;
					girb_sum[t_p] ++;
				}
				
				var	sel = s - t_p;	//	abs()
				if (sel < -2) {
					sel = -2;
				} else if (sel > 2) {
					sel = 2;
				}
				if (sel <= 0){
					para_sum[0] ++;
					para_sum[t_p] ++;
				}
				parp_sum[sel][0] ++;
				parp_sum[sel][t_p] ++;

				if (tsp.penalty > 0) {
					penalty_sum += tsp.penalty;
				}
				if (tsp.bunker > 0) {
					bunker_sum += tsp.bunker;
				}
				if (tsp.ob > 0) {
					ob_sum += tsp.ob;
				}
				if (tsp.fairwaykeep > 0) {
					fairwaykeep_sum ++;
				}
				if (s == t_p && p <= 1) {
					recover_sum ++;
				}
				/*
				var	sandsave_num = -1;	//	最終サンドショット番号を入れておく。
				var	dsr = tsp.details;	//	詳細
				for(var j in dsr) {
					var	re = dsr[j];
					switch(parseInt(re.lie)) {
						case SR.bunker: {
							if (sandsave_num < re.shotnum) {
								sandsave_num = re.shotnum;
							}
							bunker_sum ++;
							break;
						}
						case SR.ob: {
							ob_sum ++;
							break;
						}
						case SR.penalty: {
							penalty_sum ++;
							break;
						}
					}
				}
				if (sandsave_num > 0) {
					if (sandsave_num + 2 >= s) { 
						sandsaves_sum ++;
					}
					bunkerhole_sum ++;
				}
				*/
			}
		}
		
		
		
		var	shot_avg = new Array();
		var	putt_avg = new Array();
		var	para_avg = new Array();
		for(var j in sum_label) {
			if (pcnt_sum[j] > 0) {
				var	s = shot_sum[j]/pcnt_sum[j];
				var	p = putt_sum[j]/pcnt_sum[j];
				var	a = para_sum[j]/pcnt_sum[j];
				shot_avg[j]=$.FourOutFiveIn(s, 3).FillZero(-1,3);
				putt_avg[j]=$.FourOutFiveIn(p, 3).FillZero(-1,3);
				para_avg[j]=$.FourOutFiveIn(a, 3).FillZero(-1,3);
			} else {
				shot_avg[j]="-";
				putt_avg[j]="-";		
				para_avg[j]="-";		
			}
		}
		var	parp_avg = new Array();
		
		for(var i=-2;i<3;i++) {
			if (pcnt_sum[0] > 0) {
				parp_avg[i] = $.FourOutFiveIn(parp_sum[i][0]/pcnt_sum[0]*100, 3).FillZero(-1,3);
			} else {		
				parp_avg[i]="-";
			}
		}

		$('#shot_sum_0_'+player).text(shot_sum[0]);
		$('#putt_sum_0_'+player).text(putt_sum[0]);
//		$('#putt_avg_0_'+player).text($.FourOutFiveIn(putt_avg[0], 3).FillZero(-1,3));
		$('#putt_avg_0_'+player).text(putt_avg[0]);
		$('#pcnt_sum_0_'+player).text(pcnt_sum[0]);
		if (pcnt_sum[0] > 0) {
			$('#gir0_avg_0_'+player).text($.FourOutFiveIn(gir0_sum[0]/pcnt_sum[0]*100, 3).FillZero(-1,3));
			$('#girb_avg_0_'+player).text($.FourOutFiveIn(girb_sum[0]/pcnt_sum[0]*100, 3).FillZero(-1,3));
		} else {
			$('#gir0_avg_0_'+player).text("-");
			$('#girb_avg_0_'+player).text("-");
		}
/*
		$('#par0s_avg_0_'+player).text($.FourOutFiveIn(para_sum[0]/pcnt_sum[0], 3).FillZero(-1,3));
		$('#par3s_avg_0_'+player).text($.FourOutFiveIn(para_sum[3]/pcnt_sum[3], 3).FillZero(-1,3));
		$('#par4s_avg_0_'+player).text($.FourOutFiveIn(para_sum[4]/pcnt_sum[4], 3).FillZero(-1,3));
		$('#par5s_avg_0_'+player).text($.FourOutFiveIn(para_sum[5]/pcnt_sum[5], 3).FillZero(-1,3));
*/
		$('#par0s_avg_0_'+player).text(para_avg[0]);
		$('#par3s_avg_0_'+player).text(para_avg[3]);
		$('#par4s_avg_0_'+player).text(para_avg[4]);
		$('#par5s_avg_0_'+player).text(para_avg[5]);
/*				
		$('#par3_avg_0_'+player).text($.FourOutFiveIn(shot_sum[3]/pcnt_sum[3], 3).FillZero(-1,3));
		$('#par4_avg_0_'+player).text($.FourOutFiveIn(shot_sum[4]/pcnt_sum[4], 3).FillZero(-1,3));
		$('#par5_avg_0_'+player).text($.FourOutFiveIn(shot_sum[5]/pcnt_sum[5], 3).FillZero(-1,3));
*/
		$('#par3_avg_0_'+player).text(shot_avg[3]);
		$('#par4_avg_0_'+player).text(shot_avg[4]);
		$('#par5_avg_0_'+player).text(shot_avg[5]);
//		$('#par3_avg_0_'+player).text($.FourOutFiveIn(shot_avg[3], 3).FillZero(-1,3));
//		$('#par4_avg_0_'+player).text($.FourOutFiveIn(shot_avg[4], 3).FillZero(-1,3));
//		$('#par5_avg_0_'+player).text($.FourOutFiveIn(shot_avg[5], 3).FillZero(-1,3));
		
		$('#parp_avg_1_'+player).text(parp_avg[-2]);
		$('#parp_avg_2_'+player).text(parp_avg[-1]);
		$('#parp_avg_3_'+player).text(parp_avg[0]);
		$('#parp_avg_4_'+player).text(parp_avg[1]);
		$('#parp_avg_5_'+player).text(parp_avg[2]);
/*		
		$('#parp_avg_1_'+player).text($.FourOutFiveIn(parp_sum[-2][0]/pcnt_sum[0], 3).FillZero(-1,3));
		$('#parp_avg_2_'+player).text($.FourOutFiveIn(parp_sum[-1][0]/pcnt_sum[0], 3).FillZero(-1,3));
		$('#parp_avg_3_'+player).text($.FourOutFiveIn(parp_sum[0][0]/pcnt_sum[0], 3).FillZero(-1,3));
		$('#parp_avg_4_'+player).text($.FourOutFiveIn(parp_sum[1][0]/pcnt_sum[0], 3).FillZero(-1,3));
		$('#parp_avg_5_'+player).text($.FourOutFiveIn(parp_sum[2][0]/pcnt_sum[0], 3).FillZero(-1,3));
*/
		if (player == 0) {
			if (shot_sum[0] > 0) {
				$('#ob_avg_0_'+player).text($.FourOutFiveIn(ob_sum / shot_sum[0] * 100, 3).FillZero(-1,3));
				$('#pena_avg_0_'+player).text($.FourOutFiveIn(penalty_sum / shot_sum[0] * 100, 3).FillZero(-1,3));
				$('#bunk_avg_0_'+player).text($.FourOutFiveIn(bunker_sum / shot_sum[0] * 100, 3).FillZero(-1,3));
			} else {
				$('#ob_avg_0_'+player).text("-");
				$('#pena_avg_0_'+player).text("-");
				$('#bunk_avg_0_'+player).text("-");
			}
			/*
			if (bunkerhole_sum > 0) {
				$('#ssav_avg_0_'+player).text($.FourOutFiveIn(sandsaves_sum/bunkerhole_sum * 100, 3).FillZero(-1,3));
			} else {
				$('#ssav_avg_0_'+player).text("-");
			}
			 */
	//		parp_sum[0][0]//	'0': { '0':0, '3':0, '4':0, '5':0 },
			if (parp_sum[0][0] > 0) {
				$('#rvav_avg_0_'+player).text($.FourOutFiveIn(recover_sum/parp_sum[0][0] * 100, 3).FillZero(-1,3));
			} else {
				$('#rvav_avg_0_'+player).text("-");
			}
			$('#fwkp_avg_0_'+player).text($.FourOutFiveIn(fairwaykeep_sum/pcnt_sum[0] * 100, 3).FillZero(-1,3));
		} else {
			$('#rvav_avg_0_'+player).text("-");
			$('#ob_avg_0_'+player).text("-");
			$('#pena_avg_0_'+player).text("-");
			$('#bunk_avg_0_'+player).text("-");
			$('#fwkp_avg_0_'+player).text("-");
		}
	}
	
	$.mobile.hidePageLoadingMsg();

} catch(e){l(e);}
	return;
}



(function($) {
	
	$('#roundscore_analysis_p').live('pagebeforeshow', function(e,d){
		try {
			buildRoundscoreAnalysisTable();
		} catch(e){l(e);}
	});
	//	rsa_title
	//	rsa_report
	$('#roundscore_analysis_p').live('pageshow', function(e,d){
		$.mobile.showPageLoadingMsg("c", "CALCURATING...");
		try{
			analysis();
		} catch(e){l(e);}
	});
 
})(jQuery);


/*
 Cordova - Golfer's Dashboard DB
 Copyright (c) 2012 Indi
 */


(function($) {

	$('#setting_gg_p').live("pageinit", function(event, data) {
		var i;
		var	sggf=$('#sgg_form_w', $('#setting_gg_p'));
//		sggf.empty();
		var	va=new Array();
		var	gg=new GolfGear();
		for(i in gg.wood_id) {
			va.push({"k":gg.wood_id[i], "v":gg.wood_long_name[i]});
		}
		sggf.append("<legend>ウッド</legend>");
		var	txt="<input type='checkbox' name='checkbox-w${k}' id='checkbox-w${k}' class='custom' /><label for='checkbox-w${k}' data-iconpos='right'>${v}</label>";
		$.tmpl(txt, va).appendTo(sggf);
		
		sggf=$('#sgg_form_i', $('#setting_gg_p'));
		va=new Array();
		for(i in gg.iron_id) {
			va.push({"k":gg.iron_id[i], "v":gg.iron_name[i]});
		}
		sggf.append("<legend>アイアン</legend>");
		txt="<input type='checkbox' name='checkbox-i${k}' id='checkbox-i${k}' data-iconpos='right' /><label for='checkbox-i${k}'>${v}</label>";
		$.tmpl(txt, va).appendTo(sggf);
		
		
		sggf=$('#sgg_form_u', $('#setting_gg_p'));
		va=new Array();
		for(i in gg.wedge_id) {
			va.push({"k":gg.wedge_id[i], "v":gg.wedge_name[i]});
		}
		sggf.append("<legend>ウェッジ</legend>");
		txt="<input type='checkbox' name='checkbox-u${k}' id='checkbox-u${k}' data-iconpos='right' /><label for='checkbox-u${k}'>${v}</label>";
		$.tmpl(txt, va).appendTo(sggf);
		
		sggf=$('#sgg_form_p', $('#setting_gg_p'));
		var	k = gg.putter_id[0];
		var	v = gg.putter_name[0];
		sggf.append("<legend>パター</legend><input type='checkbox' name='checkbox-p"+k+"' id='checkbox-p"+k+"' data-iconpos='right' /><label for='checkbox-p"+k+"'>"+v+"</label>");

		$('#sggf_ok', $('#setting_gg_p')).on('click', function() {
			var	sgga = $('#sgg_form').serializeArray();
			var	json = $.JSONstr(sgga);

			var	old = getDataFromLocal("mygear");
			if (old) {
				if (checksum(json) != checksum(old)) {
					setDataToLocal("mygear", json);
				}
			} else {
				setDataToLocal("mygear", json);
			}
			return true;
		});
	});
	
	/*
	$('#setting_gg_p').live("pagebeforehide", function(event, data) {
		setDataToLocal("mygear", json);
	});
	*/
	
	$('#setting_gg_p').live("pagebeforeshow", function(event, data) {
		try{
			var	json=getDataFromLocal("mygear");
			if (json) {
				var	obj=$.parseJSON(json);

				$('input[type="checkbox"]', $(this)).removeAttr('checked').checkboxradio();
				for(var i in obj) {
					var kv = obj[i];
					var	id=kv['name'];
					
					$('input[name="'+id+'"]', $(this)).attr('checked', true).checkboxradio('refresh');
				}
			} else {
				$('input[type="checkbox"]', $(this)).attr('checked', true).checkboxradio();
			}
			$('div[data-role="fieldcontain"]', $(this)).trigger('create');
		}catch(e){l("sgg pbs " + e);}
	});
	
	$('#setting_gg_p').live("pageshow", function(event, data) {
	});
	
}) (jQuery);


// jqm.page.params.js - version 0.1
// Copyright (c) 2011, Kin Blas
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the <organization> nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
// 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

(function( $, window, undefined ) {

// Given a query string, convert all the name/value pairs
// into a property/value object. If a name appears more than
// once in a query string, the value is automatically turned
// into an array.
function queryStringToObject( qstr )
{
	var result = {},
		nvPairs = ( ( qstr || "" ).replace( /^\?/, "" ).split( /&/ ) ),
		i, pair, n, v;

	for ( i = 0; i < nvPairs.length; i++ ) {
		var pstr = nvPairs[ i ];
		if ( pstr ) {
			pair = pstr.split( /=/ );
			n = pair[ 0 ];
			v = pair[ 1 ];
			if ( result[ n ] === undefined ) {
				result[ n ] = v;
			} else {
				if ( typeof result[ n ] !== "object" ) {
					result[ n ] = [ result[ n ] ];
				}
				result[ n ].push( v );
			}
		}
	}

	return result;
}

// The idea here is to listen for any pagebeforechange notifications from
// jQuery Mobile, and then muck with the toPage and options so that query
// params can be passed to embedded/internal pages. So for example, if a
// changePage() request for a URL like:
//
//    http://mycompany.com/myapp/#page-1?foo=1&bar=2
//
// is made, the page that will actually get shown is:
//
//    http://mycompany.com/myapp/#page-1
//
// The browser's location will still be updated to show the original URL.
// The query params for the embedded page are also added as a property/value
// object on the options object. You can access it from your page notifications
// via data.options.pageData.
$( document ).bind( "pagebeforechange", function( e, data ) {

	// We only want to handle the case where we are being asked
	// to go to a page by URL, and only if that URL is referring
	// to an internal page by id.
				   
	if ( typeof data.toPage === "string" ) {
		var u = $.mobile.path.parseUrl( data.toPage );
		if ( $.mobile.path.isEmbeddedPage( u ) ) {

			// The request is for an internal page, if the hash
			// contains query (search) params, strip them off the
			// toPage URL and then set options.dataUrl appropriately
			// so the location.hash shows the originally requested URL
			// that hash the query params in the hash.
			var u2 = $.mobile.path.parseUrl( u.hash.replace( /^#/, "" ) );
			if ( u2.search ) {
				if ( !data.options.dataUrl ) {
					data.options.dataUrl = data.toPage;
				}
				data.options.pageData = queryStringToObject( u2.search );
				data.toPage = u.hrefNoHash + "#" + u2.pathname;

console.log("data.toPage:"+data.toPage);
for(var i in data.options.pageData){
	console.log("data.options.pageData:"+i+"="+data.options.pageData[i]);
}
			}
		}
	}
});

})( jQuery, window );
