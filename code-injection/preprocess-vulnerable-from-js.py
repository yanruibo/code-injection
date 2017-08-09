#!/usr/bin/python
# encoding: utf-8

import sys
import os
import time
import config



def get_function_list(filename):
    js_fuctions = []
    #fr = open("./js-functions/js_functions.txt")
    fr = open(filename)
    lines = fr.readlines()
    lines = [line.strip() for line in lines]
    for line in lines:
        if(line!=''):
            js_fuctions.append(line)
    return list(set(js_fuctions))




def batchDecode(method):
    
    permissions = ["android.permission.INTERNET", "android.permission.ACCESS_NETWORK_STATE",
                   "android.permission.CAMERA", "android.permission.FLASHLIGHT",
                   "android.permission.ACCESS_COARSE_LOCATION", "android.permission.ACCESS_FINE_LOCATION",
                   "android.permission.WRITE_EXTERNAL_STORAGE", "android.permission.RECORD_AUDIO",
                   "android.permission.RECORD_VIDEO", "android.permission.MODIFY_AUDIO_SETTINGS",
                   "android.permission.READ_PHONE_STATE", "android.permission.READ_CONTACTS",
                   "android.permission.WRITE_CONTACTS", "android.permission.GET_ACCOUNTS"
                   ]
    
    functions = None
    savedatadir = None
    
    if(method == 'original'):
        functions = config.functions_original
        savedatadir = "/home/yanruibo/code-injection/process-info/vulnerable/vulnerable.dat"
        
        
    elif(method=='infogain'):
        
        #infogain
        functions = config.functions_infogain
        
        savedatadir = "/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-infogain.dat"
    
    elif(method == 'chi'): 
        #chi
        functions = config.functions_chi    
        savedatadir = "/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-chi.dat"
    
    elif(method == 'allinfogain'): 
        #chi
        functions = config.function_all_infogain    
        savedatadir = "/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-allinfogain.dat"
    
    elif(method == 'allchi'): 
        #chi
        functions = config.function_all_chi
        savedatadir = "/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-allchi.dat"
    
    

    unique_functions= list(set(functions))
    # sort in order
    unique_functions.sort(cmp=None, key=None, reverse=False)
    #print unique_functions
    
    fwrite = open("./js-functions/unique-functions-"+str(method),'w')
    
    for function in unique_functions:
        fwrite.write(function+"\n")
    fwrite.close()
    
    arff = ''
    for item in unique_functions:
        itemarray = item.split()
        arff += "@attribute "+itemarray[0]+" {0,1}\n"
    
    fwrite = open("./js-functions/weka-header-"+str(method),'w')
    fwrite.write(arff)
    fwrite.close()
    
    fu = open("/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-peprocessed-unscess-"+str(method), "w")
    # fz = open("/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-peprocessed-uzip-info.txt","w")
    
    dirname = "/home/yanruibo/code-injection/vulnerable-apks"
    #apknames = os.listdir(dirname)
    
    apknames = get_function_list("./dataset/train_vulnerable");
    print "len apknames",len(apknames)
    apknames.extend(get_function_list("./dataset/test_vulnerable"))
    print "len apknames",len(apknames)
    
    function_dict = {}
    # function_dict[key] = classCount.get(key, 0) + 1
    ff = open(savedatadir, "w")
    counter = 1
    for apkname in apknames:
        #print counter
        counter += 1
        # packagename = apkname[:-4]
        # 解析AndroidManifest.xml 获取权限信息
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/vulnerable-apks/' + apkname+".apk").read()
        # fz.write(tmp)
        # print tmp
        for permision in permissions:
            if(tmp.find(permision) != -1):
                ff.write("1,")
            else:
                ff.write("0,")
        
        vulnerable_js_dir = '/home/yanruibo/code-injection/js/vulnerable/'
        freadjs = open(vulnerable_js_dir+apkname+".js")
        content = freadjs.read()
        freadjs.close()
        for function in unique_functions:
                 keywords = function.split()
                 for keyword in keywords:
                     if(content.find(keyword) != -1):
                         if(function_dict.has_key(keywords[0])):
                             if(function_dict[keywords[0]] != 1):
                                 function_dict[keywords[0]] = 1
                         else:
                             function_dict[keywords[0]] = 1
                     else:
                         if(function_dict.has_key(keywords[0])):
                             pass             
                         else:
                             function_dict[keywords[0]] = 0
                                              
        try:
            for function in unique_functions:
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
    # fz.close()
                             
                         
if __name__ == "__main__":
    '''
    startTimeStamp = time.time()  
    method = 'allchi'
    batchDecode(method)
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    ft = open("/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-peprocessed-total-time-"+method, "w")
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()
    '''
    
    method = 'original'
    batchDecode(method)
    method = 'infogain'
    batchDecode(method)
    method = 'chi'
    batchDecode(method)
    method = 'allinfogain'
    batchDecode(method)
    method = 'allchi'
    batchDecode(method)
    
    

    
    