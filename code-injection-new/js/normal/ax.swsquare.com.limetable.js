










	function onDeviceReady() {
		document.addEventListener('backbutton', function() {location.href = 'main.html';}, false);
	}
	document.addEventListener('deviceready', onDeviceReady, false);
	
	function onKeyDownAction(){
		if(event.keyCode == 13) {
			location_page();
		}
	}
	
	function location_page(){
		var password = $('#password').val();
		
		$.ajax({
			type:'post',
			async:true,
			data:{
				password:Aes.Ctr.encrypt(password, 'L8Aqx5Zvc', 256),
				uid:localStorage.getItem('uqid')
			},
			url:ajax_url+'check_password_enc.php',
			success:function(data) {
				if(data=="true") {
					location.href = "user_setting_id.html";
				}
				else navigator.notification.alert('잘못된 비밀번호 입니다.', null, 'LimeTable', '확인');
			}
		});
	}
	
	$(document).ready(function() {
		var popup_check_passowrd = $('#popup_check_passowrd');
		var popup_set_comment_number = $('#popup_set_comment_number');
		var popup_set_comment_day = $('#popup_set_comment_day');
	
		if(localStorage.getItem('set_help') != 'false') $('#set_help').addClass('checkbox_selected');
		if(localStorage.getItem('set_tit_help') != 'false') $('#set_tit_help').addClass('checkbox_selected');
		
		myScroll = new iScroll('content', {
			hScroll:false,
			vScrollbar:true
		});	//iscroll object
		
		checkNewFriend(false);
		
		$('#logout').click(function() {
			navigator.notification.confirm('로그아웃 하시겠습니까?', function(res) {
				if(res === 1) {
					location.href = 'index.html';
					localStorage.removeItem('uqid');
					localStorage.removeItem('aval');
				}
			}, 'LimeTable', '확인,취소');
		});
		
		$('#wrap_help').live('tap', function() {
			$('#set_help').toggleClass('checkbox_selected');
			if(localStorage.getItem('set_help') != 'false') localStorage.setItem('set_help', 'false');
			else localStorage.setItem('set_help', '');
		});
		
		$('#wrap_tit_help').live('tap', function() {
			$('#set_tit_help').toggleClass('checkbox_selected');
			if(localStorage.getItem('set_tit_help') != 'false') localStorage.setItem('set_tit_help', 'false');
			else localStorage.setItem('set_tit_help', '');
		});
		
		$('#setting_user_info').click(function() {
			popup_check_passowrd.show();
		});
		
		$('#btn_popup_close').click(function() {
			popup_check_passowrd.hide();
			$('#password').val('');
		});
		
		$('#submit_password').click(function() {
			location_page();
		});
		
		$('#set_comment_number').click(function() {
			popup_set_comment_number.show();
			$('#comment_number').val(localStorage.getItem('comment_number'));
		});
		
		$('#btn_popup1_close').click(function() {
			popup_set_comment_number.hide();
			$('#comment_number').val('');
		});
		
		$('#btn_set_comment_number').click(function() {
			localStorage.setItem('comment_number', $('#comment_number').val());
			popup_set_comment_number.hide();
		});
		
		$('#set_comment_day').click(function() {
			popup_set_comment_day.show();
			$('#comment_day').val(localStorage.getItem('comment_day'));
		});
		
		$('#btn_popup2_close').click(function() {
			popup_set_comment_day.hide();
			$('#comment_day').val('');
		});
		
		$('#btn_set_comment_day').click(function() {
			localStorage.setItem('comment_day', $('#comment_day').val());
			popup_set_comment_day.hide();
		});		
	});
	







	var myScroll, myScrollPopup;
	var stored_uid = localStorage.getItem('uqid');
	var loader_wrap_el;
	var tooltip_el;
	var edit_flag = false;
	var refresh_y_offset = 0;
	var is_search_use = false;

	function onDeviceReady() {
		document.addEventListener('backbutton', function() {
			if($('#popup_search_friend').css('display') != 'none') {
				$('#popup_search_friend').hide();
				$("#search_by_name").val('');
				$('#search_by_school').val('');
				$('#search_by_dept').val('');
				$("#result_list").empty();
				myScrollPopup.refresh();
			} else {
				location.href = 'main.html';
			}
		}, false);
	}
	document.addEventListener('deviceready', onDeviceReady, false);

	function onKeyDownAction() {
		if(event.keyCode == 13) {
			submitSearchData(true);
		}
	}

	function showTooltip(message ,delay) {
		if(localStorage.getItem('set_help') != 'false') {
			delay = delay || 5000;	//default: 5000ms
			if(tooltip_el.html() != message) {
				tooltip_el.html(message).stop(true, true).fadeIn(delay * 0.2).delay(delay * 0.5).fadeOut(delay * 0.3);
			}
		}
	}

	function submitSearchData(usersubmit) {
		is_search_use = true;
		
		var name_val = $("#search_by_name").val();
		var school_val = $('#search_by_school').val();
		var dept_val = $('#search_by_dept').val();
		var result_list_el = $("#result_list");
		
		if(usersubmit) result_list_el.empty();
		
		var limit_len = result_list_el.children().length;
		
		if(name_val.length >= 2 || dept_val.length >= 2 || school_val.length >= 2) {
			$.ajax({
				type: "post",
				dataType: "json",
				url: ajax_url+'searcher.php',
				beforeSend: function() { if(usersubmit) loader_wrap_el.show(); },
				data: {
					name: name_val,
					school: school_val,
					dept: dept_val,
					my_uid: stored_uid,
					limit: limit_len
				},
				success: function(data) {
					var list_data = "";
					var data_length = data.length;

					if(data[0].id == "no_data") {
						if(limit_len <= 0) result_list_el.html("<li class='slist'><p class='friend_name'>검색된 친구가 없습니다.</p></li>");
					} else {
						for(var i=0; i<data_length; i++) {
							list_data += "<li id='slist_"+(i+limit_len)+"' class='slist'><p class='friend_name'>"+data[i].name+"("+data[i].id.replace(/(.?){2}$/gi, '*')+")</p><p class='friend_info'>학교:"+data[i].scl+" 학과:"+data[i].dept+"</p></li>";
						}
						result_list_el.append(list_data);
					}
					
					for(var i=0; i<data_length; i++) {
						$('#slist_'+(i+limit_len)).data('searchlist', {unique_id: data[i].uid, name: data[i].name, user_id: data[i].id, school: data[i].scl, dept: data[i].dept});
					}
					showTooltip('검색된 리스트를 탭하여 친구로 추가하세요.');
					myScrollPopup.refresh();
					setTimeout(function () { myScrollPopup.refresh(); }, 100);
					
					is_search_use = false;
					if(usersubmit) loader_wrap_el.hide();
				}
			}).ajaxStart(function() {
				if(usersubmit) loader_wrap_el.show();
			}).ajaxStop(function() {
				if(usersubmit) loader_wrap_el.hide();
			});
		} else {
			navigator.notification.alert('2글자 이상 입력하셔야 검색이 가능합니다.', null, 'LimeTable', '확인');
			is_search_use = false;
		}
	}

	function editFriend() {
		if(!edit_flag) {
			edit_flag = true;

			showTooltip('친구 리스트의 &#10006; 버튼을 선택하여 친구를 삭제하세요.');
			$("div.xbutton").show();
		} else {
			edit_flag = false;
			$("div.xbutton").hide();
		}
	}

	function loadWaitingFriendList() {
		$('#btn_load_flist').removeClass('btn_friend_pressed');
		$('#btn_load_wlist').addClass('btn_friend_pressed');

		showTooltip('대기중 친구 리스트를 탭하여 친구로 추가하세요.');

		$.ajax({
			type: 'post',
			dataType: 'json',
			url: ajax_url+'waiting_list.php',
			beforeSend: function() { loader_wrap_el.show(); },
			data: {
				uid: stored_uid
			},
			success: function(data) {
				var result_list_el = $('#wrap_result_list');
				var data_length = data.length;

				if(data[0].id == 'no_data') {
					result_list_el.html('<li class="wlist"><p class="friend_name">대기중인 친구가 없습니다.</p></li>');
				} else {
					var list_data = "";
					//create list
					for(var i=0; i<data_length; i++) {
						list_data += '<li id="wlist_'+i+'" class="wlist"><div class="xbutton">&#10006;</div><p class="friend_name">'+data[i].name+'('+data[i].id.replace(/(.?){2}$/gi, '*')+')</p><p class="friend_info">학교:'+data[i].scl+' 학과:'+data[i].dept+'</p><span class="flist_delete"></span></li>';
					}
					result_list_el.html(list_data);
					//input data
					for(var i=0; i<data_length; i++) {
						$('#wlist_'+i).data('waitlist', {unique_id: data[i].uid, name: data[i].name, user_id: data[i].id, school: data[i].scl, dept: data[i].dept});
					}
				}
				if(edit_flag) $("div.xbutton").show();
				myScroll.refresh();
				checkNewFriend(true);
				loader_wrap_el.hide();
			}
		});
	}

	function loadFriendList() {
		$('#btn_load_wlist').removeClass('btn_friend_pressed');
		$('#btn_load_flist').addClass('btn_friend_pressed');

		showTooltip('친구를 탭하여 시간표를 확인 및 연동하세요.');
		
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: ajax_url+'friend_list.php',
			beforeSend: function() { loader_wrap_el.show(); },
			data: {
				uid: stored_uid
			},
			success: function(data) {
				var result_list_el = $('#wrap_result_list');
				var data_length = data.length;

				if(data[0].user_id == 'no_data') {
					result_list_el.html('<li class="flist"><p class="friend_name">추가된 친구가 없습니다.</p></li>');
					showTooltip('상단의 검색 기능을 이용하여 친구를 추가하세요.');
				} else {
					var list_data = "";
					//create list
					for(var i=0; i<data_length; i++) {
						list_data += '<li id="flist_'+i+'" class="flist"><div class="xbutton">&#10006;</div><p class="friend_name">'+data[i].name+'('+data[i].id.replace(/(.?){2}$/gi, '*')+')</p><p class="friend_info">학교:'+data[i].scl+' 학과:'+data[i].dept+'</p><span class="flist_delete"></span></li>';
					}
					result_list_el.html(list_data);
					//input data
					for(var i=0; i<data_length; i++) {
						$('#flist_'+i).data('friendlist', {unique_id: data[i].uid, name: data[i].name, user_id: data[i].id, school: data[i].scl, dept: data[i].dept});
					}
				}
				if(edit_flag) $("div.xbutton").show();
				myScroll.refresh();
				loader_wrap_el.hide();
			}
		});
	}

	$("#result_list li.slist").live("tap", function(event, ui) {
	var list = $(this);

		if(isDataValid(list, 'searchlist')) {
			navigator.notification.confirm(list.data('searchlist').name+'님께 친구추가 요청을 하시겠습니까?', function(res) {
				if(res === 1) {
					$.ajax({
						type: "post",
						url: ajax_url+'add_friend.php',
						beforeSend: function() { loader_wrap_el.show(); },
						data: {
							my_uid: stored_uid,
							friend_uid: list.data('searchlist').unique_id
						},
						success: function(data) {
							if(data == "true") {
								navigator.notification.alert('친구 요청이 완료되었습니다.', null, 'LimeTable', '확인');
								list.remove();
								myScroll.refresh();
							} else {
								navigator.notification.alert('이미 친구 요청된 친구입니다.', null, 'LimeTable', '확인');
							}
							loader_wrap_el.hide();
						}
					});
				}
			}, 'LimeTable', '확인,취소');
		}
	});

	$(document).ready(function() {
		var search_wrap_el = $('#popup_search_friend');
		tooltip_el = $('#tooltip');
		loader_wrap_el = $('#loader');
		loadFriendList();

		checkNewFriend(false);

		myScroll = new iScroll('content', {
			hScroll:false,
			vScrollbar:true
		});
		
		myScrollPopup = new iScroll('search_content_wrap', {
			hScroll:false,
			vScrollbar:true,
			onScrollMove: function () {
				if(this.y < this.maxScrollY) {
					if(refresh_y_offset < this.scrollerH) {
						refresh_y_offest = this.scrollerH;
						if(!is_search_use) submitSearchData(false);
					}
				}
			}
		});

		
		if(localStorage.getItem('set_tit_help') != 'false') {
			$(document).live('touchstart', function() {
				$('div.helper').fadeOut('4000');
			});
		} else {
			$('div.helper').hide();
		}
		
		$("div.xbutton").live("tap", function(event, ui) {
			if(edit_flag) {
				var obj = $(this);
				var fdata = $(this).parent("li").hasClass('flist') ? 'friendlist' : 'waitlist';
				
				navigator.notification.confirm('친구를 삭제하시겠습니까?', function(res) {
					if(res === 1) {
						$.ajax({
							type: "post",
							url: ajax_url+'delete_friend.php',
							beforeSend: function() { loader_wrap_el.show(); },
							data: {
								my_uid: stored_uid,
								friend_uid: obj.parent("li").data(fdata).unique_id
							},
							success: function(data) {
								loadFriendList();
								loader_wrap_el.hide();
							}
						});
					}
				}, 'LimeTable', '삭제,취소');
			}
		});

		$("#wrap_result_list li.flist").live("tap", function(event, ui) {
			if(!edit_flag) {
				location.href = 'view_table.html';
				localStorage.setItem('view_tmp_uid', $(this).data("friendlist").unique_id);
				localStorage.setItem('view_tmp_name', $(this).data("friendlist").name);
			}
			
		});

		$("#wrap_result_list li.wlist").live("tap", function(event, ui) {
			var obj = $(this);
			var user_name = $(this).data("waitlist").name;
			
			if(!edit_flag) {
				navigator.notification.confirm(user_name+'님을 친구로 추가하시겠습니까?', function(res) {
					if(res === 1) {
						$.ajax({
							type: "post",
							url: ajax_url+'accept_friend.php',
							beforeSend: function() { loader_wrap_el.show(); },
							data: {
								my_uid: stored_uid,
								friend_uid: obj.data("waitlist").unique_id
							},
							success: function(data) {
								if(data == "true") {
									navigator.notification.alert('친구로 등록되었습니다.', null, 'LimeTable', '확인');
									loadWaitingFriendList();
								} else {
									navigator.notification.alert('이미 등록되 친구입니다.', null, 'LimeTable', '확인');
								}
								loader_wrap_el.hide();
							}
						});
					}
				}, 'LimeTable', '추가,취소');	
			}
		});
		
		$('#btn_friend_search').click(function() {
			showTooltip('한 필드 또는 여러 필드를 입력하여 조건 검색이 가능합니다.');
			search_wrap_el.show();
		});

		$('#popup_close').click(function() {
			search_wrap_el.hide();
			$("#search_by_name").val('');
			$('#search_by_school').val('');
			$('#search_by_dept').val('');
			$("#result_list").empty();
			myScrollPopup.refresh();
		});

		$("#submit_search").click(function() { 
			submitSearchData(true); 
		});
	});

	document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);

	







	var subject_uid = localStorage.getItem('sns_tmp_suid');
	var subject_name = localStorage.getItem('sns_tmp_sbj');
	var subject_teacher = localStorage.getItem('sns_tmp_tcr');
	var myScroll, popupScroll;
	var pullDownEl, pullDownOffset, pullUpEl, pullUpOffset;
    var unloader;
	var send_comment_flag = 'cmt';	//cmt:comment, [number of comment id]:reply
	var text_len = 0;
	var sns_limit = 0;
	var sns_init_limit = 15;
	var max_sns_cuid = 0;
	var comment_brcnt = 0;

	function onDeviceReady() {
		document.addEventListener('backbutton', function() {location.href = 'main.html';}, false);
	}
	document.addEventListener('deviceready', onDeviceReady, false);
	
	String.prototype.bytes = function() {
		var str = this;
		var l = 0;
		for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
		return l;
	}

	String.prototype.cut = function(len) {
		var str = this;
		var l = 0;
		for (var i=0; i<str.length; i++) {
			l += (str.charCodeAt(i) > 128) ? 2 : 1;
			if (l > len) return str.substring(0,i);
		}
		return str;
	}

	function nl2br(str, is_xhtml) {
	    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '' : '<br>';
	    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	}	
	
	function localAddMemo(uid, suid, text) {
		localStorage.setItem(uid+'-'+suid, localStorage.getItem(uid+'-'+suid) + text);
	}
	
	function checkInput() {
		if(comment_brcnt>=5) return false;
		if(event.keyCode==13) comment_brcnt++;
	}

	$(document).ajaxStart(function() {
		loader_wrap_el.show();
	}).ajaxStop(function() {
		loader_wrap_el.hide();
	});

	$(document).ready(function() {
		var snswrap_el = $('#list_sns');
		var popup_sns_input = $('#snswriter');
		var text_area_el = $('#sns_textarea');
		var text_len_el = $('#text_len');
		var stored_uid = localStorage.getItem('uqid');
		var wrapper = document.querySelector('#content');
		loader_wrap_el = $('#loader');
		pullDownEl = document.getElementById('pullDown');
		pullDownOffset = pullDownEl.offsetHeight;
		pullUpEl = document.getElementById('pullUp');
		pullUpOffset = pullUpEl.offsetHeight;

		//unloader = new Unloader(wrapper, 'li.list_sns_comment');	//unloader
		myScroll = new iScroll('content', {
			hScroll:false,
			vScrollbar:true,
			topOffset:pullDownOffset,
			onRefresh:function() {
				if(pullDownEl.className.match('loading')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '아래로 스크롤하면 새로고침됩니다...';
				} else if (pullUpEl.className.match('loading')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '더 로드하려면 위로 스크롤하세요...';
				}
				//unloader.reset();
				//unloader.setup(this.x, this.y);
			},
			onPositionChange:function(x, y) {
				//unloader.onmove(x, y);
			},
			onScrollMove: function () {
				if(this.y > 5 && !pullDownEl.className.match('flip')) {
					pullDownEl.className = 'flip';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '손을 떼면 새로고침됩니다...';
					this.minScrollY = 0;
				} else if(this.y < 5 && pullDownEl.className.match('flip')) {
					pullDownEl.className = '';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '아래로 스크롤하면 새로고침됩니다...';
					this.minScrollY = -pullDownOffset;
				} else if (this.y < (this.maxScrollY - 55) && !pullUpEl.className.match('flip')) {
					pullUpEl.className = 'flip';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '손을 떼면 추가 로드합니다...';
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY + 55) && pullUpEl.className.match('flip')) {
					pullUpEl.className = '';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '더 로드하려면 위로 스크롤하세요...';
					this.maxScrollY = pullUpOffset;
				}
			},
			onScrollEnd: function () {
				if(pullDownEl.className.match('flip')) {
					pullDownEl.className = 'loading';
					pullDownEl.querySelector('.pullDownLabel').innerHTML = '불러오는 중...';
					pullDownAction();
				}  else if (pullUpEl.className.match('flip')) {
					pullUpEl.className = 'loading';
					pullUpEl.querySelector('.pullUpLabel').innerHTML = '불러오는 중...';
					pullUpAction(this.y);
				}
			}
		});	//iscroll object

		popupScroll = new iScroll('wrap_scroll_popup', {
			hScroll:false,
			vScrollbar:true
		});

		function pullDownAction() {
			sns_limit = 0;
			load_sns(-1, 0, 0, sns_init_limit, 0);
		}

		function pullUpAction(yPosition) {
			load_sns(-1, 0, sns_limit, sns_init_limit, yPosition);
		}

		function load_sns(id, startCommentUid, limitMin, limitNum, scrollToY) {
			$.ajax({
				type:'post',
				dataType:'json',
				url:ajax_url+'sns_board.php',
				data:{
					uid: stored_uid,
					subject_uid: subject_uid,
					limit_min: limitMin,
					limit_num: limitNum,
					cuid: startCommentUid
				},
				success:function(data) {
					var list_data = '';
					var datalength = data.length;
					//unloader.reset();

					for(var i=0; i<datalength; i++) {
						if(max_sns_cuid < Number(data[i].cmt_id)) max_sns_cuid = Number(data[i].cmt_id);
						var rb = Number(255 - data[i].recommend) >= 50 ? Number(255 - data[i].recommend) : 50;						
						
						list_data += '<li id="c_'+data[i].cmt_id+'" class="list_sns_comment" style="background-color:rgb('+ rb +', 255, '+ rb +');">'+
							'<div class="sns_content_theme">';
						if(data[i].uid == stored_uid) {
							list_data += '<div class="box_xbutton_position_comment" id="comment_'+data[i].cmt_id+'">&#10006;</div>';
						}
						list_data += '<div class="box_sns_comment">'+
							'<p class="text_comment_name">'+data[i].name+'('+data[i].dept+')</p><p class="text_comment_time">'+data[i].time+'</p>'+
							'<p class="text_comment_content">'+nl2br(data[i].cmt, false)+'</p>'+
						'</div>'+
						'<div class="box_section_sns_reply">'+
							'<div class="box_sns_reply">'+
								'<span class="sns_reply" id="'+data[i].cmt_id+'" title='+data[i].num_re+'>댓글 보기(' +data[i].num_re+')</span>'+
								'<span class="btn_reply_input" id="replyinput_'+data[i].cmt_id+'">댓글 입력</span>'+
								'<span class="btn_comment_memo" id="tomemo_'+data[i].cmt_id+'">메모 저장</span>'+
								'<span class="btn_reply_recommend" id="recommend_'+data[i].cmt_id+'"> 추천('+data[i].recommend+')</span>'+ //추천하기
								'<ul id="wrap_reply'+data[i].cmt_id+'" class="list_section_sns_content"></ul>'+
							'</div></div></div>'+
						'</li>';
					}
					if(startCommentUid != 0) snswrap_el.prepend(list_data).trigger('create');
					else if(limitMin == 0) snswrap_el.html(list_data).trigger('create');
					else snswrap_el.append(list_data).trigger('create');
					//unloader.resetMap(wrapper, 'li.list_sns_comment');
					myScroll.refresh();
					refreshlayout();

					if(id != -1) load_sns_reply(id);

					myScroll.scrollTo(0, scrollToY, 0);

					//sns_limit += data.length;
					sns_limit = snswrap_el.children().length;
				}
			});
		}
		load_sns(-1, 0, 0, sns_init_limit, 0);
		checkNewFriend(false);

		function load_sns_reply(id) {
			var reply_el = $('#wrap_reply'+id);
			$.ajax({
				type:'post',
				data:{
					comment_id: id
				},
				dataType:'json',
				url:ajax_url+'sns_reply.php',
				success:function(data) {
					var data_length = data.length;
					var list_data = '';

					//unloader.reset();

					for(var i=0; i<data_length; i++) {
						list_data += '<li id="r_'+data[i].re_id+'" class="list_sns_reply">'+
							'<div class="sns_content_theme list_ui_gray">';
								if(data[i].uid == stored_uid) {
									list_data += '<div style="position:relative;"><div class="box_xbutton_position_reply" id="reply_'+data[i].re_id+'_'+id+'">&#10006;</div></div>';
								}
								list_data += '<p class="text_reply_name">'+data[i].name+'('+data[i].dept+')</p><p class="text_reply_time">'+data[i].time+'</p>'+
									'<p class="text_reply_content">'+data[i].re+'</p>'+
							'</div>'+
						'</li>';
					}
					reply_el.html(list_data).trigger('create');
					//unloader.resetMap(wrapper, 'li.list_sns_comment');
					myScroll.refresh();
					refreshlayout();
				}
			});
		}

		$('span.btn_reply_recommend').live('tap', function() {   //추천하기 이벤트
			var tmp = this.id.split('_');
			var flag = true;
			
			if(localStorage.getItem('recommend') != null) {
				var recommend_flag = localStorage.getItem('recommend').split(',');
				for(i = 0; i < recommend_flag.length; i++) { 
					if(tmp[1] == recommend_flag[i]) flag = false;
				}
			}
			if(flag){
				$.ajax({
					type:'post',
					url:ajax_url+'sns_recommend.php',
					data:{
						comment_id:tmp[1]
					},
					success:function(data) {
						if(localStorage.getItem('recommend') == null) localStorage.setItem('recommend', tmp[1]);
						else localStorage.setItem('recommend', localStorage.getItem('recommend') + ","+tmp[1]);
						$('#recommend_'+tmp[1]).html(' 추천('+data+')').trigger('create');
					}
				});
			}
			else navigator.notification.alert('이미 추천하셨습니다.', null, 'LimeTable', '확인');
		});
		
		function refreshlayout() {
			//unloader.reset();	//layout backup
			//unloader.resetMap(wrapper, 'li.list_sns_comment');
			myScroll.refresh();	//refresh layout
		}

		$('span.sns_reply').live('tap', function(event, ui) {
			if($(this).attr('title') > 0) {
				var reply_el = $('#wrap_reply'+this.id);
				if(reply_el.html()) {
					reply_el.empty();
					//layout reset
					//unloader.reset();
					//unloader.resetMap(wrapper, 'li.list_sns_comment');
					myScroll.refresh();
					refreshlayout();
				} else {
					load_sns_reply(this.id);
				}
			}
		});

		function delete_execute(object_id, url) {
			navigator.notification.confirm('삭제하시겠습니까?', function(res) {
				if(res === 1) {
					var id = object_id.split('_');
					$.ajax({
						type:'post',
						async:true,
						data:{
							comment_id:id[1],
							reply_id:id[1]
						},
						url:url,
						success:function() {
							//unloader.reset();
							if(id[0] == 'comment') {
								$('#c_'+id[1]).remove();
								snswrap_el.trigger('create');
							} else if(id[0] == 'reply') {
								$('#r_'+id[1]).remove();
								reply_el.trigger('create');
							}
							//unloader.resetMap(wrapper, 'li.list_sns_comment');
							myScroll.refresh();
	
							/* if(id[0] == 'comment') load_sns(-1, 0, 0, sns_limit, myScroll.getScrollY());
							else if(id[0] == 'reply') load_sns(id[2], 0, 0, sns_limit, myScroll.getScrollY()); */
						}
					});
				}
			}, 'LimeTable', '삭제,취소');
		}

		$('div.box_xbutton_position_comment').live('tap', function(event, ui) {
			delete_execute(this.id, ajax_url+'sns_delete.php');
		});

		$('div.box_xbutton_position_reply').live('tap', function(event, ui) {
			delete_execute(this.id, ajax_url+'sns_reply_delete.php');
		});


		$('#submit_sns').click(function() {
			var insert = $('#sns_textarea');

			if(insert.val().bytes() < 240) {
				if(insert.val() != '') {
					if(send_comment_flag == 'cmt') {
						$.ajax({
							type:'post',
							async:true,
							data:{
								uid:stored_uid,
								insert:insert.val(),
								subject_uid:subject_uid
							},
							url:ajax_url+'sns_insert.php',
							success:function() {
								insert.val('');
								popup_sns_input.hide();
								//load_sns(-1, 0, 0, sns_init_limit, 0);
								load_sns(-1, max_sns_cuid, 0, sns_init_limit, 0);
							}
						});
					} else {
						$.ajax({
							type:'post',
							async:true,
							data:{
								uid:stored_uid,
								reply:insert.val(),
								comment_id:send_comment_flag
							},
							url:ajax_url+'sns_reply_insert.php',
							success:function() {
								insert.val('');
								popup_sns_input.hide();
								load_sns(send_comment_flag, 0, 0, sns_limit, myScroll.getScrollY());
							}
						});
					}
				}
			} else {
				navigator.notification.alert('글은 최대 한글 120자, 영어 및 특수문자 240자까지 입력이 가능합니다.', null, 'LimeTable', '확인');
			}
		});

		$('#popup_write_sns').live('tap', function() {
			popup_sns_input.show();
			comment_brcnt = 0;
			send_comment_flag = 'cmt';
		});

		$('span.btn_reply_input').live('tap', function() {
			popup_sns_input.show();
			comment_brcnt = 0;
			var tmp = this.id.split('_');
			send_comment_flag = tmp[1];
		});

		$('#btn_popup_close').live('tap', function() {
			text_area_el.val('');
			popup_sns_input.hide();
		});

		$('span.btn_comment_memo').live('tap', function() {
			var id = this.id;
			
			navigator.notification.confirm('이 글을 메모에 추가하시겠습니까?', function(res) {
				if(res === 1) {
					var c_id = id.split('_');
					localAddMemo(stored_uid, subject_uid, $('#c_'+c_id[1]).find('p.text_comment_content').html()+'\n');
					navigator.notification.alert('추가되었습니다.', null, 'LimeTable', '확인');
				}
			}, 'LimeTable', '추가,취소');
		});

		$('#view_friend').live('tap', function() {
			$('#list_view').show();
			$.ajax({
				type:'post',
				dataType:'json',
				url:ajax_url+'get_subject_friend_list.php',
				data:{
					uid:stored_uid,
					suid:subject_uid
				},
				success:function(data) {
					var result = '';

					for(var i=0; i<data.length; i++) {
						result += '<li id="list_'+i+'" class="slist"><p class="slist_text">'
							+data[i].name+'</p><p class="slist_text">학교:'+data[i].scl+', 학과:'+data[i].dept+'</p>'+
							'<div style="position:relative;"><div style="position:absolute;top:-35px;right:5px;color:#444;font-size:1.4em;">&#10006;</div></div></li>';
					}
					$('#list_wrap').html(result);
					popupScroll.refresh();

					for(var i=0; i<data.length; i++) {
						$('#list_'+i).data('listdata', {unique_id: data[i].uid});
					}
				}
			});
		});

		$('li.slist').live('click', function() {
			var obj = $(this);

			navigator.notification.confirm('선택한 친구와 과목 연동을 해제하시겠습니까?', function(res) {
				if(res === 1) {
					$.ajax({
						type: "post",
						url: ajax_url+'link_detach.php',
						data: {
							user_uid: stored_uid,
							friend_uid: obj.data('listdata').unique_id,
							user_suid: subject_uid
						},
						success: function(data) {
							obj.remove();
							navigator.notification.alert('과목 연동이 해제되었습니다.', null, 'LimeTable', '확인');
							
						}
					});
				}
			}, 'LimeTable', '해제,취소');
		});
		
		$('#popup_close').click(function() {
			$('#list_view').hide();
		});

		$('#subject_information').prepend('<p class="text_sbjinfo"> 과목 : '+subject_name+', 강사 : '+subject_teacher+ '</p>').trigger('create');
	});

	document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	







	var myScroll, myScrollPopup;
	var friend_uid = localStorage.getItem('view_tmp_uid');
	var friend_name = localStorage.getItem('view_tmp_name');

	function onDeviceReady() {
		document.addEventListener('backbutton', function() {location.href = 'list_friend.html';}, false);
	}
	document.addEventListener('deviceready', onDeviceReady, false);
	
	$(document).ajaxStart(function() {loader_wrap_el.show();}).ajaxStop(function() {loader_wrap_el.hide();});

	$(document).ready(function() {
		var timetable_wrap_el = $('#timetable_wrap');
		var tooltip_el = $('#tooltip');
		loader_wrap_el = $('#loader');

		myScroll = new iScroll('content', {
			hScroll:false,
			vScrollbar:true
		});

		function showTooltip(message ,delay) {
			if(localStorage.set_help != 'false') {
				delay = delay || 5000;	//default: 5000ms
				if(tooltip_el.html() != message) {
					tooltip_el.html(message).stop(true, true).fadeIn(delay * 0.2).delay(delay * 0.5).fadeOut(delay * 0.3);
				}
			}
		}

		showTooltip('친구 과목을 터치해 내 시간표에 복사할 수 있습니다.');
		checkNewFriend(false);

		//친구 테이블 로드  메서드
		function loadTable(uid) {
			$.ajax({
				type:'post',
				dataType:'json',
				url:ajax_url+'check_table.php',
				data:{
					uid: uid
				},
				success:function(data) {
					var data_length = data.length;
					var max_time = data[0].max_time;

					//create empty table
					var table_frame_data = "<table id='timetable'><tr class='cell_header'><td class='cell_num cell_header'>교시</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td></tr>";
					for(var i=1; i<=max_time; i++) {
						table_frame_data += "<tr>";
						for(var j=0; j<7; j++) {
							if(j == 0) table_frame_data += "<td class='cell_num'>"+i+"</td>";
 							else table_frame_data += "<td class='cell_subject' id='"+j+"_"+i+"'></td>";
						}
						table_frame_data += "</tr>";
					}
					table_frame_data += "</table>";
					timetable_wrap_el.html(table_frame_data);

					//input table data
					for(var i=1; i<=max_time; i++) {
						for(var j=0; j<7; j++) {
							var cell_id = $("#"+j+"_"+i);
							for(var k=0; k<data_length; k++) {
								if(data[k].time == i && data[k].day == j) {
									cell_id.html("<p class='cell_data'>"+cutStrLeft(data[k].sbj, 0, 10)+"</p><p class='cell_subdata'>"+cutStrLeft(data[k].place, 0, 10)+"</p>");
									cell_id.addClass('color_'+data[k].cid);
									cell_id.data("tabledata", {subject_uid: data[k].suid, subject: data[k].sbj, teacher: data[k].tcr, place: data[k].place, colorid: data[k].cid});
								}
							}
							cell_id.data("timedata", {day: j, time: i});
						}
					}
					myScroll.refresh();

				}
			});
		}
		loadTable(friend_uid);
		$('#wrap_friend_info').html(friend_name+'님의 시간표 입니다.');
		
		$('td.cell_subject').live('tap', function() {
			var object = $(this);
			if(isDataValid(object, 'tabledata')) {
				navigator.notification.confirm('해당 친구 시간표를 내 시간표에 복사하시겠습니까?', function(res) {
					if(res === 1) {
						$.ajax({
							type:'post',
							url:ajax_url+'copy_table.php',
							data:{
								uid: localStorage.getItem('uqid'),
								fuid: friend_uid,
								suid: object.data('tabledata').subject_uid
							},
							success:function(data) {
								if(data == 'false') {
									navigator.notification.alert('이미 같은 시간표가 있거나, 겹치는 시간표가 있어 복사할 수 없습니다.', null, 'LimeTable', '확인');
								} else {
									navigator.notification.alert('시간표를 복사하였습니다.', null, 'LimeTable', '확인');
									//save offline data
									$.ajax({
										type:'post',
										dataType:'json',
										url:ajax_url+'check_table.php',
										data:{
											uid: localStorage.getItem('uqid')
										},
										success:function(data) {
											localStorage.setItem('tdata-'+localStorage.getItem('uqid'), JSON.stringify(data));
										}
									});
								}
							}
						});
					}
				}, 'LimeTable', '확인,취소');
			}
		});
	});
	document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	







	function onDeviceReady() {
		document.addEventListener('backbutton', function() {location.href = 'user_setting.html';}, false);
	}
	document.addEventListener('deviceready', onDeviceReady, false);
	
	$(document).ready(function() {
		var popup_set_max_time = $('#popup_set_max_time');
		
		myScroll = new iScroll('content', {
			hScroll:false,
			vScrollbar:true
		});
		
		checkNewFriend(false);
		
		$('#set_max_time').click(function() {
			if(localStorage.getItem('max_time') == null) $('#max_time').val(10);
			else $('#max_time').val(localStorage.getItem('max_time'));
			popup_set_max_time.show();
		});

		$('#btn_popup_close').click(function() {
			popup_set_max_time.hide();
		});
		
		$('#submit_max_time').click(function() {
			var max_time = escape($('#max_time').val());
			
			if(max_time<5 || max_time>22 || max_time.match(/^\d+$/ig) == null) navigator.notification.alert('5~22의 숫자만 입력하세요.', null, 'LimeTable', '확인');
			else {
				$.ajax({
					type:'post',
					async:true,
					data:{
						max_time : max_time,
						uid : localStorage.getItem('uqid')
					},
					url:ajax_url+'set_max_time.php',
					success:function() {
						navigator.notification.alert('저장되었습니다.', null, 'LimeTable', '확인');
						popup_set_max_time.hide();
						setLocalMaxTimeData(max_time);
					}
				});
			}
		});
		
		function setLocalMaxTimeData(max_time) {
			var data = JSON.parse(localStorage.getItem('tdata-'+localStorage.getItem('uqid')));
			data[0].max_time = max_time;
			localStorage.setItem('tdata-'+localStorage.getItem('uqid'), JSON.stringify(data));
		}
	});
	










	var ajax_url = 'http://softwaresquare.org/php/';
	var loader_wrap_el;
	var id_el;
	var password_el;
	var errmsg_wrap_el;
	var ad_url = 'http://softwaresquare.org';
	
	function onDeviceReady() {
		document.addEventListener('backbutton', function() {navigator.app.exitApp();}, false);
	}
	//android backbutton
	document.addEventListener('deviceready', onDeviceReady, false);
	
	$(document).ajaxStart(function() {
		loader_wrap_el.show();
	}).ajaxStop(function() {
		loader_wrap_el.hide();
	});
	
	function onKeyDownAction() {
		if(event.keyCode == 13) loginAction();
	}

	function loginAction() {
		if(id_el.val() != '' && password_el.val() != '') {
			$.ajax({
				type: 'post',
				dataType: 'json',
				cache: false,
				url: ajax_url+'login_checkinfo_enc.php',
				data: {
					id:id_el.val(),
					password:Aes.Ctr.encrypt(password_el.val(), 'L8Aqx5Zvc', 256),
					autovalue:function() { return $('#autologin_inner').hasClass('checkbox_checked') ? 'true' : 'false'; }
				},
				success: function(data) {
					if(data == false) {
						errmsg_wrap_el.show();
					} else {
						errmsg_wrap_el.hide();
						localStorage.setItem('usid', id_el.val());
						localStorage.setItem('uqid', data.uid_value);
						if(data.auto_value != null) localStorage.setItem('aval', data.auto_value);
						location.replace('main.html');
					}
				}
			});
		}
	}

	$(document).ready(function() {
		id_el = $('#id');
		password_el = $('#password');
		errmsg_wrap_el = $('#errmsg_wrap');
		loader_wrap_el = $('#loader');

		if(localStorage.getItem('usid')) id_el.val(localStorage.getItem('usid'));
		if(localStorage.getItem('aval') != null) $('#autologin_inner').addClass('checkbox_checked');

		function autoLogin() {
			if(localStorage.getItem('aval') != null) {
				$.ajax({
					type: 'post',
					cache: false,
					url: ajax_url+'auto_check.php',
					data: {
						id: localStorage.getItem('usid'),
						uid: localStorage.getItem('uqid'),
						autovalue: localStorage.getItem('aval')
					},
					success: function(data) {
						if(data == 'true') {
							location.replace('main.html');
							return false;
						}
						else localStorage.removeItem('aval');
						
					},
				});
			} else {
				localStorage.removeItem('uqid');
			}
		}
		
		$('#submit_login').click(function() {
			loginAction();
		});

		/* 자동로그인 체크 */
		$('#wrap_autologin').live('tap', function() {
			$('#autologin_inner').toggleClass('checkbox_checked');
		});
		
		autoLogin();
	});
	







	var myScroll;
	var loader_wrap_el;
	var tooltip_el;
	var stored_uid = localStorage.getItem('uqid');

	function onDeviceReady() {
		document.addEventListener('backbutton', function() {
			if($('#search_result_wrap').css('display') != 'none') {
				$('#search_result_wrap').hide();
				$('#timetable_wrap').show();
				myScroll.refresh();
			} else {
				location.href = 'main.html';
			}
		}, false);
	}
	document.addEventListener('deviceready', onDeviceReady, false);
	

	function localSaveMemo(uid, suid, text) {
		text == '' ? localStorage.removeItem(uid+'-'+suid) : localStorage.setItem(uid+'-'+suid, text);
	}

	function localLoadMemo(uid, suid) {
		return localStorage.getItem(uid+'-'+suid) != null ? localStorage.getItem(uid+'-'+suid) : '';
	}

	function showTooltip(message ,delay) {
		if(localStorage.getItem('set_help') != 'false') {
			delay = delay || 5000;	//default: 5000ms
			if(tooltip_el.html() != message) {
				tooltip_el.html(message).stop(true, true).fadeIn(delay * 0.2).delay(delay * 0.5).fadeOut(delay * 0.3);
			}
		}
	}

	$(document).ajaxStart(function() {
		loader_wrap_el.show();
	}).ajaxStop(function() {
		loader_wrap_el.hide();
	});

	$(document).ready(function() {
		var timetable_wrap_el = $('#timetable_wrap');
		var search_result_el = $('#search_result_wrap');
		var link_friend_el = $('#link_friend_result');
		var current_suid = null;

		tooltip_el = $('#tooltip');
		loader_wrap_el = $('#loader');

		myScroll = new iScroll('content', {
			hScroll:false,
			vScrollbar:true
		}); //iScroll

		function loadTable() {
			$.ajax({
				type:'post',
				dataType:'json',
				url:ajax_url+'check_table.php',
				data:{
					uid: stored_uid
				},
				success:function(data) {
					var data_length = data.length;
					var max_time = data[0].max_time;

					//create empty table
					var table_frame_data = "<table id='timetable'><tr class='cell_header'><td class='cell_num cell_header'>교시</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td></tr>";
					for(var i=1; i<=max_time; i++) {
						table_frame_data += "<tr>";
						for(var j=0; j<7; j++) {
							if(j == 0) table_frame_data += "<td class='cell_num'>"+i+"</td>";
							else table_frame_data += "<td class='cell_subject' id='"+j+"_"+i+"'></td>";
						}
						table_frame_data += "</tr>";
					}
					table_frame_data += "</table>";
					timetable_wrap_el.html(table_frame_data);

					//input table data
					for(var i=1; i<=max_time; i++) {
						for(var j=0; j<7; j++) {
							var cell_id = $("#"+j+"_"+i);
							for(var k=0; k<data_length; k++) {
								if(data[k].time == i && data[k].day == j) {
									cell_id.html("<p class='cell_data'>"+cutStrLeft(data[k].sbj, 0, 10)+"</p><p class='cell_subdata'>"+cutStrLeft(data[k].place, 0, 10)+"</p>");
									cell_id.addClass('color_'+data[k].cid);
									cell_id.data("tabledata", {subject_uid: data[k].suid, subject: data[k].sbj, teacher: data[k].tcr, place: data[k].place, colorid: data[k].cid});
								}
							}
							cell_id.data("timedata", {day: j, time: i});
						}
					}
					setTimeout(function() { myScroll.refresh(); }, 200);
				}
			});
		}
		loadTable();
		showTooltip('SNS연동을 하면 친구와 SNS페이지에서 정보를 공유할 수 있습니다.  공유할 과목을 탭하여 연동하세요.', 7000);
		checkNewFriend(false);

		$('td.cell_subject').live('tap', function() {
			if(isDataValid($(this), 'tabledata')) {
				current_suid = $(this).data('tabledata').subject_uid;

				showTooltip('선택한 친구들과 SNS연동이 가능합니다.');

				var cell = this.id.split('_');

				$.ajax({
					type: "post",
					dataType:'json',
					url: ajax_url+'get_link_friend_list.php',
					data: {
						uid: localStorage.getItem('uqid'),
						suid: $(this).data('tabledata').subject_uid,
						day: cell[0],
						time: cell[1],
					},
					success: function(data) {
						var result = '';

						if(data.length == 0) result = '<li class="slist_nodata"><p class="slist_text">해당 시간에 일치하는 친구 시간표가 없습니다.</p></li>';
						for(var i=0; i<data.length; i++) {
							result += '<li id="list_'+i+'" class="slist">'+
							'<div class="wrap_slist_info"><p class="slist_text"><strong>'+data[i].name+'</strong></p><p class="slist_text">학교:'+cutStrLeft(data[i].scl, 0, 12)+', 학과:'+cutStrLeft(data[i].dept, 0, 12)+'</p></div>'+
							'<div class="wrap_slist_sbj"><p class="slist_text">과목명:</p><p class="slist_text"><strong>'+cutStrLeft(data[i].sbj, 0, 14)+'</strong></p></div>'+
							'</li>';
						}
						link_friend_el.html(result);

						for(var i=0; i<data.length; i++) {
							$('#list_'+i).data('linkdata', {subject_uid: data[i].suid, unique_id: data[i].uid});
						}

						timetable_wrap_el.hide();
						search_result_el.show();
						myScroll.refresh();
					}
				});
			}
		});

		$('li.slist').live('tap', function() {
			var thel = $(this);
			if(thel.hasClass('slist_selected')) {
				thel.removeClass('slist_selected');
			} else {
				thel.addClass('slist_selected');
			}
		});

		$("#accept").on('tap',function() {
			var selected_arr = new Array();
			var arr_idx = 0;

			$('li.slist').each(function() {
				if($(this).hasClass('slist_selected')) {
					var tmp = new Object;
					tmp['uid'] = $(this).data('linkdata').unique_id;
					tmp['suid'] = $(this).data('linkdata').subject_uid;
					selected_arr[arr_idx] = tmp;
					arr_idx++;
				}
			});

			var converted_json = {data:selected_arr};

			if(arr_idx > 0) {
				$.ajax({
					type: "post",
					url: ajax_url+'link_subject.php',
					data: {
						uid: localStorage.getItem('uqid'),
						usuid: current_suid,
						fdata: converted_json
					},
					success: function(data) {
						search_result_el.hide();
						timetable_wrap_el.show();
						navigator.notification.alert('과목 연동에 성공하였습니다.\n연동된 친구들과 SNS를 공유할 수 있습니다.', null, 'LimeTable', '확인');
					}
				});
			} else {
				navigator.notification.alert('연동 가능한 친구가 선택되지 않았습니다.', null, 'LimeTable', '확인');
			}
		});

		$('#selectall').on('tap',function() {
			if(!$('li.slist').hasClass('slist_selected')) $('li.slist').addClass('slist_selected');
			else $('li.slist').removeClass('slist_selected');
		});

		$('#cancel').on('tap',function() {
			search_result_el.hide();
			timetable_wrap_el.show();
		});
	});

	document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	












	function onDeviceReady() {
		document.addEventListener('backbutton', function() {location.href = 'user_setting.html';}, false);
	}
	document.addEventListener('deviceready', onDeviceReady, false);
	
	$(document).ajaxStart(function() {
		$("div.loading_wrap").show();
	}).ajaxStop(function() {
		$("div.loading_wrap").hide();
	});

	$(document).ready(function() {
		$('#submit_info').click(function() {
			var password = $('#password').val();
			var passwordconfirm = $('#passwordconfirm').val();
			var name = $('#name').val();
			var school = $('#school').val();
			var dept = $('#dept').val();
			var password_length = escape(password).length;

			if(password != passwordconfirm) {
				navigator.notification.alert('비밀번호를 재 확인해 주세요.', null, 'LimeTable', '확인');
			}
			else if(password_length < 6 && password_length > 12) navigator.notification.alert('6~12자리의 비밀번호를 입력하세요.', null, 'LimeTable', '확인');
			else {
				$.ajax({
					type:'post',
					async:true,
					url:ajax_url+'change_userinfo_enc.php',
					data:{
						uid: localStorage.getItem('uqid'),
						password: Aes.Ctr.encrypt(password, 'L8Aqx5Zvc', 256),
						name: name,
						school: school,
						dept: dept
					},
					success:function() {
						location.replace('user_setting.html');
					}
				});
			}
		});

		$('#retire').click(function() {
			navigator.notification.confirm('회원탈퇴를 하시면 모든 데이터가 소멸됩니다.\n탈퇴하시겠습니까?', function(res) {
				if(res === 1) {
					$.ajax({
						type:'post',
						url:ajax_url+'retire.php',
						data:{
							uid: localStorage.getItem('uqid')
						},
						success:function(data) {
							localStorage.removeItem('tdata-'+localStorage.getItem('uqid'));
							localStorage.removeItem('usid');
							localStorage.removeItem('uqid');
							localStorage.removeItem('aval');
							location.replace('index.html');
						}
					});
				}
			}, 'LimeTable', '탈퇴,취소');
		});
		
		function load_userinfo() {
			$.ajax({
				type:'post',
				dataType:'json',
				data:{
					uid : localStorage.getItem('uqid')
				},
				url:ajax_url+'get_userinfo.php',
				success:function(data) {
					$('#name').val(data[0].name);
					$('#school').val(data[0].scl);
					$('#dept').val(data[0].dept);
				}
			});
		} load_userinfo();
	});
	








	var myScroll;
	
	function onDeviceReady() {
		document.addEventListener('backbutton', function() {location.href = 'user_setting.html';}, false);
	}
	document.addEventListener('deviceready', onDeviceReady, false);

	$(document).ready(function() {
		myScroll = new iScroll('content', {
			hScroll:false,
			vScrollbar:true
		});
		
		checkNewFriend(false);
	});
	document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	












	function onDeviceReady() {
		document.addEventListener('backbutton', function() {location.href = 'index.html';}, false);
	}
	document.addEventListener('deviceready', onDeviceReady, false);
	
	$(document).ajaxStart(function() {
		$("div.loading_wrap").show();
	}).ajaxStop(function() {
		$("div.loading_wrap").hide();
	});

	$(document).ready(function() {
		var form_submit = $('#form');

		form_submit.ajaxForm({
			beforeSubmit:function() {
				$('#password_enc').val(Aes.Ctr.encrypt($('#password').val(), 'L8Aqx5Zvc', 256));
				return form_submit.valid();
			},
			success:function(data) {
				if(data == 'true') {
					location.replace("index.html");
					form_submit.clearForm();
				}
			}
		});

		form_submit.validate({
			onkeyup:false,
			onfocusout:false,
			rules:{
				id:{
					required:true,
					userid:true,
					minlength:6,
					maxlength:16,
					remote: {
						url:ajax_url+'join_idcheck.php',
						type:'post',
						data:{
							id:function() { return $("#id").val(); }
						}
					}
				},
				password:{
					required:true,
					minlength:6,
					maxlength:12
				},
				passwordconfirm:{
					required:true,
					equalTo:"#password"
				},
				name:{
					required:true,
					minlength:2,
					maxlength:20
				},
				school:{
					required:true,
					minlength:2,
					maxlength:30
				},
				dept:{
					required: true,
					minlength:2,
					maxlength:30
				}
			},
			messages:{
				id:{
					required:'아이디를 입력해 주세요.',
					userid:'아이디는 6~16자리의 영문, 숫자 및 언더바(_)로 만들어 주세요.',
					minlength:'아이디는 6~16자리의 영문, 숫자 및 언더바(_)로 만들어 주세요.',
					maxlength:'아이디는 6~16자리의 영문, 숫자 및 언더바(_)로 만들어 주세요.',
					remote:'이미 사용중인 아이디 입니다.'
				},
				password:{
					required:'비밀번호를 입력하세요.',
					kor:'비밀번호는 6~12자리의 영, 숫자의 조합으로 만들어 주세요.',
					minlength:'비밀번호는 6~12자리의 영, 숫자의 조합으로 만들어 주세요.',
					maxlength:'비밀번호는 6~12자리의 영, 숫자의 조합으로 만들어 주세요.'
				},
				passwordconfirm:{
					required:'비밀번호를 다시 확인하세요.',
					equalTo:'비밀번호를 다시 확인하세요.'
				},
				name:{
					required:'닉네임을 입력하세요.',
					minlength:'2글자 이상 입력해 주세요.',
					maxlength:'최대 제한 길이를 넘었습니다.'
				},
				school:{
					required:'학교를 입력하세요.',
					minlength:'2글자 이상 입력해 주세요.',
					maxlength:'최대 제한 길이를 넘었습니다.'
				},
				dept:{
					required:'학과를 입력하세요.',
					minlength:'2글자 이상 입력해 주세요.',
					maxlength:'최대 제한 길이를 넘었습니다.'
				}
			}
		});
	});
	







	var ajax_url = 'http://softwaresquare.org/php/';
	var memo_showing_flag = false;
	var help_el;
	var myScroll;
	var loader_wrap_el;
	var memo_input_el;
	var currentMemoId = null;
	var sns_transinfo_el;
	var tooltip_el;
	var flag_tap = false;
	var stored_uid = localStorage.getItem('uqid');
	
	//android backbutton
	function onDeviceReady() {
		document.addEventListener('backbutton', function() {navigator.app.exitApp();}, false);
	}
	document.addEventListener('deviceready', onDeviceReady, false);
	
	if(localStorage.getItem('comment_number') == null) localStorage.setItem('comment_number', '5');
	if(localStorage.getItem('comment_day') == null) localStorage.setItem('comment_day', '3');

	function localSaveMemo(uid, suid, text) {
		text == '' ? localStorage.removeItem(uid+'-'+suid) : localStorage.setItem(uid+'-'+suid, text);
	}

	function localLoadMemo(uid, suid) {
		return localStorage.getItem(uid+'-'+suid) != null ? localStorage.getItem(uid+'-'+suid) : '';
	}

	function showTooltip(message ,delay) {
		if(localStorage.getItem('set_help') != 'false') {
			delay = delay || 5000;	//default: 5000ms
			if(tooltip_el.html() != message) {
				tooltip_el.html(message).stop(true, true).fadeIn(delay * 0.2).delay(delay * 0.5).fadeOut(delay * 0.3);
			}
		}
	}
	
	$(document).ready(function() {
		var snswrap_el = $('#table_list_sns');
		var timetable_wrap_el = $('#timetable_wrap');
		var memo_wrap_el = $('#memo_subject');

		tooltip_el = $('#tooltip');
		memo_input_el = $('#memoarea');
		loader_wrap_el = $('#loader');
		help_el = $('div.helper');
	
		myScroll = new iScroll('content', {
			hScroll:false,
			vScrollbar:true
		});
		
		if(localStorage.getItem('set_tit_help') != 'false') {
			$(document).live('touchstart', function() {
				help_el.fadeOut('4000');
			});
		} else {
			help_el.hide();
		}
		
		
		function load_sns() {
			$.ajax({
				type:'post',
				dataType:'json',
				url:ajax_url+'sns_newComment.php',
				data:{
					uid: stored_uid,
					comment_number: localStorage.getItem('comment_number'),
					day: localStorage.getItem('comment_day')
				},
				success:function(data) {
					var new_comment_list = '';
					if(data.length != 0){
						for(i=0; i<data.length; i++) {
							if(getByte(data[i].cmt) > 36) var comment = cutStrLeft(data[i].cmt, 0, 36) + '..';
							else var comment = data[i].cmt;
							new_comment_list += '<tr id ="new_'+i+'" class="new_sns"><td class="new_sns_name">(<strong>'+cutStrLeft(data[i].sbj, 0, 16)+'</strong>)<br>'+data[i].name+'</td><td class="new_sns_comment">'+comment+'</td></tr>';
						}
						snswrap_el.html(new_comment_list).trigger('create');
						for(k=0; k<data.length; k++) {
							var new_id = $('#new_'+k);
							new_id.data("commentdata", {subject_uid: data[k].suid, subject: data[k].sbj, teacher: data[k].tcr});
						}
					}
					else snswrap_el.html("<strong>최근 코멘트가 없습니다.</strong>").trigger('create');
					myScroll.refresh();
				}
			});
		}
	
		/* 테이블 로드:stored된 값이 없으면 서버, 있으면 stored된 값 로드 */
		function loadTable() {
			if(localStorage.getItem('tdata-'+stored_uid) == null) {
				$.ajax({
					type:'post',
					dataType:'json',
					url:ajax_url+'check_table.php',
					data:{
						uid: stored_uid
					},
					success:function(data) {
						parseTableData(data);
					},
					error:function(error) {
						parseTableData(JSON.parse(localStorage.getItem('tdata-'+stored_uid)));
					}
				});
			} else {
				parseTableData(JSON.parse(localStorage.getItem('tdata-'+stored_uid)));
			}
		}
		loadTable();
		load_sns();
		checkNewFriend(true);
		setTimeout(function() { myScroll.refresh(); }, 200);
	
		function parseTableData(data) {
			var data_length = data.length;
			var max_time = data[0].max_time;
			var time = new Date() 
			var day = time.getDay() % 7;
			
			if(data_length <= 1) showTooltip('새 과목을 추가하려면 상단의 편집 버튼을 탭하세요.');
			
			//create empty table
			var table_frame_data = "<table id='timetable'><tr class='cell_header'><td class='cell_num cell_header'>교시</td>"
									 + "<td id='day_1'>월</td><td id='day_2'>화</td><td id='day_3'>수</td>"
									 + "<td id='day_4'>목</td><td id='day_5'>금</td><td id='day_6'>토</td></tr>";
			for(var i=1; i<=max_time; i++) {
				table_frame_data += "<tr>";
				for(var j=0; j<7; j++) {
					if(j == 0) table_frame_data += "<td class='cell_num'>"+i+"</td>";
					else table_frame_data += "<td class='cell_subject' id='"+j+"_"+i+"'></td>";
				}
				table_frame_data += "</tr>";
			}
			table_frame_data += "</table>";
			timetable_wrap_el.html(table_frame_data);
			$('#day_'+day).toggleClass('cell_day_effect');

			for(var k=1; k<data_length; k++) {
				var cell_id = $("#"+data[k].day+"_"+data[k].time);
				
				cell_id.html("<p class='cell_data'>"+cutStrLeft(data[k].sbj, 0, 10)+"</p><p class='cell_subdata'>"+cutStrLeft(data[k].place, 0, 10)+"</p>");
				cell_id.addClass('color_'+data[k].cid);
				cell_id.data("tabledata", {subject_uid: data[k].suid, subject: data[k].sbj, teacher: data[k].tcr, place: data[k].place, colorid: data[k].cid});
				cell_id.data("timedata", {day: data[k].day, time: data[k].time});
			}
			myScroll.refresh();
		}
		
		$('td.cell_subject').live('tap', function() {
			if(memo_showing_flag) {
				//memo_wrap_el.slideUp('fast', function() {
					localSaveMemo(stored_uid, currentMemoId, memo_input_el.val());
					memo_wrap_el.hide();
					memo_showing_flag = false;
				//});
			} else {
				var tmp_el = $(this);
				flag_tap = false;
	
				if(tmp_el.data('tabledata') != null) {
					var sbj_uid = tmp_el.data('tabledata').subject_uid;
					
					memo_input_el.val(localLoadMemo(stored_uid, sbj_uid));
	
					setTimeout(function () { flag_tap = true; }, 500);
					memo_wrap_el.show();
					
					currentMemoId = sbj_uid;
					sns_transinfo_el = tmp_el;
					memo_showing_flag = true;
				}
			}
		});
	
		$('#move_sns').click(function() {
			if(flag_tap) {
				if(memo_showing_flag) localSaveMemo(stored_uid, currentMemoId, memo_input_el.val());
				localStorage.setItem('sns_tmp_suid', sns_transinfo_el.data('tabledata').subject_uid);
				localStorage.setItem('sns_tmp_sbj', sns_transinfo_el.data('tabledata').subject);
				localStorage.setItem('sns_tmp_tcr', sns_transinfo_el.data('tabledata').teacher);
				location.href = 'sns.html';
			}
		});
		
		$('tr.new_sns').live('tap', function() {
			showTooltip('최근 글을 한번 더 탭하시면 해당 페이지로 이동합니다.');
			$('tr.new_sns').removeClass('new_sns_selected');
			$(this).addClass('new_sns_selected');
		});
		
		$('tr.new_sns_selected').live('tap', function() {
			var el = $(this);
			//developing ...
			localStorage.setItem('sns_tmp_suid', el.data('commentdata').subject_uid);
			localStorage.setItem('sns_tmp_sbj', el.data('commentdata').subject);
			localStorage.setItem('sns_tmp_tcr', el.data('commentdata').teacher);
			location.href = 'sns.html';
		});
		
		$('#btn_logout').click(function() {
			navigator.notification.confirm('로그아웃 하시겠습니까?', function(res) {
				if(res === 1) {
					location.href = 'index.html';
					localStorage.removeItem('uqid');
					localStorage.removeItem('aval');
				}
			}, 'LimeTable', '확인,취소');
		});
	});
	
	document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	








	var myScroll;
	var loader_wrap_el;
	var selected_colorid = 0;

	(function($){
		jQuery.fn.equals = function(selector) {
			return $(this).get(0)==$(selector).get(0);
		};
	})(jQuery);	//find equal objects

	//android backbutton
	function onDeviceReady() {
		document.addEventListener('backbutton', function() {location.href = 'main.html';}, false);
	}
	document.addEventListener('deviceready', onDeviceReady, false);

	function localSaveMemo(uid, suid, text) {
		text == '' ? localStorage.removeItem(uid+'-'+suid) : localStorage.setItem(uid+'-'+suid, text);
	}

	function localLoadMemo(uid, suid) {
		return localStorage.getItem(uid+'-'+suid) != null ? localStorage.getItem(uid+'-'+suid) : '';
	}


	$(document).ajaxStart(function() {
		loader_wrap_el.show();
	}).ajaxStop(function() {
		loader_wrap_el.hide();
	});

	$(document).ready(function() {
		var timetable_wrap_el = $('#timetable_wrap');
		var stored_uid = localStorage.getItem('uqid');
		var tooltip_el = $('#tooltip');
		loader_wrap_el = $('#loader');
		
		myScroll = new iScroll('tablecontent', {
			hScroll:false,
			vScrollbar:true
		});

		function showTooltip(message ,delay) {
			if(localStorage.getItem('set_help') != 'false') {
				delay = delay || 5000;	//default: 5000ms
				if(tooltip_el.html() != message) {
					tooltip_el.html(message).stop(true, true).fadeIn(delay * 0.2).delay(delay * 0.5).fadeOut(delay * 0.3);
				}
			}
		}

		function hasSameTableData(object, compareObject) {
			if(object.data('tabledata').subject == compareObject.data('tabledata').subject &&
				object.data('tabledata').teacher == compareObject.data('tabledata').teacher &&
				object.data('tabledata').place == compareObject.data('tabledata').place) return true;
			return false;
		}

		function hasSameTableValue(val_subject, val_teacher, val_place, compareObject) {
			if(isDataValid(compareObject, 'tabledata') &&
				val_subject == compareObject.data('tabledata').subject &&
				val_teacher == compareObject.data('tabledata').teacher &&
				val_place == compareObject.data('tabledata').place) return true;
			return false;
		}

		function findDuplicatedTableData(val_subject, val_teacher, val_place) {
			var result = false;
			$('#timetable td.cell_subject').each(function(i) {
				if(!isCellSelected($(this)) && hasSameTableValue(val_subject, val_teacher, val_place, $(this))) result = true;
			});
			return result;
		}

		showTooltip('빈 시간표를 탭하거나 수정하려면 과목을 탭하세요.');

		function loadTable() {
			$.ajax({
				type:'post',
				dataType:'json',
				url:ajax_url+'check_table.php',
				data:{
					uid:stored_uid
				},
				success:function(data) {
					var data_length = data.length;
					var max_time = data[0].max_time;
					
					//save offline data
					localStorage.setItem('tdata-'+stored_uid, JSON.stringify(data));

					//create empty table
					var table_frame_data = "<table id='timetable'><tr class='cell_header'><td class='cell_num cell_header'>교시</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td></tr>";
					for(var i=1; i<=max_time; i++) {
						table_frame_data += "<tr>";
						for(var j=0; j<7; j++) {
							if(j == 0) table_frame_data += "<td class='cell_num'>"+i+"</td>";
 							else table_frame_data += "<td class='cell_subject' id='"+j+"_"+i+"'></td>";
						}
						table_frame_data += "</tr>";
					}
					table_frame_data += "</table>";
					timetable_wrap_el.html(table_frame_data);

					for(var k=1; k<data_length; k++) {
						var cell_id = $("#"+data[k].day+"_"+data[k].time);
						
						cell_id.html("<p class='cell_data'>"+cutStrLeft(data[k].sbj, 0, 10)+"</p><p class='cell_subdata'>"+cutStrLeft(data[k].place, 0, 10)+"</p>");
						cell_id.addClass('color_'+data[k].cid);
						cell_id.data("tabledata", {subject_uid: data[k].suid, subject: data[k].sbj, teacher: data[k].tcr, place: data[k].place, colorid: data[k].cid});
					}
					for(var i=1; i<=max_time; i++) {
						for(var j=0; j<7; j++) {
							$("#"+j+"_"+i).data("timedata", {day: j, time: i});
						}
					}
					myScroll.refresh();
				}
			});
		}
		loadTable();
		checkNewFriend(false);

		function isCellSelected(element) {
			return element.hasClass('color_selected') ? true : false;
		}

		function clearInputValues() {
			$('#subject').val('');
			$('#teacher').val('');
			$('#place').val('');
		}

		$('#timetable td.cell_subject').live('tap', function(event, ui) {
			var cell_id = $(this);
			if(cell_id.text() == '') {
				showTooltip('과목 정보를 입력하려면 상단의 편집창 열기 버튼을 탭하세요.');
				cell_id.hasClass('color_selected') ? cell_id.removeClass('color_selected') : cell_id.addClass('color_selected');
			}
		});

		$('#timetable td.cell_subject').live('tap', function(event, ui) {
			var selected_el = $(this);

			if(isDataValid(selected_el, 'tabledata')) {
				if(!isCellSelected(selected_el)) {
					showTooltip('삭제하거나 빈 시간표를 선택해 복사할 수 있습니다.');

					$('#subject').val(selected_el.data('tabledata').subject);
					$('#teacher').val(selected_el.data('tabledata').teacher);
					$('#place').val(selected_el.data('tabledata').place);
					selected_colorid = selected_el.data('tabledata').colorid;
					$('div.box_color').removeClass('box_color_selected');
					$('#cellcolor_'+selected_el.data('tabledata').colorid).addClass('box_color_selected');

					$('img.delete_icon').remove();

					//select all
					$('#timetable td.cell_subject').each(function(i) {
						var id = $(this);

						if(isDataValid(selected_el, 'tabledata') && isDataValid(id, 'tabledata')) {
							if(hasSameTableData(selected_el, id)) {
								id.removeClass().addClass('cell_subject color_selected');
								id.prepend('<div class="delete_icon_wrap"><img id="delete-'+this.id+'" class="delete_icon" src="image/icon/btn_delete.png" /></div>');
							} else {
								id.removeClass().addClass('cell_subject');
							}
						}
					});
				}
			}
		});

		$('img.delete_icon').live('tap', function(event, ui) {
			var cell_id = this.id.substr(7);
			var cell_el = $('#'+cell_id);

			showTooltip('삭제버튼을 탭하여 해당 과목을 전체 삭제 할 수 있습니다.');

			$.ajax({
				type:'post',
				url:ajax_url+'delete_table.php',
				data:{
					uid:stored_uid,
					subject_uid:cell_el.data('tabledata').subject_uid,
					day:cell_el.data('timedata').day,
					time:cell_el.data('timedata').time
				},
				success:function() {
					if(!findEqualObject(cell_el)) {
						localSaveMemo(stored_uid, cell_el.data('tabledata').subject_uid, '');
					}
					cell_el.removeData();
					$('#timetable').remove();
					loadTable();
					clearInputValues();
				}
			});
		});

		function findEqualObject(object) {
			var result = false;

			$('#timetable td.cell_subject').each(function(i) {
				var searched_el = $(this);
				var data_el = searched_el[0];

				if(isDataValid(searched_el, 'tabledata') && isDataValid(object, 'tabledata') && !searched_el.equals(object)) {
					if(hasSameTableData(searched_el, object)) result = true;
				}
			});
			return result;
		}

		$('#cancel').click(function() {
			$('#timetable td.cell_subject').each(function(i) {
				var cached_el = $(this);
				if(cached_el.data('tabledata')) cached_el.removeClass('color_selected').addClass('color_'+cached_el.data('tabledata').colorid);
				else cached_el.removeClass('color_selected');//.addClass('cell_subject color_0');
			});
			$('div.box_color').removeClass('box_color_selected');
			$('img.delete_icon').remove();
			clearInputValues();
			$('#wrap_input_sbjinfo').slideUp('fast');
		});

		$('#delete_all').click(function() {
			$('#timetable td.cell_subject').each(function(i) {
				var selected_id = $(this);

				if(isCellSelected(selected_id) && isDataValid(selected_id, 'tabledata')) {
					navigator.notification.confirm('해당 과목을 모두 삭제하시겠습니까?', function(res) {
					    if(res === 1) {
							$.ajax({
								type:'post',
								url:ajax_url+'delete_all.php',
								data: {
									uid: stored_uid,
									suid: selected_id.data('tabledata').subject_uid
								},
								success: function() {
									clearInputValues();
									loadTable();
									$('#wrap_input_sbjinfo').slideUp('fast');
									localSaveMemo(stored_uid, selected_id.data('tabledata').subject_uid, '');
								}
							});
						}
					}, 'LimeTable', '삭제,취소');
					return false;
				}
			});
		});

		$('#drop_table').click(function() {
			navigator.notification.confirm('모든 시간표 및 데이터가 삭제됩니다.\n진행하시겠습니까?', function(res) {
				if(res === 1) {
					$.ajax({
						type:'post',
						url:ajax_url+'drop_table.php',
						data: {
							uid: stored_uid
						},
						success: function() {
							clearInputValues();
							$('#wrap_input_sbjinfo').slideUp('fast');
							$('#timetable td.cell_subject').each(function(i) {
								if(isDataValid($(this), 'tabledata')) {
									localSaveMemo(stored_uid, $(this).data('tabledata').subject_uid, '');
								}
							});
							/*
							for(var i=0; i<localStorage.length; i++) {
								var lsKey = localStorage.key(i).split('-');
								if(lsKey[0] == stored_uid) {
									if(lsKey[1] != 'newrq') localStorage.removeItem(lsKey[0]);
								}
							}
							*/
							loadTable();
							navigator.notification.alert('전체 과목이 삭제되었습니다.', null, 'LimeTable', '확인');
						}
					});
				}
			}, 'LimeTable', '삭제,취소');
		});

		$('#submit_table').click(function() {
			var subject_el_val = $('#subject').val();
			var teacher_el_val = $('#teacher').val();
			var place_el_val = $('#place').val();
			var modify_array = new Array();
			var modify_array_idx = 0;
			var add_array = new Array();
			var add_array_idx = 0;

			clearInputValues();
			if(!findDuplicatedTableData(subject_el_val, teacher_el_val, place_el_val)) {
				$('#timetable td.cell_subject').each(function(i) {
					var selected_id = $(this);

					if(subject_el_val != '') {
						if(isCellSelected(selected_id)) {
							if(selected_id.text() == '') {
								var tmp = new Object();
								tmp['day'] = selected_id.data('timedata').day;
								tmp['time'] = selected_id.data('timedata').time;
								add_array[add_array_idx] = tmp;
								add_array_idx++;
							} else {
								var tmp = new Object();
								tmp['day'] = selected_id.data('timedata').day;
								tmp['time'] = selected_id.data('timedata').time;
								modify_array[modify_array_idx] = tmp;
								modify_array_idx++;
							}
						}
					} else {
						navigator.notification.alert('과목은 필수 입력 항목입니다.', null, 'LimeTable', '확인');
						return false;
					}
				});

				var addJsonObject = {data:add_array};
				var modifyJsonObject = {data:modify_array};

				$.ajax({
					type:'post',
					url:ajax_url+'save_table.php',
					data:{
						uid: stored_uid,
						subject: trim(subject_el_val),
						teacher: trim(teacher_el_val),
						place: trim(place_el_val),
						color: selected_colorid,
						addData: addJsonObject,
						modifyData: modifyJsonObject
					},
					success:function() {
						$('#timetable').remove();
						loadTable();
						$('#wrap_input_sbjinfo').slideUp('fast');
						$('div.box_color').removeClass('box_color_selected');
					}
				});
			} else {
				navigator.notification.alert('이미 동일한 시간표가 추가되어 있습니다.\n과목 복사 기능을 이용하여 빈 곳을 탭한 후 적용버튼을 눌러 추가하세요.', null, 'LimeTable', '확인');
			}
		});

		$('#btn_popup_toggle').on('tap', function() {
			$('#wrap_input_sbjinfo').slideToggle('fast', function() {
				showTooltip('과목정보를 적용하거나 선택을 해제할 수 있습니다.');
			});
		});

		$('div.box_color').on('tap', function() {
			$('div.box_color').removeClass('box_color_selected');
			$(this).addClass('box_color_selected');

			var tmp = this.id.split('_');
			selected_colorid = tmp[1];
		});
	});

	document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
	

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Base64 class: Base 64 encoding / decoding (c) Chris Veness 2002-2012                          */
/*    note: depends on Utf8 class                                                                 */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
var Base64 = {};  // Base64 namespace
Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
/**
 * Encode string into Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, no newlines are added.
 *
 * @param {String} str The string to be encoded as base-64
 * @param {Boolean} [utf8encode=false] Flag to indicate whether str is Unicode string to be encoded 
 *   to UTF8 before conversion to base64; otherwise string is assumed to be 8-bit characters
 * @returns {String} Base64-encoded string
 */ 
