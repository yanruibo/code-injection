#!/usr/bin/python
# encoding: utf-8

'''
Created on May 26, 2016

@author: yanruibo
'''
import os
import random

from ast import MultiTree
import numpy as np
import json


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

def generate_dataset():
    normal_feature_vector_dir = "./all-feature-vector/normal/"
    normal_packagenames = os.listdir(normal_feature_vector_dir)
    vulnerable_feature_vector_dir = "./all-feature-vector/vulnerable/"
    vulnerable_packagenames = os.listdir(vulnerable_feature_vector_dir)
    
    train_normal = random.sample(normal_packagenames, len(normal_packagenames) / 2)
    test_normal = list(set(normal_packagenames) - set(train_normal))

    train_vulnerable = random.sample(vulnerable_packagenames, len(vulnerable_packagenames) / 2)
    test_vulnerable = list(set(vulnerable_packagenames) - set(train_vulnerable))
    
    serialize_list(train_normal, "./dataset/train_normal")
    serialize_list(test_normal, "./dataset/test_normal")
    serialize_list(train_vulnerable, "./dataset/train_vulnerable")
    serialize_list(test_vulnerable, "./dataset/test_vulnerable")
    
    
def generate_dataset_five_fold():
    normal_feature_vector_dir = "./all-feature-vector/normal/"
    normal_packagenames = os.listdir(normal_feature_vector_dir)
    vulnerable_feature_vector_dir = "./all-feature-vector/vulnerable/"
    vulnerable_packagenames = os.listdir(vulnerable_feature_vector_dir)
    normal_ten_percent = len(normal_packagenames) / 5
    vulnerable_ten_percent = len(vulnerable_packagenames) / 5
    normal_begin_pos = 0
    vulnerable_begin_pos = 0
    for i in range(5):
        if i == 4:
            test_normal = normal_packagenames[normal_begin_pos + i * normal_ten_percent:]
            train_normal = list(set(normal_packagenames) - set(test_normal))
            test_vulnerable = vulnerable_packagenames[vulnerable_begin_pos + i * vulnerable_ten_percent:]
            train_vulnerable = list(set(vulnerable_packagenames) - set(test_vulnerable))
            serialize_list(train_normal, "./dataset/train_normal_five" + str(i))
            serialize_list(test_normal, "./dataset/test_normal_five" + str(i))
            serialize_list(train_vulnerable, "./dataset/train_vulnerable_five" + str(i))
            serialize_list(test_vulnerable, "./dataset/test_vulnerable_five" + str(i))
        
        else:
            test_normal = normal_packagenames[normal_begin_pos + i * normal_ten_percent:normal_begin_pos + (i + 1) * normal_ten_percent]
            train_normal = list(set(normal_packagenames) - set(test_normal))
            test_vulnerable = vulnerable_packagenames[vulnerable_begin_pos + i * vulnerable_ten_percent:vulnerable_begin_pos + (i + 1) * vulnerable_ten_percent]
            train_vulnerable = list(set(vulnerable_packagenames) - set(test_vulnerable))
            serialize_list(train_normal, "./dataset/train_normal_five" + str(i))
            serialize_list(test_normal, "./dataset/test_normal_five" + str(i))
            serialize_list(train_vulnerable, "./dataset/train_vulnerable_five" + str(i))
            serialize_list(test_vulnerable, "./dataset/test_vulnerable_five" + str(i))
    
