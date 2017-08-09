











































































var snSrc;
if (window.__smartNav == null)
{
    window.__smartNav = new Object();
    window.__smartNav.update = function()
    {
        var sn = window.__smartNav;
        var fd;
        document.detachEvent("onstop", sn.stopHif);
        sn.inPost = false;
        try { fd = frames["__hifSmartNav"].document; } catch (e) {return;}
        var fdr = fd.getElementsByTagName("asp_smartnav_rdir");
        if (fdr.length > 0)
        {
            if (sn.sHif == null)
            {
                sn.sHif = document.createElement("IFRAME");
                sn.sHif.name = "__hifSmartNav";
                sn.sHif.style.display = "none";
                sn.sHif.src = snSrc;
            }
            try {window.location = fdr[0].url;} catch (e) {};
            return;
        }
        var fdurl = fd.location.href;
        index = fdurl.indexOf(snSrc);
        if ((index != -1 && index == fdurl.length-snSrc.length)
            || fdurl == "about:blank")
            return;
        if (sn.sHif != null)
        {
            sn.sHif.removeNode(true);
            sn.sHif = null;
        }
        var hdm = document.getElementsByTagName("head")[0];
        var hk = hdm.childNodes;
        var tt = null;
        for (var i = hk.length - 1; i>= 0; i--)
        {
            if (hk[i].tagName == "TITLE")
            {
                tt = hk[i].outerHTML;
                continue;
            }
            if (hk[i].tagName != "BASEFONT" || hk[i].innerHTML.length == 0)
                hdm.removeChild(hdm.childNodes[i]);
        }
        var kids = fd.getElementsByTagName("head")[0].childNodes;
        for (var i = 0; i < kids.length; i++)
        {
            var tn = kids[i].tagName;
            var k = document.createElement(tn);
            k.id = kids[i].id;
            k.mergeAttributes(kids[i]);
            switch(tn)
            {
            case "TITLE":
                if (tt == kids[i].outerHTML)
                    continue;
                k.innerText = kids[i].text;
                hdm.insertAdjacentElement("afterbegin", k);
                continue;
            case "BASEFONT" :
                if (kids[i].innerHTML.length > 0)
                    continue;
                break;
            default:
                var o = document.createElement("BODY");
                o.innerHTML = "<BODY>" + kids[i].outerHTML + "</BODY>";
                k = o.firstChild;
                break;
            }
            if(k!=null)
                hdm.appendChild(k);
        }
        document.body.clearAttributes();
        document.body.id = fd.body.id;
        document.body.mergeAttributes(fd.body);
        var newBodyLoad = fd.body.onload;
        if (newBodyLoad != null)
            document.body.onload = newBodyLoad;
        var s = "<BODY>" + fd.body.innerHTML + "</BODY>";
        if (sn.hif != null)
        {
            var hifP = sn.hif.parentElement;
            if (hifP != null)
                sn.sHif=hifP.removeChild(sn.hif);
        }
        document.body.innerHTML = s;
        var sc = document.scripts;
        for (var i = 0; i < sc.length; i++)
        {
            sc[i].text = sc[i].text;
        }
        sn.hif = document.all("__hifSmartNav");
        if (sn.hif != null)
        {
            var hif = sn.hif;
            sn.hifName = "__hifSmartNav" + (new Date()).getTime();
            frames["__hifSmartNav"].name = sn.hifName;
            sn.hifDoc = hif.contentWindow.document;
            if (sn.ie5)
                hif.parentElement.removeChild(hif);
            window.setTimeout(sn.restoreFocus,0);
        }
        if (typeof(window.onload) == "string")
        {
            try { eval(window.onload) } catch (e) {};
        }
        else if (window.onload != null)
        {
            try { window.onload() } catch (e) {};
        }
        sn.attachForm();
    };
    window.__smartNav.restoreFocus = function()
    {
        if (window.__smartNav.inPost == true) return;
        var curAe = document.activeElement;
        var sAeId = window.__smartNav.ae;
        if (sAeId==null || curAe!=null && (curAe.id==sAeId||curAe.name==sAeId))
            return;
        var ae = document.all(sAeId);
        if (ae == null) return;
        try { ae.focus(); } catch(e){};
    }
    window.__smartNav.saveHistory = function()
    {
        if (window.__smartNav.hif != null)
            window.__smartNav.hif.removeNode();
        if (    window.__smartNav.sHif != null
            &&  document.all[window.__smartNav.siHif] != null)
            document.all[window.__smartNav.siHif].insertAdjacentElement(
                        "BeforeBegin", window.__smartNav.sHif);
    }
    window.__smartNav.stopHif = function()
    {
        document.detachEvent("onstop", window.__smartNav.stopHif);
        var sn = window.__smartNav;
        if (sn.hifDoc == null && sn.hif != null)
        {
            try {sn.hifDoc = sn.hif.contentWindow.document;}
            catch(e){sn.hifDoc=null}
        }
        if (sn.hifDoc != null)
        {
            try {sn.hifDoc.execCommand("stop");} catch (e){}
        }
    }
    window.__smartNav.init =  function()
    {
        var sn = window.__smartNav;
        document.detachEvent("onstop", sn.stopHif);
        document.attachEvent("onstop", sn.stopHif);
        try { if (window.event.returnValue == false) return; } catch(e) {}
        sn.inPost = true;
        if (document.activeElement != null)
        {
            var ae = document.activeElement.id;
            if (ae.length == 0)
                ae = document.activeElement.name;
            sn.ae = ae;
        }
        else
            sn.ae = null;
        try {document.selection.empty();} catch (e) {}
        if (sn.hif == null)
        {
            sn.hif = document.all("__hifSmartNav");
            sn.hifDoc = sn.hif.contentWindow.document;
        }
        if (sn.hifDoc != null)
            try {sn.hifDoc.designMode = "On";}catch(e){};
        if (sn.hif.parentElement == null)
            document.body.appendChild(sn.hif);
        var hif = sn.hif;
        hif.detachEvent("onload", sn.update);
        hif.attachEvent("onload", sn.update);
        window.__smartNav.fInit = true;
    };
    window.__smartNav.submit = function()
    {
        window.__smartNav.fInit = false;
        try { window.__smartNav.init(); } catch(e) {}
        if (window.__smartNav.fInit)
            window.__smartNav.form._submit();
    };
    window.__smartNav.attachForm = function()
    {
        var cf = document.forms;
        for (var i=0; i<cf.length; i++)
        {
            if (cf[i].__smartNavEnabled != null)
            {
                window.__smartNav.form = cf[i];
                break;
            }
        }
        var snfm = window.__smartNav.form;
        if (snfm == null) return false;
        var sft = snfm.target;
        if (sft.length != 0 && sft.indexOf("__hifSmartNav") != 0) return false;
        var sfc = snfm.action.split("?")[0];
        var url = window.location.href.split("?")[0];
        if (url.charAt(url.length-1) != '/' && url.lastIndexOf(sfc) + sfc.length != url.length) return false;
        if (snfm.__formAttached == true) return true;
        snfm.__formAttached = true;
        snfm.attachEvent("onsubmit", window.__smartNav.init);
        snfm._submit = snfm.submit;
        snfm.submit = window.__smartNav.submit;
        snfm.target = window.__smartNav.hifName;
        return true;
    };
    window.__smartNav.hifName = "__hifSmartNav" + (new Date()).getTime();
    window.__smartNav.ie5 = navigator.appVersion.indexOf("MSIE 5") > 0;
    var rc = window.__smartNav.attachForm();
    var hif = document.all("__hifSmartNav");
    if (snSrc == null) {
        snSrc = hif.src;
    }
    if (rc)
    {
        var fsn = frames["__hifSmartNav"];
        fsn.name = window.__smartNav.hifName;
        window.__smartNav.siHif = hif.sourceIndex;
        try {
            if (fsn.document.location != snSrc)
            {
                fsn.document.designMode = "On";
                hif.attachEvent("onload",window.__smartNav.update);
                window.__smartNav.hif = hif;
            }
        }
        catch (e) { window.__smartNav.hif = hif; }
        window.attachEvent("onbeforeunload", window.__smartNav.saveHistory);
    }
    else
        window.__smartNav = null;
}