Base64.encode = function(str, utf8encode) {  // http://tools.ietf.org/html/rfc4648
  utf8encode =  (typeof utf8encode == 'undefined') ? false : utf8encode;
  var o1, o2, o3, bits, h1, h2, h3, h4, e=[], pad = '', c, plain, coded;
  var b64 = Base64.code;
   
  plain = utf8encode ? str.encodeUTF8() : str;
  
  c = plain.length % 3;  // pad string to length of multiple of 3
  if (c > 0) { while (c++ < 3) { pad += '='; plain += '\0'; } }
  // note: doing padding here saves us doing special-case packing for trailing 1 or 2 chars
   
  for (c=0; c<plain.length; c+=3) {  // pack three octets into four hexets
    o1 = plain.charCodeAt(c);
    o2 = plain.charCodeAt(c+1);
    o3 = plain.charCodeAt(c+2);
      
    bits = o1<<16 | o2<<8 | o3;
      
    h1 = bits>>18 & 0x3f;
    h2 = bits>>12 & 0x3f;
    h3 = bits>>6 & 0x3f;
    h4 = bits & 0x3f;
    // use hextets to index into code string
    e[c/3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  }
  coded = e.join('');  // join() is far faster than repeated string concatenation in IE
  
  // replace 'A's from padded nulls with '='s
  coded = coded.slice(0, coded.length-pad.length) + pad;
   
  return coded;
}
/**
 * Decode string from Base64, as defined by RFC 4648 [http://tools.ietf.org/html/rfc4648]
 * (instance method extending String object). As per RFC 4648, newlines are not catered for.
 *
 * @param {String} str The string to be decoded from base-64
 * @param {Boolean} [utf8decode=false] Flag to indicate whether str is Unicode string to be decoded 
 *   from UTF8 after conversion from base64
 * @returns {String} decoded string
 */ 
Base64.decode = function(str, utf8decode) {
  utf8decode =  (typeof utf8decode == 'undefined') ? false : utf8decode;
  var o1, o2, o3, h1, h2, h3, h4, bits, d=[], plain, coded;
  var b64 = Base64.code;
  coded = utf8decode ? str.decodeUTF8() : str;
  
  
  for (var c=0; c<coded.length; c+=4) {  // unpack four hexets into three octets
    h1 = b64.indexOf(coded.charAt(c));
    h2 = b64.indexOf(coded.charAt(c+1));
    h3 = b64.indexOf(coded.charAt(c+2));
    h4 = b64.indexOf(coded.charAt(c+3));
      
    bits = h1<<18 | h2<<12 | h3<<6 | h4;
      
    o1 = bits>>>16 & 0xff;
    o2 = bits>>>8 & 0xff;
    o3 = bits & 0xff;
    
    d[c/4] = String.fromCharCode(o1, o2, o3);
    // check for padding
    if (h4 == 0x40) d[c/4] = String.fromCharCode(o1, o2);
    if (h3 == 0x40) d[c/4] = String.fromCharCode(o1);
  }
  plain = d.join('');  // join() is far faster than repeated string concatenation in IE
   
  return utf8decode ? plain.decodeUTF8() : plain; 
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  AES Counter-mode implementation in JavaScript (c) Chris Veness 2005-2012                      */
/*   - see http://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
Aes.Ctr = {};  // Aes.Ctr namespace: a subclass or extension of Aes
/** 
 * Encrypt a text using AES encryption in Counter mode of operation
 *
 * Unicode multi-byte character safe
 *
 * @param {String} plaintext Source text to be encrypted
 * @param {String} password  The password to use to generate a key
 * @param {Number} nBits     Number of bits to be used in the key (128, 192, or 256)
 * @returns {string}         Encrypted text
 */
Aes.Ctr.encrypt = function(plaintext, password, nBits) {
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys
  plaintext = Utf8.encode(plaintext);
  password = Utf8.encode(password);
  //var t = new Date();  // timer
 
  // use AES itself to encrypt password to get cipher key (using plain password as source for key 
  // expansion) - gives us well encrypted key (though hashed key might be preferred for prod'n use)
  var nBytes = nBits/8;  // no bytes in key (16/24/32)
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) {  // use 1st 16/24/32 chars of password for key
    pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
  }
  var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));  // gives us 16-byte key
  key = key.concat(key.slice(0, nBytes-16));  // expand key to 16/24/32 bytes long
  // initialise 1st 8 bytes of counter block with nonce (NIST SP800-38A ��B.2): [0-1] = millisec, 
  // [2-3] = random, [4-7] = seconds, together giving full sub-millisec uniqueness up to Feb 2106
  var counterBlock = new Array(blockSize);
  
  var nonce = (new Date()).getTime();  // timestamp: milliseconds since 1-Jan-1970
  var nonceMs = nonce%1000;
  var nonceSec = Math.floor(nonce/1000);
  var nonceRnd = Math.floor(Math.random()*0xffff);
  
  for (var i=0; i<2; i++) counterBlock[i]   = (nonceMs  >>> i*8) & 0xff;
  for (var i=0; i<2; i++) counterBlock[i+2] = (nonceRnd >>> i*8) & 0xff;
  for (var i=0; i<4; i++) counterBlock[i+4] = (nonceSec >>> i*8) & 0xff;
  
  // and convert it to a string to go on the front of the ciphertext
  var ctrTxt = '';
  for (var i=0; i<8; i++) ctrTxt += String.fromCharCode(counterBlock[i]);
  // generate key schedule - an expansion of the key into distinct Key Rounds for each round
  var keySchedule = Aes.keyExpansion(key);
  
  var blockCount = Math.ceil(plaintext.length/blockSize);
  var ciphertxt = new Array(blockCount);  // ciphertext as array of strings
  
  for (var b=0; b<blockCount; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    // done in two stages for 32-bit ops: using two words allows us to go past 2^32 blocks (68GB)
    for (var c=0; c<4; c++) counterBlock[15-c] = (b >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = (b/0x100000000 >>> c*8)
    var cipherCntr = Aes.cipher(counterBlock, keySchedule);  // -- encrypt counter block --
    
    // block size is reduced on final block
    var blockLength = b<blockCount-1 ? blockSize : (plaintext.length-1)%blockSize+1;
    var cipherChar = new Array(blockLength);
    
    for (var i=0; i<blockLength; i++) {  // -- xor plaintext with ciphered counter char-by-char --
      cipherChar[i] = cipherCntr[i] ^ plaintext.charCodeAt(b*blockSize+i);
      cipherChar[i] = String.fromCharCode(cipherChar[i]);
    }
    ciphertxt[b] = cipherChar.join(''); 
  }
  // Array.join is more efficient than repeated string concatenation in IE
  var ciphertext = ctrTxt + ciphertxt.join('');
  ciphertext = Base64.encode(ciphertext);  // encode in base64
  
  //alert((new Date()) - t);
  return ciphertext;
}
/** 
 * Decrypt a text encrypted by AES in counter mode of operation
 *
 * @param {String} ciphertext Source text to be encrypted
 * @param {String} password   The password to use to generate a key
 * @param {Number} nBits      Number of bits to be used in the key (128, 192, or 256)
 * @returns {String}          Decrypted text
 */
