import { input } from './01data'

/*
const testA =
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const testB =
`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`
*/

let _input = input.replaceAll("\r","").split("\n")
const nums = "0123456789"

let result = 0
const calc = () => {
    for (let r of _input) {
        let f = -1
        let l = -1
        let y = r.length-1
        for (let x = 0; x < r.length; ++x) {
            if (f == -1 && nums.includes(r.charAt(x))) {
                f = parseInt(r.charAt(x))
            }
            if (l == -1 && nums.includes(r.charAt(y))) {
                l = parseInt(r.charAt(y))
            }
            if (f!=-1 && l!=-1) {
                break
            }
            --y
        }
        result += f*10 + l
    }
}
calc()
console.log("A: ", result)


_input = input
    .replaceAll("one","one1one")
    .replaceAll("two","two2two")
    .replaceAll("three","three3three")
    .replaceAll("four","four4four")
    .replaceAll("five","five5five")
    .replaceAll("six","six6six")
    .replaceAll("seven","seven7seven")
    .replaceAll("eight","eight8eight")
    .replaceAll("nine","nine9nine")
    .replaceAll("\r","")
    .split("\n")
result = 0
calc()
console.log("B: ", result)



