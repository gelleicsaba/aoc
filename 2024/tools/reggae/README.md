# Reggae : Transform xml to regex

## Intro
This tool will transform an XML to regex string pattern. The xml must be specific format.

## Usage
The program written in python 3 that's why you can start with 'python reggae.py .... (or python3 in linux)'.

Uasge:
```
reggae -in=<input file> [options]

where options can be\
  -lib=<path> : specify the lib root path\
  -save=<output file>\
  -vars=<varname>:<value>[,]... (e.g. -vars=lang:de )\
  -skip-unknown : skip unknown tag errors\
  -taste=[PCRE|JS|Python|Java|.Net|Golang] : use specific language format (default: JS)\
```

The input file is the xml that consist the pattern descriptor. The output will be a regex expression.

### Libraries
You can use library patterns that provides the reuseing.
If you'd like to use patterns from the library you must set the library path and the elements.

### Vars
You can declare variables with -vars, and the program replace these variables to those values. In the xml you can specify with {$\<variable name\>} 

e.g.: with -vars=lang:de, the "{$lang}" will be replaced to "de".

### Others options

#### -save
With '-save' you can save the output into a text file.

#### -taste
With '-taste' you can specify the output language format. \
The taste parameter can be: PCRE, JS, Python, Java, .Net, Golang

#### -skip-unknown
With -skip-unknown you can skip the "xml tag not found" errors. And your output will be created despite these errors. The unknown tags will be ignored.

## XML elements

There is two types of xml file, the pattern file (input) and the library xml files.

### Library tag
You can create or use a library with its specified elements.

A library starts with \<Lib\>
```
<Lib namespace="lib.{the path of the lib>}>
    ...
</Lib>
```
If the namespace is lib.chars.numbers the numbers.xml must be the /lib/char folder. This is a relative path.

The library must have on or more \<Regex\>\<Raw\>

e.g.:
```
<Lib namespace="lib.mylib.numbers">
    <Regex name="HexNum" alias="hex-num"><Raw>[0-9a-fA-F]</Raw></Regex>
    <Regex name="DecNum" alias="dec-num"><Raw>[0-9]</Raw></Regex>
</Lib>
```
In the example above, the \<HexNum\> or \<hex-num\> is a hexadecimal number.

### Using the library 
In your input file you can import the lib elements with \<Import name="..." from="..."/\>
The input file must have a \<Pattern\> root element.

e.g.:
```
<Pattern name="My pattern" flags="global grouped">
	<!-- Imports -->
  <Import name="HexNum, DecNum" from="lib.base.numbers"/>
  <options>
    <hex-num>
    <or/>
    <dec-num>
  </options>
</Pattern>
```

### The regex flags
In the \<Pattern\> tag you can specify the regex flags with flags="..." attribute.
e.g.:
```
<Pattern name="My pattern" flags="global ci">
```

The flags can be:
```
global - regex global (/g)
ci - regex case insensitive (/i)
singleline - dot matches newline (/s)
multiline - \^ and $ match start/end of line (/m)
extended or ignore-whitespace - ignore whitespaces (/x)

There are some modifiers that can be:
grouped - the output will be grouped with parenthesis
  (e.g. [a-z] will be ([a-z]) in the output )
alternations - the output parts will be alternated
  (e.g. ([a-z])([A-Z]) will be [([a-z])|([A-Z])] in the output)
```

### The built-in tags
You can use the built-in tags without any imports.

List of built-in tags:\
```
<StartsWith> - Startswith the content
<EndsWith> - Ends with the content
<Group> or <G> - Group with parentesys
<NonCapturedGroup> - Non captured group

<Options> - Any specified character or group (e.g. <Options><t w="group">apple</t><t w="group">banana\</t></Option>) 
<Or> - Alternate characters or group use with \<Option\> (e.g.: <Option><t w="group">one</t><Or/><t w="group">two</t></Option> )

<OneOrMore> - On or more occurrence
<ZeroOrMore> - Zero or more occurrence
<ZeroOrOne> or <Optional> - Optional (has or doesn't have)

<RepeatMin value="number"> - Repeat the content with minimum occurence
<RepeatMax value="number"> - Repeat the content with maximum occurence
<Repeat min="num"> - Repeat the content with minimum occurence
<Repeat max="num"> - Repeat the content with maximum occurence
<Repeat value="num"> - Repeat the content with exactly occurence
<Repeat min="num" max="num"> - Repeat the content with minumum and maximum occurence

<OptionalChar> - Any optional character
<NotOptionalChar> - A mandatory character
<OptionChars> - Any characters of the the specified content text

<Raw> - The content will be the exact content (e.g. <Raw>[0|1]{8}</Raw>)
<Text> or <T> - Group of text. The special characters or wildcards will be escaped (e.g. <T>$?</T> )

<LookAhead> - Regex look ahed (see: Look ahead regex)
<LookBehind> - Regex look ahed (see: Look behind regex)
<NotLookAhead> - Regex inverted look ahed (see: Look ahead regex)
<NotLookBehind> - Regex inverted look ahed (see: Look behind regex)
```

You can also use aliases with small letters and hyphens:\
e.g.
```
<starts-with> .. </starts-with>
```

You can specified the tags with group so you dont need to put the group tag into them. \
Use w="group" (with group) attribute for this. \
e.g. 
```
<one-or-more w="group">
  <t w="group">123</t>
</one-or-more>

The output will be (123)+ instead of 123+
```

## Text blockade
Every text must be in text block with text tag. Therefore not to use mix of tag and text in an xml block.
e.g.
```
This is incorrect:
  <one-or-more>
    hey
    <optional> you</optional>
    !
  </one-or-more>


The correct xml block is
  <one-or-more>
    <t>hey</t>
    <optional> you</optional>
    <t>!</t>
  </one-or-more>



```




























