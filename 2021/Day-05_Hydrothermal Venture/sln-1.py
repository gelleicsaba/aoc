#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

with open(os.path.dirname(os.path.abspath(__file__)) + "/input/my-input.txt", "r") as f:
#with open(os.path.dirname(os.path.abspath(__file__)) + "/input/example.txt", "r") as f:
    df = f.readlines()
for x in range(len(df)):
    df[x] = df[x].strip().replace(" -> ",",")

m = []
mx = 0
bs = 8
for x in range(len(df)):
    s = df[x].split(",")
    d = [0] * len(s)
    for y in range(len(d)):
        d[y] = (int)(s[y])
        if (d[y] > mx):
            mx = ((d[y] // bs) * bs) + bs
    m.append(d)

t = [None] * mx
for x in range(mx):
    t[x] = [0] * mx

for x in range(len(df)):
    y1 = m[x][0]
    x1 = m[x][1]
    y2 = m[x][2]
    x2 = m[x][3]
    pm = 0
    px = 0
    if x1 == x2:
        if y1 <= y2:
            pm = y1
            px = y2
        else:
            pm = y2
            px = y1
        for y in range(pm,px+1):
            t[y][x1] = t[y][x1] + 1
    if y1 == y2:
        if x1 <= x2:
            pm = x1
            px = x2
        else:
            pm = x2
            px = x1
        for y in range(pm,px+1):
            t[y1][y] = t[y1][y] + 1

sm = 0
for a in range(mx):
    for b in range(mx):
        if t[a][b] > 1:
            sm = sm + 1

print("The result:",sm)









