








      function setScale ()
      {
        if(!('isTablet' in window)) {
          setTimeout(setScale, 100)
          return
        }
        hasSetScale = true
      }
      setScale()
    

/***********************************************************************
 * ONE CORE BUSINESSS SUITE ANDROID APP
 * ui.js
 * User interface stuff.
 * Written by TJ (tj@cloudsky.org)
 ***/

/** Internal globals **************************************************/

var _pageDroppers = []
var _agreementScroller


/** Ready handler *****************************************************/

function onReady (callback)
/*
 * Replacement for $(document).ready and onDeviceReady().
 */
{
  if(navigator.userAgent.indexOf('Chrome')  >= 0) $(callback)
  else {
    if(!('isTablet' in window) || !('hasSetScale' in window)) {
      setTimeout(function () { onReady(callback) }, 100)
    } else {
      // deviceready might fire before all handlers are registered.
      if(typeof navigator.device == "undefined") {
        document.addEventListener('deviceready', callback, false)
      } else {
        $(callback)
      }
    }
  }
}


/** Landscape/phone orientation support *******************************/

function setLayout ()
/*
 * Sets up the DOM classes so the correct layout CSS are used.
 */
{
  if(isTablet && (screen.width > screen.height)) {
    $('body').removeClass('phone').addClass('tablet')
  } else {
    $('body').removeClass('tablet').addClass('phone')
  }
}

onReady(setLayout)

/** Page management ***************************************************/

function replacePage (page)
/*
 * Displays a page, replacing any currently displayed page.
 * "page" can be a string or the jQuery object representing the page.
 */
{
  if(typeof page === 'string') var p = $('#pageholder .page.'+page)
  else var p = $(page)
  
  $('#pageholder .page.on').removeClass('on')
  p.addClass('on')
  updateHeight()
  
  tearDownDatefields($('.page.on').last())
  setupDatefields(p)
  
  var side = p.data('sidebar')
  setSidebar(side)
}

function pushPage (page)
/*
 * Shows the specified page, and automatically appends history,
 * navigation buttons (cookie crumbs), etc.
 */
{
  var currentPage = $('#pageholder .page.on')
  
  if(currentPage.length) {
    function dropPage () {
      var drop = false
      $('#naviholder .navi').each(function (i, c) {
        if(c === crumb[0]) drop = true
        if(drop) {
          $(c).remove()
        }
        replacePage(currentPage)
      })
      
      for(var i=_pageDroppers.length-1; i>=0; i--) {
        var d = _pageDroppers.pop()
        if(d === dropPage) break
      }
    }
    
    var currentTitle = $('.pagetitle', currentPage).text()
  
    var crumb = $('<div class="navi">')
    crumb.append('<div class="left">')
         .append('<div class="right">')
         .append('<div class="center">')
         .append($('<div class="main">').text(currentTitle))
    crumb.click(dropPage)
    $('#naviholder').append(crumb)
    setTimeout(function () { crumb.addClass('on') }, 0)
    
    _pageDroppers.push(dropPage)
  }
  
  replacePage(page)
}

function dropPage (noConfirm)
/*
 * Drops a page, if the stack is greater than 1 page.
 * If forms are being shown, drop those first.
 */
{
  var lastForm = $('#formholder .form.on').last()
  if(lastForm.length) {
    if(noConfirm) hideForm(lastForm);
    else {
      navigator.notification.confirm(
        'Clear this form and return to previous page?',
        function (b) { if(b==1) hideForm(lastForm) }
      )
    }
    return
  }
  
  if(_pageDroppers.length) _pageDroppers[_pageDroppers.length-1]()
}

function pageStackHeight ()
/*
 * Returns the total number of stacked (and on) pages + forms.
 */
{
  return $('#formholder .form.on').length + _pageDroppers.length + 1
}

function setSidebar (cls)
/*
 * Sets a #sidebar .sidenav item as "selected" i.e. yellow.
 */
{
  $('#sidebar .sidenav').removeClass('sel')
  if(cls) {
    var parts = cls.split('/')
    $('#sidebar .sidenavi > .sidenav.'+parts[0]).addClass('sel')
    if(parts[1]) {
      $('#sidebar .sidenavi > .sidenav.'
        + parts[0]
        +' .child')
      .addClass('sel')
    }
  }
}

function updateHeight ()
/*
 * Automatically sets page height to the currently active form or page's
 * height, because there would be too much blank space at the bottom
 * otherwise.
 */
{
  setTimeout(function () {
    if(_agreementScroller) _agreementScroller.refresh()
  }, 0)
  
  var form = $('#formholder .form.on').last()
  if(form.length) {
    if(isTablet) $('#pageholder , #sidebar').height(
      // 45 = header height, 37 = #greetingphone height
      Math.max(screen.height/displayScale, form.height())-45
    ); else $('#pageholder , #sidebar').height(
      Math.max(screen.height/displayScale, form.height())
      -45-$('#greetingphone').height()
    )
    $('#formholder , #progressscreen , #firsttimeagreement'
      +', #waitingserver').height(
      Math.max(screen.height/displayScale, form.height())
    )
    return
  }
  
  var page = $('#pageholder .page.on').last()
  if(isTablet) $('#pageholder , #sidebar').height(
    // 45 = header height, 37 = #greetingphone height
    Math.max(screen.height/displayScale-45, page.height())
  ); else $('#pageholder , #sidebar').height(
    Math.max(
      screen.height/displayScale-45-$('#greetingphone').height(),
      page.height()
    )
  )
  $('#formholder , #progressscreen , #firsttimeagreement'
    +', #waitingserver').height(
    Math.max(
      screen.height/displayScale+47+$('#greetingphone').height(),
      page.height()
    )
  )
}


/** Form management ***************************************************/
/*
 * Simple show/hide functions for forms. No handling of stacking.
 */

function showForm (form)
{
  if(typeof form === 'string') form = $('#formholder .form.'+form)
  setupDatefields(form)
  $('#formholder').show()
  $(form).addClass('on')
  updateHeight()
  if($('#formholder .form.on').length == 1) {
  }
}

function hideForm (form)
{
  if(typeof form === 'string') form = $('#formholder .form.'+form)
  tearDownDatefields(form)
  $(form).removeClass('on')
  updateHeight()
  if(!$('#formholder .form.on').length) {
    $('#formholder').hide()
  }
}


/** Back button handler ***********************************************/

function backButtonDropper ()
{
  if(!$('.form.on').length 
    && $('.page.on').last().hasClass('loginpage'))
  {
    alert('finish()')
    return
  } else {
    dropPage()
  }
}

function watchBackButton ()
{
  document.addEventListener('backbutton', backButtonDropper, false)
}

function ignoreBackButton ()
{
  document.removeEventListener('backbutton', backButtonDropper, false)
}

onReady(function () {
  watchBackButton()
  // Need at least one watcher so we don't get kicked back to previous
  // activity on backbutton.
  document.addEventListener('backbutton', function () {}, false)
})


/** Progress bar ******************************************************/

function showProgress (title)
{
  $('#progressscreen .title').text('')
  updateProgress(0,100)
  $('#progressscreen').show()
}

function setProgressTitle (title)
{
  $('#progressscreen .title').text(title)
}

function updateProgress (done, total)
{
  $('#progressscreen .progress').text(''+Math.floor(done/total*100))
}

function hideProgress ()
{
  $('#progressscreen').hide()
}


/** Input blocker while awaiting server response **********************/

function serverWait ()
/*
 * Blocks user input. Show waiting message on user input.
 */
{
  ignoreBackButton()
  $('#waitingserver').show()
}

function serverDone ()
/*
 * Unblocks user input.
 */
{
  watchBackButton()
  $('#waitingserver').hide()
}

onReady(function () {
  $('#waitingserver').click(function () {
    alert('Please wait for server response.')
  })
})


/** Date inputs including automatic value updating ********************/
onReady(function () {
  $('.datefield').each(function (ii, df) {
    $('select.year , select.month , select.date', df).live(
      'change',
      function () {
        var date = new Date(0)
        date.setUTCFullYear($('.year', df).val())
        date.setUTCMonth($('.month', df).val())
        if($('select.date', df).length) {
          date.setUTCDate($('.date', df).val())
        } else {
          date.setUTCDate(1)
        }
        $('input[type=hidden]', df).val(date2str(date))
      }
    )
  })
})

function setupDatefields (container)
/*
 * Set up OPTIONs only when they are required to prevent going over
 * memory usage limit...
 */
{
  $('.datefield', container).each(function (ii, df) {
    var dateval = $('input[type=hidden]', df).val()
    var date = dateval ? str2date(dateval) : undefined
    for(var i=1; i<32; i++) {
      var opt = $('<option>'+i+'</option>')
      if(date && date.getUTCDate() == i) opt.attr('selected','selected')
      $('select.date', df).append(opt)
    }
    for(var i=0; i<12; i++) {
      // shortMonths[] defined in script.js...
      var opt = $('<option value="'+i+'">'+shortMonths[i]+'</option>')
      if(date && date.getUTCMonth()==i) opt.attr('selected','selected')
      $('select.month', df).append(opt)
      $('select.month', df).unbind('change').change(function () {
        for(var d = $('select.date option', df).length;
            d < 31;
            d++)
        {
          $('select.date', df).append(
            $('<option>'+(d+1)+'</option>')
          )
        }
        var select = this
        setTimeout(function () {
          switch($(select).val()) {
            case '3':
            case '5':
            case '8':
            case '10':
              if($('select.date', df).val() > 30) {
                $('select.date', df).val('30')
              }
              for(var d = $('select.date option', df).length;
                  d > 30;
                  d--)
              {
                $('select.date option', df).last().remove()
              }
              break
            case '1':
              var numDays = ($('select.year', df).val() % 4) ? 28 : 29
              if($('select.date', df).val() > numDays) {
                $('select.date', df).val(numDays)
              }
              for(var d = $('select.date option', df).length;
                  d > numDays;
                  d--)
              {
                $('select.date option', df).last().remove()
              }
              break
          }
        }, 1)
      })
    }
    for(var i=2000; i<2031; i++) {
      var opt = $('<option>'+i+'</option>')
      if(date&&date.getUTCFullYear()==i) opt.attr('selected','selected')
      $('select.year', df).append(opt)
      $('select.year', df).unbind('change').change(function () {
        if($('select.month', df).val() == '1') {
            for(var d = $('select.date option', df).length;
            d < 31;
            d++)
        {
          $('select.date', df).append(
            $('<option>'+(d+1)+'</option>')
          )
        }
          var numDays = ($(this).val() % 4) ? 28 : 29
          if($('select.date', df).val() > numDays) {
            $('select.date', df).val(numDays)
          }
          for(var d = $('select.date option', df).length;
              d > numDays;
              d--)
          {
            $('select.date option', df).last().remove()
          }
        }
      })
    }
  })
}

function tearDownDatefields (container)
/*
 * Remove OPTIONS when no longer required to prevent going over
 * memory usage limit...
 */
{
  $('.datefield option', container).remove()
}

function setDateField (field, time)
/*
 * Set datefield "field" to display the time "time".
 * "time" should be a Unix time.
 */
{
  field = $(field)
  var date = new Date(time*1000)
  
  $('select.date',  field).val(date.getUTCDate())
  $('select.month', field).val(date.getUTCMonth())
  $('select.year',  field).val(date.getUTCFullYear())
  
  for(var d = $('select.date option', field).length;
      d < 31;
      d++)
  {
    $('select.date', field).append($('<option>'+(d+1)+'</option>'))
  }
  setTimeout(function () {
    switch(date.getUTCMonth()) {
      case 3:
      case 5:
      case 8:
      case 10:
        for(var d = $('select.date option', field).length;
            d > 30;
            d--)
        {
          $('select.date option', field).last().remove()
        }
        break
      case 1:
        var numDays = (date.getUTCFullYear() % 4) ? 28 : 29
        for(var d = $('select.date option', field).length;
            d > numDays;
            d--)
        {
          $('select.date option', field).last().remove()
        }
        break
    }
  }, 1)
  
  // date2str defined in script.js...
  $('input[type=hidden]', field).val(date2str(date))
}


/** Common UI Widgets *************************************************/

/** Handle _animations_ for radio buttons **/
onReady(function () {
  $('.radio').each(function (i, radio) {
    var choices = $('.choice', radio)
    var selected = $('.selected', radio)
    
    var wholeWidth = $(radio).width()
    var choiceWidth = Math.floor(wholeWidth/choices.length)
    var selectedWidth = Math.min(choiceWidth+16, wholeWidth)
    
    choices.width(choiceWidth)
    selected.width(selectedWidth)
    
    choices.each(function (i, choice) {
      $(choice).click(function () { setRadioChoice(radio, i) })
    })
  })
})

function setRadioChoice (el, i)
/*
 * Set radio button to i'th choice, visually.
 */
{
  var choices = $('.choice', el)
  var selected = $('.selected', el)
  
  var wholeWidth = $(el).width()
  var choiceWidth = Math.floor(wholeWidth/choices.length)
  var selectedWidth = Math.min(choiceWidth+16, wholeWidth)
  
  if(!i) selected.css(
    '-webkit-transform', 'translateX(0px)'
  )
  else if(i+1 === choices.length) selected.css(
    '-webkit-transform',
    'translateX(' + (wholeWidth-selectedWidth) + 'px)'
  )
  else selected.css(
    '-webkit-transform',
    'translateX(' + (i*choiceWidth-8) + 'px)'
  )
}

/** Handle form cancel buttons **/
onReady(function () {
  $('#formholder .form').each(function (i, form) {
    $('.cancelbutton , .cancelbutton2', form).click(function (ev) {
      ev.preventDefault()
      hideForm(form)
    })
  })
})

/** List iScroll **/
onReady(function () {
  $('.list').each(function (i, list) {
    var iscroll = new iScroll(list)
    $(list).data('iscroll', iscroll)
  })
})

/** List sorting **/
onReady(function () {
  var numberCheck = /[^0-9. ]/
  $('.list').each(function (_, list) {
    var table = ('table', list)
    $('thead td', table).live('click', function () {
      var headIndex = 0
      var headCell = this
      $('td', $(this).parent()).each(function (i, cell) {
        if(cell == headCell) {
          headIndex = i
          return false
        }
      })
      var tbody = $('tbody', table)
      var sortable = $('tr', tbody).get()
      sortable.sort(function (a, b) {
        var atext = $('td', a).eq(headIndex).text().toLowerCase()
        var btext = $('td', b).eq(headIndex).text().toLowerCase()
        if(!numberCheck.test(atext) && !numberCheck.test(btext)) {
          atext = parseFloat(atext)
          btext = parseFloat(btext)
        }
        if(atext < btext) return -1
        if(atext == btext) return 0
        return 1
      })
      $.each(sortable, function (i, row) {
        tbody.append(row)
      })
      setTimeout(function () { $(list).data('iscroll').refresh() }, 1)
    })
  })
})

