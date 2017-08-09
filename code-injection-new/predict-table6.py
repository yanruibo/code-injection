#!/usr/bin/python
# encoding: utf-8

'''
Created on Jun 13, 2016

@author: yanruibo
'''

import numpy as np

from keras.models import Sequential
from keras.layers import Dense
from keras.callbacks import EarlyStopping
from keras.callbacks import Callback
from keras.layers.core import Flatten, Reshape
from keras.layers.recurrent import LSTM, SimpleRNN, GRU
from keras.layers import Convolution1D, MaxPooling1D, Convolution2D, MaxPooling2D
from keras import backend as K
from keras.layers import Dense, Dropout, Activation, Lambda




    
def cv_svm(method, frequency, normalization, k_folds, log_tag):
    
    import time
    startTimeStamp = time.time()
    timeArray = time.localtime(startTimeStamp)
    otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
    ft = open("log_cv_" + log_tag + "_" + method + "_svm_" + otherStyleTime, "w")
    
    TPR_all = []
    FPR_all = []
    Precision_all = [] 
    FScore_all = [] 
    ACC_all = []
    
    TPR_all2 = []
    FPR_all2 = []
    Precision_all2 = [] 
    FScore_all2 = [] 
    ACC_all2 = []
    
    TPs = []
    FPs = []
    TNs = []
    FNs = []
    
    aucs = []
    for i in range(k_folds):
        '''
        from preprocess import generate_matrix_infogain
        generate_matrix_infogain(i)
        '''
        #TP, FP, TN, FN, TPR, FPR, Precision, FScore, ACC, TPR2, FPR2, Precision2, FScore2, ACC2,auc = predict_svm_once(i, method, normalization)
        train_matrix = np.loadtxt(fname="./train-test-matrix/train_" + method + ".dat" + str(i), dtype=np.int, delimiter=",")
        # exclude label column
        dims = train_matrix.shape[1] - 1
        trainX = train_matrix[:, range(dims)]
        trainY = train_matrix[:, -1]
        # to ciji
        if not frequency:
            last_two_columns = trainX[:, [dims - 2, dims - 1]]
            before_columns = trainX[:, range(dims - 2)]
            before_columns = before_columns >= 1
            before_columns = before_columns.astype(np.int)
            trainX = np.c_[before_columns, last_two_columns]
        
        # print trainX[:10,:10]
        # print trainX.shape
        test_matrix = np.loadtxt(fname="./train-test-matrix/test_" + method + ".dat" + str(i), dtype=np.int, delimiter=",")
        # exclude label column
        dims = test_matrix.shape[1] - 1
        testX = test_matrix[:, range(dims)]
        testY = test_matrix[:, -1]
        if not frequency:
            last_two_columns = testX[:, [dims - 2, dims - 1]]
            before_columns = testX[:, range(dims - 2)]
            before_columns = before_columns >= 1
            before_columns = before_columns.astype(np.int)
            testX = np.c_[before_columns, last_two_columns]
        
        if normalization:
            from sklearn.preprocessing import MinMaxScaler
            min_max_scaler = MinMaxScaler()
            trainX = min_max_scaler.fit_transform(trainX)
            testX = min_max_scaler.fit_transform(testX)
            
        
        from sklearn import svm
        classifier = svm.SVC(gamma=0.001, C=100.)
        classifier.fit(trainX, trainY)
        
        predictY = classifier.predict(testX)
        
        import sklearn.metrics
        auc = sklearn.metrics.roc_auc_score(testY, predictY)
        
        predictY_int = np.array(predictY)
        
        # for vulnerable
        TP = 0
        FP = 0
        TN = 0
        FN = 0
        for i in range(len(testY)):
            if(testY[i] == 1 and predictY_int[i] == 1):
                TP += 1
            elif(testY[i] == 0 and predictY_int[i] == 1):
                FP += 1
            elif(testY[i] == 0 and predictY_int[i] == 0):
                TN += 1
            elif(testY[i] == 1 and predictY_int[i] == 0):
                FN += 1
        TPR = float(TP) / (TP + FN)
        FPR = float(FP) / (FP + TN)
        Precision = float(TP) / (TP + FP)
        FScore = float(2 * Precision * TPR) / (Precision + TPR)
        ACC = float(TP + TN) / (TP + TN + FP + FN)
        # for normal
        TP2 = 0
        FP2 = 0
        TN2 = 0
        FN2 = 0
        for i in range(len(testY)):
            if(testY[i] == 0 and predictY_int[i] == 0):
                TP2 += 1
            elif(testY[i] == 1 and predictY_int[i] == 0):
                FP2 += 1
            elif(testY[i] == 1 and predictY_int[i] == 1):
                TN2 += 1
            elif(testY[i] == 0 and predictY_int[i] == 1):
                FN2 += 1
        TPR2 = float(TP2) / (TP2 + FN2)
        FPR2 = float(FP2) / (FP2 + TN2)
        Precision2 = float(TP2) / (TP2 + FP2)
        FScore2 = float(2 * Precision2 * TPR2) / (Precision2 + TPR2)
        ACC2 = float(TP2 + TN2) / (TP2 + TN2 + FP2 + FN2)
        
        TPs.append(TP)
        FPs.append(FP)
        TNs.append(TN)
        FNs.append(FN)
        
        TPR_all.append(TPR)
        FPR_all.append(FPR)
        Precision_all.append(Precision)
        FScore_all.append(FScore)
        ACC_all.append(ACC)
        
        TPR_all2.append(TPR2)
        FPR_all2.append(FPR2)
        Precision_all2.append(Precision2)
        FScore_all2.append(FScore2)
        ACC_all2.append(ACC2)
        aucs.append(auc)
        
    ft.write("TP : " + str(TPs) + "\n")
    ft.write("FP : " + str(FPs) + "\n")
    ft.write("TN : " + str(TNs) + "\n")
    ft.write("FN : " + str(FNs) + "\n")
    
    ft.write("TPR : " + str(TPR_all) + "\n")
    ft.write("FPR : " + str(FPR_all) + "\n")
    ft.write("Precision : " + str(Precision_all) + "\n")
    ft.write("FScore : " + str(FScore_all) + "\n")
    ft.write("ACC : " + str(ACC_all) + "\n")
    ft.write("auc : " + str(aucs) + "\n")
    
    TPR_avg = np.sum(TPR_all) / float(len(TPR_all))
    FPR_avg = np.sum(FPR_all) / float(len(FPR_all))
    Precision_avg = np.sum(Precision_all) / float(len(Precision_all))
    FScore_avg = np.sum(FScore_all) / float(len(FScore_all))
    ACC_avg = np.sum(ACC_all) / float(len(ACC_all))
    
    TPR_avg2 = np.sum(TPR_all2) / float(len(TPR_all2))
    FPR_avg2 = np.sum(FPR_all2) / float(len(FPR_all2))
    Precision_avg2 = np.sum(Precision_all2) / float(len(Precision_all2))
    FScore_avg2 = np.sum(FScore_all2) / float(len(FScore_all2))
    ACC_avg2 = np.sum(ACC_all2) / float(len(ACC_all2))
    auc_avg = np.sum(aucs) / float(len(aucs))
    print "avgTPR", TPR_avg
    print "avgFPR", FPR_avg
    print "avgPrecision", Precision_avg
    print "avgFScore", FScore_avg
    print "avgACC", ACC_avg
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    
    
    ft.write("Average TPR : " + str(TPR_avg) + "\n")
    ft.write("Average FPR : " + str(FPR_avg) + "\n")
    ft.write("Average Precision : " + str(Precision_avg) + "\n")
    ft.write("Average FScore : " + str(FScore_avg) + "\n")
    ft.write("Average ACC : " + str(ACC_avg) + "\n")
    
    ft.write("TPR2 : " + str(TPR_all2) + "\n")
    ft.write("FPR2 : " + str(FPR_all2) + "\n")
    ft.write("Precision2 : " + str(Precision_all2) + "\n")
    ft.write("FScore2 : " + str(FScore_all2) + "\n")
    ft.write("ACC2 : " + str(ACC_all2) + "\n")
    
    ft.write("Average TPR2 : " + str(TPR_avg2) + "\n")
    ft.write("Average FPR2 : " + str(FPR_avg2) + "\n")
    ft.write("Average Precision2 : " + str(Precision_avg2) + "\n")
    ft.write("Average FScore2 : " + str(FScore_avg2) + "\n")
    ft.write("Average ACC2 : " + str(ACC_avg2) + "\n")
    ft.write("auc_avg : " + str(auc_avg) + "\n")
    
    
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()
    


