#!/usr/bin/python
# encoding: utf-8


import sys
import os

def difference():
    #f2-f1 f3 save
    f1 = open("normal_app_list_downloaded.txt",'r')
    f2 = open("normal_app_list.txt",'r')
    f3 = open("non_downloaded_normal_app_list.txt","w")
    l1 = f1.readlines()
    l1 = [item.strip() for item in l1]
    print len(l1)
    l2 = f2.readlines()
    l2 = [item.strip() for item in l2]
    print len(l2)
    l3 = list(set(l2)-set(l1))
    print len(l3)
    l3.sort(cmp=None, key=None, reverse=False)
    for item in l3:
        f3.write(item+'\n')
    f1.close()
    f2.close()
    f3.close()
    
if __name__ == "__main__":
    difference()