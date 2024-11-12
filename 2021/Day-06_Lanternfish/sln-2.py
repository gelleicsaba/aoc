#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os

with open(os.path.dirname(os.path.abspath(__file__)) + "/input/my-input.txt", "r") as f:
#with open(os.path.dirname(os.path.abspath(__file__)) + "/input/example.txt", "r") as f:
    df = f.readlines()

df = df[0].strip().split(',')
m = [0] * 9
for x in range(len(df)):
    y = (int)(df[x])
    m[y] = m[y] + 1
cn = len(df)
nf = 0
for x in range(256):
    # shift
    for y in range(8):
        m[y] = m[y + 1]
    m[8] = 0
    # from 0 add 6 & 8
    if nf > 0:
        m[6] = m[6] + nf
        m[8] = m[8] + nf
        cn = cn + nf
    nf = m[0]
print("The result:", cn)
