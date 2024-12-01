import { input } from './03data'

const _input = input.replaceAll("\r","").split("\n")
//const _input = test.replaceAll("\r","").split("\n")

for (let x=0; x<_input.length; ++x) {
    _input[x]=_input[x].trim()
    for (let z=0; z<8; ++z) {
        _input[x]=_input[x].replaceAll("  ", " ")
    }
    _input[x]=_input[x].replaceAll(" ",",")
}

let result=0
for (let cmd of _input) {
    const sides = cmd.split(",")
    const s = [parseInt(sides[0]), parseInt(sides[1]), parseInt(sides[2])]
    let maxs = -1
    let maxp = -1
    let os1 = -1
    let os2 = -1
    for (let z=0; z<3; ++z) {
        if (s[z]>maxs) {
            maxs = s[z]
            maxp = z
        }
    }
    if (maxp==0) {
        os1=s[1]
        os2=s[2]
    } else if (maxp==1) {
        os1=s[0]
        os2=s[2]
    } else if (maxp==2) {
        os1=s[0]
        os2=s[1]
    }
    if ((os1+os2)>maxs) {
        ++result
    }
}
console.log("A:",result)




result=0

let rows = Array(0)
for (let x=0; x<3; ++x) {
    let y=0
    while (y<_input.length) {
        rows.push([
            parseInt(_input[y].split(",")[x]),
            parseInt(_input[y+1].split(",")[x]),
            parseInt(_input[y+2].split(",")[x])
        ])
        y+=3
    }
}
//console.log(rows)

for (let s of rows) {
    let maxs = -1
    let maxp = -1
    let os1 = -1
    let os2 = -1
    for (let z=0; z<3; ++z) {
        if (s[z]>maxs) {
            maxs = s[z]
            maxp = z
        }
    }
    if (maxp==0) {
        os1=s[1]
        os2=s[2]
    } else if (maxp==1) {
        os1=s[0]
        os2=s[2]
    } else if (maxp==2) {
        os1=s[0]
        os2=s[1]
    }
    if ((os1+os2)>maxs) {
        ++result
    }
}
console.log("B:",result)