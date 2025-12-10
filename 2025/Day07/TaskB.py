# with open('exampleInput.txt', 'r') as file:
#     textContent = file.read()
with open('input.txt', 'r') as file:
    textContent = file.read()
m = []
stat = []
for row in textContent.split("\n"):
    if row.strip() != '':
        m.append(list(row))
        stat.append([0]*len(row))
for x in range(len(stat[0])):
    stat[len(m)-1][x] = 1
for _y in range(len(m)):
    y = len(m) - _y -1
    for x in range(len(m[0])):
        if m[y][x] == '^':
            l = 0
            r = 0
            n = y
            while n < len(m):
                if (l == 0) and (stat[n][x-1] != 0):
                    l = stat[n][x-1]
                if (r == 0) and stat[n][x+1] != 0:
                    r = stat[n][x+1]
                if (l > 0) and (r > 0):
                    break
                n += 1
            stat[y][x] = l + r
            stat[0][0] = stat[y][x]
print(stat[0][0])
