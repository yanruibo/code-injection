















/*
**  main.js             Ver.0.3         2011.6.18-2011.9.8
**
**
*/

// グローバル宣言
var pictureSource; // 写真ソース
var destinationType; // 戻り値のフォーマット
var g_imageURI;

var g_idx=0;

var g_last_idx=0;

var g_corp_id;
var g_shop_id;
var g_karte_num;
var g_stylist_id;
var g_guest_id;
var g_ba_id;
var g_fname_1;
var g_fname_2;
var g_fname_3;
var g_fname_4;
var g_work_title;
var g_setumei;
var g_style_id;
var g_sei;
var g_mei;
var g_nen_tuki_hi;

var g_sei;
var g_mei;

var g_len=0;

var g_res_w; // 個人の作品履歴

var g_check_domain="sys-assist.com";
//var g_check_domain="com-assist.info";

jQuery(function($){
  document.addEventListener("deviceready", onDeviceReady, false);
  // 処理は全てこの中に書いていきます。
//  window.location="index.html#main";

  $("#btn_dia").click(function(){
    $("#details_page").css("display","none");
    $("#login_panel").css("display","block");
  });

/*
  $("#btn_dia").click(function(){
    $("#dialog").dialog({
      bgiframe: true,
      width: 550,
      height: 400,
      modal: true,

      close: function(){
	$("#err_msg").css("display","none");
	$("#login_id2").val("");
	$("#login_pw2").val("");
	$("#stylist_info_panel").css("display","none");
	$("#login_panel").css("display","block");
      }
    }); // dialog
  }); // click
*/

  $("#btn_login").click(function(){
//alert("btn_login に入った。");
    login_id_v=$("#login_id2").val();
//alert("login_id_v="+login_id_v);
    login_pw_v=$("#login_pw2").val();
//alert("login_pw_v="+login_pw_v);
    wid_v=g_ba_id;
//    wid_v=g_res_w[g_idx]["id"];
//alert("wid_v="+wid_v);
//    wid_v=$("#wid").val();
    $.ajax({
      type: "post",
      dataType: "text",
      url: "http://sys-assist.com/ub3/ajax_get_dialog_info_1.php",
      data: {	login_id: login_id_v,
		login_pw: login_pw_v,
		wid:	  wid_v },
      error: function(XHR,status,errorThrown){
	alert("AJAX呼出しでエラーです①。\n"+XHR.responseText);
      },
      success: function(msg,textStatus){
//alert(msg);
	eval("res="+msg);

		// コメント中の <br /> を \n に置き換え
	comment_str=res.comment;
	do{
	  comment_str=comment_str.replace("<br />","\n");
	}while(comment_str.match("<br />")!=null);

	$("#comment").val(comment_str);

	if(res.sw==0){
	  $("#err_msg").css("display","block");
	}else{

	  $("#cat_1_id").html(res.cat_1h);
	  $("#cat_2_id").html(res.cat_2h);
	  $("#cat_3_id").html(res.cat_3h);
	  $("#cat_4_id").html(res.cat_4h);
	  $("#cat_5_id").html(res.cat_5h);

	  $("#menu_1_id").html(res.menu_1h);
	  $("#menu_2_id").html(res.menu_2h);
	  $("#menu_3_id").html(res.menu_3h);
	  $("#menu_4_id").html(res.menu_4h);
	  $("#menu_5_id").html(res.menu_5h);

	  if(res.reg_flag==0){
	    $("#reg_flag_msg").html('<font color="red"><b>お客様登録作品の為、「スタイリストメモ」以外は変更出来ません。</b></font>');
	  }

	  $("#wid").val(res.wid);
	  $("#reg_flag").val(res.reg_flag);
//alert("ページ変更直前");
	  $("#login_panel").css("display","none");
	  $("#stylist_info_panel").css("display","block");
	}

////	$("#dialog").dialog('close');
//	$("#dialog").html(msg);
////	$("#dialog").replaceWith(msg);
////	$("#dialog").dialog();

      }
    }); // ajax
  }); // click

  // ログイン時の「戻る」がクリックされた時
  $("#btn_modoru_1").click(function(){
    $("#details_page").css("display","block");
    $("#login_panel").css("display","none");
  });

  // [更新して戻る]がクリックされた時
  $("#submit").click(function(){
    wid_v=g_ba_id;
//    wid_v=$("#wid").val();
    cat_1_id_v=$("#cat_1_id").val();
    cat_2_id_v=$("#cat_2_id").val();
    cat_3_id_v=$("#cat_3_id").val();
    cat_4_id_v=$("#cat_4_id").val();
    cat_5_id_v=$("#cat_5_id").val();
    menu_1_id_v=$("#menu_1_id").val();
    menu_2_id_v=$("#menu_2_id").val();
    menu_3_id_v=$("#menu_3_id").val();
    menu_4_id_v=$("#menu_4_id").val();
    menu_5_id_v=$("#menu_5_id").val();
    comment_v=$("#comment").val();
    reg_flag_v=$("#reg_flag").val();
    $.ajax({
      type: "post",
      dataType: "text",
      url: "http://sys-assist.com/ub3/ajax_update_dialog_info.php",
      data: {	wid: wid_v,
		cat_1_id: cat_1_id_v,
		cat_2_id: cat_2_id_v,
		cat_3_id: cat_3_id_v,
		cat_4_id: cat_4_id_v,
		cat_5_id: cat_5_id_v,
		menu_1_id: menu_1_id_v,
		menu_2_id: menu_2_id_v,
		menu_3_id: menu_3_id_v,
		menu_4_id: menu_4_id_v,
		menu_5_id: menu_5_id_v,
		reg_flag: reg_flag_v,
		comment: comment_v },
      error: function(XHR,status,errorThrown){
	alert("AJAX呼出しでエラーです②。\n"+XHR.responseText);
      },
      success: function(msg,textStatus){
//alert("msg="+msg);
	$("#cat_1_id").val("");
	$("#cat_2_id").val("");
	$("#cat_3_id").val("");
	$("#cat_4_id").val("");
	$("#cat_5_id").val("");
	$("#menu_1_id").val("");
	$("#menu_2_id").val("");
	$("#menu_3_id").val("");
	$("#menu_4_id").val("");
	$("#menu_5_id").val("");
	$("#comment").val("");

        $("#stylist_info_panel").css("display","none");
        $("#details_page").css("display","block");
//	$("#dialog").dialog("close");
      }
    }); // ajax
  }); // click

  //「戻る」がクリックされた時
  $("#btn_modoru_2").click(function(){
    $("#stylist_info_panel").css("display","none");
    $("#details_page").css("display","block");
  });

  // 施術１のカテゴリーが変わった時
  $("#cat_1_id").change(function(){
    corp_id_v=g_corp_id;
//    corp_id_v=$("#corp_id").val();
    menu_1_id_v=$("#cat_1_id").val();
    $.ajax({
      type: "post",
      dataType: "text",
      url: "http://sys-assist.com/ub3/ajax_get_menu_2_list.php",
      data: { corp_id: corp_id_v,
	      menu_1_id: menu_1_id_v,
	      num: 1 },
      error: function(XHR,status,errorThrown){
	alert("AJAX呼出しでエラーです③\n"+XHR.responseText);
      },
      success: function(msg,textStatus){
	$("#menu_1_id").replaceWith(msg);
      }
    }); // ajax
  }); // change

  // 施術２のカテゴリーが変わった時
  $("#cat_2_id").change(function(){
    corp_id_v=g_corp_id;
//    corp_id_v=$("#corp_id").val();
    menu_1_id_v=$("#cat_2_id").val();
    $.ajax({
      type: "post",
      dataType: "text",
      url: "http://sys-assist.com/ub3/ajax_get_menu_2_list.php",
      data: { corp_id: corp_id_v,
	      menu_1_id: menu_1_id_v,
	      num: 2 },
      error: function(XHR,status,errorThrown){
	alert("AJAX呼出しでエラーです④\n"+XHR.responseText);
      },
      success: function(msg,textStatus){
	$("#menu_2_id").replaceWith(msg);
      }
    }); // ajax
  }); // change

  // 施術３のカテゴリーが変わった時
  $("#cat_3_id").change(function(){
    corp_id_v=g_corp_id;
//    corp_id_v=$("#corp_id").val();
    menu_1_id_v=$("#cat_3_id").val();
    $.ajax({
      type: "post",
      dataType: "text",
      url: "http://sys-assist.com/ub3/ajax_get_menu_2_list.php",
      data: { corp_id: corp_id_v,
	      menu_1_id: menu_1_id_v,
	      num: 3 },
      error: function(XHR,status,errorThrown){
	alert("AJAX呼出しでエラーです⑤\n"+XHR.responseText);
      },
      success: function(msg,textStatus){
	$("#menu_3_id").replaceWith(msg);
      }
    }); // ajax
  }); // change

  // 施術４のカテゴリーが変わった時
  $("#cat_4_id").change(function(){
    corp_id_v=g_corp_id;
//    corp_id_v=$("#corp_id").val();
    menu_1_id_v=$("#cat_4_id").val();
    $.ajax({
      type: "post",
      dataType: "text",
      url: "http://sys-assist.com/ub3/ajax_get_menu_2_list.php",
      data: { corp_id: corp_id_v,
	      menu_1_id: menu_1_id_v,
	      num: 4 },
      error: function(XHR,status,errorThrown){
	alert("AJAX呼出しでエラーです⑥\n"+XHR.responseText);
      },
      success: function(msg,textStatus){
	$("#menu_4_id").replaceWith(msg);
      }
    }); // ajax
  }); // change

  // 施術５のカテゴリーが変わった時
  $("#cat_5_id").change(function(){
    corp_id_v=g_corp_id;
//    corp_id_v=$("#corp_id").val();
    menu_1_id_v=$("#cat_5_id").val();
    $.ajax({
      type: "post",
      dataType: "text",
      url: "http://sys-assist.com/ub3/ajax_get_menu_2_list.php",
      data: { corp_id: corp_id_v,
	      menu_1_id: menu_1_id_v,
	      num: 5 },
      error: function(XHR,status,errorThrown){
	alert("AJAX呼出しでエラーです⑦\n"+XHR.responseText);
      },
      success: function(msg,textStatus){
	$("#menu_5_id").replaceWith(msg);
      }
    }); // ajax
  }); // change


  // ログイン画面で[ログイン]ボタンが押された時
  $("#login_btn").click(function(){
//    alert("[ログイン]がクリックされました");

    var login_id_v=$("#login_id").val();
    var login_pw_v=$("#login_pw").val();

    if(login_id_v==""){
      alert("[ログインID] を入力して下さい");
      return;
    }
    if(login_pw_v==""){
      alert("[パスワード] を入力して下さい");
      return;
    }

    // ログイン認証

    var url_v="http://sys-assist.com/ub3/ajax_pgap_check_login.php";
//    var url_v="http://sys-assist.com/hcat/ajax_fileup2_check_login.php";
/*
    var url_v="http://sys-assist.com/hcat/ajax_fileup2_check_login.php"
                + "?login_id=" + login_id_v
                + "&login_pw=" + login_pw_v
                + "&jsoncallback=?";

    $.getJSON(url,function(data){
      alert("data="+data);
    }); // getJSON
*/
//alert("login_id_v="+login_id_v);
//alert("login_pw_v="+login_pw_v);

    $.ajax({
      type: "post",
      dataType: "text",
      url: url_v,
      data: {login_id: login_id_v, login_pw: login_pw_v},
      error: function(XHR,status,errorThrown){
        alert("AJAX呼び出しでエラーです\n"+XHR.responseText);
      }, // function error
      success: function(msg,textStatus){
//alert("success に入りました");
//alert("msg="+msg);
        eval("res="+msg);
//alert("corp_id="+res.corp_id+":shop_id="+res.shop_id+":karte_num="+res.karte_num+":stylist_id="+res.stylist_id+":guest_id="+res.guest_id);

        if(res.corp_id==0){
          alert("ログイン認証に失敗しました。\n( ID 又は パスワード が違います)");
        }else{
          g_corp_id=res.corp_id;
          g_shop_id=res.shop_id;
          g_karte_num=res.karte_num;
          g_stylist_id=res.stylist_id;
          g_guest_id=res.guest_id;
          g_sei=res.sei;
          g_mei=res.mei;

          // ローカルDBに保存
          //insertFu2();

          $("#login_page").css("display","none");
          $("#details_page").css("display","block");

          // ヘッドイメージ
          $("#head_image").html('<img src="images/myhair_head_'+g_corp_id+'.jpg" alt="" width="768" height="91" />');
          // 姓名
          $("#sei_1").html(g_sei);
          $("#mei_1").html(g_mei);
          $("#sei_2").html(g_sei);
          $("#mei_2").html(g_mei);

          url_v="http://sys-assist.com/ub3/ajax_pgap_select_works.php";

          $.ajax({
            type: "post",
            dataType: "text",
            url: url_v,
            data: {corp_id: g_corp_id, shop_id: g_shop_id, karte_num: g_karte_num},
            error: function(XHR,status,errorThrown){
              alert("AJAX呼び出しでエラーです(2)\n"+XHR.responseText);
            }, // function error
            success: function(msg,textStatus){
//alert("success に入りました(2)");
//alert("msg(2)="+msg);

              eval("res_w="+msg);

              g_res_w=res_w;

              // 現在の作品データをグローバルにセット
              g_ba_id=g_res_w.w[0]["id"];
              g_fname_1=g_res_w.w[0]["fname_1"];
              g_fname_2=g_res_w.w[0]["fname_2"];
              g_fname_3=g_res_w.w[0]["fname_3"];
              g_fname_4=g_res_w.w[0]["fname_4"];
              g_work_title=g_res_w.w[0]["work_title"];

              // トップの作品データをセット
              set_top_work(0);
              // 作品履歴部のデータをセット
              set_works();

            } // function success
          }); // ajax

        }

      } // function success
    }); // ajax

  }); // click

  // ログイン画面で[クリア]ボタンが押された時
  $("#clear_btn").click(function(){
//alert("[クリア]がクリックされました");

    $("#login_id").val("");
    $("#login_pw").val("");

  }); // click

  // ログイン画面で利用案内がクリックされた時
  $("#to_riyou").click(function(){
    $("#login_page").css("display","none");
    $("#riyou_page").css("display","block");
  });  // click

  // ログイン画面でプライバシーがクリックされた時
  $("#to_privacy").click(function(){
    $("#login_page").css("display","none");
    $("#privacy_page").css("display","block");
  }); // click

  // 個人の作品履歴部分の HTML をセットする
  function set_works(){
    var res_w_len=g_res_w.w.length;
//alert("res_w_len="+res_w_len);
    var html_src="";
    for(i=0;i<res_w_len;i++){
      html_src+="<tr>";
      if(i==0){
        html_src+='<td width="210" valign="top"><img src="./images/styling.jpg" alt="スタイリング記録" width="180" height="26" /></td>';
      }else{
        html_src+='<td>&nbsp;</td>';
      }
      html_src+='<td width="504"><table width="100" border="0" cellspacing="10" cellpadding="0"><tr><td width="90" onClick="set_top_work_2('+i+')" ><img src="http://sys-assist.com/ub3/data/'+g_res_w.w[i]["fname_1"]+'_s.jpg" width="80" height="113" border="0" id="works_'+i+'" /></td><td width="91" nowrap="nowrap"><span class="date">'+g_res_w.w[i]["date"]+'</span></td><td width="308" align="left" class="honbun">担当・スタイリスト　：　'+g_res_w.w[i]["stylist_name"]+'<br />'+g_res_w.w[i]["work_title"]+'<br />'+g_res_w.w[i]["setumei"]+'</td></tr><tr><td colspan="3"><img src="images/line_s.jpg" width="499" height="5" /></td></tr></table></td></tr>';
    } // end of for

    $("#works").empty();
    $(html_src).appendTo("#works");
//    $("#works").html(html_src);

  } // end of set_works


  // トップの作品部分の画像とデータをセットする(jQuery内版)
  function set_top_work(i){

//alert("set_top_work("+i+")に入った");

    // 作品データをグローバルにセット
    g_idx=i;

    g_ba_id=g_res_w.w[i]["id"];
    g_fname_1=g_res_w.w[i]["fname_1"];
    g_fname_2=g_res_w.w[i]["fname_2"];
    g_fname_3=g_res_w.w[i]["fname_3"];
    g_fname_4=g_res_w.w[i]["fname_4"];
    g_work_title=g_res_w.w[i]["work_title"];

    // 大きい画像
    if(g_res_w.w[i]["fname_1"]==""){
      $("#tgt_p_0").attr("src","http://sys-assist.com/ub3/data/w_dummy.jpg");
    }else{
      $("#tgt_p_0").attr("src","http://sys-assist.com/ub3/data/"+g_res_w.w[i]['fname_1']+".jpg");
    }
    // 小さめな画像 4 枚
    if(g_res_w.w[i]["fname_1"]==""){
      $("#tgt_p_1").attr("src","http://sys-assist.com/ub3/data/w_dummy.jpg");
    }else{
      $("#tgt_p_1").attr("src","http://sys-assist.com/ub3/data/"+g_res_w.w[i]['fname_1']+"_m.jpg")
                   .fadeTo("normal",0.4);
    }

    if(g_res_w.w[i]["fname_2"]==""){
      $("#tgt_p_2").attr("src","http://sys-assist.com/ub3/data/w_dummy.jpg");
    }else{
      $("#tgt_p_2").attr("src","http://sys-assist.com/ub3/data/"+g_res_w.w[i]['fname_2']+"_m.jpg")
                   .fadeTo("normal",1);
    }

    if(g_res_w.w[i]["fname_3"]==""){
      $("#tgt_p_3").attr("src","http://sys-assist.com/ub3/data/w_dummy.jpg");
    }else{
      $("#tgt_p_3").attr("src","http://sys-assist.com/ub3/data/"+g_res_w.w[i]['fname_3']+"_m.jpg")
                   .fadeTo("normal",1);
    }

    if(g_res_w.w[i]["fname_4"]==""){
      $("#tgt_p_4").attr("src","http://sys-assist.com/ub3/data/w_dummy.jpg");
    }else{
      $("#tgt_p_4").attr("src","http://sys-assist.com/ub3/data/"+g_res_w.w[i]['fname_4']+"_m.jpg")
                   .fadeTo("normal",1);
    }

    // 日付・スタイリスト名・タイトル・説明
    $("#date_top").html(g_res_w.w[i]["date"]);
    $("#tgt_stylist_name").html(g_res_w.w[i]["stylist_name"]);
    $("#work_title_1").html(g_res_w.w[i]["work_title"]);
    $("#work_title_2").html(g_res_w.w[i]["work_title"]);
    $("#tgt_t").html(g_res_w.w[i]["setumei"]);

  } // end of set_top_work

  // 「logout」 がクリックされた時
  $("#logout").click(function(){
    var res=confirm("ログアウトしてよろしいですか？");
    if(!res){ return; }

    $("#details_page").css("display","none");
    $("#logout_page").css("display","block");
  }); // click

  // 「login 画面へ」がクリックされた時
  $("#to_login").click(function(){
    $("#logout_page").css("display","none");
    $("#login_id").val("");
    $("#login_pw").val("");
    $("#login_page").css("display","block");
  }); // click

  // 「ヘアカタログに登録」がクリックされた時
  $("#regist_hc").click(function(){
    // 確認
    var res=confirm("この作品を「ヘアカタログ」に公開してよろしいですか？");
    if(!res){ return; }

    // スタイル・ナンバー入力
    var cond="NG";
    var style_id;
    while(cond=="NG"){
      style_id=prompt("スタイル・ナンバーを入力して下さい。\n( 0=未選択　1=ショート　2=ミディアム　3=ロング )");
      if(style_id=="0" || style_id=="1" || style_id=="2" || style_id=="3"){
        cond="OK";
      }else{
        alert("■ＮＧ■\nスタイル・ナンバーは、0 から 3 迄の数字で入力して下さい。");
      }
    }

    // AJAX 呼び出し
    var url_v="http://sys-assist.com/ub3/ajax_hcping.php";
    $.ajax({
      type: "post",
      dataType: "text",
      url: url_v,
      data: { corp_id: g_corp_id,
              shop_id: g_shop_id,
              style_id: style_id,
              stylist_id: g_stylist_id,
              guest_id: g_guest_id,
              ba_id: g_ba_id,
              fname_1: g_fname_1,
              fname_2: g_fname_2,
              fname_3: g_fname_3,
              fname_4: g_fname_4,
              work_title_d: g_work_title
      },
      error: function(XHR,status,errorThrown){
        alert("AJAX呼び出しでエラーです(3)\n"+XHR.responseText);
      },
      success: function(msg,textStatus){
//alert(msg);
        //eval("res_reg",msg);
      }
    }); // ajax

  }); // click

  // 「カメラ・アイコン」がクリックされた時
  $("#camera_btn").click(function(){
    $("#details_page").css("display","none");
    $("#myImage").attr("src","");
    $("#camera_page").css("display","block");
  }); // click

  // 「更新」がクリックされた時
  $("#reload").click(function(){

    $("#reload").fadeOut("normal");

    url_v="http://sys-assist.com/ub3/ajax_pgap_select_works.php";

    $.ajax({
            type: "post",
            dataType: "text",
            url: url_v,
            data: {corp_id: g_corp_id, shop_id: g_shop_id, karte_num: g_karte_num},
            error: function(XHR,status,errorThrown){
              alert("AJAX呼び出しでエラーです(2)\n"+XHR.responseText);
            }, // function error
            success: function(msg,textStatus){

              $("#reload").fadeIn("normal");
//alert("success に入りました(2)");
//alert("msg(2)="+msg);

              eval("res_w="+msg);

              g_res_w=res_w;

              // 現在の作品データをグローバルにセット
              g_ba_id=g_res_w.w[0]["id"];
              g_fname_1=g_res_w.w[0]["fname_1"];
              g_fname_2=g_res_w.w[0]["fname_2"];
              g_fname_3=g_res_w.w[0]["fname_3"];
              g_fname_4=g_res_w.w[0]["fname_4"];
              g_work_title=g_res_w.w[0]["work_title"];

              // トップの作品データをセット
              set_top_work(0);
              // 作品履歴部のデータをセット
              set_works();

            } // function success
    }); // ajax

  });

  // カメラページの「戻る」がクリックされた時
  $("#camera_end").click(function(){
    $("#camera_page").css("display","none");
    $("#details_page").css("display","block");

    url_v="http://sys-assist.com/ub3/ajax_pgap_select_works.php";

    $.ajax({
            type: "post",
            dataType: "text",
            url: url_v,
            data: {corp_id: g_corp_id, shop_id: g_shop_id, karte_num: g_karte_num},
            error: function(XHR,status,errorThrown){
              alert("AJAX呼び出しでエラーです(2)\n"+XHR.responseText);
            }, // function error
            success: function(msg,textStatus){
//alert("success に入りました(2)");
//alert("msg(2)="+msg);

              eval("res_w="+msg);

              g_res_w=res_w;

              // 現在の作品データをグローバルにセット
              g_ba_id=g_res_w.w[0]["id"];
              g_fname_1=g_res_w.w[0]["fname_1"];
              g_fname_2=g_res_w.w[0]["fname_2"];
              g_fname_3=g_res_w.w[0]["fname_3"];
              g_fname_4=g_res_w.w[0]["fname_4"];
              g_work_title=g_res_w.w[0]["work_title"];

              // トップの作品データをセット
              set_top_work(0);
              // 作品履歴部のデータをセット
              set_works();

            } // function success
    }); // ajax


  }); // click


  // 小さめの4つの画像のクリックにより大きい画像を切り替える
  $("#tgt_p_1").click(function(){
    set_bigimage(g_idx,1);
  });
  $("#tgt_p_2").click(function(){
    set_bigimage(g_idx,2);
  });
  $("#tgt_p_3").click(function(){
    set_bigimage(g_idx,3);
  });
  $("#tgt_p_4").click(function(){
    set_bigimage(g_idx,4);
  });

  // 一番大きい画像の入れ替え(jQuery内版)
  function set_bigimage(i,num){
    if(num==1){
      $("#tgt_p_1").fadeTo("normal",0.4);
    }else{
      $("#tgt_p_1").fadeTo("normal",1);
    }
    if(num==2){
      $("#tgt_p_2").fadeTo("normal",0.4);
    }else{
      $("#tgt_p_2").fadeTo("normal",1);
    }
    if(num==3){
      $("#tgt_p_3").fadeTo("normal",0.4);
    }else{
      $("#tgt_p_3").fadeTo("normal",1);
    }
    if(num==4){
      $("#tgt_p_4").fadeTo("normal",0.4);
    }else{
      $("#tgt_p_4").fadeTo("normal",1);
    }

    var fn="fname_"+num;
    $("#tgt_p_0").attr("src","http://sys-assist.com/ub3/data/"+g_res_w.w[i][fn]+".jpg");

    $("#tgt_p_0").hide()
                 .fadeIn(1500);

  } // set_bigimage()

  // 「利用案内」ページ
        // デモ画面がクリックされた時
  $("#to_demo").click(function(){
    $("#riyou_page").css("display","none");
    $("#demo_page").css("display","block");
  }); // click
        // プライバシーがクリックされた時
  $("#to_privacy_r").click(function(){
    $("#riyou_page").css("display","none");
    $("#privacy_page").css("display","block");
  }); // click
        // トップページへがクリックされた時
  $("#to_login_r").click(function(){
    $("#riyou_page").css("display","none");
    $("#login_page").css("display","block");
  }); // click

  // プライバシーページ
        // トップページへがクリックされた時
  $("#to_login_p").click(function(){
    $("#privacy_page").css("display","none");
    $("#login_page").css("display","block");
  }); // click

  // デモページ
        // トップページへがクリックされた時
  $("#to_login_d").click(function(){
    $("#demo_page").css("display","none");
    $("#login_page").css("display","block");
  });

}); // jQuery


