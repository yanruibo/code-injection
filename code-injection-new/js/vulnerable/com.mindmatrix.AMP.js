



        $(document).ready(function () {
            $("#pageLoader").show();
            // check session expiry
            var id = window.localStorage.getItem("ampID");
            var key = window.localStorage.getItem("ampkey");
            var install = window.localStorage.getItem("ampDomain");
            if (id == "" || key == "" || install == "" || id == null || key == null || install == null) {
                window.location = "login.html";
            }
            //getting values using localstorage
            var Name = window.localStorage.getItem("FirstName");
            var Last = window.localStorage.getItem("LastName");
            var Email = window.localStorage.getItem("Email");
            var Interest = window.localStorage.getItem("Intereststatus");
            var Contact = window.localStorage.getItem("ContactType");
            var Industry = window.localStorage.getItem("IndustryType");
            var worknumber = window.localStorage.getItem("Number");
            var mobilenumber = window.localStorage.getItem("mobile");
            var contactCompany = window.localStorage.getItem("company");
            var lead = window.localStorage.getItem("source");
            var stageval = window.localStorage.getItem("stage");
            if (Name == "N/A" || Name == "null") {
                $("#firstname").val("");
            }
            else {
                $("#firstname").val(Name);
            }
            if (Last == "null") { $("#lastname").val(""); }
            else { $("#lastname").val(Last); }
            if (worknumber == "null") { $("#workNumber").val(""); }
            else { $("#workNumber").val(worknumber); }
            if (mobilenumber == "null") { $("#mobileNumber").val(""); }
            else { $("#mobileNumber").val(mobilenumber); }
            if (contactCompany == "null") {
                $("#Company").val("");
            }
            else { $("#Company").val(contactCompany); }
            $("#email").val(Email);
            $("#interest").val(Interest);
            $("#contact").val(Contact);
            $("#industry").val(Industry);
            $("#leadsource").val(lead);
            $("#stage").val(stageval);
            $('#email').addClass("unselectbtn");
            $("#email").attr("disabled", true);
            localStorage.removeItem("Email");
            localStorage.removeItem("mobile");
            //Function call for back button
            $("#backpage").click(function (event) {
                event.preventDefault();
                history.back(1);
            });
            $('.option-listWrapper').hide();
            $('.cnclbtn').click(function () {
                $('.option-listWrapper').hide();
            });
            // Dropdown Menu Show Hide on Textbox click 
            $('.textbox .drpdwnmenu').live('click', function () {
                var options = $(this).parent().parent().find('.option-listWrapper');
                $(options).slideDown();
                $('input[type=text]').attr("disabled", true);
                $(this).parent().parent().find('.option-listWrapper .option-list ul li').click(function () {
                    var optlist_val = $(this).text();
                    var optlist_value = $(this).attr('value');
                    if ($(this).parent().parent().parent().parent().siblings('.textbox').find('#recipient').length == 1)
                        localStorage.setItem("Reclistid", optlist_value);
                    ($(options).prev('div').prev('div').children().first('input[type=text]').attr('value', optlist_val));
                    $(options).slideUp();
                    $('input[type=text]').attr("disabled", false);
                });
            });
            // Dropdown Menu Show Hide get value on texbox arrow click
            $('.textbox a span').live('click', function () {
                var options = $(this).parent().parent().parent().find('.option-listWrapper');
                $(options).slideDown();
                $(this).parent().parent().parent().find('.option-listWrapper .option-list ul li').click(function () {
                    var optlist_val = $(this).text();
                    var optlist_value = $(this).attr('value');
                    if ($(this).parent().parent().parent().parent().siblings('.textbox').find('#recipient').length == 1)
                        localStorage.setItem("Reclistid", optlist_value);
                    $(options).prev('div').prev('div').children().first('input[type=text]').attr('value', optlist_val);
                    $(options).slideUp();
                });
            });
            $("#pageLoader").hide();
            //Cancel Image on Dropdown click Event
            $('.option-listWrapper .option-list header h6 img').live('click', function () {
                $('.option-listWrapper').hide();
                $('input[type=text]').attr("disabled", false);
            });
        });
    


        function SaveContact() {
            $("#pageLoader").show();
            $(".loadingMessage").html("Updating contact in AMP");
            var id = localStorage.ampID; // ID local storage
            var key = localStorage.ampkey; // Key local storage
            var install = localStorage.ampDomain; // Domain Local storage
            var firstname = $.trim($("#firstname").val());
            var lastname = $.trim($("#lastname").val());
            var email = $.trim($("#email").val());
            var company = $.trim($("#Company").val());
            var workNumber = $.trim($("#workNumber").val());
            var mobileNumber = $.trim($("#mobileNumber").val());
            var intereststatus = $.trim($("#interest").val());
            var contact_type = $.trim($("#contact").val());
            var reclist = window.localStorage.getItem("Reclistid");
            var listid = reclist;
            var industrytype = $.trim($("#industry").val());
            var mobiapp = "Android";
            var stage = $.trim($("#stage").val());
            var leadsource = $.trim($("#leadsource").val());
            var Reg_fname = /^[a-zA-Z]$/;
            var Reg_Phoneno = /[0-9]$/;
            var atpos = email.indexOf("@");
            var dotpos = email.lastIndexOf(".");
            var err_msg = "";
            //Contact Xml- Creating xml for saving contact
            var conatctxml = "<contacts><keywords null='1' /><comments null='1' /><firstname null='0'><![CDATA[" + firstname + "]]></firstname><lastname null='0'><![CDATA[" + lastname + "]]></lastname><email null='0'><![CDATA[" + email + "]]></email><contactcompany null='0'><![CDATA[" + company + "]]></contactcompany><mobilenumber null='0'><![CDATA[" + mobileNumber + "]]></mobilenumber><worknumber null='0'><![CDATA[" + workNumber + "]]></worknumber><intereststatus null='0'><![CDATA[" + intereststatus + "]]></intereststatus><leadsource null='0'><![CDATA[" + leadsource + "]]></leadsource><contacttype null='0'><![CDATA[" + contact_type + "]]></contacttype><industrytype null='0'><![CDATA[" + industrytype + "]]></industrytype><prospect null='0'><![CDATA[true]]></prospect><roiamount null='0'><![CDATA[0]]></roiamount><stage null='0'><![CDATA[" + stage + "]]></stage>";
            var data = $("#customfield").find('input[type=text]');
            var count = $(data).size();
            var dropdownfields = "";
            for (var i = 0; i < count; i++) {
                var value = $.trim($($(data)[i]).attr("value"));
                var customid = $($(data)[i]).attr("custom");
                conatctxml += "<f_" + customid + " null='0'><![CDATA[" + value + "]]></f_" + customid + ">";
            }
            conatctxml += "</contacts>";
            // Default Recipient List Android Contact
            if (listid == null) {
                var uri = install + "/public/mobile.ashx?method=addcontactforandroid&id=" + id + "&key=" + key + "&email=" + email + "&lastname=" + lastname + "&firstname=" + firstname + "&phone=" + mobileNumber + "&interest=" + intereststatus + "&contacttype=" + contact_type + "&industry=" + industrytype + "&company=" + company + "&mobiapp=" + mobiapp + "&lead=" + leadsource + "&stage=" + stage;
            }
            else {
                var uri = install + "/public/mobile.ashx?method=addcontactforandroid&id=" + id + "&key=" + key + "&email=" + email + "&lastname=" + lastname + "&firstname=" + firstname + "&phone=" + mobileNumber + "&interest=" + intereststatus + "&contacttype=" + contact_type + "&industry=" + industrytype + "&company=" + company + "&listid=" + listid + "&mobiapp=" + mobiapp + "&lead=" + leadsource + "&stage=" + stage;
            }
            //Input Email ID validation
            if (email == null || email == "") {
                err_msg += "Please Enter Email Id" + "\n";
            }
            else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
                err_msg += "Not a valid e-mail address" + "\n";
            }
            if (workNumber != "") {
                if (isNaN(workNumber)) {
                    err_msg += "Not a valid Work Number" + "\n";
                }
            }
            if (mobileNumber != "") {
                if (isNaN(mobileNumber)) {
                    err_msg += "Not a valid Mobile Number" + "\n";
                }
            }
            // ajax call for Saving Contact
            if (err_msg == null || err_msg == "") {
                $.ajax({
                    type: "POST",
                    url: uri,
                    data: conatctxml,
                    success: function (name) {
                        alert("Contact updated successfully");
                        $("#pageLoader").hide();
                        cancel(); //function call for clear all fields
                        window.location = "dashboard.html"; //Redirected to dashboard
                        jsondata = eval('(' + name + ')');
                        if (typeof (jsondata.error) == "string") {
                            alert(jsondata.error);
                        }
                        else {
                            console.log(jsondata);
                        } //else
                        localStorage.removeItem("Reclistid");
                    }, //success
                    fail: function (name) {
                        alert('error');
                        localStorage.removeItem("Reclistid");
                    }
                });
            }
            else {
                alert(err_msg);
                $("#pageLoader").hide();
                localStorage.removeItem("Reclistid");
                return false;
            }
        }

        $(function () {
            $("#Save").click(function () {
                SaveContact();
            })
        })
    

        // Function to clear the data
        function cancel() {
            var elements = document.getElementsByTagName("input");
            for (var ii = 0; ii < elements.length; ii++) {
                if (elements[ii].type == "text" || elements[ii].type == "email") {
                    elements[ii].value = "";
                    history.back(1);
                }
            }
        }
        //function for customfilels
        function customfields() {
            $("#pageLoader").show();
            var id = localStorage.ampID; // ID local Storage
            var key = localStorage.ampkey; // Key Local storage
            var install = localStorage.ampDomain; // Domain local storage
            var uri = install + "/public/mobile.ashx?method=contactfields&id=" + id + "&key=" + key;
            var customfields = "";
            var Listoptions = "";
            $.ajax({
                type: "GET",
                url: uri,
                success: function (msg) {
                    var prevgrp = "";
                    jsondata = eval('(' + msg + ')');
                    var jsondata1 = jsondata;
                    if (typeof (jsondata.error) == "string") {
                        alert(jsondata.error);
                    } else {
                        customfields = "";
                        //Group Index Array
                        var grpindexArr = new Array();
                        for (var i = 0; i < jsondata.length; i++) {
                            var groupindex1 = jsondata[i].groupindex;
                            var flag = 1;
                            for (var k = 0; k < grpindexArr.length; k++) {
                                if (grpindexArr[k] == groupindex1) {
                                    flag = 0;
                                    break;
                                }
                            }
                            if (flag == 1) {
                                grpindexArr[i] = groupindex1;
                                //Grouping customfields
                                customfields = customfields + "</fieldset><fieldset class='grouping'><legend class='groupheader'>" + jsondata[i].groupname + "</legend>";
                                for (var j = 0; j < jsondata1.length; j++) {
                                    var groupindex2 = jsondata[j].groupindex;
                                    for (var k = 0; k < jsondata1[j].dictionary.entries.length; k++) {
                                        //Dropdown options
                                        if (jsondata[j].dictionary.entries[k].deleted == 0) {
                                            Listoptions = Listoptions + "<li value='" + jsondata[j].id + "'><a>" + jsondata[j].dictionary.entries[k].name + "</a></li>";
                                        }
                                        if (groupindex1 == groupindex2) {
                                            if (k == jsondata1[j].dictionary.entries.length - 1) {
                                                customfields = customfields + "<div data-role='fieldcontain' class='text-field'><label for='jsondata[i].label'>" + jsondata[j].label + "</label><div class='textbox'><input type='text' readonly custom='" + jsondata[j].id + "' name='" + jsondata[i].label + "' value='' placeholder='' class='txtbox drpdwnmenu' id='f_" + jsondata[j].id + "' /><a><span><img src='images/arrow-icon.png' /></span></a></div><div class='clear'></div><div class='option-listWrapper'><div class='option-list'><header><h6><span>Select " + jsondata[j].label + "</span><img src='images/close-icon.png' /><div class='clear'></div></h6></header><div class='Listdiv'><ul>" + Listoptions + " </ul></div></div></div></div><div style='display:none'><span id='customid'>" + jsondata[j].id + "</span></div>";
                                            }
                                        }
                                    } Listoptions = "";
                                }
                            }
                        }
                        $('#customfield').append(customfields);
                        $("#pageLoader").hide();
                        getcontactinfo(); //Function Call for getting values
                    }
                    $('.option-listWrapper').hide();
                    $("#pageLoader").hide();
                },
                fail: function (msg) {
                    alert('error'); //success
                    $("#pageLoader").hide();
                }
            });
        }
        //Function for getting contact Info by using contact id   
        function getcontactinfo() {
            $("#pageLoader").show();
            var id = localStorage.ampID; // ID local Storage
            var key = localStorage.ampkey; // Key Local storage
            var install = localStorage.ampDomain; // Domain local storage
            var cid = window.localStorage.getItem("contactID");
            //  ajax call for getting Recipient List
            var uri = install + "/public/mobile.ashx?method=getcontactinfo&id=" + id + "&key=" + key + "&cid=" + cid;
            $.ajax({
                type: "GET",
                url: uri,
                success: function (msg) {
                    jsondata = eval('(' + msg + ')');
                    var data = $("#customfield").find('input[type=text]');
                    var count = $(data).size(); //customfields dropdown count
                    for (var i = 0; i < count; i++) {
                        var customid = $($(data)[i]).attr("id");
                        $('#' + customid).val(jsondata[customid]); //placing values in respected dropdowns
                        $("#pageLoader").hide();
                    }
                    if (typeof (jsondata.error) == "string") {
                        alert(jsondata.error);
                    } else {
                    }
                },
                fail: function (msg) {
                    alert('error'); //success
                    $("#pageLoader").hide();
                }
            });
        }
        //Function For getting Recipient List
        function getlists() {
            var id = localStorage.ampID; // ID local Storage
            var key = localStorage.ampkey; // Key Local storage
            var install = localStorage.ampDomain; // Domain local storage
            var currentmsg = "";
            //ajax call for getting Recipient List
            var uri = install + "/public/mobile.ashx?method=getlists&id=" + id + "&key=" + key;
            $.ajax({
                type: "GET",
                url: uri,
                success: function (msg) {
                    jsondata = eval('(' + msg + ')');
                    if (typeof (jsondata.error) == "string") {
                        alert(jsondata.error);
                    } else {
                        console.log(jsondata);
                        var lists = jsondata.lists;

                        for (var i = 0; i < jsondata.lists.length; i++) {
                            currentmsg = currentmsg + "<li value=" + jsondata.lists[i].id + "><a>" + jsondata.lists[i].name + "</a></li>";
                        }
                        $('#rec_list').append(currentmsg);
                    }
                },
                fail: function (msg) {
                    alert('error'); //success
                }
            });
        }
    



        $(document).ready(function () {
                window.location = 'oauth/test.html';
        });
    


















        document.addEventListener("deviceready", loginauth, false);
        function loginauth() {
            var id = window.localStorage.getItem("ampID");
            var key = window.localStorage.getItem("ampkey");
            var install = window.localStorage.getItem("ampDomain");
            if (id == "" || key == "" || install == "" || id == null || key == null || install == null) {
                window.location.href = "login.html";
            }
            else {
                window.location = "dashboard.html";
            }
        }
    






















        // Wait for device API libraries to load
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            setTimeout(function () {
                gmail.accesstoken = window.localStorage.token;
                gmail.sendmailusinggmailaccesstoken();
            }, 100);
        }
    

























        var ref;
        // Wait for device API libraries to load
        document.addEventListener("deviceready", onDeviceReady, false);
        // device APIs are available
        function loadstart(e) {
            console.log('loadstart:' + e.url);
        }
        function loadstop(e) {
            var hastoken = e.url.indexOf('getaccesstoken.html');
            if (hastoken > 0) {
                window.localStorage.token = e.url.substring(hastoken + 26, e.url.length);
                ref.close();
                window.location = '../sendgmailmail.html';
            }
        }
        function loaderror(e) {
            console.log('loaderror:' + e.url);
        }
        function exit(e) {
            console.log('exit:' + e.url);
        }
        function onDeviceReady() {
            setTimeout(function () {
                ref = window.open(window.localStorage.ampDomain + '/public/obtain-google-accesstoken.aspx?install=' + window.localStorage.ampDomain, '_blank', 'location=yes');
                ref.addEventListener('loadstart', loadstart);
                ref.addEventListener('loadstop', loadstop);
                ref.addEventListener('loaderror', loaderror);
                ref.addEventListener('exit', exit);
            }, 1000);
        }
    

