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



class ValidationCallback(Callback):  # inherits from Callback
    
    def __init__(self, filepath, validation_data=(), patience=5):
        super(Callback, self).__init__()

        self.patience = patience
        self.X_val, self.y_val = validation_data  # tuple of validation X and y
        self.best = 0.0
        self.wait = 0  # counter for patience
        self.filepath = filepath
        self.best_rounds = 1
        self.counter = 0

    def on_epoch_end(self, epoch, logs={}):
        
        self.counter += 1
        predictY = self.model.predict(self.X_val, verbose=0)  # score the validation data 
        
             
        # current kappa
        # current = ml_metrics.quadratic_weighted_kappa(self.y_val.values.ravel(), np.clip(np.round(p.astype(int).ravel()), 1, 8))
        # print('Epoch %d Kappa: %f | Best Kappa: %f \n' % (epoch, current, self.best))
        testY = self.y_val
        
        predictY_int = []
        for item in predictY.flatten():
            if(item > 0.5):
                predictY_int.append(1)
            else:
                predictY_int.append(0)
        
        predictY_int = np.array(predictY_int)
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
                
        if(TP + FN == 0):
            TPR = 0.0
        else:
            TPR = float(TP) / (TP + FN)
        # TPR = float(TP) / (TP + FN)
        # FPR = float(FP) / (FP + TN)
        # Precision = float(TP) / (TP + FP)
        # FScore = float(2 * Precision * TPR) / (Precision + TPR)
        
        ACC = float(TP + TN) / (TP + TN + FP + FN)
        
        current = ACC
        print('Epoch %d ACC: %f | Best ACC: %f \n' % (epoch, current, self.best))
        
        # if improvement over best....
        '''
        if current > self.best:
            self.best = current
            self.best_rounds = self.counter
            self.wait = 0
            self.model.save_weights(self.filepath, overwrite=True)
        else:
            if self.wait >= self.patience:  # no more patience, retrieve best model
                self.model.stop_training = True
                print('Best number of rounds: %d \nACC: %f \n' % (self.best_rounds, self.best))
                
                self.model.load_weights(self.filepath)
                           
            self.wait += 1  # incremental the number of times without improvement
        '''
        if self.counter == 1:
            self.best = current
            self.best_rounds = self.counter
            self.model.save_weights(self.filepath, overwrite=True) 
            
        if current > self.best:
            self.best = current
            self.best_rounds = self.counter
            self.model.save_weights(self.filepath, overwrite=True) 
            
            
    
    

def serialize_list(list_):
    ret = ""
    for item in list_:
        ret = ret + str(item) + ","
    return ret

#Table5
    
