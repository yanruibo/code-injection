#!/usr/bin/python
# encoding: utf-8


import sys
import os

# get normal : all - vulnerable
def difference():
    #f2-f1 f3 save
    fv = open("vulnerable_app_list.txt",'r')
    fp = open("phonegap_packagename_list.txt",'r')
    fn = open("normal_app_list.txt","w")
    vpl = fv.readlines()
    vpl = [item.strip() for item in vpl]
    pal = fp.readlines()
    pal = [item.strip() for item in pal]
    svpl = set(vpl)
    spal = set(pal)
    snval = spal - svpl
    lnval = list(snval)
    lnval.sort()
    for item in lnval:
        fn.write(item+'\n')
    fv.close()
    fp.close()
    fn.close()
    
    
    
    
if __name__ == "__main__":
    difference()