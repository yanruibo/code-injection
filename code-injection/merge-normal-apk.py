#!/usr/bin/python
# encoding: utf-8


import sys
import os
import thread
import time


def getApkNames():
    
    fr = open("non_downloaded_normal_app_list.txt", 'r')
    non_downloaded = fr.readlines()
    fr.close()
    non_downloaded = [item.strip() for item in non_downloaded]
    
    dirname = '/home/yanruibo/code-injection/normal-apk-final-result/'
    download_add = os.listdir(dirname)
    download_add_packagename = [item[:-4] for item in download_add]
    
    for item in download_add_packagename:
        if item in non_downloaded:
            tmp = os.popen('cp '+dirname + item + ".apk"
                 + ' /home/yanruibo/code-injection/normal-added-final/' + item + ".apk").read()
            print tmp
    
if __name__ == "__main__":
    getApkNames()
