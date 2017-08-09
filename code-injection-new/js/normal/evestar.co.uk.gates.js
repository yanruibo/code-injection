
$(document).ready(function(){
    $('#viewer').wrapInner('<div id=slide></div>');
    var container = $('#slider'),
        prev = container.find('#prev'),
        prevChild = prev.find('a'),
        next = container.find('#next').removeClass('hidden'),
        nextChild = next.find('a'),
        slide = container.find('#slide'),
        key = 'image1',
        details = {
            image1: {
                position: 0,
                title: slide.children().eq(0).attr('alt')
            },
            image2: {
                position: -250,
                title: slide.children().eq(1).attr('alt')
            },
            image3: {
                position: -500,
                title: slide.children().eq(2).attr('alt')
            },
            image4: {
                position: -750,
                title: slide.children().eq(3).attr('alt')
            },
            image5: {
                position: -1000,
                title: slide.children().eq(4).attr('alt')
            },
            image6: {
                position: -1250,
                title: slide.children().eq(5).attr('alt')
            },
            image7: {
                position: -1500,
                title: slide.children().eq(6).attr('alt')
            },
            image8: {
                position: -1750,
                title: slide.children().eq(7).attr('alt')
            }
        };
        //add title
	$("<h2>").attr("id", "title").text(details.image1.title).prependTo("#slider");
        
        //time for action - defining a post-animation callback
    function postAnim(dir){
        var keyMatch = parseInt(key.match(/\d+$/));
        (parseInt(slide.css("left")) < 0) ? prev.show(400) : prev.hide(400);
        (parseInt(slide.css("left")) === -1750) ? next.hide(400) : next.show(400);
        if(dir){
            var titleKey = (dir === 'back') ? keyMatch - 1 : keyMatch + 1;
            key = "image" + titleKey;
        }
        container.find('#title').text(details[key].title);
        container.find('.active').removeClass('active');
        container.find('a[href=#' + key + ']').addClass('active');
    };
    //end
    $('#ui li a').not(prevChild).not(nextChild).click(function(e){
        e.preventDefault();
        key = $(this).attr('href').split('#')[1];
        slide.animate({
            left: details[key].position
        }, 'slow', 'easeOutBack', postAnim);
    });
    nextChild.add(prevChild).click(function(e){
        e.preventDefault();
        var arrow = $(this).parent();
        if(!slide.is(':animated')){
            slide.animate({
                left: (arrow.attr('id') === 'prev') ? '+=250' : '-=250'
            }, 'slow', 'easeOutBack', function(){
                (arrow.attr('id') === 'prev') ? postAnim('back') : postAnim('foward')
            });
        }
    });
});








        $(document).ready(function(){
            $.getJSON('richest.json', function(data){
                /*$('div ').live('pageinit', function(event, ui){
                    var idActive =  $('.ui-page-active').attr('id');
                    alert(idActive);
                    if(idActive == "tip"){
                        $('#50_richest').append($('#liTmpl').tmpl(data)).listview('refresh');
                    }
                }); */
                $(window).load(function(){
                    var idActive =  $('.ui-page-active').attr('id');
                    if(idActive == "tip"){
                        $('#50_richest').append($('#liTmpl').tmpl(data)).listview('refresh');
                    }
                });
                $('#50_richest').append($('#liTmpl').tmpl(data));
                $('.productLink').live('tap', function(){
                    var targetName = $(this).attr('data-name');
                    for(var i = 0; i < data.length; i++){
                        if(data[i].name === targetName){
                            var page = $('#productPage');
                            page.find('.firstL').text(data[i].firstL);
                            page.find('#header').text(data[i].name);
                            page.find('#p1').text(data[i].p1);
                            page.find('#p2').text(data[i].p2);
                            page.find('#p3').text(data[i].p3);
                            page.find('#p4').text(data[i].p4);
                            page.find('#p5').text(data[i].p5);
                            page.find('#p6').text(data[i].p6);
                            page.find('#p7').text(data[i].p7);
                            $.mobile.changePage('#productPage');
                            break;
                        }
                    }
                });
            });
        });
    


        
    

