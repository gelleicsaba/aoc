with open('input.txt', 'r') as file:
    textContent = file.read()
m = []
for row in textContent.split("\n"):
    m.append(list(row))
splitNum = 0
def scan(r):
    global splitNum
    for t in range(len(m[0])):
        if m[r-1][t] == 'S':
            m[r][t] = '|'
        elif m[r-1][t] == '|' and m[r][t] == '.':
            m[r][t] = '|'
        elif m[r-1][t] == '|' and m[r][t] == '^':
            m[r][t-1] = '|'
            m[r][t+1] = '|'
            splitNum = splitNum + 1
for y in range(len(m)-2):
    scan(y+1)
print(splitNum)
