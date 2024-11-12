#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

with open(os.path.dirname(os.path.abspath(__file__)) + "/input/my-input.txt", "r") as f:
#with open(os.path.dirname(os.path.abspath(__file__)) + "/input/example.txt", "r") as f:
    df = f.readlines()

for x in range(len(df)):
    df[x] = df[x].strip()

m = [None] * len(df)
ly = len(df)
lx = len(df[0])

for y in range(ly):
    mm = [0] * lx
    for x in range(lx):
        mm[x] = int(df[y][x])
    m[y] = mm

def isGodor(y,x):
    # east,west,south,north
    d = [10] * 4
    if y > 0:
        d[0] = m[y - 1][x]
    if x > 0:
        d[1] = m[y][x - 1]
    if y < ly -1:
        d[2] = m[y + 1][x]
    if x < lx - 1:
        d[3] = m[y][x + 1]
    for a in range(4):
        if d[a] <= m[y][x]:
            return False
    return True

sm = 0
for y in range(ly):
    for x in range(lx):
        if isGodor(y, x):
            sm = sm + (m[y][x] + 1)

print("The result:",sm)

