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
        pos -= num % 100
    } else if (cmd.startsWith('R')) {
        pos += num % 100
    }
    if (pos < 0) {
        pos = 100 - Math.abs(pos)
    } else if (pos > 99) {
        pos = pos - 100
    }
    if (pos === 0) {
        ++ passwd
    }
    // console.log(`${cmd}: ${pos}`)
}
console.log(`A: ${passwd}`)
