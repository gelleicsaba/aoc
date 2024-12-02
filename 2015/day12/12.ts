import { input } from './12data'

const NUM = "0123456789-"
let _input = input + '_'

const calc = () => {
    let numberstr = ""
    let str = false
    let numbers: number[] = []
    for (let x=0; x<_input.length; ++x) {
        const ch = _input.charAt(x)
        if (ch == "\"") {
            str = !str
        }
        if (!str) {
            if (NUM.includes(ch)) {
                numberstr += ch
            } else {
                if (numberstr != "") {
                    numbers.push(parseInt(numberstr))
                    numberstr = ""
                }
            }
        }
    }
    let sum = 0
    for (let n of numbers) {
        sum += n
    }
    return sum
}
console.log("A: ",calc())
