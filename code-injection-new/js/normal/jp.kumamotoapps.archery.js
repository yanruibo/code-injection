
/**
 *スコアシート一覧画面で選択した明細のスコアシート情報を読み込みスコアシート表示画面へ遷移する。
 */
function selectGame(){
	var gameid= $(this).attr("id");
	ScoreSheet_getById(gameid,moveToGamePage);
}

/**
 *スコアシート表示画面へ遷移する。
 */
function moveToGamePage(){
	$.mobile.changePage("#gamepage");
}

/**
 *スコアシート一覧画面にスコアシートの一覧を表示する。
 */
function displayGameList(){
	$("#gamelist").empty();
	CurrentGame=null;

	for(var i in GameListData){
		var lnk=$("<a></a>").text(GameListData[i].getDisplayGameDate() + " " + GameListData[i].gametitle + " " + GameListData[i].displaytext + " (" + GameListData[i].gameplace + ")").attr("href","#").attr("id",GameListData[i].gameid);
		lnk.bind('tap',selectGame);
		var itm=$("<li></li>");
		itm.append(lnk);
		$("#gamelist").append(itm);
	}
	$("#gamelist").listview('refresh');
}

/**
 *スコアシート新規登録画面の初期表示を行う。
 */
function displayNewScoreSheet(){
	today=new Date();
	$("#newgame_gamedate-year").val(today.getFullYear());
	$("#newgame_gamedate-month").val(today.getMonth()+1);
	$("#newgame_gamedate-day").val(today.getDate());

	$("#newgame_gamedate-year").selectmenu('refresh');
	$("#newgame_gamedate-month").selectmenu('refresh');
	$("#newgame_gamedate-day").selectmenu('refresh');

	var msg=new MsgRes();
	$("#newgame_gametype").empty();
	($('<option/>').val("").text("SheetType")).appendTo($("#newgame_gametype"));
	($('<option/>').val("11").text(msg.getGameTypeName("11"))).appendTo($("#newgame_gametype"));
	($('<option/>').val("12").text(msg.getGameTypeName("12"))).appendTo($("#newgame_gametype"));
	($('<option/>').val("13").text(msg.getGameTypeName("13"))).appendTo($("#newgame_gametype"));
	($('<option/>').val("14").text(msg.getGameTypeName("14"))).appendTo($("#newgame_gametype"));
	($('<option/>').val("15").text(msg.getGameTypeName("15"))).appendTo($("#newgame_gametype"));
	($('<option/>').val("21").text(msg.getGameTypeName("21"))).appendTo($("#newgame_gametype"));
	$("#newgame_gametype").selectmenu('refresh');
	
}

/**
 *スコアシート新規入力画面で入力したスコアシートを保存する。
 */
function saveNewScoreSheet(){
	var newdata=new ScoreSheet();

	newdata.createNewGameId();
	newdata.gametitle=$("#newgame_gametitle").val();
	newdata.setGameDateYmd($("#newgame_gamedate-year").val() + ("00" + $("#newgame_gamedate-month").val()).slice(-2) + $("#newgame_gamedate-day").val());
	newdata.gameplace=$("#newgame_gameplace").val();
	newdata.gametype=$("#newgame_gametype").val();
	newdata.gamememo=$("#newgame_gamememo").val();
	newdata.createDistanceList();

	console.log("NewGame.id=" + newdata.gameid);
	console.log("NewGame.title=" + newdata.gametitle);
	console.log("NewGame.distancelist=" + newdata.distancelist.length);

	ScoreSheet_save(newdata);
}

/**
 *スコアシート表示画面で表示されているスコアシートを削除する。
 */
function deleteScoreSheet(){
	if(CurrentGame==null){
		return;
	}
	ScoreSheet_remove(CurrentGame);
}

/**
 *スコアシート新規入力画面の情報を消去する。
 */
function backNewGame(){
	$("#newgame_gametitle").val("");
	$("#newgame_gameplace").val("");
	$("#newgame_gamememo").val("");
	$("#newgame_gametype").val("");
	$("#newgame_gamedate-year").val("");
	$("#newgame_gamedate-month").val("");
	$("#newgame_gamedate-day").val("");

	$("#newgame_gametype").selectmenu('refresh');
	$("#newgame_gamedate-year").selectmenu('refresh');
	$("#newgame_gamedate-month").selectmenu('refresh');
	$("#newgame_gamedate-day").selectmenu('refresh');
}

/**
 *スコアシート表示画面にスコアシートの情報を表示する。
 */
function displayGame(){
	if(CurrentGame==null){
		return;
	}
	$("#game_gametitle").text(CurrentGame.gametitle);
	$("#game_gamedate").text(CurrentGame.getDisplayGameDate());
	$("#game_gameplace").text(CurrentGame.gameplace);
	$("#game_gamememo").text(CurrentGame.gamememo);
	console.log(CurrentGame.getDisplayGameDate() + ":" + CurrentGame.gametitle);

	var gtotal=0;
	var gtotalhit=0;
	var gtotalX=0;
	var gtotal10=0;
	var lhtotal=0;
	var lhtotalhit=0;
	var lhtotalX=0;
	var lhtotal10=0;
	var shtotal=0;
	var shtotalhit=0;
	var shtotalX=0;
	var shtotal10=0;
	$("#distancelist").empty();
	for(var i in CurrentGame.distancelist){
		console.log(CurrentGame.distancelist[i].roundno + ":" + CurrentGame.distancelist[i].roundname);
		var rtotal=CurrentGame.distancelist[i].getTotal();
		var rtotalhit=CurrentGame.distancelist[i].getTotalHit();
		var rtotalX=CurrentGame.distancelist[i].getTotalX();
		var rtotal10=CurrentGame.distancelist[i].getTotal10();
		var titletext=CurrentGame.distancelist[i].roundname;
		if(rtotalhit>0){
			titletext=titletext + " Total=" + rtotal + "  (Hits=" + rtotalhit + ",10s=" + rtotal10 + ",Xs=" + rtotalX + ")";
		}
		var title=$("<h3></h3>").text(titletext);
		var tbl=createRoundTable(CurrentGame.distancelist[i]);
		var itm=$("<div></div>").attr("data-role","collapsible");
		if(CurrentRound!=null){
			if(CurrentRound.roundid==CurrentGame.distancelist[i].roundid){
				itm.attr("data-collapsed","false");
			}
		}
		itm.append(title);
		itm.append(tbl);
		$("#distancelist").append(itm);

		gtotal+=rtotal;
		gtotalhit+=rtotalhit;
		gtotalX+=rtotalX;
		gtotal10+=rtotal10;
		if(CurrentGame.distancelist[i].isLongHalf()) {
			lhtotal+=rtotal;
			lhtotalhit+=rtotalhit;
			lhtotalX+=rtotalX;
			lhtotal10+=rtotal10;
		}
		if(CurrentGame.distancelist[i].isShortHalf()) {
			shtotal+=rtotal;
			shtotalhit+=rtotalhit;
			shtotalX+=rtotalX;
			shtotal10+=rtotal10;
		}
	}
	$("#distancelist").collapsibleset( "refresh" );

	$("#gtotaltable > tbody").empty();
	var tb=$("#gtotaltable > tbody");
	var tr;
	if(CurrentGame.isFitaRound()){
		tr=$("<tr>");
		tr.append($("<td class='total' >Long Total</td>"));
		tr.append($("<td class='total' >" + lhtotal + "</td>"));
		tr.append($("<td class='total' >" + lhtotalhit + "</td>"));
		tr.append($("<td class='total' >" + lhtotal10 + "</td>"));
		tr.append($("<td class='total' >" + lhtotalX + "</td>"));
		tb.append(tr);

		tr=$("<tr>");
		tr.append($("<td class='total' >Short Total</td>"));
		tr.append($("<td class='total' >" + shtotal + "</td>"));
		tr.append($("<td class='total' >" + shtotalhit + "</td>"));
		tr.append($("<td class='total' >" + shtotal10 + "</td>"));
		tr.append($("<td class='total' >" + shtotalX + "</td>"));
		tb.append(tr);
	}
	tr=$("<tr>");
	tr.append($("<td class='total' >Grand Total</td>"));
	tr.append($("<td class='total' >" + gtotal + "</td>"));
	tr.append($("<td class='total' >" + gtotalhit + "</td>"));
	tr.append($("<td class='total' >" + gtotal10 + "</td>"));
	tr.append($("<td class='total' >" + gtotalX + "</td>"));
	tb.append(tr);
}

