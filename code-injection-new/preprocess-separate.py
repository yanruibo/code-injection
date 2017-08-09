#!/usr/bin/python
# encoding: utf-8

'''
Created on May 26, 2016

@author: yanruibo
'''

import os
import random
import pyesprima
import ast
from ast import MultiTree
from ast import MultiTreeNode
import json
import numpy as np




def serialize_list(list_content, filename):
    fw = open(filename, 'w')
    for item in list_content:
        fw.write(item + "\n")
    fw.flush()
    fw.close()
    
def get_list_from_file(filename):
    fr = open(filename, 'r')
    lines = fr.readlines()
    lines = [line.strip() for line in lines]
    fr.close()
    ret_lines = []
    for line in lines:
        if(line != ""):
            ret_lines.append(line)
    return ret_lines


def generate_ngrams_normal():
    
    # # generate dataset 
    normal_apkdir = "/home/yanruibo/code-injection/normal-apks"
    normal_apknames = os.listdir(normal_apkdir)
    vulnerable_apkdir = "/home/yanruibo/code-injection/vulnerable-apks"
    vulnerable_apknames = os.listdir(vulnerable_apkdir)
    
    train_normal = random.sample(normal_apknames, len(normal_apknames) / 2)
    test_normal = list(set(normal_apknames) - set(train_normal))

    train_vulnerable = random.sample(vulnerable_apknames, len(vulnerable_apknames) / 2)
    test_vulnerable = list(set(vulnerable_apknames) - set(train_vulnerable))
    
    '''
    train_normal_packagenames = [item[:-4] for item in train_normal]
    test_normal_packagenames = [item[:-4] for item in test_normal]
    
    train_vulnerable_packagenames = [item[:-4] for item in train_vulnerable]
    test_vulnerable_packagenames = [item[:-4] for item in test_vulnerable]
    '''
    normal_packagenames = [item[:-4] for item in normal_apknames]
    normal_packagenames = list(set(normal_packagenames) - set(["app.id_0ce12cb6a87f4850bff98c90a0c793e6",
    "it.hiho.indovaldarno", "gr.telia.pamesports", "gr.telia.cms", "it.airwall.politiche2013",
    "eng.roc.org.tw.imm.app", "gov.tcg.art.app", "it.mobimentum.aragnozzles"]))
    vulnerable_packagenames = [item[:-4] for item in vulnerable_apknames]
    '''
    serialize_list(train_normal_packagenames, "./dataset/train_normal")
    serialize_list(test_normal_packagenames, "./dataset/test_normal")
    serialize_list(train_vulnerable_packagenames, "./dataset/train_vulnerable")
    serialize_list(test_vulnerable_packagenames, "./dataset/test_vulnerable")
    '''
    print "generate dataset end!"
    # # generate dataset end
    
    all_ngrams = []
    
    normal_js_dir_suffix = "./js/normal/"
    vulnerable_js_dir_suffix = "./js/vulnerable/"
    
    fw = open("unsucess-normal.txt", "w")
    count = 1
    for packagename in normal_packagenames:
        
        try:
    
            js_dir = normal_js_dir_suffix + packagename + ".js"
            print count, js_dir
            count += 1
            json_str = os.popen('node analyze.js ' + js_dir).read()
            # import pdb;pdb.set_trace();
            py_dict = json.loads(json_str)
            tree = MultiTree(py_dict)
            tree.print_all_path()
            path_str = tree.get_path()
            tree.clear_path()
            ngrams = ast.generate_n_grams(path_str, length=3)
            
            # print path_str
            # print ngrams
            serialize_list(ngrams, filename="./ngrams/normal/" + packagename)
            # all_ngrams.extend(ngrams)
        except BaseException, argument:
            fw.write(packagename + "\n")
            fw.write(str(argument) + "\n")
            fw.flush()
            print str(argument)
            
    # all_ngrams = list(set(ngrams))
    # serialize_list(all_ngrams, filename="./all_ngrams/all_ngrams_normal")
    fw.close()
    
    
    
