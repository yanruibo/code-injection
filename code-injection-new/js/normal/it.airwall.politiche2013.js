






















                    function popolaListaComuni(data){
                        
                        var options = $('#comune');
                        
                        options
                            .find('option')
                            .remove()
                            .end();
                            
                        for(var i=0; i<data.length; i++){

                            konsole.log(data[i]);

                            var v = data[i][0]; 
                            var l = data[i][2]; 

                            options.append($("<option />").val(l).text(v));
                        }

                        options.selectmenu("refresh");
                        $.mobile.hidePageLoadingMsg(); 
                    }
                    
                    $("#provincia").bind( "change", function(event, ui) {                        
                        
                        var provincia = $("#provincia").val();
                        $.mobile.showPageLoadingMsg(); 
                        var cache = getCache("cache_comuni_"+provincia);
                        if(isNull(cache))
                        {
                            $.getJSON(
                                "http://www.eleonline.it/site/modules.php?name=Comuni&file=comuni&pr="+provincia+"&callback=?", 
                                {},
                                function(data)
                                {

                                    setCache("cache_comuni_"+provincia, JSON.stringify(data));
                                    popolaListaComuni(data);

                                }
                            );
                        }else popolaListaComuni(JSON.parse(cache));
                    });
    
                    $("#realtime").click(function(e){
                        if($("#comune").val()=="none"){
                            alert("Seleziona una provincia, quindi un comune. ");
                        }else{
                            
                            //gestisci la schiusura
                            window.plugins.childBrowser.onLocationChange = function(loc){ if (loc.indexOf("backtoapp.html") >= 0) { window.plugins.childBrowser.close(); }}
                                
                            //apri browser
                            window.plugins.childBrowser.showWebPage($("#comune").val(),
                                { showLocationBar: false, showNavigationBar: true, showAddress: false });
                        }
                    });
                












                var ajaxOK = false; //viene messa a true al termine del caricamento. 
                $('#load_more_appuntamenti').click(function(e){
                                        //the user is within 150px of the bottom of the page
                    if (ajaxOK === true) {

                        ajaxOK = false;

                        var appuntamenti_page = 1; 
                        if(!isNull(getParameter("appuntamenti_page"))){
                            appuntamenti_page = parseInt(getParameter("appuntamenti_page"), 10);
                        }
                        appuntamenti_page = appuntamenti_page + 1; 
                        setParameter("appuntamenti_page", appuntamenti_page);

                        konsole.log("loading altri appuntamenti... page "+appuntamenti_page);

                        getAppuntamenti(); 
                    }
                    
                });
                
















                $("#item_sondaggi").unbind('click');
                $("#item_spoglio").unbind('click');
                $("#item_sondaggi").click(function(e){
                    setParameter("is_sondaggio_page", true);
                    setParameter("index_currentpage", "sondaggi");
                    $("#index_content").html($("#sondaggi_content").html());
                    generateSondaggioPage();
                });
                $("#item_spoglio").click(function(e){
                    setParameter("is_sondaggio_page", false);
                    setParameter("index_currentpage", "risultati");
        
                    if(isNull("index_spoglio"))
                        setParameter("index_spoglio", "cc");
                    
                    $("#index_content").html($("#spoglio_content").html());
                    getSpoglio(getParameter("index_spoglio")); 
                });
            
















                        
                        function showGraficoParole(parola){
                            
                            if(parola!="none"){
                                
                                $.mobile.showPageLoadingMsg(); 
                                $("#chart_hotwords").html("");
                                
                                $.getJSON(
                                    serviceURL+"Stats/getUseOfVerbs?idPolitico="+getParameter("p")+"&lemma_oggetto="+parola+"&callback=?&outputFormat=JSON", 
                                    {},
                                    function(data)
                                    {
                                        var plot = $.jqplot('chart_hotwords',[data.content],{
                                            //title: parola,
                                            seriesColors: [ "#EC0023", "#269926", "#992667", "#BF7130", "#FF9640", "#39E639", "#A43DD4", "#E6399B" ],
                                            axes:{
                                                yaxis: {min:0, max: 100, numberTicks: 5},
                                                xaxis: {min:0, max: 100, numberTicks: 5}
                                            },
                                            seriesDefaults:{
                                                renderer: $.jqplot.BubbleRenderer,
                                                rendererOptions: {
                                                    bubbleGradients: false
                                                },
                                                shadow: true
                                            }
                                        }).show;
                                        
                                        $.mobile.hidePageLoadingMsg(); 
                                        
                                    }
                                );
                                
                            }
                        }
                        
                    

                var ajaxOK = false; //viene messa a true al termine del caricamento. 
                $('#candidato_load_more_tweets').click(function(e){
                    //the user is within 150px of the bottom of the page
                    if (ajaxOK === true) {

                        ajaxOK = false;

                        var twitter_page = 1; 
                        if(!isNull(getParameter("twitter_page"))){
                            twitter_page = parseInt(getParameter("twitter_page"), 10);
                        }
                        twitter_page = twitter_page + 1; 
                        setParameter("twitter_page", twitter_page);

                        konsole.log("loading altri tweets... page "+twitter_page);

                        getCandidatoTweets(getParameter("t")); 
                    }
                });
                












                var ajaxOK = false; //viene messa a true al termine del caricamento. 
                $('#load_more_tweets').click(function(e){
                    //the user is within 150px of the bottom of the page
                    if (ajaxOK === true) {

                        ajaxOK = false;

                        var twitter_page = 1; 
                        if(!isNull(getParameter("twitter_page"))){
                            twitter_page = parseInt(getParameter("twitter_page"), 10);
                        }
                        twitter_page = twitter_page + 1; 
                        setParameter("twitter_page", twitter_page);

                        konsole.log("loading altri tweets... page "+twitter_page);

                        getTweets(); 
                    }
                });
                













var serviceURL = "http://www.ciaocrossclub.mobi/Politiche2013/public/";
if (env === 'dev') {
    serviceURL = "http://localhost:8888/Politiche2013/WebService/public/";
}

function showRemoteMessage(content){
    if(content != "null" && content != null && content.length > 0){
        $('#remote_msg').html(content);
        $('#remote_msg_div').fadeIn();
    }
}
function getRemoteMessage(){    
        
    if(isNull(getCache("cache_remote_message")))
    {
        $.getJSON(
            serviceURL+"index/remoteMessage?callback=?&outputFormat=JSON", 
            {
                ver: appVersion
            },
            function(data) 
            {            
                setCache("cache_remote_message", data.content);
                showRemoteMessage(data.content);                
            }
        );
            
    }else showRemoteMessage(getCache("cache_remote_message")); 
}