/**
 *スコアシートの距離別データを表示するTableタグを生成して返す。
 */
function createRoundTable(r){
	var tbl=$("<table></table>");
	var th=$("<thead></thead>");
	var tr=$("<tr>");
	tr.append($("<td class='total'>End</td>"));
	tr.append($("<td class='arrow'>1</td>"));
	tr.append($("<td class='arrow'>2</td>"));
	tr.append($("<td class='arrow'>3</td>"));
	tr.append($("<td class='total'>Total</td>"));
	tr.append($("<td class='endtotal'>End Total</td>"));
	tr.append($("<td class='roundtotal'>Round Total</td>"));
	tr.append($("<td class='editarea'> </td>"));
	th.append(tr);
	tbl.append(th);
	var tb=$("<tbody></tbody>");
	var rtotal=0;
	for(var ei in r.endlist){
		var e=r.endlist[ei];
		var silst=new Array();
		for(var si in e.scorelist){
			silst.push(si);
		}
		//１行目
		tr=$("<tr>");
		tr.append($("<td class='endno' rowspan='2'>" + e.endno + "</td>"));
		tr.append($("<td class='arrow'>" + e.scorelist[silst[0]].scoretext +"</td>"));
		tr.append($("<td class='arrow'>" + e.scorelist[silst[1]].scoretext +"</td>"));
		tr.append($("<td class='arrow'>" + e.scorelist[silst[2]].scoretext +"</td>"));
		var total3=e.scorelist[silst[0]].score+e.scorelist[silst[1]].score+e.scorelist[silst[2]].score;
		tr.append($("<td class='total'></td>").text(total3));

		tr.append($("<td class='endtotal' rowspan='2'></td>").text(e.getTotal()));
		rtotal+=e.getTotal();
		tr.append($("<td class='roundtotal' rowspan='2'></td>").text(rtotal));
		var lnk=$("<a></a>").text("Input").attr("href","#scorekeyinputpage").attr("id",r.roundid + "," + e.endno);
		lnk.attr("data-role","button").attr("data-icon","arrow-r").attr("data-iconpos","notext").attr("data-inline","true").button();
		lnk.bind('tap',moveToScoreKeyInputPage);
		tr.append($("<td class='editarea' rowspan='2'></td>").append(lnk));
		tb.append(tr);
		//２行目
		tr=$("<tr>");
		tr.append($("<td class='arrow'>" + e.scorelist[silst[3]].scoretext +"</td>"));
		tr.append($("<td class='arrow'>" + e.scorelist[silst[4]].scoretext +"</td>"));
		tr.append($("<td class='arrow'>" + e.scorelist[silst[5]].scoretext +"</td>"));
		total3=e.scorelist[silst[3]].score+e.scorelist[silst[4]].score+e.scorelist[silst[5]].score;
		tr.append($("<td class='total'></td>").text(total3));

		tb.append(tr);
	}

	tr=$("<tr>");
	tr.append($("<td rowspan='2'> </td>"));
	tr.append($("<td class='arrow'>Hits</td>"));
	tr.append($("<td class='arrow'>10s</td>"));
	tr.append($("<td class='arrow'>Xs</td>"));
	tr.append($("<td class='total'>Sight</td>"));
	tr.append($("<td class='endtotal' rowspan='2'> </td>"));
	tr.append($("<td class='roundtotal'rowspan='2'></td>").text(r.getTotal()));
	var lnk=$("<a></a>").text("Sight").attr("href","#sightinputpage").attr("id",r.roundid);
	lnk.attr("data-role","button").attr("data-icon","info").attr("data-iconpos","notext").attr("data-inline","true").button();
	lnk.bind('tap',moveToSightInputPage);
	tr.append($("<td class='editarea' rowspan='2'></td>").append(lnk));
	tb.append(tr);

	tr=$("<tr>");
	tr.append($("<td class='arrow'></td>").text(r.getTotalHit()));
	tr.append($("<td class='arrow'></td>").text(r.getTotal10()));
	tr.append($("<td class='arrow'></td>").text(r.getTotalX()));
	tr.append($("<td class='total'></td>").text(r.getSightText()));
	tb.append(tr);

	tbl.append(tb);
	return tbl;
}

/**
 *スコアシート表示画面を消去する。
 * 現在の所何も処理していない。
 */
function backGame(){

}

/**
 *競技情報編集画面にスコアシート情報を表示する。
 */
function displayGameInfo(){
	if(CurrentGame==null){
		return;
	}
	$("#gameinfo_gametitle").val(CurrentGame.gametitle);
	$("#gameinfo_gameplace").val(CurrentGame.gameplace);
	$("#gameinfo_gamememo").val(CurrentGame.gamememo);

	today=new Date();
	today.setTime(Date.parse(CurrentGame.gamedate));
	$("#gameinfo_gamedate-year").val(today.getFullYear());
	$("#gameinfo_gamedate-month").val(today.getMonth()+1);
	$("#gameinfo_gamedate-day").val(today.getDate());

	$("#gameinfo_gamedate-year").selectmenu('refresh');
	$("#gameinfo_gamedate-month").selectmenu('refresh');
	$("#gameinfo_gamedate-day").selectmenu('refresh');
}

/**
 *競技情報編集画面の内容をスコアシートへ保存する。
 */
function saveGameInfo(){
	CurrentGame.gametitle=$("#gameinfo_gametitle").val();
	CurrentGame.setGameDateYmd($("#gameinfo_gamedate-year").val() + ("00" + $("#gameinfo_gamedate-month").val()).slice(-2) + $("#gameinfo_gamedate-day").val());
	CurrentGame.gameplace=$("#gameinfo_gameplace").val();
	CurrentGame.gamememo=$("#gameinfo_gamememo").val();
	console.log("CurrentGame.title=" + CurrentGame.gametitle);
	console.log("CurrentGame.date=" + CurrentGame.setGameDateYmd);
	console.log("CurrentGame.gemeplace=" + CurrentGame.gameplace);
	console.log("CurrentGame.gamememo=" + CurrentGame.gamememo);
	ScoreSheet_update(CurrentGame);

}

/**
 *競技情報編集画面の内容を消去する。
 */
function backGameInfo(){
	$("#gameinfo_gametitle").val("");
	$("#gameinfo_gameplace").val("");
	$("#gameinfo_gamememo").val("");
	$("#gameinfo_gamedate-year").val("");
	$("#gameinfo_gamedate-month").val("");
	$("#gameinfo_gamedate-day").val("");

	$("#gameinfo_gametype").selectmenu('refresh');
	$("#gameinfo_gamedate-year").selectmenu('refresh');
	$("#gameinfo_gamedate-month").selectmenu('refresh');
	$("#gameinfo_gamedate-day").selectmenu('refresh');
}

/**
 *キー入力用のスコア入力画面へ遷移する。
 */
function moveToScoreKeyInputPage(){
	console.log("moveToScoreKeyInputPage");
	var selectkey=$(this).attr("id").split(",");
	console.log(selectkey);
	if(CurrentGame==null){
		return;
	}
	if(selectkey[0]==null){
		return;
	}
	if(selectkey[1]==null){
		return;
	}
	CurrentRound=CurrentGame.distancelist[selectkey[0]];
	CurrentEnd=CurrentRound.endlist[selectkey[1]];
}

