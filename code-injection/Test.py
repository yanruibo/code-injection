#!/usr/bin/python
# encoding: utf-8

'''
Created on Nov 30, 2015

@author: yanruibo
'''
import numpy as np
import re
import math
from find_vul_frequent_functions import *
from TextAnalysisInfoGain import *

if __name__ == '__main__':
#     fr = open('test.js')
#     js_content = fr.read()
#     fr.close()
#     script_list = re.findall('(?si)<script>(.*?)</script>', js_content)
#     print script_list
#     print math.log(4,2)
#     print np.log2(4)
#     
#     print range(10)
#     featVec = [[1,2,3],[4,5,6],[7,8,9]]
#     print delete_column(featVec, 2)
    print "len phonegap functions:",len(get_function_list("./js-functions/phonegap_functions.txt"))
    print "len js functions:",len(get_function_list("./js-functions/js_functions.txt"))
    print "len jQuery functions:",len(get_function_list("./js-functions/jQuery_functions.txt"))
    