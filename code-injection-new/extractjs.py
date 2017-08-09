#!/usr/bin/python
# encoding: utf-8

'''
Created on May 28, 2016

@author: yanruibo
'''
import os
import re
import sys
        
def extract_js_normal():
    # extract js
    dirname = "/home/yanruibo/code-injection/normal-apks"
    apknames = os.listdir(dirname)
    for apkname in apknames:
        print apkname
        tmp = os.popen("unzip -o -d " + "/home/yanruibo/code-injection/normal-decoded-apks/" + apkname[:-4] + " /home/yanruibo/code-injection/normal-apks/" + apkname).read()
        # print tmp
        rootDir = "/home/yanruibo/code-injection/normal-decoded-apks/" + apkname[:-4]
        list_dirs = os.walk(rootDir)
        js_content = ""
        for root, dirs, files in list_dirs:
            for f in files:
                # import pdb;pdb.set_trace();
                abspath_file = os.path.join(root, f)
                extension_name = os.path.splitext(abspath_file)[1]
                if(extension_name.find(".htm") != -1):
                    if(abspath_file.find("/jquery.mobile-1.3.1/") != -1
                       or abspath_file.find("/jquery-ui-1.8.24.custom/") != -1
                       or abspath_file.find("/www/jquery-ui-1.10.2.custom/") != -1
                       or abspath_file.find("/photoswipe/examples/") != -1
                       or abspath_file.find("/jquery.mobile/") != -1
                       or abspath_file.find("/jquery.plugins/") != -1
                       or abspath_file.find("/www/touch/") != -1
                       or abspath_file.find("/Framework/javascript/") != -1
                       or abspath_file.find("/docs/examples/") != -1
                       ):
                        continue
                    
                    fr = open(abspath_file, 'r')
                    content = fr.read()
                    fr.close()
                    
                    from bs4 import BeautifulSoup
                    # soup = BeautifulSoup(content, "html.parser")
                    soup = BeautifulSoup(content, "lxml")
                    result_set = soup.find_all("script")
                    for result in result_set:
                        # print result.attrs
                        if(result.attrs.get('type', 'null') == 'text/x-kendo-template'):
                            continue
                        js_content = js_content + "\n" + result.text.encode("utf-8")
                    
                    js_content += "\n"
                    
                if(extension_name == ".js"):
                    # 如果目录中包含这些
                    if(abspath_file.find("/plugins/") != -1
                       or abspath_file.find("/lib/") != -1
                       or abspath_file.find("/libs/") != -1
                       or abspath_file.find("/jquery-mobile/") != -1
                       or abspath_file.find("/kit/") != -1
                       or abspath_file.find("/jslibs/") != -1
                       or abspath_file.find("/ios/") != -1
                       or abspath_file.find("/Scripts/") != -1
                       or abspath_file.find("/dojo/") != -1
                       or abspath_file.find("/jquery.mobile-1.3.1/") != -1
                       or abspath_file.find("/jquery-ui-1.8.24.custom/") != -1
                       or abspath_file.find("/api/communication/") != -1
                       or abspath_file.find("/www/app/util/") != -1
                       or abspath_file.find("/www/sdk/") != -1
                       or abspath_file.find("/i18n/") != -1
                       or abspath_file.find("/www/jquery-ui-1.10.2.custom/") != -1
                       or abspath_file.find("/jquery.jqGrid-4.4.4/") != -1
                       or abspath_file.find("/api/communication/") != -1
                       or abspath_file.find("/photoswipe/") != -1
                       or abspath_file.find("/jquery.mobile/") != -1
                       or abspath_file.find("/phonegap/") != -1
                       or abspath_file.find("/app-lib/") != -1
                       or abspath_file.find("/jquery-validation-1.9.0/") != -1
                       or abspath_file.find("/jquery.plugins/") != -1
                       or abspath_file.find("/www/touch/") != -1
                       or abspath_file.find("/Framework/javascript/") != -1
                       or abspath_file.find("/docs/examples/") != -1
                       or abspath_file.find("/www/app/components/") != -1
                       ):
                        continue
                    # 如果文件名中包含这些
                    if(f.find('cordova') != -1
                       or f.find('phonegap') != -1
                       or f.find('debug.js') != -1
                       or f.find('dx.') != -1
                       or f.find('mobile.js') != -1
                       or f.find('ormma.js') != -1
                       or f.find('ormma_bridge.js') != -1
                       or f.find('.all.js') != -1
                       or f.find('sdk.js') != -1
                       or f.find('childbrowser.js') != -1
                       or f.find('iscroll.js') != -1
                       or f.find('jqtouch.js') != -1
                       or f.find('jqt.') != -1
                       or f.find('lite.js') != -1
                       or f.find('Plugin.js') != -1
                       or f.find('cdv-plugin-fb-connect.js') != -1
                       or f.find('jasmine') != -1
                       or f.find('swipeview.js') != -1
                       or f.find('json') != -1
                       or f.find('jqm-') != -1
                       or f.find('AW5.js') != -1
                       or f.find('sencha-touch-all.js') != -1
                       ):
                        continue
                    
                    fread = open(abspath_file, 'r')
                    content = fread.read()
                    
                    fread.close()
                    
                    if(f == "index.js"):
                        js_content = js_content + "\n" + content + "\n"
                        
                    elif((content.find("jqueryui.com") != -1)
                        or (content.find("jquery.com") != -1)
                        or (content.find("jquerymobile.com") != -1)
                        or (content.find("Licensed") != -1)
                        or (content.find("licensed") != -1)
                        or (content.find("jquery.org") != -1) 
                        or (content.find("http://www.apache.org/licenses/LICENSE-2.0") != -1)
                        or (content.find("License") != -1)
                        or (content.find("license") != -1)
                        or (content.find("Version:") != -1)
                        or (content.find("ALL RIGHTS RESERVED") != -1)
                        or (content.find("Foundation (ASF)") != -1)
                        ):
                        continue
                    else:
                        js_content = js_content + "\n" + content + "\n" 
        
        # write to file
        normal_js_dir = './js/normal/'
        
        fwjs = open(normal_js_dir + apkname[:-4] + ".js", 'w')
        js_content = js_content.replace("%JS_CONTENT_HERE%", "")
        fwjs.write(js_content)
        fwjs.close()
        