/**
 *キー入力用スコア入力画面にスコア情報を表示する。
 */
function displayScoreKeyInputPage(){
	if(CurrentRound==null || CurrentEnd==null){
		return;
	}
	$("#scorekeyinput_roudname").text(CurrentRound.roundname);
	$("#scorekeyinput_endname").text(CurrentEnd.endno + "回目");

	var i=0;
	var input_cell=0;
	var input_cellflag=false;
	for(var si in CurrentEnd.scorelist){
		var s=CurrentEnd.scorelist[si];
		console.log("SCOREKEY=" + s.scoreid);
		arrscore[i]=s.score;
		adrscore[i]=s.scoretext;
		$("#scorekeyinput_" + (i+1)).text(s.scoretext);
		if(input_cellflag!=true && s.scoretext==""){
			input_cell=i;
			input_cellflag=true;
		}
		i++;
	}
	calcScoreTotal();
	console.log("input_cell=" + input_cell);
	input_cell--;
	if(input_cell<0){
		input_cell=5;
	}
	scc=input_cell;
	swittchColor();
}

function swittchColor(){
	switch(scc){
		case 0:
			clearCellColor();
			console.log("swich scc :"+scc);
			td.attr("class","arrow");
			td=$("#scoreinputcell_2");
			td.attr("class","current_arrow");
			break;
		case 1:
			clearCellColor();
			console.log("swich scc :"+scc);
			td=$("#scoreinputcell_3");
			td.attr("class","current_arrow");
			break;
		case 2:
			clearCellColor();
			console.log("swich scc :"+scc);
			td=$("#scoreinputcell_4");
			td.attr("class","current_arrow");
			break;
		case 3:
			clearCellColor();
			console.log("swich scc :"+scc);
			td=$("#scoreinputcell_5");
			td.attr("class","current_arrow");
			break;
		case 4:
			clearCellColor();
			console.log("swich scc :"+scc);
			td=$("#scoreinputcell_6");
			td.attr("class","current_arrow");
			break;
		case 5:
			clearCellColor();
			console.log("swich scc :"+scc);
			td=$("#scoreinputcell_1");
			td.attr("class","current_arrow");
			break;
	}
	scc++;
	if(scc>5){
		scc=0;
	}
}

function switchDelete(){
	console.log("SC"+scc);
	console.log("スイッチデリート")
	switch(scc){
		case 0:
			clearCellColor();
			$("#scorekeyinput_1").text(" ");
			td=$("#scoreinputcell_1");
    		td.attr("class","current_arrow");
			break;
		case 1:
			clearCellColor();
			$("#scorekeyinput_2").text(" ");
			td=$("#scoreinputcell_2");
    		td.attr("class","current_arrow");
			break;
		case 2:
			clearCellColor();
			$("#scorekeyinput_3").text(" ");
			td=$("#scoreinputcell_3");
    		td.attr("class","current_arrow");
			break;
		case 3:
			clearCellColor();
			$("#scorekeyinput_4").text(" ");
			td=$("#scoreinputcell_4");
    		td.attr("class","current_arrow");
			break;
		case 4:
			clearCellColor();
			$("#scorekeyinput_5").text(" ");
			td=$("#scoreinputcell_5");
    		td.attr("class","current_arrow");
			break;
		case 5:
			clearCellColor();
			$("#scorekeyinput_6").text(" ");
			td=$("#scoreinputcell_6");
			td.attr("class","current_arrow");
			break;
	}
}

function inputScore(inscore){
	console.log("inputScore SCC"+scc);
	var t3_1=0;
	var t3_2=0;
	var t6=0;
	var vinscore=inscore;//数値のみを扱う
	var rinscore=inscore;//XやMをそのまま格納する。
	//CurrentEnd.scorelist[];
	var score=new Score();
	if(vinscore=="X"||vinscore=="M"){
		console.log("inputScore M or X:  " + inscore);
		if(vinscore=="X"){
			vinscore="10";
		}else{
			vinscore="0";
		}
	}
	$("#scorekeyinput_" + (scc+1)).text(rinscore);

	if(scc<3){
		arrscore[scc]=Number(vinscore);
		adrscore[scc]=rinscore;
		console.log("Number  :"+vinscore);
		console.log("Arrscore  :"+arrscore[scc]);
		console.log("CurrentEnd.scorelist[scc]"+CurrentEnd.scorelist[scc]);
		for(var i=0;i<3;i++){
			t3_1+=arrscore[i];
		}
		console.log("AddInputScore  :"+t3_1);
		$("#scorekeyinput_total3_1").text(t3_1);
	}else{
		arrscore[scc]=Number(vinscore);
		adrscore[scc]=rinscore;
		for(var i=3;i<6;i++){
			t3_2+=arrscore[i];
		}
		$("#scorekeyinput_total3_2").text(t3_2);
	}
	for(var i=0;i<6;i++){
		t6+=arrscore[i];
	}
	$("#scorekeyinput_total6").text(t6);
}

/*
 *素点の合計点を計算する。
 */
function calcScoreTotal(){
	var t1=arrscore[0]+arrscore[1]+arrscore[2];
	var t2=arrscore[3]+arrscore[4]+arrscore[5];
	var t=t1+t2;
	$("#scorekeyinput_total3_1").text(t1);
	$("#scorekeyinput_total3_2").text(t2);
	$("#scorekeyinput_total6").text(t);
}

/**
 *ボタン入力された得点情報をデータに反映する。
 */
function tapTextScoreButton(inscore){
	inputScore(inscore);
	swittchColor();
}

/**
 *画面上の得点情報をすべて消去するボタンの処理を行う。
 */
function tapAllClearScoreButton(){
	console.log("Clear:All");
	var i=0;
	for(var si in CurrentEnd.scorelist){
		var s=CurrentEnd.scorelist[si];
		arrscore[i]=s.score;
		adrscore[i]=s.scoretext;
		$("#scorekeyinput_" + (i+1)).text(s.scoretext);
		i++;
	}
	calcScoreTotal();
	scc=5;
	swittchColor();
}

/**
 *カレント得点入力エリアの内容を消去するボタンの処理を行う。
 */
function tapClearScoreButton(){
	//var sw = new switchDelete();
	console.log("Clear:"+scc);
	var i=0;
	for(var si in CurrentEnd.scorelist){
		var s=CurrentEnd.scorelist[si];
		if(scc==i){
			arrscore[i]=s.score;
			adrscore[i]=s.scoretext;
			$("#scorekeyinput_" + (i+1)).text(s.scoretext);
		}
		i++;
	}
	calcScoreTotal();
}

/**
 * スコア入力画面のすべての入力セルの色を元に戻す
 */
function clearCellColor(){
	for(x=1;x<=6;x++){
		td=$("#scoreinputcell_"+x);
    	td.attr("class","arrowcell");
	}
}

/**
 *キー入力用スコア入力画面で画面上で入力された内容を保存する。
 */
function tapSaveScoreButton(){
	console.log("Save Score");
	if(CurrentRound==null || CurrentEnd==null){
		console.log("Non");
		return;
	}
	var i=0;
	for(var si in CurrentEnd.scorelist){
		var score=CurrentEnd.scorelist[si];
		score.score=Number(arrscore[i]);
		score.scoretext=adrscore[i];
		if(adrscore[i]!="M" && adrscore[i]!=""){
			score.flag_hit=1;
		} else {
			score.flag_hit=0;
		}
		if(adrscore[i]=="X"){
			score.flag_x=1;
		} else {
			score.flag_x=0;
		}
		if(adrscore[i]=="X" || adrscore[i]=="10"){
			score.flag_10=1;
		} else {
			score.flag_10=0;
		}
		score.pos_x=0;
		score.pos_y=0;
		
		i++;
	}
	CurrentEnd.calcTotal();
	End_save(CurrentEnd);
	Round_save(CurrentRound);
	$.mobile.changePage("#gamepage");
}

