

//<![CDATA[
	var coverhigh=1;
	var areas={
		"5_front":{"w":[0.98,1.24,1.68,1.98],"stn":[0.97,0.85,1.2,1.13],"rp":[1.8,0.82,2.9,0.96],"st":[2.43,0.78,2.50,2.6],"ho":[4.09,0.78,4.37,2.60],"mp":[1.3,2.2,2.125,2.48]},
		"5_back":{"stn":[4.14,0.8,4.37,1.13],"gs":[2.35,0.78,2.55,2.60],"mp":[1.25,2.24,1.9,2.47]},

		"5_neu_front":{"w":[1.2,1.24,1.8,1.98],"emn":[1.25,2.05,1.6,2.55],"rp":[0.9,0.78,1.05,2.6],"st":[2.6,0.78,2.67,2.6],"ho":[4.07,0.78,4.28,2.6],"mp":[2.75,0.85,3.4,1.4]},
		"5_neu_back":{"mp":[2.57,0.98,3.12,1.41]},

		"10_front":{"w":[0.98,1.24,1.68,1.98],"stn":[0.97,0.85,1.32,1.11],"rp":[1.8,0.82,2.9,0.96],"st":[2.43,0.78,2.55,2.63],"ho":[4.08,0.78,4.35,2.63],"mp":[1.47,2.24,2.22,2.56]},
		"10_back":{"stn":[4.05,0.82,4.34,1.13],"gs":[2.35,0.78,2.55,2.64],"mp":[1.35,2.3,1.9,2.54]},
		"20_front":{"w":[0.95,1.24,1.60,1.98],"stn":[0.95,0.85,1.25,1.16],"rp":[1.8,0.82,2.9,0.96],"st":[2.43,0.78,2.55,2.7],"ho":[4.08,0.78,4.35,2.7],"mp":[1.44,2.34,2.28,2.63]},
		"20_back":{"stn":[4.11,0.85,4.4,1.18],"gs":[2.32,0.78,2.55,2.7],"mp":[1.43,2.38,1.95,2.62]},

		"50_front":{"w":[0.98,1.24,1.68,1.98],"stn":[0.97,0.85,1.32,1.11],"rp":[1.8,0.82,2.9,0.96],"st":[2.6,0.78,2.73,2.71],"ho":[3.87,1.79,4.37,2.33],"mp":[1.43,2.34,2.0,2.66]},
		"50_back":{"stn":[4.05,0.8,4.41,1.13],"ccn":[3.82,2.27,4.4,2.6],"mp":[1.43,2.34,2.0,2.66]},

		"100_front":{"w":[0.98,1.24,1.68,1.98],"stn":[0.97,0.85,1.32,1.11],"rp":[1.8,0.82,2.9,0.96],"st":[2.6,0.78,2.73,2.71],"ho":[3.86,1.83,4.34,2.36],"mp":[1.48,2.34,2.06,2.66]},
		"100_back":{"stn":[3.93,0.8,4.35,1.13],"ccn":[3.71,2.29,4.35,2.65],"mp":[1.57,2.37,2.06,2.66]},

		"200_front":{"w":[0.98,1.24,1.68,1.98],"stn":[0.97,0.85,1.32,1.11],"rp":[1.8,0.82,2.9,0.96],"st":[2.6,0.78,2.73,2.71],"ho":[4.0,1.79,4.47,2.36],"mp":[1.56,2.34,2.56,2.66]},
		"200_back":{"stn":[4.05,0.8,4.515,1.13],"ccn":[3.82,2.29,4.5,2.65],"mp":[1.68,2.37,2.36,2.66]},

		"500_front":{"w":[0.98,1.24,1.68,1.98],"stn":[0.97,0.85,1.32,1.11],"rp":[1.8,0.82,2.9,0.96],"st":[2.6,0.78,2.73,2.71],"ho":[4.08,1.79,4.62,2.36],"mp":[1.56,2.34,2.56,2.66]},
		"500_back":{"stn":[4.2,0.8,4.62,1.13],"ccn":[3.94,2.25,4.63,2.61]}
	};

	(function($) {
		$(document).ready(function() {
			reload();

		});
	})(jQuery);
	function take(flow,nr) {
		if (coverhigh==flow) {
			$("#content").load("bill.html");
		}else {

		}
	}
	function reload() {
		var bview={"-1":"back","1":"front"};
		var sview={"1":"","2":"_neu"};
		$("#billprev").attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[-view]+".jpg");
		var i=$("#bill");
//alert(aspect+" - "+w+", "+h+" ["+i.prop('naturalWidth')+", "+i.prop("naturalHeight")+"]");
		i.attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[view]+".jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/197+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/197+"em");
		var theareas=areas[selectedbill+sview[serie]+"_"+bview[view]];
		$("#areas").html("");
		for (area in theareas) {

			var coords=theareas[area];
			$("#areas").append('<div onclick=\'$("#content").load("'+area+'.html");\' class="layer" title="'+area+'" style="left:'+coords[0]+'em;top:'+coords[1]+'em;width:'+(coords[2]-coords[0])+'em;height:'+(coords[3]-coords[1])+'em;"></div>');
		}



	}
//]]>



