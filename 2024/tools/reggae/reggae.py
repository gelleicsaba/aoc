version=1.0
import sys
import xml.etree.ElementTree as ET
import inspect, os.path

vStr=str(version).replace(",",".")
n = len(sys.argv)

def info():
    print("Reggae - Transform xml to regex (v"+vStr+")")
    print("")
    print("Usage")
    print("")
    print("reggae -in=<input file> [options]")
    print("")
    print("options:")
    print("  -lib=<path> : specify the lib root path")
    print("  -save=<output file>")
    print("  -vars=<varname>:<value>[,]... (e.g. -vars=lang:de ) ")
    print("  -skip-unknown : skip unknown tag errors")
    print("  -taste=[PCRE|JS|Python|Java|.Net|Golang] : use specific language format (default: JS)")
    print("")
    print("e.g.: ")
    print("  reggae \"-in=phone.xml\" \"-save=phone.txt\" -taste=JS")
    sys.exit(0)

if n == 1:
    info()

inFile=None
outFile=None
vars=[]
skipUnknownTagErrors=False
taste="JS"

filename = inspect.getframeinfo(inspect.currentframe()).filename
libPath = os.path.dirname(os.path.abspath(filename))

for p in range(n):
    if p > 0:
        if (sys.argv[p])[:4] == "-in=":
            inFile = (sys.argv[p])[4:]
        elif (sys.argv[p])[:5] == "-lib=":
            libPath = (sys.argv[p])[5:]
        elif (sys.argv[p])[:6] == "-save=":
            outFile = (sys.argv[p])[6:]
        elif (sys.argv[p])[:6] == "-vars=":
            tmp = ((sys.argv[p])[6:]).split(",")
            for t in tmp:
                d = t.split(":")
                vars.append([d[0], d[1]])
        elif (sys.argv[p])[:13] == "-skip-unknown":
            skipUnknownTagErrors=True
        elif (sys.argv[p])[:7] == "-taste=":
            taste=(sys.argv[p])[7:]

# PCRE|JS|Python|Java|.Net|Golang
if not (taste=="PCRE" or taste=="JS" or taste=="Python" or taste=="Java" or taste==".Net" or taste=="Golang"):
    print("Error:Invalid 'taste' parameter: " + taste)
    info()

if inFile==None:
    print("Error: No input file specified")
    print("")
    info()
if outFile!=None and os.path.isfile(outFile):
    os.remove(outFile)
# Read the root element

if len(vars)>0:
    with open(inFile, encoding="utf-8") as f:
        tmp = f.readlines()
    for t in range(len(tmp)):
        for q in vars:
            tmp[t]=tmp[t].replace("{$"+q[0]+"}",q[1])
    root = ET.fromstringlist(tmp)
else:    
    tree = ET.parse(inFile)
    root = tree.getroot()

# The xml tree element class
class XmlClass:
    tag: None
    attrib: None
    text: None
    children: None
    build: None
    prefix: None
    postfix: None
    processed: False

# Build the tree elements from xml
def build(xmlElement):
    newElement=XmlClass()
    newElement.tag=xmlElement.tag
    newElement.attrib=xmlElement.attrib
    newElement.text=xmlElement.text
    newElement.children=[]
    newElement.build=""
    newElement.prefix=""
    newElement.postfix=""
    newElement.processed=False
    for child in xmlElement:
        newElement.children.append(build(child))

    return newElement

xmlRootElement = build(root)

# Print postorder dump from the tree
# def postorder(xmlObject):
#     for child in xmlObject.children:
#         postorder(child)
#     if (xmlObject.tag != "" and xmlObject.tag != None):
#         if (len(xmlObject.children)==0 and  xmlObject.text != None):
#             print(xmlObject.tag + " " , xmlObject.attrib , " value: '" + xmlObject.text+"'" + " prefix: '" +  xmlObject.prefix + "' postfix: '" + xmlObject.postfix + "' build: '" + xmlObject.build+"'")
#         else:
#             print(xmlObject.tag + " " , xmlObject.attrib , " prefix: '" +  xmlObject.prefix + "' postfix: '" + xmlObject.postfix + "' build: '" + xmlObject.build+"'")

libs = []

# Read the import elements, and its raw text, and append them to libs[]
def getImports(xmlObject):
    for child in xmlObject.children:
        getImports(child)
    
    if (xmlObject.tag == "Import" or xmlObject.tag == "import"):
        xmlObject.processed=True
        imports = xmlObject.attrib["name"].split(",")
        for x in range(len(imports)):
            imports[x] = imports[x].strip()
        path = xmlObject.attrib["from"]
        path = libPath.replace("\\","/") + "/" + path.replace(".","/") + ".xml"
        xml = ET.parse(path)
        xmlRoot = xml.getroot()
        if xmlRoot.attrib["namespace"]!=xmlObject.attrib["from"]:
            print("Invalid namespace '"+ xmlRoot.attrib["namespace"]+"' in '" + path + "' or invalid directory!")
            sys.exit(1)
        for y in xmlRoot:
            if y.tag == "Regex":
                for z in y:
                    if z.tag == "Raw" or z.tag == "raw":
                        rawName = y.attrib["name"]
                        rawLang = y.attrib.get("lang")
                        if rawLang == None:
                            rawLang = ""
                        for q in imports:
                            if q == rawName or q=='*':
                                libs.append([rawName, rawLang, z.text])
                                if y.attrib.get("alias"):
                                    libs.append([y.attrib["alias"], rawLang, z.text])

