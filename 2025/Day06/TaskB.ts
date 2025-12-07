export {}
import { readInput } from '../lib/aoclib'
let input = readInput('input.txt')
// let input = readInput('exampleInput.txt')
let nums: string[] = []
let operators: string = ""
input.split("\n").forEach((row: string) => {
    if (row.trim() !== '') {
        if (! row.startsWith('*') && ! row.startsWith('+')) {
            // if it is a number row, we add numbers array
            nums.push(row)
        } else {
            // if it is the operator row, we set this as operators
            operators = row
        }
    }
})
let max=0
// complete every number rows as same length (right padding with max of length)
for (let y = 0; y < nums.length; ++y) {
    if (nums[y].length > max) {
        max = nums[y].length
    }
}
for (let y = 0; y < nums.length; ++y) {
    nums[y] = nums[y].padEnd(max, ' ')
}
// add an end character (.) to mark it is no more operator
operators = operators.padEnd(max, ' ')+'.'
let result = 0
for (let x = 0; x < operators.length-1; ++x) {
    let op = ''
    // if the position char is * or + we need to calc
    if (operators[x] === '*' || operators[x] === '+') {
        op = operators[x]
        let to = x+1
        // get the end of the table column position
        while (true) {
            if (operators[to] !== ' ') {
                break
            }
            ++to
        }
        // column start position: x , column end position: to
        let vNums: number[] = []
        // collect the numbers from vertical texts
        for (let t = x; t < to; ++t) {
            let s = ''
            for (let y = 0; y < nums.length; ++y) {
                s += nums[y][t]
            }
            if (s.trim() !== '') {
                vNums.push(parseInt(s))
            }
        }
        // calc the sum or multiple of numbers
        let sum = op === '*' ? 1 : 0
        for (let vNum of vNums) {
            switch (op) {
                case '+':
                    sum += vNum
                    break
                case '*':
                    sum *= vNum
                    break
            }
        }
        // add this sum to the result
        result += sum
    }
}
console.log(result)
