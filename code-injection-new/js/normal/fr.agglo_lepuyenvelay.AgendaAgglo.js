



	
	$(document).ajaxStart(function(){
	  $('.ui-loader').show();
	});
	$(document).ajaxStop(function(){
	  $('.ui-loader').hide();
	});
	
	$('#close_lightbox').click(function(){
	  close_lightbox_f();
	});
  

var base_url = 'http://www.ot-lepuyenvelay.fr/services/appli-agenda/';
var date_now = new Date();
var heure_tmp = date_now.getHours();
var minute_tmp = date_now.getMinutes();
var jour_tmp = date_now.getDate();
var mois_tmp = (date_now.getMonth())+1;
var annee = date_now.getFullYear();
var heure = date_js(heure_tmp);
var minute = date_js(minute_tmp);
var jour = date_js(jour_tmp);
var mois = date_js(mois_tmp);
var date_today = jour+'/'+mois+'/'+annee+' '+heure+':'+minute;
var local = false;
var local_data;

$(document).ready(function() {
  var online = navigator.onLine;
  if(online)
  {
	if(localStorage)
	{
	  getlocal();
	}
	$('.last_up').html('Dernière synchronisation effectuée le '+date_today);
  }
  else
  {
	local = true;
	if(localStorage)
	{
	  if(localStorage['local_data'] != undefined && localStorage['local_data_up'] != undefined)
	  {
		$('.last_up').html('Dernière synchronisation effectuée le '+localStorage['local_data_up']);
		local_data = JSON.parse(localStorage['local_data']);
	  }
	  else
		alert('Vous n\'êtes pas connecté à internet et vous n\'avez pas téléchargé l\'agenda localement sur votre terminal.');
	}
	else
	  alert('Votre terminal ne dispose pas des dernières mises à jour ou n\'est pas assez récent pour pouvoir utiliser l\'application en mode hors conexion.');
  }
});

(function($){
  
  /*$(document).bind('pagebeforecreate', function(e){
	var $page = $(e.target);
    
    if($page.attr('data-role')!='page'){
        return;
    }
    var idPage = $page.attr('id');
  });*/
  
  $(document).bind('pagebeforeshow', function(e){
	/*if(local_data != undefined && local_data != null)
	  console.log(local_data);*/
	var $page = $(e.target);
    
    if($page.attr('data-role')!='page'){
        return;
    }
    var idPage = $page.attr('id');
	if(idPage == 'spotlight') {
	  if(!local)
		get_spotlight();
	  else
		get_spotlight_local();
	}
	if(idPage == 'p-what')
	  if(!local)
		get_themes();
	  else
		get_themes_local();
	if(idPage == 'p-where')
	  if(!local)
		get_villes();
	  else
		get_villes_local();
  });
})(jQuery);

function ajaxFail(jqXHR, textStatus) {
  alert("Erreur réseau.\nMerci de réessayer.");
}

function fail_req() {
  alert("Une erreur est survenue.\nMerci de réessayer ultérieurement.");
}

function get_spotlight() {
  //console.log('get_spotlight');
  var dataAjax = {page:'spotlight'}
  var request = $.ajax({
    url: base_url+"ajax.php",
    type: "POST",
    data: dataAjax
  });
  
  request.done(function(response) {
	if(response != 'false')
	  $('#spotlight .content').html(response);
	else
	  fail_req();
  });
  
  request.fail(ajaxFail);
}

function get_spotlight_local() {
  //console.log('get_spotlight_local');
  if(local_data != undefined) {
	$('#spotlight .content').html('');
	$.each(local_data.spotlights, function(key, val) {
	  var str_tel = '';
	  if(val.telephone != null && val.telephone != '')
		str_tel = '<a href="tel:'+val.telephone+'" class="tel">'+val.telephone+'</a>';
	  $('#spotlight .content').append('<div class="elm_spotlight" onclick="show_details_actu_local('+key+')"><p class="dates">'+val.date+'</p><h2>'+val.nom_manifestation+'</h2><p class="desc">'+val.descriptif+'</p><p class="zone">'+val.commune+'</p>'+str_tel+'</div>');
	});
  }
}