def cv_bayes(method, frequency, normalization, k_folds, log_tag):
    
    import time
    startTimeStamp = time.time()
    timeArray = time.localtime(startTimeStamp)
    otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
    ft = open("log_cv_" + log_tag + "_" + method + "_bayes_" + otherStyleTime, "w")
    
    TPR_all = []
    FPR_all = []
    Precision_all = [] 
    FScore_all = [] 
    ACC_all = []
    
    TPR_all2 = []
    FPR_all2 = []
    Precision_all2 = [] 
    FScore_all2 = [] 
    ACC_all2 = []
    
    TPs = []
    FPs = []
    TNs = []
    FNs = []
    
    aucs = []
    for i in range(k_folds):
        '''
        from preprocess import generate_matrix_infogain
        generate_matrix_infogain(i)
        '''
        #TP, FP, TN, FN, TPR, FPR, Precision, FScore, ACC, TPR2, FPR2, Precision2, FScore2, ACC2,auc = predict_svm_once(i, method, normalization)
        train_matrix = np.loadtxt(fname="./train-test-matrix/train_" + method + ".dat" + str(i), dtype=np.int, delimiter=",")
        # exclude label column
        dims = train_matrix.shape[1] - 1
        trainX = train_matrix[:, range(dims)]
        trainY = train_matrix[:, -1]
        # to ciji
        if not frequency:
            last_two_columns = trainX[:, [dims - 2, dims - 1]]
            before_columns = trainX[:, range(dims - 2)]
            before_columns = before_columns >= 1
            before_columns = before_columns.astype(np.int)
            trainX = np.c_[before_columns, last_two_columns]
        
        # print trainX[:10,:10]
        # print trainX.shape
        test_matrix = np.loadtxt(fname="./train-test-matrix/test_" + method + ".dat" + str(i), dtype=np.int, delimiter=",")
        # exclude label column
        dims = test_matrix.shape[1] - 1
        testX = test_matrix[:, range(dims)]
        testY = test_matrix[:, -1]
        if not frequency:
            last_two_columns = testX[:, [dims - 2, dims - 1]]
            before_columns = testX[:, range(dims - 2)]
            before_columns = before_columns >= 1
            before_columns = before_columns.astype(np.int)
            testX = np.c_[before_columns, last_two_columns]
        
        if normalization:
            from sklearn.preprocessing import MinMaxScaler
            min_max_scaler = MinMaxScaler()
            trainX = min_max_scaler.fit_transform(trainX)
            testX = min_max_scaler.fit_transform(testX)
            
        
        from sklearn import tree
        classifier = tree.DecisionTreeClassifier()
        classifier.fit(trainX, trainY)
        
        predictY = classifier.predict(testX)
        
        import sklearn.metrics
        auc = sklearn.metrics.roc_auc_score(testY, predictY)
        
        predictY_int = np.array(predictY)
        
        # for vulnerable
        TP = 0
        FP = 0
        TN = 0
        FN = 0
        for i in range(len(testY)):
            if(testY[i] == 1 and predictY_int[i] == 1):
                TP += 1
            elif(testY[i] == 0 and predictY_int[i] == 1):
                FP += 1
            elif(testY[i] == 0 and predictY_int[i] == 0):
                TN += 1
            elif(testY[i] == 1 and predictY_int[i] == 0):
                FN += 1
        TPR = float(TP) / (TP + FN)
        FPR = float(FP) / (FP + TN)
        Precision = float(TP) / (TP + FP)
        FScore = float(2 * Precision * TPR) / (Precision + TPR)
        ACC = float(TP + TN) / (TP + TN + FP + FN)
        # for normal
        TP2 = 0
        FP2 = 0
        TN2 = 0
        FN2 = 0
        for i in range(len(testY)):
            if(testY[i] == 0 and predictY_int[i] == 0):
                TP2 += 1
            elif(testY[i] == 1 and predictY_int[i] == 0):
                FP2 += 1
            elif(testY[i] == 1 and predictY_int[i] == 1):
                TN2 += 1
            elif(testY[i] == 0 and predictY_int[i] == 1):
                FN2 += 1
        TPR2 = float(TP2) / (TP2 + FN2)
        FPR2 = float(FP2) / (FP2 + TN2)
        Precision2 = float(TP2) / (TP2 + FP2)
        FScore2 = float(2 * Precision2 * TPR2) / (Precision2 + TPR2)
        ACC2 = float(TP2 + TN2) / (TP2 + TN2 + FP2 + FN2)
        
        TPs.append(TP)
        FPs.append(FP)
        TNs.append(TN)
        FNs.append(FN)
        
        TPR_all.append(TPR)
        FPR_all.append(FPR)
        Precision_all.append(Precision)
        FScore_all.append(FScore)
        ACC_all.append(ACC)
        
        TPR_all2.append(TPR2)
        FPR_all2.append(FPR2)
        Precision_all2.append(Precision2)
        FScore_all2.append(FScore2)
        ACC_all2.append(ACC2)
        aucs.append(auc)
        
    ft.write("TP : " + str(TPs) + "\n")
    ft.write("FP : " + str(FPs) + "\n")
    ft.write("TN : " + str(TNs) + "\n")
    ft.write("FN : " + str(FNs) + "\n")
    
    ft.write("TPR : " + str(TPR_all) + "\n")
    ft.write("FPR : " + str(FPR_all) + "\n")
    ft.write("Precision : " + str(Precision_all) + "\n")
    ft.write("FScore : " + str(FScore_all) + "\n")
    ft.write("ACC : " + str(ACC_all) + "\n")
    ft.write("auc : " + str(aucs) + "\n")
    
    TPR_avg = np.sum(TPR_all) / float(len(TPR_all))
    FPR_avg = np.sum(FPR_all) / float(len(FPR_all))
    Precision_avg = np.sum(Precision_all) / float(len(Precision_all))
    FScore_avg = np.sum(FScore_all) / float(len(FScore_all))
    ACC_avg = np.sum(ACC_all) / float(len(ACC_all))
    
    TPR_avg2 = np.sum(TPR_all2) / float(len(TPR_all2))
    FPR_avg2 = np.sum(FPR_all2) / float(len(FPR_all2))
    Precision_avg2 = np.sum(Precision_all2) / float(len(Precision_all2))
    FScore_avg2 = np.sum(FScore_all2) / float(len(FScore_all2))
    ACC_avg2 = np.sum(ACC_all2) / float(len(ACC_all2))
    auc_avg = np.sum(aucs) / float(len(aucs))
    print "avgTPR", TPR_avg
    print "avgFPR", FPR_avg
    print "avgPrecision", Precision_avg
    print "avgFScore", FScore_avg
    print "avgACC", ACC_avg
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    
    
    ft.write("Average TPR : " + str(TPR_avg) + "\n")
    ft.write("Average FPR : " + str(FPR_avg) + "\n")
    ft.write("Average Precision : " + str(Precision_avg) + "\n")
    ft.write("Average FScore : " + str(FScore_avg) + "\n")
    ft.write("Average ACC : " + str(ACC_avg) + "\n")
    
    ft.write("TPR2 : " + str(TPR_all2) + "\n")
    ft.write("FPR2 : " + str(FPR_all2) + "\n")
    ft.write("Precision2 : " + str(Precision_all2) + "\n")
    ft.write("FScore2 : " + str(FScore_all2) + "\n")
    ft.write("ACC2 : " + str(ACC_all2) + "\n")
    
    ft.write("Average TPR2 : " + str(TPR_avg2) + "\n")
    ft.write("Average FPR2 : " + str(FPR_avg2) + "\n")
    ft.write("Average Precision2 : " + str(Precision_avg2) + "\n")
    ft.write("Average FScore2 : " + str(FScore_avg2) + "\n")
    ft.write("Average ACC2 : " + str(ACC_avg2) + "\n")
    ft.write("auc_avg : " + str(auc_avg) + "\n")
    
    
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()

