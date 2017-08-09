





                    

                    var customer_bulbs = new Array();

                    var customer_bulbs_home = new Array();

                    var $total_watts;

                    var $total_savings;

                    var $home_bulb_id;

                    var $home_busi_radio;

                    console.log(customer_bulbs);

                    

                    // function onDeviceReady

                    

                    

                    jQuery(document).ready(function($)  

                    {

                        $key = window.localStorage.getItem("key");

                        $('#aver-elec', this).html($key);

                        $('#aver-elec').html($key);

                        $('#aver-elec').show($key);

                        

                        console.log('aver-elec ' + $key);

                        

                        $('#aver-elec').val($key);

                        $('#aver-elec', this).html(localStorage.getItem('aver_elec'));

                        $('#aver-elec.val()').html($key);

                                           

                        //$fuck = JSON.parse(window.localStorage.getItem('data'));

                                           

                                           showAlert();


                    });

                    

                    $key = window.localStorage.getItem("key");

                    //$('#aver-elec', this).html($key);

                    //$('#aver-elec').html($key);

                    //$('#aver-elec').show($key);

                    

                    console.log('aver-elec ' + $key);

                    

                    //$('#aver-elec').val($key);

                    //$('#aver-elec', this).html(localStorage.getItem('aver_elec'));

                    //$('#aver-elec.val()').html($key);

                    


                    

                    console.log($fuck);

                    

                    /*                 if (navigator.onLine(connected))

                     {

                     alert('Internet');

                     }

                     */

                    //showAlert();

                    

                    

                    

                    function add_array() {

                        

                        //	customer_bulbs.push({"total_watts":$total_watts,"bulb_type":$home_bulb_id,"total_savings":$total_savings});

                        console.log(customer_bulbs);

                        

                        $('#list option').each(function (index, option) {

                                               $(option).remove();

                                               });

                        

                        

                        $('#bulb_no').text("");

                        $('#select-busi-watt').val('0');

                        $('#select-busi-type').val('0');

                        

                        $('#select-busi-watt').selectmenu('refresh', true);

                        $('#select-busi-type').selectmenu('refresh', true);

                        

                        

                        

                        console.log('clear_form');

                    }

                    

                    

                    

                    function busi_click() {

                        console.log('busi-click-click-click');

                        

                        localStorage.setItem('aver_elec', $('#aver-elec').val());

                        

                        home_busi_radio = $('input[name=radio-location]:checked').val();

                        

                        if (home_busi_radio == 'choice-2') {

                            localStorage.setItem('radio_op', 'Business');

                        }

                        if (home_busi_radio == 'choice-1') {

                            localStorage.setItem('radio_op', 'Home');

                        }

                        

                        

                        

                    }

                    

                    

                    

                    

                    function calc_total()

                    {

                        var calc_total_watts = 0;

                        var calc_total_savings = 0;

                        

                        var $txt = null;

                        document.getElementById("calc_total_div").innerHTML = $txt

                        

                        

                        for (x in customer_bulbs)

                        {

                            var cb_total = customer_bulbs[x];

                            console.log(cb_total);

                            

                            var $cb_watts = parseFloat(cb_total.total_watts);

                            var $cb_savings = parseFloat(cb_total.total_savings);

                            

                            calc_total_watts = $cb_watts + calc_total_watts;

                            calc_total_savings = $cb_savings + calc_total_savings;

                            //calc_total_savings = parseFloat(calc_total_savings).toFixed(2);

                            console.log(calc_total_watts);

                            console.log(calc_total_savings);

                            

                            var cb_line = customer_bulbs[x];
							console.log(cb_line);

                            

                        }


						var $pro_hours = $('#slider-0').val();
                        $pro_hours = (parseInt($pro_hours));


                        var $pro_days = $('#slider-1').val();
                        $pro_days = (parseInt($pro_days));
						
						
						calc_total_watts = calc_total_watts * 52 * $pro_hours * $pro_days;
						
						calc_total_watts = calc_total_watts * 0.001;
						
						calc_total_watts = calc_total_watts.toFixed(2);
                        


                        $txt = "<div class='ui-block-a'><center>" + calc_total_savings + "</center></div><div class='ui-block-b'><center>" + calc_total_watts + "</center></div></div><br>";

                        

                        document.getElementById("calc_total_div").innerHTML = $txt

                        

                        var contact = "http://toast.lancs.ac.uk/haddlett/Convertbulb/dbentry.php?total_savings=" + calc_total_savings + "&total_watts=" + calc_total_watts + "&location=Professional";

                        

                        

                        $.get(contact);

                        

                        

                        

                        

                    }

                    

                    

                    function remove_entry() {

                        customer_bulbs.pop();

                        

                        console.log(customer_bulbs.length);

                        var $txt = "";

                        

                        for (y in customer_bulbs) {

                            console.log("Loop the Loop");

                            var cb_line = customer_bulbs[y];

                            console.log(cb_line.total_watts);

                            

                            $txt += "<div class='ui-grid-b'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'>" + cb_line.bulb_type + "</div><div class='ui-block-c'><center>" + cb_line.current_bulb + "</center></div></div>";

                            

                            

                        }

                        document.getElementById("example").innerHTML = $txt;

                        

                    }

                    

                    

                    

                    

                    function remove_entry_home() {

                        customer_bulbs_home.pop();

                        

                        console.log(customer_bulbs.length);

                        var $txt_re = "";

                        

                        for (y in customer_bulbs_home) {

                            console.log("Loop the Loop");

                            var cb_line = customer_bulbs_home[y];

                            

                            $txt_re += "<div class='ui-grid-a'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'><center>" + cb_line.total_hourspw + "</center></div></div>";

                            

                            

                        }

                        document.getElementById("example_home").innerHTML = $txt_re;

                        

                    }

                    

                    

                    

                    

                    

                    function calc_total_home() {

                        var calc_total_watts = 0;

                        var calc_total_savings = 0;

                        

                        var $txt = null;

                        document.getElementById("calc_total_div_home").innerHTML = $txt

                        

                        for (x in customer_bulbs_home) {

                            var cb_total = customer_bulbs_home[x];

                            console.log(cb_total);

                            

                            var $cb_watts = parseFloat(cb_total.total_hourspw);

                            var $cb_savings = parseFloat(cb_total.total_bulbs);

                            

                            calc_total_watts = $cb_watts + calc_total_watts;

                            calc_total_savings = $cb_savings + calc_total_savings;

                            //calc_total_savings = parseFloat(calc_total_savings).toFixed(2);

                            console.log(calc_total_watts);

                            console.log(calc_total_savings);

                            

                            var cb_line = customer_bulbs_home[x];

                            

                        }

                        

                        calc_total_savings = calc_total_savings.toFixed(2);

                        $key = window.localStorage.getItem("key");

                        var old_savings = calc_total_watts * 52 * 60 / 1000 * $key * calc_total_savings;
						//var old_savings = calc_total_watts * 52 * 60 / 1000 * example;

                        console.log(old_savings);

                        

                        var new_savings = calc_total_watts * 52 * 3.5 / 1000 * $key * calc_total_savings;

                        console.log(new_savings);

                        

                        var home_total_savings = old_savings - new_savings;

                        home_total_savings = home_total_savings.toFixed(2);

                        console.log(home_total_savings);

                        

                        calc_total_watts = calc_total_watts * 60 * 52 * 0.001;

                        

                        $txt = "<div class='ui-block-a'><center>" + home_total_savings + "</center></div><div class='ui-block-b'><center>" + calc_total_watts + "</center></div></div>";

                        

                        document.getElementById("calc_total_div_home").innerHTML = $txt

                        

                        var contact = "http://toast.lancs.ac.uk/haddlett/Convertbulb/dbentry.php?total_savings=" + home_total_savings + "&total_watts=" + calc_total_watts + "&location=Home";

                        

                        

                        $.get(contact);

                        

                        

                        

                        

                    }

                    

                    

                    

                    function home_screen_clear() {

                        $('#bulb_no').text("");

                        $('#select-busi-watt').val('0');

                        $('#select-busi-type').val('0');

                        

                        $('#select-busi-watt').selectmenu('refresh', true);

                        $('#select-busi-type').selectmenu('refresh', true);

                        

                        

                        customer_bulbs = [];

                        customer_bulbs_home = [];

                        console.log('clear_form');

                    }

                    

                    

                    

                    

                    

                    function submit_calc() {

                        

                        

                        var $val_type = $('#select-busi-type').val();

                        var $val_watt = $('#select-busi-watt').val();

                        var $val_bulb = $('#bulb_no').val();

                        

                        if ($val_bulb == "" || $val_bulb == null || $val_bulb == "0")

                        {

                            console.log("Fail for the win");

                            alert('Please enter a number of bulbs.');

                        }

                        else if ($val_watt == "Select")

                        {

                            console.log("No wattage");

                            alert('Please select the appropriate Wattage.');

                        }

                        else if ($val_type == "Select")

                        {

                            alert('Please choose type of bulb to convert.');

                        }

                        else

                        {

                            console.log($('#select-busi-type').val());

                            console.log($val_watt);

                            console.log($('#bulb_no').val());

                            

                            

                            console.log($fuck);

                            for (x in $fuck) {

                                var bulb = $fuck[x];

                                

                                var $average_price = localStorage.getItem('aver_elec');

                                

                                

                                $home_bulb_id = $('#select-busi-type').val();

                                console.log($home_bulb_id);

                                console.log(bulb.value);

                                

                                if ($home_bulb_id == bulb.id) {

                                    var $old_bulb = bulb.old_bulb;

                                    console.log('I work');

                                    

                                    var $home_no_bulbs = (parseInt($('#bulb_no').val()));

                                    console.log($home_no_bulbs);

                                    

                                    var $home_hours = $('#slider-0').val();

                                    $home_hours = (parseInt($home_hours));

                                    console.log($home_hours);

                                    

                                    var $home_days = $('#slider-1').val();

                                    var $home_days = (parseInt($home_days));

                                    console.log($home_days);

                                    

                                    var $old_watt = $('#select-busi-watt option:selected').text();

                                    console.log($old_watt);

                                    

                                    var $home_daily = $home_no_bulbs * $home_hours * $home_days;

                                    $home_daily = $home_daily * $old_watt / 1000;

                                    console.log($home_daily);

                                    

                                    //var $home_weekly = $home_daily * $home_days;

                                    //console.log($home_weekly);

                                    

                                    var $home_yearly = $home_daily * 52;

                                    console.log($home_yearly);

                                    

                                    

                                   // $average_price = parseFloat($average_price);

                                    //console.log($average_price);

                                    

                                    var $home_cost = $home_yearly * $average_price;

                                    //$home_cost = parseFloat($home_cost).toFixed(2);

                                    console.log($home_cost);

                                    

                                    var $led_watt;

                                    

                                    $.each(bulb.wattages, function (i, j) {

                                           if ($old_watt == j.wattage) {

                                           console.log(j.wattage);

                                           console.log(j.led_wattage);

                                           $led_watt = j.led_wattage;

                                           }

                                           });

                                    

                                    

                                    

                                    //var $led_watt = (parseFloat (bulb.led_watt));

                                    

                                    var $new_weekly = $home_no_bulbs * $home_days * $led_watt * $home_hours / 1000;

                                    console.log($new_weekly);

                                    

                                    var $new_yearly = $new_weekly * 52;

                                    console.log($new_yearly);

                                    

                                    

                                    var led_bulb_text = bulb.led_bulb;

                                    

                                    var $new_cost = $average_price * $new_yearly;

                                    //$new_cost = parseFloat($new_cost).toFixed(2);

                                    console.log($new_cost);

                                    

                                    $total_savings = $home_cost - $new_cost;

                                    $total_savings = parseFloat($total_savings).toFixed(2);

                                    console.log($total_savings);

                                    

                                    $total_watts = $home_no_bulbs * $old_watt;

                                    $('#busi_current_watts').html($total_watts + ' watts');

                                    

                                    $new_yearly = parseFloat($new_yearly).toFixed(2);

                                    $('#busi_yearly_usage').html($new_yearly + ' kWh');

                                    

                                    $('#busi_total_convertabulb').html(' ' + $new_cost);

                                    

                                    $('#busi_total_saving').html(' ' + $total_savings);

                                    

                                    $('#aver-elec.val()').html($average_price);

                                }

                            };

                            

                            

                            //                                                        var $total_watts;

                            //                                        var $total_savings;

                            //                        var $home_bulb_id;

                            

                            

                            customer_bulbs.push({

                                                "total_watts": $total_watts,

                                                "bulb_type": led_bulb_text,

                                                "total_savings": $total_savings,

                                                "total_bulbs": $home_no_bulbs,

                                                "current_bulb": $old_bulb

                                                });

                            console.log(customer_bulbs);

                            

                            var customer_watt_total = 0;

                            var customer_cost_total = 0;

                            var $txt = "";

                            

                            for (x in customer_bulbs) {

                                var cb_line = customer_bulbs[x];

                                $txt += "<div class='ui-grid-b'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b' style='align:center;'><center>" + cb_line.bulb_type + "</center></div><div class='ui-block-c'><center>" + cb_line.current_bulb + "</center></div></div>";

                                

                                console.log($txt);

                                console.log(cb_line);

                                

                                

                                

                                //$txt += "<br><div class='ui-grid-c'><div class='ui-block-a'><c>" + customer_watt_total + "</c></div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>"

                                

                                

                                document.getElementById("example").innerHTML = $txt;

                                

                                

                                console.log(customer_bulbs);

                                

                                // document.location.href = "#calculation";

                                $.mobile.changePage("#calculation", {transition:"none"});

                                

                            }

                            //document.getElementById("total_customer_bulbs").innerHTML = "<br><div class='ui-grid-c'><div class='ui-block-a'>" + customer_watt_total + "</div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>";

                        }

                    }

                    

                    

                    

                    

                    

                    

                    function submit_calc_home() {

                        

                        

                        var $val_watt = "60";

                        var $val_bulb = $('#bulb_no').val();

                        var $home_no_bulbs = (parseInt($('#bulb_no_home').val()));

                        

                        console.log($('#select-busi-type').val());

                        console.log($val_watt);

                        console.log($('#bulb_no_home').val());

                        

                        if ($('#bulb_no_home').val() == "" || $('#bulb_no_home').val() == null || $('#bulb_no_home').val() == 0)

                        {

                            console.log("Fail for the win");

                            alert('Please enter a number of bulbs to be converted.');

                        }

                        else

                        {

                            

                            console.log($fuck);

                            

                            

                            var $average_price = sessionStorage.getItem('aver_elec');

                            

                            var $home_hours = $('#slider_home-0').val();

                            $home_hours = (parseInt($home_hours));

                            

                            

                            var $home_days = "7";

                            var $home_days = (parseInt($home_days));

                            var $hours_pw = $home_days * $home_hours;

                            console.log($hours_pw);

                            

                            var $old_watt = "60";

                            console.log($old_watt);

                            

                            var $home_daily = $home_no_bulbs * $home_hours;

                            $home_daily = $home_daily * $old_watt / 1000;

                            console.log($home_daily);

                            

                            var $home_weekly = $home_daily * $home_days;

                            console.log($home_weekly);

                            

                            var $home_yearly = $home_weekly * 52;

                            console.log($home_yearly);

                            

                            

                            $average_price = parseFloat($average_price);

                            console.log($average_price);

                            

                            var $home_cost = $home_yearly * $average_price;

                            $home_cost = parseFloat($home_cost).toFixed(2);

                            console.log($home_cost);

                            

                            var $led_watt = "3.5";

                            

                            var $new_weekly = $home_no_bulbs * $home_days * $led_watt * $home_hours / 1000;

                            console.log($new_weekly);

                            

                            var $new_yearly = $new_weekly * 52;

                            console.log($new_yearly);

                            

                            

                            

                            

                            

                            customer_bulbs_home.push({

                                                     "total_watts": $total_watts,

                                                     

                                                     "total_hourspw": $hours_pw,

                                                     "total_bulbs": $home_no_bulbs,

                                                     

                                                     });

                            console.log(customer_bulbs_home);

                            

                            var customer_watt_total = 0;

                            var customer_cost_total = 0;

                            var $txt_home = "";

                            

                            for (x in customer_bulbs_home) {

                                var cb_line = customer_bulbs_home[x];

                                

                                $txt_home += "<div class='ui-grid-a'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'><center>" + cb_line.total_hourspw + "</center></div></div>";

                                

                                //$txt += "<br><div class='ui-grid-c'><div class='ui-block-a'><c>" + customer_watt_total + "</c></div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>"

                                

                            }

                            document.getElementById("example_home").innerHTML = $txt_home;

                            

                            //document.location.href = "#home_calculations";

                            $.mobile.changePage("#home_calculations", {transition:"none"});

                            console.log("Like a boss");

                        }

                        //document.getElementById("total_customer_bulbs").innerHTML = "<br><div class='ui-grid-c'><div class='ui-block-a'>" + customer_watt_total + "</div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>";

                        

                    }

                    

                    

                    function elec_val_home()

                    {

                        var elec_value = $('#aver-elec').val();

                        

                        if ( elec_value == 0 || elec_value == "" || elec_value == null)

                        {

                            alert('Please enter an amount for the average electricity price');

                        }

                        else

                        {

                            //document.location.href = "#home"

                            $.mobile.changePage("#home", {transition:"none"});

                        }

                    }

                    

                    

                    

                    

                    function elec_val_pro()

                    {

                        var elec_value = $('#aver-elec').val();

                        

                        if ( elec_value == 0 || elec_value == "" || elec_value == null)

                        {

                            alert('Please enter an amount for the average electricity price');

                        }

                        else

                        {

                            //document.location.href = "#business"

                            $.mobile.changePage("#business", {transition:"none"});

                        }

                    }

                    

                    

                    

                    

                    

                    console.log("Here first");

                    

                    var $access_elec = "http://toast.lancs.ac.uk/haddlett/Convertbulb/access_elec.php?callback=?";

                    

                    $.getJSON($access_elec, function (data1) {

                              

                              console.log(data1);

                              var $jsonString1 = new Array();

                              

                              $.each(data1, function (index, post) {

                                     

                                     $jsonString1.push(post);

                                     });

                              

                              var jsonline1 = $jsonString1[0];

                              console.log(jsonline1.elec_price);

                              

                              $('#aver-elec').val(jsonline1.elec_price);

                              

                              localStorage.setItem('aver_elec', jsonline1.elec_price);

                              

                              $('#elec-aver', this).html(localStorage.getItem('aver_elec'));

                              

                              

                              

                              window.localStorage.setItem("key", jsonline1.elec_price);

                              example = window.localStorage.getItem("key");

                              

                              $('#elec-aver', this).html(localStorage.getItem('aver_elec'));

                              

                              //$('#elec-aver', this).html(example);

                              console.log(example);

                              

                              });

                    

                    var $fuck;

                    var $jsonString = [];

                    var url = "http://toast.lancs.ac.uk/haddlett/Convertbulb/dbaccess.php?callback=?";

                    

                    $.getJSON(url, function (data) {

                              //var example = data.

                              //console.log(data.old_bulb);

                              

                              //var $jsonString = [];

                              console.log(data);

                              

                              $.each(data, function (index, post) {

                                     console.log(post);

                                     console.log(post.id);

                                     

                                     $jsonString.push(post);

                                     });

                              

                              console.log($jsonString);

                              var jsonLine = $jsonString[1];

                              

                              $fuck = $jsonString;

                              window.localStorage.setItem("data", JSON.stringify($fuck));

                              console.log(jsonLine.old_type);

                              console.log($fuck);

                              console.log(window.localStorage.getItem("data"));

                              

                              showAlert();

                              

                              });

                    

                    

                    /* $.ajax({

                     type: 'GET',

                     url: url,

                     timeout: 15000,

                     success: function(data) {console.log(data);

                     

                     $.each(data, function (index, post) {

                     console.log(post);

                     console.log(post.id);

                     

                     $jsonString.push(post);

                     });

                     

                     console.log($jsonString);

                     var jsonLine = $jsonString[1];

                     $fuck = $jsonString;

                     console.log(jsonLine.old_watt);

                     

                     showAlert();

                     },

                     error: function(XMLHttpRequest, textStatus, errorThrown) {

                     showAlert();

                     }

                     })

                     */

                    function showAlert() {

                        console.log(window.localStorage.getItem('data'));

                        $fuck = JSON.parse(window.localStorage.getItem('data'));

                        console.log($fuck);

                        

                        

                        var total_watts;

                        

                        

                        $(function ()

                          {

                          

                          $key = window.localStorage.getItem("key");

                          $('#aver-elec', this).html($key);

                          $('#aver-elec').html($key);

                          $('#aver-elec').show($key);

                          

                          

                          

                          $.fn.changeType = function () {

                          var y;

                          var x;

                          var yArr = new Array();

                          yArr.push("");

                          

                          //$fuck = JSON.parse(window.localStorage.getItem('data'));

                          

                  //        console.log($fuck.old_watt);

                          var option_type = '<option style="text-align:center;font-family:arial;color:#636466;">Select</option>';

                          $("select#select-busi-watt").html(option_type);

                          for (y in $fuck) {

                          

                          

                          for (var j in yArr) {

                          console.log(j);

                          //if (yArr[j] == $fuck[y].old_bulb) {break;}

                          if (yArr[j] != $fuck[y].old_bulb) {

                          console.log(yArr[j]);

                          console.log($fuck[y].old_bulb);

                          

                          option_type += '<option value="' + $fuck[y].id + '" style="text-align:center;font-family:arial;color:#636466;">' + $fuck[y].old_bulb + '</option>';

                          yArr.push($fuck[y].old_bulb);

                          console.log(yArr);

                          break;

                          }

                          

                          }

                          

                          

                          console.log('In da house');

                          

                          }

                          

                          /*

                           $.each($jsonString, function(i,d)

                           {

                           option_type += '<option value="' + $jsonString[i].id + '">' + $jsonString[i].old_bulb + '</option>';

                           });

                           */

                          

                          

                          

                          

                          console.log('$fuck.wattages');

                          

                          $("select#select-busi-type", this).html(option_type);

                          

                          $("#select-busi-type", this).change(function () {

                                                              var option_type = '<option>Select</option>';

                                                              

                                                              

                                                              

                                                              

                                                              var index = $(this).get(0).selectedIndex;

                                                              var d = $fuck[index - 1];

                                                              

                                                              console.log(d);

                                                              if (index > 0) {

                                                              console.log(d.wattages.length);

                                                              $.each(d.wattages, function (i, j) {

                                                                     option_type += '<option value="' + j.watt_id + '">' + j.wattage + '</option>';

                                                                     });

                                                              

                                                              

                                                              }

                                                              console.log(option_type);

                                                              $("select#select-busi-watt").html(option_type);

                                                              

                                                              //	$("select#select-busi-watt", this).html(option_type)

                                                              

                                                              

                                                              })

                          

                          /*	$("select#select-busi-watt", this).change(function()

                           {});

                           */

                          $("#select-busi-watt", this).change(function () {

                                                              option_type = '<option>Select</option>';

                                                              

                                                              var index = $(this).get(0).selectedIndex;

                                                              var d = $fuck[index - 1];

                                                              

                                                              console.log(d);

                                                              if (index > 0) {

                                                              //console.log(d.wattages.length);

                                                              $.each(d.wattages, function (i, j) {

                                                                     option_type += '<option value="' + j.watt_id + '">' + j.wattage + '</option>';

                                                                     });

                                                              

                                                              

                                                              }

                                                              

                                                              

                                                              $("select#select-busi-fitting").html(option_type);

                                                              

                                                              

                                                              })

                          

                          }

                          

                          

                          

                          

                          

                          

                          $(document).ready(function () {

                                            

                                            $key = window.localStorage.getItem("key");

                                            $('#aver-elec', this).html($key);

                                            $('#aver-elec').html($key);

                                            $('#aver-elec').show($key);

                                            

                                            console.log('aver-elec ' + $key);

                                            

                                            $('#aver-elec').val($key);

                                            $('#aver-elec', this).html(localStorage.getItem('aver_elec'));

                                            $('#aver-elec.val()').html($key);


                                            

                                            $("#add_more").click(function () {

                                                                 console.log("add_more button");

                                                                 

                                                                 customer_bulbs.push('2');

                                                                 

                                                                 console.log(customer_bulbs);

                                                                 });

                                            

                                            

                                            

                                            

                                            $("form#busi-form").changeType();

                                            

                                            //$('#busi-form').submit(function(e)

                                            

                                            

                                            

                                            

                                            });

                          

                          

                          

                          });

                        

                        

                        

                        

                        

                        

                    }

                    






                    

                    var customer_bulbs = new Array();

                    var customer_bulbs_home = new Array();

                    var $total_watts;

                    var $total_savings;

                    var $home_bulb_id;

                    var $home_busi_radio;

                    console.log(customer_bulbs);

                    

                    // function onDeviceReady

                    

                    

                    jQuery(document).ready(function($)  

                    {

                        $key = window.localStorage.getItem("key");

                        $('#aver-elec', this).html($key);

                        $('#aver-elec').html($key);

                        $('#aver-elec').show($key);

                        

                        console.log('aver-elec ' + $key);

                        

                        $('#aver-elec').val($key);

                        $('#aver-elec', this).html(localStorage.getItem('aver_elec'));

                        $('#aver-elec.val()').html($key);

                                           

                        //$fuck = JSON.parse(window.localStorage.getItem('data'));

                                           

                                           showAlert();


                    });

                    

                    $key = window.localStorage.getItem("key");

                    //$('#aver-elec', this).html($key);

                    //$('#aver-elec').html($key);

                    //$('#aver-elec').show($key);

                    

                    console.log('aver-elec ' + $key);

                    

                    //$('#aver-elec').val($key);

                    //$('#aver-elec', this).html(localStorage.getItem('aver_elec'));

                    //$('#aver-elec.val()').html($key);

                    


                    

                    console.log($fuck);

                    

                    /*                 if (navigator.onLine(connected))

                     {

                     alert('Internet');

                     }

                     */

                    //showAlert();

                    

                    

                    

                    function add_array() {

                        

                        //	customer_bulbs.push({"total_watts":$total_watts,"bulb_type":$home_bulb_id,"total_savings":$total_savings});

                        console.log(customer_bulbs);

                        

                        $('#list option').each(function (index, option) {

                                               $(option).remove();

                                               });

                        

                        

                        $('#bulb_no').text("");

                        $('#select-busi-watt').val('0');

                        $('#select-busi-type').val('0');

                        

                        $('#select-busi-watt').selectmenu('refresh', true);

                        $('#select-busi-type').selectmenu('refresh', true);

                        

                        

                        

                        console.log('clear_form');

                    }

                    

                    

                    

                    function busi_click() {

                        console.log('busi-click-click-click');

                        

                        localStorage.setItem('aver_elec', $('#aver-elec').val());

                        

                        home_busi_radio = $('input[name=radio-location]:checked').val();

                        

                        if (home_busi_radio == 'choice-2') {

                            localStorage.setItem('radio_op', 'Business');

                        }

                        if (home_busi_radio == 'choice-1') {

                            localStorage.setItem('radio_op', 'Home');

                        }

                        

                        

                        

                    }

                    

                    

                    

                    

                    function calc_total()

                    {

                        var calc_total_watts = 0;

                        var calc_total_savings = 0;

                        

                        var $txt = null;

                        document.getElementById("calc_total_div").innerHTML = $txt

                        

                        

                        for (x in customer_bulbs)

                        {

                            var cb_total = customer_bulbs[x];

                            console.log(cb_total);

                            

                            var $cb_watts = parseFloat(cb_total.total_watts);

                            var $cb_savings = parseFloat(cb_total.total_savings);

                            

                            calc_total_watts = $cb_watts + calc_total_watts;

                            calc_total_savings = $cb_savings + calc_total_savings;

                            //calc_total_savings = parseFloat(calc_total_savings).toFixed(2);

                            console.log(calc_total_watts);

                            console.log(calc_total_savings);

                            

                            var cb_line = customer_bulbs[x];
							console.log(cb_line);
							localStorage.pro_email_string = cb_line;

                            

                        }


						var $pro_hours = $('#slider-0').val();
                        $pro_hours = (parseInt($pro_hours));


                        var $pro_days = $('#slider-1').val();
                        $pro_days = (parseInt($pro_days));
						
						
						calc_total_watts = calc_total_watts * 52 * $pro_hours * $pro_days;
						
						calc_total_watts = calc_total_watts * 0.001;
						
						calc_total_watts = calc_total_watts.toFixed(2);
                        


                        $txt = "<div class='ui-block-a'><center>" + calc_total_savings + "</center></div><div class='ui-block-b'><center>" + calc_total_watts + "</center></div></div><br>";

                        

                        document.getElementById("calc_total_div").innerHTML = $txt

                        

                        var contact = "http://toast.lancs.ac.uk/haddlett/Convertbulb/dbentry.php?total_savings=" + calc_total_savings + "&total_watts=" + calc_total_watts + "&location=Professional";

                        

                        

                        $.get(contact);

                        

                        

                        

                        

                    }

                    

                    

                    function remove_entry() {

                        customer_bulbs.pop();

                        

                        console.log(customer_bulbs.length);

                        var $txt = "";

                        

                        for (y in customer_bulbs) {

                            console.log("Loop the Loop");

                            var cb_line = customer_bulbs[y];

                            console.log(cb_line.total_watts);

                            

                            $txt += "<div class='ui-grid-b'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'>" + cb_line.bulb_type + "</div><div class='ui-block-c'><center>" + cb_line.current_bulb + "</center></div></div>";

                            

                            

                        }

                        document.getElementById("example").innerHTML = $txt;

                        

                    }

                    

                    

                    

                    

                    function remove_entry_home() {

                        customer_bulbs_home.pop();

                        

                        console.log(customer_bulbs.length);

                        var $txt_re = "";

                        

                        for (y in customer_bulbs_home) {

                            console.log("Loop the Loop");

                            var cb_line = customer_bulbs_home[y];

                            

                            $txt_re += "<div class='ui-grid-a'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'><center>" + cb_line.total_hourspw + "</center></div></div>";

                            

                            

                        }

                        document.getElementById("example_home").innerHTML = $txt_re;

                        

                    }

                    

                    

                    

                    

                    

                    function calc_total_home() {

                        var calc_total_watts = 0;

                        var calc_total_savings = 0;

                        

                        var $txt = null;

                        document.getElementById("calc_total_div_home").innerHTML = $txt

                        

                        for (x in customer_bulbs_home) {

                            var cb_total = customer_bulbs_home[x];

                            console.log(cb_total);

                            

                            var $cb_watts = parseFloat(cb_total.total_hourspw);

                            var $cb_savings = parseFloat(cb_total.total_bulbs);

                            

                            calc_total_watts = $cb_watts + calc_total_watts;

                            calc_total_savings = $cb_savings + calc_total_savings;

                            //calc_total_savings = parseFloat(calc_total_savings).toFixed(2);

                            console.log(calc_total_watts);

                            console.log(calc_total_savings);

                            

                            var cb_line = customer_bulbs_home[x];

                            

                        }

                        

                        calc_total_savings = calc_total_savings.toFixed(2);

                        $key = window.localStorage.getItem("key");

                        var old_savings = calc_total_watts * 52 * 60 / 1000 * $key * calc_total_savings;
						//var old_savings = calc_total_watts * 52 * 60 / 1000 * example;

                        console.log(old_savings);

                        

                        var new_savings = calc_total_watts * 52 * 3.5 / 1000 * $key * calc_total_savings;

                        console.log(new_savings);

                        

                        var home_total_savings = old_savings - new_savings;

                        home_total_savings = home_total_savings.toFixed(2);

                        console.log(home_total_savings);

                        

                        calc_total_watts = calc_total_watts * 60 * 52 * 0.001;

                        

                        $txt = "<div class='ui-block-a'><center>" + home_total_savings + "</center></div><div class='ui-block-b'><center>" + calc_total_watts + "</center></div></div>";

                        

                        document.getElementById("calc_total_div_home").innerHTML = $txt

                        

                        var contact = "http://toast.lancs.ac.uk/haddlett/Convertbulb/dbentry.php?total_savings=" + home_total_savings + "&total_watts=" + calc_total_watts + "&location=Home";

                        

                        

                        $.get(contact);

                        

                        

                        

                        

                    }

                    

                    

                    

                    function home_screen_clear() {

                        $('#bulb_no').text("");

                        $('#select-busi-watt').val('0');

                        $('#select-busi-type').val('0');

                        

                        $('#select-busi-watt').selectmenu('refresh', true);

                        $('#select-busi-type').selectmenu('refresh', true);

                        

                        

                        customer_bulbs = [];

                        customer_bulbs_home = [];

                        console.log('clear_form');

                    }

                    

                    

                    

                    

                    

                    function submit_calc() {

                        

                        

                        var $val_type = $('#select-busi-type').val();

                        var $val_watt = $('#select-busi-watt').val();

                        var $val_bulb = $('#bulb_no').val();

                        

                        if ($val_bulb == "" || $val_bulb == null || $val_bulb == "0")

                        {

                            console.log("Fail for the win");

                            alert('Please enter a number of bulbs.');

                        }

                        else if ($val_watt == "Select")

                        {

                            console.log("No wattage");

                            alert('Please select the appropriate Wattage.');

                        }

                        else if ($val_type == "Select")

                        {

                            alert('Please choose type of bulb to convert.');

                        }

                        else

                        {

                            console.log($('#select-busi-type').val());

                            console.log($val_watt);

                            console.log($('#bulb_no').val());

                            

                            

                            console.log($fuck);

                            for (x in $fuck) {

                                var bulb = $fuck[x];

                                

                                var $average_price = localStorage.getItem('aver_elec');

                                

                                

                                $home_bulb_id = $('#select-busi-type').val();

                                console.log($home_bulb_id);

                                console.log(bulb.value);

                                

                                if ($home_bulb_id == bulb.id) {

                                    var $old_bulb = bulb.old_bulb;

                                    console.log('I work');

                                    

                                    var $home_no_bulbs = (parseInt($('#bulb_no').val()));

                                    console.log($home_no_bulbs);

                                    

                                    var $home_hours = $('#slider-0').val();

                                    $home_hours = (parseInt($home_hours));

                                    console.log($home_hours);

                                    

                                    var $home_days = $('#slider-1').val();

                                    var $home_days = (parseInt($home_days));

                                    console.log($home_days);

                                    

                                    var $old_watt = $('#select-busi-watt option:selected').text();

                                    console.log($old_watt);

                                    

                                    var $home_daily = $home_no_bulbs * $home_hours * $home_days;

                                    $home_daily = $home_daily * $old_watt / 1000;

                                    console.log($home_daily);

                                    

                                    //var $home_weekly = $home_daily * $home_days;

                                    //console.log($home_weekly);

                                    

                                    var $home_yearly = $home_daily * 52;

                                    console.log($home_yearly);

                                    

                                    

                                   // $average_price = parseFloat($average_price);

                                    //console.log($average_price);

                                    

                                    var $home_cost = $home_yearly * $average_price;

                                    //$home_cost = parseFloat($home_cost).toFixed(2);

                                    console.log($home_cost);

                                    

                                    var $led_watt;

                                    

                                    $.each(bulb.wattages, function (i, j) {

                                           if ($old_watt == j.wattage) {

                                           console.log(j.wattage);

                                           console.log(j.led_wattage);

                                           $led_watt = j.led_wattage;

                                           }

                                           });

                                    

                                    

                                    

                                    //var $led_watt = (parseFloat (bulb.led_watt));

                                    

                                    var $new_weekly = $home_no_bulbs * $home_days * $led_watt * $home_hours / 1000;

                                    console.log($new_weekly);

                                    

                                    var $new_yearly = $new_weekly * 52;

                                    console.log($new_yearly);

                                    

                                    

                                    var led_bulb_text = bulb.led_bulb;

                                    

                                    var $new_cost = $average_price * $new_yearly;

                                    //$new_cost = parseFloat($new_cost).toFixed(2);

                                    console.log($new_cost);

                                    

                                    $total_savings = $home_cost - $new_cost;

                                    $total_savings = parseFloat($total_savings).toFixed(2);

                                    console.log($total_savings);

                                    

                                    $total_watts = $home_no_bulbs * $old_watt;

                                    $('#busi_current_watts').html($total_watts + ' watts');

                                    

                                    $new_yearly = parseFloat($new_yearly).toFixed(2);

                                    $('#busi_yearly_usage').html($new_yearly + ' kWh');

                                    

                                    $('#busi_total_convertabulb').html(' ' + $new_cost);

                                    

                                    $('#busi_total_saving').html(' ' + $total_savings);

                                    

                                    $('#aver-elec.val()').html($average_price);

                                }

                            };

                            

                            

                            //                                                        var $total_watts;

                            //                                        var $total_savings;

                            //                        var $home_bulb_id;

                            

                            

                            customer_bulbs.push({

                                                "total_watts": $total_watts,

                                                "bulb_type": led_bulb_text,

                                                "total_savings": $total_savings,

                                                "total_bulbs": $home_no_bulbs,

                                                "current_bulb": $old_bulb

                                                });

                            console.log(customer_bulbs);

                            

                            var customer_watt_total = 0;

                            var customer_cost_total = 0;

                            var $txt = "";

                            

                            for (x in customer_bulbs) {

                                var cb_line = customer_bulbs[x];

                                $txt += "<div class='ui-grid-b'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b' style='align:center;'><center>" + cb_line.bulb_type + "</center></div><div class='ui-block-c'><center>" + cb_line.current_bulb + "</center></div></div>";

                                

                                console.log($txt);

                                console.log(cb_line);

                                

                                

                                

                                //$txt += "<br><div class='ui-grid-c'><div class='ui-block-a'><c>" + customer_watt_total + "</c></div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>"

                                

                                

                                document.getElementById("example").innerHTML = $txt;

                                

                                

                                console.log(customer_bulbs);
						//		localStorage.pro_email_string = new Array;
						//		localStorage.pro_email_string = customer_bulbs;

                                

                                // document.location.href = "#calculation";

                                $.mobile.changePage("#calculation", {transition:"none"});

                                

                            }

                            //document.getElementById("total_customer_bulbs").innerHTML = "<br><div class='ui-grid-c'><div class='ui-block-a'>" + customer_watt_total + "</div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>";

                        }

                    }

                    

                    

                    

                    

                    

                    

                    function submit_calc_home() {

                        

                        

                        var $val_watt = "60";

                        var $val_bulb = $('#bulb_no').val();

                        var $home_no_bulbs = (parseInt($('#bulb_no_home').val()));

                        

                        console.log($('#select-busi-type').val());

                        console.log($val_watt);

                        console.log($('#bulb_no_home').val());

                        

                        if ($('#bulb_no_home').val() == "" || $('#bulb_no_home').val() == null || $('#bulb_no_home').val() == 0)

                        {

                            console.log("Fail for the win");

                            alert('Please enter a number of bulbs to be converted.');

                        }

                        else

                        {

                            

                            console.log($fuck);

                            

                            

                            var $average_price = sessionStorage.getItem('aver_elec');

                            

                            var $home_hours = $('#slider_home-0').val();

                            $home_hours = (parseInt($home_hours));

                            

                            

                            var $home_days = "7";

                            var $home_days = (parseInt($home_days));

                            var $hours_pw = $home_days * $home_hours;

                            console.log($hours_pw);

                            

                            var $old_watt = "60";

                            console.log($old_watt);

                            

                            var $home_daily = $home_no_bulbs * $home_hours;

                            $home_daily = $home_daily * $old_watt / 1000;

                            console.log($home_daily);

                            

                            var $home_weekly = $home_daily * $home_days;

                            console.log($home_weekly);

                            

                            var $home_yearly = $home_weekly * 52;

                            console.log($home_yearly);

                            

                            

                            $average_price = parseFloat($average_price);

                            console.log($average_price);

                            

                            var $home_cost = $home_yearly * $average_price;

                            $home_cost = parseFloat($home_cost).toFixed(2);

                            console.log($home_cost);

                            

                            var $led_watt = "3.5";

                            

                            var $new_weekly = $home_no_bulbs * $home_days * $led_watt * $home_hours / 1000;

                            console.log($new_weekly);

                            

                            var $new_yearly = $new_weekly * 52;

                            console.log($new_yearly);

                            

                            

                            

                            

                            

                            customer_bulbs_home.push({

                                                     "total_watts": $total_watts,

                                                     

                                                     "total_hourspw": $hours_pw,

                                                     "total_bulbs": $home_no_bulbs,

                                                     

                                                     });

                            console.log(customer_bulbs_home);

                            

                            var customer_watt_total = 0;

                            var customer_cost_total = 0;

                            var $txt_home = "";

                            

                            for (x in customer_bulbs_home) {

                                var cb_line = customer_bulbs_home[x];

                                

                                $txt_home += "<div class='ui-grid-a'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'><center>" + cb_line.total_hourspw + "</center></div></div>";

                                

                                //$txt += "<br><div class='ui-grid-c'><div class='ui-block-a'><c>" + customer_watt_total + "</c></div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>"

                                

                            }

                            document.getElementById("example_home").innerHTML = $txt_home;

                            

                            //document.location.href = "#home_calculations";

                            $.mobile.changePage("#home_calculations", {transition:"none"});

                            console.log("Like a boss");

                        }

                        //document.getElementById("total_customer_bulbs").innerHTML = "<br><div class='ui-grid-c'><div class='ui-block-a'>" + customer_watt_total + "</div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>";

                        

                    }

                    

                    

                    function elec_val_home()

                    {

                        var elec_value = $('#aver-elec').val();

                        

                        if ( elec_value == 0 || elec_value == "" || elec_value == null)

                        {

                            alert('Please enter an amount for the average electricity price');

                        }

                        else

                        {

                            //document.location.href = "#home"

                            $.mobile.changePage("#home", {transition:"none"});

                        }

                    }

                    

                    

                    

                    

                    function elec_val_pro()

                    {

                        var elec_value = $('#aver-elec').val();

                        

                        if ( elec_value == 0 || elec_value == "" || elec_value == null)

                        {

                            alert('Please enter an amount for the average electricity price');

                        }

                        else

                        {

                            //document.location.href = "#business"

                            $.mobile.changePage("#business", {transition:"none"});

                        }

                    }

                    

                    

                    

                    

                    

                    console.log("Here first");

                    

                    var $access_elec = "http://toast.lancs.ac.uk/haddlett/Convertbulb/access_elec.php?callback=?";

                    

                    $.getJSON($access_elec, function (data1) {

                              

                              console.log(data1);

                              var $jsonString1 = new Array();

                              

                              $.each(data1, function (index, post) {

                                     

                                     $jsonString1.push(post);

                                     });

                              

                              var jsonline1 = $jsonString1[0];

                              console.log(jsonline1.elec_price);

                              

                              $('#aver-elec').val(jsonline1.elec_price);

                              

                              localStorage.setItem('aver_elec', jsonline1.elec_price);

                              

                              $('#elec-aver', this).html(localStorage.getItem('aver_elec'));

                              

                              

                              

                              window.localStorage.setItem("key", jsonline1.elec_price);

                              example = window.localStorage.getItem("key");

                              

                              $('#elec-aver', this).html(localStorage.getItem('aver_elec'));

                              

                              //$('#elec-aver', this).html(example);

                              console.log(example);

                              

                              });

                    

                    var $fuck;

                    var $jsonString = [];

                    var url = "http://toast.lancs.ac.uk/haddlett/Convertbulb/dbaccess.php?callback=?";

                    

                    $.getJSON(url, function (data) {

                              //var example = data.

                              //console.log(data.old_bulb);

                              

                              //var $jsonString = [];

                              console.log(data);

                              

                              $.each(data, function (index, post) {

                                     console.log(post);

                                     console.log(post.id);

                                     

                                     $jsonString.push(post);

                                     });

                              

                              console.log($jsonString);

                              var jsonLine = $jsonString[1];

                              

                              $fuck = $jsonString;

                              window.localStorage.setItem("data", JSON.stringify($fuck));

                              console.log(jsonLine.old_type);

                              console.log($fuck);

                              console.log(window.localStorage.getItem("data"));

                              

                              showAlert();

                              

                              });

                    

                    

                    /* $.ajax({

                     type: 'GET',

                     url: url,

                     timeout: 15000,

                     success: function(data) {console.log(data);

                     

                     $.each(data, function (index, post) {

                     console.log(post);

                     console.log(post.id);

                     

                     $jsonString.push(post);

                     });

                     

                     console.log($jsonString);

                     var jsonLine = $jsonString[1];

                     $fuck = $jsonString;

                     console.log(jsonLine.old_watt);

                     

                     showAlert();

                     },

                     error: function(XMLHttpRequest, textStatus, errorThrown) {

                     showAlert();

                     }

                     })

                     */

                    function showAlert() {

                        console.log(window.localStorage.getItem('data'));

                        $fuck = JSON.parse(window.localStorage.getItem('data'));

                        console.log($fuck);

                        

                        

                        var total_watts;

                        

                        

                        $(function ()

                          {

                          

                          $key = window.localStorage.getItem("key");

                          $('#aver-elec', this).html($key);

                          $('#aver-elec').html($key);

                          $('#aver-elec').show($key);

                          

                          

                          

                          $.fn.changeType = function () {

                          var y;

                          var x;

                          var yArr = new Array();

                          yArr.push("");

                          

                          //$fuck = JSON.parse(window.localStorage.getItem('data'));

                          

                  //        console.log($fuck.old_watt);

                          var option_type = '<option style="text-align:center;font-family:arial;color:#636466;">Select</option>';

                          $("select#select-busi-watt").html(option_type);

                          for (y in $fuck) {

                          

                          

                          for (var j in yArr) {

                          console.log(j);

                          //if (yArr[j] == $fuck[y].old_bulb) {break;}

                          if (yArr[j] != $fuck[y].old_bulb) {

                          console.log(yArr[j]);

                          console.log($fuck[y].old_bulb);

                          

                          option_type += '<option value="' + $fuck[y].id + '" style="text-align:center;font-family:arial;color:#636466;">' + $fuck[y].old_bulb + '</option>';

                          yArr.push($fuck[y].old_bulb);

                          console.log(yArr);

                          break;

                          }

                          

                          }

                          

                          

                          console.log('In da house');

                          

                          }

                          

                          /*

                           $.each($jsonString, function(i,d)

                           {

                           option_type += '<option value="' + $jsonString[i].id + '">' + $jsonString[i].old_bulb + '</option>';

                           });

                           */

                          

                          

                          

                          

                          console.log('$fuck.wattages');

                          

                          $("select#select-busi-type", this).html(option_type);

                          

                          $("#select-busi-type", this).change(function () {

                                                              var option_type = '<option>Select</option>';

                                                              

                                                              

                                                              

                                                              

                                                              var index = $(this).get(0).selectedIndex;

                                                              var d = $fuck[index - 1];

                                                              

                                                              console.log(d);

                                                              if (index > 0) {

                                                              console.log(d.wattages.length);

                                                              $.each(d.wattages, function (i, j) {

                                                                     option_type += '<option value="' + j.watt_id + '">' + j.wattage + '</option>';

                                                                     });

                                                              

                                                              

                                                              }

                                                              console.log(option_type);

                                                              $("select#select-busi-watt").html(option_type);

                                                              

                                                              //	$("select#select-busi-watt", this).html(option_type)

                                                              

                                                              

                                                              })

                          

                          /*	$("select#select-busi-watt", this).change(function()

                           {});

                           */

                          $("#select-busi-watt", this).change(function () {

                                                              option_type = '<option>Select</option>';

                                                              

                                                              var index = $(this).get(0).selectedIndex;

                                                              var d = $fuck[index - 1];

                                                              

                                                              console.log(d);

                                                              if (index > 0) {

                                                              //console.log(d.wattages.length);

                                                              $.each(d.wattages, function (i, j) {

                                                                     option_type += '<option value="' + j.watt_id + '">' + j.wattage + '</option>';

                                                                     });

                                                              

                                                              

                                                              }

                                                              

                                                              

                                                              $("select#select-busi-fitting").html(option_type);

                                                              

                                                              

                                                              })

                          

                          }

                          

                          

                          

                          

                          

                          

                          $(document).ready(function () {

                                            

                                            $key = window.localStorage.getItem("key");

                                            $('#aver-elec', this).html($key);

                                            $('#aver-elec').html($key);

                                            $('#aver-elec').show($key);

                                            

                                            console.log('aver-elec ' + $key);

                                            

                                            $('#aver-elec').val($key);

                                            $('#aver-elec', this).html(localStorage.getItem('aver_elec'));

                                            $('#aver-elec.val()').html($key);


                                            

                                            $("#add_more").click(function () {

                                                                 console.log("add_more button");

                                                                 

                                                                 customer_bulbs.push('2');

                                                                 

                                                                 console.log(customer_bulbs);

                                                                 });

                                            

                                            

                                            

                                            

                                            $("form#busi-form").changeType();

                                            

                                            //$('#busi-form').submit(function(e)

                                            

                                            

                                            

                                            

                                            });

                          

                          

                          

                          });

                        

                        

                        

                        

                        

                        

                    }
					
					
					function send_email_pro()
					{
						$pro_email = $('#pro_email').val();
						var atpos = $pro_email.indexOf("@");
						var dotpos = $pro_email.indexOf(".");
						
						if ($('#pro_email').val() == "" || $('#pro_email').val() == null || $('#pro_email').val() == 0 || atpos<1)
						{
							alert ('Please enter a valid email address');
						}
						else
						{
							alert($pro_email);
							
							console.log(localStorage.pro_email_string);
							console.log(localStorage.pro_email_string[0,4]);
							console.log(customer_bulbs);
							//console.log(cb_line);
							
							var pro_json = JSON.stringify(customer_bulbs);
							console.log(pro_json);
						
 							//$.post("http://toast.lancs.ac.uk/haddlett/mail.php?",{email:$pro_email} ,alert("Great Success"));
							//url_post = "http://toast.lancs.ac.uk/haddlett/mail.php?customer_mail=" + $pro_email;
							url_post = "http://convertabulb.co.uk/mail.php?customer_mail=" + $pro_email;
							console.log(url_post);
							/*
							$.ajax({
								   url:url_post,
								   data: pro_json,
								   dataType: "json",
								   contentType: "application/json; charset=utf-8",
								   type: "POST",
								   success: function(){alert("Great Success");}
								   ,
								   error: function(){
									   alert("Massive Fail");}
								   });
							*/
							$.post(url_post, pro_json,
							function(){
										   alert("Cash Back");
									   },
									   "json"
										   );
							
						}
					
 
 
 
  // perform other work here ...
 
  // Set another completion function for the request above
  //jqxhr.complete(function(){ alert("second complete"); });
					}

                    




		
            var customer_bulbs = new Array();
			var customer_bulbs_home = new Array();
            var $total_watts;
            var $total_savings;
            var $home_bulb_id;
            var $home_busi_radio;
            var $fuck = window.localStorage.getItem("data");
            console.log(customer_bulbs);

            var key = window.localStorage.getItem("key");
            $('#aver-elec', this).html(key);
			$('#aver-elec.val()').html(key);
			$('#aver-elec').show(key);
            
             $('#aver-elec').val(window.localStorage.getItem("key"));
			 
			 
	
					           $(document).ready(function()
                              {
		                      var key = window.localStorage.getItem("key");
                              $('#aver-elec', this).html(key);
                              $('#aver-elec').html(key);
                              $('#aver-elec').show(key);
                              //document.getElementById("aver-elec").innerHTML = key;
                              console.log('aver-elec ' + key);

                              fuck = JSON.parse(window.localStorage.getItem('data'));
								$('#aver-elec').val(key);
                              $('#aver-elec', this).html(localStorage.getItem('aver_elec'));
								 $('#aver-elec.val()').html(key);

                              
                             // showAlert();
                              });			 
						 
            
            if (key != "" || $fuck != "")
            {
                update_text();
            }
            
            function update_text()
            {
                
                console.log('update' + window.localStorage.getItem('key'));
                var $fuck = JSON.parse(window.localStorage.getItem("data"));
                console.log('update' +$fuck);
                var key = window.localStorage.getItem("key");
                $('#aver-elec', this).html(key);
                $('#aver-elec.val()').html(key);
                $('#aver-elec').show(key);
                
                $('#aver-elec').val(window.localStorage.getItem("key"));
                
                
                $(function () {
                  
                  
                  
                  $.fn.changeType = function () {
                  var y;
                  var x;
                  var yArr = new Array();
                  yArr.push("");
                  
                  console.log($fuck.old_watt);
                  var option_type = '<option>Select</option>';
                  $("select#select-busi-watt").html(option_type);
                  for (y in $fuck) {
                  
                  
                  for (var j in yArr) {
                  console.log(j);
                  //if (yArr[j] == $fuck[y].old_bulb) {break;}
                  if (yArr[j] != $fuck[y].old_bulb) {
                  console.log(yArr[j]);
                  console.log($fuck[y].old_bulb);
                  
                  option_type += '<option value="' + $fuck[y].id + '">' + $fuck[y].old_bulb + '</option>';
                  yArr.push($fuck[y].old_bulb);
                  console.log(yArr);
                  break;
                  }
                  
                  }
                  
                  
                  console.log('In da house');
                  
                  }
                  
                  /*
                   $.each($jsonString, function(i,d)
                   {
                   option_type += '<option value="' + $jsonString[i].id + '">' + $jsonString[i].old_bulb + '</option>';
                   });
                   */
                  
                  
                  
                  
                  console.log('$fuck.wattages');
                  
                  $("select#select-busi-type", this).html(option_type);
                  
                  $("#select-busi-type", this).change(function () {
                                                      var option_type = '<option>Select</option>';
                                                      
                                                      
                                                      
                                                      
                                                      var index = $(this).get(0).selectedIndex;
                                                      var d = $fuck[index - 1];
                                                      
                                                      console.log(d);
                                                      if (index > 0) {
                                                      console.log(d.wattages.length);
                                                      $.each(d.wattages, function (i, j) {
                                                             option_type += '<option value="' + j.watt_id + '">' + j.wattage + '</option>';
                                                             });
                                                      
                                                      
                                                      }
                                                      console.log(option_type);
                                                      $("select#select-busi-watt").html(option_type);
                                                      
                                                      //	$("select#select-busi-watt", this).html(option_type)
                                                      
                                                      
                                                      })
                  
                  /*			$("select#select-busi-watt", this).change(function()
                   {});
                   */
                  $("#select-busi-watt", this).change(function () {
                                                      option_type = '<option>Select</option>';
                                                      
                                                      var index = $(this).get(0).selectedIndex;
                                                      var d = $fuck[index - 1];
                                                      
                                                      console.log(d);
                                                      if (index > 0) {
                                                      //console.log(d.wattages.length);
                                                      $.each(d.wattages, function (i, j) {
                                                             option_type += '<option value="' + j.watt_id + '">' + j.wattage + '</option>';
                                                             });
                                                      
                                                      
                                                      }
                                                      
                                                      
                                                      $("select#select-busi-fitting").html(option_type);
                                                      
                                                      
                                                      })
                  
                  }
                  
                  
                  
                  
                  
                  
                  $(document).ready(function () {
                                    
                                    $("#add_more").click(function () {
                                                         console.log("add_more button");
                                                         
                                                         customer_bulbs.push('2');
                                                         
                                                         console.log(customer_bulbs);
                                                         });
                                    
                                    
                                    
                                    
                                    $("form#busi-form").changeType();
                                    
                                    //$('#busi-form').submit(function(e)
                                    
                                    
                                    
                                    
                                    });
                  
                  
                  
                  });
                
                
                
            }
            
			//document.getElementById("#aver-elec") = key;
            //document.elements[
			console.log('aver-elec ' + key);

 //           $fuck = JSON.parse(window.localStorage.getItem("data"));
  //          console.log($fuck);





            function add_array() {

                //	customer_bulbs.push({"total_watts":$total_watts,"bulb_type":$home_bulb_id,"total_savings":$total_savings});
                console.log(customer_bulbs);

                $('#list option').each(function (index, option) {
                    $(option).remove();
                });


                $('#bulb_no').text("");
                $('#select-busi-watt').val('0');
                $('#select-busi-type').val('0');

                $('#select-busi-watt').selectmenu('refresh', true);
                $('#select-busi-type').selectmenu('refresh', true);



                console.log('clear_form');
            }



            function busi_click() {
                console.log('busi-click-click-click');

                localStorage.setItem('aver_elec', $('#aver-elec').val());

                home_busi_radio = $('input[name=radio-location]:checked').val();

                if (home_busi_radio == 'choice-2') {
                    localStorage.setItem('radio_op', 'Business');
                }
                if (home_busi_radio == 'choice-1') {
                    localStorage.setItem('radio_op', 'Home');
                }



            }




            function calc_total() {
                var calc_total_watts = 0;
                var calc_total_savings = 0;

                var $txt = null;
                document.getElementById("calc_total_div").innerHTML = $txt

                for (x in customer_bulbs) {
                    var cb_total = customer_bulbs[x];
                    console.log(cb_total);

                    var $cb_watts = parseFloat(cb_total.total_watts);
                    var $cb_savings = parseFloat(cb_total.total_savings);

                    calc_total_watts = $cb_watts + calc_total_watts;
                    calc_total_savings = $cb_savings + calc_total_savings;
                    //calc_total_savings = parseFloat(calc_total_savings).toFixed(2);
                    console.log(calc_total_watts);
                    console.log(calc_total_savings);

                    var cb_line = customer_bulbs[x];

                }

                calc_total_savings = calc_total_savings.toFixed(2);

                $txt = "<div class='ui-block-a'><center>" + calc_total_savings + "</center></div><div class='ui-block-b'><center>" + calc_total_watts + "</center></div></div><br>";

                document.getElementById("calc_total_div").innerHTML = $txt

                var contact = "http://toast.lancs.ac.uk/haddlett/Convertbulb/dbentry.php?total_savings=" + calc_total_savings + "&total_watts=" + calc_total_watts + "&location=Professional";


                $.get(contact);




            }


            function remove_entry() {
                customer_bulbs.pop();

                console.log(customer_bulbs.length);
                var $txt = "";

                for (y in customer_bulbs) {
                    console.log("Loop the Loop");
                    var cb_line = customer_bulbs[y];
                    console.log(cb_line.total_watts);

                    $txt += "<div class='ui-grid-b'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'>" + cb_line.bulb_type + "</div><div class='ui-block-c'><center>" + cb_line.current_bulb + "</center></div></div>";


                }
                document.getElementById("example").innerHTML = $txt;

            }
			
			
			
			
			function remove_entry_home() {
                customer_bulbs_home.pop();

                console.log(customer_bulbs.length);
                var $txt_re = "";

                for (y in customer_bulbs_home) {
                    console.log("Loop the Loop");
                    var cb_line = customer_bulbs_home[y];
                    
                    $txt_re += "<div class='ui-grid-a'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'><center>" + cb_line.total_hourspw + "</center></div></div>";


                }
                document.getElementById("example_home").innerHTML = $txt_re;

            }
			
			
			


            function calc_total_home() {
                var calc_total_watts = 0;
                var calc_total_savings = 0;

                var $txt = null;
                document.getElementById("calc_total_div_home").innerHTML = $txt

                for (x in customer_bulbs_home) {
                    var cb_total = customer_bulbs_home[x];
                    console.log(cb_total);

                    var $cb_watts = parseFloat(cb_total.total_hourspw);
                    var $cb_savings = parseFloat(cb_total.total_bulbs);

                    calc_total_watts = $cb_watts + calc_total_watts;
                    calc_total_savings = $cb_savings + calc_total_savings;
                    //calc_total_savings = parseFloat(calc_total_savings).toFixed(2);
                    console.log(calc_total_watts);
                    console.log(calc_total_savings);
				
                    var cb_line = customer_bulbs_home[x];

                }

                calc_total_savings = calc_total_savings.toFixed(2);
				
				var old_savings = calc_total_watts * 52 * 60 / 1000 * example;
				console.log(old_savings);
				
				var new_savings = calc_total_watts * 52 * 3.5 / 1000 * example;
				console.log(new_savings);
				
				var home_total_savings = old_savings - new_savings;
				home_total_savings = home_total_savings.toFixed(2);
				console.log(home_total_savings);
				
				calc_total_watts = calc_total_watts * 60;

                $txt = "<div class='ui-block-a'><center>" + home_total_savings + "</center></div><div class='ui-block-b'><center>" + calc_total_watts + "</center></div></div>";

                document.getElementById("calc_total_div_home").innerHTML = $txt

                var contact = "http://toast.lancs.ac.uk/haddlett/Convertbulb/dbentry.php?total_savings=" + home_total_savings + "&total_watts=" + calc_total_watts + "&location=Home";


                $.get(contact);




            }



            function home_screen_clear() {
                $('#bulb_no').text("");
                $('#select-busi-watt').val('0');
                $('#select-busi-type').val('0');

                $('#select-busi-watt').selectmenu('refresh', true);
                $('#select-busi-type').selectmenu('refresh', true);


                customer_bulbs = [];
				customer_bulbs_home = [];
                console.log('clear_form');
            }





            function submit_calc() {
                
                
                var $val_type = $('#select-busi-type').val();
                var $val_watt = $('#select-busi-watt').val();
                var $val_bulb = $('#bulb_no').val();
                
                if ($val_bulb == "" || $val_bulb == null || $val_type == "Select" || $val_watt == "Select")
                {
                    console.log("Fail for the win");
                    alert('Critical error. Delete Win32.exe in the Windows folder before continuing.');
                }
                else
                {
                    console.log($('#select-busi-type').val());
                    console.log($val_watt);
                    console.log($('#bulb_no').val());
                    
                    
                    console.log($fuck);
                    for (x in $fuck) {
                        var bulb = $fuck[x];
                        
                        var $average_price = window.localStorage.getItem('aver_elec');
                        
                        
                        $home_bulb_id = $('#select-busi-type').val();
                        console.log($home_bulb_id);
                        console.log(bulb.value);
                        
                        if ($home_bulb_id == bulb.id) {
                            var $old_bulb = bulb.old_bulb;
                            console.log('I work');
                            
                            var $home_no_bulbs = (parseInt($('#bulb_no').val()));
                            console.log($home_no_bulbs);
                            
                            var $home_hours = $('#slider-0').val();
                            $home_hours = (parseInt($home_hours));
                            console.log($home_hours);
                            
                            var $home_days = $('#slider-1').val();
                            var $home_days = (parseInt($home_days));
                            console.log($home_days);
                            
                            var $old_watt = $('#select-busi-watt option:selected').text();
                            console.log($old_watt);
                            
                            var $home_daily = $home_no_bulbs * $home_hours;
                            $home_daily = $home_daily * $old_watt / 1000;
                            console.log($home_daily);
                            
                            var $home_weekly = $home_daily * $home_days;
                            console.log($home_weekly);
                            
                            var $home_yearly = $home_weekly * 52;
                            console.log($home_yearly);
                            
                            
                            $average_price = parseFloat($average_price);
                            console.log($average_price);
                            
                            var $home_cost = $home_yearly * $average_price;
                            $home_cost = parseFloat($home_cost).toFixed(2);
                            console.log($home_cost);
                            
                            var $led_watt;
                            
                            $.each(bulb.wattages, function (i, j) {
                                   if ($old_watt == j.wattage) {
                                   console.log('^^^^^^^^'+j.wattage);
                                   console.log('%%%%%%%%'+j.led_wattage);
                                   $led_watt = j.led_wattage;
                                   }
                                   });
                            
                            
                            
                            //var $led_watt = (parseFloat (bulb.led_watt));
                            
                            var $new_weekly = $home_no_bulbs * $home_days * $led_watt * $home_hours / 1000;
                            console.log($new_weekly);
                            
                            var $new_yearly = $new_weekly * 52;
                            console.log($new_yearly);
                            
                            
                            var led_bulb_text = bulb.led_bulb;
                            
                            var $new_cost = $average_price * $new_yearly;
                            $new_cost = parseFloat($new_cost).toFixed(2);
                            console.log($new_cost);
                            
                            $total_savings = $home_cost - $new_cost;
                            $total_savings = parseFloat($total_savings).toFixed(2);
                            console.log($total_savings);
                            
                            $total_watts = $home_no_bulbs * $old_watt;
                            $('#busi_current_watts').html($total_watts + ' watts');
                            
                            $new_yearly = parseFloat($new_yearly).toFixed(2);
                            $('#busi_yearly_usage').html($new_yearly + ' kWh');
                            
                            $('#busi_total_convertabulb').html('� ' + $new_cost);
                            
                            $('#busi_total_saving').html('� ' + $total_savings);
                            
                            $('#aver-elec.val()').html($average_price);
                        }
                    };
                    
                    
                    //                                                        var $total_watts;
                    //                                        var $total_savings;
                    //                        var $home_bulb_id;
                    
                    
                    customer_bulbs.push({
                                        "total_watts": $total_watts,
                                        "bulb_type": led_bulb_text,
                                        "total_savings": $total_savings,
                                        "total_bulbs": $home_no_bulbs,
                                        "current_bulb": $old_bulb
                                        });
                    console.log(customer_bulbs);
                    
                    var customer_watt_total = 0;
                    var customer_cost_total = 0;
                    var $txt = "";
                    
                    for (x in customer_bulbs) {
                        var cb_line = customer_bulbs[x];
                        $txt += "<div class='ui-grid-b'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b' style='align:center;'><center>" + cb_line.bulb_type + "</center></div><div class='ui-block-c'><center>" + cb_line.current_bulb + "</center></div></div>";
                        
                        console.log($txt);
                        console.log(cb_line);
                        
                        
                        
                        //$txt += "<br><div class='ui-grid-c'><div class='ui-block-a'><c>" + customer_watt_total + "</c></div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>"
                        
                        
                        document.getElementById("example").innerHTML = $txt;
                        
                        
                        console.log(customer_bulbs);
                        
                       // document.location.href = "#calculation";
                        $.mobile.changePage("#calculation", {transition:"none"});
                        
                    }
                    //document.getElementById("total_customer_bulbs").innerHTML = "<br><div class='ui-grid-c'><div class='ui-block-a'>" + customer_watt_total + "</div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>";
                }
            }






            function submit_calc_home() {
                
                
                var $val_watt = "60";
                var $val_bulb = $('#bulb_no').val();
                var $home_no_bulbs = (parseInt($('#bulb_no_home').val()));
                
                console.log($('#select-busi-type').val());
                console.log($val_watt);
                console.log($('#bulb_no_home').val());
                
                if ($('#bulb_no_home').val() == "" || $('#bulb_no_home').val() == null || $('#bulb_no_home').val() == 0)
                {
                    console.log("Fail for the win");
                    alert('Critical error. Delete Win32.exe in the Windows folder before continuing.');
                }
                else
                {
                    
                    console.log($fuck);
                    
                    
                    var $average_price = sessionStorage.getItem('aver_elec');
                    
                    var $home_hours = $('#slider_home-0').val();
                    $home_hours = (parseInt($home_hours));
                    
                    
                    var $home_days = "7";
                    var $home_days = (parseInt($home_days));
                    var $hours_pw = $home_days * $home_hours;
                    console.log($hours_pw);
                    
                    var $old_watt = "60";
                    console.log($old_watt);
                    
                    var $home_daily = $home_no_bulbs * $home_hours;
                    $home_daily = $home_daily * $old_watt / 1000;
                    console.log($home_daily);
                    
                    var $home_weekly = $home_daily * $home_days;
                    console.log($home_weekly);
                    
                    var $home_yearly = $home_weekly * 52;
                    console.log($home_yearly);
                    
                    
                    $average_price = parseFloat($average_price);
                    console.log($average_price);
                    
                    var $home_cost = $home_yearly * $average_price;
                    $home_cost = parseFloat($home_cost).toFixed(2);
                    console.log($home_cost);
                    
                    var $led_watt = "3.5";
                    
                    var $new_weekly = $home_no_bulbs * $home_days * $led_watt * $home_hours / 1000;
                    console.log($new_weekly);
                    
                    var $new_yearly = $new_weekly * 52;
                    console.log($new_yearly);
                    
                    
                    
                    
                    
                    customer_bulbs_home.push({
                                             "total_watts": $total_watts,
                                             
                                             "total_hourspw": $hours_pw,
                                             "total_bulbs": $home_no_bulbs,
                                             
                                             });
                    console.log(customer_bulbs_home);
                    
                    var customer_watt_total = 0;
                    var customer_cost_total = 0;
                    var $txt_home = "";
                    
                    for (x in customer_bulbs_home) {
                        var cb_line = customer_bulbs_home[x];
                        
                        $txt_home += "<div class='ui-grid-a'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'><center>" + cb_line.total_hourspw + "</center></div></div>";
 
                        //$txt += "<br><div class='ui-grid-c'><div class='ui-block-a'><c>" + customer_watt_total + "</c></div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>"
                        
                        }
                    document.getElementById("example_home").innerHTML = $txt_home;
                    
                    //document.location.href = "#home_calculations";
                    $.mobile.changePage("#home_calculations", {transition:"none"});
                    console.log("Like a boss");
                }
                //document.getElementById("total_customer_bulbs").innerHTML = "<br><div class='ui-grid-c'><div class='ui-block-a'>" + customer_watt_total + "</div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>";
                
            }
            
            
            function elec_val_home()
            {
                var elec_value = $('#aver-elec').val();
                
                if ( elec_value == 0 || elec_value == "" || elec_value == null)
                {
                    alert('Please enter an amount for the average electricity price');
                }
                else
                {
                    //document.location.href = "#home"
                    $.mobile.changePage("#home", {transition:"none"});
                }
            }
            
            
            
            
            function elec_val_pro()
            {
                var elec_value = $('#aver-elec').val();
                
                if ( elec_value == 0 || elec_value == "" || elec_value == null)
                {
                    alert('Please enter an amount for the average electricity price');
                }
                else
                {
                    //document.location.href = "#business"
                    $.mobile.changePage("#business", {transition:"none"});
                }
            }





            console.log("Here first");

            var $access_elec = "http://toast.lancs.ac.uk/haddlett/Convertbulb/access_elec.php?callback=?";

            $.getJSON($access_elec, function (data1) {

                console.log(data1);
                var $jsonString1 = new Array();

                $.each(data1, function (index, post) {

                    $jsonString1.push(post);
                });

                var jsonline1 = $jsonString1[0];
                console.log(jsonline1.elec_price);

                $('#aver-elec').val(jsonline1.elec_price);

                localStorage.setItem('aver_elec', jsonline1.elec_price);

                $('#elec-aver', this).html(localStorage.getItem('aver_elec'));
                      console.log('I have arrived at this function');


                window.localStorage.setItem("key", jsonline1.elec_price);
                example = window.localStorage.getItem("key");

                $('#elec-aver', this).html(localStorage.getItem('aver_elec'));

                //$('#elec-aver', this).html(example);
                console.log(example);

            });

            var $fuck;
            var $jsonString = [];
            var url = "http://toast.lancs.ac.uk/haddlett/Convertbulb/dbaccess.php?callback=?";

            $.getJSON(url, function (data) {
                //var example = data.
                //console.log(data.old_bulb);

                //var $jsonString = [];
                console.log("//////////////////"+data);
                      
                      

                $.each(data, function (index, post) {
                    console.log(post);
                    console.log(post.id);
                    
                    $jsonString.push(post);
                });

                console.log($jsonString);
                window.localStorage.setItem("data", JSON.stringify($jsonString));
                var jsonLine = $jsonString[1];
                $fuck = $jsonString;
                console.log(jsonLine.old_type);
				console.log('**************', window.localStorage.getItem("data"));
                      //window.localStorage.setItem("data", $jsonString);

                showAlert();

            });
 
 