function get_themes() {
  //console.log('get_themes');
  var dataAjax = {page:'p-what'}
  var request = $.ajax({
    url: base_url+"ajax.php",
    type: "POST",
    data: dataAjax
  });
  
  request.done(function(response) {
	if(response != 'false')
	  $('#p-what .content').html(response);
	else
	  fail_req();
  });
  
  request.fail(ajaxFail);
}

function get_themes_local() {
  //console.log('get_themes_local');
  if(local_data != undefined && local_data != null) {
	$('#p-what .content').html('');
	$.each(local_data.themes, function(key, val) {
	  $('#p-what .content').append('<div class="elm_theme" onclick="check_theme_local('+key+')"><h2>'+val.libelle+'</h2></div>');
	});
	//$.mobile.changePage('#p-what', {transition:'slide'});
  }
}

function check_theme(id) {
  //console.log('check_theme');
  var dataAjax = {page:'p-what-details',id_theme:id}
  var request = $.ajax({
    url: base_url+"ajax.php",
    type: "POST",
    data: dataAjax
  });
  
  request.done(function(response) {
	if(response != 'false') {
	  $('#p-what-details .content').html(response);
	  $.mobile.changePage('#p-what-details', {transition:'slide'});
	}
	else {
	  fail_req();
	}
  });
  
  request.fail(ajaxFail);
}

function check_theme_local(id) {
  //console.log('check_theme_local');
  if(local_data != undefined && local_data != null) {
	if(local_data.themes[id] != undefined) {
	  $('#p-what-details .content').html('');
	  $('#p-what-details .content').html('<div class="title_category"><h3>'+local_data.themes[id].libelle+'</h3></div>');
	  $.each(local_data.themes[id].actus, function(key, val) {
		var str_tel = '';
		if(val.telephone != null && val.telephone != '')
		  str_tel = '<a href="tel:'+val.telephone+'" class="tel">'+val.telephone+'</a>';
		$('#p-what-details .content').append('<div class="elm_spotlight" onclick="show_details_actu_local('+key+')"><p class="dates">'+val.date+'</p><h2>'+val.nom_manifestation+'</h2><p class="desc">'+val.descriptif+'</p><p class="zone">'+val.commune+'</p>'+str_tel+'</div>');
	  });
	  $.mobile.changePage('#p-what-details', {transition:'slide'});
	}
  }
}

function get_villes() {
  //console.log('get_villes');
  var dataAjax = {page:'p-where'}
  var request = $.ajax({
    url: base_url+"ajax.php",
    type: "POST",
    data: dataAjax
  });
  
  request.done(function(response) {
	if(response != 'false')
	  $('#p-where .content').html(response);
	else
	  fail_req();
  });
  
  request.fail(ajaxFail);
}

function get_villes_local() {
  //console.log('get_villes_local');
  if(local_data != undefined && local_data != null) {
	$('#p-where .content').html('');
	$.each(local_data.villes, function(key, val) {
	  $('#p-where .content').append('<div class="elm_theme" onclick="check_ville_local('+key+')"><h2>'+val.libelle+'</h2></div>');
	});
	//$.mobile.changePage('#p-where', {transition:'slide'});
  }
}

function check_ville(ville) {
  //console.log('check_ville');
  var dataAjax = {page:'p-where-details',ville:ville}
  var request = $.ajax({
    url: base_url+"ajax.php",
    type: "POST",
    data: dataAjax
  });
  
  request.done(function(response) {
	if(response != 'false') {
	  $('#p-where-details .content').html(response);
	  $.mobile.changePage('#p-where-details', {transition:'slide'});
	}
	else {
	  fail_req();
	}
  });
  
  request.fail(ajaxFail);
}

function check_ville_local(id) {
  //console.log('check_ville_local');
  if(local_data != undefined && local_data != null) {
	if(local_data.villes[id] != undefined) {
	  $('#p-where-details .content').html('');
	  $('#p-where-details .content').html('<div class="title_category"><h3>'+local_data.villes[id].libelle+'</h3></div>');
	  $.each(local_data.villes[id].actus, function(key, val) {
		var str_tel = '';
		if(val.telephone != null && val.telephone != '')
		  str_tel = '<a href="tel:'+val.telephone+'" class="tel">'+val.telephone+'</a>';
		$('#p-where-details .content').append('<div class="elm_spotlight" onclick="show_details_actu_local('+key+')"><p class="dates">'+val.date+'</p><h2>'+val.nom_manifestation+'</h2><p class="desc">'+val.descriptif+'</p><p class="zone">'+val.commune+'</p>'+str_tel+'</div>');
	  });
	  $.mobile.changePage('#p-where-details', {transition:'slide'});
	}
  }
}

