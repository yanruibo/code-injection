






                window.onload = function(){
                    //alert("start1..");
                    $('#gallery_spinner').show();
                    /*
                    $("a").click(function(event) {
                                 event.preventDefault();
                                 });
                    */
                    $('#fsIndex').load('pageshow', function(e){
                                       //e.preventDefault();
                                       setFactsheetCharList();
                                       });
                    
                    $('#glossary').load('pageshow', function(e){
                                        //e.preventDefault();
                                        setGlossaryCharList();
                                        });
                    
                    
                    $('#searchForm').submit(function(e) {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            $('#searchMsg').empty();
                                            $('#searchUL').empty();
                                            $.mobile.changePage('#searchResults');
                                            return false;
                                            });
                    
                    $('#gallery_spinner').hide();
                    $('#loadscreen').show();
                    
                    $('#gallery_spinner').show();
                    
                    //window.onload=disable;
                    setTimeout(function(){  //Beginning of code that should run AFTER the timeout
                               $('#loadscreen').hide();
                               
                               $('#gallery_spinner').hide();
                               },2000);
                    //alert("end..");
                };
                
                
                var instance, currentPage, options;
                
                
                (function(window, $, PhotoSwipe){
                 
                 $(document).ready(function(){
                                   
                                   $('div.gallery-page')
                                   
                                   .live('pageshow', function(e){
                                         var currentPage = $(e.target);
                                         var options = {captionAndToolbarAutoHideDelay:0,doubleTapZoomLevel:2.0,allowUserZoom:true};
                                         var instance = $("div.gallery a", currentPage).photoSwipe(options,  currentPage.attr('id'));
                                         
                                         // onHide
                                         instance.addEventHandler(PhotoSwipe.EventTypes.onHide, function(e){
                                                                  $(e.target).hide();
                                                                  
                                                                  var instance1;
                                                                  if (typeof instance != "undefined" && instance != null) {
                                                                  instance1 = $("div.gallery a", currentPage).photoSwipe(options,  currentPage.attr('id'));
                                                                  
                                                                  }
                                                                  else{
                                                                  instance1 = $("div.gallery a", currentPage).photoSwipe(options,  currentPage.attr('id'));
                                                                  }
                                                                  instance = instance1;
                                                                  });
                                         
                                         
                                         // onBeforeShow
                                         instance.addEventHandler(PhotoSwipe.EventTypes.onBeforeShow, function(e){
                                                                  
                                                                  });
                                         
                                         return true;
                                         
                                         })
                                   .live('pagehide', function(e){
                                         
                                         var currentPage = $(e.target);
                                         var instance = PhotoSwipe.getInstance(currentPage.attr('id'));
                                         
                                         if (typeof instance != "undefined" && instance != null) {
                                         PhotoSwipe.detatch(instance);
                                         }
                                         
                                         
                                         return true;
                                         
                                         });
                                   });
                 
                 }(window, window.jQuery, window.Code.PhotoSwipe));
                
                
                $('#skippedBack').live("click", function (e, data){
                                       var  overrideToPage;
                                       
                                       //for-loop to go through the urlHistory TOP>DOWN
                                       for (var i = $.mobile.urlHistory.activeIndex-1; i>=0; i--)
                                       {
                                       //alert(i);
                                       var temp = $.mobile.urlHistory.stack[i].url;
                                       //alert(temp.indexOf("factsheet")+" ** "+temp);
                                       //|| (temp.indexOf("searchResults")==0)
                                       if((temp.indexOf("fsImage") ==0)  || (temp.indexOf("factsheet")==0) || (temp.indexOf("excludeFilters")==0) || (temp.indexOf("includeFilters")==0))
                                       {
                                       //alert(i+' skip: '+temp);
                                       }
                                       else
                                       {
                                       //alert(i+' back: '+temp);
                                       break;
                                       }
                                       
                                       }
									   
                                       // alert("Changing to page: "+temp);
                                       //$.mobile.changePage("#"+temp, {transition:"slide"});
                                       $.mobile.changePage("#"+temp, {
                                                           transition: "fade",
                                                           reverse: false,
                                                           changeHash: false
                                                           });
                                       
                                       });
                
                $(document).bind('scrollstart', function(e){
                                 e.stopPropagation();
                                 e.stopImmediatePropagation();
                                 scrollInProgress = true;
                                 });
                
                
                $(document).bind("pagebeforeshow", function(e,data){
                                 //alert("pagebefore show....");
                                 $('#spinner').show();
                                 });
                $(document).bind("pageshow", function(e,data){
                                 //alert("pageshow.. hide");
                                 $('#spinner').hide();
                                 
                                 });
                
                $(document).bind("orientationchange", function(e,data){
                                 $('#spinner').show();
                                 setTimeout(function() {
                                            $('#spinner').hide();
                                            }, 400);
                                 });
                
                
                
                // Listen for any attempts to call changePage().
                $(document).bind( "pagebeforechange", function( e, data ) {
                                 //alert("pagebeforechange");
                                 // We only want to handle changePage() calls where the caller is
                                 // asking us to load a page by URL.
                                 if ( typeof data.toPage === "string" ) {
                                 
                                 // We are being asked to load a page by URL, but we only
                                 // want to handle URLs that request the data for a specific
                                 // category.
                                 var u = $.mobile.path.parseUrl( data.toPage );
                                 var factsheetVar = /^#factsheet/;
                                 var fsContentVar = /^#fsContent/;
                                 var fsImageVar =/^#fsImage/;
                                 var galleryVar = /^#fsgallery/;
                                 var sResultsVar = /^#sResults/;
                                 
                                 if ( u.hash.search(factsheetVar) !== -1 ) {
                                 //alert('pagebeforechange-factsheet');
                                 $('#gallery_spinner').show();
                                 // We're being asked to display the items for a specific category.
                                 // Call our internal method that builds the content for the category
                                 // on the fly based on our in-memory category data structure.
                                 showFactSheet( u, data.options );
                                 
                                 // Make sure to tell changePage() we've handled this call so it doesn't
                                 // have to do anything.
                                 e.preventDefault();
                                 }
                                 
                                 if(u.hash.search(fsContentVar) !== -1){
                                 //alert('pagebeforechange-fsContent');
                                 $('#gallery_spinner').show();
                                 showFSContent( u, data.options );
                                 e.preventDefault();
                                 }
                                 
                                 if(u.hash.search(fsImageVar) !== -1){
                                 //alert('pagebeforechange-fsImage');
                                 $('#gallery_spinner').show();
                                 showFSImage( u, data.options );
                                 e.preventDefault();
                                 }
                                 
                                 if(u.hash.search(galleryVar) !== -1){
                                 //alert('pagebeforechange-fsgallery');
                                 $('#gallery_spinner').show();
                                 showImageGallery( u, data.options );
                                 e.preventDefault();
                                 }
                                 
                                 if(u.hash.search(sResultsVar) !== -1){
                                 //alert('pagebeforechange-search');
                                 $('#spinner').show();
                                 showSearchResults( u, data.options );
                                 //e.preventDefault();
                                 }
                                 
                                 }
                                 });
                
                
                // Dynamic FactSheet pages
                // Load the data for a specific category, based on
                // the URL passed in. Generate markup for the items in the
                // category, inject it into an embedded page, and then make
                // that page the current active page.
                function showFactSheet( urlObj, options )
                {
                    var fsName = urlObj.hash.replace( /.*fsname=/, "" ),
                    
                    // The pages we use to display our content are already in
                    // the DOM. The id of the page we are going to write our
                    // content into is specified in the hash before the '?'.
                    pageSelector = urlObj.hash.replace( /\?.*$/, "" );
                    
                    if(fsName.indexOf('[')!= -1){
                        fsName = fsName.substr(1, fsName.length-2);
                    }
                    
                    if ( fsName ) {
                        // Get the page we are going to dump our content into.
                        var $page = $( pageSelector ),
                        
                        // Get the header for the page.
                        $header = $page.children( ":jqmData(role=header)" ),
                        
                        // Get the content area element for the page.
                        $content = $page.children( ":jqmData(role=content)" ),
                        
                        // The markup we are going to inject into the content
                        // area of the page.
                        
                        markup = getFactSheetIdByName(fsName); //getTestContent('a');//displayFactSheet();
                        
                        // Find the h1 element in our header and inject the name of
                        // the category into it.
                        $header.find( "h1" ).html( fsName );
                        
                        // Inject the category items markup into the content element.
                        $content.html(markup);
                        
                        // Pages are lazily enhanced. We call page() on the page
                        // element to make sure it is always enhanced before we
                        // attempt to enhance the listview markup we just injected.
                        // Subsequent calls to page() are ignored since a page/widget
                        // can only be enhanced once.
                        $page.page();
                        
                        // Enhance the listview we just injected.
                        //$content.find( ":jqmData(role=listview)" ).listview();
                        $content.find( ":jqmData(role=collapsible-set)" ).collapsibleset();
                        
                        // We don't want the data-url of the page we just modified
                        // to be the url that shows up in the browser's location field,
                        // so set the dataUrl option to the URL for the category
                        // we just loaded.
                        options.dataUrl = urlObj.href;
                        $.mobile.silentScroll(0);
                        // Now call changePage() and tell it to switch to
                        // the page we just modified.
                        $.mobile.changePage( $page, options );
                        
                        //alert('pagechange-fsIndex');
                        
                        $('#gallery_spinner').hide();
                        
                    }
                }
                
                function showFSImage(urlObj, options)
                {
                    var fsName = urlObj.hash.replace( /.*fsname=/, "" ),
                    pageSelector = urlObj.hash.replace( /\?.*$/, "" );
                    if(fsName.indexOf('[')!= -1){
                        fsName = fsName.substr(1, fsName.length-2);
                    }
                    if (fsName) {
                        var $page = $( pageSelector ),
                        $header = $page.children( ":jqmData(role=header)" ),
                        $content = $page.children( ":jqmData(role=content)" ),
                        markup = getFSImages(fsName);
                        $header.find( "h2" ).html( fsName + " - Images");
                        $content.html(markup);
                        $page.page();
                        $content.find( ":jqmData(role=listview)" ).listview();
                        options.dataUrl = urlObj.href;
                        $.mobile.changePage( $page, options );
                        
                        //alert('pagechange-fsImage');
                        setTimeout(function() {
                                   $('#gallery_spinner').hide();
                                   }, 200);
                    }
                }
                
                function showSearchResults(urlObj, options)
                {
                    var fsName = urlObj.hash.replace( /.*fsTitles=/, "" ),
                    pageSelector = urlObj.hash.replace( /\?.*$/, "" );
                    if(fsName.indexOf('[')!= -1){
                        fsName = fsName.substr(1, fsName.length-2);
                    }
                    if (fsName) {
                        var $page = $( pageSelector ),
                        $header = $page.children( ":jqmData(role=header)" ),
                        $content = $page.children( ":jqmData(role=content)" ),
                        markup = getFSImages(fsName);
                        $header.find( "h1" ).html( fsName );
                        $content.html(markup);
                        $page.page();
                        $content.find( ":jqmData(role=listview)" ).listview();
                        options.dataUrl = urlObj.href;
                        $.mobile.changePage( $page, options );
                        
                        //alert('pagechange-search');
                        $('#spinner').hide();
                    }
                }
                
                function showImageGallery(urlObj, options)
                {
                    var pageNo = urlObj.hash.replace( /.*page=/, "" ),
                    pageSelector = urlObj.hash.replace( /\?.*$/, "" );
                    
                    if (pageNo) {
                        var $page = $( pageSelector ),
                        $header = $page.children( ":jqmData(role=header)" ),
                        $content = $page.children( ":jqmData(role=content)" ),
                        markup = displayGallery(pageNo);
                        $header.find( "h1" ).html('Image Gallery');
                        //$header.html( displayGalleryHeader(pageNo) );
                        $content.html(markup);
                        $page.page();
                        $content.find( ":jqmData(role=listview)" ).listview();
                        options.dataUrl = urlObj.href;
                        $.mobile.silentScroll(0);
                        $.mobile.changePage( $page, options );
                        
                        //alert('pagechange-fsgallery');
                        
                        setTimeout(function() {
                                   $('#gallery_spinner').hide();
                                   }, 500);
                    }
                }
                
                
                $('.checkAll').live('change',
                                    function (){
                                    var th = $(this);
                                    if(th.is(':checked')) {
                                    $("label[for=" + th.attr('id') + "] span.ui-btn-text").text("Uncheck All");
                                    $("input[name=topicCriteria]").attr("checked",true).checkboxradio('refresh');
                                    
                                    } else {
                                    $("label[for=" + th.attr('id') + "] span.ui-btn-text").text("Check All");
                                    $("input[name=topicCriteria]").removeAttr("checked").checkboxradio('refresh');
                                    }
                                    });
                
                $(function(){
                  $('input[type=text]').focus(function() {
                                              $(this).val('');
                                              });
                  });
                
                $('#resetButton').live('click',
                                       function (){
                                       $('input[name=terms]').val('');
                                       $("input[name=checkAll]").removeAttr("checked").checkboxradio('refresh');
                                       $("input[name=topicCriteria]").removeAttr("checked").checkboxradio('refresh');
                                       $("label[for=checkAll] span.ui-btn-text").text("Check All");
                                       });
                
                $('#incCheckAll').live('change',
                                       function (){
                                       //$("input[name=checkAll]").removeAttr("checked").checkboxradio('refresh');
                                       //$("input[name=incFilters]").removeAttr("checked").checkboxradio('refresh');
                                       //$.mobile.changePage('#fsgallery?page=0');
                                       //$("label[for=checkAll] span.ui-btn-text").text("Check All");
                                       
                                       var th = $(this);
                                       if(th.is(':checked')) {
                                       $("label[for=" + th.attr('id') + "] span.ui-btn-text").text("Uncheck All");
                                       $("input[name=incFilters]").attr("checked",true).checkboxradio('refresh');
                                       
                                       } else {
                                       $("label[for=" + th.attr('id') + "] span.ui-btn-text").text("Check All");
                                       $("input[name=incFilters]").removeAttr("checked").checkboxradio('refresh');
                                       }
                                       });
                
                $('#incReset').live('click',
                                    function (){
                                    $("input[name=incFilters]").removeAttr("checked").checkboxradio('refresh');
                                    $("input[name=incCheckAll]").removeAttr("checked").checkboxradio('refresh');
                                    $("label[for=incCheckAll] span.ui-btn-text").text("Check All");
                                    
                                    $("input[name=excFilters]").removeAttr("checked").checkboxradio('refresh');
                                    $("input[name=excCheckAll]").removeAttr("checked").checkboxradio('refresh');
                                    $("label[for=excCheckAll] span.ui-btn-text").text("Check All");
                                    
                                    $.mobile.changePage('#fsgallery?page=0',{changeHash: false});
                                    });
                
                $('#excReset').live('click', function (event){
                                    $("input[name=excFilters]").removeAttr("checked").checkboxradio('refresh');
                                    $("input[name=excCheckAll]").removeAttr("checked").checkboxradio('refresh');
                                    $("label[for=excCheckAll] span.ui-btn-text").text("Check All");
                                    
                                    $("input[name=incFilters]").removeAttr("checked").checkboxradio('refresh');
                                    $("input[name=incCheckAll]").removeAttr("checked").checkboxradio('refresh');
                                    $("label[for=incCheckAll] span.ui-btn-text").text("Check All");
                                    $.mobile.changePage('#fsgallery?page=0',{changeHash: false});
                                    });
                
                
                
                $('#excCheckAll').live('change', function (event){
                                       //excReset --> $("input[name=excFilters]").removeAttr("checked").checkboxradio('refresh');
                                       var th = $(this);
                                       if(th.is(':checked'))
                                       {
                                       $("label[for=" + th.attr('id') + "] span.ui-btn-text").text("Uncheck All");
                                       $("input[name=excFilters]").attr("checked",true).checkboxradio('refresh');
                                       }
                                       else
                                       {
                                       $("label[for=" + th.attr('id') + "] span.ui-btn-text").text("Check All");
                                       $("input[name=excFilters]").removeAttr("checked").checkboxradio('refresh');
                                       }
                                       });
                
                $('#incSubmit').live('click', function() {
                                     $.mobile.changePage('#fsgallery?page=0',{changeHash: false});
                                     });
                $('#excSubmit').live('click', function() {
                                     $.mobile.changePage('#fsgallery?page=0',{changeHash: false});
                                     });
                
                
                // Click event for button click
                $('#searchButton').live('click', function(event) {
                                        event.preventDefault();
                                        $('#searchMsg').empty();
                                        $('#searchUL').empty();
                                        
                                        $.mobile.changePage('#searchResults',{changeHash: false});
                                        
                                        });
                
                // Get the values from the DOM after the page has been shown
                $('#searchResults').live('pageshow', function(event) {
                                         event.preventDefault();
                                         searchFactSheets();
                                         });
                

                $(document).ready(function(){
                                  $("#spinner").bind("ajaxSend", function() {
                                                     $(this).show();
                                                     }).bind("ajaxStop", function() {
                                                             $(this).hide();
                                                             }).bind("ajaxError", function() {
                                                                     $(this).hide();
                                                                     });
                                  });
            

                var db2 = window.openDatabase("cpDB", "1.0", "Citrus Pests DB", 8000000);
                console.log('DB opened');
            