/*====================== 以上 jQuery ============================= */


// トップの作品部分の画像とデータを入れ替える(jQuery外版)
function set_top_work_2(i){

//alert("set_top_work_2("+i+")に入った");

  document.tgt_p_1.style.filter="alpha(opacity:40)";
  document.tgt_p_2.style.filter="alpha(opacity:100)";
  document.tgt_p_3.style.filter="alpha(opacity:100)";
  document.tgt_p_4.style.filter="alpha(opacity:100)";
  
  document.tgt_p_1.style.opacity=0.4;
  document.tgt_p_2.style.opacity=1;
  document.tgt_p_3.style.opacity=1;
  document.tgt_p_4.style.opacity=1;

  document.getElementById("works_"+i).style.filter="alpha(opacity:40)";
  document.getElementById("works_"+i).style.opacity=0.4;

//alert("g_last_idx="+g_last_idx);

  if(i!=g_last_idx){
    document.getElementById("works_"+g_last_idx).style.filter="alpha(opacity:100)";
    document.getElementById("works_"+g_last_idx).style.opacity=1;
  }

  // 作品データをグローバルにセット
  g_idx=i;

  g_ba_id=g_res_w.w[i]["id"];
  g_fname_1=g_res_w.w[i]["fname_1"];
  g_fname_2=g_res_w.w[i]["fname_2"];
  g_fname_3=g_res_w.w[i]["fname_3"];
  g_fname_4=g_res_w.w[i]["fname_4"];
  g_work_title=g_res_w.w[i]["work_title"];

  // 大きい画像
  var tgt_p_0=document.getElementById("tgt_p_0");
  if(g_res_w.w[i]["fname_1"]==""){
    tgt_p_0.src="http://sys-assist.com/ub3/data/w_dummy.jpg";
  }else{
    tgt_p_0.src="http://sys-assist.com/ub3/data/"+g_res_w.w[i]['fname_1']+".jpg";
  }

  // 小さめな画像 4 枚
  var tgt_p_1=document.getElementById("tgt_p_1");
  if(g_res_w.w[i]["fname_1"]==""){
    tgt_p_1.src="http://sys-assist.com/ub3/data/w_dummy.jpg";
  }else{
    tgt_p_1.src="http://sys-assist.com/ub3/data/"+g_res_w.w[i]['fname_1']+"_m.jpg";
  }

  var tgt_p_2=document.getElementById("tgt_p_2");
  if(g_res_w.w[i]["fname_2"]==""){
    tgt_p_2.src="http://sys-assist.com/ub3/data/w_dummy.jpg";
  }else{
    tgt_p_2.src="http://sys-assist.com/ub3/data/"+g_res_w.w[i]['fname_2']+"_m.jpg";
  }

  var tgt_p_3=document.getElementById("tgt_p_3");
  if(g_res_w.w[i]["fname_3"]==""){
    tgt_p_3.src="http://sys-assist.com/ub3/data/w_dummy.jpg";
  }else{
    tgt_p_3.src="http://sys-assist.com/ub3/data/"+g_res_w.w[i]['fname_3']+"_m.jpg";
  }

  var tgt_p_4=document.getElementById("tgt_p_4");
  if(g_res_w.w[i]["fname_4"]==""){
    tgt_p_4.src="http://sys-assist.com/ub3/data/w_dummy.jpg";
  }else{
    tgt_p_4.src="http://sys-assist.com/ub3/data/"+g_res_w.w[i]['fname_4']+"_m.jpg";
  }

  // 日付・スタイリスト名・タイトル・説明
  document.getElementById("date_top").innerHTML=g_res_w.w[i]["date"];
  document.getElementById("tgt_stylist_name").innerHTML=g_res_w.w[i]["stylist_name"];
  document.getElementById("work_title_1").innerHTML=g_res_w.w[i]["work_title"];
    document.getElementById("work_title_2").innerHTML=g_res_w.w[i]["work_title"];
  document.getElementById("tgt_t").innerHTML=g_res_w.w[i]["setumei"];


  g_last_idx=i;

} // end of function set_top_work_2()


