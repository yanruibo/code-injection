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


#functions original  14 8 11
functions_original = [
                    "cordova.plugins.barcodeScanner.", "sms.send(",
                    "nfc.", "cordova.file.",
                    "connectivity.", "bluetoothSerial.",
                    "navigator.contacts.", "batterystatus batterycritical batterylow",
          
                     
                     "document.write(", "document.writeln(",
                     ".innerHTML", ".outerHTML",
                     ".html(", ".append(",
                     ".prepend(", ".before(",
                     ".after(", ".replaceAll(",
                     ".replaceWith("
                      
                     ]

#infogain
functions_infogain = [
                    "cordova.plugins.barcodeScanner.", "sms.send(",
                    "nfc.", "cordova.file.",
                    "connectivity.", "bluetoothSerial.",
                    "navigator.contacts.", "batterystatus batterycritical batterylow",
                      
                    "document.write(", "document.writeln(",
                     ".innerHTML", ".outerHTML",
                     ".html(", ".append(",
                     ".prepend(", ".before(",
                     ".after(", ".replaceAll(",
                     ".replaceWith(",
                      

".name",".indexOf(",".toLowerCase(",".replace(",".split(","parseInt(",".floor(",".substr(",".value","window.location",

".ajax(",".extend(",".show(",".remove(",".find(",".hide(",".append(",".each(",".attr(",".html(",

"navigator.geolocation.getCurrentPosition","device.platform",".download",".upload","splashscreen.hide",".abort","navigator.notification.alert",".getPicture(","device.uuid","navigator.geolocation.watchPosition",


                      
                      
                     ]


 #chi
functions_chi = [
                     "cordova.plugins.barcodeScanner.", "sms.send(",
                     "nfc.", "cordova.file.",
                     "connectivity.", "bluetoothSerial.",
                     "navigator.contacts.", "batterystatus batterycritical batterylow",
                      
                     "document.write(", "document.writeln(",
                     ".innerHTML", ".outerHTML",
                     ".html(", ".append(",
                     ".prepend(", ".before(",
                     ".after(", ".replaceAll(",
                     ".replaceWith(",
                     
                     
".name",".indexOf(",".toLowerCase(",".split(",".replace(","parseInt(","document.getElementById(",".floor(",".value",".substr(",

".ajax(",".extend(",".remove(",".show(",".find(",".hide(",".append(",".each(",".attr(",".html(",

"navigator.geolocation.getCurrentPosition","device.platform",".download",".upload",".abort","navigator.notification.alert","splashscreen.hide",".getPicture(","device.uuid","connection.",



                     ]

function_all_infogain = [
                "cordova.plugins.barcodeScanner.", "sms.send(",
                    "nfc.", "cordova.file.",
                    "connectivity.", "bluetoothSerial.",
                    "navigator.contacts.", "batterystatus batterycritical batterylow",
          
                     "document.write(", "document.writeln(",
                     ".innerHTML", ".outerHTML",
                     ".html(", ".append(",
                     ".prepend(", ".before(",
                     ".after(", ".replaceAll(",
                     ".replaceWith(",
                     
  
".ajax(",".extend(",".show(",".remove(",".name",".find(",".hide(",".indexOf(",".append(",".each(",".toLowerCase(",".replace(",".attr(",".split(",".html(","parseInt(",".floor(",".preventDefault(",".substr(",".value","window.location",".trigger(","document.getElementById(",".removeClass(",".parent(",".insertBefore(",".addClass(",".innerHTML",".getTime(",".get(",
              
            
                
                ]


function_all_chi = [
                "cordova.plugins.barcodeScanner.", "sms.send(",
                    "nfc.", "cordova.file.",
                    "connectivity.", "bluetoothSerial.",
                    "navigator.contacts.", "batterystatus batterycritical batterylow",
          
                    "document.write(", "document.writeln(",
                     ".innerHTML", ".outerHTML",
                     ".html(", ".append(",
                     ".prepend(", ".before(",
                     ".after(", ".replaceAll(",
                     ".replaceWith(",
                     
                     
 ".ajax(",".extend(",".remove(",".show(",".find(",".name",".hide(",".indexOf(",".append(",".each(",".toLowerCase(",".attr(",".split(",".replace(","parseInt(",".html(",".preventDefault(","document.getElementById(",".floor(",".value",".substr(",".innerHTML","window.location",".getTime(",".removeClass(",".trigger(","document.createElement(",".addClass(",".get(",".parent(",
         
                
                
                ]