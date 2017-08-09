#!/usr/bin/python
# encoding: utf-8

'''
Created on Apr 2, 2016

@author: yanruibo
'''
import pyesprima
import json
import re
import simplejson
import yaml



class MultiTreeNode(object):
    '''
    多叉树
    data:存放的数据
    children: list类型
    '''

    def __init__(self, data, children):
        '''
        Constructor
        '''
        self.data = data
        self.children = children
        
def have_dict_recursive(dict_param):
    have_dict = False;
    for key in dict_param.keys():
        if isinstance(dict_param[key], (dict, list)):
            have_dict = True
    return have_dict
        
        
class MultiTree:

    def __init__(self, dict_init):
        
        def build_tree(dict_):
            #import pdb;pdb.set_trace();
            children_nodes = []
            parent_data = dict_.get('type', 'null')
            
            '''
            try:
                parent_data = dict_.get('type', 'null')
            except:
                import pdb; pdb.set_trace()
            '''
            
            if (have_dict_recursive(dict_) == False):
                #叶子节点,children_node为[]
                node = MultiTreeNode(parent_data, children_nodes)
                return node
                
            for key in dict_.keys():    
                if isinstance(dict_[key], list):
                    for one_dict in dict_[key]:
                        
                        child_node = build_tree(one_dict)
                        children_nodes.append(child_node)
                if isinstance(dict_[key], dict):
                    
                    child_node = build_tree(dict_[key])
                    children_nodes.append(child_node)      
                           
            node = MultiTreeNode(parent_data, children_nodes)
            return node
        
        self.root_node = build_tree(dict_init)
        self.path = ""
    
    def print_tree(self):
        
        def print_recursive(root):
            print 'parent'
            print root.data
            print 'children'
            for child_node in root.children:
                print child_node.data
            for child_node in root.children:
                print_recursive(child_node)
        
        print_recursive(self.root_node)
        
    '''
    根节点的深度为0
    '''
    def get_max_depth(self):
        
        def max_depth_recursive(node):
            
            if(len(node.children) == 0):
                return 0
            else:
                max_depths = []
                for child_node in node.children:
                    depth_of_child = max_depth_recursive(child_node)
                    max_depths.append(depth_of_child)
                # print max_depths
                return max(max_depths) + 1
        
        return max_depth_recursive(self.root_node)
    
    def get_max_width(self):
        
        def get_width_recursive(tree, level):
            if level == 1:
                return 1
            elif level > 1 :
                total_count = 0
                for child_node in tree.children:
                    total_count += get_width_recursive(child_node, level - 1)
                return total_count
        
        max_width = 0
        for i in range(1, self.get_max_depth() + 1):
            width = get_width_recursive(self.root_node, i)
            if(max_width < width):
                max_width = width
        return max_width
    
    '''
    叶节点的高度为0
    '''
    def get_height(self):
        
        def get_height_recursive(tree):
            if len(tree.children) == 0:
                return 0;
            else:
                heights = []
                for child_node in tree.children:
                    height = get_height_recursive(child_node)
                    heights.append(height)
                return max(heights) + 1
            
        return get_height_recursive(self.root_node)
    
    '''
    print all path from root to leaves
    '''
    def print_all_path(self):
        
        def print_all_path_recursive(node, path):
            
            path.append(node.data)
            if(len(node.children) == 0):
                path_str = ""
                for item in path:
                    path_str += item + " ";
                # print path_str
                self.path += path_str
            else:
                for child in node.children:
                    print_all_path_recursive(child, list(path))
                    
        print_all_path_recursive(node=self.root_node, path=[])
        
    def get_path(self):
        return self.path.rstrip()
    
    def clear_path(self):
        self.path = ""
    
    def get_pairs(self):
        pass
    
def generate_n_grams(str, length=3):
    
    grams = []
    words = str.split(" ")
    for i in range(len(words) - length + 1):
        gram = ""
        for j in range(length):
            gram += words[i + j] + " "
        grams.append(gram.rstrip())
    return grams
    
def generateTree():
    
    f = open("./js/normal/app.id_0ce12cb6a87f4850bff98c90a0c793e6.js", "r");
    js_content = f.read()
    f.close()
    js_dict = pyesprima.parse(js_content)
    # print json_str
    js_str = str(js_dict)
    py_dict = eval(js_str)
    # import pdb; pdb.set_trace();
    tree = MultiTree(py_dict)
    print tree.get_max_depth()
    print tree.get_max_width()
    tree.print_all_path()
    path_str = tree.get_path()
    #print path_str
    #print generate_n_grams(path_str)
    
    
def generateTree2():
    
    # f = open("","r");
    # js_content = f.read()
    # f.close()
    
    # js_dict =  pyesprima.parse(js_content)
    # print json_str
    # js_str = str(js_dict)
    import os
    import time
    startTimeStamp = time.time()
    endTimeStamp = time.time()
    total_time = endTimeStamp - startTimeStamp
    print total_time
    # print json_str
    json_str = os.popen('node analyze.js test.js').read()
    #json_str = os.popen('node analyze.js ./js/normal/app.id_0ce12cb6a87f4850bff98c90a0c793e6.js').read()
    #json_str = os.popen('node analyze.js ./js/vulnerable/com.a157290833501e1d09e0b595a.a93100070a.js').read()
    
    # print type(json_str)
    py_dict = json.loads(json_str)
    # print py_dict
    # print py_dict
    # import pdb; pdb.set_trace();
    tree = MultiTree(py_dict)
    print tree.get_max_depth()
    print tree.get_max_width()
    tree.print_all_path()
    path_str = tree.get_path()
    print path_str
    print generate_n_grams(path_str)
    
    
    
    
if __name__ == '__main__':

    generateTree2()
    
    
