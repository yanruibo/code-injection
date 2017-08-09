#!/usr/bin/python
# encoding: utf-8

'''
Created on May 26, 2016

@author: yanruibo
'''

def df(dataSet, k):
    numEntries = len(dataSet)
    labelCounts = {}
    for featVec in dataSet:  # the the number of unique elements and their occurance
        currentLabel = featVec[-1]
        if currentLabel not in labelCounts.keys(): labelCounts[currentLabel] = 0
        labelCounts[currentLabel] += 1
        
    N0 = labelCounts[0]
    N1 = labelCounts[1]
    labels = dataSet[:, -1]
    normal_i_df = {}
    vulnerable_i_df = {}
    
    for i in range(dataSet.shape[1] - 1):
        number = 0
        ithColumn = dataSet[:, i]
        for j in range(ithColumn.shape[0]):
            if(ithColumn[j] >= 1 and labels[j] == 0):
                number += 1
        normal_i_df[i] = number
    
    for i in range(dataSet.shape[1] - 1):
        number = 0
        ithColumn = dataSet[:, i]
        for j in range(ithColumn.shape[0]):
            if(ithColumn[j] >= 1 and labels[j] == 1):
                number += 1
        vulnerable_i_df[i] = number
    
    import operator
    sorted_normal = sorted(normal_i_df.iteritems(), key=operator.itemgetter(1), reverse=True)
    normalBestFeatureIndexes = [sorted_normal[i][0] for i in range(k / 2)]
    
    sorted_vulnerable = sorted(vulnerable_i_df.iteritems(), key=operator.itemgetter(1), reverse=True)
    vulnerableBestFeatureIndexes = [sorted_vulnerable[i][0] for i in range(k / 2)]
    
    bestFeatureIndexes = list(set(normalBestFeatureIndexes) | set(vulnerableBestFeatureIndexes))
    
    selectedDataSet = dataSet[:, bestFeatureIndexes]
    
    return bestFeatureIndexes, selectedDataSet
    
if __name__ == '__main__':
    pass
