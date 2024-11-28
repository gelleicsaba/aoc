import { input } from './15data'

const test =
`Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`

const _input = input.replaceAll(":","").replaceAll("\r","").split("\n")
//const _input = test.replaceAll(":","").replaceAll("\r","").split("\n")

const prs: any[] = []

for (let x in _input) {
    const tk = _input[x].trim().split(" ")
    const name = tk[0]
    const capacity = parseInt(tk[2])
    const durability = parseInt(tk[4])
    const flavor = parseInt(tk[6])
    const texture = parseInt(tk[8])
    const calories = parseInt(tk[10])
    prs.push({name: name, capacity: capacity, durability: durability, flavor: flavor,
        texture: texture, calories: calories
    })
}

const perms: any[] = []

if (prs.length == 4) {
    for (let a=1; a<=97; ++a) {
        for (let b=1; b <=97-a; ++b) {
            for (let c=1; c <= 97-a-b; ++c) {
                if (a+b+c<=99) {
                    let d = 100 - (a+b+c)
                    perms.push([a,b,c,d])
                }
            }
        }
    }
} else if (prs.length == 2) {
    for (let a=1; a<=99; ++a) {
        let b=100-a
        perms.push([a,b])
    }
}

let highA = 0
let highB = 0
for (let y=0; y<perms.length; ++y) {
    let sumCap = 0
    let sumDur = 0
    let sumFla = 0
    let sumTex = 0
    let sumCal = 0
    for (let x=0; x<prs.length; ++x) {
        const pr = prs[x]
        sumCap += perms[y][x] * pr.capacity
        sumDur += perms[y][x] * pr.durability
        sumFla += perms[y][x] * pr.flavor
        sumTex += perms[y][x] * pr.texture
        sumCal += perms[y][x] * pr.calories
    }
    const point = (sumCap > 0 ? sumCap : 0) * (sumDur > 0 ? sumDur : 0)
        * (sumFla > 0 ? sumFla : 0) * (sumTex > 0 ? sumTex : 0)
    if (highA < point) {
        highA = point
    }
    if (sumCal == 500) {
        if (highB < point) {
            highB = point
        }
    }
}
console.log("A: ", highA)
console.log("B: ", highB)
