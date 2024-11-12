#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

with open(os.path.dirname(os.path.abspath(__file__)) + "/input/my-input.txt", "r") as f:
#with open(os.path.dirname(os.path.abspath(__file__)) + "/input/example.txt", "r") as f:
    df = f.readlines()
for x in range(len(df)):
    df[x] = df[x].strip().replace("  "," ")

n = df[0].split(",")
nn = [0] * len(n)
for y in range(len(nn)):
    nn[y] = (int)(n[y])
n = nn
nn = None

m = []
tmp = []

for x in range(len(df) - 2):
    y = x + 2
    s = df[y]
    if (len(s) > 2):
        s = s.split(" ")
        ss = [0] * len(s)
        for z in range(len(ss)):
            ss[z] = (int)(s[z])
        s = ss
        ss = None
        tmp.append(s)
    else:
        m.append(tmp)
        tmp = []

m.append(tmp)

marks = [None] * len(m)
for x in range(len(m)):
    marks[x] = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]

# talált sor,oszlop,mátrix
tn = -1
tm = -1
for x in range(len(n)):
    
    for y in range(len(m)):

        for a in range(5):
            for b in range(5):
                
                if m[y][a][b] == n[x]:
                    marks[y][a][b] = 1

    for y in range(len(marks)):
        for a in range(5):
            stl = True
            otl = True
            for b in range(5):
                if marks[y][a][b] == 0:
                    stl = False
                if marks[y][b][a] == 0:
                    otl = False
            if stl or otl:
                tm = y
                tn = n[x]
        if tn > -1:
            break
    if tn > -1:
        break

sm = 0
for x in range(5):
    for y in range(5):
        if marks[tm][x][y] == 0:
            sm = sm + m[tm][x][y]

print("The result:", (sm * tn) )
