#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

with open(os.path.dirname(os.path.abspath(__file__)) + "/input/my-input.txt", "r") as f:
#with open(os.path.dirname(os.path.abspath(__file__)) + "/input/example.txt", "r") as f:
    df = f.readlines()

ls = []
tmp = []

for x in range(len(df)):
    d = df[x].strip()
    ls.append(d)
    tmp.append(d)

p = 0
while len(tmp) > 1 and p < len(ls[0]):
    new0 = []
    new1 = []
    for x in range(len(tmp)):
        s = tmp[x]
        if s[p] == '1':
            new1.append(s)
        elif s[p] == '0':
            new0.append(s)

    if len(new1) >= len(new0):
        tmp = new1
    else:
        tmp = new0

    p = p + 1

tmp = tmp[0]
#print("tmp:",tmp)

e = 1
t1 = 0
for x in range(len(tmp)):
    y = len(tmp) - x - 1
    if tmp[y] == '1':
        t1 = t1 + e
    e = e * 2

#print("t1:",t1)



tmp = ls
p = 0
while len(tmp) > 1 and p < len(ls[0]):
    new0 = []
    new1 = []
    for x in range(len(tmp)):
        s = tmp[x]
        if s[p] == '1':
            new1.append(s)
        elif s[p] == '0':
            new0.append(s)

    if len(new0) <= len(new1):
        tmp = new0
    else:
        tmp = new1

    p = p + 1

tmp = tmp[0]
#print("tmp:",tmp)

e = 1
t2 = 0
for x in range(len(tmp)):
    y = len(tmp) - x - 1
    if tmp[y] == '1':
        t2 = t2 + e
    e = e * 2

#print("t2:",t2)
print("The result:", (t1*t2))