//<![CDATA[
	var coverhigh=1;
	var actionstatus=0;
	var demostarted=false;
    var demoFrames = {
        s5_neu:[[5.0,0.66,5.4,2.94]],
        s5:[[5.05,0.66,5.45,2.94]],
        s10:[[5.05,0.66,5.45,2.98]],
        s20:[[5.0,0.66,5.45,3.05]],
        s50:[[4.8,1.9,5.45,2.55]],
        s100:[[4.75,2.0,5.45,2.6]],
        s200:[[4.85,1.9,5.6,2.6]],
        s500:[[5.05,1.9,5.725,2.55]]
    };
	var holosizes={s5:[48,364,5.12,0.66],s10:[66,370,5.05,0.66],s20:[86,383,4.98,0.66],s50:[79,87,4.9,1.97],s100:[82,87,4.86,2.07],s200:[77,91,5.04,2.01],s500:[98,86,5.1,1.99],s5_neu:[48,364,5.07,0.66]};
    
    var demoTurns = 0;
    var maxDemos = 3;
    var timer = [];
	(function($) {
		$(document).ready(function() {
                          setVideoLink();
                          setCoverIcon();
                          
/*
			$('html').mousemove(function(e) {
				var p=$("#thepage").offset();
				var x=(e.pageX-p.left)*600/h/160;
				var y=(e.pageY-p.top)*600/h/160;
//				$("#gf_log").html(x+"em, "+y+"em, "+p.left+":"+e.pageX+", "+e.pageY);
			});
*/
//			$(window).resize(reload);
//			$("#bill_uv_2").css("opacity",0);
			reload();
			$("#page_text p").html($._apptexte.get("feature.id.hologram","copy",selectedbill+"_"+serie));
			$("#page_title p").html($._apptexte.get("feature.id.hologram","headline",selectedbill+"_"+serie));
                          var t=$("#page_text");
                          while (t.height()>h/2) {
                          if (t.width()>w*0.6) break;
                          t.css("width",t.width()+40);
                          }
                          if(t.height() > h/2) {
                          t.css("height", "1.75em");
                          t.css("overflow", "auto");
                          }
                          t.css("top",(parseInt(t.css("top"))-t.height())*factor+"em");
                          
                          startWatch();
                          
                          // transform 3d
                          var bill = $(".feature-bill");
                          bill.css("transform-origin", "3em 2em");
                          bill.css("transition-duration", "1s");
                          bill.css("transition-property", "transform");
                          
                          $("#billcontainer").css("-webkit-perspective", "200");
                          $("#billcontainer").css("-webkit-perspective-origin", "2em 2em");
                          bill.css("-webkit-transition-duration", "1s");
                          bill.css("-webkit-transition-property", "-webkit-transform");
                          
                          initButtons("#top_logo", "#page_top_video", "#page_top_help", "#page_info", "#page_top_back");
                          
                          demo();
            });
     
    })(jQuery);

	function reload() {
		var bview={"-1":"back","1":"front"};
		var sview={"1":"","2":"_neu"};
		var i=$("#bill_uv");
		i.attr("src","img/scheine/ho/"+selectedbill+sview[serie]+"_holo_door.jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
		var i=$("#bill_uv_2");
		i.attr("src","img/scheine/ho/"+selectedbill+sview[serie]+"_holo_value.png");
		if (aspect==1) i.css("width",holosizes["s"+selectedbill+sview[serie]][0]/158+"em");
		if (aspect==2) i.css("height",holosizes["s"+selectedbill+sview[serie]][1]/158+"em");
		i.css("left",holosizes["s"+selectedbill+sview[serie]][2]+"em");
		i.css("top",holosizes["s"+selectedbill+sview[serie]][3]+"em");
        
        var df = demoFrames["s"+selectedbill+sview[serie]];
        $("#demoframes").empty();
        for(var frame in df) {
            var coords = df[frame];
            var x = coords[0];
            var y = coords[1];
            var w = coords[2]-x;
            var h = coords[3]-y;
            
            $("#demoframes").append('<div onclick=\'demo2();\' class="layer" title="" style="left:'+x+'em;top:'+y+'em;width:'+w+'em;height:'+h+'em;"></div>');
        }
        initButtons(".layer");
        
        $("#animation").click(demo);
        
        $("#animation .p2").hide();

	}
	function toggle_text() {
		var t=$("#page_text");


		t.toggleClass("visible");
		if (t.hasClass("visible")) $("#page_info").attr("src","img/info_high.png");
		else $("#page_info").attr("src","img/info_low.png");
	}
    
	function action(test) {
		if ((test==1)&&(demostarted)) return;
		if (actionstatus==0) {
			$("#bill_uv_2").fadeIn(1000,togglebutton);
			$("#bill").fadeOut(1000 );
            $("#animation .p2").fadeIn(1000);
            $("#animation .p1").fadeOut(1000);
            
            $(".feature-bill").css("-webkit-transform", "translate(.175em, .125em) scale(.95) rotateX(5deg)");
            $(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,-0.0005,0,0,1,0,0,0,0,1)");
			actionstatus=1;
			if (!demostarted) $("#page_power").attr("src","img/on_off_high.png");
		} else {
			$("#bill_uv_2").fadeOut(1000,togglebutton);
			$("#bill").fadeIn(1000);
            $("#animation .p2").fadeOut(1000);
            $("#animation .p1").fadeIn(1000);
            
            $(".feature-bill").css("-webkit-transform", "translate(0em, 0em) scale(1) rotateX(0deg)");
            $(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
			actionstatus=0;
			if (!demostarted) $("#page_power").attr("src","img/on_off_low.png");
            
		}
	}
	function togglebutton() {
//alert(demostarted+" . "+actionstatus);
		if (demostarted) {
			if (actionstatus==0) {
				$("#page_demo").attr("src","img/demo_low.png");
				demostarted=false;
                demoTurns++;
                if(demoTurns < maxDemos) demo(); else startWatch();
			}
		}
	}
    
    
    function resetDemo() {
        demoTurns = 3;
        for(var i=0;i<timer.length;i++) {
            clearTimeout(timer[i]);
        }
        timer = [];
        demostarted = false;
        actionstatus = 0;
        $("#bill").fadeIn(10);
        $("#bill_uv_2").fadeOut(10, startWatch);
        $("#animation .p1").fadeIn(10);
        $("#animation .p2").fadeOut(10);
        
        
        
        $(".feature-bill").css("-webkit-transform", "translate(0em, 0em) scale(1) rotateX(0deg)");
        $(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
    }
    
    function demo2() {
    	demo(true);
    }
    
    function demo(clicked) {
        if(clicked) {
            if(demostarted) {
                resetDemo();
                return;
            } else {
              demoTurns = 2;
            }
        }
		if (demostarted) return;
        stopWatch();
        
		demostarted=true;
		$("#page_demo").attr("src","img/demo_high.png");
		action(0);
		timer.push(window.setTimeout("action(0)",3000));

	}
    
    var startAcc = null;
    function onAcc(acc) {
        //debug(acc.x+":"+acc.y+":"+acc.z);
        if(startAcc == null) startAcc = acc;
        var dx = startAcc.x-acc.x;
        dx = Math.abs(dx);
        if(dx > 2.75) dx = 2.75;
        
        var proz = dx / 2.75;
        
        $("#bill_uv_2").css("opacity", proz);
        //debug(proz);
        //console.log(proz);
    }
    
    function onAccErr() {
        //alert("accerr");
    }
    
    var accID;
    function startWatch() {
        $("#bill_uv_2").css("opacity", 0);
        $("#bill_uv_2").show();
        var options = { frequency: 200 };

        if(navigator.accelerometer) accID = navigator.accelerometer.watchAcceleration(onAcc, onAccErr, options);

    }
    
    function stopWatch() {
        startAcc = null;
        if(navigator.accelerometer) if(accID != null) navigator.accelerometer.clearWatch(accID);
        accID = null;
        $("#bill_uv_2").hide();
        $("#bill_uv_2").css("opacity", 1);
    }
    
    

//]]>



//<![CDATA[
	var coverhigh=2;
	var circular_2=null;
	var circular_1=null;
	var places={5:1,10:2,20:3,50:4,100:5,200:6,500:7};
	var started=true;var my=true;
    var factors={
        "5": .82,
        "5_neu": .82,
        "10": .83,
        "20": .86,
        "50": .86,
        "100": .86,
        "200": .86,
        "500": .86,
    }
    var areas={
		"5_front":{"w":[0.98,1.24,1.68,1.98],"stn":[0.97,0.85,1.2,1.13],"rp":[2.75,0.78,3.95,2.6],"st":[2.4,0.78,2.6,2.6],"ho":[4.09,0.78,4.35,2.60],"mp":[1.3,2.2,2.125,2.60]},
		"5_back":{"stn":[4.14,0.8,4.37,1.13],"gs":[2.35,0.78,2.55,2.60],"w":[3.7,1.24,4.375,1.98]},
        
		"5_neu_front":{"w":[1.22,1.38,1.8,1.98],"emn":[1.22,2.05,1.6,2.55],"rp":[0.9,0.78,1.175,2.6],"rp-2":[4.325,0.78,4.5,2.6],"st":[2.3,0.78,2.57,2.6],"ho":[4.07,0.78,4.28,2.6],"mp":[2.75,0.85,3.4,1.4]},
		"5_neu_back":{"mp":[2.57,0.98,3.12,1.41], "w": [3.65, 1.25, 4.3, 2]},
        
		"10_front":{"w":[0.98,1.24,1.68,1.98],"stn":[0.97,0.85,1.32,1.11],"rp":[2.74,0.78,3.95,2.62],"st":[2.4,0.78,2.60,2.62],"ho":[4.05,0.78,4.35,2.62],"mp":[1.47,2.24,2.22,2.62]},
		"10_back":{"stn":[4.05,0.82,4.34,1.13],"gs":[2.35,0.78,2.55,2.64],"w":[3.7,1.24,4.375,2.1]},
        
		"20_front":{"w":[0.95,1.24,1.60,1.98],"stn":[0.95,0.85,1.25,1.16],"rp":[2.67,0.78,3.96,2.68],"st":[2.4,0.78,2.6,2.68],"ho":[4.06,0.78,4.30,2.68],"mp":[1.44,2.34,2.03,2.68]},
		"20_back":{"stn":[4.11,0.85,4.4,1.18],"gs":[2.32,0.78,2.55,2.7],"w":[3.7,1.24,4.4,2.2]},
        
		"50_front":{"w":[0.98,1.24,1.68,1.98],"stn":[0.97,0.85,1.32,1.11],"rp":[2.72,0.78,3.74,2.68],"st":[2.4,0.78,2.6,2.68],"ho":[3.8,1.70,4.37,2.33],"mp":[1.43,2.34,2.0,2.68]},
		"50_back":{"stn":[4,0.8,4.35,1.13],"ccn":[3.72,2.2,4.3,2.6],"w":[3.7,1.34,4.35,2.1]},
        
		"100_front":{"w":[0.98,1.24,1.68,1.98],"stn":[0.97,0.85,1.32,1.11],"rp":[2.66,0.78,3.72,2.68],"st":[2.4,0.78,2.6,2.68],"ho":[3.76,1.83,4.34,2.36],"mp":[1.48,2.34,2.06,2.68]},
		"100_back":{"stn":[3.85,0.8,4.325,1.13],"ccn":[3.65,2.25,4.3,2.65],"w":[3.65,1.34,4.325,2.15]},
        
		"200_front":{"w":[0.98,1.24,1.68,1.98],"stn":[0.97,0.85,1.32,1.11],"rp":[2.68,0.78,3.84,2.68],"st":[2.4,0.78,2.6,2.68],"ho":[3.9,1.79,4.47,2.36],"mp":[1.56,2.34,2.36,2.68]},
		"200_back":{"stn":[4.05,0.8,4.45,1.13],"ccn":[3.75,2.25,4.45,2.65],"w":[3.8,1.34,4.45,2.15]},
        
		"500_front":{"w":[0.98,1.24,1.68,1.98],"stn":[0.97,0.85,1.32,1.11],"rp":[2.7,0.78,3.9,2.68],"st":[2.4,0.78,2.6,2.68],"ho":[4.0,1.73,4.60,2.36],"mp":[1.56,2.34,2.36,2.68]},
		"500_back":{"stn":[4.2,0.8,4.6,1.13],"ccn":[3.85,2.25,4.6,2.61],"w":[3.85,1.34,4.6,2.15]}
	};

    
    var startx = 0;
    var offx = 0;
    var deltax;
    var move=false;
    
    (function($) {
     $(document).ready(function() {
                       
                       setVideoLink();
                       setupAreas();
                       focusBill();
                       $("#coverflowc img").click(function() {
                            var id = ($(this).closest("div").attr("id"));
                                                  serie = parseInt(id.split("_")[0].replace("s", ""));
                                                  selectedbill = parseInt(id.split("_")[1].replace("e", ""));
                                                  focusBill();
                        });
                       $("#coverflowc").bind('touchstart', function(e) {
                                             var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                             startx = touch.pageX;
                                             });
                       $("#coverflowc").bind('touchend', function(e) {
                                             var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                             //startx = touch.pageX;
                                             offx = deltax;
                                             //debug(offx);
                                             });

                       $("#coverflowc").bind('touchmove', function(e) {
                                             e.preventDefault();
                                             var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                             var elm = $(this).offset();
                                             var x = touch.pageX-elm.left;
                                             var y = touch.pageY-elm.top;
                                             if(x < $(this).width() && x > 0) {
                                             if(y < $(this).height() && y > 0) {
                                                    deltax = startx+offx-touch.pageX;
                                                    $(this).css("left", -deltax);
                                                    checkActiveBill();
                                                }
                                             
                                             }
                                      });
                       
                       initButtons("#top_logo", "#page_top_video", "#page_top_help", "#page_bottom_rp", "#page_bottom_uv", "#page_bottom_mp");
                       
                       });
        
        //checkActiveBill();
     })(jQuery);
    
    //var minx = 1000;
    var centeredBill;
        function checkActiveBill() {
        
        var minx = 1000;
        //var centeredBill;
        //$("#coverflowc").css("left", -300);
        var x = $("#coverflowc").position().left;
        var bills = $("#coverflowc .bill");
        
        for(var i=0;i<bills.length;i++) {
            var b = $(bills[i]);
            var dx = b.position().left + x-80;
            
            if(Math.abs(dx) < minx && centeredBill != b) {
                minx = Math.abs(dx);
                $(".areas", centeredBill).hide();
                selectedbill = b.attr("data-value");
                serie = b.attr("data-serie");
                debug(serie+":"+selectedbill);
                centeredBill = b;
                $(".areas", centeredBill).show();
            }
        }
        //debug(serie+":"+selectedbill);
    }
	
	function take(flow,nr) {
            view=1;
			selectedbill=nr;
			serie=flow;
			$("#content").load("bill.html");
    }
    
    function focusBill() {
        //debug(serie+":"+selectedbill);
        if(selectedbill == 0) {
            //serie = 1;
            selectedbill = 5;
        } 
        centeredBill = $("#s"+serie+"_e"+selectedbill);
        $(".areas", centeredBill).show();
        //debug(centeredBill.attr("id"));
        var x = centeredBill.position().left - 80;
        $("#coverflowc").css("left", -x);
        offx = x;
    }
    
    function swapFace() {
        view = -view;
        setupAreas();
        $(".areas", centeredBill).show();
    }
    
    
    function setupAreas() {
        if(view == 1) {
            $("#page_bottom_rp").attr("src", "img/btn_rp_low.png");
            $("#page_bottom_rp").bind('click', function() {
                                      $("#content").load("rp.html");
                                      });
        } else {
            $("#page_bottom_rp").attr("src", "img/btn_rp_off.png");
            $("#page_bottom_rp").unbind('click');
        }
        var bview={"-1":"back","1":"front"};
		var sview={"1":"","2":"_neu"};
        var bill = $("#s2_e5");
        var factor = .82;
        var diffx = .9;
        var diffy = .78;
        var seriesAndDenoms = {
            "s2": [5],
            "s1": [5,10,20,50,100,200,500]
        };
        
                
        for(var s in seriesAndDenoms) {
            for(var d in seriesAndDenoms[s]) {
                var val = seriesAndDenoms[s][d];
                bill = $("#"+s+"_e"+val);
                tserie = s.replace("s", "");
                
                if(view == 1) {
                    $("img.money-back", bill).hide();
                    $("img.money-front", bill).show();
                } else {
                    $("img.money-back", bill).show();
                    $("img.money-front", bill).hide();
                }

                
                var theareas=areas[val+sview[tserie]+"_"+bview[view]];
                factor = factors[val+sview[tserie]];
                
                var div = $(".areas", bill);
                div.empty();
                for (area in theareas) {
                    
                    var coords=theareas[area];
                    var x = coords[0];
                    var y = coords[1];
                    var w = coords[2]-x;
                    var h = coords[3]-y;
                    
                    //w -= diff;
                    //h -= diff;
                    x -= diffx;
                    y -= diffy;
                    
                    w /= factor;
                    h /= factor;
                    x /= factor;
                    y /= factor;
                    
                    area = area.split("-")[0];
                    div.append('<div onclick=\'$("#content").load("'+area+'.html");\' class="layer" title="'+area+'" style="left:'+x+'em;top:'+y+'em;width:'+w+'em;height:'+h+'em;"></div>');
                }
                initButtons(".layer");
                div.hide();
            }
        }
    }
//]]>



//<![CDATA[
	var coverhigh=2;
	var circular_2=null;
	var circular_1=null;
	var places={5:1,10:2,20:3,50:4,100:5,200:6,500:7};
	var started=true;var my=true;
	(function($) {
		$(document).ready(function() {
			circular_2 = new ImageFlow();
			circular_2.init({ ImageFlowID: 'coverflow2c',
				reflections: false, 
				circular: true,
				captions:false,
				xStep:80,
				aspectRatio:5,
				percentLandscape:148,
				slider: false,
				startAnimation: false,
				startID:places[selectedbill],
				glideToStartID: false,
//				preloadImages:false,
				afterglideevent: afterglide2
			});
			circular_1 = new ImageFlow();
			circular_1.init({ ImageFlowID: 'coverflow1c',
				reflections: false,
                            imageScaling: true,
				circular: true,
				captions:false,
//				imagesM:1.25,
				aspectRatio:5,
//				xStep:150,
				xStep:80,
				percentLandscape:148,
				slider: false,
				startAnimation: false,
				glideToStartID: false,
//				preloadImages:false,
				startID:places[selectedbill],
				afterglideevent: afterglide1
			});
			show(serie);

//			if (serie==1) circular_1.glideTo(places[selectedbill]+4);
//			else circular_2.glideTo(places[selectedbill]+4);

		});
	})(jQuery);
	function afterglide1(nr) {
//alert(1+":"+nr+","+coverhigh+","+serie+","+my);
		if ((!my)&&(coverhigh!=1)) {serie=1;show(serie);}
//		if (coverhigh!=1) show(1);
		if ((coverhigh==1)&&(!my)) {my=true;circular_2.glideTo(nr);}
		my=false;
	}
	function afterglide2(nr) {
//alert(2+":"+nr+","+coverhigh+","+serie+","+my);
		if ((!my)&&(coverhigh!=2)) {serie=2;show(serie);}
//		if (coverhigh!=2) show(2);
		if ((coverhigh==2)&&(!my)) {my=true;circular_1.glideTo(nr);}
		my=false;

	}
	function donttake(nr) {
//alert("donttake"+nr);
circular_1.firstRefresh=true;
circular_2.firstRefresh=true;
//alert("HO");
		circular_2.glideTo(4);
	}
	function take(flow,nr) {
//alert("take"+flow+","+nr);
circular_1.firstRefresh=true;
circular_2.firstRefresh=true;
		if (coverhigh==flow) {
			view=1;
			selectedbill=nr;
			serie=flow;
			$("#content").load("bill.html");
		}else {
			show(flow);
			if (flow==2) {
			my=true;
				circular_1.refresh();
			my=true;
				circular_2.refresh();
			} else {
			my=true;
				circular_2.refresh();
			my=true;
				circular_1.refresh();
			}
		}
	}
	function show(flow) {
//alert("show"+flow);
		if (flow==2) {
			$("#coverflow1").css("z-index",14);
			$("#coverflow2").css("z-index",15);
			circular_1.imagesM=1.25;
			circular_1.xStep=150;
			circular_2.imagesM=1;
			circular_1.xStep=80;
		}
		if (flow==1) {
			$("#coverflow2").css("z-index",14);
			$("#coverflow1").css("z-index",15);
			circular_2.imagesM=1.25;
			circular_2.xStep=150;
			circular_1.imagesM=1;
			circular_1.xStep=80;
		}
		coverhigh=flow;
	}
	
//]]>



//<![CDATA[
	(function($) {
		$(document).ready(function() {
                          setVideoLink();
                          setCoverIcon();
			$("#help_text1 p.first").html($._apptexte.get("textpanel.id.suspect_note","copy.id.1"));
			$("#help_text1 p.second").html($._apptexte.get("textpanel.id.suspect_note","copy.id.2"));
            $("#help_text2 p").html($._apptexte.get("textpanel.id.suspect_note","copy.id.3"));
                          
			if (selectedbill==0) {
				$("#page_top_detail").attr("onclick",'$("#content").load("cover.html");');
			}
                          
                          $("#help_text2 a").click(function() {
                                                   var url = $(this).attr("href");
                                                   loadURL(url);
                                                   return false;
                          });
                          
                          initButtons("#top_logo", "#page_top_video", "#page_top_back");
		});
	})(jQuery);
//]]>








            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        


//<![CDATA[
	var coverhigh=1;
	var actionstatus=0;
	var demostarted=false;
    var demoFrames = {
        s5_neu_front:[[1.8,0.66,2.0,2.9375]],
        
        s5_front:[[3.05,0.66,3.3,2.9375]],
        
        s10_front:[[3.0,0.66,3.2,2.9375]],
        
        s20_front:[[3.0,0.66,3.15,3.05]],
        
        s50_front:[[3.0,0.66,3.2,3.075]],
        
        s100_front:[[3.0,0.66,3.15,3.075]],
        
        s200_front:[[3.0,0.66,3.15,3.075]],
        
        s500_front:[[3.1,0.66,3.25,3.075]]
    };
    
    var demoTurns = 0;
    var maxDemos = 3;
    var timer = [];
	(function($) {
		$(document).ready(function() {
                          setVideoLink();
                          setCoverIcon();
//			$(window).resize(reload);
//			$("#bill_uv_2").css("opacity",0);
			reload();
			$("#page_text p").html($._apptexte.get("feature.id.security_thread","copy",selectedbill+"_"+serie));
			$("#page_title p").html($._apptexte.get("feature.id.security_thread","headline",selectedbill+"_"+serie));
                          var t=$("#page_text");
                          while (t.height()>h/2) {
                          if (t.width()>w*0.6) break;
                          t.css("width",t.width()+40);
                          }
                          if(t.height() > h/2) {
                          t.css("height", "1.75em");
                          t.css("overflow", "auto");
                          }
                          t.css("top",(parseInt(t.css("top"))-t.height())*factor+"em");
                          
                          initButtons("#top_logo", "#page_top_video", "#page_top_help", "#page_info", "#page_top_back");
                          
                          demo();
            });
	})(jQuery);

	function reload() {
		var bview={"-1":"back","1":"front"};
		var sview={"1":"","2":"_neu"};
		$("#billprev").attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[-view]+".jpg");
		var i=$("#bill_uv");
		if (serie==2) {
			i.attr("src","img/scheine/stn/"+selectedbill+sview[serie]+"_"+bview[view]+".jpg");
		} else {
			i.attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[view]+".jpg");
		}
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
		var i=$("#bill_uv_2");
		i.attr("src","img/scheine/stn/"+selectedbill+sview[serie]+"_stn_"+bview[view]+".jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
        
        var df = demoFrames["s"+selectedbill+sview[serie]+"_"+bview[view]];
        $("#demoframes").empty();
        for(var frame in df) {
            var coords = df[frame];
            var x = coords[0];
            var y = coords[1];
            var w = coords[2]-x;
            var h = coords[3]-y;
            
            $("#demoframes").append('<div onclick=\'demo2();\' class="layer" title="" style="left:'+x+'em;top:'+y+'em;width:'+w+'em;height:'+h+'em;"></div>');
        }
        initButtons(".layer");
        
        $("#look-icon").click(demo);

	}
	function toggle_text() {
		var t=$("#page_text");


		t.toggleClass("visible");
		if (t.hasClass("visible")) $("#page_info").attr("src","img/info_high.png");
		else $("#page_info").attr("src","img/info_low.png");
	}
	function action(test) {
		if ((test==1)&&(demostarted)) return;
		if (actionstatus==0) {
			$("#bill_uv_2").fadeIn(1000,togglebutton);
			$("#bill").fadeOut(1000 );
			actionstatus=1;
			if (!demostarted) $("#page_power").attr("src","img/gluehbirne_high.png");
		} else {
			$("#bill_uv_2").fadeOut(1000,togglebutton);
			$("#bill").fadeIn(1000);
			actionstatus=0;
			if (!demostarted) $("#page_power").attr("src","img/gluehbirne_low.png");
		}
	}
	function togglebutton() {
//alert(demostarted+" . "+actionstatus);
		if (demostarted) {
			if (actionstatus==0) {
				$("#page_demo").attr("src","img/demo_low.png");
				demostarted=false;
                demoTurns++;
                if(demoTurns < maxDemos) demo();
			}
		}
	}
    
    function resetDemo() {
        
        demoTurns = 3;
        for(var i=0;i<timer.length;i++) {
            clearTimeout(timer[i]);
        }
        timer = [];
        demostarted = false;
        actionstatus = 0;
        $("#bill").fadeIn(10);
        $("#bill_uv_2").fadeOut(10);
        //$("#animation .p1").fadeIn(10);
        //$("#animation .p2").fadeOut(10);
        
        
        //$(".feature-bill").css("-webkit-transform", "translate(0em, 0em) scale(1) rotateX(0deg)");
        //$(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
    }
    
    function demo2() {
    	demo(true);
    }
    
	function demo(clicked) {
        if(clicked) {
            if(demostarted) {
                resetDemo();
                return;
            } else {
                demoTurns = 2;
            }
        }
		if (demostarted) return;
		demostarted=true;
		$("#page_demo").attr("src","img/demo_high.png");
		action(0);
		timer.push(window.setTimeout("action(0)",3000));

	}

//]]>



//<![CDATA[
	var coverhigh=1;
	var actionstatus=0;
	var demostarted=false;
    var demoFrames = {
        s5_neu_front:[[1.2,0.9,2.5,2.5]],
        s5_neu_back:[[1.2,0.9,2.5,2.5]],
        s5_front:[[1.15,1.15,2.1,2.2]],
        s5_back:[[4.6,1.15,5.5,2.25]],
        s10_front:[[1.125,1.14,2.2,2.35]],
        s10_back:[[4.525,1.14,5.5,2.35]],
        s20_front:[[1.125,1.14,2.05,2.35]],
        s20_back:[[4.525,1.14,5.5,2.45]],
        s50_front:[[1.125,1.14,2.05,2.35]],
        s50_back:[[4.525,1.14,5.5,2.45]],
        s100_front:[[1.125,1.14,2.15,2.35]],
        s100_back:[[4.525,1.14,5.45,2.45]],
        s200_front:[[1.125,1.14,2.15,2.35]],
        s200_back:[[4.7,1.14,5.65,2.45]],
        s500_front:[[1.125,1.14,2.15,2.35]],
        s500_back:[[4.8,1.14,5.8,2.45]]
    };

	var actimg="#bill";
    
    var demoTurns = 0;
    var maxDemos = 3;
    var timer = [];
	(function($) {
		$(document).ready(function() {
                          setVideoLink();
                          setCoverIcon();
//			$(window).resize(reload);
//			$("#bill_uv_2").css("opacity",0);
			reload();
			$("#page_text p").html($._apptexte.get("feature.id.watermark","copy",selectedbill+"_"+serie));
			$("#page_title p").html($._apptexte.get("feature.id.watermark","headline",selectedbill+"_"+serie));
                          var t=$("#page_text");
                          while (t.height()>h/2) {
                          if (t.width()>w*0.6) break;
                          t.css("width",t.width()+40);
                          }
                          if(t.height() > h/2) {
                          t.css("height", "1.75em");
                          t.css("overflow", "auto");
                          }
                          t.css("top",(parseInt(t.css("top"))-t.height())*factor+"em");
                          
                          initButtons("#top_logo", "#page_top_video", "#page_top_help", "#page_info", "#page_top_back");
                          
                          demo();
            });
	})(jQuery);

	function reload() {
		var bview={"-1":"back","1":"front"};
		var sview={"1":"","2":"_neu"};
		var i=$("#bill_uv");
        if(serie == 2 && selectedbill == 5) {
            i.attr("src","img/scheine/wm/"+selectedbill+sview[serie]+"_wm_normal_"+bview[view]+".png");
        } else {
            i.attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[view]+".jpg");
        }
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
        var i=$("#bill_uv_2");
		i.attr("src","img/scheine/wm/"+selectedbill+sview[serie]+"_wm_trans_adjusted_"+bview[view]+".jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
        
        var df = demoFrames["s"+selectedbill+sview[serie]+"_"+bview[view]];
        $("#demoframes").empty();
        for(var frame in df) {
            var coords = df[frame];
            var x = coords[0];
            var y = coords[1];
            var w = coords[2]-x;
            var h = coords[3]-y;
            
            $("#demoframes").append('<div onclick=\'demo2();\' class="layer" title="" style="left:'+x+'em;top:'+y+'em;width:'+w+'em;height:'+h+'em;"></div>');
        }
        
        initButtons(".layer");
        $("#look-icon").click(demo);

	}
	function toggle_text() {
		var t=$("#page_text");


		t.toggleClass("visible");
		if (t.hasClass("visible")) $("#page_info").attr("src","img/info_high.png");
		else $("#page_info").attr("src","img/info_low.png");
	}
	function action(test) {
		if ((test==1)&&(demostarted)) return;
		if (actionstatus==0) {
			$("#bill_uv_2").fadeIn(1000,togglebutton);
			$("#bill").fadeOut(1000 );
			actionstatus=1;
			if (!demostarted) $("#page_power").attr("src","img/gluehbirne_high.png");
		} else {
			$("#bill_uv_2").fadeOut(1000,togglebutton);
			$("#bill").fadeIn(1000);
			actionstatus=0;
			if (!demostarted) $("#page_power").attr("src","img/gluehbirne_low.png");
		}
	}
	function setbutton(btn) {
		var bts={"1":"sonne","2":"mond"};
		var sts={"0":"low","1":"high"};
		if (!demostarted) {
			$("#page_power"+btn).attr("src","img/"+bts[btn]+"_"+sts[actionstatus]+".png");
		}
	}
	function togglebutton() {
        //alert(demostarted+" . "+actionstatus);
		if (demostarted) {
			if (actionstatus==0) {
				$("#page_demo").attr("src","img/demo_low.png");
				demostarted=false;
                demoTurns++;
                if(demoTurns < maxDemos) demo();
			}
		}
	}
    
    function resetDemo() {
        
        demoTurns = 3;
        for(var i=0;i<timer.length;i++) {
            clearTimeout(timer[i]);
        }
        timer = [];
        demostarted = false;
        actionstatus = 0;
        $("#bill").fadeIn(10);
        $("#bill_uv_2").fadeOut(10);
        //$("#animation .p1").fadeIn(10);
        //$("#animation .p2").fadeOut(10);
        
        
        //$(".feature-bill").css("-webkit-transform", "translate(0em, 0em) scale(1) rotateX(0deg)");
        //$(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
    }
    
    function demo2() {
    	demo(true);
    }
    
	function demo(clicked) {
        if(clicked) {
            if(demostarted) {
                resetDemo();
                return;
            } else {
                demoTurns = 2;
            }
        }
		if (demostarted) return;
		demostarted=true;
		$("#page_demo").attr("src","img/demo_high.png");
		action(0);
		timer.push(window.setTimeout("action(0)",3000));


	}
    function swapFace() {
        view = -view;
        reload();
    }

//]]>



//<![CDATA[
	var coverhigh=1;
	var actlupe="";
	var demostarted=false;
    
	var mpos={
		s5_back:[2,1.7,0.50,1.8,0.33],
		s5_front:[2,1.97,2.1,2.53,2.2],
		s5_neu_front:[2,3.47,0.49, 3.1,0.28],
		s5_neu_back:[2,2.94,0.34,2.86,0.92],
		s10_back:[2,1.8,0.90,2.1,2],
		s10_front:[3,2,2.2,3.0,0.6,2.3,2.2],
		s20_back:[2,1.2,0.80,1.2,1.2],
		s20_front:[4,2.0,1.5, 4.0,0.8, 2.1,2.2,2.7,2.2],
		s50_back:[2,1.6,0.80,3.4,2],
		s50_front:[4, 3.2,0.46, 3.0,0.46, 2.1,2.2, 1.78,2.22],

		s100_back:[2,1.6,0.80,2.2,0.7],
		s100_front:[3, 1.95,2.31, 2.455,2.27, 1.77,0.32],

		s200_back:[2,1.6,0.75, 3.1,0.6],
		s200_front:[3, 3.16,1.57, 1.92,2.32, 2.45,2.23],

		s10:[704,370],s20:[704,383],s50:[702,387],s100:[693,386],s200:[721,386],
		s500_back:[2,0.8,0.54,2.9,0.37],
		s500_front:[3,2.47,2.2,1.97,2.1,2.1,1.29],s5neu:[713,364]};
    
    var demoFrames = {
        s5_neu_front:[[1.8,0.66,2.0,2.9375]],
        
        s5_front:[[3.05,0.66,3.3,2.9375]],
        
        s10_front:[[3.0,0.66,3.2,2.9375]],
        
        s20_front:[[3.0,0.66,3.15,3.05]],
        
        s50_front:[[3.0,0.66,3.2,3.075]],
        
        s100_front:[[3.0,0.66,3.15,3.075]],
        
        s200_front:[[3.0,0.66,3.15,3.075]],
        
        s500_front:[[2.3,1.66,2.8,2.16], [2.3,2.6,2.8,3.1], [2.8,2.7,3.3,3.2]],
        s500_back:[[1.4,1.16,1.9,1.66], [3.4,0.96,3.9,1.46]]

    };
	var bview={"-1":"back","1":"front"};
	var sview={"1":"","2":"_neu"};
    var timer = [];
	(function($) {
		$(document).ready(function() {
                          setVideoLink();
                          setCoverIcon();
			reload();
			$("#page_text p").html($._apptexte.get("feature.id.microprint","copy",selectedbill+"_"+serie));
			$("#page_title p").html($._apptexte.get("feature.id.microprint","headline",selectedbill+"_"+serie));
                          var t=$("#page_text");
                          while (t.height()>h/2) {
                          if (t.width()>w*0.6) break;
                          t.css("width",t.width()+40);
                          }
                          if(t.height() > h/2) {
                          t.css("height", "1.75em");
                          t.css("overflow", "auto");
                          }
                          t.css("top",(parseInt(t.css("top"))-t.height())*factor+"em");
                          
                          initButtons("#top_logo", "#page_top_video", "#page_top_help", "#page_info", "#page_top_back");
                          
                          action();
            });
	})(jQuery);
    
    function toggle_text() {
		var t=$("#page_text");
		t.toggleClass("visible");
    }

	function reload() {

		$("#billprev").attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[-view]+".jpg");
		var i=$("#bill_uv");
		i.attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[view]+".jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
//alert("img/scheine/mp/"+selectedbill+"_mp_"+bview[view]+"_1.png");
		var pos=mpos["s"+selectedbill+sview[serie]+"_"+bview[view]];
		for (var i=1;i<=pos[0];i++) {
			$("#lupe"+i).css("left",pos[i*2-1]+"em").css("top",pos[i*2]+"em");
			$("#lupeimg"+i).attr("src","img/scheine/mp/"+selectedbill+sview[serie]+"_mp_"+bview[view]+"_"+i+".png");
//$("#lupe"+i).css("display","block");
		}
        
        var df = mpos["s"+selectedbill+sview[serie]+"_"+bview[view]];
        $("#demoframes").empty();
        for(var i=1;i<=df[0];i++) {
            //var coords = df[i];
            var x = df[i*2-1]+.25;
            var y = df[i*2]+.5;
            var w = .5;
            var h = .5;
            
            $("#demoframes").append('<div onclick=\'action();\' class="layer" title="" style="left:'+x+'em;top:'+y+'em;width:'+w+'em;height:'+h+'em;"></div>');
        }
        initButtons(".layer");
	}
	function showlupe(nr) {
		if (actlupe!="") $(actlupe).fadeOut(1000);
		if (nr!=0) {$("#lupe"+nr).fadeIn(1000);actlupe="#lupe"+nr;}
		else {$("#page_demo").attr("src","img/demo_low.png");actlupe="";}
	}
	function action(test) {
		$("#page_demo").attr("src","img/demo_high.png");
		var pos=mpos["s"+selectedbill+sview[serie]+"_"+bview[view]];
		showlupe(1);
		for (i=2;i<=pos[0];i++) {
			window.setTimeout("showlupe("+i+")",3000*i-3000);
		}
		window.setTimeout("showlupe(0)",3000*pos[0]);
	}

//]]>



//<![CDATA[
	var coverhigh=1;
	var actionstatus=0;
	var demostarted=false;
    var demoFrames = {
        s5_front:[[1.125,0.68,1.7,1.15]],
        s5_back:[[5.0,0.68,5.5,1.15]],

        s10_front:[[1.125,0.68,1.7,1.15]],
        s10_back:[[5.0,0.68,5.5,1.15]],

        s20_front:[[1.125,0.68,1.55,1.15]],
        s20_back:[[5.0,0.68,5.5,1.15]],
        
        s50_front:[[1.125,0.68,1.6,1.15]],
        s50_back:[[5.0,0.68,5.5,1.15]],

        s100_front:[[1.125,0.68,1.7,1.15]],
        s100_back:[[4.9,0.68,5.4,1.15]],
  
        s200_front:[[1.125,0.68,1.7,1.15]],
        s200_back:[[5.025,0.68,5.6,1.15]],

        s500_front:[[1.125,0.68,1.7,1.15]],
        s500_back:[[5.225,0.68,5.775,1.15]]

    };
    
    var demoTurns = 0;
    var maxDemos = 3;
    var timer = [];
	(function($) {
		$(document).ready(function() {
                          setVideoLink();
                          setCoverIcon();
//			$(window).resize(reload);
//			$("#bill_uv_2").css("opacity",0);
			reload();
			$("#page_text p").html($._apptexte.get("feature.id.see_through_number","copy",selectedbill+"_"+serie));
			$("#page_title p").html($._apptexte.get("feature.id.see_through_number","headline",selectedbill+"_"+serie));
                          var t=$("#page_text");
                          while (t.height()>h/2) {
                          if (t.width()>w*0.6) break;
                          t.css("width",t.width()+40);
                          }
                          if(t.height() > h/2) {
                          t.css("height", "1.75em");
                          t.css("overflow", "auto");
                          }
                          t.css("top",(parseInt(t.css("top"))-t.height())*factor+"em");
                          
                          initButtons("#top_logo", "#page_top_video", "#page_top_help", "#page_info", "#page_top_back");
                          
                          demo();
            });
	})(jQuery);

	function reload() {
		var bview={"-1":"back","1":"front"};
		var sview={"1":"","2":"_neu"};
		$("#billprev").attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[-view]+".jpg");
		var i=$("#bill_uv");
		i.attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[view]+".jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
		var i=$("#bill_uv_2");
		i.attr("src","img/scheine/stn/"+selectedbill+sview[serie]+"_stn_"+bview[view]+".jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
        
        var df = demoFrames["s"+selectedbill+sview[serie]+"_"+bview[view]];
        $("#demoframes").empty();
        for(var frame in df) {
            var coords = df[frame];
            var x = coords[0];
            var y = coords[1];
            var w = coords[2]-x;
            var h = coords[3]-y;
            
            $("#demoframes").append('<div onclick=\'demo2();\' class="layer" title="" style="left:'+x+'em;top:'+y+'em;width:'+w+'em;height:'+h+'em;"></div>');
        }
        initButtons(".layer");
        
        $("#look-icon").click(demo);
	}
	function toggle_text() {
		var t=$("#page_text");


		t.toggleClass("visible");
		if (t.hasClass("visible")) $("#page_info").attr("src","img/info_high.png");
		else $("#page_info").attr("src","img/info_low.png");
	}
	function action(test) {
		if ((test==1)&&(demostarted)) return;
		if (actionstatus==0) {
			$("#bill_uv_2").fadeIn(1000,togglebutton);
			$("#bill").fadeOut(1000 );
			actionstatus=1;
			if (!demostarted) $("#page_power").attr("src","img/gluehbirne_high.png");
		} else {
			$("#bill_uv_2").fadeOut(1000,togglebutton);
			$("#bill").fadeIn(1000);
			actionstatus=0;
			if (!demostarted) $("#page_power").attr("src","img/gluehbirne_low.png");
		}
	}
	function togglebutton() {
//alert(demostarted+" . "+actionstatus);
		if (demostarted) {
			if (actionstatus==0) {
				$("#page_demo").attr("src","img/demo_low.png");
                demostarted=false;
                demoTurns++;
                if(demoTurns < maxDemos) demo();
			}
		}
	}
    
    function resetDemo() {
        
        demoTurns = 3;
        for(var i=0;i<timer.length;i++) {
            clearTimeout(timer[i]);
        }
        timer = [];
        demostarted = false;
        actionstatus = 0;
        $("#bill").fadeIn(10);
        $("#bill_uv_2").fadeOut(10);
        //$("#animation .p1").fadeIn(10);
        //$("#animation .p2").fadeOut(10);
        
        
        //$(".feature-bill").css("-webkit-transform", "translate(0em, 0em) scale(1) rotateX(0deg)");
        //$(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
    }
    
    function demo2() {
    	demo(true);
    }
    
	function demo(clicked) {
        if(clicked) {
            if(demostarted) {
                resetDemo();
                return;
            } else {
                demoTurns = 2;
            }
        }
		if (demostarted) return;
		demostarted=true;
		$("#page_demo").attr("src","img/demo_high.png");
		action(0);
		timer.push(window.setTimeout("action(0)",3000));

	}

//]]>







//<![CDATA[
	var h=0;
	var texte;
	var selectedbill=5;
	var w;var h;var view=1;var aspect=1;var factor=1;
	var scheine=new Array(5,10,20,50,100,200,500);
	var imgsizes={s5:[706,364],s10:[704,370],s20:[704,383],s50:[702,387],s100:[693,386],s200:[721,386],s500:[748,386],s5neu:[713,364]};
	var serie=2;
	var lang="en";
            
	(function($) {
		$(document).bind('deviceready', function() {
                         document.body.addEventListener("touchmove",function(e) {
                                                        if (e.target.parentNode.id!="page_text" && e.target.parentNode.id != "help_text1") {
                                                            e.preventDefault();
                                                        } else {
                                                        //console.log($("#page_text").prop("scrollTop"));
                                                        //console.log($("#page_text").prop("offsetHeight"));
                                                        //console.log($("#page_text").prop("scrollHeight"));
                                                        if(($('#page_text').prop("scrollTop")+$('#page_text').prop("offsetHeight"))>=$("#page_text").prop("scrollHeight")) {
                                                            //$("#page_text").prop("scrollTop", 270);
                                                        e.preventDefault();
                                                        }
                                                        }
                                                        },false);
            $(window).resize(resizefunc);
			h=$(window).height();
			$._apptexte.init();
			$._apptexte.read(lang);
			if (navigator.globalization) navigator.globalization.getLocaleName(
				function (locale) {lang=locale.value.substring(0,2);$._apptexte.read(lang);},
				function () {}
			);
			resizefunc();
			$("#content").load("start.html");
			preload_images();
		});
		$(document).ready(function() {
			//if(app) app.initialize();
            if(navigator.appCodeName == "Mozilla" && navigator.platform == "MacIntel") {
				$(document).trigger('deviceready');
			}
		});

	})(jQuery);
	var bilder=new Array();
	function preload_images() {
		for (var i=0;i<scheine.length;i++) {
			var imge1 = new Image();
			imge1.src = "img/scheine/"+scheine[i]+"_front.jpg";
			bilder.push(imge1);
			var imge2 = new Image();
			imge2.src = "img/scheine/"+scheine[i]+"_back.jpg";
			bilder.push(imge2);

		}
	}
	function resizefunc() {
		w=$(window).width();
		h=$(window).height();
        if(w==568) {h=300;w=568;}
        if(w==h) {h=300;}
		if ((w/h)>(960/600)) {
			$('body').css("font-size",parseInt(h/600*160)+"px");
			factor=600/h/160;
			aspect=2;
		} else {
			$('body').css("font-size",parseInt(w/960*160)+"px");
			factor=960/w/160;
			aspect=1;
            aspect = 2; // bugfix iPhone EMN?
		}
	}

            function setVideoLink() {
                $("#videolink").attr("href", "#");
                $("#videolink").attr("rel", $._apptexte.get("data", "videolinkurl"));
                $("#videolink").bind("click", function() {
                                url = $(this).attr("rel");
                                loadURL(url);
                                     return false;
                                });
                
                
            }
            
            function loadURL(url){
                //debug(url);
                window.open(url, "_system");
                //navigator.app.loadUrl(url, { openExternal:true });
                return false;
            }
            
            function setCoverIcon() {
                //debug("laber2");
                var img = $("#page_top_back");
                img.attr("src", "img/btn_"+selectedbill+"_es"+serie+"_back.png");
                
            }
            
            
            function debug(s) {
                $("#debug").text(s);
            }
            
            function initButtons() {
                for(var i=0;i<arguments.length;i++) {
                    var b = $(arguments[i]);
                    
                    b.bind('touchstart', function() { $(this).addClass("touched");});
                    b.bind('touchend', function() { $(this).removeClass("touched");});
                }
            }


//]]>
        


//<![CDATA[
	(function($) {
     var counter = 0;
		$(document).ready(function() {
                          $("#start1_text").text($._apptexte.get("data", "button.id.click_to_continue"));
                          $("#start2_text").text($._apptexte.get("data", "button.id.start_check"));
			$("#startbubble_text").html($._apptexte.get("textpanel.id.introduction","copy.id.1"));
			$("#start1").click(function(e) {

				$("#start2").show();
				$("#startbubble").show();
				$("#start1").hide();
                               var s = $("#start2_text");
                               var sp = $("#start2");
                               counter = 0;
                               while(s.height() > 20 && counter++ < 5) {
                                sp.css("width", sp.width()+5);
                               }
                               sp.css("width", sp.width()+50);
                               s.css("width", sp.width());
                               $("#start2 img").css("width", sp.width());

			});
			$("#start2_text").click(function(e) {
				$("#content").load("cover.html");
			});
                          
                          var s = $("#start1_text");
                          var sp = $("#start1");
                          counter = 0;
                          
                          while(s.height() > 20 && counter++ < 5) {
                            sp.css("width", sp.width()+5);
                          }
                          sp.css("width", sp.width()+50);
                          s.css("width", sp.width());
                          $("#start1 img").css("width", sp.width());
                          
            $("#ecb-logo").attr("src", "img/logos/ecblogo-new_"+lang.toUpperCase()+"_2c.png");
                          
                          		});
     initButtons("#start1", "#start2");
	})(jQuery);
//]]>



//<![CDATA[
	var coverhigh=1;
	var actionstatus=0;
	var demostarted=false;
	var actimg="#bill";
    var demoFrames = {
        s50_back:[[4.65,2.5,5.4,3.0]],
        
        s100_back:[[4.6,2.5,5.4,3.0]],
        
        s200_back:[[4.65,2.5,5.6,3.0]],
        
        s500_back:[[4.8,2.5,5.8,3.0]]
    };

	var holosizes={s5:[48,364,5.12,0.66],s10:[66,370,5.05,0.66],s20:[86,383,4.98,0.66],s50:[87,62,4.79,2.56],s100:[113,58,4.64,2.595],s200:[121,59,4.8,2.588],s500:[125,59,4.945,2.565],s5_neu:[48,364,5.07,0.66]};
    var demoTurns = 0;
    var maxDemos = 3;
    var timer = [];
	(function($) {
		$(document).ready(function() {
                          setVideoLink();
                          setCoverIcon();
//			$(window).resize(reload);
//			$("#bill_uv_2").css("opacity",0);
			reload();
			$("#page_text p").html($._apptexte.get("feature.id.colour_changing_number","copy",selectedbill+"_"+serie));
			$("#page_title p").html($._apptexte.get("feature.id.colour_changing_number","headline",selectedbill+"_"+serie));
                          var t=$("#page_text");
                          while (t.height()>h/2) {
                          if (t.width()>w*0.6) break;
                          t.css("width",t.width()+40);
                          }
                          if(t.height() > h/2) {
                          t.css("height", "1.75em");
                          t.css("overflow", "auto");
                          }
                          t.css("top",(parseInt(t.css("top"))-t.height())*factor+"em");
                          
                          startWatch();
                          
                          // transform 3d
                          var bill = $(".feature-bill");
                          bill.css("transform-origin", "3em 2em");
                          bill.css("transition-duration", "1s");
                          bill.css("transition-property", "transform");
                          
                          $("#billcontainer").css("-webkit-perspective", "200");
                          $("#billcontainer").css("-webkit-perspective-origin", "3em 2em");
                          bill.css("-webkit-transition-duration", "1s");
                          bill.css("-webkit-transition-property", "-webkit-transform");
                          
                          initButtons("#top_logo", "#page_top_video", "#page_top_help", "#page_info", "#page_top_back");
                          
                          demo();
            });
	})(jQuery);

	function reload() {
		var bview={"-1":"back","1":"front"};
		var sview={"1":"","2":"_neu"};
		var i=$("#bill_uv");
//i.hide();
		i.attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[view]+".jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
		var i=$("#bill_uv_2");
//i.show();
		i.attr("src","img/scheine/ccn/"+selectedbill+sview[serie]+"_ccn_gr.png");
		if (aspect==1) i.css("width",holosizes["s"+selectedbill+sview[serie]][0]/158+"em");
		if (aspect==2) i.css("height",holosizes["s"+selectedbill+sview[serie]][1]/158+"em");
		i.css("left",holosizes["s"+selectedbill+sview[serie]][2]+"em");
		i.css("top",holosizes["s"+selectedbill+sview[serie]][3]+"em");
        

        var df = demoFrames["s"+selectedbill+sview[serie]+"_"+bview[view]];
        $("#demoframes").empty();
        for(var frame in df) {
            var coords = df[frame];
            var x = coords[0];
            var y = coords[1];
            var w = coords[2]-x;
            var h = coords[3]-y;
            
            $("#demoframes").append('<div onclick=\'demo2();\' class="layer" title="" style="left:'+x+'em;top:'+y+'em;width:'+w+'em;height:'+h+'em;"></div>');
        }
        initButtons(".layer");
        
        $("#animation").click(demo);
        $("#animation .p2").hide();
	}
	function toggle_text() {
		var t=$("#page_text");


		t.toggleClass("visible");
		if (t.hasClass("visible")) $("#page_info").attr("src","img/info_high.png");
		else $("#page_info").attr("src","img/info_low.png");
	}
	function action(test) {
		if ((test==1)&&(demostarted)) return;
		if (actionstatus==0) {
			$("#bill_uv_2").fadeIn(1000,togglebutton);
			$("#bill").fadeOut(1000 );
            $("#animation .p2").fadeIn(1000);
            $("#animation .p1").fadeOut(1000);
            
            $(".feature-bill").css("-webkit-transform", "translate(.175em, .125em) scale(.95) rotateX(5deg)");
            $(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,-0.0005,0,0,1,0,0,0,0,1)");
			actionstatus=1;
			if (!demostarted) $("#page_power").attr("src","img/on_off_high.png");
		} else {
			$("#bill_uv_2").fadeOut(1000,togglebutton);
			$("#bill").fadeIn(1000);
            $("#animation .p2").fadeOut(1000);
            $("#animation .p1").fadeIn(1000);
            
            $(".feature-bill").css("-webkit-transform", "translate(0em, 0em) scale(1) rotateX(0deg)");
            $(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
			actionstatus=0;
			if (!demostarted) $("#page_power").attr("src","img/on_off_low.png");
		}
	}
	function togglebutton() {
//alert(demostarted+" . "+actionstatus);
		if (demostarted) {
			if (actionstatus==0) {
				$("#page_demo").attr("src","img/demo_low.png");
				demostarted=false;
                demoTurns++;
                if(demoTurns < maxDemos) demo(); else startWatch();
			}
		}
	}
    
    function resetDemo() {
        
        demoTurns = 3;
        for(var i=0;i<timer.length;i++) {
            clearTimeout(timer[i]);
        }
        timer = [];
        demostarted = false;
        actionstatus = 0;
        
        $("#bill").fadeIn(10);
        $("#bill_uv_2").fadeOut(10, startWatch);
        $("#animation .p1").fadeIn(10);
        $("#animation .p2").fadeOut(10);
        
        
        $(".feature-bill").css("-webkit-transform", "translate(0em, 0em) scale(1) rotateX(0deg)");
        $(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
    }
    
    function demo2() {
    	demo(true);
    }
    
	function demo(clicked) {
        if(clicked) {
            if(demostarted) {
                resetDemo();
                return;
            } else {
                demoTurns = 2;
            }        }
		if (demostarted) return;
        
        stopWatch();
		demostarted=true;
		$("#page_demo").attr("src","img/demo_high.png");
		action(0);
		timer.push(window.setTimeout("action(0)",3000));

	}
    
    var startAcc = null;
    function onAcc(acc) {
        //debug(acc.x+":"+acc.y+":"+acc.z);
        if(startAcc == null) startAcc = acc;
        var dx = startAcc.x-acc.x;
        dx = Math.abs(dx);
        if(dx > 2.75) dx = 2.75;
        
        var proz = dx / 2.75;
        
        $("#bill_uv_2").css("opacity", proz);
        //debug(proz);
        //console.log(proz);
    }
    
    function onAccErr() {
        //alert("accerr");
    }
    
    var accID;
    function startWatch() {
        $("#bill_uv_2").css("opacity", 0);
        $("#bill_uv_2").show();
        var options = { frequency: 200 };
        
        if(navigator.accelerometer) accID = navigator.accelerometer.watchAcceleration(onAcc, onAccErr, options);
        
    }
    
    function stopWatch() {
        startAcc = null;
        if(navigator.accelerometer) if(accID != null) navigator.accelerometer.clearWatch(accID);
        accID = null;
        $("#bill_uv_2").hide();
        $("#bill_uv_2").css("opacity", 1);
    }

//]]>



//<![CDATA[
	var coverhigh=1;
	var actlupe="";
	var demostarted=false;
    var demoFrames = {
        s5_neu_front:[[1.12,0.66,1.3,2.95], [5.35,0.66,5.6,2.95], [2.7,0.7,3.3,1.6], [3.4,1.0,4.9,2.8]],
        
        s5_front:[[2.2,.7,5.0,1.75], [3.4,1.775,4.9,2.8]],
 
        s10_front:[[2.25,.7,5.0,1.55], [3.4,1.575,4.9,2.8]],
       
        s20_front:[[2.15,.7,5.0,1.55], [3.4,1.575,4.95,2.9]],
       
        s50_front:[[2.15,.7,5.0,1.55], [3.4,1.575,4.8,2.85]],
       
        s100_front:[[2.25,.7,5.1,1.37], [3.3,1.4,4.7,2.95]],
       
        s200_front:[[2.25,.7,5.2,1.37], [3.4,1.4,4.9,2.925], [4.95,2.7,5.55,3.0]],
       
        s500_front:[[2.25,.7,5.4,1.37], [3.3,1.4,5.0,2.9], [5.5,0.66,5.7,3.05]]
    };
	var mpos={
		s5_neu:[0.86,0.75,0.86,2.85, 2.26,0.8,3.15,0.8, 3.1,1.0,4.6,1.0, 5.2,0.69,5.2,2.84],
		s5:[1.84,0.7,3.64,0.7, 2.32,0.92,4.78,0.92, 3.07,1.85,4.54,1.85],
		s10:[1.84,0.7,3.64,0.7, 2.32,0.92,4.78,0.92, 3.07,1.85,4.54,1.85],
		s20:[1.84,0.7,3.64,0.7, 2.32,0.92,4.78,0.92, 3.07,1.85,4.54,1.85],
		s50:[1.84,0.7,3.64,0.7, 2.32,0.92,4.78,0.92, 3.07,1.85,4.54,1.85],
		s100:[1.84,0.7,3.64,0.7, 2.32,0.92,4.78,0.92, 3.07,1.85,4.54,1.85],
		s200:[1.84,0.7,3.64,0.7, 2.32,0.87,4.78,0.87, 3.07,1.85,4.54,1.85, 4.4, 2.85, 5.35, 2.85],
		s500:[1.84,0.7,3.64,0.7, 2.32,0.93,4.78,0.93, 3.07,1.85,4.54,1.85, 5.3, 0.85, 5.3, 3.05]
	};
	var bview={"-1":"back","1":"front"};
	var sview={"1":"","2":"_neu"};
    var timer = [];
	(function($) {
		$(document).ready(function() {
                          setVideoLink();
                        setCoverIcon();
			reload();
			$("#page_text p").html($._apptexte.get("feature.id.raised_print","copy",selectedbill+"_"+serie));
			$("#page_title p").html($._apptexte.get("feature.id.raised_print","headline",selectedbill+"_"+serie));
                          var t=$("#page_text");
                          while (t.height()>h/2) {
                            if (t.width()>w*0.6) break;
                            t.css("width",t.width()+40);
                          }
                          if(t.height() > h/2) {
                          t.css("height", "1.75em");
                          t.css("overflow", "auto");
                          }
                          t.css("top",(parseInt(t.css("top"))-t.height())*factor+"em");
                          
                          initButtons("#top_logo", "#page_top_video", "#page_top_help", "#page_info", "#page_top_back");
                          
                          demo();
            });
	})(jQuery);
	function toggle_text() {
		var t=$("#page_text");


		t.toggleClass("visible");
		if (t.hasClass("visible")) $("#page_info").attr("src","img/info_high.png");
		else $("#page_info").attr("src","img/info_low.png");
	}
	function reload() {

		$("#billprev").attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[-view]+".jpg");
		var i=$("#bill_uv");
		i.attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[view]+".jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
        
        var df = demoFrames["s"+selectedbill+sview[serie]+"_"+bview[view]];
        $("#demoframes").empty();
        for(var frame in df) {
            var coords = df[frame];
            var x = coords[0];
            var y = coords[1];
            var w = coords[2]-x;
            var h = coords[3]-y;
            
            $("#demoframes").append('<div onclick=\'demo();\' class="layer" title="" style="left:'+x+'em;top:'+y+'em;width:'+w+'em;height:'+h+'em;"></div>');
        }
        initButtons(".layer");
        
        $("body").bind('touchmove', function(e) {
                              //navigator.notification.vibrate(1000);
                                  var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                    //console.log(touch.pageX + ":" + touch.pageY + ":" + $(e.target).attr("id"));
                       var tx = touch.pageX;
                       var ty = touch.pageY;
                                    $(".layer").each(function() {
                                                                 var d = $(this);
                                                    // console.log(d.position().left);

                                                                 var x1 = d.position().left;
                                                                 var y1 = d.position().top;
                                                                 var x2 = d.width()+x1;
                                                                 var y2 = d.height()+y1;
                                                                 
                                                     if((tx >= x1 && tx <= x2 && ty <= y2 && ty >= y1)) {
                                                     
                                                     navigator.notification.vibrate(20);
                                                     }

                                                            });
                                                              });
	}
	function demo(nr) {
        if(arguments.callee.caller.name == "onclick") {
            if(demostarted) {
                //
            }
        
        }
        if(demostarted) return;
        
        demostarted = true;
		$("#page_demo").attr("src","img/demo_high.png");
		var pos=mpos["s"+selectedbill+sview[serie]];
		var p=pos.length;
		t=0;
		for (var i=0;i<p;i+=4) {
			timer.push(window.setTimeout("action("+i+")",2000*(i/4)));
		}
	}
	function action(nr) {
		
        if(navigator.notification) navigator.notification.vibrate(1750);
		var pos=mpos["s"+selectedbill+sview[serie]];
//alert("actrion"+nr+","+(pos[nr*4]));
		$("#finger").css("left",pos[nr]+"em").css("top",pos[nr+1]+"em");
		$("#finger").show();
		$("#finger").animate({"left":pos[nr+2]+"em","top":pos[nr+3]+"em"},1750,function() {
			$("#finger").hide();
			if (nr==pos.length-4) $("#page_demo").attr("src","img/demo_low.png");
		});


	}
    
    function exit() {
        $("body").unbind('touchmove');
        for(var i=0;i<timer.length;i++) {
            clearTimeout(timer[i]);
        }
        timer = [];
    }

//]]>



//<![CDATA[
	var coverhigh=1;
	var actionstatus=0;
	var demostarted=false;
    var demoFrames = {
        s5_neu_front:[[1.12,.66,5.6,2.95]],
        s5_neu_back:[[1.12,.66,5.6,2.95]],
        s5_front:[[1.12,.66,5.55,2.95]],
        s5_back:[[1.12,.66,5.55,2.95]],
        s10_front:[[1.12,.66,5.55,3.0]],
        s10_back:[[1.12,.66,5.55,3.0]],
        s20_front:[[1.12,.66,5.55,3.1]],
        s20_back:[[1.12,.66,5.55,3.1]],
        s50_front:[[1.12,.66,5.55,3.1]],
        s50_back:[[1.12,.66,5.55,3.1]],
        s100_front:[[1.12,.66,5.5,3.1]],
        s100_back:[[1.12,.66,5.5,3.1]],
        s200_front:[[1.12,.66,5.65,3.1]],
        s200_back:[[1.12,.66,5.65,3.1]],
        s500_front:[[1.12,.66,5.85,3.1]],
        s500_back:[[1.12,.66,5.85,3.1]]
    };
    
    var copyfront, copyback;
    var pageTextY;
    
    var demoTurns = 0;
    var maxDemos = 3;
    var timer = [];
	(function($) {
		$(document).ready(function() {
                          setVideoLink();
                          setCoverIcon();
//			$(window).resize(reload);
//			$("#bill_uv_2").css("opacity",0);
			
            copyfront = $._apptexte.get("feature.id.uv_light","copy",selectedbill+"_"+serie);
            copyback = $._apptexte.get("feature.id.uv_light","copyback",selectedbill+"_"+serie);
			//$("#page_text p").html(copyfront);
			$("#page_title p").html($._apptexte.get("feature.id.uv_light","headline",selectedbill+"_"+serie));
                         reload();
                          
                          initButtons("#top_logo", "#page_top_video", "#page_top_help", "#page_info", "#page_top_back");
                          demo();
            });
     
	})(jQuery);

	function reload() {
		var bview={"-1":"back","1":"front"};
		var sview={"1":"","2":"_neu"};
		$("#billprev").attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[-view]+".jpg");
		var i=$("#bill_uv");
		i.attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[view]+".jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
		var i=$("#bill_uv_2");
		i.attr("src","img/scheine/uv/"+selectedbill+sview[serie]+"_uv_"+bview[view]+".jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
        
        var df = demoFrames["s"+selectedbill+sview[serie]+"_"+bview[view]];
        $("#demoframes").empty();
        for(var frame in df) {
            var coords = df[frame];
            var x = coords[0];
            var y = coords[1];
            var w = coords[2]-x;
            var h = coords[3]-y;
            
            $("#demoframes").append('<div onclick=\'demo2();\' class="layer" title="" style="left:'+x+'em;top:'+y+'em;width:'+w+'em;height:'+h+'em;"></div>');
        }
        initButtons(".layer");
        initTextBox();
	}
    
    function initTextBox() {
        var t=$("#page_text");
        if(view == 1) $("p", t).html(copyfront); else $("p", t).html(copyback);
        if(pageTextY == null) pageTextY = t.css("top");
        t.css("overflow", "visible");
        t.css("height", "auto");
        while (t.height()>h/2) {
            if (t.width()>w*0.6) break;
            t.css("width",t.width()+40);
        }
        if(t.height() > h/2) {
            t.css("height", "1.75em");
            t.css("overflow", "auto");
        }
                t.css("top",(parseInt(pageTextY)-t.height())*factor+"em");
    }
    
	function toggle_text() {
		var t=$("#page_text");


		t.toggleClass("visible");
		if (t.hasClass("visible")) $("#page_info").attr("src","img/info_high.png");
		else $("#page_info").attr("src","img/info_low.png");
	}
    
	function action(test) {
		if ((test==1)&&(demostarted)) return;
		if (actionstatus==0) {
			$("#bill_uv_2").fadeIn(1000,togglebutton);
			$("#bill").fadeOut(1000 );
			actionstatus=1;
			if (!demostarted) $("#page_power").attr("src","img/on_off_high.png");
		} else {
			$("#bill_uv_2").fadeOut(1000,togglebutton);
			$("#bill").fadeIn(1000);
			actionstatus=0;
			if (!demostarted) $("#page_power").attr("src","img/on_off_low.png");
		}
	}
	function togglebutton() {
//alert(demostarted+" . "+actionstatus);
		if (demostarted) {
			if (actionstatus==0) {
				$("#page_demo").attr("src","img/demo_low.png");
				demostarted=false;
                demoTurns++;
                if(demoTurns < maxDemos) demo();
			}
		}
	}
    
    function resetDemo() {
        
        demoTurns = 3;
        for(var i=0;i<timer.length;i++) {
            clearTimeout(timer[i]);
        }
        timer = [];
        demostarted = false;
        actionstatus = 0;
        $("#bill").fadeIn(10);
        $("#bill_uv_2").fadeOut(10);
        //$("#animation .p1").fadeIn(10);
        //$("#animation .p2").fadeOut(10);
        
        
        //$(".feature-bill").css("-webkit-transform", "translate(0em, 0em) scale(1) rotateX(0deg)");
        //$(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
    }
    
    function demo2() {
    	demo(true);
    }
    
	function demo(clicked) {
        if(clicked) {
            if(demostarted) {
                resetDemo();
                return;
            } else {
                demoTurns = 2;
            }
        }
		if (demostarted) return;
		demostarted=true;
		$("#page_demo").attr("src","img/demo_high.png");
		action(0);
		timer.push(window.setTimeout("action(0)",3000));

	}

//]]>



//<![CDATA[
	var coverhigh=1;
	var actionstatus=0;
	var demostarted=false;
    var demoFrames = {
        s5_neu_front:[[1.7,1.0,3.1,2.8]]
    };
	var holosizes={s5:[48,364,5.12,0.66],s10:[66,370,5.05,0.66],s20:[86,383,4.98,0.66],s50:[79,87,4.9,1.97],s100:[82,87,4.86,2.07],s200:[77,91,5.04,2.01],s500:[98,86,5.1,1.99],s5_neu:[48,364,5.07,0.66]};
    
    var demoTurns = 0;
    var maxDemos = 3;
    var timer = [];
	(function($) {
		$(document).ready(function() {
                          setVideoLink();
                          setCoverIcon();
			$('html').mousemove(function(e) {
				var p=$("#thepage").offset();
				var x=(e.pageX-p.left)*600/h/160;
				var y=(e.pageY-p.top)*600/h/160;
//				$("#gf_log").html(x+"em, "+y+"em, "+p.left+":"+e.pageX+", "+e.pageY);
			});
//			$(window).resize(reload);
//			$("#bill_uv_2").css("opacity",0);
			reload();
			$("#page_text p").html($._apptexte.get("feature.id.emerald_number","copy",selectedbill+"_"+serie));
			$("#page_title p").html($._apptexte.get("feature.id.emerald_number","headline",selectedbill+"_"+serie));
                          var t=$("#page_text");
                          while (t.height()>h/2) {
                          if (t.width()>w*0.6) break;
                          t.css("width",t.width()+40);
                          }
                          if(t.height() > h/2) {
                          t.css("height", "1.75em");
                          t.css("overflow", "auto");
                          }
                          t.css("top",(parseInt(t.css("top"))-t.height())*factor+"em");
                          
                          
                          startWatch();
                          
                          // transform 3d
                          var bill = $(".feature-bill");
                          bill.css("transform-origin", "3em 2em");
                          bill.css("transition-duration", "1s");
                          bill.css("transition-property", "transform");
                          
                          $("#billcontainer").css("-webkit-perspective", "200");
                          $("#billcontainer").css("-webkit-perspective-origin", "2em 2em");
                          bill.css("-webkit-transition-duration", "1s");
                          bill.css("-webkit-transition-property", "-webkit-transform");
                          
                          initButtons("#top_logo", "#page_top_video", "#page_top_help", "#page_info", "#page_top_back");
                          
                          demo();
            });
	})(jQuery);

	function reload() {
		var bview={"-1":"back","1":"front"};
		var sview={"1":"","2":"_neu"};
		var i=$("#bill_uv");
		i.attr("src","img/scheine/emn/"+selectedbill+sview[serie]+"_emn_1.jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
        
		var i=$("#bill_uv_2");
		i.attr("src","img/scheine/emn/"+selectedbill+sview[serie]+"_emn_2.jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");

        
        var df = demoFrames["s"+selectedbill+sview[serie]+"_"+bview[view]];
        $("#demoframes").empty();
        for(var frame in df) {
            var coords = df[frame];
            var x = coords[0];
            var y = coords[1];
            var w = coords[2]-x;
            var h = coords[3]-y;
            
            $("#demoframes").append('<div onclick=\'demo2();\' class="layer" title="" style="left:'+x+'em;top:'+y+'em;width:'+w+'em;height:'+h+'em;"></div>');
        }
        initButtons(".layer");
        
        $("#animation").click(demo);
        $("#animation .p2").hide();
	}
	function toggle_text() {
		var t=$("#page_text");


		t.toggleClass("visible");
		if (t.hasClass("visible")) $("#page_info").attr("src","img/info_high.png");
		else $("#page_info").attr("src","img/info_low.png");
	}
	function action(test) {
		if ((test==1)&&(demostarted)) return;
		if (actionstatus==0) {
			$("#bill_uv_2").fadeIn(1000,togglebutton);
			$("#bill").fadeOut(1000 );
            $("#animation .p2").fadeIn(1000);
            $("#animation .p1").fadeOut(1000);
            
            $(".feature-bill").css("-webkit-transform", "translate(.11em, .125em) scale(.95) rotateX(5deg)");
            $(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,-0.0005,0,0,1,0,0,0,0,1)");
			actionstatus=1;
			if (!demostarted) $("#page_power").attr("src","img/on_off_high.png");
		} else {
			$("#bill_uv_2").fadeOut(1000,togglebutton);
			$("#bill").fadeIn(1000);
            $("#animation .p2").fadeOut(1000);
            $("#animation .p1").fadeIn(1000);
            
            $(".feature-bill").css("-webkit-transform", "translate(0em, 0em) scale(1) rotateX(0deg)");
            $(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
			actionstatus=0;
			if (!demostarted) $("#page_power").attr("src","img/on_off_low.png");
		}
	}
    
	function togglebutton() {
//alert(demostarted+" . "+actionstatus);
		if (demostarted) {
			if (actionstatus==0) {
				$("#page_demo").attr("src","img/demo_low.png");
				demostarted=false;
                demoTurns++;
                if(demoTurns < maxDemos) demo(); else startWatch();
			}
		}
	}
    
    function resetDemo() {
        
        demoTurns = 3;
        for(var i=0;i<timer.length;i++) {
            clearTimeout(timer[i]);
        }
        timer = [];
        demostarted = false;
        actionstatus = 0;
        $("#bill").fadeIn(10);
        $("#bill_uv_2").fadeOut(10, startWatch);
        $("#animation .p1").fadeIn(10);
        $("#animation .p2").fadeOut(10);
        
        $(".feature-bill").css("-webkit-transform", "translate(0em, 0em) scale(1) rotateX(0deg)");
        $(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
    }
    
    function demo2() {
    	demo(true);
    }
    
	function demo(clicked) {
        if(clicked) {
            if(demostarted) {
                resetDemo();
                return;
            } else {
                demoTurns = 2;
            }
        }
		if (demostarted) return;
        stopWatch();
		demostarted=true;
		$("#page_demo").attr("src","img/demo_high.png");
		action(0);
		timer.push(window.setTimeout("action(0)",3000));

	}
    
    var startAcc = null;
    function onAcc(acc) {
        //debug(acc.x+":"+acc.y+":"+acc.z);
        if(startAcc == null) startAcc = acc;
        var dx = startAcc.x-acc.x;
        dx = Math.abs(dx);
        if(dx > 2.75) dx = 2.75;
        
        var proz = dx / 2.75;
        
        $("#bill_uv_2").css("opacity", proz);
        //debug(proz);
        //console.log(proz);
    }
    
    function onAccErr() {
        //alert("accerr");
    }
    
    var accID;
    function startWatch() {
        $("#bill_uv_2").css("opacity", 0);
        $("#bill_uv_2").show();
        var options = { frequency: 200 };
        
        if(navigator.accelerometer) accID = navigator.accelerometer.watchAcceleration(onAcc, onAccErr, options);
        
    }
    
    function stopWatch() {
        startAcc = null;
        if(navigator.accelerometer) if(accID != null) navigator.accelerometer.clearWatch(accID);
        accID = null;
        $("#bill_uv_2").hide();
        $("#bill_uv_2").css("opacity", 1);
    }

//]]>



//<![CDATA[
	var coverhigh=1;
	var actionstatus=0;
	var demostarted=false;
    var demoFrames = {
        s5_back:[[2.85,0.66,3.3,2.95]],
        
        s10_back:[[2.8,0.66,3.25,2.975]],
        
        s20_back:[[2.8,0.66,3.25,3.05]]
    };
	var actimg="#bill";
    
    var demoTurns = 0;
    var maxDemos = 3;
    var timer = [];
	(function($) {
		$(document).ready(function() {
                          setVideoLink();
                          setCoverIcon();
//			$(window).resize(reload);
//			$("#bill_uv_2").css("opacity",0);
			reload();
			$("#page_text p").html($._apptexte.get("feature.id.glossy_stripe","copy",selectedbill+"_"+serie));
			$("#page_title p").html($._apptexte.get("feature.id.glossy_stripe","headline",selectedbill+"_"+serie));
			var t=$("#page_text");
                          while(t.height() > h/2) {
                          if(t.width() > w*.6) break;
                          t.css("width", t.width()+40);
                          }
                          if(t.height() > h/2) {
                          t.css("height", "1.75em");
                          t.css("overflow", "auto");
                          }
			t.css("top",(parseInt(t.css("top"))-t.height())*factor+"em");
                          
                          startWatch();
                          
                          // transform 3d
                          var bill = $(".feature-bill");
                          bill.css("transform-origin", "3em 2em");
                          bill.css("transition-duration", "1s");
                          bill.css("transition-property", "transform");
                          
                          $("#billcontainer").css("-webkit-perspective", "200");
                          $("#billcontainer").css("-webkit-perspective-origin", "3em 2em");
                          bill.css("-webkit-transition-duration", "1s");
                          bill.css("-webkit-transition-property", "-webkit-transform");
                          
                          initButtons("#top_logo", "#page_top_video", "#page_top_help", "#page_info", "#page_top_back");
                          
                          demo();
            });
	})(jQuery);

	function reload() {
		var bview={"-1":"back","1":"front"};
		var sview={"1":"","2":"_neu"};
		var i=$("#bill_uv");
		i.attr("src","img/scheine/"+selectedbill+sview[serie]+"_"+bview[view]+".jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
		var i=$("#bill_uv_2");
		i.attr("src","img/scheine/gs/"+selectedbill+sview[serie]+"_gs_gold.jpg");
		if (aspect==1) i.css("width",imgsizes["s"+selectedbill][0]/158+"em");
		if (aspect==2) i.css("height",imgsizes["s"+selectedbill][1]/158+"em");
        
        var df = demoFrames["s"+selectedbill+sview[serie]+"_"+bview[view]];
        $("#demoframes").empty();
        for(var frame in df) {
            var coords = df[frame];
            var x = coords[0];
            var y = coords[1];
            var w = coords[2]-x;
            var h = coords[3]-y;
            
            $("#demoframes").append('<div onclick=\'demo2();\' class="layer" title="" style="left:'+x+'em;top:'+y+'em;width:'+w+'em;height:'+h+'em;"></div>');
        }
        
        initButtons(".layer");
        $("#animation").click(demo);
        $("#animation .p2").hide();
	}
	function toggle_text() {
		var t=$("#page_text");


		t.toggleClass("visible");
		if (t.hasClass("visible")) $("#page_info").attr("src","img/info_high.png");
		else $("#page_info").attr("src","img/info_low.png");
	}
	function action(test) {
		if ((test==1)&&(demostarted)) return;
		if (actionstatus==0) {
			$("#bill_uv_2").fadeIn(1000,togglebutton);
			$("#bill").fadeOut(1000 );
            $("#animation .p2").fadeIn(1000);
            $("#animation .p1").fadeOut(1000);
            
            $(".feature-bill").css("-webkit-transform", "translate(.175em, .125em) scale(.95) rotateX(5deg)");
            $(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,-0.0005,0,0,1,0,0,0,0,1)");
			actionstatus=1;
			if (!demostarted) $("#page_power").attr("src","img/on_off_high.png");
		} else {
			$("#bill_uv_2").fadeOut(1000,togglebutton);
			$("#bill").fadeIn(1000);
            $("#animation .p2").fadeOut(1000);
            $("#animation .p1").fadeIn(1000);
            
            $(".feature-bill").css("-webkit-transform", "translate(0em, 0em) scale(1) rotateX(0deg)");
            $(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
			actionstatus=0;
			if (!demostarted) $("#page_power").attr("src","img/on_off_low.png");
            
		}
	}

	function setbutton(btn) {
		var bts={"1":"sonne","2":"mond"};
		var sts={"0":"low","1":"high"};
		if (!demostarted) {
			$("#page_power"+btn).attr("src","img/"+bts[btn]+"_"+sts[actionstatus]+".png");
		}
	}
	function togglebutton() {
        //console.log("toggleb");
		if (demostarted) {
			if (actionstatus==0) {
				$("#page_demo").attr("src","img/demo_low.png");
				demostarted=false;
                demoTurns++;
                if(demoTurns < maxDemos) demo(); else startWatch();
			}
		}
	}
    
    function resetDemo() {
        
        demoTurns = 3;
        for(var i=0;i<timer.length;i++) {
            clearTimeout(timer[i]);
        }
        timer = [];
        demostarted = false;
        actionstatus = 0;
        $("#bill").fadeIn(10);
        $("#bill_uv_2").fadeOut(10, startWatch);
        $("#animation .p1").fadeIn(10);
        $("#animation .p2").fadeOut(10);
        
        
        $(".feature-bill").css("-webkit-transform", "translate(0em, 0em) scale(1) rotateX(0deg)");
        $(".feature-bill").css("transform", "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
    }
    
    function demo2() {
    	demo(true);
    }
    
	function demo(clicked) {
        if(clicked) {
            if(demostarted) {
                resetDemo();
                return;
            } else {
                demoTurns = 2;
            }
        }
		if (demostarted) return;
        stopWatch();
		demostarted=true;
		$("#page_demo").attr("src","img/demo_high.png");
		action(0);
		timer.push(window.setTimeout("action(0)",3000));

	}
    
    var startAcc = null;
    function onAcc(acc) {
        //debug(acc.x+":"+acc.y+":"+acc.z);
        if(startAcc == null) startAcc = acc;
        var dx = startAcc.x-acc.x;
        dx = Math.abs(dx);
        if(dx > 2.75) dx = 2.75;
        
        var proz = dx / 2.75;
        
        $("#bill_uv_2").css("opacity", proz);
        //debug(proz);
        //console.log(proz);
    }
    
    function onAccErr() {
        //alert("accerr");
    }
    
    var accID;
    function startWatch() {
        //console.log("startWatch");
        $("#bill_uv_2").css("opacity", 0);
        $("#bill_uv_2").show();
        var options = { frequency: 200 };
        
        if(navigator.accelerometer) accID = navigator.accelerometer.watchAcceleration(onAcc, onAccErr, options);
        
    }
    
    function stopWatch() {
        startAcc = null;
        if(navigator.accelerometer) if(accID != null) navigator.accelerometer.clearWatch(accID);
        accID = null;
        $("#bill_uv_2").hide();
        $("#bill_uv_2").css("opacity", 1);
    }

//]]>


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


/*
  This file includes features used in differents examples :
  - previous, next and autorun buttons 
  - img click focusing function
  - mousewheel managing 
*/
$(function(){

  $("body").append(
    '<div id="buttons">'+
      '<button id="previous">previous</button>'+
      '<button id="next">next</button>'+
      '<br /><br />'+
      '<input type="checkbox" id="autorun"><label for="autorun">Autorun</label>'+
    '</div>'
  );
  
  var $cover = $("#coverflow");



  $("#next").click(function(){
    $("#autorun").attr('checked', false);
    $cover.flow('next');
  });
  
  $("#previous").click(function(){
    $("#autorun").attr('checked', false);
    $cover.flow('previous');
  });
  
  $("#coverflow img").each(function(index){
    $(this).click(function(){
      $cover.flow(index);
    });
  });
  
  var id;
  
  $("#autorun").change(function(){
    if ($(this).is(':checked')){
      $cover.bind("run_end.flow", function(event, complete){
        if (complete){
          id = setTimeout(
            function(){
              if ($("#autorun").is(':checked')){
                $cover.flow('next');
              }
            }, 50);
        }
      });
      $cover.flow('next');
    } else {
      $cover.unbind("run_end.flow");
      clearTimeout(id);
    }
  });
  
});


(function($) {
	$._apptexte = {
		init: function() {
			$._apptexte.texte=null;
		},		
		read: function(lang) {
			var test=false;
			$.ajaxSetup({ async: false });
            //alert(lang);
			$.get("xml/lang.mobile."+lang+".xml",null, function(data,textStatus,jqXHR) {
				$._apptexte.texte=data;
				test=true;
				},"xml");
			if (!test) {
			$.get("xml/lang.mobile.en.xml",null, function(data,textStatus,jqXHR) {
				$._apptexte.texte=data;
				test=true;
				},"xml");

			}
			$.ajaxSetup({ async: true });
		},
		get: function (main,sub,bill) {
			var a1=main.split(".");
			var a3=$._apptexte.texte.getElementsByTagName(a1[0]);
			for (var i=0;i<a3.length;i++) {
				if (a3[i].getAttribute(a1[1])==a1[2]) {
					var a2=sub.split(".");
					var a4=a3[i].getElementsByTagName(a2[0]);
if (bill) {
	var test=a3[i];
	var bp=bill.split("_");
	var a5=a3[i].childNodes;
	for (var t=0;t<a5.length;t++) {
		if (a5[t].getAttribute) {
			if ((bp[1]==a5[t].getAttribute("series"))&&(parseInt(a5[t].getAttribute("denomination"))<=parseInt(bp[0]))) {
//				alert("taken"+a5[t].getAttribute("series")+","+a5[t].getAttribute("denomination"));
				test=a5[t];
			}
		}
	}
	a4=test.getElementsByTagName(a2[0]);
}


					for (var i=0;i<a4.length;i++) {

						if (a2.length==1) return $._apptexte.nice(a4[i].firstChild.data);
						if (a4[i].getAttribute(a2[1])==a2[2]) {
							return $._apptexte.nice(a4[i].firstChild.data);
						}
					}
				}
			}
		},
		nice: function(str) {
			str=str.replace(/(\n)/g,"<br />");
 while(str.indexOf("[br]") > -1)str=str.replace("[br]","<br />");
 while(str.indexOf("[i]") > -1) str = str.replace("[i]", "<i>");
 while(str.indexOf("[/i]") > -1) str = str.replace("[/i]", "</i>");
 while(str.indexOf("[-]") > -1) str = str.replace("[-]", "<img src='img/bullet.png' alt='' />");
			if (str.indexOf("[a")>=0) {
				str=str.replace(/\[a/g,"<a");
				str=str.replace(/\[\/a/g,"</a");
				str=str.replace(/\]/g,">");
			}
			return str;
		}

	}
})(jQuery);


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


/*
 * jQuery UI CoverFlow
   Re-written for jQueryUI 1.8.6/jQuery core 1.4.4+ by Addy Osmani with adjustments
   Maintenance updates for 1.8.9/jQuery core 1.5, 1.6.2 made.

   Original Component: Paul Bakaus for jQueryUI 1.7 
 */
(function($){

	function getPrefix( prop ){  
	        var prefixes = ['Moz','Webkit','Khtml','O','ms'],  
	            elem     = document.createElement('div'),  
	            upper      = prop.charAt(0).toUpperCase() + prop.slice(1),  
	            pref     = "",
				len 	 = 0;
	
	        for(len = prefixes.length; len--;){  
	            if((prefixes[len] + upper) in elem.style){  
	                pref = (prefixes[len]);  
	            }  
	        }  
	
	        if(prop in elem.style){  
	            pref = (prop);  
	        }  
			return pref;
	  }
	

	var vendorPrefix = getPrefix('transform');
	
	$.easing.easeOutQuint = function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	};

	$.widget("ui.coverflow", {
	
	   options: {
	        items: "> *",
			orientation: 'horizontal',
			item: 0,
			trigger: 'click',
			center: true, //If false, element's base position isn't touched in any way
			recenter: true //If false, the parent element's position doesn't get animated while items change
			
	  },
		
		_create: function() {
			
			var self = this, o = this.options;
			this.items = $(o.items, this.element);
			this.props = o.orientation == 'vertical' ? ['height', 'Height', 'top', 'Top'] : ['width', 'Width', 'left', 'Left'];
			//For < 1.8.2: this.items['outer'+this.props[1]](1);
			
			this.itemSize = 0.73 * this.items.innerWidth();
			this.itemWidth = this.items.width();
			this.itemHeight = this.items.height();
			this.duration = o.duration;
			this.current = o.item; //initial item
			

			//Bind click events on individual items
			this.items.bind(o.trigger, function() {
				self.select(this);
				
			});


			//Center the actual parent's left side within it's parent

			this.element.css(this.props[2],
				(o.recenter ? -this.current * this.itemSize/2 : 0)
				+ (o.center ? this.element.parent()[0]['offset'+this.props[1]]/2 - this.itemSize/2 : 0) //Center the items container
				- (o.center ? parseInt(this.element.css('padding'+this.props[3]),10) || 0 : 0) //Subtract the padding of the items container
			);

			//Jump to the first item
			this._refresh(1, 0, this.current);

		},
		
		select: function(item, noPropagation) {
		
			
			this.previous = this.current;
			this.current = !isNaN(parseInt(item,10)) ? parseInt(item,10) : this.items.index(item);
			

			//Don't animate when clicking on the same item
			if(this.previous == this.current) return false; 
			
			//Overwrite $.fx.step.coverflow everytime again with custom scoped values for this specific animation
			var self = this, to = Math.abs(self.previous-self.current) <=1 ? self.previous : self.current+(self.previous < self.current ? -1 : 1);
			$.fx.step.coverflow = function(fx) { self._refresh(fx.now, to, self.current); };
			
			// 1. Stop the previous animation
			// 2. Animate the parent's left/top property so the current item is in the center
			// 3. Use our custom coverflow animation which animates the item

			var animation = { coverflow: 1 };
		
		
			animation[this.props[2]] = (
				(this.options.recenter ? -this.current * this.itemSize/2 : 0)
				+ (this.options.center ? this.element.parent()[0]['offset'+this.props[1]]/2 - this.itemSize/2 : 0) //Center the items container
				- (this.options.center ? parseInt(this.element.css('padding'+this.props[3]),10) || 0 : 0) //Subtract the padding of the items container
			);
		
		
			
			//Trigger the 'select' event/callback
			if(!noPropagation) this._trigger('select', null, this._uiHash());
			
			this.element.stop().animate(animation, {
				duration: this.options.duration,
				easing: 'easeOutQuint'
			});
			
		},
		
		_refresh: function(state,from,to) {
		
	
			var self = this, offset = null;
	
			
			this.items.each(function(i) {
			
				
				var side = (i == to && from-to < 0 ) ||  i-to > 0 ? 'left' : 'right',
					mod = i == to ? (1-state) : ( i == from ? state : 1 ),
					before = (i > from && i != to),
					css = { zIndex: self.items.length + (side == "left" ? to-i : i-to) };
				    //css[($.browser.safari ? 'webkit' : ($.browser.opera ? 'O' : 'Moz'))+'Transform'] = 'matrix(1,'+(mod * (side == 'right' ? -0.2 : 0.2))+',0,1,0,0) scale('+(1+((1-mod)*0.3)) + ')'; 
	           
	
				if(vendorPrefix == 'ms' || vendorPrefix == ""){
		
					css["filter"] = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=1, M12=0, M21=" + (mod * (side == 'right' ? -0.2 : 0.2)) + ", M22=1";
					css[self.props[2]] = ( (-i * (self.itemSize/2)) + (side == 'right'? -self.itemSize/2 : self.itemSize/2) * mod );
		
					if(i == self.current){
					css.width = self.itemWidth * (1+((1-mod)*0.3));
					css.height = css.width * (self.itemHeight / self.itemWidth);
					css.top = -((css.height - self.itemHeight) / 3);

					css.left -= self.itemWidth/6 -50;
					}
					else{
					css.width = self.itemWidth;
					css.height = self.itemHeight;
					css.top = 0;

					if(side == "left"){
					css.left -= self.itemWidth/5 -50;
					}
		
					}//end if
		
		
				}else{
	
					css[vendorPrefix + 'Transform'] = 'matrix(1,'+(mod * (side == 'right' ? -0.2 : 0.2))+',0,1,0,0) scale('+(1+((1-mod)*0.3)) + ')'; 
					css[self.props[2]] = ( (-i * (self.itemSize/2)) + (side == 'right'? -self.itemSize/2 : self.itemSize/2) * mod );
		
				}
	

				$(this).css(css);


			});

			this.element.parent().scrollTop(0);
			
		},
		
		_uiHash: function() {
			return {
				item: this.items[this.current],
				value: this.current
			};
		}
		
	});

	
})(jQuery); 

