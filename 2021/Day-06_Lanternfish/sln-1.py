#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

with open(os.path.dirname(os.path.abspath(__file__)) + "/input/my-input.txt", "r") as f:
#with open(os.path.dirname(os.path.abspath(__file__)) + "/input/example.txt", "r") as f:
    df = f.readlines()
df = df[0].strip().split(',')
m = []
for x in range(len(df)):
    q = (int)(df[x])
    m.append(q)
ln = 80
for x in range(ln):
    cf = 0
    for y in range(len(m)):
        if m[y] > 1:
            m[y] = m[y] - 1
        elif m[y] == 1:
            m[y] = 0
            cf = cf + 1
    if (x == ln-1):
        break
    for q in range(len(m)):
        if m[q] == 0:
            m[q] = 7
    for q in range(cf):
        m.append(9)
print("The result:",len(m))

