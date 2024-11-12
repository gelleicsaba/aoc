export {}
import { input } from './02data'

const sqFeet = (l: number, w: number, h: number) => {
    const cube = (2*l*w)+ (2*w*h) + (2*h*l)
    let tmp = [l,w,h]
    let min = [999999,999999]
    let p = -1
    let n = 0
    for (let x of tmp) {
        if (min[0] > x) {
            min[0] = x
            p = n
        }
        ++n
    }
    n = 0
    for (let x of tmp) {
        if (p != n && min[1] > x) {
            min[1] = x
        }
        ++n
    }
    console.log(l,w,h,min)
    return cube + min[0] * min[1]
}

const ribbon = (l: number, w: number, h: number) => {
    let tmp = [l,w,h]
    let min = [999999,999999]
    let p = -1
    let n = 0
    for (let x of tmp) {
        if (min[0] > x) {
            min[0] = x
            p = n
        }
        ++n
    }
    n = 0
    for (let x of tmp) {
        if (p != n && min[1] > x) {
            min[1] = x
        }
        ++n
    }
    return 2*min[0] + 2*min[1] + (l*w*h)
}

const data = input.replaceAll("\r","").split("\n")
let resultA = 0
let resultB = 0
for (let d of data) {
    const x = d.split("x")
    const y = [parseInt(x[0]), parseInt(x[1]), parseInt(x[2])]
    // console.log(y[0], y[1], y[2])
    resultA += sqFeet(y[0], y[1], y[2])
    resultB += ribbon(y[0], y[1], y[2])
}

console.log("A:",resultA)
console.log("B:",resultB)