/** First time users agreement page ***********************************/

function showAgreement (ok, cancel)
/*
 * Shows the first-time user agreement. Calls "ok" if user agrees,
 * cancel if user disagrees.
 */
{
  ignoreBackButton()
  
  $('#firsttimeagreement .cancel')
  .unbind('click')
  .click(function (ev) {
    ev.preventDefault()
    watchBackButton()
    _agreementScroller.destroy()
    _agreementScroller = undefined
    $('#firsttimeagreement').hide()
    cancel()
  })
  
  $('#firsttimeagreement .ok')
  .unbind('click')
  .click(function (ev) {
    ev.preventDefault()
    watchBackButton()
    _agreementScroller.destroy()
    _agreementScroller = undefined
    $('#firsttimeagreement').hide()
    ok()
  })
  
  $('#firsttimeagreement').show()
  setTimeout(function () {
    _agreementScroller = new iScroll(
      $('#firsttimeagreement .textwrapper')[0]
    )
  }, 0)
}


/***********************************************************************
 * ONE CORE BUSINESSS SUITE ANDROID APP
 * script.js
 * Written by TJ (tj@cloudsky.org)
 ***/


onReady(function () {
  setup_logoutButton()
  setup_sidebar()
  setup_firstTimeButton()
  
  setup_loginPage()
  setup_homePage()
  setup_profilesListPage()
  setup_funnelsListPage()
  setup_retailsListPage()
  setup_messagesListPage()
  setup_searchReportPage()
  
  setup_createaccountform()
  setup_customerForm()
  setup_funnelForm()
  setup_retailForm()
  setup_messageForm()
  setup_searchCustomerForm()
  setup_searchFunnelForm()
  setup_searchRetailForm()
  
  replacePage('loginpage')
})


/** Misc setup functions **********************************************/

function setup_logoutButton ()
{
  $('#logout').click(function () {
    serverWait()
    logout(function (ret) {
      serverDone()
      onLoggedOut(ret)
    })
  })
}

function setup_sidebar ()
{
  function dropAll () {
    while(pageStackHeight() > 1) dropPage()
  }
  function showFunc (f) {
    return function () {
      dropAll()
      window[f]()
    }
  }
  
  $('#sidebar .blockout').click(function () {
    alert('Please log in first!')
  })
  
  $('#sidebar .sidenav.home > .main').click(dropAll)
  $('#sidebar .sidenav.cprof > .main').click(
    showFunc('showCustomerProfileList')
  )
  $('#sidebar .sidenav.sfun > .main').click(
    showFunc('showSalesFunnelList')
  )
  $('#sidebar .sidenav.retail > .main').click(showFunc('showRetailList'))
  $('#sidebar .sidenav.searchreport > .main').click(
    showFunc('showSearchPage')
  )
  $('#sidebar .sidenav.news > .main').click(showFunc('showMessageList'))
  $('#sidebar .sidenav.pref > .main').click(doShowPreferences)
}

function setup_firstTimeButton()
{
  $('.page.loginpage .firsttimeuser a').click(function (ev) {
    ev.preventDefault()
    showForm('createaccountform')
    setTimeout(function () {
      $('[name=name] , [name=email] , [name=company]',
        '#formholder .form.createaccountform'
      ).val('')
    }, 50)
    
    /* FUDGE: hide the loginpage elements bcos Android is HORRIBLE
     * at handling layered inputs/links. (Samsung Galaxy S2 2.3.6)
     */
    $('.page.loginpage input').hide()
    function reappear () {
      if(!$('#formholder .form.createaccountform').hasClass('on')) {
        $('.page.loginpage input').show()
      } else {
        setTimeout(reappear, 50)
      }
    }
    setTimeout(reappear, 50)
  })
}


/** Page setup functions **********************************************/
/*
 * Set up event handlers only, not data.
 */

function setup_loginPage ()
{
  function onSubmit (ev) {
    ev.preventDefault()
    $('input', loginPage).attr('disabled', 'disabled')
    $('.loginbutton', loginPage).text('Please wait')
    serverWait()
    login(
      {
        username:$('[name=username]', loginPage).val(),
        password:$('[name=password]', loginPage).val()
      },
      function (ret) {
        serverDone()
        function enter () {
          $('#sidebar .blockout').hide()
          $('#poweredby').hide()
          replacePage('homepage')
          $('#logout').addClass('on')
          $('#greetingphone , #greetingtablet')
          .css('opacity', '1')
          .text('Hi, '+ret.auth.name+'!')
          $('[name=username]', loginPage).val('')
          $('[name=password]', loginPage).val('')
          $('.loginbutton', loginPage).text('Login')
          getActiveMessages(function (ret) {
            if(!ret.auth) {
              onLoggedOut()
              return
            }
            if(ret.status != '1') alert(
              'Failed to get messages from server! Error: '
              + ret.error
            )
          })
        }
        
        $('input', loginPage).removeAttr('disabled')
        $('.loginbutton', loginPage).text('Login')
        $('form', loginPage).one('submit', onSubmit)
        if(ret.status == '1') {
          if(ret.firstTime != '1') enter()
          else showAgreement(enter, function () {
            logout(function () {})
            onLoggedOut()
          })
        } else {
          alert('Error: '+ret.error)
        }
      }
    )
  }
  
  var loginPage = $('.page.loginpage')
  
  $('.loginbutton', loginPage).click(function (ev) {
    ev.preventDefault()
    $(this).parents('form').submit()
  })
  $('form', loginPage).one('submit', onSubmit)
  
  _server(
    backendurls['ads'],
    'GET',
    {},
    function (ret) {
      if(ret.status == '1' && ret.ads) {
        $.each(ret.ads, function (i, ad) {
          var div = $('<div class="advert">')
          var a = $('<a>').attr('href', ad.hyperlink)
          var img = $('<img>').attr('src', ad.image)
          a.append(img)
          div.append(a)
          $('.advertholder', loginPage).append(div)
        })
        $('.advertholder', loginPage).height(ret.ads.length*105)
        setTimeout(function () {
          if(loginPage.hasClass('on')) updateHeight()
        }, 500)
        setTimeout(function () {
          if(loginPage.hasClass('on')) updateHeight()
        }, 2000)
        //$('.advertholder', loginPage).load(function () {updateHeight()})
      }
    }
  )
}

function setup_homePage ()
{
  var slideIndex = 0, slideTimer
  function slide (delta) {
    clearTimeout(slideTimer)
    
    slideIndex += delta
    if(slideIndex < 0) {
      slideIndex = $('.messageslider .messagebox', homepage).length - 1
    }
    if(slideIndex >= $('.messageslider .messagebox', homepage).length) {
      slideIndex = 0
    }
    
    $('.messageslider', homepage).css(
      '-webkit-transform',
      'translateX('
      + (-slideIndex)*$('.messagewrapper', homepage).width()
      + 'px)'
    )
    
    slideTimer = setTimeout(function () { slide(1) }, 4000)
  }
  
  var homepage = $('.page.homepage')
  
  subscribeActiveMessages(function (messages) {
    $('.messageslider .messagebox', homepage).remove()
    if(!messages || !messages.length) {
      $('.messageslider', homepage).append(
          '<div class="messagebox"><div class="message aligncenter"><i>'
          + 'No messages'
          + '</i></div></div>'
      )
    } else $.each(messages, function (i, msg) {
      var cutofflength = 120
      var shortcontent = msg.content.substr(0, cutofflength)
      var longcontent = msg.content.substr(cutofflength)
      var date = str2date(msg.startDate)
      var box = $('<div class="messagebox">')
      var title = $('<div class="title">').text(msg.title)
      var message = $('<div class="message">')
      message.append($('<span>').text(shortcontent))
      if(longcontent.length) {
        var dots = $('<span>').text('...')
        message.append(dots)
        var expandbutton = $('<a class="expand" href="#">')
        expandbutton.text(' More')
        expandbutton.click(function (ev) {
          ev.preventDefault()
          dots.remove()
          expandbutton.remove()
          message.append($('<span>').text(longcontent))
          setTimeout(updateHeight, 5)
        })
        message.append(expandbutton)
      }
      var meta = $('<div class="meta">').text(
        '- ' + msg.author + ', '
        + date.getUTCDate() + ' ' + shortMonths[date.getUTCMonth()]
      )
      box.append(title)
         .append(message)
         .append(meta)
      $('.messageslider', homepage).append(box)
    })
    slide(-slideIndex)
    setTimeout(updateHeight, 5)
  })
  
  $('.prevmessage', homepage).click(function () { slide(-1) })
  $('.nextmessage', homepage).click(function () { slide(1) })
  
  $('.pagelink.cprof', homepage).click(showCustomerProfileList)
  $('.pagelink.sfun', homepage).click(showSalesFunnelList)
  $('.pagelink.retail', homepage).click(showRetailList)
  $('.pagelink.searchreport', homepage).click(showSearchPage)
  $('.pagelink.news', homepage).click(showMessageList)
  $('.pagelink.pref', homepage).click(doShowPreferences)
}

function setup_profilesListPage ()
{
  var prevProfiles
  function populate (profiles) {
    prevProfiles = profiles
    var tbody = $('tbody', page)
    $('> *', tbody).remove()
    $.each(profiles, function (i, p) {
      if((filter.val() === 'Active' && p.isActive == '1')
         || (filter.val() === 'Inactive' && p.isActive == '0')
      ) {
        var row = $('<tr>')
        if(/[^ ]/.test(p.name)) row.append($('<td>').text(p.name))
        else row.append($('<td>').html('&nbsp;'))
        if(p.contactName1 && /[^ ]/.test(p.contactName1)) {
          row.append($('<td>').text(p.contactName1))
        } else row.append($('<td>').html('&nbsp;'))
        if(isTablet) {
          row.append($('<td>').text(p.contactTel1))
        }
        row.click(function () {
          serverWait()
          getCustomer(p.seq, function (ret) {
            serverDone()
            if(!ret.auth) {
              onLoggedOut()
              return
            }
            if(ret.status == '1') showCustomerProfile(ret.customer)
            else alert(
              'Failed to get customer from server! Error: '
              + ret.error
            )
          })
        })
        tbody.append(row)
      }
    })
    setTimeout(function () {
      $('.list', page).data('iscroll').refresh()
    }, 1)
  }
  
  var page = $('.page.profileslistpage')
  var filter = $('[name=activeStatus]', page)
  
  if(!isTablet) {
    $('thead tr td', page).eq(0).css('width', '300px')
    $('thead tr td', page).eq(1).css('width', '121px')
  } else {
    $('thead tr td', page).eq(0).css('width', '278px')
    $('thead tr td', page).eq(1).css('width', '110px')
    $('thead tr', page).append(
      $('<td>Number</td>').css('width', '150px')
    )
  }
  
  subscribeCustomerProfiles(function (profiles) { populate(profiles) })
  
  $('.activefilter .choice', page).click(function () {
    filter.val($(this).text())
    populate(prevProfiles)
  })
  
  $('.newbutton', page).click(function () { showCustomerForm() })
}

function setup_funnelsListPage ()
{
  var prevFunnels
  function populate (funnels) {
    var total = 0
    prevFunnels = funnels
    var tbody = $('tbody', page)
    $('> *', tbody).remove()
    $.each(funnels, function (i, f) {
      if(filter.val() == f.status || filter.val() == f.status.status) {
        total += parseFloat(f.figure)
        var row = $('<tr>')
        if(/[^ ]/.test(f.projectName)) {
          row.append($('<td>').text(f.projectName))
        } else {
          row.append($('<td>').html('&nbsp;'))
        }
        row.append($('<td>').text(parseFloat(f.figure).toFixed(2)))
        if(isTablet) row.append($('<td>').text(f.custName))
        row.click(function () {
          serverWait()
          getFunnel(f.seq, function (ret) {
            serverDone()
            if(!ret.auth) {
              onLoggedOut()
              return
            }
            if(ret.status == '1') showSalesFunnel(ret.sales)
            else alert(
              'Failed to get forecast from server! Error: '
              + ret.error
            )
          })
        })
        tbody.append(row)
      }
    })
    setTimeout(function () {
      $('.list', page).data('iscroll').refresh()
    }, 1)
    $('.total', page).text('' + total.toFixed(2))
  }
  
  var page = $('.page.funnelslistpage')
  var filter = $('[name=status]', page)
  
  if(!isTablet) {
    $('thead tr td', page).eq(0).css('width', '266px')
    $('.filterchoices', page).css('font-size', '75%')
  } else {
    $('thead tr td', page).eq(0).css('width', '233px')
    $('thead tr', page).append(
      $('<td>Customer</td>').css('width', '150px')
    )
  }
  
  subscribeSalesFunnels(function (funnels) { populate(funnels) })
  
  $('.radio .choice', page).click(function () {
    filter.val($(this).text())
    populate(prevFunnels)
  })
  
  $('.newbutton', page).click(function () { showFunnelForm() })
}

function setup_retailsListPage ()
{
  function populate (retails) {
    var total = 0
    var tbody = $('tbody', page)
    var fil = str2date(filter.val()).getTime()/1000
    $('> *', tbody).remove()
    if(!retails[fil] || !retails[fil].retails.length) {
      //alert('No retails for the specified month')
    } else $.each(retails[fil].retails, function (i, r) {
      total += r.total
      var date = str2date(r.salesDate)
      var row = $('<tr>')
      row.append($('<td>').text(
        date.getUTCDate() + ' ' + shortMonths[date.getUTCMonth()]
        + ', ' + date.getUTCFullYear()
      ))
      row.append($('<td>').text(r.total.toFixed(2)))
      if(isTablet) {
        if(/[^ ]/.test(r.product)) row.append($('<td>').text(r.product))
        else row.append($('<td>').html('&nbsp;'))
      }
      row.click(function () {
        serverWait()
        getRetail(r.seq, function (ret) {
          serverDone()
          if(!ret.auth) {
            onLoggedOut()
            return
          }
          if(ret.status == '1') showRetail(ret.retail)
          else alert(
            'Failed to get transaction from server! Error: '
            + ret.error
          )
        })
      })
      tbody.append(row)
    })
    setTimeout(function () {
      $('.list', page).data('iscroll').refresh()
    }, 1)
    $('.total', page).text('' + total.toFixed(2))
  }
  
  var page = $('.page.retailslistpage')
  var filter = $('.page.retailslistpage .retfilter')
  
  var date = new Date(0), now = new Date()
  date.setUTCFullYear( now.getUTCFullYear() )
  date.setUTCMonth( now.getUTCMonth() )
  date.setUTCDate( 1 )
  
  setTimeout(function () {
    setDateField($('.datefield', page), date.getTime()/1000)
  }, 1)
  
  if(isTablet) {
    $('thead tr', page).append(
      $('<td>Product</td>').css('width', '233px')
    )
  }
  
  subscribeRetails(function (retails) { populate(retails) })
  
  $('.datefield select', page).live('change', function () {
    serverWait()
    getRetails(
      str2date(filter.val()).getTime()/1000,
      function (ret) {
        serverDone()
        if(!ret.auth) {
          onLoggedOut()
          return
        }
        if(ret.status != '1') {
          alert(
            'Failed to get transactions from server! Error: '
            + ret.error
          )
        }
      }
    )
  })
  
  $('.newbutton', page).click(function () { showRetailForm() })
}