(function (e) {
    "use strict";
    e.fn.bjqs = function (t) {
        var n =
 { 
     animtype: "fade",
     animduration: 450,
     animspeed: 4e3,
     showcontrols: !0,
     centercontrols: !0,
     nexttext: "",
     prevtext: "",
     showmarkers: !0,
     centermarkers: !0,
     keyboardnav: !0,
     hoverpause: !0,
     usecaptions: !0,
     randomstart: !1,
     responsive: !1
 },
 r = e.extend({}, n, t), 
 i = this,
 s = i.find("ul.bjqs"),
 o = s.children("li"),
 u = null, a = null, f = null, l = null, c = null, h = null, p = null, d = null,
 v = { slidecount: o.length, animating: !1, paused: !1, currentslide: 1, nextslide: 0, currentindex: 0, nextindex: 0, interval: null },
 m = { width: null, height: null, ratio: null },
 g = { fwd: "forward", prev: "previous" },
 y=function(){o.addClass("bjqs-slide");
     r.responsive ? b() : E();
     if (v.slidecount > 1) {
         r.randomstart && L();
         r.showcontrols && x();
         r.showmarkers && T();
         r.keyboardnav && N();
         r.hoverpause && r.automatic && C();
         r.animtype === "slide" && S()
     } r.usecaptions && k();
     if (r.animtype === "slide" && !r.randomstart) {
         v.currentindex = 1;
         v.currentslide = 2
     }
     s.show();
     o.eq(v.currentindex).show();
     r.automatic && (v.interval = setInterval(function ()
     { O(g.fwd, !1) }, r.animspeed))
 },
 b = function () {
     m.width = i.outerWidth();
     m.ratio = m.width / r.width, m.height = r.height * m.ratio;
     if (r.animtype === "fade") {
         o.css({ height: r.height, width: "100%" });
         o.children("img").css({ height: r.height, width: "100%" });
         s.css({ height: r.height, width: "100%" });
         i.css({ height: r.height, "max-width": r.width, position: "relative" });
         if (m.width < r.width) {
             o.css({ height: m.height });
             o.children("img").css({ height: m.height });
             s.css({ height: m.height });
             i.css({ height: m.height })
         } e(window).resize(function () {
             m.width = i.outerWidth();
             m.ratio = m.width / r.width, m.height = r.height * m.ratio;
             o.css({ height: m.height });
             o.children("img").css({ height: m.height });
             s.css({ height: m.height });
             i.css({ height: m.height })
         })
     } if (r.animtype === "slide") {
         o.css({ height: r.height, width: r.width });
         o.children("img").css({ height: r.height, width: r.width });
         s.css({ height: r.height, width: r.width * r.slidecount });
         i.css({ height: r.height, "max-width": r.width, position: "relative" });
         if (m.width < r.width) {
             o.css({ height: m.height });
             o.children("img").css({ height: m.height });
             s.css({ height: m.height });
             i.css({ height: m.height })
         } e(window).resize(function () {
             m.width = i.outerWidth(),
 m.ratio = m.width / r.width,
 m.height = r.height * m.ratio;
             o.css({ height: m.height, width: m.width });
             o.children("img").css({ height: m.height, width: m.width });
             s.css({ height: m.height, width: m.width * r.slidecount });
             i.css({ height: m.height });
             h.css({ height: m.height, width: m.width });
             w(function () { O(!1, v.currentslide) }, 200, "some unique string")
         })
     } 
 },
 w = function () {
     var e = {};
     return function (t, n, r) {
         r || (r = "Don't call this twice without a uniqueId");
         e[r] && clearTimeout(e[r]); e[r] = setTimeout(t, n)
     } 
 } (),
 E = function () {
     o.css({ height: r.height, width: r.width });
     s.css({ height: r.height, width: r.width });
     i.css({ height: r.height, width: r.width, position: "relative" })
 },
 S = function () {
     p = o.eq(0).clone(); d = o.eq(v.slidecount - 1).clone();
     p.attr({ "data-clone": "last", "data-slide": 0 }).appendTo(s).show();
     d.attr({ "data-clone": "first", "data-slide": 0 }).prependTo(s).show();
     o = s.children("li");
     v.slidecount = o.length;
     h = e('<div class="bjqs-wrapper"></div>');
     if (r.responsive && m.width < r.width) {
         h.css({ width: m.width, height: m.height, overflow: "hidden", position: "relative" });
         s.css({ width: m.width * (v.slidecount + 2), left: -m.width * v.currentslide })
     }
     else {
         h.css({ width: r.width, height: r.height, overflow: "hidden", position: "relative" });
         s.css({ width: r.width * (v.slidecount + 2), left: -r.width * v.currentslide })
     }
     o.css({ "float": "left", position: "relative", display: "list-item" });
     h.prependTo(i);
     s.appendTo(h)
 },
 x = function () {
     u = e('<ul class="bjqs-controls"></ul>');
//   a = e('<li class="bjqs-next"><a href="#" data-direction="' + g.fwd + '" style="background:url(images/right-arrow.png) no-repeat; height:32px; width:9px;">' + r.nexttext + "</a></li>");
     a = e('<li class="bjqs-next"><a href="#" data-direction="' + g.fwd + '"<i style="font-size: 40px;" class="icon-chevron-right"></i>' + r.nexttext + "</a></li>");
//   f = e('<li class="bjqs-prev"><a href="#" data-direction="' + g.prev + '" style="background:url(images/left-arrow.png) no-repeat; height:32px; width:13px;">' + r.prevtext + "</a></li>");
     f = e('<li class="bjqs-prev"><a href="#" data-direction="' + g.prev + '"<i style="font-size: 40px;" class="icon-chevron-left"></i>' + r.prevtext + "</a></li>");
     u.on("click", "a",
 function (t) {
     t.preventDefault();
     var n = e(this).attr("data-direction");
     if (!v.animating) {
         n === g.fwd && O(g.fwd, !1);
         n === g.prev && O(g.prev, !1)
     } 
 });
 f.appendTo(u); a.appendTo(u);
 u.appendTo(i);
 if (r.centercontrols) {
     u.addClass("v-centered");
     var t = (i.height() - a.children("a").outerHeight()) / 2, n = t / r.height * 100, s = n + "%";
     a.find("a").css("top", s);
     f.find("a").css("top", s)
 } 
},
 T = function () {
     l = e('<ol class="bjqs-markers"></ol>');
     e.each(o, function (t, n) {
         var i = t + 1, s = t + 1; r.animtype === "slide" && (s = t + 2);
         var o = e('<li><a href="#">' + i + "</a></li>");
         i === v.currentslide && o.addClass("active-marker");
         o.on("click", "a", function (e) {
             e.preventDefault();
             !v.animating && v.currentslide !== s && O(!1, s)
         });
         o.appendTo(l)
     });
     l.appendTo(i); c = l.find("li");
     if (r.centermarkers) {
         l.addClass("h-centered");
         var t = (r.width - l.width()) / 2;
         l.css("left", t)
     } 
 },
 N = function () {
     e(document).keyup(function (e) {
         if (!v.paused) { clearInterval(v.interval); v.paused = !0 }
         if (!v.animating)
             if (e.keyCode === 39) {
                 e.preventDefault();
                 O(g.fwd, !1)
             }
             else if (e.keyCode === 37) {
                 e.preventDefault();
                 O(g.prev, !1)
             }
             if (v.paused && r.automatic) {
                 v.interval = setInterval(function () { O(g.fwd) }, r.animspeed);
                 v.paused = !1
             } 
         })
     },
 C = function () {
     i.hover(function ()
     { if (!v.paused) { clearInterval(v.interval); v.paused = !0 } },
 function () {
     if (v.paused) {
         v.interval = setInterval(function () { O(g.fwd, !1) },
 r.animspeed); v.paused = !1
     } 
 })
},
 k = function () {
     e.each(o, function (t, n) {
         var r = e(n).children("img:first-child").attr("title");
         r || (r = e(n).children("a").find("img:first-child").attr("title"));
         if (r) {
             r = e('<p class="bjqs-caption">' + r + "</p>");
             r.appendTo(e(n))
         } 
     })
 },
 L = function () {
     var e = Math.floor(Math.random() * v.slidecount) + 1;
     v.currentslide = e;
     v.currentindex = e - 1
 },
 A = function (e) {
     if (e === g.fwd) if (o.eq(v.currentindex).next().length) {
         v.nextindex = v.currentindex + 1;
         v.nextslide = v.currentslide + 1
     }
     else { v.nextindex = 0; v.nextslide = 1 }
     else if (o.eq(v.currentindex).prev().length)
     { v.nextindex = v.currentindex - 1; v.nextslide = v.currentslide - 1 }
     else {
         v.nextindex = v.slidecount - 1;
         v.nextslide = v.slidecount
     } 
 },
 O = function (e, t) {
     if (!v.animating) {
         v.animating = !0;
         if (t) { v.nextslide = t; v.nextindex = t - 1 }
         else A(e);
         if (r.animtype === "fade") {
             if (r.showmarkers) {
                 c.removeClass("active-marker");
                 c.eq(v.nextindex).addClass("active-marker")
             }
             o.eq(v.currentindex).fadeOut(r.animduration);
             o.eq(v.nextindex).fadeIn(r.animduration,
 function () {
     v.animating = !1;
     v.currentslide = v.nextslide;
     v.currentindex = v.nextindex
 })
}
if (r.animtype === "slide") {
    if (r.showmarkers) {
        var n = v.nextindex - 1;
        n === v.slidecount - 2 ? n = 0 : n === -1 && (n = v.slidecount - 3);
        c.removeClass("active-marker");
        c.eq(n).addClass("active-marker")
    }
    r.responsive && m.width < r.width ? v.slidewidth = m.width : v.slidewidth = r.width;
    s.animate({ left: -v.nextindex * v.slidewidth },
 r.animduration,
 function () {
     v.currentslide = v.nextslide;
     v.currentindex = v.nextindex;
     if (o.eq(v.currentindex).attr("data-clone") === "last") {
         s.css({ left: -v.slidewidth });
         v.currentslide = 2;
         v.currentindex = 1
     }
     else if (o.eq(v.currentindex).attr("data-clone") === "first") {
         s.css({ left: -v.slidewidth * (v.slidecount - 2) });
         v.currentslide = v.slidecount - 1;
         v.currentindex = v.slidecount - 2
     }
 v.animating=!1})}}}
 ;
 y()}})(jQuery);

﻿var gmail = {
    accesstoken: null,
    sendmailusinggmailaccesstoken: function () {
        var id = window.localStorage.getItem("ampID");
        var key = window.localStorage.getItem("ampkey");
        var install = window.localStorage.getItem("ampDomain");

        var uri = install + "/public/mobile.ashx?method=sendmailviagmailaccesstoken&id=" + id + "&key=" + key + "&to=" + window.localStorage.getItem("gmail_to") + "&mediaid=" + window.localStorage.getItem("mediaid") + "&accesstoken=" + gmail.accesstoken;
        console.log(uri);
        $(".loadingMessage").html("Sending email, please wait")
        $.ajax({
            type: "GET",
            url: uri,
            success: function (data) {
                jsondata = eval('(' + data + ')');
                $("#pageLoader").hide();
                if (typeof (jsondata.error) == "string") {
                    
                } else {
                    window.localStorage.setItem('gmail_to', '');
                    window.localStorage.setItem('templateid', '0');
                    window.localStorage.setItem('mediaid', '0');
                    $(".loadingMessage").html('Your email has been successfully sent! Re-directing you back to Dashboard.')
                    alert('Email Sent Successfully');
                    window.location = "dashboard.html";
                    //setTimeout(function () { window.location = 'dashboard.html' }, 2000);
                }
            },
            fail: function (msg) {
                $('#message').html('error'); //success
                $("#pageLoader").hide();
                
            }
        });
    }
}


﻿//JS file for create Contact Page
$(document).ready(function () {
    $("#pageLoader").show();
    // check session expiry
    var id = window.localStorage.getItem("ampID");
    var key = window.localStorage.getItem("ampkey");
    var install = window.localStorage.getItem("ampDomain");
    if (id == "" || key == "" || install == "" || id == null || key == null || install == null) {
        window.location = "login.html";
    }
    $("#backpage").click(function (event) {
        event.preventDefault();
        history.back(1);
    });
    $('.option-listWrapper').hide();
    $('.cnclbtn').click(function () {
        $('.option-listWrapper').hide();
    });

    // Dropdown Menu Show Hide and get value on Textbox click 
    $('.textbox .drpdwnmenu').live('click', function () {
        var options = $(this).parent().parent().find('.option-listWrapper');
        $(options).slideDown();
        $('input[type=text]').attr("disabled", true);
        $(this).parent().parent().find('.option-listWrapper .option-list ul li').click(function () {
            var optlist_val = $(this).text();
            var optlist_value = $(this).attr('value');
            if ($(this).parent().parent().parent().parent().siblings('.textbox').find('#recipient').length == 1)
                localStorage.setItem("Reclistid", optlist_value);
            ($(options).prev('div').prev('div').children().first('input[type=text]').attr('value', optlist_val));
            $(options).slideUp();
            $('input[type=text]').attr("disabled", false);
        });
    });
    // Dropdown Menu Show Hide get value on texbox arrow click
    $('.textbox a span').live('click', function () {
        var options = $(this).parent().parent().parent().find('.option-listWrapper');
        $(options).slideDown();
        $(this).parent().parent().parent().find('.option-listWrapper .option-list ul li').click(function () {
            var optlist_val = $(this).text();
            var optlist_value = $(this).attr('value');
            if ($(this).parent().parent().parent().parent().siblings('.textbox').find('#recipient').length == 1)
                localStorage.setItem("Reclistid", optlist_value);
            $(options).prev('div').prev('div').children().first('input[type=text]').attr('value', optlist_val);
            $(options).slideUp();
        });
    });
    $("#pageLoader").hide();
    //Cancel Image on Dropdown click Event
    $('.option-listWrapper .option-list header h6 img').live('click', function () {
        $('.option-listWrapper').hide();
        $('input[type=text]').attr("disabled", false);
    });
});

function SaveContact() {
    $("#pageLoader").show();
    $(".loadingMessage").html("Creating contact in AMP");
    var id = localStorage.ampID; // ID local storage
    var key = localStorage.ampkey; // Key local storage
    var install = localStorage.ampDomain; // Domain Local storage
    var firstname = $.trim($("#firstname").val());
    var lastname = $.trim($("#lastname").val());
    var email = $.trim($("#email").val());
    var company = $.trim($("#Company").val());
    var workNumber = $.trim($("#workNumber").val());
    var mobileNumber = $.trim($("#mobileNumber").val());
    var intereststatus = $.trim($("#interest").val());
    var contact_type = $.trim($("#contact").val());
    var reclist = window.localStorage.getItem("Reclistid");
    var listid = reclist;
    var industrytype = $.trim($("#industry").val());
    var mobiapp = "Android";
    var stage = $.trim($("#stage").val());
    var leadsource = $.trim($("#leadsource").val());
    var Reg_fname = /^[a-zA-Z]$/;
    var Reg_Phoneno = /[0-9]$/;
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    var err_msg = "";
    var msgcount = 0;
    //Contact Xml- Creating xml for saving contact
    var conatctxml = "<contacts><keywords null='1' /><comments null='1' /><firstname null='0'><![CDATA[" + firstname + "]]></firstname><lastname null='0'><![CDATA[" + lastname + "]]></lastname><email null='0'><![CDATA[" + email + "]]></email><contactcompany null='0'><![CDATA[" + company + "]]></contactcompany><mobilenumber null='0'><![CDATA[" + mobileNumber + "]]></mobilenumber><worknumber null='0'><![CDATA[" + workNumber + "]]></worknumber><intereststatus null='0'><![CDATA[" + intereststatus + "]]></intereststatus><autoadjustinterest null='0'><![CDATA[true]]></autoadjustinterest><leadsource null='0'><![CDATA[" + leadsource + "]]></leadsource><contacttype null='0'><![CDATA[" + contact_type + "]]></contacttype><industrytype null='0'><![CDATA[" + industrytype + "]]></industrytype><prospect null='0'><![CDATA[true]]></prospect><roiamount null='0'><![CDATA[0]]></roiamount><stage null='0'><![CDATA[" + stage + "]]></stage><unsubscribe_email null='0'><![CDATA[false]]></unsubscribe_email>";
    var data = $("#customfield").find('input[type=text]');
    var count = $(data).size();
    var dropdownfields = "";
    for (var i = 0; i < count; i++) {
        var value = $.trim($($(data)[i]).attr("value"));
        var customid = $($(data)[i]).attr("custom");
        conatctxml += "<f_" + customid + " null='0'><![CDATA[" + value + "]]></f_" + customid + ">";
    }
    conatctxml += "</contacts>";
    // Default Recipient List Android Contact
    if (listid == null) {
        var uri = install + "/public/mobile.ashx?method=addcontactforandroid&id=" + id + "&key=" + key + "&email=" + email + "&lastname=" + lastname + "&firstname=" + firstname + "&phone=" + mobileNumber + "&interest=" + intereststatus + "&contacttype=" + contact_type + "&industry=" + industrytype + "&company=" + company + "&mobiapp=" + mobiapp + "&lead=" + leadsource + "&stage=" + stage;
    }
    else {
        var uri = install + "/public/mobile.ashx?method=addcontactforandroid&id=" + id + "&key=" + key + "&email=" + email + "&lastname=" + lastname + "&firstname=" + firstname + "&phone=" + mobileNumber + "&interest=" + intereststatus + "&contacttype=" + contact_type + "&industry=" + industrytype + "&company=" + company + "&listid=" + listid + "&mobiapp=" + mobiapp + "&lead=" + leadsource + "&stage=" + stage;
    }
    //Input Email ID validation
    if (email == null || email == "") {
        err_msg += "Please Enter Email Id" + "\n";
    }
    else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
        err_msg += "Not a valid e-mail address" + "\n";
    }
    if (mobileNumber != "") {
        if (isNaN(mobileNumber)) {
            err_msg += "Not a valid Mobile Number" + "\n";
        }
    }
    if (workNumber != "") {
        if (isNaN(workNumber)) {
            err_msg += "Not a valid Work Number" + "\n";
        }
    }
    // ajax call for Saving Contact
    if (err_msg == null || err_msg == "") {
        $.ajax({
            type: "POST",
            url: uri,
            data: conatctxml,
            success: function (name) {
                alert("Contact created successfully");
                cancel();
                $("#pageLoader").hide();
                window.location = "dashboard.html";
                jsondata = eval('(' + name + ')');
                if (typeof (jsondata.error) == "string") {
                    alert(jsondata.error);
                }
                else {
                    console.log(jsondata);
                } //else
                localStorage.removeItem("Reclistid");
            }, //success
            fail: function (name) {
                alert('error');
                localStorage.removeItem("Reclistid");
                $("#pageLoader").hide();
            }
        });
    }
    else {
        alert(err_msg);
        localStorage.removeItem("Reclistid");
        $("#pageLoader").hide();
        return false;
    }
 }


 $(function () {
     //Contact Save function
     $("#Save").click(function () {
         SaveContact();
     })
 })
//Function For getting Recipient List
function getlists() {
    var id = localStorage.ampID; // ID local Storage
    var key = localStorage.ampkey; // Key Local storage
    var install = localStorage.ampDomain; // Domain local storage
    var currentmsg = "";
    //ajax call for getting Recipient List
    var uri = install + "/public/mobile.ashx?method=getlists&id=" + id + "&key=" + key;
    $.ajax({
        type: "GET",
        url: uri,
        success: function (msg) {
            jsondata = eval('(' + msg + ')');
            if (typeof (jsondata.error) == "string") {
                alert(jsondata.error);
            } else {
                var lists = jsondata.lists;
                for (var i = 0; i < jsondata.lists.length; i++) {
                    currentmsg = currentmsg + "<li value=" + jsondata.lists[i].id + "><a>" + jsondata.lists[i].name + "</a></li>";
                }
                $('#rec_list').append(currentmsg);
            }
        },
        fail: function (msg) {
            alert('error'); //success
        }
    });
}
// Function to clear the data
function cancel() {
    var elements = document.getElementsByTagName("input");
    for (var k = 0; k < elements.length; k++) {
        if ((elements[k].type == "text" || elements[k].type == "email") && elements[k].getAttribute("id") != "recipient") {
            elements[k].value = "";
            localStorage.removeItem("Reclistid");
            var Default = "Android contacts";
            $("#recipient").val(Default);
        }
    }
}
// Function for dropdown custom fields
function customfields() {
    $("#pageLoader").show();
    var id = localStorage.ampID; // ID local Storage
    var key = localStorage.ampkey; // Key Local storage
    var install = localStorage.ampDomain; // Domain local storage
    var uri = install + "/public/mobile.ashx?method=contactfields&id=" + id + "&key=" + key;
    var customfields = "";
    var Listoptions = "";
    $.ajax({
        type: "GET",
        url: uri,
        success: function (msg) {
            var prevgrp = "";
            jsondata = eval('(' + msg + ')');
            var jsondata1 = jsondata;
            if (typeof (jsondata.error) == "string") {
                alert(jsondata.error);
            } else {
                customfields = "";
                //Making Group Index Array
                var grpindexArr = new Array();
                for (var i = 0; i < jsondata.length; i++) {
                    var groupindex1 = jsondata[i].groupindex;
                    var flag = 1;
                    for (var k = 0; k < grpindexArr.length; k++) {
                        if (grpindexArr[k] == groupindex1) {
                            flag = 0;
                            break;
                        }
                    }
                    if (flag == 1) {
                        grpindexArr[i] = groupindex1;
                        //Grouping customfields
                        debugger;
                        customfields = customfields + "</fieldset><fieldset class='grouping'><legend class='groupheader'>" + jsondata[i].groupname + "</legend>";
                        for (var j = 0; j < jsondata1.length; j++) {
                            var groupindex2 = jsondata[j].groupindex;
                            for (var k = 0; k < jsondata1[j].dictionary.entries.length; k++) {
                                //Dropdown options
                                if (jsondata[j].dictionary.entries[k].deleted == 0) {
                                    Listoptions = Listoptions + "<li value='" + jsondata[j].id + "'><a>" + jsondata[j].dictionary.entries[k].name + "</a></li>";
                                }
                                if (groupindex1 == groupindex2) {
                                    if (k == jsondata1[j].dictionary.entries.length - 1) {
                                        customfields = customfields + "<div data-role='fieldcontain' class='text-field'><label for='jsondata[i].label'>" + jsondata[j].label + "</label><div class='textbox'><input type='text' readonly custom='" + jsondata[j].id + "' name='" + jsondata[i].label + "' value='' placeholder='' class='txtbox drpdwnmenu' id='" + jsondata[i].label + "' /><a><span><img src='images/arrow-icon.png' /></span></a></div><div class='clear'></div><div class='option-listWrapper'><div class='option-list'><header><h6><span>Select " + jsondata[j].label + "</span><img src='images/close-icon.png' /><div class='clear'></div></h6></header><div class='Listdiv'><ul>" + Listoptions + " </ul></div></div></div></div><div style='display:none'><span id='customid'>" + jsondata[j].id + "</span></div>";
                                    }
                                }
                            } Listoptions = "";
                        }
                    }
                }
                $('#customfield').append(customfields); //Apprnding customfields
                $("#pageLoader").hide();
            }
            $('.option-listWrapper').hide();
            $("#pageLoader").hide();
        },
        fail: function (msg) {
            alert('error'); //success
            $("#pageLoader").hide();
        }
    });
}


﻿//JS file for Email page
$(document).ready(function () {
    $("#pageLoader").show();
    // check session expiry
    var id = window.localStorage.getItem("ampID");
    var key = window.localStorage.getItem("ampkey");
    var install = window.localStorage.getItem("ampDomain");
    if (id == "" || key == "" || install == "" || id == null || key == null || install == null) {
        window.location = "login.html";
    }
    //Function for Back button
    $("#backpage").click(function (event) {
        event.preventDefault();
        history.back(1);
    });
    gettopemailtemplates();
    //Checking Screen size according to that adjust templates size
    //    if (window.innerHeight >= 700 && window.innerWidth >= 600) {
    //        $('#container').addClass('iPadContainer');
    //        $('#banner-fade').addClass('iPadbanner-fade');
    //        gettopemailtemplatesiPad();
    //    }
    //    else { gettopemailtemplates(); }
});

// function to get all email templates
function gettopemailtemplates() {
    $("#pageLoader").show();
    var id = localStorage.ampID; // ID local storage
    var key = localStorage.ampkey; // Key local Storage
    var install = localStorage.ampDomain; // Domain local storage
    var searchtext = $.trim(document.getElementById('Template_search').value);
    var currentmsg = "";
    //  Ajax call for Email Templates
    var uri = install + "/public/mobile.ashx?method=searchtemplatesforgooglechrome&id=" + id + "&key=" + key + "&searchtext=" + searchtext;
    $.ajax({
        type: "GET",
        url: uri,
        success: function (name) {
            jsondata = eval('(' + name + ')');
            if (typeof (jsondata.error) == "string") {
                $("#pageLoader").hide();
                alert(jsondata.error);
            }
            else {
                var current = "";
                current = current + "<p class='Totaltemp'> Total Email Templates: " + jsondata.length + "</p>";
                var object = jsondata.object;
                for (var i = 0; i < jsondata.length; i++) {
                    currentmsg = currentmsg + "<li style='cursor:pointer;' id='" + jsondata[i].id + "'><img src='" + jsondata[i].original + "' title='" + jsondata[i].name + "'></li>";
                }
                $("#total").html("");
                $("#total").html(current); // Appending total no of templates
                $(".bjqs").html("");
                $(".bjqs").html(currentmsg); // Appending templates
                $("#pageLoader").hide();
                var winwidth = window.innerWidth;
                var winheight = window.innerHeight - 250;
                $('#banner-fade').bjqs({
                    width: winwidth,
                    height: winheight,
                    responsive: true
                });
                // Binding Email Template using its template id
                $('.bjqs-slide').bind('click', function () {
                    window.location.href = "Sendemail.html?templateid=" + $(this).attr('id'); ;
                    $("#pageLoader").hide();
                });

                if (jsondata.length == 0) {
                    alert("No templates found");
                }

            } //alert(name); //else
        }, //success
        fail: function (msg) {
            $("#pageLoader").hide();
            alert('error');
        }
    });
}

