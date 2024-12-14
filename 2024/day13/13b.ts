export {}
import { input } from './13data'
import cloneDeep from '../node_modules/clonedeep'
const mutate=(s: string)=>(s+"\n")
    .replaceAll("Button A: X+","")
    .replaceAll("Button B: X+","")
    .replaceAll(" Y+","")
    .replaceAll("Prize: X=","")
    .replaceAll("Y=","")
    .replaceAll("\r","").split("\n")
const _input=mutate(input)
let options: any[] = []
let n=0
let str=''
for (let row of _input) {
    if (n%4==0) {
        str=row+';'
    } if (n%4==1) {
        str+=row+';'
    } if (n%4==2) {
        str+=row
    } if (n%4==3) {
        const pars=str.split(';')
        const btnA=pars[0].split(',').map(v=>parseInt(v))
        const btnB=pars[1].split(',').map(v=>parseInt(v))
        const prize=pars[2].split(',').map(v=>parseInt(v))
        options.push({
            a:{ x:btnA[0], y:btnA[1] },
            b:{ x:btnB[0], y:btnB[1] },
            prize: { x: prize[0] +10000000000000, y:prize[1] +10000000000000 }
        })
        str=''
    }
    ++n
}
const calculate=(m: number[][]): any => {
    const _m=cloneDeep(m)
    const ml0 = m[1][0]
    const ml1 = m[0][0]
    for (let x=0;x<3;++x) {
        m[0][x]*=ml0
        m[1][x]*=ml1
    }
    const leftC2 = m[0][1]-m[1][1]
    const right = m[0][2]-m[1][2]
    const resB = right/leftC2
    if (! Number.isInteger(resB)) return {a:-1,b:-1,tokens:0}
    const resA = (_m[0][2] - _m[0][1]*resB) / _m[0][0]
    if (! Number.isInteger(resA)) return {a:-1,b:-1,tokens:0}
    return {a: resA, b: resB, tokens: resA*3 + resB}
}
let sum=0
for (let op of options) {
    const result=calculate(
        [
            [op.a.x, op.b.x, op.prize.x],
            [op.a.y, op.b.y, op.prize.y]
        ]
    )
    if (result.a != -1) {
        sum += result.tokens
    }
}
console.log(`B: ${sum}`)
