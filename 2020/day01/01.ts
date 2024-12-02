export {}
import { input } from './01data'

const test =
`1721
979
366
299
675
1456`

const _input = input.replaceAll("\r","").split("\n")
//const _input = test.replaceAll("\r","").split("\n")

let numbers = Array(0)
for (let a = 0; a < _input.length && numbers.length==0; ++a) {
    for (let b = 0; b < _input.length; ++b) {
        if (a==b) continue
        const numA = parseInt(_input[a])
        const numB = parseInt(_input[b])
        if (numA+numB == 2020) {
            numbers = [numA, numB]
            break
        }
    }
}

console.log("A: ", numbers[0]*numbers[1])


numbers = Array(0)
for (let a = 0; a < _input.length && numbers.length==0; ++a) {
    for (let b = 0; b < _input.length && numbers.length==0; ++b) {
        if (a!=b) {
            for (let c = 0; c < _input.length; ++c) {
                if (c==a || c==b) continue
                const numA = parseInt(_input[a])
                const numB = parseInt(_input[b])
                const numC = parseInt(_input[c])
                if (numA+numB+numC == 2020) {
                    numbers = [numA, numB, numC]
                    break
                }
            }
        }
    }
}
console.log("B: ", numbers[0]*numbers[1]*numbers[2])
