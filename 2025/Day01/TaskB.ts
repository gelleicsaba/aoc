export {}
import { readInput } from '../lib/aoclib'
const inputText = readInput('./input.txt')
let pos = 50
let passwd = 0
for (let cmd of inputText.split('\n')) {
    if (cmd === '') {
        continue
    }
    const num = parseInt(cmd.substring(1))
    if (cmd.startsWith('L')) {
        for (let x=0; x<num; ++x) {
            --pos
            if (pos === 0) {
                ++passwd
            } else if (pos < 0) {
                pos=99
            }
        }
    } else if (cmd.startsWith('R')) {
        for (let x=0; x<num; ++x) {
            ++pos
            if (pos > 99) {
                pos=0
                ++passwd
            }
        }
    }
    // console.log(`${cmd}: ${pos}`)
}
console.log(`B: ${passwd}`)