/**
 *サイト入力画面へ画面を遷移する。
 */
function moveToSightInputPage(){
	var rndid=$(this).attr("id");
	if(CurrentGame==null){
		return;
	}
	if(rndid==null){
		return;
	}
	CurrentRound=CurrentGame.distancelist[rndid];
}

/**
 *サイト入力画面にサイト情報を表示する。
 */
function displayInputSightPage(){
	if(CurrentRound==null){
		return;
	}
	console.log("roundname:" + CurrentRound.roundname);
	console.log("sight:" + CurrentRound.sight);
	$("#sightinput_roudname").text(CurrentRound.roundname);

	if(CurrentRound.sight!=""){
		$("#sightinput_text").val(CurrentRound.sight);
	} else {
		$("#sightinput_text").val("");
	}
}


/**
 *画面上に入力されたサイト情報を保存するボタンの処理を行う。
 */
function tapSaveSightButton(){
	if(CurrentRound==null){
		return;
	}
	var sight_val=$("#sightinput_text").val();
	if(CurrentRound.sight!=sight_val){
		CurrentRound.sight=Number(sight_val);
		Round_saveSight(CurrentRound);

		$.mobile.changePage("#gamepage");
	}
}

/*------------------------------------------------------------------------------*/

/**
 * デバイスの初期化イベントで初期化メソッドを登録する
 */
if(typeof device === 'undefined'){
    document.addEventListener("deviceready", onDeviceReady, false);
}else{
    onDeviceReady();
}

/**
 * デバイスの初期化メソッド
 */
function onDeviceReady() {
	console.log("device.ready");

	var gbl = navigator.globalization;
	console.log('globalization: ' + gbl);
	if(gbl!=null){
		gbl.getPreferredLanguage(
			function (language) {
				LanguageName=language.value;
				//iOSではjaが返ってくるので変更
				if(LanguageName=="ja"){
					LanguageName="日本語"
				}
				console.log('language: ' + LanguageName);
			},
			function () {console.log('Error getting language');}
		);
		navigator.globalization.getLocaleName(
				function (locale) {console.log('localeName: ' + locale.value);},
				function () {console.log('Error getting locale');}
		);	
	}
	//初期画面から競技一覧画面へ遷移
	openArcheryDb();
	$.mobile.changePage("#gamelistpage");
}

/**
 * このアプリケーション全体の初期化イベント時の処理
 */
$(document).live( 'pagecreate',function(event){
	console.log("document.pagecreate");
	$.mobile.defaultDialogTransition="none";
	$.mobile.defaultPageTransition="none";
});

/**
 * スコアシート一覧画面の初期化イベント時の処理
 */
$( '#gamelistpage' ).live( 'pageinit',function(event){
	console.log("gamelistpage.pageinit");
	
	CurrentGame=null;
});

/**
 * スコアシート一覧画面の表示イベント時の処理
 */
$("#gamelistpage").live("pageshow",function(){
	console.log("gamelistpage.pageshow");
	ScoreSheet_getList(displayGameList);

	if(LanguageName=="日本語"){$("#helppage_button").attr("href","#helppage_ja");}
	else {$("#helppage_button").attr("href","#helppage_en");}
});

/**
 * 新規スコアシート入力画面の初期化イベント時の処理
 */
$("#newgamepage").live("pageinit",function(){
	console.log("newgamepage.pageinit");
	
	$("#newgame_gametype").change(function () {
		console.log("gamelistpage.gametype.change");
    	var typename = $(this).find(':selected').text();
    	$("#newgame_gametitle").val(typename);
	});
	$("#newgamesave").click(function() {
    	console.log("saveNewScoreSheet");
    	//$.mobile.changePage("#gamesave");
    	saveNewScoreSheet();
    	$.mobile.changePage("#gamelistpage");
	});
});

/**
 * 新規スコアシート入力画面の表示イベント時の処理
 */
$("#newgamepage").live("pageshow",function(){
	console.log("newgamepage.pageshow");
	displayNewScoreSheet();
});

/**
 * 新規スコアシート入力画面の非表示イベント時の処理
 */
$("#newgamepage").live("pagehide",function(){
	console.log("newgamepage.pagehide");
	backNewGame();
});

/**
 * スコアシート表示画面の表示イベント時の処理
 */
$("#gamepage").live("pageshow",function(){
	console.log("gamepage.pageshow");
	displayGame();
});

/**
 * スコアシート表示画面の非表示イベント時の処理
 */
$("#gamepage").live("pagehide",function(){
	console.log("gamepage.pagehide");
	backGame();
});

/**
 * 競技情報編集画面の初期化イベント時の処理
 */
$("#gameinfoeditpage").live("pageinit",function(){
	console.log("gameinfoeditpage.pageinit");
	$("#gameinfosave").click(function() {
    	console.log("saveScoreSheetInfo");
    	saveGameInfo();
		$.mobile.changePage("#gamepage");
	});
});

/**
 * 競技情報編集画面の表示イベント時の処理
 */
$("#gameinfoeditpage").live("pageshow",function(){
	console.log("gameinfoeditpage.pageshow");
	displayGameInfo();
});

/**
 * 競技情報編集画面の非表示イベント時の処理
 */
$("#gameinfoeditpage").live("pagehide",function(){
	console.log("gameinfoeditpage.pagehide");
	backGameInfo();
});

/**
 * スコア入力画面の表示イベント時の処理
 */
$("#scorekeyinputpage").live("pageshow",function(){
	console.log("scorekeyinputpage.pageshow");
	displayScoreKeyInputPage();
});

/**
 * スコア入力画面の初期化イベント時の処理
 */
$("#scorekeyinputpage").live("pageinit",function(){
	$("#scoreinputcell_1").bind("tap", function(){
		clearCellColor();
		console.log("タップされました");
		td=$("#scoreinputcell_1");
		td.attr("class","current_arrowcell");
		scc=0;
	});
	$("#scoreinputcell_2").bind("tap", function(){
		clearCellColor();
		console.log("タップされました");
		td=$("#scoreinputcell_2");
		td.attr("class","current_arrowcell");
		scc=1;
	});
	$("#scoreinputcell_3").bind("tap", function(){
		clearCellColor();
		console.log("タップされました");
		td=$("#scoreinputcell_3");
		td.attr("class","current_arrowcell");
		scc=2;
	});
	$("#scoreinputcell_4").bind("tap", function(){
		clearCellColor();
		console.log("タップされました");
		td=$("#scoreinputcell_4");
		td.attr("class","current_arrowcell");
		scc=3;
	});
	$("#scoreinputcell_5").bind("tap", function(){
		clearCellColor();
		console.log("タップされました");
		td=$("#scoreinputcell_5");
		td.attr("class","current_arrowcell");
		scc=4;
	});
	$("#scoreinputcell_6").bind("tap", function(){
		clearCellColor();
		console.log("タップされました");
		td=$("#scoreinputcell_6");
		td.attr("class","current_arrowcell");
		scc=5;
	});
});

/**
 * サイト入力画面の表示イベント時の処理
 */
$("#sightinputpage").live("pageshow",function(){
	console.log("sightinputpage.pageshow");
	displayInputSightPage();
});

/**
 * 競技削除ダイアログの初期化イベント時の処理
 */
$("#gamedeletedialog").live("pageinit",function(){
	console.log("gamedeletedialog.pageinit");
	$("#gamedeletedialog_ok").click(function() {
    	console.log("deleteScoreSheet");
    	deleteScoreSheet();
    	$.mobile.changePage("#gamelistpage");
	});
	var msg=new MsgRes();
	$("#gamedeletedialog_msg").text(msg.getGameInfoDeletingMessage());
	$("#gamedeletedialog_ok").text(msg.getDialogYes());
	$("#gamedeletedialog_ng").text(msg.getDialogNo());
});