Aes.Ctr.decrypt = function(ciphertext, password, nBits) {
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys
  ciphertext = Base64.decode(ciphertext);
  password = Utf8.encode(password);
  //var t = new Date();  // timer
  
  // use AES to encrypt password (mirroring encrypt routine)
  var nBytes = nBits/8;  // no bytes in key
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) {
    pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
  }
  var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));
  key = key.concat(key.slice(0, nBytes-16));  // expand key to 16/24/32 bytes long
  // recover nonce from 1st 8 bytes of ciphertext
  var counterBlock = new Array(8);
  ctrTxt = ciphertext.slice(0, 8);
  for (var i=0; i<8; i++) counterBlock[i] = ctrTxt.charCodeAt(i);
  
  // generate key schedule
  var keySchedule = Aes.keyExpansion(key);
  // separate ciphertext into blocks (skipping past initial 8 bytes)
  var nBlocks = Math.ceil((ciphertext.length-8) / blockSize);
  var ct = new Array(nBlocks);
  for (var b=0; b<nBlocks; b++) ct[b] = ciphertext.slice(8+b*blockSize, 8+b*blockSize+blockSize);
  ciphertext = ct;  // ciphertext is now array of block-length strings
  // plaintext will get generated block-by-block into array of block-length strings
  var plaintxt = new Array(ciphertext.length);
  for (var b=0; b<nBlocks; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    for (var c=0; c<4; c++) counterBlock[15-c] = ((b) >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = (((b+1)/0x100000000-1) >>> c*8) & 0xff;
    var cipherCntr = Aes.cipher(counterBlock, keySchedule);  // encrypt counter block
    var plaintxtByte = new Array(ciphertext[b].length);
    for (var i=0; i<ciphertext[b].length; i++) {
      // -- xor plaintxt with ciphered counter byte-by-byte --
      plaintxtByte[i] = cipherCntr[i] ^ ciphertext[b].charCodeAt(i);
      plaintxtByte[i] = String.fromCharCode(plaintxtByte[i]);
    }
    plaintxt[b] = plaintxtByte.join('');
  }
  // join array of blocks into single plaintext string
  var plaintext = plaintxt.join('');
  plaintext = Utf8.decode(plaintext);  // decode from UTF8 back to Unicode multi-byte chars
  
  //alert((new Date()) - t);
  return plaintext;
}

