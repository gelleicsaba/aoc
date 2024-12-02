import { input } from './02data'
const mutate = (v) => v.replaceAll("\r","").split("\n")
// const test =
// `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`
// const _input = mutate(test)
const _input = mutate(input)
let lis: any[] = _input.map((v) => v.split(' ').map((q) => parseInt(q)))
let sum = 0
const testList = (arr: number[]) => {
    let inc = true
    let dec = true
    for (let x = 0;x < arr.length-1; ++x) {
        const diff=arr[x+1]-arr[x]
        inc = inc && diff>=1 && diff<=3
        dec = dec && diff<=-1 && diff>=-3
    }
    return (inc||dec)
}
for (let numbers of lis) {
    let inc = true
    let dec = true
    sum += testList(numbers)?1:0
}
console.log(`A: ${sum}`)
const removeItem = (arr: number[], index: number) => {
    let newArr: number[] = Array(arr.length-1)
    let y=0
    for (let x=0;x<arr.length;++x) {
        if (index != x) {
            newArr[y] = arr[x]
            ++y
        }
    }
    return newArr
}
sum = 0
for (let numbers of lis) {
    let good = 0
    for (let x = 0;x < numbers.length; ++x) {
        if (testList(removeItem(numbers, x))) {
            good = 1
            break
        }
    }
    sum+=good
}
console.log(`B: ${sum}`)

