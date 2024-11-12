#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

with open(os.path.dirname(os.path.abspath(__file__)) + "/input/my-input.txt", "r") as f:
#with open(os.path.dirname(os.path.abspath(__file__)) + "/input/example.txt", "r") as f:
    df = f.readlines()

for x in range(len(df)):
    df[x] = df[x].strip()

op = {'(':')', '[':']', '{':'}', '<':'>'}

def err(y):
    s = []
    d = df[y]
    for a in range(len(d)):
        c = d[a]
        if c == '(' or c == '[' or c == '{' or c == '<':
            s.append(c)
        elif c == '>' or c == '}' or c == ']' or c == ')':
            if a == 0 or len(s) == 0:
                return c
            if op[s[len(s)-1]] != c:
                return c
            s.pop()
    return None


p = 0
for y in range(len(df)):
    h = err(y)
    if (h != None):
        if (h == ')'):
            p = p + 3
        elif (h == ']'):
            p = p + 57
        elif (h == '}'):
            p = p + 1197
        elif (h == '>'):
            p = p + 25137
    
print("The result:",p)
