#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import numpy as np

df = np.loadtxt(os.path.dirname(os.path.abspath(__file__)) + "/input/my-input.txt")
#df = np.loadtxt(os.path.dirname(os.path.abspath(__file__)) + "/input/example.txt")
p = 0
inc = 0
for x in range(len(df)-2):
    e1 = (int)(df[x])
    e2 = (int)(df[x+1])
    e3 = (int)(df[x+2])
    y = e1 + e2 + e3
    if (y > p and p > 0):
        #print("I")
        inc = inc + 1
    p = y
print("The result:", inc)
