#!/usr/bin/python
# encoding: utf-8

import sys
import os
import time



def findLibray():
    
    dirname = "/home/yanruibo/code-injection/vulnerable-apks"
    apknames = os.listdir(dirname)
    
    ff = open("/home/yanruibo/code-injection/peprocess-info/vulnerable/library.dat","w")
    
    for item in apknames:
        #unzip -o -d /home/sunny myfile.zip
        os.system("unzip -o -d "+"/home/yanruibo/code-injection/vulnerable-decoded-apks/"+item[:-4]+" /home/yanruibo/code-injection/vulnerable-apks/"+item)
        rootDir = "/home/yanruibo/code-injection/vulnerable-decoded-apks/"+item[:-4]
        
        list_dirs =  os.walk(rootDir)
        for root,dirs,files in list_dirs:
            for f in files:
                #print f
                #print root
                abspath_file = os.path.join(root,f)
                #print abspath_file
                file_name = os.path.splitext(abspath_file)[0]
                extension_name = os.path.splitext(abspath_file)[1]
                #print extension_name
                if(extension_name.find(".js")!=-1):
                    ff.write(f+'\n')
#                 if(extension_name.find(".htm")!=-1):
#                     fread = open(abspath_file,'r')
#                     content = fread.read()
#                     if(content.find("cordova.plugins.barcodeScanner.")!=-1):
#                         pass
#             
    ff.close()
                         
if __name__ == "__main__":
    startTimeStamp=time.time()  
    findLibray()
    endTimeStamp=time.time()
    total_time = endTimeStamp-startTimeStamp
    print "Normal Total Time : ",str(total_time)
