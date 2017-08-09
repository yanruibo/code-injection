#!/usr/bin/python
# encoding: utf-8

'''
Created on Dec 18, 2015

@author: yanruibo
'''
def infogainlist2arff():
    infogain = ["indexOf(",".name","toLowerCase(","split","replace(","setTimeout","parseInt(","document.createElement(","document.getElementById(",".value",
                 "append(","resize(","dblclick(","prependTo(","each(","focus(","toggleClass(","after(","mouseout(","one(",
                 "media.pause","CameraPopoverHandle","navigator.accelerometer.getCurrentAcceleration","navigator.globalization.dateToString","console.dirxml","capture.captureAudio","console.error","cordova.file.","console.dir","media.play",
                  ]
    chi = [              "indexOf(","window.onerror","window.prompt(","window.focus","charAt",".value","window.location.reload(","window.alert(","split",".name",
                  "append(","find(","fadeOut(","height(","width(","one(","innerHTML","ready(","prependTo(","resize(",
                  "media.pause","batterycritical","media.getDuration","navigator.geolocation.clearWatch","navigator.geolocation.getCurrentPosition","media.play","navigator.accelerometer.clearWatch","media.stop","navigator.globalization.dateToString","CameraPopoverHandle",
                  ]
    arff = ''
    for item in infogain:
        arff += "@attribute "+item+" {0,1}\n"
    print arff

def chilist2arff():
    
    chi = [              "indexOf(","window.onerror","window.prompt(","window.focus","charAt",".value","window.location.reload(","window.alert(","split",".name",
                  "append(","find(","fadeOut(","height(","width(","one(","innerHTML","ready(","prependTo(","resize(",
                  "media.pause","batterycritical","media.getDuration","navigator.geolocation.clearWatch","navigator.geolocation.getCurrentPosition","media.play","navigator.accelerometer.clearWatch","media.stop","navigator.globalization.dateToString","CameraPopoverHandle",
                  ]
    arff = ''
    for item in chi:
        arff += "@attribute "+item+" {0,1}\n"
    print arff
    
if __name__ == '__main__':
    chilist2arff()
