#!/usr/bin/python
# encoding: utf-8

'''
Created on Dec 18, 2015

@author: yanruibo
'''


vulnerable_js_data_filedir = '/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-js.dat'
vulnerable_jQuery_data_filedir = '/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-jQuery.dat'
vulnerable_phonegap_data_filedir = '/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-phonegap.dat'
vulnerable_all_data_filedir = '/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-all.dat'


vulnerable_js_data_filedir_remained = '/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-remained-js.dat'
vulnerable_jQuery_data_filedir_remained = '/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-remained-jQuery.dat'
vulnerable_phonegap_data_filedir_remained = '/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-remained-phonegap.dat'
vulnerable_all_data_filedir_remained = '/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-remained-all.dat'


normal_js_data_filedir = '/home/yanruibo/code-injection/process-info/normal/normal-js.dat'
normal_jQuery_data_filedir = '/home/yanruibo/code-injection/process-info/normal/normal-jQuery.dat'
normal_phonegap_data_filedir = '/home/yanruibo/code-injection/process-info/normal/normal-phonegap.dat'
normal_all_data_filedir = '/home/yanruibo/code-injection/process-info/normal/normal-all.dat'


normal_js_data_filedir_remained = '/home/yanruibo/code-injection/process-info/normal/normal-remained-js.dat'
normal_jQuery_data_filedir_remained = '/home/yanruibo/code-injection/process-info/normal/normal-remained-jQuery.dat'
normal_phonegap_data_filedir_remained = '/home/yanruibo/code-injection/process-info/normal/normal-remained-phonegap.dat'
normal_all_data_filedir_remained = '/home/yanruibo/code-injection/process-info/normal/normal-remained-all.dat'


#functions original
functions_original = [
                    "cordova.plugins.barcodeScanner.", "sms.send(",
                    "nfc.", "cordova.file.",
                    "connectivity.", "bluetoothSerial.",
                    "navigator.contacts.", "batterystatus batterycritical batterylow",
          
                     "document.write(", "document.writeln(",
                     "innerHTML(", "outerHTML(",
                     "html(", "append(",
                     "prepend(", "before(",
                     "after(", "replaceAll(",
                     "replaceWith("
                      
                     ]

#infogain
functions_infogain = [
                    "cordova.plugins.barcodeScanner.", "sms.send(",
                    "nfc.", "cordova.file.",
                    "connectivity.", "bluetoothSerial.",
                    "navigator.contacts.", "batterystatus batterycritical batterylow",
                      
                    "document.write(", "document.writeln(",
                    "innerHTML(", "outerHTML(",
                    "html(", "append(",
                     "prepend(", "before(",
                     "after(", "replaceAll(",
                     "replaceWith(",
                      
".indexOf(",".toLowerCase(",".name","document.createElement(",".innerHTML",".split(","document.getElementById(","parseInt(",".replace(",".substring(",
".ajax(",".show(",".remove(",".extend(",".find(",".hide(",".each(",".attr(",".append(",".preventDefault(",

".abort",".download",".upload","connection.","navigator.geolocation.getCurrentPosition","device.platform","splashscreen.hide","navigator.notification.alert","device.uuid",".getPicture(",


                      
                      
                     ]


 #chi
functions_chi = [
                     "cordova.plugins.barcodeScanner.", "sms.send(",
                     "nfc.", "cordova.file.",
                     "connectivity.", "bluetoothSerial.",
                     "navigator.contacts.", "batterystatus batterycritical batterylow",
                      
                     "document.write(", "document.writeln(",
                     "innerHTML(", "outerHTML(",
                     "html(", "append(",
                     "prepend(", "before(",
                     "after(", "replaceAll(",
                     "replaceWith(",
                     
".indexOf(",".toLowerCase(",".name","document.createElement(",".innerHTML","parseInt(",".split(","document.getElementById(",".replace(",".substring(",

".ajax(",".remove(",".extend(",".show(",".find(",".hide(",".each(",".attr(",".append(",".preventDefault(",

".abort",".download","connection.","navigator.geolocation.getCurrentPosition","device.platform",".upload","navigator.notification.alert","splashscreen.hide","device.uuid",".getPicture(",




                     ]

function_all_infogain = [
                "cordova.plugins.barcodeScanner.", "sms.send(",
                    "nfc.", "cordova.file.",
                    "connectivity.", "bluetoothSerial.",
                    "navigator.contacts.", "batterystatus batterycritical batterylow",
          
                     "document.write(", "document.writeln(",
                     "innerHTML(", "outerHTML(",
                     "html(", "append(",
                     "prepend(", "before(",
                     "after(", "replaceAll(",
                     "replaceWith(",
                     
  
".ajax(",".indexOf(",".show(",".remove(",".extend(",".toLowerCase(",".find(",".hide(",".name",".each(",".attr(",".append(","document.createElement(",".innerHTML",".split(","document.getElementById(","parseInt(",".replace(",".preventDefault(",".substring(",".substr(",".bind(",".floor(",".html(","window.location",".value",".getTime(","parseFloat(",".insertBefore(",".addClass(",
                   
                  
            
                
                ]


function_all_chi = [
                "cordova.plugins.barcodeScanner.", "sms.send(",
                    "nfc.", "cordova.file.",
                    "connectivity.", "bluetoothSerial.",
                    "navigator.contacts.", "batterystatus batterycritical batterylow",
          
                     "document.write(", "document.writeln(",
                     "innerHTML(", "outerHTML(",
                     "html(", "append(",
                     "prepend(", "before(",
                     "after(", "replaceAll(",
                     "replaceWith(",
                     
                     
".ajax(",".indexOf(",".remove(",".extend(",".show(",".find(",".toLowerCase(",".hide(",".name",".each(",".attr(",".append(","document.createElement(",".innerHTML","parseInt(",".split(","document.getElementById(",".replace(",".substring(",".preventDefault(",".bind(",".substr(",".getTime(",".html(",".value",".floor(",".ready(","window.location","parseFloat(",".css(",
             
                
                
                
                ]