def cv_crnn(method, frequency, normalization, k_folds, log_tag):
    
    import time
    startTimeStamp = time.time()
    timeArray = time.localtime(startTimeStamp)
    otherStyleTime = time.strftime("%Y-%m-%d %H:%M:%S", timeArray)
    log_file = "log_cv_" + log_tag + "_" + method + "_frequency_" + str(frequency) + "_normalization_" \
        + str(normalization) + "_crnn_" + otherStyleTime + "_table5"
        
    ft = open(log_file, "w")
    TPR_all = []
    FPR_all = []
    Precision_all = [] 
    #FScore_all = []
    ACC_all = []
    
    TPR_all2 = []
    FPR_all2 = []
    Precision_all2 = [] 
    #FScore_all2 = []
    ACC_all2 = []
    
    TPs = []
    FPs = []
    TNs = []
    FNs = []
    
    TP2s = []
    FP2s = []
    TN2s = []
    FN2s = []
    aucs = []
    
    for i in range(k_folds):
        '''
        from preprocess import generate_matrix_infogain
        generate_matrix_infogain(i)
        '''
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

        from sklearn.cross_validation import train_test_split
        trainX, validationX, trainY, validationY = train_test_split(trainX, trainY, test_size=0.2)
        validationX = validationX.reshape(validationX.shape[0], 1, validationX.shape[1])

        trainX = trainX.reshape(trainX.shape[0], 1, trainX.shape[1])
        testX = testX.reshape(testX.shape[0], 1, testX.shape[1])
        
        model = Sequential()
        
        def max_1d(X):
            return K.max(X, axis=1)
        
        model.add(Convolution1D(input_shape=(1, trainX.shape[2]), nb_filter=200, filter_length=3, border_mode='same', activation='sigmoid', subsample_length=1))
        model.add(Lambda(max_1d, output_shape=(200,)))
        
        model.add(Reshape((1, 200)))
        
        model.add(LSTM(output_dim=550, activation='sigmoid'))
        
        model.add(Dense(100, init='normal', activation='sigmoid'))
        model.add(Dense(100, init='normal', activation='sigmoid'))
        model.add(Dense(1, init='normal', activation='sigmoid'))
        
        # Compile model
        model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
        # model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
        # early_stop = EarlyStopping(monitor='loss', patience=50, verbose=1)
        model.fit(trainX, trainY, batch_size=100, nb_epoch=500, validation_split=0.2)
        weight_save_path = log_file + 'best.h5'
        val_call = ValidationCallback(validation_data=(validationX, validationY), patience=500,
                                      filepath=weight_save_path)
        model.fit(trainX, trainY, batch_size=100, nb_epoch=500, callbacks=[val_call])
        model.load_weights(weight_save_path)

        # model.fit(trainX, trainY, batch_size=100, nb_epoch=500, validation_split=0.2)

        predictY = model.predict(testX)

        # print predictY.shape
        # print predictY[:5]
        import sklearn.metrics
        auc = sklearn.metrics.roc_auc_score(testY, predictY.flatten())
        
        predictY_int = []
        for item in predictY.flatten():
            if(item > 0.5):
                predictY_int.append(1)
            else:
                predictY_int.append(0)
        
        predictY_int = np.array(predictY_int)
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
        #FScore = float(2 * Precision * TPR) / (Precision + TPR)
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
        #FScore2 = float(2 * Precision2 * TPR2) / (Precision2 + TPR2)
        ACC2 = float(TP2 + TN2) / (TP2 + TN2 + FP2 + FN2)
        
        TPs.append(TP)
        FPs.append(FP)
        TNs.append(TN)
        FNs.append(FN)
        
        TP2s.append(TP2)
        FP2s.append(FP2)
        TN2s.append(TN2)
        FN2s.append(FN2)
        
        TPR_all.append(TPR)
        FPR_all.append(FPR)
        Precision_all.append(Precision)
        #FScore_all.append(FScore)
        ACC_all.append(ACC)
        
        TPR_all2.append(TPR2)
        FPR_all2.append(FPR2)
        Precision_all2.append(Precision2)
        #FScore_all2.append(FScore2)
        ACC_all2.append(ACC2)
        
        aucs.append(auc)
        testY_str = serialize_list(testY)
        predictY_str = serialize_list(predictY)
        ft.write("testY: " + testY_str + "\n")
        ft.write("predictY: " + predictY_str + "\n")
        
    ft.write("TP : " + str(TPs) + "\n")
    ft.write("FP : " + str(FPs) + "\n")
    ft.write("TN : " + str(TNs) + "\n")
    ft.write("FN : " + str(FNs) + "\n")
    
    ft.write("TP2 : " + str(TP2s) + "\n")
    ft.write("FP2 : " + str(FP2s) + "\n")
    ft.write("TN2 : " + str(TN2s) + "\n")
    ft.write("FN2 : " + str(FN2s) + "\n")
    
    ft.write("TPR : " + str(TPR_all) + "\n")
    ft.write("FPR : " + str(FPR_all) + "\n")
    ft.write("Precision : " + str(Precision_all) + "\n")
    #ft.write("FScore : " + str(FScore_all) + "\n")
    ft.write("ACC : " + str(ACC_all) + "\n")
    ft.write("auc : " + str(aucs) + "\n")
    
    TPR_avg = np.sum(TPR_all) / float(len(TPR_all))
    FPR_avg = np.sum(FPR_all) / float(len(FPR_all))
    Precision_avg = np.sum(Precision_all) / float(len(Precision_all))
    #FScore_avg = np.sum(FScore_all) / float(len(FScore_all))
    ACC_avg = np.sum(ACC_all) / float(len(ACC_all))
    
    auc_avg = np.sum(aucs) / float(len(aucs))
    
    TPR_avg2 = np.sum(TPR_all2) / float(len(TPR_all2))
    FPR_avg2 = np.sum(FPR_all2) / float(len(FPR_all2))
    Precision_avg2 = np.sum(Precision_all2) / float(len(Precision_all2))
    #FScore_avg2 = np.sum(FScore_all2) / float(len(FScore_all2))
    ACC_avg2 = np.sum(ACC_all2) / float(len(ACC_all2))
    
    print "avgTPR", TPR_avg
    print "avgFPR", FPR_avg
    print "avgPrecision", Precision_avg
    #print "avgFScore", FScore_avg
    print "avgACC", ACC_avg
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    
    
    ft.write("Average TPR : " + str(TPR_avg) + "\n")
    ft.write("Average FPR : " + str(FPR_avg) + "\n")
    ft.write("Average Precision : " + str(Precision_avg) + "\n")
    #ft.write("Average FScore : " + str(FScore_avg) + "\n")
    ft.write("Average ACC : " + str(ACC_avg) + "\n")
    
    ft.write("TPR2 : " + str(TPR_all2) + "\n")
    ft.write("FPR2 : " + str(FPR_all2) + "\n")
    ft.write("Precision2 : " + str(Precision_all2) + "\n")
    #ft.write("FScore2 : " + str(FScore_all2) + "\n")
    ft.write("ACC2 : " + str(ACC_all2) + "\n")
    
    ft.write("Average TPR2 : " + str(TPR_avg2) + "\n")
    ft.write("Average FPR2 : " + str(FPR_avg2) + "\n")
    ft.write("Average Precision2 : " + str(Precision_avg2) + "\n")
    #ft.write("Average FScore2 : " + str(FScore_avg2) + "\n")
    ft.write("Average ACC2 : " + str(ACC_avg2) + "\n")
    ft.write("Average auc : " + str(auc_avg) + "\n")
    
    ft.write("Total Time : " + str(total_time) + "\n")
    ft.close()


    
    
