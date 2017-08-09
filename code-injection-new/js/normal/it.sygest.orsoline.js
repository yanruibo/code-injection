



        function SaveNotes() {
            localStorage.notes = document.getElementById("notes").value;
        }
        function LoadNotes() {
            if (typeof (localStorage.notes) != "undefined")
                document.getElementById("notes").value = localStorage.notes;
        }
    






        function CheckPWD() {
            InitGetRootDoc();
            if (getconfig("enabled")!=0) {
                document.getElementById("codcli").value = getconfig("codcli");
            }
            if (document.getElementById("codcli").value == getconfig("codcli")) {
                document.getElementById("codcli").style.display = "none";
                document.getElementById("home").style.display = "";
                var xml = fs.readConfig("settings");
                xml.find("enabled").text("1");
                fs.writeConfig("settings", xml);
            }
            else {
                document.getElementById("codcli").style.display = "";
                document.getElementById("home").style.display = "none";
            }
        }
        $(function () {
            $(document).ready(function () {
                document.addEventListener("deviceready", CheckPWD, false);
            });
          });
    




        document.addEventListener('DOMContentLoaded', function () {
                                  var myPhotoSwipe = Code.PhotoSwipe.attach(window.document.querySelectorAll('#Gallery a'), {
                                                                            captionAndToolbarAutoHideDelay: 0,
                                                                            allowUserZoom: false
                                  });
        }, false);
    

//ANDROID
var WebIntent = function () { };
WebIntent.ACTION_SEND = "android.intent.action.SEND";
WebIntent.ACTION_VIEW = "android.intent.action.VIEW";
WebIntent.EXTRA_TEXT = "android.intent.extra.TEXT";
WebIntent.EXTRA_SUBJECT = "android.intent.extra.SUBJECT";
WebIntent.EXTRA_STREAM = "android.intent.extra.STREAM";
WebIntent.EXTRA_EMAIL = "android.intent.extra.EMAIL";
WebIntent.prototype.startActivity = function (params, success, fail) {
    return cordova.exec(function (args) {
        success(args);
    }, function (args) {
        fail(args);
    }, 'WebIntent', 'startActivity', [params]);
};
WebIntent.prototype.hasExtra = function (params, success, fail) {
    return cordova.exec(function (args) {
        success(args);
    }, function (args) {
        fail(args);
    }, 'WebIntent', 'hasExtra', [params]);
};
WebIntent.prototype.getUri = function (success, fail) {
    return cordova.exec(function (args) {
        success(args);
    }, function (args) {
        fail(args);
    }, 'WebIntent', 'getUri', []);
};
WebIntent.prototype.getExtra = function (params, success, fail) {
    return cordova.exec(function (args) {
        success(args);
    }, function (args) {
        fail(args);
    }, 'WebIntent', 'getExtra', [params]);
};
WebIntent.prototype.onNewIntent = function (callback) {
    return cordova.exec(function (args) {
        callback(args);
    }, function (args) {
    }, 'WebIntent', 'onNewIntent', []);
};
WebIntent.prototype.sendBroadcast = function (params, success, fail) {
    return cordova.exec(function (args) {
        success(args);
    }, function (args) {
        fail(args);
    }, 'WebIntent', 'sendBroadcast', [params]);
};
cordova.addConstructor(function () {
    window.webintent = new WebIntent();
    // backwards compatibility	
    window.plugins = window.plugins || {};
    window.plugins.webintent = window.webintent;
});
//IOS
function EmailComposer() {
    this.resultCallback = null; // Function
}
EmailComposer.ComposeResultType = {
    Cancelled: 0,
    Saved: 1,
    Sent: 2,
    Failed: 3,
    NotSent: 4
}
// showEmailComposer : all args optional
EmailComposer.prototype.showEmailComposer = function (subject, body, toRecipients, ccRecipients, bccRecipients, bIsHTML, attachment) {
    var args = {};
    if (toRecipients) args.toRecipients = toRecipients;
    if (ccRecipients) args.ccRecipients = ccRecipients;
    if (bccRecipients) args.bccRecipients = bccRecipients;
    if (subject) args.subject = subject;
    if (body) args.body = body;
    if (bIsHTML) args.bIsHTML = bIsHTML;
    if (attachment) args.attachment = attachment;
    cordova.exec(null, null, "EmailComposer", "showEmailComposer", [args]);
}
// this will be forever known as the orch-func -jm
EmailComposer.prototype.showEmailComposerWithCB = function (cbFunction, subject, body, toRecipients, ccRecipients, bccRecipients, bIsHTML) {
    this.resultCallback = cbFunction;
    this.showEmailComposer.apply(this, [subject, body, toRecipients, ccRecipients, bccRecipients, bIsHTML]);
}
EmailComposer.prototype._didFinishWithResult = function (res) {
    this.resultCallback(res);
}
cordova.addConstructor(function () {
    if (!window.plugins) window.plugins = {};
    // shim to work in 1.5 and 1.6
    if (!window.Cordova) window.Cordova = cordova;
    window.plugins.emailComposer = new EmailComposer();
});