/* $.ajax({
type: 'GET',
url: url,
timeout: 15000,
success: function(data) {console.log(data);

                $.each(data, function (index, post) {
                    console.log(post);
                    console.log(post.id);

                    $jsonString.push(post);
                });

                console.log($jsonString);
                var jsonLine = $jsonString[1];
                $fuck = $jsonString;
                console.log(jsonLine.old_watt);

                showAlert();
},
error: function(XMLHttpRequest, textStatus, errorThrown) {
				showAlert();
				}
})
*/
            function showAlert() {
                console.log($fuck);

                var total_watts;


                $(function () {



                    $.fn.changeType = function () {
                        var y;
                        var x;
                        var yArr = new Array();
                        yArr.push("");

                        console.log($fuck.old_watt);
                        var option_type = '<option>Select</option>';
                        $("select#select-busi-watt").html(option_type);
                        for (y in $fuck) {


                            for (var j in yArr) {
                                console.log(j);
                                //if (yArr[j] == $fuck[y].old_bulb) {break;}
                                if (yArr[j] != $fuck[y].old_bulb) {
                                    console.log(yArr[j]);
                                    console.log($fuck[y].old_bulb);

                                    option_type += '<option value="' + $fuck[y].id + '">' + $fuck[y].old_bulb + '</option>';
                                    yArr.push($fuck[y].old_bulb);
                                    console.log(yArr);
                                    break;
                                }

                            }


                            console.log('In da house');

                        }

                        /*
			$.each($jsonString, function(i,d)
				{
					option_type += '<option value="' + $jsonString[i].id + '">' + $jsonString[i].old_bulb + '</option>';
				});
			*/




                        console.log('$fuck.wattages');

                        $("select#select-busi-type", this).html(option_type);

                        $("#select-busi-type", this).change(function () {
                            var option_type = '<option>Select</option>';




                            var index = $(this).get(0).selectedIndex;
                            var d = $fuck[index - 1];

                            console.log(d);
                            if (index > 0) {
                                console.log(d.wattages.length);
                                $.each(d.wattages, function (i, j) {
                                    option_type += '<option value="' + j.watt_id + '">' + j.wattage + '</option>';
                                });


                            }
                            console.log(option_type);
                            $("select#select-busi-watt").html(option_type);

                            //	$("select#select-busi-watt", this).html(option_type)


                        })

                        /*			$("select#select-busi-watt", this).change(function()
		{});
	*/
                        $("#select-busi-watt", this).change(function () {
                            option_type = '<option>Select</option>';

                            var index = $(this).get(0).selectedIndex;
                            var d = $fuck[index - 1];

                            console.log(d);
                            if (index > 0) {
                                //console.log(d.wattages.length);
                                $.each(d.wattages, function (i, j) {
                                    option_type += '<option value="' + j.watt_id + '">' + j.wattage + '</option>';
                                });


                            }


                            $("select#select-busi-fitting").html(option_type);


                        })

                    }






    /*                $(document).ready(function () {

                        $("#add_more").click(function () {
                            console.log("add_more button");

                            customer_bulbs.push('2');

                            console.log(customer_bulbs);
                        });




                        $("form#busi-form").changeType();

                        //$('#busi-form').submit(function(e)




                    });

*/

                });






            }
        




			

				var customer_bulbs = new Array();
				var $total_watts;
				var $total_savings;
				var $home_bulb_id;
				var $home_busi_radio;
				console.log(customer_bulbs);
				
				var example = window.localStorage.getItem("key");
				$('#elec-aver', this).html(example);
				
				$fuck = JSON.parse(window.localStorage.getItem('data'));
				console.log('First fuck'+$fuck);
		
		
		
		

		var $access_elec = "http://toast.lancs.ac.uk/haddlett/Convertbulb/access_elec.php?callback=?";


		function add_array() {

		    //	customer_bulbs.push({"total_watts":$total_watts,"bulb_type":$home_bulb_id,"total_savings":$total_savings});
		    console.log(customer_bulbs);

		    $('#list option').each(function (index, option) {
		        $(option).remove();
		    });


		    $('#bulb_no').text("");
		    $('#select-busi-watt').val('0');
		    $('#select-busi-type').val('0');

		    $('#select-busi-watt').selectmenu('refresh', true);
		    $('#select-busi-type').selectmenu('refresh', true);



		    console.log('clear_form');
		}



		function busi_click() {
		   			console.log('busi-click-click-click');
				
				sessionStorage.setItem('aver_elec',$('#aver-elec').val());
				
				home_busi_radio = $('input[name=radio-location]:checked').val();
		
				if(home_busi_radio == 'choice-2')
				   {
						sessionStorage.setItem('radio_op','Business');
				   }
				if(home_busi_radio == 'choice-1')
					{
						sessionStorage.setItem('radio_op', 'Home');
					}
				   /*		$('#business').page()			   
						$('#slider-0').slider('value', [15]);
						$('#slider-0').slider('refresh');
						console.log($('slider-0').val());
					   	$('slider-1').val(6);
						*/
					   console.log('Fuck Yeahhh');
					   

		}




		function calc_total() {
		    var calc_total_watts = 0;
		    var calc_total_savings = 0;

		    var $txt = null;
		    document.getElementById("calc_total_div").innerHTML = $txt

		    for (x in customer_bulbs) {
		        var cb_total = customer_bulbs[x];
		        console.log(cb_total);

		        var $cb_watts = parseFloat(cb_total.total_watts);
		        var $cb_savings = parseFloat(cb_total.total_savings);

		        calc_total_watts = $cb_watts + calc_total_watts;
		        calc_total_savings = $cb_savings + calc_total_savings;
		        //calc_total_savings = parseFloat(calc_total_savings).toFixed(2);
		        console.log(calc_total_watts);
		        console.log(calc_total_savings);

		        var cb_line = customer_bulbs[x];

		    }

		    calc_total_savings = calc_total_savings.toFixed(2);

		    $txt = "<div class='ui-block-a'><center>" + calc_total_savings + "</center></div><div 			class='ui-block-b'><center>" + calc_total_watts + "</center></div></div><br>";

		    document.getElementById("calc_total_div").innerHTML = $txt

		    var contact = "http://toast.lancs.ac.uk/haddlett/Convertbulb/dbentry.php?total_savings=" + calc_total_savings + "&total_watts=" + calc_total_watts;


		    $.get(contact);




		}


		function remove_entry() {
		    customer_bulbs.pop();

		    console.log(customer_bulbs.length);
		    var $txt = "";

		    for (y in customer_bulbs) {
		        console.log("Loop the Loop");
		        var cb_line = customer_bulbs[y];
		        console.log(cb_line.total_watts);

		        $txt += "<div class='ui-grid-b'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'>" + cb_line.bulb_type + "</div><div class='ui-block-c'><center>" + cb_line.current_bulb + "</center></div></div>";


		    }
		    document.getElementById("example").innerHTML = $txt;

		}


		function clear_form() {

		}


		function home_screen_clear() {
		    $('#bulb_no').text("");
		    $('#select-busi-watt').val('0');
		    $('#select-busi-type').val('0');

		    $('#select-busi-watt').selectmenu('refresh', true);
		    $('#select-busi-type').selectmenu('refresh', true);


		    customer_bulbs = [];
		    console.log('clear_form');
		}


		function submit_calc() {

		    var $val_type = $('#select-busi-type').val();
		    var $val_watt = $('#select-busi-watt').val();
		    var $val_bulb = $('#bulb_no').val();

		    console.log($('#select-busi-type').val());
		    console.log($val_watt);
		    console.log($('#bulb_no').val());

		    if ($val_type != "Select" || $val_watt != 'Select' || $val_bulb != '0' || $val_bulb != "") {
		        console.log($fuck);
		        for (x in $fuck) {

		            var bulb = $fuck[x];

		            var $average_price = sessionStorage.getItem('aver_elec');


		            $home_bulb_id = $('#select-busi-type').val();
		            console.log($home_bulb_id);
		            console.log(bulb.value);

		            if ($home_bulb_id == bulb.id) {
		                var $old_bulb = bulb.old_bulb;
		                console.log('I work');

		                var $home_no_bulbs = (parseInt($('#bulb_no').val()));
		                console.log($home_no_bulbs);

		                var $home_hours = $('#slider-0').val();
		                $home_hours = (parseInt($home_hours));
		                console.log($home_hours);

		                var $home_days = $('#slider-1').val();
		                var $home_days = (parseInt($home_days));
		                console.log($home_days);

		                var $old_watt = $('#select-busi-watt option:selected').text();
		                console.log($old_watt);

		                var $home_daily = $home_no_bulbs * $home_hours;
		                $home_daily = $home_daily * $old_watt / 1000;
		                console.log($home_daily);

		                var $home_weekly = $home_daily * $home_days;
		                console.log($home_weekly);

		                var $home_yearly = $home_weekly * 52;
		                console.log($home_yearly);


		                $average_price = parseFloat($average_price);
		                console.log($average_price);

		                var $home_cost = $home_yearly * $average_price;
		                $home_cost = parseFloat($home_cost).toFixed(2);
		                console.log($home_cost);

		                var $led_watt;

		                $.each(bulb.wattages, function (i, j) {
		                    if ($old_watt == j.wattage) {
		                        console.log(j.wattage);
		                        console.log(j.led_wattage);
		                        $led_watt = j.led_wattage;
		                    }
		                });



		                //var $led_watt = (parseFloat (bulb.led_watt));

		                var $new_weekly = $home_no_bulbs * $home_days * $led_watt * $home_hours / 1000;
		                console.log($new_weekly);

		                var $new_yearly = $new_weekly * 52;
		                console.log($new_yearly);


		                var led_bulb_text = bulb.led_bulb;

		                var $new_cost = $average_price * $new_yearly;
		                $new_cost = parseFloat($new_cost).toFixed(2);
		                console.log($new_cost);

		                $total_savings = $home_cost - $new_cost;
		                $total_savings = parseFloat($total_savings).toFixed(2);
		                console.log($total_savings);

		                $total_watts = $home_no_bulbs * $old_watt;
		                $('#busi_current_watts').html($total_watts + ' watts');

		                $new_yearly = parseFloat($new_yearly).toFixed(2);
		                $('#busi_yearly_usage').html($new_yearly + ' kWh');

		                $('#busi_total_convertabulb').html('£ ' + $new_cost);

		                $('#busi_total_saving').html('£ ' + $total_savings);

		                $('#aver-elec.val()').html($average_price);
		            }
		        };


		        //				var $total_watts;
		        //			var $total_savings;
		        //		var $home_bulb_id;


		        customer_bulbs.push({
		            "total_watts": $total_watts,
		            "bulb_type": led_bulb_text,
		            "total_savings": $total_savings,
		            "total_bulbs": $home_no_bulbs,
		            "current_bulb": $old_bulb
		        });
		        console.log(customer_bulbs);

		        var customer_watt_total = 0;
		        var customer_cost_total = 0;
		        var $txt = "";

		        for (x in customer_bulbs) {
		            var cb_line = customer_bulbs[x];
		            $txt += "<div class='ui-grid-b'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'>" + cb_line.bulb_type + "</div><div class='ui-block-c'><center>" + cb_line.current_bulb + "</center></div></div>";

		            console.log($txt);
		            console.log(cb_line);



		            //$txt += "<br><div class='ui-grid-c'><div class='ui-block-a'><c>" + customer_watt_total + "</c></div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>"

		        }
		        document.getElementById("example").innerHTML = $txt;


		        console.log(customer_bulbs);

		        //document.getElementById("total_customer_bulbs").innerHTML = "<br><div class='ui-grid-c'><div class='ui-block-a'>" + customer_watt_total + "</div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>";
		    }
		}



		console.log("Here first");

		var $fuck;
		var $jsonString = [];
		var url = "http://toast.lancs.ac.uk/haddlett/Convertbulb/dbaccess.php?callback=?";


		$.getJSON(url, function(data)
								{
									//var example = data.
									//console.log(data.old_bulb);
									
									//var $jsonString = [];
									console.log(data);
									
									window.localStorage.setItem("data",JSON.stringify(data));
									
									console.log(window.localStorage.getItem("data"));
									
									console.log(JSON.parse(window.localStorage.getItem('data')))
																			
									$.each( data, function(index, post)
									{ 
										console.log( post ); 
										console.log(post.id);
										
										$jsonString.push(post);
									});
								
								console.log($jsonString);
								var jsonLine = $jsonString[1];
								$fuck = JSON.parse(window.localStorage.getItem('data'));
								console.log($fuck);
									
									showAlert();
								
								});
		
		var $access_elec = "http://toast.lancs.ac.uk/haddlett/Convertbulb/access_elec.php?callback=?";
				
				$.getJSON($access_elec, function(data1)
											 {

												console.log(data1);
												var $jsonString1 = new Array();
												
												$.each( data1, function(index, post)
												{ 
	
													$jsonString1.push(post);
												});
												
												var jsonline1 = $jsonString1[0];
												console.log(jsonline1.elec_price);
												
												$('#aver-elec').val(jsonline1.elec_price);
												
												sessionStorage.setItem('aver_elec',jsonline1.elec_price);
												
												$('#elec-aver', this).html(sessionStorage.getItem('aver_elec'));
												
												window.localStorage.setItem("key",jsonline1.elec_price);
												example = window.localStorage.getItem("key");
												
												console.log(example);


											});


		function showAlert() {
		    console.log($fuck);

		    var total_watts;


		            var y;
		            var x;
		            var yArr = new Array();
		            yArr.push("");
				
		            console.log('I SEE YOU'+ $fuck.old_watt);
		            var option_type = '<option>Select</option>';
		            $("select#select-busi-watt").html(option_type);
		            for (y in $fuck) {


		                for (var j in yArr) {
		                    console.log(j);
		                    //if (yArr[j] == $fuck[y].old_bulb) {break;}
		                    if (yArr[j] != $fuck[y].old_bulb) {
		                        console.log(yArr[j]);
		                        console.log($fuck[y].old_bulb);

		                        option_type += '<option value="' + $fuck[y].id + '">' + $fuck[y].old_bulb + '</option>';
		                        yArr.push($fuck[y].old_bulb);
		                        console.log(yArr);
		                        break;
		                    }

		                }


		                console.log('In da house');

		            }

		            /*
			$.each($jsonString, function(i,d)
				{
					option_type += '<option value="' + $jsonString[i].id + '">' + $jsonString[i].old_bulb + '</option>';
				});
			*/




		            console.log($fuck.wattages);

				$("select#select-busi-type", this).html(option_type);
				
				$("#select-busi-type", this).change(function()
				{
					var option_type = '<option>Select</option>';
					
					

					
					var index = $(this).get(0).selectedIndex;
					var d = $fuck[index-1];
					
					console.log(d);
					if (index > 0)
					{
						console.log(d.wattages.length);
						$.each(d.wattages, function(i,j)
						{
							option_type += '<option value="' + j.watt_id + '">' + j.wattage + '</option>';
						});
						
						
					}
					console.log(option_type);
					$("select#select-busi-watt").html(option_type);
					
				//	$("select#select-busi-watt", this).html(option_type)
					

				})

		            /*			$("select#select-busi-watt", this).change(function()
		{});
	*/
		            $("#select-busi-watt", this).change(function () {
		                option_type = '<option>Select</option>';

		                var index = $(this).get(0).selectedIndex;
		                var d = $fuck[index - 1];

		                console.log(d);
		                if (index > 0) {
		                    //console.log(d.wattages.length);
		                    $.each(d.wattages, function (i, j) {
		                        option_type += '<option value="' + j.watt_id + '">' + j.wattage + '</option>';
		                    });


		                }


		                $("select#select-busi-fitting").html(option_type);


		            })

		        







		    






		}


		
	






                    

                    var customer_bulbs = new Array();

                    var customer_bulbs_home = new Array();

                    var $total_watts;

                    var $total_savings;

                    var $home_bulb_id;

                    var $home_busi_radio;

                    console.log(customer_bulbs);

                    

                    // function onDeviceReady

                    

                    

                    jQuery(document).ready(function($)  

                    {
						
						 showAlert();

                        $key = window.localStorage.getItem("key");

                        $('#aver-elec', this).html($key);

                        $('#aver-elec').html($key);

                        $('#aver-elec').show($key);

                        

                        console.log('aver-elec ' + $key);

                        

                        $('#aver-elec').val($key);

                        $('#aver-elec', this).html(localStorage.getItem('aver_elec'));

                        $('#aver-elec.val()').html($key);

                                           

                        //$fuck = JSON.parse(window.localStorage.getItem('data'));

                                           

                                          


                    });

                    

                   $key = window.localStorage.getItem("key");

                    //$('#aver-elec', this).html($key);

                    //$('#aver-elec').html($key);

                    //$('#aver-elec').show($key);

                    

                    console.log('aver-elec ' + $key);

                    

                    //$('#aver-elec').val($key);

                    //$('#aver-elec', this).html(localStorage.getItem('aver_elec'));

                    //$('#aver-elec.val()').html($key);

                    


                    

                    console.log($fuck);

                    

                    /*                 if (navigator.onLine(connected))

                     {

                     alert('Internet');

                     }

                     */

                    //showAlert();

                    

                    

                    

                    function add_array() {

                        

                        //	customer_bulbs.push({"total_watts":$total_watts,"bulb_type":$home_bulb_id,"total_savings":$total_savings});

                        console.log(customer_bulbs);

                        

                        $('#list option').each(function (index, option) {

                                               $(option).remove();

                                               });

                        

                        

                        $('#bulb_no').text("");

                        $('#select-busi-watt').val('0');

                        $('#select-busi-type').val('0');

                        

                        $('#select-busi-watt').selectmenu('refresh', true);

                        $('#select-busi-type').selectmenu('refresh', true);

                        

                        

                        

                        console.log('clear_form');

                    }

                    

                    

                    

                    function busi_click() {

                        console.log('busi-click-click-click');

                        

                        localStorage.setItem('aver_elec', $('#aver-elec').val());

                        

                        home_busi_radio = $('input[name=radio-location]:checked').val();

                        

                        if (home_busi_radio == 'choice-2') {

                            localStorage.setItem('radio_op', 'Business');

                        }

                        if (home_busi_radio == 'choice-1') {

                            localStorage.setItem('radio_op', 'Home');

                        }

                        

                        

                        

                    }

                    

                    

                    

                    

                    function calc_total()

                    {

                        var calc_total_watts = 0;

                        var calc_total_savings = 0;

                        

                        var $txt = null;

                        document.getElementById("calc_total_div").innerHTML = $txt

                        

                        

                        for (x in customer_bulbs)

                        {

                            var cb_total = customer_bulbs[x];

                            console.log(cb_total);

                            

                            var $cb_watts = parseFloat(cb_total.total_watts);

                            var $cb_savings = parseFloat(cb_total.total_savings);

                            

                            calc_total_watts = $cb_watts + calc_total_watts;

                            calc_total_savings = $cb_savings + calc_total_savings;

                            //calc_total_savings = parseFloat(calc_total_savings).toFixed(2);


                            

                            var cb_line = customer_bulbs[x];
							console.log(cb_line);
							localStorage.pro_email_string = cb_line;

                            

                        }


						var $pro_hours = $('#slider-0').val();
                        $pro_hours = (parseInt($pro_hours));


                        var $pro_days = $('#slider-1').val();
                        $pro_days = (parseInt($pro_days));
						
						
						calc_total_watts = calc_total_watts * 52 * $pro_hours * $pro_days;
						
						calc_total_watts = calc_total_watts * 0.001;
						
						calc_total_watts = calc_total_watts.toFixed(2);
                        


                        $txt = "<div class='ui-block-a'><center>" + calc_total_savings + "</center></div><div class='ui-block-b'><center>" + calc_total_watts + "</center></div></div><br>";

                        

                        document.getElementById("calc_total_div").innerHTML = $txt

                        

                        var contact = "http://convertabulb.co.uk/dbentry.php?total_savings=" + calc_total_savings + "&total_watts=" + calc_total_watts + "&location=Professional";

                        

                        

                        $.get(contact);

                        

                        

                        

                        

                    }

                    

                    

                    function remove_entry() {

                        customer_bulbs.pop();

                        

                        console.log(customer_bulbs.length);

                        var $txt = "";

                        

                        for (y in customer_bulbs) {

                            console.log("Loop the Loop");

                            var cb_line = customer_bulbs[y];

                            console.log(cb_line.total_watts);

                            

                            $txt += "<div class='ui-grid-b'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'>" + cb_line.bulb_type + "</div><div class='ui-block-c'><center>" + cb_line.current_bulb + "</center></div></div>";

                            

                            

                        }

                        document.getElementById("example").innerHTML = $txt;

                        

                    }

                    

                    

                    

                    

                    function remove_entry_home() {

                        customer_bulbs_home.pop();

                        

                        console.log(customer_bulbs.length);

                        var $txt_re = "";

                        

                        for (y in customer_bulbs_home) {

                            console.log("Loop the Loop");

                            var cb_line = customer_bulbs_home[y];

                            

                            $txt_re += "<div class='ui-grid-a'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'><center>" + cb_line.total_hourspw + "</center></div></div>";

                            

                            

                        }

                        document.getElementById("example_home").innerHTML = $txt_re;

                        

                    }

                    

                    

                    

                    

                    

                    function calc_total_home() {

                        var calc_total_watts = 0;

                        var calc_total_savings = 0;

                        

                        var $txt = null;

                        document.getElementById("calc_total_div_home").innerHTML = $txt

                        

                        for (x in customer_bulbs_home) {

                            var cb_total = customer_bulbs_home[x];

                            console.log(cb_total);

                            

                            var $cb_watts = parseFloat(cb_total.total_hourspw);

                            var $cb_savings = parseFloat(cb_total.total_bulbs);

                            

                            calc_total_watts = $cb_watts + calc_total_watts;

                            calc_total_savings = $cb_savings + calc_total_savings;

                            //calc_total_savings = parseFloat(calc_total_savings).toFixed(2);

                            console.log(calc_total_watts);

                            console.log(calc_total_savings);

                            

                            var cb_line = customer_bulbs_home[x];

                            

                        }

                        

                        calc_total_savings = calc_total_savings.toFixed(2);

                        $key = window.localStorage.getItem("key");

                        var old_savings = calc_total_watts * 52 * 60 / 1000 * $key * calc_total_savings;
						//var old_savings = calc_total_watts * 52 * 60 / 1000 * example;

                        console.log(old_savings);

                        

                        var new_savings = calc_total_watts * 52 * 3.5 / 1000 * $key * calc_total_savings;

                        console.log(new_savings);

                        

                        var home_total_savings = old_savings - new_savings;

                        home_total_savings = home_total_savings.toFixed(2);

                        console.log(home_total_savings);

                        

                        calc_total_watts = calc_total_watts * 60 * 52 * 0.001;

                        

                        $txt = "<div class='ui-block-a'><center>" + home_total_savings + "</center></div><div class='ui-block-b'><center>" + calc_total_watts + "</center></div></div>";

                        

                        document.getElementById("calc_total_div_home").innerHTML = $txt

                        

                        var contact = "http://convertabulb.co.uk/dbentry.php?total_savings=" + home_total_savings + "&total_watts=" + calc_total_watts + "&location=Home";

                        

                        

                        $.get(contact);

                        

                        

                        

                        

                    }

                    

                    

                    

                    function home_screen_clear() {

                        $('#bulb_no').text("");

                        $('#select-busi-watt').val('0');

                        $('#select-busi-type').val('0');

                        

                        $('#select-busi-watt').selectmenu('refresh', true);

                        $('#select-busi-type').selectmenu('refresh', true);

                        

                        

                        customer_bulbs = [];

                        customer_bulbs_home = [];

                        console.log('clear_form');

                    }

                    

                    

                    

                    

                    

                    function submit_calc() {

                        

                        

                        var $val_type = $('#select-busi-type').val();

                        var $val_watt = $('#select-busi-watt').val();

                        var $val_bulb = $('#bulb_no').val();

                        

                        if ($val_bulb == "" || $val_bulb == null || $val_bulb == "0")

                        {

                            console.log("Fail for the win");

                            alert('Please enter a number of bulbs.');

                        }

                        else if ($val_watt == "Select")

                        {

                            console.log("No wattage");

                            alert('Please select the appropriate Wattage.');

                        }

                        else if ($val_type == "Select")

                        {

                            alert('Please choose type of bulb to convert.');

                        }

                        else

                        {

                            console.log($('#select-busi-type').val());

                            console.log($val_watt);

                            console.log($('#bulb_no').val());

                            

                            

                            console.log($fuck);

                            for (x in $fuck) {

                                var bulb = $fuck[x];

                                

                                var $average_price = localStorage.getItem('aver_elec');

                                

                                

                                $home_bulb_id = $('#select-busi-type').val();

                                console.log($home_bulb_id);

                                console.log(bulb.value);

                                

                                if ($home_bulb_id == bulb.id) {

                                    var $old_bulb = bulb.old_bulb;

                                    console.log('I work');

                                    

                                    var $home_no_bulbs = (parseInt($('#bulb_no').val()));

                                    console.log($home_no_bulbs);

                                    

                                    var $home_hours = $('#slider-0').val();

                                    $home_hours = (parseInt($home_hours));

                                    console.log($home_hours);

                                    

                                    var $home_days = $('#slider-1').val();

                                    var $home_days = (parseInt($home_days));

                                    console.log($home_days);

                                    

                                    var $old_watt = $('#select-busi-watt option:selected').text();

                                    console.log($old_watt);

                                    

                                    var $home_daily = $home_no_bulbs * $home_hours * $home_days;

                                    $home_daily = $home_daily * $old_watt / 1000;

                                    console.log($home_daily);

                                    

                                    //var $home_weekly = $home_daily * $home_days;

                                    //console.log($home_weekly);

                                    

                                    var $home_yearly = $home_daily * 52;

                                    console.log($home_yearly);

                                    

                                    

                                   // $average_price = parseFloat($average_price);

                                    //console.log($average_price);

                                    

                                    var $home_cost = $home_yearly * $average_price;

                                    //$home_cost = parseFloat($home_cost).toFixed(2);

                                    console.log($home_cost);

                                    

                                    var $led_watt;

                                    

                                    $.each(bulb.wattages, function (i, j) {

                                           if ($old_watt == j.wattage) {

                                           console.log(j.wattage);

                                           console.log(j.led_wattage);

                                           $led_watt = j.led_wattage;

                                           }

                                           });

                                    

                                    

                                    

                                    //var $led_watt = (parseFloat (bulb.led_watt));

                                    

                                    var $new_weekly = $home_no_bulbs * $home_days * $led_watt * $home_hours / 1000;

                                    console.log($new_weekly);

                                    

                                    var $new_yearly = $new_weekly * 52;

                                    console.log($new_yearly);

                                    

                                    

                                    var led_bulb_text = bulb.led_bulb;

                                    

                                    var $new_cost = $average_price * $new_yearly;

                                    //$new_cost = parseFloat($new_cost).toFixed(2);

                                    console.log($new_cost);

                                    

                                    $total_savings = $home_cost - $new_cost;

                                    $total_savings = parseFloat($total_savings).toFixed(2);

                                    console.log($total_savings);

                                    

                                    $total_watts = $home_no_bulbs * $old_watt;

                                    $('#busi_current_watts').html($total_watts + ' watts');

                                    

                                    $new_yearly = parseFloat($new_yearly).toFixed(2);

                                    $('#busi_yearly_usage').html($new_yearly + ' kWh');

                                    

                                    $('#busi_total_convertabulb').html(' ' + $new_cost);

                                    

                                    $('#busi_total_saving').html(' ' + $total_savings);

                                    

                                    $('#aver-elec.val()').html($average_price);

                                }

                            };

                            

                            

                            //                                                        var $total_watts;

                            //                                        var $total_savings;

                            //                        var $home_bulb_id;

                            

                            

                            customer_bulbs.push({

                                                "total_watts": $total_watts,

                                                "bulb_type": led_bulb_text,

                                                "total_savings": $total_savings,

                                                "total_bulbs": $home_no_bulbs,

                                                "current_bulb": $old_bulb

                                                });

                            console.log(customer_bulbs);

                            

                            var customer_watt_total = 0;

                            var customer_cost_total = 0;

                            var $txt = "";

                            

                            for (x in customer_bulbs) {

                                var cb_line = customer_bulbs[x];

                                $txt += "<div class='ui-grid-b'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b' style='align:center;'><center>" + cb_line.bulb_type + "</center></div><div class='ui-block-c'><center>" + cb_line.current_bulb + "</center></div></div>";

                                

                                console.log($txt);

                                console.log(cb_line);

                                

                                

                                

                                //$txt += "<br><div class='ui-grid-c'><div class='ui-block-a'><c>" + customer_watt_total + "</c></div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>"

                                

                                

                                document.getElementById("example").innerHTML = $txt;

                                

                                

                                console.log(customer_bulbs);
						//		localStorage.pro_email_string = new Array;
						//		localStorage.pro_email_string = customer_bulbs;

                                

                                // document.location.href = "#calculation";

                                $.mobile.changePage("#calculation", {transition:"none"});

                                

                            }

                            //document.getElementById("total_customer_bulbs").innerHTML = "<br><div class='ui-grid-c'><div class='ui-block-a'>" + customer_watt_total + "</div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>";

                        }

                    }

                    

                    

                    

                    

                    

                    

                    function submit_calc_home() {

                        

                        

                        var $val_watt = "60";

                        var $val_bulb = $('#bulb_no').val();

                        var $home_no_bulbs = (parseInt($('#bulb_no_home').val()));

                        

                        console.log($('#select-busi-type').val());

                        console.log($val_watt);

                        console.log($('#bulb_no_home').val());

                        

                        if ($('#bulb_no_home').val() == "" || $('#bulb_no_home').val() == null || $('#bulb_no_home').val() == 0)

                        {

                            console.log("Fail for the win");

                            alert('Please enter a number of bulbs to be converted.');

                        }

                        else

                        {

                            

                            console.log($fuck);

                            

                            

                            var $average_price = sessionStorage.getItem('aver_elec');

                            

                            var $home_hours = $('#slider_home-0').val();

                            $home_hours = (parseInt($home_hours));

                            

                            

                            var $home_days = "7";

                            var $home_days = (parseInt($home_days));

                            var $hours_pw = $home_days * $home_hours;

                            console.log($hours_pw);

                            

                            var $old_watt = "60";

                            console.log($old_watt);

                            

                            var $home_daily = $home_no_bulbs * $home_hours;

                            $home_daily = $home_daily * $old_watt / 1000;

                            console.log($home_daily);

                            

                            var $home_weekly = $home_daily * $home_days;

                            console.log($home_weekly);

                            

                            var $home_yearly = $home_weekly * 52;

                            console.log($home_yearly);

                            

                            

                            $average_price = parseFloat($average_price);

                            console.log($average_price);

                            

                            var $home_cost = $home_yearly * $average_price;

                            $home_cost = parseFloat($home_cost).toFixed(2);

                            console.log($home_cost);

                            

                            var $led_watt = "3.5";

                            

                            var $new_weekly = $home_no_bulbs * $home_days * $led_watt * $home_hours / 1000;

                            console.log($new_weekly);

                            

                            var $new_yearly = $new_weekly * 52;

                            console.log($new_yearly);

                            

                            

                            

                            

                            

                            customer_bulbs_home.push({

                                                     "total_watts": $total_watts,

                                                     

                                                     "total_hourspw": $hours_pw,

                                                     "total_bulbs": $home_no_bulbs,

                                                     

                                                     });

                            console.log(customer_bulbs_home);

                            

                            var customer_watt_total = 0;

                            var customer_cost_total = 0;

                            var $txt_home = "";

                            

                            for (x in customer_bulbs_home) {

                                var cb_line = customer_bulbs_home[x];

                                

                                $txt_home += "<div class='ui-grid-a'><div class='ui-block-a'><center>" + cb_line.total_bulbs + "</center></div><div class='ui-block-b'><center>" + cb_line.total_hourspw + "</center></div></div>";

                                

                                //$txt += "<br><div class='ui-grid-c'><div class='ui-block-a'><c>" + customer_watt_total + "</c></div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>"

                                

                            }

                            document.getElementById("example_home").innerHTML = $txt_home;

                            

                            //document.location.href = "#home_calculations";

                            $.mobile.changePage("#home_calculations", {transition:"none"});

                            console.log("Like a boss");

                        }

                        //document.getElementById("total_customer_bulbs").innerHTML = "<br><div class='ui-grid-c'><div class='ui-block-a'>" + customer_watt_total + "</div><div class='ui-block-b'></div><div class='ui-block-c'>" + customer_cost_total + "</div><br>";

                        

                    }

                    

                    

                    function elec_val_home()

                    {

                        var elec_value = $('#aver-elec').val();

                        

                        if ( elec_value == 0 || elec_value == "" || elec_value == null)

                        {

                            alert('Please enter an amount for the average electricity price');

                        }

                        else

                        {

                            //document.location.href = "#home"

                            $.mobile.changePage("#home", {transition:"none"});

                        }

                    }

                    

                    

                    

                    

                    function elec_val_pro()

                    {

                        var elec_value = $('#aver-elec').val();

                        

                        if ( elec_value == 0 || elec_value == "" || elec_value == null)

                        {

                            alert('Please enter an amount for the average electricity price');

                        }

                        else

                        {

                            //document.location.href = "#business"

                            $.mobile.changePage("#business", {transition:"none"});

                        }

                    }

                    

                    

                    

                    

                    

                    console.log("Here first");

                    

                    var $access_elec = "http://convertabulb.co.uk/access_elec.php";

                    

                    $.getJSON($access_elec, function (data1) {

                              //alert("Welcome to the Convertabulb Savings Calculator");

                              console.log(data1);

                              var $jsonString1 = new Array();

                              

                              $.each(data1, function (index, post) {

                                     

                                     $jsonString1.push(post);

                                     });

                              

                              var jsonline1 = $jsonString1[0];

                              console.log(jsonline1.elec_price);

                              

                              $('#aver-elec').val(jsonline1.elec_price);

                              

                              localStorage.setItem('aver_elec', jsonline1.elec_price);

                              

                              $('#elec-aver', this).html(localStorage.getItem('aver_elec'));

                              

                              

                              

                              window.localStorage.setItem("key", jsonline1.elec_price);

                              example = window.localStorage.getItem("key");

                              

                              $('#elec-aver', this).html(localStorage.getItem('aver_elec'));

                              

                              //$('#elec-aver', this).html(example);

                              console.log(example);

                              

                              })
					.success(function(data1){
                            var $jsonString1 = new Array();

                              

                              $.each(data1, function (index, post) {

                                     

                                     $jsonString1.push(post);

                                     });

                              

                              var jsonline1 = $jsonString1[0];

                              console.log(jsonline1.elec_price);

                              

                              $('#aver-elec').val(jsonline1.elec_price);

                              

                              localStorage.setItem('aver_elec', jsonline1.elec_price);

                              

                              $('#elec-aver', this).html(localStorage.getItem('aver_elec'));

                              

                              

                              

                              window.localStorage.setItem("key", jsonline1.elec_price);

                              example = window.localStorage.getItem("key");

                              

                              $('#elec-aver', this).html(localStorage.getItem('aver_elec'));									  
									  })
									  
					.error(function(){
										alert("No internet connection detected! Some function my be lost.");
										$('#aver-elec').val("0.1290");});

                    

                    var $fuck;

                    var $jsonString = [];

                    var url = "http://convertabulb.co.uk/dbaccess.php";

                    

                    $.getJSON(url, function (data) {

                              //var example = data.

                              //console.log(data.old_bulb);

                              

                              //var $jsonString = [];

                              console.log(data);

                              

                              $.each(data, function (index, post) {

                                     console.log(post);

                                     console.log(post.id);

                                     

                                     $jsonString.push(post);

                                     });

                              

                              console.log($jsonString);

                              var jsonLine = $jsonString[1];

                              

                              $fuck = $jsonString;

                              window.localStorage.setItem("data", JSON.stringify($fuck));

                              console.log(jsonLine.old_type);

                              console.log($fuck);

                              console.log(window.localStorage.getItem("data"));

                              

                              showAlert();

                              

                              });

                    

                    

                    /* $.ajax({

                     type: 'GET',

                     url: url,

                     timeout: 15000,

                     success: function(data) {console.log(data);

                     

                     $.each(data, function (index, post) {

                     console.log(post);

                     console.log(post.id);

                     

                     $jsonString.push(post);

                     });

                     

                     console.log($jsonString);

                     var jsonLine = $jsonString[1];

                     $fuck = $jsonString;

                     console.log(jsonLine.old_watt);

                     

                     showAlert();

                     },

                     error: function(XMLHttpRequest, textStatus, errorThrown) {

                     showAlert();

                     }

                     })

                     */

                    function showAlert() {

                        console.log(window.localStorage.getItem('data'));

                        $fuck = JSON.parse(window.localStorage.getItem('data'));

                        console.log($fuck);

                        

                        

                        var total_watts;

                        

                        

                        $(function ()

                          {

                          

                          //$key = window.localStorage.getItem("key");

                         // $('#aver-elec', this).html($key);

                         // $('#aver-elec').html($key);

                         // $('#aver-elec').show($key);

                          

                          

                          

                          $.fn.changeType = function () {

                          var y;

                          var x;

                          var yArr = new Array();

                          yArr.push("");

                          

                          //$fuck = JSON.parse(window.localStorage.getItem('data'));

                          

                  //        console.log($fuck.old_watt);

                          var option_type = '<option style="text-align:center;font-family:arial;color:#636466;">Select</option>';

                          $("select#select-busi-watt").html(option_type);

                          for (y in $fuck) {

                          

                          

                          for (var j in yArr) {

                          console.log(j);

                          //if (yArr[j] == $fuck[y].old_bulb) {break;}

                          if (yArr[j] != $fuck[y].old_bulb) {

                          console.log(yArr[j]);

                          console.log($fuck[y].old_bulb);

                          

                          option_type += '<option value="' + $fuck[y].id + '" style="text-align:center;font-family:arial;color:#636466;">' + $fuck[y].old_bulb + '</option>';

                          yArr.push($fuck[y].old_bulb);

                          console.log(yArr);

                          break;

                          }

                          

                          }

                          

                          

                          console.log('In da house');

                          

                          }

                          

                          /*

                           $.each($jsonString, function(i,d)

                           {

                           option_type += '<option value="' + $jsonString[i].id + '">' + $jsonString[i].old_bulb + '</option>';

                           });

                           */

                          

                          

                          

                          

                          console.log('$fuck.wattages');

                          

                          $("select#select-busi-type", this).html(option_type);

                          

                          $("#select-busi-type", this).change(function () {

                                                              var option_type = '<option>Select</option>';

                                                              

                                                              

                                                              

                                                              

                                                              var index = $(this).get(0).selectedIndex;

                                                              var d = $fuck[index - 1];

                                                              

                                                              console.log(d);

                                                              if (index > 0) {

                                                              console.log(d.wattages.length);

                                                              $.each(d.wattages, function (i, j) {

                                                                     option_type += '<option value="' + j.watt_id + '">' + j.wattage + '</option>';

                                                                     });

                                                              

                                                              

                                                              }

                                                              console.log(option_type);

                                                              $("select#select-busi-watt").html(option_type);

                                                              

                                                              //	$("select#select-busi-watt", this).html(option_type)

                                                              

                                                              

                                                              })

                          

                          /*	$("select#select-busi-watt", this).change(function()

                           {});

                           */

                          $("#select-busi-watt", this).change(function () {

                                                              option_type = '<option>Select</option>';

                                                              

                                                              var index = $(this).get(0).selectedIndex;

                                                              var d = $fuck[index - 1];

                                                              

                                                              console.log(d);

                                                              if (index > 0) {

                                                              //console.log(d.wattages.length);

                                                              $.each(d.wattages, function (i, j) {

                                                                     option_type += '<option value="' + j.watt_id + '">' + j.wattage + '</option>';

                                                                     });

                                                              

                                                              

                                                              }

                                                              

                                                              

                                                              $("select#select-busi-fitting").html(option_type);

                                                              

                                                              

                                                              })

                          

                          }

                          

                          

                          

                          

                          

                          

                          $(document).ready(function () {

                                            

                                            $key = window.localStorage.getItem("key");

                                            $('#aver-elec', this).html($key);

                                            $('#aver-elec').html($key);

                                            $('#aver-elec').show($key);

                                            

                                            console.log('aver-elec ' + $key);

                                            

                                            $('#aver-elec').val($key);

                                            $('#aver-elec', this).html(localStorage.getItem('aver_elec'));

                                            $('#aver-elec.val()').html($key);


                                            

                                            $("#add_more").click(function () {

                                                                 console.log("add_more button");

                                                                 

                                                                 customer_bulbs.push('2');

                                                                 

                                                                 console.log(customer_bulbs);

                                                                 });

                                            

                                            

                                            

                                            

                                            $("form#busi-form").changeType();

                                            

                                            //$('#busi-form').submit(function(e)

                                            

                                            

                                            

                                            

                                            });

                          

                          

                          

                          });

                        

                        

                        

                        

                        

                        

                    }
					
					
					function send_email_pro()
					{
						$pro_email = $('#pro_email').val();
						var atpos = $pro_email.indexOf("@");
						var dotpos = $pro_email.indexOf(".");
						
						if ($('#pro_email').val() == "" || $('#pro_email').val() == null || $('#pro_email').val() == 0 || atpos<1)
						{
							alert ('Please enter a valid email address');
						}
						else
						{
							alert("Thank you. Please wait a couple of minutes for the email to arrive and it maybe appaear in your Junk Mail.");
							
							console.log(localStorage.pro_email_string);
							console.log(localStorage.pro_email_string[0,4]);
							console.log(customer_bulbs);
							//console.log(cb_line);
							
							var pro_json = JSON.stringify(customer_bulbs);
							console.log(pro_json);
						
 							//$.post("http://toast.lancs.ac.uk/haddlett/mail.php?",{email:$pro_email} ,alert("Great Success"));
							//url_post = "http://toast.lancs.ac.uk/haddlett/mail.php?customer_mail=" + $pro_email;
							url_post = "http://convertabulb.co.uk/mail.php?customer_mail=" + $pro_email;
							console.log(url_post);
							/*
							$.ajax({
								   url:url_post,
								   data: pro_json,
								   dataType: "json",
								   contentType: "application/json; charset=utf-8",
								   type: "POST",
								   success: function(){alert("Great Success");}
								   ,
								   error: function(){
									   alert("Massive Fail");}
								   });
							*/
							$.post(url_post, pro_json,
							function(){
										   alert("Message Sent!");
									   },
									   "json"
										   );
							
						}
					
 
 
 
  // perform other work here ...
 
  // Set another completion function for the request above
  //jqxhr.complete(function(){ alert("second complete"); });
					}

                    
