











if (document.location.hash === '') {
	document.location.hash = '#home';
}


/* vim:set foldmethod=marker: */
'use strict';
//
$(document).bind('mobileinit', function(){
		$.extend($.mobile, {
				loadingMessage: false
		});
});


'use strict';function showNotice(){var a=location.hash;var b;if(notice.children('div.notice').length>0){if(notice.children('div.notice.active').length===0){notice.children('div.notice.waiting').first().addClass('active').removeClass('waiting')}notice.children('div.notice.active').animate({top:'50px'},{duration:400,complete:function(){b=setTimeout(function(){hideNotice()},3000)}})}else{return false}}function hideNotice(){var a=location.hash;$(a).find('header').children('div.active').addClass('complete').removeClass('active').animate({top:0},{duration:400,complete:function(){$(a).find('header').children('div.complete').remove();showNotice()}})}function setNotice(a,b){var c=location.hash;var d='';d+='<div class="notice '+a+'" title="'+b+'">';d+='<span class="description">'+b+'</span>';d+='</div>';if(notice.children('div.notice').length===0){$(c).find('header').prepend(d).children('div.notice').addClass('active');showNotice()}else{$(c).find('header').prepend(d).children('div.notice').last().addClass('waiting')}}function setLogin(b,c){var d=location.hash;localStorage.setItem('email',b);localStorage.setItem('password',c);$.when(groupGet('list')).done(function(a){if(a==='500'){if(d==='#home'){$('#home .bottom').show()}else if(d==='#login'){alert('ログインに失敗しました')}}else{if((d==='#home')||(d==='#login')||(d==='#signup')){$.mobile.changePage('#group')}}}).fail(function(){alert('ログインに失敗しました');$.mobile.changePage('#login')})}function setLoading(a,b){var c='';if(b==='div'){c+='<div class="loading">';c+='<div class="loader">読み込み中...</div>';c+='</div>';$(a).prepend(c)}else if(b==='list'){c+='<li class="loading">';c+='<span class="loader"></span>';c+='</li>';$(a).html(c)}}function setCommandType(a,b){var c=localStorage.getItem('page_id_superior');var d='';var e='';var f='';var g='';var h='';var i='';var j='';var k='';var l='';var m='';d+='<span class="command" style="display: none;">';if(b.hasClass('manager')){e+='<span class="button command-archive">';e+='<i class="icon-archive icon-white"></i>';e+='</span>';if((b.hasClass('content'))&&(b.hasClass('checked'))){f+='<span class="button command-delete">';f+='<i class="icon-delete icon-gray"></i>';f+='</span>'}else if(b.hasClass('group')&&(b.hasClass('personal'))){f+='<span class="button command-delete">';f+='<i class="icon-delete icon-gray"></i>';f+='</span>'}else{f+='<span class="button command-delete">';f+='<i class="icon-delete icon-white"></i>';f+='</span>'}if((b.hasClass('content'))&&(b.hasClass('checked'))){g+='<span class="button command-edit">';g+='<a href="#edit" data-rel="dialog" data-transition="slideup">';g+='<i class="icon-edit icon-gray"></i>';g+='</a>';g+='</span>'}else{g+='<span class="button command-edit">';g+='<a href="#edit" data-rel="dialog" data-transition="slideup">';g+='<i class="icon-edit icon-white"></i>';g+='</a>';g+='</span>'}i+='<span class="button command-insert">';i+='<a href="#insert" data-rel="dialog" data-transition="slideup">';i+='<i class="icon-insert icon-white"></i>';i+='</a>';i+='</span>';j+='<span class="button command-invite">';j+='<a href="#invite" data-rel="dialog" data-transition="slideup">';j+='<i class="icon-invite icon-white"></i>';j+='</a>';j+='</span>';if(b.hasClass('locked')){k+='<span class="button command-lock">';k+='<i class="icon-locked icon-white"></i>';k+='</span>'}else if(b.hasClass('unlocked')){k+='<span class="button command-lock">';k+='<i class="icon-unlocked icon-white"></i>';k+='</span>'}m+='<span class="button command-undo">';m+='<i class="icon-undo icon-white"></i>';m+='</span>'}else{e+='<span class="button command-archive">';e+='<i class="icon-archive icon-gray"></i>';e+='</span>';f+='<span class="button command-delete">';f+='<i class="icon-delete icon-gray"></i>';f+='</span>';g+='<span class="button command-edit">';g+='<a href="#edit" data-rel="dialog" data-transition="slideup">';g+='<i class="icon-edit icon-gray"></i>';g+='</a>';g+='</span>';i+='<span class="button command-insert">';i+='<a href="#insert" data-rel="dialog" data-transition="slideup">';i+='<i class="icon-insert icon-gray"></i>';i+='</a>';i+='</span>';j+='<span class="button command-invite">';j+='<a href="#invite" data-rel="dialog" data-transition="slideup">';j+='<i class="icon-invite icon-gray"></i>';j+='</a>';j+='</span>';if(b.hasClass('locked')){k+='<span class="button command-lock">';k+='<i class="icon-locked icon-gray"></i>';k+='</span>'}else if(b.hasClass('unlocked')){k+='<span class="button command-lock">';k+='<i class="icon-unlocked icon-gray"></i>';k+='</span>'}m+='<span class="button command-undo">';m+='<i class="icon-undo icon-gray"></i>';m+='</span>'}h+='<span class="button command-detail">';h+='<a href="#detail" data-rel="dialog" data-transition="slideup">';h+='<i class="icon-info icon-white">';h+='</a>';h+='</span>';if(a==='#archive'){d+=g;d+=f;d+=m;d+=k}else if(a==='#bookmark'){d+=g;d+=f}else if(a==='#content'){d+=g;d+=f;d+=h}else if(a==='#group'){d+=g;d+=f;d+=l;d+=j}else if(a==='#stock'){d+=g;d+=f;d+=i}else if(a==='#template'){d+=g;d+=f;d+=i;d+=k}else if(a==='#tree'){d+=g;d+=f;d+=e;d+=i;d+=k}d+='</span>';return d}function setCommandShow(a,b){var c=setCommandType(a,b);var d;b.append(c);d=b.children('span.command');b.animate({height:'+='+d.height()},{duration:200,complete:function(){}});d.show().animate({top:'+='+d.height()},{duration:200,complete:function(){}})}function setCommandHide(a){var b=$.Deferred();var c=a.children('span.command');a.animate({height:'-='+c.height()},{duration:200,complete:function(){c.remove();b.resolve()}});return b.promise()}function setClass(a){var b=parseInt(localStorage.getItem('account_no'),10);var c=parseInt(a.children('span.manager-no').text(),10);var d=parseInt(a.children('span.writer-no').text(),10);var e;var f;if(b===c){a.addClass('manager').removeClass('member')}else if(b===d){a.addClass('writer').removeClass('member')}else{a.addClass('member').removeClass('manager writer')}if(a.hasClass('content')){e=parseInt(a.children('span.child-count').text(),10);f=parseInt(a.children('span.progress').text().replace('%',''),10);if(e===0){a.addClass('terminal').removeClass('expandable')}else{a.addClass('expandable').removeClass('terminal')}if(f===100){a.addClass('checked').removeClass('unchecked').children('span.progress').text(f+'%')}else{a.addClass('unchecked').removeClass('checked').children('span.progress').text(f+'%')}if(a.hasClass('root')){}}}function setParentProgress(){var a;var b=location.hash;var c=0;var i=0;$(b).find('[data-role="content"] > ul > li').each(function(){a=$(this);c+=parseInt(a.children('span.progress').text().replace('%',''),10);i++});c=Math.round(c/i);$(b).find('div.parent').children('span.progress').text(c+'%')}function setDate(a,b){if(b==='client'){a=a.replace(/-/g,'/').substr('0','10');if(a===''){a='-'}}else if(b==='server'){}return a}function setDateTime(a,b){if(b==='client'){a=a.replace(/-/g,'/').replace(/T/g,' ').substr('0','19');if(a===''){a='-'}}else if(b==='server'){if(a!==''){a=a.replace(/\//g,'-')+'T00:00:00.00'}else{}}return a}function setAuthority(a){var b=localStorage.getItem('account_no');var c=a.children('span.manager-no').text();var d=a.children('span.writer-no').text();if(b===c){a.addClass('manager').removeClass('member writer')}else if(b===d){a.addClass('writer').removeClass('member manager')}else{a.addClass('member').removeClass('manager writer')}}function setGroupRemove(a){var b;var c=localStorage.getItem('account_no');$(a).find('option').each(function(){b=$(this);if(c!==b.attr('name')){b.remove()}})}function setTreeRemove(a,b){var c;var d='';$(a).find('option').each(function(){c=$(this);if(b===c.val()){c.remove();if($(a).children('option').length===0){d+='<option value="" name="">-</option>';$(a).html(d).selectmenu('refresh')}return false}})}function setAccountGet(a){var b;if(a==='500'){alert('エラー：アカウント情報の取得に失敗しました')}else if(a==='404'){}else{b='<a data-role="none" class="button button-black logout" href="#logout">ログアウトする</a>';$('#account ul').html(a).append(b);localStorage.setItem('account_no',$('#account-no').text());localStorage.setItem('account_name',$('#account-name').children('span.description').text())}}function setAccountPost(a,b,c){var d='';if(a==='500'){alert('エラー：アカウントの登録に失敗しました');$('div.loading').remove()}else if(a==='201'){setLogin(b,c)}}function setAccountPut(a){}function setAccountDelete(a){}function setArchiveGet(a){var b='';if(a==='500'){alert('エラー：完了したツリーの取得に失敗しました')}else if(a==='404'){b+='<li class="empty">';b+='<span class="description">完了したツリーはありません</span>';b+='</li>';$('#archive ul').html(b)}else{$('#archive ul').html(a).children('li.archive').each(function(){setAuthority($(this))})}}function setArchivePost(a,b){if(a==='500'){alert('エラー：ツリーの完了に失敗しました')}else{b.remove()}}function setArchivePut(a){if(a==='500'){alert('エラー：完了したツリーの名前の更新に失敗しました')}else if(a==='200'){$('.ui-dialog').dialog('close')}}function setArchiveDelete(a,b){var c='';var d;if(a==='500'){d=b.children('span.description').text();alert('エラー：完了したツリー「'+d+'」の削除に失敗しました')}else{b.remove();if($('#archive ul > li').length===0){c+='<li class="empty">';c+='<span class="description">完了したツリーはありません</span>';c+='</li>';$('#archive ul').html(c)}}}function setArchiveUndo(a,b){var c='';if(a==='500'){alert('エラー：ツリーの完了の取り消しに失敗しました')}else{b.remove();if($('#archive ul > li').length===0){c+='<li class="empty">';c+='<span class="description">完了したツリーはありません</span>';c+='</li>';$('#archive ul').html(c)}}}function setArchiveLock(a,b){var c=b.children('span.description').text();if(a==='500'){alert('エラー：完了したツリー「'+c+'」の公開設定の更新に失敗しました')}else{if(b.hasClass('locked')){b.addClass('unlocked').removeClass('locked').children('span.opened').text(0).siblings('span.command').children('span.command-lock').children('i').addClass('icon-unlocked').removeClass('icon-locked')}else if(b.hasClass('unlocked')){b.addClass('locked').removeClass('unlocked').children('span.opened').text(1).siblings('span.command').children('span.command-lock').children('i').addClass('icon-locked').removeClass('icon-unlocked')}}}function setBookmarkGet(a){var b='';if(a==='500'){alert('エラー：ブックマークの取得に失敗しました')}else if(a==='404'){b+='<li class="empty">';b+='<span class="description">ブックマークはありません</span>';b+='</li>';$('#bookmark ul').html(b)}else{$('#bookmark ul').html(a)}}function setBookmarkPost(a){if(a==='500'){alert('エラー：ブックマークの作成に失敗しました')}else{if($('#bookmark').find('[data-role="content"] > ul > li.bookmark').length===0){$('#bookmark').find('[data-role="content"]').children('ul').html(a)}else{$('#bookmark').find('[data-role="content"]').children('ul').append(a)}}$('.ui-dialog').dialog('close')}function setBookmarkPut(a){if(a==='500'){alert('エラー：ブックマークの名前の更新に失敗しました')}else if(a==='200'){$('.ui-dialog').dialog('close')}}function setBookmarkDelete(a,b){var c='';var d;if(a==='500'){d=b.children('span.description').text();alert('エラー：ブックマーク「'+d+'」の削除に失敗しました')}else{b.remove();if($('#bookmark ul > li').length===0){c+='<li class="empty">';c+='<span class="description">ブックマークはありません</span>';c+='</li>';$('#bookmark ul').html(c)}}}function setContentGet(a,b){if(a==='500'){alert('エラー：')}else if(a==='404'){}else{b.replaceWith(a)}}function setChildGet(a){var b=location.hash;var c;var d='';if(a==='500'){}else if(a==='404'){d+='<li class="empty">';d+='<span class="description">子タスクがありません</span>';d+='</li>';$(b).find('ul').html(d)}else{$(b).find('ul').html(a).children('li.content').each(function(){c=$(this);setClass(c)});$('.ui-dialog').dialog('close')}}function setParentGet(a){var b=location.hash;var c;var d=localStorage.getItem('page_id_superior');if(a==='500'){}else if(a==='404'){}else{$(b).find('div.parent').replaceWith(a);c=$('#content div.parent > span.parent-no').text();if(c==='0'){$('#content').find('span.header-left').find('a').attr('href',d)}}}function setContentPost(a){if(a==='500'){alert('エラー：タスクの作成に失敗しました')}else{$('.ui-dialog').dialog('close')}}function setContentPut(a){if(a==='500'){alert('エラー：タスクの更新に失敗しました')}else if(a==='200'){$('.ui-dialog').dialog('close')}}function setContentDelete(a,b){var c;if(a==='500'){c=b.children('span.description').text();alert('エラー：「'+c+'」の削除に失敗しました')}else{b.remove();setParentProgress()}}function setContentCheck(a,b){var c;if(a==='500'){alert('エラー：チェックボックスの更新に失敗しました');c=b.children('span.progress').text();if(c==='100%'){b.children('span.progress').text('0%')}else if(c==='0%'){b.children('span.progress').text('100%')}setParentProgress()}else if(a==='200'){}}function setEntryPost(a,b,c){if(a==='500'){alert('エラー：メンバーの招待に失敗しました')}else{alert('「'+b+'」さん宛にグループ「'+c+'」への招待メッセージを送信しました');$('.ui-dialog').dialog('close')}}function setGroupGet(a,b){var c='';if(a==='500'){alert('エラー：グループの取得に失敗しました')}else{$(b).html(a);if(b==='#group ul'){$(b).children('li.group').first().addClass('personal').end().each(function(){setAuthority($(this))})}else if(b==='#invite select.group'){setGroupRemove(b);$(b).selectmenu('refresh')}}}function setGroupPost(a){if(a==='500'){alert('エラー：グループの作成に失敗しました')}else{$('#group').find('[data-role="content"]').children('ul').append(a);$('.ui-dialog').dialog('close')}}function setGroupPut(a){if(a==='500'){alert('エラー：グループ名の更新に失敗しました')}else if(a==='200'){$('.ui-dialog').dialog('close')}}function setGroupDelete(a,b){var c;if(a==='500'){c=b.children('span.description').text();alert('エラー：グループ「'+c+'」の削除に失敗しました')}else{b.remove();if($('#group ul > li').length===0){html+='<li class="empty">';html+='<span class="description">グループはありません</span>';html+='</li>';$('#group ul').html(html)}}}function setMemberGet(a,b){if(a==='500'){alert('エラー：メンバーの取得に失敗しました')}else{$(b).html(a).selectmenu('refresh')}}function setPasswordEntry(a){var b='';if(a==='500'){alert('エラー：パスワードのリセットに失敗しました');$('div.loading').remove()}else if(a==='201'){b+='<div class="box">';b+='<section>';b+='<p>入力されたメールアドレスに、パスワード再設定用の URL を送信しました。</p>';b+='<p>メールに記載された URL からパスワードの再設定を行なってください。</p>';b+='</section>';b+='<section>';b+='<p>しばらく待ってもメールが届かない場合は、もう一度メールアドレスの送信を行なってください。</p>';b+='<p>また、メールソフトの迷惑メールフィルタにより、送信されたメールが削除されている可能性もあります。</p>';b+='<p>メールソフトの設定も併せてご確認ください。</p>';b+='</section>';b+='</div>';$('#information h1').text('再設定用 URL 送信完了');$('#information [data-role="content"]').html(b);$.mobile.changePage('#information')}}function setStockGet(a){var b='';if(a==='500'){alert('エラー：未整理のタスクの取得に失敗しました')}else if(a==='404'){b+='<li class="empty">';b+='<span class="description">未整理のタスクはありません</span>';b+='</li>';$('#stock ul').html(b)}else{$('#stock ul').html(a)}}function setStockPost(a){if(a==='500'){alert('エラー：未整理のタスクの作成に失敗しました')}else{if($('#stock').find('[data-role="content"] > ul > li.stock').length===0){$('#stock').find('[data-role="content"]').children('ul').html(a)}else{$('#stock').find('[data-role="content"]').children('ul').append(a)}$('.ui-dialog').dialog('close')}}function setStockPut(a){if(a==='500'){alert('エラー：未整理のタスクの更新に失敗しました')}else if(a==='200'){$('.ui-dialog').dialog('close')}}function setStockDelete(a,b){var c;if(a==='500'){c=b.children('span.description').text();alert('エラー：未整理のタスク「'+c+'」の削除に失敗しました')}else{b.remove();if($('#stock ul > li').length===0){html+='<li class="empty">';html+='<span class="description">未整理のタスクはありません</span>';html+='</li>';$('#stock ul').html(html)}}}function setStockInsert(a){if(a==='500'){alert('エラー：未整理のタスクの挿入に失敗しました')}else{$('.ui-dialog').dialog('close')}}function setTemplateGet(a){var b='';if(a==='500'){alert('エラー：テンプレートの取得に失敗しました')}else if(a==='404'){b+='<li class="empty">';b+='<span class="description">テンプレートはありません</span>';b+='</li>';$('#template ul').html(b)}else{$('#template ul').html(a).children('li.template').each(function(){setAuthority($(this))})}}function setTemplatePost(a){if(a==='500'){alert('エラー：テンプレートの作成に失敗しました')}else{if($('#template').find('[data-role="content"] > ul > li.template').length===0){$('#template').find('[data-role="content"]').children('ul').html(a)}else{$('#template').find('[data-role="content"]').children('ul').append(a)}$('.ui-dialog').dialog('close')}}function setTemplatePut(a){if(a==='500'){alert('エラー：テンプレート名の更新に失敗しました')}else if(a==='200'){$('.ui-dialog').dialog('close')}}function setTemplateDelete(a,b){var c;if(a==='500'){c=b.children('span.description').text();alert('エラー：テンプレート「'+c+'」の削除に失敗しました')}else{b.remove();if($('#template ul > li').length===0){html+='<li class="empty">';html+='<span class="description">テンプレートはありません</span>';html+='</li>';$('#template ul').html(html)}}}function setTemplateInsert(a){if(a==='500'){alert('エラー：テンプレートの挿入に失敗しました')}else{$('.ui-dialog').dialog('close')}}function setTemplateLock(a,b){var c=b.children('span.description').text();if(a==='500'){alert('エラー：テンプレート「'+c+'」の公開設定の更新に失敗しました')}else{if(b.hasClass('locked')){b.addClass('unlocked').removeClass('locked').children('span.opened').text(0).siblings('span.command').children('span.command-lock').children('i').addClass('icon-unlocked').removeClass('icon-locked')}else if(b.hasClass('unlocked')){b.addClass('locked').removeClass('unlocked').children('span.opened').text(1).siblings('span.command').children('span.command-lock').children('i').addClass('icon-locked').removeClass('icon-unlocked')}}}function setTreeGet(a,b){var c='';var d;if(a==='500'){alert('エラー：ツリーの取得に失敗しました')}else if(a==='404'){c+='<li class="empty">';c+='<span class="description">ツリーはありません</span>';c+='</li>';$('#tree ul').html(c)}else{$(b).html(a);if(b==='#tree ul'){$('#tree ul').children('li.tree').each(function(){setAuthority($(this))})}else if(b==='#insert select.tree'){d=localStorage.getItem('tree_no');setTreeRemove(b,d);$(b).selectmenu('refresh')}}}function setTreePost(a){if(a==='500'){alert('エラー：ツリーの作成に失敗しました')}else{if($('#tree').find('[data-role="content"] > ul > li.tree').length===0){$('#tree').find('[data-role="content"]').children('ul').html(a)}else{$('#tree').find('[data-role="content"]').children('ul').append(a)}}$('.ui-dialog').dialog('close')}function setTreePut(a){if(a==='500'){alert('エラー：ツリー名の更新に失敗しました')}else if(a==='200'){$('.ui-dialog').dialog('close')}}function setTreeDelete(a,b){var c;if(a==='500'){c=b.children('span.description').text();alert('エラー：ツリー「'+c+'」の削除に失敗しました')}else{b.remove();if($('#tree ul > li').length===0){html+='<li class="empty">';html+='<span class="description">ツリーはありません</span>';html+='</li>';$('#tree ul').html(html)}}}function setTreeInsert(a){if(a==='500'){alert('エラー：ツリーの挿入に失敗しました')}else{$('.ui-dialog').dialog('close')}}function setTreeLock(a,b){var c=b.children('span.description').text();if(a==='500'){alert('エラー：ツリー「'+c+'」の公開設定の更新に失敗しました')}else{if(b.hasClass('locked')){b.addClass('unlocked').removeClass('locked').children('span.opened').text(0).siblings('span.command').children('span.command-lock').children('i').addClass('icon-unlocked').removeClass('icon-locked')}else if(b.hasClass('unlocked')){b.addClass('locked').removeClass('unlocked').children('span.opened').text(1).siblings('span.command').children('span.command-lock').children('i').addClass('icon-locked').removeClass('icon-unlocked')}}}$(function(){$(document).on('tap','#login a.button-submit',function(){var a=$('#login input[type="email"]').val();var b=$('#login input[type="password"]').val();setLogin(a,b)});$(document).on('tap','#signup a.button-submit',function(){var b=$(this);var c=$('#signup input[name="email"]').val();var d=$('#signup input[name="password"]').val();var e=$('#signup input[name="username"]').val();if(b.hasClass('button-disabled')){alert('利用規約およびプライバシーポリシーに同意する必要があります');return false}else if(d.length<6){alert('パスワードは6文字以上必要です')}else{setLoading('#signup','div');$.when(accountPost(c,d,e)).done(function(a){setAccountPost(a,c,d)}).fail(function(){setAccountPost('500')})}});$(document).on('change','#signup input[type="checkbox"]',function(){var a=$(this);if(a.is(':checked')===true){$('#signup div.box a.button').removeClass('button-disabled')}else{$('#signup div.box a.button').addClass('button-disabled')}});$(document).on('tap','#remind a.button-submit',function(){var b=$('#remind input[type="email"]').val();if(b===''){alert('');return false}else{setLoading('#remind','div');$.when(passwordEntry(b)).done(function(a){setPasswordEntry(a)}).fail(function(){setPasswordEntry('500')})}});$(document).on('tap','#account a.logout',function(){if(confirm('本当にログアウトしますか？')){$.mobile.changePage('#logout')}return false});$(document).on('tap','[data-role="page"] header span.header-left a',function(e){var c=location.hash;var d=$(this);var f;if((c==='#content')&&(d.attr('href')==='#content')){f=$('#content div.parent > span.parent-no').text();localStorage.setItem('content_no',f);$.when(contentGet(f),childGet(f)).done(function(a,b){setParentGet(a);setChildGet(b)}).fail(function(){})}else{}});$(document).on('tap','[data-role="dialog"] header span.header-left a',function(e){$('.ui-dialog').dialog('close');return false});$(document).on('tap','header span.header-right a',function(){var a=$(this);var b=location.hash;var c=$(b).find('div.parent').children('span.content-no').text();localStorage.setItem('page_id_target',b);localStorage.setItem('parent_no',c);if(a.attr('href')==='#add'){if(b==='#bookmark'){$('#add h1').text('ブックマークを作成');$('#add input.description').attr('placeholder','ブックマーク名を入力してください')}else if(b==='#content'){$('#add h1').text('タスクを作成');$('#add input.description').attr('placeholder','タスクの内容を入力してください')}else if(b==='#group'){$('#add h1').text('グループを作成');$('#add input.description').attr('placeholder','グループ名を入力してください')}else if(b==='#stock'){$('#add h1').text('未整理のタスクを作成');$('#add input.description').attr('placeholder','タスクの内容を入力してください')}else if(b==='#template'){$('#add h1').text('テンプレートを作成');$('#add input.description').attr('placeholder','テンプレート名を入力してください')}else if(b==='#tree'){$('#add h1').text('ツリーを作成');$('#add input.description').attr('placeholder','ツリー名を入力してください')}}});$(document).on('tap','#detail header span.header-right a',function(){localStorage.setItem('page_id_target','#content')});$(document).on('tap','[data-role="content"] li',function(e){var a=$(this);var b=location.hash;var c=$(b);if(b==='#function'){a.children('span.link-area').children('a').tap()}else if(a.hasClass('empty')){}else if(a.hasClass('loading')){}else{if(c.find('span.command').length>0){if(a.children('span.command').length>0){setCommandHide(a)}else{c.find('span.command').each(function(){$.when(setCommandHide($(this).parent('li'))).done(function(){setCommandShow(b,a)})})}}else{setCommandShow(b,a)}}return false});$(document).on('tap','[data-role="content"] li > span.link-area',function(){var c=$(this);var d=c.parent('li');var e=location.hash;var f=c.children('a').attr('href');var g;var h;var i;if(e==='#content'){$('#content').find('span.header-left').find('a').attr('href','#content');g=d.children('span.content-no').text();localStorage.setItem('content_no',g);$.when(contentGet(g),childGet(g)).done(function(a,b){setParentGet(a);setChildGet(b)}).fail(function(){})}else if(e==='#function'){$.mobile.changePage(f,{transition:'slide'})}else if(e==='#group'){h=d.children('span.group-no').text();i=d.children('span.description').text();localStorage.setItem('group_no',h);localStorage.setItem('group_name',i);$.mobile.changePage('#function',{transition:'slide'})}else{$('#content').find('span.header-left').find('a').attr('href',e);g=d.children('span.content-no').text();localStorage.setItem('content_no',g);localStorage.setItem('page_id_superior',e);$.mobile.changePage(f,{transition:'slide'})}return false});$(document).on('tap','[data-role="content"] li.content > span.check-area',function(){var b=location.hash;var c=$(this);var d=c.parent('li');var e=d.children('span.content-no').text();var f=parseInt(d.children('span.progress').text().replace('%',''),10);var g=parseInt(d.children('span.child-count').text(),10);if((d.hasClass('member'))||(d.hasClass('writer'))){alert('このタスクの担当者のみが、このタスクを完了させることができます')}else if(d.hasClass('manager')){if(g>0){alert('このタスクを完了させるには、すべての子タスクを完了させる必要があります')}else{if(f===0){f=100;d.children('span.progress').text('100%');if(d.children('span.command').length>0){d.children('span.command').find('span.command-edit i').addClass('icon-gray').removeClass('icon-white').end().find('span.command-delete i').addClass('icon-gray').removeClass('icon-white')}}else if(f===100){f=0;d.children('span.progress').text('0%');if(d.children('span.command').length>0){d.children('span.command').find('span.command-edit i').addClass('icon-white').removeClass('icon-gray').end().find('span.command-delete i').addClass('icon-white').removeClass('icon-gray')}}setClass(d);setParentProgress();$.when(contentCheck(e,f)).done(function(a){setContentCheck(a,d)}).fail(function(){setContentCheck('500')})}}return false});$(document).on('tap','[data-role="content"] li.tree > span.command > span.command-archive',function(){var b=$(this);var c=b.parent('span.command').parent('li');var d=c.children('span.tree-no').text();if(c.hasClass('manager')){if(confirm('このツリーを完了しますか?')){$.when(archivePost(d)).done(function(a){setArchivePost(a,c)}).fail(function(){setArchivePost('500')})}}else{alert('このツリーの作成者のみが、ツリーを完了することができます')}return false});$(document).on('tap','[data-role="content"] li > span.command > span.command-delete',function(){var b=location.hash;var c=localStorage.getItem('page_id_superior');var d=$(b);var e=$(this);var f=e.parent('span.command').parent('li');var g=f.children('span.archive-no').text();var h=f.children('span.bookmark-no').text();var i=f.children('span.content-no').text();var j=f.children('span.group-no').text();var k=f.children('span.stock-no').text();var l=f.children('span.template-no').text();var m=f.children('span.tree-no').text();if(b==='#content'){if(c==='#archive'){alert('完了したツリーのタスクに対して、この操作は実行できません');return false}else{if(f.hasClass('checked')){alert('完了したタスクを削除することはできません')}else if((f.hasClass('manager'))||(f.hasClass('writer'))){if(confirm('このタスクを削除しますか?')){$.when(contentDelete(i)).done(function(a){setContentDelete(a,f)}).fail(function(){setContentDelete('500')})}}else{alert('このタスクの作成者および担当者のみが、このタスクを削除することができます')}}}else{if(f.hasClass('manager')){if(b==='#archive'){if(confirm('この完了したツリーを削除しますか?')){$.when(archiveDelete(g)).done(function(a){setArchiveDelete(a,f)}).fail(function(){setArchiveDelete('500')})}}else if(b==='#bookmark'){if(confirm('このブックマークを削除しますか?')){$.when(bookmarkDelete(h)).done(function(a){setBookmarkDelete(a,f)}).fail(function(){setBookmarkDelete('500')})}}else if(b==='#group'){if(f.hasClass('personal')){alert('このグループは削除できません')}else{if(confirm('このグループを削除しますか?')){$.when(groupDelete(j)).done(function(a){setGroupDelete(a,f)}).fail(function(){setGroupDelete('500')})}}}else if(b==='#stock'){if(confirm('この未整理のタスクを削除しますか?')){$.when(stockDelete(k)).done(function(a){setStockDelete(a,f)}).fail(function(){setStockDelete('500')})}}else if(b==='#template'){if(confirm('このテンプレートを削除しますか?')){$.when(templateDelete(l)).done(function(a){setTemplateDelete(a,f)}).fail(function(){setTemplateDelete('500')})}}else if(b==='#tree'){if(confirm('このツリーを削除しますか?')){$.when(treeDelete(m)).done(function(a){setTreeDelete(a,f)}).fail(function(){setTreeDelete('500')})}}}else{if(b==='#archive'){}else if(b==='#group'){alert('このグループの管理者のみが、グループを削除することができます')}else if(b==='#template'){alert('このテンプレートの作成者のみが、テンプレートを削除することができます')}else if(b==='#tree'){alert('このツリーの作成者のみが、ツリーを削除することができます')}}}return false});$(document).on('tap','[data-role="content"] li > span.command > span.command-detail',function(){var a=location.hash;var b=$(this);var c=b.parent('span.command').parent('li');var d=c.children('span.description').text();var e=c.children('span.manager-name').text();var f=c.children('span.writer-name').text();var g=setDate(c.children('span.start-date').text(),'client');var h=setDate(c.children('span.due-date').text(),'client');var i=setDateTime(c.children('span.add-date').text(),'client');var j=setDateTime(c.children('span.edit-date').text(),'client');var k=c.children('span.child-count').text();var l=$(a).find('div.parent').children('span.content-no').text();localStorage.setItem('parent_no',l);$('#detail li.description > span.description').text(d);$('#detail li.manager-name > span.description').text(e);$('#detail li.writer-name > span.description').text(f);$('#detail li.start-date > span.description').text(g);$('#detail li.due-date > span.description').text(h);$('#detail li.add-date > span.description').text(i);$('#detail li.edit-date > span.description').text(j);$('#detail li.child-count > span.description').text(k);$.mobile.changePage('#detail',{transition:'slideup',role:'dialog'});return false});$(document).on('tap','[data-role="content"] li > span.command > span.command-edit',function(e){var a=location.hash;var b=localStorage.getItem('page_id_superior');var c=$(this).parent('span.command').parent('li');var d=c.children('span.description').text();var f;var g;var h;var i;var j;var k;var l;var m;var n=$(a).find('div.parent').children('span.content-no').text();localStorage.setItem('parent_no',n);e.stopPropagation();if(a==='#content'){if(b==='#archive'){alert('完了したツリーのタスクに対して、この操作は実行できません');return false}else{if(c.hasClass('checked')){alert('完了したタスクを編集することはできません')}else if((c.hasClass('manager'))||(c.hasClass('writer'))){$('#edit h1').text('タスクの内容を変更');i=c.children('span.content-no').text();f=c.children('span.manager-no').text();localStorage.setItem('content_no',i);localStorage.setItem('manager_no',f);localStorage.setItem('description',d);localStorage.setItem('page_id_target',a);localStorage.setItem('placeholder','');$.mobile.changePage('#edit',{transition:'slideup',role:'dialog'})}else{alert('このタスクの作成者および担当者のみが、このタスクを編集することができます')}}}else{if(c.hasClass('manager')){if(a==='#archive'){$('#edit h1').text('完了したツリーの名前を変更');g=c.children('span.archive-no').text();localStorage.setItem('archive_no',g)}else if(a==='#bookmark'){$('#edit h1').text('ブックマーク名を変更');h=c.children('span.bookmark-no').text();localStorage.setItem('bookmark_no',h)}else if(a==='#group'){$('#edit h1').text('グループ名を変更');j=c.children('span.group-no').text();localStorage.setItem('group_no',j)}else if(a==='#stock'){$('#edit h1').text('未整理のタスクの内容を変更');k=c.children('span.stock-no').text();localStorage.setItem('stock_no',k)}else if(a==='#template'){$('#edit h1').text('テンプレート名を変更');l=c.children('span.template-no').text();localStorage.setItem('template_no',l)}else if(a==='#tree'){$('#edit h1').text('ツリー名を変更');m=c.children('span.tree-no').text();localStorage.setItem('tree_no',m)}localStorage.setItem('description',d);localStorage.setItem('page_id_target',a);localStorage.setItem('placeholder','');$.mobile.changePage('#edit',{transition:'slideup',role:'dialog'})}else{if(a==='#archive'){alert('この完了したツリーの作成者のみが、完了したツリー名を変更することができます')}else if(a==='#group'){alert('このグループの管理者のみが、グループ名を変更することができます')}else if(a==='#template'){alert('このテンプレートの作成者のみが、テンプレート名を変更することができます')}else if(a==='#tree'){alert('このツリーの作成者のみが、ツリー名を変更することができます')}}}return false});$(document).on('tap','[data-role="content"] li > span.command > span.command-insert',function(){var a=$(this);var b=a.parent('span.command').parent('li');var c;var d;var e;if(b.hasClass('manager')){if(b.hasClass('stock')){c=b.children('span.stock-no').text();localStorage.setItem('page_id_target','#stock');localStorage.setItem('stock_no',c);$('#insert h1').text('未整理のタスクをツリーに挿入')}else if(b.hasClass('template')){d=b.children('span.template-no').text();localStorage.setItem('page_id_target','#template');localStorage.setItem('template_no',d);$('#insert h1').text('テンプレートをツリーに挿入')}else if(b.hasClass('tree')){e=b.children('span.tree-no').text();localStorage.setItem('page_id_target','#tree');localStorage.setItem('tree_no',e);$('#insert h1').text('ツリーをツリーに挿入')}$.mobile.changePage('#insert',{transition:'slideup',role:'dialog'})}else{if(b.hasClass('tree')){alert('このツリーの作成者のみが、ツリーを表示中のツリーに挿入することができます')}}return false});$(document).on('tap','[data-role="content"] li > span.command > span.command-invite',function(){var a=$(this);var b=a.parent('span.command').parent('li');var c=b.children('span.group-no').text();localStorage.setItem('group_no',c);if(b.hasClass('manager')){$.mobile.changePage('#invite',{transition:'slideup',role:'dialog'})}else{alert('このグループの管理者のみが、グループにメンバーを招待することができます')}return false});$(document).on('tap','[data-role="content"] li > span.command > span.command-lock',function(){var b=$(this);var c=b.parent('span.command').parent('li');var d;var e;var f;var g;var h;if(c.hasClass('manager')){if(c.hasClass('archive')){if(c.hasClass('unlocked')){g='0';h='この完了したツリーをグループの他のメンバーに非公開にしますか？'}else if(c.hasClass('locked')){g='1';h='この完了したツリーをグループの他のメンバーに公開しますか？'}if(confirm(h)){d=c.children('span.archive-no').text();$.when(archiveLock(d,g)).done(function(a){setArchiveLock(a,c)}).fail(function(){setArchiveLock('500')})}}else if(c.hasClass('template')){if(c.hasClass('unlocked')){g='0';h='このテンプレートをグループの他のメンバーに非公開にしますか？'}else if(c.hasClass('locked')){g='1';h='このテンプレートをグループの他のメンバーに公開しますか？'}if(confirm(h)){e=c.children('span.template-no').text();$.when(templateLock(e,g)).done(function(a){setTemplateLock(a,c)}).fail(function(){setTemplateLock('500')})}}else if(c.hasClass('tree')){if(c.hasClass('unlocked')){g='0';h='このツリーをグループの他のメンバーに非公開にしますか？'}else if(c.hasClass('locked')){g='1';h='このツリーをグループの他のメンバーに公開しますか？'}if(confirm(h)){f=c.children('span.tree-no').text();$.when(treeLock(f,g)).done(function(a){setTreeLock(a,c)}).fail(function(){setTreeLock('500')})}}}else{if(c.hasClass('archive')){alert('この完了したツリーの作成者のみが公開設定を変更できます')}else if(c.hasClass('template')){alert('このテンプレートの作成者のみが公開設定を変更できます')}else if(c.hasClass('tree')){alert('このツリーの作成者のみが公開設定を変更できます')}}return false});$(document).on('tap','[data-role="content"] li.archive > span.command > span.command-undo',function(){var b=$(this);var c=b.parent('span.command').parent('li');var d=c.children('span.archive-no').text();if(c.hasClass('manager')){if(confirm('このツリーの完了を取り消しますか?')){$.when(archiveUndo(d)).done(function(a){setArchiveUndo(a,c)}).fail(function(){setArchiveUndo('500')})}}else{alert('この完了したツリーの作成者のみが、このツリーの完了を取り消すことができます')}return false});$(document).on('tap','#add a.button-submit',function(){var b=localStorage.getItem('page_id_target');var c=localStorage.getItem('group_no');var d=$('#add input.description').val();var e;var f;var g;var h;if(b==='#content'){e=localStorage.getItem('parent_no');f=$('#add').find('select.manager').val();g=setDateTime($('#add input.start-date').val(),'server');h=setDateTime($('#add input.due-date').val(),'server');$.when(contentPost(e,d,f,g,h)).done(function(a){setContentPost(a)}).fail(function(){setContentPost('500')})}else if(b==='#group'){$.when(groupPost(d)).done(function(a){setGroupPost(a)}).fail(function(){setGroupPost('500')})}else if(b==='#stock'){$.when(stockPost(d)).done(function(a){setStockPost(a)}).fail(function(){setStockPost('500')})}else if(b==='#template'){$.when(templatePost(c,d)).done(function(a){setTemplatePost(a)}).fail(function(){setTemplatePost('500')})}else if(b==='#tree'){$.when(treePost(c,d)).done(function(a){setTreePost(a)}).fail(function(){setTreePost('500')})}});$(document).on('tap','#edit a.button-submit',function(){var b=localStorage.getItem('page_id_target');var c=$('#edit').find('input[type="text"]').val();var d;var e;var f;var g;var h;var i;var j;var k;var l;var m;if(b==='#archive'){d=localStorage.getItem('archive_no');$.when(archivePut(d,c)).done(function(a){setArchivePut(a)}).fail(function(){setArchivePut('500')})}else if(b==='#bookmark'){e=localStorage.getItem('bookmark_no');$.when(bookmarkPut(e,c)).done(function(a){setBookmarkPut(a)}).fail(function(){setBookmarkPut('500')})}else if(b==='#content'){f=localStorage.getItem('content_no');k=$('#edit').find('select.manager').val();l=setDateTime($('#edit input.start-date').val(),'server');m=setDateTime($('#edit input.due-date').val(),'server');$.when(contentPut(f,c,k,l,m)).done(function(a){setContentPut(a)}).fail(function(){setContentPut('500')})}else if(b==='#group'){g=localStorage.getItem('group_no');$.when(groupPut(g,c)).done(function(a){setGroupPut(a)}).fail(function(){setGroupPut('500')})}else if(b==='#stock'){h=localStorage.getItem('stock_no');$.when(stockPut(h,c)).done(function(a){setStockPut(a)}).fail(function(){setStockPut('500')})}else if(b==='#template'){i=localStorage.getItem('template_no');$.when(templatePut(i,c)).done(function(a){setTemplatePut(a)}).fail(function(){setTemplatePut('500')})}else if(b==='#tree'){j=localStorage.getItem('tree_no');$.when(treePut(j,c)).done(function(a){setTreePut(a)}).fail(function(){setTreePut('500')})}});$(document).on('tap','#insert a.button-submit',function(){var b=localStorage.getItem('page_id_target');var c=localStorage.getItem('stock_no');var d=localStorage.getItem('template_no');var e=localStorage.getItem('tree_no');var f=$('#insert select.tree option:selected').attr('name');var g=$('#insert select.tree option:selected').text();var h=0;if(b==='#stock'){if(confirm('この未整理のタスクをツリー「'+g+'」に挿入しますか？')){$.when(stockInsert(c,f,h)).done(function(a){setStockInsert(a)}).fail(function(){setStockInsert('500')})}}else if(b==='#template'){if(confirm('このテンプレートをツリー「'+g+'」に挿入しますか？')){$.when(templateInsert(d,f,h)).done(function(a){setTemplateInsert(a)}).fail(function(){setTemplateInsert('500')})}}else if(b==='#tree'){if(confirm('このツリーをツリー「'+g+'」に挿入しますか？')){$.when(treeInsert(e,f,h)).done(function(a){setTreeInsert(a)}).fail(function(){setTreeInsert('500')})}}});$(document).on('tap','#invite a.button-submit',function(){var b=$('#invite select.group option:selected').val();var c=$('#invite select.group option:selected').text();var d=$('#invite input[type="email"]').val();var e=$('#invite input[type="text"]').val();var f=localStorage.getItem('account_name');$.when(entryPost(b,d,e,c,f)).done(function(a){setEntryPost(a,d,c)}).fail(function(){setEntryPost('500')});return false});$(document).on('pageinit','#home',function(){var a=localStorage.getItem('email');var b=localStorage.getItem('password');setTimeout(function(){setLogin(a,b)},1000)});$(document).on('pageinit','#login',function(){});$(document).on('pageinit','#remind',function(){});$(document).on('pageinit','#signup',function(){});$(document).on('pageinit','#archive',function(){setLoading('#archive ul','list')});$(document).on('pageinit','#bookmark',function(){setLoading('#bookmark ul','list')});$(document).on('pageinit','#content',function(){setLoading('#content ul','list')});$(document).on('pageinit','#function',function(){});$(document).on('pageinit','#group',function(){setLoading('#group ul','list')});$(document).on('pageinit','#stock',function(){setLoading('#stock ul','list')});$(document).on('pageinit','#template',function(){setLoading('#template ul','list')});$(document).on('pageinit','#tree',function(){setLoading('#tree ul','list')});$(document).on('pagebeforeshow','[data-page-type="app"]',function(){var a=location.hash;var b='<div id="notice"></div>';$(a).find('header').prepend(b)});$(document).on('pagebeforeshow','#account',function(){var b=localStorage.getItem('email');$('#account h1').text(b);$.when(accountGet()).done(function(a){setAccountGet(a)}).fail(function(){setAccountGet('500')})});$(document).on('pagebeforeshow','#archive',function(){var b=localStorage.getItem('group_no');var c=localStorage.getItem('group_name');$('#archive h1').text(c);$.when(archiveGet(b)).done(function(a){setArchiveGet(a)}).fail(function(){setArchiveGet('500')})});$(document).on('pagebeforeshow','#bookmark',function(){var b=localStorage.getItem('group_no');var c=localStorage.getItem('group_name');$('#bookmark h1').text(c);$.when(bookmarkGet(b)).done(function(a){setBookmarkGet(a)}).fail(function(){setBookmarkGet('500')})});$(document).on('pagebeforeshow','#content',function(){var c=location.hash;var d=localStorage.getItem('page_id_superior');var e=localStorage.getItem('content_no');var f=localStorage.getItem('group_name');$('#content h1').text(f);if(d==='#archive'){$(c).find('header').children('span.header-right').children('a').hide()}else{$(c).find('header').children('span.header-right').children('a').show()}$.when(contentGet(e),childGet(e)).done(function(a,b){setParentGet(a);setChildGet(b)}).fail(function(){})});$(document).on('pagebeforeshow','#function',function(){var a=localStorage.getItem('group_name');$('#function h1').text(a)});$(document).on('pagebeforeshow','#group',function(){localStorage.setItem('account_no','');localStorage.setItem('account_name','');localStorage.setItem('group_no','');$('#group h1').text(localStorage.getItem('email'));$.when(accountGet(),groupGet('list')).done(function(a,b){setAccountGet(a);setGroupGet(b,'#group ul')}).fail(function(){setAccountGet('500');setGroupGet('500')})});$(document).on('pagebeforeshow','#logout',function(){localStorage.clear();$.mobile.changePage('#login')});$(document).on('pagebeforeshow','#stock',function(){var b=localStorage.getItem('group_name');$('#stock h1').text(b);$.when(stockGet()).done(function(a){setStockGet(a)}).fail(function(){setStockGet('500')})});$(document).on('pagebeforeshow','#template',function(){var b=localStorage.getItem('group_no');var c=localStorage.getItem('group_name');$('#template h1').text(c);$.when(templateGet(b)).done(function(a){setTemplateGet(a)}).fail(function(){setTemplateGet('500')})});$(document).on('pagebeforeshow','#tree',function(){var b=localStorage.getItem('group_no');var c=localStorage.getItem('group_name');$('#tree h1').text(c);$.when(treeGet(b,'list')).done(function(a){setTreeGet(a,'#tree ul')}).fail(function(){setTreeGet('500')})});$(document).on('pagebeforeshow','#add',function(){var b=localStorage.getItem('group_no');var c=localStorage.getItem('account_no');var d=localStorage.getItem('page_id_target');if(d==='#content'){$('#add').find('div.ui-select').show().end().find('div.ui-input-text').show();$.when(memberGet(b,'select')).done(function(a){setMemberGet(a,'#add select.manager');$('#add').find('select').val(c).selectmenu('refresh',true)}).fail(function(){setMemberGet('500')})}else{$('#add').find('div.ui-select').hide().end().find('div.ui-input-text').hide()}});$(document).on('pagebeforeshow','#edit',function(){var b;var c=localStorage.getItem('page_id_target');var d=localStorage.getItem('group_no');var e=localStorage.getItem('description');var f=localStorage.getItem('manager_no');var g;var h;$('#edit input.description').val(e);if(c==='#content'){$('#edit').find('div.ui-select').show().end().find('div.ui-input-text').show();$.when(memberGet(d,'select')).done(function(a){setMemberGet(a,'#edit select.manager');$('#edit').find('select').val(f).selectmenu('refresh',true)}).fail(function(){setMemberGet('500')})}else{$('#edit').find('div.ui-select').hide().end().find('div.ui-input-text').hide()}});$(document).on('pagebeforeshow','#insert',function(){var b=localStorage.getItem('group_no');$.when(treeGet(b,'select')).done(function(a){setTreeGet(a,'#insert select.tree')}).fail(function(){setTreeGet('500')})});$(document).on('pagebeforeshow','#invite',function(){var b=localStorage.getItem('group_no');$.when(groupGet('select')).done(function(a){setGroupGet(a,'#invite select.group');$('#invite select.group').val(b).selectmenu('refresh')}).fail(function(){setGroupGet('500')})});$(document).on('pagebeforehide','[data-page-type="app"]',function(){$('#notice').remove()});$(document).on('pagebeforehide','[data-role="dialog"]',function(){var a=localStorage.getItem('parent_no');localStorage.setItem('content_no',a)});$(document).on('pagehide','#signup',function(){$('div.loading').remove()});$(document).on('pagehide','#archive',function(){setLoading('#archive ul','list')});$(document).on('pagehide','#bookmark',function(){setLoading('#archive ul','list')});$(document).on('pagehide','#content',function(){setLoading('#content ul','list');$('#content').find('div.parent').children('span.description').text('').siblings('span.progress').text('')});$(document).on('pagehide','#group',function(){setLoading('#group ul','list')});$(document).on('pagehide','#stock',function(){setLoading('#stock ul','list')});$(document).on('pagehide','#template',function(){setLoading('#template ul','list')});$(document).on('pagehide','#tree',function(){setLoading('#tree ul','list')});$(document).on('pagehide','#add',function(){$('#add input.description').val('');$('#add select.manager').empty().selectmenu('refresh',true).parent().find('.ui-btn-text').html('');$('#add input.start-date').val('').datebox('refresh');$('#add input.due-date').val('').datebox('refresh')});$(document).on('pagehide','#edit',function(){$('#edit input.description').val('');$('#edit select.manager').empty().selectmenu('refresh',true).parent().find('.ui-btn-text').html('');$('#edit input.start-date').val('').datebox('refresh');$('#edit input.due-date').val('').datebox('refresh')});$(document).on('pagehide','#insert',function(){$('#insert select.tree').empty().selectmenu('refresh',true).parent().find('.ui-btn-text').html('')})});


/* vim:set foldmethod=marker: */
'use strict';
// Account
function accountGet() {//{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'GET',
			url: 'https://www.taskman.ne.jp/sp/account',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				password: password,
				format: 'xml',
				method: 'get'
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
}//}}}
function accountPost(email, password, username) { //{{{
	var defer = $.Deferred();
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/account',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'post',
				password: password,
				username: username
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function accountPut() { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/account',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'put',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function accountDelete() { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/account',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'delete',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
// Archive
function archiveGet(group_no) {//{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'GET',
			url: 'https://www.taskman.ne.jp/sp/archive',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				groupno: group_no,
				password: password,
				format: 'xml',
				method: 'get'
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
}//}}}
function archivePost(tree_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/archive',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'post',
				password: password,
				treeno: tree_no
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function archivePut(archive_no, description) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/archive',
			dataType: 'html',
			cache: 'false',
			data: {
				description: description,
				email: email,
				format: 'xml',
				archiveno: archive_no,
				method: 'put',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function archiveDelete(archive_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/archive',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				archiveno: archive_no,
				method: 'delete',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function archiveLock(archive_no, opened) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/archive',
			dataType: 'html',
			cache: 'false',
			data: {
				archiveno: archive_no,
				email: email,
				format: 'xml',
				method: 'lock',
				opened: opened,
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function archiveUndo(archive_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/archive',
			dataType: 'html',
			cache: 'false',
			data: {
				archiveno: archive_no,
				email: email,
				format: 'xml',
				method: 'undo',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
// Bookmark
function bookmarkGet(group_no) {//{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'GET',
			url: 'https://www.taskman.ne.jp/sp/bookmark',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				groupno: group_no,
				password: password,
				format: 'xml',
				method: 'get'
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
}//}}}
function bookmarkPost() { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/bookmark',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'post',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function bookmarkPut(bookmark_no, description) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/bookmark',
			dataType: 'html',
			cache: 'false',
			data: {
				bookmarkno: bookmark_no,
				description: description,
				email: email,
				format: 'xml',
				method: 'put',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function bookmarkDelete(bookmark_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/bookmark',
			dataType: 'html',
			cache: 'false',
			data: {
				bookmarkno: bookmark_no,
				email: email,
				format: 'xml',
				method: 'delete',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
// Content
function childGet(content_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'GET',
			url: 'https://www.taskman.ne.jp/sp/content',
			dataType: 'html',
			cache: 'false',
			data: {
				child: true,
				contentno: content_no,
				email: email,
				format: 'xml',
				method: 'get',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function contentGet(content_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'GET',
			url: 'https://www.taskman.ne.jp/sp/content',
			dataType: 'html',
			cache: 'false',
			data: {
				child: false,
				contentno: content_no,
				email: email,
				format: 'xml',
				method: 'get',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function contentPost(parentno, description, managerno, startdate, duedate) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/content',
			dataType: 'html',
			cache: 'false',
			data: {
				description: description,
				duedate: duedate,
				email: email,
				format: 'xml',
				managerno: managerno,
				method: 'post',
				parentno: parentno,
				password: password,
				startdate: startdate
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function contentPut(content_no, description, manager_no, start_date, due_date) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/content',
			dataType: 'html',
			cache: 'false',
			data: {
				contentno: content_no,
				description: description,
				duedate: due_date,
				email: email,
				format: 'xml',
				managerno: manager_no,
				method: 'put',
				password: password,
				startdate: start_date
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function contentCheck(content_no, progress_value) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/content',
			dataType: 'html',
			cache: 'false',
			data: {
				contentno: content_no,
				email: email,
				format: 'xml',
				method: 'check',
				password: password,
				progress: progress_value
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function contentDelete(content_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/content',
			dataType: 'html',
			cache: 'false',
			data: {
				contentno: content_no,
				email: email,
				format: 'xml',
				method: 'delete',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
// Entry
function entryPost(group_no, toaddress, message, group_name, manager_name) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/entry',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				groupname: group_name,
				groupno: group_no,
				managername: manager_name,
				message: message,
				method: 'post',
				password: password,
				toaddress: toaddress
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
// Group
function groupGet(xsl_type) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'GET',
			url: 'https://www.taskman.ne.jp/sp/group',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'get',
				password: password,
				xsltype: xsl_type
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function groupPost(description) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/group',
			dataType: 'html',
			cache: 'false',
			data: {
				description: description,
				email: email,
				format: 'xml',
				method: 'post',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function groupPut(group_no, description) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/group',
			dataType: 'html',
			cache: 'false',
			data: {
				description: description,
				email: email,
				format: 'xml',
				groupno: group_no,
				method: 'put',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function groupDelete(group_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/group',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				groupno: group_no,
				method: 'delete',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
// Member
function memberGet(group_no, xsl_type) {//{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'GET',
			url: 'https://www.taskman.ne.jp/sp/member',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				groupno: group_no,
				method: 'get',
				password: password,
				xsltype: xsl_type
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
}//}}}
// Password
function passwordEntry(email) { //{{{
	var defer = $.Deferred();
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/password',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'post'
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
// Stock
function stockGet() {//{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'GET',
			url: 'https://www.taskman.ne.jp/sp/stock',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				password: password,
				format: 'xml',
				method: 'get'
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
}//}}}
function stockPost(description) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/stock',
			dataType: 'html',
			cache: 'false',
			data: {
				description: description,
				email: email,
				format: 'xml',
				method: 'post',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function stockPut(stock_no, description) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/stock',
			dataType: 'html',
			cache: 'false',
			data: {
				description: description,
				email: email,
				format: 'xml',
				method: 'put',
				password: password,
				stockno: stock_no
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function stockDelete(stock_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/stock',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'delete',
				password: password,
				stockno: stock_no
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function stockInsert(stock_no, parent_no, order_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/stock',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'insert',
				orderno: order_no,
				parentno: parent_no,
				password: password,
				stockno: stock_no
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
// Template
function templateGet(group_no) {//{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'GET',
			url: 'https://www.taskman.ne.jp/sp/template',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				groupno: group_no,
				password: password,
				format: 'xml',
				method: 'get'
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
}//}}}
function templatePost(group_no, description) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/template',
			dataType: 'html',
			cache: 'false',
			data: {
				description: description,
				email: email,
				format: 'xml',
				groupno: group_no,
				method: 'post',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function templatePut(template_no, description) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/template',
			dataType: 'html',
			cache: 'false',
			data: {
				description: description,
				email: email,
				format: 'xml',
				method: 'put',
				password: password,
				templateno: template_no
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function templateDelete(template_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/template',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'delete',
				password: password,
				templateno: template_no
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function templateInsert(template_no, parent_no, order_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/template',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'insert',
				orderno: order_no,
				parentno: parent_no,
				password: password,
				templateno: template_no
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function templateLock(template_no, opened) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/template',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'lock',
				opened: opened,
				password: password,
				templateno: template_no
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
// Tree
function treeGet(group_no, xsl_type) {//{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'GET',
			url: 'https://www.taskman.ne.jp/sp/tree',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				groupno: group_no,
				password: password,
				format: 'xml',
				method: 'get',
				xsltype: xsl_type
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
}//}}}
function treePost(group_no, description) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/tree',
			dataType: 'html',
			cache: 'false',
			data: {
				description: description,
				email: email,
				format: 'xml',
				groupno: group_no,
				method: 'post',
				password: password
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function treePut(tree_no, description) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/tree',
			dataType: 'html',
			cache: 'false',
			data: {
				description: description,
				email: email,
				format: 'xml',
				method: 'put',
				password: password,
				treeno: tree_no
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function treeDelete(tree_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/tree',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'delete',
				password: password,
				treeno: tree_no
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function treeInsert(tree_no, parent_no, order_no) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/tree',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'insert',
				orderno: order_no,
				parentno: parent_no,
				password: password,
				treeno: tree_no
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}
function treeLock(tree_no, opened) { //{{{
	var defer = $.Deferred();
	var email = localStorage.getItem('email');
	var password = localStorage.getItem('password');
	$.ajax({
			type: 'POST',
			url: 'https://www.taskman.ne.jp/sp/tree',
			dataType: 'html',
			cache: 'false',
			data: {
				email: email,
				format: 'xml',
				method: 'lock',
				opened: opened,
				password: password,
				treeno: tree_no
			}
	})
	.done(function(data) {
			defer.resolve(data);
	})
	.fail(function() {
			defer.reject();
	});
	return defer.promise();
} //}}}


'use strict';function setLayout(){var a=window.innerHeight;var b=window.innerWidth;if(window.devicePixelRatio>0){a=a*window.devicePixelRatio;b=b*window.devicePixelRatio}}$(document).on('pageinit','[data-role=page]',function(){setLayout()});$(window).resize(function(){setLayout()});


/* vim:set foldmethod=marker: */
'use strict';
//
function showNotice() {//{{{
	var page_id_current = location.hash;
	var noticeInterval;
	if (notice.children('div.notice').length > 0) {
		if (notice.children('div.notice.active').length === 0) {
			notice
			.children('div.notice.waiting')
			.first()
			.addClass('active')
			.removeClass('waiting');
		}
		notice
		.children('div.notice.active')
		.animate({ top: '50px' }, {
				duration: 400,
				complete: function() {
					noticeInterval = setTimeout(function() {
							hideNotice();
					}, 3000);
				}
		});
	} else {
		return false;
	}
}//}}}
function hideNotice() {//{{{
	var page_id_current = location.hash;
	$(page_id_current)
	.find('header')
	.children('div.active')
	.addClass('complete')
	.removeClass('active')
	.animate({ top: 0 }, {
			duration: 400,
			complete: function() {
				$(page_id_current)
				.find('header')
				.children('div.complete')
				.remove();
				showNotice();
			}
	});
}//}}}
function setNotice(type, message) {//{{{
	var page_id_current = location.hash;
	var html = '';
	html += '<div class="notice ' + type + '" title="' + message + '">';
	html += '<span class="description">' + message + '</span>';
	html += '</div>';
	if (notice.children('div.notice').length === 0) {
		$(page_id_current)
		.find('header')
		.prepend(html)
		.children('div.notice')
		.addClass('active');
		showNotice();
	} else {
		$(page_id_current)
		.find('header')
		.prepend(html)
		.children('div.notice')
		.last()
		.addClass('waiting');
	}
}//}}}
function setLogin(email, password) { //{{{
	var page_id_current = location.hash;
	localStorage.setItem('email', email);
	localStorage.setItem('password', password);
	$.when(groupGet('list')).done(function(data1) {
			if (data1 === '500') {
				if (page_id_current === '#home') {
					$('#home .bottom').show();
				} else if (page_id_current === '#login') {
					alert('ログインに失敗しました');
				}
			} else {
				if ((page_id_current === '#home') || (page_id_current === '#login') || (page_id_current === '#signup')) {
					$.mobile.changePage('#group');
				}
			}
	}).fail(function() {
			alert('ログインに失敗しました');
			$.mobile.changePage('#login');
	});
} //}}}
function setLoading(selector, type) { //{{{
	var html = '';
	if (type === 'div') {
		html += '<div class="loading">';
		html += '<div class="loader">読み込み中...</div>';
		html += '</div>';
		$(selector).prepend(html);
	} else if (type === 'list') {
		html += '<li class="loading">';
		html += '<span class="loader"></span>';
		html += '</li>';
		$(selector).html(html);
	}
} //}}}
function setCommandType(page_id_current, $content) { //{{{
	var page_id_superior = localStorage.getItem('page_id_superior');
	var command = '';
	var command_archive = '';
	var command_delete = '';
	var command_edit = '';
	var command_detail = '';
	var command_insert = '';
	var command_invite = '';
	var command_lock = '';
	var command_member = '';
	var command_undo = '';
	// command
	command += '<span class="command" style="display: none;">';
	if ($content.hasClass('manager')) {
		// command-archive
		command_archive += '<span class="button command-archive">';
		command_archive += '<i class="icon-archive icon-white"></i>';
		command_archive += '</span>';
		// command-delete
		if (($content.hasClass('content')) && ($content.hasClass('checked'))) {
			command_delete += '<span class="button command-delete">';
			command_delete += '<i class="icon-delete icon-gray"></i>';
			command_delete += '</span>';
		} else if ($content.hasClass('group') && ($content.hasClass('personal'))) {
			command_delete += '<span class="button command-delete">';
			command_delete += '<i class="icon-delete icon-gray"></i>';
			command_delete += '</span>';
		} else {
			command_delete += '<span class="button command-delete">';
			command_delete += '<i class="icon-delete icon-white"></i>';
			command_delete += '</span>';
		}
		// command-edit
		if (($content.hasClass('content')) && ($content.hasClass('checked'))) {
			command_edit += '<span class="button command-edit">';
			command_edit += '<a href="#edit" data-rel="dialog" data-transition="slideup">';
			command_edit += '<i class="icon-edit icon-gray"></i>';
			command_edit += '</a>';
			command_edit += '</span>';
		} else {
			command_edit += '<span class="button command-edit">';
			command_edit += '<a href="#edit" data-rel="dialog" data-transition="slideup">';
			command_edit += '<i class="icon-edit icon-white"></i>';
			command_edit += '</a>';
			command_edit += '</span>';
		}
		// command-insert
		command_insert += '<span class="button command-insert">';
		command_insert += '<a href="#insert" data-rel="dialog" data-transition="slideup">';
		command_insert += '<i class="icon-insert icon-white"></i>';
		command_insert += '</a>';
		command_insert += '</span>';
		// command-invite
		command_invite += '<span class="button command-invite">';
		command_invite += '<a href="#invite" data-rel="dialog" data-transition="slideup">';
		command_invite += '<i class="icon-invite icon-white"></i>';
		command_invite += '</a>';
		command_invite += '</span>';
		// command-lock
		if ($content.hasClass('locked')) {
			command_lock += '<span class="button command-lock">';
			command_lock += '<i class="icon-locked icon-white"></i>';
			command_lock += '</span>';
		} else if ($content.hasClass('unlocked')) {
			command_lock += '<span class="button command-lock">';
			command_lock += '<i class="icon-unlocked icon-white"></i>';
			command_lock += '</span>';
		}
		// command-undo
		command_undo += '<span class="button command-undo">';
		command_undo += '<i class="icon-undo icon-white"></i>';
		command_undo += '</span>';
	} else {
		// command-archive
		command_archive += '<span class="button command-archive">';
		command_archive += '<i class="icon-archive icon-gray"></i>';
		command_archive += '</span>';
		// command-delete
		command_delete += '<span class="button command-delete">';
		command_delete += '<i class="icon-delete icon-gray"></i>';
		command_delete += '</span>';
		// command-edit
		command_edit += '<span class="button command-edit">';
		command_edit += '<a href="#edit" data-rel="dialog" data-transition="slideup">';
		command_edit += '<i class="icon-edit icon-gray"></i>';
		command_edit += '</a>';
		command_edit += '</span>';
		// command-insert
		command_insert += '<span class="button command-insert">';
		command_insert += '<a href="#insert" data-rel="dialog" data-transition="slideup">';
		command_insert += '<i class="icon-insert icon-gray"></i>';
		command_insert += '</a>';
		command_insert += '</span>';
		// command-invite
		command_invite += '<span class="button command-invite">';
		command_invite += '<a href="#invite" data-rel="dialog" data-transition="slideup">';
		command_invite += '<i class="icon-invite icon-gray"></i>';
		command_invite += '</a>';
		command_invite += '</span>';
		// command-lock
		if ($content.hasClass('locked')) {
			command_lock += '<span class="button command-lock">';
			command_lock += '<i class="icon-locked icon-gray"></i>';
			command_lock += '</span>';
		} else if ($content.hasClass('unlocked')) {
			command_lock += '<span class="button command-lock">';
			command_lock += '<i class="icon-unlocked icon-gray"></i>';
			command_lock += '</span>';
		}
		// command-undo
		command_undo += '<span class="button command-undo">';
		command_undo += '<i class="icon-undo icon-gray"></i>';
		command_undo += '</span>';
	}
	// command-detail
	command_detail += '<span class="button command-detail">';
	command_detail += '<a href="#detail" data-rel="dialog" data-transition="slideup">';
	command_detail += '<i class="icon-info icon-white">';
	command_detail += '</a>';
	command_detail += '</span>';
	// command-member
	/*
	 command_member += '<span class="button command-member">';
	 command_member += '<a href="#member" data-rel="dialog" data-transition="slideup">';
	 command_member += '<i class="icon-member icon-white"></i>';
	 command_member += '</a>';
	 command_member += '</span>';
	 */
	if (page_id_current === '#archive') {
		command += command_edit;
		command += command_delete;
		command += command_undo;
		command += command_lock;
	} else if (page_id_current === '#bookmark') {
		command += command_edit;
		command += command_delete;
	} else if (page_id_current === '#content') {
		command += command_edit;
		command += command_delete;
		command += command_detail;
	} else if (page_id_current === '#group') {
		command += command_edit;
		command += command_delete;
		command += command_member;
		command += command_invite;
	} else if (page_id_current === '#stock') {
		command += command_edit;
		command += command_delete;
		command += command_insert;
	} else if (page_id_current === '#template') {
		command += command_edit;
		command += command_delete;
		command += command_insert;
		command += command_lock;
	} else if (page_id_current === '#tree') {
		command += command_edit;
		command += command_delete;
		command += command_archive;
		command += command_insert;
		command += command_lock;
	}
	command += '</span>';
	return command;
} //}}}
function setCommandShow(page_id_current, $content) { //{{{
	var command = setCommandType(page_id_current, $content);
	var $command;
	$content.append(command);
	$command = $content.children('span.command');
	$content
	.animate({ height: '+=' + $command.height() },{
			duration: 200,
			complete: function() {
			}
	});
	$command
	.show()
	.animate({ top: '+=' + $command.height() },{
			duration: 200,
			complete: function() {
			}
	});
} //}}}
function setCommandHide($content) { //{{{
	var defer = $.Deferred();
	var $command = $content.children('span.command');
	$content
	.animate({ height: '-=' + $command.height() },{
			duration: 200,
			complete: function() {
				$command.remove();
				defer.resolve();
			}
	});
	return defer.promise();
} //}}}
function setClass($content) { //{{{
	var account_no = parseInt(localStorage.getItem('account_no'), 10);
	var manager_no = parseInt($content.children('span.manager-no').text(), 10);
	var writer_no = parseInt($content.children('span.writer-no').text(), 10);
	var child_count;
	var progress_value;
	if (account_no === manager_no) {
		$content
		.addClass('manager')
		.removeClass('member');
	} else if (account_no === writer_no) {
		$content
		.addClass('writer')
		.removeClass('member');
	} else {
		$content
		.addClass('member')
		.removeClass('manager writer');
	}
	if ($content.hasClass('content')) {
		child_count = parseInt($content.children('span.child-count').text(), 10);
		progress_value = parseInt($content.children('span.progress').text().replace('%', ''), 10);
		if (child_count === 0) {
			$content
			.addClass('terminal')
			.removeClass('expandable');
		} else {
			$content
			.addClass('expandable')
			.removeClass('terminal');
		}
		if (progress_value === 100) {
			$content
			.addClass('checked')
			.removeClass('unchecked')
			.children('span.progress')
			.text(progress_value + '%');
		} else {
			$content
			.addClass('unchecked')
			.removeClass('checked')
			.children('span.progress')
			.text(progress_value + '%');
		}
		if ($content.hasClass('root')) {
		}
	}
} //}}}
function setParentProgress() { //{{{
	var $self;
	var page_id_current = location.hash;
	var progress_value = 0;
	var i = 0;
	$(page_id_current)
	.find('[data-role="content"] > ul > li')
	.each(function() {
			$self = $(this);
			progress_value += parseInt($self.children('span.progress').text().replace('%', ''), 10);
			i++;
	});
	progress_value = Math.round(progress_value / i);
	$(page_id_current)
	.find('div.parent')
	.children('span.progress')
	.text(progress_value + '%');
} //}}}
function setDate(date, type) {//{{{
	if (type === 'client') {
		date = date.replace(/-/g, '/').substr('0', '10');
		if (date === '') {
			date = '-';
		}
	} else if (type === 'server') {
	}
	return date;
}//}}}
function setDateTime(date_time, type) {//{{{
	if (type === 'client') {
		date_time = date_time.replace(/-/g, '/').replace(/T/g, ' ').substr('0', '19');
		if (date_time === '') {
			date_time = '-';
		}
	} else if (type === 'server') {
		if (date_time !== '') {
			date_time = date_time.replace(/\//g, '-') + 'T00:00:00.00';
		} else {
		}
	}
	return date_time;
}//}}}
function setAuthority($content) { //{{{
	var account_no = localStorage.getItem('account_no');
	var manager_no = $content.children('span.manager-no').text();
	var writer_no = $content.children('span.writer-no').text();
	if (account_no === manager_no) {
		$content
		.addClass('manager')
		.removeClass('member writer');
	} else if (account_no === writer_no) {
		$content
		.addClass('writer')
		.removeClass('member manager');
	} else {
		$content
		.addClass('member')
		.removeClass('manager writer');
	}
} //}}}
function setGroupRemove(selector) { //{{{
	var $self;
	var account_no = localStorage.getItem('account_no');
	$(selector).find('option').each(function() {
			$self = $(this);
			if (account_no !== $self.attr('name')) {
				$self.remove();
			}
	});
} //}}}
function setTreeRemove(selector, tree_no) { //{{{
	var $self;
	var html = '';
	$(selector).find('option').each(function() {
			$self = $(this);
			if (tree_no === $self.val()) {
				$self.remove();
				if ($(selector).children('option').length === 0) {
					html += '<option value="" name="">-</option>';
					$(selector)
					.html(html)
					.selectmenu('refresh');
				}
				return false;
			}
	});
} //}}}
// After Ajax
// Account
function setAccountGet(data) { //{{{
	var html;
	if (data === '500') {
		alert('エラー：アカウント情報の取得に失敗しました');
	} else if (data === '404') {
	} else {
		html = '<a data-role="none" class="button button-black logout" href="#logout">ログアウトする</a>';
		$('#account ul')
		.html(data)
		.append(html);
		localStorage.setItem('account_no', $('#account-no').text());
		localStorage.setItem('account_name', $('#account-name').children('span.description').text());
	}
} //}}}
function setAccountPost(data, email, password) { //{{{
	var html = '';
	if (data === '500') {
		alert('エラー：アカウントの登録に失敗しました');
		$('div.loading').remove();
	} else if (data === '201') {
		setLogin(email, password);
	}
} //}}}
function setAccountPut(data) { //{{{
} //}}}
function setAccountDelete(data) { //{{{
} //}}}
// Archive
function setArchiveGet(data) { //{{{
	var html = '';
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：完了したツリーの取得に失敗しました');
	} else if (data === '404') {
		html += '<li class="empty">';
		html += '<span class="description">完了したツリーはありません</span>';
		html += '</li>';
		$('#archive ul').html(html);
	} else {
		$('#archive ul')
		.html(data)
		.children('li.archive')
		.each(function() {
				setAuthority($(this));
		});
	}
} //}}}
function setArchivePost(data, $content) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：ツリーの完了に失敗しました');
	} else {
		$content.remove();
	}
} //}}}
function setArchivePut(data) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：完了したツリーの名前の更新に失敗しました');
	} else if (data === '200') {
		$('.ui-dialog').dialog('close');
	}
} //}}}
function setArchiveDelete(data, $content) { //{{{
	var html = '';
	var description;
	if (data === '500') {
		description = $content.children('span.description').text();
		// ToDo : Notice
		alert('エラー：完了したツリー「' + description + '」の削除に失敗しました');
	} else {
		$content.remove();
		if ($('#archive ul > li').length === 0) {
			html += '<li class="empty">';
			html += '<span class="description">完了したツリーはありません</span>';
			html += '</li>';
			$('#archive ul').html(html);
		}
	}
} //}}}
function setArchiveUndo(data, $content) { //{{{
	var html = '';
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：ツリーの完了の取り消しに失敗しました');
	} else {
		$content.remove();
		if ($('#archive ul > li').length === 0) {
			html += '<li class="empty">';
			html += '<span class="description">完了したツリーはありません</span>';
			html += '</li>';
			$('#archive ul').html(html);
		}
	}
} //}}}
function setArchiveLock(data, $content) { //{{{
	var archive_name = $content.children('span.description').text();
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：完了したツリー「' + archive_name + '」の公開設定の更新に失敗しました');
	} else {
		if ($content.hasClass('locked')) {
			$content
			.addClass('unlocked')
			.removeClass('locked')
			.children('span.opened')
			.text(0)
			.siblings('span.command')
			.children('span.command-lock')
			.children('i')
			.addClass('icon-unlocked')
			.removeClass('icon-locked');
		} else if ($content.hasClass('unlocked')) {
			$content
			.addClass('locked')
			.removeClass('unlocked')
			.children('span.opened')
			.text(1)
			.siblings('span.command')
			.children('span.command-lock')
			.children('i')
			.addClass('icon-locked')
			.removeClass('icon-unlocked');
		}
	}
} //}}}
// Bookmark
function setBookmarkGet(data) { //{{{
	var html = '';
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：ブックマークの取得に失敗しました');
	} else if (data === '404') {
		html += '<li class="empty">';
		html += '<span class="description">ブックマークはありません</span>';
		html += '</li>';
		$('#bookmark ul').html(html);
	} else {
		$('#bookmark ul').html(data);
	}
} //}}}
function setBookmarkPost(data) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：ブックマークの作成に失敗しました');
	} else {
		if ($('#bookmark').find('[data-role="content"] > ul > li.bookmark').length === 0) {
			$('#bookmark')
			.find('[data-role="content"]')
			.children('ul')
			.html(data);
		} else {
			$('#bookmark')
			.find('[data-role="content"]')
			.children('ul')
			.append(data);
		}
	}
	$('.ui-dialog').dialog('close');
} //}}}
function setBookmarkPut(data) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：ブックマークの名前の更新に失敗しました');
	} else if (data === '200') {
		$('.ui-dialog').dialog('close');
	}
} //}}}
function setBookmarkDelete(data, $content) { //{{{
	var html = '';
	var description;
	if (data === '500') {
		// ToDo : Notice
		description = $content.children('span.description').text();
		alert('エラー：ブックマーク「' + description + '」の削除に失敗しました');
	} else {
		$content.remove();
		if ($('#bookmark ul > li').length === 0) {
			html += '<li class="empty">';
			html += '<span class="description">ブックマークはありません</span>';
			html += '</li>';
			$('#bookmark ul').html(html);
		}
	}
} //}}}
// Content
function setContentGet(data, $content) { //{{{
	if (data === '500') {
		// ToDo : 
		alert('エラー：');
	} else if (data === '404') {
	} else {
		$content.replaceWith(data);
	}
} //}}}
function setChildGet(data) { //{{{
	var page_id_current = location.hash;
	var $self;
	var html = '';
	if (data === '500') {
		// ToDo : 
	} else if (data === '404') {
		html += '<li class="empty">';
		html += '<span class="description">子タスクがありません</span>';
		html += '</li>';
		$(page_id_current)
		.find('ul')
		.html(html);
	} else {
		$(page_id_current)
		.find('ul')
		.html(data)
		.children('li.content')
		.each(function() {
				$self = $(this);
				setClass($self);
		});
		$('.ui-dialog').dialog('close');
	}
} //}}}
function setParentGet(data) { //{{{
	var page_id_current = location.hash;
	var parent_no;
	var page_id_superior = localStorage.getItem('page_id_superior');
	if (data === '500') {
		// ToDo : 
	} else if (data === '404') {
		// ToDo : 
	} else {
		$(page_id_current).find('div.parent').replaceWith(data);
		// ToDo : この機能はここで実行すべきではない？
		parent_no = $('#content div.parent > span.parent-no').text();
		if (parent_no === '0') {
			$('#content')
			.find('span.header-left')
			.find('a')
			.attr('href', page_id_superior);
		}
	}
} //}}}
function setContentPost(data) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：タスクの作成に失敗しました');
	} else {
		$('.ui-dialog').dialog('close');
	}
} //}}}
function setContentPut(data) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：タスクの更新に失敗しました');
	} else if (data === '200') {
		$('.ui-dialog').dialog('close');
	}
} //}}}
function setContentDelete(data, $content) { //{{{
	var description;
	if (data === '500') {
		// ToDo : Notice
		description = $content.children('span.description').text();
		alert('エラー：「' + description + '」の削除に失敗しました');
	} else {
		$content.remove();
		setParentProgress();
		// ToDo : ul > li の length が 0 の場合
	}
} //}}}
function setContentCheck(data, $content) { //{{{
	var progress_value;
	if (data === '500') {
		alert('エラー：チェックボックスの更新に失敗しました');
		progress_value = $content.children('span.progress').text();
		if (progress_value === '100%') {
			$content.children('span.progress').text('0%');
		} else if (progress_value === '0%') {
			$content.children('span.progress').text('100%');
		}
		setParentProgress();
	} else if (data === '200') {
	}
} //}}}
// Entry
function setEntryPost(data, email, group_name) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：メンバーの招待に失敗しました');
	} else {
		// ToDo : Notice
		alert('「' + email + '」さん宛にグループ「' + group_name + '」への招待メッセージを送信しました');
		$('.ui-dialog').dialog('close');
	}
} //}}}
// Group
function setGroupGet(data, selector) { //{{{
	var html = '';
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：グループの取得に失敗しました');
	} else {
		$(selector).html(data);
		if (selector === '#group ul') {
			$(selector)
			.children('li.group')
			.first()
			.addClass('personal')
			.end()
			.each(function() {
					setAuthority($(this));
			});
		} else if (selector === '#invite select.group') {
			setGroupRemove(selector);
			$(selector).selectmenu('refresh');
		}
	}
} //}}}
function setGroupPost(data) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：グループの作成に失敗しました');
	} else {
		$('#group')
		.find('[data-role="content"]')
		.children('ul')
		.append(data);
		$('.ui-dialog').dialog('close');
	}
} //}}}
function setGroupPut(data) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：グループ名の更新に失敗しました');
	} else if (data === '200') {
		$('.ui-dialog').dialog('close');
	}
} //}}}
function setGroupDelete(data, $content) { //{{{
	var description;
	if (data === '500') {
		// ToDo : Notice
		description = $content.children('span.description').text();
		alert('エラー：グループ「' + description + '」の削除に失敗しました');
	} else {
		$content.remove();
		if ($('#group ul > li').length === 0) {
			html += '<li class="empty">';
			html += '<span class="description">グループはありません</span>';
			html += '</li>';
			$('#group ul').html(html);
		}
	}
} //}}}
// Member
function setMemberGet(data, selector) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：メンバーの取得に失敗しました');
	} else {
		$(selector)
		.html(data)
		.selectmenu('refresh');
	}
} //}}}
// Password
function setPasswordEntry(data) { //{{{
	var html = '';
	if (data === '500') {
		alert('エラー：パスワードのリセットに失敗しました');
		$('div.loading').remove();
	} else if (data === '201') {
		html += '<div class="box">';
		html += '<section>';
		html += '<p>入力されたメールアドレスに、パスワード再設定用の URL を送信しました。</p>';
		html += '<p>メールに記載された URL からパスワードの再設定を行なってください。</p>';
		html += '</section>';
		html += '<section>';
		html += '<p>しばらく待ってもメールが届かない場合は、もう一度メールアドレスの送信を行なってください。</p>';
		html += '<p>また、メールソフトの迷惑メールフィルタにより、送信されたメールが削除されている可能性もあります。</p>';
		html += '<p>メールソフトの設定も併せてご確認ください。</p>';
		html += '</section>';
		html += '</div>';
		$('#information h1').text('再設定用 URL 送信完了');
		$('#information [data-role="content"]').html(html);
		$.mobile.changePage('#information');
	}
} //}}}
// Stock
function setStockGet(data) { //{{{
	var html = '';
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：未整理のタスクの取得に失敗しました');
	} else if (data === '404') {
		html += '<li class="empty">';
		html += '<span class="description">未整理のタスクはありません</span>';
		html += '</li>';
		$('#stock ul').html(html);
	} else {
		$('#stock ul').html(data);
	}
} //}}}
function setStockPost(data) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：未整理のタスクの作成に失敗しました');
	} else {
		if ($('#stock').find('[data-role="content"] > ul > li.stock').length === 0) {
			$('#stock')
			.find('[data-role="content"]')
			.children('ul')
			.html(data);
		} else {
			$('#stock')
			.find('[data-role="content"]')
			.children('ul')
			.append(data);
		}
		$('.ui-dialog').dialog('close');
	}
} //}}}
function setStockPut(data) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：未整理のタスクの更新に失敗しました');
	} else if (data === '200') {
		$('.ui-dialog').dialog('close');
	}
} //}}}
function setStockDelete(data, $content) { //{{{
	var description;
	if (data === '500') {
		// ToDo : Notice
		description = $content.children('span.description').text();
		alert('エラー：未整理のタスク「' + description + '」の削除に失敗しました');
	} else {
		$content.remove();
		if ($('#stock ul > li').length === 0) {
			html += '<li class="empty">';
			html += '<span class="description">未整理のタスクはありません</span>';
			html += '</li>';
			$('#stock ul').html(html);
		}
	}
} //}}}
function setStockInsert(data) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：未整理のタスクの挿入に失敗しました');
	} else {
		// ToDo : Notice or alert
		$('.ui-dialog').dialog('close');
	}
} //}}}
// Template
function setTemplateGet(data) { //{{{
	var html = '';
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：テンプレートの取得に失敗しました');
	} else if (data === '404') {
		html += '<li class="empty">';
		html += '<span class="description">テンプレートはありません</span>';
		html += '</li>';
		$('#template ul').html(html);
	} else {
		$('#template ul')
		.html(data)
		.children('li.template')
		.each(function() {
				setAuthority($(this));
		});
	}
} //}}}
function setTemplatePost(data) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：テンプレートの作成に失敗しました');
	} else {
		if ($('#template').find('[data-role="content"] > ul > li.template').length === 0) {
			$('#template')
			.find('[data-role="content"]')
			.children('ul')
			.html(data);
		} else {
			$('#template')
			.find('[data-role="content"]')
			.children('ul')
			.append(data);
		}
		$('.ui-dialog').dialog('close');
	}
} //}}}
function setTemplatePut(data) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：テンプレート名の更新に失敗しました');
	} else if (data === '200') {
		$('.ui-dialog').dialog('close');
	}
} //}}}
function setTemplateDelete(data, $content) { //{{{
	var description;
	if (data === '500') {
		description = $content.children('span.description').text();
		alert('エラー：テンプレート「' + description + '」の削除に失敗しました');
	} else {
		$content.remove();
		if ($('#template ul > li').length === 0) {
			html += '<li class="empty">';
			html += '<span class="description">テンプレートはありません</span>';
			html += '</li>';
			$('#template ul').html(html);
		}
	}
} //}}}
function setTemplateInsert(data) { //{{{
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：テンプレートの挿入に失敗しました');
	} else {
		// ToDo : Notice or alert
		$('.ui-dialog').dialog('close');
	}
} //}}}
function setTemplateLock(data, $content) { //{{{
	var template_name = $content.children('span.description').text();
	if (data === '500') {
		// ToDo : Notice
		alert('エラー：テンプレート「' + template_name + '」の公開設定の更新に失敗しました');
	} else {
		if ($content.hasClass('locked')) {
			$content
				.addClass('unlocked')
				.removeClass('locked')
				.children('span.opened')
				.text(0)
				.siblings('span.command')
				.children('span.command-lock')
				.children('i')
				.addClass('icon-unlocked')
				.removeClass('icon-locked');
		} else if ($content.hasClass('unlocked')) {
			$content
				.addClass('locked')
				.removeClass('unlocked')
				.children('span.opened')
				.text(1)
				.siblings('span.command')
				.children('span.command-lock')
				.children('i')
				.addClass('icon-locked')
				.removeClass('icon-unlocked');
		}
	}
} //}}}
// Tree
	function setTreeGet(data, selector) { //{{{
		var html = '';
		var tree_no;
		if (data === '500') {
			// ToDo : Notice
			alert('エラー：ツリーの取得に失敗しました');
		} else if (data === '404') {
			html += '<li class="empty">';
			html += '<span class="description">ツリーはありません</span>';
			html += '</li>';
			$('#tree ul').html(html);
		} else {
			$(selector).html(data);
			if (selector === '#tree ul') {
				$('#tree ul')
				.children('li.tree')
				.each(function() {
						setAuthority($(this));
				});
			} else if (selector === '#insert select.tree') {
				tree_no = localStorage.getItem('tree_no');
				setTreeRemove(selector, tree_no);
				$(selector).selectmenu('refresh');
			}
		}
	} //}}}
	function setTreePost(data) { //{{{
		if (data === '500') {
			// ToDo : Notice
			alert('エラー：ツリーの作成に失敗しました');
		} else {
			if ($('#tree').find('[data-role="content"] > ul > li.tree').length === 0) {
				$('#tree')
				.find('[data-role="content"]')
				.children('ul')
				.html(data);
			} else {
				$('#tree')
				.find('[data-role="content"]')
				.children('ul')
				.append(data);
			}
		}
		$('.ui-dialog').dialog('close');
	} //}}}
	function setTreePut(data) { //{{{
		if (data === '500') {
			// ToDo : Notice
			alert('エラー：ツリー名の更新に失敗しました');
		} else if (data === '200') {
			$('.ui-dialog').dialog('close');
		}
	} //}}}
	function setTreeDelete(data, $content) { //{{{
		var description;
		if (data === '500') {
			description = $content.children('span.description').text();
			alert('エラー：ツリー「' + description + '」の削除に失敗しました');
		} else {
			$content.remove();
		if ($('#tree ul > li').length === 0) {
			html += '<li class="empty">';
			html += '<span class="description">ツリーはありません</span>';
			html += '</li>';
			$('#tree ul').html(html);
		}
		}
	} //}}}
	function setTreeInsert(data) { //{{{
		if (data === '500') {
			alert('エラー：ツリーの挿入に失敗しました');
		} else {
			// ToDo : Notice or alert
			$('.ui-dialog').dialog('close');
		}
	} //}}}
	function setTreeLock(data, $content) { //{{{
		var tree_name = $content.children('span.description').text();
		if (data === '500') {
			alert('エラー：ツリー「' + tree_name + '」の公開設定の更新に失敗しました');
		} else {
			if ($content.hasClass('locked')) {
				$content
				.addClass('unlocked')
				.removeClass('locked')
				.children('span.opened')
				.text(0)
				.siblings('span.command')
				.children('span.command-lock')
				.children('i')
				.addClass('icon-unlocked')
				.removeClass('icon-locked');
			} else if ($content.hasClass('unlocked')) {
				$content
				.addClass('locked')
				.removeClass('unlocked')
				.children('span.opened')
				.text(1)
				.siblings('span.command')
				.children('span.command-lock')
				.children('i')
				.addClass('icon-locked')
				.removeClass('icon-unlocked');
			}
		}
	} //}}}
	//
	$(function() {
			// LOGIN
			// #login で submit //{{{
			$(document).on('tap', '#login a.button-submit', function() {
					var email = $('#login input[type="email"]').val();
					var password = $('#login input[type="password"]').val();
					setLogin(email, password);
			}); //}}}
			// SIGNUP
			// #signup で submit //{{{
			$(document).on('tap', '#signup a.button-submit', function() {
					var $self = $(this);
					var email = $('#signup input[name="email"]').val();
					var password = $('#signup input[name="password"]').val();
					var username = $('#signup input[name="username"]').val();
					if ($self.hasClass('button-disabled')) {
						alert('利用規約およびプライバシーポリシーに同意する必要があります');
						return false;
					} else if (password.length < 6) {
						alert('パスワードは6文字以上必要です');
					} else {
						setLoading('#signup', 'div');
						$.when(accountPost(email, password, username)).done(function(data1) {
								setAccountPost(data1, email, password);
						}).fail(function() {
								setAccountPost('500');
						});
					}
			}); //}}}
			// #signup でチェックボックスを change //{{{
			$(document).on('change', '#signup input[type="checkbox"]', function() {
					var $self = $(this);
					if ($self.is(':checked') === true) {
						$('#signup div.box a.button').removeClass('button-disabled');
					} else {
						$('#signup div.box a.button').addClass('button-disabled');
					}
			}); //}}}
			// REMIND
			// #remind で submit //{{{
			$(document).on('tap', '#remind a.button-submit', function() {
					var email = $('#remind input[type="email"]').val();
					if (email === '') {
						alert('');
						return false;
					} else {
						setLoading('#remind', 'div');
						$.when(passwordEntry(email)).done(function(data1) {
								setPasswordEntry(data1);
						}).fail(function() {
								setPasswordEntry('500');
						});
					}
			}); //}}}
			// ACCOUNT
			// #account でログアウト //{{{
			$(document).on('tap', '#account a.logout', function() {
					if (confirm('本当にログアウトしますか？')) {
						$.mobile.changePage('#logout');
					}
					return false;
			}); //}}}
			// HEADER
			// [data-role='page'] header span.header-left a tap //{{{
			$(document).on('tap', '[data-role="page"] header span.header-left a', function(e) {
					var page_id_current = location.hash;
					var $self = $(this);
					var parent_no;
					if ((page_id_current === '#content') && ($self.attr('href') === '#content')) {
						parent_no = $('#content div.parent > span.parent-no').text();
						localStorage.setItem('content_no', parent_no);
						$.when(
							contentGet(parent_no),
							childGet(parent_no)
						).done(function(data1, data2) {
								setParentGet(data1);
								setChildGet(data2);
						}).fail(function() {
								// ToDo : 
						});
					} else {
					}
			}); //}}}
			// [data-role='dialog'] header span.header-left a tap //{{{
			$(document).on('tap', '[data-role="dialog"] header span.header-left a', function(e) {
					$('.ui-dialog').dialog('close');
					return false;
			}); //}}}
			// header span.header-right a tap //{{{
			$(document).on('tap', 'header span.header-right a', function() {
					var $self = $(this);
					var page_id_current = location.hash;
					var parent_no = $(page_id_current).find('div.parent').children('span.content-no').text();
					localStorage.setItem('page_id_target', page_id_current);
					localStorage.setItem('parent_no', parent_no);
					if ($self.attr('href') === '#add') {
						if (page_id_current === '#bookmark') {
							$('#add h1').text('ブックマークを作成');
							$('#add input.description').attr('placeholder', 'ブックマーク名を入力してください');
						} else if (page_id_current === '#content') {
							$('#add h1').text('タスクを作成');
							$('#add input.description').attr('placeholder', 'タスクの内容を入力してください');
						} else if (page_id_current === '#group') {
							$('#add h1').text('グループを作成');
							$('#add input.description').attr('placeholder', 'グループ名を入力してください');
						} else if (page_id_current === '#stock') {
							$('#add h1').text('未整理のタスクを作成');
							$('#add input.description').attr('placeholder', 'タスクの内容を入力してください');
						} else if (page_id_current === '#template') {
							$('#add h1').text('テンプレートを作成');
							$('#add input.description').attr('placeholder', 'テンプレート名を入力してください');
						} else if (page_id_current === '#tree') {
							$('#add h1').text('ツリーを作成');
							$('#add input.description').attr('placeholder', 'ツリー名を入力してください');
						}
					}
			}); //}}}
			// header span.command-edit tap //{{{
			$(document).on('tap', '#detail header span.header-right a', function() {
					localStorage.setItem('page_id_target', '#content');
			}); //}}}
			// LIST
			// [data-role='content'] li tap //{{{
			$(document).on('tap', '[data-role="content"] li', function(e) {
					var $self = $(this);
					var page_id_current = location.hash;
					var $page = $(page_id_current);
					if (page_id_current === '#function') {
						$self
						.children('span.link-area')
						.children('a')
						.tap();
					} else if ($self.hasClass('empty')) {
					} else if ($self.hasClass('loading')) {
					} else {
						if ($page.find('span.command').length > 0) {
							if ($self.children('span.command').length > 0) {
								setCommandHide($self);
							} else {
								$page
								.find('span.command')
								.each(function() {
										$.when(setCommandHide($(this).parent('li'))).done(function() {
												setCommandShow(page_id_current, $self);
										});
								});
							}
						} else {
							setCommandShow(page_id_current, $self);
						}
					}
					return false;
			}); //}}}
			// [data-role='content'] li > span.link-area tap //{{{
			$(document).on('tap', '[data-role="content"] li > span.link-area', function() {
					var $self = $(this);
					var $content = $self.parent('li');
					var page_id_current = location.hash;
					var page_id_target = $self.children('a').attr('href');
					var content_no;
					var group_no;
					var group_name;
					if (page_id_current === '#content') {
						$('#content')
						.find('span.header-left')
						.find('a')
						.attr('href', '#content');
						content_no = $content.children('span.content-no').text();
						localStorage.setItem('content_no', content_no);
						$.when(
							contentGet(content_no),
							childGet(content_no)
						).done(function(data1, data2) {
								setParentGet(data1);
								setChildGet(data2);
						}).fail(function() {
								// ToDo : 
						});
					} else if (page_id_current === '#function') {
						$.mobile.changePage(page_id_target, {transition: 'slide'});
					} else if (page_id_current === '#group') {
						group_no = $content.children('span.group-no').text();
						group_name = $content.children('span.description').text();
						localStorage.setItem('group_no', group_no);
						localStorage.setItem('group_name', group_name);
						$.mobile.changePage('#function', {transition: 'slide'});
					} else {
						$('#content')
						.find('span.header-left')
						.find('a')
						.attr('href', page_id_current);
						content_no = $content.children('span.content-no').text();
						localStorage.setItem('content_no', content_no);
						localStorage.setItem('page_id_superior', page_id_current);
						$.mobile.changePage(page_id_target, {transition: 'slide'});
					}
					return false;
			}); //}}}
			// [data-role='content'] li.content > span.check-area tap //{{{
			$(document).on('tap', '[data-role="content"] li.content > span.check-area', function() {
					var page_id_current = location.hash;
					var $self = $(this);
					var $content = $self.parent('li');
					var content_no = $content.children('span.content-no').text();
					var progress_value = parseInt($content.children('span.progress').text().replace('%', ''), 10);
					var child_count = parseInt($content.children('span.child-count').text(), 10);
					if (($content.hasClass('member')) || ($content.hasClass('writer'))) {
						// ToDo : Notice
						alert('このタスクの担当者のみが、このタスクを完了させることができます');
					} else if ($content.hasClass('manager')) {
						if (child_count > 0) {
							// ToDo : Notice
							alert('このタスクを完了させるには、すべての子タスクを完了させる必要があります');
						} else {
							if (progress_value === 0) {
								progress_value = 100;
								$content.children('span.progress').text('100%');
								if ($content.children('span.command').length > 0) {
									$content
									.children('span.command')
									.find('span.command-edit i')
									.addClass('icon-gray')
									.removeClass('icon-white')
									.end()
									.find('span.command-delete i')
									.addClass('icon-gray')
									.removeClass('icon-white');
								}
							} else if (progress_value === 100) {
								progress_value = 0;
								$content.children('span.progress').text('0%');
								if ($content.children('span.command').length > 0) {
									$content
									.children('span.command')
									.find('span.command-edit i')
									.addClass('icon-white')
									.removeClass('icon-gray')
									.end()
									.find('span.command-delete i')
									.addClass('icon-white')
									.removeClass('icon-gray');
								}
							}
							setClass($content);
							setParentProgress();
							$.when(contentCheck(content_no, progress_value)).done(function(data1) {
									setContentCheck(data1, $content);
							}).fail(function() {
									setContentCheck('500');
							});
						}
					}
					return false;
			}); //}}}
			// COMMAND
			// [data-role='content'] li.tree > span.command span.command-archive tap //{{{
			$(document).on('tap', '[data-role="content"] li.tree > span.command > span.command-archive', function() {
					var $self = $(this);
					var $content = $self.parent('span.command').parent('li');
					var tree_no = $content.children('span.tree-no').text();
					if ($content.hasClass('manager')) {
						if (confirm('このツリーを完了しますか?')) {
							$.when(archivePost(tree_no)).done(function(data1) {
									setArchivePost(data1, $content);
							}).fail(function() {
									setArchivePost('500');
							});
						}
					} else {
						// ToDo : Notice
						alert('このツリーの作成者のみが、ツリーを完了することができます');
					}
					return false;
			}); //}}}
			// [data-role='content'] li > span.command span.command-delete tap //{{{
			$(document).on('tap', '[data-role="content"] li > span.command > span.command-delete', function() {
					var page_id_current = location.hash;
					var page_id_superior = localStorage.getItem('page_id_superior');
					var $page = $(page_id_current);
					var $self = $(this);
					var $content = $self.parent('span.command').parent('li');
					var archive_no = $content.children('span.archive-no').text();
					var bookmark_no = $content.children('span.bookmark-no').text();
					var content_no = $content.children('span.content-no').text();
					var group_no = $content.children('span.group-no').text();
					var stock_no = $content.children('span.stock-no').text();
					var template_no = $content.children('span.template-no').text();
					var tree_no = $content.children('span.tree-no').text();
					if (page_id_current === '#content') {
						if (page_id_superior === '#archive') {
							// ToDo : Notice
							alert('完了したツリーのタスクに対して、この操作は実行できません');
							return false;
						} else {
							if ($content.hasClass('checked')) {
								// ToDo : Notice
								alert('完了したタスクを削除することはできません');
							} else if (($content.hasClass('manager')) || ($content.hasClass('writer'))) {
								if (confirm('このタスクを削除しますか?')) {
									$.when(contentDelete(content_no)).done(function(data1) {
											setContentDelete(data1, $content);
									}).fail(function() {
											setContentDelete('500');
									});
								}
							} else {
								// ToDo : Notice
								alert('このタスクの作成者および担当者のみが、このタスクを削除することができます');
							}
						}
					} else {
						if ($content.hasClass('manager')) {
							if (page_id_current === '#archive') {
								if (confirm('この完了したツリーを削除しますか?')) {
									$.when(archiveDelete(archive_no)).done(function(data1) {
											setArchiveDelete(data1, $content);
									}).fail(function() {
											setArchiveDelete('500');
									});
								}
							} else if (page_id_current === '#bookmark') {
								if (confirm('このブックマークを削除しますか?')) {
									$.when(bookmarkDelete(bookmark_no)).done(function(data1) {
											setBookmarkDelete(data1, $content);
									}).fail(function() {
											setBookmarkDelete('500');
									});
								}
							} else if (page_id_current === '#group') {
								if ($content.hasClass('personal')) {
									// ToDo : Notice
									alert('このグループは削除できません');
								} else {
									if (confirm('このグループを削除しますか?')) {
										$.when(groupDelete(group_no)).done(function(data1) {
											setGroupDelete(data1, $content);
										}).fail(function() {
											setGroupDelete('500');
										});
									}
								}
							} else if (page_id_current === '#stock') {
								if (confirm('この未整理のタスクを削除しますか?')) {
									$.when(stockDelete(stock_no)).done(function(data1) {
											setStockDelete(data1, $content);
									}).fail(function() {
											setStockDelete('500');
									});
								}
							} else if (page_id_current === '#template') {
								if (confirm('このテンプレートを削除しますか?')) {
									$.when(templateDelete(template_no)).done(function(data1) {
											setTemplateDelete(data1, $content);
									}).fail(function() {
											setTemplateDelete('500');
									});
								}
							} else if (page_id_current === '#tree') {
								if (confirm('このツリーを削除しますか?')) {
									$.when(treeDelete(tree_no)).done(function(data1) {
											setTreeDelete(data1, $content);
									}).fail(function() {
											setTreeDelete('500');
									});
								}
							}
						} else {
							if (page_id_current === '#archive') {
							} else if (page_id_current === '#group') {
								// ToDo : Notice
								alert('このグループの管理者のみが、グループを削除することができます');
							} else if (page_id_current === '#template') {
								// ToDo : Notice
								alert('このテンプレートの作成者のみが、テンプレートを削除することができます');
							} else if (page_id_current === '#tree') {
								// ToDo : Notice
								alert('このツリーの作成者のみが、ツリーを削除することができます');
							}
						}
					}
					return false;
			}); //}}}
			// [data-role='content'] li > span.command span.command-detail tap //{{{
			$(document).on('tap', '[data-role="content"] li > span.command > span.command-detail', function() {
					var page_id_current = location.hash;
					var $self = $(this);
					var $content = $self.parent('span.command').parent('li');
					var description = $content.children('span.description').text();
					var manager_name = $content.children('span.manager-name').text();
					var writer_name = $content.children('span.writer-name').text();
					var start_date = setDate($content.children('span.start-date').text(), 'client');
					var due_date = setDate($content.children('span.due-date').text(), 'client');
					var add_date = setDateTime($content.children('span.add-date').text(), 'client');
					var edit_date = setDateTime($content.children('span.edit-date').text(), 'client');
					var child_count = $content.children('span.child-count').text();
					var parent_no = $(page_id_current).find('div.parent').children('span.content-no').text();
					localStorage.setItem('parent_no', parent_no);
					$('#detail li.description > span.description').text(description);
					$('#detail li.manager-name > span.description').text(manager_name);
					$('#detail li.writer-name > span.description').text(writer_name);
					$('#detail li.start-date > span.description').text(start_date);
					$('#detail li.due-date > span.description').text(due_date);
					$('#detail li.add-date > span.description').text(add_date);
					$('#detail li.edit-date > span.description').text(edit_date);
					$('#detail li.child-count > span.description').text(child_count);
					$.mobile.changePage('#detail', { transition: 'slideup', role: 'dialog' } );
					return false;
			}); //}}}
			// [data-role='content'] li > span.command span.command-edit tap //{{{
			$(document).on('tap', '[data-role="content"] li > span.command > span.command-edit', function(e) {
					var page_id_current = location.hash;
					var page_id_superior = localStorage.getItem('page_id_superior');
					var $content = $(this).parent('span.command').parent('li');
					var description = $content.children('span.description').text();
					var manager_no;
					var archive_no;
					var bookmark_no;
					var content_no;
					var group_no;
					var stock_no;
					var template_no;
					var tree_no;
					var parent_no = $(page_id_current).find('div.parent').children('span.content-no').text();
					localStorage.setItem('parent_no', parent_no);
					e.stopPropagation(); // 親要素へのイベントのバブリングを無効化
					if (page_id_current === '#content') {
						if (page_id_superior === '#archive') {
							// ToDo : Notice
							alert('完了したツリーのタスクに対して、この操作は実行できません');
							return false;
						} else {
							if ($content.hasClass('checked')) {
								// ToDo : Notice
								alert('完了したタスクを編集することはできません');
							} else if (($content.hasClass('manager')) || ($content.hasClass('writer'))) {
								$('#edit h1').text('タスクの内容を変更');
								content_no = $content.children('span.content-no').text();
								manager_no = $content.children('span.manager-no').text();
								localStorage.setItem('content_no', content_no);
								localStorage.setItem('manager_no', manager_no);
								localStorage.setItem('description', description);
								localStorage.setItem('page_id_target', page_id_current);
								localStorage.setItem('placeholder', '');
								$.mobile.changePage('#edit', { transition: 'slideup', role: 'dialog' } );
							} else {
								// ToDo : Notice
								alert('このタスクの作成者および担当者のみが、このタスクを編集することができます');
							}
						}
					} else {
						if ($content.hasClass('manager')) {
							if (page_id_current === '#archive') {
								$('#edit h1').text('完了したツリーの名前を変更');
								archive_no = $content.children('span.archive-no').text();
								localStorage.setItem('archive_no', archive_no);
							} else if (page_id_current === '#bookmark') {
								$('#edit h1').text('ブックマーク名を変更');
								bookmark_no = $content.children('span.bookmark-no').text();
								localStorage.setItem('bookmark_no', bookmark_no);
							} else if (page_id_current === '#group') {
								$('#edit h1').text('グループ名を変更');
								group_no = $content.children('span.group-no').text();
								localStorage.setItem('group_no', group_no);
							} else if (page_id_current === '#stock') {
								$('#edit h1').text('未整理のタスクの内容を変更');
								stock_no = $content.children('span.stock-no').text();
								localStorage.setItem('stock_no', stock_no);
							} else if (page_id_current === '#template') {
								$('#edit h1').text('テンプレート名を変更');
								template_no = $content.children('span.template-no').text();
								localStorage.setItem('template_no', template_no);
							} else if (page_id_current === '#tree') {
								$('#edit h1').text('ツリー名を変更');
								tree_no = $content.children('span.tree-no').text();
								localStorage.setItem('tree_no', tree_no);
							}
							localStorage.setItem('description', description);
							localStorage.setItem('page_id_target', page_id_current);
							localStorage.setItem('placeholder', '');
							$.mobile.changePage('#edit', { transition: 'slideup', role: 'dialog' } );
						} else {
							if (page_id_current === '#archive') {
								// ToDo : Notice
								alert('この完了したツリーの作成者のみが、完了したツリー名を変更することができます');
							} else if (page_id_current === '#group') {
								// ToDo : Notice
								alert('このグループの管理者のみが、グループ名を変更することができます');
							} else if (page_id_current === '#template') {
								// ToDo : Notice
								alert('このテンプレートの作成者のみが、テンプレート名を変更することができます');
							} else if (page_id_current === '#tree') {
								// ToDo : Notice
								alert('このツリーの作成者のみが、ツリー名を変更することができます');
							}
						}
					}
					return false;
			}); //}}}
			// [data-role='content'] li > span.command span.command-insert tap //{{{
			$(document).on('tap', '[data-role="content"] li > span.command > span.command-insert', function() {
					var $self = $(this);
					var $content = $self.parent('span.command').parent('li');
					var stock_no;
					var template_no;
					var tree_no;
					if ($content.hasClass('manager')) {
						if ($content.hasClass('stock')) {
							stock_no = $content.children('span.stock-no').text();
							localStorage.setItem('page_id_target', '#stock');
							localStorage.setItem('stock_no', stock_no);
							$('#insert h1').text('未整理のタスクをツリーに挿入');
						} else if ($content.hasClass('template')) {
							template_no = $content.children('span.template-no').text();
							localStorage.setItem('page_id_target', '#template');
							localStorage.setItem('template_no', template_no);
							$('#insert h1').text('テンプレートをツリーに挿入');
						} else if ($content.hasClass('tree')) {
							tree_no = $content.children('span.tree-no').text();
							localStorage.setItem('page_id_target', '#tree');
							localStorage.setItem('tree_no', tree_no);
							$('#insert h1').text('ツリーをツリーに挿入');
						}
						$.mobile.changePage('#insert', { transition: 'slideup', role: 'dialog' } );
					} else {
						if ($content.hasClass('tree')) {
							// ToDo : Notice
							alert('このツリーの作成者のみが、ツリーを表示中のツリーに挿入することができます');
						}
					}
					return false;
			}); //}}}
			// [data-role='content'] li > span.command span.command-invite tap //{{{
			$(document).on('tap', '[data-role="content"] li > span.command > span.command-invite', function() {
					var $self = $(this);
					var $content = $self.parent('span.command').parent('li');
					var group_no = $content.children('span.group-no').text();
					localStorage.setItem('group_no', group_no);
					if ($content.hasClass('manager')) {
						$.mobile.changePage('#invite', { transition: 'slideup', role: 'dialog' } );
					} else {
						// ToDo : Notice
						alert('このグループの管理者のみが、グループにメンバーを招待することができます');
					}
					return false;
			}); //}}}
			// [data-role='content'] li > span.command span.command-lock tap //{{{
			$(document).on('tap', '[data-role="content"] li > span.command > span.command-lock', function() {
					var $self = $(this);
					var $content = $self.parent('span.command').parent('li');
					var archive_no;
					var template_no;
					var tree_no;
					var opened;
					var message;
					if ($content.hasClass('manager')) {
						if ($content.hasClass('archive')) {
							if ($content.hasClass('unlocked')) {
								opened = '0';
								message = 'この完了したツリーをグループの他のメンバーに非公開にしますか？';
							} else if ($content.hasClass('locked')) {
								opened = '1';
								message = 'この完了したツリーをグループの他のメンバーに公開しますか？';
							}
							if (confirm(message)) {
								archive_no = $content.children('span.archive-no').text();
								$.when(archiveLock(archive_no, opened)).done(function(data1) {
										setArchiveLock(data1, $content);
								}).fail(function() {
										setArchiveLock('500');
								});
							}
						} else if ($content.hasClass('template')) {
							if ($content.hasClass('unlocked')) {
								opened = '0';
								message = 'このテンプレートをグループの他のメンバーに非公開にしますか？';
							} else if ($content.hasClass('locked')) {
								opened = '1';
								message = 'このテンプレートをグループの他のメンバーに公開しますか？';
							}
							if (confirm(message)) {
								template_no = $content.children('span.template-no').text();
								$.when(templateLock(template_no, opened)).done(function(data1) {
										setTemplateLock(data1, $content);
								}).fail(function() {
										setTemplateLock('500');
								});
							}
						} else if ($content.hasClass('tree')) {
							if ($content.hasClass('unlocked')) {
								opened = '0';
								message = 'このツリーをグループの他のメンバーに非公開にしますか？';
							} else if ($content.hasClass('locked')) {
								opened = '1';
								message = 'このツリーをグループの他のメンバーに公開しますか？';
							}
							if (confirm(message)) {
								tree_no = $content.children('span.tree-no').text();
								$.when(treeLock(tree_no, opened)).done(function(data1) {
										setTreeLock(data1, $content);
								}).fail(function() {
										setTreeLock('500');
								});
							}
						}
					} else {
						if ($content.hasClass('archive')) {
							// ToDo : Notice
							alert('この完了したツリーの作成者のみが公開設定を変更できます');
						} else if ($content.hasClass('template')) {
							// ToDo : Notice
							alert('このテンプレートの作成者のみが公開設定を変更できます');
						} else if ($content.hasClass('tree')) {
							// ToDo : Notice
							alert('このツリーの作成者のみが公開設定を変更できます');
						}
					}
					return false;
			}); //}}}
			// [data-role='content'] li.archive > span.command span.command-undo tap //{{{
			$(document).on('tap', '[data-role="content"] li.archive > span.command > span.command-undo', function() {
					var $self = $(this);
					var $content = $self.parent('span.command').parent('li');
					var archive_no = $content.children('span.archive-no').text();
					if ($content.hasClass('manager')) {
						if (confirm('このツリーの完了を取り消しますか?')) {
							$.when(archiveUndo(archive_no)).done(function(data1) {
									setArchiveUndo(data1, $content);
							}).fail(function() {
									setArchiveUndo('500');
							});
						}
					} else {
						// ToDo : Notice
						alert('この完了したツリーの作成者のみが、このツリーの完了を取り消すことができます');
					}
					return false;
			}); //}}}
			// ADD
			// #add で submit //{{{
			$(document).on('tap', '#add a.button-submit', function() {
					var page_id_target = localStorage.getItem('page_id_target');
					var group_no = localStorage.getItem('group_no');
					var description = $('#add input.description').val();
					var parent_no;
					var manager_no;
					var start_date;
					var due_date;
					if (page_id_target === '#content') {
						parent_no = localStorage.getItem('parent_no');
						manager_no = $('#add').find('select.manager').val();
						start_date = setDateTime($('#add input.start-date').val(), 'server');
						due_date = setDateTime($('#add input.due-date').val(), 'server');
						$.when(contentPost(parent_no, description, manager_no, start_date, due_date)).done(function(data1) {
								setContentPost(data1);
						}).fail(function() {
								setContentPost('500');
						});
					} else if (page_id_target === '#group') {
						$.when(groupPost(description)).done(function(data1) {
								setGroupPost(data1);
						}).fail(function() {
								setGroupPost('500');
						});
					} else if (page_id_target === '#stock') {
						$.when(stockPost(description)).done(function(data1) {
								setStockPost(data1);
						}).fail(function() {
								setStockPost('500');
						});
					} else if (page_id_target === '#template') {
						$.when(templatePost(group_no, description)).done(function(data1) {
								setTemplatePost(data1);
						}).fail(function() {
								setTemplatePost('500');
						});
					} else if (page_id_target === '#tree') {
						$.when(treePost(group_no, description)).done(function(data1) {
								setTreePost(data1);
						}).fail(function() {
								setTreePost('500');
						});
					}
			}); //}}}
			// EDIT
			// #edit で submit //{{{
			$(document).on('tap', '#edit a.button-submit', function() {
					var page_id_target = localStorage.getItem('page_id_target');
					var description = $('#edit').find('input[type="text"]').val();
					var archive_no;
					var bookmark_no;
					var content_no;
					var group_no;
					var stock_no;
					var template_no;
					var tree_no;
					var manager_no;
					var start_date;
					var due_date;
					if (page_id_target === '#archive') {
						archive_no = localStorage.getItem('archive_no');
						$.when(archivePut(archive_no, description)).done(function(data1) {
								setArchivePut(data1);
						}).fail(function() {
								setArchivePut('500');
						});
					} else if (page_id_target === '#bookmark') {
						bookmark_no = localStorage.getItem('bookmark_no');
						$.when(bookmarkPut(bookmark_no, description)).done(function(data1) {
								setBookmarkPut(data1);
						}).fail(function() {
								setBookmarkPut('500');
						});
					} else if (page_id_target === '#content') {
						content_no = localStorage.getItem('content_no');
						manager_no = $('#edit').find('select.manager').val();
						start_date = setDateTime($('#edit input.start-date').val(), 'server');
						due_date = setDateTime($('#edit input.due-date').val(), 'server');
						$.when(contentPut(content_no, description, manager_no, start_date, due_date)).done(function(data1) {
								setContentPut(data1);
						}).fail(function() {
								setContentPut('500');
						});
					} else if (page_id_target === '#group') {
						group_no = localStorage.getItem('group_no');
						$.when(groupPut(group_no, description)).done(function(data1) {
								setGroupPut(data1);
						}).fail(function() {
								setGroupPut('500');
						});
					} else if (page_id_target === '#stock') {
						stock_no = localStorage.getItem('stock_no');
						$.when(stockPut(stock_no, description)).done(function(data1) {
								setStockPut(data1);
						}).fail(function() {
								setStockPut('500');
						});
					} else if (page_id_target === '#template') {
						template_no = localStorage.getItem('template_no');
						$.when(templatePut(template_no, description)).done(function(data1) {
								setTemplatePut(data1);
						}).fail(function() {
								setTemplatePut('500');
						});
					} else if (page_id_target === '#tree') {
						tree_no = localStorage.getItem('tree_no');
						$.when(treePut(tree_no, description)).done(function(data1) {
								setTreePut(data1);
						}).fail(function() {
								setTreePut('500');
						});
					}
			}); //}}}
			// INSERT
			// #insert で submit //{{{
			$(document).on('tap', '#insert a.button-submit', function() {
					var page_id_target = localStorage.getItem('page_id_target');
					var stock_no = localStorage.getItem('stock_no');
					var template_no = localStorage.getItem('template_no');
					var tree_no = localStorage.getItem('tree_no');
					var parent_no = $('#insert select.tree option:selected').attr('name');
					var description = $('#insert select.tree option:selected').text();
					var order_no = 0; // ToDo : きちんとした値を入れる
					if (page_id_target === '#stock') {
						if (confirm('この未整理のタスクをツリー「' + description + '」に挿入しますか？')) {
							$.when(stockInsert(stock_no, parent_no, order_no)).done(function(data1) {
									setStockInsert(data1);
							}).fail(function() {
									setStockInsert('500');
							});
						}
					} else if (page_id_target === '#template') {
						if (confirm('このテンプレートをツリー「' + description + '」に挿入しますか？')) {
							$.when(templateInsert(template_no, parent_no, order_no)).done(function(data1) {
									setTemplateInsert(data1);
							}).fail(function() {
									setTemplateInsert('500');
							});
						}
					} else if (page_id_target === '#tree') {
						if (confirm('このツリーをツリー「' + description + '」に挿入しますか？')) {
							$.when(treeInsert(tree_no, parent_no, order_no)).done(function(data1) {
									setTreeInsert(data1);
							}).fail(function() {
									setTreeInsert('500');
							});
						}
					}
			}); //}}}
			// INVITE
			// #invite で submit //{{{
			$(document).on('tap', '#invite a.button-submit', function() {
					var group_no = $('#invite select.group option:selected').val();
					var group_name = $('#invite select.group option:selected').text();
					var toaddress = $('#invite input[type="email"]').val();
					var message = $('#invite input[type="text"]').val();
					var manager_name = localStorage.getItem('account_name');
					$.when(entryPost(group_no, toaddress, message, group_name, manager_name)).done(function(data1) {
							setEntryPost(data1, toaddress, group_name);
					}).fail(function() {
							setEntryPost('500');
					});
					return false;
			}); //}}}
			// Pageinit
			// HP
			// #home pageinit //{{{
			$(document).on('pageinit', '#home', function() {
					var email = localStorage.getItem('email');
					var password = localStorage.getItem('password');
					setTimeout(function() {
							setLogin(email, password);
						}, 1000
					);
			}); //}}}
			// #login pageinit //{{{
			$(document).on('pageinit', '#login', function() {
			}); //}}}
			// #remind pageinit //{{{
			$(document).on('pageinit', '#remind', function() {
			}); //}}}
			// #signup pageinit //{{{
			$(document).on('pageinit', '#signup', function() {
			}); //}}}
			// APP
			// #archive pageinit //{{{
			$(document).on('pageinit', '#archive', function() {
					setLoading('#archive ul', 'list');
			}); //}}}
			// #bookmark pageinit //{{{
			$(document).on('pageinit', '#bookmark', function() {
					setLoading('#bookmark ul', 'list');
			}); //}}}
			// #content pageinit //{{{
			$(document).on('pageinit', '#content', function() {
					setLoading('#content ul', 'list');
			}); //}}}
			// #function pageinit //{{{
			$(document).on('pageinit', '#function', function() {
			}); //}}}
			// #group pageinit //{{{
			$(document).on('pageinit', '#group', function() {
					setLoading('#group ul', 'list');
			}); //}}}
			// #stock pageinit //{{{
			$(document).on('pageinit', '#stock', function() {
					setLoading('#stock ul', 'list');
			}); //}}}
			// #template pageinit //{{{
			$(document).on('pageinit', '#template', function() {
					setLoading('#template ul', 'list');
			}); //}}}
			// #tree pageinit //{{{
			$(document).on('pageinit', '#tree', function() {
					setLoading('#tree ul', 'list');
			}); //}}}
			// Page Beforeshow
			// APP
			// [data-page-type='app'] pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '[data-page-type="app"]', function() {
					var page_id_current = location.hash;
					var html = '<div id="notice"></div>';
					$(page_id_current)
					.find('header')
					.prepend(html);
			}); //}}}
			// #account pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#account', function() {
					var email = localStorage.getItem('email');
					$('#account h1').text(email);
					$.when(accountGet()).done(function(data1) {
							setAccountGet(data1);
					}).fail(function() {
							setAccountGet('500');
					});
			}); //}}}
			// #archive pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#archive', function() {
					var group_no = localStorage.getItem('group_no');
					var group_name = localStorage.getItem('group_name');
					$('#archive h1').text(group_name);
					$.when(archiveGet(group_no)).done(function(data1) {
							setArchiveGet(data1);
					}).fail(function() {
							setArchiveGet('500');
					});
			}); //}}}
			// #bookmark pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#bookmark', function() {
					var group_no = localStorage.getItem('group_no');
					var group_name = localStorage.getItem('group_name');
					$('#bookmark h1').text(group_name);
					$.when(bookmarkGet(group_no)).done(function(data1) {
							setBookmarkGet(data1);
					}).fail(function() {
							setBookmarkGet('500');
					});
			}); //}}}
			// #content pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#content', function() {
					var page_id_current = location.hash;
					var page_id_superior = localStorage.getItem('page_id_superior');
					var content_no = localStorage.getItem('content_no');
					var group_name = localStorage.getItem('group_name');
					$('#content h1').text(group_name);
					if (page_id_superior === '#archive') {
						$(page_id_current)
						.find('header')
						.children('span.header-right')
						.children('a')
						.hide();
					} else {
						$(page_id_current)
						.find('header')
						.children('span.header-right')
						.children('a')
						.show();
					}
					$.when(
						contentGet(content_no),
						childGet(content_no)
					).done(function(data1, data2) {
							setParentGet(data1);
							setChildGet(data2);
					}).fail(function() {
							// ToDo : 
					});
			}); //}}}
			// #function pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#function', function() {
					var group_name = localStorage.getItem('group_name');
					$('#function h1').text(group_name);
			}); //}}}
			// #group pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#group', function() {
					localStorage.setItem('account_no', '');
					localStorage.setItem('account_name', '');
					localStorage.setItem('group_no', '');
					$('#group h1').text(localStorage.getItem('email'));
					$.when(
						accountGet(),
						groupGet('list')
					).done(function(data1, data2) {
							setAccountGet(data1);
							setGroupGet(data2, '#group ul');
					}).fail(function() {
							// ToDo : 
							setAccountGet('500');
							setGroupGet('500');
					});
			}); //}}}
			// #logout pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#logout', function() {
					localStorage.clear();
					$.mobile.changePage('#login');
			}); //}}}
			// #stock pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#stock', function() {
					var group_name = localStorage.getItem('group_name');
					$('#stock h1').text(group_name);
					$.when(stockGet()).done(function(data1) {
							setStockGet(data1);
					}).fail(function() {
							setStockGet('500');
					});
			}); //}}}
			// #template pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#template', function() {
					var group_no = localStorage.getItem('group_no');
					var group_name = localStorage.getItem('group_name');
					$('#template h1').text(group_name);
					$.when(templateGet(group_no)).done(function(data1) {
							setTemplateGet(data1);
					}).fail(function() {
							setTemplateGet('500');
					});
			}); //}}}
			// #tree pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#tree', function() {
					var group_no = localStorage.getItem('group_no');
					var group_name = localStorage.getItem('group_name');
					$('#tree h1').text(group_name);
					$.when(treeGet(group_no, 'list')).done(function(data1) {
							setTreeGet(data1, '#tree ul');
					}).fail(function() {
							setTreeGet('500');
					});
			}); //}}}
			// DIALOG
			// #add pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#add', function() {
					var group_no = localStorage.getItem('group_no');
					var account_no = localStorage.getItem('account_no');
					var page_id_target = localStorage.getItem('page_id_target');
					if (page_id_target === '#content') {
						$('#add')
						.find('div.ui-select')
						.show()
						.end()
						.find('div.ui-input-text')
						.show();
						$.when(memberGet(group_no, 'select')).done(function(data1) {
								setMemberGet(data1, '#add select.manager');
								$('#add')
								.find('select')
								.val(account_no)
								.selectmenu('refresh', true);
						}).fail(function() {
								setMemberGet('500');
						});
					} else {
						$('#add')
						.find('div.ui-select')
						.hide()
						.end()
						.find('div.ui-input-text')
						.hide();
					}
			}); //}}}
			// #edit pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#edit', function() {
					var $self;
					var page_id_target = localStorage.getItem('page_id_target');
					var group_no = localStorage.getItem('group_no');
					var description = localStorage.getItem('description');
					var manager_no = localStorage.getItem('manager_no');
					var start_date;
					var due_date;
					$('#edit input.description').val(description);
					if (page_id_target === '#content') {
						$('#edit')
						.find('div.ui-select')
						.show()
						.end()
						.find('div.ui-input-text')
						.show();
						$.when(memberGet(group_no, 'select')).done(function(data1) {
								setMemberGet(data1, '#edit select.manager');
								$('#edit')
								.find('select')
								.val(manager_no)
								.selectmenu('refresh', true);
						}).fail(function() {
								setMemberGet('500');
						});
					} else {
						$('#edit')
						.find('div.ui-select')
						.hide()
						.end()
						.find('div.ui-input-text')
						.hide();
					}
			}); //}}}
			// #insert pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#insert', function() {
					var group_no = localStorage.getItem('group_no');
					$.when(treeGet(group_no, 'select')).done(function(data1) {
							setTreeGet(data1, '#insert select.tree');
					}).fail(function() {
							setTreeGet('500');
					});
			}); //}}}
			// #invite pagebeforeshow //{{{
			$(document).on('pagebeforeshow', '#invite', function() {
					var group_no = localStorage.getItem('group_no');
					$.when(groupGet('select')).done(function(data1) {
							setGroupGet(data1, '#invite select.group');
							$('#invite select.group')
							.val(group_no)
							.selectmenu('refresh');
					}).fail(function() {
							setGroupGet('500');
					});
			}); //}}}
			// Page Beforehide
			// APP
			// [data-page-type='app'] pagebeforehide //{{{
			$(document).on('pagebeforehide', '[data-page-type="app"]', function() {
					$('#notice').remove();
			}); //}}}
			// DIALOG
			// [data-role='dialog'] pagebeforehide //{{{
			$(document).on('pagebeforehide', '[data-role="dialog"]', function() {
					var parent_no = localStorage.getItem('parent_no');
					localStorage.setItem('content_no', parent_no);
			}); //}}}
			// Page Hide
			// HP
			// #signup pagehide //{{{
			$(document).on('pagehide', '#signup', function() {
				$('div.loading').remove();
			}); //}}}
			// APP
			// #archive pagehide //{{{
			$(document).on('pagehide', '#archive', function() {
					setLoading('#archive ul', 'list');
			}); //}}}
			// #bookmark pagehide //{{{
			$(document).on('pagehide', '#bookmark', function() {
					setLoading('#archive ul', 'list');
			}); //}}}
			// #content pagehide //{{{
			$(document).on('pagehide', '#content', function() {
					setLoading('#content ul', 'list');
					$('#content')
					.find('div.parent')
					.children('span.description')
					.text('')
					.siblings('span.progress')
					.text('');
			}); //}}}
			// #group pagehide //{{{
			$(document).on('pagehide', '#group', function() {
					setLoading('#group ul', 'list');
			}); //}}}
			// #stock pagehide //{{{
			$(document).on('pagehide', '#stock', function() {
					setLoading('#stock ul', 'list');
			}); //}}}
			// #template pagehide //{{{
			$(document).on('pagehide', '#template', function() {
					setLoading('#template ul', 'list');
			}); //}}}
			// #tree pagehide //{{{
			$(document).on('pagehide', '#tree', function() {
					setLoading('#tree ul', 'list');
			}); //}}}
			// DIALOG
			// #add pagehide //{{{
			$(document).on('pagehide', '#add', function() {
					$('#add input.description').val('');
					$('#add select.manager')
					.empty()
					.selectmenu('refresh', true)
					.parent()
					.find('.ui-btn-text')
					.html('');
					$('#add input.start-date')
					.val('')
					.datebox('refresh');
					$('#add input.due-date')
					.val('')
					.datebox('refresh');
			}); //}}}
			// #edit pagehide //{{{
			$(document).on('pagehide', '#edit', function() {
					$('#edit input.description').val('');
					$('#edit select.manager')
					.empty()
					.selectmenu('refresh', true)
					.parent()
					.find('.ui-btn-text')
					.html('');
					$('#edit input.start-date')
					.val('')
					.datebox('refresh');
					$('#edit input.due-date')
					.val('')
					.datebox('refresh');
			}); //}}}
			// #insert pagehide //{{{
			$(document).on('pagehide', '#insert', function() {
					$('#insert select.tree')
					.empty()
					.selectmenu('refresh', true)
					.parent()
					.find('.ui-btn-text')
					.html('');
			}); //}}}
	});


