




var rates = {};
var base = 1;
var options = {
  'usd': true,
  'cad': false,
  'mxn': false,
  'brl': false,
  'cop': false,
  'eur': true,
  'gbp': false,
  'chf': false,
  'nok': false,
  'sek': false,
  'dkk': false,
  'rub': false,
  'zar': false,
  'ils': false,
  'aed': false,
  'jpy': true,
  'cny': false,
  'hkd': false,
  'inr': false,
  'myr': false,
  'sgd': false,
  'krw': false,
  'twd': false,
  'aud': false,
  'nzd': false
};
function showHome() {
  $('#currencies li').hide();
  $.each(options, function(key, value) {
    if (value) {
      $('#' + key).show();
    }
  });
}
function showOptions() {
  $.each(options, function(key, value) {
    $('#' + key + '_chk').attr('checked', value).checkboxradio('refresh');
  });
}
function supportsHtml5Storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}
$(function() {
  if (supportsHtml5Storage()) {
    if (localStorage.base) {
      base = parseFloat(localStorage.base);
    }
    if (localStorage.rates) {
      rates = JSON.parse(localStorage.rates);
      $('#currencies input').each(function() {
        $(this).val(Math.round(base * rates[this.name] * 100) / 100);
      });
    }
    if (localStorage.options) {
      options = JSON.parse(localStorage.options);
    }
  }
  showHome();
  $('#home').live('pageshow', function() {
    showHome();
  });
  $('#options').live('pageshow', function() {
    showOptions();
  });
  $('#currencies input').focus(function() {
    $('#currencies input').each(function() {
      $(this).val('');
    });
  });
  $('#currencies input').bind('change keyup input', function() {
    var from = this.name;
    var amount = parseFloat(this.value);
    if (isFinite(amount)) {
      base = amount / rates[from];
      localStorage.base = base;
    }
    $('#currencies input').each(function() {
      var to = this.name;
      if (from != to) {
        $(this).val(Math.round(base * rates[to] * 100) / 100);
      }
    });
  });
  $('#options input').change(function() {
    options[this.name] = this.checked;
    localStorage.options = JSON.stringify(options);
  });
  var jqxhr = $.ajax({
    url: 'https://query.yahooapis.com/v1/public/yql',
    dataType: 'jsonp',
    data: {
      q: 'select * from yahoo.finance.xchange where pair="USDCAD,USDMXN,USDBRL,USDCOP,USDEUR,USDGBP,USDCHF,USDNOK,USDSEK,USDDKK,USDRUB,USDZAR,USDILS,USDAED,USDJPY,USDCNY,USDHKD,USDINR,USDMYR,USDSGD,USDKRW,USDTWD,USDAUD,USDNZD"',
      format: 'json',
      env: 'store://datatables.org/alltableswithkeys'
    }
  });
  jqxhr.success(function(data) {
    var items = data.query.results.rate;
    rates['usd'] = 1;
    for (var i = 0, l = items.length; i < l; i++){
      item = items[i];
      keyName = item.Name.substr(item.Name.length - 3).toLowerCase();
      rates[keyName] = +item.Rate;
    }
    $('#currencies input').each(function() {
      $(this).val(Math.round(base * rates[this.name] * 100) / 100);
    });
    if (supportsHtml5Storage()) {
      localStorage.rates = JSON.stringify(rates);
    }
  });
});

