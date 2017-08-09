#!/usr/bin/python
# encoding: utf-8

'''
Created on Dec 9, 2015

@author: yanruibo
不用删掉文件

'''

import os
import re
import numpy as np
import config
import time


def get_zero_columns(fname):
    dataMatrix = np.loadtxt(fname, dtype=np.int32,delimiter=',')
    dataSet = np.delete(dataMatrix,[dataMatrix.shape[1]-1],axis=1)
    labels = dataMatrix[:-1]
    dataSetColumnSize = dataSet.shape[1]
    #通过判断列的和判断某一列是否全为0
    # 对列求和 0是列 1是行
    columnSum = dataSet.sum(axis=0)
    zeroColumns = []
    for i in range(dataSetColumnSize):
        if(columnSum[i] == 0):
            zeroColumns.append(i)
    # 0是行 1是列
    nonZeroDataSet = np.delete(dataSet, zeroColumns, 1)
    return zeroColumns,nonZeroDataSet

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
    
    vulnerable_all_file_dir = config.vulnerable_all_data_filedir
    vulnerable_jQuery_file_dir = config.vulnerable_jQuery_data_filedir
    vulnerable_js_file_dir = config.vulnerable_js_data_filedir
    vulnerable_phonegap_file_dir = config.vulnerable_phonegap_data_filedir
    
    if(remained):
        vulnerable_all_file_dir = config.vulnerable_all_data_filedir_remained
        vulnerable_jQuery_file_dir = config.vulnerable_jQuery_data_filedir_remained
        vulnerable_js_file_dir = config.vulnerable_js_data_filedir_remained
        vulnerable_phonegap_file_dir = config.vulnerable_phonegap_data_filedir_remained
    
    filedir = None
    if(flag=='js'):
        filedir = vulnerable_js_file_dir
    elif(flag=='jQuery'):
        filedir = vulnerable_jQuery_file_dir
    elif(flag=='phonegap'):
        filedir = vulnerable_phonegap_file_dir
    elif(flag=='all'):
        filedir = vulnerable_all_file_dir
    vulnerable_js_dir = '/home/yanruibo/code-injection/js/vulnerable/'
    #jsnames = os.listdir(vulnerable_js_dir)
    jsnames = get_function_list("./dataset/train_vulnerable")
    print "len jsnames",len(jsnames)
    fw = open(filedir,'w')
    for jsname in jsnames:
        freadjs = open(vulnerable_js_dir+jsname+".js")
        js_content = freadjs.read()
        freadjs.close()
        if(flag=='js'):
            for func in js_functions:
                if(js_content.find(func)!=-1):
                    fw.write("1,")
                else:
                    fw.write('0,')
            fw.write('1\n')
        if(flag=='jQuery'):
            for func in jQuery_functions:
                if(js_content.find(func)!=-1):
                    fw.write("1,")
                else:
                    fw.write('0,')
            fw.write('1\n')
        if(flag=='phonegap'):
            for func in phonegap_functions:
                if(js_content.find(func)!=-1):
                    fw.write("1,")
                else:
                    fw.write('0,')
            fw.write('1\n')
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
            
            fw.write('1\n')
    fw.close()
    return all_functions
    
if __name__ == '__main__':
    
    ##################################  
    
#     startTimeStamp = time.time()
#     
#     flag = 'all'
#     find_function(flag,False)
#     
#     endTimeStamp = time.time()
#     total_time = endTimeStamp - startTimeStamp
#     ft = open("/home/yanruibo/code-injection/process-info/vulnerable-find-frequent-functions-before", "w")
#     ft.write("Total Time(extract js and generate dataset) : " + str(total_time) + "\n")
#     ft.close()
    ##################################    
    
   
    
    
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
    ft = open("/home/yanruibo/code-injection/process-info/vulnerable-find-frequent-functions-after", "w")
    ft.write("Total Time(extract js and generate dataset) : " + str(total_time) + "\n")
    ft.close()