if __name__ == '__main__':
    
    # cv_bpnn(method="infogain_five_add", frequency=False, normalization=False, k_folds=5, log_tag="five_add")
    # cv_bpnn(method="chi_five_add", frequency=False, normalization=False, k_folds=5, log_tag="five")
    # cv_bpnn(method="df_five_add", frequency=False, normalization=False, k_folds=5, log_tag="five")
    # cv_cnn(method="infogain_five_add", frequency=False, normalization=False, k_folds=5, log_tag="five_add")
    # cv_cnn(method="chi_five_add", frequency=False, normalization=False, k_folds=5, log_tag="five")
    # cv_cnn(method="df_five_add", frequency=False, normalization=False, k_folds=5, log_tag="five")
    # cv_dbn(method="infogain_five_add", frequency=False, normalization=True, k_folds=5, log_tag="five")
    # cv_svm(method="infogain_five_add", frequency=False, normalization=False, k_folds=5, log_tag="five_add")
    # cv_bayes(method="infogain_five_add", frequency=False, normalization=False, k_folds=5, log_tag="five_add")
    # cv_lr(method="infogain_five_add", frequency=False, normalization=False, k_folds=5, log_tag="five_add")
    cv_crnn(method="infogain_five_add", frequency=False, normalization=False, k_folds=5, log_tag="")
    cv_crnn(method="chi_five_add", frequency=False, normalization=False, k_folds=5, log_tag="")
    cv_crnn(method="df_five_add", frequency=False, normalization=False, k_folds=5, log_tag="")
    pass
    
