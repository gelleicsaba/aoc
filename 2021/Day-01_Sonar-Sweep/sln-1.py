#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import numpy as np
df = np.loadtxt(os.path.dirname(os.path.abspath(__file__)) + "/input/my-input.txt")
#df = np.loadtxt(os.path.dirname(os.path.abspath(__file__)) + "/input/example.txt")
p = 0
inc = 0
for x in range(len(df)):
    e = (int)(df[x])
    if (e > p and p > 0):
        inc = inc + 1
    p = e
print("The result:", inc)
