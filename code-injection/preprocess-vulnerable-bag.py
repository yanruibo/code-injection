#!/usr/bin/python
# encoding: utf-8

import sys
import os
import time


def batchDecode():
    
    permissions = ["android.permission.INTERNET", "android.permission.ACCESS_NETWORK_STATE",
                   "android.permission.CAMERA", "android.permission.FLASHLIGHT",
                   "android.permission.ACCESS_COARSE_LOCATION", "android.permission.ACCESS_FINE_LOCATION",
                   "android.permission.WRITE_EXTERNAL_STORAGE", "android.permission.RECORD_AUDIO",
                   "android.permission.RECORD_VIDEO", "android.permission.MODIFY_AUDIO_SETTINGS",
                   "android.permission.READ_PHONE_STATE", "android.permission.READ_CONTACTS",
                   "android.permission.WRITE_CONTACTS", "android.permission.GET_ACCOUNTS"
                   ]
    functions = [
                 "cordova.plugins.barcodeScanner.", "sms.send(",
                 "nfc.", "cordova.file.",
                 "connectivity.", "bluetoothSerial.",
                 "navigator.contacts.", "batterystatus batterycritical batterylow",
                 
                 "document.write(", "document.writeln(",
                 "innerHTML(", "outerHTML(",
                 "html(", "append(",
                 "prepend(", "before(",
                 "after(", "replaceAll(",
                 "replaceWith("
                 
                 ]
    fu = open("/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-peprocessed-info-unscess-bag.txt", "w")
    # fz = open("/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-peprocessed-uzip-info.txt","w")
    
    dirname = "/home/yanruibo/code-injection/vulnerable-apks"
    apknames = os.listdir(dirname)
    function_dict = {}
    # function_dict[key] = classCount.get(key, 0) + 1
    ff = open("/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-bag.dat", "a")
    counter = 0
    for apkname in apknames:
        print counter 
        counter = counter + 1
        # packagename = item[:-4]
        # 解析AndroidManifest.xml 获取权限信息
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/vulnerable-apks/' + apkname).read()
        # fz.write(tmp)
        for permission in permissions:
            if(tmp.find(permission) != -1):
                ff.write("1,")
            else:
                ff.write("0,")

        # unzip -o -d /home/sunny myfile.zip
        
        tmp = os.popen("unzip -o -d " + "/home/yanruibo/code-injection/vulnerable-decoded-apks/" + apkname[:-4] + " /home/yanruibo/code-injection/vulnerable-apks/" + apkname).read()
        #print tmp
        #fz.write(tmp)
        
        rootDir = "/home/yanruibo/code-injection/vulnerable-decoded-apks/" + apkname[:-4]
        
        list_dirs = os.walk(rootDir)
        for root, dirs, files in list_dirs:
            for f in files:
                # print f
                # print root
                abspath_file = os.path.join(root, f)
                # print abspath_file
                extension_name = os.path.splitext(abspath_file)[1]
                # print extension_name
                if(extension_name.find(".htm") != -1):
                     fr = open(abspath_file, 'r')
                     content = fr.read()
                     fr.close()
                     for item in functions:
                         keywords = item.split()
                         for keyword in keywords:
                             if(content.find(keyword) != -1):
                                 # 找到了
                                 if(function_dict.has_key(keywords[0])):
                                         function_dict[keywords[0]] += 1
                                 else:
                                     function_dict[keywords[0]] = 1
                             else:
                                 # 没找到
                                 if(function_dict.has_key(keywords[0])):
                                     pass                     
                                 else:
                                     function_dict[keywords[0]] = 0
                     
                if(extension_name == ".js"):
                     fread = open(abspath_file, 'r')
                     content = fread.read()
                     fread.close()
                     if((content.find("Copyright") != -1)
                        or (content.find("copyright") != -1)
                        or (content.find("jqueryui.com") != -1)
                        or (content.find("jquery.com") != -1)  # 在线引用，几乎不会有手机在线引用
                        or (content.find("Licensed") != -1)
                        or (content.find("licensed") != -1) 
                        or (content.find("jquery.org") != -1) 
                        or (content.find("www.apache.org") != -1)
                        or (content.find("License") != -1)
                        or (content.find("license") != -1)):
                         pass
                     else:
                         for item in functions:
                             keywords = item.split()
                             for keyword in keywords:
                                 if(content.find(keyword) != -1):
                                     if(function_dict.has_key(keywords[0])):
                                             function_dict[keywords[0]] += 1
                                     else:
                                         function_dict[keywords[0]] = 1
                                 else:
                                     if(function_dict.has_key(keywords[0])):
                                        pass                      
                                     else:
                                         function_dict[keywords[0]] = 0

        try:
            for function in functions:
                keywords = function.split()
                ff.write(str(function_dict[keywords[0]]) + ",")
        except:
            fu.write(apkname[:-4] + "\n")
            fu.flush()
        finally:
            ff.write("1\n")
            function_dict = {}
    ff.close()
    fu.close()
    #fz.close()
                             
                         
if __name__ == "__main__":
    startTimeStamp = time.time()  
    batchDecode()
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    ft = open("/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-peprocessed-info-total-time-bag.txt", "w")
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()