function check_date(type)
{
  //console.log('check_date');
  if(!local)
  {
	if(type == 5)
	{
	  $.mobile.changePage('#p-when-plage', {transition:'slide'});
	}
	else
	{
	  var dataAjax = {page:'p-when-details',type:type}
	  var request = $.ajax({
		url: base_url+"ajax.php",
		type: "POST",
		data: dataAjax
	  });
	  
	  request.done(function(response) {
		console.log(response);
		if(response == 'false')
		{
		  fail_req();
		}
		else if(response == 'Aucun évènement')
		{
		  alert('Aucun évènement');
		}
		else
		{
		  $('#p-when-details .content').html(response);
		  $.mobile.changePage('#p-when-details', {transition:'slide'});
		}
	  });
  
	  request.fail(ajaxFail);
	}
  }
  else
  {
	check_date_local(type);
  }
}

function check_date_local(type)
{
  //console.log('check_date_local');
  if(type == 5)
  {
	$.mobile.changePage('#p-when-plage', {transition:'slide'});
  }
  else
  {
	var journee = 24 * 3600 * 1000; // 24heures
	var mes_actus = new Array();
	var title_p = '';
	switch(type)
	{
	  case 1:
		// AUJOURD'HUI
		var date_interet_deb = annee+'-'+mois+'-'+jour;
		var date_interet_fin = annee+'-'+mois+'-'+jour;
		$.each(local_data.spotlights, function(key, val) {
		  if(val.date_deb >= date_interet_deb && val.date_fin <= date_interet_fin)
			mes_actus.push(key);
		});
		title_p = 'Aujourd\'hui <span>'+jour+'/'+mois+'/'+annee+'</span>';
	  break;
	  case 2:
		// DEMAIN
		var demain = new Date();
		demain.setTime(demain.getTime() + journee);
		var date_interet_deb = date_js(demain.getFullYear())+'-'+date_js(demain.getMonth()+1)+'-'+date_js(demain.getDate());
		var date_interet_fin = date_js(demain.getFullYear())+'-'+date_js(demain.getMonth()+1)+'-'+date_js(demain.getDate());
		$.each(local_data.spotlights, function(key, val) {
		  if(val.date_deb >= date_interet_deb && val.date_fin <= date_interet_fin)
			mes_actus.push(key);
		});
		title_p = 'Demain <span>'+date_js(demain.getDate())+'/'+date_js(demain.getMonth()+1)+'/'+date_js(demain.getFullYear())+'</span>';
	  break;
	  case 3:
		// CE WEEK-END
		var d_d = new Date();
		var d_f = new Date();
		switch(date_now.getDay())
		{
		  case 0:
			// Dimanche
			d_d.setTime(d_d.getTime() + (6*journee));
			d_f.setTime(d_f.getTime() + (7*journee));
		  break;
		  case 1:
			// Lundi
			d_d.setTime(d_d.getTime() + (5*journee));
			d_f.setTime(d_f.getTime() + (6*journee));
		  break;
		  case 2:
			// Mardi
			d_d.setTime(d_d.getTime() + (4*journee));
			d_f.setTime(d_f.getTime() + (5*journee));
		  break;
		  case 3:
			// Mercredi
			d_d.setTime(d_d.getTime() + (3*journee));
			d_f.setTime(d_f.getTime() + (4*journee));
		  break;
		  case 4:
			// Jeudi
			d_d.setTime(d_d.getTime() + (2*journee));
			d_f.setTime(d_f.getTime() + (3*journee));
		  break;
		  case 5:
			// Vendredi
			d_d.setTime(d_d.getTime() + (1*journee));
			d_f.setTime(d_f.getTime() + (2*journee));
		  break;
		  case 6:
			// Samedi
			d_d.setTime(d_d.getTime() + (0*journee));
			d_f.setTime(d_f.getTime() + (1*journee));
		  break;
		}
		var date_interet_deb = date_js(d_d.getFullYear())+'-'+date_js(d_d.getMonth()+1)+'-'+date_js(d_d.getDate());
		var date_interet_fin = date_js(d_f.getFullYear())+'-'+date_js(d_f.getMonth()+1)+'-'+date_js(d_f.getDate());
		$.each(local_data.spotlights, function(key, val) {
		  if(val.date_deb >= date_interet_deb && val.date_fin <= date_interet_fin)
			mes_actus.push(key);
		});
		title_p = 'Ce Week-end <span>Du '+date_js(d_d.getDate())+'/'+date_js(d_d.getMonth()+1)+'/'+date_js(d_d.getFullYear())+' au '+date_js(d_f.getDate())+'/'+date_js(d_f.getMonth()+1)+'/'+date_js(d_f.getFullYear())+'</span>';
	  break;
	  case 4:
		// 7 PROCHAINS JOURS
		var d_d = new Date();
		var d_f = new Date();
		d_d.setTime(d_d.getTime() + (1*journee));
		d_f.setTime(d_f.getTime() + (8*journee));
		var date_interet_deb = date_js(d_d.getFullYear())+'-'+date_js(d_d.getMonth()+1)+'-'+date_js(d_d.getDate());
		var date_interet_fin = date_js(d_f.getFullYear())+'-'+date_js(d_f.getMonth()+1)+'-'+date_js(d_f.getDate());
		$.each(local_data.spotlights, function(key, val) {
		  if(val.date_deb >= date_interet_deb && val.date_fin <= date_interet_fin)
			mes_actus.push(key);
		});
		title_p = '7 prochains jours <span>Du '+date_js(d_d.getDate())+'/'+date_js(d_d.getMonth()+1)+'/'+date_js(d_d.getFullYear())+' au '+date_js(d_f.getDate())+'/'+date_js(d_f.getMonth()+1)+'/'+date_js(d_f.getFullYear())+'</span>';
	  break;
	  case 6:
		// TOUTES LES DATES
		$.each(local_data.spotlights, function(key, val) {
		  mes_actus.push(key);
		});
		title_p = 'Toutes les dates';
	  break;
	}
	if(mes_actus.length == 0)
	{
	  alert('Aucun évènement');
	}
	else
	{
	  $('#p-when-details .content').html('<div class="title_category"><h3>'+title_p+'</h3></div>');
	  $.each(mes_actus, function(key, val) {
		if(local_data.spotlights[val] != undefined && local_data.spotlights[val] != null)
		{
		  var val2 = local_data.spotlights[val];
		  var str_tel = '';
		  if(val2.telephone != null && val2.telephone != '')
			str_tel = '<a href="tel:'+val2.telephone+'" class="tel">'+val2.telephone+'</a>';
		  $('#p-when-details .content').append('<div class="elm_spotlight" onclick="show_details_actu_local('+val+')"><p class="dates">'+val2.date+'</p><h2>'+val2.nom_manifestation+'</h2><p class="desc">'+val2.descriptif+'</p><p class="zone">'+val2.commune+'</p>'+str_tel+'</div>');
		}
	  });
	  $.mobile.changePage('#p-when-details', {transition:'slide'});
	}
  }
}

