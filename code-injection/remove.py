#!/usr/bin/python
# encoding: utf-8


import sys
import os
import thread
import time

# remove .apk

def remove():
    apknames = open("phonegap_app_list.txt",'r').readlines()
    apknames = [item.strip() for item in apknames]
    fo = open("phonegap_packagename_list.txt",'w')
    print apknames[0]
    for item in apknames:
        packagename = item[:-4]
        print packagename
        fo.write(packagename+"\n")
    fo.close()
        
if __name__ == "__main__":
    remove()