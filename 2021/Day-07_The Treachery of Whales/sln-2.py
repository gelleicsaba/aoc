#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

with open(os.path.dirname(os.path.abspath(__file__)) + "/input/my-input.txt", "r") as f:
#with open(os.path.dirname(os.path.abspath(__file__)) + "/input/example.txt", "r") as f:
    df = f.readlines()
df = df[0].strip().split(',')
m = [0] * len(df)
for x in range(len(df)):
    m[x] = (int)(df[x])

mn = 9999999999
mx = 0
for x in range(len(m)):
    if m[x] < mn:
        mn = m[x]
    if m[x] > mx:
        mx = m[x]
s = [0] * (mx+1)
for x in range(mn,mx+1):
    sm = 0
    for y in range(len(m)):
        n = abs(m[y] - x)
        sm = sm + ( (n * (n+1)) // 2)
    s[x] = sm
rs = 9999999999
for x in range(mn,mx+1):
    if s[x] < rs:
        rs = s[x]
print("The result:",rs)
