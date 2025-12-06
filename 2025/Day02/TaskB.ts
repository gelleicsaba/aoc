export {}
import { readInput } from '../lib/aoclib'
const inputText = readInput('./input.txt')
const stringChunkNumbers = (str :string, chunkSize: number): number[] => {
    const array = str.split('')
    const result = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(parseInt(array.slice(i, i + chunkSize).join('')))
    }
    return result
}
const sameNumbersInArray = (nums: number[]): boolean => {
    if (nums.length === 1) return false
    for (let x = 0; x < nums.length-1; ++x) {
        if (nums[x] !== nums[x+1]) {
            return false
        }
    }
    return true
}
let numbers = [];
for (let row of inputText.split(',')) {
    const numA = parseInt(row.split('-')[0])
    const numB = parseInt(row.split('-')[1])
    for (let num=numA; num<=numB; ++num) {
        const numStr = num.toString()
        const foundNums: number[] = []
        for (let z=1;z<numStr.length;++z) {
            const chunk = stringChunkNumbers(numStr, z)
            if (sameNumbersInArray(chunk)) {
                if (!foundNums.includes(num)) {
                    numbers.push(num)
                    foundNums.push(num)
                }
            }
        }
    }
}
const sum = numbers.reduce((x: number, y: number): number => (x + y), 0)
console.log(sum);