def generate_ngrams_vulnerable():
    
    # # generate dataset 
    normal_apkdir = "/home/yanruibo/code-injection/normal-apks"
    normal_apknames = os.listdir(normal_apkdir)
    vulnerable_apkdir = "/home/yanruibo/code-injection/vulnerable-apks"
    vulnerable_apknames = os.listdir(vulnerable_apkdir)
    
    train_normal = random.sample(normal_apknames, len(normal_apknames) / 2)
    test_normal = list(set(normal_apknames) - set(train_normal))

    train_vulnerable = random.sample(vulnerable_apknames, len(vulnerable_apknames) / 2)
    test_vulnerable = list(set(vulnerable_apknames) - set(train_vulnerable))
    
    '''
    train_normal_packagenames = [item[:-4] for item in train_normal]
    test_normal_packagenames = [item[:-4] for item in test_normal]
    
    train_vulnerable_packagenames = [item[:-4] for item in train_vulnerable]
    test_vulnerable_packagenames = [item[:-4] for item in test_vulnerable]
    '''
    
    vulnerable_packagenames = [item[:-4] for item in vulnerable_apknames]
    '''
    serialize_list(train_normal_packagenames, "./dataset/train_normal")
    serialize_list(test_normal_packagenames, "./dataset/test_normal")
    serialize_list(train_vulnerable_packagenames, "./dataset/train_vulnerable")
    serialize_list(test_vulnerable_packagenames, "./dataset/test_vulnerable")
    '''
    print "generate dataset end!"
    # # generate dataset end
    
    all_ngrams = []
    
    normal_js_dir_suffix = "./js/normal/"
    vulnerable_js_dir_suffix = "./js/vulnerable/"
    
    fw = open("unsucess-vulnerable.txt", "w")
    count = 1
    for packagename in vulnerable_packagenames:
        
        try:
            
            js_dir = vulnerable_js_dir_suffix + packagename + ".js"
            print count, js_dir
            count += 1
            json_str = os.popen('node analyze.js ' + js_dir).read()
            # import pdb;pdb.set_trace();
            py_dict = json.loads(json_str)
            tree = MultiTree(py_dict)
            tree.print_all_path()
            path_str = tree.get_path()
            tree.clear_path()
            ngrams = ast.generate_n_grams(path_str, length=3)
            
            # print path_str
            # print ngrams
            serialize_list(ngrams, filename="./ngrams/vulnerable/" + packagename)
            # all_ngrams.extend(ngrams)
        except BaseException, argument:
            fw.write(packagename + "\n")
            fw.write(str(argument) + "\n")
            fw.flush()
            print str(argument)
            
    # all_ngrams = list(set(ngrams))
    # serialize_list(all_ngrams, filename="./all_ngrams/all_ngrams")
    fw.close()

def test_generate_ngrams_vulnerable():
    import time
    startTimeStamp = time.time()
    
    generate_ngrams_vulnerable()
    
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    timeArray = time.localtime(endTimeStamp)
    otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
    ft = open("log_time_generate_ngrams_vulnerable_" + otherStyleTime, "w")
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()

    
def test_generate_ngrams_normal():
    import time
    startTimeStamp = time.time()

    generate_ngrams_normal()
    
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    timeArray = time.localtime(endTimeStamp)
    otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
    ft = open("log_time_generate_ngrams_normal_" + otherStyleTime, "w")
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()
    
def get_all_features():
    normal_ngrams_dir = "./ngrams/normal/"
    normal_packagenames = os.listdir(normal_ngrams_dir)
    vulnerable_ngrams_dir = "./ngrams/vulnerable/"
    vulnerable_packagenames = os.listdir(vulnerable_ngrams_dir)
    
    all_ngrams_set = set([])
    count = 0
    for packagename in normal_packagenames:
        count += 1
        print count
        one_list = get_list_from_file(normal_ngrams_dir + packagename)
        all_ngrams_set = all_ngrams_set | set(one_list)
    
    for packagename in vulnerable_packagenames:
        count += 1
        print count
        one_list = get_list_from_file(vulnerable_ngrams_dir + packagename)
        all_ngrams_set = all_ngrams_set | set(one_list)
    
    serialize_list(list(all_ngrams_set), "./all_ngrams/all_ngrams")
    
    
def test_get_all_features():
    import time
    startTimeStamp = time.time()

    get_all_features()
    
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    timeArray = time.localtime(endTimeStamp)
    otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
    ft = open("log_time_get_all_features_" + otherStyleTime, "w")
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()
    
    
def generate_all_feature_vector():
    
    all_features = get_list_from_file("./all_ngrams/all_ngrams")
    # generate normal feature vectors
    normal_ngrams_dir = "./ngrams/normal/"
    normal_packagenames = os.listdir(normal_ngrams_dir)
    
    count = 0
    for packagename in normal_packagenames:
        count += 1
        print count
        one_vector = []
        one_list = get_list_from_file(normal_ngrams_dir + packagename)
        for gram in all_features:
            one_vector.append(one_list.count(gram))
        one_vector = np.array(one_vector)
        np.savetxt("./all-feature-vector/normal/" + packagename, X=one_vector, fmt="%d", delimiter=',', newline='\n')
    # generate vulnerable feature vectors
    vulnerable_ngrams_dir = "./ngrams/vulnerable/"
    vulnerable_packagenames = os.listdir(vulnerable_ngrams_dir)
    for packagename in vulnerable_packagenames:
        count += 1
        print count
        one_vector = []
        one_list = get_list_from_file(vulnerable_ngrams_dir + packagename)
        for gram in all_features:
            one_vector.append(one_list.count(gram))
        one_vector = np.array(one_vector)
        np.savetxt("./all-feature-vector/vulnerable/" + packagename, X=one_vector, fmt="%d", delimiter=',', newline='\n')
    
def test_generate_all_feature_vector():
    import time
    startTimeStamp = time.time()
    
    generate_all_feature_vector()
    
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    timeArray = time.localtime(endTimeStamp)
    otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
    ft = open("log_time_generate_all_feature_vector_" + otherStyleTime, "w")
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()

if __name__ == '__main__':
    # test_normal()
    # test_vulnerable()
    # get_all_features()
    test_generate_all_feature_vector()
    pass