// ローカル DB に新規登録エントリー
function insertFu2(){
  var db=window.openDatabase("Database","1.0","FileUp2",200000);
  db.transaction(populateDB, errorCB, successCB);
}

// テーブル作成と新規挿入
function populateDB(tx){
  tx.executeSql('DROP TABLE IF EXISTS FU2');
  tx.executeSql('CREATE TABLE IF NOT EXISTS FU2(id integer primary key,login_id,login_pw,corp_id)');
  tx.executeSql('INSERT INTO FU2(login_id,login_pw,corp_id) VALUES ("'+g_login_id+'","'+g_login_pw+'",'+g_corp_id+')');

}

// テーブル読み込みチェックエントリー
function checkFu2(){
  var db=window.openDatabase("Database","1.0","FileUp2",200000);
  db.transaction(queryDB, errorCB1, successCB1);
}

// 読み込みクエリー
function queryDB(tx){
  tx.executeSql('SELECT * FROM FU2',[], querySuccess, errorCB2);
}

// 読み込み成功時のコールバック
function querySuccess(tx,results){
  var len=results.rows.length;
//alert("len="+len);
//  for(var i=0;i<len;i++){
//    alert(results.rows.item(i).login_id + ":"
//      + results.rows.item(i).login_pw + ":"
//      + results.rows.item(i).corp_id );
//  }
  g_len=len;

  g_login_id=results.rows.item(0).login_id;
  g_login_pw=results.rows.item(0).lgoin_pw;
  g_corp_id=results.rows.item(0).corp_id;

//alert("g_len="+g_len);

}

