import { input } from './07data'
// const test=
// `190: 10 19
// 3267: 81 40 27
// 83: 17 5
// 156: 15 6
// 7290: 6 8 6 15
// 161011: 16 10 13
// 192: 17 8 14
// 21037: 9 7 18 13
// 292: 11 6 16 20`
// const _input = test.replaceAll("\r","").split("\n")
const _input = input.replaceAll("\r","").split("\n")
const eq: any[] = []
let maxLen = 0
for (let row of _input) {
    const sp1 = row.split(':')
    const sp2 = sp1[1].trim().split(' ')
    const nums: number[] = sp2.map(v=>parseInt(v))
    eq.push({val: parseInt(sp1[0]), nums: nums })
    if (nums.length > maxLen) {
        maxLen = nums.length
    }
}
function dec2binToPad(dec: number, pad: number) {
    return (dec >>> 0).toString(2).padStart(pad,'0');
}
let ops: any[]=Array(maxLen)
for (let x=1;x<maxLen;++x) {
    let arr: string[]=[]
    for (let y=0;y<Math.pow(2,x);++y) {
        const tmp=dec2binToPad(y,x).replaceAll('0','+').replaceAll('1','*')
        arr.push(tmp)
    }
    ops[x]=arr
}
let sum=0
for (let e of eq) {
    for (let op of ops[e.nums.length-1]) {
        let t=e.nums[0]
        for (let x=1;x<e.nums.length;++x) {
            switch (op[x-1]) {
                case '+': t=t+e.nums[x]; break
                case '*': t=t*e.nums[x]; break
            }
        }
        if (t==e.val) {
            sum+=e.val
            break
        }
    }
}
console.log(`A: ${sum}`)