//IMAGE GALLERY

function displayGallery(pageNo){
	
	db2.transaction(function(tx) {
                    var incFilterArray = new Array();
                    var j=0;
                    $('[name=incFilters]:checked').each(function() {
                                                        if($("label[for=" + $(this).attr('id') + "]").text().search(" or ")>-1)
                                                        {
                                                        incFilterArray[j]=$("label[for=" + $(this).attr('id') + "]").text().replace(" or ","%' OR image.imagecaption LIKE '%");
                                                        j++;
                                                        }
                                                        else
                                                        {
                                                        incFilterArray[j]=$("label[for=" + $(this).attr('id') + "]").text();
                                                        j++;
                                                        }
                                                        });
                    
                    var excFilterArray = new Array();
                    j=0;
                    $('[name=excFilters]:checked').each(function() {
                                                        if(excFilterArray[j]=$("label[for=" + $(this).attr('id') + "]").text().search(" or ")>-1)
                                                        {
                                                        excFilterArray[j]=$("label[for=" + $(this).attr('id') + "]").text().replace(" or ","%' OR image.imagecaption LIKE '%");
                                                        j++;
                                                        }
                                                        else
                                                        {
                                                        excFilterArray[j]=$("label[for=" + $(this).attr('id') + "]").text();
                                                        j++;
                                                        }
                                                        });
                    
                    var includeFilterQuery = "AND (";
                    for(var i =0;i<incFilterArray.length;i++){
                    includeFilterQuery+="image.imagecaption LIKE '%"+incFilterArray[i].trim()+"%' ";
                    if(i!=incFilterArray.length-1)
                    includeFilterQuery += 'OR '
                    }
                    includeFilterQuery +=")";
                    if(incFilterArray.length==0)
                    includeFilterQuery = '';
                    
                    
                    var excludeFilterQuery = " AND image.imageid NOT IN (SELECT image.imageid "+
                    "FROM factsheetimages JOIN factsheet on factsheetimages.factsheetid = factsheet.factsheetid "+
                    "JOIN image on factsheetimages.imageid = image.imageid WHERE 0 = 0 "+
                    "AND (";
                    for(var i =0;i<excFilterArray.length;i++){
                    excludeFilterQuery+="image.imagecaption LIKE '%"+excFilterArray[i].trim()+"%' ";
                    if(i!=excFilterArray.length-1)
                    excludeFilterQuery += 'OR '
                    }
                    excludeFilterQuery +="))";
                    if(excFilterArray.length==0)
                    excludeFilterQuery = '';
                    
                    var filterQuery = includeFilterQuery + excludeFilterQuery;
                    
                    tx.executeSql("SELECT COUNT(factsheetimages.imageid) as imagecount "+
                                  "FROM factsheetimages JOIN factsheet ON factsheetimages.factsheetid = factsheet.factsheetid "+
                                  "JOIN image on factsheetimages.imageid = image.imageid "+
                                  "where 0=0 "+filterQuery, [], function(tx, result) {
                                  var len = result.rows.length;
                                  if(len > 0){
                                  
                                  var item = result.rows.item(0);
                                  var totalCount = item['imagecount'];
                                  var pageLimit = 24;
                                  
                                  if(totalCount==0)
                                  {
                                  document.getElementById('galleryPageLinks').innerHTML ='';
                                  document.getElementById('galleryLinks').innerHTML ='<p>No Images Found.</p>';
                                  document.getElementById('galleryPageFooterLinks').innerHTML ='';
                                  }
                                  else{
                                  getPageNoLinks(pageNo, pageLimit, totalCount);
                                  getFactSheetImagesLimitByPage(pageNo, pageLimit,filterQuery);
                                  getPageNoLinksFooter(pageNo, pageLimit, totalCount);
                                  }
                                  }
                                  });
                    });
}

