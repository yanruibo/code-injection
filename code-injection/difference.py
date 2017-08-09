#!/usr/bin/python
# encoding: utf-8


import sys
import os

# get normal : all - vulnerable
def difference(set1,set2):
    #f2-f1 f3 save
    same = set1 & set2
    diff1 = set1- same;
    diff2 = set2-same
    
    print "same size:",len(same),same
    print "diff1 size:",len(diff1),diff1
    print "diff2 size:",len(diff2),diff2
    
    
    
    
if __name__ == "__main__":
    
    infogain1 = [".indexOf(",".name",".toLowerCase(",".split(",".replace(","parseInt(",
"document.createElement(",".innerHTML","document.getElementById(",
".value",

".ajax(",".show(",".extend(",".find(",".remove(",".hide(",
".each(",".attr(",".append(",".preventDefault(",

".abort",".download",".upload","device.platform",
"navigator.geolocation.getCurrentPosition","splashscreen.hide",
"navigator.notification.alert","connection.",".getPicture(",
"device.uuid",]
    infogain2 = [
                 ".name",".indexOf(",".toLowerCase(",".replace(",".split(","parseInt(",
".floor(",".substr(",".value","window.location",

".ajax(",".extend(",".show(",".remove(",".find(",".hide(",".append(",
".each(",".attr(",".html(",

"navigator.geolocation.getCurrentPosition","device.platform",
".download",".upload","splashscreen.hide",".abort",
"navigator.notification.alert",".getPicture(","device.uuid",
"navigator.geolocation.watchPosition",
]
    
    chi1 = [".indexOf(",".name",".toLowerCase(",".split(",".replace(","parseInt(",".innerHTML","document.createElement(","document.getElementById(",".substring(",

".ajax(",".extend(",".remove(",".show(",".find(",".hide(",".each(",".attr(",".append(",".preventDefault(",

".abort",".download","device.platform",".upload","navigator.geolocation.getCurrentPosition","navigator.notification.alert","splashscreen.hide","connection.",".getPicture(","device.uuid",]
    chi2 = [
            ".name",".indexOf(",".toLowerCase(",".split(",".replace(","parseInt(","document.getElementById(",".floor(",".value",".substr(",

".ajax(",".extend(",".remove(",".show(",".find(",".hide(",".append(",".each(",".attr(",".html(",

"navigator.geolocation.getCurrentPosition","device.platform",".download",".upload",".abort","navigator.notification.alert","splashscreen.hide",".getPicture(","device.uuid","connection.",


]
    
    allinfogain1 = [
                    ".ajax(",".show(",".extend(",".find(",".remove(",".indexOf(",".hide(",".name",".toLowerCase(",".each(",".attr(",".append(",".split(",".replace(","parseInt(",".preventDefault(","document.createElement(",".innerHTML",".html(","document.getElementById(",".addClass(",".value",".substring(","window.location",".floor(",".removeClass(",".substr(",".parent(","parseFloat(",".get(",
              
           ]
    allinfogain2 = [".ajax(",".extend(",".show(",".remove(",".name",".find(",".hide(",".indexOf(",".append(",".each(",".toLowerCase(",".replace(",".attr(",".split(",".html(","parseInt(",".floor(",".preventDefault(",".substr(",".value","window.location",".trigger(","document.getElementById(",".removeClass(",".parent(",".insertBefore(",".addClass(",".innerHTML",".getTime(",".get(",
              ]
    
    allchi1= [".ajax(",".extend(",".remove(",".show(",".find(",".indexOf(",".hide(",".name",".toLowerCase(",".each(",".attr(",".append(",".split(",".replace(","parseInt(",".innerHTML","document.createElement(",".preventDefault(","document.getElementById(",".html(",".substring(",".value",".addClass(",".floor(","window.location",".substr(",".removeClass(",".getTime(",".bind(",".get(",
                
           ]
    allchi2 = [ ".ajax(",".extend(",".remove(",".show(",".find(",".name",".hide(",".indexOf(",".append(",".each(",".toLowerCase(",".attr(",".split(",".replace(","parseInt(",".html(",".preventDefault(","document.getElementById(",".floor(",".value",".substr(",".innerHTML","window.location",".getTime(",".removeClass(",".trigger(","document.createElement(",".addClass(",".get(",".parent(",
         ]
    
    difference(set(infogain1),set(infogain2))
    difference(set(chi1),set(chi2))
    difference(set(allinfogain1),set(allinfogain2))
    difference(set(allchi1),set(allchi2))
