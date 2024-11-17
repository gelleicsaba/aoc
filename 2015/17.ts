export {}

import { input } from './17data'

console.log("Start...")
const _input: number[] = input.replaceAll("\r","").split("\n").map(q => parseInt(q))

let rnd = 0
let nums: number[] = []
let cmb = {}


const start = Date.now()
const end = start + (30*1000)

let tm = Date.now()
let thick = 0
while (tm <= end) {
    nums = []
    let sum = 0
    for (let x=0; x<_input.length && sum < 150;++x) {
        let done = false
        while (!done && sum<=150) {
            rnd = Math.trunc(Math.random() * _input.length)
            done = nums.filter(q => q == rnd).length == 0
        }
        nums.push(rnd)
        sum += _input[rnd]
    }
    if (sum == 150) {
        nums = nums.sort()
        const key = nums.join("|")
        if (!cmb[key]) {
            cmb[key]=nums.length
        }
    }
    tm = Date.now()
    const prTime = Math.trunc((tm-start) / 5000)
    if (thick < prTime) {
        console.log(`Tick... ${Math.trunc((tm-start) / 1000)} secs    remains: ${Math.trunc((end-tm) / 1000)} secs` )
        thick = prTime
    }
}
let sumA = 0
let minB = 99
for (let x in cmb) {
    ++ sumA
    if (cmb[x] < minB) {
        minB = cmb[x]
    }
}
let sumB = 0
for (let x in cmb) {
    if (cmb[x] == minB) {
        ++sumB
    }
}
console.log("A: ", sumA, " ?")
console.log("B: ", sumB, " ?")
console.log("If result is incorrect increase the end time (const end = ...)")