function getPageNoLinks(pageNo, pageLimit, totalCount){
	db2.transaction(function(tx) {
                    var numPages = Math.ceil(totalCount/pageLimit);
                    var curPage = parseInt(pageNo)+1;
                    document.getElementById('galleryPageLinks').innerHTML ='<p>';
                    
                    if(pageNo > 0)
                    document.getElementById('galleryPageLinks').innerHTML += '<a class="button" href="#fsgallery?page='+(pageNo-1)+'" style="color:#F0F6E8;  width:12px" ><b><</b></a>&nbsp;';
                    for(var i=1;i<=numPages;i++){
                    if(i==curPage)
                    document.getElementById('galleryPageLinks').innerHTML += '<a class="activeButton" href="#fsgallery?page='+(i-1)+'" style="color:#F0F6E8;  width:12px" >'+i+'</a>&nbsp;';
                    else
                    document.getElementById('galleryPageLinks').innerHTML += '<a class="button" href="#fsgallery?page='+(i-1)+'" style="color:#F0F6E8;  width:12px" >'+i+'</a>&nbsp;';
                    }
                    if(pageNo < numPages-1)
                    document.getElementById('galleryPageLinks').innerHTML += '<a class="button" href="#fsgallery?page='+(parseInt(pageNo)+1)+'" style="color:#F0F6E8;  width:12px" ><b>></b></a>';
                    
                    document.getElementById('galleryPageLinks').innerHTML += '</p>';
                    
                    });
}


