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
let numbers = [];
for (let row of inputText.split(',')) {
    const numA = parseInt(row.split('-')[0])
    const numB = parseInt(row.split('-')[1])
    for (let num=numA; num<=numB; ++num) {
        const numStr = num.toString()
        if (numStr.length % 2 === 0) {
            const chunk = stringChunkNumbers(numStr, Math.trunc(numStr.length / 2) )
            if (chunk[0] === chunk[1]) {
                numbers.push(num)
            }
        }
    }
}
const sum = numbers.reduce((x: number, y: number): number => (x + y), 0)
console.log(sum);
