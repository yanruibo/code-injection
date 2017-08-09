#!/usr/bin/python
# encoding: utf-8

'''
Created on Dec 12, 2015

@author: yanruibo
'''

import numpy as np
import operator
'''
计算整个数据集的经验熵　对应统计学习方法中的H(D)
'''
def calcShannonEnt(dataSet):
    numEntries = len(dataSet)
    labelCounts = {}
    for featVec in dataSet:  # the the number of unique elements and their occurance
        currentLabel = featVec[-1]
        if currentLabel not in labelCounts.keys(): labelCounts[currentLabel] = 0
        labelCounts[currentLabel] += 1
    shannonEnt = 0.0
    for key in labelCounts:
        prob = float(labelCounts[key]) / numEntries
        shannonEnt -= prob * np.log2(prob)  # log base 2
    return shannonEnt


'''
切分数据集，将第axis列，值为value的元素去掉,并把去除该值之后剩余的此向量加入一个列表中返回
'''
def splitDataSet(dataSet, axis, value):
    retDataSet = []
    for featVec in dataSet:
        if featVec[axis] == value:
            # print featVec
            reducedFeatVec = featVec[:axis]  # chop out axis used for splitting
            reducedFeatVec.extend(featVec[axis + 1:])
            # reducedFeatVec = np.vstack((reducedFeatVec,featVec[axis + 1:]))
            # print reducedFeatVec
            retDataSet.append(reducedFeatVec)
    return retDataSet


'''
选择最好的特征来切分，输入数据集和阀值
是按照信息增益来切分的，如果一个特征的信息增益小于这个阀值，则返回-1，
如果一个特征的信息增益大于阀值，则返回信息增益最大的特征所在的列的索引
'''    

def IG(dataSet, k):
    numFeatures = len(dataSet[0]) - 1  # the last column is used for the labels
    
    baseEntropy = calcShannonEnt(dataSet)
    i_infogain = {}
    for i in range(numFeatures):  # iterate over all the features
        featList = [example[i] for example in dataSet]  # create a list of all the examples of this feature即第i列
        uniqueVals = set(featList)  # get a set of unique values
        newEntropy = 0.0
        for value in uniqueVals:
            subDataSet = splitDataSet(dataSet, i, value)
            prob = len(subDataSet) / float(len(dataSet))
            newEntropy += prob * calcShannonEnt(subDataSet)     
        infoGain = baseEntropy - newEntropy  # calculate the info gain; ie reduction in entropy
        i_infogain[i] = infoGain
    
    sorted_infogain = sorted(i_infogain.iteritems(), key=operator.itemgetter(1), reverse=True)
    print sorted_infogain[:10]
    bestFeatureIndexes = [sorted_infogain[i][0] for i in range(k)]
    
    dataSet = np.array(dataSet)
    selectedDataSet = dataSet[:, bestFeatureIndexes]
    
    return bestFeatureIndexes, selectedDataSet





if __name__ == '__main__':
    pass
