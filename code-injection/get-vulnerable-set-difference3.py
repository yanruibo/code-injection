#!/usr/bin/python
# encoding: utf-8


import sys
import os

def difference():
    #f2-f1 f3 save
    fv = open("vulnerable_app_list_downloaded.txt",'r')
    fp = open("vulnerable_app_list.txt",'r')
    fn = open("non_downloaded_vulnerable_app_list.txt","w")
    vpl = fv.readlines()
    print len(vpl)
    vpl = [item.strip() for item in vpl]
    pal = fp.readlines()
    print len(pal)
    pal = [item.strip() for item in pal]
    svpl = set(vpl)
    spal = set(pal)
    snval = spal - svpl
    lnval = list(snval)
    print len(lnval)
    lnval.sort(cmp=None, key=None, reverse=False)
    for item in lnval:
        fn.write(item+'\n')
    fv.close()
    fp.close()
    fn.close()
    
if __name__ == "__main__":
    difference()