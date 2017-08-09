#!/usr/bin/python
# encoding: utf-8

import sys
import os
import time


def batchDecode():
    
    fu = open("/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-peprocessed-info-unscess.txt","w")
    fz = open("/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-peprocessed-uzip-info.txt","w")
    
    dirname = "/home/yanruibo/code-injection/vulnerable-apks"
    apknames = os.listdir(dirname)
    function_dict = {}
    #classCount[voteIlabel] = classCount.get(voteIlabel, 0) + 1
    ff = open("/home/yanruibo/code-injection/process-info/vulnerable/vulnerable.dat","a")
    for item in apknames:
        #packagename = item[:-4]
        #解析AndroidManifest.xml 获取权限信息
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/vulnerable-apks/'+item).read()
        if(tmp.find("android.permission.INTERNET")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        if(tmp.find("android.permission.ACCESS_NETWORK_STATE")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        if(tmp.find("android.permission.CAMERA")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        if(tmp.find("android.permission.FLASHLIGHT")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        if(tmp.find("android.permission.ACCESS_COARSE_LOCATION")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        if(tmp.find("android.permission.ACCESS_FINE_LOCATION")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        if(tmp.find("android.permission.WRITE_EXTERNAL_STORAGE")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        if(tmp.find("android.permission.RECORD_AUDIO")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        if(tmp.find("android.permission.RECORD_VIDEO")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        if(tmp.find("android.permission.MODIFY_AUDIO_SETTINGS")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        if(tmp.find("android.permission.READ_PHONE_STATE")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        if(tmp.find("android.permission.READ_CONTACTS")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        if(tmp.find("android.permission.WRITE_CONTACTS")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        if(tmp.find("android.permission.GET_ACCOUNTS")!=-1):
            ff.write("1,")
        else:
            ff.write("0,")
        #unzip -o -d /home/sunny myfile.zip
        
        os.system("unzip -o -d "+"/home/yanruibo/code-injection/vulnerable-decoded-apks/"+item[:-4]+" /home/yanruibo/code-injection/vulnerable-apks/"+item)
        rootDir = "/home/yanruibo/code-injection/vulnerable-decoded-apks/"+item[:-4]
        
        list_dirs =  os.walk(rootDir)
        for root,dirs,files in list_dirs:
            for f in files:
                #print f
                #print root
                abspath_file = os.path.join(root,f)
                #print abspath_file
                extension_name = os.path.splitext(abspath_file)[1]
                #print extension_name
                if(extension_name.find(".htm")!=-1):
                     fr = open(abspath_file,'r')
                     content = fr.read()
                     fr.close()
                     if(content.find("cordova.plugins.barcodeScanner.")!=-1):
                         if(function_dict.has_key("cordova.plugins.barcodeScanner.")):
                             if(function_dict["cordova.plugins.barcodeScanner."]!=1):
                                 function_dict["cordova.plugins.barcodeScanner."] = 1
                         else:
                             function_dict["cordova.plugins.barcodeScanner."] = 1
                     else:
                         if(function_dict.has_key("cordova.plugins.barcodeScanner.")):
                             if(function_dict["cordova.plugins.barcodeScanner."]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["cordova.plugins.barcodeScanner."] = 0
                     if(content.find("sms.send(")!=-1):
                         if(function_dict.has_key("sms.send(")):
                             if(function_dict["sms.send("]!=1):
                                 function_dict["sms.send("] = 1
                         else:
                             function_dict["sms.send("] = 1
                     else:
                         if(function_dict.has_key("sms.send(")):
                             if(function_dict["sms.send("]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["sms.send("] = 0
                     if(content.find("nfc.")!=-1):
                         if(function_dict.has_key("nfc.")):
                             if(function_dict["nfc."]!=1):
                                 function_dict["nfc."] = 1
                         else:
                             function_dict["nfc."] = 1
                     else:
                         if(function_dict.has_key("nfc.")):
                             if(function_dict["nfc."]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["nfc."] = 0
                     if(content.find("cordova.file.")!=-1):
                         if(function_dict.has_key("cordova.file.")):
                             if(function_dict["cordova.file."]!=1):
                                 function_dict["cordova.file."] = 1
                         else:
                             function_dict["cordova.file."] = 1
                     else:
                         if(function_dict.has_key("cordova.file.")):
                             if(function_dict["cordova.file."]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["cordova.file."] = 0
                     if(content.find("connectivity.")!=-1):
                         if(function_dict.has_key("connectivity.")):
                             if(function_dict["connectivity."]!=1):
                                 function_dict["connectivity."] = 1
                         else:
                             function_dict["connectivity."] = 1
                     else:
                         if(function_dict.has_key("connectivity.")):
                             if(function_dict["connectivity."]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["connectivity."] = 0
                     if(content.find("bluetoothSerial.")!=-1):
                         if(function_dict.has_key("bluetoothSerial.")):
                             if(function_dict["bluetoothSerial."]!=1):
                                 function_dict["bluetoothSerial."] = 1
                         else:
                             function_dict["bluetoothSerial."] = 1
                     else:
                         if(function_dict.has_key("bluetoothSerial.")):
                             if(function_dict["bluetoothSerial."]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["bluetoothSerial."] = 0
                     if(content.find("navigator.contacts.")!=-1):
                         if(function_dict.has_key("navigator.contacts.")):
                             if(function_dict["navigator.contacts."]!=1):
                                 function_dict["navigator.contacts."] = 1
                         else:
                             function_dict["navigator.contacts."] = 1
                     else:
                         if(function_dict.has_key("navigator.contacts.")):
                             if(function_dict["navigator.contacts."]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["navigator.contacts."] = 0
                     if(content.find("batterystatus")!=-1 or content.find("batterycritical")!=-1 or content.find("batterylow")!=-1):
                         if(function_dict.has_key("battery")):
                             if(function_dict["battery"]!=1):
                                 function_dict["battery"] = 1
                         else:
                             function_dict["battery"] = 1
                     else:
                         if(function_dict.has_key("battery")):
                             if(function_dict["battery"]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["battery"] = 0
                     if(content.find("document.write(")!=-1):
                         if(function_dict.has_key("document.write(")):
                             if(function_dict["document.write("]!=1):
                                 function_dict["document.write("] = 1
                         else:
                             function_dict["document.write("] = 1
                     else:
                         if(function_dict.has_key("document.write(")):
                             if(function_dict["document.write("]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["document.write("] = 0
                     if(content.find("document.writeln(")!=-1):
                         if(function_dict.has_key("document.writeln(")):
                             if(function_dict["document.writeln("]!=1):
                                 function_dict["document.writeln("] = 1
                         else:
                             function_dict["document.writeln("] = 1
                     else:
                         if(function_dict.has_key("document.writeln(")):
                             if(function_dict["document.writeln("]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["document.writeln("] = 0
                     if(content.find("innerHTML(")!=-1):
                         if(function_dict.has_key("innerHTML(")):
                             if(function_dict["innerHTML("]!=1):
                                 function_dict["innerHTML("] = 1
                         else:
                             function_dict["innerHTML("] = 1
                     else:
                         if(function_dict.has_key("innerHTML(")):
                             if(function_dict["innerHTML("]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["innerHTML("] = 0
                     if(content.find("outerHTML(")!=-1):
                         if(function_dict.has_key("outerHTML(")):
                             if(function_dict["outerHTML("]!=1):
                                 function_dict["outerHTML("] = 1
                         else:
                             function_dict["outerHTML("] = 1
                     else:
                         if(function_dict.has_key("outerHTML(")):
                             if(function_dict["outerHTML("]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["outerHTML("] = 0
                     if(content.find("html(")!=-1):
                         if(function_dict.has_key("html(")):
                             if(function_dict["html("]!=1):
                                 function_dict["html("] = 1
                         else:
                             function_dict["html("] = 1
                     else:
                         if(function_dict.has_key("html(")):
                             if(function_dict["html("]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["html("] = 0
                     if(content.find("append(")!=-1):
                         if(function_dict.has_key("append(")):
                             if(function_dict["append("]!=1):
                                 function_dict["append("] = 1
                         else:
                             function_dict["append("] = 1
                     else:
                         if(function_dict.has_key("append(")):
                             if(function_dict["append("]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["append("] = 0
                     if(content.find("prepend(")!=-1):
                         if(function_dict.has_key("prepend(")):
                             if(function_dict["prepend("]!=1):
                                 function_dict["prepend("] = 1
                         else:
                             function_dict["prepend("] = 1
                     else:
                         if(function_dict.has_key("prepend(")):
                             if(function_dict["prepend("]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["prepend("] = 0
                     if(content.find("before(")!=-1):
                         if(function_dict.has_key("before(")):
                             if(function_dict["before("]!=1):
                                 function_dict["before("] = 1
                         else:
                             function_dict["before("] = 1
                     else:
                         if(function_dict.has_key("before(")):
                             if(function_dict["before("]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["before("] = 0
                     if(content.find("after(")!=-1):
                         if(function_dict.has_key("after(")):
                             if(function_dict["after("]!=1):
                                 function_dict["after("] = 1
                         else:
                             function_dict["after("] = 1
                     else:
                         if(function_dict.has_key("after(")):
                             if(function_dict["after("]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["after("] = 0
                     if(content.find("replaceAll(")!=-1):
                         if(function_dict.has_key("replaceAll(")):
                             if(function_dict["replaceAll("]!=1):
                                 function_dict["replaceAll("] = 1
                         else:
                             function_dict["replaceAll("] = 1
                     else:
                         if(function_dict.has_key("replaceAll(")):
                             if(function_dict["replaceAll("]==1):
                                 pass
                             else:
                                 pass
                                                  
                         else:
                             function_dict["replaceAll("] = 0
                     if(content.find("replaceWith(")!=-1):
                         if(function_dict.has_key("replaceWith(")):
                             if(function_dict["replaceWith("]!=1):
                                 function_dict["replaceWith("] = 1
                         else:
                             function_dict["replaceWith("] = 1
                     else:
                         if(function_dict.has_key("replaceWith(")):
                             if(function_dict["replaceWith("]==1):
                                 pass
                             else:
                                 pass                  
                         else:
                             function_dict["replaceWith("] = 0
                if(extension_name == ".js" ):
                     fread = open(abspath_file,'r')
                     content = fread.read()
                     if((content.find("Copyright")!=-1) or (content.find("Licensed")!=-1) 
                        or (content.find("jquery.org")!=-1) 
                        or (content.find("www.apache.org")!=-1)
                        or (content.find("License")!=-1)):
                         pass
                     else:
                         if(content.find("cordova.plugins.barcodeScanner.")!=-1):
                             if(function_dict.has_key("cordova.plugins.barcodeScanner.")):
                                 if(function_dict["cordova.plugins.barcodeScanner."]!=1):
                                     function_dict["cordova.plugins.barcodeScanner."] = 1
                             else:
                                 function_dict["cordova.plugins.barcodeScanner."] = 1
                         else:
                             if(function_dict.has_key("cordova.plugins.barcodeScanner.")):
                                 if(function_dict["cordova.plugins.barcodeScanner."]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["cordova.plugins.barcodeScanner."] = 0
                         if(content.find("sms.send(")!=-1):
                             if(function_dict.has_key("sms.send(")):
                                 if(function_dict["sms.send("]!=1):
                                     function_dict["sms.send("] = 1
                             else:
                                 function_dict["sms.send("] = 1
                         else:
                             if(function_dict.has_key("sms.send(")):
                                 if(function_dict["sms.send("]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["sms.send("] = 0
                         if(content.find("nfc.")!=-1):
                             if(function_dict.has_key("nfc.")):
                                 if(function_dict["nfc."]!=1):
                                     function_dict["nfc."] = 1
                             else:
                                 function_dict["nfc."] = 1
                         else:
                             if(function_dict.has_key("nfc.")):
                                 if(function_dict["nfc."]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["nfc."] = 0
                         if(content.find("cordova.file.")!=-1):
                             if(function_dict.has_key("cordova.file.")):
                                 if(function_dict["cordova.file."]!=1):
                                     function_dict["cordova.file."] = 1
                             else:
                                 function_dict["cordova.file."] = 1
                         else:
                             if(function_dict.has_key("cordova.file.")):
                                 if(function_dict["cordova.file."]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["cordova.file."] = 0
                         if(content.find("connectivity.")!=-1):
                             if(function_dict.has_key("connectivity.")):
                                 if(function_dict["connectivity."]!=1):
                                     function_dict["connectivity."] = 1
                             else:
                                 function_dict["connectivity."] = 1
                         else:
                             if(function_dict.has_key("connectivity.")):
                                 if(function_dict["connectivity."]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["connectivity."] = 0
                         if(content.find("bluetoothSerial.")!=-1):
                             if(function_dict.has_key("bluetoothSerial.")):
                                 if(function_dict["bluetoothSerial."]!=1):
                                     function_dict["bluetoothSerial."] = 1
                             else:
                                 function_dict["bluetoothSerial."] = 1
                         else:
                             if(function_dict.has_key("bluetoothSerial.")):
                                 if(function_dict["bluetoothSerial."]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["bluetoothSerial."] = 0
                         if(content.find("navigator.contacts.")!=-1):
                             if(function_dict.has_key("navigator.contacts.")):
                                 if(function_dict["navigator.contacts."]!=1):
                                     function_dict["navigator.contacts."] = 1
                             else:
                                 function_dict["navigator.contacts."] = 1
                         else:
                             if(function_dict.has_key("navigator.contacts.")):
                                 if(function_dict["navigator.contacts."]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["navigator.contacts."] = 0
                         if(content.find("batterystatus")!=-1 or content.find("batterycritical")!=-1 or content.find("batterylow")!=-1):
                             if(function_dict.has_key("battery")):
                                 if(function_dict["battery"]!=1):
                                     function_dict["battery"] = 1
                             else:
                                 function_dict["battery"] = 1
                         else:
                             if(function_dict.has_key("battery")):
                                 if(function_dict["battery"]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["battery"] = 0
                         if(content.find("document.write(")!=-1):
                             if(function_dict.has_key("document.write(")):
                                 if(function_dict["document.write("]!=1):
                                     function_dict["document.write("] = 1
                             else:
                                 function_dict["document.write("] = 1
                         else:
                             if(function_dict.has_key("document.write(")):
                                 if(function_dict["document.write("]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["document.write("] = 0
                         if(content.find("document.writeln(")!=-1):
                             if(function_dict.has_key("document.writeln(")):
                                 if(function_dict["document.writeln("]!=1):
                                     function_dict["document.writeln("] = 1
                             else:
                                 function_dict["document.writeln("] = 1
                         else:
                             if(function_dict.has_key("document.writeln(")):
                                 if(function_dict["document.writeln("]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["document.writeln("] = 0
                         if(content.find("innerHTML(")!=-1):
                             if(function_dict.has_key("innerHTML(")):
                                 if(function_dict["innerHTML("]!=1):
                                     function_dict["innerHTML("] = 1
                             else:
                                 function_dict["innerHTML("] = 1
                         else:
                             if(function_dict.has_key("innerHTML(")):
                                 if(function_dict["innerHTML("]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["innerHTML("] = 0
                         if(content.find("outerHTML(")!=-1):
                             if(function_dict.has_key("outerHTML(")):
                                 if(function_dict["outerHTML("]!=1):
                                     function_dict["outerHTML("] = 1
                             else:
                                 function_dict["outerHTML("] = 1
                         else:
                             if(function_dict.has_key("outerHTML(")):
                                 if(function_dict["outerHTML("]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["outerHTML("] = 0
                         if(content.find("html(")!=-1):
                             if(function_dict.has_key("html(")):
                                 if(function_dict["html("]!=1):
                                     function_dict["html("] = 1
                             else:
                                 function_dict["html("] = 1
                         else:
                             if(function_dict.has_key("html(")):
                                 if(function_dict["html("]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["html("] = 0
                        
                         if(content.find("append(")!=-1):
                             if(function_dict.has_key("append(")):
                                 if(function_dict["append("]!=1):
                                     function_dict["append("] = 1
                             else:
                                 function_dict["append("] = 1
                         else:
                             if(function_dict.has_key("append(")):
                                 if(function_dict["append("]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["append("] = 0
                         if(content.find("prepend(")!=-1):
                             if(function_dict.has_key("prepend(")):
                                 if(function_dict["prepend("]!=1):
                                     function_dict["prepend("] = 1
                             else:
                                 function_dict["prepend("] = 1
                         else:
                             if(function_dict.has_key("prepend(")):
                                 if(function_dict["prepend("]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["prepend("] = 0
                         if(content.find("before(")!=-1):
                             if(function_dict.has_key("before(")):
                                 if(function_dict["before("]!=1):
                                     function_dict["before("] = 1
                             else:
                                 function_dict["before("] = 1
                         else:
                             if(function_dict.has_key("before(")):
                                 if(function_dict["before("]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["before("] = 0
                         if(content.find("after(")!=-1):
                             if(function_dict.has_key("after(")):
                                 if(function_dict["after("]!=1):
                                     function_dict["after("] = 1
                             else:
                                 function_dict["after("] = 1
                         else:
                             if(function_dict.has_key("after(")):
                                 if(function_dict["after("]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["after("] = 0
                         if(content.find("replaceAll(")!=-1):
                             if(function_dict.has_key("replaceAll(")):
                                 if(function_dict["replaceAll("]!=1):
                                     function_dict["replaceAll("] = 1
                             else:
                                 function_dict["replaceAll("] = 1
                         else:
                             if(function_dict.has_key("replaceAll(")):
                                 if(function_dict["replaceAll("]==1):
                                     pass
                                 else:
                                     pass
                                                      
                             else:
                                 function_dict["replaceAll("] = 0
                         if(content.find("replaceWith(")!=-1):
                             if(function_dict.has_key("replaceWith(")):
                                 if(function_dict["replaceWith("]!=1):
                                     function_dict["replaceWith("] = 1
                             else:
                                 function_dict["replaceWith("] = 1
                         else:
                             if(function_dict.has_key("replaceWith(")):
                                 if(function_dict["replaceWith("]==1):
                                     pass
                                 else:
                                     pass                  
                             else:
                                 function_dict["replaceWith("] = 0
        try:
            if(function_dict["cordova.plugins.barcodeScanner."]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["sms.send("]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["nfc."]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["cordova.file."]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["connectivity."]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["bluetoothSerial."]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["navigator.contacts."]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["battery"]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["document.write("]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["document.writeln("]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["innerHTML("]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["outerHTML("]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["html("]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["append("]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["prepend("]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["before("]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["after("]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["replaceAll("]==1):
                ff.write("1,")
            else:
                ff.write("0,")
            if(function_dict["replaceWith("]==1):
                ff.write("1")
            else:
                ff.write("0")
        except:
            fu.write(item[:-4]+"\n")
            fu.flush()
        finally:
            ff.write("\n")
            function_dict = {}
    ff.close()
    fu.close()
    fz.close()
                             
                         
if __name__ == "__main__":
    startTimeStamp=time.time()  
    batchDecode()
    endTimeStamp=time.time()
    total_time = endTimeStamp-startTimeStamp
    ft = open("/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-peprocessed-info-total_time.txt","w")
    ft.write("Total Time : "+str(total_time)+"\n")
    ft.close()