function showLastSondaggio(content){
    
    if(content.length > 0){
       
        $('#chart3_title').html(content[0].titolo);
        //$('#chart3_data').html("<small>Sondaggio del <b>" + content[0].datetime + "</b></small>");
        $('#chart3_entefonte').html("<small><b>Aggiornato al</b>: " + content[0].datetime + "<br/><b>Ente</b>: " + content[0].ente + "<br/><b>Fonte</b>: " + content[0].fonte+"</small>");

        var arr = content[0].risultati; //[['PD', 30],['FLI', 29], ['PDL', 31], ['M5S', 10]];

        var nrows = arr.length; 
        if(nrows > 7){
            nrows = nrows / 2; 
        }

        var plot8 = $.jqplot('chart3', [arr], {
            grid: {
                drawBorder: false, 
                drawGridlines: false,
                background: 'transparent',
                shadow:false
            },
            axesDefaults: {

            },
            seriesDefaults:{
                renderer:$.jqplot.PieRenderer,
                rendererOptions: {
                    showDataLabels: true,
                    highlightMouseOver: false,
                    highlightMouseDown: false,
                    highlightColor: null
                }
            },
            //seriesColors: ['#FF6633', '#002EB8', '#3366FF', '#000000']
            legend: {
                placement: 'inside', 
                show: true,
                rendererOptions: {
                    numberRows: nrows
                },
                location: 's'
            }
        }); 
    }
    
    $.mobile.hidePageLoadingMsg(); 
    
}

var current_sondaggio_date = null; 
function getLastSondaggio(){    
    
    $.mobile.showPageLoadingMsg(); 
    
    var cache = getCache("cache_last_sondaggio");     
    if(isNull(cache))
    {
        $.getJSON(
            serviceURL+"sondaggi/getLast?callback=?&outputFormat=JSON", 
            {},
            function(data) 
            {
                setCache("cache_last_sondaggio", JSON.stringify(data.content));
                                
                if(data.content.length>0){
                    current_sondaggio_date = data.content[0].datetime_raw;
                    konsole.log(current_sondaggio_date);
                    showLastSondaggio(data.content);                   
                }else $.mobile.hidePageLoadingMsg(); 
            }
        );
            
    }else showLastSondaggio(JSON.parse(cache)); 
}

function getPrecSondaggio(){   
    
    if(current_sondaggio_date!=null){        
        $.mobile.showPageLoadingMsg(); 
        $.getJSON(
            serviceURL+"sondaggi/getPrec?date="+current_sondaggio_date+"&callback=?&outputFormat=JSON", 
            {},
            function(data) 
            {
                console.log(data.content);
                if(data.content.length==0){
                    alert("Nessun sondaggio precedente. ");
                    $.mobile.hidePageLoadingMsg(); 
                }
                else{
                    $('#chart3').html("");
                    $('#chart3_legend').html("");
                    current_sondaggio_date = data.content[0].datetime_raw;
                    showLastSondaggio(data.content);      
                }
                          
            }
        );
    }
}

function getNextSondaggio(){
    if(current_sondaggio_date!=null){
        $.mobile.showPageLoadingMsg(); 
        $.getJSON(
            serviceURL+"sondaggi/getNext?date="+current_sondaggio_date+"&callback=?&outputFormat=JSON", 
            {},
            function(data) 
            {                
                if(data.content.length==0){
                    alert("Nessun sondaggio più recente. ");
                    $.mobile.hidePageLoadingMsg(); 
                }
                else{
                    $('#chart3').html("");
                    $('#chart3_legend').html("");
                    current_sondaggio_date = data.content[0].datetime_raw;
                    showLastSondaggio(data.content);      
                }            
            }
        );
    }    
}

function showSpoglio(content, mode){
    
    //genera select se non presente
    if($('#spoglioselect_container').html().length == 0){
        
        $('#spoglioselect_container').html('<select name="spoglioselect" id="spoglioselect">'+
               '<option value="cc">Camera - Coalizioni</option>'+
               '<option value="sc">Senato - Coalizioni</option>'+
               '<option value="cp">Camera - Partiti</option>'+
               '<option value="sp">Senato - Partiti</option>'+
            '</select>');
        
        $('#spoglioselect_container').trigger("create");
        //$("#spoglioselect").selectmenu('refresh', true);

        //rigenera l'oggetto dal momento che viene visualizzato in un secondo momento
        //$("#spoglioselect").select();
        //$("#spoglioselect").unbind('change');
        $("#spoglioselect").bind( "change", function(event, ui) {    
            //alert("change");
            setParameter("index_spoglio", $("#spoglioselect").val());
            getSpoglio($("#spoglioselect").val()); 
        });
    }
    
    $('#spoglioselect').val(mode);
    //il refresh è in fondo alla funzione, per dare il tempo di renderizzare l'oggetto su dispositivi lenti (vergogna)    
    
    var scrutinate = content.sezioni_scrutinate; 
    var totali = content.sezioni_tutte; 
    var percent = (scrutinate*90) / totali; 
    
    var fixed_height = 80;
    
    var arr = []; 
    var img_path = "";
    var title = "";
    
    if(mode=="cc"){
        arr = content.cameraCoalizioni;
        title = "Camera - Coalizioni";
        img_path = "css/imgs/coalizioni/"; 
    }else if(mode=="cp"){
        arr = content.cameraPartiti;
        title = "Camera - Partiti";
        img_path = "css/imgs/partiti/"; 
    }else if(mode=="sc"){
        arr = content.senatoCoalizioni;
        title = "Senato - Coalizioni";
        img_path = "css/imgs/coalizioni/"; 
    }else{
        arr = content.senatoPartiti;
        title = "Senato - Partiti";
        img_path = "css/imgs/partiti/"; 
    }
    
    //$('#spoglio_tipo').text(title);
    $('#spoglio_scrutinate').html("Sezioni scrutinate: <b>" + scrutinate + " / " + totali + "</b> ("+percent.toFixed(0)+"%)<br/>Aggiornato al "+content.updated);    
    
    if(scrutinate > 0){
        
        var html = '';
        
        for(var i=0; i<arr.length; i++){
            
            var element = arr[i];
            
            var elementId = element.id; 
            var elementName = element.name; 
            var elementPercent = parseFloat(element.result); 
            var elementPercentInt = element.percent;
            var bgcolor = element.color;

            html += '<div style="position:relative;float:left;height:'+fixed_height+'px;width:100%;padding-left:5px;">';
            html += '<div style="position:absolute;left:0;top:0;height:'+fixed_height+'px;background-color:'+bgcolor+'; width:'+elementPercentInt+'%;padding-left:5px;">&nbsp;</div>';
            html += '<div style="position:absolute;left:90px;top:28px;height:'+fixed_height+'px;font-size:22px;">'+elementPercent+'% <br/><span style="font-size:16px;">'+elementName+'</span></div>';
            html += '<div style="position:absolute;left:0;top:0;height:'+fixed_height+'px;border-right:2px solid white;"><img src="'+img_path+elementId+'.jpg" border="0" width="'+fixed_height+'" height="'+fixed_height+'"></div>';
            html += '</div>';
            
            html += '<div style="clear:both;margin-bottom:4px;"></div>';
            
//            html += '<div style="position:relative;float:left;height:'+fixed_height+'px;width:100%;padding-left:5px;">';
//            html += '<div style="position:absolute;left:82px;top:0;height:'+fixed_height+'px;background-color:'+bgcolor+'; width:'+elementPercentInt+'%;padding-left:5px;">&nbsp;</div>';
//            html += '<div style="position:absolute;left:90px;top:28px;height:'+fixed_height+'px;font-size:22px;">'+elementPercent+'% <br/><span style="font-size:16px;">'+elementName+'</span></div>';
//            html += '<div style="position:absolute;left:0;top:0;height:'+fixed_height+'px;border-right:2px solid white;"><img src="'+img_path+elementId+'.jpg" border="0" width="'+fixed_height+'" height="'+fixed_height+'"></div>';
//            html += '</div>';
//            
//            html += '<div style="clear:both;margin-bottom:4px;"></div>';

        }
            
        $('#spoglio_parziali').html(html);
        
    }else{
        $('#spoglio_parziali').html('<div class="ui-bar ui-bar-e" style="margin-bottom:20px;"><p style="font-size:85%; margin:0.5em 0 0.5em;">E\' ancora presto per lo spoglio!<br/>Torna a trovarci presto. </p></div>');
    }
            
    $("#spoglioselect").selectmenu('refresh', true);
    
    $.mobile.hidePageLoadingMsg(); 
}
function getSpoglio(mode){
    
    $.mobile.showPageLoadingMsg(); 
    
    var cache = getCache("cache_spoglio");     
    if(isNull(cache))
    {
        $.getJSON(
            serviceURL+"spoglio/getAggiornamento?callback=?&outputFormat=JSON", 
            {},
            function(data) 
            {
                setCache("cache_spoglio", JSON.stringify(data.content));
                                
                showSpoglio(data.content, mode); 
            }
        );
            
    }else showSpoglio(JSON.parse(cache), mode); 

}

