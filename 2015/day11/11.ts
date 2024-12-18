import cloneDeep from 'clone-deep'
import { ABC } from '../lib/aoclib'

const input=`vzbxkghb`
//const test1=`abcdefgh`

//const _input = cloneDeep(test1)
const _input = cloneDeep(input)

let wa = false

const AB = ABC.toLowerCase()

const addChar = (ch :string) => {
    const n = (AB.indexOf(ch)+1) % AB.length
    return {char: AB.charAt(n), carryFlag: n==0}
}

const change = (s: string, pos: number, w: string) => {
    const l = s.length
    if (pos == 0) {
        return `${w}${s.substring(1,l)}`
    } else if (pos == l-1) {
        return `${s.substring(0,l-1)}${w}`
    } else if (pos < 0 || pos >= l) {
        throw Error('error in code')
    } else {
        return `${s.substring(0,pos)}${w}${s.substring(pos+1,l)}`
    }
}

const isGood = (s :string) => {
    const cr2 = s.indexOf('i') || s.indexOf('o') || s.indexOf('l')
    if (!cr2) {
        return false
    }

    let sameChars: number[] = []
    for (let n=0; n<s.length-1; ++n) {
        if (s.charAt(n) == s.charAt(n+1)) {
            sameChars.push(n)
        }
    }
    sameChars.push(9999)
    let sum=0
    for (let z=0; z<sameChars.length-1; ++z) {
        if (sameChars[z] != sameChars[z+1]-1) {
            ++sum
        }
    }
    if (sum < 2) {
        return false
    }

    let has = false
    for (let x=0; x<s.length-3; ++x) {
        if (AB.indexOf(s.charAt(x)) == AB.indexOf(s.charAt(x+1))-1 && AB.indexOf(s.charAt(x+1)) == AB.indexOf(s.charAt(x+2))-1) {
            has = true
            break
        }
    }
    if (!has) {
        return false
    }
    return true
}


let pass = _input
let good = false
while (! good) {
    let cf = true
    for (let x=pass.length-1; x>0 && cf; --x) {
        const rs = addChar(pass.charAt(x))
        pass = change(pass, x, rs.char)
        cf = rs.carryFlag
    }
    good = isGood(pass)
}
console.log("A: ", pass)

good = false
while (! good) {
    let cf = true
    for (let x=pass.length-1; x>0 && cf; --x) {
        const rs = addChar(pass.charAt(x))
        pass = change(pass, x, rs.char)
        cf = rs.carryFlag
    }
    good = isGood(pass)
}
console.log("B: ", pass)
