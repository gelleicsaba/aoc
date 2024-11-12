#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

#with open(os.path.dirname(os.path.abspath(__file__)) + "/input/my-input.txt", "r") as f:
with open(os.path.dirname(os.path.abspath(__file__)) + "/input/example.txt", "r") as f:
    df = f.readlines()

m = [None] * len(df)
for x in range(len(df)):
    tmp = df[x].strip().split('-')
    m[x] = tmp

print(m)

p = {}
for x in range(len(m)):
    tmp = m[x]
    p[(tmp[0])] = []
    p[(tmp[1])] = []

#n = 0
#for k in p.keys():
#    n = n + 1

for x in range(len(m)):
    tmp = m[x]    
    p[(tmp[0])].append(tmp[1])
    if tmp[0] != 'start' and tmp[1] != 'end':
        p[(tmp[1])].append(tmp[0])

print(p)


"""
def post(y):
    print()
    for k in p.keys()
"""    









