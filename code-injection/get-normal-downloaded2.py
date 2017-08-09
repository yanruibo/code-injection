#!/usr/bin/python
# encoding: utf-8


import sys
import os
import thread
import time


def getApkNames():
    dirname = "/home/yanruibo/code-injection/normal-apks/"
    apknames = os.listdir(dirname)
    fv = open("normal_app_list_downloaded.txt",'w')
    for item in apknames:
        packagename = item[:-4]
        print packagename
        fv.write(packagename+"\n")
    fv.close()
    print len(apknames)
if __name__ == "__main__":
    getApkNames()