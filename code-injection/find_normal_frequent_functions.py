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





def find_function(flag,remained):
    
    # get functions from file
    
    js_functions = get_function_list("./js-functions/js_functions.txt")
    jQuery_functions = get_function_list("./js-functions/jQuery_functions.txt")
    phonegap_functions = get_function_list("./js-functions/phonegap_functions.txt")
    if(remained):
        js_functions = get_function_list("./js-functions/remained_js_functions.txt")
        jQuery_functions = get_function_list("./js-functions/remained_jQuery_functions.txt")
        phonegap_functions = get_function_list("./js-functions/remained_phonegap_functions.txt")
    
    all_functions = []    
    all_functions.extend(js_functions)
    all_functions.extend(jQuery_functions)
    all_functions.extend(phonegap_functions)
    
    normal_all_file_dir = config.normal_all_data_filedir 
    normal_jQuery_file_dir = config.normal_jQuery_data_filedir
    normal_js_file_dir = config.normal_js_data_filedir
    normal_phonegap_file_dir = config.normal_phonegap_data_filedir
    if(remained):
        normal_all_file_dir = config.normal_all_data_filedir_remained 
        normal_jQuery_file_dir = config.normal_jQuery_data_filedir_remained
        normal_js_file_dir = config.normal_js_data_filedir_remained
        normal_phonegap_file_dir = config.normal_phonegap_data_filedir_remained
        
    filedir = None
    if(flag=='js'):
        filedir = normal_js_file_dir
    elif(flag=='jQuery'):
        filedir = normal_jQuery_file_dir
    elif(flag=='phonegap'):
        filedir = normal_phonegap_file_dir
    elif(flag=='all'):
        filedir = normal_all_file_dir
    normal_js_dir = '/home/yanruibo/code-injection/js/normal/'
    
    
    #jsnames = os.listdir(normal_js_dir)
    
    jsnames = get_function_list("./dataset/train_normal")
    print "len(jsnames)",len(jsnames)
    
    fw = open(filedir,'w')
    for jsname in jsnames:
        freadjs = open(normal_js_dir+jsname+".js")
        js_content = freadjs.read()
        freadjs.close()
        if(flag=='js'):
            for func in js_functions:
                if(js_content.find(func)!=-1):
                    fw.write("1,")
                else:
                    fw.write('0,')
            fw.write('0\n')
        if(flag=='jQuery'):
            for func in jQuery_functions:
                if(js_content.find(func)!=-1):
                    fw.write("1,")
                else:
                    fw.write('0,')
            fw.write('0\n')
        if(flag=='phonegap'):
            for func in phonegap_functions:
                if(js_content.find(func)!=-1):
                    fw.write("1,")
                else:
                    fw.write('0,')
            fw.write('0\n')
        if(flag=='all'):
            
            for func in js_functions:
                if(js_content.find(func)!=-1):
                    fw.write("1,")
                else:
                    fw.write('0,')
            
            for func in jQuery_functions:
                if(js_content.find(func)!=-1):
                    fw.write("1,")
                else:
                    fw.write('0,')
            
            for func in phonegap_functions:
                if(js_content.find(func)!=-1):
                    fw.write("1,")
                else:
                    fw.write('0,')
            
            fw.write('0\n')
    fw.close()
    return all_functions
    
if __name__ == '__main__':
    
    
    ###############################
    
   
#     startTimeStamp = time.time()
#     
#     flag = 'all'
#     find_function(flag,False)
#     
#     endTimeStamp = time.time()
#     total_time = endTimeStamp - startTimeStamp
#     ft = open("/home/yanruibo/code-injection/process-info/normal-find-frequent-functions-before", "w")
#     ft.write("Total Time(extract js and generate dataset) : " + str(total_time) + "\n")
#     ft.close()
    
    ##############################
    
    startTimeStamp = time.time()
    
    flag = 'all'
    find_function(flag,True)
    flag = 'js'
    find_function(flag,True)
    flag = 'jQuery'
    find_function(flag,True)
    flag = 'phonegap'
    find_function(flag,True)
    
    
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    ft = open("/home/yanruibo/code-injection/process-info/normal-find-frequent-functions-after", "w")
    ft.write("Total Time(extract js and generate dataset) : " + str(total_time) + "\n")
    ft.close()
    
    
    #flag = 'all'
    #flag = 'js'
    #flag = 'jQuery'
    #flag = 'phonegap'
    
    #find_function(flag,True)
    
    
    
    