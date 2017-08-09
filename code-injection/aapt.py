#!/usr/bin/python
# encoding: utf-8


import sys
import os


def aapt():
    #val = os.system('aapt dump permissions J:\vulnerable-apks\address.book.apk')
    tmp = os.popen('aapt dump permissions /home/yanruibo/code-injection/vulnerable-apks/address.book.apk').read()
    print tmp

if __name__ == "__main__":
    aapt()