var twitter_nextPage = null; 
function showTweets(tweets, update, _t){
    
    //if(isNull(getParameter("twitter_page")) || parseInt(getParameter("twitter_page"))==1)
    //    $('#tweets').empty(); 
    
    var t = ""; 
    if(_t != null)
        t = "_"+_t;
    
    var html = '';
    if(update==false){
        html = '<ul data-role="listview" id="tweets'+t+'">';
    }    
    
    for(var i=0; i<tweets.length; i++){
        var tweet = tweets[i];
        
        //konsole.log(tweet);
        if(_t != null){
            var uname = tweet.user.name;
            var uname_at = tweet.user.screen_name;
            var datetime = tweet.created_at;
            var message = tweet.text;
            var avatar = tweet.user.profile_image_url;   
        }else{
            var uname = tweet.from_user_name;
            var uname_at = tweet.from_user;
            var datetime = tweet.created_at;
            var message = tweet.text;
            var avatar = tweet.profile_image_url;   
        }
        
        var dt = new Date(datetime);
        var hh = dt.getHours();if(hh < 10) hh = "0" + hh; 
        var mm = dt.getMinutes();if(mm < 10) mm = "0" + mm;
        var ss = dt.getSeconds();if(ss < 10) ss = "0" + ss;
        var d = dt.getDate();if(d < 10) d = "0" + d;
        var m = dt.getMonth() + 1;if(m < 10) m = "0" + m;
        var y = dt.getYear(); 
        var datestr = d + "/" + m + " " + hh + ":" + mm + ":" + ss; 
        
        //from_user_id_str
        var link = "https://twitter.com/"+tweet.from_user+"/status/"+tweet.id_str;        
        
        html += '<li><a href="'+link+'" rel="external" target="_blank">'; 
        
        html += '<img src="'+avatar+'" class="ui-li-icon"/>';
        html += '<div style="padding-left: 20px; ">'
        html += '<h3>'+uname+' <span style="color:blue;font-size:0.8em;">@'+uname_at+'</span></h3>';
        html += '<p style="white-space:normal;">'+message+'</p>';
        html += '<p class="ui-li-aside"><strong>'+datestr+'</strong></p>';
        html += '</div>';
                
        html += '</a></li>';
        
        //$('#tweets').append(html);
    }
    
    if(update==false){
        html += '</ul>';
        
        var container = "tweets_container"; 
        if(_t!=null)
            container = "candidato_tweets_container";
        
        $('#'+container).html(html);
        $('#tweets'+t).listview();
    }else{
        $('#tweets'+t).append(html);
        $('#tweets'+t).listview("refresh");
    }
    
    $.mobile.hidePageLoadingMsg(); 
    
}
function getTweets(){
    
    $.mobile.showPageLoadingMsg(); 
    
    var twitter_page = 1; 
    var update = false; 
    if(!isNull(getParameter("twitter_page"))){
        twitter_page = parseInt(getParameter("twitter_page"), 10);        
    }
    if(twitter_page != 1){
        update = true; 
    }
        
    if(isNull(getCache("cache_tweets")) || twitter_page > 1)
    {
        var baseUrl = "http://search.twitter.com/search.json"; //?q=%23politiche2013&page=1&rpp=20
        
        $.getJSON(
            baseUrl+"?q=%23politiche2013&page="+twitter_page+"&rpp=20"+"&callback=?", 
            {},
            function(data) 
            {
                konsole.log("ricevuti tweets page "+twitter_page);
                
                twitter_nextPage = data.next_page;
                
                setCache("cache_tweets", JSON.stringify(data.results));
                showTweets(data.results, update, null);  
                
                ajaxOK = true; 
            }
        );
            
    }else{
        konsole.log("cache - ricevuti tweets");
        showTweets(JSON.parse(getCache("cache_tweets")), update), null;
        ajaxOK = true; 
    }
}



function getCandidatoTweets(t){
    
    if(t=="null"){
        $("#candidato_tweets_container").html("Non abbiamo trovato un account ufficiale di Twitter.");
        return; 
    }
    
    $.mobile.showPageLoadingMsg(); 
    
    var twitter_page = 1; 
    var update = false; 
    if(!isNull(getParameter("twitter_page"))){
        twitter_page = parseInt(getParameter("twitter_page"), 10);        
    }
    if(twitter_page != 1){
        update = true; 
    }
        
    if(isNull(getCache("cache_tweets_"+t)) || twitter_page > 1)
    {
        var baseUrl = "http://api.twitter.com/1/statuses/user_timeline.json";
        
        $.getJSON(
            baseUrl+"?screen_name="+t+"&count=20&page="+twitter_page+"&include_rts=false&callback=?",
            {},
            function(data) 
            {
                konsole.log("ricevuti tweets page "+twitter_page);
                
                //twitter_nextPage = data.next_page;
                //user.name
                //user.profile_image_url
                setCache("cache_tweets_"+t, JSON.stringify(data));
                showTweets(data, update, t);  
                
                ajaxOK = true; 
            }
        );
            
    }else{
        konsole.log("cache - ricevuti tweets");
        showTweets(JSON.parse(getCache("cache_tweets_"+t)), update, t);
        ajaxOK = true; 
    }
}




