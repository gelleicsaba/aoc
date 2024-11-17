export {}

import { input } from "./13data"
import { permutations, ABC } from "./lib/aoclib"

let _input = input.replaceAll(".","").replaceAll("\r","").split("\n")

const xp: any[] = []

for (let x=0; x<_input.length; ++x) {
    const t = _input[x].trim().split(" ")
    const person = t[0]
    const to = t[10]
    const point = t[2] == "gain" ? parseInt(t[3]) : -parseInt(t[3])
    xp.push({person: person, to: to, point: point})
}

const al = {} // aliases
let n=0
let tb: string[] =[]
for (let x=0; x<xp.length; ++x) {
    const name=xp[x].person
    if (!al[name]) {
        al[name] = ABC.charAt(n)
        tb.push(ABC.charAt(n))
        ++n
    }
}
const nofp = n // number of people

const xpa = {} // points with aliases
for (let x=0; x<xp.length; ++x) {
    const a = al[xp[x].person]
    const b = al[xp[x].to]
    xpa[`${a}${b}`] = xp[x].point
}

let perms: any[] = permutations(tb) // permutations of seats

const calc = () => {
    let _max=0
    for (let x=0; x<perms.length; ++x) {
        let tmp=0
        for (let y=0; y<perms[x].length-1; ++y) {
            const a=perms[x][y]
            const b=perms[x][y+1]
            tmp += xpa[`${a}${b}`]
            tmp += xpa[`${b}${a}`]
        }
        const _a=perms[x][0]
        const _b=perms[x][perms[x].length-1]
        tmp += xpa[`${_a}${_b}`]
        tmp += xpa[`${_b}${_a}`]

        if (tmp > _max) {
            _max = tmp
        }
    }
    return _max
}

console.log("A: ",calc())

const me = ABC[nofp]
for (let x in al) {
    xpa[`${me}${al[x]}`] = 0
    xpa[`${al[x]}${me}`] = 0
}
tb.push(me)
perms = permutations(tb)

console.log("B: ",calc())