(function(g) {
    'use strict';

    function Unloadable(offset, el) {
        if (!(this instanceof Unloadable)) {
            return new Unloadable(offset, el);
        }
        this.offset = offset;
        this.el = el;
        this.originDisplay = el.style.display || '';
    }

    Unloadable.prototype = {
        offsetBottom: function(dy) {
            return this.offset.bottom + dy;
        },
        offsetTop: function(dy) {
            return this.offset.top + dy;
        },
        inside: function() {
            this.el.style.display = this.originDisplay;
        },
        outside: function() {
            this.el.style.display = 'none';
        },
        absolutePosition: function(top) {
            this.originPosition = this.el.style.position || '';
            this.originTop = this.el.style.top || '0px';

            this.el.style.position = 'absolute';
            this.el.style.top = (top || this.offset.top) + 'px';
        },
        revertPosition: function() {
            this.el.style.position = this.originPosition;
            this.el.style.top = this.originTop;
			this.el.style.display = this.originDisplay;
        }
    };

    function offset(el, base) {
        var top = el.offsetTop,
            bottom = top + el.offsetHeight;

        while (el = el.offsetParent) {
            if (el === base) {
                break;
            }

            top += el.offsetTop;
            bottom += el.offsetTop;
        }

        return { top: top, bottom: bottom };
    }

    var ratio = 0.7;

    function Unloader(wrapper, selector) {
        if (!(this instanceof Unloader)) {
            return new Unloader(wrapper, selector);
        }

        var height = wrapper.clientHeight;

        this.scroller = wrapper.firstElementChild;
        this.borderTop = -(ratio * height);
        this.borderBottom = height + (ratio * height);
        this.unloadables = [].slice.call(wrapper.querySelectorAll(selector)).map(function(el) {
            return new Unloadable(offset(el, wrapper), el);
        });
    }
	
    function setup(x, y) {
        var ceil = -1,
            floor = this.unloadables.length,
            borderTop = this.borderTop,
            borderBottom = this.borderBottom,
            CEILING = 0,
            FLOOR = 1,
            state = CEILING,
            scroller = this.scroller;

        this.unloadables.forEach(function(u, i, arr) {
            if (state === CEILING) {
                if (u.offsetBottom(y) < borderTop) {
                    ceil = i;
                    u.outside();
                } else {
                    state = FLOOR;
                    u.inside();
                }
            } else if (state === FLOOR) {
                if (u.offsetTop(y) > borderBottom) {
                    u.outside();
                    floor = Math.min(floor, i);
                } else {
                    u.inside();
                }
            }
            u.absolutePosition();

            if (arr.length - 1 === i) {
                scroller.style.height = u.offset.bottom + 'px';
            }
        });
        this.bx = x;
        this.by = y;
        this.ceil = ceil;
        this.floor = floor;
    }

    function reset() {
        this.unloadables.forEach(function(u) {
            u.revertPosition();
        });
    }

	function resetMap(wrapper, selector) {
        this.unloadables = [].slice.call(wrapper.querySelectorAll(selector)).map(function(el) {
            return new Unloadable(offset(el, wrapper), el);
        });
	}

    function onmove(nx, ny) {
        if (this.by === ny) {
            return;
        }

        var dir = ny < this.by ? 'downward' : 'upward';

        if (dir === 'downward') {
            for (var i = this.ceil + 1; i < this.unloadables.length; i++) {
                var u = this.unloadables[i];
                if (u.offsetBottom(ny) < this.borderTop) {
                    u.outside();
                    this.ceil = i;
                } else {
                    break;
                }
            }
            for (var i = this.floor; i < this.unloadables.length; i++) {
                var u = this.unloadables[i];
                if (u.offsetTop(ny) < this.borderBottom) {
                    u.inside();
                    this.floor++;
                } else {
                    break;
                }
            }
        } else if (dir === 'upward') {
            for (var i = this.ceil; i >= 0; i--) {
                var u = this.unloadables[i];
                if (!u || u.offsetBottom(ny) < this.borderTop) {
                    break;
                } else {
                    u.inside();
                    this.ceil--;
                }
            }
            for (var i = this.floor - 1; i >= 0; i--) {
                var u = this.unloadables[i];
                if (u.offsetTop(ny) < this.borderBottom) {
                    break;
                } else {
                    u.outside();
                    this.floor--;
                }
            }
        }
        this.bx = nx;
        this.by = ny;
    }

    Unloader.prototype = {
        setup: setup,
        reset: reset,
        onmove: onmove,
		resetMap: resetMap
    };

    g.Unloader = Unloader;

})(this);

