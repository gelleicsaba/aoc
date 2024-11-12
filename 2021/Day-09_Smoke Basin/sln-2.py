#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

with open(os.path.dirname(os.path.abspath(__file__)) + "/input/my-input.txt", "r") as f:
#with open(os.path.dirname(os.path.abspath(__file__)) + "/input/example.txt", "r") as f:
    df = f.readlines()

for x in range(len(df)):
    df[x] = df[x].strip()

m = [None] * len(df)
mc = [None] * len(df)
ly = len(df)
lx = len(df[0])

for y in range(ly):
    mm = [0] * lx
    for x in range(lx):
        mm[x] = int(df[y][x])
    m[y] = mm
    mc[y] = [0] * len(df[y])

idc = 1

def basin(y,x):
    if (x < 0 or y < 0 or x >= lx or y >= ly or m[y][x] == 9 or mc[y][x] > 0):
        return
    mc[y][x] = idc
    basin(y,x+1)
    basin(y,x-1)
    basin(y+1,x)
    basin(y-1,x)
    return

"""
def rajz(k):
    for y in range(ly):
        s = "";
        for x in range(lx):
            q = k[y][x]
            if q < 10:
                s = s + '00'
            elif q < 100:
                s = s + '0'
            s = s + str(q) + " "
        print(s)
"""

for y in range(ly):
    for x in range(lx):
        if (m[y][x] < 9 and mc[y][x] == 0):
            basin(y,x)
            idc = idc + 1

#rajz(mc)
idc = idc - 1
i = 0
s = [0] * idc
for a in range(idc):
    n = 0
    for y in range(ly):
        for x in range(lx):
            if (mc[y][x] == a+1):
                n = n + 1
    s[i] = n
    i = i + 1

s = sorted(s, reverse=True)
print("The result:", (s[0] * s[1] * s[2]))