function setup_messagesListPage ()
{
  var prevMessages
  function populate (messages) {
    prevMessages = messages
    var tbody = $('tbody', page)
    $('> *', tbody).remove()
    $.each(messages, function (i, m) {
      if(filter.val() == m.isPublish) {
        var date = str2date(m.startDate)
        var row = $('<tr>')
        if(/[^ ]/.test(m.title)) row.append($('<td>').text(m.title))
        else row.append($('<td>').html('&nbsp;'))
        row.append($('<td>').text(
          date.getUTCDate() + ' ' + shortMonths[date.getUTCMonth()]
        ))
        if(isTablet) {
          row.append($('<td>').text(m.author.name))
        }
        row.click(function () {
          if(m.__retrieved) showMessage(m)
          else {
            serverWait()
            getMessage(m.seq, function (ret) {
              serverDone()
              if(!ret.auth) {
                onLoggedOut()
                return
              }
              if(ret.status == '1') showMessage(ret.message)
              else alert(
                'Failed to get message from server! Error: '
                + ret.error
              )
            })
          }
        })
        tbody.append(row)
      }
    })
    setTimeout(function () {
      $('.list', page).data('iscroll').refresh()
    }, 1)
  }
  
  var page = $('.page.messageslistpage')
  var filter = $('[name=isPublish]', page)
  
  if(!isTablet) {
    $('thead tr td', page).eq(0).css('width', '331px')
  } else {
    $('thead tr td', page).eq(0).css('width', '298px')
    $('thead tr', page).append(
      $('<td>Author</td>').css('width', '150')
    )
  }
  
  subscribeMessages(function (messages) { populate(messages) })
  
  $('.radio .choice', page).click(function () {
    filter.val($(this).text() == 'Published' ? 1 : 0)
    populate(prevMessages)
  })
  
  $('.newbutton', page).click(function () { showMessageForm() })
}

function setup_searchReportPage ()
{
  var page = $('.page.searchpage')
  
  $('.cprof', page).click(showSearchCustomerForm)
  $('.sfun', page).click(showSearchFunnelForm)
  $('.retail', page).click(showSearchRetailForm)
}


/** Form setup ********************************************************/

function setup_createaccountform ()
{
  var form = $('#formholder .form.createaccountform')
  
  function isValid () {
    return validate(form, [
      { name:'name', pretty:'Name', required:true },
      { name:'email', pretty:'Email address', required:true },
      { name:'company', pretty:'Company', required:true }
    ])
  }
  
  $('.okbutton', form).click(function (ev) {
    ev.preventDefault()
    if(isValid()) newAccount(
      { name: $('[name=name]', form).val(),
        email: $('[name=email]', form).val(),
        company: $('[name=company]', form).val()
      },
      function (ret) {
        if(ret.status != '1') {
          if(ret.error) alert('Error! ' + ret.error)
          else alert('Unspecified error.')
        } else {
          if(ret.error) alert(ret.error)
          else alert('OK!')
          dropPage(true)
        }
      }
    )
  })
}

function setup_customerForm ()
{
  var form = $('#formholder .form.profileform')
  
  var contacts
  var findingcontacts = false
  var foundqueue = []
  
  $('.activecheckbox', form).change(function () {
    $('[name=isActive]').val($(this).prop('checked') ? '1' : '0')
  })
  
  function makeContactSelect (i) {
    if( $('.contactselection'+i, form).length ) return
    
    var sel = $('<select class="input white contactselection">')
    sel.addClass('contactselection'+i)
    sel.change(function () {
      var ci = $(this).val()
      if(ci == '0') {
        $('[name=contactName'+i+']', form).val('')
        $('[name=contactPos'+i+']', form).val('')
        $('[name=contactTel'+i+']', form).val('')
        $('[name=contactEmail'+i+']', form).val('')
        return
      }
      var phone, email
      $.each(contacts[ci].phoneNumbers, function (i, p) {
        phone = p.value
        if(p.pref) return false
      })
      $.each(contacts[ci].emails, function (i, e) {
        email = e.value
        if(e.pref) return false
      })
      $('[name=contactName'+i+']', form).val(contacts[ci].displayName)
      $('[name=contactPos'+i+']', form).val('')
      $('[name=contactTel'+i+']', form).val(phone)
      $('[name=contactEmail'+i+']', form).val(email)
    })
    
    function addselection () {
      if( $('.contactselection'+i, form).length ) return
      $.each(contacts, function (i, c) {
        var opt = $('<option>')
        opt.text(c.displayName)
        opt.val(i)
        sel.append(opt)
      })
      $('.selectcontact'+i, form).after(sel)
    }
    
    if(findingcontacts) {
      foundqueue.push(addselection)
    } else if(!contacts) {
      findingcontacts = true
      navigator.contacts.find(
        ['displayName', 'phoneNumbers', 'emails'],
        function (cons) {
          if(!contacts) {
            contacts = $.map(cons, function (c) {
              if(c.displayName) return c
            })
            contacts.sort(function (a, b) {
              if(a.displayName < b.displayName) return -1
              else if(a.displayName > b.displayName) return 1
              else return 0
            })
            contacts.unshift({displayName:'(click here)'})
          }
          addselection()
          findingcontacts = false
          $.each(foundqueue, function (i, f) { f() })
          setTimeout(updateHeight, 5)
        }
      )
    } else {
      addselection()
      setTimeout(updateHeight, 5)
    }
  }
  
  for(var i=1; i<4; i++) {
    $('.selectcontact'+i, form).click((function (i) {
      return function () {
        makeContactSelect(i)
      }
    })(i))
  }
}

function setup_funnelForm ()
{
  var form = $('#formholder .form.funnelform')
  
  $('.newcustomer', form).click(function () {
    showCustomerForm(undefined, function (seq) {
      window.scrollTo(0, $('[name=custSeq]', form).offset().top)
      setTimeout(function () {
        if(seq !== undefined) $('[name=custSeq]', form).val(seq)
      }, 200)
    })
    window.scrollTo(0,0)
  })
  
  subscribeCustomerProfiles(function (customers) {
    var list = $('[name=custSeq]', form)
    $('> *', list).remove()
    $.each(customers, function (i, c) {
      if(c.isActive == '1') {
        var opt = $('<option>')
        opt.val(c.seq)
        opt.text(c.name)
        list.append(opt)
      }
    })
  })
}

function setup_retailForm ()
{
  var form = $('#formholder .form.retailform')
  
  function update () {
    $('[name=total]', form).val(
      ((parseFloat($('[name=quantity]', form).val()) || 0)
      * (parseFloat($('[name=unitPrice]', form).val()) || 0))
      .toFixed(2)
    )
  }
  $('[name=quantity] , [name=unitPrice]').change(update)
}

function setup_messageForm ()
{
  var form = $('#formholder .form.messageform')
  
  $('.publishcheckbox', form).change(function () {
    $('[name=isPublish]', form).val($(this).prop('checked') ? '1' : '0')
  })
}

function setup_searchCustomerForm ()
{
  var form = $('#formholder .form.searchcustomerform')
  
  function doSearch (title, filter) {
    serverWait()
    getCustomers(function (ret) {
      serverDone()
      if(!ret.auth) {
        onLoggedOut()
        return
      }
      if(ret.status != '1') {
        alert(
          'Failed to get customers from server! Error: '
          + ret.error
        )
      } else {
        var results = $.grep(ret.customers, filter)
        if(!results.length) {
          alert('No results found!')
          return
        }
        
        dropPage(true)
        showSearchResults(
          title,
          [
            { label:'Customer', attr:'name' },
            { label:'Contact', attr:'contactName1' },
            { label:'Number', attr:'contactTel1', width:150 }
          ],
          function (done) {
            serverWait()
            
            setProgressTitle('Saving report...')
            
            var now = new Date()
            var doc = '<!doctype html>\n'
            doc += '<html>\n'
            doc += '<head><title>'
                +  esc(title)
                +  ', generated on ' + esc(now)
                +  '</title>\n'
                +  '<style>* { vertical-align:top }</style>\n'
                +  '</head>\n'
            doc += '<body>'
            doc += '<h1>'+esc(title)+', generated on '+esc(now)+'</h1>'
            doc += '<table border="1" cellspacing="0" cellpadding="5">'
                +  '\n<thead>\n<tr>'
                +  '<td rowspan="2">Customer</td>'
                +  '<td rowspan="2">Active?</td>'
                +  '<td rowspan="2">Address</td>'
                +  '<td rowspan="2">Phone</td>'
                +  '<td rowspan="2">Fax</td>'
                +  '<td colspan="4">Contact Person 1</td>'
                +  '<td colspan="4">Contact Person 2</td>'
                +  '<td colspan="4">Contact Person 3</td>'
                +  '</tr>\n<tr>'
                +  '<td>Name</td>'
                +  '<td>Position</td>'
                +  '<td>Phone</td>'
                +  '<td>Email</td>'
                +  '<td>Name</td>'
                +  '<td>Position</td>'
                +  '<td>Phone</td>'
                +  '<td>Email</td>'
                +  '<td>Name</td>'
                +  '<td>Position</td>'
                +  '<td>Phone</td>'
                +  '<td>Email</td>'
                +  '</tr>\n</thead>\n<tbody>\n'
            
            var i = 0, n = results.length
            function step () {
              getCustomer(results[i].seq, function (ret) {
                if(!ret.auth) {
                  serverDone()
                  onLoggedOut()
                  return
                }
                if(ret.status != '1') {
                  alert(
                    'Failed to get customer from server!'
                    + ' Error: ' + ret.error
                  )
                  serverDone()
                  done(false)
                  return
                }
                
                var c = ret.customer
                doc += '<tr>'
                    +  '<td>'+esc(c.name)+'</td>'
                    +  '<td>'+(c.isActive=='1' ? 'Yes' : 'No')+'</td>'
                    +  '<td>'+esc(c.address)+'</td>'
                    +  '<td>'+esc(c.tel)+'</td>'
                    +  '<td>'+esc(c.fax)+'</td>'
                    +  '<td>'+esc(c.contactName1)+'</td>'
                    +  '<td>'+esc(c.contactPos1)+'</td>'
                    +  '<td>'+esc(c.contactTel1)+'</td>'
                    +  '<td>'+esc(c.contactEmail1)+'</td>'
                    +  '<td>'+esc(c.contactName2)+'</td>'
                    +  '<td>'+esc(c.contactPos2)+'</td>'
                    +  '<td>'+esc(c.contactTel2)+'</td>'
                    +  '<td>'+esc(c.contactEmail2)+'</td>'
                    +  '<td>'+esc(c.contactName2)+'</td>'
                    +  '<td>'+esc(c.contactPos2)+'</td>'
                    +  '<td>'+esc(c.contactTel2)+'</td>'
                    +  '<td>'+esc(c.contactEmail2)+'</td>'
                    +  '</tr>\n'
                    
                i++
                updateProgress(i, n)
                
                if(i<n) step()
                else {
                  doc += '</tbody>\n</table>\n</body>\n</html>\n'
                  serverDone()
                  done(doc)
                }
              })
            }
            step()
          },
          results
        )
      }
    })
  }
  
  $('.criteria', form).val('all')
  
  $('.okbutton', form).click(function (ev) {
    ev.preventDefault()
    switch($('.criteria', form).val()) {
      case 'all': 
        doSearch('All Customers', function () { return true })
        break
      case 'active':
        doSearch(
          'Active Customers',
          function (c) { return c.isActive == '1' }
        )
        break
      case 'inactive':
        doSearch(
          'Inactive Customers',
          function (c) { return c.isActive == '0' }
        )
        break
    }
  })
}

