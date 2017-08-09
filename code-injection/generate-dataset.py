#!/usr/bin/python
# encoding: utf-8

'''
Created on Dec 9, 2015

@author: yanruibo
'''

import os
import re
import numpy as np
import config
import time

def extract_js_normal():
    # extract js
    dirname = "/home/yanruibo/code-injection/normal-apks"
    apknames = os.listdir(dirname)
    for apkname in apknames:
        tmp = os.popen("unzip -o -d " + "/home/yanruibo/code-injection/normal-decoded-apks/" + apkname[:-4] + " /home/yanruibo/code-injection/normal-apks/" + apkname).read()
        #print tmp
        rootDir = "/home/yanruibo/code-injection/normal-decoded-apks/" + apkname[:-4]
        list_dirs = os.walk(rootDir)
        js_content = ""
        for root, dirs, files in list_dirs:
            for f in files:
                abspath_file = os.path.join(root, f)
                extension_name = os.path.splitext(abspath_file)[1]
                if(extension_name.find(".htm") != -1):
                    fr = open(abspath_file, 'r')
                    content = fr.read()
                    fr.close()
                    js_slice_list = re.findall('(?si)<script>(.*?)</script>', content)
                    for slice in js_slice_list:
                        js_content = js_content + "\n" + slice
                    js_content += "\n"
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
                        js_content = js_content + "\n" + content
                        js_content = js_content + "\n" 
        # write to file
        normal_js_dir = '/home/yanruibo/code-injection/js/normal/'
        fwjs = open(normal_js_dir + apkname[:-4] + ".js", 'w')
        fwjs.write(js_content)
        fwjs.close()
        


def extract_js_vulnerable():
    # extract js
    dirname = "/home/yanruibo/code-injection/vulnerable-apks"
    apknames = os.listdir(dirname)
    for apkname in apknames:
        tmp = os.popen("unzip -o -d " + "/home/yanruibo/code-injection/vulnerable-decoded-apks/" + apkname[:-4] + " /home/yanruibo/code-injection/vulnerable-apks/" + apkname).read()
        #print tmp
        rootDir = "/home/yanruibo/code-injection/vulnerable-decoded-apks/" + apkname[:-4]
        list_dirs = os.walk(rootDir)
        js_content = ""
        for root, dirs, files in list_dirs:
            for f in files:
                abspath_file = os.path.join(root, f)
                extension_name = os.path.splitext(abspath_file)[1]
                if(extension_name.find(".htm") != -1):
                    fr = open(abspath_file, 'r')
                    content = fr.read()
                    fr.close()
                    js_slice_list = re.findall('(?si)<script>(.*?)</script>', content)
                    for slice in js_slice_list:
                        js_content = js_content + "\n" + slice
                    js_content += "\n"
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
                        js_content = js_content + "\n" + content
                        js_content = js_content + "\n" 
        # write to file
        vulnerable_js_dir = '/home/yanruibo/code-injection/js/vulnerable/'
        fwjs = open(vulnerable_js_dir + apkname[:-4] + ".js", 'w')
        fwjs.write(js_content)
        fwjs.close()
        





def generate_dataset():
    
    normal_js_dir = "/home/yanruibo/code-injection/normal-apks"
    normal_jsnames = os.listdir(normal_js_dir)
    vulnerable_js_dir = "/home/yanruibo/code-injection/vulnerable-apks"
    vulnerable_jsnames = os.listdir(vulnerable_js_dir)
    
    train_normal = []
    test_normal = []
    train_vulnerable = []
    test_vulnerable = []
    
    
    for i in range(len(normal_jsnames)):
        if(i % 2 == 0):
            filename = normal_jsnames[i]
            train_normal.append(filename[:-4])
        else:
            filename = normal_jsnames[i]
            test_normal.append(filename[:-4])
    for i in range(len(vulnerable_jsnames)):
        if(i % 2 == 0):
            filename = vulnerable_jsnames[i]
            train_vulnerable.append(filename[:-4])
        else:
            filename = vulnerable_jsnames[i]
            test_vulnerable.append(filename[:-4])
            
    fw_train_normal = open("./dataset/train_normal","w")
    fw_test_normal = open("./dataset/test_normal","w")
    fw_train_vulnerable = open("./dataset/train_vulnerable","w")
    fw_test_vulnerable = open("./dataset/test_vulnerable","w")
    
    for item in train_normal:
        fw_train_normal.write(item+"\n")
    
    for item in test_normal:
        fw_test_normal.write(item+"\n")
    
    for item in train_vulnerable:
        fw_train_vulnerable.write(item+"\n")
        
    for item in test_vulnerable:
        fw_test_vulnerable.write(item+"\n")
    
    
    fw_train_normal.close()
    fw_test_normal.close()
    fw_train_vulnerable.close()
    fw_test_vulnerable.close()
    
    print "done"
    
    
    
    
def generate_dataset2():
    
    normal_js_dir = "/home/yanruibo/code-injection/normal-apks"
    normal_jsnames = os.listdir(normal_js_dir)
    vulnerable_js_dir = "/home/yanruibo/code-injection/vulnerable-apks"
    vulnerable_jsnames = os.listdir(vulnerable_js_dir)
    
    train_normal = []
    test_normal = []
    train_vulnerable = []
    test_vulnerable = []
    
    
    for i in range(672):
        filename = normal_jsnames[i]
        train_normal.append(filename[:-4])
    for i in range(672,1344):
        filename = normal_jsnames[i]
        test_normal.append(filename[:-4])
    for i in range(211):
        filename = vulnerable_jsnames[i]
        train_vulnerable.append(filename[:-4])
    for i in range(211,422):
        filename = vulnerable_jsnames[i]
        test_vulnerable.append(filename[:-4])
            
    fw_train_normal = open("./dataset/train_normal","w")
    fw_test_normal = open("./dataset/test_normal","w")
    fw_train_vulnerable = open("./dataset/train_vulnerable","w")
    fw_test_vulnerable = open("./dataset/test_vulnerable","w")
    
    for item in train_normal:
        fw_train_normal.write(item+"\n")
    
    for item in test_normal:
        fw_test_normal.write(item+"\n")
    
    for item in train_vulnerable:
        fw_train_vulnerable.write(item+"\n")
        
    for item in test_vulnerable:
        fw_test_vulnerable.write(item+"\n")
    
    
    fw_train_normal.close()
    fw_test_normal.close()
    fw_train_vulnerable.close()
    fw_test_vulnerable.close()
    
    print "done"
    
    
    
if __name__ == "__main__":
    startTimeStamp = time.time()
    
    #extract_js_normal()
    #extract_js_vulnerable()
    generate_dataset2()
    
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    ft = open("/home/yanruibo/code-injection/process-info/peprocessed-total-time-extractjs-and-generate-dataset", "w")
    ft.write("Total Time(extract js and generate dataset) : " + str(total_time) + "\n")
    ft.close()
