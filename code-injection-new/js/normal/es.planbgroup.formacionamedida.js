
/* Copyright (c) 2012 Mobile Developer Solutions. All rights reserved.
 * This software is available under the MIT License:
 * The MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

$('#page-home').live('pageinit', function(event){  
    $('.api-div').hide();
    $('.api-div#api-intro').show();
    
    $('#intro').click(function() {
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);            
    });
    
    $('div ul li a').click(function(event) {
        event.preventDefault();
        //alert('clicked : ' + $(this).attr('id'));
        var attrId = $(this).attr('id');

        if (attrId.indexOf("click") !== 0) {
            return;
        }
        
        var api = '#api' + attrId.substring(attrId.indexOf('-'));
        
        // hide all div's, show only this one
        $('.api-div').hide();
        $(api).show();

        // if small screen and portrait - close after tap
        var disp = $('ul #listdivider').css("display");
        //alert(disp + ' : ' + api);
        if (disp === 'none') {
            $('div.ui-collapsible').trigger("collapse");
        } else {
            $.mobile.silentScroll(0);            
        }
    }); 
    
    $('#listdivider').click(function(event) {
        event.preventDefault();
        $('.api-div').hide();
        $('.api-div#api-intro').show();
        $.mobile.silentScroll(0);
    });
});











    id_sector_loaded = '';
    id_sector_selected = '1';
    list_modules = '';

$(document).bind('pageinit', function(){


    $.mobile.defaultPageTransition = "none";
    $.mobile.pushStateEnabled = false;

    $('.msg_validate').hide();

    // Obtener Sectores 
    getSectorsAjax();
   
    // Obtener areas
    $('#section_sector').off('vclick').on('vclick','.btn_next', 
      getAreasAjax
    );

    // Listar modulos seleccionados
    $('.section_area').off('vclick').on('vclick','#area_finish',
      showListModulesSelected
    );

    // Borrar modulos al hacer click en el .delete_module
    $('#section_validate').off('vclick').on('vclick','.delete_module',
      deleteSelectModule
    );

    
    // Validar campos y enviar correo
    $('#section_send').off('vclick').on('vclick', '#btn_send_email',
     validateForm  
    );


});



// Obtener sectores a traves de ajax
function getSectorsAjax(event){
  $.ajax({
    url: 'http://formacionamedida.planbgroup.es/functions/jsonp-get-sectors.php',
    cache:false,
    dataType: 'jsonp',
    crossDomain: true,
    type: 'get',
    jsonp : "callback",
    jsonpCallback: "jsonpPrintSectors",
    error: function(e){

    }
  });
}

// Recorrer sectores obtenidos por ajax y mostrarlos en pantalla
function jsonpPrintSectors(data) {
  var html = "<fieldset id='wrapper-select' data-role='controlgroup'>";

  $.each( data , function(key, value){ 
    html += "<label for='sector_"+key+"'>"+value+"</label>";
    html += "<input type='radio' name='radio_sector' id='sector_"+key+"' value='"+key+"'  />";
  });
  
  html += "</div>";

  
  $('#section_sector #content_section_sector').html(html).trigger('create');

  $.mobile.hidePageLoadingMsg();
 //$("input[type=radio]").checkboxradio().checkboxradio("refresh");
}





// Obtener areas, subareas y modulos a traves de ajax
function getAreasAjax(event){
  event.preventDefault();
  var sector_selected = $('#content_section_sector input[type=radio]:checked');

  if ( sector_selected.length == 1 ){

    id_sector_selected = sector_selected.val();
    
    if ( id_sector_loaded !== id_sector_selected ){

      $.ajax({
        url: 'http://formacionamedida.planbgroup.es/functions/jsonp-get-areas.php',
        data: {sector : '1'},
        cache: false,
        dataType: 'jsonp',
        crossDomain: true,
        type: 'get',
        jsonp: 'callback',
        jsonpCallback: 'jsonpPrintAreas',
        beforeSend: function(){
          $.mobile.showPageLoadingMsg();
        },
        error: function(e){

        }
      });

    }else{
      $.mobile.changePage( $('#section_area_1') );
    }

  }else{
    $( "#popup_sector" ).popup();
    $( "#popup_sector" ).popup('open');
  }
}

// Recorrer areas, subareas y modulos y mostrarlos en pantalla
// Cada area una pagina
function jsonpPrintAreas(data){
  var num_areas = data.amount,
      areas = data.areas;
      
  id_sector_loaded = id_sector_selected;

  var html_areas = '';

  for ( area in areas ){

    html_areas += "<div data-role='page' class='section section_area' id='section_area_" + area + "'>";

    html_areas += "<div data-role='header' data-id='head' data-position='fixed' data-tap-toggle='false'> \
      <h1>Formación personalizada</h1> \
      <div data-role='title_section' class='title_section' data-tap-toggle='false'> \
        <h2>" + areas[area].name + "</h2> \
      </div> \
    </div>";
    

    html_areas += "<div data-role='controlgroup'>";

    for ( subarea in areas[area].subareas ) {

      html_areas += "<div class='ui-title'><label class='title_subareas'>" + 
                      areas[area].subareas[subarea].name + 
                    "</label></div>";

      for ( module in areas[area].subareas[subarea].modules ){
        html_areas += "<label for='module_" + module + "'>" + 
                          areas[area].subareas[subarea].modules[module] + 
                      "</label>" + 
                      "<input type='checkbox' name='module_" + module + "' id='module_" + module + "' " + 
                      "value='" + areas[area].subareas[subarea].modules[module] + "'/>";
      }

    }

    html_areas += "</div>";

    var href_next = ( parseInt(area) !== parseInt(num_areas) ) ? "#section_area_" + (parseInt(area) + 1) : "#";
    var is_finish = ( parseInt(area) !== parseInt(num_areas) ) ? '' : "id='area_finish'";
    html_areas += "<div data-role='footer' data-id='foot' data-position='fixed' data-tap-toggle='false'> \
      <div data-role='navbar'> \
        <ul> \
          <li><a data-rel='back' class='btn_back'>Anterior</a></li> \
          <li><a href='" + href_next + "' " + is_finish + " class='btn_next'>Siguiente</a></li> \
        </ul> \
      </div> \
    </div>";
     
    if ( parseInt(area) == parseInt(num_areas) ){
      html_areas += "<div data-role='popup' id='popup_module' class='ui-content'>" +
        "<a href='#' data-rel='back' data-role='button' data-theme='a' data-icon='delete' data-iconpos='notext' class='ui-btn-right'>Close</a>" +
        "<p>Debe elegir al menos un módulo<p>" +
      "</div>";
    } 


    html_areas += "</div>";
  }

  // Borrar paginas de areas si ya existieran
  $('.section_area').remove();

  // Agregar html generado con las nuevas areas
  $('#section_validate').before( html_areas );

  // Actualizar las paginas de areas agregadas 
  $('.section_area').page();

  $.mobile.hidePageLoadingMsg();

  // Mover a la pagina del area 1
  $.mobile.changePage( $('#section_area_1') );

}


// Recorrer modulos seleccionados y mostrarlos
function showListModulesSelected(event){
  event.preventDefault();
  if ( $('.section_area input[type=checkbox]:checked').length > 0 ){
    var html_modules_selected = "<ul data-role='listview'>";

    $('.section_area input[type=checkbox]:checked').each(function(){

      var that = $(this);

      var number_module = that.attr('id').substring( that.attr('id').lastIndexOf('_') + 1);

      html_modules_selected += "<li><a href='#'>" + that.val() + "</a>" + 
      "<a href='#' data-icon='delete' class='delete_module' value='" + that.val() + "' id='delete_module_" + number_module + "'>delete</a></li>";
    });

    html_modules_selected += '</ul>'; 

    $.mobile.changePage( $('#section_validate') );

    $('#section_validate .ui-content').html( html_modules_selected ).trigger('create');
   

  }else{
    $( "#popup_module" ).popup();
    $( "#popup_module" ).popup('open');
  }
}



// Borrar modulo al pulsar en .delete_module
function deleteSelectModule(event){
  event.preventDefault();
  var that = $(this);

  var number_module = that.attr('id').substring( that.attr('id').lastIndexOf('_') + 1);

  if ( confirm("¿Desea eliminar el modulo '" + that.attr('value') + "' de su seleccion?") ){
    $("#module_" + number_module).prop("checked", false).checkboxradio('refresh');
    that.parent().slideUp(200);
  }

}



// Validar campos del formulario
function validateForm(event){
  
  var formValid = true;
  if ( $('#f_name').val().length == 0 ) {
    $('#f_name').next('.msg_validate').slideDown(200);
    formValid = false;
  }
  if ( $('#f_lastname').val().length == 0 ) {
   $('#f_lastname').next('.msg_validate').slideDown(200);
   formValid = false;
  }
  if ( $('#f_email').val().length == 0 || ! /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/.test( $('#f_email').val() ) ) {
    $('#f_email').next('.msg_validate').slideDown(200);
    formValid = false;
  }
  if ( $('#f_phone').val().length < 9 ) {
    $('#f_phone').next('.msg_validate').slideDown(200);
    formValid = false;
  }
  if ( ! $('#privacity').is(':checked') ) {
    $( "#popup_privacidad" ).popup();
    $( "#popup_privacidad" ).popup('open');
    formValid = false;
  }

  if ( formValid ) {
    sendMail();
  }
}



// Enviar correo
function sendMail(){

    list_modules = new Array();
   
    $('.section_area input[type=checkbox]:checked').each(function(){

      var that = $(this);
      var number_module = that.attr('id').substring( that.attr('id').lastIndexOf('_') + 1);
      list_modules.push(number_module);

    });


    var formulario = $('#registerForm');

    if ( $('#creditos').is(':checked') ){
        var credit_checked = "true";
    }else{
        var credit_checked = "false";
    }


    $.ajax({
        url: "http://formacionamedida.planbgroup.es/functions/jsonp_mailto.php",
        cache: false, 
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'callback',
        data: { name: formulario.find('#f_name').val(),
                lastname: formulario.find('#f_lastname').val(),
                email: formulario.find('#f_email').val(),
                phone: formulario.find('#f_phone').val(),
                company: formulario.find('#f_company').val(),
                modules: list_modules.join('-'),
                creditos: credit_checked,
                section: id_sector_loaded
        },
        beforeSend: function(){
          $.mobile.showPageLoadingMsg();
        },
        jsonpCallback: 'jsonpEmailCorrect',
        error: function(error){
            $( "#popup_error" ).popup();
            $( "#popup_error" ).popup('open');
        }

    });
}

function jsonpEmailCorrect(data , esa){
    if ( data.msg == true ){
      $.mobile.hidePageLoadingMsg();
      $.mobile.changePage( $('#section_finish') );  
    }
}