function setup_searchFunnelForm ()
{
  var form = $('#formholder .form.searchfunnelform')
  
  function setCrit (c) {
    $('.crit', form).hide()
    $('.crit.by'+c, form).show()
  }
  
  function doSearch (title, filter) {
    serverWait()
    getFunnels(function (ret) {
      serverDone()
      if(!ret.auth) {
        onLoggedOut()
        return
      }
      if(ret.status != '1') {
        alert(
          'Failed to get forecasts from server! Error: '
          + ret.error
        )
      } else {
        var results = $.grep(ret.sales, filter)
        if(!results.length) {
          alert('No results found!')
          return
        }
        
        dropPage(true)
        showSearchResults(
          title,
          [
            { label:'Project', attr:'projectName' },
            { label:'Date', attr:'startDate', width:155,
              format:function (v) {
                var d = str2date(v)
                return '' + d.getUTCDate() + ' '
                       + shortMonths[d.getUTCMonth()]
                       + ', ' + d.getUTCFullYear()
              }
            },
            { label:'Value', attr:'figure', width:150,
              format:function (v) {
                return parseFloat(v).toFixed(2)
              }
            }
          ],
          function (done) {
            serverWait()
            
            setProgressTitle('Saving report...')
            
            var now = new Date()
            var doc = ''
            doc += '<!doctype html>\n'
            doc += '<html>\n'
            doc += '<head><title>'
                +  esc(title) + ', generated on ' + esc(now)
                +  '</title></head>'
            doc += '<body>'
                +  '<h1>'+esc(title)+', generated on '+esc(now)+'</h1>'
            doc += '<table border="1" cellspacing="0" cellpadding="5">\n<thead>\n<tr>'
                +  '<td>Case No.</td>'
                +  '<td>Project</td>'
                +  '<td>Status</td>'
                +  '<td>Value</td>'
                +  '<td>Start Date</td>'
                +  '<td>Close Date</td>'
                +  '<td>Lead Time</td>'
                +  '<td>Customer</td>'
                +  '<td>Product Info</td>'
                +  '<td>Comments</td>'
                +  '</tr>\n</thead>\n<tbody>\n'
            
            var i = 0, n = results.length
            function step () {
              getFunnel(results[i].seq, function (ret) {
                if(!ret.auth) {
                  serverDone()
                  onLoggedOut()
                  return
                }
                if(ret.status != '1') {
                  alert(
                    'Failed to get forecast from server!'
                    + ' Error: ' + ret.error
                  )
                  serverDone()
                  done(false)
                  return
                }
                
                var f = ret.sales
                var sd = str2date(f.startDate)
                var cd = str2date(f.closeDate)
                doc += '<tr>'
                    +  '<td>'+esc(f.caseNo)+'</td>'
                    +  '<td>'+esc(f.projectName)+'</td>'
                    +  '<td>'+esc(typeof f.status == 'object' ? f.status.status : f.status)+'</td>'
                    +  '<td>RM' + esc(parseFloat(f.figure).toFixed(2))
                       + '</td>'
                    + '<td>'
                      + sd.getUTCDate() + ' '
                      + shortMonths[sd.getUTCMonth()] + ', '
                      + sd.getUTCFullYear()
                      + '</td>'
                    + '<td>'
                      + cd.getUTCDate() + ' '
                      + shortMonths[cd.getUTCMonth()] + ', '
                      + cd.getUTCFullYear()
                      + '</td>'
                    //+  '<td>'+esc(f.startDate.split(' ')[0])+'</td>'
                    //+  '<td>'+esc(f.closeDate.split(' ')[0])+'</td>'
                    +  '<td>'+esc(f.leadTime)+' days</td>'
                    +  '<td>'+esc(f.customer.name)+'</td>'
                    +  '<td>'+esc(f.productInfo)+'</td>'
                    +  '<td>'+esc(f.comments)+'</td>'
                    +  '</tr>\n'
                
                i++
                updateProgress(i, n)
                
                if(i<n) step()
                else {
                  doc += '</tbody>\n</table>\n</body>\n</html>\n'
                  serverDone()
                  done(doc)
                }
              })
            }
            
            step()
          },
          results
        )
      }
    })
  }
  
  setCrit('all')
  setTimeout(function () {
    setDateField($('.datefield', form), (new Date()).getTime()/1000)
  }, 1)
  
  subscribeSalesPersons(function (persons) {
    $('[name=salesperson] option', form).remove()
    var select = $('[name=salesperson]', form)
    persons.sort(function (a, b) { return a.name < b.name })
    $(persons).each(function (i, p) {
      select.append( $('<option>').val(p.name).text(p.name) )
    })
  })
  
  $('.criteria', form).change(function () { setCrit($(this).val()) })
  
  $('.crit.byall .okbutton', form).click(function (ev) {
    ev.preventDefault()
    doSearch('All Projects', function () { return true })
  })
  
  $('.crit.bymonth .okbutton', form).click(function (ev) {
    ev.preventDefault()
    var month = str2date($('.crit.bymonth [name=month]',form).val())
    var fil_y = month.getUTCFullYear()
    var fil_m = month.getUTCMonth()
    doSearch('By Month', function (fun) {
      var sd = str2date(fun.startDate)
      return ( sd.getUTCFullYear() == fil_y
             && sd.getUTCMonth() == fil_m)
    })
  })
  
  $('.crit.bypname .okbutton', form).click(function (ev) {
    ev.preventDefault()
    function isValid () {
      return validate($('.crit.bypname', form), [
        { name:'projectName', pretty:'Project name', required:true }
      ])
    }
    
    if(isValid()) {
      var name = $('.crit.bypname [name=projectname]',form).val()
      var nameLower = name.toLowerCase()
      doSearch('By Project Name', function (fun) {
        return fun.projectName.toLowerCase().indexOf(nameLower) >= 0
      })
    }
  })
  
  $('.crit.bysalesperson .okbutton', form).click(function (ev) {
    ev.preventDefault()
    function isValid () {
      return validate($('.crit.bysalesperson', form), [
        { name:'salesperson', pretty:'Sales person', required:true }
      ])
    }
    
    if(isValid()) {
      var name = $('.crit.bysalesperson [name=salesperson]',form).val()
      var nameLower = name.toLowerCase()
      doSearch('By Salesperson', function (fun) {
        if(typeof fun.user == 'object') {
          return fun.user.name.toLowerCase() == nameLower
        } else {
          return fun.user.toLowerCase() == nameLower
        }
      })
    }
  })
  
  $('.crit.bypvalue .okbutton', form).click(function (ev) {
    ev.preventDefault()
    var minimum = $('.crit.bypvalue [name=minimum]',form).val()
    var maximum = $('.crit.bypvalue [name=maximum]',form).val()
    var mn = parseFloat(minimum) || 0
    var mx = parseFloat(maximum) || 0
    doSearch('By Salesperson', function (fun) {
      var val = parseFloat(fun.figure)
      return val >= mn && val <= mx
    })
  })
}

function setup_searchRetailForm ()
{
  var form = $('#formholder .form.searchretailform')
  
  function doSearch (title, date, filter) {
    serverWait()
    getRetails(
      date.getTime()/1000,
      function (ret) {
        serverDone()
        if(!ret.auth) {
          onLoggedOut()
          return
        }
        if(ret.status != '1') {
          alert(
            'Failed to get transactions from server! Error: '
            + ret.error
          )
        } else {
          var results = $.grep(ret.retails, filter)
          if(!results.length) {
            alert('No results found!')
            return
          }
          
          dropPage(true)
          showSearchResults(
            title,
            [
              { label:'Date', attr:'salesDate', width:155,
                format:function (v) {
                  var d = str2date(v)
                  return '' + d.getUTCDate() + ' '
                         + shortMonths[d.getUTCMonth()]
                         + ', ' + d.getUTCFullYear()
                }
              },
              { label:'Value', attr:'total', width:150,
                format:function (v) {
                  return parseFloat(v).toFixed(2)
                }
              },
              { label:'Product', attr:'product' }
            ],
            function (done) {
              serverWait()
              
              setProgressTitle('Saving report...')
              
              var now = new Date()
              var doc = ''
              doc += '<!doctype html>\n'
              doc += '<html>\n'
              doc += '<head><title>'
                  +  esc(title) + ', generated on ' + esc(now)
                  +  '</title></head>'
              doc += '<body>'
                  +  '<h1>'+esc(title)+', generated on '+esc(now)+'</h1>'
              doc += '<table border="1" cellspacing="0" cellpadding="5">\n<thead>\n<tr>'
                  +  '<td>Sales Date</td>'
                  +  '<td>Product Name</td>'
                  +  '<td>Contact No.</td>'
                  +  '<td>Payment Type</td>'
                  +  '<td>Quantity</td>'
                  +  '<td>Unit Price</td>'
                  +  '<td>Total</td>'
                  +  '<td>Remarks</td>'
                  +  '</tr>\n</thead>\n<tbody>\n'
              
              var i = 0, n = results.length
              function step () {
                getRetail(results[i].seq, function (ret) {
                  if(!ret.auth) {
                    serverDone()
                    onLoggedOut()
                    return
                  }
                  if(ret.status != '1') {
                    alert(
                      'Failed to get transaction from server!'
                      + ' Error: ' + ret.error
                    )
                    serverDone()
                    done(false)
                    return
                  }
                  
                  var r = ret.retail
                  var sd = str2date(r.salesDate)
                  doc += '<tr>'
                      +  '<td>'
                         + sd.getUTCDate() + ' '
                         + shortMonths[sd.getUTCMonth()] + ', '
                         + sd.getUTCFullYear()
                         + '</td>'
                      +  '<td>'+esc(r.product)+'</td>'
                      +  '<td>'+esc(r.contactNo)+'</td>'
                      +  '<td>'+esc(r.paymentType)+'</td>'
                      +  '<td>'+esc(r.quantity)+'</td>'
                      +  '<td>RM'
                         + esc((parseFloat(r.unitPrice)||0).toFixed(2))
                         + '</td>'
                      +  '<td>RM'
                         + esc((parseFloat(r.total) || 0).toFixed(2))
                         + '</td>'
                      +  '<td>'+esc(r.remarks)+'</td>'
                      +  '</tr>\n'
                  
                  i++
                  updateProgress(i, n)
                  
                  if(i<n) step()
                  else {
                    doc += '</tbody>\n</table>\n</body>\n</html>\n'
                    serverDone()
                    done(doc)
                  }
                })
              }
              step()
            },
            results
          )
        }
      }
    )
  }
  
  setTimeout(function () {
    setDateField($('.datefield', form), (new Date()).getTime()/1000)
  }, 1)
  
  $('.okbutton', form).click(function (ev) {
    ev.preventDefault()
    var d = str2date($('[name=month]', form).val())
    var month = d.getUTCMonth()
    var year = d.getUTCFullYear()
    doSearch('Transactions by Month', d, function (r) {
      var sd = str2date(r.salesDate)
      return ( sd.getUTCFullYear() == year
             && sd.getUTCMonth() == month)
    })
  })
}


/** Page display ******************************************************/

function showCustomerProfileList () {
  serverWait()
  getCustomers(function (ret) {
    serverDone()
    if(!ret.auth) {
      onLoggedOut()
      return
    }
    if(ret.status == '1') {
      pushPage('profileslistpage')
    } else {
      alert(
        'Failed to get customers from server! Error: '
        + ret.error
      )
    }
  })
}

function showSalesFunnelList () {
  serverWait()
  getFunnels(function (ret) {
    serverDone()
    if(!ret.auth) {
      onLoggedOut()
      return
    }
    if(ret.status == '1') {
      pushPage('funnelslistpage')
    } else {
      alert(
        'Failed to get forecasts from server! Error: '
        + ret.error
      )
    }
  })
}

function showRetailList () {
  serverWait()
  getRetails(
    str2date($('.page.retailslistpage .retfilter').val())
    .getTime()/1000,
    function (ret) {
      serverDone()
      if(!ret.auth) {
        onLoggedOut()
        return
      }
      if(ret.status == '1') {
        pushPage('retailslistpage')
      } else {
        alert(
          'Failed to get transactions from server! Error: '
          + ret.error
        )
      }
    }
  )
}

function showMessageList ()
{
  serverWait()
  getMessages(function (ret) {
    serverDone()
    if(!ret.auth) {
      onLoggedOut()
      return
    }
    if(ret.status == '1') {
      pushPage('messageslistpage')
    } else {
      alert(
        'Failed to get messages from server! Error: '
        + ret.error
      )
    }
  })
}

function showSearchPage ()
{
  pushPage('searchpage')
}

function showCustomerProfile (prof)
{
  var page = $('.page.profiledetailspage')
  
  $('.editbutton', page)
  .unbind('click')
  .click(function () { showCustomerForm(prof) })
  
  $('.deletebutton', page)
  .unbind('click')
  .click(function () {
    navigator.notification.confirm(
      'Really delete this customer?',
      function (b) {
        if(b!=1) return
        serverWait()
        deleteCustomer(prof.seq, function (ret) {
          serverDone()
          if(!ret.auth) {
            onLoggedOut()
            return
          }
          if(ret.status == '1') {
            dropPage()
          } else {
            alert(
              'Failed to delete customer! Error: '
              + ret.error
            )
          }
        })
      }
    )
  })
  
  $('.cname', page).text(prof.name)
  $('.caddress', page).text(prof.address)
  if(prof.tel != '') {
    $('.ctel', page).text(prof.tel)
    $('.ctel', page).show()
    $('.ctellink', page)
    .attr('href', 'tel:'+prof.tel)
    .parent().parent().show()
  } else {
    $('.ctel', page).hide()
    $('.ctellink', page).parent().hide()
  }
  if(prof.fax) {
    $('.cfax', page)
    .text(prof.fax)
    .show()
  } else {
    $('.cfax', page).hide()
  }
  if(prof.isActive == '1') $('.cactive', page).text('Active')
  else $('.cactive', page).text('Inactive')
  
  $('.contactselection', page).remove()
  
  for(var i=1; i<4; i++) {
    if(!(prof['contactName'+i] || prof['contactPos'+i])) {
      $('.contact'+i, page).hide()
    } else {
      $('.contact'+i, page).show()
      
      $('.cname'+i, page).text(prof['contactName'+i])
      $('.cpos'+i, page).text(prof['contactPos'+i])
      if(prof['contactTel'+i]) {
        $('.ctel'+i, page).text(prof['contactTel'+i])
        $('.ctel'+i+'link', page)
        .attr('href', 'tel:'+prof['contactTel'+i])
        .parent().parent().show()
      } else $('.ctel'+i+'link', page).parent().parent().hide()
      if(prof['contactEmail'+i]) {
        $('.cemail'+i, page).text(prof['contactEmail'+i])
        $('.cemail'+i+'link', page)
        .attr('href', 'mailto:'+prof['contactEmail'+i])
        .parent().parent().show()
      } else $('.cemail'+i+'link', page).parent().parent().hide()
    }
  }
  
  pushPage(page)
}

function showSalesFunnel (fun)
{
  var page = $('.page.funneldetailspage')
  
  $('.editbutton', page)
  .unbind('click')
  .click(function () { showFunnelForm(fun) })
  
  $('.deletebutton', page)
  .unbind('click')
  .click(function () {
    navigator.notification.confirm(
      'Really delete this forecast?',
      function (b) {
        if(b!=1) return
        serverWait()
        deleteFunnel(fun.seq, function (ret) {
          serverDone()
          if(!ret.auth) {
            onLoggedOut()
            return
          }
          if(ret.status == '1') {
            dropPage()
          } else {
            alert(
              'Failed to delete forecast! Error: '
              + ret.error
            )
          }
        })
      }
    )
  })
  
  $('.sprojname', page).text(fun.projectName)
  $('.scaseno', page).text(fun.caseNo)
  if(typeof fun.status == 'object') {
    $('.sstatus', page).text(fun.status.status)
  } else {
    $('.sstatus', page).text(fun.status)
  }
  $('.sfig', page).text(parseFloat(fun.figure).toFixed(2))
  $('.screator', page).text(fun.user.name)
  $('.scust', page).text(fun.customer.name)
  $('.sprod', page).text(fun.productInfo)
  $('.scomment', page).text(fun.comments)
  $('.slead', page).text(fun.leadTime)
  
  var sdate = str2date(fun.startDate)
  $('.ssdate', page).text(
    sdate.getUTCDate() + ' ' + shortMonths[sdate.getUTCMonth()]
    + ', ' + sdate.getUTCFullYear()
  )
  
  pushPage(page)
}