function getPageNoLinksFooter(pageNo, pageLimit, totalCount){
	db2.transaction(function(tx) {
                    var numPages = Math.ceil(totalCount/pageLimit);
                    var curPage = parseInt(pageNo)+1;
                    document.getElementById('galleryPageFooterLinks').innerHTML ='<p>';
                    
                    if(pageNo > 0)
                    document.getElementById('galleryPageFooterLinks').innerHTML += '<a class="button" href="#fsgallery?page='+(pageNo-1)+'" style="color:#F0F6E8;  width:12px" ><</a>&nbsp;';
                    for(var i=1;i<=numPages;i++){
                    if(i==curPage)
                    document.getElementById('galleryPageFooterLinks').innerHTML += '<a class="activeButton" href="#fsgallery?page='+(i-1)+'" style="color:#F0F6E8;  width:12px" >'+i+'</a>&nbsp;';
                    else
                    document.getElementById('galleryPageFooterLinks').innerHTML += '<a class="button" href="#fsgallery?page='+(i-1)+'" style="color:#F0F6E8;  width:12px" >'+i+'</a>&nbsp;';
                    }
                    if(pageNo < numPages-1)
                    document.getElementById('galleryPageFooterLinks').innerHTML += '<a class="button" href="#fsgallery?page='+(parseInt(pageNo)+1)+'" style="color:#F0F6E8;  width:12px" >></a>';
                    
                    document.getElementById('galleryPageFooterLinks').innerHTML += '</p>';
                    
                    
                    });
}
/*
function getPageNoLinks(pageNo, pageLimit, totalCount){
	db2.transaction(function(tx) {
                    var numPages = Math.ceil(totalCount/pageLimit);
                    var curPage = parseInt(pageNo)+1;
                    document.getElementById('galleryPageLinks').innerHTML ='<p>';
                    
                    if(pageNo > 0)
                    document.getElementById('galleryPageLinks').innerHTML += '<a class="button" href="#fsgallery?page='+(pageNo-1)+'" style="color:#F0F6E8;  width:12px" ><b><</b></a>&nbsp;';
                    for(var i=1;i<=numPages;i++){
                    if(i==curPage)
                    document.getElementById('galleryPageLinks').innerHTML += '<a class="activeButton" href="#fsgallery?page='+(i-1)+'" style="color:#F0F6E8;  width:12px" >'+i+'</a>&nbsp;';
                    else
                    document.getElementById('galleryPageLinks').innerHTML += '<a class="button" href="#fsgallery?page='+(i-1)+'" style="color:#F0F6E8;  width:12px" >'+i+'</a>&nbsp;';
                    }
                    if(pageNo < numPages-2)
                    document.getElementById('galleryPageLinks').innerHTML += '<a class="button" href="#fsgallery?page='+(parseInt(pageNo)+1)+'" style="color:#F0F6E8;  width:12px" ><b>></b></a>';
                    
                    document.getElementById('galleryPageLinks').innerHTML += '</p>';
                    
                    });
}


function getPageNoLinksFooter(pageNo, pageLimit, totalCount){
	db2.transaction(function(tx) {
                    var numPages = Math.ceil(totalCount/pageLimit);
                    var curPage = parseInt(pageNo)+1;
                    document.getElementById('galleryPageFooterLinks').innerHTML ='<p>';
                    
                    if(pageNo > 0)
                    document.getElementById('galleryPageFooterLinks').innerHTML += '<a class="button" href="#fsgallery?page='+(pageNo-1)+'" style="color:#F0F6E8;  width:12px" ><</a>&nbsp;';
                    for(var i=1;i<=numPages;i++){
                    if(i==curPage)
                    document.getElementById('galleryPageFooterLinks').innerHTML += '<a class="activeButton" href="#fsgallery?page='+(i-1)+'" style="color:#F0F6E8;  width:12px" >'+i+'</a>&nbsp;';
                    else
                    document.getElementById('galleryPageFooterLinks').innerHTML += '<a class="button" href="#fsgallery?page='+(i-1)+'" style="color:#F0F6E8;  width:12px" >'+i+'</a>&nbsp;';
                    }
                    if(pageNo < numPages-2)
                    document.getElementById('galleryPageFooterLinks').innerHTML += '<a class="button" href="#fsgallery?page='+(parseInt(pageNo)+1)+'" style="color:#F0F6E8;  width:12px" >></a>';
                    
                    document.getElementById('galleryPageFooterLinks').innerHTML += '</p>';
                    
                    
                    });
}
*/

function getFactSheetImagesLimitByPage(pageNo, pageLimit, filterQuery){
	db2.transaction(function(tx) {
                    var getFrom = pageNo * pageLimit;
                    
                    if(pageLimit > 0){
                    tx.executeSql("SELECT factsheetimages.factsheetid, factsheet.name, image.path, image.imagecaption,image.imageid "+
                                  "FROM factsheetimages "+
                                  "JOIN factsheet on factsheetimages.factsheetid = factsheet.factsheetid "+
                                  "JOIN image on factsheetimages.imageid = image.imageid "+
                                  "where 0=0 "+filterQuery+" "+
                                  "ORDER BY factsheet.name, image.weight ASC LIMIT "+pageLimit+" OFFSET "+getFrom+";", [], function(tx, result) {
                                  
                                  var len = result.rows.length;
                                  if(len > 0){
                                  
                                  var path='images/pests/fs_images';
                                  
                                  
                                  document.getElementById('galleryLinks').innerHTML ='<p>';
                                  for(var i=0;i<len; i++)
                                  {
                                  var item = result.rows.item(i);
                                  var fname = '';
								  fname = item['name'];
								  
								  if(fname.indexOf(' ')!= -1){
                                  fname = '['+fname+']';
                                  }
                                  document.getElementById('galleryLinks').innerHTML +=
                                  
                                  '<a href="#factsheet?fsname='+fname+'" class="portfolio_item floatGallery">'+
                                  '<img alt="'+item['imagecaption']+'" src="'+path+'/'+item['path']+'" title="'+item['name']+'"/>'+
                                  '<span>'+item['name']+'</span></a>';
                                  
                                  
                                  }
                                  document.getElementById('galleryLinks').innerHTML += '</p>';
                                  
                                  }
                                  });
                    }
                    else{
                    document.getElementById('galleryLinks').innerHTML += '<p>No Images found.</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>';
                    }
                    });
}



//FACTSHEET CONTENT
function getFactSheetIdByName(fsname) {
	db2.transaction(function(tx) {
                    tx.executeSql("select factsheetid from factsheet where name LIKE '"+fsname+"%' order by name asc;", [], function(tx, result) {
                                  var len = result.rows.length;
                                  var item = result.rows.item(0);
                                  if(len > 0){
                                  //document.getElementById('keyContent').innerHTML += '<br>FsID: '+item['factsheetid'];
                                  getById(item['factsheetid']);
                                  }
                                  });
                    });
}

function getById(id) {
	db2.transaction(function(tx) {
                    //document.getElementById('keyContent').innerHTML += '<br>';
                    tx.executeSql("SELECT factsheetid, name FROM factsheet WHERE factsheetid = "+id+";", [], function(tx, result) {
                                  var len = result.rows.length;
                                  var item = result.rows.item(0);
                                  if(len > 0){
                                  //document.getElementById('keyContent').innerHTML += 'FsID: '+item['factsheetid']+"; fsName: "+item['name']+"; date: "+item['inputdate'];
                                  //document.getElementById('keyContent').innerHTML += '';
                                  //getPreviousName(item['name']);
                                  //getNextName(item['name']);
                                  var fsName = item['name'];
                                  var fsNameForURL = item['name'];
                                  if(fsNameForURL.indexOf(' ')!= -1){
                                  fsNameForURL = '['+fsName+']';
                                  }
                                  getPreviousName(id,fsName);
                                  //getContentTitlesById(id,fsNameForURL);
                                  //getFactSheetImageDataById(id,fsNameForURL);
                                  }
                                  });
                    });
}