$(document).on("vclick", ".pad", function(e) {
	console.log(e.target);
	var pad = $(e.target);
	var s = pad.val();
	console.log(s);
	tapTextScoreButton(s);
});

$(document).on("vclick", ".scorekeyinput", function(e) {
	console.log(e.target);
	var placeNumber = $(e.target).data("place");
});






    function tapTextScoreButton(score){
    	var td=$("#scoreinputcell_1");
    	td.attr("class","arrow");

    	td=$("#scoreinputcell_2");
    	td.attr("class","current_arrow");

    	alert(score);
    }
    function tapClearScoreButton(){
    	alert("Clear");
    }
    function tapAllClearScoreButton(){
    	alert("AllClear");
    }
    function tapSaveScoreButton(){
    	alert("Save Score");
    }
    function tapSaveSightButton(){
    	alert("Save Sight");
    }

  

var GameListData=new Array();	//競技一覧表示用のスコアシートリストただし、表示用データのみセットしている。
var CurrentGame=null;			//現在編集中のスコアシートオブジェクトを格納する。
var CurrentRound=null;			//現在編集中のラウンドオブジェクトを格納する。CurrentGameに所属していること。
var CurrentEnd=null;			//現在編集中のエンドオブジェクトを格納する。CurrentEndに所属していること。
var scc=0;						//スコアシート入力画面で現在入力中のスコアインデックス
var arrscore=[6];				//スコアシート入力画面で入力中のデータを格納する配列(文字列表現)
var adrscore=[6];				//スコアシート入力画面で入力中のデータを格納する配列(数値表現)
var LanguageName="";			//このアプリケーションの言語名

/**
 *  スコアシートエンティティクラス
 */