function showRetail (retail)
{
  var page = $('.page.retaildetailspage')
  
  $('.editbutton', page)
  .unbind('click')
  .click(function () { showRetailForm(retail) })
  
  $('.deletebutton', page)
  .unbind('click')
  .click(function () {
    navigator.notification.confirm(
      'Really delete this transaction?',
      function (b) {
        if(b!=1) return
        serverWait()
        deleteRetail(retail.seq, function (ret) {
          serverDone()
          if(!ret.auth) {
            onLoggedOut()
            return
          }
          if(ret.status == '1') {
            dropPage()
          } else {
            alert(
              'Failed to delete transaction! Error: '
              + ret.error
            )
          }
        })
      }
    )
  })
  
  var sdate = str2date(retail.salesDate)
  $('.rsalesdate', page).text(
    sdate.getUTCDate() + ' ' + shortMonths[sdate.getUTCMonth()]
    + ', ' + sdate.getUTCFullYear()
  )
  
  $('.rproduct', page).text(retail.product)
  $('.rquantity', page).text(retail.quantity)
  $('.runitprice', page).text(parseFloat(retail.unitPrice).toFixed(2))
  $('.rtotal', page).text(retail.total.toFixed(2))
  $('.rptype', page).text(retail.paymentType)
  if(retail.contactNo != '') {
    $('.rcontact', page).text(retail.contactNo)
    $('.rcontactlink', page).attr('href', 'tel:'+retail.contactNo)
    .parent().parent().parent().show()
  } else {
    $('.rcontact', page).parent().parent().parent().hide()
  }
  $('.rremarks', page).text(retail.remarks)
  
  pushPage(page)
}

function showMessage (msg)
{
  var page = $('.page.messagedetailspage')
  
  $('.editbutton', page)
  .unbind('click')
  .click(function () { showMessageForm(msg) })
  
  $('.deletebutton', page)
  .unbind('click')
  .click(function () {
    navigator.notification.confirm(
      'Really delete this message?',
      function (b) {
        if(b!=1) return
        serverWait()
        deleteMessage(msg.seq, function (ret) {
          serverDone()
          if(!ret.auth) {
            onLoggedOut()
            return
          }
          if(ret.status == '1') {
            dropPage()
            getActiveMessages(function (ret) {
              if(!ret.auth) {
                onLoggedOut()
                return
              }
              if(ret.status != '1') alert(
                'Failed to get messages from server! Error: '
                + ret.error
              )
            })
          } else {
            alert(
              'Failed to delete message! Error: '
              + ret.error
            )
          }
        })
      }
    )
  })
  
  $('.atitle', page).text(msg.title)
  $('.acontent', page).text(msg.content)
  $('.apublished', page).text(
    msg.isPublish == '1' ? 'Published' : 'Unpublished'
  )
  
  var sdate = str2date(msg.startDate)
  $('.astart', page).text(
    sdate.getUTCDate() + ' ' + shortMonths[sdate.getUTCMonth()]
    + ', ' + sdate.getUTCFullYear()
  )
  
  var edate = str2date(msg.endDate)
  $('.aend', page).text(
    edate.getUTCDate() + ' ' + shortMonths[edate.getUTCMonth()]
    + ', ' + edate.getUTCFullYear()
  )
  
  pushPage(page)
}

function showSearchResults (title, fields, saveFunc, items)
{
  var page = $('.page.searchresultspage')
  
  $('.list tr', page).remove()
  
  $('.pagetitle', page).text(title)
  
  var headrow = $('<tr>')
  $.each(fields, function (i, f) {
    if(i >= 2 && !isTablet) return false
    var td = $('<td>').text(f.label)
    if(typeof f.width != 'undefined') td.css(
      'min-width',
      ''+f.width+'px'
    )
    headrow.append(td)
  })
  $('.list thead', page).append(headrow)
  
  $.each(items, function (i, item) {
    var tr = $('<tr>')
    $.each(fields, function (i, f) {
      if(i >= 2 && !isTablet) return false
      var td = $('<td>')
      if(f.format) td.text(f.format(item[f.attr]))
      else td.text(item[f.attr])
      tr.append(td)
    })
    $('.list tbody', page).append(tr)
  })
  
  setTimeout(
    function () { $('.list', page).data('iscroll').refresh() }, 1
  )
  
  $('.save', page)
  .unbind('click')
  .click(function (ev) {
    ev.preventDefault()
    showProgress()
    saveFunc(function (html) {
      if(html === false) {
        alert('Failed to save report!')
      } else {
        alert(
          'sendmail():'
          + title + ';'
          + html
        )
      }
      hideProgress()
    })
  })
  
  pushPage('searchresultspage')
}

function showPreferences (profile)
{
  var page = $('.page.preferencespage')
  
  $('.name', page).text(profile.name)
  $('.email', page).text(profile.email)
  $('.mobile', page).text(profile.mobileNo)
  
  $('.editbutton', page)
  .unbind('click')
  .click(function () { showProfileEditForm(profile) })
  
  $('.pwdbutton', page)
  .unbind('click')
  .click(function () { showPasswordEditForm(profile) })
  
  pushPage(page)
}


/** Form display ******************************************************/

function showCustomerForm (prof, callback)
/*
 * Callback is optional and will be passed the seq of newly created
 * customer if any. prof should be undefined if callback is intended. 
 */
{
  var form = $('#formholder .form.profileform')
  
  function isValid () {
    return validate(form, [
      { name:'name', pretty:'Name', required:true }
    ])
  }
  
  for(var i=1; i<4; i++) $('.contactselection'+i).remove()
  
  if(!prof) {
    $('.pagetitle', form).text('+ Create Customer')
    $('[name=name]', form).val('')
    $('[name=address]', form).val('')
    $('[name=tel]', form).val('')
    $('[name=fax]', form).val('')
    for(var i=1; i<4; i++) {
      $('[name=contactName'+i+']', form).val('')
      $('[name=contactPos'+i+']', form).val('')
      $('[name=contactTel'+i+']', form).val('')
      $('[name=contactEmail'+i+']', form).val('')
    }
    $('[name=isActive]', form).val('1')
    $('.activecheckbox', form).prop('checked', true)
    
    $('.okbutton', form)
    .unbind('click')
    .click(function (ev) {
      ev.preventDefault()
      if(isValid()) {
        serverWait()
        createCustomer(
          {
            name: $('[name=name]', form).val(),
            address: $('[name=address]', form).val(),
            tel: $('[name=tel]', form).val(),
            fax: $('[name=fax]', form).val(),
            isActive: $('[name=isActive]', form).val(),
            contactName1: $('[name=contactName1]', form).val(),
            contactPos1: $('[name=contactPos1]', form).val(),
            contactTel1: $('[name=contactTel1]', form).val(),
            contactEmail1: $('[name=contactEmail1]', form).val(),
            contactName2: $('[name=contactName2]', form).val(),
            contactPos2: $('[name=contactPos2]', form).val(),
            contactTel2: $('[name=contactTel2]', form).val(),
            contactEmail2: $('[name=contactEmail2]', form).val(),
            contactName3: $('[name=contactName3]', form).val(),
            contactPos3: $('[name=contactPos3]', form).val(),
            contactTel3: $('[name=contactTel3]', form).val(),
            contactEmail3: $('[name=contactEmail3]', form).val()
          },
          function (ret) {
            serverDone()
            if(!ret.auth) {
              onLoggedOut()
              return
            }
            if(ret.status == '1') {
              dropPage(true)
              if(callback) callback(ret.seq)
            } else {
              alert(
                'Failed to create customer! Error: '
                + ret.error
              )
              if(callback) callback()
            }
          }
        )
      }
    })
  } else {
    $('.pagetitle', form).text('Edit Customer')
    $('[name=name]', form).val(prof.name)
    $('[name=address]', form).val(prof.address)
    $('[name=tel]', form).val(prof.tel)
    $('[name=fax]', form).val(prof.fax)
    for(var i=1; i<4; i++) {
      $('[name=contactName'+i+']', form).val(prof['contactName'+i])
      $('[name=contactPos'+i+']', form).val(prof['contactPos'+i])
      $('[name=contactTel'+i+']', form).val(prof['contactTel'+i])
      $('[name=contactEmail'+i+']', form).val(prof['contactEmail'+i])
    }
    $('[name=isActive]', form).val(prof.isActive)
    $('.activecheckbox', form).prop('checked', prof.isActive == '1')
    
    $('.okbutton', form)
    .unbind('click')
    .click(function (ev) {
      ev.preventDefault()
      if(isValid()) {
        serverWait()
        updateCustomer(
          {
            seq: prof.seq,
            name: $('[name=name]', form).val(),
            address: $('[name=address]', form).val(),
            tel: $('[name=tel]', form).val(),
            fax: $('[name=fax]', form).val(),
            isActive: $('[name=isActive]', form).val(),
            contactName1: $('[name=contactName1]', form).val(),
            contactPos1: $('[name=contactPos1]', form).val(),
            contactTel1: $('[name=contactTel1]', form).val(),
            contactEmail1: $('[name=contactEmail1]', form).val(),
            contactName2: $('[name=contactName2]', form).val(),
            contactPos2: $('[name=contactPos2]', form).val(),
            contactTel2: $('[name=contactTel2]', form).val(),
            contactEmail2: $('[name=contactEmail2]', form).val(),
            contactName3: $('[name=contactName3]', form).val(),
            contactPos3: $('[name=contactPos3]', form).val(),
            contactTel3: $('[name=contactTel3]', form).val(),
            contactEmail3: $('[name=contactEmail3]', form).val()
          },
          function (ret) {
            serverDone()
            if(!ret.auth) {
              onLoggedOut()
              return
            }
            if(ret.status == '1') {
              serverWait()
              getCustomer(prof.seq, function (ret) {
                serverDone()
                if(!ret.auth) {
                  onLoggedOut()
                  return
                }
                if(ret.status == '1') {
                  dropPage(true)
                  dropPage()
                  showCustomerProfile(ret.customer)
                } else {
                  alert(
                    'Error: ' + ret.error
                  )
                }
              })
            } else {
              alert(
                'Failed to update customer! Error: '
                + ret.error
              )
            }
          }
        )
      }
    })
  }
  
  showForm(form)
}

function showFunnelForm (fun)
{
  var form = $('#formholder .form.funnelform')
  
  function isValid () {
    return validate(form, [
      { name:'projectName', pretty:'Project name', required:true },
      { name:'leadTime', pretty:'Lead time', required:true },
      { name:'figure', pretty:'Figure', required:true },
      { name:'custSeq', pretty:'Customer', required:true }
    ])
  }
  
  serverWait()
  getCustomers(function (ret) {
    serverDone()
    if(!ret.auth) {
      onLoggedOut()
      return
    }
    if(ret.status != '1') {
      alert(
        'Failed to get customers from server! Error: '
        + ret.error
      )
    }
  })
  
  if(!fun) {
    $('.datefield.startdate select', form)
    .add('[name=leadTime]', form)
    .removeAttr('disabled')
    
    var now = (new Date()).getTime()/1000
    $('.pagetitle', form).text('+ Create Forecast')
    $('.caseno', form).text('(unassigned)')
    $('[name=projectName]', form).val('')
    $('[name=figure]', form).val('')
    $('[name=status]', form).val('Open')
    setRadioChoice($('.radio', form), 0)
    setTimeout(function () {
      setDateField($('.datefield.startdate', form), now)
    }, 1)
    $('[name=leadTime]', form).val('')
    $('[name=productInfo]', form).val('')
    $('[name=comments]', form).val('')
    $('[name=custSeq]', form).val('')
    $('.list tr', form).removeClass('selection')
    
    $('.okbutton', form)
    .unbind('click')
    .click(function (ev) {
      ev.preventDefault()
      if(isValid()) {
        if($('[name=custSeq]', form).val() == '') {
          alert('Please select a customer!')
          return
        }
        serverWait()
        createFunnel(
          {
            projectName: $('[name=projectName]', form).val(),
            leadTime: $('[name=leadTime]', form).val(),
            startDate: $('[name=startDate]', form).val(),
            figure: $('[name=figure]', form).val(),
            productInfo: $('[name=productInfo]', form).val(),
            comments: $('[name=comments]', form).val(),
            status: $('[name=status]', form).val(),
            custSeq: $('[name=custSeq]', form).val(),
            custName: $(
              '[name=custSeq] [value='
              + $('[name=custSeq]', form).val()
              + ']',
              form ).text()
          },
          function (ret) {
            serverDone()
            if(!ret.auth) {
              onLoggedOut()
              return
            }
            if(ret.status == '1') {
              dropPage(true)
            } else {
              alert(
                'Failed to create forecast! Error: '
                + ret.error
              )
            }
          }
        )
      }
    })
  } else {
    if(isManager()) {
      $('.datefield.startdate select', form)
      .add('[name=leadTime]', form)
      .attr('disabled', 'disabled')
    } else {
      $('.datefield.startdate select', form)
      .add('[name=leadTime]', form)
      .removeAttr('disabled')
    }
    
    $('.pagetitle', form).text('Edit Forecast')
    $('.caseno', form).text(fun.caseNo)
    $('[name=projectName]', form).val(fun.projectName)
    $('[name=figure]', form).val(fun.figure)
    if(typeof fun.status == 'object') {
      $('[name=status]', form).val(fun.status.status)
    } else {
      $('[name=status]', form).val(fun.status)
    }
    switch(fun.status) {
      case 'O': setRadioChoice($('.radio', form), 0); break
      case 'C': setRadioChoice($('.radio', form), 1); break
      case 'K': setRadioChoice($('.radio', form), 2); break
      case 'L': setRadioChoice($('.radio', form), 3); break
    }
    var sd = str2date(fun.startDate).getTime()/1000
    setTimeout(function () {
      setDateField($('.datefield.startdate', form), sd)
    }, 1)
    $('[name=leadTime]', form).val(fun.leadTime)
    $('[name=productInfo]', form).val(fun.productInfo)
    $('[name=comments]', form).val(fun.comments)
    //$('[name=custSeq]', form).val(fun.customer.seq)
    $('[name=custSeq] option', form).each(function (i, opt) {
      if($(opt).text() == fun.customer.name) {
        $('[name=custSeq]', form).val($(opt).val())
        return false
      }
    })
    $('.list tr', form).removeClass('selection')
    
    $('.okbutton', form)
    .unbind('click')
    .click(function (ev) {
      ev.preventDefault()
      if(isValid()) {
        serverWait()
        updateFunnel(
          {
            seq: fun.seq,
            projectName: $('[name=projectName]', form).val(),
            leadTime: $('[name=leadTime]', form).val(),
            startDate: $('[name=startDate]', form).val(),
            figure: $('[name=figure]', form).val(),
            productInfo: $('[name=productInfo]', form).val(),
            comments: $('[name=comments]', form).val(),
            status: $('[name=status]', form).val(),
            custSeq: $('[name=custSeq]', form).val(),
            custName: $(
              '[name=custSeq] [value='
              + $('[name=custSeq]', form).val()
              + ']',
              form ).text()
          },
          function (ret) {
            serverDone()
            if(!ret.auth) {
              onLoggedOut()
              return
            }
            if(ret.status == '1') {
              getFunnel(fun.seq, function (ret) {
                if(!ret.auth) {
                  onLoggedOut()
                  return
                }
                if(ret.status == '1') {
                  dropPage(true)
                  dropPage()
                  showSalesFunnel(ret.sales)
                } else {
                  alert('Error: ' + ret.error)
                }
              })
            } else {
              alert(
                'Failed to update forecast! Error: '
                + ret.error
              )
            }
          }
        )
      }
    })
  }
  
  showForm(form)
}