//******

function getPreviousName(id,name) {
	
	db2.transaction(function(tx) {
                    tx.executeSql("select factsheetid as previousFsID, name as prevFsName from factsheet where  name < '"+name+"%' order by name DESC;", [], function(tx, result) {
                                  var len = result.rows.length;
                                  
                                  if(len > 1){
                                  var item = result.rows.item(1);
                                  var previd = item['previousFsID'];
                                  var prevname = item['prevFsName'];
                                  getNextName(id,name,previd,prevname);
                                  
                                  }
                                  else{
                                  getNextName(id,name,-1,'none');
                                  
                                  
                                  }
                                  });
                    });
}

function getNextName(id,name,previd,prevname) {
	
	db2.transaction(function(tx) {
                    
                    tx.executeSql("select factsheetid as nextFsID, name as nextFsName from factsheet where name > '"+name+"%' order by name ASC;", [], function(tx, result) {
                                  var len = result.rows.length;
                                  
                                  if(len > 0){
                                  var item = result.rows.item(0);
                                  var nextid = item['nextFsID'];
                                  var nextname = item['nextFsName'];
                                  }
                                  
                                  else {
                                  var nextid = 0;
                                  var nextname = 'none';
                                  }
                                  
                                  
                                  //document.getElementById('keyContent').innerHTML = '<div data-role="controlgroup" id="fsbottomnavLinks" align="center">';
                                  
                                  if(prevname.indexOf(' ')!= -1){
                                  prevname = '['+prevname+']';
                                  }
                                  if(nextname.indexOf(' ')!= -1){
                                  nextname = '['+nextname+']';
                                  }
                                  var fsname = name;
                                  if(name.indexOf(' ')!= -1){
                                  name = '['+name+']';
                                  }
                                  
                                  $('#fsnavLinks').empty();
                                  if(prevname!='none'){
                            	  $('#fsnavLinks').append('<a class="button" href="#factsheet?fsname='+prevname+'" style="color:#F0F6E8; font-size:14px;font-family: Helvetica, Arial, sans-serif;">< Previous</a> ');
                                  }
                                  
                                  $('#fsnavLinks').append('<a class="button" href="#fsIndex" style="color:#F0F6E8; font-size:14px;font-family: Helvetica, Arial, sans-serif;">Fact Sheet Index</a> ');
                                  
                                  if(nextname!='none'){
                        		  $('#fsnavLinks').append('<a class="button" href="#factsheet?fsname='+nextname+'" style="color:#F0F6E8; font-size:14px;font-family: Helvetica, Arial, sans-serif;" >Next ></a> ');
                                  }
                                  
                                  $('#fsnavLinks').trigger('create');
                                  
                                  getContentTitlesById(id,fsname);
                                  getFactSheetImageDataById(id,name);
                                  
                                  $('#fsbottomnavLinks').empty();
                                  if(prevname!='none'){
                                  $('#fsbottomnavLinks').append('<a class="button" href="#factsheet?fsname='+prevname+'" style="color:#F0F6E8; font-size:14px;font-family: Helvetica, Arial, sans-serif;">< Previous</a> ');
                                  }
                                  
                                  $('#fsbottomnavLinks').append('<a class="button" href="#fsIndex" style="color:#F0F6E8; font-size:14px;font-family: Helvetica, Arial, sans-serif;">Fact Sheet Index</a> ');
                                  
                                  if(nextname!='none'){
                                  $('#fsbottomnavLinks').append('<a class="button" href="#factsheet?fsname='+nextname+'" style="color:#F0F6E8;font-family: Helvetica, Arial, sans-serif; font-size:14px;" >Next ></a> ');
                                  }
                                  
                                  $('#fsbottomnavLinks').trigger('create');
                                  
                                  });
                    });
}


//******




function getContentTitlesById(id,fsname) {
	
	
	db2.transaction(function(tx) {
				    //document.getElementById('keyContent').innerHTML += '<br>getContentByID..'+id+'.. ';
                    tx.executeSql("select title, content from factsheet "+
                                  "join factsheetcontent on factsheetcontent.factsheetid = factsheet.factsheetid "+
                                  "join factsheettitle on factsheettitle.titleid = factsheetcontent.titleid "+
                                  "where factsheet.name = '"+fsname+"' "+
                                  "order by factsheettitle.weight asc;", [], function(tx, result) {
                                  
                                  //document.getElementById('keyContent').innerHTML +='<div id="fscList" data-inset="true" data-role="collapsible-set" data-theme="e" data-content-theme="e" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u" data-iconpos="right" style="padding-left:10px; padding-right:10px; padding-top:6px;">';
                                  
                                  
                                  var len = result.rows.length;
                                  if(len > 0){
                                  
                                  $('#fscList').empty();
                                  var flag = 0;
                                  
                                  $('#fscList').append('<div data-role="collapsible"  data-collapsed="false"><h3>Citrus Pest Name</h3><p>'+
                                                       fsname+'</p></div>');
                                  
                                  $.each(result.rows,function(index){
                                         var row = result.rows.item(index);
                                         
                                         if(row['content'].trim()!=''){
                                         /*	if(flag == 0){
                                          $('#fscList').append('<div data-role="collapsible"  data-collapsed="false"><h3>'+row['title']+' </h3><p> '+row['content']+'</p></div>');
                                          flag=1;
                                          }
                                          else
                                          {
                                          */
                                         $('#fscList').append('<div data-role="collapsible"><h3>'+row['title']+' </h3><p> '+row['content']+'</p></div>');
                                         
                                         //}
                                         }
                                         
                                         });
                                  
                                  }
                                  
                                  //$('#fscList h3').removeClass('ui-corner.bottom');
                                  $('#fscList').append('</div>');
                                  $('#fscList').collapsibleset();
                                  //$('.ui-corners-all,.ui-corners-top').removeClass('ui-corners-all ui-corners-top');
                                  $('#fscList').trigger('create');
                                  
                                  
                                  });
                    });
}

function getFactSheetImageDataById(id,name) {
	
	db2.transaction(function(tx) {
                    
                    tx.executeSql("select factsheetimages.factsheetid, factsheetimages.imageid, factsheet.name,image.path,image.imagecaption,image.weight "+
                                  "from factsheetimages "+
                                  "inner join  factsheet on factsheetimages.factsheetid = factsheet.factsheetid "+
                                  "inner join  image on factsheetimages.imageid = image.imageid "+
                                  "where factsheetimages.factsheetid = "+id+" order by image.weight asc;", [], function(tx, result) {
                                  
                                  
                                  //document.getElementById('keyContent').innerHTML +='<ul data-theme="e" id="imageList" data-theme="f" data-inset="true"></ul>';
                                  
                                  
                                  
                                  var len = result.rows.length;
                                  if(len > 0){
                                  $('#imageList').empty();
                                  $('#imageList').append('<li><a href="#fsImage?fsname='+name+'" style="color:#F0F6E8">Image Gallery</a></li>');
                                  $('#imageList').listview();
                                  $('#imageList').listview("refresh");
                                  
                                  }
                                  });
                    });
}

//FACTSHEET IMAGES
function getFSImages(fsname) {
    
	db2.transaction(function(tx) {
		            tx.executeSql("select factsheetid from factsheet where name LIKE '"+fsname+"%' order by name asc;", [], function(tx, result) {
                                  var len = result.rows.length;
                                  var item = result.rows.item(0);
                                  if(len > 0){
                                  
                                  document.getElementById('cancelTop').innerHTML = '<a class="button" href="#factsheet?fsname='+fsname+'" style="color:#F0F6E8">Back</a>&nbsp;';
                                  getFSImagesLimitByPage(item['factsheetid']);
                                  document.getElementById('cancelBottom').innerHTML = '<a class="button" style="color:#F0F6E8" href="#factsheet?fsname='+fsname+'">Back</a>&nbsp;';
                                  $('#fsImageContent').trigger('create');
                                  }
                                  });
                    });
}