'use strict';$(document).bind('mobileinit',function(){$.extend($.mobile,{loadingMessage:false})});


/* vim:set foldmethod=marker: */
'use strict';
//
function setLayout(){
	var pageH = window.innerHeight;
	var pageW = window.innerWidth;
	if (window.devicePixelRatio > 0) {
		pageH = pageH * window.devicePixelRatio;
		pageW = pageW * window.devicePixelRatio;
	}
}
$(document).on('pageinit', '[data-role=page]', function(){
		setLayout();
});
$(window).resize(function(){
		setLayout();
});


'use strict';function accountGet(){var b=$.Deferred();var c=localStorage.getItem('email');var d=localStorage.getItem('password');$.ajax({type:'GET',url:'https://www.taskman.ne.jp/sp/account',dataType:'html',cache:'false',data:{email:c,password:d,format:'xml',method:'get'}}).done(function(a){b.resolve(a)}).fail(function(){b.reject()});return b.promise()}function accountPost(b,c,d){var e=$.Deferred();$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/account',dataType:'html',cache:'false',data:{email:b,format:'xml',method:'post',password:c,username:d}}).done(function(a){e.resolve(a)}).fail(function(){e.reject()});return e.promise()}function accountPut(){var b=$.Deferred();var c=localStorage.getItem('email');var d=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/account',dataType:'html',cache:'false',data:{email:c,format:'xml',method:'put',password:d}}).done(function(a){b.resolve(a)}).fail(function(){b.reject()});return b.promise()}function accountDelete(){var b=$.Deferred();var c=localStorage.getItem('email');var d=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/account',dataType:'html',cache:'false',data:{email:c,format:'xml',method:'delete',password:d}}).done(function(a){b.resolve(a)}).fail(function(){b.reject()});return b.promise()}function archiveGet(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'GET',url:'https://www.taskman.ne.jp/sp/archive',dataType:'html',cache:'false',data:{email:d,groupno:b,password:e,format:'xml',method:'get'}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function archivePost(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/archive',dataType:'html',cache:'false',data:{email:d,format:'xml',method:'post',password:e,treeno:b}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function archivePut(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/archive',dataType:'html',cache:'false',data:{description:c,email:e,format:'xml',archiveno:b,method:'put',password:f}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}function archiveDelete(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/archive',dataType:'html',cache:'false',data:{email:d,format:'xml',archiveno:b,method:'delete',password:e}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function archiveLock(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/archive',dataType:'html',cache:'false',data:{archiveno:b,email:e,format:'xml',method:'lock',opened:c,password:f}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}function archiveUndo(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/archive',dataType:'html',cache:'false',data:{archiveno:b,email:d,format:'xml',method:'undo',password:e}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function bookmarkGet(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'GET',url:'https://www.taskman.ne.jp/sp/bookmark',dataType:'html',cache:'false',data:{email:d,groupno:b,password:e,format:'xml',method:'get'}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function bookmarkPost(){var b=$.Deferred();var c=localStorage.getItem('email');var d=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/bookmark',dataType:'html',cache:'false',data:{email:c,format:'xml',method:'post',password:d}}).done(function(a){b.resolve(a)}).fail(function(){b.reject()});return b.promise()}function bookmarkPut(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/bookmark',dataType:'html',cache:'false',data:{bookmarkno:b,description:c,email:e,format:'xml',method:'put',password:f}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}function bookmarkDelete(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/bookmark',dataType:'html',cache:'false',data:{bookmarkno:b,email:d,format:'xml',method:'delete',password:e}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function childGet(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'GET',url:'https://www.taskman.ne.jp/sp/content',dataType:'html',cache:'false',data:{child:true,contentno:b,email:d,format:'xml',method:'get',password:e}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function contentGet(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'GET',url:'https://www.taskman.ne.jp/sp/content',dataType:'html',cache:'false',data:{child:false,contentno:b,email:d,format:'xml',method:'get',password:e}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function contentPost(b,c,d,e,f){var g=$.Deferred();var h=localStorage.getItem('email');var i=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/content',dataType:'html',cache:'false',data:{description:c,duedate:f,email:h,format:'xml',managerno:d,method:'post',parentno:b,password:i,startdate:e}}).done(function(a){g.resolve(a)}).fail(function(){g.reject()});return g.promise()}function contentPut(b,c,d,e,f){var g=$.Deferred();var h=localStorage.getItem('email');var i=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/content',dataType:'html',cache:'false',data:{contentno:b,description:c,duedate:f,email:h,format:'xml',managerno:d,method:'put',password:i,startdate:e}}).done(function(a){g.resolve(a)}).fail(function(){g.reject()});return g.promise()}function contentCheck(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/content',dataType:'html',cache:'false',data:{contentno:b,email:e,format:'xml',method:'check',password:f,progress:c}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}function contentDelete(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/content',dataType:'html',cache:'false',data:{contentno:b,email:d,format:'xml',method:'delete',password:e}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function entryPost(b,c,d,e,f){var g=$.Deferred();var h=localStorage.getItem('email');var i=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/entry',dataType:'html',cache:'false',data:{email:h,format:'xml',groupname:e,groupno:b,managername:f,message:d,method:'post',password:i,toaddress:c}}).done(function(a){g.resolve(a)}).fail(function(){g.reject()});return g.promise()}function groupGet(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'GET',url:'https://www.taskman.ne.jp/sp/group',dataType:'html',cache:'false',data:{email:d,format:'xml',method:'get',password:e,xsltype:b}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function groupPost(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/group',dataType:'html',cache:'false',data:{description:b,email:d,format:'xml',method:'post',password:e}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function groupPut(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/group',dataType:'html',cache:'false',data:{description:c,email:e,format:'xml',groupno:b,method:'put',password:f}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}function groupDelete(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/group',dataType:'html',cache:'false',data:{email:d,format:'xml',groupno:b,method:'delete',password:e}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function memberGet(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'GET',url:'https://www.taskman.ne.jp/sp/member',dataType:'html',cache:'false',data:{email:e,format:'xml',groupno:b,method:'get',password:f,xsltype:c}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}function passwordEntry(b){var c=$.Deferred();$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/password',dataType:'html',cache:'false',data:{email:b,format:'xml',method:'post'}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function stockGet(){var b=$.Deferred();var c=localStorage.getItem('email');var d=localStorage.getItem('password');$.ajax({type:'GET',url:'https://www.taskman.ne.jp/sp/stock',dataType:'html',cache:'false',data:{email:c,password:d,format:'xml',method:'get'}}).done(function(a){b.resolve(a)}).fail(function(){b.reject()});return b.promise()}function stockPost(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/stock',dataType:'html',cache:'false',data:{description:b,email:d,format:'xml',method:'post',password:e}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function stockPut(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/stock',dataType:'html',cache:'false',data:{description:c,email:e,format:'xml',method:'put',password:f,stockno:b}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}function stockDelete(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/stock',dataType:'html',cache:'false',data:{email:d,format:'xml',method:'delete',password:e,stockno:b}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function stockInsert(b,c,d){var e=$.Deferred();var f=localStorage.getItem('email');var g=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/stock',dataType:'html',cache:'false',data:{email:f,format:'xml',method:'insert',orderno:d,parentno:c,password:g,stockno:b}}).done(function(a){e.resolve(a)}).fail(function(){e.reject()});return e.promise()}function templateGet(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'GET',url:'https://www.taskman.ne.jp/sp/template',dataType:'html',cache:'false',data:{email:d,groupno:b,password:e,format:'xml',method:'get'}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function templatePost(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/template',dataType:'html',cache:'false',data:{description:c,email:e,format:'xml',groupno:b,method:'post',password:f}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}function templatePut(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/template',dataType:'html',cache:'false',data:{description:c,email:e,format:'xml',method:'put',password:f,templateno:b}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}function templateDelete(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/template',dataType:'html',cache:'false',data:{email:d,format:'xml',method:'delete',password:e,templateno:b}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function templateInsert(b,c,d){var e=$.Deferred();var f=localStorage.getItem('email');var g=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/template',dataType:'html',cache:'false',data:{email:f,format:'xml',method:'insert',orderno:d,parentno:c,password:g,templateno:b}}).done(function(a){e.resolve(a)}).fail(function(){e.reject()});return e.promise()}function templateLock(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/template',dataType:'html',cache:'false',data:{email:e,format:'xml',method:'lock',opened:c,password:f,templateno:b}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}function treeGet(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'GET',url:'https://www.taskman.ne.jp/sp/tree',dataType:'html',cache:'false',data:{email:e,groupno:b,password:f,format:'xml',method:'get',xsltype:c}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}function treePost(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/tree',dataType:'html',cache:'false',data:{description:c,email:e,format:'xml',groupno:b,method:'post',password:f}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}function treePut(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/tree',dataType:'html',cache:'false',data:{description:c,email:e,format:'xml',method:'put',password:f,treeno:b}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}function treeDelete(b){var c=$.Deferred();var d=localStorage.getItem('email');var e=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/tree',dataType:'html',cache:'false',data:{email:d,format:'xml',method:'delete',password:e,treeno:b}}).done(function(a){c.resolve(a)}).fail(function(){c.reject()});return c.promise()}function treeInsert(b,c,d){var e=$.Deferred();var f=localStorage.getItem('email');var g=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/tree',dataType:'html',cache:'false',data:{email:f,format:'xml',method:'insert',orderno:d,parentno:c,password:g,treeno:b}}).done(function(a){e.resolve(a)}).fail(function(){e.reject()});return e.promise()}function treeLock(b,c){var d=$.Deferred();var e=localStorage.getItem('email');var f=localStorage.getItem('password');$.ajax({type:'POST',url:'https://www.taskman.ne.jp/sp/tree',dataType:'html',cache:'false',data:{email:e,format:'xml',method:'lock',opened:c,password:f,treeno:b}}).done(function(a){d.resolve(a)}).fail(function(){d.reject()});return d.promise()}