def feature_select(i, method, k=800):
    
    features = get_list_from_file("./all_ngrams/all_ngrams")
    train_normal = get_list_from_file("./dataset/train_normal_five" + str(i))
    # test_normal = get_list_from_file("./dataset/test_normal"+str(i))
    train_vulnerable = get_list_from_file("./dataset/train_vulnerable_five" + str(i))
    # test_vulnerable = get_list_from_file("./dataset/test_vulnerable"+str(i))

    normal_feature_vector_dir = "./all-feature-vector/normal/"
    vulnerable_feature_vector_dir = "./all-feature-vector/vulnerable/"
    
    trainX = []
    trainY = []
    for packagename in train_normal:
        one_vector = np.loadtxt(fname=normal_feature_vector_dir + packagename, dtype=np.int)
        trainX.append(one_vector)
        trainY.append(0)
    for packagename in train_vulnerable:
        one_vector = np.loadtxt(fname=vulnerable_feature_vector_dir + packagename, dtype=np.int)
        trainX.append(one_vector)
        trainY.append(1)
    trainX = np.array(trainX)
    trainY = np.array(trainY)
    dataSet = np.c_[trainX, trainY]
    
    if(method == "infogain"):
        from TextAnalysisInfoGain2 import IG
        dataSet = dataSet.tolist()
        best_feature_indexes, selected_data = IG(dataSet, k)
        best_features = [features[index] for index in best_feature_indexes]
        serialize_list(best_features, "./selected-features/infogain_five" + str(i))
        np.savetxt("./selected-features/train_infogain_five.dat" + str(i), X=selected_data, fmt="%d", delimiter=',', newline='\n')
        return best_features, selected_data
    elif(method == "chi"):
        from TextAnalysisChi import chi
        best_feature_indexes, selected_data = chi(dataSet, k)
        best_features = [features[index] for index in best_feature_indexes]
        serialize_list(best_features, "./selected-features/chi_five" + str(i))
        np.savetxt("./selected-features/train_chi_five.dat" + str(i), X=selected_data, fmt="%d", delimiter=',', newline='\n')
        return best_features, selected_data
    elif(method == "df"):
        from TextAnalysisDF import df
        best_feature_indexes, selected_data = df(dataSet, k)
        best_features = [features[index] for index in best_feature_indexes]
        serialize_list(best_features, "./selected-features/df_five" + str(i))
        np.savetxt("./selected-features/train_df_five.dat" + str(i), X=selected_data, fmt="%d", delimiter=',', newline='\n')
        return best_features, selected_data
        
    
def test_feature_selection_infogain(i):
    '''
    import time
    startTimeStamp = time.time()

    best_features, selected_data = feature_select(i,"infogain")
    
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    ft = open("log_time_feature_selection_infogain_" + str(endTimeStamp), "w")
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()
    '''
    best_features, selected_data = feature_select(i, "infogain")
    return best_features, selected_data

def test_feature_selection_chi(i):
    '''
    import time
    startTimeStamp = time.time()

    best_features, selected_data = feature_select(i,"chi")
    
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    ft = open("log_time_feature_selection_chi_" + str(endTimeStamp), "w")
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()
    '''
    best_features, selected_data = feature_select(i, "chi")
    return best_features, selected_data

def test_feature_selection_df(i):
    '''
    import time
    startTimeStamp = time.time()

    best_features, selected_data = feature_select(i,"chi")
    
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    ft = open("log_time_feature_selection_chi_" + str(endTimeStamp), "w")
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()
    '''
    best_features, selected_data = feature_select(i, "df")
    return best_features, selected_data


permissions = [
"android.permission.INTERNET",
"android.permission.ACCESS_NETWORK_STATE",
"android.permission.CAMERA",
"android.permission.FLASHLIGHT",
"android.permission.ACCESS_COARSE_LOCATION",
"android.permission.ACCESS_FINE_LOCATION",
"android.permission.WRITE_EXTERNAL_STORAGE",
"android.permission.RECORD_AUDIO",
"android.permission.RECORD_VIDEO",
"android.permission.MODIFY_AUDIO_SETTINGS",
"android.permission.READ_PHONE_STATE",
"android.permission.READ_CONTACTS",
"android.permission.WRITE_CONTACTS",
"android.permission.GET_ACCOUNTS",
"cordova.plugins.barcodeScanner.",
]
functions = [
             "sms.send(",
"nfc.",
"cordova.file.",
"connectivity.",
"bluetoothSerial.",
"navigator.contacts.",
"battery",
"document.write(",
"document.writeln(",
"innerHTML(",
"outerHTML(",
"html(",
"append(",
"prepend(",
"before(",
"after(",
"replaceAll(",
"replaceWith("]

# contains feature selection
def generate_matrix_infogain(i):
    # feature selection
    best_features, selected_data = test_feature_selection_infogain(i)
    print "feature selection done!"
