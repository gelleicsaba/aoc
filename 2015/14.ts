export {}
import { input } from './14data'
import cloneDeep from 'clone-deep'

const _input = input.replaceAll(".","").replaceAll("\r","").split("\n")
let prs: any[] = []
let n = 0
for (let x in _input) {
    const tk = _input[x].trim().split(" ")
    const name = tk[0]
    const fly = parseInt(tk[3])
    const sec = parseInt(tk[6])
    const rest = parseInt(tk[13])
    prs.push({name: name, fly: fly, sec: sec, rest: rest, dist: 0, secs: 0,
        point: 0, flysec: 0, waitsec: 0, })
    ++n
}
const backup = cloneDeep(prs)

const TOTAL = 2503

let alldone = false
while (!alldone) {
    let dones=0
    for (let x in prs) {
        const el = prs[x]
        if (el.secs <= TOTAL) {
            let dist = el.dist + el.fly * el.sec
            let secs = el.secs + el.sec
            if (secs <= TOTAL) {
                el.dist = dist
                el.secs = secs
            } else {
                el.dist += Math.round(((TOTAL - el.secs) / el.sec) * el.fly)
                el.secs = TOTAL
            }
            if (el.secs <= TOTAL) {
                el.secs = el.secs + el.rest < TOTAL ? el.secs + el.rest : TOTAL
            }
            if (el.secs == TOTAL) {
                ++dones
            }
        }
    }
    alldone = dones == prs.length
}

let max = -1
for (let x in prs) {
    if (prs[x].dist > max) {
        max = prs[x].dist
    }
}
console.log("A: ", max)


prs = backup
alldone = false
let csec = 0

for (let x in prs) {
    prs[x].flysec = prs[x].sec
    prs[x].waitsec = 0
}

while (csec < TOTAL) {
    let dones=0
    let cw = 0
    for (let x in prs) {
        const el = prs[x]
        if (el.secs <= TOTAL) {

            if (el.waitsec > 0) {
                -- el.waitsec
                if (el.waitsec <= 0) {
                    el.flysec = el.sec
                    el.waitsec = 0
                }
            } else {
                el.dist += el.fly
                -- el.flysec
                if (el.flysec <= 0) {
                    el.flysec = 0
                    el.waitsec = el.rest
                }
            }
        }
        if (el.dist > cw) {
            cw = el.dist
        }
    }
    const winners = prs.filter(q => q.dist == cw)
    for (let x of winners) {
        ++ x.point
    }
    ++csec
}

max = -1
for (let x in prs) {
    if (prs[x].point > max) {
        max = prs[x].point
    }
}
console.log("B: ", max)
