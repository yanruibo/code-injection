#!/usr/bin/python
# encoding: utf-8

'''
Created on Nov 13, 2015

@author: yanruibo
'''

import os
import sys
import time 
if __name__ == '__main__':
    # rename all the apkname to remove space
    fp = open("apk-vul-info.txt","w")
    dirname = "/home/yanruibo/code-injection/vulnerable-added/"
    apknames = os.listdir(dirname)
    print len(apknames)
    non_space_apknames = ["".join(s.split(' ')) for s in apknames]
    for i in range(len(apknames)):
        if(non_space_apknames==".apk"):
            os.rename(dirname+apknames[i], dirname+str(i)+".apk")            
        else:
            os.rename(dirname+apknames[i], dirname+non_space_apknames[i])

    #rename non_space_apknames to packagename+.apk
    renamed_apk_names = os.listdir(dirname)
    print len(renamed_apk_names)
    for item in renamed_apk_names:
        #print "original-name : ",item
        fp.write("original-name : "+item+"\n")
        tmp = os.popen('aapt dump badging /home/yanruibo/code-injection/vulnerable-added/'+item).read()
        pos = tmp.find("package: name='")
        begin = pos+len("package: name='")
        end = tmp.find("'",begin)
        #print tmp[:100]
        packagename = tmp[begin:end]
        fp.write("packagename : "+packagename+"\n")
        #print "packagename : ",packagename
        os.popen('cp /home/yanruibo/code-injection/vulnerable-added/'+item
                 +' /home/yanruibo/code-injection/vulnerable-added-packagename/'+packagename+".apk")
    
    fp.close()