#     import time
#     startTimeStamp = time.time()
    
    train_normal = get_list_from_file("./dataset/train_normal_five" + str(i))
    test_normal = get_list_from_file("./dataset/test_normal_five" + str(i))
    train_vulnerable = get_list_from_file("./dataset/train_vulnerable_five" + str(i))
    test_vulnerable = get_list_from_file("./dataset/test_vulnerable_five" + str(i))
    print "get dataset end!"
    
    selected_ngrams = best_features
    train_added_columns = []
    normal_js_dir_suffix = "./js/normal/"
    vulnerable_js_dir_suffix = "./js/vulnerable/"
    count = 0
    trainY = []
    for packagename in train_normal:
        js_dir = normal_js_dir_suffix + packagename + ".js"
        print count, js_dir
        count += 1
        json_str = os.popen('node analyze.js ' + js_dir).read()
        py_dict = json.loads(json_str)
        tree = MultiTree(py_dict)
        one_vector = []
        one_vector.append(tree.get_max_width())
        one_vector.append(tree.get_max_depth())
        
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/normal-apks/' + packagename + ".apk").read()
        for p in permissions:
            if(tmp.find(p) != -1):
                one_vector.append(1)
            else:
                one_vector.append(0)
        fread = open(js_dir, 'r')
        content = fread.read()
        fread.close()
        for f in functions:
            if (content.find(f) != -1):
                one_vector.append(1)
            else:
                one_vector.append(0)
        train_added_columns.append(one_vector)
        trainY.append(0)
    for packagename in train_vulnerable:
        js_dir = vulnerable_js_dir_suffix + packagename + ".js"
        print count, js_dir
        count += 1
        json_str = os.popen('node analyze.js ' + js_dir).read()
        py_dict = json.loads(json_str)
        tree = MultiTree(py_dict)
        one_vector = []
        one_vector.append(tree.get_max_width())
        one_vector.append(tree.get_max_depth())
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/vulnerable-apks/' + packagename + ".apk").read()
        for p in permissions:
            if(tmp.find(p) != -1):
                one_vector.append(1)
            else:
                one_vector.append(0)
        fread = open(js_dir, 'r')
        content = fread.read()
        fread.close()
        for f in functions:
            if (content.find(f) != -1):
                one_vector.append(1)
            else:
                one_vector.append(0)
                
        train_added_columns.append(one_vector)
        trainY.append(1)
    train_added_columns = np.array(train_added_columns)
    train_matrix = np.c_[selected_data, train_added_columns]
    train_matrix = np.c_[train_matrix, trainY]
    np.savetxt("./train-test-matrix/train_infogain_five_add.dat" + str(i), X=train_matrix, fmt="%d", delimiter=',', newline='\n')
    print "generate train matrix done!"
    
    test_matrix = []
    normal_ngrams_dir = "./ngrams/normal/"
    vulnerable_ngrams_dir = "./ngrams/vulnerable/"
    for packagename in test_normal:
        test_vector = []
        one_list = get_list_from_file(normal_ngrams_dir + packagename)
        for gram in selected_ngrams:
            test_vector.append(one_list.count(gram))

        js_dir = normal_js_dir_suffix + packagename + ".js"
        print count, js_dir
        count += 1
        json_str = os.popen('node analyze.js ' + js_dir).read()
        py_dict = json.loads(json_str)
        tree = MultiTree(py_dict)        
        test_vector.append(tree.get_max_width())
        test_vector.append(tree.get_max_depth())
        
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/normal-apks/' + packagename + ".apk").read()
        for p in permissions:
            if(tmp.find(p) != -1):
                test_vector.append(1)
            else:
                test_vector.append(0)
        fread = open(js_dir, 'r')
        content = fread.read()
        fread.close()
        for f in functions:
            if (content.find(f) != -1):
                test_vector.append(1)
            else:
                test_vector.append(0)
                
        test_vector.append(0)    
        test_matrix.append(test_vector)
    
    for packagename in test_vulnerable:
        test_vector = []
        one_list = get_list_from_file(vulnerable_ngrams_dir + packagename)
        for gram in selected_ngrams:
            test_vector.append(one_list.count(gram))
        
        js_dir = vulnerable_js_dir_suffix + packagename + ".js"
        print count, js_dir
        count += 1
        json_str = os.popen('node analyze.js ' + js_dir).read()
        py_dict = json.loads(json_str)
        tree = MultiTree(py_dict)        
        test_vector.append(tree.get_max_width())
        test_vector.append(tree.get_max_depth())
        
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/vulnerable-apks/' + packagename + ".apk").read()
        for p in permissions:
            if(tmp.find(p) != -1):
                test_vector.append(1)
            else:
                test_vector.append(0)
        fread = open(js_dir, 'r')
        content = fread.read()
        fread.close()
        for f in functions:
            if (content.find(f) != -1):
                test_vector.append(1)
            else:
                test_vector.append(0)
        
        test_vector.append(1)    
        test_matrix.append(test_vector)
    
    test_matrix = np.array(test_matrix)
    np.savetxt("./train-test-matrix/test_infogain_five_add.dat" + str(i), X=test_matrix, fmt="%d", delimiter=',', newline='\n')
    print "generate test matrix done!"
    
    
