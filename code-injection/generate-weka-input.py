#!/usr/bin/python
# encoding: utf-8

'''
Created on Dec 16, 2015

@author: yanruibo
'''
#422 1344
def generate_arff(vul_train_num,normal_train_num,
                        vul_test_num,normal_test_num,
                        vulnerable_data_filedir,normal_data_filedir,
                        train_output,test_output,arff_head):
    

    fr = open(normal_data_filedir,'r')
    normal_data_list = fr.readlines()
    fr.close()
    
    fr = open(vulnerable_data_filedir,'r')
    vulnerable_data_list = fr.readlines()
    fr.close()
    
    #copy header
    arff_head_permission = '/home/yanruibo/code-injection/weka-input/arff-head-set-permission'
    fr = open(arff_head_permission,'r')
    arff_head_permission_content = fr.read()
    fr.close()
    
    
    
    fr = open(arff_head,'r')
    arff_head_content = fr.read()
    fr.close()
    
    fw = open(train_output,'w')
    fw.write(arff_head_permission_content)
    fw.write(arff_head_content)
    
    fw.write("@attribute class {0,1}\n\n@data\n")
    
    for i in range(vul_train_num):
        fw.write(vulnerable_data_list[i])
    fw.write("\n\n\n\n\n")
    for i in range(normal_train_num):
        fw.write(normal_data_list[i])
    
    fw.write("\n\n\n\n\n")
    fw.close()
    
    fw = open(test_output,'w')
    fw.write(arff_head_permission_content)
    fw.write(arff_head_content)
    
    fw.write("@attribute class {0,1}\n\n@data\n")
    
    for i in range(vul_test_num):
        fw.write(vulnerable_data_list[i+vul_train_num])
    fw.write("\n\n\n\n\n")
    for i in range(normal_test_num):
        fw.write(normal_data_list[i+normal_train_num])
    
    fw.write("\n\n\n\n\n")
    fw.close()
    
#422 1344
if __name__ == '__main__':
    
    method = 'allchi'
    
    vulnerable_data_filedir = '/home/yanruibo/code-injection/process-info/vulnerable/vulnerable.dat'
    normal_data_filedir = '/home/yanruibo/code-injection/process-info/normal/normal.dat'
    train_output = '/home/yanruibo/code-injection/weka-input/train.arff'
    test_output = '/home/yanruibo/code-injection/weka-input/test.arff'
    arff_head = './js-functions/weka-header-original'
    
    if (method != ''):
        
        vulnerable_data_filedir = '/home/yanruibo/code-injection/process-info/vulnerable/vulnerable-'+method+'.dat'
        normal_data_filedir = '/home/yanruibo/code-injection/process-info/normal/normal-'+method+'.dat'
        train_output = '/home/yanruibo/code-injection/weka-input/train-'+method+'.arff'
        test_output = '/home/yanruibo/code-injection/weka-input/test-'+method+'.arff'
        arff_head = './js-functions/weka-header-'+method
        
    vul_train_num = 211
    normal_train_num = 672
    vul_test_num = 211
    normal_test_num = 672
    
    generate_arff(vul_train_num, normal_train_num, vul_test_num, normal_test_num,
                vulnerable_data_filedir, normal_data_filedir, train_output, test_output,arff_head)
    print 'done'