function InitGetRootDoc() {
    var platform = device.platform.toUpperCase();
    var rootDoc = "";
    if (platform.indexOf('IOS') > -1) rootDoc = "../../Documents/";
    if (platform.indexOf('ANDROID') > -1) {
        rootDoc = "/data/data/it.sygest.orsoline/files/";
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onRequestFileSystemSuccess, null);
        function onRequestFileSystemSuccess(fileSystem) {
            var entry = fileSystem.root;
            entry.getDirectory(rootDoc, {
                create: true,
                exclusive: false
            }, onGetDirectorySuccess, onGetDirectoryFail);
        }
        function onGetDirectorySuccess(dir) {
            console.log("Created dir " + dir.name);
        }
        function onGetDirectoryFail(error) {
            console.log("Error creating directory " + error.code);
        }
    }
    return rootDoc;
}
function GetRootDoc() {
    var platform = device.platform.toUpperCase();
    var rootDoc = "";
    if (platform.indexOf('IOS') > -1) rootDoc = "../../Documents/";
    if (platform.indexOf('ANDROID') > -1) rootDoc = "/data/data/it.sygest.orsoline/files/";
    return rootDoc;
}
function GetRootDef() {
    var platform = device.platform.toUpperCase();
    if (platform.indexOf('IOS') > -1) return "xml/";
    if (platform.indexOf('ANDROID') > -1) return "file:///android_asset/www/xml/";
}
function getconfig(key) {
    if (key == "") return "";
    if (key == "rootdoc") return GetRootDoc();
    var rootDoc = GetRootDoc();
    var value = null;
    var url = rootDoc + "settings.xml";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        async: false,
        cache: false,
        success: function (data, textStatus, jqXHR) {
            var xml = data;
            value = $(xml).find(key).text();
            //alert("1:" + ReadFSTXT(rootDoc + "settings.xml"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //alert("2:" + ReadFSTXT(GetRootDef() + "settings.xml"));
            var text = ReadFSTXT(GetRootDef() + "settings.xml");
            WriteFSTXT(rootDoc + "settings.xml", text, false);
            value = $(text).find(key).text();
        }
    });
    return value;
}

