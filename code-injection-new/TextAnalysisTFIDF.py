#!/usr/bin/python
# encoding: utf-8

'''
Created on May 26, 2016

@author: yanruibo
'''

def tfidf_feature_selection(dataSet, k):
    
    numEntries = len(dataSet)
    labelCounts = {}
    for featVec in dataSet:  # the the number of unique elements and their occurance
        currentLabel = featVec[-1]
        if currentLabel not in labelCounts.keys(): labelCounts[currentLabel] = 0
        labelCounts[currentLabel] += 1
        
    N0 = labelCounts[0]
    N1 = labelCounts[1]
    labels = dataSet[:, -1]
    i_tfidf = {}
    
    for i in range(dataSet.shape[1] - 1):
        number = 0
        ithColumn = dataSet[:, i]
        for j in range(ithColumn.shape[0]):
            if(ithColumn[j] == 1 and labels[j] == 0):
                number += 1
        i_tfidf[i] = number
    
    import operator
    sorted_tfidf = sorted(i_tfidf.iteritems(), key=operator.itemgetter(1), reverse=True)
    bestFeatureIndexes = [sorted_tfidf[i][0] for i in range(k)]
    print sorted_tfidf[:100]
    selectedDataSet = dataSet[:, bestFeatureIndexes]
    
    return bestFeatureIndexes, selectedDataSet
    
    
    
    
if __name__ == '__main__':
    pass
