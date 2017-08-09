#!/usr/bin/python
# encoding: utf-8

'''
Created on Apr 27, 2016

@author: yanruibo
'''

import re
import numpy as np

if __name__ == '__main__':
   
    method = "df_five_add"
    frequency = False
    train_matrix = np.loadtxt(fname="./train-test-matrix/train_" + method + ".dat0", dtype=np.int, delimiter=",")
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
    print trainX.shape
    
