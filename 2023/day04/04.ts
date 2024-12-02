import { input } from './04data'

const testA =
`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

let _input = input.replaceAll("\r","").split("\n")
//let _input = testA.replaceAll("\r","").split("\n")

const trimSpaces = () => {
    for (let t = 0; t < _input.length; ++t) {
        for (let y = 0; y < 8; ++y) {
            _input[t] = _input[t].replaceAll("  "," ")
        }
    }
}
trimSpaces()

let result = 0
const calc = () => {
    for (let y = 0; y < _input.length; ++y) {
        const sections = _input[y].trim().split(":")
        const head = sections[0].trim().split(" ")
        const parts = sections[1].trim().split(" | ")
        const winners = parts[0].trim().split(" ")
        const numbers = parts[1].trim().split(" ")
        let count = 0
        for (let d of winners) {
            for (let c of numbers) {
                if (d == c) {
                    ++count
                }
            }
        }
        if (count > 0) {
            result += Math.pow(2, count-1)
        }
    }
}
calc()
console.log("A: ", result)

result = 0
const inst = Array(0)
for (let x=0; x<_input.length; ++x) {
    inst[x]=1
}

const calcB = () => {
    for (let y = 0; y < _input.length; ++y) {
        const sections = _input[y].trim().split(":")
        const head = sections[0].trim().split(" ")
        const parts = sections[1].trim().split(" | ")
        const winners = parts[0].trim().split(" ")
        const numbers = parts[1].trim().split(" ")
        let count = 0
        for (let d of winners) {
            for (let c of numbers) {
                if (d == c) {
                    ++count
                }
            }
        }
        if (count > 0) {
            for (let d = 1; d <= count; ++d) {
                if (d+y < _input.length) {

                    inst[d+y] += (inst[y])
                }
            }
        }
    }
}
calcB()
for (let x=0; x<_input.length; ++x) {
    result += inst[x]
}
console.log("B: ",result)