function getFSGallery(id) {
	console.log('gsFSGAllery');
	db2.transaction(function(tx) {
                    
                    tx.executeSql("SELECT COUNT(factsheetimages.imageid) as imagecount "+
                                  "FROM factsheetimages JOIN factsheet ON factsheetimages.factsheetid = factsheet.factsheetid "+
                                  "JOIN image on factsheetimages.imageid = image.imageid "+
                                  "where factsheet.factsheetid= "+id+" order by image.weight asc;", [], function(tx, result) {
                                  var len = result.rows.length;
                                  if(len > 0){
                            	  var item = result.rows.item(0);
                                  var totalCount = item['imagecount'];
                                  var pageLimit = 24;
                                  getFSPageNoLinks(0, pageLimit, totalCount);
                                  getFSImagesLimitByPage(0, id, pageLimit);
                                  if(len<=3)
                                  document.getElementById('fsGalleryLinks').innerHTML += '<p>&nbsp;</p>'
                                  getFSPageNoLinksFooter(0, pageLimit, totalCount);
                                  }
                                  });
                    
                    
                    });
}

function getFSPageNoLinks(pageNo, pageLimit, totalCount){
	db2.transaction(function(tx) {
                    var numPages = Math.ceil(totalCount/pageLimit);
                    var i;
                    
                    if(numPages>1){
                    document.getElementById('fsGalleryPageLinks').innerHTML ='<p>';
                    
                    if(pageNo > 0)
                    document.getElementById('fsGalleryPageLinks').innerHTML += '<a class="button" href="" style="color:#F0F6E8;  width:12px"><</a>&nbsp;';
                    for(i=1;i<=numPages;i++)
                    document.getElementById('fsGalleryPageLinks').innerHTML += '<a class="button" href="" style="color:#F0F6E8;  width:12px">'+i+'</a>&nbsp;';
                    
                    if(pageNo < numPages-2)
                    document.getElementById('fsGalleryPageLinks').innerHTML += '<a class="button" href="" style="color:#F0F6E8;  width:12px">></a>';
                    
                    document.getElementById('fsGalleryPageLinks').innerHTML += '</p>';
                    }
                    
                    });
}


function getFSPageNoLinksFooter(pageNo, pageLimit, totalCount){
	db2.transaction(function(tx) {
                    var numPages = Math.ceil(totalCount/pageLimit);
                    var i;
                    if(numPages>1){
                    document.getElementById('fsGalleryPageFooterLinks').innerHTML ='<p>';
                    
                    if(pageNo > 0)
                    document.getElementById('fsGalleryPageFooterLinks').innerHTML += '<a class="button" href="" style="color:#F0F6E8;  width:12px" ><</a>&nbsp;';
                    for(i=1;i<=numPages;i++)
                    document.getElementById('fsGalleryPageFooterLinks').innerHTML += '<a class="button" href="" style="color:#F0F6E8;  width:12px" >'+i+'</a>&nbsp;';
                    
                    if(pageNo < numPages-2)
                    document.getElementById('fsGalleryPageFooterLinks').innerHTML += '<a class="button" href="" style="color:#F0F6E8;  width:12px" >></a>';
                    
                    document.getElementById('fsGalleryPageFooterLinks').innerHTML += '</p>';
                    
                    }
                    });
}


function getFSImagesLimitByPage(id){
	db2.transaction(function(tx) {
                    
                    tx.executeSql("select factsheetimages.factsheetid, factsheetimages.imageid, factsheet.name,image.path,image.imagecaption,image.weight "+
                                  "from factsheetimages "+
                                  "inner join  factsheet on factsheetimages.factsheetid = factsheet.factsheetid "+
                                  "inner join  image on factsheetimages.imageid = image.imageid "+
                                  "where factsheetimages.factsheetid = "+id+" order by image.weight asc;", [], function(tx, result) {
                                  
                                  var len = result.rows.length;
                                  if(len > 0){
                                  var path='images/pests/fs_images';
                                  
                                  document.getElementById('fsGalleryLinks').innerHTML ='<p>';
								  for(var i=0;i<len; i++)
                                  {
                                  var item = result.rows.item(i);
                                  var caption = item['imagecaption'].trim();
                                  if(caption.length > 20){
                                  caption = caption.substr(0,20);
                                  caption = caption.substr(0,caption.lastIndexOf(' '))+'..';
                                  }
                                  document.getElementById('fsGalleryLinks').innerHTML +=
                                  '<a href="images/pests/fs_images/'+item['path']+'" rel="external" class="portfolio_item floatFSGallery">'+
                                  '<img src="images/pests/fs_images/'+item['path']+'" alt="'+item['imagecaption']+'" />'+
                                  '<span>'+caption+'</span></a>';
                                  }
                                  document.getElementById('fsGalleryLinks').innerHTML += '</p>';
                                  
                                  
                                  }
                                  });
                    });
}


//FACTSHEETS
function setFactsheetCharList() {
	var first = "a", last = "z";
	//alert("set factsheet charlist");
	document.getElementById('factsheetIndex').innerHTML += '<p><div align="center" id="factsheetLinks"></div>';
    
	for(var i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
		var ch=  eval("String.fromCharCode(" + i + ")");
		queryFactsheetList(ch);
	}
	
	document.getElementById('factsheetLinks').innerHTML += '</p>';
    document.getElementById('factsheetIndex').innerHTML += '<p><div align="center" id="fsLinks" style="margin-left:15px;margin-right:15px;"></div>';
	
	for(var i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
		var ch=  eval("String.fromCharCode(" + i + ")");
		getFactsheetNames(ch);
	}
}

function queryFactsheetList(ch){
	//var db2 = openDatabase('cpests', '1.0', 'Citrus Pests DB', 5000000);
	
	db2.transaction(function(tx)
                    {
                    tx.executeSql("select * from factsheet where name LIKE '"+ch+"%' order by name asc;", [], function(tx, result)
                                  {
                                  var len = result.rows.length;
                                  if(len > 0)
                                  document.getElementById('factsheetLinks').innerHTML += '<a class="button" href="#'+ch+'_factsheet" style="color:#F0F6E8;  width:12px" data-ajax="false">'+ch+'</a> ';
                                  //alert(ch);
                                  });
                    });
}



function getFactsheetNames(ch) {
	//var db2 = openDatabase('cpests', '1.0', 'Citrus Pests DB', 5000000);
	db2.transaction(function(tx) {
                    tx.executeSql("select * from factsheet where name LIKE '"+ch+"%' order by name asc;", [], function(tx, result) {
                                  var len = result.rows.length;
                                  if(len > 0)
                                  {
                                  document.getElementById('fsLinks').innerHTML += '<a name="'+ch+'_factsheet"></a>';
                                  var ulname = ch+'factsheetUL';
                                  document.getElementById('fsLinks').innerHTML += '<ul id="'+ulname+'" data-role="listview" data-theme="f" data-inset="true" data-divider-theme="e">';
                                  document.getElementById(ulname).innerHTML += '<li data-role="list-divider"><font style="color:#f0f6e8;">'+ch+'</font></li>';
                                  for (var i = 0, item = null; i < result.rows.length; i++) {
                                  var item = result.rows.item(i);
                                  var fname = '';
                                  fname = item['name'];
                                  if(fname.indexOf(' ')!= -1){
                                  fname = '['+fname+']';
                                  }
                                  document.getElementById(ulname).innerHTML += '<li><a href="#factsheet?fsname='+fname+'" style="color:#335C32">'+item['name']+'</a></li>';
                                  }
                                  document.getElementById(ulname).innerHTML += '</ul>';
                                  }
                                  
                                  });
                    });
}