// 書き込み成功時のコールバック
function successCB(){
//alert("新規書き込みトランザクションの実行に成功しました");

  login_page=document.getElementById("login");
  login_page.style.display="none";
  window.location="./index.html#main";

}
// 読み込み成功時のコールバック
function successCB1(){
//alert("読み込みトランザクションの実行に成功しました");

//alert("successCB1 で g_len="+g_len);

  if(g_len>0){
    window.location="./index.html#main";
  }else{
    login_page=document.getElementById("login");
    login_page.style.display="block";
  }

}

// 失敗時のコールバック
function errorCB(){
//  alert("新規登録トランザクション実行で失敗しました");
}
function errorCB1(){
//  alert("読み込みトランザクション実行で失敗しました");
}
function errorCB2(){
//  alert("読み込みSQL実行で失敗しました");
}

// PhoneGap準備完了
function onDeviceReady(){

//alert("onDeviceRead()に入りました。");

  pictureSource=navigator.camera.PictureSourceType;
  destinationType=navigator.camera.DestinationType;

  navigator.network.isReachable(g_check_domain, reachableCallback, {});

}

// ネットワークの状態をチェック

function reachableCallback(reachability) {

//alert("reachableCallback()に入りました。");

  // 現状では各プラットフォーム間でのreachabilityのフォーマットに関しての一貫性はありません
  var networkState = reachability.code || reachability;

  var states = {};
  states[NetworkStatus.NOT_REACHABLE]                      = '接続可能なネットワークが見つかりません';
  states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'キャリア・データ接続';
  states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK]         = 'WiFi接続';


