
import sys
if len(sys.argv) != 2:
    print("\nRemove .gitignore duplicates")
    print("")
    print("Usage:")
    print("  python3 rdupgi <.gitignore path>\n")
    sys,exit(0)
if not sys.argv[1].endswith(".gitignore"):
    print("  ERR: File must be a .gitignore!\n")
    sys,exit(-1)
print("Reading..")
with open(sys.argv[1]) as f:
    lines = f.readlines()
brl = "\n"
if lines[0].find("\r")!=-1:
    brl = "\r"+brl
print("Create backup..")
f = open(sys.argv[1]+".bak", "w")
for line in lines:
    f.write(line)
f.close()
print("Building dictionery..")
dict = {}
for line in lines:
    _line = line.strip()
    dict[_line] = _line
print("Saving..")
f = open(sys.argv[1], "w")
for line in dict:
    f.write(line+brl)
print("All done.")