$(document).bind("mobileinit", function () {
	$.mobile.defaultPageTransition = "none";	//페이지 전환 효과 없음
	//$.mobile.pushStateEnabled = false;		//back 버튼 문제 해결
	$.mobile.allowCrossDomainPages = true;		//cross domain
});

/* fields */
var ajax_url = 'http://softwaresquare.org/php/';
var navbar_tap_url = '';


/* ajax error setup */

$.ajaxSetup({
	timeout: 7000,
	error: function(xhr, error) {
		if(error == "timeout") {
			navigator.notification.alert('연결 시간이 초과되었습니다.\n잠시 후 다시 시도해 주세요.', null, 'LimeTable', '확인');
		} else {
			switch(xhr.status) {
			case 0:	navigator.notification.alert('네트워크에 연결할 수 없습니다.\n네트워크를 다시 확인해 주세요.', null, 'LimeTable', '확인');
					break;
			default: navigator.notification.alert('[error:'+xhr.status+'] 요청 도중 문제가 발생하였습니다.\n문제가 계속되면 개발자에게 문의해주세요.', null, 'LimeTable', '확인');
					break;
			}
		}
	}
});
/* functions */
function trim(str) { return str.replace(/^\s*|\s*$/g, ''); }	//string trim function
//get byte from string(parameter)
function getByte(str) {
	var result = 0;
	var len = str.length;
	for(var i=0; i<len; i++) {
		var ch = str.substring(i, i+1);
		var en = escape(ch);
		
		if(en.length <= 4) result++;
		else result += 2;
	}
	return result;
}
//cut string by byte
function cutStrLeft(str, left_byte, len_byte) {
	var result = '';
	var len = str.length;
	var total = 0;

	for(var i=left_byte; i<len; i++) {
		if(total >= len_byte) break;
		if(str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 126) {
			result += str.substring(i, i+1);
			total++;
		} else {
			result += str.substring(i, i+1);
			total+=2;
		}
	}
	return result;
}
//new friend request
function checkNewFriend(ajaxrequest) {
	var uid = localStorage.getItem('uqid');
	if(ajaxrequest) {
		$.ajax({
			type:'post',
			url:ajax_url+'check_new_friend.php',
			data:{
				uid:uid
			},
			success:function(data) {
				if(data > 0) {
					$('div.icon_friend').removeClass().addClass('icon_friend_new');
					showTooltip('새로운 친구 요청이 '+data+'건 있습니다. "대기중인 친구 목록"에서 확인하세요');
				} else {
					$('div.icon_friend').removeClass().addClass('icon_friend');
				}
				var tmp = localStorage.getItem('uqid')+'-newrq';
				localStorage.setItem(tmp, data);
			}
		});
	} else {
		if(localStorage.getItem(uid+'-newrq') > 0) {
			$('div.icon_friend').removeClass().addClass('icon_friend_new');
		} else {
			$('div.icon_friend').removeClass().addClass('icon_friend');
		}
	}
}
//데이터 존재여부 판별
function isDataValid(object, data) {
	return object.data(data) != null ? true : false;
}
$(document).ready(function() {
	//툴팁 감추기 이벤트
	$(document).live('touchstart', function(){$('#tooltip').hide();});
	//Navbar 중복터치방지
	$('#navbar a').click(function() {
		var obj = $(this);
		
		if(navbar_tap_url == obj.attr('href')) {
			return false;
		} else {
			navbar_tap_url = obj.attr('href');
		}
		
	});
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Utf8 class: encode / decode between multi-byte Unicode characters and UTF-8 multiple          */
/*              single-byte character encoding (c) Chris Veness 2002-2012                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
var Utf8 = {};  // Utf8 namespace
/**
 * Encode multi-byte Unicode string into utf-8 multiple single-byte characters 
 * (BMP / basic multilingual plane only)
 *
 * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
 *
 * @param {String} strUni Unicode string to be encoded as UTF-8
 * @returns {String} encoded string
 */
Utf8.encode = function(strUni) {
  // use regular expressions & String.replace callback function for better efficiency 
  // than procedural approaches
  var strUtf = strUni.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    );
  strUtf = strUtf.replace(
      /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
      function(c) { 
        var cc = c.charCodeAt(0); 
        return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
  return strUtf;
}
/**
 * Decode utf-8 encoded string back into multi-byte Unicode characters
 *
 * @param {String} strUtf UTF-8 string to be decoded back to Unicode
 * @returns {String} decoded string
 */
Utf8.decode = function(strUtf) {
  // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
  var strUni = strUtf.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f); 
        return String.fromCharCode(cc); }
    );
  strUni = strUni.replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
        return String.fromCharCode(cc); }
    );
  return strUni;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  AES implementation in JavaScript (c) Chris Veness 2005-2012                                   */
