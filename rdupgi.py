
#!/usr/bin/python3
import sys

def main():
    if len(sys.argv) != 2:
        print("\nRemove .gitignore duplicates")
        print("")
        print("Usage:")
        print("  python3 rdupgi <.gitignore path>\n")
        return
    if not sys.argv[1].endswith(".gitignore"):
        print("  ERR: File must be a .gitignore!\n")
        return
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
    print("Building dictionary..")
    dict = {}
    for line in lines:
        _line = line.strip()
        dict[_line] = _line
    print("Saving..")
    f = open(sys.argv[1], "w")
    for line in dict:
        f.write(line+brl)
    print("All done.")

##############################################################################

if __name__ == "__main__":
    main()
