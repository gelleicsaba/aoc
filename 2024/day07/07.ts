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
    const numbers: number[] = sp2.map(v=>parseInt(v))
    eq.push({val: parseInt(sp1[0]), numbers: numbers })
    if (numbers.length > maxLen) {
        maxLen = numbers.length
    }
}
// converts decimal number to specific number system value in string - with specific padding to '0' -
const numSysWithPadN = (dec: number, numSystem: number, pad: number): string => {
    return (dec >>> 0).toString(numSystem).padStart(pad,'0');
}
console.log(`Calculate A...`)
let ops: any[]=Array(maxLen)
for (let x=1;x<maxLen;++x) {
    let arr: string[]=[]
    for (let y=0;y<Math.pow(2,x);++y) {
        const tmp=numSysWithPadN(y,2,x).replaceAll('0','+').replaceAll('1','*')
        arr.push(tmp)
    }
    ops[x]=arr
}
let sum=0
let remains: any[]=[]
for (let e of eq) {
    let good=false
    for (let op of ops[e.numbers.length-1]) {
        let t=e.numbers[0]
        for (let x=1;x<e.numbers.length;++x) {
            switch (op[x-1]) {
                case '+': t+=e.numbers[x]; break
                case '*': t*=e.numbers[x]; break
            }
        }
        if (t==e.val) {
            good=true
            break
        }
    }
    if (good) {
        sum+=e.val
    } else {
        remains.push(e)
    }
}
console.log(`A: ${sum}`)
console.log()
console.log(`Calculate B...`)
let ops2: any[]=Array(maxLen)
for (let x=1;x<maxLen;++x) {
    let arr: string[]=[]
    for (let y=0;y<Math.pow(3,x);++y) {
        const tmp=numSysWithPadN(y,3,x).replaceAll('0','+').replaceAll('1','*').replaceAll('2','|')
        arr.push(tmp)
    }
    ops2[x]=arr
}
for (let e of remains) {
    for (let op of ops2[e.numbers.length-1]) {
        let t=e.numbers[0]
        for (let x=1;x<e.numbers.length;++x) {
            switch (op[x-1]) {
                case '+': t+=e.numbers[x]; break
                case '*': t*=e.numbers[x]; break
                case '|': t=parseInt(`${t}${e.numbers[x]}`); break
            }
        }
        if (t==e.val) {
            sum+=e.val
            break
        }
    }
}
console.log(`B: ${sum}`)