function showNews(news){
    
    //$('#news').empty(); 
    var html = '<ul data-role="listview" id="news_ul">';        
    
    //konsole.log(tweets);
    for(var i=0; i<news.length; i++){
        var tweet = news[i];
        
        //konsole.log(tweet);
        
        var dt = new Date(tweet.datetime);
        var hh = dt.getHours();if(hh < 10) hh = "0" + hh; 
        var mm = dt.getMinutes();if(mm < 10) mm = "0" + mm;
        var ss = dt.getSeconds();if(ss < 10) ss = "0" + ss;
        var d = dt.getDate();if(d < 10) d = "0" + d;
        var m = dt.getMonth() + 1;if(m < 10) m = "0" + m;
        var y = dt.getYear(); 
        var datestr = d + "/" + m + " " + hh + ":" + mm + ":" + ss; 
        
        html += '<li><a href="'+tweet.link+'" rel="external" target="_blank">'; 
        
        if(!isNull(tweet.image)){
            //html += '<img src="'+tweet.image+'"  class="ui-li-icon"/>';
            //html += '<div style="padding-left: 40px; ">'
        }
        
        html += '<p>'+datestr+'</p>';
        html += '<h3 style="white-space:normal;">'+tweet.title+'</h3>';
        html += '<p style="white-space:normal;">'+tweet.description+'</p>';
        html += '<p>'+tweet.journal+'</p>';
        //html += '<p><a href="'+tweet.link+'" rel="external" target="_blank">Leggi l\'articolo</a></p>';
        //html += '<p class="ui-li-aside"><strong>'+datestr+'</strong></p>';
        
        if(!isNull(tweet.image)){
            //html += '</div>';
        }
        
        html += '</a></li>';
        
        //$('#news').append(html);
    }
    
    html += '</ul>';
    
    $('#news_container').html(html);
    $('#news_ul').listview();
    //$('#news_ul').listview( "refresh", true );    
    //$("#page_news").trigger("create");
    
    $.mobile.hidePageLoadingMsg(); 
    
}
function getNews(){
    
    $.mobile.showPageLoadingMsg(); 
    
    var cache = getCache("cache_news");
    if(isNull(cache))
    {
        $.getJSON(
            serviceURL+"news/getNews?callback=?&outputFormat=JSON", 
            {},
            function(data) 
            {
                konsole.log(data.content); 
                
                setCache("cache_news", JSON.stringify(data.content));
                showNews(data.content);  
                
                ajaxOK = true; 
            }
        );
            
    }else{
        konsole.log("cache - ricevuti news");
        showNews(JSON.parse(cache));
        ajaxOK = true; 
    }
}