function showRetailForm (r)
{
  var form = $('#formholder .form.retailform')
  
  function isValid () {
    return validate(form, [
      { name:'product', pretty:'Product name', required:true },
      { name:'quantity', pretty:'Quantity', required:true },
      { name:'unitPrice', pretty:'Unit price', required:true }
    ])
  }
  
  function updateTotal () {
    /* Keep updating total value even if user has not moved on to next
     * field i.e. before getting 'change' event.
     */
    if($('#formholder .form.on').last().hasClass('retailform')) {
      $('[name=total]', form).val(
        ((parseFloat($('[name=quantity]', form).val()) || 0)
        * (parseFloat($('[name=unitPrice]', form).val()) || 0))
        .toFixed(2)
      )
      setTimeout(updateTotal, 100)
    }
  }
  
  if(!r) {
    var now = (new Date()).getTime()/1000
    $('.pagetitle', form).text('+ Create Transaction')
    setTimeout(function () {
      setDateField($('.datefield.salesdate', form), now)
    }, 1)
    $('[name=product]', form).val('')
    $('[name=quantity]', form).val('')
    $('[name=unitPrice]', form).val('')
    $('[name=total]', form).val('')
    $('[name=paymentType]', form).val('Cash')
    $('[name=contactNo]', form).val('')
    $('[name=remarks]', form).val('')
    
    $('.okbutton', form)
    .unbind('click')
    .click(function (ev) {
      ev.preventDefault()
      if(isValid()) {
        serverWait()
        createRetail(
          {
            salesDate: $('[name=salesDate]', form).val(),
            product: $('[name=product]', form).val(),
            contactNo: $('[name=contactNo]', form).val(),
            paymentType: $('[name=paymentType]', form).val(),
            quantity: $('[name=quantity]', form).val(),
            unitPrice: $('[name=unitPrice]', form).val(),
            remarks: $('[name=remarks]', form).val()
          },
          function (ret) {
            serverDone()
            if(!ret.auth) {
              onLoggedOut()
              return
            }
            if(ret.status == '1') {
              dropPage(true)
            } else {
              alert(
                'Failed to create transaction! Error: '
                + ret.error
              )
            }
          }
        )
      }
    })
  } else {
    $('.pagetitle', form).text('Edit Transaction')
    var sd = str2date(r.salesDate).getTime()/1000
    setTimeout(function () {
      setDateField($('.datefield.salesdate', form), sd)
    }, 1)
    $('[name=product]', form).val(r.product)
    $('[name=quantity]', form).val(r.quantity)
    $('[name=unitPrice]', form).val(r.unitPrice)
    $('[name=total]', form).val(r.total.toFixed(2))
    $('[name=paymentType]', form).val(r.paymentType)
    $('[name=contactNo]', form).val(r.contactNo)
    $('[name=remarks]', form).val(r.remarks)
    
    $('.okbutton', form)
    .unbind('click')
    .click(function (ev) {
      ev.preventDefault()
      if(isValid()) {
        serverWait()
        updateRetail(
          {
            seq: r.seq,
            salesDate: $('[name=salesDate]', form).val(),
            product: $('[name=product]', form).val(),
            contactNo: $('[name=contactNo]', form).val(),
            paymentType: $('[name=paymentType]', form).val(),
            quantity: $('[name=quantity]', form).val(),
            unitPrice: $('[name=unitPrice]', form).val(),
            remarks: $('[name=remarks]', form).val()
          },
          function (ret) {
            serverDone()
            if(!ret.auth) {
              onLoggedOut()
              return
            }
            if(ret.status == '1') {
              serverWait()
              getRetail(r.seq, function (ret) {
                serverDone()
                if(!ret.auth) {
                  onLoggedOut()
                  return
                }
                if(ret.status == '1') {
                  dropPage(true)
                  dropPage()
                  showRetail(ret.retail)
                } else {
                  alert(
                    'Error: '
                    + ret.error
                  )
                }
              })
            } else {
              alert(
                'Failed to update transaction! Error: '
                + ret.error
              )
            }
          }
        )
      }
    })
  }
  
  showForm(form)
  setTimeout(updateTotal, 100)
}

function showMessageForm (m)
{
  var form = $('#formholder .form.messageform')
  
  function isValid () {
    return validate(form, [
      { name:'title', pretty:'Title', required:true }
    ])
  }
  
  if(!m) {
    var now = (new Date()).getTime()/1000
    $('.pagetitle', form).text('+ Create News')
    $('[name=title]', form).val('')
    $('[name=content]', form).val('')
    $('[name=isPublish]', form).val('1')
    $('.publishcheckbox', form).prop('checked', true)
    setRadioChoice($('.radio', form), 0)
    setTimeout(function () {
      setDateField($('.datefield.startdate', form), now)
      setDateField($('.datefield.enddate', form), now+24*60*60)
    }, 1)
    
    $('.okbutton', form)
    .unbind('click')
    .click(function (ev) {
      ev.preventDefault()
      if(isValid()) {
        serverWait()
        createMessage(
          {
            title: $('[name=title]', form).val(),
            content: $('[name=content]', form).val(),
            isPublish: $('[name=isPublish]', form).val(),
            startDate: $('[name=startDate]', form).val(),
            endDate: $('[name=endDate]', form).val()
          },
          function (ret) {
            serverDone()
            if(!ret.auth) {
              onLoggedOut()
              return
            }
            if(ret.status == '1') {
              dropPage(true)
              getActiveMessages(function (ret) {
                if(!ret.auth) {
                  onLoggedOut()
                  return
                }
                if(ret.status != '1') alert(
                  'Failed to get messages from server! Error: '
                  + ret.error
                )
              })
            } else {
              alert(
                'Failed to create message! Error: '
                + ret.error
              )
            }
          }
        )
      }
    })
  } else {
    $('.pagetitle', form).text('Edit News')
    $('[name=title]', form).val(m.title)
    $('[name=content]', form).val(m.content)
    $('[name=isPublish]', form).val(m.isPublish)
    $('.publishcheckbox', form).prop('checked', m.isPublish == '1')
    var sd = str2date(m.startDate).getTime()/1000
    var ed = str2date(m.endDate).getTime()/1000
    setTimeout(function () {
      setDateField($('.datefield.startdate', form), parseInt(sd))
      setDateField($('.datefield.enddate', form), ed)
    }, 1)
    
    $('.okbutton', form)
    .unbind('click')
    .click(function (ev) {
      ev.preventDefault()
      if(isValid()) {
        serverWait()
        updateMessage(
          {
            seq: m.seq,
            title: $('[name=title]', form).val(),
            content: $('[name=content]', form).val(),
            isPublish: $('[name=isPublish]', form).val(),
            startDate: $('[name=startDate]', form).val(),
            endDate: $('[name=endDate]', form).val()
          },
          function (ret) {
            serverDone()
            if(!ret.auth) {
              onLoggedOut()
              return
            }
            if(ret.status == '1') {
              serverWait()
              getMessage(m.seq, function (ret) {
                serverDone()
                if(!ret.auth) {
                  onLoggedOut()
                  return
                }
                if(ret.status == '1') {
                  dropPage(true)
                  dropPage()
                  showMessage(ret.message)
                } else {
                  alert(
                    'Error: ' + ret.error
                  )
                }
                getActiveMessages(function (ret) {
                  if(!ret.auth) {
                    onLoggedOut()
                    return
                  }
                  if(ret.status != '1') alert(
                    'Failed to get active messages from server! Error: '
                    + ret.error
                  )
                })
              })
            } else {
              alert(
                'Failed to update message! Error: '
                + ret.error
              )
            }
          }
        )
      }
    })
  }
  
  showForm(form)
}

function showSearchCustomerForm ()
{
  showForm('searchcustomerform')
}

function showSearchFunnelForm ()
{
  getSalesPersons(function () {})
  showForm('searchfunnelform')
}

function showSearchRetailForm ()
{
  showForm('searchretailform')
}

function showProfileEditForm (prof)
{
  var form = $('#formholder .form.userprofileform')
  
  $('[name=name]', form).val(prof.name)
  $('[name=email]', form).val(prof.email)
  $('[name=mobileNo]', form).val(prof.mobileNo)
  
  $('.okbutton', form)
  .unbind('click')
  .click(function (ev) {
    ev.preventDefault()
    serverWait()
    var name = $('[name=name]', form).val()
    updateUserProfile(
      {
        idNo: prof.idNo,
        name: name,
        email: $('[name=email]', form).val(),
        mobileNo: $('[name=mobileNo]', form).val()
      },
      function (ret) {
        serverDone()
        if(!ret.auth) {
          onLoggedOut()
          return
        }
        if(ret.status != '1') {
          alert(
            'Failed to update user profile! Error: '
            + ret.error
          )
        } else {
          dropPage(true)
          dropPage()
          doShowPreferences()
          $('#greetingphone , #greetingtablet').text('Hi, '+name+'!')
        }
      }
    )
  })
  
  showForm(form)
}

function showPasswordEditForm (prof)
{
  var form = $('#formholder .form.passwordform')
  
  $('[name=current] , [name=new1] , [name=new2]', form).val('')
  
  $('.okbutton', form)
  .unbind('click')
  .click(function (ev) {
    ev.preventDefault()
    if($('[name=new1]', form).val() !== $('[name=new2]', form).val()) {
      alert('New passwords do not match! Please re-enter.')
      return
    }
    serverWait()
    updatePassword(
      {
        oldPassword: $('[name=current]', form).val(),
        newPassword: $('[name=new1]', form).val()
      },
      function (ret) {
        serverDone()
        if(!ret.auth) {
          onLoggedOut()
          return
        }
        if(ret.status != '1') {
          alert(
            'Failed to update password! Error: '
            + ret.error
          )
        } else {
          dropPage(true)
        }
      }
    )
  })
  
  showForm(form)
}


/** Misc **************************************************************/

var shortMonths = [ // For pretty printing of JS date.getMonths()
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

function onLoggedOut (ret)
/*
 * Reset UI to not logged in state.
 * ret is optional.
 */
{
  if(!ret || (ret && ret.status === '1')) {
    if(!ret) {
      alert(
        'You have been logged out or your session has expired.'
        + ' Please log in again.'
      )
    }
    $('#sidebar .blockout').show()
    $('#poweredby').show()
    $('#logout').removeClass('on')
    $('#greetingphone , #greetingtablet').css('opacity', '0')
    while(pageStackHeight() > 1) dropPage(true)
    replacePage('loginpage')
  }
}

function str2date (str)
/*
 * Converts a date string returned by the server into a JS Date object.
 * str = 'YYYY-MM-DD HH:mm:ss'
 * Ignores hour/minute/second.
 */
{
  var spaced = str.split(' ')
  var datecom = spaced[0].split('-')
  
  var d = new Date(0)
  d.setUTCFullYear(parseInt(datecom[0], 10))
  d.setUTCMonth(parseInt(datecom[1], 10)-1)
  d.setUTCDate(parseInt(datecom[2], 10))
  
  return d
}

function date2str (d)
/*
 * Converse of str2date()
 */
{
  var m = d.getUTCMonth()+1
  var t = d.getUTCDate()
  return ''+d.getUTCFullYear()
         +'-'+(m < 10 ? '0'+m : m)
         +'-'+(t < 10 ? '0'+t : t)
         +' 00:00:00'
}

function esc (s)
/*
 * HTML-escape a string.
 */
{
  var replacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  }
  return (''+s).replace(
    /[&<>]/g,
    function (k) { return replacements[k] }
  )
}

function doShowPreferences ()
{
  serverWait()
  getUserProfile(function (ret) {
    serverDone()
    if(!ret.auth) {
      onLoggedOut()
      return
    }
    if(ret.status != '1') {
      alert(
        'Failed to get user profile from server! Error: '
        + ret.error
      )
    } else {
      showPreferences(ret.user)
    }
  })
}

function validate (form, fields)
/*
 * Perform validation on forms.
 * Returns true if validation ok, alert()'s and returns false otherwise.
 * form: DOM element/jQuery object
 * fields: [{ name:'input name', pretty:'display name', required:true }] 
 */
{
  var required = []
  $.each(fields, function (_, f) {
    var input = $('[name='+f.name+']', form)
    if(f.required && !(/[^ ]/.test(input.val()))) {
      required.push(f.pretty)
    }
  })
  
  if(required.length) {
    var last, join = ' is'
    if(required.length > 1) {
      last = required.pop()
      join = ' are'
    }
    var fields = required.join(', ')
    if(last) fields += ' and ' + last
    alert(fields + join + ' required!')
    return false
  }
  
  return true
}


/***********************************************************************
 * ONE CORE BUSINESSS SUITE ANDROID APP
 * data.js
 * Code for communicating with the server and keeping local caches of
 * received data.
 * Written by TJ (tj@cloudsky.org)
 ***/


/** Internal globals **************************************************/

var _lastAuth
// Each entry has .__retrieved == true if full details already loaded.
var _activeMessages, _messages, _customerProfiles, _salesFunnels,
    _retails = {}, // has subarrays for each month
                   // _retails[2012-03-01 00:00:00 UTC Unix Time]
    _salesPersons
