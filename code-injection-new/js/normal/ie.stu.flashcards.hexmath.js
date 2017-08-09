
<!--
        google_ad_client = "ca-pub-2927391648548989";
        /* HexMath */
        google_ad_slot = "3930287670";
        google_ad_width = 234;
        google_ad_height = 60;
        //-->
        





<!--
        google_ad_client = "ca-pub-2927391648548989";
        /* HexMath */
        google_ad_slot = "3930287670";
        google_ad_width = 234;
        google_ad_height = 60;
        //-->
        





jQuery(document).ready(function() {

  nextProblem();

  jQuery('#op_addition').click(function(e) {
    e.stopPropagation();
    nextProblem();
  });

  jQuery('#op_subtraction').click(function(e) {
    e.stopPropagation();
    nextProblem();
  });

  jQuery(document).click(function() {
    if(jQuery('#answer').css('color') == 'rgb(0, 0, 0)') {
      nextProblem();
    } else {
      jQuery('#answer').css('color', '#000');
    }
  });

});

function nextProblem() {
  var firstTerm;
  var secondTerm;
  var answer;
  var operation;

  if(jQuery('#op_addition').is(':checked')) {
    firstTerm  = 0 + Math.floor(Math.random()*15)+1;
    secondTerm = 0 + Math.floor(Math.random()*15)+1;
    answer     = 0 + firstTerm + secondTerm;
    operation  = '+';
  } else if(jQuery('#op_subtraction').is(':checked')) {
    firstTerm  = 0 + Math.floor(Math.random()*15)+1;
    secondTerm = 0 + Math.floor(Math.random()*15)+1;
    answer     = 0 + firstTerm - secondTerm;
    operation  = '-';
  }

  jQuery('#firstTerm').text(firstTerm.toString(16));
  jQuery('#secondTerm').text(secondTerm.toString(16));
  jQuery('#operation').text(operation);
  jQuery('#answer').css('color', '#FFF');
  jQuery('#answer').text(answer.toString(16));
}


jQuery(document).ready(function() {

  nextProblem();

  jQuery('#op_addition').click(function(e) {
    e.stopPropagation();
    nextProblem();
  });

  jQuery('#op_subtraction').click(function(e) {
    e.stopPropagation();
    nextProblem();
  });

  jQuery(document).click(function() {
    if(jQuery('#answer').css('color') == 'rgb(0, 0, 0)') {
      nextProblem();
    } else {
      jQuery('#answer').css('color', '#000');
    }
  });

});

function nextProblem() {
  var firstTerm;
  var secondTerm;
  var answer;
  var operation;

  if(jQuery('#op_addition').is(':checked')) {
    firstTerm  = 0 + Math.floor(Math.random()*15)+1;
    secondTerm = 0 + Math.floor(Math.random()*15)+1;
    answer     = 0 + firstTerm + secondTerm;
    operation  = '+';
  } else if(jQuery('#op_subtraction').is(':checked')) {
    firstTerm  = 0 + Math.floor(Math.random()*15)+1;
    secondTerm = 0 + Math.floor(Math.random()*15)+1;
    answer     = 0 + firstTerm - secondTerm;
    operation  = '-';
  }

  jQuery('#firstTerm').text(firstTerm.toString(16));
  jQuery('#secondTerm').text(secondTerm.toString(16));
  jQuery('#operation').text(operation);
  jQuery('#answer').css('color', '#FFF');
  jQuery('#answer').text(answer.toString(16));
}

