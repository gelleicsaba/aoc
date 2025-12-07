export {}
import { readInput } from '../lib/aoclib'
const inputText = readInput('./input.txt')
// const inputText = readInput('./exampleInput.txt')
const NEXT_POSITION = 1
const NUMBER = 0
const pullTheNumber = (row: number[], level: number, from: number): number[] => {
    const lastIndex = row.length
    let max = 0;
    let maxPos = -1;
    for (let x=from; x<lastIndex; ++x) {
        if (row[x] > max && x <= lastIndex - level) {
            max = row[x]
            maxPos = x
        }
    }
    return [max, maxPos + 1];
}
let result = 0
for (let row of inputText.split("\n")) {
    if (row.trim() === '')
        continue
    const nums = row.split('').map((x: string) => parseInt(x))
    let num = []
    let level = 12
    let from = 0
    while (true) {
        const pullResult = pullTheNumber(nums, level, from)
        num.push(pullResult[NUMBER])
        from = pullResult[NEXT_POSITION]
        --level
        if (level === 0) {
            break
        }
    }
    result += parseInt(num.join(''))
}
console.log(result);