#     endTimeStamp = time.time()
#     total_time = endTimeStamp - startTimeStamp
#     ft = open("log_time_generate_matrix_infogain_" + str(endTimeStamp), "w")
#     ft.write("Total Time : " + str(total_time) + "\n")
#     ft.close()
    
    

# contains feature selection
def generate_matrix_chi(i):
    # feature selection
    best_features, selected_data = test_feature_selection_chi(i)
    print "feature selection done!"
#     import time
#     startTimeStamp = time.time()
    
    train_normal = get_list_from_file("./dataset/train_normal_five" + str(i))
    test_normal = get_list_from_file("./dataset/test_normal_five" + str(i))
    train_vulnerable = get_list_from_file("./dataset/train_vulnerable_five" + str(i))
    test_vulnerable = get_list_from_file("./dataset/test_vulnerable_five" + str(i))
    print "get dataset end!"
    
    selected_ngrams = best_features
    train_added_columns = []
    normal_js_dir_suffix = "./js/normal/"
    vulnerable_js_dir_suffix = "./js/vulnerable/"
    count = 0
    trainY = []
    for packagename in train_normal:
        js_dir = normal_js_dir_suffix + packagename + ".js"
        print count, js_dir
        count += 1
        json_str = os.popen('node analyze.js ' + js_dir).read()
        py_dict = json.loads(json_str)
        tree = MultiTree(py_dict)
        one_vector = []
        one_vector.append(tree.get_max_width())
        one_vector.append(tree.get_max_depth())
        
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/normal-apks/' + packagename + ".apk").read()
        for p in permissions:
            if(tmp.find(p) != -1):
                one_vector.append(1)
            else:
                one_vector.append(0)
        fread = open(js_dir, 'r')
        content = fread.read()
        fread.close()
        for f in functions:
            if (content.find(f) != -1):
                one_vector.append(1)
            else:
                one_vector.append(0)
        
        
        train_added_columns.append(one_vector)
        trainY.append(0)
    for packagename in train_vulnerable:
        js_dir = vulnerable_js_dir_suffix + packagename + ".js"
        print count, js_dir
        count += 1
        json_str = os.popen('node analyze.js ' + js_dir).read()
        py_dict = json.loads(json_str)
        tree = MultiTree(py_dict)
        one_vector = []
        one_vector.append(tree.get_max_width())
        one_vector.append(tree.get_max_depth())
        
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/vulnerable-apks/' + packagename + ".apk").read()
        for p in permissions:
            if(tmp.find(p) != -1):
                one_vector.append(1)
            else:
                one_vector.append(0)
        fread = open(js_dir, 'r')
        content = fread.read()
        fread.close()
        for f in functions:
            if (content.find(f) != -1):
                one_vector.append(1)
            else:
                one_vector.append(0)
        
        train_added_columns.append(one_vector)
        trainY.append(1)
    train_added_columns = np.array(train_added_columns)
    train_matrix = np.c_[selected_data, train_added_columns]
    train_matrix = np.c_[train_matrix, trainY]
    np.savetxt("./train-test-matrix/train_chi_five_add.dat" + str(i), X=train_matrix, fmt="%d", delimiter=',', newline='\n')
    print "generate train matrix done!"
    
    test_matrix = []
    normal_ngrams_dir = "./ngrams/normal/"
    vulnerable_ngrams_dir = "./ngrams/vulnerable/"
    for packagename in test_normal:
        test_vector = []
        one_list = get_list_from_file(normal_ngrams_dir + packagename)
        for gram in selected_ngrams:
            test_vector.append(one_list.count(gram))

        js_dir = normal_js_dir_suffix + packagename + ".js"
        print count, js_dir
        count += 1
        json_str = os.popen('node analyze.js ' + js_dir).read()
        py_dict = json.loads(json_str)
        tree = MultiTree(py_dict)        
        test_vector.append(tree.get_max_width())
        test_vector.append(tree.get_max_depth())
        
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/normal-apks/' + packagename + ".apk").read()
        for p in permissions:
            if(tmp.find(p) != -1):
                test_vector.append(1)
            else:
                test_vector.append(0)
        fread = open(js_dir, 'r')
        content = fread.read()
        fread.close()
        for f in functions:
            if (content.find(f) != -1):
                test_vector.append(1)
            else:
                test_vector.append(0)
        
        test_vector.append(0)    
        test_matrix.append(test_vector)
    
    for packagename in test_vulnerable:
        test_vector = []
        one_list = get_list_from_file(vulnerable_ngrams_dir + packagename)
        for gram in selected_ngrams:
            test_vector.append(one_list.count(gram))
        
        js_dir = vulnerable_js_dir_suffix + packagename + ".js"
        print count, js_dir
        count += 1
        json_str = os.popen('node analyze.js ' + js_dir).read()
        py_dict = json.loads(json_str)
        tree = MultiTree(py_dict)        
        test_vector.append(tree.get_max_width())
        test_vector.append(tree.get_max_depth())
        
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/vulnerable-apks/' + packagename + ".apk").read()
        for p in permissions:
            if(tmp.find(p) != -1):
                test_vector.append(1)
            else:
                test_vector.append(0)
        fread = open(js_dir, 'r')
        content = fread.read()
        fread.close()
        for f in functions:
            if (content.find(f) != -1):
                test_vector.append(1)
            else:
                test_vector.append(0)
        
        
        test_vector.append(1)    
        test_matrix.append(test_vector)
    
    test_matrix = np.array(test_matrix)
    np.savetxt("./train-test-matrix/test_chi_five_add.dat" + str(i), X=test_matrix, fmt="%d", delimiter=',', newline='\n')
    print "generate test matrix done!"
    
    
