FROM = 0
TO = 1
DELETED = -1
with open('input.txt', 'r') as file:
    textContent = file.read()
# with open('exampleInput.txt', 'r') as file:
#     textContent = file.read()
freshIngredients = []
for row in textContent.split("\n"):
    if row.strip() == "":
        break
    rowSplitted = row.split("-")

    if (rowSplitted[0] > rowSplitted[1]):
        tmp = rowSplitted[0]
        rowSplitted[0] = rowSplitted[1]
        rowSplitted[1] = tmp

    ingredientItem = [ int(rowSplitted[0]), int(rowSplitted[1]) ]
    freshIngredients.append(ingredientItem)
print('Optimize intervals...')
for x in range(len(freshIngredients)):
    for y in range(len(freshIngredients)):
        if x == y:
            continue
        f1 = freshIngredients[x]
        f2 = freshIngredients[y]
        if f1[FROM] == f2[FROM] and f1[TO] == f2[TO]:
            f2[FROM] = DELETED
            f2[TO] = DELETED
while True:
    for f1 in freshIngredients:
        if (f1[FROM] == DELETED):
            continue
        for f2 in freshIngredients:
            if (f2 == f1) or (f2[FROM] == DELETED):
                continue
            if (f2[FROM] >= f1[FROM]) and (f2[TO] <= f1[TO]):
                f2[FROM] = DELETED
                f2[TO] = DELETED
            elif (f2[FROM] >= f1[FROM]) and (f2[FROM] <= f1[TO]) and (f2[TO] >= f1[TO]):
                f1[TO] = f2[TO]
                f2[FROM] = DELETED
                f2[TO] = DELETED
    hasErrors = False
    for f1 in freshIngredients:
        for f2 in freshIngredients:
            if f2 == f1 or (f2[FROM] == DELETED) or (f1[FROM] == DELETED):
                continue
            if (f2[FROM] > f1[FROM]) and (f2[FROM] < f1[TO]):
                print('interval error 1: ', f2,' <==> ', f1)
                hasErrors = True
                break
            if (f2[FROM] >= f1[FROM]) and (f2[TO] <= f1[TO]):
                print('interval error 3: ', f2)
                hasErrors = True
    if not hasErrors:
        break
    print('Need to continue optimization ->')
print('Optimize intervals.Done. All is OK.')
clearedArray = []
for f in freshIngredients:
    if f[FROM] != DELETED:
        clearedArray.append(f)
freshIngredients = clearedArray
result = 0
for f in freshIngredients:
    if f[FROM] != DELETED:
        result = result + ((f[TO] - f[FROM]) + 1)
print(result)