//GLOSSARY
function setGlossaryCharList() {
	var first = "a", last = "z";
	document.getElementById('glossaryContent').innerHTML += '<p><div align="center" id="glossaryLinks"></div>';
	
	for(var i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
		var ch=  eval("String.fromCharCode(" + i + ")");
		queryGlossaryList(ch);
	}
	document.getElementById('glossaryLinks').innerHTML += '</p>';
	document.getElementById('glossaryContent').innerHTML += '<p><div align="center" id="glossaryText" style="margin-left:15px;margin-right:15px;"></div>';
    
	for(var i = first.charCodeAt(0); i <= last.charCodeAt(0); i++) {
		var ch=  eval("String.fromCharCode(" + i + ")");
		getGlossaryContent(ch);
		
	}
    
}

function queryGlossaryList(ch){
	//var db2 = openDatabase('cpests', '1.0', 'Citrus Pests DB', 5000000);
	db2.transaction(function(tx) {
                    tx.executeSql("select * from glossary where term LIKE '"+ch+"%' order by term asc;", [], function(tx, result) {
                                  var len = result.rows.length;
                                  if(len > 0)
                                  document.getElementById('glossaryLinks').innerHTML += '<a class="button" href="#'+ch+'_glossary" style="color:#f0f6e8;  width:12px;" data-ajax="false">'+ch+'</a> ';
                                  });
                    });
	
}


function getGlossaryContent(ch) {
	//var db2 = openDatabase('cpests', '1.0', 'Citrus Pests DB', 5000000);
	
	db2.transaction(function(tx) {
                    tx.executeSql("select * from glossary where term LIKE '"+ch+"%' order by term asc;", [], function(tx, result) {
                                  var len = result.rows.length;
                                  if(len > 0)
                                  {
                                  document.getElementById('glossaryText').innerHTML += '<a name="'+ch+'_glossary"></a>';
                                  var ulname = ch+'glossaryUL';
                                  document.getElementById('glossaryText').innerHTML += '<ul id="'+ulname+'" data-role="listview" data-theme="f" data-inset="true" style="padding-bottom:10px;padding:top:5px;">';
                                  
                                  for (var i = 0, item = null; i < result.rows.length; i++) {
                                  var item = result.rows.item(i);
                                  document.getElementById(ulname).innerHTML += '<li><font style="color:#335C32">'+item['term']+'</font>: '+item['description']+'</li>';
                                  
                                  }
                                  document.getElementById(ulname).innerHTML += '</ul>';
                                  }
                                  });
                    });}

//*********************************************************************************************************************
//*********************************************************************************************************************

//SEARCH FACT SHEETS



function searchFactSheets(){
	db2.transaction(function(tx) {
                    
                    var allVals = new Array();
                    var i=0;
                    $('[name=topicCriteria]:checked').each(function() {
                                                           allVals[i]=$("label[for=" + $(this).attr('id') + "]").text().trim();
                                                           i++;
                                                           });
                    
                    var sTerms = $('[name=terms]').val();
                    var searchTerms='';
                    searchTerms = sTerms.replace(/ /, '%');
                    
                    var topicQuery ="";
					if(allVals.length>0){
                    topicQuery +="(";
                    for(var j=0;j<allVals.length;j++){
                    topicQuery += "fst.title like '"+allVals[j]+"'";
                    if(j < (allVals.length-1))
                    topicQuery += ' OR ';
                    }
                    topicQuery += ") and ";
                    }
                    
                    if(allVals.length == 0)
                    topicQuery = "";
                    
                    $('#searchMsg').empty();
                    $('#searchUL').empty();
                    
                    if(sTerms.length ==0){
                    $('#searchMsg').append('<center><p>Please enter a search term!</p></center>');
                    }
                    else{
                    tx.executeSql("select fs.factsheetid, fs.name, fst.title "+
                                  "from factsheet fs, factsheetcontent fsc, factsheettitle fst "+
                                  "where "+topicQuery+" fs.factsheetid=fsc.factsheetid and fst.titleid = fsc.titleid and "+
                                  "fsc.content like '%"+searchTerms+"%';", [], function(tx, result) {
                                  var len = result.rows.length;
                                  
                                  
                                  if(len>0){
                                  
                                  var fsNameFirst ='';
                                  var fsIDFirst = -1;
                                  var fsTitles = new Array();
                                  var titleIndex =0;
                                  
                                  for(var k=0;k<len;k++){
                                  var item = result.rows.item(k);
                                  
                                  if(fsNameFirst == item['name']){
                                  fsTitles[titleIndex++] = item['title'];
                                  }
                                  else{
                                  if(fsNameFirst!=''){
                                  sendSearchResultsForName(fsNameFirst,fsIDFirst,fsTitles,sTerms);
                                  }
                                  fsNameFirst = item['name'];
                                  fsIDFirst = item['factsheetid'];
                                  titleIndex = 0;
                                  fsTitles = new Array();
                                  fsTitles[titleIndex++] = item['title'];
                                  
                                  }
                                  
                                  
                                  }
                                  
                                  sendSearchResultsForName(fsNameFirst,fsIDFirst,fsTitles,sTerms);
                                  $('#searchUL').listview();
                                  $('#searchUL').listview("refresh");
                                  
                                  //document.getElementById('searchUL').innerHTML +='</ul>';
                                  
                                  }
                                  else{
                                  $('#searchMsg').append('<center><p>No search results found. Try again!</p></center>');
                                  }
                                  
                                  
                                  });
                    }
                    });
}


