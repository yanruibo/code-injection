#!/usr/bin/python
# encoding: utf-8

'''
Created on Dec 3, 2015

@author: yanruibo
'''
import numpy as np

if __name__ == '__main__':
    dataMatrix = np.loadtxt(fname='train.arff', dtype=np.int32,delimiter=',')
#     dataMatrix = np.loadtxt(fname='test.arff', dtype=np.int32,delimiter=',')
    dataSet = np.delete(dataMatrix,[dataMatrix.shape[1]-1],axis=1)
    labels = dataMatrix[:-1]
    dataSetColumnSize = dataSet.shape[1]
    print dataSet.shape
    #通过判断列的和判断某一列是否全为0
    # 对列求和 0是列 1是行
    columnSum = dataSet.sum(axis=0)
    zeroColumns = []
    for i in range(dataSetColumnSize):
        if(columnSum[i] == 0):
            zeroColumns.append(i)
    # 0是行 1是列
    #nonZeroDataSet = np.delete(dataSet, zeroColumns, 1)
    print zeroColumns
    
    
    #test [15, 16, 18, 19, 25]
    #train [16, 18, 19, 25]