function ScoreSheet() {
	this.gameid="";		//スコアシートのキー情報
	this.gametitle="";	//スコアシートのタイトル
	this.gamedate="";	//競技日
	this.gametype="";	//スコアシートの競技種別
	this.gameplace="";	//競技を行った場所
	this.gamememo="";	//備考
	this.displaytext="";	//一覧の表示文字列
	this.distancelist=new Array();	//このスコアシートの距離別エンティティを格納したリスト

	/**
	 * このスコアシートオブジェクトのキー情報をF生成しセットする。
	 */
	this.createNewGameId=function(){
		var nowdate=new Date();
		this.gameid=nowdate.getTime();
	}

	/**
	 * このスコアシートオブジェクトの競技種別からラウンドデータを生成してセットする。
	 */
	this.createDistanceList=function(){
		var rnd;
		switch (this.gametype){
		  case "11":	//FITAラウンド男子
			rnd=new Round(1,"1","90m");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
			rnd=new Round(2,"2","70m");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
			rnd=new Round(3,"4","50m");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
			rnd=new Round(4,"5","30m");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
		    break;
		  case "12":	//FITAラウンド女子
			rnd=new Round(1,"2","70m");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
			rnd=new Round(2,"3","60m");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
			rnd=new Round(3,"4","50m");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
			rnd=new Round(4,"5","30m");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
		    break;
		  case "13":	//70mダブルラウンド
			rnd=new Round(1,"2","70m-1");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
			rnd=new Round(2,"2","70m-2");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
		    break;
		  case "14":	//50m30mラウンド
			rnd=new Round(1,"4","50m");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
			rnd=new Round(2,"5","30m");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
		    break;
		  case "15":	//30mダブルラウンド
			rnd=new Round(1,"5","30m-1");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
			rnd=new Round(2,"5","30m-2");
			rnd.createEndList(6);
		    this.distancelist.push(rnd);
		    break;
		  case "21":	//18mダブルラウンド
			rnd=new Round(1,"6","18m-1");
			rnd.createEndList(5);
		    this.distancelist.push(rnd);
			rnd=new Round(2,"6","18m-2");
			rnd.createEndList(5);
		    this.distancelist.push(rnd);
		    break;
		  default :
		    break;
		}
		//キー情報＆オブジェクトリレーションセット
		for(var ri in this.distancelist){
			var r=this.distancelist[ri];
			//console.log("round:" + r.roundname);
			r.scoresheet=this;
			r.setKey();
			for(var ei in r.endlist){
				var e=r.endlist[ei];
				//console.log("end:" + e.endno);
				e.round=r;
				for(var si in e.scorelist){
					var s=e.scorelist[si];
					//console.log("score:" + s.arrowno);
					s.end=e;
					s.setKey();
				}
			}
		}
	}

	/**
	 * このラウンドがFITAラウンドかどうか判定する
	 */
	this.isFitaRound=function(){
		if(this.gametype=="11" || this.gametype=="12"){
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 競技日をYYYYMMDDに変換して返す
	 */
	this.getGameDateYmd=function(){
		var year = this.gamedate.getFullYear();
		var month = this.gamedate.getMonth() + 1;
		var day = this.gamedate.getDate();

		if ( month < 10 ) {
			month = '0' + month;
		}
		if ( day < 10 ) {
			day = '0' + day;
		}
		return (year + month + day);
	}

	/**
	 * 競技日をYYYY/MM/DDに変換して返す
	 */
	this.getDisplayGameDate=function(){
		var year = this.gamedate.getFullYear();
		var month = this.gamedate.getMonth() + 1;
		var day = this.gamedate.getDate();

		if ( month < 10 ) {
			month = '0' + month;
		}
		if ( day < 10 ) {
			day = '0' + day;
		}
		return year + "/" + month + "/" + day;
	}

	/**
	 * YYYYMMDDの文字列を使用して競技日をセットする
	 */
	this.setGameDateYmd=function(ymd){
		var year = ymd.substr(0,4);
		var month = ymd.substr(4,2);
		var day = ymd.substr(6,2);
		this.gamedate=new Date(year + "/" + month + "/" + day);
	}

}

/**
 * ラウンドエンティティクラス
 * オブジェクト生成時の引数としてスコアシート内のインデックス、距離種別、距離名をセットする
 */
function Round(no,code,name){
	this.roundid="";			//距離別エンティティのキー情報
	this.roundno=no;			//スコアシート内のインデックス情報
	this.roundname=name;		//距離名
	this.roundtype=code;		//距離の種別
	this.sight="";				//サイトの値
	this.scoresheet=null;		//このラウンドオブジェクトが所属するスコアシートオブジェクト
	this.endlist=new Array();	//このラウンドオブジェクトの保持するエンドエンティティのリスト

	/**
	 * 指定されたエンド回数をもとにエンドデータを生成してセットする
	 */
	this.createEndList=function(endcnt){
		for(var i=0;i<endcnt;i++){
			var end=new End(i+1);
			end.createScoreList();
			this.endlist.push(end);
		}
	}

	/**
	 * スコアシートオブジェクトのキー情報をもとにこのオブジェクトのキー情報を生成してセットする
	 */
	this.setKey=function(){
		this.roundid=this.scoresheet.gameid + ":" + this.roundno;
	}

	/**
	 * このラウンドがロングハーフの加算対象かどうか判定する
	 */
	this.isLongHalf=function(){
		if(this.roundtype=="1" || this.roundtype=="2" || this.roundtype=="3"){
			return true;
		} else {
			return false;
		}
	}

	/**
	 * このラウンドがショートハーフの加算対象かどうか判定する
	 */
	this.isShortHalf=function(){
		if(this.roundtype=="4" || this.roundtype=="5"){
			return true;
		} else {
			return false;
		}		
	}
	
	/**
	 * このラウンドの合計得点を計算して返す
	 */
	this.getTotal=function(){
		var t=0;
		for(var ei in this.endlist) {
			t+=this.endlist[ei].getTotal();
		}
		return t;
	}

	/**
	 * このラウンドの合計ヒット数を計算して返す
	 */
	this.getTotalHit=function(){
		var t=0;
		for(var ei in this.endlist) {
			t+=this.endlist[ei].getTotalHit();
		}
		return t;
	}

	/**
	 * このラウンドの合計X数を計算して返す
	 */
	this.getTotalX=function(){
		var t=0;
		for(var ei in this.endlist) {
			t+=this.endlist[ei].getTotalX();
		}
		return t;
	}

	/**
	 * このラウンドの合計10金数を計算して返す
	 */
	this.getTotal10=function(){
		var t=0;
		for(var ei in this.endlist) {
			t+=this.endlist[ei].getTotal10();
		}
		return t;
	}
	
	/**
	 * サイトの文字列表現を返す
	 */
	this.getSightText=function(){
		if(isNaN(this.sight)){
			return "";
		}
		if(this.sight == parseInt(this.sight)){
			return parseInt(this.sight) + ".0";
		} else {
			return this.sight + "";
		}
	}
	
}
/**
 * エンドエンティティクラス
 * オブジェクト生成時の引数としてエンド番号を指定する
 */
function End(en){
	this.endno=en;				//ラウンド内のインデックス番号
	this.round=null;			//このエンドデータが所属するラウンドオブジェクト
	this.scorelist=new Array();	//このエンドのスコアエンティティを格納したリスト

	this._total=0;
	this._totalhit=0;
	this._totalx=0;
	this._total10=0;

	/**
	 * このエンドのトータル数を計算する
	 */
	this.calcTotal=function(){
		this._total=0;
		this._totalhit=0;
		this._totalx=0;
		this._total10=0;

		for (var si in this.scorelist){
			this._total += this.scorelist[si].score;
			if(this.scorelist[si].flag_hit==1){
				this._totalhit++;
			}
			if(this.scorelist[si].flag_x==1){
				this._totalx++;
			}
			if(this.scorelist[si].flag_10==1){
				this._total10++;
			}
		}
	}

	/**
	 * このエンドのスコアオブジェクトを生成してセットする
	 */
	this.createScoreList=function(){
		for(var i=0;i<6;i++){
			this.scorelist.push(new Score(i+1));
		}
	}

	/**
	 * このエンドの合計得点を計算して返す
	 */
	this.getTotal=function(){
		return this._total;
	}

	/**
	 * このエンドの合計ヒット数を計算して返す
	 */
	this.getTotalHit=function(){
		return this._totalhit;
	}

	/**
	 * このエンドの合計X数を計算して返す
	 */
	this.getTotalX=function(){
		return this._totalx;
	}

	/**
	 * このエンドの合計10金数を計算して返す
	 */
	this.getTotal10=function(){
		return this._total10;
	}
}

/**
 * スコアエンティティクラス
 * オブジェクト生成時の引数としてエンド内のインデックス番号を取得する
 */
function Score(arn){
	this.scoreid="";	//このスコアエンティティのキー情報
	this.arrowno=arn;	//エンド内のインデックス
	this.score=0;		//得点
	this.scoretext="";	//得点の文字列表記
	this.flag_hit=0;	//ヒット数のカウント対象であれば1をセット
	this.flag_x=0;		//X数のカウント対象であれば1をセット
	this.flag_10=0;		//10金数のカウント対象であれば1をセット
	this.pos_x=0;		//このスコアの的面上のX座標
	this.pos_y=0;		//このスコアの的面上のY座標
	this.end=null;		//このスコアが所属するエンドオブジェクト

	/**
	 * このエンティティのキー情報を生成してセットする
	 * キー情報は親オブジェクトとなるラウンド、エンドオブジェクトより生成する
	 */
	this.setKey=function(){
		this.scoreid=this.end.round.roundid + ":" + this.end.endno + ":" + this.arrowno;
	}
}

/**
 * メッセージ情報を保持するエンティティ
 */
function MsgRes(){
	
	this.getGameInfoDeletingMessage=function(){
		var msg="";
		if(LanguageName=="日本語"){msg="このスコアシートをスコアノートから削除しますか？";}
			else {msg="Are you sure you want to delete from the score note the score sheet?";}
		return msg;
	}
	
	this.getDialogYes=function(){
		var msg="";
		if(LanguageName=="日本語"){msg="はい";}
			else {msg="Yes";}
		return msg;
	}

	this.getDialogNo=function(){
		var msg="";
		if(LanguageName=="日本語"){msg="いいえ";}
			else {msg="No";}
		return msg;
	}

	this.getGameTypeName=function(gmtp){
		var msg="";
		if(LanguageName=="日本語"){
			if(gmtp=="11"){msg="FITAラウンド男子";}
			else if(gmtp=="12"){msg="FITAラウンド女子";}
			else if(gmtp=="13"){msg="70mダブル";}
			else if(gmtp=="14"){msg="50,30mラウンド";}
			else if(gmtp=="15"){msg="30mダブル";}
			else if(gmtp=="21"){msg="18mダブル";}
			else {msg="";}
		} else {
			if(gmtp=="11"){msg="FITA Round Male";}
			else if(gmtp=="12"){msg="FITA Round Female";}
			else if(gmtp=="13"){msg="70m Double";}
			else if(gmtp=="14"){msg="50,30m Round";}
			else if(gmtp=="15"){msg="30m Double";}
			else if(gmtp=="21"){msg="18m Double";}
			else {msg="";}
		}
		return msg;
	}

}


var DbObj=null;		//使用するデーターベースオブジェクト
var DbVersion=-1;	//データベースのバージョン番号

/**
 *  データベースを開く
 */
function openArcheryDb() {
	console.log("ArcheryDB.openDatabase");
	DbObj=window.openDatabase("ArcheryDB", "1.0", "ArcheryDB", 1000000);
	DbObj.transaction(function(tx){
		console.log("ArcheryDB.checkDBVersion");
		tx.executeSql('SELECT VERSIONNO FROM DBVERSION', []
		, function (tx, results){
			if(results.rows.length > 0){
				var row=results.rows.item(0);
				DbVersion=row.VERSIONNO;
				console.log("getDBVersionr=" + DbVersion);
			} else {
				initializeArcheryDb();
			}
		},function (tx,err){
			console.log("Version Check SQL Error=" + err.message);
			initializeArcheryDb();
		});
	},function(err){
		console.log("ArcheryDB.checkDBVersionError=" + err.message);
	},migrateArcheryDb);
}

/**
 *  データベース初期化
 */
function initializeArcheryDb(){
	console.log("ArcheryDB.initializeDatabase");
	DbObj.transaction(function(tx){
		tx.executeSql('CREATE TABLE DBVERSION (VERSIONNO INTEGER NOT NULL PRIMARY KEY)');
		tx.executeSql('INSERT INTO DBVERSION (VERSIONNO) VALUES (0)');
	},function(tx,err){
		console.log("SQL Error=" + err.message);
	});
	DbVersion=0;
};

/**
 *  データベース構造のアップデート
 */
function migrateArcheryDb(){
	console.log("ArcheryDB.migrateDatabase");
	console.log("DBVersionr=" + DbVersion);
	if(DbVersion < 0){
		return;
	}
	if(DbVersion < 1 ) {
		DbObj.transaction(function(tx){
			console.log("DBVersion=1 Start Create");
			var sql;
			//スコアシートテーブル作成
			sql="CREATE TABLE IF NOT EXISTS SCORESHEET ("
				+"SHEETKEY TEXT NOT NULL PRIMARY KEY,"
				+"SCOREDATE TEXT,"
				+"SHEETTYPE TEXT,"
				+"TITLE TEXT,"
				+"PLACE TEXT,"
				+"MEMO TEXT"
				+")";
			console.log(sql);
			tx.executeSql(sql);

			//ラウンドテーブル作成
			sql="CREATE TABLE IF NOT EXISTS ROUND ("
				+"ROUNDKEY TEXT NOT NULL PRIMARY KEY,"
				+"SHEETKEY TEXT,"
				+"ROUNDNO INTEGER,"
				+"ROUNDTYPE TEXT,"
				+"ROUNDNAME TEXT,"
				+"ROUNDTOTAL INTEGER,"
				+"ROUNDTOTAL_HIT INTEGER,"
				+"ROUNDTOTAL_X INTEGER,"
				+"ROUNDTOTAL_10 INTEGER,"
				+"SIGHT TEXT"
				+")";
			console.log(sql);
			tx.executeSql(sql);
			
			//スコアテーブル作成
			sql="CREATE TABLE IF NOT EXISTS SCORE ("
				+"SCOREKEY TEXT NOT NULL PRIMARY KEY,"
				+"ROUNDKEY TEXT,"
				+"ENDNO INTEGER,"
				+"ARROWNO INTEGER,"
				+"SCORETEXT TEXT,"
				+"SCORE INTEGER,"
				+"FLAG_HIT INTEGER,"
				+"FLAG_X INTEGER,"
				+"FLAG_10 INTEGER,"
				+"POS_X INTEGER,"
				+"POS_Y INTEGER"
				+")";
			console.log(sql);
			tx.executeSql(sql);

			//データベースバージョンを1にセット
			tx.executeSql('UPDATE DBVERSION SET VERSIONNO=1');

			console.log("DBVersion=1 End Create");
		},function(err){
			console.log("Transaction Error=" + err.message);
		});
	}

	if(DbVersion < 2){
		console.log("DBVersion=2 Start Create");
		DbObj.transaction(function(tx){

		});
		console.log("DBVersion=2 End Create");
	}
};

/**
 * スコアシートの一覧をデータベースから読み込む。
 * 読み込む対象は高速化のためスコアシートデータのみ。
 * 読み込まれたスコアシートのリストはGameListDataに格納される。
 * 読み込んだ後の処理は引数として与える。
 * @param loadedfunc データ取得後の処理
 */
function ScoreSheet_getList(loadedfunc){
	console.log("Start ScoreSheet_getList");
	var lst=new Array();
	DbObj.transaction(function(tx){
		var sql='SELECT SHT.SHEETKEY,SHT.SCOREDATE,SHT.SHEETTYPE,SHT.TITLE,SHT.PLACE,SHT.MEMO,SUM(RND.ROUNDTOTAL) AS TOTALSCORE'
			  + ' FROM SCORESHEET AS SHT INNER JOIN ROUND AS RND ON SHT.SHEETKEY = RND.SHEETKEY' 
			  + ' GROUP BY SHT.SHEETKEY,SHT.SCOREDATE,SHT.SHEETTYPE,SHT.TITLE,SHT.PLACE,SHT.MEMO'
			  + ' ORDER BY SHT.SCOREDATE DESC,SHT.SHEETKEY DESC';
		tx.executeSql(sql,[]
		, function (tx, results){
			for (var i=0;i<results.rows.length;i++){
				console.log("ScoreSheet Select SQL:" + i);
				var sht=createScoreSheet(results.rows.item(i));
				lst[sht.gameid]=sht;
			}
			GameListData=lst;
		},function (tx,err){
			console.log("ScoreSheet Select SQL Error=" + err.message);
		});
	},function(err){
		console.log("Error ScoreSheet_getList " + err.message);
	},function(){
		
		console.log("End ScoreSheet_getList");
		loadedfunc();
	});
}

/**
 * 引数に指定されたID値のスコアシートデータを読み込む。
 * 読み込み対象はすべてのデータとする。
 * 読み込まれたスコアシートオブジェクトはCurrentGameに格納される。
 * 読み込み後の処理は引数で与えられる。
 * @param id 読み込み対象のスコアシートのキー情報
 * @param loadedfunc 読み込み後の処理
 */
function ScoreSheet_getById(id,loadedfunc){
	console.log("Start ScoreSheet_getById");
	var sht=null;

	DbObj.transaction(function(tx){
		var param=[id];
		var sql="SELECT SHEETKEY,SCOREDATE,SHEETTYPE,TITLE,PLACE,MEMO FROM SCORESHEET WHERE SHEETKEY=?";
		console.log(sql);
		tx.executeSql(sql
		,param
		, function (tx, results){
			if(results.rows.length>0){
				sht=createScoreSheet(results.rows.item(0));
			}
		},function (tx,err){
			console.log("ScoreSheet Select SQL Error=" + err.message);
		});
	},function(err){
		console.log("Error ScoreSheet_getById " + err.message);
	},function(){
		DbObj.transaction(function(tx){
			var sql="SELECT ROUNDKEY,SHEETKEY,ROUNDNO,ROUNDTYPE,ROUNDNAME,ROUNDTOTAL,ROUNDTOTAL_HIT,ROUNDTOTAL_X,ROUNDTOTAL_10,SIGHT FROM ROUND WHERE SHEETKEY=? ORDER BY ROUNDNO";
			console.log(sql);
			tx.executeSql(sql
			,[id]
			, function (tx, results){
				for(var ri=0;ri<results.rows.length;ri++){
					var row=results.rows.item(ri);
					var rnd=createRound(row);
					rnd.scoresheet=sht;
					sht.distancelist[rnd.roundid]=rnd;
				}
			},function (tx,err){
				console.log("ScoreSheet Select SQL Error=" + err.message);
			});
		},function(err){
			console.log("Error ScoreSheet_getById " + err.message);
		},function(){
			DbObj.transaction(function(tx){
				var sql="SELECT SCOREKEY,ROUNDKEY,ENDNO,ARROWNO,SCORETEXT,SCORE,FLAG_HIT,FLAG_X,FLAG_10,POS_X,POS_Y FROM SCORE WHERE ROUNDKEY IN (SELECT ROUNDKEY FROM ROUND WHERE SHEETKEY = ?) ORDER BY ROUNDKEY,ENDNO,ARROWNO";
				console.log(sql);
				tx.executeSql(sql
				,[id]
				, function (tx, results){
					for(var ri=0;ri<results.rows.length;ri++){
						var row=results.rows.item(ri);
						if(!(row.ENDNO in sht.distancelist[row.ROUNDKEY].endlist)){
							var end=createEnd(row);
							end.round=sht.distancelist[row.ROUNDKEY];
							sht.distancelist[row.ROUNDKEY].endlist[row.ENDNO]=end;
						}
						var s=createScore(row);
						s.end=sht.distancelist[row.ROUNDKEY].endlist[row.ENDNO];
						sht.distancelist[row.ROUNDKEY].endlist[row.ENDNO].scorelist[row.SCOREKEY]=s;
					}
					//トータル数計算
					for(var ri in sht.distancelist) {
						for(var ei in sht.distancelist[ri].endlist){
							sht.distancelist[ri].endlist[ei].calcTotal();
						}
					}
				},function (tx,err){
					console.log("ScoreSheet Select SQL Error=" + err.message);
				});
			},function(err){
				console.log("Error ScoreSheet_getById " + err.message);
			},function(){
				CurrentGame=sht;
				console.log("End ScoreSheet_getById");
				loadedfunc();
			});
		});
	});
}

/**
 * 引数に指定されたスコアシートの行データよりスコアシートオブジェクトを生成する。
 * データベース読み込み処理の一部なので外部からの呼び出し不可。
 * オブジェクト間のリレーションはセットしない。
 * @param row 生成元となる行データ
 * @returns 生成されたスコアシートオブジェクト
 */
function createScoreSheet(row){
	var sht=new ScoreSheet();
	sht.gameid=row.SHEETKEY;
	sht.setGameDateYmd(row.SCOREDATE);
	sht.gametype=row.SHEETTYPE;
	sht.gametitle=row.TITLE;
	sht.gameplace=row.PLACE;
	sht.gamememo=row.MEMO;
	if(row.TOTALSCORE != "0") {
		sht.displaytext=row.TOTALSCORE;
	} else {
		sht.displaytext="";
	}
	return sht;
}

/**
 * 引数に指定されたラウンドの行データよりラウンドオブジェクトを生成する。
 * データベース読み込み処理の一部なので外部からの呼び出し不可。
 * オブジェクト間のリレーションはセットしない。
 * @param row 生成元となる行データ
 * @returns 生成されたラウンドオブジェクト
 */
function createRound(row){
	var rnd=new Round(row.ROUNDNO,row.ROUNDTYPE,row.ROUNDNAME,0);
	rnd.roundid=row.ROUNDKEY;
	rnd.sight=row.SIGHT;
	return rnd;
}


/**
 * 引数に指定されたスコアの行データよりエンドオブジェクトを生成する。
 * データベース読み込み処理の一部なので外部からの呼び出し不可。
 * オブジェクト間のリレーションはセットしない。
 * @param row 生成元となる行データ
 * @returns 生成されたエンドオブジェクト
 */
function createEnd(row){
	var end=new End(row.ENDNO);
	return end;
}

/**
 * 引数に指定されたスコアの行データよりスコアオブジェクトを生成する。
 * データベース読み込み処理の一部なので外部からの呼び出し不可。
 * オブジェクト間のリレーションはセットしない。
 * @param row 生成元となる行データ
 * @returns 生成されたスコアオブジェクト
 */
function createScore(row){
	var s=new Score(row.ARROWNO);
	s.scoreid=row.SCOREKEY;
	s.score=row.SCORE;
	s.scoretext=row.SCORETEXT;
	s.flag_hit=row.FLAG_HIT;
	s.flag_10=row.FLAG_10;
	s.flag_x=row.FLAG_X;
	s.pos_x=row.POS_X;
	s.pos_y=row.POS_Y;
	return s;
}

/**
 * 引数に指定されたスコアシートオブジェクトを保存する。
 * 新規登録のみ実行。更新処理は別メソッド。
 * @param sht 新規保存用のスコアシートオブジェクト
 */
function ScoreSheet_save(sht){
	DbObj.transaction(function(tx){
		var sql="INSERT INTO SCORESHEET (SHEETKEY,SCOREDATE,SHEETTYPE,TITLE,PLACE,MEMO)"
			+ " VALUES (?,?,?,?,?,?)";
		var param=[sht.gameid,sht.getGameDateYmd(),sht.gametype,sht.gametitle,sht.gameplace,sht.gamememo];
		console.log("save ScoreSheet:" + sht.gameid);
		tx.executeSql(sql,param);
		for(var ri in sht.distancelist){
			var r=sht.distancelist[ri];
			sql="INSERT INTO ROUND (ROUNDKEY,SHEETKEY,ROUNDNO,ROUNDTYPE,ROUNDNAME,ROUNDTOTAL,ROUNDTOTAL_HIT,ROUNDTOTAL_X,ROUNDTOTAL_10,SIGHT)"
				+ " VALUES (?,?,?,?,?,?,?,?,?,?)";
			param=[r.roundid,r.scoresheet.gameid,r.roundno,r.roundtype,r.roundname,r.getTotal(),r.getTotalHit(),r.getTotalX(),r.getTotal10(),r.sight];
			console.log("save Round:" + r.roundid);
			tx.executeSql(sql,param);
			for(var ei in r.endlist) {
				var e=r.endlist[ei];
				for(var si in e.scorelist) {
					var s=e.scorelist[si];
					sql="INSERT INTO SCORE (SCOREKEY,ROUNDKEY,ENDNO,ARROWNO,SCORETEXT,SCORE,FLAG_HIT,FLAG_X,FLAG_10,POS_X,POS_Y)"
						+" VALUES (?,?,?,?,?,?,?,?,?,?,?)";
					param=[s.scoreid,r.roundid,e.endno,s.arrowno,s.scoretext,s.score,s.flag_hit,s.flag_x,s.flag_10,s.pos_x,s.pos_y];
					console.log("save Score:" + s.scoreid);
					tx.executeSql(sql,param);
				}
			}
		}
	},function(err){
		console.log("Error ScoreSheet_save SQL: " + err.message);
	},function(){
		console.log("Sccess ScoreSheet_save SQL");
 	});
}

/**
 * スコアシート情報をデータベースに保存する。
 * 更新対象はスコアシート情報のみラウンド以下は更新対象外。
 * @param sht 更新するスコアシートオブジェクト
 */
function ScoreSheet_update(sht){
	DbObj.transaction(function(tx){
		var sql="UPDATE SCORESHEET SET TITLE = ?,SCOREDATE = ?,PLACE = ?,MEMO = ? WHERE SHEETKEY = ?";
		var param=[sht.gametitle,sht.getGameDateYmd(),sht.gameplace,sht.gamememo,sht.gameid];
		console.log("save ScoreSheet:_update");
		tx.executeSql(sql,param);
	},function(err){
		console.log("Error ScoreSheet_Update SQL: " + err.message);
	},function(){
		console.log("Sccess ScoreSheet_Update SQL");
 	});
}

/**
 * スコアシート情報をデータベースから削除する。
 * ラウンド以下もすべて削除する。
 * @param sht 削除するスコアシートオブジェクト
 */
function ScoreSheet_remove(sht){
	DbObj.transaction(function(tx){
		var sql="";
		var param=null;
		for(var ri in sht.distancelist){
			var r=sht.distancelist[ri];
			param=[r.roundid];
			sql="DELETE FROM SCORE WHERE ROUNDKEY=?";
			tx.executeSql(sql,param);
			sql="DELETE FROM ROUND WHERE ROUNDKEY=?";
			tx.executeSql(sql,param);
		}
		param=[sht.gameid];
		sql="DELETE FROM SCORESHEET WHERE SHEETKEY=?";
		tx.executeSql(sql,param);

	},function(err){
		console.log("Error ScoreSheet_remove SQL: " + err.message);
	},function(){
		console.log("Sccess ScoreSheet_remove SQL");
 	});
}

/**
 * 指定したラウンドのサイトデータをデータベースに保存する。
 * @param r 更新対象のラウンドオブジェクト
 */
function Round_saveSight(r){
	DbObj.transaction(function(tx){
		var sql="UPDATE ROUND SET SIGHT=? WHERE ROUNDKEY=?";
		var param=[r.sight,r.roundid];
		console.log("saveSight Round:" + r.roundid);
		tx.executeSql(sql,param);

	},function(err){
		console.log("Error ScoreSheet_saveSight SQL: " + err.message);
	},function(){
		console.log("Sccess ScoreSheet_saveSight SQL");
	});
}

/**
 * 指定したエンドのスコアデータをデータベースに保存する。
 * 新規登録ではないので注意。
 * @param e 更新対象のエンドオブジェクト
 */
function End_save(e){
	DbObj.transaction(function(tx){
		var sql="UPDATE SCORE SET "
			+ " SCORETEXT=?,SCORE=?,FLAG_HIT=?,FLAG_X=?,FLAG_10=?,POS_X=?,POS_Y=?"
			+ " WHERE SCOREKEY = ?";
		for(var si in e.scorelist){
			var s=e.scorelist[si];
			var param=[s.scoretext,s.score,s.flag_hit,s.flag_x,s.flag_10,s.pos_x,s.pos_y,s.scoreid];
			console.log("save Score:" + s.scoreid);
			tx.executeSql(sql,param);
		}
	},function(err){
		console.log("Error Score_save SQL: " + err.message);
	},function(){
		console.log("Sccess Score_save SQL");
	});
}

function Round_save(r){
	DbObj.transaction(function(tx){
		var sql="UPDATE ROUND SET "
			+ "ROUNDTOTAL=?,ROUNDTOTAL_HIT=?,ROUNDTOTAL_X=?,ROUNDTOTAL_10=? WHERE ROUNDKEY = ?"
			var param=[r.getTotal(),r.getTotalHit(),r.getTotalX(),r.getTotal10(),r.roundid];
			tx.executeSql(sql,param);
		
	},function(err){
		console.log("Error Round_save SQL: " + err.message);
	},function(){
		console.log("Sccess Round_save SQL");
	});
}












