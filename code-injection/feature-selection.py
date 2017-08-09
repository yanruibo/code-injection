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

def get_zero_columns(dataMatrix):
    #dataMatrix = np.loadtxt(fname, dtype=np.int32,delimiter=',')
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


        










    


def remove_unused_functions(flag):
    js_functions = get_function_list("./js-functions/js_functions.txt")
    jQuery_functions = get_function_list("./js-functions/jQuery_functions.txt")
    phonegap_functions = get_function_list("./js-functions/phonegap_functions.txt")
    all_functions = []    
    all_functions.extend(js_functions)
    all_functions.extend(jQuery_functions)
    all_functions.extend(phonegap_functions)
    #print len(all_functions)
    
    vulnerable_all_file_dir = config.vulnerable_all_data_filedir
    vulnerable_jQuery_file_dir = config.vulnerable_jQuery_data_filedir
    vulnerable_js_file_dir = config.vulnerable_js_data_filedir
    vulnerable_phonegap_file_dir = config.vulnerable_phonegap_data_filedir
    
    
    normal_all_file_dir = config.normal_all_data_filedir
    normal_jQuery_file_dir = config.normal_jQuery_data_filedir
    normal_js_file_dir = config.normal_js_data_filedir
    normal_phonegap_file_dir = config.normal_phonegap_data_filedir
    
    vul_filedir = None
    normal_filedir = None
    if(flag=='js'):
        vul_filedir = vulnerable_js_file_dir
        normal_filedir = normal_js_file_dir
    elif(flag=='jQuery'):
        vul_filedir = vulnerable_jQuery_file_dir
        normal_filedir = normal_jQuery_file_dir
    elif(flag=='phonegap'):
        vul_filedir = vulnerable_phonegap_file_dir
        normal_filedir = normal_phonegap_file_dir
    elif(flag=='all'):
        vul_filedir = vulnerable_all_file_dir
        normal_filedir = normal_all_file_dir
    
    vul_data_matrix = np.loadtxt(vul_filedir, dtype=np.int32,delimiter=',')
    normal_data_matrix = np.loadtxt(normal_filedir, dtype=np.int32,delimiter=',')
    

    
    column = vul_data_matrix.shape[1]
    
    
    
    trainMatrix = np.zeros([len(vul_data_matrix)+len(normal_data_matrix), column])
    
    
    for i in range(len(vul_data_matrix)):
        trainMatrix[i, :] = vul_data_matrix[i]
    for i in range(len(normal_data_matrix)):
        trainMatrix[i + len(vul_data_matrix), :] = normal_data_matrix[i]
    
    
    zeroColumns,nonZeroDataSet = get_zero_columns(trainMatrix)
    all_zero_functions = []
    print zeroColumns
    print len(all_functions)
    
    for index in zeroColumns:
        all_zero_functions.append(all_functions[index])
    
    remainedJsFunctions = list(set(js_functions)-set(all_zero_functions))
    fw = open('./js-functions/remained_js_functions.txt','w')
    for function in remainedJsFunctions:
        fw.write(function+"\n")
    fw.close()
        
    remainedJQueryFunctions = list(set(jQuery_functions)-set(all_zero_functions))
    fw = open('./js-functions/remained_jQuery_functions.txt','w')
    for function in remainedJQueryFunctions:
        fw.write(function+"\n")
    fw.close()
        
    remainedPhonegapFunctions = list(set(phonegap_functions)-set(all_zero_functions))
    fw = open('./js-functions/remained_phonegap_functions.txt','w')
    for function in remainedPhonegapFunctions:
        fw.write(function+"\n")
    fw.close()
    