/*   - see http://csrc.nist.gov/publications/PubsFIPS.html#197                                    */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
var Aes = {};  // Aes namespace
/**
 * AES Cipher function: encrypt 'input' state with Rijndael algorithm
 *   applies Nr rounds (10/12/14) using key schedule w for 'add round key' stage
 *
 * @param {Number[]} input 16-byte (128-bit) input state array
 * @param {Number[][]} w   Key schedule as 2D byte-array (Nr+1 x Nb bytes)
 * @returns {Number[]}     Encrypted output state array
 */
Aes.cipher = function(input, w) {    // main Cipher function [§5.1]
  var Nb = 4;               // block size (in words): no of columns in state (fixed at 4 for AES)
  var Nr = w.length/Nb - 1; // no of rounds: 10/12/14 for 128/192/256-bit keys
  var state = [[],[],[],[]];  // initialise 4xNb byte-array 'state' with input [§3.4]
  for (var i=0; i<4*Nb; i++) state[i%4][Math.floor(i/4)] = input[i];
  state = Aes.addRoundKey(state, w, 0, Nb);
  for (var round=1; round<Nr; round++) {
    state = Aes.subBytes(state, Nb);
    state = Aes.shiftRows(state, Nb);
    state = Aes.mixColumns(state, Nb);
    state = Aes.addRoundKey(state, w, round, Nb);
  }
  state = Aes.subBytes(state, Nb);
  state = Aes.shiftRows(state, Nb);
  state = Aes.addRoundKey(state, w, Nr, Nb);
  var output = new Array(4*Nb);  // convert state to 1-d array before returning [§3.4]
  for (var i=0; i<4*Nb; i++) output[i] = state[i%4][Math.floor(i/4)];
  return output;
}
/**
 * Perform Key Expansion to generate a Key Schedule
 *
 * @param {Number[]} key Key as 16/24/32-byte array
 * @returns {Number[][]} Expanded key schedule as 2D byte-array (Nr+1 x Nb bytes)
 */
