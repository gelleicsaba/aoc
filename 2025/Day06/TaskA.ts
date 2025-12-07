export {}
import { readInput } from '../lib/aoclib'
let input = readInput('input.txt')
// let input = readInput('exampleInput.txt')
let nums: number[][] = []
let operators: string[] = []
input.split("\n").forEach((row: string) => {
    row = row.trim()
    if (row !== '') {
        for (let z=0; z<4; ++z) {
            row = row.replaceAll("  ", " ")
        }
        if (! row.startsWith('*') && ! row.startsWith('+')) {
            nums.push(row.split(' ').map((x: string): number => parseInt(x)))
        } else {
            operators = row.split(' ')
        }
    }
})
let result = 0
for (let x=0; x<nums[0].length; ++x) {
    let operator = operators[x]
    let equals = nums[0][x]
    for (let y=1; y<nums.length; ++y) {
        switch (operator) {
            case '+':
                equals += nums[y][x]
                break
            case '*':
                equals *= nums[y][x]
                break
        }
    }
    result += equals
}
console.log(result)