//function gettopemailtemplatesiPad() {
//    $("#pageLoader").show();
//    var id = localStorage.ampID; // ID local storage
//    var key = localStorage.ampkey; // Key local Storage
//    var install = localStorage.ampDomain; // Domain local storage
//    var searchtext = document.getElementById('Template_search').value;
//    var currentmsg = "";
//      Ajax call for Email Templates
//    var uri = install + "/public/mobile.ashx?method=searchtemplatesforgooglechrome&id=" + id + "&key=" + key + "&searchtext=" + searchtext;
//    $.ajax({
//        type: "GET",
//        url: uri,
//        success: function (name) {
//            jsondata = eval('(' + name + ')');
//            if (typeof (jsondata.error) == "string") {
//                $("#pageLoader").hide();
//                alert(jsondata.error);
//            }
//            else {
//                var current = "";
//                current = current + "<p class='Totaltemp'> Total Email Templates: " + jsondata.length + "</p>";
//                var object = jsondata.object;
//                for (var i = 0; i < jsondata.length; i++) {
//                    currentmsg = currentmsg + "<li style='cursor:pointer;' id='" + jsondata[i].id + "'><img src='" + jsondata[i].original + "' title='" + jsondata[i].name + "'></li>";
//                }
//                $("#total").html("");
//                $("#total").html(current); // Appending total no of templates
//                $(".bjqs").html("");
//                $(".bjqs").html(currentmsg); // Appending templates
//                $("#pageLoader").hide();
//                $('#banner-fade').bjqs({
//                    height: 700,
//                    responsive: true
//                });
//                 Binding Email Template using its template id
//                $('.bjqs-slide').bind('click', function () {
//                    window.location.href = "Sendemail.html?templateid=" + $(this).attr('id'); ;
//                    $("#pageLoader").hide();
//                });
//            } //alert(name); //else
//        }, //success
//        fail: function (msg) {
//            $("#pageLoader").hide();
//            alert('error');
//        }
//    });
//}

//function searchtemplates() {
//    if (window.innerHeight >= 700 && window.innerWidth >= 600) {
//        $('#container').addClass('iPadContainer');
//        $('#banner-fade').addClass('iPadbanner-fade');
//        gettopemailtemplatesiPad();
//    }
//    else { gettopemailtemplates(); }
// }


﻿//JS file For Sendemail page
var contacttype = 0;

function onSearch() {
    $("#nextprev").html("");
    $("#lblTotalContacts").html("");
    if (contacttype == 0) {
    }
    else if (contacttype == 1) {
        $(".loadingMessage").html("Loading contact(s) from AMP");
        submitclick(page);
    }
    else if (contacttype == 2) {
        $(".loadingMessage").html("Loading recipient list(s) from AMP");
        loadAMPLists(0);
    }
    else if (contacttype == 3) {
        $(".loadingMessage").html("Loading smart list(s) from AMP");
        loadAMPLists(1);
    }
}

function loadMobileContacts() {
    // find all contacts
    var options = new ContactFindOptions();
    options.filter = "";
    filter = ["emails"];
    options.multiple = true;
    navigator.contacts.find(filter, onSuccess, onError, options);
}

function onSuccess(contacts) {
    $("#dataContent").html("");
    var current = "";

    for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].emails != null && contacts[i].displayName != null) {
            for (var j = 0; j < contacts[i].emails.length; j++) {
                var profileimage = "";
                current = current + "<div class='contact-list'>";
                current = current + "<div class='user-img'><img src='images/user-image.png'/></div> ";
                current = current + "<div class='user-details'><h6>" + contacts[i].displayName + "</h6><p type='email' style='pointer-events: none'>" + contacts[i].emails[j].value + "</p></div></div>";
            }
        }
    }

    if (current == "") {
        alert("No contacts found");
    }

    $("#dataContent").html("");
    $("#dataContent").html(current); // Appending Contacts in Content
    $("#pageLoader").hide();

}
// onError: Failed to get the contacts
function onError(contactError) {
    alert('onError!');
    $("#pageLoader").hide();
}

$(document).ready(function () {
    $('.option-listWrapper').hide();
    $('#contactTypeData').hide();
    $("#pageLoader").show();

    var Email = window.localStorage.getItem("EmailID");
    if (Email != "" && Email != null) {
        insertValue(Email);
    }
    localStorage.removeItem("EmailID");
    localStorage.removeItem("mobile");

    var inputBox = document.getElementById('inputRecipients');
    inputBox.addEventListener('input', function () {
        onKeyUp();
    }, false);

    // check session expiry
    var id = window.localStorage.getItem("ampID");
    var key = window.localStorage.getItem("ampkey");
    var install = window.localStorage.getItem("ampDomain");
    if (id == "" || key == "" || install == "" || id == null || key == null || install == null) {
        window.location = "login.html";
    }

    $('#mailEditor').hide();
});
//Function to hide tabs
function check() {
    page = 0;
    $("#contactTypeData").hide();
    $(".mainheading").html("COMPOSE EMAIL");
    $('.login-form').show();
}

//Function to select recipient for sending email
var finalemail = "";
$('.contact-list').live("click", function () {
    $(this).addClass("thisselected");

    var name = $(this).find('h6').text();
    var number = $(this).find('p[type="email"]').text();
    var listid = $(this).find('h6').attr('listid');
    var listdetails = name;

    if (contacttype == 0 || contacttype == 1) {
        number = $(this).find('p[type="email"]').text();
        listdetails = number;
        if (listdetails.length > 20) {
            listdetails = listdetails.substring(0, 18) + "..";
        }
        $('#dataDiv').find('span[value="' + number + '"]').remove();
    }
    else if (contacttype == 2 || contacttype == 3) {
        if (listdetails.length > 20) {
            listdetails = listdetails.substring(0, 18) + "..";
        }
        number = $(this).find('p[type="count"]').text();
        number = number.replace('contact(s)', '');
        listdetails += " ( " + number + " ) ";
        $('#dataDiv').find('span[value="' + listid + '"]').remove();
    }

    var textfield = $('#inputRecipients');
    var value = "";

    if (contacttype == 0 || contacttype == 1) {
        value = "<span value='" + number + "' type='" + contacttype + "' class='recipients' >" + listdetails + "&nbsp; <i onclick='javascript:removeRecip(this);' class='icon-remove-circle' style='font-size: 18px;' ></i></span>";
    }
    else if (contacttype == 2 || contacttype == 3) {
        value = "<span value='" + listid + "' type='" + contacttype + "' class='recipients' >" + listdetails + "&nbsp; <i onclick='javascript:removeRecip(this);' class='icon-remove-circle' class='recipClose' style='font-size: 18px;' ></i></span>";
    }

    $('#inputRecipients').remove();
    $('#dataDiv').append(value);
    $('#dataDiv').append(textfield);
    $('#inputRecipients').val('');
});

//Function to get selected recipint email id
$(".thisselected").live("click", function () {
    $(this).addClass("contact-list");
    $(this).removeClass("thisselected");

    var textfield = $('#inputRecipients');
    var name = $(this).find('h6').text();
    var number = $(this).find('p').text();
    var listid = $(this).find('h6').attr('listid');
    var listdetails = name + " - " + number;

    if (contacttype == 0 || contacttype == 1) {
        var number = $(this).find('p[type="email"]').text();
        $('#dataDiv').find('span[value="' + number + '"]').remove();
    }
    else if (contacttype == 2 || contacttype == 3)
        $('#dataDiv').find('span[value="' + listid + '"]').remove();

    $('#inputRecipients').val('');
    $('#inputRecipients').remove();
    $('#dataDiv').append(textfield);
});