//alert('接続の形式: ' + states[networkState]);
//alert("networkState="+networkState);

  // ネットワークが OK の時は先に進む
  if(networkState==NetworkStatus.NOT_REACHABLE){
    alert("ネットワークに接続されていません。");
  }else{
    // DB に照合済データがあるかチェックする
    checkFu2();
  }
}

// カメラで新規撮影する時

function capturePhoto(){

//alert("capturePhoto()に入りました。");

  navigator.camera.getPicture(
		onPhotoURISuccess,
		onFail,
		{ quality:50,
		  destinationType:Camera.DestinationType.FILE_URI
		}
  );
}

// カメラで新規撮影する時(アップロード含む)

function capturePhotoUp(){

//alert("capturePhoto()に入りました。");

  navigator.camera.getPicture(
		onPhotoURISuccessUp,
		onFail,
		{ quality:50,
		  destinationType:Camera.DestinationType.FILE_URI
		}
	);
}

// 内部画像から選んでアップ

function getPhoto(source) {

//alert("getPhoto()に入りました。");

  navigator.camera.getPicture(onPhotoURISuccessUp, onFail, { quality: 50, 
    destinationType: destinationType.FILE_URI,
    sourceType: source });
  }

// 画像の URI が取得出来た時

function onPhotoURISuccess(imageURI){

//alert("imageURI(1)="+imageURI);

  var kimage=document.getElementById("kImage");
  var image=document.getElementById("myImage");
  var message=document.getElementById("message");
  image.style.visibility="visible";
  g_imageURI=imageURI;
  image.src=imageURI;
}

