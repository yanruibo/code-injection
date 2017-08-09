





var _gaq = _gaq || [];

var deviceInfo = function() {
    /*
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("pg_init").innerHTML=(new Date().getTime());
    */

    console.log("PG Init");

    if (device.uuid == "a9231e9976ee4338") myPhone();


};



function myPhone()
{
    alert("On my phone!");
}


var preventBehavior = function(e) {
    e.preventDefault();
};


function fail(msg) {
    alert(msg);
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}

$( document ).delegate("#main_page", "pageinit",function(event){ 
    // $("#jqm_init").html(new Date().getTime());

    $.mobile.allowCrossDomainPages = true;
    $.support.cors = true;

    console.log("jQuery Mobile Home page Init");


    refresh_book();
                               
                               });



function refresh_book()
          {

            
            console.log("Logging a refresh event");

            var jqxhr = $.getJSON("http://kdotd.s3-website-us-east-1.amazonaws.com/dotd_es.jsonp?callback=?", {dataType: 'jsonp'});
              
          }


function dotd(deals)
    { 
        console.log("Processing JSONP call results");
        console.log(deals);


        {   
            var i=0;


            var deal_HTML='';

            $('#cset').html("");

            for (deal_index in deals.ITEMS)

            {

            var deal=deals.ITEMS[deal_index];

            var font_size_for_name = (deal.NAME.length>30)?"50":"100";

            var deal_HTML = '<div data-role="collapsible" data-collapsed="'+(i!=0)+'">\n';
 
            deal_HTML += '\t<h3>'+deal.PROGRAM+'</h3>\n';
            deal_HTML += '<div id="deal-'+i+'" class="center-wrapper">\n';

            deal_HTML += '<fieldset class="ui-grid-a">';

            deal_HTML += '<div class="ui-block-a"><div id="book_image">';

            deal_HTML += '<a rel="external" data-ajax="false" href="'+deal.SHORT_URL+'"><img src='+deal.IMG_URL+'></a>\n'
            deal_HTML += '</div>\n';
            deal_HTML += '</div>\n';     

            deal_HTML += '<div class="ui-block-b"><h2><a rel="external" data-ajax="false" href="'+deal.SHORT_URL+'" style="font-size:'+font_size_for_name+'%;">'+deal.NAME+'</a></h2>\n';
            deal_HTML += '<p class="product_price"><strong style="color:#900">'+deal.PRICE;
            
            if (deal.DISCOUNT) deal_HTML += ' ('+deal.DISCOUNT+')';
            
            deal_HTML += '</strong></p>';

            var bBOOK = (deal.PROGRAM.indexOf('Kindle') !== -1); 

            deal_HTML += '<a href="'+deal.SHORT_URL+'" data-mini="'+bBOOK+'" class="buy_on_amazon" data-role="button" data-inline="true" data-theme="e" data-ajax="false" data-rel="external">Comprar</a>\n';
            deal_HTML += '</div>\n';     

            deal_HTML += '</fieldset>';

            deal_HTML += '<p id="product_descr" style="text-align: left;"><small>'+deal.DESCR+'</small></p>\n';


            deal_HTML += '</div>\n';     

            deal_HTML += '</div>\n';  

            $('#cset').append(deal_HTML);

            i++;
            
            }   



            console.log(deal_HTML);

            $('#cset').collapsibleset('refresh');
            // $('.buy_on_amazon').button('refresh');
            $('.buy_on_amazon').button();

/*
            $font_size_for_name = ($deal.NAME.length>40)?"70":"100";

            $('#main_page h2').html('<a rel="external" data-ajax="false" href="'+$deal.URL+'" style="font-size:'+$font_size_for_name+'%;">'+$deal.NAME+'</a>');
            
            $('#main_page #book_image').html('<a rel="external" data-ajax="false" href="'+$deal.URL+'"><img src='+$deal.IMG_URL+'></a>');
            
            $('#main_page #product_price').html("<strong style='color:#900'>"+$deal.PRICE+" ("+$deal.DISCOUNT+")</strong>");
            
            $('#main_page #product_descr').html("<small>"+$deal.DESCR+"</small>");

            $('#main_page .buy_on_amazon').attr( "href" , $deal.URL);
            
            
            $DOTD_EXTERNAL_PAGE_URL = $deal.DOTD_EXTERNAL_PAGE_URL;*/
        }       
    }