function check_plage_date(date_deb,date_fin) {
  //console.log('check_plage_date');
  if(date_deb == '') {
	alert('Merci de renseigner une date de début');
  }
  else if(date_fin == '') {
	alert('Merci de renseigner une date de fin');
  }
  else {
	if(local)
	{
	  check_plage_date_local(date_deb,date_fin);
	}
	else
	{
	  var dataAjax = {page:'p-when-plage',date_deb:date_deb,date_fin:date_fin}
	  var request = $.ajax({
		url: base_url+"ajax.php",
		type: "POST",
		data: dataAjax
	  });
	  
	  request.done(function(response) {
		console.log(response);
		if(response == 'false')
		{
		  fail_req();
		}
		else if(response == 'Aucun évènement')
		{
		  alert('Aucun évènement');
		}
		else
		{
		  $('#p-when-details .content').html(response);
		  $.mobile.changePage('#p-when-details', {transition:'slide'});
		}
	  });
	
	  request.fail(ajaxFail);
	}
  }
}

function check_plage_date_local(date_deb,date_fin) {
  //console.log('check_plage_date_local');
  var mes_actus = new Array();
  var new_date_deb = date_deb.split('-');
  var new_date_fin = date_fin.split('-');
  var title_p = 'Plage de dates <span>Du '+new_date_deb[2]+'/'+new_date_deb[1]+'/'+new_date_deb[0]+' au '+new_date_fin[2]+'/'+new_date_fin[1]+'/'+new_date_fin[0]+'</span>';
  $.each(local_data.spotlights, function(key, val) {
	if(val.date_deb >= date_deb && val.date_fin <= date_fin)
	  mes_actus.push(key);
  });
  if(mes_actus.length == 0)
  {
	alert('Aucun évènement');
  }
  else
  {
	$('#p-when-details .content').html('<div class="title_category"><h3>'+title_p+'</h3></div>');
	$.each(mes_actus, function(key, val) {
	  if(local_data.spotlights[val] != undefined && local_data.spotlights[val] != null)
	  {
		var val2 = local_data.spotlights[val];
		var str_tel = '';
		if(val2.telephone != null && val2.telephone != '')
		  str_tel = '<a href="tel:'+val2.telephone+'" class="tel">'+val2.telephone+'</a>';
		$('#p-when-details .content').append('<div class="elm_spotlight" onclick="show_details_actu_local('+val+')"><p class="dates">'+val2.date+'</p><h2>'+val2.nom_manifestation+'</h2><p class="desc">'+val2.descriptif+'</p><p class="zone">'+val2.commune+'</p>'+str_tel+'</div>');
	  }
	});
	$.mobile.changePage('#p-when-details', {transition:'slide'});
  }
}

