with open('input.txt', 'r') as file:
    textContent = file.read()
m = []
for row in textContent.split("\n"):
    m.append(list(row))
splitNum = 0
for r in range(len(m)-2):
    for t in range(len(m[0])):
        if m[r][t] == 'S':
            m[r+1][t] = '|'
        elif m[r][t] == '|' and m[r+1][t] == '.':
            m[r+1][t] = '|'
        elif m[r][t] == '|' and m[r+1][t] == '^':
            m[r+1][t-1] = '|'
            m[r+1][t+1] = '|'
            splitNum = splitNum + 1
print(splitNum)
