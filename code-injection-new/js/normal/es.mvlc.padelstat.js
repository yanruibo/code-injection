





















// JavaScript Document

var accion_agenda = '';
var jugador_seleccionado = '';

function inicio_agenda(){

  accion_agenda = '';
  jugador_seleccionado = '';

  $('#agenda .nuevo').click(function(){ 
    navigator.notification.confirm(l['agenda']['nuevo_alias'], function(b){ if(b == 1){ mostrar_pagina('jugador_alias'); } else { accion_agenda = 'nuevo_jugador'; mostrar_pagina('jugador'); } }, l['padelstat'], l['si'] + ',' + l['no']);
  });
  $('#agenda .editar').click(function(){ if(jugador_seleccionado != ''){ accion_agenda = 'editar_jugador'; mostrar_pagina('jugador'); } else notificacion(l['agenda']['seleccion_vacia']); });
  $('#agenda .eliminar').click(function(){ 
    if(jugador_seleccionado != ''){ 
      if($('#agenda .jugador.seleccionado').attr('data-propietario') == 'si') notificacion(l['agenda']['imposible_eliminar_propietario']);
      else navigator.notification.confirm(l['estas_seguro'], function(b){ if(b == 1){ agenda_eliminar(); } }, l['padelstat'], l['si'] + ',' + l['no']);
    } else notificacion(l['agenda']['seleccion_vacia']); 
  });
  
  $('#agenda .registro').click(function(){ 
    if(jugador_seleccionado != ''){
      if(preparacion_partido.jugador_1 == $('#agenda .jugador.seleccionado').attr('data-id')) preparacion_partido.jugador_1 = '';
      if(preparacion_partido.jugador_2 == $('#agenda .jugador.seleccionado').attr('data-id')) preparacion_partido.jugador_2 = '';
      if(preparacion_partido.jugador_3 == $('#agenda .jugador.seleccionado').attr('data-id')) preparacion_partido.jugador_3 = '';
      if(preparacion_partido.jugador_4 == $('#agenda .jugador.seleccionado').attr('data-id')) preparacion_partido.jugador_4 = '';
      switch(preparacion_jugador_seleccionado){
        case '1': preparacion_partido.jugador_1 = $('#agenda .jugador.seleccionado').attr('data-id'); break;
        case '2': preparacion_partido.jugador_2 = $('#agenda .jugador.seleccionado').attr('data-id'); break;
        case '3': preparacion_partido.jugador_3 = $('#agenda .jugador.seleccionado').attr('data-id'); break;
        case '4': preparacion_partido.jugador_4 = $('#agenda .jugador.seleccionado').attr('data-id'); break;
      }
      mostrar_pagina('preparacion');
    } else notificacion(l['agenda']['seleccion_vacia']);
  });
  agenda_cargar_lista();

  if(window.localStorage.getItem('ayuda_agenda') == null){
    window.localStorage.setItem('ayuda_agenda', 1);
    $('#agenda .overlay').show();
    $('#agenda .flash_ayuda').show();
    $('#agenda .flash_ayuda .cerrar').click(function(){ $('#agenda .flash_ayuda').hide(); $('#agenda .overlay').hide(); });
  }

}

function mostrado_agenda(){
  redimensionar_contenido('agenda');
  $('#agenda .lista').css('height', ($('#agenda .contenido').height() - $('#agenda .botones').height() - 40) + "px");
}

function agenda_cargar_lista(){
  
  $('#agenda .lista').empty(); 
  db.transaction(function(tx){
    tx.executeSql('select id, alias, nombre, apellidos from jugadores where activo="si" order by nombre asc, apellidos asc', [], function (tx, results) {

      for (i = 0; i < results.rows.length; i++){
        var jugador = results.rows.item(i);
        var n_jugador = '';
        if(results.rows.item(i).id == preparacion_partido.jugador_1) n_jugador = ' jugador_1';
        if(results.rows.item(i).id == preparacion_partido.jugador_2) n_jugador = ' jugador_2';
        if(results.rows.item(i).id == preparacion_partido.jugador_3) n_jugador = ' jugador_3';
        if(results.rows.item(i).id == preparacion_partido.jugador_4) n_jugador = ' jugador_4';
        var propietario = 'no'; if(jugador.id.substr(-1) == '*') propietario = 'si';
        console.log(jugador);
        var alias = ''; if(jugador.alias != '' && jugador.alias != null) alias = ' (' + jugador.alias + ')';
        var html = '<span class="jugador' + n_jugador + '" data-propietario="' + propietario + '" data-id="' + jugador.id + '"><i></i>' + jugador.nombre + ' ' + jugador.apellidos + alias + '</span>';
        if(propietario == 'si') $('#agenda .lista').prepend(html); else $('#agenda .lista').append(html);
      }

      $('#agenda .jugador').click(function(){ 
        if($(this).hasClass('seleccionado')){
          $('#agenda .jugador').removeClass('seleccionado');
          jugador_seleccionado = '';
        } else {
          $('#agenda .jugador').removeClass('seleccionado');
          $(this).addClass('seleccionado');
          jugador_seleccionado = $(this).attr('data-id');
        }
      });

    });
  }); 

}

function agenda_eliminar(){
  db.transaction(function(tx){
    tx.executeSql('update jugadores set activo="no" where id=?', [jugador_seleccionado], function (tx, results) { agenda_cargar_lista(); sincronizar_agenda(true); });
  });
}

function sincronizar_agenda(forzar_actualizacion){

  console.log('sincronizando agenda');

  if(cambios_agenda > 0 || forzar_actualizacion){
    if(online()){
       db.transaction(function(tx){
        tx.executeSql('select * from jugadores', [], function (tx, results) {
          var u = [];  for (i = 0; i < results.rows.length; i++){ u[i] = results.rows.item(i); }
          var jqxhr = $.post(url_api + 'sincronizar_agenda', {'id': encodeURI(id_usuario), 'i_agenda': encodeURI(i_agenda), 'firma': md5(id_usuario.toString() + i_agenda.toString() + '' + clave_api), 'actualizacion': JSON.stringify(u) + '-----------', 'dummy': 'dummy'}, function(data){ sincronizar_agenda(); });
        }); 
      });
    } else {
      cambios_agenda = 1;
      window.localStorage.setItem('cambios_agenda', cambios_agenda);
    }
  } else {
    if(online()){
      var jqxhr = $.post(url_api + 'sincronizar_agenda', {'id': encodeURI(id_usuario), 'i_agenda': encodeURI(i_agenda), 'firma': md5(id_usuario.toString() + i_agenda.toString() + '' + clave_api), 'dummy': 'dummy'}, function(data){ 
        db.transaction(function(tx){
          var r = JSON.parse(data);
          if(r[0] == 'ok' && r[2].length > 0){
            for(i = 0; i<r[2].length; i++){
              var j = r[2][i];
              tx.executeSql('insert or replace into jugadores (id, alias, nombre, apellidos, telefono, email, nivel, fiabilidad, foto, activo, observaciones) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [j.id, j.alias, j.nombre, j.apellidos, j.telefono, j.email, j.nivel, j.fiabilidad, j.imagen, j.activo, j.observaciones], function(){}, function(tx, e){ console.log(e); });
            }
            i_agenda = parseInt(r[1]);
            window.localStorage.setItem('i_agenda', i_agenda);
          }
        });
      });
    }
  }

}

// codificación utf8

l['agenda'] = {};

l['agenda']['titulo'] = 'Jugadores';
l['agenda']['imposible_eliminar_propietario'] = 'No puedes eliminarte como jugador';
l['agenda']['nuevo_alias'] = '¿Quieres añadir un nuevo jugador mediante su alias?';
l['agenda']['seleccion_vacia'] = 'Debes seleccionar un jugador';


// JavaScript Document

var partido_seleccionado = '';
var origen_partido_seleccionado = 'lista_partidos';

function inicio_lista_partidos(){

  lista_partidos_cargar();
  partido_seleccionado = '';
  origen_partido_seleccionado = 'lista_partidos';

  $('#lista_partidos .boton_eliminar').click(function(){
    if(partido_seleccionado == '') notificacion(l['lista_partidos']['debe_seleccionar']);
    else navigator.notification.confirm(l['estas_seguro'], function(b){ if(b == 1){ lista_partidos_eliminar(); } }, l['padelstat'], l['si'] + ',' + l['no']);
  });

  $('#lista_partidos .boton_registro').click(function(){
    if(partido_seleccionado == '') notificacion(l['lista_partidos']['debe_seleccionar']);
    else navigator.notification.confirm(l['lista_partidos']['registrar_o_marcador'], function(b){ if(b == 1){ mostrar_pagina('registro'); } else { mostrar_pagina('marcador'); } }, l['padelstat'], l['lista_partidos']['partido'] + ',' + l['lista_partidos']['marcador']);
  });

}

function mostrado_lista_partidos(){
  redimensionar_contenido('lista_partidos');
  $('#lista_partidos .lista').css('height', ($('#lista_partidos .contenido').height() - 20) + "px");
}

function lista_partidos_cargar(){

  partido_seleccionado = '';
  $('#lista_partidos .lista').empty(); 
  db.transaction(function(tx){
    tx.executeSql('select * from partidos where activo="si" and finalizado="no" order by fecha asc, hora asc', [], function (tx, results) {

      for (i = 0; i < results.rows.length; i++){
        var partido = results.rows.item(i);        
        var fecha = partido.fecha.split('-'); 

        var m = { 'sets': parseInt(partido.sets), 'juegos': parseInt(partido.juegos), 'local': parseInt(partido.marcador_local), 'visitante': parseInt(partido.marcador_visitante), 'set_1': { 'inicio': { 'local': parseInt(partido.marcador_set1_local), 'visitante': parseInt(partido.marcador_set1_visitante) }, 'local': parseInt(partido.marcador_set1_local), 'visitante': parseInt(partido.marcador_set1_visitante) }, 'set_2': { 'inicio': { 'local': parseInt(partido.marcador_set2_local), 'visitante': parseInt(partido.marcador_set2_visitante) }, 'local': parseInt(partido.marcador_set2_local), 'visitante': parseInt(partido.marcador_set2_visitante) }, 'set_3': { 'inicio': { 'local': parseInt(partido.marcador_set3_local), 'visitante': parseInt(partido.marcador_set3_visitante) }, 'local': parseInt(partido.marcador_set3_local), 'visitante': parseInt(partido.marcador_set3_visitante) }, 'set_4': { 'inicio': { 'local': parseInt(partido.marcador_set4_local), 'visitante': parseInt(partido.marcador_set4_visitante) }, 'local': parseInt(partido.marcador_set4_local), 'visitante': parseInt(partido.marcador_set4_visitante) }, 'set_5': { 'inicio': { 'local': parseInt(partido.marcador_set5_local), 'visitante': parseInt(partido.marcador_set5_visitante) }, 'local': parseInt(partido.marcador_set5_local), 'visitante': parseInt(partido.marcador_set5_visitante) } };
        if(!marcador_valido(m)){

          var html = '<div class="partido" id="' + partido.id + '"><span class="fecha">' + fecha[2] + '/' + fecha[1] + '/' + fecha[0] + '</span><span class="hora">' + partido.hora + '</span><span class="lugar">' + partido.lugar + '</span><span class="jugador jugador_1"></span><span class="jugador jugador_2"></span><span class="jugador jugador_3"></span><span class="jugador jugador_4"></span><span class="tipo ' + partido.tipo + '"></span></div>';
          $('#lista_partidos .lista').append(html);

          tx.executeSql('select "' + partido.id + '" as partido, id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_1], function(tx, results){
            var jugador = results.rows.item(0);
            $('#lista_partidos .lista #' + jugador.partido + ' .jugador_1').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
          });

          tx.executeSql('select "' + partido.id + '" as partido, id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_2], function(tx, results){
            var jugador = results.rows.item(0);
            $('#lista_partidos .lista #' + jugador.partido + ' .jugador_2').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
          });

          tx.executeSql('select "' + partido.id + '" as partido, id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_3], function(tx, results){
            var jugador = results.rows.item(0);
            $('#lista_partidos .lista #' + jugador.partido + ' .jugador_3').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
          });

          tx.executeSql('select "' + partido.id + '" as partido, id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_4], function(tx, results){
            var jugador = results.rows.item(0);
            $('#lista_partidos .lista #' + jugador.partido + ' .jugador_4').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
          });
          
        }

      }

      $('#lista_partidos .partido').click(function(){
        if($(this).hasClass('seleccionado')){
          $(this).removeClass('seleccionado');
          partido_seleccionado = '';
        } else {
          $('#lista_partidos .partido').removeClass('seleccionado');
          $(this).addClass('seleccionado');
          partido_seleccionado = $(this).attr('id');
        }
      });

    });
  }); 

}

function lista_partidos_eliminar(){
  if(partido_seleccionado != ''){
    db.transaction(function(tx){
      tx.executeSql('update partidos set activo="no" where id=?', [partido_seleccionado], function (tx, results){ $('#lista_partidos #' + partido_seleccionado).hide(); partido_seleccionado = ''; sincronizar_partidos(true); });
    });
  }
}

// codificación utf8

l['lista_partidos'] = {};

l['lista_partidos']['titulo'] = 'Partidos preparados';

l['lista_partidos']['debe_seleccionar'] = 'Primero debes seleccionar un partido';

l['lista_partidos']['registrar_o_marcador'] = '¿Quieres registrar sólo el marcador o las estadísticas?';
l['lista_partidos']['marcador'] = 'Marcador';
l['lista_partidos']['partido'] = 'Estadísticas';


// JavaScript Document

if(window.localStorage.getItem('ajustes_registro_usuario') == null) window.localStorage.setItem('ajustes_registro_usuario', 1);
if(window.localStorage.getItem('ajustes_registro_jugador_1') == null) window.localStorage.setItem('ajustes_registro_jugador_1', 0);
if(window.localStorage.getItem('ajustes_registro_jugador_2') == null) window.localStorage.setItem('ajustes_registro_jugador_3', 0);
if(window.localStorage.getItem('ajustes_registro_jugador_3') == null) window.localStorage.setItem('ajustes_registro_jugador_4', 0);
if(window.localStorage.getItem('ajustes_registro_jugador_4') == null) window.localStorage.setItem('ajustes_registro_jugador_5', 0);

var ajustes_registro_usuario = parseInt(window.localStorage.getItem('ajustes_registro_usuario'));
var ajustes_registro_jugador_1 = parseInt(window.localStorage.getItem('ajustes_registro_jugador_1'));
var ajustes_registro_jugador_2 = parseInt(window.localStorage.getItem('ajustes_registro_jugador_2'));
var ajustes_registro_jugador_3 = parseInt(window.localStorage.getItem('ajustes_registro_jugador_3'));
var ajustes_registro_jugador_4 = parseInt(window.localStorage.getItem('ajustes_registro_jugador_4'));

function inicio_analisis_golpes(){

  if(ajustes_registro_usuario == 1) $('#analisis_golpes .seleccion.ajustes_registro_usuario').addClass('seleccionado');
  if(ajustes_registro_jugador_1 == 1) $('#analisis_golpes .seleccion.ajustes_registro_jugador_1').addClass('seleccionado');
  if(ajustes_registro_jugador_2 == 1) $('#analisis_golpes .seleccion.ajustes_registro_jugador_2').addClass('seleccionado');
  if(ajustes_registro_jugador_3 == 1) $('#analisis_golpes .seleccion.ajustes_registro_jugador_3').addClass('seleccionado');
  if(ajustes_registro_jugador_4 == 1) $('#analisis_golpes .seleccion.ajustes_registro_jugador_4').addClass('seleccionado');

  $('#analisis_golpes .seleccion').click(function(){
    $(this).toggleClass('seleccionado');
  });

  $('#analisis_golpes .registro').click(function(){

    if($('#analisis_golpes .seleccion.ajustes_registro_usuario').hasClass('seleccionado')) ajustes_registro_usuario = 1; else ajustes_registro_usuario = 0;
    window.localStorage.setItem('ajustes_registro_usuario', ajustes_registro_usuario);

    if($('#analisis_golpes .seleccion.ajustes_registro_jugador_1').hasClass('seleccionado')) ajustes_registro_jugador_1 = 1; else ajustes_registro_jugador_1 = 0;
    window.localStorage.setItem('ajustes_registro_jugador_1', ajustes_registro_jugador_1);

    if($('#analisis_golpes .seleccion.ajustes_registro_jugador_2').hasClass('seleccionado')) ajustes_registro_jugador_2 = 1; else ajustes_registro_jugador_2 = 0;
    window.localStorage.setItem('ajustes_registro_jugador_2', ajustes_registro_jugador_2);

    if($('#analisis_golpes .seleccion.ajustes_registro_jugador_3').hasClass('seleccionado')) ajustes_registro_jugador_3 = 1; else ajustes_registro_jugador_3 = 0;
    window.localStorage.setItem('ajustes_registro_jugador_3', ajustes_registro_jugador_3);

    if($('#analisis_golpes .seleccion.ajustes_registro_jugador_4').hasClass('seleccionado')) ajustes_registro_jugador_4 = 1; else ajustes_registro_jugador_4 = 0;
    window.localStorage.setItem('ajustes_registro_jugador_4', ajustes_registro_jugador_4);

    mostrar_pagina('ajustes');

  });

}

function mostrado_analisis_golpes(){
  redimensionar_contenido('analisis_golpes');
}

// codificación utf8

l['analisis_golpes'] = {};

l['analisis_golpes']['titulo'] = 'Análisis de golpes';

l['analisis_golpes']['analisis_propietario'] = 'Propietario de la app';
l['analisis_golpes']['analisis_jugador_1'] = 'Jugador 1';
l['analisis_golpes']['analisis_jugador_2'] = 'Jugador 2';
l['analisis_golpes']['analisis_jugador_3'] = 'Jugador 3';
l['analisis_golpes']['analisis_jugador_4'] = 'Jugador 4';


// JavaScript Document

var partido_conflicto = '';

function inicio_lista_partidos_transferencia(){
  
  partido_conflicto = '';
  lista_partidos_transferencia_cargar();

  $('#lista_partidos_transferencia .boton').addClass('inactivo');

  $('#lista_partidos_transferencia .boton_registro').click(function(){
    if(!$(this).hasClass('inactivo')){

      var partidos_restantes = parseInt(window.localStorage.getItem('usuario_partidas'));
      if(partidos_restantes > 0 && partidos_restantes < 4){
        var txt = l['quedan_pocas_partidas'].replace('N', partidos_restantes.toString());
        notificacion(txt);
      }
      if(partidos_restantes <= 0){
        notificacion(l['no_quedan_partidas']);
      }
      if(partidos_restantes > 0){
        var partido = JSON.parse($('#lista_partidos_transferencia .lista .partido.seleccionado').attr('data-partido'));
        var jqxhr = $.post(url_api + 'partidos_transferibles_aceptar', {'id_origen': encodeURI(partido.id_usuario), 'id_destino': encodeURI(id_usuario), 'id_partido': encodeURI(partido.id), 'firma': md5(partido.id_usuario.toString() + id_usuario.toString() + partido.id.toString() + '' + clave_api), 'dummy': 'dummy'}, 
          function(data){
            data = JSON.parse(data);
            if(data[0] == 'ok'){

              ga_evento('partidos', 'transferencia');

              $('#lista_partidos_transferencia .lista .partido.seleccionado').remove();
              $('#lista_partidos_transferencia .boton').addClass('inactivo');

              sincronizar_agenda();
              sincronizar_partidos();

              notificacion(l['lista_partidos_transferencia']['partido_registrado']);
              if($('#lista_partidos_transferencia .lista .partido').length == 0) transferencia_sin_partidos();
            } else notificacion(l['lista_partidos_transferencia']['error_registrando']);
          }
        ).fail(function(){
          notificacion(l['lista_partidos_transferencia']['error_registrando']);
        });
      }

    }
  });

  $('#lista_partidos_transferencia .boton_eliminar').click(function(){
    if(!$(this).hasClass('inactivo')){
      navigator.notification.confirm(l['estas_seguro'], 
        function(b){ 
          if(b == 1){ 

            var partido = JSON.parse($('#lista_partidos_transferencia .lista .partido.seleccionado').attr('data-partido'));
            var jqxhr = $.post(url_api + 'partidos_transferibles_cancelar', {'id_origen': encodeURI(partido.id_usuario), 'id_destino': encodeURI(id_usuario), 'id_partido': encodeURI(partido.id), 'firma': md5(partido.id_usuario.toString() + id_usuario.toString() + partido.id.toString() + '' + clave_api), 'dummy': 'dummy'}, 
              function(data){
                data = JSON.parse(data);
                if(data[0] == 'ok'){
                  $('#lista_partidos_transferencia .lista .partido.seleccionado').remove();
                  $('#lista_partidos_transferencia .boton').addClass('inactivo');
                  if($('#lista_partidos_transferencia .lista .partido').length == 0) transferencia_sin_partidos();
                } else notificacion(l['lista_partidos_transferencia']['error_eliminando']);
              }
            ).fail(function(){
              notificacion(l['lista_partidos_transferencia']['error_eliminando']);
            });

          } 
        }, l['padelstat'], l['si'] + ',' + l['no']
      );
    }
  });

  $('#lista_partidos_transferencia .boton_revisar').click(function(){
    if(!$(this).hasClass('inactivo')){
      partido_conflicto = JSON.parse($('#lista_partidos_transferencia .lista .partido.seleccionado').attr('data-partido'));
      mostrar_pagina('conflicto'); 
    }
  });

}

function mostrado_lista_partidos_transferencia(){
  redimensionar_contenido('lista_partidos_transferencia');
  $('#lista_partidos_transferencia .lista').css('height', ($('#lista_partidos_transferencia .contenido').height() - 20) + "px");
}

function lista_partidos_transferencia_cargar(){

  $('#lista_partidos_transferencia .lista').empty(); 
  console.log('cargando...');
  if(online()){
    var jqxhr = $.post(url_api +  'partidos_transferibles', {'id': encodeURI(id_usuario), 'firma': md5(id_usuario.toString() + '' + clave_api), 'dummy': 'dummy'}, 
      function(data){ 
        data = JSON.parse(data);
        if(data[0] == 'ok'){
          if(data[1].length > 0){

            for(i=0; i<data[1].length; i++){

              var partido = data[1][i];
              var fecha = partido.fecha.split('-'); 
              var hora = partido.hora.split(':'); 

              var conflicto = '';
              var id_conflicto = '';
              if(partido.conflicto == 'no') conflicto = 'no';
              else {
                conflicto = 'si';
                id_conflicto = partido.conflicto.id;
              }

              var html_partido = '';
              html_partido += '<div class="partido" id="partido_' + partido.id_usuario + partido.id + '" data-conflicto="' + conflicto + '" data-id-conflicto="' + id_conflicto + '">';
              html_partido += '<span class="fecha">' + fecha[2] + '/' + fecha[1] + '/' + fecha[0] + '</span>';
              html_partido += '<span class="hora">' + hora[0] + ':' + hora[1] + '</span>';
              html_partido += '<span class="lugar">' + partido.lugar + '</span>';
              if(partido.jugador_1 != null) html_partido += '<span class="jugador jugador_1">' + partido.jugador_1.apellidos + ' ' + partido.jugador_1.nombre.substr(0, 1) + '.' + '</span>';
              else html_partido += '<span class="jugador jugador_1"></span>';
              if(partido.jugador_2 != null) html_partido += '<span class="jugador jugador_2">' + partido.jugador_2.apellidos + ' ' + partido.jugador_2.nombre.substr(0, 1) + '.' + '</span>';
              else html_partido += '<span class="jugador jugador_2"></span>';
              if(partido.jugador_3 != null) html_partido += '<span class="jugador jugador_3">' + partido.jugador_3.apellidos + ' ' + partido.jugador_3.nombre.substr(0, 1) + '.' + '</span>';
              else html_partido += '<span class="jugador jugador_3"></span>';
              if(partido.jugador_4 != null) html_partido += '<span class="jugador jugador_4">' + partido.jugador_4.apellidos + ' ' + partido.jugador_4.nombre.substr(0, 1) + '.' + '</span>';
              else html_partido += '<span class="jugador jugador_4"></span>';
              html_partido += '<span class="escudo">';
              html_partido += '<span class="digito set_1 local">' + partido.marcador_set1_local + '</span>';
              html_partido += '<span class="digito set_1 visitante">' + partido.marcador_set1_visitante + '</span>';
              html_partido += '<span class="digito set_2 local">' + partido.marcador_set2_local + '</span>';
              html_partido += '<span class="digito set_2 visitante">' + partido.marcador_set2_visitante + '</span>';
              html_partido += '<span class="digito set_3 local">' + partido.marcador_set3_local + '</span>';
              html_partido += '<span class="digito set_3 visitante">' + partido.marcador_set3_visitante + '</span>';
              html_partido += '<span class="tipo">' + l['lista_partidos_transferencia'][partido.tipo] + '</span>';
              html_partido += '</span>';
              html_partido += '<p class="info">';
              html_partido += l['lista_partidos_transferencia']['juegos_registrados'] + ': <span class="juegos">' + partido.juegos_registrados + '%</span> - ';
              html_partido += l['lista_partidos_transferencia']['tipo'] + ': <span class="tipo">' + l['lista_partidos_transferencia']['tipo_conflicto_' + conflicto] + '</span><br/>';
              if(partido.autor != null){
                html_partido += l['lista_partidos_transferencia']['autor'] + ': <span class="autor">';
                html_partido += partido.autor.nombre + ' ' + partido.autor.apellidos;
                if(partido.autor.alias != '') html_partido += ' (' + partido.autor.alias + ')';
                html_partido += '</span>';
              }
              html_partido += '</p>';
              html_partido += '</div>';

              $('#lista_partidos_transferencia .lista').append(html_partido);
              $('#lista_partidos_transferencia .lista #partido_' + partido.id_usuario + partido.id).attr('data-partido', JSON.stringify(partido));

            }

            $('#lista_partidos_transferencia .partido').click(function(){
              if($(this).hasClass('seleccionado')){
                $(this).removeClass('seleccionado');
                $('#lista_partidos_transferencia .boton').addClass('inactivo');
              } else {
                $('#lista_partidos_transferencia .partido').removeClass('seleccionado');
                $(this).addClass('seleccionado');
                if($(this).attr('data-conflicto') == 'si'){
                  $('#lista_partidos_transferencia .boton_registro').addClass('inactivo');
                  $('#lista_partidos_transferencia .boton_revisar').removeClass('inactivo');
                } else {
                  $('#lista_partidos_transferencia .boton_registro').removeClass('inactivo');
                  $('#lista_partidos_transferencia .boton_revisar').addClass('inactivo');
                }
                $('#lista_partidos_transferencia .boton_eliminar').removeClass('inactivo');                
                
              }
            });

          } else transferencia_sin_partidos();
        } else transferencia_sin_partidos();
      }
    ).fail(function(){ transferencia_sin_partidos(); });
  }

}

function transferencia_sin_partidos(){
  notificacion(l['lista_partidos_transferencia']['sin_partidos']);
  mostrar_pagina('inicio'); 
}

// codificación utf8

l['lista_partidos_transferencia'] = {};

l['lista_partidos_transferencia']['titulo'] = 'Recepción de partidos';
l['lista_partidos_transferencia']['revisar'] = 'Revisar';
l['lista_partidos_transferencia']['sin_partidos'] = 'No hay partidos pendientes de revisión';

l['lista_partidos_transferencia']['juegos_registrados']  = 'Juegos Registrados';
l['lista_partidos_transferencia']['tipo'] = 'Tipo';
l['lista_partidos_transferencia']['autor'] = 'Autor';

l['lista_partidos_transferencia']['amistoso'] = 'amistoso';
l['lista_partidos_transferencia']['torneo'] = 'torneo';
l['lista_partidos_transferencia']['entrenamiento'] = 'training';

l['lista_partidos_transferencia']['tipo_conflicto_si'] = 'Conflicto de partidos';
l['lista_partidos_transferencia']['tipo_conflicto_no'] = 'Añadir partido';

l['lista_partidos_transferencia']['partido_registrado'] = 'Partido guardado';

l['lista_partidos_transferencia']['error_registrando'] = 'Ha ocurrido un error intentando registrar el partido, por favor comprueba tu conexión a Internet e inténtalo de nuevo.';
l['lista_partidos_transferencia']['error_eliminando'] = 'Ha ocurrido un error intentando eliminar el partido, por favor comprueba tu conexión a Internet e inténtalo de nuevo.';


// JavaScript Document

var id_usuario = 0;
var token = '';
var registro_completo = '';
var usuario_activo = '';

var i_agenda = 0;
var cambios_agenda = 0;

var i_partido = 0;
var cambios_partido = 0;

function inicio_login(){
  $('#login .boton_registro').click(function(){ mostrar_pagina('registro_usuario_1'); });
  $('#login .boton_login').click(function(){ login(); });
}

function mostrado_login(){
	redimensionar_contenido('login');
}

function logueado(){

  if(window.localStorage.getItem('id_usuario') == null) window.localStorage.setItem('id_usuario', 0);
  if(window.localStorage.getItem('token') == null) window.localStorage.setItem('token', '');
  if(window.localStorage.getItem('registro_completo') == null) window.localStorage.setItem('registro_completo', '');
  if(window.localStorage.getItem('usuario_activo') == null) window.localStorage.setItem('usuario_activo', '');
  if(window.localStorage.getItem('i_agenda') == null) window.localStorage.setItem('i_agenda', 0);
  if(window.localStorage.getItem('cambios_agenda') == null) window.localStorage.setItem('cambios_agenda', 0);
  if(window.localStorage.getItem('i_partido') == null) window.localStorage.setItem('i_partido', 0);
  if(window.localStorage.getItem('cambios_partido') == null) window.localStorage.setItem('cambios_partido', 0);

  if(window.localStorage.getItem('usuario_nombre') == null) window.localStorage.setItem('usuario_nombre', '');
  if(window.localStorage.getItem('usuario_apellidos') == null) window.localStorage.setItem('usuario_apellidos', '');
  if(window.localStorage.getItem('usuario_email') == null) window.localStorage.setItem('usuario_email', '');

  if(window.localStorage.getItem('usuario_licencia') == null) window.localStorage.setItem('usuario_licencia', '');
  if(window.localStorage.getItem('usuario_partidas') == null) window.localStorage.setItem('usuario_partidas', 0);
  if(window.localStorage.getItem('cambios_usuario_partidas') == null) window.localStorage.setItem('cambios_usuario_partidas', 0);

  id_usuario = parseInt(window.localStorage.getItem('id_usuario'));
  token = window.localStorage.getItem('token');
  registro_completo = window.localStorage.getItem('registro_completo');
  usuario_activo = window.localStorage.getItem('usuario_activo');
  i_agenda = parseInt(window.localStorage.getItem('i_agenda'));
  cambios_agenda = parseInt(window.localStorage.getItem('cambios_agenda'));
  i_partido = parseInt(window.localStorage.getItem('i_partido'));
  cambios_partido = parseInt(window.localStorage.getItem('cambios_partido'));

  if(id_usuario == 0 || token == '' || registro_completo == '' || usuario_activo == '' || (registro_completo != 'si' && registro_completo != 'no') || (usuario_activo != 'si' && usuario_activo != 'no')){
    
    window.localStorage.setItem('id_usuario', 0);

    window.localStorage.setItem('usuario_nombre', '');
    window.localStorage.setItem('usuario_apellidos', '');
    window.localStorage.setItem('usuario_email', '');

    window.localStorage.setItem('usuario_licencia', '');
    window.localStorage.setItem('usuario_partidas', '');

    window.localStorage.setItem('token', '');
    window.localStorage.setItem('registro_completo', '');
    window.localStorage.setItem('usuario_activo', '');
    window.localStorage.setItem('i_agenda', 0);
    window.localStorage.setItem('cambios_agenda', 0);
    window.localStorage.setItem('i_partido', 0);
    window.localStorage.setItem('cambios_partido', 0);

    // limpiar el resto de variables
    return false;
  } return true;

}

function login(){
  var email = $('#login .email').val().trim();
  var password = $('#login .password').val().trim();
  if(email == ''){ notificacion(l['login']['email_vacio'], null); return false; }
  if(!validar_email(email)){ notificacion(l['login']['email_invalido'], null); return false; }
  if(password == ''){ notificacion(l['login']['password_vacio'], null); return false; }
  if(online()){
    
    $('#login .registro').addClass('inactivo');
    var jqxhr = $.post(url_api + 'login', {'email': encodeURI(email), 'password': encodeURI(md5(password)), 'dummy': 'dummy'}, function(data){ 

      data = JSON.parse(data);

      switch(data[0]){
        case 'ok':

          id_usuario = parseInt(data[1]);
          token = md5(password);
          registro_completo = data[2];
          usuario_activo = data[3];
          window.localStorage.setItem('id_usuario', parseInt(data[1]));
          window.localStorage.setItem('token', md5(password));
          window.localStorage.setItem('registro_completo', data[2]);
          window.localStorage.setItem('usuario_activo', data[3]);

          window.localStorage.setItem('usuario_nombre', data[4]);
          window.localStorage.setItem('usuario_apellidos', data[5]);
          window.localStorage.setItem('usuario_email', data[6]);

          window.localStorage.setItem('usuario_licencia', data[7]);
          window.localStorage.setItem('usuario_partidas', data[8]);

          db.transaction(function(tx){ tx.executeSql('delete from jugadores', [], function (tx, results) {}); });
          i_agenda = 0;
          cambios_agenda = 0;
          window.localStorage.setItem('i_agenda', 0);
          window.localStorage.setItem('cambios_agenda', 0);

          db.transaction(function(tx){ tx.executeSql('delete from partidos', [], function (tx, results) {}); });
          i_partido = 0;
          cambios_partido = 0;
          window.localStorage.setItem('i_partido', 0);
          window.localStorage.setItem('cambios_partido', 0);          

          db.transaction(function(tx){ tx.executeSql('delete from acciones', [], function (tx, results) {}); });
          
          if(registro_completo == 'no'){ notificacion(l['login']['completar_registro'], null); mostrar_pagina('registro_usuario_2'); return false; }
          else if(usuario_activo == 'no'){ notificacion(l['login']['usuario_desactivado'], null); mostrar_pagina('login'); return false; } 
          else mostrar_pagina('inicio');

        break;
        default: notificacion(l['login']['login_incorrecto']); 

      }

    }, 'text')
    .fail(function(){ notificacion(l['api_error_conexion'], null); })
    .always(function(){ $('#login .registro').removeClass('inactivo'); });

  } else { notificacion(l['offline'], null); return false; }
}

// codificación utf8

l['login'] = {};

l['login']['titulo'] = 'Iniciar sesión';
l['login']['registro'] = 'Registro';
l['login']['iniciar_sesion'] = 'Iniciar sesión';
l['login']['email'] = 'Email';
l['login']['password'] = 'Contraseña';

l['login']['email_vacio'] = 'Tu email no puede estar en blanco';
l['login']['email_invalido'] = 'Tu email no es válido';
l['login']['password_vacio'] = 'Tu contraseña no puede estar en blanco';

l['login']['login_incorrecto'] = 'Email y/o contraseña incorrectos';
l['login']['usuario_desactivado'] = 'Hasta que no actives tu registro no podrás iniciar tu sesión';
l['login']['completar_registro'] = 'Tienes que completar los datos de tu registro';


// JavaScript Document

function inicio_jugador_alias(){
  $('#jugador_alias .registro').click(function(){
    var alias = $('#jugador_alias #alias').val().trim();
    if(alias == '') notificacion(l['jugador_alias']['alias_vacio']);
    else {
      $('#jugador_alias .registro').addClass('inactivo');
      var jqxhr = $.post(url_api + 'buscar_alias', {'alias': encodeURI(alias), 'firma': md5(alias + clave_api), 'dummy': 'dummy'}, function(data){ 
        var r = JSON.parse(data); console.log(r);
        if(r[0] == 'ok'){

          db.transaction(function(tx){
            var j = r[1];
            tx.executeSql('select id, activo from jugadores where alias=?', [j.alias], function(tx, results){
              if(results.rows.length == 0){
                var id = md5(new Date().getTime().toString() + device.uuid);
                tx.executeSql('insert into jugadores (id, alias, nombre, apellidos, nivel, fiabilidad, telefono, email, foto, activo) VALUES (?, ?, ?, ?, ?, ?, "", "", "", "si")', [id, j.alias, j.nombre, j.apellidos, j.nivel, j.fiabilidad], 
                  function(tx, results){ 
                    jugador_seleccionado = id;
                    accion_agenda = 'nuevo_jugador_alias';
                    mostrar_pagina('jugador');
                    sincronizar_agenda(true); 
                  }, 
                  function(tx, error){ console.log(error.message); 
                });
              } else {
                if(results.rows.item(0).activo == 'si'){
                  notificacion(l['jugador_alias']['alias_duplicado']);
                  $('#jugador_alias .registro').removeClass('inactivo');
                } else {
                  jugador_seleccionado = results.rows.item(0).id;
                  tx.executeSql('update jugadores set activo="si", nombre=?, apellidos=?, nivel=?, fiabilidad=?, telefono="", email="", observaciones="" where alias=?', [j.nombre, j.apellidos, j.nivel, j.fiabilidad, j.alias], 
                    function(tx, results){ 
                      accion_agenda = 'nuevo_jugador_alias';
                      mostrar_pagina('jugador');
                      sincronizar_agenda(true); 
                    }, 
                    function(tx, error){ console.log(error.message); 
                  })
                }
              }
            });
          });

        } else { 
          notificacion(l['jugador_alias']['alias_no_encontrado']);
          $('#jugador_alias .registro').removeClass('inactivo');
        }
      });
    }
  });
}

function mostrado_jugador_alias(){
  redimensionar_contenido('jugador_alias');
}

// codificación utf8

l['jugador_alias'] = {};

l['jugador_alias']['titulo'] = 'Alta de jugador';
l['jugador_alias']['alias'] = 'Alias';
l['jugador_alias']['info'] = 'Introduce el alias padelstat de tu compañero o rival para descargar su información de forma automática';
l['jugador_alias']['alias_vacio'] = 'El alias no puede estar en blanco';
l['jugador_alias']['alias_no_encontrado'] = 'El alias no pertenece a ningún jugador';
l['jugador_alias']['alias_duplicado'] = 'Ya tienes a este jugador en tu agenda';


// JavaScript Document

function inicio_lista_partidos_analisis(){

  lista_partidos_analisis_cargar();
  partido_seleccionado = '';
  origen_partido_seleccionado = 'lista_partidos_analisis';

  $('#lista_partidos_analisis .boton_editar').click(function(){
    if(partido_seleccionado == '') notificacion(l['lista_partidos_analisis']['debe_seleccionar']);
    else mostrar_pagina('marcador');
  });

  $('#lista_partidos_analisis .boton_registro').click(function(){
    if(partido_seleccionado == '') notificacion(l['lista_partidos_analisis']['debe_seleccionar']);
    //else if($('#' + partido_seleccionado).attr('acciones') == '0') notificacion(l['lista_partidos_analisis']['datos_insuficientes']);
    else {

      if(window.localStorage.getItem('usuario_licencia') == 'free' && $('#' + partido_seleccionado).attr('mas_tres_meses') == 'si')
        notificacion(l['lista_partidos_analisis']['mas_3_meses']); 
      else 
        mostrar_pagina('analisis_numerico_1p');

    }
  });

  if(window.localStorage.getItem('ayuda_analisis') == null){
    window.localStorage.setItem('ayuda_analisis', 1);
    $('#lista_partidos_analisis .overlay').show();
    $('#lista_partidos_analisis .flash_ayuda').show();
    $('#lista_partidos_analisis .flash_ayuda .cerrar').click(function(){ $('#lista_partidos_analisis .flash_ayuda').hide(); $('#lista_partidos_analisis .overlay').hide(); });
  }

}

function mostrado_lista_partidos_analisis(){
  redimensionar_contenido('lista_partidos_analisis');
  $('#lista_partidos_analisis .lista').css('height', ($('#lista_partidos_analisis .contenido').height() - 20) + "px");
}

function lista_partidos_analisis_cargar(){

  partido_seleccionado = '';
  $('#lista_partidos_analisis .lista').empty(); 
  db.transaction(function(tx){
    tx.executeSql('select * from partidos where activo="si" order by fecha desc, hora desc', [], function (tx, results) {

      var cambios_partidos = false;
      
      var date = new Date();  
      var anyo_limite = date.getFullYear();
      var mes_limite = date.getMonth() - 2; if(mes_limite < 0){ mes_limite = 11 + mes_limite; anyo_limite--; }
      if(mes_limite < 10) mes_limite = '0' + mes_limite;
      var dia_limite = date.getDate();
      if(dia_limite < 10) dia_limite = '0' + dia_limite;
      var fecha_limite = anyo_limite + '-' + mes_limite + '-' + dia_limite;

      for (i = 0; i < results.rows.length; i++){
        var partido = results.rows.item(i);        
        var fecha = partido.fecha.split('-'); 

        var m = { 'sets': parseInt(partido.sets), 'juegos': parseInt(partido.juegos), 'local': parseInt(partido.marcador_local), 'visitante': parseInt(partido.marcador_visitante), 'set_1': { 'inicio': { 'local': parseInt(partido.marcador_set1_local), 'visitante': parseInt(partido.marcador_set1_visitante) }, 'local': parseInt(partido.marcador_set1_local), 'visitante': parseInt(partido.marcador_set1_visitante) }, 'set_2': { 'inicio': { 'local': parseInt(partido.marcador_set2_local), 'visitante': parseInt(partido.marcador_set2_visitante) }, 'local': parseInt(partido.marcador_set2_local), 'visitante': parseInt(partido.marcador_set2_visitante) }, 'set_3': { 'inicio': { 'local': parseInt(partido.marcador_set3_local), 'visitante': parseInt(partido.marcador_set3_visitante) }, 'local': parseInt(partido.marcador_set3_local), 'visitante': parseInt(partido.marcador_set3_visitante) }, 'set_4': { 'inicio': { 'local': parseInt(partido.marcador_set4_local), 'visitante': parseInt(partido.marcador_set4_visitante) }, 'local': parseInt(partido.marcador_set4_local), 'visitante': parseInt(partido.marcador_set4_visitante) }, 'set_5': { 'inicio': { 'local': parseInt(partido.marcador_set5_local), 'visitante': parseInt(partido.marcador_set5_visitante) }, 'local': parseInt(partido.marcador_set5_local), 'visitante': parseInt(partido.marcador_set5_visitante) } };

        if(partido.finalizado == "si" || marcador_valido(m)){

          if(partido.finalizado == "no"){
            tx.executeSql('update partidos set finalizado="si" where id=?', [partido.id]);
            cambios_partidos = true;
          }
          
          var fecha_partido = fecha[0] + '-' + fecha[1] + '-' + fecha[2];
          var mas_tres_meses = 'no'; if(fecha_partido < fecha_limite) mas_tres_meses = 'si';

          console.log(fecha_partido + ' ' + fecha_limite);

          var html = '<div class="partido" id="' + partido.id + '" mas_tres_meses="' + mas_tres_meses + '"><span class="fecha">' + fecha[2] + '/' + fecha[1] + '/' + fecha[0] + '</span><span class="hora">' + partido.hora + '</span><span class="lugar">' + partido.lugar + '</span><span class="jugador jugador_1"></span><span class="jugador jugador_2"></span><span class="jugador jugador_3"></span><span class="jugador jugador_4"></span><span class="escudo"><span class="digito set_1 local">' + partido.marcador_set1_local + '</span><span class="digito set_1 visitante">' + partido.marcador_set1_visitante + '</span><span class="digito set_2 local">' + partido.marcador_set2_local + '</span><span class="digito set_2 visitante">' + partido.marcador_set2_visitante + '</span><span class="digito set_3 local">' + partido.marcador_set3_local + '</span><span class="digito set_3 visitante">' + partido.marcador_set3_visitante + '</span><span class="tipo">' + l['lista_partidos_analisis'][partido.tipo] + '</span></span></div>';
          $('#lista_partidos_analisis .lista').append(html);

          if(!marcador_valido(m)){
            html = '<div class="info">' + l['lista_partidos_analisis']['incompleto'] + '</div>';
            $('#lista_partidos_analisis .lista').append(html);
          } else {
            html = '<div class="info">' + l['lista_partidos_analisis']['juegos_registrados'] + ' <span id="porcentaje_' + partido.id + '">0</span>%</div>';
            $('#lista_partidos_analisis .lista').append(html);
            var total_juegos = parseInt(partido.marcador_set1_local) + parseInt(partido.marcador_set1_visitante) + parseInt(partido.marcador_set2_local) + parseInt(partido.marcador_set2_visitante) + parseInt(partido.marcador_set3_local) + parseInt(partido.marcador_set3_visitante) + parseInt(partido.marcador_set4_local) + parseInt(partido.marcador_set4_visitante) + parseInt(partido.marcador_set5_local) + parseInt(partido.marcador_set5_visitante);
            if(total_juegos > 0){
              tx.executeSql('select distinct id_partido, n_set, n_juego, ? as total_juegos from acciones where id>0 and id_partido=?', [total_juegos, partido.id], function(tx, results){
                if(results.rows.length > 0){
                  var porcentaje = Math.floor(results.rows.length * 100 / parseInt(results.rows.item(0).total_juegos));
                  if(porcentaje > 100) porcentaje = 100;
                  $('#porcentaje_' + results.rows.item(0).id_partido).html(porcentaje);
                }
              });
            }
          }

          tx.executeSql('select ? as id_partido, count(*) as acciones from acciones where accion!="" and id>0 and id_partido=? and not (accion!="pg" and golpe="saque_1")', [partido.id, partido.id], function(tx, results){
            var acciones = results.rows.item(0).acciones;
            $('#' + results.rows.item(0).id_partido).attr('acciones', results.rows.item(0).acciones);
          });

          tx.executeSql('select "' + partido.id + '" as partido, id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_1], function(tx, results){
            var jugador = results.rows.item(0);
            $('#lista_partidos_analisis .lista #' + jugador.partido + ' .jugador_1').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
          });

          tx.executeSql('select "' + partido.id + '" as partido, id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_2], function(tx, results){
            var jugador = results.rows.item(0);
            $('#lista_partidos_analisis .lista #' + jugador.partido + ' .jugador_2').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
          });

          tx.executeSql('select "' + partido.id + '" as partido, id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_3], function(tx, results){
            var jugador = results.rows.item(0);
            $('#lista_partidos_analisis .lista #' + jugador.partido + ' .jugador_3').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
          });

          tx.executeSql('select "' + partido.id + '" as partido, id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_4], function(tx, results){
            var jugador = results.rows.item(0);
            $('#lista_partidos_analisis .lista #' + jugador.partido + ' .jugador_4').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
          });

        }

        if(cambios_partidos) sincronizar_partidos(true);
        
      }

      $('#lista_partidos_analisis .partido').click(function(){
        if($(this).hasClass('seleccionado')){
          $(this).removeClass('seleccionado');
          partido_seleccionado = '';
        } else {
          $('#lista_partidos_analisis .partido').removeClass('seleccionado');
          $(this).addClass('seleccionado');
          partido_seleccionado = $(this).attr('id');
        }
      });

    });
  }); 

}

// codificación utf8

l['lista_partidos_analisis'] = {};

l['lista_partidos_analisis']['titulo'] = 'Partidos jugados';
l['lista_partidos_analisis']['debe_seleccionar'] = 'Primero debes seleccionar un partido';
l['lista_partidos_analisis']['datos_insuficientes'] = 'No hay suficientes datos para generar una estadística';

l['lista_partidos_analisis']['editar'] = 'Editar';
l['lista_partidos_analisis']['incompleto'] = 'PARTIDO INCOMPLETO';
l['lista_partidos_analisis']['juegos_registrados'] = 'Juegos registrados: ';

l['lista_partidos_analisis']['amistoso'] = 'amistoso';
l['lista_partidos_analisis']['torneo'] = 'torneo';
l['lista_partidos_analisis']['entrenamiento'] = 'training';

l['lista_partidos_analisis']['mas_3_meses'] = 'Partido seleccionado con fecha mayor a 3 meses. Adquiera la versión Premium para ver su contenido';


// JavaScript Document

var accion_lista_partidos = '';
var pendientes_transferencia = 0;

function inicio_inicio(){
  
  sincronizar_agenda();
  //sincronizar_partidos();

  setTimeout('optimizar_db();', 3000);
  setTimeout('importar_partidos()', 10000);

  accion_lista_partidos = '';
  pendientes_transferencia = 0;

  $('#inicio .preparacion').click(function(){ 
    mostrar_publicidad();
    preparacion_partido = {'jugador_1': '', 'jugador_2': '', 'jugador_3': '', 'jugador_4': '', 'tipo': '', 'fecha': '', 'hora': '', 'lugar': ''};
    mostrar_pagina('preparacion'); 
  });

  $('#inicio .registro').click(function(){ 
    mostrar_publicidad();
    accion_lista_partidos = 'registro'; 
    mostrar_pagina('lista_partidos'); 
  });

  $('#inicio .analisis').click(function(){ 
    mostrar_publicidad();
    mostrar_pagina('analisis'); 
  });
  
  $('#inicio .ajustes').click(function(){ mostrar_pagina('ajustes'); });
  $('#inicio .transferencia').click(function(){ 
    if(!online()) notificacion(l['inicio']['offline']); 
    else {
      if(pendientes_transferencia == 0) notificacion(l['inicio']['sin_transferencias']);
      else mostrar_pagina('lista_partidos_transferencia'); 
    }
  });

  $('.ayuda').click(function(){ 
    var ayuda = window.localStorage.getItem('ayuda');
    if(ayuda != 'guia_rapida' && ayuda != 'ayuda_completa'){
      ayuda = 'guia_rapida';
      window.localStorage.setItem('ayuda', 'guia_rapida');
    }
    switch(ayuda){
      case 'guia_rapida':
        $('.popup_ayuda .guia_rapida').show();
        $('.popup_ayuda .ayuda_completa').hide();
      break;
      case 'ayuda_completa':
        $('.popup_ayuda .guia_rapida').hide();
        $('.popup_ayuda .ayuda_completa').show();
      break;
    }
    popup('.popup_ayuda'); 
  });
  $('.popup_ayuda .cambio_ayuda').click(function(){
    var ayuda = window.localStorage.getItem('ayuda');
    if(ayuda != 'guia_rapida' && ayuda != 'ayuda_completa'){
      ayuda = 'guia_rapida';
      window.localStorage.setItem('ayuda', 'guia_rapida');
    }
    switch(ayuda){
      case 'guia_rapida': ayuda = 'ayuda_completa'; break;
      case 'ayuda_completa': ayuda = 'guia_rapida'; break;
    }
    window.localStorage.setItem('ayuda', ayuda);
    $('.popup_ayuda .guia_rapida, .popup_ayuda .ayuda_completa').toggle();
  });
  
  if(window.localStorage.getItem('ayuda_inicio') == null){
    window.localStorage.setItem('ayuda_inicio', 1);
    $('#inicio .overlay').show();
    $('#inicio .ayuda_inicio_1').show();
    $('#inicio .ayuda_inicio_1 .cerrar').click(function(){ $('#inicio .ayuda_inicio_1').hide(); $('#inicio .ayuda_inicio_2').show(); });
    $('#inicio .ayuda_inicio_2 .cerrar').click(function(){ $('#inicio .ayuda_inicio_2').hide(); $('#inicio .ayuda_inicio_3').show(); });
    $('#inicio .ayuda_inicio_3 .cerrar').click(function(){ $('#inicio .ayuda_inicio_3').hide(); $('#inicio .ayuda_inicio_4').show(); });
    $('#inicio .ayuda_inicio_4 .cerrar').click(function(){ $('#inicio .ayuda_inicio_4').hide(); $('#inicio .ayuda_inicio_5').show(); });
    $('#inicio .ayuda_inicio_5 .cerrar').click(function(){ $('#inicio .ayuda_inicio_5').hide(); $('#inicio .overlay').hide(); });
  }

}

function mostrado_inicio(){
	redimensionar_contenido('inicio');
  mostrar_publicidad();
  comprobar_pendientes_transferencia();
}

function comprobar_pendientes_transferencia(){
  pendientes_transferencia = 0;
  if(online()){
    var jqxhr = $.post(url_api +  'partidos_transferibles', {'id': encodeURI(id_usuario), 'firma': md5(id_usuario.toString() + '' + clave_api), 'dummy': 'dummy'}, 
      function(data){ 
        data = JSON.parse(data);
        if(data[0] == 'ok'){
          pendientes_transferencia = data[1].length;
          if(pendientes_transferencia > 0){
            $('#inicio .pie .transferencia').html('<i>' + pendientes_transferencia + '</i>');
          } else {
            $('#inicio .pie .transferencia').html('');
          }
        }
      }
    );
  }
}

function importar_partidos(){
  db_v1.transaction(function(tx){
    tx.executeSql('alter table partidas add column importado', [], function(tx, results){ console.log('entro'); });
  });
  db_v1.transaction(function(tx){
    var sql = "select * from partidas";
    tx.executeSql(sql, [], function(tx, results){
      if(results.rows.length > 0){
        for(var i=0; i<results.rows.length; i++){
          var partido = results.rows.item(i);
          if(partido.importado != 'si') importar_partido(partido);
        }
      }
    });
  });
}

function importar_partido(p){

  var jugadores = [];

  console.log('importando_partido ' + p.id);

  db_v1.transaction(function(tx){
    for(var i=1; i<=4; i++){
      var sql = "select " + i + " as i_jugador, a.* from agenda a where a.id='" + p['jugador_' + i] + "'";
      tx.executeSql(sql, [], function(tx, results){
        if(results.rows.length == 1){
          var j = results.rows.item(0);
          jugadores[parseInt(j.i_jugador)] = j;

          if(jugadores.length == 5){
            var partido = {'partido': p, 'jugadores': jugadores};
            var jqxhr = $.post(url_api + 'importar_partido', {'id': encodeURI(id_usuario), 'partido': JSON.stringify(partido), 'firma': md5(id_usuario.toString() + JSON.stringify(partido).toString() + '' + clave_api), 'dummy': 'dummy'}, function(data){ 
              var r = JSON.parse(data);
              if(r[0] == 'ok'){
                db_v1.transaction(function(tx){
                  var sql = "update partidas set importado='si' where id='" + r[1] + "'";
                  tx.executeSql(sql, [], function(tx, results){ console.log('exportación id ' + r[1] + ' correcta'); });
                });
              }
            });
          }

        }
      });
    }
  });

}

// codificación utf8

l['inicio'] = {};

l['inicio']['titulo'] = 'Inicio';
l['inicio']['preparacion'] = 'Preparación';
l['inicio']['registro'] = 'Registro';
l['inicio']['analisis'] = 'Análisis';

l['inicio']['offline'] = 'No hay conexión a Internet, por favor comprueba tu conexión e inténtalo de nuevo';
l['inicio']['sin_transferencias'] = 'No hay partidos pendientes de revisión';


// JavaScript Document

function inicio_analisis(){

  $('#analisis .seleccion').click(function(){
    if($(this).hasClass('seleccionado')){
     $(this).removeClass('seleccionado');
     $('#analisis .registro').addClass('inactivo');
    } else {
      $('#analisis .seleccion').removeClass('seleccionado');
      $(this).addClass('seleccionado');
      $('#analisis .registro').removeClass('inactivo');
    }
  });

  $('#analisis .registro').addClass('inactivo');
  $('#analisis .registro').click(function(){
    if(!$(this).hasClass('inactivo')){
      switch($('#analisis .seleccionado').attr('data-tipo')){
        case 'partido': mostrar_pagina('lista_partidos_analisis'); break;
        case 'rango': mostrar_pagina('seleccion_rango'); break;
      }
    }
  });

}

function mostrado_analisis(){
  redimensionar_contenido('analisis');
}

// codificación utf8

l['analisis'] = {};

l['analisis']['titulo'] = 'Análisis de partidos';

l['analisis']['un_partido'] = 'Un partido';
l['analisis']['rango'] = 'Rango de partidos';


// JavaScript Document

var analisis_rango_seleccion = '';

function inicio_seleccion_rango(){

  analisis_rango_seleccion = '';

  $('#seleccion_rango .seleccion').click(function(){
    if($(this).hasClass('seleccionado')){
     $(this).removeClass('seleccionado');
     $('#seleccion_rango .registro').addClass('inactivo');
    } else {
      $('#seleccion_rango .seleccion').removeClass('seleccionado');
      $(this).addClass('seleccionado');
      $('#seleccion_rango .registro').removeClass('inactivo');
    }
  });

  $('#seleccion_rango .registro').addClass('inactivo');
  $('#seleccion_rango .registro').click(function(){
    if(!$(this).hasClass('inactivo')){
      analisis_rango_seleccion = $('#seleccion_rango .seleccion.seleccionado').attr('data-tipo');

      if(window.localStorage.getItem('usuario_licencia') == 'free' && (analisis_rango_seleccion == 'ultimos_6_meses' || analisis_rango_seleccion == 'ultimo_anyo' || analisis_rango_seleccion == 'todos_partidos')){
        notificacion(l['seleccion_rango']['licencia_insuficiente']);
        analisis_rango_seleccion = 'ultimos_3_meses';
      }
      
      mostrar_pagina('analisis_numerico_rango');

    }
  });

}

function mostrado_seleccion_rango(){
  redimensionar_contenido('seleccion_rango');
}

// codificación utf8

l['seleccion_rango'] = {};

l['seleccion_rango']['titulo'] = 'Rango de Partidos';

l['seleccion_rango']['ultima_semana'] = 'Última semana';
l['seleccion_rango']['ultimo_mes'] = 'Último mes';
l['seleccion_rango']['ultimos_3_meses'] = 'Últimos 3 meses';
l['seleccion_rango']['ultimos_6_meses'] = 'Últimos 6 meses';
l['seleccion_rango']['ultimo_anyo'] = 'Último año';
l['seleccion_rango']['todos_partidos'] = 'Todos los partidos';

l['seleccion_rango']['licencia_insuficiente'] = 'Rango seleccionado mayor a 3 meses. Adquiera la versión Premium para ver su contenido completo';


// JavaScript Document

function inicio_registro_usuario_2(){
  $('#registro_usuario_2 .registro').click(function(){ registro_usuario_2(); });
}

function mostrado_registro_usuario_2(){
	redimensionar_contenido('registro_usuario_2');

  $('#registro_usuario_2 .sexo').scroller($.extend({preset: 'select'}, {
    label: l['sexo'], cancelText: l['cancelar'], setText: l['aceptar'],
    theme: 'android-ics', lang: 'es', mode: 'mixed', display: 'modal', animate: 'none',
    onShow: function(){ centrar_mobiscroll(); $('.select_sexo').addClass('focus'); },
    onClose: function(){ $('.select_sexo').removeClass('focus'); }
  }));
  $('#registro_usuario_2 .select_sexo input').click(function(e){ $('#registro_usuario_2 .sexo').mobiscroll('getInst').show(); });

  $('#registro_usuario_2 .nivel').scroller($.extend({preset: 'select'}, {
    label: l['nivel'], cancelText: l['cancelar'], setText: l['aceptar'],
    theme: 'android-ics', lang: 'es', mode: 'mixed', display: 'modal', animate: 'none',
    onShow: function(){ centrar_mobiscroll(); $('.select_nivel').addClass('focus'); },
    onClose: function(){ $('.select_nivel').removeClass('focus'); }
  }));
  $('#registro_usuario_2 .select_nivel input').click(function(e){ $('#registro_usuario_2 .nivel').mobiscroll('getInst').show(); });

}

function registro_usuario_2(){

  var nombre = $('#registro_usuario_2 .nombre').val().trim();
  var apellidos = $('#registro_usuario_2 .apellidos').val().trim();
  var edad = $('#registro_usuario_2 .edad').val().trim();
  var sexo = $('#registro_usuario_2 .sexo').val().trim();
  var poblacion = $('#registro_usuario_2 .poblacion').val().trim();
  var codigo_postal = $('#registro_usuario_2 .codigo_postal').val().trim();
  var pais = $('#registro_usuario_2 .pais').val().trim();
  var nivel = $('#registro_usuario_2 .nivel').val().trim();

  if(nombre == ''){ notificacion(l['registro_usuario_2']['nombre_vacio'], null); return false; }
  if(apellidos == ''){ notificacion(l['registro_usuario_2']['apellidos_vacio'], null); return false; }
  if(edad == ''){ notificacion(l['registro_usuario_2']['edad_vacio'], null); return false; }
  if(!validar_entero(edad)){ notificacion(l['registro_usuario_2']['edad_invalida'], null); return false; }
  if(parseInt(edad) < 13){ notificacion(l['registro_usuario_2']['edad_invalida'], null); return false; }
  if(sexo == ''){ notificacion(l['registro_usuario_2']['sexo_vacio'], null); return false; }
  if(poblacion == ''){ notificacion(l['registro_usuario_2']['poblacion_vacio'], null); return false; }
  if(codigo_postal == ''){ notificacion(l['registro_usuario_2']['codigo_postal_vacio'], null); return false; }
  if(pais == ''){ notificacion(l['registro_usuario_2']['pais_vacio'], null); return false; }
  if(nivel == ''){ notificacion(l['registro_usuario_2']['nivel_vacio'], null); return false; }

  if(online()){
    $('#registro_usuario_2 .registro').addClass('inactivo');
    var jqxhr = $.post(url_api + 'registro_usuario_2', {'id': id_usuario, 'password': token, 'nombre': encodeURI(nombre), 'apellidos': encodeURI(apellidos), 'edad': encodeURI(edad), 'sexo': encodeURI(sexo), 'poblacion': encodeURI(poblacion), 'codigo_postal': encodeURI(codigo_postal), 'pais': encodeURI(pais), 'nivel': encodeURI(nivel), 'dummy': 'dummy'}, function(data){ 
      console.log('registro_usuario_2: ' + data);
      switch(data.trim()){
        case 'ok':
          window.localStorage.setItem('registro_completo', 'si');
          notificacion(l['registro_usuario_2']['recuerda_activar'], null);
          mostrar_pagina('login');
        break;
      }

    }, 'text')
    .fail(function(){ notificacion(l['api_error_conexion'], null); })
    .always(function(){ $('#registro_usuario_2 .registro').removeClass('inactivo'); });
  } else { notificacion(l['offline'], null); return false; }

}

// codificación utf8

l['registro_usuario_2'] = {};

l['registro_usuario_2']['titulo'] = 'Registro de usuario';
l['registro_usuario_2']['registro'] = 'Registro';
l['registro_usuario_2']['nombre'] = 'Nombre';
l['registro_usuario_2']['apellidos'] = 'Apellidos';
l['registro_usuario_2']['edad'] = 'Edad';
l['registro_usuario_2']['sexo'] = 'Sexo';
l['registro_usuario_2']['hombre'] = 'Hombre';
l['registro_usuario_2']['mujer'] = 'Mujer';
l['registro_usuario_2']['poblacion'] = 'Población';
l['registro_usuario_2']['codigo_postal'] = 'Código postal';
l['registro_usuario_2']['pais'] = 'Pais';
l['registro_usuario_2']['nivel'] = 'Nivel';
l['registro_usuario_2']['nivel_7'] = '7 Profesional alto';
l['registro_usuario_2']['nivel_65'] = '6.5 Profesional';
l['registro_usuario_2']['nivel_6'] = '6 Profesional';
l['registro_usuario_2']['nivel_55'] = '5.5 Amateur alto';
l['registro_usuario_2']['nivel_5'] = '5 Amateur alto';
l['registro_usuario_2']['nivel_45'] = '4.5 Amateur medio';
l['registro_usuario_2']['nivel_4'] = '4 Amateur medio';
l['registro_usuario_2']['nivel_35'] = '3.5 Amateur bajo';
l['registro_usuario_2']['nivel_3'] = '3 Amateur bajo';
l['registro_usuario_2']['nivel_25'] = '2.5 Iniciado';
l['registro_usuario_2']['nivel_2'] = '2 Iniciado';
l['registro_usuario_2']['nivel_15'] = '1.5 Principiante';
l['registro_usuario_2']['nivel_1'] = '1 Principiante';

l['registro_usuario_2']['nombre_vacio'] = 'Tu nombre no puede estar en blanco';
l['registro_usuario_2']['apellidos_vacio'] = 'Tus apellidos no puden estar en blanco';
l['registro_usuario_2']['edad_vacio'] = 'Tu edad no puede estar en blanco';
l['registro_usuario_2']['edad_invalida'] = 'Tu edad no es válida';
l['registro_usuario_2']['sexo_vacio'] = 'Tienes seleccionar tu sexo';
l['registro_usuario_2']['poblacion_vacio'] = 'Tu población no puede estar en blanco';
l['registro_usuario_2']['codigo_postal_vacio'] = 'Tu código postal no puede estar en blanco';
l['registro_usuario_2']['pais_vacio'] = 'Tu pais no puede estar en blanco';
l['registro_usuario_2']['nivel_vacio'] = 'Tienes seleccionar tu nivel';
l['registro_usuario_2']['recuerda_activar'] = 'Recuerda validar tu email antes de iniciar tu sesión. IMPORTANTE!! Revisa tu SPAM en caso de no recibir el email de confirmación en los próximos 5 minutos.';

l['registro_usuario_2']['offline'] = 'No hay conexión a Internet, conéctate e inténtalo de nuevo';


// JavaScript Document

var registro_partido = {'id': '', 'id_jugador_1': '', 'nombre_jugador_1': '', 'id_jugador_2': '', 'nombre_jugador_2': '', 'id_jugador_3': '', 'nombre_jugador_3': '', 'id_jugador_4': '', 'nombre_jugador_4': '', 'sets': 0, 'juegos': 0, 'puntos': 0, 'puntos_tiebreak': 0, 'tipo_puntos': '', 'local': 0, 'visitante': 0, 'set_1': { 'local': 0, 'visitante': 0, 'saque_1': 0, 'saque_2': 0, 'saque_3': 0, 'saque_4': 0 }, 'set_2': { 'local': 0, 'visitante': 0, 'saque_1': 0, 'saque_2': 0, 'saque_3': 0, 'saque_4': 0 }, 'set_3': { 'local': 0, 'visitante': 0, 'saque_1': 0, 'saque_2': 0, 'saque_3': 0, 'saque_4': 0 }, 'set_4': { 'local': 0, 'visitante': 0, 'saque_1': 0, 'saque_2': 0, 'saque_3': 0, 'saque_4': 0 }, 'set_5': { 'local': 0, 'visitante': 0, 'saque_1': 0, 'saque_2': 0, 'saque_3': 0, 'saque_4': 0 } , 'acciones': [] };
var registro_accion = {'id': 0, 'id_jugador': '', 'n_jugador': 0, 'saque': 0, 'accion': '', 'golpe': '', 'mano': '', 'donde': '', 'n_set': 0, 'n_juego': 0, 'marcador_juego_local': 0, 'marcador_juego_visitante': 0, 'variacion_local': 0, 'variacion_visitante': 0, 'marcador_local': 0, 'marcador_visitante': 0, 'marcador_set1_local': 0, 'marcador_set1_visitante': 0, 'marcador_set2_local': 0, 'marcador_set2_visitante': 0, 'marcador_set3_local': 0, 'marcador_set3_visitante': 0, 'marcador_set4_local': 0, 'marcador_set4_visitante': 0, 'marcador_set5_local': 0, 'marcador_set5_visitante': 0};

var seleccionando_sacador = false;
var jugador_al_saque = 0;

var debug = true;

var analisis_golpes = { 'jugador_1': false, 'jugador_2': false, 'jugador_3': false, 'jugador_4': false };

function inicio_registro(){

  analisis_golpes = { 'jugador_1': false, 'jugador_2': false, 'jugador_3': false, 'jugador_4': false };  

  if(ajustes_registro_jugador_1 == 1) analisis_golpes.jugador_1 = true;
  if(ajustes_registro_jugador_2 == 1) analisis_golpes.jugador_2 = true;
  if(ajustes_registro_jugador_3 == 1) analisis_golpes.jugador_3 = true;
  if(ajustes_registro_jugador_4 == 1) analisis_golpes.jugador_4 = true;

  registro_cargar_partido();
  registro_stop();

  $('#control .play').click(function(){ if(!$(this).hasClass('inactivo')) registro_start(); });
  $('#control .pausa').click(function(){ if(!$(this).hasClass('inactivo')) registro_stop(); });
  $('#control .stop').click(function(){ if(!$(this).hasClass('inactivo')) registro_finalizar(); });

  $('#jugadores .jugador').click(function(){ if(!$(this).hasClass('inactivo')) registro_seleccionar_jugador($(this)); });
  $('#acciones .accion').click(function(){ if(!$(this).hasClass('inactivo')) registro_seleccionar_accion($(this)); });
  $('#registro .boton_registro').click(function(){ if(!$(this).hasClass('inactivo')){ if(seleccionando_sacador) registrar_sacador(); else registrar_accion(); } });
  $('#marcador .boton').click(function(){ if(!$(this).hasClass('inactivo')) registrar_accion(parseInt($(this).attr('variacion-local')), parseInt($(this).attr('variacion-visitante'))); });

  $('#registro .boton_estadistica').click(function(){ 
    if(!$(this).hasClass('inactivo')){ 
      var licencia = window.localStorage.getItem('usuario_licencia');
      if(licencia == 'silver' || licencia == 'gold'){
        partido_seleccionado = registro_partido.id; 
        origen_partido_seleccionado = 'registro'; 
        mostrar_pagina('analisis_numerico_1p'); 
      } else notificacion(l['registro']['acceso_directo_restringido']);
    } 
  });

  $('#golpes .golpe').click(function(){ if(!$(this).hasClass('inactivo')) registro_seleccionar_golpe($(this)); });
  $('#manos .mano').click(function(){ if(!$(this).hasClass('inactivo')) registro_seleccionar_mano($(this)); });
  $('#donde .donde').click(function(){ if(!$(this).hasClass('inactivo')) registro_seleccionar_donde($(this)); });

  $('#consola .subir').click(function(){ if(!$(this).hasClass('inactivo')) registro_consola_subir(); });
  $('#consola .bajar').click(function(){ if(!$(this).hasClass('inactivo')) registro_consola_bajar(); });
  $('#consola .eliminar').click(function(){ if(!$(this).hasClass('inactivo') && $('#consola .acciones .cursor').length == 1) navigator.notification.confirm(l['registro']['eliminar_estas_seguro'], function(b){ if(b == 1) registro_eliminar($('#consola .acciones .cursor').attr('accion')); }, l['padelstat'], l['si'] + ',' + l['no']); });

  $('.volver').click(function(){
    if($('#control .play').css('display') == 'none') notificacion(l['registro']['partido_en_curso']);
    else {
      mostrar_pagina('inicio'); // mostrar_pagina('lista_partidos');
      sincronizar_partidos();
    }
  });

  if(window.localStorage.getItem('ayuda_registro') == null){
    window.localStorage.setItem('ayuda_registro', 1);
    $('#registro .overlay').show();
    $('#registro .flash_ayuda').show();
    $('#registro .flash_ayuda .cerrar').click(function(){ $('#registro .flash_ayuda').hide(); $('#registro .overlay').hide(); });
  }

}

function mostrado_registro(){
  redimensionar_contenido('registro');
  $('#registro #pantalla_golpes').css('height', ($('#registro .contenido').height() - 10) + "px");
  $('#lista_partidos .lista').css('height', ($('#lista_partidos .contenido').height() - 20) + "px");

  if(registro_partido.id_jugador_1.substr(-1) == '*' || registro_partido.id_jugador_2.substr(-1) == '*' || registro_partido.id_jugador_3.substr(-1) == '*' || registro_partido.id_jugador_4.substr(-1) == '*'){
    var partidos_restantes = parseInt(window.localStorage.getItem('usuario_partidas'));
    if(partidos_restantes > 0 && partidos_restantes < 4){
      var txt = l['quedan_pocas_partidas'].replace('N', partidos_restantes.toString());
      notificacion(txt);
    }
    if(partidos_restantes <= 0){
      notificacion(l['no_quedan_partidas']);
      setTimeout("mostrar_pagina('inicio');", 1000);
    }
  }

}

function registro_cargar_partido(autostart){

  registro_partido = {'id': partido_seleccionado, 'id_jugador_1': '', 'nombre_jugador_1': '', 'id_jugador_2': '', 'nombre_jugador_2': '', 'id_jugador_3': '', 'nombre_jugador_3': '', 'id_jugador_4': '', 'nombre_jugador_4': '', 'sets': 0, 'juegos': 0, 'puntos': 0, 'tipo_puntos': '', 'local': 0, 'visitante': 0, 'set_1': { 'local': 0, 'visitante': 0, 'saque_1': 0, 'saque_2': 0, 'saque_3': 0, 'saque_4': 0 }, 'set_2': { 'local': 0, 'visitante': 0, 'saque_1': 0, 'saque_2': 0, 'saque_3': 0, 'saque_4': 0 }, 'set_3': { 'local': 0, 'visitante': 0, 'saque_1': 0, 'saque_2': 0, 'saque_3': 0, 'saque_4': 0 }, 'set_4': { 'local': 0, 'visitante': 0, 'saque_1': 0, 'saque_2': 0, 'saque_3': 0, 'saque_4': 0 }, 'set_5': { 'local': 0, 'visitante': 0, 'saque_1': 0, 'saque_2': 0, 'saque_3': 0, 'saque_4': 0 } , 'acciones': [] };
  registro_partido.acciones.push({'id': 0, 'id_jugador': '', 'n_jugador': 0, 'saque': 0, 'accion': '', 'golpe': '', 'mano': '', 'donde': '', 'n_set': 1, 'n_juego': 1, 'marcador_juego_local': 0, 'marcador_juego_visitante': 0, 'variacion_local': 0, 'variacion_visitante': 0, 'marcador_local': 0, 'marcador_visitante': 0, 'marcador_set1_local': 0, 'marcador_set1_visitante': 0, 'marcador_set2_local': 0, 'marcador_set2_visitante': 0, 'marcador_set3_local': 0, 'marcador_set3_visitante': 0, 'marcador_set4_local': 0, 'marcador_set4_visitante': 0, 'marcador_set5_local': 0, 'marcador_set5_visitante': 0});

  db.transaction(function(tx){
    tx.executeSql('select * from partidos where id=?', [partido_seleccionado], function (tx, results) {

      var partido = results.rows.item(0);        

      registro_partido.id_jugador_1 = partido.id_jugador_1;
      registro_partido.id_jugador_2 = partido.id_jugador_2;
      registro_partido.id_jugador_3 = partido.id_jugador_3;
      registro_partido.id_jugador_4 = partido.id_jugador_4;

      if(ajustes_registro_usuario == 1){
        if(registro_partido.id_jugador_1.substr(-1) == '*') analisis_golpes.jugador_1 = true;
        if(registro_partido.id_jugador_2.substr(-1) == '*') analisis_golpes.jugador_2 = true;
        if(registro_partido.id_jugador_3.substr(-1) == '*') analisis_golpes.jugador_3 = true;
        if(registro_partido.id_jugador_4.substr(-1) == '*') analisis_golpes.jugador_4 = true;
      }

      registro_partido.sets = partido.sets;
      registro_partido.juegos = partido.juegos;
      registro_partido.puntos = partido.puntos;
      registro_partido.puntos_tiebreak = partido.puntos_tiebreak;
      registro_partido.tipo_puntos = partido.tipo_puntos;

      registro_partido.local = parseInt(partido.marcador_local);
      registro_partido.visitante = parseInt(partido.marcador_visitante);

      registro_partido.set_1.local = parseInt(partido.marcador_set1_local);
      registro_partido.set_1.visitante = parseInt(partido.marcador_set1_visitante);
      registro_partido.set_1.saque_1 = parseInt(partido.saque_1_set1);
      registro_partido.set_1.saque_2 = parseInt(partido.saque_2_set1);
      registro_partido.set_1.saque_3 = parseInt(partido.saque_3_set1);
      registro_partido.set_1.saque_4 = parseInt(partido.saque_4_set1);

      registro_partido.set_2.local = parseInt(partido.marcador_set2_local);
      registro_partido.set_2.visitante = parseInt(partido.marcador_set2_visitante);
      registro_partido.set_2.saque_1 = parseInt(partido.saque_1_set2);
      registro_partido.set_2.saque_2 = parseInt(partido.saque_2_set2);
      registro_partido.set_2.saque_3 = parseInt(partido.saque_3_set2);
      registro_partido.set_2.saque_4 = parseInt(partido.saque_4_set2);

      registro_partido.set_3.local = parseInt(partido.marcador_set3_local);
      registro_partido.set_3.visitante = parseInt(partido.marcador_set3_visitante);
      registro_partido.set_3.saque_1 = parseInt(partido.saque_1_set3);
      registro_partido.set_3.saque_2 = parseInt(partido.saque_2_set3);
      registro_partido.set_3.saque_3 = parseInt(partido.saque_3_set3);
      registro_partido.set_3.saque_4 = parseInt(partido.saque_4_set3);

      registro_partido.set_4.local = parseInt(partido.marcador_set4_local);
      registro_partido.set_4.visitante = parseInt(partido.marcador_set4_visitante);
      registro_partido.set_4.saque_1 = parseInt(partido.saque_1_set4);
      registro_partido.set_4.saque_2 = parseInt(partido.saque_2_set4);
      registro_partido.set_4.saque_3 = parseInt(partido.saque_3_set4);
      registro_partido.set_4.saque_4 = parseInt(partido.saque_4_set4);

      registro_partido.set_5.local = parseInt(partido.marcador_set5_local);
      registro_partido.set_5.visitante = parseInt(partido.marcador_set5_visitante);
      registro_partido.set_5.saque_1 = parseInt(partido.saque_1_set5);
      registro_partido.set_5.saque_2 = parseInt(partido.saque_2_set5);
      registro_partido.set_5.saque_3 = parseInt(partido.saque_3_set5);
      registro_partido.set_5.saque_4 = parseInt(partido.saque_4_set5);

      $('#jugadores .jugador_1').attr('data-id', partido.id_jugador_1);
      tx.executeSql('select "' + partido.id + '" as partido, id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_1], function(tx, results){
        var jugador = results.rows.item(0);
        $('#jugadores .jugador_1').html('<i></i>' + jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
        registro_partido.nombre_jugador_1 = jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.';
      });

      $('#jugadores .jugador_2').attr('data-id', partido.id_jugador_2);
      tx.executeSql('select "' + partido.id + '" as partido, id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_2], function(tx, results){
        var jugador = results.rows.item(0);
        $('#jugadores .jugador_2').html('<i></i>' + jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
        registro_partido.nombre_jugador_2 = jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.';
      });

      $('#jugadores .jugador_3').attr('data-id', partido.id_jugador_3);
      tx.executeSql('select "' + partido.id + '" as partido, id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_3], function(tx, results){
        var jugador = results.rows.item(0);
        $('#jugadores .jugador_3').html('<i></i>' + jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
        registro_partido.nombre_jugador_3 = jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.';
      });

      $('#jugadores .jugador_4').attr('data-id', partido.id_jugador_4);
      tx.executeSql('select "' + partido.id + '" as partido, id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_4], function(tx, results){
        var jugador = results.rows.item(0);
        $('#jugadores .jugador_4').html('<i></i>' + jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
        registro_partido.nombre_jugador_4 = jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.';
      });

      tx.executeSql('select * from acciones where id_partido=? order by id', [registro_partido.id], function (tx, results) {
        for (i = 0; i < results.rows.length; i++){
          var a = results.rows.item(i);
          var accion = {'id': a.id, 'id_jugador': a.id_jugador, 'n_jugador': parseInt(a.n_jugador), 'saque': parseInt(a.saque), 'accion': a.accion, 'golpe': a.golpe, 'mano': a.mano, 'donde': a.donde, 'n_set': parseInt(a.n_set), 'n_juego': parseInt(a.n_juego), 'marcador_juego_local': parseInt(a.marcador_juego_local), 'marcador_juego_visitante': parseInt(a.marcador_juego_visitante), 'variacion_local': parseInt(a.variacion_local), 'variacion_visitante': parseInt(a.variacion_visitante), 'marcador_local': parseInt(a.marcador_local), 'marcador_visitante': parseInt(a.marcador_visitante), 'marcador_set1_local': parseInt(a.marcador_set1_local), 'marcador_set1_visitante': parseInt(a.marcador_set1_visitante), 'marcador_set2_local': parseInt(a.marcador_set2_local), 'marcador_set2_visitante': parseInt(a.marcador_set2_visitante), 'marcador_set3_local': parseInt(a.marcador_set3_local), 'marcador_set3_visitante': parseInt(a.marcador_set3_visitante), 'marcador_set4_local': parseInt(a.marcador_set4_local), 'marcador_set4_visitante': parseInt(a.marcador_set4_visitante), 'marcador_set5_local': parseInt(a.marcador_set5_local), 'marcador_set5_visitante': parseInt(a.marcador_set5_visitante)};
          registro_partido.acciones.push(accion);
        }
        registro_dibujar_marcador();
        registro_dibujar_consola();
        if(autostart != undefined) registro_start();
      });

    });
  }); 

}

function registro_stop(){

  registro_dibujar_marcador();

  $('#control .play').show().removeClass('inactivo');
  $('#control .pausa').hide();
  $('#control .stop').addClass('inactivo');
  $('#control').addClass('activo');

  registro_desactivar_marcador();
  registro_desactivar_jugadores();
  registro_desactivar_acciones();
  registro_desactivar_consola();

  $('#pantalla_golpes').hide();
  $('#registro .boton_registro').addClass('inactivo');
  $('#registro .boton_estadistica').removeClass('inactivo');

  sincronizar_partidos();

}

function registro_activar_marcador(){
  $('#marcador .boton').removeClass('inactivo');
}

function registro_desactivar_marcador(){
  $('#marcador').removeClass('activo');
  $('#marcador .pala').removeClass('activo');
  $('#marcador .boton').addClass('inactivo');
}

function registro_activar_jugadores(){
  $('#jugadores .jugador').removeClass('inactivo');
}

function registro_desactivar_jugadores(){
  $('#jugadores').removeClass('activo');
  $('#jugadores .jugador').removeClass('activo');
  $('#jugadores .jugador').addClass('inactivo');
}

function registro_activar_acciones(){
  $('#acciones .accion').removeClass('activo');
  $('#acciones .accion').removeClass('inactivo');
}

function registro_desactivar_acciones(){
  $('#acciones').removeClass('activo');
  $('#acciones .accion').removeClass('activo').addClass('inactivo');
}

function registro_activar_consola(){
  $('#consola .boton').removeClass('inactivo');
}

function registro_desactivar_consola(){
  $('#consola .boton').addClass('inactivo');
}

function registro_dibujar_marcador(){

  var accion = registro_partido.acciones[registro_partido.acciones.length - 1];

  var n_set = registro_partido.local + registro_partido.visitante + 1; // set en curso
  var n_juego = registro_partido['set_' + n_set]['local'] + registro_partido['set_' + n_set]['visitante'] + 1; // juego en curso

  var marcador_juego_local = 0;
  var marcador_juego_visitante = 0; 
  if(accion.n_set == n_set && accion.n_juego == n_juego){ // si esta accion pertenece al mismo juego que la anterior, el marcador continua desde donde se dejo
    marcador_juego_local = accion.marcador_juego_local + accion.variacion_local;
    marcador_juego_visitante = accion.marcador_juego_visitante + accion.variacion_visitante;
  }

  $('#marcador .local .set_1').html(registro_partido.set_1.local);
  $('#marcador .visitante .set_1').html(registro_partido.set_1.visitante);
  $('#marcador .local .set_2').html(registro_partido.set_2.local);
  $('#marcador .visitante .set_2').html(registro_partido.set_2.visitante);
  $('#marcador .local .set_3').html(registro_partido.set_3.local);
  $('#marcador .visitante .set_3').html(registro_partido.set_3.visitante);

  var tiebreak = (n_juego > registro_partido.juegos * 2);

  if(registro_partido.tipo_puntos == 'estandar'){

    if(!tiebreak){

      var local = "0";
      var visitante = "0";

      switch(marcador_juego_local){
        case 0: local = "0"; break;
        case 1: local = "15"; break;
        case 2: local = "30"; break;
        case 3: local = "40"; break;
        default:
          if(marcador_juego_local <= marcador_juego_visitante) local = "40";
          else if(marcador_juego_local == marcador_juego_visitante + 1) local = "V";
          else local = "G";
      }

      switch(marcador_juego_visitante){
        case 0: visitante = "0"; break;
        case 1: visitante = "15"; break;
        case 2: visitante = "30"; break;
        case 3: visitante = "40"; break;
        default:
          if(marcador_juego_visitante <= marcador_juego_local) visitante = "40";
          else if(marcador_juego_visitante == marcador_juego_local + 1) visitante = "V";
          else visitante = "G";
      }

      $('#marcador .local .marcador').html(local);
      $('#marcador .visitante .marcador').html(visitante);

    } else {
      $('#marcador .local .marcador').html(marcador_juego_local);
      $('#marcador .visitante .marcador').html(marcador_juego_visitante);
    }
  } else {
    $('#marcador .local .marcador').html(marcador_juego_local);
    $('#marcador .visitante .marcador').html(marcador_juego_visitante);
  }


  // dibujamos pala al saque

  if(tiebreak){
    var i = marcador_juego_local + marcador_juego_visitante + 1; // n. de punto del juego
    if(i % 2 == 1) i--;
    i = i % 8;
    switch(i){
      case 0: turno_saque = 1; break;
      case 2: turno_saque = 2; break;
      case 4: turno_saque = 3; break;
      case 6: turno_saque = 4; break;
    }
  }

  jugador_al_saque = registro_partido['set_' + n_set]['saque_' + turno_saque];

  $('.pala').removeClass('activo');
  $('.pala.jugador_' + jugador_al_saque).addClass('activo');

}

function registro_dibujar_consola(){
  $('#consola .acciones').empty();
  for(i=registro_partido.acciones.length - 1; i > registro_partido.acciones.length - 4; i--){
    if(i > 0){
      
      var accion = registro_partido.acciones[i];
      console.log(accion);

      var html = '<li accion="' + accion.id + '">'; 
      if($('#consola .acciones').html() == '') html = '<li accion="' + accion.id + '" class="cursor">';

      if(accion.n_jugador == 0){ // accion manual
        html += l['registro']['consola_manual'] + ' ';
        if(accion.variacion_local != 0){
          html += l['registro']['consola_local'] + ' ';
          if(accion.variacion_local > 0) html += '+';
          html += accion.variacion_local;
        }
        if(accion.variacion_visitante != 0){
          html += l['registro']['consola_visitante'] + ' ';
          if(accion.variacion_visitante > 0) html += '+';
          html += accion.variacion_visitante;
        }
      } else {

        html += registro_partido['nombre_jugador_' + accion.n_jugador];
        html += ' - ' + l['registro']['consola_' + accion.accion];

        if(accion.golpe != '') html += ' - ' + l['registro'][accion.golpe];
        if(accion.mano != '') html += ' - ' + l['registro'][accion.mano];
        if(accion.donde != '') html += ' - ' + l['registro'][accion.donde];

      }
      html += '</li>';

      //var html = '<li>Jugador - Accion - Golpe - Mano - Donde</li>';
      $('#consola .acciones').append(html);

    }
  }
}

function registro_consola_subir(){
  var accion = parseInt($('#consola .cursor').attr('accion')) + 1;
  if($('#consola li[accion="' + accion + '"]').length > 0){
    $('#consola li').removeClass('cursor');
    $('#consola li[accion="' + accion + '"]').addClass('cursor');
  }
}

function registro_consola_bajar(){
  var accion = parseInt($('#consola .cursor').attr('accion')) - 1;
  if($('#consola li[accion="' + accion + '"]').length > 0){
    $('#consola li').removeClass('cursor');
    $('#consola li[accion="' + accion + '"]').addClass('cursor');
  }
}

function registro_start(){

  registro_dibujar_marcador();
  registro_dibujar_consola();
  $('#pantalla_golpes').hide();

  if(registro_partido.local == Math.ceil(registro_partido.sets / 2) || registro_partido.visitante == Math.ceil(registro_partido.sets / 2)){
    navigator.notification.confirm(l['registro']['partido_finalizado_eliminar_accion'], 
      function(b){ 
        if(b == 1){
          db.transaction(function(tx){ tx.executeSql('update partidos set finalizado="no" where id=?', [registro_partido.id]); });
          registro_eliminar(registro_partido.acciones[registro_partido.acciones.length - 1].id);

          if(registro_partido.id_jugador_1.substr(-1) == '*' || registro_partido.id_jugador_2.substr(-1) == '*' || registro_partido.id_jugador_3.substr(-1) == '*' || registro_partido.id_jugador_4.substr(-1) == '*'){
            var partidas = parseInt(window.localStorage.getItem('usuario_partidas')) + 1;
            window.localStorage.setItem('usuario_partidas', partidas);
            var cambios_usuario_partidas = parseInt(window.localStorage.getItem('cambios_usuario_partidas')) + 1;
            window.localStorage.setItem('cambios_usuario_partidas', cambios_usuario_partidas);
          }

        } else {
          registro_stop();
        }
      }, l['padelstat'], l['si'] + ',' + l['no']);
    return;
  }

  seleccionando_sacador = false;
  jugador_al_saque = 0;

  $('#control .play').hide();
  $('#control .pausa').show();
  $('#control .stop').removeClass('inactivo');

  $('#registro .boton_registro').addClass('inactivo');
  $('#registro .boton_estadistica').addClass('inactivo');

  registro_desactivar_marcador();
  registro_desactivar_jugadores();
  registro_desactivar_acciones();
  registro_desactivar_consola();

  // cargamos la ultima accion
  var accion = registro_partido.acciones[registro_partido.acciones.length - 1];

  var n_set = registro_partido.local + registro_partido.visitante + 1; // set en curso
  var n_juego = registro_partido['set_' + n_set]['local'] + registro_partido['set_' + n_set]['visitante'] + 1; // juego en curso

  if(debug){
    console.log(' ');
    console.log('******************* registro_start() *******************');
    console.log(registro_partido);
    console.log('n_set: ' + n_set);
    console.log('n_juego: ' + n_juego);
  }

  var marcador_juego_local = 0;
  var marcador_juego_visitante = 0; 
  if(accion.n_set == n_set && accion.n_juego == n_juego){ // si esta accion pertenece al mismo juego que la anterior, el marcador continua desde donde se dejo
    marcador_juego_local = accion.marcador_juego_local + accion.variacion_local;
    marcador_juego_visitante = accion.marcador_juego_visitante + accion.variacion_visitante;
  }

  var tiebreak = (n_juego > registro_partido.juegos * 2);
  var puntos_juego = registro_partido.puntos;
  if(tiebreak) puntos_juego = registro_partido.puntos_tiebreak;

  // es fin de juego? el juego acaba cuando el marcador de un jugador supera la variable registro_partido.puntos y tiene una diferencia de dos con el rival
  
  if(marcador_juego_local >= puntos_juego && marcador_juego_local - marcador_juego_visitante >= 2){ // el equipo local gana el juego
    registro_partido['set_' + n_set]['local']++;
    db.transaction(function(tx){
      tx.executeSql('update partidos set marcador_set' + n_set + '_local=? where id=?', [registro_partido['set_' + n_set]['local'], registro_partido.id]);
    });

    // acaba el set?
    if(registro_partido['set_' + n_set]['local'] > registro_partido.juegos || (registro_partido['set_' + n_set]['local'] == registro_partido.juegos && registro_partido['set_' + n_set]['local'] - registro_partido['set_' + n_set]['visitante'] >= 2)){
      registro_partido.local++;
      db.transaction(function(tx){
        tx.executeSql('update partidos set marcador_local=? where id=?', [registro_partido.local, registro_partido.id]);
      });      

      // acaba el partido?
      if(registro_partido.local == Math.ceil(registro_partido.sets / 2)){
        notificacion(l['registro']['partido_finalizado']);
        db.transaction(function(tx){
          cambios_partido = 1; window.localStorage.setItem('cambios_partido', cambios_partido);
          tx.executeSql('update partidos set cambios_acciones=1, finalizado="si" where id=?', [registro_partido.id], function(tx, results){});

          var c_acciones = 0;
          var c_golpes = 0;
          for(i=0; i<registro_partido.acciones.length; i++){
            if(registro_partido.acciones[i].accion == 'enf' || registro_partido.acciones[i].accion == 'ef' || registro_partido.acciones[i].accion == 'pg') c_acciones++;
            if(registro_partido.acciones[i].golpe != '') c_golpes++;
          }
          if(c_acciones > 20){
            ga_evento('partidos', 'registro acciones');
            if(c_golpes > 0) ga_evento('partidos', 'registro estadisticas profundas');
          }

          if(registro_partido.id_jugador_1.substr(-1) == '*' || registro_partido.id_jugador_2.substr(-1) == '*' || registro_partido.id_jugador_3.substr(-1) == '*' || registro_partido.id_jugador_4.substr(-1) == '*'){
            var partidas = parseInt(window.localStorage.getItem('usuario_partidas')) - 1;
            window.localStorage.setItem('usuario_partidas', partidas);
            var cambios_usuario_partidas = parseInt(window.localStorage.getItem('cambios_usuario_partidas')) - 1;
            window.localStorage.setItem('cambios_usuario_partidas', cambios_usuario_partidas);
          }

        });
        registro_stop();
        return;
      } else {
        registro_start();
        return;
      }

    } else {
      registro_start();
      return;
    }
  }

  if(marcador_juego_visitante >= puntos_juego && marcador_juego_visitante - marcador_juego_local >= 2){ // el equipo visitante gana el juego
    registro_partido['set_' + n_set]['visitante']++;
    db.transaction(function(tx){
      tx.executeSql('update partidos set marcador_set' + n_set + '_visitante=? where id=?', [registro_partido['set_' + n_set]['visitante'], registro_partido.id]);
    });

    // acaba el set?
    if(registro_partido['set_' + n_set]['visitante'] > registro_partido.juegos || (registro_partido['set_' + n_set]['visitante'] == registro_partido.juegos && registro_partido['set_' + n_set]['visitante'] - registro_partido['set_' + n_set]['local'] >= 2)){
      registro_partido.visitante++;
      db.transaction(function(tx){
        tx.executeSql('update partidos set marcador_visitante=? where id=?', [registro_partido.visitante, registro_partido.id]);
      });      

      // acaba el partido?
      if(registro_partido.visitante == Math.ceil(registro_partido.sets / 2)){
        notificacion(l['registro']['partido_finalizado']);
        db.transaction(function(tx){
          cambios_partido = 1; window.localStorage.setItem('cambios_partido', cambios_partido);
          tx.executeSql('update partidos set cambios_acciones=1, finalizado="si" where id=?', [registro_partido.id], function(tx, results){});

          var c_acciones = 0;
          var c_golpes = 0;
          for(i=0; i<registro_partido.acciones.length; i++){
            if(registro_partido.acciones[i].accion == 'enf' || registro_partido.acciones[i].accion == 'ef' || registro_partido.acciones[i].accion == 'pg') c_acciones++;
            if(registro_partido.acciones[i].golpe != '') c_golpes++;
          }
          if(c_acciones > 20){
            ga_evento('partidos', 'registro acciones');
            if(c_golpes > 0) ga_evento('partidos', 'registro estadisticas profundas');
          }

          if(registro_partido.id_jugador_1.substr(-1) == '*' || registro_partido.id_jugador_2.substr(-1) == '*' || registro_partido.id_jugador_3.substr(-1) == '*' || registro_partido.id_jugador_4.substr(-1) == '*'){
            var partidas = parseInt(window.localStorage.getItem('usuario_partidas')) - 1;
            window.localStorage.setItem('usuario_partidas', partidas);
            var cambios_usuario_partidas = parseInt(window.localStorage.getItem('cambios_usuario_partidas')) - 1;
            window.localStorage.setItem('cambios_usuario_partidas', cambios_usuario_partidas);
          }

        });
        registro_stop();
        return;
      } else {
        registro_start();
        return;
      }

    } else {
      registro_start();
      return;
    }
  }

  // hay sacador?
  var turno_saque = n_juego % 4; if(turno_saque == 0) turno_saque = 4;
  if(isNaN(registro_partido['set_' + n_set]['saque_' + turno_saque])) registro_partido['set_' + n_set]['saque_' + turno_saque] = 0;
  if(registro_partido['set_' + n_set]['saque_' + turno_saque] == 0){ // no hay sacador
    registro_seleccionar_sacador(); return;
  } else { // dibuja al sacador

    if(tiebreak){
      var i = marcador_juego_local + marcador_juego_visitante + 1; // n. de punto del juego
      if(i % 2 == 1) i--;
      i = i % 8;
      switch(i){
        case 0: turno_saque = 1; break;
        case 2: turno_saque = 2; break;
        case 4: turno_saque = 3; break;
        case 6: turno_saque = 4; break;
      }
    }

    jugador_al_saque = registro_partido['set_' + n_set]['saque_' + turno_saque];

    // fin comrpobacion
    $('.pala').removeClass('activo');
    $('.pala.jugador_' + jugador_al_saque).addClass('activo');
  }

  if(debug){
    console.log('jugador_al_saque: ' + jugador_al_saque);
  }

  $('#jugadores').addClass('activo');
  registro_activar_marcador();
  registro_activar_jugadores();
  registro_activar_consola();

}

function registro_seleccionar_sacador(){

  seleccionando_sacador = true;

  registro_desactivar_marcador();
  registro_activar_jugadores();
  registro_desactivar_acciones();
  registro_desactivar_consola();

  $('#jugadores').addClass('activo');
  notificacion(l['registro']['seleccionar_sacador']);

  var n_set = registro_partido.local + registro_partido.visitante + 1; // set en curso
  var n_juego = registro_partido['set_' + n_set]['local'] + registro_partido['set_' + n_set]['visitante'] + 1; // juego en curso

  for(i=1; i<=4; i++){
    var j = registro_partido['set_' + n_set]['saque_' + i];
    $('#jugadores .jugador_' + j).addClass('inactivo');
  }

}

function registro_seleccionar_jugador(jugador){

  if(jugador.hasClass('activo')) jugador.removeClass('activo');
  else {
    $('#jugadores .jugador').removeClass('activo');
    jugador.addClass('activo');
  }

  if(seleccionando_sacador){

    if(jugador.hasClass('activo')) $('#registro .boton_registro').removeClass('inactivo');
    else $('#registro .boton_registro').addClass('inactivo');

  } else {

    registro_desactivar_acciones(); // asi limpiamos las acciones si cambiamos de jugador
    $('#registro .boton_registro').addClass('inactivo');

    if(jugador.hasClass('activo')) {
      $('#jugadores').removeClass('activo');
      $('#acciones').addClass('activo');
      registro_activar_acciones();
    } else {
      $('#jugadores').addClass('activo');
    }
    
  }

}

function registro_seleccionar_accion(accion){

  if(accion.hasClass('activo')) accion.removeClass('activo');
  else {
    $('#acciones .accion').removeClass('activo');
    accion.addClass('activo');
  }

  var jugador = $('#jugadores .jugador.activo').attr('n');
  if(analisis_golpes['jugador_' + jugador]){

    $('#golpes').addClass('activo');
    $('#golpes .golpe').removeClass('activo');
    $('#golpes .golpe').removeClass('inactivo');
    $('#manos').removeClass('activo');
    $('#manos .mano').removeClass('activo');
    $('#manos .mano').addClass('inactivo');
    $('#donde').removeClass('activo');
    $('#donde .donde').removeClass('activo');
    $('#donde .donde').addClass('inactivo');

    var a = registro_partido.acciones[registro_partido.acciones.length - 1];

    var n_set = registro_partido.local + registro_partido.visitante + 1; // set en curso
    var n_juego = registro_partido['set_' + n_set]['local'] + registro_partido['set_' + n_set]['visitante'] + 1; // juego en curso

    var turno_saque = n_juego % 4; if(turno_saque == 0) turno_saque = 4;
    var tiebreak = (n_juego > registro_partido.juegos * 2);
    
    var marcador_juego_local = 0;
    var marcador_juego_visitante = 0; 
    if(a.n_set == n_set && a.n_juego == n_juego){ // si esta accion pertenece al mismo juego que la anterior, el marcador continua desde donde se dejo
      marcador_juego_local = a.marcador_juego_local + a.variacion_local;
      marcador_juego_visitante = a.marcador_juego_visitante + a.variacion_visitante;
    }

    if(tiebreak){
      var i = marcador_juego_local + marcador_juego_visitante + 1; // n. de punto del juego
      if(i % 2 == 1) i--;
      i = i % 8;
      switch(i){
        case 0: turno_saque = 1; break;
        case 2: turno_saque = 2; break;
        case 4: turno_saque = 3; break;
        case 6: turno_saque = 4; break;
      }
    }

    var jugador = parseInt($('#jugadores .jugador.activo').attr('n'));
    var jugador_companero = 0;
    switch(jugador){
      case 1: jugador_companero = 2; break;
      case 2: jugador_companero = 1; break;
      case 3: jugador_companero = 4; break;
      case 4: jugador_companero = 3; break;
    }

    var jugador_al_saque = parseInt(registro_partido['set_' + n_set]['saque_' + turno_saque]);
    var jugador_al_saque_companero = 0;
    switch(jugador_al_saque){
      case 1: jugador_al_saque_companero = 2; break;
      case 2: jugador_al_saque_companero = 1; break;
      case 3: jugador_al_saque_companero = 4; break;
      case 4: jugador_al_saque_companero = 3; break;
    }

    // si el golpe lo efectua un jugador del equipo al saque el golpe no puede ser un resto
    if(jugador == jugador_al_saque || jugador == jugador_al_saque_companero){
      $('#golpes .golpe[golpe="resto"]').addClass('inactivo');
    }

    // por defecto desactivamos los saques y solo los activaremos en los casos que corresponda
    $('#golpes .golpe.saque').addClass('inactivo');

    // si el golpe anterior no pertenece al juego actual y el jugador esta al saque, puede realizarse un primer saque, pero no un segundo
    if((n_set != a.n_set || n_juego != a.n_juego) && jugador == jugador_al_saque) 
      $('#golpes .golpe[golpe="saque_1"]').removeClass('inactivo'); 

    // si el golpe anterior pertenece al juego actual, no es un primer saque fallado y el jugador esta al saque, puede realizar un primer saque pero no un segundo
    if(n_set == a.n_set && n_juego == a.n_juego && jugador == jugador_al_saque && (a.golpe != 'saque_1' || (a.golpe == 'saque_1' && a.accion == 'pg'))) 
      $('#golpes .golpe[golpe="saque_1"]').removeClass('inactivo'); 

    // si el golpe anterior pertenece al juego actual, es un primer saque fallado y el jugador esta al saque, puede realizar un segundo saque pero no un primero
    if(n_set == a.n_set && n_juego == a.n_juego && jugador == jugador_al_saque && a.golpe == 'saque_1' && (a.accion == 'enf' || a.accion == 'ef')) 
      $('#golpes .golpe[golpe="saque_2"]').removeClass('inactivo'); 

    $('#pantalla_golpes').show();

  } else {
    if(accion.hasClass('activo')){
      $('#acciones').removeClass('activo');
      $('#registro .boton_registro').removeClass('inactivo');
    } else {
      $('#acciones').addClass('activo');
      $('#registro .boton_registro').addClass('inactivo');
    }
  }

}

function registro_seleccionar_golpe(golpe){
  
  if(golpe.hasClass('activo')) golpe.removeClass('activo');
  else {
    $('#golpes .golpe').removeClass('activo');
    golpe.addClass('activo');
  }

  if(golpe.hasClass('activo')){
    $('#golpes').removeClass('activo');
    $('#manos').addClass('activo');
    $('#manos .mano').removeClass('inactivo');
  } else {
    $('#golpes').addClass('activo');
    $('#manos').removeClass('activo');
    $('#manos .mano').addClass('inactivo').removeClass('activo');
    $('#donde').removeClass('activo');
    $('#donde .donde').addClass('inactivo');
    $('#registro .boton_registro').addClass('inactivo');
  }

  switch(golpe.attr('golpe')){
    case 'saque_1':
    case 'saque_2':
    case 'bandeja':
    case 'smash':
      $('#manos .mano').removeClass('activo');
      $('#donde .donde').removeClass('activo');
      $('#manos .mano[mano="drive"]').trigger('click');
    break;
  }

}

function registro_seleccionar_mano(mano){

  if(mano.hasClass('activo')) mano.removeClass('activo');
  else {
    $('#manos .mano').removeClass('activo');
    mano.addClass('activo');
  }

  if(mano.hasClass('activo')){
    $('#manos').removeClass('activo');
    $('#donde').addClass('activo');
    $('#donde .donde').removeClass('inactivo');
  } else {
    $('#manos').addClass('activo');
    $('#donde').removeClass('activo');
    $('#donde .donde').addClass('inactivo');
    $('#registro .boton_registro').addClass('inactivo');
  }

  var golpe = $('#golpes .golpe.activo');
  switch(golpe.attr('golpe')){
    case 'saque_1':
    case 'saque_2':
    case 'resto':
      $('#donde .donde').removeClass('activo');
      $('#donde .donde[donde="fondo"]').trigger('click');
    break;
  }

}

function registro_seleccionar_donde(donde){
  
  if(donde.hasClass('activo')) donde.removeClass('activo');
  else {
    $('#donde .donde').removeClass('activo');
    donde.addClass('activo');
  }

  if(donde.hasClass('activo')){
    $('#donde').removeClass('activo');
    $('#registro .boton_registro').removeClass('inactivo');
  } else {
    $('#donde').addClass('activo');
    $('#registro .boton_registro').addClass('inactivo');
  }

}

function registrar_sacador(){
  
  var n_set = registro_partido.local + registro_partido.visitante + 1; // set en curso
  var n_juego = registro_partido['set_' + n_set]['local'] + registro_partido['set_' + n_set]['visitante'] + 1; // juego en curso

  var jugador_al_saque = n_juego % 4; if(jugador_al_saque == 0) jugador_al_saque = 4;
  var jugador_seleccionado = parseInt($('#jugadores .jugador.activo').attr('n'));

  var companero = 0;
  var turno_companero = 0;

  switch(jugador_seleccionado){
    case 1: companero = 2; break;
    case 2: companero = 1; break;
    case 3: companero = 4; break;
    case 4: companero = 3; break;
  }
  
  switch(jugador_al_saque){
    case 1: turno_companero = 3; break;
    case 2: turno_companero = 4; break;
    case 3: turno_companero = 1; break;
    case 4: turno_companero = 2; break; 
  }

  registro_partido['set_' + n_set]['saque_' + jugador_al_saque] = jugador_seleccionado;
  registro_partido['set_' + n_set]['saque_' + turno_companero] = companero;

  db.transaction(function(tx){
    tx.executeSql('update partidos set saque_' + jugador_al_saque + '_set' + n_set + '=?, saque_' + turno_companero + '_set' + n_set + '=? where id=?', [jugador_seleccionado, companero, registro_partido.id]);
  });

  if(n_set == 1 && n_juego == 1) notificacion(l['registro']['registro_activo']);
  registro_start();

}

function registrar_accion(variacion_local_manual, variacion_visitante_manual){

  db.transaction(function(tx){

    var p = registro_partido;
    var a = registro_partido.acciones[registro_partido.acciones.length - 1];

    var id_jugador = '';
    var n_jugador = '';

    var variacion_local = 0;
    var variacion_visitante = 0;

    var accion = '';
    var golpe = '';
    var mano = '';
    var donde = '';

    if($('#pantalla_golpes').css('display') != 'none'){
      golpe = $('#golpes .golpe.activo').attr('golpe');
      mano = $('#manos .mano.activo').attr('mano');
      donde = $('#donde .donde.activo').attr('donde');
    }

    var n_set = p.local + p.visitante + 1; // n_set en curso
    var n_juego = p['set_' + n_set]['local'] + p['set_' + n_set]['visitante'] + 1; // n_juego en curso

    var marcador_juego_local = 0;
    var marcador_juego_visitante = 0; 
    if(a.n_set == n_set && a.n_juego == n_juego){ // si esta accion pertenece al mismo juego que la anterior, el marcador continua desde donde se dejo
      marcador_juego_local = a.marcador_juego_local + a.variacion_local;
      marcador_juego_visitante = a.marcador_juego_visitante + a.variacion_visitante;
    }

    if(variacion_local_manual != undefined || variacion_visitante_manual != undefined){

      if(variacion_local_manual != undefined) variacion_local = variacion_local_manual;
      if(variacion_visitante_manual != undefined) variacion_visitante = variacion_visitante_manual;

      if(variacion_local < 0 && marcador_juego_local == 0) variacion_local = 0;
      if(variacion_visitante < 0 && marcador_juego_visitante == 0) variacion_visitante = 0;

      if(variacion_local == 0 && variacion_visitante == 0) return; // cancelamos la variacion manual ya que el marcador no se va a mover

    } else {

      id_jugador = $('#jugadores .jugador.activo').attr('data-id');
      n_jugador = parseInt($('#jugadores .jugador.activo').attr('n'));

      accion = $('#acciones .accion.activo').attr('accion');
      // si procede obtener el golpe, mano y donde

      switch(accion){
        case 'enf':
        case 'ef':
          if(golpe != 'saque_1'){ // un fallo de primer saque no ocasiona punto
            if(n_jugador == 1 || n_jugador == 2) variacion_visitante = 1;
            if(n_jugador == 3 || n_jugador == 4) variacion_local = 1;
          }
        break;
        case 'pg':
          if(n_jugador == 1 || n_jugador == 2) variacion_local = 1;
          if(n_jugador == 3 || n_jugador == 4) variacion_visitante = 1;
        break;
      }

    }

    var accion = {'id': parseInt(a.id) + 1, 'id_jugador': id_jugador, 'n_jugador': n_jugador, 'saque': jugador_al_saque, 'accion': accion, 'golpe': golpe, 'mano': mano, 'donde': donde, 'n_set': n_set, 'n_juego': n_juego, 'marcador_juego_local': marcador_juego_local, 'marcador_juego_visitante': marcador_juego_visitante, 'variacion_local': variacion_local, 'variacion_visitante': variacion_visitante, 'marcador_local': p.local, 'marcador_visitante': p.visitante, 'marcador_set1_local': p.set_1.local, 'marcador_set1_visitante': p.set_1.visitante, 'marcador_set2_local': p.set_2.local, 'marcador_set2_visitante': p.set_2.visitante, 'marcador_set3_local': p.set_3.local, 'marcador_set3_visitante': p.set_3.visitante, 'marcador_set4_local': p.set_4.local, 'marcador_set4_visitante': p.set_4.visitante, 'marcador_set5_local': p.set_5.local, 'marcador_set5_visitante': p.set_5.visitante};
    registro_partido.acciones.push(accion);

    var sql = 'insert into acciones (id_partido, id, id_jugador, n_jugador, saque, accion, golpe, mano, donde, n_set, n_juego, marcador_juego_local, marcador_juego_visitante, variacion_local, variacion_visitante, marcador_local, marcador_visitante, marcador_set1_local, marcador_set1_visitante, marcador_set2_local, marcador_set2_visitante, marcador_set3_local, marcador_set3_visitante, marcador_set4_local, marcador_set4_visitante, marcador_set5_local, marcador_set5_visitante) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var variables = [p.id, accion.id, accion.id_jugador, accion.n_jugador, accion.saque, accion.accion, accion.golpe, accion.mano, accion.donde, accion.n_set, accion.n_juego, accion.marcador_juego_local, accion.marcador_juego_visitante, accion.variacion_local, accion.variacion_visitante, accion.marcador_local, accion.marcador_visitante, accion.marcador_set1_local, accion.marcador_set1_visitante, accion.marcador_set2_local, accion.marcador_set2_visitante, accion.marcador_set3_local, accion.marcador_set3_visitante, accion.marcador_set4_local, accion.marcador_set4_visitante, accion.marcador_set5_local, accion.marcador_set5_visitante];
    tx.executeSql(sql, variables);

    // asi forzaremos la sincronizacion del marcador y las acciones con el servidor
    cambios_partido = 1; window.localStorage.setItem('cambios_partido', cambios_partido);
    tx.executeSql('update partidos set cambios_acciones=1 where id=?', [registro_partido.id]);

    registro_start();

  });
  
}

function registro_eliminar(id_accion){

  if(debug){
    console.log('eliminar id_accion: ' + id_accion);
    console.log(registro_partido);
  }

  var accion = null;
  if(id_accion > 0){

    for(i=0; i<registro_partido.acciones.length; i++) if(parseInt(registro_partido.acciones[i].id) == parseInt(id_accion)) accion = registro_partido.acciones[i];

    if(accion != null){
      if(debug) console.log('eliminando_accion');
      db.transaction(function(tx){

        tx.executeSql('update partidos set marcador_local=?, marcador_visitante=?, marcador_set1_local=?, marcador_set1_visitante=?, marcador_set2_local=?, marcador_set2_visitante=?, marcador_set3_local=?, marcador_set3_visitante=?, marcador_set4_local=?, marcador_set4_visitante=?, marcador_set5_local=?, marcador_set5_visitante=? where id=?', [accion.marcador_local, accion.marcador_visitante, accion.marcador_set1_local, accion.marcador_set1_visitante, accion.marcador_set2_local, accion.marcador_set2_visitante, accion.marcador_set3_local, accion.marcador_set3_visitante, accion.marcador_set4_local, accion.marcador_set4_visitante, accion.marcador_set5_local, accion.marcador_set5_visitante, registro_partido.id], function(tx, results){
          tx.executeSql('delete from acciones where id_partido=? and id>=?', [registro_partido.id, id_accion], function(tx, results){
            registro_cargar_partido(true);  
          });
        });

        // asi forzaremos la sincronizacion del marcador y las acciones con el servidor
        cambios_partido = 1; window.localStorage.setItem('cambios_partido', cambios_partido);
        tx.executeSql('update partidos set cambios_acciones=1 where id=?', [registro_partido.id]);

      });
    }
  }

}

function registro_finalizar(){

  var acciones_registradas = 0;
  for(var i=0; i<registro_partido.acciones.length; i++){
    var accion = registro_partido.acciones[i].accion;
    if(accion == 'enf' || accion == 'ef' || accion == 'pg') acciones_registradas++;
  }

  if(acciones_registradas < 20){
    navigator.notification.confirm(l['registro']['finalizar_sin_estadisticas'], 
      function(b){ if(b == 1) registro_confirmar_finalizar(); }, 
      l['padelstat'], l['si'] + ',' + l['no']
    );  
  } else registro_confirmar_finalizar();

}

function registro_confirmar_finalizar(){
  navigator.notification.confirm(l['registro']['finalizar'], 
    function(b){ 
      if(b == 1){
        db.transaction(function(tx){
          cambios_partido = 1; window.localStorage.setItem('cambios_partido', cambios_partido);
          tx.executeSql('update partidos set cambios_acciones=1, finalizado="si" where id=?', [registro_partido.id], function(tx, results){

            var c_acciones = 0;
            var c_golpes = 0;
            for(i=0; i<registro_partido.acciones.length; i++){
              if(registro_partido.acciones[i].accion == 'enf' || registro_partido.acciones[i].accion == 'ef' || registro_partido.acciones[i].accion == 'pg') c_acciones++;
              if(registro_partido.acciones[i].golpe != '') c_golpes++;
            }
            if(c_acciones > 20){
              ga_evento('partidos', 'registro acciones');
              if(c_golpes > 0) ga_evento('partidos', 'registro estadisticas profundas');
            }

            if(registro_partido.id_jugador_1.substr(-1) == '*' || registro_partido.id_jugador_2.substr(-1) == '*' || registro_partido.id_jugador_3.substr(-1) == '*' || registro_partido.id_jugador_4.substr(-1) == '*'){
              var partidas = parseInt(window.localStorage.getItem('usuario_partidas')) - 1;
              window.localStorage.setItem('usuario_partidas', partidas);
              var cambios_usuario_partidas = parseInt(window.localStorage.getItem('cambios_usuario_partidas')) - 1;
              window.localStorage.setItem('cambios_usuario_partidas', cambios_usuario_partidas);
            }

            sincronizar_partidos(); 
            //mostrar_pagina('lista_partidos');
            mostrar_pagina('inicio');
          });
        });
      } 
    }, 
    l['padelstat'], l['si'] + ',' + l['no']
  );
}

// codificación utf8

l['registro'] = {};

l['registro']['titulo'] = 'Registro de partido';

l['registro']['enf'] = 'Error no forzado';
l['registro']['ef'] = 'Error forzado';
l['registro']['pg'] = 'Punto ganado';

l['registro']['saque_1'] = '<span class="n">1<span class="o">er</span></span> Saque';
l['registro']['saque_2'] = '<span class="n">2<span class="o">o</span></span> Saque';
l['registro']['resto'] = 'Resto';
l['registro']['bote_p'] = 'Bote P.';
l['registro']['directo'] = 'Directo';
l['registro']['volea'] = 'Volea';
l['registro']['bandeja'] = 'Bandeja';
l['registro']['s_pared'] = 'S. Pared';
l['registro']['smash'] = 'Smash';
l['registro']['globo'] = 'Globo';

l['registro']['drive'] = 'Drive';
l['registro']['reves'] = 'Revés';
l['registro']['fondo'] = 'Fondo';
l['registro']['pantano'] = 'Pantano';
l['registro']['red'] = 'Red';

l['registro']['seleccionar_sacador'] = 'Selecciona el jugador que comienza con el servicio';
l['registro']['registro_activo'] = 'Registro de estadísticas activo';
l['registro']['partido_en_curso'] = 'No es posible volver mientras el registro de partido está en curso';
l['registro']['eliminar_estas_seguro'] = '¿Estas seguro de querer eliminar el registro seleccionado y posteriores? Esta acción no se puede deshacer';

l['registro']['partido_finalizado'] = 'El partido ha terminado';
l['registro']['partido_finalizado_eliminar_accion'] = 'El partido ha terminado, ¿quieres deshacer el último registro?';
l['registro']['finalizar'] = 'El partido no ha finalizado, ¿estás seguro de querer finalizar el registro de acciones?';
l['registro']['finalizar_sin_estadisticas'] = 'Has registrado menos de 20 acciones, las estadísticas de este partido no se tendrán en cuenta. ¿deseas finalizar de todas maneras?';

l['registro']['consola_manual'] = 'Cambio de marcador manual : ';
l['registro']['consola_local'] = 'local';
l['registro']['consola_visitante'] = 'visitante';
l['registro']['consola_enf'] = 'EnF';
l['registro']['consola_ef'] = 'EF';
l['registro']['consola_pg'] = 'PG';

l['registro']['acceso_directo_restringido'] = 'El acceso directo a las estadísticas sólo está disponible para usuarios silver';


// JavaScript Document

var atajo_publi = 0;

function inicio_ajustes(){

  $('#ajustes input.nombre').val(window.localStorage.getItem('usuario_nombre'));
  $('#ajustes input.apellidos').val(window.localStorage.getItem('usuario_apellidos'));
  $('#ajustes input.email').val(window.localStorage.getItem('usuario_email'));

  $('#ajustes .licencia').html(window.localStorage.getItem('usuario_licencia'));
  $('#ajustes .partidas').html(window.localStorage.getItem('usuario_partidas'));

  $('#ajustes .registro').click(function(){
    
    var nombre = $('#ajustes .nombre').val().trim();
    var apellidos = $('#ajustes .apellidos').val().trim();
    var email = $('#ajustes .email').val().trim();

    if(nombre != window.localStorage.getItem('usuario_nombre') || apellidos != window.localStorage.getItem('usuario_apellidos') || email != window.localStorage.getItem('usuario_email')){

      if(nombre == ''){ notificacion(l['registro_usuario_2']['nombre_vacio'], null); return false; }
      if(apellidos == ''){ notificacion(l['registro_usuario_2']['apellidos_vacio'], null); return false; }
      if(email == ''){ notificacion(l['registro_usuario_1']['email_vacio'], null); return false; }
      if(!validar_email(email)){ notificacion(l['registro_usuario_1']['email_invalido'], null); return false; }

      $('#ajustes .registro').addClass('inactivo');

      if(online()){
        var jqxhr = $.post(url_api + 'guardar_datos_usuario', {'id': id_usuario, 'nombre': nombre, 'apellidos': apellidos, 'email': email, 'firma': md5(id_usuario.toString() + nombre + apellidos + email + '' + clave_api), 'dummy': 'dummy'}, 
          function(data){
            data = JSON.parse(data);
            console.log(data);
            if(data[0] == 'ok'){
              switch(data[1]){
                case 'duplicado': notificacion(l['ajustes']['email_duplicado']); break;
                case 'ko': notificacion(l['ajustes']['error_guardando']); break;
                case 'ok':
                  window.localStorage.setItem('usuario_nombre', data[3]);
                  window.localStorage.setItem('usuario_apellidos', data[4]);
                  window.localStorage.setItem('usuario_email', data[5]);
                  sincronizar_agenda();
                  mostrar_pagina('inicio');
                break;
                default: notificacion(l['ajustes']['error_guardando']);
              }
            } else notificacion(l['ajustes']['error_offline']);
          }
        ).fail(
          function(){ notificacion(l['ajustes']['error_offline']); }
        ).always(
          function(){ $('#ajustes .registro').removeClass('inactivo'); }
        );
      } else notificacion(l['ajustes']['offline']);

    } else mostrar_pagina('inicio');

  });

  $('#ajustes .configurar_golpes').click(function(){
    mostrar_pagina('analisis_golpes');
  });

  $('#ajustes .desarrollado_por').click(function(){
    mostrar_pagina('desarrollado_por');
  });

  atajo_publi = 0;
  $('#ajustes .info_app').click(function(){
    atajo_publi++;
    if(atajo_publi >= 3) {
      atajo_publi = 0;
      mostrar_publicidad(true);
    }
  });

  $('#ajustes .version').html(version);
  $('#ajustes .licencia').html(window.localStorage.getItem('usuario_licencia'));

}

function mostrado_ajustes(){
  redimensionar_contenido('ajustes');
}

// codificación utf8

l['ajustes'] = {};

l['ajustes']['titulo'] = 'Ajustes';

l['ajustes']['datos_usuario'] = 'Datos de usuario:';
l['ajustes']['nombre'] = 'Nombre';
l['ajustes']['apellidos'] = 'Apellidos';
l['ajustes']['email'] = 'Email';

l['ajustes']['analisis_info'] = 'Análisis de golpes:';
l['ajustes']['abrir_analisis'] = 'Abrir configuración';

l['ajustes']['info_app'] = 'Acerca de padelstat';
l['ajustes']['desarrollado_por'] = 'Desarrollado por ...';

l['ajustes']['version'] = 'Versión';
l['ajustes']['licencia'] = 'Licencia';
l['ajustes']['partidas'] = 'Partidas restantes';

l['ajustes']['actualizar_suscripcion'] = 'Para actualizar o ampliar su suscripción visite';

l['ajustes']['email_duplicado'] = 'El email introducido está ocupado por otro usuario';
l['ajustes']['error_guardando'] = 'Ha ocurrido un error guardando tus datos, por favor inténtalo de nuevo';
l['ajustes']['offline'] = 'No es posible guardar los cambios, por favor comprueba tu conexión a Internet e inténtalo de nuevo';


// JavaScript Document

function inicio_conflicto(){

  console.log(partido_conflicto);

  var fecha = partido_conflicto.fecha.split('-'); 
  var hora = partido_conflicto.hora.split(':'); 

  $('#conflicto .partido_transferido .fecha').html(fecha[2] + '/' + fecha[1] + '/' + fecha[0]);
  $('#conflicto .partido_transferido .hora').html(hora[0] + ':' + hora[1]);
  $('#conflicto .partido_transferido .lugar').html(partido_conflicto.lugar);
  $('#conflicto .partido_transferido .jugador_1').html(partido_conflicto.jugador_1.apellidos + ' ' + partido_conflicto.jugador_1.nombre.substr(0, 1) + '.');
  $('#conflicto .partido_transferido .jugador_2').html(partido_conflicto.jugador_2.apellidos + ' ' + partido_conflicto.jugador_2.nombre.substr(0, 1) + '.');
  $('#conflicto .partido_transferido .jugador_3').html(partido_conflicto.jugador_3.apellidos + ' ' + partido_conflicto.jugador_3.nombre.substr(0, 1) + '.');
  $('#conflicto .partido_transferido .jugador_4').html(partido_conflicto.jugador_4.apellidos + ' ' + partido_conflicto.jugador_4.nombre.substr(0, 1) + '.');
  $('#conflicto .partido_transferido .set_1.local').html(partido_conflicto.marcador_set1_local);
  $('#conflicto .partido_transferido .set_1.visitante').html(partido_conflicto.marcador_set1_visitante);
  $('#conflicto .partido_transferido .set_2.local').html(partido_conflicto.marcador_set2_local);
  $('#conflicto .partido_transferido .set_2.visitante').html(partido_conflicto.marcador_set2_visitante);
  $('#conflicto .partido_transferido .set_3.local').html(partido_conflicto.marcador_set3_local);
  $('#conflicto .partido_transferido .set_3.visitante').html(partido_conflicto.marcador_set3_visitante);
  $('#conflicto .partido_transferido .tipo').html(l['lista_partidos_transferencia'][partido_conflicto.tipo]);
  $('#conflicto .partido_transferido .juegos').html(partido_conflicto.juegos_registrados + '%');
  if(partido_conflicto.autor != null){
    var autor = partido_conflicto.autor.nombre + ' ' + partido_conflicto.autor.apellidos;
    if(partido_conflicto.autor.alias != '') autor += ' (' + partido_conflicto.autor.alias + ')';
    $('#conflicto .partido_transferido .autor').html(autor);
  }

  var partido_local = partido_conflicto.conflicto;

  var fecha = partido_local.fecha.split('-'); 
  var hora = partido_local.hora.split(':'); 

  $('#conflicto .partido_local .fecha').html(fecha[2] + '/' + fecha[1] + '/' + fecha[0]);
  $('#conflicto .partido_local .hora').html(hora[0] + ':' + hora[1]);
  $('#conflicto .partido_local .lugar').html(partido_local.lugar);
  $('#conflicto .partido_local .set_1.local').html(partido_local.marcador_set1_local);
  $('#conflicto .partido_local .set_1.visitante').html(partido_local.marcador_set1_visitante);
  $('#conflicto .partido_local .set_2.local').html(partido_local.marcador_set2_local);
  $('#conflicto .partido_local .set_2.visitante').html(partido_local.marcador_set2_visitante);
  $('#conflicto .partido_local .set_3.local').html(partido_local.marcador_set3_local);
  $('#conflicto .partido_local .set_3.visitante').html(partido_local.marcador_set3_visitante);
  $('#conflicto .partido_local .tipo').html(l['lista_partidos_transferencia'][partido_local.tipo]);

  db.transaction(function(tx){

    tx.executeSql('select nombre, apellidos from jugadores where id=?', [partido_local.id_jugador_1], function(tx, results){
      var jugador = results.rows.item(0);
      $('#conflicto .partido_local .jugador_1').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
    });

    tx.executeSql('select nombre, apellidos from jugadores where id=?', [partido_local.id_jugador_2], function(tx, results){
      var jugador = results.rows.item(0);
      $('#conflicto .partido_local .jugador_2').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
    });

    tx.executeSql('select nombre, apellidos from jugadores where id=?', [partido_local.id_jugador_3], function(tx, results){
      var jugador = results.rows.item(0);
      $('#conflicto .partido_local .jugador_3').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
    });

    tx.executeSql('select nombre, apellidos from jugadores where id=?', [partido_local.id_jugador_4], function(tx, results){
      var jugador = results.rows.item(0);
      $('#conflicto .partido_local .jugador_4').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
    });

    var total_juegos = partido_local.marcador_set1_local + partido_local.marcador_set1_visitante + partido_local.marcador_set2_local + partido_local.marcador_set2_visitante + partido_local.marcador_set3_local + partido_local.marcador_set3_visitante + partido_local.marcador_set4_local + partido_local.marcador_set4_visitante + partido_local.marcador_set5_local + partido_local.marcador_set5_visitante;
    if(total_juegos > 0){
      tx.executeSql('select distinct id_partido, n_set, n_juego, ? as total_juegos from acciones where id>0 and id_partido=?', [total_juegos, partido_local.id], function(tx, results){
        if(results.rows.length > 0){
          var porcentaje = Math.floor(results.rows.length * 100 / results.rows.item(0).total_juegos);
          if(porcentaje > 100) porcentaje = 100;
          $('#conflicto .partido_local .juegos').html(porcentaje + '%');
        }
      });
    } else $('#conflicto .partido_local .juegos').html('0%');

  });

  /* 
  if(partido_local.autor != null){
    var autor = partido_local.autor.nombre + ' ' + partido_local.autor.apellidos;
    if(partido_local.autor.alias != '') autor += ' (' + partido_local.autor.alias + ')';
    $('#conflicto .partido_local .autor').html(autor);
  }
  */

  $('#conflicto .boton_mantener').click(function(){ 
    navigator.notification.confirm(l['estas_seguro'], 
      function(b){ 
        if(b == 1){ 

          var jqxhr = $.post(url_api + 'partidos_transferibles_cancelar', {'id_origen': encodeURI(partido_conflicto.id_usuario), 'id_destino': encodeURI(id_usuario), 'id_partido': encodeURI(partido_conflicto.id), 'firma': md5(partido_conflicto.id_usuario.toString() + id_usuario.toString() + partido_conflicto.id.toString() + '' + clave_api), 'dummy': 'dummy'}, 
            function(data){
              data = JSON.parse(data);
              if(data[0] == 'ok'){
                mostrar_pagina('lista_partidos_transferencia'); 
              } else notificacion(l['conflicto']['error_manteniendo']);
            }
          ).fail(function(){
            notificacion(l['conflicto']['error_manteniendo']);
          });

        } 
      }, l['padelstat'], l['si'] + ',' + l['no']
    ); 
  });

  $('#conflicto .boton_sustituir').click(function(){ 
    navigator.notification.confirm(l['estas_seguro'], 
      function(b){ 
        if(b == 1){ 

          var jqxhr = $.post(url_api + 'partidos_transferibles_sustituir', {'id_origen': encodeURI(partido_conflicto.id_usuario), 'id_destino': encodeURI(id_usuario), 'id_partido': encodeURI(partido_conflicto.id), 'id_partido_conflicto': encodeURI(partido_conflicto.conflicto.id), 'firma': md5(partido_conflicto.id_usuario.toString() + id_usuario.toString() + partido_conflicto.id.toString() + '' + clave_api), 'dummy': 'dummy'}, 
            function(data){
              data = JSON.parse(data);
              if(data[0] == 'ok'){
                ga_evento('partidos', 'transferencia');
                mostrar_pagina('lista_partidos_transferencia'); 
              } else notificacion(l['conflicto']['error_sustituir']);
            }
          ).fail(function(){
            notificacion(l['conflicto']['error_sustituir']);
          });

        } 
      }, l['padelstat'], l['si'] + ',' + l['no']
    ); 
  });

}

function mostrado_conflicto(){
  redimensionar_contenido('conflicto');
}

// codificación utf8

l['conflicto'] = {};

l['conflicto']['titulo'] = 'Revisión de partidos';
l['conflicto']['sustituir'] = 'Sustituir';
l['conflicto']['mantener'] = 'Mantener';

l['conflicto']['juegos_registrados']  = 'Juegos Registrados';
l['conflicto']['tipo'] = 'Tipo';
l['conflicto']['autor'] = 'Autor';

l['conflicto']['amistoso'] = 'amistoso';
l['conflicto']['torneo'] = 'torneo';
l['conflicto']['entrenamiento'] = 'training';

l['conflicto']['partido_transferido'] = 'Partido Transferido';
l['conflicto']['partido_local'] = 'Partido en Registro Local';
l['conflicto']['partido_sustituido'] = 'Partido guardado';

l['conflicto']['error_sustituir'] = 'Ha ocurrido un error intentando registrar el partido, por favor comprueba tu conexión a Internet e inténtalo de nuevo.';
l['conflicto']['error_manteniendo'] = 'Ha ocurrido un error intentando mantener el partido, por favor comprueba tu conexión a Internet e inténtalo de nuevo.';


// JavaScript Document

function inicio_registro(){
}

function mostrado_registro(){
  redimensionar_contenido('preparacion');
}

// codificación utf8

l['registro'] = {};

l['registro']['titulo'] = 'Registro de partido';


// JavaScript Document

var i_ficha = 0;
var fichas = ['resumen', 'servicio_j1', 'servicio_j2', 'servicio_j3', 'servicio_j4', 'golpes_j1', 'golpes_j2', 'golpes_j3', 'golpes_j4', 'manos_j1', 'manos_j2', 'manos_j3', 'manos_j4', 'donde_j1', 'donde_j2', 'donde_j3', 'donde_j4'];
var graficas = {};

var secuencia_inicio = 0;

function inicio_analisis_grafico_1p(){

  $('.boton.numerico').click(function(){ mostrar_pagina('analisis_numerico_1p'); });
  $('.boton.compartir').click(function(){ compartir_pantalla(); });

  i_ficha = 0;
  secuencia_inicio = 0;
  fichas = ['resumen', 'servicio_j1', 'servicio_j2', 'servicio_j3', 'servicio_j4', 'golpes_j1', 'golpes_j2', 'golpes_j3', 'golpes_j4', 'manos_j1', 'manos_j2', 'manos_j3', 'manos_j4', 'donde_j1', 'donde_j2', 'donde_j3', 'donde_j4'];
  graficas = {'resumen': '', 'servicio_j1_1': '', 'servicio_j1_2': '', 'servicio_j2_1': '', 'servicio_j2_2': '', 'servicio_j3_1': '', 'servicio_j3_2': '', 'servicio_j4_1': '', 'servicio_j2_2': '', 'golpes_j1': '', 'golpes_j2': '', 'golpes_j3': '', 'golpes_j4': '', 'manos_j1': '', 'manos_j2': '', 'manos_j3': '', 'manos_j4': '', 'donde_j1': '', 'donde_j2': '', 'donde_j3': '', 'donde_j4': ''};

  var licencia = window.localStorage.getItem('usuario_licencia');
  if(licencia == 'free' || licencia == 'basic'){
    fichas.remove('servicio_j1');
    fichas.remove('servicio_j2');
    fichas.remove('servicio_j3');
    fichas.remove('servicio_j4');
    fichas.remove('golpes_j1');
    fichas.remove('golpes_j2');
    fichas.remove('golpes_j3');
    fichas.remove('golpes_j4');
    fichas.remove('manos_j1');
    fichas.remove('manos_j2');
    fichas.remove('manos_j3');
    fichas.remove('manos_j4');
    fichas.remove('donde_j1');
    fichas.remove('donde_j2');
    fichas.remove('donde_j3');
    fichas.remove('donde_j4');
  }

  db.transaction(function(tx){
    tx.executeSql('select * from partidos where id=?', [partido_seleccionado], function(tx, results){      

      var partido = results.rows.item(0);      
      var nombres_jugadores = [''];

      var sql = "select j1.nombre as j1_nombre, j1.apellidos as j1_apellidos, j2.nombre as j2_nombre, j2.apellidos as j2_apellidos, j3.nombre as j3_nombre, j3.apellidos as j3_apellidos, j4.nombre as j4_nombre, j4.apellidos as j4_apellidos from jugadores j1, jugadores j2, jugadores j3, jugadores j4 where j1.id='" + partido.id_jugador_1 + "' and j2.id='" + partido.id_jugador_2 + "' and j3.id='" + partido.id_jugador_3 + "' and j4.id='" + partido.id_jugador_4 + "'";
      tx.executeSql(sql, [], function(tx, results){

        var r = results.rows.item(0);
        nombres_jugadores.push(r.j1_apellidos + ' ' + r.j1_nombre.substr(0, 1) + '.');
        nombres_jugadores.push(r.j2_apellidos + ' ' + r.j2_nombre.substr(0, 1) + '.');
        nombres_jugadores.push(r.j3_apellidos + ' ' + r.j3_nombre.substr(0, 1) + '.');
        nombres_jugadores.push(r.j4_apellidos + ' ' + r.j4_nombre.substr(0, 1) + '.');

        $('.jugador_1').html(nombres_jugadores[1]);
        $('.jugador_2').html(nombres_jugadores[2]);
        $('.jugador_3').html(nombres_jugadores[3]);
        $('.jugador_4').html(nombres_jugadores[4]);

        // ficha resumen

        var sql = "select ";
        for(var i=1; i<=4; i++){
          sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador='" + i + "' and accion='ef' and golpe!='saque_1') as ef_" + i + ", ";
          sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador='" + i + "' and accion='enf' and golpe!='saque_1') as enf_" + i + ", ";
          sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador='" + i + "' and accion='pg') as pg_" + i + ", ";
        }
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and (accion='pg' or (accion like 'e%' and golpe!='saque_1'))) as total";

        tx.executeSql(sql, [], function(tx, results){
          var r = results.rows.item(0);

          if(parseInt(r.total) > 0){
            var data = [
              {label: 'PG', color: '#a3bd31', data: [[1, parseInt(r.pg_1) * 100 / parseInt(r.total)], [2, parseInt(r.pg_2) * 100 / parseInt(r.total)], [3, parseInt(r.pg_3) * 100 / parseInt(r.total)], [4, parseInt(r.pg_4) * 100 / parseInt(r.total)]]}, 
              {label: 'EF', color: '#cb6018', data: [[1, parseInt(r.ef_1) * 100 / parseInt(r.total)], [2, parseInt(r.ef_2) * 100 / parseInt(r.total)], [3, parseInt(r.ef_3) * 100 / parseInt(r.total)], [4, parseInt(r.ef_4) * 100 / parseInt(r.total)]]}, 
              {label: 'ENF', color: '#bf0411', data: [[1, parseInt(r.enf_1) * 100 / parseInt(r.total)], [2, parseInt(r.enf_2) * 100 / parseInt(r.total)], [3, parseInt(r.enf_3) * 100 / parseInt(r.total)], [4, parseInt(r.enf_4) * 100 / parseInt(r.total)]]}
            ];
          } else {
            var data = [
              {label: 'PG', data: [[1, 0], [2, 0], [3, 0], [4, 0]]}, 
              {label: 'EF', data: [[1, 0], [2, 0], [3, 0], [4, 0]]}, 
              {label: 'ENF', data: [[1, 0], [2, 0], [3, 0], [4, 0]]}
            ];
          }

          var options = {
            series: {
              stack: 0,
              lines: {show: false, steps: false },
              bars: {show: true, barWidth: 0.7, align: 'center', fill: 1}
            },
            xaxis: {ticks: [[1, nombres_jugadores[1]], [2, nombres_jugadores[2]], [3, nombres_jugadores[3]], [4, nombres_jugadores[4]]], color: '#333', tickColor: '#f6f6f7', font: {size: 24}},
            yaxis: {min: 0, minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)) + '%'; }), color: '#333', tickColor: '#d5d5d5', font: {size: 30}},
            legend: {show: false},
            grid: {show: true,  borderColor: '#f6f6f7'}
          };

          graficas['resumen'] = {'data': data, 'options': options};
          secuencia_inicio++; if(secuencia_inicio >= 2){ $('.ficha.resumen').show(); mostrar_grafica_1p('resumen'); }

        });

        // saques

        var sql = "select ";
        for(var i=1; i<=4; i++){
          sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=" + i + " and golpe!='' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total_j" + i + ", ";
          sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and saque=" + i + " and (accion='pg' or accion='ef' or accion='enf')) as acciones_j" + i + ", ";
          sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=" + i + " and golpe!='') as golpes_registrados_j" + i + ", ";
          sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and saque=" + i + " and (accion='enf' or accion='ef') and golpe='saque_1' and n_jugador=" + i + ") as fallos_saque_1_j" + i + ", ";
          sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and saque=" + i + " and (accion='enf' or accion='ef') and golpe='saque_2' and n_jugador=" + i + ") as fallos_saque_2_j" + i + ", ";
        }
        sql += "0 as dummy";

        tx.executeSql(sql , [], function(tx, results){
          var r = results.rows.item(0);

          for(var j=1; j<=4; j++){

            var golpes_registrados = parseInt(r['golpes_registrados_j' + j]);
            var saque_1_aciertos = parseInt(r['acciones_j' + j]) - parseInt(r['fallos_saque_1_j' + j]) - parseInt(r['fallos_saque_1_j' + j]);
            var acciones_saque_1 = parseInt(r['acciones_j' + j]) - parseInt(r['fallos_saque_1_j' + j]);
            var saque_1_fallos = acciones_saque_1 - saque_1_aciertos;
            var saque_2_aciertos = parseInt(r['fallos_saque_1_j' + j]) - parseInt(r['fallos_saque_2_j' + j]);
            var acciones_saque_2 = parseInt(r['fallos_saque_1_j' + j]);
            var saque_2_fallos = acciones_saque_2 - saque_2_aciertos;

            var hay_datos = false;
            
            var data_saque_1 = [];
            var data_saque_2 = [];

            if(golpes_registrados > 0){

              if(saque_1_aciertos + saque_1_fallos > 0){
                data_saque_1[0] = { label: l['analisis_grafico_1p']['saques_correctos'], color: '#a3bd31', data: saque_1_aciertos };
                data_saque_1[1] = { label: l['analisis_grafico_1p']['saques_fallados'], color: '#bf0411', data: saque_1_fallos };
                hay_datos = true;
              } else {
                data_saque_1[0] = { label: l['analisis_grafico_1p']['saques_sin_datos'], color: '#e3e3e3', data: 1 };
              }
              
              if(saque_2_aciertos + saque_2_fallos > 0){
                data_saque_2[0] = { label: l['analisis_grafico_1p']['saques_correctos'], color: '#a3bd31', data: saque_2_aciertos };
                data_saque_2[1] = { label: l['analisis_grafico_1p']['saques_fallados'], color: '#bf0411', data: saque_2_fallos };
                hay_datos = true;
              } else {
                data_saque_2[0] = { label: l['analisis_grafico_1p']['saques_sin_datos'], color: '#d5d5d5', data: 1 };
              }

            }
            
            if(hay_datos){

              var options = { 
                series:{ 
                  pie:{show: true, radius: 0.85, innerRadius: 0.4, label: {show: false}}
                }, 
                legend: {show: false},
                grid: {show: false}
              };
              
              graficas['servicio_j' + j + '_1'] = {'data': data_saque_1, 'options': options};
              graficas['servicio_j' + j + '_2'] = {'data': data_saque_2, 'options': options};
              
            } else fichas.remove('servicio_j' + j);

          }
            
        });

        // golpes

        var golpes = ['resto', 'bote_p', 'directo', 'volea', 'bandeja', 's_pared', 'smash', 'globo'];
        var acciones = ['ef', 'enf', 'pg'];
        var jugadores = [1, 2, 3, 4];
        var sql = "select ";
        for(var g=0; g<golpes.length; g++){
          for(var a=0; a<acciones.length; a++){
            for(var j=0; j<jugadores.length; j++){
              golpe = golpes[g]; accion = acciones[a]; jugador = jugadores[j];
              sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador='" + jugador + "' and accion='" + accion + "' and golpe='" + golpe + "' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as " + golpe + "_" + accion + "_j" + jugador + ", ";
            }
          }
        }
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=1 and golpe!='' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total_j1, ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=2 and golpe!='' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total_j2, ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=3 and golpe!='' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total_j3, ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=4 and golpe!='' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total_j4, ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total";
        
        tx.executeSql(sql, [], function(tx, results){
          var r = results.rows.item(0);
          
          for(var j=1; j<=4; j++){

            if(parseInt(r.total) > 0){
              var data = [
                {label: 'PG', color: '#a3bd31', data: [[1, parseInt(r['resto_pg_j' + j]) * 100 / parseInt(r.total)], [2, parseInt(r['bote_p_pg_j' + j]) * 100 / parseInt(r.total)], [3, parseInt(r['directo_pg_j' + j]) * 100 / parseInt(r.total)], [4, parseInt(r['volea_pg_j' + j]) * 100 / parseInt(r.total)], [5, parseInt(r['bandeja_pg_j' + j]) * 100 / parseInt(r.total)], [6, parseInt(r['s_pared_pg_j' + j]) * 100 / parseInt(r.total)], [7, parseInt(r['smash_pg_j' + j]) * 100 / parseInt(r.total)], [8, parseInt(r['globo_pg_j' + j]) * 100 / parseInt(r.total)]], bars:{show: true, barWidth: 0.2, order: 1}},
                {label: 'EF', color: '#cb6018', data: [[1, parseInt(r['resto_ef_j' + j]) * 100 / parseInt(r.total)], [2, parseInt(r['bote_p_ef_j' + j]) * 100 / parseInt(r.total)], [3, parseInt(r['directo_ef_j' + j]) * 100 / parseInt(r.total)], [4, parseInt(r['volea_ef_j' + j]) * 100 / parseInt(r.total)], [5, parseInt(r['bandeja_ef_j' + j]) * 100 / parseInt(r.total)], [6, parseInt(r['s_pared_ef_j' + j]) * 100 / parseInt(r.total)], [7, parseInt(r['smash_ef_j' + j]) * 100 / parseInt(r.total)], [8, parseInt(r['globo_ef_j' + j]) * 100 / parseInt(r.total)]], bars:{show: true, barWidth: 0.2, order: 2}},
                {label: 'ENF', color: '#bf0411', data: [[1, parseInt(r['resto_enf_j' + j]) * 100 / parseInt(r.total)], [2, parseInt(r['bote_p_enf_j' + j]) * 100 / parseInt(r.total)], [3, parseInt(r['directo_enf_j' + j]) * 100 / parseInt(r.total)], [4, parseInt(r['volea_enf_j' + j]) * 100 / parseInt(r.total)], [5, parseInt(r['bandeja_enf_j' + j]) * 100 / parseInt(r.total)], [6, parseInt(r['s_pared_enf_j' + j]) * 100 / parseInt(r.total)], [7, parseInt(r['smash_enf_j' + j]) * 100 / parseInt(r.total)], [8, parseInt(r['globo_enf_j' + j]) * 100 / parseInt(r.total)]], bars:{show: true, barWidth: 0.2, order: 3}}
              ];
            } else {
              var data = [
                {label: 'PG', color: '#a3bd31', data: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0]], bars:{show: true, barWidth: 0.2, order: 1}}, 
                {label: 'EF', color: '#cb6018', data: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0]], bars:{show: true, barWidth: 0.2, order: 2}}, 
                {label: 'ENF', color: '#bf0411', data: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0]], bars:{show: true, barWidth: 0.2, order: 3}}
              ];
            }
            
            var options = {
              series: {
                stack: 0,
                lines: {show: false, steps: false },
                bars: {show: true, barWidth: 0.7, align: 'left', fill: 1}
              },
              xaxis: {ticks: [[1, l['analisis_grafico_1p']['resto']], [2, l['analisis_grafico_1p']['bote_p']], [3, l['analisis_grafico_1p']['directo']], [4, l['analisis_grafico_1p']['volea']], [5, l['analisis_grafico_1p']['bandeja']], [6, l['analisis_grafico_1p']['s_pared']], [7, l['analisis_grafico_1p']['smash']], [8, l['analisis_grafico_1p']['globo']]], labelAngle: 45, color: '#333', tickColor: '#f6f6f7', font: {size: 22}},
              yaxis: {min: 0, minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)) + '%'; }), tickColor: '#d5d5d5'},
              legend: {show: false},
              grid: {show: true, borderColor: '#f6f6f7'}
            };
            
            graficas['golpes_j' + j] = {'data': data, 'options': options};

            var total_jugador = parseInt(r['total_j' + j]);
            if(total_jugador == 0) fichas.remove('golpes_j' + j);
            
          }
          
        });

        // manos

        var manos = ['drive', 'reves'];
        var acciones = ['ef', 'enf', 'pg'];
        var jugadores = [1, 2, 3, 4];
        var sql = "select ";
        for(var g=0; g<manos.length; g++){
          for(var a=0; a<acciones.length; a++){
            for(var j=0; j<jugadores.length; j++){
              mano = manos[g]; accion = acciones[a]; jugador = jugadores[j];
              sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador='" + jugador + "' and accion='" + accion + "' and mano='" + mano + "' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as " + mano + "_" + accion + "_j" + jugador + ", ";
            }
          }
        }
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=1 and mano!='' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total_j1, ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=2 and mano!='' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total_j2, ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=3 and mano!='' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total_j3, ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=4 and mano!='' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total_j4, ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total";
        
        tx.executeSql(sql, [], function(tx, results){
          var r = results.rows.item(0);
          
          for(var j=1; j<=4; j++){

            if(parseInt(r.total) > 0){
              var data = [
                {label: 'PG', color: '#a3bd31', data: [[1, parseInt(r['drive_pg_j' + j]) * 100 / parseInt(r.total)], [2, parseInt(r['reves_pg_j' + j]) * 100 / parseInt(r.total)]], bars:{show: true, barWidth: 0.2, order: 1}},
                {label: 'EF', color: '#cb6018', data: [[1, parseInt(r['drive_ef_j' + j]) * 100 / parseInt(r.total)], [2, parseInt(r['reves_ef_j' + j]) * 100 / parseInt(r.total)]], bars:{show: true, barWidth: 0.2, order: 2}},
                {label: 'ENF', color: '#bf0411', data: [[1, parseInt(r['drive_enf_j' + j]) * 100 / parseInt(r.total)], [2, parseInt(r['reves_enf_j' + j]) * 100 / parseInt(r.total)]], bars:{show: true, barWidth: 0.2, order: 3}}
              ];
            } else {
              var data = [
                {label: 'PG', color: '#a3bd31', data: [[1, 0], [2, 0]], bars:{show: true, barWidth: 0.2, order: 1}}, 
                {label: 'EF', color: '#cb6018', data: [[1, 0], [2, 0]], bars:{show: true, barWidth: 0.2, order: 2}}, 
                {label: 'ENF', color: '#bf0411', data: [[1, 0], [2, 0]], bars:{show: true, barWidth: 0.2, order: 3}}
              ];
            }
            
            var options = {
              series: {
                stack: 0,
                lines: {show: false, steps: false },
                bars: {show: true, barWidth: 0.7, align: 'left', fill: 1}
              },
              xaxis: {ticks: [[1, l['analisis_grafico_1p']['drive']], [2, l['analisis_grafico_1p']['reves']]], labelAngle: 45, color: '#333', tickColor: '#f6f6f7', font: {size: 22}},
              yaxis: {min: 0, minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)) + '%'; }), tickColor: '#d5d5d5'},
              legend: {show: false},
              grid: {show: true, borderColor: '#f6f6f7'}
            };
            
            graficas['manos_j' + j] = {'data': data, 'options': options};

            var total_jugador = parseInt(r['total_j' + j]);
            if(total_jugador == 0) fichas.remove('manos_j' + j);
            
          }
          
        });

        // donde

        var dondes = ['fondo', 'pantano', 'red'];
        var acciones = ['ef', 'enf', 'pg'];
        var jugadores = [1, 2, 3, 4];
        var sql = "select ";
        for(var g=0; g<dondes.length; g++){
          for(var a=0; a<acciones.length; a++){
            for(var j=0; j<jugadores.length; j++){
              donde = dondes[g]; accion = acciones[a]; jugador = jugadores[j];
              sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador='" + jugador + "' and accion='" + accion + "' and donde='" + donde + "' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as " + donde + "_" + accion + "_j" + jugador + ", ";
            }
          }
        }
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=1 and donde!='' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total_j1, ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=2 and donde!='' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total_j2, ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=3 and donde!='' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total_j3, ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=4 and donde!='' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total_j4, ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and (accion='pg' or accion='ef' or accion='enf') and not((accion='ef' or accion='enf') and golpe='saque_1')) as total";
        
        tx.executeSql(sql, [], function(tx, results){
          var r = results.rows.item(0);
          
          for(var j=1; j<=4; j++){

            if(parseInt(r.total) > 0){
              var data = [
                {label: 'PG', color: '#a3bd31', data: [[1, parseInt(r['fondo_pg_j' + j]) * 100 / parseInt(r.total)], [2, parseInt(r['pantano_pg_j' + j]) * 100 / parseInt(r.total)], [3, parseInt(r['red_pg_j' + j]) * 100 / parseInt(r.total)]], bars:{show: true, barWidth: 0.2, order: 1}},
                {label: 'EF', color: '#cb6018', data: [[1, parseInt(r['fondo_ef_j' + j]) * 100 / parseInt(r.total)], [2, parseInt(r['pantano_ef_j' + j]) * 100 / parseInt(r.total)], [3, parseInt(r['red_ef_j' + j]) * 100 / parseInt(r.total)]], bars:{show: true, barWidth: 0.2, order: 2}},
                {label: 'ENF', color: '#bf0411', data: [[1, parseInt(r['fondo_enf_j' + j]) * 100 / parseInt(r.total)], [2, parseInt(r['pantano_enf_j' + j]) * 100 / parseInt(r.total)], [3, parseInt(r['red_enf_j' + j]) * 100 / parseInt(r.total)]], bars:{show: true, barWidth: 0.2, order: 3}}
              ];
            } else {
              var data = [
                {label: 'PG', color: '#a3bd31', data: [[1, 0], [2, 0], [3, 0]], bars:{show: true, barWidth: 0.2, order: 1}}, 
                {label: 'EF', color: '#cb6018', data: [[1, 0], [2, 0], [3, 0]], bars:{show: true, barWidth: 0.2, order: 2}}, 
                {label: 'ENF', color: '#bf0411', data: [[1, 0], [2, 0], [3, 0]], bars:{show: true, barWidth: 0.2, order: 3}}
              ];
            }
            
            var options = {
              series: {
                stack: 0,
                lines: {show: false, steps: false },
                bars: {show: true, barWidth: 0.7, align: 'left', fill: 1}
              },
              xaxis: {ticks: [[1, l['analisis_grafico_1p']['fondo']], [2, l['analisis_grafico_1p']['pantano']], [3, l['analisis_grafico_1p']['red']]], labelAngle: 45, color: '#333', tickColor: '#f6f6f7', font: {size: 22}},
              yaxis: {min: 0, minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)) + '%'; }), tickColor: '#d5d5d5'},
              legend: {show: false},
              grid: {show: true, borderColor: '#f6f6f7'}
            };
            
            graficas['donde_j' + j] = {'data': data, 'options': options};

            console.log('jugador ' + j);
            console.log(data);

            var total_jugador = parseInt(r['total_j' + j]);
            if(total_jugador == 0) fichas.remove('donde_j' + j);
            
          }
          
        });

      });
      
    });
  });

  $('.mover.izquierda').click(function(){ 
    i_ficha--; if(i_ficha < 0) i_ficha = fichas.length - 1;
    $('.ficha').hide();
    $('.ficha.' + fichas[i_ficha]).show({'duration': 0, 'done': function(){ mostrar_grafica_1p(fichas[i_ficha]); }});
  });

  $('.mover.derecha').click(function(){ 
    i_ficha++; if(i_ficha == fichas.length) i_ficha = 0;
    $('.ficha').hide();
    $('.ficha.' + fichas[i_ficha]).show({'duration': 0, 'done': function(){ mostrar_grafica_1p(fichas[i_ficha]); }});
  });

  $('.ficha').hide();

  $('.ayuda').click(function(){ 
    var ayuda = window.localStorage.getItem('ayuda');
    if(ayuda != 'guia_rapida' && ayuda != 'ayuda_completa'){
      ayuda = 'guia_rapida';
      window.localStorage.setItem('ayuda', 'guia_rapida');
    }
    switch(ayuda){
      case 'guia_rapida':
        $('.popup_ayuda .guia_rapida').show();
        $('.popup_ayuda .ayuda_completa').hide();
      break;
      case 'ayuda_completa':
        $('.popup_ayuda .guia_rapida').hide();
        $('.popup_ayuda .ayuda_completa').show();
      break;
    }
    popup('.popup_ayuda'); 
  });
  $('.popup_ayuda .cambio_ayuda').click(function(){
    var ayuda = window.localStorage.getItem('ayuda');
    if(ayuda != 'guia_rapida' && ayuda != 'ayuda_completa'){
      ayuda = 'guia_rapida';
      window.localStorage.setItem('ayuda', 'guia_rapida');
    }
    switch(ayuda){
      case 'guia_rapida': ayuda = 'ayuda_completa'; break;
      case 'ayuda_completa': ayuda = 'guia_rapida'; break;
    }
    window.localStorage.setItem('ayuda', ayuda);
    $('.popup_ayuda .guia_rapida, .popup_ayuda .ayuda_completa').toggle();
  });

}

function mostrado_analisis_grafico_1p(){
  redimensionar_contenido('analisis_grafico_1p');
  secuencia_inicio++; if(secuencia_inicio >= 2){ $('.ficha.resumen').show(); mostrar_grafica_1p('resumen'); }
}

function mostrar_grafica_1p(selector){
  if(selector.substr(0, 8) == 'servicio'){
    if($('.ficha.' + selector + ' .grafica.servicio_1').html() == '' && graficas[selector + '_1'] != ''){
      $.plot('.ficha.' + selector + ' .grafica.servicio_1', graficas[selector + '_1'].data, graficas[selector + '_1'].options);
    } 
    if($('.ficha.' + selector + ' .grafica.servicio_2').html() == '' && graficas[selector + '_2'] != ''){
      $.plot('.ficha.' + selector + ' .grafica.servicio_2', graficas[selector + '_2'].data, graficas[selector + '_2'].options);
    } 
  } else {
    if($('.ficha.' + selector + ' .grafica').html() == '' && graficas[selector] != ''){
      $.plot('.ficha.' + selector + ' .grafica', graficas[selector].data, graficas[selector].options);
    } 
  }
}

// codificación utf8

l['analisis_grafico_1p'] = {};

l['analisis_grafico_1p']['titulo'] = 'Análisis Gráfico';

l['analisis_grafico_1p']['resumen'] = 'Resumen del Partido - Puntos finales';
l['analisis_grafico_1p']['analisis_servicio'] = 'Resumen del Partido - Servicio';
l['analisis_grafico_1p']['analisis_acciones'] = 'Análisis de Golpes';
l['analisis_grafico_1p']['analisis_manos'] = 'Análisis de Golpes';
l['analisis_grafico_1p']['analisis_donde'] = 'Análisis de Golpes';

l['analisis_grafico_1p']['enf'] = 'ENF';
l['analisis_grafico_1p']['ef'] = 'EF';
l['analisis_grafico_1p']['pg'] = 'PG';

l['analisis_grafico_1p']['saque_1'] = '1s';
l['analisis_grafico_1p']['saque_2'] = '2s';
l['analisis_grafico_1p']['breaks'] = 'Breaks';

l['analisis_grafico_1p']['leyenda_saque_1'] = '<span class="n">1<span class="o">er</span></span> Saque';
l['analisis_grafico_1p']['leyenda_saque_2'] = '<span class="n">2<span class="o">o</span></span> Saque';

l['analisis_grafico_1p']['saques_correctos'] = 'Correctos';
l['analisis_grafico_1p']['saques_fallados'] = 'Fallados';
l['analisis_grafico_1p']['saques_sin_datos'] = 'Sin Datos';

l['analisis_grafico_1p']['coeficiente_ps'] = 'Coef ps';

l['analisis_grafico_1p']['err_no_forzado'] = 'Err. No Forzado';
l['analisis_grafico_1p']['err_forzado'] = 'Error Forzado';
l['analisis_grafico_1p']['punto_ganado'] = 'Punto Ganado';

l['analisis_grafico_1p']['servicio'] = 'Servicio';
l['analisis_grafico_1p']['resto'] = 'Resto';
l['analisis_grafico_1p']['bote_p'] = 'Bote P.';
l['analisis_grafico_1p']['directo'] = 'Directo';
l['analisis_grafico_1p']['volea'] = 'Volea';
l['analisis_grafico_1p']['bandeja'] = 'Bandeja';
l['analisis_grafico_1p']['s_pared'] = 'S.Pared';
l['analisis_grafico_1p']['smash'] = 'Smash';
l['analisis_grafico_1p']['globo'] = 'Globo';

l['analisis_grafico_1p']['drive'] = 'Drive';
l['analisis_grafico_1p']['reves'] = 'Revés';

l['analisis_grafico_1p']['fondo'] = 'Fondo';
l['analisis_grafico_1p']['pantano'] = 'Pantano';
l['analisis_grafico_1p']['red'] = 'Red';



// JavaScript Document

function inicio_registro_usuario_1(){
  $('#registro_usuario_1 .registro').click(function(){ registro_usuario_1(); });
  $('#registro_usuario_1 .condiciones a').click(function(){ popup('#registro_usuario_1 .popup_condiciones'); });
}

function mostrado_registro_usuario_1(){
	redimensionar_contenido('registro_usuario_1');
}

function registro_usuario_1(){
  
  var alias = $('#registro_usuario_1 .alias').val().trim();
  var email = $('#registro_usuario_1 .email').val().trim();
  var password = $('#registro_usuario_1 .password').val().trim();
  var repetir = $('#registro_usuario_1 .repetir').val().trim();
  var condiciones = $('#registro_usuario_1 .condiciones').hasClass('checked');

  if(alias == ''){ notificacion(l['registro_usuario_1']['alias_vacio'], null); return false; }
  if(email == ''){ notificacion(l['registro_usuario_1']['email_vacio'], null); return false; }
  if(!validar_email(email)){ notificacion(l['registro_usuario_1']['email_invalido'], null); return false; }
  if(password == ''){ notificacion(l['registro_usuario_1']['password_vacio'], null); return false; }
  if(repetir == ''){ notificacion(l['registro_usuario_1']['repetir_vacio'], null); return false; }
  if(password != repetir){ notificacion(l['registro_usuario_1']['repetir_invalido'], null); return false; }
  if(!condiciones){ notificacion(l['registro_usuario_1']['faltan_condiciones'], null); return false; }

  if(online()){
    $('#registro_usuario_1 .registro').addClass('inactivo');

    navigator.notification.confirm(l['registro_usuario_1']['confirmar_email'] + email, 
      function(b){ 
        if(b == 1){
    
          var jqxhr = $.post(url_api + 'registro_usuario_1', {'alias': encodeURI(alias), 'email': encodeURI(email), 'password': encodeURI(md5(password)), 'dummy': 'dummy'}, function(data){ 
          console.log('registro_usuario_1: ' + data);
          switch(data){
            case 'ko': notificacion(l['registro_usuario_1']['error'], null); break;
            case 'alias_repetido': notificacion(l['registro_usuario_1']['alias_repetido'], null); break;
            case 'email_repetido': notificacion(l['registro_usuario_1']['email_repetido'], null); break;
            default:
              ga_evento('usuarios', 'registro');
              data = data.split('|');
              id_usuario = parseInt(data[0]);
              token = md5(password);
              registro_completo = data[1];
              usuario_activo = data[2];
              window.localStorage.setItem('id_usuario', parseInt(data[0]));
              window.localStorage.setItem('token', md5(password));
              window.localStorage.setItem('registro_completo', data[1]);
              window.localStorage.setItem('usuario_activo', data[2]);
              notificacion(l['registro_usuario_1']['recuerda_activar'], null);
              mostrar_pagina('registro_usuario_2');
            }

          }, 'text')
          .fail(function(){ notificacion(l['api_error_conexion'], null); })
          .always(function(){ $('#registro_usuario_1 .registro').removeClass('inactivo'); });

        } else $('#registro_usuario_1 .registro').removeClass('inactivo'); 
      }, l['padelstat'], l['si'] + ',' + l['no']
    );

  } else { notificacion(l['offline'], null); return false; }

}

// codificación utf8

l['registro_usuario_1'] = {};

l['registro_usuario_1']['titulo'] = 'Registro de usuario';
l['registro_usuario_1']['registro'] = 'Registro';
l['registro_usuario_1']['alias'] = 'Alias';
l['registro_usuario_1']['email'] = 'Email';
l['registro_usuario_1']['password'] = 'Contraseña';
l['registro_usuario_1']['repetir'] = 'Repetir';

l['registro_usuario_1']['alias_vacio'] = 'Tu alias no puede estar en blanco';
l['registro_usuario_1']['email_vacio'] = 'Tu email no puede estar en blanco';
l['registro_usuario_1']['email_invalido'] = 'Tu email no es válido';
l['registro_usuario_1']['password_vacio'] = 'Tu contraseña no puede estar en blanco';
l['registro_usuario_1']['repetir_vacio'] = 'Tienes que repetir tu contraseña';
l['registro_usuario_1']['repetir_invalido'] = 'Tus contraseñas no coinciden';

l['registro_usuario_1']['alias_repetido'] = 'El alias ya está ocupado por otro usuario';
l['registro_usuario_1']['email_repetido'] = 'El email ya está ocupado por otro usuario';
l['registro_usuario_1']['error'] = 'Ha ocurrido un error completando tu registro, por favor, inténtalo de nuevo';

l['registro_usuario_1']['confirmar_email'] = 'Confirma el email introducido: \n\n';

l['registro_usuario_1']['recuerda_activar'] = 'Te hemos enviado un email a tu buzón para confirmar tu registro, por favor revísalo, mientras tanto continuamos con el registro...';
l['registro_usuario_1']['leido_acepto'] = 'He leido y acepto las';
l['registro_usuario_1']['condiciones'] = 'condiciones de uso y aviso legal';
l['registro_usuario_1']['faltan_condiciones'] = 'Tienes que leer y aceptar las condiciones de uso y aviso legal';

l['registro_usuario_1']['condiciones_aviso_legal'] = '' +
  '<h1>CONDICIONES DE USO Y AVISO LEGAL DE padelstat</h1>' +
  '<h2>1. Aceptación de las condiciones</h2>' +  
  '<p>Bienvenido a la versión de producción de padelstat</p>' +  
  '<p>Las siguientes condiciones de servicio (en adelante, “Condiciones de servicio”) se establecen entre usted y padelstat y constituyen un contrato legal que rige el uso de los servicios y la aplicación para dispositivos móviles de la versión beta pública de padelstat (en adelante, el “Servicio”). Debe aceptar estas Condiciones de servicio para poder usar el Servicio. Puede aceptar estas Condiciones de servicio: a) usando el Servicio o b) aceptando el Contrato de licencia de software de padelstat, del que forman parte estas Condiciones de servicio. Si no acepta alguna de estas condiciones, no utilice el Servicio. Debe imprimir o guardar una copia de estas Condiciones de servicio para su registro. padelstat tal y como aquí se utiliza, pertenece a padelstat,C.B., con domicilio social en C/ Conde de Altea, 28 4, 46005, Valencia, con CIF: E98566714.</p>' +  
  '<h2>Capacidad jurídica</h2>' +  
  '<p>Para usar o registrarse en el Servicio: a) debe ser mayor de 13 años para poder formalizar un contrato vinculante con padelstat y b) no puede ser una persona que tenga prohibido recibir el Servicio conforme a la legislación española o de cualquier otra jurisdicción aplicable, incluido el país donde resida o desde el que utilice el Servicio. La aceptación de estas Condiciones de servicio implica el entendimiento y la aceptación de las mismas.</p>' +  
  '<h2>Cambios en el presente Contrato</h2>' +  
  '<p>padelstat puede actualizar o modificar estas Condiciones de servicio oportunamente, por lo que le recomienda que las revise con regularidad. Usted entiende y acepta que el hecho de que siga utilizando el Servicio tras la modificación de las Condiciones de servicio significará que acepta dichas Condiciones de servicio revisadas.</h2>' +  
  '<h2>Versión gratuita</h2>' +  
  '<p>Usted reconoce y acepta que el Servicio se proporciona en forma de versión gratuita y que se pone a disposición de los usuarios “TAL CUAL” y “EN FUNCIÓN DE SU DISPONIBILIDAD” con la finalidad de proporcionar a padelstat información acerca de la calidad y utilidad del Servicio. El Servicio puede contener errores o imprecisiones que pueden provocar fallos o la corrupción y pérdida de datos y/o información del dispositivo y de los periféricos (incluidos, sin limitaciones, servidores y ordenadores) conectados a él. padelstat le recomienda realizar copias de seguridad de todos los datos almacenados en su dispositivo y en todos los periféricos antes de utilizar el Servicio. USTED ASUMIRÁ TODOS LOS RIESGOS Y COSTES ASOCIADOS AL USO DEL SERVICIO, INCLUYENDO, CON CARÁCTER MERAMENTE ENUNCIATIVO Y NO LIMITATIVO, LAS TARIFAS DE ACCESO A INTERNET, LOS GASTOS DERIVADOS DE LAS COPIAS DE SEGURIDAD, LOS COSTES GENERADOS POR EL USO DEL DISPOSITIVO Y LOS PERIFÉRICOS, ASÍ COMO CUALQUIER DAÑO INFLIGIDO AL EQUIPO, EL SOFTWARE, LA INFORMACIÓN O LOS DATOS. Además, padelstat no se compromete a prestar mantenimiento técnico o cualquier otra clase de soporte para el Servicio.</p>' + 
  '<h2>Versiones de pago</h2>' + 
  '<p>El usuario de padelstat podrá decidir adquirir una de las versiones de pago o versiones Premium de la aplicación, que ofrecerán funcionalidades más avanzadas a dichos usuarios. Las condiciones de funcionalidad de cada versión Premium quedarán reflejadas y especificadas previo a la compra por parte del usuario a través de los medios que elija padelstat para promocionar dicha compra entre sus usuarios. padelstat podrá modificar las condiciones de funcionalidad contratadas con un usuario dentro del periodo en el que el usuario haya adquirido su licencia de versión Premium, siempre que estas condiciones sean superiores que las que contrató el usuario, salvo caso de fallo o error detectado en alguna funcionalidad en la que padelstat se reserva el derecho a eliminar la funcionalidad en la que se haya identificado el fallo.</p>' + 
  '<h2>Modificación del Servicio</h2>' +  
  '<p>padelstat se reserva el derecho de modificar, suspender o detener el Servicio (o cualquier parte del mismo), ya sea de forma temporal o permanente, en cualquier momento o cuando lo considere necesario, con o sin notificación previa. Sin perjuicio de lo anterior, padelstat puede notificarle cualquier modificación efectuada en el Servicio a través de sus sitios web y/o a través del Servicio. Usted acepta que padelstat no será responsable ante usted ni ante ningún tercero por cualquier modificación o cese del Servicio. Usted reconoce que padelstat no tiene obligación alguna, ni explícita ni implícita, de proporcionar o de seguir proporcionando el Servicio, o cualquier parte del mismo, ni ahora ni en el futuro. Además, padelstat puede fijar tarifas o cargos por el uso del Servicio en cualquier momento, siempre y cuando se notifique previamente de acuerdo con lo estipulado por la ley vigente.</p>' +  
  '<h2>Opiniones de los usuarios</h2>' +  
  '<p>Como parte del uso del Servicio, padelstat le ofrece la oportunidad de enviar sus comentarios, sugerencias y otras opiniones acerca de su experiencia al utilizar el Servicio. A falta de un contrato por escrito aparte que disponga lo contrario, usted otorga total libertad a padelstat para usar con cualquier finalidad las opiniones que usted haya enviado.</p>' +  
  '<h2>Limitaciones de uso</h2>' +  
  '<p>padelstat puede imponer ciertas limitaciones al uso del Servicio, incluidas, a título enunciativo y no limitativo, la asignación de determinados niveles de capacidad de almacenamiento a su perfil de usuario padelstat, la restricción del número de perfiles de usuario que puede registrar, la restricción de las estadísticas e información a visualizar y la retirada de la información vencida del Servicio. Usted se compromete a usar el Servicio única y exclusivamente para los propósitos que se indican en estas Condiciones de servicio y conforme a cualquier legislación, regulación o práctica comúnmente aceptada de la jurisdicción aplicable. padelstat se reserva el derecho a modificar o imponer limitaciones al uso del Servicio en cualquier momento, con o sin previo aviso.</p>' +  
  '<h2>Perfiles de usuario padelstat</h2>' +  
  '<p>Para acceder al Servicio y activarlo, debe registrar sus datos y crear un perfil de usuario padelstat. Dicho perfil de usuario servirá para configurar el Servicio con el fin de que pueda utilizarlo. Usted es responsable de todas las actividades que se lleven a cabo en su perfil. Elija una contraseña segura para su perfil y no la revele a otros usuarios. Usted acepta la responsabilidad de mantener la contraseña en secreto y protegida y, además, entiende que es el único responsable de todas las actividades que se lleven a cabo con su perfil.</p>' +  
  '<h2>Prohibición de reventa del Servicio</h2>' +  
  '<p>Usted acepta que no reproducirá, copiará, duplicará, venderá, revenderá, alquilará ni comercializará el Servicio (ni cualquier parte de mismo) para ningún fin.</p>' +  
  '<h2>3. Política de privacidad de padelstat</h2>' +  
  '<h2>Tratamiento de los datos personales</h2>' +  
  '<p>En conformidad con lo expuesto por la Ley Orgánica de Protección de Datos (Ley Orgánica 15/99) de carácter personal, sus datos personales se incluirán en nuestro fichero automatizado, con la finalidad de gestionar el acceso de usuarios y realizar comunicaciones electrónicas, así como para obtener datos estadísticos. Además de datos personales, puede compartir en su cuenta de usuario notas, información sobre usted, fotos, etc. Utilizaremos sus datos personales para poder gestionar y clasificar la información de estadísticas y partidas así como de mantenerle informado de las últimas novedades tanto en la aplicación para dispositivos móviles como en la web. Como usuario de padelstat tiene estos derechos sobre sus datos personales: derecho de acceso: usted se puede dirigir a padelstat para solicitarle información sobre si sus propios datos de carácter personal están siendo objeto de tratamiento, la finalidad del tratamiento que, en su caso, se esté realizando, así como la información disponible sobre el origen de dichos datos y las comunicaciones realizadas o previstas de los mismos; derecho de rectificación: en el caso de que sus datos personales sean incompletos, inexactos, inadecuados o excesivos, puede dirigirse a padelstat para que sean debidamente modificados o pedirnos su cancelación si ya no desea ser usuario de padelstat; derecho de cancelación: en cualquier momento puede ponerse en contacto con padelstat para oponerse a que sigamos utilizando sus datos personales, con lo que procederemos a la eliminación de su cuenta de usuario. El objetivo de nuestra política de privacidad es respetar al máximo la legislación vigente de protección de datos personales. Si usted tiene cualquier duda sobre la confidencialidad o el tratamiento que reciben sus datos, así como si desea ejercer alguno de los derechos de información, oposición, rectificación y cancelación que legalmente le corresponden, puede dirigirse a padelstat, C.B., con domicilio en C/ Conde de Altea, 28, 4 46005 de Valencia. Podrá dirigirse por correo electrónico a través de info@padelstat.com. La Entidad ha adoptado las medidas de índole técnica y organizativa necesarias para garantizar la confidencialidad y seguridad de los datos personales, evitando su alteración, pérdida, tratamiento o acceso no autorizado de acuerdo a lo estipulado en el Reglamento de desarrollo de la LOPD cumpliendo en todo caso con el nivel de seguridad adecuado al nivel de los datos tratados. No tendrán consideración de Datos Personales los resultados de los partidos y estadísticas que se introduzcan en los cuales Vd. haya participado, ni los valores padelstat obtenidos, ni los comentarios que cualquier jugador introduzca en padelstat. Vd. acepta que esta información sea visible y esté disponible, aún cuando haya solicitado darse de baja en el Portal, ya que está relacionada con otros jugadores y ha sido utilizada para el cálculo de los valores padelstat. Vd. no podrá solicitar la eliminación de esta información, de la cual es propietaria padelstat, C.B., la cual podrá seguir haciendo uso de ella para el correcto funcionamiento del servicio prestado.</p>' +  
  '<h2>4. Contenido y conducta</h2>' +  
  '<h2>Contenido</h2>' +  
  '<p>“Contenido” hace referencia a cualquier información que pueda generarse o encontrarse mediante el uso del Servicio, como archivos de datos, texto escrito, software, música, gráficos, fotografías, imágenes, sonidos, vídeos, mensajes y cualquier material de este tipo. Usted entiende que todo el Contenido que se publique o se transmita en privado a través del Servicio es responsabilidad única de la persona de la que provenga dicho Contenido. Eso significa que usted, y no padelstat, es el único responsable del Contenido que cargue, descargue, publique, envíe por correo electrónico, transmita, almacene o ponga a disposición de cualquier otro modo mediante uso del Servicio. Usted entiende que, al utilizar el Servicio, puede encontrar Contenido que le resulte ofensivo, indecente o censurable, así como exponer a otros usuarios a Contenido que puede resultarles censurable. padelstat no ejerce ningún control sobre el Contenido publicado a través del Servicio ni garantiza la exactitud, integridad o calidad de dicho Contenido. Usted asume todo el riesgo derivado del uso que haga del Servicio y de cualquier Contenido.</p>' +  
  '<h2>Conducta</h2>' +  
  '<p>Usted acepta NO utilizar el Servicio para:</p>' +  
  '<p>1. cargar, descargar, publicar, enviar por correo electrónico, transmitir, almacenar o poner a disposición de algún otro modo cualquier Contenido que pueda considerarse ilícito, acosador, amenazante, dañino, malicioso, difamatorio, calumnioso, abusivo, violento, obsceno, vulgar, que invada la privacidad de otros, grosero, ofensivo desde el punto de vista racial o étnico, o cuestionable por cualquier motivo;</p>' +  
  '<p>2. espiar, acosar, amenazar o dañar a otros;</p>' +  
  '<p>3. hacerse pasar por otra persona o entidad; no puede falsear ni suplantar la identidad de otra persona (incluidos personajes famosos), entidad, suscriptor de padelstat, empleado de padelstat o líder cívico o del gobierno, ni falsear la identidad de su afiliación por la de otra persona o entidad (padelstat se reserva el derecho a rechazar o bloquear cualquier Identificador de suscriptor que pueda considerarse una suplantación o representación fraudulenta de su identidad o una apropiación indebida del nombre o identidad de otra persona);</p>' +  
  '<p>4. involucrarse en cualquier infracción de derechos de autor o cualquier otra infracción de propiedad intelectual ni revelar ningún secreto comercial ni información confidencial que infrinja un contrato de confidencialidad, empleo o no revelación;</p>' +  
  '<p>5. publicar, enviar, transmitir o poner a disposición de algún otro modo mensajes de correo electrónico, anuncios, materiales promocionales, mensajes de correo no deseado o cadenas de charlas que no se hayan solicitado o autorizado, incluidos, sin carácter limitativo, anuncios informativos y anuncios comerciales masivos;</p>' +  
  '<p>6. falsificar ningún encabezado de paquete TCP-IP ni ninguna parte de la información de encabezado de un mensaje de correo electrónico o publicación, ni añadir información de ningún otro modo a un encabezado diseñado para engañar a los destinatarios haciéndose pasar por el origen de cualquier Contenido transmitido a través del Servicio (“suplantación de identidad”);</p>' +  
  '<p>7. actualizar, publicar, enviar por correo electrónico, almacenar o poner a disposición de alguna otra forma cualquier material que contenga virus o cualquier otro código de ordenador, archivos o programas diseñados para hacer daño, interferir o limitar el funcionamiento normal del Servicio (o de cualquier parte del mismo), o cualquier otro software o hardware informático;</p>' +  
  '<p>8. interferir o interrumpir el Servicio (incluido el acceso al Servicio a través de cualquier medio automatizado, como scripts o agentes de búsqueda) o cualquier servidor o red que esté conectado al Servicio, así como cualquier directiva, requisito o regulación de redes conectadas al Servicio (incluido cualquier acceso, uso o supervisión de datos o tráfico no autorizados a través del Servicio);</p>' +  
  '<p>9. planear o involucrarse en alguna actividad ilegal; o</p>' +  
  '<p>10. recopilar y almacenar información personal sobre cualquier otro usuario del Servicio para utilizarla en relación con cualquiera de las actividades prohibidas anteriormente mencionadas.</p>' +   
  '<h2>Eliminación del Contenido</h2>' +  
  '<p>Usted reconoce que padelstat no es responsable en modo alguno del Contenido suministrado por otros y que no tiene la obligación de evaluar previamente dicho Contenido. No obstante, padelstat se reserva el derecho a determinar en cualquier momento si el Contenido es apropiado y se ajusta a estas Condiciones de servicio y puede evaluar previamente, trasladar, rechazar, modificar o eliminar Contenido en cualquier momento, sin notificación previa y a su entera discreción, si dicho Contenido infringe estas Condiciones de servicio o es de algún modo censurable.</p>' +  
  '<h2>Copias de seguridad del Contenido</h2>' +  
  '<p>Usted es el responsable de realizar copias de seguridad, en su propio ordenador o en otro dispositivo, de cualquier documento, imagen u otro Contenido importante que guarde o al que acceda mediante el Servicio. padelstat no ofrece ninguna garantía de que el Contenido que se guarde o al que se acceda mediante el Servicio pueda resultar dañado, pueda perderse o pueda corromperse.</p>' +  
  '<h2>Acceso a su cuenta y Contenido</h2>' +  
  '<p>Usted reconoce y acepta que padelstat puede acceder, usar, conservar o revelar la información y el Contenido de su cuenta si así se le solicita legalmente o en la creencia de buena fe de que dicho acceso, uso, revelación o conservación es razonablemente necesario para: (a) cumplir procesos o solicitudes legales; (b) aplicar estas Condiciones de servicio, incluida la investigación de cualquier posible infracción relacionada con las mismas; (c) detectar, impedir o solucionar problemas de seguridad, fraudes o problemas técnicos; o (d) proteger los derechos, la propiedad o la seguridad de padelstat, sus usuarios o el público conforme a lo que exija o permita la legislación.</p>' +  
  '<h2>Aviso de derechos de autor</h2>' +  
  '<p>Si considera que alguna persona que usa el Servicio ha infringido el Contenido por el que usted reclama derechos de autor, póngase en contacto con el agente de derechos de autor de padelstat a través de info@padelstat.com. padelstat puede, a su entera discreción, suspender o cancelar las cuentas de usuarios que hayan cometido reiteradas infracciones.</p>' +  
  '<h2>Infracción de las Condiciones de servicio</h2>' +  
  '<p>Si durante el uso del Servicio encuentra Contenido que considera inapropiado o que considera que supone una infracción de estas Condiciones de servicio, puede notificarlo enviando un mensaje de correo electrónico a la dirección info@padelstat.com</p>' +  
  '<h2>5. Contenido enviado o puesto a disposición a través el Servicio</h2>' +  
  '<h2>Licencia del usuario</h2>' +  
  '<p>A excepción del material para el que le concedemos licencia, padelstat no reclama la propiedad de los materiales ni del Contenido que envíe o ponga a disposición a través del Servicio. No obstante, si envía o publica dicho Contenido en áreas del Servicio accesibles al público, usted concede a padelstat una licencia de uso mundial, libre de regalías y no exclusiva para usar, distribuir, reproducir, modificar, adaptar, publicar, traducir, comunicar públicamente y exhibir públicamente dicho Contenido a través del Servicio exclusivamente con el fin para el que se envió o se puso a disposición el Contenido. Dicha licencia terminará dentro de un plazo comercial razonable después de que usted o padelstat eliminen dicho Contenido del área pública. Al enviar o publicar dicho Contenido en áreas del Servicio accesibles al público, usted acepta que es el propietario de dicho material o que tiene autorización para distribuirlo.</p>' +  
  '<h2>Modificaciones en el Contenido</h2>' +  
  '<p>Usted acepta que, para poder ofrecer el Servicio y hacer que su Contenido esté disponible, padelstat puede transmitir su Contenido a través de varias redes públicas, en distintos medios, y modificar o cambiar su Contenido para ajustarse a los requisitos técnicos de los dispositivos o redes conectados. Usted acepta que la presente licencia permite a padelstat realizar cualquiera de estas acciones.</p>' +  
  '<h2>6. Información de marca comercial</h2>' +  
  '<p>padelstat, el logotipo de padelstat, y las demás marcas comerciales, marcas de servicio, gráficos y logotipos de padelstat usados en relación con el Servicio son marcas comerciales o registradas en España u otros países. Las otras marcas comerciales, marcas de servicio, gráficos y logotipos usados en relación con el Servicio pueden ser marcas comerciales de sus respectivos propietarios. No se le concede ningún derecho ni licencia sobre las marcas comerciales anteriormente mencionadas y, además, usted acepta que no eliminará, ocultará ni alterará ningún aviso de propiedad (incluidos los avisos de marcas comerciales y copyright) que pueda insertarse o incluirse dentro del Servicio.</p>' +  
  '<h2>7. Software</h2>' +  
  '<h2>Derechos de propiedad de padelstat</h2>' +  
  '<p>Usted reconoce y acepta que padelstat o sus licenciantes poseen todos los derechos legales, títulos e intereses sobre el Servicio, así como sobre cualquier software (incluidos todos los Contenidos que se proporcionen con él) que padelstat le suministre como parte del Servicio o en relación con el mismo (el “Software”), incluidos todos los derechos de propiedad intelectual derivados, ya estén registrados o no y sea cual sea el lugar donde se encuentren. Además, usted acepta que el Servicio (incluido el Software o cualquier otra parte del mismo) contiene información confidencial o de propietario protegida por las leyes de propiedad intelectual aplicables y otras legislaciones.</p>' +  
  '<h2>Licencia de padelstat</h2>' +  
  '<p>padelstat le garantiza una licencia personal, no exclusiva, no transferible y limitada para usar el Software tal y como se lo suministra padelstat, como parte del Servicio y de acuerdo con estas Condiciones de servicio, siempre y cuando usted (o cualquier persona mediante su autorización) no copie, modifique, cree una obra derivada, utilice técnicas de ingeniería inversa, descompile o intente descubrir el código fuente de algún otro modo (a menos que la legislación lo autorice o lo requiera expresamente), ni tampoco venda, alquile, conceda bajo licencia, asigne, conceda un interés de seguridad o transfiera de algún otro modo cualquier derecho sobre el Software.</p>' +  
  '<h2>Control de las exportaciones</h2>' + 
  '<p>El uso del Servicio y del Software, incluida la transferencia, publicación y carga de datos, software u otros Contenidos a través del Servicio, puede estar supeditado al cumplimiento de las leyes de exportación e importación de España y de otros países, y usted se compromete a cumplir todas las leyes aplicables en esta materia. Asimismo, se compromete a no usar el Software o el Servicio con ninguna finalidad prohibida por la legislación española, además, usted acepta no cargar en su cuenta ningún dato o software que no pueda exportarse sin una autorización previa y por escrito del gobierno, incluidos, sin carácter limitativo, determinados tipos de software de encriptación. Esta garantía y compromiso permanecerán tras la terminación de estas Condiciones de servicio.</p>' +  
  '<h2>Actualizaciones de software</h2>' +  
  '<p>Como parte del Servicio, es posible que reciba actualizaciones del Software de padelstat cuando sea necesario, que se descargarán e instalarán de forma automática en su dispositivo. Estas actualizaciones pueden incluir correcciones de errores, adiciones o mejoras de funciones o versiones completamente nuevas del Software. Usted acepta que padelstat puede distribuir automáticamente estas actualizaciones como parte de Servicio y que deberá recibirlas e instarlas tal y como sea preciso.</p>' +  
  '<h2>Copyright e imágenes digitales</h2>' +  
  '<p>El Servicio y el Software pueden utilizarse para reproducir materiales, siempre y cuando se trate de materiales sin derechos de autor, materiales de los que usted sea el propietario del copyright o materiales que esté autorizado a reproducir legalmente. Los derechos de titularidad y de propiedad intelectual de cualquiera de los Contenidos que se muestran en el Software o el Servicio o a los que se accede a través de éste pertenecen a los propietarios del Contenido correspondiente. Dicho Contenido puede estar protegido por las leyes y los tratados vigentes en materia de propiedad intelectual y de derechos de autor, y puede quedar sujeto a condiciones de uso adicionales de padelstat, sus licenciantes o de la tercera parte suministradora del Contenido. Así, por ejemplo, ninguna fotografía, imagen, gráfico, ilustración o elemento similar (las “Imágenes digitales”) proporcionadas por padelstat y/o por sus licenciantes como parte del Software o del Servicio (incluyendo, con carácter meramente enunciativo y no limitativo, cualquier Imagen digital contenida en las plantillas, los temas o los manuales de usuario y lecciones de iniciación) se podrá extraer o distribuir, comercialmente o de otro modo, de manera independiente fuera del Software o del Servicio.</p>' +  
  '<h2>8. Cancelación</h2>' +  
  '<h2>Cancelación por parte del usuario</h2>' +  
  '<p>Puede cancelar su cuenta o dejar de usar el Servicio en cualquier momento.</p>' +  
  '<h2>Cancelación por parte de padelstat</h2>' +  
  '<p>padelstat puede cancelar o suspender inmediatamente y en cualquier momento, bajo determinadas circunstancias y sin notificación previa, toda o parte de su cuenta o acceso al Servicio. Entre las causas de esta cancelación se incluyen las siguientes, sin carácter limitativo: (a) infracciones de las Condiciones de servicio o de cualquier otra política o directriz a la que se haga referencia en el presente documento o que se haya publicado a través del Servicio; (b) una solicitud de cancelación de la cuenta por parte del usuario; (c) interrupciones o modificación material del Servicio o de cualquier parte de mismo; (d) solicitud o requerimiento legal de un órgano judicial u otro organismo público; (e) cuando el suministro del Servicio al usuario sea o pueda llegar a convertirse en ilegal; (f) problemas técnicos o de seguridad inesperados; o (g) participación del usuario en actividades fraudulentas o ilegales. padelstat realizará cancelaciones o suspensiones de este tipo a su entera discreción, y no se responsabilizará ante el usuario ni ante terceros de los daños que puedan derivarse o surgir como consecuencia de dicha cancelación o suspensión de su cuenta o del acceso al Servicio.</p>' +  
  '<h2>Efectos de la cancelación</h2>' +  
  '<p>Si se cancela su cuenta, perderá toda posibilidad de acceso al Servicio y a cualquier parte de mismo, incluidos, sin carácter limitativo, su cuenta padelstat y todos los datos publicados en él.</h2>' +  
  '<h2>9. Enlaces y materiales de terceros</h2>' + 
  '<p>Determinado Contenido, componentes o características del Servicio pueden incluir materiales de terceros o hipervínculos a otros sitios web, recursos o Contenido. Puesto que es posible que padelstat no tenga ningún control sobre los sitios o materiales de terceros, usted reconoce y acepta que padelstat no es responsable de la disponibilidad de dichos sitios y recursos, no avala ni garantiza la exactitud de ninguno de esos sitios o recursos y en ningún caso se hace responsable del Contenido, publicidad, productos o materiales que se encuentren en dichos sitios o recursos o estén disponibles a través de ellos. Además, usted reconoce y acepta que padelstat no será responsable en modo alguno de los daños en los que usted pueda incurrir o alegue haber incurrido, ya sea directa o indirectamente, como resultado del uso o confianza en dicho Contenido, publicidad, productos o materiales que se encuentren en dichos sitios o recursos o estén disponibles a través de ellos.</p>' +  
  '<h2>10. Exclusión de garantías</h2>' +  
  '<p>ES POSIBLE QUE ALGUNAS JURISDICCIONES NO PERMITAN LA EXCLUSIÓN DE DETERMINADAS GARANTÍAS Y, POR TANTO, EN LA MEDIDA EN QUE DICHAS EXCLUSIONES ESTÉN EXPRESAMENTE PROHIBIDAS POR LA LEGISLACIÓN APLICABLE, PUEDE QUE ALGUNAS DE LAS EXCLUSIONES ANTES MENCIONADAS NO SEAN APLICABLES A SU CASO.</p>' +  
  '<p>USTED RECONOCE Y ACEPTA EXPRESAMENTE QUE EL USO QUE HAGA DEL SERVICIO QUEDA BAJO SU PROPIA CUENTA Y RIESGO Y QUE EL SERVICIO SE PROPORCIONA “TAL CUAL” Y “EN FUNCIÓN DE SU DISPONIBILIDAD”. PADELSTAT Y SUS FILIALES, SUBSIDIARIAS, RESPONSABLES, DIRECTORES, EMPLEADOS, AGENTES, SOCIOS Y LICENCIANTES RENUNCIAN EXPRESAMENTE A TODAS LAS GARANTÍAS DE CUALQUIER TIPO, YA SEAN EXPRESAS O IMPLÍCITAS, INCLUIDAS, SIN CARÁCTER LIMITATIVO, LAS GARANTÍAS IMPLÍCITAS DE COMERCIABILIDAD, ADECUACIÓN PARA UN FIN PARTICULAR Y NO INFRACCIÓN DE DERECHOS DE PROPIEDAD. EN PARTICULAR, PADELSTAT Y SUS FILIALES, SUBSIDIARIAS, RESPONSABLES, DIRECTORES, EMPLEADOS, AGENTES, SOCIOS Y LICENCIANTES NO OTORGAN GARANTÍA ALGUNA DE QUE (I) EL SERVICIO VAYA A CUMPLIR CON SUS REQUISITOS; (II) EL SERVICIO VAYA A FUNCIONAR DE FORMA ININTERRUMPIDA, CON PUNTUALIDAD Y SIN ERRORES; (III) LA INFORMACIÓN QUE PUEDA OBTENER DEL USO DEL SERVICIO SEA PRECISA O FIABLE, Y (IV) SE CORRIJA CUALQUIER DEFECTO O ERROR DEL SOFTWARE QUE SE PROPORCIONA COMO PARTE DEL SERVICIO.</p>' +  
  '<p>CUALQUIER MATERIAL TRANSMITIDO, ALMACENADO, ACCEDIDO O MANTENIDO DE CUALQUIER OTRO MODO A TRAVÉS DEL USO DEL SERVICIO SE REALIZA A SU DISCRECIÓN Y POR SU PROPIO RIESGO, Y USTED SERÁ EL ÚNICO RESPONSABLE DE CUALQUIER DAÑO QUE SE PRODUZCA EN SU DISPOSITIVO O DE LA PÉRDIDA O CORRUPCIÓN DE DATOS QUE RESULTE DEL USO DEL SERVICIO. USTED RECONOCE ADEMÁS QUE EL SERVICIO NO ESTÁ DESTINADO NI ES ADECUADO PARA SER UTILIZADO EN SITUACIONES O ENTORNOS EN LOS QUE FALLOS, RETRASOS, ERRORES O IMPRECISIONES EN EL CONTENIDO, LOS DATOS O LA INFORMACIÓN PROPORCIONADOS POR EL SERVICIO PUDIERAN CONLLEVAR MUERTE, DAÑOS PERSONALES, LESIONES FÍSICAS GRAVES O DAÑOS IMPORTANTES AL MEDIO AMBIENTE. NINGÚN CONSEJO NI INFORMACIÓN, YA SEA ORAL O ESCRITO, OBTENIDO DE PADELSTAT O MEDIANTE EL USO DEL SERVICIO, OTORGA NINGUNA GARANTÍA QUE NO HAYA SIDO EXPRESAMENTE ESTABLECIDA EN ESTAS CONDICIONES DE SERVICIO.</p>' +  
  '<h2>11. Límite de responsabilidad</h2>' +  
  '<p>ES POSIBLE QUE ALGUNAS JURISDICCIONES NO PERMITAN LA EXCLUSIÓN O LIMITACIÓN DE RESPONSABILIDAD POR DAÑOS INCIDENTALES O RESULTANTES Y, POR TANTO, EN LA MEDIDA EN QUE DICHAS EXCLUSIONES O LIMITACIONES ESTÉN EXPRESAMENTE PROHIBIDAS POR LA LEGISLACIÓN APLICABLE, PUEDE QUE ALGUNAS DE LAS EXCLUSIONES O LIMITACIONES ANTES MENCIONADAS NO SEAN APLICABLES A SU CASO.</p>' +  
  '<p>USTED RECONOCE Y ACEPTA EXPRESAMENTE QUE PADELSTAT Y SUS FILIALES, SUBSIDIARIAS, RESPONSABLES, DIRECTORES, EMPLEADOS, AGENTES, SOCIOS Y LICENCIANTES NO SERÁN RESPONSABLES ANTE USTED POR NINGÚN DAÑO DIRECTO, INDIRECTO, INCIDENTAL, ESPECIAL, DERIVADO O PUNITIVO, INCLUIDOS, SIN CARÁCTER LIMITATIVO, LOS DAÑOS POR PÉRDIDA DE GANANCIAS, CLIENTES, USO, DATOS, COSTE DE LA ADQUISICIÓN O SUSTITUCIÓN DE BIENES Y SERVICIOS Y OTRAS PÉRDIDAS INTANGIBLES (INCLUSO EN CASO DE QUE PADELSTAT HAYA SIDO ADVERTIDO DE LA POSIBILIDAD DE ESTOS DAÑOS), QUE SEAN RESULTADO DE: (I) EL USO O LA IMPOSIBILIDAD DE USAR EL SERVICIO; (II) CUALQUIER CAMBIO INTRODUCIDO EN EL SERVICIO O EL CESE TEMPORAL O PERMANENTE DEL SERVICIO O DE UNA PARTE DE ÉL; (III) EL ACCESO NO AUTORIZADO O LA ALTERACIÓN DE LAS TRANSMISIONES DE DATOS; (IV) LA ELIMINACIÓN, CORRUPCIÓN O INCAPACIDAD DE ALMACENAR O ENVIAR Y RECIBIR SUS TRANSMISIONES O DATOS A TRAVÉS DEL SERVICIO; (V) LAS AFIRMACIONES O EL COMPORTAMIENTO DE TERCEROS EN RELACIÓN CON EL SERVICIO, Y (IV) CUALQUIER OTRO ASPECTO VINCULADO AL SERVICIO.</p>' +  
  '<h2>12. Indemnización</h2>' +  
  '<p>Usted acepta defender, indemnizar y declarar inocente a padelstat, sus filiales, subsidiarias, responsables, directores, empleados, agentes, socios y licenciantes, frente a cualquier reclamación o demanda, incluidos los honorarios razonables de abogados, interpuesta por terceros que se derive o surja de: (a) cualquier Contenido que envíe, publique, transmita o ponga a disposición de algún otro modo a través del Servicio; (b) el uso que haga del Servicio; (c) cualquier infracción por su parte de estas Condiciones de servicio, o (d) su violación de los derechos de otros. Esta obligación seguirá en vigor tras la terminación o vencimiento de estas Condiciones de servicio o con posterioridad al uso del Servicio por parte de usted.</p>' +  
  '<h2>13. Avisos</h2>' +  
  '<p>padelstat puede enviarle avisos relativos al Servicio, incluidos los relacionados con modificaciones de estas Condiciones de servicio, por correo electrónico, por correo postal o mediante publicaciones en su sitio web o en el Servicio.</p>' +  
  '<h2>14. Legislación aplicable</h2>' +  
  '<p>La resolución de cualquier litigio o conflicto entre usted y padelstat derivado o relacionado con las presentes Condiciones de servicio o con el uso que usted haga del Servicio se dirimirá en los tribunales de la ciudad de Valencia, España, y usted y padelstat consienten por la presente en la jurisdicción personal y la exclusiva competencia de dichos tribunales con respeto a la resolución de cualquier litigio o conflicto de este tipo. Este Contrato se regirá e interpretará según las leyes del Reino de España. El presente Contrato no estará regido por la convención de las Naciones Unidas sobre contratos para la venta internacional de productos, la aplicación de la cual se excluye expresamente.</p>' +  
  '<h2>15. General</h2>' +  
  '<p>Estas Condiciones de servicio constituyen un acuerdo total entre usted y padelstat y rigen el uso que usted realice del Servicio. Asimismo, usted puede estar sujeto a términos y condiciones adicionales que pueden aplicarse cuando emplee servicios afiliados, contenido de terceros o software de terceros. En el supuesto de que cualquier parte de estas Condiciones de servicio fuese declarada inválida o inaplicable, dicha parte se interpretará de manera coherente con la legislación aplicable para reflejar, en la medida de lo posible, la intención original de las partes, permaneciendo el resto de las cláusulas plenamente vigentes y aplicables. Si padelstat no puede ejercer o aplicar algún derecho o provisión contenido en estas Condiciones de servicio, ello no constituirá exención de dicho derecho o disposición. Usted acepta que, salvo que se establezca expresamente de otra manera en estas Condiciones de servicio, no habrá terceros beneficiarios del presente Contrato. Las traducciones de estas Condiciones de servicio se otorgan con el fin de satisfacer las demandas de los usuarios locales y, en el caso de que surgiera algún conflicto entre la versión en lengua española y cualquiera de las versiones en el resto de idiomas, prevalecerá siempre la primera. Usted acepta que cualquier reclamación o demanda que surja en relación con estas Condiciones de servicio o con el uso del Servicio deberá presentarse en el plazo de un (1) año después de producirse la causa de dicha reclamación o demanda, pues de lo contrario prescribirá para siempre.</p>' +  
  '<p>Última revisión: 11 de Septiembre de 2013</p>' +   
  '<p>© Copyright 2013 padelstat. Todos los derechos reservados.</p>';


// JavaScript Document

var marcador = { 'sets': 0, 'juegos': 0, 'local': 0, 'visitante': 0, 'set_1': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_2': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_3': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_4': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_5': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 } };

function inicio_marcador(){

  marcador = { 'sets': 0, 'juegos': 0, 'local': 0, 'visitante': 0, 'set_1': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_2': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_3': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_4': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_5': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 } };

  $('#marcador .volver').attr('ir', origen_partido_seleccionado);

  db.transaction(function(tx){
    tx.executeSql('select * from partidos where id=?', [partido_seleccionado], function (tx, results) {
      
      var partido = results.rows.item(0);
      var fecha = partido.fecha.split('-'); 

      $('#marcador .fecha').html(fecha[2] + '/' + fecha[1] + '/' + fecha[0]);
      $('#marcador .hora').html(partido.hora);
      $('#marcador .lugar').html(partido.lugar);

      marcador.sets = parseInt(partido.sets);
      marcador.juegos = parseInt(partido.juegos);

      marcador.set_1.local = parseInt(partido.marcador_set1_local);
      marcador.set_1.visitante = parseInt(partido.marcador_set1_visitante);
      marcador.set_1.inicio.local = parseInt(partido.marcador_set1_local);
      marcador.set_1.inicio.visitante = parseInt(partido.marcador_set1_visitante);
      marcador.set_2.local = parseInt(partido.marcador_set2_local);
      marcador.set_2.visitante = parseInt(partido.marcador_set2_visitante);
      marcador.set_2.inicio.local = parseInt(partido.marcador_set3_local);
      marcador.set_2.inicio.visitante = parseInt(partido.marcador_set3_visitante);
      marcador.set_3.local = parseInt(partido.marcador_set3_local);
      marcador.set_3.visitante = parseInt(partido.marcador_set3_visitante);
      marcador.set_3.inicio.local = parseInt(partido.marcador_set3_local);
      marcador.set_3.inicio.visitante = parseInt(partido.marcador_set3_visitante);
      marcador.set_4.local = parseInt(partido.marcador_set4_local);
      marcador.set_4.visitante = parseInt(partido.marcador_set4_visitante);
      marcador.set_4.inicio.local = parseInt(partido.marcador_set4_local);
      marcador.set_4.inicio.visitante = parseInt(partido.marcador_set4_visitante);
      marcador.set_5.local = parseInt(partido.marcador_set5_local);
      marcador.set_5.visitante = parseInt(partido.marcador_set5_visitante);
      marcador.set_5.inicio.local = parseInt(partido.marcador_set5_local);
      marcador.set_5.inicio.visitante = parseInt(partido.marcador_set5_visitante);

      $('#marcador .set_1.local').html(marcador.set_1.local);
      $('#marcador .set_1.visitante').html(marcador.set_1.visitante);
      $('#marcador .set_2.local').html(marcador.set_2.local);
      $('#marcador .set_2.visitante').html(marcador.set_2.visitante);
      $('#marcador .set_3.local').html(marcador.set_3.local);
      $('#marcador .set_3.visitante').html(marcador.set_3.visitante);

      marcador_dibujar();
      if(marcador_valido(marcador)) $('.boton.subir, .boton.bajar').addClass('inactivo');

      $('#marcador .tipo').html(l['marcador'][partido.tipo]);
      $('#marcador .nota textarea').val(partido.observaciones);

      tx.executeSql('select id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_1], function(tx, results){
        var jugador = results.rows.item(0);
        $('#marcador .jugador_1').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
      });

      tx.executeSql('select id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_2], function(tx, results){
        var jugador = results.rows.item(0);
        $('#marcador .jugador_2').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
      });

      tx.executeSql('select id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_3], function(tx, results){
        var jugador = results.rows.item(0);
        $('#marcador .jugador_3').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
      });

      tx.executeSql('select id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_4], function(tx, results){
        var jugador = results.rows.item(0);
        $('#marcador .jugador_4').html(jugador.apellidos + ' ' + jugador.nombre.substr(0, 1) + '.');
      });

    });
  });

  $('.boton.subir').click(function(){ 
    switch($(this).attr('data-set')){
      case '1':
        switch($(this).attr('data-equipo')){
          case 'local': marcador.set_1.local++; break;
          case 'visitante': marcador.set_1.visitante++; break;
        }
      break;
      case '2':
        switch($(this).attr('data-equipo')){
          case 'local': marcador.set_2.local++; break;
          case 'visitante': marcador.set_2.visitante++; break;
        }
      break;
      case '3':
        switch($(this).attr('data-equipo')){
          case 'local': marcador.set_3.local++; break;
          case 'visitante': marcador.set_3.visitante++; break;
        }
      break;
    }
    marcador_dibujar();
  });

  $('.boton.bajar').click(function(){ 
    switch($(this).attr('data-set')){
      case '1':
        switch($(this).attr('data-equipo')){
          case 'local': marcador.set_1.local--; break;
          case 'visitante': marcador.set_1.visitante--; break;
        }
      break;
      case '2':
        switch($(this).attr('data-equipo')){
          case 'local': marcador.set_2.local--; break;
          case 'visitante': marcador.set_2.visitante--; break;
        }
      break;
      case '3':
        switch($(this).attr('data-equipo')){
          case 'local': marcador.set_3.local--; break;
          case 'visitante': marcador.set_3.visitante--; break;
        }
      break;
    }
    marcador_dibujar();
  });

  $('.registro').click(function(){
    if(!marcador_valido(marcador)) notificacion(l['marcador']['marcador_incorrecto']);
    else {
      $(this).addClass('inactivo');
      db.transaction(function(tx){
        var observaciones = $('#marcador .nota textarea').val();
        tx.executeSql('update partidos set marcador_local=?, marcador_visitante=?, marcador_set1_local=?, marcador_set1_visitante=?, marcador_set2_local=?, marcador_set2_visitante=?, marcador_set3_local=?, marcador_set3_visitante=?, observaciones=?, finalizado="si" where id=?', [marcador.local, marcador.visitante, marcador.set_1.local, marcador.set_1.visitante, marcador.set_2.local, marcador.set_2.visitante, marcador.set_3.local, marcador.set_3.visitante, observaciones, partido_seleccionado], 
          function (tx, results) { 
            ga_evento('partidos', 'registro marcador');
            sincronizar_partidos(true); 
            if(origen_partido_seleccionado == 'lista_partidos') mostrar_pagina('inicio'); 
            else mostrar_pagina(origen_partido_seleccionado); 
          },
          function (tx, error) { console.log(error); if(origen_partido_seleccionado == 'lista_partidos') mostrar_pagina('inicio'); else mostrar_pagina(origen_partido_seleccionado); }
        );
      });
    }
  });

  if(window.localStorage.getItem('ayuda_completar_marcador') == null){
    window.localStorage.setItem('ayuda_completar_marcador', 1);
    $('#marcador .overlay').show();
    $('#marcador .flash_ayuda').show();
    $('#marcador .flash_ayuda .cerrar').click(function(){ $('#marcador .flash_ayuda').hide(); $('#marcador .overlay').hide(); });
  }

}

function mostrado_marcador(){
  redimensionar_contenido('marcador');
}

function marcador_dibujar(){

  if(marcador.set_1.local < marcador.set_1.inicio.local) marcador.set_1.local = marcador.set_1.inicio.local;
  if(marcador.set_1.visitante < marcador.set_1.inicio.visitante) marcador.set_1.visitante = marcador.set_1.inicio.visitante;
  if(marcador.set_2.local < marcador.set_2.inicio.local) marcador.set_2.local = marcador.set_2.inicio.local;
  if(marcador.set_2.visitante < marcador.set_2.inicio.visitante) marcador.set_2.visitante = marcador.set_2.inicio.visitante;
  if(marcador.set_3.local < marcador.set_3.inicio.local) marcador.set_3.local = marcador.set_3.inicio.local;
  if(marcador.set_3.visitante < marcador.set_3.inicio.visitante) marcador.set_3.visitante = marcador.set_3.inicio.visitante;

  if(marcador.set_1.local > 7) marcador.set_1.local = 7;
  if(marcador.set_1.visitante > 7) marcador.set_1.visitante = 7;
  if(marcador.set_2.local > 7) marcador.set_2.local = 7;
  if(marcador.set_2.visitante > 7) marcador.set_2.visitante = 7;
  if(marcador.set_3.local > 7) marcador.set_3.local = 7;
  if(marcador.set_3.visitante > 7) marcador.set_3.visitante = 7;

  $('#marcador .marcador .set_1 .local .digito').html(marcador.set_1.local);
  $('#marcador .marcador .set_1 .visitante .digito').html(marcador.set_1.visitante);
  $('#marcador .marcador .set_2 .local .digito').html(marcador.set_2.local);
  $('#marcador .marcador .set_2 .visitante .digito').html(marcador.set_2.visitante);
  $('#marcador .marcador .set_3 .local .digito').html(marcador.set_3.local);
  $('#marcador .marcador .set_3 .visitante .digito').html(marcador.set_3.visitante);
}

function marcador_valido(m){

  m.local = 0;
  m.visitante = 0;

  if((m.set_1.local == (m.juegos + 1) && (m.set_1.visitante == m.juegos - 1 || m.set_1.visitante == m.juegos)) || (m.set_1.local == m.juegos && m.set_1.visitante < m.juegos - 1)) m.local++;
  if((m.set_1.visitante == (m.juegos + 1) && (m.set_1.local == m.juegos - 1 || m.set_1.local == m.juegos)) || (m.set_1.visitante == m.juegos && m.set_1.local < m.juegos - 1)) m.visitante++;
  if(m.local + m.visitante != 1){ return false; }

  if(m.sets == 1){
    if(m.set_2.local > 0 || m.set_2.visitante > 0 || m.set_3.local > 0 || m.set_3.visitante > 0 || m.set_4.local > 0 || m.set_4.visitante > 0 || m.set_5.local > 0 || m.set_5.visitante > 0){ return false; }
    return true;
  }

  if((m.set_2.local == (m.juegos + 1) && (m.set_2.visitante == m.juegos - 1 || m.set_2.visitante == m.juegos)) || (m.set_2.local == m.juegos && m.set_2.visitante < m.juegos - 1)) m.local++;
  if((m.set_2.visitante == (m.juegos + 1) && (m.set_2.local == m.juegos - 1 || m.set_2.local == m.juegos)) || (m.set_2.visitante == m.juegos && m.set_2.local < m.juegos - 1)) m.visitante++;
  if(m.local + m.visitante != 2){ return false; }

  if(m.sets == 3 && (m.local == 2 || m.visitante == 2)){
    if(m.set_3.local > 0 || m.set_3.visitante > 0 || m.set_4.local > 0 || m.set_4.visitante > 0 || m.set_5.local > 0 || m.set_5.visitante > 0){ return false; }
    return true; 
  }

  if((m.set_3.local == (m.juegos + 1) && (m.set_3.visitante == m.juegos - 1 || m.set_3.visitante == m.juegos)) || (m.set_3.local == m.juegos && m.set_3.visitante < m.juegos - 1)) m.local++;
  if((m.set_3.visitante == (m.juegos + 1) && (m.set_3.local == m.juegos - 1 || m.set_3.local == m.juegos)) || (m.set_3.visitante == m.juegos && m.set_3.local < m.juegos - 1)) m.visitante++;
  if(m.local + m.visitante != 3){ return false; }

  if((m.sets == 3 && (m.local == 2 || m.visitante == 2)) || (m.sets == 5 && (m.local == 3 || m.visitante == 3))){
    if(m.set_4.local > 0 || m.set_4.visitante > 0 || m.set_5.local > 0 || m.set_5.visitante > 0){ return false; }
    return true;  
  }

  if((m.set_4.local == (m.juegos + 1) && (m.set_4.visitante == m.juegos - 1 || m.set_4.visitante == m.juegos)) || (m.set_4.local == m.juegos && m.set_4.visitante < m.juegos - 1)) m.local++;
  if((m.set_4.visitante == (m.juegos + 1) && (m.set_4.local == m.juegos - 1 || m.set_4.local == m.juegos)) || (m.set_4.visitante == m.juegos && m.set_4.local < m.juegos - 1)) m.visitante++;
  if(m.local + m.visitante != 4){ return false; }

  if(m.sets == 5 && (m.local == 3 || m.visitante == 3)){
    if(m.set_5.local > 0 || m.set_5.visitante > 0){ return false; }
    return true; 
  }  

  if((m.set_5.local == (m.juegos + 1) && (m.set_5.visitante == m.juegos - 1 || m.set_5.visitante == m.juegos)) || (m.set_5.local == m.juegos && m.set_5.visitante < m.juegos - 1)) m.local++;
  if((m.set_5.visitante == (m.juegos + 1) && (m.set_5.local == m.juegos - 1 || m.set_5.local == m.juegos)) || (m.set_5.visitante == m.juegos && m.set_5.local < m.juegos - 1)) m.visitante++;
  if(m.local + m.visitante != 4){ return false; }

  if(m.sets == 5 && (m.local == 3 || m.visitante == 3)){
    return true; 
  }  

  return false;

}

// codificación utf8

l['marcador'] = {};

l['marcador']['titulo'] = 'Completar marcador';

l['marcador']['entrenamiento'] = 'Training';
l['marcador']['amistoso'] = 'Amistoso';
l['marcador']['torneo'] = 'Torneo';

l['marcador']['set_1'] = 'Set 1';
l['marcador']['set_2'] = 'Set 2';
l['marcador']['set_3'] = 'Set 3';

l['marcador']['nota'] = 'Nota';

l['marcador']['marcador_incorrecto'] = 'El marcador del partido no es correcto';


// JavaScript Document

var i_ficha = 0;
var fichas = ['resumen', 'golpes_1_jugador_1', 'golpes_2_jugador_1', 'golpes_1_jugador_2', 'golpes_2_jugador_2', 'golpes_1_jugador_3', 'golpes_2_jugador_3', 'golpes_1_jugador_4', 'golpes_2_jugador_4', 'notas'];

function inicio_analisis_numerico_1p(){

  $('.boton.grafico').click(function(){ mostrar_pagina('analisis_grafico_1p'); });
  $('.boton.numerico, .linea .porcentaje').hide();
  $('.boton.porcentaje, .boton.numerico').click(function(){
    $('.boton.porcentaje, .boton.numerico').toggle();
    $('.linea .porcentaje, .linea .numerico').toggle();
  });
  $('.boton.compartir').click(function(){ compartir_pantalla(); });

  $('.volver').attr('ir', origen_partido_seleccionado);

  i_ficha = 0;
  fichas = ['resumen', 'golpes_1_jugador_1', 'golpes_2_jugador_1', 'golpes_1_jugador_2', 'golpes_2_jugador_2', 'golpes_1_jugador_3', 'golpes_2_jugador_3', 'golpes_1_jugador_4', 'golpes_2_jugador_4', 'notas'];

  var licencia = window.localStorage.getItem('usuario_licencia');
  if(licencia == 'free' || licencia == 'basic'){
    fichas.remove('golpes_1_jugador_1');
    fichas.remove('golpes_1_jugador_2');
    fichas.remove('golpes_1_jugador_3');
    fichas.remove('golpes_1_jugador_4');
    fichas.remove('golpes_2_jugador_1');
    fichas.remove('golpes_2_jugador_2');
    fichas.remove('golpes_2_jugador_3');
    fichas.remove('golpes_2_jugador_4');
  }

  db.transaction(function(tx){
    tx.executeSql('select * from partidos where id=?', [partido_seleccionado], function(tx, results){
      
      var partido = results.rows.item(0);      

      var fecha = partido.fecha.split('-'); 
      $('.partido .fecha').html(fecha[2] + '/' + fecha[1] + '/' + fecha[0]);
      $('.partido .hora').html(partido.hora);
      $('.partido .lugar').html(partido.lugar);
      $('.partido .set_1.local').html(partido.marcador_set1_local);
      $('.partido .set_1.visitante').html(partido.marcador_set1_visitante);
      $('.partido .set_2.local').html(partido.marcador_set2_local);
      $('.partido .set_2.visitante').html(partido.marcador_set2_visitante);
      $('.partido .set_3.local').html(partido.marcador_set3_local);
      $('.partido .set_3.visitante').html(partido.marcador_set3_visitante);
      $('.partido .tipo').html(l['lista_partidos_analisis'][partido.tipo]);

      if(partido.coeficiente_1 != 0) $('.coeficiente_ps .jugador_1').html(partido.coeficiente_1); else $('.coeficiente_ps .jugador_1').html('-');
      if(partido.coeficiente_2 != 0) $('.coeficiente_ps .jugador_2').html(partido.coeficiente_2); else $('.coeficiente_ps .jugador_2').html('-');
      if(partido.coeficiente_3 != 0) $('.coeficiente_ps .jugador_3').html(partido.coeficiente_3); else $('.coeficiente_ps .jugador_3').html('-');
      if(partido.coeficiente_4 != 0) $('.coeficiente_ps .jugador_4').html(partido.coeficiente_4); else $('.coeficiente_ps .jugador_4').html('-');

      var total_juegos = parseInt(partido.marcador_set1_local) + parseInt(partido.marcador_set1_visitante) + parseInt(partido.marcador_set2_local) + parseInt(partido.marcador_set2_visitante) + parseInt(partido.marcador_set3_local) + parseInt(partido.marcador_set3_visitante) + parseInt(partido.marcador_set4_local) + parseInt(partido.marcador_set4_visitante) + parseInt(partido.marcador_set5_local) + parseInt(partido.marcador_set5_visitante);
      if(total_juegos > 0){
        tx.executeSql('select distinct id_partido, n_set, n_juego, ? as total_juegos from acciones where id_partido=? and id>0', [total_juegos, partido.id], function(tx, results){
          if(results.rows.length > 0){
            var porcentaje = Math.round(results.rows.length * 100 / parseInt(results.rows.item(0).total_juegos));
            if(porcentaje > 100) porcentaje = 100;
            $('.juegos_registrados').html(porcentaje + "%");
          }
        });
      }

      tx.executeSql('select count(*) as acciones from acciones where id>0 and accion!="" and id_partido=? and not (accion!="pg" and golpe="saque_1")', [partido.id], function(tx, results){
        $('.puntos_totales').html(results.rows.item(0).acciones);
      });

      tx.executeSql('select nombre, apellidos from jugadores where id=?', [partido.id_jugador_1], function(tx, results){
        var jugador = results.rows.item(0).apellidos + ' ' + results.rows.item(0).nombre.substr(0, 1) + '.';
        $('.partido .jugador.jugador_1, .titulos .jugador.jugador_1, h2 .jugador_1').html(jugador);
      });

      tx.executeSql('select nombre, apellidos from jugadores where id=?', [partido.id_jugador_2], function(tx, results){
        var jugador = results.rows.item(0).apellidos + ' ' + results.rows.item(0).nombre.substr(0, 1) + '.';
        $('.partido .jugador.jugador_2, .titulos .jugador.jugador_2, h2 .jugador_2').html(jugador);
      });

      tx.executeSql('select nombre, apellidos from jugadores where id=?', [partido.id_jugador_3], function(tx, results){
        var jugador = results.rows.item(0).apellidos + ' ' + results.rows.item(0).nombre.substr(0, 1) + '.';
        $('.partido .jugador.jugador_3, .titulos .jugador.jugador_3, h2 .jugador_3').html(jugador);
      });

      tx.executeSql('select id, nombre, apellidos from jugadores where id=?', [partido.id_jugador_4], function(tx, results){
        var jugador = results.rows.item(0).apellidos + ' ' + results.rows.item(0).nombre.substr(0, 1) + '.';
        $('.partido .jugador.jugador_4, .titulos .jugador.jugador_4, h2 .jugador_4').html(jugador);
      });

      // resumen acciones

      var acciones = ['enf', 'ef', 'pg'];
      for(var a=0; a<acciones.length; a++){
        
        var accion = acciones[a];

        var sql = "select '" + accion + "' as accion, ";
        sql += "(select count(*) from acciones where id_partido=? and id_jugador=? and accion='" + accion + "' and not (accion!='pg' and golpe='saque_1')) as j1, ";
        sql += "(select count(*) from acciones where id_partido=? and id_jugador=? and accion='" + accion + "' and not (accion!='pg' and golpe='saque_1')) as j2, ";
        sql += "(select count(*) from acciones where id_partido=? and id_jugador=? and accion='" + accion + "' and not (accion!='pg' and golpe='saque_1')) as j3, ";
        sql += "(select count(*) from acciones where id_partido=? and id_jugador=? and accion='" + accion + "' and not (accion!='pg' and golpe='saque_1')) as j4, ";
        sql += "(select count(*) from acciones where id_partido=? and accion='" + accion + "' and not (accion!='pg' and golpe='saque_1')) as total, ";
        sql += "(select count(*) from acciones where id_partido=? and (accion='pg' or accion='ef' or accion='enf') and not (accion!='pg' and golpe='saque_1')) as total_acciones";

        tx.executeSql(sql, [partido.id, partido.id_jugador_1, partido.id, partido.id_jugador_2, partido.id, partido.id_jugador_3, partido.id, partido.id_jugador_4, partido.id, partido.id], function(tx, results){
          
          var accion = results.rows.item(0);
          if(parseInt(accion.j1) > 0) $('.resumen .' + accion.accion + ' .jugador_1.numerico').html(accion.j1); else $('.resumen .' + accion.accion + ' .jugador_1.numerico').html('-');
          if(parseInt(accion.j2) > 0) $('.resumen .' + accion.accion + ' .jugador_2.numerico').html(accion.j2); else $('.resumen .' + accion.accion + ' .jugador_2.numerico').html('-');
          if(parseInt(accion.j3) > 0) $('.resumen .' + accion.accion + ' .jugador_3.numerico').html(accion.j3); else $('.resumen .' + accion.accion + ' .jugador_3.numerico').html('-');
          if(parseInt(accion.j4) > 0) $('.resumen .' + accion.accion + ' .jugador_4.numerico').html(accion.j4); else $('.resumen .' + accion.accion + ' .jugador_4.numerico').html('-');
          if(parseInt(accion.total) > 0) $('.resumen .' + accion.accion + ' .sumatorio.numerico').html(accion.total); else $('.resumen .' + accion.accion + ' .sumatorio.numerico').html('-');

          var porcentaje_j1 = 0; 
          var porcentaje_j2 = 0; 
          var porcentaje_j3 = 0; 
          var porcentaje_j4 = 0; 
          var porcentaje_total = 0; 

          if(parseInt(accion.total_acciones) > 0){
            porcentaje_j1 = Math.round(parseInt(accion.j1) * 100 / parseInt(accion.total_acciones));
            porcentaje_j2 = Math.round(parseInt(accion.j2) * 100 / parseInt(accion.total_acciones));
            porcentaje_j3 = Math.round(parseInt(accion.j3) * 100 / parseInt(accion.total_acciones));
            porcentaje_j4 = Math.round(parseInt(accion.j4) * 100 / parseInt(accion.total_acciones));
            porcentaje_total = Math.round(parseInt(accion.total) * 100 / parseInt(accion.total_acciones));
          }

          if(porcentaje_j1 > 0) $('.resumen .' + accion.accion + ' .jugador_1.porcentaje').html(porcentaje_j1 + "%"); else $('.resumen .' + accion.accion + ' .jugador_1.porcentaje').html('-');
          if(porcentaje_j2 > 0) $('.resumen .' + accion.accion + ' .jugador_2.porcentaje').html(porcentaje_j2 + "%"); else $('.resumen .' + accion.accion + ' .jugador_2.porcentaje').html('-');
          if(porcentaje_j3 > 0) $('.resumen .' + accion.accion + ' .jugador_3.porcentaje').html(porcentaje_j3 + "%"); else $('.resumen .' + accion.accion + ' .jugador_3.porcentaje').html('-');
          if(porcentaje_j4 > 0) $('.resumen .' + accion.accion + ' .jugador_4.porcentaje').html(porcentaje_j4 + "%"); else $('.resumen .' + accion.accion + ' .jugador_4.porcentaje').html('-');
          if(accion.total > 0) $('.resumen .' + accion.accion + ' .sumatorio.porcentaje').html(porcentaje_total + "%"); else $('.resumen .' + accion.accion + ' .sumatorio.porcentaje').html('-');          

        });
      }

      // saques

      var sql = "select ";
      for(var i=1; i<=4; i++){
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and saque=" + i + " and (accion='pg' or accion='ef' or accion='enf')) as acciones_j" + i + ", ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and n_jugador=" + i + " and golpe!='') as golpes_j" + i + ", ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and saque=" + i + " and (accion='enf' or accion='ef') and golpe='saque_1' and n_jugador=" + i + ") as fallos_saque_1_j" + i + ", ";
        sql += "(select count(*) from acciones where id_partido='" + partido.id + "' and saque=" + i + " and (accion='enf' or accion='ef') and golpe='saque_2' and n_jugador=" + i + ") as fallos_saque_2_j" + i + ", ";
      }
      sql += "0 as dummy";

      tx.executeSql(sql, [], function(tx, results){
        var r = results.rows.item(0);

        for(var i=1; i<=4; i++){

          if(parseInt(r['golpes_j' + i]) > 0){
            $('.resumen .saque_1 .numerico.jugador_' + i).html((parseInt(r['acciones_j' + i]) - parseInt(r['fallos_saque_1_j' + i]) - parseInt(r['fallos_saque_1_j' + i])) + '/' + (parseInt(r['acciones_j' + i]) - parseInt(r['fallos_saque_1_j' + i])));
            $('.resumen .saque_2 .numerico.jugador_' + i).html((parseInt(r['fallos_saque_1_j' + i]) - parseInt(r['fallos_saque_2_j' + i])) + '/' + parseInt(r['fallos_saque_1_j' + i]));
            $('.resumen .saque_1 .porcentaje.jugador_' + i).html(Math.round((parseInt(r['acciones_j' + i]) - parseInt(r['fallos_saque_1_j' + i]) - parseInt(r['fallos_saque_1_j' + i])) * 100 / (parseInt(r['acciones_j' + i]) - parseInt(r['fallos_saque_1_j' + i]))) + '%');
            $('.resumen .saque_2 .porcentaje.jugador_' + i).html(Math.round((parseInt(r['fallos_saque_1_j' + i]) - parseInt(r['fallos_saque_2_j' + i])) * 100 / parseInt(r['fallos_saque_1_j' + i])) + '%');
            if($('.resumen .saque_1 .porcentaje.jugador_' + i).html() == 'NaN%') $('.resumen .saque_1 .porcentaje.jugador_' + i).html('0%');
            if($('.resumen .saque_2 .porcentaje.jugador_' + i).html() == 'NaN%') $('.resumen .saque_2 .porcentaje.jugador_' + i).html('0%');
          } else {
            $('.resumen .saque_1 .jugador_' + i).html('-');
            $('.resumen .saque_2 .jugador_' + i).html('-');
          }

        }

      });

      // breaks
      
      var sql = "select id, saque, n_set, n_juego, marcador_juego_local, marcador_juego_visitante, variacion_local, variacion_visitante from acciones where id_partido='" + partido.id + "' group by n_set, n_juego having id=max(id) order by n_set, n_juego";
      tx.executeSql(sql, [], function(tx, results){

        var breaks = {'jugador_1': [0, 0], 'jugador_2': [0, 0], 'jugador_3': [0, 0], 'jugador_4': [0, 0]};

        for(var i=0; i<results.rows.length; i++){
          var a = results.rows.item(i);
          var tiebreak = (parseInt(a.n_juego) > partido.juegos * 2);
          var marcador_local = parseInt(a.marcador_juego_local) + parseInt(a.variacion_local);
          var marcador_visitante = parseInt(a.marcador_juego_visitante) + parseInt(a.variacion_visitante);
          var gana_local = (marcador_local >= partido.puntos && marcador_local - marcador_visitante >= 2);
          var gana_visitante = (marcador_visitante >= partido.puntos && marcador_visitante - marcador_local >= 2);
          if(!tiebreak){
            if(a.saque > 0){
              breaks['jugador_' + a.saque][1]++;
              if(gana_local || gana_visitante){
                if((parseInt(a.saque) == 1 || parseInt(a.saque) == 2) && marcador_visitante > marcador_local) breaks['jugador_' + a.saque][0]++;
                if((parseInt(a.saque) == 3 || parseInt(a.saque) == 4) && marcador_local > marcador_visitante) breaks['jugador_' + a.saque][0]++;
              }
            }
          }
        }

        $('.resumen .breaks .numerico.jugador_1').html(parseInt(breaks.jugador_1[0]) + '/' + parseInt(breaks.jugador_1[1]));
        $('.resumen .breaks .numerico.jugador_2').html(parseInt(breaks.jugador_2[0]) + '/' + parseInt(breaks.jugador_2[1]));
        $('.resumen .breaks .numerico.jugador_3').html(parseInt(breaks.jugador_3[0]) + '/' + parseInt(breaks.jugador_3[1]));
        $('.resumen .breaks .numerico.jugador_4').html(parseInt(breaks.jugador_4[0]) + '/' + parseInt(breaks.jugador_4[1]));

        if(parseInt(breaks.jugador_1[1]) > 0) $('.resumen .breaks .porcentaje.jugador_1').html(Math.floor(parseInt(breaks.jugador_1[0]) * 100 / parseInt(breaks.jugador_1[1])) + '%'); else $('.resumen .breaks .porcentaje.jugador_1').html('0%'); 
        if(parseInt(breaks.jugador_2[1]) > 0) $('.resumen .breaks .porcentaje.jugador_2').html(Math.floor(parseInt(breaks.jugador_2[0]) * 100 / parseInt(breaks.jugador_2[1])) + '%'); else $('.resumen .breaks .porcentaje.jugador_2').html('0%'); 
        if(parseInt(breaks.jugador_3[1]) > 0) $('.resumen .breaks .porcentaje.jugador_3').html(Math.floor(parseInt(breaks.jugador_3[0]) * 100 / parseInt(breaks.jugador_3[1])) + '%'); else $('.resumen .breaks .porcentaje.jugador_3').html('0%'); 
        if(parseInt(breaks.jugador_4[1]) > 0) $('.resumen .breaks .porcentaje.jugador_4').html(Math.floor(parseInt(breaks.jugador_4[0]) * 100 / parseInt(breaks.jugador_4[1])) + '%'); else $('.resumen .breaks .porcentaje.jugador_4').html('0%'); 

      });

      tx.executeSql('select count(*) as acciones from acciones where id_partido=? and id_jugador=? and golpe!=""', [partido.id, partido.id_jugador_1], function(tx, results){
        if(parseInt(results.rows.item(0).acciones) == 0){
          fichas.remove('golpes_1_jugador_1');
          fichas.remove('golpes_2_jugador_1');
        } else analisis_numerico_1p_jugador(1, partido.id_jugador_1, partido);
      });

      tx.executeSql('select count(*) as acciones from acciones where id_partido=? and id_jugador=? and golpe!=""', [partido.id, partido.id_jugador_2], function(tx, results){
        if(parseInt(results.rows.item(0).acciones) == 0){
          fichas.remove('golpes_1_jugador_2');
          fichas.remove('golpes_2_jugador_2');
        } else analisis_numerico_1p_jugador(2, partido.id_jugador_2, partido);
      });

      tx.executeSql('select count(*) as acciones from acciones where id_partido=? and id_jugador=? and golpe!=""', [partido.id, partido.id_jugador_3], function(tx, results){
        if(parseInt(results.rows.item(0).acciones) == 0){
          fichas.remove('golpes_1_jugador_3');
          fichas.remove('golpes_2_jugador_3');
        } else analisis_numerico_1p_jugador(3, partido.id_jugador_3, partido);
      });

      tx.executeSql('select count(*) as acciones from acciones where id_partido=? and id_jugador=? and golpe!=""', [partido.id, partido.id_jugador_4], function(tx, results){
        if(parseInt(results.rows.item(0).acciones) == 0){
          fichas.remove('golpes_1_jugador_4');
          fichas.remove('golpes_2_jugador_4');
        } else analisis_numerico_1p_jugador(4, partido.id_jugador_4, partido);
      });

      if(partido.observaciones != '') $('.notas textarea').val(partido.observaciones);
      else fichas.remove('notas');

    });
  });

  if($('#' + partido_seleccionado).attr('acciones') == '0'){
    
    fichas = ['notas'];
    $('.juegos_registrados').html("0%");
    $('.puntos_totales').html("0");
    $('.pie .boton.porcentaje, .pie .boton.grafico').hide();
    
    $('.ficha').hide();
    $('.ficha.notas').show();  

  } else {

    $('.mover.izquierda').click(function(){ 
      i_ficha--; if(i_ficha < 0) i_ficha = fichas.length - 1;
      $('.ficha').hide();
      $('.ficha.' + fichas[i_ficha]).show();
    });

    $('.mover.derecha').click(function(){ 
      i_ficha++; if(i_ficha >= fichas.length) i_ficha = 0;
      $('.ficha').hide();
      $('.ficha.' + fichas[i_ficha]).show();
    });

    $('.ficha').hide();
    $('.ficha.resumen').show();  

  }

  $('.ayuda').click(function(){ 
    var ayuda = window.localStorage.getItem('ayuda');
    if(ayuda != 'guia_rapida' && ayuda != 'ayuda_completa'){
      ayuda = 'guia_rapida';
      window.localStorage.setItem('ayuda', 'guia_rapida');
    }
    switch(ayuda){
      case 'guia_rapida':
        $('.popup_ayuda .guia_rapida').show();
        $('.popup_ayuda .ayuda_completa').hide();
      break;
      case 'ayuda_completa':
        $('.popup_ayuda .guia_rapida').hide();
        $('.popup_ayuda .ayuda_completa').show();
      break;
    }
    popup('.popup_ayuda'); 
  });
  $('.popup_ayuda .cambio_ayuda').click(function(){
    var ayuda = window.localStorage.getItem('ayuda');
    if(ayuda != 'guia_rapida' && ayuda != 'ayuda_completa'){
      ayuda = 'guia_rapida';
      window.localStorage.setItem('ayuda', 'guia_rapida');
    }
    switch(ayuda){
      case 'guia_rapida': ayuda = 'ayuda_completa'; break;
      case 'ayuda_completa': ayuda = 'guia_rapida'; break;
    }
    window.localStorage.setItem('ayuda', ayuda);
    $('.popup_ayuda .guia_rapida, .popup_ayuda .ayuda_completa').toggle();
  });

  if(window.localStorage.getItem('ayuda_analisis_numerico') == null){
    window.localStorage.setItem('ayuda_analisis_numerico', 1);
    $('#analisis_numerico_1p .overlay').show();
    $('#analisis_numerico_1p .flash_ayuda').show();
    $('#analisis_numerico_1p .flash_ayuda .cerrar').click(function(){ $('#analisis_numerico_1p .flash_ayuda').hide(); $('#analisis_numerico_1p .overlay').hide(); });
  }

}

function mostrado_analisis_numerico_1p(){
  redimensionar_contenido('analisis_numerico_1p');
  ga_evento('estadisticas', 'partido');
}

function analisis_numerico_1p_jugador(n_jugador, id_jugador, partido){

  db.transaction(function(tx){

    var golpes = ['servicio', 'resto', 'bote_p', 'directo', 'volea', 'bandeja', 's_pared', 'smash', 'globo'];
    for(var g=0; g<golpes.length; g++){

      var golpe = golpes[g];
      var sql = "select '" + golpe + "' as golpe, ";

      if(golpe == 'servicio') golpe = "saque_1' or golpe='saque_2"; // truco para aunar saques en una sola linea

      sql += "(select count(*) from acciones where id_partido=? and id_jugador=? and accion='enf' and (golpe='" + golpe + "') and not (accion!='pg' and golpe='saque_1')) as enf, ";
      sql += "(select count(*) from acciones where id_partido=? and id_jugador=? and accion='ef' and (golpe='" + golpe + "') and not (accion!='pg' and golpe='saque_1')) as ef, ";
      sql += "(select count(*) from acciones where id_partido=? and id_jugador=? and accion='pg' and (golpe='" + golpe + "') and not (accion!='pg' and golpe='saque_1')) as pg, ";
      sql += "(select count(*) from acciones where id_partido=? and accion='enf' and not (accion!='pg' and golpe='saque_1')) as total_enf, ";
      sql += "(select count(*) from acciones where id_partido=? and accion='ef' and not (accion!='pg' and golpe='saque_1')) as total_ef, ";
      sql += "(select count(*) from acciones where id_partido=? and accion='pg' and not (accion!='pg' and golpe='saque_1')) as total_pg";

      /*
      console.log('');
      console.log('jugador:' + id_jugador);
      console.log('partido:' + partido.id);
      console.log(sql);
      */

      tx.executeSql(sql, [partido.id, id_jugador, partido.id, id_jugador, partido.id, id_jugador, partido.id, partido.id, partido.id], function(tx, results){
        
        var golpe = results.rows.item(0);
        var total = parseInt(golpe.enf) + parseInt(golpe.ef) + parseInt(golpe.pg);
        var total_acciones = parseInt(golpe.total_enf) + parseInt(golpe.total_ef) + parseInt(golpe.total_pg);
        
        if(parseInt(golpe.enf) > 0) $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .enf.numerico').html(golpe.enf); else $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .enf.numerico').html('-');
        if(parseInt(golpe.ef) > 0) $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .ef.numerico').html(golpe.ef); else $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .ef.numerico').html('-');
        if(parseInt(golpe.pg) > 0) $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .pg.numerico').html(golpe.pg); else $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .pg.numerico').html('-');
        if(total > 0) $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .sumatorio.numerico').html(total); else $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .sumatorio.numerico').html('-');

        var porcentaje_enf = 0;
        var porcentaje_ef = 0;
        var porcentaje_pg = 0;
        var porcentaje_total = 0;

        if(total_acciones > 0){
          porcentaje_enf = Math.round(parseInt(golpe.enf) * 100 / total_acciones);
          porcentaje_ef = Math.round(parseInt(golpe.ef) * 100 / total_acciones);
          porcentaje_pg = Math.round(parseInt(golpe.pg) * 100 / total_acciones);
          porcentaje_total = Math.round(total * 100 / total_acciones);
        }

        if(porcentaje_enf > 0) $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .enf.porcentaje').html(porcentaje_enf + '%'); else $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .enf.porcentaje').html('-');
        if(porcentaje_ef > 0) $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .ef.porcentaje').html(porcentaje_ef + '%'); else $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .ef.porcentaje').html('-');
        if(porcentaje_pg > 0) $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .pg.porcentaje').html(porcentaje_pg + '%'); else $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .pg.porcentaje').html('-');
        if(porcentaje_total > 0) $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .sumatorio.porcentaje').html(porcentaje_total + '%'); else $('.golpes_1_jugador_' + n_jugador + ' .' + golpe.golpe + ' .sumatorio.porcentaje').html('-');        

      });

    }

    var manos = ['drive', 'reves'];
    for(var m=0; m<manos.length; m++){

      var mano = manos[m];
      var sql = "select '" + mano + "' as mano, ";

      sql += "(select count(*) from acciones where id_partido=? and id_jugador=? and accion='enf' and mano='" + mano + "' and not (accion!='pg' and golpe='saque_1')) as enf, ";
      sql += "(select count(*) from acciones where id_partido=? and id_jugador=? and accion='ef' and mano='" + mano + "' and not (accion!='pg' and golpe='saque_1')) as ef, ";
      sql += "(select count(*) from acciones where id_partido=? and id_jugador=? and accion='pg' and mano='" + mano + "' and not (accion!='pg' and golpe='saque_1')) as pg, ";
      sql += "(select count(*) from acciones where id_partido=? and accion='enf' and not (accion!='pg' and golpe='saque_1')) as total_enf, ";
      sql += "(select count(*) from acciones where id_partido=? and accion='ef' and not (accion!='pg' and golpe='saque_1')) as total_ef, ";
      sql += "(select count(*) from acciones where id_partido=? and accion='pg' and not (accion!='pg' and golpe='saque_1')) as total_pg";

      tx.executeSql(sql, [partido.id, id_jugador, partido.id, id_jugador, partido.id, id_jugador, partido.id, partido.id, partido.id], function(tx, results){
        
        var mano = results.rows.item(0);
        var total = parseInt(mano.enf) + parseInt(mano.ef) + parseInt(mano.pg);
        var total_acciones = parseInt(mano.total_enf) + parseInt(mano.total_ef) + parseInt(mano.total_pg);

        if(parseInt(mano.enf) > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .enf.numerico').html(mano.enf); else $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .enf.numerico').html('-');
        if(parseInt(mano.ef) > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .ef.numerico').html(mano.ef); else $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .ef.numerico').html('-');
        if(parseInt(mano.pg) > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .pg.numerico').html(mano.pg); else $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .pg.numerico').html('-');
        if(total > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .sumatorio.numerico').html(total); else $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .sumatorio.numerico').html('-');

        var porcentaje_enf = 0;
        var porcentaje_ef = 0;
        var porcentaje_pg = 0;
        var porcentaje_total = 0;

        if(total_acciones > 0){
          porcentaje_enf = Math.round(parseInt(mano.enf) * 100 / total_acciones);
          porcentaje_ef = Math.round(parseInt(mano.ef) * 100 / total_acciones);
          porcentaje_pg = Math.round(parseInt(mano.pg) * 100 / total_acciones);
          porcentaje_total = Math.round(total * 100 / total_acciones);
        }

        if(porcentaje_enf > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .enf.porcentaje').html(porcentaje_enf + '%'); else $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .enf.porcentaje').html('-');
        if(porcentaje_ef > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .ef.porcentaje').html(porcentaje_ef + '%'); else $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .ef.porcentaje').html('-');
        if(porcentaje_pg > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .pg.porcentaje').html(porcentaje_pg + '%'); else $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .pg.porcentaje').html('-');
        if(porcentaje_total > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .sumatorio.porcentaje').html(porcentaje_total + '%'); else $('.golpes_2_jugador_' + n_jugador + ' .' + mano.mano + ' .sumatorio.porcentaje').html('-');        

      });

    }

    var dondes = ['fondo', 'pantano', 'red'];
    for(var d=0; d<dondes.length; d++){

      var donde = dondes[d];
      var sql = "select '" + donde + "' as donde, ";

      sql += "(select count(*) from acciones where id_partido=? and id_jugador=? and accion='enf' and donde='" + donde + "' and not (accion!='pg' and golpe='saque_1')) as enf, ";
      sql += "(select count(*) from acciones where id_partido=? and id_jugador=? and accion='ef' and donde='" + donde + "' and not (accion!='pg' and golpe='saque_1')) as ef, ";
      sql += "(select count(*) from acciones where id_partido=? and id_jugador=? and accion='pg' and donde='" + donde + "' and not (accion!='pg' and golpe='saque_1')) as pg, ";
      sql += "(select count(*) from acciones where id_partido=? and accion='enf' and not (accion!='pg' and golpe='saque_1')) as total_enf, ";
      sql += "(select count(*) from acciones where id_partido=? and accion='ef' and not (accion!='pg' and golpe='saque_1')) as total_ef, ";
      sql += "(select count(*) from acciones where id_partido=? and accion='pg' and not (accion!='pg' and golpe='saque_1')) as total_pg";

      tx.executeSql(sql, [partido.id, id_jugador, partido.id, id_jugador, partido.id, id_jugador, partido.id, partido.id, partido.id], function(tx, results){
        
        var donde = results.rows.item(0);
        var total = parseInt(donde.enf) + parseInt(donde.ef) + parseInt(donde.pg);
        var total_acciones = parseInt(donde.total_enf) + parseInt(donde.total_ef) + parseInt(donde.total_pg);

        if(parseInt(donde.enf) > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .enf.numerico').html(donde.enf); else $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .enf.numerico').html('-');
        if(parseInt(donde.ef) > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .ef.numerico').html(donde.ef); else $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .ef.numerico').html('-');
        if(parseInt(donde.pg) > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .pg.numerico').html(donde.pg); else $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .pg.numerico').html('-');
        if(total > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .sumatorio.numerico').html(total); else $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .sumatorio.numerico').html('-');

        var porcentaje_enf = 0;
        var porcentaje_ef = 0;
        var porcentaje_pg = 0;
        var porcentaje_total = 0;

        if(total_acciones > 0){
          porcentaje_enf = Math.round(parseInt(donde.enf) * 100 / total_acciones);
          porcentaje_ef = Math.round(parseInt(donde.ef) * 100 / total_acciones);
          porcentaje_pg = Math.round(parseInt(donde.pg) * 100 / total_acciones);
          porcentaje_total = Math.round(total * 100 / total_acciones);
        }

        if(porcentaje_enf > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .enf.porcentaje').html(porcentaje_enf + '%'); else $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .enf.porcentaje').html('-');
        if(porcentaje_ef > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .ef.porcentaje').html(porcentaje_ef + '%'); else $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .ef.porcentaje').html('-');
        if(porcentaje_pg > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .pg.porcentaje').html(porcentaje_pg + '%'); else $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .pg.porcentaje').html('-');
        if(porcentaje_total > 0) $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .sumatorio.porcentaje').html(porcentaje_total + '%'); else $('.golpes_2_jugador_' + n_jugador + ' .' + donde.donde + ' .sumatorio.porcentaje').html('-');        

      });

    }

  });

}


// codificación utf8

l['analisis_numerico_1p'] = {};

l['analisis_numerico_1p']['titulo'] = 'Análisis Numérico';

l['analisis_numerico_1p']['juegos_registrados'] = 'Juegos Registrados';
l['analisis_numerico_1p']['puntos_totales'] = 'Puntos Totales Registrados';
l['analisis_numerico_1p']['resumen_partido'] = 'Resumen del Partido';
l['analisis_numerico_1p']['analisis_golpes'] = 'Análisis de Golpes';
l['analisis_numerico_1p']['notas'] = 'Notas';

l['analisis_numerico_1p']['enf'] = 'ENF';
l['analisis_numerico_1p']['ef'] = 'EF';
l['analisis_numerico_1p']['pg'] = 'PG';

l['analisis_numerico_1p']['saque_1'] = '1s';
l['analisis_numerico_1p']['saque_2'] = '2s';
l['analisis_numerico_1p']['breaks'] = 'Breaks';

l['analisis_numerico_1p']['coeficiente_ps'] = 'Coef ps';

l['analisis_numerico_1p']['err_no_forzado'] = 'Err. No Forzado';
l['analisis_numerico_1p']['err_forzado'] = 'Error Forzado';
l['analisis_numerico_1p']['punto_ganado'] = 'Punto Ganado';

l['analisis_numerico_1p']['servicio'] = 'Servicio';
l['analisis_numerico_1p']['resto'] = 'Resto';
l['analisis_numerico_1p']['bote_p'] = 'Bote P.';
l['analisis_numerico_1p']['directo'] = 'Directo';
l['analisis_numerico_1p']['volea'] = 'Volea';
l['analisis_numerico_1p']['bandeja'] = 'Bandeja';
l['analisis_numerico_1p']['s_pared'] = 'S.Pared';
l['analisis_numerico_1p']['smash'] = 'Smash';
l['analisis_numerico_1p']['globo'] = 'Globo';

l['analisis_numerico_1p']['drive'] = 'Drive';
l['analisis_numerico_1p']['reves'] = 'Revés';

l['analisis_numerico_1p']['fondo'] = 'Fondo';
l['analisis_numerico_1p']['pantano'] = 'Pantano';
l['analisis_numerico_1p']['red'] = 'Red';



// JavaScript Document

var i_ficha = 0;
var fichas = ['resumen', 'evolucion_golpes', 'evolucion_servicio', 'evolucion_coeficiente', 'evolucion_partidos', 'evolucion_enf', 'evolucion_ef', 'evolucion_pg', 'evolucion_golpes_enf', 'evolucion_golpes_ef', 'evolucion_golpes_pg', 'evolucion_manos_enf', 'evolucion_manos_ef', 'evolucion_manos_pg', 'evolucion_donde_enf', 'evolucion_donde_ef', 'evolucion_donde_pg'];
var graficas = {};

function inicio_analisis_grafico_rango(){

  $('.boton.numerico').click(function(){ mostrar_pagina('analisis_numerico_rango'); });
  $('.boton.compartir').click(function(){ compartir_pantalla(); });

  i_ficha = 0;
  secuencia_inicio = 0;
  fichas = [
    'resumen', 
    'evolucion_partidos',
    'evolucion_golpes', 
    'evolucion_servicio', 
    'evolucion_coeficiente',  
    'evolucion_enf', 
    'evolucion_ef', 
    'evolucion_pg', 
    'evolucion_golpes_enf', 
    'evolucion_golpes_ef', 
    'evolucion_golpes_pg', 
    'evolucion_manos_enf', 
    'evolucion_manos_ef', 
    'evolucion_manos_pg', 
    'evolucion_donde_enf', 
    'evolucion_donde_ef', 
    'evolucion_donde_pg'
  ];
  graficas = {'resumen': '', 'evolucion_golpes': '', 'evolucion_servicio': '', 'evolucion_coeficiente': '', 'evolucion_enf': '', 'evolucion_ef': '', 'evolucion_pg': '', 'evolucion_golpes_enf': '', 'evolucion_golpes_ef': '', 'evolucion_golpes_pg': '', 'evolucion_manos_enf': '', 'evolucion_manos_ef': '', 'evolucion_manos_pg': '', 'evolucion_donde_enf': '', 'evolucion_donde_ef': '', 'evolucion_donde_pg': '', 'evolucion_partidos': ''};

  var desde = new Date();
  switch(analisis_rango_seleccion){
    case 'ultima_semana': desde.setDate(desde.getDate() - 7); break;
    case 'ultimo_mes': desde.setMonth(desde.getMonth() - 1); break;
    case 'ultimos_3_meses': desde.setMonth(desde.getMonth() - 3); break;
    case 'ultimos_6_meses': desde.setMonth(desde.getMonth() - 4); break;
    case 'ultimo_anyo': desde.setYear(desde.getYear() - 1); break;
    default: desde = '0000-00-00';
  }
  if(desde != '0000-00-00') desde = desde.getFullYear().toString() + '-' + (desde.getMonth() + 1).toString().lpad('0', 2) + '-' + desde.getDate().toString().lpad('0', 2);

  db.transaction(function(tx){

    var sql = "select p.*, count(a.accion) as n_acciones from partidos p left join acciones a on a.id_partido=p.id where p.fecha >= '" + desde + "' and (p.id_jugador_1 like '%*' or p.id_jugador_2 like '%*' or p.id_jugador_3 like '%*' or p.id_jugador_4 like '%*') and (a.accion='enf' or a.accion='ef' or a.accion='pg') and a.golpe!='' group by p.id order by p.fecha asc, p.hora asc ";
    tx.executeSql(sql, [], function(tx, results){

      var partidos_profundos = [];
      var id_ultimo_partido_profundo = 0;

      for(var i=0; i<results.rows.length; i++){

        var partido = results.rows.item(i);
        var marcador = { 'sets': 0, 'juegos': 0, 'local': 0, 'visitante': 0, 'set_1': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_2': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_3': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_4': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_5': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 } };

        marcador.sets = parseInt(partido.sets);
        marcador.juegos = parseInt(partido.juegos);
        marcador.set_1.local = parseInt(partido.marcador_set1_local);
        marcador.set_1.visitante = parseInt(partido.marcador_set1_visitante);
        marcador.set_1.inicio.local = parseInt(partido.marcador_set1_local);
        marcador.set_1.inicio.visitante = parseInt(partido.marcador_set1_visitante);
        marcador.set_2.local = parseInt(partido.marcador_set2_local);
        marcador.set_2.visitante = parseInt(partido.marcador_set2_visitante);
        marcador.set_2.inicio.local = parseInt(partido.marcador_set3_local);
        marcador.set_2.inicio.visitante = parseInt(partido.marcador_set3_visitante);
        marcador.set_3.local = parseInt(partido.marcador_set3_local);
        marcador.set_3.visitante = parseInt(partido.marcador_set3_visitante);
        marcador.set_3.inicio.local = parseInt(partido.marcador_set3_local);
        marcador.set_3.inicio.visitante = parseInt(partido.marcador_set3_visitante);
        marcador.set_4.local = parseInt(partido.marcador_set4_local);
        marcador.set_4.visitante = parseInt(partido.marcador_set4_visitante);
        marcador.set_4.inicio.local = parseInt(partido.marcador_set4_local);
        marcador.set_4.inicio.visitante = parseInt(partido.marcador_set4_visitante);
        marcador.set_5.local = parseInt(partido.marcador_set5_local);
        marcador.set_5.visitante = parseInt(partido.marcador_set5_visitante);
        marcador.set_5.inicio.local = parseInt(partido.marcador_set5_local);
        marcador.set_5.inicio.visitante = parseInt(partido.marcador_set5_visitante);

        if(marcador_valido(marcador)){
          partidos_profundos.push(partido.id);
          id_ultimo_partido_profundo = partido.id;
        }

      }

      // var sql = "select * from partidos where fecha >= '" + desde + "' and (id_jugador_1 like '%*' or id_jugador_2 like '%*' or id_jugador_3 like '%*' or id_jugador_4 like '%*') order by fecha asc, hora asc";
      var sql = "select p.*, count(a.accion) as n_acciones from partidos p left join acciones a on a.id_partido=p.id where p.fecha >= '" + desde + "' and (p.id_jugador_1 like '%*' or p.id_jugador_2 like '%*' or p.id_jugador_3 like '%*' or p.id_jugador_4 like '%*') and (a.accion='enf' or a.accion='ef' or a.accion='pg') group by a.id_partido order by p.fecha asc, p.hora asc ";
      tx.executeSql(sql, [], function(tx, results){

        if(results.rows.length == 0){
          notificacion(l['analisis_numerico_rango']['datos_insuficientes']);
          mostrar_pagina('seleccion_rango');
        } else {

          var id_ultimo_partido = '';
          var partidos = [];
          var partidos_todos = [];  
          var propietario = '';

          var licencia = window.localStorage.getItem('usuario_licencia');

          for(var i=0; i<results.rows.length; i++){

            var partido = results.rows.item(i);
            var marcador = { 'sets': 0, 'juegos': 0, 'local': 0, 'visitante': 0, 'set_1': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_2': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_3': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_4': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_5': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 } };
            
            marcador.sets = parseInt(partido.sets);
            marcador.juegos = parseInt(partido.juegos);
            marcador.set_1.local = parseInt(partido.marcador_set1_local);
            marcador.set_1.visitante = parseInt(partido.marcador_set1_visitante);
            marcador.set_1.inicio.local = parseInt(partido.marcador_set1_local);
            marcador.set_1.inicio.visitante = parseInt(partido.marcador_set1_visitante);
            marcador.set_2.local = parseInt(partido.marcador_set2_local);
            marcador.set_2.visitante = parseInt(partido.marcador_set2_visitante);
            marcador.set_2.inicio.local = parseInt(partido.marcador_set3_local);
            marcador.set_2.inicio.visitante = parseInt(partido.marcador_set3_visitante);
            marcador.set_3.local = parseInt(partido.marcador_set3_local);
            marcador.set_3.visitante = parseInt(partido.marcador_set3_visitante);
            marcador.set_3.inicio.local = parseInt(partido.marcador_set3_local);
            marcador.set_3.inicio.visitante = parseInt(partido.marcador_set3_visitante);
            marcador.set_4.local = parseInt(partido.marcador_set4_local);
            marcador.set_4.visitante = parseInt(partido.marcador_set4_visitante);
            marcador.set_4.inicio.local = parseInt(partido.marcador_set4_local);
            marcador.set_4.inicio.visitante = parseInt(partido.marcador_set4_visitante);
            marcador.set_5.local = parseInt(partido.marcador_set5_local);
            marcador.set_5.visitante = parseInt(partido.marcador_set5_visitante);
            marcador.set_5.inicio.local = parseInt(partido.marcador_set5_local);
            marcador.set_5.inicio.visitante = parseInt(partido.marcador_set5_visitante);

            if(marcador_valido(marcador)){
              partidos_todos.push(partido.id);
              if(parseInt(partido.n_acciones) >= 20){
                partidos.push(partido.id);
                id_ultimo_partido = partido.id;
              }
              if(partido.id_jugador_1.substr(-1) == '*') propietario = partido.id_jugador_1;
              if(partido.id_jugador_2.substr(-1) == '*') propietario = partido.id_jugador_2;
              if(partido.id_jugador_3.substr(-1) == '*') propietario = partido.id_jugador_3;
              if(partido.id_jugador_4.substr(-1) == '*') propietario = partido.id_jugador_4;
              if(partido.finalizado == 'no') tx.executeSql("update partidos set finalizado='si' where id=?", [partido.id]);
            }

          }

          if(partidos_todos.length == 0){
            notificacion(l['analisis_numerico_rango']['datos_insuficientes']);
            mostrar_pagina('seleccion_rango');
          } else {

            if(partidos.length == 0){
              fichas.remove('evolucion_golpes');
              fichas.remove('evolucion_servicio');
              fichas.remove('evolucion_coeficiente');
              fichas.remove('evolucion_enf');
              fichas.remove('evolucion_ef');
              fichas.remove('evolucion_pg');
              fichas.remove('evolucion_golpes_enf');
              fichas.remove('evolucion_golpes_ef');
              fichas.remove('evolucion_golpes_pg');
              fichas.remove('evolucion_manos_enf');
              fichas.remove('evolucion_manos_ef');
              fichas.remove('evolucion_manos_pg');
              fichas.remove('evolucion_donde_enf');
              fichas.remove('evolucion_donde_ef');
              fichas.remove('evolucion_donde_pg');
            }

            var sql_partidos = '(';
            var sql_acciones = '(';
            for(var i=0; i<partidos.length; i++){
              if(sql_partidos != '(') sql_partidos += ' or ';
              if(sql_acciones != '(') sql_acciones += ' or ';
              sql_partidos += "id='" + partidos[i] + "'";
              sql_acciones += "id_partido='" + partidos[i] + "'";
            }
            sql_partidos += ')';
            sql_acciones += ')';

            var sql_partidos_todos = '(';
            var sql_acciones_todos = '(';
            for(var i=0; i<partidos_todos.length; i++){
              if(sql_partidos_todos != '(') sql_partidos_todos += ' or ';
              if(sql_acciones_todos != '(') sql_acciones_todos += ' or ';
              sql_partidos_todos += "id='" + partidos_todos[i] + "'";
              sql_acciones_todos += "id_partido='" + partidos_todos[i] + "'";
            }
            sql_partidos_todos += ')';
            sql_acciones_todos += ')';

            var sql_partidos_profundos = '(';
            var sql_acciones_profundos = '(';
            for(var i=0; i<partidos_profundos.length; i++){
              if(sql_partidos_profundos != '(') sql_partidos_profundos += ' or ';
              if(sql_acciones_profundos != '(') sql_acciones_profundos += ' or ';
              sql_partidos_profundos += "id='" + partidos_profundos[i] + "'";
              sql_acciones_profundos += "id_partido='" + partidos_profundos[i] + "'";
            }
            sql_partidos_profundos += ')';
            sql_acciones_profundos += ')';

            // resumen

            var sql = "select * from partidos where " + sql_partidos_todos + " order by fecha asc";
            tx.executeSql(sql, [], function(tx, results){

              var c = {'partidos_ganados': 0, 'partidos_perdidos': 0, 'sets_ganados': 0, 'sets_perdidos': 0, 'juegos_ganados': 0, 'juegos_perdidos': 0};

              for(var i=0; i<results.rows.length; i++){
                var partido = results.rows.item(i);

                if(partido.id_jugador_1 == propietario || partido.id_jugador_2 == propietario){ // propietario juega de local
                  if(parseInt(partido.marcador_local) > parseInt(partido.marcador_visitante)) c.partidos_ganados++;
                  if(parseInt(partido.marcador_visitante) > parseInt(partido.marcador_local)) c.partidos_perdidos++;
                  c.sets_ganados += parseInt(partido.marcador_local);
                  c.sets_perdidos += parseInt(partido.marcador_visitante);
                  c.juegos_ganados += parseInt(partido.marcador_set1_local) + parseInt(partido.marcador_set2_local) + parseInt(partido.marcador_set3_local);
                  c.juegos_perdidos += parseInt(partido.marcador_set1_visitante) + parseInt(partido.marcador_set2_visitante) + parseInt(partido.marcador_set3_visitante);
                }
                if(partido.id_jugador_3 == propietario || partido.id_jugador_4 == propietario){ // propietario juega de visitante
                  if(parseInt(partido.marcador_local) < parseInt(partido.marcador_visitante)) c.partidos_ganados++;
                  if(parseInt(partido.marcador_visitante) < parseInt(partido.marcador_local)) c.partidos_perdidos++;
                  c.sets_ganados += parseInt(partido.marcador_visitante);
                  c.sets_perdidos += parseInt(partido.marcador_local);
                  c.juegos_ganados += parseInt(partido.marcador_set1_visitante) + parseInt(partido.marcador_set2_visitante) + parseInt(partido.marcador_set3_visitante);
                  c.juegos_perdidos += parseInt(partido.marcador_set1_local) + parseInt(partido.marcador_set2_local) + parseInt(partido.marcador_set3_local);
                }

              }

              var total_partidos = c.partidos_ganados + c.partidos_perdidos;
              var porcentaje_partidos_ganados = 0;
              var porcentaje_partidos_perdidos = 0;

              if(total_partidos > 0){
                porcentaje_partidos_ganados = Math.round(c.partidos_ganados * 100 / total_partidos);
                porcentaje_partidos_perdidos = Math.round(c.partidos_perdidos * 100 / total_partidos);
              }

              var total_sets = c.sets_ganados + c.sets_perdidos;
              var porcentaje_sets_ganados = 0;
              var porcentaje_sets_perdidos = 0;

              if(total_sets > 0){
                porcentaje_sets_ganados = Math.round(c.sets_ganados * 100 / total_sets);
                porcentaje_sets_perdidos = Math.round(c.sets_perdidos * 100 / total_sets);
              }

              var total_juegos = c.juegos_ganados + c.juegos_perdidos;
              var porcentaje_juegos_ganados = 0;
              var porcentaje_juegos_perdidos = 0;

              if(total_juegos > 0){
                porcentaje_juegos_ganados = Math.round(c.juegos_ganados * 100 / total_juegos);
                porcentaje_juegos_perdidos = Math.round(c.juegos_perdidos * 100 / total_juegos);
              }

              var data = [
                {label: l['analisis_grafico_rango']['ganados'], color: '#a3bd31', data: [[0, porcentaje_partidos_ganados], [1, porcentaje_sets_ganados], [2, porcentaje_juegos_ganados]], bars:{show: true, barWidth: 0.35, order: 0, align: 'left', fill: 1}}, 
                {label: l['analisis_grafico_rango']['perdidos'], color: '#bf0411', data: [[0, porcentaje_partidos_perdidos], [1, porcentaje_sets_perdidos], [2, porcentaje_juegos_perdidos]], bars:{show: true, barWidth: 0.35, order: 1, align: 'left', fill: 1}}
              ];
              
              var options = {
                series: { bars: {show: true, barWidth: 0.7, align: 'center'} },
                xaxis: {ticks: [[0, l['analisis_grafico_rango']['partidos']], [1, l['analisis_grafico_rango']['sets']], [2, l['analisis_grafico_rango']['juegos']]], color: '#333', tickColor: '#f6f6f7'},
                yaxis: {min: 0, minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)) + '%'; }), color: '#333', tickColor: '#d5d5d5'},
                legend: {show: false},
                grid: {show: true, borderColor: '#f6f6f7'}
              };

              graficas['resumen'] = {'data': data, 'options': options};
              secuencia_inicio++; if(secuencia_inicio >= 2){ $('.ficha.resumen').show(); mostrar_grafica_rango('resumen'); }

            });

            // evolucion_golpes

            if(partidos.length > 0){
              var data = [
                {label: l['analisis_grafico_rango']['media'], color: '#cb6018', data: [[0, 0], [1, 0], [2, 0]], bars:{show: true, barWidth: 0.35, order: 0, align: 'left', fill: 1}}, 
                {label: l['analisis_grafico_rango']['ultimo'], color: '#a3bd31', data: [[0, 0], [1, 0], [2, 0]], bars:{show: true, barWidth: 0.35, order: 1, align: 'left', fill: 1}}
              ];
              
              var options = {
                series: { bars: {show: true, barWidth: 0.7, align: 'center'} },
                xaxis: {ticks: [[0, l['analisis_grafico_rango']['ef']], [1, l['analisis_grafico_rango']['enf']], [2, l['analisis_grafico_rango']['pg']]], color: '#333', tickColor: '#f6f6f7'},
                yaxis: {min: 0, minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)) + '%'; }), tickColor: '#d5d5d5'},
                legend: {show: false},
                grid: {show: true, borderColor: '#f6f6f7'}
              };

              graficas['evolucion_golpes'] = {'data': data, 'options': options};

              graficas['evolucion_golpes'].data[0].data[0][1] = parseInt($('#analisis_numerico_rango .ef .porcentaje.media').html());
              graficas['evolucion_golpes'].data[0].data[1][1] = parseInt($('#analisis_numerico_rango .enf .porcentaje.media').html());
              graficas['evolucion_golpes'].data[0].data[2][1] = parseInt($('#analisis_numerico_rango .pg .porcentaje.media').html());

              graficas['evolucion_golpes'].data[1].data[0][1] = parseInt($('#analisis_numerico_rango .ef .porcentaje.rango').html());
              graficas['evolucion_golpes'].data[1].data[1][1] = parseInt($('#analisis_numerico_rango .enf .porcentaje.rango').html());
              graficas['evolucion_golpes'].data[1].data[2][1] = parseInt($('#analisis_numerico_rango .pg .porcentaje.rango').html());
            }

            /*
            var sql = "select ";
            sql += "(select count(*) from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='enf' and golpe != 'saque_1' and golpe != 'saque_2') as enf, ";
            sql += "(select count(*) from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='ef' and golpe != 'saque_1' and golpe != 'saque_2') as ef, ";
            sql += "(select count(*) from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='pg') as pg, ";
            sql += "(select count(*) from acciones where " + sql_acciones + " and accion='enf' and golpe != 'saque_1' and golpe != 'saque_2') as total_enf, ";
            sql += "(select count(*) from acciones where " + sql_acciones + " and accion='ef' and golpe != 'saque_1' and golpe != 'saque_2') as total_ef, ";
            sql += "(select count(*) from acciones where " + sql_acciones + " and accion='pg') as total_pg";
            tx.executeSql(sql, [], function(tx, results){
            
              var p = results.rows.item(0);
              //var total_puntos = Math.round((parseInt(p.total_enf) + parseInt(p.total_ef) + parseInt(p.total_pg)) / partidos.length);
              var total_puntos = Math.round((parseInt(p.total_enf) + parseInt(p.total_ef) + parseInt(p.total_pg)));

              var media_enf = Math.round(parseInt(p.enf) / partidos.length);
              var media_ef = Math.round(parseInt(p.ef) / partidos.length);
              var media_pg = Math.round(parseInt(p.pg) / partidos.length)

              var porcentaje_enf = 0;
              var porcentaje_ef = 0;
              var porcentaje_pg = 0;
              if(total_puntos > 0){
                porcentaje_enf = Math.round(media_enf * 100 / total_puntos);
                porcentaje_ef = Math.round(media_ef * 100 / total_puntos);
                porcentaje_pg = Math.round(media_pg * 100 / total_puntos);
              }

              graficas['evolucion_golpes'].data[0].data.push([0, porcentaje_ef]);
              graficas['evolucion_golpes'].data[0].data.push([1, porcentaje_enf]);
              graficas['evolucion_golpes'].data[0].data.push([2, porcentaje_pg]);

            });

            var sql = "select ";
            sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='enf' and golpe != 'saque_1' and golpe != 'saque_2') as enf, ";
            sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='ef' and golpe != 'saque_1' and golpe != 'saque_2') as ef, ";
            sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='pg') as pg, ";
            sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and accion='enf' and golpe != 'saque_1' and golpe != 'saque_2') as total_enf, ";
            sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and accion='ef' and golpe != 'saque_1' and golpe != 'saque_2') as total_ef, ";
            sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and accion='pg') as total_pg";
            tx.executeSql(sql, [], function(tx, results){

              var p = results.rows.item(0);
              var total_puntos = parseInt(p.total_enf) + parseInt(p.total_ef) + parseInt(p.total_pg);

              var porcentaje_enf = 0;
              var porcentaje_ef = 0;
              var porcentaje_pg = 0;
              if(total_puntos > 0){
                porcentaje_enf = Math.round(parseInt(p.enf) * 100 / total_puntos);
                porcentaje_ef = Math.round(parseInt(p.ef) * 100 / total_puntos);
                porcentaje_pg = Math.round(parseInt(p.pg) * 100 / total_puntos);
              }

              graficas['evolucion_golpes'].data[1].data.push([0, porcentaje_ef]);
              graficas['evolucion_golpes'].data[1].data.push([1, porcentaje_enf]);
              graficas['evolucion_golpes'].data[1].data.push([2, porcentaje_pg]);

            });
            */

            // evolucion_servicio

            if(licencia == 'free' || licencia == 'basic'){
              fichas.remove('evolucion_servicio');
            } else {
              if(partidos.length > 0){
                var data = [
                  {label: l['analisis_grafico_rango']['media'], color: '#cb6018', data: [[0, 0], [1, 0], [2, 0]], bars:{show: true, barWidth: 0.35, order: 0, align: 'left', fill: 1}}, 
                  {label: l['analisis_grafico_rango']['ultimo'], color: '#a3bd31', data: [[0, 0], [1, 0], [2, 0]], bars:{show: true, barWidth: 0.35, order: 1, align: 'left', fill: 1}}
                ];
                
                var options = {
                  series: { bars: {show: true, barWidth: 0.7, align: 'center'} },
                  xaxis: {ticks: [[0, l['analisis_grafico_rango']['saque_1']], [1, l['analisis_grafico_rango']['saque_2']], [2, l['analisis_grafico_rango']['breaks']]], color: '#333', tickColor: '#f6f6f7'},
                  yaxis: {min: 0, minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)) + '%'; }), tickColor: '#d5d5d5'},
                  legend: {show: false},
                  grid: {show: true, borderColor: '#f6f6f7'}
                };

                graficas['evolucion_servicio'] = {'data': data, 'options': options};

                graficas['evolucion_servicio'].data[0].data[0][1] = parseInt($('#analisis_numerico_rango .saque_1 .porcentaje.media').html());
                graficas['evolucion_servicio'].data[0].data[1][1] = parseInt($('#analisis_numerico_rango .saque_2 .porcentaje.media').html());

                graficas['evolucion_servicio'].data[1].data[0][1] = parseInt($('#analisis_numerico_rango .saque_1 .porcentaje.rango').html());
                graficas['evolucion_servicio'].data[1].data[1][1] = parseInt($('#analisis_numerico_rango .saque_2 .porcentaje.rango').html());

                graficas['evolucion_servicio'].data[0].data[2][1] = parseInt($('#analisis_numerico_rango .breaks .porcentaje.media').html());
                graficas['evolucion_servicio'].data[1].data[2][1] = parseInt($('#analisis_numerico_rango .breaks .porcentaje.rango').html());
              }
            }

            /*
            tx.executeSql("select * from partidos where " + sql_partidos + " order by fecha asc", [], function(tx, results){

              var rango_saque_1 = [0, 0];
              var rango_saque_2 = [0, 0];

              for(var i=0; i<results.rows.length; i++){

                var p = results.rows.item(i);        
                var n = 0;
                if(p.id_jugador_1 == propietario) n = 1;
                if(p.id_jugador_2 == propietario) n = 2;
                if(p.id_jugador_3 == propietario) n = 3;
                if(p.id_jugador_4 == propietario) n = 4;

                var sql = "select ";
                sql += "(select count(*) from acciones where id_partido='" + p.id + "' and saque=" + n + " and (accion='pg' or accion='ef' or accion='enf')) as acciones, ";
                sql += "(select count(*) from acciones where id_partido='" + p.id + "' and saque=" + n + " and (accion='enf' or accion='ef') and golpe='saque_1' and n_jugador='" + n + "') as fallos_saque_1, ";
                sql += "(select count(*) from acciones where id_partido='" + p.id + "' and saque=" + n + " and (accion='enf' or accion='ef') and golpe='saque_2' and n_jugador='" + n + "') as fallos_saque_2";

                tx.executeSql(sql, [], function(tx, results){

                  var r = results.rows.item(0);        
                  rango_saque_1[0] += parseInt(r.acciones) - parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_1);
                  rango_saque_1[1] += parseInt(r.acciones) - parseInt(r.fallos_saque_1);
                  rango_saque_2[0] += parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_2);
                  rango_saque_2[1] += parseInt(r.fallos_saque_1);

                  var primeros = Math.round(rango_saque_1[0] / partidos.length);
                  if(primeros < 0) primeros = 0;
                  var total_primeros = Math.round(rango_saque_1[1] / partidos.length);
                  if(total_primeros < 0) total_primeros = 0;
                  var segundos = Math.round(rango_saque_2[0] / partidos.length);
                  if(segundos < 0) segundos = 0;
                  var total_segundos = Math.round(rango_saque_2[1] / partidos.length);
                  if(total_segundos < 0) total_segundos = 0;
                  var porcentaje_primeros = 0;
                  var porcentaje_segundos = 0;

                  if(total_primeros > 0) porcentaje_primeros = Math.round(primeros * 100 / total_primeros);
                  if(total_segundos > 0) porcentaje_segundos = Math.round(segundos * 100 / total_segundos);

                  graficas['evolucion_servicio'].data[0].data[0][1] = porcentaje_primeros;
                  graficas['evolucion_servicio'].data[0].data[1][1] = porcentaje_segundos;

                });

              }

            });

            tx.executeSql("select * from partidos where id=?", [id_ultimo_partido], function(tx, results){
              
              var p = results.rows.item(0);        
              var n = 0;
              if(p.id_jugador_1 == propietario) n = 1;
              if(p.id_jugador_2 == propietario) n = 2;
              if(p.id_jugador_3 == propietario) n = 3;
              if(p.id_jugador_4 == propietario) n = 4;

              var sql = "select ";
              sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and saque=" + n + " and (accion='pg' or accion='ef' or accion='enf')) as acciones, ";
              sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and saque=" + n + " and (accion='enf' or accion='ef') and golpe='saque_1' and n_jugador='" + n + "') as fallos_saque_1, ";
              sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and saque=" + n + " and (accion='enf' or accion='ef') and golpe='saque_2' and n_jugador='" + n + "') as fallos_saque_2";

              tx.executeSql(sql, [], function(tx, results){

                var r = results.rows.item(0);       

                var primeros = (parseInt(r.acciones) - parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_1));
                if(primeros < 0) primeros = 0;
                var total_primeros = (parseInt(r.acciones) - parseInt(r.fallos_saque_1));
                if(total_primeros < 0) total_primeros = 0;
                var segundos = (parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_2));
                if(segundos < 0) segundos = 0;
                var total_segundos = parseInt(r.fallos_saque_1);
                if(total_segundos < 0) total_segundos = 0;
                var porcentaje_primeros = 0;
                var porcentaje_segundos = 0;

                if(total_primeros > 0) porcentaje_primeros = Math.round(primeros * 100 / total_primeros);
                if(total_segundos > 0) porcentaje_segundos = Math.round(segundos * 100 / total_segundos);

                graficas['evolucion_servicio'].data[1].data[0][1] = porcentaje_primeros;
                graficas['evolucion_servicio'].data[1].data[1][1] = porcentaje_segundos;

                
              });

            });

            tx.executeSql("select * from partidos where " + sql_partidos + " order by fecha asc", [], function(tx, results){ // breaks

              var breaks = [0, 0];

              for(var i=0; i<results.rows.length; i++){
                var p = results.rows.item(i);        

                var n = 0;
                if(p.id_jugador_1 == propietario) n = 1;
                if(p.id_jugador_2 == propietario) n = 2;
                if(p.id_jugador_3 == propietario) n = 3;
                if(p.id_jugador_4 == propietario) n = 4;

                var sql = "select '" + n + "' as n_jugador, '" + p.juegos + "' as p_juegos, '" + p.id + "' as p_id, id, saque, n_set, n_juego, marcador_juego_local, marcador_juego_visitante, variacion_local, variacion_visitante from acciones where id_partido='" + p.id + "' group by n_set, n_juego having id=max(id) order by n_set, n_juego";
                tx.executeSql(sql, [], function(tx, results){

                  var breaks_p = [0, 0];
                  var id_partido = 0

                  for(var i=0; i<results.rows.length; i++){
                    var a = results.rows.item(i);
                    id_partido = a.p_id;
                    var tiebreak = (parseInt(a.n_juego) > parseInt(a.p_juegos) * 2);
                    var marcador_local = parseInt(a.marcador_juego_local) + parseInt(a.variacion_local);
                    var marcador_visitante = parseInt(a.marcador_juego_visitante) + parseInt(a.variacion_visitante);
                    var gana_local = (marcador_local >= partido.puntos && marcador_local - marcador_visitante >= 2);
                    var gana_visitante = (marcador_visitante >= partido.puntos && marcador_visitante - marcador_local >= 2);
                    if(!tiebreak && parseInt(a.saque) == parseInt(a.n_jugador)){
                      breaks[1]++;
                      breaks_p[1]++;
                      if(gana_local || gana_visitante){
                        if((parseInt(a.saque) == 1 || parseInt(a.saque) == 2) && marcador_visitante > marcador_local){ breaks[0]++; breaks_p[0]++; }
                        if((parseInt(a.saque) == 3 || parseInt(a.saque) == 4) && marcador_local > marcador_visitante){ breaks[0]++; breaks_p[0]++; }
                      }
                    }
                  }

                  if(breaks[1] > 0) graficas['evolucion_servicio'].data[0].data[2][1] = Math.round(breaks[0] * 100 / breaks[1]);
                  if(id_partido == id_ultimo_partido){
                    if(breaks_p[1] > 0) graficas['evolucion_servicio'].data[1].data[2][1] = Math.round(breaks_p[0] * 100 / breaks_p[1]);
                    //if(breaks[1] > 0) graficas['evolucion_servicio'].data[0].data.push([2, Math.round(breaks[0] * 100 / breaks[1])]);
                    //else graficas['evolucion_servicio'].data[0].data.push([2, 0]);
                    //if(breaks_p[1] > 0) graficas['evolucion_servicio'].data[1].data.push([2, Math.round(breaks_p[0] * 100 / breaks_p[1])]);
                    //else graficas['evolucion_servicio'].data[1].data.push([2, 0]);
                  } 

                });

              }
            });     
            */

            // evolucion_coeficiente

            if(partidos.length > 0){
              var data = [{label: l['analisis_grafico_rango']['coeficiente_ps'], color: '#a3bd31', data: []}];
              
              var options = {
                series: { bars: {show: true, barWidth: 0.5, align: 'center', fill: 1} },
                xaxis: {color: '#333', minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)); }), tickColor: '#f6f6f7'},
                yaxis: {color: '#333', minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)); }), tickColor: '#d5d5d5'},
                legend: {show: false},
                grid: {show: true, borderColor: '#f6f6f7'}
              };

              graficas['evolucion_coeficiente'] = {'data': data, 'options': options};

              tx.executeSql("select * from partidos where " + sql_partidos + " order by fecha asc", [], function(tx, results){
                for(var i=0; i<results.rows.length; i++){
                  var p = results.rows.item(i);        
                  var n = 0;
                  if(p.id_jugador_1 == propietario) n = 1;
                  if(p.id_jugador_2 == propietario) n = 2;
                  if(p.id_jugador_3 == propietario) n = 3;
                  if(p.id_jugador_4 == propietario) n = 4;
                  if(n > 0) graficas['evolucion_coeficiente'].data[0].data.push([i+1, parseInt(p['coeficiente_' + n])]);
                }
              });
            }

            // evolucion_partidos

            var data = [{label: l['analisis_grafico_rango']['evolucion_partidos'], color: '#a3bd31', data: []}];

            var options = {
              series: { lines: {show: true, fill: 0, lineWidth: 4} },
              xaxis: {color: '#333', minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)); }), tickColor: '#f6f6f7'},
              yaxis: {color: '#333', minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)); }), tickColor: '#d5d5d5'},
              legend: {show: false},
              grid: {show: true, borderColor: '#f6f6f7'}
            };
            graficas['evolucion_partidos'] = {'data': data, 'options': options};
            tx.executeSql("select * from partidos where " + sql_partidos_todos + " order by fecha asc", [], function(tx, results){
              var dato = 0;
              graficas['evolucion_partidos'].data[0].data.push([0, dato]);
              for(var i=0; i<results.rows.length; i++){
                var p = results.rows.item(i);        
                var hay_dato = false;
                if(p.id_jugador_1 == propietario || p.id_jugador_2 == propietario){ // local
                  if(parseInt(p.marcador_local) == 2) dato++;
                  if(parseInt(p.marcador_visitante) == 2) dato--;
                  hay_dato = true;
                } 
                if(p.id_jugador_3 == propietario || p.id_jugador_4 == propietario){ // visitante
                  if(parseInt(p.marcador_local) == 2) dato--;
                  if(parseInt(p.marcador_visitante) == 2) dato++;
                  hay_dato = true;
                } 
                if(hay_dato) graficas['evolucion_partidos'].data[0].data.push([i+1, dato]);
              }
            });

            // evolucion_enf, evolucion_ef, evolucion_pg

            if(partidos.length > 0){
              var evolucion_enf = [];
              var evolucion_ef = [];
              var evolucion_pg = [];

              for(var i=0; i<partidos.length; i++){
                var p = partidos[i];

                var sql = "select '" + i + "' as i, ";
                sql += "(select count(*) from acciones where id_partido='" + p + "' and id_jugador='" + propietario + "' and accion='enf' and golpe!='saque_1') as enf, ";
                sql += "(select count(*) from acciones where id_partido='" + p + "' and id_jugador='" + propietario + "' and accion='ef' and golpe!='saque_1') as ef, ";
                sql += "(select count(*) from acciones where id_partido='" + p + "' and id_jugador='" + propietario + "' and accion='pg') as pg, ";
                sql += "(select count(*) from acciones where id_partido='" + p + "' and (accion='enf' or accion='ef' or accion='pg') and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as total_acciones";
                tx.executeSql(sql, [], function(tx, results){

                  var enf = 0;
                  var ef = 0;
                  var pg = 0;
                  var r = results.rows.item(0);
                  
                  if(r.total_acciones > 0){
                    enf = Math.round(parseInt(r.enf) * 100 / parseInt(r.total_acciones));
                    ef = Math.round(parseInt(r.ef) * 100 / parseInt(r.total_acciones));
                    pg = Math.round(parseInt(r.pg) * 100 / parseInt(r.total_acciones));
                  }
                  
                  evolucion_enf[parseInt(r.i)] = enf;
                  evolucion_ef[parseInt(r.i)] = ef;
                  evolucion_pg[parseInt(r.i)] = pg;

                  if(parseInt(r.i) == partidos.length - 1){

                    var data = [{label: l['analisis_grafico_rango']['enf'], color: '#bf0411', data: []}];
                    for(var i=0; i<evolucion_enf.length; i++) data[0].data.push([i+1, evolucion_enf[i]]);

                    var options = {
                      series: { lines: {show: true, fill: 1} },
                      xaxis: {color: '#333', minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)); }), tickColor: '#f6f6f7'},
                      yaxis: {min: 0, color: '#333', minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)) + '%'; }), tickColor: '#d5d5d5'},
                      legend: {show: false},
                      grid: {show: true, borderColor: '#f6f6f7'}
                    };

                    graficas['evolucion_enf'] = {'data': data, 'options': options};

                    var data = [{label: l['analisis_grafico_rango']['ef'], color: '#cb6018', data: []}];
                    for(var i=0; i<evolucion_ef.length; i++) data[0].data.push([i+1, evolucion_ef[i]]);

                    graficas['evolucion_ef'] = {'data': data, 'options': options};

                    var data = [{label: l['analisis_grafico_rango']['pg'], color: '#a3bd31', data: []}];
                    for(var i=0; i<evolucion_pg.length; i++) data[0].data.push([i+1, evolucion_pg[i]]);

                    graficas['evolucion_pg'] = {'data': data, 'options': options};

                  }

                });

              }

              if(partidos_profundos.length > 0){

                var sql = "select ";
                sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and (accion='pg' or (accion like 'e%' and golpe!='saque_1'))) as total_acciones_ultimo_partido, ";
                sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and (accion='pg' or (accion like 'e%' and golpe!='saque_1'))) as total_acciones_rango"; 

                tx.executeSql(sql, [], function(tx, results){

                  var r = results.rows.item(0);
                  var total_acciones_ultimo_partido = r.total_acciones_ultimo_partido;
                  var total_acciones_rango = r.total_acciones_rango;

                  // evolucion_golpes_enf, evolucion_golpes_ef, evolucion_golpes_pg

                  if(licencia == 'free' || licencia == 'basic'){
                    fichas.remove('evolucion_golpes_enf');
                    fichas.remove('evolucion_golpes_ef');
                    fichas.remove('evolucion_golpes_pg');
                  } else {
              
                    var golpes = ['resto', 'bote_p', 'directo', 'volea', 'bandeja', 's_pared', 'smash', 'globo'];
                    var acciones = ['ef', 'enf', 'pg'];
                    
                    for(var a=0; a<acciones.length; a++){
                      var accion = acciones[a];
                      
                      var sql = "select '" + accion + "' as accion, ";
                      for(var g=0; g<golpes.length; g++){
                        var golpe = golpes[g];
                        sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and accion='" + accion + "' and golpe='" + golpe + "') as rango_" + accion + "_" + golpe + ", ";
                        sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and accion='" + accion + "' and golpe='" + golpe + "') as ultimo_" + accion + "_" + golpe + ", ";
                      }
                      sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and (accion='enf' or accion='ef' or accion='pg') and golpe!='' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as total_acciones_rango, ";
                      sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and (accion='enf' or accion='ef' or accion='pg') and golpe!='' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as total_acciones_ultimo";

                      tx.executeSql(sql, [], function(tx, results){

                        var r = results.rows.item(0);

                        var total_acciones_rango = 0;
                        var total_acciones_ultimo = 0;
                        
                        for(var g=0; g<golpes.length; g++){
                          var golpe = golpes[g];
                          total_acciones_rango += parseInt(r['rango_' + r.accion + '_' + golpe]);
                          total_acciones_ultimo += parseInt(r['ultimo_' + r.accion + '_' + golpe]);
                        }

                        var rango = {'resto': 0, 'bote_p': 0, 'directo': 0, 'volea': 0, 'bandeja': 0, 's_pared': 0, 'smash': 0, 'globo': 0};
                        var ultimo = {'resto': 0, 'bote_p': 0, 'directo': 0, 'volea': 0, 'bandeja': 0, 's_pared': 0, 'smash': 0, 'globo': 0};

                        if(total_acciones_rango > 0){
                          for(var g=0; g<golpes.length; g++){
                            var golpe = golpes[g];
                            var valor = parseInt(r['rango_' + r.accion + '_' + golpe]);
                            //rango[golpe] = Math.round(parseInt(r['rango_' + r.accion + '_' + golpe]) * 100 / total_acciones_rango);
                            rango[golpe] = Math.round(valor / partidos_profundos.length / total_acciones_rango * 100);
                          }
                        }
                        
                        if(total_acciones_ultimo > 0){
                          for(var g=0; g<golpes.length; g++){
                            var golpe = golpes[g];
                            var valor = parseInt(r['ultimo_' + r.accion + '_' + golpe]);
                            //ultimo[golpe] = Math.round(parseInt(r['ultimo_' + r.accion + '_' + golpe]) * 100 / total_acciones_ultimo);
                            ultimo[golpe] = Math.round(valor * 100 / total_acciones_ultimo_partido);
                          }
                        }

                        var data_rango = [];
                        var data_ultimo = [];

                        for(var g=0; g<golpes.length; g++){
                          var golpe = golpes[g];
                          data_rango.push([g, rango[golpe]]);
                          data_ultimo.push([g, ultimo[golpe]]);
                        }                 
                        
                        var data = [
                          {label: l['analisis_grafico_rango']['media'], color: '#cb6018', data: data_rango, bars:{show: true, barWidth: 0.35, order: 0, align: 'left', fill: 1}}, 
                          {label: l['analisis_grafico_rango']['ultimo'], color: '#a3bd31', data: data_ultimo, bars:{show: true, barWidth: 0.35, order: 1, align: 'left', fill: 1}}
                        ];
                        
                        var options = {
                          series: { bars: {show: true, barWidth: 0.7, align: 'left', fill: 1} },
                          xaxis: {ticks: [[0, l['analisis_grafico_rango']['resto']], [1, l['analisis_grafico_rango']['bote_p']], [2, l['analisis_grafico_rango']['directo']], [3, l['analisis_grafico_rango']['volea']], [4, l['analisis_grafico_rango']['bandeja']], [5, l['analisis_grafico_rango']['s_pared']], [6, l['analisis_grafico_rango']['smash']], [7, l['analisis_grafico_rango']['globo']]], color: '#333', tickColor: '#f6f6f7', font: {size: 20}},
                          yaxis: {min: 0, minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)) + '%'; }), color: '#333', tickColor: '#d5d5d5'},
                          legend: {show: false},
                          grid: {show: true, borderColor: '#f6f6f7'}
                        };

                        graficas['evolucion_golpes_' + r.accion] = {'data': data, 'options': options};

                      });

                    }

                  }

                  // evolucion_manos_enf, evolucion_manos_ef, evolucion_manos_pg
              
                  if(licencia == 'free' || licencia == 'basic'){
                    fichas.remove('evolucion_manos_enf');
                    fichas.remove('evolucion_manos_ef');
                    fichas.remove('evolucion_manos_pg');
                  } else {

                    var manos = ['drive', 'reves'];
                    
                    for(var a=0; a<acciones.length; a++){
                      var accion = acciones[a];
                      
                      var sql = "select '" + accion + "' as accion, ";
                      for(var m=0; m<manos.length; m++){
                        var mano = manos[m];
                        sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and accion='" + accion + "' and mano='" + mano + "' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as rango_" + accion + "_" + mano + ", ";
                        sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and accion='" + accion + "' and mano='" + mano + "' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as ultimo_" + accion + "_" + mano + ", ";
                      }
                      sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and (accion='enf' or accion='ef' or accion='pg') and mano!='' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as total_acciones_rango, ";
                      sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and (accion='enf' or accion='ef' or accion='pg') and mano!='' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as total_acciones_ultimo";

                      tx.executeSql(sql, [], function(tx, results){

                        var r = results.rows.item(0);

                        var total_acciones_rango = 0;
                        var total_acciones_ultimo = 0;

                        for(var m=0; m<manos.length; m++){
                          var mano = manos[m];
                          total_acciones_rango += parseInt(r['rango_' + r.accion + '_' + mano]);
                          total_acciones_ultimo += parseInt(r['ultimo_' + r.accion + '_' + mano]);
                        }

                        var rango = {'drive': 0, 'reves': 0};
                        var ultimo = {'drive': 0, 'reves': 0};
                        
                        if(total_acciones_rango > 0){
                          for(var m=0; m<manos.length; m++){
                            var mano = manos[m];
                            var valor = parseInt(r['rango_' + r.accion + '_' + mano]);
                            //rango[mano] = Math.round(parseInt(r['rango_' + r.accion + '_' + mano]) * 100 / total_acciones_rango);
                            rango[mano] = Math.round(valor / partidos_profundos.length / total_acciones_rango * 100);
                          }
                        }
                        
                        if(total_acciones_ultimo > 0){
                          for(var m=0; m<manos.length; m++){
                            var mano = manos[m];
                            var valor = parseInt(r['ultimo_' + r.accion + '_' + mano]);
                            //ultimo[mano] = Math.round(parseInt(r['ultimo_' + r.accion + '_' + mano]) * 100 / total_acciones_ultimo);
                            ultimo[mano] = Math.round(valor * 100 / total_acciones_ultimo_partido);
                          }
                        }

                        var data_rango = [];
                        var data_ultimo = [];

                        for(var m=0; m<manos.length; m++){
                          var mano = manos[m];
                          data_rango.push([m, rango[mano]]);
                          data_ultimo.push([m, ultimo[mano]]);
                        }                 
                        
                        var data = [
                          {label: l['analisis_grafico_rango']['media'], color: '#cb6018', data: data_rango, bars:{show: true, barWidth: 0.35, order: 0, align: 'left', fill: 1}}, 
                          {label: l['analisis_grafico_rango']['ultimo'], color: '#a3bd31', data: data_ultimo, bars:{show: true, barWidth: 0.35, order: 1, align: 'left', fill: 1}}
                        ];
                        
                        var options = {
                          series: { bars: {show: true, barWidth: 0.7, align: 'left', fill: 1} },
                          xaxis: {ticks: [[0, l['analisis_grafico_rango']['drive']], [1, l['analisis_grafico_rango']['reves']]], color: '#333', tickColor: '#f6f6f7', font: {size: 20}},
                          yaxis: {min: 0, minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)) + '%'; }), color: '#333', tickColor: '#d5d5d5'},
                          legend: {show: false},
                          grid: {show: true, borderColor: '#f6f6f7'}
                        };

                        graficas['evolucion_manos_' + r.accion] = {'data': data, 'options': options};

                      });

                    }

                  }

                  // evolucion_donde_enf, evolucion_donde_ef, evolucion_donde_pg
              
                  if(licencia == 'free' || licencia == 'basic'){
                    fichas.remove('evolucion_donde_enf');
                    fichas.remove('evolucion_donde_ef');
                    fichas.remove('evolucion_donde_pg');
                  } else {

                    var dondes = ['fondo', 'pantano', 'red'];
                    
                    for(var a=0; a<acciones.length; a++){
                      var accion = acciones[a];
                      
                      var sql = "select '" + accion + "' as accion, ";
                      for(var d=0; d<dondes.length; d++){
                        var donde = dondes[d];
                        sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and accion='" + accion + "' and donde='" + donde + "' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as rango_" + accion + "_" + donde + ", ";
                        sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and accion='" + accion + "' and donde='" + donde + "' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as ultimo_" + accion + "_" + donde + ", ";
                      }
                      sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and (accion='enf' or accion='ef' or accion='pg') and donde!='' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as total_acciones_rango, ";
                      sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and (accion='enf' or accion='ef' or accion='pg') and donde!='' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as total_acciones_ultimo";

                      tx.executeSql(sql, [], function(tx, results){

                        var r = results.rows.item(0);

                        var total_acciones_rango = 0;
                        var total_acciones_ultimo = 0;

                        for(var d=0; d<dondes.length; d++){
                          var donde = dondes[d];
                          total_acciones_rango += parseInt(r['rango_' + r.accion + '_' + donde]);
                          total_acciones_ultimo += parseInt(r['ultimo_' + r.accion + '_' + donde]);
                        }

                        var rango = {'fondo': 0, 'pantano': 0, 'red': 0};
                        var ultimo = {'fondo': 0, 'pantano': 0, 'red': 0};
                        
                        if(total_acciones_rango > 0){
                          for(var d=0; d<dondes.length; d++){
                            var donde = dondes[d];
                            var valor = parseInt(r['rango_' + r.accion + '_' + donde]);
                            //rango[donde] = Math.round(parseInt(r['rango_' + r.accion + '_' + donde]) * 100 / total_acciones_rango);
                            rango[donde] = Math.round(valor / partidos_profundos.length / total_acciones_rango * 100);
                          }
                        }
                        
                        if(total_acciones_ultimo > 0){
                          for(var d=0; d<dondes.length; d++){
                            var donde = dondes[d];
                            var valor = parseInt(r['ultimo_' + r.accion + '_' + donde]);
                            //ultimo[donde] = Math.round(parseInt(r['ultimo_' + r.accion + '_' + donde]) * 100 / total_acciones_ultimo);
                            ultimo[donde] = Math.round(valor * 100 / total_acciones_ultimo_partido);
                          }
                        }

                        var data_rango = [];
                        var data_ultimo = [];

                        for(var d=0; d<dondes.length; d++){
                          var donde = dondes[d];
                          data_rango.push([d, rango[donde]]);
                          data_ultimo.push([d, ultimo[donde]]);
                        }                 
                        
                        var data = [
                          {label: l['analisis_grafico_rango']['media'], color: '#cb6018', data: data_rango, bars:{show: true, barWidth: 0.35, order: 0, align: 'left', fill: 1}}, 
                          {label: l['analisis_grafico_rango']['ultimo'], color: '#a3bd31', data: data_ultimo, bars:{show: true, barWidth: 0.35, order: 1, align: 'left', fill: 1}}
                        ];
                        
                        var options = {
                          series: { bars: {show: true, barWidth: 0.7, align: 'left', fill: 1} },
                          xaxis: {ticks: [[0, l['analisis_grafico_rango']['fondo']], [1, l['analisis_grafico_rango']['pantano']], [2, l['analisis_grafico_rango']['red']]], color: '#333', tickColor: '#f6f6f7', font: {size: 20}},
                          yaxis: {min: 0, minTickSize: 1, tickFormatter: (function formatter(val, axis){ return Math.round(parseFloat(val)) + '%'; }), color: '#333', tickColor: '#d5d5d5'},
                          legend: {show: false},
                          grid: {show: true, borderColor: '#f6f6f7'}
                        };

                        graficas['evolucion_donde_' + r.accion] = {'data': data, 'options': options};

                      });

                    }

                  }
              
                }); // fin calculo golpes totales

              }

            }

          }

        }

      });
    });
  });

  $('.mover.izquierda').click(function(){ 
    i_ficha--; if(i_ficha < 0) i_ficha = fichas.length - 1;
    $('.ficha').hide();
    $('.ficha.' + fichas[i_ficha]).show({'duration': 0, 'done': function(){ mostrar_grafica_rango(fichas[i_ficha]); }});
  });

  $('.mover.derecha').click(function(){ 
    i_ficha++; if(i_ficha == fichas.length) i_ficha = 0;
    $('.ficha').hide();
    $('.ficha.' + fichas[i_ficha]).show({'duration': 0, 'done': function(){ mostrar_grafica_rango(fichas[i_ficha]); }});
  });

  $('.ficha').hide();

  $('.ayuda').click(function(){ 
    var ayuda = window.localStorage.getItem('ayuda');
    if(ayuda != 'guia_rapida' && ayuda != 'ayuda_completa'){
      ayuda = 'guia_rapida';
      window.localStorage.setItem('ayuda', 'guia_rapida');
    }
    switch(ayuda){
      case 'guia_rapida':
        $('.popup_ayuda .guia_rapida').show();
        $('.popup_ayuda .ayuda_completa').hide();
      break;
      case 'ayuda_completa':
        $('.popup_ayuda .guia_rapida').hide();
        $('.popup_ayuda .ayuda_completa').show();
      break;
    }
    popup('.popup_ayuda'); 
  });
  $('.popup_ayuda .cambio_ayuda').click(function(){
    var ayuda = window.localStorage.getItem('ayuda');
    if(ayuda != 'guia_rapida' && ayuda != 'ayuda_completa'){
      ayuda = 'guia_rapida';
      window.localStorage.setItem('ayuda', 'guia_rapida');
    }
    switch(ayuda){
      case 'guia_rapida': ayuda = 'ayuda_completa'; break;
      case 'ayuda_completa': ayuda = 'guia_rapida'; break;
    }
    window.localStorage.setItem('ayuda', ayuda);
    $('.popup_ayuda .guia_rapida, .popup_ayuda .ayuda_completa').toggle();
  });

}

function mostrado_analisis_grafico_rango(){
  redimensionar_contenido('analisis_grafico_rango');
  secuencia_inicio++; if(secuencia_inicio >= 2){ $('.ficha.resumen').show(); mostrar_grafica_rango('resumen'); }
}

function mostrar_grafica_rango(selector){
  if($('.ficha.' + selector + ' .grafica').html() == '' && graficas[selector] != ''){
    $.plot('.ficha.' + selector + ' .grafica', graficas[selector].data, graficas[selector].options);
  } 
}

// codificación utf8

l['analisis_grafico_rango'] = {};

l['analisis_grafico_rango']['titulo'] = 'Análisis Gráfico';

l['analisis_grafico_rango']['resumen'] = 'Resumen del Rango de Partidos';
l['analisis_grafico_rango']['evolucion_golpes'] = 'Evolución de Partidos - Golpes Finales';
l['analisis_grafico_rango']['evolucion_servicio'] = 'Evolución de Partidos - Servicio';
l['analisis_grafico_rango']['evolucion_coeficiente'] = 'Evolución de Partidos - Coeficiente padelstat';
l['analisis_grafico_rango']['evolucion_enf'] = 'Evolución de Partidos - Errores No Forzados';
l['analisis_grafico_rango']['evolucion_ef'] = 'Evolución de Partidos - Errores Forzados';
l['analisis_grafico_rango']['evolucion_pg'] = 'Evolución de Partidos - Puntos Ganados';
l['analisis_grafico_rango']['evolucion_golpes_enf'] = 'Evolución de Golpes Finales - ENF';
l['analisis_grafico_rango']['evolucion_golpes_ef'] = 'Evolución de Golpes Finales - EF';
l['analisis_grafico_rango']['evolucion_golpes_pg'] = 'Evolución de Golpes Finales - PG';
l['analisis_grafico_rango']['evolucion_partidos'] = 'Evolución de Partidos';

l['analisis_grafico_rango']['enf'] = 'ENF';
l['analisis_grafico_rango']['ef'] = 'EF';
l['analisis_grafico_rango']['pg'] = 'PG';

l['analisis_grafico_rango']['saque_1'] = 'Primer Saque';
l['analisis_grafico_rango']['saque_2'] = 'Segundo Saque';
l['analisis_grafico_rango']['breaks'] = 'Breaks';

l['analisis_grafico_rango']['coeficiente_ps'] = 'Coeficiente ps';

l['analisis_grafico_rango']['err_no_forzado'] = 'Err. No Forzado';
l['analisis_grafico_rango']['err_forzado'] = 'Error Forzado';
l['analisis_grafico_rango']['punto_ganado'] = 'Punto Ganado';

l['analisis_grafico_rango']['servicio'] = 'Servicio';
l['analisis_grafico_rango']['resto'] = 'Resto';
l['analisis_grafico_rango']['bote_p'] = 'Bote P.';
l['analisis_grafico_rango']['directo'] = 'Directo';
l['analisis_grafico_rango']['volea'] = 'Volea';
l['analisis_grafico_rango']['bandeja'] = 'Bandeja';
l['analisis_grafico_rango']['s_pared'] = 'S.Pared';
l['analisis_grafico_rango']['smash'] = 'Smash';
l['analisis_grafico_rango']['globo'] = 'Globo';

l['analisis_grafico_rango']['drive'] = 'Drive';
l['analisis_grafico_rango']['reves'] = 'Revés';

l['analisis_grafico_rango']['fondo'] = 'Fondo';
l['analisis_grafico_rango']['pantano'] = 'Pantano';
l['analisis_grafico_rango']['red'] = 'Red';

l['analisis_grafico_rango']['partidos'] = 'Partidos';
l['analisis_grafico_rango']['sets'] = 'Sets';
l['analisis_grafico_rango']['juegos'] = 'Juegos';

l['analisis_grafico_rango']['ganados'] = 'Ganados';
l['analisis_grafico_rango']['perdidos'] = 'Perdidos';

l['analisis_grafico_rango']['media'] = 'Media';
l['analisis_grafico_rango']['ultimo'] = 'último';


// JavaScript Document

function inicio_desarrollado_por(){

  $('#desarrollado_por .boton_volver').click(function(){
    mostrar_pagina('ajustes');
  });

}

function mostrado_desarrollado_por(){
  redimensionar_contenido('desarrollado_por');
}

// codificación utf8

l['desarrollado_por'] = {};

l['desarrollado_por']['titulo'] = 'Desarrollado por ...';


// JavaScript Document

var jugador_foto = null;
var jugador_propietario = false;

function inicio_jugador(){

  jugador_foto = null;
  jugador_propietario = false;

  $('#jugador .input_foto').click(function(){ 
    navigator.camera.getPicture(
      function(img){ 
        jugador_foto = img;
        var foto = document.getElementById('foto');
        foto.src = "data:image/jpeg;charset=utf-8;base64," + img;
      }, 
      function(e){ console.log('error tomando foto: ' + e); }, 
      {targetWidth: 200, targetHeight: 200, quality: 75, correctOrientation: true, mediaType: Camera.MediaType.PICTURE, encodingType: Camera.EncodingType.JPEG, destinationType: Camera.DestinationType.DATA_URL}
    ); 
  });  

  $('.registro').click(function(){

    var nombre = ucwords($('#nombre').val().trim());
    var apellidos = ucwords($('#apellidos').val().trim());
    var nivel = $('#nivel').val();
    var telefono = $('#telefono').val().trim();
    var email = $('#email').val().trim();
    var observaciones = $('#observaciones').val().trim();
    
    if(nombre == ''){ notificacion(l['jugador']['nombre_vacio']); return false; } 
    if(apellidos == ''){ notificacion(l['jugador']['apellidos_vacio']); return false; } 
    if(email != '' && !validar_email(email)){ notificacion(l['jugador']['email_invalido']); return false; }
    
    $('#jugador .registro').addClass('inactivo');

    switch(accion_agenda){
      case 'nuevo_jugador':
        db.transaction(function (tx){
          var id = md5(new Date().getTime().toString() + device.uuid);
          tx.executeSql('insert into jugadores (id, nombre, apellidos, nivel, fiabilidad, telefono, email, foto, activo, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, "si", ?)', [id, nombre, apellidos, nivel, 0, telefono, email, jugador_foto, observaciones], 
            function(tx, results){ 
              switch(preparacion_jugador_seleccionado){
                case '1': preparacion_partido.jugador_1 = id; break;
                case '2': preparacion_partido.jugador_2 = id; break;
                case '3': preparacion_partido.jugador_3 = id; break;
                case '4': preparacion_partido.jugador_4 = id; break;
              }
              mostrar_pagina('preparacion');
              sincronizar_agenda(true); 
            }, 
            function(tx, error){ console.log(error.message); mostrar_pagina('agenda'); }
          );
          jugador_foto = "";
        });
      break;
      case 'editar_jugador':
      case 'nuevo_jugador_alias':
        db.transaction(function (tx){
          tx.executeSql('update jugadores set nombre=?, apellidos=?, nivel=?, telefono=?, email=?, foto=?, observaciones=? where id=?', [nombre, apellidos, nivel, telefono, email, jugador_foto, observaciones, jugador_seleccionado], 
            function(tx, results){ 
              if(accion_agenda == 'nuevo_jugador_alias'){
                switch(preparacion_jugador_seleccionado){
                  case '1': preparacion_partido.jugador_1 = jugador_seleccionado; break;
                  case '2': preparacion_partido.jugador_2 = jugador_seleccionado; break;
                  case '3': preparacion_partido.jugador_3 = jugador_seleccionado; break;
                  case '4': preparacion_partido.jugador_4 = jugador_seleccionado; break;
                }
                mostrar_pagina('preparacion');
              } else mostrar_pagina('agenda'); 
              sincronizar_agenda(true); 
            }, 
            function(tx, error){ console.log(error.message); 
          });
          jugador_foto = "";
        });
      break;
      default:
        mostrar_pagina('agenda');
    }

  });

  if(accion_agenda == 'nuevo_jugador'){
    if(window.localStorage.getItem('ayuda_alta_jugador') == null){
      window.localStorage.setItem('ayuda_alta_jugador', 1);
      $('#jugador .overlay').show();
      $('#jugador .flash_ayuda').show();
      $('#jugador .flash_ayuda .cerrar').click(function(){ $('#jugador .flash_ayuda').hide(); $('#jugador .overlay').hide(); });
    }
  }

}

function mostrado_jugador(){
  redimensionar_contenido('jugador');

  $('#jugador .nivel').scroller($.extend({preset: 'select'}, {
    label: l['nivel'], cancelText: l['cancelar'], setText: l['aceptar'],
    theme: 'android-ics', lang: 'es', mode: 'mixed', display: 'modal', animate: 'none',
    onShow: function(){ centrar_mobiscroll(); $('.select_nivel').addClass('focus'); },
    onClose: function(){ $('.select_nivel').removeClass('focus'); }
  }));
  $('#jugador .select_nivel input').click(function(e){ $('#jugador .nivel').mobiscroll('getInst').show(); });

  switch(accion_agenda){
    case 'nuevo_jugador':
      $('#titulo').html(l['jugador']['titulo_nuevo']);
    break;
    case 'nuevo_jugador_alias':
    case 'editar_jugador':
      db.transaction(function(tx){
        tx.executeSql('select * from jugadores where id=?', [jugador_seleccionado], function (tx, results) {
          if(results.rows.length == 1){
            var jugador = results.rows.item(0);
            $('#alias').html(jugador.alias);
            $('#nombre').val(jugador.nombre);
            $('#apellidos').val(jugador.apellidos);
            $('#nivel').scroller('setValue', [jugador.nivel], true);
            $('#telefono').val(jugador.telefono);
            $('#email').val(jugador.email);
            $('#observaciones').val(jugador.observaciones);
            if(jugador.id.substr(-1) == '*'){
              $('#nombre').attr('disabled', 'disabled');
              $('#apellidos').attr('disabled', 'disabled');
              $('#nivel').mobiscroll('disable');
            }
            if(jugador.foto != '' && jugador.foto != null) {
              jugador_foto = jugador.foto;
              var foto = document.getElementById('foto');
              foto.src = "data:image/jpeg;charset=utf-8;base64," + jugador.foto;
            }
          } else mostrar_pagina('agenda');
        });
      });
    break;
  }

}

// codificación utf8

l['jugador'] = {};

l['jugador']['titulo'] = 'Ficha de jugador';
l['jugador']['titulo_nuevo'] = 'Alta de jugador';

l['jugador']['nombre'] = 'Nombre';
l['jugador']['apellidos'] = 'Apellidos';
l['jugador']['nivel'] = 'Nivel';
l['jugador']['nivel_7'] = '7 Profesional alto';
l['jugador']['nivel_65'] = '6.5 Profesional';
l['jugador']['nivel_6'] = '6 Profesional';
l['jugador']['nivel_55'] = '5.5 Amateur alto';
l['jugador']['nivel_5'] = '5 Amateur alto';
l['jugador']['nivel_45'] = '4.5 Amateur medio';
l['jugador']['nivel_4'] = '4 Amateur medio';
l['jugador']['nivel_35'] = '3.5 Amateur bajo';
l['jugador']['nivel_3'] = '3 Amateur bajo';
l['jugador']['nivel_25'] = '2.5 Iniciado';
l['jugador']['nivel_2'] = '2 Iniciado';
l['jugador']['nivel_15'] = '1.5 Principiante';
l['jugador']['nivel_1'] = '1 Principiante';
l['jugador']['telefono'] = 'Teléfono';
l['jugador']['email'] = 'Email';
l['jugador']['notas'] = 'Notas';

l['jugador']['nombre_vacio'] = 'El nombre no puede estar en blanco';
l['jugador']['apellidos_vacio'] = 'Los apellidos no pueden estar en blanco';
l['jugador']['email_invalido'] = 'El email no es válido';



// JavaScript Document

var i_ficha = 0;
var fichas = ['resumen', 'resumen_2', 'analisis_enf', 'analisis_enf_2', 'analisis_ef', 'analisis_ef_2', 'analisis_pg', 'analisis_pg_2'];

function inicio_analisis_numerico_rango(){

  $('.rango').val(l['analisis_numerico_rango'][analisis_rango_seleccion]);

  $('.boton.grafico').click(function(){ mostrar_pagina('analisis_grafico_rango'); });
  $('.boton.numerico, .linea .porcentaje').hide();
  $('.boton.porcentaje, .boton.numerico').click(function(){
    $('.boton.porcentaje, .boton.numerico').toggle();
    $('.linea .porcentaje, .linea .numerico').toggle();
  });
  $('.boton.compartir').click(function(){ compartir_pantalla(); });

  $('.ficha').hide();
  $('.ficha.resumen').show();

  i_ficha = 0;
  fichas = ['resumen', 'resumen_2', 'analisis_enf', 'analisis_enf_2', 'analisis_ef', 'analisis_ef_2', 'analisis_pg', 'analisis_pg_2'];

  var licencia = window.localStorage.getItem('usuario_licencia');
  if(licencia == 'free' || licencia == 'basic'){
    fichas.remove('analisis_enf');
    fichas.remove('analisis_enf_2');
    fichas.remove('analisis_ef');
    fichas.remove('analisis_ef_2');
    fichas.remove('analisis_pg');
    fichas.remove('analisis_pg_2');
  }

  $('.mover.izquierda').click(function(){ 
    i_ficha--; if(i_ficha < 0) i_ficha = fichas.length - 1;
    $('.ficha').hide();
    $('.ficha.' + fichas[i_ficha]).show();
  });

  $('.mover.derecha').click(function(){ 
    i_ficha++; if(i_ficha == fichas.length) i_ficha = 0;
    $('.ficha').hide();
    $('.ficha.' + fichas[i_ficha]).show();
  });

  $('.ayuda').click(function(){ 
    var ayuda = window.localStorage.getItem('ayuda');
    if(ayuda != 'guia_rapida' && ayuda != 'ayuda_completa'){
      ayuda = 'guia_rapida';
      window.localStorage.setItem('ayuda', 'guia_rapida');
    }
    switch(ayuda){
      case 'guia_rapida':
        $('.popup_ayuda .guia_rapida').show();
        $('.popup_ayuda .ayuda_completa').hide();
      break;
      case 'ayuda_completa':
        $('.popup_ayuda .guia_rapida').hide();
        $('.popup_ayuda .ayuda_completa').show();
      break;
    }
    popup('.popup_ayuda'); 
  });
  $('.popup_ayuda .cambio_ayuda').click(function(){
    var ayuda = window.localStorage.getItem('ayuda');
    if(ayuda != 'guia_rapida' && ayuda != 'ayuda_completa'){
      ayuda = 'guia_rapida';
      window.localStorage.setItem('ayuda', 'guia_rapida');
    }
    switch(ayuda){
      case 'guia_rapida': ayuda = 'ayuda_completa'; break;
      case 'ayuda_completa': ayuda = 'guia_rapida'; break;
    }
    window.localStorage.setItem('ayuda', ayuda);
    $('.popup_ayuda .guia_rapida, .popup_ayuda .ayuda_completa').toggle();
  });

  var desde = new Date();
  switch(analisis_rango_seleccion){
    case 'ultima_semana': desde.setDate(desde.getDate() - 7); break;
    case 'ultimo_mes': desde.setMonth(desde.getMonth() - 1); break;
    case 'ultimos_3_meses': desde.setMonth(desde.getMonth() - 3); break;
    case 'ultimos_6_meses': desde.setMonth(desde.getMonth() - 4); break;
    case 'ultimo_anyo': desde.setYear(desde.getYear() - 1); break;
    default: desde = '0000-00-00';
  }

  if(desde != '0000-00-00') desde = desde.getFullYear().toString() + '-' + (desde.getMonth() + 1).toString().lpad('0', 2) + '-' + desde.getDate().toString().lpad('0', 2);
  
  db.transaction(function(tx){
    
    var sql = "select p.*, count(a.accion) as n_acciones from partidos p left join acciones a on a.id_partido=p.id where p.fecha >= '" + desde + "' and (p.id_jugador_1 like '%*' or p.id_jugador_2 like '%*' or p.id_jugador_3 like '%*' or p.id_jugador_4 like '%*') and (a.accion='enf' or a.accion='ef' or a.accion='pg') and a.golpe!='' group by p.id order by p.fecha asc, p.hora asc ";
    tx.executeSql(sql, [], function(tx, results){

      var partidos_profundos = [];
      var id_ultimo_partido_profundo = 0;

      for(var i=0; i<results.rows.length; i++){

        var partido = results.rows.item(i);
        var marcador = { 'sets': 0, 'juegos': 0, 'local': 0, 'visitante': 0, 'set_1': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_2': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_3': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_4': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_5': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 } };

        marcador.sets = parseInt(partido.sets);
        marcador.juegos = parseInt(partido.juegos);
        marcador.set_1.local = parseInt(partido.marcador_set1_local);
        marcador.set_1.visitante = parseInt(partido.marcador_set1_visitante);
        marcador.set_1.inicio.local = parseInt(partido.marcador_set1_local);
        marcador.set_1.inicio.visitante = parseInt(partido.marcador_set1_visitante);
        marcador.set_2.local = parseInt(partido.marcador_set2_local);
        marcador.set_2.visitante = parseInt(partido.marcador_set2_visitante);
        marcador.set_2.inicio.local = parseInt(partido.marcador_set3_local);
        marcador.set_2.inicio.visitante = parseInt(partido.marcador_set3_visitante);
        marcador.set_3.local = parseInt(partido.marcador_set3_local);
        marcador.set_3.visitante = parseInt(partido.marcador_set3_visitante);
        marcador.set_3.inicio.local = parseInt(partido.marcador_set3_local);
        marcador.set_3.inicio.visitante = parseInt(partido.marcador_set3_visitante);
        marcador.set_4.local = parseInt(partido.marcador_set4_local);
        marcador.set_4.visitante = parseInt(partido.marcador_set4_visitante);
        marcador.set_4.inicio.local = parseInt(partido.marcador_set4_local);
        marcador.set_4.inicio.visitante = parseInt(partido.marcador_set4_visitante);
        marcador.set_5.local = parseInt(partido.marcador_set5_local);
        marcador.set_5.visitante = parseInt(partido.marcador_set5_visitante);
        marcador.set_5.inicio.local = parseInt(partido.marcador_set5_local);
        marcador.set_5.inicio.visitante = parseInt(partido.marcador_set5_visitante);

        if(marcador_valido(marcador)){
          partidos_profundos.push(partido.id);
          id_ultimo_partido_profundo = partido.id;
        }

      }

      //var sql = "select * from partidos where fecha >= '" + desde + "' and (id_jugador_1 like '%*' or id_jugador_2 like '%*' or id_jugador_3 like '%*' or id_jugador_4 like '%*') order by fecha asc, hora asc";    
      var sql = "select p.*, count(a.accion) as n_acciones from partidos p left join acciones a on a.id_partido=p.id where p.fecha >= '" + desde + "' and (p.id_jugador_1 like '%*' or p.id_jugador_2 like '%*' or p.id_jugador_3 like '%*' or p.id_jugador_4 like '%*') and (a.accion='enf' or a.accion='ef' or a.accion='pg') group by p.id order by p.fecha asc, p.hora asc ";
      tx.executeSql(sql, [], function(tx, results){

        if(results.rows.length == 0){
          mostrar_pagina('seleccion_rango');
          notificacion(l['analisis_numerico_rango']['datos_insuficientes']);
        } else {

          var id_ultimo_partido = '';
          var partidos = [];
          var partidos_todos = [];
          var propietario = '';

          for(var i=0; i<results.rows.length; i++){

            var partido = results.rows.item(i);
            var marcador = { 'sets': 0, 'juegos': 0, 'local': 0, 'visitante': 0, 'set_1': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_2': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_3': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_4': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_5': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 } };

            marcador.sets = parseInt(partido.sets);
            marcador.juegos = parseInt(partido.juegos);
            marcador.set_1.local = parseInt(partido.marcador_set1_local);
            marcador.set_1.visitante = parseInt(partido.marcador_set1_visitante);
            marcador.set_1.inicio.local = parseInt(partido.marcador_set1_local);
            marcador.set_1.inicio.visitante = parseInt(partido.marcador_set1_visitante);
            marcador.set_2.local = parseInt(partido.marcador_set2_local);
            marcador.set_2.visitante = parseInt(partido.marcador_set2_visitante);
            marcador.set_2.inicio.local = parseInt(partido.marcador_set3_local);
            marcador.set_2.inicio.visitante = parseInt(partido.marcador_set3_visitante);
            marcador.set_3.local = parseInt(partido.marcador_set3_local);
            marcador.set_3.visitante = parseInt(partido.marcador_set3_visitante);
            marcador.set_3.inicio.local = parseInt(partido.marcador_set3_local);
            marcador.set_3.inicio.visitante = parseInt(partido.marcador_set3_visitante);
            marcador.set_4.local = parseInt(partido.marcador_set4_local);
            marcador.set_4.visitante = parseInt(partido.marcador_set4_visitante);
            marcador.set_4.inicio.local = parseInt(partido.marcador_set4_local);
            marcador.set_4.inicio.visitante = parseInt(partido.marcador_set4_visitante);
            marcador.set_5.local = parseInt(partido.marcador_set5_local);
            marcador.set_5.visitante = parseInt(partido.marcador_set5_visitante);
            marcador.set_5.inicio.local = parseInt(partido.marcador_set5_local);
            marcador.set_5.inicio.visitante = parseInt(partido.marcador_set5_visitante);

            if(marcador_valido(marcador)){
              partidos_todos.push(partido.id);
              if(parseInt(partido.n_acciones) >= 20){
                partidos.push(partido.id);
                id_ultimo_partido = partido.id;
              }
              if(partido.id_jugador_1.substr(-1) == '*') propietario = partido.id_jugador_1;
              if(partido.id_jugador_2.substr(-1) == '*') propietario = partido.id_jugador_2;
              if(partido.id_jugador_3.substr(-1) == '*') propietario = partido.id_jugador_3;
              if(partido.id_jugador_4.substr(-1) == '*') propietario = partido.id_jugador_4;
              if(partido.finalizado == 'no') tx.executeSql("update partidos set finalizado='si' where id=?", [partido.id]);
            }

          }

          if(partidos_todos.length == 0){
            mostrar_pagina('seleccion_rango');
            notificacion(l['analisis_numerico_rango']['datos_insuficientes']);
          } else {

            if(partidos.length == 0){
              fichas.remove('resumen_2');
              fichas.remove('analisis_enf');
              fichas.remove('analisis_enf_2');
              fichas.remove('analisis_ef');
              fichas.remove('analisis_ef_2');
              fichas.remove('analisis_pg');
              fichas.remove('analisis_pg_2');
            }

            var sql_partidos = '(';
            var sql_acciones = '(';
            for(var i=0; i<partidos.length; i++){
              if(sql_partidos != '(') sql_partidos += ' or ';
              if(sql_acciones != '(') sql_acciones += ' or ';
              sql_partidos += "id='" + partidos[i] + "'";
              sql_acciones += "id_partido='" + partidos[i] + "'";
            }
            sql_partidos += ')';
            sql_acciones += ')';
            
            var sql_partidos_todos = '(';
            var sql_acciones_todos = '(';
            for(var i=0; i<partidos_todos.length; i++){
              if(sql_partidos_todos != '(') sql_partidos_todos += ' or ';
              if(sql_acciones_todos != '(') sql_acciones_todos += ' or ';
              sql_partidos_todos += "id='" + partidos_todos[i] + "'";
              sql_acciones_todos += "id_partido='" + partidos_todos[i] + "'";
            }
            sql_partidos_todos += ')';
            sql_acciones_todos += ')';

            var sql_partidos_profundos = '(';
            var sql_acciones_profundos = '(';
            for(var i=0; i<partidos_profundos.length; i++){
              if(sql_partidos_profundos != '(') sql_partidos_profundos += ' or ';
              if(sql_acciones_profundos != '(') sql_acciones_profundos += ' or ';
              sql_partidos_profundos += "id='" + partidos_profundos[i] + "'";
              sql_acciones_profundos += "id_partido='" + partidos_profundos[i] + "'";
            }
            sql_partidos_profundos += ')';
            sql_acciones_profundos += ')';

            tx.executeSql("select distinct id_partido, n_set, n_juego from acciones where " + sql_acciones_todos + " and id>0", [], function(tx, results){
              $('.juegos_registrados').html(results.rows.length);
            });

            // resumen rango

            var sql = "select * from partidos where " + sql_partidos_todos + " order by fecha asc";
            tx.executeSql(sql, [], function(tx, results){

              var c = {'partidos_ganados': [0, 0, 0], 'partidos_perdidos': [0, 0, 0], 'sets_ganados': 0, 'sets_perdidos': 0, 'juegos_ganados': 0, 'juegos_perdidos': 0, 'tie_breaks_ganados': 0, 'tie_breaks_perdidos': 0}; // total, 2 sets, 3 sets

              for(var i=0; i<results.rows.length; i++){
                var partido = results.rows.item(i);

                if(partido.id_jugador_1 == propietario || partido.id_jugador_2 == propietario){ // propietario juega de local
                  if(parseInt(partido.marcador_local) > parseInt(partido.marcador_visitante)){
                    c.partidos_ganados[0]++;
                    if(parseInt(partido.marcador_local) + parseInt(partido.marcador_visitante) == 2) c.partidos_ganados[1]++;
                    if(parseInt(partido.marcador_local) + parseInt(partido.marcador_visitante) == 3) c.partidos_ganados[2]++;
                  }
                  if(parseInt(partido.marcador_visitante) > parseInt(partido.marcador_local)){
                    c.partidos_perdidos[0]++;
                    if(parseInt(partido.marcador_local) + parseInt(partido.marcador_visitante) == 2) c.partidos_perdidos[1]++;
                    if(parseInt(partido.marcador_local) + parseInt(partido.marcador_visitante) == 3) c.partidos_perdidos[2]++;
                  }
                  c.sets_ganados += parseInt(partido.marcador_local);
                  c.sets_perdidos += parseInt(partido.marcador_visitante);
                  c.juegos_ganados += parseInt(partido.marcador_set1_local) + parseInt(partido.marcador_set2_local) + parseInt(partido.marcador_set3_local);
                  c.juegos_perdidos += parseInt(partido.marcador_set1_visitante) + parseInt(partido.marcador_set2_visitante) + parseInt(partido.marcador_set3_visitante);
                  if(parseInt(partido.marcador_set1_local) + parseInt(partido.marcador_set1_visitante) == (parseInt(partido.juegos) * 2) + 1){
                    if(parseInt(partido.marcador_set1_local) > parseInt(partido.marcador_set1_visitante)) c.tie_breaks_ganados++;
                    if(parseInt(partido.marcador_set1_local) < parseInt(partido.marcador_set1_visitante)) c.tie_breaks_perdidos++;
                  }
                  if(parseInt(partido.marcador_set2_local) + parseInt(partido.marcador_set2_visitante) == (parseInt(partido.juegos) * 2) + 1){
                    if(parseInt(partido.marcador_set2_local) > parseInt(partido.marcador_set2_visitante)) c.tie_breaks_ganados++;
                    if(parseInt(partido.marcador_set2_local) < parseInt(partido.marcador_set2_visitante)) c.tie_breaks_perdidos++;
                  }
                  if(parseInt(partido.marcador_set3_local) + parseInt(partido.marcador_set3_visitante) == (parseInt(partido.juegos) * 2) + 1){
                    if(parseInt(partido.marcador_set3_local) > parseInt(partido.marcador_set3_visitante)) c.tie_breaks_ganados++;
                    if(parseInt(partido.marcador_set3_local) < parseInt(partido.marcador_set3_visitante)) c.tie_breaks_perdidos++;
                  }
                }
                if(partido.id_jugador_3 == propietario || partido.id_jugador_4 == propietario){ // propietario juega de visitante
                  if(parseInt(partido.marcador_local) < parseInt(partido.marcador_visitante)){
                    c.partidos_ganados[0]++;
                    if(parseInt(partido.marcador_local) + parseInt(partido.marcador_visitante) == 2) c.partidos_ganados[1]++;
                    if(parseInt(partido.marcador_local) + parseInt(partido.marcador_visitante) == 3) c.partidos_ganados[2]++;
                  }
                  if(parseInt(partido.marcador_visitante) < parseInt(partido.marcador_local)){
                    c.partidos_perdidos[0]++;
                    if(parseInt(partido.marcador_local) + parseInt(partido.marcador_visitante) == 2) c.partidos_perdidos[1]++;
                    if(parseInt(partido.marcador_local) + parseInt(partido.marcador_visitante) == 3) c.partidos_perdidos[2]++;
                  }
                  c.sets_ganados += parseInt(partido.marcador_visitante);
                  c.sets_perdidos += parseInt(partido.marcador_local);
                  c.juegos_ganados += parseInt(partido.marcador_set1_visitante) + parseInt(partido.marcador_set2_visitante) + parseInt(partido.marcador_set3_visitante);
                  c.juegos_perdidos += parseInt(partido.marcador_set1_local) + parseInt(partido.marcador_set2_local) + parseInt(partido.marcador_set3_local);
                  if(parseInt(partido.marcador_set1_local) + parseInt(partido.marcador_set1_visitante) == (parseInt(partido.juegos) * 2) + 1){
                    if(parseInt(partido.marcador_set1_local) < parseInt(partido.marcador_set1_visitante)) c.tie_breaks_ganados++;
                    if(parseInt(partido.marcador_set1_local) > parseInt(partido.marcador_set1_visitante)) c.tie_breaks_perdidos++;
                  }
                  if(parseInt(partido.marcador_set2_local) + parseInt(partido.marcador_set2_visitante) == (parseInt(partido.juegos) * 2) + 1){
                    if(parseInt(partido.marcador_set2_local) < parseInt(partido.marcador_set2_visitante)) c.tie_breaks_ganados++;
                    if(parseInt(partido.marcador_set2_local) > parseInt(partido.marcador_set2_visitante)) c.tie_breaks_perdidos++;
                  }
                  if(parseInt(partido.marcador_set3_local) + parseInt(partido.marcador_set3_visitante) == (parseInt(partido.juegos) * 2) + 1){
                    if(parseInt(partido.marcador_set3_local) < parseInt(partido.marcador_set3_visitante)) c.tie_breaks_ganados++;
                    if(parseInt(partido.marcador_set3_local) > parseInt(partido.marcador_set3_visitante)) c.tie_breaks_perdidos++;
                  }
                }

              }
              
              if(c.partidos_ganados[0] > 0) $('.partidos .ganados.numerico').html(c.partidos_ganados[0]); else $('.partidos .ganados.numerico').html('-');
              if(c.partidos_perdidos[0] > 0) $('.partidos .perdidos.numerico').html(c.partidos_perdidos[0]); else $('.partidos .perdidos.numerico').html('-');
              if(c.partidos_ganados[0] + c.partidos_perdidos[0] > 0) $('.partidos .sumatorio.numerico').html(c.partidos_ganados[0] + c.partidos_perdidos[0]); else $('.partidos .sumatorio.numerico').html('-');

              var total_partidos = c.partidos_ganados[0] + c.partidos_perdidos[0];
              var porcentaje_partidos_ganados = 0;
              var porcentaje_partidos_perdidos = 0;

              if(total_partidos > 0){
                porcentaje_partidos_ganados = Math.round(c.partidos_ganados[0] * 100 / total_partidos);
                porcentaje_partidos_perdidos = Math.round(c.partidos_perdidos[0] * 100 / total_partidos);
              }

              if(porcentaje_partidos_ganados > 0) $('.partidos .ganados.porcentaje').html(porcentaje_partidos_ganados + '%'); else $('.partidos .ganados.porcentaje').html('-');
              if(porcentaje_partidos_perdidos > 0) $('.partidos .perdidos.porcentaje').html(porcentaje_partidos_perdidos + '%'); else $('.partidos .perdidos.porcentaje').html('-');
              if(total_partidos > 0) $('.partidos .sumatorio.porcentaje').html('100%'); else $('.partidos .sumatorio.porcentaje').html('-');

              if(c.partidos_ganados[1] > 0) $('.partidos_2sets .ganados.numerico').html(c.partidos_ganados[1]); else $('.partidos_2sets .ganados.numerico').html('-');
              if(c.partidos_perdidos[1] > 0) $('.partidos_2sets .perdidos.numerico').html(c.partidos_perdidos[1]); else $('.partidos_2sets .perdidos.numerico').html('-');
              if(c.partidos_ganados[1] + c.partidos_perdidos[1] > 0) $('.partidos_2sets .sumatorio.numerico').html(c.partidos_ganados[1] + c.partidos_perdidos[1]); else $('.partidos_2sets .sumatorio.numerico').html('-');

              var porcentaje_partidos_ganados_2sets = 0;
              var porcentaje_partidos_perdidos_2sets = 0;
              var porcentaje_partidos_2sets = 0;

              if(total_partidos > 0){
                porcentaje_partidos_ganados_2sets = Math.round(c.partidos_ganados[1] * 100 / total_partidos);
                porcentaje_partidos_perdidos_2sets = Math.round(c.partidos_perdidos[1] * 100 / total_partidos);
                porcentaje_partidos_2sets = Math.round((c.partidos_ganados[1] + c.partidos_perdidos[1]) * 100 / total_partidos);
              }

              if(porcentaje_partidos_ganados_2sets > 0) $('.partidos_2sets .ganados.porcentaje').html(porcentaje_partidos_ganados_2sets + '%'); else $('.partidos_2sets .ganados.porcentaje').html('-');
              if(porcentaje_partidos_perdidos_2sets > 0) $('.partidos_2sets .perdidos.porcentaje').html(porcentaje_partidos_perdidos_2sets + '%'); else $('.partidos_2sets .perdidos.porcentaje').html('-');
              if(porcentaje_partidos_2sets > 0) $('.partidos_2sets .sumatorio.porcentaje').html(porcentaje_partidos_2sets + '%'); else $('.partidos_2sets .sumatorio.porcentaje').html('-');

              if(c.partidos_ganados[2] > 0) $('.partidos_3sets .ganados.numerico').html(c.partidos_ganados[2]); else $('.partidos_3sets .ganados.numerico').html('-');
              if(c.partidos_perdidos[2] > 0) $('.partidos_3sets .perdidos.numerico').html(c.partidos_perdidos[2]); else $('.partidos_3sets .perdidos.numerico').html('-');
              if(c.partidos_ganados[2] + c.partidos_perdidos[2] > 0) $('.partidos_3sets .sumatorio.numerico').html(c.partidos_ganados[2] + c.partidos_perdidos[2]); else $('.partidos_3sets .sumatorio.numerico').html('-');

              var porcentaje_partidos_ganados_3sets = 0;
              var porcentaje_partidos_perdidos_3sets = 0;
              var porcentaje_partidos_3sets = 0;

              if(total_partidos > 0){
                porcentaje_partidos_ganados_3sets = Math.round(c.partidos_ganados[2] * 100 / total_partidos);
                porcentaje_partidos_perdidos_3sets = Math.round(c.partidos_perdidos[2] * 100 / total_partidos);
                porcentaje_partidos_3sets = Math.round((c.partidos_ganados[2] + c.partidos_perdidos[2]) * 100 / total_partidos);
              }

              if(porcentaje_partidos_ganados_3sets > 0) $('.partidos_3sets .ganados.porcentaje').html(porcentaje_partidos_ganados_3sets + '%'); else $('.partidos_3sets .ganados.porcentaje').html('-');
              if(porcentaje_partidos_perdidos_3sets > 0) $('.partidos_3sets .perdidos.porcentaje').html(porcentaje_partidos_perdidos_3sets + '%'); else $('.partidos_3sets .perdidos.porcentaje').html('-');
              if(porcentaje_partidos_3sets > 0) $('.partidos_3sets .sumatorio.porcentaje').html(porcentaje_partidos_3sets + '%'); else $('.partidos_3sets .sumatorio.porcentaje').html('-');

              if(c.sets_ganados > 0) $('.sets .ganados.numerico').html(c.sets_ganados); else $('.sets .ganados.numerico').html('-');
              if(c.sets_perdidos > 0) $('.sets .perdidos.numerico').html(c.sets_perdidos); else $('.sets .perdidos.numerico').html('-');
              if(c.sets_ganados + c.sets_perdidos > 0) $('.sets .sumatorio.numerico').html(c.sets_ganados + c.sets_perdidos); else $('.sets .sumatorio.numerico').html('-');

              var total_sets = c.sets_ganados + c.sets_perdidos;
              var porcentaje_sets_ganados = 0;
              var porcentaje_sets_perdidos = 0;

              if(total_sets > 0){
                porcentaje_sets_ganados = Math.round(c.sets_ganados * 100 / total_sets);
                porcentaje_sets_perdidos = Math.round(c.sets_perdidos * 100 / total_sets);
              }

              if(porcentaje_sets_ganados > 0) $('.sets .ganados.porcentaje').html(porcentaje_sets_ganados + '%'); else $('.sets .ganados.porcentaje').html('-');
              if(porcentaje_sets_perdidos > 0) $('.sets .perdidos.porcentaje').html(porcentaje_sets_perdidos + '%'); else $('.sets .perdidos.porcentaje').html('-');
              if(total_sets > 0) $('.sets .sumatorio.porcentaje').html('100%'); else $('.sets .sumatorio.porcentaje').html('-');

              if(c.juegos_ganados > 0) $('.juegos .ganados.numerico').html(c.juegos_ganados); else $('.juegos .ganados.numerico').html('-');
              if(c.juegos_perdidos > 0) $('.juegos .perdidos.numerico').html(c.juegos_perdidos); else $('.juegos .perdidos.numerico').html('-');
              if(c.juegos_ganados + c.juegos_perdidos > 0) $('.juegos .sumatorio.numerico').html(c.juegos_ganados + c.juegos_perdidos); else $('.juegos .sumatorio.numerico').html('-');

              var total_juegos = c.juegos_ganados + c.juegos_perdidos;
              var porcentaje_juegos_ganados = 0;
              var porcentaje_juegos_perdidos = 0;

              if(total_juegos > 0){
                porcentaje_juegos_ganados = Math.round(c.juegos_ganados * 100 / total_juegos);
                porcentaje_juegos_perdidos = Math.round(c.juegos_perdidos * 100 / total_juegos);
              }

              if(porcentaje_juegos_ganados > 0) $('.juegos .ganados.porcentaje').html(porcentaje_juegos_ganados + '%'); else $('.juegos .ganados.porcentaje').html('-');
              if(porcentaje_juegos_perdidos > 0) $('.juegos .perdidos.porcentaje').html(porcentaje_juegos_perdidos + '%'); else $('.juegos .perdidos.porcentaje').html('-');
              if(total_juegos > 0) $('.juegos .sumatorio.porcentaje').html('100%'); else $('.juegos .sumatorio.porcentaje').html('-');

              if(c.tie_breaks_ganados > 0) $('.tie_breaks .ganados.numerico').html(c.tie_breaks_ganados); else $('.tie_breaks .ganados.numerico').html('-');
              if(c.tie_breaks_perdidos > 0) $('.tie_breaks .perdidos.numerico').html(c.tie_breaks_perdidos); else $('.tie_breaks .perdidos.numerico').html('-');
              if(c.tie_breaks_ganados + c.tie_breaks_perdidos > 0) $('.tie_breaks .sumatorio.numerico').html(c.tie_breaks_ganados + c.tie_breaks_perdidos); else $('.tie_breaks .sumatorio.numerico').html('-');

              var total_tie_breaks = c.tie_breaks_ganados + c.tie_breaks_perdidos;
              var porcentaje_tie_breaks_ganados = 0;
              var porcentaje_tie_breaks_perdidos = 0;

              if(total_tie_breaks > 0){
                porcentaje_tie_breaks_ganados = Math.round(c.tie_breaks_ganados * 100 / total_tie_breaks);
                porcentaje_tie_breaks_perdidos = Math.round(c.tie_breaks_perdidos * 100 / total_tie_breaks);
              }

              if(porcentaje_tie_breaks_ganados > 0) $('.tie_breaks .ganados.porcentaje').html(porcentaje_tie_breaks_ganados + '%'); else $('.tie_breaks .ganados.porcentaje').html('-');
              if(porcentaje_tie_breaks_perdidos > 0) $('.tie_breaks .perdidos.porcentaje').html(porcentaje_tie_breaks_perdidos + '%'); else $('.tie_breaks .perdidos.porcentaje').html('-');
              if(total_tie_breaks > 0) $('.tie_breaks .sumatorio.porcentaje').html('100%'); else $('.tie_breaks .sumatorio.porcentaje').html('-');

            });

            // resumen pagina 2

            var sql = "select ";
            sql += "(select count(*) from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='enf' and golpe != 'saque_1' and golpe != 'saque_2') as enf, ";
            sql += "(select count(*) from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='ef' and golpe != 'saque_1' and golpe != 'saque_2') as ef, ";
            sql += "(select count(*) from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='pg') as pg, ";
            sql += "(select count(*) from acciones where " + sql_acciones + " and accion='enf' and golpe != 'saque_1' and golpe != 'saque_2') as total_enf, ";
            sql += "(select count(*) from acciones where " + sql_acciones + " and accion='ef' and golpe != 'saque_1' and golpe != 'saque_2') as total_ef, ";
            sql += "(select count(*) from acciones where " + sql_acciones + " and accion='pg') as total_pg";
            

            tx.executeSql(sql, [], function(tx, results){
            
              var p = results.rows.item(0);
              var total_puntos = Math.round((parseInt(p.total_enf) + parseInt(p.total_ef) + parseInt(p.total_pg)) / partidos.length);

              var media_enf = Math.round(parseInt(p.enf) / partidos.length);
              var media_ef = Math.round(parseInt(p.ef) / partidos.length);
              var media_pg = Math.round(parseInt(p.pg) / partidos.length)

              if(total_puntos > 0) $('.resumen_2 .puntos_registrados .media.numerico').html(total_puntos); else $('.resumen_2 .puntos_registrados .media.numerico').html('-');
              if(media_enf > 0) $('.resumen_2 .enf .media.numerico').html(media_enf); else $('.resumen_2 .enf .media.numerico').html('-');
              if(media_ef > 0) $('.resumen_2 .ef .media.numerico').html(media_ef); else $('.resumen_2 .ef .media.numerico').html('-');
              if(media_pg > 0) $('.resumen_2 .pg .media.numerico').html(media_pg); else $('.resumen_2 .pg .media.numerico').html('-');

              var porcentaje_enf = 0;
              var porcentaje_ef = 0;
              var porcentaje_pg = 0;
              if(total_puntos > 0){
                porcentaje_enf = Math.round(media_enf * 100 / total_puntos);
                porcentaje_ef = Math.round(media_ef * 100 / total_puntos);
                porcentaje_pg = Math.round(media_pg * 100 / total_puntos);
              }

              if(total_puntos > 0) $('.resumen_2 .puntos_registrados .media.porcentaje').html('100%'); else $('.resumen_2 .puntos_registrados .media.porcentaje').html('-');
              if(porcentaje_enf > 0) $('.resumen_2 .enf .media.porcentaje').html(porcentaje_enf + '%'); else $('.resumen_2 .enf .media.porcentaje').html('-');
              if(porcentaje_ef > 0) $('.resumen_2 .ef .media.porcentaje').html(porcentaje_ef + '%'); else $('.resumen_2 .ef .media.porcentaje').html('-');
              if(porcentaje_pg > 0) $('.resumen_2 .pg .media.porcentaje').html(porcentaje_pg + '%'); else $('.resumen_2 .pg .media.porcentaje').html('-');

            });

            var sql = "select ";
            sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='enf' and golpe != 'saque_1' and golpe != 'saque_2') as enf, ";
            sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='ef' and golpe != 'saque_1' and golpe != 'saque_2') as ef, ";
            sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='pg') as pg, ";
            sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and accion='enf' and golpe != 'saque_1' and golpe != 'saque_2') as total_enf, ";
            sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and accion='ef' and golpe != 'saque_1' and golpe != 'saque_2') as total_ef, ";
            sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and accion='pg') as total_pg";
            tx.executeSql(sql, [], function(tx, results){

              var p = results.rows.item(0);
              var total_puntos = parseInt(p.total_enf) + parseInt(p.total_ef) + parseInt(p.total_pg);
              
              if(total_puntos > 0) $('.resumen_2 .puntos_registrados .rango.numerico').html(total_puntos); else $('.resumen_2 .puntos_registrados .rango.numerico').html('-');
              if(parseInt(p.enf) > 0) $('.resumen_2 .enf .rango.numerico').html(p.enf); else $('.resumen_2 .enf .rango.numerico').html('-');
              if(parseInt(p.ef) > 0) $('.resumen_2 .ef .rango.numerico').html(p.ef); else $('.resumen_2 .ef .rango.numerico').html('-');
              if(parseInt(p.pg) > 0) $('.resumen_2 .pg .rango.numerico').html(p.pg); else $('.resumen_2 .pg .rango.numerico').html('-');

              var porcentaje_enf = 0;
              var porcentaje_ef = 0;
              var porcentaje_pg = 0;
              if(total_puntos > 0){
                porcentaje_enf = Math.round(parseInt(p.enf) * 100 / total_puntos);
                porcentaje_ef = Math.round(parseInt(p.ef) * 100 / total_puntos);
                porcentaje_pg = Math.round(parseInt(p.pg) * 100 / total_puntos);
              }

              if(total_puntos > 0) $('.resumen_2 .puntos_registrados .rango.porcentaje').html('100%'); else $('.resumen_2 .puntos_registrados .rango.porcentaje').html('-');
              if(porcentaje_enf > 0) $('.resumen_2 .enf .rango.porcentaje').html(porcentaje_enf + '%'); else $('.resumen_2 .enf .rango.porcentaje').html('-');
              if(porcentaje_ef > 0) $('.resumen_2 .ef .rango.porcentaje').html(porcentaje_ef + '%'); else $('.resumen_2 .ef .rango.porcentaje').html('-');
              if(porcentaje_pg > 0) $('.resumen_2 .pg .rango.porcentaje').html(porcentaje_pg + '%'); else $('.resumen_2 .pg .rango.porcentaje').html('-');

            });

            
            // saques

            /*
            tx.executeSql("select * from partidos where " + sql_partidos + " order by fecha asc", [], function(tx, results){

              var rango_saque_1 = [0, 0];
              var rango_saque_2 = [0, 0];

              for(var i=0; i<results.rows.length; i++){
              
                var p = results.rows.item(i);        
                var n = 0;
                if(p.id_jugador_1 == propietario) n = 1;
                if(p.id_jugador_2 == propietario) n = 2;
                if(p.id_jugador_3 == propietario) n = 3;
                if(p.id_jugador_4 == propietario) n = 4;

                var sql = "select ";
                sql += "(select count(*) from acciones where id_partido='" + p.id + "' and saque=" + n + " and accion!='') as acciones, ";
                sql += "(select count(*) from acciones where id_partido='" + p.id + "' and saque=" + n + " and (accion='enf' or accion='ef') and golpe='saque_1' and n_jugador='" + n + "') as fallos_saque_1, ";
                sql += "(select count(*) from acciones where id_partido='" + p.id + "' and saque=" + n + " and (accion='enf' or accion='ef') and golpe='saque_2' and n_jugador='" + n + "') as fallos_saque_2";

                tx.executeSql(sql, [], function(tx, results){

                  var r = results.rows.item(0);        
                  rango_saque_1[0] += parseInt(r.acciones) - parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_1);
                  rango_saque_1[1] += parseInt(r.acciones) - parseInt(r.fallos_saque_1);
                  rango_saque_2[0] += parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_2);
                  rango_saque_2[1] += parseInt(r.fallos_saque_1);
                  $('.resumen_2 .saque_1 .numerico.media').html(Math.round(rango_saque_1[0] / partidos.length) + '/' + Math.round(rango_saque_1[1] / partidos.length));
                  $('.resumen_2 .saque_2 .numerico.media').html(Math.round(rango_saque_2[0] / partidos.length) + '/' + Math.round(rango_saque_2[1] / partidos.length));

                  if(Math.round(rango_saque_1[1] / partidos.length) > 0) $('.resumen_2 .saque_1 .porcentaje.media').html(Math.round(Math.round(rango_saque_1[0] / partidos.length) / Math.round(rango_saque_1[1] / partidos.length) * 100) + '%');
                  else $('.resumen_2 .saque_1 .porcentaje.media').html('0%');
                  if(Math.round(rango_saque_2[1] / partidos.length) > 0) $('.resumen_2 .saque_2 .porcentaje.media').html(Math.round(Math.round(rango_saque_2[0] / partidos.length) / Math.round(rango_saque_2[1] / partidos.length) * 100) + '%');
                  else $('.resumen_2 .saque_2 .porcentaje.media').html('0%');
                  
                });

              }

            });

            tx.executeSql("select * from partidos where id=?", [id_ultimo_partido], function(tx, results){
              
              var p = results.rows.item(0);        
              var n = 0;
              if(p.id_jugador_1 == propietario) n = 1;
              if(p.id_jugador_2 == propietario) n = 2;
              if(p.id_jugador_3 == propietario) n = 3;
              if(p.id_jugador_4 == propietario) n = 4;

              var sql = "select ";
              sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and saque=" + n + " and accion!='') as acciones, ";
              sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and saque=" + n + " and (accion='enf' or accion='ef') and golpe='saque_1' and n_jugador='" + n + "') as fallos_saque_1, ";
              sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and saque=" + n + " and (accion='enf' or accion='ef') and golpe='saque_2' and n_jugador='" + n + "') as fallos_saque_2";

              tx.executeSql(sql, [], function(tx, results){

                var r = results.rows.item(0);        
                $('.resumen_2 .saque_1 .numerico.rango').html((parseInt(r.acciones) - parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_1)) + '/' + (parseInt(r.acciones) - parseInt(r.fallos_saque_1)));
                $('.resumen_2 .saque_2 .numerico.rango').html((parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_2)) + '/' + parseInt(r.fallos_saque_1));
                
                if(parseInt(r.acciones) - parseInt(r.fallos_saque_1) > 0) $('.resumen_2 .saque_1 .porcentaje.rango').html(Math.round((parseInt(r.acciones) - parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_1)) / (parseInt(r.acciones) - parseInt(r.fallos_saque_1)) * 100) + '%');
                else $('.resumen_2 .saque_1 .porcentaje.rango').html('0%');
                if(parseInt(r.fallos_saque_1) > 0) $('.resumen_2 .saque_2 .porcentaje.rango').html(Math.round((parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_2)) / parseInt(r.fallos_saque_1) * 100) + '%');
                else $('.resumen_2 .saque_2 .porcentaje.rango').html('0%');

              });

            });
            */

            tx.executeSql("select * from partidos where " + sql_partidos + " order by fecha asc", [], function(tx, results){

              var rango_saque_1 = [0, 0];
              var rango_saque_2 = [0, 0];

              for(var i=0; i<results.rows.length; i++){

                var p = results.rows.item(i);        
                var n = 0;
                if(p.id_jugador_1 == propietario) n = 1;
                if(p.id_jugador_2 == propietario) n = 2;
                if(p.id_jugador_3 == propietario) n = 3;
                if(p.id_jugador_4 == propietario) n = 4;

                var sql = "select ";
                sql += "(select count(*) from acciones where id_partido='" + p.id + "' and saque=" + n + " and (accion='pg' or accion='ef' or accion='enf')) as acciones, ";
                sql += "(select count(*) from acciones where id_partido='" + p.id + "' and saque=" + n + " and (accion='enf' or accion='ef') and golpe='saque_1' and n_jugador='" + n + "') as fallos_saque_1, ";
                sql += "(select count(*) from acciones where id_partido='" + p.id + "' and saque=" + n + " and (accion='enf' or accion='ef') and golpe='saque_2' and n_jugador='" + n + "') as fallos_saque_2";

                tx.executeSql(sql, [], function(tx, results){

                  var r = results.rows.item(0);        
                  rango_saque_1[0] += parseInt(r.acciones) - parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_1);
                  rango_saque_1[1] += parseInt(r.acciones) - parseInt(r.fallos_saque_1);
                  rango_saque_2[0] += parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_2);
                  rango_saque_2[1] += parseInt(r.fallos_saque_1);

                  var primeros = Math.round(rango_saque_1[0] / partidos.length);
                  if(primeros < 0) primeros = 0;
                  var total_primeros = Math.round(rango_saque_1[1] / partidos.length);
                  if(total_primeros < 0) total_primeros = 0;
                  var segundos = Math.round(rango_saque_2[0] / partidos.length);
                  if(segundos < 0) segundos = 0;
                  var total_segundos = Math.round(rango_saque_2[1] / partidos.length);
                  if(total_segundos < 0) total_segundos = 0;
                  var porcentaje_primeros = 0;
                  var porcentaje_segundos = 0;

                  if(total_primeros > 0) porcentaje_primeros = Math.round(primeros * 100 / total_primeros);
                  if(total_segundos > 0) porcentaje_segundos = Math.round(segundos * 100 / total_segundos);

                  $('.resumen_2 .saque_1 .numerico.media').html(primeros + '/' + total_primeros);
                  $('.resumen_2 .saque_2 .numerico.media').html(segundos + '/' + total_segundos);

                  $('.resumen_2 .saque_1 .porcentaje.media').html(porcentaje_primeros + '%');
                  $('.resumen_2 .saque_2 .porcentaje.media').html(porcentaje_segundos + '%');

                });

              }

            });

            tx.executeSql("select * from partidos where id=?", [id_ultimo_partido], function(tx, results){
              
              var p = results.rows.item(0);        
              var n = 0;
              if(p.id_jugador_1 == propietario) n = 1;
              if(p.id_jugador_2 == propietario) n = 2;
              if(p.id_jugador_3 == propietario) n = 3;
              if(p.id_jugador_4 == propietario) n = 4;

              var sql = "select ";
              sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and saque=" + n + " and (accion='pg' or accion='ef' or accion='enf')) as acciones, ";
              sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and saque=" + n + " and (accion='enf' or accion='ef') and golpe='saque_1' and n_jugador='" + n + "') as fallos_saque_1, ";
              sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido + "' and saque=" + n + " and (accion='enf' or accion='ef') and golpe='saque_2' and n_jugador='" + n + "') as fallos_saque_2";

              tx.executeSql(sql, [], function(tx, results){

                var r = results.rows.item(0);       

                var primeros = (parseInt(r.acciones) - parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_1));
                if(primeros < 0) primeros = 0;
                var total_primeros = (parseInt(r.acciones) - parseInt(r.fallos_saque_1));
                if(total_primeros < 0) total_primeros = 0;
                var segundos = (parseInt(r.fallos_saque_1) - parseInt(r.fallos_saque_2));
                if(segundos < 0) segundos = 0;
                var total_segundos = parseInt(r.fallos_saque_1);
                if(total_segundos < 0) total_segundos = 0;
                var porcentaje_primeros = 0;
                var porcentaje_segundos = 0;

                if(total_primeros > 0) porcentaje_primeros = Math.round(primeros * 100 / total_primeros);
                if(total_segundos > 0) porcentaje_segundos = Math.round(segundos * 100 / total_segundos);

                $('.resumen_2 .saque_1 .numerico.rango').html(primeros + '/' + total_primeros);
                $('.resumen_2 .saque_2 .numerico.rango').html(segundos + '/' + total_segundos);

                $('.resumen_2 .saque_1 .porcentaje.rango').html(porcentaje_primeros + '%');
                $('.resumen_2 .saque_2 .porcentaje.rango').html(porcentaje_segundos + '%');
                
              });

            });

            // breaks
            
            /*          
            tx.executeSql("select * from partidos where " + sql_partidos + " order by fecha asc", [], function(tx, results){

              var breaks = [0, 0];

              for(var i=0; i<results.rows.length; i++){
                var p = results.rows.item(i);        

                var n = 0;
                if(p.id_jugador_1 == propietario) n = 1;
                if(p.id_jugador_2 == propietario) n = 2;
                if(p.id_jugador_3 == propietario) n = 3;
                if(p.id_jugador_4 == propietario) n = 4;

                var sql = "select '" + n + "' as n_jugador, '" + p.juegos + "' as p_juegos, '" + p.id + "' as p_id, id, saque, n_set, n_juego, marcador_juego_local, marcador_juego_visitante, variacion_local, variacion_visitante from acciones where id_partido='" + p.id + "' group by n_set, n_juego having id=max(id) order by n_set, n_juego";
                tx.executeSql(sql, [], function(tx, results){

                  var breaks_p = [0, 0];
                  var id_partido = 0

                  for(var i=0; i<results.rows.length; i++){
                    var a = results.rows.item(i);
                    id_partido = a.p_id;
                    var tiebreak = (parseInt(a.n_juego) > parseInt(a.p_juegos) * 2);
                    var marcador_local = parseInt(a.marcador_juego_local) + parseInt(a.variacion_local);
                    var marcador_visitante = parseInt(a.marcador_juego_visitante) + parseInt(a.variacion_visitante);
                    var gana_local = (marcador_local >= partido.puntos && marcador_local - marcador_visitante >= 2);
                    var gana_visitante = (marcador_visitante >= partido.puntos && marcador_visitante - marcador_local >= 2);
                    if(!tiebreak && parseInt(a.saque) == parseInt(a.n_jugador)){
                      breaks[1]++;
                      breaks_p[1]++;
                      if(gana_local || gana_visitante){
                        if((parseInt(a.saque) == 1 || parseInt(a.saque) == 2) && marcador_visitante > marcador_local){ breaks[0]++; breaks_p[0]++; }
                        if((parseInt(a.saque) == 3 || parseInt(a.saque) == 4) && marcador_local > marcador_visitante){ breaks[0]++; breaks_p[0]++; }
                      }
                    }
                  }

                  if(id_partido == id_ultimo_partido){
                    $('.resumen_2 .breaks .numerico.rango').html(breaks_p[0] + '/' + breaks_p[1]);
                    if(breaks_p[1] > 0) $('.resumen_2 .breaks .porcentaje.rango').html(Math.round(breaks_p[0] / breaks_p[1] * 100) + '%');
                    else $('.resumen_2 .breaks .porcentaje.rango').html('0%');
                  }
                  $('.resumen_2 .breaks .numerico.media').html(Math.round(breaks[0] / partidos.length) + '/' + Math.round(breaks[1] / partidos.length));
                  if(Math.round(breaks[1] / partidos.length) > 0) $('.resumen_2 .breaks .porcentaje.media').html(Math.round(Math.round(breaks[0] / partidos.length) / Math.round(breaks[1] / partidos.length) * 100) + '%');
                  else $('.resumen_2 .breaks .porcentaje.media').html('0%');


                });

              }
            });

            */

            tx.executeSql("select * from partidos where " + sql_partidos + " order by fecha asc", [], function(tx, results){ // breaks

              var breaks = [0, 0];

              for(var i=0; i<results.rows.length; i++){
                var p = results.rows.item(i);        

                var n = 0;
                if(p.id_jugador_1 == propietario) n = 1;
                if(p.id_jugador_2 == propietario) n = 2;
                if(p.id_jugador_3 == propietario) n = 3;
                if(p.id_jugador_4 == propietario) n = 4;

                var sql = "select '" + n + "' as n_jugador, '" + p.juegos + "' as p_juegos, '" + p.id + "' as p_id, id, saque, n_set, n_juego, marcador_juego_local, marcador_juego_visitante, variacion_local, variacion_visitante from acciones where id_partido='" + p.id + "' group by n_set, n_juego having id=max(id) order by n_set, n_juego";
                tx.executeSql(sql, [], function(tx, results){

                  var breaks_p = [0, 0];
                  var id_partido = 0

                  for(var i=0; i<results.rows.length; i++){
                    var a = results.rows.item(i);
                    id_partido = a.p_id;
                    var tiebreak = (parseInt(a.n_juego) > parseInt(a.p_juegos) * 2);
                    var marcador_local = parseInt(a.marcador_juego_local) + parseInt(a.variacion_local);
                    var marcador_visitante = parseInt(a.marcador_juego_visitante) + parseInt(a.variacion_visitante);
                    var gana_local = (marcador_local >= partido.puntos && marcador_local - marcador_visitante >= 2);
                    var gana_visitante = (marcador_visitante >= partido.puntos && marcador_visitante - marcador_local >= 2);
                    if(!tiebreak && parseInt(a.saque) == parseInt(a.n_jugador)){
                      breaks[1]++;
                      breaks_p[1]++;
                      if(gana_local || gana_visitante){
                        if((parseInt(a.saque) == 1 || parseInt(a.saque) == 2) && marcador_visitante > marcador_local){ breaks[0]++; breaks_p[0]++; }
                        if((parseInt(a.saque) == 3 || parseInt(a.saque) == 4) && marcador_local > marcador_visitante){ breaks[0]++; breaks_p[0]++; }
                      }
                    }
                  }

                  if(id_partido == id_ultimo_partido){
                    $('.resumen_2 .breaks .numerico.rango').html(breaks_p[0] + '/' + breaks_p[1]);
                    if(breaks_p[1] > 0) $('.resumen_2 .breaks .porcentaje.rango').html(Math.round(breaks_p[0] * 100 / breaks_p[1]) + '%');
                    else $('.resumen_2 .breaks .porcentaje.rango').html('0%');
                  } 

                  $('.resumen_2 .breaks .numerico.media').html(Math.round(breaks[0] / partidos.length) + '/' + Math.round(breaks[1] / partidos.length));
                  if(Math.round(breaks[1] / partidos.length) > 0) $('.resumen_2 .breaks .porcentaje.media').html(Math.round( Math.round(breaks[0] / partidos.length) / Math.round(breaks[1] / partidos.length) * 100 ) + '%');
                  else $('.resumen_2 .breaks .porcentaje.media').html('0%');


                });

              }
            });

            // coeficientes
            
            tx.executeSql("select * from partidos where " + sql_partidos + " order by fecha asc", [], function(tx, results){

              for(var i=0; i<results.rows.length; i++){
                var p = results.rows.item(i);        

                var n = 0;
                if(p.id_jugador_1 == propietario) n = 1;
                if(p.id_jugador_2 == propietario) n = 2;
                if(p.id_jugador_3 == propietario) n = 3;
                if(p.id_jugador_4 == propietario) n = 4;

                var sql = "select id, coeficiente_" + n + " as coeficiente from partidos where id='" + p.id + "'";
                tx.executeSql(sql, [], function(tx, results){

                  var sum_coeficiente = 0;
                  var id_partido = 0

                  for(var i=0; i<results.rows.length; i++){
                    var a = results.rows.item(i);
                    sum_coeficiente += parseInt(a.coeficiente);
                    if(a.id == id_ultimo_partido) $('.resumen_2 .coeficiente_padelstat .rango').html(a.coeficiente);
                  }

                  if(partidos.length > 0){
                    $('.resumen_2 .coeficiente_padelstat .media').html(Math.round(sum_coeficiente / partidos.length));
                  }

                });

              }
            });   

            var sql = "select ";
            sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and (accion='pg' or (accion like 'e%' and golpe!='saque_1'))) as total_acciones_ultimo_partido, ";
            sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and (accion='pg' or (accion like 'e%' and golpe!='saque_1'))) as total_acciones_rango"; 

            tx.executeSql(sql, [], function(tx, results){

              var r = results.rows.item(0);
              var total_acciones_ultimo_partido = r.total_acciones_ultimo_partido;
              var total_acciones_rango = r.total_acciones_rango;

              // enf golpes

              /*
              var sql = "select golpe, count(*) as cuenta from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='enf' and golpe!='' and golpe!='saque_1' group by golpe";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;
                var servicios = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  if(r.golpe == 'saque_1' || r.golpe == 'saque_2'){
                    servicios += Math.round(parseInt(r.cuenta) / partidos.length);
                    totales += Math.round(parseInt(r.cuenta) / partidos.length);
                    if(servicios > 0) $('.analisis_enf .servicio .media.numerico').html(servicios);
                  } else {
                    totales += Math.round(parseInt(r.cuenta) / partidos.length);
                    if(Math.round(parseInt(r.cuenta) / partidos.length) > 0) $('.analisis_enf .' + r.golpe + ' .media.numerico').html(Math.round(parseInt(r.cuenta) / partidos.length));
                  }
                }

                if(totales > 0){

                  $('.analisis_enf .totales .media.numerico').html(totales);
                  $('.analisis_enf .totales .media.porcentaje').html('100%');
                
                  if(servicios > 0){
                    var porcentaje = Math.round(Math.round(servicios / partidos.length) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_enf .servicio .media.porcentaje').html(porcentaje + '%');
                  }

                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    if(r.golpe != 'saque_1' && r.golpe != 'saque_2'){
                      var porcentaje = Math.round(Math.round(parseInt(r.cuenta) / partidos.length) * 100 / totales);
                      if(porcentaje > 0) $('.analisis_enf .' + r.golpe + ' .media.porcentaje').html(porcentaje + '%');
                    }
                  }

                }

              });

              var sql = "select golpe, count(*) as cuenta from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='enf' and golpe!='' and golpe!='saque_1' group by golpe";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;
                var servicios = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  if(r.golpe == 'saque_1' || r.golpe == 'saque_2'){
                    servicios += parseInt(r.cuenta);
                    totales += parseInt(r.cuenta);
                    if(servicios > 0) $('.analisis_enf .servicio .rango.numerico').html(servicios);
                  } else {
                    totales += parseInt(r.cuenta);
                    if(parseInt(r.cuenta) > 0) $('.analisis_enf .' + r.golpe + ' .rango.numerico').html(r.cuenta);
                  }
                }

                if(totales > 0){

                  $('.analisis_enf .totales .rango.numerico').html(totales);
                  $('.analisis_enf .totales .rango.porcentaje').html('100%');
                
                  if(servicios > 0){
                    var porcentaje = Math.round(servicios * 100 / totales);
                    if(porcentaje > 0) $('.analisis_enf .servicio .rango.porcentaje').html(porcentaje + '%');
                  }

                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    if(r.golpe != 'saque_1' && r.golpe != 'saque_2'){
                      var porcentaje = Math.round(parseInt(r.cuenta) * 100 / totales);
                      if(porcentaje > 0) $('.analisis_enf .' + r.golpe + ' .rango.porcentaje').html(porcentaje + '%');
                    }
                  }

                }

              });

              */

              // evolucion_golpes_enf, evolucion_golpes_ef, evolucion_golpes_pg
        
              var golpes = ['servicio', 'resto', 'bote_p', 'directo', 'volea', 'bandeja', 's_pared', 'smash', 'globo'];
              var acciones = ['ef', 'enf', 'pg'];
              
              for(var a=0; a<acciones.length; a++){
                var accion = acciones[a];
                
                var sql = "select '" + accion + "' as accion, ";
                for(var g=0; g<golpes.length; g++){
                  var golpe = golpes[g];
                  if(golpe != 'servicio'){
                    sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and accion='" + accion + "' and golpe='" + golpe + "') as rango_" + accion + "_" + golpe + ", ";
                    sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and accion='" + accion + "' and golpe='" + golpe + "') as ultimo_" + accion + "_" + golpe + ", ";
                  } else {
                    sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and accion='" + accion + "' and (golpe='saque_2' or (golpe='saque_1' and accion='pg'))) as rango_" + accion + "_" + golpe + ", ";
                    sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and accion='" + accion + "' and (golpe='saque_2' or (golpe='saque_1' and accion='pg'))) as ultimo_" + accion + "_" + golpe + ", ";
                  }
                }
                sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and (accion='enf' or accion='ef' or accion='pg') and golpe!='' and not (golpe='saque_1' and (accion='enf' or accion='ef')) ) as total_acciones_rango, ";
                sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and (accion='enf' or accion='ef' or accion='pg') and golpe!='' and not (golpe='saque_1' and (accion='enf' or accion='ef')) ) as total_acciones_ultimo";

                tx.executeSql(sql, [], function(tx, results){

                  var r = results.rows.item(0);

                  var total_acciones_rango = 0;
                  var total_acciones_ultimo = 0;

                  for(var g=0; g<golpes.length; g++){
                    var golpe = golpes[g];
                    total_acciones_rango += parseInt(r['rango_' + r.accion + '_' + golpe]);
                    total_acciones_ultimo += parseInt(r['ultimo_' + r.accion + '_' + golpe]);
                  }

                  var rango = {'resto': 0, 'bote_p': 0, 'directo': 0, 'volea': 0, 'bandeja': 0, 's_pared': 0, 'smash': 0, 'globo': 0};
                  var ultimo = {'resto': 0, 'bote_p': 0, 'directo': 0, 'volea': 0, 'bandeja': 0, 's_pared': 0, 'smash': 0, 'globo': 0};

                  for(var g=0; g<golpes.length; g++){
                    var golpe = golpes[g];
                    var valor = parseInt(r['rango_' + r.accion + '_' + golpe]);
                    //if(valor > 0) $('.analisis_' + r.accion +' .' + golpe + ' .media.numerico').html(valor);
                    //if(total_acciones_rango > 0 && Math.round(valor * 100 / total_acciones_rango) > 0) $('.analisis_' + r.accion +' .' + golpe + ' .media.porcentaje').html(Math.round(valor * 100 / total_acciones_rango) + '%');

                    /*
                    if(valor > 0 && partidos.length > 0 && Math.round(valor / partidos.length) > 0) $('.analisis_' + r.accion +' .' + golpe + ' .media.numerico').html(Math.round(valor / partidos.length));
                    if(valor > 0 && partidos.length > 0 && total_acciones_rango > 0 && Math.round(valor / partidos.length / total_acciones_rango * 100) > 0) $('.analisis_' + r.accion +' .' + golpe + ' .media.porcentaje').html(( Math.round(valor / partidos.length / total_acciones_rango * 100)) + '%');
                    */

                    if(valor > 0 && partidos_profundos.length > 0 && Math.round(valor / partidos_profundos.length) > 0) $('.analisis_' + r.accion +' .' + golpe + ' .media.numerico').html(Math.round(valor / partidos_profundos.length));
                    if(valor > 0 && partidos_profundos.length > 0 && total_acciones_rango > 0 && Math.round(valor / partidos_profundos.length / total_acciones_rango * 100) > 0) $('.analisis_' + r.accion +' .' + golpe + ' .media.porcentaje').html(( Math.round(valor / partidos_profundos.length / total_acciones_rango * 100)) + '%');

                  }

                  for(var g=0; g<golpes.length; g++){
                    var golpe = golpes[g];
                    var valor = parseInt(r['ultimo_' + r.accion + '_' + golpe]);
                    if(valor > 0) $('.analisis_' + r.accion +' .' + golpe + ' .rango.numerico').html(valor);
                    //if(total_acciones_ultimo > 0 && Math.round(valor * 100 / total_acciones_ultimo) > 0) $('.analisis_' + r.accion +' .' + golpe + ' .rango.porcentaje').html(Math.round(valor * 100 / total_acciones_ultimo) + '%');
                    if(total_acciones_ultimo_partido > 0 && Math.round(valor * 100 / total_acciones_ultimo_partido) > 0) $('.analisis_' + r.accion +' .' + golpe + ' .rango.porcentaje').html(Math.round(valor * 100 / total_acciones_ultimo_partido) + '%');
                  }

                  /*
                  if(total_acciones_rango > 0 && partidos.length > 0 && Math.round(total_acciones_rango / partidos.length) > 0) $('.analisis_' + r.accion +' .totales .media.numerico').html(Math.round(total_acciones_rango / partidos.length));
                  if(total_acciones_rango > 0 && partidos.length > 0 && total_acciones_rango > 0 && Math.round(total_acciones_rango / partidos.length / total_acciones_rango * 100) > 0) $('.analisis_' + r.accion +' .totales .media.porcentaje').html( Math.round(total_acciones_rango / partidos.length / total_acciones_rango * 100) + '%' );  
                  */

                  if(total_acciones_rango > 0 && partidos_profundos.length > 0 && Math.round(total_acciones_rango / partidos_profundos.length) > 0) $('.analisis_' + r.accion +' .totales .media.numerico').html(Math.round(total_acciones_rango / partidos_profundos.length));
                  if(total_acciones_rango > 0 && partidos_profundos.length > 0 && total_acciones_rango > 0 && Math.round(total_acciones_rango / partidos_profundos.length / total_acciones_rango * 100) > 0) $('.analisis_' + r.accion +' .totales .media.porcentaje').html( Math.round(total_acciones_rango / partidos_profundos.length / total_acciones_rango * 100) + '%' );  

                  if(total_acciones_ultimo > 0) $('.analisis_' + r.accion +' .totales .rango.numerico').html(total_acciones_ultimo);
                  if(total_acciones_ultimo > 0 && total_acciones_ultimo_partido > 0 && Math.round(total_acciones_ultimo / total_acciones_ultimo_partido * 100) > 0) $('.analisis_' + r.accion +' .totales .rango.porcentaje').html( Math.round(total_acciones_ultimo / total_acciones_ultimo_partido * 100) + '%');  

                });

              }

              // enf mano

              /*
              var sql = "select mano, count(*) as cuenta from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='enf' and mano!='' and golpe!='saque_1' group by mano";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  totales += Math.round(parseInt(r.cuenta) / partidos.length);
                  if(Math.round(parseInt(r.cuenta) / partidos.length) > 0) $('.analisis_enf_2 .' + r.mano + ' .media.numerico').html(Math.round(parseInt(r.cuenta) / partidos.length));
                }

                if(totales > 0){
                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    var porcentaje = Math.round(Math.round(parseInt(r.cuenta) / partidos.length) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_enf_2 .' + r.mano + ' .media.porcentaje').html(porcentaje + '%');
                  }
                }

              });

              var sql = "select mano, count(*) as cuenta from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='enf' and mano!='' and golpe!='saque_1' group by mano";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  totales += parseInt(r.cuenta);
                  if(parseInt(r.cuenta) > 0) $('.analisis_enf_2 .' + r.mano + ' .rango.numerico').html(parseInt(r.cuenta));
                }

                if(totales > 0){
                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    var porcentaje = Math.round(parseInt(r.cuenta) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_enf_2 .' + r.mano + ' .rango.porcentaje').html(porcentaje + '%');
                  }
                }

              });
              */

              // evolucion_manos_enf, evolucion_manos_ef, evolucion_manos_pg
        
              var manos = ['drive', 'reves'];
              
              for(var a=0; a<acciones.length; a++){
                var accion = acciones[a];
                
                var sql = "select '" + accion + "' as accion, ";
                for(var m=0; m<manos.length; m++){
                  var mano = manos[m];
                  sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and accion='" + accion + "' and mano='" + mano + "' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as rango_" + accion + "_" + mano + ", ";
                  sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and accion='" + accion + "' and mano='" + mano + "' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as ultimo_" + accion + "_" + mano + ", ";
                }
                sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and (accion='enf' or accion='ef' or accion='pg') and mano!='' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as total_acciones_rango, ";
                sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and (accion='enf' or accion='ef' or accion='pg') and mano!='' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as total_acciones_ultimo";

                tx.executeSql(sql, [], function(tx, results){

                  var r = results.rows.item(0);

                  var total_acciones_rango = 0;
                  var total_acciones_ultimo = 0;

                  for(var m=0; m<manos.length; m++){
                    var mano = manos[m];
                    total_acciones_rango += parseInt(r['rango_' + r.accion + '_' + mano]);
                    total_acciones_ultimo += parseInt(r['ultimo_' + r.accion + '_' + mano]);
                  }

                  for(var m=0; m<manos.length; m++){
                    var mano = manos[m];
                    var valor = parseInt(r['rango_' + r.accion + '_' + mano]);
                    //if(valor > 0) $('.analisis_' + r.accion + '_2 .' + mano + ' .media.numerico').html(valor);
                    //if(total_acciones_rango > 0 && Math.round(valor * 100 / total_acciones_rango) > 0) $('.analisis_' + r.accion + '_2 .' + mano + ' .media.porcentaje').html(Math.round(valor * 100 / total_acciones_rango) + '%');   

                    /*
                    if(valor > 0 && partidos.length > 0 && Math.round(valor / partidos.length) > 0) $('.analisis_' + r.accion +'_2 .' + mano + ' .media.numerico').html(Math.round(valor / partidos.length));
                    if(valor > 0 && partidos.length > 0 && total_acciones_rango > 0 && Math.round(valor / partidos.length / total_acciones_rango * 100)) $('.analisis_' + r.accion +'_2 .' + mano + ' .media.porcentaje').html(( Math.round(valor / partidos.length / total_acciones_rango * 100)) + '%');
                    */

                    if(valor > 0 && partidos_profundos.length > 0 && Math.round(valor / partidos_profundos.length) > 0) $('.analisis_' + r.accion +'_2 .' + mano + ' .media.numerico').html(Math.round(valor / partidos_profundos.length));
                    if(valor > 0 && partidos_profundos.length > 0 && total_acciones_rango > 0 && Math.round(valor / partidos_profundos.length / total_acciones_rango * 100)) $('.analisis_' + r.accion +'_2 .' + mano + ' .media.porcentaje').html(( Math.round(valor / partidos_profundos.length / total_acciones_rango * 100)) + '%');

                  }
                  
                  for(var m=0; m<manos.length; m++){
                    var mano = manos[m];
                    var valor = parseInt(r['ultimo_' + r.accion + '_' + mano]);
                    if(valor > 0) $('.analisis_' + r.accion + '_2 .' + mano + ' .rango.numerico').html(valor);
                    //if(total_acciones_ultimo > 0 && Math.round(valor * 100 / total_acciones_ultimo) > 0) $('.analisis_' + r.accion + '_2 .' + mano + ' .rango.porcentaje').html(Math.round(valor * 100 / total_acciones_ultimo) + '%');
                    if(total_acciones_ultimo_partido > 0 && Math.round(valor * 100 / total_acciones_ultimo_partido) > 0) $('.analisis_' + r.accion +'_2 .' + mano + ' .rango.porcentaje').html(Math.round(valor * 100 / total_acciones_ultimo_partido) + '%');
                  }
                                  
                });

              }

              // enf donde

              /*
              var sql = "select donde, count(*) as cuenta from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='enf' and donde!='' and golpe!='saque_1' group by donde";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  totales += Math.round(r.cuenta / partidos.length);
                  if(Math.round(r.cuenta / partidos.length) > 0) $('.analisis_enf_2 .' + r.donde + ' .media.numerico').html(Math.round(r.cuenta / partidos.length));
                }

                if(totales > 0){
                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    var porcentaje = Math.round(Math.round(r.cuenta / partidos.length) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_enf_2 .' + r.donde + ' .media.porcentaje').html(porcentaje + '%');
                  }
                }

              });

              var sql = "select donde, count(*) as cuenta from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='enf' and donde!='' and golpe!='saque_1' group by donde";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  totales += parseInt(r.cuenta);
                  if(parseInt(r.cuenta) > 0) $('.analisis_enf_2 .' + r.donde + ' .rango.numerico').html(parseInt(r.cuenta));
                }

                if(totales > 0){
                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    var porcentaje = Math.round(parseInt(r.cuenta) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_enf_2 .' + r.donde + ' .rango.porcentaje').html(porcentaje + '%');
                  }
                }

              });
              */

              var dondes = ['fondo', 'pantano', 'red'];
            
              for(var a=0; a<acciones.length; a++){
                var accion = acciones[a];
                
                var sql = "select '" + accion + "' as accion, ";
                for(var d=0; d<dondes.length; d++){
                  var donde = dondes[d];
                  sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and accion='" + accion + "' and donde='" + donde + "' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as rango_" + accion + "_" + donde + ", ";
                  sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and accion='" + accion + "' and donde='" + donde + "' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as ultimo_" + accion + "_" + donde + ", ";
                }
                sql += "(select count(*) from acciones where " + sql_acciones_profundos + " and (accion='enf' or accion='ef' or accion='pg') and donde!='' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as total_acciones_rango, ";
                sql += "(select count(*) from acciones where id_partido='" + id_ultimo_partido_profundo + "' and (accion='enf' or accion='ef' or accion='pg') and donde!='' and not (golpe='saque_1' and (accion='enf' or accion='ef'))) as total_acciones_ultimo";

                tx.executeSql(sql, [], function(tx, results){

                  var r = results.rows.item(0);

                  var total_acciones_rango = 0;
                  var total_acciones_ultimo = 0;

                  for(var d=0; d<dondes.length; d++){
                    var donde = dondes[d];
                    total_acciones_rango += parseInt(r['rango_' + r.accion + '_' + donde]);
                    total_acciones_ultimo += parseInt(r['ultimo_' + r.accion + '_' + donde]);
                  }

                  for(var d=0; d<dondes.length; d++){
                    var donde = dondes[d];
                    var valor = parseInt(r['rango_' + r.accion + '_' + donde]);
                    //if(valor > 0) $('.analisis_' + r.accion + '_2 .' + donde + ' .media.numerico').html(valor);
                    //if(total_acciones_rango > 0 && Math.round(valor * 100 / total_acciones_rango) > 0) $('.analisis_' + r.accion + '_2 .' + donde + ' .media.porcentaje').html(Math.round(valor * 100 / total_acciones_rango) + '%');

                    /*
                    if(valor > 0 && partidos.length > 0 && Math.round(valor / partidos.length) > 0) $('.analisis_' + r.accion +'_2 .' + donde + ' .media.numerico').html(Math.round(valor / partidos.length));
                    if(valor > 0 && partidos.length > 0 && total_acciones_rango > 0 && Math.round(valor / partidos.length / total_acciones_rango * 100) > 0) $('.analisis_' + r.accion +'_2 .' + donde + ' .media.porcentaje').html(( Math.round(valor / partidos.length / total_acciones_rango * 100)) + '%');
                    */

                    if(valor > 0 && partidos_profundos.length > 0 && Math.round(valor / partidos_profundos.length) > 0) $('.analisis_' + r.accion +'_2 .' + donde + ' .media.numerico').html(Math.round(valor / partidos_profundos.length));
                    if(valor > 0 && partidos_profundos.length > 0 && total_acciones_rango > 0 && Math.round(valor / partidos_profundos.length / total_acciones_rango * 100) > 0) $('.analisis_' + r.accion +'_2 .' + donde + ' .media.porcentaje').html(( Math.round(valor / partidos_profundos.length / total_acciones_rango * 100)) + '%');

                  }
                  
                  for(var d=0; d<dondes.length; d++){
                    var donde = dondes[d];
                    var valor = parseInt(r['ultimo_' + r.accion + '_' + donde]);
                    if(valor > 0) $('.analisis_' + r.accion + '_2 .' + donde + ' .rango.numerico').html(valor);
                    //if(total_acciones_ultimo > 0 && Math.round(valor * 100 / total_acciones_ultimo) > 0) $('.analisis_' + r.accion + '_2 .' + donde + ' .rango.porcentaje').html(Math.round(valor * 100 / total_acciones_ultimo) + '%');
                    if(total_acciones_ultimo_partido > 0 && Math.round(valor * 100 / total_acciones_ultimo_partido) > 0) $('.analisis_' + r.accion +'_2 .' + donde + ' .rango.porcentaje').html(Math.round(valor * 100 / total_acciones_ultimo_partido) + '%');
                  }

                });

              }

              // ef

              /*
              var sql = "select golpe, count(*) as cuenta from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='ef' and golpe!='' and golpe!='saque_1' group by golpe";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;
                var servicios = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  if(r.golpe == 'saque_1' || r.golpe == 'saque_2'){
                    servicios += Math.round(parseInt(r.cuenta) / partidos.length);
                    totales += Math.round(parseInt(r.cuenta) / partidos.length);
                    if(servicios > 0) $('.analisis_ef .servicio .media.numerico').html(servicios);
                  } else {
                    totales += Math.round(parseInt(r.cuenta) / partidos.length);
                    if(Math.round(parseInt(r.cuenta) / partidos.length) > 0) $('.analisis_ef .' + r.golpe + ' .media.numerico').html(Math.round(parseInt(r.cuenta) / partidos.length));
                  }
                }

                if(totales > 0){

                  $('.analisis_ef .totales .media.numerico').html(totales);
                  $('.analisis_ef .totales .media.porcentaje').html('100%');
                
                  if(servicios > 0){
                    var porcentaje = Math.round(Math.round(servicios / partidos.length) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_ef .servicio .media.porcentaje').html(porcentaje + '%');
                  }

                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    if(r.golpe != 'saque_1' && r.golpe != 'saque_2'){
                      var porcentaje = Math.round(Math.round(parseInt(r.cuenta) / partidos.length) * 100 / totales);
                      if(porcentaje > 0) $('.analisis_ef .' + r.golpe + ' .media.porcentaje').html(porcentaje + '%');
                    }
                  }

                }

              });

              var sql = "select golpe, count(*) as cuenta from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='ef' and golpe!='' and golpe!='saque_1' group by golpe";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;
                var servicios = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  if(r.golpe == 'saque_1' || r.golpe == 'saque_2'){
                    servicios += parseInt(r.cuenta);
                    totales += parseInt(r.cuenta);
                    if(servicios > 0) $('.analisis_ef .servicio .rango.numerico').html(servicios);
                  } else {
                    totales += parseInt(r.cuenta);
                    if(parseInt(r.cuenta) > 0) $('.analisis_ef .' + r.golpe + ' .rango.numerico').html(parseInt(r.cuenta));
                  }
                }

                if(totales > 0){

                  $('.analisis_ef .totales .rango.numerico').html(totales);
                  $('.analisis_ef .totales .rango.porcentaje').html('100%');
                
                  if(servicios > 0){
                    var porcentaje = Math.round(servicios * 100 / totales);
                    if(porcentaje > 0) $('.analisis_ef .servicio .rango.porcentaje').html(porcentaje + '%');
                  }

                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    if(r.golpe != 'saque_1' && r.golpe != 'saque_2'){
                      var porcentaje = Math.round(parseInt(r.cuenta) * 100 / totales);
                      if(porcentaje > 0) $('.analisis_ef .' + r.golpe + ' .rango.porcentaje').html(porcentaje + '%');
                    }
                  }

                }

              });

              */

              // ef mano

              /*
              var sql = "select mano, count(*) as cuenta from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='ef' and mano!='' and golpe!='saque_1' group by mano";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  totales += Math.round(parseInt(r.cuenta) / partidos.length);
                  if(Math.round(parseInt(r.cuenta) / partidos.length) > 0) $('.analisis_ef_2 .' + r.mano + ' .media.numerico').html(Math.round(parseInt(r.cuenta) / partidos.length));
                }

                if(totales > 0){
                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    var porcentaje = Math.round(Math.round(parseInt(r.cuenta) / partidos.length) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_ef_2 .' + r.mano + ' .media.porcentaje').html(porcentaje + '%');
                  }
                }

              });

              var sql = "select mano, count(*) as cuenta from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='ef' and mano!='' and golpe!='saque_1' group by mano";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  totales += parseInt(r.cuenta);
                  if(parseInt(r.cuenta) > 0) $('.analisis_ef_2 .' + r.mano + ' .rango.numerico').html(parseInt(r.cuenta));
                }

                if(totales > 0){
                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    var porcentaje = Math.round(parseInt(r.cuenta) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_ef_2 .' + r.mano + ' .rango.porcentaje').html(porcentaje + '%');
                  }
                }

              });
              */

              // ef donde

              /*
              var sql = "select donde, count(*) as cuenta from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='ef' and donde!='' and golpe!='saque_1' group by donde";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  totales += Math.round(parseInt(r.cuenta) / partidos.length);
                  if(Math.round(parseInt(r.cuenta) / partidos.length) > 0) $('.analisis_ef_2 .' + r.donde + ' .media.numerico').html(Math.round(parseInt(r.cuenta) / partidos.length));
                }

                if(totales > 0){
                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    var porcentaje = Math.round(Math.round(parseInt(r.cuenta) / partidos.length) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_ef_2 .' + r.donde + ' .media.porcentaje').html(porcentaje + '%');
                  }
                }

              });

              var sql = "select donde, count(*) as cuenta from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='ef' and donde!='' and golpe!='saque_1' group by donde";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  totales += parseInt(r.cuenta);
                  if(parseInt(r.cuenta) > 0) $('.analisis_ef_2 .' + r.donde + ' .rango.numerico').html(parseInt(r.cuenta));
                }

                if(totales > 0){
                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    var porcentaje = Math.round(parseInt(r.cuenta) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_ef_2 .' + r.donde + ' .rango.porcentaje').html(porcentaje + '%');
                  }
                }

              });
              */

              // pg

              /*

              var sql = "select golpe, count(*) as cuenta from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='pg' and golpe!='' group by golpe";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;
                var servicios = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  if(r.golpe == 'saque_1' || r.golpe == 'saque_2'){
                    servicios += Math.round(parseInt(r.cuenta) / partidos.length);
                    totales += Math.round(parseInt(r.cuenta) / partidos.length);
                    if(servicios > 0) $('.analisis_pg .servicio .media.numerico').html(servicios);
                  } else {
                    totales += Math.round(parseInt(r.cuenta) / partidos.length);
                    if(Math.round(parseInt(r.cuenta) / partidos.length) > 0) $('.analisis_pg .' + r.golpe + ' .media.numerico').html(Math.round(parseInt(r.cuenta) / partidos.length));
                  }
                }

                if(totales > 0){

                  $('.analisis_pg .totales .media.numerico').html(totales);
                  $('.analisis_pg .totales .media.porcentaje').html('100%');
                
                  if(servicios > 0){
                    var porcentaje = Math.round(Math.round(servicios / partidos.length) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_pg .servicio .media.porcentaje').html(porcentaje + '%');
                  }

                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    if(r.golpe != 'saque_1' && r.golpe != 'saque_2'){
                      var porcentaje = Math.round(Math.round(parseInt(r.cuenta) / partidos.length) * 100 / totales);
                      if(porcentaje > 0) $('.analisis_pg .' + r.golpe + ' .media.porcentaje').html(porcentaje + '%');
                    }
                  }

                }

              });

              var sql = "select golpe, count(*) as cuenta from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='pg' and golpe!='' group by golpe";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;
                var servicios = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  if(r.golpe == 'saque_1' || r.golpe == 'saque_2'){
                    servicios += parseInt(r.cuenta);
                    totales += parseInt(r.cuenta);
                    if(servicios > 0) $('.analisis_pg .servicio .rango.numerico').html(servicios);
                  } else {
                    totales += parseInt(r.cuenta);
                    if(parseInt(r.cuenta) > 0) $('.analisis_pg .' + r.golpe + ' .rango.numerico').html(parseInt(r.cuenta));
                  }
                }

                if(totales > 0){

                  $('.analisis_pg .totales .rango.numerico').html(totales);
                  $('.analisis_pg .totales .rango.porcentaje').html('100%');
                
                  if(servicios > 0){
                    var porcentaje = Math.round(servicios * 100 / totales);
                    if(porcentaje > 0) $('.analisis_pg .servicio .rango.porcentaje').html(porcentaje + '%');
                  }

                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    if(r.golpe != 'saque_1' && r.golpe != 'saque_2'){
                      var porcentaje = Math.round(parseInt(r.cuenta) * 100 / totales);
                      if(porcentaje > 0) $('.analisis_pg .' + r.golpe + ' .rango.porcentaje').html(porcentaje + '%');
                    }
                  }

                }

              });

              */
              
              // pg mano

              /*
              var sql = "select mano, count(*) as cuenta from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='pg' and mano!='' group by mano";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  totales += Math.round(parseInt(r.cuenta) / partidos.length);
                  if(Math.round(parseInt(r.cuenta) / partidos.length) > 0) $('.analisis_pg_2 .' + r.mano + ' .media.numerico').html(Math.round(parseInt(r.cuenta) / partidos.length));
                }

                if(totales > 0){
                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    var porcentaje = Math.round(Math.round(parseInt(r.cuenta) / partidos.length) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_pg_2 .' + r.mano + ' .media.porcentaje').html(porcentaje + '%');
                  }
                }

              });

              var sql = "select mano, count(*) as cuenta from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='pg' and mano!='' group by mano";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  totales += parseInt(r.cuenta);
                  if(parseInt(r.cuenta) > 0) $('.analisis_pg_2 .' + r.mano + ' .rango.numerico').html(parseInt(r.cuenta));
                }

                if(totales > 0){
                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    var porcentaje = Math.round(parseInt(r.cuenta) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_pg_2 .' + r.mano + ' .rango.porcentaje').html(porcentaje + '%');
                  }
                }

              });
              */
    
              // pg donde

              /*
              var sql = "select donde, count(*) as cuenta from acciones where " + sql_acciones + " and id_jugador='" + propietario + "' and accion='pg' and donde!='' group by donde";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  totales += Math.round(parseInt(r.cuenta) / partidos.length);
                  if(Math.round(parseInt(r.cuenta) / partidos.length) > 0) $('.analisis_pg_2 .' + r.donde + ' .media.numerico').html(Math.round(parseInt(r.cuenta) / partidos.length));
                }

                if(totales > 0){
                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    var porcentaje = Math.round(Math.round(parseInt(r.cuenta) / partidos.length) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_pg_2 .' + r.donde + ' .media.porcentaje').html(porcentaje + '%');
                  }
                }

              });

              var sql = "select donde, count(*) as cuenta from acciones where id_partido='" + id_ultimo_partido + "' and id_jugador='" + propietario + "' and accion='pg' and donde!='' group by donde";
              tx.executeSql(sql, [], function(tx, results){

                var totales = 0;

                for(var i=0; i<results.rows.length; i++){
                  var r = results.rows.item(i);
                  totales += parseInt(r.cuenta);
                  if(parseInt(r.cuenta) > 0) $('.analisis_pg_2 .' + r.donde + ' .rango.numerico').html(parseInt(r.cuenta));
                }

                if(totales > 0){
                  for(var i=0; i<results.rows.length; i++){
                    var r = results.rows.item(i);
                    var porcentaje = Math.round(parseInt(r.cuenta) * 100 / totales);
                    if(porcentaje > 0) $('.analisis_pg_2 .' + r.donde + ' .rango.porcentaje').html(porcentaje + '%');
                  }
                }

              });
              */

            });

          }
        }

      });

    });

  });

}

function mostrado_analisis_numerico_rango(){
  redimensionar_contenido('analisis_numerico_rango');
  ga_evento('estadisticas', 'rango');
}

// codificación utf8

l['analisis_numerico_rango'] = {};

l['analisis_numerico_rango']['titulo'] = 'Análisis Numérico';

l['analisis_numerico_rango']['rango_partidos'] = 'Rango de Partidos';
l['analisis_numerico_rango']['ultima_semana'] = 'Última semana';
l['analisis_numerico_rango']['ultimo_mes'] = 'Último mes';
l['analisis_numerico_rango']['ultimos_3_meses'] = 'Últimos 3 meses';
l['analisis_numerico_rango']['ultimos_6_meses'] = 'Últimos 6 meses';
l['analisis_numerico_rango']['ultimo_anyo'] = 'Último año';
l['analisis_numerico_rango']['todos_partidos'] = 'Todos los partidos';

l['analisis_numerico_rango']['datos_insuficientes'] = 'No hay suficientes datos para generar una estadística';
l['analisis_numerico_rango']['juegos_registrados'] = 'Juegos Registrados';

l['analisis_numerico_rango']['resumen_rango'] = 'Resumen del Rango de Partidos';
l['analisis_numerico_rango']['analisis_enf'] = 'Análisis de Golpes (ENF)';
l['analisis_numerico_rango']['analisis_ef'] = 'Análisis de Golpes (EF)';
l['analisis_numerico_rango']['analisis_pg'] = 'Análisis de Golpes (PG)';

l['analisis_numerico_rango']['ganados'] = 'Ganados';
l['analisis_numerico_rango']['perdidos'] = 'Perdidos';
l['analisis_numerico_rango']['partidos'] = 'Partidos';
l['analisis_numerico_rango']['partidos_2sets'] = 'En 2 sets';
l['analisis_numerico_rango']['partidos_3sets'] = 'En 3 sets';
l['analisis_numerico_rango']['sets'] = 'Sets';
l['analisis_numerico_rango']['juegos'] = 'Juegos';
l['analisis_numerico_rango']['tie_breaks'] = 'Tie Breaks';

l['analisis_numerico_rango']['media_rango'] = 'Media Rango';
l['analisis_numerico_rango']['ultimo_partido'] = 'Último Partido';

l['analisis_numerico_rango']['puntos_registrados'] = 'Puntos Registrados';
l['analisis_numerico_rango']['enf'] = 'Errores No Forzados';
l['analisis_numerico_rango']['ef'] = 'Errores Forzados';
l['analisis_numerico_rango']['pg'] = 'Puntos Ganados';

l['analisis_numerico_rango']['saque_1'] = 'Primer Saque';
l['analisis_numerico_rango']['saque_2'] = 'Segundo Saque';
l['analisis_numerico_rango']['breaks'] = 'Breaks';
l['analisis_numerico_rango']['coeficiente_padelstat'] = 'Coeficiente padelstat';

l['analisis_numerico_rango']['servicio'] = 'Servicio';
l['analisis_numerico_rango']['resto'] = 'Resto';
l['analisis_numerico_rango']['bote_p'] = 'Bote Pronto';
l['analisis_numerico_rango']['directo'] = 'Directo';
l['analisis_numerico_rango']['volea'] = 'Volea';
l['analisis_numerico_rango']['bandeja'] = 'Bandeja';
l['analisis_numerico_rango']['s_pared'] = 'Salida Pared';
l['analisis_numerico_rango']['smash'] = 'Smash';
l['analisis_numerico_rango']['globo'] = 'Globo';
l['analisis_numerico_rango']['totales'] = 'Totales';

l['analisis_numerico_rango']['drive'] = 'Drive';
l['analisis_numerico_rango']['reves'] = 'Revés';

l['analisis_numerico_rango']['fondo'] = 'Fondo';
l['analisis_numerico_rango']['pantano'] = 'Pantano';
l['analisis_numerico_rango']['red'] = 'Red';


// JavaScript Document

function inicio_publicidad(){
  $('#publicidad .registro').click(function(){ mostrar_pagina('ajustes'); });
  var anuncio = Math.floor(Math.random() * 2) + 1;
  console.log('anuncio: ' + anuncio);
  $('#publicidad').css({'background': "url('img/anuncios/anuncio_" + anuncio + ".png')", 'background-size': 'cover'});
}

function mostrado_publicidad(){
  redimensionar_contenido('publicidad');
}

// codificación utf8

l['publicidad'] = {};

l['publicidad']['titulo'] = 'Publicidad';
l['publicidad']['me_interesa'] = 'Me interesa';
l['publicidad']['no_me_interesa'] = 'No me interesa';


// JavaScript Document

var preparacion_jugador_seleccionado = 0;
var preparacion_partido = {'jugador_1': '', 'jugador_2': '', 'jugador_3': '', 'jugador_4': '', 'tipo': '', 'fecha': '', 'hora': '', 'lugar': ''};

function inicio_preparacion(){

  $('.tipo .boton').click(function(){
    if($(this).hasClass('seleccionado')){
      $('.tipo .boton').removeClass('seleccionado');
      preparacion_partido.tipo = '';
    } else {
      $('.tipo .boton').removeClass('seleccionado');
      $(this).addClass('seleccionado');
      preparacion_partido.tipo = $(this).attr('tipo');
    }
  });

  $('.volver').click(function(){
    if(preparacion_partido.jugador_1 != '' || preparacion_partido.jugador_2 != '' || preparacion_partido.jugador_3 != '' || preparacion_partido.jugador_4 != '' || preparacion_partido.tipo != '' || preparacion_partido.fecha != '' || preparacion_partido.hora != '' || preparacion_partido.lugar != '')
      navigator.notification.confirm(l['preparacion']['medio_preparado'], function(b){ if(b == 1){ mostrar_pagina('inicio'); sincronizar_partidos(); }}, l['padelstat'], l['si'] + ',' + l['no']);
    else {
      mostrar_pagina('inicio');
      sincronizar_partidos();
    }
  });

  $('.jugador').click(function(){
    preparacion_jugador_seleccionado = $(this).attr('jugador');
    mostrar_pagina('agenda');
  });

  db.transaction(function(tx){

    if(preparacion_partido.jugador_1 != ''){
      tx.executeSql('select id, nombre, apellidos from jugadores where id=?', [preparacion_partido.jugador_1], function (tx, results) { 
        var j = results.rows.item(0);
        $('#preparacion .jugador_1').html(j.apellidos + ' ' + j.nombre.substr(0, 1));
      });
    }

    if(preparacion_partido.jugador_2 != ''){
      tx.executeSql('select id, nombre, apellidos from jugadores where id=?', [preparacion_partido.jugador_2], function (tx, results) { 
        var j = results.rows.item(0);
        $('#preparacion .jugador_2').html(j.apellidos + ' ' + j.nombre.substr(0, 1));
      });
    }

    if(preparacion_partido.jugador_3 != ''){
      tx.executeSql('select id, nombre, apellidos from jugadores where id=?', [preparacion_partido.jugador_3], function (tx, results) { 
        var j = results.rows.item(0);
        $('#preparacion .jugador_3').html(j.apellidos + ' ' + j.nombre.substr(0, 1));
      });
    }

    if(preparacion_partido.jugador_4 != ''){
      tx.executeSql('select id, nombre, apellidos from jugadores where id=?', [preparacion_partido.jugador_4], function (tx, results) { 
        var j = results.rows.item(0);
        $('#preparacion .jugador_4').html(j.apellidos + ' ' + j.nombre.substr(0, 1));
      });
    }

  });

  if(preparacion_partido.tipo != ''){
    $('.tipo .boton').removeClass('seleccionado');
    $('.tipo .boton.' + preparacion_partido.tipo).addClass('seleccionado');
  }

  $('#preparacion input.lugar').bind('change', function(){ preparacion_partido.lugar = $(this).val(); });
  if(preparacion_partido.lugar != '') $('#preparacion .lugar').prop('readonly', false).val(preparacion_partido.lugar);
  else {
    $('#preparacion #lista_lugares').html('<option value="">' + l['preparacion']['lugar_nuevo'] + '</option>');  
    db.transaction(function(tx){
      tx.executeSql('select distinct lugar from partidos order by lugar', [], function (tx, results) {
        for (i = 0; i < results.rows.length; i++){
          if(results.rows.item(i).lugar.trim() != ''){
            $('#preparacion #lista_lugares').append('<option value="' + results.rows.item(i).lugar + '">' + results.rows.item(i).lugar + '</option>');  
          }
        }
        $('#preparacion #lista_lugares').mobiscroll().select({ label: l['preparacion']['lugar'], theme: 'android-ics', lang: 'es', display: 'modal', mode: 'mixed', cancelText: l['cancelar'], setText: l['aceptar'], onShow: function(){ centrar_mobiscroll(); }, onSelect: function(value, instance){ var lugar = $('#preparacion #lista_lugares').val(); if(lugar == ''){ $('#preparacion input.lugar').prop('readonly', false).val('').focus().select(); } else { $('#preparacion input.lugar').prop('readonly', true).val(value); preparacion_partido.lugar = value; }} });
        $('#preparacion #lista_lugares, #preparacion .lugar').bind('click', function(){ if($('#preparacion input.lugar').prop('readonly')) $('#preparacion #lista_lugares').mobiscroll('show'); });
      });
    }); 
  }

  $('#preparacion .registro').click(function(){
    if(preparacion_partido.jugador_1 == '' || preparacion_partido.jugador_2 == '' || preparacion_partido.jugador_3 == '' || preparacion_partido.jugador_4 == ''){
      notificacion(l['preparacion']['faltan_jugadores']);
      return;
    } else if(preparacion_partido.tipo == ''){
      notificacion(l['preparacion']['falta_tipo']);
      return;
    } else if(preparacion_partido.fecha == ''){
      notificacion(l['preparacion']['falta_fecha']);
      return;
    } else if(preparacion_partido.hora == ''){
      notificacion(l['preparacion']['falta_hora']);
      return;
    } else {
      $(this).addClass('inactivo');
      preparacion_partido.lugar = $('#preparacion input.lugar').val().trim();

      db.transaction(function (tx){
        var id = md5(new Date().getTime().toString() + device.uuid);
        var fecha = preparacion_partido.fecha.split('/'); fecha = fecha[2] + '-' + fecha[1] + '-' + fecha[0];
        tx.executeSql('insert into partidos (id, fecha, hora, lugar, tipo, id_jugador_1, alias_jugador_1, id_jugador_2, alias_jugador_2, id_jugador_3, alias_jugador_3, id_jugador_4, alias_jugador_4, sets, juegos, puntos, puntos_tiebreak, tipo_puntos, marcador_local, marcador_visitante, marcador_set1_local, marcador_set1_visitante, marcador_set2_local, marcador_set2_visitante, marcador_set3_local, marcador_set3_visitante, marcador_set4_local, marcador_set4_visitante, marcador_set5_local, marcador_set5_visitante, coeficiente_1, coeficiente_2, coeficiente_3, coeficiente_4, observaciones, activo, finalizado, i_acciones, cambios_acciones, transferible) values (?, ?, ?, ?, ?, ?, "", ?, "", ?, "", ?, "", 3, 6, 4, 7, "estandar", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", "si", "no", 0, 0, "si")', [id, fecha, preparacion_partido.hora, preparacion_partido.lugar, preparacion_partido.tipo, preparacion_partido.jugador_1, preparacion_partido.jugador_2, preparacion_partido.jugador_3, preparacion_partido.jugador_4], 
          function(tx, results){ 
            ga_evento('partidos', 'preparacion');
            tx.executeSql('select alias from jugadores where id=?', [preparacion_partido.jugador_1], function(tx, results){ if(results.rows.item(0).alias != '') tx.executeSql('update partidos set alias_jugador_1=? where id=?', [results.rows.item(0).alias, id]); });
            tx.executeSql('select alias from jugadores where id=?', [preparacion_partido.jugador_2], function(tx, results){ if(results.rows.item(0).alias != '') tx.executeSql('update partidos set alias_jugador_2=? where id=?', [results.rows.item(0).alias, id]); });
            tx.executeSql('select alias from jugadores where id=?', [preparacion_partido.jugador_3], function(tx, results){ if(results.rows.item(0).alias != '') tx.executeSql('update partidos set alias_jugador_3=? where id=?', [results.rows.item(0).alias, id]); });
            tx.executeSql('select alias from jugadores where id=?', [preparacion_partido.jugador_4], function(tx, results){ if(results.rows.item(0).alias != '') tx.executeSql('update partidos set alias_jugador_4=? where id=?', [results.rows.item(0).alias, id]); });
            setTimeout('sincronizar_partidos(true)', 1000);
            notificacion(l['preparacion']['partido_preparado']); 
            mostrar_pagina('inicio');
          }, 
          function(tx, error){ 
            console.log(error.message); 
            notificacion(l['preparacion']['error_creando_partido']); 
            mostrar_pagina('inicio');
          }
        );
      });

    }
  });

  if(window.localStorage.getItem('ayuda_preparacion') == null){
    window.localStorage.setItem('ayuda_preparacion', 1);
    $('#preparacion .overlay').show();
    $('#preparacion .flash_ayuda').show();
    $('#preparacion .flash_ayuda .cerrar').click(function(){ $('#preparacion .flash_ayuda').hide(); $('#preparacion .overlay').hide(); });
  }

}

function mostrado_preparacion(){
  redimensionar_contenido('preparacion');

  $('#preparacion input.fecha').mobiscroll().date({
    label: l['preparacion']['fecha'], theme: 'android-ics', lang: 'es', display: 'modal', mode: 'mixed', 
    dateFormat: 'dd/mm/yy', dateOrder: 'ddMyy', 
    monthNamesShort: [l['ene'], l['feb'], l['mar'], l['abr'], l['may'], l['jun'], l['jul'], l['ago'], l['sep'], l['oct'], l['nov'], l['dic']], 
    cancelText: l['cancelar'], setText: l['aceptar'], 
    minDate: new Date(1995, 00, 01), maxDate: new Date(new Date().getFullYear() + 2, 11, 31), 
    onShow: function(){ centrar_mobiscroll(); },
    onSelect: function(val, inst){ preparacion_partido.fecha = val; }
  });
  $('#preparacion input.hora').mobiscroll().time({ 
    label: l['preparacion']['hora'], theme: 'android-ics', lang: 'es', display: 'modal', mode: 'mixed', 
    timeFormat: 'HH:ii', timeWheels: 'HHii', stepMinute: 15, 
    cancelText: l['cancelar'], setText: l['aceptar'], 
    onShow: function(){ centrar_mobiscroll(); },
    onSelect: function(val, inst){ preparacion_partido.hora = val; }
  });

  $('#preparacion .fecha').click(function(){ console.log('fecha'); $('#preparacion input.fecha').mobiscroll('show'); });
  $('#preparacion .hora').click(function(){ console.log('hora'); $('#preparacion input.hora').mobiscroll('show'); });

  if(preparacion_partido.fecha != '') $('#preparacion input.fecha').scroller('setValue', [preparacion_partido.fecha.substring(0, 2), preparacion_partido.fecha.substring(3, 5), preparacion_partido.fecha.substring(6, 10)], true);
  if(preparacion_partido.hora != '') $('#preparacion input.hora').scroller('setValue', [preparacion_partido.hora.substring(0, 2), preparacion_partido.hora.substring(3, 5)], true);

}

function sincronizar_partidos(forzar_actualizacion){

  if(debug) console.log('sincronizando partidos');

  if(cambios_partido > 0 || forzar_actualizacion){
    if(online()){
      db.transaction(function(tx){
        tx.executeSql('select * from partidos', [], function (tx, results) {
          var u = [];  for (i = 0; i < results.rows.length; i++) u[i] = results.rows.item(i);
          var jqxhr = $.post(url_api + 'sincronizar_partidos', {'id': encodeURI(id_usuario), 'i_partido': encodeURI(i_partido), 'actualizacion': JSON.stringify(u), 'firma': md5(id_usuario.toString() + i_partido.toString() + '' + clave_api), 'dummy': 'dummy'}, 
            function(data){ 
              cambios_partido = 0;
              window.localStorage.setItem('cambios_partido', cambios_partido);
              sincronizar_partidos(); 
            }
          );
          for (i = 0; i < results.rows.length; i++) sincronizar_acciones(results.rows.item(i).id);
        }); 
      });
    } else {
      cambios_partido = 1;
      window.localStorage.setItem('cambios_partido', cambios_partido);
    }
  } else {
    if(online()){
      var jqxhr = $.post(url_api + 'sincronizar_partidos', {'id': encodeURI(id_usuario), 'i_partido': encodeURI(i_partido), 'firma': md5(id_usuario.toString() + i_partido.toString() + '' + clave_api), 'dummy': 'dummy'}, function(data){ 
        db.transaction(function(tx){
          var r = JSON.parse(data);
          if(r[0] == 'ok' && r[2].length > 0){
            for(i = 0; i<r[2].length; i++){
              sincronizar_partido(r[2][i]);
              //var p = r[2][i];
              //tx.executeSql('insert or replace into partidos (id, fecha, hora, lugar, tipo, id_jugador_1, alias_jugador_1, id_jugador_2, alias_jugador_2, id_jugador_3, alias_jugador_3, id_jugador_4, alias_jugador_4, sets, juegos, puntos, puntos_tiebreak, tipo_puntos, marcador_local, marcador_visitante, marcador_set1_local, marcador_set1_visitante, marcador_set2_local, marcador_set2_visitante, marcador_set3_local, marcador_set3_visitante, marcador_set4_local, marcador_set4_visitante, marcador_set5_local, marcador_set5_visitante, observaciones, activo, finalizado, saque_1_set1, saque_2_set1, saque_3_set1, saque_4_set1, saque_1_set2, saque_2_set2, saque_3_set2, saque_4_set2, saque_1_set3, saque_2_set3, saque_3_set3, saque_4_set3, saque_1_set4, saque_2_set4, saque_3_set4, saque_4_set4, saque_1_set5, saque_2_set5, saque_3_set5, saque_4_set5, i_acciones) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)', [p.id, p.fecha, p.hora.substr(0, 5), p.lugar, p.tipo, p.id_jugador_1, p.alias_jugador_1, p.id_jugador_2, p.alias_jugador_2, p.id_jugador_3, p.alias_jugador_3, p.id_jugador_4, p.alias_jugador_4, p.sets, p.juegos, p.puntos, p.puntos_tiebreak, p.tipo_puntos, p.marcador_local, p.marcador_visitante, p.marcador_set1_local, p.marcador_set1_visitante, p.marcador_set2_local, p.marcador_set2_visitante, p.marcador_set3_local, p.marcador_set3_visitante, p.marcador_set4_local, p.marcador_set4_visitante, p.marcador_set5_local, p.marcador_set5_visitante, p.observaciones, p.activo, p.finalizado, p.saque_1_set1, p.saque_2_set1, p.saque_3_set1, p.saque_4_set1, p.saque_1_set2, p.saque_2_set2, p.saque_3_set2, p.saque_4_set2, p.saque_1_set3, p.saque_2_set3, p.saque_3_set3, p.saque_4_set3, p.saque_1_set4, p.saque_2_set4, p.saque_3_set4, p.saque_4_set4, p.saque_1_set5, p.saque_2_set5, p.saque_3_set5, p.saque_4_set5], function(){}, function(tx, e){ console.log(e); });
              //sincronizar_acciones(p.id);
            }
            i_partido = parseInt(r[1]);
            window.localStorage.setItem('i_partido', parseInt(i_partido));
          }
        });
      });
    }
  }

  db.transaction(function(tx){
    tx.executeSql('select * from partidos', [], function (tx, results) {
      for (i = 0; i < results.rows.length; i++) 
        sincronizar_acciones(results.rows.item(i).id);
    }); 
  });

  sincronizar_cambios_partidos_restantes();

}

function sincronizar_partido(p){
  db.transaction(function(tx){
    tx.executeSql("select * from partidos where id=?", [p.id], function(tx, results){
      if(results.rows.length == 0){
        tx.executeSql('insert into partidos (id, fecha, hora, lugar, tipo, id_jugador_1, alias_jugador_1, id_jugador_2, alias_jugador_2, id_jugador_3, alias_jugador_3, id_jugador_4, alias_jugador_4, sets, juegos, puntos, puntos_tiebreak, tipo_puntos, marcador_local, marcador_visitante, marcador_set1_local, marcador_set1_visitante, marcador_set2_local, marcador_set2_visitante, marcador_set3_local, marcador_set3_visitante, marcador_set4_local, marcador_set4_visitante, marcador_set5_local, marcador_set5_visitante, observaciones, activo, finalizado, saque_1_set1, saque_2_set1, saque_3_set1, saque_4_set1, saque_1_set2, saque_2_set2, saque_3_set2, saque_4_set2, saque_1_set3, saque_2_set3, saque_3_set3, saque_4_set3, saque_1_set4, saque_2_set4, saque_3_set4, saque_4_set4, saque_1_set5, saque_2_set5, saque_3_set5, saque_4_set5, coeficiente_1, coeficiente_2, coeficiente_3, coeficiente_4, i_acciones, cambios_acciones, transferible) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?)', [p.id, p.fecha, p.hora.substr(0, 5), p.lugar, p.tipo, p.id_jugador_1, p.alias_jugador_1, p.id_jugador_2, p.alias_jugador_2, p.id_jugador_3, p.alias_jugador_3, p.id_jugador_4, p.alias_jugador_4, p.sets, p.juegos, p.puntos, p.puntos_tiebreak, p.tipo_puntos, p.marcador_local, p.marcador_visitante, p.marcador_set1_local, p.marcador_set1_visitante, p.marcador_set2_local, p.marcador_set2_visitante, p.marcador_set3_local, p.marcador_set3_visitante, p.marcador_set4_local, p.marcador_set4_visitante, p.marcador_set5_local, p.marcador_set5_visitante, p.observaciones, p.activo, p.finalizado, p.saque_1_set1, p.saque_2_set1, p.saque_3_set1, p.saque_4_set1, p.saque_1_set2, p.saque_2_set2, p.saque_3_set2, p.saque_4_set2, p.saque_1_set3, p.saque_2_set3, p.saque_3_set3, p.saque_4_set3, p.saque_1_set4, p.saque_2_set4, p.saque_3_set4, p.saque_4_set4, p.saque_1_set5, p.saque_2_set5, p.saque_3_set5, p.saque_4_set5, p.coeficiente_1, p.coeficiente_2, p.coeficiente_3, p.coeficiente_4, p.transferible], 
          function(tx, results){ sincronizar_acciones(p.id); }, 
          function(tx, e){ console.log(e); }
        );
      } else {
        tx.executeSql('update partidos set fecha=?, hora=?, lugar=?, tipo=?, id_jugador_1=?, alias_jugador_1=?, id_jugador_2=?, alias_jugador_2=?, id_jugador_3=?, alias_jugador_3=?, id_jugador_4=?, alias_jugador_4=?, sets=?, juegos=?, puntos=?, puntos_tiebreak=?, tipo_puntos=?, marcador_local=?, marcador_visitante=?, marcador_set1_local=?, marcador_set1_visitante=?, marcador_set2_local=?, marcador_set2_visitante=?, marcador_set3_local=?, marcador_set3_visitante=?, marcador_set4_local=?, marcador_set4_visitante=?, marcador_set5_local=?, marcador_set5_visitante=?, observaciones=?, activo=?, finalizado=?, saque_1_set1=?, saque_2_set1=?, saque_3_set1=?, saque_4_set1=?, saque_1_set2=?, saque_2_set2=?, saque_3_set2=?, saque_4_set2=?, saque_1_set3=?, saque_2_set3=?, saque_3_set3=?, saque_4_set3=?, saque_1_set4=?, saque_2_set4=?, saque_3_set4=?, saque_4_set4=?, saque_1_set5=?, saque_2_set5=?, saque_3_set5=?, saque_4_set5=?, coeficiente_1=?, coeficiente_2=?, coeficiente_3=?, coeficiente_4=?, transferible=? where id=?', [p.fecha, p.hora.substr(0, 5), p.lugar, p.tipo, p.id_jugador_1, p.alias_jugador_1, p.id_jugador_2, p.alias_jugador_2, p.id_jugador_3, p.alias_jugador_3, p.id_jugador_4, p.alias_jugador_4, p.sets, p.juegos, p.puntos, p.puntos_tiebreak, p.tipo_puntos, p.marcador_local, p.marcador_visitante, p.marcador_set1_local, p.marcador_set1_visitante, p.marcador_set2_local, p.marcador_set2_visitante, p.marcador_set3_local, p.marcador_set3_visitante, p.marcador_set4_local, p.marcador_set4_visitante, p.marcador_set5_local, p.marcador_set5_visitante, p.observaciones, p.activo, p.finalizado, p.saque_1_set1, p.saque_2_set1, p.saque_3_set1, p.saque_4_set1, p.saque_1_set2, p.saque_2_set2, p.saque_3_set2, p.saque_4_set2, p.saque_1_set3, p.saque_2_set3, p.saque_3_set3, p.saque_4_set3, p.saque_1_set4, p.saque_2_set4, p.saque_3_set4, p.saque_4_set4, p.saque_1_set5, p.saque_2_set5, p.saque_3_set5, p.saque_4_set5, p.coeficiente_1, p.coeficiente_2, p.coeficiente_3, p.coeficiente_4, p.transferible, p.id], 
          function(tx, results){ sincronizar_acciones(p.id); }, 
          function(tx, e){ console.log(e); }
        );
      }
    });
  });
}

function sincronizar_cambios_partidos_restantes(){
  console.log('sincronizando cambios en partidos restantes...');
  var cambios_usuario_partidas = parseInt(window.localStorage.getItem('cambios_usuario_partidas'));
  console.log(cambios_usuario_partidas);
  if(online() && cambios_usuario_partidas != 0) {
    console.log('entro');
    var jqxhr = $.post(url_api + 'cambios_partidos_restantes', {'id_usuario': encodeURI(id_usuario), 'cambios_partidos_restantes': cambios_usuario_partidas, 'firma': md5(id_usuario.toString() + cambios_usuario_partidas.toString() + '' + clave_api), 'dummy': 'dummy'}, function(data){ 
      var r = JSON.parse(data);
      if(r[0] == 'ok'){
        window.localStorage.setItem('cambios_usuario_partidas', 0);
      }
    });
  }
}

function sincronizar_acciones(id_partido, forzar_actualizacion){
  
  db.transaction(function(tx){
    tx.executeSql('select i_acciones, cambios_acciones from partidos where id=?', [id_partido], function(tx, results){
      if(results.rows.length == 1){

        var i_acciones = results.rows.item(0).i_acciones;
        var cambios_acciones = results.rows.item(0).cambios_acciones;

        if(parseInt(cambios_acciones) > 0 || forzar_actualizacion != undefined){

          if(online()){
            tx.executeSql('select * from acciones where id_partido=? order by id', [id_partido], function (tx, results) {
              var u = [];  for (i = 0; i < results.rows.length; i++) u[i] = results.rows.item(i);
              var jqxhr = $.post(url_api + 'sincronizar_acciones', {'id': encodeURI(id_usuario), 'id_partido': encodeURI(id_partido), 'i_acciones': encodeURI(i_acciones), 'actualizacion': JSON.stringify(u), 'firma': md5(id_usuario.toString() + '' + id_partido.toString() + '' + i_acciones.toString() + '' + clave_api), 'dummy': 'dummy'}, 
                function(data){ 
                  db.transaction(function(tx){
                    tx.executeSql('update partidos set cambios_acciones=0 where id=?', [id_partido], function(tx, results){
                      sincronizar_acciones(id_partido);   
                    });
                  }); 
                }
              );
            });
          } else {
            tx.executeSql('update partidos set cambios_acciones=1 where id=?', [id_partido]);
          }

        } else {

          if(online()){
            
            console.log(md5(id_usuario.toString() + '' + id_partido.toString() + '' + i_acciones.toString() + '' + clave_api));

            var jqxhr = $.post(url_api + 'sincronizar_acciones', {'id': encodeURI(id_usuario), 'id_partido': encodeURI(id_partido), 'i_acciones': encodeURI(i_acciones), 'firma': md5(id_usuario.toString() + '' + id_partido.toString() + '' + i_acciones.toString() + '' + clave_api), 'dummy': 'dummy'}, function(data){ 
              db.transaction(function(tx){
                var r = JSON.parse(data);
                if(r[0] == 'ok' && r[2].length > 0){
                  if(i_acciones < parseInt(r[1])){

                    if(debug) console.log('sincronizando acciones id_partido: ' + id_partido);
                
                    tx.executeSql('delete from acciones where id_partido=?', [id_partido], function(tx, results){
                      for(i = 0; i<r[2].length; i++){
                        var a = r[2][i];
                        tx.executeSql('insert into acciones (id_partido, id, id_jugador, n_jugador, saque, accion, golpe, mano, donde, n_set, n_juego, marcador_juego_local, marcador_juego_visitante, variacion_local, variacion_visitante, marcador_local, marcador_visitante, marcador_set1_local, marcador_set1_visitante, marcador_set2_local, marcador_set2_visitante, marcador_set3_local, marcador_set3_visitante, marcador_set4_local, marcador_set4_visitante, marcador_set5_local, marcador_set5_visitante) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id_partido, a.id, a.id_jugador, a.n_jugador, a.saque, a.accion, a.golpe, a.mano, a.donde, a.n_set, a.n_juego, a.marcador_juego_local, a.marcador_juego_visitante, a.variacion_local, a.variacion_visitante, a.marcador_local, a.marcador_visitante, a.marcador_set1_local, a.marcador_set1_visitante, a.marcador_set2_local, a.marcador_set2_visitante, a.marcador_set3_local, a.marcador_set3_visitante, a.marcador_set4_local, a.marcador_set4_visitante, a.marcador_set5_local, a.marcador_set5_visitante]);
                      }
                      tx.executeSql('update partidos set i_acciones=?, cambios_acciones=0 where id=?', [parseInt(r[1]), id_partido]);
                    });

                  }                  
                }
              });
            });
          }

        }

      }
    });
  });

}

// codificación utf8

l['preparacion'] = {};

l['preparacion']['titulo'] = 'Preparación de partido';

l['preparacion']['nosotros'] = 'Nosotros';
l['preparacion']['rival'] = 'Rival';
l['preparacion']['fecha'] = 'Fecha';
l['preparacion']['hora'] = 'Hora';
l['preparacion']['lugar'] = 'Lugar';
l['preparacion']['lugar_nuevo'] = 'Nuevo lugar';
l['preparacion']['medio_preparado'] = 'Tienes un partido a medio preparar, si vuelves al menú de inicio perderás esta información ¿estás seguro?';

l['preparacion']['faltan_jugadores'] = 'Faltan jugadores para completar el partido';
l['preparacion']['falta_tipo'] = 'Debes seleccionar el tipo de partido';
l['preparacion']['falta_fecha'] = 'Debes indicar la fecha del partido';
l['preparacion']['falta_hora'] = 'Debes indicar la hora del partido';

l['preparacion']['error_creando_partido'] = 'Ha ocurrido un error creando el partido';
l['preparacion']['partido_preparado'] = 'Partido preparado';


l['padelstat'] = 'padelstat';
l['aceptar'] = 'Aceptar';
l['cancelar'] = 'Cancelar';
l['cerrar'] = 'Cerrar';
l['siguiente'] = 'Siguiente';
l['volver'] = 'Volver';
l['registrar'] = 'Registrar';
l['eliminar'] = 'Eliminar';
l['estas_seguro'] = '¿Estás seguro?';
l['si'] = 'si';
l['no'] = 'no';

l['offline'] = 'No hay conexión a Internet, conéctate e inténtalo de nuevo';
l['api_error_conexion'] = 'Ha ocurrido un error accediendo al servidor padelstat, por favor inténtalo de nuevo';

l['drive'] = 'Drive';
l['reves'] = 'Revés';

l['ene'] = 'ene';
l['feb'] = 'feb';
l['mar'] = 'mar';
l['abr'] = 'abr';
l['may'] = 'may';
l['jun'] = 'jun';
l['jul'] = 'jul';
l['ago'] = 'ago';
l['sep'] = 'sep';
l['oct'] = 'oct';
l['nov'] = 'nov';
l['dic'] = 'dic';

l['quedan_pocas_partidas'] = 'Dispones de N licencias de partidos. Adquiere una nueva licencia.';
l['no_quedan_partidas'] = 'Has agotado tu licencia de partidos. Adquiere una nueva licencia para registrar nuevos partidos.';

l['ayuda'] = '' +

  '<div class="guia_rapida">' +
  '<h1>Guía Rápida de Ayuda</h1>' + 
  '<a class="cambio_ayuda">Ver ayuda completa</a>' +
  '<p>A continuación se presenta la guía rápida con las indicaciones básicas para poder registrar los marcadores o estadísticas de partidos de una manera sencilla.</p>' +
  '<p>IMPORTANTE: Botón < padelstat. En todas las pantallas existe un botón en la esquina superior izquierda que permitirá al usuario volver desde cualquier pantalla a la pantalla de anterior de padelstat.<img src="img/ayuda/boton_inicio.png"></p>' +
  '<p>La aplicación se divide en tres botones principales que hacen referencia a los tres posibles instantes con respecto a un partido:</p>' +
  '<ul>' +
  '<li>Previo al partido   <img src="img/ayuda/boton_preparacion.png"></li>' +
  '<li>Durante el partido  <img src="img/ayuda/boton_registro_partida.png"></li>' +
  '<li>Posterior al partido  <img src="img/ayuda/boton_analisis.png"></li>' +
  '</ul>' +
  '<p>Preparación <img src="img/ayuda/boton_preparacion.png"></p>' +
  '<p>Antes de disputar un partido prepararemos la información necesaria. Una vez pulsado el botón Preparación completaremos los siguientes pasos:</p>' +
  '<p>Paso 1 – Introducción de los Jugadores seleccionando cada uno de los cuatro jugadores en la representación de la pista. Se podrán añadir, modificar y eliminar jugadores de la agenda. </p>' +
  '<p><img src="img/ayuda/pista_cuatro_jugadores.png"></p>' +
  '<p>Paso 2 – Selección de Tipo de Partido. Se elegirá entre Amistoso o Torneo.</p>' +
  '<p><img src="img/ayuda/iconos_partido.png"></p>' +
  '<p>Paso 3 – Introducción de la Fecha, Hora y Lugar de celebración.</p>' +
  '<p><img src="img/ayuda/boton_hora.png"></p>' +
  '<p>Paso 4 – Pulsar el botón Registrar para confirmar</p>' +
  '<p><img src="img/ayuda/boton_registrar.png"></p>' +
  '<p>Registro <img src="img/ayuda/boton_registro_partida.png"></p>' +
  '<p>Desde el botón Registro podremos registrar el marcador de un partido, una vez disputado, o registrar las estadísticas de los jugadores durante el partido. Los pasos serán los siguientes:</p>' +
  '<p>Paso 1 – Seleccionar el partido a registrar de la lista de partidos preparados</p>' +
  '<p>Paso 2 – Elegir entre registrar el marcador de la partida o las estadísticas </p>' +
  '<p>Si se eliges registrar el marcador :</p>' +
  '<p>Paso 3 – Completar el resultado de cada set así como un comentario o nota opcional</p>' +
  '<p>Si eliges registrar las estadísticas :</p>' +
  '<p>Paso 3 – Iniciar el partido pulsando el botón de inicio de partido</p>' +
  '<p><img src="img/ayuda/boton_play.png"></p>' +
  '<p>Paso 4 – Seleccionar el jugador que comienza con el servicio. padelstat solicitará el jugador que dispone del servicio en el primer y segundo juego de cada set, después generará automáticamente la secuencia de saque de cada set.</p>' +
  '<p><img src="img/ayuda/pista_cuatro_jugadores.png"></p>' +
  '<p>Paso 5 – Cada vez que haya finalizado un punto, seleccionaremos el jugador que lo finalizó</p>' +
  '<p><img src="img/ayuda/pista_cuatro_jugadores.png"></p>' +
  '<p>Paso 6 – Seleccionaremos el tipo de finalización del punto: Error No Forzado, Error Forzado o Punto Ganado</p>' +
  '<p><img src="img/ayuda/boton_enf_ef_pg.png"></p>' +
  '<p>En el caso de haber seleccionado el registro de golpes, aparecerá una segunda pantalla de golpes en la que seleccionaremos  los siguientes eventos:</p>' +
  '<p>Paso 6.1 – Selección de tipo de golpe con el que se ha finalizado el punto</p>' +
  '<p><img src="img/ayuda/botones_acciones.png"></p>' +
  '<p>Paso 6.2 – Selección de Drive o Revés</p>' +
  '<p><img src="img/ayuda/boton_drive_reves.png"></p>' +
  '<p>Paso 6.3 – Selección de Ubicación en el golpe, siendo: </p>' +
  '<ul>' +
  '<li>Fondo:  espacio entre la línea de saque y el final de la pista</li>' +
  '<li>Red: espacio definido entre la red y los primeros tres metros de pista aprox.</li>' +
  '<li>Pantano:  el espacio intermedio comprendido entre Red y Fondo </li>' +
  '</ul>' +
  '<p><img src="img/ayuda/boton_pantano.png"></p>' +
  '<p>Paso 7 – Para confirmar la selección de datos realizada pulsaremos el botón Registrar.</p>' +
  '<p><img src="img/ayuda/boton_registrar.png"></p>' +
  '<p>padelstat modificará automáticamente el marcador del partido y volverá al Paso 4 para la introducción de los datos estadísticos de un nuevo punto.</p>' +
  '<p>El usuario podrá finalizar la toma de datos del partido pulsando el botón Finalizar en cualquier momento. También podrá pausar el partido para reanudarlo posteriormente.</p>' +
  '<p><img src="img/ayuda/boton_pausa.png"></p>' +
  '<p>Si hubiera algún desfase entre el marcador real del partido y el marcador que indica padelstat, el usuario podrá modificar manualmente el marcador con las flechas a cada lado del indicador de tanteo de los juegos.</p>' +
  '<p><img src="img/ayuda/boton_marcador.png"></p>' +
  '<p>Análisis <img src="img/ayuda/boton_analisis.png"></p>' +
  '<p>Una vez finalizado el partido podremos analizar las estadísticas. Para ello pulsaremos el botón de Análisis:</p>' +
  '<p>Paso 1 – Seleccionar entre el análisis de un único partido o de un rango de partidos. </p>' +
  '<p><img src="img/ayuda/boton_partido_rango.png"></p>' +
  '<p>Paso 2 – Seleccionar el partido o el rango de partidos a analizar. En caso de seleccionar un partido, se elegirá el partido de la lista de partidos finalizados. En caso de seleccionar un rango de partidos, se elegirá el rango temporal a analizar.</p>' +
  '<p>Paso 3 - Una vez se muestre la información estadística el usuario podrás realizar las siguientes acciones:</p>' +
  '<ul>' +
  '<li>Navegar entre las diferentes pantallas estadísticas utilizando las flechas laterales.</li>' +
  '<li>Visualizar las estadísticas en modo numérico o en modo porcentaje<br/>' +
  '<img src="img/ayuda/boton_graf_num.png"></li>' +
  '<li>Visualizar las estadísticas en modo gráfico<br/>' +
  '<img src="img/ayuda/boton_grafico.png"></li>' +
  '<li>Compartir la estadística en pantalla a través de email o las redes sociales.<br/>' +
  '[COLOCAR BOTON COMPARTIR]</li>' +
  '<li>Acudir a la ayuda sobre el análisis gráfico representado<br/>' +
  '[COLOCAR BOTON AYUDA]</li>' +
  '</ul>' +
  '</div>' +

  '<div class="ayuda_completa">' +
  '<h1>INDICE DE LA AYUDA</h1>' +
  '<a class="cambio_ayuda">Ver sólo la guía rápida de ayuda</a>' +
  '<ul>' +
  '<li>Guía Rápida</li>' +
  '<li>Error Forzado, Error No Forzado, Punto Ganado</li>' +
  '<li>Tipos de Golpes</li>' +
  '<li>Ubicación en la pista</li>' +
  '<li>Coeficiente padelstat</li>' +
  '<li>Análisis Estadístico</li>' +
  '<li>Funcionalidades Avanzadas padelstat</li>' +
  '</ul>' + 
  '<h2>Guía Rápida</h2>' +
  '<p>A continuación se presenta la guía rápida que dispone de las indicaciones básicas para poder registrar los marcadores o estadísticas de partidos de una manera sencilla.</p>' +
  '<p>La aplicación se divide en tres botones que hace referencia a los tres posibles instantes con respecto a un partido:</p>' +
  '<ul>' +
  '<li>Previo al partido <img src="img/ayuda/boton_preparacion.png"></li>' +
  '<li>Durante el partido <img src="img/ayuda/boton_registro_partida.png"></li>' +
  '<li>Posterior al partido <img src="img/ayuda/boton_analisis.png"></li>' +
  '</ul>' +
  '<p></p>' +
  '<p>Preparación <img src="img/ayuda/boton_preparacion.png"></p>' +
  '<p>Antes de disputar un partido procederemos a la preparación del mismo. Una vez pulsado el botón Preparación haremos los siguientes pasos:</p>' +
  '<p>Paso 1 – Introducción de los Jugadores seleccionando cada uno de los jugadores  en la representación de la pista. Se podrán añadir, modificar y eliminar jugadores de la agenda. </p>' +
  '<p><img src="img/ayuda/pista_cuatro_jugadores.png"></p>' +
  '<p>Paso 2 – Selección de Tipo de Partido. Se elegirá entre Amistoso o Torneo.</p>' +
  '<p><img src="img/ayuda/iconos_partido.png"></p>' +
  '<p>Paso 3 – Introducción de la Fecha, Hora y Lugar de celebración.</p>' +
  '<p><img src="img/ayuda/boton_hora.png"></p>' +
  '<p>Paso 4 – Pulsar el botón Registrar para confirmar</p>' +
  '<p><img src="img/ayuda/boton_registrar.png"></p>' +
  '<p></p>' +
  '<p>Registro <img src="img/ayuda/boton_registro_partida.png"></p>' +
  '<p>En el momento en que se dispute el partido tomaremos las estadísticas del mismo a través del botón de Registro. Los pasos serán los siguientes:</p>' +
  '<p>Paso 1 – Seleccionar el partido a registrar de la lista de partidos preparados</p>' +
  '<p>Paso 2 – Elegir entre registrar el marcador de la partida o las estadísticas </p>' +
  '<p>Si se eliges registrar el marcador :</p>' +
  '<p>Paso 3 – Completar el resultado de cada set así como un comentario o nota opcional</p>' +
  '<p>Si eliges registrar las estadísticas :</p>' +
  '<p>Paso 3 – Iniciar el partido pulsando el botón de inicio de partido</p>' +
  '<p><img src="img/ayuda/boton_play.png"></p>' +
  '<p>Paso 4 – Seleccionar el jugador que comienza con el servicio. Padelstat solicitará el jugador que dispone del servicio en el primer y segundo juego de cada set, después generará automáticamente la secuencia de saque de cada set.</p>' +
  '<p><img src="img/ayuda/pista_cuatro_jugadores.png"></p>' +
  '<p></p>' +
  '<p>Paso 5 – Cada vez que haya finalizado un punto, seleccionaremos el jugador que lo finalizó</p>' +
  '<p><img src="img/ayuda/pista_cuatro_jugadores.png"></p>' +
  '<p>Paso 6 – Seleccionaremos el tipo de finalización del punto: Error No Forzado, Error Forzado o Punto Ganado</p>' +
  '<p><img src="img/ayuda/boton_enf_ef_pg.png"></p>' +
  '<p>En el caso de que el punto haya sido finalizado por el usuario de padelstat, aparecerá la pantalla de golpes en la que seleccionaremos  los siguientes eventos:</p>' +
  '<p>Paso 6.1 – Selección de tipo de golpe con el que se ha finalizado el punto</p>' +
  '<p><img src="img/ayuda/botones_acciones.png"></p>' +
  '<p>Paso 6.2 – Selección de Drive o Revés</p>' +
  '<p><img src="img/ayuda/boton_drive_reves.png"></p>' +
  '<p>Paso 6.3 – Selección de Ubicación en el golpe, siendo: </p>' +
  '<ul>' +
  '<li>Fondo:  espacio entre la línea de saque y el final de la pista</li>' +
  '<li>Red: espacio definido entre la red y los primeros tres metros de pista aprox.</li>' +
  '<li>Pantano:  el espacio intermedio comprendido entre Red y Fondo </li>' +
  '</ul>' +
  '<p><img src="img/ayuda/boton_pantano.png"></p>' +
  '<p>Paso 7 – Para confirmar la selección de datos realizada pulsaremos el botón Registrar.</p>' +
  '<p><img src="img/ayuda/boton_registrar.png"></p>' +
  '<p>Padelstat modificará automáticamente el marcador del partido y volverá al Paso 4 para la introducción de los datos estadísticos de un nuevo punto en el partido.</p>' +
  '<p>El usuario podrá finalizar la toma de datos del partido pulsando el botón Finalizar en cualquier momento del partido. También podrá pausar el partido para reanudarlo posteriormente.</p>' +
  '<p><img src="img/ayuda/boton_pausa.png"></p>' +
  '<p>Si hubiera algún desfase entre el marcador real del partido y el marcador que indica padelstat, el usuario podrá modificar manualmente el marcador con las flechas a cada lado del indicador de tanteo de los juegos.</p>' +
  '<p><img src="img/ayuda/boton_marcador.png">)</p>' +
  '<p></p>' +
  '<p>Análisis <img src="img/ayuda/boton_analisis.png"></p>' +
  '<p>Una vez finalizado el partido procederemos a analizar las estadísticas registradas. Para ello pulsaremos el botón de Análisis:</p>' +
  '<p>Paso 1 – Seleccionar entre el análisis de un único partido o de un rango de partidos. </p>' +
  '<p><img src="img/ayuda/boton_partido_rango.png"></p>' +
  '<p>Paso 2 – Seleccionar el partido o el rango de partidos a analizar. En caso de seleccionar un partido, se elegirá el partido de la lista de partidos finalizados. En caso de seleccionar un rango de partidos, se elegirá el rango temporal a analizar.</p>' +
  '<p>Paso 3 - Una vez se muestre la información estadística el usuario podrás realizar las siguientes acciones:</p>' +
  '<ul>' +
  '<li>Navegar entre las diferentes pantallas estadísticas haciendo un movimiento de scroll con el dedo sobre la pantalla.</li>' +
  '<li>Visualizar las estadísticas en modo numérico o en modo porcentajes<br/>' +
  '<img src="img/ayuda/boton_graf_num.png"></li>' +
  '<li>Visualizar las estadísticas en modo gráfico<br/>' +
  '<img src="img/ayuda/boton_grafico.png"></li>' +
  '<li>Acudir a la ayuda sobre el análisis gráfico representado<br/>' +
  '<img src="img/ayuda/boton_ayuda.png"></li>' +
  '<li>Volver a la pantalla anterior<br/>' +
  '<img src="img/ayuda/boton_inicio.png"></li>' +
  '</ul>' +
  '<p></p>' +
  '<h2>Error Forzado, Error No Forzado, Punto Ganado</h2>' +
  '<p>La finalización de un golpe por parte de cualquiera de los cuatro jugadores del partido podrá realizarse de tres maneras: con un Error No Forzado, un Error Forzado o a través de un Punto Ganado. A continuación describiremos las características y diferencias de los tres tipos de finalización de un punto.</p>' +
  '<ul>' +
  '<li>Error No Forzado  <img src="img/ayuda/boton_enf.png">' +
    '<p>El Error No Forzado se produce cuando se comete un error en una bola fácil que no generaba una baja dificultad para su resolución, es decir, había más de una opción para poder pasar la bola al otro campo sin problemas.</p>' +
    '<p>Existen distintos tipos de errores no forzados como: mala ejecución de un golpe, por distracción o falta de concentración, por dudar en momentos importantes del partido a causa de la presión, por cansancio o generados por golpes agresivos o arriesgados.</p>' +
  '</li>' +
  '<li>Error Forzado   <img src="img/ayuda/boton_ef.png">' +
    '<p>Denominaremos como Error Forzado aquel golpe en el que se comete un error a causa de la dificultad de la bola jugada por el rival, y que no deja posibilidad alguna de pasar la bola al otro campo. </p>' +
    '<p>En ocasiones la línea entre un Error No Forzado y un Error Forzado será muy fina y dependerá también del nivel del jugador en cuestión. Para un principiante el error tras una contra pared del rival puede interpretarse como Error Forzado mientras que para un profesional sería sin duda un Error No Forzado.</p>' +
  '</li>' +
  '<li>Punto Ganado    <img src="img/ayuda/boton_pg.png">' +
    '<p>Un Punto Ganado se genera cuando se juega una bola que el rival no tiene ninguna posibilidad de resolverla y pasarla de vuelta al campo contrario. Generalmente es cuando el contrario no llega a tocar siquiera la bola.</p>' +
    '<p>Ejemplos de puntos ganados son: sacar la bola de la pista por 4 metros, traer la bola de vuelta a su propio campo con un smash de potencia, sacar la bola por el alambre lateral de 3 metros, ejecutar una salida de pared que no deja opción a resolverla, voleas altas desde la red que el rival no consigue impactar.</p>' +
    '<p>A diferencia del tenis, el punto de saque en el pádel se considera, en la mayoría de los casos, como un Error Forzado del rival, salvo que el contrario no haya podido ni impactar la bola tras un muy buen saque. </p>' +
  '</li>' +
  '</ul>' +
  '<h2>Tipos de Golpes</h2>' +
  '<p>Las estadísticas tomadas del usuario de padelstat permitirán profundizar en el tipo de golpe con el que ha sido finalizado el punto, con el fin de identificar fortalezas y debilidades del juego y poder mejorar aquellos golpes que generan mayores errores durante el partido. A continuación se describen los tipos de golpes posibles:</p>' +
  '<ul>' +
  '<li>Primer Saque     <img src="img/ayuda/golpe_primer.png">' +
    '<p>Cuando el jugador realiza un primer servicio.</p>' +
  '</li>' +
  '<li>Segundo Saque    <img src="img/ayuda/golpe_segundo.png">' +
    '<p>Cuando el jugador repite el servicio después de fallo en el primero. </p>' +
  '</li>' +
  '<li>Resto      <img src="img/ayuda/golpe_resto.png">' +
    '<p>Se lo denomina así a la devolución de saque.</p>' +
  '</li>' +
  '<li>Bote Pronto    <img src="img/ayuda/golpe_bote.png">' +
    '<p>Cuando se impacta a una pelota inmediatamente después del bote, golpeando la bola en el momento en que está subiendo.</p>' +
  '</li>' +
  '<li>Directo      <img src="img/ayuda/golpe_directo.png">' +
    '<p>Son los golpes que se realizan antes del rebote de la bola en las paredes. Comúnmente se les conoce como derecha (o drive) y revés. </p>' +
  '</li>' +
  '<li>Volea      <img src="img/ayuda/golpe_volea.png">' +
    '<p>Golpes usados para impactar la bola antes de que bote en el suelo. Generalmente son golpes que se ejecutan desde la red. </p>' +
  '</li>' +
  '<li>Bandeja    <img src="img/ayuda/golpe_bandeja.png">' +
    '<p>Es usado para mantener la red ante globos pasados del rival en donde la paleta impacta a la pelota con la cara más abierta buscando generar menos rebote luego de impactar en la pared. Se utiliza para mantener la posición en la red ante una situación incómoda.</p>' +
  '</li>' +
  '<li>Salida de Pared    <img src="img/ayuda/golpe_pared.png">' +
    '<p>Se utiliza para contragolpear tras un ataque del rival que produce rebote en la pared de fondo. Normalmente estas bolas producen suficiente rebote como para que el jugador impacte a la bola por encima de su cintura, “cortando las patas de la bola”. </p>' +
  '</li>' +
  '<li>Smash      <img src="img/ayuda/golpe_smash.png">' +
    '<p>Golpe de potencia que persigue la terminación del punto impidiendo al contrario devolver la bola. Son golpes que se ejecutan de arriba hacia abajo y que, en la mayoría de ocasiones, se producen cerca de la red tras un globo corto del rival.</p>' +
  '</li>' +
  '<li>Globo      <img src="img/ayuda/golpe_globo.png">' +
    '<p>Son los golpes que se hacen de abajo hacia arriba, buscando altura y profundidad como para sacar a los rivales de la red o hacer que impacten incómodos los smash. </p>' +
  '</li>' +
  '</ul>' +
  '<p></p>' +
  '<h2>Ubicación en la pista</h2>' +
  '<p>La información de la ubicación en la pista a la hora de registrar el final de un punto por parte del jugador, se utiliza posteriormente para analizar aquellos golpes ganados o fallados y en las posiciones en la pista donde son más frecuentes.</p>' +
  '<p>Por ejemplo, nos podrá indicar si debemos mejorar las voleas que golpeamos desde la red o indicarnos que nuestro golpe de smash es ganador cuando estamos en la red pero no cuando lo ejecutamos desde el pantano. Las áreas en las que se divide la pista son las siguientes:</p>' +
  '<ul>' +
    '<li>Fondo:  espacio entre la línea de saque y el final de la pista</li>' +
    '<li>Red: espacio definido entre la red y los primeros tres metros de pista aprox.</li>' +
    '<li>Pantano:  el espacio intermedio comprendido entre Red y Fondo </li>' +
  '</ul>' +
  '<p>El mapa aproximado de las ubicaciones en la pista se muestra a continuación:</p>' +
  '<p><img src="img/ayuda/pista_zonas.png"></p>' +
  '<p></p>' +
  '<h2>Coeficiente padelstat</h2>' +
  '<p>El coeficiente padelstat determina el rendimiento de un jugador en un partido. Este coeficiente se calcula a través de una fórmula que tiene en cuenta los Errores Forzados, Errores No Forzados y los Puntos Ganados por cada jugador y obtiene un valor que permite la comparación entre el rendimiento del jugador y el rendimiento de los otros tres jugadores.</p>' +
  '<p>Este coeficiente no tiene en cuenta aspectos como el nivel superior o inferior de los rivales y del compañero ni si es un partido amistoso o un torneo, con lo que el coeficiente obtenido en cada partido deberá ser puesto en referencia a estas variables por el propio jugador.</p>' +
  '<p>En general podemos decir que el rendimiento objetivo de un jugador (sin tener en cuenta las variables previamente apuntadas), podrá resumirse de la siguiente manera:</p>' +
  '<ul>' +
    '<li>Entre 150 y 50    Rendimiento excelente</li>' +
    '<li>Entre 50 y 10   Rendimiento alto</li>' +
    '<li>Entre 10 y -10    Rendimiento medio</li>' +
    '<li>Entre -10 y -50   Rendimiento bajo</li>' +
    '<li>Entre -50 y -150  Rendimiento muy bajo</li>' +
  '</ul>' +
  '<p>Para un jugador que esté disputando un torneo y que haya jugado un partido contra una pareja muy superior, un coeficiente padelstat de 60 sería un rendimiento excelente, mientras que, al contrario, un jugador que en un torneo haya obtenido un coeficiente padelstat de 5 contra una pareja muy inferior, deberá asimilar que su rendimiento ha sido malo.</p>' +
  '<p></p>' +
  '<h2>Análisis Estadístico</h2>' +
  '<p>Desde las pantallas de Análisis Estadístico podremos revisar la información estadística introducida en cada uno de los partidos registrados. Dependiendo de la versión de padestat instalada, el análisis podrá ser de un único partido seleccionado por el usuario del listado de partidos jugados, o de un rango de partidos también seleccionado por el usuario. Esta última funcionalidad de análisis sólo está disponible en la versión padelstat PRO.</p>' +
  '<p></p>' +
  '<h3>Análisis estadístico de un partido </h3>' +
  '<p><img src="img/ayuda/boton_un_partido.png"></p>' +
  '<p></p>' +
  '<p>En el primer bloque de información de esta pantalla podremos revisar los aspectos estadísticos fundamentales referentes a un partido. A continuación se muestra la información disponible:</p>' +
  '<p></p>' +
  '<ul>' +
    '<li>ENF, EF, PG por Jugador. Se mostrará la información de los errores no forzados, errores forzados y puntos ganados que han generado cada uno de los cuatro jugadores.</li>' +
    '<li>1s, 2s del usuario de la aplicación. Se mostrarán los aciertos y el total de primeros y segundos servicios del jugador usuario de la aplicación.</li>' +
    '<li>Breaks por jugador. Se mostrarán el número de veces que le ha sido quebrado el servicio a cada jugador con respecto de los juegos en los que este jugador ha realizado el servicio.</li>' +
    '<li>Coef ps por jugador. Se mostrará el coeficiente de rendimiento padelstat para cada uno de los jugadores. Ver coeficiente padelstat (link a la explicación del coeficiente padelstat).</li>' +
  '</ul>' +
  '<p></p>' +
  '<p>El segundo bloque de información de esta pantalla contendrá estadísticas relativas sólo al jugador usuario de la app. En este bloque se muestra la información sobre los errores no forzados, errores forzados y puntos ganados con respecto a los diferentes golpes con los que han sido generados. Estos golpes están agrupados en Servicio, Resto, Bote Pronto, Directo, Volea, Bandeja, Salida de Pared, Smash y Globo.</p>' +
  '<p></p>' +
  '<p>En el tercer bloque nuevamente se muestra información relativa al usuario de la app. En este caso la comparativa se realiza sobre los errores forzados, errores no forzados y puntos ganados con respecto a la orientación de la pala al ejecutar el golpe (Drive o Revés) y a la ubicación del jugador en la pista (Fondo, Pantano, Red).</p>' +
  '<p> </p>' +
  '<h3>Análisis estadístico de un rango de partidos</h3>' +
  '<p><img src="img/ayuda/boton_rango_partidos.png"></p>' +
  '<p></p>' +
  '<p>A través de las estadísticas de un rango de partidos, podremos comparar el rendimiento de una serie de indicadores entre la media del rango de los partidos seleccionados con respecto al último partido registrado.</p>' +
  '<p></p>' +
  '<p>El primer bloque de información de rango de partidos contendrá un resumen de los partidos, sets y juegos incluidos en el rango seleccionado por el usuario. Se mostrarán los partidos, sets y juegos ganados y perdidos por parte del usuario de la aplicación.</p>' +
  '<p></p>' +
  '<p>En el segundo bloque de información de esta pantalla podremos revisar los aspectos estadísticos fundamentales referentes a un partido. A continuación se muestra la información disponible:</p>' +
  '<p></p>' +
  '<ul>' +
    '<li>ENF, EF, PG por Rango de Partidos y Ultimo Partido.. Se mostrará la información de los errores no forzados, errores forzados y puntos ganados.</li>' +
    '<li>1s, 2s Por Rango de Partidos y Ultimo Partido. Se mostrarán los aciertos y el total de primeros y segundos servicios del jugador usuario de la aplicación.</li>' +
    '<li>Breaks por Rango de Partidos y Ultimo Partido. Se mostrarán el número de veces que le ha sido quebrado el servicio al usuario de la aplicación con respecto de los juegos en los que este jugador ha realizado el servicio.</li>' +
    '<li>Coef ps por Rango de Partidos y Ultimo Partido. Se mostrará el coeficiente de rendimiento padelstat del jugador usuario de la aplicación. Ver coeficiente padelstat (link a la explicación del coeficiente padelstat).</li>' +
  '</ul>' +
  '<p></p>' +
  '<p>El tercer bloque de información de esta pantalla contendrá estadísticas relativas al rango de partidos seleccionado. En este bloque se muestra la comparativa sobre los errores no forzados, errores forzados y puntos ganados con respecto a los diferentes golpes con los que han sido generados. Estos golpes están agrupados en Servicio, Resto, Bote Pronto, Directo, Volea, Bandeja, Salida de Pared, Smash y Globo.</p>' +
  '<p></p>' +
  '<p>En el cuarto bloque nuevamente se muestra información relativa al rango de partidos. En este caso la comparativa se realiza sobre los errores forzados, errores no forzados y puntos ganados con respecto a la orientación de la pala al ejecutar el golpe (Drive o Revés) y a la ubicación del jugador en la pista (Fondo, Pantano, Red).</p>' +
  '<p></p>' +
  '<h2>Funcionalidades Avanzadas padelstat</h2>' +
  '<p>Previamente a la revisión de las funcionalidades avanzadas de padelstat, recomendamos al usuario la lectura de la Guía Rápida (colocar link a Guía Rápida) con el fin de conocer las funcionalidades básicas de padelstat.</p>' +
  '<h3>General</h3>' +
  '<p>Versión padelstat. La versión padelstat podrá ser comprobada en cada pantalla en la esquina superior izquierda. Las versiones actualmente disponibles son:</p>' +
  '<ul>' +
    '<li>padelstat demo</li>' +
    '<li>padelstat</li>' +
    '<li>padelstat PRO</li>' +
  '</ul>' +
  '<p>Para averiguar el número de versión instalada el usuario deberá acceder a la pantalla de Ajustes y Configuración desde la botonera inferior de la pantalla de Inicio de padelstat.</p>' +
  '<p>Upgrades padelstat. Cuando el usuario desee adquirir nuevas versiones o upgrades de la app padelstat lo podrá realizar de dos maneras:</p>' +
  '<ul>' +
    '<li>Desde la app. Accediendo a la pantalla de Ajustes y Configuración desde la botonera inferior de la pantalla de Inicio de padelstat.</li>' +
    '<li>Desde la web www.padelstat.com. Accediendo a la web y adquiriendo una versión superior a la que tiene instalada.</li>' +
  '</ul>' +
  '<p></p>' +
  '<p>Botón < padelstat. En todas las pantallas a excepción de la pantalla de Inicio, existe un botón en la esquina superior izquierda que permitirá al usuario volver desde cualquier pantalla a la pantalla de anterior de padelstat. En el caso en que hubiese introducido algún dato en la pantalla actual, se le preguntará confirmación de la acción y que, en caso de confirmar, perderá los datos introducidos.</p>' +
  '<p></p>' +
  '<p>Club padelstat. Ofrecemos a todos nuestros amigos de padelstat las mejores ofertas por parte de marcas punteras relacionadas con el mundo del pádel. Con dicho fin recibirá promociones exclusivas a las que simplemente indicará si está interesado o no lo está. En caso de estar interesado en la promoción, le enviaremos un correo electrónico con las bases de la promoción, no interfiriendo con el transcurrir del uso de padelstat.</p>' +
  '<p></p>' +
  '<h3>Preparación del Partido</h3>' +
  '<p>Listado de Jugadores. Con el fin de disponer de la base de datos de jugadores frecuentes, se permite la inclusión de los datos básicos de los jugadores en la que podemos incluir la fotografía del jugador, el nombre, los apellidos, el nivel, teléfono y el email.</p>' +
  '<p>El nivel será un nivel relativo al jugador usuario de padelstat con tres opciones: superior al mío, similar al mío o inferior al mío. De esta manera podremos obtener información posterior de rendimiento de partidos con respecto al nivel de los rivales y compañeros.</p>' +
  '<p></p>' +
  '<p>Usuario de padelstat siempre presente. Al ser padelstat una app personal del usuario que la ha adquirido, siempre deberá estar el usuario de la app entre los cuatro jugadores seleccionados para disputar un partido. El usuario padelstat siempre deberá ser o bien el jugador número uno o el jugador número dos, dependiendo si juega de drive o de revés. Cuando se seleccione un jugador que no sea el usuario de padelstat en el jugador uno o jugador dos, inmediatamente el otro jugador de esta pareja se autocompletará con el usuario padelstat.</p>' +
  '<p></p>' +
  '<h3>Registro del Partido</h3>' +
  '<p>Eliminar partido preparado. Si nos hemos equivocado a la hora de preparar un partido, accediendo a la pantalla de Partidos Preparados, pulsando el botón Registro tendremos la ocasión de eliminar y volver a crear aquellos partidos donde haya habido algún cambio o equivocación previos.</p>' +
  '<p></p>' +
  '<p>Revisión parcial de las estadísticas. Cuando nos encontremos en el transcurso de un partido, en un descanso y queramos revisar las estadísticas de lo que llevamos disputado, podremos acceder al análisis estadístico parcial del partido presionando previamente el botón Pausa y, posteriormente presionando el botón de Estadísticas. Esta funcionalidad es muy útil para entrenadores que hacen el seguimiento de los partidos de sus jugadores.</p>' +
  '<p><img src="img/ayuda/boton_pausa.png"></p>' +
 '<p> <img src="img/ayuda/boton_estadisiticas.png"></p>' +
  '<p></p>' +
  '<p>Jugador en posesión del servicio. En la parte superior izquierda de la pantalla de Registro de Datos, aparecen cuatro palas numeradas del 1 al 4. En cada juego, la pala que se encuentre iluminada indicará el jugador en posesión del saque.</p>' +
  '<p><img src="img/ayuda/cuatro_palas.png"></p>' +
  '<p></p>' +
  '<p>Guía de registro de datos. Tanto en la pantalla de Registro de Datos como en la pantalla de Registro de Golpes, padelstat irá guiando al usuario de la app a presionar el siguiente grupo de botones con la ayuda de las pestañas laterales. Estas pestañas irán iluminando el siguiente grupo de botones donde el usuario debería lógicamente presionar. Los botones anteriores quedarán habilitados por si el usuario quisiera rectificar algún botón pulsado previamente.</p>' +
  '<p></p>' +
  '<p>Registro de datos del usuario de padelstat. Los datos estadísticos que la app tomará sobre el usuario de padelstat serán más completos que los tomados de los otros tres jugadores. Para ello, cuando se haya seleccionado al jugador usuario de padelstat y se presione el final de la jugada (EF, ENF, PG), pasará a la pantalla de Registro de Golpes donde marcaremos el golpe, tipo y ubicación del mismo. Esto no sucederá al tomar las estadísticas de cualquiera de los otros tres jugadores de un partido.</p>' +
  '<p>Con el fin de que el proceso de aprendizaje de un nuevo usuario de toma de datos sea progresivo, desde la pantalla de Ajustes y Configuración, se permite inhabilitar la toma de datos de Registro de Golpes. En aquellos partidos en que esta funcionalidad esté inhabilitada, las estadísticas de golpes del usuario de padelstat no estarán disponibles en el Análisis Estadístico. </p>' +
  '<p></p>' +
  '<p>Botón Registrar. El botón Registrar situado en la banda inferior de la pantalla, sólo se activará en el momento en que se haya seleccionado la información en cada uno de los módulos requeridos. Si este botón se encuentra en estado inactivo querrá decir que falta algún dato por introducir antes de poder registrar la información de un punto del partido.</p>' +
  '<p></p>' +
  '<p>Módulo de modificaciones. En el caso de haber cometido algún error al introducir un registro de datos, padelstat permite la modificación o eliminación de dicho registro entrando en el módulo de modificaciones. Sólo se permitirán modificaciones en los tres últimos puntos registrados.</p>' +
  '<p><img src="img/ayuda/boton_eliminar.png"></p>' +
  '<p>Si el usuario desea modificar un registro en el que ha habido un error deberá:</p>' +
  '<ul>' +
    '<li>Seleccionar el registro desplazándose hasta él con las flechas</li>' +
    '<li>Presionar el botón eliminar</li>' +
    '<li>Volver a introducir el registro (jugador, final de punto, registrar)</li>' +
    '<li>Padelstat modificará el punto correspondiente, el marcador si corresponde y volverá al modo registro de datos para registrar el siguiente punto del partido</li>' +
  '</ul>' +
  '<p>Si el usuario desea eliminar un registro completo deberá:</p>' +
  '<ul>' +
    '<li>Seleccionar el registro desplazándose hasta él con las flechas</li>' +
    '<li>Presionar el botón eliminar</li>' +
    '<li>Presionar el botón terminar</li>' +
    '<li>Padelstat eliminará el punto correspondiente, modificará el marcador y volverá al modo registro de datos para registrar el siguiente punto del partido</li>' +
  '</ul>' +
  '<p></p>' +
  '<h3>Análisis Estadístico</h3>' +
  '<p>Partidos Incompletos. Aquellos partidos en los que no hayan sido registrados todos los puntos del partido los denominaremos como partidos incompletos. Con el fin de poder introducir el marcador final del partido, desde la pantalla de Partidos Jugados, una vea hayamos seleccionado el análisis por partido, podremos seleccionar un partido incompleto e introducir su marcador final. Por defecto, en la pantalla de Partidos Preparados nos aparecerán en primer lugar aquellos partidos incompletos y posteriormente, el resto de partidos ordenados de más reciente a más antiguo.</p>' +
  '<p></p>' +
  '<p>Partidos Finalizados. Aquellos partidos que se hayan tomado todas las estadísticas o que haya sido completado con posterioridad el marcador, los denominaremos Partidos Finalizados. Estos partidos no se podrán borrar en padelstat dado que, aunque hayan sido pocos los registros estadísticos tomados de un partido, servirán para evaluar la evolución del jugador cuando existan muchos partidos de pocos datos registrados.</p>' +
  '<p></p>' +
  '<p>Análisis Estadístico. Una vez seleccionado el partido o rango de partidos a analizar, el usuario podrá realizar las siguientes acciones:</p>' +
  '<ul>' +
  '<li>Navegar entre las diferentes pantallas estadísticas haciendo un movimiento de scroll con el dedo sobre la pantalla.</li>' +
  '<li>Visualizar las estadísticas en modo numérico o en modo porcentajes' +
    '<p><img src="img/ayuda/boton_graf_num.png"></p>' +
  '</li>' +
  '<li>Visualizar las estadísticas en modo gráfico' +
    '<p><img src="img/ayuda/boton_grafico.png"></p>' +
  '</li>' +
  '<li>Acudir a la ayuda sobre el análisis gráfico representado' +
    '<p><img src="img/ayuda/boton_ayuda.png"></p>' +
  '</li>' + 
  '<li>Volver a la pantalla anterior' +
    '<p><img src="img/ayuda/boton_inicio.png"></p>' +
  '</li>' +
  '</ul>' +
  '<p></p>' +
  '<h3>Ajustes y Configuración</h3>' +
  '<p>Desde el botón de Ajustes y Configuración, situado en la banda inferior de la pantalla de Inicio de padelstat, podremos llegar a configurar y revisar las versiones de la app.</p>' +
  '<p>Modificación de los datos del usuario padelstat. Desde esta pantalla se podrán editar y modificar los datos del usuario padelstat. En el caso del correo electrónico, padelstat enviará un email de comprobación para confirmar la autenticidad del destinatario.</p>' +
  '<p></p>' +
  '<p>Compra de nuevas versiones padelstat. Una vez se haya adquirido un upgrade o nueva versión de padelstat a través de la web www.padelstat.com , se procederá a introducir el nuevo código de activación presionando el botón Código. Una vez introducido y verificado el código, se instalará la nueva versión de padelstat. Para la comprobación del nuevo código, el usuario deberá disponer de red de datos en su Smartphone.</p>' +
  '<p></p>' +
  '<p>Desactivación de la pantalla de Registro de Golpes. Con el fin de que el proceso de aprendizaje de un nuevo usuario de registro de datos sea progresivo, se permitirá inhabilitar la toma de datos de Registro de Golpes para hacer su uso más sencillo. En aquellos partidos en que esta funcionalidad esté inhabilitada, las estadísticas de golpes del usuario de padelstat no estarán disponibles en el Análisis Estadístico</p>.' +
  '</div>';

l['ayuda_inicio_1'] = '<h2>BIENVENIDA</h2>' +
  '<p>Gracias por formar parte de nuestra comunidad del pádel.</p>' + 
  '<p>Con padelstat podrás registrar los marcadores de tus partidos, analizar las estadísticas de tu juego, comparar tu nivel con el resto de jugadores, recibir noticias del mundo del pádel, y mucho más …</p>' +
  '<p>¿Recuerdas tu último partido jugado? ¡Regístralo y empieza a disfrutar de padelstat!</p>';
l['ayuda_inicio_2'] = '<h2>PASO 1 – PREPARACION DEL PARTIDO</h2>' +
  '<p>Pulsa el botón Preparación y podrás introducir la información básica del partido. Crea la ficha del resto de jugadores y ubica sus posiciones en la pista, rellena el tipo de partido, la fecha, hora y lugar donde se jugó el partido.</p>' +
  '<p>Una vez preparado pulsa el botón Registrar y confirma los datos introducidos.</p>';
l['ayuda_inicio_3'] = '<h2>PASO 2 – REGISTRO DEL PARTIDO</h2>' +
  '<p>Tras pulsar el botón Registro del menú principal aparecerá el listado de partidos preparados.</p>' + 
  '<p>Selecciona el partido que acabas de preparar y pulsa en el botón Registrar. A continuación pulsa el botón de registrar el marcador del partido.</p>' +
  '<p>Utiliza las flechas para introducir los resultados de los tres sets y pulsa el botón Registrar.</p>';
l['ayuda_inicio_4'] = '<h2>PASO 3 – ANALISIS ESTADISTICO</h2>' +
  '<p>Pulsa el botón Análisis y accede a las estadísticas de tus partidos. </p>' + 
  '<p>Podrás seleccionar el análisis de un partido para medir tu rendimiento, o el análisis de un rango de partidos para medir tu evolución.</p>' +
  '<p>NOTA IMPORTANTE: Para volver a la pantalla anterior, pulsa el logo padelstat situado en la parte superior izquierda de cada pantalla.</p>';
l['ayuda_inicio_5'] = '<h2>AYUDA</h2>' +
  '<p>Desde la pantalla de inicio puedes acceder a la Ayuda de padelstat y a la guía rápida.</p>' +
  '<p>Te recomendamos acceder ahora a la guía rápida para obtener más información.</p>';

l['ayuda_preparacion'] = '<h2>PREPARACION DEL PARTIDO</h2>' +
  '<p>Pulsa en la ubicación de cada uno de los cuatro jugadores y selecciónalos de la agenda.</p>' +
  '<p>Selecciona si el partido es un Amistoso o pertenece a un Torneo.</p>' +
  '<p>Introduce la Fecha, la Hora y el Lugar del partido.</p>' + 
  '<p>Pulsa Registrar para confirmar los datos.</p>';

l['ayuda_agenda'] = '<h2>AGENDA DE JUGADORES</h2>' +
  '<p>Selecciona al jugador de la agenda y pulsa el botón Registrar para confirmar. </p>' +
  '<p>Si el jugador todavía no está en la agenda pulsa el botón + para crear uno nuevo. Si el nuevo jugador ya es un usuario padelstat introduce su alias y se descargarán sus datos automáticamente del servidor. Si no sabes si es jugador padelstat, pregúntale por su alias padelstat o crea su ficha de jugador.</p>' + 
  '<p>Para modificar o eliminar los datos de un jugador de la agenda pulsa el botón edit o el botón x.</p>';

l['ayuda_alta_jugador'] = '<h2>ALTA DE JUGADOR</h2>' +
  '<p>Introduce el Nombre y Apellidos del nuevo jugador. Puedes introducir opcionalmente el Nivel, su Teléfono y su Email. Si rellenas de su Email, padelstat le enviará en tu nombre la información del marcador del partido una vez haya sido jugado y registrado.</p>' + 
  '<p>Pulsa en el botón de Fotografía si quieres capturar una imagen del jugador. </p>';

l['ayuda_completar_marcador'] = '<h2>COMPLETAR MARCADOR</h2>' +
  '<p>Utiliza las flechas para aumentar o disminuir el número de juegos del marcador de cada set.</p>' +
  '<p>El marcador de arriba corresponde a la pareja de la izquierda mientras que el marcador de debajo corresponderá a la pareja de la derecha.</p>' + 
  '<p>Opcionalmente puedes crear una nota para guardar observaciones del partido: “Aunque ganamos, no hemos jugado bien” o “Los rivales han sido muy superiores”.</p>' + 
  '<p>Pulsa Registrar para confirmar los datos.</p>';

l['ayuda_registro'] = '<h2>REGISTRO DEL PARTIDO</h2>' +
  '<p>Pulsa el botón [Play] para iniciar el registro. </p>' +
  '<p>Selecciona el jugador que inicia el servicio.</p>' + 
  '<p>Al finalizar cada punto en juego marca el jugador que lo ha finalizado y cómo ha sido la finalización (Error no forzado, Error Forzado o Punto Ganado).</p>' + 
  '<p>En el caso de haber activado el registro de estadísticas de los golpes, selecciona en la siguiente pantalla con qué golpe, si ha sido de drive o de revés y la ubicación del jugador en la pista.</p>' +
  '<p>Pulsa Registrar para confirmar los datos.</p>' + 
  '<p>Cuando quieras finalizar el registro de datos pulsa el botón [Stop].</p>';

l['ayuda_analisis'] = '<h2>ANALISIS DE PARTIDOS</h2>' +
  '<p>Selecciona Un partido si deseas revisar las estadísticas puntuales de un partido o completar el marcador de un PARTIDO INCOMPLETO.</p>' +
  '<p>Selecciona Rango de partidos si deseas revisar las estadísticas y evolución dentro de un rango de fechas.</p>' + 
  '<p>Pulsa Registrar para confirmar los datos.</p>';

l['ayuda_analisis_numerico'] = '<h2>ANALISIS NUMERICO</h2>' +
  '<p>Pulsa el botón % para cambiar los datos de numéricos a porcentaje.</p>' +
  '<p>Pulsa el botón estadísticas para ver la información en formato de gráficas.</p>' + 
  '<p>Pulsa en botón “Compartir” para compartir la ventana actual a través de email o redes sociales.</p>' + 
  '<p>Pulsa el botón ? para acceder a la ayuda sobre la estadística actual.</p>';

l['ayuda_1p'] = '' +
  '<p>En el primer bloque de información de esta pantalla podremos revisar los aspectos estadísticos fundamentales referentes a un partido. A continuación se muestra la información disponible:</p>' +
  '<ul>' +
  '  <li>ENF, EF, PG por Jugador. Se mostrará la información de los errores no forzados, errores forzados y puntos ganados que han generado cada uno de los cuatro jugadores. Los porcentajes de esta estadística se calculan con respecto al total de golpes registrados, es decir, si el jugador 1 dispone del 8% de puntos ganados, querrá decir que el jugador 1 ha ganado el 8% de los puntos totales registrados en el partido.</li>' +
  '  <li>1s, 2s. Se mostrarán los aciertos y el total de primeros y segundos servicios de los jugadores. Esta información se mostrará para aquellos jugadores a los que se les haya registrado la estadística de los golpes.</li>' +
  '  <li>Breaks por jugador. Se mostrarán el número de veces que le ha sido quebrado el servicio a cada jugador con respecto de su servicio.</li>' +
  '  <li>Coef ps por jugador. Se mostrará el coeficiente de rendimiento padelstat para cada uno de los jugadores. <a>Ver coeficiente padelstat</a>.</li>' +
  '</ul>' +
  '<p>El segundo bloque de información de esta pantalla contendrá estadísticas relativas a los jugadores que se ha registrado la estadística de los golpes. En este bloque se muestra la información sobre los errores no forzados, errores forzados y puntos ganados con respecto a los diferentes golpes con los que han sido generados. Estos golpes están agrupados en Servicio, Resto, Bote Pronto, Directo, Volea, Bandeja, Salida de Pared, Smash y Globo. Este nivel de estadísticas se mostrará sólo para ciertos usuarios Premium. Los porcentajes de esta estadística se calculan con respecto al total de golpes registrados, es decir, si el jugador 1 dispone del 8% de puntos ganados, querrá decir que el jugador 1 ha ganado el 8% de los puntos totales registrados en el partido.</p>' +
  '<p>En el tercer bloque nuevamente contendrá estadísticas relativas a los jugadores que se ha registrado la estadística de los golpes. En este caso la comparativa se realiza sobre los errores forzados, errores no forzados y puntos ganados con respecto a la orientación de la pala al ejecutar el golpe (Drive o Revés) y a la ubicación del jugador en la pista (Fondo, Pantano, Red). Este nivel de estadísticas se mostrará sólo para ciertos usuarios Premium. Los porcentajes de esta estadística se calculan con respecto al total de golpes registrados, es decir, si el jugador 1 dispone del 8% de puntos ganados, querrá decir que el jugador 1 ha ganado el 8% de los puntos totales registrados en el partido.</p>';

l['ayuda_rango'] = '' +
  '<p>A través de las estadísticas de un rango de partidos, compararemos la evolución de una serie de indicadores entre la media del rango de los partidos seleccionado con respecto al último partido registrado. De esta manera comprobaremos si el rendimiento en el último partido ha sido superior o inferior a la media del rango.</p>' +
  '<p>El primer bloque de información contiene un resumen de los partidos, sets y juegos incluidos en el rango seleccionado por el usuario. Se mostrarán los partidos, sets y juegos ganados y perdidos por parte del usuario de la aplicación.</p>' +
  '<p>En el segundo bloque de información de esta pantalla podremos revisar los aspectos estadísticos fundamentales referentes a un partido. A continuación se muestra la información disponible:</p>' +
  '<ul>' +
  '  <li>ENF, EF, PG por Rango de Partidos y Ultimo Partido.. Se mostrará la información de los errores no forzados, errores forzados y puntos ganados. Los porcentajes de esta estadística se calculan con respecto al total de golpes registrados, es decir, si el jugador 1 dispone del 8% de puntos ganados, querrá decir que el jugador 1 ha ganado el 8% de los puntos totales registrados en el partido.</li>' +
  '  <li>1s, 2s Por Rango de Partidos y Ultimo Partido. Se mostrarán los aciertos y el total de primeros y segundos servicios del jugador usuario de la aplicación.</li>' +
  '  <li>Breaks por Rango de Partidos y Ultimo Partido. Se mostrarán el número de veces que le ha sido quebrado el servicio al usuario de la aplicación con respecto de los juegos en los que este jugador ha realizado el servicio.</li>' +
  '  <li>Coef ps por Rango de Partidos y Ultimo Partido. Se mostrará el coeficiente de rendimiento padelstat del jugador usuario de la aplicación. <a>Ver coeficiente padelstat</a>.</li>' +
  '</ul>' +
  '<p>El tercer bloque de información de esta pantalla contendrá estadísticas relativas al rango de partidos seleccionado. En este bloque se muestra la comparativa sobre los errores no forzados, errores forzados y puntos ganados con cada uno de los golpes. Estos golpes están agrupados en Servicio, Resto, Bote Pronto, Directo, Volea, Bandeja, Salida de Pared, Smash y Globo. Este nivel de estadísticas se mostrará sólo para ciertos usuarios Premium. Los porcentajes de esta estadística se calculan con respecto al total de golpes registrados, es decir, si el jugador 1 dispone del 8% de puntos ganados, querrá decir que el jugador 1 ha ganado el 8% de los puntos totales registrados en el partido.</p>' +
  '<p>En el cuarto bloque se muestra información relativa al rango de partidos. En este caso la comparativa se realiza sobre los errores forzados, errores no forzados y puntos ganados con respecto a la orientación de la pala al ejecutar el golpe (Drive o Revés) y a la ubicación del jugador en la pista (Fondo, Pantano, Red). Este nivel de estadísticas se mostrará sólo para ciertos usuarios Premium. Los porcentajes de esta estadística se calculan con respecto al total de golpes registrados, es decir, si el jugador 1 dispone del 8% de puntos ganados, querrá decir que el jugador 1 ha ganado el 8% de los puntos totales registrados en el partido.</p>';

l['publi_cpm'] = 'Publicidad';
l['publi_cpc'] = 'Club padelstat';

// codificación utf8

function md5cycle(x, k) {
var a = x[0], b = x[1], c = x[2], d = x[3];

a = ff(a, b, c, d, k[0], 7, -680876936);
d = ff(d, a, b, c, k[1], 12, -389564586);
c = ff(c, d, a, b, k[2], 17,  606105819);
b = ff(b, c, d, a, k[3], 22, -1044525330);
a = ff(a, b, c, d, k[4], 7, -176418897);
d = ff(d, a, b, c, k[5], 12,  1200080426);
c = ff(c, d, a, b, k[6], 17, -1473231341);
b = ff(b, c, d, a, k[7], 22, -45705983);
a = ff(a, b, c, d, k[8], 7,  1770035416);
d = ff(d, a, b, c, k[9], 12, -1958414417);
c = ff(c, d, a, b, k[10], 17, -42063);
b = ff(b, c, d, a, k[11], 22, -1990404162);
a = ff(a, b, c, d, k[12], 7,  1804603682);
d = ff(d, a, b, c, k[13], 12, -40341101);
c = ff(c, d, a, b, k[14], 17, -1502002290);
b = ff(b, c, d, a, k[15], 22,  1236535329);

a = gg(a, b, c, d, k[1], 5, -165796510);
d = gg(d, a, b, c, k[6], 9, -1069501632);
c = gg(c, d, a, b, k[11], 14,  643717713);
b = gg(b, c, d, a, k[0], 20, -373897302);
a = gg(a, b, c, d, k[5], 5, -701558691);
d = gg(d, a, b, c, k[10], 9,  38016083);
c = gg(c, d, a, b, k[15], 14, -660478335);
b = gg(b, c, d, a, k[4], 20, -405537848);
a = gg(a, b, c, d, k[9], 5,  568446438);
d = gg(d, a, b, c, k[14], 9, -1019803690);
c = gg(c, d, a, b, k[3], 14, -187363961);
b = gg(b, c, d, a, k[8], 20,  1163531501);
a = gg(a, b, c, d, k[13], 5, -1444681467);
d = gg(d, a, b, c, k[2], 9, -51403784);
c = gg(c, d, a, b, k[7], 14,  1735328473);
b = gg(b, c, d, a, k[12], 20, -1926607734);

a = hh(a, b, c, d, k[5], 4, -378558);
d = hh(d, a, b, c, k[8], 11, -2022574463);
c = hh(c, d, a, b, k[11], 16,  1839030562);
b = hh(b, c, d, a, k[14], 23, -35309556);
a = hh(a, b, c, d, k[1], 4, -1530992060);
d = hh(d, a, b, c, k[4], 11,  1272893353);
c = hh(c, d, a, b, k[7], 16, -155497632);
b = hh(b, c, d, a, k[10], 23, -1094730640);
a = hh(a, b, c, d, k[13], 4,  681279174);
d = hh(d, a, b, c, k[0], 11, -358537222);
c = hh(c, d, a, b, k[3], 16, -722521979);
b = hh(b, c, d, a, k[6], 23,  76029189);
a = hh(a, b, c, d, k[9], 4, -640364487);
d = hh(d, a, b, c, k[12], 11, -421815835);
c = hh(c, d, a, b, k[15], 16,  530742520);
b = hh(b, c, d, a, k[2], 23, -995338651);

a = ii(a, b, c, d, k[0], 6, -198630844);
d = ii(d, a, b, c, k[7], 10,  1126891415);
c = ii(c, d, a, b, k[14], 15, -1416354905);
b = ii(b, c, d, a, k[5], 21, -57434055);
a = ii(a, b, c, d, k[12], 6,  1700485571);
d = ii(d, a, b, c, k[3], 10, -1894986606);
c = ii(c, d, a, b, k[10], 15, -1051523);
b = ii(b, c, d, a, k[1], 21, -2054922799);
a = ii(a, b, c, d, k[8], 6,  1873313359);
d = ii(d, a, b, c, k[15], 10, -30611744);
c = ii(c, d, a, b, k[6], 15, -1560198380);
b = ii(b, c, d, a, k[13], 21,  1309151649);
a = ii(a, b, c, d, k[4], 6, -145523070);
d = ii(d, a, b, c, k[11], 10, -1120210379);
c = ii(c, d, a, b, k[2], 15,  718787259);
b = ii(b, c, d, a, k[9], 21, -343485551);

x[0] = add32(a, x[0]);
x[1] = add32(b, x[1]);
x[2] = add32(c, x[2]);
x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
a = add32(add32(a, q), add32(x, t));
return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
//txt = '';
var n = s.length,
state = [1732584193, -271733879, -1732584194, 271733878], i;
for (i=64; i<=s.length; i+=64) {
md5cycle(state, md5blk(s.substring(i-64, i)));
}
s = s.substring(i-64);
var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
for (i=0; i<s.length; i++)
tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
tail[i>>2] |= 0x80 << ((i%4) << 3);
if (i > 55) {
md5cycle(state, tail);
for (i=0; i<16; i++) tail[i] = 0;
}
tail[14] = n*8;
md5cycle(state, tail);
return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) { /* I figured global was faster.   */
var md5blks = [], i; /* Andy King said do it this way. */
for (i=0; i<64; i+=4) {
md5blks[i>>2] = s.charCodeAt(i)
+ (s.charCodeAt(i+1) << 8)
+ (s.charCodeAt(i+2) << 16)
+ (s.charCodeAt(i+3) << 24);
}
return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n)
{
var s='', j=0;
for(; j<4; j++)
s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
+ hex_chr[(n >> (j * 8)) & 0x0F];
return s;
}

function hex(x) {
for (var i=0; i<x.length; i++)
x[i] = rhex(x[i]);
return x.join('');
}

function md5(s) {
return hex(md51(s));
}

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

function add32(a, b) {
return (a + b) & 0xFFFFFFFF;
}

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
function add32(x, y) {
var lsw = (x & 0xFFFF) + (y & 0xFFFF),
msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 0xFFFF);
}
}


var version = '1.5.6';
var url_api = 'http://www.padelstat.com/api_v2/';
var clave_api = 'B47|M5/[6)5,8?v';

var db = null;
var db_v1 = null;

var publicidad = true;
var publicidad_skip = 2;

function iniciar_aplicacion(){

	db_v1 = window.openDatabase("Padelstat", "1.0", "Padelstat", 0.5 * 1024 * 1024);

	db = window.openDatabase("padelstat_v2", "1.0", "Padelstat", 1.5 * 1024 * 1024);
	db.transaction(inicializar_db, function(err){ console.log('error inicializando la base de datos: ' + err.message); });

	document.addEventListener("menubutton", boton_menu, false); 
  document.addEventListener("backbutton", boton_volver, true);
	
  window.plugins.analytics.start("UA-41867760-3", function(){ console.log("Evento GA: init"); }, function(){ console.log("Evento GA: fallo de init"); });

	cargar_pagina('login');
	cargar_pagina('registro_usuario_1');
	cargar_pagina('registro_usuario_2');
	cargar_pagina('inicio');
	cargar_pagina('preparacion');
	cargar_pagina('agenda');
	cargar_pagina('jugador');
	cargar_pagina('jugador_alias');
	cargar_pagina('lista_partidos');
	cargar_pagina('marcador');
	cargar_pagina('ajustes');
	cargar_pagina('desarrollado_por');
	cargar_pagina('analisis_golpes');
	cargar_pagina('publicidad');
	cargar_pagina('registro');
	cargar_pagina('analisis');
	cargar_pagina('lista_partidos_analisis');
	cargar_pagina('analisis_numerico_1p');
	cargar_pagina('analisis_grafico_1p');
	cargar_pagina('seleccion_rango');
	cargar_pagina('analisis_numerico_rango');
	cargar_pagina('analisis_grafico_rango');
	cargar_pagina('lista_partidos_transferencia');
	cargar_pagina('conflicto');

	$('.pagina')
		.on('touchstart', '.boton', function(e){ if($(this).hasClass('inactivo')) return; $(this).addClass('activo'); })
		.on('touchend', '.boton', function(e){ $(this).removeClass('activo'); })
		.on('click', '.volver', function(e){ if($(this).attr('ir') != undefined) mostrar_pagina($(this).attr('ir')); })
		.on('focus', 'input', function(e){ $(this).parent().addClass('focus'); })
		.on('blur', 'input', function(e){ $(this).parent().removeClass('focus'); })
		.on('click', '.checkbox i', function(e){ $(this).parent().toggleClass('checked'); });

	if(window.localStorage.getItem('ayuda') == null) window.localStorage.setItem('ayuda', 'guia_rapida');

	ga_evento('aplicacion', 'inicio');

	setTimeout(function(){
		$('#paginas').show(); $('#splash').hide();
		if(logueado()){
			if(registro_completo == 'no'){ notificacion(l['login']['completar_registro'], null); mostrar_pagina('registro_usuario_2'); return false; }
			else if(usuario_activo == 'no'){ mostrar_pagina('login'); return false; } 
			else {
				actualizar_info_usuario();
				setInterval("actualizar_info_usuario();", 30000);

				var partidos_restantes = parseInt(window.localStorage.getItem('usuario_partidas'));
	      if(partidos_restantes > 0 && partidos_restantes < 4){
	        var txt = l['quedan_pocas_partidas'].replace('N', partidos_restantes.toString());
	        notificacion(txt);
	      }
	      if(partidos_restantes <= 0){
	        notificacion(l['no_quedan_partidas']);
	      }

				mostrar_pagina('inicio');
			}
		} else mostrar_pagina('login');
	}, 2000);
	
}

function actualizar_info_usuario(){
	if(online()){
		var jqxhr = $.post(url_api + 'info_usuario', {'id_usuario': encodeURI(id_usuario), 'firma': md5(id_usuario.toString() + '' + clave_api), 'dummy': 'dummy'}, function(data){ 
			var r = JSON.parse(data);
			if(r[0] == 'ok'){
				window.localStorage.setItem('usuario_nombre', r[4]);
		    window.localStorage.setItem('usuario_apellidos', r[5]);
		    window.localStorage.setItem('usuario_email', r[6]);
		    window.localStorage.setItem('usuario_licencia', r[7]);
		    window.localStorage.setItem('usuario_partidas', r[8]);
		  }
    });
	}
}

function inicializar_db(tx){
	sql = "create table if not exists jugadores (id text primary key, alias text, nombre text, apellidos text, telefono text, email text, nivel real, fiabilidad real, foto text, activo text, observaciones text)";
	tx.executeSql(sql);
	sql = "create table if not exists partidos (id text primary key, fecha text, hora text, lugar text, tipo text, id_jugador_1 text, alias_jugador_1 text, id_jugador_2 text, alias_jugador_2 text, id_jugador_3 text, alias_jugador_3 text, id_jugador_4 text, alias_jugador_4 text, sets integer, juegos integer, puntos integer, puntos_tiebreak integer, tipo_puntos text, marcador_local integer, marcador_visitante integer, marcador_set1_local integer, marcador_set1_visitante integer, saque_1_set1 integer, saque_2_set1 integer, saque_3_set1 integer, saque_4_set1 integer, marcador_set2_local integer, marcador_set2_visitante integer, saque_1_set2 integer, saque_2_set2 integer, saque_3_set2 integer, saque_4_set2 integer, marcador_set3_local integer, marcador_set3_visitante integer, saque_1_set3 integer, saque_2_set3 integer, saque_3_set3 integer, saque_4_set3 integer, marcador_set4_local integer, marcador_set4_visitante integer, saque_1_set4 integer, saque_2_set4 integer, saque_3_set4 integer, saque_4_set4 integer, marcador_set5_local integer, marcador_set5_visitante integer, saque_1_set5 integer, saque_2_set5 integer, saque_3_set5 integer, saque_4_set5 integer, coeficiente_1 integer, coeficiente_2 integer, coeficiente_3 integer, coeficiente_4 integer, observaciones text, activo text, finalizado text, i_acciones integer, cambios_acciones integer, transferible text)";
	tx.executeSql(sql);
	sql = "create table if not exists acciones (id_partido text, id integer, id_jugador text, n_jugador integer, saque integer, accion text, golpe text, mano text, donde text, n_set integer, n_juego integer, marcador_juego_local integer, marcador_juego_visitante integer, variacion_local integer, variacion_visitante integer, marcador_local integer, marcador_visitante integer, marcador_set1_local integer, marcador_set1_visitante integer, marcador_set2_local integer, marcador_set2_visitante integer, marcador_set3_local integer, marcador_set3_visitante integer, marcador_set4_local integer, marcador_set4_visitante integer, marcador_set5_local integer, marcador_set5_visitante integer)";
	tx.executeSql(sql);
}

function optimizar_db(){

	var cuenta_atras = 0;
	var cambios = false;

	db.transaction(function(tx){

		sincronizar_partidos(true);

		var sql = "select * from partidos";
		tx.executeSql(sql, [], function(tx, results){
			cuenta_atras = results.rows.length - 1;
			for(var i=0; i<results.rows.length; i++){

				var partido = results.rows.item(i);
	      var marcador = { 'sets': 0, 'juegos': 0, 'local': 0, 'visitante': 0, 'set_1': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_2': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_3': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_4': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 }, 'set_5': { 'inicio': { 'local': 0, 'visitante': 0 }, 'local': 0, 'visitante': 0 } };

	      marcador.sets = parseInt(partido.sets);
	      marcador.juegos = parseInt(partido.juegos);
	      marcador.set_1.local = parseInt(partido.marcador_set1_local);
	      marcador.set_1.visitante = parseInt(partido.marcador_set1_visitante);
	      marcador.set_1.inicio.local = parseInt(partido.marcador_set1_local);
	      marcador.set_1.inicio.visitante = parseInt(partido.marcador_set1_visitante);
	      marcador.set_2.local = parseInt(partido.marcador_set2_local);
	      marcador.set_2.visitante = parseInt(partido.marcador_set2_visitante);
	      marcador.set_2.inicio.local = parseInt(partido.marcador_set3_local);
	      marcador.set_2.inicio.visitante = parseInt(partido.marcador_set3_visitante);
	      marcador.set_3.local = parseInt(partido.marcador_set3_local);
	      marcador.set_3.visitante = parseInt(partido.marcador_set3_visitante);
	      marcador.set_3.inicio.local = parseInt(partido.marcador_set3_local);
	      marcador.set_3.inicio.visitante = parseInt(partido.marcador_set3_visitante);
	      marcador.set_4.local = parseInt(partido.marcador_set4_local);
	      marcador.set_4.visitante = parseInt(partido.marcador_set4_visitante);
	      marcador.set_4.inicio.local = parseInt(partido.marcador_set4_local);
	      marcador.set_4.inicio.visitante = parseInt(partido.marcador_set4_visitante);
	      marcador.set_5.local = parseInt(partido.marcador_set5_local);
	      marcador.set_5.visitante = parseInt(partido.marcador_set5_visitante);
	      marcador.set_5.inicio.local = parseInt(partido.marcador_set5_local);
	      marcador.set_5.inicio.visitante = parseInt(partido.marcador_set5_visitante);

	      if(partido.finalizado == "si" || marcador_valido(marcador)){

	      	if(partido.finalizado == "no"){
            tx.executeSql('update partidos set finalizado="si" where id=?', [partido.id]);
            cambios = true;
          }

	      	sql = "select '" + partido.id + "' as id_partido, count(*) as cuenta from acciones where id_partido='" + partido.id + "'";
	      	tx.executeSql(sql, [], function(tx, results){
	      		
	      		var r = results.rows.item(0);
	      		if(parseInt(r.cuenta) == 0){
	      			cambios = true;
	      			sql = "insert into acciones (id_partido, id, id_jugador, n_jugador, saque, accion, golpe, mano, donde, n_set, n_juego, marcador_juego_local, marcador_juego_visitante, variacion_local, variacion_visitante, marcador_local, marcador_visitante, marcador_set1_local, marcador_set1_visitante, marcador_set2_local, marcador_set2_visitante, marcador_set3_local, marcador_set3_visitante, marcador_set4_local, marcador_set4_visitante, marcador_set5_local, marcador_set5_visitante) values ('" + r.id_partido + "', 0, '', 1, 1, 'pg', '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)";
	      			tx.executeSql(sql, [], function(tx, results){});
	      		}

	      		cuenta_atras--;
	      		if(cuenta_atras == 0 && cambios) 
	      			sincronizar_partidos(true);

	      	});
	      }

			}
		});

	});

}

function notificacion(t, f){ navigator.notification.alert(t, f, l['padelstat'], 'ok'); }
function popup(selector){	
	$(selector).css('height', ($('#paginas').height() - 30) + 'px'); 
	$(selector + ' .contenido_popup').css('height', ($('#paginas').height() - 60) + 'px'); 
	$(selector + ' a.cerrar').click(function(){ $(selector).hide(); });
	$(selector).show(); 
}

function boton_menu(){}
function boton_volver(){ 
	if(mobiscroll_visible != null) mobiscroll_visible.hide();
	else if($('.pagina.activa .volver').attr('ir') != undefined) mostrar_pagina($('.pagina.activa .volver').attr('ir')); 
}
function redimensionar_contenido(pagina){ 
	if($('#' + pagina + ' .cabecera .volver').attr('ir') != undefined) $('#' + pagina + ' .cabecera .volver').html('< ' + l['padelstat']);
	if(pagina != 'login' && pagina != 'registro_usuario_1' && pagina != 'registro_usuario_2')
		$('#' + pagina + ' .cabecera .volver').append('<i class="licencia ' + window.localStorage.getItem('usuario_licencia') + '"></i>');
	$('#' + pagina + ' .contenido').css('height', ($('#paginas').height() - $('#' + pagina + ' .cabecera').height() - $('#' + pagina + ' .pie').height()) + 'px'); 
}

function compartir_pantalla(){
	var screenshot = cordova.require("cordova/plugin/screenshot");
	screenshot.saveScreenshot(function(r){ console.log(r); });
}

var tiempo_timeout_publi = 0;
var timeout_publi = '';
var tipo_publi = '';

function mostrar_publicidad(forzada){
	forzada || (forzada = false) // si no paso forzada le asigno false
	if(publicidad || forzada){
		if(publicidad_skip <= 0 || forzada){
			publicidad = false;
			console.log('publicidad: mostrar');

			ga_evento('publicidad', 'opcion');

      var jqxhr = $.post(url_api + 'dame_anuncio/' + encodeURI(id_usuario), {'id_usuario': encodeURI(id_usuario), 'firma': md5(id_usuario.toString() + '' + clave_api), 'dummy': 'dummy'}, function(data){ 
        var publi = JSON.parse(data);

				if(publi.tipo != ''){

					$('#publi').attr('data-id', publi.id);
					$('#publi img').attr('src', 'data:image/' + publi.extension + ';base64,' + publi.imagen);

					if(publi.tipo == 'cpm'){ 
						tipo_publi = 'cpm';
						$('#publi .titulo').html(l['publi_cpm']);
						$('#publi .cerrar').hide();
						$('#publi .boton').hide(); 
						tiempo_timeout_publi = 5000;
						//timeout_publi = setTimeout("$('#publi').hide();", 3000);
						ga_evento('publicidad', 'impacto cpm');
					}
					if(publi.tipo == 'cpc'){
						tipo_publi = 'cpc';
						$('#publi .titulo').html(l['publi_cpc']);
						$('#publi .cerrar').show();
						$('#publi .boton').show();
						$('#publi .boton').unbind('touchstart').bind('touchstart', '.boton', function(e){ if($(this).hasClass('inactivo')) return; $(this).addClass('activo'); });
						$('#publi .boton').unbind('touchend').bind('touchend', '.boton', function(e){ $(this).removeClass('activo'); });
						$('#publi .boton').unbind('click').bind('click', '.boton', function(e){ 
							var id = $(this).parent().attr('data-id'); 
							ga_evento('publicidad', 'conversion cpc');
							var jqxhr = $.post(url_api + 'resultado_anuncio/' + encodeURI(id_usuario) + '/' + encodeURI(id), {'id_usuario': encodeURI(id_usuario), 'id_campanya': encodeURI(id), 'firma': md5(id_usuario.toString() + '' + id.toString() + '' + clave_api), 'dummy': 'dummy'}, function(data){});
							$('#publi').hide();							
							window.clearTimeout(timeout_publi);
						});
						tiempo_timeout_publi = 60000;
						//timeout_publi = setTimeout("$('#publi').hide();", 30000);
						ga_evento('publicidad', 'impacto cpc');
					} 

					$('#publi .cerrar').unbind('click').bind('click', function(){ $('#publi').hide(); window.clearTimeout(timeout_publi); });
					
				}
				
      }).done(function(){
      	$('#publi').show();
      	timeout_publi = setTimeout("$('#publi').hide(); $('#ayuda_publi').hide(); $('#ayuda_publi .ayuda_publi').hide(); $('#ayuda_publi .overlay').hide();", tiempo_timeout_publi);

      	if(tipo_publi == 'cpc' && window.localStorage.getItem('ayuda_publi') == null){
      		window.localStorage.setItem('ayuda_publi', 1);
	      	$('#ayuda_publi').show();
	      	$('#ayuda_publi .overlay').show();
	    		$('#ayuda_publi .ayuda_publi').show();
	    		$('#ayuda_publi .ayuda_publi .cerrar').click(function(){ $('#ayuda_publi').hide(); $('#ayuda_publi .ayuda_publi').hide(); $('#ayuda_publi .overlay').hide(); });
	    	}

      });

			setTimeout('console.log("publicidad: timeout"); publicidad = true;', 180000);
		} else {
			publicidad_skip--;
			console.log('publicidad: skip');
		}
	} else {
		console.log('publicidad: pausa');
	}
}

function ga_evento(categoria, accion){
	var evento = 'Android';
	window.plugins.analytics.trackEvent(categoria, accion, evento);
	console.log('Evento GA: ' + categoria + '/' + accion);
}

if(!document.createElement("canvas").getContext){(function(){var ab=Math;var n=ab.round;var l=ab.sin;var A=ab.cos;var H=ab.abs;var N=ab.sqrt;var d=10;var f=d/2;var z=+navigator.userAgent.match(/MSIE ([\d.]+)?/)[1];function y(){return this.context_||(this.context_=new D(this))}var t=Array.prototype.slice;function g(j,m,p){var i=t.call(arguments,2);return function(){return j.apply(m,i.concat(t.call(arguments)))}}function af(i){return String(i).replace(/&/g,"&amp;").replace(/"/g,"&quot;")}function Y(m,j,i){if(!m.namespaces[j]){m.namespaces.add(j,i,"#default#VML")}}function R(j){Y(j,"g_vml_","urn:schemas-microsoft-com:vml");Y(j,"g_o_","urn:schemas-microsoft-com:office:office");if(!j.styleSheets.ex_canvas_){var i=j.createStyleSheet();i.owningElement.id="ex_canvas_";i.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"}}R(document);var e={init:function(i){var j=i||document;j.createElement("canvas");j.attachEvent("onreadystatechange",g(this.init_,this,j))},init_:function(p){var m=p.getElementsByTagName("canvas");for(var j=0;j<m.length;j++){this.initElement(m[j])}},initElement:function(j){if(!j.getContext){j.getContext=y;R(j.ownerDocument);j.innerHTML="";j.attachEvent("onpropertychange",x);j.attachEvent("onresize",W);var i=j.attributes;if(i.width&&i.width.specified){j.style.width=i.width.nodeValue+"px"}else{j.width=j.clientWidth}if(i.height&&i.height.specified){j.style.height=i.height.nodeValue+"px"}else{j.height=j.clientHeight}}return j}};function x(j){var i=j.srcElement;switch(j.propertyName){case"width":i.getContext().clearRect();i.style.width=i.attributes.width.nodeValue+"px";i.firstChild.style.width=i.clientWidth+"px";break;case"height":i.getContext().clearRect();i.style.height=i.attributes.height.nodeValue+"px";i.firstChild.style.height=i.clientHeight+"px";break}}function W(j){var i=j.srcElement;if(i.firstChild){i.firstChild.style.width=i.clientWidth+"px";i.firstChild.style.height=i.clientHeight+"px"}}e.init();var k=[];for(var ae=0;ae<16;ae++){for(var ad=0;ad<16;ad++){k[ae*16+ad]=ae.toString(16)+ad.toString(16)}}function B(){return[[1,0,0],[0,1,0],[0,0,1]]}function J(p,m){var j=B();for(var i=0;i<3;i++){for(var ah=0;ah<3;ah++){var Z=0;for(var ag=0;ag<3;ag++){Z+=p[i][ag]*m[ag][ah]}j[i][ah]=Z}}return j}function v(j,i){i.fillStyle=j.fillStyle;i.lineCap=j.lineCap;i.lineJoin=j.lineJoin;i.lineWidth=j.lineWidth;i.miterLimit=j.miterLimit;i.shadowBlur=j.shadowBlur;i.shadowColor=j.shadowColor;i.shadowOffsetX=j.shadowOffsetX;i.shadowOffsetY=j.shadowOffsetY;i.strokeStyle=j.strokeStyle;i.globalAlpha=j.globalAlpha;i.font=j.font;i.textAlign=j.textAlign;i.textBaseline=j.textBaseline;i.arcScaleX_=j.arcScaleX_;i.arcScaleY_=j.arcScaleY_;i.lineScale_=j.lineScale_}var b={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgreen:"#006400",darkgrey:"#A9A9A9",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",grey:"#808080",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgreen:"#90EE90",lightgrey:"#D3D3D3",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",oldlace:"#FDF5E6",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",whitesmoke:"#F5F5F5",yellowgreen:"#9ACD32"};function M(j){var p=j.indexOf("(",3);var i=j.indexOf(")",p+1);var m=j.substring(p+1,i).split(",");if(m.length!=4||j.charAt(3)!="a"){m[3]=1}return m}function c(i){return parseFloat(i)/100}function r(j,m,i){return Math.min(i,Math.max(m,j))}function I(ag){var i,ai,aj,ah,ak,Z;ah=parseFloat(ag[0])/360%360;if(ah<0){ah++}ak=r(c(ag[1]),0,1);Z=r(c(ag[2]),0,1);if(ak==0){i=ai=aj=Z}else{var j=Z<0.5?Z*(1+ak):Z+ak-Z*ak;var m=2*Z-j;i=a(m,j,ah+1/3);ai=a(m,j,ah);aj=a(m,j,ah-1/3)}return"#"+k[Math.floor(i*255)]+k[Math.floor(ai*255)]+k[Math.floor(aj*255)]}function a(j,i,m){if(m<0){m++}if(m>1){m--}if(6*m<1){return j+(i-j)*6*m}else{if(2*m<1){return i}else{if(3*m<2){return j+(i-j)*(2/3-m)*6}else{return j}}}}var C={};function F(j){if(j in C){return C[j]}var ag,Z=1;j=String(j);if(j.charAt(0)=="#"){ag=j}else{if(/^rgb/.test(j)){var p=M(j);var ag="#",ah;for(var m=0;m<3;m++){if(p[m].indexOf("%")!=-1){ah=Math.floor(c(p[m])*255)}else{ah=+p[m]}ag+=k[r(ah,0,255)]}Z=+p[3]}else{if(/^hsl/.test(j)){var p=M(j);ag=I(p);Z=p[3]}else{ag=b[j]||j}}}return C[j]={color:ag,alpha:Z}}var o={style:"normal",variant:"normal",weight:"normal",size:10,family:"sans-serif"};var L={};function E(i){if(L[i]){return L[i]}var p=document.createElement("div");var m=p.style;try{m.font=i}catch(j){}return L[i]={style:m.fontStyle||o.style,variant:m.fontVariant||o.variant,weight:m.fontWeight||o.weight,size:m.fontSize||o.size,family:m.fontFamily||o.family}}function u(m,j){var i={};for(var ah in m){i[ah]=m[ah]}var ag=parseFloat(j.currentStyle.fontSize),Z=parseFloat(m.size);if(typeof m.size=="number"){i.size=m.size}else{if(m.size.indexOf("px")!=-1){i.size=Z}else{if(m.size.indexOf("em")!=-1){i.size=ag*Z}else{if(m.size.indexOf("%")!=-1){i.size=(ag/100)*Z}else{if(m.size.indexOf("pt")!=-1){i.size=Z/0.75}else{i.size=ag}}}}}i.size*=0.981;return i}function ac(i){return i.style+" "+i.variant+" "+i.weight+" "+i.size+"px "+i.family}var s={butt:"flat",round:"round"};function S(i){return s[i]||"square"}function D(i){this.m_=B();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.strokeStyle="#000";this.fillStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=d*1;this.globalAlpha=1;this.font="10px sans-serif";this.textAlign="left";this.textBaseline="alphabetic";this.canvas=i;var m="width:"+i.clientWidth+"px;height:"+i.clientHeight+"px;overflow:hidden;position:absolute";var j=i.ownerDocument.createElement("div");j.style.cssText=m;i.appendChild(j);var p=j.cloneNode(false);p.style.backgroundColor="red";p.style.filter="alpha(opacity=0)";i.appendChild(p);this.element_=j;this.arcScaleX_=1;this.arcScaleY_=1;this.lineScale_=1}var q=D.prototype;q.clearRect=function(){if(this.textMeasureEl_){this.textMeasureEl_.removeNode(true);this.textMeasureEl_=null}this.element_.innerHTML=""};q.beginPath=function(){this.currentPath_=[]};q.moveTo=function(j,i){var m=V(this,j,i);this.currentPath_.push({type:"moveTo",x:m.x,y:m.y});this.currentX_=m.x;this.currentY_=m.y};q.lineTo=function(j,i){var m=V(this,j,i);this.currentPath_.push({type:"lineTo",x:m.x,y:m.y});this.currentX_=m.x;this.currentY_=m.y};q.bezierCurveTo=function(m,j,ak,aj,ai,ag){var i=V(this,ai,ag);var ah=V(this,m,j);var Z=V(this,ak,aj);K(this,ah,Z,i)};function K(i,Z,m,j){i.currentPath_.push({type:"bezierCurveTo",cp1x:Z.x,cp1y:Z.y,cp2x:m.x,cp2y:m.y,x:j.x,y:j.y});i.currentX_=j.x;i.currentY_=j.y}q.quadraticCurveTo=function(ai,m,j,i){var ah=V(this,ai,m);var ag=V(this,j,i);var aj={x:this.currentX_+2/3*(ah.x-this.currentX_),y:this.currentY_+2/3*(ah.y-this.currentY_)};var Z={x:aj.x+(ag.x-this.currentX_)/3,y:aj.y+(ag.y-this.currentY_)/3};K(this,aj,Z,ag)};q.arc=function(al,aj,ak,ag,j,m){ak*=d;var ap=m?"at":"wa";var am=al+A(ag)*ak-f;var ao=aj+l(ag)*ak-f;var i=al+A(j)*ak-f;var an=aj+l(j)*ak-f;if(am==i&&!m){am+=0.125}var Z=V(this,al,aj);var ai=V(this,am,ao);var ah=V(this,i,an);this.currentPath_.push({type:ap,x:Z.x,y:Z.y,radius:ak,xStart:ai.x,yStart:ai.y,xEnd:ah.x,yEnd:ah.y})};q.rect=function(m,j,i,p){this.moveTo(m,j);this.lineTo(m+i,j);this.lineTo(m+i,j+p);this.lineTo(m,j+p);this.closePath()};q.strokeRect=function(m,j,i,p){var Z=this.currentPath_;this.beginPath();this.moveTo(m,j);this.lineTo(m+i,j);this.lineTo(m+i,j+p);this.lineTo(m,j+p);this.closePath();this.stroke();this.currentPath_=Z};q.fillRect=function(m,j,i,p){var Z=this.currentPath_;this.beginPath();this.moveTo(m,j);this.lineTo(m+i,j);this.lineTo(m+i,j+p);this.lineTo(m,j+p);this.closePath();this.fill();this.currentPath_=Z};q.createLinearGradient=function(j,p,i,m){var Z=new U("gradient");Z.x0_=j;Z.y0_=p;Z.x1_=i;Z.y1_=m;return Z};q.createRadialGradient=function(p,ag,m,j,Z,i){var ah=new U("gradientradial");ah.x0_=p;ah.y0_=ag;ah.r0_=m;ah.x1_=j;ah.y1_=Z;ah.r1_=i;return ah};q.drawImage=function(aq,m){var aj,ah,al,ay,ao,am,at,aA;var ak=aq.runtimeStyle.width;var ap=aq.runtimeStyle.height;aq.runtimeStyle.width="auto";aq.runtimeStyle.height="auto";var ai=aq.width;var aw=aq.height;aq.runtimeStyle.width=ak;aq.runtimeStyle.height=ap;if(arguments.length==3){aj=arguments[1];ah=arguments[2];ao=am=0;at=al=ai;aA=ay=aw}else{if(arguments.length==5){aj=arguments[1];ah=arguments[2];al=arguments[3];ay=arguments[4];ao=am=0;at=ai;aA=aw}else{if(arguments.length==9){ao=arguments[1];am=arguments[2];at=arguments[3];aA=arguments[4];aj=arguments[5];ah=arguments[6];al=arguments[7];ay=arguments[8]}else{throw Error("Invalid number of arguments")}}}var az=V(this,aj,ah);var p=at/2;var j=aA/2;var ax=[];var i=10;var ag=10;ax.push(" <g_vml_:group",' coordsize="',d*i,",",d*ag,'"',' coordorigin="0,0"',' style="width:',i,"px;height:",ag,"px;position:absolute;");if(this.m_[0][0]!=1||this.m_[0][1]||this.m_[1][1]!=1||this.m_[1][0]){var Z=[];Z.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",n(az.x/d),",","Dy=",n(az.y/d),"");var av=az;var au=V(this,aj+al,ah);var ar=V(this,aj,ah+ay);var an=V(this,aj+al,ah+ay);av.x=ab.max(av.x,au.x,ar.x,an.x);av.y=ab.max(av.y,au.y,ar.y,an.y);ax.push("padding:0 ",n(av.x/d),"px ",n(av.y/d),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",Z.join(""),", sizingmethod='clip');")}else{ax.push("top:",n(az.y/d),"px;left:",n(az.x/d),"px;")}ax.push(' ">','<g_vml_:image src="',aq.src,'"',' style="width:',d*al,"px;"," height:",d*ay,'px"',' cropleft="',ao/ai,'"',' croptop="',am/aw,'"',' cropright="',(ai-ao-at)/ai,'"',' cropbottom="',(aw-am-aA)/aw,'"'," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",ax.join(""))};q.stroke=function(ao){var Z=10;var ap=10;var ag=5000;var ai={x:null,y:null};var an={x:null,y:null};for(var aj=0;aj<this.currentPath_.length;aj+=ag){var am=[];var ah=false;am.push("<g_vml_:shape",' filled="',!!ao,'"',' style="position:absolute;width:',Z,"px;height:",ap,'px;"',' coordorigin="0,0"',' coordsize="',d*Z,",",d*ap,'"',' stroked="',!ao,'"',' path="');var aq=false;for(var ak=aj;ak<Math.min(aj+ag,this.currentPath_.length);ak++){if(ak%ag==0&&ak>0){am.push(" m ",n(this.currentPath_[ak-1].x),",",n(this.currentPath_[ak-1].y))}var m=this.currentPath_[ak];var al;switch(m.type){case"moveTo":al=m;am.push(" m ",n(m.x),",",n(m.y));break;case"lineTo":am.push(" l ",n(m.x),",",n(m.y));break;case"close":am.push(" x ");m=null;break;case"bezierCurveTo":am.push(" c ",n(m.cp1x),",",n(m.cp1y),",",n(m.cp2x),",",n(m.cp2y),",",n(m.x),",",n(m.y));break;case"at":case"wa":am.push(" ",m.type," ",n(m.x-this.arcScaleX_*m.radius),",",n(m.y-this.arcScaleY_*m.radius)," ",n(m.x+this.arcScaleX_*m.radius),",",n(m.y+this.arcScaleY_*m.radius)," ",n(m.xStart),",",n(m.yStart)," ",n(m.xEnd),",",n(m.yEnd));break}if(m){if(ai.x==null||m.x<ai.x){ai.x=m.x}if(an.x==null||m.x>an.x){an.x=m.x}if(ai.y==null||m.y<ai.y){ai.y=m.y}if(an.y==null||m.y>an.y){an.y=m.y}}}am.push(' ">');if(!ao){w(this,am)}else{G(this,am,ai,an)}am.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",am.join(""))}};function w(m,ag){var j=F(m.strokeStyle);var p=j.color;var Z=j.alpha*m.globalAlpha;var i=m.lineScale_*m.lineWidth;if(i<1){Z*=i}ag.push("<g_vml_:stroke",' opacity="',Z,'"',' joinstyle="',m.lineJoin,'"',' miterlimit="',m.miterLimit,'"',' endcap="',S(m.lineCap),'"',' weight="',i,'px"',' color="',p,'" />')}function G(aq,ai,aK,ar){var aj=aq.fillStyle;var aB=aq.arcScaleX_;var aA=aq.arcScaleY_;var j=ar.x-aK.x;var p=ar.y-aK.y;if(aj instanceof U){var an=0;var aF={x:0,y:0};var ax=0;var am=1;if(aj.type_=="gradient"){var al=aj.x0_/aB;var m=aj.y0_/aA;var ak=aj.x1_/aB;var aM=aj.y1_/aA;var aJ=V(aq,al,m);var aI=V(aq,ak,aM);var ag=aI.x-aJ.x;var Z=aI.y-aJ.y;an=Math.atan2(ag,Z)*180/Math.PI;if(an<0){an+=360}if(an<0.000001){an=0}}else{var aJ=V(aq,aj.x0_,aj.y0_);aF={x:(aJ.x-aK.x)/j,y:(aJ.y-aK.y)/p};j/=aB*d;p/=aA*d;var aD=ab.max(j,p);ax=2*aj.r0_/aD;am=2*aj.r1_/aD-ax}var av=aj.colors_;av.sort(function(aN,i){return aN.offset-i.offset});var ap=av.length;var au=av[0].color;var at=av[ap-1].color;var az=av[0].alpha*aq.globalAlpha;var ay=av[ap-1].alpha*aq.globalAlpha;var aE=[];for(var aH=0;aH<ap;aH++){var ao=av[aH];aE.push(ao.offset*am+ax+" "+ao.color)}ai.push('<g_vml_:fill type="',aj.type_,'"',' method="none" focus="100%"',' color="',au,'"',' color2="',at,'"',' colors="',aE.join(","),'"',' opacity="',ay,'"',' g_o_:opacity2="',az,'"',' angle="',an,'"',' focusposition="',aF.x,",",aF.y,'" />')}else{if(aj instanceof T){if(j&&p){var ah=-aK.x;var aC=-aK.y;ai.push("<g_vml_:fill",' position="',ah/j*aB*aB,",",aC/p*aA*aA,'"',' type="tile"',' src="',aj.src_,'" />')}}else{var aL=F(aq.fillStyle);var aw=aL.color;var aG=aL.alpha*aq.globalAlpha;ai.push('<g_vml_:fill color="',aw,'" opacity="',aG,'" />')}}}q.fill=function(){this.stroke(true)};q.closePath=function(){this.currentPath_.push({type:"close"})};function V(j,Z,p){var i=j.m_;return{x:d*(Z*i[0][0]+p*i[1][0]+i[2][0])-f,y:d*(Z*i[0][1]+p*i[1][1]+i[2][1])-f}}q.save=function(){var i={};v(this,i);this.aStack_.push(i);this.mStack_.push(this.m_);this.m_=J(B(),this.m_)};q.restore=function(){if(this.aStack_.length){v(this.aStack_.pop(),this);this.m_=this.mStack_.pop()}};function h(i){return isFinite(i[0][0])&&isFinite(i[0][1])&&isFinite(i[1][0])&&isFinite(i[1][1])&&isFinite(i[2][0])&&isFinite(i[2][1])}function aa(j,i,p){if(!h(i)){return}j.m_=i;if(p){var Z=i[0][0]*i[1][1]-i[0][1]*i[1][0];j.lineScale_=N(H(Z))}}q.translate=function(m,j){var i=[[1,0,0],[0,1,0],[m,j,1]];aa(this,J(i,this.m_),false)};q.rotate=function(j){var p=A(j);var m=l(j);var i=[[p,m,0],[-m,p,0],[0,0,1]];aa(this,J(i,this.m_),false)};q.scale=function(m,j){this.arcScaleX_*=m;this.arcScaleY_*=j;var i=[[m,0,0],[0,j,0],[0,0,1]];aa(this,J(i,this.m_),true)};q.transform=function(Z,p,ah,ag,j,i){var m=[[Z,p,0],[ah,ag,0],[j,i,1]];aa(this,J(m,this.m_),true)};q.setTransform=function(ag,Z,ai,ah,p,j){var i=[[ag,Z,0],[ai,ah,0],[p,j,1]];aa(this,i,true)};q.drawText_=function(am,ak,aj,ap,ai){var ao=this.m_,at=1000,j=0,ar=at,ah={x:0,y:0},ag=[];var i=u(E(this.font),this.element_);var p=ac(i);var au=this.element_.currentStyle;var Z=this.textAlign.toLowerCase();switch(Z){case"left":case"center":case"right":break;case"end":Z=au.direction=="ltr"?"right":"left";break;case"start":Z=au.direction=="rtl"?"right":"left";break;default:Z="left"}switch(this.textBaseline){case"hanging":case"top":ah.y=i.size/1.75;break;case"middle":break;default:case null:case"alphabetic":case"ideographic":case"bottom":ah.y=-i.size/2.25;break}switch(Z){case"right":j=at;ar=0.05;break;case"center":j=ar=at/2;break}var aq=V(this,ak+ah.x,aj+ah.y);ag.push('<g_vml_:line from="',-j,' 0" to="',ar,' 0.05" ',' coordsize="100 100" coordorigin="0 0"',' filled="',!ai,'" stroked="',!!ai,'" style="position:absolute;width:1px;height:1px;">');if(ai){w(this,ag)}else{G(this,ag,{x:-j,y:0},{x:ar,y:i.size})}var an=ao[0][0].toFixed(3)+","+ao[1][0].toFixed(3)+","+ao[0][1].toFixed(3)+","+ao[1][1].toFixed(3)+",0,0";var al=n(aq.x/d)+","+n(aq.y/d);ag.push('<g_vml_:skew on="t" matrix="',an,'" ',' offset="',al,'" origin="',j,' 0" />','<g_vml_:path textpathok="true" />','<g_vml_:textpath on="true" string="',af(am),'" style="v-text-align:',Z,";font:",af(p),'" /></g_vml_:line>');this.element_.insertAdjacentHTML("beforeEnd",ag.join(""))};q.fillText=function(m,i,p,j){this.drawText_(m,i,p,j,false)};q.strokeText=function(m,i,p,j){this.drawText_(m,i,p,j,true)};q.measureText=function(m){if(!this.textMeasureEl_){var i='<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';this.element_.insertAdjacentHTML("beforeEnd",i);this.textMeasureEl_=this.element_.lastChild}var j=this.element_.ownerDocument;this.textMeasureEl_.innerHTML="";this.textMeasureEl_.style.font=this.font;this.textMeasureEl_.appendChild(j.createTextNode(m));return{width:this.textMeasureEl_.offsetWidth}};q.clip=function(){};q.arcTo=function(){};q.createPattern=function(j,i){return new T(j,i)};function U(i){this.type_=i;this.x0_=0;this.y0_=0;this.r0_=0;this.x1_=0;this.y1_=0;this.r1_=0;this.colors_=[]}U.prototype.addColorStop=function(j,i){i=F(i);this.colors_.push({offset:j,color:i.color,alpha:i.alpha})};function T(j,i){Q(j);switch(i){case"repeat":case null:case"":this.repetition_="repeat";break;case"repeat-x":case"repeat-y":case"no-repeat":this.repetition_=i;break;default:O("SYNTAX_ERR")}this.src_=j.src;this.width_=j.width;this.height_=j.height}function O(i){throw new P(i)}function Q(i){if(!i||i.nodeType!=1||i.tagName!="IMG"){O("TYPE_MISMATCH_ERR")}if(i.readyState!="complete"){O("INVALID_STATE_ERR")}}function P(i){this.code=this[i];this.message=i+": DOM Exception "+this.code}var X=P.prototype=new Error;X.INDEX_SIZE_ERR=1;X.DOMSTRING_SIZE_ERR=2;X.HIERARCHY_REQUEST_ERR=3;X.WRONG_DOCUMENT_ERR=4;X.INVALID_CHARACTER_ERR=5;X.NO_DATA_ALLOWED_ERR=6;X.NO_MODIFICATION_ALLOWED_ERR=7;X.NOT_FOUND_ERR=8;X.NOT_SUPPORTED_ERR=9;X.INUSE_ATTRIBUTE_ERR=10;X.INVALID_STATE_ERR=11;X.SYNTAX_ERR=12;X.INVALID_MODIFICATION_ERR=13;X.NAMESPACE_ERR=14;X.INVALID_ACCESS_ERR=15;X.VALIDATION_ERR=16;X.TYPE_MISMATCH_ERR=17;G_vmlCanvasManager=e;CanvasRenderingContext2D=D;CanvasGradient=U;CanvasPattern=T;DOMException=P})()};




















        $(function () {
            var curr = new Date().getFullYear();
            var opt = {
                'date': {
                    preset: 'date',
                    dateOrder: 'd Dmmyy',
                    invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] }
                },
                'datetime': {
                    preset: 'datetime',
                    minDate: new Date(2012, 3, 10, 9, 22),
                    maxDate: new Date(2014, 7, 30, 15, 44),
                    stepMinute: 5
                },
                'time': {
                    preset: 'time'
                },
                'credit': {
                    preset: 'date',
                    dateOrder: 'mmyy',
                    dateFormat: 'mm/yy',
                    startYear: curr,
                    endYear: curr + 10,
                    width: 100
                },
                'select': {
                    preset: 'select'
                },
                'select-opt': {
                    preset: 'select',
                    group: true,
                    width: 50
                }
            }

            $('.settings select').bind('change', function() {
                var demo = $('#demo').val();

                if (!demo.match(/select/i)) {
                    $('.demo-test-' + demo).val('');
                }

                $('.demo-test-' + demo).scroller('destroy').scroller($.extend(opt[demo], {
                    theme: $('#theme').val(),
                    mode: $('#mode').val(),
                    lang: $('#language').val(),
                    display: $('#display').val(),
                    animate: $('#animation').val()
                }));
                $('.demo').hide();
                $('.demo-' + demo).show();
            });

            $('#demo').trigger('change');

        });
    




















        $(function () {
            var curr = new Date().getFullYear();
            var opt = {
                'date': {
                    preset: 'date',
                    dateOrder: 'd Dmmyy',
                    invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] }
                },
                'datetime': {
                    preset: 'datetime',
                    minDate: new Date(2012, 3, 10, 9, 22),
                    maxDate: new Date(2014, 7, 30, 15, 44),
                    stepMinute: 5
                },
                'time': {
                    preset: 'time'
                },
                'credit': {
                    preset: 'date',
                    dateOrder: 'mmyy',
                    dateFormat: 'mm/yy',
                    startYear: curr,
                    endYear: curr + 10,
                    width: 100
                },
                'select': {
                    preset: 'select'
                },
                'select-opt': {
                    preset: 'select',
                    group: true,
                    width: 50
                }
            }

            $('.settings select').bind('change', function() {
                var demo = $('#demo').val();

                if (!demo.match(/select/i)) {
                    $('.demo-test-' + demo).val('');
                }

                $('.demo-test-' + demo).scroller('destroy').scroller($.extend(opt[demo], {
                    theme: $('#theme').val(),
                    mode: $('#mode').val(),
                    lang: $('#language').val(),
                    display: $('#display').val(),
                    animate: $('#animation').val()
                }));
                $('.demo').hide();
                $('.demo-' + demo).show();
            });

            $('#demo').trigger('change');

        });
    




















        $(function () {
            var curr = new Date().getFullYear();
            var opt = {
                'date': {
                    preset: 'date',
                    dateOrder: 'd Dmmyy',
                    invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] }
                },
                'datetime': {
                    preset: 'datetime',
                    minDate: new Date(2012, 3, 10, 9, 22),
                    maxDate: new Date(2014, 7, 30, 15, 44),
                    stepMinute: 5
                },
                'time': {
                    preset: 'time'
                },
                'credit': {
                    preset: 'date',
                    dateOrder: 'mmyy',
                    dateFormat: 'mm/yy',
                    startYear: curr,
                    endYear: curr + 10,
                    width: 100
                },
                'select': {
                    preset: 'select'
                },
                'select-opt': {
                    preset: 'select',
                    group: true,
                    width: 50
                }
            }

            $('.settings select').bind('change', function() {
                var demo = $('#demo').val();

                if (!demo.match(/select/i)) {
                    $('.demo-test-' + demo).val('');
                }

                $('.demo-test-' + demo).scroller('destroy').scroller($.extend(opt[demo], {
                    theme: $('#theme').val(),
                    mode: $('#mode').val(),
                    lang: $('#language').val(),
                    display: $('#display').val(),
                    animate: $('#animation').val()
                }));
                $('.demo').hide();
                $('.demo-' + demo).show();
            });

            $('#demo').trigger('change');

        });
    

/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
(function ($) {

    var ms = $.mobiscroll,
        date = new Date(),
        defaults = {
            dateFormat: 'mm/dd/yy',
            dateOrder: 'mmddy',
            timeWheels: 'hhiiA',
            timeFormat: 'hh:ii A',
            startYear: date.getFullYear() - 100,
            endYear: date.getFullYear() + 1,
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            shortYearCutoff: '+10',
            monthText: 'Month',
            dayText: 'Day',
            yearText: 'Year',
            hourText: 'Hours',
            minuteText: 'Minutes',
            secText: 'Seconds',
            ampmText: '&nbsp;',
            nowText: 'Now',
            showNow: false,
            stepHour: 1,
            stepMinute: 1,
            stepSecond: 1,
            separator: ' '
        },
        preset = function (inst) {
            var that = $(this),
                html5def = {},
                format;
            // Force format for html5 date inputs (experimental)
            if (that.is('input')) {
                switch (that.attr('type')) {
                case 'date':
                    format = 'yy-mm-dd';
                    break;
                case 'datetime':
                    format = 'yy-mm-ddTHH:ii:ssZ';
                    break;
                case 'datetime-local':
                    format = 'yy-mm-ddTHH:ii:ss';
                    break;
                case 'month':
                    format = 'yy-mm';
                    html5def.dateOrder = 'mmyy';
                    break;
                case 'time':
                    format = 'HH:ii:ss';
                    break;
                }
                // Check for min/max attributes
                var min = that.attr('min'),
                    max = that.attr('max');
                if (min) {
                    html5def.minDate = ms.parseDate(format, min);
                }
                if (max) {
                    html5def.maxDate = ms.parseDate(format, max);
                }
            }

            // Set year-month-day order
            var i,
                k,
                keys,
                values,
                wg,
                start,
                end,
                orig = $.extend({}, inst.settings),
                s = $.extend(inst.settings, defaults, html5def, orig),
                offset = 0,
                wheels = [],
                ord = [],
                o = {},
                f = { y: 'getFullYear', m: 'getMonth', d: 'getDate', h: getHour, i: getMinute, s: getSecond, a: getAmPm },
                p = s.preset,
                dord = s.dateOrder,
                tord = s.timeWheels,
                regen = dord.match(/D/),
                ampm = tord.match(/a/i),
                hampm = tord.match(/h/),
                hformat = p == 'datetime' ? s.dateFormat + s.separator + s.timeFormat : p == 'time' ? s.timeFormat : s.dateFormat,
                defd = new Date(),
                stepH = s.stepHour,
                stepM = s.stepMinute,
                stepS = s.stepSecond,
                mind = s.minDate || new Date(s.startYear, 0, 1),
                maxd = s.maxDate || new Date(s.endYear, 11, 31, 23, 59, 59);

            format = format || hformat;

            if (p.match(/date/i)) {

                // Determine the order of year, month, day wheels
                $.each(['y', 'm', 'd'], function (j, v) {
                    i = dord.search(new RegExp(v, 'i'));
                    if (i > -1) {
                        ord.push({ o: i, v: v });
                    }
                });
                ord.sort(function (a, b) { return a.o > b.o ? 1 : -1; });
                $.each(ord, function (i, v) {
                    o[v.v] = i;
                });

                wg = [];
                for (k = 0; k < 3; k++) {
                    if (k == o.y) {
                        offset++;
                        values = [];
                        keys = [];
                        start = mind.getFullYear();
                        end = maxd.getFullYear();
                        for (i = start; i <= end; i++) {
                            keys.push(i);
                            values.push(dord.match(/yy/i) ? i : (i + '').substr(2, 2));
                        }
                        addWheel(wg, keys, values, s.yearText);
                    } else if (k == o.m) {
                        offset++;
                        values = [];
                        keys = [];
                        for (i = 0; i < 12; i++) {
                            var str = dord.replace(/[dy]/gi, '').replace(/mm/, i < 9 ? '0' + (i + 1) : i + 1).replace(/m/, (i + 1));
                            keys.push(i);
                            values.push(str.match(/MM/) ? str.replace(/MM/, '<span class="dw-mon">' + s.monthNames[i] + '</span>') : str.replace(/M/, '<span class="dw-mon">' + s.monthNamesShort[i] + '</span>'));
                        }
                        addWheel(wg, keys, values, s.monthText);
                    } else if (k == o.d) {
                        offset++;
                        values = [];
                        keys = [];
                        for (i = 1; i < 32; i++) {
                            keys.push(i);
                            values.push(dord.match(/dd/i) && i < 10 ? '0' + i : i);
                        }
                        addWheel(wg, keys, values, s.dayText);
                    }
                }
                wheels.push(wg);
            }

            if (p.match(/time/i)) {

                // Determine the order of hours, minutes, seconds wheels
                ord = [];
                $.each(['h', 'i', 's', 'a'], function (i, v) {
                    i = tord.search(new RegExp(v, 'i'));
                    if (i > -1) {
                        ord.push({ o: i, v: v });
                    }
                });
                ord.sort(function (a, b) {
                    return a.o > b.o ? 1 : -1;
                });
                $.each(ord, function (i, v) {
                    o[v.v] = offset + i;
                });

                wg = [];
                for (k = offset; k < offset + 4; k++) {
                    if (k == o.h) {
                        offset++;
                        values = [];
                        keys = [];
                        for (i = 0; i < (hampm ? 12 : 24); i += stepH) {
                            keys.push(i);
                            values.push(hampm && i == 0 ? 12 : tord.match(/hh/i) && i < 10 ? '0' + i : i);
                        }
                        addWheel(wg, keys, values, s.hourText);
                    } else if (k == o.i) {
                        offset++;
                        values = [];
                        keys = [];
                        for (i = 0; i < 60; i += stepM) {
                            keys.push(i);
                            values.push(tord.match(/ii/) && i < 10 ? '0' + i : i);
                        }
                        addWheel(wg, keys, values, s.minuteText);
                    } else if (k == o.s) {
                        offset++;
                        values = [];
                        keys = [];
                        for (i = 0; i < 60; i += stepS) {
                            keys.push(i);
                            values.push(tord.match(/ss/) && i < 10 ? '0' + i : i);
                        }
                        addWheel(wg, keys, values, s.secText);
                    } else if (k == o.a) {
                        offset++;
                        var upper = tord.match(/A/);
                        addWheel(wg, [0, 1], upper ? ['AM', 'PM'] : ['am', 'pm'], s.ampmText);
                    }
                }

                wheels.push(wg);
            }

            function get(d, i, def) {
                if (o[i] !== undefined) {
                    return +d[o[i]];
                }
                if (def !== undefined) {
                    return def;
                }
                return defd[f[i]] ? defd[f[i]]() : f[i](defd);
            }

            function addWheel(wg, k, v, lbl) {
                wg.push({
                    values: v,
                    keys: k,
                    label: lbl
                });
            }

            function step(v, st) {
                return Math.floor(v / st) * st;
            }

            function getHour(d) {
                var hour = d.getHours();
                hour = hampm && hour >= 12 ? hour - 12 : hour;
                return step(hour, stepH);
            }

            function getMinute(d) {
                return step(d.getMinutes(), stepM);
            }

            function getSecond(d) {
                return step(d.getSeconds(), stepS);
            }

            function getAmPm(d) {
                return ampm && d.getHours() > 11 ? 1 : 0;
            }

            function getDate(d) {
                var hour = get(d, 'h', 0);
                return new Date(get(d, 'y'), get(d, 'm'), get(d, 'd', 1), get(d, 'a') ? hour + 12 : hour, get(d, 'i', 0), get(d, 's', 0));
            }

            // Extended methods
            // ---

            /**
             * Sets the selected date
             *
             * @param {Date} d Date to select.
             * @param {Boolean} [fill=false] Also set the value of the associated input element. Default is true.
             * @return {Object} jQuery object to maintain chainability
             */
            inst.setDate = function (d, fill, time, temp) {
                var i;

                // Set wheels
                for (i in o) {
                    inst.temp[o[i]] = d[f[i]] ? d[f[i]]() : f[i](d);
                }
                inst.setValue(inst.temp, fill, time, temp);
            };

            /**
             * Returns the currently selected date.
             *
             * @param {Boolean} [temp=false] If true, return the currently shown date on the picker, otherwise the last selected one
             * @return {Date}
             */
            inst.getDate = function (temp) {
                return getDate(temp ? inst.temp : inst.values);
            };

            // ---

            return {
                button3Text: s.showNow ? s.nowText : undefined,
                button3: s.showNow ? function () { inst.setDate(new Date(), false, 0.3, true); } : undefined,
                wheels: wheels,
                headerText: function (v) {
                    return ms.formatDate(hformat, getDate(inst.temp), s);
                },
                /**
                * Builds a date object from the wheel selections and formats it to the given date/time format
                * @param {Array} d - An array containing the selected wheel values
                * @return {String} - The formatted date string
                */
                formatResult: function (d) {
                    return ms.formatDate(format, getDate(d), s);
                },
                /**
                * Builds a date object from the input value and returns an array to set wheel values
                * @return {Array} - An array containing the wheel values to set
                */
                parseValue: function (val) {
                    var d = new Date(),
                        i,
                        result = [];
                    try {
                        d = ms.parseDate(format, val, s);
                    } catch (e) {
                    }
                    // Set wheels
                    for (i in o) {
                        result[o[i]] = d[f[i]] ? d[f[i]]() : f[i](d);
                    }
                    return result;
                },
                /**
                * Validates the selected date to be in the minDate / maxDate range and sets unselectable values to disabled
                * @param {Object} dw - jQuery object containing the generated html
                * @param {Integer} [i] - Index of the changed wheel, not set for initial validation
                */
                validate: function (dw, i) {
                    var temp = inst.temp, //.slice(0),
                        mins = { y: mind.getFullYear(), m: 0, d: 1, h: 0, i: 0, s: 0, a: 0 },
                        maxs = { y: maxd.getFullYear(), m: 11, d: 31, h: step(hampm ? 11 : 23, stepH), i: step(59, stepM), s: step(59, stepS), a: 1 },
                        minprop = true,
                        maxprop = true;
                    $.each(['y', 'm', 'd', 'a', 'h', 'i', 's'], function (x, i) {
                        if (o[i] !== undefined) {
                            var min = mins[i],
                                max = maxs[i],
                                maxdays = 31,
                                val = get(temp, i),
                                t = $('.dw-ul', dw).eq(o[i]),
                                y,
                                m;
                            if (i == 'd') {
                                y = get(temp, 'y');
                                m = get(temp, 'm');
                                maxdays = 32 - new Date(y, m, 32).getDate();
                                max = maxdays;
                                if (regen) {
                                    $('.dw-li', t).each(function () {
                                        var that = $(this),
                                            d = that.data('val'),
                                            w = new Date(y, m, d).getDay(),
                                            str = dord.replace(/[my]/gi, '').replace(/dd/, d < 10 ? '0' + d : d).replace(/d/, d);
                                        $('.dw-i', that).html(str.match(/DD/) ? str.replace(/DD/, '<span class="dw-day">' + s.dayNames[w] + '</span>') : str.replace(/D/, '<span class="dw-day">' + s.dayNamesShort[w] + '</span>'));
                                    });
                                }
                            }
                            if (minprop && mind) {
                                min = mind[f[i]] ? mind[f[i]]() : f[i](mind);
                            }
                            if (maxprop && maxd) {
                                max = maxd[f[i]] ? maxd[f[i]]() : f[i](maxd);
                            }
                            if (i != 'y') {
                                var i1 = $('.dw-li', t).index($('.dw-li[data-val="' + min + '"]', t)),
                                    i2 = $('.dw-li', t).index($('.dw-li[data-val="' + max + '"]', t));
                                $('.dw-li', t).removeClass('dw-v').slice(i1, i2 + 1).addClass('dw-v');
                                if (i == 'd') { // Hide days not in month
                                    $('.dw-li', t).removeClass('dw-h').slice(maxdays).addClass('dw-h');
                                }
                            }
                            if (val < min) {
                                val = min;
                            }
                            if (val > max) {
                                val = max;
                            }
                            if (minprop) {
                                minprop = val == min;
                            }
                            if (maxprop) {
                                maxprop = val == max;
                            }
                            // Disable some days
                            if (s.invalid && i == 'd') {
                                var idx = [];
                                // Disable exact dates
                                if (s.invalid.dates) {
                                    $.each(s.invalid.dates, function (i, v) {
                                        if (v.getFullYear() == y && v.getMonth() == m) {
                                            idx.push(v.getDate() - 1);
                                        }
                                    });
                                }
                                // Disable days of week
                                if (s.invalid.daysOfWeek) {
                                    var first = new Date(y, m, 1).getDay(),
                                        j;
                                    $.each(s.invalid.daysOfWeek, function (i, v) {
                                        for (j = v - first; j < maxdays; j += 7) {
                                            if (j >= 0) {
                                                idx.push(j);
                                            }
                                        }
                                    });
                                }
                                // Disable days of month
                                if (s.invalid.daysOfMonth) {
                                    $.each(s.invalid.daysOfMonth, function (i, v) {
                                        v = (v + '').split('/');
                                        if (v[1]) {
                                            if (v[0] - 1 == m) {
                                                idx.push(v[1] - 1);
                                            }
                                        } else {
                                            idx.push(v[0] - 1);
                                        }
                                    });
                                }
                                $.each(idx, function (i, v) {
                                    $('.dw-li', t).eq(v).removeClass('dw-v');
                                });
                            }

                            // Set modified value
                            temp[o[i]] = val;
                        }
                    });
                }
            };
        };

    $.each(['date', 'time', 'datetime'], function (i, v) {
        ms.presets[v] = preset;
        ms.presetShort(v);
    });

    /**
    * Format a date into a string value with a specified format.
    * @param {String} format - Output format.
    * @param {Date} date - Date to format.
    * @param {Object} settings - Settings.
    * @return {String} - Returns the formatted date string.
    */
    ms.formatDate = function (format, date, settings) {
        if (!date) {
            return null;
        }
        var s = $.extend({}, defaults, settings),
            look = function (m) { // Check whether a format character is doubled
                var n = 0;
                while (i + 1 < format.length && format.charAt(i + 1) == m) {
                    n++;
                    i++;
                }
                return n;
            },
            f1 = function (m, val, len) { // Format a number, with leading zero if necessary
                var n = '' + val;
                if (look(m)) {
                    while (n.length < len) {
                        n = '0' + n;
                    }
                }
                return n;
            },
            f2 = function (m, val, s, l) { // Format a name, short or long as requested
                return (look(m) ? l[val] : s[val]);
            },
            i,
            output = '',
            literal = false;

        for (i = 0; i < format.length; i++) {
            if (literal) {
                if (format.charAt(i) == "'" && !look("'")) {
                    literal = false;
                } else {
                    output += format.charAt(i);
                }
            } else {
                switch (format.charAt(i)) {
                case 'd':
                    output += f1('d', date.getDate(), 2);
                    break;
                case 'D':
                    output += f2('D', date.getDay(), s.dayNamesShort, s.dayNames);
                    break;
                case 'o':
                    output += f1('o', (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
                    break;
                case 'm':
                    output += f1('m', date.getMonth() + 1, 2);
                    break;
                case 'M':
                    output += f2('M', date.getMonth(), s.monthNamesShort, s.monthNames);
                    break;
                case 'y':
                    output += (look('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                    break;
                case 'h':
                    var h = date.getHours();
                    output += f1('h', (h > 12 ? (h - 12) : (h == 0 ? 12 : h)), 2);
                    break;
                case 'H':
                    output += f1('H', date.getHours(), 2);
                    break;
                case 'i':
                    output += f1('i', date.getMinutes(), 2);
                    break;
                case 's':
                    output += f1('s', date.getSeconds(), 2);
                    break;
                case 'a':
                    output += date.getHours() > 11 ? 'pm' : 'am';
                    break;
                case 'A':
                    output += date.getHours() > 11 ? 'PM' : 'AM';
                    break;
                case "'":
                    if (look("'")) {
                        output += "'";
                    } else {
                        literal = true;
                    }
                    break;
                default:
                    output += format.charAt(i);
                }
            }
        }
        return output;
    };

    /**
    * Extract a date from a string value with a specified format.
    * @param {String} format - Input format.
    * @param {String} value - String to parse.
    * @param {Object} settings - Settings.
    * @return {Date} - Returns the extracted date.
    */
    ms.parseDate = function (format, value, settings) {
        var def = new Date();

        if (!format || !value) {
            return def;
        }

        value = (typeof value == 'object' ? value.toString() : value + '');

        var s = $.extend({}, defaults, settings),
            shortYearCutoff = s.shortYearCutoff,
            year = def.getFullYear(),
            month = def.getMonth() + 1,
            day = def.getDate(),
            doy = -1,
            hours = def.getHours(),
            minutes = def.getMinutes(),
            seconds = 0, //def.getSeconds(),
            ampm = -1,
            literal = false, // Check whether a format character is doubled
            lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++;
                }
                return matches;
            },
            getNumber = function (match) { // Extract a number from the string value
                lookAhead(match);
                var size = (match == '@' ? 14 : (match == '!' ? 20 : (match == 'y' ? 4 : (match == 'o' ? 3 : 2)))),
                    digits = new RegExp('^\\d{1,' + size + '}'),
                    num = value.substr(iValue).match(digits);

                if (!num) {
                    return 0;
                }
                //throw 'Missing number at position ' + iValue;
                iValue += num[0].length;
                return parseInt(num[0], 10);
            },
            getName = function (match, s, l) { // Extract a name from the string value and convert to an index
                var names = (lookAhead(match) ? l : s),
                    i;

                for (i = 0; i < names.length; i++) {
                    if (value.substr(iValue, names[i].length).toLowerCase() == names[i].toLowerCase()) {
                        iValue += names[i].length;
                        return i + 1;
                    }
                }
                return 0;
                //throw 'Unknown name at position ' + iValue;
            },
            checkLiteral = function () {
                //if (value.charAt(iValue) != format.charAt(iFormat))
                //throw 'Unexpected literal at position ' + iValue;
                iValue++;
            },
            iValue = 0,
            iFormat;

        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                    literal = false;
                } else {
                    checkLiteral();
                }
            } else {
                switch (format.charAt(iFormat)) {
                case 'd':
                    day = getNumber('d');
                    break;
                case 'D':
                    getName('D', s.dayNamesShort, s.dayNames);
                    break;
                case 'o':
                    doy = getNumber('o');
                    break;
                case 'm':
                    month = getNumber('m');
                    break;
                case 'M':
                    month = getName('M', s.monthNamesShort, s.monthNames);
                    break;
                case 'y':
                    year = getNumber('y');
                    break;
                case 'H':
                    hours = getNumber('H');
                    break;
                case 'h':
                    hours = getNumber('h');
                    break;
                case 'i':
                    minutes = getNumber('i');
                    break;
                case 's':
                    seconds = getNumber('s');
                    break;
                case 'a':
                    ampm = getName('a', ['am', 'pm'], ['am', 'pm']) - 1;
                    break;
                case 'A':
                    ampm = getName('A', ['am', 'pm'], ['am', 'pm']) - 1;
                    break;
                case "'":
                    if (lookAhead("'")) {
                        checkLiteral();
                    } else {
                        literal = true;
                    }
                    break;
                default:
                    checkLiteral();
                }
            }
        }
        if (year < 100) {
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= (typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10)) ? 0 : -100);
        }
        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                var dim = 32 - new Date(year, month - 1, 32).getDate();
                if (day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }
        hours = (ampm == -1) ? hours : ((ampm && hours < 12) ? (hours + 12) : (!ampm && hours == 12 ? 0 : hours));
        var date = new Date(year, month - 1, day, hours, minutes, seconds);
        if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
            throw 'Invalid date';
        }
        return date;
    };

})(jQuery);


/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
if (!window['jQuery']) {

    var jQuery = jq;

    (function ($) {
        var document = window.document,
            classSelectorRE = /^\.([\w-]+)$/,
            idSelectorRE = /^#([\w-]+)$/,
            tagSelectorRE = /^[\w-]+$/,
            tempParent = document.createElement('div'),
            emptyArray = [],
            slice = emptyArray.slice;

        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function matches(element, selector) {
            if (!element || element.nodeType !== 1) {
                return false;
            }

            var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector ||
                                  element.oMatchesSelector || element.matchesSelector;

            if (matchesSelector) {
                return matchesSelector.call(element, selector)
            }
            // fall back to performing a selector:
            var match, parent = element.parentNode, temp = !parent
            if (temp) (parent = tempParent).appendChild(element)
            match = ~qsa(parent, selector).indexOf(element)
            temp && tempParent.removeChild(element)
            return match
        }

        function qsa(element, selector){
            var found
            return (element === document && idSelectorRE.test(selector)) ?
            ( (found = element.getElementById(RegExp.$1)) ? [found] : emptyArray ) :
            (element.nodeType !== 1 && element.nodeType !== 9) ? emptyArray :
            slice.call(
                classSelectorRE.test(selector) ? element.getElementsByClassName(RegExp.$1) :
                tagSelectorRE.test(selector) ? element.getElementsByTagName(selector) :
                element.querySelectorAll(selector)
                )
        }

        function camelize(str) {
            return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' });
        }

        ['width', 'height'].forEach(function(dimension){
            $.fn[dimension] = function(value){

                var body = document.body,
                    html = document.documentElement,
                    offset, Dimension = dimension.replace(/./, function(m){return m[0].toUpperCase()})
                if (value === undefined) return this[0] == window ? document.documentElement['client' + Dimension] :
                    this[0] == document ? Math.max(body['scroll' + Dimension], body['offset' + Dimension], html['client' + Dimension], html['scroll' + Dimension], html['offset' + Dimension]) : //document.documentElement['offset' + Dimension] :
                    (offset = this.offset()) && offset[dimension]
                else return this.each(function(idx){
                    var el = $(this)
                    el.css(dimension, value)
                })
            }
        });

        ['width', 'height'].forEach(function(dimension) {
            var offset, Dimension = dimension.replace(/./, function(m) {return m[0].toUpperCase()});
            $.fn['outer' + Dimension] = function(margin) {
                var elem = this;
                if (elem) {
                    var size = elem[0]['offset' + Dimension];
                    var sides = {'width': ['left', 'right'], 'height': ['top', 'bottom']};
                    sides[dimension].forEach(function(side) {
                        if (margin) size += parseInt(elem.css(camelize('margin-' + side)), 10);
                    });
                    return size;
                }
                else {
                    return null;
                }
            };
        });

        ["Left", "Top"].forEach(function(name, i) {
            var method = "scroll" + name;
            function isWindow( obj ) {
                return obj && typeof obj === "object" && "setInterval" in obj;
            }
            function getWindow( elem ) {
                return isWindow( elem ) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
            }

            $.fn[method] = function( val ) {
                var elem, win;
                if (val === undefined) {
                    elem = this[0];
                    if (!elem) {
                        return null;
                    }
                    win = getWindow(elem);
                    // Return the scroll offset
                    return win ? ("pageXOffset" in win) ? win[i ? "pageYOffset" : "pageXOffset"] :
                        win.document.documentElement[method] ||
                        win.document.body[method] :
                        elem[method];
                }

                // Set the scroll offset
                this.each(function() {
                    win = getWindow(this);
                    if (win) {
                        var xCoord = !i ? val : $(win).scrollLeft();
                        var yCoord = i ? val : $(win).scrollTop();
                        win.scrollTo(xCoord, yCoord);
                    }
                    else {
                        this[method] = val;
                    }
                });
            }
        });

        $.fn.is = function (selector) {
            return this.length > 0 && matches(this[0], selector);
        };

        $.fn.prop = function (name, value) {
            return (value === undefined) ? (this[0] ? this[0][name] : undefined) : this.each(function (idx) { this[name] = value; });
        };

        $.fn.focus = function (handler) {
            if (handler === undefined) {
                $(this).trigger('focus');
            } else {
                $(this).bind('focus', handler);
            }
        };

        $.fn.blur = function (handler) {
            if (handler === undefined) {
                $(this).trigger('blur');
            } else {
                $(this).bind('blur', handler);
            }
        };

        $.fn.click = function (handler) {
            if (handler === undefined) {
                $(this).trigger('click');
            } else {
                $(this).bind('click', handler);
            }
        };

        $.fn.eq = function (i) {
            return $($(this).get(i));
        };

        $.fn.index = function (element) {
            return element ? this.indexOf($(element)[0]) : this.length ? this.parent().children().indexOf(this[0]) : -1;
        };

        $.fn.slice = function () {
            return $(slice.apply(this, arguments));
        };

        $.fn.before = function (elm) {
            $(elm).insertBefore(this);
            return this;
        };

        $.fn.appendTo = function (elm) {
            $(elm).append(this);
            return this;
        };

        $.fn.pluck = function (property) {
            return this.map(function () { return this[property]; });
        };

        $.fn.prev = function () {
            var p = this.pluck('previousElementSibling');
            return p[0][0] ? $(p[0]) : $([]);
        };

        $.fn.next = function () {
            var n = this.pluck('nextElementSibling');
            return n[0][0] ? $(n[0]) : $([]);
        };

        $.inArray = function (value, array, fromIndex) {
            var i = fromIndex || 0;
            while (i < array.length) {
                if (array[i++] == value) {
                    return --i;
                }
            }
            return -1;
        };

        $.isPlainObject = function (v) {
            return $.isObject(v);
        };

        $.fn._css = $.fn.css;
        $.fn.css = function (attr, val, obj) {
            if ($.isObject(attr)) {
                var i;
                for (i in attr) {
                    $(this)._css(i, isNumeric(attr[i]) ? attr[i] + 'px' : attr[i], obj);
                }
                return this;
            } else {
                return $(this)._css(attr, isNumeric(val) ? val + 'px' : val, obj);
            }
        };

        $._extend = $.extend;
        $.extend = function () {
            arguments[0] = arguments[0] || {};
            return $._extend.apply(this, arguments);
        };

    })(jQuery);

}


/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
(function ($) {
    var ms = $.mobiscroll,
        defaults = {
            invalid: [],
            showInput: true,
            inputClass: ''
        },
        preset =  function (inst) {
            var orig = $.extend({}, inst.settings),
                s = $.extend(inst.settings, defaults, orig),
                elm = $(this),
                input,
                prevent,
                id = this.id + '_dummy',
                lvl = 0,
                ilvl = 0,
                timer = {},
                wa = s.wheelArray || createWheelArray(elm),
                labels = generateLabels(lvl),
                currWheelVector = [],
                fwv = firstWheelVector(wa),
                w = generateWheelsFromVector(fwv, lvl);

            /**
             * Disables the invalid items on the wheels
             * @param {Object} dw - the jQuery mobiscroll object
             * @param {Number} nrWheels - the number of the current wheels
             * @param {Array} whArray - The wheel array objects containing the wheel tree
             * @param {Array} whVector - the wheel vector containing the current keys
             */
            function setDisabled(dw, nrWheels, whArray, whVector) {
                var i = 0;
                while (i < nrWheels) {
                    var currWh = $('.dwwl' + i, dw),
                        inv = getInvalidKeys(whVector, i, whArray);
                    $.each(inv, function (i, v) {
                        $('.dw-li[data-val="' + v + '"]', currWh).removeClass('dw-v');
                    });
                    i++;
                }
            }

            /**
             * Returns the invalid keys of one wheel as an array
             * @param {Array} whVector - the wheel vector used to search for the wheel in the wheel array
             * @param {Number} index - index of the wheel in the wheel vector, that we are interested in
             * @param {Array} whArray - the wheel array we are searching in
             * @return {Array} - list of invalid keys
             */
            function getInvalidKeys(whVector, index, whArray) {
                var i = 0,
                    n,
                    whObjA = whArray,
                    invalids = [];

                while (i < index) {
                    var ii = whVector[i];
                    //whObjA = whObjA[ii].children;
                    for (n in whObjA) {
                        if (whObjA[n].key == ii) {
                            whObjA = whObjA[n].children;
                            break;
                        }
                    }
                    i++;
                }
                i = 0;
                while (i < whObjA.length) {
                    if (whObjA[i].invalid) {
                        invalids.push(whObjA[i].key);
                    }
                    i++;
                }
                return invalids;
            }

            /**
             * Creates a Boolean vector with true values (except one) that can be used as the readonly vector
             * n - the length of the vector
             * i - the index of the value that's going to be false
             */
            function createROVector(n, i) {
                var a = [];
                while (n) {
                    a[--n] = true;
                }
                a[i] = false;
                return a;
            }

            /**
             * Creates a labels vector, from values if they are defined, otherwise from numbers
             * l - the length of the vector
             */
            function generateLabels(l) {
                var a = [],
                    i;
                for (i = 0; i < l; i++) {
                    a[i] = s.labels && s.labels[i] ? s.labels[i] : i;
                }
                return a;
            }

            /**
             * Creates the wheel array from the vector provided
             * wv - wheel vector containing the values that should be selected on the wheels
             * l - the length of the wheel array
             */
            function generateWheelsFromVector(wv, l, index) {
                var i = 0, j, obj, chInd,
                    w = [],
                    wtObjA = wa;

                if (l) { // if length is defined we need to generate that many wheels (even if they are empty)
                    for (j = 0; j < l; j++) {
                        w[j] = [{}];
                        //w[j] = {};
                        //w[j][labels[j]] = {}; // each wheel will have a label generated by the generateLabels method
                    }
                }
                while (i < wv.length) { // we generate the wheels until the length of the wheel vector
                    //w[i] = {};
                    //w[i][labels[i]] = getWheelFromObjA(wtObjA);
                    w[i] = [getWheelFromObjA(wtObjA, labels[i])];

                    j = 0;
                    chInd = undefined;

                    while (j < wtObjA.length && chInd === undefined) {
                        if (wtObjA[j].key == wv[i] && ((index !== undefined && i <= index) || index === undefined)) {
                            chInd = j;
                        }
                        j++;
                    }

                    if (chInd !== undefined && wtObjA[chInd].children) {
                        i++;
                        wtObjA = wtObjA[chInd].children;
                    } else if ((obj = getFirstValidItemObjOrInd(wtObjA)) && obj.children) {
                        i++;
                        wtObjA = obj.children;
                    } else {
                        return w;
                    }
                }
                return w;
            }

            /**
             * Returns the first valid Wheel Node Object or its index from a Wheel Node Object Array
             * getInd - if it is true then the return value is going to be the index, otherwise the object itself
             */
            function getFirstValidItemObjOrInd(wtObjA, getInd) {
                if (!wtObjA) {
                    return false;
                }

                var i = 0,
                    obj;

                while (i < wtObjA.length) {
                    if (!(obj = wtObjA[i++]).invalid) {
                        return getInd ? i - 1 : obj;
                    }
                }
                return false;
            }

            function getWheelFromObjA(objA, lbl) {
                var wheel = {
                        keys: [],
                        values: [],
                        label: lbl
                    },
                    j = 0;

                while (j < objA.length) {
                    wheel.values.push(objA[j].value);
                    wheel.keys.push(objA[j].key);
                    j++;
                    //wheel[objA[j].key] = objA[j++].value;
                }
                return wheel;
            }

            /**
             * Hides the last i number of wheels
             * i - the last number of wheels that has to be hidden
             */
            function hideWheels(dw, i) {
                $('.dwc', dw).css('display', '').slice(i).hide();
            }

            /**
             * Generates the first wheel vector from the wheeltree
             * wt - the wheel tree object
             * uses the lvl global variable to determine the length of the vector
             */
            function firstWheelVector(wa) {
                var t = [],
                    ndObjA = wa,
                    obj,
                    ok = true,
                    i = 0;

                while (ok) {
                    obj = getFirstValidItemObjOrInd(ndObjA);
                    t[i++] = obj.key;
                    if (ok = obj.children) {
                        ndObjA = obj.children;
                    }
                }
                return t;
            }

            /**
             * Calculates the level of a wheel vector and the new wheel vector, depending on current wheel vector and the index of the changed wheel
             * wv - current wheel vector
             * index - index of the changed wheel
             */
            function calcLevelOfVector2(wv, index) {
                var t = [],
                    ndObjA = wa,
                    lvl = 0,
                    next = false,
                    i,
                    childName,
                    chInd;

                if (wv[lvl] !== undefined && lvl <= index) {
                    i = 0;

                    childName = wv[lvl];
                    chInd = undefined;

                    while (i < ndObjA.length && chInd === undefined) {
                        if (ndObjA[i].key == wv[lvl] && !ndObjA[i].invalid) {
                            chInd = i;
                        }
                        i++;
                    }
                } else {
                    chInd = getFirstValidItemObjOrInd(ndObjA, true);
                    childName = ndObjA[chInd].key;
                }

                next = chInd !== undefined ? ndObjA[chInd].children : false;

                t[lvl] = childName;

                while (next) {
                    ndObjA = ndObjA[chInd].children;
                    lvl++;
                    next = false;
                    chInd = undefined;

                    if (wv[lvl] !== undefined && lvl <= index) {
                        i = 0;

                        childName = wv[lvl];
                        chInd = undefined;

                        while (i < ndObjA.length && chInd === undefined) {
                            if (ndObjA[i].key == wv[lvl] && !ndObjA[i].invalid) {
                                chInd = i;
                            }
                            i++;
                        }
                    } else {
                        chInd = getFirstValidItemObjOrInd(ndObjA, true);
                        chInd = chInd === false ? undefined : chInd;
                        childName = ndObjA[chInd].key;
                    }
                    next = chInd !== undefined && getFirstValidItemObjOrInd(ndObjA[chInd].children) ? ndObjA[chInd].children : false;
                    t[lvl] = childName;
                }
                return {
                    lvl: lvl + 1,
                    nVector: t
                }; // return the calculated level and the wheel vector as an object
            }

            function createWheelArray(ul) {
                var wheelArray = [];

                lvl = lvl > ilvl++ ? lvl : ilvl;

                ul.children('li').each(function (index) {
                    var that = $(this),
                        c = that.clone();

                    c.children('ul,ol').remove();

                    var v = c.html().replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
                        inv = that.data('invalid') ? true : false,
                        wheelObj = {
                            key: that.data('val') || index,
                            value: v,
                            invalid: inv,
                            children: null
                        },
                        nest = that.children('ul,ol');

                    if (nest.length) {
                        wheelObj.children = createWheelArray(nest);
                    }

                    wheelArray.push(wheelObj);
                });

                ilvl--;
                return wheelArray;
            }

            $('#' + id).remove(); // Remove input if exists

            if (s.showInput) {
                input = $('<input type="text" id="' + id + '" value="" class="' + s.inputClass + '" readonly />').insertBefore(elm);
                inst.settings.anchor = input; // give the core the input element for the bubble positioning

                if (s.showOnFocus) {
                    input.focus(function () {
                        inst.show();
                    });
                }
            }

            if (!s.wheelArray) {
                elm.hide().closest('.ui-field-contain').trigger('create');
            }

            return {
                width: 50,
                wheels: w,
                headerText: false,
                onBeforeShow: function (dw) {
                    var t = inst.temp;
                    currWheelVector = t.slice(0);
                    inst.settings.wheels = generateWheelsFromVector(t, lvl, lvl);
                    prevent = true;
                },
                onSelect: function (v, inst) {
                    if (input) {
                        input.val(v);
                    }
                },
                onChange: function (v, inst) {
                    if (input && s.display == 'inline') {
                        input.val(v);
                    }
                },
                onClose: function () {
                    if (input) {
                        input.blur();
                    }
                },
                onShow: function (dw) {
                    $('.dwwl', dw).bind('mousedown touchstart', function () {
                        clearTimeout(timer[$('.dwwl', dw).index(this)]);
                    });
                },
                validate: function (dw, index, time) {
                    var t = inst.temp;
                    if ((index !== undefined && currWheelVector[index] != t[index]) || (index === undefined && !prevent)) {
                        inst.settings.wheels = generateWheelsFromVector(t, null, index);
                        var args = [],
                            i = (index || 0) + 1,
                            o = calcLevelOfVector2(t, index);
                        if (index !== undefined) {
                            inst.temp = o.nVector.slice(0);
                        }
                        while (i < o.lvl) {
                            args.push(i++);
                        }
                        hideWheels(dw, o.lvl);
                        currWheelVector = inst.temp.slice(0);
                        if (args.length) {
                            prevent = true;
                            inst.settings.readonly = createROVector(lvl, index);
                            clearTimeout(timer[index]);
                            timer[index] = setTimeout(function () {
                                inst.changeWheel(args);
                                inst.settings.readonly = false;
                            }, time * 1000);
                            return false;
                        }
                        setDisabled(dw, o.lvl, wa, inst.temp);
                    } else {
                        var o = calcLevelOfVector2(t, t.length);
                        setDisabled(dw, o.lvl, wa, t);
                        hideWheels(dw, o.lvl);
                    }
                    prevent = false;
                }
            };
        };

    $.each(['list', 'image', 'treelist'], function (i, v) {
        ms.presets[v] = preset;
        ms.presetShort(v);
    });

})(jQuery);


/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
if (!window['jQuery']) {
    
    var jQuery = Zepto;
    
    (function ($) {
        
        ['width', 'height'].forEach(function(dimension){
            $.fn[dimension] = function(value){
                var body = document.body,
                    html = document.documentElement,
                    offset, Dimension = dimension.replace(/./, function(m){return m[0].toUpperCase()})
                if (value === undefined) return this[0] == window ? html['client' + Dimension] :
                    this[0] == document ? Math.max(body['scroll' + Dimension], body['offset' + Dimension], html['client' + Dimension], html['scroll' + Dimension], html['offset' + Dimension]) :
                    (offset = this.offset()) && offset[dimension]
                else return this.each(function(idx){
                    var el = $(this)
                    el.css(dimension, value)
                })
            }
        });
    
        ['width', 'height'].forEach(function (dimension) {
            var offset, Dimension = dimension.replace(/./, function (m) { return m[0].toUpperCase(); });
            $.fn['outer' + Dimension] = function (margin) {
                var elem = this;
                if (elem) {
                    var size = elem[0]['offset' + Dimension],
                        sides = {'width': ['left', 'right'], 'height': ['top', 'bottom']};
                    sides[dimension].forEach(function (side) {
                        if (margin) {
                            size += parseInt(elem.css('margin-' + side), 10);
                        }
                    });
                    return size;
                } else {
                    return null;
                }
            };
        });
    
        ["Left", "Top"].forEach(function (name, i) {
            var method = "scroll" + name;
    
            function isWindow(obj) {
                return obj && typeof obj === "object" && "setInterval" in obj;
            }
    
            function getWindow(elem) {
                return isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
            }
    
            $.fn[method] = function (val) {
                var elem, win;
                if (val === undefined) {
                    elem = this[0];
                    if (!elem) {
                        return null;
                    }
                    win = getWindow(elem);
                    // Return the scroll offset
                    return win ? ("pageXOffset" in win) ? win[i ? "pageYOffset" : "pageXOffset"] :
                            win.document.documentElement[method] ||
                            win.document.body[method] :
                            elem[method];
                }
    
                // Set the scroll offset
                this.each(function () {
                    win = getWindow(this);
                    if (win) {
                        var xCoord = !i ? val : $(win).scrollLeft(),
                            yCoord = i ? val : $(win).scrollTop();
                        win.scrollTo(xCoord, yCoord);
                    } else {
                        this[method] = val;
                    }
                });
            };
        });
        
        // Fix zepto.js extend to work with undefined parameter
        $._extend = $.extend;
        $.extend = function () {
            arguments[0] = arguments[0] || {};
            return $._extend.apply(this, arguments);
        };
    
    })(jQuery);

}

(function ($) {
    var theme = {
        defaults: {
            dateOrder: 'Mddyy',
            mode: 'mixed',
            rows: 5,
            width: 70,
            height: 36,
            showLabel: false,
            useShortLabels: true
        }
    };

    $.mobiscroll.themes['android-ics'] = theme;
    $.mobiscroll.themes['android-ics light'] = theme;

})(jQuery);



(function ($) {

    $.mobiscroll.themes.android = {
        defaults: {
            dateOrder: 'Mddyy',
            mode: 'clickpick',
            height: 50,
            showLabel: false
        }
    }

})(jQuery);



/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
(function ($) {

    var defaults = {
        inputClass: '',
        invalid: [],
        rtl: false,
        group: false,
        groupLabel: 'Groups'
    };

    $.mobiscroll.presetShort('select');

    $.mobiscroll.presets.select = function (inst) {
        var orig = $.extend({}, inst.settings),
            s = $.extend(inst.settings, defaults, orig),
            elm = $(this),
            multiple = elm.prop('multiple'),
            id = this.id + '_dummy',
            option = multiple ? (elm.val() ? elm.val()[0] : $('option', elm).attr('value')) : elm.val(),
            group = elm.find('option[value="' + option + '"]').parent(),
            prev = group.index() + '',
            gr = prev,
            prevent,
            l1 = $('label[for="' + this.id + '"]').attr('for', id),
            l2 = $('label[for="' + id + '"]'),
            label = s.label !== undefined ? s.label : (l2.length ? l2.text() : elm.attr('name')),
            invalid = [],
            origValues = [],
            main = {},
            grIdx,
            optIdx,
            timer,
            input,
            roPre = s.readonly,
            w;

        function genWheels() {
            var cont,
                wg = 0,
                values = [],
                keys = [],
                w = [[]];

            if (s.group) {
                if (s.rtl) {
                    wg = 1;
                }

                $('optgroup', elm).each(function (i) {
                    values.push($(this).attr('label'));
                    keys.push(i);
                });

                w[wg] = [{
                    values: values,
                    keys: keys,
                    label: label
                }];

                cont = group;
                wg += (s.rtl ? -1 : 1);

            } else {
                cont = elm;
            }

            values = [];
            keys = [];

            $('option', cont).each(function () {
                var v = $(this).attr('value');
                values.push($(this).text());
                keys.push(v);
                if ($(this).prop('disabled')) {
                    invalid.push(v);
                }
            });

            w[wg] = [{
                values: values,
                keys: keys,
                label: label
            }];

            return w;
        }

        function setVal(v, fill) {
            var value = [];

            if (multiple) {
                var sel = [],
                    i = 0;

                for (i in inst._selectedValues) {
                    sel.push(main[i]);
                    value.push(i);
                }
                input.val(sel.join(', '));
            } else {
                input.val(v);
                value = fill ? inst.values[optIdx] : null;
            }

            if (fill) {
                prevent = true;
                elm.val(value).trigger('change');
            }
        }

        // if groups is true and there are no groups fall back to no grouping
        if (s.group && !$('optgroup', elm).length) {
            s.group = false;
        }

        if (!s.invalid.length) {
            s.invalid = invalid;
        }

        if (s.group) {
            if (s.rtl) {
                grIdx = 1;
                optIdx = 0;
            } else {
                grIdx = 0;
                optIdx = 1;
            }
        } else {
            grIdx = -1;
            optIdx = 0;
        }

        $('#' + id).remove();

        input = $('<input type="text" id="' + id + '" class="' + s.inputClass + '" readonly />').insertBefore(elm),

        $('option', elm).each(function () {
            main[$(this).attr('value')] = $(this).text();
        });

        if (s.showOnFocus) {
            input.focus(function () {
                inst.show();
            });
        }

        var v = elm.val() || [],
            i = 0;

        for (i; i < v.length; i++) {
            inst._selectedValues[v[i]] = v[i];
        }

        setVal(main[option]);

        elm.unbind('.dwsel').bind('change.dwsel', function () {
            if (!prevent) {
                inst.setValue(multiple ? elm.val() || [] : [elm.val()], true);
            }
            prevent = false;
        }).hide().closest('.ui-field-contain').trigger('create');

        // Extended methods
        // ---

        if (!inst._setValue) {
            inst._setValue = inst.setValue;
        }

        inst.setValue = function (d, fill, time, noscroll, temp) {
            var value,
                v = $.isArray(d) ? d[0] : d;

            option = v !== undefined ? v : $('option', elm).attr('value');

            if (multiple) {
                inst._selectedValues = {};
                var i = 0;
                for (i; i < d.length; i++) {
                    inst._selectedValues[d[i]] = d[i];
                }
            }

            if (s.group) {
                group = elm.find('option[value="' + option + '"]').parent();
                gr = group.index();
                value = s.rtl ? [option, group.index()] : [group.index(), option];
                if (gr !== prev) { // Need to regenerate wheels, if group changed
                    s.wheels = genWheels();
                    inst.changeWheel([optIdx]);
                    prev = gr + '';
                }
            } else {
                value = [option];
            }

            inst._setValue(value, fill, time, noscroll, temp);

            // Set input/select values
            if (fill) {
                var changed = multiple ? true : option !== elm.val();
                setVal(main[option], changed);
            }
        };

        inst.getValue = function (temp) {
            var val = temp ? inst.temp : inst.values;
            return val[optIdx];
        };

        // ---

        return {
            width: 50,
            wheels: w,
            headerText: false,
            multiple: multiple,
            anchor: input,
            formatResult: function (d) {
                return main[d[optIdx]];
            },
            parseValue: function () {
                var v = elm.val() || [],
                    i = 0;

                if (multiple) {
                    inst._selectedValues = {};
                    for (i; i < v.length; i++) {
                        inst._selectedValues[v[i]] = v[i];
                    }
                }

                option = multiple ? (elm.val() ? elm.val()[0] : $('option', elm).attr('value')) : elm.val();

                group = elm.find('option[value="' + option + '"]').parent();
                gr = group.index();
                prev = gr + '';
                return s.group && s.rtl ? [option, gr] : s.group ? [gr, option] : [option];
            },
            validate: function (dw, i, time) {
                if (i === undefined && multiple) {
                    var v = inst._selectedValues,
                        j = 0;

                    $('.dwwl' + optIdx + ' .dw-li', dw).removeClass('dw-msel');

                    for (j in v) {
                        $('.dwwl' + optIdx + ' .dw-li[data-val="' + v[j] + '"]', dw).addClass('dw-msel');
                    }
                }

                if (i === grIdx) {
                    gr = inst.temp[grIdx];
                    if (gr !== prev) {
                        group = elm.find('optgroup').eq(gr);
                        gr = group.index();
                        option = group.find('option').eq(0).val();
                        option = option || elm.val();
                        s.wheels = genWheels();
                        if (s.group) {
                            inst.temp = s.rtl ? [option, gr] : [gr, option];
                            s.readonly = [s.rtl, !s.rtl];
                            clearTimeout(timer);
                            timer = setTimeout(function () {
                                inst.changeWheel([optIdx]);
                                s.readonly = roPre;
                                prev = gr + '';
                            }, time * 1000);
                            return false;
                        }
                    } else {
                        s.readonly = roPre;
                    }
                } else {
                    option = inst.temp[optIdx];
                }

                var t = $('.dw-ul', dw).eq(optIdx);
                $.each(s.invalid, function (i, v) {
                    $('.dw-li[data-val="' + v + '"]', t).removeClass('dw-v');
                });
            },
            onBeforeShow: function (dw) {
                s.wheels = genWheels();
                if (s.group) {
                    inst.temp = s.rtl ? [option, group.index()] : [group.index(), option];
                }
            },
            onMarkupReady: function (dw) {
                $('.dwwl' + grIdx, dw).bind('mousedown touchstart', function () {
                    clearTimeout(timer);
                });
                if (multiple) {
                    dw.addClass('dwms');
                    $('.dwwl', dw).eq(optIdx).addClass('dwwms');
                    origValues = {};
                    var i;
                    for (i in inst._selectedValues) {
                        origValues[i] = inst._selectedValues[i];
                    }
                }
            },
            onValueTap: function (li) {
                if (multiple && li.hasClass('dw-v') && li.closest('.dw').find('.dw-ul').index(li.closest('.dw-ul')) == optIdx) {
                    var val = li.attr('data-val');
                    if (li.hasClass('dw-msel')) {
                        delete inst._selectedValues[val];
                    } else {
                        inst._selectedValues[val] = val;
                    }
                    li.toggleClass('dw-msel');

                    if (s.display == 'inline') {
                        setVal(val, true);
                    }
                    return false;
                }
            },
            onSelect: function (v) {
                setVal(v, true);
                if (s.group) {
                    inst.values = null;
                }
            },
            onCancel: function () {
                if (s.group) {
                    inst.values = null;
                }
                if (multiple) {
                    inst._selectedValues = {};
                    var i;
                    for (i in origValues) {
                        inst._selectedValues[i] = origValues[i];
                    }
                }
            },
            onChange: function (v) {
                if (s.display == 'inline' && !multiple) {
                    input.val(v);
                    prevent = true;
                    elm.val(inst.temp[optIdx]).trigger('change');
                }
            },
            onClose: function () {
                input.blur();
            }
        };
    };

})(jQuery);


(function ($) {
    
    var anim;
    
    $.mobiscroll.themes.wp = {
        defaults: {
            width: 70,
            height: 76,
            accent: 'none',
            dateOrder: 'mmMMddDDyy',
            showLabel: false,
            onAnimStart: function (dw, i, time) {
                $('.dwwl' + i, dw).addClass('wpam');
                clearTimeout(anim[i]);
                anim[i] = setTimeout(function () {
                    $('.dwwl' + i, dw).removeClass('wpam');
                }, time * 1000 + 100);
            }
        },
        init: function (elm, inst) {
            var click,
                active;
            
            anim = {};
            
            $('.dw', elm).addClass('wp-' + inst.settings.accent);

            //$('.dwwl', elm).bind('touchstart mousedown DOMMouseScroll mousewheel', function () {
            $('.dwwl', elm).delegate('.dw-sel', 'touchstart mousedown DOMMouseScroll mousewheel', function () {
                click = true;
                active = $(this).closest('.dwwl').hasClass('wpa');
                $('.dwwl', elm).removeClass('wpa');
                $(this).closest('.dwwl').addClass('wpa');
            }).bind('touchmove mousemove', function () {
                click = false;
            }).bind('touchend mouseup', function () {
                if (click && active) {
                    $(this).closest('.dwwl').removeClass('wpa');
                }
            });
        }
    };

    $.mobiscroll.themes['wp light'] = $.mobiscroll.themes.wp;

})(jQuery);




(function ($) {

    $.mobiscroll.themes.jqm = {
        defaults: {
            jqmBorder: 'a',
            jqmBody: 'c',
            jqmHeader: 'b',
            jqmWheel: 'd',
            jqmClickPick: 'c',
            jqmSet: 'b',
            jqmCancel: 'c'
        },
        init: function (elm, inst) {
            var s = inst.settings;
            $('.dw', elm).removeClass('dwbg').addClass('ui-overlay-shadow ui-corner-all ui-body-' + s.jqmBorder);
            $('.dwb-s span', elm).attr('data-role', 'button').attr('data-theme', s.jqmSet);
            $('.dwb-n span', elm).attr('data-role', 'button').attr('data-theme', s.jqmCancel);
            $('.dwb-c span', elm).attr('data-role', 'button').attr('data-theme', s.jqmCancel);
            $('.dwwb', elm).attr('data-role', 'button').attr('data-theme', s.jqmClickPick);
            $('.dwv', elm).addClass('ui-header ui-bar-' + s.jqmHeader);
            $('.dwwr', elm).addClass('ui-body-' + s.jqmBody);
            $('.dwpm .dwwl', elm).addClass('ui-body-' + s.jqmWheel);
            $('.dwpm .dwl', elm).addClass('ui-body-' + s.jqmBody);
            elm.trigger('create');
            // Hide on overlay click
            $('.dwo', elm).click(function () { inst.cancel(); });
        }
    };

})(jQuery);


(function ($) {

    $.mobiscroll.themes.ios = {
        defaults: {
            dateOrder: 'MMdyy',
            rows: 5,
            height: 30,
            width: 55,
            headerText: false,
            showLabel: false,
            useShortLabels: true
        }
    }

})(jQuery);