function sendSearchResultsForName(fsname,fsIDFirst,fsTitles,sTerms){
	
	
	db2.transaction(function(tx) {
                    tx.executeSql("SELECT image.path,image.imagecaption, factsheetcontent.content, image.weight "+
                                  "FROM factsheetimages "+
                                  "inner join  factsheet on factsheetimages.factsheetid = factsheet.factsheetid "+
                                  "inner join  image on factsheetimages.imageid = image.imageid "+
                                  "inner join  factsheetcontent on factsheet.factsheetid = factsheetcontent.factsheetid "+
                                  "inner join  factsheettitle on factsheetcontent.titleid = factsheettitle.titleid "+
                                  "WHERE factsheetimages.factsheetid = "+fsIDFirst+" and factsheettitle.title like '"+fsTitles[0]+"%' "+
                                  "ORDER BY image.weight;", [], function(tx, result) {
                                  
                                  var item = result.rows.item(0);
                                  var path='images/pests/fs_images';
                                  // var fsname = item['name'];
                                  var fspath = path+'/'+item['path'];
                                  var imgCaption = item['imagecaption'];
                                  var fscontent = item['content'];
                                  var newContent = '';
                                  var pos = 0;
                                  //console.log(fsname+" *********** "+fscontent);
                                  if(fscontent.length>150){
                                  
                                  pos = fscontent.toLowerCase().indexOf(sTerms.toLowerCase());
                                  
                                  if(pos>10)
                                  {
                                  newContent = fscontent.substr(pos-10,150);//pos-10
                                  newContent = newContent.substr(newContent.indexOf(' '), 150);
                                  }
                                  else
                                  newContent = fscontent.substr(0,150);//pos-10
                                  
                                  newContent = newContent.substr(0, newContent.lastIndexOf(' '));
                                  
                                  }
                                  else
                                  {
                                  newContent = fscontent.trim();
                                  pos = fscontent.toLowerCase().indexOf(sTerms.toLowerCase());
                                  if(pos>10)
                                  {
                                  newContent = fscontent.substr(pos-10,150);//pos-10
                                  newContent = newContent.substr(newContent.indexOf(' '), 150);
                                  }
                                  else
                                  newContent = fscontent.substr(0,150);//pos-10
                                  
                                  newContent = newContent.substr(0, newContent.lastIndexOf(' ')).trim();
                                  
                                  
                                  }
                                  
                                  
                                  var liReg = new RegExp("<li>",'gi');
                                  newContent=newContent.replace(liReg,"");
                                  
                                  var li_Reg = new RegExp("</li>",'gi');
                                  newContent=newContent.replace(li_Reg,"");
                                  
                                  var ulReg = new RegExp("<ul>",'gi');
                                  newContent=newContent.replace(ulReg,"");
                                  
                                  var ul_Reg = new RegExp("</ul>",'gi');
                                  newContent=newContent.replace(ul_Reg,"");
                                  
                                  var pReg = new RegExp("<p>",'gi');
                                  newContent=newContent.replace(pReg,"");
                                  
                                  var p_Reg = new RegExp("</p>",'gi');
                                  newContent=newContent.replace(p_Reg,"");
                                  
                                  var tableReg = new RegExp("<table>",'gi');
                                  newContent=newContent.replace(tableReg,"");
                                  
                                  var thReg = new RegExp("<th>",'gi');
                                  newContent=newContent.replace(thReg,"");
                                  
                                  var th_Reg = new RegExp("</th>",'gi');
                                  newContent=newContent.replace(th_Reg,"");
                                  
                                  var tdReg = new RegExp("<td>",'gi');
                                  newContent=newContent.replace(tdReg,"");
                                  
                                  var td_Reg = new RegExp("</td>",'gi');
                                  newContent=newContent.replace(td_Reg,"");
                                  
                                  var trReg = new RegExp("<tr>",'gi');
                                  newContent=newContent.replace(trReg,"");
                                  
                                  var tr_Reg = new RegExp("</tr>",'gi');
                                  newContent=newContent.replace(tr_Reg,"");
                                  
                                  var brReg = new RegExp("<br>",'gi');
                                  newContent=newContent.replace(brReg,"");
                                  
                                  var h4Reg = new RegExp("<h4>",'gi');
                                  newContent=newContent.replace(h4Reg,"");
                                  
                                  var h4_Reg = new RegExp("</h4>",'gi');
                                  newContent=newContent.replace(h4_Reg,"");
                                  
                                  var h6_Reg = new RegExp("</h6>",'gi');
                                  newContent=newContent.replace(h6_Reg,"");
                                  
                                  var h6Reg = new RegExp("<h6>",'gi');
                                  newContent=newContent.replace(h6Reg,"");
                                  
                                  var rReg = new RegExp("\r",'gi');
                                  newContent=newContent.replace(rReg,"");
                                  
                                  var nReg = new RegExp("\n",'gi');
                                  newContent=newContent.replace(nReg,"");
                                  
                                  var emReg = new RegExp("<em>",'gi');
                                  newContent=newContent.replace(emReg,"");
                                  
                                  var em_Reg = new RegExp("<\em>",'gi');
                                  newContent=newContent.replace(em_Reg,"");
                                  
                                  
                                  var myRegExp = new RegExp(sTerms,'gi');
                                  newContent=newContent.replace(myRegExp,'<span class="yellow-highlight">'+sTerms+'</span>');
                                  
                                  
                                  var titles = '';
                                  for(var tIndex =0;tIndex < fsTitles.length;tIndex++){
                                  titles +=  fsTitles[tIndex];
                                  if(tIndex+1<fsTitles.length)
                                  titles +=', '
                                  }
                                  //console.log(fsname+" ****** "+fspath+" *** "+imgCaption+" *** "+titles+" *** "+newContent);
                                  
                                  $('#searchUL').append('<li><a href="#factsheet?fsname='+fsname+'"><img src="'+fspath+'" alt="'+imgCaption+'" style="padding-top:3px; padding-left:2px;" width="100%" height="100%" /> <h3 style="color:#f0f6e8">'+fsname+'</h3><p style="color:#f0f6e8"><b>'+titles+'</b> <br>'+newContent+'</p></li>');
                                  $('#searchUL').listview();
                                  $('#searchUL').listview("refresh");
                                  
                                  });
                    
                    });
	
}


//***********************************************************************************************


function searchImagesByFSID(fsID, allVals, content) {
	
	db2.transaction(function(tx) {
                    tx.executeSql("SELECT factsheetimages.factsheetid, factsheet.name,image.path,image.imagecaption,factsheetimages.factsheetimageid "+
                                  "FROM factsheetimages "+
                                  "inner join  factsheet on factsheetimages.factsheetid = factsheet.factsheetid "+
                                  "inner join  image on factsheetimages.imageid = image.imageid "+
                                  "WHERE factsheetimages.factsheetid = "+fsID+" "+
                                  "ORDER BY image.weight;", [], function(tx, result) {
                                  
                                  var item = result.rows.item(0);
                                  var path='images/pests/fs_images';
                                  var fsname = item['name'];
                                  var fspath = path+'/'+item['path'];
                                  var imgCaption = item['imagecaption'];
                                  
                                  
                                  document.getElementById('searchUL').innerHTML += '<li data-theme="e" class="ui-btn ui-btn-icon-right ui-li ui-li-has-alt ui-li-has-thumb ui-btn-up-e"><div class="ui-btn-inner ui-li ui-li-has-alt"><div class="ui-btn-text"><a href="#factsheet?fsname='+fsname+'" class="ui-link-inherit">'+
                                  
                                  '<figure><img src="'+fspath+'" alt="'+item['imagecaption']+'" /><figcaption>'+fsname+'</figcaption></figure>'+
                                  '<h3 class="ui-li-heading">'+fsname+'</h3>'+
                                  '<p class="ui-li-desc">'+content+'</p>'+
                                  '</a></div></div>'+
                                  '<a href="lists-split-purchase.html" data-rel="dialog" data-transition="slideup" title="Purchase album" class="ui-li-link-alt ui-btn ui-btn-up-e" data-theme="e"><span class="ui-btn-inner"><span class="ui-btn-text"></span><span title="" data-theme="e" class="ui-btn ui-btn-up-e ui-btn-icon-notext ui-btn-corner-all ui-shadow"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text"></span><span class="ui-icon ui-icon-gear ui-icon-shadow"></span></span></span></span></a></li>';
                                  
                                  
                                  });
                    });
}



function GetAllTopicTitles() {
	db2.transaction(function(tx) {
                    document.getElementById('testContent').innerHTML = '<h3>Test</h3><br>';
                    
                    var fsname= 'Anthracnose';
                    
                    tx.executeSql("SELECT factsheettitle.title FROM factsheettitle "+
                                  "INNER JOIN factsheetcontent ON factsheettitle.titleid = factsheetcontent.titleid "+
                                  "INNER JOIN factsheet ON factsheetcontent.factsheetid = factsheet.factsheetid "+
                                  "WHERE factsheet.name like '"+fsname+"%';", [], function(tx, result) {
                                  
                                  document.getElementById('testContent').innerHTML += 'Test1..<br>';
                                  
                                  var len = result.rows.length;
                                  document.getElementById('testContent').innerHTML = '<h3>Test</h3><br>';
                                  
                                  if(len > 0){
                                  for(var i=0;i<len;i++){
                                  var item = result.rows.item(i);
                                  document.getElementById('testContent').innerHTML += item['title']+'<br>';
                                  
                                  //item['title']
                                  }
                            	  }
                                  });
                    });
}


