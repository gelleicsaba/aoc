export {}

import { input } from './16data'

const _input = input.replaceAll("Sue","Sue,").replaceAll(":",",").replaceAll("\r","").split("\n")

const prs: any[] = []

for (let pr of _input) {
    const tk = pr.trim().split(",")
    const id = parseInt(tk[1].trim())
    const p1 = tk[2].trim()
    const p1v = parseInt(tk[3].trim())
    const p2 = tk[4].trim()
    const p2v = parseInt(tk[5].trim())
    const p3 = tk[6].trim()
    const p3v = parseInt(tk[7].trim())
    const obj = {}
    obj["id"] = id
    obj[p1] = p1v
    obj[p2] = p2v
    obj[p3] = p3v
    prs.push(obj)
}

const tickerInput =
`children: 3
cats: 7
samoyeds: 2
pomeranians: 3
akitas: 0
vizslas: 0
goldfish: 5
trees: 3
cars: 2
perfumes: 1`

const tk: any = {}
for (let x of tickerInput.replaceAll("\r","").split("\n")) {
    const p = x.trim().split(": ")[0]
    const v = parseInt(x.trim().split(": ")[1])
    tk[p] = v
}
for (let pr of prs) {
    let point = 0
    for (let key in tk) {
        const val = tk[key]
        const _is = pr[key] == val
        point += _is?1:0
    }
    pr["point"] = point
}
let max = 0
prs.map(q => {
    if (max < q["point"]) {
        max = q["point"]
    }
})
let gifts = prs.filter(q => q["point"] == max)
if (gifts.length != 1) {
    throw new Error("The result is incorrect!")
}
console.log("A: ",gifts[0].id)

for (let pr of prs) {
    let point = 0
    for (let key in tk) {
        const val = tk[key]
        if (key == "cats" || key == "trees") {
            const _is = pr[key] > val
            point += _is?1:0
        } else if (key == "pomeranians" || key == "goldfish") {
            const _is = pr[key] < val
            point += _is?1:0
        } else {
            const _is = pr[key] == val
            point += _is?1:0
        }
    }
    pr["point"] = point
}
max = 0
prs.map(q => {
    if (max < q["point"]) {
        max = q["point"]
    }
})
gifts = prs.filter(q => q["point"] == max)
if (gifts.length != 1) {
    throw new Error("The result is incorrect!")
}
console.log("B: ",gifts[0].id)
