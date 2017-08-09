#!/usr/bin/python
# encoding: utf-8

'''
Created on Dec 12, 2015

@author: yanruibo
'''

import numpy as np
import operator

def calcPr(dataSet):
    numEntries = len(dataSet)
    labelCounts = {}
    for featVec in dataSet:  # the the number of unique elements and their occurance
        currentLabel = featVec[-1]
        # import pdb;pdb.set_trace()
        if currentLabel not in labelCounts.keys(): labelCounts[currentLabel] = 0
        labelCounts[currentLabel] += 1
        
    keys = labelCounts.keys()
    
    prob0 = float(labelCounts[0]) / numEntries
    prob1 = float(labelCounts[1]) / numEntries

    return prob0, prob1

def chi(dataSet, k):
    dataSet = np.array(dataSet)
    prob0, prob1 = calcPr(dataSet)
    labels = dataSet[:, -1]
    # import pdb;pdb.set_trace()
    N = len(labels)
    i_chiAvg = {}
    # 去掉标签列
    for i in range(dataSet.shape[1] - 1):
        ithColumn = dataSet[:, i]
        A0 = 0
        B0 = 0
        C0 = 0
        D0 = 0
        for j in range(len(labels)):
            if(ithColumn[j] >= 1 and labels[j] == 0):
                A0 += 1
            elif(ithColumn[j] >= 1 and labels[j] == 1):
                B0 += 1
            elif(ithColumn[j] == 0 and labels[j] == 0):    
                C0 += 1
            elif(ithColumn[j] == 0 and labels[j] == 1):    
                D0 += 1
        chi0 = float(N * (A0 * D0 - C0 * B0) ** 2) / ((A0 + C0) * (B0 + D0) * (A0 + B0) * (C0 + D0) + 1)
        
        A1 = 0
        B1 = 0
        C1 = 0
        D1 = 0
        for j in range(len(labels)):
            if(ithColumn[j] >= 1 and labels[j] == 1):
                A1 += 1
            elif(ithColumn[j] >= 1 and labels[j] == 0):
                B1 += 1
            elif(ithColumn[j] == 0 and labels[j] == 1):    
                C1 += 1
            elif(ithColumn[j] == 0 and labels[j] == 0):    
                D1 += 1
        chi1 = float(N * (A1 * D1 - C1 * B1) ** 2) / ((A1 + C1) * (B1 + D1) * (A1 + B1) * (C1 + D1) + 1)
        chi_avg = prob0 * chi0 + prob1 * chi1
        i_chiAvg[i] = chi_avg
        
    sortedChiAvgs = sorted(i_chiAvg.iteritems(), key=operator.itemgetter(1), reverse=True)
    bestFeatureIndexes = [sortedChiAvgs[i][0] for i in range(k)]
    #print sortedChiAvgs[:100]
    selectedDataSet = dataSet[:, bestFeatureIndexes]
    
    return bestFeatureIndexes, selectedDataSet


if __name__ == '__main__':
    pass