function date_js(str)
{
  if(str < 10)
	str = '0'+str;
  return str;
}

function show_details_actu(id_actu) {
  //console.log('show_details_actu');
  var dataAjax = {page:'p-details-actu',id_actu:id_actu}
  var request = $.ajax({
	url: base_url+"ajax.php",
	type: "POST",
	data: dataAjax
  });
  
  request.done(function(response) {
	if(response != 'false') {
	  $('#p-details-actu .content').html(response);
	  $.mobile.changePage('#p-details-actu', {transition:'slide'});
	}
	else
	  fail_req();
  });

  request.fail(ajaxFail);
}

function show_details_actu_local(id_actu) {
  //console.log('show_details_actu_local');
  if(local_data != undefined && local_data != null) {
	if(local_data.spotlights[id_actu] != undefined) {
	  var val = local_data.spotlights[id_actu];
	  var str_tel = '';
	  var str_img = '';
	  if(val.telephone != null && val.telephone != '')
		str_tel = '<a href="tel:'+val.telephone+'" class="tel">'+val.telephone+'</a>';
	  if(val.photo != null && val.photo != '')
		str_img = '<img src="'+val.photo+'" style="display: block; max-width: 90%; margin: 10px auto;" />';
	  $('#p-details-actu .content').html('');
	  $('#p-details-actu .content').append('<div class="title_category"><h3>'+val.nom_manifestation+'</h3></div><div class="elm_spotlight v2"><p class="dates">'+val.date+'</p><p class="desc">'+val.descriptif+'</p>'+str_img+'<p class="zone">'+val.commune+'</p>'+str_tel+'</div>');
	  $.mobile.changePage('#p-details-actu', {transition:'slide'});
	}
  }
}

function getlocal() {
  var dataAjax = {local:'local'}
  var request = $.ajax({
	url: base_url+"ajax.php",
	type: "POST",
	data: dataAjax
  });
  
  request.done(function(response) {
	$('.ui-loader').hide();
	var obj_parse = $.parseJSON(response);
	if(localStorage) {
	  localStorage['local_data'] = response;
	  localStorage['local_data_up'] = date_today;
	  local_data = JSON.parse(localStorage['local_data']);
	  get_spotlight_local();
    }
	else {
	  alert('Votre terminal ne dispose pas des dernières mises à jour ou n\'est pas assez récent pour pouvoir utiliser l\'application en mode hors conexion.');
	  local = false;
	}
  });

  request.fail(ajaxFail);
}

/******************************************* FONCTIONS GENERALES *******************************************/

function trim(myString) {
  return myString.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

function close_lightbox_f() {
  $('#my_lightbox').fadeOut(100);
}

function ch_page(id) {
  $.mobile.changePage(id, {transition:'fade'});
}







