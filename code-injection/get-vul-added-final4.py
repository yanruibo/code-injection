#!/usr/bin/python
# encoding: utf-8


import sys
import os
import thread
import time


def getApkNames():
    
    fr = open("non_downloaded_vulnerable_app_list.txt", 'r')
    non_downloaded = fr.readlines()
    fr.close()
    non_downloaded = [item.strip() for item in non_downloaded]
    
    dirname = '/home/yanruibo/code-injection/vulnerable-added-packagename/'
    download_add = os.listdir(dirname)
    download_add_packagename = [item[:-4] for item in download_add]
    
    for item in download_add_packagename:
        if item in non_downloaded:
            print item
            tmp = os.popen('cp '+dirname + item + ".apk"
                 + ' /home/yanruibo/code-injection/vulnerable-added-final/' + item + ".apk").read()
            print tmp
    
if __name__ == "__main__":
    getApkNames()