var Page_ValidationVer = "125";
var Page_IsValid = true;
var Page_BlockSubmit = false;
function ValidatorUpdateDisplay(val) {
    if (typeof(val.display) == "string") {    
        if (val.display == "None") {
            return;
        }
        if (val.display == "Dynamic") {
            val.style.display = val.isvalid ? "none" : "inline";
            return;
        }
    }
    val.style.visibility = val.isvalid ? "hidden" : "visible";
}
function ValidatorUpdateIsValid() {
    var i;
    for (i = 0; i < Page_Validators.length; i++) {
        if (!Page_Validators[i].isvalid) {
            Page_IsValid = false;
            return;
        }
   }
   Page_IsValid = true;
}
function ValidatorHookupControlID(controlID, val) {
    if (typeof(controlID) != "string") {
        return;
    }
    var ctrl = document.all[controlID];
    if (typeof(ctrl) != "undefined") {
        ValidatorHookupControl(ctrl, val);
    }
    else {
        val.isvalid = true;
        val.enabled = false;
    }
}
function ValidatorHookupControl(control, val) {
    if (typeof(control.tagName) == "undefined" && typeof(control.length) == "number") {
        var i;
        for (i = 0; i < control.length; i++) {
            var inner = control[i];
            if (typeof(inner.value) == "string") {
                ValidatorHookupControl(inner, val);
            } 
        }
        return;
    }
    else if (control.tagName != "INPUT" && control.tagName != "TEXTAREA" && control.tagName != "SELECT") {
        var i;
        for (i = 0; i < control.children.length; i++) {
            ValidatorHookupControl(control.children[i], val);
        }
        return;
    }
    else {
        if (typeof(control.Validators) == "undefined") {
            control.Validators = new Array;
            var ev;
            if (control.type == "radio") {
                ev = control.onclick;
            } else {
                ev = control.onchange;
            }
            if (typeof(ev) == "function" ) {            
                ev = ev.toString();
                ev = ev.substring(ev.indexOf("{") + 1, ev.lastIndexOf("}"));
            }
            else {
                ev = "";
            }
            var func = new Function("ValidatorOnChange(); " + ev);
            if (control.type == "radio") {
                control.onclick = func;
            } else {            
                control.onchange = func;
            }
        }
        control.Validators[control.Validators.length] = val;
    }    
}
function ValidatorGetValue(id) {
    var control;
    control = document.all[id];
    if (typeof(control.value) == "string") {
        return control.value;
    }
    if (typeof(control.tagName) == "undefined" && typeof(control.length) == "number") {
        var j;
        for (j=0; j < control.length; j++) {
            var inner = control[j];
            if (typeof(inner.value) == "string" && (inner.type != "radio" || inner.status == true)) {
                return inner.value;
            }
        }
    }
    else {
        return ValidatorGetValueRecursive(control);
    }
    return "";
}
function ValidatorGetValueRecursive(control)
{
    if (typeof(control.value) == "string" && (control.type != "radio" || control.status == true)) {
        return control.value;
    }
    var i, val;
    for (i = 0; i<control.children.length; i++) {
        val = ValidatorGetValueRecursive(control.children[i]);
        if (val != "") return val;
    }
    return "";
}
function Page_ClientValidate() {
    var i;
    for (i = 0; i < Page_Validators.length; i++) {
        ValidatorValidate(Page_Validators[i]);
    }
    ValidatorUpdateIsValid();    
    ValidationSummaryOnSubmit();
    Page_BlockSubmit = !Page_IsValid;
    return Page_IsValid;
}
function ValidatorCommonOnSubmit() {
    var result = !Page_BlockSubmit;
    Page_BlockSubmit = false;
    event.returnValue = result;
    return result;
}
function ValidatorEnable(val, enable) {
    val.enabled = (enable != false);
    ValidatorValidate(val);
    ValidatorUpdateIsValid();
}
function ValidatorOnChange() {
    var vals = event.srcElement.Validators;
    var i;
    for (i = 0; i < vals.length; i++) {
        ValidatorValidate(vals[i]);
    }
    ValidatorUpdateIsValid();    
}
function ValidatorValidate(val) {    
    val.isvalid = true;
    if (val.enabled != false) {
        if (typeof(val.evaluationfunction) == "function") {
            val.isvalid = val.evaluationfunction(val); 
        }
    }
    ValidatorUpdateDisplay(val);
}
function ValidatorOnLoad() {
    if (typeof(Page_Validators) == "undefined")
        return;
    var i, val;
    for (i = 0; i < Page_Validators.length; i++) {
        val = Page_Validators[i];
        if (typeof(val.evaluationfunction) == "string") {
            eval("val.evaluationfunction = " + val.evaluationfunction + ";");
        }
        if (typeof(val.isvalid) == "string") {
            if (val.isvalid == "False") {
                val.isvalid = false;                                
                Page_IsValid = false;
            } 
            else {
                val.isvalid = true;
            }
        } else {
            val.isvalid = true;
        }
        if (typeof(val.enabled) == "string") {
            val.enabled = (val.enabled != "False");
        }
        ValidatorHookupControlID(val.controltovalidate, val);
        ValidatorHookupControlID(val.controlhookup, val);
    }
    Page_ValidationActive = true;
}
function ValidatorConvert(op, dataType, val) {
    function GetFullYear(year) {
        return (year + parseInt(val.century)) - ((year < val.cutoffyear) ? 0 : 100);
    }
    var num, cleanInput, m, exp;
    if (dataType == "Integer") {
        exp = /^\s*[-\+]?\d+\s*$/;
        if (op.match(exp) == null) 
            return null;
        num = parseInt(op, 10);
        return (isNaN(num) ? null : num);
    }
    else if(dataType == "Double") {
        exp = new RegExp("^\\s*([-\\+])?(\\d+)?(\\" + val.decimalchar + "(\\d+))?\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        cleanInput = m[1] + (m[2].length>0 ? m[2] : "0") + "." + m[4];
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);            
    } 
    else if (dataType == "Currency") {
        exp = new RegExp("^\\s*([-\\+])?(((\\d+)\\" + val.groupchar + ")*)(\\d+)"
                        + ((val.digits > 0) ? "(\\" + val.decimalchar + "(\\d{1," + val.digits + "}))?" : "")
                        + "\\s*$");
        m = op.match(exp);
        if (m == null)
            return null;
        var intermed = m[2] + m[5] ;
        cleanInput = m[1] + intermed.replace(new RegExp("(\\" + val.groupchar + ")", "g"), "") + ((val.digits > 0) ? "." + m[7] : 0);
        num = parseFloat(cleanInput);
        return (isNaN(num) ? null : num);            
    }
    else if (dataType == "Date") {
        var yearFirstExp = new RegExp("^\\s*((\\d{4})|(\\d{2}))([-/]|\\. ?)(\\d{1,2})\\4(\\d{1,2})\\s*$");
        m = op.match(yearFirstExp);
        var day, month, year;
        if (m != null && (m[2].length == 4 || val.dateorder == "ymd")) {
            day = m[6];
            month = m[5];
            year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3], 10))
        }
        else {
            if (val.dateorder == "ymd"){
                return null;		
            }						
            var yearLastExp = new RegExp("^\\s*(\\d{1,2})([-/]|\\. ?)(\\d{1,2})\\2((\\d{4})|(\\d{2}))\\s*$");
            m = op.match(yearLastExp);
            if (m == null) {
                return null;
            }
            if (val.dateorder == "mdy") {
                day = m[3];
                month = m[1];
            }
            else {
                day = m[1];
                month = m[3];
            }
            year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6], 10))
        }
        month -= 1;
        var date = new Date(year, month, day);
        return (typeof(date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate()) ? date.valueOf() : null;
    }
    else {
        return op.toString();
    }
}
function ValidatorCompare(operand1, operand2, operator, val) {
    var dataType = val.type;
    var op1, op2;
    if ((op1 = ValidatorConvert(operand1, dataType, val)) == null)
        return false;    
    if (operator == "DataTypeCheck")
        return true;
    if ((op2 = ValidatorConvert(operand2, dataType, val)) == null)
        return true;
    switch (operator) {
        case "NotEqual":
            return (op1 != op2);
        case "GreaterThan":
            return (op1 > op2);
        case "GreaterThanEqual":
            return (op1 >= op2);
        case "LessThan":
            return (op1 < op2);
        case "LessThanEqual":
            return (op1 <= op2);
        default:
            return (op1 == op2);            
    }
}
function CompareValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;
    var compareTo = "";
    if (null == document.all[val.controltocompare]) {
        if (typeof(val.valuetocompare) == "string") {
            compareTo = val.valuetocompare;
        }
    }
    else {
        compareTo = ValidatorGetValue(val.controltocompare);
    }
    return ValidatorCompare(value, compareTo, val.operator, val);
}
function CustomValidatorEvaluateIsValid(val) {
    var value = "";
    if (typeof(val.controltovalidate) == "string") {
        value = ValidatorGetValue(val.controltovalidate);
        if (ValidatorTrim(value).length == 0)
            return true;
    }
    var args = { Value:value, IsValid:true };
    if (typeof(val.clientvalidationfunction) == "string") {
        eval(val.clientvalidationfunction + "(val, args) ;");
    }        
    return args.IsValid;
}
function RegularExpressionValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0)
        return true;        
    var rx = new RegExp(val.validationexpression);
    var matches = rx.exec(value);
    return (matches != null && value == matches[0]);
}
function ValidatorTrim(s) {
    var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
    return (m == null) ? "" : m[1];
}
function RequiredFieldValidatorEvaluateIsValid(val) {
    return (ValidatorTrim(ValidatorGetValue(val.controltovalidate)) != ValidatorTrim(val.initialvalue))
}
function RangeValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0) 
        return true;
    return (ValidatorCompare(value, val.minimumvalue, "GreaterThanEqual", val) &&
            ValidatorCompare(value, val.maximumvalue, "LessThanEqual", val));
}
function ValidationSummaryOnSubmit() {
    if (typeof(Page_ValidationSummaries) == "undefined") 
        return;
    var summary, sums, s;
    for (sums = 0; sums < Page_ValidationSummaries.length; sums++) {
        summary = Page_ValidationSummaries[sums];
        summary.style.display = "none";
        if (!Page_IsValid) {
            if (summary.showsummary != "False") {
                summary.style.display = "";
                if (typeof(summary.displaymode) != "string") {
                    summary.displaymode = "BulletList";
                }
                switch (summary.displaymode) {
                    case "List":
                        headerSep = "<br>";
                        first = "";
                        pre = "";
                        post = "<br>";
                        final = "";
                        break;
                    case "BulletList":
                    default: 
                        headerSep = "";
                        first = "<ul>";
                        pre = "<li>";
                        post = "</li>";
                        final = "</ul>";
                        break;
                    case "SingleParagraph":
                        headerSep = " ";
                        first = "";
                        pre = "";
                        post = " ";
                        final = "<br>";
                        break;
                }
                s = "";
                if (typeof(summary.headertext) == "string") {
                    s += summary.headertext + headerSep;
                }
                s += first;
                for (i=0; i<Page_Validators.length; i++) {
                    if (!Page_Validators[i].isvalid && typeof(Page_Validators[i].errormessage) == "string") {
                        s += pre + Page_Validators[i].errormessage + post;
                    }
                }   
                s += final;
                summary.innerHTML = s; 
                window.scrollTo(0,0);
            }
            if (summary.showmessagebox == "True") {
                s = "";
                if (typeof(summary.headertext) == "string") {
                    s += summary.headertext + "<BR>";
                }
                for (i=0; i<Page_Validators.length; i++) {
                    if (!Page_Validators[i].isvalid && typeof(Page_Validators[i].errormessage) == "string") {
                        switch (summary.displaymode) {
                            case "List":
                                s += Page_Validators[i].errormessage + "<BR>";
                                break;
                            case "BulletList":
                            default: 
                                s += "  - " + Page_Validators[i].errormessage + "<BR>";
                                break;
                            case "SingleParagraph":
                                s += Page_Validators[i].errormessage + " ";
                                break;
                        }
                    }
                }
                span = document.createElement("SPAN");
                span.innerHTML = s;
                s = span.innerText;
                alert(s);
            }
        }
    }
}