$(document).ready(function () {
    $("#backpage").click(function (event) { //Function for back Button
        event.preventDefault();
        history.back(1);
    });
    templateid = getParameterByName("templateid");
    var id = localStorage.ampID;
    var key = localStorage.ampkey;
    var install = localStorage.ampDomain;

    var height = window.innerHeight;
    $("#content").css("max-height", height * 0.8);

    $.ajax({
        type: "GET",
        // ajax call for getting parsed email templates from server
        url: install + "/public/mobile.ashx?method=getparsedtemplateforgmail&templateid=" + templateid + "&id=" + id + "&key=" + key,
        success: function (tmp) {
            var obj = jQuery.parseJSON(tmp);
            $('#subject').val(obj.subjectline); // Template Name As a Subject Of email
            $('#emailbody').append(obj.pagehtml); // Template as a email body
            $("#pageLoader").hide();
        }
    });
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//Function for search contact pagination
function Nextcontacts() {
    //    var length = window.localStorage.getItem("length");
    //    if (length == 50) {
    page++;
    onSearch();
    //    }
    //    else if (length < 50) {
    //        return false;
    //    }
}
function Prevcontacts() {
    if (page != 0) {
        page--;
        onSearch();
    }
    else {
        return false;
    }
}
//Function to clear the search contact
function cleardiv() {
    //$("#dataContent").html("");
    $("#nextprev").html("");
    $('#txt_search').val('');
    //    var elements = document.getElementsByTagName("input");
    //    for (var ii = 0; ii < elements.length; ii++) {
    //        if (elements[ii].type == "text") {
    //            elements[ii].value = "";
    //        }
    //    }
}
//Function to get top 50 Contacts
function Getallcontacts() {
    $("#pageLoader").show();
    $("#nextprev").html("");
    var id = localStorage.ampID; // ID local storage
    var key = localStorage.ampkey; // Key local storage
    var install = localStorage.ampDomain; // Domain local storage
    $("#dataContent").html("");
    var currentmsg = "";
    var contacts = "";
    // Ajax call for Get all contacts
    var uri = install + "/public/mobile.ashx?method=getallcontacts&id=" + id + "&key=" + key;
    $.ajax({
        type: "GET",
        url: uri,
        success: function (name) {
            jsondata = eval('(' + name + ')');
            if (typeof (jsondata.error) == "string") {
                $("#pageLoader").hide();
                alert(jsondata.error);
            } else {
                var object = jsondata.object;
                for (var i = 0; i < jsondata.length; i++) {
                    if (jsondata[i].email != null && jsondata[i].email != "") {
                        var firstname = "";
                        if (jsondata[i].firstname != "") {
                            firstname = jsondata[i].firstname;
                        }
                        else {
                            firstname = "N/A";
                        }
                        var lastname = "";
                        if (jsondata[i].lastname != "") {
                            laststname = jsondata[i].lastname;
                        }
                        var profileimage = "";
                        if (jsondata[i].profileimage != null) {
                            profileimage = jsondata[i].profileimage.thumbnail;
                            currentmsg = currentmsg + "<div class='contact-list'>";
                            currentmsg = currentmsg + "<div class='user-img' style='text-align:center;'><img id='Profimage' src='" + profileimage + "'/></div> ";
                            currentmsg = currentmsg + "<div class='user-details'><h6>" + firstname + " " + lastname + "</h6><p type='email' style='pointer-events: none' >" + jsondata[i].email + "</p></div></div>";
                        }
                        else {
                            currentmsg = currentmsg + "<div class='contact-list'>";
                            currentmsg = currentmsg + "<div class='user-img'><img src='images/user-image.png' width='70' height='70'/></div> ";
                            currentmsg = currentmsg + "<div class='user-details'><h6>" + firstname + " " + lastname + "</h6><p type='email' style='pointer-events: none' >" + jsondata[i].email + "</p></div></div>";
                        }
                    }
                }

                if (currentmsg == "") {
                    alert("No contacts found");
                }

                $("#dataContent").html("");
                $("#dataContent").html(currentmsg); // Appending Contacts in Content1
                $("#pageLoader").hide();
            } //else
        },
        fail: function (msg) {
            $("#pageLoader").hide();
            alert('error'); //success
        }
    });
}
//Function to search Contact
var page = 0;
function submitclick(page) {
    $("#pageLoader").show();
    $("#nextprev").html("");
    var id = localStorage.ampID; // Id local storage
    var key = localStorage.ampkey; // Key local Storage
    var install = localStorage.ampDomain; // Domain local storage
    var currentmsg = "";
    var contacts = "";
    var ascending = "false";
    //var sortfield = "updatedon";
    var sortfield = "email";
    var pagesize = "50";
    //var page = "0";
    var searchVal = $.trim(document.getElementById('txt_search').value);
    if (searchVal != "") {
        //Ajax call for Search contacts
        var uri = install + "/public/mobile.ashx?method=searchcontactswithpaging&id=" + id + "&key=" + key + "&search=" + searchVal + "&page=" + page + "&pagesize=" + pagesize + "&sortfield=" + sortfield + "&ascending=" + ascending;
        $.ajax({
            type: "GET",
            url: uri,
            success: function (msg) {
                jsondata = eval('(' + msg + ')');
                if (typeof (jsondata.error) == "string") {
                    alert(jsondata.error);
                } else {
                    var object = jsondata.object;
                    var length = jsondata.item.length;
                    localStorage.setItem("length", length);

                    var current = "";
                    var contactCount = 0;

                    if (length == 50 && page == 0) {
                        var current = "";
                        //$('.nextprevbtn').css("margin-top", "-28px");
                        current = current + "<input type='button' id='next' value='Next 50 Contacts' class='btndone' onclick='Nextcontacts()'/>";
                    }
                    else if (length == 50 && page != 0) {
                        var current = "";
                        //$('.nextprevbtn').css("margin-top", "-28px");
                        current = current + "<input type='button' id='prev' value='Prev 50 Contacts' class='btndone' onclick='Prevcontacts()'/>";
                        current = current + "<input type='button' id='next' value='Next 50 Contacts' class='btndone' onclick='Nextcontacts()'/>";
                    }
                    else {
                        if (length != 50 && page == 0) {
                            var current = "";
                            //$('.nextprevbtn').css("margin-top", "5px");
                        }
                        else {
                            var current = "";
                            //$('.nextprevbtn').css("margin-top", "-28px");
                            current = current + "<input type='button' id='prev' value='Prev 50 Contacts' class='btndone' onclick='Prevcontacts()'/>";
                        }
                    }
                    for (var i = 0; i < jsondata.item.length; i++) {
                        if (jsondata.item[i].email != "" && jsondata.item[i].email != "") {
                            contactCount++;
                            var firstname = "";
                            if (jsondata.item[i].firstname != "") {
                                firstname = jsondata.item[i].firstname;
                            }
                            else {
                                firstname = "N/A";
                            }
                            var lastname = "";
                            if (jsondata.item[i].lastname != "") {
                                laststname = jsondata.item[i].lastname;
                            }
                            var profileimage = "";
                            if (jsondata.item[i].profileimage != null) {
                                profileimage = jsondata.item[i].profileimage.thumbnail;
                                currentmsg = currentmsg + "<div class='contact-list'>";
                                currentmsg = currentmsg + "<div class='user-img' style='text-align:center;'><img id='Profimage' src='" + profileimage + "'/></div>";
                                currentmsg = currentmsg + "<div class='user-details'><h6>" + firstname + " " + jsondata.item[i].lastname + "</h6><p type='email' style='pointer-events: none'>" + jsondata.item[i].email + "</p></div></div></div>";
                            }
                            else {
                                currentmsg = currentmsg + "<div class='contact-list'>";
                                currentmsg = currentmsg + "<div class='user-img' style='text-align:center;'><img src='images/user-image.png'/></div>";
                                currentmsg = currentmsg + "<div class='user-details'><h6>" + firstname + " " + jsondata.item[i].lastname + "</h6><p type='email' style='pointer-events: none'>" + jsondata.item[i].email + "</p></div></div></div>";
                            }
                        }
                    }
                    if (currentmsg == "") {
                        alert("No Contact Found");
                    }

                    if (contactCount != 50) {
                        current = "";
                        if (page != 0)
                            current = "<input type='button' id='prev' value='Prev 50 contacts' class='btndone' onclick='Prevcontacts()'/>";
                        $(".nextprevbtn").html(current);
                    }
                    else
                        $(".nextprevbtn").html(current);

                    $("#dataContent").html(currentmsg); // Appending Contacts
                    $("#pageLoader").hide();
                } //return false;
            },
            fail: function (msg) {
                alert('error');
                $("#pageLoader").hide();
            }
        });
    }
    else {
        $("#pageLoader").hide();
    }
}
//Function for Discard email Button
$('#cancel').live("click", function (e) {
    e.preventDefault();
    var dialog = $('<div class="DialogBox"><p>This email will be discarded and cannot be recovered. Are you sure you want to discard it?</p></div>').dialog({
        buttons: {
            "Yes": function () {
                var elements = document.getElementsByTagName("input");
                for (var ii = 0; ii < elements.length; ii++) {
                    if (elements[ii].type == "text" || elements[ii].type == "email") {
                        elements[ii].value = "";
                    }
                    $("#emailbody").html("");
                    window.location = "email-template.html";
                }
            },
            "Cancel": function () {
                dialog.dialog('close');
            }
        }
    });
});

//Function to clear the email page after sending email
function cancel() {
    var elements = document.getElementsByTagName("input");
    for (var ii = 0; ii < elements.length; ii++) {
        if (elements[ii].type == "text" || elements[ii].type == "email") {
            elements[ii].value = "";
        }
        $("#emailbody").html("");
        window.location = "email-template.html";
    }
}
function loadOptions() {
    $("#nextprev").html("");
    $("#lblTotalContacts").html("");
    //$('#chooseContactType').live('click', function () {
    var options = $('#contactTypeList').find('.option-listWrapper');
    $(options).slideDown();
    $('#contactTypeList').find('.option-listWrapper .option-list ul li').click(function () {
        var optlist_val = $(this).text();
        var optlist_value = $(this).attr('value');
        unBindAllOptions();
        $(options).slideUp();

        $('.search-box').show();

        $('#txt_search').val('');
        page = 0;

        if (optlist_value == 0) {
            $('.search-box').hide();
            loadMobileContacts();
            $(".mainheading").html("SELECT PHONE CONTACT(S)");
        }
        else if (optlist_value == 1) {
            $(".loadingMessage").html("Loading contact(s) from AMP");
            $(".mainheading").html("SELECT AMP CONTACT(S)");
            Getallcontacts();
        }
        else if (optlist_value == 2) {
            $(".loadingMessage").html("Loading recipient list(s) from AMP");
            $(".mainheading").html("SELECT AMP RECIPIENT LIST(S)");
            loadAMPLists(0);
        }
        else if (optlist_value == 3) {
            $(".loadingMessage").html("Loading smart list(s) from AMP");
            $(".mainheading").html("SELECT AMP SMART LIST(S)");
            loadAMPLists(1);
        }

        contacttype = optlist_value;

        $('.login-form').hide();
        $("#contactTypeData").show();

    });
    //});
}

function unBindAllOptions() {
    $('#contactTypeList').find('.option-listWrapper .option-list ul li').unbind('click');
}

function loadAMPLists(type) {
    $("#pageLoader").show();
    var id = localStorage.ampID; // ID local storage
    var key = localStorage.ampkey; // Key local storage
    var install = localStorage.ampDomain; // Domain local storage
    $("#dataContent").html("");
    var currentmsg = "";
    var contacts = "";

    var search = $.trim($('#txt_search').val());
    if (typeof (search) == undefined)
        search = "";

    // Ajax call for Get all contacts
    var uri = install + "/public/mobile.ashx?method=getalllists&id=" + id + "&key=" + key + "&type=" + type + "&mediatype=email&pagenumber=" + page + "&search=" + search;
    $.ajax({
        type: "GET",
        url: uri,
        success: function (name) {
            jsondata = eval('(' + name + ')');
            if (typeof (jsondata.error) == "string") {
                $("#pageLoader").hide();
                alert(jsondata.error);
            } else {
                var object = jsondata.data;
                $('#lblTotalContacts').html("Total : " + jsondata.total);
                showHideNextPrev(jsondata.data.length, page);
                for (var i = 0; i < jsondata.data.length; i++) {

                    var name = jsondata.data[i].name; ;
                    var description = jsondata.data[i].description;
                    var count = jsondata.data[i].totalemailcount;

                    if (description == null)
                        description = "";

                    if (name.length > 35)
                        name = name.substring(0, 32) + "...";

                    if (description.length > 35)
                        description = description.substring(0, 32) + "...";

                    if (count != 0 && count != undefined) {
                        currentmsg = currentmsg + "<div class='contact-list'>";
                        currentmsg = currentmsg + "<div class='user-img'><i class='icon-group icon-4x'></i></div>";
                        currentmsg = currentmsg + "<div class='user-details'><h6 listid='" + jsondata.data[i].id + "'>" + name + "</h6><p type='description'>" + description + "</p><p type='count'>" + jsondata.data[i].totalemailcount + " contact(s)</p></br></div></div>";
                    }

                }

                if (currentmsg == "")
                    alert("No list found");


                $("#dataContent").html("");
                $("#dataContent").html(currentmsg);
                $("#pageLoader").hide();
            } //else
        },
        fail: function (msg) {
            $("#pageLoader").hide();
            alert('error'); //success
        }
    });
}

function showHideNextPrev(length, page) {
    if (length == 50 && page == 0) {
        var current = "";
        //$('.nextprevbtn').css("margin-top", "-28px");
        current = current + "<input type='button' id='next' value='Next 50 Lists' class='btndone' onclick='Nextcontacts()'/>";
    }
    else if (length == 50 && page != 0) {
        var current = "";
        //$('.nextprevbtn').css("margin-top", "-28px");
        current = current + "<input type='button' id='prev' value='Prev 50 Lists' class='btndone' onclick='Prevcontacts()'/>";
        current = current + "<input type='button' id='next' value='Next 50 Lists' class='btndone' onclick='Nextcontacts()'/>";
    }
    else {
        if (length != 50 && page == 0) {
            var current = "";
            //  $('.nextprevbtn').css("margin-top", "5px");
        }
        else {
            var current = "";
            //$('.nextprevbtn').css("margin-top", "-28px");
            current = current + "<input type='button' id='prev' value='Prev 50 Lists' class='btndone' onclick='Prevcontacts()'/>";
        }
    }
    $(".nextprevbtn").html(current);
}

//Cancel Image on Dropdown click Event
$('.option-listWrapper .option-list header h6 img').live('click', function () {
    $('.option-listWrapper').hide();
});

function insertValue(text) {
    var textfield = $('#inputRecipients');
    var displayValue = text;

    if (displayValue.length > 25) {
        displayValue = displayValue.substring(0, 25) + "...";
    }

    var value = "<span value='" + text + "' type='0' class='recipients' >" + displayValue + "&nbsp; <i onclick='javascript:removeRecip(this);' class='icon-remove-circle' class='recipClose' style='font-size: 18px;' ></i></span>";
    $('#inputRecipients').remove();
    $('#dataDiv').append(value);
    $('#dataDiv').append(textfield);
    $('#inputRecipients').val('');
    $('#inputRecipients').focus();
}

function removeRecip(span) {
    $(span).parent().remove();
}

function focusText() {
    $('#inputRecipients').focus();
}

function onKeyUp() {
    var errorMsg = "";
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    var textfield = $('#inputRecipients');
    var text = $.trim($(textfield).val());
    if (text != "" && text.indexOf(';') == text.length - 1) {
        text = text.replace(';', '');
        text = text.replace(' ', '');
        text = $.trim(text);
        if (!filter.test(text)) {
            if (text != "") {
                errorMsg = errorMsg + " " + text;
            }
        }
        else
            insertValue(text);
    }

    if (errorMsg != "") {
        alert("Invalid email :" + errorMsg);
    }
}

function sendemail() {
    $("#pageLoader").show();
    templateid = getParameterByName("templateid");
    var id = localStorage.ampID; // ID local storage
    var key = localStorage.ampkey; // Key local storage
    var install = localStorage.ampDomain; // Domain local Storage
    var subject = $("#subject").val();

    var errorMsg = "";
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (subject == null || subject == "") {
        alert("Please Enter Subject");
        $("#pageLoader").hide();
    }

    var textfield = $('#inputRecipients');
    var text = $.trim($(textfield).val());

    if (text != null && text == "");
    {
        if (text != "" && text.indexOf(';') == text.length - 1) {
            text = text.replace(';', '');
            text = text.replace(' ', '');
        }
        if (!filter.test(text)) {
            if (text != "") {
                errorMsg = errorMsg + " " + text;
            }
        }
        else
            insertValue(text);
    }

    if (errorMsg != "") {
        alert("Invalid emails :" + errorMsg);
        $("#pageLoader").hide();
        $("#inputRecipients").focus();
        return false;
    }

    var text = $('#smsText').html();
    var allRecipients = $('#dataDiv').find('span');

    if (allRecipients == null || allRecipients.length == 0) {
        alert("Please Enter Recipients");
        $("#pageLoader").hide();
        return false;
    }

    var allMobileRecipients = "";
    var allListRecipients = "";
    for (var k = 0; k < allRecipients.length; k++) {
        var recip = allRecipients[k];
        var type = $(recip).attr('type');
        var value = $(recip).attr('value');
        if (type == "0" || type == "1") {
            if (allMobileRecipients == "") allMobileRecipients += value; else allMobileRecipients += "," + value;
        }
        else if (type == "2" || type == "3") {
            if (allListRecipients == "") allListRecipients += value; else allListRecipients += "," + value;
        }
    }

    var r = confirm('Following email "' + subject + '" will be sent.\n\n Are you sure you want to send it?');
    if (r == false) {
        $("#pageLoader").hide();
        return false;
    }

    if (allMobileRecipients != "" && allMobileRecipients.split(',').length == 1 && allRecipients.length == 1) {
        r = confirm('Do you want to send this email through your gmail account?\n Note: If u select cancel then email will be sent via AMP.');
        if (r == true) {
            window.localStorage.setItem("gmail_to", $(allRecipients[0]).attr('value'));
            window.localStorage.setItem("subject", encodeURIComponent(subject));
            window.localStorage.setItem("templateid", templateid);
            sendbygmail($(allRecipients[0]).attr('value'));
            return false;
        }
    }
    //Ajax call for sending Email Templates
    var uri = install + "/public/mobile.ashx?method=sendemail&id=" + id + "&key=" + key + "&to=" + encodeURIComponent(allMobileRecipients) + "&lists=" + encodeURIComponent(allListRecipients) + "&subject=" + encodeURIComponent(subject) + "&templateid=" + templateid;
    $.ajax({
        type: "POST",
        url: uri,
        data: escape($('#emailbody').html()),
        success: function (name) {
            jsondata = eval('(' + name + ')');
            if (typeof (jsondata.error) == "string") {

            } else {
                alert('Email Sent Successfully');
                $("#pageLoader").hide();
                cancel();
            }
        },
        fail: function (msg) {
            alert('error'); //success
            $("#pageLoader").hide();
        }
    });
}

function openmaileditor(e) {
    $('#mailEditor').show();
    $('#mailEditor #content').html($(e).html());
}

function discardChanges() {
    var r = confirm("All changes will be discarded. Are you sure you want to discard?");
    if (r)
        saveedit(false);
}

function saveedit(e) {
    if (e) {
        $('#emailbody').html($('#mailEditor #content').html());
    }
    $('#mailEditor').hide();
}

function sendbygmail(to) {
    var templateid = getParameterByName("templateid");
    var id = localStorage.ampID; // ID local storage
    var key = localStorage.ampkey; // Key local storage
    var install = localStorage.ampDomain; // Domain local Storage
    uri = install + "/public/mobile.ashx?method=createmedia&id=" + id + "&key=" + key + "&to=" + to + "&templateid=" + templateid + "&subject=" + encodeURIComponent($("#subject").val());
    $.ajax({
        type: "POST",
        url: uri,
        data: escape($('#emailbody').html()),
        success: function (jsondata) {
            //jsondata = eval('(' + name + ')');
            if (typeof (jsondata.error) == "string") {

            } else {
                var mediaid = eval('(' + jsondata + ')').mediaid;
                window.localStorage.setItem('mediaid', mediaid)
                window.location.href = 'redirector.html';
            }
        },
        fail: function (msg) {
            alert('error'); //success
            $("#pageLoader").hide();
        }
    });

}

﻿//JS file For Dashboard
$(document).ready(function () {
    checkValue();
    // check session expiry
    var id = window.localStorage.getItem("ampID");
    var key = window.localStorage.getItem("ampkey");
    var install = window.localStorage.getItem("ampDomain");
    if (id == "" || key == "" || install == "" || id == null || key == null || install == null) {
        window.location = "login.html";
    }
    // By default FEEDS selected option in option list
    var feedobj = $("#a a");
    Feeds(feedobj);
    $("#backpage").click(function (event) {
        event.preventDefault();
        history.back(1);
    });
    $('.option-list').hide();
    $('.settings-list-box').hide();
    $('.refresh').click(function () {
        $('.loadingMessage').html('Loading Feed from AMP Server');
        Feeds(feedobj);
    });
    $('.list-btn').click(function () {
        $('.icon-list-settings').attr("isShown", "1")
        $('.settings-list-box').slideUp();
        //updateOptions();
        var isShown = $('.list-btn').attr("isShown");
        if (isShown == "1") {
            $('.list-btn').attr("isShown", "2");
            $('.option-list').slideDown();
        }
        if (isShown == "2") {
            $('.list-btn').attr("isShown", "1");
            $('.option-list').slideUp();
        }
    });
    $('.btn-div .btn').click(function () {
        $('.option-list').slideUp();
    });
    $('.icon-list-settings').click(function () {
        $('.list-btn').attr("isShown", "1");
        $('.option-list').slideUp();

        var isShown = $('.icon-list-settings').attr("isShown");
        if (isShown == "1") {
            $('.icon-list-settings').attr("isShown", "2")
            $('.settings-list-box').slideDown();
        }
        if (isShown == "2") {
            $('.icon-list-settings').attr("isShown", "1")
            $('.settings-list-box').slideUp();
        }
    });
    $('.settings-list-box .btn').click(function () {
        $('.settings-list-box').slideUp();
    });
    $('.settings-list-box .a').click(function () {
        $('.settings-list-box').slideUp();
    });
    $('.settings-list-box .signout-btn').click(function () {
        $('.settings-list-box').slideUp();
    });
});

function updateOptions() {
    if (localStorage.feedSet == "off") {
        $('#a').hide();
    }
    else if (localStorage.feedSet == "on" || localStorage.feedSet == "" || localStorage.feedSet == undefined) {
        $('#a').show();
    }
    if (localStorage.activeSet == "off") {
        $('#b').hide();
    }
    else if (localStorage.activeSet == "on" || localStorage.activeSet == "" || localStorage.activeSet == undefined) {
        $('#b').show();
    }
    if (localStorage.anonymousSet == "off") {
        $('#c').hide();
    }
    else if (localStorage.anonymousSet == "on" || localStorage.anonymousSet == "" || localStorage.anonymousSet == undefined) {
        $('#c').show();
    }
}

$('.articles .keyword a').live("click", function () {
    e.preventDefault();
});


//Function to remove the selected class
function unselect() {
    $('article').removeClass('selected');
}
//Function to click event on feeds
$('.articles').live("click", function () {
    $('.loadingMessage').html('Loading contact details from AMP');
    unselect();
    $(this).addClass("selected");
    $("#emailconatct").removeClass('deactivate');
    $("#call").removeClass('deactivate');
    $("#check").removeClass('deactivate');
    $("#emailconatct").css('pointer-events', '');
    $("#call").css('pointer-events', '');
    $("#check").css('pointer-events', '');
    var fname = $(this).next().find('#fname').text();
    var lname = $(this).next().find('#lname').text();
    var contorigin = $(this).next().find('#origin').text();
    var Continterest = $(this).next().find('#interest').text();
    var contlastactive = $(this).next().find('#lastactivity').text();
    var contscore = $(this).next().find('#score').text();
    var workNumber = $(this).next().find('#worknumber').text();
    localStorage.setItem("first", fname);
    localStorage.setItem("last", lname);
    localStorage.setItem("contactorigin", contorigin);
    localStorage.setItem("contactinterest", Continterest);
    localStorage.setItem("Intereststatus", Continterest);
    localStorage.setItem("contactlastactivity", contlastactive);
    localStorage.setItem("contactscore", contscore);
    var Contactid = $(this).next().find('#cid').text();
    localStorage.setItem("contactID", Contactid);
    var Emailid = $(this).next().find('#emailid').text();
    localStorage.setItem("emailID", Emailid);
    localStorage.setItem("Email", Emailid);
    var mobile = $(this).next().find('#mobile').text();
    localStorage.setItem("mobile", mobile);
    if (Emailid != "") {
        submitclick(0);
    }
    else {
        //        $("#emailconatct").addClass('deactivate');
        //        $("#emailconatct").css('pointer-events', 'none');
        //        $("#smscontact").addClass('deactivate');
        //        $("#smscontact").css('pointer-events', 'none');
        //        $("#call").addClass('deactivate');
        //        $("#call").css('pointer-events', 'none');
        //        $("#check").addClass('deactivate');
        //        $("#check").css('pointer-events', 'none');
        valueAssign();
    }
    enableDisablePopups(Emailid, mobile, workNumber);
});

function closeOptions() {
    $('.ActionbWrapeer').hide();
    resetValues();
}

function resetValues() {
    localStorage.removeItem("EmailID");
    localStorage.removeItem("mobile");
}

function enableDisablePopups(email, mobile, worknumber) {
    $("#emailconatct").addClass('deactivate');
    $("#emailconatct").css('pointer-events', 'none');
    $("#smscontact").addClass('deactivate');
    $("#smscontact").css('pointer-events', 'none');
    $("#call").addClass('deactivate');
    $("#call").css('pointer-events', 'none');
    $("#check").addClass('deactivate');
    $("#check").css('pointer-events', 'none');

    if (email != "" && email != null && email != undefined && email != "undefined") {
        $("#emailconatct").removeClass('deactivate');
        $("#emailconatct").addClass('activate');
        $("#emailconatct").css('pointer-events', '');

        $("#check").removeClass('deactivate');
        $("#check").addClass('activate');
        $("#check").css('pointer-events', '');
    }
    if (mobile != "" && mobile != null && mobile != undefined && mobile != "undefined") {
        $("#smscontact").removeClass('deactivate');
        $("#smscontact").addClass('activate');
        $("#smscontact").css('pointer-events', '');
    }
    if (worknumber != "" && worknumber != null && worknumber != undefined && worknumber != "undefined") {
        $("#call").removeClass('deactivate');
        $("#call").addClass('activate');
        $("#call").css('pointer-events', '');
    }
}


//Function on click event of anonymous
$('.redirection').live("click", function () {
    unselect();
    $(this).addClass("selected");
    var email = $(this).find('h4').text();
    email = email.substring(0, email.indexOf(' '));
    window.open('http://www.' + email, '_blank', 'location=yes');
});
//Function to assign values using localstorage
function valueAssign() {
    var email = window.localStorage.getItem("emailID");
    if (email != "") {
        var feedContactSelectedData = $("#content").find(".selected").next();
        var worknumber = $('#info').find('.contact-list').next().find('#worknumber').text();
        var firstname = window.localStorage.getItem("first");
        var lastname = window.localStorage.getItem("last");
        var interest = $('#info').find('.contact-list').next().find('#interesttype').text();
        var company = $('#info').find('.contact-list').next().find('#company1').text();
        var score = window.localStorage.getItem("contactscore");
        var origin = window.localStorage.getItem("contactorigin"); ;
        var lastactivity = $('#info').find('.contact-list').next().find('#lastactivity').text();
        var lead = $('#info').find('.contact-list').next().find('#leadsource').text();
        var stage = $('#info').find('.contact-list').next().find('#stage').text();
        var contacttype = $('#info').find('.contact-list').next().find('#contacttype').text();
        var industrytype = $('#info').find('.contact-list').next().find('#industrytype').text();
        var newemail = email;
        var ProfileImage = $('#info').find('.contact-list').next().find('#profileimage').text();
        localStorage.setItem("profile", ProfileImage);
        localStorage.setItem("FirstName", firstname);
        localStorage.setItem("LastName", lastname);
        localStorage.setItem("Intereststatus", interest);
        localStorage.setItem("ContactType", contacttype);
        localStorage.setItem("IndustryType", industrytype);
        localStorage.setItem("Number", worknumber);
        localStorage.setItem("company", company);
        localStorage.setItem("source", lead);
        localStorage.setItem("stage", stage);
        localStorage.setItem("score", score);
        localStorage.setItem("Email", newemail);
    }
    else {
        $('.ActionbWrapeer').css("display", "block");
        var firstname = window.localStorage.getItem("first");
        var lastname = window.localStorage.getItem("last");
        var newemail = "No Email Method";
        var lastactivity = window.localStorage.getItem("contactlastactivity");
        var score = window.localStorage.getItem("contactscore");
        var interest = window.localStorage.getItem("contactinterest");
        var origin = window.localStorage.getItem("contactorigin");
        var company = "";
        var ProfileImage = "";
    }
    $("#userstat").html("");
    var current = "";
    if (company != "") {
        company = company;
    }
    else {
        company = "No Company";
    }
    if (firstname != "") {
        firstname = firstname;
    }
    else {
        firstname = "N/A";
    }
    if (ProfileImage === "") {
        current = current + "<div class='float-left'><div class='user-img'><img src='images/user-iconBig.png' height='64' width='64'></div></div>";
    }
    else {
        current = current + "<div class='float-left'><div class='user-img'><img src='" + ProfileImage + "'height='auto' width='64'></div></div>";
    }
    current = current + "<div class='float-left UserDetails'>";
    current = current + "<h5>" + firstname + " " + lastname + "</h5><p style='color:#70A4D3;'>" + newemail + "</p><p><span>" + company + "</span></p></div>";
    $("#userstat").html("");
    $("#userstat").html(current);

    $("#stat").html("");
    var current = "";
    if (lastactivity == "null" || lastactivity == "") {
        lastactivity = "INACTIVE";
    }
    else {
        var date = new Date(lastactivity);
        var newdate = date.toISOString()
        lastactivity = prettyDate(newdate);
    }
    if (interest == "") {
        var intereststatus = window.localStorage.getItem("contactinterest");
        interest = intereststatus;
    }
    if (origin == "Anonymous Tracking") { origin == "Anonymous"; }
    current = current + "<div class='SomeINfo'>";
    current = current + "<ul><li><b>Score : </b><span style='font-size: 12px;'>" + score + "</span></li><li><b>Interest Status : </b><span style='font-size: 12px;'>" + interest + "</span></li><li><b>Last Activity : </b><span style='font-size: 12px;'>" + lastactivity + "</span></li><li><b>Origin : </b><span style='font-size: 12px;'>" + origin + "</span></li></ul></div>";
    $("#stat").html("");
    $("#stat").html(current);
}
//Function on clicking edit contact
function editcontact() {
    window.location = "Editcontact.html";
}
//Function on clicking email contact
function emailcontact() {
    var Email = window.localStorage.getItem("Email");
    localStorage.setItem("EmailID", Email);
    window.location = "email-template.html";
}
//Function on clicking email contact
function smscontact() {
    var mobile = window.localStorage.getItem("mobile");
    localStorage.setItem("mobile", mobile);
    window.location = "sms-template.html";
}
//Function on clicking call contact
function call() {
    //var phoneNumber = window.localStorage.getItem("Number");
    var phoneNumber = window.localStorage.getItem("Number");
    if (phoneNumber != null && phoneNumber != "") {
        $('.ActionbWrapeer').hide();
        document.location.href = "tel:" + phoneNumber;
        resetValues();
    }
    else { alert("Sorry No Number Found"); }
}
//Function on clicking cancel
$(".cancel").live("click", function () {
    $('.ActionbWrapeer').hide();
});
//Function on clicking view report
$('.Viewreport').live("click", function () {
    $('.ActionbWrapeer, .main-wrapper').css("display", "none");
    $('.Contact-Details').css("display", "block");
});
//Function on clicking cancel image of view report
$('.Contact-Details h4 a').live("click", function () {
    $('.Contact-Details').css("display", "none");
    $('.main-wrapper').css("display", "block");

});
//Function to remove selectes class
function unselectAll() {
    $('#Dashboardtype li a').removeClass('selected');
}
//<---------------------feeds--------------------->
function Feeds(Selected_id) {
    $("#pageLoader").show();
    $(".loadingMessage").html("Loading Feed from AMP Server");
    unselectAll();
    $(Selected_id).addClass('selected');
    $('.option-list').slideUp();
    $('.settings-list-box').slideUp();
    $('#heading').html("Feeds");
    var id = localStorage.ampID; // ID local Storage
    var key = localStorage.ampkey; // Key local storage
    var install = localStorage.ampDomain; // Domain local storage
    $("#content").html("");
    //Ajax call for Dashboard feeds
    var uri = install + "/public/mobile.ashx?method=dashboard&id=" + id + "&key=" + key ;
    $.ajax({
        type: "GET",
        url: uri,
        success: function (msg) {
            jsondata = eval('(' + msg + ')');
            if (typeof (jsondata.error) == "string") {
                alert(jsondata.error);
            } else {
                if (jsondata.feed.items.length == 0) {
                    var currentmsg = "";
                    $("#content").html("");
                    $("#content").html(currentmsg); // Appending Feeds In content
                    $("#pageLoader").hide();
                }
                else {

                    var feed = jsondata.feed;
                    var currentmsg = "";
                    for (var i = 0; i < jsondata.feed.items.length; i++) {
                        var date = new Date(feed.items[i].when);
                        var newdate = date.toISOString()
                        var intstatus = feed.items[i].interest;
                        var intereststatus = intstatus.toString();
                        var interestclr = '<i style="font-size:0.8em;" class="icon-circle intereststatus-' + intereststatus.replace(" ", "") + '" title="' + feed.items[i].interest + '"></i>';
                        currentmsg = currentmsg + "<article class='articles'>" + interestclr + "<span class='keywordspan' style='font-size: 0.9em; margin-left: 5px;'>" + feed.items[i].msg + "</span>";
                        currentmsg = currentmsg + "<h5><span><strong> Visited: </strong>" + prettyDate(newdate) + "</span></h5>";
                        currentmsg = currentmsg + "</article><div style='display:none'><span id='emailid'>" + feed.items[i].email + "</span><span id='cid'>" + feed.items[i].id + "</span><span id='score'>" + feed.items[i].score + "</span><span id='origin'>" + feed.items[i].origin + "</span><span id='lastactivity'>" + feed.items[i].lastactivity + "</span><span id='interest'>" + feed.items[i].interest + "</span><span id='fname'>" + feed.items[i].firstname + "</span><span id='lname'>" + feed.items[i].lastname + "</span><span id='mobile'>" + feed.items[i].mobile + "</span><span id='worknumber'>" + feed.items[i].workphone + "</span></div>";
                        if (i == 24)
                            break;
                    }
                    $("#content").html("");
                    $("#content").html(currentmsg); // Appending Feeds In content
                    $("#pageLoader").hide();
                }
            } //else
        },
        fail: function (msg) {
            $("#pageLoader").hide();
            alert('error'); //success
        }
    });
}

// <---------------------active leads--------------------->
function Active_leads(Selected_id) {
    $("#pageLoader").show();
    $(".loadingMessage").html("Loading Feed from AMP Server");
    unselectAll();
    $(Selected_id).addClass('selected');
    $('.option-list').slideUp();
    $('.settings-list-box').slideUp();
    $('#heading').html("Active Leads");
    var id = localStorage.ampID; // ID local storage
    var key = localStorage.ampkey; // Key local storage
    var install = localStorage.ampDomain; // Domain local storage
    $("#content").html("");
    var currentmsg = "";
    // Ajax call for Dashboard active leads
    var uri = install + "/public/mobile.ashx?method=dashboard&id=" + id + "&key=" + key + "&dataType=2";
    $.ajax({
        type: "GET",
        url: uri,
        success: function (id) {
            jsondata = eval('(' + id + ')');
            if (typeof (jsondata.error) == "string") {
                alert(jsondata.error);
            } else {
                var active = jsondata.active;
                for (var i = 0; i < jsondata.active.length; i++) {
                    var intstatus = active[i].intereststatus;
                    var intereststatus = intstatus.toString();
                    var interestclr = '<i style="font-size:0.8em;" class="icon-circle intereststatus-' + intereststatus.replace(" ", "") + '" title="' + active[i].intereststatus + '"></i>';
                    currentmsg = currentmsg + "<article class='articles'>" + interestclr + "<span class='keywordspan'><span class='keyword' style='font-size: 0.9em; margin-left: 5px;'>" + active[i].fullname + "</span></span>";
                    currentmsg = currentmsg + "</article><div style='display:none'><span id='emailid'>" + active[i].email + "</span><span id='cid'>" + active[i].id + "</span><span id='score'>" + active[i].score + "</span><span id='origin'>" + active[i].origin + "</span><span id='lastactivity'>" + active[i].lastactivity + "</span><span id='interest'>" + active[i].interest + "</span><span id='fname'>" + active[i].firstname + "</span><span id='lname'>" + active[i].lastname + "</span></div>";
                }
                $("#content").html("");
                $("#content").html(currentmsg); // Appending active leads In content
                $("#pageLoader").hide();
            } //else
        },
        fail: function (id) {
            $("#pageLoader").hide();
            alert('error'); //success
        }
    });
}

// <---------------------anonymous--------------------->
function Anonymous(Selected_id) {
    $("#pageLoader").show();
    $(".loadingMessage").html("Loading Feed from AMP Server");
    unselectAll();
    $(Selected_id).addClass('selected');
    $('.option-list').slideUp();
    $('.settings-list-box').hide();
    $('#heading').html("Anonymous");
    var id = localStorage.ampID; // ID local storage
    var key = localStorage.ampkey; // Key local storage
    var install = localStorage.ampDomain; // Domain local storage
    $("#content").html("");
    //Ajax call for Dashboard anonymous
    var uri = install + "/public/mobile.ashx?method=dashboard&id=" + id + "&key=" + key + "&dataType=3";
    $.ajax({
        type: "GET",
        url: uri,
        success: function (name) {
            jsondata = eval('(' + name + ')');
            if (typeof (jsondata.error) == "string") {
                alert(jsondata.error);
            } else {
                var anonymous = jsondata.anonymous;
                var currentmsg = "";
                for (var i = 0; i < jsondata.anonymous.length; i++) {
                    var date = new Date(anonymous[i].lastactivity);
                    var newdate = date.toISOString()
                    currentmsg = currentmsg + "<article class='redirection'>";
                    currentmsg = currentmsg + "<h4>" + anonymous[i].name + "<span><strong> Visited: </strong>" + prettyDate(newdate) + "</span></h4>";
                    currentmsg = currentmsg + "<p></p></article>";
                }
                $("#content").html("");
                $("#content").html(currentmsg); // Appending anonymous in content
                $("#pageLoader").hide();
            } //else
        },
        fail: function (msg) {
            $("#pageLoader").hide();
            alert('error'); //success
        }
    });
}
//Function for getting contact details by using serachcontact
var page = 0;
function submitclick(page) {
    $("#pageLoader").show();
    $(".loadingMessage").html("Loading selected contact details");
    var id = localStorage.ampID; // Id local storage
    var key = localStorage.ampkey; // Key local Storage
    var install = localStorage.ampDomain; // Domain local storage
    var currentmsg = "";
    var contacts = "";
    var ascending = "false";
    var sortfield = "updatedon";
    var pagesize = "50";
    var searchVal = window.localStorage.getItem("emailID");
    //Ajax call for Search contacts
    var uri = install + "/public/mobile.ashx?method=searchcontactswithpaging&id=" + id + "&key=" + key + "&search=" + searchVal + "&page=" + page + "&pagesize=" + pagesize + "&sortfield=" + sortfield + "&ascending=" + ascending;
    $.ajax({
        type: "GET",
        url: uri,
        success: function (msg) {
            jsondata = eval('(' + msg + ')');
            if (typeof (jsondata.error) == "string") {
                alert(jsondata.error);
            } else {
                var object = jsondata.object;
            }
            for (var i = 0; i < jsondata.item.length; i++) {
                var firstname = "";
                if (jsondata.item[i].firstname != "") {
                    firstname = jsondata.item[i].firstname;
                }
                else {
                    firstname = "N/A";
                }
                var lastname = "";
                if (jsondata.item[i].lastname != "") {
                    laststname = jsondata.item[i].lastname;
                }
                var profileimage = "";
                if (jsondata.item[i].profileimage != null) {
                    profileimage = jsondata.item[i].profileimage.thumbnail;
                }
                currentmsg = currentmsg + "<div class='contact-list'>";
                currentmsg = currentmsg + "<div class='user-img'><img src='" + profileimage + "'width='70' height='70'/></div>";
                currentmsg = currentmsg + "<div class='user-details'><h6>" + firstname + " " + jsondata.item[i].lastname + "</h6><p>" + jsondata.item[i].email + "</br>" + jsondata.item[i].worknumber + "</p></div></div></div><div><span id='email'>" + jsondata.item[i].email + "</span><span id='fname'>" + firstname + "</span><span id='lname'>" + jsondata.item[i].lastname + "</span><span id='worknumber'>" + jsondata.item[i].worknumber + "</span></span><span id='mobilenumber'>" + jsondata.item[i].mobilenumber + "</span><span id='interesttype'>" + jsondata.item[i].intereststatus + "</span><span id='contacttype'>" + jsondata.item[i].contacttype + "</span><span id='industrytype'>" + jsondata.item[i].industrytype + "</span><span id='score'>" + jsondata.item[i].score + "</span><span id='lastactivity'>" + jsondata.item[i].lastactivity + "</span><span id='origin'>" + jsondata.item[i].origin + "</span><span id='company1'>" + jsondata.item[i].contactcompany + "</span><span id='leadsource'>" + jsondata.item[i].leadsource + "</span><span id='stage'>" + jsondata.item[i].stage + "</span><span id='profileimage'>" + profileimage + "</span><span id='workNumber'>" + jsondata.item[i].worknumber + "</span></div>";
            }
            $("#info").html("");
            $("#info").html(currentmsg);
            $("#pageLoader").hide();
            valueAssign();
            $('.ActionbWrapeer').css("display", "block");
        },
        fail: function (msg) {
            alert('error');
        }
    });
}
//Function for contact feeds
function ContactFeeds() {
    var id = localStorage.ampID; // ID local Storage
    var key = localStorage.ampkey; // Key local storage
    var install = localStorage.ampDomain; // Domain local storage
    var cid = window.localStorage.getItem("contactID");
    $("#feed").html("");
    if (cid != "" || cid != null) {
        //Ajax call for Dashboard feeds
        var uri = install + "/public/mobile.ashx?method=getcontactfeed&id=" + id + "&key=" + key + "&cid=" + cid;
        $.ajax({
            type: "GET",
            url: uri,
            success: function (msg) {
                jsondata = eval('(' + msg + ')');
                if (typeof (jsondata.error) == "string") {
                    alert(jsondata.error);
                } else {
                    var msg = jsondata;
                    var currentmsg = "";
                    for (var i = 0; i < jsondata.length; i++) {
                        var date = new Date(msg[i].when);
                        var newdate = date.toISOString()
                        currentmsg = currentmsg + "<article>";
                        currentmsg = currentmsg + "<span style='font-size:0.9em; display:block;'>" + msg[i].msg + "</span>";
                        currentmsg = currentmsg + "<p> Visited:" + prettyDate(newdate) + "<p></article>";
                    }
                    $("#feed").html("");
                    if (currentmsg == "") { $("#feed").html("No Contact Feeds"); }
                    else {
                        $("#feed").html(currentmsg);
                    } // Appending Feeds In content
                } //else
            },
            fail: function (msg) {
                alert('error'); //success
            }
        });
    }
}

;(function($) {

    "use strict";

    $.fn.bjqs = function(o) {
        
        // slider default settings
        var defaults        = {

            // w + h to enforce consistency
//            width           : 275,
//            height          : 300,

            // transition valuess
            animtype        : 'fade',
            animduration    : 4500000,      // length of transition
            animspeed       : 40000,     // delay between transitions
            automatic       : true,     // enable/disable automatic slide rotation

            // control and marker configuration
            showcontrols    : true,     // enable/disable next + previous UI elements
            centercontrols  : true,     // vertically center controls
            nexttext        : '<',   // text/html inside next UI element
            prevtext        : '>',   // text/html inside previous UI element
            showmarkers     : true,     // enable/disable individual slide UI markers
            centermarkers   : true,     // horizontally center markers

            // interaction values
            keyboardnav     : true,     // enable/disable keyboard navigation
            hoverpause      : true,     // enable/disable pause slides on hover

            // presentational options
            usecaptions     : true,     // enable/disable captions using img title attribute
            randomstart     : false,     // start from a random slide
            responsive      : false     // enable responsive behaviour

        };

        // create settings from defauls and user options
        var settings        = $.extend({}, defaults, o);

        // slider elements
        var $wrapper        = this,
            $slider         = $wrapper.find('ul.bjqs'),
            $slides         = $slider.children('li'),

            // control elements
            $c_wrapper      = null,
            $c_fwd          = null,
            $c_prev         = null,

            // marker elements
            $m_wrapper      = null,
            $m_markers      = null,

            // elements for slide animation
            $canvas         = null,
            $clone_first    = null,
            $clone_last     = null;


        // state management object
        var state           = {
            slidecount      : $slides.length,   // total number of slides
            animating       : false,            // bool: is transition is progress
            paused          : false,            // bool: is the slider paused
            currentslide    : 1,                // current slide being viewed (not 0 based)
            nextslide       : 0,                // slide to view next (not 0 based)
            currentindex    : 0,                // current slide being viewed (0 based)
            nextindex       : 0,                // slide to view next (0 based)
            interval        : null              // interval for automatic rotation
        };

        var responsive      = {
            width           : null,
            height          : null,
            ratio           : null
        };

        // helpful variables
        var vars            = {
            fwd             : 'forward',
            prev            : 'previous'
        };
            
        // run through options and initialise settings
        var init = function() {

            // differentiate slider li from content li
            $slides.addClass('bjqs-slide');

            // conf dimensions, responsive or static
            if( settings.responsive ){
                conf_responsive();
            }
            else{
                conf_static();
            }

            // configurations only avaliable if more than 1 slide
            if( state.slidecount > 1 ){

                // enable random start
                if (settings.randomstart){
                    conf_random();
                }

                // create and show controls
                if( settings.showcontrols ){
                    conf_controls();
                }

                // create and show markers
                if( settings.showmarkers ){
                    conf_markers();
                }

                // enable slidenumboard navigation
                if( settings.keyboardnav ){
                    conf_keynav();
                }

                // enable pause on hover
                if (settings.hoverpause && settings.automatic){
                    conf_hoverpause();
                }

                // conf slide animation
                if (settings.animtype === 'slide'){
                    conf_slide();
                }

            } else {
                // Stop automatic animation, because we only have one slide! 
                settings.automatic = false;
            }

            if(settings.usecaptions){
                conf_captions();
            }

            // TODO: need to accomodate random start for slide transition setting
            if(settings.animtype === 'slide' && !settings.randomstart){
                state.currentindex = 1;
                state.currentslide = 2;
            }

            // slide components are hidden by default, show them now
            $slider.show();
            $slides.eq(state.currentindex).show();

            // Finally, if automatic is set to true, kick off the interval
            if(settings.automatic){
                state.interval = setInterval(function () {
                    go(vars.fwd, false);
                }, settings.animspeed);
            }

        };

        var conf_responsive = function() {

            responsive.width    = $wrapper.outerWidth();
            responsive.ratio    = responsive.width/settings.width,
            responsive.height   = settings.height * responsive.ratio;

            if(settings.animtype === 'fade'){

                // initial setup
                $slides.css({
                    'height'        : settings.height,
                    'width'         : '100%'
                });
                $slides.children('img').css({
                    'height'        : settings.height,
                    'width'         : '100%'
                });
                $slider.css({
                    'height'        : settings.height,
                    'width'         : '100%'
                });
                $wrapper.css({
                    'height'        : settings.height,
                    'max-width'     : settings.width,
                    'position'      : 'relative'
                });

                if(responsive.width < settings.width){

                    $slides.css({
                        'height'        : responsive.height
                    });
                    $slides.children('img').css({
                        'height'        : responsive.height
                    });
                    $slider.css({
                        'height'        : responsive.height
                    });
                    $wrapper.css({
                        'height'        : responsive.height
                    });

                }

                $(window).resize(function() {

                    // calculate and update dimensions
                    responsive.width    = $wrapper.outerWidth();
                    responsive.ratio    = responsive.width/settings.width,
                    responsive.height   = settings.height * responsive.ratio;

                    $slides.css({
                        'height'        : responsive.height
                    });
                    $slides.children('img').css({
                        'height'        : responsive.height
                    });
                    $slider.css({
                        'height'        : responsive.height
                    });
                    $wrapper.css({
                        'height'        : responsive.height
                    });

                });

            }

            if(settings.animtype === 'slide'){

                // initial setup
                $slides.css({
                    'height'        : settings.height,
                    'width'         : settings.width
                });
                $slides.children('img').css({
                    'height'        : settings.height,
                    'width'         : settings.width
                });
                $slider.css({
                    'height'        : settings.height,
                    'width'         : settings.width * settings.slidecount
                });
                $wrapper.css({
                    'height'        : settings.height,
                    'max-width'     : settings.width,
                    'position'      : 'relative'
                });

                if(responsive.width < settings.width){

                    $slides.css({
                        'height'        : responsive.height
                    });
                    $slides.children('img').css({
                        'height'        : responsive.height
                    });
                    $slider.css({
                        'height'        : responsive.height
                    });
                    $wrapper.css({
                        'height'        : responsive.height
                    });

                }

                $(window).resize(function() {

                    // calculate and update dimensions
                    responsive.width    = $wrapper.outerWidth(),
                    responsive.ratio    = responsive.width/settings.width,
                    responsive.height   = settings.height * responsive.ratio;

                    $slides.css({
                        'height'        : responsive.height,
                        'width'         : responsive.width
                    });
                    $slides.children('img').css({
                        'height'        : responsive.height,
                        'width'         : responsive.width
                    });
                    $slider.css({
                        'height'        : responsive.height,
                        'width'         : responsive.width * settings.slidecount
                    });
                    $wrapper.css({
                        'height'        : responsive.height
                    });
                    $canvas.css({
                        'height'        : responsive.height,
                        'width'         : responsive.width
                    });

                    resize_complete(function(){
                        go(false,state.currentslide);
                    }, 200, "some unique string");

                });

            }

        };

        var resize_complete = (function () {
            
            var timers = {};
            
            return function (callback, ms, uniqueId) {
                if (!uniqueId) {
                    uniqueId = "Don't call this twice without a uniqueId";
                }
                if (timers[uniqueId]) {
                    clearTimeout (timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };

        })();

        // enforce fixed sizing on slides, slider and wrapper
        var conf_static = function() {

            $slides.css({
                'height'    : settings.height,
                'width'     : settings.width
            });
            $slider.css({
                'height'    : settings.height,
                'width'     : settings.width
            });
            $wrapper.css({
                'height'    : settings.height,
                'width'     : settings.width,
                'position'  : 'relative'
            });

        };

        var conf_slide = function() {

            // create two extra elements which are clones of the first and last slides
            $clone_first    = $slides.eq(0).clone();
            $clone_last     = $slides.eq(state.slidecount-1).clone();

            // add them to the DOM where we need them
            $clone_first.attr({'data-clone' : 'last', 'data-slide' : 0}).appendTo($slider).show();
            $clone_last.attr({'data-clone' : 'first', 'data-slide' : 0}).prependTo($slider).show();

            // update the elements object
            $slides             = $slider.children('li');
            state.slidecount    = $slides.length;

            // create a 'canvas' element which is neccessary for the slide animation to work
            $canvas = $('<div class="bjqs-wrapper"></div>');

            // if the slider is responsive && the calculated width is less than the max width
            if(settings.responsive && (responsive.width < settings.width)){

                $canvas.css({
                    'width'     : responsive.width,
                    'height'    : responsive.height,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });

                // update the dimensions to the slider to accomodate all the slides side by side
                $slider.css({
                    'width'     : responsive.width * (state.slidecount + 2),
                    'left'      : -responsive.width * state.currentslide
                });

            }
            else {

                $canvas.css({
                    'width'     : settings.width,
                    'height'    : settings.height,
                    'overflow'  : 'hidden',
                    'position'  : 'relative'
                });

                // update the dimensions to the slider to accomodate all the slides side by side
                $slider.css({
                    'width'     : settings.width * (state.slidecount + 2),
                    'left'      : -settings.width * state.currentslide
                });

            }

            // add some inline styles which will align our slides for left-right sliding
            $slides.css({
                'float'         : 'left',
                'position'      : 'relative',
                'display'       : 'list-item'
            });

            // 'everything.. in it's right place'
            $canvas.prependTo($wrapper);
            $slider.appendTo($canvas);

        };

        var conf_controls = function() {

            // create the elements for the controls
            $c_wrapper  = $('<ul class="bjqs-controls"></ul>');
            $c_fwd      = $('<li class="bjqs-next"><a href="#" data-direction="'+ vars.fwd +'">' + settings.nexttext + '</a></li>');
            $c_prev     = $('<li class="bjqs-prev"><a href="#" data-direction="'+ vars.prev +'">' + settings.prevtext + '</a></li>');

            // bind click events
            $c_wrapper.on('click','a',function(e){

                e.preventDefault();
                var direction = $(this).attr('data-direction');

                if(!state.animating){

                    if(direction === vars.fwd){
                        go(vars.fwd,false);
                    }

                    if(direction === vars.prev){
                        go(vars.prev,false);
                    }

                }

            });

            // put 'em all together
            $c_prev.appendTo($c_wrapper);
            $c_fwd.appendTo($c_wrapper);
            $c_wrapper.appendTo($wrapper);

            // vertically center the controls
            if (settings.centercontrols) {

                $c_wrapper.addClass('v-centered');

                // calculate offset % for vertical positioning
                var offset_px   = ($wrapper.height() - $c_fwd.children('a').outerHeight()) / 2,
                    ratio       = (offset_px / settings.height) * 100,
                    offset      = ratio + '%';

                $c_fwd.find('a').css('top', offset);
                $c_prev.find('a').css('top', offset);

            }

        };

        var conf_markers = function() {

            // create a wrapper for our markers
            $m_wrapper = $('<ol class="bjqs-markers"></ol>');

            // for every slide, create a marker
            $.each($slides, function(key, slide){

                var slidenum    = key + 1,
                    gotoslide   = key + 1;
                
                if(settings.animtype === 'slide'){
                    // + 2 to account for clones
                    gotoslide = key + 2;
                }

                var marker = $('<li><a href="#">'+ slidenum +'</a></li>');

                // set the first marker to be active
                if(slidenum === state.currentslide){ marker.addClass('active-marker'); }

                // bind the click event
                marker.on('click','a',function(e){
                    e.preventDefault();
                    if(!state.animating && state.currentslide !== gotoslide){
                        go(false,gotoslide);
                    }
                });

                // add the marker to the wrapper
                marker.appendTo($m_wrapper);

            });

            $m_wrapper.appendTo($wrapper);
            $m_markers = $m_wrapper.find('li');

            // center the markers
            if (settings.centermarkers) {
                $m_wrapper.addClass('h-centered');
                var offset = (settings.width - $m_wrapper.width()) / 2;
                $m_wrapper.css('left', offset);
            }

        };

        var conf_keynav = function() {

            $(document).keyup(function (event) {

                if (!state.paused) {
                    clearInterval(state.interval);
                    state.paused = true;
                }

                if (!state.animating) {
                    if (event.keyCode === 39) {
                        event.preventDefault();
                        go(vars.fwd, false);
                    } else if (event.keyCode === 37) {
                        event.preventDefault();
                        go(vars.prev, false);
                    }
                }

                if (state.paused && settings.automatic) {
                    state.interval = setInterval(function () {
                        go(vars.fwd);
                    }, settings.animspeed);
                    state.paused = false;
                }

            });

        };

        var conf_hoverpause = function() {

            $wrapper.hover(function () {
                if (!state.paused) {
                    clearInterval(state.interval);
                    state.paused = true;
                }
            }, function () {
                if (state.paused) {
                    state.interval = setInterval(function () {
                        go(vars.fwd, false);
                    }, settings.animspeed);
                    state.paused = false;
                }
            });

        };

        var conf_captions = function() {

            $.each($slides, function (key, slide) {

                var caption = $(slide).children('img:first-child').attr('title');

                // Account for images wrapped in links
                if(!caption){
                    caption = $(slide).children('a').find('img:first-child').attr('title');
                }

                if (caption) {
                    caption = $('<p class="bjqs-caption">' + caption + '</p>');
                    caption.appendTo($(slide));
                }

            });

        };

        var conf_random = function() {

            var rand            = Math.floor(Math.random() * state.slidecount) + 1;
            state.currentslide  = rand;
            state.currentindex  = rand-1;

        };

        var set_next = function(direction) {

            if(direction === vars.fwd){
                
                if($slides.eq(state.currentindex).next().length){
                    state.nextindex = state.currentindex + 1;
                    state.nextslide = state.currentslide + 1;
                }
                else{
                    state.nextindex = 0;
                    state.nextslide = 1;
                }

            }
            else{

                if($slides.eq(state.currentindex).prev().length){
                    state.nextindex = state.currentindex - 1;
                    state.nextslide = state.currentslide - 1;
                }
                else{
                    state.nextindex = state.slidecount - 1;
                    state.nextslide = state.slidecount;
                }

            }

        };

        var go = function(direction, position) {

            // only if we're not already doing things
            if(!state.animating){

                // doing things
                state.animating = true;

                if(position){
                    state.nextslide = position;
                    state.nextindex = position-1;
                }
                else{
                    set_next(direction);
                }

                // fade animation
                if(settings.animtype === 'fade'){

                    if(settings.showmarkers){
                        $m_markers.removeClass('active-marker');
                        $m_markers.eq(state.nextindex).addClass('active-marker');
                    }

                    // fade out current
                    $slides.eq(state.currentindex).fadeOut(settings.animduration);
                    // fade in next
                    $slides.eq(state.nextindex).fadeIn(settings.animduration, function(){

                        // update state variables
                        state.animating = false;
                        state.currentslide = state.nextslide;
                        state.currentindex = state.nextindex;

                    });

                }

                // slide animation
                if(settings.animtype === 'slide'){

                    if(settings.showmarkers){
                        
                        var markerindex = state.nextindex-1;

                        if(markerindex === state.slidecount-2){
                            markerindex = 0;
                        }
                        else if(markerindex === -1){
                            markerindex = state.slidecount-3;
                        }

                        $m_markers.removeClass('active-marker');
                        $m_markers.eq(markerindex).addClass('active-marker');
                    }

                    // if the slider is responsive && the calculated width is less than the max width
                    if(settings.responsive && ( responsive.width < settings.width ) ){
                        state.slidewidth = responsive.width;
                    }
                    else{
                        state.slidewidth = settings.width;
                    }

                    $slider.animate({'left': -state.nextindex * state.slidewidth }, settings.animduration, function(){

                        state.currentslide = state.nextslide;
                        state.currentindex = state.nextindex;

                        // is the current slide a clone?
                        if($slides.eq(state.currentindex).attr('data-clone') === 'last'){

                            // affirmative, at the last slide (clone of first)
                            $slider.css({'left': -state.slidewidth });
                            state.currentslide = 2;
                            state.currentindex = 1;

                        }
                        else if($slides.eq(state.currentindex).attr('data-clone') === 'first'){

                            // affirmative, at the fist slide (clone of last)
                            $slider.css({'left': -state.slidewidth *(state.slidecount - 2)});
                            state.currentslide = state.slidecount - 1;
                            state.currentindex = state.slidecount - 2;

                        }

                        state.animating = false;

                    });

                }

            }

        };
        init();
    };
})(jQuery);


var pushNotification;

document.addEventListener('deviceready', onDeviceReady, true);

function onDeviceReady() {

    try {
        pushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android') {
            //$("#app-status-ul").append('<li>registering android</li>');
            pushNotification.register(successHandler, errorHandler, { "senderID": "547802725123", "ecb": "onNotificationGCM" }); 	// required!
        }
        else {
            //$("#app-status-ul").append('<li>registering iOS</li>');
            pushNotification.register(tokenHandler, errorHandler, { "badge": "true", "sound": "true", "alert": "true", "ecb": "onNotificationAPN" }); // required!
        }
    }
    catch (err) {
        txt = "There was an error on this page.\n\n";
        txt += "Error description: " + err.message + "\n\n";
        alert(txt);
    }
};

// handle GCM notifications for Android
function onNotificationGCM(e) {
    switch (e.event) {
        case 'registered':
            if (e.regid.length > 0) {
                //$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                // Your GCM push server needs to know the regID before it can push to this device
                // here is where you might want to send it the regID for later use.
                // This is where you would code to send the REGID to your server for this device
                /*if (e.coldstart)
                alert('coldstart');
                else
                alert('background');*/
                //alert(e.regid);
                storeToken(e.regid);
                //console.log("regID = " + e.regID);
            }
            break;

        case 'message':
            // if this flag is set, this notification happened while we were in the foreground.
            // you might want to play a sound to get the user's attention, throw up a dialog, etc.
            if (e.foreground) {
                //$("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

                // if the notification contains a soundname, play it.
                //var my_media = new Media("/android_asset/www/"+e.soundname);beep
                var my_media = new Media("beep.wav");
                my_media.play();
            }
            else {	// otherwise we were launched because the user touched a notification in the notification tray.
                //				if (e.coldstart)
                //					$("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                //				else
                //					$("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }

            //				$("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
            //				$("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            break;

        case 'error':
            //			$("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
            break;

        default:
            //			$("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
    }
}
function storeToken(token) {
    var id = localStorage.ampID; // id local storage
    var key = localStorage.ampkey; // Key local Storage
    var install = localStorage.ampDomain; // Domain local Storage
    var platform = device.platform;
    var deviceuuid = device.uuid;
    var version = device.version;
    var gcm_regid = token;
    var uri = install + "/public/mobile.ashx?method=addeditgcmsetting&id=" + id + "&key=" + key + "&deviceuuid=" + device.uuid + "&gcm_regid=" + token + "&version=" + device.version + "&platform=" + device.platform;
    $.ajax({
        type: "GET",
        url: uri,
        success: function (msg) {

            jsondata = eval('(' + msg + ')');
            if (typeof (jsondata.error) == "string") {

                alert(jsondata.error);

            } else {
                // 
                console.log(jsondata);
            }
        },
        fail: function (msg) {
            alert('error'); //success
        }
    });
}

function tokenHandler(result) {
    //	$("#app-status-ul").append('<li>token: '+ result +'</li>');
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
}

function successHandler(result) {
    //	$("#app-status-ul").append('<li>success:'+ result +'</li>');
}

function errorHandler(error) {
    //	$("#app-status-ul").append('<li>error:'+ error +'</li>');
}


﻿// Function for checking the options values on setting page and store that values in local storage
function checkSetting() {
    if ($("#feedAttr").val() == "off") {
        localStorage.feedSet = "off";
    }
    else if ($("#feedAttr").val() == "on") {
        localStorage.feedSet = "on";
    }
    if ($("#activeAttr").val() == "off") {
        localStorage.activeSet = "off";
    }
    else if ($("#activeAttr").val() == "on") {
        localStorage.activeSet = "on";
    }
    if ($("#anonyAttr").val() == "off") {
        localStorage.anonymousSet = "off";
    }
    else if ($("#anonyAttr").val() == "on") {
        localStorage.anonymousSet = "on"
    }
}
// Function for getting the options values from local storage 
function set(recid, str) {
    var id = recid
    var value = str;
    if (id == "feedAttr") {
        localStorage.feedSet = value;
    }
    else if (id == "activeAttr")
        localStorage.activeSet = value;
    else if (id == "anonyAttr")
        localStorage.anonymousSet = value;
}

// Function for changing the attributes as per the option value
function checkValue() {
    if (localStorage.feedSet == "off") {
        $("#a").hide();
    }
    if (localStorage.activeSet == "off") {
        $("#b").hide();
    }
    if (localStorage.anonymousSet == "off") {
        $("#c").hide();
    }
}

$(document).ready(function () {
    // For Setting On off buttons
    if (localStorage.feedSet == "off") {
        $("#feedAttr").find('option').eq(0).attr('selected', 'none');
        $("#feedAttr").find('option').eq(1).attr('selected', 'selected');
    }
    else if (localStorage.feedSet == "on") {
        $("#feedAttr").find('option').eq(1).attr('selected', 'none');
        $("#feedAttr").find('option').eq(0).attr('selected', 'selected');
    }

    if (localStorage.activeSet == "off") {
        $("#activeAttr").find('option').eq(0).attr('selected', 'none');
        $("#activeAttr").find('option').eq(1).attr('selected', 'selected');
    }
    else if (localStorage.activeSet == "on") {
        $("#activeAttr").find('option').eq(1).attr('selected', 'none');
        $("#activeAttr").find('option').eq(0).attr('selected', 'selected');
    }

    if (localStorage.anonymousSet == "off") {
        $("#anonyAttr").find('option').eq(0).attr('selected', 'none');
        $("#anonyAttr").find('option').eq(1).attr('selected', 'selected');
    }
    else if (localStorage.anonymousSet == "on") {
        $("#anonyAttr").find('option').eq(1).attr('selected', 'none');
        $("#anonyAttr").find('option').eq(0).attr('selected', 'selected');
    }

    checkSetting();
    // check session expiry
    var id = window.localStorage.getItem("ampID");
    var key = window.localStorage.getItem("ampkey");
    var install = window.localStorage.getItem("ampDomain");
    var username = window.localStorage.getItem("username");
    var URL = window.localStorage.getItem("url");
    var current = "";
    current = current + "<p class='Totaltemp' style='text-align:center; font-size: 12px;'> Currently logged in as <b>" + username + "</b></p>";
    current = current + "<p class='Totaltemp' style='text-align:center; font-size: 12px;'> in <b>"+ URL + "</b></p>";
    $("#total").html("");
    $("#total").html(current);

    if (id == "" || key == "" || install == "" || id == null || key == null || install == null) {
        window.location = "login.html";
    }
});
$(function () {
    $("#backpage").click(function (event) {
        event.preventDefault();
        history.back(1);
    });
    $('footer ul li a').removeClass('ui-link');
});
//Function to exit the APP
function exitFromApp() {
    //navigator.app.exitApp();
    if (navigator.app) {
        navigator.app.exitApp();
    }
    else if (navigator.device) {
        navigator.device.exitApp();
    }
}

function onddlfeed(temp) {
    var id = $(temp).attr('id');
    var str = $(temp).val();
    set(id, str);
}
function onddlactive(temp) {
    var id = $(temp).attr('id');
    var str = $(temp).val();
    set(id, str);
}
function onddlanony(temp) {
    var id = $(temp).attr('id');
    var str = $(temp).val();
    set(id, str);
}
//Function Call for Sign-out Button
$('.signout-btn').live("click", function (e) {
    e.preventDefault();
    var dialog = $('<div class="DialogBox"><p>Are you sure you want to sign out?</p></div>').dialog({
        buttons: {
            "Yes": function () {
                localStorage.clear();
                window.location = "login.html";
            },
            "Cancel": function () {
                dialog.dialog('close');
            }
        }
    });
});
//Function Call for Exit Button
$('.exit-btn').live("click", function (e) {
    e.preventDefault();
    var dialog = $('<div class="DialogBox"><p>Do you want to Exit?</p></div>').dialog({
        buttons: {
            "Exit": function () {
                exitFromApp();
            },
            "Cancel": function () {
                dialog.dialog('close');
            }
        }
    });
}); 


﻿    // Function For date and time format
    function prettyDate(date_str) {
        var time_formats = [
		[60, 'Just Now'],
		[90, '1 Minute'], // 60*1.5
		[3600, 'Minutes', 60], // 60*60, 60
		[5400, '1 Hour'], // 60*60*1.5
		[86400, 'Hours', 3600], // 60*60*24, 60*60
		[129600, '1 Day'], // 60*60*24*1.5
		[604800, 'Days', 86400], // 60*60*24*7, 60*60*24
		[907200, '1 Week'], // 60*60*24*7*1.5
		[2628000, 'Weeks', 604800], // 60*60*24*(365/12), 60*60*24*7
		[3942000, '1 Month'], // 60*60*24*(365/12)*1.5
		[31536000, 'Months', 2628000], // 60*60*24*365, 60*60*24*(365/12)
		[47304000, '1 Year'], // 60*60*24*365*1.5
		[3153600000, 'Years', 31536000], // 60*60*24*365*100, 60*60*24*365
		[4730400000, '1 Century'], // 60*60*24*365*100*1.5
	];

        var time = ('' + date_str).replace(/-/g, "/").replace(/[TZ]/g, " "),
		dt = new Date,
		seconds = ((dt - new Date(time) + (dt.getTimezoneOffset() * 60000)) / 1000),
		token = ' Ago',
		i = 0,
		format;

        if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = '';
        }

        while (format = time_formats[i++]) {
            if (seconds < format[0]) {
                if (format.length == 2) {
                    return format[1] + (i > 1 ? token : ''); // Conditional so we don't return Just Now Ago
                } else {
                    return Math.round(seconds / format[2]) + ' ' + format[1] + (i > 1 ? token : '');
                }
            }
        }

        // overflow for centuries
        if (seconds > 4730400000)
            return Math.round(seconds / 4730400000) + ' Centuries' + token;

        return date_str;
    };

    if (typeof jQuery != 'undefined') {
        jQuery.fn.prettyDate = function () {
            return this.each(function () {
                var date = prettyDate(this.title);
                if (date && jQuery(this).text() != date)
                    jQuery(this).text(date);
            });
        };
    }

﻿//JS file for Email page
$(document).ready(function () {
    $("#pageLoader").show();
    // check session expiry
    var id = window.localStorage.getItem("ampID");
    var key = window.localStorage.getItem("ampkey");
    var install = window.localStorage.getItem("ampDomain");
    if (id == "" || key == "" || install == "" || id == null || key == null || install == null) {
        window.location = "login.html";
    }
    //Function for Back button
    $("#backpage").click(function (event) {
        event.preventDefault();
        history.back(1);
    });
    gettopsmstemplates();
});

// function to get all email templates
function gettopsmstemplates() {
    $("#pageLoader").show();
    var id = localStorage.ampID; // ID local storage
    var key = localStorage.ampkey; // Key local Storage
    var install = localStorage.ampDomain; // Domain local storage
    var searchtext = $.trim(document.getElementById('Template_search').value);
    var currentmsg = "";
    //  Ajax call for Email Templates
    var uri = install + "/public/mobile.ashx?method=getsmstemplates&id=" + id + "&key=" + key + "&searchtext=" + searchtext;
    $.ajax({
        type: "GET",
        url: uri,
        success: function (name) {
            jsondata = eval('(' + name + ')');
            if (typeof (jsondata.error) == "string") {
                $("#pageLoader").hide();
                alert(jsondata.error);
            }
            else {
                var current = "";
                current = current + "<p class='Totaltemp'> Total SMS Templates: " + jsondata.length + "</p>";
                var object = jsondata.object;
                for (var i = 0; i < jsondata.length; i++) {
                    var templateExtendedData = jsondata[i].extendeddata;

                    var xml = templateExtendedData,
                    xmlDoc = $.parseXML(xml),
                    $xml = $(xmlDoc),
                    $text = $xml.find("text");

                    //currentmsg = currentmsg + "<li style='cursor:pointer;' id='" + jsondata[i].id + "'><img src='" + jsondata[i].original + "' title='" + jsondata[i].name + "'></li>";
                    currentmsg = currentmsg + "<li style='cursor:pointer;' id='" + jsondata[i].id + "'><textarea rows='10' disabled='true' style='width: 100%;font-size: large;pointer-events: none;background-color:#F3F3F3;border:none;'>" + $text.text() + "</textarea><p class='bjqs-caption'>" + jsondata[i].name + "</p></li>";
                }
                $("#total").html("");
                $("#total").html(current); // Appending total no of templates
                $(".bjqs").html("");
                $(".bjqs").html(currentmsg); // Appending templates
                $("#pageLoader").hide();
                var winwidth = window.innerWidth;
                var winheight = window.innerHeight - 250;
                $('#banner-fade').bjqs({
                    width: winwidth,
                    height: winheight,
                    responsive: true
                });
                // Binding Email Template using its template id
                $('.bjqs-slide').bind('click', function () {
                    window.location.href = "sendsms.html?templateid=" + $(this).attr('id'); ;
                    $("#pageLoader").hide();
                });

                if (jsondata.length == 0) {
                    alert("No templates found");
                }

            } //alert(name); //else
        }, //success
        fail: function (msg) {
            $("#pageLoader").hide();
            alert('error');
        }
    });
}

﻿(function ($) {
    $.easyconfirm = {};
    $.easyconfirm.locales = {};
    $.easyconfirm.locales.enUS = {
        title: 'Are you sure?',
        text: 'Are you sure that you want to perform this action?',
        button: ['Cancel', 'Confirm'],
        closeText: 'close'
    };
    $.easyconfirm.locales.svSE = {
        title: 'Är du säker?',
        text: 'Är du säker på att du vill genomföra denna åtgärden?',
        button: ['Avbryt', 'Bekräfta'],
        closeText: 'stäng'
    };
    $.easyconfirm.locales.itIT = {
        title: 'Sei sicuro?',
        text: 'Sei sicuro di voler compiere questa azione?',
        button: ['Annulla', 'Conferma'],
        closeText: 'chiudi'
    };

    $.fn.easyconfirm = function (options) {

        var _attr = $.fn.attr;

        $.fn.attr = function (attr, value) {
            // Let the original attr() do its work.
            var returned = _attr.apply(this, arguments);

            // Fix for jQuery 1.6+
            if (attr == 'title' && returned === undefined)
                returned = '';

            return returned;
        };

        var options = jQuery.extend({
            eventType: 'click',
            icon: 'help'
        }, options);

        var locale = jQuery.extend({}, $.easyconfirm.locales.enUS, options.locale);

        // Shortcut to eventType.
        var type = options.eventType;

        return this.each(function () {
            var target = this;
            var $target = jQuery(target);

            // If no events present then and if there is a valid url, then trigger url change
            var urlClick = function () {
                if (target.href) {
                    var length = String(target.href).length;
                    if (target.href.substring(length - 1, length) != '#')
                        document.location = target.href;
                }
            };

            // If any handlers where bind before triggering, lets save them and add them later
            var saveHandlers = function () {
                var events = jQuery.data(target, 'events');
                if (events) {
                    target._handlers = new Array();
                    $.each(events[type], function () {
                        target._handlers.push(this);
                    });

                    $target.unbind(type);
                }
            };
            // Re-bind old events
            var rebindHandlers = function () {
                if (target._handlers !== undefined) {
                    jQuery.each(target._handlers, function () {
                        $target.bind(type, this);
                    });
                }
            };

            if ($target.attr('title') !== null && $target.attr('title').length > 0)
                locale.text = $target.attr('title');

            var dialog = (options.dialog === undefined || typeof (options.dialog) != 'object') ?
                $('<div class="dialog confirm">' + locale.text + '</div>') :
                options.dialog;

            var buttons = {};
            buttons[locale.button[1]] = function () {
                // Unbind overriding handler and let default actions pass through
                $target.unbind(type, handler);

                // Close dialog
                $(dialog).dialog("close");

                // Check if there is any events on the target
                if (jQuery.data(target, 'events')) {
                    // Trigger click event.
                    $target.click();
                }
                else {
                    // No event trigger new url
                    urlClick();
                }

                init();

            };
            buttons[locale.button[0]] = function () {
                $(dialog).dialog("close");
            };

            $(dialog).dialog({
                autoOpen: false,
                resizable: false,
                draggable: true,
                closeOnEscape: true,
                width: 'auto',
                minHeight: 120,
                maxHeight: 200,
                buttons: buttons,
                title: locale.title,
                closeText: locale.closeText,
                modal: true
            });

            // Handler that will override all other actions
            var handler = function (event) {
                $(dialog).dialog('open');
                event.stopImmediatePropagation();
                event.preventDefault();
                return false;
            };

            var init = function () {
                saveHandlers();
                $target.bind(type, handler);
                rebindHandlers();
            };

            init();

        });

    };
})(jQuery);

﻿//JS file for Search Contact Page
$(document).ready(function () {
    $("#pageLoader").hide();
    // check session expiry
    var id = window.localStorage.getItem("ampID");
    var key = window.localStorage.getItem("ampkey");
    var install = window.localStorage.getItem("ampDomain");
    if (id == "" || key == "" || install == "" || id == null || key == null || install == null) {
        window.location = "login.html";
    }
    $("#backpage").click(function (event) {
        event.preventDefault();
        history.back(1);
    });
    //Function to unselect contact
    function unselect() {
        $('.contact-list').removeClass('selected');
    }
    //Function of on click event on contact 
    $('.contact-list').live("click", function () {
        $('.loadingMessage').html("Loading contact details");
        $("#emailconatct").addClass('deactivate');
        $("#call").addClass('deactivate');
        $("#check").addClass('deactivate');
        $("#smscontact").addClass('deactivate');
        $("#emailconatct").css('pointer-events', 'none');
        $("#smscontact").css('pointer-events', 'none');
        $("#call").css('pointer-events', 'none');
        $("#check").css('pointer-events', 'none');
        unselect();
        $(this).addClass("selected");
        $('.ActionbWrapeer').css("display", "block");
        var name = $(this).find('.user-details').children('h6').text();
        var firstname = $(this).next().find('#First').text();
        var lastname = $(this).next().find('#last').text();
        var email = $(this).find('.user-details').children('p').html();
        var Contactid = $(this).next().find('#cid').text();
        localStorage.setItem("contactID", Contactid);
        var lessindex = email.indexOf("<");
        var newemail = email.substring(0, lessindex);
        var number = email.substring(lessindex + 4, email.length);
        number = $(this).next().find('#number').text();
        var interest = $(this).next().find('#interesttype').text();
        var mobile = $(this).next().find('#mobile').text();
        email = $(this).next().find('#email').text();
        var Contactid = $(this).parent().next().find('#cid').text();
        var contacttype = $(this).next().find('#contacttype').text();
        var industry = $(this).next().find('#industrytype').text();
        var score = $(this).next().find('#score').text();
        var lastactivity = $(this).next().find('#lastactivity').text();
        var origin = $(this).next().find('#origin').text();
        var contactcompany = $(this).next().find('#company1').text();
        var lead = $(this).next().find('#leadsource').text();
        var stageval = $(this).next().find('#stage').text();
        var ProfileImage = $(this).next().find('#Profile').text();
        localStorage.setItem("FirstName", firstname);
        localStorage.setItem("LastName", lastname);
        localStorage.setItem("Email", email);
        localStorage.setItem("Intereststatus", interest);
        localStorage.setItem("ContactType", contacttype);
        localStorage.setItem("IndustryType", industry);
        localStorage.setItem("Number", number);
        localStorage.setItem("mobile", mobile);
        localStorage.setItem("company", contactcompany);
        localStorage.setItem("source", lead);
        localStorage.setItem("stage", stageval);

        if (email != "" && email != null) {
            $("#emailconatct").removeClass('deactivate');
            $("#check").removeClass('deactivate');
            $("#emailconatct").addClass('activate');
            $("#check").addClass('activate');
            $("#emailconatct").css('pointer-events', '');
            $("#check").css('pointer-events', '');
        }

        if (mobile != "" && mobile != null) {
            $("#smscontact").removeClass('deactivate');
            $("#smscontact").addClass('activate');
            $("#smscontact").css('pointer-events', '');
        }

        if (number != "" && number != null) {
            $("#call").removeClass('deactivate');
            $("#call").addClass('activate');
            $("#call").css('pointer-events', '');
        }

        //Appneding values to report
        $("#userstat").html("");
        var current = "";
        if (contactcompany == "null" || contactcompany == "") {
            contactcompany = "No Company";
        }
        else {
            contactcompany = contactcompany;
        }
        if (ProfileImage === "") {
            current = current + "<div class='float-left'><div class='user-img'><img src='images/user-iconBig.png' height='64' width='64'></div></div>";
        }
        else {
            current = current + "<div class='float-left'><div class='user-img'><img src='" + ProfileImage + "'height='auto' width='64'></div></div>";
        }
        current = current + "<div class='float-left UserDetails'>";
        current = current + "<h5>" + name + "</h5><p style='color:#70A4D3;'>" + newemail + "</p><p><span>" + contactcompany + "</span></p></div>";
        $("#userstat").html("");
        $("#userstat").html(current);
        $("#stat").html("");
        var current = "";
        if (lastactivity == "null") {
            lastactivity = "INACTIVE";
        }
        else {
            var date = new Date(lastactivity);
            var newdate = date.toISOString()
            lastactivity = prettyDate(newdate);
        }
        current = current + "<div class='SomeINfo'>";
        current = current + "<ul><li><b>Score : </b><span style='font-size: 12px;'>" + score + "</span></li><li><b>Interest Status : </b><span style='font-size: 12px;'>" + interest + "</span></li><li><b>Last Activity : </b><span style='font-size: 12px;'>" + lastactivity + "</span></li><li><b>Origin : </b><span style='font-size: 12px;'>" + origin + "</span></li></ul></div>";
        $("#stat").html("");
        $("#stat").html(current);
    });
    //Function of cancel option
    $('.cancel').click(function () {
        $('.ActionbWrapeer').hide();
    });
    //Function of view report option
    $('.Viewreport').click(function () {
        $('.ActionbWrapeer, .main-wrapper').css("display", "none");
        $('.Contact-Details').css("display", "block");
    });
    //Function of cancel image button of view report
    $('.Contact-Details h4 a').click(function () {
        $('.Contact-Details').css("display", "none");
        $('.main-wrapper').css("display", "block");

    });

    $("#txt_search").focus();

});

function closeOptions() {
    $('.ActionbWrapeer').hide();
    resetValues();
}

//Function Of edit contact option
function editcontact() {
    window.location = "Editcontact.html";
}
//Function Of email contact option
function emailcontact() {
    var Email = window.localStorage.getItem("Email");
    localStorage.setItem("EmailID", Email);
    window.location = "email-template.html";
}
//Function Of sms contact option
function smscontact() {
    var mobile = window.localStorage.getItem("mobile");
    if (mobile != null && mobile != "") {
        localStorage.setItem("mobile", mobile);
        window.location = "sms-template.html";
    }
    else {
        alert("No mobile number found");
     }
}
//Function Of call contact option
function call() {
    var phoneNumber = window.localStorage.getItem("Number");
    if (phoneNumber != null && phoneNumber != "") {
        $('.ActionbWrapeer').hide();
        document.location.href = "tel:" + phoneNumber;
        resetValues();
    }
    else {
        alert("Sorry No Number Found");
    }
}

function resetValues() {
    localStorage.removeItem("EmailID");
    localStorage.removeItem("mobile");
}

//Function for pagination
function Nextcontacts() {
    var length = window.localStorage.getItem("length");
    if (length == 50) {
        page++;
        submitclick(page);
    }
    else if (length < 50) {
        alert("No More Page");
        return false;
    }
}

function Prevcontacts() {
    if (page != 0) {
        page--;
        submitclick(page);
    }
    else {
        alert("No More Page");
        return false;
    }
}
//Function to clear the div
function cleardiv() {
    $("#content2").html("");
    $("#nextprev").html("");
    var elements = document.getElementsByTagName("input");
    for (var ii = 0; ii < elements.length; ii++) {
        if (elements[ii].type == "text") {
            elements[ii].value = "";
        }
    }
}
//Function For getting search contact with pagination
var page = 0;
function submitclick(page) {
    $("#pageLoader").show();
    $('.loadingMessage').html("Loading contacts based on search criteria provided");
    $("#nextprev").html("");
    var id = localStorage.ampID; // Id local storage
    var key = localStorage.ampkey; // Key local Storage
    var install = localStorage.ampDomain; // Domain local storage
    var currentmsg = "";
    var contacts = "";
    var ascending = "false";
    var sortfield = "updatedon";
    var pagesize = "50";
    var searchVal = $.trim(document.getElementById('txt_search').value);
    //Ajax call for Search contacts
    if (searchVal != "") {
        var uri = install + "/public/mobile.ashx?method=searchcontactswithpaging&id=" + id + "&key=" + key + "&search=" + searchVal + "&page=" + page + "&pagesize=" + pagesize + "&sortfield=" + sortfield + "&ascending=" + ascending;
        $.ajax({
            type: "GET",
            url: uri,
            success: function (msg) {
                jsondata = eval('(' + msg + ')');
                if (typeof (jsondata.error) == "string") {
                    alert(jsondata.error);
                } else {
                    var object = jsondata.object;
                    var length = jsondata.item.length;
                    localStorage.setItem("length", length);
                    if (length == 50 && page == 0) {
                        var current = "";
                        current = current + "<input type='button' id='next' value='Next' class='btndone' onclick='Nextcontacts()'/>";
                    }
                    else if (length == 50 && page != 0) {
                        var current = "";
                        current = current + "<input type='button' id='prev' value='Prev' class='btndone' onclick='Prevcontacts()'/>";
                        current = current + "<input type='button' id='next' value='Next' class='btndone' onclick='Nextcontacts()'/>";
                    }
                    else {
                        if (length != 50 && page == 0) {
                            //current = current + "<input type='button' id='prev' value='Prev' class='btndone unselectbtn' onclick='Prevcontacts()'/>";
                            //current = current + "<input type='button' id='next' value='Next' class='btndone unselectbtn' onclick='Nextcontacts()'/>";
                        }
                        else {
                            var current = "";
                            current = current + "<input type='button' id='prev' value='Prev' class='btndone' onclick='Prevcontacts()'/>";
                        }
                    }
                    for (var i = 0; i < jsondata.item.length; i++) {
                        var firstname = "";
                        if (jsondata.item[i].firstname == null || jsondata.item[i].firstname == "") {
                            firstname = "N/A";
                        }
                        else {
                            firstname = jsondata.item[i].firstname;
                        }
                        var lastname = "";
                        if (jsondata.item[i].lastname != null) {
                            lastname = jsondata.item[i].lastname;
                        }
                        else { lastname = ""; }
                        var worknumber = "";
                        if (jsondata.item[i].worknumber != null) {
                            worknumber = jsondata.item[i].worknumber;
                        }
                        else { worknumber = ""; }
                        var profileimage = "";
                        if (jsondata.item[i].profileimage != null) {
                            profileimage = jsondata.item[i].profileimage.thumbnail;
                            currentmsg = currentmsg + "<div class='contact-list'>";
                            currentmsg = currentmsg + "<div class='user-img' style='text-align:center;'><img id='Profimage' src='" + profileimage + "'/></div>";
                            currentmsg = currentmsg + "<div class='user-details'><h6>" + firstname + " " + lastname + "</h6><p style='pointer-events: none'>" + jsondata.item[i].email;

                            if (jsondata.item[i].mobilenumber != "" && jsondata.item[i].mobilenumber != null)
                                currentmsg = currentmsg + "</br> M : " + jsondata.item[i].mobilenumber;

                            if (worknumber != "" && worknumber != null)
                                currentmsg = currentmsg + "</br> W : " + worknumber + "</p></div>";

                            currentmsg = currentmsg + "</div></div><div style='display:none'><span id='cid'>" + jsondata.item[i].id + "</span><span id='First'>" + firstname + "</span><span id='last'>" + jsondata.item[i].lastname + "</span><span id='Profile'>" + profileimage + "</span><span id='interesttype'>" + jsondata.item[i].intereststatus + "</span><span id='contacttype'>" + jsondata.item[i].contacttype + "</span><span id='industrytype'>" + jsondata.item[i].industrytype + "</span><span id='score'>" + jsondata.item[i].score + "</span><span id='lastactivity'>" + jsondata.item[i].lastactivity + "</span><span id='origin'>" + jsondata.item[i].origin + "</span><span id='company1'>" + jsondata.item[i].contactcompany + "</span><span id='leadsource'>" + jsondata.item[i].leadsource + "</span><span id='stage'>" + jsondata.item[i].stage + "</span><span id='cid'>" + jsondata.item[i].id + "</span><span id='mobile'>" + jsondata.item[i].mobilenumber + "</span><span id='number'>" + jsondata.item[i].worknumber + "</span><span id='email'>" + jsondata.item[i].email + "</span></div>";
                        }
                        else {
                            currentmsg = currentmsg + "<div class='contact-list'>";
                            currentmsg = currentmsg + "<div class='user-img' style='text-align:center;'><img src='images/user-image.png'/></div>";
                            currentmsg = currentmsg + "<div class='user-details'><h6>" + firstname + " " + lastname + "</h6><p style='pointer-events: none'>" + jsondata.item[i].email;

                            if (jsondata.item[i].mobilenumber != "" && jsondata.item[i].mobilenumber != null)
                                currentmsg = currentmsg + "</br> M :" + jsondata.item[i].mobilenumber;

                            if (worknumber != "" && worknumber != null)
                                currentmsg = currentmsg + "</br> W :" + worknumber + "</p></div>";

                            currentmsg = currentmsg + "</div></div><div style='display:none'<span id='cid'>" + jsondata.item[i].id + "</span>><span id='First'>" + firstname + "</span><span id='last'>" + jsondata.item[i].lastname + "</span><span id='Profile'>" + profileimage + "</span><span id='interesttype'>" + jsondata.item[i].intereststatus + "</span><span id='contacttype'>" + jsondata.item[i].contacttype + "</span><span id='industrytype'>" + jsondata.item[i].industrytype + "</span><span id='score'>" + jsondata.item[i].score + "</span><span id='lastactivity'>" + jsondata.item[i].lastactivity + "</span><span id='origin'>" + jsondata.item[i].origin + "</span><span id='company1'>" + jsondata.item[i].contactcompany + "</span><span id='leadsource'>" + jsondata.item[i].leadsource + "</span><span id='stage'>" + jsondata.item[i].stage + "</span><span id='cid'>" + jsondata.item[i].id + "</span><span id='mobile'>" + jsondata.item[i].mobilenumber + "</span><span id='number'>" + jsondata.item[i].worknumber + "</span><span id='email'>" + jsondata.item[i].email + "</span></div>";
                        }
                    }
                    if (currentmsg == "") {
                        alert("No Contact Found");
                    }
                    $("#option .nextprevbtn").html(current);
                    $("#content2").html(currentmsg); // Appending Contacts
                    $("#pageLoader").hide();
                } //return false;
            },
            fail: function (msg) {
                alert('error');
                $("#pageLoader").hide();
            }
        });
    }
    else {
        $("#pageLoader").hide();
    }
}
//Function For getting Contact Feeds
function ContactFeeds() {
    var id = localStorage.ampID; // ID local Storage
    var key = localStorage.ampkey; // Key local storage
    var install = localStorage.ampDomain; // Domain local storage
    var Email = window.localStorage.getItem("Email");
    var cid = window.localStorage.getItem("contactID");
    $("#feed").html("");
    //Ajax call for Dashboard feeds
    var uri = install + "/public/mobile.ashx?method=getcontactfeedbycontactid&id=" + id + "&key=" + key + "&cid=" + cid;
    $.ajax({
        type: "GET",
        url: uri,
        success: function (msg) {
            jsondata = eval('(' + msg + ')');
            if (typeof (jsondata.error) == "string") {
                alert(jsondata.error);
            } else {
                var msg = jsondata;
                var currentmsg = "";
                for (var i = 0; i < jsondata.length; i++) {
                    var date = new Date(msg[i].when);
                    var newdate = date.toISOString()
                    currentmsg = currentmsg + "<article>";
                    currentmsg = currentmsg + "<span style='font-size:0.9em; display:block;'>" + msg[i].msg + "</span>";
                    currentmsg = currentmsg + "<p> Visited:" + prettyDate(newdate) + "<p></article>";
                }
                $("#feed").html("");
                if (currentmsg == "") { $("#feed").html("No Contact Feeds"); }
                else {
                    $("#feed").html(currentmsg);
                } // Appending Feeds In content
            } //else
        },
        fail: function (msg) {
            alert('error'); //success
        }
    });
}



﻿//JS for login Page
document.addEventListener("deviceready", checkloginauth, false);
function checkloginauth() {
    $("#pageLoader").hide();
    $('.error-div').hide();
    // check session expiry
    var id = window.localStorage.getItem("ampID");
    var key = window.localStorage.getItem("ampkey");
    var install = window.localStorage.getItem("ampDomain");
    if (id == "" || key == "" || install == "" || id == null || key == null || install == null) {
        return false;
    }
    else {
        window.location = "dashboard.html";
    }
}

$(document).ready(function () {
    $('.option-listWrapper').hide();
    $('.cnclbtn').click(function () {
        $('.option-listWrapper').hide();
    });

    // Dropdown Menu Show Hide get value on texbox arrow click
    $('.textbox a span').live('click', function () {
        var options = $(this).parent().parent().parent().find('.option-listWrapper');
        $(options).slideDown();
        $(this).parent().parent().parent().find('.option-listWrapper .option-list ul li').click(function () {
            var optlist_val = $(this).text();
            if (optlist_val.toLowerCase() == "other") {
                $('input[type=text]').attr("readonly", false);
                $('input[type=text]').attr("disabled", false);
                $(options).prev('div').prev('div').children().first('input[type=text]').focus();
                $(options).prev('div').prev('div').children().first('input[type=text]').attr('value', '');
                $(options).slideUp();
            } else {
                $(options).prev('div').prev('div').children().first('input[type=text]').attr('value', optlist_val);
                $(options).slideUp();
                $('#domain').attr("readonly", true);
            }
        });
    });
    $("#pageLoader").hide();
    //Cancel Image on Dropdown click Event
    $('.option-listWrapper .option-list header h6 img').live('click', function () {
        $('.option-listWrapper').hide();
        $('input[type=text]').attr("disabled", false);
    });
});

//Function For login
function login() {
    $("#pageLoader").show();
    var username = $.trim(document.getElementById('username').value);
    localStorage.setItem("username", username);
    var password = $.trim(document.getElementById('password').value);
    var install = $.trim(document.getElementById('domain').value);
    localStorage.setItem("url", install);
    if (username == "" || password == "" || install == "" || username == null || password == null || install == null) {
        //alert('Not getting variables');
        $("#pageLoader").hide();
        $('.error-div').slideDown(200);
    }
    else {
        // Ajax call for Login
        var uri = install + "/public/mobile.ashx?method=login&username=" + username + "&password=" + password;
        $.ajax({
            type: "POST",
            url: uri,
            success: function (msg) {
                jsondata = eval('(' + msg + ')');
                if (typeof (jsondata.error) == "string") {
                    //alert("error");
                    $("#pageLoader").hide();
                    $('.error-div').slideDown(200);
                } else {
                    id = jsondata.id;
                    key = jsondata.key;
                    if (typeof (Storage) != "undefined") {
                        localStorage.ampID = id;
                        localStorage.ampkey = key;
                        localStorage.ampDomain = install;
                        window.location = "dashboard.html";
                    }
                    else {
                        // Sorry! No web storage support..
                    }
                }
            },
            fail: function (msg) {
                alert('error');
                $('.error-div').slideDown(200);
            }
        });
    }
}


﻿
var contacttype = 0;
var providertext = "";
var maxCharacterCount = 160;

function onSearch() {
    $("#nextprev").html("");
    $("#lblTotalContacts").html("");
    if (contacttype == 0) {
    }
    else if (contacttype == 1) {
        submitclick(page);
    }
    else if (contacttype == 2) {
        loadAMPLists(0);
    }
    else if (contacttype == 3) {
        loadAMPLists(1);
    }
}

function loadMobileContacts() {
    // find all contacts
    var options = new ContactFindOptions();
    options.filter = "";
    filter = ["phoneNumbers"];
    options.multiple = true;
    navigator.contacts.find(filter, onSuccess, onError, options);
}

function onSuccess(contacts) {
    $("#dataContent").html("");
    var current = "";

    for (var i = 0; i < contacts.length; i++) {

        if (contacts[i].phoneNumbers != null && contacts[i].displayName != null) {
            for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                var profileimage = "";
                current = current + "<div class='contact-list'>";
                current = current + "<div class='user-img'><img src='images/user-image.png'/></div> ";
                current = current + "<div class='user-details'><h6>" + contacts[i].displayName + "</h6><p type='mobile' style='pointer-events: none' >" + contacts[i].phoneNumbers[j].value + "</p></br></div></div>";
            }
        }
    }

    if (current == "") {
        alert("No contacts found");
    }

    $("#dataContent").html("");
    $("#dataContent").html(current); // Appending Contacts in Content
    $("#pageLoader").hide();

}

// onError: Failed to get the contacts
function onError(contactError) {
    alert('onError!');
    $("#pageLoader").hide();
}

function loadOptions() {
    $("#nextprev").html("");
    $("#lblTotalContacts").html("");
    //$('#chooseContactType').live('click', function () {
    var options = $('#contactTypeList').find('.option-listWrapper');
    $(options).slideDown();
    $('#contactTypeList').find('.option-listWrapper .option-list ul li').click(function () {
        var optlist_val = $(this).text();
        var optlist_value = $(this).attr('value');
        unBindAllOptions();
        $(options).slideUp();

        $('.search-box').show();

        $('#txt_search').val('');
        page = 0;

        if (optlist_value == 0) {
            $('.search-box').hide();
            $(".mainheading").html("SELECT PHONE CONTACT(S)");
            loadMobileContacts();
        }
        else if (optlist_value == 1) {
            $(".loadingMessage").html("Loading contact(s) from AMP");
            $(".mainheading").html("SELECT AMP CONTACT(S)");
            Getallcontacts();
        }
        else if (optlist_value == 2) {
            $(".loadingMessage").html("Loading recipient list(s) from AMP");
            $(".mainheading").html("SELECT AMP RECIPIENT LIST(S)");
            loadAMPLists(0);
        }
        else if (optlist_value == 3) {
            $(".loadingMessage").html("Loading smart list(s) from AMP");
            $(".mainheading").html("SELECT AMP SMART LIST(S)");
            loadAMPLists(1);
        }

        contacttype = optlist_value;

        $('.login-form').hide();
        $("#contactTypeData").show();

    });
    //});
}

function unBindAllOptions() {
    $('#contactTypeList').find('.option-listWrapper .option-list ul li').unbind('click');
}

//Cancel Image on Dropdown click Event
$('.option-listWrapper .option-list header h6 img').live('click', function () {
    $('.option-listWrapper').hide();
});


$(document).ready(function () {
    $('.option-listWrapper').hide();
    $("#pageLoader").show();

    var mobile = window.localStorage.getItem("mobile");
    if (mobile != null && mobile != "" && mobile != "null") {
        insertValue(mobile);
    }
    localStorage.removeItem("mobile");
    localStorage.removeItem("EmailID");

    var inputBox = document.getElementById('inputRecipients');
    inputBox.addEventListener('input', function () {
        onKeyUp();
    }, false);

    var smsInputBox = document.getElementById('smsText');
    smsInputBox.addEventListener('input', function () {
        validateTextCharacterCount();
    }, false);

    // check session expiry
    var id = window.localStorage.getItem("ampID");
    var key = window.localStorage.getItem("ampkey");
    var install = window.localStorage.getItem("ampDomain");
    if (id == "" || key == "" || install == "" || id == null || key == null || install == null) {
        window.location = "login.html";
    }
});

//Function to hide tabs
function check() {
    page = 0;
    $(".mainheading").html("COMPOSE SMS");
    $("#contactTypeData").hide();
    $('.login-form').show();
}

//Function to select recipient for sending email
var finalemail = "";
$('.contact-list').live("click", function () {
    $(this).addClass("thisselected");

    var name = $(this).find('h6').text();
    var number = $(this).find('p[type="mobile"]').text();
    var listid = $(this).find('h6').attr('listid');
    var listdetails = name;

    if (contacttype == 0 || contacttype == 1) {
        number = $(this).find('p[type="mobile"]').text();
        listdetails = number;
        if (listdetails.length > 20) {
            listdetails = listdetails.substring(0, 18) + "..";
        }
        $('#dataDiv').find('span[value="' + number + '"]').remove();
    }
    else if (contacttype == 2 || contacttype == 3) {
        if (listdetails.length > 20) {
            listdetails = listdetails.substring(0, 18) + "..";
        }
        number = $(this).find('p[type="count"]').text();
        number = number.replace('contact(s)', '');
        listdetails += " ( " + number + " ) ";
        $('#dataDiv').find('span[value="' + listid + '"]').remove();
    }

    var textfield = $('#inputRecipients');
    var value = "";

    if (contacttype == 0 || contacttype == 1) {
        value = "<span value='" + number + "' type='" + contacttype + "' class='recipients' >" + listdetails + "&nbsp; <i class='icon-remove-circle' onclick='javascript:removeRecip(this);' class='recipClose' style='font-size: 18px;' ></i></span>";
    }
    else if (contacttype == 2 || contacttype == 3) {
        value = "<span value='" + listid + "' type='" + contacttype + "' class='recipients' >" + listdetails + "&nbsp; <i onclick='javascript:removeRecip(this);' class='icon-remove-circle' class='recipClose' style='font-size: 18px;' ></i></span>";
    }

    $('#inputRecipients').remove();
    $('#dataDiv').append(value);
    $('#dataDiv').append(textfield);
    $('#inputRecipients').val('');
});

//Function to get selected recipint email id
$(".thisselected").live("click", function () {
    $(this).addClass("contact-list");
    $(this).removeClass("thisselected");
    
    var textfield = $('#inputRecipients');
    var name = $(this).find('h6').text();
    var number = $(this).find('p').text();
    var listid = $(this).find('h6').attr('listid');
    var listdetails = name + " - " + number;

    if (contacttype == 0 || contacttype == 1) {
        var number = $(this).find('p[type="mobile"]').text();
        $('#dataDiv').find('span[value="' + number + '"]').remove();
    }
    else if (contacttype == 2 || contacttype == 3)
        $('#dataDiv').find('span[value="' + listid + '"]').remove();

    $('#inputRecipients').val('');
    $('#inputRecipients').remove();
    $('#dataDiv').append(textfield);
    
});

$(document).ready(function () {
    $("#backpage").click(function (event) { //Function for back Button
        event.preventDefault();
        history.back(1);
    });
    $('#contactTypeData').hide();
    templateid = getParameterByName("templateid");
    var id = localStorage.ampID;
    var key = localStorage.ampkey;
    var install = localStorage.ampDomain;
    $.ajax({
        type: "GET",
        // ajax call for getting parsed email templates from server
        url: install + "/public/mobile.ashx?method=getsmstemplate&templateid=" + templateid + "&id=" + id + "&key=" + key,
        success: function (tmp) {
            var obj = jQuery.parseJSON(tmp);
            //$('#smsText').append(obj.text); // Template as a email body
            $('#smsText').val(obj.text);
            //            if(obj.locked == "1")
            //                $('#smsText').attr("contenteditable" , "false");

            if (obj.locked == "1") {
                $('#smsText').attr("disabled", "true");
                $('#smsText').css("background-color", "#eee");
                $('#characterCount').hide();
                $('#btnLoadPreview').hide();
            }

            providertext = obj.providertext;
            var find = '<br/>';
            var re = new RegExp(find, 'g');
            providertext = providertext.replace(re, '');

            if (providertext != "" && providertext != null && providertext != undefined) {
                providertext = "\n\n" + providertext;
                maxCharacterCount = maxCharacterCount - providertext.length;
            }

            validateTextCharacterCount();
            loadPreview();

            $("#pageLoader").hide();
        }
    });
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Function for search contact pagination
function Nextcontacts() {
//    var length = window.localStorage.getItem("length");
//    if (length == 50) {
        page++;
        onSearch();
//    }
//    else if (length < 50) {
//        return false;
//    }
}
function Prevcontacts() {
    if (page != 0) {
        page--;
        onSearch();
    }
    else {
        return false;
    }
}
//Function to clear the search contact
function cleardiv() {
    //$("#dataContent").html("");
    $("#nextprev").html("");
    $('#txt_search').val('');
//    var elements = document.getElementsByTagName("input");
//    for (var ii = 0; ii < elements.length; ii++) {
//        if (elements[ii].type == "text") {
//            elements[ii].value = "";
//        }
//    }
}

function loadAMPLists(type) {
    $("#pageLoader").show();
    var id = localStorage.ampID; // ID local storage
    var key = localStorage.ampkey; // Key local storage
    var install = localStorage.ampDomain; // Domain local storage
    $("#dataContent").html("");
    var currentmsg = "";
    var contacts = "";
    
    var search = $.trim($('#txt_search').val());
    if (typeof (search) == undefined)
        search = "";
    
    // Ajax call for Get all contacts
    var uri = install + "/public/mobile.ashx?method=getalllists&id=" + id + "&key=" + key + "&type=" + type + "&mediatype=sms&pagenumber=" + page + "&search=" + search;
    $.ajax({
        type: "GET",
        url: uri,
        success: function (name) {
            jsondata = eval('(' + name + ')');
            if (typeof (jsondata.error) == "string") {
                $("#pageLoader").hide();
                alert(jsondata.error);
            } else {
                var object = jsondata.data;
                showHideNextPrev(jsondata.data.length, page);

                $('#lblTotalContacts').html("Total : " + jsondata.total);

                for (var i = 0; i < jsondata.data.length; i++) {

                    var name = jsondata.data[i].name; ;
                    var description = jsondata.data[i].description;
                    var count = jsondata.data[i].totalmobilecount;

                    if (description == null)
                        description = "";

                    if (name.length > 35)
                        name = name.substring(0, 32) + "...";

                    if (description.length > 35)
                        description = description.substring(0, 32) + "...";

                    if (count != 0 && count != undefined) {
                        currentmsg = currentmsg + "<div class='contact-list'>";
                        currentmsg = currentmsg + "<div class='user-img'><i class='icon-group icon-4x'></i></div>";
                        currentmsg = currentmsg + "<div class='user-details'><h6 listid='" + jsondata.data[i].id + "'>" + name + "</h6><p type='description'>" + description + "</p><p type='count'>" + jsondata.data[i].totalmobilecount + " contact(s)</p></div></div>";
                    }

                }

                if (currentmsg == "")
                    alert("No list found");


                $("#dataContent").html("");
                $("#dataContent").html(currentmsg);
                $("#pageLoader").hide();
            } //else
        },
        fail: function (msg) {
            $("#pageLoader").hide();
            alert('error'); //success
        }
    });
}

//Function to get top 50 Contacts
function Getallcontacts() {
    $("#pageLoader").show();
    var id = localStorage.ampID; // ID local storage
    var key = localStorage.ampkey; // Key local storage
    var install = localStorage.ampDomain; // Domain local storage
    $("#dataContent").html("");
    var currentmsg = "";
    var contacts = "";
    // Ajax call for Get all contacts
    var uri = install + "/public/mobile.ashx?method=getallcontacts&id=" + id + "&key=" + key + "&sortfield=mobilenumber";
    $.ajax({
        type: "GET",
        url: uri,
        success: function (name) {
            jsondata = eval('(' + name + ')');
            if (typeof (jsondata.error) == "string") {
                $("#pageLoader").hide();
                alert(jsondata.error);
            } else {
                var object = jsondata.object;
                for (var i = 0; i < jsondata.length; i++) {
                    if (jsondata[i].mobilenumber != null && jsondata[i].mobilenumber != "") {
                        var firstname = "";
                        if (jsondata[i].firstname != "") {
                            firstname = jsondata[i].firstname;
                        }
                        else {
                            firstname = "N/A";
                        }
                        var lastname = "";
                        if (jsondata[i].lastname != "") {
                            laststname = jsondata[i].lastname;
                        }
                        var profileimage = "";
                        if (jsondata[i].profileimage != null) {
                            profileimage = jsondata[i].profileimage.thumbnail;
                            currentmsg = currentmsg + "<div class='contact-list'>";
                            currentmsg = currentmsg + "<div class='user-img' style='text-align:center;'><img id='Profimage' src='" + profileimage + "'/></div> ";
                            currentmsg = currentmsg + "<div class='user-details'><h6>" + firstname + " " + lastname + "</h6><p type='mobile' style='pointer-events: none'>" + jsondata[i].mobilenumber + "</p></div></div>";
                        }
                        else {
                            currentmsg = currentmsg + "<div class='contact-list'>";
                            currentmsg = currentmsg + "<div class='user-img'><img src='images/user-image.png' width='70' height='70'/></div> ";
                            currentmsg = currentmsg + "<div class='user-details'><h6>" + firstname + " " + lastname + "</h6><p type='mobile' style='pointer-events: none'>" + jsondata[i].mobilenumber + "</p></div></div>";
                        }
                    }
                }

                if (currentmsg == "")
                    alert("No contacts found");

                $("#dataContent").html("");
                $("#dataContent").html(currentmsg); // Appending Contacts in Content1
                $("#pageLoader").hide();
            } //else
        },
        fail: function (msg) {
            $("#pageLoader").hide();
            alert('error'); //success
        }
    });
}

//Function to search Contact
var page = 0;
function submitclick(page) {

    if (contacttype == 1)
        searchContacts(page);
    else if (contacttype == 2)
        loadAMPLists(0);
    else if (contacttype == 3)
        loadAMPLists(1);   
}

function searchContacts(page) {
    $("#pageLoader").show();
    $("#nextprev").html("");
    var id = localStorage.ampID; // Id local storage
    var key = localStorage.ampkey; // Key local Storage
    var install = localStorage.ampDomain; // Domain local storage
    var currentmsg = "";
    var contacts = "";
    var ascending = "false";
    //var sortfield = "updatedon";
    var sortfield = "mobilenumber";
    var pagesize = "50";
    var searchVal = $.trim(document.getElementById('txt_search').value);
    if (searchVal != "") {
        //Ajax call for Search contacts
        var uri = install + "/public/mobile.ashx?method=searchcontactswithpaging&id=" + id + "&key=" + key + "&search=" + searchVal + "&page=" + page + "&pagesize=" + pagesize + "&sortfield=" + sortfield + "&ascending=" + ascending;
        $.ajax({
            type: "GET",
            url: uri,
            success: function (msg) {
                jsondata = eval('(' + msg + ')');
                if (typeof (jsondata.error) == "string") {
                    alert(jsondata.error);
                } else {
                    var object = jsondata.object;
                    var length = jsondata.item.length;
                    localStorage.setItem("length", length);

                    var current = "";
                    var contactCount = 0;

                    if (length == 50 && page == 0) {
                        var current = "";
                        //$('.nextprevbtn').css("margin-top", "-28px");
                        current = current + "<input type='button' id='next' value='Next 50 Contacts' class='btndone' onclick='Nextcontacts()'/>";
                    }
                    else if (length == 50 && page != 0) {
                        var current = "";
                        //$('.nextprevbtn').css("margin-top", "-28px");
                        current = current + "<input type='button' id='prev' value='Prev 50 Contacts' class='btndone' onclick='Prevcontacts()'/>";
                        current = current + "<input type='button' id='next' value='Next 50 Contacts' class='btndone' onclick='Nextcontacts()'/>";
                    }
                    else {
                        if (length != 50 && page == 0) {
                            var current = "";
                            //$('.nextprevbtn').css("margin-top", "5px");
                        }
                        else {
                            var current = "";
                            //$('.nextprevbtn').css("margin-top", "-28px");
                            current = current + "<input type='button' id='prev' value='Prev 50 Contacts' class='btndone' onclick='Prevcontacts()'/>";
                        }
                    }
                    for (var i = 0; i < jsondata.item.length; i++) {
                        if (jsondata.item[i].mobilenumber != "" && jsondata.item[i].mobilenumber != null) {
                            contactCount++;
                            var firstname = "";
                            if (jsondata.item[i].firstname != "") {
                                firstname = jsondata.item[i].firstname;
                            }
                            else {
                                firstname = "N/A";
                            }
                            var lastname = "";
                            if (jsondata.item[i].lastname != "") {
                                laststname = jsondata.item[i].lastname;
                            }
                            var profileimage = "";
                            if (jsondata.item[i].profileimage != null) {
                                profileimage = jsondata.item[i].profileimage.thumbnail;
                                currentmsg = currentmsg + "<div class='contact-list'>";
                                currentmsg = currentmsg + "<div class='user-img' style='text-align:center;'><img id='Profimage' src='" + profileimage + "'/></div>";
                                currentmsg = currentmsg + "<div class='user-details'><h6>" + firstname + " " + jsondata.item[i].lastname + "</h6><p type='mobile' style='pointer-events: none'>" + jsondata.item[i].mobilenumber + "</p></div></div></div>";
                            }
                            else {
                                currentmsg = currentmsg + "<div class='contact-list'>";
                                currentmsg = currentmsg + "<div class='user-img' style='text-align:center;'><img src='images/user-image.png'/></div>";
                                currentmsg = currentmsg + "<div class='user-details'><h6>" + firstname + " " + jsondata.item[i].lastname + "</h6><p type='mobile' style='pointer-events: none'>" + jsondata.item[i].mobilenumber + "</p></div></div></div>";
                            }
                        }
                    }
                    if (currentmsg == "") {
                        current = "";
                        if (page != 0)
                            current = "<input type='button' id='prev' value='Prev 50 contacts' class='btndone' onclick='Prevcontacts()'/>";
                        alert("No Contact Found");
                    }

                    if (contactCount != 50)
                        $(".nextprevbtn").html("");
                    else
                        $(".nextprevbtn").html(current);

                    //$(".nextprevbtn").html(current);
                    $("#dataContent").html(currentmsg); // Appending Contacts
                    $("#pageLoader").hide();
                } //return false;
            },
            fail: function (msg) {
                alert('error');
                $("#pageLoader").hide();
            }
        });
    }
    else {
        $("#pageLoader").hide();
    }
}


//Function for Discard email Button
$('#cancel').live("click", function (e) {
    e.preventDefault();
    var dialog = $('<div class="DialogBox"><p>This sms will be discarded and cannot be recovered. Are you sure you want to discard it?</p></div>').dialog({
        buttons: {
            "Yes": function () {
                var elements = document.getElementsByTagName("input");
                for (var ii = 0; ii < elements.length; ii++) {
                    if (elements[ii].type == "text" || elements[ii].type == "mobile") {
                        elements[ii].value = "";
                    }
                    //$("#smsText").html("");
                    $("#smsText").val("");
                    window.location = "sms-template.html";
                }
            },
            "Cancel": function () {
                dialog.dialog('close');
            }
        }
    });
});

//Function for Sending Emails
function sendsms() {
    $("#pageLoader").show();
    templateid = getParameterByName("templateid");
    var id = localStorage.ampID; // ID local storage
    var key = localStorage.ampkey; // Key local storage
    var install = localStorage.ampDomain; // Domain local Storage

    var textfield = $('#inputRecipients');
    var text = $.trim($(textfield).val());

    var errorMsg = "";
    var filter = /^\d{10}$/;

    if (text != null && text == "");
    {
        if (text != "" && text.indexOf(';') == text.length - 1) {
            text = text.replace(';', '');
            text = text.replace(' ', '');
        }

        if (!filter.test(text)) {
            if (text != "") {
                errorMsg = errorMsg + " " + text;
            }
        }
        else
            insertValue(text);
    }

    if (errorMsg != "") {
        alert("Invalid Recipients : " + errorMsg);
        $("#pageLoader").hide();
        $("#inputRecipients").focus();
        return false;
    }

    var smsText = $('#smsText').val();
    //var text = $('#smsText').html();
    var text = $('#smsText').val() + providertext;
    var allRecipients = $('#dataDiv').find('span');

    if (allRecipients == null || allRecipients.length == 0) {
        alert("Please Enter Recipients");
        $("#pageLoader").hide();
        return false;
    }

    var r = confirm('Following message will be sent: \n"' + text + '"\n Are you sure?');
    if (r == false) {
        $("#pageLoader").hide();
        return false;
    }

    var allMobileRecipients = "";
    var allListRecipients = "";

    for (var k = 0; k < allRecipients.length; k++) {
        var recip = allRecipients[k];
        var type = $(recip).attr('type');
        var value = $(recip).attr('value');
        if (type == "0" || type == "1") {
            if (allMobileRecipients == "") allMobileRecipients += value; else allMobileRecipients += "," + value;
        }
        else if (type == "2" || type == "3") {
            if (allListRecipients == "") allListRecipients += value; else allListRecipients += "," + value;
         }
    }
   
    // Ajax call for sending Email Templates
    var uri = install + "/public/mobile.ashx?method=sendsms&id=" + id + "&key=" + key + "&to=" + encodeURIComponent(allMobileRecipients) + "&lists=" + encodeURIComponent(allListRecipients) + "&templateid=" + templateid + "&text=" + encodeURIComponent(smsText);
    $.ajax({
        type: "GET",
        url: uri,
        success: function (name) {
            jsondata = eval('(' + name + ')');
            if (typeof (jsondata.error) == "string") {
            
            } else {
                alert('SMS Sent Successfully');
                $("#pageLoader").hide();
                cancel();
            }
        },
        fail: function (msg) {
            alert('error'); //success
            $("#pageLoader").hide();
        }
    });
}

//Function to clear the email page after sending email
function cancel() {
    var elements = document.getElementsByTagName("input");
    for (var ii = 0; ii < elements.length; ii++) {
        if (elements[ii].type == "text") {
            elements[ii].value = "";
        }
        //$("#smsText").html("");
        $("#smsText").val("");
        window.location = "sms-template.html";
    }
}

function loadPreview() {
    //var smstext = $('#smsText').html();
    var smstext = $('#smsText').val();
    //$('#previewSMSText').html('');
    $('#previewSMSText').val('');
    //$('#previewSMSText').append(smstext + " <br/><br/> Reply HELP for help & STOP to cancel"); // Template as a email body
    $('#previewSMSText').val(smstext + providertext); // Template as a email body
}


function showHideNextPrev(length , page) {
    if (length == 50 && page == 0) {
        var current = "";
        //$('.nextprevbtn').css("margin-top", "-28px");
        current = current + "<input type='button' id='next' value='Next 50 Lists' class='btndone' onclick='Nextcontacts()'/>";
    }
    else if (length == 50 && page != 0) {
        var current = "";
        //$('.nextprevbtn').css("margin-top", "-28px");
        current = current + "<input type='button' id='prev' value='Prev 50 Lists' class='btndone' onclick='Prevcontacts()'/>";
        current = current + "<input type='button' id='next' value='Next 50 Lists' class='btndone' onclick='Nextcontacts()'/>";
    }
    else {
        if (length != 50 && page == 0) {
            var current = "";
          //  $('.nextprevbtn').css("margin-top", "5px");
        }
        else {
            var current = "";
            //$('.nextprevbtn').css("margin-top", "-28px");
            current = current + "<input type='button' id='prev' value='Prev 50 Lists' class='btndone' onclick='Prevcontacts()'/>";
        }
    }
    $(".nextprevbtn").html(current);
}

function onKeyUp() {
    var textfield = $('#inputRecipients');
    var text = $.trim($(textfield).val());

    var errorMsg = "";
    var filter = /^\d{10}$/;

    if (text != "" && text.indexOf(';') == text.length - 1) {
        text = text.replace(';', '');
        text = text.replace(' ', '');
        text = $.trim(text);
        if (!filter.test(text)) {
            if (text != "") {
                errorMsg = errorMsg + " " + text;
            }
        }
        else
            insertValue(text);
    }

    if (errorMsg != "") {
        alert("Invalid recipients :" + errorMsg);
    }
}

function insertValue(text) {
    var textfield = $('#inputRecipients');
    //var value = "<span value='" + text + "' type='0' style='background-color:#ccc;height:25px;padding:5px;margin-right:3px;display:inline-block; font-size:14px;' >" + text + "&nbsp;<i class='icon-remove-circle' style='font-size: 18px;margin-top: 2px;display: inline-block;' onclick='javascript:removeRecip(this);'></i></span>";
    var value = "<span value='" + text + "' type='0' class='recipients' >" + text + "&nbsp;<i class='icon-remove-circle' class='recipClose' onclick='javascript:removeRecip(this);' style='font-size: 18px;' ></i></span>";
    $('#inputRecipients').remove();
    $('#dataDiv').append(value);
    $('#dataDiv').append(textfield);
    $('#inputRecipients').val('');
    $('#inputRecipients').focus();
}

function removeRecip(span) {
    $(span).parent().remove();
 }

function focusText() {
    $('#inputRecipients').focus();
//    $('#dataDiv').removeClass('smslistbox');
//    $('#dataDiv').addClass('smslistboxselected');
}

function validateTextCharacterCount() {
    var text = $('#smsText').val();
    var length = text.length;
    var labelCount = maxCharacterCount - length;

    if (labelCount < 0) {
        text = text.substring(0, maxCharacterCount);
        $('#smsText').val(text);
        labelCount = 0;
    }

    $('#characterCount').text(labelCount + " characters remaining");
}