def get_js_names_normal():
    # extract js
    dirname = "/home/yanruibo/code-injection/normal-apks"
    apknames = os.listdir(dirname)
    fw = open("./html-js-names/html-js-names", "w")
    for apkname in apknames:
        print apkname
        tmp = os.popen("unzip -o -d " + "/home/yanruibo/code-injection/normal-decoded-apks/" + apkname[:-4] + " /home/yanruibo/code-injection/normal-apks/" + apkname).read()
        # print tmp
        rootDir = "/home/yanruibo/code-injection/normal-decoded-apks/" + apkname[:-4]
        list_dirs = os.walk(rootDir)
        js_content = ""
        for root, dirs, files in list_dirs:
            for f in files:
                # import pdb;pdb.set_trace();
                abspath_file = os.path.join(root, f)
                
                extension_name = os.path.splitext(abspath_file)[1]
                if(extension_name.find(".htm") != -1 or extension_name == ".js"):
                    fw.write(abspath_file + "\n")
    fw.close()

def get_js_names_vulnerable():
    # extract js
    dirname = "/home/yanruibo/code-injection/vulnerable-apks"
    apknames = os.listdir(dirname)
    fw = open("./html-js-names/html-js-names-vulnerable", "w")
    for apkname in apknames:
        print apkname
        tmp = os.popen("unzip -o -d " + "/home/yanruibo/code-injection/vulnerable-decoded-apks/" + apkname[:-4] + " /home/yanruibo/code-injection/vulnerable-apks/" + apkname).read()
        # print tmp
        rootDir = "/home/yanruibo/code-injection/vulnerable-decoded-apks/" + apkname[:-4]
        list_dirs = os.walk(rootDir)
        js_content = ""
        for root, dirs, files in list_dirs:
            for f in files:
                # import pdb;pdb.set_trace();
                abspath_file = os.path.join(root, f)
                
                extension_name = os.path.splitext(abspath_file)[1]
                if(extension_name.find(".htm") != -1 or extension_name == ".js"):
                    fw.write(abspath_file + "\n")
    fw.close()
        