// 画像の URI が取得出来た時(アップロード含む)

function onPhotoURISuccessUp(imageURI){

//alert("imageURI(2)="+imageURI);

  res=confirm("この画像を投稿してよろしいですか？");

  if(!res) return;

  var kimage=document.getElementById("kImage");
  var image=document.getElementById("myImage");
  var message=document.getElementById("message");
  message.innerHTML="只今画像をアップロード中です…";
  g_imageURI=imageURI;
  kimage.style.display="block";
  image.style.visibility="visible";

//alert("fileUp()の直前です。");

  fileUp(imageURI);
}

// 画像の URI 取得に失敗した時

function onFail(message){
//  alert("撮影時エラーが発生しました: "+message);
}

// ファイルのアップロード処理
function fileUp(imageURI) {

//alert("fileUp()が呼ばれました。");

  var options = new FileUploadOptions();
  options.fileKey="file";
  options.fileName="newfile.jpg";
  options.mimeType="image/jpeg";

//alert("upload直前です(1)。");

  // スタイルIDと日付を仮セット
  g_style_id=0;

  today=new Date();
  y=today.getFullYear();
  m=today.getMonth()+1;
  if(m<10){
    m="0"+m;
  }
  d=today.getDate();
  if(d<10){
    d="0"+d;
  }
  g_nen_tuki_hi=y + "-" + m + "-" + d;

//alert("g_nen_tuki_hi="+g_nen_tuki_hi);

  // タイトルを仮セット(初期化)
  g_work_title="";

  // アップロード時のパラメータをセット
  var params = new Object();
  params.corp_id=g_corp_id;
  params.shop_id=g_shop_id;
  params.karte_num=g_karte_num;
  params.stylist_id=g_stylist_id;
  params.guest_id=g_guest_id;
  params.ba_id=g_ba_id;
  params.fname_1=g_fname_1;
  params.fname_2=g_fname_2;
  params.fname_3=g_fname_3;
  params.fname_4=g_fname_4;
  params.work_title=g_work_title;
  params.setumei=g_setumei;
  params.style_id=g_style_id;
  params.sei=g_sei;
  params.mei=g_mei;
  params.nen_tuki_hi=g_nen_tuki_hi;
  params.android=1;  // アンドロイドフラグを立て、画像の回転を抑止

/*
  params.key1 = "val1";
  params.key2 = "val2";
*/

//alert("upload直前です(2)。");

  options.params = params;
//alert("upload直前です(3)。");
//  var paths = navigator.fileMgr.getRootPaths();
//alert("upload直前です(4)。");
  var ft = new FileTransfer();
//alert("upload直前です(5)。");
  ft.upload(imageURI, "http://sys-assist.com/ub3/spupload.php", win, fail, options);
//alert("upload直後です。");
    }

