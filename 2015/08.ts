export {}
import { input } from './08data'
import cloneDeep from 'clone-deep'

/*const test =
`""
"abc"
"aaa%"aaa"
"%x27"`
*/

const _inputs = input.replaceAll("\r","").split("\n")
//const _inputs = test.replaceAll("\r","").split("\n")

let _mem = cloneDeep(_inputs)

let sumMem = 0
for (let str of _inputs) {
    sumMem += str.length
}

let sumChrs = 0
for (let x=0; x<_mem.length; ++x) {
    let y=0
    _mem[x] = _mem[x].replaceAll("%\"", "_")
    _mem[x] = _mem[x].replaceAll("%%", "_")
    let sb = ""
    let found = false
    while (y < _mem[x].length) {
        if (_mem[x].charAt(y) == "%" && _mem[x].charAt(y+1)=="x") {
            sb += "_"
            y += 4
            found = true
        } else {
            sb += _mem[x].charAt(y)
            ++y
        }
    }
    if (found) {
        _mem[x] = sb
    }
    sumChrs += _mem[x].length-2
}

const sumMem0 = sumMem
console.log("A: ", sumMem - sumChrs)


_mem = cloneDeep(_inputs)

sumChrs = 0
for (let x=0; x<_mem.length; ++x) {
    let y=1
    _mem[x] = _mem[x].replaceAll("%\"", "1234")
    _mem[x] = _mem[x].replaceAll("%%", "1234")
    let sb = "__"
    let found = true
    while (y < _mem[x].length-1) {
        if (_mem[x].charAt(y) == "%" && _mem[x].charAt(y+1)=="x") {
            sb += "12345"
            y += 4
            found = true
        } else {
            sb += _mem[x].charAt(y)
            ++y
        }
    }
    if (found) {
        _mem[x] = sb
    }
    sumChrs += _mem[x].length+4
}
console.log("B: ", sumChrs - sumMem0)
