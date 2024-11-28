import { input } from './12data'

const NUM = "0123456789-"
let _input = input + '_'

const calc = () => {
    let numStr = ""
    let str = false
    let numbers: number[] = []
    for (let x=0; x<_input.length; ++x) {
        const ch = _input.charAt(x)
        if (ch == "\"") {
            str = !str
        }
        if (!str) {
            if (NUM.includes(ch)) {
                numStr += ch
            } else {
                if (numStr != "") {
                    numbers.push(parseInt(numStr))
                    numStr = ""
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