function win(evt) {
  var kimage=document.getElementById("kImage");
  var image=document.getElementById("myImage");
  var message=document.getElementById("message");
  message.innerHTML="";
  kimage.style.display="none";
  image.src=g_imageURI;
  image.style.visiblility="visible";
//  image.style.display="block";
  alert("アップロードが終了しました。");
}

function fail(evt) {
  alert("Upload でエラーが発生しました。: コード = " + error.code);
}

function clearImage(){
  var kimage=document.getElementById("kImage");
  var image=document.getElementById("myImage");
  var message=document.getElementById("message");
  kimage.style.display="none";
  image.style.visibility="hidden";
//  image.style.display="none";
  image.src="";
  message.innerHTML="";
}


//
//  goto.js	Ver.0.4		2011.5.30-2011.8.11
//


/*
function gotoLogout(){
 rs=confirm("ログアウトしてよろしいですか？");
 if(rs){
   url="./logout1.php";
   window.location=url;
 }
} // end of function

function gotoDetails(w){
 url="./details.php?w="+w;
 window.location=url;
}
*/

function gotoRiyou(){
 url="./riyou.html";
 window.location=url;
}

function gotoPrivacy(){
 url="./privacy.html";
 window.location=url;
}

/*
function gotoLogin(){
 url="./login.php";
 window.location=url;
}

function gotoDemo(){
 url="./demo.php";
 window.location=url;
}
*/