var _sub_activeMessages = [],
    _sub_messages = [],
    _sub_customerProfiles = [],
    _sub_salesFunnels = [],
    _sub_retails = [],
    _sub_salesPersons = []
var _userProfile_ret


/** Internal functions ************************************************/

function _server (url, method, data, callback)
/*
 * Call a method on the server.
 */
{
  $.ajax(url, {
    dataType: 'text json',
    data: data,
    type: method,
    timeout: 3000,
    cache: false,
    complete: function (jqXhr, status, exc) {
      var la = _lastAuth
      switch(status) {
        case 'success':
          jqXhr.always(function (ret) {
            _lastAuth = ret.auth
            callback(ret)
          })
          break
        case 'parseerror':
          callback({
            auth:la, status: '0',
            error: 'Malformed response received from server.'
          })
          break
        case 'timeout':
          callback({
            auth:la, status: '0', error: 'Request timed out.'
          })
          break
        default:
          callback({
            auth:la, status: '0',
            error: 'Unknown error.'
          })
      }
    }
  })
  /*callback({
    auth:{id:'fake'},
    status:'1'
  })*/
}


/** Data subscription *************************************************/
/*
 * Register callbacks to be called whenever the relevant internal
 * arrays are changed (add/remove item, reload entire array).
 */

function subscribeActiveMessages (callback)
{
  _sub_activeMessages.push(callback)
}

function subscribeMessages (callback)
{
  _sub_messages.push(callback)
}

function subscribeCustomerProfiles (callback)
{
  _sub_customerProfiles.push(callback)
}

function subscribeSalesFunnels (callback)
{
  _sub_salesFunnels.push(callback)
}

function subscribeRetails (callback)
{
  _sub_retails.push(callback)
}

function subscribeSalesPersons (callback)
{
  _sub_salesPersons.push(callback)
}


/** User management ***************************************************/

function login (params, callback)
{
  _server(
    backendurls['logIn'],
    'POST',
    { username:params.username, password:params.password },
    callback
  )
}

function logout (callback)
{
  _server(
    backendurls['logOut'],
    'POST',
    { username: _lastAuth.id },
    function (ret) {
      if(ret.status=='1') {
        _lastAuth = undefined
        _activeMessages = _messages = _customerProfiles = _salesFunnels
          = _salesPersons  = undefined
        _userProfile_ret = undefined
        _retails = {}
      }
      callback(ret)
    }
  )
}


/** List retrieval ****************************************************/

function getActiveMessages (callback)
/*
 * Retrieves messages for the home page.
 */
{
  //if(!_activeMessages) { Disable caching.
    _server(
      backendurls['message/getActive'],
      'GET',
      {},
      function (ret) {
        _activeMessages_ret = ret
        
        if(ret.auth && ret.status == '1') {
          _activeMessages = ret.messages
          $.each(_sub_activeMessages, function (i, sub) {
            sub(_activeMessages)
          })
        }
        
        callback(ret)
      }
    )
  /*} else {
    callback(_activeMessages_ret)
  }*/
}

function getMessages (callback)
/*
 * Retrieves user's messages list from server.
 */
{
  if(!_messages) {
    _server(
      backendurls['message/getList'],
      'GET',
      {},
      function (ret) {
        _messages_ret = ret
        
        if(ret.auth && ret.status == '1') {
          _messages = ret.messages
          $.each(_sub_messages, function (i, sub) {
            sub(_messages)
          })
        }
        
        callback(ret)
      }
    )
  } else {
    callback(_messages_ret)
  }
}

function getCustomers (callback)
/*
 * Retrieves customer profiles list from server.
 */
{
  if(!_customerProfiles) {
    _server(
      backendurls['cust/getList'],
      'GET',
      {},
      function (ret) {
        _customerProfiles_ret = ret
        
        if(ret.auth && ret.status == '1') {
          _customerProfiles = ret.customers
          $.each(_sub_customerProfiles, function (i, sub) {
            sub(_customerProfiles)
          })
        }
        
        callback(ret)
      }
    )
  } else {
    callback(_customerProfiles_ret)
  }
}

function getFunnels (callback)
{
  if(!_salesFunnels) {
    _server(
      backendurls['sales/getList'],
      'GET',
      {},
      function (ret) {
        _salesFunnels_ret = ret
        
        if(ret.auth && ret.status == '1') {
          _salesFunnels = ret.sales
          $.each(_sub_salesFunnels, function (i, sub) {
            sub(_salesFunnels)
          })
        }
        
        callback(ret)
      }
    )
  } else {
    callback(_salesFunnels_ret)
  }
}

function getRetails (date, callback)
{
  if(_retails[date]
    && (!_retails[date].__isFake)
    && (_retails[date].status == '1'))
  {
    $.each(_sub_retails, function (i, sub) {
      sub(_retails)
    })
    callback(_retails[date])
  } else {
    _server(
      backendurls['retail/getList'],
      'GET',
      { salesDate: date2str(new Date(date*1000)) },
      function (ret) {
        _retails[date] = ret
        
        if(ret.auth && ret.status == '1') {
          $.each(_sub_retails, function (i, sub) {
            sub(_retails)
          })
        }

        callback(ret)
      }
    )
  }
}

function getSalesPersons (callback)
/*
 * Retrieves salespersons list from server.
 */
{
  if(!_salesPersons) {
    _server(
      backendurls['util/getStaff'],
      'GET',
      {},
      function (ret) {
        _salesPersons_ret = ret
        
        if(ret.auth && ret.status == '1') {
          _salesPersons = ret.staff
          $.each(_sub_salesPersons, function (i, sub) {
            sub(_salesPersons)
          })
        }
        
        callback(ret)
      }
    )
  } else {
    callback(_salesPersons_ret)
  }
}


/** Individual record retrieval ***************************************/

function getUserProfile (callback)
/*
 * Get logged-in user's profile.
 */
{
  if(_userProfile_ret) {
    callback(_userProfile_ret)
    return
  }
  _server(
    backendurls['pref/get'],
    'GET',
    {},
    function (ret) { 
      if(ret.auth && ret.status == '1') _userProfile_ret = ret
      callback(ret)
    }
  )
}

function getCustomer (seq, callback)
{
  var retrieved = null
  $.each(_customerProfiles, function (i, o) {
    if(o.seq == seq && o.__retrieved) {
      retrieved = o
      return false
    }
  })
  if(retrieved) {
    callback({
      auth: _lastAuth,
      status: '1',
      customer: retrieved
    })
    return
  }
  
  _server(
    backendurls['cust/get'],
    'GET',
    { seq: seq },
    function (ret) {
      if(ret.auth && ret.status == '1') {
        $.each(_customerProfiles, function (_,c) {
          if(c.seq == seq) {
            for(var k in ret.customer) c[k] = ret.customer[k]
            c.__retrieved = true
            return false
          }
        })
      }
      
      callback(ret)
    }
  )
}

function getFunnel (seq, callback)
{
  var retrieved = null
  $.each(_salesFunnels, function (i, o) {
    if(o.seq == seq && o.__retrieved) {
      retrieved = o
      return false
    }
  })
  if(retrieved) {
    callback({
      auth: _lastAuth,
      status: '1',
      sales: retrieved
    })
    return
  }
  
  _server(
    backendurls['sales/get'],
    'GET',
    { seq: seq },
    function (ret) {
      if(ret.auth && ret.status == '1') {
        $.each(_salesFunnels, function (_,s) {
          if(s.seq == seq) {
            for(var k in ret.sales) s[k] = ret.sales[k]
            s.__retrieved = true
            return false
          }
        })
      }
      
      callback(ret)
    }
  )
}

function getRetail (seq, callback)
{
  var got = false
  $.each(_retails, function (i, rets) {
    $.each(rets.retails, function (j, o) {
      if(o.seq == seq) {
        got = true
        if(o.__retrieved) {
          callback({
            auth: _lastAuth,
            status: '1',
            retail: o
          })
          return false
        } else {
          _server(
            backendurls['retail/get'],
            'GET',
            { seq: seq },
            function (ret) {
              if(ret.auth && ret.status == '1') {
                for(var k in ret.retail) o[k] = ret.retail[k]
                o.total = parseInt(ret.retail.quantity)
                        * parseFloat(ret.retail.unitPrice)
                o.__retrieved = true
              }
              ret.retail = o
              callback(ret)
            }
          )
        }
      }
    })
    if(got) return false
  })
}

function getMessage (seq, callback)
{
  var retrieved = null
  $.each(_messages, function (i, o) {
    if(o.seq == seq && o.__retrieved) {
      retrieved = o
      return false
    }
  })
  if(retrieved) {
    callback({
      auth: _lastAuth,
      status: '1',
      message: retrieved
    })
    return
  }
  
  _server(
    backendurls['message/get'],
    'GET',
    { seq: seq },
    function (ret) {
      if(ret.auth && ret.status == '1') {
        $.each(_messages, function (_,m) {
          if(m.seq == seq) {
            for(var k in ret.message) m[k] = ret.message[k]
            m.__retrieved = true
            return false
          }
        })
      }
      
      callback(ret)
    }
  )
}


/** Creation **********************************************************/

function createMessage (fields, callback)
{
  var msg = {
    title: fields.title,
    content: fields.content,
    startDate: fields.startDate,
    endDate: fields.endDate,
    isPublish: fields.isPublish
  }
  _server(
    backendurls['message/create'],
    'POST',
    msg,
    function (ret) {
      if(ret.auth && ret.status == '1') {
        msg.seq = ret.seq
        msg.__retrieved = true
        _messages.push(msg)
        $.each(_sub_messages, function (i, sub) {
          sub(_messages)
        })
      }
      
      callback(ret)
    }
  )
}

function createCustomer (fields, callback)
{
  var prof = {
    name: fields.name,
    address: fields.address,
    tel: fields.tel,
    fax: fields.fax,
    isActive: fields.isActive,
    contactName1: fields.contactName1,
    contactPos1: fields.contactPos1,
    contactTel1: fields.contactTel1,
    contactEmail1: fields.contactEmail1,
    contactName2: fields.contactName2,
    contactPos2: fields.contactPos2,
    contactTel2: fields.contactTel2,
    contactEmail2: fields.contactEmail2,
    contactName3: fields.contactName3,
    contactPos3: fields.contactPos3,
    contactTel3: fields.contactTel3,
    contactEmail3: fields.contactEmail3
  }
  _server(
    backendurls['cust/create'],
    'POST',
    prof,
    function (ret) {
      if(ret.auth && ret.status == '1') {
        prof.seq = ret.seq
        prof.__retrieved = true
        _customerProfiles.push(prof)
        $.each(_sub_customerProfiles, function (i, sub) {
          sub(_customerProfiles)
        })
      }
      
      callback(ret)
    }
  )
}

function createFunnel (fields, callback)
{
  var fun = {
    projectName: fields.projectName,
    leadTime: fields.leadTime,
    startDate: fields.startDate,
    figure: fields.figure,
    productInfo: fields.productInfo,
    comments: fields.comments,
    status: fields.status,
    custSeq: fields.custSeq
  }
  _server(
    backendurls['sales/create'],
    'POST',
    fun,
    function (ret) {
      if(ret.auth && ret.status == '1') {
        fun.seq = ret.seq
        fun.user = { name: _lastAuth.name }
        fun.custName = fields.custName
        fun.customer = {
          seq: fields.custSeq,
          name: fields.custName
        }
        //fun.__retrieved = true // bcos we don't have caseNo...
        _salesFunnels.push(fun)
        $.each(_sub_salesFunnels, function (i, sub) {
          sub(_salesFunnels)
        })
      }
      
      callback(ret)
    }
  )
}

function createRetail (fields, callback)
{
  var o = {
    salesDate: fields.salesDate,
    product: fields.product,
    contactNo: fields.contactNo,
    paymentType: fields.paymentType,
    quantity: fields.quantity,
    unitPrice: fields.unitPrice,
    remarks: fields.remarks
  }
  _server(
    backendurls['retail/create'],
    'POST',
    o,
    function (ret) {
      if(ret.auth && ret.status == '1') {
        var sd = str2date(o.salesDate)
        var d = new Date(0)
        d.setUTCFullYear(sd.getUTCFullYear())
        d.setUTCMonth(sd.getUTCMonth())
        
        o.seq = ret.seq
        o.__retrieved = true
        o.total = parseInt(o.quantity) * parseFloat(o.unitPrice)
        if(_retails[d.getTime()/1000]) {
          _retails[d.getTime()/1000].retails.push(o)
        } else {
          _retails[d.getTime()/1000] = {
            __isFake: true,
            auth: _lastAuth,
            status: '1',
            retails: [o]
          }
        }
        $.each(_sub_retails, function (i, sub) {
          sub(_retails)
        })
      }
      callback(ret)
    }
  )
}

/** Deleting **********************************************************/

function deleteMessage (seq, callback)
{
  _server(
    backendurls['message/delete'],
    'POST',
    { seq: seq },
    function (ret) {
      if(ret.auth && ret.status == '1') {
        for(var i=0; i<_messages.length; i++) {
          if(_messages[i].seq == seq) {
            _messages.splice(i, 1)
            break;
          }
        }
        $.each(_sub_messages, function (i, sub) {
          sub(_messages)
        })
      }
      
      callback(ret)
    }
  )
}

function deleteCustomer (seq, callback)
{
  _server(
    backendurls['cust/delete'],
    'POST',
    { seq: seq },
    function (ret) {
      if(ret.auth && ret.status == '1') {
        for(var i=0; i<_customerProfiles.length; i++) {
          if(_customerProfiles[i].seq == seq) {
            _customerProfiles.splice(i, 1)
            break;
          }
        }
        $.each(_sub_customerProfiles, function (i, sub) {
          sub(_customerProfiles)
        })
      }
      
      callback(ret)
    }
  )
}

function deleteFunnel (seq, callback)
{
  _server(
    backendurls['sales/delete'],
    'POST',
    { seq: seq },
    function (ret) {
      if(ret.auth && ret.status == '1') {
        for(var i=0; i<_salesFunnels.length; i++) {
          if(_salesFunnels[i].seq == seq) {
            _salesFunnels.splice(i, 1)
            break;
          }
        }
        $.each(_sub_salesFunnels, function (i, sub) {
          sub(_salesFunnels)
        })
      }
      
      callback(ret)
    }
  )
}

function deleteRetail (seq, callback)
{
  _server(
    backendurls['retail/delete'],
    'POST',
    { seq: seq },
    function (ret) {
      if(ret.auth && ret.status == '1') {
        $.each(_retails, function (_, rets) {
          for(var i=0; i<rets.retails.length; i++) {
            if(rets.retails[i].seq == seq) {
              rets.retails.splice(i, 1)
              return false
            }
          }
        })
        $.each(_sub_retails, function (i, sub) {
          sub(_retails)
        })
      }
      
      callback(ret)
    }
  )
}