def extract_js_vulnerable():
    # extract js
    dirname = "/home/yanruibo/code-injection/vulnerable-apks"
    apknames = os.listdir(dirname)
    for apkname in apknames:
        print apkname
        tmp = os.popen("unzip -o -d " + "/home/yanruibo/code-injection/vulnerable-decoded-apks/" + apkname[:-4] + " /home/yanruibo/code-injection/vulnerable-apks/" + apkname).read()
        # print tmp
        rootDir = "/home/yanruibo/code-injection/vulnerable-decoded-apks/" + apkname[:-4]
        list_dirs = os.walk(rootDir)
        js_content = ""
        for root, dirs, files in list_dirs:
            for f in files:
                # import pdb;pdb.set_trace();
                abspath_file = os.path.join(root, f)
                extension_name = os.path.splitext(abspath_file)[1]
                if(extension_name.find(".htm") != -1):
                    if(abspath_file.find("/jquery.mobile-1.3.1/") != -1
                       or abspath_file.find("/jquery-ui-1.8.24.custom/") != -1
                       or abspath_file.find("/www/JQuery-Mobile-Slide-Menu-master/") != -1
                       or abspath_file.find("/js/maps/demos/") != -1
                       
                       ):
                        continue
                    
                    fr = open(abspath_file, 'r')
                    content = fr.read()
                    fr.close()
                    
                    from bs4 import BeautifulSoup
                    # soup = BeautifulSoup(content, "html.parser")
                    soup = BeautifulSoup(content, "lxml")
                    result_set = soup.find_all("script")
                    for result in result_set:
                        # print result.attrs
                        if(result.attrs.get('type', 'null') == 'text/x-kendo-template'):
                            continue
                        js_content = js_content + "\n" + result.text.encode("utf-8")
                    
                    js_content += "\n"
                    
                if(extension_name == ".js"):
                    # 如果目录中包含这些
                    if(abspath_file.find("/plugins/") != -1
                       or abspath_file.find("/www/lib/") != -1
                       or abspath_file.find("/www/jquery/") != -1
                       or abspath_file.find("/libs/") != -1
                       or abspath_file.find("/jquery.mobile/") != -1
                       or abspath_file.find("/www/scripts/lib/") != -1
                       or abspath_file.find("/jslibs/") != -1
                       or abspath_file.find("/ios/") != -1
                       or abspath_file.find("/Scripts/") != -1
                       or abspath_file.find("/dojo/") != -1
                       or abspath_file.find("/jquery.mobile-1.3.1/") != -1
                       or abspath_file.find("/jquery-ui-1.8.24.custom/") != -1
                       or abspath_file.find("/api/communication/") != -1
                       or abspath_file.find("/www/app/util/") != -1
                       or abspath_file.find("/www/sdk/") != -1
                       or abspath_file.find("/i18n/") != -1
                       or abspath_file.find("/www/jquery-ui-1.10.2.custom/") != -1
                       or abspath_file.find("/jquery.jqGrid-4.4.4/") != -1
                       or abspath_file.find("/api/communication/") != -1
                       or abspath_file.find("/photoswipe/") != -1
                       or abspath_file.find("/jquery.mobile/") != -1
                       or abspath_file.find("/phonegap/") != -1
                       or abspath_file.find("/app-lib/") != -1
                       or abspath_file.find("/jquery-validation-1.9.0/") != -1
                       or abspath_file.find("/jquery.plugins/") != -1
                       or abspath_file.find("/www/touch/") != -1
                       or abspath_file.find("/Framework/javascript/") != -1
                       or abspath_file.find("/docs/examples/") != -1
                       or abspath_file.find("/www/app/components/") != -1
                       or abspath_file.find("/www/JQuery-Mobile-Slide-Menu-master/") != -1
                       or abspath_file.find("/www/jquerymobile/") != -1
                       or abspath_file.find("/js/maps/demos/") != -1
                       or abspath_file.find("/www/js/maps/ui/") != -1
                       ):
                        continue
                    # 如果文件名中包含这些
                    if(f.find('cordova') != -1
                       or f.find('phonegap') != -1
                       or f.find('debug.js') != -1
                       or f.find('dx.') != -1
                       or f.find('mobile.js') != -1
                       or f.find('ormma.js') != -1
                       or f.find('ormma_bridge.js') != -1
                       or f.find('.all.js') != -1
                       or f.find('sdk.js') != -1
                       or f.find('childbrowser.js') != -1
                       or f.find('iscroll.js') != -1
                       or f.find('jqtouch.js') != -1
                       or f.find('jqt.') != -1
                       or f.find('lite.js') != -1
                       or f.find('Plugin.js') != -1
                       or f.find('cdv-plugin-fb-connect.js') != -1
                       or f.find('jasmine') != -1
                       or f.find('swipeview.js') != -1
                       or f.find('json') != -1
                       or f.find('jqm-') != -1
                       or f.find('AW5.js') != -1
                       or f.find('sencha-touch-all.js') != -1
                       or f.find('jquery.youtube.channel2.js') != -1
                       or f.find('jquery.youtube.channel.js') != -1
                       or f.find('PushNotification.js') != -1
                       or f.find('jquery.jfeed.js') != -1
                       ):
                        continue
                    
                    fread = open(abspath_file, 'r')
                    content = fread.read()
                    
                    fread.close()
                    
                    if(f == "index.js"):
                        js_content = js_content + "\n" + content + "\n"
                        
                    elif((content.find("jqueryui.com") != -1)
                        or (content.find("jquery.com") != -1)
                        or (content.find("jquerymobile.com") != -1)
                        or (content.find("Licensed") != -1)
                        or (content.find("licensed") != -1)
                        or (content.find("jquery.org") != -1) 
                        or (content.find("http://www.apache.org/licenses/LICENSE-2.0") != -1)
                        or (content.find("License") != -1)
                        or (content.find("license") != -1)
                        or (content.find("Version:") != -1)
                        or (content.find("ALL RIGHTS RESERVED") != -1)
                        or (content.find("Foundation (ASF)") != -1)
                        ):
                        continue
                    else:
                        js_content = js_content + "\n" + content + "\n" 
        
        # write to file
        normal_js_dir = './js/vulnerable/'
        
        fwjs = open(normal_js_dir + apkname[:-4] + ".js", 'w')
        js_content = js_content.replace("%JS_CONTENT_HERE%", "")
        fwjs.write(js_content)
        fwjs.close()
        
        
if __name__ == '__main__':
    #extract_js_normal()
    # get_js_names_normal()
    #get_js_names_vulnerable()
    extract_js_vulnerable()