//
//  login.js		Ver.0.3		2011.4.30-2011.7.7
//
//  iPad ヘアカタログ・ログイン画面用
//


function reset(){
  with(document.form1){
    login_id.value="";
    login_pw.value="";
  } // End of with
  document.getElementById('message_s').innerHtml="&nbsp;";
}


//
// details.js  Ver.0.2    2010.4.9-2011.8.5
//

function checkRegist(corp_id,shop_id,stylist_id,guest_id,ba_id,fname_1,fname_2,fname_3,fname_4,work_title_d){
  res=confirm("この作品を「ヘアカタログ」に公開してよろしいですか？");
  if(res){
    cond="NG";
    while(cond=="NG"){
      style_id=prompt("スタイル・ナンバーを入力して下さい。\n( 0=未選択　1=ショート　2=ミディアム　3=ロング )");
      if(style_id=="0" || style_id=="1" || style_id=="2" || style_id=="3"){
        cond="OK";
      }else{
        alert("■ＮＧ■\nスタイル・ナンバーは、0 から 3 迄の数字で入力して下さい。");
      }
    }
    sendRequest(on_loaded1,
				'&corp_id='+corp_id
				+'&shop_id='+shop_id
                                +'&style_id='+Number(style_id)
				+'&stylist_id='+stylist_id
				+'&guest_id='+guest_id
				+'&ba_id='+ba_id
				+'&fname_1='+fname_1
				+'&fname_2='+fname_2
				+'&fname_3='+fname_3
				+'&fname_4='+fname_4
				+'&work_title_d='+work_title_d,
				'POST',
				'./ajax_hcping.php',
				true,
				true)

  } // end of if(res)
} // end of function