$(document).ready(function(){
    //clear value from fields
   $('input[id^=g_]').each(function(){
        var default_value = this.value;
        $(this).focus(function(){
            if(this.value == default_value){
                this.value = '';
            }
        });
        $(this).blur(function(){
            if(this.value == ''){
                this.value = default_value;
            }
        });
   });
    
    $('input[id^=g_]').bind('keyup', function(){
        var gatesWidth = Number($('#g_width').val());
        var gatesHeight = Number($('#g_height').val());
        var gapF = Number($('#g_gap').val());
        var rib = Number($('#g_E').val());
        var barQuantity = Number($('#g_barQuantity').val());
        var barDiameter = Number($('#g_barDiameter').val());
        var t_30 = Number($('#g_30').val());
        var C = Number($('#g_C').val());
        var ball_cap = Number($('#g_ballC').val());
        var dogBarHeight = Number($('#g_A').val());
        
        var frameWidth = (gatesWidth - (rib * 2) - gapF) / 2 ;
        var gap_1 = (frameWidth - 52 - barDiameter * barQuantity) / (barQuantity + 1);
            frameWidth = frameWidth.toFixed(1);
            gap_1 = gap_1.toFixed(1);
            
        var a_1 = frameWidth - 12 + rib - 10;
        var a_2 = gatesHeight - 40 - t_30 - C - ball_cap;
        
        $('#x_width').text(frameWidth);
        $('#x_gap').text(gap_1);
        
        $('#length_1').text(a_1);
        $('#length_2').text(a_2);
        $('#length_3').text(rib);
        $('#length_5').text(frameWidth - 52);
        $('#length_6').text(frameWidth - 250);
        $('#length_7').text(gatesWidth + 25);
        $('#length_9').text(dogBarHeight);
        $('#quantity_8').text(barQuantity);
        $('#quantity_9').text(barQuantity + 1);
        $('#quantity_10').text(barQuantity + 1);
        $('#quantity_11').text(barQuantity);
        
    })
    //background with drawings
    var widthDrawing = $('body').width();
    $('.imgBackground, .imgEasy').css('width', widthDrawing);
    $('#rotateImg').on({'tap': function(){
        var src = ($('.imgBackground').attr('src') === 'CAD/gate.gif') ? 'CAD/gate_90.gif' : 'CAD/gate.gif';
        $('.imgBackground').attr('src', src);
        }
    });
    
    //easy stairs
    $('#dogBars').on({'change': function(){
        var src1 = ($('.imgEasy').attr('src') === 'CAD/bar_1sd.gif') ? 'CAD/bar_2sd.gif' : 'CAD/bar_1sd.gif';
        $('.imgEasy').attr('src', src1);
        }
    });
    $('input[id^=e_]').bind('keyup', function(){
        var width = Number($('#e_width').val());
        var barDiam = Number($('#e_diameter').val());
        var barQ = Number($('#e_quantity').val());
        
        var gap = (width - (barDiam * barQ)) / (barQ + 1);
            gap = gap.toFixed(1);
        $('#e_gap').text(gap);
    });
    $('#calculate').bind('tap', function(){
        var dogBars = $('#dogBars').val();
        var w = Number($('#e_width').val());
        var bd = Number($('#e_diameter').val());
        var bQ = Number($('#e_quantity').val());
        
        
        var center = (w + bd) / (bQ + 1);  //calculate center between bars
        var startB = Math.round(center - (bd/2));       //start for first bar without dog bars
        var startD = Math.round((center - bd) / 2);     //start for first dog bar
        
        if(dogBars === 'yes'){
            bQ2 = bQ * 2 + 1;
            $('<tr><th scope=row>L1</th><td>' + startD + '</td></tr>').appendTo('#tS tbody');
            for(var i = 1; i < bQ2 ; i++){
                var total = center / 2 * i + startD;
                    total = total.toFixed(0);
                    $('<tr>' +
                        '<th scope=row>L' + [i + 1] + '</th>' +
                        '<td>' + total + '</td>' +
                    '</tr>').appendTo('#tS tbody');
           }
           $('<tr><th scope=row>Bar Length</th><td>' + w + '</td></tr>').appendTo('#tS tbody');
           
        } else if(dogBars === 'no'){
            $('<tr><th scope=row>L1</th><td>' + startB + '</td></tr>').appendTo('#tS tbody');
           for(var i = 1; i < bQ ; i++){
                var total = center * i + startB;
                    total = total.toFixed(0);
                $('<tr>' +
                    '<th scope=row>L' + [i+1] + '</th>' +
                    '<td>' + total + '</td>' +
                  '</tr>').appendTo('#tS tbody');
           }
           $('<tr><th scope=row>Bar Length</th><td>' + w + '</td></tr>').appendTo('#tS tbody');
        }
    });
    $('#reset').bind('tap', function(){
        $('#tS tbody tr').remove();
    });
});
