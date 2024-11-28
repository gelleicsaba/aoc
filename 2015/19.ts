import { input, medicine } from "./19data"

const _input = input.replaceAll("\r","").split("\n")

const rps: any[] = []

for (let x of _input) {
    rps.push({from: x.split(" => ")[0].trim(), to: x.split(" => ")[1].trim() })
}

const grp = {}
for (let t of rps) {
    if (!grp[t.from]) {
        grp[t.from] = [t.to]
    } else {
        grp[t.from].push(t.to)
    }
}
console.log(grp)

const mols = {}


const replace = (str: string, from: string, to: string) => {
    let news = ""
    let opened = true
    let x=0
    while (x<str.length) {
        if (str.charAt(x) == "<") {
            opened = false
        }
        if (opened && x <= str.length - from.length && str.substring(x, x+from.length) == from) {
            news += `<${to}>`
            x += from.length-1
        } else {
            news += str.charAt(x)
        }
        if (str.charAt(x) == ">") {
            opened = true
        }
        ++x
    }
    return news
}
const rebuild = (str: string) => {
    return str.replaceAll("<","").replaceAll(">","")
}

// replace tests
/*
let q = replace("abQcd","b","ka")
q = replace(q,"a","dd")
q = replace(q,"cd","pq")
console.log(rebuild(q))
*/

const t: string[] = []

let round: any[] = []
let rounds = ""

let n=0
let done=false
while (!done) {
    rounds=""
    round = []
    for (let x in grp) {
        let p = Math.trunc(Math.random() * (grp[x].length))
        round.push([x,grp[x][p]])
        rounds+=`${x}-${grp[x][p]}|`
    }
    if (!t[rounds]) {
        t[rounds] = 1
        let _med = medicine
        for (let rn of round) {
            _med = replace(_med, rn[0], rn[1])
        }
        _med = rebuild(_med)
        if (! mols[_med]) {
            mols[_med] = 1
            console.log(Object.keys(mols).length)
        }
    }
}