getImports(xmlRootElement)

# Apply the imports
def applyImports(xmlObject):
    for child in xmlObject.children:
        applyImports(child)

    for y in libs:
        if y[0] == xmlObject.tag:
            lang = ""
            if xmlObject.attrib.get("lang") != None:
                lang = xmlObject.attrib.get("lang")
            if y[1] == lang:
                xmlObject.build = y[2]
                xmlObject.processed=True

applyImports(xmlRootElement)

# Read element prefix/postfix
def readElementPrefixPostfix(xmlObject):
    for child in xmlObject.children:
        readElementPrefixPostfix(child)
    if xmlObject.tag == "StartsWith" or xmlObject.tag == "starts-with":
        xmlObject.prefix = "^"
        xmlObject.processed=True
    elif xmlObject.tag == "EndsWith" or xmlObject.tag == "ends-with":
        xmlObject.postfix = "$"
        xmlObject.processed=True
    elif xmlObject.tag == "Group" or xmlObject.tag == "group" or xmlObject.tag == "G" or xmlObject.tag == "g":
        xmlObject.prefix = "("
        xmlObject.postfix = ")"
        xmlObject.processed=True
    elif xmlObject.tag == "NonCapturedGroup" or xmlObject.tag == "non-captured-group":
        xmlObject.prefix = "(:?"
        xmlObject.postfix = ")"
        xmlObject.processed=True
    elif xmlObject.tag == "OneOrMore" or xmlObject.tag == "one-or-more":
        xmlObject.postfix = "+"
        xmlObject.processed=True
    elif xmlObject.tag == "ZeroOrMore" or xmlObject.tag == "zero-or-more":
        xmlObject.postfix = "*"
        xmlObject.processed=True
    elif xmlObject.tag == "ZeroOrOne" or xmlObject.tag == "zero-or-one" or xmlObject.tag == "Optional" or xmlObject.tag == "optional":
        xmlObject.postfix = "{0,1}"
        xmlObject.processed=True
    elif xmlObject.tag == "RepeatMin" or xmlObject.tag == "repeat-min":
        xmlObject.postfix = "{"+xmlObject.attrib.get("value")+",}"
        xmlObject.processed=True
    elif xmlObject.tag == "RepeatMax" or xmlObject.tag == "repeat-max":
        xmlObject.postfix = "{0,"+xmlObject.attrib.get("value")+"}"
        xmlObject.processed=True
    elif xmlObject.tag == "Repeat" or xmlObject.tag == "repeat":
        if xmlObject.attrib.get("max") != None and xmlObject.attrib.get("min") != None:
            xmlObject.postfix = "{"+xmlObject.attrib.get("min")+","+xmlObject.attrib.get("max")+"}"
            xmlObject.processed=True
        elif xmlObject.attrib.get("max") != None:
            xmlObject.postfix = "{,"+xmlObject.attrib.get("max")+"}"
            xmlObject.processed=True
        elif xmlObject.attrib.get("min") != None:
            xmlObject.postfix = "{"+xmlObject.attrib.get("min")+",}"
            xmlObject.processed=True
        elif xmlObject.attrib.get("value") != None:
            xmlObject.postfix = "{"+xmlObject.attrib.get("value")+"}"
            xmlObject.processed=True
    elif xmlObject.tag == "Pattern":
        grouped=False
        alternations=False
        if taste=="PCRE" or taste=="JS":
            xmlObject.prefix="/"
            xmlObject.postfix="/"
        elif taste=="Python":
            xmlObject.prefix="r\""
            xmlObject.postfix="\""
        elif taste=="Golang":
            xmlObject.prefix="`"
            xmlObject.postfix="`"
        elif taste=="Java":
            xmlObject.prefix="\""
            xmlObject.postfix="\""
        elif taste==".Net":
            xmlObject.prefix="@\""
            xmlObject.postfix="\""
        xmlObject.processed=True
        flags = xmlObject.attrib.get("flags").split(" ")
        for x in flags:
            if x == "global":
                xmlObject.postfix=xmlObject.postfix+"g"
            elif x == "ci":
                xmlObject.postfix=xmlObject.postfix+"i"
            elif x == "singleline":
                xmlObject.postfix=xmlObject.postfix+"s"
            elif x == "multiline":
                xmlObject.postfix=xmlObject.postfix+"m"
            elif x == "ignore-whitespace" or x == "extended":
                xmlObject.postfix=xmlObject.postfix+"m"
            elif x == "unicode":
                xmlObject.postfix=xmlObject.postfix+"u"
            elif x == "grouped":
                grouped=True
            elif x == "alternations":
                alternations=True
        if grouped and not alternations:
            xmlObject.prefix=xmlObject.prefix+"("
            xmlObject.postfix=")"+xmlObject.postfix
        elif grouped and alternations:
            xmlObject.prefix=xmlObject.prefix+"(["
            xmlObject.postfix="])"+xmlObject.postfix
        elif not grouped and alternations:
            xmlObject.prefix=xmlObject.prefix+"["
            xmlObject.postfix="]"+xmlObject.postfix
    elif xmlObject.tag == "OptionalChar" or xmlObject.tag == "OptChar" or xmlObject.tag == "optional-char" or xmlObject.tag == "opt-char":
        if xmlObject.attrib.get("char") != None:
            xmlObject.postfix=xmlObject.attrib.get("char")+"?"
        else:
            xmlObject.postfix=xmlObject.text+"?"
        xmlObject.processed=True
    elif xmlObject.tag == "Raw" or xmlObject.tag == "raw":
        xmlObject.build = xmlObject.text
        xmlObject.processed=True
    elif xmlObject.tag == "NotOptionalChar" or xmlObject.tag == "not-optional-char":
        xmlObject.prefix = "[^"
        xmlObject.postfix = "]"
        xmlObject.processed=True
    elif xmlObject.tag == "Or" or xmlObject.tag == "or":
        xmlObject.prefix = "|"
        xmlObject.processed=True
    elif xmlObject.tag == "Text" or xmlObject.tag == "text" or xmlObject.tag == "T" or xmlObject.tag == "t":
        xmlObject.build = ""
        for ch in xmlObject.text:
            if ch=="\\" or ch=="/" or ch=="?" or ch=="!" or ch=="^" or ch=="|" or ch=="." or ch=="$" or ch=="{" or ch=="}" or ch=="(" or ch==")" or ch=="[" or ch=="]" or ch=="+":
                xmlObject.build=xmlObject.build+"\\"+ch
            else:
                xmlObject.build=xmlObject.build+ch
        xmlObject.processed=True
    elif xmlObject.tag == "LookAhead" or xmlObject.tag == "look-ahead":
        xmlObject.prefix = "(?="
        xmlObject.postfix = ")"
        xmlObject.processed=True
    elif xmlObject.tag == "NotLookAhead" or xmlObject.tag == "not-look-ahead":
        xmlObject.prefix = "(?!"
        xmlObject.postfix = ")"
        xmlObject.processed=True        
    elif xmlObject.tag == "LookBehind" or xmlObject.tag == "look-behind":
        xmlObject.prefix = "(?<="
        xmlObject.postfix = ")"
        xmlObject.processed=True
    elif xmlObject.tag == "NotLookBehind" or xmlObject.tag == "not-look-behind":
        xmlObject.prefix = "(?<!"
        xmlObject.postfix = ")"
        xmlObject.processed=True
    elif xmlObject.tag == "Options" or xmlObject.tag == "options":
        xmlObject.prefix = "["
        xmlObject.postfix = "]"
        xmlObject.processed=True
    elif xmlObject.tag == "OptionChars" or xmlObject.tag == "option-chars":
        xmlObject.prefix = "["
        xmlObject.build = xmlObject.text
        xmlObject.postfix = "]"
        xmlObject.processed=True
    if xmlObject.attrib.get("w") != None and xmlObject.attrib.get("w")=="group":
        xmlObject.prefix="("+xmlObject.prefix
        xmlObject.postfix=")"+xmlObject.postfix

readElementPrefixPostfix(xmlRootElement)

unknownTags=[]
def getAllUnknownTags(xmlObject):
    for child in xmlObject.children:
        getAllUnknownTags(child)
    if not xmlObject.processed:
        unknownTags.append(xmlObject.tag)


if not skipUnknownTagErrors:
    getAllUnknownTags(xmlRootElement)
    if len(unknownTags)>0:
        if len(unknownTags)==1:
            print("Error: There is an unknown tag in the xml:")
        else:
            print("Error: There are some unknown tags in the xml:")
        for x in unknownTags:
            print("    "+x)
        sys.exit(1)

regexString=""

def readRegexString(xmlObject):
    global regexString
    regexString=regexString+xmlObject.prefix
    for child in xmlObject.children:
        readRegexString(child)
    regexString=regexString+xmlObject.build
    regexString=regexString+xmlObject.postfix

readRegexString(xmlRootElement)

if (outFile != None):
    with open(outFile, 'w') as f:
        f.writelines(regexString)

print(regexString)