#     endTimeStamp = time.time()
#     total_time = endTimeStamp - startTimeStamp
#     ft = open("log_time_generate_matrix_infogain_" + str(endTimeStamp), "w")
#     ft.write("Total Time : " + str(total_time) + "\n")
#     ft.close()




    
# contains feature selection
def generate_matrix_df(i):
    # feature selection
    best_features, selected_data = test_feature_selection_df(i)
    print "feature selection done!"
#     import time
#     startTimeStamp = time.time()
    
    train_normal = get_list_from_file("./dataset/train_normal_five" + str(i))
    test_normal = get_list_from_file("./dataset/test_normal_five" + str(i))
    train_vulnerable = get_list_from_file("./dataset/train_vulnerable_five" + str(i))
    test_vulnerable = get_list_from_file("./dataset/test_vulnerable_five" + str(i))
    print "get dataset end!"
    
    selected_ngrams = best_features
    train_added_columns = []
    normal_js_dir_suffix = "./js/normal/"
    vulnerable_js_dir_suffix = "./js/vulnerable/"
    count = 0
    trainY = []
    for packagename in train_normal:
        js_dir = normal_js_dir_suffix + packagename + ".js"
        print count, js_dir
        count += 1
        json_str = os.popen('node analyze.js ' + js_dir).read()
        py_dict = json.loads(json_str)
        tree = MultiTree(py_dict)
        one_vector = []
        one_vector.append(tree.get_max_width())
        one_vector.append(tree.get_max_depth())
        
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/normal-apks/' + packagename + ".apk").read()
        for p in permissions:
            if(tmp.find(p) != -1):
                one_vector.append(1)
            else:
                one_vector.append(0)
        fread = open(js_dir, 'r')
        content = fread.read()
        fread.close()
        for f in functions:
            if (content.find(f) != -1):
                one_vector.append(1)
            else:
                one_vector.append(0)
        
        train_added_columns.append(one_vector)
        trainY.append(0)
    for packagename in train_vulnerable:
        js_dir = vulnerable_js_dir_suffix + packagename + ".js"
        print count, js_dir
        count += 1
        json_str = os.popen('node analyze.js ' + js_dir).read()
        py_dict = json.loads(json_str)
        tree = MultiTree(py_dict)
        one_vector = []
        one_vector.append(tree.get_max_width())
        one_vector.append(tree.get_max_depth())
        
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/vulnerable-apks/' + packagename + ".apk").read()
        for p in permissions:
            if(tmp.find(p) != -1):
                one_vector.append(1)
            else:
                one_vector.append(0)
        fread = open(js_dir, 'r')
        content = fread.read()
        fread.close()
        for f in functions:
            if (content.find(f) != -1):
                one_vector.append(1)
            else:
                one_vector.append(0)
        
        train_added_columns.append(one_vector)
        trainY.append(1)
    train_added_columns = np.array(train_added_columns)
    train_matrix = np.c_[selected_data, train_added_columns]
    train_matrix = np.c_[train_matrix, trainY]
    np.savetxt("./train-test-matrix/train_df_five_add.dat" + str(i), X=train_matrix, fmt="%d", delimiter=',', newline='\n')
    print "generate train matrix done!"
    
    test_matrix = []
    normal_ngrams_dir = "./ngrams/normal/"
    vulnerable_ngrams_dir = "./ngrams/vulnerable/"
    for packagename in test_normal:
        test_vector = []
        one_list = get_list_from_file(normal_ngrams_dir + packagename)
        for gram in selected_ngrams:
            test_vector.append(one_list.count(gram))

        js_dir = normal_js_dir_suffix + packagename + ".js"
        print count, js_dir
        count += 1
        json_str = os.popen('node analyze.js ' + js_dir).read()
        py_dict = json.loads(json_str)
        tree = MultiTree(py_dict)        
        test_vector.append(tree.get_max_width())
        test_vector.append(tree.get_max_depth())
        
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/normal-apks/' + packagename + ".apk").read()
        for p in permissions:
            if(tmp.find(p) != -1):
                test_vector.append(1)
            else:
                test_vector.append(0)
        fread = open(js_dir, 'r')
        content = fread.read()
        fread.close()
        for f in functions:
            if (content.find(f) != -1):
                test_vector.append(1)
            else:
                test_vector.append(0)
        
        test_vector.append(0)    
        test_matrix.append(test_vector)
    
    for packagename in test_vulnerable:
        test_vector = []
        one_list = get_list_from_file(vulnerable_ngrams_dir + packagename)
        for gram in selected_ngrams:
            test_vector.append(one_list.count(gram))
        
        js_dir = vulnerable_js_dir_suffix + packagename + ".js"
        print count, js_dir
        count += 1
        json_str = os.popen('node analyze.js ' + js_dir).read()
        py_dict = json.loads(json_str)
        tree = MultiTree(py_dict)        
        test_vector.append(tree.get_max_width())
        test_vector.append(tree.get_max_depth())
        
        tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/vulnerable-apks/' + packagename + ".apk").read()
        for p in permissions:
            if(tmp.find(p) != -1):
                test_vector.append(1)
            else:
                test_vector.append(0)
        fread = open(js_dir, 'r')
        content = fread.read()
        fread.close()
        for f in functions:
            if (content.find(f) != -1):
                test_vector.append(1)
            else:
                test_vector.append(0)
        
        test_vector.append(1)    
        test_matrix.append(test_vector)
    
    test_matrix = np.array(test_matrix)
    np.savetxt("./train-test-matrix/test_df_five_add.dat" + str(i), X=test_matrix, fmt="%d", delimiter=',', newline='\n')
    print "generate test matrix done!"
    
    
    
    


def generate_matrix_infogain_five():
    for i in range(5):
        generate_matrix_infogain(i)
def generate_matrix_chi_five():
    for i in range(5):
        generate_matrix_chi(i)
        
def generate_matrix_df_five():
    
    for i in range(5):
        print "df" + str(i)
        generate_matrix_df(i)

if __name__ == '__main__':
    # generate_dataset_five_fold()
    #generate_matrix_infogain_five()
    #generate_matrix_chi_five()
    generate_matrix_df_five()
    # pass