def cv_randomforest(method, frequency, normalization, k_folds, log_tag):
    
    import time
    startTimeStamp = time.time()
    timeArray = time.localtime(startTimeStamp)
    otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
    ft = open("log_cv_" + log_tag + "_" + method + "_randomforest_" + otherStyleTime, "w")
    
    TPR_all = []
    FPR_all = []
    Precision_all = [] 
    FScore_all = [] 
    ACC_all = []
    
    TPR_all2 = []
    FPR_all2 = []
    Precision_all2 = [] 
    FScore_all2 = [] 
    ACC_all2 = []
    
    TPs = []
    FPs = []
    TNs = []
    FNs = []
    
    aucs = []
    for i in range(k_folds):
        '''
        from preprocess import generate_matrix_infogain
        generate_matrix_infogain(i)
        '''
        #TP, FP, TN, FN, TPR, FPR, Precision, FScore, ACC, TPR2, FPR2, Precision2, FScore2, ACC2,auc = predict_svm_once(i, method, normalization)
        train_matrix = np.loadtxt(fname="./train-test-matrix/train_" + method + ".dat" + str(i), dtype=np.int, delimiter=",")
        # exclude label column
        dims = train_matrix.shape[1] - 1
        trainX = train_matrix[:, range(dims)]
        trainY = train_matrix[:, -1]
        # to ciji
        if not frequency:
            last_two_columns = trainX[:, [dims - 2, dims - 1]]
            before_columns = trainX[:, range(dims - 2)]
            before_columns = before_columns >= 1
            before_columns = before_columns.astype(np.int)
            trainX = np.c_[before_columns, last_two_columns]
        
        # print trainX[:10,:10]
        # print trainX.shape
        test_matrix = np.loadtxt(fname="./train-test-matrix/test_" + method + ".dat" + str(i), dtype=np.int, delimiter=",")
        # exclude label column
        dims = test_matrix.shape[1] - 1
        testX = test_matrix[:, range(dims)]
        testY = test_matrix[:, -1]
        if not frequency:
            last_two_columns = testX[:, [dims - 2, dims - 1]]
            before_columns = testX[:, range(dims - 2)]
            before_columns = before_columns >= 1
            before_columns = before_columns.astype(np.int)
            testX = np.c_[before_columns, last_two_columns]
        
        if normalization:
            from sklearn.preprocessing import MinMaxScaler
            min_max_scaler = MinMaxScaler()
            trainX = min_max_scaler.fit_transform(trainX)
            testX = min_max_scaler.fit_transform(testX)
            
        
        from sklearn.ensemble import RandomForestClassifier
        classifier = RandomForestClassifier(n_estimators=10)
        classifier.fit(trainX, trainY)
        
        predictY = classifier.predict(testX)
        
        import sklearn.metrics
        auc = sklearn.metrics.roc_auc_score(testY, predictY)
        
        predictY_int = np.array(predictY)
        
        # for vulnerable
        TP = 0
        FP = 0
        TN = 0
        FN = 0
        for i in range(len(testY)):
            if(testY[i] == 1 and predictY_int[i] == 1):
                TP += 1
            elif(testY[i] == 0 and predictY_int[i] == 1):
                FP += 1
            elif(testY[i] == 0 and predictY_int[i] == 0):
                TN += 1
            elif(testY[i] == 1 and predictY_int[i] == 0):
                FN += 1
        TPR = float(TP) / (TP + FN)
        FPR = float(FP) / (FP + TN)
        Precision = float(TP) / (TP + FP)
        FScore = float(2 * Precision * TPR) / (Precision + TPR)
        ACC = float(TP + TN) / (TP + TN + FP + FN)
        # for normal
        TP2 = 0
        FP2 = 0
        TN2 = 0
        FN2 = 0
        for i in range(len(testY)):
            if(testY[i] == 0 and predictY_int[i] == 0):
                TP2 += 1
            elif(testY[i] == 1 and predictY_int[i] == 0):
                FP2 += 1
            elif(testY[i] == 1 and predictY_int[i] == 1):
                TN2 += 1
            elif(testY[i] == 0 and predictY_int[i] == 1):
                FN2 += 1
        TPR2 = float(TP2) / (TP2 + FN2)
        FPR2 = float(FP2) / (FP2 + TN2)
        Precision2 = float(TP2) / (TP2 + FP2)
        FScore2 = float(2 * Precision2 * TPR2) / (Precision2 + TPR2)
        ACC2 = float(TP2 + TN2) / (TP2 + TN2 + FP2 + FN2)
        
        TPs.append(TP)
        FPs.append(FP)
        TNs.append(TN)
        FNs.append(FN)
        
        TPR_all.append(TPR)
        FPR_all.append(FPR)
        Precision_all.append(Precision)
        FScore_all.append(FScore)
        ACC_all.append(ACC)
        
        TPR_all2.append(TPR2)
        FPR_all2.append(FPR2)
        Precision_all2.append(Precision2)
        FScore_all2.append(FScore2)
        ACC_all2.append(ACC2)
        aucs.append(auc)
        
    ft.write("TP : " + str(TPs) + "\n")
    ft.write("FP : " + str(FPs) + "\n")
    ft.write("TN : " + str(TNs) + "\n")
    ft.write("FN : " + str(FNs) + "\n")
    
    ft.write("TPR : " + str(TPR_all) + "\n")
    ft.write("FPR : " + str(FPR_all) + "\n")
    ft.write("Precision : " + str(Precision_all) + "\n")
    ft.write("FScore : " + str(FScore_all) + "\n")
    ft.write("ACC : " + str(ACC_all) + "\n")
    ft.write("auc : " + str(aucs) + "\n")
    
    TPR_avg = np.sum(TPR_all) / float(len(TPR_all))
    FPR_avg = np.sum(FPR_all) / float(len(FPR_all))
    Precision_avg = np.sum(Precision_all) / float(len(Precision_all))
    FScore_avg = np.sum(FScore_all) / float(len(FScore_all))
    ACC_avg = np.sum(ACC_all) / float(len(ACC_all))
    
    TPR_avg2 = np.sum(TPR_all2) / float(len(TPR_all2))
    FPR_avg2 = np.sum(FPR_all2) / float(len(FPR_all2))
    Precision_avg2 = np.sum(Precision_all2) / float(len(Precision_all2))
    FScore_avg2 = np.sum(FScore_all2) / float(len(FScore_all2))
    ACC_avg2 = np.sum(ACC_all2) / float(len(ACC_all2))
    auc_avg = np.sum(aucs) / float(len(aucs))
    print "avgTPR", TPR_avg
    print "avgFPR", FPR_avg
    print "avgPrecision", Precision_avg
    print "avgFScore", FScore_avg
    print "avgACC", ACC_avg
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    
    
    ft.write("Average TPR : " + str(TPR_avg) + "\n")
    ft.write("Average FPR : " + str(FPR_avg) + "\n")
    ft.write("Average Precision : " + str(Precision_avg) + "\n")
    ft.write("Average FScore : " + str(FScore_avg) + "\n")
    ft.write("Average ACC : " + str(ACC_avg) + "\n")
    
    ft.write("TPR2 : " + str(TPR_all2) + "\n")
    ft.write("FPR2 : " + str(FPR_all2) + "\n")
    ft.write("Precision2 : " + str(Precision_all2) + "\n")
    ft.write("FScore2 : " + str(FScore_all2) + "\n")
    ft.write("ACC2 : " + str(ACC_all2) + "\n")
    
    ft.write("Average TPR2 : " + str(TPR_avg2) + "\n")
    ft.write("Average FPR2 : " + str(FPR_avg2) + "\n")
    ft.write("Average Precision2 : " + str(Precision_avg2) + "\n")
    ft.write("Average FScore2 : " + str(FScore_avg2) + "\n")
    ft.write("Average ACC2 : " + str(ACC_avg2) + "\n")
    ft.write("auc_avg : " + str(auc_avg) + "\n")
    
    
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()
    
    
def cv_lr(method, frequency, normalization, k_folds, log_tag):
    
    import time
    startTimeStamp = time.time()
    timeArray = time.localtime(startTimeStamp)
    otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
    ft = open("log_cv_" + log_tag + "_" + method + "_lr_" + otherStyleTime, "w")
    
    TPR_all = []
    FPR_all = []
    Precision_all = [] 
    FScore_all = [] 
    ACC_all = []
    
    TPR_all2 = []
    FPR_all2 = []
    Precision_all2 = [] 
    FScore_all2 = [] 
    ACC_all2 = []
    
    TPs = []
    FPs = []
    TNs = []
    FNs = []
    
    aucs = []
    for i in range(k_folds):
        '''
        from preprocess import generate_matrix_infogain
        generate_matrix_infogain(i)
        '''
        #TP, FP, TN, FN, TPR, FPR, Precision, FScore, ACC, TPR2, FPR2, Precision2, FScore2, ACC2,auc = predict_svm_once(i, method, normalization)
        train_matrix = np.loadtxt(fname="./train-test-matrix/train_" + method + ".dat" + str(i), dtype=np.int, delimiter=",")
        # exclude label column
        dims = train_matrix.shape[1] - 1
        trainX = train_matrix[:, range(dims)]
        trainY = train_matrix[:, -1]
        # to ciji
        if not frequency:
            last_two_columns = trainX[:, [dims - 2, dims - 1]]
            before_columns = trainX[:, range(dims - 2)]
            before_columns = before_columns >= 1
            before_columns = before_columns.astype(np.int)
            trainX = np.c_[before_columns, last_two_columns]
        
        # print trainX[:10,:10]
        # print trainX.shape
        test_matrix = np.loadtxt(fname="./train-test-matrix/test_" + method + ".dat" + str(i), dtype=np.int, delimiter=",")
        # exclude label column
        dims = test_matrix.shape[1] - 1
        testX = test_matrix[:, range(dims)]
        testY = test_matrix[:, -1]
        if not frequency:
            last_two_columns = testX[:, [dims - 2, dims - 1]]
            before_columns = testX[:, range(dims - 2)]
            before_columns = before_columns >= 1
            before_columns = before_columns.astype(np.int)
            testX = np.c_[before_columns, last_two_columns]
        
        if normalization:
            from sklearn.preprocessing import MinMaxScaler
            min_max_scaler = MinMaxScaler()
            trainX = min_max_scaler.fit_transform(trainX)
            testX = min_max_scaler.fit_transform(testX)
            
        
        from sklearn import linear_model
        classifier = linear_model.LogisticRegression(C=1e5)
        classifier.fit(trainX, trainY)
        
        predictY = classifier.predict(testX)
        
        import sklearn.metrics
        auc = sklearn.metrics.roc_auc_score(testY, predictY)
        
        predictY_int = np.array(predictY)
        
        # for vulnerable
        TP = 0
        FP = 0
        TN = 0
        FN = 0
        for i in range(len(testY)):
            if(testY[i] == 1 and predictY_int[i] == 1):
                TP += 1
            elif(testY[i] == 0 and predictY_int[i] == 1):
                FP += 1
            elif(testY[i] == 0 and predictY_int[i] == 0):
                TN += 1
            elif(testY[i] == 1 and predictY_int[i] == 0):
                FN += 1
        TPR = float(TP) / (TP + FN)
        FPR = float(FP) / (FP + TN)
        Precision = float(TP) / (TP + FP)
        FScore = float(2 * Precision * TPR) / (Precision + TPR)
        ACC = float(TP + TN) / (TP + TN + FP + FN)
        # for normal
        TP2 = 0
        FP2 = 0
        TN2 = 0
        FN2 = 0
        for i in range(len(testY)):
            if(testY[i] == 0 and predictY_int[i] == 0):
                TP2 += 1
            elif(testY[i] == 1 and predictY_int[i] == 0):
                FP2 += 1
            elif(testY[i] == 1 and predictY_int[i] == 1):
                TN2 += 1
            elif(testY[i] == 0 and predictY_int[i] == 1):
                FN2 += 1
        TPR2 = float(TP2) / (TP2 + FN2)
        FPR2 = float(FP2) / (FP2 + TN2)
        Precision2 = float(TP2) / (TP2 + FP2)
        FScore2 = float(2 * Precision2 * TPR2) / (Precision2 + TPR2)
        ACC2 = float(TP2 + TN2) / (TP2 + TN2 + FP2 + FN2)
        
        TPs.append(TP)
        FPs.append(FP)
        TNs.append(TN)
        FNs.append(FN)
        
        TPR_all.append(TPR)
        FPR_all.append(FPR)
        Precision_all.append(Precision)
        FScore_all.append(FScore)
        ACC_all.append(ACC)
        
        TPR_all2.append(TPR2)
        FPR_all2.append(FPR2)
        Precision_all2.append(Precision2)
        FScore_all2.append(FScore2)
        ACC_all2.append(ACC2)
        aucs.append(auc)
        
    ft.write("TP : " + str(TPs) + "\n")
    ft.write("FP : " + str(FPs) + "\n")
    ft.write("TN : " + str(TNs) + "\n")
    ft.write("FN : " + str(FNs) + "\n")
    
    ft.write("TPR : " + str(TPR_all) + "\n")
    ft.write("FPR : " + str(FPR_all) + "\n")
    ft.write("Precision : " + str(Precision_all) + "\n")
    ft.write("FScore : " + str(FScore_all) + "\n")
    ft.write("ACC : " + str(ACC_all) + "\n")
    ft.write("auc : " + str(aucs) + "\n")
    
    TPR_avg = np.sum(TPR_all) / float(len(TPR_all))
    FPR_avg = np.sum(FPR_all) / float(len(FPR_all))
    Precision_avg = np.sum(Precision_all) / float(len(Precision_all))
    FScore_avg = np.sum(FScore_all) / float(len(FScore_all))
    ACC_avg = np.sum(ACC_all) / float(len(ACC_all))
    
    TPR_avg2 = np.sum(TPR_all2) / float(len(TPR_all2))
    FPR_avg2 = np.sum(FPR_all2) / float(len(FPR_all2))
    Precision_avg2 = np.sum(Precision_all2) / float(len(Precision_all2))
    FScore_avg2 = np.sum(FScore_all2) / float(len(FScore_all2))
    ACC_avg2 = np.sum(ACC_all2) / float(len(ACC_all2))
    auc_avg = np.sum(aucs) / float(len(aucs))
    print "avgTPR", TPR_avg
    print "avgFPR", FPR_avg
    print "avgPrecision", Precision_avg
    print "avgFScore", FScore_avg
    print "avgACC", ACC_avg
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    
    
    ft.write("Average TPR : " + str(TPR_avg) + "\n")
    ft.write("Average FPR : " + str(FPR_avg) + "\n")
    ft.write("Average Precision : " + str(Precision_avg) + "\n")
    ft.write("Average FScore : " + str(FScore_avg) + "\n")
    ft.write("Average ACC : " + str(ACC_avg) + "\n")
    
    ft.write("TPR2 : " + str(TPR_all2) + "\n")
    ft.write("FPR2 : " + str(FPR_all2) + "\n")
    ft.write("Precision2 : " + str(Precision_all2) + "\n")
    ft.write("FScore2 : " + str(FScore_all2) + "\n")
    ft.write("ACC2 : " + str(ACC_all2) + "\n")
    
    ft.write("Average TPR2 : " + str(TPR_avg2) + "\n")
    ft.write("Average FPR2 : " + str(FPR_avg2) + "\n")
    ft.write("Average Precision2 : " + str(Precision_avg2) + "\n")
    ft.write("Average FScore2 : " + str(FScore_avg2) + "\n")
    ft.write("Average ACC2 : " + str(ACC_avg2) + "\n")
    ft.write("auc_avg : " + str(auc_avg) + "\n")
    
    
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()
    
    






    
    
if __name__ == '__main__':
    
    
    
    cv_bayes(method="infogain_five_add", frequency=False, normalization=False, k_folds=5, log_tag="")
    cv_randomforest(method="infogain_five_add", frequency=False, normalization=False, k_folds=5, log_tag="")
    cv_lr(method="infogain_five_add", frequency=False, normalization=False, k_folds=5, log_tag="")
    cv_svm(method="infogain_five_add", frequency=False, normalization=False, k_folds=5, log_tag="")
    
    pass
    