/** Updating **********************************************************/

function updateUserProfile (fields, callback)
/*
 * Update a user's profile.
 */
{
  var prof = {
    name: fields.name,
    idNo: fields.idNo,
    email: fields.email,
    mobileNo: fields.mobileNo
  }
  _server(
    backendurls['pref/update'],
    'POST',
    prof,
    function (ret) {
      if(ret.auth && ret.status == '1') {
        for(var k in prof) _userProfile_ret.user[k] = prof[k]
      }
      callback(ret)
    }
  )
}

function updatePassword (fields, callback)
/*
 * Update a user's password.
 */
{
  var pwd = {
    oldPassword: fields.oldPassword,
    newPassword: fields.newPassword
  }
  _server(
    backendurls['pref/chgpwd'],
    'POST',
    pwd,
    callback
  )
}

function updateMessage (fields, callback)
{
  var msg = {
    seq: fields.seq,
    title: fields.title,
    content: fields.content,
    startDate: fields.startDate,
    endDate: fields.endDate,
    isPublish: fields.isPublish
  }
  _server(
    backendurls['message/update'],
    'POST',
    msg,
    function (ret) {
      if(ret.auth && ret.status == '1') {
        $.each(_messages, function (_,m) {
          if(m.seq == msg.seq) {
            for(var k in m) m[k] = msg[k]
            return false
          }
        })
        $.each(_sub_messages, function (i, sub) {
          sub(_messages)
        })
      }
      
      callback(ret)
    }
  )
}

function updateCustomer (fields, callback)
{
  var prof = {
    seq: fields.seq,
    name: fields.name,
    address: fields.address,
    tel: fields.tel,
    fax: fields.fax,
    isActive: fields.isActive,
    contactName1: fields.contactName1,
    contactPos1: fields.contactPos1,
    contactTel1: fields.contactTel1,
    contactEmail1: fields.contactEmail1,
    contactName2: fields.contactName2,
    contactPos2: fields.contactPos2,
    contactTel2: fields.contactTel2,
    contactEmail2: fields.contactEmail2,
    contactName3: fields.contactName3,
    contactPos3: fields.contactPos3,
    contactTel3: fields.contactTel3,
    contactEmail3: fields.contactEmail3
  }
  _server(
    backendurls['cust/update'],
    'POST',
    prof,
    function (ret) {
      if(ret.auth && ret.status == '1') {
        $.each(_customerProfiles, function (_,c) {
          if(c.seq == prof.seq) {
            for(var k in c) c[k] = prof[k]
            return false
          }
        })
        $.each(_sub_customerProfiles, function (i, sub) {
          sub(_customerProfiles)
        })
      }
      
      callback(ret)
    }
  )
}

function updateFunnel (fields, callback)
{
  var fun = {
    seq: fields.seq,
    projectName: fields.projectName,
    leadTime: fields.leadTime,
    startDate: fields.startDate,
    figure: fields.figure,
    productInfo: fields.productInfo,
    comments: fields.comments,
    status: fields.status,
    custSeq: fields.custSeq
  }
  _server(
    backendurls['sales/update'],
    'POST',
    fun,
    function (ret) {
      if(ret.auth && ret.status == '1') {
        $.each(_salesFunnels, function (_,s) {
          if(s.seq == fun.seq) {
            for(var k in s) s[k] = fun[k]
            s.custName = fields.custName
            return false
          }
        })
        $.each(_sub_salesFunnels, function (i, sub) {
          sub(_salesFunnels)
        })
      }
      
      callback(ret)
    }
  )
}

function updateRetail (fields, callback)
{
  var o = {
    seq: fields.seq,
    salesDate: fields.salesDate,
    product: fields.product,
    contactNo: fields.contactNo,
    paymentType: fields.paymentType,
    quantity: fields.quantity,
    unitPrice: fields.unitPrice,
    remarks: fields.remarks
  }
  _server(
    backendurls['retail/update'],
    'POST',
    o,
    function (ret) {
      if(ret.auth && ret.status == '1') {
        var sd = str2date(o.salesDate)
        var d = new Date(0)
        d.setUTCFullYear(sd.getUTCFullYear())
        d.setUTCMonth(sd.getUTCMonth())
        
        var old_sd
        $.each(_retails, function (_, rets) {
          for(var i=0; i<rets.retails.length; i++) {
            if(rets.retails[i].seq == o.seq) {
              old_sd = str2date(rets.retails[i].salesDate)
              if(old_sd.getUTCFullYear() !== d.getUTCFullYear()
                || old_sd.getUTCMonth() !== d.getUTCMonth())
              {
                // if changed year or month, delete from old subarray
                // and insert into new/existing one.
                if(!_retails[d.getTime()/1000]) {
                  _retails[d.getTime()/1000] = {
                    __isFake: true,
                    auth: _lastAuth,
                    status: '1',
                    retails: [o]
                  }
                } else {
                  _retails[d.getTime()/1000].retails.push(o)
                }
                rets.retails.splice(i,1)
              } else {
                var r = rets.retails[i]
                for(var k in r) r[k] = o[k]
                r.total = parseInt(o.quantity) * parseFloat(o.unitPrice)
              }
              return false
            }
          }
        })
        
        $.each(_sub_retails, function (i, sub) {
          sub(_retails)
        })
      }
      callback(ret)
    }
  )
}

/** Misc **************************************************************/

function newAccount (fields, callback)
{
  _server(
    backendurls['reg/submit'],
    'POST',
    fields,
    callback
  )
}

function isManager ()
/*
 * true if logged in user is of group manager, false-equivalent
 * otherwise or if not logged in, etc.
 */
{
  return _lastAuth && (_lastAuth.group == '2')
}


backendurls = {
  'logIn': 'http://www.onebizhub.my:9080/SalesTrooperDev/logIn',
  'logOut': 'http://www.onebizhub.my:9080/SalesTrooperDev/logOut',
  'message/getActive': 'http://www.onebizhub.my:9080/SalesTrooperDev/message/getActive',
  'message/getList': 'http://www.onebizhub.my:9080/SalesTrooperDev/message/getList',
  'cust/getList': 'http://www.onebizhub.my:9080/SalesTrooperDev/cust/getList',
  'sales/getList': 'http://www.onebizhub.my:9080/SalesTrooperDev/sales/getList',
  'retail/getList': 'http://www.onebizhub.my:9080/SalesTrooperDev/retail/getList',
  'util/getStaff': 'http://www.onebizhub.my:9080/SalesTrooperDev/util/getStaff',
  'pref/get': 'http://www.onebizhub.my:9080/SalesTrooperDev/pref/get',
  'cust/get': 'http://www.onebizhub.my:9080/SalesTrooperDev/cust/get',
  'sales/get': 'http://www.onebizhub.my:9080/SalesTrooperDev/sales/get',
  'retail/get': 'http://www.onebizhub.my:9080/SalesTrooperDev/retail/get',
  'message/get': 'http://www.onebizhub.my:9080/SalesTrooperDev/message/get',
  'message/create': 'http://www.onebizhub.my:9080/SalesTrooperDev/message/create',
  'cust/create': 'http://www.onebizhub.my:9080/SalesTrooperDev/cust/create',
  'sales/create': 'http://www.onebizhub.my:9080/SalesTrooperDev/sales/create',
  'retail/create': 'http://www.onebizhub.my:9080/SalesTrooperDev/retail/create',
  'message/delete': 'http://www.onebizhub.my:9080/SalesTrooperDev/message/delete',
  'cust/delete': 'http://www.onebizhub.my:9080/SalesTrooperDev/cust/delete',
  'sales/delete': 'http://www.onebizhub.my:9080/SalesTrooperDev/sales/delete',
  'retail/delete': 'http://www.onebizhub.my:9080/SalesTrooperDev/retail/delete',
  'pref/update': 'http://www.onebizhub.my:9080/SalesTrooperDev/pref/update',
  'pref/chgpwd': 'http://www.onebizhub.my:9080/SalesTrooperDev/pref/chgpwd',
  'message/update': 'http://www.onebizhub.my:9080/SalesTrooperDev/message/update',
  'cust/update': 'http://www.onebizhub.my:9080/SalesTrooperDev/cust/update',
  'sales/update': 'http://www.onebizhub.my:9080/SalesTrooperDev/sales/update',
  'retail/update': 'http://www.onebizhub.my:9080/SalesTrooperDev/retail/update',
  'reg/submit': 'http://www.onebizhub.my:9080/SalesTrooperDev/reg/submit',
  'ads': 'http://www.onebizhub.my:9080/SalesTrooperDev/ads'
}


backendurls = {
  'logIn': 'http://www.onebizhub.my:9080/SalesTrooperPro/logIn',
  'logOut': 'http://www.onebizhub.my:9080/SalesTrooperPro/logOut',
  'message/getActive': 'http://www.onebizhub.my:9080/SalesTrooperPro/message/getActive',
  'message/getList': 'http://www.onebizhub.my:9080/SalesTrooperPro/message/getList',
  'cust/getList': 'http://www.onebizhub.my:9080/SalesTrooperPro/cust/getList',
  'sales/getList': 'http://www.onebizhub.my:9080/SalesTrooperPro/sales/getList',
  'retail/getList': 'http://www.onebizhub.my:9080/SalesTrooperPro/retail/getList',
  'util/getStaff': 'http://www.onebizhub.my:9080/SalesTrooperPro/util/getStaff',
  'pref/get': 'http://www.onebizhub.my:9080/SalesTrooperPro/pref/get',
  'cust/get': 'http://www.onebizhub.my:9080/SalesTrooperPro/cust/get',
  'sales/get': 'http://www.onebizhub.my:9080/SalesTrooperPro/sales/get',
  'retail/get': 'http://www.onebizhub.my:9080/SalesTrooperPro/retail/get',
  'message/get': 'http://www.onebizhub.my:9080/SalesTrooperPro/message/get',
  'message/create': 'http://www.onebizhub.my:9080/SalesTrooperPro/message/create',
  'cust/create': 'http://www.onebizhub.my:9080/SalesTrooperPro/cust/create',
  'sales/create': 'http://www.onebizhub.my:9080/SalesTrooperPro/sales/create',
  'retail/create': 'http://www.onebizhub.my:9080/SalesTrooperPro/retail/create',
  'message/delete': 'http://www.onebizhub.my:9080/SalesTrooperPro/message/delete',
  'cust/delete': 'http://www.onebizhub.my:9080/SalesTrooperPro/cust/delete',
  'sales/delete': 'http://www.onebizhub.my:9080/SalesTrooperPro/sales/delete',
  'retail/delete': 'http://www.onebizhub.my:9080/SalesTrooperPro/retail/delete',
  'pref/update': 'http://www.onebizhub.my:9080/SalesTrooperPro/pref/update',
  'pref/chgpwd': 'http://www.onebizhub.my:9080/SalesTrooperPro/pref/chgpwd',
  'message/update': 'http://www.onebizhub.my:9080/SalesTrooperPro/message/update',
  'cust/update': 'http://www.onebizhub.my:9080/SalesTrooperPro/cust/update',
  'sales/update': 'http://www.onebizhub.my:9080/SalesTrooperPro/sales/update',
  'retail/update': 'http://www.onebizhub.my:9080/SalesTrooperPro/retail/update',
  'reg/submit': 'http://www.onebizhub.my:9080/SalesTrooperPro/reg/submit',
  'ads': 'http://www.onebizhub.my:9080/SalesTrooperPro/ads'
}


backendurls = {
  'logIn': 'http://www.onebizhub.my:9080/SalesTrooperFree/logIn',
  'logOut': 'http://www.onebizhub.my:9080/SalesTrooperFree/logOut',
  'message/getActive': 'http://www.onebizhub.my:9080/SalesTrooperFree/message/getActive',
  'message/getList': 'http://www.onebizhub.my:9080/SalesTrooperFree/message/getList',
  'cust/getList': 'http://www.onebizhub.my:9080/SalesTrooperFree/cust/getList',
  'sales/getList': 'http://www.onebizhub.my:9080/SalesTrooperFree/sales/getList',
  'retail/getList': 'http://www.onebizhub.my:9080/SalesTrooperFree/retail/getList',
  'util/getStaff': 'http://www.onebizhub.my:9080/SalesTrooperFree/util/getStaff',
  'pref/get': 'http://www.onebizhub.my:9080/SalesTrooperFree/pref/get',
  'cust/get': 'http://www.onebizhub.my:9080/SalesTrooperFree/cust/get',
  'sales/get': 'http://www.onebizhub.my:9080/SalesTrooperFree/sales/get',
  'retail/get': 'http://www.onebizhub.my:9080/SalesTrooperFree/retail/get',
  'message/get': 'http://www.onebizhub.my:9080/SalesTrooperFree/message/get',
  'message/create': 'http://www.onebizhub.my:9080/SalesTrooperFree/message/create',
  'cust/create': 'http://www.onebizhub.my:9080/SalesTrooperFree/cust/create',
  'sales/create': 'http://www.onebizhub.my:9080/SalesTrooperFree/sales/create',
  'retail/create': 'http://www.onebizhub.my:9080/SalesTrooperFree/retail/create',
  'message/delete': 'http://www.onebizhub.my:9080/SalesTrooperFree/message/delete',
  'cust/delete': 'http://www.onebizhub.my:9080/SalesTrooperFree/cust/delete',
  'sales/delete': 'http://www.onebizhub.my:9080/SalesTrooperFree/sales/delete',
  'retail/delete': 'http://www.onebizhub.my:9080/SalesTrooperFree/retail/delete',
  'pref/update': 'http://www.onebizhub.my:9080/SalesTrooperFree/pref/update',
  'pref/chgpwd': 'http://www.onebizhub.my:9080/SalesTrooperFree/pref/chgpwd',
  'message/update': 'http://www.onebizhub.my:9080/SalesTrooperFree/message/update',
  'cust/update': 'http://www.onebizhub.my:9080/SalesTrooperFree/cust/update',
  'sales/update': 'http://www.onebizhub.my:9080/SalesTrooperFree/sales/update',
  'retail/update': 'http://www.onebizhub.my:9080/SalesTrooperFree/retail/update',
  'reg/submit': 'http://www.onebizhub.my:9080/SalesTrooperFree/reg/submit',
  'ads': 'http://www.onebizhub.my:9080/SalesTrooperFree/ads'
}

