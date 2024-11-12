#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

with open(os.path.dirname(os.path.abspath(__file__)) + "/input/my-input.txt", "r") as f:
#with open(os.path.dirname(os.path.abspath(__file__)) + "/input/example.txt", "r") as f:
    df = f.readlines()

for x in range(len(df)):
    df[x] = df[x].strip()

op = {'(':')', '[':']', '{':'}', '<':'>'}


def incomplete(y):
    s = []
    d = df[y]
    for a in range(len(d)):
        c = d[a]
        if c == '(' or c == '[' or c == '{' or c == '<':
            s.append(c)
        elif c == '>' or c == '}' or c == ']' or c == ')':
            if a == 0 or len(s) == 0:
                return True
            if op[s[len(s)-1]] != c:
                return True
            s.pop()
    return False

def missing(y):
    s = []
    d = df[y]
    for a in range(len(d)):
        c = d[a]
        if c == '(' or c == '[' or c == '{' or c == '<':
            s.append(c)
        elif c == '>' or c == '}' or c == ']' or c == ')':
            s.pop()
    r = ""
    for a in range(len(s)):
        q = op[s.pop()]
        r = r + q
    return r

ts = []
for y in range(len(df)):
    ic = incomplete(y)
    if not ic:
        h = missing(y)
        s = 0
        for a in range(len(h)):
            s = (5 * s)
            if h[a] == ')':
                s = s + 1
            elif h[a] == ']':
                s = s + 2
            elif h[a] == '}':
                s = s + 3
            elif h[a] == '>':
                s = s + 4
        ts.append(s)

print("The result:",sorted(ts, reverse=False)[len(ts) // 2])