Aes.keyExpansion = function(key) {  // generate Key Schedule (byte-array Nr+1 x Nb) from Key [§5.2]
  var Nb = 4;            // block size (in words): no of columns in state (fixed at 4 for AES)
  var Nk = key.length/4  // key length (in words): 4/6/8 for 128/192/256-bit keys
  var Nr = Nk + 6;       // no of rounds: 10/12/14 for 128/192/256-bit keys
  var w = new Array(Nb*(Nr+1));
  var temp = new Array(4);
  for (var i=0; i<Nk; i++) {
    var r = [key[4*i], key[4*i+1], key[4*i+2], key[4*i+3]];
    w[i] = r;
  }
  for (var i=Nk; i<(Nb*(Nr+1)); i++) {
    w[i] = new Array(4);
    for (var t=0; t<4; t++) temp[t] = w[i-1][t];
    if (i % Nk == 0) {
      temp = Aes.subWord(Aes.rotWord(temp));
      for (var t=0; t<4; t++) temp[t] ^= Aes.rCon[i/Nk][t];
    } else if (Nk > 6 && i%Nk == 4) {
      temp = Aes.subWord(temp);
    }
    for (var t=0; t<4; t++) w[i][t] = w[i-Nk][t] ^ temp[t];
  }
  return w;
}
/*
 * ---- remaining routines are private, not called externally ----
 */
 
