








            app.initialize();
        

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
	  $(document).on("mobileinit", function(){
		// 戻るボタンのラベル  
		$.mobile.page.prototype.options.backBtnText = "戻る";

		// 戻るボタンを消す方法  
		$.mobile.page.prototype.options.addBackBtn = true;

		// 読み込み中のメッセージ  
		$.mobile.loadingMessage = "読み込み中...";

		// Ajaxでのページ取得に失敗した場合のメッセージ
		$.mobile.pageLoadErrorMessage = "ページの取得に失敗しました";

		// リンククリック時にAjaxする
		$.mobile.ajaxEnabled = true;

		// コントロールの装飾をしないためのセレクター
		$.mobile.page.prototype.options.keepNative = ".data-role-none";

		// デフォルトのAjaxページ遷移のトランジション
	 	$.mobile.defaultPageTransition = 'pop';

	 	$.mobile.allowCrossDomainPages = true;
	  });

      $(document).on('deviceready', this.onDeviceReady);
    },
    /******* variables ******/
    problems: { /* id:{content, handlingIds[], ix } */ },
    handling: { /* id:{content, problemid, sort, pri_s, pri_u, pri_g, deadline, check, remarks} */ },
    
    // deviceready Event Handler
    admob: function() {
		/***** AdMob *****/
		window.plugins.AdMob.createBannerView(
			{
  	    	 'publisherId': '4b5ba03d5f794f1d',
  	    	 'adSize': 'BANNER'
  	   		},
  	   		requestAdMob,
			failerAdMob
		);

		function requestAdMob(){
			console.log("requestAdMob");
			window.plugins.AdMob.requestAd(
    			{
    		   'isTesting': false
	    		},
    		successAdMob,
     		failerAdMob
			);
		}
	
		function failerAdMob(){
			console.log("failerAdMob");
		}
	
		function successAdMob(){
			console.log("successAdMob");
		}
	},
	onDeviceReady : function(){
    	var version = "0.01";
    	var ver = JSON.parse(localStorage.getItem('ver'));
    	console.log("DB ver:"+ver);
    	if(ver == null){
    		var str = JSON.stringify(version);
			localStorage.setItem('ver',str);
		}
    	//localStorage.setItem('problems',null);
    	//localStorage.setItem('handling',null);
    	app.problems = JSON.parse(localStorage.getItem('problems'));
		if(app.problems == null){
			app.problems = {};
			app.handling = {};
		}else{
			app.handling = JSON.parse(localStorage.getItem('handling'));
			if(app.handling == null){
				app.handling = {};
			}
		}
		$("#date1").datepicker({ dateFormat: "yy/mm/dd" });
		app.updateLayout();
		app.admob();
		
		//---- イベントハンドリング-----
    	/* topページが表示されるとき */
		$(document).on("pageshow", "#top",function(){
			console.log("pageshow#top");
			app.updateLayout();
		});
		
		/* ToDoリストをクリック */
		$("#todolist").on("click", ".todolist", function(){
			var ids = $(this).attr("id").split("_");
			var id = ids[1];
			console.log("click ToDO id:"+id);
			app.handling[id].check = 2;
			app.updateHandling();
			app.updateLayout();
		});
		
		/* ToDoリストをタップホールド */
		$("#todolist").on("taphold", ".todolist", function(){
    		var ids = $(this).attr("id").split("_");
			var id = ids[1];
			console.log("edit halding id:"+id);
			$("#handling-id").val(id);
			$.mobile.changePage( "#edit");
		});
		
		/* チェック済みリストをクリック */
		$("#checkedlist").on("click", ".todolist", function(){
			var ids = $(this).attr("id").split("_");
			var id = ids[1];
			console.log("click checked id:"+id);
			app.handling[id].check = 1;
			app.updateHandling();
			app.updateLayout();			
		});
		
		/* チェック済みリストをタップホールド */
		$("#checkedlist").on("taphold", ".todolist", function(){
    		var ids = $(this).attr("id").split("_");
			var id = ids[1];
			console.log("edit halding id:"+id);
			$("#handling-id").val(id);
			$.mobile.changePage( "#edit");
		});
		
		// -----問題点一覧ページ----- 
		/* 問題点一覧ページが表示されるとき */
		$(document).on("pageshow", "#list",function(){
			console.log("pageshow#list");
			$("#problemlist").empty();
			
			for ( var problemsid in app.problems ) {
				var line = '<li data-theme="b"><a href="#problem" class="problemtitle" id="p_' + problemsid + '">';
				line += app.problems[problemsid].content +'</a>';
				line += '<a href="#edit" class="addholding" id="a_' + problemsid + '">対処追加</a></li>';
				$("#problemlist").append(line);
				for (var i in app.problems[problemsid].handlingIds) {
					var id = app.problems[problemsid].handlingIds[i];
					console.log("handring ID:"+id);
					line = '<li><a href="#edit" class="handlinglist" id="h_'+ id +'"><p>' + app.handling[id].content +'</p>';
					line += '<p>重要[' + app.colorPri(app.handling[id].pri_s) + '] 緊急[';
					line += app.colorPri(app.handling[id].pri_u) + '] 拡大[' + app.colorPri(app.handling[id].pri_g) +']</p>';
					line += '<p>種別:'+app.handling[id].sort+' 期日:'+ app.handling[id].deadline + '</p>';
					if(app.handling[id].check == 2){ // checked
						line += '<span class="ui-li-count">✓</span>';
					}
					line += '</a></li>';
					$("#problemlist").append(line);
				}
			}
			$("#problemlist").listview('refresh');
		});
		
		/* 問題点一覧で、問題点をクリック */
    	$("#problemlist").on("click", ".problemtitle", function(){
    		var ids = $(this).attr("id").split("_");
			var id = ids[1];
			console.log("edit problem id:"+id);
    		$("#problem-id").val(id);
    		$("#problemcont").val(app.problems[id].content);
    	});
    	
    	/* 問題点一覧で、対処法追加をクリック */
    	$("#problemlist").on("click", ".addholding", function(){
    		var ids = $(this).attr("id").split("_");
			var id = ids[1];
			console.log("add handling id:"+id);
    		$("#prob-id").val(id);
    		
    		$("#handling-id").val("");
    	});
    	
    	/* 問題点一覧で、対処法をクリック */
    	$("#problemlist").on("click", ".handlinglist", function(){
    		var ids = $(this).attr("id").split("_");
			var id = ids[1];
			console.log("edit halding id:"+id);
			$("#handling-id").val(id);
		});
		
    	// -----問題点入力ページ----- 
		/* 問題点入力ページが表示されるとき */
		$(document).on("pageshow", "#problem",function(){
			console.log("pageshow#problem");
			if($("#problem-id").val() == ""){
				$("#delProBtn").addClass("ui-disabled");
			}else{
				$("#delProBtn").removeClass("ui-disabled");
			}
		});
		
		/* 問題点保存 */
		$("#updateProBtn").on("click",function(){
			var content = $("#problemcont").val();
			if(content == ""){
				alert("問題点が指定されていません");
				return false;
			}
			if($("#problem-id").val() == ""){
				var now = new Date();
        		var i = now.getTime();
        		app.problems[i] = { content: "", handlingIds :{}, ix:0 };
        		$("#problem-id").val(i);
        	}
        	var id = $("#problem-id").val();
			app.problems[id].content = content;
			console.log("問題:"+app.problems[id].content);
			$("#problem-id").val("");
    		$("#problemcont").val("");
			console.log("save problem id:"+id);
			app.updateProblems();
		});
		
		/* 問題点削除 */
		$("#delProBtn").on("click",function(){
			var id = $("#problem-id").val();
			$("#problem-id").val("");
    		$("#problemcont").val("");
    		
			/* この問題の対処のを削除　*/
			app.deleteHandlingByProblem(id);
			
			delete app.problems[id];
			console.log("delete problem id:"+id);
			app.updateProblems();
		});
		
		// -----対処法入力ページ-----
		/* 対処法入力ページが表示されるとき */
		$(document).on("pageshow", "#edit",function(){
			console.log("pageshow#edit");
			var id = $("#handling-id").val();
			if(id == ""){
				var now = new Date();
        		var id = now.getTime();
        		$("#handling-id").val(id);
        		$("#isnewhandling").val("Y");
        		var probid = $("#prob-id").val();
        		$("#prob-title .ui-btn-text").text(app.problems[probid].content); 
        		$("#handling1").val("");
        		$('#editform [name="handling1-sort"]').val(["PA"]);
        		$('#editform [name="handling1-s"]').val(["3"]);
        		$('#editform [name="handling1-u"]').val(["3"]);
        		$('#editform [name="handling1-g"]').val(["3"]);
        		$('#editform [name="date1"]').val("");
        		$('#editform [name="remarks"]').val("");
        		$("#delBtn").addClass("ui-disabled");
        	}else{
        		$("#isnewhandling").val("N");
        		var probid = app.handling[id].problemid;
        		$("#prob-id").val(probid);
    			$("#prob-title .ui-btn-text").text(app.problems[probid].content);
        		$("#handling1").val(app.handling[id].content);
        		$('#editform [name="handling1-sort"]').val([app.handling[id].sort]);
        		$('#editform [name="handling1-s"]').val([app.handling[id].pri_s]);
        		$('#editform [name="handling1-u"]').val([app.handling[id].pri_u]);
        		$('#editform [name="handling1-g"]').val([app.handling[id].pri_g]);
        		$('#editform [name="date1"]').val(app.handling[id].deadline);
        		$('#editform [name="remarks"]').val(app.handling[id].remarks);
        		$("#delBtn").removeClass("ui-disabled");
        	}
        	$('#editform input:radio').checkboxradio('refresh');
		});
		
		/* 対処法入力で、問題点をクリック */
    	$("#prob-title").on("click", function(){
			var id = $("#prob-id").val();
			console.log("handling edit problem id:"+id);
    		$("#problem-id").val(id);
    		$("#problemcont").val(app.problems[id].content);
    	});

    	/* 対処法保存 */
		$("#updateBtn").on("click",function(){
			var probid = $("#prob-id").val();
			var id = $("#handling-id").val();
			var content = $("#handling1").val();
			if(content == ""){
				alert("対処法が指定されていません");
				return false;
			}
			console.log("update Handling "+id);
			var deadline = $('#editform [name="date1"]').val();
			var check = (deadline == "")? 0 : 1;
				
			app.handling[id] = {
				'content': content,
				'problemid': probid,
				'sort': $('#editform [name="handling1-sort"]:checked').val(),
				'pri_s':$('#editform [name="handling1-s"]:checked').val(),
				'pri_u':$('#editform [name="handling1-u"]:checked').val(),
				'pri_g':$('#editform [name="handling1-g"]:checked').val(),
				'deadline':deadline,
				'check':check,
				'remarks':$('#editform [name="remarks"]').val()
			};
			app.updateHandling();
			
			if($("#isnewhandling").val() == "Y"){
				var ix = app.problems[probid].ix++;
				console.log("id: "+id );
				app.problems[probid].handlingIds[ix] = id;
				app.updateProblems();
			}
		});
		
		/* 対処法削除 */
		$("#delBtn").on("click",function(){
			var id = $("#handling-id").val();
			var problemsid = app.handling[id].problemid;
			delete app.handling[id];
			app.updateHandling();
			for (var i in app.problems[problemsid].handlingIds) {
				if(id == app.problems[problemsid].handlingIds[i]){
					delete app.problems[problemsid].handlingIds[i];
				}
			}
			app.updateProblems();
		});
				
    	/* debug 用 */
		function printProperties(obj) {
    		var properties = '';
    		for (var prop in obj){
    		    properties += prop + "=" + obj[prop] + "\n";
    		}
    		alert(properties);
		}

    },
    // TOPページ作成
    updateLayout: function (){
    	var num = 0;
    	var todo = [];
    	for ( var id in app.handling ) {
    		if(app.handling[id].check > 0){
    			todo[num++] = {
    				'id' : id,
    				'deadline' : app.handling[id].deadline
    			};
    		}
    	}
    	todo.sort(app.todosort);
		$("#todolist").empty();
		$("#checkedlist").empty();
		var date = new Date();
		var m = date.getMonth() + 1;
		m = (m < 10) ? "0"+ m : m;
		var d = date.getDate();
		d = (d < 10) ? "0" + d : d;
		var today = date.getFullYear() + "/" + m + "/" + d;
		console.log("Today:"+today);
		while (num--){
			id= todo[num].id;
			var line = "";
			if(app.handling[id].check == 1){ // ToDo
				line = '<li><a href="#top" class="todolist" id="t_' + id + '">';
				var deadline = app.handling[id].deadline;
				if( deadline == today){
					line += '<p><strong style="color:orange;">' + app.handling[id].deadline + '</strong></p>';
				}else if( deadline < today){
					line += '<p><strong style="color:red;">' + app.handling[id].deadline + '</strong></p>';
				}else{
					line += '<p><strong>' + app.handling[id].deadline + '</strong></p>';
				}
				line += '<h2>'+app.handling[id].content + '</h2>';
				var problemid = app.handling[id].problemid;
				line += '<p>'+ app.problems[problemid].content + '</p>';
				line += '<p>重要[' + app.colorPri(app.handling[id].pri_s) + '] 緊急[';
				line += app.colorPri(app.handling[id].pri_u) + '] 拡大[' + app.colorPri(app.handling[id].pri_g) +']';
				line += ' <strong>種別</strong>:'+app.handling[id].sort + '</p>';
				line += '</a></li>';
				$("#todolist").append(line);
			}else if(app.handling[id].check == 2){ // checked
				line = '<li><a href="#top" class="todolist" id="t_' + id + '">';
				line += '<p>' + app.handling[id].deadline + '</p>';
				line += '<h2>'+app.handling[id].content + '</h2>';
				var problemid = app.handling[id].problemid;
				line += '<p>'+ app.problems[problemid].content + '</p>';
				line += '<p>重要[' + app.colorPri(app.handling[id].pri_s) + '] 緊急[';
				line += app.colorPri(app.handling[id].pri_u) + '] 拡大[' + app.colorPri(app.handling[id].pri_g) +']';
				line += ' <strong>種別</strong>:'+app.handling[id].sort + '</p>';
				line += '</a></li>';
				$("#checkedlist").append(line);
			}
		}
		$("#todolist").listview('refresh');
		$("#checkedlist").listview('refresh');
    },
    //ToDo用handlingのsort関数
    todosort: function(a, b){
    	if(a.deadline < b.deadline){ return 1;}
    	if(a.deadline == b.deadline){ return 0;}
    	return -1;
    },
    // 優先度の色付け
    colorPri: function(pri){
    	if(pri == 3){
    		return '<span style="color:red;">高</span>';
    	}else if(pri == 2){
    		return '<span style="color:orange;">中</span>';
    	}else if(pri == 1){
    		return '<span style="color:blue;">低</span>';
    	}
    },
    // 問題点保存
    updateProblems: function() {
    	var str = JSON.stringify(app.problems);
		localStorage.setItem('problems',str);
		console.log("save problems");
    },
    // 対処保存
    updateHandling: function() {
    	var str = JSON.stringify(app.handling);
		localStorage.setItem('handling',str);
		console.log("save handlings");
    },
    // problemidの問題点の対処全削除
    deleteHandlingByProblem: function(problemid) {
        for ( var i in app.problems[problemid].handlingIds ) {
        	var id = app.problems[problemid].handlingIds[i];
        	console.log('delete handlingId:' + id);
        	delete app.handling[id];
        }
        console.log('delete handling problemId:' + problemid);
        app.updateHandling();
    }
};


/* Japanese initialisation for the jQuery UI date picker plugin. */
/* Written by Kentaro SATO (kentaro@ranvis.com). */
jQuery(function($){
	$.datepicker.regional['ja'] = {
		closeText: '閉じる',
		prevText: '&#x3C;前',
		nextText: '次&#x3E;',
		currentText: '今日',
		monthNames: ['1月','2月','3月','4月','5月','6月',
		'7月','8月','9月','10月','11月','12月'],
		monthNamesShort: ['1月','2月','3月','4月','5月','6月',
		'7月','8月','9月','10月','11月','12月'],
		dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
		dayNamesShort: ['日','月','火','水','木','金','土'],
		dayNamesMin: ['日','月','火','水','木','金','土'],
		weekHeader: '週',
		dateFormat: 'yy/mm/dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '年'};
	$.datepicker.setDefaults($.datepicker.regional['ja']);
});

