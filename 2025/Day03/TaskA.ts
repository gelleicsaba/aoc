export {}
import { readInput } from '../lib/aoclib'
const inputText = readInput('./input.txt')
// const inputText = readInput('./exampleInput.txt')
let result = 0
for (let row of inputText.split("\n")) {
    if (row.trim() === '')
        continue
    const nums = row.split('').map((x: string) => parseInt(x))
    let maxNum = nums.reduce((x: number, y: number) => (x > y ? x : y), 1)
    let pos1 = nums.indexOf(maxNum)
    let num1 = maxNum
    let num2 = 0
    if (pos1 == nums.length-1) {
        num2 = maxNum
        num1 = nums.filter((x: number) => x !== maxNum).reduce((x: number, y: number) => (x > y ? x : y), 1)
    } else {
        const otherNums = nums.slice(pos1+1)
        num2 = otherNums.reduce((x: number, y: number) => (x > y ? x : y), 1)
    }
    result += num1*10 + num2;
}
console.log(result);