Aes.subBytes = function(s, Nb) {    // apply SBox to state S [§5.1.1]
  for (var r=0; r<4; r++) {
    for (var c=0; c<Nb; c++) s[r][c] = Aes.sBox[s[r][c]];
  }
  return s;
}
Aes.shiftRows = function(s, Nb) {    // shift row r of state S left by r bytes [§5.1.2]
  var t = new Array(4);
  for (var r=1; r<4; r++) {
    for (var c=0; c<4; c++) t[c] = s[r][(c+r)%Nb];  // shift into temp copy
    for (var c=0; c<4; c++) s[r][c] = t[c];         // and copy back
  }          // note that this will work for Nb=4,5,6, but not 7,8 (always 4 for AES):
  return s;  // see asmaes.sourceforge.net/rijndael/rijndaelImplementation.pdf
}
Aes.mixColumns = function(s, Nb) {   // combine bytes of each col of state S [§5.1.3]
  for (var c=0; c<4; c++) {
    var a = new Array(4);  // 'a' is a copy of the current column from 's'
    var b = new Array(4);  // 'b' is a•{02} in GF(2^8)
    for (var i=0; i<4; i++) {
      a[i] = s[i][c];
      b[i] = s[i][c]&0x80 ? s[i][c]<<1 ^ 0x011b : s[i][c]<<1;
    }
    // a[n] ^ b[n] is a•{03} in GF(2^8)
    s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3]; // 2*a0 + 3*a1 + a2 + a3
    s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3]; // a0 * 2*a1 + 3*a2 + a3
    s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3]; // a0 + a1 + 2*a2 + 3*a3
    s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3]; // 3*a0 + a1 + a2 + 2*a3
  }
  return s;
}
Aes.addRoundKey = function(state, w, rnd, Nb) {  // xor Round Key into state S [§5.1.4]
  for (var r=0; r<4; r++) {
    for (var c=0; c<Nb; c++) state[r][c] ^= w[rnd*4+c][r];
  }
  return state;
}
Aes.subWord = function(w) {    // apply SBox to 4-byte word w
  for (var i=0; i<4; i++) w[i] = Aes.sBox[w[i]];
  return w;
}
Aes.rotWord = function(w) {    // rotate 4-byte word w left by one byte
  var tmp = w[0];
  for (var i=0; i<3; i++) w[i] = w[i+1];
  w[3] = tmp;
  return w;
}
// sBox is pre-computed multiplicative inverse in GF(2^8) used in subBytes and keyExpansion [§5.1.1]
Aes.sBox =  [0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
             0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
             0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
             0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
             0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
             0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
             0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
             0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
             0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
             0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
             0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
             0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
             0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
             0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
             0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
             0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16];
// rCon is Round Constant used for the Key Expansion [1st col is 2^(r-1) in GF(2^8)] [§5.2]
Aes.rCon = [ [0x00, 0x00, 0x00, 0x00],
             [0x01, 0x00, 0x00, 0x00],
             [0x02, 0x00, 0x00, 0x00],
             [0x04, 0x00, 0x00, 0x00],
             [0x08, 0x00, 0x00, 0x00],
             [0x10, 0x00, 0x00, 0x00],
             [0x20, 0x00, 0x00, 0x00],
             [0x40, 0x00, 0x00, 0x00],
             [0x80, 0x00, 0x00, 0x00],
             [0x1b, 0x00, 0x00, 0x00],
             [0x36, 0x00, 0x00, 0x00] ];
