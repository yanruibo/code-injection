#!/usr/bin/python
# encoding: utf-8

'''
Created on Nov 16, 2015

@author: yanruibo
'''

if __name__ == '__main__':
    
    all = open("vulnerable_app_list.txt").readlines()
    all = [item.strip() for item in all]
    #print all
    
    downloaded = open("vulnerable_app_list_downloaded.txt").readlines()
    downloaded = [item.strip() for item in downloaded]
    #print downloaded
    print set(downloaded)-set(all)
    