function getDateObjFromItDateTime(input){
    var t = input.split(/[// :]/);
    console.log(t);
    // Apply each element to the Date function
    var d = new Date(t[2], t[1]-1, t[0], t[3], t[4], t[5]);
    return d; 
}

function showAppuntamenti(appuntamenti, update){
    
    var html = '';
    if(update==false){
        html = '<ul data-role="listview" id="appuntamenti_ul">';
    }   
    
    for(var i=0; i<appuntamenti.length; i++){
        var tweet = appuntamenti[i];
        
        konsole.log(tweet);
        
        var ospiti = tweet.ospiti.join(","); 
        var conduttori = tweet.conduttori.join(","); 
        
        var encours = false; 
        var di = getDateObjFromItDateTime(tweet.datetime+":00");
        var de = null; 
        if(!isNull(tweet.datetimeEnd))
            de = getDateObjFromItDateTime(tweet.datetimeEnd+":00");
        var now = new Date(); 
                
        var style = '';
        if(de!=null && (di < now && now < de)){
            style = 'style="border-left: 10px solid yellow;"';
        }
        
        html += '<li '+style+'>'; 
        
        if(!isNull(tweet.icona)){
            html += '<img src="'+serviceURL+'uploads/'+tweet.icona+'" class="cucuzza"/>';
            html += '<div style="padding-left: 60px; ">'
        }
        
        html += '<p>'+tweet.datetime;
            if(!isNull(tweet.datetimeEnd) && tweet.datetimeEnd != tweet.datetime)
                    html += ' - '+tweet.datetimeEnd; 
        html += '</p>';
        
        html += '<h3 style="white-space:normal;">'+tweet.programma+' - '+tweet.titolo+'</h3>';
        html += '<p style="white-space:normal;">Canale: <b>'+tweet.canale+'</b></p>';
        html += '<p style="white-space:normal;">Ospiti: <b>'+ospiti+'</b></p>';
        html += '<p style="white-space:normal;">Conduce: <b>'+conduttori+'</b></p>';
        //html += '<p class="ui-li-aside"><strong>'+tweet.datetime+'</strong></p>';
        
        if(!isNull(tweet.icona)){
            html += '</div>';   
        }        
                
        html += '</li>';
        
        //$('#appuntamenti').append(html);
    }
    
    if(update==false){
        html += '</ul>';
        $('#appuntamenti_container').html(html);
        $('#appuntamenti_ul').listview();
    }else{
        $('#appuntamenti_ul').append(html);
        $('#appuntamenti_ul').listview("refresh");
    }
    
    $.mobile.hidePageLoadingMsg(); 
    
}
function getAppuntamenti(){
    
    $.mobile.showPageLoadingMsg(); 
    
    var appuntamenti_page = 1; 
    var update = false;
    if(!isNull(getParameter("appuntamenti_page"))){
        appuntamenti_page = parseInt(getParameter("appuntamenti_page"), 10);
    }
    if(appuntamenti_page!=1){
        update = true; 
    }
    
    var cache = getCache("cache_appuntamenti");
    if(isNull(cache) || appuntamenti_page > 1)
    {
        $.getJSON(
            serviceURL+"appuntamenti/getNext?callback=?&num=20&page="+appuntamenti_page+"&outputFormat=JSON", 
            {},
            function(data) 
            {
                konsole.log(data.content); 
                
                setCache("cache_appuntamenti", JSON.stringify(data.content));
                showAppuntamenti(data.content, update);  
                
                ajaxOK = true; 
            }
        ); //.complete(function() { alert("complete"); })
            
    }else{
        konsole.log("cache - ricevuti appuntamenti");
        showAppuntamenti(JSON.parse(cache), update);
        ajaxOK = true; 
    }
}


function showCandidatiPage(content){
    $('#candidati_content_inner').html(content);
    $.mobile.hidePageLoadingMsg(); 
}
function getCandidatiPage(){
    
    $.mobile.showPageLoadingMsg(); 
        
    var cache = getCache("cache_candidati_page");
    if(isNull(cache))
    {
        $.getJSON(
            serviceURL+"index/getCandidatiPage?outputFormat=JSON&callback=?", 
            {},
            function(data) 
            {
                //konsole.log(data.content); 
                
                setCache("cache_candidati_page", JSON.stringify(data.content));
                showCandidatiPage(data.content);  
                
                ajaxOK = true; 
            }
        ); //.complete(function() { alert("complete"); })
            
    }else{
        
        showCandidatiPage(JSON.parse(cache));
        ajaxOK = true; 
    }
}


function showAvvenimentiPage(content){
    $('#avvenimenti_content_inner').html(content);
    $.mobile.hidePageLoadingMsg(); 
}
function getAvvenimentiPage(){
    
    $.mobile.showPageLoadingMsg(); 
        
    var cache = getCache("cache_avvenimenti_page");
    if(isNull(cache))
    {
        $.getJSON(
            serviceURL+"index/getAvvenimentiPage?outputFormat=JSON&callback=?", 
            {},
            function(data) 
            {
                //konsole.log(data.content); 
                
                setCache("cache_avvenimenti_page", JSON.stringify(data.content));
                showAvvenimentiPage(data.content);  
                
                ajaxOK = true; 
            }
        ); //.complete(function() { alert("complete"); })
            
    }else{
        
        showAvvenimentiPage(JSON.parse(cache));
        ajaxOK = true; 
    }
}

function showInfografichePage(content){
    
    var data = [];
    var _labels = [];
    var _ymax = 0;
    var _ymin = 9999;
    var _xmin; 
    var _xmax; 
    for(var i=0; i<content.length; i++){
        //nome: content[i][0]
        _labels.push(content[i][0]);
        data.push(content[i][1]);
        for(var j=0; j<content[i][1].length; j++){
            var v = parseInt(content[i][1][j][1]);
            //console.log(v);
            if(v > _ymax)
                _ymax = v;
            if(v < _ymin)
                _ymin = v; 
            if(i==0 && j==0){
                _xmin = content[i][1][j][0];
            }
            if(i==0 && j==content[i][1].length-1){
                _xmax = content[i][1][j][0];
            }
        }
    }

    _ymax = Math.ceil( (_ymax * 110) / 100);
    _ymin = _ymin-1;
    
    if(_ymax==0){
        
        $('#chart_citazioni').html("<div class=\"ui-bar ui-bar-e\">Il politico potrebbe non avere un profilo ufficiale twitter oppure i dati a disposizione non sono sufficienti per condurre l'analisi.</div>");
        
    }else{
        
        $('#chart_citazioni').html("");
  
        var plot1 = $.jqplot('chart_citazioni', data, {
          seriesDefaults: { 
            showMarker:false
          },
          //seriesColors: [ "#EC0023", "#269926", "#992667", "#BF7130", "#FF9640", "#39E639", "#A43DD4", "#E6399B" ],
          /*title:'Avversari Menzionati',*/
          axes:{
            xaxis:{
              renderer:$.jqplot.DateAxisRenderer,
              tickOptions:{
                formatString:'%b&nbsp;%#d'
              },
              min: _xmin,
              max: _xmax
            },
            yaxis:{
              max: _ymax,
              min: _ymin
            }
          },
          highlighter: {
            show: false,
            sizeAdjust: 7.5
          },
          cursor: {
            show: false
          },
          legend: {
                show: true,
                placement: 'inside',
                predraw: true,
                labels: _labels,
                rendererOptions: {
                    numberRows: 1
                },
                location: 'nw'
            }
        });
        
    }
    
  
    $.mobile.hidePageLoadingMsg(); 
}
function getInfografichePage(p){
    
    $.mobile.showPageLoadingMsg(); 
        
    var cache = getCache("cache_infografiche_page_"+p);
    if(isNull(cache))
    {
        $.getJSON(
            serviceURL+"Stats/getQuote?idPolitico="+p+"&outputFormat=JSON&callback=?", 
            {},
            function(data) 
            {
                setCache("cache_infografiche_page_"+p, JSON.stringify(data.content));
                showInfografichePage(data.content);  
            }
        ); 
    }else{
        
        showInfografichePage(JSON.parse(cache));
    }
    
}


function showGraficoSentiment(content){
                    
    var positivo=content[0][1];
    var negativo=content[1][1];
    
    var _ymax = 0;
    var _ymin = 9999;
    var _xmin; 
    var _xmax; 
    for(var i=0; i<content.length; i++){
        for(var j=0; j<content[i][1].length; j++){
            var v = parseInt(content[i][1][j][1]);
            if(v > _ymax)
                _ymax = v;
            if(v < _ymin)
                _ymin = v; 
            if(i==0 && j==0){
                _xmin = content[i][1][j][0];
            }
            if(i==0 && j==content[i][1].length-1){
                _xmax = content[i][1][j][0];
            }
        }
    }

    _ymax = Math.ceil( (_ymax * 110) / 100);
    _ymin = _ymin-1;
    
    var plot1 = $.jqplot('chart_sentiment', [positivo, negativo], {
        seriesDefaults: { 
            showMarker:false
        },
        seriesColors: [ "#03A64A", "#FF0000" ],
        series:[ 
            {label:'Positivo'}, 
            {label:'Negativo'} 
        ], 
        axes:{
            xaxis:{  
                renderer:$.jqplot.DateAxisRenderer,
                tickOptions:{
                    formatString:'%b&nbsp;%#d'
                } 
            },
            yaxis:{
                min:0,
                max: 10,
                numberTicks: 5, 
                tickOptions:{
                    formatString:'%d' 
                }
            }
        },
        highlighter: {
            show: false,
            sizeAdjust: 7.5
        },
        legend: {
            show: true,
            location: 'nw',    
            xoffset: 12,     
            yoffset: 12
        },
        cursor: {
            show: false
        }
    });

    $.mobile.hidePageLoadingMsg(); 
         
}

function getSentimentPage(p){
    
    $.mobile.showPageLoadingMsg(); 
        
    var cache = getCache("cache_sentiment_page_"+p);
    if(isNull(cache))
    {
        $.getJSON(
            serviceURL+"Stats/getSentiment?idPolitico="+p+"&outputFormat=JSON&callback=?", 
            {},
            function(data) 
            {
                setCache("cache_sentiment_page_"+p, JSON.stringify(data.content));
                showGraficoSentiment(data.content);  
            }
        ); 
    }else{
        
        showGraficoSentiment(JSON.parse(cache));
    }
    
}

function showCurriculumPage(content){
    $('#curriculum_content').html(content);
    $("#candidatiepillole_ad_content").html($("#curriculum_content").html());
    $("#controlgroup").trigger("create");
    $.mobile.hidePageLoadingMsg(); 
}
function getCurriculumPage(p){
    
    $.mobile.showPageLoadingMsg(); 
        
    var cache = getPermanentCache("cache_curriculum_page_"+p);
    if(isNull(cache))
    {
        $.getJSON(
            serviceURL+"curriculum/getCurriculumPage?idPolitico="+p+"&outputFormat=JSON&callback=?", 
            {},
            function(data) 
            {
                setCache("cache_curriculum_page_"+p, JSON.stringify(data.content));
                showCurriculumPage(data.content);  
            }
        );
            
    }else{
        
        showCurriculumPage(JSON.parse(cache));
    }
}




function showDichiarazioni(news){
    
    if(news.length == 0){
        $('#dichiarazioni_content_inner').html("Nessuna dichiarazione inserita. ");
    }else{

        //$('#news').empty(); 
        var html = '<ul data-role="listview" id="dichiarazioni_ul">';        

        //konsole.log(tweets);
        for(var i=0; i<news.length; i++){
            var tweet = news[i];

            var datestr = tweet.data;

            html += '<li>'; 

            //if(!isNull(tweet.image)){
                //html += '<img src="'+tweet.image+'"  class="ui-li-icon"/>';
                //html += '<div style="padding-left: 40px; ">'
            //}

            html += '<p>'+datestr+'</p>';
            html += '<h3 style="white-space:normal;">'+getParameter('n')+'</h3>';
            html += '<p style="white-space:normal;font-size:1em;">'+tweet.dichiarazione+'</p>';
            html += '<p>Fonte: '+tweet.fonte+'</p>';
            //html += '<p><a href="'+tweet.link+'" rel="external" target="_blank">Leggi l\'articolo</a></p>';
            //html += '<p class="ui-li-aside"><strong>'+datestr+'</strong></p>';

            //if(!isNull(tweet.image)){
                //html += '</div>';
            //}

            html += '</li>';

            //$('#news').append(html);
        }

        html += '</ul>';

        $('#dichiarazioni_content_inner').html(html);
        $('#dichiarazioni_ul').listview();
        //$('#news_ul').listview( "refresh", true );    
        //$("#page_news").trigger("create");
    
    }
    
    $.mobile.hidePageLoadingMsg(); 
    
}
function getDichiarazioniPage(p){
    
    $.mobile.showPageLoadingMsg(); 
    
    var cache = getCache("cache_dichiarazioni_"+p);
    if(isNull(cache))
    {

        $.getJSON(
            serviceURL+"dichiarazioni/getLast?idPolitico="+p+"&outputFormat=JSON&callback=?", 
            {},
            function(data) 
            {

                konsole.log(data.content); 
                
                setCache("cache_dichiarazioni_"+p, JSON.stringify(data.content));
                showDichiarazioni(data.content);  
            }
        );
            
    }else{
        konsole.log("cache - ricevuti news");
        showDichiarazioni(JSON.parse(cache));
    }
}


//disabilita logging; non funziona
//console.log = function() {}
var env = 'prod';
var konsole = {
    log: function (arguments) {
        if (env === 'dev') {
            console.log(arguments)
        }
    }
}

var appVersion = "2.1"; 

var preservedLocalStorageItems = Array(
    'index_currentpage',
    'index_spoglio',
    'p', //politicoId
    'n', //politicoName
    't', //politicoTweet
    //pagine dei curriculum
    'cache_curriculum_page_1',
    'cache_curriculum_page_2',
    'cache_curriculum_page_3',
    'cache_curriculum_page_4',
    'cache_curriculum_page_5',
    'cache_curriculum_page_6',
    'cache_curriculum_page_7',
    'cache_curriculum_page_8',
    'cache_curriculum_page_9',
    'cache_curriculum_page_10',
    'cache_curriculum_page_11',
    'cache_curriculum_page_12',
    'cache_curriculum_page_13'
);
var superPreservedLocalStorageItems = Array(
); 

/* Timeout delle richieste */
$.ajaxSetup({
    timeout: 60000,
    error: function(jqXHR, status, errorThrown){   //the status returned will be "timeout" 
        if(status=="timeout"){
            alert("La richiesta sta impiegando troppo tempo e verra' interrotta. Riprovare. ");            
            jqXHR.abort();
            $.mobile.hidePageLoadingMsg(); 
        }
    }
});
       
function isNull(param){
    if(param === undefined || param == null || param == "null" || param == "")
        return true; 
    return false; 
}

function isVoid(val){
    if(val.trim().length == 0)
            return true;
    return false;
}

/**
 * params ‚àö¬Æ un array key-value: 
 * { "Mario":"7", "Gianni":"4", "Monica":"4" }
 * */
function changePageWithParams(toPage, params){
    konsole.log("changePageWithParams Call");
    
    //Pulisci localStorage preservando dati utente
    clearParameters();
    
    //Setting parameters
    for (var key in params) {
        konsole.log("setParam "+key+" "+params[key]);
        setParameter(key, params[key]);
    }
    
    /* Fix per Android 4.0.2 - 4.0.3 : rimuovo i parametri dall'url */
    var re = new RegExp("\\?.*", "g");
    toPage = toPage.replace(re, "");
    
    //Change page
    konsole.log("loading "+toPage);
    $.mobile.changePage( toPage, { /*transition: "slide",*/ reloadPage: true}, false, true );
    //navigator.app.loadUrl("file:///android_asset/www/" + toPage);
}

function clearParameters(){
    //konsole.log("clearParams");
    
    //backup dati utente
    var backup = new Array(); 
    for(var i=0; i<preservedLocalStorageItems.length; i++){
        
        var key = preservedLocalStorageItems[i];
        backup[key] = window.localStorage.getItem(key);   
        
        //konsole.log("backup param: " +key +" "+backup[key]);
    }
    
    //clean    
    window.localStorage.clear();
    
    //re-set
    for(var i=0; i<preservedLocalStorageItems.length; i++){
        //konsole.log("restore param: " +key +" "+backup[key]);
        var key = preservedLocalStorageItems[i];
        setParameter(key, backup[key]);
    }
}

/**
 * Quando torno alla home, pulisci tutto il pulibile
 * */
function clearParametersHome(){
    konsole.log("clear parameters home");
    
    //backup dati utente
    var backup = new Array(); 
    for(var i=0; i<superPreservedLocalStorageItems.length; i++){
        
        var key = superPreservedLocalStorageItems[i];
        backup[key] = window.localStorage.getItem(key);   
        
        //konsole.log("backup param: " +key +" "+backup[key]);
    }
    
    //clean    
    window.localStorage.clear();
    
    //re-set
    for(var i=0; i<superPreservedLocalStorageItems.length; i++){
        //konsole.log("restore param: " +key +" "+backup[key]);
        var key = superPreservedLocalStorageItems[i];
        setParameter(key, backup[key]);
    }
}

/**
 * Funziona sia su phonegap che su browser 
 * */
function getParameter(name){
    
    var param = getURLParameter(name);
    
    if(isNull(param)){
        param = window.localStorage.getItem(name);
        konsole.log("getParam localstorage "+name+" val: "+param );
    }
    
    return param;    
}

function setParameter(name, value){
    //konsole.log("setParam "+name+" "+value );
    window.localStorage.setItem(name, value);
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}


function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


/* Text Handling */
function jsonEscape(text){
    //prova di non regressione $ ‚àö¬Æ ‚àö‚Ä† "ciao" l'aiuola / forms backslash \ wow
    
    var escaped = text; 
    
    escaped = jsonEscapeBackslashes(escaped);
    escaped = jsonEscapeQuotes(escaped);
    escaped = jsonEscapeNewLines(escaped);
    //escaped = encodeURIComponent(escaped);
    
    //alert(escaped);
    
    return escaped;
    
}

function jsonEscapeNewLines(text){
    return text.replace(/\n/g, "\\n")
              .replace(/\r/g, "\\r")
              //.replace(/\t/g, "\\t")
              //.replace(/\b/g, "\\b")
              .replace(/\f/g, "\\f");
}
function jsonEscapeBackslashes(text)
{
    return text.replace(/\\/g, "\\\\");
}

function jsonEscapeQuotes(text)
{
    return text.replace(/\"/g, "\\\"");
}

/* Date Handling */
var manualOffset = 60; //numero di minuti di offset da applicare. PROVVISORIO

function pad(val){
    if(val < 10)
        return "0" + val; 
    else
        return val; 
}

function getCompleteDateTime(dateObj){
    
    var str = pad(dateObj.getDate()) + "/" + pad(dateObj.getMonth() + 1) + "/" + pad(dateObj.getFullYear());
    str += " ";
    str += pad(dateObj.getHours()) + ":" + pad(dateObj.getMinutes());
    
    return str;
}

function dateFromISO8601(isostr) {
    //20120812T20:43:43+00:00
    var parts = isostr.match(/\d+/g);
    var dmy = parts[0];
    var y = parseInt(dmy.substring(0, 4), 10);
    var m = parseInt(dmy.substring(4, 6), 10);
    var d = parseInt(dmy.substring(6, 8), 10);
    
    var _dateObj = new Date(y, m - 1, d, parts[1], parts[2], parts[3]);
    
    //UTC offset
    var sign = isostr.substring(17, 18);
    
    var tz = ( parseInt(parts[4], 10) * 60 );
    if(parts[5]) tz += parseInt( parts[5], 10);
    
    if( sign == '+' ) tz *= -1;
    
    tz += manualOffset; 
    
    if(tz) _dateObj.setUTCMinutes(_dateObj.getUTCMinutes() + tz);
    
    return _dateObj;
}

function getCompleteDateFromMysqlDateFormat(dateStr){

    var y = parseInt(dateStr.substring(0, 4), 10);
    var m = parseInt(dateStr.substring(5, 7), 10);
    var d = parseInt(dateStr.substring(8, 10), 10);
    
    return pad(d)+"/"+pad(m)+"/"+y;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function formatDouble(str){
    
    str = str.replace(",", ".");
    if(isNumber(str))
        return str; 
    else
        return null;
}


function hyphenation(str, num) {  
  return str.replace(RegExp("([\\w\\:\\?\\/=\\_\\.&]{" + num + "})([\\w\\:\\?\\/=\\_])", "g"), function(all, text,_char){ 
    return text + " " + _char; 
  }); 
}


/* nuovo sistema di caching */
var cache_timeout = 60 * 60; //secondi = 60min
function getCache(param){
    var val = getParameter(param);
    console.log("cached: " + val); 
    if(!isNull(val)){
        //expired?            
        var now = Math.floor(+new Date() / 1000); 
        
        if(getParameter(param+"_time") < (now - cache_timeout) ){
            konsole.log("CACHE EXPIRED"); 
            val = null; 
        }else{
            konsole.log("CACHE OK"); 
        }
    }
    return val; 
}
function getPermanentCache(param){
    var val = getParameter(param);
    return val; 
}

function setCache(param, value){
    setParameter(param, value);
    var now = Math.floor(+new Date() / 1000); 
    setParameter(param+"_time", now);
}

function clearCache(){
    clearParameters(); 
}


$( document ).bind( 'mobileinit', function(){
    $.mobile.loadingMessageTextVisible = false;
    $.mobile.loadingMessageTheme = "b";
    $.mobile.loadingMessage = "loading...";
    
});

function checkConnection(){
    if((typeof navigator.network) != 'undefined' && 
            navigator.network.connection.type == Connection.NONE){
        alert("Attenzione: per utilizzare l'applicazione è necessaria una connessione dati!");
    }
}

var useChartPatch = true; 
function profileByDevice(){
    
    if((typeof device) != 'undefined'){
        if(device.platform == 'iPhone')
            useChartPatch = false; 
        
        if(device.platform == 'Android' && parseFloat(device.version.substr(0,3)) < 4.0)
            useChartPatch = false; 
        
        if(device.platform == 'Android' && parseFloat(device.version.substr(0,3)) >= 4.1)
            useChartPatch = false; 
        
        if(useChartPatch == true){
            $("head").append($('<style type="text/css">#chart_sentiment .jqplot-table-legend{z-index:1000 !important;}</style>'));
            $("head").append($('<style type="text/css">#chart_citazioni .jqplot-table-legend{z-index:1000 !important;}</style>'));
            $("head").append($('<style type="text/css">#chart_hotwords .jqplot-bubble-label {z-index:1000 !important;}</style>'));
        }
        
    }
}

function onDeviceReadyPageCreate(){
    checkConnection();    
    profileByDevice();
}


$( document ).bind( "pagecreate", function() {
    // Make your jQuery Mobile framework configuration changes here!
    konsole.log("pagecreate");
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.ajaxEnabled = true; //default data-ajax = false for transitions
    $.mobile.buttonMarkup.hoverDelay = true;
    $.mobile.defaultPageTransition = 'fade';
    
    document.addEventListener("deviceready", onDeviceReadyPageCreate, false);
    
    if (navigator.userAgent.indexOf("Android") != -1)
    {
        $.mobile.defaultPageTransition = 'none';
        $.mobile.defaultDialogTransition = 'none';
    } 

});

function defineUpdateButtonForPage(pagename){
    $('#updateButton_'+pagename).unbind('click');
    $('#updateButton_'+pagename).click(function(e){

        e.preventDefault();
        //alert("update");
        konsole.log("update page");

        //clear cache
        clearCache(); 

        //refresh page
        /*
        $.mobile.changePage(
            //window.location.href,
            pagename + ".html",
            {
                allowSamePageTransition : true,
                transition              : 'none',
                showLoadMsg             : false,
                reloadPage              : true
            }
        );
        */

       $('#page_'+pagename).trigger('pageshow');

        return false;
    }); 
    
}


/***************** Pages ***************/
function generateSondaggioPage(){
    $('#chart3').html("");
    $('#chart3_legend').html("");
    
    getLastSondaggio();
    getRemoteMessage();
    
    defineUpdateButtonForPage('index');
    
    //rimuovi i precedenti handlers
    $("#sondaggio_prec").unbind('click');
    $("#sondaggio_next").unbind('click');
    
    $("#sondaggio_prec").click(function(e){          
        getPrecSondaggio(); 
    });
    $("#sondaggio_next").click(function(e){
        getNextSondaggio(); 
    });  
}
$('#page_index').live('pageshow', function(event){
    
    var voto = new Date("2013-02-24 09:00:00"); 
    var now = new Date(); 
    
    if( getParameter("index_currentpage")=="risultati" || ( isNull("index_currentpage") && now > voto) ){
        //risultati        
        $('#item_sondaggi').removeClass("ui-btn-active");
        $('#item_spoglio').addClass("ui-btn-active");
        //$("#index_content").html($("#spoglio_content").html());
        setParameter("index_currentpage", "risultati");
        
        setParameter("is_sondaggio_page", false);
        
        if(isNull("index_spoglio"))
            setParameter("index_spoglio", "cc");
        
        
        $("#index_content").html($("#spoglio_content").html());
        //$("#index_content").trigger("create");
        
        getSpoglio(getParameter("index_spoglio")); 
        
        defineUpdateButtonForPage('index');
        
    }else{
        //sondaggi
        $('#item_sondaggi').addClass("ui-btn-active");
        $('#item_spoglio').removeClass("ui-btn-active");
        $("#index_content").html($("#sondaggi_content").html());
        setParameter("index_currentpage", "sondaggi");
        
        
        setParameter("is_sondaggio_page", true);
    
        //swipe for change sondaggio
        $(document).bind('swipeleft', function(event){
            if(getParameter("is_sondaggio_page")=='true'){
                getPrecSondaggio(); 
            }
        });
        $(document).bind('swiperight', function(event){
            if(getParameter("is_sondaggio_page")=='true'){
                getNextSondaggio(); 
            }
        });

        generateSondaggioPage(); 
    }

});


$('#page_twitter').live('pageshow', function(event){
    
    setParameter("is_sondaggio_page", false);
    
    twitter_nextPage = null; 
    setParameter("twitter_page", 1);
    getTweets();

    defineUpdateButtonForPage('twitter');
});


$('#page_news').live('pageshow', function(event){
    
    setParameter("is_sondaggio_page", false);
    
    getNews();
    defineUpdateButtonForPage('news');
});

$('#page_candidatiepillole').live('pageshow', function(event){
    
    setParameter("is_sondaggio_page", false);
    
    //defineUpdateButtonForPage('candidatiepillole');
});


function popolaListaParole(data){
    var options = $('#hotwords');
    for(var i=0; i<data.length; i++){

        konsole.log(data[i]);

        options.append($("<option />").val(data[i]).text(data[i]));
    }

    //seleziona la prima parola
    $("#hotwords").val(data[0]);
    showGraficoParole(data[0]);
    
    options.selectmenu("refresh");
    
    $("#hotwords").unbind( "change" );
    $("#hotwords").bind( "change", function(event, ui) {                        
        var parola = $("#hotwords").val();
        showGraficoParole(parola);
        options.selectmenu("refresh");
    });
    
    $.mobile.hidePageLoadingMsg(); 
}
$('#page_candidatiepillole_ad').live('pageshow', function(event){
    
    setParameter("is_sondaggio_page", false);
        
    document.title = getParameter('n');
    $('#candidatiepillole_ad_title').text(getParameter('n'));
    
    $('#item_curriculum').addClass("ui-btn-active");
    $('#item_infografiche').removeClass("ui-btn-active");
    $('#item_dichiarazioni').removeClass("ui-btn-active");
    $('#item_twitter').removeClass("ui-btn-active");
    
    $("#curriculum_content").html("")
    getCurriculumPage(getParameter('p'));

    defineUpdateButtonForPage('candidatiepillole_ad');
    
    $("#item_curriculum").unbind('click');
    $("#item_infografiche").unbind('click');
    $("#item_dichiarazioni").unbind('click');
    $("#item_twitter").unbind('click');
    $("#item_curriculum").click(function(e){
        $("#candidatiepillole_ad_content").html($("#curriculum_content").html());
    });
    $("#item_infografiche").click(function(e){
        $("#candidatiepillole_ad_content").html($("#infografiche_content").html());
        getInfografichePage(getParameter("p"));
        
        /* grafico sentiment */
        getSentimentPage(getParameter("p"));
                
        /* grafico parole */
        $.mobile.showPageLoadingMsg(); 
        //crea combo
        $("#hotwords_container").html('<select name="hotwords" id="hotwords">'+
            '<option value="none">Seleziona una parola..</option>'+
        '</select>');
        $('#hotwords_container').trigger("create");
        
        //popola combo
        var cache = getCache("cache_parole_"+getParameter("p"));
        if(isNull(cache))
        {
            $.getJSON(
                serviceURL+"Stats/getCommonLemmas?idPolitico="+getParameter("p")+"&callback=?&outputFormat=JSON", 
                {},
                function(data)
                {
                    setCache("cache_parole_"+getParameter("p"), JSON.stringify(data.content));
                    popolaListaParole(data.content);
                    //il refresh lo facciamo alla fine del popolaListaParole
                }
            );
        }else popolaListaParole(JSON.parse(cache));
        
        
    });
    $("#item_dichiarazioni").click(function(e){
        $("#candidatiepillole_ad_content").html($("#dichiarazioni_content").html());
        getDichiarazioniPage(getParameter("p"));
    });
    $("#item_twitter").click(function(e){
        $("#candidatiepillole_ad_content").html($("#candidato_tweets_content").html());
        setParameter("twitter_page", 1); //condiviso con i twitter totali!
        twitter_nextPage = null; //come sopra
        getCandidatoTweets(getParameter("t"));        
    });
    
});


$('#page_appuntamenti').live('pageshow', function(event){
    
    setParameter("is_sondaggio_page", false);
    
    setParameter("appuntamenti_page", 1);
    getAppuntamenti();

    defineUpdateButtonForPage('appuntamenti');
});



function popolaListaProvince(data){
    var options = $('#provincia');
    for(var i=0; i<data.length; i++){

        konsole.log(data[i]);

        var v = data[i][0]; 
        var c = data[i][1];

        if(parseInt(c) > 0)
            options.append($("<option />").val(v).text(v));
    }

    options.selectmenu("refresh");
    $.mobile.hidePageLoadingMsg(); 
}

$('#page_comuni').live('pageshow', function(event){
    
    setParameter("is_sondaggio_page", false);
    
    $.mobile.showPageLoadingMsg(); 
    
    var cache = getCache("cache_province");
    if(isNull(cache))
    {
        $.getJSON(
            "http://www.eleonline.it/site/modules.php?name=Comuni&file=provincie&callback=?", 
            {},
            function(data)
            {
                
                setCache("cache_province", JSON.stringify(data));
                popolaListaProvince(data);
                
            }
        );
    }else popolaListaProvince(JSON.parse(cache));
    
});

    
