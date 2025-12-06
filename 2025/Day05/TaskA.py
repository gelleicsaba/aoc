with open('input.txt', 'r') as file:
    textContent = file.read()
# with open('exampleInput.txt', 'r') as file:
#     textContent = file.read()
freshIngredients = []
ingredients = []
ingredientRead = False
for row in textContent.split("\n"):
    if row.strip() == "":
        if not ingredientRead:
            ingredientRead = True
        continue
    if row.strip() == "":
        continue
    if not ingredientRead:
        rowSplitted = row.split("-")
        ingredientItem = [ int(rowSplitted[0]), int(rowSplitted[1]) ]
        freshIngredients.append(ingredientItem)
    else:
        ingredients.append(int(row))
result = 0
for ingredient in ingredients:
    for freshIngredient in freshIngredients:
        if ingredient >= freshIngredient[0] and ingredient <= freshIngredient[1]:
            result = result + 1
            break
print(result)