var fs = {};
fs.configExists = function (name) {
    var filepath = getconfig("rootdoc") + name + ".xml";
    var xml = null;
    var r = false;
    $.ajax({
        type: "GET",
        url: filepath,
        dataType: "xml",
        async: false,
        cache: false,
        success: function (data, textStatus, jqXHR) {
            r = true;
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
    return r;
}
fs.readConfig = function (name) {
    var filepath = getconfig("rootdoc") + name + ".xml";
    var xml = null;
    $.ajax({
        type: "GET",
        url: filepath,
        dataType: "xml",
        async: false,
        cache: false,
        success: function (data, textStatus, jqXHR) {
            xml = $(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("fs.readConfig:" + name + ": " + errorThrown);
        }
    });
    return xml;
}
fs.writeConfig = function (name, xml) {
    var filepath = getconfig("rootdoc") + name + ".xml";
    var text = (new XMLSerializer()).serializeToString(xml[0]);
    WriteFSTXT(filepath, text, false);
}
fs.mailfile = "cart.csv";
var mailto, mailsubject, mailbody, mailattach;
fs.mail = function (to, subject, body, textfile) {
    mailto = to;
    mailsubject = subject;
    mailbody = body;
    var platform = device.platform.toUpperCase();
    if (platform.indexOf('IOS') > -1 ) {
        mailattach = fs.mailfile;
    }
    if (platform.indexOf('ANDROID') > -1) {
        mailattach = "/sdcard/" + fs.mailfile;
    }
    WriteFSTXT(mailattach, textfile, false);
    setTimeout(checkEmail, 500);
}
function checkEmail() {
    var platform = device.platform.toUpperCase();
    if (platform.indexOf('IOS') > -1) {
        window.plugins.emailComposer.showEmailComposer(mailsubject, mailbody, mailto, "", "", false, mailattach);
    }
    if (platform.indexOf('ANDROID') > -1) {
        var attachfile = "file://" + mailattach;
        //if (ReadFSTXT(attachfile) == null || ReadFSTXT(attachfile) == "") {
        //    setTimeout(checkEmail, 500);
        //}
        //else {
        var extras = {};
        extras[WebIntent.EXTRA_SUBJECT] = mailsubject;
        extras[WebIntent.EXTRA_TEXT] = mailbody;
        extras[WebIntent.EXTRA_STREAM] = attachfile;
        extras[WebIntent.EXTRA_EMAIL] = mailto;
        window.plugins.webintent.startActivity({
            action: WebIntent.ACTION_SEND,
            type: '*/*',
            extras: extras
        }, function () {
        }, function () {
            alert('Failed to send email via Android Intent');
        });
        //}
    }
}
/************************************************************************/
var filename_FSTXT;
var testo_FSTXT;
var appenttofile_FSTXT;
var dirToRemove;
var fileToRemove;
var filename_FSTXT1;
var testo_FSTXT1;
var appenttofile_FSTXT1;
var oper_w;
function ReadFSTXT(filepath) {
    var text = null;
    $.ajax({
        type: "GET",
        url: filepath,
        dataType: "text",
        async: false,
        cache: false,
        success: function (data, textStatus, jqXHR) {
            text = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var request = new XMLHttpRequest();
            request.open("GET", filepath, false);
            request.onreadystatechange = function () {
                if (request.readyState == 4)
                    if (request.status == 200 || request.status == 0)
                        text = request.responseText;
            }
            request.send();
        }
    });
    return text;
}
function WriteFSTXT(file1, test1, toapp) {
    filename_FSTXT = file1;
    var osStr = device.platform.toUpperCase();
    var rootDoc = GetRootDoc();
    // Se è un iOS rimuovo il path del Documents perchè non lo gode...
    if (osStr.indexOf('IOS') > -1)
        if (file1.indexOf(rootDoc) > -1) {
            filename_FSTXT = filename_FSTXT.replace(rootDoc, "");
        }
    testo_FSTXT = test1;
    appenttofile_FSTXT = toapp;
    oper_w = 'WriteFSTXT ' + file1;
    //alert("file:" + file1);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSWR, fail);
}
function gotFSWR(fileSystem) {
    fileSystem.root.getFile(filename_FSTXT, { create: true, exclusive: false }, gotFileEntryWR, fail);
}
function gotFileEntryWR(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}
function gotFileWriter(writer) {
    if (appenttofile_FSTXT) writer.seek(writer.length);
    writer.write(testo_FSTXT);
    writer.onwrite = function (e) {
        console.log(filename_FSTXT + "--- write success");
    };
}
function removeFile(fileTR) {
    fileToRemove = fileTR;
    oper_w = 'removeFile ' + fileTR;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSRM, fail);
}

function gotFSRM(fileSystem) {
    fileSystem.root.getFile(fileToRemove, {
        create: true,
        exclusive: false
    }, gotFileEntryRM, fail);
}
function gotFileEntryRM(fileEntry) {
    fileEntry.remove(gotFileRemove, fail);
}
function gotFileRemove() {
    console.log(fileToRemove + "--- delete success");
}
function WriteFSTXT1(file_1, test_1, toapp_1) {
    filename_FSTXT1 = file_1;
    var osStr;
    osStr = device.platform.toUpperCase();
    var rootDoc = GetRootDoc();
    // Se è un iOS rimuovo il path del Documents perchè non lo gode...
    if (osStr.indexOf('IOS') > -1)
        if (file_1.indexOf(rootDoc) > -1) {
            filename_FSTXT1 = filename_FSTXT1.replace(rootDoc, "");
        }
    testo_FSTXT1 = test_1;
    appenttofile_FSTXT1 = toapp_1;
    oper_w = 'WriteFSTXT1 ' + file_1;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSWR1, fail);
}
function gotFSWR1(fileSystem) {
    fileSystem.root.getFile(filename_FSTXT1, {
        create: true,
        exclusive: false
    }, gotFileEntryWR1, fail);
}

function gotFileEntryWR1(fileEntry) {
    fileEntry.createWriter(gotFileWriter1, fail);
}
function gotFileWriter1(writer) {
    if (appenttofile_FSTXT1)
        writer.seek(writer.length);
    writer.write(testo_FSTXT1);
    writer.onwrite = function (e) {
        console.log(filename_FSTXT1 + "--- write success");
    };
}
function removeManual(name) {
    if (platform.indexOf('IOS') > -1) dirToRemove = name.replace(".zip", "");
    if (platform.indexOf('ANDROID') > -1) dirToRemove = getconfig("rootdoc") + name.replace(".zip", "");
    oper_w = 'removeManual ' + dirToRemove;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getDirFS, fail);
}
function getDirFS(fileSystem) {

    fileSystem.root.getDirectory(dirToRemove, {
        create: true,
        exclusive: false
    }, removeDirFS, fail);
}
function removeDirFS(entry) {
    entry.removeRecursively(successRD, fail);
}
function successRD(parent) {
    console.log('delete dir ' + dirToRemove);
}
function fail(error) {
    alert("error: " + error.code + ' ' + oper_w);
}