def feature_selection(flag,kind,k):
    
    js_functions = get_function_list("./js-functions/remained_js_functions.txt")
    jQuery_functions = get_function_list("./js-functions/remained_jQuery_functions.txt")
    phonegap_functions = get_function_list("./js-functions/remained_phonegap_functions.txt")
    
    all_functions = []    
    all_functions.extend(js_functions)
    all_functions.extend(jQuery_functions)
    all_functions.extend(phonegap_functions)

    
    
    vulnerable_all_file_dir = config.vulnerable_all_data_filedir_remained
    vulnerable_jQuery_file_dir = config.vulnerable_jQuery_data_filedir_remained
    vulnerable_js_file_dir = config.vulnerable_js_data_filedir_remained
    vulnerable_phonegap_file_dir = config.vulnerable_phonegap_data_filedir_remained
    
    
    normal_all_file_dir = config.normal_all_data_filedir_remained
    normal_jQuery_file_dir = config.normal_jQuery_data_filedir_remained
    normal_js_file_dir = config.normal_js_data_filedir_remained
    normal_phonegap_file_dir = config.normal_phonegap_data_filedir_remained
    
    vul_filedir = None
    normal_filedir = None
    
    total_functions = []
    if(flag=='js'):
        vul_filedir = vulnerable_js_file_dir
        normal_filedir = normal_js_file_dir
        total_functions = js_functions
    elif(flag=='jQuery'):
        vul_filedir = vulnerable_jQuery_file_dir
        normal_filedir = normal_jQuery_file_dir
        total_functions = jQuery_functions
    elif(flag=='phonegap'):
        vul_filedir = vulnerable_phonegap_file_dir
        normal_filedir = normal_phonegap_file_dir
        total_functions = phonegap_functions
    elif(flag=='all'):
        vul_filedir = vulnerable_all_file_dir
        normal_filedir = normal_all_file_dir
        total_functions = all_functions
    
    print "len total functions",len(total_functions)
    #vul_data_matrix = np.loadtxt(vul_filedir, dtype=np.int32,delimiter=',')
    #normal_data_matrix = np.loadtxt(normal_filedir, dtype=np.int32,delimiter=',')
    loadData = []
    for line in open(vul_filedir):
        loadData.append([int(item) for item in line.strip().split(',')])
    for line in open(normal_filedir):
        loadData.append([int(item) for item in line.strip().split(',')])
    
    
    if(kind == "chi"):
    
        from TextAnalysisChi import chi
        
        bestFeatureIndexes,selectedDataSet = chi(loadData, k)
        print bestFeatureIndexes
        list_content = ""
        for index in bestFeatureIndexes:
            list_content +='''"'''+ total_functions[index]+'''",'''
        print list_content
    else:
        from TextAnalysisInfoGain import IG
        bestFeatures = IG(loadData,total_functions, k)
        print bestFeatures
        list_content = ""
        for feature in bestFeatures:
            list_content +='''"'''+ feature +'''",'''
        print list_content
    
if __name__ == '__main__':
    ################################
    #flag = "all"
    #remove_unused_functions(flag)
    
#     startTimeStamp = time.time()
#     
#     flag = "all"
#     remove_unused_functions(flag)
#     
#     
#     
#     endTimeStamp = time.time()
#     total_time = endTimeStamp - startTimeStamp
#     ft = open("/home/yanruibo/code-injection/process-info/feature-selection-remove-unused-functions", "w")
#     ft.write("Total Time(extract js and generate dataset) : " + str(total_time) + "\n")
#     ft.close()
    
    ################################
    
    #flag = 'js'
    #flag = 'jQuery'
    #flag = 'phonegap'
    #flag = 'all'
    #feature_selection(flag,'infogain',30)
    #feature_selection(flag,'chi',30)
    
#     startTimeStamp = time.time()
#     
#     flag = 'js'
#     feature_selection(flag,'chi',10)
#     flag = 'jQuery'
#     feature_selection(flag,'chi',10)
#     flag = 'phonegap'
#     feature_selection(flag,'chi',10)
#     flag = 'all'
#     feature_selection(flag,'chi',30)
#     
#     endTimeStamp = time.time()
#     total_time = endTimeStamp - startTimeStamp
#     ft = open("/home/yanruibo/code-injection/process-info/feature-selection-chi-4", "w")
#     ft.write("Total Time : " + str(total_time) + "\n")
#     ft.close()


    startTimeStamp = time.time()
    
    flag = 'js'
    feature_selection(flag,'infogain',10)
    flag = 'jQuery'
    feature_selection(flag,'infogain',10)
    flag = 'phonegap'
    feature_selection(flag,'infogain',10)
    flag = 'all'
    feature_selection(flag,'infogain',30)
    
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    ft = open("/home/yanruibo/code-injection/process-info/feature-selection-infogain-4", "w")
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()